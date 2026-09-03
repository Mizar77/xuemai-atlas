import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

type Seed = {
  id: string;
  name: string;
  chinese?: string;
  institution: Person["institution"];
  region: NonNullable<Person["region"]>;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  profile: Source;
  roster: Source;
  trainingSource?: Source;
  lineageSource?: Source;
  outcomesSource?: Source;
  portraitSource?: Source;
  additionalSources?: Source[];
  actualInstitution?: string;
  primary?: boolean;
  current: string;
  research: string;
  training: string;
  lineage: string;
  outcomes: string;
  why: string;
  x: number;
  y: number;
};

const hkustRoster = official(
  "HKUST CSE official faculty roster",
  "https://cse.hkust.edu.hk/admin/people/faculty",
  "current joint appointment, CSE profile link, research-area classification and official portrait",
);
const hustAiaRoster = official(
  "华中科技大学人工智能与自动化学院按系列师资名录",
  "https://aia.hust.edu.cn/szdw/xysz/axlb.htm",
  "现任师资归属与正高/副高职称分组",
);
const nusRoster = official(
  "NUS Computing faculty roster",
  "https://www.comp.nus.edu.sg/about/faculty/",
  "current faculty appointment, department, profile link and official portrait",
);
const thuRoster = official(
  "清华大学计算机系在职教师名录",
  "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm",
  "current full-professor roster placement and official portrait",
);
const ntuRoster = official(
  "NTU CCDS faculty directory",
  "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds",
  "current Nanyang Assistant Professor appointment and joint CCDS/SPMS affiliation",
);
const kambhampatiCv = official(
  "Subbarao Kambhampati · ASU-hosted CV",
  "https://cotopaxi.eas.asu.edu/cv.pdf",
  "education, ASU academic appointment, supervised doctoral students and student destinations",
);
const kambhampatiMentoring = official(
  "ASU Engineering · Kambhampati ACM Fellow profile",
  "https://news.asu.edu/20191211-acm-fellow-honor-Subbarao-Kambhampati",
  "doctoral and master's supervision scale, Yochan group leadership and research support",
);
const tsinghuaEeRoster = official(
  "清华大学电子工程系教师名录",
  "https://people.ee.tsinghua.edu.cn/en/?py=d&urltype=tp.TpPinYin&wbtreeid=1001",
  "Jifeng Dai current associate-professor appointment in the Department of Electronic Engineering",
);

const hkustProfile = (name: string, slug: string): Source => official(
  `HKUST faculty profile · ${name}`,
  `https://facultyprofiles.hkust.edu.hk/profiles.php?profile=${slug}`,
  "current title, education, research interests, supervised research students and current projects",
);

const seeds: Seed[] = [
  {
    id: "tim-cheng-hkust-pending-resolution", name: "Tim Kwang-Ting Cheng", chinese: "鄭光廷", institution: "HKUST", region: "Hong Kong",
    role: "Vice-President for R&D · Chair Professor", area: "Computer Vision · Medical Imaging · AI Hardware", tags: ["计算机视觉", "医学影像", "VLSI", "EDA", "AI 硬件"],
    summary: "HKUST 研发副校长与讲座教授，把视觉和医学影像算法连接到芯片设计、边缘计算与联合实验室。", stage: "institute",
    profile: hkustProfile("Tim Kwang-Ting Cheng", "kwangting-tim-cheng-timcheng"), roster: hkustRoster,
    current: "HKUST Vice-President for Research and Development、ECE/CSE Chair Professor，并任 HKUST-WeBank Joint Lab Director。",
    research: "VLSI、医学图像分析、计算机视觉、移动计算和电子设计自动化。",
    training: "1988 年获 UC Berkeley Electrical Engineering and Computer Sciences 博士。",
    lineage: "本轮两条官方页面均未列博士导师；未从论文合著关系推断师承。",
    outcomes: "HKUST 档案列出 2023–2026 年在读博士及多名 2023–2025 年毕业博士；WeBank 联合实验室构成可核验的产业合作节点。",
    why: "兼具校级研发管理、长期研究生培养和视觉—芯片协同研究，是香港 AI 系统网络中的高连接度节点。", x: 120, y: 120,
  },
  {
    id: "yuan-xie-hkust-pending-resolution", name: "Yuan Xie", chinese: "謝源", institution: "HKUST", region: "Hong Kong",
    role: "Fang Professor of Engineering · Chair Professor", area: "Machine Learning Systems · Computer Architecture · EDA", tags: ["机器学习", "体系结构", "VLSI", "EDA", "智能计算"],
    summary: "HKUST 方氏工程讲席教授，研究机器学习与计算机体系结构、芯片设计和智能计算的交界。", stage: "institute",
    profile: hkustProfile("Yuan Xie", "yuan-xie-yuanxie"), roster: hkustRoster,
    current: "HKUST ECE/CSE Chair Professor，并任 Institute of Integrated Circuits and Systems、HKUST-Intel Joint Laboratory 与 HKUST-SDU Intelligent Computing Joint Laboratory 主任。",
    research: "计算机体系结构、VLSI、电子设计自动化和机器学习。",
    training: "2002 年获 Princeton University Computer Engineering 博士。",
    lineage: "官方档案未列博士导师，本轮不根据共同作者反推师承。",
    outcomes: "官方档案显示其领导 Intel 联合实验室与山大智能计算联合实验室；学生名单可在 HKUST supervision 区段核验，但未对未知职业去向作推断。",
    why: "其研究和平台同时覆盖模型、架构和芯片，是观察 AI 算力人才流动的重要节点。", x: 280, y: 120,
  },
  {
    id: "hongbo-fu-hkust-pending-resolution", name: "Hongbo Fu", chinese: "傅紅波", institution: "HKUST", region: "Hong Kong",
    role: "Acting Head · Professor", area: "Computer Graphics · Computer Vision · Human-AI Interaction", tags: ["计算机图形学", "计算机视觉", "Human-AI", "生成式媒体"],
    summary: "HKUST 艺术与机器创造学部署理主任，研究图形、视觉与生成式媒体中的人机协作。", stage: "institute",
    profile: hkustProfile("Hongbo Fu", "hongbo-fu-hongbofu"), roster: hkustRoster,
    current: "HKUST Division of Arts and Machine Creativity Acting Head、CSE Professor，并任 MA in Arts and Machine Creativity Program Director。",
    research: "计算机图形学、人机交互、计算机视觉，以及可控视频生成和 Human-AI visual media。",
    training: "2007 年获 HKUST Computer Science 博士。",
    lineage: "官方档案未列博士导师；本轮不从早期共同作者推断。",
    outcomes: "官方 supervision 页面列出多名当前研究生；2026 项目包括可控电影级视频生成的多智能体工作流。",
    why: "把经典图形学、视觉生成、交互和艺术创作组织为同一个跨学科培养平台。", x: 440, y: 120,
  },
  {
    id: "sai-kit-yeung-hkust-pending-resolution", name: "Sai-Kit Yeung", chinese: "楊世傑", institution: "HKUST", region: "Hong Kong",
    role: "Professor · Associate Director, Von Neumann Institute", area: "Computer Vision · 3D Graphics · Computational Design", tags: ["计算机视觉", "三维图形", "SLAM", "计算设计", "海洋 AI"],
    summary: "HKUST 三维视觉与计算设计教授，研究从 SLAM、神经场景扩展到海洋视觉和真实部署。", stage: "senior",
    profile: hkustProfile("Sai-Kit Yeung", "sai-kit-yeung-saikit"), roster: hkustRoster,
    current: "HKUST ISD/CSE/Ocean Science Professor，并任 Von Neumann Institute Associate Director。",
    research: "计算机视觉、计算机图形、计算设计和 CAD/CAM。",
    training: "2009 年获 HKUST Electronic and Computer Engineering 博士。",
    lineage: "官方档案未列博士导师；不把联合项目负责人等同导师。",
    outcomes: "官方档案列出多名 2023–2025 年毕业博士/MPhil；项目伙伴包括 ePropulsion、Hong Kong Tramways 和海洋保育机构。",
    why: "其培养和项目把 3D 视觉方法连接到机器人导航、城市 AR 与海洋环境应用。", x: 600, y: 120,
  },
  {
    id: "xiaomeng-li-hkust-pending-resolution", name: "Xiaomeng Li", chinese: "李小萌", institution: "HKUST", region: "Hong Kong",
    role: "Associate Professor · Center Associate Director", area: "Medical Imaging · Deep Learning · Computer Vision", tags: ["医学影像", "深度学习", "计算机视觉", "多模态", "手术机器人"],
    summary: "HKUST 医学影像与深度学习 PI，研究多模态基础模型、医学分割和手术机器人视觉。", stage: "senior",
    profile: hkustProfile("Xiaomeng Li", "xiaomeng-li-eexmli"), roster: hkustRoster,
    current: "HKUST ECE Associate Professor、CSE joint faculty，并任 Center for Medical Imaging and Analysis Associate Director。",
    research: "医学图像分析、深度学习和计算机视觉。",
    training: "2019 年获 CUHK Computer Science and Engineering 博士。",
    lineage: "官方档案未列博士导师；本轮未用共同作者关系代替导师证据。",
    outcomes: "官方项目列出多中心医学影像、语言—视觉正畸基础模型及与杭州三坛医疗科技合作的手术机器人视觉项目。",
    why: "其工作连接医学影像方法、真实临床设备、多模态基础模型与跨院系学生培养。", x: 760, y: 120,
  },
  {
    id: "ling-pan-hkust-pending-resolution", name: "Ling Pan", chinese: "潘玲", institution: "HKUST", region: "Hong Kong",
    role: "Assistant Professor", area: "Reinforcement Learning · Generative Flow Networks · AI for Science", tags: ["强化学习", "GFlowNet", "LLM 对齐", "多智能体", "AI for Science"],
    summary: "HKUST 强化学习青年 PI，研究 GFlowNet、多智能体学习、LLM 对齐与 AI for Science。", stage: "emerging",
    profile: hkustProfile("Ling Pan", "ling-pan-lingpan"), roster: hkustRoster,
    current: "HKUST ECE/CSE Assistant Professor。",
    research: "强化学习、机器学习、人工智能和 AI for Science，近期项目覆盖 GFlowNet、LLM RLHF 与多智能体轨道系统。",
    training: "2022 年获清华大学 Computer Science and Technology 博士。",
    lineage: "官方 HKUST 档案未列博士导师；本轮未从论文作者顺序推断。",
    outcomes: "官方 supervision 区段列出多名当前博士/MPhil；项目伙伴包括 Huawei、MTR Academy 与 CCF-Tencent。",
    why: "同时覆盖生成式学习理论、LLM 对齐和现实多智能体系统，是强化学习青年网络的重要节点。", x: 920, y: 120,
  },
  {
    id: "qijia-shao-hkust-pending-resolution", name: "Qijia Shao", chinese: "邵琪佳", institution: "HKUST", region: "Hong Kong",
    role: "Assistant Professor", area: "Ubiquitous AI · Human-Computer Interaction · Cyber-Physical Systems", tags: ["普适计算", "Human-AI", "可穿戴", "医疗 AI", "CPS"],
    summary: "HKUST 普适智能青年 PI，开发可部署的感知系统与 AI 算法，用于健康和日常行为理解。", stage: "emerging",
    profile: hkustProfile("Qijia Shao", "qijia-shao-qijiashao"), roster: hkustRoster,
    current: "HKUST ISD/CSE Assistant Professor。",
    research: "移动与普适计算、人机交互、信息物理系统，以及用于医疗和可穿戴感知的 AI。",
    training: "2024 年获 Columbia University Computer Science 博士。",
    lineage: "个人主页公开其博士阶段由 Xia Zhou 与 Xiaofan Jiang 指导；两端尚未在当前亚洲图谱建立完整人物节点，因此本批不新建边。",
    outcomes: "HKUST 档案列出 4 名当前博士和 1 名 MPhil；2025 年获 Huawei 项目支持开展连续用户状态监测。",
    why: "将传感硬件、Human-AI 和健康计算连成可部署系统，补足纯模型研究之外的应用网络。", x: 1080, y: 120,
  },
  {
    id: "janet-hsiao-hkust-pending-resolution", name: "Janet Hui-wen Hsiao", chinese: "蕭惠文", institution: "HKUST", region: "Hong Kong",
    role: "Professor · Joint CSE Faculty", area: "Computational Cognitive Science · Human Perception · Artificial Intelligence", tags: ["计算认知科学", "人工智能", "人类视觉", "眼动", "Human-AI"],
    summary: "HKUST 计算认知科学教授，用计算模型、眼动与行为实验研究人类视觉认知及 Human-AI。", stage: "senior",
    profile: hkustProfile("Janet Hui-wen Hsiao", "janet-hui-wen-hsiao-jhhsiao"), roster: hkustRoster,
    current: "HKUST Division of Social Science Professor，并为 Department of Computer Science and Engineering joint faculty。",
    research: "计算认知科学、人类视觉认知、面孔与文字加工、眼动，以及人工智能与人类认知的交叉。",
    training: "2006 年获 University of Edinburgh Informatics 博士。",
    lineage: "HKUST 官方档案未列博士导师；本轮不从论文共同作者或早期任职反推师承。",
    outcomes: "官方档案列有在读研究生与跨学科研究项目，但没有可逐人核验的毕业学生职业去向表，因此保持未知。",
    why: "其研究把 AI 方法与认知机制、行为测量连接起来，是 Human-AI 与人本智能网络中的跨院系节点。", x: 1160, y: 240,
  },
  {
    id: "jianhua-jiang-hust-pending-resolution", name: "蒋建华", institution: "HUST", region: "Mainland China",
    role: "副教授", area: "Machine Learning · Industrial Data · Intelligent Control", tags: ["机器学习", "工业大数据", "智能控制", "故障诊断", "群体智能"],
    summary: "华中科技大学智能控制副教授，将机器学习和工业数据分析用于燃料电池、储能与微网系统。", stage: "senior",
    profile: official("华中科技大学教师主页 · 蒋建华", "http://faculty.hust.edu.cn/jiangjianhua/zh_CN/index.htm", "current associate-professor status, education, research, projects, student and employment statement"), roster: hustAiaRoster,
    current: "华中科技大学人工智能与自动化学院在职副教授。",
    research: "机器学习、大数据分析、智能控制，以及燃料电池/储能系统的故障诊断、健康预测和多机协同。",
    training: "华中科技大学控制理论与控制工程工学博士；官方页未列博士导师。",
    lineage: "个人页未写博士导师，未从同校关系推断。",
    outcomes: "个人页明确称学生进入国企和外企，并有学生获 CSC 资助赴 RWTH Aachen 攻读博士；未公开可逐人核验的姓名—去向表。",
    why: "其成果落在能源系统与工业 AI 交叉处，且已有可核验的企业项目与人才外流向。", x: 120, y: 360,
  },
  {
    id: "yindong-shen-hust-pending-resolution", name: "沈吟东", institution: "HUST", region: "Mainland China",
    role: "正高教师", area: "Artificial Intelligence · Combinatorial Optimization · Intelligent Transit", tags: ["人工智能", "组合优化", "运筹", "智能交通", "调度"],
    summary: "华中科技大学智能交通与组合优化资深教师，研究公共交通调度和运筹智能。", stage: "senior",
    profile: official("华中科技大学人工智能与自动化学院 · 沈吟东", "https://aia.hust.edu.cn/info/1697/10519.htm", "current department affiliation, research, education and principal-investigator projects"), roster: hustAiaRoster,
    current: "学院按系列名录列于智能系统与系统工程系正高组，官方个人页确认现任工作单位。",
    research: "运筹与管理、组合优化、人工智能和智能公共交通。",
    training: "1986–1989 年武汉大学信息管理硕士；1998–2001 年 University of Leeds School of Computing 博士。",
    lineage: "官方个人页未列硕士或博士导师。",
    outcomes: "以负责人身份承担公交、铁路和城市交通调度项目，合作方包括多地交通运输主管部门和广州市电车公司；页面未提供学生职业去向。",
    why: "连接 AI、组合优化与城市公共交通部署，是经典运筹智能在现实系统中的资深节点。", x: 280, y: 360,
  },
  {
    id: "wanyao-hust-pending-resolution", name: "万瑶", institution: "HUST", region: "Mainland China",
    role: "副教授", area: "Code Intelligence · Natural Language Processing · Software Engineering", tags: ["代码智能", "自然语言处理", "程序语言", "软件工程", "NaturalCC"],
    summary: "华中科技大学代码智能副教授，研究把 NLP 与机器学习方法用于程序理解和智能化编程。", stage: "emerging",
    profile: official("华中科技大学教师主页 · 万瑶", "http://faculty.hust.edu.cn/wanyao/zh_CN/index.htm", "current associate-professor status, education, research direction, open-source work and grant support"), roster: official("华中科技大学计算机学院教师名录", "http://www.cs.hust.edu.cn/szdw/jsml/axmpyszmlb.htm", "current school faculty roster membership"),
    current: "华中科技大学计算机科学与技术学院在职副教授。",
    research: "代码智能、自然语言处理、程序语言与人工智能；发起智能化编程开源项目 NaturalCC。",
    training: "2019 年获浙江大学计算机科学与技术博士；博士期间曾访问 University of Technology Sydney 与 University of Illinois Chicago。",
    lineage: "官方教师主页未列博士导师；未由共同作者推断。",
    outcomes: "官方页记录研究获得国家自然科学基金与腾讯犀牛鸟资助，但未给出可逐人核验的毕业学生职业去向。",
    why: "代码大模型使软件工程与 NLP 加速融合，其研究是连接两个共同体的直接节点。", x: 340, y: 500,
  },
  {
    id: "zhang-teng-hust-pending-resolution", name: "张腾", institution: "HUST", region: "Mainland China",
    role: "副教授", area: "Machine Learning · Data Mining", tags: ["机器学习", "数据挖掘", "ICML", "KDD"],
    summary: "华中科技大学机器学习与数据挖掘副教授，研究聚焦通用学习方法与数据智能。", stage: "emerging",
    profile: official("华中科技大学教师主页 · 张腾", "http://faculty.hust.edu.cn/zhangteng/zh_CN/index.htm", "current associate-professor status, education and machine-learning/data-mining research"), roster: official("华中科技大学计算机学院教师名录", "http://www.cs.hust.edu.cn/szdw/jsml/axmpyszmlb.htm", "current school faculty roster membership"),
    current: "华中科技大学计算机科学与技术学院在职副教授。",
    research: "机器学习与数据挖掘，成果发表于 ICML、KDD、IJCAI、AAAI 和 TKDE 等。",
    training: "2019 年获南京大学计算机系博士。",
    lineage: "官方教师主页未列博士导师；本批不以论文合作替代导师证据。",
    outcomes: "两条官方页面未提供学生名单、毕业去向或产业任职记录，因此保持未知而非推断。",
    why: "补充华科计算机学院方法型机器学习与数据挖掘青年 PI 节点。", x: 500, y: 500,
  },
  {
    id: "wei-li-nus-pending-resolution", name: "Wei Li", institution: "NUS", region: "Singapore",
    role: "Assistant Professor", area: "AI for Chip Design · EDA · Hardware Testing", tags: ["AI for Chips", "EDA", "硬件测试", "系统", "师承已核验"],
    summary: "NUS AI-for-chip-design 青年 PI，履历连接 CUHK、CMU 与 Apple、Qualcomm、Google、NVIDIA 等芯片产业网络。", stage: "emerging",
    profile: official("NUS Computing profile · Wei Li", "https://www.comp.nus.edu.sg/cs/people/weili/", "current appointment, education, advisers, research interests, awards and industrial impact"), roster: nusRoster,
    current: "2026 年 7 月加入 NUS Computing Department of Computer Science 任 Assistant Professor。",
    research: "电子设计自动化、硬件测试和 AI for chip design。",
    training: "CUHK 本科与 MPhil；2026 年获 CMU 博士。",
    lineage: "NUS 官方页明确：CMU 博士导师 José Moura 与 Shawn Blanton；CUHK MPhil 导师 Bei Yu 与 Michael R. Lyu。",
    outcomes: "官方页记录与 Qualcomm、Intel、Google、Broadcom 合作，成果进入 Apple 工业物理设计流程，并与 NVIDIA 联合申请专利。",
    why: "其公开履历同时具备明确师承和多家公司技术转移证据，可用于连接学术谱系与芯片工业流向。", x: 440, y: 360,
  },
  {
    id: "yunyi-li-nus-pending-resolution", name: "Yunyi Li", institution: "NUS", region: "Singapore",
    role: "Assistant Professor", area: "Trustworthy AI · Human-AI Collaboration", tags: ["可信 AI", "Human-AI", "算法偏差", "数字平台", "医疗"],
    summary: "NUS 可信 AI 与 Human-AI Collaboration 青年 PI，研究平台算法、偏差治理和医疗场景中的人类行为。", stage: "emerging",
    profile: official("NUS new-faculty profile · Yunyi Li", "https://www.comp.nus.edu.sg/news/nus-school-of-computing-welcomes-17-new-faculty-members/", "current start date, department, PhD adviser, trustworthy-AI research and public-impact agenda"), roster: nusRoster,
    current: "2025 年 7 月加入 NUS Computing Department of Information Systems and Analytics 任 Assistant Professor。",
    research: "可信 AI、Human-AI collaboration、数字平台设计、算法偏差与医疗应用。",
    training: "University of Maryland Robert H. Smith School of Business 博士。",
    lineage: "NUS 官方新教师介绍明确博士导师为 Jui Ramaprasad；导师尚无完整 atlas 节点，本批不建边。",
    outcomes: "新任 PI 尚无公开毕业学生去向；官方介绍明确其目标是将可信 AI 用于偏差缓解、医疗与社会公益。",
    why: "从信息系统视角研究算法介导行为，补充模型层可信 AI 之外的组织和社会机制。", x: 600, y: 360,
  },
  {
    id: "patrick-rebentrost-nus-pending-resolution", name: "Patrick Rebentrost", institution: "NUS", region: "Singapore",
    role: "Associate Professor · CQT Principal Investigator", area: "Quantum Machine Learning · Learning Theory · Quantum Finance", tags: ["量子机器学习", "学习理论", "量子算法", "量子金融", "师承已核验"],
    summary: "NUS 量子机器学习 PI，连接 Harvard、MIT、CQT 与量子算法、学习理论和金融计算。", stage: "senior",
    profile: official("Centre for Quantum Technologies · Patrick Rebentrost", "https://www.cqt.sg/people/patrick-rebentrost/", "current PI and NUS appointment, research pillars and public group output"), roster: nusRoster,
    current: "NUS Computer Science Associate Professor、Centre for Quantum Technologies Principal Investigator，并任 Asian Institute of Digital Finance Research Affiliate。",
    research: "量子计算、量子算法、量子机器学习、学习理论和数学金融。",
    training: "2012 年获 Harvard 博士，后在 MIT 从事博士后研究。",
    lineage: "CQT 官方访谈明确博士导师为 Alan Aspuru-Guzik、MIT 博士后导师为 Seth Lloyd；两人尚未作为本批完整人物节点接入。",
    outcomes: "官方 CQT 页面记录其领导量子金融计算项目；公开访谈记录此前研究经历包括 MIT 与量子技术机构，未公开毕业学生职业表。",
    why: "是经典机器学习谱系向量子算法与金融计算延展的清晰桥接节点。", x: 760, y: 360,
  },
  {
    id: "haixin-duan-thu-pending-resolution", name: "段海新", institution: "THU", region: "Mainland China",
    role: "教授", area: "Network Security · Network Measurement · Cyberspace Governance", tags: ["网络安全", "网络测量", "互联网治理", "AI 安全相邻"],
    summary: "清华大学网络安全与网络测量教授，研究互联网基础设施风险、测量和治理。", stage: "senior",
    profile: official("清华大学计算机系 · 段海新", "https://www.cs.tsinghua.edu.cn/csen/info/1154/3926.htm", "current professor appointment, education, research fields and industrial-impact statement"), roster: thuRoster,
    current: "2009 年起任清华大学计算机系教授，现属网络研究中心与网络科学和网络空间研究院。",
    research: "网络安全、网络测量与互联网治理。",
    training: "2000 年获清华大学计算机科学与技术博士。",
    lineage: "官方个人页未列博士导师；未从同中心任职关系推断师承。",
    outcomes: "官方简介称相关技术影响或服务 Google、Microsoft、Akamai、Baidu 等企业；未列可逐人核验的学生去向。",
    why: "虽非模型研究，其网络安全与测量工作是 AI 基础设施、内容生态和大规模系统治理的重要邻接节点。", x: 920, y: 360,
  },
  {
    id: "hai-dang-dau-ntu-pending-resolution", name: "Hai-Dang Dau", institution: "NTU", region: "Singapore",
    role: "Nanyang Assistant Professor", area: "Bayesian Computation · Sampling · Generative Models", tags: ["贝叶斯计算", "采样", "扩散模型", "生成模型", "师承已核验"],
    summary: "NTU 贝叶斯计算与生成模型青年 PI，研究 SMC、扩散模型和 transport flow 的交界。", stage: "emerging",
    profile: official("NTU seminar biography · Hai-Dang Dau", "https://www.ntu.edu.sg/computing/news-events/events/detail/2025/02/26/default-calendar/seminar--sampling-meets-machine-learning", "PhD institution and adviser, Oxford group experience, sampling and generative-model research"), roster: ntuRoster,
    current: "NTU Nanyang Assistant Professor，联合任职 College of Computing and Data Science 与 School of Physical and Mathematical Sciences。",
    research: "计算统计与贝叶斯计算，重点研究 Sequential Monte Carlo、扩散模型和 transport flows。",
    training: "Institut Polytechnique de Paris 博士。",
    lineage: "NTU 官方讲座简介明确其博士由 Nicolas Chopin 指导，并曾在 Oxford Arnaud Doucet 研究组工作。",
    outcomes: "2024–2025 年曾在 NUS 任 Research Fellow；新任独立 PI 尚无公开毕业学生或产业去向。",
    why: "把统计采样理论与现代生成模型结合，是新加坡生成式 AI 方法网络中容易被传统 CS 名录遗漏的节点。", x: 1080, y: 360,
  },
  {
    id: "subbarao-kambhampati-asu-upstream", name: "Subbarao Kambhampati", institution: "External", actualInstitution: "Arizona State University", region: "United States",
    role: "Professor · Director, Yochan Research Group", area: "AI Planning · Human-aware AI · Machine Learning", tags: ["AI Planning", "Human-aware AI", "机器学习", "导师谱系", "ASU"],
    summary: "ASU 人工智能规划与 Human-aware AI 教授，长期培养规划、搜索和数据集成方向博士生。", stage: "senior",
    profile: official("ASU Search · Subbarao Kambhampati", "https://search.asu.edu/profile/95646", "current professor appointment, Yochan group leadership, research interests and official portrait"),
    roster: kambhampatiCv,
    trainingSource: kambhampatiCv,
    lineageSource: kambhampatiCv,
    outcomesSource: kambhampatiMentoring,
    additionalSources: [kambhampatiMentoring],
    current: "Arizona State University School of Computing and Augmented Intelligence Professor，并领导 Yochan Research Group。",
    research: "人工智能规划与决策、Human-aware AI、机器学习、类比与基于案例的推理。",
    training: "1983 年获 IIT Madras Electrical Engineering and Electronics B.Tech；1985、1989 年分别获 University of Maryland Computer Science 硕士与博士。",
    lineage: "ASU 托管的 2025 CV 明确列 Zaiqing Nie 于 2004 年春获得博士，并记录其研究主题与毕业后进入 Microsoft Research Asia。",
    outcomes: "ASU 官方报道截至 2019 年已有 20 名博士和 33 名硕士在其指导下完成论文；官方 CV 继续逐人记录毕业生及其学术、研究机构和企业去向。",
    why: "其学生网络把经典 AI planning、Web 数据集成与微软亚研院、阿里及清华 AIR 等节点连接起来。", x: 1240, y: 360,
    primary: false,
  },
  {
    id: "jifeng-dai-thu-upstream", name: "代季峰", institution: "THU", region: "Mainland China",
    role: "副教授 · 博士生导师", area: "Computer Vision · Multimodal Foundation Models · Agentic AI", tags: ["计算机视觉", "多模态基础模型", "Agentic AI", "持续学习", "师承已核验"],
    summary: "清华电子系计算机视觉与多模态基础模型 PI，研究轨迹连接周杰团队、微软亚研院、商汤与 InternVL。", stage: "senior",
    profile: official("清华大学电子工程系 · 代季峰", "https://web.ee.tsinghua.edu.cn/daijifeng", "current title, doctoral adviser, education, research focus, industry appointments and official portrait"),
    roster: tsinghuaEeRoster,
    current: "清华大学电子工程系副教授、博士生导师；官方页面标记为在职。",
    research: "视觉感知基础模型、多模态通用感知、自动驾驶感知决策一体化，以及通用智能体基石模型。",
    training: "2009 年获清华大学自动化系学士，2014 年获清华大学控制科学与工程博士。",
    lineage: "清华电子系官方个人页明确写明其博士导师为周杰教授。",
    outcomes: "2014–2019 年任微软亚洲研究院视觉组首席研究员、研究经理；2019–2022 年任商汤研究院执行研究总监，2022 年全职加入清华。",
    why: "其研究与人才轨迹把清华视觉师承、产业研究院和开源多模态基础模型生态直接连接起来。", x: 1400, y: 360,
  },
];

export const asiaPendingResolutionPiExpansionPeople2026: Person[] = seeds.map((seed) => ({
  id: seed.id,
  name: seed.name,
  chinese: seed.chinese,
  role: seed.role,
  institution: seed.institution,
  actualInstitution: seed.actualInstitution,
  region: seed.region,
  area: seed.area,
  tags: seed.tags,
  summary: seed.summary,
  facts: [
    { label: "当前任职", value: seed.current, source: seed.profile },
    { label: "研究主线", value: seed.research, source: seed.profile },
    { label: "教育与学术训练", value: seed.training, source: seed.trainingSource ?? seed.profile },
    { label: "师承核验", value: seed.lineage, source: seed.lineageSource ?? seed.profile },
    { label: "学生与产业去向", value: seed.outcomes, source: seed.outcomesSource ?? seed.profile },
    { label: "为什么值得关注", value: seed.why, source: seed.profile },
  ],
  stage: seed.stage,
  category: "core",
  status: "current PI · two first-party sources checked",
  sources: [seed.profile, seed.roster, ...(seed.additionalSources ?? [])],
  x: seed.x,
  y: seed.y,
  primary: seed.primary ?? true,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/asia-pending-resolution-2026/${seed.id}.jpg`,
    alt: `${seed.name} official portrait`,
    source: seed.portraitSource ?? seed.profile,
  },
}));

/** Keep the verified-but-isolated high-influence Haixin Duan profile queued. */
export const asiaPendingResolutionPiExpansionPublishedPeople2026 =
  asiaPendingResolutionPiExpansionPeople2026.filter((person) => person.id !== "haixin-duan-thu-pending-resolution");

const weiLiProfile = seeds.find((seed) => seed.id === "wei-li-nus-pending-resolution")!.profile;
const saiKitYeungResearchOutputs = official(
  "HKUST faculty profile · Sai-Kit Yeung · research outputs",
  "https://facultyprofiles.hkust.edu.hk/profiles.php?profile=sai-kit-yeung-saikit",
  "official research-output list naming Sai-Kit Yeung and Ivor W. Tsang on multiple recent joint papers",
);

export const asiaPendingResolutionPiExpansionRelationships2026: Relationship[] = [
  {
    id: "kambhampati-nie-phd-adviser-asia-resolution",
    from: "subbarao-kambhampati-asu-upstream", to: "zaiqing-nie-air", type: "lineage", subtype: "phd_adviser", label: "博士导师",
    evidence: "Subbarao Kambhampati 的 ASU 托管 CV 明确列 Zaiqing Nie 于 2004 年春完成博士；清华 AIR 官方简介亦明确写明聂再清师从 Kambhampati。",
    source: kambhampatiCv, verified: true, evidenceObject: "Zaiqing Nie Ph.D. Spring 2004", endYear: 2004,
  },
  {
    id: "jie-zhou-jifeng-dai-phd-adviser-asia-resolution",
    from: "jie-zhou-thu-auto", to: "jifeng-dai-thu-upstream", type: "lineage", subtype: "phd_adviser", label: "博士导师",
    evidence: "清华大学电子工程系代季峰官方个人页明确写明其 2014 年清华自动化系博士导师为周杰教授。",
    source: seeds.find((seed) => seed.id === "jifeng-dai-thu-upstream")!.profile,
    verified: true, evidenceObject: "代季峰博士教育经历", endYear: 2014,
  },
  {
    id: "michael-lyu-wei-li-mphil-adviser-asia-resolution",
    from: "michael-lyu-cuhk", to: "wei-li-nus-pending-resolution", type: "lineage", subtype: "co_adviser", label: "MPhil 共同导师",
    evidence: "NUS 官方个人页明确写明 Wei Li 在 CUHK 的 MPhil 由 Bei Yu 与 Michael R. Lyu 共同指导。",
    source: weiLiProfile, verified: true, evidenceObject: "Wei Li MPhil", endYear: 2021,
  },
  {
    id: "sai-kit-yeung-ivor-tsang-sustained-collaboration-asia-resolution",
    from: "sai-kit-yeung-hkust-pending-resolution", to: "ivor-tsang-astar", type: "collaboration", subtype: "sustained_collaboration", label: "持续合作",
    evidence: "HKUST 官方教师档案的成果列表连续收录 Sai-Kit Yeung 与 Ivor W. Tsang 共同署名的 CamoVid60K、Catch Me If You Can Describe Me 和 Power of Boundary and Reflection，构成可复核的多篇持续合作证据。",
    source: saiKitYeungResearchOutputs, verified: true, evidenceObject: "CamoVid60K; Catch Me If You Can Describe Me; Power of Boundary and Reflection", recentYear: 2026,
  },
];

export const asiaPendingResolutionPiExpansionPortraits2026 = Object.fromEntries(
  asiaPendingResolutionPiExpansionPeople2026.map((person) => [person.id, person.portrait!]),
) as Record<string, NonNullable<Person["portrait"]>>;
