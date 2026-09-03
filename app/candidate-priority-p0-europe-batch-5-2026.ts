import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  epflRoster: source(
    "EPFL IC · Faculty members",
    "https://www.epfl.ch/schools/ic/about/faculty-members/",
    "official",
    "EPFL IC 现任 faculty 名录与独立 PI 身份",
  ),
  lenkaProfile: source(
    "EPFL · Lenka Zdeborová",
    "https://people.epfl.ch/lenka.zdeborova?lang=en",
    "official",
    "现任教授身份、SPOC 负责人、博士训练、博士后经历、研究方向、博士生名单与官方头像",
  ),
  lenkaTeam: source(
    "EPFL SPOC · Members",
    "https://www.epfl.ch/labs/spoc/members/",
    "official",
    "SPOC 负责人和当前博士生、博士后与研究人员名单",
  ),
  martinProfile: source(
    "EPFL · Martin Schrimpf",
    "https://people.epfl.ch/martin.schrimpf/?lang=en",
    "official",
    "现任 tenure-track professor、MIT 博士与 Jim DiCarlo 导师、教育经历、研究方向、博士生名单和官方头像",
  ),
  martinTeam: source(
    "EPFL NeuroAI Lab · Team",
    "https://www.epfl.ch/labs/schrimpflab/",
    "official",
    "NeuroAI Lab 的研究范围、Martin Schrimpf 的 PI 身份和当前博士生名单",
  ),
  edinburghRoster: source(
    "University of Edinburgh Informatics · Academic staff",
    "https://informatics.ed.ac.uk/people/academic-staff",
    "official",
    "Edinburgh Informatics 现任 academic staff 名录与职位",
  ),
  adamProfile: source(
    "Adam Lopez · Academic homepage",
    "https://alopez.github.io/",
    "profile",
    "Edinburgh 现任 academic 身份、NLP 研究、学术与产业经历及历届博士生名单",
  ),
  adamPhd: source(
    "University of Maryland DRUM · Machine Translation by Pattern Matching",
    "https://drum.lib.umd.edu/items/3e4462fc-5ce6-4fa7-8518-d2b274e49a71",
    "thesis",
    "Adam Lopez 2008 年博士论文、论文题目与导师 Philip Resnik",
  ),
  adamTeam: source(
    "Edinburgh NLP · People",
    "https://edinburghnlp.inf.ed.ac.uk/index.php/people/",
    "official",
    "Adam Lopez 的 Edinburgh NLP 成员身份、研究方向与 Andreas Grivas 的指导关系",
  ),
  emilyProfile: source(
    "University of Edinburgh Research Explorer · Emily Allaway",
    "https://www.research.ed.ac.uk/en/persons/emily-allaway/",
    "official",
    "Chancellor's Fellow 现职、Columbia 博士与 Kathleen McKeown 指导、研究主线和产业实习经历",
  ),
  emilyHomepage: source(
    "Emily Allaway · Academic homepage",
    "https://emilyallaway.github.io/",
    "profile",
    "学术履历、博士导师、AI2 与 Amazon Science 实习、论文列表和个人头像",
  ),
  cambridgeRoster: source(
    "Cambridge CST · Faculty directory",
    "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en",
    "official",
    "Cambridge CST 现任 faculty 名录",
  ),
  haticeProfile: source(
    "Cambridge CST · Hatice Gunes",
    "https://www.cst.cam.ac.uk/people/hg410",
    "official",
    "全职教授、AFAR Lab 主任、UTS 博士与 Imperial 博士后经历、研究方向及官方头像",
  ),
  haticeTeam: source(
    "Cambridge AFAR Lab · Team",
    "https://cambridge-afar.github.io/",
    "official",
    "Hatice Gunes 的实验室领导身份和公开博士生、博士后及访问成员名单",
  ),
  ethRoster: source(
    "ETH Zurich D-INFK · Faculty",
    "https://inf.ethz.ch/people/faculty.html",
    "official",
    "ETH D-INFK 现任 faculty 名录、职称和官方头像",
  ),
  shivaramProfile: source(
    "Shivaram Venkataraman · ETH research group",
    "https://shivaram.inf.ethz.ch/",
    "profile",
    "ETH 副教授现职、UC Berkeley 博士导师、ML systems 与 LLM inference 研究、学生和校友去向",
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
    src: `portraits/candidate-p0-europe-batch-5-2026/${seed.portraitFile}`,
    alt: `${seed.name} 头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0EuropeBatch5People2026: Person[] = [
  person({
    id: "lenka-zdeborova-epfl-p0-2026",
    name: "Lenka Zdeborová",
    role: "Professor · SPOC Laboratory Head",
    institution: "EPFL",
    region: "Europe",
    area: "Statistical Physics of Machine Learning · Inference · Optimization",
    tags: ["Machine Learning Theory", "Statistical Physics", "Inference", "Optimization"],
    summary: "EPFL Statistical Physics of Computation Laboratory 负责人，以统计物理方法研究机器学习、推断和优化中的基本问题。",
    stage: "senior",
    x: 170,
    y: 170,
    portraitFile: "lenka-zdeborova.jpg",
    portraitSource: sources.lenkaProfile,
    facts: [
      fact("当前任职", "EPFL 物理与计算机科学教授，领导 Statistical Physics of Computation Laboratory。", sources.lenkaProfile),
      fact("教育与学术训练", "2008 年获 University of Paris-Sud 与 Charles University Prague 物理学博士，随后任 Los Alamos National Laboratory Director's Postdoctoral Fellow。", sources.lenkaProfile),
      fact("研究主线", "将均场方法、replica method 和 message-passing 等统计物理工具用于机器学习、信号处理、推断与优化。", sources.lenkaProfile),
      fact("人才网络", "EPFL 页面公开列出 Fabrizio Boncoraglio 等现任博士生，以及往届 EPFL 博士生。", sources.lenkaTeam),
    ],
    sources: [sources.epflRoster, sources.lenkaProfile, sources.lenkaTeam],
  }),
  person({
    id: "martin-schrimpf-epfl-p0-2026",
    name: "Martin Schrimpf",
    role: "Tenure-Track Assistant Professor · NeuroAI Lab PI",
    institution: "EPFL",
    region: "Europe",
    area: "NeuroAI · Multimodal Models · Human-Aligned AI",
    tags: ["NeuroAI", "Multimodal", "Vision", "Language", "Cognitive Science"],
    summary: "EPFL NeuroAI Lab 负责人，连接深度学习、神经科学和认知科学，研究与人脑表征及行为对齐的多模态模型。",
    stage: "emerging",
    x: 350,
    y: 170,
    portraitFile: "martin-schrimpf.jpg",
    portraitSource: sources.martinProfile,
    facts: [
      fact("当前任职", "EPFL tenure-track assistant professor，领导跨生命科学与计算机学院的 NeuroAI Lab。", sources.martinProfile),
      fact("教育与学术训练", "2017–2022 年在 MIT Brain and Cognitive Sciences 完成博士学位，由 Jim DiCarlo 指导；此前在 TUM、LMU 与 UNA 学习计算机科学和软件工程。", sources.martinProfile),
      fact("研究主线", "建立能够匹配脑内神经表征并在人类行为层面对齐的人工神经网络，覆盖视觉、语言和多模态认知。", sources.martinTeam),
      fact("学术与产业连接", "曾在 Harvard 与 Gabriel Kreiman 开展人类视觉研究，并在 Salesforce 与 Richard Socher 开展 NLP 强化学习研究；亦曾联合创办两家公司。", sources.martinProfile),
    ],
    sources: [sources.epflRoster, sources.martinProfile, sources.martinTeam],
  }),
  person({
    id: "adam-lopez-edinburgh-p0-2026",
    name: "Adam Lopez",
    role: "Reader · Natural Language Processing",
    institution: "Edinburgh",
    region: "Europe",
    area: "Natural Language Processing · Machine Translation · Responsible NLP",
    tags: ["NLP", "Machine Translation", "Responsible AI", "Machine Learning"],
    summary: "Edinburgh NLP Reader，长期研究机器翻译与广义 NLP 问题，并公开维护从 Michael Auli 到新一代学者的博士生谱系。",
    stage: "senior",
    x: 530,
    y: 170,
    portraitFile: "adam-lopez.jpg",
    portraitSource: sources.adamTeam,
    facts: [
      fact("当前任职", "University of Edinburgh School of Informatics Reader，并是 Edinburgh NLP 学术成员。", sources.edinburghRoster),
      fact("教育与学术训练", "2008 年在 University of Maryland 完成博士论文《Machine Translation by Pattern Matching》，导师为 Philip Resnik。", sources.adamPhd),
      fact("研究主线", "研究自然语言处理与机器学习，并关注 fairness、accountability、transparency 与 ethics。", sources.adamTeam),
      fact("人才网络", "个人学术主页列出 Michael Auli、Naomi Saphra、Seraphina Goldfarb-Tarrant、Andreas Grivas 等历届博士生。", sources.adamProfile),
    ],
    sources: [sources.edinburghRoster, sources.adamProfile, sources.adamPhd, sources.adamTeam],
  }),
  person({
    id: "emily-allaway-edinburgh-p0-2026",
    name: "Emily Allaway",
    role: "Chancellor's Fellow · AI and Data Science",
    institution: "Edinburgh",
    region: "Europe",
    area: "Natural Language Reasoning · Implicit Meaning · Neuro-Symbolic NLP",
    tags: ["NLP", "Reasoning", "Commonsense", "Neuro-Symbolic AI", "LLM"],
    summary: "Edinburgh Chancellor's Fellow，研究语言中的隐含意义、非单调与常识推理，以及融合语言学知识的神经符号系统。",
    stage: "emerging",
    x: 710,
    y: 170,
    portraitFile: "emily-allaway.jpg",
    portraitSource: sources.emilyHomepage,
    facts: [
      fact("当前任职", "University of Edinburgh School of Informatics Chancellor's Fellow（AI and Data Science）。", sources.emilyProfile),
      fact("教育与学术训练", "在 Columbia University 获计算机科学博士，博士阶段由 Kathleen McKeown 指导，论文研究语言中的隐含意义与推理。", sources.emilyProfile),
      fact("研究主线", "关注 generics、non-monotonic reasoning、commonsense reasoning，以及引入语言学思想的 neuro-symbolic systems。", sources.emilyProfile),
      fact("产业与研究机构经历", "博士期间曾在 AI2 MOSAIC 团队和 Amazon Science 实习，并与两边的研究人员开展合作。", sources.emilyHomepage),
    ],
    sources: [sources.edinburghRoster, sources.emilyProfile, sources.emilyHomepage],
  }),
  person({
    id: "hatice-gunes-cambridge-p0-2026",
    name: "Hatice Gunes",
    role: "Full Professor · AFAR Lab Director",
    institution: "Cambridge",
    region: "Europe",
    area: "Affective Intelligence · Social Robotics · Multimodal AI",
    tags: ["Affective Computing", "Social Robotics", "Multimodal AI", "Human-Robot Interaction"],
    summary: "Cambridge Affective Intelligence and Robotics Lab 主任，围绕多模态情感智能、社会机器人和人类非语言行为理解推进具身 AI。",
    stage: "senior",
    x: 890,
    y: 170,
    portraitFile: "hatice-gunes.jpg",
    portraitSource: sources.haticeProfile,
    facts: [
      fact("当前任职", "Cambridge CST Full Professor of Affective Intelligence and Robotics、AFAR Lab 主任及 CHIA 副主任。", sources.haticeProfile),
      fact("教育与学术训练", "获 University of Technology Sydney 计算机科学博士，随后在 Imperial College London 从事博士后研究并参与 SEMAINE 项目。", sources.haticeProfile),
      fact("研究主线", "研究面向具身智能体与机器人的多模态、社会与情感智能，连接机器学习、情感计算、社会信号处理和非语言行为理解。", sources.haticeProfile),
      fact("团队建设", "AFAR 官方团队页公开博士生、博士后、访问成员和合作学者，并将 Hatice Gunes 列为实验室负责人。", sources.haticeTeam),
    ],
    sources: [sources.cambridgeRoster, sources.haticeProfile, sources.haticeTeam],
  }),
  person({
    id: "shivaram-venkataraman-eth-p0-2026",
    name: "Shivaram Venkataraman",
    role: "Associate Professor · Systems and Machine Learning",
    institution: "ETH Zurich",
    region: "Europe",
    area: "ML Systems · LLM Inference · Vector Search",
    tags: ["ML Systems", "LLM Inference", "Vector Search", "Distributed Systems"],
    summary: "ETH D-INFK 副教授，研究系统与机器学习的双向融合，重点包括低成本 LLM 推理、GPU 能耗与可扩展向量检索。",
    stage: "emerging",
    x: 1070,
    y: 170,
    portraitFile: "shivaram-venkataraman.jpg",
    portraitSource: sources.ethRoster,
    facts: [
      fact("当前任职", "ETH Zurich Department of Computer Science 副教授、Systems Group 成员；此前任 UW–Madison faculty。", sources.shivaramProfile),
      fact("教育与学术训练", "在 UC Berkeley 完成博士学位，由 Ion Stoica 与 Michael Franklin 指导；此前获 UIUC 硕士学位。", sources.shivaramProfile),
      fact("研究主线", "研究 ML systems、LLM inference、GPU 变异与功耗建模、向量检索，以及用机器学习优化系统组件。", sources.shivaramProfile),
      fact("人才流动", "研究组主页公开当前学生和校友去向，包括 NVIDIA Research Labs、AWS、MIT、UT Austin、Huawei、Databricks 与多家云计算企业。", sources.shivaramProfile),
    ],
    sources: [sources.ethRoster, sources.shivaramProfile],
  }),
];

export const candidatePriorityP0EuropeBatch5Relationships2026: Relationship[] = [
  {
    id: "p0-eu5-mckeown-allaway-doctoral",
    from: "kathleen-mckeown-us",
    to: "emily-allaway-edinburgh-p0-2026",
    type: "lineage",
    label: "博士导师",
    evidence: "Edinburgh Research Explorer 明确写明 Emily Allaway 在 Columbia 博士阶段与 Kathleen McKeown 工作，并将其称为 Prof. Kathleen McKeown。",
    source: sources.emilyProfile,
    verified: true,
  },
];

export const candidatePriorityP0EuropeBatch5Placements2026: StudentPlacement[] = [
  {
    id: "p0-eu5-shivaram-song-bian-nvidia",
    student: "Song Bian",
    teacherId: "shivaram-venkataraman-eth-p0-2026",
    company: "NVIDIA Research Labs",
    role: "Researcher",
    kind: "current",
    sector: "industry",
    highLevel: false,
    degree: "PhD",
    note: "Shivaram Venkataraman 的研究组主页将 Song Bian 列为 PhD alumnus，并给出其去向为 NVIDIA Research Labs。",
    source: sources.shivaramProfile,
    verifiedAt: checkedAt,
  },
];

export const candidatePriorityP0EuropeBatch5GroupMembers2026: GroupMember[] = [
  {
    id: "p0-eu5-lenka-fabrizio-boncoraglio",
    teacherId: "lenka-zdeborova-epfl-p0-2026",
    name: "Fabrizio Boncoraglio",
    role: "Doctoral Assistant",
    focus: "Statistical physics of machine learning and inference",
    source: sources.lenkaTeam,
  },
  {
    id: "p0-eu5-martin-badr-alkhamissi",
    teacherId: "martin-schrimpf-epfl-p0-2026",
    name: "Badr Alkhamissi",
    role: "Doctoral Assistant",
    focus: "NeuroAI and multimodal brain-aligned models",
    source: sources.martinTeam,
  },
  {
    id: "p0-eu5-adam-andreas-grivas",
    teacherId: "adam-lopez-edinburgh-p0-2026",
    name: "Andreas Grivas",
    role: "PhD student / alumnus",
    focus: "Natural language processing",
    source: sources.adamTeam,
  },
  {
    id: "p0-eu5-hatice-jiaee-chong",
    teacherId: "hatice-gunes-cambridge-p0-2026",
    name: "Jiaee Chong",
    role: "PhD Student",
    focus: "Affective intelligence and responsible affective computing",
    source: sources.haticeTeam,
  },
  {
    id: "p0-eu5-shivaram-minghao-yan",
    teacherId: "shivaram-venkataraman-eth-p0-2026",
    name: "Minghao Yan",
    role: "PhD group member",
    focus: "Efficient LLM training and inference systems",
    source: sources.shivaramProfile,
  },
];

export const candidatePriorityP0EuropeBatch5RosterPromotions2026 = [
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Lenka Zdeborova", atlasPersonId: "lenka-zdeborova-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Martin Schrimpf", atlasPersonId: "martin-schrimpf-epfl-p0-2026" },
  { unitUrl: "https://informatics.ed.ac.uk/people/academic-staff", rosterName: "Adam Lopez", atlasPersonId: "adam-lopez-edinburgh-p0-2026" },
  { unitUrl: "https://informatics.ed.ac.uk/people/academic-staff", rosterName: "Emily Allaway", atlasPersonId: "emily-allaway-edinburgh-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Hatice Gunes", atlasPersonId: "hatice-gunes-cambridge-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Shivaram Venkataraman", atlasPersonId: "shivaram-venkataraman-eth-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch5People2026;
export const relationships = candidatePriorityP0EuropeBatch5Relationships2026;
export const placements = candidatePriorityP0EuropeBatch5Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch5GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch5RosterPromotions2026;
