import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import {
  candidatePriorityP0MainlandFullBatch1DispositionOverrides2026 as overrides,
  candidatePriorityP0MainlandFullBatch1People2026 as people,
  candidatePriorityP0MainlandFullBatch1Relationships2026 as relationships,
  candidatePriorityP0MainlandFullBatch1RosterPromotions2026 as promotions,
  candidatePriorityP0MainlandFullBatch1SupportingPeople2026 as supportingPeople,
} from "../app/candidate-priority-p0-mainland-full-batch-1-2026.ts";

const errors = [];
const allIds = new Set([...people, ...supportingPeople].map((person) => person.id));
const existingData = readdirSync("app").filter((file) => file.endsWith(".ts")).map((file) => readFileSync(`app/${file}`, "utf8")).join("\n");
for (const match of existingData.matchAll(/id:\s*["']([^"']+)["']/g)) allIds.add(match[1]);

for (const person of people) {
  if (person.region !== "Mainland China" || !person.primary || !person.introducedAt) errors.push(`${person.id}: not a published Mainland current PI`);
  if ((person.sources?.length ?? 0) < 2) errors.push(`${person.id}: fewer than two sources`);
  if ((person.facts?.length ?? 0) < 3 || (person.facts?.length ?? 0) > 5) errors.push(`${person.id}: facts outside 3–5`);
  if (!person.facts?.some((item) => /教育|训练|师承/.test(item.label))) errors.push(`${person.id}: missing education/training fact`);
  if (!relationships.some((relationship) => relationship.from === person.id || relationship.to === person.id)) errors.push(`${person.id}: missing graph relationship`);
  const relative = person.portrait?.src;
  const portraitPath = relative ? `public/${relative}` : "";
  if (!portraitPath || !existsSync(portraitPath)) errors.push(`${person.id}: missing portrait file`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.id}: portrait is not 512×512`);
    if (!person.portrait?.source?.url || !person.portrait.source.supports?.includes("人工检查")) errors.push(`${person.id}: portrait provenance/manual QA missing`);
  }
}

for (const relationship of relationships) {
  if (!relationship.verified || !relationship.source?.url || !relationship.evidence) errors.push(`${relationship.id}: incomplete relationship evidence`);
  if (!allIds.has(relationship.from) || !allIds.has(relationship.to)) errors.push(`${relationship.id}: unknown endpoint`);
}
for (const promotion of promotions) {
  if (!people.some((person) => person.id === promotion.atlasPersonId)) errors.push(`${promotion.rosterName}: promotion does not point to batch PI`);
}
if (new Set(promotions.map((row) => `${row.unitUrl}::${row.rosterName}`)).size !== promotions.length) errors.push("duplicate roster promotion key");
if (new Set(overrides.map((row) => row.canonicalKey)).size !== overrides.length) errors.push("duplicate disposition override key");
if (overrides.filter((row) => row.disposition === "ready").length !== people.length) errors.push("ready override count does not equal people count");

const result = {
  checkedAt: "2026-09-03",
  people: people.length,
  supportingPeople: supportingPeople.length,
  relationships: relationships.length,
  rosterPromotions: promotions.length,
  dispositionOverrides: overrides.length,
  portraits512x512: people.length - errors.filter((row) => row.includes("portrait")).length,
  strictGate: errors.length === 0 ? "pass" : "fail",
  errors,
};
writeFileSync("data/candidate-priority-p0-mainland-full-batch-1-audit-2026-09-03.json", `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
