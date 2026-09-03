import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const master = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json"), "utf8"));
const attempts = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-profile-attempts-2026-09-03.json"), "utf8"));
const reviews = [1, 2, 3, 4, 5].map((batch) => JSON.parse(fs.readFileSync(path.join(root, `data/candidate-priority-p0-europe-full-batch-${batch}-review-2026-09-03.json`), "utf8")));
const ready = new Map(reviews.flatMap((review) => review.records).map((row) => [row.canonicalKey, row.atlasPersonId]));
const attemptByKey = new Map(attempts.records.map((row) => [row.canonicalKey, row]));
const source = master.records.filter((row) => row.region === "Europe" && row.disposition === "missing_portrait");

const records = source.map((row) => {
  if (ready.has(row.canonicalKey)) return { ...row, disposition: "ready", atlasPersonId: ready.get(row.canonicalKey), blocker: null, reviewedAt: "2026-09-03" };
  const attempt = attemptByKey.get(row.canonicalKey);
  const portraitReady = attempt?.portrait?.status === "verified_512" && attempt?.portrait?.localPath && fs.existsSync(path.join(root, attempt.portrait.localPath));
  if (portraitReady && attempt?.currentDisposition === "missing_relationship") return {
    ...row,
    disposition: "missing_relationship",
    cachedPortrait: attempt.portrait,
    blocker: "可靠 512 头像和人物资料已缓存，但尚无通过人工核验的一手导师、学生、长期合作或产业关系。",
    reviewedAt: "2026-09-03",
  };
  if (portraitReady) return {
    ...row,
    disposition: "missing_profile_facts_and_relationship",
    cachedPortrait: attempt.portrait,
    blocker: "可靠 512 头像已缓存，但尚未同时取得可发布的 3–5 条带来源事实（含教育）和至少一条一手师承、学生、长期合作或产业关系；不得仅凭名录与头像接入。",
    reviewedAt: "2026-09-03",
  };
  if (attempt?.profileFetchStatus === "official_profile_404") return {
    ...row,
    disposition: "fetch_failed",
    cachedPortrait: attempt?.portrait ?? null,
    blocker: "冻结名录链接当前只返回 404 或不含该人物的通用院系页面，无法从该一手入口取得本人头像、教育履历和关系证据；需要另找学校实验室页或个人主页。",
    reviewedAt: "2026-09-03",
  };
  return {
    ...row,
    disposition: "missing_portrait",
    cachedPortrait: attempt?.portrait ?? null,
    blocker: "院系名录与个人页已确认现任候选，但没有通过非占位、本人对应、可追溯与图像质量检查的头像；同时仍须完成教育事实和一手关系证据复核。",
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
  else if (row.disposition === "fetch_failed") acc[row.institution].fetchFailed += 1;
  else acc[row.institution].missingPortrait += 1;
  return acc;
}, {})).sort((a, b) => b.total - a.total || a.institution.localeCompare(b.institution));

const output = {
  generatedAt: "2026-09-03",
  scope: "All 177 Europe P0 candidates carried as missing_portrait in the master ledger before this continuation",
  method: "Every official profile was fetched; prior portrait-verification cache was cross-checked; only records passing current independent PI, >=2 sources, 3–5 sourced facts including education, reliable portrait, and >=1 first-party relationship were promoted.",
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
if (output.counts.total !== 177 || output.counts.ready !== 13 || output.counts.missingRelationship !== 2 || output.counts.missingProfileFactsAndRelationship !== 25 || output.counts.missingPortrait !== 7 || output.counts.fetchFailed !== 130 || output.counts.unresolvedWithoutDisposition !== 0) throw new Error(`unexpected Europe disposition counts: ${JSON.stringify(output.counts)}`);
fs.writeFileSync(path.join(root, "data/candidate-priority-p0-europe-full-disposition-2026-09-03.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output.counts, null, 2));
