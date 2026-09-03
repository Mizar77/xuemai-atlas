import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const sources = {
  thuRoster: source("清华大学计算机系 · 全职教师名录", "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", "official", "计算机系现任全职教师名录"),
  thuAirRoster: source("清华大学 AIR · 研究团队", "https://air.tsinghua.edu.cn/airtd/yjtd.htm", "official", "AIR 现任教授、研究员名录"),
  pkuRoster: source("北京大学计算机学院 · 教师名录", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "计算机学院现任教师名录"),
  lifeng: source("清华大学计算机系 · 孙立峰", "https://www.cs.tsinghua.edu.cn/csen/info/1306/4333.htm", "official", "现任职务、教育、研究、产业项目、论文和官方头像"),
  taijiang: source("清华大学计算机系 · 穆太江", "https://www.cs.tsinghua.edu.cn/csen/info/1307/4585.htm", "official", "现任职务、教育与任职轨迹、研究、论文和官方头像"),
  yunxin: source("清华大学 AIR · 刘云新", "https://air.tsinghua.edu.cn/info/1046/1202.htm", "official", "现任职务、教育与任职轨迹、研究、论文和官方头像"),
  ting: source("清华大学 AIR · 曹婷", "https://air.tsinghua.edu.cn/info/1046/2451.htm", "official", "现任职务、博士导师、产业经历、研究、论文和官方头像"),
  yunfang: source("北京大学计算机学院 · 吴云芳", "https://cs.pku.edu.cn/info/1083/1705.htm", "official", "现任职务、教育与任职轨迹、研究、论文和官方头像"),
  sergey: source("北京大学计算机学院 · 谢辽夏", "https://cs.pku.edu.cn/info/1084/3250.htm", "official", "现任职务、博士研究、程序修复方向、论文和官方头像"),
  sergeyLineage: source("NUS TSUNAMi · Student Placement", "https://www.comp.nus.edu.sg/~tsunami/placement.htm", "official", "Abhik Roychoudhury 博士生与公开去向，列出 Sergey Mechtaev"),
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
    src: `portraits/candidate-p0-asia-batch-11-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0AsiaBatch11People2026: Person[] = [
  person({
    id: "lifeng-sun-thu-p0-b11", name: "孙立峰", role: "教授", institution: "THU", region: "Mainland China",
    area: "Networked Multimedia · Edge Computing · Video Systems", tags: ["多媒体系统", "边缘计算", "视频分析", "云计算"], stage: "senior", x: 160, y: 160,
    portraitFile: "lifeng-sun.jpg", portraitSource: sources.lifeng,
    summary: "清华网络多媒体与边缘计算教授，研究贯穿视频传输、分析和云边协同，并长期主持多家科技企业合作项目。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授，2004 年加入该系。", sources.lifeng),
      fact("教育与学术训练", "1995 年获国防科技大学系统工程学士，2000 年获该校系统工程博士。", sources.lifeng),
      fact("研究主线", "网络多媒体、多媒体边缘计算、视频分析与处理、多媒体大数据和云计算。", sources.lifeng),
      fact("产业连接", "官方主页列出 Intel、Microsoft、Samsung、Tencent、Baidu、Alibaba、Huawei、Kuaishou 等合作项目。", sources.lifeng),
      fact("代表性合作", "官方论文表列出其与文勇刚共同署名的 IEEE TCSVT 2018 移动视频预取论文。", sources.lifeng),
    ],
    sources: [sources.lifeng, sources.thuRoster],
  }),
  person({
    id: "taijiang-mu-thu-p0-b11", name: "穆太江", role: "研究副教授", institution: "THU", region: "Mainland China",
    area: "Computer Graphics · Computer Vision · 3D Generation", tags: ["计算机图形学", "计算机视觉", "三维重建", "三维生成"], stage: "emerging", x: 320, y: 160,
    portraitFile: "taijiang-mu.jpg", portraitSource: sources.taijiang,
    summary: "清华图形学与视觉研究副教授，聚焦三维重建和生成，并与视觉、图形学团队开展可核验的跨校论文合作。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系研究副教授。", sources.taijiang),
      fact("教育与学术训练", "2011–2016 年在清华大学计算机系攻读博士，2016–2019 年在该系从事博士后研究。", sources.taijiang),
      fact("任职轨迹", "2019–2024 年任研究助理教授，2024 年 12 月起任研究副教授。", sources.taijiang),
      fact("研究主线", "计算机图形学与计算机视觉，重点研究三维重建和三维生成。", sources.taijiang),
      fact("代表性合作", "官方主页列出其与陈启峰共同署名的 ICCV 2025 RGE-GS 论文。", sources.taijiang),
    ],
    sources: [sources.taijiang, sources.thuRoster],
  }),
  person({
    id: "yunxin-liu-thu-air-p0-b11", name: "刘云新", role: "万国数据教授 · AIR 副院长", institution: "THU", region: "Mainland China",
    area: "AIoT · Mobile Computing · Edge Intelligence", tags: ["AIoT", "移动计算", "边缘计算", "端侧 AI"], stage: "senior", x: 480, y: 160,
    portraitFile: "yunxin-liu.jpg", portraitSource: sources.yunxin,
    summary: "清华 AIR 移动与边缘智能教授，拥有近二十年微软亚洲研究院经历，研究成果进入 Visual Studio 等产品。",
    facts: [
      fact("当前任职", "清华大学万国数据教授、智能产业研究院副院长、首席研究员和博士生导师。", sources.yunxin),
      fact("教育与学术训练", "中国科学技术大学学士、清华大学硕士、上海交通大学计算机应用技术博士。", sources.yunxin),
      fact("任职轨迹", "2001–2021 年在微软亚洲研究院历任研究员、主管及主任研究员，2021 年加入清华 AIR。", sources.yunxin),
      fact("研究主线", "人工智能、AIoT、移动计算与边缘计算。", sources.yunxin),
      fact("成果转化", "官方主页记录其研究成果应用于 Visual Studio 等微软产品。", sources.yunxin),
    ],
    sources: [sources.yunxin, sources.thuAirRoster],
  }),
  person({
    id: "ting-cao-thu-air-p0-b11", name: "曹婷", role: "研究员 · 教授", institution: "THU", region: "Mainland China",
    area: "Edge AI · Neural Network Systems · AI Accelerators", tags: ["边缘智能", "神经网络系统", "模型量化", "AI 加速器"], stage: "senior", x: 640, y: 160,
    portraitFile: "ting-cao.jpg", portraitSource: sources.ting,
    summary: "清华 AIR 边缘智能与神经网络系统教授，曾在华为和微软亚洲研究院工作，推动模型进入 Office、Windows、Bing 和鸿蒙。",
    facts: [
      fact("当前任职", "2025 年 7 月起任清华大学智能产业研究院研究员、教授。", sources.ting),
      fact("教育与学术训练", "获澳大利亚国立大学博士学位，博士导师为 Steve Blackburn 与 Kathryn McKinley。", sources.ting),
      fact("任职轨迹", "曾任华为编译器与编程语言实验室高级软件工程师、微软亚洲研究院首席研究员及研究主管。", sources.ting),
      fact("研究主线", "边缘智能、物理智能、神经网络训推系统和神经网络加速器。", sources.ting),
      fact("成果转化", "官方主页记录其成果集成到 Microsoft Office、Windows、Bing 与华为鸿蒙。", sources.ting),
    ],
    sources: [sources.ting, sources.thuAirRoster],
  }),
  person({
    id: "yunfang-wu-pku-p0-b11", name: "吴云芳", role: "副教授 · 博士生导师", institution: "PKU", region: "Mainland China",
    area: "Natural Language Processing · Multimodal Semantics · AI for Education", tags: ["NLP", "大语言模型", "多模态", "AI 教育"], stage: "senior", x: 800, y: 160,
    portraitFile: "yunfang-wu.jpg", portraitSource: sources.yunfang,
    summary: "北大自然语言处理副教授，研究大模型语义理解、文本生成、多模态与 AI 教育，并主持多项问答和阅读理解项目。",
    facts: [
      fact("当前任职", "北京大学计算机学院副教授、博士生导师、计算智能系副系主任。", sources.yunfang),
      fact("教育与学术训练", "2000–2003 年在北京大学攻读博士，2003–2005 年在北京大学从事博士后研究。", sources.yunfang),
      fact("研究主线", "基于大语言模型的语义理解与文本生成、跨模态语义理解和 AI 教育。", sources.yunfang),
      fact("科研项目", "主持面向阅读理解的问题生成、文档智能问答和中文文本语义分析等项目。", sources.yunfang),
      fact("代表性合作", "官方论文表列出其与孙栩共同署名的 COLING 2022 中文语法纠错论文。", sources.yunfang),
    ],
    sources: [sources.yunfang, sources.pkuRoster],
  }),
  person({
    id: "sergey-mechtaev-pku-p0-b11", name: "谢辽夏", role: "助理教授", institution: "PKU", region: "Mainland China",
    area: "Software Engineering · Program Repair · Formal Methods", tags: ["软件工程", "程序修复", "形式化方法", "程序合成"], stage: "emerging", x: 960, y: 160,
    portraitFile: "sergey-mechtaev.jpg", portraitSource: sources.sergey,
    summary: "北大自动程序修复助理教授，博士工作 Angelix 将符号执行与程序合成结合，并持续推动程序修复的研究与部署。",
    facts: [
      fact("当前任职", "北京大学计算机学院软件研究所助理教授。", sources.sergey),
      fact("教育与学术训练", "博士阶段研究形成程序修复系统 Angelix；NUS 导师团队公开页将其列为 Abhik Roychoudhury 的博士生。", sources.sergeyLineage),
      fact("研究主线", "软件缺陷修复、形式化方法、符号执行与程序合成。", sources.sergey),
      fact("代表性成果", "博士论文于 2019 年获 ACM SIGSOFT 杰出博士论文奖。", sources.sergey),
      fact("社区建设", "创办并维护 program-repair.org，并发起自动程序修复研讨会。", sources.sergey),
    ],
    sources: [sources.sergey, sources.sergeyLineage, sources.pkuRoster],
  }),
];

export const candidatePriorityP0AsiaBatch11Relationships2026: Relationship[] = [
  { id: "candidate-p0-asia-b11-sun-wen", from: "lifeng-sun-thu-p0-b11", to: "yonggang-wen-ntu", type: "collaboration", subtype: "publication", label: "移动视频论文合作", evidence: "孙立峰的清华官方主页列出两人共同署名的 IEEE TCSVT 2018 论文。", evidenceObject: "Toward Wi-Fi AP-Assisted Content Prefetching for an On-Demand TV Series · IEEE TCSVT 2018", source: sources.lifeng, verified: true, recentYear: 2018 },
  { id: "candidate-p0-asia-b11-mu-chen", from: "taijiang-mu-thu-p0-b11", to: "qifeng-chen-hkust", type: "collaboration", subtype: "publication", label: "三维场景重建论文合作", evidence: "穆太江的清华官方主页列出两人共同署名的 ICCV 2025 RGE-GS 论文。", evidenceObject: "RGE-GS: Reward-Guided Expansive Driving Scene Reconstruction via Diffusion Priors · ICCV 2025", source: sources.taijiang, verified: true, recentYear: 2025 },
  { id: "candidate-p0-asia-b11-liu-cao", from: "yunxin-liu-thu-air-p0-b11", to: "ting-cao-thu-air-p0-b11", type: "collaboration", subtype: "publication", label: "端侧模型剪枝论文合作", evidence: "刘云新的 AIR 官方主页列出两人共同署名的 IEEE Transactions on Computers 2024 论文 PruneAug。", evidenceObject: "PruneAug: Bridging DNN Pruning and Inference Latency on Diverse Sparse Platforms Using Automatic Layerwise Block Pruning · IEEE TC 2024", source: sources.yunxin, verified: true, recentYear: 2024 },
  { id: "candidate-p0-asia-b11-wu-sun", from: "yunfang-wu-pku-p0-b11", to: "xu-sun-pku", type: "collaboration", subtype: "publication", label: "中文语法纠错论文合作", evidence: "吴云芳的北大官方主页列出两人共同署名的 COLING 2022 论文。", evidenceObject: "Position Offset Label Prediction for Grammatical Error Correction · COLING 2022", source: sources.yunfang, verified: true, recentYear: 2022 },
  { id: "candidate-p0-asia-b11-abhik-mechtaev", from: "abhik-roychoudhury-nus-p0-2026", to: "sergey-mechtaev-pku-p0-b11", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "NUS TSUNAMi 的官方学生去向页将 Sergey Mechtaev 列在 Abhik Roychoudhury 的博士生名单中。", evidenceObject: "NUS TSUNAMi · Student Placement · Sergey Mechtaev", source: sources.sergeyLineage, verified: true },
];

export const candidatePriorityP0AsiaBatch11Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0AsiaBatch11GroupMembers2026: GroupMember[] = [];

export type CandidatePriorityP0AsiaBatch11RosterPromotion2026 = { unitUrl: string; rosterName: string; atlasPersonId: string };
export const candidatePriorityP0AsiaBatch11RosterPromotions2026: CandidatePriorityP0AsiaBatch11RosterPromotion2026[] = [
  { unitUrl: sources.thuRoster.url, rosterName: "Lifeng SUN", atlasPersonId: "lifeng-sun-thu-p0-b11" },
  { unitUrl: sources.thuRoster.url, rosterName: "Taijiang MU", atlasPersonId: "taijiang-mu-thu-p0-b11" },
  { unitUrl: sources.thuAirRoster.url, rosterName: "刘云新", atlasPersonId: "yunxin-liu-thu-air-p0-b11" },
  { unitUrl: sources.thuAirRoster.url, rosterName: "曹婷", atlasPersonId: "ting-cao-thu-air-p0-b11" },
  { unitUrl: sources.pkuRoster.url, rosterName: "吴云芳", atlasPersonId: "yunfang-wu-pku-p0-b11" },
  { unitUrl: sources.pkuRoster.url, rosterName: "谢辽夏", atlasPersonId: "sergey-mechtaev-pku-p0-b11" },
];

export const People = candidatePriorityP0AsiaBatch11People2026;
export const Relationships = candidatePriorityP0AsiaBatch11Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch11Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch11GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch11RosterPromotions2026;
export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
