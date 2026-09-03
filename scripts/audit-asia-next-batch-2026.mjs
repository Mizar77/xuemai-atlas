import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import sharp from "sharp";

const root = process.cwd();
const modulePath = path.join(root, "app/asia-next-roster-pi-expansion-2026.ts");
const bundledModule = "/private/tmp/asia-next-roster-pi-expansion-2026.mjs";
const bundledData = "/private/tmp/asia-next-current-data-2026.mjs";
const decisionPaths = [
  "data/roster-decisions/nus-computing-next-batch-2026-09-03.json",
  "data/roster-decisions/smu-scis-next-batch-2026-09-03.json",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

await build({
  entryPoints: [modulePath],
  outfile: bundledModule,
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});
await build({
  entryPoints: [path.join(root, "app/data.ts")],
  outfile: bundledData,
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});

const proposal = await import(`${pathToFileURL(bundledModule).href}?v=${Date.now()}`);
const current = await import(`${pathToFileURL(bundledData).href}?v=${Date.now()}`);
const people = proposal.asiaNextRosterPiExpansionPeople2026;
const relationships = proposal.asiaNextRosterPiExpansionRelationships2026;

assert(people.length >= 15 && people.length <= 20, `Expected 15–20 graph-ready people, got ${people.length}`);
assert(new Set(people.map((person) => person.id)).size === people.length, "Duplicate IDs inside Asia next-batch proposal");
assert(new Set(relationships.map((edge) => edge.id)).size === relationships.length, "Duplicate relationship IDs inside Asia next-batch proposal");

const currentIds = new Set(current.people.map((person) => person.id));
const currentNames = new Set(current.people.map((person) => person.name));
for (const person of people) {
  assert(!currentIds.has(person.id), `${person.id}: ID already exists in current app/data.ts graph`);
  assert(!currentNames.has(person.name), `${person.name}: name already exists in current app/data.ts graph`);
  assert(person.primary === true && person.category === "core", `${person.id}: must be a current core PI`);
  assert(person.sources.length >= 2, `${person.id}: fewer than two sources`);
  assert(new Set(person.sources.map((source) => source.url)).size >= 2, `${person.id}: sources do not contain two distinct first-party URLs`);
  assert(person.sources.every((source) => source.kind === "official"), `${person.id}: non-official source in first-party package`);
  assert(person.facts?.length >= 3 && person.facts.length <= 5, `${person.id}: expected 3–5 facts`);
  assert(person.facts.every((fact) => fact.source?.url), `${person.id}: fact without a source`);
  assert(person.portrait?.source?.url, `${person.id}: portrait without official provenance`);

  const portraitPath = path.join(root, "public", person.portrait.src);
  assert(fs.existsSync(portraitPath), `${person.id}: portrait missing at ${portraitPath}`);
  const metadata = await sharp(portraitPath).metadata();
  assert(metadata.width === 512 && metadata.height === 512, `${person.id}: portrait is ${metadata.width}x${metadata.height}, expected 512x512`);
  assert(metadata.format === "jpeg", `${person.id}: portrait format is ${metadata.format}, expected jpeg`);
}

const availableIds = new Set([...currentIds, ...people.map((person) => person.id)]);
for (const edge of relationships) {
  assert(availableIds.has(edge.from) && availableIds.has(edge.to), `${edge.id}: relationship endpoint missing`);
  assert(edge.verified === true && edge.source?.url, `${edge.id}: relationship is not source-verified`);
  assert(edge.subtype === "phd_adviser", `${edge.id}: unexpected unreviewed relationship subtype`);
}

const decisions = decisionPaths.map((relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8")));
const rows = decisions.flatMap((unit) => unit.decisions);
assert(rows.length === 312, `Expected 312 decisions, got ${rows.length}`);
assert(decisions.every((unit) => unit.decisionCount === unit.officialRosterCount), "Decision count does not equal frozen official roster count");
assert(new Set(rows.map((row) => row.officialId)).size === rows.length, "Duplicate official IDs in 312-person decision batch");

const totalsByDecision = Object.fromEntries(
  [...new Set(rows.map((row) => row.decision))]
    .sort()
    .map((decision) => [decision, rows.filter((row) => row.decision === decision).length]),
);

console.log(JSON.stringify({
  decisions: rows.length,
  totalsByDecision,
  graphReadyPeople: people.length,
  officialPortraits512: people.length,
  verifiedRelationships: relationships.length,
  duplicateIdsAgainstCurrentGraph: 0,
}, null, 2));
