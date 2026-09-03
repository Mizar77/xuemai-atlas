import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const sources = {
  thuRoster: source("清华大学计算机系 · 全职教师名录", "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", "official", "计算机系现任全职教师名录"),
  thuAirRoster: source("清华大学智能产业研究院 · 研究团队", "https://air.tsinghua.edu.cn/airtd/yjtd.htm", "official", "AIR 现任教授、研究员名录"),
  pkuRoster: source("北京大学计算机学院 · 教师名录", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "计算机学院现任教师名录"),
  nusRoster: source("NUS Computing · faculty roster", "https://www.comp.nus.edu.sg/about/faculty/", "official", "School of Computing 现任 faculty roster"),
  mingsheng: source("清华大学计算机系 · 应明生", "https://www.cs.tsinghua.edu.cn/csen/info/1312/4395.htm", "official", "现任职务、教育训练、量子计算与 AI 逻辑研究、学术服务、论文和官方头像"),
  min: source("清华大学计算机系 · 张敏", "https://www.cs.tsinghua.edu.cn/csen/info/1312/4397.htm", "official", "现任职务、教育训练、信息检索研究、产业转化、论文和官方头像"),
  haizhou: source("清华大学计算机系 · 艾海舟", "https://www.cs.tsinghua.edu.cn/csen/info/1306/4328.htm", "official", "现任职务、教育训练、计算机视觉研究、成果与人才培养、论文和官方头像"),
  xiaolin: source("清华大学计算机系 · 胡晓林", "https://www.cs.tsinghua.edu.cn/csen/info/1312/4700.htm", "official", "现任职务、教育训练、对抗鲁棒性与类脑计算研究、论文和官方头像"),
  songhai: source("清华大学计算机系 · 张松海", "https://www.cs.tsinghua.edu.cn/csen/info/1306/4658.htm", "official", "现任职务、教育训练、图形学与生成式 AI 研究、项目、论文和官方头像"),
  yanyan: source("清华 AIR · 兰艳艳", "https://air.tsinghua.edu.cn/info/1046/1200.htm", "official", "现任职务、马志明博士指导、研究方向、任职轨迹、论文和官方头像"),
  ming: source("北京大学计算机学院 · 张铭", "https://cs.pku.edu.cn/info/1086/1730.htm", "official", "现任职务、北大教育训练、研究方向、联合实验室、论文、奖项和官方头像"),
  terence: source("NUS Computing · Terence Sim", "https://www.comp.nus.edu.sg/cs/people/tsim/", "official", "现任职务、教育训练、生物特征与视觉计算研究、学术服务、论文和官方头像"),
} satisfies Record<string, Source>;

type PersonSeed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & {
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
    src: `portraits/candidate-p0-asia-batch-9-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0AsiaBatch9People2026: Person[] = [
  person({
    id: "mingsheng-ying-thu-p0-2026", name: "应明生", role: "教授", institution: "THU", region: "Mainland China",
    area: "Quantum Computing · Programming Semantics · Logic in AI", tags: ["量子计算", "程序语义", "AI 逻辑", "形式化方法"], stage: "senior", x: 120, y: 120,
    portraitFile: "mingsheng-ying.jpg", portraitSource: sources.mingsheng,
    summary: "清华量子程序设计与 AI 逻辑资深教授，研究连接量子计算、程序语言语义和形式化验证，并延伸到量子复杂性研究网络。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授，1992 年加入该系。", sources.mingsheng),
      fact("教育与学术训练", "1981 年获江西抚州师范专科学校数学专业文凭。", sources.mingsheng),
      fact("研究主线", "量子计算、程序语言语义与人工智能逻辑。", sources.mingsheng),
      fact("学术服务", "官方主页记录其任智能技术与系统国家重点实验室学术委员会主任，并曾任 Artificial Intelligence Journal 编委。", sources.mingsheng),
      fact("代表性成果", "研究建立量子程序 Floyd–Hoare 逻辑及量子程序验证方法，并获得国家自然科学二等奖。", sources.mingsheng),
    ],
    sources: [sources.mingsheng, sources.thuRoster],
  }),
  person({
    id: "min-zhang-thu-p0-2026", name: "张敏", role: "教授", institution: "THU", region: "Mainland China",
    area: "Information Retrieval · User Behavior · Machine Learning", tags: ["信息检索", "用户行为", "机器学习", "搜索引擎"], stage: "senior", x: 280, y: 120,
    portraitFile: "min-zhang.jpg", portraitSource: sources.min,
    summary: "清华信息检索与用户行为教授，研究搜索质量评测和点击行为建模，并通过清华—搜狐联合实验室推动方法进入商业搜索系统。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授，2003 年加入该系。", sources.min),
      fact("教育与学术训练", "1999 年获清华大学计算机科学与技术学士，2003 年获清华大学计算机科学与技术博士。", sources.min),
      fact("研究主线", "Web 信息检索、用户行为分析与机器学习。", sources.min),
      fact("产业连接", "任清华—搜狐搜索技术联合实验室副主任；官方主页记录其方法已部署于搜狗在线搜索引擎。", sources.min),
      fact("代表性合作", "清华主页列出其与马少平共同署名的 WWW 2008 新闻事件构建论文。", sources.min),
    ],
    sources: [sources.min, sources.thuRoster],
  }),
  person({
    id: "haizhou-ai-thu-p0-2026", name: "艾海舟", role: "教授", institution: "THU", region: "Mainland China",
    area: "Computer Vision · Pattern Recognition · Face Analysis", tags: ["计算机视觉", "模式识别", "人脸分析", "视频理解"], stage: "senior", x: 440, y: 120,
    portraitFile: "haizhou-ai.jpg", portraitSource: sources.haizhou,
    summary: "清华计算机视觉与模式识别资深教授，长期研究人脸、人体检测跟踪与视觉内容分析，相关算法曾进入多类实际产品。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授，1991 年加入该系。", sources.haizhou),
      fact("教育与学术训练", "1985 年获清华大学计算机工程学士、1988 年获硕士、1991 年获计算机科学博士。", sources.haizhou),
      fact("研究主线", "计算机视觉与模式识别，聚焦人脸和人体检测、跟踪、对齐、姿态估计与识别。", sources.haizhou),
      fact("成果转化", "官方主页记录其旋转不变人脸检测算法已用于多类产品。", sources.haizhou),
      fact("人才培养", "官方主页记录其作为导师培养的博士论文获 2008 年北京市优秀博士论文奖。", sources.haizhou),
    ],
    sources: [sources.haizhou, sources.thuRoster],
  }),
  person({
    id: "xiaolin-hu-thu-p0-2026", name: "胡晓林", role: "教授", institution: "THU", region: "Mainland China",
    area: "Adversarial Robustness · Neural Networks · Computational Neuroscience", tags: ["对抗鲁棒性", "神经网络", "计算神经科学", "类脑智能"], stage: "senior", x: 600, y: 120,
    portraitFile: "xiaolin-hu.jpg", portraitSource: sources.xiaolin,
    summary: "清华对抗鲁棒性与类脑计算教授，研究深度模型的物理世界攻击防御，并以神经科学机制探索可解释、稳健的新模型。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授。", sources.xiaolin),
      fact("教育与学术训练", "武汉理工大学学士（1997–2001）、硕士（2001–2004）；香港中文大学博士（2004–2007）。", sources.xiaolin),
      fact("研究主线", "人工神经网络和计算神经科学，重点研究对抗攻击防御与类脑计算模型。", sources.xiaolin),
      fact("研究方法", "通过数字及物理世界对抗样本揭示深度模型风险，同时与神经科学家合作模拟脑连接和生理功能。", sources.xiaolin),
      fact("代表性合作", "清华主页列出其与朱军共同署名的 CVPR 2025 深度互学习论文。", sources.xiaolin),
    ],
    sources: [sources.xiaolin, sources.thuRoster],
  }),
  person({
    id: "songhai-zhang-thu-p0-2026", name: "张松海", role: "教授", institution: "THU", region: "Mainland China",
    area: "Computer Graphics · Generative AI · Virtual Reality", tags: ["计算机图形学", "生成式 AI", "三维生成", "虚拟现实"], stage: "senior", x: 760, y: 120,
    portraitFile: "songhai-zhang.jpg", portraitSource: sources.songhai,
    summary: "清华图形学、虚拟现实与三维生成教授，研究从全景视觉和沉浸式交互扩展到生成式 AI 与三维场景合成。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授，2009 年加入该系。", sources.songhai),
      fact("教育与学术训练", "清华大学计算机科学与技术学士（2001）、硕士（2004）和博士（2007）。", sources.songhai),
      fact("研究主线", "计算机图形学、虚拟现实、图像视频处理与生成式人工智能。", sources.songhai),
      fact("研究项目", "主持三维数字交互引擎、动态全景视频和全景视觉交互方向的国家级项目。", sources.songhai),
      fact("学术成果", "官方主页记录 2021 年以来在 SIGGRAPH、CVPR、ICCV、IEEE VR 等发表五十余篇 CCF-A 论文。", sources.songhai),
    ],
    sources: [sources.songhai, sources.thuRoster],
  }),
  person({
    id: "yanyan-lan-thu-air-p0-2026", name: "兰艳艳", role: "万国数据教授 · AIR 副院长", institution: "THU", region: "Mainland China",
    area: "Machine Learning · Information Retrieval · AI for Science", tags: ["机器学习", "信息检索", "AI for Science", "分子生成"], stage: "senior", x: 920, y: 120,
    portraitFile: "yanyan-lan.jpg", portraitSource: sources.yanyan,
    summary: "清华 AIR 机器学习、信息检索与 AI for Science 教授，博士师从马志明，研究连接检索学习、分子生成与蛋白质结构预测。",
    facts: [
      fact("当前任职", "清华大学万国数据教授、智能产业研究院副院长、首席研究员和博士生导师。", sources.yanyan),
      fact("教育与学术训练", "山东大学数学系统计学学士（2001–2005）；中国科学院研究生院数学博士（2005–2011），导师为马志明院士。", sources.yanyan),
      fact("任职轨迹", "曾任中国科学院计算技术研究所研究员、副研究员，并于 UC Berkeley 访问。", sources.yanyan),
      fact("研究主线", "机器学习、信息检索和 AI for Science，覆盖分子表示、药物设计与蛋白质结构预测。", sources.yanyan),
      fact("代表性合作", "AIR 主页列出其与 Wei-Ying Ma 等共同署名的 ICLR 2025 分子生成论文 UniGEM。", sources.yanyan),
    ],
    sources: [sources.yanyan, sources.thuAirRoster],
  }),
  person({
    id: "ming-zhang-pku-p0-2026", name: "张铭", role: "教授 · 博士生导师", institution: "PKU", region: "Mainland China",
    area: "Text Mining · Knowledge Graphs · Graph Machine Learning", tags: ["文本挖掘", "知识图谱", "图机器学习", "计算机教育"], stage: "senior", x: 1080, y: 120,
    portraitFile: "ming-zhang.jpg", portraitSource: sources.ming,
    summary: "北京大学文本挖掘、知识图谱与图机器学习教授，研究兼顾计算机教育，并通过具身智能联合实验室连接产业应用。",
    facts: [
      fact("当前任职", "北京大学计算机学院教授、博士生导师。", sources.ming),
      fact("教育与学术训练", "1984 年进入北京大学，之后分别获得学士、硕士和博士学位。", sources.ming),
      fact("研究主线", "文本挖掘、知识图谱、图神经网络、图机器学习和计算机教育研究。", sources.ming),
      fact("产业连接", "主持北大—安克具身智能联合实验室，并负责头部公司合作项目。", sources.ming),
      fact("学术成果", "官方主页记录获得 ICML 2014 Best Paper Award、WWW 2016 Best Paper Nomination 和 ICDM 2022 Best Paper Nomination。", sources.ming),
    ],
    sources: [sources.ming, sources.pkuRoster],
  }),
  person({
    id: "terence-sim-nus-p0-2026", name: "Terence Sim", role: "Associate Professor · Vice Dean for Admissions", institution: "NUS", region: "Singapore",
    area: "Biometrics · Computer Vision · Deepfake Detection", tags: ["生物特征", "计算机视觉", "Deepfake", "持续认证"], stage: "senior", x: 1240, y: 120,
    portraitFile: "terence-sim.jpg", portraitSource: sources.terence,
    summary: "NUS 生物特征与视觉计算副教授，研究多模态身份认证、Deepfake 检测和人脸分析，并担任招生副院长。",
    facts: [
      fact("当前任职", "NUS School of Computing 副教授、NUS Office of Admissions Vice Dean。", sources.terence),
      fact("教育与学术训练", "MIT 计算机科学与工程学士（1990）、Stanford 计算机科学硕士（1991）、CMU 电气工程博士（2002）。", sources.terence),
      fact("研究主线", "多模态生物特征、Deepfake 合成与检测、人脸图像分析、持续认证和计算机视觉。", sources.terence),
      fact("产业连接", "官方简介记录其面向生物特征技术提供培训、可行性研究和技术评估咨询。", sources.terence),
      fact("学术服务", "曾任 IAPR Second Vice President、IJPRAI Editor-in-Chief 和新加坡模式识别与机器智能协会主席。", sources.terence),
    ],
    sources: [sources.terence, sources.nusRoster],
  }),
];

export const candidatePriorityP0AsiaBatch9Relationships2026: Relationship[] = [
  { id: "candidate-p0-asia-b9-ying-ji", from: "mingsheng-ying-thu-p0-2026", to: "zhengfeng-ji-thu-p0-2026", type: "collaboration", subtype: "publication", label: "量子程序语义论文合作", evidence: "应明生的清华官方主页列出两人共同署名的 ACM TOCL 2009 论文 An algebra of quantum processes。", evidenceObject: "An algebra of quantum processes · ACM TOCL 2009", source: sources.mingsheng, verified: true, recentYear: 2009 },
  { id: "candidate-p0-asia-b9-zhang-ma", from: "min-zhang-thu-p0-2026", to: "shaoping-ma-thu", type: "collaboration", subtype: "publication", label: "信息检索论文合作", evidence: "张敏的清华官方主页列出两人共同署名的 WWW 2008 论文 Automatic Online News Issue Construction in Web Environment。", evidenceObject: "Automatic Online News Issue Construction in Web Environment · WWW 2008", source: sources.min, verified: true, recentYear: 2008 },
  { id: "candidate-p0-asia-b9-ai-xing", from: "haizhou-ai-thu-p0-2026", to: "junliang-xing-thu", type: "collaboration", subtype: "publication", label: "视频目标跟踪论文合作", evidence: "艾海舟的清华官方主页列出两人共同署名的 IEEE TIP 2011 论文 Multiple Players Tracking in Sports Video。", evidenceObject: "Multiple Players Tracking in Sports Video · IEEE TIP 2011", source: sources.haizhou, verified: true, recentYear: 2011 },
  { id: "candidate-p0-asia-b9-hu-zhu", from: "xiaolin-hu-thu-p0-2026", to: "jun-zhu-thu", type: "collaboration", subtype: "publication", label: "模型校准论文合作", evidence: "胡晓林的清华官方主页列出两人共同署名的 CVPR 2025 论文 Improving accuracy and calibration via differentiated deep mutual learning。", evidenceObject: "Improving accuracy and calibration via differentiated deep mutual learning · CVPR 2025", source: sources.xiaolin, verified: true, recentYear: 2025 },
  { id: "candidate-p0-asia-b9-zhang-hu", from: "songhai-zhang-thu-p0-2026", to: "hu-shimin-thu", type: "collaboration", subtype: "publication", label: "虚拟现实论文合作", evidence: "张松海的清华官方主页列出两人共同署名的 IEEE TVCG 2022 论文 Adaptive Optimization Algorithm for Resetting Techniques in Obstacle-ridden Environments。", evidenceObject: "Adaptive Optimization Algorithm for Resetting Techniques in Obstacle-ridden Environments · IEEE TVCG 2022", source: sources.songhai, verified: true, recentYear: 2022 },
  { id: "candidate-p0-asia-b9-lan-ma", from: "yanyan-lan-thu-air-p0-2026", to: "wei-ying-ma", type: "collaboration", subtype: "publication", label: "分子生成论文合作", evidence: "兰艳艳的清华 AIR 官方主页列出两人共同署名的 ICLR 2025 论文 UniGEM。", evidenceObject: "UniGEM: A Unified Approach to Generation and Property Prediction for Molecules · ICLR 2025", source: sources.yanyan, verified: true, recentYear: 2025 },
  { id: "candidate-p0-asia-b9-zhang-tang", from: "ming-zhang-pku-p0-2026", to: "jian-tang-ca", type: "collaboration", subtype: "publication", label: "分子图生成论文合作", evidence: "张铭的北大官方主页列出两人共同署名的 ICLR 2020 论文 GraphAF。", evidenceObject: "GraphAF: a Flow-based Autoregressive Model for Molecular Graph Generation · ICLR 2020", source: sources.ming, verified: true, recentYear: 2020 },
  { id: "candidate-p0-asia-b9-sim-jiang", from: "terence-sim-nus-p0-2026", to: "nan-jiang-uiuc-p0-2026", type: "collaboration", subtype: "publication", label: "可穿戴认证论文合作", evidence: "Terence Sim 的 NUS 官方主页列出两人共同署名的 HotMobile 2022 论文 EarWalk。", evidenceObject: "EarWalk: towards walking posture identification using earables · HotMobile 2022", source: sources.terence, verified: true, recentYear: 2022 },
];

export const candidatePriorityP0AsiaBatch9Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0AsiaBatch9GroupMembers2026: GroupMember[] = [];

export type CandidatePriorityP0AsiaBatch9RosterPromotion2026 = { unitUrl: string; rosterName: string; atlasPersonId: string };
export const candidatePriorityP0AsiaBatch9RosterPromotions2026: CandidatePriorityP0AsiaBatch9RosterPromotion2026[] = [
  { unitUrl: sources.thuRoster.url, rosterName: "Mingsheng YING", atlasPersonId: "mingsheng-ying-thu-p0-2026" },
  { unitUrl: sources.thuRoster.url, rosterName: "Min ZHANG", atlasPersonId: "min-zhang-thu-p0-2026" },
  { unitUrl: sources.thuRoster.url, rosterName: "Haizhou AI", atlasPersonId: "haizhou-ai-thu-p0-2026" },
  { unitUrl: sources.thuRoster.url, rosterName: "Xiaolin HU", atlasPersonId: "xiaolin-hu-thu-p0-2026" },
  { unitUrl: sources.thuRoster.url, rosterName: "Songhai ZHANG", atlasPersonId: "songhai-zhang-thu-p0-2026" },
  { unitUrl: sources.thuAirRoster.url, rosterName: "兰艳艳", atlasPersonId: "yanyan-lan-thu-air-p0-2026" },
  { unitUrl: sources.pkuRoster.url, rosterName: "张铭", atlasPersonId: "ming-zhang-pku-p0-2026" },
  { unitUrl: sources.nusRoster.url, rosterName: "SIM Mong Cheng Terence", atlasPersonId: "terence-sim-nus-p0-2026" },
];

export const People = candidatePriorityP0AsiaBatch9People2026;
export const Relationships = candidatePriorityP0AsiaBatch9Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch9Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch9GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch9RosterPromotions2026;
export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
