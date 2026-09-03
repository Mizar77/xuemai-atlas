import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "data/candidate-priority-p0-hk-sg-third-round-disposition-2026-09-03.json");
const outputPath = path.join(root, "data/candidate-priority-p0-hk-sg-fourth-round-disposition-2026-09-03.json");
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const candidates = input.records.filter((row) => row.disposition === "missing_relationship");

const ready = new Map(Object.entries({
  "Eric Chi Lik Lo": "eric-lo-cuhk-p0-r4",
  "Henry Hong Xu": "henry-hong-xu-cuhk-p0-r4",
  "Shaohua Li": "shaohua-li-cuhk-p0-r4",
  "Songtao Lu": "songtao-lu-cuhk-p0-r4",
  "Wei Meng": "wei-meng-cuhk-p0-r4",
  "Yu Li": "yu-li-cuhk-p0-r4",
  "Prof HOU, Junhui David 侯軍輝": "junhui-hou-cityu-p0-r4",
  "Prof. LIU Ninghao": "ninghao-liu-polyu-p0-r4",
  "KIM Seungnyun": "seungnyun-kim-sutd-p0-r4",
}));

const localPortraits = {
  "Eric Chi Lik Lo": "portraits/candidate-p0-hk-sg-fourth-round-2026/eric-lo.png",
  "Henry Hong Xu": "portraits/candidate-p0-hk-sg-fourth-round-2026/henry-xu.png",
  "Shaohua Li": "portraits/candidate-p0-hk-sg-fourth-round-2026/shaohua-li.png",
  "Songtao Lu": "portraits/candidate-p0-hk-sg-fourth-round-2026/songtao-lu.png",
  "Wei Meng": "portraits/candidate-p0-hk-sg-fourth-round-2026/wei-meng.png",
  "Yu Li": "portraits/candidate-p0-hk-sg-fourth-round-2026/yu-li.png",
  "Prof HOU, Junhui David 侯軍輝": "portraits/candidate-p0-hk-sg-fourth-round-2026/junhui-hou.png",
  "Prof. LIU Ninghao": "portraits/candidate-p0-hk-sg-fourth-round-2026/ninghao-liu.png",
  "KIM Seungnyun": "portraits/candidate-p0-hk-sg-second-round-2026/kimseungnyun.png",
};

const relationUrls = {
  "Eric Chi Lik Lo": "https://publications.systems.ethz.ch/author/280/Eric%20Lo",
  "Henry Hong Xu": "https://researchportal.hkust.edu.hk/en/publications/software-defined-network-assimilation-bridging-the-last-mile-towa/",
  "Shaohua Li": "https://www.cse.cuhk.edu.hk/people/faculty/shaohuali/",
  "Songtao Lu": "https://www.cse.cuhk.edu.hk/people/faculty/songtao-lu/",
  "Wei Meng": "https://www.cse.cuhk.edu.hk/people/faculty/wei-meng/",
  "Yu Li": "https://www.nature.com/articles/s43588-025-00887-6",
  "Prof HOU, Junhui David 侯軍輝": "https://openaccess.thecvf.com/content_CVPR_2020/html/Jin_Light_Field_Spatial_Super-Resolution_via_Deep_Combinatorial_Geometry_Embedding_and_CVPR_2020_paper.html",
  "Prof. LIU Ninghao": "https://ninghaohello.github.io/PUBLICATION.html",
  "KIM Seungnyun": "https://s-space.snu.ac.kr/handle/10371/186844?mode=full",
};

// The first 49 ledger rows are the highest-ranked Hong Kong candidates. Kim is
// substituted as row 50 because the prior round had already secured her local
// official portrait, making the relationship check particularly high-yield.
const priorityKeys = new Set(candidates.slice(0, 49).map((row) => row.canonicalKey));
const kim = candidates.find((row) => row.name === "KIM Seungnyun");
if (kim) priorityKeys.add(kim.canonicalKey);

const records = candidates.map((row) => {
  const priorityReview = priorityKeys.has(row.canonicalKey);
  if (ready.has(row.name)) {
    return {
      ...row,
      previousDisposition: "missing_relationship",
      disposition: "ready",
      atlasPersonId: ready.get(row.name),
      localPortrait: localPortraits[row.name],
      fourthRoundPriorityReview: true,
      checkedSources: [...row.checkedSources, { url: relationUrls[row.name], kind: "fourth_round_first_party", result: "relationship_verified" }],
      reason: "第四轮以官方个人页/博士论文页/机构仓储或可唯一定位作者的论文页形成明确师承或合作端点；现任独立 PI、两项可靠来源、3–5 条带来源事实、可靠本地头像与至少一条可建边关系均通过严格门槛。",
    };
  }
  return {
    ...row,
    previousDisposition: "missing_relationship",
    disposition: "missing_relationship",
    fourthRoundPriorityReview: priorityReview,
    reason: priorityReview
      ? "第四轮已按影响力、资料完整度与头像可得性优先复核个人主页/CV/博士论文、官方研究组与论文页；仍未取得可同时唯一识别关系对象、关系类型和具体证据对象的一手材料，因此不建边。"
      : "第四轮未列入 50 位高收益深度补证窗口；沿用第三轮关系证据缺口，后续仍需从 CV/论文库/官方研究组或项目页取得可唯一定位的关系证据。",
  };
});

const dispositionCounts = Object.fromEntries([...new Set(records.map((row) => row.disposition))].sort().map((status) => [status, records.filter((row) => row.disposition === status).length]));
const regionCounts = Object.fromEntries([...new Set(records.map((row) => row.region))].sort().map((region) => [region, records.filter((row) => row.region === region).length]));
const output = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  scope: "All 171 Hong Kong and Singapore P0 candidates left in missing_relationship after third-round review; 50 high-yield candidates received fourth-round deep review",
  strictGate: "current independent PI; >=2 reliable sources; 3-5 sourced facts including education/career; reliable local portrait; >=1 first-party-verifiable lineage/student/collaboration/project/group relation",
  reviewed: records.length,
  fourthRoundPriorityReviewed: records.filter((row) => row.fourthRoundPriorityReview).length,
  newlyReadyCount: records.filter((row) => row.disposition === "ready").length,
  dispositionCounts,
  regionCounts,
  records,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, reviewed: output.reviewed, fourthRoundPriorityReviewed: output.fourthRoundPriorityReviewed, dispositionCounts, regionCounts }, null, 2));
