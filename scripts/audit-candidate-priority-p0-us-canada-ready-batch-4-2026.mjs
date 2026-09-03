import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = path.join(root, "app/candidate-priority-p0-us-canada-ready-batch-4-2026.ts");
const bundlePath = "/private/tmp/candidate-p0-usca-b4.mjs";

execFileSync(path.join(root, "node_modules/.bin/esbuild"), [modulePath, "--bundle", "--platform=node", "--format=esm", `--outfile=${bundlePath}`], { stdio: "inherit" });
const mod = await import(`file://${bundlePath}?t=${Date.now()}`);
const primary = mod.candidatePriorityP0UsCanadaReadyBatch4People2026;
const relations = mod.relationships;
const placements = mod.placements;
const members = mod.groupMembers;
const promotions = mod.rosterPromotions;

const errors = [];
if (primary.length !== 6) errors.push(`expected 6 primary people, got ${primary.length}`);
if (promotions.length !== primary.length) errors.push(`promotion count ${promotions.length} != primary count ${primary.length}`);

const ids = new Set();
for (const p of mod.people) {
  if (ids.has(p.id)) errors.push(`duplicate person id ${p.id}`);
  ids.add(p.id);
}

for (const p of primary) {
  if ((p.sources ?? []).length < 2) errors.push(`${p.name}: fewer than two sources`);
  if ((p.facts ?? []).length < 3 || p.facts.length > 5) errors.push(`${p.name}: facts must be 3-5`);
  if (!p.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url)) errors.push(`${p.name}: missing sourced 教育与学术训练`);
  if (p.facts?.some((row) => !row.source?.url)) errors.push(`${p.name}: unsourced fact`);
  if (!p.portrait?.src) errors.push(`${p.name}: missing portrait`);
  const portraitPath = path.join(root, "public", p.portrait?.src ?? "");
  if (!fs.existsSync(portraitPath)) errors.push(`${p.name}: portrait file missing`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${p.name}: portrait is not 512x512`);
  }
  const networkCount = relations.filter((row) => row.from === p.id || row.to === p.id).length
    + placements.filter((row) => row.teacherId === p.id).length
    + members.filter((row) => row.teacherId === p.id).length;
  if (networkCount === 0) errors.push(`${p.name}: missing network evidence`);
}

const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-us-canada-disposition-ledger-2026-09-03.json"), "utf8"));
const queue = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-queue-2026-09-03.json"), "utf8"));
const expectedRemaining = queue.candidates.filter((row) => row.tier === "P0" && (row.region === "United States" || row.region === "Canada")).length;
const countSum = Object.values(ledger.counts).reduce((sum, n) => sum + n, 0);
if (ledger.reviewedCount !== ledger.frozenCount || countSum !== ledger.frozenCount) errors.push("disposition ledger count mismatch");
if (expectedRemaining !== ledger.frozenCount - (ledger.counts.ready ?? 0)) errors.push(`current queue ${expectedRemaining} != frozen ${ledger.frozenCount} - ready ${ledger.counts.ready ?? 0}`);

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
  promotions: promotions.length,
  ledgerCounts: ledger.counts,
}, null, 2));
