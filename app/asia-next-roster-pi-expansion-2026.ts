import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const rosters = {
  PKU: official(
    "北京大学智能学院专职教师名录",
    "https://www.cis.pku.edu.cn/szdw/zzjs.htm",
    "当前专职教师名录成员身份",
  ),
  Nankai: official(
    "南开大学人工智能学院教授（研究员）名录",
    "https://ai.nankai.edu.cn/szdw/js_yjy_.htm",
    "当前教授（研究员）名录成员身份",
  ),
  HUST: official(
    "华中科技大学计算机学院按姓氏排列师资名录",
    "http://www.cs.hust.edu.cn/szdw/jsml/axmpyszmlb.htm",
    "当前计算机学院教师名录成员身份",
  ),
} satisfies Record<"PKU" | "Nankai" | "HUST", Source>;

type Seed = {
  id: string;
  name: string;
  institution: "PKU" | "Nankai" | "HUST";
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  profileUrl: string;
  appointment: string;
  research: string;
  training: string;
  attention: string;
  x: number;
  y: number;
};

function profileSource(seed: Seed): Source {
  return official(
    `${seed.institution} 官方个人页 — ${seed.name}`,
    seed.profileUrl,
    "当前任职、研究方向、教育与工作经历及官方头像",
  );
}

function person(seed: Seed): Person {
  const profile = profileSource(seed);
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: seed.institution,
    region: "Mainland China",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: [
      { label: "当前任职", value: seed.appointment, source: profile },
      { label: "研究主线", value: seed.research, source: profile },
      { label: "教育与学术训练", value: seed.training, source: profile },
      { label: "为什么值得关注", value: seed.attention, source: profile },
    ],
    stage: seed.stage,
    category: "core",
    status: "current PI · official roster and profile verified",
    sources: [profile, rosters[seed.institution]],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/asia-next-batch-2026/${seed.id}.jpg`,
      alt: `${seed.name} 官方头像`,
      source: profile,
    },
  };
}

const seeds: Seed[] = [
  {
    id: "cong-fang-pku", name: "方聪", institution: "PKU", role: "助理教授 · 研究员 · 博士生导师",
    area: "Deep Learning Theory · Optimization · Causal Learning", tags: ["深度学习理论", "优化", "因果学习"],
    summary: "北京大学智能学院青年 PI，研究深度学习理论、优化算法与因果学习。", stage: "emerging",
    profileUrl: "https://www.cis.pku.edu.cn/info/1362/2708.htm",
    appointment: "北京大学智能学院助理教授、研究员、博士生导师、博雅青年学者。",
    research: "长期研究深度学习理论与优化，并覆盖因果学习。",
    training: "2019 年获北京大学博士学位，官方简介明确写明师从林宙辰；随后在 Princeton 与 Penn 从事博士后研究。",
    attention: "把可证明的优化与泛化问题连接到现代深度学习，是北大机器学习理论的新生代节点。", x: 120, y: 120,
  },
  {
    id: "zhouchen-lin-pku", name: "林宙辰", institution: "PKU", role: "教授 · 博士生导师",
    area: "Machine Learning · Computer Vision · Numerical Optimization", tags: ["机器学习", "计算机视觉", "数值优化"],
    summary: "北京大学机器学习、视觉与优化资深教授，研究横跨方法理论和视觉计算。", stage: "senior",
    profileUrl: "https://www.cis.pku.edu.cn/info/1362/2245.htm",
    appointment: "北京大学智能学院教授、博士生导师。",
    research: "机器学习、模式识别、计算机视觉、图像处理与数值优化。",
    training: "1997–2000 年在北京大学数学学院攻读博士，2000 年获理学博士学位。",
    attention: "其研究与人才培养把数学优化、机器学习和视觉连接起来；官方资料还明确支持方聪的博士师承边。", x: 280, y: 120,
  },
  {
    id: "chi-zhang-pku", name: "张驰", institution: "PKU", role: "助理教授",
    area: "Language Models · Agents · Cognitive Reasoning", tags: ["语言模型", "智能体", "常识推理", "认知计算"],
    summary: "北京大学智能学院青年 PI，研究语言模型、智能体与结构化认知推理。", stage: "emerging",
    profileUrl: "https://www.cis.pku.edu.cn/info/1362/9415.htm",
    appointment: "2026 年加入北京大学智能学院任助理教授。",
    research: "语言模型、智能体、常识与抽象推理、概念学习、神经符号方法及推理优化。",
    training: "2017 年获浙江大学计算机学士，2022 年获 UCLA 计算机博士，官方简介明确写明师从朱松纯。",
    attention: "同时具有认知推理研究和 ByteDance Seed 数学、代码推理模型研发经历，连接学术与前沿产业模型。", x: 440, y: 120,
  },
  {
    id: "hangxin-liu-pku", name: "刘航欣", institution: "PKU", role: "助理教授",
    area: "Robotics · Embodied Intelligence · Human–Robot Interaction", tags: ["机器人", "具身智能", "人机交互"],
    summary: "北京大学具身智能青年 PI，研究机器人感知、认知、学习与本体设计。", stage: "emerging",
    profileUrl: "https://www.cis.pku.edu.cn/info/1362/9405.htm",
    appointment: "北京大学智能学院助理教授。",
    research: "智能机器人感知、认知与学习方法，机器人本体设计及人机交互。",
    training: "Virginia Tech 本科；UCLA 机械工程硕士和计算机科学博士。",
    attention: "曾任北京通用人工智能研究院研究员、机器人实验室主任，能把具身学习与真实机器人系统结合。", x: 600, y: 120,
  },
  {
    id: "zhihong-deng-pku", name: "邓志鸿", institution: "PKU", role: "教授",
    area: "Machine Learning · NLP · Data Mining", tags: ["机器学习", "深度学习", "NLP", "数据挖掘"],
    summary: "北京大学机器学习与数据挖掘教授，研究覆盖 NLP 与大数据智能分析。", stage: "senior",
    profileUrl: "https://www.cis.pku.edu.cn/info/1362/2257.htm",
    appointment: "北京大学智能学院教授。",
    research: "机器学习与深度学习、自然语言处理和大数据挖掘。",
    training: "2000 年获北京大学计算机硕士，2003 年获北京大学计算机软件与理论博士学位。",
    attention: "长期横跨基础机器学习、语言处理和数据挖掘，是北大数据智能方向的稳定资深节点。", x: 760, y: 120,
  },
  {
    id: "songchun-zhu-pku", name: "朱松纯", institution: "PKU", role: "讲席教授 · 智能学院院长",
    area: "General AI · Computer Vision · Cognitive Science · Robotics", tags: ["通用人工智能", "计算机视觉", "认知科学", "机器人"],
    summary: "北京大学智能学院院长，长期研究视觉、认知、统计建模与通用人工智能。", stage: "institute",
    profileUrl: "https://www.cis.pku.edu.cn/info/1362/2267.htm",
    appointment: "北京大学讲席教授，自 2021 年 12 月起任智能学院院长。",
    research: "通用人工智能基础、计算机视觉、统计建模与计算、认知科学、机器学习和自主机器人。",
    training: "1992–1996 年在 Harvard 完成计算机硕士、博士训练，之后在 Brown 从事应用数学博士后研究。",
    attention: "曾任 UCLA VCLA 主任，其学术体系持续连接视觉、认知与自主智能，并形成跨校人才网络。", x: 920, y: 120,
  },
  {
    id: "jie-liu-nankai", name: "刘杰", institution: "Nankai", role: "教授",
    area: "Machine Learning · LLM · Data Mining · NLP", tags: ["机器学习", "大模型", "数据挖掘", "NLP"],
    summary: "南开大学机器学习与数据挖掘教授，研究延伸到大模型、NLP 和视频理解。", stage: "senior",
    profileUrl: "https://ai.nankai.edu.cn/info/1033/4210.htm",
    appointment: "2017 年 12 月起任南开大学人工智能学院教授。",
    research: "机器学习与数据挖掘基础研究，以及大语言模型、NLP、网络挖掘和视频图像理解。",
    training: "曾在 UC Santa Cruz、NEC 美国研究院、微软亚洲研究院与 Rutgers 访问或开展项目合作。",
    attention: "官方主页同时披露产学合作与毕业生去向，涵盖阿里、腾讯、国家电网及银行等单位。", x: 120, y: 340,
  },
  {
    id: "jingtai-liu-nankai", name: "刘景泰", institution: "Nankai", role: "教授",
    area: "Robotics · Human–Robot Symbiosis · Networked Robots", tags: ["机器人学", "服务机器人", "人机共融", "网络机器人"],
    summary: "南开大学机器人学资深带头人，长期建设智能机器人与人才培养体系。", stage: "institute",
    profileUrl: "https://ai.nankai.edu.cn/info/1033/2794.htm",
    appointment: "南开大学人工智能学院教授、机器人学科带头人。",
    research: "机器人学、智能与服务机器人、人工智能、人机共融及网络机器人。",
    training: "1986 年获天津大学工学硕士，1998 年获南开大学机器人学方向工学博士；2006 年赴 Berkeley Ken Goldberg 实验室交流。",
    attention: "长期建设南开机器人与信息自动化研究所，并持续承担本科生、硕博与青少年创新人才培养。", x: 280, y: 340,
  },
  {
    id: "zepeng-ning-nankai", name: "宁泽鹏", institution: "Nankai", role: "教授 · 博士生导师",
    area: "Embodied Intelligence · Deep RL · Control · AI for Science", tags: ["具身智能", "强化学习", "控制", "AI for Science", "招 PhD"],
    summary: "南开大学具身智能与学习控制青年教授，连接机器人、控制与 AI for Science。", stage: "emerging",
    profileUrl: "https://ai.nankai.edu.cn/info/1033/6538.htm",
    appointment: "2026 年 4 月起任南开大学人工智能学院教授、博士生导师。",
    research: "多运动模态与仿生具身智能、深度/强化学习控制、鲁棒预测控制和 AI for Science。",
    training: "HIT 学士、硕士、博士；曾赴 Berkeley 联合培养，并在 NTU 多个院系从事研究。",
    attention: "官方主页公开招收机器学习、机器人与自动控制方向硕博生，体现活跃的新实验室建设状态。", x: 440, y: 340,
  },
  {
    id: "zhongxin-liu-nankai", name: "刘忠信", institution: "Nankai", role: "教授 · 自动化系主任",
    area: "Swarm Intelligence · Multi-Agent Systems · Intelligent Control", tags: ["群体智能", "多智能体", "智能优化", "无人集群"],
    summary: "南开大学群体智能与无人集群资深教授，兼具学科组织和团队化培养角色。", stage: "institute",
    profileUrl: "https://ai.nankai.edu.cn/info/1033/4287.htm",
    appointment: "南开大学人工智能学院教授，现任自动化系主任。",
    research: "群体智能与集群无人系统、智能优化与控制及人工智能技术应用。",
    training: "1997 年获南开大学学士，2002 年获南开大学自动化系博士学位，同年留校任教。",
    attention: "官方主页公开研究生培养成果与团队化招生体系，是南开多智能体与无人集群网络的组织节点。", x: 600, y: 340,
  },
  {
    id: "jing-xu-nankai", name: "许静", institution: "Nankai", role: "教授",
    area: "Artificial Intelligence · Object Detection · Medical Imaging", tags: ["人工智能", "目标检测", "医学图像", "软件安全"],
    summary: "南开大学人工智能与目标检测教授，研究连接医学图像、软件测试与安全。", stage: "senior",
    profileUrl: "https://ai.nankai.edu.cn/info/1033/3528.htm",
    appointment: "南开大学人工智能学院教授，长期在机器智能研究体系任职。",
    research: "人工智能、目标检测、医学图像处理、软件测试与软件安全。",
    training: "南开大学计算机学士、北京航空航天大学计算机硕士、南开大学博士；2002–2003 年访问微软亚洲研究院。",
    attention: "研究横跨感知算法、医学计算和软件可信性，体现传统机器智能团队的多方向延展。", x: 760, y: 340,
  },
  {
    id: "han-zhang-nankai", name: "张瀚", institution: "Nankai", role: "教授 · 智能工程系主任",
    area: "Machine Learning · Graph Learning · Biomedical AI", tags: ["机器学习", "图学习", "医学影像", "生物信息"],
    summary: "南开大学智能工程系主任，研究统计机器学习、图学习与生物医学数据智能。", stage: "institute",
    profileUrl: "https://ai.nankai.edu.cn/info/1185/5628.htm",
    appointment: "南开大学人工智能学院教授、博士生导师、智能工程系主任。",
    research: "机器学习与数据挖掘、深度学习优化、图学习、生物信息大数据和医学影像处理。",
    training: "2005 年获南开大学自动化博士；之后在 University of Georgia 从事生物信息博士后，并赴 Rice 与 Kyoto 访问研究。",
    attention: "官方主页公开学生深造和就业去向，包括多所海外高校及华为、字节、阿里、百度、腾讯等企业。", x: 920, y: 340,
  },
  {
    id: "jianlei-zhang-nankai", name: "张建磊", institution: "Nankai", role: "教授 · 博士生导师 · 自动化系副主任",
    area: "Swarm Intelligence · Reinforcement Learning · UAV Systems", tags: ["群体智能", "强化学习", "无人机集群", "机器学习"],
    summary: "南开大学群体智能与无人集群教授，研究演化博弈、机器学习和集群决策。", stage: "senior",
    profileUrl: "https://ai.nankai.edu.cn/info/1269/6245.htm",
    appointment: "南开大学教授、博士生导师、自动化系副主任。",
    research: "演化博弈与群体智能、模式识别与机器学习、强化学习、图像处理和无人机集群决策。",
    training: "2013 年获北京大学博士，2015 年获 University of Groningen 博士学位。",
    attention: "官方主页记录指导硕士与本科生 40 余人，并披露华为、小米、理想汽车、航天院所等就业去向。", x: 1080, y: 340,
  },
  {
    id: "fei-chen-nankai", name: "陈飞", institution: "Nankai", role: "教授 · 博士生导师 · 副院长",
    area: "Distributed Learning · Distributed Optimization · Control", tags: ["分布式学习", "分布式优化", "协同控制", "招 PhD"],
    summary: "南开大学分布式学习与协同控制教授，研究网络化系统的优化、学习与控制。", stage: "institute",
    profileUrl: "https://ai.nankai.edu.cn/info/1232/5761.htm",
    appointment: "南开大学人工智能学院教授、博士生导师、副院长。",
    research: "分布式协同控制、分布式优化与分布式学习。",
    training: "2009 年获南开大学控制理论与控制工程博士；随后在 Utah State 从事博士后，并赴 UCR、CityU 访问。",
    attention: "官方主页明确长期招收博士后，并每年招收 1–2 名博士生和约 3 名硕士生。", x: 1240, y: 340,
  },
  {
    id: "xiao-liang-nankai", name: "梁潇", institution: "Nankai", role: "教授 · 博士生导师",
    area: "Aerial Robotics · Legged Robots · Vision-Language Navigation", tags: ["无人机", "足式机器人", "VLN", "运动规划"],
    summary: "南开大学机器人青年教授，研究作业型无人机、足式机器人与视觉语言导航。", stage: "emerging",
    profileUrl: "https://ai.nankai.edu.cn/info/1286/6617.htm",
    appointment: "南开大学人工智能学院教授、博士生导师。",
    research: "作业型无人机与足式机器人，包括智能控制与感知、运动规划、视觉语言导航、多机器人协作和本体设计。",
    training: "2018 年获南开大学博士学位，官方主页明确写明师从方勇纯；毕业后留校并担任韩建达教授助手。",
    attention: "将具身感知、语言导航和机器人控制汇聚到真实无人系统平台，是南开机器人方向的新生代节点。", x: 1400, y: 340,
  },
  {
    id: "kun-he-hust", name: "何琨", institution: "HUST", role: "教授 · 博士生导师 · 研究中心执行主任",
    area: "Machine Learning · Reinforcement Learning · Combinatorial Optimization", tags: ["机器学习", "强化学习", "组合优化", "可解释 AI"],
    summary: "华中科技大学机器学习与优化教授，领导 Hopcroft 计算科学研究中心。", stage: "institute",
    profileUrl: "http://faculty.hust.edu.cn/hekun/zh_CN/index.htm",
    appointment: "华中科技大学计算机学院教授、智能科学与技术专业负责人、Hopcroft 计算科学研究中心执行主任。",
    research: "深度学习、机器学习、社交网络、强化学习和组合优化，并面向计算机视觉与 NLP 应用。",
    training: "在华中科技大学完成博士训练；2013–2018 年多次赴 Cornell 任客座副教授或客座教授。",
    attention: "官方主页明确其团队与 John Hopcroft 等学者开展合作，并形成约 40 人研究生团队。", x: 120, y: 560,
  },
  {
    id: "hefei-ling-hust", name: "凌贺飞", institution: "HUST", role: "教授 · 博士生导师 · 研究所所长",
    area: "Multimodal Intelligence · Computer Vision · AI Safety", tags: ["多模态智能", "计算机视觉", "AI 安全", "大数据智能"],
    summary: "华中科技大学数字媒体与智能技术研究所所长，研究多模态智能与可信视觉计算。", stage: "institute",
    profileUrl: "http://faculty.hust.edu.cn/linghefei/zh_CN/index.htm",
    appointment: "华中科技大学计算机学院教授、博士生导师、数字媒体与智能技术研究所所长。",
    research: "多模态智能、视觉与大数据智能、人工智能安全及相关数字媒体技术。",
    training: "1999、2002、2005 年分别获华中科技大学学士、硕士、博士；2008–2009 年赴 UCL 任访问教授。",
    attention: "兼具研究所建设与跨模态、安全方向布局，是 HUST 数字媒体和智能技术的重要组织节点。", x: 280, y: 560,
  },
  {
    id: "wei-wei-hust", name: "魏巍", institution: "HUST", role: "教授 · 博士生导师 · CCIIP 主任",
    area: "NLP · Information Retrieval · Recommendation · Multimodal Computing", tags: ["NLP", "信息检索", "推荐系统", "多模态"],
    summary: "华中科技大学认知计算与智能信息处理实验室主任，研究 NLP、检索、推荐与多模态计算。", stage: "institute",
    profileUrl: "http://faculty.hust.edu.cn/weiw/zh_CN/index.htm",
    appointment: "华中科技大学计算机学院教授、博士生导师、CCIIP 实验室主任。",
    research: "人工智能、自然语言处理、信息检索与推荐、多模态计算和数据挖掘。",
    training: "2012 年获 HUST 计算机博士；博士阶段曾在 MSRA、NTU 与 NUS 研究，之后在 NTU 与 SMU 从事博士后/研究工作。",
    attention: "官方主页公开硕博招生和海外、MSRA 联合培养机会，连接 HUST 与新加坡研究网络。", x: 440, y: 560,
  },
];

export const asiaNextRosterPiExpansionPeople2026: Person[] = seeds.map(person);

export const asiaNextRosterPiExpansionPortraits2026 = Object.fromEntries(
  asiaNextRosterPiExpansionPeople2026.map((entry) => [entry.id, entry.portrait!]),
) as Record<string, NonNullable<Person["portrait"]>>;

const sourceFor = (id: string) => profileSource(seeds.find((seed) => seed.id === id)!);

export const asiaNextRosterPiExpansionRelationships2026: Relationship[] = [
  {
    id: "asia-next-2026-zhouchen-lin-cong-fang-phd",
    from: "zhouchen-lin-pku",
    to: "cong-fang-pku",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "北京大学方聪官方个人页明确写明其 2019 年在北京大学获博士学位，师从林宙辰教授。",
    evidenceObject: "方聪博士学位导师",
    source: sourceFor("cong-fang-pku"),
    verified: true,
  },
  {
    id: "asia-next-2026-songchun-zhu-hangxin-liu-robotics",
    from: "songchun-zhu-pku",
    to: "hangxin-liu-pku",
    type: "collaboration",
    subtype: "publication",
    label: "异构机器人协作研究",
    evidence: "北京通用人工智能研究院官方报道列朱松纯、刘航欣与陈晰为 Science Robotics 异构机器人意图理解与协作研究成员。",
    evidenceObject: "Adaptive imitation and collaboration across heterogeneous robot teams",
    source: {
      label: "北京通用人工智能研究院 · Science Robotics 异构机器人协作成果",
      url: "https://www.bigai.ai/blog/news/%E9%80%9A%E7%A0%94%E9%99%A2%E7%A0%94%E7%A9%B6%E6%88%90%E6%9E%9C%E7%99%BB%E3%80%8Ascience-robotics%E3%80%8B%EF%BC%9A%E9%A6%96%E6%AC%A1%E5%AE%9E%E7%8E%B0%E5%BC%82%E6%9E%84%E6%9C%BA%E5%99%A8%E4%BA%BA/",
      kind: "official",
      checkedAt,
      supports: "朱松纯与刘航欣共同参与异构机器人团队研究",
    },
    verified: true,
  },
  {
    id: "asia-next-2026-deng-zhihong-tang-jian-rotate",
    from: "zhihong-deng-pku",
    to: "jie-tang-thu",
    type: "collaboration",
    subtype: "publication",
    label: "RotatE 知识图谱合作",
    evidence: "邓志鸿的北京大学官方主页列出其与唐杰等共同署名的 ICLR 2019 论文 RotatE。",
    evidenceObject: "RotatE: Knowledge Graph Embedding by Relational Rotation in Complex Space",
    source: sourceFor("zhihong-deng-pku"),
    verified: true,
  },
  {
    id: "asia-next-2026-songchun-zhu-chi-zhang-phd",
    from: "songchun-zhu-pku",
    to: "chi-zhang-pku",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "北京大学张驰官方个人页明确写明其 2022 年获 UCLA 计算机科学博士学位，师从朱松纯教授。",
    evidenceObject: "张驰博士学位导师",
    source: sourceFor("chi-zhang-pku"),
    verified: true,
  },
  {
    id: "asia-next-2026-liu-zhongxin-chen-fei-publication",
    from: "zhongxin-liu-nankai",
    to: "fei-chen-nankai",
    type: "collaboration",
    subtype: "publication",
    label: "分布式控制论文合作",
    evidence: "陈飞的南开大学官方主页列出其与刘忠信共同署名的数据驱动非线性系统跟踪控制论文。",
    evidenceObject: "Data-driven tracking for nonlinear systems",
    source: sourceFor("fei-chen-nankai"),
    verified: true,
  },
  {
    id: "asia-next-2026-han-zhang-jie-liu-joint-lab",
    from: "han-zhang-nankai",
    to: "jie-liu-nankai",
    type: "collaboration",
    subtype: "joint_lab",
    label: "校企联合实验室交流",
    evidence: "南开大学人工智能学院官方报道列张瀚、刘杰等为学院教师代表，共同参加学院—悟空投资联合实验室学术交流会。",
    source: {
      label: "南开大学人工智能学院—悟空投资联合实验室学术交流会",
      url: "https://ai.nankai.edu.cn/info/1018/3862.htm",
      kind: "official",
      checkedAt,
      supports: "张瀚与刘杰共同参加学院—企业联合实验室学术交流",
    },
    verified: true,
  },
  {
    id: "asia-next-2026-hefei-ling-kun-he-academic-committee",
    from: "hefei-ling-hust",
    to: "kun-he-hust",
    type: "collaboration",
    subtype: "other",
    label: "学院学术委员会",
    evidence: "华中科技大学计算机学院官方学术委员会名单同时列出凌贺飞与何琨为委员。",
    source: {
      label: "华中科技大学计算机学院学术委员会",
      url: "https://cs.hust.edu.cn/xygk/zzjg/xsjxzz/xswyh.htm",
      kind: "official",
      checkedAt,
      supports: "凌贺飞与何琨的学院学术治理关系",
    },
    verified: true,
  },
];
