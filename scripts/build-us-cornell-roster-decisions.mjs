import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const snapshotAt = "2026-09-02";
const outputDir = path.join(root, "data/roster-decisions");

const units = [
  {
    unitId: "cornell-cs",
    unitUrl: "https://www.cs.cornell.edu/directory?department=15",
    artifact: "data/official-rosters/cornell-cs-faculty-2026-09-02.json",
  },
  {
    unitId: "cornell-tech",
    unitUrl: "https://tech.cornell.edu/people/faculty/",
    artifact: "data/official-rosters/cornell-tech-faculty-2026-09-02.json",
  },
];

const aiPattern = /(artificial intelligence|machine learning|natural language|human centered natural language|vision|graphics|robotics|human.ai|human interaction|human.computer|data science|computational social|computational biology|bayesian|high-dimensional statistics|foundation model|deep learning|neural|algorithmic fairness|ai auditing)/i;
const nonPiPattern = /(emeritus|lecturer|teaching professor|professor of the practice|clinical professor|visiting|postdoc|research associate)/i;
const cornellTechAiNames = new Set([
  "Alex Conway",
  "Allison Koenecke",
  "Andrew Owens",
  "Angelina Wang",
  "Angelique Taylor",
  "Daniel D. Lee",
  "Hadar Averbuch-Elor",
  "Jae-sun Seo",
  "Max Kreminski",
  "Mert Sabuncu",
  "Mohamed Abdelfattah",
  "Mor Naaman",
  "Ramin Zabih",
  "Sasha Rush",
  "Serge Belongie",
  "Volodymyr Kuleshov",
]);
const cornellTechNonAiNames = new Set([
  "Andrea Lodi", "Anna Scaglione", "Ari Juels", "Deborah Estrin", "Elena Belavina",
  "Frank Pasquale", "Gautam Ahuja", "Greg Morrisett", "Helen Nissenbaum", "Huseyin Topaloglu",
  "James Grimmelmann", "Jose Sanchez", "Karan Girotra", "Kyra Gan", "Manoj K. Thomas",
]);

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
  for (const file of fs.readdirSync(path.join(root, "app")).filter((name) => name.endsWith(".ts"))) {
    const source = ts.createSourceFile(file, fs.readFileSync(path.join(root, "app", file), "utf8"), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isCallExpression(node) && node.arguments.length >= 2) {
        const [idArg, nameArg] = node.arguments;
        if (ts.isStringLiteralLike(idArg) && ts.isStringLiteralLike(nameArg) && /[a-z0-9]-[a-z0-9]/i.test(idArg.text)) {
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
        if (id && name) byName.set(normalizeName(name), { id, name });
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  return byName;
}

const existingByName = atlasPeople();
const deficientCanonicalIds = new Set(["bart-selman-lineage"]);
const manualCornellCsAiNames = new Set(["Bart Selman"]);

function decision(person, unit, kind, reason, evidence, atlasPersonId) {
  return {
    officialId: person.officialId,
    name: person.name,
    profileUrl: person.profileUrl ?? null,
    portraitUrl: person.portraitUrl ?? null,
    title: person.title ?? person.titles?.join(" | ") ?? null,
    researchAreas: person.researchAreas ?? [],
    sourcePageUrl: unit.unitUrl,
    decision: kind,
    reason,
    evidence,
    ...(atlasPersonId ? { atlasPersonId } : {}),
  };
}

function classifyCornellCs(person, unit) {
  const title = person.title || "";
  const research = (person.researchAreas || []).join(" | ");
  const existing = existingByName.get(normalizeName(person.name));
  if (existing && !deficientCanonicalIds.has(existing.id)) return decision(person, unit, "included_existing", "同名现任范围内 PI 已在图谱中。", person.profileUrl || unit.unitUrl, existing.id);
  if (nonPiPattern.test(title)) return decision(person, unit, /emeritus/i.test(title) ? "excluded_historical" : "excluded_non_pi", "官方职称不是当前独立研究 PI。", title);
  if (manualCornellCsAiNames.has(person.name)) return decision(person, unit, "include_new_pi", "官方个人页确认其为现任 AI 独立 PI；既有 canonical 节点不满足资料与头像基线，转入补全队列。", `${title}; ${person.profileUrl}`);
  if (!aiPattern.test(research)) return decision(person, unit, "excluded_non_ai_cs", "官方研究方向未落入本图谱 AI、ML、NLP、CV、机器人、HCI、图形学或数据科学主线。", research || title);
  if (!person.profileUrl || !person.portraitUrl) return decision(person, unit, "pending_profile_verification", "方向符合范围，但缺少可直接复核的官方个人页或头像。", research);
  return decision(person, unit, "include_new_pi", "Cornell CS 官方名录确认其当前教师身份、范围内研究方向，并提供官方个人页与头像。", `${title}; ${research}`);
}

function classifyCornellTech(person, unit) {
  const title = person.title || "";
  const existing = existingByName.get(normalizeName(person.name));
  if (existing) return decision(person, unit, "included_existing", "同名现任范围内 PI 已在图谱中。", person.profileUrl || unit.unitUrl, existing.id);
  if (nonPiPattern.test(title)) return decision(person, unit, "excluded_non_pi", "Cornell Tech 官方职称为 teaching/practice/clinical/visiting 类，而非本轮独立研究 PI。", title);
  if (cornellTechNonAiNames.has(person.name) || /Law|Management|Marketing/i.test(title)) return decision(person, unit, "excluded_non_ai_cs", "官方职称与院系归属不属于本图谱 AI/CS 研究主线。", `${title}; ${person.school || ""}`);
  if (cornellTechAiNames.has(person.name)) return decision(person, unit, "include_new_pi", "Cornell Tech 官方名录确认其当前独立教师身份；已列入本轮 AI/ML/CV/HCI/AI systems 个人页复核队列。", `${title}; ${person.profileUrl}`);
  return decision(person, unit, "pending_profile_verification", "Cornell Tech 总名录未提供研究方向；需读取个人页后才能判断是否属于 AI/CS 主线。", `${title}; ${person.profileUrl || unit.unitUrl}`);
}

fs.mkdirSync(outputDir, { recursive: true });
const summary = { schemaVersion: 1, snapshotAt, scope: "Cornell CS and Cornell Tech", units: {}, totals: {} };
const totals = {};

for (const unit of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, unit.artifact), "utf8"));
  const decisions = artifact.people.map((person) => unit.unitId === "cornell-cs" ? classifyCornellCs(person, unit) : classifyCornellTech(person, unit));
  if (decisions.length !== artifact.officialRosterCount) throw new Error(`${unit.unitId}: ${decisions.length} != ${artifact.officialRosterCount}`);
  if (new Set(decisions.map((row) => row.officialId)).size !== decisions.length) throw new Error(`${unit.unitId}: duplicate officialId`);
  const counts = {};
  for (const row of decisions) {
    counts[row.decision] = (counts[row.decision] || 0) + 1;
    totals[row.decision] = (totals[row.decision] || 0) + 1;
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
if (summary.totals.officialRosterCount !== summary.totals.decisionCount) throw new Error("Cornell totals do not balance");
fs.writeFileSync(path.join(outputDir, "us-cornell-summary-2026-09-02.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
