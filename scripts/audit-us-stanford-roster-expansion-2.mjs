import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const modulePath = path.join(root, "app/us-stanford-roster-expansion-2.ts");
const source = fs.readFileSync(modulePath, "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  fileName: modulePath,
}).outputText;
const mod = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

const people = mod.usStanfordRosterExpansion2People;
const enhancements = mod.usStanfordRosterExpansion2PersonEnhancements;
const portraits = mod.usStanfordRosterExpansion2Portraits;
const relationships = mod.usStanfordRosterExpansion2Relationships;
const failures = [];

if (people.length !== 7) failures.push(`expected 7 new PI, found ${people.length}`);
if (Object.keys(enhancements).length !== 5) failures.push(`expected 5 canonical-node enhancements, found ${Object.keys(enhancements).length}`);
if (Object.keys(portraits).length !== 5) failures.push(`expected 5 canonical-node portrait upgrades, found ${Object.keys(portraits).length}`);

function checkSources(label, sources) {
  const urls = new Set((sources || []).map((item) => item.url));
  if (urls.size < 2) failures.push(`${label}: fewer than two independent first-party source URLs`);
  if ((sources || []).some((item) => !["official", "profile", "cv", "thesis"].includes(item.kind))) {
    failures.push(`${label}: contains a non-first-party source kind`);
  }
}

function checkPortrait(label, portrait) {
  if (!portrait?.src) return failures.push(`${label}: missing portrait`);
  const file = path.join(root, "public", portrait.src);
  if (!fs.existsSync(file)) return failures.push(`${label}: portrait file not found: ${portrait.src}`);
  const stat = fs.statSync(file);
  if (stat.size < 10_000) failures.push(`${label}: portrait file too small (${stat.size} bytes)`);
  const magic = fs.readFileSync(file).subarray(0, 8).toString("hex");
  if (!magic.startsWith("ffd8ff") && magic !== "89504e470d0a1a0a") failures.push(`${label}: unsupported portrait signature ${magic}`);
}

for (const person of people) {
  if ((person.facts || []).length < 4) failures.push(`${person.id}: fewer than four sourced facts`);
  if ((person.facts || []).some((fact) => !fact.source?.url)) failures.push(`${person.id}: unsourced fact`);
  checkSources(person.id, person.sources);
  checkPortrait(person.id, person.portrait);
}

for (const [id, enhancement] of Object.entries(enhancements)) {
  if ((enhancement.facts || []).length < 4) failures.push(`${id}: fewer than four sourced upgrade facts`);
  if ((enhancement.facts || []).some((fact) => !fact.source?.url)) failures.push(`${id}: unsourced upgrade fact`);
  checkSources(id, enhancement.sources);
  checkPortrait(id, portraits[id]);
}

const newIds = new Set(people.map((person) => person.id));
for (const relationship of relationships) {
  if (!relationship.verified || !relationship.source?.url || !relationship.evidence) failures.push(`${relationship.id}: relationship lacks explicit first-party evidence`);
  if (!newIds.has(relationship.to)) failures.push(`${relationship.id}: target is not in this expansion`);
}

for (const [file, checks] of [
  ["stanford-cs-2026-09-02.json", { "Maneesh Agrawala": "include_new_pi", "Jure Leskovec": "include_new_pi", "Sanmi Koyejo": "included_existing" }],
  ["stanford-sail-2026-09-02.json", { "Carlos Guestrin": "include_new_pi", "Andrew Ng": "excluded_non_pi", "Sebastian Thrun": "excluded_industry_only", "Ludwig Schmidt": "included_existing" }],
]) {
  const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions", file), "utf8"));
  if (ledger.decisionCount !== ledger.officialRosterCount) failures.push(`${file}: decisions do not balance`);
  for (const [name, expected] of Object.entries(checks)) {
    const decision = ledger.decisions.find((item) => item.name === name);
    if (decision?.decision !== expected) failures.push(`${file}/${name}: expected ${expected}, found ${decision?.decision}`);
  }
}

if (failures.length) {
  console.error(`Stanford expansion QA failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Stanford expansion QA passed: ${people.length} new PI, ${Object.keys(enhancements).length} canonical upgrades, ${people.length + Object.keys(portraits).length} official portraits, ${relationships.length} explicit relationship.`);
