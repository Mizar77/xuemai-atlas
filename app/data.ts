export type Source = {
  label: string;
  url: string;
  kind: "official" | "cv" | "thesis" | "profile";
};

export type Institution = "NUS" | "NTU" | "SUTD" | "SMU" | "A*STAR" | "External";
export type Stage = "senior" | "emerging" | "institute" | "adjacent" | "historical";
export type Category = "core" | "adjacent" | "historical";

export type Person = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Institution;
  area: string;
  tags: string[];
  summary: string;
  stage: Stage;
  category: Category;
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

export const stageLabels: Record<Stage, string> = {
  senior: "资深 PI",
  emerging: "发展期独立 PI",
  institute: "研究院 PI",
  adjacent: "AI / 系统相邻",
  historical: "历史 / 跨地区",
};

export const people: Person[] = [
  {
    id: "hwee-tou-ng", name: "Hwee Tou Ng", role: "Provost’s Chair Professor", institution: "NUS",
    area: "Natural Language Processing", tags: ["NLP", "语法纠错", "ACL Fellow"], stage: "senior", category: "core",
    summary: "NUS NLP Group 负责人之一，长期研究自然语言处理与语法纠错；Wei Lu 的博士导师。",
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
    id: "tat-seng-chua", name: "Tat-Seng Chua", role: "KITHCT Chair Professor · NExT Director", institution: "NUS",
    area: "Multimodal Foundation Models · Search", tags: ["多模态基础模型", "对话搜索", "Responsible AI", "创业"], stage: "senior", category: "core",
    summary: "NExT 中心负责人，研究多模态基础模型、可信 AI 与对话搜索；公开资料记录联合实验室及创业连接。",
    sources: [{ label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/chuats/", kind: "official" }],
    x: 130, y: 275, primary: true,
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
    ], x: 215, y: 515, primary: true,
  },

  {
    id: "shafiq-joty", name: "Shafiq Joty", role: "Associate Professor · Salesforce Research", institution: "NTU",
    area: "Multilingual & Robust NLP · LLM", tags: ["多语言 NLP", "LLM", "Salesforce Research", "联合任职"], stage: "senior", category: "core",
    summary: "NTU NLP 的关键 PI，同时公开列有 Salesforce Research 身份，是新加坡学界—工业界最直接的连接之一。",
    sources: [
      { label: "NTU EMNLP 2024 公告", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing", kind: "official" },
      { label: "NTU AI Faculty", url: "https://www.ntu.edu.sg/computing/ai-at-ntu/ai-faculty", kind: "official" },
    ], x: 485, y: 155, primary: true,
  },
  {
    id: "aixin-sun", name: "Aixin Sun", role: "Associate Professor · Associate Dean", institution: "NTU",
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
    id: "bo-an", name: "Bo An", role: "President’s Chair Professor · AI Division Head", institution: "NTU",
    area: "Multi-agent Systems · RL", tags: ["Multi-agent", "博弈论", "强化学习"], stage: "adjacent", category: "adjacent",
    summary: "NTU AI Division 负责人，重点是多智能体、计算博弈与强化学习；属于 Agentic AI 相邻层。",
    sources: [{ label: "NTU 个人主页", url: "https://personal.ntu.edu.sg/boan/", kind: "official" }],
    x: 660, y: 395, primary: true,
  },

  {
    id: "wei-lu", name: "Wei Lu", chinese: "陆伟", role: "Professor", institution: "SUTD",
    area: "NLP · Modern Language Models", tags: ["NLP", "语言模型", "结构化预测", "Alibaba"], stage: "senior", category: "core",
    summary: "SUTD 语言技术的重要资深 PI；NUS Hwee Tou Ng 的博士生，公开资料记录与 Alibaba 的研究合作。",
    sources: [
      { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/esd/profile/lu-wei/", kind: "official" },
      { label: "NUS NLP Group alumni", url: "https://www.comp.nus.edu.sg/~nlp/people.html", kind: "official" },
    ], x: 855, y: 155, primary: true,
  },
  {
    id: "soujanya-poria", name: "Soujanya Poria", role: "Assistant Professor · Provost’s Chair Early Career Professor", institution: "SUTD",
    area: "Multimodal Conversational AI", tags: ["多模态 NLP", "情感计算", "对话", "DeCLaRe Lab"], stage: "emerging", category: "core",
    summary: "DeCLaRe Lab 负责人，研究多模态对话、情感与常识；是 SUTD 发展迅速的独立 PI。",
    sources: [
      { label: "SUTD Research Story", url: "https://www.sutd.edu.sg/stories-listing/summary-of-dr-porias-research-statement-on-multimodal-ai-and-nlp/", kind: "official" },
      { label: "SUTD Chair Appointment", url: "https://www.sutd.edu.sg/achievements-listing/congratulations-to-professor-tony-quek-and-assistant-professor-soujanya-poria-for-their-chair-professorships-appointment/", kind: "official" },
    ], x: 1030, y: 155, primary: true,
  },
  {
    id: "wenxuan-zhang", name: "Wenxuan Zhang", role: "Tenure-track Assistant Professor · iNLP Lab", institution: "SUTD",
    area: "LLM · Audio-Language · Agents", tags: ["SeaLLMs", "LLM Agents", "多语言", "NRF Fellow", "Alibaba"], stage: "emerging", category: "core",
    summary: "iNLP Lab 独立 PI、2026 NRF Fellow；此前任 Alibaba Singapore 研究科学家，研究多语言、多模态与智能体。",
    sources: [
      { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/profile/zhang-wenxuan", kind: "official" },
      { label: "Research & Grants", url: "https://isakzhang.github.io/research.html", kind: "profile" },
    ], x: 940, y: 285, primary: true,
  },

  {
    id: "yang-deng", name: "Yang Deng", chinese: "邓扬", role: "Assistant Professor · CHAT NLP Group", institution: "SMU",
    area: "Conversational · Agentic · Trustworthy NLP", tags: ["对话", "Agentic AI", "LLM", "Google Research Award"], stage: "emerging", category: "core",
    summary: "CHAT NLP Group 独立 PI，研究对话、人本、智能体与可信 NLP；博士后阶段在 NUS NExT++。",
    sources: [
      { label: "SMU Faculty Profile", url: "https://faculty.smu.edu.sg/profile/deng-yang-7801", kind: "official" },
      { label: "CHAT NLP Group", url: "https://dengyang17.github.io/", kind: "profile" },
    ], x: 855, y: 475, primary: true,
  },
  {
    id: "yunshan-ma", name: "Yunshan Ma", role: "Assistant Professor", institution: "SMU",
    area: "Recommender Systems · LLM", tags: ["推荐系统", "LLM", "数据挖掘"], stage: "emerging", category: "core",
    summary: "新独立 PI，研究推荐系统、数据挖掘与大模型增强推荐；博士毕业于 NUS。",
    sources: [{ label: "SMU Faculty Profile", url: "https://faculty.smu.edu.sg/profile/ma-yunshan-7956", kind: "official" }],
    x: 1030, y: 475, primary: true,
  },
  {
    id: "jing-jiang", name: "Jing Jiang", role: "Professor · SMU on leave / ANU current", institution: "SMU",
    area: "Applied NLP · Information Extraction", tags: ["NLP", "信息抽取", "跨地区流动"], stage: "historical", category: "historical",
    summary: "SMU NLP 的历史关键节点；目前公开资料显示在 ANU 任职并于 SMU 休假，因此不计入当前新加坡核心 PI。",
    status: "历史 / 跨地区节点，不计入当前核心 PI 数",
    sources: [{ label: "SMU Faculty Directory", url: "https://faculty.smu.edu.sg/profile/jing-jiang-636", kind: "official" }],
    x: 940, y: 570, primary: true,
  },

  {
    id: "nancy-chen", name: "Nancy Chen", role: "Senior Principal Scientist · Lead PI", institution: "A*STAR",
    area: "Speech · Conversational AI", tags: ["语音", "对话系统", "生成式 AI", "产业转化"], stage: "institute", category: "core",
    summary: "A*STAR I²R Lead PI，覆盖语音、对话、多语言与社会化 AI，团队成果已有商业 spin-off 和政府部署。",
    sources: [{ label: "A*STAR I²R Profile", url: "https://www.a-star.edu.sg/i2r/i2r-profiles/nancychen", kind: "official" }],
    x: 540, y: 700, primary: true,
  },
  {
    id: "ai-ti-aw", name: "Ai Ti Aw", role: "Head · Aural & Language Intelligence", institution: "A*STAR",
    area: "Machine Translation · Southeast Asian NLP", tags: ["机器翻译", "东南亚语言", "MERaLiON", "National Multimodal LLM"], stage: "institute", category: "core",
    summary: "A*STAR I²R 语言智能部门负责人，长期建设本地与东南亚语言技术，并共同领导国家多模态 LLM 计划。",
    sources: [{ label: "A*STAR Research Profile", url: "https://research.a-star.edu.sg/researcher/aiti-aw/", kind: "official" }],
    x: 720, y: 700, primary: true,
  },
  {
    id: "jian-su", name: "Jian Su", role: "Principal Scientist · NLP Group Leader", institution: "A*STAR",
    area: "NLP · Large-scale Deployment", tags: ["NLP", "Baidu-I²R", "技术部署", "研究院 PI"], stage: "institute", category: "core",
    summary: "A*STAR I²R NLP Group 负责人，并任 Baidu-I²R Research Centre 联合主任，连接国际合作与大规模部署。",
    sources: [{ label: "A*STAR Research Profile", url: "https://research.a-star.edu.sg/researcher/jian-su/", kind: "official" }],
    x: 900, y: 700, primary: true,
  },

  { id: "raymond-mooney", name: "Raymond Mooney", role: "Professor", institution: "External", area: "Machine Learning · NLP", tags: ["导师", "UT Austin"], stage: "historical", category: "historical", summary: "Hwee Tou Ng 博士导师。", sources: [{ label: "Ng 博士论文", url: "https://www.cs.utexas.edu/~ml/papers/hweetou_dissertation.pdf", kind: "thesis" }], x: 85, y: 40 },
  { id: "kathleen-mckeown", name: "Kathleen McKeown", role: "Professor", institution: "External", area: "Natural Language Processing", tags: ["导师", "Columbia"], stage: "historical", category: "historical", summary: "Min-Yen Kan CV 列出的博士导师之一。", sources: [{ label: "Kan CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" }], x: 295, y: 40 },
  { id: "wai-lam", name: "Wai Lam", role: "Professor", institution: "External", area: "NLP · Information Retrieval", tags: ["导师", "CUHK"], stage: "historical", category: "historical", summary: "Yang Deng 与 Wenxuan Zhang 的博士导师。", sources: [{ label: "CUHK Profile", url: "https://research.cuhk.edu.hk/en/persons/wai-lam/", kind: "official" }], x: 1000, y: 40 },
  { id: "sinno-pan", name: "Sinno Jialin Pan", role: "Professor", institution: "External", area: "Machine Learning", tags: ["导师"], stage: "historical", category: "historical", summary: "Wenya Wang 公开主页列出的博士导师。", sources: [{ label: "Wenya Wang 主页", url: "https://personal.ntu.edu.sg/wangwy/", kind: "official" }], x: 650, y: 40 },
];

export const relationships: Relationship[] = [
  { id: "mooney-ng", from: "raymond-mooney", to: "hwee-tou-ng", type: "lineage", label: "博士导师", evidence: "Ng 的博士论文致谢明确称 Raymond Mooney 为 advisor。", source: { label: "UT Austin 博士论文", url: "https://www.cs.utexas.edu/~ml/papers/hweetou_dissertation.pdf", kind: "thesis" }, verified: true },
  { id: "mckeown-kan", from: "kathleen-mckeown", to: "min-yen-kan", type: "lineage", label: "博士导师", evidence: "Kan 的 CV 列出 Kathleen McKeown 与 Judith Klavans 为导师。", source: { label: "Min-Yen Kan CV", url: "https://www.comp.nus.edu.sg/~kanmy/cv.1page.html", kind: "cv" }, verified: true },
  { id: "ng-lu", from: "hwee-tou-ng", to: "wei-lu", type: "lineage", label: "博士导师", evidence: "NUS NLP Group alumni 页将 Wei Lu 列为 2009 年博士毕业生；SUTD 履历与该记录一致。", source: { label: "NUS NLP Group alumni", url: "https://www.comp.nus.edu.sg/~nlp/people.html", kind: "official" }, verified: true },
  { id: "lam-deng", from: "wai-lam", to: "yang-deng", type: "lineage", label: "博士导师", evidence: "Yang Deng 的公开招聘资料明确写明博士阶段由 Wai Lam 指导。", source: { label: "Yang Deng Openings", url: "https://dengyang17.github.io/files/Openings.pdf", kind: "cv" }, verified: true },
  { id: "lam-zhang", from: "wai-lam", to: "wenxuan-zhang", type: "lineage", label: "博士导师", evidence: "SUTD 官方简介明确写明 Wenxuan Zhang 的博士导师为 Wai Lam。", source: { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/profile/zhang-wenxuan", kind: "official" }, verified: true },
  { id: "pan-wang", from: "sinno-pan", to: "wenya-wang", type: "lineage", label: "博士导师", evidence: "Wenya Wang 主页明确写明其博士阶段由 Sinno Jialin Pan 指导。", source: { label: "Wenya Wang 主页", url: "https://personal.ntu.edu.sg/wangwy/", kind: "official" }, verified: true },

  { id: "ng-kan", from: "hwee-tou-ng", to: "min-yen-kan", type: "collaboration", label: "论文合作", evidence: "NUS 公开出版物记录两人的共同论文。", source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/kanmy/", kind: "official" }, verified: true },
  { id: "deng-chua", from: "tat-seng-chua", to: "yang-deng", type: "talent", label: "博士后指导 / NExT++", evidence: "Yang Deng 主页写明其在 NUS NExT++ 博士后阶段与 Tat-Seng Chua、See-Kiong Ng 工作。", source: { label: "CHAT NLP Group", url: "https://dengyang17.github.io/", kind: "profile" }, verified: true },
  { id: "deng-zhang", from: "yang-deng", to: "wenxuan-zhang", type: "collaboration", label: "LLM knowledge boundary 合作", evidence: "两人共同参与 LLM knowledge boundary 综述与教程，也连接 SMU 与 SUTD 的新生代 NLP 群体。", source: { label: "公开综述", url: "https://dengyang17.github.io/files/arxiv_Knowledge_Boundary_Survey.pdf", kind: "profile" }, verified: true },
  { id: "joty-chen", from: "shafiq-joty", to: "nancy-chen", type: "collaboration", label: "EMNLP 2024 合作", evidence: "NTU 公告记录 Shafiq Joty、Nancy Chen 等人的共同论文获 EMNLP 2024 Outstanding Paper。", source: { label: "NTU 公告", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing", kind: "official" }, verified: true },
  { id: "joty-sun", from: "shafiq-joty", to: "aixin-sun", type: "collaboration", label: "共同指导", evidence: "NTU 公告记录两人与 Nancy Chen 共同指导摘要生成方向博士生。", source: { label: "NTU SDSC Fellowship", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/phd-student-awarded-a-sdsc-dissertation-research-fellowship-2022", kind: "official" }, verified: true },

  { id: "qizhe-google", from: "qizhe-shieh", to: "qizhe-shieh", type: "industry", label: "Google DeepMind / Brain 前研究经历", evidence: "NUS 官方简介称其加入 NUS 前在 Google DeepMind（原 Google Brain）研究两年。", source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/mshieh/", kind: "official" }, verified: true },
  { id: "chua-sea", from: "tat-seng-chua", to: "tat-seng-chua", type: "industry", label: "Sea-NExT Joint Lab / 创业", evidence: "NUS 官方简介列出 Sea-NExT Joint Lab 以及两家新加坡技术创业公司。", source: { label: "NUS Faculty Profile", url: "https://www.comp.nus.edu.sg/cs/people/chuats/", kind: "official" }, verified: true },
  { id: "kenji-sea", from: "kenji-kawaguchi", to: "kenji-kawaguchi", type: "industry", label: "Sea AI Lab 论文合作", evidence: "NUS 公告记录其与 Sea AI Lab 研究负责人 Min Lin 的共同工作。", source: { label: "NUS 公告", url: "https://www.comp.nus.edu.sg/news-media/kenji-kawaguchi-wins-best-paper-award-at-neurips2024/", kind: "official" }, verified: true },
  { id: "you-google", from: "yang-you", to: "yang-you", type: "industry", label: "Google Research Award · 2026", evidence: "NUS 公告确认其获得 Google 2026 研究奖。", source: { label: "NUS 公告", url: "https://www.comp.nus.edu.sg/bytes/nus-presidential-young-professor-yang-you-wins-google-research-award-to-build-foundations-for-next-generation-ai/", kind: "official" }, verified: true },
  { id: "joty-salesforce", from: "shafiq-joty", to: "shafiq-joty", type: "industry", label: "Salesforce Research 联合身份", evidence: "NTU 官方公告将其署名为 Salesforce Research 与 NTU。", source: { label: "NTU 公告", url: "https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing", kind: "official" }, verified: true },
  { id: "cambria-industry", from: "erik-cambria", to: "erik-cambria", type: "industry", label: "MSRA / HP Labs / 创业", evidence: "NTU 实验室资料记录其企业研究经历与 SenticNet、finaXai 创业。", source: { label: "NTU Multi-Net Lab", url: "https://blogs.ntu.edu.sg/multi-net-lab/erik-cambria-5/", kind: "official" }, verified: true },
  { id: "lu-alibaba", from: "wei-lu", to: "wei-lu", type: "industry", label: "Alibaba 研究合作", evidence: "SUTD 公开报道介绍 Wei Lu 团队与 Alibaba 的 NLP 合作。", source: { label: "SUTD Story", url: "https://www.sutd.edu.sg/stories-listing/taking-natural-language-processing-to-greater-heights", kind: "official" }, verified: true },
  { id: "zhang-alibaba", from: "wenxuan-zhang", to: "wenxuan-zhang", type: "industry", label: "Alibaba Singapore 前研究科学家", evidence: "SUTD 官方简介记录其此前任 Alibaba Group Singapore 研究科学家并获 Ali Star。", source: { label: "SUTD Faculty Profile", url: "https://www.sutd.edu.sg/profile/zhang-wenxuan", kind: "official" }, verified: true },
  { id: "deng-google", from: "yang-deng", to: "yang-deng", type: "industry", label: "Google South / Southeast Asia Research Award", evidence: "SMU 官方 CV 记录其 2024 Google South Asia & Southeast Asia Research Award。", source: { label: "SMU CV", url: "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2025-02/ydeng-CV.pdf", kind: "cv" }, verified: true },
  { id: "nancy-transfer", from: "nancy-chen", to: "nancy-chen", type: "industry", label: "商业 spin-off / 政府部署", evidence: "A*STAR 官方简介称团队技术已形成商业 spin-off 和政府部署。", source: { label: "A*STAR I²R Profile", url: "https://www.a-star.edu.sg/i2r/i2r-profiles/nancychen", kind: "official" }, verified: true },
  { id: "su-baidu", from: "jian-su", to: "jian-su", type: "industry", label: "Baidu–I²R Research Centre", evidence: "A*STAR 官方资料列其为 Baidu I²R Research Centre 联合主任。", source: { label: "A*STAR Research Profile", url: "https://research.a-star.edu.sg/researcher/jian-su/", kind: "official" }, verified: true },
];

export const coverage = [
  { institution: "NUS", core: 4, adjacent: 3, note: "传统 NLP + 多模态/检索；另列 3 位 LLM 理论与系统相邻 PI" },
  { institution: "NTU", core: 5, adjacent: 1, note: "多语言、可信、情感与生成式语言智能" },
  { institution: "SUTD", core: 3, adjacent: 0, note: "Wei Lu、Soujanya Poria、Wenxuan Zhang 三个独立组" },
  { institution: "SMU", core: 2, adjacent: 0, note: "当前独立 PI；Jing Jiang 另列为历史/跨地区节点" },
  { institution: "A*STAR", core: 3, adjacent: 0, note: "研究院 PI：语音、机器翻译、区域语言与 NLP 部署" },
];

export const communities = [
  { kicker: "成熟谱系", name: "NUS Language & Multimodal", anchor: "Hwee Tou Ng · Min-Yen Kan · Tat-Seng Chua", description: "传统 NLP、检索与多模态基础模型并存，并向 SUTD 与 SMU 输送独立 PI。", color: "cobalt" },
  { kicker: "新生代集群", name: "SUTD Language Labs", anchor: "Wei Lu · Soujanya Poria · Wenxuan Zhang", description: "结构化 NLP、多模态对话、多语言 LLM 与 Agent 三条独立路线。", color: "lime" },
  { kicker: "多中心生态", name: "NTU NLP & Generative AI", anchor: "Shafiq Joty · Anh Tuan Luu · Wenya Wang", description: "多语言、可信 LLM、推理与情感计算，产业连接包括 Salesforce Research。", color: "coral" },
  { kicker: "研究院转化", name: "A*STAR Language Intelligence", anchor: "Ai Ti Aw · Nancy Chen · Jian Su", description: "东南亚语言、语音对话、国家多模态 LLM 与大规模技术部署。", color: "violet" },
];
