import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const snapshotAt = "2026-09-03";
const outputDir = path.join(root, "data/roster-decisions/us-canada-batch2");

const units = [
  {
    unitId: "utexas-cs",
    unitUrl: "https://www.cs.utexas.edu/people/faculty-researchers",
    artifact: "data/official-rosters/utexas-cs-faculty-researchers-2026-09-02.json",
    region: "United States",
  },
  {
    unitId: "umich-robotics",
    unitUrl: "https://robotics.umich.edu/people/faculty/",
    artifact: "data/official-rosters/umich-robotics-faculty-2026-09-02.json",
    region: "United States",
  },
  {
    unitId: "mit-csail",
    unitUrl: "https://www.csail.mit.edu/people?f%5B0%5D=role%3A298",
    artifact: "data/official-rosters/mit-csail-faculty-pi-2026-09-02.json",
    region: "United States",
  },
];

const selectedNames = new Set([
  "Adam Klivans",
  "Amy Zhang",
  "Chenfeng Xu",
  "David Harwath",
  "Elias Stengel-Eskin",
  "Georgios Pavlakos",
  "Inderjit Dhillon",
  "Joydeep Biswas",
  "Kevin Tian",
  "Matthew Lease",
  "Noah Golowich",
  "Qixing Huang",
  "Sanjay Shakkottai",
  "Sujay Sanghavi",
  "Yan Leng",
]);

const aiPattern = /(artificial intelligence|machine learning|natural language|computer vision|vision|graphics|robot|hci|human.computer|human.robot|foundation model|deep learning|reinforcement learning|generative|language model|data science|data mining|information retrieval|computational biology|computational social|privacy|fairness|optimization|theoretical foundations of ai|online learning|autonomous|perception|planning|control|haptic|wearable|multi.robot|medical robotics|embodied)/i;
const nonPiPattern = /(emeritus|lecturer|instruction|practice|visiting|postdoc|research scientist|research associate|adjunct|staff)/i;
const currentProfessorPattern = /(assistant professor|associate professor|professor|institute professor|director|chancellor|dean)/i;
const placeholderPortraitPattern = /(noprofile|placeholder|default[_-]?(?:profile|avatar)|silhouette)/i;

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
      sourcefile: "us-canada-batch2-canonical-entry.ts",
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

function commonRow(person, unit, decision, reason, evidence, atlasPersonId) {
  const title = person.title ?? person.titles?.join(" | ") ?? "";
  const research = person.researchGroups ?? person.focusAreas ?? person.researchAreas ?? [];
  return {
    officialId: person.officialId,
    name: person.name,
    title,
    profileUrl: person.profileUrl ?? null,
    portraitUrl: person.portraitUrl ?? null,
    officialSections: person.officialSections ?? [],
    researchFields: Array.isArray(research) ? research : [research],
    sourcePageUrl: unit.unitUrl,
    decision,
    reason,
    evidence,
    ...(atlasPersonId ? { atlasPersonId } : {}),
  };
}

function classifyUt(person, unit) {
  const title = person.title || "";
  const research = (person.researchGroups || []).join(" | ");
  const existing = existingByName.get(normalizeName(person.name));
  if (nonPiPattern.test(title)) {
    return commonRow(person, unit, /emeritus/i.test(title) ? "excluded_historical" : "excluded_non_pi", "官方职称属于荣休、教学、兼职、研究人员或访问类别，不计入现任独立 PI。", title);
  }
  if (!currentProfessorPattern.test(title)) {
    return commonRow(person, unit, "excluded_non_pi", "官方职称未显示独立教师任职。", title);
  }
  if (person.name === "Yizhong Wang") {
    return commonRow(person, unit, "pending_future_appointment", "官方个人页仍标注 incoming Assistant Professor；在正式到岗前不作为当前 PI 接入。", `${title}; ${person.profileUrl}`);
  }
  if (!aiPattern.test(research)) {
    return commonRow(person, unit, "excluded_non_ai_cs", "官方研究分组未落入本图谱 AI、ML、NLP、CV、机器人、HCI、图形学或相关主线。", research || title);
  }
  // Preserve the batch's original inclusion decision even after the parent later
  // wires this independent module into app/data.ts and reruns the ledger builder.
  if (selectedNames.has(person.name)) {
    return commonRow(person, unit, "include_new_pi", "本批接入：官方名录确认现任独立教师、AI 相关研究分组、个人页和有效头像。", `${title}; ${research}`);
  }
  if (existing) {
    return commonRow(person, unit, "included_existing", "同名且范围内的现任 PI 已在当前图谱。", `${title}; ${research}`, existing.id);
  }
  if (!person.profileUrl || !person.portraitUrl || placeholderPortraitPattern.test(person.portraitUrl)) {
    return commonRow(person, unit, "pending_profile_verification", "方向和职称符合，但缺少可直接复核的官方个人页或有效头像。", `${title}; ${research}`);
  }
  return commonRow(person, unit, "eligible_future_batch", "现任独立教师且研究方向符合；已完成名录判断，进入后续资料与关系补全队列。", `${title}; ${research}`);
}

function classifyUmich(person, unit) {
  const title = person.title || "";
  const research = [person.researchInterests, ...(person.focusAreas || [])].filter(Boolean).join(" | ");
  const existing = existingByName.get(normalizeName(person.name));
  if (/lecturer/i.test(title)) return commonRow(person, unit, "excluded_non_pi", "官方职称为 Lecturer，不计入现任独立研究 PI。", title);
  if (person.name === "Ankit Goyal") return commonRow(person, unit, "pending_future_appointment", "官方个人页标注 Fall 2027 入职；在正式到岗前不作为当前 PI 接入。", `${title}; ${person.profileUrl}`);
  if (!currentProfessorPattern.test(title)) return commonRow(person, unit, "excluded_non_pi", "官方职称未显示独立教师任职。", title);
  if (existing) return commonRow(person, unit, "included_existing", "同名且范围内的现任 PI 已在当前图谱。", `${title}; ${research}`, existing.id);
  if (!person.profileUrl || !person.portraitUrl || placeholderPortraitPattern.test(person.portraitUrl)) return commonRow(person, unit, "pending_profile_verification", "Robotics 方向符合，但缺少可直接复核的官方个人页或有效头像。", `${title}; ${research}`);
  return commonRow(person, unit, "eligible_future_batch", "Michigan Robotics 官方名录确认现任独立教师；已完成范围判断，进入后续资料与关系补全队列。", `${title}; ${research}`);
}

function classifyMit(person, unit) {
  const title = person.title || "";
  const research = person.summary || "";
  const existing = existingByName.get(normalizeName(person.name));
  if (/emeritus/i.test(title) || person.officialRole === "Emeritus") return commonRow(person, unit, "excluded_historical", "MIT CSAIL 官方角色为 Emeritus，不计入现任 PI。", `${title}; ${person.officialRole}`);
  if (nonPiPattern.test(title)) return commonRow(person, unit, "excluded_non_pi", "官方职称为访问、实践、兼职或研究人员类别，不计入现任独立教师 PI。", `${title}; ${person.officialRole}`);
  if (!currentProfessorPattern.test(title)) return commonRow(person, unit, "excluded_non_pi", "官方职称未显示独立教师任职。", `${title}; ${person.officialRole}`);
  if (!aiPattern.test(research)) return commonRow(person, unit, "excluded_non_ai_cs", "官方简介未显示本图谱 AI、ML、NLP、CV、机器人、HCI、图形学或相关研究主线。", research || title);
  if (existing) return commonRow(person, unit, "included_existing", "同名且范围内的现任 PI 已在当前图谱。", `${title}; ${research}`, existing.id);
  if (!person.profileUrl || !person.portraitUrl || placeholderPortraitPattern.test(person.portraitUrl)) return commonRow(person, unit, "pending_profile_verification", "研究方向和职称符合，但缺少可直接复核的官方个人页或有效头像。", `${title}; ${research}`);
  return commonRow(person, unit, "eligible_future_batch", "MIT CSAIL 官方名录确认现任独立教师且研究方向符合；进入后续资料与关系补全队列。", `${title}; ${research}`);
}

fs.mkdirSync(outputDir, { recursive: true });
const summary = { schemaVersion: 1, snapshotAt, scope: "US/Canada roster batch 2: UT Austin CS, Michigan Robotics, MIT CSAIL", units: {}, totals: {} };
const totals = {};

for (const unit of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, unit.artifact), "utf8"));
  const classifier = unit.unitId === "utexas-cs" ? classifyUt : unit.unitId === "umich-robotics" ? classifyUmich : classifyMit;
  const decisions = artifact.people.map((person) => classifier(person, unit));
  if (decisions.length !== artifact.officialRosterCount) throw new Error(`${unit.unitId}: ${decisions.length} != ${artifact.officialRosterCount}`);
  if (new Set(decisions.map((row) => row.officialId)).size !== decisions.length) throw new Error(`${unit.unitId}: duplicate officialId`);
  const counts = {};
  for (const row of decisions) {
    counts[row.decision] = (counts[row.decision] || 0) + 1;
    totals[row.decision] = (totals[row.decision] || 0) + 1;
  }
  const outputPath = path.join(outputDir, `${unit.unitId}-2026-09-03.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify({ schemaVersion: 1, unitId: unit.unitId, unitUrl: unit.unitUrl, snapshotAt, rosterArtifact: unit.artifact, officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, decisions }, null, 2)}\n`);
  summary.units[unit.unitId] = { officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, outputPath: path.relative(root, outputPath) };
}

summary.totals = {
  officialRosterCount: Object.values(summary.units).reduce((sum, unit) => sum + unit.officialRosterCount, 0),
  decisionCount: Object.values(summary.units).reduce((sum, unit) => sum + unit.decisionCount, 0),
  counts: totals,
};
if (summary.totals.officialRosterCount !== summary.totals.decisionCount) throw new Error("US/Canada batch 2 totals do not balance");
if (summary.totals.officialRosterCount < 250 || summary.totals.officialRosterCount > 400) throw new Error("Batch size must remain within 250–400 records");
if ((totals.include_new_pi || 0) !== selectedNames.size) throw new Error(`Expected ${selectedNames.size} selected new PI decisions, found ${totals.include_new_pi || 0}`);
fs.writeFileSync(path.join(outputDir, "summary-2026-09-03.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
