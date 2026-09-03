import type { Person, Source } from "./data";

const checkedAt = "2026-09-02";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const rosterSources = {
  uva: source("UVA Computer Science faculty roster", "https://engineering.virginia.edu/departments/computer-science/people/faculty", "official", "Department faculty-roster membership"),
  uestc: source("电子科技大学计算机学院导师名录", "https://www.scse.uestc.edu.cn/szdw/jsdw.htm", "official", "学院现任导师名录与独立招生身份"),
  tuwien: source("TU Wien Informatics professors", "https://informatics.tuwien.ac.at/people/professors", "official", "Faculty professor roster and research-unit leadership"),
  eduhk: source("EdUHK AI research expertise roster", "https://www.eduhk.hk/mit/en/research-expertise/ai/", "official", "AI research faculty roster"),
  hkmu: source("HKMU School of Science and Technology key staff", "https://www.hkmu.edu.hk/st/people/key-staff/", "official", "School leadership and academic-staff roster"),
  sit: source("SIT faculty directory", "https://www.singaporetech.edu.sg/directory/faculty", "official", "Infocomm Technology faculty-roster membership"),
};

const profileSources = {
  aidong: source("UVA faculty profile — Aidong Zhang", "https://engineering.virginia.edu/faculty/aidong-zhang", "official", "Appointment, research programme, recruiting note and portrait"),
  aidongEducation: source("UVA School of Medicine faculty directory — Aidong Zhang", "https://med.virginia.edu/faculty/faculty-listing/az9eg/", "official", "Purdue University PhD training and UVA appointment"),
  yangfeng: source("UVA faculty profile — Yangfeng Ji", "https://engineering.virginia.edu/faculty/yangfeng-ji", "official", "Appointment, research, education, career and portrait"),
  jundong: source("UVA faculty profile — Jundong Li", "https://engineering.virginia.edu/faculty/jundong-li", "official", "Joint appointments, PhD adviser, research, industry role and portrait"),
  hengtao: source("电子科技大学教师主页 — 申恒涛", "https://faculty.uestc.edu.cn/shenhengtao/zh_CN/index.htm", "official", "Current roles, education, research and portrait"),
  hengtaoHome: source("Center for Future Media — Heng Tao Shen", "https://cfm.uestc.edu.cn/~shenht/", "profile", "Leadership roles, research programme and doctoral-team context"),
  fumin: source("Center for Future Media — Fumin Shen", "https://cfm.uestc.edu.cn/~fshen/", "profile", "Current appointment, education, research, recruiting note and portrait"),
  fuminOfficial: source("电子科技大学教师主页 — 沈复民", "https://faculty.uestc.edu.cn/shenfumin/zh_CN/index.htm", "official", "University affiliation and faculty identity"),
  lukasiewicz: source("TU Wien profile — Thomas Lukasiewicz", "https://informatics.tuwien.ac.at/people/thomas-lukasiewicz", "official", "Professorship, research-unit leadership, topics, teaching and portrait"),
  gaertner: source("TU Wien profile — Thomas Gärtner", "https://informatics.tuwien.ac.at/people/thomas-gaertner", "official", "Professorship, research-unit leadership, topics, supervision and portrait"),
  neri: source("EdUHK expert profile — Ferrante Neri", "https://www.eduhk.hk/en/experts/professor-neri-ferrante", "official", "Appointment, academic leadership, research and portrait"),
  yangYu: source("EdUHK faculty profile — Yang Yu", "https://www.eduhk.hk/mit/zht/staff/yangyy", "official", "Appointment, PhD, research areas and portrait"),
  wang: source("HKMU staff profile — Philips Wang", "https://www.hkmu.edu.hk/staff-profile/?email=pwang&po=Y&unit=", "official", "Appointment, education, AI/NLP research and portrait"),
  atmosukarto: source("SIT faculty profile — Indriyati Atmosukarto", "https://www.singaporetech.edu.sg/directory/faculty/indriyati-atmosukarto", "official", "Appointment, PhD adviser, research, projects and portrait"),
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
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/top-school-audit-2026/${value.id}.jpg`,
      alt: `${value.name} portrait`,
      source: portraitSource,
    },
  };
}

export const topSchoolComprehensivePeople2026: Person[] = [
  person({
    id: "aidong-zhang-uva", name: "Aidong Zhang", role: "Thomas M. Linville Professor", institution: "UVA", region: "United States",
    area: "Machine Learning · AI for Science · Health Informatics", tags: ["机器学习", "AI for Science", "生成式 AI", "医疗 AI", "招 PhD"],
    summary: "UVA 机器学习与 AI for Science 资深 PI，把可解释、公平和联邦学习用于科学发现、生物信息学与医疗健康。",
    facts: [
      { label: "当前任职", value: "UVA Thomas M. Linville Professor，横跨 Computer Science、Biomedical Engineering 与 School of Data Science。", source: profileSources.aidong },
      { label: "研究主线", value: "Interpretable and fair learning、federated learning、generative AI、AI for Science、bioinformatics 与 health informatics。", source: profileSources.aidong },
      { label: "教育与学术训练", value: "UVA School of Medicine 教师名录记录其获 Purdue University Computer Science 博士学位。", source: profileSources.aidongEducation },
      { label: "招生状态", value: "官方主页明确写有面向 machine learning、data mining、bioinformatics 和 health informatics 的博士生名额。", source: profileSources.aidong },
      { label: "为什么值得关注", value: "她把机器学习方法研究与医学、生物和科学发现连接起来，是跨 CS、BME 与数据科学的重要学术节点。", source: profileSources.aidong },
    ],
    stage: "institute", sources: [profileSources.aidong, profileSources.aidongEducation, rosterSources.uva], portraitSource: profileSources.aidong, x: 170, y: 160,
  }),
  person({
    id: "yangfeng-ji-uva", name: "Yangfeng Ji", role: "Associate Professor", institution: "UVA", region: "United States",
    area: "Natural Language Processing · Machine Learning", tags: ["NLP", "机器学习", "语言理解", "UVA NLP"],
    summary: "UVA NLP 独立 PI，研究自然语言处理与机器学习，并连接 Georgia Tech 博士训练与 UW Allen School 博士后网络。",
    facts: [
      { label: "当前任职", value: "2018 年加入 UVA Department of Computer Science，现任 Associate Professor。", source: profileSources.yangfeng },
      { label: "研究主线", value: "Natural language processing 与 machine learning。", source: profileSources.yangfeng },
      { label: "教育与学术训练", value: "2016 年获 Georgia Tech 博士；2016–2018 年在 University of Washington Allen School 从事博士后研究。", source: profileSources.yangfeng },
      { label: "为什么值得关注", value: "是 UVA NLP 的稳定入口之一，其训练路径把美国东南部 NLP 与 UW 语言技术网络连接起来。", source: profileSources.yangfeng },
    ],
    stage: "senior", sources: [profileSources.yangfeng, rosterSources.uva], portraitSource: profileSources.yangfeng, x: 330, y: 160,
  }),
  person({
    id: "jundong-li-uva", name: "Jundong Li", role: "Associate Professor", institution: "UVA", region: "United States",
    area: "Graph Machine Learning · Trustworthy AI · Large Language Models", tags: ["图机器学习", "可信 AI", "LLM", "数据挖掘"],
    summary: "UVA 图学习与可信 AI PI，研究图机器学习、公平与安全、LLM，并与 LinkedIn Research 保持兼职研究联系。",
    facts: [
      { label: "当前任职", value: "UVA ECE 主聘、Computer Science 兼聘 Associate Professor。", source: profileSources.jundong },
      { label: "研究主线", value: "Graph machine learning、trustworthy and safe ML、large language models 与 data mining。", source: profileSources.jundong },
      { label: "教育与学术训练", value: "2019 年获 Arizona State University CS 博士，官方简介明确导师为 Huan Liu。", source: profileSources.jundong },
      { label: "产业连接", value: "自 2022 年夏起兼任 LinkedIn Research Scholar。", source: profileSources.jundong },
    ],
    stage: "senior", sources: [profileSources.jundong, rosterSources.uva], portraitSource: profileSources.jundong, x: 490, y: 160,
  }),
  person({
    id: "hengtao-shen-uestc", name: "申恒涛", role: "特聘教授", institution: "UESTC", region: "Mainland China",
    area: "Multimedia Retrieval · Computer Vision · Artificial Intelligence", tags: ["多媒体检索", "计算机视觉", "人工智能", "大数据"],
    summary: "电子科技大学未来媒体研究中心与人工智能研究院核心带头人，长期研究多媒体搜索、视觉理解与大规模内容检索。",
    facts: [
      { label: "当前任职", value: "电子科技大学计算机学院院长、人工智能研究院执行院长、未来媒体研究中心主任。", source: profileSources.hengtaoHome },
      { label: "研究主线", value: "多媒体搜索、计算机视觉、人工智能与大数据管理。", source: profileSources.hengtao },
      { label: "教育与学术训练", value: "2000、2004 年获 NUS 计算机学士与博士；此后任职 University of Queensland，并于 2011 年晋升教授。", source: profileSources.hengtao },
      { label: "为什么值得关注", value: "其公开主页单列博士生体系，且长期连接 UESTC、NUS 与澳大利亚多媒体研究网络。", source: profileSources.hengtaoHome },
    ],
    stage: "institute", sources: [profileSources.hengtao, profileSources.hengtaoHome, rosterSources.uestc], portraitSource: profileSources.hengtao, x: 190, y: 360,
  }),
  person({
    id: "fumin-shen-uestc", name: "沈复民", role: "教授", institution: "UESTC", region: "Mainland China",
    area: "Computer Vision · Multimedia Retrieval · Learning to Hash", tags: ["计算机视觉", "多媒体", "哈希学习", "视觉检索", "招学生"],
    summary: "电子科技大学未来媒体中心 PI，研究面向视觉检索与识别的离散哈希、跨模态表示和多媒体学习。",
    facts: [
      { label: "当前任职", value: "2017 年起任电子科技大学计算机学院教授，隶属未来媒体研究中心。", source: profileSources.fumin },
      { label: "研究主线", value: "Computer vision、multimedia 与 learning-based hashing，面向大规模视觉检索和识别。", source: profileSources.fumin },
      { label: "教育与学术训练", value: "2014 年获南京理工大学博士；博士期间在 NICTA/ANU 与 University of Adelaide 联合培养，公开主页列 Chunhua Shen 为联合指导者。", source: profileSources.fumin },
      { label: "招生状态", value: "本人主页公开招收本科生、研究生、博士后与教职申请者。", source: profileSources.fumin },
    ],
    stage: "senior", sources: [profileSources.fumin, profileSources.fuminOfficial, rosterSources.uestc], portraitSource: profileSources.fuminOfficial, x: 360, y: 360,
  }),
  person({
    id: "thomas-lukasiewicz-tuwien", name: "Thomas Lukasiewicz", role: "Full Professor · Research Unit Head", institution: "TU Wien", region: "Europe",
    area: "Neuro-Symbolic AI · Explainable AI · NLP · Computer Vision", tags: ["神经符号 AI", "可解释 AI", "安全 AI", "NLP", "CV"],
    summary: "TU Wien Artificial Intelligence Techniques 负责人，研究神经符号、可解释、公平、安全与鲁棒 AI，覆盖 NLP 和视觉。",
    facts: [
      { label: "当前任职", value: "TU Wien Full Professor，并任 Artificial Intelligence Techniques Research Unit Head。", source: profileSources.lukasiewicz },
      { label: "研究主线", value: "Explainable AI、logical constraints for safe AI、fair and robust AI、predictive coding 与 active inference。", source: profileSources.lukasiewicz },
      { label: "教育与学术训练", value: "TU Wien 官方档案列其学术学位为 Dipl.-Inf. 与 Dr.rer.nat.。", source: profileSources.lukasiewicz },
      { label: "跨模态范围", value: "官方研究说明明确覆盖 natural language processing 与 computer vision。", source: profileSources.lukasiewicz },
      { label: "为什么值得关注", value: "连接符号推理与深度学习，是 TU Wien AI 版图中的核心研究单元负责人。", source: rosterSources.tuwien },
    ],
    stage: "institute", sources: [profileSources.lukasiewicz, rosterSources.tuwien], portraitSource: profileSources.lukasiewicz, x: 180, y: 560,
  }),
  person({
    id: "thomas-gaertner-tuwien", name: "Thomas Gärtner", role: "Full Professor · Research Unit Head", institution: "TU Wien", region: "Europe",
    area: "Machine Learning · Data Mining · Graph Learning", tags: ["机器学习", "数据挖掘", "图学习", "结构化预测"],
    summary: "TU Wien Machine Learning 研究单元负责人，研究结构化数据、图学习、主动学习、在线优化与知识驱动学习。",
    facts: [
      { label: "当前任职", value: "TU Wien Full Professor，并任 Machine Learning Research Unit Head。", source: profileSources.gaertner },
      { label: "研究主线", value: "Efficient and effective machine learning、structured output、active learning/search、online optimisation 与 graph learning。", source: profileSources.gaertner },
      { label: "教育与学术训练", value: "加入 TU Wien 前曾任 University of Nottingham Professor of Data Science，并在 Bonn/Fraunhofer IAIS 开展研究。", source: profileSources.gaertner },
      { label: "为什么值得关注", value: "把统计学习、图结构与知识约束连接起来，且官方页面持续列出论文与学位指导记录。", source: profileSources.gaertner },
    ],
    stage: "institute", sources: [profileSources.gaertner, rosterSources.tuwien], portraitSource: profileSources.gaertner, x: 350, y: 560,
  }),
  person({
    id: "ferrante-neri-eduhk", name: "Ferrante Neri", chinese: "內里・費蘭特", role: "Chair Professor of Machine Learning and AI", institution: "EdUHK", region: "Hong Kong",
    area: "Evolutionary Computation · Neural Architecture Search · Trustworthy AI", tags: ["演化计算", "神经架构搜索", "生成模型", "可信 AI"],
    summary: "EdUHK 机器学习与人工智能讲座教授，研究演化优化、神经架构搜索、高效深度学习与可信 AI。",
    facts: [
      { label: "当前任职", value: "EdUHK Chair Professor of Machine Learning and Artificial Intelligence，同时任 FLASS Dean。", source: profileSources.neri },
      { label: "研究主线", value: "Neural architecture search、evolutionary computation、surrogate-assisted learning、generative models 与 trustworthy AI。", source: profileSources.neri },
      { label: "教育与学术训练", value: "加入 EdUHK 前任 University of Surrey Professor，并曾在 Nottingham、De Montfort 和 Jyväskylä 任职。", source: profileSources.neri },
      { label: "为什么值得关注", value: "是 EdUHK 由教育技术扩展到机器学习方法研究的重要资深节点。", source: rosterSources.eduhk },
    ],
    stage: "institute", sources: [profileSources.neri, rosterSources.eduhk], portraitSource: profileSources.neri, x: 180, y: 760,
  }),
  person({
    id: "yu-yang-eduhk", name: "Yu Yang", role: "Assistant Professor", institution: "EdUHK", region: "Hong Kong",
    area: "Agentic AI · AI for Education · Graph Representation Learning", tags: ["Agentic AI", "LLM role-playing", "AI 教育", "图学习"],
    summary: "EdUHK 新一代 AI PI，研究 Agentic AI、基于 LLM 的角色扮演、AI for Education、图表示与时空数据。",
    facts: [
      { label: "当前任职", value: "EdUHK LTTC 与 Mathematics and Information Technology 双重隶属 Assistant Professor。", source: profileSources.yangYu },
      { label: "研究主线", value: "AI for Education、Agentic AI、LLM-based role-playing、graph representation learning 与 urban computing。", source: profileSources.yangYu },
      { label: "教育与学术训练", value: "2021 年获 Hong Kong Polytechnic University 博士；之后在 PolyU Computing 任 Research Assistant Professor。", source: profileSources.yangYu },
      { label: "为什么值得关注", value: "把智能体与大模型方法直接带入教育场景，是 EdUHK 新兴 AI 社区的重要接口。", source: rosterSources.eduhk },
    ],
    stage: "emerging", sources: [profileSources.yangYu, rosterSources.eduhk], portraitSource: profileSources.yangYu, x: 350, y: 760,
  }),
  person({
    id: "philips-wang-hkmu", name: "Philips Wang", chinese: "王福利", role: "Professor", institution: "HKMU", region: "Hong Kong",
    area: "Artificial Intelligence · Data Science · Learning Technology", tags: ["AI", "数据科学", "学习技术", "NLP"],
    summary: "HKMU Science and Technology 院长与 AI/Data Science 教授，研究覆盖学习技术、NLP、情感分析与多模态信息处理。",
    facts: [
      { label: "当前任职", value: "HKMU Professor、Dean of School of Science and Technology。", source: profileSources.wang },
      { label: "研究主线", value: "Artificial intelligence、data science 与 learning technology；近年项目覆盖 ChatGPT 文本检测、NLP 与多模态谣言检测。", source: profileSources.wang },
      { label: "教育与学术训练", value: "获 HKU BEng/MPhil、Imperial MBA、HKUST MSc 与 CUHK PhD。", source: profileSources.wang },
      { label: "为什么值得关注", value: "其跨校训练与学院领导角色连接香港 AI、数据科学和教育技术生态。", source: rosterSources.hkmu },
    ],
    stage: "institute", sources: [profileSources.wang, rosterSources.hkmu], portraitSource: profileSources.wang, x: 520, y: 760,
  }),
  person({
    id: "indriyati-atmosukarto-sit", name: "Indriyati Atmosukarto", role: "Associate Professor", institution: "SIT", region: "Singapore",
    area: "Computer Vision · Video Analytics · Medical Imaging", tags: ["计算机视觉", "视频分析", "医学影像", "应用 AI"],
    summary: "SIT 应用视觉与医疗 AI PI，把视频分析、深度学习和医学影像用于交通、教育与健康场景。",
    facts: [
      { label: "当前任职", value: "SIT Infocomm Technology Associate Professor；2021–2026 年任 Deputy Cluster Director。", source: profileSources.atmosukarto },
      { label: "研究主线", value: "Computer vision、video analytics、image processing、machine/deep learning 与 medical imaging。", source: profileSources.atmosukarto },
      { label: "教育与学术训练", value: "2010 年获 University of Washington CS 博士，官方简介明确博士导师为 Linda Shapiro。", source: profileSources.atmosukarto },
      { label: "研究网络", value: "参与 SIT × NVIDIA AI Centre、SIT Data Science and AI Lab，并主持或参与医疗数字孪生、自动驾驶感知和教育 AI 项目。", source: profileSources.atmosukarto },
    ],
    stage: "senior", sources: [profileSources.atmosukarto, rosterSources.sit], portraitSource: profileSources.atmosukarto, x: 700, y: 760,
  }),
];
