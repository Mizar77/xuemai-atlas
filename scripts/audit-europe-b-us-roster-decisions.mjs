import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const units = [
  ["nyu-cds", "nyu-cds-all-faculty", 149],
  ["aalto-cs", "aalto-computer-science-faculty", 96],
  ["aalto-ml-ds-ai", "aalto-machine-learning-data-science-ai", 19],
  ["sapienza-diag", "sapienza-diag-docenti", 134],
  ["manchester-cs", "manchester-computer-science-academic-research-staff", 111],
  ["kit-informatics", "kit-informatics-research-group-leaders", 69],
  ["kit-cvhci", "kit-cvhci-all-people", 60],
  ["tudelft-eemcs", "tudelft-eemcs-professors", 83],
];
const allowed = new Set(["included_existing", "include_new_pi", "excluded_non_ai_cs", "excluded_non_pi", "excluded_historical", "excluded_industry_only", "excluded_duplicate", "pending_profile_verification"]);
const failures = [];
let total = 0;
const newPiKeys = [];

for (const [unitId, artifactBase, expected] of units) {
  const artifactPath = path.join(root, "data/official-rosters", `${artifactBase}-2026-09-02.json`);
  const decisionPath = path.join(root, "data/roster-decisions", `${unitId}-2026-09-02.json`);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const output = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
  if (artifact.people.length !== expected || artifact.officialRosterCount !== expected) failures.push(`${unitId}: roster count is not ${expected}`);
  if (output.decisionCount !== expected || output.decisions.length !== expected) failures.push(`${unitId}: decision count is not ${expected}`);
  const rosterIds = artifact.people.map((row) => row.officialId);
  const decisionIds = output.decisions.map((row) => row.officialId);
  if (new Set(rosterIds).size !== expected) failures.push(`${unitId}: official roster contains duplicate officialId`);
  if (JSON.stringify(rosterIds) !== JSON.stringify(decisionIds)) failures.push(`${unitId}: decision officialIds do not align one-for-one and in order with the frozen roster`);
  for (const row of output.decisions) {
    if (!allowed.has(row.decision)) failures.push(`${unitId}/${row.officialId}: invalid decision ${row.decision}`);
    if (!row.reason || !row.evidence) failures.push(`${unitId}/${row.officialId}: missing reason/evidence`);
    if (row.decision === "included_existing" && !row.atlasPersonId) failures.push(`${unitId}/${row.officialId}: included_existing missing atlasPersonId`);
    if (row.decision === "include_new_pi") newPiKeys.push(`${unitId}\u0000${row.officialId}`);
  }
  const recomputed = Object.fromEntries([...allowed].map((decision) => [decision, output.decisions.filter((row) => row.decision === decision).length]).filter(([, count]) => count));
  if (JSON.stringify(recomputed) !== JSON.stringify(output.counts)) failures.push(`${unitId}: stored decision counts do not match rows`);
  total += output.decisions.length;
}

const summary = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions/europe-b-us-summary-2026-09-02.json"), "utf8"));
if (total !== 721 || summary.officialRosterTotal !== 721 || summary.decisionTotal !== 721) failures.push(`batch total must be 721; got ${total}/${summary.officialRosterTotal}/${summary.decisionTotal}`);
if (summary.includeNewPiCount !== newPiKeys.length || summary.includeNewPi.length !== newPiKeys.length) failures.push("summary include_new_pi count mismatch");
const summaryNewPiKeys = summary.includeNewPi.map((row) => `${row.unitId}\u0000${row.officialId}`);
if (JSON.stringify(summaryNewPiKeys) !== JSON.stringify(newPiKeys)) failures.push("summary include_new_pi list does not align with unit decisions");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Europe-B/US roster decision audit passed: ${units.length} units, ${total} decisions, ${newPiKeys.length} new-PI candidates.`);
