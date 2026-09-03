import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import sharp from "sharp";

const root = process.cwd();
const dir = path.join(root, "data/roster-decisions/us-uw-uiuc-2026-09-03");
const failures = [];
const allowed = new Set(["included_existing", "include_new_pi", "excluded_non_pi", "excluded_non_ai_cs", "excluded_historical", "excluded_industry_only", "pending_profile_verification"]);
const firstParty = new Set(["official", "profile", "cv", "thesis"]);
const files = ["uw-allen-school-2026-09-03.json", "uiuc-siebel-school-2026-09-03.json"];

let rows = [];
for (const file of files) {
  const doc = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  if (doc.decisions.length !== doc.newDecisionCount) failures.push(`${file}: decision count mismatch`);
  if (doc.decisions.length !== (doc.frozenOfficialRosterCount - doc.preexistingDecisionCount)) failures.push(`${file}: frozen roster accounting mismatch`);
  rows = rows.concat(doc.decisions);
}
if (rows.length !== 514) failures.push(`expected exactly 514 new decisions, found ${rows.length}`);
const keys = rows.map((row) => `${row.rosterName.normalize("NFKD").replace(/[^a-z0-9]+/gi, "").toLowerCase()}::${row.unitUrl}`);
if (new Set(keys).size !== rows.length) failures.push("rosterName+unitUrl keys are not unique");
for (const row of rows) {
  if (!row.rosterName || !row.unitUrl || !row.officialId || !row.decision || !row.reason || !allowed.has(row.decision)) failures.push(`incomplete/invalid decision: ${row.rosterName || row.officialId}`);
}
if (rows.some((row) => row.decision === "pending_profile_verification")) failures.push("no pending profile verification rows should remain after official-profile review");

const summary = JSON.parse(fs.readFileSync(path.join(dir, "summary-2026-09-03.json"), "utf8"));
if (summary.totals.frozenOfficialRosterCount !== 515 || summary.totals.preexistingDecisionCount !== 1 || summary.totals.newDecisionCount !== 514) failures.push("summary accounting mismatch");
if (summary.totals.unresolvedPending !== 0) failures.push("summary must report zero unresolved pending rows");
if (summary.totals.moduleCompleteCount !== 15 || summary.totals.queuedAfterScopeDecisionCount !== 100) failures.push("summary enrichment accounting mismatch");

const bundle = await build({
  stdin: {
    contents: 'import { people as canonicalPeople, relationships as canonicalRelationships } from "./app/data.ts"; import * as batch from "./app/us-uw-uiuc-roster-expansion-2026.ts"; export const payload = { canonicalPeople, canonicalRelationships, batch };',
    resolveDir: root,
    sourcefile: "uw-uiuc-roster-audit-entry.ts",
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const { payload } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const { canonicalPeople, canonicalRelationships, batch } = payload;
const canonicalIds = new Set(canonicalPeople.map((person) => person.id));
const canonicalNames = new Set(canonicalPeople.map((person) => person.name.toLowerCase()));
const selectedRows = rows.filter((row) => row.enrichmentStatus === "module_complete");

if (selectedRows.length !== 15) failures.push(`expected 15 module-complete decisions, found ${selectedRows.length}`);
if (batch.usUwUiucRosterPeople.length !== 15) failures.push(`expected 15 enriched PI records, found ${batch.usUwUiucRosterPeople.length}`);
const selectedNames = new Set(selectedRows.map((row) => row.rosterName));
for (const person of batch.usUwUiucRosterPeople) {
  if (!selectedNames.has(person.name)) failures.push(`${person.id}: not selected by ledger`);
  if (canonicalIds.has(person.id) || canonicalNames.has(person.name.toLowerCase())) failures.push(`${person.id}: duplicates canonical person`);
  if (!person.primary || !person.status?.includes("current independent PI")) failures.push(`${person.id}: current independent PI status missing`);
  if (!person.summary || person.summary.length < 35) failures.push(`${person.id}: editorial summary too short`);
  if ((person.facts || []).length < 3) failures.push(`${person.id}: fewer than three facts`);
  if ((person.facts || []).some((fact) => !fact.source?.url || !firstParty.has(fact.source.kind))) failures.push(`${person.id}: fact lacks first-party source`);
  if ((person.sources || []).length < 2 || person.sources.some((item) => !item.url || !firstParty.has(item.kind))) failures.push(`${person.id}: source collection incomplete`);
  if (!person.portrait?.src || !person.portrait.source?.url) failures.push(`${person.id}: portrait metadata missing`);
  else {
    const portraitPath = path.join(root, "public", person.portrait.src);
    if (!fs.existsSync(portraitPath)) failures.push(`${person.id}: local portrait missing`);
    else {
      const metadata = await sharp(portraitPath).metadata();
      if (metadata.width !== 512 || metadata.height !== 512 || metadata.format !== "jpeg") failures.push(`${person.id}: portrait must be 512x512 JPEG`);
    }
  }
}

const endpoints = new Set([...canonicalIds, ...batch.people.map((person) => person.id)]);
const canonicalRelationshipIds = new Set(canonicalRelationships.map((relationship) => relationship.id));
for (const relationship of batch.relationships) {
  if (canonicalRelationshipIds.has(relationship.id)) failures.push(`${relationship.id}: duplicate relationship id`);
  if (!endpoints.has(relationship.from) || !endpoints.has(relationship.to)) failures.push(`${relationship.id}: missing endpoint`);
  if (!relationship.verified || !relationship.evidence || !relationship.source?.url || !firstParty.has(relationship.source.kind)) failures.push(`${relationship.id}: relationship lacks evidence`);
}
if (batch.relationships.length < 12) failures.push("expected at least 12 first-party relationship edges");
for (const member of batch.groupMembers) {
  if (!endpoints.has(member.teacherId) || !member.name || !member.role || !member.source?.url) failures.push(`${member.id}: invalid group member`);
}

if (failures.length) {
  console.error(`UW/UIUC roster batch QA failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`UW/UIUC roster batch QA passed: 515 frozen cards accounted for; 1 prior decision preserved; 514 new unique rosterName+unitUrl decisions; 0 pending; 15 enriched current PIs; 15 official 512x512 portraits; ${batch.relationships.length} first-party relationship edges; ${batch.groupMembers.length} named current group members.`);
