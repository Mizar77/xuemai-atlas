import { readFileSync } from "node:fs";
import { people } from "../app/data";
import { mainlandTop10TailRosterAudits2026 } from "../app/mainland-top10-tail-roster-audits-2026";
import { rosterUnitAudit, topSchoolRosterUnitSnapshots } from "../app/top-school-roster-ledger";
import { topSchoolRosterScope } from "../app/top-school-roster-scope";
import decisionFile from "../data/roster-decisions/mainland-top10-tail-2026-09-03.json";
import finalResolutionFile from "../data/roster-decisions/mainland-top10-final-resolutions-2026-09-03.json";

type OfficialPerson = { officialId: string; name: string };
type RawDecision = OfficialPerson & {
  unitUrl: string;
  decision: string;
  atlasPersonId?: string;
  evidenceUrl: string;
  reason: string;
  resolutionKind?: string;
};

const normalize = (value: string) => value
  .replace(/^(prof(?:essor)?|dr)\.?\s+/iu, "")
  .replace(/\s*\([^)]*\)\s*$/u, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();

const failures: string[] = [];
const initial = decisionFile.decisions as RawDecision[];
const resolutions = finalResolutionFile.decisions as RawDecision[];
const initialAllowed = new Set([
  "included_existing", "include_new_pi", "excluded_non_ai_cs", "excluded_non_pi",
  "excluded_historical", "excluded_industry_only", "pending_profile_verification",
]);
const finalAllowed = new Set([
  "included_existing", "include_new_pi", "excluded_non_ai_cs", "excluded_non_pi",
  "excluded_historical", "excluded_industry_only", "excluded_insufficient_scope_evidence",
]);
const targetSchools = topSchoolRosterScope.filter((school) => school.region === "Mainland China" && school.rank <= 10);
const targetUrls = new Set(targetSchools.flatMap((school) => school.units.map((unit) => unit.url)));
const snapshotByUrl = new Map(topSchoolRosterUnitSnapshots.map((snapshot) => [snapshot.unitUrl, snapshot] as const));
const atlasById = new Map(people.map((person) => [person.id, person] as const));
const officialIdsByUnit = new Map<string, Set<string>>();

let frozen = 0;
for (const school of targetSchools) {
  for (const unit of school.units) {
    const snapshot = snapshotByUrl.get(unit.url);
    if (!snapshot?.artifactPath || snapshot.fetchStatus !== "complete") {
      failures.push(`${unit.url}: target unit lacks a complete official snapshot`);
      continue;
    }
    const artifact = JSON.parse(readFileSync(snapshot.artifactPath, "utf8")) as { people: OfficialPerson[] };
    frozen += artifact.people.length;
    officialIdsByUnit.set(unit.url, new Set(artifact.people.map((person) => String(person.officialId))));
  }
}

const validateRow = (row: RawDecision, allowed: Set<string>, label: string) => {
  const key = `${row.unitUrl}:${row.officialId}`;
  if (!allowed.has(row.decision)) failures.push(`${label}:${key}: unknown decision ${row.decision}`);
  if (!row.evidenceUrl?.startsWith("http")) failures.push(`${label}:${key}: missing first-party evidence URL`);
  if (!row.reason || row.reason.length < 32 || !row.reason.includes("官方")) failures.push(`${label}:${key}: reason lacks specific official evidence`);
  if (row.decision === "included_existing") {
    const person = row.atlasPersonId ? atlasById.get(row.atlasPersonId) : undefined;
    if (!person) failures.push(`${label}:${key}: included_existing lacks a valid atlasPersonId`);
    else if (!person.primary || !person.portrait || person.sources.length < 2 || (person.facts?.length ?? 0) < 3) {
      failures.push(`${label}:${key}: included atlas profile misses baseline`);
    }
  }
};

const initialKeys = new Set<string>();
for (const row of initial) {
  validateRow(row, initialAllowed, "initial");
  if (!targetUrls.has(row.unitUrl)) failures.push(`initial:${row.unitUrl}:${row.officialId}: outside Mainland rank 1-10 scope`);
  const key = `${row.unitUrl}:${row.officialId}`;
  if (initialKeys.has(key)) failures.push(`initial:${key}: duplicate official-ID decision`);
  initialKeys.add(key);
  if (!officialIdsByUnit.get(row.unitUrl)?.has(String(row.officialId))) failures.push(`initial:${key}: not found in frozen official roster`);
}

const resolutionKeys = new Set<string>();
for (const row of resolutions) {
  validateRow(row, finalAllowed, "resolution");
  const key = `${row.unitUrl}:${row.officialId}`;
  if (resolutionKeys.has(key)) failures.push(`resolution:${key}: duplicate official-ID decision`);
  resolutionKeys.add(key);
  if (!row.resolutionKind) failures.push(`resolution:${key}: missing resolutionKind`);
  const officialIds = officialIdsByUnit.get(row.unitUrl);
  if (officialIds && !officialIds.has(String(row.officialId))) failures.push(`resolution:${key}: not found in frozen official roster`);
}

const initialPendingKeys = new Set(
  initial.filter((row) => row.decision === "pending_profile_verification")
    .map((row) => `${row.unitUrl}:${row.officialId}`),
);
const resolvedInitialPending = resolutions.filter((row) => initialPendingKeys.has(`${row.unitUrl}:${row.officialId}`));
if (resolvedInitialPending.length !== initialPendingKeys.size) failures.push(`resolved ${resolvedInitialPending.length}/${initialPendingKeys.size} explicit initial pending rows`);
if (resolutions.some((row) => row.decision.includes("pending"))) failures.push("final resolution file still contains pending decisions");

const adapterKeys = new Set(mainlandTop10TailRosterAudits2026.map((row) => `${row.unitUrl}:${normalize(row.rosterName)}`));
if (adapterKeys.size !== mainlandTop10TailRosterAudits2026.length) failures.push("adapter still contains unitUrl + normalized rosterName collisions");

const targetAudit = targetSchools.flatMap((school) => school.units.map((unit) => rosterUnitAudit(unit.url)));
for (const audit of targetAudit) if (audit.pendingCount !== 0) failures.push(`${audit.unitUrl}: pendingCount=${audit.pendingCount}`);

const collisionUnitUrls = ["https://www.cs.cmu.edu/directory/all", "https://www.cc.gatech.edu/people/faculty"];
for (const unitUrl of collisionUnitUrls) {
  const audit = rosterUnitAudit(unitUrl);
  if (audit.pendingCount !== 0) failures.push(`${unitUrl}: pendingCount=${audit.pendingCount}`);
}

const classification = Object.fromEntries(
  [...finalAllowed].sort().map((decision) => [decision, resolutions.filter((row) => row.decision === decision).length]),
);
const summary = {
  targetInstitutions: targetSchools.length,
  targetUnits: targetAudit.length,
  frozen,
  initialBatch: initial.length,
  resolvedInitialPending: resolvedInitialPending.length,
  collisionSupplements: resolutions.filter((row) => row.resolutionKind === "same_name_official_id_collision").length,
  finalResolutionRows: resolutions.length,
  classification,
  targetPending: targetAudit.reduce((sum, audit) => sum + (audit.pendingCount ?? 0), 0),
  cmuGeorgiaPending: collisionUnitUrls.reduce((sum, unitUrl) => sum + (rosterUnitAudit(unitUrl).pendingCount ?? 0), 0),
};

if (failures.length) {
  console.error(`Mainland top-10 final-resolution audit failed (${failures.length}):`);
  failures.slice(0, 100).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 100) console.error(`- ... ${failures.length - 100} additional failures omitted`);
  console.error(JSON.stringify(summary, null, 2));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ status: "PASS", ...summary }, null, 2));
}
