import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import {
  candidatePriorityP0MainlandThirdPassBatch1DispositionOverrides2026 as overrides,
  candidatePriorityP0MainlandThirdPassBatch1People2026 as people,
  candidatePriorityP0MainlandThirdPassBatch1Relationships2026 as relationships,
  candidatePriorityP0MainlandThirdPassBatch1RosterPromotions2026 as promotions,
  candidatePriorityP0MainlandThirdPassBatch1SupportingPeople2026 as supportingPeople,
} from "../app/candidate-priority-p0-mainland-third-pass-batch-1-2026.ts";

const sourceAuditPath = "data/candidate-priority-p0-mainland-third-pass-145-source-audit-2026-09-03.json";
const sourceAudit = JSON.parse(readFileSync(sourceAuditPath, "utf8"));
const errors = [];
const currentKeys = new Set(sourceAudit.records.map((row) => row.canonicalKey));
const allIds = new Set([...people, ...supportingPeople].map((person) => person.id));
const existingData = readdirSync("app")
  .filter((file) => file.endsWith(".ts") && file !== "candidate-priority-p0-mainland-third-pass-batch-1-2026.ts")
  .map((file) => readFileSync(`app/${file}`, "utf8"))
  .join("\n");
for (const match of existingData.matchAll(/id:\s*["']([^"']+)["']/g)) allIds.add(match[1]);

if (sourceAudit.candidateCount !== 145 || sourceAudit.reviewedCount !== 145) errors.push("third-pass source audit is not a complete 145/145 ledger");
if (sourceAudit.byOriginalGap?.first_party_relationship !== 127 || sourceAudit.byOriginalGap?.three_to_five_sourced_facts !== 18) errors.push("third-pass source-audit gap buckets changed");
if (sourceAudit.automaticallyPublished !== 0) errors.push("source-audit stage must not auto-publish candidates");

for (const person of people) {
  if (person.region !== "Mainland China" || !person.primary || !person.introducedAt) errors.push(`${person.id}: not a published Mainland current PI`);
  if (!/current independent PI/.test(person.status ?? "")) errors.push(`${person.id}: independent-PI verification marker missing`);
  if ((person.sources?.length ?? 0) < 2) errors.push(`${person.id}: fewer than two reliable sources`);
  if ((person.facts?.length ?? 0) < 3 || (person.facts?.length ?? 0) > 5) errors.push(`${person.id}: facts outside 3–5`);
  if (!person.facts?.some((item) => /教育|训练|师承/.test(item.label))) errors.push(`${person.id}: missing education/training fact`);
  if (!person.facts?.every((item) => item.source?.url && item.value?.length >= 12)) errors.push(`${person.id}: fact lacks source or sufficient detail`);
  if (!relationships.some((relationship) => relationship.from === person.id || relationship.to === person.id)) errors.push(`${person.id}: missing graph relationship`);
  const portraitPath = person.portrait?.src ? `public/${person.portrait.src}` : "";
  if (!portraitPath || !existsSync(portraitPath)) errors.push(`${person.id}: missing portrait file`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.id}: portrait is not 512×512`);
    if (!person.portrait?.source?.url || !person.portrait.source.supports?.includes("人工检查")) errors.push(`${person.id}: portrait provenance/manual QA missing`);
  }
}

for (const relationship of relationships) {
  if (!relationship.verified || !relationship.source?.url || !relationship.evidence) errors.push(`${relationship.id}: incomplete relationship evidence`);
  if (!allIds.has(relationship.from) || !allIds.has(relationship.to)) errors.push(`${relationship.id}: unknown endpoint ${relationship.from} -> ${relationship.to}`);
  if (/关键词|推测|可能/.test(relationship.evidence)) errors.push(`${relationship.id}: relationship evidence is inferential`);
}
for (const promotion of promotions) {
  if (!people.some((person) => person.id === promotion.atlasPersonId)) errors.push(`${promotion.rosterName}: promotion does not point to batch PI`);
}
for (const override of overrides) {
  if (!currentKeys.has(override.canonicalKey)) errors.push(`${override.canonicalKey}: override not present in 145-row third-pass ledger`);
}
if (new Set(people.map((person) => person.id)).size !== people.length) errors.push("duplicate person id in batch");
if (new Set(promotions.map((row) => `${row.unitUrl}::${row.rosterName}`)).size !== promotions.length) errors.push("duplicate roster promotion key");
if (new Set(overrides.map((row) => row.canonicalKey)).size !== overrides.length) errors.push("duplicate disposition override key");
if (overrides.filter((row) => row.disposition === "ready").length !== people.length) errors.push("ready override count does not equal people count");

const result = {
  checkedAt: "2026-09-03",
  sourceAuditRows: sourceAudit.reviewedCount,
  people: people.length,
  supportingPeople: supportingPeople.length,
  relationships: relationships.length,
  rosterPromotions: promotions.length,
  dispositionOverrides: overrides.length,
  errors,
};
writeFileSync("data/candidate-priority-p0-mainland-third-pass-batch-1-audit-2026-09-03.json", `${JSON.stringify(result, null, 2)}\n`);
if (errors.length) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(result, null, 2));
