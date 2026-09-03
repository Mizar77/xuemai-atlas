import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const reviewedAt = "2026-09-03";

const sourceFiles = [
  "hkust-cse-2026-09-02.json",
  "hust-aia-2026-09-02.json",
  "hust-cs-2026-09-02.json",
  "hust-sse-2026-09-02.json",
  "nus-computing-next-batch-2026-09-03.json",
  "pku-cs-2026-09-02.json",
  "thu-cs-next-batch-2026-09-03.json",
  "thu-automation-next-batch-2026-09-03.json",
  "thu-air-next-batch-2026-09-03.json",
  "ntu-ccds-next-batch-2026-09-03.json",
];

const includeIds = new Map([
  ["Tim Kwang-Ting CHENG", "tim-cheng-hkust-pending-resolution"],
  ["Yuan XIE", "yuan-xie-hkust-pending-resolution"],
  ["Hongbo FU", "hongbo-fu-hkust-pending-resolution"],
  ["Sai-Kit YEUNG", "sai-kit-yeung-hkust-pending-resolution"],
  ["Xiaomeng LI", "xiaomeng-li-hkust-pending-resolution"],
  ["Ling PAN", "ling-pan-hkust-pending-resolution"],
  ["Qijia SHAO", "qijia-shao-hkust-pending-resolution"],
  ["Janet Hui-wen HSIAO", "janet-hsiao-hkust-pending-resolution"],
  ["蒋建华", "jianhua-jiang-hust-pending-resolution"],
  ["沈吟东", "yindong-shen-hust-pending-resolution"],
  ["万瑶", "wanyao-hust-pending-resolution"],
  ["LI Wei", "wei-li-nus-pending-resolution"],
  ["LI Yunyi", "yunyi-li-nus-pending-resolution"],
  ["Patrick REBENTROST", "patrick-rebentrost-nus-pending-resolution"],
  ["Haixin DUAN", "haixin-duan-thu-pending-resolution"],
  ["Asst Prof Hai Dang Dau", "hai-dang-dau-ntu-pending-resolution"],
]);

const nonAi = new Set([
  "Lionel M. NI", "Tristan C. BRAUD", "Zili MENG",
  "徐永兵", "黄庆凤", "李赤松", "江敏",
  "CHEN Nan", "Olivier DANVY", "LEE Jiho", "LIU Na", "QUEK Yihui", "Oleh STUPAK",
  "何强", "李国宽",
]);

const nonPi = new Set([
  "徐飞", "FOONG Sew Bun", "初旭", "谢正茂", "杨春", "张腾::pku",
  "刘莉扬", "黄航", "纪俊文", "张晓今", "赵进", "欧阳由", "熊传光", "周军龙", "朱文玄", "姚鹏程",
]);

const historical = new Set(["赵峰"]);
const industryOnly = new Set(["周淳"]);

function key(file, record) {
  if (file === "pku-cs-2026-09-02.json" && record.name === "张腾") return "张腾::pku";
  return record.name;
}

function resolution(file, record) {
  const recordKey = key(file, record);
  if (file === "hust-cs-2026-09-02.json" && record.name === "张腾") {
    return {
      decision: "include_new_pi",
      atlasPersonId: "zhang-teng-hust-pending-resolution",
      reason: "学院名录与官方教师主页共同确认其为在职副教授；机器学习与数据挖掘研究主线符合范围。人物资料与本地头像已在独立 expansion 模块准备。",
    };
  }
  if (includeIds.has(record.name)) {
    return {
      decision: "include_new_pi",
      atlasPersonId: includeIds.get(record.name),
      reason: "院系名录与第二个一手个人/中心页面共同确认：现任独立教师或中心 PI，研究主线属于 AI、机器学习、计算机视觉、可信 AI、强化学习或紧密相邻的智能计算。人物资料与本地头像已在独立 expansion 模块准备。",
    };
  }
  if (nonAi.has(record.name)) {
    return {
      decision: "excluded_non_ai_cs",
      reason: record.name === "李国宽"
        ? "华中科技大学 2024 年校内新闻确认其为副教授、PDSL 教师；公开研究主线为分布式大数据存储、文件系统和智能存储系统，属于计算机系统而非本轮 AI/NLP/CV/ML 主线。"
        : "官方现职可确认，但其公开研究主线为系统/网络、软件工程、信息系统、认知科学、量子信息或 HCI 基础设施，未达到本轮 AI/NLP/CV/ML 主线纳入门槛。",
      ...(record.name === "李国宽" ? {
        verificationSources: [
          "https://news.hust.edu.cn/info/1002/48845.htm",
          "https://wnlo.hust.edu.cn/info/1097/12267.htm",
        ],
      } : {}),
    };
  }
  if (nonPi.has(recordKey)) {
    return {
      decision: "excluded_non_pi",
      reason: record.name === "刘莉扬"
        ? "清华自动化官方个人页只有姓名与研究所归属，未给职称、独立招生或研究组领导证据；校内新闻仅称‘教师’，不能据此认定独立 PI。"
        : record.name === "姚鹏程"
          ? "华中科技大学服务计算实验室官方校友记录确认其为 2015 级博士、2022 年毕业，导师金海；教师主页只列 2023–2024 博士后经历且当前职称留空，因此不能认定为现任独立 PI。"
          : "官方名录职称为助理研究员/副研究员/实践教授，或个人页未显示可独立招生与研究组领导资格，因此不按现任独立 PI 纳入。",
      ...(record.name === "姚鹏程" ? {
        verificationSources: [
          "https://grid.hust.edu.cn/syswh/syszj.htm",
          "http://faculty.hust.edu.cn/yaopengcheng1/zh_CN/index.htm",
        ],
      } : {}),
    };
  }
  if (historical.has(record.name)) {
    return {
      decision: "excluded_historical",
      reason: "清华 AIR 官方履历把该研究院首席科学家任期写为 2021–2025；同时列出 2020–至今的投资合伙人任职，因此截至本轮核验不再作为 AIR 现任 PI。",
    };
  }
  if (industryOnly.has(record.name)) {
    return {
      decision: "excluded_industry_only",
      reason: "公司公开发行/高管履历披露其 2021 年已在学校办理离岗创业，现任达梦数据高级副总经理兼董事会秘书；不按现任独立学术 PI 纳入。",
    };
  }
  return {
    decision: "pending_profile_verification",
    reason: "冻结名录只有姓名，或个人页虽给出 AI/ML 研究方向但没有可核验的职称、独立招生/研究组领导证据。已尝试院系主页与教师主页；在获得第二个一手现职页面前不推断 PI 身份。",
  };
}

const decisions = [];
for (const file of sourceFiles) {
  const inputPath = path.join(root, "data/roster-decisions", file);
  const json = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  for (const record of json.decisions.filter((entry) => String(entry.decision).startsWith("pending_"))) {
    const fixed = resolution(file, record);
    decisions.push({
      ...record,
      previousDecision: record.decision,
      ...fixed,
      reviewedAt,
      supersedesDecisionFile: `data/roster-decisions/${file}`,
    });
  }
}

const counts = decisions.reduce((acc, entry) => {
  acc[entry.decision] = (acc[entry.decision] || 0) + 1;
  return acc;
}, {});

if (decisions.length !== 52) throw new Error(`Expected 52 Asian pending records, found ${decisions.length}`);

const output = {
  schemaVersion: 1,
  batchId: "asia-pending-resolution-2026-09-03",
  reviewedAt,
  scope: "All pending person decisions from the frozen Mainland China, Hong Kong, and Singapore decision artifacts listed in sourceDecisionFiles.",
  sourceDecisionFiles: sourceFiles.map((file) => `data/roster-decisions/${file}`),
  decisionCount: decisions.length,
  counts,
  unresolvedPolicy: "No independent-PI inference from publication authorship, grant participation, an undifferentiated faculty list, or title-free profile pages.",
  decisions,
};

const outPath = path.join(root, "data/roster-decisions/asia-pending-resolution-2026-09-03.json");
fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outPath, decisionCount: decisions.length, counts }, null, 2));
