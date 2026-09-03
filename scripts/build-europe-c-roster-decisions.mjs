import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const snapshotAt = "2026-09-02";
const outputDir = path.join(root, "data/roster-decisions");

const units = [
  ["tum-cit", "data/official-rosters/tum-cit-all-professors-2026-09-02.json"],
  ["epfl-ic", "data/official-rosters/epfl-ic-all-faculty-2026-09-02.json"],
  ["eth-inf", "data/official-rosters/eth-inf-all-faculty-2026-09-02.json"],
  ["edinburgh-informatics", "data/official-rosters/edinburgh-informatics-academic-staff-2026-09-02.json"],
  ["cambridge-cst", "data/official-rosters/cambridge-cst-faculty-2026-09-02.json"],
  ["oxford-cs", "data/official-rosters/oxford-cs-faculty-2026-09-02.json"],
  ["ucl-cs", "data/official-rosters/ucl-computer-science-all-profiles-2026-09-02.json"],
  ["lmu-informatics", "data/official-rosters/lmu-informatics-professors-2026-09-02.json"],
  ["tuwien-informatics", "data/official-rosters/tuwien-informatics-professors-2026-09-02.json"],
  ["imperial-computing", "data/official-rosters/imperial-computing-academic-staff-2026-09-02.json"],
];

const allowedDecisions = new Set([
  "included_existing",
  "include_new_pi",
  "excluded_non_ai_cs",
  "excluded_non_pi",
  "excluded_historical",
  "excluded_industry_only",
  "excluded_duplicate",
  "pending_profile_verification",
]);

function normalizeName(value) {
  let name = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u200b|\u200c|\u200d|\ufeff/g, "")
    .replace(/\([^)]*\bemeritus\b[^)]*\)/gi, " ")
    .replace(/\b(?:prof(?:essor)?|dr|mr|ms|mrs|sir|dame)\b\.?/gi, " ")
    .replace(/[†*]/g, " ")
    .trim();
  if (name.includes(",")) {
    const [last, ...rest] = name.split(",");
    name = `${rest.join(" ")} ${last}`;
  }
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function atlasPeople() {
  const byName = new Map();
  const appDir = path.join(root, "app");
  for (const file of fs.readdirSync(appDir).filter(
    (name) => name.endsWith(".ts") && name !== "europe-c-tuwien-roster-pi-expansion-1.ts",
  )) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(path.join(appDir, file), "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    function visit(node) {
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

function baseRow(person, artifact) {
  return {
    officialId: person.officialId,
    name: person.name,
    profileUrl: person.profileUrl || null,
    portraitUrl: person.portraitUrl || null,
    title: person.title || null,
    section:
      person.officialSection ||
      (person.officialSections || []).join(" | ") ||
      person.section ||
      person.officialUnit ||
      person.researchUnit ||
      null,
    sourcePageUrl:
      person.sourcePageUrl ||
      person.sourceUrl ||
      artifact.officialPageUrl ||
      artifact.officialDataUrl ||
      artifact.officialDataUrls?.[0] ||
      null,
  };
}

function result(base, decision, reason, evidence, extra = {}) {
  if (!allowedDecisions.has(decision)) throw new Error(`Invalid decision ${decision}`);
  return {
    ...base,
    decision,
    reason,
    evidence: String(evidence || base.sourcePageUrl || base.officialId).slice(0, 1000),
    ...extra,
  };
}

function existingFor(person) {
  return existingByName.get(normalizeName(person.name));
}

function activeDecision(base, person, reason) {
  const existing = existingFor(person);
  if (existing) {
    return result(
      base,
      "included_existing",
      "官方院系名录确认其为现任范围内独立 PI；同名人物已在图谱中。",
      person.profileUrl || base.sourcePageUrl,
      { atlasPersonId: existing.id },
    );
  }
  return result(
    base,
    "include_new_pi",
    reason,
    person.profileUrl || [base.title, base.section].filter(Boolean).join("；") || base.sourcePageUrl,
  );
}

function classify(unitId, person, artifact) {
  const base = baseRow(person, artifact);

  if (unitId === "tum-cit") {
    const sections = (person.officialSections || []).join(" | ");
    if (/Emeriti|Retired|Honorary/i.test(sections)) {
      return result(base, "excluded_historical", "TUM 官方栏目为 honorary、emeriti 或 retired，不属于现任核心 PI。", sections);
    }
    if (/Affiliated|Adjunct/i.test(sections)) {
      return result(base, "excluded_non_pi", "TUM 官方栏目为 affiliated 或 adjunct，未作为本院系当前核心独立 PI 纳入。", sections);
    }
    const existing = existingFor(person);
    if (existing) return activeDecision(base, person, "");
    return result(
      base,
      "pending_profile_verification",
      "TUM CIT 总名录确认现任教授身份，但快照未给出其所在学科/研究方向；需读取 chair 或个人页后判断是否属于 AI/CS 主线。",
      `${sections}；${person.title || ""}`,
    );
  }

  if (unitId === "epfl-ic") {
    if (person.officialSection === "Emeritus Professors") {
      return result(base, "excluded_historical", "EPFL IC 官方栏目为 Emeritus Professors。", person.officialSection);
    }
    if (/Senior Scientists|External faculty|Courtesy|visiting/i.test(person.officialSection || "")) {
      return result(base, "excluded_non_pi", "EPFL IC 官方栏目为 senior scientist、external、courtesy 或 visiting，并非本单位核心独立 PI 席位。", person.officialSection);
    }
    return activeDecision(base, person, "EPFL IC 官方 Professors 名录确认其为现任独立 faculty；IC 院系属于计算机与通信科学范围。");
  }

  if (unitId === "eth-inf") {
    if (person.officialSection === "Emeritus Faculty") {
      return result(base, "excluded_historical", "ETH D-INFK 官方栏目为 Emeritus Faculty。", person.officialSection);
    }
    if (/Affiliated Faculty|Adjunct Professors/i.test(person.officialSection || "")) {
      return result(base, "excluded_non_pi", "ETH D-INFK 官方栏目为 affiliated 或 adjunct，未作为本系当前核心独立 PI 纳入。", person.officialSection);
    }
    return activeDecision(base, person, "ETH D-INFK 官方 Department Faculty 名录确认其为现任独立 faculty。");
  }

  if (unitId === "edinburgh-informatics") {
    const title = person.title || "";
    if (/Emeritus|Honorary|Retired/i.test(title)) {
      return result(base, "excluded_historical", "Edinburgh 官方职称为 emeritus、honorary 或 retired。", title);
    }
    if (/Tutor|Teaching Fellow|Research Fellow|Research Associate|Research Assistant|Postdoctoral|Post-doctoral/i.test(title)) {
      return result(base, "excluded_non_pi", "Edinburgh 官方职称为 tutor、teaching/research fellow 或研究辅助职位，未确认独立 PI 席位。", title);
    }
    if (/Professor|Chair|Reader|Lecturer|Chancellor.?s Fellow/i.test(title)) {
      return activeDecision(base, person, "Edinburgh School of Informatics 官方 Academic Staff 名录及职称确认其为现任独立学术人员。");
    }
    return result(base, "pending_profile_verification", "官方 Academic Staff 名录有此人，但当前职称不足以确认独立 PI/招生资格。", title || base.sourcePageUrl);
  }

  if (unitId === "cambridge-cst") {
    if (/emeritus/i.test(person.name)) {
      return result(base, "excluded_historical", "Cambridge CST 官方名录在姓名中明确标注 emeritus。", person.name);
    }
    return activeDecision(base, person, "Cambridge CST 官方 Faculty 目录确认其为现任 faculty；荣休人员已由官网显式标记并单独排除。");
  }

  if (unitId === "oxford-cs") {
    const title = person.title || "";
    if (/Emeritus|Honorary|Retired/i.test(title)) {
      return result(base, "excluded_historical", "Oxford 官方职称为 emeritus、honorary 或 retired。", title);
    }
    if (/Departmental Lecturer/i.test(title)) {
      return result(base, "excluded_non_pi", "Oxford 官方职称为 Departmental Lecturer；现有名录证据不足以确认独立 PI/招生资格。", title);
    }
    if (/Professor|Associate Professor/i.test(title)) {
      return activeDecision(base, person, "Oxford CS 官方 Faculty 页面及 Professor/Associate Professor 职称确认其为现任独立 faculty。");
    }
    return result(base, "pending_profile_verification", "Oxford Faculty 名录有此人，但职称不足以确认独立 PI 资格。", title || base.sourcePageUrl);
  }

  if (unitId === "ucl-cs") {
    const existing = existingFor(person);
    if (existing) return activeDecision(base, person, "");
    return result(
      base,
      "pending_profile_verification",
      "UCL Profiles A–Z 完整快照只提供姓名与个人页，未提供职称、现职状态和研究方向；需读取个人页后判断是否为 AI/CS 独立 PI。",
      person.profileUrl,
    );
  }

  if (unitId === "lmu-informatics") {
    if (/associated|apl\.? professor/i.test(person.officialStatus || "")) {
      return result(base, "excluded_non_pi", "LMU 官方状态为 associated/apl. professor，未作为本单位当前核心独立 PI 纳入。", `${person.officialStatus}；${person.officialUnit}`);
    }
    return activeDecision(base, person, "LMU Informatics 官方教学与研究单位名录确认其为现任 professor。");
  }

  if (unitId === "tuwien-informatics") {
    if (/Emeriti|Retired/i.test(person.officialSection || "")) {
      return result(base, "excluded_historical", "TU Wien 官方栏目为 Emeriti and Retired Professors。", person.officialSection);
    }
    return activeDecision(base, person, "TU Wien Informatics 官方 Professors 名录确认其为现任独立 professor，并提供研究单元与个人页。");
  }

  if (unitId === "imperial-computing") {
    return activeDecision(base, person, "Imperial Department of Computing 官方 All Academics 名录确认其为现任 academic；教学、研究辅助、荣休和 alumni 由官网另设目录，未混入本快照。");
  }

  throw new Error(`Unhandled unit ${unitId}`);
}

fs.mkdirSync(outputDir, { recursive: true });
const allDecisions = [];
const unitSummary = {};

for (const [unitId, rosterArtifact] of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, rosterArtifact), "utf8"));
  const people = artifact.people || [];
  const officialIds = people.map((person) => String(person.officialId));
  if (new Set(officialIds).size !== people.length) throw new Error(`${unitId}: duplicate officialId in roster artifact`);

  const decisions = people.map((person) => classify(unitId, person, artifact));
  const decisionIds = decisions.map((decision) => String(decision.officialId));
  if (new Set(decisionIds).size !== decisions.length) throw new Error(`${unitId}: duplicate officialId in decisions`);
  if (decisions.length !== people.length) throw new Error(`${unitId}: decisionCount != rosterCount`);
  for (const officialId of officialIds) {
    if (!decisionIds.includes(officialId)) throw new Error(`${unitId}: missing decision for ${officialId}`);
  }

  const counts = Object.fromEntries([...allowedDecisions].map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]));
  const output = {
    schemaVersion: 1,
    unitId,
    snapshotAt,
    rosterArtifact,
    rosterCount: people.length,
    decisionCount: decisions.length,
    counts,
    decisions,
  };
  fs.writeFileSync(path.join(outputDir, `${unitId}-2026-09-02.json`), `${JSON.stringify(output, null, 2)}\n`);
  unitSummary[unitId] = { rosterArtifact, rosterCount: people.length, decisionCount: decisions.length, counts };
  allDecisions.push(...decisions.map((decision) => ({ unitId, ...decision })));
}

const totalCounts = Object.fromEntries([...allowedDecisions].map((decision) => [decision, allDecisions.filter((row) => row.decision === decision).length]));
const summary = {
  schemaVersion: 1,
  snapshotAt,
  scope: "Europe remaining complete-roster units",
  unitCount: units.length,
  rosterCount: allDecisions.length,
  decisionCount: allDecisions.length,
  counts: totalCounts,
  units: unitSummary,
};
fs.writeFileSync(path.join(outputDir, "europe-c-summary-2026-09-02.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
