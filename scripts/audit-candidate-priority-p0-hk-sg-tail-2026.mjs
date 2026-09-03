import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = "app/candidate-priority-p0-hk-sg-tail-batch-2026.ts";
const output = "/private/tmp/p0-hk-sg-tail-batch.mjs";
const esbuild = path.join(root, "node_modules/.bin/esbuild");
execFileSync(esbuild, [path.join(root, modulePath), "--bundle", "--platform=node", "--format=esm", `--outfile=${output}`], { stdio: "ignore" });

const batch = await import(`file://${output}?t=${Date.now()}`);
const master = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json"), "utf8"));
const people = batch.people ?? [];
const supportingPeople = batch.supportingPeople ?? [];
const relationships = batch.relationships ?? [];
const placements = batch.placements ?? [];
const groupMembers = batch.groupMembers ?? [];
const promotions = batch.rosterPromotions ?? [];
const errors = [];
const warnings = [];

const expectedCanonicalKeys = new Set([
  "Hong Kong:香港中文大学:chiwingfu",
  "Hong Kong:香港中文大学:patrickpclee",
  "Hong Kong:香港中文大学:qiangxu",
  "Hong Kong:香港中文大学:yuanyixuan袁奕萱",
  "Hong Kong:香港中文大学:shengchaoliu",
  "Singapore:Nanyang Technological University:assocprofyingzhenli",
  "Singapore:Nanyang Technological University:assocprofyuhan",
  "Singapore:Nanyang Technological University:asstprofalvinchanguowei",
  "Singapore:National University of Singapore:anjiliu",
  "Singapore:National University of Singapore:chentsuhan",
]);
const selectedRows = master.records.filter((row) => expectedCanonicalKeys.has(row.canonicalKey));
if (selectedRows.length !== expectedCanonicalKeys.size) errors.push(`master ledger match: expected ${expectedCanonicalKeys.size}, found ${selectedRows.length}`);
const expectedAtlasIds = new Map([
  ["Hong Kong:香港中文大学:chiwingfu", "chi-wing-fu-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:patrickpclee", "patrick-lee-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:qiangxu", "qiang-xu-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:yuanyixuan袁奕萱", "yixuan-yuan-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:shengchaoliu", "shengchao-liu-cuhk-p0-tail"],
  ["Singapore:Nanyang Technological University:assocprofyingzhenli", "yingzhen-li-ntu-p0-tail"],
  ["Singapore:Nanyang Technological University:assocprofyuhan", "yu-han-ntu-p0-tail"],
  ["Singapore:Nanyang Technological University:asstprofalvinchanguowei", "alvin-chan-ntu-p0-tail"],
  ["Singapore:National University of Singapore:anjiliu", "anji-liu-nus-p0-tail"],
  ["Singapore:National University of Singapore:chentsuhan", "tsuhan-chen-nus-p0-tail"],
]);
for (const row of selectedRows) {
  if (!(["Hong Kong", "Singapore"].includes(row.region))) errors.push(`${row.canonicalKey}: outside allowed region`);
  const expectedId = expectedAtlasIds.get(row.canonicalKey);
  if (row.disposition !== "ready" || !expectedId || row.atlasPersonId !== expectedId) errors.push(`${row.canonicalKey}: master disposition is not the published ready record`);
}

if (people.length !== 10) errors.push(`expected 10 primary people, found ${people.length}`);
if (supportingPeople.length !== 2) errors.push(`expected 2 supporting endpoint people, found ${supportingPeople.length}`);
if (promotions.length !== people.length) errors.push(`expected one roster promotion per primary person`);
const allPeople = [...people, ...supportingPeople];
const duplicateIds = allPeople.map((row) => row.id).filter((id, index, rows) => rows.indexOf(id) !== index);
if (duplicateIds.length) errors.push(`duplicate person ids: ${duplicateIds.join(", ")}`);

for (const person of people) {
  if (!person.primary || person.category !== "core") errors.push(`${person.id}: not marked as primary core PI`);
  if (!String(person.status ?? "").includes("current independent PI")) errors.push(`${person.id}: current independent PI status not explicit`);
  if (!(["Hong Kong", "Singapore"].includes(person.region))) errors.push(`${person.id}: invalid region`);
  if (new Set(person.sources.map((row) => row.url)).size < 2) errors.push(`${person.id}: fewer than two distinct sources`);
  if (!Array.isArray(person.facts) || person.facts.length < 3 || person.facts.length > 5) errors.push(`${person.id}: facts must contain 3-5 entries`);
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url)) errors.push(`${person.id}: missing sourced education/training fact`);
  for (const row of person.facts ?? []) if (!row.source?.url) errors.push(`${person.id}: unsourced fact ${row.label}`);
  const portraitPath = person.portrait?.src ? path.join(root, "public", person.portrait.src) : null;
  if (!portraitPath || !fs.existsSync(portraitPath) || fs.statSync(portraitPath).size < 1024) errors.push(`${person.id}: missing or undersized local portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.id}: portrait is not 512x512`);
  }
  const networkEvidence = relationships.filter((row) => row.from === person.id || row.to === person.id).length
    + placements.filter((row) => row.teacherId === person.id).length
    + groupMembers.filter((row) => row.teacherId === person.id).length;
  if (networkEvidence < 1) errors.push(`${person.id}: no verifiable network evidence`);
}

const availableIds = new Set(allPeople.map((row) => row.id));
for (const stableId of ["jian-tang-ca", "yew-soon-ong-ntu"]) availableIds.add(stableId);
for (const row of relationships) {
  if (!availableIds.has(row.from) || !availableIds.has(row.to)) errors.push(`${row.id}: missing endpoint`);
  if (!row.verified || !row.source?.url || !row.evidence || !row.evidenceObject) errors.push(`${row.id}: incomplete relationship evidence`);
}
for (const row of placements) if (!row.source?.url || !row.verifiedAt) errors.push(`${row.id}: incomplete placement evidence`);
for (const row of groupMembers) if (!row.source?.url) errors.push(`${row.id}: missing group-member source`);

const promotedIds = new Set(promotions.map((row) => row.atlasPersonId));
for (const person of people) if (!promotedIds.has(person.id)) errors.push(`${person.id}: missing roster promotion`);
for (const promotion of promotions) if (!promotion.unitUrl || !promotion.rosterName || !promotion.atlasPersonId) errors.push(`incomplete promotion row: ${JSON.stringify(promotion)}`);

const report = {
  ok: errors.length === 0,
  module: modulePath,
  startingScope: { region: ["Hong Kong", "Singapore"], disposition: ["missing_portrait", "missing_relationship"] },
  primaryPeople: people.length,
  supportingEndpointPeople: supportingPeople.length,
  relationships: relationships.length,
  groupMembers: groupMembers.length,
  placements: placements.length,
  rosterPromotions: promotions.length,
  portraits: { required: people.length, present512x512: people.length - errors.filter((row) => row.includes("portrait")).length },
  masterLedgerMatches: selectedRows.length,
  errors,
  warnings,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
