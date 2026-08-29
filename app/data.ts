import { mainlandCommunities, mainlandCoverage, mainlandGroupMembers, mainlandIndustryPathways, mainlandPeople, mainlandRelationships, mainlandStudentPlacements } from "./mainland-data";
import { mainlandEnrichmentGroupMembers, mainlandEnrichmentIndustryPathways, mainlandEnrichmentRelationships, mainlandEnrichmentStudentPlacements, mainlandPersonEnhancements } from "./mainland-enrichment-data";
import { mainlandPhase2Communities, mainlandPhase2Coverage, mainlandPhase2GroupMembers, mainlandPhase2IndustryPathways, mainlandPhase2People, mainlandPhase2Relationships } from "./mainland-phase2-data";
import { usCommunities, usCoverage, usGroupMembers, usIndustryPathways, usPeople, usRelationships, usStudentPlacements } from "./us-data";
import { fourRegionProfileEnhancements, fourRegionProfileGroupMembers, fourRegionProfileRelationships, fourRegionProfileStudentPlacements } from "./profile-enrichment-data";
import { mainlandFullProfileEnhancements, mainlandFullProfileGroupMembers, mainlandFullProfileRelationships, mainlandFullProfileStudentPlacements } from "./mainland-full-profile-enrichment";
import { usFullProfileEnhancements, usFullProfileGroupMembers, usFullProfileRelationships, usFullProfileStudentPlacements } from "./us-full-profile-enrichment";
import { sgHkFullProfileEnhancements, sgHkFullProfileGroupMembers, sgHkFullProfileRelationships, sgHkFullProfileStudentPlacements } from "./sg-hk-full-profile-enrichment";
import { mainlandFullProfileEnhancements2, mainlandFullProfileGroupMembers2, mainlandFullProfileRelationships2, mainlandFullProfileStudentPlacements2 } from "./mainland-full-profile-enrichment-2";
import { mainlandFullProfileEnhancements3, mainlandFullProfileGroupMembers3, mainlandFullProfileRelationships3, mainlandFullProfileStudentPlacements3 } from "./mainland-full-profile-enrichment-3";
import { mainlandAiCvGroupMembers, mainlandAiCvPeople, mainlandAiCvPlacements, mainlandAiCvRelationships } from "./mainland-ai-cv-expansion";
import { hkSgAiCvExpansionGroupMembers, hkSgAiCvExpansionPeople, hkSgAiCvExpansionPlacements, hkSgAiCvExpansionRelationships } from "./hk-sg-ai-cv-expansion";
import { usAiCvExpansionGroupMembers, usAiCvExpansionPeople, usAiCvExpansionPlacements, usAiCvExpansionRelationships } from "./us-ai-cv-expansion";
import { systematicRosterGroupMembers, systematicRosterPeople, systematicRosterPlacements, systematicRosterRelationships } from "./systematic-roster-expansion";
import { hkSgPortraits } from "./portrait-data-hk-sg";
import { hkSgMissingPortraits } from "./portrait-data-hk-sg-missing";
import { mainlandPortraits } from "./portrait-data-mainland";
import { mainlandFillAPortraits } from "./portrait-data-mainland-fill-a";
import { mainlandFillBPortraits } from "./portrait-data-mainland-fill-b";
import { mainlandMissingPortraits } from "./portrait-data-mainland-missing";
import { usPortraits } from "./portrait-data-us";
import { systematicRosterPortraits } from "./portrait-data-systematic-roster";

export type Source = {
  label: string;
  url: string;
  kind: "official" | "self_submitted" | "cv" | "thesis" | "profile" | "publication" | "company";
  /** Date represented by the source, when the page itself makes this explicit. */
  asOf?: string;
  /** Date when this source was last checked by the atlas. */
  checkedAt?: string;
  /** The exact field or statement supported by this source. */
  supports?: string;
};

export const dataSnapshotDate = "2026-08-28";

export type Region = "Singapore" | "Hong Kong" | "Mainland China" | "United States";
export type Institution = "NUS" | "NTU" | "SUTD" | "SMU" | "A*STAR" | "HKU" | "HKUST" | "CUHK" | "CityU" | "PolyU" | "HKBU" | "THU" | "PKU" | "FDU" | "RUC" | "HIT" | "CAS-IA" | "NJU" | "SJTU" | "ZJU" | "USTC" | "BIT" | "BUAA" | "BUPT" | "XJTU" | "SYSU" | "ECNU" | "WHU" | "Stanford" | "Berkeley" | "CMU" | "UW" | "MIT" | "Princeton" | "Cornell" | "NYU" | "Columbia" | "UMass" | "JHU" | "UT Austin" | "UMich" | "UIUC" | "Georgia Tech" | "UCLA" | "UCSD" | "External";
export type Stage = "senior" | "emerging" | "institute" | "adjacent" | "historical";
export type Category = "core" | "adjacent" | "historical";

export type Person = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Institution;
  region?: Region;
  area: string;
  tags: string[];
  summary: string;
  facts?: { label: string; value: string; source?: Source }[];
  stage: Stage;
  category: Category;
  status?: string;
  sources: Source[];
  x: number;
  y: number;
  primary?: boolean;
  /** Most recent field-level review date. Kept optional so missing review data stays visible. */
  lastVerifiedAt?: string;
  /** Known alumni denominator from a public roster; placements may cover only a subset. */
  knownAlumniCount?: number;
  /** Locally stored portrait copied from a public faculty/profile page. */
  portrait?: {
    src: string;
    alt: string;
    source: Source;
  };
};

export type IndustryPathway = {
  id: string;
  region: Region;
  kind: string;
  title: string;
  description: string;
  source: Source;
};

export const regionalInstitutions: Record<Region, Institution[]> = {
  Singapore: ["NUS", "NTU", "SUTD", "SMU", "A*STAR"],
  "Hong Kong": ["HKU", "HKUST", "CUHK", "CityU", "PolyU", "HKBU"],
  "Mainland China": ["THU", "PKU", "FDU", "RUC", "HIT", "CAS-IA", "NJU", "SJTU", "ZJU", "USTC", "BIT", "BUAA", "BUPT", "XJTU", "SYSU", "ECNU", "WHU"],
  "United States": ["Stanford", "Berkeley", "CMU", "UW", "MIT", "Princeton", "Cornell", "NYU", "Columbia", "UMass", "JHU", "UT Austin", "UMich", "UIUC", "Georgia Tech", "UCLA", "UCSD"],
};

export function regionOf(person: Person): Region {
  return person.region ?? "Singapore";
}

export type Relationship = {
  id: string;
  from: string;
  to: string;
  type: "lineage" | "collaboration" | "industry" | "talent";
  label: string;
  evidence: string;
  source: Source;
  verified: boolean;
  subtype?: "phd_adviser" | "co_adviser" | "postdoc_mentor" | "sustained_collaboration" | "publication" | "joint_project" | "joint_lab" | "industry_affiliation" | "career_movement" | "other";
  startYear?: number;
  endYear?: number;
  recentYear?: number;
  evidenceObject?: string;
};

export type RelationshipSubtype = NonNullable<Relationship["subtype"]>;

export const relationshipSubtypeLabels: Record<RelationshipSubtype, string> = {
  phd_adviser: "博士导师",
  co_adviser: "共同导师",
  postdoc_mentor: "博士后指导",
  sustained_collaboration: "长期研究合作",
  publication: "论文合作",
  joint_project: "共同项目",
  joint_lab: "联合实验室",
  industry_affiliation: "产业任职 / 创业",
  career_movement: "人才流动",
  other: "其他已核验关系",
};

/** Normalize explicit labels without inventing a relationship that is not already sourced. */
export function relationshipSubtypeOf(relationship: Relationship): RelationshipSubtype {
  if (relationship.subtype) return relationship.subtype;
  const label = `${relationship.label} ${relationship.evidence}`.toLowerCase();
  if (label.includes("共同博士导师") || label.includes("共同导师") || label.includes("共同指导")) return "co_adviser";
  if (label.includes("博士后")) return "postdoc_mentor";
  if (label.includes("博士导师") || label.includes("academic advisor") || label.includes("advisor")) return "phd_adviser";
  if (label.includes("joint lab") || label.includes("联合实验室")) return "joint_lab";
  if (label.includes("共同项目") || label.includes("项目合作") || label.includes("challenge")) return "joint_project";
  if (relationship.type === "industry") return "industry_affiliation";
  if (relationship.type === "talent") return "career_movement";
  if (label.includes("论文") || label.includes("共同署名") || label.includes("publication")) return "publication";
  if (relationship.type === "collaboration") return "sustained_collaboration";
  return "other";
}

export type StudentPlacement = {
  id: string;
  student: string;
  teacherId: string;
  company: string;
  department?: string;
  role: string;
  kind: "current" | "first_job" | "founder" | "reported" | "internship";
  highLevel?: boolean;
  note?: string;
  source: Source;
  degree?: "PhD" | "Master" | "Bachelor" | "Postdoc" | "Unknown";
  graduationYear?: number;
  firstJob?: string;
  currentRole?: string;
  coAdvisers?: string[];
  verifiedAt?: string;
  /** Career destination category. When omitted, placementSectorOf applies the public, deterministic rules below. */
  sector?: PlacementSector;
};

export type PlacementSector = "academia" | "industry" | "startup" | "postdoc" | "other";

export const placementSectorLabels: Record<PlacementSector, string> = {
  academia: "学术界",
  industry: "工业界",
  startup: "创业",
  postdoc: "博后",
  other: "其他去向",
};

const academicDestinationPattern = /(?:University|大学|College|Stanford CRFM|^MIT$|^SUTD$)/i;
const otherResearchDestinationPattern = /^(?:A\*STAR|BAAI|Shanghai AI Laboratory|AI2)$/i;

/**
 * Classify only from explicit destination/role fields. The fallback is industry
 * because the placement collection was originally company-centred; ambiguous
 * public and non-profit research institutes are kept in "other".
 */
export function placementSectorOf(placement: StudentPlacement): PlacementSector {
  if (placement.sector) return placement.sector;
  const role = `${placement.role} ${placement.firstJob ?? ""} ${placement.currentRole ?? ""}`;
  if (placement.kind === "founder" || /\b(?:co-?founder|founder)\b/i.test(role)) return "startup";
  if (placement.degree === "Postdoc" || /\bpost-?doctoral\b|\bpostdoc\b|博士后/i.test(role)) return "postdoc";
  if (academicDestinationPattern.test(placement.company) || /\b(?:faculty|professor)\b/i.test(role)) return "academia";
  if (otherResearchDestinationPattern.test(placement.company)) return "other";
  return "industry";
}

export type GroupMember = {
  id: string;
  teacherId: string;
  name: string;
  role: string;
  focus?: string;
  source: Source;
};

export const stageLabels: Record<Stage, string> = {
  senior: "资深 PI",
  emerging: "发展期独立 PI",
  institute: "研究院 PI",
  adjacent: "交叉 AI PI",
  historical: "历史 / 跨地区",
};

const basePeople: Person[] = [
  {
    id: "hwee-tou-ng", name: "Hwee Tou Ng", role: "Provost’s Chair Professor", institution: "NUS",
    area: "Natural Language Processing", tags: ["NLP", "语法纠错", "ACL Fellow"], stage: "senior", category: "core",
    summary: "NUS NLP Group 负责人之一，长期研究自然语言处理与语法纠错；学生与校友公开去向包括 NTU（Wei Lu）、SAP Singapore、Meta/Facebook、Citi、Raytheon BBN 与 Machine Zone。",
    sources: [
      { label: "NUS 个人主页", url: "https://www.comp.nus.edu.sg/~nght/", kind: "official" },
      { label: "NUS NLP Group alumni", url: "https://www.comp.nus.edu.sg/~nlp/people.html", kind: "official" },
    ], x: 130, y: 155, primary: true,
  },
  {
    id: "min-yen-kan", name: "Min-Yen Kan", chinese: "靳民彦", role: "Associate Professor · Vice Dean", institution: "NUS",
    area: "NLP · IR · Scholarly Communication", tags: ["NLP", "RAG", "数字图书馆", "LLM Safety"], stage: "senior", category: "core",
    summary: "WING.NUS 负责人，覆盖科学文献理解、检索、RAG 与大模型安全伦理。",
    sources: [
      { label: "NUS 主页", url: "https://www.comp.nus.edu.sg/~kanmy/index.html", kind: "official" },
      { label: "个人 CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" },
    ], x: 305, y: 155, primary: true,
  },
  {
    id: "tat-seng-chua", name: "Tat-Seng Chua", chinese: "蔡达成", role: "KITHCT Chair Professor · NExT Director", institution: "NUS",
    area: "Multimodal Foundation Models · Search", tags: ["多模态基础模型", "对话搜索", "Responsible AI", "创业"], stage: "senior", category: "core",
    summary: "NExT 中心负责人，研究多模态基础模型、可信 AI 与对话搜索；共同创办视觉搜索公司 ViSenze 与大数据智能公司 6Estates，并推动 Sea–NExT Joint Lab。个人主页记录自 2004 年以来指导 37 名博士生。",
    sources: [
      { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/chuats/", kind: "official" },
      { label: "个人主页（中文名、学生与创业）", url: "https://www.chuatatseng.com/", kind: "profile" },
      { label: "NUS Research Recognition", url: "https://www.nus.edu.sg/docs/default-source/universityawards/2022/chua-tat-seng.pdf", kind: "official" },
    ],
    x: 130, y: 275, primary: true, knownAlumniCount: 37,
  },
  {
    id: "qizhe-shieh", name: "Michael Qizhe Shieh", role: "Assistant Professor", institution: "NUS",
    area: "Large Language Models · Deep Learning", tags: ["LLM", "NLP", "推理", "Google DeepMind"], stage: "emerging", category: "core",
    summary: "发展期独立 PI，研究 LLM 架构、训练与推理；加入 NUS 前曾在 Google DeepMind / Google Brain 从事研究。",
    sources: [{ label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/mshieh/", kind: "official" }],
    x: 305, y: 275, primary: true,
  },
  {
    id: "kenji-kawaguchi", name: "Kenji Kawaguchi", role: "Presidential Young Professor", institution: "NUS",
    area: "Deep Learning Theory · LLM", tags: ["LLM", "深度学习理论", "Sea AI Lab"], stage: "adjacent", category: "adjacent",
    summary: "从深度学习理论切入 LLM 的独立 PI；与 Sea AI Lab 有公开论文合作。",
    sources: [{ label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/kenji/", kind: "official" }],
    x: 130, y: 395, primary: true,
  },
  {
    id: "jiancong-xiao", name: "Jiancong Xiao", role: "Tenure-track Assistant Professor", institution: "NUS",
    area: "Trustworthy ML · LLM Foundations", tags: ["LLM 对齐", "后训练", "学习理论", "2026 新 PI"], stage: "emerging", category: "adjacent",
    summary: "2026 年加入 NUS 的新独立 PI，研究 LLM 对齐、微调、后训练与算法偏差的理论基础。",
    sources: [{ label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/xiaojc/", kind: "official" }],
    x: 305, y: 395, primary: true,
  },
  {
    id: "yang-you", name: "Yang You", role: "Presidential Young Professor", institution: "NUS",
    area: "Foundation Model Systems · HPC", tags: ["LLM Systems", "分布式训练", "基础模型"], stage: "adjacent", category: "adjacent",
    summary: "HPC-AI Lab PI，重点是基础模型训练、优化器和大规模系统；属于语言模型系统相邻层。",
    sources: [
      { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/youy/", kind: "official" },
      { label: "Google Research Award", url: "https://www.comp.nus.edu.sg/bytes/nus-presidential-young-professor-yang-you-wins-google-research-award-to-build-foundations-for-next-generation-ai/", kind: "official" },
    ], x: 130, y: 515, primary: true,
  },
  {
    id: "bryan-hooi", name: "Bryan Hooi", role: "Assistant Professor · School of Computing & Institute of Data Science", institution: "NUS",
    area: "Trustworthy AI · Graph ML · LLM/VLM Safety", tags: ["可信 AI", "图机器学习", "LLM / VLM Safety", "AI Agents", "异常检测"], stage: "adjacent", category: "adjacent",
    summary: "NUS 计算机学院与数据科学研究院独立 PI。传统主线是图机器学习、异常检测与可信机器学习，近年持续研究 LLM/VLM 的事实性、置信度、幻觉与安全，以及 LLM agents 和图基础模型；因此列入 AI/ML 相邻层，而非传统核心 NLP。",
    facts: [
      { label: "博士师承", value: "CMU Machine Learning PhD · Christos Faloutsos", source: { label: "Bryan Hooi 主页", url: "https://bhooi.github.io/", kind: "profile" } },
      { label: "当前任职", value: "NUS School of Computing + Institute of Data Science", source: { label: "Bryan Hooi 主页", url: "https://bhooi.github.io/", kind: "profile" } },
      { label: "官方研究领域", value: "Artificial Intelligence · Database", source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/bhooi/", kind: "official" } },
      { label: "近年语言模型方向", value: "LLM/VLM reliability, safety, agents and graph foundation models", source: { label: "Bryan Hooi publications", url: "https://bhooi.github.io/", kind: "profile" } },
    ],
    sources: [
      { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/bhooi/", kind: "official" },
      { label: "Bryan Hooi 个人主页", url: "https://bhooi.github.io/", kind: "profile" },
      { label: "NUS AI Lab People", url: "https://nusail.comp.nus.edu.sg/people/index.html", kind: "official" },
    ], x: 305, y: 515, primary: true,
  },

  {
    id: "shafiq-joty", name: "Shafiq Joty", role: "Senior Research Director, Salesforce AI Research · NTU Associate Professor on leave", institution: "NTU",
    area: "Multilingual & Robust NLP · LLM", tags: ["多语言 NLP", "LLM", "Salesforce Research", "联合任职"], stage: "senior", category: "core",
    summary: "Salesforce AI Research 高级研究总监、NTU 长期休假中的副教授；曾创建 Salesforce Research Asia 新加坡团队。学生去向横跨 Salesforce、Apple、AWS、GIC、SAP、Huawei 与 A*STAR。",
    sources: [
      { label: "NTU EMNLP 2024 公告", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing", kind: "official" },
      { label: "NTU AI Faculty", url: "https://www.ntu.edu.sg/computing/ai-at-ntu/ai-faculty", kind: "official" },
      { label: "学生与校友去向", url: "https://raihanjoty.github.io/students.html", kind: "profile" },
    ], x: 485, y: 155, primary: true,
  },
  {
    id: "aixin-sun", name: "Aixin Sun", chinese: "孙爱欣", role: "Associate Professor · Associate Dean", institution: "NTU",
    area: "IR · Recommender Systems · NLP", tags: ["IR", "推荐系统", "NLP"], stage: "senior", category: "core",
    summary: "横跨信息检索、推荐系统与自然语言处理的资深 PI。",
    sources: [{ label: "NTU Biography", url: "https://www3.ntu.edu.sg/home/AXSun/bio.html", kind: "official" }],
    x: 660, y: 155, primary: true,
  },
  {
    id: "anh-tuan-luu", name: "Anh Tuan Luu", role: "Associate Professor", institution: "NTU",
    area: "LLM · Trustworthy AI · NLP", tags: ["LLM", "可信 AI", "图神经网络", "NLP 应用"], stage: "senior", category: "core",
    summary: "研究 LLM、可信 AI、图神经网络与 NLP 应用，NTU 生成式 AI 研究的重要 PI。",
    sources: [{ label: "NTU GrAIL Profile", url: "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people", kind: "official" }],
    x: 485, y: 275, primary: true,
  },
  {
    id: "wenya-wang", name: "Wenya Wang", role: "Assistant Professor", institution: "NTU",
    area: "Generative Language Intelligence", tags: ["LLM 推理", "可解释性", "多模态", "GLINT Lab"], stage: "emerging", category: "core",
    summary: "GLINT Lab 独立 PI，聚焦生成式模型推理、可解释性、可信性与高效学习。",
    sources: [{ label: "NTU 个人主页", url: "https://personal.ntu.edu.sg/wangwy/", kind: "official" }],
    x: 660, y: 275, primary: true,
  },
  {
    id: "erik-cambria", name: "Erik Cambria", role: "Provost Chair · Professor of AI", institution: "NTU",
    area: "Affective & Neurosymbolic NLP", tags: ["情感计算", "神经符号 AI", "创业"], stage: "senior", category: "core",
    summary: "Sentic Computing 代表性学者，连接情感计算、神经符号 NLP 与创业实践。",
    sources: [{ label: "NTU Multi-Net Lab", url: "https://blogs.ntu.edu.sg/multi-net-lab/erik-cambria-5/", kind: "official" }],
    x: 485, y: 395, primary: true,
  },
  {
    id: "bo-an", name: "Bo An", chinese: "安波", role: "President’s Chair Professor · Head, AI Division · Director, Centre of AI-for-X", institution: "NTU",
    area: "Multi-agent Systems · Computational Game Theory · RL · LLM Agents", tags: ["多智能体系统", "计算博弈", "强化学习", "LLM Agents", "AAAI Fellow", "IJCAI 2027 Program Chair"], stage: "senior", category: "adjacent",
    summary: "NTU 校长讲席教授、人工智能系主任与 Centre of AI-for-X 主任，AAAI Fellow、IJCAI 2027 Program Chair、IEEE Intelligent Systems 主编。研究从多智能体系统、计算博弈与强化学习延伸到 LLM-powered agents；安全博弈成果曾部署于美国联邦空警、海岸警卫队及野生动物保护场景。",
    sources: [
      { label: "Bo An 个人主页", url: "https://personal.ntu.edu.sg/boan/", kind: "official" },
      { label: "Bo An 学术履历", url: "https://personal.ntu.edu.sg/boan/CV-BOAN.pdf", kind: "cv" },
      { label: "NTU AI Faculty", url: "https://www.ntu.edu.sg/computing/ai-at-ntu/ai-faculty", kind: "official" },
      { label: "NTU 中文师资页", url: "https://www.ntu.edu.sg/business/admissions/china-programmes-cn/embac", kind: "official" },
    ],
    x: 660, y: 395, primary: true,
  },

  {
    id: "wei-lu", name: "Wei Lu", chinese: "陆伟", role: "Professor", institution: "NTU",
    area: "NLP · Modern Language Models", tags: ["NLP", "语言模型", "结构化预测", "Alibaba"], stage: "senior", category: "core",
    summary: "2025 年 9 月加入 NTU，此前在 SUTD 任职 12 年；是 Hwee Tou Ng 的博士生。其公开学生去向包括 Tencent、Salesforce、Huawei、Alibaba、ByteDance、JD 与 A*STAR。",
    sources: [
      { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/esd/profile/lu-wei/", kind: "official" },
      { label: "NUS NLP Group alumni", url: "https://www.comp.nus.edu.sg/~nlp/people.html", kind: "official" },
      { label: "NTU 2025 新教师", url: "https://www.ntu.edu.sg/computing/our-faculty/new-faculty-at-ccds-%282025%29", kind: "official" },
    ], x: 485, y: 515, primary: true,
  },
  {
    id: "soujanya-poria", name: "Soujanya Poria", role: "Associate Professor · School of EEE", institution: "NTU",
    area: "Multimodal Conversational AI", tags: ["多模态 NLP", "情感计算", "对话", "DeCLaRe Lab"], stage: "emerging", category: "core",
    summary: "DeCLaRe Lab 负责人，研究多模态对话、情感与常识；2025 年转任 NTU EEE 副教授，此前任职 SUTD。",
    sources: [
      { label: "SUTD Research Story", url: "https://www.sutd.edu.sg/stories-listing/summary-of-dr-porias-research-statement-on-multimodal-ai-and-nlp/", kind: "official" },
      { label: "SUTD Chair Appointment", url: "https://www.sutd.edu.sg/achievements-listing/congratulations-to-professor-tony-quek-and-assistant-professor-soujanya-poria-for-their-chair-professorships-appointment/", kind: "official" },
      { label: "NTU EEE Faculty", url: "https://www.ntu.edu.sg/eee/faculty", kind: "official" },
    ], x: 660, y: 515, primary: true,
  },
  {
    id: "wenxuan-zhang", name: "Wenxuan Zhang", role: "Tenure-track Assistant Professor · iNLP Lab", institution: "SUTD",
    area: "LLM · Audio-Language · Agents", tags: ["SeaLLMs", "LLM Agents", "多语言", "NRF Fellow", "Alibaba"], stage: "emerging", category: "core",
    summary: "iNLP Lab 独立 PI、2026 NRF Fellow；此前任 Alibaba Singapore 研究科学家，研究多语言、多模态与智能体。",
    sources: [
      { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/profile/zhang-wenxuan", kind: "official" },
      { label: "Research & Grants", url: "https://isakzhang.github.io/research.html", kind: "profile" },
    ], x: 965, y: 165, primary: true,
  },

  {
    id: "yang-deng", name: "Yang Deng", chinese: "邓扬", role: "Assistant Professor · CHAT NLP Group", institution: "SMU",
    area: "Conversational · Agentic · Trustworthy NLP", tags: ["对话", "Agentic AI", "LLM", "Google Research Award"], stage: "emerging", category: "core",
    summary: "CHAT NLP Group 独立 PI，研究对话、人本、智能体与可信 NLP；博士后阶段在 NUS NExT++。",
    sources: [
      { label: "SMU Faculty Profile", url: "https://faculty.smu.edu.sg/profile/deng-yang-7801", kind: "official" },
      { label: "CHAT NLP Group", url: "https://dengyang17.github.io/", kind: "profile" },
    ], x: 875, y: 355, primary: true,
  },
  {
    id: "yunshan-ma", name: "Yunshan Ma", role: "Assistant Professor", institution: "SMU",
    area: "Recommender Systems · LLM", tags: ["推荐系统", "LLM", "数据挖掘"], stage: "emerging", category: "core",
    summary: "新独立 PI，研究推荐系统、数据挖掘与大模型增强推荐；博士毕业于 NUS。",
    sources: [{ label: "SMU Faculty Profile", url: "https://faculty.smu.edu.sg/profile/ma-yunshan-7956", kind: "official" }],
    x: 1040, y: 355, primary: true,
  },
  {
    id: "jing-jiang", name: "Jing Jiang", role: "Professor · SMU on leave / ANU current", institution: "SMU",
    area: "Applied NLP · Information Extraction", tags: ["NLP", "信息抽取", "跨地区流动"], stage: "historical", category: "historical",
    summary: "SMU NLP 的历史关键节点；目前公开资料显示在 ANU 任职并于 SMU 休假，因此不计入当前新加坡核心 PI。",
    status: "历史 / 跨地区节点，不计入当前核心 PI 数",
    sources: [{ label: "SMU Faculty Directory", url: "https://faculty.smu.edu.sg/profile/jing-jiang-636", kind: "official" }],
    x: 960, y: 460, primary: true,
  },

  {
    id: "nancy-chen", name: "Nancy Chen", role: "Senior Principal Scientist · Lead PI", institution: "A*STAR",
    area: "Speech · Conversational AI", tags: ["语音", "对话系统", "生成式 AI", "产业转化"], stage: "institute", category: "core",
    summary: "A*STAR I²R Lead PI，覆盖语音、对话、多语言与社会化 AI，团队成果已有商业 spin-off 和政府部署。",
    sources: [{ label: "A*STAR I²R Profile", url: "https://www.a-star.edu.sg/i2r/i2r-profiles/nancychen", kind: "official" }],
    x: 540, y: 720, primary: true,
  },
  {
    id: "ai-ti-aw", name: "Ai Ti Aw", role: "Head · Aural & Language Intelligence", institution: "A*STAR",
    area: "Machine Translation · Southeast Asian NLP", tags: ["机器翻译", "东南亚语言", "MERaLiON", "National Multimodal LLM"], stage: "institute", category: "core",
    summary: "A*STAR I²R 语言智能部门负责人，长期建设本地与东南亚语言技术，并共同领导国家多模态 LLM 计划。",
    sources: [{ label: "A*STAR Research Profile", url: "https://research.a-star.edu.sg/researcher/aiti-aw/", kind: "official" }],
    x: 720, y: 720, primary: true,
  },
  {
    id: "jian-su", name: "Jian Su", role: "Principal Scientist · NLP Group Leader", institution: "A*STAR",
    area: "NLP · Large-scale Deployment", tags: ["NLP", "Baidu-I²R", "技术部署", "研究院 PI"], stage: "institute", category: "core",
    summary: "A*STAR I²R NLP Group 负责人，并任 Baidu-I²R Research Centre 联合主任，连接国际合作与大规模部署。",
    sources: [{ label: "A*STAR Research Profile", url: "https://research.a-star.edu.sg/researcher/jian-su/", kind: "official" }],
    x: 900, y: 720, primary: true,
  },

  // Hong Kong · HKU
  {
    id: "lingpeng-kong", name: "Lingpeng Kong", chinese: "孔令鹏", role: "Assistant Professor", institution: "HKU", region: "Hong Kong",
    area: "NLP · Structured Prediction · Language Models", tags: ["NLP", "结构化预测", "语言模型", "Google DeepMind"], stage: "senior", category: "core",
    summary: "HKU NLP Group 的核心 PI，研究结构化语言建模、表示学习与生成；加入 HKU 前在 Google DeepMind 任 Research Scientist / Senior Research Scientist。博士阶段由 Noah Smith 与 Chris Dyer 共同指导。",
    sources: [{ label: "HKU Faculty Profile", url: "https://ai.hku.hk/people/academic-staff/lpk", kind: "official" }, { label: "HKU LawTech Profile", url: "https://www.lawtech.hku.hk/people/lingpeng-kong/", kind: "official" }],
    portrait: { src: "portraits/lingpeng-kong.jpg", alt: "Lingpeng Kong", source: { label: "HKU Faculty Profile portrait", url: "https://ai.hku.hk/people/academic-staff/lpk", kind: "official" } },
    x: 120, y: 165, primary: true,
  },
  {
    id: "tao-yu", name: "Tao Yu", chinese: "余涛", role: "Assistant Professor · XLANG Lab Director", institution: "HKU", region: "Hong Kong",
    area: "LLM Reasoning · Agents · Text-to-SQL", tags: ["LLM", "智能体", "Text-to-SQL", "对话式数据接口"], stage: "emerging", category: "core",
    summary: "XLANG Lab 负责人、HKU NLP Group 联合负责人，研究长程推理与规划、自然语言数据接口和 Text-to-SQL；博士毕业于 Yale，导师为 Dragomir Radev。",
    sources: [{ label: "HKU IDS Profile", url: "https://datascience.hku.hk/people/tao-yu/", kind: "official" }, { label: "Tao Yu 个人主页", url: "https://taoyds.github.io/", kind: "profile" }],
    portrait: { src: "portraits/tao-yu.jpg", alt: "Tao Yu", source: { label: "HKU IDS Profile portrait", url: "https://datascience.hku.hk/people/tao-yu/", kind: "official" } },
    x: 280, y: 165, primary: true,
  },
  {
    id: "qi-liu-hku", name: "Qi Liu", role: "Assistant Professor · FinTech Programme Director", institution: "HKU", region: "Hong Kong",
    area: "NLP · Language Models · FinTech", tags: ["NLP", "LLM", "对话", "DeepMind", "FAIR", "MSR"], stage: "emerging", category: "core",
    summary: "研究语言模型、对话与自然语言处理；加入 HKU 前曾在 Google DeepMind、Facebook AI Research 和 Microsoft Research 工作，当前还延伸到自然语言—形式语言统一推理。",
    sources: [{ label: "HKU Faculty Profile", url: "https://www.ai.hku.hk/people/academic-staff/liuqi", kind: "official" }, { label: "HKU 人物报道", url: "https://www.cs.hku.hk/news-events/news-and-announcements/20230525_qliu_forbes-under30_asia_2023", kind: "official" }],
    portrait: { src: "portraits/qi-liu.jpg", alt: "Qi Liu", source: { label: "HKU Faculty Profile portrait", url: "https://www.ai.hku.hk/people/academic-staff/liuqi", kind: "official" } },
    x: 120, y: 295, primary: true,
  },
  {
    id: "chao-huang-hku", name: "Chao Huang", role: "Assistant Professor · IDS Scholar", institution: "HKU", region: "Hong Kong",
    area: "Recommendation · Graph Learning · LLM Agents", tags: ["推荐系统", "图学习", "Agentic AI", "Auto-Deep-Research"], stage: "emerging", category: "adjacent",
    summary: "数据挖掘、推荐与图学习独立 PI；近年团队构建开放式 Auto-Deep-Research 智能体，并开展 LLM 增强推荐和面向长者的 agentic foundation model。",
    sources: [{ label: "HKU Faculty Profile", url: "https://www.ai.hku.hk/people/academic-staff/chuang", kind: "official" }, { label: "HKU Auto-Deep-Research", url: "https://ai.hku.hk/news-events/news-and-announcements/20250307-chao", kind: "official" }],
    x: 280, y: 295, primary: true,
  },

  // Hong Kong · HKUST
  {
    id: "pascale-fung", name: "Pascale Fung", chinese: "馮雁", role: "Chair Professor · CAiRE Director", institution: "HKUST", region: "Hong Kong",
    area: "Conversational AI · Multilingual NLP · Responsible AI", tags: ["对话 AI", "多语言 NLP", "语音", "ACL Fellow", "AAAI Fellow"], stage: "senior", category: "core",
    summary: "HKUST Human Language Technology Center 创始成员、Center for AI Research 主任；长期研究跨语言处理、机器翻译、语音、情感与负责任 AI。早年曾在 AT&T/Bell Labs 与 BBN 工作。",
    sources: [{ label: "HKUST ECE Profile", url: "https://ece.hkust.edu.hk/pascale", kind: "official" }, { label: "HKUST ACL Fellow 公告", url: "https://ece.hkust.edu.hk/news/prof-pascale-fung-has-been-elected-association-computational-linguistics-acl-fellow-2020", kind: "official" }],
    x: 445, y: 165, primary: true,
  },
  {
    id: "de-kai", name: "De Kai", chinese: "吳德愷", role: "Professor of Engineering Education · AI Education Ambassador", institution: "HKUST", region: "Hong Kong",
    area: "Computational Linguistics · Machine Translation", tags: ["计算语言学", "机器翻译", "中文 NLP", "AI Ethics"], stage: "senior", category: "core",
    summary: "1992 年加入 HKUST，是香港中文 NLP 与统计机器翻译的早期关键节点；研究计算语言学、机器翻译、语言与音乐技术，并长期参与 AI 伦理教育。",
    sources: [{ label: "HKUST Faculty Profile", url: "https://cse.hkust.edu.hk/admin/people/faculty/profile/dekai", kind: "official" }, { label: "De Kai Research Page", url: "https://cse.hkust.edu.hk/faculty/dekai/", kind: "profile" }],
    x: 605, y: 165, primary: true,
  },
  {
    id: "yangqiu-song", name: "Yangqiu Song", chinese: "宋陽秋", role: "Associate Professor · PG Programs Coordinator", institution: "HKUST", region: "Hong Kong",
    area: "NLP · Knowledge Graphs · LLM Agents", tags: ["NLP", "知识图谱", "智能体", "WeBank Joint Lab"], stage: "senior", category: "core",
    summary: "研究文本挖掘、知识图谱、常识与 LLM 智能体，联合领导 HKUST–WeBank Joint Lab；公开履历连接 IBM Research、MSRA、Huawei Noah’s Ark、Amazon A9/Rufus。",
    sources: [{ label: "HKUST Faculty Profile", url: "https://cse.hkust.edu.hk/admin/people/faculty/profile/yqsong", kind: "official" }, { label: "个人主页（学生去向）", url: "https://cse.hkust.edu.hk/~yqsong/", kind: "profile" }],
    x: 445, y: 285, primary: true,
  },
  {
    id: "junxian-he", name: "Junxian He", chinese: "何俊賢", role: "Assistant Professor", institution: "HKUST", region: "Hong Kong",
    area: "LLM Reasoning · Planning · Efficient NLP", tags: ["LLM 推理", "规划", "高效 NLP", "新独立 PI"], stage: "emerging", category: "core",
    summary: "研究资源高效 NLP、LLM 推理与规划、强化学习和智能体；CMU LTI 博士，公开记录列 Taylor Berg-Kirkpatrick 为学术导师。",
    sources: [{ label: "HKUST Faculty Profile", url: "https://cse.hkust.edu.hk/admin/people/faculty/profile/junxianh", kind: "official" }, { label: "CMU LTI Alumni", url: "https://www.lti.cs.cmu.edu/people/alumni/alumni-2022/he-junxian.html", kind: "official" }],
    x: 605, y: 285, primary: true,
  },
  {
    id: "yi-fung", name: "Yi R. Fung", chinese: "馮一人", role: "Assistant Professor", institution: "HKUST", region: "Hong Kong",
    area: "Trustworthy NLP · Multimodal Reasoning · Agents", tags: ["可信 NLP", "多模态推理", "RAG", "智能体", "2024 新 PI"], stage: "emerging", category: "core",
    summary: "发展期独立 PI，研究人本可信 AI/NLP、多模态知识推理、RAG、智能体与社会文化适配；官方简介明确其领导一个正在扩展的新研究组。",
    sources: [{ label: "HKUST Faculty Profile", url: "https://cse.hkust.edu.hk/admin/people/faculty/profile/yrfung", kind: "official" }],
    x: 445, y: 405, primary: true,
  },
  {
    id: "song-guo-hkust", name: "Song Guo", chinese: "郭嵩", role: "Chair Professor · Associate Head", institution: "HKUST", region: "Hong Kong",
    area: "LLM Systems · Physical AI", tags: ["LLM Systems", "机器学习系统", "Physical AI"], stage: "adjacent", category: "adjacent",
    summary: "以大模型系统、机器学习系统与 Physical AI 为主线的系统相邻 PI；不归入纯语言方向，但与香港 LLM 训练和部署生态直接相关。",
    sources: [{ label: "HKUST Faculty Profile", url: "https://cse.hkust.edu.hk/admin/people/faculty/profile/songguo", kind: "official" }],
    x: 605, y: 405, primary: true,
  },

  // Hong Kong · CUHK
  {
    id: "kam-fai-wong", name: "Kam-Fai Wong", chinese: "黃錦輝", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Chinese NLP · Information Retrieval", tags: ["中文信息处理", "NLP", "IR", "ACL Fellow"], stage: "senior", category: "core",
    summary: "CUHK 中文信息处理的重要资深节点，ACL Fellow，长期推动亚洲 NLP 社群；Jing Ma 的博士导师之一，并连接多项知识转移与产业项目。",
    sources: [{ label: "CUHK SEEM Academic Staff", url: "https://www.se.cuhk.edu.hk/people/academic-staff/", kind: "official" }, { label: "CUHK Research Portal", url: "https://research.cuhk.edu.hk/en/persons/kam-fai-william-wong/", kind: "official" }],
    x: 980, y: 165, primary: true,
  },
  {
    id: "xixin-wu", name: "Xixin Wu", chinese: "吳錫欣", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "Generative AI · Speech & Language for Health", tags: ["生成式 AI", "语音语言", "健康", "情感计算"], stage: "emerging", category: "core",
    summary: "CUHK SEEM 的发展期独立 PI，研究生成式 AI、健康场景语音与语言处理、情感计算和人机交互。",
    sources: [{ label: "CUHK SEEM Academic Staff", url: "https://www.se.cuhk.edu.hk/people/academic-staff/", kind: "official" }],
    x: 780, y: 285, primary: true,
  },
  {
    id: "irwin-king", name: "Irwin King", role: "Professor · MISC Lab PI", institution: "CUHK", region: "Hong Kong",
    area: "Machine Learning · Social Computing · NLP", tags: ["NLP", "社交计算", "e-learning", "MISC Lab"], stage: "senior", category: "adjacent",
    summary: "MISC Lab PI，研究机器学习、社交计算与教育技术，实验室明确设有 NLP 主线；因整体研究范围更宽，本图列入 AI 相邻层。",
    sources: [{ label: "CUHK MISC Lab", url: "https://misc-lab.cse.cuhk.edu.hk/", kind: "official" }],
    x: 980, y: 285, primary: true,
  },
  {
    id: "yu-cheng-cuhk", name: "Yu Cheng", role: "Research Professor", institution: "CUHK", region: "Hong Kong",
    area: "Multimodal Learning · Efficient AI · NLP", tags: ["多模态", "NLP", "模型压缩", "Research Professor"], stage: "adjacent", category: "adjacent",
    summary: "研究多模态学习、自然语言处理与模型压缩；当前为 Research Professor，因职位轨道与常规 tenure-track 不同，单列在相邻层。",
    sources: [{ label: "CUHK CSE Profile", url: "https://www.cse.cuhk.edu.hk/people/faculty/yu-cheng/", kind: "official" }],
    x: 780, y: 405, primary: true,
  },

  // Hong Kong · CityU
  {
    id: "wei-ying-ma", name: "Wei-Ying Ma", chinese: "馬維英", role: "Chair Professor of AI for Science", institution: "CityU", region: "Hong Kong",
    area: "Search · NLP · Generative AI", tags: ["搜索", "NLP", "生成式 AI", "MSRA"], stage: "senior", category: "core",
    summary: "CityU Chief of AI、HKAI-Sci 主任，搜索、数据挖掘与自然语言处理领域资深学者；曾任 MSRA 常务副院长与 ByteDance 副总裁兼 AI Lab 负责人。",
    sources: [{ label: "CityU Named Professorship", url: "https://www.cityu.edu.hk/named-professorship/named-professorship-scheme/named-chair-professorships/lee-shau-kee-chair-professorship-in-information-engineering", kind: "official" }, { label: "CityU CS Academic Staff", url: "https://www.cs.cityu.edu.hk/en/people/academic-staff", kind: "official" }],
    x: 115, y: 575, primary: true,
  },
  {
    id: "chen-ma-cityu", name: "Chen Ma", role: "Associate Professor", institution: "CityU", region: "Hong Kong",
    area: "Recommender Systems · NLP · Social Computing", tags: ["推荐系统", "NLP", "社会计算", "深度学习"], stage: "senior", category: "core",
    summary: "横跨推荐系统、自然语言处理、数据挖掘与社会计算的独立 PI。",
    sources: [{ label: "CityU CS Academic Staff", url: "https://www.cs.cityu.edu.hk/en/people/academic-staff", kind: "official" }],
    x: 275, y: 575, primary: true,
  },
  {
    id: "zhisong-zhang", name: "Zhisong Zhang", chinese: "張智松", role: "Presidential Assistant Professor", institution: "CityU", region: "Hong Kong",
    area: "Long-context LLM · Agents · NLP", tags: ["长上下文", "LLM Agents", "NLP", "2025 新 PI"], stage: "emerging", category: "core",
    summary: "CMU Language Technologies Institute 博士，当前从模型层和系统层研究高效、可靠的 LLM / Agent：包括长上下文压缩、语言模型机制、Web Agent 与 Deep Research 系统。",
    facts: [
      { label: "教育", value: "CMU LTI PhD (2023)；上海交通大学计算机 BS / MS", source: { label: "Zhisong Zhang 主页", url: "https://zzsfornlp.github.io/", kind: "profile" } },
      { label: "博士导师", value: "Xuezhe Ma", source: { label: "CMU LTI Alumni", url: "https://www.lti.cs.cmu.edu/people/alumni/alumni-2023/zhang-zhisong.html", kind: "official" } },
      { label: "研究层次", value: "模型层：长上下文与机制；系统层：搜索、Web Agent 与 Deep Research", source: { label: "Research Page", url: "https://zzsfornlp.github.io/research", kind: "profile" } },
      { label: "招生状态", value: "公开招收 PhD / MPhil、RA 与访问学生", source: { label: "Openings", url: "https://zzsfornlp.github.io/opening", kind: "profile" } },
    ],
    sources: [{ label: "CityU Presidential Assistant Professors", url: "https://www.cityu.edu.hk/vpti/presidential-assistant-professors-scheme/paps", kind: "official" }, { label: "Zhisong Zhang 主页", url: "https://zzsfornlp.github.io/", kind: "profile" }, { label: "CMU LTI Alumni", url: "https://www.lti.cs.cmu.edu/people/alumni/alumni-2023/zhang-zhisong.html", kind: "official" }],
    x: 115, y: 665, primary: true,
  },
  {
    id: "gang-liu-cityu", name: "Gang Liu", chinese: "劉罡", role: "Assistant Professor · DSAIL Director", institution: "CityU", region: "Hong Kong",
    area: "Generative AI · Multimodal LLM · AI for Science", tags: ["LLM", "生成式 AI", "基础模型", "AI4Science", "分子设计"], stage: "emerging", category: "core",
    summary: "CityU 数据科学系与香港人工智能与科学研究院独立 PI，创建 Data × Science × AI Lab；以生成式/多模态基础模型和数据中心学习推动分子、材料发现。",
    facts: [
      { label: "教育与导师", value: "Notre Dame CSE PhD (2026)，导师 Meng Jiang；与 Tengfei Luo 合作 AI for Science", source: { label: "Gang Liu 主页", url: "https://liugangcode.github.io/", kind: "profile" } },
      { label: "研究组", value: "Data × Science × Artificial Intelligence Lab (DSAIL)", source: { label: "DSAIL", url: "https://liugangcode.github.io/dsail.html", kind: "profile" } },
      { label: "产业研究", value: "Amazon Applied Scientist 实习；Broad Institute 与 MIT–IBM Watson AI Lab 研究实习", source: { label: "Gang Liu 主页", url: "https://liugangcode.github.io/", kind: "profile" } },
      { label: "研究资助", value: "IBM PhD Fellowship、OpenAI Researcher Access、Kaggle Competition Research Grant", source: { label: "Gang Liu 主页", url: "https://liugangcode.github.io/", kind: "profile" } },
      { label: "开放工具", value: "torch-molecule；NeurIPS 2025 Open Polymer Challenge 负责人", source: { label: "CityU DSAI Profile", url: "https://www.ds.cityu.edu.hk/people/academic-staff/professor-gang-liu", kind: "official" } },
    ],
    sources: [{ label: "CityU DSAI Profile", url: "https://www.ds.cityu.edu.hk/people/academic-staff/professor-gang-liu", kind: "official" }, { label: "Gang Liu 主页", url: "https://liugangcode.github.io/", kind: "profile" }, { label: "DSAIL", url: "https://liugangcode.github.io/dsail.html", kind: "profile" }],
    x: 275, y: 665, primary: true,
  },
  {
    id: "ning-miao", name: "Ning Miao", chinese: "苗寧", role: "Assistant Professor · Miaow Lab Director", institution: "CityU", region: "Hong Kong",
    area: "LLM Reasoning · AI4Math · Generative Models", tags: ["LLM 推理", "AI4Math", "生成模型", "Oxford PhD", "ByteDance AI Lab"], stage: "emerging", category: "core",
    summary: "CityU 数据科学系与香港人工智能与科学研究院 PI，创建 Miaow Lab；从推理过程解释、奖励模型、工具使用与数学推理等方向研究 machine reasoning，并延续深度生成模型主线。",
    facts: [
      { label: "教育", value: "Oxford Statistics PhD；Peking University BS / MS", source: { label: "Ning Miao 主页", url: "https://www.ningmiao.space/", kind: "profile" } },
      { label: "博士导师", value: "Tom Rainforth、Yee Whye Teh", source: { label: "Oxford CSML", url: "https://csml.stats.ox.ac.uk/people/miao/", kind: "official" } },
      { label: "研究组", value: "Miaow Lab：LLM reasoning、AI4Math、generative models", source: { label: "Miaow Lab", url: "https://miaow-lab.github.io/", kind: "profile" } },
      { label: "产业经历", value: "ByteDance AI Lab 前研究员", source: { label: "Ning Miao 主页", url: "https://www.ningmiao.space/", kind: "profile" } },
      { label: "近期进展", value: "2026 RGC Early Career Scheme；ICML 2026 reasoning interpretability 工作", source: { label: "Ning Miao 主页", url: "https://www.ningmiao.space/", kind: "profile" } },
    ],
    sources: [{ label: "CityU DSAI Profile", url: "https://www.ds.cityu.edu.hk/people/academic-staff/professor-ning-miao", kind: "official" }, { label: "Ning Miao 主页", url: "https://www.ningmiao.space/", kind: "profile" }, { label: "Miaow Lab", url: "https://miaow-lab.github.io/", kind: "profile" }, { label: "Oxford CSML", url: "https://csml.stats.ox.ac.uk/people/miao/", kind: "official" }],
    x: 115, y: 755, primary: true,
  },
  {
    id: "jianyuan-guo", name: "Jianyuan Guo", chinese: "郭健元", role: "Presidential Assistant Professor", institution: "CityU", region: "Hong Kong",
    area: "Efficient Multimodal AI · LLM/LVM · Agents", tags: ["多模态", "LLM / LVM", "模型压缩", "具身 AI", "Agentic FM"], stage: "emerging", category: "adjacent",
    summary: "2025 年 6 月加入 CityU 的 Presidential Assistant Professor，以高效机器感知为主线，覆盖 LLM/LVM 新架构、模型压缩、多模态理解、边缘计算、具身 AI 与 agentic foundation models。",
    facts: [
      { label: "教育", value: "University of Sydney CS PhD；Peking University EECS BS / MS", source: { label: "CityU PAPS", url: "https://www.cityu.edu.hk/vpti/presidential-assistant-professors-scheme/paps", kind: "official" } },
      { label: "导师谱系", value: "博士导师 Chang Xu；北大阶段导师 Chao Zhang", source: { label: "Jianyuan Guo 主页", url: "https://ggjy.github.io/", kind: "profile" } },
      { label: "代表方向", value: "高效视觉/语言大模型、知识蒸馏、多模态融合、具身 AI 与智能体", source: { label: "Jianyuan Guo 主页", url: "https://ggjy.github.io/", kind: "profile" } },
      { label: "奖项", value: "2022 Google PhD Fellowship；2026 CORE Australasian Distinguished Dissertation Commendation", source: { label: "Jianyuan Guo 主页", url: "https://ggjy.github.io/", kind: "profile" } },
      { label: "教学", value: "Topics in Generative AI、Topics in Machine Learning、Artificial Intelligence", source: { label: "Jianyuan Guo 主页", url: "https://ggjy.github.io/", kind: "profile" } },
    ],
    sources: [{ label: "CityU CS Academic Staff", url: "https://www.cs.cityu.edu.hk/en/people/academic-staff", kind: "official" }, { label: "CityU Presidential Assistant Professors", url: "https://www.cityu.edu.hk/vpti/presidential-assistant-professors-scheme/paps", kind: "official" }, { label: "Jianyuan Guo 主页", url: "https://ggjy.github.io/", kind: "profile" }],
    x: 275, y: 755, primary: true,
  },
  {
    id: "xiaotie-deng", name: "Xiaotie Deng", chinese: "鄧小鐵", role: "Chair Professor of Multi-Agent Economics", institution: "CityU", region: "Hong Kong",
    area: "LLM Multi-agent Systems · Algorithmic Game Theory", tags: ["多智能体", "LLM", "机制设计", "算法博弈"], stage: "adjacent", category: "adjacent",
    summary: "资深算法博弈学者，当前研究方向已明确包含 LLM-based multiagent systems；属于智能体和决策相邻层。",
    sources: [{ label: "CityU CS Academic Staff", url: "https://www.cs.cityu.edu.hk/en/people/academic-staff", kind: "official" }],
    x: 115, y: 845, primary: true,
  },
  {
    id: "zhenjiang-li", name: "Zhenjiang Li", chinese: "李鎮江", role: "Professor", institution: "CityU", region: "Hong Kong",
    area: "LLM Systems · Edge AI", tags: ["LLM Systems", "边缘 AI", "AIoT"], stage: "adjacent", category: "adjacent",
    summary: "研究大语言模型系统、边缘与嵌入式 AI；作为基础设施与部署方向单列相邻层。",
    sources: [{ label: "CityU CS Academic Staff", url: "https://www.cs.cityu.edu.hk/en/people/academic-staff", kind: "official" }],
    x: 275, y: 845, primary: true,
  },

  // Hong Kong · PolyU
  {
    id: "wenjie-li", name: "Wenjie Li", role: "Professor · NLP Group", institution: "PolyU", region: "Hong Kong",
    area: "NLU/NLG · Summarization · Dialogue", tags: ["NLP", "摘要", "问答", "对话", "Microsoft alumni"], stage: "senior", category: "core",
    summary: "PolyU NLP Group 资深 PI，研究理解与生成、摘要、问答、机器对话；公开组页列出多名校友进入 Microsoft、Alibaba、Tencent、Baidu。",
    sources: [{ label: "PolyU Academic Staff", url: "https://www.polyu.edu.hk/comp/people/academic-staff/?sc_lang=en", kind: "official" }, { label: "PolyU NLP Group", url: "https://www4.comp.polyu.edu.hk/~cswjli/Group.html", kind: "profile" }],
    x: 450, y: 575, primary: true,
  },
  {
    id: "jing-li-polyu", name: "Jing Li", chinese: "李菁", role: "Associate Professor · Embodied AI Lab Founder", institution: "PolyU", region: "Hong Kong",
    area: "Human-centered NLP · Embodied AI · LLM", tags: ["NLP", "具身 AI", "LLM", "Tencent AI Lab"], stage: "senior", category: "core",
    summary: "PolyU Embodied AI Lab 创始人，研究人本 NLP、语言表示与面向具身智能体的 LLM；加入 PolyU 前任 Tencent AI Lab NLP Center 高级研究员，并与 Huawei、Baidu、Tencent 有公开合作。",
    sources: [{ label: "PolyU Faculty Profile", url: "https://www.polyu.edu.hk/comp/People/Academic-Staff/Prof-LI-Jing-Amelia", kind: "official" }, { label: "个人主页", url: "https://www4.comp.polyu.edu.hk/~jing1li/", kind: "profile" }],
    x: 620, y: 575, primary: true,
  },
  {
    id: "hongxia-yang", name: "Hongxia Yang", chinese: "杨红霞", role: "Chair Professor of Generative AI · UCAIC Director", institution: "PolyU", region: "Hong Kong",
    area: "Generative AI · LLM/MLLM · Reinforcement Learning", tags: ["LLM", "多模态大模型", "强化学习", "Alibaba DAMO", "ByteDance"], stage: "senior", category: "core",
    summary: "生成式 AI 讲席教授；此前经历覆盖 IBM Watson、Yahoo、Alibaba DAMO 与 ByteDance US Head of LLMs，当前领导 PolyU 生成式 AI 与协作式大模型项目。",
    sources: [{ label: "PolyU Academic Staff", url: "https://www.polyu.edu.hk/comp/people/academic-staff/?sc_lang=en", kind: "official" }, { label: "个人主页", url: "https://www4.comp.polyu.edu.hk/~hongxyang/", kind: "profile" }],
    x: 790, y: 575, primary: true,
  },
  {
    id: "liangliang-cao", name: "Liangliang Cao", chinese: "曹亮亮", role: "Chair Professor of AI Systems", institution: "PolyU", region: "Hong Kong",
    area: "Multimodal LLM · Speech · AI Systems", tags: ["Gemini", "Apple Intelligence", "Google Speech", "多模态 LLM"], stage: "senior", category: "core",
    summary: "2026 年加入 PolyU；曾领导 Google Cloud Speech 建模团队、参与 Apple Intelligence，并在 Google DeepMind Gemini / Project Astra 团队任 Principal Engineer and Director。",
    sources: [{ label: "PolyU DSAI Profile", url: "https://www.polyu.edu.hk/dsai/people/academic-staff/cao-liangliang/?sc_lang=en", kind: "official" }],
    x: 450, y: 690, primary: true,
  },
  {
    id: "wenqi-fan", name: "Wenqi Fan", role: "Assistant Professor", institution: "PolyU", region: "Hong Kong",
    area: "LLM for Recommendation · RAG · Graph Learning", tags: ["LLM4Rec", "RAG", "推荐系统", "图学习"], stage: "emerging", category: "core",
    summary: "从推荐系统、图学习延伸到 LLM4Rec、RAG 与 LLM 安全的独立 PI；从 PolyU RAP 晋升至 Assistant Professor。",
    sources: [{ label: "PolyU Faculty Profile", url: "https://www.polyu.edu.hk/comp/people/academic-staff/prof-fan-wenqi/?sc_lang=en", kind: "official" }, { label: "个人主页", url: "https://wenqifan03.github.io/", kind: "profile" }],
    x: 620, y: 690, primary: true,
  },
  {
    id: "xiao-huang-polyu", name: "Xiao Huang", role: "Associate Professor", institution: "PolyU", region: "Hong Kong",
    area: "RAG · LLM Reasoning · Knowledge Graphs", tags: ["RAG", "Text-to-SQL", "LLM 推理", "知识图谱"], stage: "adjacent", category: "adjacent",
    summary: "数据挖掘与图学习 PI，近年研究重点包括图 RAG、Text-to-SQL、LLM 推理和 agentic AI；列入知识与数据相邻层。",
    sources: [{ label: "个人主页", url: "https://www4.comp.polyu.edu.hk/~xiaohuang/", kind: "profile" }, { label: "PolyU Academic Staff", url: "https://www.polyu.edu.hk/comp/people/academic-staff/?sc_lang=en", kind: "official" }],
    x: 790, y: 690, primary: true,
  },
  {
    id: "qiang-yang-polyu", name: "Qiang Yang", chinese: "杨强", role: "Chief AI Officer · Chair Professor · PAAI Director", institution: "PolyU", region: "Hong Kong",
    area: "Machine Learning · Federated Learning · AI Strategy", tags: ["联邦学习", "迁移学习", "WeBank", "WeChat", "Huawei Noah's Ark"], stage: "adjacent", category: "adjacent",
    summary: "香港 AI 生态的重要组织与产业连接节点：现任 PolyU CAIO、PAAI 主任和讲席教授；曾任 WeBank CAIO、WeChat–HKUST Joint Lab 主任及 Huawei Noah’s Ark 创始主任。",
    sources: [{ label: "PolyU Faculty Profile", url: "https://www.polyu.edu.hk/dsai/docdrive/personal/yangqiang.html", kind: "official" }],
    x: 530, y: 805, primary: true,
  },

  // Hong Kong · HKBU
  {
    id: "jing-ma-hkbu", name: "Jing Ma", chinese: "馬晶", role: "Associate Professor", institution: "HKBU", region: "Hong Kong",
    area: "NLP · Fact Verification · LLM Safety", tags: ["NLP", "事实核查", "谣言检测", "可信 LLM", "Tencent"], stage: "senior", category: "core",
    summary: "研究事实核查、谣言检测、NLP 与可信 LLM；CUHK 博士阶段由 Kam-Fai Wong 与 Wei Gao 共同指导，2024 年入选 Tencent Rhino-Bird Focused Research Program。",
    sources: [{ label: "HKBU Faculty Profile", url: "https://www.comp.hkbu.edu.hk/v1/?id=majing&page=profile", kind: "official" }, { label: "HKBU Scholars", url: "https://scholars.hkbu.edu.hk/en/persons/MAJING/", kind: "official" }],
    x: 1010, y: 575, primary: true,
  },
  {
    id: "jiaxin-bai", name: "Jiaxin Bai", role: "Assistant Professor", institution: "HKBU", region: "Hong Kong",
    area: "RAG · Knowledge Reasoning · AI Agents", tags: ["RAG", "知识图谱", "AI Agents", "2026 新 PI"], stage: "emerging", category: "core",
    summary: "2026 年加入 HKBU 的新独立 PI，研究知识图谱、逻辑与溯因推理、RAG、知识增强大模型和 AI 智能体。",
    sources: [{ label: "HKBU Faculty Profile", url: "https://www.comp.hkbu.edu.hk/v1/?id=baijiaxin&page=profile", kind: "official" }],
    x: 1010, y: 665, primary: true,
  },
  {
    id: "kaiyang-zhou", name: "Kaiyang Zhou", chinese: "周鍇陽", role: "Assistant Professor", institution: "HKBU", region: "Hong Kong",
    area: "Vision-Language Models · Trustworthy Multimodal AI", tags: ["VLM", "多模态", "泛化", "校准"], stage: "emerging", category: "adjacent",
    summary: "以计算机视觉和 vision-language models 为主，研究跨域泛化、适配与校准；不计入纯 NLP 核心，单列多模态相邻层。",
    sources: [{ label: "HKBU Faculty Profile", url: "https://www.comp.hkbu.edu.hk/v1/?id=kyzhou&page=profile", kind: "official" }],
    x: 1010, y: 755, primary: true,
  },
  {
    id: "bo-han-hkbu", name: "Bo Han", chinese: "韓波", role: "Associate Professor", institution: "HKBU", region: "Hong Kong",
    area: "Trustworthy Foundation Models · AI Agents", tags: ["可信 AI", "基础模型", "AI Agents", "Tencent WeChat"], stage: "adjacent", category: "adjacent",
    summary: "可信机器学习与基础模型 PI；HKBU 官方项目页记录其研究可信 foundation models，并与 Tencent WeChat 开展 expert-knowledge-driven AI agents 合作。",
    sources: [{ label: "HKBU AI/ML Research Area", url: "https://www.comp.hkbu.edu.hk/v1/?id=1&page=research_areas", kind: "official" }, { label: "Tencent Rhino-Bird 合作", url: "https://www.comp.hkbu.edu.hk/v1/?id=204&page=fac_ach", kind: "official" }],
    x: 1010, y: 845, primary: true,
  },

  { id: "raymond-mooney", name: "Raymond Mooney", role: "Professor", institution: "External", area: "Machine Learning · NLP", tags: ["导师", "UT Austin"], stage: "historical", category: "historical", summary: "Hwee Tou Ng 博士导师。", sources: [{ label: "Ng 博士论文", url: "https://www.cs.utexas.edu/~ml/papers/hweetou_dissertation.pdf", kind: "thesis" }], x: 70, y: 40 },
  { id: "kathleen-mckeown", name: "Kathleen McKeown", role: "Professor", institution: "External", area: "Natural Language Processing", tags: ["导师", "Columbia"], stage: "historical", category: "historical", summary: "Min-Yen Kan CV 列出的博士导师之一。", sources: [{ label: "Kan CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" }], x: 230, y: 40 },
  { id: "victor-lesser", name: "Victor Lesser", role: "Distinguished Professor Emeritus", institution: "External", area: "Multi-agent Systems", tags: ["博士导师", "UMass Amherst", "AAAI Founding Fellow"], stage: "historical", category: "historical", summary: "Bo An 的博士导师，多智能体系统领域先驱、UMass Amherst Multi-Agent Systems Laboratory 创始主任。", sources: [{ label: "UMass Multi-Agent Systems Lab", url: "https://mas.cs.umass.edu/lesser.html", kind: "official" }], x: 405, y: 40 },
  { id: "sinno-pan", name: "Sinno Jialin Pan", role: "Professor", institution: "External", area: "Machine Learning", tags: ["导师"], stage: "historical", category: "historical", summary: "Wenya Wang 公开主页列出的博士导师。", sources: [{ label: "Wenya Wang 主页", url: "https://personal.ntu.edu.sg/wangwy/", kind: "official" }], x: 575, y: 40 },
  { id: "milind-tambe", name: "Milind Tambe", role: "Gordon McKay Professor · Google DeepMind", institution: "External", area: "Multi-agent Systems · AI for Social Good", tags: ["博士后合作", "Harvard", "Google DeepMind"], stage: "historical", category: "historical", summary: "Bo An 在 USC 博士后阶段的合作导师；现任 Harvard 教授及 Google DeepMind AI for Social Good 负责人。", sources: [{ label: "Google DeepMind Profile", url: "https://research.google/people/milindtambe/", kind: "official" }, { label: "Harvard Faculty Profile", url: "https://seas.harvard.edu/person/milind-tambe", kind: "official" }], x: 770, y: 40 },
  { id: "christos-faloutsos", name: "Christos Faloutsos", role: "Professor", institution: "External", area: "Graph Mining · Anomaly Detection", tags: ["博士导师", "CMU", "图挖掘"], stage: "historical", category: "historical", summary: "Bryan Hooi 在 Carnegie Mellon University 的机器学习博士导师。", sources: [{ label: "Bryan Hooi 个人主页", url: "https://bhooi.github.io/", kind: "profile" }], x: 970, y: 40 },
  {
    id: "wai-lam", name: "Wai Lam", chinese: "林偉", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "NLP · Text Mining · Information Retrieval", tags: ["NLP", "文本挖掘", "IR", "导师谱系"], stage: "senior", category: "core",
    summary: "CUHK NLP 与信息检索资深 PI，研究文本挖掘、生成与知识增强；其博士生谱系延伸到新加坡现任 PI Yang Deng 与 Wenxuan Zhang。",
    sources: [{ label: "CUHK Research Portal", url: "https://research.cuhk.edu.hk/en/persons/wai-lam/", kind: "official" }, { label: "CUHK SEEM 2025 Brochure", url: "https://www.se.cuhk.edu.hk/wp-content/uploads/2025/09/2025-SEEM-Brochure_final.pdf", kind: "official" }],
    x: 780, y: 165, primary: true,
  },
  { id: "noah-smith", name: "Noah A. Smith", role: "Professor", institution: "External", region: "Hong Kong", area: "Natural Language Processing", tags: ["博士导师", "University of Washington"], stage: "historical", category: "historical", summary: "Lingpeng Kong 的共同博士导师。", sources: [{ label: "HKU LawTech Profile", url: "https://www.lawtech.hku.hk/people/lingpeng-kong/", kind: "official" }], x: 110, y: 45 },
  { id: "chris-dyer", name: "Chris Dyer", role: "Professor", institution: "External", region: "Hong Kong", area: "Natural Language Processing", tags: ["博士导师", "CMU"], stage: "historical", category: "historical", summary: "Lingpeng Kong 的共同博士导师。", sources: [{ label: "HKU LawTech Profile", url: "https://www.lawtech.hku.hk/people/lingpeng-kong/", kind: "official" }], x: 330, y: 45 },
  { id: "dragomir-radev", name: "Dragomir Radev", role: "Professor (1968–2023)", institution: "External", region: "Hong Kong", area: "Natural Language Processing", tags: ["博士导师", "Yale"], stage: "historical", category: "historical", summary: "Tao Yu 的博士导师。", sources: [{ label: "Tao Yu 个人主页", url: "https://taoyds.github.io/", kind: "profile" }], x: 550, y: 45 },
  { id: "taylor-berg-kirkpatrick", name: "Taylor Berg-Kirkpatrick", role: "Associate Professor", institution: "External", region: "Hong Kong", area: "Natural Language Processing", tags: ["博士导师", "UC San Diego"], stage: "historical", category: "historical", summary: "CMU LTI alumni 记录的 Junxian He 博士导师。", sources: [{ label: "CMU LTI Alumni", url: "https://www.lti.cs.cmu.edu/people/alumni/alumni-2022/he-junxian.html", kind: "official" }], x: 790, y: 45 },
  ...hkSgAiCvExpansionPeople,
  ...mainlandPeople,
  ...mainlandPhase2People,
  ...mainlandAiCvPeople,
  ...usPeople,
  ...usAiCvExpansionPeople,
  ...systematicRosterPeople,
];

export const people: Person[] = basePeople.map((person) => {
  const portrait = systematicRosterPortraits[person.id] ?? hkSgMissingPortraits[person.id] ?? mainlandMissingPortraits[person.id] ?? mainlandFillAPortraits[person.id] ?? mainlandFillBPortraits[person.id] ?? mainlandPortraits[person.id] ?? hkSgPortraits[person.id] ?? usPortraits[person.id] ?? person.portrait;
  const enhancements: Partial<Person>[] = [
    mainlandPersonEnhancements[person.id],
    fourRegionProfileEnhancements[person.id],
    mainlandFullProfileEnhancements[person.id],
    usFullProfileEnhancements[person.id],
    sgHkFullProfileEnhancements[person.id],
    mainlandFullProfileEnhancements2[person.id],
    mainlandFullProfileEnhancements3[person.id],
  ].filter((enhancement): enhancement is Partial<Person> => Boolean(enhancement));
  if (!enhancements.length && !portrait) return person;
  const sources = Array.from(
    new Map(
      [...person.sources, ...enhancements.flatMap((enhancement) => enhancement?.sources ?? []), ...(portrait ? [portrait.source] : [])]
        .map((source) => [source.url, source] as const),
    ).values(),
  );
  const facts = [...(person.facts ?? []), ...enhancements.flatMap((enhancement) => enhancement?.facts ?? [])].filter((fact, index, all) => all.findIndex((candidate) => candidate.label === fact.label && candidate.value === fact.value) === index);
  return {
    ...person,
    ...Object.assign({}, ...enhancements),
    tags: Array.from(new Set([...person.tags, ...enhancements.flatMap((enhancement) => enhancement?.tags ?? [])])),
    facts,
    sources,
    portrait,
  };
});

export const relationships: Relationship[] = [
  { id: "mooney-ng", from: "raymond-mooney", to: "hwee-tou-ng", type: "lineage", label: "博士导师", evidence: "Ng 的博士论文致谢明确称 Raymond Mooney 为 advisor。", source: { label: "UT Austin 博士论文", url: "https://www.cs.utexas.edu/~ml/papers/hweetou_dissertation.pdf", kind: "thesis" }, verified: true },
  { id: "mckeown-kan", from: "kathleen-mckeown", to: "min-yen-kan", type: "lineage", label: "博士导师", evidence: "Kan 的 CV 列出 Kathleen McKeown 与 Judith Klavans 为导师。", source: { label: "Min-Yen Kan CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" }, verified: true },
  { id: "ng-lu", from: "hwee-tou-ng", to: "wei-lu", type: "lineage", label: "博士导师", evidence: "NUS NLP Group alumni 页将 Wei Lu 列为 2009 年博士毕业生；Wei Lu 现任 NTU 教授。", source: { label: "NUS NLP Group alumni", url: "https://www.comp.nus.edu.sg/~nlp/people.html", kind: "official" }, verified: true },
  { id: "lam-deng", from: "wai-lam", to: "yang-deng", type: "lineage", label: "博士导师", evidence: "Yang Deng 的公开招聘资料明确写明博士阶段由 Wai Lam 指导。", source: { label: "Yang Deng Openings", url: "https://dengyang17.github.io/files/Openings.pdf", kind: "cv" }, verified: true },
  { id: "lam-zhang", from: "wai-lam", to: "wenxuan-zhang", type: "lineage", label: "博士导师", evidence: "SUTD 官方简介明确写明 Wenxuan Zhang 的博士导师为 Wai Lam。", source: { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/profile/zhang-wenxuan", kind: "official" }, verified: true },
  { id: "pan-wang", from: "sinno-pan", to: "wenya-wang", type: "lineage", label: "博士导师", evidence: "Wenya Wang 主页明确写明其博士阶段由 Sinno Jialin Pan 指导。", source: { label: "Wenya Wang 主页", url: "https://personal.ntu.edu.sg/wangwy/", kind: "official" }, verified: true },
  { id: "lesser-an", from: "victor-lesser", to: "bo-an", type: "lineage", label: "博士导师", evidence: "Bo An 的个人主页与学术履历均列 Victor Lesser 为其 UMass Amherst 博士导师。", source: { label: "Bo An 学术履历", url: "https://personal.ntu.edu.sg/boan/CV-BOAN.pdf", kind: "cv" }, verified: true },
  { id: "tambe-an", from: "milind-tambe", to: "bo-an", type: "talent", label: "博士后合作 / USC", evidence: "Bo An 官方主页记录其 2010–2012 年在 USC 与 Milind Tambe 开展博士后研究。", source: { label: "Bo An 个人主页", url: "https://personal.ntu.edu.sg/boan/", kind: "official" }, verified: true },
  { id: "faloutsos-hooi", from: "christos-faloutsos", to: "bryan-hooi", type: "lineage", label: "博士导师", evidence: "Bryan Hooi 个人主页明确写明其 CMU Machine Learning 博士由 Christos Faloutsos 指导。", source: { label: "Bryan Hooi 个人主页", url: "https://bhooi.github.io/", kind: "profile" }, verified: true },
  { id: "smith-kong", from: "noah-smith", to: "lingpeng-kong", type: "lineage", label: "共同博士导师", evidence: "HKU 官方关联简介写明 Lingpeng Kong 的 CMU 博士由 Noah Smith 与 Chris Dyer 共同指导。", source: { label: "HKU LawTech Profile", url: "https://www.lawtech.hku.hk/people/lingpeng-kong/", kind: "official" }, verified: true },
  { id: "dyer-kong", from: "chris-dyer", to: "lingpeng-kong", type: "lineage", label: "共同博士导师", evidence: "HKU 官方关联简介写明 Lingpeng Kong 的 CMU 博士由 Noah Smith 与 Chris Dyer 共同指导。", source: { label: "HKU LawTech Profile", url: "https://www.lawtech.hku.hk/people/lingpeng-kong/", kind: "official" }, verified: true },
  { id: "radev-yu", from: "dragomir-radev", to: "tao-yu", type: "lineage", label: "博士导师", evidence: "Tao Yu 公开主页写明其 Yale 博士导师为 Dragomir Radev。", source: { label: "Tao Yu 个人主页", url: "https://taoyds.github.io/", kind: "profile" }, verified: true },
  { id: "berg-he", from: "taylor-berg-kirkpatrick", to: "junxian-he", type: "lineage", label: "博士导师", evidence: "CMU LTI alumni 页面列 Taylor Berg-Kirkpatrick 为 Junxian He 的 Academic Advisor。", source: { label: "CMU LTI Alumni", url: "https://www.lti.cs.cmu.edu/people/alumni/alumni-2022/he-junxian.html", kind: "official" }, verified: true },
  { id: "wong-ma", from: "kam-fai-wong", to: "jing-ma-hkbu", type: "lineage", label: "共同博士导师", evidence: "HKBU Scholars 明确记录 Jing Ma 的 CUHK 博士由 Kam-Fai Wong 与 Wei Gao 共同指导。", source: { label: "HKBU Scholars", url: "https://scholars.hkbu.edu.hk/en/persons/MAJING/", kind: "official" }, verified: true },
  { id: "ma-zhisong-lineage", from: "zhisong-zhang", to: "zhisong-zhang", type: "lineage", label: "博士导师：Xuezhe Ma", evidence: "CMU LTI alumni 页面记录 Zhisong Zhang 的 Academic Advisor 为 Xuezhe Ma。", source: { label: "CMU LTI Alumni", url: "https://www.lti.cs.cmu.edu/people/alumni/alumni-2023/zhang-zhisong.html", kind: "official" }, verified: true },
  { id: "jiang-gang-lineage", from: "gang-liu-cityu", to: "gang-liu-cityu", type: "lineage", label: "博士导师：Meng Jiang", evidence: "Gang Liu 主页记录其 Notre Dame 博士由 Meng Jiang 指导，并与 Tengfei Luo 合作分子基础模型。", source: { label: "Gang Liu 主页", url: "https://liugangcode.github.io/", kind: "profile" }, verified: true },
  { id: "ning-oxford-lineage", from: "ning-miao", to: "ning-miao", type: "lineage", label: "共同博士导师：Tom Rainforth / Yee Whye Teh", evidence: "Oxford CSML 与个人主页均记录 Ning Miao 博士阶段由 Tom Rainforth、Yee Whye Teh 共同指导。", source: { label: "Oxford CSML", url: "https://csml.stats.ox.ac.uk/people/miao/", kind: "official" }, verified: true },
  { id: "guo-lineage", from: "jianyuan-guo", to: "jianyuan-guo", type: "lineage", label: "博士导师：Chang Xu；北大导师：Chao Zhang", evidence: "Jianyuan Guo 个人主页明确列出 University of Sydney 博士导师 Chang Xu，以及 Peking University BS/MS 阶段导师 Chao Zhang。", source: { label: "Jianyuan Guo 主页", url: "https://ggjy.github.io/", kind: "profile" }, verified: true },

  { id: "ng-kan", from: "hwee-tou-ng", to: "min-yen-kan", type: "collaboration", label: "论文合作", evidence: "NUS 公开出版物记录两人的共同论文。", source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/kanmy/", kind: "official" }, verified: true },
  { id: "deng-chua", from: "tat-seng-chua", to: "yang-deng", type: "talent", label: "博士后指导 / NExT++", evidence: "Yang Deng 主页写明其在 NUS NExT++ 博士后阶段与 Tat-Seng Chua、See-Kiong Ng 工作。", source: { label: "CHAT NLP Group", url: "https://dengyang17.github.io/", kind: "profile" }, verified: true },
  { id: "deng-zhang", from: "yang-deng", to: "wenxuan-zhang", type: "collaboration", label: "LLM knowledge boundary 合作", evidence: "两人共同参与 LLM knowledge boundary 综述与教程，也连接 SMU 与 SUTD 的新生代 NLP 群体。", source: { label: "公开综述", url: "https://dengyang17.github.io/files/arxiv_Knowledge_Boundary_Survey.pdf", kind: "profile" }, verified: true },
  { id: "joty-chen", from: "shafiq-joty", to: "nancy-chen", type: "collaboration", label: "EMNLP 2024 合作", evidence: "NTU 公告记录 Shafiq Joty、Nancy Chen 等人的共同论文获 EMNLP 2024 Outstanding Paper。", source: { label: "NTU 公告", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing", kind: "official" }, verified: true },
  { id: "joty-sun", from: "shafiq-joty", to: "aixin-sun", type: "collaboration", label: "共同指导", evidence: "NTU 公告记录两人与 Nancy Chen 共同指导摘要生成方向博士生。", source: { label: "NTU SDSC Fellowship", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/phd-student-awarded-a-sdsc-dissertation-research-fellowship-2022", kind: "official" }, verified: true },
  { id: "hooi-kan", from: "bryan-hooi", to: "min-yen-kan", type: "collaboration", label: "多模态虚假信息研究合作", evidence: "Bryan Hooi 的公开论文列表记录两人共同署名 ICLR 2026 的多模态误导意图识别工作。", source: { label: "Bryan Hooi publications", url: "https://bhooi.github.io/", kind: "profile" }, verified: true },
  { id: "hooi-luu", from: "bryan-hooi", to: "anh-tuan-luu", type: "collaboration", label: "LLM 推理与长上下文合作", evidence: "公开论文列表记录两人共同参与 NeurIPS 2024 的不确定性感知规划与 ACL 2025 的长上下文泛化研究。", source: { label: "Bryan Hooi publications", url: "https://bhooi.github.io/", kind: "profile" }, verified: true },
  { id: "hooi-kawaguchi", from: "bryan-hooi", to: "kenji-kawaguchi", type: "collaboration", label: "图机器学习合作", evidence: "Bryan Hooi 的公开论文列表记录两人共同署名 ICLR 2024 与 NeurIPS 2022 的图神经网络工作。", source: { label: "Bryan Hooi publications", url: "https://bhooi.github.io/", kind: "profile" }, verified: true },
  { id: "fung-dekai", from: "pascale-fung", to: "de-kai", type: "collaboration", label: "HKUST Human Language Technology 合作", evidence: "HKUST HLTC 官方页面将 Pascale Fung 与 De Kai 列为中心核心 faculty，并保留两人长期共同论文记录。", source: { label: "HKUST HLTC People", url: "https://cse.hkust.edu.hk/~hltc/people.html", kind: "official" }, verified: true },
  { id: "zhisong-lam", from: "zhisong-zhang", to: "wai-lam", type: "collaboration", label: "长上下文压缩 / 模型编辑合作", evidence: "Zhisong Zhang 的研究页列出与 Wai Lam 共同指导和署名的 InComeS 长上下文压缩与模型编辑工作。", source: { label: "Zhisong Zhang Research", url: "https://zzsfornlp.github.io/research", kind: "profile" }, verified: true },

  { id: "qizhe-google", from: "qizhe-shieh", to: "qizhe-shieh", type: "industry", label: "Google DeepMind / Brain 前研究经历", evidence: "NUS 官方简介称其加入 NUS 前在 Google DeepMind（原 Google Brain）研究两年。", source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/mshieh/", kind: "official" }, verified: true },
  { id: "chua-sea", from: "tat-seng-chua", to: "tat-seng-chua", type: "industry", label: "Sea–NExT Joint Lab / ViSenze / 6Estates", evidence: "Chua 的个人主页与 NUS 材料明确列出 Sea–NExT Joint Lab，并称其共同创办 ViSenze Pte Ltd 与 6Estates Pte Ltd。", source: { label: "Chua Tat-Seng 个人主页", url: "https://www.chuatatseng.com/", kind: "profile" }, verified: true },
  { id: "kenji-sea", from: "kenji-kawaguchi", to: "kenji-kawaguchi", type: "industry", label: "Sea AI Lab 论文合作", evidence: "NUS 公告记录其与 Sea AI Lab 研究负责人 Min Lin 的共同工作。", source: { label: "NUS 公告", url: "https://www.comp.nus.edu.sg/news-media/kenji-kawaguchi-wins-best-paper-award-at-neurips2024/", kind: "official" }, verified: true },
  { id: "you-google", from: "yang-you", to: "yang-you", type: "industry", label: "Google Research Award · 2026", evidence: "NUS 公告确认其获得 Google 2026 研究奖。", source: { label: "NUS 公告", url: "https://www.comp.nus.edu.sg/bytes/nus-presidential-young-professor-yang-you-wins-google-research-award-to-build-foundations-for-next-generation-ai/", kind: "official" }, verified: true },
  { id: "joty-salesforce", from: "shafiq-joty", to: "shafiq-joty", type: "industry", label: "Salesforce Research 联合身份", evidence: "NTU 官方公告将其署名为 Salesforce Research 与 NTU。", source: { label: "NTU 公告", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing", kind: "official" }, verified: true },
  { id: "cambria-industry", from: "erik-cambria", to: "erik-cambria", type: "industry", label: "MSRA / HP Labs / 创业", evidence: "NTU 实验室资料记录其企业研究经历与 SenticNet、finaXai 创业。", source: { label: "NTU Multi-Net Lab", url: "https://blogs.ntu.edu.sg/multi-net-lab/erik-cambria-5/", kind: "official" }, verified: true },
  { id: "an-deployment", from: "bo-an", to: "bo-an", type: "industry", label: "安全博弈部署", evidence: "Bo An 官方简介称相关安全博弈软件已用于美国联邦空警、海岸警卫队与野生动物保护组织。", source: { label: "Bo An 个人主页", url: "https://personal.ntu.edu.sg/boan/", kind: "official" }, verified: true },
  { id: "an-microsoft", from: "bo-an", to: "bo-an", type: "industry", label: "Microsoft Collaborative AI Challenge", evidence: "NTU 官方介绍记录 Bo An 团队 HogRider 获得 2017 Microsoft Collaborative AI Challenge 冠军。", source: { label: "NTU Professorial Installation", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/professor-installation-ceremony-2022", kind: "official" }, verified: true },
  { id: "lu-alibaba", from: "wei-lu", to: "wei-lu", type: "industry", label: "Alibaba 研究合作", evidence: "SUTD 公开报道介绍 Wei Lu 团队与 Alibaba 的 NLP 合作。", source: { label: "SUTD Story", url: "https://www.sutd.edu.sg/stories-listing/taking-natural-language-processing-to-greater-heights", kind: "official" }, verified: true },
  { id: "zhang-alibaba", from: "wenxuan-zhang", to: "wenxuan-zhang", type: "industry", label: "Alibaba Singapore 前研究科学家", evidence: "SUTD 官方简介记录其此前任 Alibaba Group Singapore 研究科学家并获 Ali Star。", source: { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/profile/zhang-wenxuan", kind: "official" }, verified: true },
  { id: "deng-google", from: "yang-deng", to: "yang-deng", type: "industry", label: "Google South / Southeast Asia Research Award", evidence: "SMU 官方 CV 记录其 2024 Google South Asia & Southeast Asia Research Award。", source: { label: "SMU CV", url: "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2025-02/ydeng-CV.pdf", kind: "cv" }, verified: true },
  { id: "nancy-transfer", from: "nancy-chen", to: "nancy-chen", type: "industry", label: "商业 spin-off / 政府部署", evidence: "A*STAR 官方简介称团队技术已形成商业 spin-off 和政府部署。", source: { label: "A*STAR I²R Profile", url: "https://www.a-star.edu.sg/i2r/i2r-profiles/nancychen", kind: "official" }, verified: true },
  { id: "su-baidu", from: "jian-su", to: "jian-su", type: "industry", label: "Baidu–I²R Research Centre", evidence: "A*STAR 官方资料列其为 Baidu I²R Research Centre 联合主任。", source: { label: "A*STAR Research Profile", url: "https://research.a-star.edu.sg/researcher/jian-su/", kind: "official" }, verified: true },
  { id: "kong-deepmind", from: "lingpeng-kong", to: "lingpeng-kong", type: "industry", label: "Google DeepMind 前研究科学家", evidence: "HKU 官方简介记录其 2017–2020 年在 Google DeepMind 任 Research Scientist / Senior Research Scientist。", source: { label: "HKU Profile", url: "https://ai.hku.hk/people/academic-staff/lpk", kind: "official" }, verified: true },
  { id: "liu-industry-labs", from: "qi-liu-hku", to: "qi-liu-hku", type: "industry", label: "DeepMind / FAIR / Microsoft Research", evidence: "HKU 官方报道列出其加入 HKU 前在 Google DeepMind、Facebook AI Research 与 Microsoft Research 的经历。", source: { label: "HKU 人物报道", url: "https://www.cs.hku.hk/news-events/news-and-announcements/20230525_qliu_forbes-under30_asia_2023", kind: "official" }, verified: true },
  { id: "pascale-att-bbn", from: "pascale-fung", to: "pascale-fung", type: "industry", label: "AT&T / Bell Labs / BBN 研究经历", evidence: "HKUST ECE 官方简介记录其曾任 AT&T Research affiliate，并早年任 BBN Associate Scientist。", source: { label: "HKUST ECE Profile", url: "https://ece.hkust.edu.hk/pascale", kind: "official" }, verified: true },
  { id: "song-industry", from: "yangqiu-song", to: "yangqiu-song", type: "industry", label: "WeBank / Amazon / Huawei / MSRA / IBM", evidence: "个人主页与 HKUST 简介记录 HKUST–WeBank Joint Lab，以及 Amazon A9/Rufus、Huawei Noah’s Ark、MSRA、IBM Research 经历。", source: { label: "Yangqiu Song 主页", url: "https://cse.hkust.edu.hk/~yqsong/", kind: "profile" }, verified: true },
  { id: "ma-msra", from: "wei-ying-ma", to: "wei-ying-ma", type: "industry", label: "MSRA / ByteDance AI Lab 领导经历", evidence: "CityU 官方讲席教授页记录其曾任 MSRA 常务副院长，以及 ByteDance 副总裁兼 AI Lab 负责人。", source: { label: "CityU Named Professorship", url: "https://www.cityu.edu.hk/named-professorship/named-professorship-scheme/named-chair-professorships/lee-shau-kee-chair-professorship-in-information-engineering", kind: "official" }, verified: true },
  { id: "li-tencent", from: "jing-li-polyu", to: "jing-li-polyu", type: "industry", label: "Tencent AI Lab 前高级研究员", evidence: "PolyU 官方简介记录其 2017–2019 年在 Tencent AI Lab NLP Center 任高级研究员。", source: { label: "PolyU Faculty Profile", url: "https://www.polyu.edu.hk/comp/People/Academic-Staff/Prof-LI-Jing-Amelia", kind: "official" }, verified: true },
  { id: "yang-hongxia-industry", from: "hongxia-yang", to: "hongxia-yang", type: "industry", label: "IBM / Yahoo / Alibaba DAMO / ByteDance", evidence: "公开主页列出 IBM Watson、Yahoo、Alibaba DAMO Director 与 ByteDance US Head of LLMs 经历。", source: { label: "Hongxia Yang 主页", url: "https://www4.comp.polyu.edu.hk/~hongxyang/", kind: "profile" }, verified: true },
  { id: "cao-industry", from: "liangliang-cao", to: "liangliang-cao", type: "industry", label: "Google Speech / Apple Intelligence / Gemini", evidence: "PolyU 官方简介记录其领导 Google Cloud Speech 团队、担任 Apple Principal Scientist，并在 Google DeepMind Gemini 团队任 Director。", source: { label: "PolyU DSAI Profile", url: "https://www.polyu.edu.hk/dsai/people/academic-staff/cao-liangliang/?sc_lang=en", kind: "official" }, verified: true },
  { id: "qiang-industry", from: "qiang-yang-polyu", to: "qiang-yang-polyu", type: "industry", label: "WeBank / WeChat / Huawei Noah’s Ark", evidence: "PolyU 官方履历记录其曾任 WeBank CAIO、WeChat–HKUST Joint Lab 主任及 Huawei Noah’s Ark 创始主任。", source: { label: "PolyU Faculty Profile", url: "https://www.polyu.edu.hk/dsai/docdrive/personal/yangqiang.html", kind: "official" }, verified: true },
  { id: "ma-tencent", from: "jing-ma-hkbu", to: "jing-ma-hkbu", type: "industry", label: "Tencent Rhino-Bird Focused Research", evidence: "HKBU 公告确认 Jing Ma 入选 2024 Tencent Rhino-Bird Focused Research Program，项目为价值对齐可信大模型。", source: { label: "HKBU 公告", url: "https://www.comp.hkbu.edu.hk/v1/?id=204&page=fac_ach", kind: "official" }, verified: true },
  { id: "han-tencent", from: "bo-han-hkbu", to: "bo-han-hkbu", type: "industry", label: "Tencent WeChat AI Agents", evidence: "HKBU 公告记录其面向 Tencent WeChat 开展专家知识驱动的可信 AI Agents 研究。", source: { label: "HKBU 公告", url: "https://www.comp.hkbu.edu.hk/v1/?id=204&page=fac_ach", kind: "official" }, verified: true },
  { id: "ning-bytedance", from: "ning-miao", to: "ning-miao", type: "industry", label: "ByteDance AI Lab 前研究员", evidence: "Ning Miao 个人主页记录其加入 CityU 前曾在 ByteDance AI Lab 任研究员。", source: { label: "Ning Miao 主页", url: "https://www.ningmiao.space/", kind: "profile" }, verified: true },
  { id: "gang-industry", from: "gang-liu-cityu", to: "gang-liu-cityu", type: "industry", label: "Amazon / MIT–IBM Watson / IBM Fellowship", evidence: "Gang Liu 主页记录 Amazon Applied Scientist 实习、Broad Institute 与 MIT–IBM Watson AI Lab 研究实习，以及 IBM PhD Fellowship。", source: { label: "Gang Liu 主页", url: "https://liugangcode.github.io/", kind: "profile" }, verified: true },
  { id: "guo-google", from: "jianyuan-guo", to: "jianyuan-guo", type: "industry", label: "Google PhD Fellowship · 2022", evidence: "CityU PAPS 简介与个人主页均记录 Jianyuan Guo 获 2022 Google PhD Fellowship。", source: { label: "CityU PAPS", url: "https://www.cityu.edu.hk/vpti/presidential-assistant-professors-scheme/paps", kind: "official" }, verified: true },
  ...mainlandEnrichmentRelationships,
  ...mainlandRelationships,
  ...mainlandPhase2Relationships,
  ...usRelationships,
  ...fourRegionProfileRelationships,
  ...mainlandFullProfileRelationships,
  ...usFullProfileRelationships,
  ...sgHkFullProfileRelationships,
  ...mainlandFullProfileRelationships2,
  ...mainlandFullProfileRelationships3,
  ...mainlandAiCvRelationships,
  ...hkSgAiCvExpansionRelationships,
  ...usAiCvExpansionRelationships,
  ...systematicRosterRelationships,
];

export const coverage = [
  { region: "Singapore" as Region, institution: "NUS", core: 4, adjacent: 4, note: "传统 NLP + 多模态/检索；另列 4 位可信 AI、LLM 理论与系统相邻 PI" },
  { region: "Singapore" as Region, institution: "NTU", core: 7, adjacent: 1, note: "含 2025 年转入的 Wei Lu、Soujanya Poria；Shafiq Joty 为 on leave 状态" },
  { region: "Singapore" as Region, institution: "SUTD", core: 1, adjacent: 0, note: "当前核心名录为 Wenxuan Zhang；Wei Lu、Soujanya Poria 已转任 NTU" },
  { region: "Singapore" as Region, institution: "SMU", core: 2, adjacent: 0, note: "当前独立 PI；Jing Jiang 另列为历史/跨地区节点" },
  { region: "Singapore" as Region, institution: "A*STAR", core: 3, adjacent: 0, note: "研究院 PI：语音、机器翻译、区域语言与 NLP 部署" },
  { region: "Hong Kong" as Region, institution: "HKU", core: 3, adjacent: 1, note: "HKU NLP Group 为主轴；另列推荐、图学习与 agentic AI 相邻 PI" },
  { region: "Hong Kong" as Region, institution: "HKUST", core: 5, adjacent: 1, note: "HLTC / CAiRE 资深主线与 Junxian He、Yi R. Fung 两位发展期独立 PI 并存" },
  { region: "Hong Kong" as Region, institution: "CUHK", core: 3, adjacent: 2, note: "覆盖 SEEM 与 CSE：中文 NLP、检索、语音语言，以及多模态与 social AI 相邻层" },
  { region: "Hong Kong" as Region, institution: "CityU", core: 5, adjacent: 3, note: "包含 2025–2026 新引进的 Zhisong Zhang、Gang Liu、Ning Miao 与高效多模态 / LLM 系统相邻层" },
  { region: "Hong Kong" as Region, institution: "PolyU", core: 5, adjacent: 2, note: "传统 NLP、具身语言、生成式 AI 与新引进产业型讲席教授并存" },
  { region: "Hong Kong" as Region, institution: "HKBU", core: 2, adjacent: 2, note: "事实核查与知识增强 LLM 为核心；可信基础模型与视觉语言单列相邻层" },
  ...mainlandCoverage,
  ...mainlandPhase2Coverage,
  ...usCoverage,
];

export const communities = [
  { region: "Singapore" as Region, kicker: "成熟谱系与交叉方向", name: "NUS Language, Multimodal & Trustworthy AI", anchor: "Hwee Tou Ng · Min-Yen Kan · Tat-Seng Chua · Bryan Hooi", description: "传统 NLP、检索、多模态基础模型与可信 AI 并存，并形成跨 NUS、NTU、SUTD 与 SMU 的师承及合作联系。", color: "cobalt" },
  { region: "Singapore" as Region, kicker: "新生代独立组", name: "SUTD iNLP Lab", anchor: "Wenxuan Zhang", description: "聚焦多语言、多模态、Audio-Language 与 LLM Agents；曾任 Alibaba Singapore 研究科学家。", color: "lime" },
  { region: "Singapore" as Region, kicker: "多中心生态", name: "NTU NLP & Generative AI", anchor: "Shafiq Joty · Wei Lu · Soujanya Poria · Anh Tuan Luu", description: "多语言、可信 LLM、推理与多模态对话；学生产业去向覆盖 Salesforce、Apple、腾讯、华为、阿里与字节。", color: "coral" },
  { region: "Singapore" as Region, kicker: "研究院转化", name: "A*STAR Language Intelligence", anchor: "Ai Ti Aw · Nancy Chen · Jian Su", description: "东南亚语言、语音对话、国家多模态 LLM 与大规模技术部署。", color: "violet" },
  { region: "Singapore" as Region, kicker: "视觉与生成式智能", name: "Singapore Vision & Multimodal AI", anchor: "Mohan Kankanhalli · Mike Zheng Shou · Chen Change Loy · Ziwei Liu · Ngai-Man Cheung · Joo Hwee Lim", description: "NUS、NTU、SUTD 与 A*STAR 的视觉、多模态、视频生成、三维感知和神经符号研究形成跨机构网络。", color: "cobalt" },
  { region: "Singapore" as Region, kicker: "开放世界与可靠学习", name: "Trustworthy & Open-World AI", anchor: "Guansong Pang · Bryan Hooi · Kenji Kawaguchi · Yang You", description: "从异常检测、开放世界学习和可信基础模型，延伸到深度学习理论与大规模 AI 系统。", color: "lime" },
  { region: "Hong Kong" as Region, kicker: "早期语言技术主线", name: "HKUST Human Language Technology", anchor: "Pascale Fung · De Kai · Yangqiu Song", description: "从中文语言技术、机器翻译与语音，延伸到可信对话、知识图谱、RAG 与智能体。", color: "cobalt" },
  { region: "Hong Kong" as Region, kicker: "跨地区导师谱系", name: "CUHK NLP & IR Lineage", anchor: "Wai Lam · Kam-Fai Wong · Xixin Wu", description: "资深中文 NLP / IR 主线向香港本地与新加坡独立 PI 扩散，并连接事实核查与对话研究。", color: "lime" },
  { region: "Hong Kong" as Region, kicker: "新生代独立组", name: "HKU + CityU LLM Labs", anchor: "Tao Yu · Qi Liu · Zhisong Zhang · Ning Miao", description: "围绕推理、智能体、长上下文、对话式数据接口和语言模型机制形成的新增长层。", color: "coral" },
  { region: "Hong Kong" as Region, kicker: "产业回流型集群", name: "PolyU Generative AI & Systems", anchor: "Hongxia Yang · Liangliang Cao · Qiang Yang · Jing Li", description: "IBM、Microsoft、Google、Apple、Alibaba、ByteDance、Tencent 与 WeBank 的研究履历回流到高校。", color: "violet" },
  { region: "Hong Kong" as Region, kicker: "跨校视觉谱系", name: "Hong Kong MMLab Network", anchor: "Xiaogang Wang · Dahua Lin · Ping Luo", description: "CUHK 与 HKU 的 MMLab 研究谱系连接计算机视觉、视觉语言、生成式 AI、具身智能与产业研究经历。", color: "cobalt" },
  { region: "Hong Kong" as Region, kicker: "视觉、图形与内容生成", name: "Vision, Graphics & Generative AI", anchor: "Yizhou Yu · Qifeng Chen · Shiqi Wang · Lei Zhang · Jie Chen", description: "覆盖视觉计算、三维视觉、AIGC、图像复原、计算摄影与 AI for Art-Tech。", color: "lime" },
  { region: "Mainland China" as Region, kicker: "机器学习基础", name: "General Machine Learning & Reliable AI", anchor: "朱军 · 周志华 · 蔡登 · 陈恩红", description: "概率学习、集成学习、表征学习、数据挖掘与可靠 AI 构成通用机器学习的方法主线。", color: "cobalt" },
  { region: "Mainland China" as Region, kicker: "视觉到行动", name: "Vision, Multimodal & Embodied AI", anchor: "邢俊亮 · 王亦洲 · 施柏鑫 · 钟亦武 · 卢策吾 · 王延峰 · 翟广涛", description: "从视觉感知、视觉语言和三维空间推理，延伸到机器人学习、具身智能与医疗视觉。", color: "lime" },
  { region: "Mainland China" as Region, kicker: "视觉感知与内容智能", name: "Visual Perception, Video & Generative Media", anchor: "谭铁牛 · 王亮 · 孙哲南 · 吴飞 · 卜佳俊 · 薛向阳 · 吴祖煊 · 吴建鑫 · 路通 · 李厚强 · 江俊君 · 赵琛", description: "覆盖模式识别、生物识别、图像视频理解、跨媒体计算、内容生成和高效视觉学习。", color: "coral" },
  { region: "United States" as Region, kicker: "视觉基础与空间智能", name: "US Vision, Generative & Spatial Intelligence", anchor: "Fei-Fei Li · Jiajun Wu · Trevor Darrell · Alexei A. Efros · Antonio Torralba · Phillip Isola · Yann LeCun · Shree K. Nayar", description: "连接视觉识别、生成式视觉、计算摄影、世界模型与空间智能的代表性实验室。", color: "cobalt" },
  { region: "United States" as Region, kicker: "视觉语言与具身智能", name: "US Multimodal, Embodied & Robot Learning", anchor: "Deva Ramanan · Louis-Philippe Morency · Ali Farhadi · Dieter Fox · Kristen Grauman · Zsolt Kira · Bolei Zhou · Achuta Kadambi", description: "覆盖视觉语言、三维感知、第一视角学习、机器人学习和具身 AI。", color: "lime" },
  { region: "United States" as Region, kicker: "通用学习与科学智能", name: "US General ML, AI for Science & Data-Centric AI", anchor: "Rada Mihalcea · Satinder Singh Baveja · Rose Yu · Julian McAuley · Svetlana Lazebnik · Derek Hoiem · Jia Deng · Olga Russakovsky", description: "覆盖强化学习、时空机器学习、AI for Science、推荐系统、数据中心 AI 与可靠视觉。", color: "coral" },
  ...mainlandCommunities,
  ...mainlandPhase2Communities,
  ...usCommunities,
];

export const industryPathways: IndustryPathway[] = [
  { id: "sg-joty", region: "Singapore", kind: "JOINT / PARALLEL AFFILIATION", title: "Shafiq Joty ↔ Salesforce Research", description: "NTU 官方公告以 Salesforce Research、NTU 双重身份署名，是直接的学界—企业研究连接。", source: { label: "NTU 公告", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing", kind: "official" } },
  { id: "sg-zhang", region: "Singapore", kind: "PRIOR EMPLOYMENT", title: "Wenxuan Zhang ↔ Alibaba Singapore", description: "SUTD 官方简介记录其此前为 Alibaba Group Singapore 研究科学家，并获 Ali Star。", source: { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/profile/zhang-wenxuan", kind: "official" } },
  { id: "sg-chua", region: "Singapore", kind: "JOINT LAB + STARTUPS", title: "Tat-Seng Chua（蔡达成）↔ Sea / ViSenze / 6Estates", description: "公开主页列出 Sea–NExT Joint Lab、ViSenze 与 6Estates；学生 Guangda Li 任 ViSenze 联合创始人兼 CTO。", source: { label: "Chua Tat-Seng 主页", url: "https://www.chuatatseng.com/", kind: "profile" } },
  { id: "sg-lu", region: "Singapore", kind: "RESEARCH COLLABORATION", title: "Wei Lu ↔ Alibaba", description: "其在 SUTD 任职期间的公开报道记录了团队与 Alibaba 的 NLP 合作；Wei Lu 现已转任 NTU。", source: { label: "SUTD Story", url: "https://www.sutd.edu.sg/stories-listing/taking-natural-language-processing-to-greater-heights", kind: "official" } },
  { id: "sg-su", region: "Singapore", kind: "INDUSTRY RESEARCH CENTRE", title: "Jian Su ↔ Baidu–I²R", description: "A*STAR 官方页列其为 Baidu I²R Research Centre 联合主任。", source: { label: "A*STAR Profile", url: "https://research.a-star.edu.sg/researcher/jian-su/", kind: "official" } },
  { id: "hk-ma", region: "Hong Kong", kind: "RESEARCH LEADERSHIP", title: "Wei-Ying Ma（馬維英）↔ MSRA / ByteDance", description: "CityU 官方讲席教授页记录其曾任 MSRA 常务副院长、ByteDance 副总裁兼 AI Lab 负责人，相关技术进入 Bing、TikTok、Douyin、CapCut 与 Lark。", source: { label: "CityU Named Professorship", url: "https://www.cityu.edu.hk/named-professorship/named-professorship-scheme/named-chair-professorships/lee-shau-kee-chair-professorship-in-information-engineering", kind: "official" } },
  { id: "hk-hongxia", region: "Hong Kong", kind: "INDUSTRY-TO-ACADEMIA", title: "Hongxia Yang（杨红霞）↔ IBM / Yahoo / Alibaba / ByteDance", description: "其公开主页记录 IBM Watson、Yahoo、Alibaba DAMO Director 与 ByteDance US Head of LLMs 经历。", source: { label: "Hongxia Yang 主页", url: "https://www4.comp.polyu.edu.hk/~hongxyang/", kind: "profile" } },
  { id: "hk-cao", region: "Hong Kong", kind: "LARGE-SCALE AI SYSTEMS", title: "Liangliang Cao（曹亮亮）↔ Google / Apple / DeepMind", description: "PolyU 官方简介记录其领导 Google Cloud Speech、参与 Apple Intelligence，并在 Gemini / Project Astra 团队担任 Director。", source: { label: "PolyU DSAI Profile", url: "https://www.polyu.edu.hk/dsai/people/academic-staff/cao-liangliang/?sc_lang=en", kind: "official" } },
  { id: "hk-qiang", region: "Hong Kong", kind: "JOINT LAB + AI LEADERSHIP", title: "Qiang Yang（杨强）↔ WeBank / WeChat / Huawei", description: "PolyU 官方履历列出 WeBank CAIO、WeChat–HKUST Joint Lab 主任与 Huawei Noah’s Ark 创始主任等岗位。", source: { label: "PolyU Faculty Profile", url: "https://www.polyu.edu.hk/dsai/docdrive/personal/yangqiang.html", kind: "official" } },
  { id: "hk-jing", region: "Hong Kong", kind: "INDUSTRY RESEARCH + COLLABORATION", title: "Jing Li（李菁）↔ Tencent AI Lab / Huawei / Baidu", description: "PolyU 官方简介记录其为 Tencent AI Lab NLP Center 前高级研究员；个人主页另列 Huawei、Baidu、Tencent 研究合作。", source: { label: "PolyU Faculty Profile", url: "https://www.polyu.edu.hk/comp/People/Academic-Staff/Prof-LI-Jing-Amelia", kind: "official" } },
  { id: "hk-ning", region: "Hong Kong", kind: "PRIOR INDUSTRY RESEARCH", title: "Ning Miao（苗寧）↔ ByteDance AI Lab", description: "个人主页记录其曾任 ByteDance AI Lab 研究员；当前 Miaow Lab 聚焦 LLM reasoning、AI4Math 与生成模型。", source: { label: "Ning Miao 主页", url: "https://www.ningmiao.space/", kind: "profile" } },
  { id: "hk-gang", region: "Hong Kong", kind: "INDUSTRY + RESEARCH FUNDING", title: "Gang Liu（劉罡）↔ Amazon / MIT–IBM Watson / IBM", description: "其公开履历列出 Amazon Applied Scientist 实习、Broad Institute 与 MIT–IBM Watson AI Lab 研究实习，以及 IBM PhD Fellowship。", source: { label: "Gang Liu 主页", url: "https://liugangcode.github.io/", kind: "profile" } },
  { id: "hk-guo", region: "Hong Kong", kind: "INDUSTRY FELLOWSHIP", title: "Jianyuan Guo（郭健元）↔ Google", description: "CityU PAPS 官方简介记录其获得 2022 Google PhD Fellowship；该项为研究资助关系，不表示 Google 雇佣经历。", source: { label: "CityU PAPS", url: "https://www.cityu.edu.hk/vpti/presidential-assistant-professors-scheme/paps", kind: "official" } },
  ...mainlandEnrichmentIndustryPathways,
  ...mainlandIndustryPathways,
  ...mainlandPhase2IndustryPathways,
  ...usIndustryPathways,
];

const nusNlpAlumni: Source = { label: "NUS NLP Group alumni", url: "https://www.comp.nus.edu.sg/~nlp/people.html", kind: "official" };
const jotyStudents: Source = { label: "Shafiq Joty students & alumni", url: "https://raihanjoty.github.io/students.html", kind: "profile" };
const weiStudents: Source = { label: "SUTD / StatNLP alumni records", url: "https://www.sutd.edu.sg/esd/profile/lu-wei/", kind: "official" };
const chuaStudents: Source = { label: "Chua Tat-Seng students", url: "https://www.chuatatseng.com/", kind: "profile" };
const songStudents: Source = { label: "Yangqiu Song students", url: "https://cse.hkust.edu.hk/~yqsong/", kind: "profile" };
const wenjieStudents: Source = { label: "PolyU NLP Group members & alumni", url: "https://www4.comp.polyu.edu.hk/~cswjli/Group.html", kind: "profile" };

const miaowMembers: Source = { label: "Miaow Lab Team", url: "https://miaow-lab.github.io/team/", kind: "profile" };
const hooiMembers: Source = { label: "Bryan Hooi students", url: "https://bhooi.github.io/", kind: "profile" };

export const groupMembers: GroupMember[] = [
  { id: "hooi-zhiyuan-hu", teacherId: "bryan-hooi", name: "Zhiyuan Hu", role: "Student", focus: "Co-advised with See-Kiong Ng", source: hooiMembers },
  { id: "hooi-sara-bakic", teacherId: "bryan-hooi", name: "Sara Bakić", role: "Student", focus: "Co-advised with Mile Šikić", source: hooiMembers },
  { id: "hooi-ivona-martinovic", teacherId: "bryan-hooi", name: "Ivona Martinović", role: "Student", focus: "Co-advised with Mile Šikić", source: hooiMembers },
  { id: "hooi-yufei-he", teacherId: "bryan-hooi", name: "Yufei He", role: "Student", source: hooiMembers },
  { id: "hooi-yuan-sui", teacherId: "bryan-hooi", name: "Yuan Sui", role: "Student", source: hooiMembers },
  { id: "hooi-yue-liu", teacherId: "bryan-hooi", name: "Yue Liu", role: "Student", focus: "Co-advised with Jiaheng Zhang", source: hooiMembers },
  { id: "hooi-yulin-chen", teacherId: "bryan-hooi", name: "Yulin Chen", role: "Student", source: hooiMembers },
  { id: "hooi-yuexin-li", teacherId: "bryan-hooi", name: "Yuexin Li", role: "Student", focus: "Co-advised with Jiaheng Zhang", source: hooiMembers },
  { id: "hooi-tri-cao", teacherId: "bryan-hooi", name: "Tri Cao", role: "Student", focus: "Co-advised with Shuicheng Yan", source: hooiMembers },
  { id: "hooi-yibo-li", teacherId: "bryan-hooi", name: "Yibo Li", role: "Student", source: hooiMembers },
  { id: "hooi-shuo-ji", teacherId: "bryan-hooi", name: "Shuo Ji", role: "Student", source: hooiMembers },
  { id: "miaow-jiayu", teacherId: "ning-miao", name: "Jiayu Liu", role: "Research Assistant Professor", focus: "Machine reasoning", source: miaowMembers },
  { id: "miaow-yuhang", teacherId: "ning-miao", name: "Yuhang Lai", role: "PhD Student", focus: "AI4Math · LLM reasoning", source: miaowMembers },
  { id: "miaow-ningyuan", teacherId: "ning-miao", name: "Ningyuan Xi", role: "PhD Student", focus: "LLM reasoning", source: miaowMembers },
  { id: "miaow-qiyuan", teacherId: "ning-miao", name: "Qiyuan Liu", role: "PhD Student", focus: "Reward models", source: miaowMembers },
  { id: "miaow-tianle", teacherId: "ning-miao", name: "Tianle Wang", role: "PhD Student", focus: "Reasoning training", source: miaowMembers },
  { id: "miaow-xuan", teacherId: "ning-miao", name: "Xuan Yang", role: "PhD Student", focus: "Reasoning interpretability", source: miaowMembers },
  { id: "miaow-yuxian", teacherId: "ning-miao", name: "Yuxian Jiang", role: "PhD Student", source: miaowMembers },
  { id: "miaow-ruizhi", teacherId: "ning-miao", name: "Ruizhi Zhao", role: "Engineer", source: miaowMembers },
  ...mainlandEnrichmentGroupMembers,
  ...mainlandGroupMembers,
  ...mainlandPhase2GroupMembers,
  ...usGroupMembers,
  ...fourRegionProfileGroupMembers,
  ...mainlandFullProfileGroupMembers,
  ...usFullProfileGroupMembers,
  ...sgHkFullProfileGroupMembers,
  ...mainlandFullProfileGroupMembers2,
  ...mainlandFullProfileGroupMembers3,
  ...mainlandAiCvGroupMembers,
  ...hkSgAiCvExpansionGroupMembers,
  ...usAiCvExpansionGroupMembers,
  ...systematicRosterGroupMembers,
];

export const studentPlacements: StudentPlacement[] = [
  { id: "ng-chan-bbn", student: "Yee Seng Chan", teacherId: "hwee-tou-ng", company: "Raytheon BBN", role: "Scientist", kind: "first_job", source: nusNlpAlumni },
  { id: "ng-chia-tl", student: "Tee Kiah Chia", teacherId: "hwee-tou-ng", company: "Temasek Labs", role: "Research Scientist", kind: "first_job", source: nusNlpAlumni },
  { id: "ng-zhao-elance", student: "Shanheng Zhao", teacherId: "hwee-tou-ng", company: "Elance", role: "Senior Software Engineer", kind: "first_job", highLevel: true, source: nusNlpAlumni },
  { id: "ng-lin-citi", student: "Ziheng Lin", teacherId: "hwee-tou-ng", company: "Citi", department: "Singapore Data Science", role: "Data Scientist", kind: "first_job", source: nusNlpAlumni },
  { id: "ng-zhong-meta", student: "Zhi Zhong", teacherId: "hwee-tou-ng", company: "Meta", department: "Facebook US", role: "Software Engineer", kind: "first_job", source: nusNlpAlumni },
  { id: "ng-dahlmeier-sap", student: "Daniel Dahlmeier", teacherId: "hwee-tou-ng", company: "SAP", department: "Singapore Research", role: "Research Team Lead", kind: "first_job", highLevel: true, source: nusNlpAlumni },
  { id: "ng-wang-mz", student: "Pidong Wang", teacherId: "hwee-tou-ng", company: "Machine Zone", role: "Senior Platform NLP Engineer", kind: "first_job", highLevel: true, source: nusNlpAlumni },

  { id: "chua-li-visenze", student: "Guangda Li", teacherId: "tat-seng-chua", company: "ViSenze / Rezolve AI", department: "Visual Search", role: "Co-founder & CTO", kind: "founder", highLevel: true, note: "ViSenze 于 2025 年被 Rezolve AI 收购。", source: { label: "NUS ViSenze startup story", url: "https://enterprise.nus.edu.sg/startup-story/visenze/", kind: "official" } },
  { id: "chua-farseev-somin", student: "Aleksandr Farseev", teacherId: "tat-seng-chua", company: "SOMIN.ai", role: "Founder & CEO", kind: "founder", highLevel: true, source: chuaStudents },

  { id: "joty-li-miromind", student: "Xingxuan Li", teacherId: "shafiq-joty", company: "MiroMind", role: "Research Scientist", kind: "current", source: jotyStudents },
  { id: "joty-zhao-apple", student: "Ruochen Zhao", teacherId: "shafiq-joty", company: "Apple", role: "Research Engineer", kind: "current", source: jotyStudents },
  { id: "joty-chen-salesforce", student: "Hailin Chen", teacherId: "shafiq-joty", company: "Salesforce", department: "AI Research · US", role: "Research Scientist", kind: "current", source: jotyStudents },
  { id: "joty-nguyen-salesforce", student: "Xuan Phi Nguyen", teacherId: "shafiq-joty", company: "Salesforce", department: "AI Research · US", role: "Research Scientist", kind: "current", source: jotyStudents },
  { id: "joty-ravaut-adia", student: "Mathieu Ravaut", teacherId: "shafiq-joty", company: "ADIA", role: "Research Scientist", kind: "current", source: jotyStudents },
  { id: "joty-lin-gic", student: "Xiang Lin", teacherId: "shafiq-joty", company: "GIC", department: "Singapore", role: "Quant / NLP Researcher", kind: "current", source: jotyStudents },
  { id: "joty-bari-sdaia", student: "M Saiful Bari", teacherId: "shafiq-joty", company: "SDAIA", role: "Senior Research Scientist", kind: "current", highLevel: true, source: jotyStudents },
  { id: "joty-moon-samsung", student: "Han-Cheol Moon", teacherId: "shafiq-joty", company: "Samsung Research", role: "Machine Learning Engineer", kind: "current", source: jotyStudents },
  { id: "joty-liu-cubist", student: "Linlin Liu", teacherId: "shafiq-joty", company: "Cubist", department: "Systematic Strategies", role: "Data Scientist", kind: "current", source: jotyStudents },
  { id: "joty-wang-sap", student: "Weishi Wang", teacherId: "shafiq-joty", company: "SAP", department: "Singapore", role: "Data Scientist", kind: "current", source: jotyStudents },
  { id: "joty-jwalapuram-rakuten", student: "Prathyusha Jwalapuram", teacherId: "shafiq-joty", company: "Rakuten", department: "Singapore", role: "Research Scientist", kind: "current", source: jotyStudents },
  { id: "joty-tan-aws", student: "Samson Tan", teacherId: "shafiq-joty", company: "Amazon AWS", department: "AI Research & Education · US", role: "Applied Scientist", kind: "current", source: jotyStudents },
  { id: "joty-mohiuddin-huawei", student: "Tasnim Mohiuddin", teacherId: "shafiq-joty", company: "Huawei", department: "Singapore Research Center", role: "NLP Researcher", kind: "current", source: jotyStudents },
  { id: "joty-tung-astar", student: "Nguyen Thanh Tung", teacherId: "shafiq-joty", company: "A*STAR", department: "I²R", role: "Research Scientist", kind: "current", source: jotyStudents },

  { id: "lu-guo-cambridge", student: "Zhijiang Guo", teacherId: "wei-lu", company: "University of Cambridge", role: "Research / faculty track", kind: "current", source: weiStudents },
  { id: "lu-zou-jd", student: "Yanyan Zou", teacherId: "wei-lu", company: "JD", department: "Beijing", role: "NLP researcher", kind: "first_job", source: weiStudents },
  { id: "lu-li-tencent", student: "Hao Li", teacherId: "wei-lu", company: "Tencent", department: "Singapore", role: "NLP researcher", kind: "first_job", source: weiStudents },
  { id: "lu-jie-salesforce", student: "Allan Jie", teacherId: "wei-lu", company: "Salesforce", department: "Singapore", role: "NLP researcher", kind: "first_job", note: "公开履历存在后续流动记录；此处保留 SUTD 官方 alumni 页所列去向。", source: weiStudents },
  { id: "lu-xu-huawei", student: "Lu Xu", teacherId: "wei-lu", company: "Huawei", department: "Singapore", role: "NLP researcher · EDB IPP", kind: "first_job", source: weiStudents },
  { id: "lu-cheng-alibaba", student: "Liying Cheng", teacherId: "wei-lu", company: "Alibaba", department: "Singapore", role: "NLP researcher · EDB IPP", kind: "first_job", source: weiStudents },
  { id: "lu-sun-astar", student: "Richard Sun", teacherId: "wei-lu", company: "A*STAR", department: "Singapore", role: "Researcher", kind: "first_job", source: weiStudents },
  { id: "lu-li-bytedance", student: "Haoran Li", teacherId: "wei-lu", company: "ByteDance", department: "Beijing", role: "NLP researcher", kind: "first_job", source: weiStudents },

  { id: "song-cheng-qwen", student: "Jiayang Cheng", teacherId: "yangqiu-song", company: "Alibaba", department: "Qwen", role: "Researcher", kind: "first_job", source: songStudents },
  { id: "song-wang-hunyuan", student: "Weiqi Wang", teacherId: "yangqiu-song", company: "Tencent", department: "Hunyuan · Beijing", role: "Researcher", kind: "first_job", source: songStudents },
  { id: "song-hu-bytedance", student: "Qi Hu", teacherId: "yangqiu-song", company: "ByteDance", department: "Shanghai", role: "Researcher", kind: "first_job", source: songStudents },
  { id: "song-lin-faculty", student: "Zizheng Lin", teacherId: "yangqiu-song", company: "Xiamen University of Technology", role: "Faculty", kind: "first_job", source: songStudents },

  { id: "wenjie-wei-msra", student: "Furu Wei", teacherId: "wenjie-li", company: "Microsoft Research Asia", department: "Natural Language Computing Group", role: "Lead Researcher", kind: "reported", highLevel: true, source: wenjieStudents },
  { id: "wenjie-cao-ms", student: "Guihong Cao", teacherId: "wenjie-li", company: "Microsoft", department: "Redmond", role: "Researcher", kind: "reported", source: wenjieStudents },
  { id: "wenjie-hu-alibaba", student: "Yi Hu", teacherId: "wenjie-li", company: "Alibaba", department: "Hangzhou", role: "Researcher", kind: "reported", source: wenjieStudents },
  { id: "wenjie-chen-tencent", student: "Qiang Chen", teacherId: "wenjie-li", company: "Tencent", role: "Researcher", kind: "reported", source: wenjieStudents },
  { id: "wenjie-wang-tencent", student: "Wei Wang", teacherId: "wenjie-li", company: "Tencent", role: "Researcher", kind: "reported", source: wenjieStudents },
  { id: "wenjie-ye-baidu", student: "Wen Ye", teacherId: "wenjie-li", company: "Baidu", role: "Researcher", kind: "reported", source: wenjieStudents },
  { id: "wenjie-zhang-baidu", student: "Ji Zhang", teacherId: "wenjie-li", company: "Baidu", role: "Researcher", kind: "reported", source: wenjieStudents },
  ...mainlandEnrichmentStudentPlacements,
  ...mainlandStudentPlacements,
  ...usStudentPlacements,
  ...fourRegionProfileStudentPlacements,
  ...mainlandFullProfileStudentPlacements,
  ...usFullProfileStudentPlacements,
  ...sgHkFullProfileStudentPlacements,
  ...mainlandFullProfileStudentPlacements2,
  ...mainlandFullProfileStudentPlacements3,
  ...mainlandAiCvPlacements,
  ...hkSgAiCvExpansionPlacements,
  ...usAiCvExpansionPlacements,
  ...systematicRosterPlacements,
];
