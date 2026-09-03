import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const professorRoster = official(
  "华中科技大学软件学院教授/研究员名录",
  "https://sse.hust.edu.cn/szdw1/js_yjy.htm",
  "软件学院教授/研究员名录成员身份与职称分组",
);

const associateRoster = official(
  "华中科技大学软件学院副教授名录",
  "https://sse.hust.edu.cn/szdw1/fjs.htm",
  "软件学院副教授名录成员身份与职称分组",
);

type Seed = {
  id: string;
  name: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  profileUrl: string;
  roster: Source;
  facts: { label: string; value: string }[];
  x: number;
  y: number;
};

function person(seed: Seed): Person {
  const profileSource = official(
    `华中科技大学教师主页 — ${seed.name}`,
    seed.profileUrl,
    "当前单位与职称、研究方向、教育或工作经历，以及该页面发布的单人头像",
  );
  const facts = seed.facts.map((fact) => ({ ...fact, source: profileSource }));
  const researchFact = facts.find((fact) =>
    /^(研究|方法|数据)/.test(fact.label),
  );
  const trainingFact = facts.find((fact) =>
    /(教育|学术训练|博士导师)/.test(fact.label),
  );

  if (!facts.some((fact) => fact.label === "研究主线") && researchFact) {
    researchFact.label = "研究主线";
  }
  if (!facts.some((fact) => fact.label === "教育与学术训练")) {
    if (trainingFact) {
      trainingFact.label = "教育与学术训练";
    } else {
      facts.push({
        label: "教育与学术训练",
        value: "当前官方公开简介未列出可逐项核验的学位与导师信息；保留为待进一步反查项，不作推断。",
        source: profileSource,
      });
    }
  }

  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: "HUST",
    region: "Mainland China",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts,
    stage: seed.stage,
    category: "core",
    status: "current PI · HUST Software Engineering roster verified",
    sources: [profileSource, seed.roster],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/hust-roster-2026/${seed.id}.jpg`,
      alt: `${seed.name} 华中科技大学官方教师头像`,
      source: profileSource,
    },
  };
}

export const hustRosterPiExpansion1People: Person[] = [
  person({
    id: "xia-tian-hust",
    name: "夏天",
    role: "教授/研究员名录成员 · 人工智能与医学研究中心主任",
    area: "Medical AI · AI for Drug Discovery · Robotics",
    tags: ["医疗 AI", "AI 制药", "机器人", "交叉研究"],
    summary: "华中科技大学软件学院人工智能与医学研究中心负责人，建设医疗、制药与机器人交叉方向。",
    stage: "institute",
    profileUrl: "https://sse.hust.edu.cn/info/1073/3789.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "列入软件学院教授/研究员名录，并任人工智能与医学研究中心主任。" },
      { label: "研究主线", value: "实验室面向人工智能与医学、制药和机器人交叉应用。" },
      { label: "团队建设", value: "官方简介明确欢迎对 AI 与医学交叉研究感兴趣的学生加入。" },
      { label: "为什么值得关注", value: "连接基础 AI 方法与医学、药物研发和机器人应用，是学院交叉智能方向的平台型节点。" },
    ],
    x: 120,
    y: 120,
  }),
  person({
    id: "shen-gang-hust",
    name: "沈刚",
    role: "教授 · 博士生导师 · 硕士生导师",
    area: "Biomedical Signal Processing · Multimodal Learning · Software Engineering",
    tags: ["生物医学信号", "多模态学习", "生成模型", "软件工程"],
    summary: "华中科技大学软件学院教授，近年工作把多模态生成建模用于心冲击与心电等生物医学信号分析。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/GANGSHEN/zh_CN/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院教授，官方主页标注在职并具有博士、硕士招生资格。" },
      { label: "研究与成果", value: "官方成果列表包含 ECG/BCG 生成、时频特征融合、多模态缺失数据补全与医学影像研究。" },
      { label: "教育经历", value: "清华大学本科、硕士；1999 年在 McGill University 完成博士训练。" },
      { label: "为什么值得关注", value: "其公开成果把生成模型、多模态学习和床旁生理信号计算连接起来。" },
    ],
    x: 260,
    y: 120,
  }),
  person({
    id: "wu-tao-hust",
    name: "吴涛",
    role: "教授 · 硕士生导师",
    area: "Intelligent Computing · Deep Learning · Network Applications",
    tags: ["智能计算", "深度学习", "网络应用", "机器学习"],
    summary: "华中科技大学软件学院智能计算 PI，研究深度学习方法及其在网络与计算机应用中的落地。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/wutao2/zh_CN/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学教授、硕士生导师，学科方向为计算机软件与理论。" },
      { label: "研究主线", value: "智能计算方法、深度学习、网络与计算机应用。" },
      { label: "教育经历", value: "官方主页记录其于 2002 年在华中科技大学获得工学博士学位。" },
      { label: "为什么值得关注", value: "长期位于深度学习方法与网络系统应用的交叉位置，并持续承担国家级与企业合作项目。" },
    ],
    x: 400,
    y: 120,
  }),
  person({
    id: "xue-zhidong-hust",
    name: "薛志东",
    role: "研究员 · 博士生导师 · 硕士生导师",
    area: "Biomedical Big Data · Video Analytics · Intelligent Systems",
    tags: ["生物医学大数据", "视频分析", "智能软件", "康复游戏"],
    summary: "华中科技大学软件学院研究员，领导跨计算机、电子、机械和生物的智能软件系统团队。",
    stage: "institute",
    profileUrl: "http://faculty.hust.edu.cn/zdxue/zh_CN/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院研究员、博士生导师、硕士生导师。" },
      { label: "研究主线", value: "生物医学大数据、视频处理与分析、大数据技术和康复游戏。" },
      { label: "教育与经历", value: "2006 年获华中科技大学博士学位，随后在该校计算机学院从事博士后研究，并访问 University of Michigan。" },
      { label: "研究组", value: "iSysLab 面向人工智能、大数据与多媒体技术构建跨学科智能软件系统。" },
    ],
    x: 540,
    y: 120,
  }),
  person({
    id: "pei-xiaobing-hust",
    name: "裴小兵",
    role: "教授 · 博士生导师 · 硕士生导师",
    area: "Machine Learning · AI Safety · AIOps · Spatiotemporal Data Mining",
    tags: ["机器学习", "AI 安全", "智能运维", "时空数据挖掘"],
    summary: "华中科技大学软件学院教授，研究机器学习安全、智能运维和时空大数据分析。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/peixiaobing/zh_CN/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院教授，官方主页标注在职、工学博士及博士/硕士导师资格。" },
      { label: "研究主线", value: "机器学习、人工智能安全、智能运维（数字孪生）及其结合。" },
      { label: "数据方向", value: "同时开展时空大数据分析与挖掘研究。" },
      { label: "为什么值得关注", value: "将模型方法、安全和复杂系统运维连接起来，是可靠 AI 与系统落地之间的交叉节点。" },
    ],
    x: 680,
    y: 120,
  }),
  person({
    id: "guo-lianbo-hust",
    name: "郭连波",
    role: "教授 · 软件学院副院长",
    area: "Multimodal Sensing · Industrial AI · Laser Spectroscopy · Brain–Computer Interface",
    tags: ["多模态感知", "工业 AI", "激光光谱", "脑机接口"],
    summary: "华中科技大学软件学院副院长与多模态智能感知团队负责人，连接光、声、视觉感知与工业软件。",
    stage: "institute",
    profileUrl: "http://faculty.hust.edu.cn/guolianbo/zh_CN/index/1036441/list/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "软件学院教授、博士生导师、副院长，并任武汉光电国家研究中心激光研究部副主任。" },
      { label: "研究主线", value: "光—声—视觉多模态信息融合智能感知、工业软件、激光光谱智能探测和脑机接口。" },
      { label: "教育与经历", value: "2012 年获华中科技大学博士学位，曾在 University of Nebraska–Lincoln 联合培养，随后在华中科技大学从事博士后研究。" },
      { label: "为什么值得关注", value: "同时连接软件学院、光电平台与跨模态感知，是典型的跨院系产业智能节点。" },
    ],
    x: 120,
    y: 280,
  }),
  person({
    id: "wan-lin-hust",
    name: "万琳",
    role: "教授",
    area: "Computer Graphics · Visual Computing · Computing Education",
    tags: ["计算机图形学", "视觉计算", "图形学教育", "软件学院"],
    summary: "华中科技大学软件学院计算机图形学教授，长期建设图形学教学与人才培养体系。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/wanlin/zh_CN/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院教授。" },
      { label: "研究与教学主线", value: "长期从事计算机图形学研究与教学，并在中国大学 MOOC 平台建设相关课程。" },
      { label: "教育经历", value: "在华中科技大学完成计算机应用技术硕士和博士训练。" },
      { label: "为什么值得关注", value: "图形学是视觉计算的重要基础，其长期课程与教学建设构成学院人才培养网络的一部分。" },
    ],
    x: 260,
    y: 280,
  }),
  person({
    id: "su-shuguang-hust",
    name: "苏曙光",
    role: "教授 · 院长助理",
    area: "Image Processing · Embedded Systems · Operating Systems",
    tags: ["图像处理", "嵌入式系统", "操作系统", "边缘计算"],
    summary: "华中科技大学软件学院教授、院长助理，研究图像处理、嵌入式系统与操作系统。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/SuShuGuang/zh_CN/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学教授、软件学院院长助理。" },
      { label: "研究主线", value: "操作系统、嵌入式系统和图像处理。" },
      { label: "教育与产业经历", value: "1998 年本科毕业后曾在长虹电子集团工作，2006 年获华中科技大学计算机科学与技术博士学位并留校。" },
      { label: "为什么值得关注", value: "连接视觉处理与底层系统，也保留了从企业研发到高校教学科研的完整轨迹。" },
    ],
    x: 400,
    y: 280,
  }),
  person({
    id: "tang-chang-hust",
    name: "唐厂",
    role: "教授",
    area: "Multimodal Pattern Recognition · Medical AI · Computer Vision",
    tags: ["多模态", "模式识别", "医学 AI", "计算机视觉"],
    summary: "华中科技大学软件学院多模态模式识别与医学 AI 教授，成果覆盖学术研究和真实产业应用。",
    stage: "senior",
    profileUrl: "https://sse.hust.edu.cn/info/1073/4546.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院教授。" },
      { label: "研究主线", value: "人工智能领域的多模态模式识别及其医学应用。" },
      { label: "教育经历", value: "2016 年获天津大学博士学位，博士期间在 University of Wollongong 联合培养一年。" },
      { label: "产业连接", value: "学院官方简介记录其研究成果已用于 Amazon、京东健康等企业场景。" },
    ],
    x: 540,
    y: 280,
  }),
  person({
    id: "hu-tao-hust",
    name: "胡涛",
    role: "教授 · 博士生导师 · 硕士生导师",
    area: "Generative Models · Diffusion Models · Flow Matching · Foundation Models",
    tags: ["生成模型", "扩散模型", "Flow Matching", "基础模型", "招 PhD", "招硕士"],
    summary: "华中科技大学软件学院生成式视觉与基础模型 PI，具有 UvA 博士和 LMU Ommer Lab 博士后训练背景。",
    stage: "emerging",
    profileUrl: "http://faculty.hust.edu.cn/vtaohu/zh_CN/index.htm",
    roster: professorRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院教授，可在软件学院与计算机学院招收博士、硕士研究生。" },
      { label: "研究主线", value: "生成式模型、扩散模型、Flow Matching、多模态可控生成与下一代基础模型。" },
      { label: "学术训练", value: "2023 年获 University of Amsterdam 博士学位，主页明确 Cees G. M. Snoek 为博士导师；随后在 LMU Ommer Lab 从事博士后研究。" },
      { label: "招生信息", value: "官方主页列出 2026 年硕士及 2027 年硕士、博士招生名额。" },
    ],
    x: 680,
    y: 280,
  }),
  person({
    id: "lu-yongzhong-hust",
    name: "陆永忠",
    role: "副教授 · 硕士生导师",
    area: "Computational Intelligence · Pattern Recognition · Software Engineering",
    tags: ["计算智能", "模式识别", "软件工程", "软计算"],
    summary: "华中科技大学软件学院计算智能与模式识别副教授，研究软计算方法和网络式软件开发。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/luyongzhong/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授、硕士生导师。" },
      { label: "研究主线", value: "计算智能、软件工程、模式识别、软计算及网络式软件开发。" },
      { label: "教育与经历", value: "2001 年获华中科技大学博士学位，随后在该校计算机学院从事博士后研究，并曾赴 University of Sydney 合作研究。" },
      { label: "为什么值得关注", value: "其研究横跨经典模式识别、计算智能和软件工程，代表学院中方法与系统结合的长期支线。" },
    ],
    x: 120,
    y: 440,
  }),
  person({
    id: "fang-shaohong-hust",
    name: "方少红",
    role: "副教授 · 硕士生导师",
    area: "Data Analytics · Feature Engineering · Intelligent Quality Evaluation",
    tags: ["数据分析", "特征工程", "智能质检", "机器学习应用"],
    summary: "华中科技大学软件学院副教授，公开成果涉及数据分析、特征工程和工业质量智能评价。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/fangshaohong1/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授、硕士生导师，官方主页标注在职并获工学博士学位。" },
      { label: "研究成果", value: "官方成果列表包含基于动态时间序列特征的混凝土强度评价和基于特征工程的钢材质量评价。" },
      { label: "方法范围", value: "公开论文条目还覆盖不确定非线性系统与离散时间系统的稳定化控制。" },
      { label: "为什么值得关注", value: "其公开工作显示数据方法在工业质量与控制系统中的应用路径；更细研究主线仍需后续主页补充核验。" },
    ],
    x: 260,
    y: 440,
  }),
  person({
    id: "huang-liqun-hust",
    name: "黄立群",
    role: "副教授",
    area: "Artificial Intelligence · Blockchain · Computer Networks",
    tags: ["人工智能", "区块链", "计算机网络", "智能系统"],
    summary: "华中科技大学软件学院副教授，研究人工智能、区块链和计算机网络。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/huangliqun/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授。" },
      { label: "研究主线", value: "人工智能、区块链技术与计算机网络技术。" },
      { label: "教育经历", value: "在华中理工大学完成系统工程硕士和信息与通信工程博士训练。" },
      { label: "为什么值得关注", value: "其轨迹连接通信、网络、区块链与 AI，属于软件学院跨系统智能支线。" },
    ],
    x: 400,
    y: 440,
  }),
  person({
    id: "liu-xiaofeng-hust",
    name: "刘小峰",
    role: "副教授",
    area: "Natural Language Processing · Speech Processing · Machine Learning",
    tags: ["NLP", "语音处理", "机器学习", "语言技术"],
    summary: "华中科技大学软件学院自然语言与语音处理副教授，研究基于机器学习的语言技术。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/liuxf/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授。" },
      { label: "研究主线", value: "自然语言处理、语音处理，以及基于机器学习的语言技术。" },
      { label: "教育经历", value: "在华中科技大学计算机学院完成硕士和博士训练，2005 年获得博士学位。" },
      { label: "为什么值得关注", value: "是 HUST 软件学院中直接覆盖 NLP 与语音处理的明确节点。" },
    ],
    x: 540,
    y: 440,
  }),
  person({
    id: "wu-jianjie-hust",
    name: "武剑洁",
    role: "副教授 · 硕士生导师",
    area: "Computer Graphics · Computer Vision · BIM · VR/AR",
    tags: ["计算机图形学", "计算机视觉", "BIM", "VR/AR"],
    summary: "华中科技大学软件学院图形学与视觉副教授，将 AI 图像分析连接到 BIM、三维重建和 VR/AR。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/wujianjie/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授、硕士生导师。" },
      { label: "研究主线", value: "CAD/CG、BIM、人工智能与图像/视频处理、VR/AR、软件工程与软件测试。" },
      { label: "教育经历", value: "在华中科技大学完成硕士和博士训练，2004 年获得博士学位。" },
      { label: "为什么值得关注", value: "其工作把视觉智能与建筑信息、三维重建和工程软件场景连接起来。" },
    ],
    x: 680,
    y: 440,
  }),
  person({
    id: "wang-fen-hust",
    name: "王芬",
    role: "副教授 · 硕士生导师",
    area: "Multimodal Knowledge Bases · Question Answering · Knowledge Graphs · Generative Models",
    tags: ["多模态知识库", "问答系统", "知识图谱", "生成模型"],
    summary: "华中科技大学软件学院副教授，研究多模态知识库、问答、知识图谱和生成模型。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/wangfen_HUST/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授、硕士研究生导师。" },
      { label: "研究主线", value: "人工智能、多模态知识库、问答系统、生成模型、知识图谱、社交网络与大数据。" },
      { label: "教育与经历", value: "在华中科技大学完成博士训练，曾访问 University of Hong Kong 与 Penn State。" },
      { label: "研究组", value: "官方主页列出智能媒体计算与网络安全实验室，覆盖视觉、三维、医学影像和智能媒体计算。" },
    ],
    x: 120,
    y: 600,
  }),
  person({
    id: "cao-hua-hust",
    name: "曹华",
    role: "副教授 · 硕士生导师",
    area: "Intelligent Image and Video Processing · Human–Computer Interaction",
    tags: ["图像处理", "视频分析", "人机交互", "智能媒体"],
    summary: "华中科技大学软件学院副教授，研究图像与视频信息智能处理，并具有通信设备产业研发经历。",
    stage: "senior",
    profileUrl: "http://faculty.hust.edu.cn/caohua226/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授、硕士生导师。" },
      { label: "研究主线", value: "图像与视频信息智能处理，并承担人机交互、嵌入式系统和游戏设计等课程。" },
      { label: "教育与经历", value: "2006 年获华中科技大学博士学位，曾在 University of Sydney BMIT 实验室访问。" },
      { label: "产业经历", value: "入校前曾在深圳先科激光、武汉邮电科学研究院和烽火科技从事设备、软件与光网络产品研发。" },
    ],
    x: 260,
    y: 600,
  }),
  person({
    id: "tang-he-hust",
    name: "唐赫",
    role: "副教授 · 博士生导师",
    area: "Multimodal Large Models · Medical AI · Pathology Vision",
    tags: ["多模态大模型", "医疗 AI", "病理图像", "视觉定位"],
    summary: "华中科技大学软件学院多模态大模型与医疗视觉 PI，主持校企轨道交通视觉联合研究中心。",
    stage: "emerging",
    profileUrl: "http://faculty.hust.edu.cn/tanghe/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授、博士生导师，并任软件学院—武汉利德轨道交通视觉联合研究中心主任。" },
      { label: "研究主线", value: "多模态大模型、智慧医疗、病理图像视觉定位和显著目标理解。" },
      { label: "教育与经历", value: "2017 年获华中科技大学博士学位，历任软件学院讲师、副教授。" },
      { label: "为什么值得关注", value: "将多模态基础模型同时推进到病理医疗与轨道交通视觉，兼具方法研究和联合平台建设。" },
    ],
    x: 400,
    y: 600,
  }),
  person({
    id: "li-minghui-hust",
    name: "李明慧",
    role: "副教授 · 博士生导师",
    area: "Trustworthy AI · AI Safety · Medical AI",
    tags: ["可信 AI", "AI 安全", "医疗 AI", "智能系统"],
    summary: "华中科技大学软件学院可信 AI 与医疗 AI 副教授，关注智能系统安全和成果转化。",
    stage: "emerging",
    profileUrl: "http://faculty.hust.edu.cn/minghuili/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "华中科技大学软件学院副教授、博士生导师。" },
      { label: "研究主线", value: "可信人工智能、人工智能安全和人工智能医疗应用。" },
      { label: "教育与经历", value: "在武汉大学完成信息安全本科、网络空间安全硕士与博士训练，2021 年进入华中科技大学任教。" },
      { label: "为什么值得关注", value: "把安全可信方法和医疗应用连接起来，并持续推动智能系统成果转化。" },
    ],
    x: 540,
    y: 600,
  }),
  person({
    id: "huang-yu-hust",
    name: "黄禹",
    role: "副教授",
    area: "LLM Systems · Computer Architecture · Processing-in-Memory",
    tags: ["大模型系统", "计算机体系结构", "存算融合", "近数据处理"],
    summary: "华中科技大学软件学院大模型系统与新型体系结构 PI，研究存算融合和近数据智能计算。",
    stage: "emerging",
    profileUrl: "http://faculty.hust.edu.cn/HuangYu/zh_CN/index.htm",
    roster: associateRoster,
    facts: [
      { label: "当前任职", value: "2024 年起任华中科技大学软件学院副教授。" },
      { label: "研究主线", value: "大模型智能计算系统、计算机体系结构、存算一体和近数据处理。" },
      { label: "教育与经历", value: "在华中科技大学完成计算机科学与技术本科和博士训练，随后在华中科技大学/之江实验室从事博士后研究。" },
      { label: "产业经历", value: "官方简介记录其曾入选华为“天才少年”计划，并持续招收博士生、硕士生和本科生。" },
    ],
    x: 680,
    y: 600,
  }),
];

export const hustRosterPiExpansion1Portraits: Record<string, NonNullable<Person["portrait"]>> = Object.fromEntries(
  hustRosterPiExpansion1People.flatMap((entry) => (entry.portrait ? [[entry.id, entry.portrait]] : [])),
);

export const hustRosterPiExpansion1DeferredLeaderIds = new Set([
  "xia-tian-hust",
  "guo-lianbo-hust",
  "su-shuguang-hust",
]);

export const hustRosterPiExpansion1PublishedPeople = hustRosterPiExpansion1People.filter(
  (person) => !hustRosterPiExpansion1DeferredLeaderIds.has(person.id),
);

export const hustRosterPiExpansion1Relationships: Relationship[] = [
  {
    id: "hust-roster-1-cees-snoek-hu-tao",
    from: "cees-snoek-eu",
    to: "hu-tao-hust",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "胡涛的华中科技大学官方主页明确写明其 University of Amsterdam 博士导师为 Cees G. M. Snoek。",
    evidenceObject: "HUST official faculty profile biography",
    source: hustRosterPiExpansion1People.find((entry) => entry.id === "hu-tao-hust")!.sources[0],
    verified: true,
  },
];

export const hustRosterPiExpansion1Deferred = [
  {
    name: "邱德红",
    profileUrl: "http://faculty.hust.edu.cn/qiudehong/zh_CN/index.htm",
    reason: "官方教师主页可核验职称和研究方向，但页面返回头像与姓名外观明显不一致；在找到第二个可靠一手头像来源前不标记 ready。",
  },
] as const;
