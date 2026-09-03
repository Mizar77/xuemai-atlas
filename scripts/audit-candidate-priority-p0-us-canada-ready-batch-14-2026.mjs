import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const input = path.join(root, "app/candidate-priority-p0-us-canada-ready-batch-14-2026.ts");
const output = "/private/tmp/candidate-p0-usca-batch-14-audit.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [input, "--bundle", "--platform=node", "--format=esm", `--outfile=${output}`], { stdio: "ignore" });
const mod = await import(`file://${output}?t=${Date.now()}`);
const primary = mod.candidatePriorityP0UsCanadaReadyBatch14People2026;
const errors = [];
if (primary.length !== 14) errors.push(`primary people ${primary.length}/14`);
if (mod.rosterPromotions.length !== primary.length) errors.push(`promotions ${mod.rosterPromotions.length}/${primary.length}`);
for (const person of primary) {
  if ((person.sources ?? []).length < 2) errors.push(`${person.name}: fewer than two sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: facts must be 3-5`);
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url)) errors.push(`${person.name}: missing sourced education`);
  const portrait = path.join(root, "public", person.portrait?.src ?? "");
  if (!person.portrait?.src || !fs.existsSync(portrait)) errors.push(`${person.name}: missing portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portrait], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait is not 512x512`);
  }
  const networkCount = mod.relationships.filter((row) => row.from === person.id || row.to === person.id).length
    + mod.placements.filter((row) => row.teacherId === person.id).length
    + mod.groupMembers.filter((row) => row.teacherId === person.id).length;
  if (!networkCount) errors.push(`${person.name}: missing network evidence`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`US/Canada P0 batch 14 audit PASS: ${primary.length} primary, ${mod.relationships.length} relationships, ${mod.placements.length} placements, ${mod.groupMembers.length} group members, ${mod.rosterPromotions.length} promotions`);
