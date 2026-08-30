import type { Source } from "./data";

export type CompanyLineageAdviser = {
  name: string;
  institution: string;
  relation: "博士导师" | "共同博士导师" | "本科导师";
  teacherId?: string;
  source: Source;
};

export type CompanyLineageRecord = {
  id: string;
  company:
    | "ByteDance Seed"
    | "Alibaba Qwen"
    | "Moonshot AI / Kimi"
    | "Zhipu AI / GLM"
    | "OpenAI"
    | "Anthropic"
    | "Meta FAIR"
    | "Character.AI · Founding Team"
    | "Thinking Machines Lab"
    | "Safe Superintelligence (SSI)"
    | "Google DeepMind";
  companyShort: string;
  companyColor: string;
  companyAccent: string;
  researcher: string;
  role: string;
  team: string;
  contribution: string;
  currentStatusSource: Source;
  affiliationStatus?: "current" | "historical";
  affiliationPeriod?: string;
  lastVerifiedAt: string;
  workTitle: string;
  workYear: number;
  workType: "技术报告" | "论文";
  workSource: Source;
  workEvidence: string;
  advisers: CompanyLineageAdviser[];
};

const checkedAt = "2026-08-30";

const profile = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "profile",
  checkedAt,
  supports,
});

const publication = (label: string, url: string, supports: string, asOf: string): Source => ({
  label,
  url,
  kind: "publication",
  asOf,
  checkedAt,
  supports,
});

const wanjunProfile = profile(
  "Wanjun Zhong 个人主页",
  "https://zhongwanjun.github.io/",
  "Current ByteDance Seed role, TopSeed membership, general-agent contribution and named PhD advisers",
);
const fangzhiProfile = profile(
  "Fangzhi Xu 个人主页",
  "https://xufangzhi.github.io/",
  "Current ByteDance Seed role, research focus and Jun Liu doctoral supervision",
);
const bowenProfile = profile(
  "Bowen Yu 个人主页",
  "https://yubowen-ph.github.io/",
  "Current Qwen algorithm-expert role, post-training leadership and doctoral advisers",
);
const chujieProfile = profile(
  "Chujie Zheng 个人主页",
  "https://chujiezheng.github.io/",
  "Current Qwen researcher role and reinforcement-learning focus",
);
const chujieCv: Source = {
  label: "Chujie Zheng CV",
  url: "https://chujiezheng.github.io/_pages/cv_chujie_en.pdf",
  kind: "cv",
  checkedAt,
  supports: "Tsinghua doctoral study under Minlie Huang and Qwen foundation-model work",
};
const zhilinProfile = profile(
  "Zhilin Yang 个人主页",
  "https://kimiyoung.github.io/",
  "CMU PhD co-advisers and Tsinghua undergraduate adviser",
);
const zhilinRole: Source = {
  label: "2026 中关村论坛 · 杨植麟",
  url: "https://www.zgcforum.com.cn/en2026/guest/t23806/962869",
  kind: "official",
  checkedAt,
  supports: "Moonshot AI / Kimi founder and CEO role",
};
const zhengxiaoProfile = profile(
  "Zhengxiao Du 个人主页",
  "https://zxdu.xyz/",
  "GLM base-model co-lead role, Zhipu AI experience and Jie Tang doctoral supervision",
);
const noamBrownProfile = profile(
  "Noam Brown 个人主页",
  "https://noambrown.com/",
  "Current OpenAI research-scientist role, reasoning-model focus and CMU adviser",
);
const nicholasCarliniProfile = profile(
  "Nicholas Carlini 个人主页",
  "https://nicholas.carlini.com/",
  "Current Anthropic role, research focus and UC Berkeley doctoral adviser",
);
const lukeZettlemoyerProfile = profile(
  "Luke Zettlemoyer 个人主页",
  "https://homes.cs.washington.edu/~lsz/",
  "Current Meta FAIR Senior Research Director role and academic biography",
);
const lukeAdviserSource = profile(
  "Michael Collins · Former Group Members",
  "https://www.cs.columbia.edu/~mcollins/group.html",
  "Luke Zettlemoyer's MIT PhD co-advisers Michael Collins and Leslie Kaelbling",
);
const characterFounderSource = profile(
  "Character.AI · Optimizing Large-Scale Pretraining",
  "https://blog.character.ai/squinch/",
  "Noam Shazeer's historical co-founder role and named leadership of early Character.AI pretraining work",
);
const characterDepartureSource: Source = {
  label: "Character.AI founding team returns to Google",
  url: "https://www.washingtonpost.com/technology/2024/08/02/google-character-ai-noam-shazeer/",
  kind: "company",
  asOf: "2024-08",
  checkedAt,
  supports: "Noam Shazeer and Daniel De Freitas left Character.AI to join Google in August 2024",
};
const thinkingMachinesTeam = profile(
  "Thinking Machines Lab · Founding Team",
  "https://thinkingmachines.ai/",
  "John Schulman's current Chief Scientist role and founding-team membership",
);
const johnSchulmanThesis: Source = {
  label: "UC Berkeley · John Schulman PhD thesis",
  url: "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2016/EECS-2016-217.html",
  kind: "thesis",
  checkedAt,
  supports: "Pieter Abbeel as John Schulman's PhD adviser",
};
const ssiStatus: Source = {
  label: "NVIDIA × Safe Superintelligence",
  url: "https://nvidianews.nvidia.com/news/ilya-sutskevers-safe-superintelligence-inc-and-nvidia-announce-long-term-strategic-partnership-6927408",
  kind: "company",
  checkedAt,
  supports: "SSI is led by Ilya Sutskever and Daniel Levy as of July 2026",
};
const hintonStudents = profile(
  "Geoffrey Hinton · Former PhD Students",
  "https://www.cs.toronto.edu/~hinton/gradstuphd.html",
  "Ilya Sutskever as Geoffrey Hinton's former PhD student",
);
const korayAdviserSource = profile(
  "Yann LeCun · Former PhD Students",
  "https://yann.lecun.org/",
  "Koray Kavukcuoglu's 2010 NYU PhD under Yann LeCun",
);

export const companyResearchLineages: CompanyLineageRecord[] = [
  {
    id: "seed-wanjun-zhong",
    company: "ByteDance Seed",
    companyShort: "SEED",
    companyColor: "#111827",
    companyAccent: "#42e8c6",
    researcher: "Wanjun Zhong · 钟宛君",
    role: "Senior Research Scientist · TopSeed",
    team: "Seed Edge · General Agent",
    contribution: "个人主页明确列为通用 Agent 优化算法负责人之一，并记录 Seed 1.8、2.0、2.1 核心贡献。",
    currentStatusSource: wanjunProfile,
    lastVerifiedAt: checkedAt,
    workTitle: "Agent-World: Scaling Real-World Environment Synthesis for Evolving General Agent Intelligence",
    workYear: 2026,
    workType: "论文",
    workSource: publication(
      "Agent-World",
      "https://arxiv.org/abs/2604.18292",
      "Named authorship on a representative ByteDance Seed general-agent paper",
      "2026-04",
    ),
    workEvidence: "论文作者名单包含 Wanjun Zhong；个人主页另行核验其当前 Seed 职责，二者不混作同一证据。",
    advisers: [
      { name: "Ming Zhou · 周明", institution: "Microsoft Research Asia", relation: "共同博士导师", source: wanjunProfile },
      { name: "Jian Yin · 印鉴", institution: "Sun Yat-sen University", relation: "共同博士导师", source: wanjunProfile },
      { name: "Jiahai Wang · 王嘉海", institution: "Sun Yat-sen University", relation: "共同博士导师", source: wanjunProfile },
    ],
  },
  {
    id: "seed-fangzhi-xu",
    company: "ByteDance Seed",
    companyShort: "SEED",
    companyColor: "#111827",
    companyAccent: "#42e8c6",
    researcher: "Fangzhi Xu · 徐方植",
    role: "Researcher",
    team: "GUI / Computer-Using Agents",
    contribution: "个人主页记录其 2026 年加入 Seed，研究 GUI 与 Computer-Using Agents；这里不把加入前的论文自动算作公司成果。",
    currentStatusSource: fangzhiProfile,
    lastVerifiedAt: checkedAt,
    workTitle: "OS-ATLAS: A Foundation Action Model for Generalist GUI Agents",
    workYear: 2024,
    workType: "论文",
    workSource: publication(
      "OS-ATLAS",
      "https://arxiv.org/abs/2410.23218",
      "Named authorship establishing the researcher's representative GUI-agent work before joining Seed",
      "2024-10",
    ),
    workEvidence: "论文证明其 GUI Agent 技术轨迹；当前 Seed 任职由个人主页单独核验，明确避免倒推论文归属。",
    advisers: [
      { name: "Jun Liu · 刘均", institution: "Xi'an Jiaotong University", relation: "博士导师", teacherId: "jun-liu-xjtu", source: fangzhiProfile },
    ],
  },
  {
    id: "qwen-bowen-yu",
    company: "Alibaba Qwen",
    companyShort: "QWEN",
    companyColor: "#2b245b",
    companyAccent: "#a78bfa",
    researcher: "Bowen Yu · 郁博文",
    role: "Algorithm Expert · Post-training Lead",
    team: "Qwen-Instruct · Alignment",
    contribution: "个人主页明确称其领导 Qwen 后训练研究和 Qwen-Instruct 开发。",
    currentStatusSource: bowenProfile,
    lastVerifiedAt: checkedAt,
    workTitle: "Qwen2.5 Technical Report",
    workYear: 2024,
    workType: "技术报告",
    workSource: publication(
      "Qwen2.5 Technical Report",
      "https://arxiv.org/abs/2412.15115",
      "Listed as a core contributor in the report contribution statement",
      "2024-12",
    ),
    workEvidence: "报告附录将 Bowen Yu 列为 Core Contributor；其后训练负责人职责由个人主页核验。",
    advisers: [
      { name: "Tingwen Liu · 刘汀文", institution: "Institute of Information Engineering, CAS", relation: "共同博士导师", source: bowenProfile },
      { name: "Bin Wang · 王斌", institution: "Institute of Information Engineering, CAS", relation: "共同博士导师", source: bowenProfile },
    ],
  },
  {
    id: "qwen-chujie-zheng",
    company: "Alibaba Qwen",
    companyShort: "QWEN",
    companyColor: "#2b245b",
    companyAccent: "#a78bfa",
    researcher: "Chujie Zheng · 郑楚杰",
    role: "Researcher",
    team: "Reinforcement Learning · Model Scaling",
    contribution: "个人主页明确写明其在 Qwen 研究和扩展下一代模型的强化学习方法。",
    currentStatusSource: chujieProfile,
    lastVerifiedAt: checkedAt,
    workTitle: "Qwen2.5 Technical Report",
    workYear: 2024,
    workType: "技术报告",
    workSource: publication(
      "Qwen2.5 Technical Report",
      "https://arxiv.org/abs/2412.15115",
      "Listed as a contributor in the report contribution statement",
      "2024-12",
    ),
    workEvidence: "报告附录将 Chujie Zheng 列为 Contributor；当前 Qwen 研究职位由个人主页核验，不提升为未声明的负责人。",
    advisers: [
      { name: "Minlie Huang · 黄民烈", institution: "Tsinghua University", relation: "博士导师", teacherId: "minlie-huang", source: chujieCv },
    ],
  },
  {
    id: "kimi-zhilin-yang",
    company: "Moonshot AI / Kimi",
    companyShort: "KIMI",
    companyColor: "#172554",
    companyAccent: "#60a5fa",
    researcher: "Zhilin Yang · 杨植麟",
    role: "Founder & CEO",
    team: "Foundation Models",
    contribution: "Kimi-VL 报告的贡献声明将其列为 Core Contributor；创始人兼 CEO 身份由权威活动页面另行核验。",
    currentStatusSource: zhilinRole,
    lastVerifiedAt: checkedAt,
    workTitle: "Kimi-VL Technical Report",
    workYear: 2025,
    workType: "技术报告",
    workSource: publication(
      "Kimi-VL Technical Report",
      "https://arxiv.org/abs/2504.07491",
      "Listed as a core contributor in the report contribution statement",
      "2025-04",
    ),
    workEvidence: "报告附录明确区分 Core Contributors 与 Contributors，并把 Zhilin Yang 列在前者。",
    advisers: [
      { name: "Ruslan Salakhutdinov", institution: "Carnegie Mellon University", relation: "共同博士导师", teacherId: "ruslan-salakhutdinov-us", source: zhilinProfile },
      { name: "William W. Cohen", institution: "Carnegie Mellon University", relation: "共同博士导师", source: zhilinProfile },
      { name: "Jie Tang · 唐杰", institution: "Tsinghua University", relation: "本科导师", teacherId: "jie-tang-thu", source: zhilinProfile },
    ],
  },
  {
    id: "glm-zhengxiao-du",
    company: "Zhipu AI / GLM",
    companyShort: "GLM",
    companyColor: "#3f102d",
    companyAccent: "#fb7185",
    researcher: "Zhengxiao Du · 杜正霄",
    role: "Tech Lead · Base-model Co-lead",
    team: "GLM Base Model · Pre-training",
    contribution: "个人主页明确写明其共同负责 GLM 基座模型，并在智谱共同带领 ChatGLM 预训练团队。",
    currentStatusSource: zhengxiaoProfile,
    lastVerifiedAt: checkedAt,
    workTitle: "GLM: General Language Model Pretraining with Autoregressive Blank Infilling",
    workYear: 2022,
    workType: "论文",
    workSource: publication(
      "ACL 2022 · GLM",
      "https://aclanthology.org/2022.acl-long.26/",
      "First-author record for the foundational GLM paper",
      "2022-05",
    ),
    workEvidence: "ACL Anthology 列 Zhengxiao Du 为 GLM 论文第一作者；当前团队职责由个人主页核验。",
    advisers: [
      { name: "Jie Tang · 唐杰", institution: "Tsinghua University", relation: "博士导师", teacherId: "jie-tang-thu", source: zhengxiaoProfile },
    ],
  },
  {
    id: "openai-noam-brown",
    company: "OpenAI",
    companyShort: "OPENAI",
    companyColor: "#111827",
    companyAccent: "#10a37f",
    researcher: "Noam Brown",
    role: "Research Scientist",
    team: "Reasoning · Reinforcement Learning",
    contribution: "OpenAI 的 o1 贡献声明将 Noam Brown 列为 Foundational Contributor；个人主页同时核验其推理、强化学习与自博弈研究职责。",
    currentStatusSource: noamBrownProfile,
    affiliationStatus: "current",
    lastVerifiedAt: checkedAt,
    workTitle: "OpenAI o1 Contributions",
    workYear: 2024,
    workType: "技术报告",
    workSource: publication(
      "OpenAI o1 Contributions",
      "https://openai.com/openai-o1-contributions/",
      "Noam Brown is named among the o1 foundational contributors",
      "2024-09",
    ),
    workEvidence: "官方贡献页明确列名，而不是根据作者顺序或媒体报道推断其贡献等级。",
    advisers: [
      { name: "Tuomas Sandholm", institution: "Carnegie Mellon University", relation: "博士导师", source: noamBrownProfile },
    ],
  },
  {
    id: "anthropic-nicholas-carlini",
    company: "Anthropic",
    companyShort: "CLAUDE",
    companyColor: "#3c2d26",
    companyAccent: "#d4a27f",
    researcher: "Nicholas Carlini",
    role: "Research Scientist",
    team: "AI Security · Model Misuse",
    contribution: "个人主页记录其在 Anthropic 研究语言模型可被如何攻击或滥用；Anthropic 官方研究页将其列为漏洞发现工作的首位共同作者。",
    currentStatusSource: nicholasCarliniProfile,
    affiliationStatus: "current",
    lastVerifiedAt: checkedAt,
    workTitle: "LLM-discovered 0-days",
    workYear: 2026,
    workType: "论文",
    workSource: publication(
      "Anthropic · LLM-discovered 0-days",
      "https://www.anthropic.com/research/zero-days",
      "Nicholas Carlini is named as a joint first author on the official research page",
      "2026-02",
    ),
    workEvidence: "Anthropic 官方页面以星号标出 Nicholas Carlini 为共同第一作者；任职与博士师承另由个人主页核验。",
    advisers: [
      { name: "David Wagner", institution: "UC Berkeley", relation: "博士导师", source: nicholasCarliniProfile },
    ],
  },
  {
    id: "meta-luke-zettlemoyer",
    company: "Meta FAIR",
    companyShort: "META",
    companyColor: "#0b3b7a",
    companyAccent: "#5ca8ff",
    researcher: "Luke Zettlemoyer",
    role: "Senior Research Director",
    team: "FAIR · Language & Multimodal Models",
    contribution: "个人主页核验其 Meta FAIR 高级研究总监身份；Meta 的 OPT-175B 官方发布页将其列为 Research Director 与文章作者。",
    currentStatusSource: lukeZettlemoyerProfile,
    affiliationStatus: "current",
    lastVerifiedAt: checkedAt,
    workTitle: "Democratizing access to large-scale language models with OPT-175B",
    workYear: 2022,
    workType: "技术报告",
    workSource: publication(
      "Meta AI · OPT-175B",
      "https://ai.meta.com/blog/democratizing-access-to-large-scale-language-models-with-opt-175b/",
      "Luke Zettlemoyer is listed as a Research Director and author of the official release",
      "2022-05",
    ),
    workEvidence: "官方发布页直接列出 Luke Zettlemoyer；当前高级研究总监身份由其个人主页单独核验。",
    advisers: [
      { name: "Michael Collins", institution: "MIT", relation: "共同博士导师", source: lukeAdviserSource },
      { name: "Leslie Kaelbling", institution: "MIT", relation: "共同博士导师", source: lukeAdviserSource },
    ],
  },
  {
    id: "character-noam-shazeer",
    company: "Character.AI · Founding Team",
    companyShort: "C.AI",
    companyColor: "#2c255d",
    companyAccent: "#c4b5fd",
    researcher: "Noam Shazeer",
    role: "Co-founder · historical",
    team: "Early Pretraining · 2021–2024",
    contribution: "Character.AI 官方技术文章把 Squinch 归为 Noam Shazeer 在早期预训练阶段发明的算法；这里保留其创始团队历史关系，不显示为当前员工。",
    currentStatusSource: characterDepartureSource,
    affiliationStatus: "historical",
    affiliationPeriod: "2021–2024",
    lastVerifiedAt: checkedAt,
    workTitle: "Optimizing Large-Scale Pretraining at Character.AI · Squinch",
    workYear: 2025,
    workType: "技术报告",
    workSource: characterFounderSource,
    workEvidence: "这是公司对早期技术工作的回顾，页面明确使用 early pretraining 口径；不将 2025 年发文时间解释为仍在职。",
    advisers: [],
  },
  {
    id: "thinking-machines-john-schulman",
    company: "Thinking Machines Lab",
    companyShort: "TML",
    companyColor: "#161616",
    companyAccent: "#ff6b4a",
    researcher: "John Schulman",
    role: "Chief Scientist",
    team: "Post-training · Reinforcement Learning",
    contribution: "Thinking Machines Lab 官方团队页列 John Schulman 为 Chief Scientist；公司研究博客将 LoRA 研究直接署名给他及团队。",
    currentStatusSource: thinkingMachinesTeam,
    affiliationStatus: "current",
    lastVerifiedAt: checkedAt,
    workTitle: "LoRA Without Regret",
    workYear: 2025,
    workType: "技术报告",
    workSource: publication(
      "Thinking Machines Lab · LoRA Without Regret",
      "https://thinkingmachines.ai/blog/lora/",
      "Official company research post authored by John Schulman with the Thinking Machines team",
      "2025-09",
    ),
    workEvidence: "公司博客给出 John Schulman 与 Thinking Machines Lab 的正式引用格式，且与官方团队页的 Chief Scientist 角色相互独立。",
    advisers: [
      { name: "Pieter Abbeel", institution: "UC Berkeley", relation: "博士导师", teacherId: "pieter-abbeel-us", source: johnSchulmanThesis },
    ],
  },
  {
    id: "ssi-ilya-sutskever",
    company: "Safe Superintelligence (SSI)",
    companyShort: "SSI",
    companyColor: "#292524",
    companyAccent: "#f5d06f",
    researcher: "Ilya Sutskever",
    role: "Co-founder · company leadership",
    team: "Safe Superintelligence",
    contribution: "SSI 尚未公开可逐人归因的模型技术报告；因此只记录 NVIDIA 官方合作公告所确认的公司领导关系，不虚构内部贡献排序。",
    currentStatusSource: ssiStatus,
    affiliationStatus: "current",
    lastVerifiedAt: checkedAt,
    workTitle: "Sequence to Sequence Learning with Neural Networks",
    workYear: 2014,
    workType: "论文",
    workSource: publication(
      "NeurIPS 2014 · Sequence to Sequence Learning",
      "https://papers.nips.cc/paper_files/paper/2014/hash/a14ac55a4f27472c5d894ec1c3c743d2-Abstract.html",
      "Foundational pre-SSI technical work by Ilya Sutskever",
      "2014",
    ),
    workEvidence: "这篇论文只用于展示创始人的学术技术轨迹，并非 SSI 公司成果；待 SSI 发布可归因报告后再补公司技术节点。",
    advisers: [
      { name: "Geoffrey Hinton", institution: "University of Toronto", relation: "博士导师", source: hintonStudents },
    ],
  },
  {
    id: "deepmind-koray-kavukcuoglu",
    company: "Google DeepMind",
    companyShort: "GDM",
    companyColor: "#14213d",
    companyAccent: "#67e8f9",
    researcher: "Koray Kavukcuoglu",
    role: "VP of GenAI",
    team: "Gemini · Research Leadership",
    contribution: "Gemini 1 技术报告将 Koray Kavukcuoglu 列为 Program Lead，并明确定义该角色负责 Gemini 项目的组织领导。",
    currentStatusSource: korayAdviserSource,
    affiliationStatus: "current",
    lastVerifiedAt: checkedAt,
    workTitle: "Gemini: A Family of Highly Capable Multimodal Models",
    workYear: 2023,
    workType: "技术报告",
    workSource: publication(
      "Google DeepMind · Gemini 1 Technical Report",
      "https://deepmind.google/gemini/gemini_1_report.pdf",
      "Koray Kavukcuoglu is listed as a Gemini Program Lead",
      "2023-12",
    ),
    workEvidence: "报告对 Program Lead、Technical Lead、Core Contributor 分别定义；这里严格沿用 Program Lead，不扩大为未声明的技术主导。",
    advisers: [
      { name: "Yann LeCun", institution: "New York University", relation: "博士导师", teacherId: "yann-lecun-us", source: korayAdviserSource },
    ],
  },
];
