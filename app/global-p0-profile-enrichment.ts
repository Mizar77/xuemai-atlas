import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

type PersonEnhancement = Partial<Pick<Person, "summary" | "tags" | "facts" | "sources" | "lastVerifiedAt" | "status">>;

const checkedAt = "2026-08-31";
const official = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });
const profile = (label: string, url: string, supports: string): Source => ({ label, url, kind: "profile", checkedAt, supports });
const cv = (label: string, url: string, supports: string): Source => ({ label, url, kind: "cv", checkedAt, supports });

const jordanBerkeley = official("UC Berkeley EECS — Michael I. Jordan", "https://www2.eecs.berkeley.edu/Faculty/Homepages/jordan.html", "荣休教授身份、教育、MIT 与 Berkeley 轨迹、研究领域");
const jordanInria = official("Inria Markets and Machine Learning Chair", "https://www.inria.fr/en/new-research-chair-bringing-together-economics-and-artificial-intelligence", "Inria 研究主席与项目定位");
const zoubinCambridge = official("Cambridge MLG — Zoubin Ghahramani", "https://mlg.eng.cam.ac.uk/people/zoubin-ghahramani/", "现职、教育、Toronto 博后、Gatsby 创始教师与研究");
const zoubinCv = cv("Cambridge-hosted CV — Zoubin Ghahramani", "https://mlg.eng.cam.ac.uk/zoubin/fullcv.pdf", "MIT 博士导师与完整职业轨迹");
const zoubinAdmissions = profile("Zoubin Ghahramani homepage — PhD admissions", "https://mlg.eng.cam.ac.uk/zoubin/", "公开博士申请入口、组员与研究共同体");
const zissermanOxford = official("Oxford Engineering — Andrew Zisserman", "https://eng.ox.ac.uk/people/andrew-zisserman", "现职与 VGG 身份");
const zissermanVgg = profile("Oxford VGG — Andrew Zisserman", "https://robots.ox.ac.uk/~az/", "VGG 领导、视觉研究与代表性工作");
const cremersTum = official("TUM Computer Vision Group — Daniel Cremers", "https://cvg.cit.tum.de/members/cremers", "现职、教育、完整职业轨迹、研究与创业");
const cremersCv = cv("TUM-hosted CV — Daniel Cremers", "https://cvg.cit.tum.de/_media/members/cremers/daniel_cremers_cv.pdf", "MCML、ELLIS Munich、MDSI 与职业服务");
const dayanMpg = official("Max Planck Society — Peter Dayan", "https://www.mpg.de/12309370/biological-cybernetics-dayan", "教育、Salk/Toronto/MIT/Gatsby/MPI 轨迹与研究");
const hintonPostdocs = profile("Geoffrey Hinton — former postdocs", "https://www.cs.utoronto.ca/~hinton/postdocs.html", "Peter Dayan 的 Toronto 博士后谱系");
const yiHku = official("HKU AI — Yi Ma biography", "https://ai.hku.hk/people/academic-staff/mayi/biography", "教育、UIUC/MSRA/ByteDance 与研究轨迹");
const yiIds = official("HKU IDS — Yi Ma", "https://datascience.hku.hk/people/yi-ma/", "HKU 领导职务、Berkeley 任职与代表性职业轨迹");
const tongHkust = official("HKUST Mathematics — Tong Zhang", "https://www.math.hkust.edu.hk/people/faculty/profile/tongzhang/", "现职、Stanford 博士与研究方向");
const tongHome = profile("Tong Zhang homepage", "https://tongzhang-ml.org/", "研究成果与公开联系方式");
const hsuNus = official("NUS Computing — David Hsu", "https://www.comp.nus.edu.sg/cs/people/dyhsu/", "教育、现职、NUSAIL/SSI、研究与职业服务");
const hsuNusgs = official("NUS Graduate School — David Hsu thesis adviser", "https://nusgs.nus.edu.sg/thesis-advisors/dcsdavid", "研究生导师入口、Adaptive Computing Lab 与研究方向");
const hsuSsi = official("NUS Smart Systems Institute", "https://ssi.nus.edu.sg/", "SSI 领导与 AdaComp/具身智能共同体");
const yanNus = official("NUS Computing — Shuicheng Yan", "https://www.comp.nus.edu.sg/cs/people/yansc/", "教育、现职、Sea 经历、研究和团队成果");
const yanLab = profile("Learning and Vision Lab", "https://www.lv-lab.org/", "研究共同体与公开团队页面");
const tsangAstar = official("A*STAR CFAR — Ivor Tsang", "https://www.a-star.edu.sg/cfar/about-cfar/management/prof-ivor-tsang", "现职、UTS/AAII 轨迹、研究和学术服务");
const tsangStudents = official("A*STAR CFAR — affiliated PhD students", "https://www.a-star.edu.sg/cfar/talent/affiliated-phd-students", "当前博士生网络与公开联系入口");
const hoiSmu = official("SMU Faculty Directory — Steven Hoi", "https://faculty.smu.edu.sg/profile/steven-hoi-6686", "现职、CUHK 博士与研究方向");
const hoiCv = cv("SMU-hosted CV — Steven Hoi", "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2023-08/HOI-Steven-2023-cv.pdf", "清华/CUHK 教育与 NTU、SMU 任职轨迹");
const hoiThesis = official("CUHK-hosted doctoral thesis — Steven Hoi", "https://www.cse.cuhk.edu.hk/~lyu/student/phd/steven/hoi_term_2005.pdf", "Michael R. Lyu 博士指导关系");
const russellBerkeley = official("UC Berkeley EECS — Stuart Russell", "https://www2.eecs.berkeley.edu/Faculty/Homepages/russell.html", "现职、教育、CHAI/Kavli 领导与研究");
const russellChai = official("Berkeley CHAI — people", "https://chai.berkeley.edu/people", "研究共同体、当前学生与指导关系");
const russellJobs = official("Berkeley CHAI — work with us", "https://chai.berkeley.edu/jobs", "Research Fellowship、collaborator 与 internship 招募入口");
const russellRugs = profile("RUGS — Russell's Unusual Group of Students", "https://people.eecs.berkeley.edu/~russell/rugs.html", "当前与历届组员及公开职业去向");

const noStandingRecruitment = (source: Source) => ({
  label: "招生公开状态",
  value: "本轮核验的官方个人/研究组页面未给出持续有效的个人招生承诺；申请前应以院系当期招生通知和导师回复为准。",
  source,
});

export const globalP0PersonEnhancements: Record<string, PersonEnhancement> = {
  "michael-jordan-eu": {
    summary: "Inria Markets and Machine Learning Chair 科学负责人、Berkeley 荣休教授；其工作连接统计学习、决策系统、经济机制与概率建模。",
    tags: ["UCSD PhD", "MIT 1988–1998", "Berkeley", "Inria", "统计机器学习"],
    facts: [
      { label: "教育", value: "Louisiana State 心理学学士、Arizona State 数学硕士、UC San Diego 认知科学博士（1985）", source: jordanBerkeley },
      { label: "职业轨迹", value: "MIT 教授（1988–1998）→ Berkeley EECS/Statistics → Berkeley 荣休教授与 Inria 研究主席", source: jordanBerkeley },
      { label: "研究共同体", value: "Inria Markets and Machine Learning Chair：把机器学习、统计、决策与经济系统联系起来", source: jordanInria },
      noStandingRecruitment(jordanBerkeley),
    ], sources: [jordanBerkeley, jordanInria], lastVerifiedAt: checkedAt,
  },
  "zoubin-ghahramani-eu": {
    summary: "Cambridge 概率机器学习带头人；MIT 博士师从 Michael I. Jordan 与 Tomaso Poggio，后在 Toronto 与 Geoffrey Hinton 开展博士后研究。",
    tags: ["Michael I. Jordan", "Tomaso Poggio", "Geoffrey Hinton", "Gatsby", "Cambridge MLG"],
    facts: [
      { label: "教育 / 师承", value: "University of Pennsylvania 双学位；MIT 认知神经科学博士（1995），Michael I. Jordan 主导师、Tomaso Poggio 共同指导", source: zoubinCv },
      { label: "职业轨迹", value: "Toronto 博士后（与 Geoffrey Hinton）→ Gatsby 创始教师 → Cambridge Information Engineering 教授", source: zoubinCambridge },
      { label: "研究共同体", value: "Cambridge Machine Learning Group；早期参与创建 UCL Gatsby Computational Neuroscience Unit", source: zoubinCambridge },
      { label: "招生公开状态", value: "个人主页保留 Cambridge Machine Learning Group 的 PhD admissions 入口；是否有名额仍以当期院系流程为准。", source: zoubinAdmissions },
    ], sources: [zoubinCambridge, zoubinCv, zoubinAdmissions], lastVerifiedAt: checkedAt,
  },
  "andrew-zisserman-eu": {
    summary: "Oxford Royal Society Research Professor、Visual Geometry Group 资深带头人，长期推动多视图几何、识别、视频理解与大规模视觉表示。",
    tags: ["Oxford VGG", "视觉几何", "视频理解", "Royal Society Research Professor"],
    facts: [
      { label: "当前任职", value: "Oxford Professor、Royal Society Research Professor、Visual Geometry Group Principal Researcher", source: zissermanOxford },
      { label: "研究共同体", value: "Oxford Visual Geometry Group（VGG）", source: zissermanVgg },
      { label: "代表性主线", value: "多视图几何、视觉识别与视频理解；VGG 系列工作形成广泛方法与人才影响", source: zissermanVgg },
      noStandingRecruitment(zissermanOxford),
    ], sources: [zissermanOxford, zissermanVgg], lastVerifiedAt: checkedAt,
  },
  "daniel-cremers-eu": {
    summary: "TUM Computer Vision & AI Chair，连接 CVG、MCML、MDSI 与 ELLIS Munich；研究覆盖 3D 视觉、SLAM、深度学习、机器人和优化。",
    tags: ["TUM CVG", "MCML", "ELLIS Munich", "MDSI", "3D Vision"],
    facts: [
      { label: "教育", value: "Heidelberg 数学/物理本科与理论物理硕士；University of Mannheim 计算机科学博士（2002）", source: cremersTum },
      { label: "职业轨迹", value: "UCLA 博士后 → Siemens Corporate Research → Bonn 副教授 → TUM Chair（2009–）", source: cremersTum },
      { label: "研究共同体", value: "TUM Computer Vision Group；MCML、MDSI 与 ELLIS Munich 联合创办/协调节点", source: cremersCv },
      { label: "产业连接", value: "官方简介记录其担任多家创业公司的联合创办人、顾问与天使投资人", source: cremersTum },
      noStandingRecruitment(cremersTum),
    ], sources: [cremersTum, cremersCv], lastVerifiedAt: checkedAt,
  },
  "peter-dayan-eu": {
    summary: "Max Planck Institute for Biological Cybernetics 计算神经科学主任，把强化学习、神经调制、精神健康和行为决策连成一条方法主线。",
    tags: ["Geoffrey Hinton network", "Gatsby co-founder", "强化学习", "计算神经科学"],
    facts: [
      { label: "教育", value: "Cambridge 数学；University of Edinburgh 博士", source: dayanMpg },
      { label: "职业轨迹", value: "Salk / Toronto 博士后 → MIT 助理教授 → Gatsby 共同创办人与主任 → Max Planck 主任（2018–）", source: dayanMpg },
      { label: "博士后谱系", value: "Geoffrey Hinton 官方历届博士后名单列出 Peter Dayan", source: hintonPostdocs },
      { label: "研究共同体", value: "MPI Computational Neuroscience；曾领导 UCL Gatsby Computational Neuroscience Unit", source: dayanMpg },
      noStandingRecruitment(dayanMpg),
    ], sources: [dayanMpg, hintonPostdocs], lastVerifiedAt: checkedAt,
  },
  "yi-ma-hku": {
    summary: "HKU 人工智能讲席教授及计算与数据科学学院、数据科学研究院负责人；职业网络横跨 Berkeley、UIUC、MSRA、ShanghaiTech、ByteDance 与 HKU。",
    tags: ["Tsinghua", "Berkeley PhD", "MSRA", "ShanghaiTech", "ByteDance", "HKU IDS"],
    facts: [
      { label: "教育", value: "清华自动化与应用数学双学位（1995）；UC Berkeley EECS/数学双硕士与 EECS 博士（2000）", source: yiHku },
      { label: "职业轨迹", value: "UIUC faculty → MSRA Visual Computing → ShanghaiTech 执行院长 → Berkeley → HKU 学术领导", source: yiIds },
      { label: "产业连接", value: "HKU 官方简介记录 2017–2020 年任 ByteDance Research Lab Silicon Valley 高级顾问", source: yiHku },
      { label: "研究共同体", value: "HKU School of Computing and Data Science / Musketeers Foundation Institute of Data Science", source: yiIds },
      noStandingRecruitment(yiHku),
    ], sources: [yiHku, yiIds], lastVerifiedAt: checkedAt,
  },
  "tong-zhang-hkust": {
    summary: "HKUST 数学系讲席教授，补足香港图谱中的机器学习理论、优化与大规模统计学习主轴。",
    tags: ["Stanford PhD", "学习理论", "优化", "统计学习", "HKUST"],
    facts: [
      { label: "教育", value: "Stanford University 博士", source: tongHkust },
      { label: "当前任职", value: "HKUST Department of Mathematics Chair Professor", source: tongHkust },
      { label: "研究主线", value: "机器学习算法与理论、统计方法及其在大数据中的应用", source: tongHkust },
      { label: "研究共同体", value: "个人主页持续汇总机器学习理论、优化与统计学习成果", source: tongHome },
      noStandingRecruitment(tongHkust),
    ], sources: [tongHkust, tongHome], lastVerifiedAt: checkedAt,
  },
  "david-hsu-nus": {
    summary: "NUS Provost's Chair Professor、NUS AI Lab 创始主任与 SSI 主任；研究聚焦不确定环境中的机器人规划、学习和人机协作。",
    tags: ["Stanford PhD", "NUSAIL founder", "SSI Director", "AdaComp", "robot planning"],
    facts: [
      { label: "教育", value: "UBC 计算机科学与数学学士；Stanford 计算机科学博士", source: hsuNus },
      { label: "研究共同体", value: "NUS AI Laboratory 创始主任；Smart Systems Institute 主任；Adaptive Computing Laboratory", source: hsuSsi },
      { label: "职业轨迹", value: "NUS faculty；曾在 MIT AeroAstro 与 CMU Robotics Institute 访问", source: hsuNus },
      { label: "招生公开状态", value: "NUS Graduate School 设有 David Hsu thesis-adviser 页面并链接研究方向与 AdaComp；名额以当期 NUSGS 申请为准。", source: hsuNusgs },
    ], sources: [hsuNus, hsuNusgs, hsuSsi], lastVerifiedAt: checkedAt,
  },
  "shuicheng-yan-nus": {
    summary: "NUS Distinguished Professor (Practice Track)，曾任 Sea Group 集团首席科学家；研究覆盖视觉、机器学习、多媒体与 e-AGI。",
    tags: ["PKU PhD", "Sea Group", "Learning and Vision Lab", "e-AGI", "ImageNet"],
    facts: [
      { label: "教育", value: "北京大学数学科学学院学士（1999）、博士（2004）", source: yanNus },
      { label: "职业轨迹", value: "NUS 学术任职；曾任 Sea Group 集团首席科学家及其他产业领导岗位", source: yanNus },
      { label: "研究共同体", value: "Learning and Vision Lab；研究视觉、机器学习、多媒体与 e-AGI", source: yanLab },
      { label: "团队影响", value: "NUS 官方简介记录团队在 Pascal VOC 与 ImageNet 获得十项第一名或荣誉提名", source: yanNus },
      noStandingRecruitment(yanLab),
    ], sources: [yanNus, yanLab], lastVerifiedAt: checkedAt,
  },
  "ivor-tsang-astar": {
    summary: "A*STAR Centre for Frontier AI Research 主任、NTU 兼职教授；从 UTS/AAII 转入新加坡国家级 AI 研究平台。",
    tags: ["A*STAR CFAR", "UTS AAII", "迁移学习", "弱监督", "生成模型"],
    facts: [
      { label: "当前任职", value: "A*STAR CFAR Director（2022–）；NTU SCSE Adjunct Professor", source: tsangAstar },
      { label: "职业轨迹", value: "曾任 UTS Professor of AI 与 Australian AI Institute Research Director", source: tsangAstar },
      { label: "研究共同体", value: "CFAR：迁移学习、深度生成模型、弱监督与超大规模机器学习", source: tsangAstar },
      { label: "招生公开状态", value: "CFAR 官方页列出其 affiliated PhD students，并提供 connect@cfar.a-star.edu.sg 作为加入研究网络的公开联系入口。", source: tsangStudents },
    ], sources: [tsangAstar, tsangStudents], lastVerifiedAt: checkedAt,
  },
  "steven-hoi-smu": {
    summary: "SMU 计算机科学教授，教育与学术谱系连接清华、CUHK 与 Michael R. Lyu，职业经历覆盖 NTU、SMU 和产业研究领导。",
    tags: ["Tsinghua", "CUHK PhD", "Michael R. Lyu", "NTU", "SMU", "在线学习"],
    facts: [
      { label: "教育", value: "清华计算机本科（2002）；CUHK MPhil（2004）与 PhD（2006）", source: hoiCv },
      { label: "博士师承", value: "CUHK 博士论文明确由 Michael R. Lyu 指导", source: hoiThesis },
      { label: "职业轨迹", value: "NTU Assistant/Associate Professor → SMU faculty；现任 Professor of Computer Science", source: hoiCv },
      { label: "研究主线", value: "机器学习、在线学习、视觉、多媒体与人机协作系统", source: hoiSmu },
      noStandingRecruitment(hoiSmu),
    ], sources: [hoiSmu, hoiCv, hoiThesis], lastVerifiedAt: checkedAt,
  },
  "stuart-russell-us": {
    summary: "Berkeley 荣休教授、CHAI 负责人，研究智能体、概率推理、实时决策和人类兼容 AI；当前仍有公开研究组与招募渠道。",
    tags: ["Stanford PhD", "CHAI", "RUGS", "AI safety", "AIMA"],
    facts: [
      { label: "教育", value: "Oxford 物理学一等荣誉学士（1982）；Stanford 计算机科学博士（1986）", source: russellBerkeley },
      { label: "研究共同体", value: "Center for Human-Compatible AI (CHAI)；Russell's Unusual Group of Students (RUGS)", source: russellChai },
      { label: "当前主线", value: "理性智能体、机器学习、实时决策、概率推理与长期 AI 控制问题", source: russellBerkeley },
      { label: "招生 / 招募公开状态", value: "CHAI 官方 Work With Us 页面公开 Research Fellowship、research collaborator 与 internship 渠道；研究生申请仍按 Berkeley 院系流程。", source: russellJobs },
    ], sources: [russellBerkeley, russellChai, russellJobs, russellRugs], lastVerifiedAt: checkedAt,
  },
};

export const globalP0StrongRelationships: Relationship[] = [
  { id: "global-p0-enrich-hinton-dayan", from: "geoffrey-hinton-ca", to: "peter-dayan-eu", type: "lineage", subtype: "postdoc_mentor", label: "博士后研究网络", evidence: "Geoffrey Hinton 官方历届博士后页面列出 Peter Dayan。", evidenceObject: "University of Toronto postdoctoral network", source: hintonPostdocs, verified: true },
];

export const globalP0StrongGroupMembers: GroupMember[] = [
  { id: "global-p0-ivor-zhang-lefei", teacherId: "ivor-tsang-astar", name: "Zhang Lefei", role: "Affiliated PhD student", focus: "CFAR affiliate", source: tsangStudents },
  { id: "global-p0-ivor-xia-sihan", teacherId: "ivor-tsang-astar", name: "Xia Sihan", role: "Affiliated PhD student", focus: "CFAR affiliate", source: tsangStudents },
  { id: "global-p0-russell-rachel-freedman", teacherId: "stuart-russell-us", name: "Rachel Freedman", role: "PhD student", focus: "Reinforcement learning · reward modelling · value alignment", source: russellChai },
  { id: "global-p0-russell-karim-sadek", teacherId: "stuart-russell-us", name: "Karim Abdel Sadek", role: "PhD student", focus: "RL · cooperative AI · AI safety", source: russellChai },
];

export const globalP0StrongPlacements: StudentPlacement[] = [
  { id: "global-p0-russell-scott-emmons-anthropic", student: "Scott Emmons", teacherId: "stuart-russell-us", company: "Anthropic", role: "Research Scientist", kind: "current", degree: "PhD", graduationYear: 2025, sector: "industry", currentRole: "Research Scientist at Anthropic", source: russellRugs, verifiedAt: checkedAt },
  { id: "global-p0-russell-micah-carroll-openai", student: "Micah Carroll", teacherId: "stuart-russell-us", company: "OpenAI", role: "Member of Technical Staff", kind: "current", degree: "PhD", sector: "industry", currentRole: "Member of Technical Staff at OpenAI", source: russellRugs, verifiedAt: checkedAt },
];
