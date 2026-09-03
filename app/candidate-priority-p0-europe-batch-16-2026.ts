import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  tumRoster: source("TUM CIT · Professors", "https://www.cit.tum.de/en/cit/school/people/professors/", "official", "TUM CIT 现任教授名录与院系归属"),
  epflRoster: source("EPFL IC · Faculty members", "https://www.epfl.ch/schools/ic/about/faculty-members/", "official", "EPFL School of Computer and Communication Sciences 现任 faculty 名录"),

  duekerTum: source("TUM Mathematics · Marie-Christine Düker", "https://www.math.cit.tum.de/math/personen/professuren/dueker-marie/", "official", "TUM Statistics and Data Science 教授现职与研究领域"),
  duekerHome: source("Marie-Christine Düker · academic homepage", "https://mariedueker.github.io/", "profile", "TUM Assistant Professor 现职、博士与博士后训练及研究方向"),
  duekerCv: source("Marie-Christine Düker · CV", "https://mariedueker.github.io/cv.pdf", "profile", "完整教育任职时间线、博士后与博士生指导名单"),
  duekerPortrait: source("Marie-Christine Düker · profile portrait", "https://mariedueker.github.io/profile-photo.jpg", "profile", "个人学术主页使用的本人头像"),

  ailamakiProfile: source("EPFL People · Anastasia Ailamaki", "https://people.epfl.ch/anastasia.ailamaki?lang=en", "official", "EPFL Full Professor 现职、数据库研究、博士生与官方头像"),
  ailamakiEducation: source("EPFL EcoCloud · Anastasia Ailamaki elected IEEE Fellow", "https://ecocloud.epfl.ch/2017/12/11/anastasia-ailamaki-elevated-to-ieee-fellow/", "official", "University of Wisconsin 博士训练、数据库研究与学术荣誉"),
  ailamakiLab: source("EPFL DIAS · People", "https://www.epfl.ch/labs/dias/people/", "official", "DIAS 主任身份与当前博士生团队"),

  falsafiProfile: source("EPFL People · Babak Falsafi", "https://people.epfl.ch/babak.falsafi?lang=en", "official", "EPFL Full Professor、EcoCloud、系统产业影响、博士生与官方头像"),
  falsafiEducation: source("IEEE Computer · In-memory big data analytics", "https://infoscience.epfl.ch/bitstreams/88ddc084-aa9a-4c6c-adc3-72504cd03709/download", "publication", "作者简介记录 University of Wisconsin–Madison 计算机科学博士训练"),
  falsafiLab: source("EPFL PARSA · Babak Falsafi", "https://parsa.epfl.ch/~falsafi/", "profile", "Post-Moore 数据中心与 AI 基础设施研究及当前团队"),

  troncosoProfile: source("EPFL People · Carmela Troncoso", "https://people.epfl.ch/carmela.troncoso?lang=en", "official", "EPFL Associate Professor、隐私安全研究、博士生与官方头像"),
  troncosoEducation: source("EPFL · Carmela Troncoso profile interview", "https://actu.epfl.ch/news/it-wouldn-t-hurt-those-shaping-our-future-to-be--2", "official", "University of Vigo 学习与 KU Leuven 博士训练"),
  troncosoLecture: source("EPFL · Carmela Troncoso inaugural lecture", "https://memento.epfl.ch/event/inaugural-lecture-prof-carmela-troncoso/", "official", "KU Leuven 博士与博士后训练、EPFL 任职和隐私工程研究"),

  susstrunkProfile: source("EPFL People · Sabine Süsstrunk", "https://people.epfl.ch/sabine.susstrunk?lang=en", "official", "EPFL Full Professor、IVRL、研究履历、博士生与官方头像"),
  susstrunkLab: source("EPFL IVRL · Sabine Süsstrunk", "https://www.epfl.ch/labs/ivrl/people/susstrunk/", "official", "ETH/RIT/UEA 教育训练、产业与访问经历及计算成像研究"),
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
  portrait: { src: `portraits/candidate-p0-europe-batch-16-2026/${s.portraitFile}`, alt: `${s.name} 头像`, source: s.portraitSource },
});

export const candidatePriorityP0EuropeBatch16People2026: Person[] = [
  person({ id: "marie-christine-dueker-tum-p0-2026", name: "Marie-Christine Düker", role: "Assistant Professor · Statistics and Data Science", institution: "TUM", region: "Europe", area: "Statistical Learning · Time Series · High-Dimensional Data", tags: ["Statistical Learning", "Time Series", "High-Dimensional Statistics", "Functional Data"], summary: "TUM 统计与数据科学新生代 PI，研究高维、函数型与时间序列数据的统计学习理论和方法。", stage: "emerging", x: 150, y: 210, portraitFile: "marie-christine-dueker.jpg", portraitSource: sources.duekerPortrait, facts: [fact("当前任职", "TUM Statistics and Data Science Assistant Professor，主持独立研究方向。", sources.duekerTum), fact("教育与学术训练", "于 Ruhr University Bochum 获数学博士，随后在 Cornell University 随 David Matteson 从事博士后研究。", sources.duekerHome), fact("研究主线", "研究高维时间序列、函数型数据、变化点分析与统计学习理论。", sources.duekerHome), fact("任职时间线", "个人简历记录其先后在 Ruhr University Bochum、Cornell University 和 TUM 开展研究与教学。", sources.duekerCv), fact("学生体系", "个人简历列出博士生 James Lavis 与博士后 Yuhan Tian。", sources.duekerCv)], sources: [sources.tumRoster, sources.duekerTum, sources.duekerHome, sources.duekerCv] }),

  person({ id: "anastasia-ailamaki-epfl-p0-2026", name: "Anastasia Ailamaki", role: "Full Professor · Data-Intensive Applications and Systems Lab", institution: "EPFL", region: "Europe", area: "Database Systems · Data-Intensive Systems · Computer Architecture", tags: ["Database Systems", "Data Systems", "Computer Architecture", "Scientific Data"], summary: "EPFL DIAS 负责人，长期推动数据库软件、硬件微体系结构和数据密集型科学应用的协同设计。", stage: "senior", x: 360, y: 210, portraitFile: "anastasia-ailamaki.jpg", portraitSource: sources.ailamakiProfile, facts: [fact("当前任职", "EPFL Full Professor，领导 Data-Intensive Applications and Systems Laboratory。", sources.ailamakiProfile), fact("教育与学术训练", "2000 年在 University of Wisconsin–Madison 完成博士论文 Architecture-Conscious Database Systems。", sources.ailamakiEducation), fact("研究主线", "研究数据库系统、科学应用与计算机体系结构，重点优化数据库软件和新型硬件之间的交互。", sources.ailamakiProfile), fact("学术影响", "EPFL 资料记录其获 ACM SIGMOD Edgar F. Codd Innovations Award、VLDB Women in Database Research Award 等荣誉。", sources.ailamakiProfile), fact("学生体系", "EPFL 官方页面列出 Anna Herlihy、Yi Jiang、Georgiy Lebedev 等当前博士生及多位历届博士生。", sources.ailamakiProfile)], sources: [sources.epflRoster, sources.ailamakiProfile, sources.ailamakiEducation, sources.ailamakiLab] }),

  person({ id: "babak-falsafi-epfl-p0-2026", name: "Babak Falsafi", role: "Full Professor · Parallel Systems Architecture Lab", institution: "EPFL", region: "Europe", area: "Computer Architecture · Datacenter Systems · AI Infrastructure", tags: ["Computer Architecture", "Datacenter Systems", "AI Infrastructure", "Sustainable Computing"], summary: "EPFL PARSA 与 EcoCloud 创建者，将后摩尔时代服务器、云原生 CPU 和 AI 数据中心研究连接到产业系统。", stage: "senior", x: 570, y: 210, portraitFile: "babak-falsafi.jpg", portraitSource: sources.falsafiProfile, facts: [fact("当前任职", "EPFL Full Professor，领导 Parallel Systems Architecture Laboratory，并创立 EcoCloud 产学联盟。", sources.falsafiProfile), fact("教育与学术训练", "获 University of Wisconsin–Madison 计算机科学博士。", sources.falsafiEducation), fact("研究主线", "研究后摩尔时代服务器架构、云原生系统、异构内存与可持续 AI 基础设施。", sources.falsafiLab), fact("产业影响", "EPFL 个人页记录其成果进入 Sun/Oracle、IBM BlueGene、ARM 核、AMD、HP 与 Google PerfKit 等系统。", sources.falsafiProfile), fact("学生体系", "EPFL 官方页面列出 Ayan Chakraborty、Yuanlong Li、Shanqing Lin 等当前博士生及多位历届博士生。", sources.falsafiProfile)], sources: [sources.epflRoster, sources.falsafiProfile, sources.falsafiEducation, sources.falsafiLab] }),

  person({ id: "carmela-troncoso-epfl-p0-2026", name: "Carmela Troncoso", role: "Associate Professor · Security and Privacy Engineering Lab", institution: "EPFL", region: "Europe", area: "Privacy Engineering · Security · Responsible Computing", tags: ["Privacy", "Security", "Privacy Engineering", "Responsible Computing"], summary: "EPFL 隐私工程 PI，从系统化隐私度量、匿名通信与安全设计连接到公共数字基础设施。", stage: "emerging", x: 780, y: 210, portraitFile: "carmela-troncoso.jpg", portraitSource: sources.troncosoProfile, facts: [fact("当前任职", "EPFL Associate Professor，领导 Security and Privacy Engineering Lab。", sources.troncosoProfile), fact("教育与学术训练", "在 University of Vigo 完成电信工程学习，2011 年于 KU Leuven 获工程博士并继续从事一年博士后研究。", sources.troncosoEducation), fact("研究主线", "研究安全与隐私保护系统，开发可嵌入强隐私保证的工程方法及信息泄露量化技术。", sources.troncosoProfile), fact("任职经历", "加入 EPFL 前曾在 IMDEA Software Institute 任 faculty，并在 Gradiant 负责安全与隐私技术。", sources.troncosoLecture), fact("学生体系", "EPFL 官方页面列出 Saiid El Hajj Chehade、Eric Jollès、Christian Knabenhans 等当前博士生。", sources.troncosoProfile)], sources: [sources.epflRoster, sources.troncosoProfile, sources.troncosoEducation, sources.troncosoLecture] }),

  person({ id: "sabine-susstrunk-epfl-p0-2026", name: "Sabine Süsstrunk", role: "Full Professor · Images and Visual Representation Lab", institution: "EPFL", region: "Europe", area: "Computer Vision · Computational Imaging · Computational Photography", tags: ["Computer Vision", "Computational Imaging", "Computational Photography", "Image Quality"], summary: "EPFL IVRL 负责人，贯通计算摄影、计算成像、颜色科学、视觉感知和机器学习。", stage: "senior", x: 990, y: 210, portraitFile: "sabine-susstrunk.jpg", portraitSource: sources.susstrunkProfile, facts: [fact("当前任职", "EPFL Full Professor，自 1999 年起领导 Images and Visual Representation Laboratory。", sources.susstrunkLab), fact("教育与学术训练", "获 ETH Zurich 科学摄影学士、RIT 电子出版硕士及 University of East Anglia 计算科学博士。", sources.susstrunkLab), fact("研究主线", "研究计算摄影、计算成像、颜色图像处理、计算机视觉、机器学习和图像质量。", sources.susstrunkProfile), fact("产业与访问经历", "曾任 Corbis Corporation Principal Imaging Researcher，并在 HP Labs Palo Alto 任访问学者。", sources.susstrunkLab), fact("学生体系", "EPFL 官方页面列出 Martin Everaert、Shuangqi Li、Liying Lu 等当前博士生及多位历届博士生。", sources.susstrunkProfile)], sources: [sources.epflRoster, sources.susstrunkProfile, sources.susstrunkLab] }),
];

export const candidatePriorityP0EuropeBatch16Relationships2026: Relationship[] = [];
export const candidatePriorityP0EuropeBatch16Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0EuropeBatch16GroupMembers2026: GroupMember[] = [
  { id: "p0-eu16-dueker-james-lavis", teacherId: "marie-christine-dueker-tum-p0-2026", name: "James Lavis", role: "Doctoral student", focus: "Statistics and data science", source: sources.duekerCv },
  { id: "p0-eu16-ailamaki-anna-herlihy", teacherId: "anastasia-ailamaki-epfl-p0-2026", name: "Anna Herlihy", role: "Current PhD student", focus: "Data-intensive systems", source: sources.ailamakiProfile },
  { id: "p0-eu16-falsafi-ayan-chakraborty", teacherId: "babak-falsafi-epfl-p0-2026", name: "Ayan Chakraborty", role: "Current PhD student", focus: "Post-Moore datacenter systems", source: sources.falsafiProfile },
  { id: "p0-eu16-troncoso-eric-jolles", teacherId: "carmela-troncoso-epfl-p0-2026", name: "Eric Jollès", role: "Current PhD student", focus: "Security and privacy engineering", source: sources.troncosoProfile },
  { id: "p0-eu16-susstrunk-shuangqi-li", teacherId: "sabine-susstrunk-epfl-p0-2026", name: "Shuangqi Li", role: "Current PhD student", focus: "Computational imaging and computer vision", source: sources.susstrunkProfile },
];

export const candidatePriorityP0EuropeBatch16RosterPromotions2026 = [
  { unitUrl: "https://www.cit.tum.de/en/cit/school/people/professors/", rosterName: "Marie-Christine Düker", atlasPersonId: "marie-christine-dueker-tum-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Anastasia Ailamaki", atlasPersonId: "anastasia-ailamaki-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Babak Falsafi", atlasPersonId: "babak-falsafi-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Carmela Troncoso", atlasPersonId: "carmela-troncoso-epfl-p0-2026" },
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Sabine Süsstrunk", atlasPersonId: "sabine-susstrunk-epfl-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch16People2026;
export const relationships = candidatePriorityP0EuropeBatch16Relationships2026;
export const placements = candidatePriorityP0EuropeBatch16Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch16GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch16RosterPromotions2026;
