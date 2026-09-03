import { readFileSync, writeFileSync } from "node:fs";
import { candidatePriorityP0MainlandThirdPassBatch1DispositionOverrides2026 as overrides } from "../app/candidate-priority-p0-mainland-third-pass-batch-1-2026.ts";

const checkedAt = "2026-09-03";
const inputPath = "data/candidate-priority-p0-mainland-second-pass-disposition-2026-09-03.json";
const evidencePath = "data/candidate-priority-p0-mainland-third-pass-145-source-audit-2026-09-03.json";
const outputPath = "data/candidate-priority-p0-mainland-third-pass-145-disposition-2026-09-03.json";
const prior = JSON.parse(readFileSync(inputPath, "utf8"));
const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
const targetKeys = new Set(evidence.records.map((row) => row.canonicalKey));
const ready = new Map(overrides.map((row) => [row.canonicalKey, row]));
const evidenceByKey = new Map(evidence.records.map((row) => [row.canonicalKey, row]));

const records = prior.records.filter((row) => targetKeys.has(row.canonicalKey)).map((row) => {
  const promoted = ready.get(row.canonicalKey);
  const thirdPass = evidenceByKey.get(row.canonicalKey);
  if (promoted) {
    return {
      ...row,
      checkedAt,
      thirdPassDisposition: "ready",
      finalDisposition: "ready",
      atlasPersonId: promoted.atlasPersonId,
      remainingGaps: [],
      thirdPassReview: "人工复核本人/官方院系页、官方名录、事实原句、关系端点和本地头像后通过严格门槛。",
    };
  }
  if (row.canonicalKey === "Mainland China:上海交通大学:娄炯") {
    return {
      ...row,
      checkedAt,
      thirdPassDisposition: "not_independent_pi",
      finalDisposition: "not_independent_pi",
      remainingGaps: ["confirmed_current_independent_pi"],
      thirdPassReview: "官方页当前仅列助理研究员，未见博士生导师、硕士生导师或可独立招生身份；不按独立 PI 接入。",
    };
  }
  const falsePositive = ["Mainland China:上海交通大学:徐燕虹", "Mainland China:上海交通大学:李伟"].includes(row.canonicalKey);
  return {
    ...row,
    checkedAt,
    thirdPassDisposition: row.remainingGaps[0] === "first_party_relationship" ? "missing_relationship" : "missing_profile_facts",
    finalDisposition: row.remainingGaps[0] === "first_party_relationship" ? "missing_relationship" : "missing_relationship",
    remainingGaps: row.remainingGaps,
    thirdPassReview: falsePositive
      ? "搜索命中经人工复核为同名或其他团队页面，不能作为该候选的一手事实或关系证据。"
      : thirdPass?.reason ?? "第三轮仍未补齐严格发布门槛。",
  };
});

const countBy = (field) => Object.fromEntries([...new Set(records.map((row) => row[field]))].sort().map((value) => [value, records.filter((row) => row[field] === value).length]));
const remainingGapCounts = {};
for (const row of records) for (const gap of row.remainingGaps) remainingGapCounts[gap] = (remainingGapCounts[gap] ?? 0) + 1;
const report = {
  schemaVersion: 1,
  checkedAt,
  scope: "Mainland P0 third pass: 145 high-yield candidates",
  source: inputPath,
  evidence: evidencePath,
  candidateCount: records.length,
  reviewedCount: records.length,
  byOriginalGap: evidence.byOriginalGap,
  byThirdPassDisposition: countBy("thirdPassDisposition"),
  remainingGapCounts,
  readyCount: records.filter((row) => row.thirdPassDisposition === "ready").length,
  blockedCount: records.filter((row) => row.thirdPassDisposition !== "ready").length,
  automaticallyPublished: 0,
  records,
};
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, candidateCount: report.candidateCount, reviewedCount: report.reviewedCount, byThirdPassDisposition: report.byThirdPassDisposition, remainingGapCounts, readyCount: report.readyCount, blockedCount: report.blockedCount, automaticallyPublished: 0 }, null, 2));
