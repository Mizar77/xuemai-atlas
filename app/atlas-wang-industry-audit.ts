import type { IndustryPathway, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, checkedAt, supports });

const xtyLaunch = source(
  "XTX Markets — XTY Labs launch announcement",
  "https://www.prnewswire.com/news-releases/xtx-markets-announces-launch-of-new-machine-learning-division-xty-labs-headed-by-dr-atlas-wang-302068721.html",
  "company",
  "Atlas Wang's appointment as Research Director, XTY Labs leadership and the division's AI residency and finance mission",
);

const utAutonomy = source(
  "UT Austin Center for Autonomy — Atlas Wang",
  "https://autonomy.oden.utexas.edu/profiles/atlas-wang",
  "official",
  "Tenured UT Austin appointment, leave for XTX Markets, Picsart and Amazon roles, education and research focus",
);

const utOden = source(
  "UT Austin Oden Institute — Atlas Wang",
  "https://oden.utexas.edu/people/directory/Atlas-Wang/",
  "official",
  "Academic affiliations, research programme, funding sources, CPAL service and selected faculty awards",
);

const vitaPi = source(
  "VITA Group — Zhangyang ‘Atlas’ Wang",
  "https://www.vita-group.space/pi",
  "profile",
  "Detailed appointment and internship chronology, current research agenda, service and self-reported funding totals",
);

const vitaResearch = source(
  "VITA Group — Research trajectory",
  "https://www.vita-group.space/research",
  "profile",
  "Research evolution, representative works and the distinct research themes associated with XTX Markets, Picsart and Amazon",
);

const vitaTeam = source(
  "VITA Group — Team and alumni",
  "https://www.vita-group.space/team",
  "profile",
  "Explicit co-advising and postdoctoral co-hosting statements",
);

const amazonAward = source(
  "Amazon Science — Zhangyang (Atlas) Wang",
  "https://www.amazon.science/research-awards/recipients/zhangyang-atlas-wang",
  "company",
  "2019 Machine Learning Research Award and the funded wound-image analysis project",
);

const yuningOfficial = source(
  "CUHK-Shenzhen SSE — Yuning You",
  "https://sse.cuhk.edu.cn/en/faculty/youyuning",
  "official",
  "Current faculty appointment, education, research programme and a multi-year graph-learning publication record with Atlas Wang and Yang Shen",
);

const tamuCommencement = source(
  "Texas A&M — August 2024 graduate program",
  "https://registrar.tamu.edu/getmedia/d533b9cb-d5ac-4fb3-af28-e3df34d307d8/August_2024_GR_Program.pdf",
  "official",
  "Yuning You's dissertation title and Yang Shen as dissertation chair",
);

const yangShenOfficial = source(
  "Texas A&M Engineering — Yang Shen",
  "https://engineering.tamu.edu/electrical/profiles/shen-yang.html",
  "official",
  "Current appointment, education, research areas and graph-learning publications involving Yuning You and Zhangyang Wang",
);

const philippOfficial = source(
  "Philipp Krähenbühl — UT Austin research profile",
  "https://www.philkr.net/",
  "profile",
  "Current UT Austin appointment, Apple research affiliation, education and computer-vision research programme",
);

const guoliangOfficial = source(
  "Beihang University — 康国梁",
  "https://teacher.buaa.edu.cn/kangguoliang/zh_CN/index.htm",
  "official",
  "Current Beihang professorship, prior UT Austin postdoctoral work, education and multimodal computer-vision research",
);

export const atlasWangIndustryAuditPersonEnhancements: Record<string, Partial<Person>> = {
  "atlas-wang-us": {
    role: "Temple Foundation Endowed Associate Professor · on leave · Research Director, XTY Labs at XTX Markets",
    area: "Low-dimensional AI · Efficient Foundation Models · Reasoning & Agents · Trustworthy Deployment",
    stage: "senior",
    status: "UT Austin tenured faculty · on leave since May 2024 · leads XTY Labs at XTX Markets",
    summary:
      "UT Austin 终身副教授、VITA Group 负责人，现休假担任 XTX Markets Research Director 并领导 XTY Labs。其方法主线不是单一 CV 或 LLM 应用，而是以稀疏、低秩、对称性等低维结构贯通模型训练、推理、智能体与高风险场景部署；团队还形成了连接高校、生成式内容、推荐系统和量化金融的持续人才网络。",
    tags: [
      "低维智能",
      "稀疏与低秩",
      "高效基础模型",
      "LLM 训练与推理",
      "Agentic AI",
      "生成式 AI",
      "可信 AI",
      "计算机视觉",
      "AI for Finance",
      "产业研究领导",
    ],
    lastVerifiedAt: checkedAt,
    facts: [
      {
        label: "当前双重角色",
        value:
          "UT Austin Temple Foundation Endowed Associate Professor（tenured）；自 2024 年 5 月起休假，全职任 XTX Markets Research Director。",
        source: utAutonomy,
      },
      {
        label: "XTY Labs 职能",
        value:
          "XTX 的公司公告将 XTY Labs 定义为机器学习部门，设 6–12 个月 AI Residency，目标是把前沿机器学习研究转化为面向金融数据和算法交易的模型与系统；这是一项正式产业研究领导岗位，不是普通顾问关系。",
        source: xtyLaunch,
      },
      {
        label: "产业时间线",
        value:
          "2022–2024 年兼职任 Picsart Director of AI Research & Technology，负责视频生成式 AI；2021–2022 年任 Amazon Search Visiting Academic，研究推荐系统中的几何深度学习。",
        source: utAutonomy,
      },
      {
        label: "早期产业研究经历",
        value:
          "VITA 个人页记录其分别于 2015、2014、2013 年在 Microsoft Research、Adobe Research 与 US Army Research Laboratory 实习，主题依次为分布式机器学习训练、创意视觉编辑与地理制图机器学习；这些属于短期实习，不与后来的正式产业任职混同。",
        source: vitaPi,
      },
      {
        label: "研究演化",
        value:
          "早期从压缩感知、字典学习、低秩表示和退化视觉感知出发，随后扩展到 learning-to-optimize、图学习、视觉生成与稀疏神经网络；当前聚焦训练阶段的低维归纳偏置、测试时推理/智能体机制及机器人、医学、金融中的可信部署。",
        source: vitaResearch,
      },
      {
        label: "代表性工作",
        value:
          "VITA 研究页把 GaLore（ICML 2024 Oral）、H2O（NeurIPS 2023）、TransGAN（NeurIPS 2021）、Text2Video-Zero（ICCV 2023）和 Cold Brew（ICLR 2022）分别放入高效基础模型、推理、生成式视觉和产业图学习主线。",
        source: vitaResearch,
      },
      {
        label: "奖项与学术服务",
        value:
          "UT Austin 官方简介列出 NSF CAREER、ARO Young Investigator、IEEE AI’s 10 to Watch、INNS Aharon Katzir Young Investigator、Google Research Scholar，以及 IBM、J. P. Morgan、Amazon、Adobe、Meta 等研究奖；并确认其共同创办 CPAL、任首届 Program Chair。",
        source: utOden,
      },
      {
        label: "可独立核验的 Amazon 资助",
        value:
          "Amazon Science 将其列为 2019 Machine Learning Research Award 获得者，项目研究利用移动端伤口图像分析与动态建模监测术后感染。",
        source: amazonAward,
      },
      {
        label: "资助规模说明",
        value:
          "VITA 个人页自报截至 2025 年 3 月参与项目总经费约 3,500 万美元、个人份额超过 875 万美元，来源包括 NSF、DARPA、ARL、IARPA、ARO、DOE 及产业项目；该数字按实验室自述呈现，不视作独立审计结果。",
        source: vitaPi,
      },
    ],
    sources: [xtyLaunch, utAutonomy, utOden, vitaPi, vitaResearch, vitaTeam, amazonAward],
  },
};

export const atlasWangIndustryAuditPeople: Person[] = [
  {
    id: "yuning-you-cuhksz",
    name: "Yuning You",
    chinese: "游宇宁",
    role: "Assistant Professor · Presidential Young Fellow",
    institution: "CUHK-Shenzhen",
    region: "Mainland China",
    area: "Graph Machine Learning · Generative Modeling · AI for Cell Biology",
    tags: ["图机器学习", "自监督学习", "生成模型", "AI for Science", "计算生物学"],
    summary:
      "香港中文大学（深圳）理工学院助理教授，建设面向图、点云和生物结构数据的机器学习方法与生命系统模拟器；Texas A&M 博士阶段由 Yang Shen 与 Atlas Wang 共同指导。",
    facts: [
      { label: "当前任职", value: "香港中文大学（深圳）理工学院助理教授、校长青年学者。", source: yuningOfficial },
      { label: "训练经历", value: "Texas A&M ECE 博士（2019–2024），随后在 Caltech 从事博士后研究（2024–2025）。", source: yuningOfficial },
      { label: "研究主线", value: "图机器学习、生成建模、细胞生物学机器学习与跨尺度生命系统模拟。", source: yuningOfficial },
    ],
    stage: "emerging",
    category: "core",
    sources: [yuningOfficial, vitaTeam, tamuCommencement],
    x: 1360,
    y: 1420,
    lastVerifiedAt: checkedAt,
  },
  {
    id: "yang-shen-tamu",
    name: "Yang Shen",
    role: "Associate Professor of ECE · affiliated CS faculty",
    institution: "External",
    actualInstitution: "Texas A&M University",
    region: "United States",
    area: "Machine Learning · Optimization · Computational Biology",
    tags: ["机器学习", "优化", "图学习", "生物信息学", "AI for Science"],
    summary:
      "Texas A&M ECE 副教授，以优化、机器学习和图方法研究蛋白质、药物与生物系统；与 Atlas Wang 长期共同开展图自监督学习研究，并共同指导 Yuning You。",
    facts: [
      { label: "当前任职", value: "Texas A&M ECE 副教授，并兼任计算机科学与工程学院 affiliated faculty。", source: yangShenOfficial },
      { label: "研究主线", value: "面向蛋白质建模、药物设计和组学数据的优化、机器学习、系统控制与图算法。", source: yangShenOfficial },
    ],
    stage: "senior",
    category: "adjacent",
    sources: [yangShenOfficial, vitaTeam, tamuCommencement, yuningOfficial],
    x: 1860,
    y: 1720,
    lastVerifiedAt: checkedAt,
  },
  {
    id: "philipp-krahenbuhl-us",
    name: "Philipp Krähenbühl",
    role: "Associate Professor of Computer Science · Apple Researcher",
    institution: "UT Austin",
    region: "United States",
    area: "Computer Vision · Machine Learning · Scene Understanding",
    tags: ["计算机视觉", "场景理解", "视频理解", "深度学习", "产业研究"],
    summary:
      "UT Austin 计算机科学副教授、Apple Researcher，研究图像、视频和场景理解；2021 年与 Atlas Wang 共同指导博士后 Guoliang Kang。",
    facts: [
      { label: "当前任职", value: "UT Austin Computer Science 副教授，并任 Apple Researcher。", source: philippOfficial },
      { label: "研究主线", value: "计算机视觉、机器学习、计算机图形学以及图像、视频和场景理解。", source: philippOfficial },
    ],
    stage: "senior",
    category: "core",
    sources: [philippOfficial, vitaTeam],
    x: 1020,
    y: 1940,
    lastVerifiedAt: checkedAt,
  },
  {
    id: "guoliang-kang-buaa",
    name: "康国梁",
    role: "教授 · 博士生导师",
    institution: "BUAA",
    region: "Mainland China",
    area: "Computer Vision · Multimodal Reasoning · Multimodal Generation",
    tags: ["计算机视觉", "多模态大模型", "多模态推理", "多模态生成", "开放环境视觉"],
    summary:
      "北京航空航天大学自动化科学与电气工程学院教授，研究开放环境视觉理解、多模态推理和生成；加入北航前曾在 CMU 与 UT Austin 从事博士后研究，UT Austin 阶段由 Atlas Wang 与 Philipp Krähenbühl 共同指导。",
    facts: [
      { label: "当前任职", value: "北京航空航天大学自动化科学与电气工程学院教授、博士生导师。", source: guoliangOfficial },
      { label: "训练轨迹", value: "悉尼科技大学博士；随后在 CMU 和 UT Austin 从事博士后研究，2022 年加入北航。", source: guoliangOfficial },
      { label: "研究主线", value: "开放环境视觉理解、多模态大模型推理、多模态生成、视频分析与持续学习。", source: guoliangOfficial },
    ],
    stage: "senior",
    category: "core",
    sources: [guoliangOfficial, vitaTeam],
    x: 1540,
    y: 2220,
    lastVerifiedAt: checkedAt,
  },
];

export const atlasWangIndustryAuditRelationships: Relationship[] = [
  {
    id: "atlas-wang-yuning-you-coadviser",
    from: "atlas-wang-us",
    to: "yuning-you-cuhksz",
    type: "lineage",
    subtype: "co_adviser",
    label: "共同博士指导",
    evidence:
      "VITA 官方团队名录把 Yuning You 列为 PhD alumni，并明确写为 ‘co-advised with Dr. Yang Shen, Fall 2019–Summer 2024’；CUHK-Shenzhen 官方简介确认其同期在 Texas A&M 获博士学位。",
    evidenceObject: "Yuning You PhD, Texas A&M (2019–2024)",
    source: vitaTeam,
    verified: true,
    startYear: 2019,
    endYear: 2024,
  },
  {
    id: "yang-shen-yuning-you-phd",
    from: "yang-shen-tamu",
    to: "yuning-you-cuhksz",
    type: "lineage",
    subtype: "co_adviser",
    label: "博士共同导师 / Dissertation Chair",
    evidence:
      "Texas A&M 2024 年毕业典礼名录将 Yang Shen 列为 Yuning You 博士论文 Chair；VITA 团队页进一步说明该博士由 Yang Shen 与 Atlas Wang 共同指导。",
    evidenceObject: "Generalizable Graph AI for Biomedicine: Data-driven Self-supervision and Principled Regularization",
    source: tamuCommencement,
    verified: true,
    startYear: 2019,
    endYear: 2024,
  },
  {
    id: "atlas-wang-yang-shen-sustained-graph-ai",
    from: "atlas-wang-us",
    to: "yang-shen-tamu-atlas-audit",
    type: "collaboration",
    subtype: "sustained_collaboration",
    label: "图自监督学习与共同指导",
    evidence:
      "CUHK-Shenzhen 的 Yuning You 官方简介列出 2019–2024 年间由 Wang、Shen 与 You 共同完成的多项图学习工作，包括 GraphCL、GraphCL Automated、谱正则化图域适应和 Latent 3D Graph Diffusion；VITA 页还明确记录双方共同指导该博士。该边依据跨多年论文序列和共同指导，而非单篇合著。",
    evidenceObject: "Graph-learning programme and Yuning You co-advising (2019–2024)",
    source: yuningOfficial,
    verified: true,
    startYear: 2019,
    endYear: 2024,
    recentYear: 2024,
  },
  {
    id: "atlas-wang-guoliang-kang-postdoc",
    from: "atlas-wang-us",
    to: "guoliang-kang-buaa",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后共同指导",
    evidence:
      "VITA 团队名录把 Guoliang Kang 列为 2021 年 3–10 月博士后，并明确写明由 Atlas Wang 与 Philipp Krähenbühl co-hosted。",
    evidenceObject: "UT Austin postdoctoral appointment (Mar–Oct 2021)",
    source: vitaTeam,
    verified: true,
    startYear: 2021,
    endYear: 2021,
  },
  {
    id: "philipp-krahenbuhl-guoliang-kang-postdoc",
    from: "philipp-krahenbuhl-us",
    to: "guoliang-kang-buaa",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后共同指导",
    evidence:
      "VITA 团队名录把 Guoliang Kang 列为 2021 年 3–10 月博士后，并明确写明由 Atlas Wang 与 Philipp Krähenbühl co-hosted。",
    evidenceObject: "UT Austin postdoctoral appointment (Mar–Oct 2021)",
    source: vitaTeam,
    verified: true,
    startYear: 2021,
    endYear: 2021,
  },
];

/**
 * The lineage audit owns the canonical adviser/alumnus nodes and training
 * edges.  Export only the non-duplicative sustained-collaboration edge for
 * shared-data integration.
 */
export const atlasWangIndustryAuditCollaborationRelationships = atlasWangIndustryAuditRelationships.filter(
  (relationship) => relationship.type === "collaboration",
);

export const atlasWangIndustryAuditPathways: IndustryPathway[] = [
  {
    id: "us-atlas-wang-xty-labs",
    region: "United States",
    kind: "ACADEMIA → INDUSTRY RESEARCH LEADERSHIP",
    title: "Atlas Wang → XTX Markets / XTY Labs",
    description:
      "2024 年由 XTX Markets 正式任命为 Research Director，领导纽约 XTY Labs 与 AI Residency，把基础模型和机器学习研究连接到金融数据、算法交易与量化研究基础设施。",
    source: xtyLaunch,
  },
  {
    id: "us-atlas-wang-picsart",
    region: "United States",
    kind: "PART-TIME INDUSTRY RESEARCH LEADERSHIP",
    title: "Atlas Wang ↔ Picsart",
    description:
      "2022–2024 年兼职担任 Director of AI Research & Technology，领导视频生成式 AI；VITA 研究页将 Text2Video-Zero 和 StreamingT2V 列为该产业方向的代表项目。",
    source: vitaResearch,
  },
  {
    id: "us-atlas-wang-amazon-search",
    region: "United States",
    kind: "VISITING ACADEMIC",
    title: "Atlas Wang ↔ Amazon Search",
    description:
      "2021–2022 年任 Amazon Search Visiting Academic，研究几何深度学习与冷启动推荐；这是一段有明确起止时间的访问研究岗位。",
    source: utAutonomy,
  },
  {
    id: "us-atlas-wang-amazon-award",
    region: "United States",
    kind: "COMPETITIVE INDUSTRY RESEARCH AWARD",
    title: "Atlas Wang ← Amazon Machine Learning Research Award",
    description:
      "Amazon Science 独立记录其获得 2019 Machine Learning Research Award，资助移动端伤口图像分析与术后感染动态监测；这是竞争性产业科研资助，不等同于雇佣关系。",
    source: amazonAward,
  },
  {
    id: "us-atlas-wang-early-industry-internships",
    region: "United States",
    kind: "EARLY-CAREER RESEARCH INTERNSHIPS",
    title: "Atlas Wang ↔ Microsoft Research / Adobe Research / US ARL",
    description:
      "VITA 履历记录 2013–2015 年间三段短期研究实习，主题覆盖地理制图机器学习、创意视觉编辑和分布式机器学习训练；网页应明确标记为实习经历，避免误读为长期任职或稳定联合实验室。",
    source: vitaPi,
  },
];
