import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const root = process.cwd();
const bundle = "/private/tmp/candidate-p0-mainland-tail-batch-3-2026.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [
  path.join(root, "app/candidate-priority-p0-mainland-tail-batch-3-2026.ts"),
  "--bundle", "--platform=node", "--format=esm", `--outfile=${bundle}`,
], { stdio: "ignore" });

const batch = await import(`file://${bundle}?t=${Date.now()}`);
const people = batch.candidatePriorityP0MainlandTailBatch3People2026;
const supportingPeople = batch.candidatePriorityP0MainlandTailBatch3SupportingPeople2026;
const relationships = batch.candidatePriorityP0MainlandTailBatch3Relationships2026;
const placements = batch.candidatePriorityP0MainlandTailBatch3Placements2026;
const groupMembers = batch.candidatePriorityP0MainlandTailBatch3GroupMembers2026;
const promotions = batch.candidatePriorityP0MainlandTailBatch3RosterPromotions2026;
const master = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json"), "utf8"));
const errors = [];
const primaryIds = new Set(people.map((person) => person.id));
const localEndpointIds = new Set([...people, ...supportingPeople].map((person) => person.id));
const expectedExistingEndpoints = new Set(["bo-zhang-thu-historical", "guoliang-li-thu", "yike-guo-hkust"]);
const appSource = fs.readdirSync(path.join(root, "app"))
  .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
  .map((file) => fs.readFileSync(path.join(root, "app", file), "utf8"))
  .join("\n");
const masterNames = new Map([
  ["徐华", "Hua XU"],
  ["孙季", "Ji Sun"],
  ["董豪", "董豪"],
  ["李彤阳", "李彤阳"],
  ["周迪宇", "周迪宇"],
]);

if (people.length !== 5 || primaryIds.size !== 5) errors.push(`expected 5 unique primary people, got ${people.length}/${primaryIds.size}`);
if (promotions.length !== people.length) errors.push(`promotion count ${promotions.length} != people ${people.length}`);

for (const id of expectedExistingEndpoints) {
  if (!appSource.includes(`id: "${id}"`)) errors.push(`${id}: expected existing atlas endpoint is absent`);
}

for (const person of people) {
  const masterName = masterNames.get(person.name);
  const masterRecord = master.records.find((row) => row.region === "Mainland China" && row.name === masterName);
  if (!masterRecord || masterRecord.disposition !== "ready" || masterRecord.atlasPersonId !== person.id) errors.push(`${person.name}: master disposition is not the published ready record`);
  if (!person.primary || person.category !== "core" || person.region !== "Mainland China") errors.push(`${person.name}: PI classification gate failed`);
  if (new Set((person.sources ?? []).map((item) => item.url)).size < 2) errors.push(`${person.name}: fewer than two distinct sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: facts must be 3-5`);
  if (!person.facts.every((row) => row.source?.url && row.source?.supports)) errors.push(`${person.name}: unsourced fact`);
  if (!person.facts.some((row) => row.label === "教育与学术训练")) errors.push(`${person.name}: missing education fact`);
  if (!relationships.some((row) => row.from === person.id || row.to === person.id)) errors.push(`${person.name}: no explicit graph relationship`);

  const portraitPath = path.join(root, "public", person.portrait?.src ?? "");
  if (!person.portrait?.source?.url || !fs.existsSync(portraitPath)) errors.push(`${person.name}: portrait missing or unsourced`);
  else {
    const metadata = await sharp(portraitPath).metadata();
    const stats = await sharp(portraitPath).stats();
    if (metadata.width !== 512 || metadata.height !== 512) errors.push(`${person.name}: portrait is not 512x512`);
    const mean = stats.channels.slice(0, 3).reduce((sum, channel) => sum + channel.mean, 0) / 3;
    if (mean < 12 || mean > 248 || stats.entropy < 1.5) errors.push(`${person.name}: portrait appears blank`);
  }
}

for (const relationship of relationships) {
  const endpointKnown = (id) => localEndpointIds.has(id) || expectedExistingEndpoints.has(id);
  if (!endpointKnown(relationship.from) || !endpointKnown(relationship.to)) errors.push(`${relationship.id}: endpoint missing from batch or verified existing atlas nodes`);
  if (!relationship.verified || !relationship.source?.url || !relationship.source?.supports || !relationship.evidence || !relationship.evidenceObject) errors.push(`${relationship.id}: incomplete relationship evidence`);
}

for (const promotion of promotions) {
  if (!primaryIds.has(promotion.atlasPersonId) || !promotion.unitUrl || !promotion.rosterName) errors.push(`${promotion.atlasPersonId}: invalid promotion`);
}

for (const member of groupMembers) {
  if (!primaryIds.has(member.teacherId) || !member.source?.url || !member.source?.supports) errors.push(`${member.id}: invalid group member`);
}

for (const placement of placements) {
  if (!primaryIds.has(placement.teacherId) || !placement.source?.url || !placement.source?.supports) errors.push(`${placement.id}: invalid placement`);
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  people: people.length,
  supportingPeople: supportingPeople.length,
  relationships: relationships.length,
  placements: placements.length,
  groupMembers: groupMembers.length,
  promotions: promotions.length,
}, null, 2));
