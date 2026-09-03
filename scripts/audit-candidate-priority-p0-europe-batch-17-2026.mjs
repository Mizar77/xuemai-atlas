import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const bundle = "/private/tmp/candidate-p0-europe-batch-17-2026.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, "app/candidate-priority-p0-europe-batch-17-2026.ts"), "--bundle", "--platform=node", "--format=esm", `--outfile=${bundle}`], { stdio: "ignore" });
const { people, relationships, placements, groupMembers, rosterPromotions } = await import(`file://${bundle}?t=${Date.now()}`);
const errors = [];
const primary = people.filter((row) => row.primary);
const ids = new Set(people.map((row) => row.id));
if (primary.length !== 5 || rosterPromotions.length !== 5) errors.push("expected 5 primary people/promotions");
if (ids.size !== people.length) errors.push("duplicate person id");
for (const person of primary) {
  if ((person.sources ?? []).length < 2 || (person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: source/fact gate failed`);
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url && row.source?.supports)) errors.push(`${person.name}: education gate failed`);
  for (const row of person.facts ?? []) if (!row.source?.url || !row.source?.supports) errors.push(`${person.name}: unsourced fact ${row.label}`);
  const portrait = path.join(root, "public", person.portrait?.src ?? "");
  if (!fs.existsSync(portrait)) errors.push(`${person.name}: portrait missing`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portrait], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait not 512 square`);
  }
  const network = relationships.filter((row) => row.from === person.id || row.to === person.id).length + placements.filter((row) => row.teacherId === person.id).length + groupMembers.filter((row) => row.teacherId === person.id).length;
  if (!network) errors.push(`${person.name}: network gate failed`);
}
for (const row of relationships) {
  if (!ids.has(row.from) || !ids.has(row.to)) errors.push(`${row.id}: missing endpoint`);
  if (!row.verified || !row.source?.url || !row.source?.supports || !row.evidenceObject) errors.push(`${row.id}: relationship evidence gate failed`);
}
for (const row of groupMembers) if (!ids.has(row.teacherId) || !row.name || !row.source?.url || !row.source?.supports) errors.push(`${row.id}: invalid group member`);
if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, primaryPeople: primary.length, supportingPeople: people.length - primary.length, relationships: relationships.length, placements: placements.length, groupMembers: groupMembers.length, rosterPromotions: rosterPromotions.length }, null, 2));
