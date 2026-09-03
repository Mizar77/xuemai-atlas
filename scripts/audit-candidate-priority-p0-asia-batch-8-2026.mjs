import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = path.join(root, "app/candidate-priority-p0-asia-batch-8-2026.ts");
const dataPath = path.join(root, "app/data.ts");
const moduleBundle = "/private/tmp/candidate-p0-asia-batch-8-2026-audit.mjs";
const dataBundle = "/private/tmp/candidate-p0-asia-batch-8-data-audit.mjs";
const esbuild = path.join(root, "node_modules/.bin/esbuild");

execFileSync(esbuild, [modulePath, "--bundle", "--platform=node", "--format=esm", `--outfile=${moduleBundle}`], { stdio: "ignore" });
execFileSync(esbuild, [dataPath, "--bundle", "--platform=node", "--format=esm", `--outfile=${dataBundle}`], { stdio: "ignore" });

const batch = await import(`file://${moduleBundle}?t=${Date.now()}`);
const atlas = await import(`file://${dataBundle}?t=${Date.now()}`);
const { people, relationships, placements, groupMembers, rosterPromotions } = batch;
const errors = [];
const batchIds = new Set(people.map((person) => person.id));
const atlasIdCounts = new Map(atlas.people.map((person) => [person.id, (atlas.people.filter((row) => row.id === person.id)).length]));
const atlasRelationshipIdCounts = new Map(atlas.relationships.map((row) => [row.id, (atlas.relationships.filter((candidate) => candidate.id === row.id)).length]));
const atlasIds = new Set(atlas.people.map((person) => person.id));
const endpointIds = new Set([...atlasIds, ...batchIds]);

if (people.length !== 9 || batchIds.size !== 9) errors.push(`expected 9 unique people, got ${people.length}/${batchIds.size}`);
if (rosterPromotions.length !== people.length) errors.push(`promotion count ${rosterPromotions.length} != people ${people.length}`);
for (const id of batchIds) if (atlasIdCounts.get(id) !== 1) errors.push(`${id}: expected exactly one integrated atlas person`);

for (const person of people) {
  const distinctSources = new Set((person.sources ?? []).map((item) => item.url));
  if (distinctSources.size < 2) errors.push(`${person.name}: fewer than two distinct sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: facts must be 3-5`);
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url)) errors.push(`${person.name}: missing exact sourced education fact`);
  if (person.status !== "current independent PI · official profile verified") errors.push(`${person.name}: current independent PI status is not explicit`);
  const portraitPath = path.join(root, "public", person.portrait?.src ?? "");
  if (!person.portrait?.src || !fs.existsSync(portraitPath)) errors.push(`${person.name}: missing portrait`);
  else {
    if (fs.statSync(portraitPath).size < 1024) errors.push(`${person.name}: portrait smaller than 1 KiB`);
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait is not 512x512`);
  }
  const networkCount = relationships.filter((row) => row.from === person.id || row.to === person.id).length
    + placements.filter((row) => row.teacherId === person.id).length
    + groupMembers.filter((row) => row.teacherId === person.id).length;
  if (!networkCount) errors.push(`${person.name}: missing network evidence`);
}

const relationshipIds = new Set();
for (const row of relationships) {
  if (relationshipIds.has(row.id)) errors.push(`${row.id}: duplicate relationship id`);
  if (atlasRelationshipIdCounts.get(row.id) !== 1) errors.push(`${row.id}: expected exactly one integrated atlas relationship`);
  relationshipIds.add(row.id);
  if (!endpointIds.has(row.from)) errors.push(`${row.id}: missing from endpoint ${row.from}`);
  if (!endpointIds.has(row.to)) errors.push(`${row.id}: missing to endpoint ${row.to}`);
  if (!row.verified || !row.source?.url || !row.evidence || !row.evidenceObject) errors.push(`${row.id}: relationship evidence incomplete`);
  if (row.subtype === "postdoc_mentor" && row.from !== "wojciech-matusik-mit-p0-b6") errors.push(`${row.id}: unexpected postdoc mentor direction`);
}

for (const promotion of rosterPromotions) {
  if (!batchIds.has(promotion.atlasPersonId)) errors.push(`${promotion.rosterName}: promotion endpoint missing`);
  if (!promotion.unitUrl || !promotion.rosterName) errors.push(`${promotion.atlasPersonId}: incomplete promotion`);
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  people: people.length,
  relationships: relationships.length,
  placements: placements.length,
  groupMembers: groupMembers.length,
  rosterPromotions: rosterPromotions.length,
  portraitDimensions: "512x512",
  relationshipEndpointsVerified: true,
}, null, 2));
