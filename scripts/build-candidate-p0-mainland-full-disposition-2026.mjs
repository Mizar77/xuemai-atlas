import { readFileSync, writeFileSync } from "node:fs";
import { candidatePriorityP0MainlandFullBatch1DispositionOverrides2026 as overrides } from "../app/candidate-priority-p0-mainland-full-batch-1-2026.ts";

const sourcePath = "data/candidate-priority-p0-mainland-full-source-audit-2026-09-03.json";
const outputPath = "data/candidate-priority-p0-mainland-full-disposition-2026-09-03.json";
const source = JSON.parse(readFileSync(sourcePath, "utf8"));
const overrideByKey = new Map(overrides.map((row) => [row.canonicalKey, row]));
const records = source.records.map((row) => {
  const override = overrideByKey.get(row.canonicalKey);
  if (!override) return { ...row, disposition: row.finalDisposition, atlasPersonId: null };
  return {
    ...row,
    disposition: override.disposition,
    atlasPersonId: override.atlasPersonId,
    verificationState: override.disposition === "ready" ? "strict_gate_passed" : "duplicate_verified",
    reason: override.disposition === "ready"
      ? "人工核对官方现职、双来源、3–5 条带来源事实、教育训练、身份匹配头像和可建边关系后接入图谱。"
      : "同一北京大学教师在冻结名录中因历史 officialId 形成重复记录，合并到唯一图谱人物。",
  };
});
const missingOverrides = [...overrideByKey.keys()].filter((key) => !records.some((row) => row.canonicalKey === key));
if (missingOverrides.length) throw new Error(`Overrides missing from source audit: ${missingOverrides.join(", ")}`);
const dispositions = ["ready", "duplicate", "missing_portrait", "missing_relationship"];
const dispositionCounts = Object.fromEntries(dispositions.map((status) => [status, records.filter((row) => row.disposition === status).length]));
const verificationStates = [...new Set(records.map((row) => row.verificationState))].sort();
const verificationStateCounts = Object.fromEntries(verificationStates.map((status) => [status, records.filter((row) => row.verificationState === status).length]));
const report = {
  schemaVersion: 1,
  checkedAt: "2026-09-03",
  scope: "All 871 unresolved Mainland China P0 candidates from the frozen master ledger",
  sourceAudit: sourcePath,
  candidateCount: records.length,
  reviewedCount: records.length,
  strictReadyCount: dispositionCounts.ready,
  duplicateCount: dispositionCounts.duplicate,
  remainingCount: dispositionCounts.missing_portrait + dispositionCounts.missing_relationship,
  dispositionCounts,
  verificationStateCounts,
  records,
};
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, candidateCount: report.candidateCount, reviewedCount: report.reviewedCount, strictReadyCount: report.strictReadyCount, duplicateCount: report.duplicateCount, remainingCount: report.remainingCount, dispositionCounts, verificationStateCounts }, null, 2));
