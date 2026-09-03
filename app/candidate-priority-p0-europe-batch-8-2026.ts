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
    "EPFL IC 现任教授名录与独立 PI 身份",
  ),
  bugnionProfile: source(
    "EPFL · Edouard Bugnion",
    "https://people.epfl.ch/edouard.bugnion?lang=en",
    "official",
    "Full Professor 与创新副校长现职、Stanford/ETH 教育、VMware/Nuova/Cisco 经历、研究方向和博士生名单",
  ),
  cambridgeRoster: source(
    "Cambridge CST · Faculty directory",
    "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en",
    "official",
    "Cambridge CST 现任 faculty 名录与独立 PI 身份",
  ),
  laneProfile: source(
    "St John's College Cambridge · Nic Lane",
    "https://www.joh.cam.ac.uk/research/academics/fellows/professor-nic-lane",
    "official",
    "Machine Learning Systems 教授现职、CaMLSys 负责人、学位资历和教学方向",
  ),
  laneEducation: source(
    "Cambridge CST · New faculty in Computer Science",
    "https://www.cst.cam.ac.uk/new-faculty-members",
    "official",
    "Dartmouth 2011 博士、此前 Oxford 任职以及嵌入式高效机器学习研究方向",
  ),
  laneGroup: source(
    "Cambridge Machine Learning Systems Lab · People",
    "https://mlsys.cst.cam.ac.uk/people/",
    "official",
    "Nic Lane 为唯一列出的 faculty，并逐名列出研究人员、博士生与已毕业博士生",
  ),
  stajanoProfile: source(
    "Cambridge CST · Frank Stajano",
    "https://www.cst.cam.ac.uk/people/fms27",
    "official",
    "Security and Privacy 教授现职与 Cambridge faculty 身份",
  ),
  stajanoHomepage: source(
    "Frank Stajano · Cambridge academic homepage",
    "https://www.cl.cam.ac.uk/~fms27/",
    "profile",
    "Ross Anderson 博士指导、研究主线、产业经历、Cambridge Cyber 创业及历届研究生名单",
  ),
  beresfordProfile: source(
    "Cambridge CST · Alastair Beresford",
    "https://www.cst.cam.ac.uk/people/arb33",
    "official",
    "Cambridge 计算机安全教授及 faculty 身份与官方头像",
  ),
  beresfordCv: source(
    "Alastair Beresford · Cambridge curriculum vitae",
    "https://www.cl.cam.ac.uk/~arb33/cv/",
    "profile",
    "系主任与教授现职、Cambridge 博士和本科训练、移动安全研究、项目及逐名博士生记录",
  ),
  madhavapeddyProfile: source(
    "Cambridge Human-Inspired AI · Anil Madhavapeddy",
    "https://www.chia.cam.ac.uk/team/anil-madhavapeddy",
    "official",
    "Planetary Computing 教授现职、Cambridge/Imperial 教育训练、4C 领导与环境计算研究方向",
  ),
  madhavapeddyIndustry: source(
    "Cambridge Centre for Carbon Credits · Anil Madhavapeddy",
    "https://4c.cst.cam.ac.uk/staff/professor-anil-madhavapeddy",
    "official",
    "4C Director/PI 身份，以及 NetApp、Citrix、Intel、XenSource、Unikernel Systems、Docker 经历",
  ),
  madhavapeddyStudent: source(
    "Cambridge Zoology · Emilio Luz-Ricca",
    "https://www.zoo.cam.ac.uk/people/emilio-luz-ricca",
    "official",
    "Emilio Luz-Ricca 博士项目由 Anil Madhavapeddy 与 Tom Swinfield 共同指导",
  ),
  shuckburghProfile: source(
    "Cambridge CST · Emily Shuckburgh",
    "https://www.cst.cam.ac.uk/people/efs20",
    "official",
    "Environmental Data Science 教授现职、完整教育与任职时间轴、机器学习研究及当前博士生名单",
  ),
  shuckburghBio: source(
    "University of Cambridge · Changemakers: Emily Shuckburgh",
    "https://www.cam.ac.uk/stories/changemakers-emily-shuckburgh",
    "official",
    "Oxford/Cambridge 数学教育、Cambridge 大气科学博士、ENS/MIT 研究训练及气候 AI 领导经历",
  ),
  sewellProfile: source(
    "Cambridge CST · Peter Sewell",
    "https://www.cst.cam.ac.uk/people/pes20",
    "official",
    "Computer Science 教授现职及程序语言、形式语义、体系结构、安全与系统研究主题",
  ),
  sewellCv: source(
    "Peter Sewell · Cambridge curriculum vitae",
    "https://www.cl.cam.ac.uk/~pes20/cv.pdf",
    "profile",
    "Robin Milner 博士指导、Edinburgh/Oxford/Cambridge 教育、博士生名单、CHERI/Arm/DeepMind 项目与资助",
  ),
  jonesProfile: source(
    "Timothy M. Jones · Cambridge academic homepage",
    "https://www.cl.cam.ac.uk/~tmj32/",
    "profile",
    "Computer Architecture and Compilation 教授、CASCADE Director、研究方向及招生信息",
  ),
  jonesEducation: source(
    "Cambridge CST · CASCADE proposal",
    "https://www.cst.cam.ac.uk/files/pdf/computer-architecture-research-centre-brochure-for-web.pdf",
    "official",
    "Edinburgh 博士、Harvard 访问训练、博士培养规模、产业合作与 CASCADE 领导信息",
  ),
  jonesStudent: source(
    "Cambridge Computer Laboratory · Aida Miralaei",
    "https://www.cl.cam.ac.uk/~am2457/",
    "official",
    "Aida Miralaei 明确自述为 Timothy Jones 指导的 Computer Architecture Group 博士生",
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
    src: `portraits/candidate-p0-europe-batch-8-2026/${seed.portraitFile}`,
    alt: `${seed.name} 头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0EuropeBatch8People2026: Person[] = [
  person({
    id: "edouard-bugnion-epfl-p0-2026",
    name: "Edouard Bugnion",
    role: "Full Professor · Vice President for Innovation and Impact",
    institution: "EPFL",
    region: "Europe",
    area: "Data Center Systems · Virtualization · Systems Security",
    tags: ["Computer Systems", "Virtualization", "Data Centers", "Systems Security"],
    summary: "EPFL 数据中心系统资深 PI，也是 VMware 与 Nuova Systems 联合创始人，把虚拟化、云基础设施和系统安全连接到产业创新网络。",
    stage: "senior",
    x: 150,
    y: 220,
    portraitFile: "edouard-bugnion.jpg",
    portraitSource: sources.bugnionProfile,
    facts: [
      fact("当前任职", "EPFL IC Full Professor、Data Center Systems Laboratory 负责人，并自 2025 年起任 Vice President for Innovation and Impact。", sources.bugnionProfile),
      fact("教育与学术训练", "在 ETH Zurich 完成 Informatik Dipl.-Ing.，后在 Stanford University 获计算机科学博士。", sources.bugnionProfile),
      fact("研究主线", "聚焦数据中心效率、网络与数据平面基础设施，以及基于可信执行环境的系统安全。", sources.bugnionProfile),
      fact("产业与创业", "联合创办 VMware 和 Nuova Systems；曾任 VMware 首任 CTO，后任 Cisco Server, Access and Virtualization Technology Group VP/CTO。", sources.bugnionProfile),
    ],
    sources: [sources.epflRoster, sources.bugnionProfile],
  }),
  person({
    id: "nicholas-lane-cambridge-p0-2026",
    name: "Nicholas Lane",
    role: "Professor of Machine Learning Systems · CaMLSys Lead",
    institution: "Cambridge",
    region: "Europe",
    area: "Efficient ML Systems · Edge AI · Federated Learning",
    tags: ["Machine Learning Systems", "Edge AI", "Federated Learning", "Efficient AI"],
    summary: "Cambridge 机器学习系统 PI，领导 CaMLSys，重点研究嵌入式、端侧和分布式环境中的高效可扩展机器学习。",
    stage: "senior",
    x: 330,
    y: 220,
    portraitFile: "nicholas-lane.jpg",
    portraitSource: sources.laneProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Machine Learning Systems、St John's College Fellow，并领导 Cambridge Machine Learning Systems Lab。", sources.laneProfile),
      fact("教育与学术训练", "2011 年在 Dartmouth College 获博士学位；加入 Cambridge 前任 University of Oxford Associate Professor。", sources.laneEducation),
      fact("研究主线", "研究高效、可扩展的机器学习系统，重点包括嵌入式机器学习、端侧推理与联邦学习。", sources.laneEducation),
      fact("团队建设", "CaMLSys 官方成员页列出研究人员、博士生和已毕业博士生，形成面向 ML systems 的持续培养链。", sources.laneGroup),
    ],
    sources: [sources.cambridgeRoster, sources.laneProfile, sources.laneEducation, sources.laneGroup],
  }),
  person({
    id: "frank-stajano-cambridge-p0-2026",
    name: "Frank Stajano",
    role: "Professor of Security and Privacy",
    institution: "Cambridge",
    region: "Europe",
    area: "Systems Security · Privacy · Ubiquitous Computing",
    tags: ["Security", "Privacy", "Usable Security", "Ubiquitous Computing"],
    summary: "Cambridge 安全与隐私资深 PI，兼具大型企业研发和创业经历，其博士谱系与学生网络连接 Cambridge 安全学派的重要节点。",
    stage: "senior",
    x: 510,
    y: 220,
    portraitFile: "frank-stajano.jpg",
    portraitSource: sources.stajanoProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Security and Privacy，同时属于 Security Group 与 Digital Technology Group。", sources.stajanoHomepage),
      fact("教育与学术训练", "1998–2001 年在 Cambridge 由 Ross Anderson 指导完成安全方向博士。", sources.stajanoHomepage),
      fact("研究主线", "研究系统安全、电子社会隐私、普适计算及安全系统中的人因问题。", sources.stajanoHomepage),
      fact("产业与创业", "曾在 Google、Toshiba、AT&T、Oracle、Olivetti 研发部门工作，并任 Cambridge Cyber 联合创始人兼 CEO。", sources.stajanoHomepage),
    ],
    sources: [sources.cambridgeRoster, sources.stajanoProfile, sources.stajanoHomepage],
  }),
  person({
    id: "alastair-beresford-cambridge-p0-2026",
    name: "Alastair Beresford",
    role: "Head of Department · Professor of Computer Security",
    institution: "Cambridge",
    region: "Europe",
    area: "Mobile Security · Privacy · Networked Systems",
    tags: ["Computer Security", "Privacy", "Mobile Systems", "Cybercrime"],
    summary: "Cambridge 计算机系主任与安全 PI，长期研究大规模联网和移动系统的安全隐私，并持续培养匿名通信与移动生态方向博士生。",
    stage: "senior",
    x: 690,
    y: 220,
    portraitFile: "alastair-beresford.jpg",
    portraitSource: sources.beresfordProfile,
    facts: [
      fact("当前任职", "自 2023 年起任 Cambridge Department of Computer Science and Technology Head，同时任 Professor of Computer Security。", sources.beresfordCv),
      fact("教育与学术训练", "1996–1999 年在 Cambridge 完成计算机科学一等 BA，2000–2004 年在 Cambridge Engineering 获博士。", sources.beresfordCv),
      fact("研究主线", "研究大规模联网系统、移动设备及其与互联网服务交互所产生的安全与隐私问题。", sources.beresfordCv),
      fact("博士培养", "个人 CV 逐名记录 Alexandre Pauwels、Michael Fink、Jenny Blessing 等当前或已毕业博士生及课题。", sources.beresfordCv),
    ],
    sources: [sources.cambridgeRoster, sources.beresfordProfile, sources.beresfordCv, sources.stajanoHomepage],
  }),
  person({
    id: "anil-madhavapeddy-cambridge-p0-2026",
    name: "Anil Madhavapeddy",
    role: "Professor of Planetary Computing · 4C Director",
    institution: "Cambridge",
    region: "Europe",
    area: "Planetary Computing · Systems · AI for Conservation",
    tags: ["Planetary Computing", "Systems", "Conservation AI", "Programming Languages"],
    summary: "Cambridge Planetary Computing 教授，把系统与编程语言研究用于生物多样性、森林监测和碳信用，并连接开源、创业与保护科学。",
    stage: "senior",
    x: 870,
    y: 220,
    portraitFile: "anil-madhavapeddy.jpg",
    portraitSource: sources.madhavapeddyProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Planetary Computing，并任 Cambridge Centre for Carbon Credits Director。", sources.madhavapeddyProfile),
      fact("教育与学术训练", "1999 年获 Imperial College Information Systems Engineering BEng，2003 年获 University of Cambridge 博士。", sources.madhavapeddyProfile),
      fact("研究主线", "研究计算机系统与编程语言在全球保护和生物多样性、长期监测及卫星森林砍伐监测中的应用。", sources.madhavapeddyProfile),
      fact("产业与开源", "履历覆盖 NetApp、Citrix、Intel，以及 XenSource、Unikernel Systems、Docker；长期维护 OpenBSD、OCaml、Xen 与 Docker。", sources.madhavapeddyIndustry),
    ],
    sources: [sources.cambridgeRoster, sources.madhavapeddyProfile, sources.madhavapeddyIndustry, sources.madhavapeddyStudent],
  }),
  person({
    id: "emily-shuckburgh-cambridge-p0-2026",
    name: "Emily Shuckburgh",
    role: "Professor of Environmental Data Science · ICCS Academic Director",
    institution: "Cambridge",
    region: "Europe",
    area: "Climate AI · Environmental Data Science · Scientific ML",
    tags: ["Climate AI", "Environmental Data Science", "Scientific ML", "AI4ER"],
    summary: "Cambridge 环境数据科学教授，以机器学习和计算科学推动气候建模与极端风险研究，并领导 ICCS、AI4ER 等跨学科培养平台。",
    stage: "senior",
    x: 240,
    y: 420,
    portraitFile: "emily-shuckburgh.jpg",
    portraitSource: sources.shuckburghProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Environmental Data Science、ICCS Academic Director，并任英国能源安全与净零部 Chief Scientific Adviser。", sources.shuckburghProfile),
      fact("教育与学术训练", "Oxford 数学 BA、Cambridge Part III 数学训练；1999 年在 Cambridge DAMTP 获大气动力学博士，后在 ENS Paris 与 MIT 研究。", sources.shuckburghProfile),
      fact("研究主线", "研究机器学习在气候科学中的应用，以及大气、海洋和气候动力学。", sources.shuckburghProfile),
      fact("平台与人才", "共同领导 AI4ER 博士培养中心和 Centre for Landscape Regeneration，并在官方页列出当前博士生与已完成学位论文。", sources.shuckburghProfile),
    ],
    sources: [sources.cambridgeRoster, sources.shuckburghProfile, sources.shuckburghBio],
  }),
  person({
    id: "peter-sewell-cambridge-p0-2026",
    name: "Peter Sewell",
    role: "Professor of Computer Science · FRS",
    institution: "Cambridge",
    region: "Europe",
    area: "Programming Languages · Formal Semantics · Secure Architectures",
    tags: ["Programming Languages", "Formal Methods", "CHERI", "Systems Security"],
    summary: "Cambridge 形式语义与系统资深 PI，从编程语言语义延伸到 Arm、RISC-V 与 CHERI 的可验证软硬件基础。",
    stage: "senior",
    x: 510,
    y: 420,
    portraitFile: "peter-sewell.jpg",
    portraitSource: sources.sewellProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Computer Science、Royal Society Fellow，研究横跨程序语言、形式语义、体系结构、安全和系统。", sources.sewellProfile),
      fact("教育与学术训练", "Cambridge BA、Oxford MSc；1990–1995 年在 University of Edinburgh 由 Robin Milner 指导完成博士。", sources.sewellCv),
      fact("研究主线", "围绕 C/C++、Arm、RISC-V、WebAssembly 与 CHERI 建立可执行和机械化的形式语义与验证基础。", sources.sewellCv),
      fact("博士与产业网络", "CV 逐名记录当前和已毕业博士，并列出与 Arm、DeepMind、Intel、IBM 及 CHERI 产业计划的联合项目。", sources.sewellCv),
    ],
    sources: [sources.cambridgeRoster, sources.sewellProfile, sources.sewellCv],
  }),
  person({
    id: "timothy-jones-cambridge-p0-2026",
    name: "Timothy Jones",
    role: "Professor of Computer Architecture and Compilation · CASCADE Director",
    institution: "Cambridge",
    region: "Europe",
    area: "Computer Architecture · Compilers · Efficient AI Hardware",
    tags: ["Computer Architecture", "Compilers", "Energy Efficiency", "AI Hardware"],
    summary: "Cambridge 体系结构与编译教授，领导 CASCADE，围绕并行性、能效和可靠性连接编译器、微架构与产业芯片研发。",
    stage: "senior",
    x: 780,
    y: 420,
    portraitFile: "timothy-jones.jpg",
    portraitSource: sources.jonesProfile,
    facts: [
      fact("当前任职", "Cambridge Professor of Computer Architecture and Compilation、CASCADE Director，并任 School of Technology Deputy Head for Research。", sources.jonesProfile),
      fact("教育与学术训练", "2006 年在 University of Edinburgh 获 Informatics 博士，随后曾赴 Harvard 与 David Brooks 团队开展访问研究。", sources.jonesEducation),
      fact("研究主线", "研究从应用中提取多种并行性，以提升编译器、二进制翻译器和微架构的性能、能效与可靠性。", sources.jonesProfile),
      fact("博士与产业网络", "Cambridge CASCADE 材料记录其已指导 9 位博士、另有 5 位在读，并与 Arm 等产业伙伴开展长期联合培养和研究。", sources.jonesEducation),
    ],
    sources: [sources.cambridgeRoster, sources.jonesProfile, sources.jonesEducation, sources.jonesStudent],
  }),
];

export const candidatePriorityP0EuropeBatch8Relationships2026: Relationship[] = [
  {
    id: "p0-eu8-stajano-beresford-doctoral",
    from: "frank-stajano-cambridge-p0-2026",
    to: "alastair-beresford-cambridge-p0-2026",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Frank Stajano 的 Cambridge 学术主页在“completed under my supervision”名单中明确列出 Alastair Beresford 及其 Location Privacy in Ubiquitous Computing 博士论文。",
    source: sources.stajanoHomepage,
    verified: true,
  },
];

export const candidatePriorityP0EuropeBatch8Placements2026: StudentPlacement[] = [];

export const candidatePriorityP0EuropeBatch8GroupMembers2026: GroupMember[] = [
  { id: "p0-eu8-bugnion-yuchen-qian", teacherId: "edouard-bugnion-epfl-p0-2026", name: "Yuchen Qian", role: "Current PhD student", focus: "Data center systems", source: sources.bugnionProfile },
  { id: "p0-eu8-lane-filip-svoboda", teacherId: "nicholas-lane-cambridge-p0-2026", name: "Filip Svoboda", role: "CaMLSys PhD student", focus: "Machine learning systems", source: sources.laneGroup },
  { id: "p0-eu8-madhavapeddy-emilio-luz-ricca", teacherId: "anil-madhavapeddy-cambridge-p0-2026", name: "Emilio Luz-Ricca", role: "PhD student · co-supervised", focus: "Planetary computing and conservation", source: sources.madhavapeddyStudent },
  { id: "p0-eu8-shuckburgh-pritthijit-nath", teacherId: "emily-shuckburgh-cambridge-p0-2026", name: "Pritthijit Nath", role: "Current PhD student · AI4ER CDT", focus: "AI for environmental risks", source: sources.shuckburghProfile },
  { id: "p0-eu8-sewell-rini-banerjee", teacherId: "peter-sewell-cambridge-p0-2026", name: "Rini Banerjee", role: "Current PhD student", focus: "Programming languages and formal semantics", source: sources.sewellCv },
  { id: "p0-eu8-jones-aida-miralaei", teacherId: "timothy-jones-cambridge-p0-2026", name: "Aida Miralaei", role: "PhD student", focus: "In-memory processing and efficient deep learning", source: sources.jonesStudent },
];

export const candidatePriorityP0EuropeBatch8RosterPromotions2026 = [
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Edouard Bugnion", atlasPersonId: "edouard-bugnion-epfl-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Nicholas Lane", atlasPersonId: "nicholas-lane-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Frank Stajano", atlasPersonId: "frank-stajano-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Alastair Beresford", atlasPersonId: "alastair-beresford-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Anil Madhavapeddy", atlasPersonId: "anil-madhavapeddy-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Emily Shuckburgh", atlasPersonId: "emily-shuckburgh-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Peter Sewell", atlasPersonId: "peter-sewell-cambridge-p0-2026" },
  { unitUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en", rosterName: "Timothy Jones", atlasPersonId: "timothy-jones-cambridge-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch8People2026;
export const relationships = candidatePriorityP0EuropeBatch8Relationships2026;
export const placements = candidatePriorityP0EuropeBatch8Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch8GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch8RosterPromotions2026;
