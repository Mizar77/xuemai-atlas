import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import sharp from "sharp";

const root = process.cwd();
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

await build({
  entryPoints: [path.join(root, "app/candidate-priority-batch-1-2026.ts")],
  outfile: "/private/tmp/candidate-priority-batch-1.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});
await build({
  entryPoints: [path.join(root, "app/data.ts")],
  outfile: "/private/tmp/candidate-priority-current-data.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});

const batch = await import(`${pathToFileURL("/private/tmp/candidate-priority-batch-1.mjs").href}?v=${Date.now()}`);
const current = await import(`${pathToFileURL("/private/tmp/candidate-priority-current-data.mjs").href}?v=${Date.now()}`);
const people = batch.candidatePriorityBatch1People2026;
const relationships = batch.candidatePriorityBatch1Relationships2026;
const placements = batch.candidatePriorityBatch1Placements2026;

assert(people.length === 9, `expected 9 network endpoint people, found ${people.length}`);
assert(relationships.length === 9, `expected 9 verified relationships, found ${relationships.length}`);
assert(placements.length === 9, `expected 9 verified placements, found ${placements.length}`);
assert(new Set(people.map((person) => person.id)).size === people.length, "duplicate endpoint person IDs");

const currentIds = new Set(current.people.map((person) => person.id));
const currentRelationshipIds = new Set(current.relationships.map((relationship) => relationship.id));
const currentPlacementIds = new Set(current.studentPlacements.map((placement) => placement.id));
for (const person of people) {
  assert(currentIds.has(person.id), `${person.id}: endpoint person is not in the current graph`);
  assert(person.primary && person.category === "core", `${person.id}: not a current core PI`);
  assert(person.sources.length >= 2, `${person.id}: fewer than two sources`);
  assert((person.facts?.length ?? 0) >= 3, `${person.id}: fewer than three sourced facts`);
  assert(person.facts.every((item) => item.source?.url), `${person.id}: fact without source`);
  const portraitPath = path.join(root, "public", person.portrait.src);
  assert(fs.existsSync(portraitPath), `${person.id}: local portrait missing`);
  const metadata = await sharp(portraitPath).metadata();
  assert(metadata.width === 512 && metadata.height === 512, `${person.id}: portrait is not 512×512`);
}
for (const relationship of relationships) {
  assert(relationship.verified && relationship.source?.url, `${relationship.id}: relationship is not verified`);
  assert(currentIds.has(relationship.from) && currentIds.has(relationship.to), `${relationship.id}: missing graph endpoint`);
  assert(currentRelationshipIds.has(relationship.id), `${relationship.id}: relationship is not published`);
}
for (const placement of placements) {
  assert(placement.source?.url && placement.verifiedAt, `${placement.id}: placement lacks evidence metadata`);
  assert(currentPlacementIds.has(placement.id), `${placement.id}: placement is not published`);
}

const promotedIds = [
  "guoliang-li-thu",
  "jianyong-wang-thu",
  "yuxiao-dong-thu",
  "yongjin-liu-thu",
  "wenwu-zhu-thu",
  "changshui-zhang-thu",
  "xuegong-zhang-thu",
  "jiwen-lu-thu",
  "yebin-liu-thu",
];
for (const id of promotedIds) {
  assert(currentIds.has(id), `${id}: promoted roster candidate is not published`);
  assert(current.relationships.some((relationship) => relationship.from === id || relationship.to === id), `${id}: promoted candidate is isolated`);
}

const queue = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-queue-2026-09-03.json"), "utf8"));
assert(queue.rosterCandidateRecords <= 6477, `candidate queue regressed above the post-batch-1 baseline: ${queue.rosterCandidateRecords}`);
assert(queue.completedBatch.promotedRosterCandidates >= 9, "queue does not record the completed first batch");

console.log(`Candidate priority batch 1 audit passed: its 9 promoted candidates remain published; ${queue.rosterCandidateRecords} roster candidate records remain after later batches.`);
