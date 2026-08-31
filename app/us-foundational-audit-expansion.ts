import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-30";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const profile = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "profile",
  checkedAt,
  supports,
});

const publication = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "publication",
  checkedAt,
  supports,
});

const company = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "company",
  checkedAt,
  supports,
});

const sources = {
  hintonToronto: official(
    "University of Toronto CS · Faculty directory",
    "https://web.cs.toronto.edu/people/faculty-directory",
    "Geoffrey Hinton's University Professor Emeritus appointment and deep-learning research area",
  ),
  hintonBio: profile(
    "Geoffrey Hinton · Biographical sketch",
    "https://www.cs.toronto.edu/~hinton/bio.html",
    "Academic appointments at Edinburgh, CMU, Toronto and UCL",
  ),
  hintonStudents: profile(
    "Geoffrey Hinton · Former PhD students",
    "https://www.cs.toronto.edu/~hinton/gradstuphd.html",
    "Ruslan Salakhutdinov and Ilya Sutskever as former PhD students, with graduation years",
  ),
  hintonPostdocs: profile(
    "Geoffrey Hinton · Former postdocs",
    "https://www.cs.toronto.edu/~hinton/pages/students/postdocs.html",
    "Yann LeCun and Hugo Larochelle as former postdoctoral researchers",
  ),
  lecunBio: profile(
    "Yann LeCun · Biography",
    "https://yann.lecun.com/ex/bio.html",
    "LeCun's 1987 research-associate period in Geoffrey Hinton's Toronto group",
  ),
  lecunNyu2026: official(
    "NYU Tandon · Yann LeCun 2026 profile",
    "https://engineering.nyu.edu/news/ai-pioneer-yann-lecun-will-address-class-2026-nyu-tandon-commencement",
    "Current Jacob T. Schwartz Professorship and Executive Chairman role at AMI Labs",
  ),
  lecunCourant: official(
    "NYU Courant · Yann LeCun",
    "https://cims.nyu.edu/people/profiles/LECUN_Yann.html",
    "Current NYU appointment, education and research interests",
  ),
  bengioMila: official(
    "Mila · Yoshua Bengio",
    "https://mila.quebec/en/directory/yoshua-bengio?page=0%2C87",
    "Current Université de Montréal professorship, Mila roles and research topics",
  ),
  bengioTransition: official(
    "Mila · Scientific-direction transition",
    "https://mila.quebec/en/news/transition-in-milas-scientific-direction",
    "Bengio's 2025 transition to Founder and Scientific Advisor while remaining a professor and supervisor",
  ),
  hugoMila: official(
    "Mila · Hugo Larochelle",
    "https://mila.quebec/en/directory/hugo-larochelle?page=0%2C0",
    "Current Mila Scientific Director and adjunct university appointments",
  ),
  hugoAppointment: official(
    "Mila · Hugo Larochelle appointed Scientific Director",
    "https://mila.quebec/en/news/hugo-larochelle-becomes-the-new-scientific-director-of-mila",
    "Training under Yoshua Bengio and postdoctoral work under Geoffrey Hinton",
  ),
  ilyaThesis: publication(
    "Ilya Sutskever · University of Toronto PhD thesis",
    "https://www.cs.toronto.edu/~ilya/pubs/ilya_sutskever_phd_thesis.pdf",
    "The thesis acknowledgement explicitly names Geoff Hinton as adviser",
  ),
  ilyaSsi: company(
    "NVIDIA × Safe Superintelligence",
    "https://nvidianews.nvidia.com/news/ilya-sutskevers-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership",
    "Ilya Sutskever as SSI cofounder and CEO as of July 2026",
  ),
  acmTuring: official(
    "ACM · 2018 A.M. Turing Award",
    "https://awards.acm.org/binaries/content/assets/press-releases/2019/march/turing-award-2018.pdf",
    "Joint recognition of Bengio, Hinton and LeCun for foundational deep-learning breakthroughs",
  ),
  ryanPrinceton: official(
    "Princeton CS · Ryan Adams",
    "https://www.cs.princeton.edu/people/profile/rpa",
    "Current Princeton professorship, machine-learning research, AI2 leadership and LIPS group",
  ),
};

/**
 * The Canadian side of this lineage now has canonical records in
 * `canada-expansion.ts`.  This US audit therefore adds only the missing US
 * industry/foundational endpoint and points every cross-region relationship at
 * the canonical Canadian ids.  It deliberately does not clone Hinton, Bengio
 * or Larochelle into the United States region.
 */
export const usFoundationalAuditPeople: Person[] = [
  {
    id: "ryan-adams-us",
    name: "Ryan P. Adams",
    role: "Professor of Computer Science · Associate Chair, Princeton CS",
    institution: "Princeton",
    region: "United States",
    area: "Machine Learning · Probabilistic Models · Bayesian Inference · AI for Science",
    tags: ["机器学习", "概率模型", "贝叶斯推断", "AI for Science", "Hinton 博后", "LIPS"],
    summary: "Princeton 概率机器学习 PI、AI2 联合主任与 LIPS 负责人；曾在 Geoffrey Hinton 组开展博士后研究，并有 Harvard、Twitter 与 Google Brain 经历。",
    facts: [
      { label: "当前任职", value: "Professor · Associate Chair, Princeton Computer Science", source: sources.ryanPrinceton },
      { label: "研究组织", value: "Co-Director, AI2 Initiative · Laboratory for Intelligent Probabilistic Systems", source: sources.ryanPrinceton },
      { label: "博士后谱系", value: "Geoffrey Hinton · University of Toronto", source: sources.hintonPostdocs },
    ],
    stage: "senior",
    category: "core",
    status: "current PI",
    sources: [sources.ryanPrinceton, sources.hintonPostdocs],
    x: 640,
    y: 900,
    primary: true,
    lastVerifiedAt: checkedAt,
  },
  {
    id: "ilya-sutskever-foundational",
    name: "Ilya Sutskever",
    role: "Co-Founder and CEO, Safe Superintelligence",
    institution: "External",
    region: "United States",
    area: "Deep Learning · Sequence Models · AI Safety",
    tags: ["深度学习", "序列模型", "AI 安全", "SSI", "Hinton 学生", "产业研究"],
    summary: "Geoffrey Hinton 的多伦多大学博士生，学术轨迹连接深度学习基础研究、序列建模与当代前沿产业实验室；当前任 SSI 联合创始人兼 CEO。",
    facts: [
      { label: "博士导师", value: "Geoffrey Hinton · University of Toronto", source: sources.ilyaThesis },
      { label: "当前角色", value: "Safe Superintelligence Co-Founder and CEO", source: sources.ilyaSsi },
    ],
    stage: "adjacent",
    category: "adjacent",
    status: "industry research leader",
    sources: [sources.ilyaSsi, sources.hintonStudents, sources.ilyaThesis],
    x: 610,
    y: 2650,
    primary: false,
    lastVerifiedAt: checkedAt,
  },
];

export const usFoundationalAuditPersonEnhancements: Record<string, Partial<Person>> = {
  "geoffrey-hinton-ca": {
    summary: "多伦多大学荣休教授、现代深度学习奠基人物；该节点连接其加拿大—英国—美国学术轨迹，以及 LeCun、Salakhutdinov、Sutskever 和 Larochelle 等关键后继者。",
    facts: [
      { label: "当前学术身份", value: "University Professor Emeritus · University of Toronto", source: sources.hintonToronto },
      { label: "跨地区轨迹", value: "Edinburgh · CMU · Toronto · UCL", source: sources.hintonBio },
      { label: "基础贡献", value: "2018 ACM A.M. Turing Award（与 Yoshua Bengio、Yann LeCun 共同获奖）", source: sources.acmTuring },
    ],
    sources: [sources.hintonToronto, sources.hintonBio, sources.hintonStudents, sources.hintonPostdocs, sources.acmTuring],
    lastVerifiedAt: checkedAt,
  },
  "yoshua-bengio-ca": {
    summary: "蒙特利尔大学教授与 Mila 创始人、科学顾问，现代深度学习奠基人物；2025 年卸任 Mila Scientific Director 后继续指导研究生并聚焦 AI 安全。",
    facts: [
      { label: "当前任职", value: "Université de Montréal Full Professor · Mila Founder and Scientific Advisor", source: sources.bengioMila },
      { label: "领导变化", value: "2025 年由 Scientific Director 转任 Founder and Scientific Advisor", source: sources.bengioTransition },
      { label: "基础贡献", value: "2018 ACM A.M. Turing Award（与 Geoffrey Hinton、Yann LeCun 共同获奖）", source: sources.acmTuring },
    ],
    sources: [sources.bengioMila, sources.bengioTransition, sources.acmTuring],
    lastVerifiedAt: checkedAt,
  },
  "hugo-larochelle-ca": {
    summary: "Mila 现任 Scientific Director，博士阶段师从 Yoshua Bengio，随后在 Geoffrey Hinton 组开展博士后研究，是蒙特利尔与多伦多两条深度学习谱系的关键连接节点。",
    facts: [
      { label: "当前任职", value: "Mila Scientific Director · UdeM and McGill Adjunct Professor", source: sources.hugoMila },
      { label: "博士师承", value: "Yoshua Bengio", source: sources.hugoAppointment },
      { label: "博士后谱系", value: "Geoffrey Hinton · University of Toronto", source: sources.hugoAppointment },
    ],
    sources: [sources.hugoMila, sources.hugoAppointment, sources.hintonPostdocs],
    lastVerifiedAt: checkedAt,
  },
  "yann-lecun-us": {
    role: "Jacob T. Schwartz Professor of Computer Science · Executive Chairman, AMI Labs",
    area: "Deep Learning · Computer Vision · World Models · Autonomous Intelligence",
    tags: ["深度学习", "卷积网络", "计算机视觉", "世界模型", "AMI Labs", "Hinton 博后", "图灵奖"],
    summary: "NYU Jacob T. Schwartz Professor、AMI Labs Executive Chairman，现代卷积网络与深度学习奠基人物；1987 年在 Geoffrey Hinton 的多伦多组开展博士后研究。",
    status: "current PI · academic/industry dual role",
    lastVerifiedAt: checkedAt,
    facts: [
      { label: "当前学术任职", value: "Jacob T. Schwartz Professor · NYU", source: sources.lecunNyu2026 },
      { label: "当前产业角色", value: "Executive Chairman · AMI Labs", source: sources.lecunNyu2026 },
      { label: "博士后谱系", value: "Geoffrey Hinton group · University of Toronto · 1987", source: sources.lecunBio },
      { label: "基础贡献", value: "2018 ACM A.M. Turing Award", source: sources.acmTuring },
    ],
    sources: [sources.lecunNyu2026, sources.lecunCourant, sources.lecunBio, sources.acmTuring],
  },
};

export const usFoundationalAuditRelationships: Relationship[] = [
  {
    id: "foundation-hinton-lecun",
    from: "geoffrey-hinton-ca",
    to: "yann-lecun-us",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导 / Toronto",
    evidence: "Yann LeCun 的本人简介记录其 1987 年加入 Geoffrey Hinton 的 University of Toronto 研究组；Hinton 的 former-postdocs 页面亦列出 Yann LeCun。",
    source: sources.lecunBio,
    verified: true,
    startYear: 1987,
    endYear: 1988,
    evidenceObject: "LeCun biography and Hinton former-postdoc roster",
  },
  {
    id: "foundation-hinton-ryan-adams",
    from: "geoffrey-hinton-ca",
    to: "ryan-adams-us",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导 / Toronto",
    evidence: "Geoffrey Hinton 的本人 former-postdocs 页面列出 Ryan Adams；Princeton 官方简介记录 Adams 在 University of Toronto 的研究经历。",
    source: sources.hintonPostdocs,
    verified: true,
    evidenceObject: "Hinton former-postdoc roster and Princeton faculty biography",
  },
  {
    id: "foundation-hinton-ruslan",
    from: "geoffrey-hinton-ca",
    to: "ruslan-salakhutdinov-us",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Geoffrey Hinton 的 former-PhD-students 页面列 Ruslan Salakhutdinov（2009）及其博士论文题目。",
    source: sources.hintonStudents,
    verified: true,
    endYear: 2009,
    evidenceObject: "Hinton former PhD student roster",
  },
  {
    id: "foundation-hinton-ilya",
    from: "geoffrey-hinton-ca",
    to: "ilya-sutskever-foundational",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Hinton 的学生名录列 Ilya Sutskever（2012）；Sutskever 的博士论文致谢明确称 Geoff Hinton 为 adviser。",
    source: sources.ilyaThesis,
    verified: true,
    endYear: 2012,
    evidenceObject: "University of Toronto PhD thesis and Hinton student roster",
  },
  {
    id: "foundation-hinton-hugo",
    from: "geoffrey-hinton-ca",
    to: "hugo-larochelle-ca",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导",
    evidence: "Mila 官方公告记录 Hugo Larochelle 在 University of Toronto 由 Geoffrey Hinton 指导博士后研究；Hinton 的 former-postdocs 页面亦列出 Larochelle。",
    source: sources.hugoAppointment,
    verified: true,
    evidenceObject: "Mila appointment biography and Hinton former-postdoc roster",
  },
];

export const people = usFoundationalAuditPeople;
export const personEnhancements = usFoundationalAuditPersonEnhancements;
export const relationships = usFoundationalAuditRelationships;
