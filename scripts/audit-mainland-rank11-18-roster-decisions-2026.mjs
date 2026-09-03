import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const decisionDir = path.join(root, "data/roster-decisions/mainland-rank11-18-2026-09-03");
const expectedUnits = new Map([
  ["whu-cs-rank11-18", 322],
  ["whu-ai-rank11-18", 122],
  ["uestc-cs-rank11-18", 150],
  ["seu-cse-rank11-18", 195],
  ["sysu-cse-rank11-18", 150],
  ["sysu-ai-rank11-18", 62],
  ["buaa-cs-rank11-18", 80],
  ["buaa-ai-rank11-18", 58],
  ["cuhksz-sds-rank11-18", 105],
  ["bupt-cs-rank11-18", 224],
  ["bupt-ai-rank11-18", 141],
  ["szu-ai-rank11-18", 57],
]);
const allowedDecisions = new Set([
  "included_existing",
  "include_new_pi",
  "excluded_non_ai_cs",
  "excluded_non_pi",
  "excluded_historical",
  "excluded_industry_only",
  "excluded_insufficient_scope_evidence",
  "pending_profile_verification",
]);
const nonPersonRosterNames = new Set([
  "学院简介", "历史沿革", "现任领导", "组织机构", "联系我们", "计科映像", "高层次人才", "专任教师",
  "实验技术人员", "荣休教师", "本科生教育", "研究生教育", "留学生教育", "国际交流", "科研进展",
  "学术交流", "项目申报", "研究平台", "党建工作", "纪检工作", "工会工作", "共青团工作", "学习资料",
  "师资岗位招聘", "博士后招聘", "非编人员招聘", "杰出校友", "校友动态", "校友库", "规章制度",
  "办事流程", "常用下载",
]);

const failures = [];
const aggregate = Object.fromEntries([...allowedDecisions].map((decision) => [decision, 0]));
let total = 0;

function check(condition, message) {
  if (!condition) failures.push(message);
}

for (const [unitId, expectedCount] of expectedUnits) {
  const filePath = path.join(decisionDir, `${unitId}.json`);
  check(fs.existsSync(filePath), `${unitId}: missing decision document`);
  if (!fs.existsSync(filePath)) continue;
  const document = JSON.parse(fs.readFileSync(filePath, "utf8"));
  check(document.unitId === unitId, `${unitId}: wrong unitId`);
  check(document.officialRosterCount === expectedCount, `${unitId}: frozen count ${document.officialRosterCount}, expected ${expectedCount}`);
  check(document.decisionCount === expectedCount, `${unitId}: decisionCount ${document.decisionCount}, expected ${expectedCount}`);
  check(document.decisions.length === expectedCount, `${unitId}: decisions length ${document.decisions.length}, expected ${expectedCount}`);
  check(/^https?:\/\//u.test(document.officialRosterUrl), `${unitId}: invalid official roster URL`);
  const ids = new Set();
  for (const entry of document.decisions) {
    const key = `${unitId}:${entry.officialId}`;
    check(!ids.has(entry.officialId), `${key}: duplicate officialId`);
    ids.add(entry.officialId);
    check(Boolean(entry.name?.trim()), `${key}: missing name`);
    check(allowedDecisions.has(entry.decision), `${key}: invalid decision ${entry.decision}`);
    check(/^https?:\/\//u.test(entry.officialRosterUrl), `${key}: invalid officialRosterUrl`);
    check(/^https?:\/\//u.test(entry.evidenceUrl), `${key}: invalid evidenceUrl`);
    check(entry.reason?.length >= 24, `${key}: reason is not specific enough`);
    check(Boolean(entry.evidenceExcerpt?.trim()), `${key}: missing evidence excerpt`);
    if (entry.decision === "included_existing") {
      check(Boolean(entry.atlasPersonId), `${key}: included_existing missing atlasPersonId`);
    }
    if (nonPersonRosterNames.has(entry.name)) {
      check(entry.decision === "excluded_non_pi", `${key}: navigation artifact must be excluded_non_pi`);
    }
    aggregate[entry.decision] += 1;
    total += 1;
  }
  const recomputed = Object.fromEntries([...allowedDecisions].map((decision) => [decision, document.decisions.filter((entry) => entry.decision === decision).length]));
  check(JSON.stringify(recomputed) === JSON.stringify(document.counts), `${unitId}: stored category totals differ from decisions`);
}

const summary = JSON.parse(fs.readFileSync(path.join(decisionDir, "summary.json"), "utf8"));
check(total === 1666, `batch total ${total}, expected 1666`);
check(summary.batchDecisionCount === 1666, `summary batchDecisionCount ${summary.batchDecisionCount}, expected 1666`);
check(summary.previouslyDecidedCount === 493, `summary previouslyDecidedCount ${summary.previouslyDecidedCount}, expected 493`);
check(summary.frozenOfficialRosterCount === 2159, `summary frozenOfficialRosterCount ${summary.frozenOfficialRosterCount}, expected 2159`);
check(summary.remainingUncheckedCount === 0, `summary remainingUncheckedCount ${summary.remainingUncheckedCount}, expected 0`);
check(aggregate.pending_profile_verification === 0, `pending_profile_verification ${aggregate.pending_profile_verification}, expected 0`);
check(JSON.stringify(summary.totalsByDecision) === JSON.stringify(aggregate), "summary category totals differ from unit decisions");
check(summary.pendingCount === aggregate.pending_profile_verification, "summary pending count differs from unit decisions");

const hustResidual = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions/mainland-rank11-20-residual-resolution-2026-09-03.json"), "utf8"));
check(hustResidual.decisionCount === 4, `HUST residual decisionCount ${hustResidual.decisionCount}, expected 4`);
check(hustResidual.decisions.length === 4, `HUST residual decisions length ${hustResidual.decisions.length}, expected 4`);
check(hustResidual.counts.pending_profile_verification === 0, "HUST residual still has pending records");
for (const entry of hustResidual.decisions) {
  check(["excluded_insufficient_scope_evidence", "include_new_pi"].includes(entry.decision), `HUST residual ${entry.name}: wrong final decision`);
  check(/^https?:\/\//u.test(entry.evidenceUrl), `HUST residual ${entry.name}: invalid evidence URL`);
  check(entry.reason.length >= 24, `HUST residual ${entry.name}: reason is not specific enough`);
  check(Boolean(entry.supersedesDecisionFile), `HUST residual ${entry.name}: missing superseded decision file`);
}
const wangBoResiduals = hustResidual.decisions.filter((entry) => entry.name === "王博");
check(wangBoResiduals.length === 2, `HUST residual Wang Bo count ${wangBoResiduals.length}, expected 2`);
check(new Set(wangBoResiduals.map((entry) => entry.officialId)).size === 2, "HUST residual Wang Bo officialIds are not unique");
check(wangBoResiduals.every((entry) => entry.rosterName?.includes(entry.officialId)), "HUST residual Wang Bo rosterName does not contain officialId");

if (failures.length) {
  console.error(JSON.stringify({ status: "failed", failureCount: failures.length, failures: failures.slice(0, 100) }, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({
    status: "passed",
    unitCount: expectedUnits.size,
    batchDecisionCount: total,
    previouslyDecidedCount: summary.previouslyDecidedCount,
    frozenOfficialRosterCount: summary.frozenOfficialRosterCount,
    totalsByDecision: aggregate,
    pendingCount: aggregate.pending_profile_verification,
    hustResidualDecisionCount: hustResidual.decisionCount,
    remainingUncheckedCount: summary.remainingUncheckedCount,
  }, null, 2));
}
