import { readFileSync, writeFileSync } from "node:fs";

const master = JSON.parse(readFileSync("data/candidate-priority-p0-master-disposition-2026-09-03.json", "utf8"));
const names = [
  "姜少峰", "宋国杰", "崔锦实", "曲天书", "曾钢", "李红燕", "查红彬", "楚梦渝", "童云海", "罗定生", "英向华", "袁晓如", "裴玉茹", "谭营", "赵卉菁", "马修军", "黄铁军", "邓小铁",
  "刘云浩", "冯建江", "陶建华", "吴澄", "李衍达", "周东华", "贾庆山", "赵千川", "王凌",
  "李健", "陈全", "柯晶", "郭捷", "王士林", "吕宝粮", "张丽清", "杨小康", "张拳石",
  "巫英才", "王越", "王文冠", "张寅",
];
const ready = new Map([
  ["冯建江", "jianjiang-feng-thu-p0-fourth-b1"], ["陶建华", "jianhua-tao-thu-p0-fourth-b1"], ["巫英才", "yingcai-wu-zju-p0-fourth-b1"], ["王文冠", "wenguan-wang-zju-p0-fourth-b1"],
  ["袁晓如", "xiaoru-yuan-pku-p0-fourth-b1"], ["宋国杰", "guojie-song-pku-p0-fourth-b1"], ["黄铁军", "tiejun-huang-pku-p0-fourth-b1"], ["吕宝粮", "baoliang-lu-sjtu-p0-fourth-b1"],
  ["张拳石", "quanshi-zhang-sjtu-p0-fourth-b1"], ["杨小康", "xiaokang-yang-sjtu-p0-fourth-b1"],
]);
const rows = names.map((name) => {
  const source = master.records.find((row) => row.region === "Mainland China" && row.name === name);
  if (!source) throw new Error(`master candidate missing: ${name}`);
  if (ready.has(name)) return { ...source, priorStatus: source.status ?? source.disposition, disposition: "ready", atlasPersonId: ready.get(name), reason: "第四轮逐人补证已核实现任独立 PI、两项以上可靠来源、3–5 条带来源事实、512×512 可靠头像及至少一条一手可核验关系。" };
  if (name === "刘云浩") return { ...source, priorStatus: source.status ?? source.disposition, disposition: "identity_disambiguation_required", atlasPersonId: null, reason: "清华自动化系同名人物的教育经历与知名物联网学者刘云浩不一致；需先完成同名身份消歧，禁止迁移外部导师关系。" };
  return { ...source, priorStatus: source.status ?? source.disposition, disposition: "missing_relationship", atlasPersonId: null, reason: "现任 PI 与名录来源已定位，但本轮未找到可由本人 CV、博士论文库、研究组 alumni 或官方项目页直接确认且端点可接入的关系证据；继续待核验。" };
});
const counts = rows.reduce((acc, row) => ({ ...acc, [row.disposition]: (acc[row.disposition] ?? 0) + 1 }), {});
const out = { schemaVersion: 1, generatedAt: "2026-09-03", scope: "Mainland China P0 fourth-pass high-yield frozen cohort", frozenCandidateCount: rows.length, reviewedCandidateCount: rows.length, dispositionCounts: counts, records: rows };
writeFileSync("data/candidate-priority-p0-mainland-fourth-pass-cohort-40-2026-09-03.json", `${JSON.stringify({ generatedAt: out.generatedAt, candidateCount: rows.length, canonicalKeys: rows.map((row) => row.canonicalKey) }, null, 2)}\n`);
writeFileSync("data/candidate-priority-p0-mainland-fourth-pass-disposition-2026-09-03.json", `${JSON.stringify(out, null, 2)}\n`);
console.log(JSON.stringify({ frozen: rows.length, reviewed: rows.length, ...counts }, null, 2));
