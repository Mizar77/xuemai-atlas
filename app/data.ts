export type Source = {
  label: string;
  url: string;
  kind: "official" | "cv" | "thesis" | "profile";
};

export type Person = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: "NUS" | "NTU" | "SMU" | "A*STAR" | "External";
  area: string;
  tags: string[];
  summary: string;
  status?: string;
  sources: Source[];
  x: number;
  y: number;
  primary?: boolean;
};

export type Relationship = {
  id: string;
  from: string;
  to: string;
  type: "lineage" | "collaboration" | "industry" | "talent";
  label: string;
  evidence: string;
  source: Source;
  verified: boolean;
};

export const people: Person[] = [
  {
    id: "hwee-tou-ng",
    name: "Hwee Tou Ng",
    role: "Provost’s Chair Professor",
    institution: "NUS",
    area: "Natural Language Processing",
    tags: ["NLP", "语法纠错", "ACL Fellow"],
    summary: "NUS 自然语言处理研究的重要资深 PI，博士毕业于 UT Austin。",
    sources: [
      { label: "NUS 个人主页", url: "https://www.comp.nus.edu.sg/~nght/", kind: "official" },
      { label: "博士论文致谢", url: "https://www.cs.utexas.edu/~ml/papers/hweetou_dissertation.pdf", kind: "thesis" },
    ],
    x: 170,
    y: 170,
    primary: true,
  },
  {
    id: "min-yen-kan",
    name: "Min-Yen Kan",
    chinese: "靳民彦",
    role: "Associate Professor · Vice Dean",
    institution: "NUS",
    area: "NLP · IR · Scholarly Communication",
    tags: ["NLP", "RAG", "数字图书馆", "LLM Safety"],
    summary: "WING.NUS 负责人，研究科学文献、检索、RAG 与大模型安全伦理。",
    sources: [
      { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/kanmy/", kind: "official" },
      { label: "个人 CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" },
    ],
    x: 385,
    y: 120,
    primary: true,
  },
  {
    id: "yang-you",
    name: "Yang You",
    role: "Presidential Young Professor",
    institution: "NUS",
    area: "Foundation Model Systems · HPC",
    tags: ["LLM Systems", "分布式训练", "基础模型"],
    summary: "HPC-AI Lab PI，关注基础模型训练、优化器和大规模分布式系统。",
    sources: [
      { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/youy/", kind: "official" },
      { label: "个人主页", url: "https://www.comp.nus.edu.sg/~youy/", kind: "cv" },
      { label: "Google Research Award", url: "https://www.comp.nus.edu.sg/bytes/nus-presidential-young-professor-yang-you-wins-google-research-award-to-build-foundations-for-next-generation-ai/", kind: "official" },
    ],
    x: 240,
    y: 365,
    primary: true,
  },
  {
    id: "erik-cambria",
    name: "Erik Cambria",
    role: "Provost Chair · Professor of AI",
    institution: "NTU",
    area: "Affective & Neurosymbolic NLP",
    tags: ["情感计算", "神经符号 AI", "创业"],
    summary: "Sentic Computing 代表性学者，同时有研究院任职与多次 AI 创业经历。",
    sources: [
      { label: "NTU Multi-Net Lab", url: "https://blogs.ntu.edu.sg/multi-net-lab/erik-cambria-5/", kind: "official" },
      { label: "SenticNet Bio", url: "https://sentic.net/erikcambria/", kind: "profile" },
    ],
    x: 570,
    y: 205,
    primary: true,
  },
  {
    id: "bo-an",
    name: "Bo An",
    role: "President’s Chair Professor · AI Division Head",
    institution: "NTU",
    area: "Multi-agent Systems · RL",
    tags: ["Multi-agent", "博弈论", "强化学习"],
    summary: "NTU AI Division 负责人，研究多智能体、计算博弈与强化学习。",
    sources: [
      { label: "NTU 个人主页", url: "https://personal.ntu.edu.sg/boan/", kind: "official" },
      { label: "官方 CV", url: "https://personal.ntu.edu.sg/boan/CV-BOAN.pdf", kind: "cv" },
    ],
    x: 735,
    y: 350,
    primary: true,
  },
  {
    id: "aixin-sun",
    name: "Aixin Sun",
    role: "Associate Professor · Associate Dean",
    institution: "NTU",
    area: "IR · Recommender Systems · NLP",
    tags: ["IR", "推荐系统", "NLP"],
    summary: "横跨信息检索、推荐系统和自然语言处理的 NTU 教授。",
    sources: [
      { label: "NTU Biography", url: "https://www3.ntu.edu.sg/home/AXSun/bio.html", kind: "official" },
    ],
    x: 620,
    y: 475,
    primary: true,
  },
  {
    id: "jing-jiang",
    name: "Jing Jiang",
    role: "Professor · on leave",
    institution: "SMU",
    area: "Applied NLP · Information Extraction",
    tags: ["NLP", "信息抽取", "问答", "跨地区流动"],
    summary: "长期任职 SMU 的 NLP 教授；公开资料显示目前在 ANU 任职并于 SMU 休假。",
    status: "跨地区节点：SMU on leave / ANU current",
    sources: [
      { label: "SMU Faculty Directory", url: "https://faculty.smu.edu.sg/profile/jing-jiang-636", kind: "official" },
      { label: "ORCID 任职记录", url: "https://orcid.org/0000-0002-3035-0074", kind: "profile" },
    ],
    x: 770,
    y: 105,
    primary: true,
  },
  {
    id: "nancy-chen",
    name: "Nancy Chen",
    role: "Senior Principal Scientist · Lead PI",
    institution: "A*STAR",
    area: "Speech · Conversational AI",
    tags: ["语音", "对话系统", "生成式 AI", "产业转化"],
    summary: "A*STAR I²R Lead PI，团队成果已有商业 spin-off 和政府部署。",
    sources: [
      { label: "A*STAR I²R Profile", url: "https://www.a-star.edu.sg/i2r/i2r-profiles/nancychen", kind: "official" },
      { label: "MIT 个人页", url: "https://people.csail.mit.edu/nancyc/index-new.htm", kind: "profile" },
    ],
    x: 465,
    y: 420,
    primary: true,
  },
  {
    id: "raymond-mooney",
    name: "Raymond Mooney",
    role: "Professor",
    institution: "External",
    area: "Machine Learning · NLP",
    tags: ["导师节点", "UT Austin"],
    summary: "Hwee Tou Ng 博士论文中明确致谢的博士导师。",
    sources: [{ label: "Hwee Tou Ng 博士论文", url: "https://www.cs.utexas.edu/~ml/papers/hweetou_dissertation.pdf", kind: "thesis" }],
    x: 55,
    y: 45,
  },
  {
    id: "kathleen-mckeown",
    name: "Kathleen McKeown",
    role: "Professor",
    institution: "External",
    area: "Natural Language Processing",
    tags: ["导师节点", "Columbia"],
    summary: "Min-Yen Kan CV 列出的博士导师之一。",
    sources: [{ label: "Min-Yen Kan CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" }],
    x: 345,
    y: 25,
  },
  {
    id: "james-demmel",
    name: "James Demmel",
    role: "Professor",
    institution: "External",
    area: "Numerical Computing · HPC",
    tags: ["导师节点", "UC Berkeley"],
    summary: "Yang You 个人主页明确列出的博士导师。",
    sources: [{ label: "Yang You 个人主页", url: "https://www.comp.nus.edu.sg/~youy/", kind: "cv" }],
    x: 95,
    y: 335,
  },
  {
    id: "victor-lesser",
    name: "Victor Lesser",
    role: "Professor Emeritus",
    institution: "External",
    area: "Multi-agent Systems",
    tags: ["导师节点", "UMass Amherst"],
    summary: "Bo An 官方 CV 明确列出的博士导师。",
    sources: [{ label: "Bo An CV", url: "https://personal.ntu.edu.sg/boan/CV-BOAN.pdf", kind: "cv" }],
    x: 820,
    y: 430,
  },
];

export const relationships: Relationship[] = [
  {
    id: "mooney-ng",
    from: "raymond-mooney",
    to: "hwee-tou-ng",
    type: "lineage",
    label: "博士导师",
    evidence: "Ng 的博士论文致谢明确称 Raymond Mooney 为 advisor。",
    source: { label: "UT Austin 博士论文", url: "https://www.cs.utexas.edu/~ml/papers/hweetou_dissertation.pdf", kind: "thesis" },
    verified: true,
  },
  {
    id: "mckeown-kan",
    from: "kathleen-mckeown",
    to: "min-yen-kan",
    type: "lineage",
    label: "博士导师",
    evidence: "Kan 的 CV 列出 Kathleen McKeown 与 Judith Klavans 为导师。",
    source: { label: "Min-Yen Kan CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" },
    verified: true,
  },
  {
    id: "demmel-you",
    from: "james-demmel",
    to: "yang-you",
    type: "lineage",
    label: "博士导师",
    evidence: "Yang You 个人主页明确列出 PhD Advisor: James Demmel。",
    source: { label: "Yang You 个人主页", url: "https://www.comp.nus.edu.sg/~youy/", kind: "cv" },
    verified: true,
  },
  {
    id: "lesser-an",
    from: "victor-lesser",
    to: "bo-an",
    type: "lineage",
    label: "博士导师",
    evidence: "Bo An 官方 CV 列出 Victor Lesser 为博士导师。",
    source: { label: "Bo An CV", url: "https://personal.ntu.edu.sg/boan/CV-BOAN.pdf", kind: "cv" },
    verified: true,
  },
  {
    id: "ng-kan",
    from: "hwee-tou-ng",
    to: "min-yen-kan",
    type: "collaboration",
    label: "论文合作",
    evidence: "NUS 公开出版物列表包含 Hwee Tou Ng 与 Min-Yen Kan 的共同论文。",
    source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/kanmy/", kind: "official" },
    verified: true,
  },
  {
    id: "you-google",
    from: "yang-you",
    to: "yang-you",
    type: "industry",
    label: "Google Research Award · 2026",
    evidence: "NUS 公告确认其获得 Google 2026 机器学习研究与 TPU 教育奖。",
    source: { label: "NUS 公告", url: "https://www.comp.nus.edu.sg/bytes/nus-presidential-young-professor-yang-you-wins-google-research-award-to-build-foundations-for-next-generation-ai/", kind: "official" },
    verified: true,
  },
  {
    id: "cambria-industry",
    from: "erik-cambria",
    to: "erik-cambria",
    type: "industry",
    label: "MSRA / HP Labs / 创业",
    evidence: "NTU 实验室介绍记录其曾任职 Microsoft Research Asia、HP Labs，并创办 SenticNet、finaXai。",
    source: { label: "NTU Multi-Net Lab", url: "https://blogs.ntu.edu.sg/multi-net-lab/erik-cambria-5/", kind: "official" },
    verified: true,
  },
  {
    id: "nancy-transfer",
    from: "nancy-chen",
    to: "nancy-chen",
    type: "industry",
    label: "商业 spin-off / 政府部署",
    evidence: "A*STAR 官方简介称团队的生成式语音与语言技术已形成商业 spin-off 和政府部署。",
    source: { label: "A*STAR I²R Profile", url: "https://www.a-star.edu.sg/i2r/i2r-profiles/nancychen", kind: "official" },
    verified: true,
  },
  {
    id: "kan-google-talent",
    from: "min-yen-kan",
    to: "min-yen-kan",
    type: "talent",
    label: "博士毕业生 → Google",
    evidence: "NUS 学者页列出博士毕业生 Chen Tao 的去向为 Google。仅标作人才流向，不等同于 PI 的正式企业关系。",
    source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/kanmy/", kind: "official" },
    verified: true,
  },
];

export const communities = [
  {
    kicker: "成熟谱系",
    name: "NUS Language Intelligence",
    anchor: "Hwee Tou Ng · Min-Yen Kan",
    description: "由传统 NLP、信息检索延伸到 RAG、科学文献理解和 LLM 安全。",
    color: "cobalt",
  },
  {
    kicker: "独立 PI 锚点",
    name: "Foundation Model Systems",
    anchor: "Yang You · NUS HPC-AI",
    description: "连接 Berkeley HPC 谱系、基础模型训练与 Google / NVIDIA 等产业生态。",
    color: "lime",
  },
  {
    kicker: "跨主题群落",
    name: "NTU Agentic & Affective AI",
    anchor: "Bo An · Erik Cambria · Aixin Sun",
    description: "多智能体、强化学习、情感计算、信息检索之间形成互补集群。",
    color: "coral",
  },
  {
    kicker: "研究院转化",
    name: "A*STAR Conversational AI",
    anchor: "Nancy Chen · I²R",
    description: "从语音和对话研究延伸到政府部署与商业转化。",
    color: "violet",
  },
];
