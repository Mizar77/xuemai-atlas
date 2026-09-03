import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  ethFaculty: source(
    "ETH Zurich D-INFK · Professors",
    "https://inf.ethz.ch/people/faculty.html",
    "official",
    "五位人物的现任 D-INFK faculty 身份、职称、研究方向入口与官方头像",
  ),
  barbaraProfile: source(
    "ETH CGL-Sim · Barbara Solenthaler",
    "https://people.inf.ethz.ch/~sobarbar/solenthaler.html",
    "profile",
    "Titular Professor 现职、University of Zurich 博士训练、研究方向与学术履历",
  ),
  barbaraTeam: source(
    "ETH CGL-Sim · Team",
    "https://people.inf.ethz.ch/~sobarbar/team.html",
    "official",
    "Barbara Solenthaler 为 faculty，以及当前博士生、博士后和历届研究人员名单",
  ),
  barbaraAiCenter: source(
    "ETH AI Center · New faculty members 2024",
    "https://ai.ethz.ch/news-and-events/ai-center-news/2024/12/eth-ai-center-welcomes-seven-new-faculty-members.html",
    "official",
    "图形学、数字人、医疗应用研究及共同创办 Apagom AG 的产业连接",
  ),
  stelianEth: source(
    "ETH Zurich D-INFK · Stelian Coros",
    "https://inf.ethz.ch/people/person-detail.coros.html",
    "official",
    "ETH D-INFK 现任副教授身份与 Computational Robotics Lab 入口",
  ),
  stelianProfile: source(
    "ETH Computational Robotics Lab · Stelian Coros",
    "https://crl.ethz.ch/people/coros/index.html",
    "profile",
    "UBC 博士训练、CMU 任职经历、CRL 领导与机器人研究方向",
  ),
  stelianPeople: source(
    "ETH Computational Robotics Lab · People",
    "https://crl.ethz.ch/people/index.html",
    "official",
    "CRL 当前博士生、研究人员、博士校友和 Flink Robotics 团队名单",
  ),
  stelianRobotics: source(
    "ETH Zurich · Robotics feature 2025",
    "https://ethz.ch/content/dam/ethz/main/news/globe/Web/2025/Globe2504_Robotics.pdf",
    "official",
    "Stelian Coros 的机器人研究、2023 年与前博士生创办 Flink Robotics 及产业应用",
  ),
  mennaAppointment: source(
    "ETH D-INFK · Mennatallah El-Assady appointment",
    "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2023/09/mennatallah-el-assady-is-appointed-as-tenure-track-assistant-professor.html",
    "official",
    "ETH tenure-track Assistant Professor 任命与可解释 AI、可视分析研究范围",
  ),
  mennaProfile: source(
    "Mennatallah El-Assady · Personal profile",
    "https://el-assady.com/",
    "profile",
    "IVIA Lab 领导、Konstanz 与 OntarioTech 博士训练和人机协同研究方向",
  ),
  mennaBhada: source(
    "ETH IVIA Lab · Bhada Yun",
    "https://ivia.ethz.ch/people/yun",
    "official",
    "Bhada Yun 为 Mennatallah El-Assady 与 April Yi Wang 共同指导的 Direct Doctorate Student",
  ),
  mennaAdobe: source(
    "ETH IVIA Lab · Adobe Basel visit",
    "https://ivia.ethz.ch/news-and-events/adobe-basel-visit-2026",
    "official",
    "IVIA 与 Adobe 围绕人机协同和智能体软件工程研究的公开交流",
  ),
  aprilWelcome: source(
    "ETH D-INFK · Welcome April Yi Wang",
    "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2023/11/welcome-april-yi-wang.html",
    "official",
    "ETH tenure-track Assistant Professor 现职、Zhejiang/SFU/Michigan 教育训练与研究方向",
  ),
  aprilTeam: source(
    "ETH PEACH Lab · Team",
    "https://peachlab.inf.ethz.ch/team/",
    "official",
    "April Yi Wang 为 PEACH Lab PI，以及实验室当前博士生和博士后名单",
  ),
  aprilMultimodal: source(
    "ETH PEACH Lab · Multimodal tutor project",
    "https://peachlab.inf.ethz.ch/projects/multimodal-tutor/",
    "official",
    "April Yi Wang 与 Mrinmaya Sachan 共同担任多模态教学系统项目 PI",
  ),
  valentinaProfile: source(
    "ETH Boeva Lab · Valentina Boeva",
    "https://boevalab.inf.ethz.ch/boeva_personal.html",
    "profile",
    "ETH Institute for Machine Learning 现职、Moscow State 学历、博士后与组长经历、研究方向",
  ),
  valentinaPeople: source(
    "ETH Boeva Lab · People",
    "https://boevalab.inf.ethz.ch/people.html",
    "official",
    "Valentina Boeva 为组长，以及当前博士生、共同指导成员与实验室校友名单",
  ),
  valentinaNccr: source(
    "ETH D-INFK · Children & Cancer NCCR",
    "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/03/we-want-to-ensure-that-every-child-diagnosed-with-cancer-in-this-country-has-access-to-the-most-advanced-diagnostics-and-therapies-available.html",
    "official",
    "Biomedical Informatics 现职、ETH AI Center 归属、儿童癌症项目和多组学机器学习研究",
  ),
  celestineWelcome: source(
    "ETH D-INFK · Welcome Celestine Mendler-Dünner",
    "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/09/welcome-celestine-mendler-duenner.html",
    "official",
    "ETH 人工智能副教授任命、ELLIS Institute 经历与人机社会交互中的机器学习研究",
  ),
  celestineMedal: source(
    "ETH D-INFK · ETH Medal for doctoral thesis",
    "https://inf.ethz.ch/news-and-events/spotlights/2019/11/ETHmedalDoctoral.html",
    "official",
    "Celestine Mendler-Dünner 的 ETH 博士论文题目、导师 Thomas Hofmann 与 Data Analytics Lab 归属",
  ),
  celestineStudent: source(
    "ETH Learning & Adaptive Systems · Patrik Wolf",
    "https://las.inf.ethz.ch/people/patrik-wolf",
    "official",
    "Patrik Wolf 为 Celestine Mendler-Dünner 与 Andreas Krause 共同指导的博士生",
  ),
  christianProfile: source(
    "ETH D-INFK · Christian Holz",
    "https://inf.ethz.ch/people/people-atoz/person-detail.christianholz.html",
    "official",
    "ETH D-INFK 现任副教授身份与 SIPLAB 入口",
  ),
  christianTeam: source(
    "ETH SIPLAB · Team",
    "https://siplab.org/team",
    "official",
    "Christian Holz 为 PI，以及实验室当前博士生与研究方向",
  ),
  christianEducation: source(
    "ETH SIPLAB publication · author biography",
    "https://cgl.ethz.ch/Downloads/Publications/Papers/2023/Kov23a/Kov23a.pdf",
    "publication",
    "Christian Holz 2013 年 University of Potsdam 计算机科学博士训练与 ETH SIPLAB 现职",
  ),
  christianEthAi: source(
    "ETH D-INFK · Five CHI 2026 papers honoured",
    "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/04/five-d-infk-papers-honoured-at-acm-chi-2026.html",
    "official",
    "ETH 副教授与 SIPLAB 负责人、ETH AI Center 成员、研究方向及此前 Microsoft Research 任职",
  ),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, sourceValue: Source) => ({
  label,
  value,
  source: sourceValue,
});

type Seed = Omit<
  Person,
  "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"
> & {
  portraitFile: string;
  portraitSource: Source;
};

const person = (seed: Seed): Person => ({
  ...seed,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-europe-remaining-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0EuropeRemainingReadyChunk1People2026: Person[] = [
  person({
    id: "barbara-solenthaler-eth-p0-2026",
    name: "Barbara Solenthaler",
    role: "Titular Professor · CGL Simulation & Animation",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Computer Graphics · Neural Simulation · Digital Humans",
    tags: ["Computer Graphics", "Neural Physics", "Digital Humans", "AI for Health"],
    summary: "ETH CGL 的模拟与动画负责人之一，把物理仿真、神经建模与数字人技术用于影视和医疗，并通过 Apagom 推动研究转化。",
    stage: "senior",
    x: 170,
    y: 170,
    portraitFile: "barbara-solenthaler.jpg",
    portraitSource: sources.ethFaculty,
    facts: [
      fact("当前任职", "ETH Zurich Department of Computer Science Titular Professor，在 Computer Graphics Laboratory 领导模拟与动画研究。", sources.barbaraProfile),
      fact("教育与学术训练", "在 University of Zurich 获计算机科学博士，并以流体模拟博士论文获得 2009 Fritz Kutter Best Dissertation Award。", sources.barbaraProfile),
      fact("研究主线", "研究物理模拟、AI 驱动的神经物理、数据驱动面部动画、数字人和面向医疗的图形学。", sources.barbaraProfile),
      fact("产业转化", "ETH AI Center 官方介绍记录其共同创办 Apagom AG，将机器学习用于实时流体模拟。", sources.barbaraAiCenter),
    ],
    sources: [sources.ethFaculty, sources.barbaraProfile, sources.barbaraTeam, sources.barbaraAiCenter],
  }),
  person({
    id: "stelian-coros-eth-p0-2026",
    name: "Stelian Coros",
    role: "Associate Professor · Computational Robotics Lab Director",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Computational Robotics · Robot Learning · Motion Control",
    tags: ["Robotics", "Motion Control", "Simulation", "Computational Fabrication"],
    summary: "ETH Computational Robotics Lab 负责人，以仿真、优化和数据学习连接灵巧操作、运动控制与机器人设计，并与博士校友共同推动 Flink Robotics。",
    stage: "senior",
    x: 350,
    y: 170,
    portraitFile: "stelian-coros.jpg",
    portraitSource: sources.ethFaculty,
    facts: [
      fact("当前任职", "ETH Zurich Department of Computer Science Associate Professor，并领导 Computational Robotics Lab。", sources.stelianEth),
      fact("教育与学术训练", "2011 年获 University of British Columbia 计算机科学博士；加入 ETH 前任 Carnegie Mellon University Robotics Institute 助理教授。", sources.stelianProfile),
      fact("研究主线", "通过数值仿真与运动控制研究灵巧操作、腿式运动、计算制造和仿生机器人设计。", sources.stelianProfile),
      fact("产业与学生网络", "ETH 官方报道其在 2023 年与前博士生创办 Flink Robotics，将 AI 视觉与物理模型用于工业机器人。", sources.stelianRobotics),
    ],
    sources: [sources.ethFaculty, sources.stelianEth, sources.stelianProfile, sources.stelianPeople, sources.stelianRobotics],
  }),
  person({
    id: "mennatallah-el-assady-eth-p0-2026",
    name: "Mennatallah El-Assady",
    role: "Assistant Professor · IVIA Lab Director",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Human-AI Collaboration · Explainable AI · Visual Analytics",
    tags: ["Human-AI Interaction", "Explainable AI", "Visual Analytics", "Computational Linguistics"],
    summary: "ETH IVIA Lab 负责人，把可视分析、计算语言学与可解释机器学习结合起来，研究人和 AI 如何共同理解、修正并使用模型。",
    stage: "emerging",
    x: 530,
    y: 170,
    portraitFile: "mennatallah-el-assady.jpg",
    portraitSource: sources.ethFaculty,
    facts: [
      fact("当前任职", "ETH Zurich Department of Computer Science tenure-track Assistant Professor，并领导 Interactive Visualization and Intelligence Augmentation Lab。", sources.mennaAppointment),
      fact("教育与学术训练", "曾在 University of Konstanz Data Analysis and Visualization 组及 OntarioTech Visualization for Information Analysis Lab 接受博士训练，之后任 ETH AI Center research fellow。", sources.mennaProfile),
      fact("研究主线", "研究可视分析、计算语言学、可解释机器学习，以及支持人机协同决策的交互界面。", sources.mennaProfile),
      fact("产业连接", "IVIA 官方记录 2026 年与 Adobe Basel 交流人机协同界面和智能体软件工程研究。", sources.mennaAdobe),
    ],
    sources: [sources.ethFaculty, sources.mennaAppointment, sources.mennaProfile, sources.mennaBhada, sources.mennaAdobe],
  }),
  person({
    id: "april-yi-wang-eth-p0-2026",
    name: "April Yi Wang",
    role: "Assistant Professor · PEACH Lab Director",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Human-AI Collaboration · Educational Technology · HCI",
    tags: ["Human-AI Interaction", "AI in Education", "HCI", "Programming Tools"],
    summary: "ETH PEACH Lab 负责人，研究面向学习者和知识工作者的人机协同编程工具、AI literacy 与多模态教学系统。",
    stage: "emerging",
    x: 710,
    y: 170,
    portraitFile: "april-yi-wang.jpg",
    portraitSource: sources.ethFaculty,
    facts: [
      fact("当前任职", "ETH Zurich Department of Computer Science Educational Technology tenure-track Assistant Professor，并领导 PEACH Lab。", sources.aprilWelcome),
      fact("教育与学术训练", "获 Zhejiang University 计算机科学学士、Simon Fraser University 计算机科学硕士及 University of Michigan Information Science 博士。", sources.aprilWelcome),
      fact("研究主线", "研究 HCI、教育技术、人机协同、面向编程的交互界面与 AI 支持的个性化学习。", sources.aprilWelcome),
      fact("跨组合作", "PEACH 官方项目页列其与 Mrinmaya Sachan 共同担任多模态视觉教学系统项目 PI。", sources.aprilMultimodal),
    ],
    sources: [sources.ethFaculty, sources.aprilWelcome, sources.aprilTeam, sources.aprilMultimodal, sources.mennaBhada],
  }),
  person({
    id: "valentina-boeva-eth-p0-2026",
    name: "Valentina Boeva",
    role: "Assistant Professor · Computational Cancer Genomics Lab",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Biomedical Machine Learning · Cancer Genomics · Multi-omics",
    tags: ["Biomedical AI", "Machine Learning", "Cancer Genomics", "Multi-omics"],
    summary: "ETH Computational Cancer Genomics Group 负责人，以统计学习、基础模型和多组学整合研究肿瘤可塑性与临床决策。",
    stage: "senior",
    x: 890,
    y: 170,
    portraitFile: "valentina-boeva.jpg",
    portraitSource: sources.ethFaculty,
    facts: [
      fact("当前任职", "ETH Zurich Department of Computer Science Biomedical Informatics Assistant Professor，并领导 Computational Cancer Genomics Group。", sources.valentinaNccr),
      fact("教育与学术训练", "2003 年获 Lomonosov Moscow State University 数学硕士，2007 年获该校 Bioengineering and Bioinformatics 博士，随后在 École Polytechnique/INRIA 与 Curie Institute 从事博士后研究。", sources.valentinaProfile),
      fact("研究主线", "开发统计与机器学习方法整合多组学数据，提取生存和治疗生物标志物并支持临床决策。", sources.valentinaProfile),
      fact("跨学科项目", "在 NCCR Children & Cancer 中共同领导研究模块，将多组学模型与儿童癌症诊疗研究连接。", sources.valentinaNccr),
    ],
    sources: [sources.ethFaculty, sources.valentinaProfile, sources.valentinaPeople, sources.valentinaNccr],
  }),
  person({
    id: "celestine-mendler-dunner-eth-p0-2026",
    name: "Celestine Mendler-Dünner",
    role: "Associate Professor of Artificial Intelligence",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Machine Learning · Human-AI Dynamics · Responsible AI",
    tags: ["Machine Learning", "Human-AI Interaction", "Responsible AI", "Performative Prediction"],
    summary: "ETH 人工智能副教授，研究学习系统如何在用户反馈、社会价值和经济激励作用下演化，并据此设计更可靠的 AI。",
    stage: "emerging",
    x: 1070,
    y: 170,
    portraitFile: "celestine-mendler-dunner.jpg",
    portraitSource: sources.ethFaculty,
    facts: [
      fact("当前任职", "2026 年 9 月起任 ETH Zurich Department of Computer Science Associate Professor of Artificial Intelligence；此前是 ELLIS Institute Tübingen Principal Investigator。", sources.celestineWelcome),
      fact("教育与学术训练", "在 ETH Zurich Data Analytics Lab 完成题为 System-Aware Algorithms for Machine Learning 的博士论文，导师为 Thomas Hofmann。", sources.celestineMedal),
      fact("研究主线", "研究机器学习与 AI 系统如何通过用户反馈演化，以及它们与社会价值、个体和经济激励的相互作用。", sources.celestineWelcome),
      fact("学生网络", "ETH 官方学生页列 Patrik Wolf 为其与 Andreas Krause 共同指导的博士生，研究测试时训练和偏好对齐。", sources.celestineStudent),
    ],
    sources: [sources.ethFaculty, sources.celestineWelcome, sources.celestineMedal, sources.celestineStudent],
  }),
  person({
    id: "christian-holz-eth-p0-2026",
    name: "Christian Holz",
    role: "Associate Professor · SIPLAB Director",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Human-Computer Interaction · Sensing · Human-Centred AI",
    tags: ["HCI", "Human-Centred AI", "Mixed Reality", "Wearable Sensing"],
    summary: "ETH Sensing, Interaction & Perception Lab 负责人，以感知、机器学习和交互设计构建混合现实、数字健康与人本 AI 系统。",
    stage: "senior",
    x: 1250,
    y: 170,
    portraitFile: "christian-holz.jpg",
    portraitSource: sources.ethFaculty,
    facts: [
      fact("当前任职", "ETH Zurich Department of Computer Science Associate Professor，并领导 Sensing, Interaction & Perception Lab。", sources.christianProfile),
      fact("教育与学术训练", "2013 年获 University of Potsdam 计算机科学博士学位。", sources.christianEducation),
      fact("研究主线", "研究人机交互、可穿戴与传感系统、混合现实、数字健康和结合感知与机器学习的智能界面。", sources.christianEthAi),
      fact("产业经历", "加入 ETH 前曾任 Microsoft Research Principal Researcher。", sources.christianEthAi),
    ],
    sources: [sources.ethFaculty, sources.christianProfile, sources.christianTeam, sources.christianEducation, sources.christianEthAi],
  }),
];

export const candidatePriorityP0EuropeRemainingReadyChunk1Relationships2026: Relationship[] = [
  {
    id: "p0-eu-rem1-menna-april-coadvising",
    from: "mennatallah-el-assady-eth-p0-2026",
    to: "april-yi-wang-eth-p0-2026",
    type: "collaboration",
    subtype: "joint_project",
    label: "共同指导博士生",
    evidence: "ETH IVIA 的 Bhada Yun 官方页面明确写明其由 Mennatallah El-Assady 与 April Yi Wang 共同指导。",
    source: sources.mennaBhada,
    verified: true,
  },
  {
    id: "p0-eu-rem1-april-mrinmaya-project",
    from: "april-yi-wang-eth-p0-2026",
    to: "mrinmaya-sachan-eth-next",
    type: "collaboration",
    subtype: "joint_project",
    label: "多模态教学系统共同 PI",
    evidence: "PEACH Lab 的 Multimodal Tutor 项目页将 April Wang 与 Mrinmaya Sachan 同列为 Principal Investigators。",
    source: sources.aprilMultimodal,
    verified: true,
  },
  {
    id: "p0-eu-rem1-hofmann-celestine-doctoral",
    from: "thomas-hofmann-eu",
    to: "celestine-mendler-dunner-eth-p0-2026",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "ETH D-INFK 的博士论文奖页面明确列 Celestine Mendler-Dünner 的论文导师为 Thomas Hofmann。",
    source: sources.celestineMedal,
    verified: true,
  },
];

export const candidatePriorityP0EuropeRemainingReadyChunk1Placements2026: StudentPlacement[] = [
  {
    id: "p0-eu-rem1-stelian-moritz-flink",
    student: "Moritz Geilinger",
    teacherId: "stelian-coros-eth-p0-2026",
    company: "Flink Robotics",
    role: "Founding team / robotics researcher",
    kind: "founder",
    sector: "startup",
    highLevel: true,
    degree: "PhD",
    graduationYear: 2021,
    note: "CRL 人员页同时将 Moritz Geilinger 列为 2021 PhD alumni 与 Flink Robotics 成员；ETH 报道说明该公司由 Coros 与前博士生于 2023 年创办。",
    source: sources.stelianPeople,
    verifiedAt: checkedAt,
  },
];

export const candidatePriorityP0EuropeRemainingReadyChunk1GroupMembers2026: GroupMember[] = [
  { id: "p0-eu-rem1-barbara-cyrill", teacherId: "barbara-solenthaler-eth-p0-2026", name: "Cyrill Imahorn", role: "PhD Student", focus: "Simulation and animation", source: sources.barbaraTeam },
  { id: "p0-eu-rem1-stelian-daniela", teacherId: "stelian-coros-eth-p0-2026", name: "Daniela Macari", role: "PhD Student", focus: "Computational robotics", source: sources.stelianPeople },
  { id: "p0-eu-rem1-menna-bhada", teacherId: "mennatallah-el-assady-eth-p0-2026", name: "Bhada Yun", role: "Direct Doctorate Student · co-advised with April Yi Wang", focus: "Human-AI interaction and agentic systems", source: sources.mennaBhada },
  { id: "p0-eu-rem1-april-junling", teacherId: "april-yi-wang-eth-p0-2026", name: "Junling Wang", role: "Doctoral Student", focus: "Multimodal retrieval and generation", source: sources.aprilTeam },
  { id: "p0-eu-rem1-valentina-marc", teacherId: "valentina-boeva-eth-p0-2026", name: "Marc Glettig", role: "PhD Student", focus: "Computational cancer genomics", source: sources.valentinaPeople },
  { id: "p0-eu-rem1-celestine-patrik", teacherId: "celestine-mendler-dunner-eth-p0-2026", name: "Patrik Wolf", role: "CLS PhD Student · co-advised with Andreas Krause", focus: "Test-time training and preference alignment", source: sources.celestineStudent },
  { id: "p0-eu-rem1-christian-max", teacherId: "christian-holz-eth-p0-2026", name: "Max Moebus", role: "Doctoral researcher", focus: "Applied statistics for mobile health", source: sources.christianTeam },
];

export const candidatePriorityP0EuropeRemainingReadyChunk1RosterPromotions2026 = [
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Barbara Solenthaler", atlasPersonId: "barbara-solenthaler-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Stelian Coros", atlasPersonId: "stelian-coros-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Mennatallah El-Assady", atlasPersonId: "mennatallah-el-assady-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "April Yi Wang", atlasPersonId: "april-yi-wang-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Valentina Boeva", atlasPersonId: "valentina-boeva-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Celestine Mendler-Dünner", atlasPersonId: "celestine-mendler-dunner-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Christian Holz", atlasPersonId: "christian-holz-eth-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeRemainingReadyChunk1People2026;
export const relationships = candidatePriorityP0EuropeRemainingReadyChunk1Relationships2026;
export const placements = candidatePriorityP0EuropeRemainingReadyChunk1Placements2026;
export const groupMembers = candidatePriorityP0EuropeRemainingReadyChunk1GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeRemainingReadyChunk1RosterPromotions2026;
