import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const esbuild = path.join(root, "node_modules/.bin/esbuild");
const batchBundle = "/private/tmp/candidate-p0-asia-batch-10-audit.mjs";
const dataBundle = "/private/tmp/candidate-p0-asia-batch-10-data-audit.mjs";
execFileSync(esbuild, [path.join(root, "app/candidate-priority-p0-asia-batch-10-2026.ts"), "--bundle", "--platform=node", "--format=esm", `--outfile=${batchBundle}`], { stdio: "ignore" });
execFileSync(esbuild, [path.join(root, "app/data.ts"), "--bundle", "--platform=node", "--format=esm", `--outfile=${dataBundle}`], { stdio: "ignore" });

const batch = await import(`file://${batchBundle}?t=${Date.now()}`);
const atlas = await import(`file://${dataBundle}?t=${Date.now()}`);
const people = batch.candidatePriorityP0AsiaBatch10People2026;
const relationships = batch.candidatePriorityP0AsiaBatch10Relationships2026;
const placements = batch.candidatePriorityP0AsiaBatch10Placements2026;
const groupMembers = batch.candidatePriorityP0AsiaBatch10GroupMembers2026;
const promotions = batch.candidatePriorityP0AsiaBatch10RosterPromotions2026;
const errors = [];
const batchIds = new Set(people.map((person) => person.id));
const atlasIds = new Set(atlas.people.map((person) => person.id));

if (people.length !== 4 || batchIds.size !== 4) errors.push(`expected 4 unique people, got ${people.length}/${batchIds.size}`);
if (promotions.length !== people.length) errors.push(`promotion count ${promotions.length} != people ${people.length}`);

for (const person of people) {
  if (atlas.people.filter((row) => row.id === person.id).length !== 1) errors.push(`${person.id}: expected exactly one integrated person`);
  if (new Set((person.sources ?? []).map((item) => item.url)).size < 2) errors.push(`${person.name}: fewer than two sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: facts must be 3-5`);
  if (!person.facts.every((row) => row.source?.url)) errors.push(`${person.name}: unsourced fact`);
  const portraitPath = path.join(root, "public", person.portrait?.src ?? "");
  if (!person.portrait?.src || !fs.existsSync(portraitPath)) errors.push(`${person.name}: missing portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait is not 512x512`);
  }
  const networkCount = relationships.filter((row) => row.from === person.id || row.to === person.id).length
    + placements.filter((row) => row.teacherId === person.id).length
    + groupMembers.filter((row) => row.teacherId === person.id).length;
  if (!networkCount) errors.push(`${person.name}: missing network evidence`);
}

for (const relationship of relationships) {
  if (atlas.relationships.filter((row) => row.id === relationship.id).length !== 1) errors.push(`${relationship.id}: expected exactly one integrated relationship`);
  if (!atlasIds.has(relationship.from) || !atlasIds.has(relationship.to)) errors.push(`${relationship.id}: endpoint missing`);
  if (!relationship.verified || !relationship.source?.url || !relationship.evidence || !relationship.evidenceObject) errors.push(`${relationship.id}: incomplete evidence`);
}

for (const promotion of promotions) {
  if (!batchIds.has(promotion.atlasPersonId) || !promotion.unitUrl || !promotion.rosterName) errors.push(`${promotion.atlasPersonId}: invalid promotion`);
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, people: people.length, relationships: relationships.length, placements: placements.length, groupMembers: groupMembers.length, promotions: promotions.length }, null, 2));
