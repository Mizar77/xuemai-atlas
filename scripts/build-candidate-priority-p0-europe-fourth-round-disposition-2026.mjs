import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const prior = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-third-round-disposition-2026-09-03.json"), "utf8"));
const review = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-fourth-round-batch-1-review-2026-09-03.json"), "utf8"));
const ready = new Map(review.records.map((row) => [row.canonicalKey, row.atlasPersonId]));
const targetDispositions = new Set(["missing_profile_facts_and_relationship", "missing_portrait"]);
const source = prior.records.filter((row) => targetDispositions.has(row.disposition));

const blockers = {
  "Europe:EPFL:christophkoch": ["教育/博士训练的一手履历", "一手页面明确列出的具名导师、学生或长期合作关系"],
  "Europe:EPFL:eduardomoraud": ["教育与任职时间轴的一手履历", "实验室当前/毕业学生或本人导师的一手清单"],
  "Europe:EPFL:frederickaplan": ["可核验的完整教育/博士训练事实", "一手页面明确的具名学生、导师或长期产业关系"],
  "Europe:EPFL:jeffreyhuang": ["含教育训练的 3–5 条一手人物事实", "研究组学生或本人导师的可建边记录"],
  "Europe:EPFL:maryannehartley": ["含教育/医学与计算训练的完整一手履历", "一手页面明确的具名学生、导师或长期合作关系"],
  "Europe:University of Cambridge:davidgreaves": ["教育/博士训练的一手履历", "当前或毕业博士生、本人导师或产业共同创办关系的一手记录"],
  "Europe:University of Cambridge:marcelofiore": ["完整教育与任职时间轴的一手资料", "当前或毕业博士生、本人导师的一手记录"],
  "Europe:Technical University of Munich:florianbruse": ["大学、本人主页或可信学术活动页提供的本人真人头像", "头像来源页与姓名、现职身份一致"],
  "Europe:Technical University of Munich:vspors": ["大学、本人主页或可信学术活动页提供的本人真人头像", "头像来源页与姓名、现职身份一致"],
};

const records = source.map((row) => {
  if (ready.has(row.canonicalKey)) return {
    ...row,
    disposition: "ready",
    atlasPersonId: ready.get(row.canonicalKey),
    blocker: null,
    fourthRoundEvidence: "Fourth-round first-party verification closed current independent PI status, at least two reliable sources, 3–5 sourced facts including education, a manually checked local portrait, and a named adviser/student relationship.",
    reviewedAt: "2026-09-03",
  };
  const required = blockers[row.canonicalKey];
  if (!required) throw new Error(`missing individual fourth-round blocker: ${row.canonicalKey}`);
  if (row.disposition === "missing_portrait") return {
    ...row,
    disposition: "missing_portrait",
    blocker: "第四轮继续检查大学新闻、研究组、本人主页与学术活动来源，但仍未找到能够确认本人身份且非通用图标的可靠真人头像；不得以 TUM person.svg 或主题插画替代。",
    fourthRoundRequiredEvidence: required,
    reviewedAt: "2026-09-03",
  };
  return {
    ...row,
    disposition: "missing_profile_facts_and_relationship",
    blocker: "第四轮已保留现任独立 PI 与经检查的头像，但可访问的一手页面仍不能同时形成含教育训练的 3–5 条人物事实和至少一条具名可建边关系；没有用共同论文或二手聚合结果推断。",
    fourthRoundRequiredEvidence: required,
    reviewedAt: "2026-09-03",
  };
});

const count = (value) => records.filter((row) => row.disposition === value).length;
const byInstitution = Object.values(records.reduce((acc, row) => {
  acc[row.institution] ??= { institution: row.institution, total: 0, ready: 0, missingProfileFactsAndRelationship: 0, missingPortrait: 0 };
  acc[row.institution].total += 1;
  if (row.disposition === "ready") acc[row.institution].ready += 1;
  else if (row.disposition === "missing_profile_facts_and_relationship") acc[row.institution].missingProfileFactsAndRelationship += 1;
  else if (row.disposition === "missing_portrait") acc[row.institution].missingPortrait += 1;
  return acc;
}, {})).sort((a, b) => b.total - a.total || a.institution.localeCompare(b.institution));

const output = {
  generatedAt: "2026-09-03",
  scope: "The 26 Europe P0 candidates prioritized for round four: 23 missing profile facts/relationship and 3 missing portrait after round three",
  method: "Candidate-by-candidate review of official faculty and PhD registries, university-hosted profiles/CVs/theses, lab people pages, official news, and portrait provenance. The strict publication gate remained unchanged.",
  counts: {
    total: records.length,
    ready: count("ready"),
    missingProfileFactsAndRelationship: count("missing_profile_facts_and_relationship"),
    missingPortrait: count("missing_portrait"),
    unresolvedWithoutDisposition: records.filter((row) => !row.disposition).length,
  },
  byInstitution,
  records,
};

const expected = { total: 26, ready: 17, missingProfileFactsAndRelationship: 7, missingPortrait: 2, unresolvedWithoutDisposition: 0 };
for (const [key, value] of Object.entries(expected)) if (output.counts[key] !== value) throw new Error(`unexpected ${key}: ${output.counts[key]} (expected ${value})`);
if (new Set(records.map((row) => row.canonicalKey)).size !== records.length) throw new Error("duplicate canonicalKey in Europe fourth-round ledger");
if (records.some((row) => row.disposition !== "ready" && (!row.blocker || !row.fourthRoundRequiredEvidence?.length))) throw new Error("blocked record lacks an explicit fourth-round evidence gap");

fs.writeFileSync(path.join(root, "data/candidate-priority-p0-europe-fourth-round-disposition-2026-09-03.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output.counts, null, 2));
