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
  sashaChiuThesis: source(
    "Justin T. Chiu · Cornell PhD dissertation",
    "https://ecommons.cornell.edu/server/api/core/bitstreams/a1755206-8236-4d5f-bad6-b5ef6253a65b/content",
    "thesis",
    "The title pages identify Alexander M. Rush as thesis adviser; the acknowledgements call Sasha Rush the author's doctoral adviser.",
  ),
  xiaoAutoXRole: source(
    "AutoX · RoboTaxi",
    "https://www.autox.ai/en/operation.html",
    "company",
    "AutoX identifies Jianxiong Xiao (Professor X) as Founder and CEO.",
  ),
  xiaoAutoXBio: source(
    "AutoX · Technology",
    "https://home.autox.ai/en/technology.html",
    "company",
    "AutoX records his former Princeton professorship, Princeton Computer Vision & Robotics Lab, 3D deep-learning work and MIT CSAIL PhD.",
  ),
  xiaoPrincetonRoster: source(
    "Princeton PIXL · People",
    "https://pixl.cs.princeton.edu/people.php",
    "official",
    "Princeton's PIXL roster lists Jianxiong Xiao under Past Faculty and Shuran Song under Past Graduate Students.",
  ),
  xiaoShuranAdviser: source(
    "Princeton CS · Shuran Song Wins Facebook Fellowship",
    "https://www.cs.princeton.edu/news/shuran-song-wins-facebook-fellowship",
    "official",
    "Princeton explicitly states that PhD student Shuran Song was advised by Professor Jianxiong Xiao.",
  ),
  xiaoPortrait: source(
    "AutoX · CPUC AV Pilot Workshop presentation",
    "https://www.cpuc.ca.gov/-/media/cpuc-website/divisions/consumer-protection-and-enforcement-division/documents/tlab/av-programs/102219-avpilotworkshop-autox.pdf",
    "company",
    "The AutoX presentation's Founder and CEO slide identifies Jianxiong Xiao and supplies the portrait.",
  ),
};

const jianxiongPortrait: NonNullable<Person["portrait"]> = {
  src: "/portraits/influence-final/jianxiong-xiao.png",
  alt: "Jianxiong Xiao",
  source: sources.xiaoPortrait,
};

export const influenceQueueUsFinalPersonEnhancements: Record<string, Partial<Person>> = {
  "sasha-rush-us": {
    sources: [sources.sashaChiuThesis],
    facts: [
      {
        label: "博士培养",
        value: "Cornell 2024 博士论文明确将 Alexander M. Rush（Sasha Rush）列为 Justin T. Chiu 的 thesis adviser。",
        source: sources.sashaChiuThesis,
      },
    ],
    lastVerifiedAt: checkedAt,
  },
};

export const influenceQueueUsFinalPeople: Person[] = [
  {
    id: "jianxiong-xiao-princeton",
    name: "Jianxiong Xiao",
    chinese: "肖健雄",
    role: "AutoX Founder & CEO · former Princeton CS faculty",
    institution: "External",
    actualInstitution: "AutoX · former Princeton University",
    region: "United States",
    area: "Computer Vision · 3D Scene Understanding · Autonomous Driving",
    tags: ["计算机视觉", "3D 场景理解", "自动驾驶", "AutoX", "博士导师"],
    summary: "3D 计算机视觉与自动驾驶研究者，现任 AutoX 创始人兼 CEO，曾任 Princeton CS 教师并创立 Princeton Computer Vision & Robotics Lab；作为 Shuran Song 的博士导师在图谱中保留为师承上游节点。",
    facts: [
      {
        label: "当前任职",
        value: "AutoX 官方页面列其为 Founder & CEO。",
        source: sources.xiaoAutoXRole,
      },
      {
        label: "学术任职",
        value: "曾任 Princeton University 教师；Princeton PIXL 当前名录将其列入 Past Faculty。",
        source: sources.xiaoPrincetonRoster,
      },
      {
        label: "实验室建设",
        value: "AutoX 官方履历记载其创立 Princeton Computer Vision & Robotics Lab。",
        source: sources.xiaoAutoXBio,
      },
      {
        label: "教育与学术训练",
        value: "获 MIT Computer Science and Artificial Intelligence Laboratory 博士学位。",
        source: sources.xiaoAutoXBio,
      },
      {
        label: "研究主线",
        value: "聚焦 3D 深度学习、三维场景理解与自动驾驶。",
        source: sources.xiaoAutoXBio,
      },
      {
        label: "博士培养",
        value: "Princeton CS 官方新闻明确记载其指导 Shuran Song 的博士研究。",
        source: sources.xiaoShuranAdviser,
      },
    ],
    stage: "historical",
    category: "historical",
    status: "产业界现职 · 前 Princeton 教师 · 师承上游",
    sources: [
      sources.xiaoAutoXRole,
      sources.xiaoAutoXBio,
      sources.xiaoPrincetonRoster,
      sources.xiaoShuranAdviser,
      sources.xiaoPortrait,
    ],
    x: 0,
    y: 0,
    primary: false,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait: jianxiongPortrait,
  },
];

export const influenceQueueUsFinalGroupMembers: GroupMember[] = [
  {
    id: "influence-us-final-sasha-rush-justin-chiu",
    teacherId: "sasha-rush-us",
    name: "Justin T. Chiu",
    role: "Former PhD student · Cornell PhD 2024",
    focus: "Natural language understanding · structured state tracking",
    source: sources.sashaChiuThesis,
  },
];

export const influenceQueueUsFinalRelationships: Relationship[] = [
  {
    id: "influence-us-final-jianxiong-shuran-phd",
    from: "jianxiong-xiao-princeton",
    to: "shuran-song-us",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Princeton CS 官方新闻明确记载 Shuran Song 的博士阶段由 Professor Jianxiong Xiao 指导。",
    evidenceObject: "Princeton CS first-party student profile explicitly naming the PhD adviser",
    source: sources.xiaoShuranAdviser,
    verified: true,
  },
];

export const influenceQueueUsFinalPlacements: StudentPlacement[] = [];

export const influenceQueueUsFinalPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "jianxiong-xiao-princeton": jianxiongPortrait,
};

export const influenceQueueUsFinalDeferred = [] as const;

export const enhancements = influenceQueueUsFinalPersonEnhancements;
export const people = influenceQueueUsFinalPeople;
export const relationships = influenceQueueUsFinalRelationships;
export const groupMembers = influenceQueueUsFinalGroupMembers;
export const placements = influenceQueueUsFinalPlacements;
export const portraitMap = influenceQueueUsFinalPortraits;
