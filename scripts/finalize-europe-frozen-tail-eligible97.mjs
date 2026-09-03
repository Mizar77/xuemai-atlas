import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceFile = "data/roster-decisions/europe-frozen-tail-240-decisions-2026-09-03.json";
const outputFile = "data/roster-decisions/europe-frozen-tail-eligible97-final-2026-09-03.json";

function slug(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

const source = JSON.parse(fs.readFileSync(path.join(root, sourceFile), "utf8"));
const eligible = source.decisions.filter((row) => row.decision === "eligible_future_batch");
if (eligible.length !== 97) throw new Error(`Expected 97 eligible rows, found ${eligible.length}`);

const suffix = {
  "tum-cit": "tum-tail2",
  "aalto-cs": "aalto-tail2",
  "surrey-pai": "surrey-tail2",
  "edinburgh-informatics": "edinburgh-tail2",
};

const decisions = eligible.map((row) => ({
  ...row,
  priorDecision: row.decision,
  decision: "include_new_pi",
  reason: `${row.reason.replace(/\s*已完成名录范围判断，进入后续资料与关系补全队列。\s*$/, "")} 本轮完成独立 PI 建档并进入独立扩展模块。`,
  atlasPersonId: `${slug(row.rosterName)}-${suffix[row.unitId]}`,
}));

const keys = decisions.map((row) => `${row.unitUrl}\u0000${slug(row.rosterName)}`);
if (new Set(keys).size !== decisions.length) throw new Error("Duplicate unitUrl + rosterName");
if (decisions.some((row) => row.priorDecision !== "eligible_future_batch")) throw new Error("Non-eligible source row found");
if (decisions.some((row) => row.decision !== "include_new_pi" || !row.atlasPersonId)) throw new Error("Unresolved final decision");

const unitCounts = Object.fromEntries(Object.keys(suffix).map((unitId) => [unitId, decisions.filter((row) => row.unitId === unitId).length]));
const output = {
  schemaVersion: 1,
  batchId: "europe-frozen-tail-eligible97-final",
  snapshotAt: "2026-09-03",
  scope: "Final explicit decisions for all 97 previously eligible European frozen-tail records",
  sourceDecisionArtifact: sourceFile,
  previousEligibleCount: eligible.length,
  finalDecisionCount: decisions.length,
  pendingCount: 0,
  counts: { include_new_pi: decisions.length },
  unitCounts,
  decisions,
};

fs.writeFileSync(path.join(root, outputFile), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, finalDecisionCount: decisions.length, pendingCount: 0, unitCounts }, null, 2));
