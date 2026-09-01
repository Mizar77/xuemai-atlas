import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  roster: source("Yi Ma · official students roster", "https://people.eecs.berkeley.edu/~yima/Students.html", "profile", "Current trainees, former PhD students, thesis dates and public destinations"),
  biography: source("Yi Ma · official biography", "https://people.eecs.berkeley.edu/~yima/Biography.html", "profile", "Education, appointments, industry roles, research programme, awards and fellowships"),
  homepage: source("Yi Ma · academic homepage", "https://people.eecs.berkeley.edu/~yima/", "profile", "Current HKU/Berkeley appointments, research programme and current activities"),
  haozhi: source("Haozhi Qi · academic homepage", "https://haozhi.io/", "profile", "UChicago appointment, Amazon FAR role, research programme and Yi Ma/Jitendra Malik co-advising"),
  haozhiUChicago: source("University of Chicago directory · Haozhi Qi", "https://directory.uchicago.edu/individuals/1340629944", "official", "Current University of Chicago affiliation"),
  yaodongUmd: source("UMD UMIACS · Yaodong Yu", "https://www.umiacs.umd.edu/our-experts/faculty/yaodong-yu", "official", "Current assistant professorship and trustworthy-ML research programme"),
  yaodongHome: source("Yaodong Yu · academic homepage", "https://yaodongyu.github.io/", "profile", "Berkeley PhD co-advising, education, research and industry experience"),
  johnColumbia: source("Columbia Engineering · John Wright", "https://www.engineering.columbia.edu/faculty-staff/directory/john-wright", "official", "Current associate professorship, education, research programme and awards"),
  johnHome: source("John Wright · Columbia academic homepage", "https://www.columbia.edu/~jw2966/", "profile", "Current group, academic role and research programme"),
  kunIu: source("Indiana University School of Medicine · Kun Huang", "https://medicine.iu.edu/faculty/38697/huang-kun", "official", "Education and research programme in biomedical data science, vision and machine learning"),
  kunCv: source("Indiana University-hosted CV · Kun Huang", "https://fairbanks.indianapolis.iu.edu/doc/about/directory/huang-cv-20221114.pdf", "cv", "Current leadership and Yi Ma as UIUC PhD adviser"),
  zihanPsu: source("Penn State · Zihan Zhou", "https://iee.psu.edu/people/zihan-zhou", "official", "Current assistant professorship and computer-vision research"),
  zihanCv: source("Zihan Zhou · academic CV", "https://zihan-z.github.io/Zhou_CV.pdf", "cv", "UIUC doctoral training and academic career"),
};

type NewPerson = Omit<Person, "facts" | "lastVerifiedAt" | "introducedAt" | "x" | "y"> & {
  education: string;
  connection: string;
};

const makePerson = (person: NewPerson, index: number): Person => {
  const { education, connection, ...base } = person;
  return {
    ...base,
    x: 180 + (index % 3) * 190,
    y: 180 + Math.floor(index / 3) * 170,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    facts: [
      { label: "当前任职", value: base.role, source: base.sources[0] },
      { label: "研究主线", value: base.area, source: base.sources[0] },
      { label: "教育与学术训练", value: education, source: base.sources[1] },
      { label: "马毅培养网络", value: connection, source: sources.roster },
    ],
  };
};

export const yiMaNetworkPeople: Person[] = [
  makePerson({
    id: "haozhi-qi-us", name: "Haozhi Qi", role: "Incoming Assistant Professor · Member of Technical Staff, Amazon FAR", institution: "UChicago", region: "United States",
    area: "Robotics · Embodied AI · Multisensory Dexterity", tags: ["机器人", "具身智能", "触觉", "Yi Ma", "Jitendra Malik"], stage: "emerging", category: "core", primary: true,
    summary: "University of Chicago 新任助理教授、Amazon Frontier AI & Robotics 成员，研究通用机器人、多感官操作与具身智能。",
    sources: [sources.haozhi, sources.haozhiUChicago, sources.roster],
    education: "HKUST 本科；UC Berkeley CS 博士（2025），由 Yi Ma 与 Jitendra Malik 共同指导。",
    connection: "马毅官方学生名录列为 2025 年 Berkeley CS 博士；本人主页明确 Yi Ma 与 Jitendra Malik 为共同导师。",
  }, 0),
  makePerson({
    id: "yaodong-yu-us", name: "Yaodong Yu", role: "Assistant Professor · Affiliate Faculty, UMIACS", institution: "UMD", region: "United States",
    area: "Trustworthy Machine Learning · Foundation Models · Robustness", tags: ["可信机器学习", "基础模型", "隐私", "Yi Ma", "Michael I. Jordan"], stage: "emerging", category: "core", primary: true,
    summary: "University of Maryland 助理教授，研究可信机器学习、可解释网络、隐私保护基础模型与分布外鲁棒性。",
    sources: [sources.yaodongUmd, sources.yaodongHome, sources.roster],
    education: "南京大学数学本科、University of Virginia CS 硕士、UC Berkeley CS 博士（2024），由 Yi Ma 与 Michael I. Jordan 共同指导。",
    connection: "马毅官方学生名录列为 2024 年 Berkeley CS 博士；本人主页明确 Yi Ma 与 Michael I. Jordan 为共同导师。",
  }, 1),
  makePerson({
    id: "john-wright-us", name: "John Wright", role: "Associate Professor of Electrical Engineering · Vice Chair", institution: "Columbia", region: "United States",
    area: "High-Dimensional Data · Optimization · Computer Vision", tags: ["高维数据", "稀疏表示", "优化", "计算机视觉", "Yi Ma"], stage: "senior", category: "core", primary: true,
    summary: "Columbia EE 副教授、副系主任，以鲁棒稀疏/低秩恢复、非凸优化和视觉数据分析连接马毅的高维数据学术主线。",
    sources: [sources.johnColumbia, sources.johnHome, sources.roster],
    education: "UIUC 计算机工程学士、电子工程硕士与博士（2009）；博士阶段由 Yi Ma 指导。",
    connection: "马毅官方学生名录列为 2009 年 UIUC ECE 博士，并记录论文《Error Correction for High-Dimensional Data via Convex Optimization》。",
  }, 2),
  makePerson({
    id: "kun-huang-us", name: "Kun Huang", chinese: "黄琨", role: "Professor & Chair · Biostatistics and Health Data Science", institution: "Indiana U", region: "United States",
    area: "Biomedical Data Science · Computational Pathology · Machine Learning", tags: ["生物信息学", "计算病理", "精准医学", "计算机视觉", "Yi Ma"], stage: "institute", category: "core", primary: true,
    summary: "Indiana University 医学院生物统计与健康数据科学系主任，把马毅的视觉与高维数据训练延伸到生物信息学、计算病理和精准医学。",
    sources: [sources.kunIu, sources.kunCv, sources.roster],
    education: "清华生物学与计算机工程双学位；UIUC 多个硕士及 ECE 博士（2004），官方 CV 明确 Yi Ma 为博士导师。",
    connection: "马毅官方学生名录及 Kun Huang 的 IU 托管 CV 均明确记录 2004 年 UIUC 博士指导关系。",
  }, 3),
  makePerson({
    id: "zihan-zhou-us", name: "Zihan Zhou", chinese: "周子涵", role: "Assistant Professor · College of Information Sciences and Technology", institution: "Penn State", region: "United States",
    area: "Computer Vision · 3D Reconstruction · Visual Recognition", tags: ["计算机视觉", "3D 重建", "视觉识别", "稀疏表示", "Yi Ma"], stage: "senior", category: "core", primary: true,
    summary: "Penn State IST 助理教授，研究三维重建、视觉识别与稀疏表示，是马毅 UIUC 视觉谱系中的学术界节点。",
    sources: [sources.zihanPsu, sources.zihanCv, sources.roster],
    education: "UIUC ECE 硕士与博士（2012），博士论文研究城市视觉场景的鲁棒三维重建。",
    connection: "马毅官方学生名录将其列为 2012 年 UIUC ECE 博士，并记录其后进入 Penn State 学术任职。",
  }, 4),
];

const lineage = (id: string, from: string, to: string, label: string, evidence: string, evidenceObject: string, endYear?: number): Relationship => ({
  id, from, to, type: "lineage", subtype: label === "共同博士导师" ? "co_adviser" : "phd_adviser", label,
  evidence, evidenceObject, source: sources.roster, verified: true, endYear,
});

export const yiMaNetworkRelationships: Relationship[] = [
  lineage("yima-haozhi-phd", "yi-ma-hku", "haozhi-qi-us", "博士导师", "马毅官方学生名录列出 Haozhi Qi 为 2025 年 Berkeley CS 博士；本人主页明确 Yi Ma 为共同导师。", "Haozhi Qi · Multisensory Dexterity for Robotics", 2025),
  { ...lineage("malik-haozhi-coadviser", "jitendra-malik-us", "haozhi-qi-us", "共同博士导师", "Haozhi Qi 本人主页明确 Yi Ma 与 Jitendra Malik 共同指导其 Berkeley 博士。", "Haozhi Qi · UC Berkeley PhD", 2025), source: sources.haozhi },
  lineage("yima-yaodong-phd", "yi-ma-hku", "yaodong-yu-us", "博士导师", "马毅官方学生名录列出 Yaodong Yu 为 2024 年 Berkeley CS 博士。", "Yaodong Yu · Reliable Representation Learning", 2024),
  { ...lineage("jordan-yaodong-coadviser", "michael-jordan-eu", "yaodong-yu-us", "共同博士导师", "Yaodong Yu 本人主页明确 Michael I. Jordan 与 Yi Ma 共同指导其 Berkeley 博士。", "Yaodong Yu · UC Berkeley PhD", 2024), source: sources.yaodongHome },
  lineage("yima-john-wright-phd", "yi-ma-hku", "john-wright-us", "博士导师", "马毅官方学生名录列出 John Wright 为 2009 年 UIUC ECE 博士。", "John Wright · Error Correction for High-Dimensional Data via Convex Optimization", 2009),
  lineage("yima-kun-huang-phd", "yi-ma-hku", "kun-huang-us", "博士导师", "马毅学生名录与 Kun Huang 的 IU 托管 CV 均明确记录该博士指导关系。", "Kun Huang · Geometric Principles of Visual Sensor Networks", 2004),
  lineage("yima-zihan-zhou-phd", "yi-ma-hku", "zihan-zhou-us", "博士导师", "马毅官方学生名录列出 Zihan Zhou 为 2012 年 UIUC ECE 博士。", "Zihan Zhou · Robust 3D Reconstruction of Urban Scenes", 2012),
];

export const yiMaNetworkPersonEnhancements: Record<string, Partial<Person>> = {
  "yi-ma-hku": {
    summary: "HKU 人工智能讲席教授、计算与数据科学学院及数据科学研究院创院负责人；从 3D 视觉、稀疏与低秩模型延伸到白盒深度网络、智能机器，并培养出跨学术界与产业界的长期谱系。",
    tags: ["HKU CDS", "HKU IDS", "BAIR", "高维数据", "3D 视觉", "稀疏表示", "白盒深度网络", "CPAL", "DGene"],
    knownAlumniCount: 16,
    facts: [
      { label: "当前任职", value: "HKU Chair Professor in AI；School of Computing and Data Science 与 Institute of Data Science 创院主任；Berkeley Visiting Professor。", source: sources.homepage },
      { label: "研究主线", value: "3D 计算机视觉、低维模型与高维数据、可扩展优化、稀疏/低秩表示，以及白盒深度网络与智能机器。", source: sources.biography },
      { label: "教育与学术训练", value: "清华自动化与应用数学双学位；UC Berkeley EECS/数学双硕士与 EECS 博士，博士导师 Shankar Sastry。", source: sources.biography },
      { label: "培养网络", value: "官方学生页公开 8 名当前博士生、4 名博士后/访问研究者及 16 名历届博士；学术界学生包括 John Wright、Kun Huang、Zihan Zhou、Haozhi Qi、Yaodong Yu。", source: sources.roster },
      { label: "研究共同体", value: "BAIR、HKU CDS/IDS，并共同发起 Conference on Parsimony and Learning (CPAL)。", source: sources.biography },
      { label: "产业与创业", value: "曾任 MSRA Visual Computing 研究经理、ByteDance Research Lab 高级顾问；共同创办 DGene，并参与多家视觉/生成式 AI 创业公司。", source: sources.biography },
      { label: "学术影响", value: "IEEE Fellow、ACM Fellow、SIAM Fellow；长期入选 Clarivate Highly Cited Researchers。", source: sources.biography },
    ],
    sources: [sources.homepage, sources.biography, sources.roster],
    lastVerifiedAt: checkedAt,
  },
};

export const yiMaNetworkGroupMembers: GroupMember[] = [
  ...["Chen Xu", "Chengyu Wang", "Tianzhe Chu", "Feng Chen", "Chun-Hsiao (Daniel) Yeh", "Ziyang Wu", "Druv Pai", "Brent Yi"].map((name, index) => ({ id: `yima-current-phd-${index + 1}`, teacherId: "yi-ma-hku", name, role: "PhD Student", focus: index < 4 ? "HKU CDS / IDS" : "UC Berkeley", source: sources.roster })),
  ...["Sam Buchanan", "Chong You", "Jason Chou", "Benjamin Haeffele"].map((name, index) => ({ id: `yima-postdoc-visitor-${index + 1}`, teacherId: "yi-ma-hku", name, role: "Postdoc / Visiting Researcher", source: sources.roster })),
];

const placement = (id: string, student: string, company: string, role: string, sector: StudentPlacement["sector"], degree: StudentPlacement["degree"], graduationYear?: number, highLevel?: boolean): StudentPlacement => ({
  id, student, teacherId: "yi-ma-hku", company, role, currentRole: `${role} · ${company}`, kind: "current", sector, degree, graduationYear, highLevel, source: sources.roster, verifiedAt: checkedAt,
});

export const yiMaNetworkPlacements: StudentPlacement[] = [
  placement("yima-simon-zhai-deepmind", "Simon Zhai", "Google DeepMind", "Researcher", "industry", "PhD", 2025),
  placement("yima-haozhi-uchicago", "Haozhi Qi", "University of Chicago / Amazon FAR", "Incoming Assistant Professor / Member of Technical Staff", "academia", "PhD", 2025, true),
  placement("yima-yaodong-umd", "Yaodong Yu", "University of Maryland / OpenAI", "Assistant Professor / Researcher", "academia", "PhD", 2024, true),
  placement("yima-yichao-apple", "Yichao Zhou", "Apple", "Researcher", "industry", "PhD", 2020),
  placement("yima-mingyang-alibaba", "Mingyang Li", "Alibaba", "Researcher", "industry", "PhD", 2022),
  placement("yima-chaobing-huawei", "Chaobing Song", "Huawei", "Researcher", "industry", "PhD", 2020),
  placement("yima-kerui-metasota", "Kerui Min", "MetaSOTA", "CEO", "startup", "PhD", undefined, true),
  placement("yima-zihan-pennstate", "Zihan Zhou", "Penn State", "Assistant Professor", "academia", "PhD", 2012),
  placement("yima-hossein-google", "Hossein Mobahi", "Google", "Senior Researcher", "industry", "PhD", 2012),
  placement("yima-arvind-founder", "Arvind Ganesh Balasubramanian", "Baazor / Google", "Founder", "startup", "PhD", 2012, true),
  placement("yima-andrew-belgium", "Andrew Wagner", "Belgium research", "Researcher", "other", "PhD", 2011),
  placement("yima-yoav-sc", "Yoav Sharon", "S&C Electric", "Researcher", "industry", "PhD", 2010),
  placement("yima-john-columbia", "John Wright", "Columbia University", "Associate Professor", "academia", "PhD", 2009, true),
  placement("yima-shankar-hrl", "Shankar Ramamohan Rao", "HRL Laboratories", "Senior Researcher", "industry", "PhD", 2009),
  placement("yima-wei-google", "Wei Hong", "Google", "Senior Researcher", "industry", "PhD", 2006),
  placement("yima-kun-indiana", "Kun Huang", "Indiana University", "Professor & Department Chair", "academia", "PhD", 2004, true),
];
