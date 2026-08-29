import { groupMembers, people, regionOf, relationships, studentPlacements, type Region } from "../app/data";

const regions: Region[] = ["Mainland China", "Hong Kong", "Singapore", "United States"];

for (const region of regions) {
  const regionalPeople = people.filter((person) => person.primary && regionOf(person) === region);
  const profiles = regionalPeople.map((person) => {
    const facts = person.facts?.length ?? 0;
    const relationCount = relationships.filter((relationship) => relationship.from === person.id || relationship.to === person.id).length;
    const placementCount = studentPlacements.filter((placement) => placement.teacherId === person.id).length;
    const memberCount = groupMembers.filter((member) => member.teacherId === person.id).length;
    const checkedSources = person.sources.filter((source) => source.checkedAt && source.supports).length;
    return {
      id: person.id,
      name: person.chinese ?? person.name,
      sources: person.sources.length,
      checkedSources,
      facts,
      relations: relationCount,
      placements: placementCount,
      members: memberCount,
      reviewed: Boolean(person.lastVerifiedAt),
      needsEnrichment: facts < 3 || person.sources.length < 2 || !person.lastVerifiedAt,
    };
  });
  const weak = profiles.filter((profile) => profile.needsEnrichment);
  console.log(`\n${region}: ${profiles.length - weak.length}/${profiles.length} profiles meet the baseline`);
  if (weak.length) console.log(weak.map((profile) => `${profile.id}[s${profile.sources}/f${profile.facts}/v${profile.reviewed ? 1 : 0}]`).join(", "));
}
