import { groupMembers, people, regionOf, relationships, relationshipSubtypeOf, studentPlacements } from "../app/data";
import { influencePriorityReviewedIds } from "../app/influence-priority-network-expansion";

const eliteInstitutions = new Set([
  "Stanford", "Berkeley", "CMU", "MIT", "Princeton", "Cornell", "Oxford", "Cambridge",
  "THU", "PKU", "U of Toronto", "Université de Montréal",
]);
const formalLeadershipRole = /(?:\b(?:dean|vice dean|associate dean|executive dean|department head|head of (?:the )?(?:department|school|college)|director(?:,| of) (?:[^·]*(?:institute|school|college|department|center|centre)))\b|院长|副院长|执行院长|系主任|所长|研究院主任|中心主任)/i;
const adviserSubtypes = new Set(["phd_adviser", "co_adviser", "master_adviser", "postdoc_mentor"]);
const reviewed = new Set<string>(influencePriorityReviewedIds);

const rows = people
  .filter((person) => person.primary && person.stage !== "historical" && (eliteInstitutions.has(person.institution) || formalLeadershipRole.test(person.role)))
  .map((person) => {
    const directRelationships = relationships.filter((relationship) => relationship.from === person.id || relationship.to === person.id);
    const incomingAdvisers = directRelationships.filter((relationship) => relationship.to === person.id && adviserSubtypes.has(relationshipSubtypeOf(relationship))).length;
    const downstreamTrainees = directRelationships.filter((relationship) => relationship.from === person.id && adviserSubtypes.has(relationshipSubtypeOf(relationship))).length;
    const direct = new Set(directRelationships.map((relationship) => relationship.from === person.id ? relationship.to : relationship.from)).size;
    const group = groupMembers.filter((member) => member.teacherId === person.id).length;
    const placements = studentPlacements.filter((placement) => placement.teacherId === person.id).length;
    const signal = formalLeadershipRole.test(person.role) ? "formal_leader" : person.stage === "emerging" ? "elite_emerging" : "elite_senior";
    const nextAction = signal === "elite_emerging"
      ? incomingAdvisers > 0 ? "verified" : group >= 3 ? "verify_upstream_adviser" : "verify_upstream_and_team"
      : downstreamTrainees + group + placements >= 3 ? "verified" : incomingAdvisers > 0 ? "expand_student_system" : "verify_upstream_and_student_system";
    return { id: person.id, name: person.name, region: regionOf(person), signal, direct, incomingAdvisers, downstreamTrainees, group, placements, nextAction, reviewed: reviewed.has(person.id), introducedAt: person.introducedAt };
  })
  .sort((a, b) => Number(a.nextAction === "verified") - Number(b.nextAction === "verified") || a.direct - b.direct || a.name.localeCompare(b.name));

const pending = rows.filter((row) => row.nextAction !== "verified");
const newIsolates = rows.filter((row) => row.introducedAt && row.direct === 0 && row.group === 0 && row.placements === 0);
const reviewedRegressions = rows.filter((row) => row.reviewed && row.direct === 0 && row.group === 0 && row.placements === 0);
const pendingByRegion = Object.fromEntries(
  Array.from(new Set(pending.map((row) => row.region))).sort().map((region) => [region, pending.filter((row) => row.region === region).length]),
);

console.log(`Influence-priority audit: ${rows.length} candidates; ${rows.length - pending.length} meet the current evidence threshold; ${pending.length} remain in the review queue.`);
console.log("Pending by region:", pendingByRegion);
console.table(pending.slice(0, 40).map(({ id, name, region, signal, direct, incomingAdvisers, downstreamTrainees, group, placements, nextAction }) => ({ id, name, region, signal, direct, incomingAdvisers, downstreamTrainees, group, placements, nextAction })));
if (pending.length > 40) console.log(`Showing the first 40 of ${pending.length} pending candidates; the full queue remains available from the exported data.`);
if (process.env.INFLUENCE_AUDIT_JSON === "1") {
  console.log("INFLUENCE_AUDIT_PENDING_JSON");
  console.log(JSON.stringify(pending, null, 2));
}

if (newIsolates.length) {
  throw new Error(`New prestige/leadership-triggered PI nodes cannot ship isolated: ${newIsolates.map((row) => row.id).join(", ")}`);
}
if (reviewedRegressions.length) {
  throw new Error(`Reviewed influence-priority networks regressed to zero edges: ${reviewedRegressions.map((row) => row.id).join(", ")}`);
}
