import type { RosterAuditDecision, RosterPersonAudit } from "./top-school-roster-ledger";
import whuCs from "../data/roster-decisions/mainland-rank11-18-2026-09-03/whu-cs-rank11-18.json";
import whuAi from "../data/roster-decisions/mainland-rank11-18-2026-09-03/whu-ai-rank11-18.json";
import uestcCs from "../data/roster-decisions/mainland-rank11-18-2026-09-03/uestc-cs-rank11-18.json";
import seuCse from "../data/roster-decisions/mainland-rank11-18-2026-09-03/seu-cse-rank11-18.json";
import sysuCse from "../data/roster-decisions/mainland-rank11-18-2026-09-03/sysu-cse-rank11-18.json";
import sysuAi from "../data/roster-decisions/mainland-rank11-18-2026-09-03/sysu-ai-rank11-18.json";
import buaaCs from "../data/roster-decisions/mainland-rank11-18-2026-09-03/buaa-cs-rank11-18.json";
import buaaAi from "../data/roster-decisions/mainland-rank11-18-2026-09-03/buaa-ai-rank11-18.json";
import cuhkszSds from "../data/roster-decisions/mainland-rank11-18-2026-09-03/cuhksz-sds-rank11-18.json";
import buptCs from "../data/roster-decisions/mainland-rank11-18-2026-09-03/bupt-cs-rank11-18.json";
import buptAi from "../data/roster-decisions/mainland-rank11-18-2026-09-03/bupt-ai-rank11-18.json";
import szuAi from "../data/roster-decisions/mainland-rank11-18-2026-09-03/szu-ai-rank11-18.json";
import hustResidual from "../data/roster-decisions/mainland-rank11-20-residual-resolution-2026-09-03.json";

/** Proposed final state for records whose official directory was checked but
 * does not expose enough scope/independence evidence to admit the person. */
export type MainlandRank11To18RosterAuditDecision = RosterAuditDecision | "excluded_insufficient_scope_evidence";
export type MainlandRank11To18RosterPersonAudit = Omit<RosterPersonAudit, "decision"> & {
  decision: MainlandRank11To18RosterAuditDecision;
};

const documents = [
  whuCs,
  whuAi,
  uestcCs,
  seuCse,
  sysuCse,
  sysuAi,
  buaaCs,
  buaaAi,
  cuhkszSds,
  buptCs,
  buptAi,
  szuAi,
] as const;

type Decision = (typeof documents)[number]["decisions"][number];

const decisionMap: Record<Decision["decision"], MainlandRank11To18RosterAuditDecision> = {
  included_existing: "included",
  include_new_pi: "candidate_new_pi",
  excluded_non_ai_cs: "excluded_non_ai_cs",
  excluded_non_pi: "excluded_non_pi",
  excluded_historical: "excluded_historical",
  excluded_industry_only: "excluded_industry_only",
  excluded_insufficient_scope_evidence: "excluded_insufficient_scope_evidence",
  pending_profile_verification: "pending_profile_verification",
};

/**
 * Drop-in decisions for Mainland China ranks 11–18. HUST and Nankai (ranks
 * 19–20) already have complete shared-ledger decisions and are intentionally
 * not duplicated here.
 */
export const mainlandRank11To18RosterAudits2026: MainlandRank11To18RosterPersonAudit[] = documents.flatMap((document) =>
  {
    const nameCounts = new Map<string, number>();
    for (const entry of document.decisions) nameCounts.set(entry.name, (nameCounts.get(entry.name) ?? 0) + 1);
    return document.decisions.map((entry) => ({
      unitUrl: document.officialRosterUrl,
      rosterName: (nameCounts.get(entry.name) ?? 0) > 1 ? `${entry.name} [${entry.officialId}]` : entry.name,
      decision: decisionMap[entry.decision],
      atlasPersonId: entry.decision === "included_existing" && "atlasPersonId" in entry
        ? entry.atlasPersonId
        : undefined,
      reason: entry.reason,
      evidenceUrl: entry.evidenceUrl,
      reviewedAt: document.reviewedAt,
    }));
  },
);

export const mainlandRank11To18RosterDecisionKeys2026 = documents.flatMap((document) =>
  document.decisions.map((entry) => ({
    unitUrl: document.officialRosterUrl,
    officialId: entry.officialId,
  })),
);

export const mainlandRank11To18RosterUnitUrls2026 = documents.map((document) => document.officialRosterUrl);

const hustResidualDecisionMap: Record<string, MainlandRank11To18RosterAuditDecision> = {
  include_new_pi: "candidate_new_pi",
  excluded_insufficient_scope_evidence: "excluded_insufficient_scope_evidence",
};

/** Final resolutions for the two HUST rows that remained pending and the two
 * same-name Wang Bo cards that require official-ID-qualified ledger keys. */
export const mainlandRank19HustResidualAudits2026: MainlandRank11To18RosterPersonAudit[] = hustResidual.decisions.map((entry) => ({
  unitUrl: entry.officialRosterUrl,
  rosterName: "rosterName" in entry ? entry.rosterName : entry.name,
  decision: hustResidualDecisionMap[entry.decision],
  reason: entry.reason,
  evidenceUrl: entry.evidenceUrl,
  reviewedAt: hustResidual.reviewedAt,
}));

export const mainlandRank19HustResidualSupersededKeys2026 = hustResidual.decisions.map((entry) => ({
  decisionFile: entry.supersedesDecisionFile,
  officialId: entry.officialId,
}));
