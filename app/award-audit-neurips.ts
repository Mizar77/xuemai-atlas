import type { Institution, Person, Region, Relationship, Source, Stage } from "./data";

const checkedAt = "2026-08-31";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const award2023 = official(
  "NeurIPS Virtual · 2023 Awards",
  "https://neurips.cc/virtual/2023/awards_detail",
  "Official award categories, paper titles and author lists for NeurIPS 2023",
);
const award2024 = official(
  "NeurIPS Virtual · 2024 Awards",
  "https://neurips.cc/virtual/2024/awards_detail",
  "Official best-paper and runner-up titles for NeurIPS 2024",
);
const award2025 = official(
  "NeurIPS Virtual · 2025 Awards",
  "https://neurips.cc/virtual/2025/awards_detail",
  "Official award tiers, paper titles and author lists for NeurIPS 2025",
);

const profiles = {
  boaz: official("Harvard SEAS · Boaz Barak", "https://seas.harvard.edu/person/boaz-barak", "Current Harvard title and ML/theory research areas"),
  colin: official("University of Toronto CS · Faculty directory", "https://web.cs.toronto.edu/people/faculty-directory", "Current associate professorship and collaborative/large-language-model research"),
  anima: official("Caltech Directory · Animashree Anandkumar", "https://directory.caltech.edu/personnel/anima", "Bren Professorship, education and Caltech appointment"),
  stephan: official("UC Irvine ICS · Stephan Mandt", "https://ics.uci.edu/?people=stephan-mandt", "Current professorship, HPI/AISI leadership and generative-model research"),
  pierre: official("UC Irvine Engineering · Pierre Baldi", "https://engineering.uci.edu/users/pierre-baldi", "Current Chancellor's Professorship and AI/ML research"),
  dan: official("Center for AI Safety · Leadership", "https://safe.ai/about", "Dan Hendrycks as Executive and Research Director and CAIS research mission"),
  dawn: official("UC Berkeley EECS · Dawn Song", "https://www2.eecs.berkeley.edu/Faculty/Homepages/song.html", "Current professorship, RDI co-directorship and AI safety/security research"),
  boli: official("UIUC ECE · Bo Li", "https://ece.illinois.edu/about/directory/faculty/lbo", "Current associate professorship and trustworthy-ML/security research"),
  liwei: official("Peking University AI · Liwei Wang", "https://www.ai.pku.edu.cn/en/info/1409/1831.htm", "Current professorship and machine-learning research"),
  yujiu: official("Tsinghua SIGS · Yujiu Yang", "https://openfiesta.sigs.tsinghua.edu.cn/pi/3/24", "Current professorship, education and NLP/CV research"),
  jaakko: official("Aalto University · Jaakko Lehtinen", "https://www.aalto.fi/en/people/jaakko-lehtinen", "Current associate professorship and graphics/vision/AI research"),
  scott: official("Oxford Internet Institute · Scott A. Hale", "https://www.oii.ox.ac.uk/people/profiles/scott-hale/", "Current professorship/directorship, lab and doctoral-supervision status"),
  maarten: official("CMU LTI · Maarten Sap", "https://www.lti.cs.cmu.edu/people/faculty/sap-maarten.html", "Current assistant professorship, advisees and social-intelligence/NLP research"),
  tomasz: official("Warsaw University of Technology CVLab · Tomasz Trzcinski", "https://cvlab.ii.pw.edu.pl/ttrzcins/", "Full professorship, CVLab leadership and research trajectory"),
  ben: official("Princeton CS · Benjamin Eysenbach", "https://www.cs.princeton.edu/people/profile/eysenbach", "Current assistant professorship, education and reinforcement-learning research"),
  shiji: official("Tsinghua Automation · Shiji Song", "https://www.au.tsinghua.edu.cn/en/info/1103/3350.htm", "Current professorship and ML/RL/optimization research"),
  gao: official("Tsinghua Automation · Gao Huang", "https://www.au.tsinghua.edu.cn/info/1075/3183.htm", "Current tenured associate professorship, career history and foundation-model research"),
  steve: official("Purdue CS · Steve Hanneke", "https://www.cs.purdue.edu/people/faculty/hanneke.html", "Current assistant professorship, education and learning-theory research"),
  giulio: official("LPENS · Giulio Biroli", "https://www.lpens.ens.psl.eu/giulio-biroli/?lang=en", "Current full professorship and statistical-physics/ML teaching"),
  marc: official("Bocconi Computing Sciences · Marc Mezard", "https://cs.unibocconi.eu/faculty/marc-mezard", "Current professorship and statistical-physics/ML research"),
};

export type AwardAuditPerson = Person & { actualInstitution?: string };

type PersonInput = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Institution;
  actualInstitution?: string;
  region: Region;
  area: string;
  tags: string[];
  summary: string;
  stage: Stage;
  profile: Source;
  award: Source;
  awardFact: string;
  careerFact: string;
  researchFact: string;
  x: number;
  y: number;
};

const person = (input: PersonInput): AwardAuditPerson => ({
  id: input.id,
  name: input.name,
  chinese: input.chinese,
  role: input.role,
  institution: input.institution,
  actualInstitution: input.actualInstitution,
  region: input.region,
  area: input.area,
  tags: input.tags,
  summary: input.summary,
  facts: [
    { label: "当前任职 / 研究组织", value: input.careerFact, source: input.profile },
    { label: "研究主题", value: input.researchFact, source: input.profile },
    { label: "NeurIPS 获奖记录", value: input.awardFact, source: input.award },
  ],
  stage: input.stage,
  category: input.institution === "External" ? "adjacent" : "core",
  status: "current PI · award-audited",
  sources: [input.profile, input.award],
  x: input.x,
  y: input.y,
  primary: true,
  lastVerifiedAt: checkedAt,
});

/**
 * Reverse audit of current faculty / independent PIs on NeurIPS award papers.
 * Existing atlas names were resolved first; this array contains only missing people.
 */
export const neuripsAwardAuditPeople: AwardAuditPerson[] = [
  person({ id: "boaz-barak-award", name: "Boaz Barak", role: "Catalyst Professor of Computer Science · Harvard University", institution: "External", actualInstitution: "Harvard University", region: "United States", area: "Machine Learning Foundations · AI Safety · Theory", tags: ["机器学习理论", "AI 安全", "复杂性", "NeurIPS 2023"], summary: "Harvard 机器学习基础与理论计算机科学 PI；当前研究把复杂性与资源约束视角用于理解深度学习和 AI 安全。", stage: "senior", profile: profiles.boaz, award: award2023, careerFact: "Catalyst Professor of Computer Science · Harvard SEAS", researchFact: "Foundations of machine learning, deep-learning mechanisms and AI safety", awardFact: "Outstanding Main Track Runner-Up · Scaling Data-Constrained Language Models", x: 250, y: 120 }),
  person({ id: "colin-raffel-award", name: "Colin Raffel", role: "Associate Professor · University of Toronto", institution: "U of Toronto", region: "Canada", area: "NLP · Large Language Models · Collaborative ML", tags: ["NLP", "LLM", "数据受限训练", "NeurIPS 2023"], summary: "多伦多大学 NLP/ML PI，研究语言模型、有限数据下的学习与协作式机器学习。", stage: "senior", profile: profiles.colin, award: award2023, careerFact: "Associate Professor · University of Toronto Computer Science", researchFact: "Collaborative machine learning, large language models and learning with limited data", awardFact: "Outstanding Main Track Runner-Up · Scaling Data-Constrained Language Models", x: 420, y: 120 }),
  person({ id: "animashree-anandkumar-award", name: "Animashree Anandkumar", role: "Bren Professor · California Institute of Technology", institution: "External", actualInstitution: "California Institute of Technology", region: "United States", area: "AI for Science · Scientific Machine Learning · Foundation Models", tags: ["AI for Science", "科学机器学习", "气候模型", "NeurIPS 2023"], summary: "Caltech Bren Professor，以张量方法、科学机器学习和基础模型连接通用 AI 与气候等科学问题。", stage: "senior", profile: profiles.anima, award: award2023, careerFact: "Bren Professor of Computing and Mathematical Sciences · Caltech", researchFact: "AI for science, scientific machine learning and scalable foundation models", awardFact: "Outstanding Datasets & Benchmarks · ClimSim", x: 590, y: 120 }),
  person({ id: "stephan-mandt-award", name: "Stephan Mandt", role: "Professor · University of California, Irvine", institution: "External", actualInstitution: "University of California, Irvine", region: "United States", area: "Generative Models · Probabilistic ML · AI for Science", tags: ["生成模型", "概率机器学习", "数据压缩", "NeurIPS 2023"], summary: "UCI 生成式与概率机器学习 PI，兼任 HPI 联合主任和 AI in Science Institute 副主任。", stage: "senior", profile: profiles.stephan, award: award2023, careerFact: "Professor of CS and Statistics · HPI Co-Director · AISI Associate Director", researchFact: "Generative models, neural compression and scientific machine learning", awardFact: "Outstanding Datasets & Benchmarks · ClimSim", x: 760, y: 120 }),
  person({ id: "pierre-baldi-award", name: "Pierre Baldi", role: "Distinguished Professor · University of California, Irvine", institution: "External", actualInstitution: "University of California, Irvine", region: "United States", area: "Deep Learning · AI for Science · Bioinformatics", tags: ["深度学习", "AI for Science", "生物信息", "NeurIPS 2023"], summary: "UCI 资深 AI/ML PI，将深度学习与统计方法用于生物、化学和气候等科学任务。", stage: "senior", profile: profiles.pierre, award: award2023, careerFact: "Distinguished/Chancellor's Professor · UCI Computer Science", researchFact: "Deep learning, AI, large-scale data analysis and AI for natural sciences", awardFact: "Outstanding Datasets & Benchmarks · ClimSim", x: 930, y: 120 }),
  person({ id: "dan-hendrycks-award", name: "Dan Hendrycks", role: "Executive and Research Director · Center for AI Safety", institution: "External", actualInstitution: "Center for AI Safety", region: "United States", area: "AI Safety · Robustness · Evaluation", tags: ["AI 安全", "鲁棒性", "评测", "独立研究机构", "NeurIPS 2023"], summary: "Center for AI Safety 的独立研究负责人，围绕模型鲁棒性、评测与社会尺度 AI 风险组织研究。", stage: "institute", profile: profiles.dan, award: award2023, careerFact: "Executive and Research Director · Center for AI Safety", researchFact: "Technical and societal-scale AI safety, robustness and evaluation", awardFact: "Outstanding Datasets & Benchmarks · DecodingTrust", x: 1100, y: 120 }),
  person({ id: "dawn-song-award", name: "Dawn Song", role: "Professor of Computer Science · UC Berkeley", institution: "Berkeley", region: "United States", area: "AI Safety · Security · Privacy · Agentic AI", tags: ["AI 安全", "安全", "隐私", "Agentic AI", "NeurIPS 2023"], summary: "Berkeley 安全与可信 AI 资深 PI，研究智能体安全、深度学习安全、隐私和去中心化技术。", stage: "senior", profile: profiles.dawn, award: award2023, careerFact: "Professor of Computer Science · Co-Director, Berkeley RDI", researchFact: "AI safety and security, agentic AI, deep learning, security and privacy", awardFact: "Outstanding Datasets & Benchmarks · DecodingTrust", x: 1270, y: 120 }),
  person({ id: "bo-li-uiuc-award", name: "Bo Li", chinese: "李博", role: "Associate Professor · University of Illinois Urbana-Champaign", institution: "UIUC", region: "United States", area: "Trustworthy ML · Security · Privacy", tags: ["可信机器学习", "安全", "隐私", "NeurIPS 2023"], summary: "UIUC 可信机器学习与安全 PI，研究模型安全、隐私、鲁棒性和负责任 AI。", stage: "senior", profile: profiles.boli, award: award2023, careerFact: "Associate Professor · UIUC ECE / Siebel School of Computing", researchFact: "Security, privacy and trustworthy machine learning", awardFact: "Outstanding Datasets & Benchmarks · DecodingTrust", x: 1440, y: 120 }),
  person({ id: "liwei-wang-pku-award", name: "王立威", role: "Professor · Peking University", institution: "PKU", region: "Mainland China", area: "Machine Learning Theory · Pattern Recognition", tags: ["机器学习理论", "模式识别", "视觉生成", "NeurIPS 2024"], summary: "北京大学机器学习资深 PI，研究机器学习理论和模式识别，并指导获得 NeurIPS 2024 最佳论文的视觉自回归工作。", stage: "senior", profile: profiles.liwei, award: award2024, careerFact: "Professor · Peking University School of EECS / Institute for AI", researchFact: "Machine learning theory and pattern recognition", awardFact: "Best Main Track Paper · Visual Autoregressive Modeling", x: 250, y: 310 }),
  person({ id: "yujiu-yang-tsinghua-award", name: "杨余久", role: "Professor · Tsinghua SIGS", institution: "THU", region: "Mainland China", area: "NLP · Computer Vision · Multimodal AI", tags: ["NLP", "计算机视觉", "多模态", "数据筛选", "NeurIPS 2024"], summary: "清华 SIGS/Open FIESTA PI，横跨 NLP、计算机视觉和多模态学习，并公开招收 AI 与大数据方向学生。", stage: "senior", profile: profiles.yujiu, award: award2024, careerFact: "Professor and PhD supervisor · Tsinghua SIGS / Open FIESTA", researchFact: "Natural language processing, computer vision and multimodal learning", awardFact: "Main Track Runner-Up · Not All Tokens Are What You Need for Pretraining", x: 420, y: 310 }),
  person({ id: "jaakko-lehtinen-award", name: "Jaakko Lehtinen", role: "Associate Professor · Aalto University", institution: "External", actualInstitution: "Aalto University", region: "Europe", area: "Computer Graphics · Computer Vision · Generative Models", tags: ["图形学", "计算机视觉", "生成模型", "NeurIPS 2024"], summary: "Aalto 视觉计算 PI，在图形学、视觉、机器学习和生成模型交叉地带开展研究。", stage: "senior", profile: profiles.jaakko, award: award2024, careerFact: "Tenured Associate Professor · Aalto University Computer Science", researchFact: "Computer graphics, computer vision, machine learning and AI", awardFact: "Main Track Runner-Up · Guiding a Diffusion Model with a Bad Version of Itself", x: 590, y: 310 }),
  person({ id: "scott-hale-award", name: "Scott A. Hale", role: "Professor and Director · Oxford Internet Institute", institution: "Oxford", region: "Europe", area: "NLP · LLM Evaluation · Computational Social Science", tags: ["NLP", "LLM 评测", "社会计算", "对齐", "NeurIPS 2024"], summary: "Oxford Internet Institute 主任与社会数据科学教授，研究 LLM 评测、偏差和数字信息生态。", stage: "senior", profile: profiles.scott, award: award2024, careerFact: "Professor of Social Data Science and Director · Oxford Internet Institute", researchFact: "LLM alignment and evaluation, bias, NLP and computational social science", awardFact: "Best Datasets & Benchmarks Paper · The PRISM Alignment Dataset", x: 760, y: 310 }),
  person({ id: "maarten-sap-award", name: "Maarten Sap", role: "Assistant Professor · Carnegie Mellon University", institution: "CMU", region: "United States", area: "NLP · Social Intelligence · Responsible AI", tags: ["NLP", "社会智能", "Responsible AI", "LLM 多样性", "NeurIPS 2025"], summary: "CMU LTI 新一代 NLP PI，研究社会智能、语言偏差、毒性与负责任的人机交互。", stage: "emerging", profile: profiles.maarten, award: award2025, careerFact: "Assistant Professor · CMU Language Technologies Institute and HCII", researchFact: "Social intelligence, conversational AI, fairness and ethics in language technology", awardFact: "Best Datasets & Benchmarks Paper · Artificial Hivemind", x: 930, y: 310 }),
  person({ id: "tomasz-trzcinski-award", name: "Tomasz Trzciński", role: "Full Professor · Warsaw University of Technology", institution: "External", actualInstitution: "Warsaw University of Technology", region: "Europe", area: "Computer Vision · Efficient ML · Representation Learning", tags: ["计算机视觉", "高效学习", "表征学习", "NeurIPS 2025"], summary: "Warsaw University of Technology CVLab 负责人，研究计算机视觉、高效机器学习与表征学习。", stage: "senior", profile: profiles.tomasz, award: award2025, careerFact: "Full Professor · Warsaw University of Technology；CVLab lead", researchFact: "Computer vision, efficient machine learning and representation learning", awardFact: "Best Main Track Paper · 1000 Layer Networks for Self-Supervised RL", x: 1100, y: 310 }),
  person({ id: "benjamin-eysenbach-award", name: "Benjamin Eysenbach", role: "Assistant Professor · Princeton University", institution: "Princeton", region: "United States", area: "Reinforcement Learning · Self-Supervised Learning", tags: ["强化学习", "自监督学习", "目标条件 RL", "NeurIPS 2025"], summary: "Princeton 强化学习 PI，研究简单、可扩展、鲁棒的自监督与目标条件强化学习算法。", stage: "emerging", profile: profiles.ben, award: award2025, careerFact: "Assistant Professor · Princeton CS；2023 年加入 faculty", researchFact: "Principled, scalable and robust reinforcement-learning algorithms", awardFact: "Best Main Track Paper · 1000 Layer Networks for Self-Supervised RL", x: 1270, y: 310 }),
  person({ id: "shiji-song-award", name: "宋士吉", role: "Professor · Tsinghua University", institution: "THU", region: "Mainland China", area: "Machine Learning · Reinforcement Learning · Optimization", tags: ["机器学习", "强化学习", "随机优化", "NeurIPS 2025"], summary: "清华自动化系资深 PI，研究随机优化、机器学习与强化学习理论及其控制和机器人应用。", stage: "senior", profile: profiles.shiji, award: award2025, careerFact: "Professor · Tsinghua University Department of Automation", researchFact: "Stochastic optimization, machine learning, reinforcement learning, robotics and control", awardFact: "Best Paper Runner-Up · Does Reinforcement Learning Really Incentivize Reasoning Capacity...", x: 1440, y: 310 }),
  person({ id: "gao-huang-tsinghua-award", name: "黄高", role: "Tenured Associate Professor · Tsinghua University", institution: "THU", region: "Mainland China", area: "Foundation Models · Deep Learning · Multimodal AI", tags: ["基础模型", "深度学习", "多模态", "具身智能", "NeurIPS 2025"], summary: "清华自动化系 LEAP Lab 负责人，以 DenseNet 为代表研究神经网络架构，并延伸到 LLM/VLM、具身基础模型和世界模型。", stage: "senior", profile: profiles.gao, award: award2025, careerFact: "Tenured Associate Professor · Tsinghua Automation；LEAP Lab lead", researchFact: "Foundation-model architectures, efficient inference, multimodal and embodied AI", awardFact: "Best Paper Runner-Up · Does Reinforcement Learning Really Incentivize Reasoning Capacity...", x: 80, y: 500 }),
  person({ id: "steve-hanneke-award", name: "Steve Hanneke", role: "Assistant Professor · Purdue University", institution: "External", actualInstitution: "Purdue University", region: "United States", area: "Statistical Learning Theory · Online Learning", tags: ["学习理论", "在线学习", "主动学习", "NeurIPS 2025"], summary: "Purdue 学习理论 PI，研究监督、半监督、主动与迁移学习的样本复杂度和概率基础。", stage: "emerging", profile: profiles.steve, award: award2025, careerFact: "Assistant Professor of Computer Science · Purdue University", researchFact: "Statistical learning theory, active learning, transfer learning and sample complexity", awardFact: "Best Paper Runner-Up · Optimal Mistake Bounds for Transductive Online Learning", x: 250, y: 500 }),
  person({ id: "giulio-biroli-award", name: "Giulio Biroli", role: "Full Professor of Theoretical Physics · ENS-PSL", institution: "External", actualInstitution: "École normale supérieure (PSL)", region: "Europe", area: "Statistical Physics · Machine Learning Theory", tags: ["统计物理", "机器学习理论", "扩散模型", "NeurIPS 2025"], summary: "ENS-PSL 理论物理教授，把高维统计物理方法用于理解机器学习、泛化与扩散模型训练动力学。", stage: "senior", profile: profiles.giulio, award: award2025, careerFact: "Full Professor of Theoretical Physics · LPENS / ENS-PSL", researchFact: "Statistical physics, high-dimensional systems and machine-learning theory", awardFact: "Best Main Track Paper · Why Diffusion Models Don't Memorize", x: 420, y: 500 }),
  person({ id: "marc-mezard-award", name: "Marc Mézard", role: "Full Professor · Bocconi University", institution: "External", actualInstitution: "Bocconi University", region: "Europe", area: "Statistical Physics · Machine Learning Theory", tags: ["统计物理", "机器学习理论", "神经网络", "NeurIPS 2025"], summary: "Bocconi 计算科学系理论物理教授，研究复杂系统、信息处理、神经网络与机器学习泛化。", stage: "senior", profile: profiles.marc, award: award2025, careerFact: "Full Professor · Bocconi Department of Computing Sciences", researchFact: "Statistical physics, information processing, neural networks and ML generalization", awardFact: "Best Main Track Paper · Why Diffusion Models Don't Memorize", x: 590, y: 500 }),
];

export type NeuripsAwardRecord = {
  year: 2023 | 2024 | 2025;
  award: string;
  title: string;
  authors: string[];
  officialUrl: string;
  facultyAuthors: string[];
  existingIds: string[];
  addedIds: string[];
  excluded: { name: string; reason: string }[];
};

const record = (value: NeuripsAwardRecord): NeuripsAwardRecord => value;

export const neuripsAwardRecords: NeuripsAwardRecord[] = [
  record({ year: 2023, award: "Outstanding Main Track", title: "Privacy Auditing with One (1) Training Run", authors: ["Thomas Steinke", "Milad Nasr", "Matthew Jagielski"], officialUrl: award2023.url, facultyAuthors: [], existingIds: [], addedIds: [], excluded: [{ name: "all authors", reason: "Official/current profiles found industry or non-faculty research roles; no independent PI added." }] }),
  record({ year: 2023, award: "Outstanding Main Track", title: "Are Emergent Abilities of Large Language Models a Mirage?", authors: ["Rylan Schaeffer", "Brando Miranda", "Sanmi Koyejo"], officialUrl: award2023.url, facultyAuthors: ["Sanmi Koyejo"], existingIds: ["sanmi-koyejo-award"], addedIds: [], excluded: [{ name: "Rylan Schaeffer; Brando Miranda", reason: "Not current faculty/independent PI in the audit sources." }] }),
  record({ year: 2023, award: "Outstanding Main Track Runner-Up", title: "Scaling Data-Constrained Language Models", authors: ["Niklas Muennighoff", "Alexander Rush", "Boaz Barak", "Teven Le Scao", "Nouamane Tazi", "Aleksandra Piktus", "Sampo Pyysalo", "Thomas Wolf", "Colin Raffel"], officialUrl: award2023.url, facultyAuthors: ["Alexander Rush", "Boaz Barak", "Colin Raffel"], existingIds: ["sasha-rush-us"], addedIds: ["boaz-barak-award", "colin-raffel-award"], excluded: [{ name: "remaining authors", reason: "Industry/research-staff or non-faculty roles in the reviewed sources." }] }),
  record({ year: 2023, award: "Outstanding Main Track Runner-Up", title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model", authors: ["Rafael Rafailov", "Archit Sharma", "Eric Mitchell", "Christopher D Manning", "Stefano Ermon", "Chelsea Finn"], officialUrl: award2023.url, facultyAuthors: ["Christopher Manning", "Stefano Ermon", "Chelsea Finn"], existingIds: ["christopher-manning-us", "stefano-ermon-us", "chelsea-finn-us"], addedIds: [], excluded: [{ name: "Rafael Rafailov; Archit Sharma; Eric Mitchell", reason: "Not current faculty/independent PI in the audit sources." }] }),
  record({ year: 2023, award: "Outstanding Datasets & Benchmarks", title: "ClimSim: A large multi-scale dataset for hybrid physics-ML climate emulation", authors: ["Sungduk Yu", "Walter Hannah", "Liran Peng", "Jerry Lin", "Mohamed Aziz Bhouri", "Ritwik Gupta", "Björn Lütjens", "Justus C. Will", "Gunnar Behrens", "Julius Busecke", "Nora Loose", "Charles Stern", "Tom Beucler", "Bryce Harrop", "Benjamin Hillman", "Andrea Jenney", "Savannah L. Ferretti", "Nana Liu", "Animashree Anandkumar", "Noah Brenowitz", "Veronika Eyring", "Nicholas Geneva", "Pierre Gentine", "Stephan Mandt", "Jaideep Pathak", "Akshay Subramaniam", "Carl Vondrick", "Rose Yu", "Laure Zanna", "Tian Zheng", "Ryan Abernathey", "Fiaz Ahmed", "David Bader", "Pierre Baldi", "Elizabeth Barnes", "Christopher Bretherton", "Peter Caldwell", "Wayne Chuang", "Yilun Han", "Yu Huang", "Fernando Iglesias-Suarez", "Sanket Jantre", "Karthik Kashinath", "Marat Khairoutdinov", "Thorsten Kurth", "Nicholas Lutsko", "Po-Lun Ma", "Griffin Mooers", "J. David Neelin", "David Randall", "Sara Shamekh", "Mark Taylor", "Nathan Urban", "Janni Yuval", "Guang Zhang", "Mike Pritchard"], officialUrl: award2023.url, facultyAuthors: ["Animashree Anandkumar", "Stephan Mandt", "Carl Vondrick", "Rose Yu", "Pierre Baldi"], existingIds: ["carl-vondrick-us", "rose-yu-us"], addedIds: ["animashree-anandkumar-award", "stephan-mandt-award", "pierre-baldi-award"], excluded: [{ name: "domain faculty and non-PI authors", reason: "Climate/physics domain contributors without a primary AI/ML PI program were retained in the record but not added to the AI atlas." }] }),
  record({ year: 2023, award: "Outstanding Datasets & Benchmarks", title: "DecodingTrust: A Comprehensive Assessment of Trustworthiness in GPT Models", authors: ["Boxin Wang", "Weixin Chen", "Hengzhi Pei", "Chulin Xie", "Mintong Kang", "Chenhui Zhang", "Chejian Xu", "Zidi Xiong", "Ritik Dutta", "Rylan Schaeffer", "Sang Truong", "Simran Arora", "Mantas Mazeika", "Dan Hendrycks", "Zinan Lin", "Yu Cheng", "Sanmi Koyejo", "Dawn Song", "Bo Li"], officialUrl: award2023.url, facultyAuthors: ["Dan Hendrycks", "Yu Cheng", "Sanmi Koyejo", "Dawn Song", "Bo Li"], existingIds: ["yu-cheng-cuhk", "sanmi-koyejo-award"], addedIds: ["dan-hendrycks-award", "dawn-song-award", "bo-li-uiuc-award"], excluded: [{ name: "remaining authors", reason: "Students, postdocs or ordinary industry/research staff; coauthorship was not treated as PI status." }] }),
  record({ year: 2024, award: "Best Main Track", title: "Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction", authors: ["Keyu Tian", "Yi Jiang", "Zehuan Yuan", "Bingyue Peng", "Liwei Wang"], officialUrl: award2024.url, facultyAuthors: ["Liwei Wang"], existingIds: [], addedIds: ["liwei-wang-pku-award"], excluded: [{ name: "remaining authors", reason: "Students or industry researchers, not current independent PIs in the audit sources." }] }),
  record({ year: 2024, award: "Best Main Track", title: "Stochastic Taylor Derivative Estimator: Efficient amortization for arbitrary differential operators", authors: ["Zekun Shi", "Zheyuan Hu", "Min Lin", "Kenji Kawaguchi"], officialUrl: award2024.url, facultyAuthors: ["Kenji Kawaguchi"], existingIds: ["kenji-kawaguchi"], addedIds: [], excluded: [{ name: "Min Lin", reason: "A*STAR/Sea research leadership is visible, but no reviewed official page established a current independent-PI appointment." }, { name: "Zekun Shi; Zheyuan Hu", reason: "Not current independent PIs." }] }),
  record({ year: 2024, award: "Main Track Runner-Up", title: "Not All Tokens Are What You Need for Pretraining", authors: ["Zhenghao Lin", "Zhibin Gou", "Yeyun Gong", "Xiao Liu", "Yelong Shen", "Ruochen Xu", "Chen Lin", "Yujiu Yang", "Jian Jiao", "Nan Duan", "Weizhu Chen"], officialUrl: award2024.url, facultyAuthors: ["Yujiu Yang"], existingIds: [], addedIds: ["yujiu-yang-tsinghua-award"], excluded: [{ name: "remaining authors", reason: "Primarily industry researchers; no current independent faculty role verified." }] }),
  record({ year: 2024, award: "Main Track Runner-Up", title: "Guiding a Diffusion Model with a Bad Version of Itself", authors: ["Tero Karras", "Miika Aittala", "Tuomas Kynkäänniemi", "Jaakko Lehtinen", "Timo Aila", "Samuli Laine"], officialUrl: award2024.url, facultyAuthors: ["Jaakko Lehtinen"], existingIds: [], addedIds: ["jaakko-lehtinen-award"], excluded: [{ name: "remaining authors", reason: "NVIDIA research roles; not current independent faculty/PI in the reviewed sources." }] }),
  record({ year: 2024, award: "Best Datasets & Benchmarks", title: "The PRISM Alignment Dataset", authors: ["Hannah Rose Kirk", "Alexander Whitefield", "Paul Rottger", "Andrew M. Bean", "Katerina Margatina", "Rafael Mosquera-Gomez", "Juan Ciro", "Max Bartolo", "Adina Williams", "He He", "Bertie Vidgen", "Scott Hale"], officialUrl: award2024.url, facultyAuthors: ["He He", "Scott Hale"], existingIds: ["he-he-us"], addedIds: ["scott-hale-award"], excluded: [{ name: "Bertie Vidgen", reason: "Reviewed Oxford page labels a former research-associate/postdoctoral role, not current faculty." }, { name: "remaining authors", reason: "Students or industry/research staff, not current independent PIs." }] }),
  record({ year: 2025, award: "Best Datasets & Benchmarks", title: "Artificial Hivemind: The Open-Ended Homogeneity of Language Models (and Beyond)", authors: ["Liwei Jiang", "Yuanjun Chai", "Margaret Li", "Mickel Liu", "Raymond Fok", "Nouha Dziri", "Yulia Tsvetkov", "Maarten Sap", "Yejin Choi"], officialUrl: award2025.url, facultyAuthors: ["Yulia Tsvetkov", "Maarten Sap", "Yejin Choi"], existingIds: ["yulia-tsvetkov-us", "yejin-choi-us"], addedIds: ["maarten-sap-award"], excluded: [{ name: "remaining authors", reason: "Students, alumni or non-faculty research staff." }] }),
  record({ year: 2025, award: "Best Main Track", title: "Gated Attention for Large Language Models: Non-linearity, Sparsity, and Attention-Sink-Free", authors: ["Zihan Qiu", "Zekun Wang", "Bo Zheng", "Zeyu Huang", "Kaiyue Wen", "Songlin Yang", "Rui Men", "Le Yu", "Fei Huang", "Suozhi Huang", "Dayiheng Liu", "Jingren Zhou", "Junyang Lin"], officialUrl: award2025.url, facultyAuthors: [], existingIds: [], addedIds: [], excluded: [{ name: "all authors", reason: "Qwen/Alibaba industry team; no current independent faculty/PI role verified." }] }),
  record({ year: 2025, award: "Best Main Track", title: "1000 Layer Networks for Self-Supervised RL: Scaling Depth Can Enable New Goal-Reaching Capabilities", authors: ["Kevin Wang", "Ishaan Javali", "Michał Bortkiewicz", "Tomasz Trzcinski", "Benjamin Eysenbach"], officialUrl: award2025.url, facultyAuthors: ["Tomasz Trzcinski", "Benjamin Eysenbach"], existingIds: [], addedIds: ["tomasz-trzcinski-award", "benjamin-eysenbach-award"], excluded: [{ name: "remaining authors", reason: "Students/researchers, not current independent PIs." }] }),
  record({ year: 2025, award: "Best Main Track", title: "Why Diffusion Models Don't Memorize: The Role of Implicit Dynamical Regularization in Training", authors: ["Tony Bonnaire", "Raphaël Urfin", "Giulio Biroli", "Marc Mezard"], officialUrl: award2025.url, facultyAuthors: ["Giulio Biroli", "Marc Mezard"], existingIds: [], addedIds: ["giulio-biroli-award", "marc-mezard-award"], excluded: [{ name: "Tony Bonnaire; Raphaël Urfin", reason: "Not current independent PIs." }] }),
  record({ year: 2025, award: "Best Paper Runner-Up", title: "Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?", authors: ["Yang Yue", "Zhiqi Chen", "Rui Lu", "Andrew Zhao", "Zhaokai Wang", "Shiji Song", "Gao Huang"], officialUrl: award2025.url, facultyAuthors: ["Shiji Song", "Gao Huang"], existingIds: [], addedIds: ["shiji-song-award", "gao-huang-tsinghua-award"], excluded: [{ name: "remaining authors", reason: "Students/researchers, not current independent PIs." }] }),
  record({ year: 2025, award: "Best Paper Runner-Up", title: "Optimal Mistake Bounds for Transductive Online Learning", authors: ["Zachary Chase", "Steve Hanneke", "Shay Moran", "Jonathan Shafer"], officialUrl: award2025.url, facultyAuthors: ["Steve Hanneke", "Shay Moran"], existingIds: [], addedIds: ["steve-hanneke-award"], excluded: [{ name: "Shay Moran", reason: "Current Technion faculty, but Israel is outside the atlas's six-region scope; retained in report only." }, { name: "Zachary Chase; Jonathan Shafer", reason: "Postdoctoral/non-faculty roles." }] }),
  record({ year: 2025, award: "Best Paper Runner-Up", title: "Superposition Yields Robust Neural Scaling", authors: ["Yizhou Liu", "Ziming Liu", "Jeff Gore"], officialUrl: award2025.url, facultyAuthors: [], existingIds: [], addedIds: [], excluded: [{ name: "Jeff Gore", reason: "Current MIT Physics faculty, but primary independent program is biophysics/ecology rather than AI; retained as adjacent paper author in the report." }, { name: "Yizhou Liu; Ziming Liu", reason: "Not current independent PIs." }] }),
];

/** Award-paper coauthorship is not sufficient evidence for a lineage or sustained collaboration edge. */
export const neuripsAwardAuditRelationships: Relationship[] = [];

export const neuripsAwardCoverage = {
  scope: "Official NeurIPS current-year paper awards; Test-of-Time awards excluded",
  years: [2023, 2024, 2025] as const,
  officialAwardPages: [award2023, award2024, award2025],
  awardRecords: neuripsAwardRecords.length,
  addedPeople: neuripsAwardAuditPeople.length,
  existingFacultyMatches: [...new Set(neuripsAwardRecords.flatMap((item) => item.existingIds))].length,
  relationshipPolicy: "No relationship inferred from award-paper coauthorship",
  lastVerifiedAt: checkedAt,
};
