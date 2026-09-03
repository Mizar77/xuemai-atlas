import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const cuhkCseRoster = source("CUHK CSE · Faculty roster", "https://www.cse.cuhk.edu.hk/people/faculty/", "official", "香港中文大学计算机系现任教师名录");
const cuhkEeRoster = source("CUHK EE · Academic staff", "https://www.ee.cuhk.edu.hk/en-gb/people/academic-staff", "official", "香港中文大学电子工程系现任教师名录");
const ntuRoster = source("NTU CCDS · Faculty roster", "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", "official", "南洋理工大学计算与数据科学学院现任教师名录");
const nusRoster = source("NUS Computing · Faculty roster", "https://www.comp.nus.edu.sg/about/faculty/", "official", "新加坡国立大学计算学院现任教师名录");

const chiProfile = source("CUHK CSE · Chi Wing Fu", "https://www.cse.cuhk.edu.hk/people/faculty/fu-chi-wing/", "official", "现任职务、教育训练、研究方向与官方头像");
const chiGroup = source("Chi Wing Fu · group and alumni", "https://www.cse.cuhk.edu.hk/~cwfu/", "profile", "课题组学生和公开校友去向");
const patrickProfile = source("CUHK CSE · Patrick P. C. Lee", "https://www.cse.cuhk.edu.hk/people/faculty/patrick-pc-lee/", "official", "现任职务、教育训练、研究方向与官方头像");
const patrickGroup = source("Patrick P. C. Lee · People", "https://www.cse.cuhk.edu.hk/~pclee/www/people.html", "profile", "现任学生及校友首份公开去向");
const qiangProfile = source("CUHK CSE · Qiang Xu", "https://www.cse.cuhk.edu.hk/people/faculty/qiang-xu/", "official", "现任职务、教育训练、研究方向与官方头像");
const qiangGroup = source("Qiang Xu · research group", "https://www.cse.cuhk.edu.hk/~qxu/research.htm", "profile", "课题组成员和毕业生名录");
const yixuanProfile = source("CUHK EE · Yixuan Yuan", "https://www.ee.cuhk.edu.hk/en-gb/people/academic-staff/professors/prof-yixuan-yuan", "official", "现任职务、教育训练、研究方向与官方头像");
const yixuanGroup = source("AIM Group · People", "https://www.ee.cuhk.edu.hk/~yxyuan/people/people.htm", "profile", "导师、博士后训练及当前博士生名录");
const shengchaoProfile = source("CUHK CSE · Shengchao Liu", "https://www.cse.cuhk.edu.hk/people/faculty/shengchao-liu/", "official", "现任职务、学术训练、研究方向与官方头像");
const shengchaoHome = source("Shengchao Liu · Academic homepage", "https://chao1224.github.io/", "profile", "博士导师、博士后导师与研究经历");
const yingzhenProfile = source("NTU Research · Yingzhen Li", "https://dr.ntu.edu.sg/entities/person/Yingzhen-Li", "official", "NTU 现任职务、研究方向、履历与官方头像");
const yingzhenHome = source("Yingzhen Li · Academic homepage", "https://yingzhenli.net/home/en/", "profile", "博士训练与研究主线");
const yingzhenGroup = source("Yingzhen Li · Group", "https://yingzhenli.net/home/en/?page_id=1411", "profile", "当前成员与校友去向");
const yuProfile = source("NTU Research · Yu Han", "https://dr.ntu.edu.sg/entities/person/Yu-Han", "official", "NTU 现任职务、博士训练、研究方向与官方头像");
const yuHome = source("Yu Han · Academic homepage", "https://personal.ntu.edu.sg/han.yu/", "profile", "课题组学生、产业经历与研究项目");
const alvinProfile = source("NTU Research · Alvin Chan Guo Wei", "https://dr.ntu.edu.sg/entities/person/Alvin-Chan-Guo-Wei", "official", "NTU 现任职务、研究方向与官方头像");
const alvinHome = source("Alvin Chan · Academic homepage", "https://www.alvinchan.io/", "profile", "研究主线与学术履历");
const alvinCv = source("Alvin Chan · CV", "https://www.alvinchan.io/files/cv.pdf", "cv", "博士导师与博士后导师");
const anjiProfile = source("NUS Computing · Anji Liu", "https://www.comp.nus.edu.sg/cs/people/liuaj", "official", "NUS 现任职务、研究方向与官方头像");
const anjiHome = source("Anji Liu · Academic homepage", "https://liuanji.github.io/", "profile", "教育训练、研究方向与履历");
const anjiCommencement = source("UCLA Engineering · 2025 PhD commencement program", "https://bpb-us-w2.wpmucdn.com/research.seas.ucla.edu/dist/6/32/files/2025/05/2025-Engr-Commencement-Program_PHD_as-of-05.27.pdf", "official", "Anji Liu 博士论文与导师 Guy Van den Broeck");
const tsuhanProfile = source("NUS Computing · Tsuhan Chen", "https://www.comp.nus.edu.sg/cs/people/tsuhan", "official", "NUS 现任职务、教育训练、研究方向与官方头像");
const tsuhanDiscovery = source("NUS Research · Tsuhan Chen", "https://discovery.nus.edu.sg/12786-tsuhan-chen", "official", "学术履历、研究主题与 NUS 身份");
const chaThesis = source("Cornell ECE · Cha Zhang PhD thesis", "https://chenlab.ece.cornell.edu/Publication/Cha/thesis_chazhang.pdf", "thesis", "Cha Zhang 博士论文及导师 Tsuhan Chen");
const guyProfile = source("UCLA Samueli · Guy Van den Broeck", "https://samueli.ucla.edu/people/guy-van-den-broeck/", "official", "Guy Van den Broeck 的 UCLA 教师身份");

export const candidatePriorityP0HkSgTailPeople2026: Person[] = [
  {
    id: "chi-wing-fu-cuhk-p0-tail", name: "Chi Wing Fu", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Computer Vision · 3D Vision · Human-Computer Interaction", tags: ["CV", "3D Vision", "HCI", "Graphics"],
    summary: "CUHK 计算机系教授，长期研究 3D 视觉、计算机图形学与人机交互，并公开维护学生及校友去向。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 160, y: 150,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/chi-wing-fu.png", alt: "Chi Wing Fu 官方头像", source: chiProfile },
    sources: [chiProfile, cuhkCseRoster, chiGroup],
    facts: [
      fact("当前任职", "香港中文大学计算机科学与工程学系教授。", chiProfile),
      fact("教育与学术训练", "在香港中文大学完成学士和硕士训练，随后于 Indiana University 获计算机博士学位。", chiProfile),
      fact("研究主线", "研究覆盖计算机图形学、3D 视觉、可视化与人机交互。", chiProfile),
      fact("学生与产业流动", "个人主页公开列出 Xing Jinbo 进入 Alibaba Tongyi、Wu Mengyang 进入 Huawei 等校友去向。", chiGroup),
    ],
  },
  {
    id: "patrick-lee-cuhk-p0-tail", name: "Patrick P. C. Lee", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Storage Systems · Distributed Systems · Cloud Computing", tags: ["Systems", "Storage", "Distributed Systems", "Cloud"],
    summary: "CUHK 计算机系教授，研究可靠存储、分布式系统和云计算，公开组员页记录了多名学生的产业去向。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 320, y: 150,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/patrick-lee.png", alt: "Patrick P. C. Lee 官方头像", source: patrickProfile },
    sources: [patrickProfile, cuhkCseRoster, patrickGroup],
    facts: [
      fact("当前任职", "香港中文大学计算机科学与工程学系教授。", patrickProfile),
      fact("教育与学术训练", "在香港中文大学取得 BEng、MPhil，随后于 Columbia University 获 PhD，并在 UMass Amherst 从事博士后研究。", patrickProfile),
      fact("研究主线", "研究重点为存储系统、分布式系统、云计算与数据可靠性。", patrickProfile),
      fact("学生与产业流动", "公开组员页记录 Yanjing Ren 进入 Alibaba、Jia Zhao 等校友进入 Huawei。", patrickGroup),
    ],
  },
  {
    id: "qiang-xu-cuhk-p0-tail", name: "Qiang Xu", role: "Professor · CURE Lab Director", institution: "CUHK", region: "Hong Kong",
    area: "AI Safety · Hardware Security · Trustworthy Computing", tags: ["AI Safety", "Hardware Security", "Trustworthy AI", "EDA"],
    summary: "CUHK CURE Lab 主任，横跨 AI 安全、可信计算和硬件安全，官方简介与课题组页均公开其学生体系。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 480, y: 150,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/qiang-xu.png", alt: "Qiang Xu 官方头像", source: qiangProfile },
    sources: [qiangProfile, cuhkCseRoster, qiangGroup],
    facts: [
      fact("当前任职", "香港中文大学计算机科学与工程学系教授，并领导 CURE Lab。", qiangProfile),
      fact("教育与学术训练", "在北京邮电大学完成本科和硕士训练，后于 McMaster University 获博士学位。", qiangProfile),
      fact("研究主线", "研究覆盖 AI 系统安全、硬件安全、可信计算与电子设计自动化。", qiangProfile),
      fact("学生体系", "官方简介称其已指导约二十篇博士论文，课题组页逐项列出当前成员与毕业生。", qiangProfile),
    ],
  },
  {
    id: "yixuan-yuan-cuhk-p0-tail", name: "Yixuan Yuan", chinese: "袁奕萱", role: "Associate Professor", institution: "CUHK", region: "Hong Kong",
    area: "Medical Image Analysis · AI for Healthcare", tags: ["Medical AI", "Medical Imaging", "Computer Vision", "Healthcare"],
    summary: "CUHK 电子工程系副教授，聚焦医学影像与医疗 AI，公开成员页同时给出导师训练和当前博士生。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 640, y: 150,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/yixuan-yuan.png", alt: "Yixuan Yuan 官方头像", source: yixuanProfile },
    sources: [yixuanProfile, cuhkEeRoster, yixuanGroup],
    facts: [
      fact("当前任职", "香港中文大学电子工程学系副教授。", yixuanProfile),
      fact("教育与学术训练", "本科毕业于 Northwestern Polytechnical University，在 CUHK 获博士学位，并于 Stanford 从事博士后研究。", yixuanProfile),
      fact("师承训练", "课题组页列出博士导师 Max Q.-H. Meng 及 Stanford 博士后导师 Lei Xing。", yixuanGroup),
      fact("研究主线", "研究医学影像分析、机器学习与人工智能辅助诊疗。", yixuanProfile),
    ],
  },
  {
    id: "shengchao-liu-cuhk-p0-tail", name: "Shengchao Liu", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "AI for Science · Geometric Deep Learning · Generative Models", tags: ["AI for Science", "Geometric DL", "Generative AI", "Molecules"],
    summary: "CUHK 计算机系助理教授，研究面向科学发现的几何深度学习与生成模型，师承和博士后训练链条公开。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 800, y: 150,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/shengchao-liu.png", alt: "Shengchao Liu 官方头像", source: shengchaoProfile },
    sources: [shengchaoProfile, cuhkCseRoster, shengchaoHome],
    facts: [
      fact("当前任职", "香港中文大学计算机科学与工程学系助理教授。", shengchaoProfile),
      fact("教育与学术训练", "2023 年在 Université de Montréal / Mila 完成博士训练，之后在 UC Berkeley 从事博士后研究。", shengchaoHome),
      fact("师承关系", "个人主页明确列出博士导师 Jian Tang，以及 Berkeley 博士后导师 Jennifer Chayes 与 Christian Borgs。", shengchaoHome),
      fact("研究主线", "研究 AI for science、几何深度学习、生成模型及分子表征。", shengchaoProfile),
    ],
  },
  {
    id: "yingzhen-li-ntu-p0-tail", name: "Yingzhen Li", role: "Associate Professor", institution: "NTU", region: "Singapore",
    area: "Probabilistic Machine Learning · Reliable AI", tags: ["Probabilistic ML", "Bayesian ML", "Reliable AI", "Generative Models"],
    summary: "NTU 计算与数据科学学院副教授，研究概率机器学习和可靠 AI，公开组员页给出学生及校友去向。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 160, y: 330,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/yingzhen-li.png", alt: "Yingzhen Li 官方头像", source: yingzhenProfile },
    sources: [yingzhenProfile, ntuRoster, yingzhenHome, yingzhenGroup],
    facts: [
      fact("当前任职", "南洋理工大学计算与数据科学学院副教授。", yingzhenProfile),
      fact("教育与学术训练", "在 University of Cambridge 完成机器学习博士训练，博士导师为 Richard E. Turner。", yingzhenHome),
      fact("研究主线", "研究概率机器学习、贝叶斯机器学习、生成模型与可靠人工智能。", yingzhenProfile),
      fact("任职轨迹", "曾在 Microsoft Research Cambridge 从事研究工作。", yingzhenProfile),
      fact("学生与产业流动", "课题组页列出 Wenxuan Yuan 等成员，并记录校友 Wenlong Chen 前往 Isomorphic Labs。", yingzhenGroup),
    ],
  },
  {
    id: "yu-han-ntu-p0-tail", name: "Yu Han", role: "Associate Professor", institution: "NTU", region: "Singapore",
    area: "Federated Learning · Trustworthy AI · Multi-agent Systems", tags: ["Federated Learning", "Trustworthy AI", "Multi-agent", "Privacy"],
    summary: "NTU 计算与数据科学学院终身副教授，研究可信联邦学习与多智能体系统，兼有 HP Labs 产业经历。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 320, y: 330,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/yu-han.png", alt: "Yu Han 官方头像", source: yuProfile },
    sources: [yuProfile, ntuRoster, yuHome],
    facts: [
      fact("当前任职", "南洋理工大学计算与数据科学学院终身副教授。", yuProfile),
      fact("教育与学术训练", "2014 年于南洋理工大学取得博士学位。", yuProfile),
      fact("任职轨迹", "加入 NTU 前曾在 HP Labs 从事产业研究。", yuProfile),
      fact("研究主线", "研究可信联邦学习、多智能体系统和隐私；个人主页列出 Hongyi Peng、Bo Zhao 等博士生。", yuHome),
    ],
  },
  {
    id: "alvin-chan-ntu-p0-tail", name: "Alvin Chan Guo Wei", role: "Assistant Professor", institution: "NTU", region: "Singapore",
    area: "AI for Drug Discovery · Precision Medicine", tags: ["AI for Science", "Drug Discovery", "Precision Medicine", "Machine Learning"],
    summary: "NTU 计算与数据科学学院和李光前医学院联合助理教授，研究面向药物发现与精准医疗的 AI。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 480, y: 330,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/alvin-chan.png", alt: "Alvin Chan Guo Wei 官方头像", source: alvinProfile },
    sources: [alvinProfile, ntuRoster, alvinHome, alvinCv],
    facts: [
      fact("当前任职", "在 NTU 计算与数据科学学院及李光前医学院担任联合助理教授。", alvinProfile),
      fact("教育与学术训练", "在 NTU 完成博士训练，博士导师为 Yew-Soon Ong，之后在 MIT 从事博士后研究。", alvinCv),
      fact("博士后训练", "个人 CV 列出 MIT 博士后导师 Giovanni Traverso。", alvinCv),
      fact("研究主线", "研究面向治疗发现、精准医学与生物医学问题的机器学习。", alvinProfile),
    ],
  },
  {
    id: "anji-liu-nus-p0-tail", name: "Anji Liu", role: "Presidential Young Professor · Assistant Professor", institution: "NUS", region: "Singapore",
    area: "Probabilistic AI · Generative Models · Neuro-symbolic Learning", tags: ["Probabilistic AI", "Generative AI", "Neuro-symbolic", "Reasoning"],
    summary: "NUS Presidential Young Professor，研究概率推理、生成模型与神经符号学习，UCLA 官方毕业材料可核验其博士导师。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 640, y: 330,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/anji-liu.png", alt: "Anji Liu 官方头像", source: anjiProfile },
    sources: [anjiProfile, nusRoster, anjiHome, anjiCommencement],
    facts: [
      fact("当前任职", "新加坡国立大学计算机科学系 Presidential Young Professor / Assistant Professor。", anjiProfile),
      fact("教育与学术训练", "2025 年于 UCLA 完成计算机科学博士训练。", anjiHome),
      fact("师承关系", "UCLA 工程学院 2025 博士毕业项目册列出其博士导师为 Guy Van den Broeck。", anjiCommencement),
      fact("研究主线", "研究概率人工智能、生成模型、神经符号学习与可靠推理。", anjiProfile),
    ],
  },
  {
    id: "tsuhan-chen-nus-p0-tail", name: "Tsuhan Chen", role: "Distinguished Professor", institution: "NUS", region: "Singapore",
    area: "Computer Vision · Machine Learning · Signal Processing", tags: ["Computer Vision", "Machine Learning", "Multimedia", "Signal Processing"],
    summary: "NUS Distinguished Professor，长期研究计算机视觉、多媒体与机器学习；Cornell 博士论文可核验其学生关系。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 800, y: 330,
    introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-2026/tsuhan-chen.png", alt: "Tsuhan Chen 官方头像", source: tsuhanProfile },
    sources: [tsuhanProfile, nusRoster, tsuhanDiscovery, chaThesis],
    facts: [
      fact("当前任职", "新加坡国立大学计算学院 Distinguished Professor，并共同领导 SIA-NUS Digital Aviation Corporate Laboratory。", tsuhanProfile),
      fact("教育与学术训练", "1993 年于 California Institute of Technology 获电气工程博士学位。", tsuhanProfile),
      fact("任职轨迹", "加入 NUS 前曾在 Cornell University 任教授并领导 Advanced Multimedia Processing Laboratory。", tsuhanProfile),
      fact("研究主线", "长期研究计算机视觉、多媒体、信号处理与机器学习。", tsuhanDiscovery),
      fact("学生体系", "Cha Zhang 的 Cornell 博士论文明确列出 Tsuhan Chen 为导师。", chaThesis),
    ],
  },
];

export const candidatePriorityP0HkSgTailSupportingPeople2026: Person[] = [
  {
    id: "guy-vdb-ucla-p0-tail-support", name: "Guy Van den Broeck", role: "Professor · PhD adviser", institution: "UCLA", region: "United States",
    area: "Probabilistic AI · Knowledge Representation", tags: ["Probabilistic AI", "Knowledge Representation"],
    summary: "UCLA 教授；作为 Anji Liu 博士导师接入本批师承关系。", category: "adjacent", primary: false,
    status: "adjacent verified adviser node", stage: "adjacent", x: 640, y: 520, lastVerifiedAt: checkedAt,
    sources: [guyProfile, anjiCommencement], facts: [
      fact("当前任职", "UCLA Samueli School of Engineering 教授。", guyProfile),
      fact("师承关系", "UCLA 官方博士毕业项目册列出 Guy Van den Broeck 为 Anji Liu 的博士导师。", anjiCommencement),
    ],
  },
  {
    id: "cha-zhang-tsuhan-p0-tail-support", name: "Cha Zhang", role: "PhD alumnus", institution: "External", region: "United States",
    area: "Multimedia · Signal Processing", tags: ["Multimedia", "Signal Processing"],
    summary: "Tsuhan Chen 的 Cornell 博士学生；用于连接可由论文一手核验的师承关系。", category: "adjacent", primary: false,
    status: "adjacent verified alumnus node", stage: "adjacent", x: 800, y: 520, lastVerifiedAt: checkedAt,
    sources: [chaThesis], facts: [
      fact("教育与学术训练", "在 Cornell University 完成博士论文，论文列出 Tsuhan Chen 为导师。", chaThesis),
      fact("师承关系", "博士论文致谢与论文元数据共同形成 Tsuhan Chen 指导关系的一手证据。", chaThesis),
    ],
  },
];

export const candidatePriorityP0HkSgTailRelationships2026: Relationship[] = [
  { id: "p0-hksg-tail-tang-liu", from: "jian-tang-ca", to: "shengchao-liu-cuhk-p0-tail", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Shengchao Liu 个人主页明确列出 Jian Tang 为其博士导师。", evidenceObject: "Université de Montréal / Mila PhD supervision", source: shengchaoHome, verified: true },
  { id: "p0-hksg-tail-ong-chan", from: "yew-soon-ong-ntu", to: "alvin-chan-ntu-p0-tail", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Alvin Chan 的个人 CV 明确列出 Yew-Soon Ong 为博士导师。", evidenceObject: "NTU PhD supervision", source: alvinCv, verified: true },
  { id: "p0-hksg-tail-guy-anji", from: "guy-vdb-ucla-p0-tail-support", to: "anji-liu-nus-p0-tail", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "UCLA 工程学院 2025 博士毕业项目册列出 Guy Van den Broeck 为 Anji Liu 的博士导师。", evidenceObject: "UCLA Computer Science PhD supervision", source: anjiCommencement, verified: true },
  { id: "p0-hksg-tail-tsuhan-cha", from: "tsuhan-chen-nus-p0-tail", to: "cha-zhang-tsuhan-p0-tail-support", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Cha Zhang 的 Cornell 博士论文列出 Tsuhan Chen 为导师。", evidenceObject: "Cornell ECE PhD thesis", source: chaThesis, verified: true },
];

export const candidatePriorityP0HkSgTailGroupMembers2026: GroupMember[] = [
  { id: "p0-hksg-tail-chi-zheng", teacherId: "chi-wing-fu-cuhk-p0-tail", name: "Zheng Hanyou", role: "PhD student", focus: "3D vision and graphics", source: chiGroup },
  { id: "p0-hksg-tail-patrick-qiu", teacherId: "patrick-lee-cuhk-p0-tail", name: "Qiu Shuting", role: "Graduate student", focus: "storage and distributed systems", source: patrickGroup },
  { id: "p0-hksg-tail-qiang-yannan", teacherId: "qiang-xu-cuhk-p0-tail", name: "Yannan Liu", role: "Research group member", focus: "AI and system security", source: qiangGroup },
  { id: "p0-hksg-tail-yixuan-yufan", teacherId: "yixuan-yuan-cuhk-p0-tail", name: "Yufan Hu", role: "PhD student", focus: "medical image analysis", source: yixuanGroup },
  { id: "p0-hksg-tail-yingzhen-wenxuan", teacherId: "yingzhen-li-ntu-p0-tail", name: "Wenxuan Yuan", role: "PhD student · NTU CCDS", focus: "probabilistic machine learning", source: yingzhenGroup },
  { id: "p0-hksg-tail-yu-hongyi", teacherId: "yu-han-ntu-p0-tail", name: "Hongyi Peng", role: "PhD student", focus: "trustworthy federated learning", source: yuHome },
];

export const candidatePriorityP0HkSgTailPlacements2026: StudentPlacement[] = [
  { id: "p0-hksg-tail-chi-xing", student: "Xing Jinbo", teacherId: "chi-wing-fu-cuhk-p0-tail", company: "Alibaba Tongyi", role: "Research / engineering", kind: "reported", sector: "industry", note: "Chi Wing Fu 个人主页公开记录的校友去向。", source: chiGroup, verifiedAt: checkedAt },
  { id: "p0-hksg-tail-patrick-ren", student: "Yanjing Ren", teacherId: "patrick-lee-cuhk-p0-tail", company: "Alibaba", role: "Research / engineering", kind: "reported", sector: "industry", note: "Patrick Lee 组员页公开记录的校友去向。", source: patrickGroup, verifiedAt: checkedAt },
  { id: "p0-hksg-tail-yingzhen-chen", student: "Wenlong Chen", teacherId: "yingzhen-li-ntu-p0-tail", company: "Isomorphic Labs", role: "Research", kind: "reported", sector: "industry", note: "Yingzhen Li 课题组页公开记录的校友去向。", source: yingzhenGroup, verifiedAt: checkedAt },
];

export const candidatePriorityP0HkSgTailRosterPromotions2026 = [
  { unitUrl: cuhkCseRoster.url, rosterName: "Chi Wing Fu", atlasPersonId: "chi-wing-fu-cuhk-p0-tail" },
  { unitUrl: cuhkCseRoster.url, rosterName: "Patrick P. C. Lee", atlasPersonId: "patrick-lee-cuhk-p0-tail" },
  { unitUrl: cuhkCseRoster.url, rosterName: "Qiang Xu", atlasPersonId: "qiang-xu-cuhk-p0-tail" },
  { unitUrl: cuhkEeRoster.url, rosterName: "Prof YUAN, Yixuan 袁奕萱", atlasPersonId: "yixuan-yuan-cuhk-p0-tail" },
  { unitUrl: cuhkCseRoster.url, rosterName: "Shengchao Liu", atlasPersonId: "shengchao-liu-cuhk-p0-tail" },
  { unitUrl: ntuRoster.url, rosterName: "Assoc Prof Yingzhen Li", atlasPersonId: "yingzhen-li-ntu-p0-tail" },
  { unitUrl: ntuRoster.url, rosterName: "Assoc Prof Yu Han", atlasPersonId: "yu-han-ntu-p0-tail" },
  { unitUrl: ntuRoster.url, rosterName: "Asst Prof Alvin Chan Guo Wei", atlasPersonId: "alvin-chan-ntu-p0-tail" },
  { unitUrl: nusRoster.url, rosterName: "Anji LIU", atlasPersonId: "anji-liu-nus-p0-tail" },
  { unitUrl: nusRoster.url, rosterName: "CHEN Tsuhan", atlasPersonId: "tsuhan-chen-nus-p0-tail" },
];

export const People = candidatePriorityP0HkSgTailPeople2026;
export const SupportingPeople = candidatePriorityP0HkSgTailSupportingPeople2026;
export const Relationships = candidatePriorityP0HkSgTailRelationships2026;
export const Placements = candidatePriorityP0HkSgTailPlacements2026;
export const GroupMembers = candidatePriorityP0HkSgTailGroupMembers2026;
export const RosterPromotions = candidatePriorityP0HkSgTailRosterPromotions2026;
export const people = People;
export const supportingPeople = SupportingPeople;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
