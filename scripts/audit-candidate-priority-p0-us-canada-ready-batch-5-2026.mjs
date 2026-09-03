import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = path.join(root, "app/candidate-priority-p0-us-canada-ready-batch-5-2026.ts");
const bundlePath = "/private/tmp/candidate-p0-usca-b5.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [modulePath, "--bundle", "--platform=node", "--format=esm", `--outfile=${bundlePath}`], { stdio: "inherit" });
const mod = await import(`file://${bundlePath}?t=${Date.now()}`);

const primary = mod.candidatePriorityP0UsCanadaReadyBatch5People2026;
const relations = mod.relationships;
const placements = mod.placements;
const members = mod.groupMembers;
const promotions = mod.rosterPromotions;
const existingPromotions = mod.existingRosterPromotions;
const errors = [];

if (primary.length !== 10) errors.push(`expected 10 primary people, got ${primary.length}`);
if (promotions.length !== primary.length) errors.push(`promotion count ${promotions.length} != primary count ${primary.length}`);
if (existingPromotions.length !== 11) errors.push(`expected 11 atlas-backed duplicate promotions, got ${existingPromotions.length}`);

const ids = new Set();
for (const p of mod.people) {
  if (ids.has(p.id)) errors.push(`duplicate person id ${p.id}`);
  ids.add(p.id);
}

for (const p of primary) {
  if ((p.sources ?? []).length < 2) errors.push(`${p.name}: fewer than two first-party sources`);
  if ((p.facts ?? []).length < 3 || p.facts.length > 5) errors.push(`${p.name}: facts must be 3-5`);
  if (!p.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url)) errors.push(`${p.name}: missing sourced 教育与学术训练`);
  if (p.facts?.some((row) => !row.source?.url)) errors.push(`${p.name}: unsourced fact`);
  if (!p.portrait?.src || !p.portrait.source?.url) errors.push(`${p.name}: missing portrait provenance`);
  const portraitPath = path.join(root, "public", p.portrait?.src ?? "");
  if (!fs.existsSync(portraitPath)) errors.push(`${p.name}: portrait file missing`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${p.name}: portrait is not 512x512`);
  }
  const networkCount = relations.filter((row) => row.from === p.id || row.to === p.id).length
    + placements.filter((row) => row.teacherId === p.id).length
    + members.filter((row) => row.teacherId === p.id).length;
  if (networkCount === 0) errors.push(`${p.name}: missing person/network evidence`);
}

const dataBundle = "/private/tmp/candidate-p0-usca-current-data.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, "app/data.ts"), "--bundle", "--platform=node", "--format=esm", `--outfile=${dataBundle}`], { stdio: "inherit" });
const currentData = await import(`file://${dataBundle}?t=${Date.now()}`);
const currentIds = new Set(currentData.people.map((p) => p.id));
for (const row of existingPromotions) {
  if (!currentIds.has(row.atlasPersonId)) errors.push(`${row.rosterName}: atlas-backed duplicate target missing (${row.atlasPersonId})`);
}

const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-us-canada-disposition-ledger-2026-09-03.json"), "utf8"));
const countSum = Object.values(ledger.counts).reduce((sum, n) => sum + n, 0);
if (ledger.reviewedCount !== ledger.frozenCount || countSum !== ledger.frozenCount) errors.push("disposition ledger count mismatch");

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  primaryPeople: primary.length,
  supportingPeople: mod.people.length - primary.length,
  relationships: relations.length,
  placements: placements.length,
  groupMembers: members.length,
  rosterPromotions: promotions.length,
  existingRosterPromotions: existingPromotions.length,
  ledgerFrozenCount: ledger.frozenCount,
  ledgerCounts: ledger.counts,
}, null, 2));
