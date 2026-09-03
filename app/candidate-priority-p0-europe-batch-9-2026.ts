import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  epflRoster: source("EPFL IC · Faculty members", "https://www.epfl.ch/schools/ic/about/faculty-members/", "official", "EPFL IC 现任教授名录与独立 PI 身份"),
  pitProfile: source("EPFL · Clément Pit-Claudel", "https://people.epfl.ch/clement.pit-claudel?lang=en", "official", "EPFL Tenure Track Assistant Professor、SYSTEMF 实验室、教学与博士生名单"),
  pitHomepage: source("Clément Pit-Claudel · academic homepage", "https://pit-claudel.fr/clement/", "profile", "École Polytechnique 与 MIT 教育训练、Adam Chlipala 博士指导、AWS 经历和研究方向"),
  holsteinProfile: source("EPFL · Ken Holstein", "https://people.epfl.ch/ken.holstein?lang=en", "official", "EPFL Tenure Track Assistant Professor、当前博士生、博士校友及公开职业去向"),
  holsteinLab: source("CoALA Lab · Ken Holstein", "https://www.thecoalalab.com/kenholstein", "profile", "CoALA Lab 负责人、CMU 经历、人本 AI 与负责任 AI 研究方向"),
  holsteinEducation: source("Carnegie Mellon University · Ken Holstein", "https://www.cmu.edu/news/experts/ken-holstein", "official", "Pittsburgh 心理学学士、CMU HCI 硕士与博士教育训练"),
  svenssonProfile: source("EPFL · Ola Svensson", "https://people.epfl.ch/ola.svensson?lang=en", "official", "EPFL Full Professor 与 Theory of Computation Laboratory 2 现职"),
  svenssonHomepage: source("Ola Svensson · EPFL Theory homepage", "https://theory.epfl.ch/osven/", "profile", "IDSIA/USI 博士、Monaldo Mastrolilli 指导、KTH/EPFL 训练、研究方向及当前博士生名单"),
  ienneProfile: source("EPFL · Paolo Ienne", "https://people.epfl.ch/paolo.ienne?lang=en", "official", "EPFL Full Professor、LAP 负责人、Siemens/Infineon 经历、研究方向及当前与历届博士生名单"),
  ienneEducation: source("EPFL LAP · Paolo Ienne author biography", "https://www.epfl.ch/labs/lap/wp-content/uploads/2021/10/JosipovicMar21_SynthesizingGeneralPurposeCodeIntoDynamicallyScheduledCircuits_IEEECSM.pdf", "official", "Politecnico di Milano Laurea 与 EPFL 计算机科学博士教育训练"),
  cambridgeRoster: source("Cambridge CST · Faculty directory", "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", "official", "Cambridge CST 现任 faculty 名录与独立 PI 身份"),
  oztireliProfile: source("Cambridge CST · Cengiz Oztireli", "https://www.cst.cam.ac.uk/people/aco41", "official", "Cambridge Professor、Graphics and Interaction 研究与现任 faculty 身份"),
  oztireliEducation: source("ETH Zurich · Cengiz Oztireli dissertation", "https://cgl.ethz.ch/Downloads/Publications/Dissertations/Ozt13b.pdf", "official", "Koç University 双学士、ETH Zurich 计算机科学硕士与博士训练"),
  cambridgeSupervisors: source("Cambridge CST · PhD students by supervisor", "https://www.cl.cam.ac.uk/lists/phd/supervisor.html", "official", "Cambridge 系级数据库按导师逐名列出当前与已毕业博士生、课题和状态"),
  mantiukProfile: source("Rafal Mantiuk · Cambridge academic homepage", "https://www.cl.cam.ac.uk/~rkm38/", "profile", "Cambridge Professor、MPI 博士与 UBC/MPI 博后训练、图形学与视觉感知研究方向"),
  mantiukTeam: source("Rafal Mantiuk Lab · Team", "https://www.cl.cam.ac.uk/~rkm38/team.html", "official", "当前与历届博士生、博士后及研究团队成员名单"),
  holdenProfile: source("Cambridge CST · Sean Holden", "https://www.cst.cam.ac.uk/people/sbh11", "official", "Cambridge faculty 身份与机器学习、AI 研究现职"),
  holdenEducation: source("Sean Holden · About", "https://www.cl.cam.ac.uk/~sbh11/about.html", "profile", "UEA 本科、Cambridge 工程博士与 Cambridge 机器人研究组博士后训练"),
  holdenResearch: source("Sean Holden · Research and students", "https://www.cl.cam.ac.uk/~sbh11/research.html", "profile", "机器学习研究主线、当前与历届博士生名单及其公开职业去向"),
  sunProfile: source("Cambridge CST · Weiwei Sun", "https://www.cst.cam.ac.uk/people/ws390", "official", "Cambridge University Senior Lecturer、NLP 研究与现任 faculty 身份"),
  sunHomepage: source("Weiwei Sun · Cambridge academic homepage", "https://www.cl.cam.ac.uk/~ws390/", "profile", "PKU 语言学与计算机教育、Saarland 博士、Hans Uszkoreit 指导及研究方向"),
  nlipPeople: source("Cambridge NLIP · People", "https://www.cl.cam.ac.uk/research/nl/people/", "official", "NLIP faculty 与博士生名录，明确 Mila Marcheva 的 supervisor 为 Weiwei Sun"),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, sourceValue: Source) => ({ label, value, source: sourceValue });

type PersonSeed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & {
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
    src: `portraits/candidate-p0-europe-batch-9-2026/${seed.portraitFile}`,
    alt: `${seed.name} 头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0EuropeBatch9People2026: Person[] = [
  person({
    id: "clement-pit-claudel-epfl-p0-2026", name: "Clément Pit-Claudel", role: "Tenure Track Assistant Professor · SYSTEMF Lab Head", institution: "EPFL", region: "Europe",
    area: "Programming Languages · Compilers · Formal Verification", tags: ["Programming Languages", "Compilers", "Formal Verification", "Proof Assistants"],
    summary: "EPFL SYSTEMF 实验室负责人，围绕可扩展编译、硬件描述语言与交互式证明工具构建面向真实系统的形式验证技术。", stage: "emerging", x: 150, y: 220,
    portraitFile: "clement-pit-claudel.jpg", portraitSource: sources.pitProfile,
    facts: [
      fact("当前任职", "EPFL Tenure Track Assistant Professor，并领导 SYSTEMF 实验室。", sources.pitProfile),
      fact("教育与学术训练", "本科就读 École Polytechnique，后在 MIT 由 Adam Chlipala 指导完成博士；硕士与博士论文均围绕 proof-producing compilers。", sources.pitHomepage),
      fact("研究主线", "研究编程语言、编译器和形式验证，当前计划涵盖可扩展编译、硬件语言验证与证明助手工具。", sources.pitHomepage),
      fact("产业经历", "加入 EPFL 前曾任 Amazon AWS Senior Applied Scientist。", sources.pitHomepage),
    ], sources: [sources.epflRoster, sources.pitProfile, sources.pitHomepage],
  }),
  person({
    id: "ken-holstein-epfl-p0-2026", name: "Ken Holstein", role: "Tenure Track Assistant Professor · CoALA Lab Director", institution: "EPFL", region: "Europe",
    area: "Human-Centered AI · Responsible AI · HCI", tags: ["Human-Centered AI", "Responsible AI", "HCI", "AI Governance"],
    summary: "EPFL CoALA Lab 负责人，研究如何让 AI 系统在真实组织和公共场景中更可用、可问责，并公开维护博士生与校友职业流向。", stage: "emerging", x: 360, y: 220,
    portraitFile: "ken-holstein.jpg", portraitSource: sources.holsteinProfile,
    facts: [
      fact("当前任职", "EPFL Tenure Track Assistant Professor，并领导 CoALA Lab。", sources.holsteinProfile),
      fact("教育与学术训练", "在 University of Pittsburgh 获心理学学士，后在 Carnegie Mellon University 获 Human-Computer Interaction 硕士与博士。", sources.holsteinEducation),
      fact("研究主线", "研究 human-centered AI、responsible AI，以及人与组织如何有效监督和使用机器学习系统。", sources.holsteinLab),
      fact("人才流向", "EPFL 官方页逐名记录博士校友流向 Microsoft Research、Georgia Tech、Duolingo、NIST CAISI 与 Google DeepMind。", sources.holsteinProfile),
    ], sources: [sources.epflRoster, sources.holsteinProfile, sources.holsteinLab, sources.holsteinEducation],
  }),
  person({
    id: "ola-svensson-epfl-p0-2026", name: "Ola Svensson", role: "Full Professor · Theory Group", institution: "EPFL", region: "Europe",
    area: "Approximation Algorithms · Combinatorial Optimization · Learning-Augmented Algorithms", tags: ["Algorithms", "Combinatorial Optimization", "Learning-Augmented Algorithms", "Complexity"],
    summary: "EPFL 理论计算机科学教授，从近似算法与组合优化延伸到 learning-augmented 和 data-driven optimization。", stage: "senior", x: 570, y: 220,
    portraitFile: "ola-svensson.jpg", portraitSource: sources.svenssonProfile,
    facts: [
      fact("当前任职", "自 2026 年起任 EPFL Full Professor，此前先后任 Tenure-Track Assistant Professor 与 Associate Professor。", sources.svenssonHomepage),
      fact("教育与学术训练", "2006–2009 年在 IDSIA / USI 由 Monaldo Mastrolilli 指导攻读博士，随后在 KTH 与 EPFL 从事博士后研究。", sources.svenssonHomepage),
      fact("研究主线", "研究近似算法、组合优化、复杂性与调度，并扩展到在线、流式、learning-augmented 与 data-driven optimization。", sources.svenssonHomepage),
      fact("学术与产业连接", "曾任 Google Research Visiting Faculty Researcher，并两度访问 Microsoft Research Redmond。", sources.svenssonHomepage),
    ], sources: [sources.epflRoster, sources.svenssonProfile, sources.svenssonHomepage],
  }),
  person({
    id: "paolo-ienne-epfl-p0-2026", name: "Paolo Ienne", role: "Full Professor · Processor Architecture Laboratory Head", institution: "EPFL", region: "Europe",
    area: "Computer Architecture · FPGAs · Electronic Design Automation", tags: ["Computer Architecture", "FPGAs", "EDA", "High-Level Synthesis"],
    summary: "EPFL Processor Architecture Laboratory 负责人，长期研究处理器体系结构、FPGA、高层综合与电子设计自动化，并维护清晰的博士培养名单。", stage: "senior", x: 780, y: 220,
    portraitFile: "paolo-ienne.jpg", portraitSource: sources.ienneProfile,
    facts: [
      fact("当前任职", "自 2000 年起任 EPFL Professor，并领导 Processor Architecture Laboratory。", sources.ienneProfile),
      fact("教育与学术训练", "1991 年获 Politecnico di Milano 电气工程 Laurea，1996 年获 EPFL 计算机科学博士。", sources.ienneEducation),
      fact("研究主线", "研究处理器体系结构、FPGA 与可重构计算、电子设计自动化和计算机算术。", sources.ienneProfile),
      fact("产业经历", "加入 EPFL 前在 Siemens 半导体集团工作，并领导 Design Libraries division 的 Embedded Memories unit；该业务后来成为 Infineon。", sources.ienneProfile),
    ], sources: [sources.epflRoster, sources.ienneProfile, sources.ienneEducation],
  }),
  person({
    id: "cengiz-oztireli-cambridge-p0-2026", name: "Cengiz Oztireli", role: "Professor of Computer Graphics and Machine Learning", institution: "Cambridge", region: "Europe",
    area: "Computer Graphics · Inverse Graphics · Machine Learning", tags: ["Computer Graphics", "Inverse Graphics", "Machine Learning", "3D Vision"],
    summary: "Cambridge 图形学与机器学习 PI，研究图像和几何的生成、采样与重建，并持续指导 inverse graphics、3D 和可微渲染方向博士生。", stage: "senior", x: 210, y: 440,
    portraitFile: "cengiz-oztireli.jpg", portraitSource: sources.oztireliProfile,
    facts: [
      fact("当前任职", "Cambridge Computer Science and Technology Professor，并属于 Graphics and Interaction 研究组。", sources.oztireliProfile),
      fact("教育与学术训练", "在 Koç University 完成 Computer Engineering 与 Electrical and Electronics Engineering 双学士，后在 ETH Zurich 完成计算机科学硕士与博士。", sources.oztireliEducation),
      fact("研究主线", "研究计算机图形学、机器学习、计算成像、3D 几何与 inverse graphics。", sources.oztireliProfile),
      fact("博士培养", "Cambridge 系级导师数据库列出其多位当前博士生及各自课题。", sources.cambridgeSupervisors),
    ], sources: [sources.cambridgeRoster, sources.oztireliProfile, sources.oztireliEducation, sources.cambridgeSupervisors],
  }),
  person({
    id: "rafal-mantiuk-cambridge-p0-2026", name: "Rafal Mantiuk", role: "Professor of Graphics and Displays", institution: "Cambridge", region: "Europe",
    area: "Visual Perception · HDR · Computational Displays", tags: ["Computer Graphics", "Visual Perception", "HDR", "Computational Displays"],
    summary: "Cambridge Graphics and Displays 教授，将视觉感知模型用于 HDR、计算摄影、显示系统和学习式图像合成。", stage: "senior", x: 420, y: 440,
    portraitFile: "rafal-mantiuk.jpg", portraitSource: sources.mantiukProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Graphics and Displays，并领导视觉感知、成像与显示相关研究。", sources.mantiukProfile),
      fact("教育与学术训练", "2003 年获 Technical University of Szczecin 硕士，2006 年在 Max Planck Institute for Computer Science 获博士，随后在 MPI 与 UBC 接受博士后训练。", sources.mantiukProfile),
      fact("研究主线", "研究 applied visual perception、HDR imaging、computational photography/displays，以及面向视觉感知与图像合成的机器学习。", sources.mantiukProfile),
      fact("团队建设", "实验室官方团队页逐名列出当前博士生、博士后和历届成员。", sources.mantiukTeam),
    ], sources: [sources.cambridgeRoster, sources.mantiukProfile, sources.mantiukTeam],
  }),
  person({
    id: "sean-holden-cambridge-p0-2026", name: "Sean Holden", role: "Professor of Machine Learning", institution: "Cambridge", region: "Europe",
    area: "Machine Learning · Automated Reasoning · Bayesian Inference", tags: ["Machine Learning", "Automated Reasoning", "Bayesian Inference", "AI"],
    summary: "Cambridge 机器学习 PI，研究统计学习与自动定理证明，并公开记录博士生从学术研究到 DeepMind、G-Research 和创业公司的去向。", stage: "senior", x: 630, y: 440,
    portraitFile: "sean-holden.jpg", portraitSource: sources.holdenProfile,
    facts: [
      fact("当前任职", "Cambridge Computer Science and Technology 机器学习与 AI 教授。", sources.holdenProfile),
      fact("教育与学术训练", "1989 年获 UEA Electronic Systems Engineering BSc，1994 年获 Cambridge Engineering PhD，后在 King's College 与 Cambridge Speech, Vision and Robotics Group 从事博士后研究。", sources.holdenEducation),
      fact("研究主线", "研究机器学习理论与应用、Bayesian inference，以及将机器学习用于自动定理证明。", sources.holdenResearch),
      fact("人才流向", "个人研究页逐名记录历届博士生及其进入 DeepMind、G-Research、Microsoft Research、DroneDeploy 与创业公司的职业路径。", sources.holdenResearch),
    ], sources: [sources.cambridgeRoster, sources.holdenProfile, sources.holdenEducation, sources.holdenResearch],
  }),
  person({
    id: "weiwei-sun-cambridge-p0-2026", name: "Weiwei Sun", role: "University Senior Lecturer · Computational Linguistics", institution: "Cambridge", region: "Europe",
    area: "Natural Language Processing · Syntax · Semantic Parsing", tags: ["NLP", "Computational Linguistics", "Parsing", "Syntax"],
    summary: "Cambridge 计算语言学 PI，横跨句法、语义分析与跨语言 NLP，并连接北京大学、Saarland 与 Cambridge NLIP 的培养网络。", stage: "senior", x: 840, y: 440,
    portraitFile: "weiwei-sun.jpg", portraitSource: sources.sunProfile,
    facts: [
      fact("当前任职", "Cambridge University Senior Lecturer / Associate Professor，并属于 Natural Language and Information Processing Group。", sources.sunHomepage),
      fact("教育与学术训练", "在 Peking University 完成 Linguistics BA、Computer Science BS 与 MS，后在 Saarland University 由 Hans Uszkoreit 指导获博士。", sources.sunHomepage),
      fact("研究主线", "研究 syntactic parsing、semantic parsing、computational linguistics 与跨语言语言分析。", sources.sunHomepage),
      fact("博士培养", "Cambridge NLIP 官方成员页明确 Mila Marcheva 的 supervisor 为 Weiwei Sun。", sources.nlipPeople),
    ], sources: [sources.cambridgeRoster, sources.sunProfile, sources.sunHomepage, sources.nlipPeople],
  }),
];

export const candidatePriorityP0EuropeBatch9Relationships2026: Relationship[] = [];

export const candidatePriorityP0EuropeBatch9Placements2026: StudentPlacement[] = [
  { id: "p0-eu9-holstein-charvi-rastogi", student: "Charvi Rastogi", teacherId: "ken-holstein-epfl-p0-2026", company: "Google DeepMind", role: "Research Scientist", kind: "reported", sector: "industry", degree: "PhD", graduationYear: 2023, source: sources.holsteinProfile },
  { id: "p0-eu9-holden-ulrich-paquet", student: "Ulrich Paquet", teacherId: "sean-holden-cambridge-p0-2026", company: "Google DeepMind", role: "Research Scientist", kind: "reported", sector: "industry", degree: "PhD", source: sources.holdenResearch },
];

export const candidatePriorityP0EuropeBatch9GroupMembers2026: GroupMember[] = [
  { id: "p0-eu9-pit-can-cebeci", teacherId: "clement-pit-claudel-epfl-p0-2026", name: "Can Cebeci", role: "Current PhD student", focus: "Systems and formal verification", source: sources.pitProfile },
  { id: "p0-eu9-svensson-miltiadis-stouras", teacherId: "ola-svensson-epfl-p0-2026", name: "Miltiadis Stouras", role: "Current PhD student", focus: "Algorithms and optimization", source: sources.svenssonHomepage },
  { id: "p0-eu9-ienne-ayatallah-elakhras", teacherId: "paolo-ienne-epfl-p0-2026", name: "Ayatallah Elakhras", role: "Current PhD student", focus: "Processor architecture and high-level synthesis", source: sources.ienneProfile },
  { id: "p0-eu9-oztireli-kyle-fogarty", teacherId: "cengiz-oztireli-cambridge-p0-2026", name: "Kyle Fogarty", role: "Current PhD student", focus: "Graphics and machine learning", source: sources.cambridgeSupervisors },
  { id: "p0-eu9-mantiuk-yaru-liu", teacherId: "rafal-mantiuk-cambridge-p0-2026", name: "Yaru Liu", role: "Current PhD student", focus: "Visual perception and imaging", source: sources.mantiukTeam },
  { id: "p0-eu9-sun-mila-marcheva", teacherId: "weiwei-sun-cambridge-p0-2026", name: "Mila Marcheva", role: "PhD student", focus: "Computational bilingual acquisition", source: sources.nlipPeople },
];

export const candidatePriorityP0EuropeBatch9RosterPromotions2026 = [
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Clément Pit-Claudel", atlasPersonId: "clement-pit-claudel-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Ken Holstein", atlasPersonId: "ken-holstein-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Ola Svensson", atlasPersonId: "ola-svensson-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Paolo Ienne", atlasPersonId: "paolo-ienne-epfl-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Cengiz Oztireli", atlasPersonId: "cengiz-oztireli-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Rafal Mantiuk", atlasPersonId: "rafal-mantiuk-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Sean Holden", atlasPersonId: "sean-holden-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Weiwei Sun", atlasPersonId: "weiwei-sun-cambridge-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch9People2026;
export const relationships = candidatePriorityP0EuropeBatch9Relationships2026;
export const placements = candidatePriorityP0EuropeBatch9Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch9GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch9RosterPromotions2026;
