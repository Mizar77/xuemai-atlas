import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import {
  candidatePriorityP0MainlandFourthPassBatch1DispositionOverrides2026 as overrides,
  candidatePriorityP0MainlandFourthPassBatch1People2026 as people,
  candidatePriorityP0MainlandFourthPassBatch1Relationships2026 as relationships,
  candidatePriorityP0MainlandFourthPassBatch1RosterPromotions2026 as promotions,
  candidatePriorityP0MainlandFourthPassBatch1SupportingPeople2026 as supportingPeople,
} from "../app/candidate-priority-p0-mainland-fourth-pass-batch-1-2026.ts";

const ledgerPath = "data/candidate-priority-p0-mainland-fourth-pass-disposition-2026-09-03.json";
const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
const errors = [];
const ledgerKeys = new Set(ledger.records.map((row) => row.canonicalKey));
const ownIds = new Set([...people, ...supportingPeople].map((person) => person.id));
const allIds = new Set(ownIds);
const existingData = readdirSync("app").filter((file) => file.endsWith(".ts") && file !== "candidate-priority-p0-mainland-fourth-pass-batch-1-2026.ts").map((file) => readFileSync(`app/${file}`, "utf8")).join("\n");
for (const match of existingData.matchAll(/id:\s*["']([^"']+)["']/g)) allIds.add(match[1]);

if (ledger.frozenCandidateCount !== 40 || ledger.reviewedCandidateCount !== 40) errors.push("fourth-pass ledger is not closed at 40/40");
if (ledger.dispositionCounts?.ready !== 10 || ledger.dispositionCounts?.missing_relationship !== 29 || ledger.dispositionCounts?.identity_disambiguation_required !== 1) errors.push("fourth-pass disposition counts changed");
for (const person of people) {
  if (person.region !== "Mainland China" || !person.primary || !/current independent PI/.test(person.status ?? "")) errors.push(`${person.id}: current independent PI marker missing`);
  if ((person.sources?.length ?? 0) < 2) errors.push(`${person.id}: fewer than two reliable sources`);
  if ((person.facts?.length ?? 0) < 3 || (person.facts?.length ?? 0) > 5) errors.push(`${person.id}: facts outside 3–5`);
  if (!person.facts?.some((item) => /教育|训练|师承/.test(item.label))) errors.push(`${person.id}: education/training fact missing`);
  if (!person.facts?.every((item) => item.source?.url && item.value?.length >= 10)) errors.push(`${person.id}: unsourced or underspecified fact`);
  if (!relationships.some((relationship) => relationship.from === person.id || relationship.to === person.id)) errors.push(`${person.id}: verified relationship missing`);
  const portraitPath = person.portrait?.src ? `public/${person.portrait.src}` : "";
  if (!portraitPath || !existsSync(portraitPath)) errors.push(`${person.id}: portrait file missing`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.id}: portrait is not 512×512`);
    if (!person.portrait?.source?.url || !person.portrait.source.supports?.includes("人工检查")) errors.push(`${person.id}: portrait provenance or manual QA missing`);
  }
}
for (const relationship of relationships) {
  if (!relationship.verified || !relationship.source?.url || !relationship.evidence) errors.push(`${relationship.id}: incomplete relationship evidence`);
  if (!allIds.has(relationship.from) || !allIds.has(relationship.to)) errors.push(`${relationship.id}: unknown endpoint`);
  if (/关键词|推测|可能/.test(relationship.evidence)) errors.push(`${relationship.id}: inferential relationship evidence`);
}
for (const promotion of promotions) if (!people.some((person) => person.id === promotion.atlasPersonId)) errors.push(`${promotion.rosterName}: promotion target missing`);
for (const override of overrides) if (!ledgerKeys.has(override.canonicalKey)) errors.push(`${override.canonicalKey}: override absent from frozen ledger`);
if (new Set(people.map((person) => person.id)).size !== people.length) errors.push("duplicate batch person id");
if ([...ownIds].some((id) => new RegExp(`id:\\s*["']${id}["']`).test(existingData))) errors.push("batch person/support id collides with existing module");
if (new Set(promotions.map((row) => `${row.unitUrl}::${row.rosterName}`)).size !== promotions.length) errors.push("duplicate promotion key");
if (new Set(overrides.map((row) => row.canonicalKey)).size !== overrides.length) errors.push("duplicate override key");
if (overrides.length !== people.length || promotions.length !== people.length) errors.push("ready/promotions/people count mismatch");

const result = { checkedAt: "2026-09-03", frozen: ledger.frozenCandidateCount, reviewed: ledger.reviewedCandidateCount, people: people.length, supportingPeople: supportingPeople.length, relationships: relationships.length, portraits: people.length, rosterPromotions: promotions.length, dispositionOverrides: overrides.length, blocked: ledger.records.filter((row) => row.disposition !== "ready").length, errors };
writeFileSync("data/candidate-priority-p0-mainland-fourth-pass-batch-1-audit-2026-09-03.json", `${JSON.stringify(result, null, 2)}\n`);
if (errors.length) { console.error(JSON.stringify(result, null, 2)); process.exit(1); }
console.log(JSON.stringify(result, null, 2));
