import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reviewedAt = "2026-09-03";
const outputDir = path.join(root, "data/roster-decisions");

const units = [
  {
    id: "nus-computing-next-batch",
    roster: "data/official-rosters/nus-computing-faculty-2026-09-02.json",
    unitUrl: "https://www.comp.nus.edu.sg/about/depts/cs/people/",
  },
  {
    id: "smu-scis-next-batch",
    roster: "data/official-rosters/smu-scis-full-time-faculty-2026-09-02.json",
    unitUrl: "https://computing.smu.edu.sg/faculty",
  },
];

const knownAtlasIds = new Map(Object.entries({
  "CHUA Tat Seng": "tat-seng-chua",
  "David HSU": "david-hsu-nus",
  "KAN Min-Yen": "min-yen-kan",
  "KANKANHALLI Mohan": "mohan-kankanhalli",
  "Kenji KAWAGUCHI": "kenji-kawaguchi",
  "LEE Gim Hee": "gim-hee-lee-top",
  "LIANG Zhenkai": "zhenkai-liang-nus",
  "NG Hwee Tou": "hwee-tou-ng",
  "XIAO Jiancong": "jiancong-xiao",
  "YAN Shuicheng": "shuicheng-yan-nus",
  "Yang YOU": "yang-you",
  "CAO Zhiguang": "zhiguang-cao-top",
  "DENG Yang": "yang-deng",
  "Debin GAO": "debin-gao-smu",
  "Steven HOI": "steven-hoi-smu",
  "LIAO Lizi": "lizi-liao-smu",
  "MA Yunshan": "yunshan-ma",
  "Guansong PANG": "guansong-pang",
  "ZHOU Pan": "pan-zhou-smu",
}));

const relevantPattern = /(artificial intelligence|machine learning|data science|data mining|language|vision|media|graphics|human.?computer|human.?machine|embodied|robot|decision|optimization|analytics|biomedical informatics|social analytics|trustworthiness|software engineering|security.*ai)/i;
const nonIndependentPattern = /(lecturer|educator track|education\)|practice track|practice\)|part-time|adjunct|courtesy appointment|honorary fellow|professorial fellow)/i;
const historicalPattern = /(emeritus|retired)/i;

function researchText(person) {
  return [
    ...(person.researchAreas ?? []),
    ...(person.researchAreaPaths ?? []),
  ].join("; ");
}

function classify(unit, person) {
  const title = person.title ?? "";
  const research = researchText(person);
  const base = {
    officialId: person.officialId,
    name: person.name,
    title: title || null,
    profileUrl: person.profileUrl || null,
    portraitUrl: person.photoUrl || person.portraitUrl || null,
    researchAreas: research || null,
    sourcePageUrl: unit.unitUrl,
  };

  const atlasPersonId = knownAtlasIds.get(person.name);
  if (atlasPersonId) {
    return {
      ...base,
      decision: "included_existing",
      atlasPersonId,
      reason: "姓名、单位及官方个人页与图谱现有人物一致。",
      evidence: person.profileUrl,
    };
  }
  if (historicalPattern.test(title)) {
    return {
      ...base,
      decision: "excluded_historical",
      reason: "官方名录将其标为 Emeritus/荣休角色，不作为当前独立 PI 接入。",
      evidence: title,
    };
  }
  if (nonIndependentPattern.test(title)) {
    return {
      ...base,
      decision: "excluded_non_pi",
      reason: "当前官方职称属于教学、实践、兼职、礼聘或非独立科研序列。",
      evidence: title,
    };
  }
  if (!research) {
    return {
      ...base,
      decision: "pending_profile_verification",
      reason: "官方名录未给研究领域，需进入个人页核验研究方向后才能判断是否纳入。",
      evidence: person.profileUrl,
    };
  }
  if (!relevantPattern.test(research)) {
    return {
      ...base,
      decision: "excluded_non_ai_cs",
      reason: "官方研究领域未显示属于当前图谱的 AI、NLP、CV、机器学习、机器人、数据智能或人机协作主线。",
      evidence: research,
    };
  }
  return {
    ...base,
    decision: "include_new_pi",
    reason: "官方全职名录显示教授序列职称，且研究领域落在当前 AI/CS 图谱范围。",
    evidence: `${title}; ${research}`,
  };
}

fs.mkdirSync(outputDir, { recursive: true });
const all = [];
const summaries = [];

for (const unit of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, unit.roster), "utf8"));
  const decisions = artifact.people.map((person) => classify(unit, person));
  if (decisions.length !== artifact.officialRosterCount) {
    throw new Error(`${unit.id}: expected ${artifact.officialRosterCount} rows, got ${decisions.length}`);
  }
  const counts = Object.fromEntries(
    [...new Set(decisions.map((row) => row.decision))]
      .sort()
      .map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]),
  );
  const output = {
    schemaVersion: 1,
    unitId: unit.id,
    unitUrl: unit.unitUrl,
    snapshotAt: artifact.fetchedAt,
    reviewedAt,
    rosterArtifact: unit.roster,
    officialRosterCount: artifact.officialRosterCount,
    decisionCount: decisions.length,
    decisionPolicy: "Current independent research-track faculty whose official research areas intersect the atlas AI/ML/NLP/CV/robotics/data-intelligence/HCI scope.",
    counts,
    decisions,
  };
  const outputPath = path.join(outputDir, `${unit.id}-2026-09-03.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  all.push(...decisions.map((row) => ({ unitId: unit.id, ...row })));
  summaries.push({
    unitId: unit.id,
    rosterArtifact: unit.roster,
    officialRosterCount: artifact.officialRosterCount,
    decisionCount: decisions.length,
    counts,
    outputPath: path.relative(root, outputPath),
  });
}

if (all.length !== 312) throw new Error(`Expected 312 decisions, got ${all.length}`);
const totalsByDecision = Object.fromEntries(
  [...new Set(all.map((row) => row.decision))]
    .sort()
    .map((decision) => [decision, all.filter((row) => row.decision === decision).length]),
);
const summary = {
  schemaVersion: 1,
  reviewedAt,
  scope: "NUS Computing + SMU SCIS next Asia batch",
  officialRosterTotal: all.length,
  decisionTotal: all.length,
  totalsByDecision,
  units: summaries,
  includeNewPi: all
    .filter((row) => row.decision === "include_new_pi")
    .map(({ unitId, officialId, name, title, profileUrl, portraitUrl, researchAreas }) => ({
      unitId,
      officialId,
      name,
      title,
      profileUrl,
      portraitUrl,
      researchAreas,
    })),
};
fs.writeFileSync(
  path.join(outputDir, "asia-next-batch-summary-2026-09-03.json"),
  `${JSON.stringify(summary, null, 2)}\n`,
);
console.log(JSON.stringify({ total: all.length, totalsByDecision, units: summaries }, null, 2));
