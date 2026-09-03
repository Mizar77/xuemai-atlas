import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const snapshotAt = "2026-09-03";
const outputFile = "data/roster-decisions/europe-frozen-tail-240-decisions-2026-09-03.json";

const units = [
  { unitId: "tum-cit", expected: 160, prior: "data/roster-decisions/tum-cit-2026-09-02.json", roster: "data/official-rosters/tum-cit-all-professors-2026-09-02.json" },
  { unitId: "ucl-cs", expected: 34, prior: "data/roster-decisions/ucl-cs-2026-09-02.json", roster: "data/official-rosters/ucl-computer-science-all-profiles-2026-09-02.json" },
  { unitId: "aalto-cs", expected: 28, prior: "data/roster-decisions/aalto-cs-2026-09-02.json", roster: "data/official-rosters/aalto-computer-science-faculty-2026-09-02.json" },
  { unitId: "surrey-pai", expected: 8, prior: "data/roster-decisions/surrey-pai-2026-09-02.json", roster: "data/official-rosters/surrey-people-centred-ai-2026-09-02.json" },
  { unitId: "tu-darmstadt-cs", expected: 5, prior: "data/roster-decisions/tu-darmstadt-cs-2026-09-02.json", roster: "data/official-rosters/tu-darmstadt-cs-professors-group-leaders-2026-09-02.json" },
  { unitId: "edinburgh-informatics", expected: 4, prior: "data/roster-decisions/edinburgh-informatics-2026-09-02.json", roster: "data/official-rosters/edinburgh-informatics-academic-staff-2026-09-02.json" },
  { unitId: "tuebingen-cs", expected: 1, prior: "data/roster-decisions/tuebingen-cs-2026-09-02.json", roster: "data/official-rosters/tuebingen-cs-research-groups-2026-09-02.json" },
];

const selectedNames = new Map([
  ["Angela Dai", "angela-dai-tum-tail"],
  ["Stefan Bauer", "stefan-bauer-tum-tail"],
  ["Niki Kilbertus", "niki-kilbertus-tum-tail"],
  ["Daniel Rückert", "daniel-rueckert-tum-tail"],
  ["Julia Schnabel", "julia-schnabel-tum-tail"],
  ["Debarghya Ghoshdastidar", "debarghya-ghoshdastidar-tum-tail"],
  ["Stephan Günnemann", "stephan-guennemann-tum-tail"],
  ["Matthias Nießner", "matthias-niessner-tum-tail"],
  ["Nils Thürey", "nils-thuerey-tum-tail"],
  ["Heikki Mannila", "heikki-mannila-aalto-tail"],
  ["Ilkka Niemelä", "ilkka-niemela-aalto-tail"],
  ["Prof. Dr. Peter Gehler (coopted)", "peter-gehler-tuebingen-tail"],
]);

function normalizeName(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(?:prof|dr|phd|univ)\b\.?/gi, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .toLowerCase()
    .trim();
}

async function canonicalPeople() {
  const result = await build({
    stdin: {
      contents: 'import { people } from "./app/data.ts"; export { people };',
      resolveDir: root,
      sourcefile: "europe-tail-canonical-entry.ts",
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
  return new Map(people.map((person) => [normalizeName(person.name), { id: person.id, name: person.name }]));
}

const existingByName = await canonicalPeople();
const tumEvidenceArtifact = "data/official-rosters/tum-cit-ai-cs-supplemental-evidence-2026-09-03.json";
const tumEvidence = JSON.parse(fs.readFileSync(path.join(root, tumEvidenceArtifact), "utf8"));
const tumCsNames = new Set(tumEvidence.computerScienceProfessorRosterMatches.map(normalizeName));
const chairEntries = tumEvidence.chairs;
const chairByName = new Map(chairEntries.map((entry) => [normalizeName(entry.professor), entry]));

const tumAliases = new Map([
  [normalizeName("Amr Abdelhafez"), { chairTitle: "Cyber Physical Systems", professor: "Amr Abdelhafez Alanwar", href: "https://www.ce.cit.tum.de/en/cps/home/" }],
  [normalizeName("Zeynep Akata-Schulz"), { chairTitle: "Interpretable and Reliable Machine Learning", professor: "Zeynep Akata-Schulz", href: "https://www.eml-munich.de/" }],
  [normalizeName("Alin Olimpiu Albu-Schäffer"), { chairTitle: "Sensor-based Robotic Systems and Intelligent Assistance Systems", professor: "Alin Albu-Schäffer", href: "https://www.ce.cit.tum.de/en/rsi/" }],
  [normalizeName("Seyed Jalal Etesami"), { chairTitle: "Decision Analytics", professor: "Jalal Etesami", href: "https://www.cs.cit.tum.de/en/dss" }],
  [normalizeName("Hans Michael Gerndt"), { chairTitle: "Architecture of Parallel and Distributed Systems", professor: "Michael Gerndt", href: "https://www.cs.cit.tum.de/sccs/" }],
  [normalizeName("Riccardo Marin"), { chairTitle: "3D Shape Analysis and Geometric Deep Learning", professor: "Riccardo Marin", href: "https://cvg.cit.tum.de/members/mricc" }],
  [normalizeName("Angela Schöllig"), { chairTitle: "Safety, Performance and Reliability for Learning Systems", professor: "Angela Schöllig", href: "https://portal.fis.tum.de/en/persons/angela-sch%C3%B6llig/" }],
  [normalizeName("V. Spors"), { chairTitle: "Human-Centered Digital Design", professor: "Velvet Spors", href: "https://www.cs.cit.tum.de/" }],
  [normalizeName("Suvrit Sra"), { chairTitle: "Resource Aware Machine Learning", professor: "Suvrit Sra", href: "https://mcml.ai/research/groups/sra/" }],
  [normalizeName("Nils Thürey"), { chairTitle: "Physics-based Simulation and Deep Learning", professor: "Nils Thürey", href: "https://www.cs.cit.tum.de/en/cg/people/thuerey/" }],
  [normalizeName("Eva Weig"), { chairTitle: "Nano and Quantum Sensors", professor: "Eva Maria Weig", href: "https://www.ee.cit.tum.de/en/nan/home/" }],
  [normalizeName("Michael Marc Wolf"), { chairTitle: "Quantum Information Theory", professor: "Michael Marc Wolf", href: "https://www.math.cit.tum.de/en/math/research/groups/quantum-information-theory/" }],
]);

const citRelevant = /(artificial intelligence|machine learning|deep learning|data analytics|data science|decision analytics|decision science|computer vision|machine vision|visual computing|computer graphics|visualization|robot|cognitive systems|human.centered|human.computer|augmented reality|bioinformatics|computational molecular|computational imaging|medical procedures|information processing|signal processing|cyber physical|intelligent|resource aware|geometry|shape analysis|quantum information)/i;

function baseRow(unit, row, decision, reason, evidence, evidenceUrl, atlasPersonId) {
  return {
    unitId: unit.unitId,
    unitUrl: unit.unitUrl,
    rosterName: row.name,
    officialId: row.officialId,
    profileUrl: row.profileUrl ?? null,
    portraitUrl: row.portraitUrl ?? null,
    title: row.title ?? null,
    section: row.section ?? null,
    priorDecision: row.decision,
    decision,
    reason,
    evidence,
    evidenceUrl,
    ...(atlasPersonId ? { atlasPersonId } : {}),
  };
}

function includeOrQueue(unit, row, reason, evidence, evidenceUrl) {
  const selectedId = selectedNames.get(row.name);
  if (selectedId) return baseRow(unit, row, "include_new_pi", `${reason} 本批选入独立扩展模块。`, evidence, evidenceUrl, selectedId);
  const existing = existingByName.get(normalizeName(row.name));
  if (existing) return baseRow(unit, row, "included_existing", `${reason} 同名现任 PI 已在图谱。`, evidence, evidenceUrl, existing.id);
  return baseRow(unit, row, "eligible_future_batch", `${reason} 已完成名录范围判断，进入后续资料与关系补全队列。`, evidence, evidenceUrl);
}

function classifyTum(unit, row) {
  const normalized = normalizeName(row.name);
  const inCs = tumCsNames.has(normalized);
  const chair = chairByName.get(normalized) ?? tumAliases.get(normalized);
  if (inCs) {
    return includeOrQueue(unit, row, "TUM Department of Computer Science 官方教授页确认其为现任独立教授。", chair?.chairTitle ?? "Department of Computer Science professor", "https://www.cs.cit.tum.de/cs/personen/professuren/");
  }
  if (chair && citRelevant.test(chair.chairTitle)) {
    return includeOrQueue(unit, row, "TUM CIT 官方 Chairs & Professorships 页面确认其现任独立席位且方向属于 AI/CS 相邻主线。", chair.chairTitle, chair.href ?? "https://www.cit.tum.de/en/cit/school/organization/chairs-professorships/");
  }
  return baseRow(unit, row, "excluded_non_ai_cs", "TUM CIT 总名录确认教授身份，但当前院系/研究席位不属于本图谱 AI、CS、CV、NLP、ML、机器人、HCI 或相关计算主线。", chair?.chairTitle ?? row.title ?? "CIT professor; no in-scope chair match", chair?.href ?? "https://www.cit.tum.de/en/cit/school/organization/chairs-professorships/");
}

const uclEvidence = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions/ucl-profile-evidence-2026-09-02.json"), "utf8")).profiles;

function classify(unit, row) {
  if (unit.unitId === "tum-cit") return classifyTum(unit, row);
  if (unit.unitId === "ucl-cs") {
    const profile = uclEvidence[String(row.officialId)];
    const evidence = [profile?.title, ...(profile?.positions ?? []).map((item) => item.position)].filter(Boolean).join("; ") || "No current faculty appointment in the official profile API";
    return baseRow(unit, row, "excluded_non_pi", "UCL 官方 profile API 未显示现任独立 faculty/PI 任职；该尾项不能仅凭进入院系 A–Z 索引而纳入。", evidence, profile?.profileApiUrl ?? row.profileUrl);
  }
  if (unit.unitId === "aalto-cs") {
    return includeOrQueue(unit, row, "Aalto Department of Computer Science 官方 Professors 分组确认其为现任独立教授；本轮采用已扩展的 AI/CS 范围。", "Department of Computer Science — Professors", row.profileUrl);
  }
  if (unit.unitId === "surrey-pai") {
    const decisions = {
      "Elizabeth (Eli) James": ["excluded_non_pi", "官方个人页职位为 Founder / Director Strategy and Operations，不是独立学术 PI。", "Founder; Director Strategy and Operations"],
      "Mikolaj Firlej": ["eligible_future_batch", "Surrey 官方 PAI 页确认其为 Lecturer in AI and Regulation，属于现任独立 faculty。", "Lecturer in AI and Regulation"],
      "Tao Chen": ["excluded_non_pi", "官方个人页职位为 Postgraduate Research Student。", "Postgraduate Research Student"],
      "Payel Das": ["excluded_non_ai_cs", "官方个人页显示 UKRI Future Leaders Fellow，但研究主线为 astrophysics，不属于本图谱范围。", "UKRI Future Leaders Fellow; Astrophysics"],
      "Fatemeh Nazarieh": ["excluded_non_pi", "官方个人页职位为 Postgraduate Research Student。", "Postgraduate Research Student"],
      "Sophie Rocks": ["excluded_non_pi", "官方个人页职位为 Research Fellow，未显示独立 faculty/PI 席位。", "Research Fellow"],
      "Anna-Stiina Wallinheimo": ["excluded_non_pi", "官方个人页职位为 Visiting Research Fellow，未显示现任独立 faculty/PI 席位。", "Visiting Research Fellow"],
      "Wenderson de Lima": ["excluded_non_pi", "官方个人页职位为 British Academy Research Fellow，未显示现任独立 faculty/PI 席位。", "British Academy Research Fellow"],
    };
    const [decision, reason, evidence] = decisions[row.name];
    return baseRow(unit, row, decision, reason, evidence, row.profileUrl);
  }
  if (unit.unitId === "tu-darmstadt-cs") {
    return baseRow(unit, row, "excluded_non_pi", "官方院系名录将此人列于 Privatdozent*innen；该称号本身不证明当前独立教授/招生 PI 席位。", "Privatdozent*innen", row.profileUrl);
  }
  if (unit.unitId === "edinburgh-informatics") {
    if (row.name === "Helen Hastie") return includeOrQueue(unit, row, "Edinburgh Informatics 官方 Academic Staff 名录标注 Head of School，属于现任独立学术领导职位。", row.title, row.profileUrl);
    if (row.name === "Michael Herrmann") return includeOrQueue(unit, row, "Edinburgh Informatics 官方 Academic Staff 名录标注 Lectureship in Robotics，属于现任独立 faculty。", row.title, row.profileUrl);
    return baseRow(unit, row, "excluded_non_pi", "官方职称为 University Teacher，未显示现任独立研究 PI 席位。", row.title, row.profileUrl);
  }
  if (unit.unitId === "tuebingen-cs") {
    return includeOrQueue(unit, row, "Tübingen Computer Science 官方 Research Groups 名录将 Peter Gehler 列为 coopted research-group professor，研究方向属于计算机视觉与机器学习。", "Coopted research-group professor", row.profileUrl);
  }
  throw new Error(`Unknown unit ${unit.unitId}`);
}

const decisions = [];
const unitSummary = {};
for (const unit of units) {
  const prior = JSON.parse(fs.readFileSync(path.join(root, unit.prior), "utf8"));
  const roster = JSON.parse(fs.readFileSync(path.join(root, unit.roster), "utf8"));
  unit.unitUrl = roster.officialPageUrl;
  const pending = prior.decisions.filter((row) => row.decision === "pending_profile_verification");
  if (pending.length !== unit.expected) throw new Error(`${unit.unitId}: expected ${unit.expected} pending rows, found ${pending.length}`);
  const reviewed = pending.map((row) => classify(unit, row));
  const counts = {};
  for (const row of reviewed) counts[row.decision] = (counts[row.decision] ?? 0) + 1;
  unitSummary[unit.unitId] = {
    unitUrl: unit.unitUrl,
    rosterArtifact: unit.roster,
    priorDecisionArtifact: unit.prior,
    pendingBefore: pending.length,
    newDecisionCount: reviewed.length,
    counts,
  };
  decisions.push(...reviewed);
}

const keys = decisions.map((row) => `${row.unitUrl}\u0000${normalizeName(row.rosterName)}`);
if (decisions.length !== 240) throw new Error(`Expected 240 decisions, found ${decisions.length}`);
if (new Set(keys).size !== decisions.length) throw new Error("Duplicate rosterName + unitUrl in incremental decision artifact");
if (decisions.some((row) => row.priorDecision !== "pending_profile_verification")) throw new Error("Incremental artifact contains a previously-final decision");
if (decisions.some((row) => row.decision.startsWith("pending"))) throw new Error("Frozen European tail still contains pending decisions");
if (decisions.filter((row) => row.decision === "include_new_pi").length !== selectedNames.size) throw new Error("Selected include_new_pi count mismatch");

const counts = {};
for (const row of decisions) counts[row.decision] = (counts[row.decision] ?? 0) + 1;
const output = {
  schemaVersion: 1,
  batchId: "europe-frozen-tail-240",
  snapshotAt,
  scope: "Incremental review of all 240 previously pending frozen European roster rows; no prior decision artifact is overwritten",
  sourceDecisionArtifacts: units.map((unit) => unit.prior),
  supplementalOfficialEvidence: [
    tumEvidenceArtifact,
    "data/roster-decisions/ucl-profile-evidence-2026-09-02.json",
  ],
  newDecisionCount: decisions.length,
  selectedNewPiCount: selectedNames.size,
  counts,
  units: unitSummary,
  decisions,
};

fs.writeFileSync(path.join(root, outputFile), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, newDecisionCount: output.newDecisionCount, selectedNewPiCount: output.selectedNewPiCount, counts, units: unitSummary }, null, 2));
