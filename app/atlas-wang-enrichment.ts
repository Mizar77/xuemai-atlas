import type { GroupMember, IndustryPathway, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";

const vitaPi: Source = {
  label: "VITA Group — Zhangyang ‘Atlas’ Wang",
  url: "https://www.vita-group.space/pi",
  kind: "profile",
  checkedAt,
  supports: "Current academic and industry appointments, education, research programme, prior industry work and honours",
};

const vitaTeam: Source = {
  label: "VITA Group — Team and alumni",
  url: "https://www.vita-group.space/team",
  kind: "profile",
  checkedAt,
  supports: "Current group roster and named PhD/postdoctoral alumni destinations",
};

const utOden: Source = {
  label: "UT Austin Oden Institute — Atlas Wang",
  url: "https://oden.utexas.edu/people/directory/Atlas-Wang/",
  kind: "official",
  checkedAt,
  supports: "Tenured UT Austin appointment, affiliations, research themes and selected awards",
};

const uiucThesis: Source = {
  label: "UIUC IDEALS — Task-specific and interpretable feature learning",
  url: "https://www.ideals.illinois.edu/items/98676",
  kind: "thesis",
  checkedAt,
  supports: "2016 UIUC ECE PhD dissertation and Thomas S. Huang as director / adviser",
};

export const atlasWangPersonEnhancements: Record<string, Partial<Person>> = {
  "atlas-wang-us": {
    role: "Temple Foundation Endowed Associate Professor · on leave · Research Director, XTX Markets",
    area: "Efficient & Trustworthy AI · Foundation Models · Reasoning & Agents · Computer Vision",
    stage: "senior",
    status: "UT Austin tenured PI · on leave since May 2024 · full-time industry research leadership",
    summary: "UT Austin 终身副教授、VITA Group 负责人，现休假全职担任 XTX Markets Research Director；其研究从稀疏、低秩与对称性等结构先验延伸到基础模型训练、推理、智能体和可信部署，VITA 校友已持续进入高校与全球主要 AI 实验室。",
    tags: ["高效 AI", "可信 AI", "基础模型", "生成式 AI", "LLM", "Agentic AI", "计算机视觉", "优化", "产业研究领导"],
    knownAlumniCount: 32,
    lastVerifiedAt: checkedAt,
    facts: [
      {
        label: "当前任职",
        value: "自 2024 年 5 月起从 UT Austin 休假，全职担任 XTX Markets Research Director 并领导新的 AI 研究团队；学术岗位为 UT Austin Temple Foundation Endowed Associate Professor。",
        source: vitaPi,
      },
      {
        label: "学术晋升",
        value: "2023 年 9 月晋升为 UT Austin 终身副教授；此前于 2017–2020 年任 Texas A&M University 助理教授。",
        source: vitaPi,
      },
      {
        label: "博士师承",
        value: "2016 年获 UIUC ECE 博士，博士论文《Task-specific and interpretable feature learning》由 Thomas S. Huang 指导。",
        source: uiucThesis,
      },
      {
        label: "研究主线",
        value: "以稀疏、低秩和对称性等低维结构为方法主线，研究预训练、监督微调、强化学习、高效推理与智能体规划，以及机器人、医学和金融中的资源约束与可信部署。",
        source: vitaPi,
      },
      {
        label: "产业研究经历",
        value: "2022–2024 年兼职担任 Picsart Director of AI Research 并领导视频生成式 AI；2021–2022 年任 Amazon Visiting Academic，早期还曾在 Microsoft Research、Adobe Research 与 US Army Research Laboratory 实习。",
        source: vitaPi,
      },
      {
        label: "学术与团队影响",
        value: "获 NSF CAREER、ARO Young Investigator、IEEE AI’s 10 to Watch、Google Research Scholar 等荣誉；VITA 公开名录称其博士与博后校友中已有 10 人进入 tenure-track faculty、22 人进入工业研究岗位。",
        source: utOden,
      },
    ],
    sources: [vitaPi, vitaTeam, utOden, uiucThesis],
  },
};

export const atlasWangRelationships: Relationship[] = [
  {
    id: "thomas-huang-atlas-wang-phd",
    from: "thomas-huang-historical",
    to: "atlas-wang-us",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "UIUC 的博士论文存档将 Thomas S. Huang 列为 Zhangyang Wang 2016 年 ECE 博士论文的 Director / Adviser。",
    evidenceObject: "UIUC ECE PhD dissertation (2016)",
    source: uiucThesis,
    verified: true,
  },
];

export const atlasWangGroupMembers: GroupMember[] = [
  { id: "atlas-hezhen-hu", teacherId: "atlas-wang-us", name: "Hezhen Hu", role: "Postdoctoral Researcher", source: vitaTeam },
  { id: "atlas-sina-alemohammad", teacherId: "atlas-wang-us", name: "Sina Alemohammad", role: "Postdoctoral Researcher", source: vitaTeam },
  { id: "atlas-jianing-zhu", teacherId: "atlas-wang-us", name: "Jianing Zhu", role: "Postdoctoral Researcher", source: vitaTeam },
  { id: "atlas-peihao-wang", teacherId: "atlas-wang-us", name: "Peihao Wang", role: "PhD Student", source: vitaTeam },
  { id: "atlas-tong-wang", teacherId: "atlas-wang-us", name: "Tong Wang", role: "PhD Student", source: vitaTeam },
  { id: "atlas-seo-young-lee", teacherId: "atlas-wang-us", name: "Seo Young Lee", role: "PhD Student", source: vitaTeam },
];

const placement = (
  id: string,
  student: string,
  company: string,
  role: string,
  degree: StudentPlacement["degree"],
  graduationYear: number,
  sector: StudentPlacement["sector"],
  highLevel = false,
): StudentPlacement => ({
  id,
  student,
  teacherId: "atlas-wang-us",
  company,
  role,
  degree,
  graduationYear,
  sector,
  kind: "current",
  highLevel,
  verifiedAt: checkedAt,
  source: vitaTeam,
});

export const atlasWangStudentPlacements: StudentPlacement[] = [
  placement("atlas-ye-yuan-bytedance", "Ye Yuan", "ByteDance", "Research Scientist · Seattle", "PhD", 2021, "industry"),
  placement("atlas-zhenyu-wu-waymo", "Zhenyu Wu", "Waymo", "Research Engineer", "PhD", 2021, "industry"),
  placement("atlas-guoliang-kang-beihang", "Guoliang Kang", "Beihang University", "Full Professor · ECE", "Postdoc", 2022, "academia", true),
  placement("atlas-xiaohan-chen-amazon", "Xiaohan Chen", "Amazon", "Senior Applied Scientist", "PhD", 2022, "industry", true),
  placement("atlas-junru-wu-deepmind", "Junru Wu", "Google DeepMind", "Research Engineer", "PhD", 2022, "industry"),
  placement("atlas-wuyang-chen-sfu", "Wuyang Chen", "Simon Fraser University", "Assistant Professor · Computing Science", "PhD", 2023, "academia", true),
  placement("atlas-tianlong-chen-unc", "Tianlong Chen", "UNC Chapel Hill", "Assistant Professor · Computer Science", "PhD", 2023, "academia", true),
  placement("atlas-yifan-jiang-meta", "Yifan Jiang", "Meta", "Senior Research Scientist · Superintelligence Lab", "PhD", 2024, "industry", true),
  placement("atlas-runjin-chen-anthropic", "Runjin Chen", "Anthropic", "Member of Technical Staff", "PhD", 2025, "industry", true),
  placement("atlas-lanqing-guo-google", "Lanqing Guo", "Google", "Research Scientist", "Postdoc", 2025, "industry"),
  placement("atlas-zhenyu-zhang-xai", "Zhenyu Zhang", "xAI", "Member of Technical Staff", "PhD", 2025, "industry", true),
  placement("atlas-greg-holste-cornell", "Greg Holste", "Cornell Medicine", "Assistant Professor", "PhD", 2025, "academia", true),
  placement("atlas-neel-bhatt-utd", "Neel P Bhatt", "UT Dallas", "Assistant Professor", "Postdoc", 2025, "academia"),
  placement("atlas-ruisi-cai-nvidia", "Ruisi Cai", "NVIDIA", "Research Scientist", "PhD", 2025, "industry"),
  placement("atlas-wenyan-cong-nvidia", "Wenyan Cong", "NVIDIA", "Research Scientist", "PhD", 2026, "industry"),
];

export const atlasWangIndustryPathways: IndustryPathway[] = [
  {
    id: "us-atlas-wang",
    region: "United States",
    kind: "ACADEMIA ↔ INDUSTRY RESEARCH LEADERSHIP",
    title: "Atlas Wang ↔ XTX Markets / Picsart / Amazon",
    description: "VITA 负责人从 UT Austin 休假后全职领导 XTX Markets AI 研究；此前曾任 Picsart Director of AI Research 与 Amazon Visiting Academic，形成从基础研究、生成式 AI 到量化金融部署的连续轨迹。",
    source: vitaPi,
  },
];
