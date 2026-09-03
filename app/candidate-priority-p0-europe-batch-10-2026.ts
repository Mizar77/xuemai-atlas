import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const sources = {
  ethRoster: source("ETH Zurich D-INFK · Faculty", "https://inf.ethz.ch/people/faculty.html", "official", "ETH Zurich D-INFK 现任教授名录与独立 PI 身份"),
  klimovic: source("Ana Klimović · ETH academic homepage", "https://anakli.inf.ethz.ch/", "profile", "ETH Associate Professor 与 EASL 负责人现职、Stanford 博士谱系、Google Brain 经历、AI systems 研究及团队名单"),
  alonso: source("Gustavo Alonso · ETH academic homepage", "https://people.inf.ethz.ch/alonso/", "profile", "ETH Professor 现职、Madrid/UC Santa Barbara 教育、IBM 经历与系统研究方向"),
  alonsoStudent: source("Ana Klimović · EASL alumni", "https://anakli.inf.ethz.ch/", "profile", "EASL alumni 区明确 Dan Graur 的 primary advisor 为 Gustavo Alonso 并记录其进入 Google"),
  basin: source("David Basin · ETH academic homepage", "https://people.inf.ethz.ch/basin/", "profile", "ETH Full Professor 与 Information Security Group 负责人、Reed/Cornell/Saarbrücken 教育训练、创业与研究方向"),
  basinGenealogy: source("David Basin · Academic genealogy", "https://people.inf.ethz.ch/basin/misc/geneology.html", "profile", "Cornell 1989 博士、Bob Constable 师承以及逐名博士生名单"),
  capkunBio: source("ETH ZISC · Srdjan Capkun biography", "https://zisc.ethz.ch/events/zisc-workshop-2015/", "official", "Split 工程学位、EPFL 通信系统博士、UCLA 博后、DTU 与 ETH 任职、3db Access 创业"),
  capkunGroup: source("ETH System Security Group · People", "https://www.syssec.ethz.ch/people/", "official", "Srdjan Čapkun 为 Group Leader，并逐名列出当前博士生与博士后"),
  shindeProfile: source("ETH D-INFK · Welcome Professor Shweta Shinde", "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2020/10/welcome-professor-shweta-shinde.html", "official", "ETH Tenure Track Assistant Professor 现职、NUS 博士与 UC Berkeley 博后训练、可信系统研究"),
  shindeStudents: source("ETH Secure & Trustworthy Systems · Student projects", "https://sectrs.ethz.ch/education/student-projects.html", "official", "逐名列出由 Shweta Shinde 指导的硕士、学士论文与项目"),
  suProfile: source("Zhendong Su · ETH academic homepage", "https://people.inf.ethz.ch/suz/", "profile", "ETH Full Professor 与 AST Lab 负责人、UT Austin/UC Berkeley 教育、UC Davis 经历及软件与 ML 研究"),
  suTeam: source("Zhendong Su · AST Lab team", "https://people.inf.ethz.ch/suz/team.html", "profile", "逐名列出当前博士后、博士生、访问学生、历届团队与 UC Davis 博士生"),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, sourceValue: Source) => ({ label, value, source: sourceValue });
type Seed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & { portraitFile: string; portraitSource: Source };
const person = (seed: Seed): Person => ({ ...seed, category: "core", primary: true, status: "current independent PI · official profile verified", introducedAt: checkedAt, lastVerifiedAt: checkedAt, portrait: { src: `portraits/candidate-p0-europe-batch-10-2026/${seed.portraitFile}`, alt: `${seed.name} 头像`, source: seed.portraitSource } });

export const candidatePriorityP0EuropeBatch10People2026: Person[] = [
  person({ id: "ana-klimovic-eth-p0-2026", name: "Ana Klimovic", role: "Associate Professor · EASL Lead", institution: "ETH Zurich", region: "Europe", area: "Systems for AI · Cloud Computing · ML Systems", tags: ["ML Systems", "AI Infrastructure", "Cloud Computing", "Distributed Systems"], summary: "ETH EASL 负责人，研究大规模 AI 训练与推理所需的高效云和系统基础设施，并公开维护博士生与校友产业流向。", stage: "senior", x: 150, y: 220, portraitFile: "ana-klimovic.jpg", portraitSource: sources.ethRoster,
    facts: [fact("当前任职", "ETH Zurich Department of Computer Science Associate Professor，并领导 Efficient Architectures and Systems Lab。", sources.klimovic), fact("教育与学术训练", "University of Toronto 工程学士，Stanford Electrical Engineering 硕士与博士；博士由 Christos Kozyrakis 指导。", sources.klimovic), fact("研究主线", "研究面向云计算、数据分析和机器学习的大规模系统，重点提升 AI 训练与推理的资源效率、可靠性和弹性。", sources.klimovic), fact("产业经历", "加入 ETH 前曾任 Google Brain Research Scientist；团队页也记录博士校友进入 Google 与 Apple。", sources.klimovic)], sources: [sources.ethRoster, sources.klimovic] }),
  person({ id: "gustavo-alonso-eth-p0-2026", name: "Gustavo Alonso", role: "Professor · Systems Group", institution: "ETH Zurich", region: "Europe", area: "Data Systems · Cloud Computing · Hardware Acceleration", tags: ["Database Systems", "Cloud Computing", "Distributed Systems", "Hardware Acceleration"], summary: "ETH Systems Group 资深教授，研究数据库、分布式系统与面向数据科学的硬件加速，连接 IBM 研究与 ETH 系统人才网络。", stage: "senior", x: 360, y: 220, portraitFile: "gustavo-alonso.jpg", portraitSource: sources.ethRoster,
    facts: [fact("当前任职", "ETH Zurich Department of Computer Science Professor，属于 Systems Group。", sources.alonso), fact("教育与学术训练", "在 Universidad Politécnica de Madrid 学习电信/电气工程，后以 Fulbright Scholar 身份在 UC Santa Barbara 完成计算机科学硕士与博士。", sources.alonso), fact("研究主线", "研究分布式系统、数据库、云计算，以及用多核、集群和 FPGA 加速数据科学。", sources.alonso), fact("产业经历", "博士毕业后曾在 IBM Almaden Research Center 任研究人员，之后加入 ETH。", sources.alonso)], sources: [sources.ethRoster, sources.alonso, sources.alonsoStudent] }),
  person({ id: "david-basin-eth-p0-2026", name: "David Basin", role: "Full Professor · Information Security Group Head", institution: "ETH Zurich", region: "Europe", area: "Information Security · Formal Methods · Privacy", tags: ["Information Security", "Formal Methods", "Privacy", "Security Verification"], summary: "ETH Information Security Group 负责人，用形式方法构建和验证安全系统，并通过 ZISC 与多家安全创业公司连接产业。", stage: "senior", x: 570, y: 220, portraitFile: "david-basin.jpg", portraitSource: sources.ethRoster,
    facts: [fact("当前任职", "自 2003 年起任 ETH Zurich Computer Science Full Professor，并领导 Information Security Group。", sources.basin), fact("教育与学术训练", "Reed College 数学学士、Cornell University 博士，并在 University of Saarbrücken 完成 Habilitation；后在 Edinburgh 与 MPI Informatics 研究。", sources.basin), fact("研究主线", "研究安全可靠系统的建模、构建与验证方法和工具。", sources.basin), fact("产业与创业", "联合创办 3db Access、Anapaya Systems 和 Thenti，并创立 Zurich Information Security Center。", sources.basin)], sources: [sources.ethRoster, sources.basin, sources.basinGenealogy] }),
  person({ id: "srdjan-capkun-eth-p0-2026", name: "Srdjan Čapkun", role: "Full Professor · System Security Group Head", institution: "ETH Zurich", region: "Europe", area: "System Security · Wireless Security · Secure Positioning", tags: ["System Security", "Wireless Security", "Secure Positioning", "Cyber-Physical Security"], summary: "ETH System Security Group 负责人，研究无线、定位与去中心化系统安全，并联合创办安全近距访问公司 3db Access。", stage: "senior", x: 780, y: 220, portraitFile: "srdjan-capkun.jpg", portraitSource: sources.ethRoster,
    facts: [fact("当前任职", "ETH Zurich Computer Science Full Professor，并领导 System Security Group。", sources.capkunBio), fact("教育与学术训练", "University of Split 电气工程/计算机 Dipl.Ing.，2004 年获 EPFL Communication Systems 博士，随后在 UCLA NESL 从事博士后研究。", sources.capkunBio), fact("研究主线", "研究系统与网络安全，重点包括无线安全、安全定位、去中心化系统和 cyber-physical security。", sources.capkunBio), fact("产业与创业", "联合创办 3db Access，聚焦安全的近距访问控制。", sources.capkunBio)], sources: [sources.ethRoster, sources.capkunBio, sources.capkunGroup] }),
  person({ id: "shweta-shinde-eth-p0-2026", name: "Shweta Shinde", role: "Assistant Professor · Secure & Trustworthy Systems Group", institution: "ETH Zurich", region: "Europe", area: "Trusted Computing · System Security · Privacy", tags: ["Trusted Computing", "System Security", "Privacy", "Formal Methods"], summary: "ETH Secure & Trustworthy Systems Group 负责人，在可信计算、操作系统安全和隐私交叉处开展研究，并公开记录逐项学生论文指导。", stage: "emerging", x: 260, y: 440, portraitFile: "shweta-shinde.jpg", portraitSource: sources.ethRoster,
    facts: [fact("当前任职", "2020 年加入 ETH Zurich，任 Computer Science Tenure Track Assistant Professor。", sources.shindeProfile), fact("教育与学术训练", "在 National University of Singapore 攻读博士，随后在 UC Berkeley 完成一年半博士后训练。", sources.shindeProfile), fact("研究主线", "研究 trusted computing 与 system security，并连接隐私、程序语言、系统和形式方法。", sources.shindeProfile), fact("学生指导", "SECTRS 官方项目页逐年列出其指导的硕士论文、学士论文与 semester projects。", sources.shindeStudents)], sources: [sources.ethRoster, sources.shindeProfile, sources.shindeStudents] }),
  person({ id: "zhendong-su-eth-p0-2026", name: "Zhendong Su", role: "Full Professor · AST Lab Head", institution: "ETH Zurich", region: "Europe", area: "Software Engineering · Programming Languages · Machine Learning", tags: ["Software Engineering", "Programming Languages", "Compilers", "Machine Learning"], summary: "ETH Advanced Software Technologies Lab 负责人，从编程语言、编译器和软件测试延伸到机器学习与智能编程助手，并拥有跨欧美亚的学生网络。", stage: "senior", x: 620, y: 440, portraitFile: "zhendong-su.jpg", portraitSource: sources.ethRoster,
    facts: [fact("当前任职", "自 2018 年起任 ETH Zurich Computer Science Full Professor，并领导 Advanced Software Technologies Lab。", sources.suProfile), fact("教育与学术训练", "1995 年在 UT Austin 获计算机科学学士与数学学士，2002 年在 UC Berkeley 获计算机科学博士。", sources.suProfile), fact("研究主线", "研究程序语言、编译器、软件工程、软件安全、机器学习和教育技术。", sources.suProfile), fact("人才网络", "官方主页与团队页记录学生进入多所研究型大学，以及 Google、Meta、ByteDance、Microsoft、Nvidia 等企业。", sources.suProfile)], sources: [sources.ethRoster, sources.suProfile, sources.suTeam] }),
];

export const candidatePriorityP0EuropeBatch10Relationships2026: Relationship[] = [];
export const candidatePriorityP0EuropeBatch10Placements2026: StudentPlacement[] = [
  { id: "p0-eu10-alonso-dan-graur", student: "Dan Graur", teacherId: "gustavo-alonso-eth-p0-2026", company: "Google", role: "Alumnus · current role reported by EASL", kind: "reported", sector: "industry", degree: "PhD", source: sources.alonsoStudent },
];
export const candidatePriorityP0EuropeBatch10GroupMembers2026: GroupMember[] = [
  { id: "p0-eu10-klimovic-tom-kuchler", teacherId: "ana-klimovic-eth-p0-2026", name: "Tom Kuchler", role: "Current PhD student", focus: "Efficient architectures and systems", source: sources.klimovic },
  { id: "p0-eu10-basin-sean-matthews", teacherId: "david-basin-eth-p0-2026", name: "Seán Matthews", role: "Completed PhD student · co-supervised", focus: "Information security and logic", source: sources.basinGenealogy },
  { id: "p0-eu10-capkun-carolin-beer", teacherId: "srdjan-capkun-eth-p0-2026", name: "Carolin Beer", role: "Current doctoral student", focus: "Decentralized and system security", source: sources.capkunGroup },
  { id: "p0-eu10-shinde-fabian-sidler", teacherId: "shweta-shinde-eth-p0-2026", name: "Fabian Sidler", role: "Master thesis student", focus: "Secure and trustworthy systems", source: sources.shindeStudents },
  { id: "p0-eu10-su-shaohua-li", teacherId: "zhendong-su-eth-p0-2026", name: "Shaohua Li", role: "Current PhD student", focus: "Advanced software technologies", source: sources.suTeam },
];
export const candidatePriorityP0EuropeBatch10RosterPromotions2026 = [
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Ana Klimovic", atlasPersonId: "ana-klimovic-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Gustavo Alonso", atlasPersonId: "gustavo-alonso-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "David Basin", atlasPersonId: "david-basin-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Srdjan Čapkun", atlasPersonId: "srdjan-capkun-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Shweta Shinde", atlasPersonId: "shweta-shinde-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Zhendong Su", atlasPersonId: "zhendong-su-eth-p0-2026" },
] as const;
export const people = candidatePriorityP0EuropeBatch10People2026;
export const relationships = candidatePriorityP0EuropeBatch10Relationships2026;
export const placements = candidatePriorityP0EuropeBatch10Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch10GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch10RosterPromotions2026;
