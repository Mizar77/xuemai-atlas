import { rosterUnitAudit, topSchoolRosterUnitSnapshots } from "../app/top-school-roster-ledger";
import { topSchoolRosterScope } from "../app/top-school-roster-scope";

const metadata = new Map(
  topSchoolRosterScope.flatMap((school) =>
      school.units.map((unit) => [
        unit.url,
        {
          region: school.region,
          institution: school.institution,
          unit: unit.name,
        },
      ] as const),
  ),
);

const rows = topSchoolRosterUnitSnapshots
  .map((snapshot) => rosterUnitAudit(snapshot.unitUrl))
  .map((entry) => ({
    ...metadata.get(entry.unitUrl),
    unitUrl: entry.unitUrl,
    official: entry.officialRosterCount,
    checked: entry.checkedCount,
    included: entry.includedCount,
    excluded: entry.excludedCount,
    pending: entry.pendingCount,
    gap: Math.max(0, (entry.officialRosterCount ?? 0) - entry.checkedCount),
  }))
  .filter((entry) => entry.gap > 0)
  .sort((left, right) => right.gap - left.gap);

console.log(JSON.stringify(rows, null, 2));
