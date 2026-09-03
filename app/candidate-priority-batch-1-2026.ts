import type { Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  feng: source(
    "清华大学计算机系 · 冯建华",
    "https://www.cs.tsinghua.edu.cn/info/1111/3490.htm",
    "official",
    "现任教授、教育背景、研究方向与官方头像",
  ),
  liGuoliangAdviser: source(
    "清华大学博士学位论文名录",
    "https://www.tsinghua.edu.cn/jxjywj/fj3-5lnrxxgyxbsxxbsxwlwmd.pdf",
    "official",
    "李国良博士论文及导师冯建华",
  ),
  shen: source(
    "南开大学大数据技术研究所 · 沈玮",
    "https://bigdata.nankai.edu.cn/shenw/list.htm",
    "official",
    "现任副教授、博士生导师、研究方向、清华博士经历与官方头像",
  ),
  wangGroup: source(
    "清华大学王建勇课题组 · 成员与校友",
    "https://dbgroup.cs.tsinghua.edu.cn/wangjy/ResearchGroup.html",
    "profile",
    "Former members 中列沈玮为 2014 年博士毕业生",
  ),
  chawla: source(
    "University of Notre Dame CSE · Nitesh Chawla",
    "https://cse.nd.edu/faculty/nitesh-chawla/",
    "official",
    "现任教授与研究领导职务、研究方向、教育背景和官方头像",
  ),
  dongThesis: source(
    "University of Notre Dame · Yuxiao Dong doctoral dissertation",
    "https://keg.cs.tsinghua.edu.cn/yuxiao/papers/Dong-dissertation-2017.pdf",
    "thesis",
    "论文扉页明确列 Nitesh V. Chawla 为 dissertation director",
  ),
  yi: source(
    "上海交通大学计算机学院 · 易冉",
    "https://www.cs.sjtu.edu.cn/jiaoshiml/yiran.html",
    "official",
    "现任长聘教轨副教授、研究方向、教育与工作履历、招生信息和官方头像",
  ),
  liuYongjinGroup: source(
    "清华大学刘永进个人主页",
    "https://cg.cs.tsinghua.edu.cn/people/~Yongjin/Yongjin.htm",
    "profile",
    "明确写明刘永进指导易冉博士论文",
  ),
  yao: source(
    "NYU Tandon · Yao Wang",
    "https://engineering.nyu.edu/faculty/yao-wang",
    "official",
    "现任教授、教育背景、视频与视觉研究方向和官方头像",
  ),
  yaoLab: source(
    "NYU Video Lab · People",
    "https://wp.nyu.edu/videolab/people/",
    "profile",
    "实验室校友名录列 Wenwu Zhu 为 1996 年博士并任教清华",
  ),
  jingrui: source(
    "University of Illinois School of Information Sciences · Jingrui He",
    "https://ischool.illinois.edu/people/jingrui-he",
    "official",
    "现任教授、机器学习研究方向、教育背景与官方头像",
  ),
  jingruiCv: source(
    "Jingrui He · Illinois-hosted CV",
    "https://ischool.illinois.edu/sites/default/files/documents/cv_He_07262019.pdf",
    "cv",
    "清华模式识别硕士阶段导师为 Changshui Zhang 与 Nanyuan Zhao",
  ),
  tingting: source(
    "北京大学基础医学院 · 李婷婷",
    "https://sbms.bjmu.edu.cn/jsdw/bssds/Tingting_Li.html",
    "official",
    "现任教授、清华自动化博士经历、计算生物学研究与官方头像",
  ),
  xuegongLab: source(
    "清华大学 Xuegong Lab · People",
    "https://xglab.tech/member/People.html",
    "profile",
    "往届博士生名录列 Tingting Li / 李婷婷",
  ),
  ziwei: source(
    "NTU Centre for System Intelligence and Efficiency · Ziwei Wang",
    "https://www.ntu.edu.sg/csie/faculty-directory",
    "official",
    "现任助理教授、研究方向、博士后经历与官方头像",
  ),
  ziweiLab: source(
    "PINE Lab · Ziwei Wang",
    "https://nextrobotlab.github.io/team.html",
    "profile",
    "本人简介明确写明清华博士导师为 Jiwen Lu",
  ),
  liang: source(
    "南京大学智能科学与技术学院 · 安亮",
    "https://njusz.nju.edu.cn/d9/30/c53017a842032/page.htm",
    "official",
    "现任准聘助理教授、清华博士及博士后经历、研究方向与官方头像",
  ),
  liangHome: source(
    "Liang An · Homepage",
    "https://anl13.github.io/",
    "profile",
    "本人简介明确写明博士导师为 Yebin Liu",
  ),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, sourceValue: Source) => ({
  label,
  value,
  source: sourceValue,
});

type PersonSeed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & {
  portraitFile: string;
  portraitSource: Source;
};

const person = (seed: PersonSeed): Person => ({
  ...seed,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-priority-batch-1-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityBatch1People2026: Person[] = [
  person({
    id: "jianhua-feng-thu-2026", name: "冯建华", role: "教授 · 博士生导师", institution: "THU", region: "Mainland China",
    area: "Database Systems · Data Security · Information Retrieval", tags: ["数据库", "数据安全", "信息检索", "数据管理"],
    stage: "senior", x: 120, y: 120, portraitFile: "feng-jianhua.jpg", portraitSource: sources.feng,
    summary: "清华计算机系数据库资深教授，研究覆盖数据库系统、数据安全与信息检索；博士培养链连接李国良等现任 PI。",
    facts: [
      fact("当前任职", "清华大学计算机科学与技术系教授、博士生导师。", sources.feng),
      fact("教育与学术训练", "清华大学计算机科学与技术学士、硕士、博士。", sources.feng),
      fact("研究主线", "数据库管理系统、数据安全与隐私保护、信息检索。", sources.feng),
      fact("人才培养", "清华博士学位论文名录将冯建华列为李国良博士论文导师。", sources.liGuoliangAdviser),
    ],
    sources: [sources.feng, sources.liGuoliangAdviser],
  }),
  person({
    id: "wei-shen-nankai-2026", name: "沈玮", role: "副教授 · 博士生导师", institution: "Nankai", region: "Mainland China",
    area: "Knowledge Graphs · Data Integration · Entity Linking", tags: ["知识图谱", "知识融合", "数据集成", "实体链接"],
    stage: "emerging", x: 280, y: 120, portraitFile: "wei-shen.jpg", portraitSource: sources.shen,
    summary: "南开大学知识图谱与数据融合 PI，清华博士阶段进入王建勇培养体系，研究连接数据库、数据挖掘与 NLP。",
    facts: [
      fact("当前任职", "南开大学副教授、博士生导师。", sources.shen),
      fact("教育与学术训练", "2014 年获清华大学计算机系博士学位。", sources.shen),
      fact("研究主线", "知识图谱、知识融合、数据集成与实体链接。", sources.shen),
      fact("招生信息", "官方主页明确欢迎数据挖掘、AI、NLP 和知识图谱方向的博士、硕士申请。", sources.shen),
    ],
    sources: [sources.shen, sources.wangGroup],
  }),
  person({
    id: "nitesh-chawla-notre-dame-2026", name: "Nitesh V. Chawla", role: "Frank M. Freimann Professor · Institute Director", institution: "Award Network", actualInstitution: "University of Notre Dame", region: "United States",
    area: "Artificial Intelligence · Data Science · Network Science", tags: ["AI", "Data Science", "Network Science", "Notre Dame"],
    stage: "senior", x: 440, y: 120, portraitFile: "nitesh-chawla.jpg", portraitSource: sources.chawla,
    summary: "Notre Dame 数据科学与网络科学资深带头人，领导校级数据与 AI 研究；博士培养链连接董宇啸。",
    facts: [
      fact("当前任职", "Notre Dame Frank M. Freimann Professor，并领导 Data, AI, and Computing Initiative 与 Lucy Family Institute。", sources.chawla),
      fact("教育与学术训练", "2002 年获 University of South Florida 计算机科学与工程博士。", sources.chawla),
      fact("研究主线", "人工智能、数据科学、网络科学及其跨学科社会应用。", sources.chawla),
      fact("人才培养", "董宇啸博士论文扉页明确列 Nitesh V. Chawla 为 dissertation director。", sources.dongThesis),
    ],
    sources: [sources.chawla, sources.dongThesis],
  }),
  person({
    id: "ran-yi-sjtu-2026", name: "易冉", role: "长聘教轨副教授 · 博士生导师", institution: "SJTU", region: "Mainland China",
    area: "Computer Graphics · Generative AI · 3D Generation", tags: ["计算机图形学", "生成式 AI", "视频生成", "3DGS"],
    stage: "emerging", x: 600, y: 120, portraitFile: "yi-ran.jpg", portraitSource: sources.yi,
    summary: "上海交通大学生成式视觉与图形学 PI，研究视频与三维生成、世界模型和 3DGS；博士师承刘永进。",
    facts: [
      fact("当前任职", "上海交通大学计算机学院长聘教轨副教授、博士生导师。", sources.yi),
      fact("教育与学术训练", "清华大学电子信息科学与技术学士、计算机科学与技术博士。", sources.yi),
      fact("研究主线", "视频生成、3D 生成、世界模型与基于 3DGS 的三维重建。", sources.yi),
      fact("招生信息", "官方主页公开招收 2027 年入学博士生、硕士生。", sources.yi),
    ],
    sources: [sources.yi, sources.liuYongjinGroup],
  }),
  person({
    id: "yao-wang-nyu-2026", name: "Yao Wang", chinese: "王瑶", role: "Professor", institution: "NYU", region: "United States",
    area: "Video Processing · Computer Vision · Medical Imaging", tags: ["Video", "Computer Vision", "Medical Imaging", "NYU Video Lab"],
    stage: "senior", x: 760, y: 120, portraitFile: "yao-wang.jpg", portraitSource: sources.yao,
    summary: "NYU 视频处理、计算机视觉和医学影像资深教授，Video Lab 公开校友名录连接朱文武及多位产业与学术界校友。",
    facts: [
      fact("当前任职", "NYU Tandon 电气与计算机工程、生物医学工程教授。", sources.yao),
      fact("教育与学术训练", "清华大学学士、硕士，UC Santa Barbara 电气与计算机工程博士。", sources.yao),
      fact("研究主线", "视频处理与通信、计算机视觉、医学影像和机器学习。", sources.yao),
      fact("人才培养", "NYU Video Lab 校友名录列 Wenwu Zhu 为 1996 年博士，现任清华教授。", sources.yaoLab),
    ],
    sources: [sources.yao, sources.yaoLab],
  }),
  person({
    id: "jingrui-he-uiuc-2026", name: "Jingrui He", chinese: "何静睿", role: "Professor", institution: "UIUC", region: "United States",
    area: "Heterogeneous Machine Learning · Active Learning · Neural Bandits", tags: ["机器学习", "图学习", "主动学习", "数据挖掘"],
    stage: "senior", x: 920, y: 120, portraitFile: "jingrui-he.jpg", portraitSource: sources.jingrui,
    summary: "UIUC 异构机器学习与数据挖掘教授，研究主动学习、自监督学习和神经 bandit；清华硕士阶段师承张长水、赵南元。",
    facts: [
      fact("当前任职", "University of Illinois School of Information Sciences 教授，并兼任 Siebel School 等单位 faculty affiliate。", sources.jingrui),
      fact("教育与学术训练", "清华大学自动化学士、模式识别硕士；2010 年获 CMU Machine Learning 博士。", sources.jingruiCv),
      fact("研究主线", "异构机器学习、主动学习、神经 bandit 与自监督学习。", sources.jingrui),
      fact("硕士师承", "CV 明确列清华硕士导师为 Changshui Zhang 与 Nanyuan Zhao。", sources.jingruiCv),
    ],
    sources: [sources.jingrui, sources.jingruiCv],
  }),
  person({
    id: "tingting-li-pku-2026", name: "李婷婷", role: "博雅特聘教授 · 长聘正教授", institution: "PKU", region: "Mainland China",
    area: "Bioinformatics · Computational Biology · AI for Biomedicine", tags: ["生物信息学", "计算生物学", "AI for Science", "生物医学 AI"],
    stage: "senior", x: 1080, y: 120, portraitFile: "tingting-li.jpg", portraitSource: sources.tingting,
    summary: "北京大学计算生物学与生物信息学教授，清华自动化博士阶段进入张学工培养体系，连接 AI 与生命科学。",
    facts: [
      fact("当前任职", "北京大学基础医学院博雅特聘教授、长聘正教授。", sources.tingting),
      fact("教育与学术训练", "2009 年获清华大学自动化系博士学位。", sources.tingting),
      fact("研究主线", "生物信息学、计算生物学与生物医学数据驱动研究。", sources.tingting),
      fact("博士师承", "Xuegong Lab 往届博士生名录列 Tingting Li / 李婷婷。", sources.xuegongLab),
    ],
    sources: [sources.tingting, sources.xuegongLab],
  }),
  person({
    id: "ziwei-wang-ntu-2026", name: "Ziwei Wang", chinese: "王子威", role: "Assistant Professor · PINE Lab Director", institution: "NTU", region: "Singapore",
    area: "Computer Vision · Machine Learning · Robotics", tags: ["Computer Vision", "Robotics", "Embodied AI", "PINE Lab"],
    stage: "emerging", x: 1240, y: 120, portraitFile: "ziwei-wang.jpg", portraitSource: sources.ziwei,
    summary: "NTU 视觉、机器学习与机器人助理教授，领导 PINE Lab；清华博士师承鲁继文，并有 CMU Robotics 博士后经历。",
    facts: [
      fact("当前任职", "NTU School of Electrical and Electronic Engineering 助理教授、PINE Lab 主任。", sources.ziwei),
      fact("教育与学术训练", "清华大学学士、自动化系博士；随后在 CMU Robotics Institute 从事博士后研究。", sources.ziweiLab),
      fact("研究主线", "计算机视觉、机器学习、机器人与具身感知。", sources.ziwei),
      fact("博士师承", "本人实验室主页明确写明清华博士导师为 Jiwen Lu。", sources.ziweiLab),
    ],
    sources: [sources.ziwei, sources.ziweiLab],
  }),
  person({
    id: "liang-an-nju-2026", name: "安亮", role: "准聘助理教授 · 特聘研究员", institution: "NJU", region: "Mainland China",
    area: "3D Vision · AI for Science · Computational Ethology", tags: ["三维视觉", "AI for Science", "计算行为学", "具身智能"],
    stage: "emerging", x: 1400, y: 120, portraitFile: "liang-an.jpg", portraitSource: sources.liang,
    summary: "南京大学三维视觉与 AI for Science 青年 PI，研究具身三维视觉和计算行为学；清华博士师承刘烨斌。",
    facts: [
      fact("当前任职", "南京大学智能科学与技术学院准聘助理教授、特聘研究员。", sources.liang),
      fact("教育与学术训练", "清华大学学士、博士，并在清华自动化系完成水木学者博士后研究。", sources.liang),
      fact("研究主线", "三维视觉、AI for Science 与计算行为学。", sources.liang),
      fact("博士师承", "本人主页明确写明清华博士导师为 Yebin Liu。", sources.liangHome),
    ],
    sources: [sources.liang, sources.liangHome],
  }),
];

export const candidatePriorityBatch1Relationships2026: Relationship[] = [
  { id: "candidate-b1-feng-li-guoliang", from: "jianhua-feng-thu-2026", to: "guoliang-li-thu", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "清华大学博士学位论文名录列李国良博士论文导师为冯建华。", source: sources.liGuoliangAdviser, verified: true },
  { id: "candidate-b1-wang-shen", from: "jianyong-wang-thu", to: "wei-shen-nankai-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "王建勇课题组 Former members 将沈玮列为 2014 年博士毕业生。", source: sources.wangGroup, verified: true },
  { id: "candidate-b1-chawla-dong", from: "nitesh-chawla-notre-dame-2026", to: "yuxiao-dong-thu", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "董宇啸博士论文扉页明确列 Nitesh V. Chawla 为 dissertation director。", source: sources.dongThesis, verified: true },
  { id: "candidate-b1-liu-yi", from: "yongjin-liu-thu", to: "ran-yi-sjtu-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "刘永进个人主页明确写明其指导易冉博士论文。", source: sources.liuYongjinGroup, verified: true },
  { id: "candidate-b1-yao-zhu", from: "yao-wang-nyu-2026", to: "wenwu-zhu-thu", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "NYU Video Lab 校友名录列 Wenwu Zhu 为 1996 年博士校友。", source: sources.yaoLab, verified: true },
  { id: "candidate-b1-zhang-he", from: "changshui-zhang-thu", to: "jingrui-he-uiuc-2026", type: "lineage", subtype: "master_adviser", label: "硕士导师", evidence: "Jingrui He 的 Illinois-hosted CV 明确列清华硕士导师为 Changshui Zhang 与 Nanyuan Zhao。", source: sources.jingruiCv, verified: true },
  { id: "candidate-b1-zhang-li", from: "xuegong-zhang-thu", to: "tingting-li-pku-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Xuegong Lab 往届博士生名录列 Tingting Li / 李婷婷。", source: sources.xuegongLab, verified: true },
  { id: "candidate-b1-lu-wang", from: "jiwen-lu-thu", to: "ziwei-wang-ntu-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Ziwei Wang 的实验室主页明确写明其清华博士导师为 Jiwen Lu。", source: sources.ziweiLab, verified: true },
  { id: "candidate-b1-liu-an", from: "yebin-liu-thu", to: "liang-an-nju-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "安亮本人主页明确写明其清华博士导师为 Yebin Liu。", source: sources.liangHome, verified: true },
];

const placement = (
  id: string,
  student: string,
  teacherId: string,
  company: string,
  role: string,
  sourceValue: Source,
): StudentPlacement => ({
  id,
  student,
  teacherId,
  company,
  role,
  kind: "current",
  degree: "PhD",
  sector: "academia",
  source: sourceValue,
  verifiedAt: checkedAt,
});

export const candidatePriorityBatch1Placements2026: StudentPlacement[] = [
  placement("candidate-b1-placement-li", "李国良", "jianhua-feng-thu-2026", "清华大学", "长聘教授", sources.liGuoliangAdviser),
  placement("candidate-b1-placement-shen", "沈玮", "jianyong-wang-thu", "南开大学", "副教授 · 博士生导师", sources.wangGroup),
  placement("candidate-b1-placement-dong", "董宇啸", "nitesh-chawla-notre-dame-2026", "清华大学", "副教授", sources.dongThesis),
  placement("candidate-b1-placement-yi", "易冉", "yongjin-liu-thu", "上海交通大学", "长聘教轨副教授 · 博士生导师", sources.liuYongjinGroup),
  placement("candidate-b1-placement-zhu", "朱文武", "yao-wang-nyu-2026", "清华大学", "教授", sources.yaoLab),
  placement("candidate-b1-placement-he", "Jingrui He", "changshui-zhang-thu", "University of Illinois", "Professor", sources.jingruiCv),
  placement("candidate-b1-placement-tingting", "李婷婷", "xuegong-zhang-thu", "北京大学", "博雅特聘教授 · 长聘正教授", sources.xuegongLab),
  placement("candidate-b1-placement-ziwei", "Ziwei Wang", "jiwen-lu-thu", "Nanyang Technological University", "Assistant Professor", sources.ziweiLab),
  placement("candidate-b1-placement-an", "安亮", "yebin-liu-thu", "南京大学", "准聘助理教授 · 特聘研究员", sources.liangHome),
];
