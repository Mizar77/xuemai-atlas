import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const snapshotAt = "2026-09-03";
const outputDir = path.join(root, "data/roster-decisions/us-uw-uiuc-2026-09-03");

const units = [
  {
    unitId: "uw-allen-school",
    unitUrl: "https://www.cs.washington.edu/people/faculty-members/",
    artifact: "data/official-rosters/uw-allen-school-all-faculty-2026-09-02.json",
    expectedRows: 264,
  },
  {
    unitId: "uiuc-siebel-school",
    unitUrl: "https://siebelschool.illinois.edu/about/people/all-faculty",
    artifact: "data/official-rosters/uiuc-siebel-all-faculty-2026-09-02.json",
    expectedRows: 250,
    // This exact rosterName + unitUrl decision already exists in top-school-roster-ledger.ts.
    preexistingDecisionNames: new Set(["Jiawei Han"]),
  },
];

const selectedNames = new Set([
  "Alexander Schwing",
  "Byron Boots",
  "Gagandeep Singh",
  "Han Zhao",
  "Huan Zhang",
  "Ira Kemelmacher-Shlizerman",
  "Jiaxuan You",
  "Jim Rehg",
  "Maya Cakmak",
  "Natasha Jaques",
  "Pang Wei Koh",
  "Simon Shaolei Du",
  "Steven Seitz",
  "Su-In Lee",
  "Yuxiong Wang",
]);

const teachingOrNonPiPattern = /(teaching|lecturer|instructor|clinical|research professor|research assistant professor|adjunct|affiliate|practice|visiting|postdoc|staff)/i;
const emeritusPattern = /emerit/i;
const professorPattern = /(assistant professor|associate professor|professor|chair in|faculty scholar)/i;
const aiPattern = /(artificial intelligence|machine learning|natural language|computer vision|generative ai|robot|human-centered ai|human-computer interaction|data science|data mining|information retrieval|deep learning|reinforcement learning|graphics|vision|fairness|computational biology)/i;
const clearlyOutsideScopeDepartment = /(agricultural|animal sciences|anthropology|astronomy|chemistry|civil and environmental|curriculum and instruction|economics|finance|food science|geography|journalism|kinesiology|materials science|mechanical science|music|political science|psychology|social work|sociology|urban)/i;
const industryPattern = /(adobe|amazon|apple|google|meta|microsoft|nvidia|openai|research lab|labs|corporation|inc\.?$)/i;

function normalizeName(value) {
  let name = value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/\([^)]*\)/g, " ").trim();
  if (name.includes(",")) {
    const [last, ...rest] = name.split(",");
    name = `${rest.join(" ")} ${last}`;
  }
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

async function canonicalPeople() {
  const result = await build({
    stdin: {
      contents: 'import { people } from "./app/data.ts"; export { people };',
      resolveDir: root,
      sourcefile: "uw-uiuc-canonical-entry.ts",
      loader: "ts",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
    logLevel: "silent",
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`;
  const { people } = await import(moduleUrl);
  return new Map(people.map((person) => [normalizeName(person.name), person]));
}

const existingByName = await canonicalPeople();

function commonRow(person, unit, decision, reason, evidence, atlasPersonId) {
  return {
    officialId: person.officialId,
    rosterName: person.name,
    title: person.title ?? "",
    profileUrl: person.profileUrl ?? null,
    portraitUrl: person.portraitUrl ?? null,
    officialSections: person.officialSections ?? [],
    researchFields: person.researchAreas ?? [],
    unitUrl: unit.unitUrl,
    decision,
    reason,
    evidence,
    ...(atlasPersonId ? { atlasPersonId } : {}),
  };
}

function verifiedExisting(person, institution) {
  const existing = existingByName.get(normalizeName(person.name));
  if (!existing) return null;
  const affiliation = `${existing.institution ?? ""} ${existing.actualInstitution ?? ""}`.toLowerCase();
  if (institution === "UW" && /(\buw\b|washington)/.test(affiliation)) return existing;
  if (institution === "UIUC" && /(\buiuc\b|illinois)/.test(affiliation)) return existing;
  return null;
}

function classifyUw(person, unit) {
  const sections = person.officialSections ?? [];
  const title = person.title ?? "";
  const research = (person.researchAreas ?? []).join(" | ");
  const evidence = [title, sections.join(" | "), research, person.externalAffiliation, person.affiliatedDepartment].filter(Boolean).join("; ");

  if (sections.includes("Emeritus Faculty") || emeritusPattern.test(title)) {
    return commonRow(person, unit, "excluded_historical", "UW 官方名录将其列为荣休教师；本轮现任独立 PI 名录不接入。", evidence);
  }
  if (sections.includes("Affiliate Faculty") || sections.includes("Adjunct Faculty")) {
    const external = `${person.externalAffiliation ?? ""} ${person.affiliatedDepartment ?? ""}`;
    if (industryPattern.test(external)) return commonRow(person, unit, "excluded_industry_only", "UW 官方名录为校外产业 affiliate/adjunct，并非 Allen School 现任独立 PI。", evidence);
    return commonRow(person, unit, "excluded_non_pi", "UW 官方名录为 affiliate/adjunct，不作为 Allen School 当前独立 PI 接入。", evidence);
  }
  if (teachingOrNonPiPattern.test(title) || !professorPattern.test(title)) {
    return commonRow(person, unit, "excluded_non_pi", "官方职称属于教学岗位或未显示独立研究教师任职。", evidence);
  }
  if (selectedNames.has(person.name)) {
    return commonRow(person, unit, "include_new_pi", "本批接入：UW 官方名录确认现任独立教授，且一手个人页、头像与关系证据完整。", evidence);
  }
  const existing = verifiedExisting(person, "UW");
  if (existing) return commonRow(person, unit, "included_existing", "同名、同机构的现任 PI 已在图谱。", evidence, existing.id);
  if (research && !aiPattern.test(research)) {
    return commonRow(person, unit, "excluded_non_ai_cs", "UW 官方研究方向未落入本图谱 AI、NLP、CV、ML、机器人、HCI、图形学或数据智能主线。", evidence);
  }
  return commonRow(person, unit, "pending_profile_verification", "现任独立教师，但需继续核验个人页研究主线和关系证据后再决定是否接入。", evidence || person.profileUrl);
}

function classifyUiuc(person, unit) {
  const title = person.title ?? "";
  const evidence = [title, (person.directoryClasses ?? []).join(" | "), person.profileUrl].filter(Boolean).join("; ");
  if (emeritusPattern.test(title)) return commonRow(person, unit, "excluded_historical", "UIUC 官方名录将其列为荣休教师；本轮现任独立 PI 名录不接入。", evidence);
  if (teachingOrNonPiPattern.test(title) || !professorPattern.test(title)) {
    return commonRow(person, unit, "excluded_non_pi", "官方职称属于教学、研究、兼职、附属或其他非独立 PI 岗位。", evidence);
  }
  if (selectedNames.has(person.name)) {
    return commonRow(person, unit, "include_new_pi", "本批接入：UIUC 官方名录确认现任独立教授，且一手个人页、头像与关系证据完整。", evidence);
  }
  const existing = verifiedExisting(person, "UIUC");
  if (existing) return commonRow(person, unit, "included_existing", "同名、同机构的现任 PI 已在图谱。", evidence, existing.id);
  if (clearlyOutsideScopeDepartment.test(title)) {
    return commonRow(person, unit, "excluded_non_ai_cs", "官方职称显示其主聘院系明显不在 AI/CS 相关范围，且本轮未发现相反的一手研究证据。", evidence);
  }
  return commonRow(person, unit, "pending_profile_verification", "现任独立教师，但 All Faculty 卡片不含研究方向；需继续核验个人页后再决定是否接入。", evidence);
}

fs.mkdirSync(outputDir, { recursive: true });
const summary = { schemaVersion: 1, snapshotAt, scope: "UW Allen School and UIUC Siebel School frozen-roster person decisions", dedupeKey: "rosterName+unitUrl", units: {}, totals: {} };
const totals = {};
const globalKeys = new Set();

for (const unit of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, unit.artifact), "utf8"));
  const skipped = artifact.people.filter((person) => unit.preexistingDecisionNames?.has(person.name));
  const people = artifact.people.filter((person) => !unit.preexistingDecisionNames?.has(person.name));
  const classifier = unit.unitId === "uw-allen-school" ? classifyUw : classifyUiuc;
  const decisions = people.map((person) => classifier(person, unit));
  if (decisions.length !== unit.expectedRows) throw new Error(`${unit.unitId}: ${decisions.length} != ${unit.expectedRows}`);
  for (const row of decisions) {
    const key = `${normalizeName(row.rosterName)}::${row.unitUrl}`;
    if (globalKeys.has(key)) throw new Error(`${unit.unitId}: duplicate rosterName+unitUrl ${row.rosterName}`);
    globalKeys.add(key);
  }
  const counts = {};
  for (const row of decisions) {
    counts[row.decision] = (counts[row.decision] || 0) + 1;
    totals[row.decision] = (totals[row.decision] || 0) + 1;
  }
  const outputPath = path.join(outputDir, `${unit.unitId}-2026-09-03.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify({
    schemaVersion: 1,
    unitId: unit.unitId,
    unitUrl: unit.unitUrl,
    snapshotAt,
    rosterArtifact: unit.artifact,
    frozenOfficialRosterCount: artifact.officialRosterCount,
    preexistingDecisionCount: skipped.length,
    preexistingDecisionNames: skipped.map((person) => person.name),
    newDecisionCount: decisions.length,
    counts,
    decisions,
  }, null, 2)}\n`);
  summary.units[unit.unitId] = {
    frozenOfficialRosterCount: artifact.officialRosterCount,
    preexistingDecisionCount: skipped.length,
    newDecisionCount: decisions.length,
    counts,
    outputPath: path.relative(root, outputPath),
  };
}

summary.totals = {
  frozenOfficialRosterCount: Object.values(summary.units).reduce((sum, unit) => sum + unit.frozenOfficialRosterCount, 0),
  preexistingDecisionCount: Object.values(summary.units).reduce((sum, unit) => sum + unit.preexistingDecisionCount, 0),
  newDecisionCount: Object.values(summary.units).reduce((sum, unit) => sum + unit.newDecisionCount, 0),
  counts: totals,
};
if (summary.totals.frozenOfficialRosterCount !== 515 || summary.totals.preexistingDecisionCount !== 1 || summary.totals.newDecisionCount !== 514) {
  throw new Error(`batch accounting mismatch: ${JSON.stringify(summary.totals)}`);
}
if ((totals.include_new_pi || 0) !== selectedNames.size) throw new Error(`Expected ${selectedNames.size} selected PIs, found ${totals.include_new_pi || 0}`);
fs.writeFileSync(path.join(outputDir, "summary-2026-09-03.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
