import fs from "node:fs";
import path from "node:path";

const checkedAt = "2026-09-02";
const unitId = "hkbu-comp";
const sourcePageUrl = "https://www.comp.hkbu.edu.hk/v1/?page=faculty";
const rosterPath = "data/official-rosters/hkbu-comp-faculty-2026-09-02.json";
const evidencePath = "data/official-rosters/hkbu-comp-profile-evidence-2026-09-02.json";
const decisionPath = "data/roster-decisions/hkbu-comp-2026-09-02.json";
const summaryPath = "data/roster-decisions/hkbu-comp-summary-2026-09-02.json";
const proposalPath = "data/roster-decisions/hkbu-comp-expansion-proposal-2026-09-02.json";
const profileDir = process.argv.find((arg) => arg.startsWith("--profile-dir="))?.split("=")[1];

const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));

const stripHtml = (value) => value
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&mdash;/gi, "—")
  .replace(/&amp;/gi, "&")
  .replace(/&rsquo;/gi, "’")
  .replace(/&ldquo;|&rdquo;/gi, '"')
  .replace(/\s+/g, " ")
  .trim();

const capture = (html, expression) => stripHtml(html.match(expression)?.[1] ?? "");

let evidence;
if (profileDir) {
  evidence = roster.people.map((person) => {
    const html = fs.readFileSync(path.join(profileDir, `${person.officialId}.html`), "utf8");
    return {
      officialId: person.officialId,
      name: person.name,
      profileUrl: person.profileUrl,
      portraitUrl: person.portraitUrl,
      position: capture(html, /<span class=['"]pos['"]>([\s\S]*?)<\/span>/i),
      qualifications: capture(html, /<span class=['"]qual['"]>([\s\S]*?)<\/span>/i),
      about: capture(html, /(?:About|Biography)<\/span>[\s\S]*?<div style=['"]padding-top:30px;['"]>([\s\S]*?)<\/div>/i),
      researchInterests: capture(html, /Research Interests<\/span>[\s\S]*?<div style=['"]padding-top:30px;['"]>([\s\S]*?)<\/div>/i),
    };
  });
  fs.writeFileSync(evidencePath, `${JSON.stringify({
    unitId,
    sourcePageUrl,
    extractedAt: checkedAt,
    people: evidence,
  }, null, 2)}\n`);
} else {
  evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8")).people;
}

const existingAtlasIds = {
  chenjie: "jie-chen-hkbu",
  bhanml: "bo-han-hkbu",
  majing: "jing-ma-hkbu",
  baijiaxin: "jiaxin-bai",
  kyzhou: "kaiyang-zhou",
};

const candidateIds = new Set([
  "xujl", "lichen", "jiming", "william", "ymc", "mdfwong", "pcyuen", "michael-ng",
  "xinhuang", "seemohan", "henrydai", "csygliu", "ericluzhang", "yifanc", "xiaoqingguo",
  "longkai", "lintian", "renjiewan", "jcwang", "xuchuangw", "renchi", "czpiao", "cskjyin",
]);

const firstBatchAtlasIds = {
  lichen: "li-chen-hkbu",
  xinhuang: "xin-huang-hkbu",
  csygliu: "yang-liu-hkbu",
  ericluzhang: "eric-lu-zhang-hkbu",
  yifanc: "yifan-chen-hkbu",
  xiaoqingguo: "xiaoqing-guo-hkbu",
  longkai: "longkai-huang-hkbu",
  lintian: "lin-tian-hkbu",
  renjiewan: "renjie-wan-hkbu",
  jcwang: "juncheng-wang-hkbu",
  xuchuangw: "xuchuang-wang-hkbu",
  renchi: "renchi-yang-hkbu",
  czpiao: "chengzhi-piao-hkbu",
  cskjyin: "kejing-yin-hkbu",
  william: "william-cheung-hkbu",
};

const nonAiCsIds = new Set(["choi", "ywleung", "amelieczhou"]);
const industryOnlyIds = new Set(["mhamilton"]);
const nonPiIds = new Set([
  "dinverno", "kenderdine", "mtchoy", "jeanlai", "csyxli", "cpchan", "shichaoma",
  "sarahshek", "kevinw", "polinexian", "wilsonyu", "cezhang",
]);

const decisions = evidence.map((person) => {
  let decision;
  let reason;
  let atlasPersonId = existingAtlasIds[person.officialId];
  if (atlasPersonId) {
    decision = "included_existing";
    reason = "HKBU 官方名录与个人页确认其为现任 AI/ML/NLP/CV 独立 PI，图谱已有同一人物节点。";
  } else if (candidateIds.has(person.officialId)) {
    decision = "include_new_pi";
    reason = "HKBU 官方个人页确认现任 Professor/Assistant Professor/Research Assistant Professor 身份，研究主线落在 AI、ML、NLP、CV、数据挖掘、智能体或 AI for Science。";
  } else if (nonAiCsIds.has(person.officialId)) {
    decision = "excluded_non_ai_cs";
    reason = "官方研究方向以数据库、网络或分布式系统为主，未显示属于当前 AI/NLP/CV/ML/数据挖掘图谱主线。";
  } else if (industryOnlyIds.has(person.officialId)) {
    decision = "excluded_industry_only";
    reason = "官方简介显示其主要现职为 NVIDIA 产业团队负责人，HKBU 为 Distinguished Professor of Technology 连接，不作为校内独立 PI 收录。";
  } else if (nonPiIds.has(person.officialId)) {
    decision = "excluded_non_pi";
    reason = "官方职称为 affiliate/visiting professor 或 lecturer/senior lecturer，未确认在本单位具有独立 PI 身份。";
  } else {
    decision = "pending_profile_verification";
    reason = "官方名录人物未进入本轮明确规则，需要人工复核身份与研究范围。";
  }
  return {
    officialId: person.officialId,
    name: person.name,
    profileUrl: person.profileUrl,
    title: person.position,
    section: "Faculty Members",
    sourcePageUrl,
    decision,
    ...(atlasPersonId ? { atlasPersonId } : {}),
    reason,
    evidence: [person.position, person.researchInterests, person.about].filter(Boolean).join("; ").slice(0, 1400),
  };
});

const decisionCounts = Object.fromEntries(
  [...new Set(decisions.map((decision) => decision.decision))]
    .sort()
    .map((key) => [key, decisions.filter((decision) => decision.decision === key).length]),
);

fs.writeFileSync(decisionPath, `${JSON.stringify({
  unitId,
  institution: "Hong Kong Baptist University",
  unitName: "Department of Computer Science",
  sourcePageUrl,
  snapshotAt: checkedAt,
  officialRosterCount: roster.officialRosterCount,
  checkedCount: decisions.length,
  decisionCounts,
  decisions,
}, null, 2)}\n`);

fs.writeFileSync(summaryPath, `${JSON.stringify({
  reviewedAt: checkedAt,
  units: 1,
  officialPeople: roster.officialRosterCount,
  checkedPeople: decisions.length,
  decisionCounts,
  readyNewPi: decisions.filter((decision) => decision.decision === "include_new_pi").length,
  existingPi: decisions.filter((decision) => decision.decision === "included_existing").length,
  deferred: decisions.filter((decision) => decision.decision.startsWith("pending_")).length,
  note: "HKBU Computer Science complete person-level audit. Every frozen officialId has exactly one decision; official profile title, research interests, biography and portrait URL are preserved in the evidence artifact.",
}, null, 2)}\n`);

const firstBatch = decisions
  .filter((decision) => firstBatchAtlasIds[decision.officialId])
  .map((decision) => ({
    officialId: decision.officialId,
    name: decision.name,
    atlasPersonId: firstBatchAtlasIds[decision.officialId],
    profileUrl: decision.profileUrl,
    portraitPath: `public/portraits/hkbu-roster-2026/${firstBatchAtlasIds[decision.officialId]}.jpg`,
    status: "ready_for_parent_integration",
  }));

fs.writeFileSync(proposalPath, `${JSON.stringify({
  unitId,
  reviewedAt: checkedAt,
  module: "app/hkbu-roster-pi-expansion-2026.ts",
  relationshipPolicy: "Only explicit first-party supervision, student destination or career records are represented; co-authorship is not treated as lineage.",
  readyCount: firstBatch.length,
  ready: firstBatch,
  deferredCandidateOfficialIds: decisions
    .filter((decision) => decision.decision === "include_new_pi" && !firstBatchAtlasIds[decision.officialId])
    .map((decision) => decision.officialId),
}, null, 2)}\n`);

if (decisions.length !== roster.officialRosterCount) {
  throw new Error(`HKBU decision count ${decisions.length} != frozen roster ${roster.officialRosterCount}`);
}

console.log(JSON.stringify({ unitId, checkedCount: decisions.length, decisionCounts }, null, 2));
