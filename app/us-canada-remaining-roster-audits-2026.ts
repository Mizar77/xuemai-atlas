import type { RosterAuditDecision, RosterPersonAudit } from "./top-school-roster-ledger";
import { usCanadaRemainingPriorityPeople2026 } from "./us-canada-remaining-priority-expansion-2026";

import gatechCoc from "../data/roster-decisions/us-canada-remaining-2026-09-03/gatech-coc.json";
import gatechIc from "../data/roster-decisions/us-canada-remaining-2026-09-03/gatech-ic.json";
import jhuClsp from "../data/roster-decisions/us-canada-remaining-2026-09-03/jhu-clsp.json";
import jhuCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/jhu-cs.json";
import nyuCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/nyu-cs.json";
import purdueCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/purdue-cs.json";
import uclaCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/ucla-cs.json";
import uclaEce from "../data/roster-decisions/us-canada-remaining-2026-09-03/ucla-ece.json";
import ucsdCse from "../data/roster-decisions/us-canada-remaining-2026-09-03/ucsd-cse.json";
import ucsdEce from "../data/roster-decisions/us-canada-remaining-2026-09-03/ucsd-ece.json";
import uiucEce from "../data/roster-decisions/us-canada-remaining-2026-09-03/uiuc-ece.json";
import umdCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/umd-cs.json";
import umdUmiacs from "../data/roster-decisions/us-canada-remaining-2026-09-03/umd-umiacs.json";
import umichCse from "../data/roster-decisions/us-canada-remaining-2026-09-03/umich-cse.json";
import upennCis from "../data/roster-decisions/us-canada-remaining-2026-09-03/upenn-cis.json";
import upennGrasp from "../data/roster-decisions/us-canada-remaining-2026-09-03/upenn-grasp.json";
import uscCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/usc-cs.json";
import uscIsi from "../data/roster-decisions/us-canada-remaining-2026-09-03/usc-isi.json";
import utexasEce from "../data/roster-decisions/us-canada-remaining-2026-09-03/utexas-ece.json";
import uvaCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/uva-cs.json";
import uwEce from "../data/roster-decisions/us-canada-remaining-2026-09-03/uw-ece.json";
import wiscCs from "../data/roster-decisions/us-canada-remaining-2026-09-03/wisc-cs.json";
import pendingResolutions from "../data/roster-decisions/us-canada-remaining-2026-09-03/pending-resolutions.json";

type RawDecision = {
  name?: string;
  rosterName?: string;
  profileUrl?: string;
  sourcePageUrl?: string;
  unitUrl?: string;
  unitId?: string;
  decision: string;
  reason: string;
  atlasPersonId?: string;
};

type UnitFile = {
  unitId: string;
  unitUrl: string;
  snapshotAt: string;
  decisions: RawDecision[];
};

const files = [
  gatechCoc,
  gatechIc,
  jhuClsp,
  jhuCs,
  nyuCs,
  purdueCs,
  uclaCs,
  uclaEce,
  ucsdCse,
  ucsdEce,
  uiucEce,
  umdCs,
  umdUmiacs,
  umichCse,
  upennCis,
  upennGrasp,
  uscCs,
  uscIsi,
  utexasEce,
  uvaCs,
  uwEce,
  wiscCs,
] as UnitFile[];

const decisionMap: Record<string, RosterAuditDecision> = {
  included_existing: "included",
  include_new_pi: "candidate_new_pi",
  excluded_non_pi: "excluded_non_pi",
  excluded_non_ai_cs: "excluded_non_ai_cs",
  excluded_historical: "excluded_historical",
  excluded_industry_only: "excluded_industry_only",
  excluded_duplicate: "excluded_duplicate",
  pending_profile_verification: "pending_profile_verification",
};

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
    .toLocaleLowerCase();
}

const publishedByName = new Map(
  usCanadaRemainingPriorityPeople2026.map((person) => [normalize(person.name), person.id] as const),
);

// These names currently resolve only to lightweight adviser/historical helper
// nodes. Keep the official-roster row as a profile candidate until the helper is
// upgraded with a current appointment, portrait, sources and full facts.
const deferredExistingProfiles = new Set([
  "Kunle Olukotun",
  "Aaron Sidford",
  "Gregory D. Hager",
  "Cho-Jui Hsieh",
  "Taylor Berg-Kirkpatrick",
  "Jordan Boyd-Graber",
  "Hal Daumé III",
  "Kostas Daniilidis",
  "Ruzena Bajcsy",
].map(normalize));

function audit(decision: RawDecision, unitUrl: string, reviewedAt: string): RosterPersonAudit {
  const rosterName = decision.rosterName ?? decision.name;
  if (!rosterName) throw new Error("US/Canada remaining decision is missing a roster name");
  const mapped = decisionMap[decision.decision];
  if (!mapped) throw new Error(`Unknown US/Canada remaining decision: ${decision.decision}`);
  const publishedAtlasId = decision.atlasPersonId ?? publishedByName.get(normalize(rosterName));
  const rosterDecision = mapped === "included" && deferredExistingProfiles.has(normalize(rosterName))
    ? "candidate_new_pi"
    : mapped === "candidate_new_pi" && publishedAtlasId
      ? "included"
      : mapped;
  return {
    unitUrl,
    rosterName,
    decision: rosterDecision,
    atlasPersonId: publishedAtlasId,
    reason: decision.reason,
    evidenceUrl: decision.profileUrl?.startsWith("http")
      ? decision.profileUrl
      : decision.sourcePageUrl ?? decision.unitUrl ?? unitUrl,
    reviewedAt,
  };
}

const canonicalPendingUnitUrls: Record<string, string> = {
  "cmu-scs": "https://www.cs.cmu.edu/directory/all",
  "cornell-tech": "https://tech.cornell.edu/people/faculty/",
  "nyu-cds": "https://cds.nyu.edu/people/faculty/",
  "stanford-cs": "https://www.cs.stanford.edu/people/faculty",
  "stanford-ee": "https://ee.stanford.edu/people/faculty",
  "umich-robotics": "https://robotics.umich.edu/people/faculty/",
  "utexas-cs": "https://www.cs.utexas.edu/people",
};

const newUnitAudits = files.flatMap((file) =>
  file.decisions.map((decision) => audit(decision, file.unitUrl, file.snapshotAt)),
);

const resolvedPendingAudits = (pendingResolutions.decisions as RawDecision[]).map((decision) => {
  const unitUrl = canonicalPendingUnitUrls[decision.unitId ?? ""]
    ?? decision.sourcePageUrl
    ?? decision.unitUrl;
  if (!unitUrl) throw new Error(`Missing canonical unit URL for ${decision.unitId ?? "unknown unit"}`);
  return audit(decision, unitUrl, pendingResolutions.checkedAt);
});

/**
 * Person-level decisions for 22 previously untouched US units plus replacements
 * for every previously pending US roster row. The shared aggregator keeps the
 * last normalized unit+name decision, so these rows supersede older pending data.
 */
export const usCanadaRemainingRosterAudits2026: RosterPersonAudit[] = [
  ...newUnitAudits,
  ...resolvedPendingAudits,
];
