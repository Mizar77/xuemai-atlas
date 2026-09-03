import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const roster = source(
  "Stanford AI Lab faculty roster",
  "https://ai.stanford.edu/faculty/",
  "official",
  "Current SAIL faculty or affiliated-faculty listing, research area and official portrait",
);

const sources = {
  maneesh: source("Stanford CS · Maneesh Agrawala", "https://www.cs.stanford.edu/people/maneesh-agrawala", "official", "Current chair, Brown Institute leadership, education, research and Stanford portrait"),
  maneeshHome: source("Maneesh Agrawala · Stanford Graphics homepage", "https://graphics.stanford.edu/~maneesh/", "profile", "Graphics, visualization and human-computer interaction research programme"),
  jure: source("Stanford CS · Jure Leskovec", "https://www.cs.stanford.edu/people/jure-leskovec", "official", "Current appointment, education, Graph ML research, prior Pinterest role and product impact"),
  jureHome: source("Jure Leskovec · Stanford homepage", "https://cs.stanford.edu/~jure/", "profile", "SNAP research programme, graph learning, applications and open research positions"),
  carlos: source("Stanford CS · Carlos Guestrin", "https://www.cs.stanford.edu/people/carlos-guestrin", "official", "Current appointment, Turi and Apple trajectory, open-source projects and honours"),
  carlosHome: source("Carlos Guestrin · Stanford homepage", "http://guestrin.stanford.edu/", "profile", "Machine learning, explainability, fairness and systems research programme"),
  andrew: source("Stanford Profiles · Andrew Ng", "https://profiles.stanford.edu/andrew-ng", "official", "Stanford adjunct appointment, education, research and entrepreneurship"),
  andrewGroup: source("Andrew Ng · Stanford research group", "https://ai.stanford.edu/~ang/group.html", "profile", "First-party former PhD and MSc student roster with historical destinations"),
  sebastian: source("Stanford SAIL · Sebastian Thrun", "https://ai.stanford.edu/faculty/", "official", "SAIL affiliated-faculty status, robotics and machine-learning scope, and official portrait"),
  sebastianHome: source("Sebastian Thrun · Stanford Robotics", "http://robots.stanford.edu/", "profile", "Stanford robotics programme, autonomous vehicles and research leadership"),
  azalia: source("Stanford CS · Azalia Mirhoseini", "https://www.cs.stanford.edu/people/azalia-mirhoseini", "official", "Current Stanford appointment, Scaling Intelligence lab and official portrait"),
  azaliaHome: source("Azalia Mirhoseini · homepage", "https://www.azaliamirhoseini.com/", "profile", "Ricursive Intelligence, Google Brain/DeepMind and Anthropic trajectory, research and awards"),
  dorsa: source("Stanford CS · Dorsa Sadigh", "https://www.cs.stanford.edu/people/dorsa-sadigh", "official", "Current Stanford CS/EE appointment and official portrait"),
  dorsaHome: source("Dorsa Sadigh · homepage", "https://dorsa.fyi/", "profile", "Robotics and machine-learning research, Berkeley degrees and current lab direction"),
  dorsaThesis: source("UC Berkeley EECS · Dorsa Sadigh dissertation", "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2017/EECS-2017-143.html", "thesis", "Dissertation metadata explicitly names S. Shankar Sastry and Sanjit A. Seshia as advisers"),
  karen: source("Stanford Profiles · C. Karen Liu", "https://profiles.stanford.edu/c-karen-liu", "official", "Current appointment, education, Georgia Tech trajectory, research and advisees"),
  karenHome: source("C. Karen Liu · Stanford lab", "https://ckllab.stanford.edu/c-karen-liu", "profile", "Movement Lab research and student/alumni information"),
  chris: source("Stanford Profiles · Christopher Re", "https://profiles.stanford.edu/christopher-re", "official", "Current appointment, research impact and Stanford advisees"),
  chrisHome: source("Christopher Re · homepage", "https://cs.stanford.edu/people/chrismre/", "profile", "Current group, PhD/postdoc alumni and their public destinations"),
  monica: source("Stanford CS · Monica Lam", "https://www.cs.stanford.edu/people/monica-lam", "official", "Current appointment, education, OVAL, compiler research, entrepreneurship and official portrait"),
  monicaCv: source("Monica Lam · Stanford CV", "https://suif.stanford.edu/~lam/cv.htm", "cv", "Education, Stanford career, publications, patents and research trajectory"),
  jeannette: source("Stanford Profiles · Jeannette Bohg", "https://profiles.stanford.edu/jeannette-bohg", "official", "Current appointment, KTH/MPI-IS trajectory, robotics research and advisees"),
  jeannetteHome: source("Jeannette Bohg · Stanford homepage", "https://web.stanford.edu/~bohg/", "profile", "Interactive Perception and Robot Learning Lab research and group information"),
  dan: source("Stanford Profiles · Daniel Yamins", "https://profiles.stanford.edu/daniel-yamins", "official", "Current Stanford appointments, Harvard PhD, NeuroAI research and advisees"),
  danHome: source("Daniel Yamins · NeuroAILab", "https://web.stanford.edu/~yamins/", "profile", "NeuroAI research programme and lab information"),
};

type NewPiSeed = {
  id: string;
  name: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  facts: Array<{ label: string; value: string; source: Source }>;
  peopleSources: Source[];
  portraitFile: string;
  portraitSource: Source;
  stage: Person["stage"];
  x: number;
  y: number;
};

function newPi(seed: NewPiSeed): Person {
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: "Stanford",
    region: "United States",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: seed.facts,
    stage: seed.stage,
    category: "core",
    status: "current PI · Stanford official roster verified",
    sources: [...seed.peopleSources, roster],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/us-stanford-roster-2026/${seed.portraitFile}`,
      alt: `${seed.name} Stanford 官方头像`,
      source: seed.portraitSource,
    },
  };
}

export const usStanfordRosterExpansion2People: Person[] = [
  newPi({
    id: "azalia-mirhoseini-stanford", name: "Azalia Mirhoseini", role: "Assistant Professor of Computer Science · Co-founder, Ricursive Intelligence",
    area: "Self-Improving AI · AI Systems · Efficient LLMs · AI for Chip Design", tags: ["自改进 AI", "LLM 系统", "AI for Systems", "芯片设计"], stage: "emerging",
    summary: "把自改进 AI、推理时扩展和 AI 芯片设计连接起来，并具有 Google Brain、Anthropic、DeepMind 与创业经历的 Stanford 青年 PI。",
    facts: [
      { label: "当前任职", value: "Stanford 计算机系助理教授，领导 Scaling Intelligence Lab；同时为 Ricursive Intelligence 联合创始人。", source: sources.azaliaHome },
      { label: "研究主线", value: "面向模型、软件和硬件设计的 self-improving AI，覆盖 test-time scaling、AI agents、推理优化和 AI-based verification。", source: sources.azaliaHome },
      { label: "产业轨迹", value: "曾在 Google Brain、Anthropic 与 Google DeepMind 工作，并参与 Claude、Gemini、AlphaChip 和大规模 MoE 研究。", source: sources.azaliaHome },
      { label: "教育与学术训练", value: "Rice University ECE 博士论文获系级 Best Thesis；后获 MIT Technology Review 35 Under 35 与 Google ML and Systems Junior Faculty Award。", source: sources.azaliaHome },
      { label: "为什么值得关注", value: "她的研究同时跨越基础模型能力扩展、软硬件协同与 frontier-lab 创业，是学术—工业双向流动的代表节点。", source: sources.azalia },
    ], peopleSources: [sources.azalia, sources.azaliaHome], portraitFile: "azalia-mirhoseini-stanford.jpg", portraitSource: sources.azalia, x: 105, y: 120,
  }),
  newPi({
    id: "dorsa-sadigh-stanford", name: "Dorsa Sadigh", role: "Associate Professor of Computer Science and Electrical Engineering",
    area: "Robot Learning · Human-Robot Interaction · Safe Autonomy · Reinforcement Learning", tags: ["机器人学习", "人机交互", "安全自主系统", "强化学习"], stage: "senior",
    summary: "研究机器人如何从人类学习并适应人的 Stanford 机器人学习 PI，连接形式化安全、控制与现代强化学习。",
    facts: [
      { label: "当前任职", value: "Stanford 计算机系与电气工程系副教授，并任 Stanford HAI Senior Fellow。", source: sources.dorsa },
      { label: "研究主线", value: "机器人学习、人机交互、安全自主系统，以及能够从人类反馈中学习并适应人的算法。", source: sources.dorsaHome },
      { label: "教育与学术训练", value: "UC Berkeley EECS 本科；2017 年获 Berkeley EECS 博士。", source: sources.dorsaHome },
      { label: "博士师承", value: "Berkeley 博士论文官方记录 S. Shankar Sastry 与 Sanjit A. Seshia 为共同导师。", source: sources.dorsaThesis },
      { label: "为什么值得关注", value: "其工作把可证明安全、人的行为建模与数据驱动机器人学习结合，是具身智能中的关键交叉节点。", source: sources.dorsaHome },
    ], peopleSources: [sources.dorsa, sources.dorsaHome, sources.dorsaThesis], portraitFile: "dorsa-sadigh-stanford.jpg", portraitSource: sources.dorsa, x: 255, y: 120,
  }),
  newPi({
    id: "karen-liu-stanford", name: "C. Karen Liu", role: "Professor of Computer Science",
    area: "Computer Graphics · Robotics · Reinforcement Learning · Computational Biomechanics", tags: ["图形学", "机器人", "强化学习", "人体运动"], stage: "senior",
    summary: "从物理仿真与人体运动建模延伸到灵巧机器人控制的 Stanford 教授，连接图形学、机器人和强化学习。",
    facts: [
      { label: "当前任职", value: "Stanford 计算机系教授，Bio-X、HAI 与 Wu Tsai Human Performance Alliance 成员。", source: sources.karen },
      { label: "研究主线", value: "物理动画、角色动画、最优控制、强化学习、计算生物力学与辅助机器人。", source: sources.karen },
      { label: "教育与学术训练", value: "台湾大学计算机本科；University of Washington 计算机硕士与博士。", source: sources.karen },
      { label: "职业轨迹", value: "加入 Stanford 前任 Georgia Tech School of Interactive Computing 教师。", source: sources.karen },
      { label: "人才培养", value: "Stanford Profiles 公开当前博士导师与共同导师名单；实验室页面继续提供学生与校友信息。", source: sources.karenHome },
    ], peopleSources: [sources.karen, sources.karenHome], portraitFile: "karen-liu-stanford.png", portraitSource: roster, x: 405, y: 120,
  }),
  newPi({
    id: "chris-re-stanford", name: "Christopher Ré", role: "Professor of Computer Science",
    area: "Foundation Model Systems · Machine Learning Systems · Data Systems", tags: ["基础模型系统", "ML Systems", "数据系统", "创业"], stage: "senior",
    summary: "以新一代 AI 系统、数据系统和基础模型为核心，并持续培养教授、创业者和工业研究员的 Stanford 资深 PI。",
    facts: [
      { label: "当前任职", value: "Stanford 计算机系教授，隶属 SAIL、Machine Learning Group 与 CRFM。", source: sources.chris },
      { label: "研究主线", value: "下一代数据处理、机器学习软硬件系统和基础模型系统。", source: sources.chris },
      { label: "教育与学术训练", value: "University of Washington 计算机本科；University of Wisconsin–Madison 计算机博士。", source: sources.chris },
      { label: "成果影响", value: "研究成果进入 Apple、Google、YouTube 等产品，并覆盖科学发现与人道主义应用。", source: sources.chris },
      { label: "学生去向", value: "本人主页逐人列出博士生与博士后去向，覆盖 Caltech、UCSD、Princeton、CMU、Google DeepMind、Apple，以及 Cartesia、Snorkel、Numbers Station 等创业公司。", source: sources.chrisHome },
      { label: "为什么值得关注", value: "公开校友表显示其团队已形成密集的教授—创业者—大厂研究人才流动网络。", source: sources.chrisHome },
    ], peopleSources: [sources.chris, sources.chrisHome], portraitFile: "chris-re-stanford.png", portraitSource: roster, x: 555, y: 120,
  }),
  newPi({
    id: "monica-lam-stanford", name: "Monica Lam", role: "Professor of Computer Science · Faculty Director, OVAL",
    area: "LLM Agents · Conversational AI · Knowledge Discovery · Compilers", tags: ["LLM Agent", "对话系统", "知识发现", "编译器"], stage: "senior",
    summary: "从编译器奠基工作延伸到可靠 AI assistants、深度研究 agents 和知识发现的 Stanford 资深 PI。",
    facts: [
      { label: "当前任职", value: "Stanford 计算机系教授、电子工程系 courtesy professor，并领导 Open Virtual Assistant Lab。", source: sources.monica },
      { label: "研究主线", value: "面向知识发现的可靠 AI assistants、深度研究 agents、混合知识源检索与任务型对话系统。", source: sources.monica },
      { label: "教育与学术训练", value: "UBC 计算机本科；CMU 计算机硕士与博士；CMU 官方博士记录列 H. T. Kung 为导师。", source: sources.monicaCv },
      { label: "技术与产业", value: "SUIF 与编译优化工作影响高性能系统；同时是 Tensilica 创始团队成员，该公司后被 Cadence 收购。", source: sources.monica },
      { label: "为什么值得关注", value: "她把经典系统研究积累迁移到 LLM agents 与知识基础设施，是跨代、跨范式的重要 Stanford 节点。", source: sources.monica },
    ], peopleSources: [sources.monica, sources.monicaCv], portraitFile: "monica-lam-stanford.jpg", portraitSource: sources.monica, x: 180, y: 290,
  }),
  newPi({
    id: "jeannette-bohg-stanford", name: "Jeannette Bohg", role: "Associate Professor of Computer Science",
    area: "Robot Perception · Manipulation · Multimodal Learning · Embodied AI", tags: ["机器人感知", "操作", "多模态", "具身智能"], stage: "senior",
    summary: "围绕自主机器人操作与抓取研究目标导向、实时、多模态感知和学习的 Stanford 机器人 PI。",
    facts: [
      { label: "当前任职", value: "Stanford 计算机系副教授，Bio-X 成员与 HAI faculty affiliate。", source: sources.jeannette },
      { label: "研究主线", value: "自主机器人操作与抓取中的感知、学习、多模态反馈和实时决策。", source: sources.jeannette },
      { label: "教育与学术训练", value: "在 KTH Robotics, Perception and Learning division 完成博士研究，论文聚焦面向抓取的多模态场景理解。", source: sources.jeannette },
      { label: "职业轨迹", value: "2012–2017 年在 Max Planck Institute for Intelligent Systems Autonomous Motion Department 任 group leader。", source: sources.jeannette },
      { label: "人才培养", value: "Stanford Profiles 公开博士导师、共同导师与博士后 sponsor 记录；个人实验室页给出研究组入口。", source: sources.jeannetteHome },
    ], peopleSources: [sources.jeannette, sources.jeannetteHome], portraitFile: "jeannette-bohg-stanford.jpg", portraitSource: sources.jeannette, x: 405, y: 290,
  }),
  newPi({
    id: "dan-yamins-stanford", name: "Dan Yamins", role: "Associate Professor of Psychology and Computer Science",
    area: "NeuroAI · Computational Neuroscience · Vision · Large-Scale Modeling", tags: ["NeuroAI", "计算神经科学", "视觉", "大规模建模"], stage: "senior",
    summary: "以 AI 模型理解大脑、再以神经科学反哺 AI 的 Stanford NeuroAI 核心 PI。",
    facts: [
      { label: "当前任职", value: "Stanford 心理学与计算机系副教授，Bio-X、HAI 与 Wu Tsai Neurosciences Institute 成员。", source: sources.dan },
      { label: "研究主线", value: "神经科学、AI、心理学与大规模数据分析的交叉，强调大脑模型和 AI 算法相互促进。", source: sources.dan },
      { label: "教育与学术训练", value: "2008 年获 Harvard University Applied Mathematics 博士。", source: sources.dan },
      { label: "研究方法", value: "结合计算建模、高通量神经生理、脑成像、心理物理与大规模数据分析。", source: sources.dan },
      { label: "人才培养", value: "Stanford Profiles 公开博士导师、共同导师和项目学生；NeuroAILab 页面提供团队与研究入口。", source: sources.danHome },
    ], peopleSources: [sources.dan, sources.danHome], portraitFile: "dan-yamins-stanford.png", portraitSource: roster, x: 630, y: 290,
  }),
];

const enhance = (summary: string, tags: string[], facts: NonNullable<Person["facts"]>, personSources: Source[]): Partial<Person> => ({
  summary,
  tags,
  facts,
  sources: [...personSources, roster],
  status: "current or affiliated Stanford AI faculty · profile upgraded",
  lastVerifiedAt: checkedAt,
});

export const usStanfordRosterExpansion2PersonEnhancements: Record<string, Partial<Person>> = {
  "maneesh-agrawala-lineage": { ...enhance(
    "Stanford Forest Baskett Professor 与 Brown Institute for Media Innovation 主任，研究认知设计原则如何提升可视化、图形和音视频媒体的有效性。",
    ["计算机图形学", "可视化", "HCI", "媒体创新"],
    [
      { label: "当前任职", value: "Stanford Forest Baskett Professor of Computer Science，并任 Brown Institute for Media Innovation 主任。", source: sources.maneesh },
      { label: "研究主线", value: "计算机图形学、可视化与 HCI，重点研究认知设计原则和自动化媒体设计工具。", source: sources.maneesh },
      { label: "教育轨迹", value: "Stanford 数学本科；2002 年获 Stanford 计算机博士。", source: sources.maneesh },
      { label: "职业轨迹", value: "2005–2015 年在 UC Berkeley EECS 任教授，后回到 Stanford。", source: sources.maneesh },
      { label: "学术网络", value: "其 Stanford Graphics 团队连接可视化、图形学、新闻媒体与人机交互，并已存在经一手主页核验的博士后指导边。", source: sources.maneeshHome },
    ], [sources.maneesh, sources.maneeshHome],
  ), primary: true, stage: "senior", category: "core" },
  "jure-leskovec-lineage": { ...enhance(
    "Stanford 图机器学习与大规模网络研究带头人，连接 GNN、基础模型、生物医药和大规模产业应用。",
    ["图机器学习", "GNN", "数据挖掘", "AI for Science"],
    [
      { label: "当前任职", value: "Stanford Alfred and Rebecca Lin Professor，隶属 SAIL、Machine Learning Group 与 CRFM。", source: sources.jure },
      { label: "研究主线", value: "图神经网络、复杂网络、推荐系统、计算社会科学与药物发现。", source: sources.jureHome },
      { label: "教育轨迹", value: "University of Ljubljana 计算机本科；CMU 机器学习博士；Cornell 博士后。", source: sources.jure },
      { label: "产业轨迹", value: "曾任 Pinterest Chief Scientist；团队研究进入 Facebook、Pinterest、Uber、YouTube、Amazon 等产品。", source: sources.jure },
      { label: "人才培养", value: "公开主页持续发布本科、研究生与博士后岗位；图谱中已有经博士论文核验的学生与博士后关系。", source: sources.jureHome },
    ], [sources.jure, sources.jureHome],
  ), primary: true, stage: "senior", category: "core" },
  "carlos-guestrin-lineage": { ...enhance(
    "Stanford 机器学习资深教授与 Turi 联合创始人，围绕可解释、公平和 ML systems 形成学术—开源—产业网络。",
    ["机器学习", "可解释 AI", "公平性", "ML Systems"],
    [
      { label: "当前任职", value: "Stanford Fortinet Founders Professor，并任 HAI Senior Fellow。", source: sources.carlos },
      { label: "研究主线", value: "机器学习、可解释性、公平性与 ML systems。", source: sources.carlosHome },
      { label: "职业轨迹", value: "曾任 CMU 与 University of Washington 教授；创办 Turi，收购后任 Apple Senior Director of Machine Learning and AI。", source: sources.carlos },
      { label: "开源影响", value: "团队推出 XGBoost、LIME、TVM、MXNet、Turi Create、GraphLab/PowerGraph 等项目。", source: sources.carlos },
      { label: "学术网络", value: "现有图谱已通过 Andreas Krause 的 ETH CV 核验其博士指导关系；本轮不从普通合著扩展边。", source: sources.carlosHome },
    ], [sources.carlos, sources.carlosHome],
  ), primary: true, stage: "senior", category: "core" },
  "andrew-ng-foundational": enhance(
    "Stanford 兼职教授、DeepLearning.AI 创始人和 AI 教育/产业领导者，连接 Michael I. Jordan 谱系、机器人学习与全球 AI 人才培养。",
    ["机器学习", "AI 教育", "机器人", "产业 AI"],
    [
      { label: "当前角色", value: "Stanford 兼职教授，并领导 DeepLearning.AI 等 AI 教育与创业项目。", source: sources.andrew },
      { label: "研究主线", value: "机器学习、深度学习、强化学习、机器人控制和大规模 AI 教育。", source: sources.andrew },
      { label: "博士师承", value: "UC Berkeley 博士由 Michael I. Jordan 指导；该关系已由导师履历在图谱中核验。", source: sources.andrew },
      { label: "人才培养", value: "本人 Stanford 研究组页列出 Pieter Abbeel、J. Zico Kolter、Honglak Lee、Ashutosh Saxena 等博士毕业生及其当时去向。", source: sources.andrewGroup },
      { label: "学生流向", value: "公开校友记录横跨 Berkeley、CMU、Michigan、Cornell、Facebook、Twitter、23andMe 等学术与工业路径。", source: sources.andrewGroup },
    ], [sources.andrew, sources.andrewGroup],
  ),
  "sebastian-thrun-lineage": enhance(
    "Stanford SAIL 前主任与自动驾驶先驱，以机器人、机器学习和教育创业连接学术研究与大规模产业化。",
    ["机器人", "自动驾驶", "机器学习", "AI 教育"],
    [
      { label: "Stanford 角色", value: "SAIL 官方当前将其列为 affiliated faculty；曾任 Stanford AI Lab 主任。", source: sources.sebastian },
      { label: "研究主线", value: "机器人、机器学习、概率机器人和自主驾驶。", source: sources.sebastianHome },
      { label: "教育轨迹", value: "1995 年获 University of Bonn 计算机博士。", source: sources.sebastianHome },
      { label: "技术转化", value: "领导 Stanford Racing Team 的无人车研究，并将研究影响延伸到自动驾驶与在线教育创业。", source: sources.sebastianHome },
      { label: "学术网络", value: "图谱已有 Joëlle Pineau 博士共同导师、Andrew McCallum 博士后导师等经论文/CV 核验的关系。", source: sources.sebastianHome },
    ], [sources.sebastian, sources.sebastianHome],
  ),
};

export const usStanfordRosterExpansion2Portraits: Record<string, NonNullable<Person["portrait"]>> = {
  "maneesh-agrawala-lineage": { src: "portraits/us-stanford-roster-2026/maneesh-agrawala-lineage.jpg", alt: "Maneesh Agrawala Stanford CS 官方头像", source: sources.maneesh },
  "jure-leskovec-lineage": { src: "portraits/us-stanford-roster-2026/jure-leskovec-lineage.jpg", alt: "Jure Leskovec Stanford CS 官方头像", source: sources.jure },
  "carlos-guestrin-lineage": { src: "portraits/us-stanford-roster-2026/carlos-guestrin-lineage.jpg", alt: "Carlos Guestrin SAIL 官方头像", source: roster },
  "andrew-ng-foundational": { src: "portraits/us-stanford-roster-2026/andrew-ng-foundational.jpg", alt: "Andrew Ng SAIL 官方头像", source: roster },
  "sebastian-thrun-lineage": { src: "portraits/us-stanford-roster-2026/sebastian-thrun-lineage.png", alt: "Sebastian Thrun SAIL 官方头像", source: roster },
};

export const usStanfordRosterExpansion2Relationships: Relationship[] = [
  {
    id: "stanford-roster-sastry-sadigh",
    from: "shankar-sastry-lineage",
    to: "dorsa-sadigh-stanford",
    type: "lineage",
    subtype: "co_adviser",
    label: "共同博士导师",
    evidence: "UC Berkeley EECS 的 Dorsa Sadigh 博士论文元数据明确列 S. Shankar Sastry 与 Sanjit A. Seshia 为共同导师。",
    evidenceObject: "UC Berkeley EECS dissertation record",
    source: sources.dorsaThesis,
    verified: true,
    endYear: 2017,
  },
];
