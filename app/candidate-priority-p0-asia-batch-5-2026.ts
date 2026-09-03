import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  hkustGraduates: source(
    "HKUST CSE · Selected PhD Graduates",
    "https://cse.hkust.edu.hk/pg/ourgraduates/",
    "official",
    "逐人列出博士年份、导师、当前职位与机构",
  ),
  horner: source(
    "HKUST CSE · Andrew B. Horner",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/horner",
    "official",
    "现任教授、UIUC 博士、研究方向、简介与官方头像",
  ),
  arpit: source(
    "HKUST CSE · Arpit Narechania",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/arpit",
    "official",
    "现任助理教授、Georgia Tech 博士、研究方向、产业合作与官方头像",
  ),
  arpitTeam: source(
    "DataVisards · People",
    "https://datavisards.com/people/",
    "profile",
    "Arpit Narechania 的 PI 身份与公开研究组成员",
  ),
  binhang: source(
    "HKUST CSE · Binhang Yuan",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/biyuan",
    "official",
    "现任助理教授、Rice 博士、ETH 博士后、研究方向与官方头像",
  ),
  binhangHome: source(
    "Binhang Yuan · first-party homepage",
    "https://binhangyuan.github.io/site/",
    "profile",
    "博士导师、当前团队、博士校友与腾讯职业去向",
  ),
  nevin: source(
    "HKUST CSE · Nevin Lianwen Zhang",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/lzhang",
    "official",
    "现任教授、双博士训练、概率模型研究与官方头像",
  ),
  pedro: source(
    "HKUST CSE · Pedro Sander",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/psander",
    "official",
    "现任教授、Harvard 博士、ATI Research 经历、图形学方向与官方头像",
  ),
  abhik: source(
    "NUS Computing · Abhik Roychoudhury",
    "https://www.comp.nus.edu.sg/cs/people/abhik/",
    "official",
    "Provost's Chair Professor、Stony Brook 博士、TSS 团队、AutoCodeRover 与官方头像",
  ),
  abhikPlacement: source(
    "NUS TSUNAMi · Student Placement",
    "https://www.comp.nus.edu.sg/~tsunami/placement.htm",
    "official",
    "Abhik Roychoudhury 博士生及其公开学术职位去向",
  ),
  reza: source(
    "NUS Computing · Reza Shokri",
    "https://www.comp.nus.edu.sg/cs/people/reza/",
    "official",
    "现任 Dean's Chair Associate Professor、EPFL 博士、研究方向、Microsoft 访问与官方头像",
  ),
  rezaTeam: source(
    "Reza Shokri · first-party research team",
    "https://www.comp.nus.edu.sg/~reza/",
    "profile",
    "隐私与可信机器学习团队的当前博士生和校友",
  ),
  low: source(
    "NUS Computing · Bryan Kian Hsiang Low",
    "https://www.comp.nus.edu.sg/cs/people/lowkh/",
    "official",
    "现任副教授、AI Singapore 与 NUS AI Institute 领导职务、CMU 博士、研究方向与官方头像",
  ),
  lowStudent: source(
    "Gregory Kang Ruey Lau · NUS first-party homepage",
    "https://www.comp.nus.edu.sg/~greglau/",
    "profile",
    "NUS 博士生及 Bryan Kian Hsiang Low 导师关系",
  ),
  wynne: source(
    "NUS Computing · Wynne Hsu",
    "https://www.comp.nus.edu.sg/cs/people/whsu/",
    "official",
    "Provost's Chair Professor、IDS 主任、Purdue 博士、研究方向与官方头像",
  ),
  wynneStudents: source(
    "Wynne Hsu · NUS graduate students",
    "https://www.comp.nus.edu.sg/~whsu/student.html",
    "profile",
    "研究生姓名、学位、论文题目与部分第一份工作",
  ),
  weeSun: source(
    "NUS Computing · Wee Sun Lee",
    "https://www.comp.nus.edu.sg/cs/people/leews/",
    "official",
    "现任教授、ANU 博士、学术管理经历、研究方向与官方头像",
  ),
  weeSunStudents: source(
    "Wee Sun Lee · NUS first-party homepage",
    "https://www.comp.nus.edu.sg/~leews/",
    "profile",
    "当前博士生、博士校友与 Alibaba、AWS、Google、Grab 等公开去向",
  ),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, sourceValue: Source) => ({
  label,
  value,
  source: sourceValue,
});

type PersonSeed = Omit<
  Person,
  "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"
> & {
  portraitFile: string;
  portraitSource: Source;
};

const person = (seed: PersonSeed): Person => ({
  ...seed,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-asia-batch-5-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0AsiaBatch5People2026: Person[] = [
  person({
    id: "andrew-horner-hkust-p0-2026", name: "Andrew B. Horner", chinese: "康立德", role: "Professor", institution: "HKUST", region: "Hong Kong",
    area: "Computer Music · Audio Engineering · Music Emotion", tags: ["计算机音乐", "音频工程", "HCI", "音乐情感"], stage: "senior", x: 120, y: 120,
    portraitFile: "andrew-horner.jpg", portraitSource: sources.horner,
    summary: "HKUST 计算机音乐与音频工程资深教授，长期研究音乐合成、音色和音乐情感；博士培养网络连接腾讯音乐、Huawei 与高校。",
    facts: [
      fact("当前任职", "HKUST 计算机科学与工程系教授。", sources.horner),
      fact("教育与学术训练", "1993 年获 University of Illinois Urbana-Champaign 计算机博士。", sources.horner),
      fact("研究主线", "计算机音乐、音频工程、音乐情感、音乐合成与音色。", sources.horner),
      fact("学术与教学", "曾共同主持在香港举行的 International Computer Music Conference，并获 HKUST Michael G. Gale Medal。", sources.horner),
      fact("人才培养", "HKUST 官方博士校友页列出 Bin Wu、Simon Siu-Hang Lui 与 Jinyuan Jia 由其指导。", sources.hkustGraduates),
    ],
    sources: [sources.horner, sources.hkustGraduates],
  }),
  person({
    id: "arpit-narechania-hkust-p0-2026", name: "Arpit Narechania", role: "Assistant Professor", institution: "HKUST", region: "Hong Kong",
    area: "Human-AI Interaction · Visual Analytics · NLP Interfaces", tags: ["HCI", "可视分析", "自然语言接口", "Human-AI"], stage: "emerging", x: 280, y: 120,
    portraitFile: "arpit-narechania.jpg", portraitSource: sources.arpit,
    summary: "HKUST Human-AI 与可视分析助理教授，研究自然语言接口、分析溯源和地理可视化；DataVisards 页面公开研究团队，便于持续追踪学生网络。",
    facts: [
      fact("当前任职", "HKUST CSE 助理教授并领导 DataVisards 研究组。", sources.arpit),
      fact("教育与学术训练", "IIT Mandi 机械工程 B.Tech；Georgia Institute of Technology 计算机博士。", sources.arpit),
      fact("研究主线", "人机交互、可视分析、信息可视化、自然语言接口、分析溯源与 GIS。", sources.arpit),
      fact("产业连接", "官方简介记录其与 Adobe Research、Microsoft Research 和 Ford Motor Company 的项目合作。", sources.arpit),
      fact("当前团队", "DataVisards 人员页公开列出 Eman Ansar、Fengjie Wang、Jieliang Yin 等研究生。", sources.arpitTeam),
    ],
    sources: [sources.arpit, sources.arpitTeam],
  }),
  person({
    id: "binhang-yuan-hkust-p0-2026", name: "Binhang Yuan", chinese: "袁彬航", role: "Assistant Professor", institution: "HKUST", region: "Hong Kong",
    area: "ML Systems · Distributed Learning · Data Management", tags: ["ML Systems", "分布式学习", "数据管理", "强化学习系统"], stage: "emerging", x: 440, y: 120,
    portraitFile: "binhang-yuan.jpg", portraitSource: sources.binhang,
    summary: "HKUST 机器学习系统助理教授，研究训练系统、分布式学习和数据管理；Rice 博士与 ETH 博士后经历连接数据库系统和大模型基础设施。",
    facts: [
      fact("当前任职", "HKUST CSE 助理教授。", sources.binhang),
      fact("教育与学术训练", "复旦大学本科；Rice University 硕士、博士，博士导师 Chris Jermaine，并由 Anastasios Kyrillidis 联合指导。", sources.binhangHome),
      fact("任职轨迹", "加入 HKUST 前在 ETH Zurich 从事博士后研究。", sources.binhang),
      fact("研究主线", "面向机器学习的数据管理系统，以及分布式、去中心化机器学习系统。", sources.binhang),
      fact("人才培养", "个人主页列出博士校友 Tianyi Bai，并记录其毕业后任 Tencent Tech Lead。", sources.binhangHome),
    ],
    sources: [sources.binhang, sources.binhangHome],
  }),
  person({
    id: "nevin-zhang-hkust-p0-2026", name: "Nevin Lianwen Zhang", chinese: "张连文", role: "Professor", institution: "HKUST", region: "Hong Kong",
    area: "Bayesian Networks · Latent Tree Models · Probabilistic ML", tags: ["贝叶斯网络", "概率模型", "潜变量模型", "机器学习"], stage: "senior", x: 600, y: 120,
    portraitFile: "nevin-zhang.jpg", portraitSource: sources.nevin,
    summary: "HKUST 概率人工智能资深教授，研究贝叶斯网络、潜树模型和深度概率模型；公开博士去向覆盖 Amazon、Meta 与高校。",
    facts: [
      fact("当前任职", "HKUST CSE 教授。", sources.nevin),
      fact("教育与学术训练", "北京师范大学应用数学硕士、博士；University of British Columbia 计算机博士。", sources.nevin),
      fact("研究主线", "贝叶斯网络、潜树模型、多维聚类、层次主题发现与深度概率模型。", sources.nevin),
      fact("学术服务", "担任 Artificial Intelligence Journal 与 International Journal of Approximate Reasoning 副编辑。", sources.nevin),
      fact("人才培养", "HKUST 博士校友页列出 Dongkyu Lee、Zhiliang Tian、Farhan Khawar、Xiaopeng Li 等由其指导。", sources.hkustGraduates),
    ],
    sources: [sources.nevin, sources.hkustGraduates],
  }),
  person({
    id: "pedro-sander-hkust-p0-2026", name: "Pedro Sander", chinese: "辛达德", role: "Professor", institution: "HKUST", region: "Hong Kong",
    area: "Computer Graphics · Geometry Processing · Real-Time Rendering", tags: ["计算机图形学", "几何处理", "实时渲染", "GPU"], stage: "senior", x: 760, y: 120,
    portraitFile: "pedro-sander.jpg", portraitSource: sources.pedro,
    summary: "HKUST 计算机图形学教授，研究几何处理、实时渲染与图形硬件；ATI Research 经历和博士去向连接工业视觉制作与香港高校。",
    facts: [
      fact("当前任职", "HKUST CSE 教授。", sources.pedro),
      fact("教育与学术训练", "Stony Brook University 本科；Harvard University 硕士与计算机博士。", sources.pedro),
      fact("产业经历", "加入 HKUST 前于 2003–2006 年任 ATI Research Application Research Group senior member。", sources.pedro),
      fact("研究主线", "计算机图形学、几何处理、实时渲染和通用 GPU 计算。", sources.pedro),
      fact("人才培养", "HKUST 官方博士校友页列出 Li Ma、Jing Liao 等由其指导。", sources.hkustGraduates),
    ],
    sources: [sources.pedro, sources.hkustGraduates],
  }),
  person({
    id: "abhik-roychoudhury-nus-p0-2026", name: "Abhik Roychoudhury", role: "Provost's Chair Professor", institution: "NUS", region: "Singapore",
    area: "Trustworthy Software · Program Repair · Agentic Coding", tags: ["软件工程", "程序修复", "Agentic AI", "软件安全"], stage: "senior", x: 920, y: 120,
    portraitFile: "abhik-roychoudhury.jpg", portraitSource: sources.abhik,
    summary: "NUS 可信软件与自动程序修复领军教授，研究从符号执行延伸到 agentic coding；AutoCodeRover 被 Sonar 收购，博士生流向多个国际研究机构。",
    facts: [
      fact("当前任职", "NUS Computer Science Provost's Chair Professor，并任 DesCartes 新加坡联合主任。", sources.abhik),
      fact("教育与学术训练", "2000 年获 State University of New York at Stony Brook 计算机博士。", sources.abhik),
      fact("研究主线", "自动编程、程序修复、模糊测试、符号执行与可信软件系统。", sources.abhik),
      fact("产业连接", "其 agentic AI 软件项目 AutoCodeRover 被 SonarSource 收购后，担任 SonarSource Senior Advisor。", sources.abhik),
      fact("人才培养", "NUS TSUNAMi 去向页列出 Marcel Boehme、Sergey Mechtaev、Van Thuan Pham、Shin Hwei Tan 等博士生。", sources.abhikPlacement),
    ],
    sources: [sources.abhik, sources.abhikPlacement],
  }),
  person({
    id: "reza-shokri-nus-p0-2026", name: "Reza Shokri", role: "Dean's Chair Associate Professor", institution: "NUS", region: "Singapore",
    area: "ML Privacy · Trustworthy AI · AI Security", tags: ["机器学习隐私", "可信 AI", "AI 安全", "隐私审计"], stage: "senior", x: 1080, y: 120,
    portraitFile: "reza-shokri.jpg", portraitSource: sources.reza,
    summary: "NUS 机器学习隐私与可信 AI 副教授，研究成员推断、隐私审计和模型安全；公开团队覆盖 LLM 记忆、版权与隐私方向。",
    facts: [
      fact("当前任职", "NUS Computing Dean's Chair Associate Professor。", sources.reza),
      fact("教育与学术训练", "获 EPFL 计算机博士。", sources.reza),
      fact("研究主线", "机器学习隐私、可信 AI、隐私审计与安全。", sources.reza),
      fact("任职与产业连接", "2023–2024 年任 Microsoft Visiting Research Professor，并获 Meta、Google、Intel faculty research awards。", sources.reza),
      fact("当前团队", "第一方团队页列出 Jiayuan Ye、Jiashu Tao、Zitai Chen、Yao Tong 等博士生。", sources.rezaTeam),
    ],
    sources: [sources.reza, sources.rezaTeam],
  }),
  person({
    id: "bryan-low-nus-p0-2026", name: "Bryan Kian Hsiang Low", role: "Associate Professor · Director of AI Research, AI Singapore", institution: "NUS", region: "Singapore",
    area: "Probabilistic ML · Automated ML · Multi-Agent Systems", tags: ["概率机器学习", "AutoML", "多智能体", "AI for Science"], stage: "senior", x: 1240, y: 120,
    portraitFile: "bryan-low.jpg", portraitSource: sources.low,
    summary: "NUS 概率与自动化机器学习副教授，兼任 AI Singapore AI Research 主任和 NUS AI Institute 副主任；研究覆盖多智能体系统与 AI for Science。",
    facts: [
      fact("当前任职", "NUS 计算机副教授、AI Singapore Director of AI Research、NUS AI Institute Deputy Director。", sources.low),
      fact("教育与学术训练", "NUS 计算机本科、硕士；2009 年获 Carnegie Mellon University 电气与计算机工程博士。", sources.low),
      fact("研究主线", "概率与自动化机器学习、不确定性规划、多智能体和机器人系统。", sources.low),
      fact("研究组织", "领导 GLOW.AI，方向包括数据中心 AI、协作 AI、AutoML、LLM/MLLM 与 AI for Science。", sources.low),
      fact("当前学生", "NUS 学生主页明确 Gregory Kang Ruey Lau 为其指导的博士生。", sources.lowStudent),
    ],
    sources: [sources.low, sources.lowStudent],
  }),
  person({
    id: "wynne-hsu-nus-p0-2026", name: "Wynne Hsu", role: "Provost's Chair Professor · IDS Director", institution: "NUS", region: "Singapore",
    area: "Data Analytics · Machine Learning · Medical AI", tags: ["数据分析", "机器学习", "医疗 AI", "社交网络"], stage: "senior", x: 1400, y: 120,
    portraitFile: "wynne-hsu.jpg", portraitSource: sources.wynne,
    summary: "NUS 数据分析与机器学习资深教授、Institute of Data Science 主任，研究覆盖社交网络和视网膜影像；公开学生页保存了早期博士体系与职业去向。",
    facts: [
      fact("当前任职", "NUS Computer Science Provost's Chair Professor，并任 Institute of Data Science 主任。", sources.wynne),
      fact("教育与学术训练", "NUS 计算机学士；Purdue University 计算机硕士及电气与计算机工程博士。", sources.wynne),
      fact("研究主线", "社交网络数据分析、机器学习和视网膜图像分析。", sources.wynne),
      fact("研究组织", "以 NUS Institute of Data Science 主任身份组织跨学科数据科学研究。", sources.wynne),
      fact("人才培养", "第一方学生页列出其研究生、论文题目，以及 Stanford、Siemens、Seagate 等第一份工作。", sources.wynneStudents),
    ],
    sources: [sources.wynne, sources.wynneStudents],
  }),
  person({
    id: "wee-sun-lee-nus-p0-2026", name: "Wee Sun Lee", role: "Professor", institution: "NUS", region: "Singapore",
    area: "Machine Learning · Planning · Agentic AI", tags: ["机器学习", "规划", "Agentic AI", "近似推断"], stage: "senior", x: 1560, y: 120,
    portraitFile: "wee-sun-lee.jpg", portraitSource: sources.weeSun,
    summary: "NUS 机器学习与规划资深教授，当前关注 agentic AI 的推理、可靠性与偏好理解；博士生流向 Alibaba DAMO、AWS、Google、Grab 与高校。",
    facts: [
      fact("当前任职", "NUS 计算机科学系教授。", sources.weeSun),
      fact("教育与学术训练", "University of Queensland 工程学士；1996 年获 Australian National University 博士。", sources.weeSun),
      fact("任职轨迹", "曾任 NUS CS 系主任、Vice Dean of Undergraduate Studies 与 Vice Dean of Research，并访问 MIT。", sources.weeSun),
      fact("研究主线", "机器学习、不确定性规划、近似推断与 agentic AI。", sources.weeSun),
      fact("人才培养", "第一方主页公开当前博士生及校友进入 Alibaba DAMO、AWS、Google、Grab、SUTD 等机构的去向。", sources.weeSunStudents),
    ],
    sources: [sources.weeSun, sources.weeSunStudents],
  }),
];

export const candidatePriorityP0AsiaBatch5Relationships2026: Relationship[] = [];

export const candidatePriorityP0AsiaBatch5GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-asia-b5-arpit-eman", teacherId: "arpit-narechania-hkust-p0-2026", name: "Eman Ansar", role: "MPhil student", focus: "Human-AI visual analytics", source: sources.arpitTeam },
  { id: "candidate-p0-asia-b5-arpit-fengjie", teacherId: "arpit-narechania-hkust-p0-2026", name: "Fengjie Wang", role: "PhD student", focus: "Visual analytics", source: sources.arpitTeam },
  { id: "candidate-p0-asia-b5-reza-jiayuan", teacherId: "reza-shokri-nus-p0-2026", name: "Jiayuan Ye", role: "PhD student", focus: "LLM memorization and privacy", source: sources.rezaTeam },
  { id: "candidate-p0-asia-b5-reza-yao", teacherId: "reza-shokri-nus-p0-2026", name: "Yao Tong", role: "PhD student", focus: "Trustworthy AI and privacy", source: sources.rezaTeam },
  { id: "candidate-p0-asia-b5-low-gregory", teacherId: "bryan-low-nus-p0-2026", name: "Gregory Kang Ruey Lau", role: "PhD student", focus: "Data-centric AI and scientific discovery", source: sources.lowStudent },
];

const placement = (
  id: string,
  student: string,
  teacherId: string,
  company: string,
  role: string,
  sourceValue: Source,
  sector: StudentPlacement["sector"] = "industry",
): StudentPlacement => ({ id, student, teacherId, company, role, kind: "current", degree: "PhD", sector, source: sourceValue, verifiedAt: checkedAt });

export const candidatePriorityP0AsiaBatch5Placements2026: StudentPlacement[] = [
  placement("candidate-p0-asia-b5-horner-bin-wu", "Bin Wu", "andrew-horner-hkust-p0-2026", "Tencent Music Entertainment Group", "Director of Lyra Lab", sources.hkustGraduates),
  placement("candidate-p0-asia-b5-horner-simon-lui", "Simon Siu-Hang Lui", "andrew-horner-hkust-p0-2026", "Huawei Hong Kong Research Center", "Chief Expert (Audio)", sources.hkustGraduates),
  placement("candidate-p0-asia-b5-binhang-tianyi", "Tianyi Bai", "binhang-yuan-hkust-p0-2026", "Tencent", "Tech Lead", sources.binhangHome),
  placement("candidate-p0-asia-b5-nevin-dongkyu", "Dongkyu Lee", "nevin-zhang-hkust-p0-2026", "Amazon", "Applied Scientist II", sources.hkustGraduates),
  placement("candidate-p0-asia-b5-nevin-xiaopeng", "Xiaopeng Li", "nevin-zhang-hkust-p0-2026", "Meta", "Research Scientist", sources.hkustGraduates),
  placement("candidate-p0-asia-b5-pedro-li-ma", "Li Ma", "pedro-sander-hkust-p0-2026", "Scanline VFX Studio", "Research Scientist", sources.hkustGraduates),
  placement("candidate-p0-asia-b5-pedro-jing-liao", "Jing Liao", "pedro-sander-hkust-p0-2026", "City University of Hong Kong", "Associate Professor", sources.hkustGraduates, "academia"),
  placement("candidate-p0-asia-b5-abhik-sergey", "Sergey Mechtaev", "abhik-roychoudhury-nus-p0-2026", "University College London", "Lecturer", sources.abhikPlacement, "academia"),
  placement("candidate-p0-asia-b5-abhik-shin", "Shin Hwei Tan", "abhik-roychoudhury-nus-p0-2026", "Southern University of Science and Technology", "Assistant Professor", sources.abhikPlacement, "academia"),
  placement("candidate-p0-asia-b5-wynne-chen-jin", "Chen Jin", "wynne-hsu-nus-p0-2026", "Stanford University", "First employment", sources.wynneStudents, "academia"),
  placement("candidate-p0-asia-b5-wynne-gu-yan", "Gu Yan", "wynne-hsu-nus-p0-2026", "Seagate Technology", "First employment", sources.wynneStudents),
  placement("candidate-p0-asia-b5-wee-sun-ruidan", "He Ruidan", "wee-sun-lee-nus-p0-2026", "Alibaba DAMO Academy", "NLP Scientist", sources.weeSunStudents),
  placement("candidate-p0-asia-b5-wee-sun-cuong", "Nguyen Viet Cuong", "wee-sun-lee-nus-p0-2026", "Amazon Web Services", "Applied Scientist", sources.weeSunStudents),
  placement("candidate-p0-asia-b5-wee-sun-huy", "Nguyen Dinh Truong Huy", "wee-sun-lee-nus-p0-2026", "Google", "Software Engineer", sources.weeSunStudents),
];

export type CandidatePriorityP0AsiaBatch5RosterPromotion2026 = {
  unitUrl: string;
  rosterName: string;
  atlasPersonId: string;
};

export const candidatePriorityP0AsiaBatch5RosterPromotions2026: CandidatePriorityP0AsiaBatch5RosterPromotion2026[] = [
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Andrew B. HORNER", atlasPersonId: "andrew-horner-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Arpit NARECHANIA", atlasPersonId: "arpit-narechania-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Binhang YUAN", atlasPersonId: "binhang-yuan-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Nevin Lianwen ZHANG", atlasPersonId: "nevin-zhang-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Pedro SANDER", atlasPersonId: "pedro-sander-hkust-p0-2026" },
  { unitUrl: "https://www.comp.nus.edu.sg/about/faculty/", rosterName: "Abhik ROYCHOUDHURY", atlasPersonId: "abhik-roychoudhury-nus-p0-2026" },
  { unitUrl: "https://www.comp.nus.edu.sg/about/faculty/", rosterName: "Reza SHOKRI", atlasPersonId: "reza-shokri-nus-p0-2026" },
  { unitUrl: "https://www.comp.nus.edu.sg/about/faculty/", rosterName: "LOW Kian Hsiang", atlasPersonId: "bryan-low-nus-p0-2026" },
  { unitUrl: "https://www.comp.nus.edu.sg/about/faculty/", rosterName: "HSU Wynne", atlasPersonId: "wynne-hsu-nus-p0-2026" },
  { unitUrl: "https://www.comp.nus.edu.sg/about/faculty/", rosterName: "LEE Wee Sun", atlasPersonId: "wee-sun-lee-nus-p0-2026" },
];

export const People = candidatePriorityP0AsiaBatch5People2026;
export const Relationships = candidatePriorityP0AsiaBatch5Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch5Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch5GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch5RosterPromotions2026;

export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
