import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";
const src = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, source: Source) => ({ label, value, source });

const sources = {
  hkustRoster: src("HKUST CSE · Faculty roster", "https://cse.hkust.edu.hk/admin/people/faculty", "official", "现任教师名录"),
  chaojian: src("HKUST CSE · Chaojian Li", "https://cse.hkust.edu.hk/admin/people/faculty/profile/chaojian", "official", "现职、教育、博士导师、研究方向与官方头像"),
  chaojianFaculty: src("HKUST Faculty Profiles · Chaojian Li", "https://facultyprofiles.hkust.edu.hk/profiles.php?profile=chaojian-li-chaojian", "official", "现任博士生、教学与研究项目"),
  chaojianThesis: src("Georgia Tech repository · Chaojian Li dissertation", "https://repository.gatech.edu/entities/publication/33408ac9-3c13-4bc9-890c-2c64b9cbb9ad", "thesis", "博士论文题目、学位年份与导师 Yingyan Lin"),
  thuRoster: src("清华大学计算机系 · 在职教师名录", "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", "official", "现任教师名录"),
  haixin: src("清华大学计算机系 · 段海新", "https://www.cs.tsinghua.edu.cn/csen/info/1154/3926.htm", "official", "现职、教育、研究方向与产业影响"),
  haixinHome: src("段海新 · 清华大学个人主页", "https://duanhaixin.cn/", "profile", "现职、教育经历、研究方向、团队与官方头像"),
  liXiang: src("李想 · 个人主页", "https://lixiang521.com/zh/", "profile", "清华博士阶段由李琦和段海新共同指导"),
  kun: src("清华大学计算机系 · 徐昆", "https://www.cs.tsinghua.edu.cn/info/1117/3540.htm", "official", "现职、教育、研究方向与官方头像"),
  kunAdvisor: src("清华大学可视媒体研究中心 · 徐昆博士培养记录", "https://cg.cs.tsinghua.edu.cn/vm/news_main.htm", "official", "徐昆博士阶段导师为胡事民"),
  kunStudent: src("清华大学学位论文服务系统 · 杜正君", "https://newetds.lib.tsinghua.edu.cn/qh/paper/summary?dbCode=ETDQH&sysId=284951", "thesis", "杜正君博士论文导师为徐昆"),
  ju: src("清华大学计算机系 · 任炬", "https://www.cs.tsinghua.edu.cn/info/1117/4596.htm", "official", "现职、教育、研究方向与官方头像"),
  juHome: src("Ju Ren · Personal homepage", "https://juren1987.github.io/", "profile", "现职、研究成果、招生信息及与张尧学合作出版教材"),
  zhidong: src("清华大学计算机系 · 邓志东", "https://www.cs.tsinghua.edu.cn/csen/info/1312/4386.htm", "official", "现职、教育、研究方向、学术服务与官方头像"),
  zhidongStudent: src("清华大学计算机系托管履历 · 宋丹丹", "https://www.cs.tsinghua.edu.cn/__local/A/EC/94/792DA8B2D3ED80A8AE0750C9A79_0D46F63D_2A06F.pdf?e=.pdf", "cv", "宋丹丹清华博士阶段导师为邓志东"),
};

type Entry = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Person["institution"];
  region: NonNullable<Person["region"]>;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  portraitFile: string;
  portraitUrl: string;
  portraitSource: Source;
  sources: Source[];
  facts: NonNullable<Person["facts"]>;
  x: number;
};

const person = (entry: Entry): Person => ({
  id: entry.id,
  name: entry.name,
  chinese: entry.chinese,
  role: entry.role,
  institution: entry.institution,
  region: entry.region,
  area: entry.area,
  tags: entry.tags,
  summary: entry.summary,
  category: "core",
  stage: entry.stage,
  primary: true,
  status: "current independent PI · strict P0 verified",
  x: entry.x,
  y: 1160,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  sources: entry.sources,
  portrait: {
    src: `portraits/candidate-p0-next-round-2026/${entry.portraitFile}`,
    alt: `${entry.name} 官方头像`,
    source: { ...entry.portraitSource, label: `${entry.portraitSource.label} · 人物头像`, url: entry.portraitUrl, supports: "官方院系或本人主页单人头像；已人工检查并转制为 512×512" },
  },
  facts: entry.facts,
});

export const candidatePriorityP0NextRoundPeople2026: Person[] = [
  person({
    id: "chaojian-li-hkust-p0-next", name: "Chaojian Li", chinese: "李朝鉴", role: "Assistant Professor", institution: "HKUST", region: "Hong Kong",
    area: "AI Systems · Algorithm-Hardware Co-design · 3D Intelligence", tags: ["AI Systems", "LLM Systems", "3D Intelligence", "Algorithm-Hardware Co-design"],
    summary: "HKUST AI 系统青年 PI，研究算法、硬件和基础设施协同设计，重点覆盖大模型与 3D 智能。", stage: "emerging",
    portraitFile: "chaojian.jpg", portraitUrl: "https://cse.hkust.edu.hk/admin/people/faculty/photos/chaojian.jpg", portraitSource: sources.chaojian,
    sources: [sources.hkustRoster, sources.chaojian, sources.chaojianFaculty, sources.chaojianThesis], x: 120,
    facts: [
      fact("当前任职", "香港科技大学计算机科学与工程系助理教授。", sources.chaojian),
      fact("教育与学术训练", "2019 年获清华大学工学学士，2025 年获 Georgia Tech 计算机博士；校方论文库与 HKUST 简介均明确博士导师为 Yingyan (Celine) Lin。", sources.chaojianThesis),
      fact("研究主线", "研究高效、可扩展的 AI 系统，强调算法—硬件—基础设施协同设计，并聚焦大模型和 3D 智能。", sources.chaojian),
      fact("当前学生", "HKUST Faculty Profiles 列出 Zhengze Xiao、Chonghao Zhong、Xinyu Geng 三位当前博士生。", sources.chaojianFaculty),
    ],
  }),
  person({
    id: "haixin-duan-thu-p0-next", name: "段海新", role: "教授 · 博士生导师 · NISL 主任", institution: "THU", region: "Mainland China",
    area: "Network Security · AI System Security · Network Measurement", tags: ["网络安全", "AI 系统安全", "网络测量", "协议安全"],
    summary: "清华网络与信息安全实验室负责人，研究协议安全、网络测量、互联网黑灰产与 AI 系统安全。", stage: "senior",
    portraitFile: "haixin-duan.jpg", portraitUrl: "https://duanhaixin.cn/", portraitSource: sources.haixinHome,
    sources: [sources.thuRoster, sources.haixin, sources.haixinHome, sources.liXiang], x: 320,
    facts: [
      fact("当前任职", "清华大学网络科学与网络空间研究院教授、博士生导师，网络与信息安全实验室主任。", sources.haixinHome),
      fact("教育与学术训练", "1996—2000 年在清华大学计算机科学与技术系完成工学博士训练。", sources.haixinHome),
      fact("研究主线", "研究网络协议安全、网络测量、入侵检测、互联网黑灰产检测与 AI 系统安全。", sources.haixinHome),
      fact("产业影响", "清华官方简介记录其团队成果促使 Google、Microsoft、Akamai、Baidu 等企业改进安全产品或服务。", sources.haixin),
      fact("学生体系", "李想本人主页明确记录其 2019—2024 年清华博士阶段由李琦与段海新共同指导。", sources.liXiang),
    ],
  }),
  person({
    id: "kun-xu-thu-p0-next", name: "徐昆", role: "副教授 · 博士生导师", institution: "THU", region: "Mainland China",
    area: "Computer Graphics · Differentiable Rendering · Ray Tracing", tags: ["计算机图形学", "可微渲染", "光线追踪", "视觉计算"],
    summary: "清华计算机图形学 PI，研究真实感渲染、可微渲染与高性能光线追踪。", stage: "senior",
    portraitFile: "kunxu.jpg", portraitUrl: "https://www.cs.tsinghua.edu.cn/__local/6/EF/0F/3B1F046D90471E8A98C78DB5D0B_3F45F231_1BDBB.jpg", portraitSource: sources.kun,
    sources: [sources.thuRoster, sources.kun, sources.kunAdvisor, sources.kunStudent], x: 520,
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系副教授、博士生导师。", sources.kun),
      fact("教育与学术训练", "2005 年获清华大学计算机学士，2009 年获清华大学计算机博士。", sources.kun),
      fact("博士师承", "清华可视媒体研究中心官方记录明确写明徐昆博士阶段导师为胡事民。", sources.kunAdvisor),
      fact("研究主线", "研究计算机图形学、真实感渲染、可微渲染、蒙特卡洛光线追踪及高性能渲染系统。", sources.kun),
      fact("学生体系", "清华学位论文系统明确记录杜正君 2023 年博士论文由徐昆指导。", sources.kunStudent),
    ],
  }),
  person({
    id: "ju-ren-thu-p0-next", name: "任炬", role: "长聘副教授 · 博士生导师", institution: "THU", region: "Mainland China",
    area: "Edge AI · On-device LLM · Privacy Computing", tags: ["端侧大模型", "边缘智能", "隐私计算", "具身智能"],
    summary: "清华端智能青年 PI，研究端侧大模型推理、端云协同、隐私计算与端侧具身智能。", stage: "emerging",
    portraitFile: "juren.jpg", portraitUrl: "https://www.cs.tsinghua.edu.cn/__local/B/9D/8B/36774D6B231037EDBFDE226CFB9_6A845C1F_1B931.jpg", portraitSource: sources.ju,
    sources: [sources.thuRoster, sources.ju, sources.juHome], x: 720,
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系长聘副教授、博士生导师。", sources.ju),
      fact("教育与学术训练", "2009、2012、2016 年在中南大学计算机科学与技术专业分别取得学士、硕士和博士学位。", sources.ju),
      fact("研究主线", "研究端智能、边缘智能、端云协同、隐私计算、大模型安全与端侧具身智能。", sources.ju),
      fact("职业履历", "加入清华前曾任中南大学计算机学院教授。", sources.juHome),
      fact("学术合作", "本人主页记录其与张尧学、陆俊共同编写《计算机操作系统教程》第五版。", sources.juHome),
    ],
  }),
  person({
    id: "zhidong-deng-thu-p0-next", name: "邓志东", role: "教授", institution: "THU", region: "Mainland China",
    area: "Artificial Intelligence · Autonomous Driving · Robotics", tags: ["人工智能", "自动驾驶", "机器人", "强化学习", "视觉语言模型"],
    summary: "清华人工智能资深教授，研究深度学习、强化学习、自动驾驶与机器人，并领导智能驾驶课题组。", stage: "senior",
    portraitFile: "zhidong.jpg", portraitUrl: "https://www.cs.tsinghua.edu.cn/__local/B/27/66/D1FABE84E4A77C758C7EEBF1443_9C628343_1BDD1.jpg", portraitSource: sources.zhidong,
    sources: [sources.thuRoster, sources.zhidong, sources.zhidongStudent], x: 920,
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授，1992 年加入清华、2000 年起任教授。", sources.zhidong),
      fact("教育与学术训练", "1986 年获四川大学计算机与自动化学士，1991 年获哈尔滨工业大学计算机与自动化博士。", sources.zhidong),
      fact("研究主线", "研究人工智能、计算神经科学、自动驾驶和先进机器人，近年覆盖视觉 Transformer、知识推理与视觉语言模型。", sources.zhidong),
      fact("学术服务", "清华官方简介记录其曾任中国自动化学会智能自动化专委会主任，并担任中国人工智能产业创新联盟专家委主任。", sources.zhidong),
      fact("学生体系", "清华计算机系托管履历明确记录宋丹丹 2004—2009 年博士阶段导师为邓志东。", sources.zhidongStudent),
    ],
  }),
];

const support = (id: string, name: string, institution: Person["institution"], region: NonNullable<Person["region"]>, role: string, source: Source): Person => ({
  id, name, role, institution, region, area: "Verified relationship endpoint", tags: ["关系端点"],
  summary: "由一手来源确认的关系端点。", category: "adjacent", stage: "adjacent", primary: false, sources: [source], x: 0, y: 0,
});

export const candidatePriorityP0NextRoundSupportingPeople2026: Person[] = [
  support("yingyan-lin-p0-next-support", "Yingyan (Celine) Lin", "Georgia Tech", "United States", "Professor · PhD adviser", sources.chaojianThesis),
  support("li-xiang-haixin-p0-next-support", "李想", "External", "Mainland China", "Former PhD student", sources.liXiang),
  support("du-zhengjun-kunxu-p0-next-support", "杜正君", "External", "Mainland China", "Former PhD student", sources.kunStudent),
  support("yaoxue-zhang-juren-p0-next-support", "张尧学", "External", "Mainland China", "Professor · collaborator", sources.juHome),
  support("dandan-song-zhidong-p0-next-support", "宋丹丹", "BIT", "Mainland China", "Former PhD student", sources.zhidongStudent),
];

const rel = (id: string, from: string, to: string, type: Relationship["type"], subtype: NonNullable<Relationship["subtype"]>, label: string, evidence: string, source: Source): Relationship => ({ id, from, to, type, subtype, label, evidence, source, verified: true });

export const candidatePriorityP0NextRoundRelationships2026: Relationship[] = [
  rel("p0-next-lin-chaojian-phd", "yingyan-lin-p0-next-support", "chaojian-li-hkust-p0-next", "lineage", "phd_adviser", "博士导师", "Georgia Tech 官方论文库将 Yingyan (Celine) Lin 列为 Chaojian Li 2025 年博士论文导师。", sources.chaojianThesis),
  rel("p0-next-duan-lixiang-phd", "haixin-duan-thu-p0-next", "li-xiang-haixin-p0-next-support", "lineage", "co_adviser", "博士共同导师", "李想本人主页明确写明其清华博士阶段由李琦与段海新共同指导。", sources.liXiang),
  rel("p0-next-hu-kunxu-phd", "hu-shimin-thu", "kun-xu-thu-p0-next", "lineage", "phd_adviser", "博士导师", "清华可视媒体研究中心官方记录明确写明徐昆博士阶段导师为胡事民。", sources.kunAdvisor),
  rel("p0-next-kunxu-du-phd", "kun-xu-thu-p0-next", "du-zhengjun-kunxu-p0-next-support", "lineage", "phd_adviser", "博士导师", "清华学位论文服务系统明确列徐昆为杜正君博士论文导师。", sources.kunStudent),
  rel("p0-next-juren-yaoxue-publication", "ju-ren-thu-p0-next", "yaoxue-zhang-juren-p0-next-support", "collaboration", "publication", "教材合作", "任炬本人主页列出其与张尧学、陆俊共同编写清华大学出版社《计算机操作系统教程》第五版。", sources.juHome),
  rel("p0-next-zhidong-dandan-phd", "zhidong-deng-thu-p0-next", "dandan-song-zhidong-p0-next-support", "lineage", "phd_adviser", "博士导师", "清华计算机系托管的宋丹丹履历明确写明其清华博士导师为邓志东。", sources.zhidongStudent),
];

export const candidatePriorityP0NextRoundGroupMembers2026: GroupMember[] = [
  ...["Zhengze Xiao", "Chonghao Zhong", "Xinyu Geng"].map((name, index) => ({ id: `p0-next-chaojian-rpg-${index + 1}`, teacherId: "chaojian-li-hkust-p0-next", name, role: "Current PhD student", focus: "AI systems", source: sources.chaojianFaculty })),
  { id: "p0-next-haixin-lixiang", teacherId: "haixin-duan-thu-p0-next", name: "李想", role: "Former PhD student · co-advised", focus: "Network and protocol security", source: sources.liXiang },
  { id: "p0-next-kunxu-duzhengjun", teacherId: "kun-xu-thu-p0-next", name: "杜正君", role: "Former PhD student", focus: "Image and video editing", source: sources.kunStudent },
  { id: "p0-next-zhidong-dandan", teacherId: "zhidong-deng-thu-p0-next", name: "宋丹丹", role: "Former PhD student", focus: "Machine learning and bioinformatics", source: sources.zhidongStudent },
];

export const candidatePriorityP0NextRoundRosterPromotions2026 = [
  { unitUrl: sources.hkustRoster.url, rosterName: "Chaojian LI", atlasPersonId: "chaojian-li-hkust-p0-next" },
  { unitUrl: sources.thuRoster.url, rosterName: "Haixin DUAN", atlasPersonId: "haixin-duan-thu-p0-next" },
  { unitUrl: sources.thuRoster.url, rosterName: "Kun XU", atlasPersonId: "kun-xu-thu-p0-next" },
  { unitUrl: sources.thuRoster.url, rosterName: "Ju Ren", atlasPersonId: "ju-ren-thu-p0-next" },
  { unitUrl: sources.thuRoster.url, rosterName: "Zhidong DENG", atlasPersonId: "zhidong-deng-thu-p0-next" },
] as const;
