import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import sharp from "sharp";

const root = process.cwd();
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const temporaryEntry = "/private/tmp/candidate-priority-p0-batch-2-entry.ts";
fs.writeFileSync(temporaryEntry, `
  export * as asia from ${JSON.stringify(path.join(root, "app/candidate-priority-p0-asia-batch-2-2026.ts"))};
  export * as europe from ${JSON.stringify(path.join(root, "app/candidate-priority-p0-europe-batch-2-2026.ts"))};
  export * as usCanada from ${JSON.stringify(path.join(root, "app/candidate-priority-p0-us-canada-batch-2-2026.ts"))};
  export { people, relationships, studentPlacements, groupMembers } from ${JSON.stringify(path.join(root, "app/data.ts"))};
  export { topSchoolRosterPersonAudits } from ${JSON.stringify(path.join(root, "app/top-school-roster-ledger.ts"))};
`);

await build({
  entryPoints: [temporaryEntry],
  outfile: "/private/tmp/candidate-priority-p0-batch-2.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});

const current = await import(`${pathToFileURL("/private/tmp/candidate-priority-p0-batch-2.mjs").href}?v=${Date.now()}`);
const modules = [current.asia, current.europe, current.usCanada];
const promotedPeople = modules.flatMap((entry) => entry.people.filter((person) => person.primary));
const supportingPeople = modules.flatMap((entry) => entry.people.filter((person) => !person.primary));
const relationships = modules.flatMap((entry) => entry.relationships);
const placements = modules.flatMap((entry) => entry.placements);
const groupMembers = modules.flatMap((entry) => entry.groupMembers);
const rosterPromotions = modules.flatMap((entry) => entry.rosterPromotions);

assert(promotedPeople.length === 18, `expected 18 promoted P0 people, found ${promotedPeople.length}`);
assert(supportingPeople.length === 1, `expected one supporting mentor node, found ${supportingPeople.length}`);
assert(relationships.length === 14, `expected 14 verified relationships, found ${relationships.length}`);
assert(placements.length === 12, `expected 12 verified placements, found ${placements.length}`);
assert(groupMembers.length === 11, `expected 11 verified current group members, found ${groupMembers.length}`);
assert(rosterPromotions.length === 18, `expected 18 roster promotions, found ${rosterPromotions.length}`);

const allBatchPeople = [...promotedPeople, ...supportingPeople];
assert(new Set(allBatchPeople.map((person) => person.id)).size === allBatchPeople.length, "duplicate batch person IDs");
const currentIds = new Set(current.people.map((person) => person.id));
const currentRelationshipIds = new Set(current.relationships.map((relationship) => relationship.id));
const currentPlacementIds = new Set(current.studentPlacements.map((placement) => placement.id));
const currentGroupMemberIds = new Set(current.groupMembers.map((member) => member.id));

for (const person of promotedPeople) {
  assert(currentIds.has(person.id), `${person.id}: promoted person is not published`);
  assert(person.primary && person.category === "core", `${person.id}: is not a current core PI`);
  assert(person.sources.length >= 2, `${person.id}: fewer than two sources`);
  assert((person.facts?.length ?? 0) >= 3 && person.facts.length <= 5, `${person.id}: facts must contain 3–5 items`);
  assert(person.facts.every((item) => item.source?.url), `${person.id}: fact without a source`);
  assert(person.facts.some((item) => item.label === "教育与学术训练"), `${person.id}: missing education and training fact`);
  assert(person.portrait?.src, `${person.id}: local portrait metadata missing`);
  const portraitPath = path.join(root, "public", person.portrait.src);
  assert(fs.existsSync(portraitPath), `${person.id}: local portrait file missing`);
  const metadata = await sharp(portraitPath).metadata();
  assert(metadata.width === 512 && metadata.height === 512, `${person.id}: portrait is not 512×512`);
  const hasNetworkEvidence = relationships.some((relationship) => relationship.from === person.id || relationship.to === person.id)
    || placements.some((placement) => placement.teacherId === person.id)
    || groupMembers.some((member) => member.teacherId === person.id);
  assert(hasNetworkEvidence, `${person.id}: has no relationship, student placement or current group-member evidence`);
}

for (const relationship of relationships) {
  assert(relationship.verified && relationship.source?.url, `${relationship.id}: relationship lacks verification metadata`);
  assert(currentIds.has(relationship.from) && currentIds.has(relationship.to), `${relationship.id}: graph endpoint is missing`);
  assert(currentRelationshipIds.has(relationship.id), `${relationship.id}: relationship is not published`);
}
for (const placement of placements) {
  assert(placement.source?.url && placement.verifiedAt, `${placement.id}: placement lacks verification metadata`);
  assert(currentIds.has(placement.teacherId), `${placement.id}: teacher endpoint is missing`);
  assert(currentPlacementIds.has(placement.id), `${placement.id}: placement is not published`);
}
for (const member of groupMembers) {
  assert(member.source?.url, `${member.id}: group member lacks source`);
  assert(currentIds.has(member.teacherId), `${member.id}: teacher endpoint is missing`);
  assert(currentGroupMemberIds.has(member.id), `${member.id}: group member is not published`);
}

const normalize = (value) => value
  .replace(/^(prof(?:essor)?|dr|asst prof)\.?\s+/iu, "")
  .replace(/\s*\([^)]*\)\s*$/u, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();
const auditByKey = new Map(current.topSchoolRosterPersonAudits.map((audit) => [
  `${audit.unitUrl}:${normalize(audit.rosterName)}`,
  audit,
]));
for (const promotion of rosterPromotions) {
  const audit = auditByKey.get(`${promotion.unitUrl}:${normalize(promotion.rosterName)}`);
  assert(audit, `${promotion.rosterName}: roster audit record missing`);
  assert(audit.decision === "included", `${promotion.rosterName}: roster audit was not promoted to included`);
  assert(audit.atlasPersonId === promotion.atlasPersonId, `${promotion.rosterName}: roster audit points to the wrong atlas person`);
}

const queue = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-queue-2026-09-03.json"), "utf8"));
assert(queue.rosterCandidateRecords <= 6459, `candidate queue regressed above the post-batch-2 baseline: ${queue.rosterCandidateRecords}`);
assert(queue.tierCounts.P0 <= 1699, `P0 queue regressed above the post-batch-2 baseline: ${queue.tierCounts.P0}`);
assert(queue.completedBatch.promotedRosterCandidates >= 27, "queue does not record both completed candidate batches");

console.log(`Candidate P0 batch 2 audit passed: ${promotedPeople.length} promoted PIs, ${supportingPeople.length} supporting node, ${relationships.length} relationships, ${placements.length} placements and ${groupMembers.length} current group members; ${queue.tierCounts.P0} P0 candidates remain.`);
