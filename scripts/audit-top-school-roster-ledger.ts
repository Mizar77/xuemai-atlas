import { readFileSync } from "node:fs";
import { people } from "../app/data";
import {
  rosterUnitAudit,
  topSchoolRosterLedgerSummary,
  topSchoolRosterPersonAudits,
  topSchoolRosterUnitSnapshots,
} from "../app/top-school-roster-ledger";
import { topSchoolRosterScope } from "../app/top-school-roster-scope";

const failures: string[] = [];
const scopeUrls = topSchoolRosterScope.flatMap((school) => school.units.map((unit) => unit.url));
const personIds = new Set(people.map((person) => person.id));

if (topSchoolRosterScope.length !== 80) failures.push(`expected 80 institutions, found ${topSchoolRosterScope.length}`);
if (scopeUrls.length !== 124) failures.push(`expected 124 roster units, found ${scopeUrls.length}`);
if (new Set(scopeUrls).size !== scopeUrls.length) failures.push("roster scope contains duplicate unit URLs");
if (topSchoolRosterUnitSnapshots.length !== scopeUrls.length) failures.push("not every roster unit has a ledger snapshot record");

for (const decision of topSchoolRosterPersonAudits) {
  if (!scopeUrls.includes(decision.unitUrl)) failures.push(`${decision.rosterName}: unit URL is outside the 124-unit scope`);
  if (!decision.evidenceUrl.startsWith("http")) failures.push(`${decision.rosterName}: missing evidence URL`);
  if (!decision.reviewedAt) failures.push(`${decision.rosterName}: missing review date`);
  if (decision.decision === "included") {
    if (!decision.atlasPersonId || !personIds.has(decision.atlasPersonId)) failures.push(`${decision.rosterName}: included person is missing from atlas`);
    const person = people.find((item) => item.id === decision.atlasPersonId);
    if (person && (!person.primary || !person.portrait || person.sources.length < 2 || (person.facts?.length ?? 0) < 3)) {
      failures.push(`${decision.rosterName}: included atlas person does not meet profile/portrait baseline`);
    }
  }
}

for (const snapshot of topSchoolRosterUnitSnapshots) {
  const audit = rosterUnitAudit(snapshot.unitUrl);
  if (snapshot.fetchStatus === "complete") {
    if (snapshot.officialRosterCount === null || !snapshot.snapshotAt || !snapshot.sourceDataUrl || !snapshot.artifactPath) {
      failures.push(`${snapshot.unitUrl}: complete roster fetch lacks count/date/source/artifact metadata`);
    } else {
      try {
        const artifact = JSON.parse(readFileSync(snapshot.artifactPath, "utf8")) as {
          officialPageUrl?: string;
          officialDataUrl?: string;
          officialRosterCount?: number;
          completeness?: string;
          people?: Array<{ officialId?: string; name?: string }>;
        };
        if (artifact.officialPageUrl !== snapshot.unitUrl) failures.push(`${snapshot.unitUrl}: artifact page URL mismatch`);
        if (artifact.officialDataUrl !== snapshot.sourceDataUrl) failures.push(`${snapshot.unitUrl}: artifact data URL mismatch`);
        if (artifact.completeness !== "complete") failures.push(`${snapshot.unitUrl}: artifact is not marked complete`);
        if (artifact.officialRosterCount !== snapshot.officialRosterCount || artifact.people?.length !== snapshot.officialRosterCount) {
          failures.push(`${snapshot.unitUrl}: frozen count does not match artifact people`);
        }
        const officialIds = new Set(artifact.people?.map((person) => person.officialId));
        if (officialIds.has(undefined) || officialIds.size !== artifact.people?.length) {
          failures.push(`${snapshot.unitUrl}: artifact has missing or duplicate official IDs`);
        }
        if (artifact.people?.some((person) => !person.name)) failures.push(`${snapshot.unitUrl}: artifact has a missing roster name`);
      } catch (error) {
        failures.push(`${snapshot.unitUrl}: cannot read roster artifact (${String(error)})`);
      }
    }
    if (audit.status !== "complete") {
      failures.push(`${snapshot.unitUrl}: frozen roster still has ${audit.pendingCount ?? "unknown"} unresolved people`);
    }
  }
  if (audit.officialRosterCount !== null && audit.officialRosterCount < audit.checkedCount) {
    failures.push(`${snapshot.unitUrl}: checked count exceeds official roster count`);
  }
  if (audit.status === "complete" && audit.decisions.length !== audit.officialRosterCount) {
    failures.push(`${snapshot.unitUrl}: complete snapshot lacks one person-level decision per official roster member`);
  }
}

if (failures.length) {
  console.error(`Top-school roster ledger audit failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(
    `Top-school roster ledger audit passed: ${topSchoolRosterLedgerSummary.unitCount} units, ` +
    `${topSchoolRosterLedgerSummary.snapshottedUnitCount} official snapshots, ` +
    `${topSchoolRosterLedgerSummary.frozenRosterPersonCount} frozen roster people, ` +
    `${topSchoolRosterLedgerSummary.checkedPersonCount} checked people, ` +
    `${topSchoolRosterLedgerSummary.includedPersonCount} included, ` +
    `${topSchoolRosterLedgerSummary.excludedPersonCount} excluded.`,
  );
}
