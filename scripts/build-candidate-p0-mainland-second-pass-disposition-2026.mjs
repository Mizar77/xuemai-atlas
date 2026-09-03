import { readFileSync, writeFileSync } from "node:fs";
import { candidatePriorityP0MainlandSecondPassBatch1DispositionOverrides2026 as overrides } from "../app/candidate-priority-p0-mainland-second-pass-batch-1-2026.ts";

const inputPath = "data/candidate-priority-p0-mainland-second-pass-source-audit-2026-09-03.json";
const outputPath = "data/candidate-priority-p0-mainland-second-pass-disposition-2026-09-03.json";
const audit = JSON.parse(readFileSync(inputPath, "utf8"));
const overrideMap = new Map(overrides.map((row) => [row.canonicalKey, row]));

const gapFor = (row, finalDisposition) => {
  if (finalDisposition === "ready" || finalDisposition === "duplicate") return [];
  const gaps = [];
  if (!row.officialFetch?.ok) gaps.push("official_profile_fetch");
  if (!row.portraitLead?.url) gaps.push("reliable_portrait");
  if (!(row.relationshipLeads?.length > 0)) gaps.push("first_party_relationship");
  const facts = row.facts ?? [];
  const factCategoryCount = ["education", "employment", "research"].filter((field) =>
    facts.some((block) => (block[field]?.length ?? 0) > 0),
  ).length;
  if (factCategoryCount < 3) gaps.push("three_to_five_sourced_facts");
  if (row.verificationState === "manual_ready_review") gaps.push("manual_identity_endpoint_review");
  if (gaps.length === 0) gaps.push("manual_identity_endpoint_review");
  return [...new Set(gaps)];
};

const records = audit.records.map((row) => {
  const override = overrideMap.get(row.canonicalKey);
  const finalDisposition = override?.disposition ?? row.disposition;
  return {
    canonicalKey: row.canonicalKey,
    name: row.name,
    institution: row.institution,
    priorDisposition: row.priorDisposition,
    secondPassVerificationState: row.verificationState,
    finalDisposition,
    atlasPersonId: override?.atlasPersonId,
    profileUrl: row.profileUrl,
    rosterUrl: row.rosterUrl,
    officialFetch: row.officialFetch,
    followedLinks: row.followedLinks,
    portraitLead: row.portraitLead,
    relationshipLeads: row.relationshipLeads,
    remainingGaps: gapFor(row, finalDisposition),
    reviewNote: override
      ? "人工核对现职、两项以上来源、3–5 条人物事实、单人头像和关系原句后进入独立严格批次。"
      : "第二轮已检查官方个人页及其直接链接材料；仍保留明确缺口，未自动发布。",
  };
});

const countBy = (rows, key) => Object.fromEntries([...rows.reduce((map, row) => map.set(row[key], (map.get(row[key]) ?? 0) + 1), new Map()).entries()].sort());
const result = {
  schemaVersion: 1,
  checkedAt: "2026-09-03",
  scope: "P0 Mainland China unresolved candidates · complete second-pass disposition ledger",
  sourceAudit: inputPath,
  candidateCount: records.length,
  reviewedCount: records.length,
  promotedCount: records.filter((row) => row.finalDisposition === "ready").length,
  unresolvedCount: records.filter((row) => !["ready", "duplicate"].includes(row.finalDisposition)).length,
  byPriorDisposition: countBy(records, "priorDisposition"),
  bySecondPassVerificationState: countBy(records, "secondPassVerificationState"),
  byFinalDisposition: countBy(records, "finalDisposition"),
  automaticallyPublished: 0,
  records,
};
writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, candidateCount: result.candidateCount, promotedCount: result.promotedCount, unresolvedCount: result.unresolvedCount, byFinalDisposition: result.byFinalDisposition }, null, 2));
