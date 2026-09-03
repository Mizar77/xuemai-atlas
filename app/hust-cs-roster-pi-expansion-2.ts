import type { Person, Source } from "./data";

const checkedAt = "2026-09-02";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const rosterSource = official(
  "华中科技大学计算机学院教师名录",
  "http://www.cs.hust.edu.cn/szdw/jsml/axmpyszmlb.htm",
  "计算机学院当前教师名录中的姓名与教师主页入口",
);

type Seed = {
  id: string;
  name: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  profileUrl: string;
  portraitExt?: "jpg";
  facts: Array<{ label: string; value: string }>;
  x: number;
  y: number;
};

function person(seed: Seed): Person {
  const profileSource = official(
    `华中科技大学教师主页 — ${seed.name}`,
    seed.profileUrl,
    "当前任职、研究方向、教育和工作经历、公开师承或产业合作信息，以及页面发布的单人头像",
  );

  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: "HUST",
    region: "Mainland China",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: seed.facts.map((fact) => ({ ...fact, source: profileSource })),
    stage: seed.stage,
    category: "core",
    status: "current PI · HUST CS official roster verified",
    sources: [profileSource, rosterSource],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/hust-cs-roster-2026/${seed.id}.${seed.portraitExt ?? "jpg"}`,
      alt: `${seed.name} 华中科技大学官方教师头像`,
      source: profileSource,
    },
  };
}

export const hustCsRosterPiExpansion2People: Person[] = [
  person({
    id: "ding-junwen-hust",
    name: "丁俊文",
    role: "副教授 · 博士生导师",
    area: "Intelligent Optimization · Scheduling · AI-assisted Operations Research",
    tags: ["智能优化", "调度", "启发式算法", "运筹优化", "LLM for OR"],
    summary: "华中科技大学计算机学院智能决策与系统优化 PI，研究启发式优化、复杂调度以及 AI/LLM 赋能的运筹求解。",
    stage: "emerging",
    profileUrl: "http://faculty.hust.edu.cn/dingjunwen1/zh_CN/index.htm",
    facts: [
      { label: "当前任职", value: "华中科技大学计算机学院副教授、博士生导师。" },
      { label: "研究主线", value: "启发式优化、制造系统调度与优化、复杂系统建模，以及 AI/LLM 赋能的优化求解。" },
      { label: "教育与学术训练", value: "2017 年获华中科技大学工学博士学位，官方主页明确写明博士导师为吕志鹏教授；随后在本院从事博士后研究，合作导师为李初民教授。" },
      { label: "国际经历", value: "2016–2018 年曾在德国奥托贝森管理学院与德累斯顿工业大学从事研究。" },
      { label: "学生与产业去向", value: "官方主页公开团队方向及工业应用目标，但未列出可逐人核验的毕业学生去向；暂保留待核验。" },
      { label: "为什么值得关注", value: "其研究把经典组合优化、机器学习和大模型连接到制造与复杂决策系统。" },
    ],
    x: 840,
    y: 300,
  }),
  person({
    id: "huang-keke-hust",
    name: "黄柯柯",
    role: "教授 · 博士生导师 · 硕士生导师",
    area: "Data Management · Graph Neural Networks · Large Language Models · AI for Science",
    tags: ["数据管理", "图神经网络", "大模型", "近似算法", "AI for Science"],
    summary: "华中科技大学计算机学院教授，研究数据管理、近似算法、图神经网络和大模型，并向 AI for Science 延伸。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/huangkeke/zh_CN/index.htm",
    facts: [
      { label: "当前任职", value: "华中科技大学计算机学院教授、博士生导师、硕士生导师。" },
      { label: "研究主线", value: "数据管理与分析、近似算法、图神经网络、大模型方法与 AI for Science。" },
      { label: "教育与学术训练", value: "本科毕业于华中科技大学，2019 年在南洋理工大学完成博士训练。" },
      { label: "职业轨迹", value: "曾在新加坡国立大学任研究员、在英属哥伦比亚大学从事博士后研究，并长期访问剑桥大学人工智能团队。" },
      { label: "学生与产业去向", value: "当前官方主页未公开可逐人核验的毕业学生去向或稳定企业任职记录；暂不推断。" },
      { label: "为什么值得关注", value: "其方法横跨数据系统、图学习和基础模型，连接数据库与现代 AI 两个共同体。" },
    ],
    x: 980,
    y: 300,
  }),
  person({
    id: "chen-yao-hust",
    name: "陈瑶",
    role: "教授 · 博士生导师 · 硕士生导师",
    area: "AI Systems · Domain-specific Architecture · Hardware–Software Co-design · EDA",
    tags: ["AI 系统", "专用架构", "软硬协同", "EDA", "图计算"],
    summary: "华中科技大学计算机学院 AI 系统教授，连接专用计算架构、软硬协同、EDA 与大规模图学习部署。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/chenyao_cs/zh_CN/index/2699631/list/index.htm",
    facts: [
      { label: "当前任职", value: "2026 年加入华中科技大学任教授；此前任新加坡国立大学计算机学院研究助理教授。" },
      { label: "研究主线", value: "超智融合体系结构、专用计算架构软硬协同设计和电子设计自动化。" },
      { label: "教育与学术训练", value: "2016 年获南开大学博士学位；2013–2015 年在 UIUC 电子与计算机工程方向联合培养。" },
      { label: "职业轨迹", value: "博士后曾在 UIUC 高级数字科学研究中心（新加坡）历任高级研究工程师、研究科学家并负责数据分析与硬件团队。" },
      { label: "产业连接", value: "官方主页记录其图随机游走系统进入 ByteDance TikTok 产品，模型压缩成果获企业授权，相关高能效检测模型被 NVIDIA 开发者论坛收录。" },
      { label: "学生去向", value: "当前官方主页未公布可逐人核验的毕业学生名单与现职；暂保留待补。" },
      { label: "为什么值得关注", value: "其公开轨迹同时覆盖高校 PI、研究中心团队管理与互联网产品部署，是 AI 系统产业化的明确连接点。" },
    ],
    x: 1120,
    y: 300,
  }),
  person({
    id: "hu-long-hust",
    name: "胡龙",
    role: "教授 · 博士生导师",
    area: "Affective Computing · Multimodal Foundation Models · Reinforcement Learning",
    tags: ["情感计算", "多模态大模型", "强化学习", "抑郁症干预", "博弈智能"],
    summary: "华中科技大学计算机学院教授，研究情感计算、多模态大模型、抑郁症诊疗与强化学习博弈决策。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/hulong/zh_CN/index/585065/list/index.htm",
    facts: [
      { label: "当前任职", value: "2026 年起任华中科技大学计算机学院教授、博士生导师。" },
      { label: "研究主线", value: "情感计算、抑郁症诊疗与干预、多模态大模型，以及基于深度强化学习的博弈、决策、对抗和协同。" },
      { label: "教育与学术训练", value: "在华中科技大学完成本科、硕士和博士训练，2017 年获工学博士学位。" },
      { label: "项目与产业连接", value: "官方简介记录其近五年主持国家重点研发计划课题、国家自然科学基金及十余项军口或横向项目。" },
      { label: "学生去向", value: "当前官方主页未公开可逐人核验的毕业学生现职；暂不从论文作者顺序推断。" },
      { label: "为什么值得关注", value: "其研究将多模态基础模型与心理健康、边缘系统和对抗决策连接到实际项目。" },
    ],
    x: 840,
    y: 440,
  }),
  person({
    id: "gan-zaobin-hust",
    name: "甘早斌",
    role: "副教授 · 硕士生导师",
    area: "Natural Language Processing · Knowledge Graphs · Question Answering · Big Data",
    tags: ["自然语言处理", "知识图谱", "自动问答", "大数据", "网络应用"],
    summary: "华中科技大学计算机学院 NLP 与知识图谱 PI，长期研究自动问答、大数据分析和网络应用。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/ganzaobin/zh_CN/index.htm",
    facts: [
      { label: "当前任职", value: "华中科技大学计算机学院副教授、硕士生导师。" },
      { label: "研究主线", value: "自然语言处理、知识图谱与自动问答、大数据分析，以及计算机和网络应用技术。" },
      { label: "教育与学术训练", value: "哈尔滨工业大学本科，华中科技大学硕士与博士；2003 年获工学博士学位。" },
      { label: "国际经历", value: "2004–2006 年在 Macquarie University 计算机系从事访问研究。" },
      { label: "产业连接", value: "官方主页记录其主持各类大型企业横向科研项目 30 余项，但未公开可逐项归属到具体公司的清单。" },
      { label: "学生去向", value: "当前官方主页未列出可逐人核验的毕业学生及现职；保持待核验。" },
      { label: "为什么值得关注", value: "其工作把知识图谱与问答方法连接到长期企业合作，是华科 NLP 应用侧的持续节点。" },
    ],
    x: 980,
    y: 440,
  }),
];
