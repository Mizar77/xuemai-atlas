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
  "THU CS": official(
    "清华大学计算机系在职教师完整名录",
    "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm",
    "当前在职教师名录、研究所与职称分组",
  ),
  "THU Automation": official(
    "清华大学自动化系按研究所教师名录",
    "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm",
    "当前教师名录与研究所归属",
  ),
  "THU AIR": official(
    "清华大学智能产业研究院研究团队名录",
    "https://air.tsinghua.edu.cn/airtd/yjtd.htm",
    "当前教授、研究员、访问教授及科研工程师分组",
  ),
} satisfies Record<"THU CS" | "THU Automation" | "THU AIR", Source>;

type Seed = {
  id: string;
  name: string;
  unit: keyof typeof rosters;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  profileUrl: string;
  appointment: string;
  research: string;
  training: string;
  network: string;
  x: number;
  y: number;
};

function profileSource(seed: Seed): Source {
  return official(
    `${seed.unit} 官方个人页 — ${seed.name}`,
    seed.profileUrl,
    "当前职称、研究领域、教育与工作经历及官方头像",
  );
}

function person(seed: Seed): Person {
  const profile = profileSource(seed);
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: "THU",
    region: "Mainland China",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: [
      { label: "当前任职", value: seed.appointment, source: profile },
      { label: "研究主线", value: seed.research, source: profile },
      { label: "教育与学术训练", value: seed.training, source: profile },
      { label: "学术与产业网络", value: seed.network, source: profile },
    ],
    stage: seed.stage,
    category: "core",
    status: "current PI · official roster and profile verified",
    sources: [profile, rosters[seed.unit]],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/thu-ntu-next-batch-2026/${seed.id}.jpg`,
      alt: `${seed.name} 官方头像`,
      source: profile,
    },
  };
}

const seeds: Seed[] = [
  {
    id: "guoliang-li-thu", name: "李国良", unit: "THU CS", role: "长聘教授",
    area: "Autonomous Databases · Data Mining · Large-scale Data Management", tags: ["自治数据库", "数据挖掘", "大数据", "数据管理"],
    summary: "清华大学自治数据库与大规模数据智能教授，研究覆盖数据挖掘、众包和时空数据分析。", stage: "senior",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1303/4317.htm",
    appointment: "清华大学计算机系长聘教授，官方在职名录列于计算机软件研究所教授组。",
    research: "自治数据库、众包计算、大规模时空数据管理，以及数据分析、挖掘、清洗与集成。",
    training: "哈尔滨工业大学计算机学士；清华大学计算机硕士和博士，2009 年获博士学位。",
    network: "官方简介记录其长期服务 SIGMOD、VLDB、KDD、ICDE 等数据管理与挖掘社区，并担任多本期刊编委。", x: 120, y: 120,
  },
  {
    id: "juanzi-li-thu", name: "李涓子", unit: "THU CS", role: "教授",
    area: "Knowledge Graphs · Semantic Web · Text and Social Mining", tags: ["知识图谱", "语义网", "文本挖掘", "社会网络"],
    summary: "清华大学知识图谱与语义计算资深教授，研究连接语义网、文本挖掘和学术社会网络。", stage: "senior",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1303/4318.htm",
    appointment: "清华大学计算机系教授，官方在职名录列于计算机软件研究所教授组。",
    research: "语义网与语义服务、新闻与社会网络挖掘，以及语义内容管理。",
    training: "山西大学计算机学士、硕士；2000 年获清华大学计算机博士，随后完成清华电子系博士后研究。",
    network: "官方简介明确提到其社会网络研究进入 AMiner，并长期参与中文信息处理与知识工程学术组织。", x: 280, y: 120,
  },
  {
    id: "jianyong-wang-thu", name: "王建勇", unit: "THU CS", role: "教授",
    area: "Data Mining · Machine Learning · AI for Health", tags: ["数据挖掘", "机器学习", "医疗 AI", "神经符号"],
    summary: "清华大学数据挖掘与机器学习教授，研究从序列模式、主题模型延伸到医疗智能。", stage: "senior",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1303/4320.htm",
    appointment: "清华大学计算机系教授，官方在职名录列于计算机软件研究所教授组。",
    research: "数据挖掘、机器学习和健康医疗 AI，包括序列模式、短文本主题模型与可解释神经符号分类。",
    training: "兰州大学计算机学士、北京工业大学计算机硕士、中国科学院计算机博士。",
    network: "官方主页披露 Microsoft Research、Google、HP Labs、Samsung、Huawei 与 Sogou 等项目支持。", x: 440, y: 120,
  },
  {
    id: "yuxiao-dong-thu", name: "董宇啸", unit: "THU CS", role: "副教授",
    area: "Graph Machine Learning · LLMs · Data Mining", tags: ["图机器学习", "大模型", "数据挖掘", "预训练"],
    summary: "清华大学图机器学习与大模型 PI，研究连接网络表示学习、图预训练和 GLM 系列模型。", stage: "emerging",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1304/4468.htm",
    appointment: "清华大学计算机系副教授，官方在职名录列于计算机软件研究所副教授组。",
    research: "数据挖掘、图表示与图预训练、大语言模型预训练。",
    training: "2017 年获 University of Notre Dame 计算机博士学位。",
    network: "加入清华前曾任 Meta AI 与 Microsoft Research Redmond 研究员；官方简介列出 GLM-130B、WebGLM、CodeGeeX 和 ChatGLM。", x: 600, y: 120,
  },
  {
    id: "lei-hou-thu", name: "侯磊", unit: "THU CS", role: "副教授",
    area: "Knowledge Graphs · Large Language Models", tags: ["知识图谱", "大模型", "知识推理", "NLP"],
    summary: "清华大学知识图谱与大模型副教授，研究知识表示、获取、融合、推理及模型知识能力。", stage: "emerging",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1304/4664.htm",
    appointment: "清华大学计算机系副教授；官方页面记录其 2019 年起进入教师序列。",
    research: "知识图谱和大语言模型，覆盖知识表示、获取、融合、推理及模型知识记忆、理解与应用。",
    training: "北京邮电大学计算机学士，2016 年获清华大学计算机博士，随后在清华完成博士后研究。",
    network: "官方成果列表显示与李涓子、唐杰等持续合作，并获得 ACL Demo 最佳论文和 EMNLP 杰出论文。", x: 760, y: 120,
  },
  {
    id: "yongjin-liu-thu", name: "刘永进", unit: "THU CS", role: "教授",
    area: "Computer Vision · Computer Graphics · Computational Geometry", tags: ["计算机视觉", "计算机图形学", "计算几何", "设计自动化"],
    summary: "清华大学视觉与图形教授，研究计算几何、计算机图形、视觉和脑启发设计智能。", stage: "senior",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1306/4331.htm",
    appointment: "清华大学计算机系教授，官方在职名录列于人机交互与媒体集成研究所。",
    research: "计算几何、计算机图形与视觉、认知和模式分析，以及脑启发 AI 与设计自动化。",
    training: "天津大学机电学士；HKUST 机械工程硕士、博士，并在 HKUST 从事博士后研究。",
    network: "研究同时面向理论和可部署工业级系统，连接视觉计算、CAD 与设计优化。", x: 920, y: 120,
  },
  {
    id: "wenwu-zhu-thu", name: "朱文武", unit: "THU CS", role: "教授",
    area: "Multimedia AI · Multimodal Representation · Networked Media", tags: ["多媒体", "多模态", "表示学习", "网络媒体"],
    summary: "清华大学多媒体与多模态表示资深教授，研究网络媒体、信号处理和社会感知计算。", stage: "senior",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1306/4336.htm",
    appointment: "清华大学计算机系教授，官方在职名录列于人机交互与媒体集成研究所。",
    research: "多媒体信号处理、多模态网络表示和网络化媒体计算。",
    training: "电子工程学士、Illinois Institute of Technology 硕士、1996 年获 NYU 电气与计算机工程博士。",
    network: "曾任 IEEE Transactions on Multimedia 与 IEEE TCSVT 主编，长期连接多媒体研究和国际学术共同体。", x: 1080, y: 120,
  },
  {
    id: "hang-su-thu", name: "苏航", unit: "THU CS", role: "副教授",
    area: "Trustworthy ML · Explainable AI · Computer Vision · RL", tags: ["可信机器学习", "可解释 AI", "计算机视觉", "强化学习"],
    summary: "清华大学可信机器学习与视觉副教授，研究可解释、安全稳健学习和图像视频理解。", stage: "emerging",
    profileUrl: "https://www.cs.tsinghua.edu.cn/csen/info/1313/4403.htm",
    appointment: "清华大学计算机系副教授，官方在职名录列于人工智能研究所。",
    research: "可信与可解释机器学习、计算机视觉和强化学习。",
    training: "上海交通大学电子工程学士、硕士、博士，2014 年获博士学位。",
    network: "官方主页记录其研究在 CVPR、ECCV、TMI 等发表，并服务 IJCAI、AAAI、CVPR 及 TPAMI 等社区。", x: 1240, y: 120,
  },
  {
    id: "changshui-zhang-thu", name: "张长水", unit: "THU Automation", role: "教授",
    area: "Machine Learning · Few-shot Learning · Causal Learning · LLM Reasoning", tags: ["机器学习", "小样本学习", "因果学习", "大模型推理"],
    summary: "清华自动化机器学习资深教授，研究从模式识别扩展到小样本、因果学习和大模型推理。", stage: "senior",
    profileUrl: "https://www.au.tsinghua.edu.cn/info/1078/3257.htm",
    appointment: "2000 年起任清华大学自动化系教授，隶属信息处理研究所。",
    research: "模式识别、人工智能、机器学习、计算机视觉，当前覆盖深度学习、小样本、因果学习与大模型推理。",
    training: "清华大学数学系学士，1992 年获清华大学自动化系博士学位。",
    network: "官方成果和教材覆盖机器学习理论、视觉、NLP 与智能交通，形成跨任务方法研究链条。", x: 120, y: 360,
  },
  {
    id: "xuegong-zhang-thu", name: "张学工", unit: "THU Automation", role: "教授",
    area: "Foundation Models for Biology · Biomedical ML · Single-cell AI", tags: ["生命基础模型", "生物医学 AI", "单细胞", "数字孪生"],
    summary: "清华大学生物信息与生命基础模型教授，研究机器学习、生物医学大数据和单细胞智能。", stage: "institute",
    profileUrl: "https://www.au.tsinghua.edu.cn/info/1078/3135.htm",
    appointment: "2002 年起任清华大学自动化系模式识别与生物信息学教授，并任生物信息学教育部重点实验室副主任。",
    research: "生命基础模型、机器学习与生物医学大数据、单细胞信息学、人体细胞图谱和数字孪生。",
    training: "1994 年获清华大学模式识别与智能系统工学博士学位。",
    network: "长期连接人工智能、计算生物学和医学，多项官方成果发表于生命科学与生物信息学期刊。", x: 280, y: 360,
  },
  {
    id: "jie-zhou-thu-auto", name: "周杰", unit: "THU Automation", role: "教授 · 博士生导师",
    area: "Computer Vision · Biometrics · Pattern Recognition", tags: ["计算机视觉", "生物识别", "模式识别", "医学图像"],
    summary: "清华自动化计算机视觉与生物特征识别资深教授，建立了持续的博士生培养链条。", stage: "senior",
    profileUrl: "https://www.au.tsinghua.edu.cn/info/1078/3126.htm",
    appointment: "2003 年起任清华大学自动化系教授，2004 年起任博士生导师。",
    research: "指纹、掌纹与人脸识别，以及视觉监控、双目视觉、医学图像、图像分析和检索。",
    training: "1995 年获华中理工大学模式识别与智能控制博士，随后在清华自动化系从事博士后研究。",
    network: "官方主页明确列出陈芳林、代季峰、胡瀚等受指导博士生获得全国或学会优秀博士论文荣誉。", x: 440, y: 360,
  },
  {
    id: "jiwen-lu-thu", name: "鲁继文", unit: "THU Automation", role: "长聘教授",
    area: "Computer Vision · Foundation Models · Embodied AI Safety", tags: ["计算机视觉", "视觉大模型", "具身智能", "AI 安全"],
    summary: "清华自动化视觉与机器感知教授，研究基础视觉模型、内容安全和具身智能。", stage: "senior",
    profileUrl: "https://www.au.tsinghua.edu.cn/info/1078/3156.htm",
    appointment: "2024 年 6 月起任清华大学自动化系长聘教授。",
    research: "机器视觉感知、人工智能安全、具身智能系统和通用视觉基础大模型。",
    training: "西安理工大学学士、硕士；2011 年获 NTU 电气与电子工程博士学位。",
    network: "官方主页披露多项视觉大模型、视频鉴伪和服务机器人国家级项目，连接视觉基础研究与真实系统。", x: 600, y: 360,
  },
  {
    id: "xiangyang-ji-thu", name: "季向阳", unit: "THU Automation", role: "教授 · 博士生导师",
    area: "Machine Learning · Computational Imaging · Visual Perception", tags: ["机器学习", "计算成像", "视觉感知", "机器人视觉"],
    summary: "清华自动化机器学习与计算成像教授，研究视觉信息获取、编码摄像和智能感知。", stage: "senior",
    profileUrl: "https://www.au.tsinghua.edu.cn/info/1080/3178.htm",
    appointment: "2014 年起任清华大学自动化系教授、博士生导师。",
    research: "机器学习、视觉信息获取与处理、编码摄像、类人智能感知和机器人视觉。",
    training: "HIT 学士、硕士；2008 年获中国科学院计算技术研究所博士，随后在清华自动化系从事博士后研究。",
    network: "官方成果覆盖 CVPR、ECCV、ICRA 等视觉与机器人会议，并连接计算成像和 6D 位姿估计。", x: 760, y: 360,
  },
  {
    id: "yebin-liu-thu", name: "刘烨斌", unit: "THU Automation", role: "教授",
    area: "3D Vision · Digital Humans · Computational Photography", tags: ["三维视觉", "数字人", "计算摄像", "动态重建"],
    summary: "清华自动化三维视觉与数字人教授，研究动态人体重建、稀疏感知和计算摄像。", stage: "senior",
    profileUrl: "https://www.au.tsinghua.edu.cn/info/1080/3160.htm",
    appointment: "2022 年起任清华大学自动化系教授。",
    research: "三维视觉、数字人体、计算摄像和实时动态三维重建。",
    training: "北京邮电大学学士；2009 年获清华大学控制科学与工程博士，随后在清华完成博士后研究。",
    network: "官方主页披露与 Huawei、OPPO、ByteDance、Alibaba、SenseTime 等企业的联合研究或合作基金。", x: 920, y: 360,
  },
  {
    id: "zaiqing-nie-air", name: "聂再清", unit: "THU AIR", role: "首席研究员 · 万国数据教授",
    area: "Knowledge Graphs · Search · Natural Language Understanding", tags: ["知识图谱", "搜索", "自然语言理解", "产业 AI"],
    summary: "清华 AIR 知识图谱与语言理解首席研究员，连接 MSRA、阿里 AI Labs 与高校研究。", stage: "institute",
    profileUrl: "https://air.tsinghua.edu.cn/info/1046/1203.htm",
    appointment: "2020 年起任清华大学 AIR 首席研究员，现为万国数据教授。",
    research: "大数据、知识图谱、实体信息挖掘、关系抽取、实体消歧、对象级搜索和语音语义理解。",
    training: "清华大学计算机学士、硕士；2004 年获 Arizona State University 计算机博士，官方简介明确写明师从 Subbarao Kambhampati。",
    network: "2004–2017 年任职 MSRA，2017–2020 年任阿里天猫精灵首席科学家和达摩院 AI Labs 北京负责人。", x: 1080, y: 360,
  },
];

export const thuNtuNextBatchPiExpansionPeople2026: Person[] = seeds.map(person);

const publishableConnectedIds = new Set([
  "guoliang-li-thu",
  "juanzi-li-thu",
  "jianyong-wang-thu",
  "yuxiao-dong-thu",
  "lei-hou-thu",
  "yongjin-liu-thu",
  "wenwu-zhu-thu",
  "hang-su-thu",
  "changshui-zhang-thu",
  "xuegong-zhang-thu",
  "jie-zhou-thu-auto",
  "jiwen-lu-thu",
  "xiangyang-ji-thu",
  "yebin-liu-thu",
  "zaiqing-nie-air",
]);

/**
 * High-influence nodes are published only after a first-party relationship can
 * connect them to the atlas. Candidate priority batch 1 supplies the remaining
 * verified adviser/student endpoints, so all fifteen prepared profiles now pass.
 */
export const thuNtuNextBatchPiExpansionPublishedPeople2026 =
  thuNtuNextBatchPiExpansionPeople2026.filter((entry) => publishableConnectedIds.has(entry.id));

export const thuNtuNextBatchPiExpansionPortraits2026 = Object.fromEntries(
  thuNtuNextBatchPiExpansionPeople2026.map((entry) => [entry.id, entry.portrait!]),
) as Record<string, NonNullable<Person["portrait"]>>;

const liJuanziProfile = official(
  "李涓子个人主页",
  "https://keg.cs.tsinghua.edu.cn/persons/ljz/",
  "博士导师黄昌宁与博士后合作导师王作英",
);
const gaoWenStudentRoster = official(
  "鹏城实验室 / 高文团队桃李天下",
  "https://www.jdl.ac.cn/rencai/taolitianxia",
  "季向阳博士阶段由赵德斌、高文共同指导",
);
const houLeiAdviserRecord = official(
  "清华大学 2015 年研究生国际会议基金资助名单",
  "https://www.sist.tsinghua.edu.cn/__local/1/10/71/3D101085A652231F2B28E91BE4F_D8190763_623C5.pdf?e=.pdf",
  "名单第 13 条明确列侯磊的导师为李涓子",
);
const zhuJunGroupRoster = official(
  "朱军研究组成员与校友名录",
  "https://ml.cs.tsinghua.edu.cn/~jun/people.shtml",
  "成员页明确列苏航为 2015–2017 年博士后",
);

// Every emitted edge has two complete atlas endpoints and an explicit first-party
// statement. Shared affiliation or publication coauthorship is never upgraded to
// supervision automatically.
export const thuNtuNextBatchPiExpansionRelationships2026: Relationship[] = [
  {
    id: "thu-next-li-hou-lei",
    from: "juanzi-li-thu",
    to: "lei-hou-thu",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "清华大学研究生国际会议基金资助名单明确列侯磊的导师为李涓子。",
    source: houLeiAdviserRecord,
    verified: true,
  },
  {
    id: "thu-next-zhu-jun-su-hang",
    from: "jun-zhu-thu",
    to: "hang-su-thu",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后导师",
    evidence: "朱军研究组官方成员页明确列苏航为 2015–2017 年博士后成员。",
    source: zhuJunGroupRoster,
    startYear: 2015,
    endYear: 2017,
    verified: true,
  },
  {
    id: "thu-next-huang-li-juanzi",
    from: "changning-huang-thu-historical",
    to: "juanzi-li-thu",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "李涓子个人主页明确列 1996–2000 年博士论文导师为黄昌宁教授。",
    source: liJuanziProfile,
    verified: true,
  },
  {
    id: "thu-next-wang-li-juanzi",
    from: "zuoying-wang-thu",
    to: "juanzi-li-thu",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后合作导师",
    evidence: "李涓子个人主页明确列 2000–2001 年博士后 coordinator 为王作英教授。",
    source: liJuanziProfile,
    verified: true,
  },
  {
    id: "thu-next-gao-ji-xiangyang",
    from: "gao-wen-pku",
    to: "xiangyang-ji-thu",
    type: "lineage",
    subtype: "co_adviser",
    label: "共同博士导师",
    evidence: "官方学生名录列季向阳 2008 年视频编码博士导师为高文、赵德斌。",
    source: gaoWenStudentRoster,
    verified: true,
  },
  {
    id: "thu-next-zhao-ji-xiangyang",
    from: "zhao-debin-hit",
    to: "xiangyang-ji-thu",
    type: "lineage",
    subtype: "co_adviser",
    label: "共同博士导师",
    evidence: "官方学生名录列季向阳 2008 年视频编码博士导师为赵德斌、高文。",
    source: gaoWenStudentRoster,
    verified: true,
  },
];
