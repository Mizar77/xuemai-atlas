import type { RosterAuditDecision, RosterPersonAudit } from "./top-school-roster-ledger";
import resolution from "../data/roster-decisions/asia-pending-resolution-2026-09-03.json";
import { asiaPendingResolutionPiExpansionPublishedPeople2026 } from "./asia-pending-resolution-pi-expansion-2026";

type ResolutionDecision = (typeof resolution.decisions)[number];

const decisionMap: Record<string, RosterAuditDecision> = {
  included_existing: "included",
  include_new_pi: "candidate_new_pi",
  excluded_non_pi: "excluded_non_pi",
  excluded_non_ai_cs: "excluded_non_ai_cs",
  excluded_historical: "excluded_historical",
  excluded_industry_only: "excluded_industry_only",
  pending_profile_verification: "pending_profile_verification",
  pending_portrait: "pending_portrait",
};

function evidenceUrl(entry: ResolutionDecision): string {
  if ("verificationSources" in entry && entry.verificationSources?.[0]) {
    return entry.verificationSources[0];
  }
  return entry.profileUrl ?? entry.sourcePageUrl ?? entry.officialId;
}

const unitUrlByDecisionFile: Record<string, string> = {
  "data/roster-decisions/hkust-cse-2026-09-02.json": "https://cse.hkust.edu.hk/admin/people/faculty",
  "data/roster-decisions/hust-aia-2026-09-02.json": "https://aia.hust.edu.cn/szdw.htm",
  "data/roster-decisions/hust-cs-2026-09-02.json": "https://cs.hust.edu.cn/szdw/js.htm",
  "data/roster-decisions/hust-sse-2026-09-02.json": "https://sse.hust.edu.cn/szdw.htm",
  "data/roster-decisions/ntu-ccds-next-batch-2026-09-03.json": "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds",
  "data/roster-decisions/nus-computing-next-batch-2026-09-03.json": "https://www.comp.nus.edu.sg/about/faculty/",
  "data/roster-decisions/pku-cs-2026-09-02.json": "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm",
  "data/roster-decisions/thu-air-next-batch-2026-09-03.json": "https://air.tsinghua.edu.cn/airtd/yjtd.htm",
  "data/roster-decisions/thu-automation-next-batch-2026-09-03.json": "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm",
  "data/roster-decisions/thu-cs-next-batch-2026-09-03.json": "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm",
};

/**
 * Drop-in person decisions for the shared roster ledger.  The parent integration
 * should replace the superseded pending decisions by `(supersedesDecisionFile,
 * officialId)` instead of appending duplicates.
 */
export const asiaPendingResolutionRosterAudits2026: RosterPersonAudit[] = resolution.decisions.map((entry) => ({
  unitUrl: unitUrlByDecisionFile[entry.supersedesDecisionFile]
    ?? entry.sourcePageUrl
    ?? entry.profileUrl
    ?? entry.officialId,
  rosterName: entry.name,
  decision: decisionMap[entry.decision] === "candidate_new_pi"
    && asiaPendingResolutionPiExpansionPublishedPeople2026.some((person) => person.id === entry.atlasPersonId)
    ? "included"
    : decisionMap[entry.decision],
  atlasPersonId: asiaPendingResolutionPiExpansionPublishedPeople2026.some((person) => person.id === entry.atlasPersonId)
    ? entry.atlasPersonId
    : undefined,
  reason: entry.reason,
  evidenceUrl: evidenceUrl(entry),
  reviewedAt: resolution.reviewedAt,
}));

export const asiaPendingResolutionSupersededKeys2026 = resolution.decisions.map((entry) => ({
  decisionFile: entry.supersedesDecisionFile,
  officialId: entry.officialId,
}));
