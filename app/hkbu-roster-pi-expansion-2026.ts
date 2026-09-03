import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";

const rosterSource: Source = {
  label: "HKBU Computer Science · Faculty Members",
  url: "https://www.comp.hkbu.edu.hk/v1/?page=faculty",
  kind: "official",
  checkedAt,
  supports: "current department roster membership, profile link and official portrait",
};

type Seed = {
  id: string;
  officialId: string;
  name: string;
  chinese: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  research: string;
  training: string;
  career: string;
  studentIndustry: string;
  why: string;
  x: number;
  y: number;
};

const seeds: Seed[] = [
  {
    id: "li-chen-hkbu", officialId: "lichen", name: "Li Chen", chinese: "陳黎", role: "Professor",
    area: "Conversational AI · Explainable AI · Recommender Systems · HCI",
    tags: ["对话 AI", "可解释 AI", "推荐系统", "人机交互"],
    summary: "HKBU 对话推荐与可解释交互资深 PI，连接 recommender systems、conversational AI 与 HCI。",
    stage: "senior",
    research: "对话 AI、可解释 AI、推荐系统与人机交互。",
    training: "本科和硕士毕业于北京大学，随后在 EPFL 获计算机科学博士学位；官方简介未列博士导师姓名。",
    career: "现任 HKBU 计算机系教授，并担任 Associate Head (Research)。",
    studentIndustry: "官方简介记录其获得 HKBU Research Supervision Award，但未公布可逐人核验的毕业学生现职；本轮不从论文作者推断去向。",
    why: "其研究把用户建模、推荐系统和生成式对话连接到可解释与人机协同问题。",
    x: 840, y: 260,
  },
  {
    id: "xin-huang-hkbu", officialId: "xinhuang", name: "Xin Huang", chinese: "黃欣", role: "Professor",
    area: "Graph Mining · Data Management · Social Networks · Privacy",
    tags: ["图挖掘", "数据管理", "社交网络", "隐私计算"],
    summary: "HKBU 图数据与社交网络 PI，研究大图挖掘、可视化和隐私感知计算。",
    stage: "senior",
    research: "图数据管理、图挖掘与可视化、社交网络分析和隐私感知计算。",
    training: "2014 年获香港中文大学 Systems Engineering and Engineering Management 博士学位；官方页未列博士导师。",
    career: "现任 HKBU 计算机系教授，公开成果跨 SIGMOD、VLDB、WWW、AAAI 与 IJCAI。",
    studentIndustry: "官方简介未给出毕业学生名单或现职，本轮保留为后续导师主页/论文反查项。",
    why: "其工作位于数据库、图学习与网络科学交界，可连接数据系统和现代图智能社区。",
    x: 980, y: 260,
  },
  {
    id: "yang-liu-hkbu", officialId: "csygliu", name: "Yang Liu", chinese: "劉泱", role: "Associate Professor",
    area: "Machine Learning · Pattern Recognition · Computational Epidemiology",
    tags: ["机器学习", "模式识别", "多视图学习", "计算流行病学"],
    summary: "HKBU 健康信息学与机器学习 PI，研究高维异构数据、复杂动力系统和传染病建模。",
    stage: "senior",
    research: "人工智能、机器学习、模式识别、降维、多视图学习和计算流行病学。",
    training: "国防科技大学自动化本科、硕士，2011 年获香港理工大学 Computing 博士学位。",
    career: "2010 年访问 CMU Robotics Institute；2011–2012 年在 Yale Statistics 从事博士后研究，现任 HKBU Health Informatics Center 副主任。",
    studentIndustry: "官方页未列可逐人核验的学生职业去向或稳定企业任职记录。",
    why: "其方法将机器学习和复杂系统建模落到公共卫生与高维医疗数据。",
    x: 1120, y: 260,
  },
  {
    id: "eric-lu-zhang-hkbu", officialId: "ericluzhang", name: "Eric Lu Zhang", chinese: "張璐", role: "Associate Professor",
    area: "AI for Science · Computational Genomics · Foundation Models",
    tags: ["AI for Science", "计算基因组学", "基础模型", "医疗大模型"],
    summary: "HKBU AI for genomics PI，研究宏基因组、单细胞多组学基础模型和医疗科学大模型。",
    stage: "senior",
    research: "计算宏基因组和代谢组、基因组深度学习、单细胞多组学基础模型与医疗大语言模型。",
    training: "天津大学软件工程本科，香港大学医学 MPhil，2016 年获 CityU 计算机博士；官方页未列博士导师。",
    career: "在 Stanford Computer Science and Pathology 从事博士后，由 Serafim Batzoglou 与 Arend Sidow 指导；2015 年访问 UC Berkeley 并与 Stephen Smale 工作。",
    studentIndustry: "官方团队简介聚焦 AI for Genomics，但未公布可逐人核验的毕业学生现职。",
    why: "其研究把基础模型直接带入组学和医疗科学，形成可复核的 AI for Science 节点。",
    x: 1260, y: 260,
  },
  {
    id: "yifan-chen-hkbu", officialId: "yifanc", name: "Yifan Chen", chinese: "陳奕帆", role: "Assistant Professor",
    area: "Machine Learning · Statistical Learning · Non-parametric Methods",
    tags: ["机器学习", "统计学习", "非参数方法", "招 PhD", "招 RA"],
    summary: "HKBU 统计机器学习青年 PI，研究分布模型、非参数方法与高效学习算法。",
    stage: "emerging",
    research: "面向统计模型和深度学习模型的高效机器学习算法、分布模型与非参数方法。",
    training: "2023 年在 UIUC 获 Statistics 博士学位，官方简介明确博士导师为 Yun Yang。",
    career: "现任 HKBU 计算机系 Assistant Professor，并兼任数学系 Affiliate Assistant Professor。",
    studentIndustry: "官方主页公开招募 PhD 和 RA；尚未给出可逐人核验的毕业学生去向。",
    why: "其研究以统计理论为基础构建现代机器学习算法，是新一代方法型 PI。",
    x: 1400, y: 260,
  },
  {
    id: "xiaoqing-guo-hkbu", officialId: "xiaoqingguo", name: "Xiaoqing Guo", chinese: "郭小青", role: "Assistant Professor",
    area: "Medical AI · Multimodal Learning · Human-AI Collaboration",
    tags: ["医疗 AI", "超声影像", "多模态学习", "可信临床决策", "招 PhD"],
    summary: "HKBU 医疗多模态青年 PI，领导 UltraVision+ Lab，研究超声、可信临床决策与人机协同。",
    stage: "emerging",
    research: "医疗 AI、超声影像、多模态学习、人机协作与可信临床决策。",
    training: "北航本科，2022 年获 CityU Electrical Engineering 博士学位；官方页未列博士导师。",
    career: "2023–2024 年在 Oxford Noble Group 从事博士后，2024–2025 年继续作为访问研究人员参与 VisualAI 与 Turing AI WLR Fellowship 项目。",
    studentIndustry: "个人页明确公开 PhD openings，但当前尚无可逐人核验的毕业生去向。",
    why: "其工作把视觉、多模态模型和临床决策连接到真实医疗场景。",
    x: 840, y: 410,
  },
  {
    id: "longkai-huang-hkbu", officialId: "longkai", name: "Longkai Huang", chinese: "黄隆鍇", role: "Assistant Professor",
    area: "Foundation Models · Continual Learning · AI for Science",
    tags: ["基础模型", "持续学习", "元学习", "AI for Science", "Tencent AI Lab"],
    summary: "HKBU 基础模型与 AI for Science 青年 PI，曾任 Tencent AI Lab Senior Researcher。",
    stage: "emerging",
    research: "Transformer 高效训练与推理、持续学习、元学习和生命科学 AI。",
    training: "中山大学自动化本科，南洋理工大学计算机科学与工程博士；官方页未列博士导师。",
    career: "加入 HKBU 前任 Tencent AI Lab Machine Learning Center 与 Tencent AI for Life Science Lab Senior Researcher。",
    studentIndustry: "官方个人页公开招募 PhD 与 RA；尚未公开可核验的毕业学生现职。",
    why: "其履历把机器学习理论、基础模型效率和产业 AI for Science 研发连在一起。",
    x: 980, y: 410,
  },
  {
    id: "lin-tian-hkbu", officialId: "lintian", name: "Lin Tian", chinese: "田琳", role: "Assistant Professor",
    area: "Spatial Intelligence · Medical Imaging · 3D Computer Vision",
    tags: ["空间智能", "医学影像", "三维视觉", "配准基础模型"],
    summary: "HKBU 医疗空间智能青年 PI，研究三维时空解剖理解、医学图像配准和可信视觉。",
    stage: "emerging",
    research: "医疗空间智能、医学图像配准与重建、3D 视觉、物理仿真和逆问题。",
    training: "华中科技大学本科、USC 硕士、UNC Chapel Hill 计算机博士。",
    career: "加入 HKBU 前在 Harvard Medical School / Massachusetts General Hospital Martinos Center 任 Research Fellow。",
    studentIndustry: "官方简介未列毕业学生去向；其 uniGradICON 配准基础模型已公开为 Python 包并记录约 30K 下载。",
    why: "其工作把 3D 视觉、基础模型和临床影像基础设施连接起来。",
    x: 1120, y: 410,
  },
  {
    id: "renjie-wan-hkbu", officialId: "renjiewan", name: "Renjie Wan", chinese: "萬人杰", role: "Assistant Professor",
    area: "3D Vision · Computational Photography · AI Security",
    tags: ["三维视觉", "计算摄影", "数字水印", "AI 安全", "招 PhD"],
    summary: "HKBU 三维视觉与计算摄影青年 PI，研究数字水印、图像处理和 AI 安全。",
    stage: "emerging",
    research: "数字水印、三维视觉、计算摄影、图像处理和 AI 安全。",
    training: "电子科技大学网络工程本科，南洋理工大学 Interdisciplinary Graduate School 博士。",
    career: "2019–2020 年访问北京大学；2020–2021 年任 Wallenberg-NTU Presidential Postdoctoral Fellow。",
    studentIndustry: "个人页公开 PhD 与 RA openings，但未列可逐人核验的毕业学生去向。",
    why: "其研究覆盖视觉生成链路中的成像、三维理解与内容安全。",
    x: 1260, y: 410,
  },
  {
    id: "juncheng-wang-hkbu", officialId: "jcwang", name: "Juncheng Wang", chinese: "王俊程", role: "Assistant Professor",
    area: "Network AI · Online Learning · Distributed Computing",
    tags: ["网络智能", "在线学习", "移动通信", "分布式计算", "招 PhD"],
    summary: "HKBU 网络智能青年 PI，研究在线学习、通信网络和分布式优化。",
    stage: "emerging",
    research: "网络人工智能、移动通信、在线学习、分布式计算和随机优化。",
    training: "上海交通大学电气工程本科、University of Alberta ECE 硕士，2023 年获 University of Toronto ECE 博士。",
    career: "现任 HKBU 计算机系 Assistant Professor，研究计算机与通信网络。",
    studentIndustry: "个人页公开招募 PhD、RA、博士后和访问学生；尚未公布毕业生现职。",
    why: "其工作把在线学习和随机优化用于下一代通信与分布式网络。",
    x: 1400, y: 410,
  },
  {
    id: "xuchuang-wang-hkbu", officialId: "xuchuangw", name: "Xuchuang Wang", chinese: "王緒創", role: "Assistant Professor",
    area: "Multi-Agent Learning · Online Learning · Quantum Networks",
    tags: ["多智能体", "在线学习", "强化学习", "量子网络", "招 PhD"],
    summary: "HKBU 多智能体在线学习青年 PI，研究现实反馈下的序贯决策与量子网络优化。",
    stage: "emerging",
    research: "多智能体序贯决策、现实反馈在线学习、量子网络路由优化与网络层析。",
    training: "西安交通大学本科，香港中文大学 Computer Science and Engineering 博士。",
    career: "加入 HKBU 前在 UMass Amherst Manning College of Information & Computer Sciences 从事博士后研究。",
    studentIndustry: "个人页公开招募 PhD、RA 和实习生，尚未列毕业学生现职。",
    why: "其工作把多智能体学习理论延伸到通信受限和量子网络环境。",
    x: 840, y: 560,
  },
  {
    id: "renchi-yang-hkbu", officialId: "renchi", name: "Renchi Yang", chinese: "楊任馳", role: "Assistant Professor",
    area: "Data Mining · Information Retrieval · Large-scale Data Systems",
    tags: ["数据挖掘", "信息检索", "大数据", "Web"],
    summary: "HKBU 大规模数据管理与挖掘青年 PI，连接 SIGMOD/VLDB 数据系统和 KDD/WWW 数据智能社区。",
    stage: "emerging",
    research: "大数据管理、数据挖掘、Web 与信息检索。",
    training: "北京邮电大学软件工程本科，南洋理工大学计算机科学博士。",
    career: "加入 HKBU 前在 NUS 从事博士后研究。",
    studentIndustry: "官方页未公布可逐人核验的学生与产业去向。",
    why: "其研究同时关注大规模数据系统和数据挖掘算法，可连接数据基础设施与 AI 应用。",
    x: 980, y: 560,
  },
  {
    id: "chengzhi-piao-hkbu", officialId: "czpiao", name: "Chengzhi Piao", chinese: "朴乘志", role: "Research Assistant Professor",
    area: "Graph Algorithms · AI for Databases · NP-hard Problems",
    tags: ["图算法", "数据库 AI", "NP-hard", "机器学习"],
    summary: "HKBU 图算法与 AI for Database 青年 PI，研究 NP-hard 图问题和数据库查询机器学习。",
    stage: "emerging",
    research: "NP-hard 图问题的不精确算法、图算法，以及面向数据库查询的机器学习。",
    training: "2017 年获中国人民大学计算机本科，2023 年获香港中文大学 Systems Engineering and Engineering Management 博士。",
    career: "现任 HKBU Computer Science Research Assistant Professor。",
    studentIndustry: "官方页未公开毕业学生或产业去向，暂不从论文合著推断。",
    why: "其方向把经典组合算法与 AI-for-database 方法连接起来。",
    x: 1120, y: 560,
  },
  {
    id: "kejing-yin-hkbu", officialId: "cskjyin", name: "Kejing Yin", chinese: "殷可經", role: "Research Assistant Professor",
    area: "Healthcare Machine Learning · Temporal Data · Computational Phenotyping",
    tags: ["医疗机器学习", "时序数据", "计算表型", "EHR"],
    summary: "HKBU 医疗时序机器学习青年 PI，研究大规模电子健康记录的计算表型与预测分析。",
    stage: "emerging",
    research: "面向高维医疗数据的机器学习、计算表型、时序数据和 EHR 预测分析。",
    training: "华南理工大学本科，2021 年获 HKBU Computer Science 博士；2019–2020 年访问 Georgia Tech College of Computing。",
    career: "在 HKBU 完成博士后后转任 Research Assistant Professor。",
    studentIndustry: "官方页未公布可逐人核验的毕业学生或产业去向。",
    why: "其工作将时序机器学习直接用于大规模临床数据和计算表型。",
    x: 1260, y: 560,
  },
  {
    id: "william-cheung-hkbu", officialId: "william", name: "William K. Cheung", chinese: "張國威", role: "Professor",
    area: "Artificial Intelligence · Data Mining · Health Informatics",
    tags: ["人工智能", "数据挖掘", "社交网络", "健康信息学"],
    summary: "HKBU 人工智能与数据挖掘资深 PI，长期研究协同过滤、社交网络和健康信息学。",
    stage: "senior",
    research: "人工智能、数据挖掘、协同信息过滤、社交网络分析和健康信息学。",
    training: "1999 年获 HKUST Computer Science 博士学位；官方页未列博士导师。",
    career: "现任 HKBU Computer Science Professor，并长期参与 AI、机器学习、数据挖掘和健康信息学会议组织。",
    studentIndustry: "官方简介未公布可逐人核验的毕业学生现职或稳定企业去向。",
    why: "其研究跨越传统数据挖掘、网络分析和医疗应用，是 HKBU 应用 AI 的资深连接点。",
    x: 1400, y: 560,
  },
];

const profileSource = (seed: Seed): Source => ({
  label: `HKBU Computer Science profile · ${seed.name}`,
  url: `https://www.comp.hkbu.edu.hk/v1/?page=profile&id=${seed.officialId}`,
  kind: "official",
  checkedAt,
  supports: "current appointment, research interests, education and career history, recruiting statement and official portrait",
});

export const hkbuRosterPiExpansion2026People: Person[] = seeds.map((seed) => {
  const profile = profileSource(seed);
  return {
    id: seed.id,
    name: seed.name,
    chinese: seed.chinese,
    role: seed.role,
    institution: "HKBU",
    region: "Hong Kong",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: [
      { label: "当前任职", value: seed.career, source: profile },
      { label: "研究主线", value: seed.research, source: profile },
      { label: "教育与学术训练", value: seed.training, source: profile },
      { label: "学生与产业去向", value: seed.studentIndustry, source: profile },
      { label: "为什么值得关注", value: seed.why, source: profile },
    ],
    stage: seed.stage,
    category: "core",
    status: "current PI · HKBU CS official roster verified",
    sources: [profile, rosterSource],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/hkbu-roster-2026/${seed.id}.jpg`,
      alt: `${seed.name} · HKBU official faculty portrait`,
      source: profile,
    },
  };
});

export const hkbuRosterPiExpansion2026Portraits = Object.fromEntries(
  hkbuRosterPiExpansion2026People.map((person) => [person.id, person.portrait!]),
) as Record<string, NonNullable<Person["portrait"]>>;

const ericZhangSource = profileSource(seeds.find((seed) => seed.id === "eric-lu-zhang-hkbu")!);

export const hkbuRosterPiExpansion2026Relationships: Relationship[] = [
  {
    id: "hkbu-2026-batzoglou-eric-lu-zhang-postdoc",
    from: "serafim-batzoglou-lineage",
    to: "eric-lu-zhang-hkbu",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导",
    evidence: "HKBU 官方个人页明确写明 Eric Lu Zhang 在 Stanford Computer Science and Pathology 从事博士后期间由 Serafim Batzoglou 与 Arend Sidow 指导；本条只连接图谱已有的 Serafim Batzoglou 节点。",
    evidenceObject: "Stanford postdoctoral supervision",
    source: ericZhangSource,
    verified: true,
  },
];
