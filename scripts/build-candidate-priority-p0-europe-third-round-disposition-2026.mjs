import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const prior = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-second-round-disposition-2026-09-03.json"), "utf8"));
const review = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-third-round-batch-1-review-2026-09-03.json"), "utf8"));
const ready = new Map(review.records.map((row) => [row.canonicalKey, row.atlasPersonId]));
const invalidGenericPortraits = new Set([
  "Europe:Technical University of Munich:florianbruse",
  "Europe:Technical University of Munich:vspors",
]);

// The two people promoted in round two are no longer part of this 162-person pass.
const source = prior.records.filter((row) => row.disposition !== "ready");

const withoutRoundTwoGap = (row) => {
  const rest = { ...row };
  delete rest.secondRoundRequiredEvidence;
  delete rest.secondRoundEvidence;
  return rest;
};

const records = source.map((input) => {
  const row = withoutRoundTwoGap(input);
  if (ready.has(row.canonicalKey)) return {
    ...row,
    disposition: "ready",
    atlasPersonId: ready.get(row.canonicalKey),
    blocker: null,
    thirdRoundEvidence: "Alternative first-party and university-hosted sources jointly verify current independent PI status, education/career facts, a named adviser or student relationship, and a manually inspected local portrait.",
    reviewedAt: "2026-09-03",
  };

  if (invalidGenericPortraits.has(row.canonicalKey)) return {
    ...row,
    disposition: "missing_portrait",
    atlasPersonId: null,
    cachedPortrait: {
      ...(row.cachedPortrait ?? {}),
      status: "rejected_generic_placeholder",
      rejection: "The cached TUM asset resolves to the generic person.svg silhouette rather than a photograph of the named scholar.",
    },
    blocker: "第三轮人工图像复核确认缓存来源是 TUM 通用 person.svg 占位图，并非本人照片。其官方任职、履历和具名关系已有线索，但在找到来源可追溯的真人头像前不得接入。",
    thirdRoundRequiredEvidence: ["大学、本人主页或可信学术活动页提供的本人真人头像", "头像来源页与姓名、现职身份一致"],
    reviewedAt: "2026-09-03",
  };

  if (row.disposition === "fetch_failed") return {
    ...row,
    disposition: "fetch_failed",
    blocker: "第三轮已尝试以院系/研究组页面、大学托管个人主页或 CV、论文与博士记录、研究组学生页等替代原失效链接；现有可访问材料仍无法同时闭合现任独立 PI、教育履历、可靠头像和具名关系四项证据，因此保持阻塞。",
    thirdRoundRequiredEvidence: ["可访问的一手现任职务页", "教育或博士训练的一手记录", "可靠本人头像", "具名导师、学生、长期合作或产业关系"],
    reviewedAt: "2026-09-03",
  };

  if (row.disposition === "missing_portrait") return {
    ...row,
    disposition: "missing_portrait",
    blocker: "第三轮替代来源检索仍未找到同时通过本人对应、来源可追溯、非占位和清晰度检查的头像；现有人物事实和关系不能替代可靠头像门槛。",
    thirdRoundRequiredEvidence: ["可靠本人头像（本地 512×512）", "头像来源页与本人身份一致"],
    reviewedAt: "2026-09-03",
  };

  if (row.disposition === "missing_relationship") return {
    ...row,
    disposition: "missing_relationship",
    blocker: "第三轮替代来源检索仍没有一手页面明确给出可建边的具名导师、学生、长期合作或产业关系；不能从共同论文或同一机构身份推断关系。",
    thirdRoundRequiredEvidence: ["一手页面明确记载的具名导师、学生、长期合作或产业关系"],
    reviewedAt: "2026-09-03",
  };

  return {
    ...row,
    disposition: "missing_profile_facts_and_relationship",
    blocker: "第三轮可访问的院系页、个人简介、CV 或论文记录仍未共同提供 3–5 条可发布事实（含教育/学术训练）及至少一条一手具名关系；未以推断或二手聚合结果补齐。",
    thirdRoundRequiredEvidence: ["3–5 条带来源人物事实（含教育/学术训练）", "一手页面明确记载的具名关系"],
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
  scope: "All 162 Europe P0 candidates that remained below the strict publication gate after round two",
  method: "Third-pass alternative-source verification used official faculty/research-group pages, university-hosted or personal academic homepages and CVs, degree/thesis records, named student pages, and official news. Promotion still requires current independent PI status, at least two reliable sources, 3–5 sourced facts including education, a reliable manually inspected local portrait, and at least one first-party named relationship.",
  notes: [
    "Eight candidates reached the full publication gate and are represented in the third-round batch module.",
    "Two TUM cached files were invalidated after manual inspection because their source was the generic person.svg placeholder; they are now explicitly blocked on portrait evidence.",
    "No blocked candidate was promoted from co-location, coauthorship alone, or a generic directory image.",
  ],
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

const expected = { total: 162, ready: 8, missingRelationship: 0, missingProfileFactsAndRelationship: 23, missingPortrait: 3, fetchFailed: 128, unresolvedWithoutDisposition: 0 };
for (const [key, value] of Object.entries(expected)) if (output.counts[key] !== value) throw new Error(`unexpected ${key}: ${output.counts[key]} (expected ${value})`);
if (new Set(records.map((row) => row.canonicalKey)).size !== records.length) throw new Error("duplicate canonicalKey in Europe third-round ledger");
if (records.some((row) => row.disposition !== "ready" && (!row.blocker || !row.thirdRoundRequiredEvidence?.length))) throw new Error("blocked record lacks an explicit third-round evidence gap");
if (records.some((row) => row.disposition === "ready" && (!row.atlasPersonId || row.blocker))) throw new Error("ready record is missing an atlas id or retains a blocker");

fs.writeFileSync(path.join(root, "data/candidate-priority-p0-europe-third-round-disposition-2026-09-03.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output.counts, null, 2));
