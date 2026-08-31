import { groupMembers, people, placementSectorOf, relationships, studentPlacements, type PlacementSector } from "../app/data";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

type Identified = { id: string };

function duplicates(records: Identified[]) {
  const seen = new Set<string>();
  return records.map((record) => record.id).filter((id) => seen.has(id) || !seen.add(id));
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function validHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const collections: [string, Identified[]][] = [
  ["people", people],
  ["relationships", relationships],
  ["groupMembers", groupMembers],
  ["studentPlacements", studentPlacements],
];

for (const [name, records] of collections) {
  const repeated = duplicates(records);
  assert(repeated.length === 0, `${name} contains duplicate ids: ${repeated.join(", ")}`);
}

const personIds = new Set(people.map((person) => person.id));
const portraitHashes = new Map<string, string>();

for (const relationship of relationships) {
  assert(personIds.has(relationship.from), `Relationship ${relationship.id} has missing from-person ${relationship.from}`);
  assert(personIds.has(relationship.to), `Relationship ${relationship.id} has missing to-person ${relationship.to}`);
  assert(validHttpUrl(relationship.source.url), `Relationship ${relationship.id} has an invalid source URL`);
}

for (const placement of studentPlacements) {
  assert(personIds.has(placement.teacherId), `Placement ${placement.id} has missing teacher ${placement.teacherId}`);
  assert(validHttpUrl(placement.source.url), `Placement ${placement.id} has an invalid source URL`);
}

const placementSectors: PlacementSector[] = ["academia", "industry", "startup", "postdoc", "other"];
for (const placement of studentPlacements) {
  assert(placementSectors.includes(placementSectorOf(placement)), `Placement ${placement.id} has an invalid destination sector`);
}
for (const sector of placementSectors) {
  assert(studentPlacements.some((placement) => placementSectorOf(placement) === sector), `No placement is classified as ${sector}`);
}

for (const member of groupMembers) {
  assert(personIds.has(member.teacherId), `Group member ${member.id} has missing teacher ${member.teacherId}`);
  assert(validHttpUrl(member.source.url), `Group member ${member.id} has an invalid source URL`);
}

for (const person of people) {
  assert(person.sources.length > 0, `Person ${person.id} has no public source`);
  assert(person.sources.every((source) => validHttpUrl(source.url)), `Person ${person.id} has an invalid source URL`);
  if (person.portrait) {
    assert(validHttpUrl(person.portrait.source.url), `Person ${person.id} portrait has an invalid source URL`);
    if (/^https?:\/\//.test(person.portrait.src)) {
      assert(person.portrait.src.startsWith("https://"), `Person ${person.id} remote portrait must use HTTPS`);
    } else {
      const portraitPath = join(process.cwd(), "public", person.portrait.src.replace(/^\//, ""));
      assert(existsSync(portraitPath), `Person ${person.id} portrait file does not exist: ${person.portrait.src}`);
      assert(statSync(portraitPath).size >= 2_000, `Person ${person.id} portrait file is unexpectedly small`);
      const hash = createHash("sha256").update(readFileSync(portraitPath)).digest("hex");
      const duplicateOwner = portraitHashes.get(hash);
      assert(!duplicateOwner, `People ${duplicateOwner} and ${person.id} use the same portrait file`);
      portraitHashes.set(hash, person.id);
    }
  }

  if (person.primary) {
    assert(person.sources.length >= 2, `Primary PI ${person.id} has fewer than two public sources`);
    assert((person.facts?.length ?? 0) >= 3, `Primary PI ${person.id} has fewer than three profile facts`);
    assert(Boolean(person.lastVerifiedAt), `Primary PI ${person.id} has not been reviewed`);
  }
}

const currentPeople = people.filter((person) => person.primary);
const portraitPeople = currentPeople.filter((person) => person.portrait);
console.log(`Data validation passed: ${people.length} people, ${relationships.length} relationships, ${studentPlacements.length} placements, ${groupMembers.length} group members, ${portraitPeople.length}/${currentPeople.length} current PI portraits.`);
