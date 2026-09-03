import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";
import sharp from "sharp";

const root = process.cwd();
const modulePath = path.join(root, "app/europe-next-roster-pi-expansion-1.ts");
const bundlePath = "/private/tmp/europe-next-roster-pi-expansion-1.mjs";
const sharedBundlePath = "/private/tmp/europe-next-shared-data.mjs";

await build({ entryPoints: [modulePath], outfile: bundlePath, bundle: true, platform: "node", format: "esm" });
await build({ entryPoints: [path.join(root, "app/data.ts")], outfile: sharedBundlePath, bundle: true, platform: "node", format: "esm" });
const data = await import(`file://${bundlePath}?v=${Date.now()}`);
const shared = await import(`file://${sharedBundlePath}?v=${Date.now()}`);
const people = data.europeNextRosterPiExpansion1People;
const relationships = data.europeNextRosterPiExpansion1Relationships;
const members = data.europeNextRosterPiExpansion1GroupMembers;
const placements = data.europeNextRosterPiExpansion1StudentPlacements;
const review = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions/europe-next-268-review-2026-09-03.json"), "utf8"));

const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
assert(people.length === 15, `expected 15 people, got ${people.length}`);
assert(new Set(people.map((p) => p.id)).size === people.length, "duplicate person id");
assert(new Set(people.map((p) => p.name)).size === people.length, "duplicate person name");

for (const person of people) {
  assert(person.primary === true && person.category === "core", `${person.id}: not a primary core PI`);
  assert(person.sources.length >= 2, `${person.id}: fewer than two first-party sources`);
  assert(person.facts?.length >= 3 && person.facts.length <= 5, `${person.id}: facts must contain 3–5 entries`);
  assert(person.facts?.some((fact) => fact.label === "教育与学术训练"), `${person.id}: missing education/training fact`);
  assert(person.introducedAt === "2026-09-03" && person.lastVerifiedAt === "2026-09-03", `${person.id}: verification dates incomplete`);
  assert(person.portrait?.src, `${person.id}: missing portrait`);
  if (person.portrait?.src) {
    const portraitPath = path.join(root, "public", person.portrait.src);
    assert(fs.existsSync(portraitPath), `${person.id}: portrait file not found`);
    if (fs.existsSync(portraitPath)) {
      const metadata = await sharp(portraitPath).metadata();
      assert(metadata.width === 512 && metadata.height === 512, `${person.id}: portrait is ${metadata.width}x${metadata.height}, expected 512x512`);
    }
  }
}

const selectedIds = new Set(people.map((p) => p.id));
const allowedExistingIds = new Set(["carl-rasmussen-lineage", "andreas-krause-eu", "jure-leskovec-lineage", "bernhard-schoelkopf-eu"]);
for (const relation of relationships) {
  assert(relation.verified && relation.source?.url && relation.evidence, `${relation.id}: incomplete relationship evidence`);
  assert(selectedIds.has(relation.from) || allowedExistingIds.has(relation.from), `${relation.id}: unknown from endpoint`);
  assert(selectedIds.has(relation.to) || allowedExistingIds.has(relation.to), `${relation.id}: unknown to endpoint`);
}
for (const entry of members) assert(selectedIds.has(entry.teacherId) && entry.source?.url, `${entry.id}: invalid group member`);
for (const entry of placements) assert(selectedIds.has(entry.teacherId) && entry.source?.url && entry.sector, `${entry.id}: invalid placement`);

assert(review.officialRosterCount === 268 && review.reviewedCount === 268, "review ledger is not 268/268 complete");
assert(review.titleCompleteCount === 268, `expected 268 title-complete records, got ${review.titleCompleteCount}`);
assert(review.selectedNewPiCount === people.length, "review ledger selection does not match module people count");
assert(review.decisions.every((row) => row.reviewStatus === "reviewed" && row.reviewedDecision), "review ledger contains unresolved rows");
assert(review.decisions.every((row) => row.titleFieldVerified), "review ledger contains a title-incomplete row");
assert(review.decisions.filter((row) => row.selectedForEnrichment).every((row) => row.profileUrl), "selected review rows contain a profile-incomplete row");
assert(review.decisions.filter((row) => row.selectedForEnrichment).every((row) => row.originalDecision === "include_new_pi"), "selected review rows are not all include_new_pi");
assert(review.decisions.filter((row) => row.selectedForEnrichment).every((row) => selectedIds.has(row.atlasPersonId)), "selected review rows do not map to module people");

const sharedData = fs.readFileSync(path.join(root, "app/data.ts"), "utf8");
assert(!sharedData.includes("europe-next-roster-pi-expansion-1"), "independent module was imported into shared app/data.ts");
const existingNames = new Set(shared.people.map((person) => person.name));
assert(people.every((person) => !existingNames.has(person.name)), "one or more selected people already exist in the shared atlas dataset");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  review: `${review.reviewedCount}/${review.officialRosterCount}`,
  titleComplete: review.titleCompleteCount,
  people: people.length,
  sourcesMinimum: Math.min(...people.map((person) => person.sources.length)),
  factsRange: [Math.min(...people.map((person) => person.facts.length)), Math.max(...people.map((person) => person.facts.length))],
  portraits512: people.length,
  relationships: relationships.length,
  groupMembers: members.length,
  placements: placements.length,
  existingNameCollisions: people.filter((person) => existingNames.has(person.name)).length,
}, null, 2));
