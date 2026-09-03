import type { Person, Source } from "./data";

const checkedAt = "2026-09-03";

const source = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const sources = {
  aaronCs: source("Stanford CS · Aaron Sidford", "https://www.cs.stanford.edu/people/aaron-sidford", "现任副教授身份、联合院系任职与官方肖像"),
  aaronMsande: source("Stanford MS&E · Faculty spotlight", "https://msande.stanford.edu/research-impact/stories-voices/faculty/faculty-spotlight-aaron-sidford", "优化、算法设计与大规模数据计算研究方向"),
  kunleProfile: source("Stanford Profiles · Kunle Olukotun", "https://profiles.stanford.edu/kunle-olukotun", "现任讲席教授身份、任职、荣誉、实验室与创业经历"),
  kunleHai: source("Stanford HAI · Kunle Olukotun", "https://hai.stanford.edu/people/kunle-olukotun", "HAI faculty affiliate 与 Stanford 教授身份"),
  fredoCsail: source("MIT CSAIL · Fredo Durand", "https://www.csail.mit.edu/person/fredo-durand", "现任 PI 身份、研究方向、学术训练、研究组与官方肖像"),
  fredoEecs: source("MIT EECS · Frederic Durand", "https://www.eecs.mit.edu/people/fredo-durand/", "Amar Bose Professor 与 Graphics and Vision 研究方向"),
  jufuPku: source("北京大学人工智能研究院 · 封举富", "https://www.ai.pku.edu.cn/info/1152/2842.htm", "北京大学教授身份与模式识别、机器学习、图像处理、生物特征识别研究方向"),
  yangZju: source("浙江大学个人主页 · 杨洋", "https://person.zju.edu.cn/yangy", "现任教授、博士生导师、人工智能系主任、研究方向与官方肖像"),
  yangHome: {
    label: "杨洋个人主页",
    url: "https://yangy.org/",
    kind: "profile",
    checkedAt,
    supports: "浙江大学教授与副院长身份、博士训练和导师、学生名录及公开职业去向",
  } satisfies Source,
};

export const candidatePriorityExistingMatchEnhancements2026: Record<string, Partial<Person>> = {
  "jufu-feng-pku": {
    primary: true,
    category: "core",
    status: "current PI",
    tags: ["模式识别", "机器学习", "图像处理", "生物特征识别"],
    facts: [
      { label: "当前任职", value: "北京大学教授，研究方向覆盖模式识别与机器学习、图像处理和生物特征识别。", source: sources.jufuPku },
    ],
    sources: [sources.jufuPku],
    lastVerifiedAt: checkedAt,
  },
  "aaron-sidford-lineage": {
    role: "Associate Professor of Management Science and Engineering and of Computer Science",
    primary: true,
    category: "core",
    status: "current PI",
    tags: ["Optimization", "Algorithms", "Graph Algorithms", "Large-scale Data"],
    summary: "Stanford CS 与 MS&E 副教授，研究优化与算法设计，关注面向大规模数据的可证明高效方法。",
    facts: [
      { label: "当前任职", value: "Stanford Management Science and Engineering 与 Computer Science 副教授。", source: sources.aaronCs },
      { label: "研究主线", value: "优化、算法设计、图算法、数值线性代数与数据结构。", source: sources.aaronMsande },
      { label: "为什么值得关注", value: "其工作连接理论优化、图算法与现代大规模数据计算，并形成可追溯的 Stanford 导师网络。", source: sources.aaronMsande },
    ],
    sources: [sources.aaronCs, sources.aaronMsande],
    portrait: { src: "portraits/candidate-p0-existing-2026/aaron-sidford.jpg", alt: "Aaron Sidford", source: sources.aaronCs },
    lastVerifiedAt: checkedAt,
  },
  "kunle-olukotun-lineage": {
    role: "Cadence Design Professor of Electrical Engineering and Computer Science",
    primary: true,
    category: "core",
    status: "current PI",
    tags: ["ML Systems", "Computer Architecture", "Parallel Computing", "SambaNova"],
    summary: "Stanford EE/CS 讲席教授、Pervasive Parallel Lab 主任；多核处理器先驱，并共同创办 SambaNova Systems。",
    facts: [
      { label: "当前任职", value: "Stanford Cadence Design Professor，兼任 Electrical Engineering 与 Computer Science 教授。", source: sources.kunleProfile },
      { label: "研究与组织", value: "领导 Pervasive Parallel Lab，并参与 DAWN Lab，研究并行计算与可用机器学习基础设施。", source: sources.kunleProfile },
      { label: "产业连接", value: "共同创办 SambaNova Systems 并任 Chief Technologist；此前创办的 Afara Websystems 被 Sun Microsystems 收购。", source: sources.kunleProfile },
      { label: "为什么值得关注", value: "连接计算机体系结构、机器学习系统、顶尖学术人才培养与 AI 芯片创业生态。", source: sources.kunleHai },
    ],
    sources: [sources.kunleProfile, sources.kunleHai],
    portrait: { src: "portraits/candidate-p0-existing-2026/kunle-olukotun.jpg", alt: "Kunle Olukotun", source: sources.kunleProfile },
    lastVerifiedAt: checkedAt,
  },
  "fredo-durand-lineage": {
    role: "Amar Bose Professor of Computing · MIT EECS / CSAIL",
    primary: true,
    category: "core",
    status: "current PI",
    tags: ["Computer Graphics", "Computational Photography", "Differentiable Rendering", "Vision"],
    summary: "MIT EECS / CSAIL 教授与 Computer Graphics Group PI，研究计算机图形学、计算摄影、成像与可微渲染。",
    facts: [
      { label: "当前任职", value: "MIT Amar Bose Professor of Computing，任职于 EECS 并为 CSAIL PI。", source: sources.fredoCsail },
      { label: "研究主线", value: "图像生成、计算摄影、实时与非真实感渲染，以及信号处理和感知驱动的视觉计算。", source: sources.fredoCsail },
      { label: "教育与师承", value: "1999 年获 Grenoble University 博士学位，与 Claude Puech、George Drettakis 开展三维可见性研究；之后在 MIT 跟随 Julie Dorsey 做博士后。", source: sources.fredoCsail },
      { label: "为什么值得关注", value: "其学生与合作者网络连接 MIT 图形学、计算摄影、编译系统及多个高校和产业研究团队。", source: sources.fredoEecs },
    ],
    sources: [sources.fredoCsail, sources.fredoEecs],
    portrait: { src: "portraits/candidate-p0-existing-2026/fredo-durand.jpg", alt: "Frédo Durand", source: sources.fredoCsail },
    lastVerifiedAt: checkedAt,
  },
  "yang-yang-tang-alumnus": {
    role: "教授 · 博士生导师 · 人工智能系主任",
    institution: "ZJU",
    primary: true,
    category: "core",
    status: "current PI",
    stage: "developing",
    area: "Graph Machine Learning · Data Mining · Time-series AI",
    tags: ["图机器学习", "数据挖掘", "时序智能", "社交网络", "唐杰博士谱系"],
    summary: "浙江大学人工智能学院教授、人工智能系主任；研究大规模图与时序数据上的人工智能，博士阶段由唐杰、李涓子指导。",
    facts: [
      { label: "当前任职", value: "浙江大学人工智能学院教授、博士生导师、人工智能系主任；个人主页另记载其担任副院长。", source: sources.yangZju },
      { label: "教育与学术训练", value: "2016 年获清华大学博士学位；曾在 Cornell University 与 KU Leuven 访问研究。", source: sources.yangHome },
      { label: "博士师承", value: "个人主页明确列博士导师为唐杰、李涓子，并将 Yizhou Sun 列为博士阶段研究导师。", source: sources.yangHome },
      { label: "研究主线", value: "面向大规模图和时序数据的数据挖掘、社交网络与机器学习。", source: sources.yangZju },
      { label: "学生与产业去向", value: "公开 Advising 名录记录学生进入华为、阿里巴巴、字节跳动、腾讯、网易、美团等机构，亦有学生继续在 Duke、UCLA、HKUST 等校攻读博士。", source: sources.yangHome },
    ],
    sources: [sources.yangZju, sources.yangHome],
    portrait: { src: "portraits/candidate-p0-existing-2026/yang-yang-zju.jpg", alt: "杨洋", source: sources.yangZju },
    lastVerifiedAt: checkedAt,
  },
};
