import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  aroraPrinceton: source(
    "Princeton Computer Science · Sanjeev Arora",
    "https://www.cs.princeton.edu/people/profile/arora",
    "official",
    "Sanjeev Arora 的 Princeton 讲席教授任职、on-leave 状态、研究方向、教育、学术领导与主要荣誉",
  ),
  aroraPli: source(
    "Princeton Language and Intelligence · Leadership",
    "https://pli.princeton.edu/people/leadership-and-staff",
    "official",
    "Sanjeev Arora 的 Princeton Language and Intelligence Director 与讲席教授身份",
  ),
  aroraCv: source(
    "Sanjeev Arora · Princeton-hosted CV",
    "https://www.cs.princeton.edu/~arora/cvweb.pdf",
    "cv",
    "UC Berkeley 计算机科学博士学位、U. V. Vazirani 博士导师及 Princeton 任职轨迹",
  ),
  tengyuGraduation: source(
    "Princeton Computer Science · Class of 2018",
    "https://www.cs.princeton.edu/news/congratulations-computer-science-department-class-2018",
    "official",
    "Princeton 官方毕业名录明确 Tengyu Ma 与 Andrej Risteski 的 Adviser 为 Sanjeev Arora",
  ),
  aroraStudents2022: source(
    "Princeton Computer Science · Class of 2022",
    "https://www.cs.princeton.edu/news/congratulations-department-computer-science-class-2022",
    "official",
    "Princeton 官方毕业名录明确 Wei Hu、Orestis Plevrakis 与 Yi Zhang 的 Adviser 为 Sanjeev Arora",
  ),
  portraitSource: source(
    "Princeton Computer Science · Sanjeev Arora official portrait",
    "https://www.cs.princeton.edu/people/profile/arora",
    "official",
    "Sanjeev Arora 的官方人物照片；原图位于 Princeton CS 官方媒体目录 /sites/default/files/2024-08/arora-profile.jpg",
  ),
};

const portrait: NonNullable<Person["portrait"]> = {
  src: "portraits/influence-us-tengyu-final/sanjeev-arora-us.jpg",
  alt: "Portrait of Sanjeev Arora",
  source: sources.portraitSource,
};

export const influenceQueueUsTengyuFinalPeople: Person[] = [
  {
    id: "sanjeev-arora-us",
    name: "Sanjeev Arora",
    role: "Charles C. Fitzmorris Professor · Director, Princeton Language and Intelligence",
    institution: "Princeton",
    region: "United States",
    area: "Machine Learning · Theory · Natural Language Processing",
    tags: ["机器学习理论", "计算复杂性", "NLP", "LLM", "Princeton Language and Intelligence"],
    summary:
      "Princeton 机器学习理论与计算复杂性资深学者、Princeton Language and Intelligence 创始主任；其研究从近似算法延伸到机器学习理论和大模型机理。",
    facts: [
      {
        label: "当前任职",
        value: "Princeton Charles C. Fitzmorris Professor；官方 CS 页面当前标注 on leave。",
        source: sources.aroraPrinceton,
      },
      {
        label: "学术领导",
        value: "Princeton Language and Intelligence 创始主任，PLI 官方领导页列为现任 Director。",
        source: sources.aroraPli,
      },
      {
        label: "教育与学术训练",
        value: "1994 年获 UC Berkeley 计算机科学博士，Princeton-hosted CV 明确导师为 U. V. Vazirani。",
        source: sources.aroraCv,
      },
      {
        label: "研究主线",
        value: "机器学习、理论计算机科学与自然语言处理；当前工作连接大模型的概念理解和设计方法。",
        source: sources.aroraPrinceton,
      },
      {
        label: "学术影响",
        value: "ACM Prize in Computing、两次 Gödel Prize、Fulkerson Prize、ACM Doctoral Dissertation Award；当选美国国家科学院院士与 ACM Fellow。",
        source: sources.aroraPrinceton,
      },
      {
        label: "为什么值得关注",
        value: "既是复杂性与近似算法的重要理论节点，也是 Princeton 大模型研究共同体与多代机器学习 PI 培养网络的关键导师。",
        source: sources.aroraPli,
      },
    ],
    stage: "senior",
    category: "core",
    status: "on leave",
    sources: [sources.aroraPrinceton, sources.aroraPli, sources.aroraCv, sources.tengyuGraduation],
    x: 270,
    y: 175,
    primary: true,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait,
  },
];

export const influenceQueueUsTengyuFinalRelationships: Relationship[] = [
  {
    id: "influence-us-tengyu-final-arora-ma-phd",
    from: "sanjeev-arora-us",
    to: "tengyu-ma-award",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence:
      "Princeton 2018 届官方毕业名录在 Tengyu Ma 的博士论文条目中明确列出 Adviser: Sanjeev Arora；Princeton 的 2019 博士论文奖报道也直接称 Arora 为 Ma 的 thesis adviser。",
    evidenceObject: "Princeton 官方毕业名录与博士论文奖报道",
    source: sources.tengyuGraduation,
    verified: true,
  },
];

export const influenceQueueUsTengyuFinalGroupMembers: GroupMember[] = [
  {
    id: "influence-us-tengyu-final-arora-andrej-risteski",
    teacherId: "sanjeev-arora-us",
    name: "Andrej Risteski",
    role: "Former Princeton PhD student · graduated 2018",
    source: sources.tengyuGraduation,
  },
  {
    id: "influence-us-tengyu-final-arora-wei-hu",
    teacherId: "sanjeev-arora-us",
    name: "Wei Hu",
    role: "Former Princeton PhD student · graduated 2022",
    source: sources.aroraStudents2022,
  },
  {
    id: "influence-us-tengyu-final-arora-orestis-plevrakis",
    teacherId: "sanjeev-arora-us",
    name: "Orestis Plevrakis",
    role: "Former Princeton PhD student · graduated 2022",
    source: sources.aroraStudents2022,
  },
];

export const influenceQueueUsTengyuFinalPlacements: StudentPlacement[] = [];

export const influenceQueueUsTengyuFinalPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "sanjeev-arora-us": portrait,
};

export const influenceQueueUsTengyuFinalPersonEnhancements: Record<string, Partial<Person>> = {
  "tengyu-ma-award": {
    facts: [
      {
        label: "博士导师",
        value: "Princeton 官方毕业名录明确列出 Sanjeev Arora。",
        source: sources.tengyuGraduation,
      },
    ],
    sources: [sources.tengyuGraduation],
    lastVerifiedAt: checkedAt,
  },
};
