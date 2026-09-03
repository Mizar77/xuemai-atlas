import type { RosterAuditDecision, RosterPersonAudit } from "./top-school-roster-ledger";
import batch from "../data/roster-decisions/hk-sg-remaining-892-2026-09-03.json";

const decisionMap: Record<string, RosterAuditDecision> = {
  included_existing: "included",
  include_new_pi: "candidate_new_pi",
  excluded_non_ai_cs: "excluded_non_ai_cs",
  excluded_non_pi: "excluded_non_pi",
  excluded_historical: "excluded_historical",
  excluded_industry_only: "excluded_industry_only",
  pending_profile_verification: "pending_profile_verification",
  // Runtime support is intentionally retained for the evidence-specific final
  // exclusion. The shared ledger union can be widened when this adapter is
  // integrated; the cast below keeps this independent batch self-contained.
  excluded_insufficient_scope_evidence: "excluded_insufficient_scope_evidence" as RosterAuditDecision,
};

const resolvedRemainingAudits: RosterPersonAudit[] = batch.decisions.map((row) => ({
  unitUrl: row.unitUrl,
  rosterName: row.rosterName,
  decision: decisionMap[row.decision],
  ...(row.atlasPersonId ? { atlasPersonId: row.atlasPersonId } : {}),
  reason: row.reason,
  evidenceUrl: row.evidenceUrl,
  reviewedAt: row.reviewedAt,
}));

// The aggregate ledger treats any imported unit batch as a full replacement
// of its legacy sample. Preserve the ten already-verified baseline people from
// these units explicitly; otherwise each affected frozen roster appears one or
// two rows short after this 892-row incremental batch is integrated.
const priorVerifiedAudits: RosterPersonAudit[] = [
  { unitUrl: "https://ece.hku.hk/people/", rosterName: "Xiaojuan Qi", decision: "included", atlasPersonId: "xiaojuan-qi-top", reason: "HKU ECE 官方名录及个人页确认其为现任 AI/CV 独立 PI。", evidenceUrl: "https://ece.hku.hk/people/xjqi/", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.eduhk.hk/mit/en/people.php", rosterName: "Ferrante Neri", decision: "included", atlasPersonId: "ferrante-neri-eduhk", reason: "EdUHK 官方名录及个人页确认其为现任教授与独立 PI。", evidenceUrl: "https://www.eduhk.hk/en/experts/professor-neri-ferrante", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.eduhk.hk/mit/en/people.php", rosterName: "Yu Yang", decision: "included", atlasPersonId: "yu-yang-eduhk", reason: "EdUHK 官方名录及个人页确认其为现任 AI/CS 独立 PI。", evidenceUrl: "https://www.eduhk.hk/mit/zht/staff/yangyy", reviewedAt: "2026-09-02" },
  { unitUrl: "https://scholars.ln.edu.hk/en/organisations/division-of-artificial-intelligence/persons/", rosterName: "Haoran Xie", decision: "included", atlasPersonId: "haoran-xie-lingnan", reason: "岭南大学官方学者页确认其为人工智能学部现任教授与独立 PI。", evidenceUrl: "https://scholars.ln.edu.hk/en/persons/haoran-xie/", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.hkmu.edu.hk/st/people/key-staff/", rosterName: "Philips Wang", decision: "included", atlasPersonId: "philips-wang-hkmu", reason: "香港都会大学官方名录及个人页确认其为现任 AI/CS 独立 PI。", evidenceUrl: "https://www.hkmu.edu.hk/st/people/key-staff/staff-profile/?email=pwang&unit=ST&po=N", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/", rosterName: "Hai Liu", decision: "included", atlasPersonId: "hai-liu-hsuhk", reason: "香港恒生大学官方名录及个人页确认其为计算学系现任独立 PI。", evidenceUrl: "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/?staffId=930", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/", rosterName: "Na Zhao", decision: "included", atlasPersonId: "na-zhao-sutd", reason: "SUTD 官方 AAI 名录及个人页确认其为现任独立 PI。", evidenceUrl: "https://www.sutd.edu.sg/profile/zhao-na/", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.singaporetech.edu.sg/directory/faculty", rosterName: "Indriyati Atmosukarto", decision: "included", atlasPersonId: "indriyati-atmosukarto-sit", reason: "SIT 官方教师名录及个人页确认其为现任 AI/计算方向独立 PI。", evidenceUrl: "https://www.singaporetech.edu.sg/directory/faculty/indriyati-atmosukarto", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.suss.edu.sg/academics/schools-college/faculty-listing?schools=school-of-science-and-technology", rosterName: "Bheema Thiagarajan Lokesh", decision: "included", atlasPersonId: "bheema-lokesh-suss", reason: "SUSS 官方教师名录及个人页确认其为现任 AI/CS 独立 PI。", evidenceUrl: "https://www.suss.edu.sg/academics/schools-college/faculty-listing/detail/dr-bheema-thiagarajan-lokesh", reviewedAt: "2026-09-02" },
  { unitUrl: "https://www.duke-nus.edu.sg/daisi/people/faculty", rosterName: "Nan Liu", decision: "included", atlasPersonId: "nan-liu-duke-nus", reason: "Duke-NUS 官方 DAISI 名录及个人页确认其为现任生物医学 AI 独立 PI。", evidenceUrl: "https://www.duke-nus.edu.sg/directory/detail/liu-nan", reviewedAt: "2026-09-02" },
];

export const hkSgRemainingRosterAudits2026: RosterPersonAudit[] = [
  ...priorVerifiedAudits,
  ...resolvedRemainingAudits,
];
