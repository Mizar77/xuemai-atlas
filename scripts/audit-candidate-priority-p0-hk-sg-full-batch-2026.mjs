import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = "app/candidate-priority-p0-hk-sg-full-batch-2026.ts";
const output = "/private/tmp/p0-hk-sg-full-batch.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, modulePath), "--bundle", "--platform=node", "--format=esm", `--outfile=${output}`], { stdio: "ignore" });
const batch = await import(`file://${output}?t=${Date.now()}`);
const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-hk-sg-full-batch-2026-09-03.json"), "utf8"));
const people = batch.people ?? [];
const enhancements = batch.personEnhancements ?? {};
const groupMembers = batch.groupMembers ?? [];
const relationships = batch.relationships ?? [];
const promotions = batch.rosterPromotions ?? [];
const errors = [];

if (ledger.totalPendingReviewed !== 250) errors.push(`expected 250 reviewed pending rows, found ${ledger.totalPendingReviewed}`);
if (ledger.selectedCount + ledger.heldCount !== ledger.totalPendingReviewed) errors.push("selected + held does not equal reviewed total");
if (people.length !== 33) errors.push(`expected 33 new strict-ready people, found ${people.length}`);
if (!enhancements["sinno-pan"]) errors.push("missing Sinno Jialin Pan upgrade");
if (promotions.length !== 34) errors.push(`expected 34 promotions including Sinno Pan, found ${promotions.length}`);

const ids = new Set(people.map((person) => person.id));
for (const person of people) {
  if (!person.primary || person.category !== "core" || !String(person.status).includes("current independent PI")) errors.push(`${person.id}: current independent PI gate failed`);
  if (!person.facts || person.facts.length < 3 || person.facts.length > 5) errors.push(`${person.id}: facts must be 3-5`);
  if (!person.facts?.some((fact) => fact.label === "教育与学术训练" && fact.source?.url)) errors.push(`${person.id}: missing sourced education fact`);
  if (new Set(person.sources.map((source) => source.url)).size < 2) errors.push(`${person.id}: fewer than two source URLs`);
  if ((person.facts ?? []).some((fact) => !fact.source?.url)) errors.push(`${person.id}: unsourced fact`);
  const portrait = path.join(root, "public", person.portrait?.src ?? "");
  if (!person.portrait?.src || !fs.existsSync(portrait) || fs.statSync(portrait).size < 1024) errors.push(`${person.id}: missing/undersized portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portrait], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.id}: portrait is not 512x512`);
  }
  const networkCount = groupMembers.filter((row) => row.teacherId === person.id).length + relationships.filter((row) => row.from === person.id || row.to === person.id).length;
  if (networkCount < 1) errors.push(`${person.id}: no verified network evidence`);
}

const sinno = enhancements["sinno-pan"];
if (!sinno.primary || !String(sinno.status).includes("current independent PI") || (sinno.sources ?? []).length < 2 || (sinno.facts ?? []).length < 3) errors.push("sinno-pan: strict enhancement gate failed");
const sinnoPortrait = path.join(root, "public", sinno.portrait?.src ?? "");
if (!sinno.portrait?.src || !fs.existsSync(sinnoPortrait) || fs.statSync(sinnoPortrait).size < 1024) errors.push("sinno-pan: portrait missing");
if (!groupMembers.some((row) => row.teacherId === "sinno-pan")) errors.push("sinno-pan: current/alumni student evidence missing");

for (const member of groupMembers) {
  if (!ids.has(member.teacherId) && member.teacherId !== "sinno-pan") errors.push(`${member.id}: missing teacher endpoint`);
  if (!member.name || !member.source?.url) errors.push(`${member.id}: incomplete student evidence`);
}
for (const relationship of relationships) {
  if (!relationship.verified || !relationship.source?.url || !relationship.evidence || !relationship.evidenceObject) errors.push(`${relationship.id}: incomplete relationship evidence`);
}
const promotionIds = new Set(promotions.map((row) => row.atlasPersonId));
for (const person of people) if (!promotionIds.has(person.id)) errors.push(`${person.id}: missing roster promotion`);
if (!promotionIds.has("sinno-pan")) errors.push("sinno-pan: missing roster promotion");

const report = {
  ok: errors.length === 0,
  module: modulePath,
  pendingRowsReviewed: ledger.totalPendingReviewed,
  evidenceSelectedRows: ledger.selectedCount,
  newStrictReadyPeople: people.length,
  upgradedExistingPeople: Object.keys(enhancements).length,
  heldWithExplicitGap: ledger.heldCount,
  groupMembers: groupMembers.length,
  relationships: relationships.length,
  promotions: promotions.length,
  strictGate: "current independent PI; >=2 reliable sources; 3-5 sourced facts including education; reliable 512x512 portrait; >=1 verified adviser/student relationship",
  errors,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
