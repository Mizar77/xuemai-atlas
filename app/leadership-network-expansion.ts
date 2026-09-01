import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  mohanProfile: source("NUS Computing · Mohan Kankanhalli", "https://www.comp.nus.edu.sg/~mohan/", "official", "Current leadership, research areas, current trainees and alumni roster"),
  mohanGraduate: source("NUS Graduate School · Mohan Kankanhalli", "https://nusgs.nus.edu.sg/thesis-advisors/dcsmsk", "official", "Current PhD students, PhD alumni count, education and NUS appointments"),
  mohanCv: source("NUS-hosted short CV · Mohan Kankanhalli", "https://www.comp.nus.edu.sg/~mohan/Resume_Short.pdf", "cv", "Leadership timeline and aggregate advising record"),
  mohanAlumni: source("Mohan Kankanhalli · official alumni roster", "https://www.comp.nus.edu.sg/~mohan/alumni.html", "official", "Named doctoral and postdoctoral alumni, theses, years and co-advisers"),
  pradeepAlbany: source("University at Albany · Pradeep K. Atrey", "https://www.albany.edu/computer-science/faculty/pradeep-k-atrey", "official", "Current appointment, NUS PhD, research and leadership roles"),
  pradeepHome: source("Pradeep Atrey · academic homepage", "https://www.cs.albany.edu/~patrey/", "profile", "Current UAlbany role, ALPS affiliation, research and academic activities"),
  yogeshUcf: source("UCF CRCV · Yogesh S. Rawat", "https://www.crcv.ucf.edu/person/rawat/", "official", "Current appointment, research programme, group and recruitment"),
  yogeshDirectory: source("UCF Computer Science faculty directory", "https://www.cs.ucf.edu/faculty-directory/", "official", "Current associate-professor appointment and identity"),
  radaProfile: source("University of Michigan CSE · Rada Mihalcea", "https://cse.engin.umich.edu/people/mentor/mihalcea", "official", "Current mentoring practice and PhD training model"),
  radaStudents: source("Rada Mihalcea · official students page", "https://web.eecs.umich.edu/~mihalcea/students.html", "profile", "Named postdocs, students and doctoral alumni"),
  radaAcademicAlumni: source("Michigan CSE · alumni in academia", "https://cse.engin.umich.edu/people/alumni-in-academia/", "official", "Faculty alumni and named doctoral advisers"),
  radaChair: source("Michigan CSE · Mihalcea collegiate professorship", "https://cse.engin.umich.edu/stories/rada-mihalcea-named-janice-m-jenkins-collegiate-professor-of-cse", "official", "Research programme and doctoral mentoring outcomes"),
  radaCurrentStudent: source("Michigan AI Lab · Joan Nwatu", "https://ai.engin.umich.edu/stories/joan-nwatu-awarded-towner-prize-for-distinguished-academic-achievement", "official", "Current PhD advising relationship and research focus"),
  veronicaTxst: source("Texas State · Veronica Perez-Rosas", "https://faculty.txst.edu/profile/2536503", "official", "Current assistant professorship, education and research programme"),
  danUtd: source("UT Dallas Center for Machine Learning · Dan Moldovan", "https://machine-learning.utdallas.edu/affiliated-ut-dallas-faculty/", "official", "UT Dallas professorship and machine-learning affiliation"),
  radaBiography: source("Romanian Academy · Rada Mihalcea biography", "https://acad.ro/sectii/sectia14_informatica/sti/doc2020/d0528-RomanianCivilization.pdf", "official", "SMU doctoral thesis and Dan Moldovan as scientific adviser"),
  bernhardMpi: source("Max Planck Society · Bernhard Schölkopf", "https://www.mpg.de/390909/intelligent-systems-tuebingen-schoelkopf", "official", "Current MPI leadership, education, career and awards"),
  bernhardEllis: source("ELLIS Institute Tübingen · Bernhard Schölkopf", "https://institute-tue.ellis.eu/en/people/bernhard-scholkopf", "official", "Scientific-director role and empirical-inference research programme"),
  vapnikLineage: source("MPI-IS · Schölkopf Frontiers of Knowledge profile", "https://imprs-is.mpg.de/news/imprs-is-faculty-bernhard-scholkopf-receives-frontiers-of-knowledge-award", "official", "Vladimir Vapnik as Schölkopf's doctoral adviser"),
  zhijingEllis: source("ELLIS · Zhijing Jin PhD profile", "https://ellis.eu/news/being-a-phd-student-in-europe-is-one-of-the-best-experiences-of-my-life", "official", "Bernhard Schölkopf as primary PhD adviser"),
  zhijingToronto: source("University of Toronto · Zhijing Jin", "https://www.artsci.utoronto.ca/node/7755", "official", "Current assistant professorship, CIFAR AI Chair and research programme"),
  zhijingSri: source("Schwartz Reisman Institute · Zhijing Jin", "https://srinstitute.utoronto.ca/events-archive/seminar-2026-zhijing-jin", "official", "Current Toronto/MPI affiliations, research topics and public portrait"),
  bernhardGroup: source("MPI-IS Empirical Inference · research overview", "https://is.mpg.de/ei/de/projects/causal-representation-learning", "official", "Named department members and research roles"),
  cewuSjtu: source("上海交通大学 · 卢策吾", "https://cs.sjtu.edu.cn/jzhspjs/1359.html", "official", "Current appointment, research programme and academic recognition"),
  cewuAdviser: source("上海交通大学新闻 · 让机器人更聪明", "https://news.sjtu.edu.cn/mtjj/20240122/193304.html", "official", "Jiaya Jia is explicitly named as Cewu Lu's doctoral adviser"),
  zuxuanFudan: source("复旦大学 IIPL · 吴祖煊", "https://iipl.fudan.edu.cn/_s627/6f/e2/c45863a684002/page.psp", "official", "Current appointment, research programme and education"),
  zuxuanUmd: source("University of Maryland CS · Zuxuan Wu named Snap Fellow", "https://www.cs.umd.edu/article/2017/12/phd-student-zuxuan-wu-named-inaugural-snap-fellow", "official", "Larry Davis as PhD adviser; Yu-Gang Jiang and Xiangyang Xue as master's advisers"),
  xueFudan: source("复旦大学计算与智能创新学院 · 薛向阳", "https://cs.fudan.edu.cn/31/e9/c30604a733673/page.htm", "official", "Current appointment, institute leadership and research programme"),
  larryUmd: source("University of Maryland CS · Larry Davis", "https://www.cs.umd.edu/people/lsdavis", "official", "Professor-emeritus status, education, research areas and appointments"),
  larryLegacy: source("University of Maryland CS · Larry Davis named Distinguished University Professor", "https://www.cs.umd.edu/node/17875", "official", "Azriel Rosenfeld as PhD adviser, leadership history and approximate doctoral-alumni scale"),
  tongNju: source("南京大学计算机学院 · 路通", "https://cs.nju.edu.cn/58/01/c2639a153601/page.htm", "official", "Current leadership, research impact and named doctoral trainees"),
  tongHome: source("Nanjing University · Tong Lu / IMAGINE Lab", "https://cs.nju.edu.cn/lutong/", "profile", "Lab programme, recruitment and current student achievements"),
  tongGuo: source("Guo Chen · academic homepage", "https://cg1177.github.io/", "profile", "Tong Lu and Limin Wang as current PhD advisers"),
  tongZhe: source("Zhe Chen · academic homepage", "https://czczup.github.io/", "profile", "Tong Lu as PhD adviser and current research programme"),
  jooAstar: source("A*STAR Research · Joo-Hwee Lim", "https://research.a-star.edu.sg/researcher/joo-hwee-lim/", "official", "Current unit-head role, education and long-term A*STAR trajectory"),
  jooCfar: source("A*STAR CFAR · affiliated PhD students", "https://www.a-star.edu.sg/cfar/talent/affiliated-phd-students", "official", "Named affiliated PhD student supervised through Joo-Hwee Lim's CFAR programme"),
  tanyaOsu: source("Ohio State Engineering · Tanya Berger-Wolf", "https://engineering.osu.edu/people/berger-wolf.1", "official", "Current institute leadership, appointments and research programme"),
  tanyaCv: source("Tanya Berger-Wolf · public academic CV", "https://www.cs.uic.edu/~tanyabw/personal/cv.pdf", "cv", "PhD adviser, named doctoral alumni, theses and destination snapshots"),
  tanyaCurrentStudent: source("Ohio State Aquatic Ecology Lab · new students", "https://ael.osu.edu/news/welcome-new-students-0", "official", "Braden DeMattei as a current PhD student co-advised by Tanya Berger-Wolf"),
  reingoldIllinois: source("Illinois Grainger Engineering · Edward M. Reingold", "https://grainger.illinois.edu/about/directory/faculty/reingold", "official", "Professor-emeritus status and institutional identity"),
  reingoldLegacy: source("Illinois CS · Edward Reingold alumni award", "https://siebelschool.illinois.edu/about/awards/alumni-awards/alumni-awards-past-recipients/edward-reingold", "official", "Algorithms, data structures, graph drawing, books and academic leadership"),
};

const portrait = (src: string, alt: string, sourceRecord: Source): NonNullable<Person["portrait"]> => ({ src, alt, source: sourceRecord });

export const leadershipNetworkPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "bernhard-schoelkopf-eu": portrait("portraits/leadership-network/bernhard-schoelkopf-eu.jpg", "Bernhard Schölkopf portrait", sources.bernhardEllis),
  "pradeep-atrey-us": portrait("portraits/leadership-network/pradeep-atrey-us.jpg", "Pradeep Atrey portrait", sources.pradeepHome),
  "yogesh-rawat-us": portrait("portraits/leadership-network/yogesh-rawat-us.jpg", "Yogesh Rawat portrait", sources.yogeshDirectory),
  "veronica-perez-rosas-us": portrait("portraits/leadership-network/veronica-perez-rosas-us.jpg", "Veronica Perez-Rosas portrait", sources.veronicaTxst),
  "zhijing-jin-ca": portrait("portraits/leadership-network/zhijing-jin-ca.jpg", "Zhijing Jin portrait", sources.zhijingSri),
};

type NewCurrentPerson = Omit<Person, "x" | "y" | "facts" | "portrait" | "lastVerifiedAt" | "introducedAt"> & {
  education: string;
  network: string;
};

const makeCurrentPerson = (person: NewCurrentPerson, index: number): Person => {
  const { education, network, ...base } = person;
  return {
    ...base,
    x: 180 + (index % 3) * 210,
    y: 190 + Math.floor(index / 3) * 180,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: leadershipNetworkPortraits[base.id],
    facts: [
      { label: "当前任职", value: base.role, source: base.sources[0] },
      { label: "研究主线", value: base.area, source: base.sources[0] },
      { label: "教育与学术训练", value: education, source: base.sources[1] },
      { label: "培养网络中的位置", value: network, source: base.sources.at(-1) },
    ],
  };
};

export const leadershipNetworkPeople: Person[] = [
  makeCurrentPerson({
    id: "pradeep-atrey-us", name: "Pradeep K. Atrey", role: "Associate Professor · Director of Undergraduate Studies", institution: "UAlbany", region: "United States",
    area: "Multimedia Security · Privacy · Disinformation", tags: ["多媒体安全", "隐私", "取证", "Mohan Kankanhalli"], stage: "senior", category: "adjacent", primary: true,
    summary: "University at Albany 副教授、ALPS 联合主任，研究加密域多媒体分析、隐私、取证与富媒体虚假信息。",
    sources: [sources.pradeepAlbany, sources.pradeepHome, sources.mohanAlumni],
    education: "NUS School of Computing 计算机科学博士；Mohan Kankanhalli 的官方校友名录记录其博士论文与培养关系。",
    network: "Mohan Kankanhalli 的 NUS 博士生，随后在加拿大与美国高校任职，形成其多媒体安全方向的学术分支。",
  }, 0),
  makeCurrentPerson({
    id: "yogesh-rawat-us", name: "Yogesh S. Rawat", role: "Associate Professor · Institute of AI / CRCV", institution: "UCF", region: "United States",
    area: "Video Understanding · Multimodal Learning · Robust AI", tags: ["视频理解", "多模态", "基础模型", "Mohan Kankanhalli"], stage: "senior", category: "core", primary: true,
    summary: "UCF CRCV 副教授，研究视频理解、多模态学习、基础模型与鲁棒 AI，并公开招收博士生。",
    sources: [sources.yogeshUcf, sources.yogeshDirectory, sources.mohanAlumni],
    education: "NUS 计算机科学博士（2017）；Mohan Kankanhalli 官方校友页列出其博士论文与毕业年份。",
    network: "Mohan Kankanhalli 的 NUS 博士生，现于 UCF 领导视频与多模态研究组。",
  }, 1),
  makeCurrentPerson({
    id: "veronica-perez-rosas-us", name: "Veronica Perez-Rosas", role: "Assistant Professor · Computer Science", institution: "Texas State", region: "United States",
    area: "NLP · Affective Computing · Multimodal Human Behavior", tags: ["NLP", "情感计算", "多模态", "Rada Mihalcea"], stage: "emerging", category: "core", primary: true,
    summary: "Texas State 计算机系助理教授，研究自然语言处理、情感识别与多模态人类行为建模。",
    sources: [sources.veronicaTxst, sources.radaAcademicAlumni, sources.radaStudents],
    education: "University of North Texas 计算机科学与工程博士（2014）；Michigan CSE 的学术界校友名录明确记录 Rada Mihalcea 为导师。",
    network: "Rada Mihalcea 的博士生，曾任 Michigan Assistant Research Scientist，2024 年进入 Texas State 任教。",
  }, 2),
  makeCurrentPerson({
    id: "zhijing-jin-ca", name: "Zhijing Jin", chinese: "金芷菁", role: "Assistant Professor · CIFAR AI Chair · Vector Faculty", institution: "U of Toronto", region: "Canada",
    area: "Causal NLP · Multi-Agent LLM Safety · Responsible AI", tags: ["因果 NLP", "LLM Agents", "AI Safety", "Bernhard Schölkopf"], stage: "emerging", category: "core", primary: true,
    summary: "多伦多大学助理教授、CIFAR AI Chair，研究因果 NLP、多智能体大模型安全与负责任 AI。",
    sources: [sources.zhijingToronto, sources.zhijingSri, sources.zhijingEllis],
    education: "在 Max Planck / ELLIS 完成博士训练；ELLIS 本人访谈明确称 Bernhard Schölkopf 为 primary adviser。",
    network: "Bernhard Schölkopf 的博士生，将图宾根因果学习主线延伸到 Toronto、Vector 与多智能体 LLM 安全。",
  }, 3),
  {
    id: "dan-moldovan-historical", name: "Dan I. Moldovan", role: "Professor · UT Dallas", institution: "External", actualInstitution: "University of Texas at Dallas", region: "United States",
    area: "Natural Language Processing · Question Answering · Knowledge", tags: ["NLP", "问答", "WordNet", "Rada Mihalcea 导师"], stage: "historical", category: "historical", primary: false,
    summary: "问答系统、词义与知识型 NLP 资深学者，是 Rada Mihalcea 的博士导师。",
    sources: [sources.danUtd, sources.radaBiography], x: 90, y: 70, lastVerifiedAt: checkedAt,
    facts: [
      { label: "学术角色", value: "UT Dallas 计算机科学教授、机器学习中心 affiliated faculty。", source: sources.danUtd },
      { label: "研究主线", value: "自然语言处理、开放域问答、词义消歧与知识表示。", source: sources.danUtd },
      { label: "培养关系", value: "Romanian Academy 的 Rada Mihalcea 履历明确记录其为 2001 年 SMU 计算机博士 scientific adviser。", source: sources.radaBiography },
      { label: "图谱定位", value: "作为 Rada Mihalcea 的师承上游节点展示，不计入当前地区 PI 名录。", source: sources.radaBiography },
    ],
  },
  {
    id: "vladimir-vapnik-historical", name: "Vladimir Vapnik", role: "Foundational Machine Learning Researcher", institution: "External", actualInstitution: "Statistical Learning Theory", region: "Europe",
    area: "Statistical Learning Theory · Support Vector Machines", tags: ["统计学习", "SVM", "VC theory", "Bernhard Schölkopf 导师"], stage: "historical", category: "historical", primary: false,
    summary: "统计学习理论与支持向量机奠基者，是 Bernhard Schölkopf 的博士导师。",
    sources: [sources.vapnikLineage, sources.bernhardMpi], x: 90, y: 70, lastVerifiedAt: checkedAt,
    facts: [
      { label: "研究主线", value: "统计学习理论、VC 维与支持向量机。", source: sources.vapnikLineage },
      { label: "培养关系", value: "MPI-IS 官方获奖介绍明确称 Schölkopf 为 Vapnik 的博士生。", source: sources.vapnikLineage },
      { label: "学术影响", value: "与 Isabelle Guyon、Bernhard Schölkopf 因机器学习基础贡献共同获 BBVA Frontiers of Knowledge Award。", source: sources.vapnikLineage },
      { label: "图谱定位", value: "作为 Schölkopf 的师承上游节点展示，不计入当前地区 PI 名录。", source: sources.vapnikLineage },
    ],
  },
  {
    id: "larry-davis-historical", name: "Larry S. Davis", role: "Distinguished University Professor Emeritus", institution: "External", actualInstitution: "University of Maryland", region: "United States",
    area: "Computer Vision · Action Recognition · Scene Analysis", tags: ["计算机视觉", "动作识别", "场景理解", "UMD CfAR"], stage: "historical", category: "historical", primary: false,
    summary: "马里兰大学计算机视觉资深学者、前系主任与 CfAR 主任；官方材料记录其培养约 50 名博士，吴祖煊属于其博士培养网络。",
    sources: [sources.larryUmd, sources.larryLegacy, sources.zuxuanUmd], x: 90, y: 70, lastVerifiedAt: checkedAt,
    facts: [
      { label: "当前身份", value: "University of Maryland Distinguished University Professor Emeritus，研究方向为计算机视觉、动作识别与场景分析。", source: sources.larryUmd },
      { label: "领导经历", value: "曾任 UMD Computer Science 系主任（1999–2012）、UMIACS 创始主任与 CfAR 主任。", source: sources.larryLegacy },
      { label: "师承上游", value: "UMD 官方材料记录其博士导师为计算机视觉先驱 Azriel Rosenfeld。", source: sources.larryLegacy },
      { label: "培养规模", value: "UMD 在授予 Distinguished University Professor 时称其已培养约 50 名博士。", source: sources.larryLegacy },
      { label: "图谱定位", value: "作为吴祖煊的博士导师与美国计算机视觉培养链上游展示，不计入当前 PI 数量。", source: sources.zuxuanUmd },
    ],
  },
  {
    id: "edward-reingold-historical", name: "Edward M. Reingold", role: "Professor Emeritus", institution: "External", actualInstitution: "University of Illinois Urbana-Champaign", region: "United States",
    area: "Algorithms · Graph Drawing · Combinatorics", tags: ["算法", "图布局", "组合数学", "Tanya Berger-Wolf 导师"], stage: "historical", category: "historical", primary: false,
    summary: "Illinois 计算机科学名誉教授，图绘制与组合算法资深学者，是 Tanya Berger-Wolf 的博士导师。",
    sources: [sources.reingoldIllinois, sources.reingoldLegacy, sources.tanyaCv], x: 90, y: 70, lastVerifiedAt: checkedAt,
    facts: [
      { label: "学术身份", value: "University of Illinois Urbana-Champaign Professor Emeritus。", source: sources.reingoldIllinois },
      { label: "研究主线", value: "算法、数据结构与图布局；Illinois 官方校友奖页面特别记录其力导向图布局工作的长期影响。", source: sources.reingoldLegacy },
      { label: "培养关系", value: "Tanya Berger-Wolf 的公开 CV 明确记录其为 2002 年 UIUC 计算机博士导师。", source: sources.tanyaCv },
      { label: "图谱定位", value: "作为 Tanya Berger-Wolf 的师承上游展示，不计入当前 PI 数量。", source: sources.tanyaCv },
    ],
  },
];

export const leadershipNetworkPersonEnhancements: Record<string, Partial<Person>> = {
  "mohan-kankanhalli": {
    summary: "NUS AI Institute 主任、AI Singapore 副执行主席与 NUS 前计算机学院院长；其公开名录记录 36 名博士生、20 名博士后，学术后代分布于多媒体、视觉、可信 AI 与安全隐私。",
    knownAlumniCount: 24,
    tags: ["NUS AI Institute", "AI Singapore", "多媒体", "计算机视觉", "可信 AI", "导师谱系"],
    facts: [
      { label: "当前任职", value: "NUS Provost's Chair Professor、NUS AI Institute 主任、AI Singapore Deputy Executive Chairman。", source: sources.mohanProfile },
      { label: "领导经历", value: "2016–2022 年任 NUS School of Computing 院长；此前长期负责研究生教育与学院管理。", source: sources.mohanCv },
      { label: "研究主线", value: "多媒体计算、计算机视觉与可信 AI。", source: sources.mohanGraduate },
      { label: "培养规模", value: "公开短 CV 记录累计指导 52 名硕士、36 名博士与 20 名博士后；NUSGS 当前页列 5 名博士生与 24 名博士校友。", source: sources.mohanCv },
      { label: "学术界扩散", value: "公开校友名录连接到 UAlbany 的 Pradeep Atrey、UCF 的 Yogesh Rawat，以及 NTU、HFUT 等高校与研究机构。", source: sources.mohanAlumni },
    ],
    sources: [sources.mohanProfile, sources.mohanGraduate, sources.mohanCv, sources.mohanAlumni], lastVerifiedAt: checkedAt,
  },
  "rada-mihalcea-us": {
    summary: "Michigan AI Lab 主任、ACL 前主席，研究 NLP、计算社会科学、情感与多模态行为；公开学生和校友记录显示其培养网络已延伸到美国高校与欧洲研究机构。",
    tags: ["Michigan AI Lab", "LIT Lab", "NLP", "计算社会科学", "导师谱系"],
    facts: [
      { label: "当前任职", value: "University of Michigan Janice M. Jenkins Collegiate Professor、Michigan AI Lab Director。", source: sources.radaProfile },
      { label: "研究主线", value: "自然语言处理、计算社会科学、情感与多模态人类行为分析。", source: sources.radaChair },
      { label: "教育与学术训练", value: "SMU 计算机博士（2001），博士论文研究词义与信息检索；Dan Moldovan 为 scientific adviser。", source: sources.radaBiography },
      { label: "培养网络", value: "本人学生页公开多届博士生与博士后；Michigan CSE 学术界校友页明确列出 Veronica Perez-Rosas 等 faculty alumni。", source: sources.radaStudents },
      { label: "指导方式", value: "Michigan CSE 的导师说明公开了其一对一指导、论文、教学、实习与逐步独立的培养预期。", source: sources.radaProfile },
    ],
    sources: [sources.radaProfile, sources.radaStudents, sources.radaAcademicAlumni, sources.radaBiography], lastVerifiedAt: checkedAt,
  },
  "bernhard-schoelkopf-eu": {
    summary: "Max Planck Institute for Intelligent Systems 与 ELLIS Institute Tübingen 科学主任，连接统计学习、核方法、因果学习及欧洲博士培养网络。",
    tags: ["MPI-IS", "ELLIS", "统计学习", "核方法", "因果学习", "导师谱系"],
    facts: [
      { label: "当前任职", value: "MPI-IS Director、ELLIS Institute Tübingen Scientific Director，并任 ETH Zurich affiliated professor。", source: sources.bernhardEllis },
      { label: "研究主线", value: "统计机器学习、核方法、经验推断与因果结构学习。", source: sources.bernhardMpi },
      { label: "教育与学术训练", value: "TU Berlin 计算机博士（1997）；MPI-IS 官方材料明确 Vladimir Vapnik 为博士导师。", source: sources.vapnikLineage },
      { label: "培养网络", value: "Empirical Inference 部门公开成员与校友；ELLIS 访谈明确 Zhijing Jin 由其担任 primary PhD adviser。", source: sources.zhijingEllis },
      { label: "组织影响", value: "MPI-IS 创始主任之一，并参与创建 ELLIS 欧洲机器学习网络。", source: sources.bernhardEllis },
    ],
    sources: [sources.bernhardMpi, sources.bernhardEllis, sources.vapnikLineage, sources.zhijingEllis], lastVerifiedAt: checkedAt,
  },
  "cewu-lu-sjtu": {
    summary: "上海交大人工智能学院副院长，研究计算机视觉与机器人学习；其博士师承贾佳亚，公开培养记录连接通用抓取、视觉基础模型和具身智能方向。",
    tags: ["计算机视觉", "机器人学习", "具身智能", "GraspNet", "贾佳亚", "导师谱系"],
    facts: [
      { label: "当前任职", value: "上海交通大学教授、人工智能学院副院长。", source: sources.cewuSjtu },
      { label: "研究主线", value: "计算机视觉、机器人学习与具身智能，建设 AlphaPose、HAKE、GraspNet 等开源系统。", source: sources.cewuSjtu },
      { label: "教育与师承", value: "2009–2013 年在香港中文大学攻读博士；上海交大官方报道明确写明师从贾佳亚。", source: sources.cewuAdviser },
      { label: "培养网络", value: "上海交大优秀博士论文名单及学院材料公开方浩树等学生，并展示其通用机器人抓取方向的培养成果。", source: sources.cewuSjtu },
    ],
    sources: [sources.cewuSjtu, sources.cewuAdviser], lastVerifiedAt: checkedAt,
  },
  "zuxuan-wu-fdu": {
    summary: "复旦大学计算机视觉学者，博士阶段师从 Larry Davis，硕士阶段由姜育刚、薛向阳指导；其训练链连接复旦视频理解与 UMD 计算机视觉传统。",
    tags: ["视频理解", "深度学习", "Larry Davis", "薛向阳", "姜育刚", "导师谱系"],
    facts: [
      { label: "当前任职", value: "复旦大学教授、博士生导师，研究计算机视觉、视频理解与深度学习。", source: sources.zuxuanFudan },
      { label: "博士师承", value: "University of Maryland 官方记录 Larry Davis 为其博士导师。", source: sources.zuxuanUmd },
      { label: "硕士培养", value: "UMD 官方记录其在复旦的硕士阶段由姜育刚、薛向阳指导。", source: sources.zuxuanUmd },
      { label: "产业经历", value: "复旦官方报道记录其曾在 IBM、Salesforce 和 Facebook 等机构实习或工作后回到复旦任教。", source: sources.zuxuanFudan },
    ],
    sources: [sources.zuxuanFudan, sources.zuxuanUmd], lastVerifiedAt: checkedAt,
  },
  "xiangyang-xue-fdu": {
    summary: "复旦类脑智能研究院副院长，研究多模态大模型、具身与类脑智能；其培养网络中包括吴祖煊的硕士阶段训练。",
    facts: [
      { label: "当前任职", value: "复旦大学教授、大数据研究院与类脑智能科学与技术研究院副院长。", source: sources.xueFudan },
      { label: "研究主线", value: "多模态大模型、具身智能与类脑智能。", source: sources.xueFudan },
      { label: "培养关系", value: "University of Maryland 官方报道明确记录吴祖煊硕士阶段由薛向阳与姜育刚指导。", source: sources.zuxuanUmd },
      { label: "学术扩散", value: "吴祖煊完成 UMD 博士后回到复旦任教，形成复旦内部跨代视觉研究连接。", source: sources.zuxuanUmd },
    ],
    sources: [sources.xueFudan, sources.zuxuanUmd], lastVerifiedAt: checkedAt,
  },
  "tong-lu-nju": {
    summary: "南京大学计算机学院副院长、IMAGINE Lab 负责人，研究计算机视觉与多模态理解；公开培养记录覆盖 InternImage、InternVL 与具身视频理解。",
    facts: [
      { label: "当前任职", value: "南京大学计算机学院教授、副院长，计算机软件新技术全国重点实验室成员。", source: sources.tongNju },
      { label: "研究主线", value: "模式识别、计算机视觉、多模态大模型与媒体理解。", source: sources.tongHome },
      { label: "培养成果", value: "学院官方页点名王文海、李志琦、陈喆等博士生在论文、奖项与国际竞赛中的成果。", source: sources.tongNju },
      { label: "当前团队", value: "陈果本人主页明确列路通、王利民为共同博士导师；陈喆本人主页明确列路通为博士导师。", source: sources.tongGuo },
    ],
    sources: [sources.tongNju, sources.tongHome, sources.tongGuo, sources.tongZhe], lastVerifiedAt: checkedAt,
  },
  "joo-hwee-lim": {
    summary: "A*STAR I2R Visual Intelligence Unit 负责人，长期从连接主义、神经模糊系统发展到视觉智能与人机协同，并通过 CFAR 联合培养博士生。",
    facts: [
      { label: "当前任职", value: "A*STAR I2R Senior Principal Scientist III、Visual Intelligence Unit Head，并兼任 NTU Adjunct Professor。", source: sources.jooAstar },
      { label: "教育背景", value: "NUS 计算机学士、研究型硕士，UNSW 计算机科学与工程博士。", source: sources.jooAstar },
      { label: "研究演化", value: "研究经历跨连接主义专家系统、神经模糊系统、手写识别、多智能体、图像检索、场景/对象识别与医学影像。", source: sources.jooAstar },
      { label: "培养网络", value: "A*STAR CFAR 官方名录列 Alp Tekirdag 为其 affiliated PhD student。", source: sources.jooCfar },
    ],
    sources: [sources.jooAstar, sources.jooCfar], lastVerifiedAt: checkedAt,
  },
  "tanya-berger-wolf-osu-award": {
    summary: "Ohio State Translational Data Analytics Institute 主任、Imageomics Institute 创始负责人，把算法、动态网络与计算生态学连接到 AI for nature；公开 CV 记录完整博士培养与去向。",
    tags: ["AI for Science", "Imageomics", "计算生态学", "动态网络", "Edward Reingold", "导师谱系"],
    facts: [
      { label: "当前任职", value: "Ohio State TDAI Director，并横跨计算机、电气工程与生态学任教授。", source: sources.tanyaOsu },
      { label: "研究主线", value: "AI for nature、AI for science、计算生态学、Imageomics 与动态网络。", source: sources.tanyaOsu },
      { label: "博士师承", value: "2002 年获 UIUC 计算机博士；公开 CV 明确记录 Edward M. Reingold 为导师。", source: sources.tanyaCv },
      { label: "培养网络", value: "公开 CV 逐名列出博士生、共同导师、论文题目与当时去向，覆盖 Google、Salesforce、Tableau、研究机构与博士后。", source: sources.tanyaCv },
      { label: "当前培养", value: "Ohio State 官方实验室新闻记录 Braden DeMattei 由 Tanya Berger-Wolf 共同指导。", source: sources.tanyaCurrentStudent },
    ],
    sources: [sources.tanyaOsu, sources.tanyaCv, sources.tanyaCurrentStudent], lastVerifiedAt: checkedAt,
  },
};

const lineage = (id: string, from: string, to: string, label: string, evidence: string, sourceRecord: Source, endYear?: number): Relationship => ({
  id, from, to, type: "lineage", subtype: "phd_adviser", label, evidence, evidenceObject: `${from} → ${to}`, source: sourceRecord, verified: true, endYear,
});

export const leadershipNetworkRelationships: Relationship[] = [
  lineage("mohan-pradeep-atrey-phd", "mohan-kankanhalli", "pradeep-atrey-us", "博士导师", "Mohan Kankanhalli 的官方博士校友名录列出 Pradeep Atrey 的 NUS 博士论文；UAlbany 官方页确认其 NUS 博士学位与当前任职。", sources.mohanAlumni, 2007),
  lineage("mohan-yogesh-rawat-phd", "mohan-kankanhalli", "yogesh-rawat-us", "博士导师", "Mohan Kankanhalli 官方校友名录列 Yogesh Rawat 为 2017 年 NUS 博士。", sources.mohanAlumni, 2017),
  lineage("dan-moldovan-rada-phd", "dan-moldovan-historical", "rada-mihalcea-us", "博士导师", "Romanian Academy 的 Rada Mihalcea 履历明确记录 Dan Moldovan 为其 2001 年 SMU 计算机博士 scientific adviser。", sources.radaBiography, 2001),
  lineage("rada-veronica-phd", "rada-mihalcea-us", "veronica-perez-rosas-us", "博士导师", "Michigan CSE 的 Alumni in Academia 名录明确列 Veronica Perez-Rosas（PhD 2014）由 Rada Mihalcea 指导。", sources.radaAcademicAlumni, 2014),
  lineage("vapnik-schoelkopf-phd", "vladimir-vapnik-historical", "bernhard-schoelkopf-eu", "博士导师", "MPI-IS 官方获奖介绍明确称 Bernhard Schölkopf 为 Vladimir Vapnik 的博士生。", sources.vapnikLineage, 1997),
  lineage("schoelkopf-zhijing-jin-phd", "bernhard-schoelkopf-eu", "zhijing-jin-ca", "博士导师", "ELLIS 官方博士生访谈明确称 Bernhard Schölkopf 为 Zhijing Jin 的 primary adviser。", sources.zhijingEllis),
  lineage("jiaya-jia-cewu-lu-phd", "jiaya-jia-hkust", "cewu-lu-sjtu", "博士导师", "上海交通大学官方人物报道明确写明卢策吾在香港中文大学攻读博士时师从贾佳亚。", sources.cewuAdviser, 2013),
  lineage("larry-davis-zuxuan-wu-phd", "larry-davis-historical", "zuxuan-wu-fdu", "博士导师", "University of Maryland 官方报道明确记录 Larry Davis 为吴祖煊的博士导师。", sources.zuxuanUmd, 2020),
  { id: "xue-zuxuan-wu-master", from: "xiangyang-xue-fdu", to: "zuxuan-wu-fdu", type: "lineage", subtype: "master_adviser", label: "硕士导师", evidence: "University of Maryland 官方报道明确记录吴祖煊在复旦的硕士阶段由薛向阳与姜育刚指导。", evidenceObject: "xiangyang-xue-fdu → zuxuan-wu-fdu", source: sources.zuxuanUmd, verified: true },
  lineage("reingold-tanya-phd", "edward-reingold-historical", "tanya-berger-wolf-osu-award", "博士导师", "Tanya Berger-Wolf 的公开学术 CV 明确记录 Edward M. Reingold 为其 UIUC 计算机博士导师。", sources.tanyaCv, 2002),
];

export const leadershipNetworkGroupMembers: GroupMember[] = [
  ...["Ashraf Abdul", "Chen Xiang", "Yifan Lei", "Junnan Li", "Andrey Sakryukin", "Bingjie Xu", "Jingfeng Zhang"].map((name, index) => ({ id: `mohan-current-phd-${index + 1}`, teacherId: "mohan-kankanhalli", name, role: "PhD Student", source: sources.mohanProfile })),
  { id: "mohan-current-postdoc-zhiyong", teacherId: "mohan-kankanhalli", name: "Zhiyong Cheng", role: "Postdoctoral Researcher (public roster)", source: sources.mohanProfile },
  { id: "rada-current-joan-nwatu", teacherId: "rada-mihalcea-us", name: "Joan Nwatu", role: "PhD Student", focus: "Equitable multimodal AI", source: sources.radaCurrentStudent },
  ...["Julius von Kügelgen", "Luigi Gresele", "Felix Leeb", "Frederik Träuble", "Giambattista Parascandolo", "Paul Rubenstein"].map((name, index) => ({ id: `schoelkopf-ei-member-${index + 1}`, teacherId: "bernhard-schoelkopf-eu", name, role: "Doctoral Researcher / Department Member", focus: "Causal representation learning", source: sources.bernhardGroup })),
  { id: "tong-current-guo-chen", teacherId: "tong-lu-nju", name: "陈果 · Guo Chen", role: "PhD Candidate · co-advised with Limin Wang", focus: "Multimodal foundation models · egocentric video", source: sources.tongGuo },
  { id: "tong-current-zhe-chen", teacherId: "tong-lu-nju", name: "陈喆 · Zhe Chen", role: "PhD Candidate", focus: "LLM agents · multimodal foundation models", source: sources.tongZhe },
  { id: "joo-current-alp-tekirdag", teacherId: "joo-hwee-lim", name: "Alp Tekirdag", role: "A*STAR CFAR affiliated PhD student", source: sources.jooCfar },
  { id: "tanya-current-braden-demattei", teacherId: "tanya-berger-wolf-osu-award", name: "Braden DeMattei", role: "PhD Student · co-advised with Jim Hood", focus: "AI-assisted aquatic ecology", source: sources.tanyaCurrentStudent },
];

export const leadershipNetworkPlacements: StudentPlacement[] = [
  { id: "mohan-pradeep-ualbany", student: "Pradeep K. Atrey", teacherId: "mohan-kankanhalli", company: "University at Albany", role: "Associate Professor · Director of Undergraduate Studies", kind: "current", highLevel: true, degree: "PhD", graduationYear: 2007, currentRole: "Associate Professor · University at Albany", sector: "academia", source: sources.pradeepAlbany, verifiedAt: checkedAt },
  { id: "mohan-yogesh-ucf", student: "Yogesh S. Rawat", teacherId: "mohan-kankanhalli", company: "University of Central Florida", role: "Associate Professor · CRCV", kind: "current", highLevel: true, degree: "PhD", graduationYear: 2017, currentRole: "Associate Professor · UCF", sector: "academia", source: sources.yogeshUcf, verifiedAt: checkedAt },
  { id: "rada-veronica-txst", student: "Veronica Perez-Rosas", teacherId: "rada-mihalcea-us", company: "Texas State University", role: "Assistant Professor", kind: "current", highLevel: true, degree: "PhD", graduationYear: 2014, currentRole: "Assistant Professor · Texas State", sector: "academia", source: sources.veronicaTxst, verifiedAt: checkedAt },
  { id: "schoelkopf-zhijing-toronto", student: "Zhijing Jin", teacherId: "bernhard-schoelkopf-eu", company: "University of Toronto", role: "Assistant Professor · CIFAR AI Chair", kind: "current", highLevel: true, degree: "PhD", currentRole: "Assistant Professor · University of Toronto", sector: "academia", source: sources.zhijingToronto, verifiedAt: checkedAt },
  { id: "jiaya-cewu-sjtu", student: "卢策吾", teacherId: "jiaya-jia-hkust", company: "Shanghai Jiao Tong University", role: "Professor · Associate Dean", kind: "current", highLevel: true, degree: "PhD", graduationYear: 2013, currentRole: "Professor · Shanghai Jiao Tong University", sector: "academia", source: sources.cewuSjtu, verifiedAt: checkedAt },
  { id: "larry-zuxuan-fudan", student: "吴祖煊", teacherId: "larry-davis-historical", company: "Fudan University", role: "Professor · Associate Dean", kind: "current", highLevel: true, degree: "PhD", graduationYear: 2020, currentRole: "Professor · Fudan University", sector: "academia", source: sources.zuxuanFudan, verifiedAt: checkedAt },
  { id: "xue-zuxuan-fudan", student: "吴祖煊", teacherId: "xiangyang-xue-fdu", company: "Fudan University", role: "Professor · Associate Dean", kind: "current", highLevel: true, degree: "Master", currentRole: "Professor · Fudan University", sector: "academia", source: sources.zuxuanUmd, verifiedAt: checkedAt },
];

/** Leaders with a completed first-party adviser/alumni pass in this tranche. */
export const leadershipNetworkReviewedIds = ["mohan-kankanhalli", "rada-mihalcea-us", "bernhard-schoelkopf-eu"] as const;
