import type { Person, Region, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

export type AcademicCommunity = {
  id: string;
  name: string;
  kicker: string;
  kind: "lab_network" | "advisor_lineage";
  roots: string;
  anchor: string;
  description: string;
  color: "cobalt" | "lime" | "coral" | "violet";
  regions: Region[];
  memberIds: string[];
  branches: { label: string; memberIds?: string[]; names?: string[] }[];
  sources: Source[];
};

const mmlabPeople = official(
  "CUHK MMLab · multi-campus people",
  "https://mmlab.ie.cuhk.edu.hk/people.html",
  "Founding director and current CUHK, NTU, HKU, HKUST, SIAT, SJTU and Tsinghua branches",
);
const mmlabAlumni = official(
  "CUHK MMLab · alumni",
  "https://mmlab.ie.cuhk.edu.hk/alumni.html",
  "Named alumni, advisers and later academic or industry destinations",
);
const lyuProfile = official(
  "Michael R. Lyu · CUHK homepage",
  "https://www.cse.cuhk.edu.hk/lyu/",
  "Current title, research programme and academic profile",
);
const lyuStudents = official(
  "Michael R. Lyu · PhD students",
  "https://www.cse.cuhk.edu.hk/lyu/students/phd",
  "Current and 66 graduated PhD students, with named current destinations",
);
const nusNlp = official(
  "NUS NLP Group · people and alumni",
  "https://www.comp.nus.edu.sg/~nlp/people.html",
  "Faculty, doctoral alumni and destinations including Wei Lu",
);
const lamdaPeople = official(
  "Nanjing University LAMDA · people",
  "https://www.lamda.nju.edu.cn/People.ashx",
  "Current faculty, sub-groups, students and alumni navigation",
);
const lamdaAlumni = official(
  "Nanjing University LAMDA · alumni",
  "https://www.lamda.nju.edu.cn/previous_people_alumni.ashx",
  "Named graduates and public academic, industry and startup destinations",
);
const berkeleyNlp = official(
  "Berkeley NLP Group · people and alumni",
  "https://nlp.cs.berkeley.edu/people.shtml",
  "Faculty, students and alumni used for adviser lineage and destinations",
);
const stanfordNlp = official(
  "Stanford NLP Group · people",
  "https://nlp.stanford.edu/people/",
  "Current faculty and research-group roster",
);
const vggPeople = official(
  "Oxford Visual Geometry Group · people",
  "https://www.robots.ox.ac.uk/~vgg/people/",
  "Current and former VGG members and academic network",
);
const ustcMsraTraining = official(
  "中国科大—微软亚洲研究院联合培养博士生项目",
  "https://sist.ustc.edu.cn/2021/0317/c5142a476799/page.htm",
  "Joint doctoral-training programme and named returnees including Dong Liu and Zhiwei Xiong",
);
const ustcBrainLab = official(
  "中国科大 · 脑启发智能感知与认知重点实验室团队",
  "https://institution.ustc.edu.cn/naoqifazhinengganzhiyurenzhijiaoyubuzhongdianshiyanshi/en/more/992950/tdgd/index.htm",
  "Current research units listing Feng Wu, Xiaoyan Sun, Zhiwei Xiong and Dong Liu in the USTC visual and brain-inspired intelligence team",
);

export const academicCommunities: AcademicCommunity[] = [
  {
    id: "mmlab-network",
    name: "MMLab 跨校网络",
    kicker: "实验室母体 · 多地分支",
    kind: "lab_network",
    roots: "创始节点：汤晓鸥（Xiaoou Tang）",
    anchor: "CUHK · MIT · UCLA · NTU · HKU · HKUST · SIAT · SJTU · Tsinghua",
    description: "从汤晓鸥创立的 CUHK MMLab 母体延伸出的跨校视觉与多模态网络；除多地实验室分支，也纳入经公开资料核验的何恺明、周博磊等北美学术后代。",
    color: "cobalt",
    regions: ["Hong Kong", "Singapore", "Mainland China", "United States"],
    memberIds: ["xiaoou-tang-cuhk", "kaiming-he-us", "bolei-zhou-us", "xiaogang-wang-cuhk", "dahua-lin-cuhk", "wanli-ouyang-cuhk", "hongsheng-li-cuhk", "tianfan-xue-cuhk", "xiangyu-yue-cuhk", "chen-change-loy", "ziwei-liu-ntu", "xingang-pan-ntu", "ping-luo-hku", "xihui-liu-hku", "hongyang-li-hku", "bo-dai-hku", "dan-xu-hkust", "anyi-rao-hkust"],
    branches: [
      { label: "CUHK 母体", memberIds: ["xiaoou-tang-cuhk", "xiaogang-wang-cuhk", "dahua-lin-cuhk", "wanli-ouyang-cuhk", "hongsheng-li-cuhk", "tianfan-xue-cuhk", "xiangyu-yue-cuhk"] },
      { label: "北美学术分支", memberIds: ["kaiming-he-us", "bolei-zhou-us"] },
      { label: "MMLab@NTU", memberIds: ["chen-change-loy", "ziwei-liu-ntu", "xingang-pan-ntu"] },
      { label: "HKU MMLab", memberIds: ["ping-luo-hku", "xihui-liu-hku", "hongyang-li-hku", "bo-dai-hku"] },
      { label: "HKUST MMLab", memberIds: ["dan-xu-hkust", "anyi-rao-hkust"] },
      { label: "中国大陆分支", names: ["SIAT · 乔宇 / 董超", "SJTU · 张少霆", "Tsinghua · 代季峰"] },
    ],
    sources: [mmlabPeople, mmlabAlumni],
  },
  {
    id: "michael-lyu-lineage",
    name: "Michael R. Lyu 师门网络",
    kicker: "资深导师 · 学术后代",
    kind: "advisor_lineage",
    roots: "根节点：Michael R. Lyu（吕荣聪）",
    anchor: "CUHK → Fudan · Zhejiang · BNU · Duke Kunshan · Singapore",
    description: "CUHK 软件可靠性、机器学习与智能软件系统谱系。官方学生页列出 66 位已毕业博士，并逐人给出后续任职。",
    color: "violet",
    regions: ["Hong Kong", "Mainland China", "Singapore"],
    memberIds: ["michael-lyu-cuhk", "zenglin-xu-fdu", "jianke-zhu-zju"],
    branches: [
      { label: "CUHK 根节点", memberIds: ["michael-lyu-cuhk"] },
      { label: "复旦 / 浙大", memberIds: ["zenglin-xu-fdu", "jianke-zhu-zju"] },
      { label: "其他学术分支", names: ["BNU · 郭平", "Duke Kunshan · 黄开竹", "中山大学 / 福州大学 · 郑子彬"] },
      { label: "产业研究分支", names: ["Salesforce Research Asia · Steven Hoi"] },
    ],
    sources: [lyuProfile, lyuStudents],
  },
  {
    id: "wai-lam-lineage",
    name: "Wai Lam NLP 师门网络",
    kicker: "香港母体 · 新加坡 / 中国大陆分支",
    kind: "advisor_lineage",
    roots: "根节点：Wai Lam（林伟）",
    anchor: "CUHK → SUTD · SMU · SJTU",
    description: "以 CUHK 文本挖掘与 NLP 为母体；导师主页公开列出 8 名在读博士生与 34 名校友，博士谱系已延伸到新加坡和中国大陆的独立 PI，并继续形成合作与产业人才网络。",
    color: "lime",
    regions: ["Hong Kong", "Singapore", "Mainland China"],
    memberIds: ["wai-lam", "wenxuan-zhang", "yang-deng", "deng-cai-sjtu", "zhisong-zhang"],
    branches: [
      { label: "CUHK", memberIds: ["wai-lam"] },
      { label: "SUTD", memberIds: ["wenxuan-zhang"] },
      { label: "SMU", memberIds: ["yang-deng"] },
      { label: "SJTU / ByteDance Seed", memberIds: ["deng-cai-sjtu"] },
      { label: "CityU 合作分支", memberIds: ["zhisong-zhang"] },
    ],
    sources: [
      official("Wai Lam · CUHK research portal", "https://research.cuhk.edu.hk/en/persons/wai-lam/", "Current CUHK role and research"),
      official("Wenxuan Zhang · SUTD profile", "https://www.sutd.edu.sg/profile/zhang-wenxuan", "Wai Lam doctoral supervision and current SUTD role"),
      official("CUHK Text Mining Group · students and alumni", "https://www1.se.cuhk.edu.hk/~textmine/", "Eight current PhD students, 34 alumni and published destinations"),
    ],
  },
  {
    id: "nus-nlp-lineage",
    name: "NUS NLP 师门网络",
    kicker: "语言技术母体 · 人才外溢",
    kind: "advisor_lineage",
    roots: "根节点：Hwee Tou Ng",
    anchor: "NUS → NTU · ECNU · industry labs",
    description: "NUS NLP Group 公开维护博士与研究员校友名录；Wei Lu 等校友从该组走向高校独立 PI 与产业研究岗位。",
    color: "coral",
    regions: ["Singapore", "Mainland China"],
    memberIds: ["hwee-tou-ng", "wei-lu", "min-yen-kan"],
    branches: [
      { label: "NUS", memberIds: ["hwee-tou-ng", "min-yen-kan"] },
      { label: "NTU", memberIds: ["wei-lu"] },
      { label: "其他学术分支", names: ["ECNU · Wu Yuanbin", "National Chengchi · Tsai Ming-Feng"] },
      { label: "产业研究分支", names: ["SAP", "Meta", "Raytheon BBN", "Citi"] },
    ],
    sources: [nusNlp],
  },
  {
    id: "lamda-network",
    name: "LAMDA 学术共同体",
    kicker: "南京大学母体 · 学界产业扩散",
    kind: "lab_network",
    roots: "负责人：周志华院士 · 南京大学 LAMDA",
    anchor: "机器学习理论 · 弱监督 · 演化学习 · 强化学习 · 持续学习",
    description: "LAMDA 不是单一导师节点，而是横跨南京大学计算机学院与人工智能学院的机器学习共同体；包含多位独立 PI、LAMDA-RL 子研究组，以及持续向学界和产业扩散的多代学生。",
    color: "cobalt",
    regions: ["Mainland China", "Singapore", "Hong Kong"],
    memberIds: ["zhihua-zhou-nju", "wei-gao-lamda", "yuan-jiang-lamda", "yu-feng-li-lamda", "chao-qian-lamda", "yang-yu-lamda", "zongzhang-zhang-lamda", "dechuan-zhan-lamda", "lijun-zhang-lamda", "hanjia-ye-lamda", "peng-zhao-lamda", "jianxin-wu-nju"],
    branches: [
      { label: "负责人", memberIds: ["zhihua-zhou-nju"] },
      { label: "核心教师", memberIds: ["wei-gao-lamda", "yuan-jiang-lamda", "yu-feng-li-lamda", "chao-qian-lamda", "dechuan-zhan-lamda", "lijun-zhang-lamda", "jianxin-wu-nju"] },
      { label: "LAMDA-RL", memberIds: ["yang-yu-lamda", "zongzhang-zhang-lamda"], names: ["袁雷", "许天"] },
      { label: "新生代 PI", memberIds: ["hanjia-ye-lamda", "peng-zhao-lamda"] },
      { label: "官方名录其他教师", names: ["黎铭", "王天佐", "王魏", "Kai Ming Ting", "赵鹏等"] },
      { label: "公开学生流向", names: ["高校", "Huawei", "ByteDance", "Alibaba", "Tencent", "Ant Group", "Xiaohongshu"] },
    ],
    sources: [lamdaPeople, lamdaAlumni],
  },
  {
    id: "ustc-msra-intelligent-media-network",
    name: "中国科大—微软智能媒体网络",
    kicker: "联合培养 · 产业研究 · 高校回流",
    kind: "lab_network",
    roots: "桥接节点：吴枫（MSRA Internet Media Group → 中国科大）",
    anchor: "MSRA → USTC · 视频编码 · 低层视觉 · 计算摄影 · 类脑视觉",
    description: "这不是单一导师树，而是由博士联合培养、微软研究团队协作和人才回流共同形成的学术网络：刘东可核验为吴枫博士生，熊志伟在 MSRA 完成联培阶段研究，孙晓艳负责相关视觉编码研究；三人后来均在中国科大形成独立研究方向。",
    color: "violet",
    regions: ["Mainland China"],
    memberIds: ["feng-wu-ustc", "xiaoyan-sun-ustc", "zhiwei-xiong-ustc", "dong-liu-ustc", "haichuan-ma-huawei"],
    branches: [
      { label: "MSRA 研究与指导枢纽", memberIds: ["feng-wu-ustc", "xiaoyan-sun-ustc"] },
      { label: "联合培养 / 回流 PI", memberIds: ["zhiwei-xiong-ustc", "dong-liu-ustc"] },
      { label: "中国科大当前研究单元", memberIds: ["feng-wu-ustc", "xiaoyan-sun-ustc", "zhiwei-xiong-ustc", "dong-liu-ustc"] },
      { label: "学生产业流向", memberIds: ["haichuan-ma-huawei"], names: ["华为诺亚方舟实验室 · 陈畅", "华为数据存储与机器视觉 · 林建平"] },
    ],
    sources: [ustcMsraTraining, ustcBrainLab],
  },
  {
    id: "berkeley-nlp-lineage",
    name: "Berkeley NLP 师门网络",
    kicker: "导师谱系 · 跨校扩散",
    kind: "advisor_lineage",
    roots: "核心节点：Dan Klein",
    anchor: "Berkeley → Stanford · MIT · CMU · UT Austin",
    description: "公开组页能够追溯博士谱系与职业去向，是观察北美 NLP 学术后代和产业流动的典型样本。",
    color: "lime",
    regions: ["United States"],
    memberIds: ["dan-klein-us", "percy-liang-us", "jacob-andreas-us", "greg-durrett-us", "daniel-fried-us", "john-denero-us"],
    branches: [
      { label: "Berkeley", memberIds: ["dan-klein-us", "john-denero-us"] },
      { label: "Stanford / MIT", memberIds: ["percy-liang-us", "jacob-andreas-us"] },
      { label: "CMU / UT Austin", memberIds: ["daniel-fried-us", "greg-durrett-us"] },
    ],
    sources: [berkeleyNlp],
  },
  {
    id: "stanford-nlp-network",
    name: "Stanford NLP 共同体",
    kicker: "实验室网络 · 多代导师",
    kind: "lab_network",
    roots: "核心节点：Christopher Manning · Dan Jurafsky",
    anchor: "Stanford NLP → Princeton · UW · industry labs",
    description: "以 Stanford NLP 为母体，连接语言学、深度学习、计算社会科学和基础模型，并向学界与研究实验室持续输送人才。",
    color: "coral",
    regions: ["United States"],
    memberIds: ["christopher-manning-us", "dan-jurafsky-us", "percy-liang-us", "christopher-potts-us", "tatsunori-hashimoto-us", "diyi-yang-us", "dora-demszky-us", "danqi-chen-us"],
    branches: [
      { label: "Stanford 母体", memberIds: ["christopher-manning-us", "dan-jurafsky-us", "percy-liang-us", "christopher-potts-us", "tatsunori-hashimoto-us", "diyi-yang-us", "dora-demszky-us"] },
      { label: "Princeton / TML", memberIds: ["danqi-chen-us"] },
    ],
    sources: [stanfordNlp],
  },
  {
    id: "oxford-vgg-network",
    name: "Oxford VGG 学术网络",
    kicker: "视觉实验室 · 欧洲学派",
    kind: "lab_network",
    roots: "核心节点：Andrew Zisserman",
    anchor: "Oxford VGG → European and global vision labs",
    description: "Visual Geometry Group 是欧洲计算机视觉的重要实验室母体；公开成员与校友页适合继续扩展跨校导师谱系。",
    color: "violet",
    regions: ["Europe", "United States", "Hong Kong"],
    memberIds: ["andrew-zisserman-eu", "philip-torr-eu"],
    branches: [
      { label: "Oxford VGG", memberIds: ["andrew-zisserman-eu"] },
      { label: "Oxford Torr Vision Group", memberIds: ["philip-torr-eu"] },
      { label: "跨校校友", names: ["后续按 VGG 官方 alumni 名录逐条核验"] },
    ],
    sources: [vggPeople],
  },
];

export const academicLineagePeople: Person[] = [
  {
    id: "michael-lyu-cuhk",
    name: "Michael R. Lyu",
    chinese: "吕荣聪",
    role: "Choh-Ming Li Professor of Computer Science and Engineering",
    institution: "CUHK",
    region: "Hong Kong",
    area: "Software Engineering · Dependable AI · Machine Learning",
    tags: ["软件工程", "可靠 AI", "机器学习", "导师谱系", "ARISE Lab"],
    summary: "CUHK 资深教授，研究软件可靠性、分布式系统、机器学习与智能软件工程；官方学生页列出 66 位已毕业博士，是跨校学术谱系的重要根节点。",
    facts: [
      { label: "当前任职", value: "CUHK Choh-Ming Li Professor of Computer Science and Engineering", source: lyuProfile },
      { label: "研究主线", value: "软件工程、可靠计算、云与分布式系统、机器学习和 LLM for software engineering", source: lyuProfile },
      { label: "学生网络", value: "官方页面列出 26 位当前博士生和 66 位已毕业博士，并记录逐人去向", source: lyuStudents },
    ],
    stage: "senior",
    category: "adjacent",
    primary: true,
    knownAlumniCount: 66,
    sources: [lyuProfile, lyuStudents],
    lastVerifiedAt: checkedAt,
    x: 0,
    y: 0,
  },
  {
    id: "zenglin-xu-fdu",
    name: "徐增林",
    role: "教授 · 博士生导师",
    institution: "FDU",
    region: "Mainland China",
    area: "Machine Learning · AI for Science · Trustworthy AI",
    tags: ["机器学习", "AI for Science", "可信 AI", "Michael Lyu 学生"],
    summary: "复旦大学教授，CUHK 博士，Michael R. Lyu 学术谱系成员；研究多模态、图学习、时间序列、大模型与可信联邦学习。",
    facts: [
      { label: "当前任职", value: "复旦大学人工智能创新与产业研究院二级教授、博士生导师", source: official("徐增林 · 复旦主页", "https://faculty.fudan.edu.cn/zenglinxu/zh_CN/index.htm", "Current appointment and research") },
      { label: "博士谱系", value: "CUHK 计算机科学与工程博士；Michael R. Lyu 官方学生页列为 2008 年毕业博士", source: lyuStudents },
      { label: "研究主线", value: "科学智能、可信 AI、多模态学习、图神经网络、时间序列与大语言模型", source: official("徐增林 · 复旦主页", "https://faculty.fudan.edu.cn/zenglinxu/zh_CN/index.htm", "Research areas") },
    ],
    stage: "senior",
    category: "core",
    primary: true,
    sources: [official("徐增林 · 复旦主页", "https://faculty.fudan.edu.cn/zenglinxu/zh_CN/index.htm", "Current appointment and research"), lyuStudents],
    lastVerifiedAt: checkedAt,
    x: 0,
    y: 0,
  },
  {
    id: "jianke-zhu-zju",
    name: "朱建科",
    role: "教授 · 博士生导师",
    institution: "ZJU",
    region: "Mainland China",
    area: "Computer Vision · Machine Learning",
    tags: ["计算机视觉", "机器学习", "Michael Lyu 学生", "学术谱系"],
    summary: "浙江大学教授，Michael R. Lyu 学术谱系成员，研究计算机视觉与机器学习。",
    facts: [
      { label: "当前任职", value: "浙江大学计算机科学与技术学院教授、博士生导师", source: official("朱建科 · 浙江大学主页", "https://person.zju.edu.cn/jkzhu", "Current appointment and research") },
      { label: "博士谱系", value: "Michael R. Lyu 官方学生页列为 2008 年毕业博士", source: lyuStudents },
      { label: "研究主线", value: "计算机视觉与机器学习", source: official("朱建科 · 浙江大学主页", "https://person.zju.edu.cn/jkzhu", "Research areas") },
    ],
    stage: "senior",
    category: "core",
    primary: true,
    sources: [official("朱建科 · 浙江大学主页", "https://person.zju.edu.cn/jkzhu", "Current appointment and research"), lyuStudents],
    lastVerifiedAt: checkedAt,
    x: 0,
    y: 0,
  },
];

export const academicLineageRelationships: Relationship[] = [
  { id: "lyu-xu-lineage", from: "michael-lyu-cuhk", to: "zenglin-xu-fdu", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Michael R. Lyu 官方学生页将徐增林列为 2008 年毕业博士。", source: lyuStudents, verified: true, endYear: 2008 },
  { id: "lyu-zhu-lineage", from: "michael-lyu-cuhk", to: "jianke-zhu-zju", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Michael R. Lyu 官方学生页将朱建科列为 2008 年毕业博士。", source: lyuStudents, verified: true, endYear: 2008 },
];
