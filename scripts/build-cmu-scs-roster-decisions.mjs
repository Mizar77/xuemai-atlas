import fs from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const rosterPath = path.join(root, "data/official-rosters/cmu-scs-2026-09-02.json");
const decisionPath = path.join(root, "data/roster-decisions/cmu-scs-2026-09-03.json");
const summaryPath = path.join(root, "data/roster-decisions/cmu-scs-summary-2026-09-03.json");

const bundle = await build({
  stdin: {
    contents: 'import { people } from "./app/data.ts"; export { people };',
    resolveDir: root,
    sourcefile: "cmu-roster-existing-entry.ts",
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const { people } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));

const normalizeName = (value) => value
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .split(/[^a-z0-9\p{Script=Han}]+/u)
  .filter((token) => token && !["jr", "sr", "ii", "iii", "iv"].includes(token) && (token.length > 1 || /\p{Script=Han}/u.test(token)))
  .join("");

const existingByName = new Map();
for (const person of people) {
  const key = normalizeName(person.name);
  const current = existingByName.get(key);
  if (!current || (person.primary && !current.primary)) existingByName.set(key, person);
}

const aiDepartmentPattern = /(machine learning|language technologies|robotics|human-computer interaction|computational biology)/iu;
const historicalTitlePattern = /(emerit|retired)/iu;
const nonPiTitlePattern = /(post.?doc|fellow|teaching|lecturer|adjunct|courtesy|visiting|scientist|researcher associate|research associate|commercialization|scholar|consulting|contingent|advisor|special faculty|staff)/iu;
const professorTitlePattern = /professor/iu;
const sourcePageUrl = roster.officialPageUrl;

const decisions = roster.people.map((entry) => {
  const title = entry.titles.join("; ");
  const department = entry.departments.join("; ").replaceAll("&amp;", "&").replaceAll("&apos;", "'");
  const existing = existingByName.get(normalizeName(entry.name));
  const evidence = [title, department, roster.officialDataUrl].filter(Boolean).join(" | ");
  const base = {
    officialId: entry.officialId,
    name: entry.name,
    title,
    officialSection: department,
    researchAreas: entry.departments,
    sourcePageUrl,
    evidence,
  };

  if (historicalTitlePattern.test(title)) {
    return { ...base, decision: "excluded_historical", reason: "CMU SCS 官方目录职称明确为 emeritus/retired，保留名录记录但不计现任独立 PI。" };
  }
  if (nonPiTitlePattern.test(title) || !professorTitlePattern.test(title)) {
    return { ...base, decision: "excluded_non_pi", reason: "CMU SCS 官方职称属于教学、兼职、访问、博士后、scientist/staff 或其他非独立 PI 类。" };
  }
  if (existing?.primary && existing.stage !== "historical") {
    return {
      ...base,
      decision: "included_existing",
      atlasPersonId: existing.id,
      reason: "同名现任 PI 已在图谱中；CMU SCS 官方目录用于核对当前职称与院系归属。",
    };
  }
  if (aiDepartmentPattern.test(department)) {
    return {
      ...base,
      decision: "include_new_pi",
      reason: "CMU SCS 官方目录确认其为 AI/ML/NLP/机器人/HCI/计算生物相关院系的现任 professor；进入资料与头像补全队列。",
    };
  }
  return {
    ...base,
    decision: "pending_profile_verification",
    reason: "官方总目录确认 professor 身份，但未给出足够研究方向；需读取院系个人页后判断是否属于图谱 AI/NLP/CV/ML 主线。",
  };
});

const counts = Object.fromEntries([...new Set(decisions.map((item) => item.decision))]
  .sort()
  .map((decision) => [decision, decisions.filter((item) => item.decision === decision).length]));
const output = {
  unitId: "cmu-scs",
  snapshotAt: "2026-09-03",
  sourceRosterPath: "data/official-rosters/cmu-scs-2026-09-02.json",
  officialRosterCount: roster.officialRosterCount,
  decisions,
};
const summary = {
  generatedAt: "2026-09-03",
  unitId: output.unitId,
  officialRosterCount: roster.officialRosterCount,
  decisionCount: decisions.length,
  counts,
  includeNewPi: decisions.filter((item) => item.decision === "include_new_pi").map((item) => ({
    officialId: item.officialId,
    name: item.name,
    title: item.title,
    officialSection: item.officialSection,
  })),
  pendingProfileVerification: decisions.filter((item) => item.decision === "pending_profile_verification").map((item) => ({
    officialId: item.officialId,
    name: item.name,
    title: item.title,
    officialSection: item.officialSection,
  })),
};

if (decisions.length !== roster.officialRosterCount) throw new Error(`decision count ${decisions.length} != roster ${roster.officialRosterCount}`);
if (new Set(decisions.map((item) => item.officialId)).size !== decisions.length) throw new Error("duplicate CMU officialId in decisions");
fs.writeFileSync(decisionPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(`CMU SCS decisions written: ${decisions.length}/${roster.officialRosterCount}`, counts);
