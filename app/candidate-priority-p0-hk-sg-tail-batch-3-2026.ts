import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const hkuRoster = source("HKU CDS · Academic staff", "https://www.cs.hku.hk/people/academic-staff", "official", "香港大学计算与数据科学学院现任教师名录");
const sutdRoster = source("SUTD ISTD · Faculty roster", "https://www.sutd.edu.sg/about/people/faculty/?pillar-cluster=11#general-listing", "official", "SUTD 信息系统技术与设计学院现任教师名录");
const sutdIstdRosterUrl = "https://www.sutd.edu.sg/istd/people/faculty";
const sutdAiRosterUrl = "https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/";

const hemingProfile = source("HKU CDS · Heming Cui", "https://www.cs.hku.hk/index.php/people/academic-staff/heming", "official", "现任职务、教育训练、研究方向与官方头像");
const hemingHome = source("Heming Cui · Academic homepage", "https://i.cs.hku.hk/~heming/", "profile", "博士导师、硕士导师、实验室成员及学生产业去向");
const chuanProfile = source("HKU CDS · Chuan Wu", "https://www.cs.hku.hk/index.php/people/academic-staff/cwu", "official", "现任职务、研究方向与官方头像");
const chuanHome = source("Chuan Wu · Academic homepage", "https://i.cs.hku.hk/~cwu/", "profile", "教育训练、研究方向与招生信息");
const chuanTeam = source("Chuan Wu · Team and alumni", "https://i.cs.hku.hk/~cwu/team.html", "profile", "当前博士生、博士毕业年份及首份职业去向");
const chenshuProfile = source("HKU CDS · Chenshu Wu", "https://www.cs.hku.hk/index.php/people/academic-staff/chenshu", "official", "现任职务、教育训练、研究方向与官方头像");
const chenshuLab = source("HKU AIoT Lab · People", "https://aiot.cs.hku.hk/people/", "profile", "当前成员、往届成员及公开职业去向");
const twlamProfile = source("HKU CDS · Tak-Wah Lam", "https://www.cs.hku.hk/index.php/people/academic-staff/twlam", "official", "现任职务、教育训练、研究方向与官方头像");
const twlamHome = source("Tak-Wah Lam · Academic homepage", "https://i.cs.hku.hk/~twlam", "profile", "完整学术履历、博士培养规模、博士毕业生及职业去向");
const royProfile = source("SUTD · Roy Lee", "https://www.sutd.edu.sg/profile/roy-lee", "official", "现任职务、教育训练、研究方向、官方头像与代表论文合作");
const songProfile = source("SUTD · Peng Song", "https://www.sutd.edu.sg/profile/song-peng", "official", "现任职务、教育训练、履历、研究方向、官方头像与代表论文合作");

export const candidatePriorityP0HkSgTailBatch3People2026: Person[] = [
  {
    id: "heming-cui-hku-p0-tail-b3", name: "Heming Cui", chinese: "崔鹤鸣", role: "Associate Professor", institution: "HKU", region: "Hong Kong",
    area: "AI Systems · Distributed Systems · Systems Security", tags: ["AI Systems", "Distributed Systems", "Systems Security", "Cloud Computing"],
    summary: "港大计算与数据科学学院副教授，领导系统软件实验室；其开源系统研究被华为可信智能云服务采用。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 150, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-3-2026/heming-cui.png", alt: "Heming Cui 官方头像", source: hemingProfile },
    sources: [hemingProfile, hkuRoster, hemingHome], facts: [
      fact("当前任职", "香港大学计算与数据科学学院副教授，并领导 HKU Systems Software Lab。", hemingProfile),
      fact("教育与学术训练", "在清华大学获得计算机学士、硕士学位；随后于 Columbia University 获博士学位。", hemingHome),
      fact("师承关系", "个人主页明确记录博士导师为 Junfeng Yang，清华硕士导师为 Yong Xiang。", hemingHome),
      fact("研究主线", "研究分布式系统、系统安全、区块链以及机器学习系统。", hemingProfile),
      fact("学生与产业流向", "实验室主页记录博士毕业生 Xusheng Chen、Cheng Wang 均进入华为。", hemingHome),
    ],
  },
  {
    id: "chuan-wu-hku-p0-tail-b3", name: "Chuan Wu", chinese: "吴川", role: "Professor", institution: "HKU", region: "Hong Kong",
    area: "Distributed Machine Learning · Cloud Computing · AI Agent Systems", tags: ["Distributed ML", "Cloud Computing", "AI Agents", "Optimization"],
    summary: "港大计算与数据科学学院教授，研究分布式机器学习、云计算与智能体系统，公开团队页持续记录学生去向。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 330, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-3-2026/chuan-wu.png", alt: "Chuan Wu 官方头像", source: chuanProfile },
    sources: [chuanProfile, hkuRoster, chuanHome, chuanTeam], facts: [
      fact("当前任职", "香港大学计算与数据科学学院教授。", chuanProfile),
      fact("教育与学术训练", "在清华大学计算机系获工学学士和硕士，并于 University of Toronto 电气与计算机工程系获博士学位。", chuanHome),
      fact("研究主线", "研究云计算、分布式机器学习系统与算法、养老智能技术和 AI agent systems。", chuanHome),
      fact("学生体系", "团队页列出 Yuran Sun、Ye Tian、Guangming Sheng 等在读博士生。", chuanTeam),
      fact("学生与产业流向", "团队页记录 Chenyu Jiang、Juntao Zhao 等博士毕业后首份工作进入 ByteDance。", chuanTeam),
    ],
  },
  {
    id: "chenshu-wu-hku-p0-tail-b3", name: "Chenshu Wu", chinese: "吴陈沭", role: "Associate Professor · Associate Head", institution: "HKU", region: "Hong Kong",
    area: "AIoT · Wireless Sensing · Mobile Computing", tags: ["AIoT", "Wireless Sensing", "Mobile Computing", "Ubiquitous Computing"],
    summary: "港大计算与数据科学学院副教授及计算机科学部副主任，领导 AIoT Lab，研究无线感知与智能物联网。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 510, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-3-2026/chenshu-wu.png", alt: "Chenshu Wu 官方头像", source: chenshuProfile },
    sources: [chenshuProfile, hkuRoster, chenshuLab], facts: [
      fact("当前任职", "香港大学计算与数据科学学院副教授，并任计算机科学部副主任。", chenshuProfile),
      fact("教育与学术训练", "于清华大学获得博士学位。", chenshuProfile),
      fact("研究主线", "研究无线感知、移动与泛在计算、物联网和 AIoT。", chenshuProfile),
      fact("学生体系", "AIoT Lab 人员页公开列出多名在读博士生及研究助理。", chenshuLab),
      fact("人才流动", "实验室往届成员页记录 Ruiming Huang、Wanting Liu、Yi Zhang 等加入华为。", chenshuLab),
    ],
  },
  {
    id: "tak-wah-lam-hku-p0-tail-b3", name: "Tak-Wah Lam", chinese: "林德华", role: "Professor · Deputy Director", institution: "HKU", region: "Hong Kong",
    area: "Algorithms · Bioinformatics · Compressed Indexing", tags: ["Algorithms", "Bioinformatics", "Compressed Indexing", "Computational Biology"],
    summary: "港大计算与数据科学学院教授及副主任，长期研究算法、生物信息学和压缩索引，并与基因组产业合作。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 690, y: 150, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-3-2026/tak-wah-lam.png", alt: "Tak-Wah Lam 官方头像", source: twlamProfile },
    sources: [twlamProfile, hkuRoster, twlamHome], facts: [
      fact("当前任职", "香港大学计算与数据科学学院教授及副主任。", twlamProfile),
      fact("教育与学术训练", "1984 年毕业于香港中文大学，随后在 University of Washington 获硕士和博士学位。", twlamHome),
      fact("任职轨迹", "1988 年博士毕业后加入香港大学；曾于 2001–2006 年任工程学院副院长。", twlamHome),
      fact("研究主线", "研究算法设计与分析、压缩文本索引、计算生物学和调度。", twlamHome),
      fact("学生与产业流向", "个人主页记录已培养 14 名博士；Dinghua Li 2017 年毕业后进入 TuSimple。", twlamHome),
    ],
  },
  {
    id: "roy-lee-sutd-p0-tail-b3", name: "Roy Ka-Wei Lee", role: "Associate Professor · Cheng Tsang Man Early Career Chair", institution: "SUTD", region: "Singapore",
    area: "Natural Language Processing · Social Computing · Data Mining", tags: ["NLP", "Social Computing", "Data Mining", "Machine Learning"],
    summary: "SUTD ISTD 副教授与早期职业讲席，研究社交计算、自然语言处理、数据挖掘和机器学习。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 240, y: 355, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-3-2026/roy-lee.png", alt: "Roy Lee 官方头像", source: royProfile },
    sources: [royProfile, sutdRoster], facts: [
      fact("当前任职", "SUTD ISTD 副教授、Cheng Tsang Man Early Career Chair Professor，并参与 Design and Artificial Intelligence 项目。", royProfile),
      fact("教育与学术训练", "在 Singapore Management University 完成本科、硕士和博士训练，2018 年获信息系统博士学位。", royProfile),
      fact("任职轨迹", "加入 SUTD 前曾任 University of Saskatchewan 计算机科学助理教授，并在 SMU 与 LARC 任职。", royProfile),
      fact("研究主线", "研究数据挖掘、机器学习、社交计算和自然语言处理。", royProfile),
      fact("合作关系", "SUTD 官方代表论文列表记录其与 Ee-Peng Lim 在数学文字题、用户身份链接等方向持续合作。", royProfile),
    ],
  },
  {
    id: "peng-song-sutd-p0-tail-b3", name: "Peng Song", chinese: "宋鹏", role: "Assistant Professor", institution: "SUTD", region: "Singapore",
    area: "Computer Graphics · Geometry Processing · Computational Design", tags: ["Computer Graphics", "Geometry Processing", "Computational Design", "3D Fabrication"],
    summary: "SUTD ISTD 助理教授，研究数字三维几何建模、处理、设计与制造，代表作发表于 SIGGRAPH 系列会议。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 480, y: 355, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-3-2026/peng-song.png", alt: "Peng Song 官方头像", source: songProfile },
    sources: [songProfile, sutdRoster], facts: [
      fact("当前任职", "SUTD ISTD 助理教授。", songProfile),
      fact("教育与学术训练", "在哈尔滨工业大学获学士和硕士学位，2013 年于 Nanyang Technological University 获计算机博士学位。", songProfile),
      fact("任职轨迹", "加入 SUTD 前曾任 EPFL 研究科学家、USTC 副研究员和 NTU 研究员。", songProfile),
      fact("研究主线", "研究计算机图形学，重点关注数字三维几何的建模、处理、计算设计和制造。", songProfile),
      fact("合作关系", "SUTD 官方代表论文列表记录其与 Chi-Wing Fu 共同发表多篇 SIGGRAPH / SIGGRAPH Asia 论文。", songProfile),
    ],
  },
];

export const candidatePriorityP0HkSgTailBatch3SupportingPeople2026: Person[] = [
  {
    id: "junfeng-yang-p0-tail-b3-support", name: "Junfeng Yang", role: "PhD adviser", institution: "Columbia", region: "United States",
    area: "Systems · Software Reliability", tags: ["Systems", "Software Reliability"], summary: "Heming Cui 的博士导师；该关系由 Heming Cui 个人主页直接记录。",
    category: "adjacent", primary: false, status: "verified adviser endpoint", stage: "adjacent", x: 150, y: 535, lastVerifiedAt: checkedAt,
    sources: [hemingHome], facts: [fact("师承关系", "Heming Cui 个人主页明确记录 Junfeng Yang 为其博士导师。", hemingHome)],
  },
  {
    id: "ee-peng-lim-p0-tail-b3-support", name: "Ee-Peng Lim", role: "Research collaborator", institution: "SMU", region: "Singapore",
    area: "Data Mining · Social Computing", tags: ["Data Mining", "Social Computing"], summary: "Roy Lee 的长期论文合作者；SUTD 官方代表论文列表提供直接证据。",
    category: "adjacent", primary: false, status: "verified collaborator endpoint", stage: "adjacent", x: 330, y: 535, lastVerifiedAt: checkedAt,
    sources: [royProfile], facts: [fact("合作关系", "SUTD 官方页面列出 Roy Lee 与 Ee-Peng Lim 共同署名的多篇论文。", royProfile)],
  },
];

export const candidatePriorityP0HkSgTailBatch3Relationships2026: Relationship[] = [
  { id: "p0-hksg-tail-b3-yang-cui", from: "junfeng-yang-p0-tail-b3-support", to: "heming-cui-hku-p0-tail-b3", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Heming Cui 个人主页明确说明其 Columbia 博士导师为 Junfeng Yang。", evidenceObject: "Columbia University PhD supervision", source: hemingHome, verified: true },
  { id: "p0-hksg-tail-b3-lee-lim", from: "roy-lee-sutd-p0-tail-b3", to: "ee-peng-lim-p0-tail-b3-support", type: "collaboration", subtype: "publication", label: "论文合作", evidence: "SUTD 官方代表论文列表记录两人在数学文字题、社交网络与用户身份链接方向的多篇共同论文。", evidenceObject: "IJCAI-PRICAI 2020 · ACL 2020 · TKDE", source: royProfile, verified: true, recentYear: 2020 },
  { id: "p0-hksg-tail-b3-song-fu", from: "peng-song-sutd-p0-tail-b3", to: "chi-wing-fu-cuhk-p0-tail", type: "collaboration", subtype: "publication", label: "图形学论文合作", evidence: "SUTD 官方代表论文列表记录 Peng Song 与 Chi-Wing Fu 多次共同发表 SIGGRAPH / SIGGRAPH Asia 论文。", evidenceObject: "Recursive Interlocking Puzzles · Reciprocal Frame Structures Made Easy · CofiFab", source: songProfile, verified: true, recentYear: 2017 },
];

export const candidatePriorityP0HkSgTailBatch3GroupMembers2026: GroupMember[] = [
  { id: "p0-hksg-tail-b3-cui-chen", teacherId: "heming-cui-hku-p0-tail-b3", name: "Xusheng Chen", role: "PhD alumnus", focus: "systems software", source: hemingHome },
  { id: "p0-hksg-tail-b3-chuan-sun", teacherId: "chuan-wu-hku-p0-tail-b3", name: "Yuran Sun", role: "PhD student · 2021–present", focus: "distributed machine learning systems", source: chuanTeam },
  { id: "p0-hksg-tail-b3-chenshu-huang", teacherId: "chenshu-wu-hku-p0-tail-b3", name: "Ruiming Huang", role: "Research assistant alumnus · 2024–2025", focus: "AIoT and wireless sensing", source: chenshuLab },
  { id: "p0-hksg-tail-b3-lam-li", teacherId: "tak-wah-lam-hku-p0-tail-b3", name: "Dinghua Li", role: "PhD alumnus · 2017", focus: "algorithms and bioinformatics", source: twlamHome },
];

export const candidatePriorityP0HkSgTailBatch3Placements2026: StudentPlacement[] = [
  { id: "p0-hksg-tail-b3-cui-chen-huawei", student: "Xusheng Chen", teacherId: "heming-cui-hku-p0-tail-b3", company: "Huawei", role: "Top Minds programme", kind: "first_job", sector: "industry", degree: "PhD", firstJob: "Huawei Top Minds programme", source: hemingHome, verifiedAt: checkedAt },
  { id: "p0-hksg-tail-b3-chuan-jiang-bytedance", student: "Chenyu Jiang", teacherId: "chuan-wu-hku-p0-tail-b3", company: "ByteDance", role: "First job", kind: "first_job", sector: "industry", degree: "PhD", graduationYear: 2025, firstJob: "ByteDance", source: chuanTeam, verifiedAt: checkedAt },
  { id: "p0-hksg-tail-b3-chenshu-huang-huawei", student: "Ruiming Huang", teacherId: "chenshu-wu-hku-p0-tail-b3", company: "Huawei", role: "Research / engineering", kind: "reported", sector: "industry", source: chenshuLab, verifiedAt: checkedAt },
  { id: "p0-hksg-tail-b3-lam-li-tusimple", student: "Dinghua Li", teacherId: "tak-wah-lam-hku-p0-tail-b3", company: "TuSimple", role: "First job", kind: "first_job", sector: "industry", degree: "PhD", graduationYear: 2017, firstJob: "TuSimple", source: twlamHome, verifiedAt: checkedAt },
];

export const candidatePriorityP0HkSgTailBatch3RosterPromotions2026 = [
  { unitUrl: hkuRoster.url, rosterName: "Cui, Heming 崔鶴鳴", atlasPersonId: "heming-cui-hku-p0-tail-b3" },
  { unitUrl: hkuRoster.url, rosterName: "Wu, Chuan 吳川", atlasPersonId: "chuan-wu-hku-p0-tail-b3" },
  { unitUrl: hkuRoster.url, rosterName: "Wu, Chenshu 吳陳沭", atlasPersonId: "chenshu-wu-hku-p0-tail-b3" },
  { unitUrl: hkuRoster.url, rosterName: "Lam, Tak-Wah 林德華", atlasPersonId: "tak-wah-lam-hku-p0-tail-b3" },
  // Promotion keys must match the frozen roster-unit URLs exactly. Roy Lee is
  // listed in both the ISTD faculty roster and the AI research-area roster.
  { unitUrl: sutdIstdRosterUrl, rosterName: "LEE Roy", atlasPersonId: "roy-lee-sutd-p0-tail-b3" },
  { unitUrl: sutdAiRosterUrl, rosterName: "LEE Roy", atlasPersonId: "roy-lee-sutd-p0-tail-b3" },
  { unitUrl: sutdIstdRosterUrl, rosterName: "SONG Peng", atlasPersonId: "peng-song-sutd-p0-tail-b3" },
];

export const People = candidatePriorityP0HkSgTailBatch3People2026;
export const SupportingPeople = candidatePriorityP0HkSgTailBatch3SupportingPeople2026;
export const Relationships = candidatePriorityP0HkSgTailBatch3Relationships2026;
export const GroupMembers = candidatePriorityP0HkSgTailBatch3GroupMembers2026;
export const Placements = candidatePriorityP0HkSgTailBatch3Placements2026;
export const RosterPromotions = candidatePriorityP0HkSgTailBatch3RosterPromotions2026;
export const people = People;
export const supportingPeople = SupportingPeople;
export const relationships = Relationships;
export const groupMembers = GroupMembers;
export const placements = Placements;
export const rosterPromotions = RosterPromotions;
