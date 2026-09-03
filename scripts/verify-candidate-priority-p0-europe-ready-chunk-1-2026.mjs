import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = path.join(root, "app/candidate-priority-p0-europe-remaining-ready-chunk-1-2026.ts");
const bundlePath = "/private/tmp/candidate-p0-europe-ready-1.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [modulePath, "--bundle", "--platform=node", "--format=esm", `--outfile=${bundlePath}`], { stdio: "ignore" });
const mod = await import(`file://${bundlePath}?t=${Date.now()}`);

const people = mod.people;
const relationships = mod.relationships;
const placements = mod.placements;
const members = mod.groupMembers;
const promotions = mod.rosterPromotions;
const errors = [];
if (people.length !== 7) errors.push(`expected 7 people, got ${people.length}`);
if (promotions.length !== people.length) errors.push(`promotion count ${promotions.length} != people ${people.length}`);
const ids = new Set(people.map((person) => person.id));
if (ids.size !== people.length) errors.push("duplicate person id");
for (const person of people) {
  if ((person.sources ?? []).length < 2) errors.push(`${person.name}: fewer than two sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: facts must be 3-5`);
  if (!person.facts?.some((fact) => fact.label === "教育与学术训练" && fact.source?.url)) errors.push(`${person.name}: missing sourced education fact`);
  const portraitPath = path.join(root, "public", person.portrait?.src ?? "");
  if (!person.portrait?.src || !fs.existsSync(portraitPath)) errors.push(`${person.name}: missing portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait is not 512x512`);
  }
  const networkCount = relationships.filter((row) => row.from === person.id || row.to === person.id).length
    + placements.filter((row) => row.teacherId === person.id).length
    + members.filter((row) => row.teacherId === person.id).length;
  if (!networkCount) errors.push(`${person.name}: missing network evidence`);
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, people: people.length, relationships: relationships.length, placements: placements.length, groupMembers: members.length, promotions: promotions.length }, null, 2));
