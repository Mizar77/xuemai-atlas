import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const rosters = {
  cuhk: source("CUHK CSE · Faculty", "https://www.cse.cuhk.edu.hk/people/faculty/", "official", "现任 CSE 教师名录"),
  cityu: source("CityU CS · Academic staff", "https://www.cs.cityu.edu.hk/people/academic-staff", "official", "现任 CS 教师名录"),
  polyu: source("PolyU COMP · Academic staff", "https://www.polyu.edu.hk/comp/people/academic-staff/", "official", "现任 COMP 教师名录"),
  sutd: source("SUTD ISTD · Faculty", "https://www.sutd.edu.sg/istd/people/faculty", "official", "现任 ISTD 教师名录"),
};

const profiles = {
  lo: source("CUHK · Eric Chi Lik Lo", "https://www.cse.cuhk.edu.hk/people/faculty/eric-chi-lik-lo/", "official", "现职、教育、产业履历、研究方向与官方头像"),
  xu: source("CUHK · Henry Hong Xu", "https://www.cse.cuhk.edu.hk/people/faculty/henry-hong-xu/", "official", "现职、教育、任职轨迹、研究方向与官方头像"),
  liShaohua: source("CUHK · Shaohua Li", "https://www.cse.cuhk.edu.hk/people/faculty/shaohuali/", "official", "现职、教育、研究方向、论文与官方头像"),
  lu: source("CUHK · Songtao Lu", "https://www.cse.cuhk.edu.hk/people/faculty/songtao-lu/", "official", "现职、教育、产业履历、研究方向、论文与官方头像"),
  meng: source("CUHK · Wei Meng", "https://www.cse.cuhk.edu.hk/people/faculty/wei-meng/", "official", "现职、教育、研究方向、论文与官方头像"),
  liYu: source("CUHK · Yu Li", "https://www.cse.cuhk.edu.hk/people/faculty/yu-li/", "official", "现职、教育、研究方向、研究组与官方头像"),
  hou: source("CityU · Junhui Hou", "https://scholars.cityu.edu.hk/en/persons/junhui-hou(1e5e437a-b84d-471d-af08-5f13a2d0b1c3).html", "official", "现职、教育、研究方向、荣誉与官方头像"),
  liu: source("PolyU · Ninghao Liu", "https://www.polyu.edu.hk/comp/people/academic-staff/prof-liu-ninghao/", "official", "现职、教育、任职轨迹、研究方向与官方头像"),
  kim: source("SUTD · Seungnyun Kim", "https://www.sutd.edu.sg/istd/profile/kim-seungnyun/", "official", "现职、教育、任职轨迹、研究方向与官方头像"),
};

const relationSources = {
  loThesis: source("ETH Systems Group · Eric Lo publications", "https://publications.systems.ethz.ch/author/280/Eric%20Lo", "thesis", "明确记录 Eric Lo 的 ETH 博士论文及导师 Gustavo Alonso"),
  xuPaper: source("HKUST Research Portal · Software-defined network assimilation", "https://researchportal.hkust.edu.hk/en/publications/software-defined-network-assimilation-bridging-the-last-mile-towa/", "publication", "完整作者列表包含 Hong Xu 与 Wei Wang"),
  liShaohuaPapers: source("CUHK · Shaohua Li publications", "https://www.cse.cuhk.edu.hk/people/faculty/shaohuali/", "official", "官方论文清单记录 Shaohua Li 与 Zhendong Su 多篇共同论文"),
  luPapers: source("CUHK · Songtao Lu publications", "https://www.cse.cuhk.edu.hk/people/faculty/songtao-lu/", "official", "官方论文清单记录 Songtao Lu 与 Mingyi Hong 的共同署名"),
  mengPapers: source("CUHK · Wei Meng publications", "https://www.cse.cuhk.edu.hk/people/faculty/wei-meng/", "official", "官方论文清单记录 Wei Meng 与 Wenke Lee 的共同署名"),
  liYuPaper: source("Nature Computational Science · GeneCompass", "https://www.nature.com/articles/s43588-025-00887-6", "publication", "完整作者与贡献声明记录 Yu Li、Irwin King 共同监督研究"),
  houPaper: source("CVF · Light Field Spatial Super-Resolution", "https://openaccess.thecvf.com/content_CVPR_2020/html/Jin_Light_Field_Spatial_Super-Resolution_via_Deep_Combinatorial_Geometry_Embedding_and_CVPR_2020_paper.html", "publication", "CVPR 论文页完整列出 Jing Jin、Junhui Hou、Jie Chen 与 Sam Kwong"),
  liuPapers: source("Ninghao Liu · Publications", "https://ninghaohello.github.io/PUBLICATION.html", "profile", "个人学术主页论文清单记录 Ninghao Liu 与 Xia Hu 的共同署名"),
  kimMit: source("MIT WINS Lab · Seungnyun Kim", "https://winslab.lids.mit.edu/people/seungnyun-kim/", "official", "MIT 博后履历与 SNU 教育经历"),
  kimPaper: source("SNU repository · AI-RAN paper", "https://s-space.snu.ac.kr/handle/10371/186844?mode=full", "publication", "SNU 机构仓储完整署名包含 Seungnyun Kim 与 Byonghyo Shim"),
};

type Spec = {
  id: string; name: string; role: string; institution: string; region: "Hong Kong" | "Singapore"; area: string;
  tags: string[]; summary: string; stage: "senior" | "emerging"; portrait: string; profile: Source; roster: Source;
  x: number; y: number; facts: ReturnType<typeof fact>[]; extras: Source[];
};

const person = (p: Spec): Person => ({
  id: p.id, name: p.name, role: p.role, institution: p.institution, region: p.region, area: p.area, tags: p.tags,
  summary: p.summary, category: "core", primary: true, stage: p.stage, status: "current independent PI · official profile verified",
  x: p.x, y: p.y, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
  portrait: { src: p.portrait, alt: `${p.name} 官方头像`, source: p.profile },
  sources: [p.profile, p.roster, ...p.extras], facts: p.facts,
});

export const candidatePriorityP0HkSgFourthRoundPeople2026: Person[] = [
  person({ id: "eric-lo-cuhk-p0-r4", name: "Eric Chi Lik Lo", role: "Associate Professor", institution: "CUHK", region: "Hong Kong", area: "AI Systems · Databases · Distributed Systems", tags: ["AI Systems", "Database Systems", "Distributed Systems", "AI for Science"], summary: "CUHK CSE 副教授，研究数据库、分布式系统、AI 系统与 AI for Science，并有 Google 工业经历。", stage: "senior", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/eric-lo.png", profile: profiles.lo, roster: rosters.cuhk, extras: [relationSources.loThesis], x: 120, y: 150, facts: [fact("当前任职", "CUHK CSE 副教授。", profiles.lo), fact("教育与学术训练", "在 ETH Zurich 获计算机科学博士。", profiles.lo), fact("产业与任职轨迹", "曾任 Google 软件工程师，并在 CUHK 持续开展数据库与系统研究。", profiles.lo), fact("研究主线", "研究 AI systems、数据库、分布式系统、超级计算与 AI for Science。", profiles.lo), fact("师承关系", "ETH Systems Group 论文页明确记录其博士论文由 Gustavo Alonso 指导。", relationSources.loThesis)] }),
  person({ id: "henry-hong-xu-cuhk-p0-r4", name: "Henry Hong Xu", role: "Associate Professor", institution: "CUHK", region: "Hong Kong", area: "Networking · Machine Learning Systems · Datacenter Networks", tags: ["Networking", "Machine Learning Systems", "Datacenter Networks", "Distributed Systems"], summary: "CUHK CSE 副教授，研究数据中心网络、网络化系统和机器学习系统。", stage: "senior", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/henry-xu.png", profile: profiles.xu, roster: rosters.cuhk, extras: [relationSources.xuPaper], x: 330, y: 150, facts: [fact("当前任职", "CUHK CSE 副教授。", profiles.xu), fact("教育与学术训练", "2007 年获 CUHK 工学学士，2009 与 2013 年在 University of Toronto 获 MASc 与 PhD。", profiles.xu), fact("任职轨迹", "2013–2020 年任职 City University of Hong Kong，后加入 CUHK。", profiles.xu), fact("研究主线", "研究数据中心网络、软件定义网络、分布式系统和机器学习系统。", profiles.xu), fact("合作关系", "HKUST 研究门户记录其与 Wei Wang 等共同发表软件定义网络研究。", relationSources.xuPaper)] }),
  person({ id: "shaohua-li-cuhk-p0-r4", name: "Shaohua Li", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong", area: "Programming Languages · Systems Security · AI Software", tags: ["Programming Languages", "Software Engineering", "Systems Security", "AI Software"], summary: "CUHK CSE 助理教授，从编程语言与系统安全切入 AI 软件栈的可靠性。", stage: "emerging", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/shaohua-li.png", profile: profiles.liShaohua, roster: rosters.cuhk, extras: [relationSources.liShaohuaPapers], x: 540, y: 150, facts: [fact("当前任职", "CUHK CSE 助理教授。", profiles.liShaohua), fact("教育与学术训练", "在 USTC 获学士、硕士，在 ETH Zurich 获 Doctor of Science。", profiles.liShaohua), fact("研究主线", "研究编程语言、系统安全、软件工程与 AI 软件栈。", profiles.liShaohua), fact("学术产出", "官方页面列出 PLDI、ASPLOS、OOPSLA 等系统与程序语言论文。", profiles.liShaohua), fact("合作关系", "CUHK 官方论文清单记录其与 Zhendong Su 多篇共同研究。", relationSources.liShaohuaPapers)] }),
  person({ id: "songtao-lu-cuhk-p0-r4", name: "Songtao Lu", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong", area: "Optimization · Machine Learning · Federated Learning", tags: ["Optimization", "Machine Learning", "Federated Learning", "AI Systems"], summary: "CUHK CSE 助理教授，研究机器学习优化、联邦学习与分布式智能。", stage: "emerging", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/songtao-lu.png", profile: profiles.lu, roster: rosters.cuhk, extras: [relationSources.luPapers], x: 750, y: 150, facts: [fact("当前任职", "CUHK CSE 助理教授。", profiles.lu), fact("教育与学术训练", "2018 年于 Iowa State University 获博士，随后在 University of Minnesota 从事博士后研究。", profiles.lu), fact("产业履历", "曾任 IBM Thomas J. Watson Research Center 高级研究科学家，并担任 MIT–IBM Watson AI Lab 项目 PI。", profiles.lu), fact("研究主线", "研究机器学习优化、分布式与联邦学习。", profiles.lu), fact("合作关系", "CUHK 官方论文清单记录其与 Mingyi Hong 共同署名优化研究。", relationSources.luPapers)] }),
  person({ id: "wei-meng-cuhk-p0-r4", name: "Wei Meng", role: "Assistant Professor · Computer Security Lab PI", institution: "CUHK", region: "Hong Kong", area: "Systems Security · Privacy · Web Security", tags: ["Cybersecurity", "Privacy", "Web Security", "Software Security"], summary: "CUHK CSE 助理教授、Computer Security Lab 负责人，研究系统安全、隐私与软件安全。", stage: "emerging", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/wei-meng.png", profile: profiles.meng, roster: rosters.cuhk, extras: [relationSources.mengPapers], x: 960, y: 150, facts: [fact("当前任职", "CUHK CSE 助理教授并领导 Computer Security Lab。", profiles.meng), fact("教育与学术训练", "2012 年在 Tsinghua University 获学士，2017 年在 Georgia Tech 获博士。", profiles.meng), fact("研究主线", "研究系统与软件安全、Web 安全和隐私。", profiles.meng), fact("学术产出", "官方页面列出 WWW、USENIX Security 等安全与网络研究。", profiles.meng), fact("合作关系", "CUHK 官方论文清单记录其与 Wenke Lee 共同发表恶意广告研究。", relationSources.mengPapers)] }),
  person({ id: "yu-li-cuhk-p0-r4", name: "Yu Li", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong", area: "Machine Learning · AI for Science · Bioinformatics", tags: ["Machine Learning", "AI for Science", "Bioinformatics", "Healthcare AI"], summary: "CUHK CSE 助理教授，以机器学习连接生物信息学、医疗健康与 AI for Science。", stage: "emerging", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/yu-li.png", profile: profiles.liYu, roster: rosters.cuhk, extras: [relationSources.liYuPaper], x: 1170, y: 150, facts: [fact("当前任职", "CUHK CSE 助理教授。", profiles.liYu), fact("教育与学术训练", "2015 年获 USTC 学士，2016 与 2020 年在 KAUST 获硕士和博士。", profiles.liYu), fact("研究主线", "研究机器学习及其在医疗、基因组学和生物信息学中的应用。", profiles.liYu), fact("研究组织", "官方页面公开其研究组、论文与学生招募信息。", profiles.liYu), fact("合作关系", "Nature Computational Science 的作者贡献声明记录 Yu Li 与 Irwin King 共同监督 GeneCompass 研究。", relationSources.liYuPaper)] }),
  person({ id: "junhui-hou-cityu-p0-r4", name: "Junhui Hou", chinese: "侯军辉", role: "Professor", institution: "CityU", region: "Hong Kong", area: "Computer Vision · 3D/4D Vision · Neural Spatial Computing", tags: ["Computer Vision", "3D Vision", "4D Vision", "Neural Spatial Computing"], summary: "CityU CS 教授，研究多维视觉计算、3D/4D 生成与神经空间计算。", stage: "senior", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/junhui-hou.png", profile: profiles.hou, roster: rosters.cityu, extras: [relationSources.houPaper], x: 250, y: 390, facts: [fact("当前任职", "CityU Department of Computer Science 教授。", profiles.hou), fact("教育与学术训练", "2009 年获 SCUT 工学学士，2012 年获 NPU 工学硕士，2016 年获 NTU 博士。", profiles.hou), fact("研究主线", "研究多维视觉计算、3D/4D 视觉生成与神经空间计算。", profiles.hou), fact("学术荣誉", "CityU 官方学者页记录其论文、资助与专业学术服务。", profiles.hou), fact("合作关系", "CVF 论文页记录其与 Jing Jin 等共同发表光场超分辨率研究。", relationSources.houPaper)] }),
  person({ id: "ninghao-liu-polyu-p0-r4", name: "Ninghao Liu", role: "Assistant Professor", institution: "PolyU", region: "Hong Kong", area: "Explainable AI · Foundation Models · Graph Mining", tags: ["Explainable AI", "Foundation Models", "Graph Mining", "Responsible AI"], summary: "PolyU COMP 助理教授，研究可解释与负责任 AI、基础模型和图数据挖掘。", stage: "emerging", portrait: "portraits/candidate-p0-hk-sg-fourth-round-2026/ninghao-liu.png", profile: profiles.liu, roster: rosters.polyu, extras: [relationSources.liuPapers], x: 510, y: 390, facts: [fact("当前任职", "PolyU COMP 助理教授；此前任 University of Georgia 助理教授。", profiles.liu), fact("教育与学术训练", "在 SCUT 获学士、Georgia Tech 获硕士、Texas A&M University 获博士。", profiles.liu), fact("研究主线", "研究可解释 AI、基础模型、图挖掘、公平性与推荐系统。", profiles.liu), fact("学术荣誉", "获 2025 Google Research Scholar Award。", profiles.liu), fact("合作关系", "个人学术主页论文清单记录其与 Xia Hu 共同署名 ICML Outstanding Paper G-Mixup。", relationSources.liuPapers)] }),
  person({ id: "seungnyun-kim-sutd-p0-r4", name: "Seungnyun Kim", role: "Assistant Professor", institution: "SUTD", region: "Singapore", area: "AI-native RAN · ISAC · 6G", tags: ["AI-native RAN", "ISAC", "6G", "Wireless AI"], summary: "SUTD ISTD 助理教授，研究 AI-native RAN、通感一体化与下一代无线网络。", stage: "emerging", portrait: "portraits/candidate-p0-hk-sg-second-round-2026/kimseungnyun.png", profile: profiles.kim, roster: rosters.sutd, extras: [relationSources.kimMit, relationSources.kimPaper], x: 810, y: 390, facts: [fact("当前任职", "2026 年 6 月起任 SUTD ISTD tenure-track 助理教授。", profiles.kim), fact("教育与学术训练", "2016 与 2023 年在 Seoul National University 获学士和博士。", profiles.kim), fact("任职轨迹", "加入 SUTD 前在 MIT LIDS/WINS Lab 从事博士后研究。", relationSources.kimMit), fact("研究主线", "研究 AI-native RAN、通感一体化、非地面网络与 6G。", profiles.kim), fact("合作关系", "SNU 机构仓储记录其与 Byonghyo Shim 共同署名 AI-RAN 研究。", relationSources.kimPaper)] }),
];

export const candidatePriorityP0HkSgFourthRoundSupportingPeople2026: Person[] = [
  { id: "wei-wang-hkust-p0-r4-support", name: "Wei Wang", role: "Research collaborator", institution: "HKUST", region: "Hong Kong", area: "Networking", tags: ["Networking"], summary: "Henry Hong Xu 的软件定义网络论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 1050, y: 700, sources: [relationSources.xuPaper], facts: [fact("合作关系", "HKUST 研究门户记录双方共同署名。", relationSources.xuPaper)] },
  { id: "mingyi-hong-p0-r4-support", name: "Mingyi Hong", role: "Research collaborator", institution: "External", region: "United States", area: "Optimization · Machine Learning", tags: ["Optimization", "Machine Learning"], summary: "Songtao Lu 的机器学习优化论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 1170, y: 700, sources: [relationSources.luPapers], facts: [fact("合作关系", "CUHK 官方论文清单记录双方共同署名。", relationSources.luPapers)] },
  { id: "wenke-lee-p0-r4-support", name: "Wenke Lee", role: "Research collaborator", institution: "Georgia Tech", region: "United States", area: "Cybersecurity", tags: ["Cybersecurity"], summary: "Wei Meng 的恶意广告研究合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 1290, y: 700, sources: [relationSources.mengPapers], facts: [fact("合作关系", "CUHK 官方论文清单记录双方共同署名。", relationSources.mengPapers)] },
  { id: "jing-jin-p0-r4-support", name: "Jing Jin", role: "Research collaborator", institution: "External", region: "Hong Kong", area: "Computer Vision", tags: ["Computer Vision", "Light Field"], summary: "Junhui Hou 的 CVPR 光场视觉论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 1410, y: 700, sources: [relationSources.houPaper], facts: [fact("合作关系", "CVF 论文页记录双方共同署名。", relationSources.houPaper)] },
  { id: "xia-hu-p0-r4-support", name: "Xia Hu", role: "Research collaborator", institution: "External", region: "United States", area: "Data Mining · Machine Learning", tags: ["Data Mining", "Machine Learning"], summary: "Ninghao Liu 的图机器学习论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 1530, y: 700, sources: [relationSources.liuPapers], facts: [fact("合作关系", "个人学术主页论文清单记录双方共同署名。", relationSources.liuPapers)] },
  { id: "byonghyo-shim-p0-r4-support", name: "Byonghyo Shim", role: "Research collaborator", institution: "Seoul National University", region: "External", area: "Wireless Communications · AI-RAN", tags: ["Wireless Communications", "AI-RAN"], summary: "Seungnyun Kim 的 SNU 机构仓储论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 1650, y: 700, sources: [relationSources.kimPaper], facts: [fact("合作关系", "SNU 机构仓储记录双方共同署名。", relationSources.kimPaper)] },
];

export const candidatePriorityP0HkSgFourthRoundRelationships2026: Relationship[] = [
  { id: "p0-hksg-r4-alonso-lo", from: "gustavo-alonso-eth-p0-2026", to: "eric-lo-cuhk-p0-r4", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "ETH Systems Group 论文页明确记录 Eric Lo 的博士论文由 Gustavo Alonso 指导。", evidenceObject: "Test Automation for Database Management Systems and Database Applications · doctoral dissertation", source: relationSources.loThesis, verified: true },
  { id: "p0-hksg-r4-xu-wang", from: "henry-hong-xu-cuhk-p0-r4", to: "wei-wang-hkust-p0-r4-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "HKUST 研究门户记录双方共同署名。", evidenceObject: "Software-defined network assimilation: Bridging the last mile towards centralized network configuration", source: relationSources.xuPaper, verified: true },
  { id: "p0-hksg-r4-li-su", from: "shaohua-li-cuhk-p0-r4", to: "zhendong-su-eth-p0-2026", type: "collaboration", subtype: "sustained_collaboration", label: "持续论文合作", evidence: "CUHK 官方论文清单记录两人多篇共同研究。", evidenceObject: "PLDI/ASPLOS/OOPSLA publication series", source: relationSources.liShaohuaPapers, verified: true },
  { id: "p0-hksg-r4-lu-hong", from: "songtao-lu-cuhk-p0-r4", to: "mingyi-hong-p0-r4-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CUHK 官方论文清单记录两人共同署名。", evidenceObject: "Machine-learning optimization publication listed on CUHK profile", source: relationSources.luPapers, verified: true },
  { id: "p0-hksg-r4-meng-lee", from: "wei-meng-cuhk-p0-r4", to: "wenke-lee-p0-r4-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CUHK 官方论文清单记录两人共同署名。", evidenceObject: "Understanding Malvertising Through Ad-Injecting Browser Extensions · WWW 2015", source: relationSources.mengPapers, verified: true, recentYear: 2015 },
  { id: "p0-hksg-r4-li-king", from: "yu-li-cuhk-p0-r4", to: "irwin-king", type: "collaboration", subtype: "sustained_collaboration", label: "共同监督研究", evidence: "Nature Computational Science 作者贡献声明记录 Yu Li 与 Irwin King 共同监督研究。", evidenceObject: "GeneCompass: deciphering universal gene regulatory mechanisms with a knowledge-informed cross-species foundation model", source: relationSources.liYuPaper, verified: true, recentYear: 2025 },
  { id: "p0-hksg-r4-hou-jin", from: "junhui-hou-cityu-p0-r4", to: "jing-jin-p0-r4-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CVF 论文页记录双方共同署名。", evidenceObject: "Light Field Spatial Super-Resolution via Deep Combinatorial Geometry Embedding and Structural Consistency Regularization · CVPR 2020", source: relationSources.houPaper, verified: true, recentYear: 2020 },
  { id: "p0-hksg-r4-liu-hu", from: "ninghao-liu-polyu-p0-r4", to: "xia-hu-p0-r4-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "个人学术主页论文清单记录双方共同署名。", evidenceObject: "G-Mixup: Graph Data Augmentation for Graph Classification · ICML 2022 Outstanding Paper", source: relationSources.liuPapers, verified: true, recentYear: 2022 },
  { id: "p0-hksg-r4-kim-shim", from: "seungnyun-kim-sutd-p0-r4", to: "byonghyo-shim-p0-r4-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "SNU 机构仓储记录双方共同署名。", evidenceObject: "AI-RAN publication deposited in SNU repository", source: relationSources.kimPaper, verified: true },
];

export const candidatePriorityP0HkSgFourthRoundRosterPromotions2026 = [
  [rosters.cuhk.url, "Eric Chi Lik Lo", "eric-lo-cuhk-p0-r4"],
  [rosters.cuhk.url, "Henry Hong Xu", "henry-hong-xu-cuhk-p0-r4"],
  [rosters.cuhk.url, "Shaohua Li", "shaohua-li-cuhk-p0-r4"],
  [rosters.cuhk.url, "Songtao Lu", "songtao-lu-cuhk-p0-r4"],
  [rosters.cuhk.url, "Wei Meng", "wei-meng-cuhk-p0-r4"],
  [rosters.cuhk.url, "Yu Li", "yu-li-cuhk-p0-r4"],
  [rosters.cityu.url, "Prof HOU, Junhui David 侯軍輝", "junhui-hou-cityu-p0-r4"],
  [rosters.polyu.url, "Prof. LIU Ninghao", "ninghao-liu-polyu-p0-r4"],
  [rosters.sutd.url, "KIM Seungnyun", "seungnyun-kim-sutd-p0-r4"],
].map(([unitUrl, rosterName, atlasPersonId]) => ({ unitUrl, rosterName, atlasPersonId }));

export const People = candidatePriorityP0HkSgFourthRoundPeople2026;
export const SupportingPeople = candidatePriorityP0HkSgFourthRoundSupportingPeople2026;
export const Relationships = candidatePriorityP0HkSgFourthRoundRelationships2026;
export const RosterPromotions = candidatePriorityP0HkSgFourthRoundRosterPromotions2026;
