import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", supports, checkedAt });
const epflRoster = source("EPFL IC · Faculty members", "https://www.epfl.ch/schools/ic/about/faculty-members/", "EPFL IC 现任教师名录");
const abbeProfile = source("EPFL People · Emmanuel Abbé", "https://people.epfl.ch/emmanuel.abbe?lang=en", "现任 Full Professor、教育与任职履历、课程、现任及历届博士生和官方头像");
const abbeLab = source("Chair of Mathematical Data Science · Emmanuel Abbé", "https://sma.epfl.ch/~abbe/", "EPFL Chair of Mathematical Data Science 职务、研究方向、教育和 Princeton 任职经历");
const urbankeProfile = source("EPFL People · Rüdiger Urbanke", "https://people.epfl.ch/rudiger.urbanke?lang=en", "现任 Full Professor、教育与导师、研究方向、奖项、现任及历届博士生和官方头像");
const fact = (label: string, value: string, evidence: Source) => ({ label, value, source: evidence });
const person = (row: Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & { portraitFile: string; portraitSource: Source }): Person => ({
  ...row,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: { src: `portraits/candidate-p0-europe-full-batch-1-2026/${row.portraitFile}`, alt: `${row.name} 头像`, source: row.portraitSource },
});

export const candidatePriorityP0EuropeFullBatch1People2026: Person[] = [
  person({
    id: "emmanuel-abbe-epfl-p0-full-2026", name: "Emmanuel Abbé", role: "Full Professor · Chair of Mathematical Data Science", institution: "EPFL", region: "Europe",
    area: "Mathematical Data Science · Machine Learning · Information Theory", tags: ["Machine Learning", "Information Theory", "AI Reasoning", "Mathematical Data Science"],
    summary: "EPFL 数学数据科学讲席教授，从信息论、概率与离散数学研究机器学习和人工智能的理论基础。", stage: "senior", x: 260, y: 210,
    portraitFile: "emmanuel-abbe.jpg", portraitSource: abbeProfile,
    facts: [
      fact("当前任职", "EPFL Mathematics Institute 与 School of Computer and Communication Sciences Full Professor，主持 Chair of Mathematical Data Science。", abbeLab),
      fact("教育与学术训练", "2003 年于 EPFL 数学系获硕士学位，2008 年于 MIT EECS 获博士学位。", abbeProfile),
      fact("任职经历", "2012–2016 年在 Princeton 任 Assistant Professor，随后任 tenured Associate Professor；2018 年加入 EPFL。", abbeProfile),
      fact("研究主线", "研究数据科学与 AI 的数学原理，覆盖机器学习、信息论、概率、统计与离散数学。", abbeLab),
      fact("学生体系", "EPFL 官方页面列出 Kirill Brilliantov、Ilia Mahrooghi、Denys Pushkin、Vladyslav Shashkov 与 Anja Surina 为现任博士生。", abbeProfile),
    ],
    sources: [epflRoster, abbeProfile, abbeLab],
  }),
  person({
    id: "rudiger-urbanke-epfl-p0-full-2026", name: "Rüdiger Urbanke", role: "Full Professor · Communication Theory Laboratory", institution: "EPFL", region: "Europe",
    area: "Information Theory · Coding · Machine Learning Foundations", tags: ["Information Theory", "Coding Theory", "Graphical Models", "Machine Learning Theory"],
    summary: "EPFL 通信理论实验室教授，以编码理论、图模型和统计物理方法连接通信与现代机器学习理论。", stage: "senior", x: 510, y: 210,
    portraitFile: "rudiger-urbanke.jpg", portraitSource: urbankeProfile,
    facts: [
      fact("当前任职", "EPFL Full Professor，隶属 Communication Theory Laboratory。", urbankeProfile),
      fact("教育与学术训练", "1990 年获 TU Wien 工程学位，随后在 Washington University in St. Louis 获 EE 硕士与博士学位；硕博均由 Bixio Rimoldi 指导。", urbankeProfile),
      fact("研究主线", "研究经典与量子通信的纠错码、信息论、图模型，以及现代机器学习的理论基础。", urbankeProfile),
      fact("学术影响", "EPFL 页面记录其获 2014 IEEE Hamming Medal 与 2023 IEEE Information Theory Society Claude E. Shannon Award。", urbankeProfile),
      fact("学生体系", "EPFL 页面列出 Thomas Weinberger 为现任博士生，并列出 Marco Mondelli、Amin Karbasi、Shrinivas Kudekar 等历届博士生。", urbankeProfile),
    ],
    sources: [epflRoster, urbankeProfile],
  }),
];

export const candidatePriorityP0EuropeFullBatch1Relationships2026: Relationship[] = [];
export const candidatePriorityP0EuropeFullBatch1Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0EuropeFullBatch1GroupMembers2026: GroupMember[] = [
  { id: "p0-eu-full1-abbe-kirill-brilliantov", teacherId: "emmanuel-abbe-epfl-p0-full-2026", name: "Kirill Brilliantov", role: "Current PhD student", focus: "Mathematical data science", source: abbeProfile },
  { id: "p0-eu-full1-urbanke-thomas-weinberger", teacherId: "rudiger-urbanke-epfl-p0-full-2026", name: "Thomas Weinberger", role: "Current PhD student", focus: "Information and coding theory", source: urbankeProfile },
];

export const candidatePriorityP0EuropeFullBatch1RosterPromotions2026 = [
  { unitUrl: epflRoster.url, rosterName: "Emmanuel Abbé", atlasPersonId: "emmanuel-abbe-epfl-p0-full-2026" },
  { unitUrl: epflRoster.url, rosterName: "Rüdiger Urbanke", atlasPersonId: "rudiger-urbanke-epfl-p0-full-2026" },
] as const;

export const people = candidatePriorityP0EuropeFullBatch1People2026;
export const relationships = candidatePriorityP0EuropeFullBatch1Relationships2026;
export const placements = candidatePriorityP0EuropeFullBatch1Placements2026;
export const groupMembers = candidatePriorityP0EuropeFullBatch1GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeFullBatch1RosterPromotions2026;
