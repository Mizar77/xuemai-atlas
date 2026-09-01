import { groupMembers, people, regionOf, relationships, studentPlacements } from "../app/data";
import { leadershipNetworkReviewedIds } from "../app/leadership-network-expansion";

const formalLeadershipRole = /(?:\b(?:dean|vice dean|associate dean|executive dean|department head|head of (?:the )?(?:department|school|college)|director(?:,| of) (?:[^·]*(?:institute|school|college|department|center|centre)))\b|院长|副院长|执行院长|系主任|所长|研究院主任|中心主任)/i;
const adviserSubtypes = new Set(["phd_adviser", "co_adviser", "master_adviser", "postdoc_mentor"]);
const reviewed = new Set<string>(leadershipNetworkReviewedIds);

const metricsFor = (person: (typeof people)[number]) => {
    const directRelationships = relationships.filter((relationship) => relationship.from === person.id || relationship.to === person.id);
    const direct = new Set(directRelationships.map((relationship) => relationship.from === person.id ? relationship.to : relationship.from)).size;
    const lineage = directRelationships.filter((relationship) => adviserSubtypes.has(relationship.subtype ?? "")).length;
    return {
      id: person.id,
      name: person.name,
      region: regionOf(person),
      direct,
      lineage,
      group: groupMembers.filter((member) => member.teacherId === person.id).length,
      placements: studentPlacements.filter((placement) => placement.teacherId === person.id).length,
      reviewed: reviewed.has(person.id),
      introducedAt: person.introducedAt,
    };
};

const rows = people
  .filter((person) => person.primary && person.stage !== "historical" && formalLeadershipRole.test(person.role))
  .map(metricsFor)
  .sort((a, b) => a.direct - b.direct || a.lineage - b.lineage || a.name.localeCompare(b.name));

const unresolved = rows.filter((row) => row.direct === 0);
const newlyIntroducedIsolates = rows.filter((row) => row.introducedAt && row.direct === 0);
const reviewedRegressions = people.filter((person) => reviewed.has(person.id)).map(metricsFor).filter((row) => row.direct < 2 || row.lineage < 2);

console.log(`Leadership-network audit: ${rows.length} formal leaders; ${rows.length - unresolved.length} connected; ${unresolved.length} legacy zero-edge reviews remain.`);
console.table(rows.map(({ id, name, region, direct, lineage, group, placements, reviewed }) => ({ id, name, region, direct, lineage, group, placements, reviewed })));

if (newlyIntroducedIsolates.length) {
  throw new Error(`New formal leaders cannot ship as isolated nodes: ${newlyIntroducedIsolates.map((row) => row.id).join(", ")}`);
}
if (reviewedRegressions.length) {
  throw new Error(`Reviewed leadership networks regressed below 2 verified lineage links: ${reviewedRegressions.map((row) => row.id).join(", ")}`);
}
