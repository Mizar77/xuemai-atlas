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
    "逐人列出博士毕业年份、导师与公开职业去向",
  ),
  dimitrisOfficial: source(
    "HKUST CSE · Dimitris Papadias",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/dimitris",
    "official",
    "现任教授、博士训练、任职轨迹、研究方向与官方头像",
  ),
  keOfficial: source(
    "HKUST CSE · Ke Yi",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/yike",
    "official",
    "现任教授、Duke 博士、研究方向、荣誉与官方头像",
  ),
  keCv: source(
    "Ke Yi · HKUST first-party CV",
    "https://cse.hkust.edu.hk/~yike/cv.htm",
    "profile",
    "清华本科、Duke 博士、Pankaj K. Agarwal 与 Lars Arge 导师信息及任职轨迹",
  ),
  keHome: source(
    "Ke Yi · HKUST personal homepage",
    "https://cse.hkust.edu.hk/~yike/",
    "profile",
    "研究主线、当前学生、博士毕业生及其学术界和工业界去向",
  ),
  qiongOfficial: source(
    "HKUST CSE · Qiong Luo",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/luo",
    "official",
    "现任教授、研究方向与官方头像",
  ),
  qiongHome: source(
    "Qiong Luo · HKUST personal homepage",
    "https://cse.hkust.edu.hk/~luo/",
    "profile",
    "北大学位、Wisconsin-Madison 博士、HKUST(GZ) 任职、研究项目和当前学生",
  ),
  raymondOfficial: source(
    "HKUST CSE · Raymond Chi-Wing Wong",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/raywong",
    "official",
    "现任教授与副系主任、CUHK 学位、访问经历、长期合作者、研究方向与官方头像",
  ),
  wilfredOfficial: source(
    "HKUST CSE · Wilfred Siu-Hung Ng",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/wilfred",
    "official",
    "现任副教授、研究方向与官方头像",
  ),
  wilfredHome: source(
    "Wilfred Ng · HKUST personal biography",
    "https://cse.hkust.edu.hk/faculty/wilfred/content/main.htm",
    "profile",
    "香港大学本科、UCL 硕博训练、数据库与图数据研究主线",
  ),
  xiaofangOfficial: source(
    "HKUST CSE · Xiaofang Zhou",
    "https://cse.hkust.edu.hk/admin/people/faculty/profile/zxf",
    "official",
    "现任讲座教授兼系主任、南京大学与昆士兰大学教育、CSIRO/UQ 任职、研究方向与官方头像",
  ),
  xiaofangTeam: source(
    "HKUST Data Science Foundations Lab · People",
    "https://cse.hkust.edu.hk/dsf/People.html",
    "profile",
    "DSF Lab 负责人、HKUST Big Data Institute 联合主任、产业联合实验室与公开团队成员",
  ),
  jamesOfficial: source(
    "CUHK CSE · James Cheng",
    "https://www.cse.cuhk.edu.hk/~jcheng/index.html",
    "profile",
    "现任教授、LLM agents 与多模态基础模型研究方向、招生信息及官方头像",
  ),
  jamesBio: source(
    "CUHK CSE seminar · James Cheng biography",
    "https://www.cse.cuhk.edu.hk/upcoming-events/high-performance-data-analytics-frameworks/",
    "official",
    "HKUST 工学学士与博士、分布式数据分析、图计算和机器学习系统研究",
  ),
  jamesAdvising: source(
    "James Cheng · Advising and alumni",
    "https://www.cse.cuhk.edu.hk/~jcheng/advising.html",
    "profile",
    "博士、硕士、博士后和研究助理名单及公开学术界、创业和大厂去向",
  ),
  yufeiHome: source(
    "Yufei Tao · CUHK homepage",
    "https://www.cse.cuhk.edu.hk/~taoyf/",
    "profile",
    "现任教授、研究主线、当前博士生、校友与官方头像",
  ),
  yufeiBio: source(
    "Yufei Tao · first-party biography",
    "https://www.cse.cuhk.edu.hk/~taoyf/bio.html",
    "profile",
    "HKUST 博士、Dimitris Papadias 导师关系、CMU 访问和 CUHK/UQ 任职轨迹",
  ),
  yufeiAwards: source(
    "Yufei Tao · first-party awards",
    "https://www.cse.cuhk.edu.hk/~taoyf/awards.html",
    "profile",
    "ACM/IEEE Fellow 与 SIGMOD/PODS/ICDT 奖项",
  ),
  davidOfficial: source(
    "SMU SCIS · David Lo",
    "https://computing.smu.edu.sg/faculty/profile/901/david-lo",
    "official",
    "现任 Vice Provost、讲座教授、RISE 联合主任、研究方向、NUS 博士、学生名单与官方头像",
  ),
  davidCv: source(
    "David Lo · SMU official CV",
    "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2026-02/davidlo-CV.pdf",
    "official",
    "NTU 本科、NUS 博士、SMU 任职轨迹、Microsoft Research 访问与荣誉",
  ),
  lingxiaoOfficial: source(
    "SMU SCIS · Lingxiao Jiang",
    "https://computing.smu.edu.sg/faculty/profile/896/jiang-lingxiao",
    "official",
    "现任教授兼 RISE 主任、UC Davis 博士、软件工程与 AI 方向、学生名单和官方头像",
  ),
  sunOfficial: source(
    "SMU SCIS · Jun Sun",
    "https://computing.smu.edu.sg/faculty/profile/6816/sun-jun",
    "official",
    "现任教授、RISE 联合主任、研究集群主任、NUS 博士、研究方向和学生名单",
  ),
  riseCenter: source(
    "SMU · Centre for Research on Intelligent Software Engineering",
    "https://rise.smu.edu.sg/",
    "official",
    "中心研究范围、David Lo、Lingxiao Jiang、Jun Sun 的主任/联合主任团队与产业资助",
  ),
  sunStudent: source(
    "SMU SCIS · Nay Myat Min dissertation defence",
    "https://computing.smu.edu.sg/newsletter/phd-dissertation-defense-nay-myat-min-securing-ai-models-against-backdoors-jailbreaks",
    "official",
    "Jun Sun 指导的博士生、AI/LLM 安全研究及 Huawei Singapore Research Center 实习",
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
    src: `portraits/candidate-p0-asia-batch-4-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0AsiaBatch4People2026: Person[] = [
  person({
    id: "dimitris-papadias-hkust-p0-2026", name: "Dimitris Papadias", chinese: "白德善", role: "Professor", institution: "HKUST", region: "Hong Kong",
    area: "Data Management · Graph Analytics · Spatial Databases", tags: ["数据库", "图数据", "空间数据库", "大数据"], stage: "senior", x: 120, y: 120,
    portraitFile: "dimitris-papadias.jpg", portraitSource: sources.dimitrisOfficial,
    summary: "HKUST 数据管理资深教授，研究覆盖空间数据库、图数据管理与位置服务；其博士培养网络已延伸至 CUHK、KAUST 和欧洲高校。",
    facts: [
      fact("当前任职", "HKUST 计算机科学与工程系教授。", sources.dimitrisOfficial),
      fact("教育与学术训练", "获 National Technical University of Athens 电气与计算机工程博士。", sources.dimitrisOfficial),
      fact("任职轨迹", "1997 年加入 HKUST，之前曾在 GMD、NCGIA、UC San Diego、TU Vienna、Queen's 与 Patras 工作或学习。", sources.dimitrisOfficial),
      fact("研究主线", "数据管理、算法、图数据管理与分析、位置服务和大数据。", sources.dimitrisOfficial),
      fact("人才培养", "HKUST 官方博士校友页列出 Yufei Tao、Panos Kalnis、Nikos Mamoulis 等由其指导。", sources.hkustGraduates),
    ],
    sources: [sources.dimitrisOfficial, sources.hkustGraduates],
  }),
  person({
    id: "ke-yi-hkust-p0-2026", name: "Ke Yi", chinese: "易珂", role: "Professor · MSc Big Data Technology Director", institution: "HKUST", region: "Hong Kong",
    area: "Database Theory · Algorithms · Data Privacy", tags: ["数据库理论", "算法", "数据隐私", "数据流"], stage: "senior", x: 280, y: 120,
    portraitFile: "ke-yi.jpg", portraitSource: sources.keOfficial,
    summary: "HKUST 数据库理论与算法教授，连接严谨理论和可部署系统；博士谱系来自 Duke，并公开维护覆盖高校、云计算与大厂研究团队的学生流向。",
    facts: [
      fact("当前任职", "HKUST CSE 教授，并任 MSc in Big Data Technology 项目主任。", sources.keHome),
      fact("教育与学术训练", "2001 年清华大学计算机本科；2006 年 Duke 计算机博士，导师为 Pankaj K. Agarwal 与 Lars Arge。", sources.keCv),
      fact("研究主线", "数据库理论与系统、查询处理、数据安全与隐私、并行/分布式算法、采样与数据流。", sources.keHome),
      fact("产业连接", "研究获 Alibaba、ByteDance、Huawei、Microsoft 与 Google 支持。", sources.keHome),
      fact("人才培养", "公开校友页列出学生进入 NTU、SEU、Waterloo、Huawei、Ant、Alibaba、Tencent 与 Google。", sources.keHome),
    ],
    sources: [sources.keOfficial, sources.keCv, sources.keHome, sources.hkustGraduates],
  }),
  person({
    id: "qiong-luo-hkust-p0-2026", name: "Qiong Luo", chinese: "罗琼", role: "Professor", institution: "HKUST", region: "Hong Kong",
    area: "Big Data Systems · GPU Analytics · Data-Intensive Computing", tags: ["大数据系统", "GPU", "并行系统", "科学计算"], stage: "senior", x: 440, y: 120,
    portraitFile: "qiong-luo.jpg", portraitSource: sources.qiongOfficial,
    summary: "HKUST 大数据与异构计算教授，长期研究 GPU 加速的数据处理和科学计算；学生流向覆盖高校、Huawei、ByteDance、Tencent、DJI 与 Ant。",
    facts: [
      fact("当前任职", "HKUST CSE 教授，同时在 HKUST(GZ) Data Science and Analytics 任教授。", sources.qiongHome),
      fact("教育与学术训练", "北京大学计算机学士、硕士；University of Wisconsin-Madison 计算机博士。", sources.qiongHome),
      fact("研究主线", "大数据系统、并行与分布式系统、现代硬件上的数据管理、GPU 数据分析与 e-science。", sources.qiongHome),
      fact("研究组织", "领导 HKUST Rapids Group，项目覆盖 GPU 数据库、基因组计算和天文数据在线处理。", sources.qiongHome),
      fact("人才培养", "HKUST 官方校友页明确列出 Bingsheng He、Shixuan Sun、Yulin Che 等博士及其公开去向。", sources.hkustGraduates),
    ],
    sources: [sources.qiongOfficial, sources.qiongHome, sources.hkustGraduates],
  }),
  person({
    id: "raymond-wong-hkust-p0-2026", name: "Raymond Chi-Wing Wong", chinese: "黄智荣", role: "Professor · Associate Head (Education)", institution: "HKUST", region: "Hong Kong",
    area: "Big Data · Data Mining · Database Systems", tags: ["数据库", "大数据", "数据挖掘", "隐私"], stage: "senior", x: 600, y: 120,
    portraitFile: "raymond-wong.jpg", portraitSource: sources.raymondOfficial,
    summary: "HKUST 数据库教授兼副系主任，研究大数据、数据挖掘和隐私；训练与合作网络连接 CUHK、SFU、IBM Research、Waterloo 和多所亚洲高校。",
    facts: [
      fact("当前任职", "HKUST CSE 教授、Associate Head of Department (Education)。", sources.raymondOfficial),
      fact("教育与学术训练", "2002、2004、2008 年分别获 CUHK 计算机 BSc、MPhil 与 PhD。", sources.raymondOfficial),
      fact("研究主线", "大数据、数据挖掘与数据库系统。", sources.raymondOfficial),
      fact("外部训练", "曾访问 SFU 的 Jian Pei/Ke Wang、IBM T.J. Watson 的 Philip S. Yu 与 Waterloo 的 Tamer Özsu。", sources.raymondOfficial),
      fact("人才培养", "HKUST 博士校友页记录 Victor Junqiu Wei、Libin Wang 等由其指导。", sources.hkustGraduates),
    ],
    sources: [sources.raymondOfficial, sources.hkustGraduates],
  }),
  person({
    id: "wilfred-ng-hkust-p0-2026", name: "Wilfred Siu-Hung Ng", chinese: "吴兆鸿", role: "Associate Professor", institution: "HKUST", region: "Hong Kong",
    area: "Databases · Data Mining · Graph Analytics", tags: ["数据库", "数据挖掘", "图分析", "信息系统"], stage: "senior", x: 760, y: 120,
    portraitFile: "wilfred-ng.jpg", portraitSource: sources.wilfredOfficial,
    summary: "HKUST 数据库与图分析副教授，教育背景连接 HKU 与 UCL；博士培养网络包括现任 CUHK 教授 James Cheng。",
    facts: [
      fact("当前任职", "HKUST 计算机科学与工程系副教授。", sources.wilfredOfficial),
      fact("教育与学术训练", "香港大学理学学士与教育证书；University College London 理学硕士与博士。", sources.wilfredHome),
      fact("研究主线", "数据库、数据挖掘、信息系统、社会计算、网络搜索和图数据分析。", sources.wilfredHome),
      fact("专业社群", "为 ACM 与 IEEE professional member。", sources.wilfredHome),
      fact("人才培养", "HKUST 官方博士校友页记录 James Sheung-Chak Cheng 与 Yiping Ke 由其指导。", sources.hkustGraduates),
    ],
    sources: [sources.wilfredOfficial, sources.wilfredHome, sources.hkustGraduates],
  }),
  person({
    id: "xiaofang-zhou-hkust-p0-2026", name: "Xiaofang Zhou", chinese: "周晓方", role: "Otto Poon Professor · Chair Professor · Head", institution: "HKUST", region: "Hong Kong",
    area: "Spatiotemporal Data · Data Mining · Machine Learning", tags: ["时空数据", "数据挖掘", "机器学习", "大数据"], stage: "senior", x: 920, y: 120,
    portraitFile: "xiaofang-zhou.jpg", portraitSource: sources.xiaofangOfficial,
    summary: "HKUST CSE 系主任与数据科学资深学者，研究从时空数据库延伸到机器学习；组织网络连接 HKUST 大数据研究院、工业 AI 联合实验室和一批进入高校及大厂的博士。",
    facts: [
      fact("当前任职", "HKUST Otto Poon Professor of Engineering、CSE Chair Professor 与系主任。", sources.xiaofangOfficial),
      fact("教育与学术训练", "南京大学计算机学士、硕士；1994 年获 University of Queensland 计算机博士。", sources.xiaofangOfficial),
      fact("任职轨迹", "曾任 CSIRO Senior Research Scientist 并领导 Spatial Information Systems group，后在 UQ 任教授和 DKE 研究组负责人。", sources.xiaofangOfficial),
      fact("研究主线", "时空与多媒体数据库、数据挖掘、数据质量、大数据分析和机器学习。", sources.xiaofangOfficial),
      fact("研究组织", "DSF 页面列出其 BDI/INAIR 等领导角色和公开团队成员。", sources.xiaofangTeam),
    ],
    sources: [sources.xiaofangOfficial, sources.xiaofangTeam, sources.hkustGraduates],
  }),
  person({
    id: "james-cheng-cuhk-p0-2026", name: "James Cheng", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "LLM Agents · Multimodal Models · Distributed AI Systems", tags: ["LLM Agents", "多模态", "强化学习", "分布式系统"], stage: "senior", x: 1080, y: 120,
    portraitFile: "james-cheng.jpg", portraitSource: sources.jamesOfficial,
    summary: "CUHK 大规模图与 AI 系统教授，当前研究转向 LLM agents、多模态基础模型和长程推理；博士师承 Wilfred Ng，学生流向 Meta、Google DeepMind、AWS、ByteDance 与创业公司。",
    facts: [
      fact("当前任职", "CUHK 计算机科学与工程系教授。", sources.jamesOfficial),
      fact("教育与学术训练", "HKUST 工学学士与计算机博士；HKUST 官方记录博士导师为 Wilfred Siu-Hung Ng。", sources.jamesBio),
      fact("研究主线", "LLM agent 评测与奖励设计、长程推理强化学习、多模态基础模型及大规模训练/服务系统。", sources.jamesOfficial),
      fact("招生状态", "第一方主页公开招募 2027 入学博士/硕士，并招募具身智能方向 PhD、MPhil、RA 与实习生。", sources.jamesOfficial),
      fact("人才流向", "第一方学生页记录博士与团队成员进入 Meta、Google DeepMind、AWS、ByteDance、Huawei 与创业。", sources.jamesAdvising),
    ],
    sources: [sources.jamesOfficial, sources.jamesBio, sources.jamesAdvising, sources.hkustGraduates],
  }),
  person({
    id: "yufei-tao-cuhk-p0-2026", name: "Yufei Tao", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Database Theory · Algorithms · Learning Theory", tags: ["数据库理论", "算法", "学习理论", "大规模数据"], stage: "senior", x: 1240, y: 120,
    portraitFile: "yufei-tao.jpg", portraitSource: sources.yufeiHome,
    summary: "CUHK 数据库与算法教授，强调可部署且有理论保证的“大规模数据小算法”；博士师承 Dimitris Papadias，并持续培养数据库、几何与学习理论人才。",
    facts: [
      fact("当前任职", "CUHK 计算机科学与工程系教授。", sources.yufeiBio),
      fact("教育与学术训练", "1999 年华南理工大学计算机学士；2002 年 HKUST 计算机博士，导师 Dimitris Papadias。", sources.yufeiBio),
      fact("任职轨迹", "曾任 CityU 助理教授、CMU Visiting Scientist、CUHK 教授及 UQ 教授。", sources.yufeiBio),
      fact("研究主线", "面向大规模数据问题设计易实现且具有严格理论保证的算法，横跨数据库、数据结构与学习理论。", sources.yufeiHome),
      fact("荣誉", "ACM Fellow、IEEE Fellow，并获 SIGMOD、PODS 与 ICDT 多项论文奖。", sources.yufeiAwards),
    ],
    sources: [sources.yufeiHome, sources.yufeiBio, sources.yufeiAwards, sources.hkustGraduates],
  }),
  person({
    id: "david-lo-smu-p0-2026", name: "David Lo", role: "Vice Provost (Research) · OUB Chair Professor", institution: "SMU", region: "Singapore",
    area: "AI for Software Engineering · Software Analytics · Cybersecurity", tags: ["AI4SE", "软件工程", "代码智能", "网络安全"], stage: "senior", x: 1400, y: 120,
    portraitFile: "david-lo.jpg", portraitSource: sources.davidOfficial,
    summary: "SMU AI for Software Engineering 领军教授兼研究副校长，把代码智能、软件分析和网络安全组织到 RISE 中心；公开学生名单与产业合作便于继续追踪人才流动。",
    facts: [
      fact("当前任职", "SMU Vice Provost (Research)、OUB Chair Professor of Computer Science，并任 RISE 联合主任。", sources.davidOfficial),
      fact("教育与学术训练", "2004 年 NTU 工学学士；2008 年 NUS 博士。", sources.davidCv),
      fact("研究主线", "人工智能与数据科学、机器学习、软件工程、网络安全及软件/AI 系统安全。", sources.davidOfficial),
      fact("产业经历", "2014 年在 Microsoft Research 任 Visiting Researcher。", sources.davidCv),
      fact("研究组织", "与 Lingxiao Jiang、Jun Sun 共同领导 RISE，中心聚焦软件工程、AI 与网络安全交叉。", sources.riseCenter),
    ],
    sources: [sources.davidOfficial, sources.davidCv, sources.riseCenter],
  }),
  person({
    id: "lingxiao-jiang-smu-p0-2026", name: "Lingxiao Jiang", role: "Professor · RISE Director", institution: "SMU", region: "Singapore",
    area: "Software Engineering · AI Systems · Software Security", tags: ["软件工程", "AI 系统", "软件安全", "数据挖掘"], stage: "senior", x: 1560, y: 120,
    portraitFile: "lingxiao-jiang.jpg", portraitSource: sources.lingxiaoOfficial,
    summary: "SMU 软件智能教授与 RISE 主任，研究软件工程、AI 系统可信性和数据挖掘；中心网络连接 David Lo、Jun Sun 与三十余名教师和研究人员。",
    facts: [
      fact("当前任职", "SMU 计算机科学教授、Centre for Research for Intelligent Software Engineering 主任。", sources.lingxiaoOfficial),
      fact("教育与学术训练", "2009 年获 University of California, Davis 博士。", sources.lingxiaoOfficial),
      fact("研究主线", "软件工程、数据管理与挖掘、网络安全，以及软件/AI 系统可信性。", sources.lingxiaoOfficial),
      fact("人才培养", "官方个人页逐人列出其 Research Advisor/Co-Research Advisor 学生。", sources.lingxiaoOfficial),
      fact("研究组织", "与 David Lo、Jun Sun 共同组成 RISE 主任团队。", sources.riseCenter),
    ],
    sources: [sources.lingxiaoOfficial, sources.riseCenter],
  }),
  person({
    id: "jun-sun-smu-p0-2026", name: "Jun Sun", role: "Professor · RISE Co-Director", institution: "SMU", region: "Singapore",
    area: "Formal Methods · AI Security · Program Analysis", tags: ["形式化方法", "AI 安全", "程序分析", "软件工程"], stage: "senior", x: 1720, y: 120,
    portraitFile: "jun-sun.jpg", portraitSource: sources.sunOfficial,
    summary: "SMU 形式化方法与 AI 安全教授，兼任 RISE 联合主任和研究集群主任；学生研究已覆盖视觉模型与 LLM 的后门、越狱和提示注入防御。",
    facts: [
      fact("当前任职", "SMU 计算机科学教授、RISE 联合主任，并任 Information Systems & Technology Cluster 主任。", sources.sunOfficial),
      fact("教育与学术训练", "2006 年获 National University of Singapore 博士。", sources.sunOfficial),
      fact("研究主线", "形式化方法、软件工程、程序分析、网络安全及 AI 系统安全。", sources.sunOfficial),
      fact("人才培养", "官方个人页列出多名 Research Advisor/Co-Research Advisor 学生。", sources.sunOfficial),
      fact("LLM 安全连接", "SMU 博士答辩页明确其指导 Nay Myat Min 研究模型后门、越狱和提示注入，并记录 Huawei Singapore 实习。", sources.sunStudent),
    ],
    sources: [sources.sunOfficial, sources.riseCenter, sources.sunStudent],
  }),
];

export const candidatePriorityP0AsiaBatch4Relationships2026: Relationship[] = [
  {
    id: "candidate-p0-asia-b4-dimitris-yufei-tao", from: "dimitris-papadias-hkust-p0-2026", to: "yufei-tao-cuhk-p0-2026",
    type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Yufei Tao 的第一方履历与 HKUST 官方博士校友页均明确其 2002 年博士由 Dimitris Papadias 指导。",
    source: sources.yufeiBio, verified: true, evidenceObject: "HKUST Computer Science PhD", endYear: 2002,
  },
  {
    id: "candidate-p0-asia-b4-wilfred-james-cheng", from: "wilfred-ng-hkust-p0-2026", to: "james-cheng-cuhk-p0-2026",
    type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "HKUST 官方 Selected PhD Graduates 将 James Sheung-Chak Cheng 列为 2008 年博士，并明确 supervised by Wilfred Siu-Hung Ng。",
    source: sources.hkustGraduates, verified: true, evidenceObject: "HKUST Computer Science PhD", endYear: 2008,
  },
  {
    id: "candidate-p0-asia-b4-david-lingxiao-rise", from: "david-lo-smu-p0-2026", to: "lingxiao-jiang-smu-p0-2026",
    type: "collaboration", subtype: "joint_project", label: "RISE 中心共同领导", evidence: "SMU RISE 官方页面将 David Lo 与 Lingxiao Jiang 列入 Center Director/Co-Directors。",
    source: sources.riseCenter, verified: true, evidenceObject: "SMU RISE leadership", recentYear: 2026,
  },
  {
    id: "candidate-p0-asia-b4-david-jun-sun-rise", from: "david-lo-smu-p0-2026", to: "jun-sun-smu-p0-2026",
    type: "collaboration", subtype: "joint_project", label: "RISE 中心共同领导", evidence: "SMU RISE 官方页面将 David Lo 与 Jun Sun 列入 Center Director/Co-Directors。",
    source: sources.riseCenter, verified: true, evidenceObject: "SMU RISE leadership", recentYear: 2026,
  },
  {
    id: "candidate-p0-asia-b4-lingxiao-jun-sun-rise", from: "lingxiao-jiang-smu-p0-2026", to: "jun-sun-smu-p0-2026",
    type: "collaboration", subtype: "joint_project", label: "RISE 中心共同领导", evidence: "SMU RISE 官方页面同时列 Lingxiao Jiang 与 Jun Sun 为中心领导团队成员。",
    source: sources.riseCenter, verified: true, evidenceObject: "SMU RISE leadership", recentYear: 2026,
  },
];

export const candidatePriorityP0AsiaBatch4GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-asia-b4-ke-bingnan-chen", teacherId: "ke-yi-hkust-p0-2026", name: "Bingnan Chen", role: "PhD student", focus: "Database systems and algorithms", source: sources.keHome },
  { id: "candidate-p0-asia-b4-qiong-kai-cheng", teacherId: "qiong-luo-hkust-p0-2026", name: "Kai Cheng", role: "PhD student", focus: "Big-data systems", source: sources.qiongHome },
  { id: "candidate-p0-asia-b4-xiaofang-shimin-di", teacherId: "xiaofang-zhou-hkust-p0-2026", name: "Shimin Di", role: "Research Assistant Professor · DSF Lab", focus: "Data science foundations", source: sources.xiaofangTeam },
  { id: "candidate-p0-asia-b4-yufei-sangsiri", teacherId: "yufei-tao-cuhk-p0-2026", name: "Sangsiri Nawapon", role: "PhD student", focus: "Algorithms and learning theory", source: sources.yufeiHome },
  { id: "candidate-p0-asia-b4-david-nguyen", teacherId: "david-lo-smu-p0-2026", name: "NGUYEN Huu Hung", role: "PhD student", focus: "Software engineering and vulnerability analysis", source: sources.davidOfficial },
  { id: "candidate-p0-asia-b4-lingxiao-cai", teacherId: "lingxiao-jiang-smu-p0-2026", name: "CAI Xuemeng", role: "Graduate student", focus: "Software engineering and AI systems", source: sources.lingxiaoOfficial },
  { id: "candidate-p0-asia-b4-sun-nay", teacherId: "jun-sun-smu-p0-2026", name: "Nay Myat Min", role: "PhD candidate", focus: "AI and LLM security", source: sources.sunStudent },
];

const placement = (
  id: string,
  student: string,
  teacherId: string,
  company: string,
  role: string,
  sourceValue: Source,
  degree: StudentPlacement["degree"] = "PhD",
  sector: StudentPlacement["sector"] = "industry",
): StudentPlacement => ({ id, student, teacherId, company, role, kind: "current", degree, sector, source: sourceValue, verifiedAt: checkedAt });

export const candidatePriorityP0AsiaBatch4Placements2026: StudentPlacement[] = [
  placement("candidate-p0-asia-b4-ke-dajun-sun", "Dajun Sun", "ke-yi-hkust-p0-2026", "Huawei Hong Kong Research Center", "Researcher", sources.keHome),
  placement("candidate-p0-asia-b4-ke-wei-dong", "Wei Dong", "ke-yi-hkust-p0-2026", "Nanyang Technological University", "Assistant Professor", sources.keHome, "PhD", "academia"),
  placement("candidate-p0-asia-b4-qiong-yulin-che", "Yulin Che", "qiong-luo-hkust-p0-2026", "Huawei Technologies", "Research Engineer", sources.hkustGraduates),
  placement("candidate-p0-asia-b4-qiong-shixuan-sun", "Shixuan Sun", "qiong-luo-hkust-p0-2026", "Shanghai Jiao Tong University", "Associate Professor", sources.hkustGraduates, "PhD", "academia"),
  placement("candidate-p0-asia-b4-raymond-victor-wei", "Victor Junqiu Wei", "raymond-wong-hkust-p0-2026", "Macau University of Science and Technology", "Assistant Professor", sources.hkustGraduates, "PhD", "academia"),
  placement("candidate-p0-asia-b4-xiaofang-yue-cui", "Yue Cui", "xiaofang-zhou-hkust-p0-2026", "Alibaba Group", "Senior Algorithm Engineer", sources.hkustGraduates),
  placement("candidate-p0-asia-b4-xiaofang-renjie-pi", "Renjie Pi", "xiaofang-zhou-hkust-p0-2026", "NVIDIA", "Research Scientist", sources.hkustGraduates),
  placement("candidate-p0-asia-b4-xiaofang-yao-tian", "Yao Tian", "xiaofang-zhou-hkust-p0-2026", "ByteDance", "Research Scientist", sources.hkustGraduates),
  placement("candidate-p0-asia-b4-james-yidi-wu", "Yidi Wu", "james-cheng-cuhk-p0-2026", "Meta · PyTorch", "Research/engineering role", sources.jamesAdvising),
  placement("candidate-p0-asia-b4-james-fan-yang", "Fan Yang", "james-cheng-cuhk-p0-2026", "Google DeepMind", "Research role", sources.jamesAdvising),
  placement("candidate-p0-asia-b4-james-hongzhi-chen", "Hongzhi Chen", "james-cheng-cuhk-p0-2026", "ByteDance", "Research/engineering role", sources.jamesAdvising),
];

export type CandidatePriorityP0AsiaBatch4RosterPromotion2026 = {
  unitUrl: string;
  rosterName: string;
  atlasPersonId: string;
};

export const candidatePriorityP0AsiaBatch4RosterPromotions2026: CandidatePriorityP0AsiaBatch4RosterPromotion2026[] = [
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Dimitris PAPADIAS", atlasPersonId: "dimitris-papadias-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Ke YI", atlasPersonId: "ke-yi-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Qiong LUO", atlasPersonId: "qiong-luo-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Raymond Chi-Wing WONG", atlasPersonId: "raymond-wong-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Wilfred Siu-Hung NG", atlasPersonId: "wilfred-ng-hkust-p0-2026" },
  { unitUrl: "https://cse.hkust.edu.hk/admin/people/faculty", rosterName: "Xiaofang ZHOU", atlasPersonId: "xiaofang-zhou-hkust-p0-2026" },
  { unitUrl: "https://www.cse.cuhk.edu.hk/people/faculty/", rosterName: "James Cheng", atlasPersonId: "james-cheng-cuhk-p0-2026" },
  { unitUrl: "https://www.cse.cuhk.edu.hk/people/faculty/", rosterName: "Yufei Tao", atlasPersonId: "yufei-tao-cuhk-p0-2026" },
  { unitUrl: "https://computing.smu.edu.sg/faculty", rosterName: "David LO", atlasPersonId: "david-lo-smu-p0-2026" },
  { unitUrl: "https://computing.smu.edu.sg/faculty", rosterName: "JIANG Lingxiao", atlasPersonId: "lingxiao-jiang-smu-p0-2026" },
  { unitUrl: "https://computing.smu.edu.sg/faculty", rosterName: "SUN Jun", atlasPersonId: "jun-sun-smu-p0-2026" },
];

export const People = candidatePriorityP0AsiaBatch4People2026;
export const Relationships = candidatePriorityP0AsiaBatch4Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch4Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch4GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch4RosterPromotions2026;

export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
