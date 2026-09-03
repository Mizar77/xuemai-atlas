import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";

const roster: Source = {
  label: "HKUST CSE Faculty Directory",
  url: "https://cse.hkust.edu.hk/admin/people/faculty",
  kind: "official",
  checkedAt,
  supports: "current faculty roster membership, title, research-area classification, profile link and official portrait",
};

type Seed = {
  id: string;
  officialId: string;
  slug: string;
  name: string;
  chinese: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  current: string;
  research: string;
  training: string;
  outcomes: string;
  why: string;
  x: number;
  y: number;
};

const seeds: Seed[] = [
  {
    id: "lei-chen-hkust", officialId: "9c4d1717e1d42b5d", slug: "leichen", name: "Lei Chen", chinese: "陳雷", role: "Professor",
    area: "Data-driven Machine Learning · Probabilistic Databases · Web Data",
    tags: ["数据驱动机器学习", "概率数据库", "众包", "Web 数据", "多媒体系统"],
    summary: "HKUST 数据智能资深 PI，连接数据驱动机器学习、概率数据库、众包和 Web 信息管理。",
    stage: "senior",
    current: "HKUST CSE Professor，并任 HKUST Big Data Institute Director。",
    research: "数据驱动机器学习、众包数据处理、不确定与概率数据库、Web 信息管理和多媒体系统。",
    training: "天津大学计算机本科、Asian Institute of Technology 计算机硕士，University of Waterloo 计算机博士。",
    outcomes: "本轮官方主页未公开可逐人核验的毕业学生现职或产业流向，暂不从论文作者推断。",
    why: "其研究位于数据库与机器学习交界，是 HKUST 数据智能和大数据平台的重要节点。",
    x: 820, y: 260,
  },
  {
    id: "yike-guo-hkust", officialId: "de41612e7bb48529", slug: "yikeguo", name: "Yike Guo", chinese: "郭毅可", role: "Professor",
    area: "Data Mining · Machine Learning · Scientific Informatics",
    tags: ["数据挖掘", "机器学习", "AI for Science", "大规模数据", "创业"],
    summary: "HKUST 数据科学与 AI for Science 资深 PI，长期推动大规模科学数据挖掘及产学合作。",
    stage: "senior",
    current: "HKUST Provost，并兼任 CSE Professor。",
    research: "机器学习、数据挖掘、大规模数据管理，以及生物、化学、医疗、环境和金融等科学应用。",
    training: "1985 年获清华大学计算机一等荣誉学位，1994 年获 Imperial College London Computational Logic 博士。",
    outcomes: "官方简介明确记录其推动创业公司，并与 GSK、Pfizer、Roche、KPMG、Huawei、BBC 等开展大型项目或咨询合作；未逐项列出学生现职。",
    why: "其轨迹把 Imperial 数据科学平台、HKBU/HKUST 管理岗位、创业和跨行业科学计算连接起来。",
    x: 970, y: 260,
  },
  {
    id: "huamin-qu-hkust", officialId: "fbef5672f01df3a5", slug: "huamin", name: "Huamin Qu", chinese: "屈華民", role: "Professor",
    area: "Information Visualization · Human-Computer Interaction · Explainable AI",
    tags: ["可视化", "HCI", "可解释 AI", "城市计算", "社交网络"],
    summary: "HKUST 可视化与 HCI 资深 PI，研究城市信息学、文本可视化、社交网络和可解释 AI。",
    stage: "senior",
    current: "HKUST CSE Professor、VisLab Director，并协调 CSE Human-Computer Interaction group。",
    research: "信息可视化、人机交互、城市信息学、社交网络分析、文本可视化和可解释 AI。",
    training: "西安交通大学数学本科，Stony Brook University 计算机硕士和博士。",
    outcomes: "官方简介记录其已培养 26 名博士和 19 名 MPhil；组内技术被 Microsoft、IBM、Huawei、Tencent、Bosch 等采用，但页面未逐人列出现职。",
    why: "其研究组同时具备大规模培养记录、可视分析方法和明确产业采用证据。",
    x: 1120, y: 260,
  },
  {
    id: "albert-chung-hkust", officialId: "6d0debded94bf780", slug: "achung", name: "Albert Chi-Shing Chung", chinese: "鍾志成", role: "Professor",
    area: "Medical Image Analysis · Computer Vision · Image Registration",
    tags: ["医学影像", "计算机视觉", "图像配准", "图像分割"],
    summary: "HKUST 医学视觉资深 PI，创建 Lo Kwee-Seong Medical Image Analysis Laboratory。",
    stage: "senior",
    current: "HKUST CSE Professor，创建并领导 Lo Kwee-Seong Medical Image Analysis Laboratory。",
    research: "医学图像分析、图像处理、计算机视觉，重点为图像分割和配准。",
    training: "香港大学 Computer Engineering 本科、HKUST Computer Science MPhil，2001 年获 Oxford Engineering Science DPhil。",
    outcomes: "官方简介明确提到 former PhD students Qiang Zhang、Siqi Bao、Tony Mok 的论文与挑战赛成绩，但未给出其当前职业去向。",
    why: "其长期培养体系和医疗影像实验室把经典视觉方法连接到临床图像基础设施。",
    x: 1270, y: 260,
  },
  {
    id: "james-kwok-hkust", officialId: "a25753583e06810d", slug: "jamesk", name: "James Tin-Yau Kwok", chinese: "郭天佑", role: "Professor",
    area: "Machine Learning · Deep Learning · Kernel Methods",
    tags: ["机器学习", "深度学习", "核方法", "人工智能"],
    summary: "HKUST 机器学习资深 PI，研究核方法、深度学习和通用学习算法。",
    stage: "senior",
    current: "HKUST CSE Professor、IEEE Fellow。",
    research: "机器学习、深度学习、核方法和人工智能。",
    training: "香港大学 Electrical and Electronic Engineering 本科，HKUST Computer Science 博士；官方页未列博士导师。",
    outcomes: "博士毕业后曾任 HKBU Computer Science Assistant Professor，随后返回 HKUST；官方页未公开毕业学生现职。",
    why: "其学术服务横跨 NeurIPS、ICML、ICLR、IJCAI、AAAI，是香港机器学习共同体的资深方法节点。",
    x: 1420, y: 260,
  },
  {
    id: "fangzhen-lin-hkust", officialId: "7b2545ea45a2ad1f", slug: "flin", name: "Fangzhen Lin", chinese: "林方真", role: "Professor",
    area: "Knowledge Representation · Multi-Agent Systems · Robotics",
    tags: ["知识表示", "推理", "多智能体", "机器人", "语言理解"],
    summary: "HKUST 知识表示与推理资深 PI，研究多智能体、机器人和社会选择。",
    stage: "senior",
    current: "HKUST CSE Professor、AAAI Fellow。",
    research: "知识表示、推理与学习，以及编程语言、机器人、多智能体、博弈论、社会选择和语言理解。",
    training: "福州大学本科、北京大学硕士、Stanford University Computer Science 博士；官方页未列博士导师。",
    outcomes: "此前曾在 University of Toronto 与 Stanford Computer Science 工作；官方简介未公开可逐人核验的学生现职。",
    why: "其研究覆盖符号 AI、多智能体与机器人，是现代生成式 AI 之外的重要基础学术节点。",
    x: 820, y: 410,
  },
  {
    id: "long-quan-hkust", officialId: "a251b47edaa322e3", slug: "quan", name: "Long Quan", chinese: "權龍", role: "Professor",
    area: "3D Reconstruction · Vision Geometry · Image-based Modeling",
    tags: ["三维重建", "视觉几何", "SfM", "图像建模"],
    summary: "HKUST 三维视觉资深 PI，长期研究三维重建、Structure from Motion 和视觉几何。",
    stage: "senior",
    current: "HKUST CSE Professor。",
    research: "三维重建、Structure from Motion、视觉几何和 image-based modeling。",
    training: "1989 年在法国 INPL 获 Computer Science 博士学位。",
    outcomes: "1990 年起曾任 INRIA Grenoble / French CNRS Senior Research Scientist，2001 年加入 HKUST；官方页未列学生去向。",
    why: "其研究构成香港三维视觉与几何计算的重要资深技术谱系。",
    x: 970, y: 410,
  },
  {
    id: "chi-keung-tang-hkust", officialId: "0986e0cb0f1f45b0", slug: "cktang", name: "Chi-Keung Tang", chinese: "鄧智強", role: "Professor",
    area: "Computer Vision · Computer Graphics · Machine Learning",
    tags: ["计算机视觉", "计算机图形学", "机器学习", "MSRA"],
    summary: "HKUST 视觉与图形学资深 PI，曾在 Microsoft Research Asia Visual Computing Group 任 Adjunct Researcher。",
    stage: "senior",
    current: "HKUST CSE Professor，自 2000 年起在该系任职。",
    research: "计算机视觉、计算机图形学和机器学习。",
    training: "1999 年获 USC Computer Science MSc，2000 年获 USC Computer Science PhD。",
    outcomes: "官方简介明确记录其曾任 Microsoft Research Asia Visual Computing Group Adjunct Researcher；当前页面未逐人列出毕业学生去向。",
    why: "其履历把 HKUST 视觉研究与 MSRA 视觉计算网络直接连接起来。",
    x: 1120, y: 410,
  },
  {
    id: "xiaojuan-ma-hkust", officialId: "b7354aaff17b5c85", slug: "mxj", name: "Xiaojuan Ma", chinese: "麻曉娟", role: "Associate Professor",
    area: "Human-AI Interaction · Affective Computing · Human-Robot Interaction",
    tags: ["Human-AI", "情感计算", "人机交互", "人机协同", "Huawei Noah's Ark"],
    summary: "HKUST Human-Engaged AI PI，研究情感计算、人机/人机机器人交互和沉浸式界面。",
    stage: "senior",
    current: "HKUST CSE Associate Professor，研究 Human-Computer Interaction。",
    research: "Human-AI interaction、情感计算、人机机器人交互、VR/AR 和可视化。",
    training: "Princeton University Computer Science 博士；随后在 CMU Human-Computer Interaction Institute 从事博士后。",
    outcomes: "加入 HKUST 前曾任 Huawei Noah's Ark Lab Human-Computer Interaction researcher；更早在 NUS Information Systems 任 Research Fellow。",
    why: "其学术与产业经历把 HCI、Human-Engaged AI 和华为诺亚方舟实验室连接起来。",
    x: 1270, y: 410,
  },
  {
    id: "long-chen-hkust", officialId: "7fe4d5c5e8aee69f", slug: "longchen", name: "Long Chen", chinese: "陳隆", role: "Assistant Professor",
    area: "Computer Vision · Multimodal Learning · Natural Language Processing",
    tags: ["计算机视觉", "多媒体", "机器学习", "自然语言处理", "师承已核验"],
    summary: "HKUST 视觉、多媒体与 NLP 青年 PI，博士和访问阶段连接浙大、NTU、NUS 与 Columbia。",
    stage: "emerging",
    current: "HKUST CSE Assistant Professor。",
    research: "计算机视觉、机器学习、多媒体和自然语言处理，重点构建可解释、稳健、通用的视觉理解系统。",
    training: "2020 年获浙江大学 Computer Science 博士，官方简介明确导师为 Jun Xiao；博士访问阶段分别由 Hanwang Zhang 和 Tat-Seng Chua 指导。",
    outcomes: "加入 HKUST 前在 Columbia DVMM Lab 任 Postdoctoral Research Scientist，与 Shih-Fu Chang 工作；官方简介未列学生职业去向。",
    why: "其一手履历形成可明确画出的跨浙大、NTU、NUS、Columbia 和 HKUST 培养网络。",
    x: 1420, y: 410,
  },
  {
    id: "sehi-lyi-hkust", officialId: "d4dbd48ba8cbcff9", slug: "sehi", name: "Sehi L'Yi", chinese: "李世熙", role: "Assistant Professor",
    area: "Human-AI Interaction · Visualization · Biomedical Informatics",
    tags: ["Human-AI", "可视化", "生物医学信息学", "交互数据系统"],
    summary: "HKUST Human-AI 与生物医学可视化青年 PI，研究交互式数据系统在医学科研和医疗中的部署。",
    stage: "emerging",
    current: "HKUST CSE Assistant Professor。",
    research: "可视化、Human-AI interaction、生物医学信息学、AI 应用与交互数据系统。",
    training: "Seoul National University Computer Science and Engineering 博士。",
    outcomes: "加入 HKUST 前任 Harvard Medical School Biomedical Informatics NIH/NHGRI K99/R00 Fellow；官方页未公布毕业学生去向。",
    why: "其工作将 Human-AI 交互工具直接部署到生物医学科研与医疗场景。",
    x: 970, y: 560,
  },
  {
    id: "zihan-zhang-hkust", officialId: "fe463eb171f63a33", slug: "zihanz", name: "Zihan Zhang", chinese: "張子函", role: "Assistant Professor",
    area: "Reinforcement Learning · Online Learning · Game Theory",
    tags: ["强化学习", "在线学习", "博弈论", "优化理论"],
    summary: "HKUST 学习理论青年 PI，研究强化学习、在线学习、博弈论和凸优化。",
    stage: "emerging",
    current: "HKUST CSE Assistant Professor。",
    research: "机器学习理论，重点为强化学习、在线学习、博弈论和凸优化。",
    training: "清华大学自动化本科（2017）和 Control Science and Engineering 博士（2022）；官方页未列博士导师。",
    outcomes: "此前在 University of Washington Allen School 与 Princeton ECE 从事博士后研究；官方页未公布学生现职。",
    why: "其研究提供强化学习和多智能体决策所需的理论与优化基础。",
    x: 1120, y: 560,
  },
];

const profile = (seed: Seed): Source => ({
  label: `HKUST CSE profile · ${seed.name}`,
  url: `https://cse.hkust.edu.hk/admin/people/faculty/profile/${seed.slug}`,
  kind: "official",
  checkedAt,
  supports: "current appointment, education, biography, research interests, supervision or industry statements, and official portrait",
});

export const hkustCseRosterExpansionBatch2People: Person[] = seeds.map((seed) => {
  const source = profile(seed);
  return {
    id: seed.id,
    name: seed.name,
    chinese: seed.chinese,
    role: seed.role,
    institution: "HKUST",
    region: "Hong Kong",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: [
      { label: "当前任职", value: seed.current, source },
      { label: "研究主线", value: seed.research, source },
      { label: "教育与学术训练", value: seed.training, source },
      { label: "学生与产业去向", value: seed.outcomes, source },
      { label: "为什么值得关注", value: seed.why, source },
    ],
    stage: seed.stage,
    category: "core",
    status: "current PI · HKUST CSE official roster verified",
    sources: [source, roster],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/hkust-cse-roster-batch2-2026/${seed.id}.jpg`,
      alt: `${seed.name} · HKUST official faculty portrait`,
      source,
    },
  };
});

export const hkustCseRosterExpansionBatch2Portraits = Object.fromEntries(
  hkustCseRosterExpansionBatch2People.map((person) => [person.id, person.portrait!]),
) as Record<string, NonNullable<Person["portrait"]>>;

const longChenSource = profile(seeds.find((seed) => seed.id === "long-chen-hkust")!);

export const hkustCseRosterExpansionBatch2Relationships: Relationship[] = [
  {
    id: "hkust-batch2-shih-fu-chang-long-chen-postdoc",
    from: "shih-fu-chang-lineage",
    to: "long-chen-hkust",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导",
    evidence: "HKUST CSE 官方简介明确记录 Long Chen 加入 HKUST 前在 Columbia DVMM Lab 任 Postdoctoral Research Scientist，并与 Shih-Fu Chang 工作。",
    evidenceObject: "Columbia DVMM postdoctoral research supervision",
    source: longChenSource,
    verified: true,
  },
  {
    id: "hkust-batch2-hanwang-zhang-long-chen-visiting-phd",
    from: "hanwang-zhang-ntu",
    to: "long-chen-hkust",
    type: "lineage",
    subtype: "co_adviser",
    label: "访问博士指导",
    evidence: "HKUST CSE 官方简介明确记录 Long Chen 在 NTU 访问博士阶段由 Hanwang Zhang 指导。",
    evidenceObject: "NTU visiting PhD supervision",
    source: longChenSource,
    verified: true,
  },
  {
    id: "hkust-batch2-tat-seng-chua-long-chen-visiting-phd",
    from: "tat-seng-chua",
    to: "long-chen-hkust",
    type: "lineage",
    subtype: "co_adviser",
    label: "访问博士指导",
    evidence: "HKUST CSE 官方简介明确记录 Long Chen 在 NUS 访问博士阶段由 Tat-Seng Chua 指导。",
    evidenceObject: "NUS visiting PhD supervision",
    source: longChenSource,
    verified: true,
  },
];
