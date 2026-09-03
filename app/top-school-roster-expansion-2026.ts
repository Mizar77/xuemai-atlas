import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  yilunHarvard: source("Harvard SEAS profile", "https://seas.harvard.edu/person/yilun-du", "official", "Current Harvard appointment and AI research areas"),
  yilunHome: source("Yilun Du homepage", "https://yilundu.github.io/", "profile", "Research agenda, MIT advisers, industry links and recruiting status"),
  furongUmd: source("UMD Computer Science profile", "https://www.cs.umd.edu/people/furongh", "official", "Current UMD appointments and research areas"),
  furongHome: source("Furong Huang homepage", "https://furong-huang.com/", "profile", "Trustworthy foundation-model research and lab information"),
  yixuanHome: source("Yixuan Li homepage", "https://pages.cs.wisc.edu/~sharonli/", "profile", "Current UW–Madison role, research, advisers and recruiting note"),
  yixuanRoster: source("UW–Madison Computer Sciences faculty", "https://www.cs.wisc.edu/faculty/", "official", "Department faculty-roster membership"),
  rothPennNlp: source("Penn NLP people", "https://nlp.cis.upenn.edu/", "official", "Penn NLP faculty-roster membership and portrait"),
  rothCv: source("Dan Roth CV", "https://www.seas.upenn.edu/~danroth/Research/cv.pdf", "cv", "Current Penn/AWS roles, education, adviser and research leadership"),
  renUsc: source("USC Viterbi faculty profile", "https://viterbi.usc.edu/directory/faculty/Ren/Xiang", "official", "Current USC appointment, chair title and research areas"),
  renInk: source("USC INK Lab people", "https://inklab.usc.edu/people.html", "profile", "INK Lab leadership and current group context"),
  zhangPalm: source("Southeast University PALM roster", "https://aiia.seu.edu.cn/palm/members/list.htm", "official", "Current faculty-roster membership and professor title"),
  zhangHome: source("张敏灵个人主页", "https://palm.seu.edu.cn/zhangml/", "profile", "Research interests, education and portrait"),
  chengNankai: source("南开大学教师主页", "https://cc.nankai.edu.cn/2021/0323/c13619a548889/page.htm", "official", "Current professor and department-chair role, research and portrait"),
  chengHome: source("程明明研究组主页", "https://mmcheng.net/", "profile", "Computer-vision research agenda and group context"),
  chengCv: source("Ming-Ming Cheng CV", "https://cg.cs.tsinghua.edu.cn/people/~cmm/CV/ChengCV.pdf", "cv", "Tsinghua doctoral training and Shi-Min Hu supervision"),
  dengImperial: source("Imperial College profile", "https://profiles.imperial.ac.uk/j.deng16", "official", "Current Computing appointment, research and portrait"),
  dengHome: source("Jiankang Deng homepage", "https://jiankangdeng.github.io/", "profile", "MVP Lab, face recognition, 3D vision and doctoral training"),
  augHome: source("Isabelle Augenstein homepage", "https://isabelleaugenstein.github.io/", "profile", "Current Copenhagen role, group leadership and research agenda"),
  augKu: source("University of Copenhagen faculty record", "https://di.ku.dk/english/staff/vip/?pure=en%2Fpersons%2Fisabelle-augenstein%28929ec255-2eae-4e6d-b826-5e7abd210f06%29.html", "official", "Department appointment and AI-section membership"),
  plankLmu: source("LMU CIS faculty profile", "https://www.cis.lmu.de/personen/professoren/bplank/index.html", "official", "Chair and co-director appointments"),
  plankHome: source("Barbara Plank homepage", "https://bplank.github.io/", "profile", "Human-facing NLP research and portrait"),
  heKcl: source("King's College London profile", "https://www.kcl.ac.uk/people/yulan-he", "official", "Current NLP professorship, education and research agenda"),
  hePure: source("King's research portal", "https://kclpure.kcl.ac.uk/portal/en/persons/yulan.he", "official", "Chair of NLP affiliation and current projects"),
  kaskiAalto: source("Aalto research portal", "https://research.aalto.fi/en/persons/samuel-kaski/", "official", "Current professorship, ELLIS/FCAI affiliations, education and research"),
  kaskiLab: source("Kaski Lab", "https://kaski-lab.com/", "profile", "Probabilistic machine-learning group and research programme"),
  qiHku: source("HKU ECE profile", "https://ece.hku.hk/people/xjqi/", "official", "Current associate-professor role, education and research interests"),
  qiHome: source("Xiaojuan Qi homepage", "https://xjqi.github.io/", "profile", "CVMI Lab research and portrait"),
  leeNus: source("NUS Computing profile", "https://www.comp.nus.edu.sg/cs/people/leegh/", "official", "Current appointment, education, research and recruiting note"),
  leeLab: source("Gim Hee Lee research page", "https://www.comp.nus.edu.sg/~leegh/", "profile", "3D vision, robotics and embodied-AI group context"),
  caoSmu: source("SMU faculty directory", "https://faculty.smu.edu.sg/profile/cao-zhiguang-7411", "official", "Current appointment, qualifications, research and advisees"),
  caoCv: source("Zhiguang Cao CV", "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2024-01/zgcao-CV.pdf", "cv", "Academic trajectory across SMU, A*STAR, NUS and NTU"),
};

function person(
  value: Omit<Person, "category" | "primary" | "introducedAt" | "lastVerifiedAt" | "sources" | "portrait"> & {
    sources: Source[];
    portraitSource: Source;
  },
): Person {
  const { portraitSource, ...rest } = value;
  return {
    ...rest,
    category: "core",
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: { src: `portraits/top-school-roster-2026/${value.id}.jpg`, alt: `${value.name} portrait`, source: portraitSource },
  };
}

export const topSchoolRosterPeople2026: Person[] = [
  person({ id: "yilun-du-top", name: "Yilun Du", role: "Assistant Professor of Computer Science", institution: "Harvard", region: "United States", area: "Generative Models · World Models · Robot Learning", tags: ["生成模型", "世界模型", "机器人", "multi-agent", "招 PhD"], summary: "Harvard Embodied Minds Lab 负责人，研究可组合生成模型、世界模型、测试时推理与机器人规划；同时任 NVIDIA Research 兼职研究科学家。", facts: [
    { label: "当前任职", value: "Harvard Computer Science Assistant Professor，隶属 Kempner Institute，并领导 Embodied Minds Lab。", source: sources.yilunHome },
    { label: "研究主线", value: "让模型学习可复用知识，并在推理时进行搜索、组合、规划和多智能体协作。", source: sources.yilunHome },
    { label: "教育与学术训练", value: "MIT EECS 博士，由 Leslie Kaelbling、Tomas Lozano-Pérez 与 Joshua B. Tenenbaum 共同指导。", source: sources.yilunHome },
    { label: "产业与招生", value: "曾在 OpenAI、Google DeepMind 开展研究；主页明确招收 2026 年 12 月申请周期博士生。", source: sources.yilunHome },
  ], stage: "emerging", sources: [sources.yilunHarvard, sources.yilunHome], portraitSource: sources.yilunHarvard, x: 160, y: 160 }),
  person({ id: "furong-huang-top", name: "Furong Huang", role: "Associate Professor", institution: "UMD", region: "United States", area: "Trustworthy Machine Learning · Foundation Models · Robotics", tags: ["可信机器学习", "基础模型", "强化学习", "机器人"], summary: "UMD 可信基础模型与机器人学习 PI，横跨计算机、UMIACS、ECE 与应用数学，研究可靠生成式 AI、强化学习和具身系统。", facts: [
    { label: "当前任职", value: "UMD Computer Science Associate Professor，并与 UMIACS、ECE、AIM、AMSC 交叉任职。", source: sources.furongUmd },
    { label: "研究主线", value: "Trustworthy ML、reinforcement learning、generative AI 与面向机器人的 foundation models。", source: sources.furongUmd },
    { label: "教育与学术训练", value: "博士阶段师从 Anima Anandkumar；加入 UMD 前在 Microsoft Research New York 接受 John Langford 与 Robert Schapire 指导。", source: sources.furongHome },
    { label: "实验室定位", value: "团队聚焦可解释、可验证并能在真实系统中部署的基础模型。", source: sources.furongHome },
  ], stage: "senior", sources: [sources.furongUmd, sources.furongHome], portraitSource: sources.furongUmd, x: 310, y: 160 }),
  person({ id: "yixuan-li-top", name: "Yixuan (Sharon) Li", role: "Associate Professor", institution: "Wisconsin", region: "United States", area: "Reliable Machine Learning · OOD Detection · LLM Agents", tags: ["可靠 AI", "OOD", "不确定性", "LLM agents"], summary: "UW–Madison 可靠机器学习 PI，研究分布外检测、不确定性、安全后训练与可靠 LLM agents。", facts: [
    { label: "当前任职", value: "UW–Madison Computer Sciences Associate Professor。", source: sources.yixuanHome },
    { label: "研究主线", value: "Reliable intelligence，重点覆盖 OOD generalization、uncertainty、LLM agents 与 post-training。", source: sources.yixuanHome },
    { label: "教育与学术训练", value: "2017 年 Cornell 博士，导师 John Hopcroft，并与 Kilian Weinberger 密切合作；随后在 Stanford 与 Christopher Ré 开展博士后研究。", source: sources.yixuanHome },
    { label: "招生状态", value: "主页当前明确写明 Fall 2027 没有新博士生名额，避免把历史招聘信息误当作现状。", source: sources.yixuanHome },
  ], stage: "senior", sources: [sources.yixuanHome, sources.yixuanRoster], portraitSource: sources.yixuanHome, x: 460, y: 160 }),
  person({ id: "dan-roth-top", name: "Dan Roth", role: "Eduardo D. Glandt Distinguished Professor · AWS VP", institution: "Penn", region: "United States", area: "Natural Language Understanding · Machine Learning · Reasoning", tags: ["NLP", "推理", "知识表示", "AWS"], summary: "Penn NLP 资深 PI 与 AWS AI Labs 副总裁，长期研究学习、推理、信息抽取与可信语言理解。", facts: [
    { label: "当前任职", value: "Penn Eduardo D. Glandt Distinguished Professor；同时任 AWS AI Labs VP / Distinguished Scientist。", source: sources.rothCv },
    { label: "研究主线", value: "Natural language understanding、machine learning、knowledge representation and reasoning。", source: sources.rothCv },
    { label: "教育与学术训练", value: "1995 年 Harvard Computer Science 博士，论文 Learning in Order to Reason，导师 Leslie G. Valiant。", source: sources.rothCv },
    { label: "学术影响", value: "2017 IJCAI John McCarthy Award；ACL、AAAI、ACM、AAAS Fellow。", source: sources.rothCv },
  ], stage: "institute", sources: [sources.rothPennNlp, sources.rothCv], portraitSource: sources.rothPennNlp, x: 610, y: 160 }),
  person({ id: "xiang-ren-top", name: "Xiang Ren", role: "Associate Professor · Early Career Chair", institution: "USC", region: "United States", area: "Natural Language Processing · Knowledge Graphs · Trustworthy AI", tags: ["NLP", "知识图谱", "可信 AI", "信息抽取"], summary: "USC INK Lab 负责人，研究自然语言理解、知识获取与可信基础模型，并连接 USC CS 与 ISI。", facts: [
    { label: "当前任职", value: "USC Associate Professor，Andrew and Erna Viterbi Early Career Chair。", source: sources.renUsc },
    { label: "研究主线", value: "Natural language processing、machine learning、knowledge graphs 与可信 AI。", source: sources.renUsc },
    { label: "教育与学术训练", value: "2017 年获 UIUC Computer Science 博士学位，此前在 UIUC 完成硕士训练。", source: sources.renUsc },
    { label: "研究组", value: "领导 Intelligence and Knowledge Discovery (INK) Lab，并在 USC ISI 领导研究团队。", source: sources.renInk },
  ], stage: "senior", sources: [sources.renUsc, sources.renInk], portraitSource: sources.renUsc, x: 760, y: 160 }),

  person({ id: "minling-zhang-top", name: "张敏灵", role: "教授", institution: "SEU", region: "Mainland China", area: "Machine Learning · Multi-Label Learning · Weak Supervision", tags: ["机器学习", "多标记学习", "弱监督", "数据挖掘"], summary: "东南大学 PALM 机器学习资深 PI，长期推动多标记学习、弱监督学习和不完整标注学习。", facts: [
    { label: "当前任职", value: "东南大学计算机科学与工程学院 / 人工智能学院教授，PALM 实验室 faculty。", source: sources.zhangPalm },
    { label: "研究主线", value: "Machine learning、data mining，重点包括 multi-label learning 与 weakly supervised learning。", source: sources.zhangHome },
    { label: "教育与学术训练", value: "南京大学计算机学士、硕士和博士。", source: sources.zhangHome },
    { label: "为什么值得关注", value: "其工作把多标记学习从问题定义、算法设计推进到广泛应用，是中国机器学习方法研究的重要节点。", source: sources.zhangHome },
  ], stage: "senior", sources: [sources.zhangPalm, sources.zhangHome], portraitSource: sources.zhangHome, x: 180, y: 360 }),
  person({ id: "mingming-cheng-top", name: "程明明", role: "教授 · 计算机科学系主任", institution: "Nankai", region: "Mainland China", area: "Computer Vision · Visual Saliency · Image Processing", tags: ["计算机视觉", "显著性检测", "图像处理", "视觉大模型"], summary: "南开大学计算机视觉带头人，研究视觉显著性、图像理解、内容生成与大规模视觉学习。", facts: [
    { label: "当前任职", value: "南开大学教授、计算机科学系主任。", source: sources.chengNankai },
    { label: "研究主线", value: "Artificial intelligence、computer vision、image/video big data、graphics and visualization。", source: sources.chengNankai },
    { label: "教育与学术训练", value: "2012 年在清华大学获得计算机科学博士学位，导师为胡事民；随后在 Oxford Brookes / Oxford 开展研究。", source: sources.chengCv },
    { label: "为什么值得关注", value: "连接经典视觉表征与当前视觉基础模型，是南开视觉学术网络的核心入口。", source: sources.chengHome },
  ], stage: "institute", sources: [sources.chengNankai, sources.chengHome], portraitSource: sources.chengNankai, x: 360, y: 360 }),

  person({ id: "jiankang-deng-top", name: "Jiankang Deng", role: "Assistant Professor", institution: "Imperial", region: "Europe", area: "Computer Vision · Multimodal Models · 3D World Modeling", tags: ["计算机视觉", "多模态", "3D", "生成模型"], summary: "Imperial MVP Lab 负责人，研究人脸识别、多模态基础模型、三维世界建模与生成式视觉。", facts: [
    { label: "当前任职", value: "Imperial College London Department of Computing Assistant Professor。", source: sources.dengImperial },
    { label: "研究组", value: "领导 Multimodal Vision and Perception (MVP) Lab。", source: sources.dengHome },
    { label: "教育与学术训练", value: "2020 年 Imperial 博士，导师 Stefanos Zafeiriou。", source: sources.dengImperial },
    { label: "研究主线", value: "Multimodal foundation models、generative physical-world modeling、face recognition 与 3D vision。", source: sources.dengImperial },
  ], stage: "emerging", sources: [sources.dengImperial, sources.dengHome], portraitSource: sources.dengImperial, x: 170, y: 550 }),
  person({ id: "isabelle-augenstein-top", name: "Isabelle Augenstein", role: "Professor · Deputy Head for Research", institution: "Copenhagen", region: "Europe", area: "Natural Language Processing · Factuality · Responsible AI", tags: ["NLP", "事实核查", "偏见", "可解释性"], summary: "Copenhagen NLU 负责人，研究事实性、误导信息、偏见与可解释 NLP，并共同领导 Pioneer Centre for AI。", facts: [
    { label: "当前任职", value: "University of Copenhagen Computer Science Professor，并任 Department Deputy Head for Research。", source: sources.augHome },
    { label: "研究主线", value: "Fair and accountable NLP、factuality、misinformation、bias 与 explainability。", source: sources.augKu },
    { label: "教育与学术训练", value: "University of Sheffield 博士；任教前曾在 UCL Machine Reading group 开展博士后研究。", source: sources.augHome },
    { label: "研究组", value: "领导 Copenhagen Natural Language Understanding，并共同领导 Pioneer Centre for AI。", source: sources.augHome },
  ], stage: "senior", sources: [sources.augHome, sources.augKu], portraitSource: sources.augHome, x: 320, y: 550 }),
  person({ id: "barbara-plank-top", name: "Barbara Plank", role: "Chair for AI and Computational Linguistics", institution: "LMU", region: "Europe", area: "Natural Language Processing · Robustness · Human-Centred AI", tags: ["NLP", "语言变体", "鲁棒性", "human-facing AI"], summary: "LMU AI 与计算语言学讲席教授、MaiNLP 负责人，研究语言变体、鲁棒 NLP、公平性与人类标注差异。", facts: [
    { label: "当前任职", value: "LMU Chair for AI and Computational Linguistics，并任 CIS Co-Director。", source: sources.plankLmu },
    { label: "研究主线", value: "Robust and inclusive NLP、language variation、fairness、human label variation。", source: sources.plankHome },
    { label: "教育与学术训练", value: "在 University of Groningen 完成计算语言学博士训练，博士研究聚焦语言变体与跨域学习。", source: sources.plankHome },
    { label: "研究组", value: "领导 MaiNLP，关注 human-facing NLP。", source: sources.plankHome },
  ], stage: "senior", sources: [sources.plankLmu, sources.plankHome], portraitSource: sources.plankHome, x: 470, y: 550 }),
  person({ id: "yulan-he-top", name: "Yulan He", role: "Professor in Natural Language Processing", institution: "KCL", region: "Europe", area: "LLM Reasoning · Agentic AI · Natural Language Processing", tags: ["LLM 推理", "agentic AI", "NLP", "安全对齐"], summary: "King's NLP 讲席教授，研究 LLM 推理、智能体、长上下文问答、可解释性与安全对齐。", facts: [
    { label: "当前任职", value: "King's College London Department of Informatics Professor in Natural Language Processing。", source: sources.heKcl },
    { label: "研究主线", value: "LLM reasoning、agentic AI、long-context QA、interpretability、safety and alignment。", source: sources.heKcl },
    { label: "教育与学术训练", value: "University of Cambridge spoken-language-understanding 博士；NTU Computer Engineering MEng 与 BASc。", source: sources.heKcl },
    { label: "研究项目", value: "主持或参与 event-centric NLU、可信生成式 AI 与 AI for education/health/science 项目。", source: sources.hePure },
  ], stage: "senior", sources: [sources.heKcl, sources.hePure], portraitSource: sources.heKcl, x: 620, y: 550 }),
  person({ id: "samuel-kaski-top", name: "Samuel Kaski", role: "Professor · ELLIS Institute", institution: "Aalto", region: "Europe", area: "Probabilistic Machine Learning · AI for Science · Computational Medicine", tags: ["概率机器学习", "AI for Science", "生物信息学", "计算医学"], summary: "Aalto 概率机器学习资深 PI，连接 ELLIS Institute、FCAI、AI for Science 与计算医学。", facts: [
    { label: "当前任职", value: "Aalto Computer Science Professor，同时隶属 ELLIS Institute 与 Finnish Center for Artificial Intelligence。", source: sources.kaskiAalto },
    { label: "研究主线", value: "Probabilistic modelling、machine learning、bioinformatics、computational medicine 与 human-AI interaction。", source: sources.kaskiAalto },
    { label: "教育与学术训练", value: "Helsinki University of Technology 工程博士（1997）与硕士（1993）。", source: sources.kaskiAalto },
    { label: "研究组", value: "Kaski Lab 将概率建模用于科学发现、个性化系统与生物医学问题。", source: sources.kaskiLab },
  ], stage: "institute", sources: [sources.kaskiAalto, sources.kaskiLab], portraitSource: sources.kaskiAalto, x: 770, y: 550 }),

  person({ id: "xiaojuan-qi-top", name: "Xiaojuan Qi", chinese: "祁晓娟", role: "Associate Professor", institution: "HKU", region: "Hong Kong", area: "3D Vision · Deep Learning · AI for Science and Medicine", tags: ["3D 视觉", "深度学习", "AI for Science", "医学 AI"], summary: "HKU CVMI Lab 负责人，研究开放世界三维感知、重建、具身智能以及 AI for science and medicine。", facts: [
    { label: "当前任职", value: "HKU Electrical and Computer Engineering Associate Professor。", source: sources.qiHku },
    { label: "研究主线", value: "3D vision、deep learning、artificial intelligence、AI for science and medicine。", source: sources.qiHku },
    { label: "教育与学术训练", value: "2018 年 CUHK 博士，2014 年 SJTU 工学学士；曾在 Oxford、Toronto 与 Intel 开展研究。", source: sources.qiHku },
    { label: "研究组", value: "领导 Computer Vision and Machine Intelligence (CVMI) Lab。", source: sources.qiHome },
  ], stage: "senior", sources: [sources.qiHku, sources.qiHome], portraitSource: sources.qiHome, x: 200, y: 760 }),
  person({ id: "gim-hee-lee-top", name: "Gim Hee Lee", role: "Associate Professor", institution: "NUS", region: "Singapore", area: "3D Computer Vision · Robotic Perception · Embodied AI", tags: ["3D 视觉", "机器人感知", "具身 AI", "招学生"], summary: "NUS 3D 视觉与机器人感知 PI，研究空间与物理智能、动态场景建模和 embodied AI。", facts: [
    { label: "当前任职", value: "NUS School of Computing Associate Professor。", source: sources.leeNus },
    { label: "研究主线", value: "3D scene understanding、neural 3D modeling、multiview geometry、robot perception 与 embodied AI。", source: sources.leeNus },
    { label: "教育与学术训练", value: "ETH Zurich Computer Science Dr.sc.；NUS Mechanical Engineering MEng 与 BEng。", source: sources.leeNus },
    { label: "招生状态", value: "官方主页明确表示持续寻找对 3D vision、robotics 与 embodied intelligence 感兴趣的学生。", source: sources.leeNus },
  ], stage: "senior", sources: [sources.leeNus, sources.leeLab], portraitSource: sources.leeNus, x: 370, y: 760 }),
  person({ id: "zhiguang-cao-top", name: "Zhiguang Cao", chinese: "曹志光", role: "Assistant Professor of Computer Science", institution: "SMU", region: "Singapore", area: "Combinatorial Optimization · Reinforcement Learning · Urban AI", tags: ["组合优化", "强化学习", "运筹与 AI", "城市计算"], summary: "SMU 决策与优化 PI，把强化学习、图学习和组合优化用于物流、交通与可持续城市系统。", facts: [
    { label: "当前任职", value: "SMU Assistant Professor of Computer Science、Lee Kong Chian Fellow。", source: sources.caoSmu },
    { label: "研究主线", value: "Decision making and optimization、machine learning and intelligence、urban logistics and sustainability。", source: sources.caoSmu },
    { label: "教育与学术训练", value: "2017 年 NTU 博士，并在 NTU 完成硕士。", source: sources.caoSmu },
    { label: "任职轨迹", value: "2023 年加入 SMU；此前任 A*STAR Scientist、NUS Research Assistant Professor 与 NTU Research Fellow。", source: sources.caoCv },
  ], stage: "emerging", sources: [sources.caoSmu, sources.caoCv], portraitSource: sources.caoSmu, x: 540, y: 760 }),
];

export const topSchoolRosterRelationships2026: Relationship[] = [
  {
    id: "tenenbaum-yilun-du-top-phd",
    from: "joshua-tenenbaum-lineage",
    to: "yilun-du-top",
    type: "lineage",
    subtype: "phd_adviser",
    label: "共同博士导师",
    evidence: "Yilun Du 本人主页明确列 Joshua B. Tenenbaum 为三位 MIT EECS 博士导师之一。",
    evidenceObject: "Yilun Du MIT PhD supervision",
    source: sources.yilunHome,
    verified: true,
  },
  {
    id: "shimin-hu-mingming-cheng-phd",
    from: "hu-shimin-thu",
    to: "mingming-cheng-top",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "程明明公开 CV 明确记录其清华大学博士论文导师为胡事民。",
    evidenceObject: "Ming-Ming Cheng Tsinghua PhD supervision",
    source: sources.chengCv,
    verified: true,
  },
];

export const topSchoolRosterGroupMembers2026: GroupMember[] = [
  { id: "mingming-cheng-jufeng-yang", teacherId: "mingming-cheng-top", name: "Jufeng Yang", role: "Research-group faculty", focus: "Computer vision", source: sources.chengHome },
  { id: "mingming-cheng-chongyi-li", teacherId: "mingming-cheng-top", name: "Chongyi Li", role: "Research-group member", focus: "Image enhancement and restoration", source: sources.chengHome },
  { id: "mingming-cheng-dengping-fan", teacherId: "mingming-cheng-top", name: "Deng-Ping Fan", role: "Research-group member", focus: "Computer vision and visual perception", source: sources.chengHome },
];
