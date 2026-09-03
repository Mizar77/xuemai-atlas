import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const previous = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/candidate-priority-p0-europe-batch-8-review-2026-09-03.json"),
    "utf8",
  ),
);

const readyNames = new Set([
  "Clément Pit-Claudel",
  "Ken Holstein",
  "Ola Svensson",
  "Paolo Ienne",
  "Cengiz Oztireli",
  "Rafal Mantiuk",
  "Sean Holden",
  "Weiwei Sun",
]);

const blockers = new Map([
  ["Alan Blackwell", "缺少由第一方履历直接支持的教育/博士训练事实，以及能明确写成‘由其指导’的具名当前或已毕业学生记录。"],
  ["Alice Hutchings", "Cambridge faculty 页面能确认现职，但尚缺第一方教育/博士训练履历；本轮未找到同时明确指导关系的具名学生页面。"],
  ["Andrew Moore", "Cambridge faculty 页面能确认现职，但尚缺可直接支持学历/博士训练的第一方履历，以及具名导师或学生关系记录。"],
  ["Anuj Dawar", "尚缺把学位、博士训练逐项落到第一方来源的履历；Cambridge 名录页不足以单独支持一条具体师承或学生关系。"],
  ["David Greaves", "尚缺可直接支持教育与学术训练的第一方 CV/机构履历，以及具名学生、导师或团队成员的明确关系页。"],
  ["Dong Ma", "现职与研究方向已有 Cambridge 页面支持，但尚缺第一方教育/博士训练履历；导师数据库中尚未核验到可发布的具名指导记录。"],
  ["Jamie Vicary", "尚缺从第一方 CV/机构履历核验的教育与博士训练事实，并缺一条明确到具名学生或导师的关系证据。"],
  ["Jeremy Yallop", "现职与研究范围可核验，但尚缺第一方教育/博士训练来源和具名学生/导师关系页。"],
  ["Jon Sterling", "现职与研究范围可核验，但尚缺可直接支持学历/博士训练的第一方履历，以及具名指导或师承记录。"],
  ["Katie Seaborn", "已有官方个人页与头像，但本轮未核验到明确写出指导方向的具名学生、导师、长期合作或产业关系；不能用泛化团队描述替代。"],
  ["Marcelo Fiore", "尚缺一份能逐项支持教育与博士训练的第一方履历，并缺当前可直接映射到具名学生/导师的关系记录。"],
  ["Markus Kuhn", "Cambridge 博士数据库可支持其 Ross Anderson 博士谱系，但若在独立批次发布还需补齐可解析的一手教育履历，并为外部导师端点建立完整人物记录。"],
  ["Neel Krishnaswami", "尚缺第一方教育/博士训练履历；本轮未找到可直接支持的具名当前学生或师承关系页。"],
  ["Richard Mortier", "现职页面不足以支持完整教育训练事实；仍缺具名学生、导师或产业合作关系的一手页面。"],
  ["Robert Harle", "尚缺能直接支持学历/博士训练的第一方履历，并缺可映射为具名学生/导师关系的公开记录。"],
  ["Srinivasan Keshav", "Cambridge 页面可确认现职，但尚缺完整第一方教育训练来源；本轮也未闭环具名学生/导师关系。"],
  ["Thomas Sauerwald", "尚缺可逐项支持学位和博士训练的第一方履历，以及具名当前/历届博士生或师承记录。"],
  ["Tobias Grosser", "现职和研究范围可核验，但尚缺第一方教育/博士训练履历与可直接发布的具名师承、学生或团队关系。"],
]);

const records = previous.records.map((row) => {
  if (readyNames.has(row.name)) {
    return { ...row, disposition: "ready_batch_9", blocker: null, missingEvidence: [] };
  }
  if (row.disposition !== "deferred_manual_fact_and_network_mapping") return row;
  const blocker = blockers.get(row.name);
  if (!blocker) throw new Error(`Missing batch 9 blocker disposition for ${row.name}`);
  return {
    ...row,
    disposition: "blocked_batch_9_specific_evidence_gap",
    blocker,
    missingEvidence: blocker.includes("教育")
      ? ["first_party_education_or_training_fact", "specific_first_party_network_evidence"]
      : ["specific_first_party_network_evidence"],
  };
});

const byDisposition = Object.fromEntries(
  [...new Set(records.map((row) => row.disposition))]
    .sort()
    .map((key) => [key, records.filter((row) => row.disposition === key).length]),
);

const output = {
  generatedAt: "2026-09-03",
  scope: "Europe P0 portrait-ready cohort reviewed through batch 9",
  policy: "Only publish current independent PIs with two sources, 3–5 sourced facts including exact 教育与学术训练, a verified 512×512 portrait, and a concrete first-party network record.",
  total: records.length,
  byDisposition,
  batch9ReadyNames: [...readyNames],
  batch9BlockedNames: [...blockers.keys()],
  records,
};

const outputPath = path.join(
  root,
  "data/candidate-priority-p0-europe-batch-9-review-2026-09-03.json",
);
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: records.length, byDisposition }, null, 2));
