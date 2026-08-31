import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

type PersonEnhancement = Partial<Pick<Person, "summary" | "tags" | "facts" | "sources" | "lastVerifiedAt" | "status" | "knownAlumniCount">>;

const checkedAt = "2026-08-28";
const official = (label: string, url: string, supports: string, asOf?: string): Source => ({ label, url, kind: "official", checkedAt, supports, asOf });
const profile = (label: string, url: string, supports: string, asOf?: string): Source => ({ label, url, kind: "profile", checkedAt, supports, asOf });
const cv = (label: string, url: string, supports: string, asOf?: string): Source => ({ label, url, kind: "cv", checkedAt, supports, asOf });

const wangXiting = official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/wxt/index.htm", "教育、微软亚洲研究院与人大任职轨迹、研究方向");
const wangXitingFeature = official("人大人物专访", "https://ai.ruc.edu.cn/newslist/xwrw/66cc7b26323147c398706a8f70326993.htm", "微软亚洲研究院经历与研究应用");
const liuPengfei = official("上海交大清源研究院主页", "https://www.qingyuan.sjtu.edu.cn/a/liu-peng-fei.html", "当前任职、教育、研究、团队、创业与学生升学去向");
const liuLab = profile("GAIR / Generative AI Research Lab", "https://plms.ai/", "研究组与公开资源");
const zhaoHai = official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/jiaoshiml/zhaohai.html", "教育、任职、研究、学术服务与课程");
const zhaoHaiEnglish = official("上海交大英文教师主页", "https://cs.sjtu.edu.cn/cse/en/PeopleDetail.aspx?id=60", "早期经历与微软亚洲研究院访问经历");

const yiFung = official("HKUST Faculty Profile", "https://cse.hkust.edu.hk/admin/people/faculty/profile/yrfung", "教育、研究主题、奖项与团队状态");
const yiFungProjects = official("HKUST Faculty Profiles", "https://facultyprofiles.hkust.edu.hk/profiles.php?profile=may-fung-yrfung", "当前学生与研究项目", "2026");
const xixinWu = official("CUHK Research Portal", "https://research.cuhk.edu.hk/en/persons/xixin-wu/", "当前任职、教育、研究主题与项目");
const xixinWuPersonal = profile("Xixin Wu 个人主页", "https://www1.se.cuhk.edu.hk/~wuxx/", "博士与硕士导师、Cambridge 研究经历");
const liangliangCao = official("PolyU DSAI Profile", "https://www.polyu.edu.hk/dsai/people/academic-staff/cao-liangliang/?sc_lang=en", "教育、创业、Google/Apple/DeepMind 任职与技术贡献");
const liangliangAppointment = official("PolyU Appointment News", "https://www.polyu.edu.hk/dsai/news-and-events/news/2026/20260630-welcome-cao-liangliang/", "PolyU 到任日期", "2026-06-29");

const aixinSun = profile("Aixin Sun 个人主页", "https://personal.ntu.edu.sg/axsun/bio.html", "教育、当前职务、研究方向、奖项与学术服务");
const aixinDmal = official("NTU DMAL People", "https://www.ntu.edu.sg/dmal/about-us/our-people", "NTU 任职与 UNSW 博后经历");
const anhTuan = official("NTU GrAIL People", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people", "当前任职、研究方向、论文规模与 MIT 经历");
const anhTuanPersonal = profile("Anh Tuan Luu 个人主页", "https://tuanluu.github.io/index.html", "教育、Regina Barzilay 博后指导、研究方向与招生状态");
const jiancongXiao = official("NUS Faculty Profile", "https://www.comp.nus.edu.sg/cs/people/xiaojc/", "到任日期、教育、博士与博后导师、研究方向");
const jiancongNews = official("NUS New Faculty 2026", "https://www.comp.nus.edu.sg/news/nus-school-of-computing-welcomes-17-new-faculty-members/", "新教师到任与研究简介", "2026");

const danBio = profile("Dan Jurafsky Biography", "https://web.stanford.edu/~jurafsky/bio.html", "当前职务、研究主题、教育与学术荣誉");
const danCv = cv("Dan Jurafsky CV", "https://web.stanford.edu/~jurafsky/cv.pdf", "教育与完整任职轨迹");
const danPeople = profile("Dan Jurafsky People", "https://web.stanford.edu/~jurafsky/people.html", "当前学生、实验室校友与公开去向", "2026");
const diyiYang = profile("Diyi Yang 个人主页", "https://cs.stanford.edu/people/diyiy/", "教育、任职轨迹、研究主题、项目与奖项");
const monaDiab = official("CMU LTI Faculty Profile", "https://www.lti.cmu.edu/people/faculty/diab-mona.html", "当前职务、过往产业任职、研究主题与当前学生");
const monaAcl = official("CMU: Mona Diab Named ACL Fellow", "https://www.lti.cs.cmu.edu/news-and-events/news/2023-12-14-diab-acl-fellow.html", "CMU 到任时间、ACL Fellow 与过往任职", "2023");

export const fourRegionProfileEnhancements: Record<string, PersonEnhancement> = {
  "xiting-wang": {
    summary: "人大高瓴人工智能学院副教授，研究大模型可解释性、对齐与评测。清华博士毕业后在微软亚洲研究院从研究员晋升至主管研究员，2023 年转入人大建立独立研究方向。",
    tags: ["清华博士", "MSRA 2017–2023", "LLM 可解释性", "对齐与评测"],
    facts: [
      { label: "教育", value: "清华大学本科（2007–2011）、博士（2011–2017）", source: wangXiting },
      { label: "产业任职", value: "微软亚洲研究院研究员 → 高级研究员 → 主管研究员（2017–2023）", source: wangXiting },
      { label: "高校任职", value: "2023 年加入人大；2024 年起任副教授", source: wangXiting },
      { label: "研究主线", value: "大模型可解释性、对齐、评测与负责任 AI", source: wangXiting },
      { label: "技术转化", value: "官方专访记录其研究曾服务于微软产品与 Bing 相关场景", source: wangXitingFeature },
    ],
    sources: [wangXiting, wangXitingFeature], lastVerifiedAt: checkedAt,
  },
  "pengfei-liu-sjtu": {
    summary: "上海交大清源研究院长聘教轨副教授、GAIR 负责人，研究生成式 AI 的预训练、生成与评测。CMU LTI 博士期间与 Graham Neubig 共同创办 Inspired Cognition，并建设 ExplainaBoard、DataLab 等开放评测基础设施。",
    tags: ["CMU LTI", "GAIR", "ExplainaBoard", "DataLab", "Inspired Cognition"],
    facts: [
      { label: "当前任职", value: "上海交大清源研究院长聘教轨副教授 · Generative AI Research Lab 负责人", source: liuPengfei },
      { label: "研究主线", value: "生成式 AI 的预训练、文本生成、评测与数据中心方法", source: liuPengfei },
      { label: "开源基础设施", value: "ExplainaBoard、DataLab 等模型评测与数据分析平台", source: liuPengfei },
      { label: "创业", value: "CMU LTI 期间与 Graham Neubig 共同创办 Inspired Cognition", source: liuPengfei },
      { label: "学生升学", value: "官方主页列出组员进入 CMU、NYU、Yale 与 Oxford 深造", source: liuPengfei },
    ],
    sources: [liuPengfei, liuLab], lastVerifiedAt: checkedAt,
  },
  "hai-zhao-sjtu": {
    summary: "上海交大长聘教授、自然语言处理与理解资深 PI，研究从结构化语言分析延伸到基础模型之上的通用智能与脑启发大语言模型；长期承担 TACL、ARR 等国际学术服务。",
    tags: ["SJTU PhD", "CityU Research Fellow", "TACL Section Editor", "BriLLM", "自然语言理解"],
    facts: [
      { label: "教育", value: "上海交通大学博士（2000–2005）", source: zhaoHai },
      { label: "任职轨迹", value: "CityU Research Fellow（2006–2009）；交大副教授（2010）、教授（2017）、长聘教授（2024）", source: zhaoHai },
      { label: "早期产业研究", value: "官方英文履历记录 2005–2006 年微软亚洲研究院访问研究经历", source: zhaoHaiEnglish },
      { label: "研究主线", value: "自然语言理解、基础模型之上的 AGI 与脑启发大语言模型", source: zhaoHai },
      { label: "学术服务", value: "TACL Section Editor、ARR Action Editor；著有《自然语言理解》", source: zhaoHai },
    ],
    sources: [zhaoHai, zhaoHaiEnglish], lastVerifiedAt: checkedAt,
  },

  "yi-fung": {
    summary: "HKUST 助理教授，UIUC 博士并曾在 MIT 开展博士后访问研究。聚焦人本可信 NLP、多模态知识推理、检索增强生成与自演化智能体，并研究多语言模型的社会文化适配。",
    tags: ["UIUC PhD", "MIT postdoc visit", "Human-centric AI", "Self-evolving Agents", "ACL/NAACL Awards"],
    facts: [
      { label: "教育与经历", value: "UIUC 博士；曾赴 MIT 开展博士后访问研究", source: yiFung },
      { label: "研究主线", value: "人本可信 AI/NLP、多模态知识推理、RAG、智能体与跨文化适配", source: yiFung },
      { label: "论文奖项", value: "ACL 2024 Outstanding Paper、NAACL 2024 Outstanding Paper、NAACL 2021 Best Demo", source: yiFung },
      { label: "近期项目", value: "自演化智能体、多语言 LLM 持续学习，以及与 BYD 相关的研究项目", source: yiFungProjects },
      { label: "团队", value: "HKUST 官方档案列出 5 位共同指导的研究生", source: yiFungProjects },
    ],
    sources: [yiFung, yiFungProjects], lastVerifiedAt: checkedAt,
  },
  "xixin-wu": {
    summary: "CUHK SEEM 助理教授，研究生成式 AI、健康场景语音与语言技术、情感计算和人机交互。博士师从 Helen Meng，加入 CUHK 前曾在 Cambridge Machine Intelligence Laboratory 任 Research Associate。",
    tags: ["Helen Meng", "Cambridge", "Health Speech & Language", "Affective Computing", "Generative AI"],
    facts: [
      { label: "教育", value: "北航本科、清华硕士、香港中文大学博士", source: xixinWu },
      { label: "博士师承", value: "Helen Meng；硕士阶段导师为 Zhiyong Wu", source: xixinWuPersonal },
      { label: "任职轨迹", value: "Cambridge Machine Intelligence Research Associate → CUHK Research Assistant Professor → Assistant Professor", source: xixinWu },
      { label: "研究主线", value: "生成式 AI、健康语音与语言、情感计算、人机交互", source: xixinWu },
      { label: "Cambridge 合作", value: "个人主页列 Mark Gales 与 Kate Knill 为 Cambridge 阶段指导者", source: xixinWuPersonal },
    ],
    sources: [xixinWu, xixinWuPersonal], lastVerifiedAt: checkedAt,
  },
  "liangliang-cao": {
    summary: "PolyU AI Systems 讲席教授，教育背景跨 USTC、CUHK 与 UIUC。产业履历覆盖 IBM、Yahoo、创业公司 Switi、Google Cloud Speech、Apple Intelligence 与 Google DeepMind Gemini / Project Astra，属于大型 AI 系统产业回流型资深节点。",
    tags: ["UIUC PhD", "Switi co-founder", "Google Cloud Speech", "Apple Intelligence", "Gemini / Astra", "IEEE Fellow"],
    facts: [
      { label: "教育", value: "中科大工学学士（2003）、CUHK MPhil（2005）、UIUC 博士（2011）", source: liangliangCao },
      { label: "创业", value: "2016 年共同创办 Switi；公司于 2018 年被 Google 收购", source: liangliangCao },
      { label: "Google / Apple", value: "领导 Google Cloud Speech Modelling（2018–2021）；2022 年任 Apple Principal Scientist / Engineering Lead", source: liangliangCao },
      { label: "DeepMind", value: "2024 年起任 Principal Engineer / Director，参与 Gemini 与 Project Astra", source: liangliangCao },
      { label: "PolyU 到任", value: "2026 年 6 月 29 日出任 Chair Professor of AI Systems", source: liangliangAppointment },
      { label: "学术荣誉", value: "IEEE Fellow（2025）", source: liangliangCao },
    ],
    sources: [liangliangCao, liangliangAppointment], lastVerifiedAt: checkedAt,
  },

  "aixin-sun": {
    summary: "NTU 副教授、计算与数据科学学院本科教育副院长，研究信息检索、推荐系统与 NLP；近期工作覆盖视频片段检索、视觉文档搜索、序列推荐，以及 LLM 归因、信息抽取和科学推理。",
    tags: ["NTU PhD", "Associate Dean", "IR", "Recommender Systems", "LLM Attribution", "SIGIR Test of Time"],
    facts: [
      { label: "教育", value: "NTU B.A.Sc.（2001）、PhD（2004）", source: aixinSun },
      { label: "任职轨迹", value: "UNSW 博士后；2005 年加入 NTU，现任副教授与本科教育副院长", source: aixinDmal },
      { label: "研究主线", value: "信息检索、推荐系统、自然语言处理", source: aixinSun },
      { label: "近期方向", value: "视频片段/视觉文档检索、序列推荐、LLM 归因与科学推理", source: aixinSun },
      { label: "学术服务与荣誉", value: "担任多项期刊编委；相关工作获 SIGIR 2025 Test of Time Honorable Mention", source: aixinSun },
    ],
    sources: [aixinSun, aixinDmal], lastVerifiedAt: checkedAt,
  },
  "anh-tuan-luu": {
    summary: "NTU 副教授，研究大语言模型、鲁棒与可信 AI、问答、信息抽取和图神经网络。NTU 博士毕业后在 MIT CSAIL 从事博士后研究，由 Regina Barzilay 指导。",
    tags: ["NTU PhD", "MIT CSAIL", "Regina Barzilay", "Trustworthy LLM", "GNN"],
    facts: [
      { label: "教育", value: "NTU 博士（2017）", source: anhTuanPersonal },
      { label: "博士后", value: "MIT CSAIL Research Fellow（2018–2020），由 Regina Barzilay 指导", source: anhTuanPersonal },
      { label: "研究主线", value: "LLM、鲁棒与可信 AI、问答、信息抽取、图神经网络", source: anhTuan },
      { label: "研究规模", value: "NTU 官方简介记录已发表 120 余篇论文", source: anhTuan },
      { label: "招生状态", value: "个人主页截至核验日表示正在招收 PhD 学生；请以最新主页为准", source: anhTuanPersonal },
    ],
    sources: [anhTuan, anhTuanPersonal], lastVerifiedAt: checkedAt,
    status: "个人主页截至 2026-08-28 表示正在招收 PhD 学生",
  },
  "jiancong-xiao": {
    summary: "NUS 2026 年新入职的 tenure-track 助理教授，研究负责任与可信机器学习的理论基础，聚焦 LLM 偏好对齐、微调、后训练、校准与算法偏差。",
    tags: ["CUHK-Shenzhen PhD", "UPenn postdoc", "Preference Alignment", "Post-training", "Calibration"],
    facts: [
      { label: "到任", value: "2026 年 7 月 1 日加入 NUS School of Computing", source: jiancongXiao },
      { label: "博士师承", value: "CUHK-Shenzhen 博士（2023），导师 Zhi-Quan Tom Luo", source: jiancongXiao },
      { label: "博士后", value: "UPenn 博士后，合作导师 Qi Long 与 Weijie Su", source: jiancongXiao },
      { label: "研究主线", value: "可信/负责任 ML 的学习理论、统计与优化基础", source: jiancongXiao },
      { label: "LLM 方向", value: "偏好对齐、微调、后训练、校准与算法偏差", source: jiancongNews },
    ],
    sources: [jiancongXiao, jiancongNews], lastVerifiedAt: checkedAt,
  },

  "dan-jurafsky-us": {
    summary: "Stanford Reynolds Professor，横跨 Linguistics 与 Computer Science，是 Stanford NLP 的核心资深 PI。研究语言模型与 NLP，并将其用于认知科学、社会科学与社会公益问题；著有《Speech and Language Processing》。",
    tags: ["Berkeley PhD", "Stanford NLP", "Speech and Language Processing", "MacArthur Fellow", "NAS"],
    facts: [
      { label: "当前任职", value: "Reynolds Professor in Humanities；Professor of Linguistics and Computer Science", source: danBio },
      { label: "教育", value: "UC Berkeley 本科（1983）、计算机科学博士（1992）", source: danCv },
      { label: "任职轨迹", value: "ICSI 博士后（1992–1995）；Colorado faculty；2003 年加入 Stanford", source: danCv },
      { label: "研究主线", value: "语言模型与 NLP，以及面向认知、社会科学和社会公益的语言技术", source: danBio },
      { label: "教材", value: "《Speech and Language Processing》共同作者", source: danBio },
      { label: "荣誉", value: "MacArthur Fellow；美国国家科学院与美国艺术与科学院成员", source: danBio },
    ],
    sources: [danBio, danCv, danPeople], lastVerifiedAt: checkedAt,
  },
  "diyi-yang-us": {
    summary: "Stanford 助理教授，研究 Socially Aware NLP、LLM 与人机交互，关注生成式交互、人—智能体协作、社会技能训练、方言与低资源语言，以及 AI、文化与社会之间的关系。",
    tags: ["CMU LTI PhD", "Georgia Tech", "Socially Aware NLP", "Human-Agent Collaboration", "Sloan Fellow"],
    facts: [
      { label: "教育", value: "上海交大 ACM 班本科（2009–2013）；CMU LTI 博士（2013–2019）", source: diyiYang },
      { label: "任职轨迹", value: "Georgia Tech 助理教授（2019–2022）；2022 年加入 Stanford", source: diyiYang },
      { label: "研究主线", value: "Socially Aware NLP、LLM、Human-AI Interaction", source: diyiYang },
      { label: "近期议题", value: "生成式交互、人—智能体协作、社会技能训练、方言/低资源与 AI 文化研究", source: diyiYang },
      { label: "荣誉", value: "Sloan Research Fellow（2024）、ONR Young Investigator（2024）、NSF CAREER（2022）", source: diyiYang },
    ],
    sources: [diyiYang], lastVerifiedAt: checkedAt,
  },
  "mona-diab-us": {
    summary: "CMU Language Technologies Institute 主任、教授、ACL Fellow，研究可信 NLP、负责任 AI、多语言与低资源建模、可控生成和文化感知评测。加入 CMU 前曾任 GWU 教授，并在 Amazon AWS 与 Meta 领导产业研究。",
    tags: ["LTI Director", "ACL Fellow", "Responsible AI", "Arabic NLP", "Meta", "AWS", "R3LIT"],
    facts: [
      { label: "当前任职", value: "CMU LTI Director、Full Professor、ACL Fellow", source: monaDiab },
      { label: "产业任职", value: "曾任 Amazon AWS 研究岗位；Meta Lead Responsible AI Research Scientist / Technical Lead", source: monaDiab },
      { label: "高校轨迹", value: "曾任 George Washington University 教授；2023 年 8 月加入 CMU", source: monaAcl },
      { label: "研究主线", value: "可信 NLP、负责任 AI、多语言/低资源、可控 NLG 与文化感知评测", source: monaDiab },
      { label: "团队", value: "领导 R3LIT Lab；官方主页列出 6 位 CMU advisees", source: monaDiab },
    ],
    sources: [monaDiab, monaAcl], lastVerifiedAt: checkedAt,
  },
};

export const fourRegionProfileRelationships: Relationship[] = [
  { id: "liu-neubig-inspired-cognition", from: "graham-neubig-us", to: "pengfei-liu-sjtu", type: "industry", subtype: "industry_affiliation", label: "共同创办 Inspired Cognition", evidence: "上海交大官方主页记录刘鹏飞在 CMU LTI 期间与 Graham Neubig 共同创办 Inspired Cognition。", source: liuPengfei, verified: true },
  { id: "xixin-helen-meng-lineage", from: "xixin-wu", to: "xixin-wu", type: "lineage", subtype: "phd_adviser", label: "博士导师：Helen Meng", evidence: "Xixin Wu 个人主页明确列 Helen Meng 为其 CUHK 博士导师。", source: xixinWuPersonal, verified: true },
  { id: "luu-barzilay-postdoc", from: "regina-barzilay-us", to: "anh-tuan-luu", type: "lineage", subtype: "postdoc_mentor", label: "博士后指导", evidence: "个人主页记录其 2018–2020 年在 MIT CSAIL 从事博士后研究，由 Regina Barzilay 指导。", source: anhTuanPersonal, verified: true },
  { id: "xiao-luo-lineage", from: "jiancong-xiao", to: "jiancong-xiao", type: "lineage", subtype: "phd_adviser", label: "博士导师：Zhi-Quan Tom Luo", evidence: "NUS 官方主页明确记录 Jiancong Xiao 的 CUHK-Shenzhen 博士导师。", source: jiancongXiao, verified: true },
  { id: "xiao-upenn-postdoc", from: "jiancong-xiao", to: "jiancong-xiao", type: "talent", subtype: "postdoc_mentor", label: "UPenn 博士后导师：Qi Long / Weijie Su", evidence: "NUS 官方主页记录其在 UPenn 由 Qi Long 与 Weijie Su 指导博士后研究。", source: jiancongXiao, verified: true },
  { id: "jurafsky-diab-postdoc", from: "dan-jurafsky-us", to: "mona-diab-us", type: "talent", subtype: "postdoc_mentor", label: "Stanford 博士后指导（2004–2005）", evidence: "Dan Jurafsky 的实验室校友页将 Mona Diab 列为 2004–2005 年博士后。", source: danPeople, verified: true, startYear: 2004, endYear: 2005 },
  { id: "jurafsky-diyi-visit", from: "dan-jurafsky-us", to: "diyi-yang-us", type: "talent", subtype: "career_movement", label: "Stanford Visiting PhD（2017）", evidence: "Dan Jurafsky 的实验室校友页将 Diyi Yang 列为 2017 年 Visiting PhD student。", source: danPeople, verified: true, startYear: 2017, endYear: 2017 },
];

export const fourRegionProfileGroupMembers: GroupMember[] = [
  ...["He Zhitao", "Hu Chenchang", "Huang Yuchen", "Min Rui", "Su Zhaochen"].map((name, index) => ({ id: `fung-current-${index + 1}`, teacherId: "yi-fung", name, role: "Research postgraduate · co-supervised", source: yiFungProjects })),
  ...[
    ["Aryaman Arora", "PhD Student", "co-advised with Chris Potts"], ["Myra Cheng", "PhD Student", ""],
    ["Moussa Doumbouya", "PhD Student", "co-advised with Chris Manning"], ["Julie Kallini", "PhD Student", "co-advised with Chris Potts"],
    ["Tolúlọpẹ́ Ògúnrẹ̀mí", "PhD Student", "co-advised with Chris Manning"], ["Mirac Suzgun", "PhD Student", "co-advised with James Zou"],
    ["Marie Tano", "PhD Student", "co-advised with Rob Podesva"], ["Anna Thomas", "PhD Student", "co-advised with Moses Charikar and Maya Mathur"],
  ].map(([name, role, focus], index) => ({ id: `jurafsky-current-${index + 1}`, teacherId: "dan-jurafsky-us", name, role, focus: focus || undefined, source: danPeople })),
  ...["Alfredo Gomez", "Karina Halevy", "Andy Liu", "Aashiq Muhamed", "Nishant Subramani", "Jiarui Liu"].map((name, index) => ({ id: `diab-current-${index + 1}`, teacherId: "mona-diab-us", name, role: "Advisee", source: monaDiab })),
];

export const fourRegionProfileStudentPlacements: StudentPlacement[] = [
  { id: "jurafsky-khandelwal-deepmind", student: "Urvashi Khandelwal", teacherId: "dan-jurafsky-us", company: "Google DeepMind", role: "Research Scientist", kind: "reported", source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-durmus-anthropic", student: "Esin Durmus", teacherId: "dan-jurafsky-us", company: "Anthropic", role: "Research Scientist", kind: "reported", source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-xie-sapling", student: "Ziang Xie", teacherId: "dan-jurafsky-us", company: "Sapling.ai", role: "CEO", kind: "founder", highLevel: true, source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-prabhakaran-google", student: "Vinodkumar Prabhakaran", teacherId: "dan-jurafsky-us", company: "Google Research", role: "Senior Research Scientist", kind: "reported", highLevel: true, source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-johri-meta", student: "Nikhil Johri", teacherId: "dan-jurafsky-us", company: "Meta", role: "Engineering Manager", kind: "reported", highLevel: true, source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-maas-apple", student: "Andrew Maas", teacherId: "dan-jurafsky-us", company: "Apple", role: "Research / engineering", kind: "reported", source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-sung-deepmind", student: "Yun-Hsuan Sung", teacherId: "dan-jurafsky-us", company: "Google DeepMind", role: "Research Director", kind: "reported", highLevel: true, source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-gupta-klaviyo", student: "Surabhi Gupta", teacherId: "dan-jurafsky-us", company: "Klaviyo", role: "CTO", kind: "reported", highLevel: true, source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-gligoric-jhu", student: "Kristina Gligorić", teacherId: "dan-jurafsky-us", company: "Johns Hopkins University", role: "Assistant Professor", kind: "reported", sector: "academia", source: danPeople, verifiedAt: checkedAt },
  { id: "jurafsky-zhou-cornell", student: "Kaitlyn Zhou", teacherId: "dan-jurafsky-us", company: "Cornell University", role: "Incoming Assistant Professor", kind: "reported", sector: "academia", source: danPeople, verifiedAt: checkedAt },
];
