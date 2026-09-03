import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const sources = {
  thuCsRoster: source("清华大学计算机系 · 全职教师名录", "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", "official", "计算机系现任全职教师名录"),
  thuAirRoster: source("清华大学智能产业研究院 · 研究团队", "https://air.tsinghua.edu.cn/airtd/yjtd.htm", "official", "AIR 现任教授、研究员名录"),
  pkuCsRoster: source("北京大学计算机学院 · 教师名录", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "计算机学院现任教师名录"),
  pkuAiRoster: source("北京大学智能学院 · 专职教师", "https://www.cis.pku.edu.cn/szdw/zzjs.htm", "official", "智能学院现任专职教师名录"),
  cuhkRoster: source("CUHK CSE · faculty roster", "https://www.cse.cuhk.edu.hk/people/faculty/", "official", "CSE 现任 faculty roster"),
  nusRoster: source("NUS Computing · faculty roster", "https://www.comp.nus.edu.sg/about/faculty/", "official", "School of Computing 现任 faculty roster"),
  jingjing: source("清华 AIR · 刘菁菁", "https://air.tsinghua.edu.cn/info/1046/1201.htm", "official", "现任职务、教育训练、研究方向、微软与 MIT 经历、论文和官方头像"),
  hao: source("清华 AIR · 周浩", "https://air.tsinghua.edu.cn/info/1046/1661.htm", "official", "现任职务、教育训练、字节跳动经历、研究方向、论文和官方头像"),
  yiqun: source("清华计算机系 · 刘奕群", "https://www.cs.tsinghua.edu.cn/csen/info/1312/4391.htm", "official", "现任职务、教育训练、研究方向、系领导职务、成果转化、论文和官方头像"),
  qiang: source("清华计算机系 · 周强", "https://www.cs.tsinghua.edu.cn/csen/info/1313/4462.htm", "official", "现任职务、教育训练、研究方向、语言资源、论文和官方头像"),
  zhengfeng: source("清华计算机系 · 纪征锋", "https://www.cs.tsinghua.edu.cn/csen/info/1312/4388.htm", "official", "现任职务、清华教育训练、量子计算研究、学术服务、论文和官方头像"),
  zhengfengPku: source("北京大学前沿计算研究中心 · 纪征锋讲座简介", "https://cfcs.pku.edu.cn/announcement/events/cspeertalks/42cfcs239479.htm", "official", "明确记录纪征锋 2007 年获清华大学博士学位"),
  xin: source("北京大学计算机学院 · 张昕", "https://cs.pku.edu.cn/info/1086/1737.htm", "official", "现任职务、教育与博士后训练、研究方向、奖项、论文和官方头像"),
  baoquan: source("北京大学智能学院 · 陈宝权", "https://www.cis.pku.edu.cn/info/1362/2268.htm", "official", "现任职务、研究方向、学术服务、代表论文、VCL 实验室和官方头像"),
  baoquanCfcs: source("北京大学前沿计算研究中心 · 陈宝权", "https://cfcs.pku.edu.cn/baoquan/", "official", "清华硕士、SUNY Stony Brook 博士、海外任职与现任智能学院副院长"),
  hanrui: source("CUHK CSE · Hanrui Zhang", "https://www.cse.cuhk.edu.hk/people/faculty/hanrui/", "official", "现任职务、清华本科与 CMU 博士、Vincent Conitzer 博士指导、研究方向、任职经历、论文和官方头像"),
  bohan: source("NUS Computing · Bohan Wang", "https://www.comp.nus.edu.sg/cs/people/wangbh/", "official", "现任职务、教育训练、Wojciech Matusik 博士后指导、研究方向、产业经历和官方头像"),
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
    src: `portraits/candidate-p0-asia-batch-8-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0AsiaBatch8People2026: Person[] = [
  person({
    id: "jingjing-liu-thu-air-p0-2026", name: "刘菁菁", role: "万国数据教授 · AIR 首席研究员", institution: "THU", region: "Mainland China",
    area: "Multimodal LLM · Reasoning · AI for Science", tags: ["多模态大模型", "推理", "AI for Science", "强化学习"], stage: "senior", x: 120, y: 120,
    portraitFile: "jingjing-liu.jpg", portraitSource: sources.jingjing,
    summary: "清华 AIR 多模态与推理大模型 PI，MIT 计算机博士，研究从微软早期多模态基础模型延伸到 AI for Science 与智能体。",
    facts: [
      fact("当前任职", "清华大学万国数据教授、博士生导师，清华大学智能产业研究院首席研究员。", sources.jingjing),
      fact("教育与学术训练", "获 MIT 计算机科学博士学位和 University of Cambridge MBA。", sources.jingjing),
      fact("任职轨迹", "加入清华前曾任 Microsoft Senior Principal Research Manager；此前在 MIT CSAIL 任 Research Scientist。", sources.jingjing),
      fact("研究主线", "多模态与推理大语言模型、AI for Science、大模型强化学习、智能体和具身智能。", sources.jingjing),
      fact("代表性合作", "AIR 主页列出其与 Wei-Ying Ma、Hao Zhou 等共同署名的 ICLR 2026 Oral 论文 MemAgent。", sources.jingjing),
    ],
    sources: [sources.jingjing, sources.thuAirRoster],
  }),
  person({
    id: "hao-zhou-thu-air-p0-2026", name: "周浩", role: "副研究员 · 副教授", institution: "THU", region: "Mainland China",
    area: "Large Language Models · AI for Science · Reinforcement Learning", tags: ["大语言模型", "AI for Science", "强化学习", "蛋白质生成"], stage: "emerging", x: 280, y: 120,
    portraitFile: "hao-zhou.jpg", portraitSource: sources.hao,
    summary: "清华 AIR 大模型与 AI for Science PI，南京大学博士，曾在字节跳动搭建文本生成和 AI 药物设计研发团队。",
    facts: [
      fact("当前任职", "清华大学智能产业研究院副研究员、副教授。", sources.hao),
      fact("教育与学术训练", "南京师范大学计算机科学与技术学士；南京大学计算机科学与技术博士（2012–2017）。", sources.hao),
      fact("产业经历", "2017–2022 年任字节跳动人工智能实验室研究科学家、研究主管，领导文本生成中台和 AI 辅助药物设计团队。", sources.hao),
      fact("研究主线", "大规模语言模型及其在科学发现中的应用，覆盖强化学习、蛋白质与分子生成。", sources.hao),
      fact("代表性成果", "AIR 主页列出 DAPO、MemAgent 以及与 Wei-Ying Ma 共同署名的 NeurIPS 2025 蛋白质生成论文。", sources.hao),
    ],
    sources: [sources.hao, sources.thuAirRoster],
  }),
  person({
    id: "yiqun-liu-thu-p0-2026", name: "刘奕群", role: "教授 · 计算机系联席主任", institution: "THU", region: "Mainland China",
    area: "Information Retrieval · User Behavior · NLP", tags: ["信息检索", "用户行为", "NLP", "搜索评测"], stage: "senior", x: 440, y: 120,
    portraitFile: "yiqun-liu.jpg", portraitSource: sources.yiqun,
    summary: "清华信息检索与用户行为资深 PI，兼任计算机系联席主任，研究成果连接搜索评测、用户行为分析与产业搜索系统。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授、系联席主任。", sources.yiqun),
      fact("教育与学术训练", "2003 年获清华大学计算机科学与技术学士，2007 年获清华大学计算机科学与技术博士。", sources.yiqun),
      fact("研究主线", "Web 信息检索、用户行为分析、自然语言处理与搜索系统评测。", sources.yiqun),
      fact("产业连接", "官方主页记录其项目算法和系统曾被搜狗采用，并参与清华—搜狐 Web 搜索技术联合实验室。", sources.yiqun),
      fact("学术服务", "担任过 SIGIR 2018 Program Co-Chair、ICTIR 2020 Program Co-Chair 等信息检索学术服务职务。", sources.yiqun),
    ],
    sources: [sources.yiqun, sources.thuCsRoster],
  }),
  person({
    id: "qiang-zhou-thu-p0-2026", name: "周强", role: "副教授 · 副研究员", institution: "THU", region: "Mainland China",
    area: "Computational Linguistics · Corpus Annotation · NLU", tags: ["计算语言学", "语料库", "知识获取", "自然语言理解"], stage: "senior", x: 600, y: 120,
    portraitFile: "qiang-zhou.jpg", portraitSource: sources.qiang,
    summary: "清华计算语言学与中文语料资源 PI，长期研究词法、句法、语义和篇章分析，并建设大规模中文树库和事件知识库。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系副教授、副研究员。", sources.qiang),
      fact("教育与学术训练", "官方履历记录 1985–1990 年就读清华大学，1990–1996 年在北京大学继续学术训练。", sources.qiang),
      fact("研究主线", "计算语言学理论、语料加工与标注、机器学习与知识获取、自然语言理解。", sources.qiang),
      fact("语言资源", "建设约一百万词的清华中文树库，以及覆盖约 700 个事件动词、十万标注句子的事件知识库。", sources.qiang),
      fact("代表性合作", "官方论文目录列出其与 Ralph Grishman 等共同署名的 Pattern Recognition Letters 2017 知识库表示学习论文。", sources.qiang),
    ],
    sources: [sources.qiang, sources.thuCsRoster],
  }),
  person({
    id: "zhengfeng-ji-thu-p0-2026", name: "纪征锋", role: "教授", institution: "THU", region: "Mainland China",
    area: "Quantum Computing · Computational Complexity · Cryptography", tags: ["量子计算", "复杂性理论", "量子密码", "量子信息"], stage: "senior", x: 760, y: 120,
    portraitFile: "zhengfeng-ji.jpg", portraitSource: sources.zhengfeng,
    summary: "清华量子计算与复杂性理论教授，研究量子交互证明、量子密码和量子信息，并参与 MIP*=RE 等基础理论工作。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授。", sources.zhengfeng),
      fact("教育与学术训练", "2002 年获清华大学计算机科学与技术学士；2007 年获清华大学博士学位。", sources.zhengfengPku),
      fact("研究主线", "量子计算与计算理论，重点覆盖量子复杂性、量子密码、量子信息和量子软件。", sources.zhengfeng),
      fact("学术服务", "自 2022 年起担任 ACM Transactions on Quantum Computing Associate Editor。", sources.zhengfeng),
      fact("代表性合作", "清华主页列出其与 John Wright 等共同署名的 FOCS 2022 论文 Quantum soundness of testing tensor codes。", sources.zhengfeng),
    ],
    sources: [sources.zhengfeng, sources.zhengfengPku, sources.thuCsRoster],
  }),
  person({
    id: "xin-zhang-pku-p0-2026", name: "张昕", role: "助理教授", institution: "PKU", region: "Mainland China",
    area: "Programming Languages · Software Engineering · AI Reliability", tags: ["程序语言", "软件工程", "程序分析", "可信 AI"], stage: "emerging", x: 920, y: 120,
    portraitFile: "xin-zhang.jpg", portraitSource: sources.xin,
    summary: "北京大学程序语言与软件工程青年 PI，研究程序分析与机器学习的双向结合，覆盖公平性、可解释性和高可靠 AI。",
    facts: [
      fact("当前任职", "北京大学计算机学院助理教授。", sources.xin),
      fact("教育与学术训练", "上海交通大学学士（2007–2011）、Georgia Institute of Technology 博士（2011–2017）、MIT 博士后（2017–2020）。", sources.xin),
      fact("研究主线", "程序设计语言与软件工程，重点研究程序分析和机器学习的交叉。", sources.xin),
      fact("可信 AI", "利用程序分析研究机器学习系统的公平性与可解释性，并用机器学习提升程序分析可用性。", sources.xin),
      fact("学术成果", "获得 FSE 2015 和 PLDI 2014 Distinguished Paper Award。", sources.xin),
    ],
    sources: [sources.xin, sources.pkuCsRoster],
  }),
  person({
    id: "baoquan-chen-pku-p0-2026", name: "陈宝权", role: "博雅特聘教授 · 智能学院副院长", institution: "PKU", region: "Mainland China",
    area: "Computer Graphics · 3D Vision · Visualization", tags: ["计算机图形学", "三维视觉", "可视化", "具身智能"], stage: "senior", x: 1080, y: 120,
    portraitFile: "baoquan-chen.jpg", portraitSource: sources.baoquan,
    summary: "北京大学计算机图形学、三维视觉与可视化资深 PI，创建 VCL 实验室，并推动 China3DV、智班和跨学科视觉计算人才培养。",
    facts: [
      fact("当前任职", "北京大学博雅特聘教授、智能学院副院长。", sources.baoquanCfcs),
      fact("教育与学术训练", "获清华大学硕士学位、SUNY Stony Brook 博士学位；之后在 New York University 和 University of Minnesota 从事研究与教学。", sources.baoquanCfcs),
      fact("研究主线", "计算机图形学、三维视觉与大数据可视化。", sources.baoquan),
      fact("研究组织", "2018 年在北京大学创建 Visual Computing and Learning Lab，研究服务机器人和内容创作。", sources.baoquan),
      fact("学术影响", "入选 ACM SIGGRAPH Academy 和 IEEE Visualization Academy，并为 ACM、IEEE Fellow。", sources.baoquanCfcs),
    ],
    sources: [sources.baoquan, sources.baoquanCfcs, sources.pkuAiRoster],
  }),
  person({
    id: "hanrui-zhang-cuhk-p0-2026", name: "Hanrui Zhang", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "Economics and Computation · Algorithmic Game Theory · AI", tags: ["计算经济学", "算法博弈论", "机制设计", "AI"], stage: "emerging", x: 1240, y: 120,
    portraitFile: "hanrui-zhang.jpg", portraitSource: sources.hanrui,
    summary: "CUHK 计算经济学与算法博弈论青年 PI，清华本科、CMU 博士，研究用计算机科学方法处理拍卖、激励与战略学习问题。",
    facts: [
      fact("当前任职", "香港中文大学计算机科学与工程系助理教授。", sources.hanrui),
      fact("教育与学术训练", "清华大学学士；Carnegie Mellon University 博士，导师为 Vincent Conitzer。", sources.hanrui),
      fact("研究主线", "Economics and Computation，覆盖机制设计、拍卖、激励与战略性学习。", sources.hanrui),
      fact("任职轨迹", "加入 CUHK 前任 Simons Laufer Mathematical Sciences Institute 博士后，并曾任 Google Research Visiting Faculty Researcher。", sources.hanrui),
      fact("代表性合作", "CUHK 主页列出其与 Yu Cheng、Vincent Conitzer 共同署名的 When Samples Are Strategically Selected。", sources.hanrui),
    ],
    sources: [sources.hanrui, sources.cuhkRoster],
  }),
  person({
    id: "bohan-wang-nus-p0-2026", name: "Bohan Wang", role: "Assistant Professor", institution: "NUS", region: "Singapore",
    area: "Computer Graphics · 3D Generation · Simulation", tags: ["计算机图形学", "三维生成", "动画", "物理仿真"], stage: "emerging", x: 1400, y: 120,
    portraitFile: "bohan-wang.jpg", portraitSource: sources.bohan,
    summary: "NUS 图形学与三维生成青年 PI，USC 博士毕业后在 MIT CSAIL 接受 Wojciech Matusik 指导，研究连接三维形状生成、动画与仿真。",
    facts: [
      fact("当前任职", "NUS School of Computing 计算机系助理教授。", sources.bohan),
      fact("教育与学术训练", "华中科技大学 ACM 班学士（2013）；USC 硕士（2015）和计算机博士（2021），博士导师为 Jernej Barbic。", sources.bohan),
      fact("博士后训练", "在 MIT CSAIL Computational Design & Fabrication Group 任博士后，由 Wojciech Matusik 指导。", sources.bohan),
      fact("研究主线", "计算机图形学，重点覆盖三维形状设计与生成、计算机动画和仿真。", sources.bohan),
      fact("产业经历", "曾在 Meta Reality Labs 实习，并担任 ByteDance 视频生成基础模型团队顾问。", sources.bohan),
    ],
    sources: [sources.bohan, sources.nusRoster],
  }),
];

export const candidatePriorityP0AsiaBatch8Relationships2026: Relationship[] = [
  { id: "candidate-p0-asia-b8-ma-liu", from: "wei-ying-ma", to: "jingjing-liu-thu-air-p0-2026", type: "collaboration", subtype: "publication", label: "大模型智能体论文合作", evidence: "刘菁菁的清华 AIR 官方主页列出两人共同署名的 ICLR 2026 Oral 论文 MemAgent。", evidenceObject: "MemAgent: Reshaping Long-Context LLM with Multi-Conv RL-based Memory Agent · ICLR 2026", source: sources.jingjing, verified: true, recentYear: 2026 },
  { id: "candidate-p0-asia-b8-ma-zhou", from: "wei-ying-ma", to: "hao-zhou-thu-air-p0-2026", type: "collaboration", subtype: "publication", label: "蛋白质生成论文合作", evidence: "周浩的清华 AIR 官方主页列出两人共同署名的 NeurIPS 2025 论文 Rationalized All-Atom Protein Design with Unified Multi-modal Bayesian Flow。", evidenceObject: "Rationalized All-Atom Protein Design with Unified Multi-modal Bayesian Flow · NeurIPS 2025", source: sources.hao, verified: true, recentYear: 2025 },
  { id: "candidate-p0-asia-b8-liu-derijke", from: "yiqun-liu-thu-p0-2026", to: "maarten-de-rijke-eu", type: "collaboration", subtype: "publication", label: "Web 图像搜索评测论文合作", evidence: "刘奕群的清华官方主页列出两人共同署名的 SIGIR 2020 论文 Preference-based Evaluation Metrics for Web Image Search。", evidenceObject: "Preference-based Evaluation Metrics for Web Image Search · SIGIR 2020", source: sources.yiqun, verified: true, recentYear: 2020 },
  { id: "candidate-p0-asia-b8-zhou-grishman", from: "qiang-zhou-thu-p0-2026", to: "ralph-grishman-lineage-uiuc-p0", type: "collaboration", subtype: "publication", label: "知识库表示学习论文合作", evidence: "周强的清华官方主页列出两人共同署名的 Pattern Recognition Letters 2017 论文 Distributed Representation Learning for Knowledge Bases with Entity Descriptions。", evidenceObject: "Distributed Representation Learning for Knowledge Bases with Entity Descriptions · Pattern Recognition Letters 2017", source: sources.qiang, verified: true, recentYear: 2017 },
  { id: "candidate-p0-asia-b8-ji-wright", from: "zhengfeng-ji-thu-p0-2026", to: "john-wright-us", type: "collaboration", subtype: "publication", label: "量子复杂性论文合作", evidence: "纪征锋的清华官方主页列出两人共同署名的 FOCS 2022 论文 Quantum soundness of testing tensor codes。", evidenceObject: "Quantum soundness of testing tensor codes · FOCS 2022", source: sources.zhengfeng, verified: true, recentYear: 2022 },
  { id: "candidate-p0-asia-b8-zhang-solar", from: "xin-zhang-pku-p0-2026", to: "armando-solar-lezama-lineage", type: "collaboration", subtype: "publication", label: "可信程序分析论文合作", evidence: "张昕的北大官方主页列出两人共同署名的 OOPSLA 2019 论文 Verifying Fairness Properties via Concentration。", evidenceObject: "Verifying Fairness Properties via Concentration · OOPSLA 2019", source: sources.xin, verified: true, recentYear: 2019 },
  { id: "candidate-p0-asia-b8-chen-huang", from: "baoquan-chen-pku-p0-2026", to: "qixing-huang-ut-austin", type: "collaboration", subtype: "publication", label: "三维制造论文合作", evidence: "陈宝权的北大官方主页列出两人共同署名的 SIGGRAPH 2016 论文 Connected Fermat Spirals for Layered Fabrication。", evidenceObject: "Connected Fermat Spirals for Layered Fabrication · SIGGRAPH 2016", source: sources.baoquan, verified: true, recentYear: 2016 },
  { id: "candidate-p0-asia-b8-zhang-cheng", from: "hanrui-zhang-cuhk-p0-2026", to: "yu-cheng-cuhk", type: "collaboration", subtype: "publication", label: "战略采样论文合作", evidence: "Hanrui Zhang 的 CUHK 官方主页列出两人共同署名的论文 When Samples Are Strategically Selected。", evidenceObject: "When Samples Are Strategically Selected", source: sources.hanrui, verified: true },
  { id: "candidate-p0-asia-b8-matusik-wang", from: "wojciech-matusik-mit-p0-b6", to: "bohan-wang-nus-p0-2026", type: "lineage", subtype: "postdoc_mentor", label: "博士后导师", evidence: "NUS 官方简介明确写明 Bohan Wang 在 MIT CSAIL Computational Design & Fabrication Group 博士后阶段由 Wojciech Matusik 指导。", evidenceObject: "Bohan Wang · MIT CSAIL postdoc", source: sources.bohan, verified: true },
];

export const candidatePriorityP0AsiaBatch8Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0AsiaBatch8GroupMembers2026: GroupMember[] = [];

export type CandidatePriorityP0AsiaBatch8RosterPromotion2026 = { unitUrl: string; rosterName: string; atlasPersonId: string };
export const candidatePriorityP0AsiaBatch8RosterPromotions2026: CandidatePriorityP0AsiaBatch8RosterPromotion2026[] = [
  { unitUrl: sources.thuAirRoster.url, rosterName: "刘菁菁", atlasPersonId: "jingjing-liu-thu-air-p0-2026" },
  { unitUrl: sources.thuAirRoster.url, rosterName: "周浩", atlasPersonId: "hao-zhou-thu-air-p0-2026" },
  { unitUrl: sources.thuCsRoster.url, rosterName: "Yiqun LIU", atlasPersonId: "yiqun-liu-thu-p0-2026" },
  { unitUrl: sources.thuCsRoster.url, rosterName: "Qiang ZHOU", atlasPersonId: "qiang-zhou-thu-p0-2026" },
  { unitUrl: sources.thuCsRoster.url, rosterName: "Zhengfeng Ji", atlasPersonId: "zhengfeng-ji-thu-p0-2026" },
  { unitUrl: sources.pkuCsRoster.url, rosterName: "张昕", atlasPersonId: "xin-zhang-pku-p0-2026" },
  { unitUrl: sources.pkuAiRoster.url, rosterName: "陈宝权", atlasPersonId: "baoquan-chen-pku-p0-2026" },
  { unitUrl: sources.cuhkRoster.url, rosterName: "Hanrui Zhang", atlasPersonId: "hanrui-zhang-cuhk-p0-2026" },
  { unitUrl: sources.nusRoster.url, rosterName: "WANG Bohan", atlasPersonId: "bohan-wang-nus-p0-2026" },
];

export const People = candidatePriorityP0AsiaBatch8People2026;
export const Relationships = candidatePriorityP0AsiaBatch8Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch8Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch8GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch8RosterPromotions2026;
export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
