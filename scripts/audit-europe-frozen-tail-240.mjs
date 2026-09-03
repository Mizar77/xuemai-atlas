import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { build } from "esbuild";

const root = process.cwd();
const decisionFile = "data/roster-decisions/europe-frozen-tail-240-decisions-2026-09-03.json";
const expansionFile = "app/europe-frozen-tail-pi-expansion-1.ts";
const expectedUnits = {
  "tum-cit": 160,
  "ucl-cs": 34,
  "aalto-cs": 28,
  "surrey-pai": 8,
  "tu-darmstadt-cs": 5,
  "edinburgh-informatics": 4,
  "tuebingen-cs": 1,
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizeName(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .toLowerCase()
    .trim();
}

async function loadTsModule(entryFile, source) {
  const result = await build({
    stdin: {
      contents: source,
      resolveDir: root,
      sourcefile: `${entryFile}.audit-entry.ts`,
      loader: "ts",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
    logLevel: "silent",
  });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
}

const decisions = JSON.parse(fs.readFileSync(path.join(root, decisionFile), "utf8"));
assert(decisions.newDecisionCount === 240, "Decision artifact must declare exactly 240 new decisions");
assert(decisions.decisions.length === 240, "Decision artifact must contain exactly 240 rows");
assert(decisions.selectedNewPiCount === 12, "Decision artifact must select exactly 12 new PI");
assert(decisions.decisions.every((row) => row.priorDecision === "pending_profile_verification"), "Every incremental row must originate from a pending decision");
assert(decisions.decisions.every((row) => !row.decision.startsWith("pending")), "No row may remain pending");

const decisionKeys = decisions.decisions.map((row) => `${row.unitUrl}\u0000${normalizeName(row.rosterName)}`);
assert(new Set(decisionKeys).size === decisionKeys.length, "Duplicate unitUrl + rosterName decision key");
for (const [unitId, expected] of Object.entries(expectedUnits)) {
  const rows = decisions.decisions.filter((row) => row.unitId === unitId);
  assert(rows.length === expected, `${unitId}: expected ${expected} rows, found ${rows.length}`);
  assert(decisions.units[unitId].newDecisionCount === expected, `${unitId}: summary count mismatch`);
}

const selectedRows = decisions.decisions.filter((row) => row.decision === "include_new_pi");
assert(selectedRows.length === 12, `Expected 12 include_new_pi rows, found ${selectedRows.length}`);
assert(selectedRows.every((row) => row.atlasPersonId), "Every include_new_pi row must have atlasPersonId");

const expansion = await loadTsModule(expansionFile, `
  export {
    europeFrozenTailPiExpansion1People,
    europeFrozenTailPiExpansion1Relationships,
    europeFrozenTailPiExpansion1GroupMembers,
    europeFrozenTailPiExpansion1StudentPlacements
  } from "./${expansionFile}";
`);
const canonical = await loadTsModule("app/data.ts", 'export { people } from "./app/data.ts";');
const people = expansion.europeFrozenTailPiExpansion1People;
const relationships = expansion.europeFrozenTailPiExpansion1Relationships;
const members = expansion.europeFrozenTailPiExpansion1GroupMembers;

assert(people.length === 12, `Expected 12 expansion people, found ${people.length}`);
assert(new Set(people.map((person) => person.id)).size === people.length, "Duplicate expansion person id");
assert(new Set(people.map((person) => normalizeName(person.name))).size === people.length, "Duplicate expansion person name");
const canonicalIds = new Set(canonical.people.map((person) => person.id));
const canonicalNames = new Set(canonical.people.map((person) => normalizeName(person.name)));
const canonicalById = new Map(canonical.people.map((person) => [person.id, person]));
const canonicalByName = new Map(canonical.people.map((person) => [normalizeName(person.name), person]));
// The audit is also run after the parent module has integrated this expansion.
// In that state, an exact id/name match is expected; only divergent collisions fail.
for (const person of people) {
  if (canonicalIds.has(person.id)) {
    assert(normalizeName(canonicalById.get(person.id)?.name) === normalizeName(person.name), `${person.name}: canonical id collision has a different name`);
  }
  if (canonicalNames.has(normalizeName(person.name))) {
    assert(canonicalByName.get(normalizeName(person.name))?.id === person.id, `${person.name}: canonical name collision has a different id`);
  }
}

const selectedIds = new Set(selectedRows.map((row) => row.atlasPersonId));
assert(people.every((person) => selectedIds.has(person.id)), "Expansion includes a person absent from include_new_pi decisions");
assert(selectedIds.size === people.length, "include_new_pi and expansion person counts differ");

const portraitHashes = [];
for (const person of people) {
  assert(person.region === "Europe", `${person.name}: incorrect region`);
  assert(person.summary?.length >= 25, `${person.name}: summary too short`);
  assert(person.facts?.length >= 3, `${person.name}: fewer than 3 facts`);
  assert(person.sources?.length >= 3, `${person.name}: fewer than 3 first-party sources`);
  assert(person.sources.every((source) => source.url.startsWith("https://") && source.checkedAt === "2026-09-03"), `${person.name}: malformed source`);
  assert(person.portrait?.source?.url?.startsWith("https://"), `${person.name}: portrait lacks official source`);
  const portraitPath = path.join(root, "public", person.portrait.src);
  assert(fs.existsSync(portraitPath), `${person.name}: portrait file missing`);
  const metadata = await sharp(portraitPath).metadata();
  assert(metadata.width === 512 && metadata.height === 512 && metadata.format === "webp", `${person.name}: portrait must be 512x512 WebP`);
  portraitHashes.push(crypto.createHash("sha256").update(fs.readFileSync(portraitPath)).digest("hex"));
}
assert(new Set(portraitHashes).size === portraitHashes.length, "Duplicate portrait binary detected");

const expansionIds = new Set(people.map((person) => person.id));
assert(relationships.every((edge) => expansionIds.has(edge.from) && expansionIds.has(edge.to) && edge.verified && edge.source?.url), "Relationship endpoint or evidence invalid");
assert(new Set(relationships.map((edge) => edge.id)).size === relationships.length, "Duplicate relationship id");
assert(members.every((member) => expansionIds.has(member.teacherId) && member.source?.url), "Group member teacher or source invalid");
assert(new Set(members.map((member) => member.id)).size === members.length, "Duplicate group member id");

const expectedCounts = {
  eligible_future_batch: 97,
  excluded_non_ai_cs: 83,
  include_new_pi: 12,
  included_existing: 1,
  excluded_non_pi: 47,
};
for (const [decision, expected] of Object.entries(expectedCounts)) {
  const actual = decisions.decisions.filter((row) => row.decision === decision).length;
  assert(actual === expected, `${decision}: expected ${expected}, found ${actual}`);
}

console.log(JSON.stringify({
  status: "PASS",
  decisionRows: decisions.decisions.length,
  pendingRows: decisions.decisions.filter((row) => row.decision.startsWith("pending")).length,
  includeNewPi: people.length,
  portraits: portraitHashes.length,
  relationships: relationships.length,
  groupMembers: members.length,
  unitCounts: expectedUnits,
  decisionCounts: expectedCounts,
}, null, 2));
