import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const profileAudit = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/candidate-priority-p0-europe-profile-attempts-2026-09-03.json"),
    "utf8",
  ),
);

const readyNames = new Set([
  "Ann Copestake",
  "Carl Henrik Ek",
  "Damon Wischik",
  "Ian Wassell",
  "Jon Crowcroft",
  "Martin Kleppmann",
  "Paula Buttery",
  "Robert Mullins",
  "Robert Watson",
  "Simon Moore",
]);

const cohort = profileAudit.records.filter(
  (row) => row.currentDisposition === "missing_portrait" && row.portrait?.status === "verified_512",
);

const records = cohort.map((row) => {
  if (readyNames.has(row.name)) {
    return {
      canonicalKey: row.canonicalKey,
      name: row.name,
      institution: row.institution,
      profileUrl: row.profileUrl,
      portraitPath: row.portrait.localPath,
      disposition: "ready_batch_7",
      blocker: null,
    };
  }

  const networkHint = row.automatedPageHints?.networkTermsPresent;
  return {
    canonicalKey: row.canonicalKey,
    name: row.name,
    institution: row.institution,
    profileUrl: row.profileUrl,
    portraitPath: row.portrait.localPath,
    disposition: networkHint
      ? "deferred_manual_fact_and_network_mapping"
      : "blocked_missing_first_party_network_evidence",
    blocker: networkHint
      ? "官方头像和页面均已取得，页面存在教育/关系关键词，但尚未人工建立逐条事实到来源的映射，也未核验可发布的具体师承、学生、团队或产业关系。"
      : "官方头像与教育关键词已取得，但缓存的官方个人页未出现可直接支持具体师承、学生、团队或产业关系的文本；需要继续检索第一方实验室、学生、论文或项目页面。",
  };
});

const byDisposition = Object.fromEntries(
  [...new Set(records.map((row) => row.disposition))]
    .sort()
    .map((key) => [key, records.filter((row) => row.disposition === key).length]),
);

const output = {
  generatedAt: "2026-09-03",
  scope: "Europe P0 candidates with a verified 512x512 portrait but not previously published before batch 7",
  total: records.length,
  byDisposition,
  records,
};

const outputPath = path.join(
  root,
  "data/candidate-priority-p0-europe-batch-7-review-2026-09-03.json",
);
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: records.length, byDisposition }, null, 2));
