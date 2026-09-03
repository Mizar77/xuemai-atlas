import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  cambridgeRoster: source(
    "Cambridge CST · Faculty directory",
    "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en",
    "official",
    "Cambridge CST 现任 faculty 名录与独立 PI 身份",
  ),
  amandaProfile: source(
    "Cambridge CST · Amanda Prorok",
    "https://www.cst.cam.ac.uk/people/asp45",
    "official",
    "教授现职、EPFL 博士训练、研究主线、奖项与官方头像",
  ),
  prorokLab: source(
    "Prorok Lab · Official group page",
    "https://proroklab.org/",
    "profile",
    "Prorok Lab 的研究方向、团队规模、博士生毕业记录与公开成员",
  ),
  rikaProfile: source(
    "Cambridge CST · Rika Antonova",
    "https://www.cst.cam.ac.uk/people/ra702",
    "official",
    "副教授现职、KTH 博士与 CMU 硕士导师、Stanford 训练、产业经历和官方头像",
  ),
  camral: source(
    "CamRAL · Team",
    "https://camral.github.io/",
    "profile",
    "Rika Antonova 的实验室负责人身份、研究主题和当前博士生名单",
  ),
  pietroProfile: source(
    "Cambridge CST · Pietro Liò",
    "https://www.cst.cam.ac.uk/people/pl219",
    "official",
    "正教授现职、两项博士训练、AI/计算生物学研究、学生名单和官方头像",
  ),
  pietroHomepage: source(
    "Pietro Liò · Cambridge academic homepage",
    "https://www.cl.cam.ac.uk/~pl219/",
    "profile",
    "Cambridge 任职、研究方向、实验室与公开学术活动",
  ),
  evangeliaProfile: source(
    "Cambridge CST · Evangelia Kalyvianaki",
    "https://www.cst.cam.ac.uk/people/ek264",
    "official",
    "副教授现职、Cambridge 博士与 Imperial 博士后训练、系统研究、学生及产业经历和官方头像",
  ),
  evangeliaThesis: source(
    "Cambridge Computer Laboratory · Adaptive Resource Management for Virtualized Servers",
    "https://www.cl.cam.ac.uk/techreports/UCAM-CL-TR-762.html",
    "thesis",
    "Evangelia Kalyvianaki 的博士论文、Cambridge Computer Laboratory 学位记录与论文主题",
  ),
  ceciliaProfile: source(
    "Cambridge CST · Cecilia Mascolo",
    "https://www.cst.cam.ac.uk/people/cm542",
    "official",
    "正教授现职、Bologna 博士训练、移动健康与机器学习研究及官方头像",
  ),
  ceciliaHomepage: source(
    "Cecilia Mascolo · Cambridge academic homepage",
    "https://www.cl.cam.ac.uk/users/cm542/",
    "profile",
    "研究团队规模、博士生培养、研究项目与产业合作概况",
  ),
  simoneProfile: source(
    "Cambridge CST · Simone Teufel",
    "https://www.cst.cam.ac.uk/people/sht25",
    "official",
    "教授现职、Stuttgart 与 Edinburgh 学位、Columbia 博士后、NLP 研究和官方头像",
  ),
  simoneHomepage: source(
    "Simone Teufel · Cambridge academic homepage",
    "https://www.cl.cam.ac.uk/~sht25/",
    "profile",
    "语言与信息研究、科学文本分析、学术履历和研究团队入口",
  ),
  tomProfile: source(
    "Cambridge CST · Tom Gur",
    "https://www.cst.cam.ac.uk/people/tg424",
    "official",
    "教授现职、2017 博士论文、量子与经典复杂性研究、当前团队、校友去向和官方头像",
  ),
  tomThesis: source(
    "Weizmann Institute · On Locally Verifiable Proofs of Proximity",
    "https://www.wisdom.weizmann.ac.il/~oded/PDF/tom-phd.pdf",
    "thesis",
    "Tom Gur 2017 年博士论文原文及其理论计算机科学训练",
  ),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, sourceValue: Source) => ({
  label,
  value,
  source: sourceValue,
});

type PersonSeed = Omit<
  Person,
  "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"
> & {
  portraitFile: string;
  portraitSource: Source;
};

const person = (seed: PersonSeed): Person => ({
  ...seed,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-europe-batch-6-2026/${seed.portraitFile}`,
    alt: `${seed.name} 头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0EuropeBatch6People2026: Person[] = [
  person({
    id: "amanda-prorok-cambridge-p0-2026",
    name: "Amanda Prorok",
    role: "Professor of Collective Intelligence and Robotics · Prorok Lab PI",
    institution: "Cambridge",
    region: "Europe",
    area: "Multi-Agent Systems · Collective Robotics · Robot Learning",
    tags: ["Multi-Agent Systems", "Robotics", "Collective Intelligence", "Reinforcement Learning"],
    summary: "Cambridge Prorok Lab 负责人，以可学习的多智能体协同方法推动异构机器人集群、分布式感知和可信机器人系统。",
    stage: "senior",
    x: 160,
    y: 180,
    portraitFile: "amanda-prorok.jpg",
    portraitSource: sources.amandaProfile,
    facts: [
      fact("当前任职", "Cambridge Computer Science and Technology 集体智能与机器人学教授、Pembroke College Fellow，并领导 Prorok Lab。", sources.amandaProfile),
      fact("教育与学术训练", "在 EPFL 完成计算机科学博士训练，其博士论文获 ABB Prize（EPFL 计算机科学最佳博士论文）。", sources.amandaProfile),
      fact("研究主线", "开创面向多智能体系统的可微通信方法，并将数据驱动协同用于多机器人感知、控制和大规模异构系统。", sources.amandaProfile),
      fact("人才网络", "Prorok Lab 官方页面记录 Steven Morad、Jan Blumenkamp 与 Ryan Kortvelesy 于 2025 年从实验室完成博士学位。", sources.prorokLab),
    ],
    sources: [sources.cambridgeRoster, sources.amandaProfile, sources.prorokLab],
  }),
  person({
    id: "rika-antonova-cambridge-p0-2026",
    name: "Rika Antonova",
    role: "Associate Professor · CamRAL Lab PI",
    institution: "Cambridge",
    region: "Europe",
    area: "Robot Learning · Reinforcement Learning · Hardware-Policy Co-Design",
    tags: ["Robot Learning", "Reinforcement Learning", "Sim-to-Real", "Agentic AI"],
    summary: "Cambridge CamRAL Lab 负责人，研究现实世界自主系统中的数据高效强化学习、sim-to-real 与机器人硬件—策略协同设计。",
    stage: "emerging",
    x: 340,
    y: 180,
    portraitFile: "rika-antonova.jpg",
    portraitSource: sources.rikaProfile,
    facts: [
      fact("当前任职", "Cambridge 副教授并领导 Cambridge Resilient Autonomous Learning Lab。", sources.rikaProfile),
      fact("教育与学术训练", "在 Danica Kragic 领导的 KTH 团队完成 sim-to-real 博士研究；此前在 CMU Robotics Institute 获硕士学位，并明确由 Emma Brunskill 指导。", sources.rikaProfile),
      fact("研究主线", "研究机器人学习、数据高效强化学习、主动探索，以及机器人硬件与策略学习的协同设计。", sources.camral),
      fact("学术与产业经历", "曾以 NSF/CRA Computing Innovation Fellow 身份在 Stanford 与 Jeannette Bohg 团队工作，并在 NVIDIA Robotics、Microsoft Research 实习，早期曾任 Google 软件工程师。", sources.rikaProfile),
    ],
    sources: [sources.cambridgeRoster, sources.rikaProfile, sources.camral],
  }),
  person({
    id: "pietro-lio-cambridge-p0-2026",
    name: "Pietro Liò",
    role: "Professor of Computational Biology · AI Group",
    institution: "Cambridge",
    region: "Europe",
    area: "Graph Neural Networks · AI for Medicine · Computational Biology",
    tags: ["Graph Neural Networks", "AI for Medicine", "Computational Biology", "Digital Twins"],
    summary: "Cambridge AI Group 正教授，以图神经网络、多尺度多组学和机制模型研究精准医疗、系统医学与 AI 医疗数字孪生。",
    stage: "senior",
    x: 520,
    y: 180,
    portraitFile: "pietro-lio.jpg",
    portraitSource: sources.pietroProfile,
    facts: [
      fact("当前任职", "Cambridge Computer Science and Technology 计算生物学正教授、Artificial Intelligence Group 与 Cambridge Centre for AI in Medicine 成员。", sources.pietroProfile),
      fact("教育与学术训练", "分别在 University of Firenze 完成复杂系统与非线性动力学博士、在 University of Pavia 完成理论遗传学博士。", sources.pietroProfile),
      fact("研究主线", "开发图神经网络与 AI/计算生物学模型，整合多尺度、多组学和多物理数据以理解疾病复杂性并支持精准医疗。", sources.pietroProfile),
      fact("人才网络", "Cambridge 官方页面公开列出 Miruna Cretu、Rishabh Jain、Petar Veličković 等大批 current and past PhD students。", sources.pietroProfile),
    ],
    sources: [sources.cambridgeRoster, sources.pietroProfile, sources.pietroHomepage],
  }),
  person({
    id: "evangelia-kalyvianaki-cambridge-p0-2026",
    name: "Evangelia Kalyvianaki",
    role: "Associate Professor · Distributed Systems",
    institution: "Cambridge",
    region: "Europe",
    area: "Distributed Systems · Data-Centre Scheduling · LLM Serving",
    tags: ["Distributed Systems", "Cloud Computing", "Scheduling", "LLM Serving"],
    summary: "Cambridge 分布式系统副教授，围绕数据中心调度、资源管理与大规模数据处理研究现代系统的性能和可预测性。",
    stage: "senior",
    x: 700,
    y: 180,
    portraitFile: "evangelia-kalyvianaki.jpg",
    portraitSource: sources.evangeliaProfile,
    facts: [
      fact("当前任职", "Cambridge Computer Science and Technology 副教授；此前任 City University London Lecturer。", sources.evangeliaProfile),
      fact("教育与学术训练", "在 Cambridge Computer Laboratory SRG/netos group 获博士学位，随后在 Imperial College London 从事博士后研究；本科和硕士毕业于 University of Crete。", sources.evangeliaProfile),
      fact("研究主线", "研究分布式系统、数据中心调度、资源管理、系统性能与大数据处理，并覆盖 LLM serving 的负载均衡。", sources.evangeliaProfile),
      fact("人才与产业网络", "官方页面列出博士生 Jan Vincent Szlang、Simon Istvan Virag、Wei Da，并注明 Wei Da 曾在 LinkedIn、Jan Vincent Szlang 曾在 Snowflake。", sources.evangeliaProfile),
    ],
    sources: [sources.cambridgeRoster, sources.evangeliaProfile, sources.evangeliaThesis],
  }),
  person({
    id: "cecilia-mascolo-cambridge-p0-2026",
    name: "Cecilia Mascolo",
    role: "Professor of Mobile Systems · Centre Co-Director",
    institution: "Cambridge",
    region: "Europe",
    area: "Mobile Systems · Machine Learning · Mobile Health",
    tags: ["Mobile Systems", "Mobile Health", "Wearables", "Machine Learning"],
    summary: "Cambridge 移动系统教授，将机器学习、可穿戴传感和移动计算用于数字健康，并长期建设规模化博士生与博士后团队。",
    stage: "senior",
    x: 880,
    y: 180,
    portraitFile: "cecilia-mascolo.jpg",
    portraitSource: sources.ceciliaProfile,
    facts: [
      fact("当前任职", "Cambridge Computer Science and Technology 移动系统正教授，并共同领导 Centre for Mobile, Wearable Systems and Augmented Intelligence。", sources.ceciliaProfile),
      fact("教育与学术训练", "在 University of Bologna 获博士学位；加入 Cambridge 前曾任 UCL Computer Science faculty。", sources.ceciliaProfile),
      fact("研究主线", "研究移动与可穿戴系统、面向移动和传感数据的机器学习，以及 mobile health。", sources.ceciliaProfile),
      fact("人才网络", "个人学术主页称其团队约有 15 名博士后和博士生、已培养约 25 名博士，并明确将 Andrea Ferlini 标为往届博士生。", sources.ceciliaHomepage),
    ],
    sources: [sources.cambridgeRoster, sources.ceciliaProfile, sources.ceciliaHomepage],
  }),
  person({
    id: "simone-teufel-cambridge-p0-2026",
    name: "Simone Teufel",
    role: "Professor of Language and Information",
    institution: "Cambridge",
    region: "Europe",
    area: "Natural Language Processing · Scientific Discourse · Summarization",
    tags: ["NLP", "Scientific Text", "Discourse", "Summarization"],
    summary: "Cambridge 语言与信息教授，以 Argumentative Zoning 等方法研究科学文本论证结构、文献理解与摘要。",
    stage: "senior",
    x: 1060,
    y: 180,
    portraitFile: "simone-teufel.jpg",
    portraitSource: sources.simoneProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Language and Information，研究领域明确归入 Natural Language Processing。", sources.simoneProfile),
      fact("教育与学术训练", "1994 年获 University of Stuttgart 计算机科学 Diplom，2000 年获 University of Edinburgh 认知科学博士，随后在 Columbia 与 Kathleen McKeown 从事医学信息检索博士后研究。", sources.simoneProfile),
      fact("研究主线", "研究文本理解、科学文本中的篇章结构与论证、文本摘要、人类论证和隐喻解释模型。", sources.simoneProfile),
      fact("方法影响", "提出 Argumentative Zoning，以科学写作中的立场、思想归属与修辞行为建模文献结构。", sources.simoneHomepage),
    ],
    sources: [sources.cambridgeRoster, sources.simoneProfile, sources.simoneHomepage],
  }),
  person({
    id: "tom-gur-cambridge-p0-2026",
    name: "Tom Gur",
    role: "Professor of Computer Science · Complexity Theory",
    institution: "Cambridge",
    region: "Europe",
    area: "Classical and Quantum Complexity · Cryptography · Learning Theory",
    tags: ["Complexity Theory", "Quantum Computing", "Cryptography", "Learning Theory"],
    summary: "Cambridge 理论计算机科学教授，研究经典与量子复杂性、子线性算法、零知识证明和计算学习理论，并公开维护团队与校友流向。",
    stage: "senior",
    x: 1240,
    y: 180,
    portraitFile: "tom-gur.jpg",
    portraitSource: sources.tomProfile,
    facts: [
      fact("当前任职", "Cambridge 计算机科学教授，属于 Algorithms & Complexity 与 Quantum Computing 两个研究组。", sources.tomProfile),
      fact("教育与学术训练", "2017 年完成博士论文《On Locally Verifiable Proofs of Proximity》，研究局部可验证证明与理论计算机科学。", sources.tomThesis),
      fact("研究主线", "覆盖经典与量子复杂性、子线性算法、property testing、密码学、零知识证明与计算学习理论。", sources.tomProfile),
      fact("人才网络", "官方个人页列出 Hugo Aaronson、Guy Goldberg 等现任博士生，并记录校友进入 Warwick、Stanford、Princeton、Riverlane 等机构。", sources.tomProfile),
    ],
    sources: [sources.cambridgeRoster, sources.tomProfile, sources.tomThesis],
  }),
];

export const candidatePriorityP0EuropeBatch6Relationships2026: Relationship[] = [
  {
    id: "p0-eu6-mckeown-teufel-postdoc",
    from: "kathleen-mckeown-us",
    to: "simone-teufel-cambridge-p0-2026",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导",
    evidence: "Cambridge 官方履历明确写明 Simone Teufel 于 2000 年在 Columbia University 与 Kathy McKeown 从事医学信息检索博士后研究。",
    source: sources.simoneProfile,
    verified: true,
    endYear: 2001,
  },
];

export const candidatePriorityP0EuropeBatch6Placements2026: StudentPlacement[] = [
  {
    id: "p0-eu6-tom-gur-marcel-dallagnol-princeton",
    student: "Marcel Dall'Agnol",
    teacherId: "tom-gur-cambridge-p0-2026",
    company: "Princeton University",
    role: "Lecturer",
    kind: "current",
    degree: "PhD",
    sector: "academia",
    highLevel: true,
    note: "Tom Gur 的 Cambridge 官方个人页将 Marcel Dall'Agnol 列为 PhD alumnus，并记录其去向为 Princeton University Lecturer。",
    source: sources.tomProfile,
    verifiedAt: checkedAt,
  },
];

export const candidatePriorityP0EuropeBatch6GroupMembers2026: GroupMember[] = [
  { id: "p0-eu6-amanda-steven-morad", teacherId: "amanda-prorok-cambridge-p0-2026", name: "Steven Morad", role: "PhD alumnus (2025)", focus: "Multi-robot learning and cooperative visual-spatial models", source: sources.prorokLab },
  { id: "p0-eu6-rika-hantao-zhong", teacherId: "rika-antonova-cambridge-p0-2026", name: "Hantao Zhong", role: "PhD Student", focus: "Multimodal sensing and robot mobility", source: sources.camral },
  { id: "p0-eu6-pietro-miruna-cretu", teacherId: "pietro-lio-cambridge-p0-2026", name: "Miruna Cretu", role: "Current or past PhD student", focus: "AI and computational biology", source: sources.pietroProfile },
  { id: "p0-eu6-evangelia-wei-da", teacherId: "evangelia-kalyvianaki-cambridge-p0-2026", name: "Wei Da", role: "PhD Student", focus: "Distributed scheduling and LLM serving", source: sources.evangeliaProfile },
  { id: "p0-eu6-cecilia-andrea-ferlini", teacherId: "cecilia-mascolo-cambridge-p0-2026", name: "Andrea Ferlini", role: "Former PhD student", focus: "Mobile and wearable systems", source: sources.ceciliaHomepage },
  { id: "p0-eu6-tom-hugo-aaronson", teacherId: "tom-gur-cambridge-p0-2026", name: "Hugo Aaronson", role: "PhD Student", focus: "Classical and quantum complexity theory", source: sources.tomProfile },
];

export const candidatePriorityP0EuropeBatch6RosterPromotions2026 = [
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Amanda Prorok", atlasPersonId: "amanda-prorok-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Rika Antonova", atlasPersonId: "rika-antonova-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Pietro Liò", atlasPersonId: "pietro-lio-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Evangelia Kalyvianaki", atlasPersonId: "evangelia-kalyvianaki-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Cecilia Mascolo", atlasPersonId: "cecilia-mascolo-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Simone Teufel", atlasPersonId: "simone-teufel-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Tom Gur", atlasPersonId: "tom-gur-cambridge-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch6People2026;
export const relationships = candidatePriorityP0EuropeBatch6Relationships2026;
export const placements = candidatePriorityP0EuropeBatch6Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch6GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch6RosterPromotions2026;
