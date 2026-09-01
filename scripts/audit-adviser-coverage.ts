import { adviserEvidenceAudit, people, regionOf, relationships, relationshipSubtypeOf, type Region } from "../app/data";

const currentPeople = people.filter((person) => person.primary);
const currentIds = new Set(currentPeople.map((person) => person.id));
const adviserRelations = relationships.filter((relationship) =>
  relationship.from !== relationship.to &&
  ["phd_adviser", "co_adviser", "master_adviser", "postdoc_mentor"].includes(relationshipSubtypeOf(relationship)),
);

const byTarget = new Map<string, typeof adviserRelations>();
adviserRelations.forEach((relationship) => byTarget.set(relationship.to, [...(byTarget.get(relationship.to) ?? []), relationship]));

const regions: Region[] = ["Mainland China", "Hong Kong", "Singapore", "United States", "Canada", "Europe"];
const rows = regions.map((region) => {
  const members = currentPeople.filter((person) => regionOf(person) === region);
  const phd = members.filter((person) => (byTarget.get(person.id) ?? []).some((relationship) => ["phd_adviser", "co_adviser"].includes(relationshipSubtypeOf(relationship))));
  const masters = members.filter((person) => (byTarget.get(person.id) ?? []).some((relationship) => relationshipSubtypeOf(relationship) === "master_adviser"));
  const postdoc = members.filter((person) => (byTarget.get(person.id) ?? []).some((relationship) => relationshipSubtypeOf(relationship) === "postdoc_mentor"));
  const any = members.filter((person) => byTarget.has(person.id));
  return {
    region,
    current: members.length,
    any: any.length,
    phd: phd.length,
    masters: masters.length,
    postdoc: postdoc.length,
    missing: members.filter((person) => !byTarget.has(person.id)).map((person) => ({ id: person.id, name: person.name })),
  };
});

const missingEndpoints = adviserRelations.flatMap((relationship) => [relationship.from, relationship.to]).filter((id) => !people.some((person) => person.id === id));
if (missingEndpoints.length) throw new Error(`Adviser relations contain missing endpoints: ${[...new Set(missingEndpoints)].join(", ")}`);

const totalWithAny = currentPeople.filter((person) => byTarget.has(person.id)).length;
console.log(`Adviser coverage: ${totalWithAny}/${currentPeople.length} current PIs (${Math.round(totalWithAny / currentPeople.length * 100)}%)`);
const auditIds = new Set(adviserEvidenceAudit.map((record) => record.personId));
const peopleIds = new Set(people.map((person) => person.id));
const missingAuditRecords = people.filter((person) => !auditIds.has(person.id));
const orphanAuditRecords = adviserEvidenceAudit.filter((record) => !peopleIds.has(record.personId));
const duplicateAuditIds = adviserEvidenceAudit
  .map((record) => record.personId)
  .filter((id, index, ids) => ids.indexOf(id) !== index);
if (missingAuditRecords.length || orphanAuditRecords.length || duplicateAuditIds.length) {
  throw new Error(`Adviser audit ledger mismatch: missing=${missingAuditRecords.map((person) => person.id).join(",") || "none"}; orphan=${orphanAuditRecords.map((record) => record.personId).join(",") || "none"}; duplicate=${[...new Set(duplicateAuditIds)].join(",") || "none"}`);
}
console.log(`Adviser audit ledger: ${adviserEvidenceAudit.length}/${people.length} visible people have an explicit verification state`);
console.table(rows.map((row) => ({
  region: row.region,
  current: row.current,
  any: row.any,
  phd: row.phd,
  masters: row.masters,
  postdoc: row.postdoc,
})));
if (process.argv.includes("--verbose")) {
  for (const row of rows) {
    console.log(`\n${row.region} missing ${row.missing.length}:`);
    console.log(row.missing.map((person) => `${person.name} [${person.id}]`).join("\n"));
  }
}

if (process.argv.includes("--fact-candidates")) {
  const adviserPattern = /(?:博士|硕士|博后|学术)?导师(?:为|是|：|:)|师从|(?:advised|supervised)\s+by|(?:advis(?:e|o)r|supervis(?:e|o)r)\s+(?:is|was)/i;
  const candidates = currentPeople
    .filter((person) => !byTarget.has(person.id))
    .map((person) => ({
      id: person.id,
      name: person.name,
      chinese: person.chinese,
      region: person.region,
      institution: person.institution,
      facts: (person.facts ?? []).filter((fact) => adviserPattern.test(`${fact.label} ${fact.value}`)),
      sources: person.sources.filter((source) => adviserPattern.test(`${source.supports ?? ""} ${source.label}`)),
    }))
    .filter((person) => person.facts.length || person.sources.length);
  console.log("\nMissing-edge people with adviser evidence already in their profile:");
  console.log(JSON.stringify(candidates, null, 2));
}

const selfLineage = relationships.filter((relationship) => relationship.type === "lineage" && relationship.from === relationship.to);
if (selfLineage.length) throw new Error(`Legacy self-lineage records require migration: ${selfLineage.map((relationship) => relationship.id).join(", ")}`);

if (!currentIds.size) throw new Error("No current PI records found");
