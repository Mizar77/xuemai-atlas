import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const esbuild = path.join(root, "node_modules/.bin/esbuild");
const bundle = (input, output) => execFileSync(esbuild, [path.join(root, input), "--bundle", "--platform=node", "--format=esm", `--outfile=${output}`], { stdio: "ignore" });
bundle("app/candidate-priority-p0-asia-batch-12-2026.ts", "/private/tmp/p0-asia-b12.mjs");
bundle("app/candidate-priority-p0-asia-batch-10-2026.ts", "/private/tmp/p0-asia-b10-for-b12.mjs");
bundle("app/data.ts", "/private/tmp/p0-asia-b12-data.mjs");
const batch = await import(`file:///private/tmp/p0-asia-b12.mjs?t=${Date.now()}`);
const dependency = await import(`file:///private/tmp/p0-asia-b10-for-b12.mjs?t=${Date.now()}`);
const atlas = await import(`file:///private/tmp/p0-asia-b12-data.mjs?t=${Date.now()}`);
const errors = [];
const dependencyPeople = dependency.people ?? dependency.candidatePriorityP0AsiaBatch10People2026;
const ids = new Set([...atlas.people.map((row) => row.id), ...dependencyPeople.map((row) => row.id), ...batch.people.map((row) => row.id)]);
const person = batch.people[0];
if (batch.people.length !== 1 || batch.rosterPromotions.length !== 1) errors.push("expected one person and one promotion");
if (new Set(person.sources.map((row) => row.url)).size < 2) errors.push("fewer than two sources");
if (person.facts.length < 3 || person.facts.length > 5) errors.push("facts must be 3-5");
if (!person.facts.some((row) => row.label === "教育与学术训练" && row.source?.url)) errors.push("missing exact education fact");
const portraitPath = path.join(root, "public", person.portrait.src);
if (!fs.existsSync(portraitPath) || fs.statSync(portraitPath).size < 1024) errors.push("portrait missing or too small");
else {
  const dimensions = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath], { encoding: "utf8" });
  if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) errors.push("portrait is not 512x512");
}
for (const row of batch.relationships) {
  if (!ids.has(row.from) || !ids.has(row.to)) errors.push(`${row.id}: missing endpoint`);
  if (row.type !== "collaboration" || row.subtype !== "publication" || !row.evidenceObject || !row.source?.url) errors.push(`${row.id}: incomplete exact-publication evidence`);
}
const result = { ok: errors.length === 0, people: batch.people.length, relationships: batch.relationships.length, rosterPromotions: batch.rosterPromotions.length, portraitDimensions: "512x512", dependency: "Asia Batch 10", errors };
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
