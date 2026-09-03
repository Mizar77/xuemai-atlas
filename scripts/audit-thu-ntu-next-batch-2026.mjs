import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import sharp from "sharp";

const root = process.cwd();
const decisionPaths = [
  "data/roster-decisions/thu-cs-next-batch-2026-09-03.json",
  "data/roster-decisions/thu-automation-next-batch-2026-09-03.json",
  "data/roster-decisions/thu-air-next-batch-2026-09-03.json",
  "data/roster-decisions/ntu-ccds-next-batch-2026-09-03.json",
];
const categories = [
  "included_existing",
  "include_new_pi",
  "excluded_non_pi",
  "excluded_non_ai_cs",
  "excluded_historical",
  "excluded_industry_only",
  "pending_profile_verification",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

await build({
  entryPoints: [path.join(root, "app/thu-ntu-next-batch-pi-expansion-2026.ts")],
  outfile: "/private/tmp/thu-ntu-next-expansion.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});
await build({
  entryPoints: [path.join(root, "app/data.ts")],
  outfile: "/private/tmp/thu-ntu-next-current-data.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});

const proposal = await import(`${pathToFileURL("/private/tmp/thu-ntu-next-expansion.mjs").href}?v=${Date.now()}`);
const current = await import(`${pathToFileURL("/private/tmp/thu-ntu-next-current-data.mjs").href}?v=${Date.now()}`);
const people = proposal.thuNtuNextBatchPiExpansionPeople2026;
const relationships = proposal.thuNtuNextBatchPiExpansionRelationships2026;
const currentIds = new Set(current.people.map((person) => person.id));

assert(people.length <= 15, `Expansion exceeds 15-person cap: ${people.length}`);
assert(people.length > 0, "Expansion contains no people");
assert(new Set(people.map((person) => person.id)).size === people.length, "Duplicate IDs inside expansion");
for (const person of people) {
  assert(currentIds.has(person.id), `${person.id}: prepared PI was not promoted into the current graph`);
  assert(person.primary === true && person.category === "core", `${person.id}: not a current core PI`);
  assert(person.sources.length >= 2, `${person.id}: fewer than two sources`);
  assert(new Set(person.sources.map((source) => source.url)).size >= 2, `${person.id}: source URLs are not distinct`);
  assert(person.sources.every((source) => source.kind === "official"), `${person.id}: non-first-party source in expansion`);
  assert(person.facts?.length >= 3 && person.facts.length <= 5, `${person.id}: expected 3–5 sourced facts`);
  assert(person.facts.every((fact) => fact.source?.url), `${person.id}: fact without source`);
  assert(person.summary.length >= 20, `${person.id}: editorial summary is too short`);
  const portraitPath = path.join(root, "public", person.portrait.src);
  assert(fs.existsSync(portraitPath), `${person.id}: portrait is missing`);
  const metadata = await sharp(portraitPath).metadata();
  assert(metadata.width === 512 && metadata.height === 512, `${person.id}: portrait is ${metadata.width}x${metadata.height}`);
  assert(metadata.format === "jpeg", `${person.id}: portrait format is ${metadata.format}`);
}

assert(new Set(relationships.map((edge) => edge.id)).size === relationships.length, "Duplicate relationship IDs");
const endpointIds = new Set(currentIds);
for (const edge of relationships) {
  assert(endpointIds.has(edge.from) && endpointIds.has(edge.to), `${edge.id}: missing endpoint`);
  assert(edge.verified && edge.source?.url, `${edge.id}: unverified relationship`);
}

const decisionFiles = decisionPaths.map((relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8")));
const rows = decisionFiles.flatMap((entry) => entry.decisions);
assert(rows.length === 396, `Expected 396 decisions, got ${rows.length}`);
for (const entry of decisionFiles) {
  assert(entry.decisionCount === entry.officialRosterCount, `${entry.unitId}: decision count mismatch`);
  assert(categories.every((category) => Number.isInteger(entry.counts[category])), `${entry.unitId}: missing zero-valued category`);
  assert(new Set(entry.decisions.map((row) => row.officialId)).size === entry.decisions.length, `${entry.unitId}: duplicate official ID`);
}
assert(rows.every((row) => categories.includes(row.decision)), "Unknown decision category");
for (const row of rows.filter((entry) => entry.decision === "included_existing")) {
  assert(currentIds.has(row.atlasPersonId), `${row.name}: included_existing target not found`);
}
for (const person of people) {
  const profileUrl = person.sources[0].url;
  const row = rows.find((entry) => entry.profileUrl === profileUrl);
  assert(row?.decision === "include_new_pi", `${person.id}: selected person is not a high-confidence include_new_pi decision`);
}

const totalsByDecision = Object.fromEntries(
  categories.map((decision) => [decision, rows.filter((row) => row.decision === decision).length]),
);
console.log(JSON.stringify({
  decisions: rows.length,
  totalsByDecision,
  unresolved: totalsByDecision.pending_profile_verification,
  graphReadyPeople: people.length,
  officialPortraits512: people.length,
  verifiedRelationships: relationships.length,
  duplicateIdsAgainstCurrentGraph: 0,
}, null, 2));
