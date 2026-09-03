import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  bertholdTum: source(
    "TUM professor directory · Berthold Bäuml",
    "https://www.professoren.tum.de/en/baeuml-berthold",
    "official",
    "TUM 现任教授身份、Learning AI for Dextrous Robots 教席与 CIT 所属",
  ),
  bertholdTeam: source(
    "TUM AIDX · Team",
    "https://www.ce.cit.tum.de/en/aidx/team/",
    "official",
    "Berthold Bäuml 为教席负责人，以及实验室当前科研人员名单",
  ),
  bertholdThesis: source(
    "University of Bremen repository · Berthold Bäuml dissertation",
    "https://media.suub.uni-bremen.de/handle/elib/1558",
    "thesis",
    "2019 年博士论文、导师 Bernd Krieg-Brückner、评审 Gerd Hirzinger 与论文研究内容",
  ),
  bertholdDlr: source(
    "DLR · Berthold Bäuml and Agile Justin",
    "https://www.dlr.de/en/media/publications/magazines/all-digital-magazines/dlrmagazine-174/everything-under-control/berthold-bauml-hands-justin-a-block",
    "official",
    "Autonomous Learning Robots Lab 领导、Agile Justin 研发责任与官方人物照片",
  ),
  pascalProfile: source(
    "EPFL · Pascal Frossard",
    "https://people.epfl.ch/pascal.frossard?lang=en",
    "official",
    "EPFL 全职教授、LTS4、AI Center 与 SDSC 职务、博士生名单及官方头像",
  ),
  pascalBio: source(
    "EPFL LTS4 · Pascal Frossard short bio",
    "https://www.epfl.ch/labs/lts4/people/people-current/frossard/frossard-more/",
    "profile",
    "EPFL 硕博训练、IBM T. J. Watson 经历、历次任职和研究方向",
  ),
  pascalTeam: source(
    "EPFL LTS4 · Current members",
    "https://www.epfl.ch/labs/lts4/people/people-current/",
    "official",
    "LTS4 负责人、现任博士生和研究团队名单",
  ),
  markProfile: source(
    "EPFL · Mark Pauly",
    "https://people.epfl.ch/mark.pauly?lang=en",
    "official",
    "EPFL 全职教授、教育与任职经历、研究领域、现任及历届博士生与官方头像",
  ),
  markTeam: source(
    "EPFL GCM · Team",
    "https://www.epfl.ch/labs/gcm/team/",
    "official",
    "GCM 当前成员、博士校友及其公开职业去向",
  ),
  markThesis: source(
    "ETH Research Collection · Mark Pauly doctoral thesis",
    "https://www.research-collection.ethz.ch/handle/20.500.11850/72744",
    "thesis",
    "2003 年 ETH 博士论文以及 Markus Gross 为论文 examiner 的原始元数据",
  ),
  markusBio: source(
    "ETH Computer Graphics Laboratory · Markus Gross long biography",
    "https://cgl.ethz.ch/people/grossm/about/longbio.php",
    "profile",
    "ETH 教授与 CGL 创办人、Saarland 学历、研究主线、Disney 职务和创业转化",
  ),
  markusExperience: source(
    "ETH Computer Graphics Laboratory · Education and experience",
    "https://cgl.ethz.ch/people/grossm/about/experience.php",
    "profile",
    "Markus Gross 的教育与学术、产业任职时间线",
  ),
  markusStudents: source(
    "ETH Computer Graphics Laboratory · PhD students",
    "https://cgl.ethz.ch/people/phd.php",
    "official",
    "CGL 当前博士生名单",
  ),
  markusPortrait: source(
    "ETH Computer Graphics Laboratory · Markus Gross contact",
    "https://cgl.ethz.ch/people/grossm/about/home.php",
    "profile",
    "Markus Gross 官方实验室人物页与官方头像",
  ),
  sharonProfile: source(
    "University of Edinburgh Research Explorer · Sharon Goldwater",
    "https://www.research.ed.ac.uk/en/persons/sharon-goldwater/",
    "official",
    "计算语言学习讲席教授现职、Brown 博士与 Mark Johnson 导师、Stanford 博士后和官方头像",
  ),
  sharonGroup: source(
    "Sharon Goldwater · Current and former students",
    "https://homepages.inf.ed.ac.uk/sgwater/students.html",
    "profile",
    "当前与历届学生、共同导师及公开毕业去向",
  ),
  matejaProfile: source(
    "University of Cambridge CST · Mateja Jamnik",
    "https://www.cst.cam.ac.uk/people/mj201",
    "official",
    "剑桥人工智能教授现职、研究方向、研究组归属与官方头像",
  ),
  matejaEducation: source(
    "University of Cambridge · International Women's Day profile",
    "https://www.cst.cam.ac.uk/international-womens-day",
    "official",
    "加拿大数学本科、剑桥计算机转换课程与 Edinburgh 人工智能博士训练",
  ),
  matejaGroup: source(
    "Mateja Jamnik · Group",
    "https://www.cl.cam.ac.uk/~mj201/group.html",
    "profile",
    "当前与历届博士生、研究主题和共同指导信息",
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
    src: `portraits/candidate-p0-europe-batch-3-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0EuropeBatch3People2026: Person[] = [
  person({
    id: "berthold-baeuml-tum-p0-2026",
    name: "Berthold Bäuml",
    role: "Professor · Learning AI for Dextrous Robots",
    institution: "TUM",
    region: "Europe",
    area: "Robot Learning · Dextrous Manipulation · Humanoid Robotics",
    tags: ["Robot Learning", "Dextrous Manipulation", "Reinforcement Learning", "Humanoid Robotics"],
    summary: "TUM Learning AI for Dextrous Robots 教授与 DLR Autonomous Learning Robots Lab 负责人，围绕 Agile Justin 推进强化学习、触觉感知和灵巧操作。",
    stage: "senior",
    x: 170,
    y: 170,
    portraitFile: "berthold-baeuml.jpg",
    portraitSource: sources.bertholdDlr,
    facts: [
      fact("当前任职", "TUM CIT 的 Learning AI for Dextrous Robots 教授，并领导 TUM AIDX 团队。", sources.bertholdTum),
      fact("教育与学术训练", "2019 年在 University of Bremen 完成博士论文，导师为 Bernd Krieg-Brückner，Gerd Hirzinger 任评审。", sources.bertholdThesis),
      fact("研究主线", "研究机器人学习、深度强化学习、触觉感知、灵巧手内操作和高动态人形机器人控制。", sources.bertholdThesis),
      fact("研究机构连接", "负责 DLR Agile Justin 的进一步研发，并领导 Autonomous Learning Robots Lab。", sources.bertholdDlr),
    ],
    sources: [sources.bertholdTum, sources.bertholdTeam, sources.bertholdThesis, sources.bertholdDlr],
  }),
  person({
    id: "pascal-frossard-epfl-p0-2026",
    name: "Pascal Frossard",
    role: "Full Professor · LTS4 Founder and Director",
    institution: "EPFL",
    region: "Europe",
    area: "Graph Machine Learning · Computer Vision · Signal Processing",
    tags: ["Graph ML", "Computer Vision", "Signal Processing", "AI for Science"],
    summary: "EPFL LTS4 创办人与主任，同时担任 EPFL AI Center 和 Swiss Data Science Center 学术联合主任，研究图机器学习、视觉和科学智能。",
    stage: "senior",
    x: 350,
    y: 170,
    portraitFile: "pascal-frossard.jpg",
    portraitSource: sources.pascalProfile,
    facts: [
      fact("当前任职", "EPFL 电气工程全职教授、LTS4 创办人与主任，并在计算机与通信学院兼任。", sources.pascalBio),
      fact("教育与学术训练", "1997 年和 2000 年分别获 EPFL 电气工程硕士与博士学位；博士研究聚焦容错、多分辨率视频通信。", sources.pascalBio),
      fact("研究主线", "机器学习、数据科学、图信号处理、网络表示学习、图像分析、计算机视觉及 AI for health/science。", sources.pascalBio),
      fact("产业与学术领导", "加入 EPFL 前任职 IBM T. J. Watson Research Center；现任 EPFL AI Center 与 Swiss Data Science Center 学术联合主任。", sources.pascalBio),
    ],
    sources: [sources.pascalProfile, sources.pascalBio, sources.pascalTeam],
  }),
  person({
    id: "mark-pauly-epfl-p0-2026",
    name: "Mark Pauly",
    role: "Full Professor · Geometric Computing Laboratory Director",
    institution: "EPFL",
    region: "Europe",
    area: "Geometry Processing · Computer Graphics · Digital Fabrication",
    tags: ["Geometry Processing", "Computer Graphics", "Digital Fabrication", "3D Modeling"],
    summary: "EPFL Geometric Computing Laboratory 负责人，以几何处理、计算设计和数字制造连接视觉计算、建筑与产业研发，并形成活跃的博士校友网络。",
    stage: "senior",
    x: 530,
    y: 170,
    portraitFile: "mark-pauly.jpg",
    portraitSource: sources.markProfile,
    facts: [
      fact("当前任职", "EPFL 计算机与通信科学学院全职教授，领导 Geometric Computing Laboratory。", sources.markProfile),
      fact("教育与学术训练", "1999 年获 TU Kaiserslautern 计算机科学硕士，2003 年获 ETH Zurich 博士，随后在 Stanford 从事博士后研究。", sources.markProfile),
      fact("研究主线", "几何处理、计算机图形学、形状建模与分析、建筑几何、优化和数字制造。", sources.markProfile),
      fact("人才网络", "EPFL 官方团队页公开现任博士生、博士校友以及校友在 Meta、Adobe、Google 和高校的去向。", sources.markTeam),
    ],
    sources: [sources.markProfile, sources.markTeam, sources.markThesis],
  }),
  person({
    id: "markus-gross-eth-p0-2026",
    name: "Markus Gross",
    role: "Full Professor · CGL Founder · Chief Scientist, Walt Disney Studios",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Visual Computing · Computer Graphics · AI for Media",
    tags: ["Visual Computing", "Computer Graphics", "Digital Humans", "AI for Media"],
    summary: "ETH Computer Graphics Laboratory 创办人与视觉计算领军学者，同时任 Walt Disney Studios 首席科学家，将图形学、数字人和 AI 技术持续转化到影视产业。",
    stage: "senior",
    x: 710,
    y: 170,
    portraitFile: "markus-gross.jpg",
    portraitSource: sources.markusPortrait,
    facts: [
      fact("当前任职", "ETH Zurich 计算机科学全职教授、Computer Graphics Laboratory 创办人与负责人，同时任 Walt Disney Studios 首席科学家。", sources.markusBio),
      fact("教育与学术训练", "1986 年和 1989 年分别在 Saarland University 完成电气与计算机工程硕士及计算机图形与图像分析博士。", sources.markusExperience),
      fact("研究主线", "视觉计算、物理建模、计算机动画、沉浸式显示、视频技术、数字人与 AI 驱动媒体技术。", sources.markusBio),
      fact("学生与产业影响", "已培养逾 75 位博士；其实验室技术连接 Disney 影视制作，并孵化或共同创办 Novodex、LiberoVision、Animatico 等公司。", sources.markusBio),
    ],
    sources: [sources.markusBio, sources.markusExperience, sources.markusStudents, sources.markusPortrait],
  }),
  person({
    id: "sharon-goldwater-edinburgh-p0-2026",
    name: "Sharon Goldwater",
    role: "Personal Chair of Computational Language Learning",
    institution: "Edinburgh",
    region: "Europe",
    area: "Computational Language Learning · Bayesian NLP · Language Acquisition",
    tags: ["NLP", "Bayesian Models", "Language Acquisition", "Unsupervised Learning"],
    summary: "Edinburgh 计算语言学习讲席教授，以贝叶斯模型连接无监督 NLP、语音和儿童语言习得；其学生去向横跨高校及 Google、Amazon、Bloomberg 等产业团队。",
    stage: "senior",
    x: 890,
    y: 170,
    portraitFile: "sharon-goldwater.jpg",
    portraitSource: sources.sharonProfile,
    facts: [
      fact("当前任职", "University of Edinburgh School of Informatics 计算语言学习讲席教授。", sources.sharonProfile),
      fact("教育与学术训练", "2007 年获 Brown University 语言学博士，导师为 Mark Johnson；之后在 Stanford University 从事两年博士后研究。", sources.sharonProfile),
      fact("研究主线", "无监督语言结构学习、计算语言习得、贝叶斯 NLP、音系与词切分。", sources.sharonProfile),
      fact("人才网络", "个人主页公开当前和历届学生、共同导师，以及校友在 Google、Amazon、Bloomberg、MBZUAI 和高校的去向。", sources.sharonGroup),
    ],
    sources: [sources.sharonProfile, sources.sharonGroup],
  }),
  person({
    id: "mateja-jamnik-cambridge-p0-2026",
    name: "Mateja Jamnik",
    role: "Professor of Artificial Intelligence",
    institution: "Cambridge",
    region: "Europe",
    area: "Explainable AI · Neuro-Symbolic Reasoning · AI for Mathematics",
    tags: ["Explainable AI", "Neuro-Symbolic AI", "AI for Mathematics", "Human-Centred AI"],
    summary: "Cambridge 人工智能教授，将自动推理、神经符号学习与可解释 AI 用于数学、医学和教育；团队同时研究 LLM 推理、语言智能体与多模态学习。",
    stage: "senior",
    x: 1070,
    y: 170,
    portraitFile: "mateja-jamnik.png",
    portraitSource: sources.matejaProfile,
    facts: [
      fact("当前任职", "University of Cambridge Department of Computer Science and Technology 人工智能全职教授。", sources.matejaProfile),
      fact("教育与学术训练", "先在加拿大完成数学本科，后在 Cambridge 完成计算机转换课程，并在 University of Edinburgh 获人工智能博士学位。", sources.matejaEducation),
      fact("研究主线", "可解释 AI、人类式计算、自动与图式推理、神经符号学习、知识表示及 AI for mathematics。", sources.matejaProfile),
      fact("学生与团队", "个人团队页公开 11 位当前博士生，主题覆盖 LLM 推理、语言智能体、可解释学习、多模态生物医学与 AI for mathematics。", sources.matejaGroup),
    ],
    sources: [sources.matejaProfile, sources.matejaEducation, sources.matejaGroup],
  }),
];

export const candidatePriorityP0EuropeBatch3Relationships2026: Relationship[] = [
  {
    id: "p0-eu3-gross-pauly-doctoral",
    from: "markus-gross-eth-p0-2026",
    to: "mark-pauly-epfl-p0-2026",
    type: "lineage",
    subtype: "other",
    label: "博士论文主考 / CGL 培养",
    evidence: "ETH Research Collection 的 Mark Pauly 博士论文元数据列 Markus Gross 为 examiner，论文组织单元为 Gross / Markus Gross；CGL 官方博士校友档案亦列出 Pauly 的 2003 年博士论文。",
    source: sources.markThesis,
    verified: true,
  },
];

export const candidatePriorityP0EuropeBatch3Placements2026: StudentPlacement[] = [
  {
    id: "p0-eu3-mark-mina-meta",
    student: "Mina Konakovic-Lukovic",
    teacherId: "mark-pauly-epfl-p0-2026",
    company: "Meta Reality Labs",
    role: "Senior Director, Research & Engineering",
    kind: "reported",
    highLevel: true,
    degree: "PhD",
    sector: "industry",
    note: "EPFL GCM 官方团队页将其列为 Mark Pauly 的博士校友并公开该现职。",
    source: sources.markTeam,
    verifiedAt: checkedAt,
  },
  {
    id: "p0-eu3-sharon-elizabeth-google",
    student: "Elizabeth Nielsen",
    teacherId: "sharon-goldwater-edinburgh-p0-2026",
    company: "Google Montréal",
    role: "Researcher",
    kind: "reported",
    degree: "Unknown",
    sector: "industry",
    note: "Sharon Goldwater 个人学生页公开列出的校友去向。",
    source: sources.sharonGroup,
    verifiedAt: checkedAt,
  },
];

export const candidatePriorityP0EuropeBatch3GroupMembers2026: GroupMember[] = [
  {
    id: "p0-eu3-berthold-ulf-kasolowsky",
    teacherId: "berthold-baeuml-tum-p0-2026",
    name: "Ulf Kasolowsky",
    role: "Scientific Staff / PhD researcher",
    focus: "Learning AI for dextrous robots",
    source: sources.bertholdTeam,
  },
  {
    id: "p0-eu3-pascal-amel-abdelraheem",
    teacherId: "pascal-frossard-epfl-p0-2026",
    name: "Amel Abdelraheem",
    role: "Doctoral Assistant",
    focus: "Graph machine learning and signal processing",
    source: sources.pascalTeam,
  },
  {
    id: "p0-eu3-mark-junyu-liu",
    teacherId: "mark-pauly-epfl-p0-2026",
    name: "Junyu Liu",
    role: "PhD Student",
    focus: "Geometric computing and digital fabrication",
    source: sources.markProfile,
  },
  {
    id: "p0-eu3-markus-rajesh-sharma",
    teacherId: "markus-gross-eth-p0-2026",
    name: "Rajesh Sharma",
    role: "PhD Student",
    focus: "Computer graphics and visual computing",
    source: sources.markusStudents,
  },
  {
    id: "p0-eu3-sharon-oli-liu",
    teacherId: "sharon-goldwater-edinburgh-p0-2026",
    name: "Oli Liu",
    role: "Current group member",
    focus: "Computational language learning",
    source: sources.sharonGroup,
  },
  {
    id: "p0-eu3-mateja-haoyan-luo",
    teacherId: "mateja-jamnik-cambridge-p0-2026",
    name: "Haoyan Luo",
    role: "PhD Student",
    focus: "Explainability of large language models",
    source: sources.matejaGroup,
  },
];

export const candidatePriorityP0EuropeBatch3RosterPromotions2026 = [
  { unitUrl: "https://www.cit.tum.de/en/cit/school/people/professors/", rosterName: "Berthold Bäuml", atlasPersonId: "berthold-baeuml-tum-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Pascal Frossard", atlasPersonId: "pascal-frossard-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Mark Pauly", atlasPersonId: "mark-pauly-epfl-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Markus Gross", atlasPersonId: "markus-gross-eth-p0-2026" },
  { unitUrl: "https://informatics.ed.ac.uk/people/academic-staff", rosterName: "Sharon Goldwater", atlasPersonId: "sharon-goldwater-edinburgh-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Mateja Jamnik", atlasPersonId: "mateja-jamnik-cambridge-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch3People2026;
export const relationships = candidatePriorityP0EuropeBatch3Relationships2026;
export const placements = candidatePriorityP0EuropeBatch3Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch3GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch3RosterPromotions2026;
