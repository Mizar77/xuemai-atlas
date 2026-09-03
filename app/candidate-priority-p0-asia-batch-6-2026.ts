import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const sources = {
  sjtuRoster: source("SJTU Computer Science · faculty roster", "https://www.cs.sjtu.edu.cn/jiaoshiml.html", "official", "计算机学院现任教师名录"),
  dequan: source("SJTU · 王德泉", "https://www.cs.sjtu.edu.cn/jiaoshiml/wangdequan.html", "official", "现任职务、教育训练、Trevor Darrell 博士导师、研究方向、履历和官方头像"),
  dawu: source("SJTU · 谷大武", "https://www.cs.sjtu.edu.cn/jiaoshiml/gudawu.html", "official", "现任职务、教育训练、研究方向、实验室、博士生名单和官方头像"),
  thuAutoRoster: source("Tsinghua Automation · faculty roster", "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm", "official", "自动化系现任教师名录"),
  wenkai: source("Tsinghua Automation · 陆文凯", "https://www.au.tsinghua.edu.cn/info/1078/3258.htm", "official", "现任职务、教育训练、研究方向、完整学生名单和官方头像"),
  fan: source("Tsinghua Automation · 杨帆", "https://www.au.tsinghua.edu.cn/info/1079/3139.htm", "official", "现任职务、教育训练、研究方向、当前学生和官方头像"),
  jianming: source("Tsinghua Automation · 胡坚明", "https://www.au.tsinghua.edu.cn/info/1076/3248.htm", "official", "现任职务、教育训练、智能交通方向、明确指导学生和官方头像"),
  pkuAiRoster: source("PKU School of Intelligence · faculty roster", "https://www.cis.pku.edu.cn/szdw/zzjs.htm", "official", "智能学院现任专职教师名录"),
  chao: source("PKU School of Intelligence · 许超", "https://www.cis.pku.edu.cn/info/1362/2251.htm", "official", "现任职务、教育训练、视觉研究、博士毕业生和公开去向、官方头像"),
  nusRoster: source("NUS Computing · faculty roster", "https://www.comp.nus.edu.sg/about/faculty/", "official", "School of Computing 现任 faculty roster"),
  brian: source("NUS Computing · Brian Lim", "https://www.comp.nus.edu.sg/cs/people/brianlim/", "official", "现任职务、CMU 博士、Ubicomp Lab、研究方向和官方头像"),
  brianStudent: source("NUS Computing · Brian Lim and Zhang Wencan win CHI Best Paper", "https://www.comp.nus.edu.sg/news/2022-best-paper-award-chi/", "official", "官方新闻明确称 Zhang Wencan 为 Brian Lim 的计算机博士生"),
  huang: source("NUS Computing · Ke-Wei Huang", "https://www.comp.nus.edu.sg/disa/people/huangkw/", "official", "现任职务、NYU 博士、研究方向、博士校友与去向、官方头像"),
  bernard: source("NUS Computing · Bernard Tan", "https://www.comp.nus.edu.sg/disa/people/btan/", "official", "现任职务、NUS 博士、研究方向、博士校友与去向、官方头像"),
  trevor: source("Berkeley EECS · Trevor Darrell", "https://www2.eecs.berkeley.edu/Faculty/Homepages/trevor.html", "official", "Trevor Darrell 的 Berkeley faculty 身份；关系另一端已在图谱"),
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
  portrait: { src: `portraits/candidate-p0-asia-batch-6-2026/${seed.portraitFile}`, alt: `${seed.name} 官方头像`, source: seed.portraitSource },
});

export const candidatePriorityP0AsiaBatch6People2026: Person[] = [
  person({
    id: "dequan-wang-sjtu-p0-2026", name: "王德泉", role: "长聘教轨副教授 · 博士生导师", institution: "SJTU", region: "Mainland China",
    area: "AI Agents · AI for Science · Deep Learning", tags: ["大模型智能体", "AI for Science", "深度学习", "上海创智学院"], stage: "emerging", x: 120, y: 120,
    portraitFile: "wang-dequan.jpg", portraitSource: sources.dequan,
    summary: "上海交大大模型智能体与科学智能 PI，Berkeley 博士阶段由 Trevor Darrell 指导，同时连接上海 AI Lab 与上海创智学院。",
    facts: [
      fact("当前任职", "上海交通大学计算机学院长聘教轨副教授、博士生导师，并任上海创智学院全时导师。", sources.dequan),
      fact("教育与学术训练", "复旦大学计算机学士；2022 年获 UC Berkeley 计算机博士，师从 Trevor Darrell。", sources.dequan),
      fact("研究主线", "大模型智能体驱动的科学智能。", sources.dequan),
      fact("任职轨迹", "2023–2024 年任上海人工智能实验室青年科学家，2023 年起进入上海交大长聘教轨。", sources.dequan),
      fact("学术影响", "官方简介记录其近五年 Google Scholar 引用超过 15,000 次，并入选国家高层次青年人才计划。", sources.dequan),
    ], sources: [sources.dequan, sources.sjtuRoster],
  }),
  person({
    id: "dawu-gu-sjtu-p0-2026", name: "谷大武", role: "讲席教授 · 网络空间安全学院院长", institution: "SJTU", region: "Mainland China",
    area: "Cryptography · AI Security · Post-Quantum Cryptography", tags: ["密码学", "AI 安全", "后量子密码", "侧信道分析"], stage: "senior", x: 280, y: 120,
    portraitFile: "gu-dawu.jpg", portraitSource: sources.dawu,
    summary: "上海交大密码学与 AI 安全资深 PI，创建 LoCCS 并长期培养密码安全博士；官方主页逐人列出多位优秀博士论文获奖者。",
    facts: [
      fact("当前任职", "上海交通大学讲席教授、网络空间安全学院院长、密码学院院长，并兼任计算机学院副院长。", sources.dawu),
      fact("教育与学术训练", "西安电子科技大学应用数学本科、密码学硕士和密码学博士。", sources.dawu),
      fact("研究主线", "后量子密码、密码与人工智能交叉、侧信道分析、密码系统安全与数据安全。", sources.dawu),
      fact("研究组织", "创建密码与计算机安全实验室 LoCCS，并任信息安全与密码学研究所所长。", sources.dawu),
      fact("人才培养", "官方主页明确列出 Jeroen Delvaux、孙士锋、沈耀斌、贾琰雪和张云聪等博士生及优秀博士论文记录。", sources.dawu),
    ], sources: [sources.dawu, sources.sjtuRoster],
  }),
  person({
    id: "wenkai-lu-thu-p0-2026", name: "陆文凯", role: "研究员", institution: "THU", region: "Mainland China",
    area: "Signal Processing · Computer Vision · Machine Learning", tags: ["信号处理", "计算机视觉", "机器学习", "医学影像"], stage: "senior", x: 440, y: 120,
    portraitFile: "lu-wenkai.jpg", portraitSource: sources.wenkai,
    summary: "清华自动化系信号与图像智能资深研究员，研究覆盖地震信号、工业视觉和医学图像；主页公开完整博士与硕士学生名单。",
    facts: [
      fact("当前任职", "清华大学自动化系信息处理研究所研究员，负责 Easysignal 小组。", sources.wenkai),
      fact("教育与学术训练", "清华大学自动化本科；中国石油大学（北京）地球物理博士。", sources.wenkai),
      fact("任职轨迹", "1996–1998 年在清华博士后，2000–2002 年在 Texas A&M University 从事博士后研究，2006 年起任研究员。", sources.wenkai),
      fact("研究主线", "地震与生理信号处理、图像重构、工业机器视觉、医学图像与机器学习。", sources.wenkai),
      fact("人才培养", "主页逐人列出在读与已毕业博士生、硕士生。", sources.wenkai),
    ], sources: [sources.wenkai, sources.thuAutoRoster],
  }),
  person({
    id: "fan-yang-thu-auto-p0-2026", name: "杨帆", role: "长聘副教授 · 研究生院副院长", institution: "THU", region: "Mainland China",
    area: "Industrial AI · Fault Diagnosis · Causal Systems", tags: ["工业 AI", "故障诊断", "因果推断", "智能管控"], stage: "senior", x: 600, y: 120,
    portraitFile: "yang-fan.jpg", portraitSource: sources.fan,
    summary: "清华工业 AI 与复杂系统诊断长聘副教授，研究因果拓扑、报警监控与卫星智能管控；官方主页公开当前博士生团队。",
    facts: [
      fact("当前任职", "清华大学自动化系长聘副教授、研究生院副院长。", sources.fan),
      fact("教育与学术训练", "清华大学自动化学士；2008 年获清华控制科学与工程博士。", sources.fan),
      fact("任职轨迹", "先后在清华与 University of Alberta 从事博士后研究，2011 年进入清华自动化系任教。", sources.fan),
      fact("研究主线", "大规模复杂系统拓扑建模、故障诊断、工业报警监控、系统辨识与航天智能管控。", sources.fan),
      fact("当前团队", "主页列出李维杨、莫涵、朱雅琪、熊琦珞、聂祎昕、王安琪等在读博士生。", sources.fan),
    ], sources: [sources.fan, sources.thuAutoRoster],
  }),
  person({
    id: "jianming-hu-thu-p0-2026", name: "胡坚明", role: "研究员", institution: "THU", region: "Mainland China",
    area: "Intelligent Transportation · Autonomous Driving · Traffic AI", tags: ["智能交通", "自动驾驶", "车路协同", "交通大数据"], stage: "senior", x: 760, y: 120,
    portraitFile: "hu-jianming.jpg", portraitSource: sources.jianming,
    summary: "清华车路协同与交通 AI 研究员，研究自动驾驶测试、智能信号控制和交通大数据；官方履历同时公开研究生指导记录。",
    facts: [
      fact("当前任职", "2026 年起任清华大学自动化系系统工程研究所研究员。", sources.jianming),
      fact("教育与学术训练", "哈尔滨科学技术大学学士、哈尔滨理工大学硕士、吉林大学交通运输规划与管理博士。", sources.jianming),
      fact("研究主线", "智能车路协同、智能网联汽车与无人驾驶、AI 信号控制和交通大数据。", sources.jianming),
      fact("任职轨迹", "曾在清华控制科学与工程博士后流动站工作，并于 2011–2012 年访问 UC Berkeley。", sources.jianming),
      fact("人才培养", "官方主页记录其指导的牛浩懿、李星宇获 2025 年清华优秀硕士学位论文。", sources.jianming),
    ], sources: [sources.jianming, sources.thuAutoRoster],
  }),
  person({
    id: "chao-xu-pku-p0-2026", name: "许超", role: "教授", institution: "PKU", region: "Mainland China",
    area: "Computer Vision · Multimedia · Video Processing", tags: ["计算机视觉", "视频理解", "多媒体", "图像检索"], stage: "senior", x: 920, y: 120,
    portraitFile: "xu-chao.jpg", portraitSource: sources.chao,
    summary: "北京大学视觉与多媒体资深教授，长期研究图像视频编码、检索和理解；其博士生公开去向连接微软、创业与悉尼大学。",
    facts: [
      fact("当前任职", "北京大学智能学院信息科学中心教授。", sources.chao),
      fact("教育与学术训练", "清华大学光学仪器学士、中国科学技术大学光学硕士、中国科学院电子学所图像处理博士。", sources.chao),
      fact("研究主线", "图像与视频编码、图像检索、视频处理、多媒体系统和计算机视觉。", sources.chao),
      fact("任职轨迹", "1997 年起在北京大学任教，2005 年起任教授。", sources.chao),
      fact("人才培养", "官方主页记录罗勇、耿博、徐畅等博士生及其论文荣誉和毕业去向。", sources.chao),
    ], sources: [sources.chao, sources.pkuAiRoster],
  }),
  person({
    id: "brian-lim-nus-p0-2026", name: "Brian Lim", role: "Associate Professor", institution: "NUS", region: "Singapore",
    area: "Explainable AI · Human-AI Interaction · Ubiquitous Computing", tags: ["可解释 AI", "Human-AI", "HCI", "普适计算"], stage: "senior", x: 1080, y: 120,
    portraitFile: "brian-lim.jpg", portraitSource: sources.brian,
    summary: "NUS 可解释 AI 与人机交互副教授，领导 Ubicomp Lab，研究可信用户中心 AI；官方新闻明确记录其博士生 Zhang Wencan。",
    facts: [
      fact("当前任职", "NUS Computer Science 副教授并领导 NUS Ubicomp Lab。", sources.brian),
      fact("教育与学术训练", "Cornell 工程物理学士；Carnegie Mellon HCI 硕士、博士。", sources.brian),
      fact("研究主线", "可解释人工智能、人机交互、普适计算、健康分析与情境感知计算。", sources.brian),
      fact("研究组织", "Ubicomp Lab 聚焦用户中心、可信的可解释 AI 与应用机器学习。", sources.brian),
      fact("人才培养", "NUS 官方新闻明确称 Zhang Wencan 为 Brian Lim 的计算机博士生。", sources.brianStudent),
    ], sources: [sources.brian, sources.brianStudent, sources.nusRoster],
  }),
  person({
    id: "kewei-huang-nus-p0-2026", name: "Ke-Wei Huang", role: "Associate Professor · Executive Director, AIDF", institution: "NUS", region: "Singapore",
    area: "FinTech · Causal ML · Computational Social Science", tags: ["金融科技", "因果机器学习", "计算社会科学", "数据挖掘"], stage: "senior", x: 1240, y: 120,
    portraitFile: "kewei-huang.jpg", portraitSource: sources.huang,
    summary: "NUS 金融科技与因果机器学习副教授、亚洲数字金融研究所执行主任；博士生流向多所高校、Grab 与 Meta。",
    facts: [
      fact("当前任职", "NUS Information Systems and Analytics 副教授、Asian Institute of Digital Finance 执行主任。", sources.huang),
      fact("教育与学术训练", "National Taiwan University 电机学士、金融 MBA；New York University 信息系统硕士、MPhil 与博士。", sources.huang),
      fact("研究主线", "金融科技、因果机器学习、金融数据挖掘和计算社会科学。", sources.huang),
      fact("任职轨迹", "2007 年加入 NUS。", sources.huang),
      fact("人才培养", "官方主页逐人列出 Liu Xuanqi、Guo Yutong、Wang Qi、Qiao Mengke 等博士校友及去向。", sources.huang),
    ], sources: [sources.huang, sources.nusRoster],
  }),
  person({
    id: "bernard-tan-nus-p0-2026", name: "Bernard Tan", role: "Tan Sri Runme Shaw Senior Professor · Senior Vice Provost", institution: "NUS", region: "Singapore",
    area: "Information Systems · Knowledge Management · Human-Computer Interaction", tags: ["信息系统", "知识管理", "HCI", "信息隐私"], stage: "senior", x: 1400, y: 120,
    portraitFile: "bernard-tan.jpg", portraitSource: sources.bernard,
    summary: "NUS 信息系统资深教授与高级教务长，研究知识管理、虚拟社区和信息隐私；官方主页保存博士校友及首份教职去向。",
    facts: [
      fact("当前任职", "NUS Tan Sri Runme Shaw Senior Professor，并任 Senior Vice Provost (Undergraduate Education)。", sources.bernard),
      fact("教育与学术训练", "NUS 学士、硕士；1995 年获 NUS 信息系统博士。", sources.bernard),
      fact("研究主线", "虚拟社区、知识管理、跨文化信息系统、计算机媒介交流与信息隐私。", sources.bernard),
      fact("学术管理", "曾任 NUS Information Systems 系主任和 School of Computing Assistant Dean。", sources.bernard),
      fact("人才培养", "官方主页列 Juliana Sutanto 为 2008 届博士校友，并记录其首份工作为 ETH Zurich 助理教授。", sources.bernard),
    ], sources: [sources.bernard, sources.nusRoster],
  }),
];

export const candidatePriorityP0AsiaBatch6Relationships2026: Relationship[] = [
  { id: "candidate-p0-asia-b6-darrell-wang", from: "trevor-darrell-us", to: "dequan-wang-sjtu-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "上海交通大学官方主页明确写明王德泉在 UC Berkeley 博士阶段师从 Trevor Darrell。", evidenceObject: "王德泉 · UC Berkeley PhD", source: sources.dequan, verified: true, endYear: 2022 },
];

const member = (id: string, teacherId: string, name: string, role: string, focus: string, proof: Source): GroupMember => ({ id, teacherId, name, role, focus, source: proof });
export const candidatePriorityP0AsiaBatch6GroupMembers2026: GroupMember[] = [
  member("candidate-p0-asia-b6-gu-jeroen", "dawu-gu-sjtu-p0-2026", "Jeroen Delvaux", "PhD alumnus", "PUF 密钥生成与实体认证", sources.dawu),
  member("candidate-p0-asia-b6-gu-shifeng", "dawu-gu-sjtu-p0-2026", "孙士锋", "PhD alumnus", "抗泄漏与篡改公钥密码", sources.dawu),
  member("candidate-p0-asia-b6-gu-yanxue", "dawu-gu-sjtu-p0-2026", "贾琰雪", "PhD alumna", "区块链隐私保护", sources.dawu),
  member("candidate-p0-asia-b6-lu-gewei", "wenkai-lu-thu-p0-2026", "谷革伟", "Current PhD student", "信号与图像处理", sources.wenkai),
  member("candidate-p0-asia-b6-lu-yaozhiyu", "wenkai-lu-thu-p0-2026", "姚智宇", "Current PhD student", "信号与机器学习", sources.wenkai),
  member("candidate-p0-asia-b6-lu-yinshuo", "wenkai-lu-thu-p0-2026", "李尹硕", "Current PhD student", "物理信息神经网络", sources.wenkai),
  member("candidate-p0-asia-b6-yang-liweiyang", "fan-yang-thu-auto-p0-2026", "李维杨", "Current PhD student", "工业系统智能", sources.fan),
  member("candidate-p0-asia-b6-yang-xiongqiluo", "fan-yang-thu-auto-p0-2026", "熊琦珞", "Current PhD student", "因果分析与软测量", sources.fan),
  member("candidate-p0-asia-b6-hu-haoyi", "jianming-hu-thu-p0-2026", "牛浩懿", "MSc advisee · 2025 thesis", "智能驾驶与强化学习", sources.jianming),
  member("candidate-p0-asia-b6-hu-xingyu", "jianming-hu-thu-p0-2026", "李星宇", "MSc advisee · 2025 thesis", "智能交通", sources.jianming),
  member("candidate-p0-asia-b6-brian-wencan", "brian-lim-nus-p0-2026", "Zhang Wencan", "PhD student", "Explainable AI", sources.brianStudent),
];

const placement = (id: string, student: string, teacherId: string, company: string, role: string, proof: Source, sector: StudentPlacement["sector"], kind: StudentPlacement["kind"] = "current"): StudentPlacement => ({ id, student, teacherId, company, role, kind, degree: "PhD", sector, source: proof, verifiedAt: checkedAt });
export const candidatePriorityP0AsiaBatch6Placements2026: StudentPlacement[] = [
  placement("candidate-p0-asia-b6-xu-geng", "耿博", "chao-xu-pku-p0-2026", "Microsoft", "毕业后任职两年，后回国创业", sources.chao, "startup", "reported"),
  placement("candidate-p0-asia-b6-xu-chang", "徐畅", "chao-xu-pku-p0-2026", "University of Sydney", "毕业后获得正式教职", sources.chao, "academia", "first_job"),
  placement("candidate-p0-asia-b6-huang-xuanqi", "Liu Xuanqi", "kewei-huang-nus-p0-2026", "Hunan University", "Assistant Professor", sources.huang, "academia"),
  placement("candidate-p0-asia-b6-huang-yutong", "Guo Yutong", "kewei-huang-nus-p0-2026", "Chinese University of Hong Kong (Shenzhen)", "Assistant Professor", sources.huang, "academia"),
  placement("candidate-p0-asia-b6-huang-wangqi", "Wang Qi", "kewei-huang-nus-p0-2026", "City University of Hong Kong", "Assistant Professor", sources.huang, "academia"),
  placement("candidate-p0-asia-b6-huang-zhuolun", "Li Zhuolun", "kewei-huang-nus-p0-2026", "Grab", "Senior Data Science Manager", sources.huang, "industry"),
  placement("candidate-p0-asia-b6-huang-zouxiao", "Zou Xiao", "kewei-huang-nus-p0-2026", "Meta", "Data Scientist", sources.huang, "industry"),
  placement("candidate-p0-asia-b6-tan-juliana", "Juliana Sutanto", "bernard-tan-nus-p0-2026", "Monash University", "Associate Dean; first placement was Assistant Professor at ETH Zurich", sources.bernard, "academia"),
];

export type CandidatePriorityP0AsiaBatch6RosterPromotion2026 = { unitUrl: string; rosterName: string; atlasPersonId: string };
export const candidatePriorityP0AsiaBatch6RosterPromotions2026: CandidatePriorityP0AsiaBatch6RosterPromotion2026[] = [
  { unitUrl: sources.sjtuRoster.url, rosterName: "王德泉", atlasPersonId: "dequan-wang-sjtu-p0-2026" },
  { unitUrl: sources.sjtuRoster.url, rosterName: "谷大武", atlasPersonId: "dawu-gu-sjtu-p0-2026" },
  { unitUrl: sources.thuAutoRoster.url, rosterName: "陆文凯", atlasPersonId: "wenkai-lu-thu-p0-2026" },
  { unitUrl: sources.thuAutoRoster.url, rosterName: "杨帆", atlasPersonId: "fan-yang-thu-auto-p0-2026" },
  { unitUrl: sources.thuAutoRoster.url, rosterName: "胡坚明", atlasPersonId: "jianming-hu-thu-p0-2026" },
  { unitUrl: sources.pkuAiRoster.url, rosterName: "许超", atlasPersonId: "chao-xu-pku-p0-2026" },
  { unitUrl: sources.nusRoster.url, rosterName: "Brian LIM Youliang", atlasPersonId: "brian-lim-nus-p0-2026" },
  { unitUrl: sources.nusRoster.url, rosterName: "HUANG Ke Wei", atlasPersonId: "kewei-huang-nus-p0-2026" },
  { unitUrl: sources.nusRoster.url, rosterName: "TAN Cheng Yian Bernard", atlasPersonId: "bernard-tan-nus-p0-2026" },
];

export const People = candidatePriorityP0AsiaBatch6People2026;
export const Relationships = candidatePriorityP0AsiaBatch6Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch6Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch6GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch6RosterPromotions2026;
export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
