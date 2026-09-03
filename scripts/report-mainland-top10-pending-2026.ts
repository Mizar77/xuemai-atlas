import { rosterUnitAudit, topSchoolRosterPersonAudits } from "../app/top-school-roster-ledger";
import { topSchoolRosterScope } from "../app/top-school-roster-scope";
import { people } from "../app/data";

const normalizePersonName = (value: string) => value
  .replace(/[（(][^）)]*[）)]/gu, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();
const atlasByName = new Map(people.filter((person) => person.primary).flatMap((person) =>
  [person.name, person.chinese].filter(Boolean).map((name) => [normalizePersonName(name as string), person.id] as const),
));

for (const school of topSchoolRosterScope.filter((item) => item.region === "Mainland China" && item.rank <= 10)) {
  for (const unit of school.units) {
    const audit = rosterUnitAudit(unit.url);
    if (!audit.pendingCount) continue;
    const explicitPending = topSchoolRosterPersonAudits
      .filter((row) => row.unitUrl === unit.url && row.decision.startsWith("pending_"))
      .map((row) => ({ rosterName: row.rosterName, decision: row.decision, evidenceUrl: row.evidenceUrl, reason: row.reason, atlasMatch: atlasByName.get(normalizePersonName(row.rosterName)) }));
    console.log(JSON.stringify({ rank: school.rank, institution: school.institution, unit: unit.name, unitUrl: unit.url, official: audit.officialRosterCount, decisions: audit.decisions.length, checked: audit.checkedCount, pendingCount: audit.pendingCount, explicitPending }));
  }
}
