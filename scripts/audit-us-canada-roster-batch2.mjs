import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import sharp from "sharp";

const root = process.cwd();
const decisionDir = path.join(root, "data/roster-decisions/us-canada-batch2");
const firstPartyKinds = new Set(["official", "profile", "cv", "thesis"]);
const failures = [];

const bundle = await build({
  stdin: {
    contents: `
      import { people as canonicalPeople, relationships as canonicalRelationships, groupMembers as canonicalGroupMembers } from "./app/data.ts";
      import * as batch from "./app/us-roster-batch2-expansion-2026.ts";
      import * as cornell from "./app/us-cornell-upstream-final-2026.ts";
      export const payload = { canonicalPeople, canonicalRelationships, canonicalGroupMembers, batch, cornell };
    `,
    resolveDir: root,
    sourcefile: "us-canada-batch2-audit-entry.ts",
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const { payload } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const { canonicalPeople, canonicalRelationships, canonicalGroupMembers, batch, cornell } = payload;

const summary = JSON.parse(fs.readFileSync(path.join(decisionDir, "summary-2026-09-03.json"), "utf8"));
if (summary.totals.officialRosterCount !== 296 || summary.totals.decisionCount !== 296) failures.push("decision ledger must contain exactly 296 balanced rows");
if (summary.totals.counts.include_new_pi !== 15) failures.push("decision ledger must select exactly 15 new PIs");

const decisionFiles = ["utexas-cs-2026-09-03.json", "umich-robotics-2026-09-03.json", "mit-csail-2026-09-03.json"];
let decisionRows = [];
for (const file of decisionFiles) {
  const document = JSON.parse(fs.readFileSync(path.join(decisionDir, file), "utf8"));
  if (document.officialRosterCount !== document.decisionCount || document.decisions.length !== document.decisionCount) failures.push(`${file}: row count mismatch`);
  if (new Set(document.decisions.map((row) => row.officialId)).size !== document.decisions.length) failures.push(`${file}: duplicate official ids`);
  for (const row of document.decisions) {
    if (!row.name || !row.title || !row.sourcePageUrl || !row.decision || !row.reason || !row.evidence) failures.push(`${file}: incomplete decision row for ${row.name || row.officialId}`);
  }
  decisionRows = decisionRows.concat(document.decisions);
}
if (decisionRows.length !== 296) failures.push(`expected 296 decision rows, found ${decisionRows.length}`);

const canonicalIds = new Set(canonicalPeople.map((person) => person.id));
const canonicalNames = new Set(canonicalPeople.map((person) => person.name.toLowerCase()));
const canonicalRelationshipIds = new Set(canonicalRelationships.map((relationship) => relationship.id));
const canonicalGroupIds = new Set(canonicalGroupMembers.map((member) => member.id));

if (batch.usRosterBatch2People.length !== 15) failures.push(`expected 15 selected PIs, found ${batch.usRosterBatch2People.length}`);
const selectedDecisionNames = new Set(decisionRows.filter((row) => row.decision === "include_new_pi").map((row) => row.name));
for (const person of batch.usRosterBatch2People) {
  if (!selectedDecisionNames.has(person.name)) failures.push(`${person.id}: not selected by the decision ledger`);
  if (canonicalIds.has(person.id) || canonicalNames.has(person.name.toLowerCase())) failures.push(`${person.id}: duplicates canonical person`);
  if (!person.primary || person.status !== "current independent PI · UT Austin official roster verified") failures.push(`${person.id}: not marked as current independent PI`);
  if (!person.summary || person.summary.length < 35) failures.push(`${person.id}: summary too short`);
  if ((person.facts || []).length < 3) failures.push(`${person.id}: fewer than three sourced facts`);
  if ((person.facts || []).some((fact) => !fact.source?.url || !firstPartyKinds.has(fact.source.kind))) failures.push(`${person.id}: fact is not first-party sourced`);
  if ((person.sources || []).length < 2 || person.sources.some((item) => !item.url || !firstPartyKinds.has(item.kind))) failures.push(`${person.id}: source collection incomplete or non-first-party`);
  if (!person.portrait?.src || !person.portrait.source?.url) {
    failures.push(`${person.id}: missing portrait metadata`);
  } else {
    const portraitPath = path.join(root, "public", person.portrait.src);
    if (!fs.existsSync(portraitPath)) failures.push(`${person.id}: missing local portrait file`);
    else {
      const metadata = await sharp(portraitPath).metadata();
      if (metadata.width !== 512 || metadata.height !== 512 || metadata.format !== "jpeg") failures.push(`${person.id}: portrait must be 512x512 JPEG`);
    }
  }
}

const batchEndpointIds = new Set([...canonicalIds, ...batch.people.map((person) => person.id)]);
for (const relationship of batch.relationships) {
  if (canonicalRelationshipIds.has(relationship.id)) failures.push(`${relationship.id}: duplicate canonical relationship id`);
  if (!batchEndpointIds.has(relationship.from) || !batchEndpointIds.has(relationship.to)) failures.push(`${relationship.id}: missing endpoint`);
  if (!relationship.verified || !relationship.evidence || !relationship.source?.url || !firstPartyKinds.has(relationship.source.kind)) failures.push(`${relationship.id}: relationship lacks explicit first-party evidence`);
}
if (batch.relationships.length < 10) failures.push("batch should contain at least ten explicit training edges");
for (const member of batch.groupMembers) {
  if (canonicalGroupIds.has(member.id)) failures.push(`${member.id}: duplicate canonical group-member id`);
  if (!batchEndpointIds.has(member.teacherId) || !member.name || !member.role || !member.source?.url) failures.push(`${member.id}: incomplete group-member record`);
}
if (batch.groupMembers.length < 9) failures.push("batch should contain at least nine named current group members");

const cornellTargets = new Set(["abe-davis-cornell", "aditya-vashistha-cornell", "allison-koenecke-cornell", "cheng-zhang-cornell", "christopher-de-sa-cornell"]);
if (Object.keys(cornell.enhancements).length !== cornellTargets.size) failures.push("Cornell upstream module must enhance exactly five targets");
const cornellEndpointIds = new Set([...canonicalIds, ...cornell.people.map((person) => person.id)]);
for (const [target, enhancement] of Object.entries(cornell.enhancements)) {
  if (!cornellTargets.has(target) || !canonicalIds.has(target)) failures.push(`${target}: invalid Cornell target`);
  if (!(enhancement.facts || []).length || (enhancement.facts || []).some((fact) => !fact.source?.url)) failures.push(`${target}: missing sourced upstream fact`);
}
for (const relationship of cornell.relationships) {
  if (!cornellTargets.has(relationship.to)) failures.push(`${relationship.id}: unexpected Cornell target`);
  if (!cornellEndpointIds.has(relationship.from) || !cornellEndpointIds.has(relationship.to)) failures.push(`${relationship.id}: missing Cornell endpoint`);
  if (!relationship.verified || !relationship.evidence || !relationship.source?.url || !firstPartyKinds.has(relationship.source.kind)) failures.push(`${relationship.id}: relationship lacks explicit first-party evidence`);
  if (relationship.to === "allison-koenecke-cornell" && (relationship.subtype !== "other" || !/reading committee|唯一 formal adviser/.test(relationship.evidence))) failures.push(`${relationship.id}: Allison Koenecke guidance must retain its evidence-bound caveat`);
  if (relationship.to !== "allison-koenecke-cornell" && !["phd_adviser", "co_adviser"].includes(relationship.subtype)) failures.push(`${relationship.id}: expected explicit doctoral-adviser subtype`);
}
for (const target of cornellTargets) {
  if (!cornell.relationships.some((relationship) => relationship.to === target)) failures.push(`${target}: no upstream relationship`);
}

const allNewIds = [...batch.people, ...cornell.people].map((person) => person.id);
if (new Set(allNewIds).size !== allNewIds.length) failures.push("duplicate person ids across independent modules");

if (failures.length) {
  console.error(`US/Canada roster batch 2 QA failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`US/Canada roster batch 2 QA passed: 296/296 ledger decisions; 15 current UT Austin PIs with 512x512 official portraits; ${batch.relationships.length} explicit training edges; ${batch.groupMembers.length} current group members; Cornell 5/5 targets have evidence-bound upstream relations (${cornell.relationships.length} edges).`);
