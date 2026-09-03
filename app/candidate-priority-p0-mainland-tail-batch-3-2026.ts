import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, sourceItem: Source) => ({ label, value, source: sourceItem });

const sources = {
  thuRoster: source("清华大学计算机系 · 在职教师名录", "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", "official", "现任教师名录与职称"),
  huaOfficial: source("清华大学计算机系 · Hua XU", "https://www.cs.tsinghua.edu.cn/csen/info/1313/4458.htm", "official", "长聘副教授、博士生导师、教育与研究方向"),
  huaPublications: source("清华大学计算机系 · Hua XU 研究成果", "https://www.cs.tsinghua.edu.cn/csen/info/1154/3951.htm", "official", "研究项目、产业应用与代表论文合作"),
  jiOfficial: source("清华大学计算机系 · Ji Sun", "https://www.cs.tsinghua.edu.cn/csen/info/1305/4663.htm", "official", "现任助理教授、教育与研究成果"),
  guoliangStudents: source("李国良 · Students", "https://dbgroup.cs.tsinghua.edu.cn/ligl/students.html", "profile", "Ji Sun 博士生身份、毕业年份与历史职业轨迹"),

  pkuRoster: source("北京大学计算机学院 · 教研系列名录", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "现任教师名录"),
  haoOfficial: source("北京大学前沿计算研究中心 · 董豪", "https://cfcs.pku.edu.cn/english/people/faculty/haodong/index.htm", "official", "长聘副教授、博士导师、教育、师承与研究方向"),
  haoHome: source("董豪 · 个人主页", "https://zsdonghao.github.io/", "profile", "现任任职、研究、招生、学生去向与产业角色"),
  tongyangOfficial: source("北京大学前沿计算研究中心 · 李彤阳", "https://cfcs.pku.edu.cn/english/people/faculty/tongyangli/index.htm", "official", "现任助理教授、教育与量子机器学习研究"),
  tongyangHome: source("李彤阳 · 个人主页", "https://www.tongyangli.com/", "profile", "现任任职、教育、研究与招生"),
  tongyangStudents: source("李彤阳 · Students", "https://www.tongyangli.com/students", "profile", "在读学生与毕业生公开去向"),
  tongyangThesis: source("University of Maryland · Tongyang Li dissertation", "https://drum.lib.umd.edu/items/1d5f279e-6cad-4194-9ec5-cf0b88680dc2/full", "official", "博士论文题目、作者与导师 Andrew Childs"),
  diyuOfficial: source("北京大学计算机学院 · 周迪宇", "https://cs.pku.edu.cn/info/1239/3368.htm", "official", "现任助理教授、教育、导师与研究方向"),
  diyuHome: source("周迪宇 · 个人主页", "https://zhou-diyu.github.io/", "profile", "现任任职、博士与博士后导师、研究和招生"),
};

const portrait = (file: string, name: string, url: string, sourceItem: Source) => ({
  src: `portraits/candidate-p0-mainland-tail-batch-3-2026/${file}`,
  alt: `${name} 官方头像`,
  source: { ...sourceItem, label: `${sourceItem.label} · portrait`, url, supports: "人物头像" },
});

export const candidatePriorityP0MainlandTailBatch3People2026: Person[] = [
  {
    id: "hua-xu-thu-p0-tail-b3", name: "徐华", role: "Tenured Associate Professor · PhD Advisor", institution: "THU", region: "Mainland China",
    area: "Multimodal Intelligence · Affective Computing · Intelligent Robots", tags: ["多模态", "情感计算", "智能机器人", "智能优化"],
    summary: "将多模态情感分析、自然交互与智能优化用于服务机器人和工业系统的清华长聘副教授。", category: "core",
    status: "current independent PI · official faculty profiles verified", stage: "senior", primary: true, x: 150, y: 160, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: portrait("hua-xu.jpg", "徐华", "https://www.cs.tsinghua.edu.cn/__local/9/43/F8/453A4A9DC95C7DFD088674CC82B_C8B5A13D_1AD22.jpg", sources.huaOfficial),
    sources: [sources.huaOfficial, sources.huaPublications, sources.thuRoster],
    facts: [
      fact("当前任职", "清华大学计算机系长聘副教授、博士生导师。", sources.huaOfficial),
      fact("教育与学术训练", "1998 年获西安交通大学计算机学士，2000 年和 2003 年获清华大学计算机硕士、博士。", sources.huaOfficial),
      fact("研究主线", "研究多模态智能信息处理、智能移动机器人关键技术与智能优化。", sources.huaOfficial),
      fact("产业应用", "官方成果页列出智能物流、银行客服、工业运维与服务机器人等落地项目。", sources.huaPublications),
      fact("学术合作", "清华成果页记录与张钹共同发表多目标优化研究论文。", sources.huaPublications),
    ],
  },
  {
    id: "ji-sun-thu-p0-tail-b3", name: "孙季", role: "Assistant Professor", institution: "THU", region: "Mainland China",
    area: "Autonomous Databases · Data + AI · LLM Systems", tags: ["自治数据库", "Data+AI", "向量数据库", "智能体数据分析"],
    summary: "围绕自治数据库、向量检索与智能体数据分析建设 Data + AI 系统的清华青年独立 PI。", category: "core",
    status: "current independent PI · official faculty and adviser roster verified", stage: "emerging", primary: true, x: 320, y: 160, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: portrait("ji-sun.jpg", "孙季", "https://www.cs.tsinghua.edu.cn/__local/9/23/4F/9644F58B4C308CC4AA7BCB88C37_A0FD9774_11411.jpg", sources.jiOfficial),
    sources: [sources.jiOfficial, sources.guoliangStudents, sources.thuRoster],
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系助理教授。", sources.jiOfficial),
      fact("教育与学术训练", "2016 年获北京邮电大学计算机学士，2021 年获清华大学计算机博士；2018 年曾访学 MIT CSAIL。", sources.jiOfficial),
      fact("博士师承", "李国良的学生页面将 Ji Sun 列为 2016–2021 年博士生。", sources.guoliangStudents),
      fact("研究主线", "研究自治数据库与 Data + AI，近期成果覆盖向量数据库和智能体数据分析系统。", sources.jiOfficial),
    ],
  },
  {
    id: "hao-dong-pku-p0-tail-b3", name: "董豪", role: "Tenured Associate Professor · PI, PKU-Agibot Lab", institution: "PKU", region: "Mainland China",
    area: "Embodied AI · Robotics · Computer Vision", tags: ["具身智能", "机器人", "大模型", "强化学习", "计算机视觉"],
    summary: "以具身智能 scaling laws 和通用机器人系统为核心、连接学术研究与机器人产业的北大长聘副教授。", category: "core",
    status: "current independent PI · official faculty and personal profiles verified", stage: "senior", primary: true, x: 490, y: 160, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: portrait("hao-dong.png", "董豪", "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5L87CZnlW7Ul-soQ7l8o7-ZL4CDnzrqfU4V7MRAVL7UYMz-0gihFp2hmCIa0MSyin1yDL1yDUlrkMz67L7-iLRQfLl7bUz9YnRNDnlUZnRfFnmGYL4U4nRTFLl-Poz9Jv2bjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.png", sources.haoOfficial),
    sources: [sources.haoOfficial, sources.haoHome, sources.pkuRoster],
    facts: [
      fact("当前任职", "北京大学计算机学院、前沿计算研究中心长聘副教授，领导 PKU-Agibot Lab。", sources.haoOfficial),
      fact("教育与学术训练", "获中央兰开夏大学工程学士、帝国理工学院硕士和博士学位。", sources.haoOfficial),
      fact("博士师承", "北大官方简介明确写明其帝国理工博士由郭毅可指导。", sources.haoOfficial),
      fact("研究主线", "研究具身智能、大模型、强化学习、计算机视觉与通用机器人开源系统。", sources.haoOfficial),
      fact("产业连接", "个人主页记录担任启元机器人研究院首席科学家，并曾获得字节跳动优秀导师奖。", sources.haoHome),
    ],
  },
  {
    id: "tongyang-li-pku-p0-tail-b3", name: "李彤阳", role: "Assistant Professor · PhD Advisor · QUARK Lab Founder", institution: "PKU", region: "Mainland China",
    area: "Quantum Machine Learning · Optimization · Quantum Algorithms", tags: ["量子机器学习", "优化", "量子算法", "理论计算机"],
    summary: "在量子计算、机器学习和优化交叉地带研究算法理论，并建设 QUARK Lab 的北大青年独立 PI。", category: "core",
    status: "current independent PI · official faculty, personal and thesis sources verified", stage: "emerging", primary: true, x: 660, y: 160, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: portrait("tongyang-li.png", "李彤阳", "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5MRWCRLm-4UlUiLQ7Q7MmC8LzWkL8Vq7U87ZMmNsnzr2MN-0gihFp2hmCIa0oSysnkyYM1h7M7lZMmNPUNU8L49sU8VkL7r7Lmn2U8CbnmfFMmWfnRVRM7VFLlMfoR7Jv2bjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.png", sources.tongyangOfficial),
    sources: [sources.tongyangOfficial, sources.tongyangHome, sources.tongyangThesis, sources.tongyangStudents],
    facts: [
      fact("当前任职", "北京大学前沿计算研究中心助理教授、博士生导师，并创建 QUARK Lab。", sources.tongyangOfficial),
      fact("教育与学术训练", "2015 年获清华大学计算机工程与数学双学士，2020 年获马里兰大学计算机博士，之后在 MIT 从事博士后研究。", sources.tongyangOfficial),
      fact("博士师承", "马里兰大学论文库将其博士论文导师记录为 Andrew M. Childs。", sources.tongyangThesis),
      fact("研究主线", "研究面向机器学习和优化的量子算法、量子复杂性与 NISQ 算法。", sources.tongyangHome),
      fact("学生体系", "个人主页公开列出 8 名博士生及多位本科生、博士后和毕业生去向。", sources.tongyangStudents),
    ],
  },
  {
    id: "diyu-zhou-pku-p0-tail-b3", name: "周迪宇", role: "Assistant Professor · PI, TELOS Lab", institution: "PKU", region: "Mainland China",
    area: "Computer Systems · Systems for Machine Learning", tags: ["操作系统", "存储系统", "形式化验证", "机器学习系统"],
    summary: "聚焦可靠计算机系统、软硬件协同和机器学习系统，并建设 TELOS Lab 的北大青年独立 PI。", category: "core",
    status: "current independent PI · official faculty and personal profiles verified", stage: "emerging", primary: true, x: 830, y: 160, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: portrait("diyu-zhou.jpg", "周迪宇", "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5UmWC7MN-YoRNiMQ8r7U47PUNQkLRGqPnN7PU8QkM47YUm-0gihFp2hmCIa0oky4L1ysnSh2LmTRUlrVLRrkMmGinlCsUlWVL4U8M7CsM8QFL4vZM4NDLNrFUlQkollJqjfjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.jpg", sources.diyuOfficial),
    sources: [sources.diyuOfficial, sources.diyuHome, sources.pkuRoster],
    facts: [
      fact("当前任职", "北京大学计算机学院助理教授、TELOS Lab 独立 PI。", sources.diyuHome),
      fact("教育与学术训练", "2013 年获北京大学计算机学士，2020 年获 UCLA 计算机博士，后在 EPFL 从事博士后研究。", sources.diyuOfficial),
      fact("博士师承", "本人主页明确记录 UCLA 博士由 Yuval Tamir 指导。", sources.diyuHome),
      fact("博士后训练", "在 EPFL 由 George Candea 与 Sanidhya Kashyap 指导博士后研究。", sources.diyuHome),
      fact("研究主线", "研究操作系统、存储、形式化验证、可靠计算、软硬件协同及机器学习系统。", sources.diyuHome),
    ],
  },
];

export const candidatePriorityP0MainlandTailBatch3SupportingPeople2026: Person[] = [
  { id: "andrew-childs-p0-mainland-tail-b3-support", name: "Andrew Childs", role: "PhD supervisor · Professor", institution: "UMD", region: "United States", area: "Quantum Computing · Algorithms", tags: ["博士导师", "量子计算"], summary: "马里兰大学论文库记录的李彤阳博士导师。", category: "adjacent", stage: "adjacent", primary: false, x: 660, y: 40, sources: [sources.tongyangThesis] },
  { id: "yuval-tamir-p0-mainland-tail-b3-support", name: "Yuval Tamir", role: "PhD supervisor", institution: "UCLA", region: "United States", area: "Computer Systems", tags: ["博士导师", "计算机系统"], summary: "周迪宇本人主页记录的 UCLA 博士导师。", category: "adjacent", stage: "adjacent", primary: false, x: 830, y: 40, sources: [sources.diyuHome] },
];

export const candidatePriorityP0MainlandTailBatch3Relationships2026: Relationship[] = [
  { id: "p0-mainland-tail-b3-xu-zhang-publication", from: "hua-xu-thu-p0-tail-b3", to: "bo-zhang-thu-historical", type: "collaboration", subtype: "publication", label: "多目标优化论文合作", evidence: "徐华清华官方成果页列出其与 Bo Zhang 等共同发表多目标优化论文。", evidenceObject: "Balancing Convergence and Diversity in Decomposition-Based Many-Objective Optimizers · IEEE TEC 2016", source: sources.huaPublications, verified: true, recentYear: 2016 },
  { id: "p0-mainland-tail-b3-li-sun-lineage", from: "guoliang-li-thu", to: "ji-sun-thu-p0-tail-b3", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "李国良学生主页将 Ji Sun 列于 Ph.D. Students，并标注 2016–2021 年博士阶段。", evidenceObject: "Guoliang Li · Ph.D. Students roster", source: sources.guoliangStudents, verified: true },
  { id: "p0-mainland-tail-b3-guo-dong-lineage", from: "yike-guo-hkust", to: "hao-dong-pku-p0-tail-b3", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "北京大学 CFCS 官方简介明确写明董豪帝国理工博士由 Yike Guo 指导。", evidenceObject: "Hao Dong · CFCS bio-sketch", source: sources.haoOfficial, verified: true },
  { id: "p0-mainland-tail-b3-childs-li-lineage", from: "andrew-childs-p0-mainland-tail-b3-support", to: "tongyang-li-pku-p0-tail-b3", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "马里兰大学数字论文库将 Tongyang Li 博士论文的 dc.contributor.advisor 记录为 Andrew M. Childs。", evidenceObject: "Quantum algorithms for machine learning and optimization · 2020 dissertation", source: sources.tongyangThesis, verified: true },
  { id: "p0-mainland-tail-b3-tamir-zhou-lineage", from: "yuval-tamir-p0-mainland-tail-b3-support", to: "diyu-zhou-pku-p0-tail-b3", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "周迪宇本人主页明确记录其 UCLA 计算机博士由 Yuval Tamir 指导。", evidenceObject: "Diyu Zhou homepage · About me", source: sources.diyuHome, verified: true },
];

export const candidatePriorityP0MainlandTailBatch3GroupMembers2026: GroupMember[] = [
  { id: "p0-mainland-tail-b3-li-xinzhao-wang", teacherId: "tongyang-li-pku-p0-tail-b3", name: "王昕钊", role: "PhD student", focus: "Quantum algorithms", source: sources.tongyangStudents },
  { id: "p0-mainland-tail-b3-li-yecheng-xue", teacherId: "tongyang-li-pku-p0-tail-b3", name: "薛晔澄", role: "PhD student", focus: "Quantum algorithms", source: sources.tongyangStudents },
];

export const candidatePriorityP0MainlandTailBatch3Placements2026: StudentPlacement[] = [
  { id: "p0-mainland-tail-b3-li-xiaoyu-chen-uw", student: "陈晓宇", teacherId: "tongyang-li-pku-p0-tail-b3", company: "University of Washington", role: "PhD student", kind: "reported", sector: "academia", note: "李彤阳学生页记录 2025 届本科生 Xiaoyu Chen 前往 University of Washington 计算机系攻读博士。", source: sources.tongyangStudents, verifiedAt: checkedAt },
];

export const candidatePriorityP0MainlandTailBatch3RosterPromotions2026 = [
  { unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", rosterName: "Hua XU", atlasPersonId: "hua-xu-thu-p0-tail-b3" },
  { unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", rosterName: "Ji Sun", atlasPersonId: "ji-sun-thu-p0-tail-b3" },
  { unitUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", rosterName: "董豪", atlasPersonId: "hao-dong-pku-p0-tail-b3" },
  { unitUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", rosterName: "李彤阳", atlasPersonId: "tongyang-li-pku-p0-tail-b3" },
  { unitUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", rosterName: "周迪宇", atlasPersonId: "diyu-zhou-pku-p0-tail-b3" },
];
