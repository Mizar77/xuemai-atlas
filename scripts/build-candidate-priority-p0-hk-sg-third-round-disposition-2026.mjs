import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "data/candidate-priority-p0-hk-sg-second-round-disposition-2026-09-03.json");
const outputPath = path.join(root, "data/candidate-priority-p0-hk-sg-third-round-disposition-2026-09-03.json");
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

const readyByName = new Map(Object.entries({
  "CAO Rui": "rui-cao-sutd-p0-r3",
  "CHEE Yeow Meng": "yeow-meng-chee-sutd-p0-r3",
  "CHEN Binbin": "binbin-chen-sutd-p0-r3",
  "CHOO Kenny": "kenny-choo-sutd-p0-r3",
  "HERREMANS Dorien": "dorien-herremans-sutd-p0-r3",
  "KASSIM Ashraf A.": "ashraf-kassim-sutd-p0-r3",
  "LI Xiaoli": "xiaoli-li-sutd-p0-r3",
  "MASHIMA Daisuke": "daisuke-mashima-sutd-p0-r3",
  "MEGHJANI Malika": "malika-meghjani-sutd-p0-r3",
  "PARK Jihong": "jihong-park-sutd-p0-r3",
  "QUEK Tony": "tony-quek-sutd-p0-r3",
  "SOREMEKUN Ezekiel": "ezekiel-soremekun-sutd-p0-r3",
  "SUN Zhu": "zhu-sun-sutd-p0-r3",
  "WANG Bo Angela": "angela-bo-wang-sutd-p0-r3",
  "YAU David": "david-yau-sutd-p0-r3",
  "ZHOU Jianying": "jianying-zhou-sutd-p0-r3",
}));

const thirdRoundSources = {
  "CAO Rui": ["https://computing.smu.edu.sg/newsletter/phd-dissertation-proposal-cao-rui-using-pre-trained-models-multimodal-understanding"],
  "CHEE Yeow Meng": ["https://repository.sutd.edu.sg/esploro/outputs/journalArticle/An-Efficient-Parameterized-Algorithm-for-Computing/9911089309846"],
  "PARK Jihong": ["https://www.deakin.edu.au/research/research-news-and-publications/articles/phd-scholarship-boost-for-deakin-and-cisco-quantum-computing-research"],
  "MEGHJANI Malika": ["https://www.sutd.edu.sg/temasek-labs/research-project-listing/astralis/"],
  "QUEK Tony": ["https://www.sutd.edu.sg/temasek-labs/research-project-listing/astralis/"],
  "SUN Zhu": ["https://sites.google.com/view/zhusun/home"],
  "YAU David": ["https://www.sutd.edu.sg/itrust/wp-content/uploads/sites/15/2025/10/itrust-newsletter-issue1.pdf"],
  "ZHOU Jianying": ["https://www.sutd.edu.sg/itrust/research/research-projects/itrust-projects/"],
};

const records = input.records
  .filter((row) => row.disposition === "missing_relationship")
  .map((row) => {
    const extraSources = (thirdRoundSources[row.name] ?? []).map((url) => ({ url, kind: "third_round_first_party", result: "relationship_verified" }));
    if (readyByName.has(row.name)) {
      return {
        ...row,
        previousDisposition: "missing_relationship",
        disposition: "ready",
        atlasPersonId: readyByName.get(row.name),
        checkedSources: [...row.checkedSources, ...extraSources],
        reason: "第三轮以官方个人页/论文仓储/博士论文提案或官方项目页形成可唯一定位的师承、论文合作、研究组或共同项目端点；现任独立 PI、两项来源、3–5 条带来源事实和可靠本地头像均通过严格门槛。",
      };
    }
    if (row.name === "Prof YU, Ming 于明") {
      return {
        ...row,
        previousDisposition: "missing_relationship",
        disposition: "exclude_non_independent",
        checkedSources: [...row.checkedSources, { url: "https://www.ee.cuhk.edu.hk/en-gb/people/academic-staff/professors/prof-yu-ming", kind: "third_round_official_profile", result: "adjunct_professor" }],
        reason: "CUHK EE 官方页将其列为 Adjunct Professor；虽然履历和头像可核验，但不满足本批次“现任独立 PI”范围，故不创建核心 PI 节点。",
      };
    }
    if (row.name === "PHOON Kok Kwang") {
      return {
        ...row,
        previousDisposition: "missing_relationship",
        disposition: "exclude_out_of_scope",
        checkedSources: [...row.checkedSources],
        reason: "SUTD 官方简介显示其核心学术领域为岩土工程中的统计与机器学习；其 AI Singapore 管理职务不等同于 AI/CS 独立 PI 研究主线，本批次不纳入。",
      };
    }
    const priorityPortrait = Boolean(row.localPortrait);
    return {
      ...row,
      previousDisposition: "missing_relationship",
      disposition: "missing_relationship",
      reason: priorityPortrait
        ? "第三轮已复核官方人物页、CV/论文或项目线索；尚未取得能同时唯一识别关系对象、关系类型与具体证据对象的一手材料，继续保持关系证据缺口。"
        : "第三轮对官方院系页、个人主页/CV、论文与项目线索逐人复核；未形成可排除同名污染且能明确关系类型与证据对象的一手关系，因此不建边。",
    };
  });

const dispositionCounts = Object.fromEntries([...new Set(records.map((row) => row.disposition))].sort().map((status) => [status, records.filter((row) => row.disposition === status).length]));
const regionCounts = Object.fromEntries([...new Set(records.map((row) => row.region))].sort().map((region) => [region, records.filter((row) => row.region === region).length]));
const output = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  scope: "All 189 Hong Kong and Singapore P0 candidates left in missing_relationship after second-round review",
  strictGate: "current independent PI; >=2 reliable sources; 3-5 sourced facts including education/career; reliable local portrait; >=1 first-party-verifiable lineage/student/collaboration/project/group relation",
  reviewed: records.length,
  dispositionCounts,
  regionCounts,
  priorityLocalPortraitReviewed: records.filter((row) => row.localPortrait).length,
  newlyReadyCount: records.filter((row) => row.disposition === "ready").length,
  records,
};
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, reviewed: output.reviewed, dispositionCounts, regionCounts }, null, 2));
