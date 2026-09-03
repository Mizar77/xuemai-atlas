import type { Person, Source } from "./data";

const checkedAt = "2026-09-02";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  hanIllinois: source("Illinois Grainger faculty profile — Jiawei Han", "https://grainger.illinois.edu/about/directory/faculty/hanj", "official", "Current appointment, education and research areas"),
  hanHome: source("Jiawei Han research homepage", "https://hanj.cs.illinois.edu/", "profile", "Data-mining, text-mining and intelligent-systems research programme"),
  vasconcelosProfile: source("UC San Diego Jacobs profile — Nuno Vasconcelos", "https://jacobsschool.ucsd.edu/people/profile/nuno-vasconcelos", "official", "Current ECE appointment, education and research areas"),
  ucsdEceRoster: source("UC San Diego ECE faculty roster", "https://ece.ucsd.edu/people/faculty", "official", "Department faculty-roster membership"),
  riedlProfile: source("Georgia Tech profile — Mark Riedl", "https://www.cc.gatech.edu/people/mark-riedl", "official", "Current appointment, Machine Learning Center role and research areas"),
  riedlLab: source("Entertainment Intelligence Lab", "https://eilab.gatech.edu/", "profile", "Research-group leadership and human-centered AI programme"),
  baiProfile: source("华中科技大学软件学院教师主页 — 白翔", "https://sse.hust.edu.cn/info/1083/3520.htm", "official", "现任职务、教育经历、研究方向与技术转化"),
  hustSoftwareRoster: source("华中科技大学软件学院师资队伍", "https://sse.hust.edu.cn/szdw.htm", "official", "学院教师名录与院长身份"),
  shenProfile: source("深圳大学人工智能学院教师主页 — 沈琳琳", "https://ai.szu.edu.cn/info/1102/2330.htm", "official", "现任职务、教育经历、研究方向与团队建设"),
  szuAiRoster: source("深圳大学人工智能学院教师名录", "https://ai.szu.edu.cn/szdw/yjsfl/jsjsjyjs.htm", "official", "学院教师名录与研究生导师身份"),
  hiltonProfile: source("University of Surrey profile — Adrian Hilton", "https://www.surrey.ac.uk/people/adrian-hilton", "official", "Current professorship, institute leadership, research and recruiting"),
  surreyAiRoster: source("Surrey Institute for People-Centred AI people", "https://www.surrey.ac.uk/artificial-intelligence/people", "official", "Institute leadership and AI faculty context"),
  kittlerProfile: source("University of Surrey profile — Josef Kittler", "https://www.surrey.ac.uk/people/josef-kittler", "official", "Current distinguished professorship, training and research areas"),
  cvsspSecurity: source("Surrey CVSSP security and surveillance research", "https://www.surrey.ac.uk/centre-vision-speech-signal-processing/research/security", "official", "CVSSP research leadership and biometric-computing context"),
  stiefelhagenProfile: source("KIT CV:HCI profile — Rainer Stiefelhagen", "https://cvhci.iar.kit.edu/people_596.php", "official", "Institute leadership, education and research areas"),
  kitFaculty: source("KIT Informatics faculty record", "https://www.informatik.kit.edu/13779.php", "official", "Current KIT professorship and faculty affiliation"),
  ananiadouProfile: source("University of Manchester research profile — Sophia Ananiadou", "https://research.manchester.ac.uk/en/persons/sophia-ananiadou/", "official", "Current chair, NaCTeM leadership, doctoral training and research"),
  manchesterMib: source("Manchester Institute of Biotechnology research staff", "https://www.mib.manchester.ac.uk/research/staff/", "official", "Institute affiliation and biomedical text-mining context"),
  marttinenProfile: source("Aalto profile — Pekka Marttinen", "https://www.aalto.fi/en/people/pekka-marttinen", "official", "Current appointment, vice-dean term, education and research"),
  aaltoFaculty: source("Aalto Computer Science faculty", "https://www.aalto.fi/en/department-of-computer-science/faculty-0", "official", "Department faculty-roster membership"),
  xieProfile: source("Lingnan scholars profile — Haoran Xie", "https://scholars.ln.edu.hk/en/persons/haoran-xie/", "official", "Current leadership roles, education and research areas"),
  lingnanIds: source("Lingnan Institute of Data Science people", "https://scholars.ln.edu.hk/en/organisations/leo-dr-david-p-chan-institute-of-data-science/persons/", "official", "Institute leadership and faculty-roster membership"),
  liuProfile: source("HSUHK profile — Hai Liu", "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/?staffId=930", "official", "Current leadership, education and research areas"),
  hsuhkRoster: source("HSUHK Department of Computer Science academic staff", "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/", "official", "Department academic-staff roster and headship"),
  zhaoProfile: source("SUTD profile — Na Zhao", "https://www.sutd.edu.sg/profile/zhao-na/", "official", "Current appointment, NUS doctoral training and research areas"),
  sutdAiRoster: source("SUTD Artificial and Augmented Intelligence", "https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/", "official", "AI research-area faculty membership"),
  oliehoekProfile: source("TU Delft research profile — Frans Oliehoek", "https://research.tudelft.nl/en/persons/fa-oliehoek/", "official", "Current professorship, ELLIS leadership, education and research areas"),
  delftDecisionRoster: source("TU Delft Sequential Decision Making researchers", "https://research.tudelft.nl/en/organisations/sequential-decision-making/persons/", "official", "Research-group leadership and faculty membership"),
  lokeshProfile: source("SUSS profile — Bheema Thiagarajan Lokesh", "https://www.suss.edu.sg/academics/schools-college/faculty-listing/detail//dr-bheema-thiagarajan-lokesh", "official", "Current appointment, education, A*STAR career and research areas"),
  lokeshCv: source("SUSS CV — Bheema Thiagarajan Lokesh", "https://www.suss.edu.sg/docs/default-source/default-document-library/cv_lokeshbt5eac433e540e4aa390a403953edbb44c.pdf?sfvrsn=25929888_4", "cv", "Academic trajectory and machine-learning research interests"),
  liuDuke: source("Duke-NUS directory — Liu Nan", "https://www.duke-nus.edu.sg/directory/detail/liu-nan", "official", "Current appointment, DAISI leadership, education and research areas"),
  liuLab: source("NUS Digital Medicine Lab — Principal Investigator", "https://blog.nus.edu.sg/liunan/principal-investigator/", "profile", "Current institute roles, clinical-AI agenda, translation and portrait"),
  liuOpportunities: source("NUS Digital Medicine Lab — Opportunities", "https://blog.nus.edu.sg/liunan/opportunity/", "profile", "Current PhD, research-fellow and research-assistant recruiting notice"),
};

type NewPerson = Omit<Person, "category" | "primary" | "introducedAt" | "lastVerifiedAt" | "portrait"> & {
  portraitSource: Source;
};

function person(value: NewPerson): Person {
  const { portraitSource, ...rest } = value;
  return {
    ...rest,
    category: "core",
    primary: true,
    status: "current PI",
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/top-school-round2-2026/${value.id}.jpg`,
      alt: `${value.name} portrait`,
      source: portraitSource,
    },
  };
}

export const topSchoolRosterRound2People2026: Person[] = [
  person({
    id: "jiawei-han-uiuc", name: "Jiawei Han", chinese: "韩家炜", role: "Michael Aiken Chair Professor", institution: "UIUC", region: "United States",
    area: "Data Mining · Text Mining · Intelligent Systems", tags: ["数据挖掘", "文本挖掘", "知识发现", "智能系统"],
    summary: "UIUC 数据挖掘与知识发现资深带头人，长期连接数据库、文本分析和智能系统研究。",
    facts: [
      { label: "当前任职", value: "University of Illinois Urbana-Champaign Michael Aiken Chair Professor。", source: sources.hanIllinois },
      { label: "研究主线", value: "Data mining、text mining、database systems、data warehousing 与 intelligent systems。", source: sources.hanIllinois },
      { label: "教育与学术训练", value: "1985 年获 University of Wisconsin–Madison Computer Science 博士学位。", source: sources.hanIllinois },
      { label: "为什么值得关注", value: "其研究把大规模数据管理、模式发现和文本知识挖掘连接起来，是数据挖掘学术网络的重要上游节点。", source: sources.hanHome },
    ],
    stage: "institute", sources: [sources.hanIllinois, sources.hanHome], portraitSource: sources.hanIllinois, x: 140, y: 140,
  }),
  person({
    id: "nuno-vasconcelos-ucsd", name: "Nuno Vasconcelos", role: "Professor of Electrical and Computer Engineering", institution: "UCSD", region: "United States",
    area: "Computer Vision · Machine Learning · Multimedia", tags: ["计算机视觉", "机器学习", "多媒体", "视觉识别"],
    summary: "UC San Diego ECE 视觉与机器学习教授，研究统计视觉识别、多媒体分析和视觉学习。",
    facts: [
      { label: "当前任职", value: "UC San Diego Department of Electrical and Computer Engineering Professor。", source: sources.vasconcelosProfile },
      { label: "研究主线", value: "Computer vision、machine learning、image/video analysis 与 multimedia systems。", source: sources.vasconcelosProfile },
      { label: "教育与学术训练", value: "2000 年获 MIT Electrical Engineering and Computer Science 博士学位。", source: sources.vasconcelosProfile },
      { label: "为什么值得关注", value: "是只审计 CSE roster 时容易漏掉的 ECE 视觉 PI，体现了跨院系盘查的必要性。", source: sources.ucsdEceRoster },
    ],
    stage: "senior", sources: [sources.vasconcelosProfile, sources.ucsdEceRoster], portraitSource: sources.vasconcelosProfile, x: 300, y: 140,
  }),
  person({
    id: "mark-riedl-gatech", name: "Mark Riedl", role: "Professor, School of Interactive Computing", institution: "Georgia Tech", region: "United States",
    area: "Human-Centered AI · Generative AI · Intelligent Agents", tags: ["人本 AI", "生成式 AI", "智能体", "可解释 AI"],
    summary: "Georgia Tech 人本 AI 与智能体 PI，研究生成式系统、叙事智能、可解释与安全的人工智能。",
    facts: [
      { label: "当前任职", value: "Georgia Tech School of Interactive Computing Professor，并任 Machine Learning Center Associate Director。", source: sources.riedlProfile },
      { label: "研究主线", value: "Human-centered AI、generative AI、computational narrative、explainable and safe intelligent agents。", source: sources.riedlProfile },
      { label: "教育与学术训练", value: "2004 年获 North Carolina State University Computer Science 博士学位。", source: sources.riedlProfile },
      { label: "研究组", value: "领导 Entertainment Intelligence Lab，关注 AI 系统如何理解并生成符合人类目标的内容与行为。", source: sources.riedlLab },
    ],
    stage: "senior", sources: [sources.riedlProfile, sources.riedlLab], portraitSource: sources.riedlProfile, x: 460, y: 140,
  }),
  person({
    id: "xiang-bai-hust", name: "白翔", role: "教授", institution: "HUST", region: "Mainland China",
    area: "Computer Vision · Pattern Recognition · Scene Text", tags: ["计算机视觉", "模式识别", "场景文字", "视觉大模型"],
    summary: "华中科技大学软件学院院长与视觉识别带头人，研究场景文字、细粒度识别、视觉理解和产业化视觉系统。",
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院院长、教授、博士生导师。", source: sources.baiProfile },
      { label: "研究主线", value: "计算机视觉、模式识别、场景文字识别与细粒度视觉分析。", source: sources.baiProfile },
      { label: "教育与学术训练", value: "在华中科技大学完成本科、硕士和博士训练。", source: sources.baiProfile },
      { label: "产业连接", value: "官方简介记录其团队技术曾进入 Huawei、WeChat、Alibaba 与 Meituan 等真实产品场景。", source: sources.baiProfile },
    ],
    stage: "institute", sources: [sources.baiProfile, sources.hustSoftwareRoster], portraitSource: sources.baiProfile, x: 180, y: 340,
  }),
  person({
    id: "linlin-shen-szu", name: "沈琳琳", role: "教授", institution: "SZU", region: "Mainland China",
    area: "Computer Vision · Face Recognition · Medical Imaging · Foundation Models", tags: ["计算机视觉", "人脸识别", "医学影像", "基础模型"],
    summary: "深圳大学人工智能学院副院长、计算机视觉研究所所长，研究视觉识别、医学影像和大模型。",
    facts: [
      { label: "当前任职", value: "深圳大学人工智能学院副院长、计算机视觉研究所所长、教授、博士生导师。", source: sources.shenProfile },
      { label: "研究主线", value: "Computer vision、face recognition、medical imaging、data-efficient learning 与 foundation models。", source: sources.shenProfile },
      { label: "教育与学术训练", value: "上海交通大学本科、硕士；University of Nottingham 博士。", source: sources.shenProfile },
      { label: "研究与平台", value: "官方主页记录其团队参与建设中文百亿参数基础模型“伶荔”，并持续推动视觉与医学 AI 应用。", source: sources.shenProfile },
    ],
    stage: "institute", sources: [sources.shenProfile, sources.szuAiRoster], portraitSource: sources.shenProfile, x: 340, y: 340,
  }),
  person({
    id: "adrian-hilton-surrey", name: "Adrian Hilton", role: "Professor of Computer Vision and AI", institution: "Surrey", region: "Europe",
    area: "Computer Vision · 4D Vision · People-Centred AI", tags: ["计算机视觉", "4D vision", "多模态", "招 PhD"],
    summary: "Surrey 视觉、语音和以人为本 AI 的核心带头人，研究动态场景、4D 视觉与多模态感知。",
    facts: [
      { label: "当前任职", value: "University of Surrey Professor of Computer Vision and AI，CVSSP Director，并创办 Institute for People-Centred AI。", source: sources.hiltonProfile },
      { label: "研究主线", value: "Perceptual AI、4D computer vision、动态人物与场景建模、多模态内容理解。", source: sources.hiltonProfile },
      { label: "教育与学术训练", value: "在 University of Surrey 完成博士训练并长期建设 CVSSP 视觉研究体系。", source: sources.hiltonProfile },
      { label: "招生状态", value: "官方主页公开欢迎 computer vision and AI 方向的 PhD 与 postdoctoral applications。", source: sources.hiltonProfile },
    ],
    stage: "institute", sources: [sources.hiltonProfile, sources.surreyAiRoster], portraitSource: sources.hiltonProfile, x: 160, y: 540,
  }),
  person({
    id: "josef-kittler-surrey", name: "Josef Kittler", role: "Distinguished Professor of Machine Intelligence", institution: "Surrey", region: "Europe",
    area: "Pattern Recognition · Computer Vision · Biometrics", tags: ["模式识别", "计算机视觉", "生物识别", "机器智能"],
    summary: "Surrey CVSSP 奠基型机器智能教授，长期研究模式识别、计算机视觉、信息融合和生物识别。",
    facts: [
      { label: "当前任职", value: "University of Surrey Distinguished Professor of Machine Intelligence，隶属 CVSSP。", source: sources.kittlerProfile },
      { label: "研究主线", value: "Pattern recognition、computer vision、biometrics、information fusion 与机器智能。", source: sources.kittlerProfile },
      { label: "教育与学术训练", value: "学术训练和研究经历横跨 Cambridge、Southampton、ENS Télécom、Oxford 与 Rutherford Appleton Laboratory。", source: sources.kittlerProfile },
      { label: "为什么值得关注", value: "其长期工作构成 Surrey 视觉与模式识别学术网络的重要上游。", source: sources.cvsspSecurity },
    ],
    stage: "institute", sources: [sources.kittlerProfile, sources.cvsspSecurity], portraitSource: sources.kittlerProfile, x: 320, y: 540,
  }),
  person({
    id: "rainer-stiefelhagen-kit", name: "Rainer Stiefelhagen", role: "Professor · CV:HCI Director", institution: "KIT", region: "Europe",
    area: "Computer Vision · Multimodal Interaction · Assistive AI", tags: ["计算机视觉", "多模态交互", "人机交互", "辅助技术"],
    summary: "KIT CV:HCI 负责人，研究人类感知、多模态交互、机器人与无障碍辅助智能。",
    facts: [
      { label: "当前任职", value: "Karlsruhe Institute of Technology Professor，并领导 Computer Vision for Human-Computer Interaction (CV:HCI)。", source: sources.stiefelhagenProfile },
      { label: "研究主线", value: "Visual and audio perception of humans、multimodal interaction、robots 与 assistive technologies。", source: sources.stiefelhagenProfile },
      { label: "教育与学术训练", value: "在 Karlsruhe 完成计算机科学训练，并围绕感知式人机交互建立长期研究方向。", source: sources.stiefelhagenProfile },
      { label: "为什么值得关注", value: "其团队把视觉、语音和人机交互连接到无障碍与机器人场景，是 KIT 跨方向 AI 的核心节点。", source: sources.kitFaculty },
    ],
    stage: "institute", sources: [sources.stiefelhagenProfile, sources.kitFaculty], portraitSource: sources.stiefelhagenProfile, x: 480, y: 540,
  }),
  person({
    id: "sophia-ananiadou-manchester", name: "Sophia Ananiadou", role: "Chair in Computer Science", institution: "Manchester", region: "Europe",
    area: "Natural Language Processing · Text Mining · Biomedical AI", tags: ["NLP", "文本挖掘", "生物医学 AI", "agentic AI", "招 PhD"],
    summary: "Manchester NLP 与文本挖掘资深教授、NaCTeM 负责人，连接语言技术、生物医学知识发现和当前 agentic AI。",
    facts: [
      { label: "当前任职", value: "University of Manchester Chair in Computer Science，并任 National Centre for Text Mining (NaCTeM) Director。", source: sources.ananiadouProfile },
      { label: "研究主线", value: "Natural language processing、text mining、biomedical knowledge discovery、robust and interpretable NLP 与 agentic AI。", source: sources.ananiadouProfile },
      { label: "教育与学术训练", value: "在 UMIST 完成 computational linguistics 博士训练。", source: sources.ananiadouProfile },
      { label: "招生状态", value: "Manchester 官方研究档案明确标注接受 PhD students。", source: sources.ananiadouProfile },
    ],
    stage: "institute", sources: [sources.ananiadouProfile, sources.manchesterMib], portraitSource: sources.ananiadouProfile, x: 640, y: 540,
  }),
  person({
    id: "pekka-marttinen-aalto", name: "Pekka Marttinen", role: "Associate Professor", institution: "Aalto", region: "Europe",
    area: "Machine Learning for Health · Probabilistic ML · LLMs · Causal Inference", tags: ["概率机器学习", "医疗 AI", "LLM", "因果推断"],
    summary: "Aalto 机器学习与健康数据 PI，研究概率模型、因果推断、大模型和生物医学应用。",
    facts: [
      { label: "当前任职", value: "Aalto University tenured Associate Professor；2026–2031 任 School of Science Vice Dean for Education。", source: sources.marttinenProfile },
      { label: "研究主线", value: "Machine learning for health、probabilistic ML、large language models 与 causal inference。", source: sources.marttinenProfile },
      { label: "教育与学术训练", value: "2008 年获 University of Helsinki Statistics 博士学位。", source: sources.marttinenProfile },
      { label: "为什么值得关注", value: "其工作把方法型机器学习与医疗、生物和科学数据连接起来，是 Aalto 跨学科 AI 的重要节点。", source: sources.aaltoFaculty },
    ],
    stage: "senior", sources: [sources.marttinenProfile, sources.aaltoFaculty], portraitSource: sources.marttinenProfile, x: 800, y: 540,
  }),
  person({
    id: "haoran-xie-lingnan", name: "Haoran Xie", chinese: "謝浩然", role: "Professor", institution: "Lingnan", region: "Hong Kong",
    area: "Artificial Intelligence · Big Data · Educational Technology", tags: ["AI", "大数据", "教育技术", "LLM", "推理"],
    summary: "岭南大学数据科学与人工智能负责人之一，研究大模型、情感分析、推理和教育技术。",
    facts: [
      { label: "当前任职", value: "Lingnan University Professor、School of Data Science Associate Dean，并负责 Division of Artificial Intelligence。", source: sources.xieProfile },
      { label: "研究主线", value: "Artificial intelligence、big data、educational technology、LLM reasoning 与 sentiment analysis。", source: sources.xieProfile },
      { label: "教育与学术训练", value: "City University of Hong Kong 博士，并在 University of Bristol 完成教育学博士训练。", source: sources.xieProfile },
      { label: "学术平台", value: "同时承担 Leo Dr David P. Chan Institute of Data Science 的领导工作。", source: sources.lingnanIds },
    ],
    stage: "institute", sources: [sources.xieProfile, sources.lingnanIds], portraitSource: sources.xieProfile, x: 210, y: 740,
  }),
  person({
    id: "hai-liu-hsuhk", name: "Hai Liu", chinese: "劉海", role: "Professor", institution: "HSUHK", region: "Hong Kong",
    area: "Artificial Intelligence · Cloud Computing · Algorithms", tags: ["AI", "云计算", "算法", "无线网络"],
    summary: "香港恒生大学计算机科学系主任，研究 AI、云计算、无线系统和算法设计。",
    facts: [
      { label: "当前任职", value: "HSUHK Department of Computer Science Head and Professor，并任 School of Decision Sciences Associate Dean (Research)。", source: sources.liuProfile },
      { label: "研究主线", value: "Artificial intelligence、cloud computing、wireless systems 与 algorithm design。", source: sources.liuProfile },
      { label: "教育与学术训练", value: "City University of Hong Kong 博士；South China University of Technology 本科与硕士。", source: sources.liuProfile },
      { label: "为什么值得关注", value: "其院系领导角色连接算法、网络与应用 AI，是香港较小院校中容易被主流 CS 名录遗漏的资深节点。", source: sources.hsuhkRoster },
    ],
    stage: "institute", sources: [sources.liuProfile, sources.hsuhkRoster], portraitSource: sources.liuProfile, x: 390, y: 740,
  }),
  person({
    id: "na-zhao-sutd", name: "Na Zhao", chinese: "赵娜", role: "Tenure-track Assistant Professor", institution: "SUTD", region: "Singapore",
    area: "Computer Vision · 3D Point Clouds · Robust Multimodal Learning", tags: ["计算机视觉", "3D 点云", "多模态", "持续学习", "鲁棒学习"],
    summary: "SUTD 新兴视觉与机器学习 PI，研究 3D 点云、数据高效学习、分布外泛化和鲁棒多模态系统。",
    facts: [
      { label: "当前任职", value: "2022 年起任 SUTD Information Systems Technology and Design tenure-track Assistant Professor。", source: sources.zhaoProfile },
      { label: "研究主线", value: "Computer vision、3D point clouds、data-efficient learning、OOD generalization、multimodal and continual learning。", source: sources.zhaoProfile },
      { label: "教育与学术训练", value: "2021 年获 National University of Singapore 博士学位。", source: sources.zhaoProfile },
      { label: "为什么值得关注", value: "是 SUTD Artificial and Augmented Intelligence 社区中连接三维视觉与鲁棒学习的新一代独立 PI。", source: sources.sutdAiRoster },
    ],
    stage: "emerging", sources: [sources.zhaoProfile, sources.sutdAiRoster], portraitSource: sources.zhaoProfile, x: 570, y: 740,
  }),
  person({
    id: "frans-oliehoek-tudelft", name: "Frans A. Oliehoek", role: "Full Professor of Interactive Learning and Decision Making", institution: "TU Delft", region: "Europe",
    area: "Reinforcement Learning · Multi-Agent Systems · Decision Making", tags: ["强化学习", "多智能体", "决策", "博弈论", "ELLIS"],
    summary: "TU Delft 交互式学习与决策教授、ELLIS Unit Delft 联合创办人，研究强化学习、多智能体规划和不确定性决策。",
    facts: [
      { label: "当前任职", value: "TU Delft Department of Intelligent Systems Full Professor，并共同领导 Sequential Decision Making group。", source: sources.oliehoekProfile },
      { label: "研究主线", value: "Interactive learning and decision making、reinforcement learning、multi-agent systems、machine learning 与 game theory。", source: sources.oliehoekProfile },
      { label: "教育与学术训练", value: "2010 年获 University of Amsterdam Computer Science 博士；曾在 MIT、Maastricht 与 Liverpool 任职。", source: sources.oliehoekProfile },
      { label: "学术平台", value: "Director and Co-Founder of ELLIS Unit Delft，并共同建设 TU Delft Sequential Decision Making 社区。", source: sources.delftDecisionRoster },
    ],
    stage: "institute", sources: [sources.oliehoekProfile, sources.delftDecisionRoster], portraitSource: sources.oliehoekProfile, x: 960, y: 540,
  }),
  person({
    id: "bheema-lokesh-suss", name: "Bheema Thiagarajan Lokesh", role: "Associate Professor · Programme Head", institution: "SUSS", region: "Singapore",
    area: "Machine Learning · Artificial Intelligence · Signal Processing", tags: ["机器学习", "AI", "信号处理", "通信系统"],
    summary: "SUSS 工程与应用 AI 教授，研究机器学习、人工智能和通信信号处理，并长期负责电子工程项目。",
    facts: [
      { label: "当前任职", value: "Singapore University of Social Sciences Associate Professor and Head of Electronics Engineering Programme。", source: sources.lokeshProfile },
      { label: "研究主线", value: "Machine learning、artificial intelligence、signal processing in communication systems 与 blockchain applications。", source: sources.lokeshProfile },
      { label: "教育与学术训练", value: "2009 年获 National University of Singapore 博士学位。", source: sources.lokeshProfile },
      { label: "任职轨迹", value: "加入 SUSS 前曾任 A*STAR Institute for Infocomm Research Research Fellow。", source: sources.lokeshCv },
    ],
    stage: "senior", sources: [sources.lokeshProfile, sources.lokeshCv], portraitSource: sources.lokeshProfile, x: 730, y: 740,
  }),
  person({
    id: "nan-liu-duke-nus", name: "Nan Liu", chinese: "刘楠", role: "Associate Professor · DAISI Director", institution: "Duke-NUS", region: "Singapore",
    area: "Trustworthy Clinical AI · Health Data Science · Medical Imaging", tags: ["医疗 AI", "可信 AI", "可解释机器学习", "健康数据", "招 PhD", "招 RA"],
    summary: "Duke-NUS 医疗 AI 与健康数据科学 PI，研究可信、可解释的临床机器学习，并推动医疗技术转化。",
    facts: [
      { label: "当前任职", value: "Duke-NUS Associate Professor、AI + Medical Sciences Initiative Director，并共同领导 SingHealth Duke-NUS AI in Medicine Institute。", source: sources.liuLab },
      { label: "研究主线", value: "Trustworthy and explainable machine learning、health data science、EHR、medical imaging 与 physiological signals。", source: sources.liuDuke },
      { label: "教育与学术训练", value: "Nanyang Technological University 博士；University of Science and Technology Beijing 工学学士。", source: sources.liuDuke },
      { label: "产业与转化", value: "联合创办 TIIM Healthcare 并任 Scientific Advisor，研究同时面向 clinical translation and commercialization。", source: sources.liuLab },
      { label: "招生状态", value: "实验室公开招收具备统计、AI、机器学习和健康数据科学背景的 PhD、Research Fellow 与 Research Assistant。", source: sources.liuOpportunities },
    ],
    stage: "institute", sources: [sources.liuDuke, sources.liuLab, sources.liuOpportunities], portraitSource: sources.liuLab, x: 890, y: 740,
  }),
];
