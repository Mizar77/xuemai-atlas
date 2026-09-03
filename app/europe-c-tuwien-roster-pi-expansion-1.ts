import type { Person, Source } from "./data";

const checkedAt = "2026-09-02";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const roster = official(
  "TU Wien Informatics — Professors",
  "https://informatics.tuwien.ac.at/people/professors",
  "Current professor status, official title, research unit, profile URL and portrait resource",
);

type Seed = {
  id: string;
  slug: string;
  name: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  facts: { label: string; value: string }[];
  x: number;
  y: number;
};

const missingTraining =
  "本轮 TU Wien 一手个人页未披露可逐项核验的学位与博士导师；保留为后续 CV/博士论文反查项。";
const missingFlows =
  "本轮一手个人页未列出可逐人核验的学生任职去向；不从合著或项目成员关系推断师生与产业流向。";

function person(seed: Seed): Person {
  const profileUrl = `https://informatics.tuwien.ac.at/people/${seed.slug}`;
  const profile = official(
    `TU Wien Informatics — ${seed.name}`,
    profileUrl,
    "Current role, research unit, first-party biography, research focus and external links",
  );
  const facts = seed.facts.map((fact) => ({ ...fact, source: profile }));
  if (!facts.some((fact) => fact.label === "教育与学术训练")) {
    facts.push({ label: "教育与学术训练", value: missingTraining, source: profile });
  }
  if (!facts.some((fact) => fact.label === "学生与产业去向")) {
    facts.push({ label: "学生与产业去向", value: missingFlows, source: profile });
  }
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: "TU Wien",
    region: "Europe",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts,
    stage: seed.stage,
    category: "core",
    status: "current PI · official roster and first-party profile verified",
    sources: [profile, roster],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/europe-c-roster-2026/${seed.slug}.webp`,
      alt: `${seed.name} official portrait`,
      source: official(
        `TU Wien official portrait — ${seed.name}`,
        `${profileUrl}/${seed.slug === "stefan-neumann" || seed.slug === "magdalena-ortiz" ? "picture/head-2x.webp" : "face/icon-2x.webp"}`,
        "Official portrait displayed on the TU Wien Informatics profile",
      ),
    },
  };
}

export const europeCTuWienRosterPiExpansion1People: Person[] = [
  person({
    id: "sabine-andergassen-tuwien-roster",
    slug: "sabine-andergassen",
    name: "Sabine Andergassen",
    role: "Associate Professor · Machine Learning",
    area: "Machine Learning · Quantum Many-Body Physics",
    tags: ["机器学习", "量子多体物理", "统计物理", "科学机器学习"],
    summary: "TU Wien Machine Learning 研究单元副教授，以机器学习分析复杂量子多体系统，并用统计物理解释现代学习方法。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Associate Professor，隶属 Machine Learning 研究单元，并负责 Computational Quantum Science 研究组。" },
      { label: "研究主线", value: "量子多体物理、重整化群、高维物理数据分析，以及机器学习与统计物理的双向方法迁移。" },
      { label: "学术服务", value: "兼任 iCAIML Doctoral College 副主任及 CAIML Quantum Physics SIG 协调人。" },
    ],
    x: 110,
    y: 105,
  }),
  person({
    id: "thomas-eiter-tuwien-roster",
    slug: "thomas-eiter",
    name: "Thomas Eiter",
    role: "Full Professor · Head, Knowledge-Based Systems",
    area: "Knowledge Representation · Reasoning · Computational Logic",
    tags: ["知识表示", "推理", "计算逻辑", "智能体", "声明式求解"],
    summary: "TU Wien 知识表示与推理资深 PI，研究声明式问题求解、计算逻辑、智能体与知识系统。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "TU Wien Logic and Computation 研究所负责人、Knowledge-Based Systems 研究单元负责人。" },
      { label: "研究主线", value: "人工智能基础研究，重点包括知识表示与推理、声明式问题求解、计算逻辑、智能体和知识系统。" },
      { label: "为什么值得关注", value: "其节点连接符号 AI、逻辑程序设计与知识系统，是 TU Wien 逻辑与 AI 方向的核心组织者。" },
    ],
    x: 270,
    y: 105,
  }),
  person({
    id: "margrit-gelautz-tuwien-roster",
    slug: "margrit-gelautz",
    name: "Margrit Gelautz",
    role: "Associate Professor · Computer Vision",
    area: "Computer Vision · 3D Reconstruction · Autonomous Driving",
    tags: ["计算机视觉", "三维重建", "视频分割", "自动驾驶", "人机交互"],
    summary: "TU Wien 计算机视觉 PI，研究三维场景重建、视频分割、图像抠图、自动驾驶与人机交互。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Computer Vision 研究单元 Associate Professor。" },
      { label: "研究主线", value: "3D 场景重建、立体视觉、视频目标分割、图像抠图与运动估计，并面向自动驾驶和人机交互。" },
      { label: "学生与产业去向", value: "官方页确认其组与 Microsoft Research Cambridge 合作建设 alphamatting benchmark；研究成果在 2010 年促成 emotion3D spin-off。" },
      { label: "为什么值得关注", value: "其工作同时连接基础视觉评测、机器人应用与研究成果产业化。" },
    ],
    x: 430,
    y: 105,
  }),
  person({
    id: "allan-hanbury-tuwien-roster",
    slug: "allan-hanbury",
    name: "Allan Hanbury",
    role: "Full Professor · Head, Data Science",
    area: "Information Retrieval · Medical AI · Data Science",
    tags: ["信息检索", "医学 AI", "文本分析", "数据科学", "产业转化"],
    summary: "TU Wien Data Science 负责人，研究专业信息检索、医学文本与影像分析，并推动 contextflow 等成果转化。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Data Science 研究单元负责人、Full Professor，并任 Complexity Science Hub Vienna faculty。" },
      { label: "研究主线", value: "专业搜索、信息提取与检索、医学和健康文本分析、放射影像搜索及大数据算法评测。" },
      { label: "学生与产业去向", value: "官方页确认其协调 DoSSIER 博士网络培养 15 名博士生，并共同创办影像检索 spin-off contextflow。" },
      { label: "产业连接", value: "contextflow 将 Khresmoi 项目形成的放射影像搜索技术商业化。" },
    ],
    x: 590,
    y: 105,
  }),
  person({
    id: "pedro-hermosilla-tuwien-roster",
    slug: "pedro-hermosilla",
    name: "Pedro Hermosilla Casajus",
    role: "Assistant Professor · Computer Vision",
    area: "3D Vision · Geometric Deep Learning · Computer Graphics",
    tags: ["三维视觉", "几何深度学习", "点云", "图学习", "隐式表示"],
    summary: "TU Wien 三维视觉青年 PI，研究点云、图和隐式表示上的机器学习，连接视觉、图形学与生物信息学。",
    stage: "emerging",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Computer Vision 研究单元 Assistant Professor。" },
      { label: "研究主线", value: "面向三维与非结构化数据的机器学习，重点包括点云、图和隐式表示。" },
      { label: "应用范围", value: "官方页列出的应用覆盖 Computer Vision、Computer Graphics 与 Bioinformatics。" },
    ],
    x: 110,
    y: 270,
  }),
  person({
    id: "katja-hose-tuwien-roster",
    slug: "katja-hose",
    name: "Katja Hose",
    role: "Full Professor · Head, Data Management",
    area: "Knowledge Graphs · Data Management · Agentic AI",
    tags: ["知识图谱", "数据管理", "智能体 AI", "LLM", "数据集成"],
    summary: "TU Wien DMKI Lab 负责人，研究知识图谱、数据集成与知识驱动的 LLM/agentic AI。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "2023 年加入 TU Wien 任 Full Professor，现任 Data Management 研究单元及 DMKI Lab 负责人。" },
      { label: "研究主线", value: "图数据管理、知识图谱查询与整合、数据质量与分析，以及知识驱动的 agentic AI 和 LLM。" },
      { label: "教育与学术训练", value: "Ilmenau University of Technology 计算机科学博士，随后在 Max Planck Institute for Informatics 从事博士后研究；此前在 Aalborg University 历任助理、副和正教授。" },
      { label: "学生与产业去向", value: "官方页未列出可逐人核验的学生任职去向；不从论文作者或实验室成员关系推断。" },
    ],
    x: 270,
    y: 270,
  }),
  person({
    id: "peter-knees-tuwien-roster",
    slug: "peter-knees",
    name: "Peter Knees",
    role: "Full Professor · Data Science",
    area: "Data Science · Music Information Retrieval · AI Education",
    tags: ["数据科学", "音乐信息检索", "推荐系统", "AI 教育"],
    summary: "TU Wien Information Systems Engineering 负责人之一，研究数据科学与音乐信息检索，并协调本科 AI/ML 专业方向。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "TU Wien Information Systems Engineering 研究所负责人、Data Science Full Professor。" },
      { label: "研究主线", value: "官方成果与职责聚焦数据科学、音乐信息检索、推荐与面向内容的智能系统。" },
      { label: "教学与组织", value: "担任本科 Artificial Intelligence + Machine Learning 专业方向课程协调人。" },
    ],
    x: 430,
    y: 270,
  }),
  person({
    id: "silvia-miksch-tuwien-roster",
    slug: "silvia-miksch",
    name: "Silvia Miksch",
    role: "Full Professor · Head, Visual Analytics",
    area: "Visual Analytics · Information Visualization · Interaction Design",
    tags: ["可视分析", "信息可视化", "交互设计", "时序数据"],
    summary: "TU Wien Visual Analytics 负责人，研究可视分析、信息可视化、交互设计与时序数据。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Visual Analytics 研究单元负责人、Full Professor。" },
      { label: "研究主线", value: "Information Visualization、Visual Analytics、Interaction Design、Process Engineering 与时序数据。" },
      { label: "为什么值得关注", value: "其节点连接 AI/数据方法与人类分析决策，是欧洲可视分析与 HCI 交叉方向的重要 PI。" },
    ],
    x: 590,
    y: 270,
  }),
  person({
    id: "julia-neidhardt-tuwien-roster",
    slug: "julia-neidhardt",
    name: "Julia Neidhardt",
    role: "Assistant Professor · Data Science",
    area: "Recommender Systems · User Modeling · Digital Humanism",
    tags: ["推荐系统", "用户建模", "社交网络", "数字人文", "在线行为"],
    summary: "TU Wien 推荐系统与用户建模 PI，研究旅游、新闻和在线意见形成，并领导 Recommender Systems CD Lab。",
    stage: "emerging",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Data Science 研究单元 Assistant Professor，领导 Christian Doppler Lab for Recommender Systems。" },
      { label: "研究主线", value: "旅游与新闻推荐、用户建模、在线意见形成和行为分析，以及 Digital Humanism。" },
      { label: "教育与学术训练", value: "官方页确认其数学与计算机科学训练背景，曾在 Austrian Academy of Sciences 任 guest researcher，并访问 Northwestern University 和 University of Geneva。" },
      { label: "学生与产业去向", value: "官方页确认其领导 Christian Doppler Lab，但未列出可逐人核验的学生任职去向。" },
    ],
    x: 110,
    y: 435,
  }),
  person({
    id: "stefan-neumann-tuwien-roster",
    slug: "stefan-neumann",
    name: "Stefan Neumann",
    role: "Assistant Professor · Machine Learning",
    area: "Data Science Algorithms · Social Network Analysis · Graph Algorithms",
    tags: ["数据科学算法", "社交网络", "图算法", "动态数据结构", "极化分析"],
    summary: "TU Wien 机器学习青年 PI，研究有理论保证的数据科学算法、社交网络干预和动态图结构。",
    stage: "emerging",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Machine Learning 研究单元 Assistant Professor。" },
      { label: "研究主线", value: "具有可证明保证的数据科学算法、超越最坏情形分析、社交网络干预与极化，以及图算法和动态数据结构。" },
      { label: "教学与组织", value: "担任 Machine Learning 硕士方向课程协调人。" },
    ],
    x: 270,
    y: 435,
  }),
  person({
    id: "magdalena-ortiz-tuwien-roster",
    slug: "magdalena-ortiz",
    name: "Magdalena Ortiz",
    role: "Full Professor · Knowledge-Based Systems",
    area: "Knowledge Representation · Description Logics · Ontology Querying",
    tags: ["知识表示", "描述逻辑", "本体查询", "数据访问", "知识库"],
    summary: "TU Wien 知识表示 PI，研究描述逻辑、本体查询和知识库上的数据访问与复杂性边界。",
    stage: "senior",
    facts: [
      { label: "当前任职", value: "TU Wien Informatics Knowledge-Based Systems 研究单元 Full Professor。" },
      { label: "研究主线", value: "Knowledge Representation and Reasoning，重点是 Description Logics、数据访问、数据管理及数据库查询语言与 DL 的组合。" },
      { label: "方法特色", value: "研究不同查询语言和描述逻辑组合的计算性质，寻找兼具表达力与可计算性的边界。" },
    ],
    x: 430,
    y: 435,
  }),
];
