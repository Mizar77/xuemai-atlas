import type { Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  tanProfile: source(
    "中国科学院自动化研究所 · 谭铁牛",
    "https://www.ia.cas.cn/rcdw/yjy/202404/t20240422_7129881.html",
    "official",
    "现职、教育经历、学术任职、研究方向、代表性荣誉与人才培养",
  ),
  tanCommittee: source(
    "中国科学院自动化研究所 · 学术委员会",
    "https://www.ia.cas.cn/jgsz/xswyh/",
    "official",
    "谭铁牛担任自动化所学术委员会主任",
  ),
  tanAcademician: source(
    "中国科学院院士文库 · 谭铁牛",
    "https://yswk.csdl.ac.cn/ys_detail?casid=2013E07",
    "official",
    "中国科学院院士身份与学术履历",
  ),
  irisHistory: source(
    "中国科学院 · 虹膜识别技术发展史",
    "https://www.cas.cn/cm/202411/t20241118_5039789.shtml",
    "official",
    "谭铁牛团队的虹膜识别研究、李马培养记录以及孙哲南师承",
  ),
  yuemingNju: source(
    "南京大学智能科学与技术学院 · 吕悦明",
    "https://is.nju.edu.cn/e4/62/c60611a713826/page.htm",
    "official",
    "现职、教育经历、研究方向与人才招聘",
  ),
  yuemingHome: source(
    "Yueming Lyu · Academic Homepage",
    "https://yueming-ai.top/",
    "profile",
    "中科院自动化所博士经历、谭铁牛与董晶共同指导、研究主题和公开招聘",
  ),
  qiCasia: source(
    "中国科学院自动化研究所 · 李祺",
    "https://ia.cas.cn/rcdw/qch/202404/t20240422_7129884.html",
    "official",
    "现职、研究方向、教育经历和团队角色",
  ),
  qiHome: source(
    "Qi Li · Academic Homepage",
    "https://liqi-casia.github.io/",
    "profile",
    "2016 年中科院自动化所博士及谭铁牛指导关系",
  ),
  weiCasia: source(
    "中国科学院自动化研究所 · 王威",
    "https://ia.cas.cn/rcdw/fyjy/202404/t20240422_7129893.html",
    "official",
    "现职、研究方向、教育经历与招生信息",
  ),
  weiHome: source(
    "Wei Wang · Academic Homepage",
    "https://wwaangg.github.io/",
    "profile",
    "2017 年中科院自动化所博士及谭铁牛指导关系",
  ),
};

type NewPerson = Omit<Person, "facts" | "lastVerifiedAt" | "introducedAt" | "portrait"> & {
  education: string;
  lineage: string;
  attention: string;
  portraitSource: Source;
};

const makePerson = (person: NewPerson): Person => {
  const { education, lineage, attention, portraitSource, ...base } = person;
  return {
    ...base,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait: {
      src: `portraits/tieniu-network/${base.id}.jpg`,
      alt: `${base.name} 公开学术头像`,
      source: portraitSource,
    },
    facts: [
      { label: "当前任职", value: base.role, source: base.sources[0] },
      { label: "研究主线", value: base.area, source: base.sources[0] },
      { label: "教育与学术训练", value: education, source: base.sources[1] },
      { label: "博士师承", value: lineage, source: base.sources[1] },
      { label: "为什么值得关注", value: attention, source: base.sources[0] },
    ],
  };
};

export const tieniuTanNetworkPeople: Person[] = [
  makePerson({
    id: "yueming-lyu-nju",
    name: "吕悦明",
    role: "准聘助理教授 · 特聘研究员 · 博士生导师",
    institution: "NJU",
    region: "Mainland China",
    area: "生成式模型 · 大模型与智能体 · 具身智能 · AI 安全",
    tags: ["生成式 AI", "大模型", "智能体", "具身智能", "AI 安全", "谭铁牛博士谱系", "招收学生"],
    summary: "南京大学新生代 AI PI，研究从生成式建模延伸到大模型智能体、具身智能与安全；博士阶段由谭铁牛、董晶共同指导。",
    stage: "emerging",
    category: "core",
    status: "current PI",
    primary: true,
    x: 1000,
    y: 910,
    sources: [sources.yuemingNju, sources.yuemingHome],
    education: "2024 年获中国科学院自动化研究所模式识别与智能系统博士学位。",
    lineage: "博士阶段由谭铁牛与董晶共同指导。",
    attention: "把 CASIA 的视觉与生成建模训练延伸到南京大学的大模型、智能体和具身智能研究，并公开招收博士生、硕士生和研究助理。",
    portraitSource: sources.yuemingHome,
  }),
  makePerson({
    id: "qi-li-casia",
    name: "李祺",
    role: "研究员 · 博士生导师",
    institution: "CAS-IA",
    region: "Mainland China",
    area: "计算机视觉 · 机器学习 · 人脸识别 · 多模态智能系统",
    tags: ["计算机视觉", "机器学习", "人脸识别", "多模态", "谭铁牛博士谱系"],
    summary: "中科院自动化所多模态人工智能系统研究团队 PI，长期研究视觉识别与机器学习，是谭铁牛培养网络在 CASIA 的现任学术节点。",
    stage: "senior",
    category: "core",
    status: "current PI",
    primary: true,
    x: 610,
    y: 835,
    sources: [sources.qiCasia, sources.qiHome],
    education: "2016 年获中国科学院大学／中国科学院自动化研究所博士学位。",
    lineage: "个人学术主页明确写明博士导师为谭铁牛。",
    attention: "连接生物特征识别、通用视觉表征与多模态系统，也是谭铁牛—CASIA 视觉学术谱系的现任博士生导师。",
    portraitSource: sources.qiCasia,
  }),
  makePerson({
    id: "wei-wang-casia",
    name: "王威",
    role: "副研究员 · 硕士生导师",
    institution: "CAS-IA",
    region: "Mainland China",
    area: "人工智能安全 · 多媒体内容安全 · 深度伪造检测",
    tags: ["AI 安全", "多媒体内容安全", "深度伪造", "计算机视觉", "谭铁牛博士谱系"],
    summary: "中科院自动化所人工智能安全与多媒体内容安全研究者，聚焦深度伪造检测与可信内容分析；博士阶段由谭铁牛指导。",
    stage: "emerging",
    category: "core",
    status: "current PI",
    primary: true,
    x: 665,
    y: 835,
    sources: [sources.weiCasia, sources.weiHome],
    education: "2012–2017 年在中国科学院自动化研究所攻读博士。",
    lineage: "个人学术主页明确写明博士导师为谭铁牛。",
    attention: "把谭铁牛团队长期积累的视觉感知与内容安全研究推进到深度伪造和生成式 AI 安全问题。",
    portraitSource: sources.weiCasia,
  }),
];

export const tieniuTanNetworkPersonEnhancements: Record<string, Partial<Person>> = {
  "tieniu-tan-cas": {
    role: "中国科学院院士 · 南京大学党委书记 · CASIA 智能感知与计算研究中心主任",
    summary: "中国计算机视觉、模式识别与生物特征识别领域的奠基型带头人之一；从英国学术训练回到中科院自动化所建立研究与人才培养体系，公开可核验的博士谱系已延伸至 CASIA、南京大学等学术节点。",
    tags: ["中国科学院院士", "模式识别", "计算机视觉", "生物特征识别", "虹膜识别", "图像视频理解", "人才培养", "学术领导"],
    facts: [
      { label: "当前任职", value: "南京大学党委书记；中国科学院自动化研究所智能感知与计算研究中心主任、研究员；自动化所学术委员会主任。", source: sources.tanProfile },
      { label: "教育与国际经历", value: "1984 年获西安交通大学学士，1986、1989 年获伦敦帝国理工学院硕士和博士；1989–1997 年在英国雷丁大学任教，1998 年回到中国科学院自动化研究所。", source: sources.tanProfile },
      { label: "研究主线", value: "图像处理、计算机视觉和模式识别，长期聚焦生物特征识别、图像视频理解与信息内容安全。", source: sources.tanProfile },
      { label: "学术与公共领导", value: "曾任中国科学院自动化研究所所长、中国科学院副秘书长和副院长，并长期承担国家级人工智能与模式识别学术组织工作。", source: sources.tanProfile },
      { label: "代表性荣誉", value: "2013 年当选中国科学院院士；此后当选英国皇家工程院外籍院士、发展中国家科学院院士和巴西科学院通讯院士，并获 2022 年 King-Sun Fu Prize。", source: sources.tanAcademician },
      { label: "领域建设", value: "在生物特征识别、视频监控与内容安全方向形成持续研究体系，并推动国内虹膜识别从早期算法研究走向团队化发展。", source: sources.irisHistory },
      { label: "人才培养", value: "已核验博士学生包括孙哲南、王亮、李祺、王威和吕悦明；中科院院史另明确记载李马是其培养的国内首位虹膜识别博士。", source: sources.irisHistory },
      { label: "为什么值得关注", value: "他的影响力不只来自院士与管理职务，更来自一条覆盖视觉、生物识别、内容安全、生成式模型和智能体研究的跨代培养网络。", source: sources.tanProfile },
    ],
    sources: [sources.tanProfile, sources.tanCommittee, sources.tanAcademician, sources.irisHistory],
    lastVerifiedAt: checkedAt,
  },
};

const lineage = (id: string, to: string, proof: Source, evidence: string, endYear: number): Relationship => ({
  id,
  from: "tieniu-tan-cas",
  to,
  type: "lineage",
  subtype: "phd_adviser",
  label: "博士导师",
  evidence,
  evidenceObject: "个人学术主页 / 学校或研究所官方履历",
  source: proof,
  verified: true,
  endYear,
});

export const tieniuTanNetworkRelationships: Relationship[] = [
  lineage("tan-yueming-lyu-phd", "yueming-lyu-nju", sources.yuemingHome, "吕悦明个人主页明确写明其中科院自动化所博士阶段由谭铁牛与董晶共同指导。", 2024),
  lineage("tan-qi-li-phd", "qi-li-casia", sources.qiHome, "李祺个人主页明确写明其博士导师为谭铁牛。", 2016),
  lineage("tan-wei-wang-phd", "wei-wang-casia", sources.weiHome, "王威个人主页明确写明其博士导师为谭铁牛。", 2017),
];

export const tieniuTanNetworkPlacements: StudentPlacement[] = [
  {
    id: "tan-yueming-lyu-nju-placement", student: "吕悦明", teacherId: "tieniu-tan-cas", company: "南京大学", role: "准聘助理教授 · 特聘研究员 · 博士生导师", kind: "current", sector: "academia", degree: "PhD", graduationYear: 2024, currentRole: "南京大学智能科学与技术学院准聘助理教授", source: sources.yuemingNju, verifiedAt: checkedAt,
  },
  {
    id: "tan-qi-li-casia-placement", student: "李祺", teacherId: "tieniu-tan-cas", company: "中国科学院自动化研究所", role: "研究员 · 博士生导师", kind: "current", sector: "academia", degree: "PhD", graduationYear: 2016, currentRole: "中国科学院自动化研究所研究员", source: sources.qiCasia, verifiedAt: checkedAt,
  },
  {
    id: "tan-wei-wang-casia-placement", student: "王威", teacherId: "tieniu-tan-cas", company: "中国科学院自动化研究所", role: "副研究员 · 硕士生导师", kind: "current", sector: "academia", degree: "PhD", graduationYear: 2017, currentRole: "中国科学院自动化研究所副研究员", source: sources.weiCasia, verifiedAt: checkedAt,
  },
];

export const tieniuTanNetworkPortraits: Record<string, NonNullable<Person["portrait"]>> = Object.fromEntries(
  tieniuTanNetworkPeople.map((person) => [person.id, person.portrait!]),
);
