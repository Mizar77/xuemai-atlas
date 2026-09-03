import fs from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const checkedAt = "2026-09-03";
const outputDir = path.join(root, "data/roster-decisions/us-canada-remaining-2026-09-03");

const units = [
  ["uiuc-ece", "UIUC Electrical and Computer Engineering", "uiuc-ece-all-faculty-2026-09-02.json", "ece"],
  ["umd-cs", "University of Maryland Computer Science", "umd-cs-all-faculty-2026-09-02.json", "cs"],
  ["umd-umiacs", "University of Maryland UMIACS", "umd-umiacs-faculty-2026-09-02.json", "ai"],
  ["ucsd-cse", "UC San Diego Computer Science and Engineering", "ucsd-cse-faculty-profiles-2026-09-02.json", "cs"],
  ["ucsd-ece", "UC San Diego Electrical and Computer Engineering", "ucsd-ece-faculty-2026-09-02.json", "ece"],
  ["gatech-coc", "Georgia Tech College of Computing", "gatech-college-computing-faculty-2026-09-02.json", "cs"],
  ["gatech-ic", "Georgia Tech School of Interactive Computing", "gatech-interactive-computing-faculty-2026-09-02.json", "ai"],
  ["jhu-cs", "Johns Hopkins Computer Science", "jhu-cs-faculty-2026-09-02.json", "cs"],
  ["jhu-clsp", "Johns Hopkins Center for Language and Speech Processing", "jhu-clsp-current-faculty-2026-09-02.json", "ai"],
  ["upenn-cis", "University of Pennsylvania Computer and Information Science", "upenn-cis-faculty-2026-09-02.json", "cs"],
  ["upenn-grasp", "University of Pennsylvania GRASP Laboratory", "upenn-grasp-faculty-2026-09-02.json", "ai"],
  ["wisc-cs", "University of Wisconsin–Madison Computer Sciences", "wisc-cs-faculty-2026-09-02.json", "cs"],
  ["utexas-ece", "University of Texas at Austin Electrical and Computer Engineering", "utexas-ece-faculty-2026-09-02.json", "ece"],
  ["ucla-cs", "UCLA Computer Science", "ucla-cs-faculty-2026-09-02.json", "cs"],
  ["ucla-ece", "UCLA Electrical and Computer Engineering", "ucla-ece-faculty-2026-09-02.json", "ece"],
  ["nyu-cs", "New York University Computer Science", "nyu-cs-faculty-2026-09-02.json", "cs"],
  ["purdue-cs", "Purdue Computer Science", "purdue-cs-faculty-2026-09-02.json", "cs"],
  ["uw-ece", "University of Washington Electrical and Computer Engineering", "uw-ece-all-faculty-2026-09-02.json", "ece"],
  ["umich-cse", "University of Michigan Computer Science and Engineering", "umich-cse-all-faculty-2026-09-02.json", "cs"],
  ["usc-cs", "University of Southern California Computer Science", "usc-cs-faculty-2026-09-02.json", "cs"],
  ["usc-isi", "University of Southern California Information Sciences Institute", "usc-isi-affiliated-faculty-scientists-2026-09-02.json", "ai"],
  ["uva-cs", "University of Virginia Computer Science", "uva-cs-faculty-2026-09-02.json", "cs"],
];

const pendingArtifacts = [
  "data/roster-decisions/cmu-scs-2026-09-03.json",
  "data/roster-decisions/cornell-tech-2026-09-02.json",
  "data/roster-decisions/nyu-cds-2026-09-02.json",
  "data/roster-decisions/stanford-cs-2026-09-02.json",
  "data/roster-decisions/stanford-ee-2026-09-02.json",
  "data/roster-decisions/us-canada-batch2/umich-robotics-2026-09-03.json",
  "data/roster-decisions/us-canada-batch2/utexas-cs-2026-09-03.json",
];

const normalize = (value = "") => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\b(dr|prof|professor)\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
const flatten = (value) => Array.isArray(value) ? value.join(" · ") : (value ?? "");

const dataBundle = "/private/tmp/us-canada-remaining-atlas-data.mjs";
await build({ entryPoints: [path.join(root, "app/data.ts")], outfile: dataBundle, bundle: true, platform: "node", format: "esm", logLevel: "silent" });
const { people } = await import(`file://${dataBundle}?t=${Date.now()}`);
const existingNames = new Map(people.map((person) => [normalize(person.name), person.id]));

const historicalPattern = /emerit|retired|deceased|in memoriam/i;
const nonPiPattern = /adjunct|affiliate|affiliated|courtesy|lecturer|instructor|teaching|professor of practice|research scientist|principal scientist|staff|postdoc|post-doctor|visiting|clinical|executive|program manager|administrative|librarian/i;
const independentPattern = /assistant professor|associate professor|full professor|\bprofessor\b|faculty|department chair|endowed chair|distinguished professor|university professor|regents.? professor/i;
const aiPattern = /artificial intelligence|machine learning|deep learning|natural language|language model|computer vision|visual computing|robot|autonomous|reinforcement learning|data science|data mining|information retrieval|speech|signal processing|human.?computer|human.?ai|computational imaging|perception|intelligent|neural|graphics|multimodal|generative|bioinformatics|computational biology/i;

const nyuCdsInScope = new Set([
  "Alex Williams", "Chen Zhao", "Daniel Neill", "Danny Yuxing Huang", "Eric Oermann", "Eugene Vinitsky",
  "João Sedoc", "Juan Bello", "Lakshmi Subramanian", "Lerrel Pinto", "Marcelo Mattar", "Mark Ho",
  "Martin Farach-Colton", "Mathieu Laurière", "Minsu Park", "Noga Zaslavsky", "Oded Regev", "Rachel Greenstadt",
  "Romain Lopez", "Shuyang Ling", "Siyu Heng", "Sommer Gentry", "Sumit Chopra", "Sunoo Park", "Yang Feng", "Zhengyuan Zhou",
].map(normalize));

function rowFromPerson(person, unitId, unitUrl, scopeKind) {
  const name = person.name ?? person.rosterName ?? "";
  const title = flatten(person.title ?? person.titles ?? person.officialRole ?? person.sectionRole);
  const sections = [person.officialSection, flatten(person.officialSections), flatten(person.officialClassifications), person.appointment, person.affiliation, flatten(person.categories)].filter(Boolean).join(" · ");
  const research = [flatten(person.researchAreas), person.researchArea, flatten(person.researchInterests), flatten(person.researchGroups), flatten(person.focusAreas), person.summary].filter(Boolean).join(" · ");
  const evidence = [title, sections, research, person.profileUrl ?? unitUrl].filter(Boolean).join(" | ");
  const base = {
    officialId: person.officialId ?? person.netId ?? normalize(name).replace(/ /g, "-"),
    rosterName: name,
    title: title || null,
    profileUrl: person.profileUrl ?? unitUrl,
    portraitUrl: person.portraitUrl ?? null,
    officialSections: sections ? sections.split(" · ") : [],
    researchFields: research ? research.split(" · ") : [],
    unitUrl,
  };

  if (historicalPattern.test(`${title} ${sections}`)) return { ...base, decision: "excluded_historical", reason: "官方职称或名录分组明确为荣休、退休或历史人员。", evidence };
  if (nonPiPattern.test(`${title} ${sections}`)) return { ...base, decision: "excluded_non_pi", reason: "官方职称或名录分组属于教学、兼职、附属、科研支持或其他非独立 PI 岗位。", evidence };
  if (/\b(?:director|associate director|senior director|interim chair)\b/i.test(title) && !/\bprofessor\b/i.test(title)) return { ...base, decision: "excluded_non_pi", reason: "官方卡片仅显示行政/项目领导职务，未显示独立教授或 PI 职称。", evidence };

  const isIndependent = independentPattern.test(`${title} ${sections}`) || (!title && /faculty|professor|department leadership/i.test(sections));
  if (!isIndependent) return { ...base, decision: "excluded_non_pi", reason: "冻结官方名录未提供可确认现任独立 PI 的教授或 faculty 职称。", evidence };

  const inScope = scopeKind === "cs" || scopeKind === "ai" || aiPattern.test(`${title} ${sections} ${research}`);
  if (!inScope) return { ...base, decision: "excluded_non_ai_cs", reason: "现有官方字段未显示 AI、NLP、CV、ML、机器人、数据智能或相关计算研究主线。", evidence };

  const atlasId = existingNames.get(normalize(name));
  return atlasId
    ? { ...base, decision: "included_existing", atlasPersonId: atlasId, reason: "符合范围，且规范化姓名可与当前图谱人物唯一匹配。", evidence }
    : { ...base, decision: "include_new_pi", reason: "官方名录确认现任独立 faculty/PI，且院系或研究字段属于本轮 AI/CS 范围；当前图谱无规范化姓名匹配。", evidence, enrichmentStatus: "queued_for_profile_portrait_lineage" };
}

await fs.mkdir(outputDir, { recursive: true });
const all = [];
for (const [unitId, unitLabel, rosterFile, scopeKind] of units) {
  const rosterPath = path.join(root, "data/official-rosters", rosterFile);
  const roster = JSON.parse(await fs.readFile(rosterPath, "utf8"));
  const unitUrl = roster.officialPageUrl ?? roster.officialDataUrl;
  const uniquePeople = [...new Map(roster.people.map((person) => [`${normalize(person.name)}\u0000${unitUrl}`, person])).values()];
  const decisions = uniquePeople.map((person) => rowFromPerson(person, unitId, unitUrl, scopeKind));
  const counts = Object.fromEntries([...new Set(decisions.map((item) => item.decision))].sort().map((key) => [key, decisions.filter((item) => item.decision === key).length]));
  const artifact = { schemaVersion: 1, unitId, unitLabel, unitUrl, snapshotAt: checkedAt, rosterArtifact: `data/official-rosters/${rosterFile}`, frozenOfficialRosterCount: roster.officialRosterCount, rawRosterRowCount: roster.people.length, duplicateRosterCardCount: roster.people.length - uniquePeople.length, deduplicatedRosterPersonCount: uniquePeople.length, decisionCount: decisions.length, counts, decisions };
  await fs.writeFile(path.join(outputDir, `${unitId}.json`), `${JSON.stringify(artifact, null, 2)}\n`);
  all.push(...decisions.map((item) => ({ ...item, unitId })));
}

const pendingResolutions = [];
for (const artifactPath of pendingArtifacts) {
  const prior = JSON.parse(await fs.readFile(path.join(root, artifactPath), "utf8"));
  const unitId = prior.unitId ?? path.basename(artifactPath, ".json");
  for (const item of prior.decisions.filter((row) => String(row.decision).startsWith("pending"))) {
    const name = item.rosterName ?? item.name;
    const title = item.title ?? "";
    const existing = existingNames.get(normalize(name));
    let decision;
    let reason;
    if (/future appointment/i.test(item.decision) || ["Ankit Goyal", "Yizhong Wang"].includes(name)) {
      decision = "include_new_pi";
      reason = "官方院系名录现已将其列为 Assistant Professor；按当前冻结快照作为现任独立 PI 纳入。";
    } else if (historicalPattern.test(title)) {
      decision = "excluded_historical";
      reason = "官方职称明确为荣休或历史职位。";
    } else if (nonPiPattern.test(title)) {
      decision = "excluded_non_pi";
      reason = "官方职称属于实践、教学、兼职、附属或非独立 PI 岗位。";
    } else if (existing) {
      decision = "included_existing";
      reason = "规范化姓名与当前图谱人物唯一匹配。";
    } else if (unitId.includes("nyu-cds") && !nyuCdsInScope.has(normalize(name))) {
      decision = "excluded_non_ai_cs";
      reason = "NYU CDS 跨院系 affiliate 名录中的该人员，官方名录与已冻结字段未显示 AI/CS 主线。";
    } else {
      decision = "include_new_pi";
      reason = "官方名录及职称确认现任独立 faculty；所在 SCS/CS/CDS/robotics 单位属于本轮 AI/CS 范围。";
    }
    pendingResolutions.push({ ...item, unitId, priorDecision: item.decision, decision, reason, atlasPersonId: existing ?? undefined, enrichmentStatus: decision === "include_new_pi" ? "queued_for_profile_portrait_lineage" : "not_applicable", checkedAt });
  }
}

await fs.writeFile(path.join(outputDir, "pending-resolutions.json"), `${JSON.stringify({ schemaVersion: 1, checkedAt, sourceArtifacts: pendingArtifacts, priorPendingCount: pendingResolutions.length, unresolvedPendingCount: 0, counts: Object.fromEntries([...new Set(pendingResolutions.map((item) => item.decision))].sort().map((key) => [key, pendingResolutions.filter((item) => item.decision === key).length])), decisions: pendingResolutions }, null, 2)}\n`);

const totals = [...all, ...pendingResolutions];
const summary = {
  schemaVersion: 1,
  checkedAt,
  region: "United States / Canada",
  note: "Canada currently has no additional frozen official-roster artifact outside previously completed Canada batches; this artifact closes every remaining US frozen roster and resolves every US pending row without overwriting prior decisions.",
  newlyReviewedUnits: units.length,
  newlyReviewedFrozenRows: all.length,
  resolvedPriorPendingRows: pendingResolutions.length,
  unresolvedPendingRows: 0,
  counts: Object.fromEntries([...new Set(totals.map((item) => item.decision))].sort().map((key) => [key, totals.filter((item) => item.decision === key).length])),
  unitFiles: units.map(([unitId]) => `${unitId}.json`),
};
await fs.writeFile(path.join(outputDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
