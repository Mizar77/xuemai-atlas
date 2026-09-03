import type { RosterAuditDecision, RosterPersonAudit } from "./top-school-roster-ledger";
import decisionFile from "../data/roster-decisions/mainland-top10-tail-2026-09-03.json";
import finalResolutionFile from "../data/roster-decisions/mainland-top10-final-resolutions-2026-09-03.json";

type RawDecision = {
  officialId: string;
  name: string;
  unitUrl: string;
  decision: string;
  atlasPersonId?: string;
  evidenceUrl: string;
  reason: string;
};

const normalize = (value: string) => value
  .replace(/^(prof(?:essor)?|dr)\.?\s+/iu, "")
  .replace(/\s*\([^)]*\)\s*$/u, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();

const rawRows = decisionFile.decisions as RawDecision[];
const nameFrequency = new Map<string, number>();
for (const row of rawRows) {
  const key = `${row.unitUrl}:${normalize(row.name)}`;
  nameFrequency.set(key, (nameFrequency.get(key) ?? 0) + 1);
}

const decisionMap: Record<string, RosterAuditDecision> = {
  included_existing: "included",
  include_new_pi: "candidate_new_pi",
  excluded_non_ai_cs: "excluded_non_ai_cs",
  excluded_non_pi: "excluded_non_pi",
  excluded_historical: "excluded_historical",
  excluded_industry_only: "excluded_industry_only",
  pending_profile_verification: "pending_profile_verification",
  excluded_insufficient_scope_evidence: "excluded_insufficient_scope_evidence",
};

const toAudit = (row: RawDecision, reviewedAt: string, disambiguateFromBatch: boolean): RosterPersonAudit => {
  const decision = decisionMap[row.decision];
  if (!decision) throw new Error(`Unknown Mainland top-10 roster decision: ${row.decision}`);
  return {
    unitUrl: row.unitUrl,
    rosterName: disambiguateFromBatch && nameFrequency.get(`${row.unitUrl}:${normalize(row.name)}`) !== 1
      ? `${row.name} · officialId ${row.officialId}`
      : row.name,
    decision,
    ...(row.atlasPersonId ? { atlasPersonId: row.atlasPersonId } : {}),
    reason: row.reason,
    evidenceUrl: row.evidenceUrl,
    reviewedAt,
  };
};

/**
 * Independent adapter for the frozen Mainland China rank 1-10 roster tail.
 * It is intentionally not wired into roster-person-audits-new.ts; the root
 * integration pass can add it after reviewing the batch summary and QA.
 */
const initialAudits = rawRows.map((row) => toAudit(row, decisionFile.checkedAt, true));
const finalResolutionAudits = (finalResolutionFile.decisions as RawDecision[])
  .map((row) => toAudit(row, finalResolutionFile.checkedAt, false));

/**
 * The final-resolution rows deliberately repeat the original unit+person key:
 * Map insertion order keeps the later evidence-backed decision while collision
 * rows already carry an explicit officialId suffix and therefore remain
 * separate people in the unit ledger.
 */
export const mainlandTop10TailRosterAudits2026: RosterPersonAudit[] = Array.from(
  new Map(
    [...initialAudits, ...finalResolutionAudits].map((audit) => [
      `${audit.unitUrl}:${normalize(audit.rosterName)}`,
      audit,
    ] as const),
  ).values(),
);
