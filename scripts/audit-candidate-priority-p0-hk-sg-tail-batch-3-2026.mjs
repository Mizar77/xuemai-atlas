import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = "app/candidate-priority-p0-hk-sg-tail-batch-3-2026.ts";
const output = "/private/tmp/p0-hk-sg-tail-batch-3.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, modulePath), "--bundle", "--platform=node", "--format=esm", `--outfile=${output}`], { stdio: "ignore" });
const batch = await import(`file://${output}?t=${Date.now()}`);
const master = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json"), "utf8"));
const people = batch.people ?? [];
const supportingPeople = batch.supportingPeople ?? [];
const relationships = batch.relationships ?? [];
const placements = batch.placements ?? [];
const groupMembers = batch.groupMembers ?? [];
const promotions = batch.rosterPromotions ?? [];
const errors = [];

const expectedCanonicalKeys = new Set([
  "Hong Kong:香港大学:cuiheming崔鶴鳴",
  "Hong Kong:香港大学:wuchuan吳川",
  "Hong Kong:香港大学:wuchenshu吳陳沭",
  "Hong Kong:香港大学:lamtakwah林德華",
  "Singapore:Singapore University of Technology and Design:leeroy",
  "Singapore:Singapore University of Technology and Design:songpeng",
]);
const selectedRows = master.records.filter((row) => expectedCanonicalKeys.has(row.canonicalKey));
if (selectedRows.length !== expectedCanonicalKeys.size) errors.push(`master ledger match: expected ${expectedCanonicalKeys.size}, found ${selectedRows.length}`);
const expectedAtlasIds = new Map([
  ["Hong Kong:香港大学:cuiheming崔鶴鳴", "heming-cui-hku-p0-tail-b3"],
  ["Hong Kong:香港大学:wuchuan吳川", "chuan-wu-hku-p0-tail-b3"],
  ["Hong Kong:香港大学:wuchenshu吳陳沭", "chenshu-wu-hku-p0-tail-b3"],
  ["Hong Kong:香港大学:lamtakwah林德華", "tak-wah-lam-hku-p0-tail-b3"],
  ["Singapore:Singapore University of Technology and Design:leeroy", "roy-lee-sutd-p0-tail-b3"],
  ["Singapore:Singapore University of Technology and Design:songpeng", "peng-song-sutd-p0-tail-b3"],
]);
for (const row of selectedRows) {
  if (!["Hong Kong", "Singapore"].includes(row.region)) errors.push(`${row.canonicalKey}: outside allowed region`);
  if (row.disposition !== "ready" || row.atlasPersonId !== expectedAtlasIds.get(row.canonicalKey)) errors.push(`${row.canonicalKey}: master disposition is not the published ready record`);
}

if (people.length !== 6) errors.push(`expected 6 primary people, found ${people.length}`);
if (supportingPeople.length !== 2) errors.push(`expected 2 supporting endpoints, found ${supportingPeople.length}`);
if (promotions.length < people.length) errors.push("expected at least one promotion per primary person");
const promotionKeys = new Set(promotions.map((row) => `${row.unitUrl}:${row.rosterName}`));
if (promotionKeys.size !== promotions.length) errors.push("duplicate roster promotion key");
const allPeople = [...people, ...supportingPeople];
const ids = new Set(allPeople.map((row) => row.id));
const externalIds = new Set(["chi-wing-fu-cuhk-p0-tail"]);
if (ids.size !== allPeople.length) errors.push("duplicate person id");

for (const person of people) {
  if (!person.primary || person.category !== "core") errors.push(`${person.id}: not primary core`);
  if (!String(person.status ?? "").includes("current independent PI")) errors.push(`${person.id}: current independent PI status absent`);
  if (!["Hong Kong", "Singapore"].includes(person.region)) errors.push(`${person.id}: invalid region`);
  if (new Set(person.sources.map((row) => row.url)).size < 2) errors.push(`${person.id}: fewer than two sources`);
  if (!person.facts || person.facts.length < 3 || person.facts.length > 5) errors.push(`${person.id}: facts must be 3-5`);
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url)) errors.push(`${person.id}: no sourced education/training fact`);
  for (const row of person.facts ?? []) if (!row.source?.url) errors.push(`${person.id}: unsourced fact ${row.label}`);
  const portraitPath = person.portrait?.src ? path.join(root, "public", person.portrait.src) : "";
  if (!portraitPath || !fs.existsSync(portraitPath) || fs.statSync(portraitPath).size < 1024) errors.push(`${person.id}: missing portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.id}: portrait is not 512x512`);
  }
  const networkCount = relationships.filter((row) => row.from === person.id || row.to === person.id).length
    + groupMembers.filter((row) => row.teacherId === person.id).length
    + placements.filter((row) => row.teacherId === person.id).length;
  if (networkCount < 1) errors.push(`${person.id}: no verifiable relationship, student, or placement`);
}

for (const row of relationships) {
  if ((!ids.has(row.from) && !externalIds.has(row.from)) || (!ids.has(row.to) && !externalIds.has(row.to))) errors.push(`${row.id}: missing endpoint`);
  if (!row.verified || !row.source?.url || !row.evidence || !row.evidenceObject) errors.push(`${row.id}: incomplete evidence`);
}
for (const row of groupMembers) if (!ids.has(row.teacherId) || !row.source?.url) errors.push(`${row.id}: invalid group-member evidence`);
for (const row of placements) if (!ids.has(row.teacherId) || !row.source?.url || !row.verifiedAt) errors.push(`${row.id}: invalid placement evidence`);
const promoted = new Set(promotions.map((row) => row.atlasPersonId));
for (const person of people) if (!promoted.has(person.id)) errors.push(`${person.id}: missing roster promotion`);

const report = {
  ok: errors.length === 0,
  module: modulePath,
  primaryPeople: people.length,
  supportingEndpointPeople: supportingPeople.length,
  relationships: relationships.length,
  groupMembers: groupMembers.length,
  placements: placements.length,
  rosterPromotions: promotions.length,
  portraits512x512: people.length - errors.filter((row) => row.includes("portrait")).length,
  masterLedgerMatches: selectedRows.length,
  strictGate: "current independent PI; >=2 reliable sources; 3-5 sourced facts including education; reliable 512x512 portrait; >=1 verified relationship/student/placement",
  errors,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
