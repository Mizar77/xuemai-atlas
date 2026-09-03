import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [
  "data/roster-decisions/oxford-cs-2026-09-02.json",
  "data/roster-decisions/eth-inf-2026-09-02.json",
  "data/roster-decisions/epfl-ic-2026-09-02.json",
];

const selectedByName = new Map([
  ["Sara Bernardini", "sara-bernardini-oxford-next"],
  ["Giuseppe De Giacomo", "giuseppe-de-giacomo-oxford-next"],
  ["Seth Flaxman", "seth-flaxman-oxford-next"],
  ["Varun Kanade", "varun-kanade-oxford-next"],
  ["Mark van der Wilk", "mark-van-der-wilk-oxford-next"],
  ["Niao He", "niao-he-eth-next"],
  ["Gunnar Rätsch", "gunnar-raetsch-eth-next"],
  ["Mrinmaya Sachan", "mrinmaya-sachan-eth-next"],
  ["Julia Vogt", "julia-vogt-eth-next"],
  ["Fanny Yang", "fanny-yang-eth-next"],
  ["Maria Brbic", "maria-brbic-epfl-next"],
  ["Charlotte Bunne", "charlotte-bunne-epfl-next"],
  ["Nicolas Flammarion", "nicolas-flammarion-epfl-next"],
  ["Caglar Gulcehre", "caglar-gulcehre-epfl-next"],
  ["Amir Zamir", "amir-zamir-epfl-next"],
]);

const ledgers = files.map((file) => ({ file, data: JSON.parse(fs.readFileSync(path.join(root, file), "utf8")) }));
const decisions = ledgers.flatMap(({ file, data }) => data.decisions.map((row) => ({
  unitId: data.unitId,
  sourceDecisionArtifact: file,
  officialId: row.officialId,
  name: row.name,
  profileUrl: row.profileUrl,
  portraitUrl: row.portraitUrl,
  title: row.title,
  section: row.section,
  sourcePageUrl: row.sourcePageUrl,
  originalDecision: row.decision,
  reviewedDecision: row.decision,
  reason: row.reason,
  evidence: row.evidence,
  reviewStatus: "reviewed",
  titleFieldVerified: Boolean(row.title && row.title.trim()),
  selectedForEnrichment: selectedByName.has(row.name),
  atlasPersonId: selectedByName.get(row.name) ?? row.atlasPersonId ?? null,
})));

const counts = decisions.reduce((acc, row) => {
  acc[row.reviewedDecision] = (acc[row.reviewedDecision] ?? 0) + 1;
  return acc;
}, {});

const output = {
  schemaVersion: 1,
  batchId: "europe-next-268-review",
  snapshotAt: "2026-09-03",
  scope: "Oxford CS + ETH D-INFK + EPFL IC; title-complete frozen official rosters only",
  sourceDecisionArtifacts: files,
  officialRosterCount: decisions.length,
  reviewedCount: decisions.length,
  titleCompleteCount: decisions.filter((row) => row.titleFieldVerified).length,
  selectedNewPiCount: decisions.filter((row) => row.selectedForEnrichment).length,
  counts,
  decisions,
};

fs.writeFileSync(
  path.join(root, "data/roster-decisions/europe-next-268-review-2026-09-03.json"),
  `${JSON.stringify(output, null, 2)}\n`,
);

console.log(JSON.stringify({ officialRosterCount: output.officialRosterCount, reviewedCount: output.reviewedCount, titleCompleteCount: output.titleCompleteCount, selectedNewPiCount: output.selectedNewPiCount, counts }, null, 2));
