import { groupMembers, people, relationships, studentPlacements } from "../app/data";
import { waiLamAdviserRosterAudit } from "../app/wai-lam-roster-expansion";

type AdviserRosterAudit = typeof waiLamAdviserRosterAudit;

const audits: AdviserRosterAudit[] = [waiLamAdviserRosterAudit];
const failures: string[] = [];

for (const audit of audits) {
  const teacher = people.find((person) => person.id === audit.teacherId);
  if (!teacher) {
    failures.push(`${audit.id}: missing teacher ${audit.teacherId}`);
    continue;
  }

  if (teacher.knownAlumniCount !== audit.alumniCount) {
    failures.push(`${audit.id}: knownAlumniCount=${teacher.knownAlumniCount ?? "missing"}; expected ${audit.alumniCount}`);
  }

  const recordedCurrentNames = new Set(
    groupMembers
      .filter((member) => member.teacherId === audit.teacherId)
      .map((member) => member.name.toLocaleLowerCase()),
  );
  for (const name of audit.currentStudentNames) {
    if (!recordedCurrentNames.has(name.toLocaleLowerCase())) {
      failures.push(`${audit.id}: current student missing from groupMembers: ${name}`);
    }
  }

  const recordedDestinationNames = new Set(
    studentPlacements
      .filter((placement) => placement.teacherId === audit.teacherId)
      .map((placement) => placement.student.toLocaleLowerCase()),
  );
  for (const name of audit.alumniWithPublishedDestination) {
    if (!recordedDestinationNames.has(name.toLocaleLowerCase())) {
      failures.push(`${audit.id}: published alumni destination missing: ${name}`);
    }
  }

  for (const alumnus of audit.alumniRepresentedAsPeople) {
    if (!people.some((person) => person.id === alumnus.personId)) {
      failures.push(`${audit.id}: alumni person node missing: ${alumnus.name} (${alumnus.personId})`);
      continue;
    }
    const relation = relationships.find((edge) => (
      edge.from === audit.teacherId
      && edge.to === alumnus.personId
      && edge.type === "lineage"
    ));
    if (!relation) {
      failures.push(`${audit.id}: adviser edge missing for ${alumnus.name} (${alumnus.personId})`);
    }
  }
}

if (failures.length) {
  console.error(`Adviser roster coverage audit failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  const currentCount = audits.reduce((total, audit) => total + audit.currentStudentNames.length, 0);
  const alumniCount = audits.reduce((total, audit) => total + audit.alumniCount, 0);
  const destinationCount = audits.reduce((total, audit) => total + audit.alumniWithPublishedDestination.length, 0);
  console.log(`Adviser roster coverage audit passed: ${audits.length} roster, ${currentCount} current students, ${alumniCount} alumni, ${destinationCount} published destinations.`);
}
