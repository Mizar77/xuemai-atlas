import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root = process.cwd();
const modulePath = path.join(root, "app/candidate-priority-p0-europe-batch-10-2026.ts");
const bundlePath = "/private/tmp/candidate-p0-europe-batch-10-2026.mjs";
execFileSync(path.join(root, "node_modules/.bin/esbuild"), [modulePath, "--bundle", "--platform=node", "--format=esm", `--outfile=${bundlePath}`], { stdio: "ignore" });
const { people, relationships, placements, groupMembers, rosterPromotions } = await import(`file://${bundlePath}?t=${Date.now()}`);
const review = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-batch-10-review-2026-09-03.json"), "utf8"));
const errors = [];
const ids = new Set(people.map((row) => row.id));
if (people.length !== 6 || ids.size !== 6) errors.push(`expected 6 unique people, got ${people.length}/${ids.size}`);
if (rosterPromotions.length !== people.length) errors.push("promotion count mismatch");
for (const person of people) {
  if ((person.sources ?? []).length < 2) errors.push(`${person.name}: <2 sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) errors.push(`${person.name}: facts not 3-5`);
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url && row.source?.supports)) errors.push(`${person.name}: missing sourced education`);
  if ((person.facts ?? []).some((row) => !row.source?.url || !row.source?.supports)) errors.push(`${person.name}: unsourced fact`);
  const portrait = path.join(root, "public", person.portrait?.src ?? "");
  if (!fs.existsSync(portrait)) errors.push(`${person.name}: missing portrait`);
  else {
    const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portrait], { encoding: "utf8" });
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push(`${person.name}: portrait not 512 square`);
  }
  const networkCount = relationships.filter((row) => row.from === person.id || row.to === person.id).length + placements.filter((row) => row.teacherId === person.id).length + groupMembers.filter((row) => row.teacherId === person.id).length;
  if (!networkCount) errors.push(`${person.name}: no network evidence`);
  if (!review.records.some((row) => row.name === person.name && row.batch10Disposition === "ready_batch_10")) errors.push(`${person.name}: review not ready`);
}
for (const row of [...placements, ...groupMembers]) {
  if (!ids.has(row.teacherId) || !row.source?.url || !row.source?.supports) errors.push(`${row.id}: invalid network row`);
}
if (review.byDisposition.ready_batch_10 !== 6) errors.push("review ready count mismatch");
for (const row of review.records.filter((row) => row.batch10Disposition.startsWith("blocked_"))) {
  if (!row.blocker || !(row.attemptedUrls?.length > 0)) errors.push(`${row.name}: blocker lacks attempted URLs`);
}
if (errors.length) { console.error(JSON.stringify({ ok: false, errors }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ ok: true, people: people.length, relationships: relationships.length, placements: placements.length, groupMembers: groupMembers.length, rosterPromotions: rosterPromotions.length, review: review.byDisposition }, null, 2));
