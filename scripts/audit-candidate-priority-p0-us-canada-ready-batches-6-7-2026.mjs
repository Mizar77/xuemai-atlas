import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const batches = [
  { number: 6, expected: 9, exportName: "candidatePriorityP0UsCanadaReadyBatch6People2026" },
  { number: 7, expected: 9, exportName: "candidatePriorityP0UsCanadaReadyBatch7People2026" },
  { number: 8, expected: 4, exportName: "candidatePriorityP0UsCanadaReadyBatch8People2026" },
  { number: 9, expected: 3, exportName: "candidatePriorityP0UsCanadaReadyBatch9People2026" },
  { number: 10, expected: 3, exportName: "candidatePriorityP0UsCanadaReadyBatch10People2026" },
];
const errors = [];

for (const batch of batches) {
  const relative = `app/candidate-priority-p0-us-canada-ready-batch-${batch.number}-2026.ts`;
  const bundlePath = `/private/tmp/candidate-p0-usca-batch-${batch.number}-audit.mjs`;
  execFileSync(path.join(root, "node_modules/.bin/esbuild"), [path.join(root, relative), "--bundle", "--platform=node", "--format=esm", `--outfile=${bundlePath}`], { stdio: "ignore" });
  const mod = await import(`file://${bundlePath}?t=${Date.now()}`);
  const people = mod[batch.exportName] ?? [];
  const relationships = mod.relationships ?? [];
  const placements = mod.placements ?? [];
  const groupMembers = mod.groupMembers ?? [];
  const promotions = mod.rosterPromotions ?? [];
  if (people.length !== batch.expected) errors.push(`${relative}: expected ${batch.expected} people, got ${people.length}`);
  if (promotions.length !== people.length) errors.push(`${relative}: promotion count ${promotions.length}/${people.length}`);
  for (const person of people) {
    if ((person.sources ?? []).length < 2) errors.push(`${relative}: ${person.name} has fewer than two sources`);
    if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${relative}: ${person.name} facts must be 3-5`);
    if (!person.facts?.some((fact) => fact.label === "教育与学术训练" && fact.source?.url)) errors.push(`${relative}: ${person.name} lacks sourced education`);
    const portraitPath = path.join(root, "public", person.portrait?.src ?? "");
    if (!person.portrait?.src || !fs.existsSync(portraitPath)) errors.push(`${relative}: ${person.name} missing portrait`);
    else {
      const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
      if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${relative}: ${person.name} portrait is not 512x512`);
    }
    const networkCount = relationships.filter((row) => row.from === person.id || row.to === person.id).length
      + placements.filter((row) => row.teacherId === person.id).length
      + groupMembers.filter((row) => row.teacherId === person.id).length;
    if (!networkCount) errors.push(`${relative}: ${person.name} lacks network evidence`);
  }
  console.log(`${relative}: ${people.length} primary people, ${relationships.length} relationships, ${placements.length} placements, ${groupMembers.length} group members`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("US/Canada P0 batches 6–10 audit PASS");
