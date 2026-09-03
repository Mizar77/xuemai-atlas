import type { Person, Source } from "./data";

const checkedAt = "2026-09-02";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const roster = official(
  "UCL Computer Science — official Profiles roster",
  "https://profiles.ucl.ac.uk/search?query=&school=Engineering+Sciences&department=Computer+Science",
  "Current UCL Computer Science affiliation and official profile identity",
);

type Seed = {
  officialId: string;
  id: string;
  slug: string;
  ext: "jpg" | "png" | "webp";
  name: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  training: string;
  research: string;
  attention: string;
  flows?: string;
  x: number;
  y: number;
};

function person(seed: Seed): Person {
  const profileUrl = `https://profiles.ucl.ac.uk/${seed.officialId}-${seed.slug}`;
  const profile = official(
    `UCL Profiles — ${seed.name}`,
    profileUrl,
    "Current title, first-party biography, education, research fields and research description",
  );
  const portraitSource = official(
    `UCL Profiles thumbnail — ${seed.name}`,
    `https://profiles.ucl.ac.uk/api/users/${seed.officialId}/thumbnail`,
    "Official portrait returned by the UCL Profiles API",
  );
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: "UCL",
    region: "Europe",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: [
      { label: "当前任职", value: `${seed.role}，UCL Department of Computer Science。`, source: profile },
      { label: "研究主线", value: seed.research, source: profile },
      { label: "教育与学术训练", value: seed.training, source: profile },
      {
        label: "学生与产业去向",
        value: seed.flows ?? "本轮一手个人页未给出可逐人核验的学生任职去向；不从合著、项目或实验室成员关系推断师生和产业流向。",
        source: profile,
      },
      { label: "为什么值得关注", value: seed.attention, source: profile },
    ],
    stage: seed.stage,
    category: "core",
    status: "current PI · official UCL profile verified",
    sources: [profile, roster],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/europe-c-ucl-roster-2026/${seed.slug}.${seed.ext}`,
      alt: `${seed.name} official UCL portrait`,
      source: portraitSource,
    },
  };
}

export const europeCUclRosterPiExpansion1People: Person[] = [
  person({
    officialId: "9842", id: "david-barber-ucl-roster", slug: "david-barber", ext: "png",
    name: "David Barber", role: "Professor of Machine Learning", area: "Machine Learning · Generative Models · Probabilistic AI",
    tags: ["机器学习", "生成模型", "贝叶斯深度学习", "强化学习", "NLP"], stage: "senior", x: 100, y: 100,
    summary: "UCL Centre for Artificial Intelligence 主任，研究概率建模、生成模型、强化学习、医学影像与 NLP，并有连续创业经历。",
    training: "UCL 官方履历列出 Cambridge 数学学士、King's College London 硕士及 Edinburgh 博士。",
    research: "贝叶斯深度学习、强化学习与控制、博弈、医学影像、自然语言处理和主动学习。",
    attention: "同时领导 UCL AI 中心、UKRI Generative Models Hub 与 Foundational AI CDT，是连接基础方法、博士培养和产业转化的关键节点。",
    flows: "官方简介明确列出其共同创办 re:infer（2022 年被 UiPath 收购）、humanloop（2025 年被 Anthropic 收购）和 vectify，并任 UiPath Distinguished Scientist。",
  }),
  person({
    officialId: "33703", id: "neill-campbell-ucl-roster", slug: "neill-campbell", ext: "webp",
    name: "Neill Campbell", role: "Professor of Inverse Problems", area: "Computer Vision · Visual Computing · Machine Learning",
    tags: ["计算机视觉", "视觉计算", "逆问题", "机器学习", "3D"], stage: "senior", x: 230, y: 100,
    summary: "UCL 视觉计算与机器学习教授，聚焦从图像和视频学习形状、外观与动态模型，并研究小样本与不确定性。",
    training: "Cambridge 工程学博士；UCL 官方简介明确写明博士导师为 Roberto Cipolla，并获 George Vogiatzis、Carlos Hernández 指导。",
    research: "二维/三维形状、外观与动态建模，视觉计算，以及数据稀缺、昂贵标注和不确定性条件下的机器学习。",
    attention: "担任 CAMERA 主任、MyWorld 研究负责人及 BMVA 执委会主席，横跨 CV、图形学、创意产业与医疗应用。",
  }),
  person({
    officialId: "32290", id: "danail-stoyanov-ucl-roster", slug: "danail-stoyanov", ext: "jpg",
    name: "Danail Stoyanov", role: "Professor of Robot Vision", area: "Robot Vision · Surgical AI · Medical Imaging",
    tags: ["机器人视觉", "手术机器人", "医疗影像", "计算成像", "AI"], stage: "senior", x: 360, y: 100,
    summary: "UCL Robot Vision 教授和 Hawkes Institute 联席主任，研究微创手术中的机器人、视觉与人工智能。",
    training: "King's College London 计算机系统与电子学本科；Imperial College London 计算机科学博士，专攻医学图像计算。",
    research: "机器人辅助手术中的视觉、计算成像、图像引导、生物光子成像与定量测量。",
    attention: "Royal Academy of Engineering Chair in Emerging Technologies，并为 FREng、FMedSci、FIEEE 等 Fellow，是手术 AI 与工程转化的资深节点。",
  }),
  person({
    officialId: "102308", id: "lorenzo-jamone-ucl-roster", slug: "lorenzo-jamone", ext: "jpg",
    name: "Lorenzo Jamone", role: "Associate Professor in Robotics & AI", area: "Cognitive Robotics · Dexterous Manipulation · Tactile Sensing",
    tags: ["认知机器人", "灵巧操作", "触觉感知", "人机协作", "具身智能"], stage: "emerging", x: 490, y: 100,
    summary: "UCL CRISP 研究组负责人，以人类手部智能为启发研究灵巧操作、触觉、视觉—触觉感知与人机协作。",
    training: "University of Genoa 计算机工程硕士；University of Genoa 与 Italian Institute of Technology 机器人学博士。",
    research: "认知机器人、灵巧物体操作、触觉感知、视觉—触觉探索、工具使用、身体图式及人机协作。",
    attention: "其路线把具身认知、触觉硬件与自适应操作结合，是当前具身智能和机器人基础模型之外的重要实体验证节点。",
    flows: "官方简介列出与 Ocado、Shadow Robot、Wootzano、Xela、Melexis 等公司的项目合作；未把项目成员推断为学生去向。",
  }),
  person({
    officialId: "73094", id: "dimitrios-kanoulas-ucl-roster", slug: "dimitrios-kanoulas", ext: "png",
    name: "Dimitrios Kanoulas", role: "Professor in Robotics and AI", area: "Robot Perception · Legged Robotics · Machine Learning",
    tags: ["机器人感知", "足式机器人", "机器学习", "现场机器人", "具身智能"], stage: "senior", x: 620, y: 100,
    summary: "UCL Robotics and AI 教授，研究机器人感知、认知与学习，重点面向足式、现场和制造机器人。",
    training: "UCL 官方教育字段列出 Northeastern University 计算机科学博士训练。",
    research: "机器人感知、认知与学习，足式机器人、现场机器人、制造机器人及相关机器学习方法。",
    attention: "把环境几何感知与真实机器人行动结合，可作为 UCL 机器人学和具身 AI 网络的重要节点。",
  }),
  person({
    officialId: "42716", id: "vasileios-lampos-ucl-roster", slug: "vasileios-lampos", ext: "jpg",
    name: "Vasileios Lampos", role: "Associate Professor", area: "Natural Language Processing · Machine Learning · Digital Health",
    tags: ["NLP", "机器学习", "数字健康", "信息检索", "时间序列"], stage: "emerging", x: 100, y: 235,
    summary: "UCL NLP 与机器学习 PI，利用网络文本、搜索和时间序列信号研究公共卫生与社会计算问题。",
    training: "University of Patras 计算机工程与信息学学位；University of Bristol 高级计算硕士及计算机科学博士。",
    research: "自然语言处理、机器学习、信息检索、时间序列、数字流行病学与数字健康。",
    attention: "其工作连接 NLP、互联网行为数据和公共卫生，是语言技术跨领域应用的一条清晰主线。",
  }),
  person({
    officialId: "19058", id: "mirco-musolesi-ucl-roster", slug: "mirco-musolesi", ext: "jpg",
    name: "Mirco Musolesi", role: "Professor of Computer Science", area: "Machine Learning · Generative AI · Autonomous Agents",
    tags: ["机器学习", "生成式AI", "强化学习", "自主智能体", "AI安全"], stage: "senior", x: 230, y: 235,
    summary: "UCL Machine Intelligence Lab 负责人，研究机器学习、生成式 AI、决策、自主智能体与安全。",
    training: "University of Bologna Laurea；UCL 计算机科学博士。",
    research: "机器学习、生成式 AI 与大语言模型、强化学习、决策、自主与多智能体系统，以及网络安全和隐私。",
    attention: "研究跨度从移动与行为数据延伸到生成式 AI、智能体和安全，为多个 AI 子社区提供交叉连接。",
    flows: "官方履历记载其曾任 Google Research Scientist；本轮未从任职或合著反推学生产业去向。",
  }),
  person({
    officialId: "857", id: "massimiliano-pontil-ucl-roster", slug: "massimiliano-pontil", ext: "webp",
    name: "Massimiliano Pontil", role: "Professor of Computational Statistics & Machine Learning", area: "Machine Learning Theory · Transfer Learning · Fairness",
    tags: ["机器学习理论", "迁移学习", "元学习", "公平性", "核方法"], stage: "senior", x: 360, y: 235,
    summary: "UCL 计算统计与机器学习教授，研究学习理论、迁移与元学习、公平性和核方法。",
    training: "University of Genoa Laurea 与博士学位。",
    research: "统计学习理论、迁移学习、元学习、多任务学习、算法公平性及核方法。",
    attention: "其研究连接 UCL 与 Italian Institute of Technology 的 CSML 群体，是欧洲机器学习理论与应用网络的重要桥梁。",
  }),
  person({
    officialId: "10973", id: "john-shawe-taylor-ucl-roster", slug: "john-shawe-taylor", ext: "jpg",
    name: "John Shawe-Taylor", role: "Chair of Computational Statistics and Machine Learning", area: "Statistical Learning Theory · Machine Learning",
    tags: ["统计学习理论", "机器学习", "神经网络", "计算统计", "AI治理"], stage: "senior", x: 490, y: 235,
    summary: "UCL 计算统计与机器学习讲席教授，长期研究统计学习理论、神经网络和机器学习，并参与国际 AI 治理与能力建设。",
    training: "Imperial College London 硕士；Royal Holloway 博士；UCL 官方教育字段另列 University of Ljubljana diploma。",
    research: "统计学习理论、机器学习、神经网络、图论以及健康等领域的计算应用。",
    attention: "曾任 UCL Computer Science 系主任，并任 UNESCO Chair in Artificial Intelligence，是连接学习理论、学科组织和国际 AI 能力建设的资深节点。",
  }),
  person({
    officialId: "4850", id: "marta-betcke-ucl-roster", slug: "marta-betcke", ext: "jpg",
    name: "Marta Betcke", role: "Professor of Scientific Computing", area: "Inverse Problems · Computational Imaging · Machine Learning",
    tags: ["逆问题", "科学计算", "计算成像", "机器学习", "数值分析"], stage: "senior", x: 620, y: 235,
    summary: "UCL 科学计算教授，研究逆问题、数值分析、计算成像与机器学习的结合。",
    training: "University of Hamburg diploma 与博士训练；UCL 官方履历还列出 Manchester 研究经历及 UCL EPSRC 博士后经历。",
    research: "逆问题、数值与计算数学、计算机视觉与多媒体计算、信号处理和机器学习。",
    attention: "把成像物理、可靠数值方法和数据驱动模型结合，是医疗成像和 scientific ML 图谱中的关键交叉节点。",
  }),
  person({
    officialId: "770", id: "ivana-drobnjak-ucl-roster", slug: "ivana-drobnjak", ext: "jpg",
    name: "Ivana Drobnjak", role: "Professor of Computational Healthcare", area: "Computational Healthcare · Medical Imaging · Machine Learning",
    tags: ["计算医疗", "医学影像", "机器学习", "数字健康", "AI"], stage: "senior", x: 230, y: 370,
    summary: "UCL 计算医疗教授，研究医学影像、计算成像、数字健康与机器学习。",
    training: "University of Oxford 硕士与博士；UCL 官方教育字段另列 University of Belgrade diploma。",
    research: "生物医学工程、计算与医学成像、数字健康、机器学习及人机交互。",
    attention: "其节点连接工程、AI 与临床问题，可帮助识别 UCL 医疗 AI 的跨学院学术网络。",
  }),
  person({
    officialId: "838", id: "ann-blandford-ucl-roster", slug: "ann-blandford", ext: "jpg",
    name: "Ann Blandford", role: "Professor of Human Computer Interaction", area: "Human–Computer Interaction · Digital Health",
    tags: ["HCI", "数字健康", "人本计算", "健康信息学", "AI教育"], stage: "senior", x: 490, y: 370,
    summary: "UCL 人机交互教授，研究真实医疗场景中的交互系统、数字健康、患者与临床人员体验。",
    training: "Cambridge 数学学士；Open University 人工智能与教育博士。",
    research: "人机交互、数字健康、健康信息学，以及复杂系统在真实临床环境中的设计与评估。",
    attention: "其一手个人页公开列出长期博士生指导记录，为后续逐人核验 HCI 与数字健康学术谱系提供高质量入口。",
    flows: "UCL 官方简介列出多名已指导博士生及其论文链接，但本批不在未核验任职去向的情况下创建人才流动结论。",
  }),
];
