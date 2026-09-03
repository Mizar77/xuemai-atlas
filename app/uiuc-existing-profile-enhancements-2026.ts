import type { Person, Source } from "./data";

const checkedAt = "2026-09-03";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  juliaOfficial: source(
    "UIUC Siebel School · Julia Hockenmaier",
    "https://siebelschool.illinois.edu/about/people/all-faculty/juliahmr",
    "official",
    "Current UIUC appointment, title, research areas and official portrait",
  ),
  juliaHome: source(
    "Julia Hockenmaier · homepage",
    "https://juliahmr.cs.illinois.edu/index.html",
    "profile",
    "Current role, NLP research, Edinburgh doctorate with Mark Steedman and Penn postdoc with Aravind Joshi",
  ),
  juliaLab: source(
    "Human-Machine Relations Laboratory",
    "https://hmr-lab.github.io/",
    "profile",
    "Lab identity and current research programme in NLP, dialogue, interpretability and language-model evaluation",
  ),
  juliaTeam: source(
    "Human-Machine Relations Laboratory · team",
    "https://hmr-lab.github.io/team/",
    "profile",
    "Current team and public alumni destinations including Microsoft, Amazon, Google, CMU and A9",
  ),
  zhaiOfficial: source(
    "UIUC Siebel School · ChengXiang Zhai",
    "https://siebelschool.illinois.edu/about/people/all-faculty/czhai",
    "official",
    "Current UIUC faculty appointment, research areas and official portrait",
  ),
  zhaiGrainger: source(
    "Grainger Engineering · ChengXiang Zhai",
    "https://grainger.illinois.edu/about/directory/faculty/czhai",
    "official",
    "Donald Biggar Willett Professorship and research-area affiliations",
  ),
  zhaiIschool: source(
    "UIUC School of Information Sciences · ChengXiang Zhai",
    "https://ischool.illinois.edu/people/chengxiang-zhai",
    "official",
    "CMU and Nanjing University doctorates and research programme spanning IR, data mining, NLP and machine learning",
  ),
  zhaiHome: source(
    "ChengXiang Zhai · homepage",
    "https://czhai.cs.illinois.edu/",
    "profile",
    "TIMAN and DAIS groups, intelligent information systems, human-AI collaboration, awards and mentoring recognition",
  ),
};

const portrait = (
  id: string,
  name: string,
  proof: Source,
): NonNullable<Person["portrait"]> => ({
  src: `portraits/uiuc-existing-profile-2026/${id}.jpg`,
  alt: `${name} UIUC 官方头像`,
  source: proof,
});

/**
 * Minimal quality correction for two current UIUC professors that entered the
 * atlas earlier as external lineage-only nodes.  Integration should merge these
 * fields onto the existing IDs instead of creating duplicate people.
 */
export const uiucExistingProfileEnhancements2026: Record<string, Partial<Person>> = {
  "julia-hockenmaier-lineage": {
    role: "Professor · Willett Faculty Scholar",
    institution: "UIUC",
    actualInstitution: "University of Illinois Urbana-Champaign",
    region: "United States",
    area: "Natural Language Processing · Multimodal Learning · Language Models",
    tags: ["UIUC", "HMR Lab", "NLP", "Multimodal Learning", "Mark Steedman", "Aravind Joshi"],
    summary: "UIUC Human-Machine Relations Lab 负责人，研究自然语言处理、多模态与协作对话、可解释性和长文本生成评测；学术训练连接 Edinburgh 的 Mark Steedman 与 Penn 的 Aravind Joshi。",
    facts: [
      { label: "当前任职", value: "Professor and Willett Faculty Scholar, UIUC Siebel School of Computing and Data Science", source: sources.juliaOfficial },
      { label: "博士师承", value: "University of Edinburgh Informatics PhD；博士导师 Mark Steedman", source: sources.juliaHome },
      { label: "博士后训练", value: "University of Pennsylvania 博士后；合作导师 Aravind Joshi", source: sources.juliaHome },
      { label: "研究共同体", value: "负责人：Human-Machine Relations Laboratory；研究覆盖基础 NLP、具身协作对话、机制可解释性与长文本生成评测", source: sources.juliaLab },
      { label: "人才流向", value: "实验室公开校友页记录了 Microsoft、Amazon、Google、CMU 与 A9 等学术及产业去向", source: sources.juliaTeam },
    ],
    stage: "senior",
    category: "core",
    status: "current independent PI · UIUC official roster verified",
    sources: [sources.juliaOfficial, sources.juliaHome, sources.juliaLab, sources.juliaTeam],
    primary: true,
    lastVerifiedAt: checkedAt,
    portrait: portrait("julia-hockenmaier-lineage", "Julia Hockenmaier", sources.juliaOfficial),
  },
  "chengxiang-zhai-lineage": {
    role: "Donald Biggar Willett Professor in Engineering",
    institution: "UIUC",
    actualInstitution: "University of Illinois Urbana-Champaign",
    region: "United States",
    area: "Information Retrieval · Natural Language Processing · Data Mining · Human-AI Collaboration",
    tags: ["UIUC", "TIMAN", "DAIS", "Information Retrieval", "NLP", "Human-AI Collaboration"],
    summary: "UIUC 信息检索、文本挖掘与智能信息系统资深 PI，研究从搜索与推荐延伸至 NLP、智能体和人机协作，并建设 TIMAN 与 DAIS 研究团队。",
    facts: [
      { label: "当前任职", value: "Donald Biggar Willett Professor in Engineering, UIUC", source: sources.zhaiGrainger },
      { label: "教育", value: "Carnegie Mellon University Language and Information Technologies PhD；Nanjing University Computer Science PhD", source: sources.zhaiIschool },
      { label: "研究主线", value: "信息检索、数据挖掘、自然语言处理、机器学习、生物医学信息学与智能教育系统", source: sources.zhaiIschool },
      { label: "研究共同体", value: "TIMAN 与 DAIS；研究智能信息系统、搜索、推荐、文本分析、聊天机器人、智能体和人机协作", source: sources.zhaiHome },
      { label: "学术影响", value: "个人主页记录 ACM Fellow、2021 ACM SIGIR Gerard Salton Award 与 UIUC Graduate Mentoring Award", source: sources.zhaiHome },
    ],
    stage: "senior",
    category: "core",
    status: "current independent PI · UIUC official roster verified",
    sources: [sources.zhaiOfficial, sources.zhaiGrainger, sources.zhaiIschool, sources.zhaiHome],
    primary: true,
    lastVerifiedAt: checkedAt,
    portrait: portrait("chengxiang-zhai-lineage", "ChengXiang Zhai", sources.zhaiOfficial),
  },
};

export const uiucExistingProfilePortraits2026: Record<string, NonNullable<Person["portrait"]>> = {
  "julia-hockenmaier-lineage": portrait("julia-hockenmaier-lineage", "Julia Hockenmaier", sources.juliaOfficial),
  "chengxiang-zhai-lineage": portrait("chengxiang-zhai-lineage", "ChengXiang Zhai", sources.zhaiOfficial),
};

export const enhancements = uiucExistingProfileEnhancements2026;
export const portraits = uiucExistingProfilePortraits2026;
