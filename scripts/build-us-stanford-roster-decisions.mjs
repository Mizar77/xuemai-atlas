import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const snapshotAt = "2026-09-02";
const outputDir = path.join(root, "data/roster-decisions");

const units = [
  {
    unitId: "stanford-cs",
    unitUrl: "https://www.cs.stanford.edu/people/faculty",
    artifact: "data/official-rosters/stanford-cs-faculty-2026-09-02.json",
  },
  {
    unitId: "stanford-ee",
    unitUrl: "https://ee.stanford.edu/people/faculty",
    artifact: "data/official-rosters/stanford-ee-all-faculty-2026-09-02.json",
  },
  {
    unitId: "stanford-sail",
    unitUrl: "https://ai.stanford.edu/faculty/",
    artifact: "data/official-rosters/stanford-sail-faculty-2026-09-02.json",
  },
];

const nonPiPattern = /(adjunct|lecturer|teaching professor|professor of the practice|visiting|instructor|research staff|postdoc)/i;
const historicalPattern = /(emeritus|emerita|former|retired|deceased)/i;
const eeAiPattern = /(AI, machine learning, optimization|Computational Sensing, Imaging, and Display|Control, robotics, and autonomous systems|Biomedical imaging|signal processing|computer architecture)/i;
const sailCurrentNames = new Set(
  JSON.parse(fs.readFileSync(path.join(root, "data/official-rosters/stanford-sail-faculty-2026-09-02.json"), "utf8"))
    .people.filter((person) => !/Former|Emeritus/i.test(person.officialSection || ""))
    .map((person) => person.name),
);

function normalizeName(value) {
  let name = value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/\([^)]*\)/g, " ").trim();
  if (name.includes(",")) {
    const [last, ...rest] = name.split(",");
    name = `${rest.join(" ")} ${last}`;
  }
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function atlasPeople() {
  const byName = new Map();
  const validAtlasId = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(value);
  for (const file of fs.readdirSync(path.join(root, "app")).filter((name) => name.endsWith(".ts"))) {
    const source = ts.createSourceFile(file, fs.readFileSync(path.join(root, "app", file), "utf8"), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isCallExpression(node) && node.arguments.length >= 2) {
        const [idArg, nameArg] = node.arguments;
        if (ts.isStringLiteralLike(idArg) && ts.isStringLiteralLike(nameArg) && validAtlasId(idArg.text)) {
          byName.set(normalizeName(nameArg.text), { id: idArg.text, name: nameArg.text });
        }
      }
      if (ts.isObjectLiteralExpression(node)) {
        let id;
        let name;
        for (const property of node.properties) {
          if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) continue;
          if (property.name.text === "id" && ts.isStringLiteralLike(property.initializer)) id = property.initializer.text;
          if (property.name.text === "name" && ts.isStringLiteralLike(property.initializer)) name = property.initializer.text;
        }
        if (id && name && validAtlasId(id)) byName.set(normalizeName(name), { id, name });
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  return byName;
}

const existingByName = atlasPeople();
const existingAliasByName = new Map([
  ["chris manning", { id: "christopher-manning-us", name: "Christopher Manning" }],
  ["chris potts", { id: "christopher-potts-us", name: "Christopher Potts" }],
  ["sanmi koyejo", { id: "sanmi-koyejo-award", name: "Sanmi Koyejo" }],
  ["ludwig schmidt", { id: "ludwig-schmidt-uw-award", name: "Ludwig Schmidt" }],
]);
const existingPerson = (name) => existingByName.get(name) || existingAliasByName.get(name);
const baselineRepairNeeded = new Map([
  ["maneesh agrawala", "现有 lineage 节点资料与头像未达到当前人物基线；先作为待升级 PI 接入，避免误报 included_existing。"],
  ["jure leskovec", "现有 lineage 节点资料与头像未达到当前人物基线；先作为待升级 PI 接入，避免误报 included_existing。"],
  ["carlos guestrin", "现有 lineage 节点资料与头像未达到当前人物基线；先作为待升级 PI 接入，避免误报 included_existing。"],
]);

function repairDecision(person, unit, name, evidence) {
  if (!baselineRepairNeeded.has(name)) return null;
  return row(person, unit, "include_new_pi", baselineRepairNeeded.get(name), evidence || person.profileUrl || unit.unitUrl);
}

// SAIL's affiliated-faculty page is broader than the atlas's current independent-PI scope.
// These explicit exceptions are backed by the linked first-party profiles and keep the
// frozen roster decision reproducible rather than silently dropping the official record.
const sailIndustryOnly = new Map([
  ["daphne koller", "insitro 官方履历确认其为 Founder & CEO，并仅保留 Stanford adjunct faculty 身份。"],
  ["juan carlos niebles", "本人主页确认其现任 Samsung Research America VP Research / North America AI Center 负责人，Stanford 为 adjunct 身份。"],
  ["silvio savarese", "Salesforce 官方履历确认其现任 EVP & Chief Scientist，Stanford 为 adjunct faculty。"],
  ["vijay pande", "a16z 官方履历确认其现任 Bio + Health 投资负责人，Stanford 为离开全职教职后的 affiliated 身份。"],
  ["sebastian thrun", "Stanford 机器人主页与当前公开履历将其定位为前 Stanford 教授及创业者；SAIL affiliated 记录不等同于当前独立 PI。"],
]);
const sailIndustryEvidence = new Map([
  ["daphne koller", "https://www.insitro.com/leadership/daphne-koller/"],
  ["juan carlos niebles", "https://www.niebles.net/"],
  ["silvio savarese", "https://www.salesforce.com/ai-research/leadership/"],
  ["vijay pande", "https://a16z.com/when-software-eats-bio/"],
  ["sebastian thrun", "http://robots.stanford.edu/"],
]);
const sailNonPi = new Map([
  ["chris piech", "Stanford 公开履历为 Associate Professor of Computer Science Education / Teaching；不按研究型独立 PI 纳入。"],
  ["andrew ng", "Stanford Profiles 将其列为 Adjunct Professor；保留在关系图作为学术—产业节点，但不计当前独立 PI。"],
]);
const sailNonAiCs = new Map([
  ["rob reich", "Stanford 公共政策与政治学教授；SAIL affiliated 记录不等同于 AI/CS 独立 PI 主线。"],
]);

function row(person, unit, decision, reason, evidence, atlasPersonId) {
  return {
    officialId: person.officialId,
    name: person.name,
    profileUrl: person.profileUrl ?? null,
    portraitUrl: person.portraitUrl ?? null,
    title: person.title ?? null,
    areas: person.areas ?? (person.researchArea ? [person.researchArea] : []),
    officialSection: person.officialSection ?? null,
    sourcePageUrl: unit.unitUrl,
    decision,
    reason,
    evidence,
    ...(atlasPersonId ? { atlasPersonId } : {}),
  };
}

function existingDecision(person, unit, existing) {
  return row(person, unit, "included_existing", "同名范围内 PI 已在图谱中；本 unit 仍保留一条 officialId 级判断。", person.profileUrl || unit.unitUrl, existing.id);
}

function classifyCs(person, unit, seen) {
  const name = normalizeName(person.name);
  const title = person.title || "";
  const existing = existingPerson(name);
  if (historicalPattern.test(title)) return row(person, unit, "excluded_historical", "官方职称为 emeritus/retired 类，不是当前 PI。", title);
  if (nonPiPattern.test(title)) return row(person, unit, "excluded_non_pi", "官方职称为 adjunct、teaching、practice、visiting 或其他非独立研究 PI 类。", title);
  seen.set(name, unit.unitId);
  const repair = repairDecision(person, unit, name, `${title}; ${person.profileUrl}`);
  if (repair) return repair;
  if (existing) return existingDecision(person, unit, existing);
  if (sailCurrentNames.has(person.name)) return row(person, unit, "include_new_pi", "Stanford CS 当前教师名录与 SAIL 当前 Faculty/Affiliated Faculty 名录共同确认其范围内 AI PI 身份。", `${title}; SAIL current roster`);
  return row(person, unit, "pending_profile_verification", "Stanford CS 总名录未提供研究方向；需读取个人页后才能判断是否属于 AI/CS 主线。", `${title}; ${person.profileUrl}`);
}

function classifyEe(person, unit, seen) {
  const name = normalizeName(person.name);
  const title = person.title || "";
  const areas = (person.areas || []).join(" | ");
  const existing = existingPerson(name);
  const previous = seen.get(name);
  if (previous) return row(person, unit, "excluded_duplicate", `同一人物已在本批次 ${previous} unit 逐人处理；本 EE officialId 保留重复判断。`, `${title}; ${areas}`, existing?.id);
  seen.set(name, unit.unitId);
  if (historicalPattern.test(title)) return row(person, unit, "excluded_historical", "官方职称为 emeritus/retired 类，不是当前 PI。", title);
  if (/Courtesy/i.test(title) || nonPiPattern.test(title)) return row(person, unit, "excluded_non_pi", "Stanford EE 官方职称为 courtesy/adjunct/teaching/practice 等非本单位核心独立 PI 类。", title);
  const repair = repairDecision(person, unit, name, `${title}; ${areas}`);
  if (repair) return repair;
  if (existing) return existingDecision(person, unit, existing);
  if (sailCurrentNames.has(person.name) || eeAiPattern.test(areas)) return row(person, unit, "include_new_pi", "Stanford EE 官方名录确认当前独立教师身份，研究 area 属于 AI/ML/优化、计算成像、信号处理、计算架构或机器人主线。", `${title}; ${areas}`);
  if (!areas) return row(person, unit, "pending_profile_verification", "官方 EE 名录未给研究 area，需读取个人页后确认范围。", `${title}; ${person.profileUrl}`);
  return row(person, unit, "excluded_non_ai_cs", "Stanford EE 官方研究 area 未落入本图谱 AI/ML/CV/机器人/计算成像/智能系统范围。", areas);
}

function classifySail(person, unit, seen) {
  const name = normalizeName(person.name);
  const section = person.officialSection || "";
  const existing = existingPerson(name);
  const previous = seen.get(name);
  if (/Former|Emeritus/i.test(section)) return row(person, unit, "excluded_historical", "SAIL 官方栏目为 Former & Emeritus Faculty。", section, existing?.id);
  if (previous) return row(person, unit, "excluded_duplicate", `同一人物已在本批次 ${previous} unit 逐人处理；本 SAIL officialId 保留重复判断。`, `${section}; ${person.researchArea || ""}`, existing?.id);
  seen.set(name, unit.unitId);
  const repair = repairDecision(person, unit, name, `${section}; ${person.researchArea || person.profileUrl}`);
  if (repair) return repair;
  if (sailIndustryOnly.has(name)) return row(person, unit, "excluded_industry_only", sailIndustryOnly.get(name), sailIndustryEvidence.get(name));
  if (sailNonPi.has(name)) return row(person, unit, "excluded_non_pi", sailNonPi.get(name), person.profileUrl || unit.unitUrl);
  if (sailNonAiCs.has(name)) return row(person, unit, "excluded_non_ai_cs", sailNonAiCs.get(name), person.profileUrl || unit.unitUrl);
  if (existing) return existingDecision(person, unit, existing);
  return row(person, unit, "include_new_pi", "SAIL 官方当前 Faculty/Affiliated Faculty 名录直接确认其为范围内 AI PI。", `${section}; ${person.researchArea || person.profileUrl}`);
}

fs.mkdirSync(outputDir, { recursive: true });
const seen = new Map();
const summary = { schemaVersion: 1, snapshotAt, scope: "Stanford CS, Stanford EE and Stanford AI Lab", units: {}, totals: {} };
const totals = {};

for (const unit of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, unit.artifact), "utf8"));
  const decisions = artifact.people.map((person) => unit.unitId === "stanford-cs"
    ? classifyCs(person, unit, seen)
    : unit.unitId === "stanford-ee"
      ? classifyEe(person, unit, seen)
      : classifySail(person, unit, seen));
  if (decisions.length !== artifact.officialRosterCount) throw new Error(`${unit.unitId}: ${decisions.length} != ${artifact.officialRosterCount}`);
  if (new Set(decisions.map((decision) => decision.officialId)).size !== decisions.length) throw new Error(`${unit.unitId}: duplicate officialId`);
  const counts = {};
  for (const decision of decisions) {
    counts[decision.decision] = (counts[decision.decision] || 0) + 1;
    totals[decision.decision] = (totals[decision.decision] || 0) + 1;
  }
  const outputPath = path.join(outputDir, `${unit.unitId}-2026-09-02.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify({ schemaVersion: 1, unitId: unit.unitId, unitUrl: unit.unitUrl, snapshotAt, rosterArtifact: unit.artifact, officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, decisions }, null, 2)}\n`);
  summary.units[unit.unitId] = { officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, outputPath: path.relative(root, outputPath) };
}

summary.totals = {
  officialRosterCount: Object.values(summary.units).reduce((sum, unit) => sum + unit.officialRosterCount, 0),
  decisionCount: Object.values(summary.units).reduce((sum, unit) => sum + unit.decisionCount, 0),
  counts: totals,
};
if (summary.totals.officialRosterCount !== summary.totals.decisionCount) throw new Error("Stanford totals do not balance");
fs.writeFileSync(path.join(outputDir, "us-stanford-summary-2026-09-02.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
