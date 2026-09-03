import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const prior = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-full-disposition-2026-09-03.json"), "utf8"));
const reviews = [
  JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-second-round-batch-1-review-2026-09-03.json"), "utf8")),
];
const ready = new Map(reviews.flatMap((review) => review.records).map((row) => [row.canonicalKey, row.atlasPersonId]));
const source = prior.records.filter((row) => row.disposition !== "ready");

const records = source.map((row) => {
  if (ready.has(row.canonicalKey)) return {
    ...row,
    disposition: "ready",
    atlasPersonId: ready.get(row.canonicalKey),
    blocker: null,
    secondRoundEvidence: "Alternative university-hosted personal page or personal academic homepage supplied current appointment, education, named supervisor/current student relation, research facts, and a verified portrait.",
    reviewedAt: "2026-09-03",
  };
  if (row.disposition === "fetch_failed") return {
    ...row,
    disposition: "fetch_failed",
    blocker: "第二轮仍未取得同时可核验本人身份、现任独立 PI 状态、教育履历、非占位头像和具名关系的一组替代一手页面；原冻结个人链接不可用，因此不得仅凭院系名录接入。",
    secondRoundRequiredEvidence: ["可访问的本人官方页或个人学术主页", "可靠本人头像", "教育或博士训练事实", "具名导师、学生、长期合作或产业关系"],
    reviewedAt: "2026-09-03",
  };
  if (row.disposition === "missing_portrait") return {
    ...row,
    blocker: "第二轮复核仍没有找到通过本人对应、来源可追溯、非占位和图像质量检查的头像；人物页和名录不足以代替可靠头像，且其余事实与关系须随头像再次核验。",
    secondRoundRequiredEvidence: ["可靠本人头像（本地 512×512）", "头像来源页与本人身份一致"],
    reviewedAt: "2026-09-03",
  };
  if (row.disposition === "missing_relationship") return {
    ...row,
    blocker: "第二轮已保留现任独立 PI、两项来源、人物事实和可靠头像，但仍没有一手页面明确给出可建边的具名导师、学生、长期合作或产业关系。",
    secondRoundRequiredEvidence: ["一手页面明确记载的具名导师、学生、长期合作或产业关系"],
    reviewedAt: "2026-09-03",
  };
  return {
    ...row,
    disposition: "missing_profile_facts_and_relationship",
    blocker: "第二轮仍未同时取得 3–5 条可发布的带来源人物事实（必须含教育/学术训练）和至少一条一手可建边关系；现有院系页、简短简介或头像缓存不能单独满足发布门槛。",
    secondRoundRequiredEvidence: ["3–5 条带来源事实（含教育/学术训练）", "一手页面明确记载的具名关系"],
    reviewedAt: "2026-09-03",
  };
});

const count = (value) => records.filter((row) => row.disposition === value).length;
const byInstitution = Object.values(records.reduce((acc, row) => {
  acc[row.institution] ??= { institution: row.institution, total: 0, ready: 0, missingRelationship: 0, missingProfileFactsAndRelationship: 0, missingPortrait: 0, fetchFailed: 0 };
  acc[row.institution].total += 1;
  if (row.disposition === "ready") acc[row.institution].ready += 1;
  else if (row.disposition === "missing_relationship") acc[row.institution].missingRelationship += 1;
  else if (row.disposition === "missing_profile_facts_and_relationship") acc[row.institution].missingProfileFactsAndRelationship += 1;
  else if (row.disposition === "missing_portrait") acc[row.institution].missingPortrait += 1;
  else if (row.disposition === "fetch_failed") acc[row.institution].fetchFailed += 1;
  return acc;
}, {})).sort((a, b) => b.total - a.total || a.institution.localeCompare(b.institution));

const output = {
  generatedAt: "2026-09-03",
  scope: "All 164 Europe P0 candidates that remained below the publication gate after the first Europe pass",
  method: "Second-pass search prioritized alternative official department pages, university-hosted or personal academic homepages/CVs, thesis records, research-group current/alumni pages, and official news. Promotion remained contingent on current independent PI status, >=2 reliable sources, 3–5 sourced facts including education, a reliable local portrait, and >=1 first-party named relationship.",
  counts: {
    total: records.length,
    ready: count("ready"),
    missingRelationship: count("missing_relationship"),
    missingProfileFactsAndRelationship: count("missing_profile_facts_and_relationship"),
    missingPortrait: count("missing_portrait"),
    fetchFailed: count("fetch_failed"),
    unresolvedWithoutDisposition: records.filter((row) => !row.disposition).length,
  },
  byInstitution,
  records,
};

const expected = { total: 164, ready: 2, missingRelationship: 2, missingProfileFactsAndRelationship: 25, missingPortrait: 7, fetchFailed: 128, unresolvedWithoutDisposition: 0 };
for (const [key, value] of Object.entries(expected)) if (output.counts[key] !== value) throw new Error(`unexpected ${key}: ${output.counts[key]} (expected ${value})`);
if (new Set(records.map((row) => row.canonicalKey)).size !== records.length) throw new Error("duplicate canonicalKey in Europe second-round ledger");
if (records.some((row) => row.disposition !== "ready" && (!row.blocker || !row.secondRoundRequiredEvidence?.length))) throw new Error("blocked record lacks an explicit second-round evidence gap");

fs.writeFileSync(path.join(root, "data/candidate-priority-p0-europe-second-round-disposition-2026-09-03.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output.counts, null, 2));
