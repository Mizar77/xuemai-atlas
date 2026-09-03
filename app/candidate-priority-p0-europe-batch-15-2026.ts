import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  tumRoster: source("TUM CIT · Professors", "https://www.cit.tum.de/en/cit/school/people/professors/", "official", "TUM CIT 现任教授名录与院系归属"),
  ethRoster: source("ETH Zurich D-INFK · Faculty", "https://inf.ethz.ch/people/faculty.html", "official", "ETH D-INFK 现任教授名录与职称"),
  epflRoster: source("EPFL IC · Faculty members", "https://www.epfl.ch/schools/ic/about/faculty-members/", "official", "EPFL School of Computer and Communication Sciences 现任 faculty 名录"),

  esparzaProfile: source("TUM Professorial Faculty · Javier Esparza", "https://www.professoren.tum.de/en/esparza-estaun-francisco-javier", "official", "TUM Full Professor 现职、教育、任职时间线、软件验证研究与官方头像"),
  esparzaHome: source("Javier Esparza · academic homepage", "https://www7.in.tum.de/~esparza/", "profile", "TUM 教授身份、当前与历届博士生、博士后和研究项目"),
  etesamiProfile: source("TUM Decision Science & Systems · Jalal Etesami", "https://www.cs.cit.tum.de/en/dss/members/prof-jalal-etesami/", "official", "TUM Assistant Professor 现职、UIUC 博士、EPFL 博士后与因果机器学习研究"),
  etesamiCareer: source("EPFL · Jalal Etesami appointment interview", "https://actu.epfl.ch/news/congratulations-to-dr-jalal-etesami-for-his-prof-3/", "official", "UIUC 博士导师 Negar Kiyavash、Bosch AI 任职、EPFL 博士后导师与转任 TUM"),
  etesamiPortrait: source("TUM Professorial Faculty · Seyed Jalal Etesami", "https://www.professoren.tum.de/en/etesami-seyed-jalal", "official", "TUM 教授身份与官方头像"),
  chronisHome: source("Yannis Chronis · academic homepage", "https://chronis.inf.ethz.ch/", "profile", "ETH Assistant Professor 现职、Wisconsin 博士导师、Athens 学位导师、Google 经历、研究与官方头像"),
  chronisWelcome: source("ETH D-INFK · Welcome Yannis Chronis", "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2025/08/welcome-yannis-chronis.html", "official", "2025 年 ETH tenure-track 任命、数据管理与软硬件协同研究计划"),

  chiesaProfile: source("EPFL People · Alessandro Chiesa", "https://people.epfl.ch/alessandro.chiesa?lang=en", "official", "EPFL Associate Professor 现职、MIT 学位、密码证明研究、创业、博士生与官方头像"),
  candeaProfile: source("EPFL People · George Candea", "https://people.epfl.ch/george.candea?lang=en", "official", "EPFL Full Professor 现职、MIT/Stanford 教育、系统研究、创业、博士生与官方头像"),
  oderskyProfile: source("EPFL People · Martin Odersky", "https://people.epfl.ch/martin.odersky?lang=en", "official", "EPFL Full Professor 现职、ETH 博士、IBM/Yale 经历、Scala 研究、博士生与官方头像"),
  thiranProfile: source("EPFL People · Patrick Thiran", "https://people.epfl.ch/patrick.thiran?lang=en", "official", "EPFL Full Professor 现职、UCLouvain/Berkeley/EPFL 教育、Sprint 经历、网络科学、博士生与官方头像"),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, s: Source) => ({ label, value, source: s });
type Seed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & { portraitFile: string; portraitSource: Source };
const person = (s: Seed): Person => ({
  ...s,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: { src: `portraits/candidate-p0-europe-batch-15-2026/${s.portraitFile}`, alt: `${s.name} 头像`, source: s.portraitSource },
});

export const candidatePriorityP0EuropeBatch15People2026: Person[] = [
  person({ id: "javier-esparza-tum-p0-2026", name: "Javier Esparza", role: "Full Professor · Foundations of Software Reliability and Theoretical Computer Science", institution: "TUM", region: "Europe", area: "Formal Verification · Automata Theory · Software Reliability", tags: ["Formal Verification", "Automata Theory", "Software Reliability", "Complexity Theory"], summary: "TUM 软件可靠性与理论计算机科学资深教授，长期研究自动机、逻辑与模型检测，并已形成稳定博士生体系。", stage: "senior", x: 150, y: 210, portraitFile: "javier-esparza.jpg", portraitSource: sources.esparzaProfile, facts: [fact("当前任职", "2007 年起任 TUM Full Professor，主持软件可靠性基础与理论计算机科学研究。", sources.esparzaProfile), fact("教育与学术训练", "在 University of Zaragoza 学习物理，1990 年于该校获计算机科学博士。", sources.esparzaProfile), fact("研究主线", "研究用于定位、消除和形式化验证软件错误的逻辑、自动机与复杂性方法。", sources.esparzaProfile), fact("任职时间线", "曾任 TUM Associate Professor、University of Edinburgh Professor 和 University of Stuttgart Chair。", sources.esparzaProfile), fact("学生体系", "个人主页公开列出 Philipp Czerner 等当前博士生及 Jan Křetínský、Richard Mayr 等历届学生。", sources.esparzaHome)], sources: [sources.tumRoster, sources.esparzaProfile, sources.esparzaHome] }),
  person({ id: "jalal-etesami-tum-p0-2026", name: "Seyed Jalal Etesami", role: "Assistant Professor · Decision Analytics", institution: "TUM", region: "Europe", area: "Causal Inference · Machine Learning · Multi-Agent Systems", tags: ["Causal Inference", "Machine Learning", "Multi-Agent Systems", "Game Theory"], summary: "TUM Decision Analytics 独立 PI，从因果结构学习延伸到多智能体、博弈论与统计决策。", stage: "emerging", x: 360, y: 210, portraitFile: "seyyed-jalal-etesami.jpg", portraitSource: sources.etesamiPortrait, facts: [fact("当前任职", "2023 年起任 TUM Department of Computer Science Assistant Professor of Decision Analytics。", sources.etesamiCareer), fact("教育与学术训练", "在 Isfahan University of Technology 完成电气工程与应用数学本科，后于 UIUC 获工业与系统工程博士，导师 Negar Kiyavash。", sources.etesamiCareer), fact("研究主线", "研究机器学习与统计决策，重点包括因果推断、多智能体系统和博弈论。", sources.etesamiProfile), fact("任职经历", "曾在 Bosch Center for Artificial Intelligence 从事自动驾驶研究，后在 EPFL 随 Negar Kiyavash 与 Matthias Grossglauser 从事博士后研究。", sources.etesamiCareer)], sources: [sources.tumRoster, sources.etesamiProfile, sources.etesamiCareer, sources.etesamiPortrait] }),
  person({ id: "yannis-chronis-eth-p0-2026", name: "Yannis Chronis", role: "Tenure-Track Assistant Professor · Database Management Systems", institution: "ETH Zurich", region: "Europe", area: "Database Systems · Semantic Search · AI Systems", tags: ["Database Systems", "Semantic Search", "AI Systems", "Hardware-Software Co-design"], summary: "ETH 数据库系统新生代 PI，把向量检索、AI 数据基础设施与软硬件协同设计连接起来。", stage: "emerging", x: 570, y: 210, portraitFile: "yannis-chronis.jpg", portraitSource: sources.chronisHome, facts: [fact("当前任职", "2025 年起任 ETH Zurich Tenure-Track Assistant Professor of Computer Science，同时为 Google Visiting Faculty。", sources.chronisHome), fact("教育与学术训练", "在 University of Wisconsin–Madison 获计算机科学博士，导师 Jignesh Patel；本硕就读 University of Athens，由 Yannis Ioannidis 指导。", sources.chronisHome), fact("研究主线", "研究语义与向量检索、新一代数据库架构、数据处理的软硬件协同设计。", sources.chronisHome), fact("产业经历", "加入 ETH 前在 Google Systems Research Group 任研究员三年，并曾于 Microsoft Research 与 Google 实习。", sources.chronisHome), fact("建组方向", "ETH 官方采访记录其正在建立聚焦数据管理与软硬件协同设计的研究组。", sources.chronisWelcome)], sources: [sources.ethRoster, sources.chronisHome, sources.chronisWelcome] }),

  person({ id: "alessandro-chiesa-epfl-p0-2026", name: "Alessandro Chiesa", role: "Associate Professor · Laboratory for Computation Security", institution: "EPFL", region: "Europe", area: "Cryptography · Complexity Theory · Zero-Knowledge Proofs", tags: ["Cryptography", "Zero-Knowledge Proofs", "Complexity Theory", "Security"], summary: "EPFL 计算安全教授，推动 zkSNARK 从理论、开源实现到 Zcash 与 StarkWare 创业落地。", stage: "emerging", x: 150, y: 430, portraitFile: "alessandro-chiesa.jpg", portraitSource: sources.chiesaProfile, facts: [fact("当前任职", "EPFL School of Computer and Communication Sciences Associate Professor，隶属 Laboratory for Computation Security。", sources.chiesaProfile), fact("教育与学术训练", "2009 年在 MIT 获计算机科学与数学双本科，2010 年获 MEng，2014 年获计算机科学博士。", sources.chiesaProfile), fact("研究主线", "研究复杂性、密码学和短且易验证的密码证明，参与多个 zkSNARK 库和 Zerocash 协议。", sources.chiesaProfile), fact("产业与创业", "为 Zcash 与 StarkWare Industries 联合创始人。", sources.chiesaProfile), fact("学生体系", "EPFL 个人页公开列出 Zijing Di、Giacomo Fenzi、Zihan Hu 等当前博士生。", sources.chiesaProfile)], sources: [sources.epflRoster, sources.chiesaProfile] }),
  person({ id: "george-candea-epfl-p0-2026", name: "George Candea", role: "Full Professor · Dependable Systems Lab Head", institution: "EPFL", region: "Europe", area: "Dependable Systems · Systems Software · Security", tags: ["Dependable Systems", "Systems Software", "Security", "AI-assisted Software"], summary: "EPFL Dependable Systems Lab 负责人，在可信系统研究、产品化与博士创业网络之间形成稳定连接。", stage: "senior", x: 360, y: 430, portraitFile: "george-candea.jpg", portraitSource: sources.candeaProfile, facts: [fact("当前任职", "EPFL Full Professor，领导 Dependable Systems Lab，研究高效且可信的计算机系统。", sources.candeaProfile), fact("教育与学术训练", "1997 年与 1998 年在 MIT 获电气工程与计算机科学学位，2005 年获 Stanford 计算机科学博士。", sources.candeaProfile), fact("研究主线", "研究可靠、可信和高效系统，当前关注对性能与能耗行为建立可编程抽象。", sources.candeaProfile), fact("产业与创业", "与四位博士生联合创办 Cyberhaven，并曾与 Stanford 同事联合创办 Aster Data Systems。", sources.candeaProfile), fact("学生体系", "EPFL 个人页公开列出 Silviu Andrica、Stefan Bucur、Baris Kasikci 等历届博士生。", sources.candeaProfile)], sources: [sources.epflRoster, sources.candeaProfile] }),
  person({ id: "martin-odersky-epfl-p0-2026", name: "Martin Odersky", role: "Full Professor · Programming Methods Laboratory Head", institution: "EPFL", region: "Europe", area: "Programming Languages · Type Systems · Compilers", tags: ["Programming Languages", "Scala", "Type Systems", "Compilers"], summary: "EPFL 编程方法学资深教授与 Scala 设计者，长期推动面向对象和函数式编程的融合。", stage: "senior", x: 570, y: 430, portraitFile: "martin-odersky.jpg", portraitSource: sources.oderskyProfile, facts: [fact("当前任职", "1999 年起任 EPFL Full Professor，领导 programming research group。", sources.oderskyProfile), fact("教育与学术训练", "1989 年在 ETH Zurich 获博士学位，之后于 IBM T. J. Watson Research Center 和 Yale University 从事研究。", sources.oderskyProfile), fact("研究主线", "研究编程语言语义、类型系统、语言设计和编译器，主线是融合面向对象与函数式编程。", sources.oderskyProfile), fact("技术影响", "主导 Scala 语言，参与设计 Java generics，并是 javac 参考编译器的原始作者。", sources.oderskyProfile), fact("学生体系", "EPFL 个人页列出 Matthieu Bovel、Anna Herlihy 等当前博士生及 Nada Amin、Tiark Rompf 等历届博士生。", sources.oderskyProfile)], sources: [sources.epflRoster, sources.oderskyProfile] }),
  person({ id: "patrick-thiran-epfl-p0-2026", name: "Patrick Thiran", role: "Full Professor · Information and Network Dynamics Laboratory", institution: "EPFL", region: "Europe", area: "Network Science · Machine Learning · Communication Systems", tags: ["Network Science", "Machine Learning", "Communication Systems", "Stochastic Models"], summary: "EPFL 网络与系统理论资深教授，把随机模型、数据驱动网络科学和通信系统连接起来。", stage: "senior", x: 780, y: 430, portraitFile: "patrick-thiran.jpg", portraitSource: sources.thiranProfile, facts: [fact("当前任职", "EPFL School of Computer and Communication Sciences Full Professor in Network and Systems Theory。", sources.thiranProfile), fact("教育与学术训练", "在 Université Catholique de Louvain 获电气工程学位，UC Berkeley 获电气工程硕士，1996 年获 EPFL 博士。", sources.thiranProfile), fact("研究主线", "研究通信与社会网络、性能分析、随机模型以及数据驱动网络科学。", sources.thiranProfile), fact("产业经历", "2000–2001 年在 Sprint Advanced Technology Labs 工作。", sources.thiranProfile), fact("学生体系", "EPFL 个人页持续公开其博士生与历届博士生名录。", sources.thiranProfile)], sources: [sources.epflRoster, sources.thiranProfile] }),
];

const supportPerson = (id: string, name: string, role: string, institution: Person["institution"], actualInstitution: string | undefined, area: string, summary: string, evidence: Source, x: number): Person => ({
  id, name, role, institution, actualInstitution, region: "United States", area, tags: ["师承节点"], summary,
  stage: "senior", category: "adjacent", status: "supporting mentor node · relationship evidence only", sources: [evidence], x, y: 25, primary: false, lastVerifiedAt: checkedAt,
});

export const candidatePriorityP0EuropeBatch15SupportingPeople2026: Person[] = [
  supportPerson("jignesh-patel-lineage-eu15", "Jignesh Patel", "Professor", "Wisconsin", undefined, "Database Systems", "Yannis Chronis 个人主页明确列出的 Wisconsin 博士导师。", sources.chronisHome, 250),
  supportPerson("negar-kiyavash-lineage-eu15", "Negar Kiyavash", "Professor", "External", "EPFL", "Causal Inference · Information Theory", "EPFL 任命采访明确列出的 Seyed Jalal Etesami UIUC 博士导师。", sources.etesamiCareer, 450),
];

export const candidatePriorityP0EuropeBatch15Relationships2026: Relationship[] = [
  { id: "p0-eu15-patel-chronis", from: "jignesh-patel-lineage-eu15", to: "yannis-chronis-eth-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Yannis Chronis 个人主页明确写明其 Wisconsin 计算机科学博士由 Jignesh Patel 指导。", evidenceObject: "Yannis Chronis · PhD in Computer Science · University of Wisconsin–Madison", source: sources.chronisHome, verified: true },
  { id: "p0-eu15-kiyavash-etesami", from: "negar-kiyavash-lineage-eu15", to: "jalal-etesami-tum-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "EPFL 任命采访中 Seyed Jalal Etesami 明确说明其 UIUC 博士期间与 Prof. Kiyavash 工作。", evidenceObject: "Seyed Jalal Etesami · PhD in Industrial and Systems Engineering · UIUC", source: sources.etesamiCareer, verified: true },
];

export const candidatePriorityP0EuropeBatch15Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0EuropeBatch15GroupMembers2026: GroupMember[] = [
  { id: "p0-eu15-esparza-philipp-czerner", teacherId: "javier-esparza-tum-p0-2026", name: "Philipp Czerner", role: "Current doctoral student", focus: "Formal verification and theoretical computer science", source: sources.esparzaHome },
  { id: "p0-eu15-chiesa-zijing-di", teacherId: "alessandro-chiesa-epfl-p0-2026", name: "Zijing Di", role: "Current PhD student", focus: "Cryptographic proofs and computation security", source: sources.chiesaProfile },
  { id: "p0-eu15-candea-stefan-bucur", teacherId: "george-candea-epfl-p0-2026", name: "Stefan Bucur", role: "Former EPFL PhD student", focus: "Dependable systems", source: sources.candeaProfile },
  { id: "p0-eu15-odersky-matthieu-bovel", teacherId: "martin-odersky-epfl-p0-2026", name: "Matthieu Bovel", role: "Current PhD student", focus: "Programming languages and type systems", source: sources.oderskyProfile },
  { id: "p0-eu15-thiran-sepehr-elahi", teacherId: "patrick-thiran-epfl-p0-2026", name: "Sepehr Elahi", role: "Current PhD student", focus: "Network and systems theory", source: sources.thiranProfile },
];

export const candidatePriorityP0EuropeBatch15RosterPromotions2026 = [
  { unitUrl: "https://www.cit.tum.de/en/cit/school/people/professors/", rosterName: "Francisco Javier Esparza Estaun", atlasPersonId: "javier-esparza-tum-p0-2026" },
  { unitUrl: "https://www.cit.tum.de/en/cit/school/people/professors/", rosterName: "Seyed Jalal Etesami", atlasPersonId: "jalal-etesami-tum-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Yannis Chronis", atlasPersonId: "yannis-chronis-eth-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Alessandro Chiesa", atlasPersonId: "alessandro-chiesa-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "George Candea", atlasPersonId: "george-candea-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Martin Odersky", atlasPersonId: "martin-odersky-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Patrick Thiran", atlasPersonId: "patrick-thiran-epfl-p0-2026" },
] as const;

export const people = [...candidatePriorityP0EuropeBatch15People2026, ...candidatePriorityP0EuropeBatch15SupportingPeople2026];
export const relationships = candidatePriorityP0EuropeBatch15Relationships2026;
export const placements = candidatePriorityP0EuropeBatch15Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch15GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch15RosterPromotions2026;
