import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json");
const outputPath = path.join(root, "data/candidate-priority-p0-hk-sg-fifth-round-disposition-2026-09-03.json");
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const candidates = input.records.filter((row) => ["Hong Kong", "Singapore"].includes(row.region) && ["missing_relationship", "missing_portrait"].includes(row.disposition));

const ready = new Map(Object.entries({
  "Prof GUAN, Nan 關楠": "nan-guan-cityu-p0-r5",
  "Prof HANCKE, Gerhard Petrus": "gerhard-hancke-cityu-p0-r5",
  "Prof JIA, Xiaohua 賈小華": "xiaohua-jia-cityu-p0-r5",
  "Prof LU, Zhenliang 盧振亮": "zhenliang-lu-cityu-p0-r5",
  "Prof WU, Dapeng 吳大鵬": "dapeng-wu-cityu-p0-r5",
  "Prof ZHAO, Qingchuan 趙晴川": "qingchuan-zhao-cityu-p0-r5",
  "Prof ZHU, Kening 朱克宁": "kening-zhu-cityu-p0-r5",
  "Prof. CHEN Changwen": "changwen-chen-polyu-p0-r5",
  "Prof. LUO Xiapu Daniel": "xiapu-luo-polyu-p0-r5",
  "Jungpil HAHN": "jungpil-hahn-nus-p0-r5",
  "OOI Wei Tsang": "wei-tsang-ooi-nus-p0-r5",
  "DONG Jin Song": "jin-song-dong-nus-p0-r5",
  "Prof Tao Dacheng": "dacheng-tao-ntu-p0-r5",
  "Prof Miao Chun Yan": "chunyan-miao-ntu-p0-r5",
}));

const portrait = Object.fromEntries([
  ["Prof GUAN, Nan 關楠", "nan-guan"], ["Prof HANCKE, Gerhard Petrus", "gerhard-hancke"], ["Prof JIA, Xiaohua 賈小華", "xiaohua-jia"],
  ["Prof LU, Zhenliang 盧振亮", "zhenliang-lu"], ["Prof WU, Dapeng 吳大鵬", "dapeng-wu"], ["Prof ZHAO, Qingchuan 趙晴川", "qingchuan-zhao"],
  ["Prof ZHU, Kening 朱克宁", "kening-zhu"], ["Prof. CHEN Changwen", "changwen-chen"], ["Prof. LUO Xiapu Daniel", "xiapu-luo"],
  ["Jungpil HAHN", "jungpil-hahn"], ["OOI Wei Tsang", "wei-tsang-ooi"], ["DONG Jin Song", "jin-song-dong"],
  ["Prof Tao Dacheng", "dacheng-tao"], ["Prof Miao Chun Yan", "chunyan-miao"],
].map(([name, file]) => [name, `portraits/candidate-p0-hk-sg-fifth-round-2026/${file}.png`]));

const relationUrl = {
  "Prof GUAN, Nan 關楠": "https://scholars.cityu.edu.hk/en/persons/nanguan/",
  "Prof HANCKE, Gerhard Petrus": "https://scholars.cityu.edu.hk/en/publications/tangible-security-survey-of-methods-supporting-secure-ad-hoc-conn/",
  "Prof JIA, Xiaohua 賈小華": "https://scholars.cityu.edu.hk/en/projects/trustworthy-large-language-models-a-multifaceted-strategy-for-tru/",
  "Prof LU, Zhenliang 盧振亮": "https://scholars.cityu.edu.hk/en/persons/zhenlilu/",
  "Prof WU, Dapeng 吳大鵬": "https://scholars.cityu.edu.hk/en/persons/dapengwu/",
  "Prof ZHAO, Qingchuan 趙晴川": "https://scholars.cityu.edu.hk/en/persons/qizhao/",
  "Prof ZHU, Kening 朱克宁": "https://scholars.cityu.edu.hk/en/persons/kening-zhu(5a5d8783-8153-4acb-b3a7-7f1a103d0cfc).html",
  "Prof. CHEN Changwen": "https://openaccess.thecvf.com/content/CVPR2024/html/Zhu_SD-DiT_Unleashing_the_Power_of_Self-supervised_Discrimination_in_Diffusion_Transformer_CVPR_2024_paper.html",
  "Prof. LUO Xiapu Daniel": "https://www.polyu.edu.hk/comp/people/academic-staff/prof-luo-xiapu-daniel/",
  "Jungpil HAHN": "https://www.comp.nus.edu.sg/disa/people/jungpil",
  "OOI Wei Tsang": "https://www.comp.nus.edu.sg/~ooiwt/students.html",
  "DONG Jin Song": "https://www.comp.nus.edu.sg/~dongjs/",
  "Prof Tao Dacheng": "https://www.sydney.edu.au/AcademicProfiles/profile/resource?type=cv&urlid=dacheng.tao",
  "Prof Miao Chun Yan": "https://dr.ntu.edu.sg/server/api/core/bitstreams/e08ccb7c-4557-4ed4-bec6-48b3a1bec3b2/content",
};

const priorityNames = new Set([
  ...candidates.filter((row) => row.disposition === "missing_relationship").slice(0, 27).map((row) => row.name),
  "Prof. AU Man Ho Allen", "Prof. CAO Yixin", "Prof. CHEN Changwen", "Prof. LI Bo", "Prof. LI Qing", "Prof. LUO Xiapu Daniel", "Prof. SHI Jieming", "Prof. ZHOU Kai",
  "Prof Tao Dacheng", "Prof Miao Chun Yan", "DONG Jin Song", "Jungpil HAHN", "OOI Wei Tsang",
]);

const records = candidates.map((row) => {
  const priorityReview = priorityNames.has(row.name);
  if (ready.has(row.name)) return {
    ...row,
    previousDisposition: row.disposition,
    disposition: "ready",
    atlasPersonId: ready.get(row.name),
    localPortrait: portrait[row.name],
    fifthRoundPriorityReview: true,
    checkedSources: [...(row.checkedSources ?? []), { url: relationUrl[row.name], kind: "fifth_round_first_party", result: "relationship_verified" }],
    reason: "第五轮以官方个人页、CV、官方研究组/学生页、机构项目页或可唯一定位作者的论文页形成明确关系端点；现任独立 PI、至少两项可靠来源、3–5 条带来源事实、可靠 512×512 本地头像和至少一条可建边关系均通过严格门槛。",
  };
  return {
    ...row,
    previousDisposition: row.disposition,
    fifthRoundPriorityReview: priorityReview,
    reason: priorityReview
      ? row.disposition === "missing_portrait"
        ? "第五轮已优先复核官方名录与个人页，但仍未取得可可靠归属于本人的非占位头像，故不在缺少头像时晋级。"
        : "第五轮已优先复核个人主页/CV/博士论文、官方研究组、项目与论文页；仍未取得可同时唯一识别关系对象、关系类型和具体证据对象的一手材料，因此保持关系缺口。"
      : row.disposition === "missing_portrait"
        ? "第五轮未列入 40 位高收益深度补证窗口；沿用可靠头像缺口，后续仍需从本人或院系官方页面取得可唯一归属的非占位照片。"
        : "第五轮未列入 40 位高收益深度补证窗口；沿用关系证据缺口，后续仍需从 CV、博士论文、官方研究组、项目或论文页取得可唯一定位的关系证据。",
  };
});

const dispositionCounts = Object.fromEntries([...new Set(records.map((row) => row.disposition))].sort().map((status) => [status, records.filter((row) => row.disposition === status).length]));
const regionCounts = Object.fromEntries([...new Set(records.map((row) => row.region))].sort().map((region) => [region, records.filter((row) => row.region === region).length]));
const output = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  scope: "All 178 Hong Kong and Singapore P0 candidates remaining in missing_relationship or missing_portrait in the current master ledger; 40 high-yield candidates received fifth-round deep review",
  strictGate: "current independent PI; >=2 reliable sources; 3-5 sourced facts including education/career; reliable 512x512 local portrait; >=1 first-party-verifiable lineage/student/collaboration/project/industry relation",
  reviewed: records.length,
  fifthRoundPriorityReviewed: records.filter((row) => row.fifthRoundPriorityReview).length,
  newlyReadyCount: records.filter((row) => row.disposition === "ready").length,
  dispositionCounts,
  regionCounts,
  records,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, reviewed: output.reviewed, priorityReviewed: output.fifthRoundPriorityReviewed, dispositionCounts, regionCounts }, null, 2));
