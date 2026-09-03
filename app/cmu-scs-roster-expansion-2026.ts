import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const roster = source(
  "CMU School of Computer Science faculty directory",
  "https://www.cs.cmu.edu/directory/all",
  "official",
  "Current faculty affiliation, title and SCS department membership",
);

const sources = {
  ameet: source("Ameet Talwalkar homepage", "https://www.cs.cmu.edu/~atalwalk/", "profile", "Current role, research programme, team and industry activity"),
  ameetCv: source("Ameet Talwalkar CV", "https://www.cs.cmu.edu/~atalwalk/talwalkar_cv.pdf", "cv", "NYU doctoral adviser, Berkeley postdoctoral mentor and career timeline"),
  hoda: source("CMU S3D profile — Hoda Heidari", "https://s3d.cmu.edu/people/core-faculty/heidari-hoda.html", "official", "Current appointment, research and doctoral training"),
  hodaCv: source("Hoda Heidari CV", "https://www.cs.cmu.edu/~hheidari/CV_HodaHeidari.pdf", "cv", "Doctoral and postdoctoral supervisors and industry internships"),
  junyan: source("CMU Robotics Institute — Jun-Yan Zhu", "https://www.ri.cmu.edu/ri-faculty/jun-yan-zhu/", "official", "Current appointment, research topics, education and student roster"),
  shinji: source("CMU LTI — Shinji Watanabe", "https://www.lti.cs.cmu.edu/people/faculty/watanabe-shinji.html", "official", "Current appointment, speech research, career history and advisees"),
  virginia: source("Virginia Smith homepage", "https://www.cs.cmu.edu/~smithv/", "profile", "Current role, research, current group and alumni destinations"),
  virginiaCv: source("Virginia Smith CV", "https://www.cs.cmu.edu/~smithv/VScv.pdf", "cv", "Berkeley doctoral advisers and Stanford postdoctoral mentor"),
  yiming: source("CMU LTI — Yiming Yang", "https://www.lti.cs.cmu.edu/people/faculty/yiming-yang.html", "official", "Current role, research programme, career history and advisees"),
  yimingHome: source("Yiming Yang homepage", "https://www.cs.cmu.edu/~yiming/", "profile", "Current LLM, retrieval, reasoning and AI-for-science research"),
};

type Seed = {
  id: string;
  name: string;
  role: string;
  area: string;
  tags: string[];
  stage: Person["stage"];
  summary: string;
  current: string;
  research: string;
  training: string;
  trajectory: string;
  attention: string;
  portrait: string;
  primarySource: Source;
  secondarySource: Source;
  x: number;
  y: number;
};

const seeds: Seed[] = [
  {
    id: "ameet-talwalkar-cmu", name: "Ameet Talwalkar", role: "Associate Professor of Machine Learning", stage: "senior",
    area: "Machine Learning Systems · Foundation Models · Human-AI Interaction", tags: ["机器学习系统", "Foundation Models", "Agents", "Human-AI", "创业"],
    summary: "CMU 机器学习系统与专用模型/智能体 PI，同时连接 Determined AI、HPE、Databricks 与 Datadog。",
    current: "CMU Machine Learning Department tenured Associate Professor，并任 Datadog Chief Scientist。",
    research: "AI for science、human-AI interaction，以及专用基础模型与智能体的训练、评测和系统效率。",
    training: "2010 年获 NYU Computer Science 博士，论文题名页明确 Mehryar Mohri 为导师；随后在 Berkeley 由 Michael I. Jordan 指导博士后研究。",
    trajectory: "曾任 UCLA faculty，创办 Determined AI（后被 HPE 收购），并曾任 Databricks technical advisor。",
    attention: "其路径把机器学习理论、MLSys 开源生态、创业并购和大模型系统连成同一条人才与技术链。",
    portrait: "ameet-talwalkar.jpg", primarySource: sources.ameet, secondarySource: sources.ameetCv, x: 960, y: 210,
  },
  {
    id: "hoda-heidari-cmu", name: "Hoda Heidari", role: "Assistant Professor of Machine Learning", stage: "emerging",
    area: "Responsible AI · AI Safety · Fairness · AI Governance", tags: ["负责任AI", "AI安全", "公平性", "治理", "透明度"],
    summary: "CMU 负责任 AI 青年带头人，研究 AI 风险、公平、透明度和治理，并共同领导校级 Responsible AI Initiative。",
    current: "CMU Machine Learning Department Assistant Professor，并在 S3D、HCII、CyLab 与 Heinz College 任联合或附属职务。",
    research: "AI 风险评估与缓解、AI safety、fairness、transparency、governance 和算法社会影响。",
    training: "2017 年获 University of Pennsylvania 博士，导师为 Michael Kearns 与 Ali Jadbabaie；随后在 ETH 与 Cornell 进行博士后训练。",
    trajectory: "博士后阶段先由 Andreas Krause 指导，后在 Cornell AI, Policy, and Practice 由 Jon Kleinberg、Karen Levy 与 Solon Barocas 指导。",
    attention: "她将机器学习方法、制度治理和社会影响评估结合，是技术型 Responsible AI 网络的关键节点。",
    portrait: "hoda-heidari.jpg", primarySource: sources.hoda, secondarySource: sources.hodaCv, x: 1120, y: 210,
  },
  {
    id: "jun-yan-zhu-cmu", name: "Jun-Yan Zhu", role: "Michael B. Donahue Associate Professor of Computer Science and Robotics", stage: "senior",
    area: "Generative Models · Computer Vision · Graphics · Creative AI", tags: ["生成模型", "计算机视觉", "图形学", "多模态", "创意AI"],
    summary: "CMU Generative Intelligence Lab 负责人，研究生成模型与人类创作者协作、可控视觉生成和合成数据。",
    current: "CMU Robotics Institute 与 Computer Science Associate Professor，领导 Generative Intelligence Lab。",
    research: "可控图像/视频/3D 生成、生成模型重写与检索、创作者权益以及生成式合成数据。",
    training: "清华大学本科、UC Berkeley 博士；加入 CMU 前在 MIT CSAIL 从事博士后，并曾任 Adobe Research Research Scientist。",
    trajectory: "其公开学生名单覆盖当前博士生、历届博士生和硕士生；多项成果获 ICCV、ICRA、SIGGRAPH 与 CVPR 奖项或提名。",
    attention: "他把经典视觉和图形学谱系推进到生成式 AI、创作者工具与视觉内容治理。",
    portrait: "jun-yan-zhu.jpg", primarySource: sources.junyan, secondarySource: roster, x: 1280, y: 210,
  },
  {
    id: "shinji-watanabe-cmu", name: "Shinji Watanabe", role: "Associate Professor of Language Technologies", stage: "senior",
    area: "Speech Processing · Conversational AI · Speech-Language Models", tags: ["语音识别", "语音翻译", "对话AI", "ESPnet", "多模态"],
    summary: "ESPnet 核心带头人，推动端到端语音识别、翻译、分离和语音—语言统一建模。",
    current: "CMU Language Technologies Institute Associate Professor。",
    research: "语音识别、语音翻译、说话人分离、语音增强及端到端音频—语音—语言处理。",
    training: "Waseda University Computer Engineering 博士，研究贝叶斯语音识别方法。",
    trajectory: "曾在 NTT Communication Science Laboratories、MERL 与 Johns Hopkins University 工作，后加入 CMU。",
    attention: "其研究兼具基础方法、开源工具链和大规模语音人才培养，对 conversational AI 产业影响直接。",
    portrait: "shinji-watanabe.jpg", primarySource: sources.shinji, secondarySource: roster, x: 1440, y: 210,
  },
  {
    id: "virginia-smith-cmu", name: "Virginia Smith", role: "Leonardo Associate Professor of Machine Learning", stage: "emerging",
    area: "Federated Learning · ML Systems · AI Safety · Privacy", tags: ["联邦学习", "机器学习系统", "隐私", "AI安全", "高效训练"],
    summary: "CMU 联邦学习与安全高效 ML 系统 PI，团队校友流向 Meta、Databricks、Google、Stanford 与 Chicago。",
    current: "CMU Leonardo Associate Professor of Machine Learning，并在 ECE 任 courtesy faculty。",
    research: "联邦与协作学习、高效训练/微调/推理、数据隐私、AI safety 和机器学习系统。",
    training: "2017 年获 UC Berkeley Computer Science 博士，导师为 Michael I. Jordan 与 David Culler；随后在 Stanford 由 Christopher Ré 指导博士后研究。",
    trajectory: "公开组页同时列出当前 PhD/postdoc 与校友去向，覆盖产业研究、学术界和继续深造。",
    attention: "她把统计机器学习谱系、分布式系统和现实隐私部署问题连接起来，学生流向也高度可追踪。",
    portrait: "virginia-smith.jpg", primarySource: sources.virginia, secondarySource: sources.virginiaCv, x: 1040, y: 380,
  },
  {
    id: "yiming-yang-cmu", name: "Yiming Yang", role: "Professor of Language Technologies and Machine Learning", stage: "senior",
    area: "LLM Reasoning · Information Retrieval · NLP · AI for Science", tags: ["LLM", "推理", "信息检索", "NLP", "AI4Science"],
    summary: "CMU LTI/ML 资深 PI，从文本分类与图学习延伸到 LLM 自对齐、推理、多模态和 AI for Science。",
    current: "CMU Language Technologies Institute 与 Machine Learning Department Professor。",
    research: "LLM 自对齐与推理、生成式检索、图机器学习、多模态对齐、组合优化和科学计算。",
    training: "获 Kyoto University Computer Science 博士；此后长期在 CMU 从事机器学习、信息检索与 NLP 研究。",
    trajectory: "官方主页公开当前 advisees，并记录其 XLNet、极大规模文本分类、图学习与生成式推理研究线。",
    attention: "她横跨传统 IR/NLP、深度学习架构搜索和当代 LLM 推理，是 CMU 语言技术的长期培养节点。",
    portrait: "yiming-yang.jpg", primarySource: sources.yiming, secondarySource: sources.yimingHome, x: 1200, y: 380,
  },
];

export const cmuScsRosterExpansionPeople2026: Person[] = seeds.map((seed) => ({
  id: seed.id,
  name: seed.name,
  role: seed.role,
  institution: "CMU",
  region: "United States",
  area: seed.area,
  tags: seed.tags,
  summary: seed.summary,
  facts: [
    { label: "当前任职", value: seed.current, source: seed.primarySource },
    { label: "研究主线", value: seed.research, source: seed.primarySource },
    { label: "教育与学术训练", value: seed.training, source: seed.secondarySource },
    { label: "职业轨迹", value: seed.trajectory, source: seed.secondarySource },
    { label: "为什么值得关注", value: seed.attention, source: seed.primarySource },
  ],
  stage: seed.stage,
  category: "core",
  status: "current PI · CMU official roster and profile verified",
  sources: [seed.primarySource, seed.secondarySource, roster],
  x: seed.x,
  y: seed.y,
  primary: true,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/cmu-roster-2026/${seed.portrait}`,
    alt: `${seed.name} 官方头像`,
    source: seed.primarySource,
  },
}));

const lineage = (id: string, from: string, to: string, subtype: Relationship["subtype"], label: string, evidence: string, relationSource: Source): Relationship => ({
  id, from, to, type: "lineage", subtype, label, evidence, source: relationSource, verified: true,
});

export const cmuScsRosterExpansionRelationships2026: Relationship[] = [
  lineage("cmu-roster-jordan-talwalkar-postdoc", "michael-jordan-eu", "ameet-talwalkar-cmu", "postdoc_mentor", "博士后指导", "Ameet Talwalkar 的 CV 明确记录其在 Berkeley 由 Michael I. Jordan 指导博士后研究。", sources.ameetCv),
  lineage("cmu-roster-krause-heidari-postdoc", "andreas-krause-eu", "hoda-heidari-cmu", "postdoc_mentor", "博士后指导", "Hoda Heidari 的 CV 明确记录其在 ETH 的博士后 supervisor 为 Andreas Krause。", sources.hodaCv),
  lineage("cmu-roster-jordan-smith-phd", "michael-jordan-eu", "virginia-smith-cmu", "phd_adviser", "博士导师", "Virginia Smith 的 CV 明确列出 Michael I. Jordan 与 David Culler 为 Berkeley 博士导师。", sources.virginiaCv),
  lineage("cmu-roster-re-smith-postdoc", "chris-re-stanford", "virginia-smith-cmu", "postdoc_mentor", "博士后指导", "Virginia Smith 的 CV 明确记录其 Stanford 博士后导师为 Christopher Ré。", sources.virginiaCv),
];

const member = (teacherId: string, slug: string, name: string, role: string, memberSource: Source): GroupMember => ({
  id: `cmu-roster-${teacherId}-${slug}`, teacherId, name, role, source: memberSource,
});

export const cmuScsRosterExpansionGroupMembers2026: GroupMember[] = [
  member("ameet-talwalkar-cmu", "valerie-chen", "Valerie Chen", "PhD student", sources.ameet),
  member("ameet-talwalkar-cmu", "wayne-chi", "Wayne Chi", "PhD student · co-advised with Chris Donahue", sources.ameet),
  member("ameet-talwalkar-cmu", "junhong-shen", "Junhong Shen", "PhD student", sources.ameet),
  member("jun-yan-zhu-cmu", "ruihan-gao", "Ruihan Gao", "PhD student", sources.junyan),
  member("jun-yan-zhu-cmu", "gaurav-parmar", "Gaurav Parmar", "PhD student", sources.junyan),
  member("jun-yan-zhu-cmu", "sheng-yu-wang", "Sheng-Yu Wang", "PhD student", sources.junyan),
  member("shinji-watanabe-cmu", "siddhant-arora", "Siddhant Arora", "Advisee", sources.shinji),
  member("shinji-watanabe-cmu", "shikhar-bharadwaj", "Shikhar Bharadwaj", "Advisee", sources.shinji),
  member("shinji-watanabe-cmu", "jiatong-shi", "Jiatong Shi", "Advisee", sources.shinji),
  member("virginia-smith-cmu", "steven-kolawole", "Steven Kolawole", "PhD student", sources.virginia),
  member("virginia-smith-cmu", "kevin-kuo", "Kevin Kuo", "PhD student", sources.virginia),
  member("virginia-smith-cmu", "amrith-setlur", "Amrith Setlur", "PhD student", sources.virginia),
  member("yiming-yang-cmu", "weihua-du", "Weihua Du", "Advisee", sources.yiming),
  member("yiming-yang-cmu", "shengyu-feng", "Shengyu Feng", "Advisee", sources.yiming),
  member("yiming-yang-cmu", "zhiqing-sun", "Zhiqing Sun", "Advisee", sources.yiming),
];

const placement = (id: string, student: string, company: string, role: string, sector: StudentPlacement["sector"]): StudentPlacement => ({
  id: `cmu-roster-smith-${id}`,
  student,
  teacherId: "virginia-smith-cmu",
  company,
  role,
  kind: "reported",
  degree: "PhD",
  sector,
  note: "Virginia Smith 本人主页公开列出的校友去向；后续职业流动可能变化。",
  source: sources.virginia,
  verifiedAt: checkedAt,
});

export const cmuScsRosterExpansionPlacements2026: StudentPlacement[] = [
  placement("don-dennis-meta", "Don Dennis", "Meta", "Alumnus destination", "industry"),
  placement("shengyuan-hu-meta", "Shengyuan Hu", "Meta", "Alumnus destination", "industry"),
  placement("michael-kuchnik-meta", "Michael Kuchnik", "Meta", "Alumnus destination", "industry"),
  placement("oscar-li-jane-street", "Oscar Li", "Jane Street", "Alumnus destination", "industry"),
  placement("tian-li-uchicago", "Tian Li", "University of Chicago", "Assistant Professor", "academia"),
  placement("pratiksha-thaker-databricks", "Pratiksha Thaker", "Databricks", "Research Scientist", "industry"),
  placement("qiqi-xu-google", "Qiqi Xu", "Google", "Alumnus destination", "industry"),
];
