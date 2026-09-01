import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  liweiCv: source(
    "王立威个人主页 · Curriculum Vitae",
    "http://www.liweiwang-pku.com/cv/CV.pdf",
    "cv",
    "王立威的博士、硕士和本科学历；博士论文题目及石青云、封举富共同导师；硕士论文题目及王作英导师",
  ),
  liweiPku: source(
    "北京大学人工智能研究院 · 王立威",
    "https://www.ai.pku.edu.cn/info/1284/1642.htm",
    "official",
    "王立威的北京大学现任教授身份、研究方向与学术简介",
  ),
  shiPku: source(
    "北京大学校史馆 · 石青云",
    "https://www.xsg.pku.edu.cn/details/1586.html",
    "official",
    "石青云的北京大学教授、中国科学院院士身份，模式识别与图像数据库研究及人才培养经历",
  ),
  fengPku: source(
    "北京大学电子学院 · 封举富",
    "https://eecs.pku.edu.cn/xxkxjsxy/info/1461/9486.htm",
    "official",
    "封举富的北京大学教授身份、教育经历及模式识别、生物特征识别研究方向",
  ),
  fengPkuAi: source(
    "北京大学人工智能研究院 · Jufu Feng",
    "https://sai.pku.edu.cn/znxyenglish/info/1362/2639.htm",
    "official",
    "封举富在北京大学人工智能研究院的教师身份与研究领域",
  ),
  wangTsinghua: source(
    "清华大学 · 王作英：走在信息时代的前沿",
    "https://www.jiandang100.tsinghua.edu.cn/info/1014/6541.htm",
    "official",
    "王作英的清华大学电子工程系教授身份、汉语语音识别团队建设与研究贡献",
  ),
  wangLabLegacy: source(
    "清华大学电子工程系 · 语音和语言技术中心",
    "https://www.ee.tsinghua.edu.cn/info/1076/4480.htm",
    "official",
    "清华语音技术团队前身由王作英于 1987 年创建及其学术传承",
  ),
  pulkitBerkeley: source(
    "UC Berkeley EECS dissertation record · Pulkit Agrawal",
    "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2018/EECS-2018-133.html",
    "thesis",
    "Pulkit Agrawal 的博士论文记录明确列出 Jitendra Malik 为 Advisor",
  ),
  vincentMit: source(
    "MIT BCS · Vincent Sitzmann",
    "https://bcs.mit.edu/events/self-supervised-scene-representation-learning",
    "official",
    "MIT 官方讲座简介明确 Vincent Sitzmann 在 Stanford 博士阶段由 Gordon Wetzstein 指导",
  ),
};

const qingyunPortrait: NonNullable<Person["portrait"]> = {
  src: "portraits/top-school-advisers/qingyun-shi-pku.jpg",
  alt: "石青云",
  source: sources.shiPku,
};

const jufuPortrait: NonNullable<Person["portrait"]> = {
  src: "portraits/top-school-advisers/jufu-feng-pku.jpg",
  alt: "封举富",
  source: sources.fengPku,
};

export const topSchoolAdviserPeople: Person[] = [
  {
    id: "qingyun-shi-pku",
    name: "石青云",
    role: "北京大学教授 · 中国科学院院士（1936–2002）",
    institution: "PKU",
    region: "Mainland China",
    area: "Pattern Recognition · Image Databases · Biometrics",
    tags: ["模式识别", "图像数据库", "生物特征识别", "导师谱系"],
    summary: "中国模式识别与图像数据库研究的重要奠基者之一；王立威博士阶段的共同导师。",
    facts: [
      { label: "当前任职", value: "1936–2002；生前任北京大学教授、中国科学院院士。", source: sources.shiPku },
      { label: "研究主线", value: "模式识别、图像数据库与生物特征识别。", source: sources.shiPku },
      { label: "教育与学术训练", value: "北京大学官方校史资料记录其曾赴 Purdue University 深造并师从 King-Sun Fu。", source: sources.shiPku },
      { label: "人才培养", value: "北京大学校史馆记载其培养博士、硕士研究生五十余名。", source: sources.shiPku },
      { label: "为什么值得关注", value: "其培养网络连接北京大学早期模式识别传统与后来机器学习、计算机视觉 PI。", source: sources.shiPku },
    ],
    stage: "historical",
    category: "historical",
    status: "1936–2002",
    sources: [sources.shiPku, sources.liweiCv],
    x: 285,
    y: 70,
    primary: false,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait: qingyunPortrait,
  },
  {
    id: "jufu-feng-pku",
    name: "封举富",
    role: "北京大学教授 · 机器感知与智能教育部重点实验室",
    institution: "PKU",
    region: "Mainland China",
    area: "Pattern Recognition · Biometrics · Computer Vision",
    tags: ["模式识别", "生物特征识别", "计算机视觉", "导师谱系"],
    summary: "北京大学模式识别与生物特征识别资深学者；王立威博士阶段的共同导师。",
    facts: [
      { label: "当前任职", value: "北京大学教授，机器感知与智能教育部重点实验室学术成员。", source: sources.fengPku },
      { label: "研究主线", value: "模式识别、机器学习、图像分析与生物特征识别。", source: sources.fengPkuAi },
      { label: "教育与学术训练", value: "1989 年获北京大学学士学位，1997 年获北京大学博士学位。", source: sources.fengPku },
      { label: "人才培养", value: "王立威个人 CV 明确将封举富列为其北京大学博士论文共同导师。", source: sources.liweiCv },
      { label: "为什么值得关注", value: "其导师网络是北京大学早期模式识别传统与当代机器学习研究之间的重要连接。", source: sources.liweiCv },
    ],
    stage: "senior",
    category: "adjacent",
    status: "导师节点 · 任职以北京大学公开页为准",
    sources: [sources.fengPku, sources.fengPkuAi, sources.liweiCv],
    x: 390,
    y: 85,
    primary: false,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait: jufuPortrait,
  },
  {
    id: "zuoying-wang-thu",
    name: "王作英",
    role: "清华大学电子工程系教授 · 语音识别团队创建者",
    institution: "THU",
    region: "Mainland China",
    area: "Speech Recognition · Statistical Signal Processing",
    tags: ["语音识别", "信号处理", "导师谱系"],
    summary: "清华大学汉语语音识别研究的重要早期组织者；王立威硕士阶段导师。",
    facts: [
      { label: "任职与角色", value: "清华大学电子工程系教授，负责组建并领导早期汉语语音识别研究团队。", source: sources.wangTsinghua },
      { label: "研究主线", value: "汉语语音识别、隐马尔可夫模型与统计信号处理。", source: sources.wangTsinghua },
      { label: "学术共同体", value: "清华电子系官方资料将 1987 年由王作英创建的语音组列为现语音和语言技术中心的前身。", source: sources.wangLabLegacy },
      { label: "人才培养", value: "王立威个人 CV 明确将王作英列为其清华大学硕士论文导师。", source: sources.liweiCv },
      { label: "为什么值得关注", value: "其研究组连接中国早期汉语语音识别与后来语音、语言和机器学习人才网络。", source: sources.wangLabLegacy },
    ],
    stage: "historical",
    category: "historical",
    status: "导师节点",
    sources: [sources.wangTsinghua, sources.wangLabLegacy, sources.liweiCv],
    x: 550,
    y: 80,
    primary: false,
    lastVerifiedAt: checkedAt,
  },
];

export const topSchoolAdviserRelationships: Relationship[] = [
  {
    id: "top-school-shi-liwei-phd",
    from: "qingyun-shi-pku",
    to: "liwei-wang-pku-award",
    type: "lineage",
    subtype: "co_adviser",
    label: "共同博士导师",
    evidence: "王立威个人 CV 的博士学位条目明确列出 Supervisor: Prof. Qingyun Shi and Prof. Jufu Feng。",
    evidenceObject: "王立威博士学位与论文条目",
    source: sources.liweiCv,
    verified: true,
  },
  {
    id: "top-school-feng-liwei-phd",
    from: "jufu-feng-pku",
    to: "liwei-wang-pku-award",
    type: "lineage",
    subtype: "co_adviser",
    label: "共同博士导师",
    evidence: "王立威个人 CV 的博士学位条目明确列出 Supervisor: Prof. Qingyun Shi and Prof. Jufu Feng。",
    evidenceObject: "王立威博士学位与论文条目",
    source: sources.liweiCv,
    verified: true,
  },
  {
    id: "top-school-wang-liwei-master",
    from: "zuoying-wang-thu",
    to: "liwei-wang-pku-award",
    type: "lineage",
    subtype: "master_adviser",
    label: "硕士导师",
    evidence: "王立威个人 CV 的硕士学位条目明确列出 Supervisor: Prof Zuoying Wang。",
    evidenceObject: "王立威硕士学位与论文条目",
    source: sources.liweiCv,
    verified: true,
  },
  {
    id: "top-school-malik-pulkit-phd",
    from: "jitendra-malik-us",
    to: "pulkit-agrawal-us",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "UC Berkeley EECS 官方博士论文记录明确列出 Pulkit Agrawal 的 Advisor 为 Jitendra Malik。",
    evidenceObject: "UC Berkeley 博士论文记录",
    source: sources.pulkitBerkeley,
    verified: true,
  },
  {
    id: "top-school-wetzstein-sitzmann-phd",
    from: "gordon-wetzstein-stanford",
    to: "vincent-sitzmann-mit-award",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "MIT BCS 官方简介明确写明 Vincent Sitzmann 在 Stanford 博士阶段由 Gordon Wetzstein 指导。",
    evidenceObject: "MIT BCS 人物与讲座简介",
    source: sources.vincentMit,
    verified: true,
  },
];

export const topSchoolAdviserPersonEnhancements: Record<string, Partial<Person>> = {
  "liwei-wang-pku-award": {
    facts: [
      { label: "博士导师", value: "北京大学应用数学博士；石青云与封举富共同指导。", source: sources.liweiCv },
      { label: "硕士导师", value: "清华大学电子工程硕士；王作英指导。", source: sources.liweiCv },
      { label: "教育轨迹", value: "清华大学电子工程学士、硕士，北京大学应用数学博士。", source: sources.liweiCv },
    ],
    sources: [sources.liweiCv, sources.liweiPku],
    lastVerifiedAt: checkedAt,
  },
  "pulkit-agrawal-us": {
    facts: [{ label: "博士导师", value: "UC Berkeley 博士论文记录明确列出 Jitendra Malik。", source: sources.pulkitBerkeley }],
    sources: [sources.pulkitBerkeley],
    lastVerifiedAt: checkedAt,
  },
  "vincent-sitzmann-mit-award": {
    facts: [{ label: "博士导师", value: "Stanford 博士阶段由 Gordon Wetzstein 指导。", source: sources.vincentMit }],
    sources: [sources.vincentMit],
    lastVerifiedAt: checkedAt,
  },
};

export const topSchoolAdviserPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "qingyun-shi-pku": qingyunPortrait,
  "jufu-feng-pku": jufuPortrait,
};
