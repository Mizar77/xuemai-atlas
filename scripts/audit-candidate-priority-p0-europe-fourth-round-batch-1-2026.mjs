import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const bundle = "/private/tmp/candidate-p0-europe-fourth-round-batch-1-2026.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, "app/candidate-priority-p0-europe-fourth-round-batch-1-2026.ts"), "--bundle", "--platform=node", "--format=esm", `--outfile=${bundle}`], { stdio: "ignore" });
const { people, supportingPeople, relationships, placements, groupMembers, rosterPromotions } = await import(`file://${bundle}?t=${Date.now()}`);
const ids = new Set([...people, ...supportingPeople].map((person) => person.id));
const errors = [];

if (people.length !== 17 || rosterPromotions.length !== 17) errors.push("people/roster promotion count mismatch");
if (groupMembers.length !== 17) errors.push("group member count mismatch");
if (placements.length !== 3) errors.push("placement count mismatch");
if (supportingPeople.length !== 1 || relationships.length !== 1) errors.push("supporting person/relationship edge count mismatch");

for (const person of people) {
  if (!person.primary || person.status !== "current independent PI · strict fourth-round verification") errors.push(`${person.name}: not marked as current independent PI`);
  if ((person.sources ?? []).length < 2) errors.push(`${person.name}: fewer than two sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5 || !person.facts.some((item) => item.label === "教育与学术训练")) errors.push(`${person.name}: profile fact gate`);
  if (person.facts.some((item) => !item.source?.url || !item.source?.supports)) errors.push(`${person.name}: unsourced fact`);
  const portrait = path.join(root, "public", person.portrait?.src ?? "");
  if (!fs.existsSync(portrait)) errors.push(`${person.name}: missing portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portrait], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait is not 512x512`);
  }
  if (!groupMembers.some((member) => member.teacherId === person.id && member.source?.url && member.source?.supports)) errors.push(`${person.name}: missing first-party named relationship`);
}

for (const member of groupMembers) if (!ids.has(member.teacherId) || !member.name || !member.source?.url || !member.source?.supports) errors.push(`${member.id}: invalid group member`);
for (const relationship of relationships) if (!ids.has(relationship.from) || !ids.has(relationship.to) || !relationship.verified || !relationship.source?.url) errors.push(`${relationship.id}: invalid relationship`);
for (const placement of placements) if (!ids.has(placement.teacherId) || !placement.verified || !placement.source?.url || !placement.evidence) errors.push(`${placement.id}: invalid placement`);
if (new Set(people.map((person) => person.id)).size !== people.length) errors.push("duplicate person id");
if (new Set(rosterPromotions.map((row) => `${row.unitUrl}|${row.rosterName}`)).size !== rosterPromotions.length) errors.push("duplicate roster promotion");

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, primaryPeople: people.length, supportingPeople: supportingPeople.length, relationships: relationships.length, groupMembers: groupMembers.length, placements: placements.length, rosterPromotions: rosterPromotions.length }, null, 2));
