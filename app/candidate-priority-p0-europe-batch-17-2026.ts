import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  epflRoster: source("EPFL IC · Faculty members", "https://www.epfl.ch/schools/ic/about/faculty-members/", "official", "EPFL School of Computer and Communication Sciences 现任 faculty 名录"),
  kermarrecProfile: source("EPFL People · Anne-Marie Kermarrec", "https://people.epfl.ch/anne-marie.kermarrec?lang=en", "official", "EPFL Full Professor 现职、履历、研究、博士生和官方头像"),
  kermarrecCv: source("Anne-Marie Kermarrec · CV", "https://www.epfl.ch/labs/sacs/wp-content/uploads/2023/01/CV_KERMARREC.pdf", "cv", "教育与任职时间线、创业及学术服务"),
  fordProfile: source("EPFL People · Bryan Ford", "https://people.epfl.ch/bryan.ford?lang=en", "official", "EPFL Associate Professor 现职、博士生名录和官方头像"),
  fordEducation: source("EPFL IC Colloquium · Bryan Ford", "https://memento.epfl.ch/event/ic-colloquium-can-you-hide-in-an-internet-panopt-2/", "official", "University of Utah 本科、MIT 博士、Yale 与 EPFL 任职及安全系统研究"),
  fordImpact: source("EPFL · Bryan Ford named Digital Shaper", "https://actu.epfl.ch/news/bryan-ford-makes-bilanz-digital-shapers-list", "official", "DEDIS 领导身份、区块链与数字民主研究及 MIT/Yale 经历"),
  guerraouiProfile: source("EPFL People · Rachid Guerraoui", "https://people.epfl.ch/rachid.guerraoui?lang=en", "official", "EPFL Full Professor、分布式计算研究、博士生和官方头像"),
  guerraouiEducation: source("Collège de France · Rachid Guerraoui biography", "https://www.college-de-france.fr/en/chair/rachid-guerraoui-computer-sciences-and-digital-technologies-annual-chair/biography", "official", "Université d'Orsay 学术训练、MIT/HP Labs 经历与 EPFL DCL 现职"),
  guerraouiLab: source("EPFL DCL · Rachid Guerraoui", "https://dcl.epfl.ch/rachid/", "profile", "研究主线、当前招募及历届博士生学术与产业去向"),
  kuncakProfile: source("EPFL People · Viktor Kunčak", "https://people.epfl.ch/viktor.kuncak?lang=en", "official", "EPFL Associate Professor、MIT 博士、自动推理研究、博士培养和官方头像"),
  payerProfile: source("EPFL People · Mathias Payer", "https://people.epfl.ch/mathias.payer?lang=en", "official", "EPFL Full Professor、HexHive、安全研究、博士生和官方头像"),
  payerCv: source("Mathias Payer · CV", "https://nebelwelt.net/cv-payerm.pdf", "cv", "ETH 学位与博士导师、Berkeley/Google/Purdue/EPFL 任职及完整学生指导记录"),
  payerLab: source("EPFL HexHive · Team", "https://hexhive.epfl.ch/", "profile", "HexHive 研究主题与当前博士后、博士生团队"),
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
  portrait: { src: `portraits/candidate-p0-europe-batch-17-2026/${s.portraitFile}`, alt: `${s.name} 头像`, source: s.portraitSource },
});

export const candidatePriorityP0EuropeBatch17People2026: Person[] = [
  person({ id: "anne-marie-kermarrec-epfl-p0-2026", name: "Anne-Marie Kermarrec", role: "Full Professor · Scalable Computing Systems", institution: "EPFL", region: "Europe", area: "Distributed Systems · Machine Learning Systems · Personalization", tags: ["Distributed Systems", "Machine Learning Systems", "Peer-to-Peer", "Personalization"], summary: "EPFL 可扩展计算系统教授，连接大规模分布式算法、机器学习系统与内容个性化创业。", stage: "senior", x: 150, y: 210, portraitFile: "anne-marie-kermarrec.jpg", portraitSource: sources.kermarrecProfile, facts: [fact("当前任职", "2020 年起任 EPFL Professor，领导 Scalable Computing Systems 方向，并承担博士教育管理职责。", sources.kermarrecProfile), fact("教育与学术训练", "在 University of Rennes 获博士学位，之后曾在 Vrije Universiteit 和 Microsoft Research Cambridge 开展研究。", sources.kermarrecProfile), fact("研究主线", "研究大规模分布式系统、epidemic algorithms、点对点网络及面向机器学习的系统支持。", sources.kermarrecProfile), fact("产业与创业", "2015 年创办内容个性化公司 Mediego 并任 CEO，此前为 Inria Research Director。", sources.kermarrecProfile), fact("学生体系", "EPFL 官方页面列出 Maxime Jacovella、Diana Petrescu、Mathis Randl 等当前博士生。", sources.kermarrecProfile)], sources: [sources.epflRoster, sources.kermarrecProfile, sources.kermarrecCv] }),
  person({ id: "bryan-ford-epfl-p0-2026", name: "Bryan Ford", role: "Associate Professor · Decentralized and Distributed Systems Lab", institution: "EPFL", region: "Europe", area: "Decentralized Systems · Security · Privacy · Digital Democracy", tags: ["Distributed Systems", "Security", "Privacy", "Blockchain"], summary: "EPFL DEDIS 负责人，从安全分布式系统、隐私通信与区块链推进到数字民主基础设施。", stage: "senior", x: 360, y: 210, portraitFile: "bryan-ford.jpg", portraitSource: sources.fordProfile, facts: [fact("当前任职", "EPFL Associate Professor，领导 Decentralized and Distributed Systems Lab。", sources.fordProfile), fact("教育与学术训练", "获 University of Utah 学士和 MIT 博士，博士阶段研究分布式系统、虚拟化与微内核。", sources.fordEducation), fact("研究主线", "研究去中心化系统、安全与隐私、数字民主和区块链技术。", sources.fordImpact), fact("任职经历", "完成 MIT 博士后先后在 Yale University 与 EPFL 任教。", sources.fordEducation), fact("学生体系", "EPFL 官方页面列出 Shailesh Mishra、Ant Srikanth 与 Haoqian Zhang 等当前博士生。", sources.fordProfile)], sources: [sources.epflRoster, sources.fordProfile, sources.fordEducation, sources.fordImpact] }),
  person({ id: "rachid-guerraoui-epfl-p0-2026", name: "Rachid Guerraoui", role: "Full Professor · Distributed Computing Laboratory", institution: "EPFL", region: "Europe", area: "Distributed Computing · Robust Machine Learning · Secure Storage", tags: ["Distributed Computing", "Robust Machine Learning", "Secure Storage", "Concurrency"], summary: "EPFL DCL 负责人，在分布式算法、并发系统、安全存储与鲁棒机器学习之间形成庞大学术和产业人才网络。", stage: "senior", x: 570, y: 210, portraitFile: "rachid-guerraoui.jpg", portraitSource: sources.guerraouiProfile, facts: [fact("当前任职", "EPFL Full Professor，领导 Distributed Computing Laboratory。", sources.guerraouiEducation), fact("教育与学术训练", "在 Université d'Orsay 接受学术训练并获计算机科学博士。", sources.guerraouiEducation), fact("研究主线", "研究分布式算法、并发编程、安全分布式存储、事务内存和鲁棒机器学习。", sources.guerraouiProfile), fact("任职经历", "曾在 CEA Saclay、HP Labs Palo Alto、MIT 与 Collège de France 开展研究或教学。", sources.guerraouiProfile), fact("学生与产业网络", "DCL 主页公开列出 Dan Alistarh、Karolos Antoniadis、Jingjing Wang 等历届博士生及其 ISTA、Meta、Google 等去向。", sources.guerraouiLab)], sources: [sources.epflRoster, sources.guerraouiProfile, sources.guerraouiEducation, sources.guerraouiLab] }),
  person({ id: "viktor-kuncak-epfl-p0-2026", name: "Viktor Kunčak", role: "Associate Professor · Automated Reasoning and Analysis Lab", institution: "EPFL", region: "Europe", area: "Automated Reasoning · Program Verification · Synthesis", tags: ["Automated Reasoning", "Formal Verification", "Program Synthesis", "Programming Languages"], summary: "EPFL LARA 负责人，长期研究程序验证、自动推理、语言和综合系统，并形成超过十五名博士的培养体系。", stage: "senior", x: 780, y: 210, portraitFile: "viktor-kuncak.jpg", portraitSource: sources.kuncakProfile, facts: [fact("当前任职", "2007 年加入 EPFL，现任 Associate Professor 并领导 Laboratory for Automated Reasoning and Analysis。", sources.kuncakProfile), fact("教育与学术训练", "加入 EPFL 前在 MIT 获计算机科学博士。", sources.kuncakProfile), fact("研究主线", "研究用于验证与自动推理的语言、算法和系统，并覆盖程序综合与编译技术。", sources.kuncakProfile), fact("学术服务", "曾协调欧洲自动推理、验证与综合 COST 网络，并担任 CAV、FMCAD、VMCAI 等会议主席。", sources.kuncakProfile), fact("学生体系", "EPFL 页面记录其已指导至少 15 篇完成的博士论文，并列出 Matthieu Bovel、Samuel Chassot 等当前博士生。", sources.kuncakProfile)], sources: [sources.epflRoster, sources.kuncakProfile] }),
  person({ id: "mathias-payer-epfl-p0-2026", name: "Mathias Payer", role: "Full Professor · HexHive Laboratory", institution: "EPFL", region: "Europe", area: "Software Security · Systems Security · Fuzzing", tags: ["Software Security", "Systems Security", "Fuzzing", "Program Analysis"], summary: "EPFL HexHive 负责人，以程序分析、编译器和模糊测试构建软件与系统安全防护。", stage: "senior", x: 990, y: 210, portraitFile: "mathias-payer.jpg", portraitSource: sources.payerProfile, facts: [fact("当前任职", "2026 年晋升 EPFL Computer Science Full Professor，领导 HexHive group。", sources.payerCv), fact("教育与学术训练", "在 ETH Zurich 获计算机科学硕士与博士，博士导师 Thomas R. Gross，共同指导包括 Steven Hand 与 Srdjan Čapkun。", sources.payerCv), fact("研究主线", "研究软件和系统安全、内存破坏、类型安全、隔离机制、sanitization 与 fuzzing。", sources.payerProfile), fact("任职经历", "曾在 Google 安全团队工作、在 UC Berkeley Dawn Song 的 BitBlaze group 从事博士后，并于 Purdue 任教。", sources.payerCv), fact("学生体系", "EPFL 页面与 CV 列出 Luca Di Bartolomeo、Zhiyao Feng、Florian Hofhammer 等当前博士生。", sources.payerProfile)], sources: [sources.epflRoster, sources.payerProfile, sources.payerCv, sources.payerLab] }),
];

export const candidatePriorityP0EuropeBatch17Relationships2026: Relationship[] = [];
export const candidatePriorityP0EuropeBatch17Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0EuropeBatch17GroupMembers2026: GroupMember[] = [
  { id: "p0-eu17-kermarrec-maxime-jacovella", teacherId: "anne-marie-kermarrec-epfl-p0-2026", name: "Maxime Jacovella", role: "Current PhD student", focus: "Scalable computing systems", source: sources.kermarrecProfile },
  { id: "p0-eu17-ford-shailesh-mishra", teacherId: "bryan-ford-epfl-p0-2026", name: "Shailesh Mishra", role: "Current PhD student", focus: "Decentralized and distributed systems", source: sources.fordProfile },
  { id: "p0-eu17-guerraoui-dan-alistarh", teacherId: "rachid-guerraoui-epfl-p0-2026", name: "Dan Alistarh", role: "Former PhD student · academic placement at ISTA", focus: "Distributed computing", source: sources.guerraouiLab },
  { id: "p0-eu17-kuncak-samuel-chassot", teacherId: "viktor-kuncak-epfl-p0-2026", name: "Samuel Chassot", role: "Current PhD student", focus: "Automated reasoning and analysis", source: sources.kuncakProfile },
  { id: "p0-eu17-payer-luca-di-bartolomeo", teacherId: "mathias-payer-epfl-p0-2026", name: "Luca Di Bartolomeo", role: "Current PhD student", focus: "Software and systems security", source: sources.payerProfile },
];

export const candidatePriorityP0EuropeBatch17RosterPromotions2026 = [
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Anne-Marie Kermarrec", atlasPersonId: "anne-marie-kermarrec-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Bryan Ford", atlasPersonId: "bryan-ford-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Rachid Guerraoui", atlasPersonId: "rachid-guerraoui-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Viktor Kuncak", atlasPersonId: "viktor-kuncak-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Mathias Josef Payer", atlasPersonId: "mathias-payer-epfl-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch17People2026;
export const relationships = candidatePriorityP0EuropeBatch17Relationships2026;
export const placements = candidatePriorityP0EuropeBatch17Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch17GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch17RosterPromotions2026;
