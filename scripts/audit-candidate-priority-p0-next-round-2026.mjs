import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import {
  candidatePriorityP0NextRoundGroupMembers2026 as groupMembers,
  candidatePriorityP0NextRoundPeople2026 as people,
  candidatePriorityP0NextRoundRelationships2026 as relationships,
  candidatePriorityP0NextRoundRosterPromotions2026 as promotions,
  candidatePriorityP0NextRoundSupportingPeople2026 as supportingPeople,
} from "../app/candidate-priority-p0-next-round-batch-2026.ts";

const errors = [];
const ownIds = new Set([...people, ...supportingPeople].map((person) => person.id));
const allIds = new Set(ownIds);
const otherData = readdirSync("app")
  .filter((file) => file.endsWith(".ts") && file !== "candidate-priority-p0-next-round-batch-2026.ts")
  .map((file) => readFileSync(`app/${file}`, "utf8"))
  .join("\n");
for (const match of otherData.matchAll(/id:\s*["']([^"']+)["']/g)) allIds.add(match[1]);

if (people.length !== 5) errors.push(`expected 5 primary people, got ${people.length}`);
if (promotions.length !== people.length) errors.push("promotion/person count mismatch");
if (relationships.length !== 6) errors.push(`expected 6 verified relationships, got ${relationships.length}`);

for (const person of people) {
  if (!person.primary || !/current independent PI/.test(person.status ?? "")) errors.push(`${person.id}: current independent PI marker missing`);
  if ((person.sources?.length ?? 0) < 2) errors.push(`${person.id}: fewer than two reliable sources`);
  if ((person.facts?.length ?? 0) < 3 || (person.facts?.length ?? 0) > 5) errors.push(`${person.id}: facts outside 3–5`);
  if (!person.facts?.some((item) => /教育|训练|师承/.test(item.label))) errors.push(`${person.id}: education/training fact missing`);
  if (!person.facts?.some((item) => item.label === "研究主线")) errors.push(`${person.id}: research-theme fact missing`);
  if (!person.facts?.every((item) => item.source?.url && item.value?.length >= 10)) errors.push(`${person.id}: unsourced or underspecified fact`);
  if (!relationships.some((relationship) => relationship.from === person.id || relationship.to === person.id)) errors.push(`${person.id}: verified graph relationship missing`);
  const portraitPath = person.portrait?.src ? `public/${person.portrait.src}` : "";
  if (!portraitPath || !existsSync(portraitPath)) errors.push(`${person.id}: portrait file missing`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.id}: portrait is not 512×512`);
    if (!person.portrait?.source?.url || !person.portrait.source.supports?.includes("人工检查")) errors.push(`${person.id}: portrait provenance or manual QA missing`);
  }
}

for (const relationship of relationships) {
  if (!relationship.verified || !relationship.source?.url || relationship.evidence.length < 12) errors.push(`${relationship.id}: incomplete relationship evidence`);
  if (!allIds.has(relationship.from) || !allIds.has(relationship.to)) errors.push(`${relationship.id}: unknown endpoint`);
}
for (const member of groupMembers) {
  if (!people.some((person) => person.id === member.teacherId)) errors.push(`${member.id}: unknown teacher`);
  if (!member.source?.url) errors.push(`${member.id}: source missing`);
}
for (const promotion of promotions) {
  if (!people.some((person) => person.id === promotion.atlasPersonId)) errors.push(`${promotion.rosterName}: promotion target missing`);
}

const result = { ok: errors.length === 0, people: people.length, supportingPeople: supportingPeople.length, relationships: relationships.length, groupMembers: groupMembers.length, portraits512: people.length, rosterPromotions: promotions.length, errors };
if (errors.length) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}
console.log(JSON.stringify(result, null, 2));
