import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  thesis: source(
    "Azalia Mirhoseini · Rice PhD dissertation",
    "https://www.proquest.com/docview/2001131838",
    "thesis",
    "The 2015 Rice dissertation title page names Farinaz Koushanfar on the approved thesis committee, and its acknowledgements explicitly say 'my advisor Prof. Farinaz Koushanfar'",
  ),
  ucsd: source(
    "UC San Diego Jacobs School · Farinaz Koushanfar",
    "https://jacobs.ucsd.edu/people/profile/farinaz-koushanfar",
    "official",
    "Current UCSD appointment, research scope, MICS leadership and official faculty portrait",
  ),
  bio: source(
    "Farinaz Koushanfar · UCSD-hosted bio and CV",
    "https://farinaz.eng.ucsd.edu/bio-cv",
    "profile",
    "Current endowed-chair appointments, education, named degree advisers, research programme, honours and mentoring impact",
  ),
  students: source(
    "Farinaz Koushanfar · UCSD-hosted lab members",
    "https://farinaz.eng.ucsd.edu/students",
    "profile",
    "First-party current-student and alumni roster, explicitly listing Azalia Mirhoseini as a 2015 PhD alumna and recording alumni destinations",
  ),
};

export const stanfordAzaliaUpstreamPeople: Person[] = [
  {
    id: "farinaz-koushanfar-ucsd",
    name: "Farinaz Koushanfar",
    role: "Siavouche Nemat-Nasser Endowed Chair Professor · MICS Founding Co-director",
    institution: "UCSD",
    region: "United States",
    area: "Secure and Efficient AI · AI for Chip Design · Privacy-Preserving Computing · Hardware Security",
    tags: ["安全 AI", "AI 芯片设计", "隐私计算", "硬件安全", "ML Systems"],
    summary: "UCSD 安全与高效 AI 资深 PI，连接 AI 芯片设计、硬件安全、隐私计算，以及 Rice—UCSD 的跨校培养体系。",
    facts: [
      {
        label: "当前任职",
        value: "UCSD Jacobs School Siavouche Nemat-Nasser Endowed Chair Professor、Henry Booker Scholar Professor，并为 MICS 创始共同主任。",
        source: sources.bio,
      },
      {
        label: "研究主线",
        value: "AI-based design automation、AI/LLM-driven optimization、硬件与系统安全、知识产权保护，以及隐私保护计算。",
        source: sources.bio,
      },
      {
        label: "教育与学术训练",
        value: "UC Berkeley EECS 博士导师为 Alberto Sangiovanni-Vincentelli；Berkeley 机器学习与统计硕士导师为 David Brillinger；UCLA 硕士导师为 Miodrag Potkonjak。",
        source: sources.bio,
      },
      {
        label: "人才培养",
        value: "本人实验室名录列出 Azalia Mirhoseini、Ebrahim Songhori、Bita Rouhani、Mojan Javaheripi 等博士校友，去向覆盖 Stanford、Google DeepMind、NVIDIA、Microsoft AI、Apple 与 Amazon。",
        source: sources.students,
      },
      {
        label: "为什么值得关注",
        value: "其学术网络把 Rice 与 UCSD 的安全计算培养体系连接到 Stanford frontier AI、Google DeepMind 和多家工业研究团队。",
        source: sources.ucsd,
      },
    ],
    stage: "senior",
    category: "core",
    status: "current PI · UCSD official profile verified",
    sources: [sources.ucsd, sources.bio, sources.students],
    x: 735,
    y: 155,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: "portraits/stanford-influence-final-2026/farinaz-koushanfar-ucsd.jpg",
      alt: "Farinaz Koushanfar · official UCSD Jacobs School portrait",
      source: sources.ucsd,
    },
  },
];

export const stanfordAzaliaUpstreamPersonEnhancements: Record<string, Partial<Person>> = {
  "azalia-mirhoseini-stanford": {
    facts: [
      {
        label: "博士师承",
        value: "2015 年 Rice University 博士论文题名为 A Data and Platform-Aware Framework For Large-Scale Machine Learning；论文致谢明确称 Farinaz Koushanfar 为其导师。",
        source: sources.thesis,
      },
    ],
    sources: [sources.thesis],
    lastVerifiedAt: checkedAt,
  },
};

export const stanfordAzaliaUpstreamRelationships: Relationship[] = [
  {
    id: "stanford-final-koushanfar-mirhoseini-phd",
    from: "farinaz-koushanfar-ucsd",
    to: "azalia-mirhoseini-stanford",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Azalia Mirhoseini 的 2015 年 Rice 博士论文批准页列 Farinaz Koushanfar 于委员会首位；致谢进一步明确写道 'my advisor Prof. Farinaz Koushanfar'。",
    evidenceObject: "Rice PhD dissertation title page and acknowledgements",
    source: sources.thesis,
    verified: true,
    endYear: 2015,
  },
];

const member = (slug: string, name: string, role: string): GroupMember => ({
  id: `stanford-final-farinaz-${slug}`,
  teacherId: "farinaz-koushanfar-ucsd",
  name,
  role,
  source: sources.students,
});

export const stanfordAzaliaUpstreamGroupMembers: GroupMember[] = [
  member("pedram-aghazadeh", "Pedram Aghazadeh", "Current PhD student · 2024-present"),
  member("jung-woo-chang", "Jung-Woo Chang", "Current PhD student · 2020-present"),
  member("yaman-el-jandali", "Yaman El Jandali", "Current PhD student · 2023-present"),
];

export const stanfordAzaliaUpstreamPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "farinaz-koushanfar-ucsd": stanfordAzaliaUpstreamPeople[0].portrait!,
};

export const people = stanfordAzaliaUpstreamPeople;
export const enhancements = stanfordAzaliaUpstreamPersonEnhancements;
export const relationships = stanfordAzaliaUpstreamRelationships;
export const groupMembers = stanfordAzaliaUpstreamGroupMembers;
export const portraits = stanfordAzaliaUpstreamPortraits;
