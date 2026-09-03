import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root = process.cwd();
const bundle = "/private/tmp/candidate-p0-europe-batch-11-2026.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, "app/candidate-priority-p0-europe-batch-11-2026.ts"), "--bundle", "--platform=node", "--format=esm", `--outfile=${bundle}`], { stdio: "ignore" });
const { people, relationships, placements, groupMembers, rosterPromotions } = await import(`file://${bundle}?t=${Date.now()}`);
const errors = [];
const ids = new Set(people.map((row) => row.id));
if (people.length !== 3 || ids.size !== 3) errors.push("expected 3 unique people");
if (rosterPromotions.length !== 3) errors.push("promotion count mismatch");
for (const person of people) {
  if ((person.sources ?? []).length < 2) errors.push(`${person.name}: fewer than 2 sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: facts not 3-5`);
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url && row.source?.supports)) errors.push(`${person.name}: missing sourced education`);
  const portrait = path.join(root, "public", person.portrait?.src ?? "");
  if (!fs.existsSync(portrait)) errors.push(`${person.name}: portrait missing`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portrait], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait not 512x512`);
  }
  const network = relationships.filter((row) => row.from === person.id || row.to === person.id).length + placements.filter((row) => row.teacherId === person.id).length + groupMembers.filter((row) => row.teacherId === person.id).length;
  if (!network) errors.push(`${person.name}: missing network`);
}
for (const row of groupMembers) if (!ids.has(row.teacherId) || !row.source?.url || !row.source?.supports) errors.push(`${row.id}: invalid group row`);
if (errors.length) { console.error(JSON.stringify({ ok: false, errors }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ ok: true, people: people.length, relationships: relationships.length, placements: placements.length, groupMembers: groupMembers.length, rosterPromotions: rosterPromotions.length }, null, 2));
