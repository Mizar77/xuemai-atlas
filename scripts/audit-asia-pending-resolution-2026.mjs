import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const decisions = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions/asia-pending-resolution-2026-09-03.json"), "utf8"));
const relationships = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions/thu-15-relationship-evidence-audit-2026-09-03.json"), "utf8"));

const errors = [];
if (decisions.decisionCount !== 52 || decisions.decisions.length !== 52) errors.push("decision batch must contain exactly 52 superseding records");
const countSum = Object.values(decisions.counts).reduce((sum, count) => sum + count, 0);
if (countSum !== 52) errors.push(`decision counts sum to ${countSum}, expected 52`);

const keys = new Set();
for (const entry of decisions.decisions) {
  const key = `${entry.supersedesDecisionFile}::${entry.officialId}`;
  if (keys.has(key)) errors.push(`duplicate superseding key ${key}`);
  keys.add(key);
  if (!entry.reason || !entry.reviewedAt) errors.push(`missing reason/review date for ${entry.name}`);
  if (entry.decision === "include_new_pi") {
    if (!entry.atlasPersonId) errors.push(`missing atlasPersonId for ${entry.name}`);
    const portrait = path.join(root, "public/portraits/asia-pending-resolution-2026", `${entry.atlasPersonId}.jpg`);
    if (!fs.existsSync(portrait) || fs.statSync(portrait).size < 2_000) errors.push(`missing/undersized portrait ${portrait}`);
  }
}

if (relationships.audits.length !== 15) errors.push(`THU relationship audit contains ${relationships.audits.length}, expected 15`);
const readyEdges = relationships.audits.flatMap((entry) => entry.relationships ?? []).filter((entry) => entry.edgeReady);
if (readyEdges.length !== relationships.counts.edgesReady) errors.push("THU ready-edge count does not match audit records");

const appText = fs.readdirSync(path.join(root, "app"))
  .filter((name) => name.endsWith(".ts") && name !== "asia-pending-resolution-pi-expansion-2026.ts")
  .map((name) => fs.readFileSync(path.join(root, "app", name), "utf8"))
  .join("\n");
for (const entry of decisions.decisions.filter((item) => item.decision === "include_new_pi")) {
  if (appText.includes(`id: "${entry.atlasPersonId}"`)) errors.push(`atlas id already exists outside batch: ${entry.atlasPersonId}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({
  decisionCount: decisions.decisionCount,
  counts: decisions.counts,
  readyPeople: decisions.counts.include_new_pi,
  portraits: decisions.counts.include_new_pi,
  thuPeopleChecked: relationships.counts.peopleChecked,
  thuEdgesReady: relationships.counts.edgesReady,
  unresolved: decisions.counts.pending_profile_verification,
}, null, 2));
