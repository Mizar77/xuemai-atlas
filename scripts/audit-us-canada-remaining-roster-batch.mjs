import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { build } from "esbuild";

const root = process.cwd();
const decisionDir = path.join(root, "data/roster-decisions/us-canada-remaining-2026-09-03");
const summary = JSON.parse(fs.readFileSync(path.join(decisionDir, "summary.json"), "utf8"));
const failures = [];
const rows = [];

for (const file of summary.unitFiles) {
  const artifact = JSON.parse(fs.readFileSync(path.join(decisionDir, file), "utf8"));
  if (artifact.deduplicatedRosterPersonCount !== artifact.decisions.length) failures.push(`${file}: deduplicated count mismatch`);
  if (artifact.rawRosterRowCount - artifact.duplicateRosterCardCount !== artifact.decisions.length) failures.push(`${file}: raw/duplicate arithmetic mismatch`);
  const keys = new Set();
  for (const row of artifact.decisions) {
    const key = `${row.rosterName}\u0000${row.unitUrl}`;
    if (keys.has(key)) failures.push(`${file}: duplicate rosterName+unitUrl ${row.rosterName}`);
    keys.add(key);
    if (String(row.decision).startsWith("pending")) failures.push(`${file}: unresolved ${row.rosterName}`);
    rows.push(row);
  }
}

const resolutions = JSON.parse(fs.readFileSync(path.join(decisionDir, "pending-resolutions.json"), "utf8"));
if (resolutions.priorPendingCount !== 194 || resolutions.decisions.length !== 194) failures.push("pending-resolution count must be 194");
if (resolutions.decisions.some((row) => !String(row.priorDecision).startsWith("pending") || String(row.decision).startsWith("pending"))) failures.push("pending resolution provenance/finality failure");
if (rows.length !== summary.newlyReviewedFrozenRows) failures.push("new frozen-row total mismatch");
if (summary.unresolvedPendingRows !== 0) failures.push("summary reports unresolved pending rows");

const outfile = "/private/tmp/us-canada-remaining-priority-audit.mjs";
await build({ entryPoints: [path.join(root, "app/us-canada-remaining-priority-expansion-2026.ts")], outfile, bundle: true, platform: "node", format: "esm", logLevel: "silent" });
const batch = await import(`file://${outfile}?t=${Date.now()}`);
if (batch.people.length !== 12) failures.push(`priority people ${batch.people.length} != 12`);
if (batch.relationships.length !== 3) failures.push(`priority relationships ${batch.relationships.length} != 3`);
if (batch.groupMembers.length !== 3) failures.push(`priority group members ${batch.groupMembers.length} != 3`);
if (batch.placements.length !== 9) failures.push(`priority placements ${batch.placements.length} != 9`);

const ids = new Set(batch.people.map((person) => person.id));
for (const person of batch.people) {
  if (person.category !== "core" || person.primary !== true || person.stage === "historical") failures.push(`${person.id}: not current core PI`);
  if (!person.summary || person.summary.length < 50) failures.push(`${person.id}: short summary`);
  if (!person.facts || person.facts.length < 4) failures.push(`${person.id}: fewer than four facts`);
  if (!person.facts?.some((item) => item.label === "当前任职")) failures.push(`${person.id}: missing exact 当前任职 fact`);
  if (!person.facts?.some((item) => item.label === "研究主线")) failures.push(`${person.id}: missing exact 研究主线 fact`);
  const educationFact = person.facts?.find((item) => item.label === "教育与学术训练");
  if (!educationFact) failures.push(`${person.id}: missing exact 教育与学术训练 fact`);
  else {
    if (!educationFact.value || educationFact.value.length < 20 || /未公开|待核验|暂无/.test(educationFact.value)) failures.push(`${person.id}: weak or placeholder education fact`);
    if (!educationFact.source?.url || !["official", "profile", "cv", "thesis"].includes(educationFact.source.kind)) failures.push(`${person.id}: education fact lacks first-party source`);
  }
  if (!person.sources || person.sources.length < 1) failures.push(`${person.id}: no source`);
  if (!person.portrait?.src) failures.push(`${person.id}: no portrait metadata`);
  else {
    const imagePath = path.join(root, "public", person.portrait.src);
    if (!fs.existsSync(imagePath)) failures.push(`${person.id}: portrait missing`);
    else {
      const meta = await sharp(imagePath).metadata();
      if (meta.width !== 512 || meta.height !== 512 || meta.format !== "jpeg") failures.push(`${person.id}: portrait not 512x512 JPEG`);
    }
  }
}

const knownExternal = new Set(["dan-roth-top"]);
for (const edge of batch.relationships) {
  if (!ids.has(edge.from) && !knownExternal.has(edge.from)) failures.push(`${edge.id}: unknown from`);
  if (!ids.has(edge.to) && !knownExternal.has(edge.to)) failures.push(`${edge.id}: unknown to`);
  if (!edge.verified || !["official", "profile", "cv", "thesis"].includes(edge.source.kind)) failures.push(`${edge.id}: weak relationship evidence`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({ units: summary.newlyReviewedUnits, frozenRows: rows.length, resolvedPriorPending: resolutions.decisions.length, unresolvedPending: 0, priorityPeople: batch.people.length, portraits512: batch.people.length, relationships: batch.relationships.length, groupMembers: batch.groupMembers.length, placements: batch.placements.length, qa: "pass" }, null, 2));
