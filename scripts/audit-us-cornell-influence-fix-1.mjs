import { build } from "esbuild";

const result = await build({
  stdin: {
    contents: `
      import { groupMembers as existingGroupMembers, people, relationships as existingRelationships, relationshipSubtypeOf } from "./app/data.ts";
      import { usCornellInfluenceFix1GroupMembers, usCornellInfluenceFix1PersonEnhancements, usCornellInfluenceFix1Relationships } from "./app/us-cornell-influence-fix-1.ts";
      export const auditPayload = { existingGroupMembers, people, existingRelationships, relationshipSubtypeOf, usCornellInfluenceFix1GroupMembers, usCornellInfluenceFix1PersonEnhancements, usCornellInfluenceFix1Relationships };
    `,
    resolveDir: process.cwd(),
    sourcefile: "cornell-influence-audit-entry.ts",
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});

const bundled = result.outputFiles[0].text;
const { auditPayload } = await import(`data:text/javascript;base64,${Buffer.from(bundled).toString("base64")}`);
const {
  existingGroupMembers,
  people,
  existingRelationships,
  relationshipSubtypeOf,
  usCornellInfluenceFix1GroupMembers: groupMembers,
  usCornellInfluenceFix1PersonEnhancements: enhancements,
  usCornellInfluenceFix1Relationships: relationships,
} = auditPayload;

const targets = [
  "abe-davis-cornell",
  "aditya-vashistha-cornell",
  "allison-koenecke-cornell",
  "andrew-owens-cornell",
  "angelina-wang-cornell",
  "cheng-zhang-cornell",
  "christopher-de-sa-cornell",
  "diana-cai-cornell",
  "hadar-averbuch-elor-cornell",
  "jennifer-sun-cornell",
];
const firstPartyKinds = new Set(["official", "profile", "cv", "thesis"]);
const adviserSubtypes = new Set(["phd_adviser", "co_adviser", "master_adviser", "postdoc_mentor"]);
const failures = [];

const duplicateIds = (items) => {
  const seen = new Set();
  return items.map((item) => item.id).filter((id) => seen.has(id) || !seen.add(id));
};

if (Object.keys(enhancements).length !== targets.length) {
  failures.push(`expected ${targets.length} enhancements, found ${Object.keys(enhancements).length}`);
}

const personIds = new Set(people.map((person) => person.id));
for (const target of targets) {
  if (!personIds.has(target)) failures.push(`${target}: target person does not exist in canonical data`);
  const enhancement = enhancements[target];
  if (!enhancement) {
    failures.push(`${target}: missing enhancement`);
    continue;
  }
  if (!(enhancement.facts || []).length) failures.push(`${target}: no sourced enhancement fact`);
  if ((enhancement.facts || []).some((fact) => !fact.source?.url)) failures.push(`${target}: unsourced enhancement fact`);
  if (!(enhancement.sources || []).length) failures.push(`${target}: no source collection`);
  if ((enhancement.sources || []).some((source) => !firstPartyKinds.has(source.kind))) failures.push(`${target}: non-first-party enhancement source kind`);
}

for (const duplicate of duplicateIds(groupMembers)) failures.push(`duplicate new group-member id: ${duplicate}`);
for (const duplicate of duplicateIds(relationships)) failures.push(`duplicate new relationship id: ${duplicate}`);

for (const member of groupMembers) {
  const canonicalOccurrences = existingGroupMembers.filter((existing) => existing.id === member.id).length;
  if (canonicalOccurrences > 1) failures.push(`${member.id}: group-member id occurs ${canonicalOccurrences} times in canonical data`);
  if (!personIds.has(member.teacherId)) failures.push(`${member.id}: missing teacher endpoint ${member.teacherId}`);
  if (!member.name || !member.role) failures.push(`${member.id}: incomplete named-member record`);
  if (!member.source?.url || !firstPartyKinds.has(member.source.kind)) failures.push(`${member.id}: group-member source is not first-party`);
}

for (const relationship of relationships) {
  const canonicalOccurrences = existingRelationships.filter((existing) => existing.id === relationship.id).length;
  if (canonicalOccurrences > 1) failures.push(`${relationship.id}: relationship id occurs ${canonicalOccurrences} times in canonical data`);
  if (!personIds.has(relationship.from)) failures.push(`${relationship.id}: missing source endpoint ${relationship.from}`);
  if (!personIds.has(relationship.to)) failures.push(`${relationship.id}: missing target endpoint ${relationship.to}`);
  if (relationship.type !== "lineage" || !adviserSubtypes.has(relationshipSubtypeOf(relationship))) failures.push(`${relationship.id}: not an explicit training relationship`);
  if (!relationship.verified || !relationship.evidence) failures.push(`${relationship.id}: relationship is not explicitly evidenced`);
  if (!relationship.source?.url || !firstPartyKinds.has(relationship.source.kind)) failures.push(`${relationship.id}: relationship source is not first-party`);
}

for (const target of targets) {
  const incomingAdvisers = relationships.filter((relationship) => relationship.to === target && adviserSubtypes.has(relationshipSubtypeOf(relationship))).length;
  const namedCurrentMembers = groupMembers.filter((member) => member.teacherId === target).length;
  if (incomingAdvisers === 0 && namedCurrentMembers < 3) {
    failures.push(`${target}: influence threshold still unmet (${incomingAdvisers} adviser, ${namedCurrentMembers} current members)`);
  }
}

if (failures.length) {
  console.error(`Cornell influence fix QA failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const advisers = targets.filter((target) => relationships.some((relationship) => relationship.to === target)).length;
const rosterBacked = targets.filter((target) => groupMembers.filter((member) => member.teacherId === target).length >= 3).length;
console.log(`Cornell influence fix QA passed: ${targets.length}/${targets.length} targets meet threshold; ${relationships.length} explicit training edges across ${advisers} targets; ${groupMembers.length} named current members across ${rosterBacked} targets; endpoints and ids are clean.`);
