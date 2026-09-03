import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({
  label: ["教育训练", "学术训练", "教育与师承"].includes(label) ? "教育与学术训练" : label,
  value,
  source: proof,
});

const cuhkRoster = source("CUHK CSE · Faculty", "https://www.cse.cuhk.edu.hk/people/faculty/", "official", "现任 CSE 教师名录");
const youngProfile = source("CUHK CSE · Evangeline F.Y. Young", "https://www.cse.cuhk.edu.hk/people/faculty/evangeline-f-y-young/", "official", "现职、教育、研究方向、代表论文与官方头像");
const pickProfile = source("CUHK CSE · Lauren Pick", "https://www.cse.cuhk.edu.hk/people/faculty/Lauren-PICK/", "official", "现职、教育、研究方向、代表论文与官方头像");
const yangProfile = source("CUHK CSE · Ming-Chang Yang", "https://www.cse.cuhk.edu.hk/people/faculty/ming-chang-yang/", "official", "现职、教育、博士导师、履历、研究方向与官方头像");
const hoProfile = source("CUHK CSE · Tsung-Yi Ho", "https://www.cse.cuhk.edu.hk/people/faculty/tsung-yi-ho/", "official", "现职、教育、研究方向、代表论文与官方头像");
const liangProfile = source("CUHK CSE · Zhiding Liang", "https://www.cse.cuhk.edu.hk/people/faculty/Zhiding-Liang/", "official", "现职、教育、履历、研究方向、代表论文与官方头像");

const cityuRoster = source("CityUHK CS · Academic staff", "https://www.cs.cityu.edu.hk/people/academic-staff", "official", "现任 CS 教师名录");
const liProfile = source("CityUHK Scholars · Shuaicheng Li", "https://scholars.cityu.edu.hk/en/persons/shuaicheng-li(04c5b0fa-682a-4ccb-b14c-59bcb0d3d7b9).html", "official", "现职、教育、研究方向、项目、论文与官方履历");
const liPaper = source("CityUHK Scholars · SpecImmune paper", "https://scholars.cityu.edu.hk/en/publications/a-scalable-framework-for-comprehensive-typing-of-polymorphic-immu/", "publication", "论文完整作者名单与通讯作者身份");

const polyuRoster = source("PolyU COMP · Academic staff", "https://www.polyu.edu.hk/comp/people/academic-staff/", "official", "现任 COMP 教师名录");
const caoProfile = source("PolyU COMP · Jiannong Cao", "https://www.polyu.edu.hk/comp/people/academic-staff/prof-cao-jiannong/", "official", "现职、教育、研究方向、领导职务、产业项目与官方头像");
const caoPaper = source("IEEE Communications · Decentralized Digital Twin Networks", "https://doi.org/10.1109/mcom.002.2400739", "publication", "Jiannong Cao 与 Yinfeng Cao 的共同论文署名");
const sutdRoster = source("SUTD ISTD · Faculty", "https://www.sutd.edu.sg/istd/people/faculty", "official", "现任 ISTD 教师名录");
const chongProfile = source("SUTD · Ernest Chong", "https://www.sutd.edu.sg/istd/profile/ernest-chong/", "official", "现职、教育、博士导师、履历与官方头像");
const leCongProfile = source("SUTD · Thanh Le-Cong", "https://www.sutd.edu.sg/istd/profile/thanh-le-cong/", "official", "现职、教育、博士导师、研究方向与官方头像");
const sohProfile = source("SUTD · De Wen Soh", "https://www.sutd.edu.sg/istd/profile/soh-de-wen/", "official", "现职、教育、博士导师、研究方向与官方头像");
const zhaoProfile = source("SUTD · Ruochen Esther Zhao", "https://www.sutd.edu.sg/istd/profile/esther-zhao-ruochen/", "official", "现职、教育、博士导师、研究经历、研究方向与官方头像");

export const candidatePriorityP0HkSgSecondRoundPeople2026: Person[] = [
  {
    id: "evangeline-young-cuhk-p0-r2", name: "Evangeline F.Y. Young", role: "Chairman and Professor", institution: "CUHK", region: "Hong Kong",
    area: "AI · VLSI CAD · Combinatorial Optimization", tags: ["AI", "VLSI CAD", "Algorithms", "Optimization"],
    summary: "CUHK CSE 系主任、教授；研究 AI、VLSI 物理设计、算法与组合优化。",
    category: "core", primary: true, stage: "senior", status: "current independent PI · official profile verified", x: 140, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-ready-2026/evangeline-young.png", alt: "Evangeline F.Y. Young 官方头像", source: youngProfile }, sources: [youngProfile, cuhkRoster],
    facts: [
      fact("当前任职", "CUHK CSE 系主任、教授。", youngProfile),
      fact("教育训练", "在 CUHK 获计算机科学学士、哲学硕士，在 University of Texas at Austin 获博士学位。", youngProfile),
      fact("研究主线", "研究 VLSI CAD、算法、组合优化和人工智能。", youngProfile),
      fact("学术服务", "曾任 IEEE TCAD、ACM TODAES 等期刊编委，并服务 DAC、ICCAD、ISPD 等会议。", youngProfile),
      fact("合作关系", "CUHK 官方代表论文列表记录其与 Chris C.N. Chu 共同发表 floorplanning 研究。", youngProfile),
    ],
  },
  {
    id: "lauren-pick-cuhk-p0-r2", name: "Lauren Pick", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "Formal Methods · Program Synthesis · Machine Learning", tags: ["Formal Methods", "Program Synthesis", "Verification", "Machine Learning"],
    summary: "CUHK CSE 助理教授，研究自动验证与综合，并将其用于复杂软件系统的正确性保障。",
    category: "core", primary: true, stage: "emerging", status: "current independent PI · official profile verified", x: 300, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-ready-2026/lauren-pick.png", alt: "Lauren Pick 官方头像", source: pickProfile }, sources: [pickProfile, cuhkRoster],
    facts: [
      fact("当前任职", "CUHK CSE 助理教授。", pickProfile),
      fact("教育训练", "2022 年于 Princeton University 获博士学位。", pickProfile),
      fact("任职轨迹", "2022–2024 年为 Computing Innovation Fellow，期间隶属 UC Berkeley 与 University of Wisconsin–Madison。", pickProfile),
      fact("研究主线", "开发自动验证与综合算法，帮助理解并保证大型复杂软件系统的正确性。", pickProfile),
      fact("合作关系", "CUHK 官方代表论文列表记录其与 Abtin Molavi 合作 Qubit Mapping and Routing via MaxSAT。", pickProfile),
    ],
  },
  {
    id: "ming-chang-yang-cuhk-p0-r2", name: "Ming-Chang Yang", role: "Associate Professor · MASS Lab Director", institution: "CUHK", region: "Hong Kong",
    area: "Computer Architecture · Storage Systems · Emerging Memory", tags: ["Computer Architecture", "Storage", "Non-volatile Memory", "Systems"],
    summary: "CUHK CSE 副教授、MASS Lab 主任，研究新型非易失存储、内存与存储系统架构。",
    category: "core", primary: true, stage: "emerging", status: "current independent PI · official profile verified", x: 460, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-ready-2026/ming-chang-yang.png", alt: "Ming-Chang Yang 官方头像", source: yangProfile }, sources: [yangProfile, cuhkRoster],
    facts: [
      fact("当前任职", "CUHK CSE 副教授，并领导 Memory And Storage System Lab。", yangProfile),
      fact("教育训练", "在 National Chiao-Tung University 获学士，在 National Taiwan University 获硕士和博士学位。", yangProfile),
      fact("师承关系", "官方简介明确写明其硕士和博士阶段由 Tei-Wei Kuo 指导。", yangProfile),
      fact("任职轨迹", "曾在 University of Minnesota 访学，并在 Academia Sinica 任博士后。", yangProfile),
      fact("研究主线", "研究新型非易失存储技术、内存与存储系统及下一代体系结构。", yangProfile),
    ],
  },
  {
    id: "tsung-yi-ho-cuhk-p0-r2", name: "Tsung-Yi Ho", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Design Automation · Microfluidic Biochips · Machine Learning", tags: ["Design Automation", "Microfluidics", "Machine Learning", "Optimization"],
    summary: "CUHK CSE 教授，研究计算与新兴技术，重点包括微流控生物芯片设计自动化。",
    category: "core", primary: true, stage: "senior", status: "current independent PI · official profile verified", x: 620, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-ready-2026/tsung-yi-ho.png", alt: "Tsung-Yi Ho 官方头像", source: hoProfile }, sources: [hoProfile, cuhkRoster],
    facts: [
      fact("当前任职", "CUHK CSE 教授。", hoProfile),
      fact("教育训练", "2005 年于 National Taiwan University 获电气工程博士学位。", hoProfile),
      fact("研究主线", "研究计算与新兴技术，尤其关注微流控生物芯片设计自动化。", hoProfile),
      fact("国际经历", "曾获 JSPS 邀请学者、洪堡研究奖学金和 TUM Hans Fischer Fellowship。", hoProfile),
      fact("合作关系", "CUHK 官方代表论文列表记录其与 Krishnendu Chakrabarty 持续合作数字微流控生物芯片研究。", hoProfile),
    ],
  },
  {
    id: "zhiding-liang-cuhk-p0-r2", name: "Zhiding Liang", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "Quantum Computing · Computer Architecture · Machine Learning Systems", tags: ["Quantum Computing", "Architecture", "ML Systems", "Optimization"],
    summary: "CUHK CSE 助理教授，研究量子计算系统、体系结构与软硬件协同。",
    category: "core", primary: true, stage: "emerging", status: "current independent PI · official profile verified", x: 780, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-ready-2026/zhiding-liang.png", alt: "Zhiding Liang 官方头像", source: liangProfile }, sources: [liangProfile, cuhkRoster],
    facts: [
      fact("当前任职", "CUHK CSE 助理教授。", liangProfile),
      fact("教育训练", "2020 年于 University of Wisconsin–Madison 获学士，2024 年于 University of Notre Dame 获博士。", liangProfile),
      fact("任职轨迹", "2024–2025 年曾任 RPI CS 助理教授。", liangProfile),
      fact("研究主线", "研究量子计算、计算机体系结构与相关系统。", liangProfile),
      fact("合作关系", "CUHK 官方代表论文列表记录其与 Hanrui Wang 合作 Variational Quantum Pulse Learning。", liangProfile),
    ],
  },
  {
    id: "shuaicheng-li-cityu-p0-r2", name: "Shuaicheng Li", chinese: "李帅成", role: "Professor", institution: "CityU", region: "Hong Kong",
    area: "Bioinformatics · Machine Learning · Algorithms", tags: ["Bioinformatics", "Machine Learning", "Algorithms", "Computational Biology"],
    summary: "CityUHK 计算机科学与生物医学工程教授，研究生物信息学、机器学习与算法。",
    category: "core", primary: true, stage: "senior", status: "current independent PI · official profile verified", x: 300, y: 350, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-ready-2026/shuaicheng-li.png", alt: "Shuaicheng Li 官方头像", source: liProfile }, sources: [liProfile, cityuRoster, liPaper],
    facts: [
      fact("当前任职", "CityUHK 计算机科学系与生物医学工程系教授。", liProfile),
      fact("教育训练", "在 NUS 获学士、硕士，在 University of Waterloo 获博士学位。", liProfile),
      fact("研究主线", "研究生物信息学、机器学习和算法。", liProfile),
      fact("学术训练", "2009–2011 年获 NSERC 博士后奖学金并在 Berkeley 的 ICSI 开展研究。", liProfile),
      fact("合作关系", "CityUHK Scholars 的 SpecImmune 论文页记录其与 Shuai Wang 等共同署名，且李帅成为通讯作者。", liPaper),
    ],
  },
  {
    id: "jiannong-cao-polyu-p0-r2", name: "Jiannong Cao", chinese: "曹建农", role: "Vice President (Education) · Chair Professor", institution: "PolyU", region: "Hong Kong",
    area: "Distributed Systems · Big Data · Machine Learning", tags: ["Distributed Systems", "Big Data", "Machine Learning", "Edge Computing"],
    summary: "PolyU 副校长（教育）、数据科学讲席教授，领导 IMCL 与大数据分析研究设施。",
    category: "core", primary: true, stage: "senior", status: "current independent PI · official profile verified", x: 540, y: 350, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-ready-2026/jiannong-cao.png", alt: "Jiannong Cao 官方头像", source: caoProfile }, sources: [caoProfile, polyuRoster, caoPaper],
    facts: [
      fact("当前任职", "PolyU 副校长（教育）、Otto Poon Charitable Foundation 数据科学教授、分布式与移动计算讲席教授。", caoProfile),
      fact("教育训练", "在南京大学获学士，在 Washington State University 获硕士和博士学位。", caoProfile),
      fact("研究主线", "研究分布式系统与区块链、无线感知与网络、大数据与机器学习、移动云与边缘计算。", caoProfile),
      fact("领导经历", "领导 Internet and Mobile Computing Lab 及 PolyU University Research Facility in Big Data Analytics；曾任系主任。", caoProfile),
      fact("合作关系", "IEEE 出版记录显示其与 Yinfeng Cao 合作 Decentralized Digital Twin Networks。", caoPaper),
    ],
  },
  {
    id: "ernest-chong-sutd-p0-r2", name: "Ernest Chong", role: "Assistant Professor", institution: "SUTD", region: "Singapore",
    area: "Discrete Mathematics · Combinatorics · Coding Theory", tags: ["Discrete Mathematics", "Combinatorics", "Coding Theory", "Algorithms"],
    summary: "SUTD ISTD 助理教授，研究离散数学、组合学与编码理论。",
    category: "core", primary: true, stage: "emerging", status: "current independent PI · official profile verified", x: 180, y: 350, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-2026/chongernest.png", alt: "Ernest Chong 官方头像", source: chongProfile }, sources: [chongProfile, sutdRoster],
    facts: [
      fact("当前任职", "SUTD ISTD 助理教授。", chongProfile),
      fact("教育训练", "在 Cornell University 获数学学士、硕士和博士学位，2015 年完成博士。", chongProfile),
      fact("师承关系", "SUTD 官方简介明确记录其博士阶段由 Edward Swartz 指导。", chongProfile),
      fact("任职轨迹", "加入 SUTD 前曾任 A*STAR I²R 研究科学家，并在 NTU 任兼职助理教授。", chongProfile),
      fact("研究主线", "研究离散数学、组合学、编码理论与相关算法问题。", chongProfile),
    ],
  },
  {
    id: "thanh-le-cong-sutd-p0-r2", name: "Thanh Le-Cong", role: "Assistant Professor", institution: "SUTD", region: "Singapore",
    area: "AI for Software Engineering · Software Security", tags: ["AI for SE", "Software Security", "Trustworthy AI", "LLM"],
    summary: "SUTD ISTD 助理教授，研究 AI 驱动的软件工程、软件安全与可信 AI 系统。",
    category: "core", primary: true, stage: "emerging", status: "current independent PI · official profile verified", x: 380, y: 350, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-2026/lecongthanh.png", alt: "Thanh Le-Cong 官方头像", source: leCongProfile }, sources: [leCongProfile, sutdRoster],
    facts: [
      fact("当前任职", "SUTD ISTD 助理教授。", leCongProfile),
      fact("教育训练", "2026 年于 University of Melbourne 获博士学位。", leCongProfile),
      fact("师承关系", "SUTD 官方简介明确记录博士阶段由 Bach Le 与 Toby Murray 共同指导。", leCongProfile),
      fact("研究主线", "研究 AI-based software engineering、软件安全及可信可靠的 AI 软件系统。", leCongProfile),
      fact("学术认可", "2023 年获 Google PhD Fellowship。", leCongProfile),
    ],
  },
  {
    id: "de-wen-soh-sutd-p0-r2", name: "De Wen Soh", role: "Assistant Professor", institution: "SUTD", region: "Singapore",
    area: "Graphical Models · Federated Learning · Network Analytics", tags: ["Graphical Models", "Federated Learning", "Network Analytics", "AI"],
    summary: "SUTD ISTD 助理教授，研究图模型、联邦学习、网络分析与高维统计。",
    category: "core", primary: true, stage: "emerging", status: "current independent PI · official profile verified", x: 580, y: 350, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-2026/sohdewen.png", alt: "De Wen Soh 官方头像", source: sohProfile }, sources: [sohProfile, sutdRoster],
    facts: [
      fact("当前任职", "SUTD ISTD 助理教授。", sohProfile),
      fact("教育训练", "在 Stanford University 获数学学士，在 Yale University 获电气工程博士。", sohProfile),
      fact("师承关系", "SUTD 官方简介明确记录其博士阶段由 Sekhar Tatikonda 指导。", sohProfile),
      fact("研究主线", "研究图模型估计、图信号处理、网络分析、联邦学习与高维统计。", sohProfile),
      fact("任职轨迹", "2016 年加入 A*STAR Institute of High Performance Computing，从事机器学习与行业项目。", sohProfile),
    ],
  },
  {
    id: "esther-zhao-sutd-p0-r2", name: "Ruochen Esther Zhao", chinese: "赵若晨", role: "Assistant Professor", institution: "SUTD", region: "Singapore",
    area: "NLP · LLM Agents · Trustworthy AI", tags: ["NLP", "LLM", "AI Agents", "Trustworthy AI"],
    summary: "SUTD ISTD 助理教授，研究自然语言处理、可信大模型与可解释可靠的 LLM Agents。",
    category: "core", primary: true, stage: "emerging", status: "current independent PI · official profile verified", x: 780, y: 350, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-second-round-2026/zhaoruochenesther.png", alt: "Ruochen Esther Zhao 官方头像", source: zhaoProfile }, sources: [zhaoProfile, sutdRoster],
    facts: [
      fact("当前任职", "SUTD ISTD tenure-track 助理教授。", zhaoProfile),
      fact("教育训练", "在 NYU 获数学学士、Harvard University 获数据科学硕士、NTU 获人工智能博士。", zhaoProfile),
      fact("师承关系", "SUTD 官方简介明确记录其博士阶段由 Shafiq Joty 与 Aixin Sun 指导。", zhaoProfile),
      fact("产业经历", "曾在 Apple Singapore 与 Alibaba DAMO Academy 从事研究。", zhaoProfile),
      fact("研究主线", "研究 NLP 与 LLM，重点关注忠实性、可信性及可解释可靠的 LLM Agents。", zhaoProfile),
    ],
  },
];

export const candidatePriorityP0HkSgSecondRoundSupportingPeople2026: Person[] = [
  { id: "chris-chu-p0-r2-support", name: "Chris C.N. Chu", role: "Research collaborator", institution: "External", region: "United States", area: "VLSI CAD", tags: ["VLSI CAD"], summary: "Evangeline Young 的论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 110, y: 520, sources: [youngProfile], facts: [fact("合作关系", "CUHK 官方代表论文列表记录两人共同论文。", youngProfile)] },
  { id: "abtin-molavi-p0-r2-support", name: "Abtin Molavi", role: "Research collaborator", institution: "External", region: "United States", area: "Quantum Computing", tags: ["Quantum Computing"], summary: "Lauren Pick 的论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 240, y: 520, sources: [pickProfile], facts: [fact("合作关系", "CUHK 官方代表论文列表记录两人共同论文。", pickProfile)] },
  { id: "tei-wei-kuo-p0-r2-support", name: "Tei-Wei Kuo", role: "Master and PhD adviser", institution: "External", area: "Real-Time and Embedded Systems", tags: ["博士导师", "Embedded Systems"], summary: "Ming-Chang Yang 的硕士和博士导师。", category: "adjacent", primary: false, stage: "adjacent", x: 370, y: 520, sources: [yangProfile], facts: [fact("师承关系", "CUHK 官方简介明确写明 Tei-Wei Kuo 指导其硕士和博士阶段。", yangProfile)] },
  { id: "krishnendu-chakrabarty-p0-r2-support", name: "Krishnendu Chakrabarty", role: "Research collaborator", institution: "External", region: "United States", area: "Design Automation", tags: ["Design Automation"], summary: "Tsung-Yi Ho 的微流控生物芯片论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 500, y: 520, sources: [hoProfile], facts: [fact("合作关系", "CUHK 官方代表论文列表记录两人多篇共同论文。", hoProfile)] },
  { id: "hanrui-wang-p0-r2-support", name: "Hanrui Wang", role: "Research collaborator", institution: "External", region: "United States", area: "Quantum Computing Systems", tags: ["Quantum Computing"], summary: "Zhiding Liang 的量子计算论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 630, y: 520, sources: [liangProfile], facts: [fact("合作关系", "CUHK 官方代表论文列表记录两人共同论文。", liangProfile)] },
  { id: "shuai-wang-cityu-p0-r2-support", name: "Shuai Wang", role: "Research collaborator", institution: "CityU", region: "Hong Kong", area: "Bioinformatics", tags: ["Bioinformatics"], summary: "Shuaicheng Li 的 SpecImmune 论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 760, y: 520, sources: [liPaper], facts: [fact("合作关系", "CityUHK Scholars 论文页记录完整共同署名。", liPaper)] },
  { id: "yinfeng-cao-p0-r2-support", name: "Yinfeng Cao", role: "Research collaborator", institution: "External", area: "Digital Twin Networks", tags: ["Digital Twins"], summary: "Jiannong Cao 的数字孪生网络论文合作者。", category: "adjacent", primary: false, stage: "adjacent", x: 890, y: 520, sources: [caoPaper], facts: [fact("合作关系", "IEEE 出版页面记录两人共同论文。", caoPaper)] },
  { id: "edward-swartz-p0-r2-support", name: "Edward Swartz", role: "PhD adviser", institution: "External", region: "United States", area: "Mathematics · Combinatorics", tags: ["博士导师", "Combinatorics"], summary: "Ernest Chong 的 Cornell 博士导师。", category: "adjacent", primary: false, stage: "adjacent", x: 140, y: 650, sources: [chongProfile], facts: [fact("师承关系", "SUTD 官方简介明确记录 Edward Swartz 指导其博士。", chongProfile)] },
  { id: "bach-le-p0-r2-support", name: "Bach Le", role: "PhD co-adviser", institution: "External", region: "Europe", area: "Software Engineering", tags: ["博士导师", "Software Engineering"], summary: "Thanh Le-Cong 的博士共同导师。", category: "adjacent", primary: false, stage: "adjacent", x: 340, y: 650, sources: [leCongProfile], facts: [fact("师承关系", "SUTD 官方简介明确记录 Bach Le 为其博士共同导师。", leCongProfile)] },
  { id: "toby-murray-p0-r2-support", name: "Toby Murray", role: "PhD co-adviser", institution: "External", region: "Europe", area: "Software Security", tags: ["博士导师", "Software Security"], summary: "Thanh Le-Cong 的博士共同导师。", category: "adjacent", primary: false, stage: "adjacent", x: 480, y: 650, sources: [leCongProfile], facts: [fact("师承关系", "SUTD 官方简介明确记录 Toby Murray 为其博士共同导师。", leCongProfile)] },
  { id: "sekhar-tatikonda-p0-r2-support", name: "Sekhar Tatikonda", role: "PhD adviser", institution: "External", region: "United States", area: "Information Theory · Graphical Models", tags: ["博士导师", "Graphical Models"], summary: "De Wen Soh 的 Yale 博士导师。", category: "adjacent", primary: false, stage: "adjacent", x: 620, y: 650, sources: [sohProfile], facts: [fact("师承关系", "SUTD 官方简介明确记录 Sekhar Tatikonda 指导其博士。", sohProfile)] },
];

export const candidatePriorityP0HkSgSecondRoundRelationships2026: Relationship[] = [
  { id: "p0-hksg-r2-young-chu", from: "evangeline-young-cuhk-p0-r2", to: "chris-chu-p0-r2-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CUHK 官方代表论文列表记录两人共同发表 Twin Binary Sequences。", evidenceObject: "Twin Binary Sequences", source: youngProfile, verified: true },
  { id: "p0-hksg-r2-pick-molavi", from: "lauren-pick-cuhk-p0-r2", to: "abtin-molavi-p0-r2-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CUHK 官方代表论文列表记录两人共同发表 Qubit Mapping and Routing via MaxSAT。", evidenceObject: "Qubit Mapping and Routing via MaxSAT · MICRO 2022", source: pickProfile, verified: true, recentYear: 2022 },
  { id: "p0-hksg-r2-kuo-yang", from: "tei-wei-kuo-p0-r2-support", to: "ming-chang-yang-cuhk-p0-r2", type: "lineage", subtype: "phd_adviser", label: "硕博导师", evidence: "CUHK 官方简介明确写明其硕士和博士阶段由 Tei-Wei Kuo 指导。", evidenceObject: "NTU master and PhD supervision", source: yangProfile, verified: true },
  { id: "p0-hksg-r2-ho-chakrabarty", from: "tsung-yi-ho-cuhk-p0-r2", to: "krishnendu-chakrabarty-p0-r2-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CUHK 官方代表论文列表记录两人在数字微流控生物芯片方向的多篇共同论文。", evidenceObject: "Digital Microfluidic Biochips", source: hoProfile, verified: true },
  { id: "p0-hksg-r2-liang-wang", from: "zhiding-liang-cuhk-p0-r2", to: "hanrui-wang-p0-r2-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CUHK 官方代表论文列表记录两人共同发表 Variational Quantum Pulse Learning。", evidenceObject: "Variational Quantum Pulse Learning · QCE 2022", source: liangProfile, verified: true, recentYear: 2022 },
  { id: "p0-hksg-r2-li-wang", from: "shuaicheng-li-cityu-p0-r2", to: "shuai-wang-cityu-p0-r2-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "CityUHK Scholars 论文页记录两人共同署名 SpecImmune 论文，李帅成为通讯作者。", evidenceObject: "A Scalable Framework for Comprehensive Typing of Polymorphic Immune Genes from Long-Read Data", source: liPaper, verified: true, recentYear: 2026 },
  { id: "p0-hksg-r2-cao-cao", from: "jiannong-cao-polyu-p0-r2", to: "yinfeng-cao-p0-r2-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "IEEE Communications 出版页面记录两人共同署名。", evidenceObject: "Decentralized Digital Twin Networks", source: caoPaper, verified: true, recentYear: 2025 },
  { id: "p0-hksg-r2-swartz-chong", from: "edward-swartz-p0-r2-support", to: "ernest-chong-sutd-p0-r2", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "SUTD 官方简介明确记录 Ernest Chong 的 Cornell 博士由 Edward Swartz 指导。", evidenceObject: "Cornell University PhD supervision", source: chongProfile, verified: true },
  { id: "p0-hksg-r2-le-lecong", from: "bach-le-p0-r2-support", to: "thanh-le-cong-sutd-p0-r2", type: "lineage", subtype: "co_adviser", label: "博士共同导师", evidence: "SUTD 官方简介明确记录 Bach Le 为其博士共同导师。", evidenceObject: "University of Melbourne PhD co-supervision", source: leCongProfile, verified: true },
  { id: "p0-hksg-r2-murray-lecong", from: "toby-murray-p0-r2-support", to: "thanh-le-cong-sutd-p0-r2", type: "lineage", subtype: "co_adviser", label: "博士共同导师", evidence: "SUTD 官方简介明确记录 Toby Murray 为其博士共同导师。", evidenceObject: "University of Melbourne PhD co-supervision", source: leCongProfile, verified: true },
  { id: "p0-hksg-r2-tatikonda-soh", from: "sekhar-tatikonda-p0-r2-support", to: "de-wen-soh-sutd-p0-r2", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "SUTD 官方简介明确记录 De Wen Soh 的 Yale 博士由 Sekhar Tatikonda 指导。", evidenceObject: "Yale University PhD supervision", source: sohProfile, verified: true },
  { id: "p0-hksg-r2-joty-zhao", from: "shafiq-joty", to: "esther-zhao-sutd-p0-r2", type: "lineage", subtype: "co_adviser", label: "博士共同导师", evidence: "SUTD 官方简介明确记录其 NTU 博士由 Shafiq Joty 共同指导。", evidenceObject: "NTU PhD co-supervision", source: zhaoProfile, verified: true },
  { id: "p0-hksg-r2-sun-zhao", from: "aixin-sun", to: "esther-zhao-sutd-p0-r2", type: "lineage", subtype: "co_adviser", label: "博士共同导师", evidence: "SUTD 官方简介明确记录其 NTU 博士由 Aixin Sun 共同指导。", evidenceObject: "NTU PhD co-supervision", source: zhaoProfile, verified: true },
];

export const candidatePriorityP0HkSgSecondRoundRosterPromotions2026 = [
  { unitUrl: cuhkRoster.url, rosterName: "Evangeline F.Y. Young", atlasPersonId: "evangeline-young-cuhk-p0-r2" },
  { unitUrl: cuhkRoster.url, rosterName: "Lauren Pick", atlasPersonId: "lauren-pick-cuhk-p0-r2" },
  { unitUrl: cuhkRoster.url, rosterName: "Ming-Chang Yang", atlasPersonId: "ming-chang-yang-cuhk-p0-r2" },
  { unitUrl: cuhkRoster.url, rosterName: "Tsung-Yi Ho", atlasPersonId: "tsung-yi-ho-cuhk-p0-r2" },
  { unitUrl: cuhkRoster.url, rosterName: "Zhiding Liang", atlasPersonId: "zhiding-liang-cuhk-p0-r2" },
  { unitUrl: cityuRoster.url, rosterName: "Prof LI, Shuaicheng 李帥成", atlasPersonId: "shuaicheng-li-cityu-p0-r2" },
  { unitUrl: polyuRoster.url, rosterName: "Prof. CAO Jiannong", atlasPersonId: "jiannong-cao-polyu-p0-r2" },
  { unitUrl: sutdRoster.url, rosterName: "CHONG Ernest", atlasPersonId: "ernest-chong-sutd-p0-r2" },
  { unitUrl: sutdRoster.url, rosterName: "LE-CONG Thanh", atlasPersonId: "thanh-le-cong-sutd-p0-r2" },
  { unitUrl: sutdRoster.url, rosterName: "SOH De Wen", atlasPersonId: "de-wen-soh-sutd-p0-r2" },
  { unitUrl: sutdRoster.url, rosterName: "ZHAO Ruochen Esther", atlasPersonId: "esther-zhao-sutd-p0-r2" },
];

export const People = candidatePriorityP0HkSgSecondRoundPeople2026;
export const SupportingPeople = candidatePriorityP0HkSgSecondRoundSupportingPeople2026;
export const Relationships = candidatePriorityP0HkSgSecondRoundRelationships2026;
export const RosterPromotions = candidatePriorityP0HkSgSecondRoundRosterPromotions2026;
