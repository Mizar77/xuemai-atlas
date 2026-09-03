import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const bundle = "/private/tmp/candidate-p0-europe-third-round-batch-1-2026.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, "app/candidate-priority-p0-europe-third-round-batch-1-2026.ts"), "--bundle", "--platform=node", "--format=esm", `--outfile=${bundle}`], { stdio: "ignore" });
const { people, relationships, groupMembers, rosterPromotions } = await import(`file://${bundle}?t=${Date.now()}`);
const primary = people.filter((person) => person.primary);
const ids = new Set(people.map((person) => person.id));
const errors = [];
if (primary.length !== 8 || rosterPromotions.length !== 8) errors.push("primary/roster promotion count mismatch");
if (relationships.length !== 9) errors.push("relationship count mismatch");
for (const person of primary) {
  if ((person.sources ?? []).length < 2) errors.push(`${person.name}: fewer than two sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5 || !person.facts.some((item) => item.label === "教育与学术训练")) errors.push(`${person.name}: profile fact gate`);
  if (person.facts.some((item) => !item.source?.url || !item.source?.supports)) errors.push(`${person.name}: unsourced fact`);
  const portrait = path.join(root, "public", person.portrait?.src ?? "");
  if (!fs.existsSync(portrait)) errors.push(`${person.name}: missing portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portrait], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait is not 512x512`);
  }
  if (!relationships.some((edge) => edge.to === person.id && edge.verified && edge.source?.url && edge.source?.supports) && !groupMembers.some((member) => member.teacherId === person.id && member.source?.url && member.source?.supports)) errors.push(`${person.name}: missing first-party named relationship`);
}
const existingEndpoints = new Set(["tsachy-weissman-stanford-p0-b9"]);
for (const edge of relationships) if ((!ids.has(edge.from) && !existingEndpoints.has(edge.from)) || (!ids.has(edge.to) && !existingEndpoints.has(edge.to))) errors.push(`${edge.id}: missing endpoint`);
for (const member of groupMembers) if (!ids.has(member.teacherId) || !member.source?.url) errors.push(`${member.id}: invalid group member`);
if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, primaryPeople: primary.length, supportingPeople: people.length - primary.length, relationships: relationships.length, groupMembers: groupMembers.length, rosterPromotions: rosterPromotions.length }, null, 2));
