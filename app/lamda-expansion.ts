import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-30";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const lamdaRoster = official(
  "LAMDA 官方成员页",
  "https://www.lamda.nju.edu.cn/People.ashx",
  "Current director, faculty roster, research sub-groups and student roster",
);
const lamdaHome = official(
  "LAMDA 官方主页",
  "https://www.lamda.nju.edu.cn/CH.Default.aspx",
  "Institutional affiliation, director, laboratory scope and research programme",
);
const zhouAcademician = official(
  "中国科学院院士信息 · 周志华",
  "https://casad.cas.cn/ysxx2022/ysmd/xxjs/202602/t20260209_5100179.html",
  "Election as a Chinese Academy of Sciences member in 2025, education and research field",
);
const zhouNju = official(
  "南京大学 · 周志华当选中国科学院院士",
  "https://www.nju.edu.cn/info/1056/453731.htm",
  "Current NJU vice-president role, 2025 CAS election and founding deanship of the School of AI",
);
const zhouStudents = official(
  "周志华 · 研究生与博士后",
  "https://cs.nju.edu.cn/zhouzh/zhouzh.files/student-postdoc.htm",
  "Named former graduate students, supervision periods and public destinations",
);

type LamdaPersonInput = Omit<Person, "region" | "category" | "primary" | "lastVerifiedAt" | "facts" | "status"> & {
  profile: Source;
  facts: NonNullable<Person["facts"]>;
};

const makeLamdaPerson = ({ profile, facts, ...person }: LamdaPersonInput): Person => ({
  ...person,
  region: "Mainland China",
  category: "core",
  primary: true,
  status: "current PI",
  lastVerifiedAt: checkedAt,
  facts,
  sources: [profile, lamdaRoster, ...person.sources].filter(
    (source, index, all) => all.findIndex((candidate) => candidate.url === source.url) === index,
  ),
});

const weiGao = official(
  "LAMDA · 高尉主页",
  "https://www.lamda.nju.edu.cn/gaow/",
  "Current professorship, LAMDA membership, education and learning-theory research",
);
const yuanJiang = official(
  "LAMDA · 姜远主页",
  "https://www.lamda.nju.edu.cn/jiangy/",
  "Current professorship, LAMDA membership, education and research areas",
);
const yuFengLi = official(
  "LAMDA · 李宇峰主页",
  "https://www.lamda.nju.edu.cn/liyf/",
  "Current professorship, LAMDA membership and research programme",
);
const chaoQian = official(
  "LAMDA · 钱超中文简历",
  "https://www.lamda.nju.edu.cn/qianc/CV_ch.html",
  "Current title, education, Zhi-Hua Zhou supervision, research and technology transfer",
);
const yangYu = official(
  "LAMDA · 俞扬主页",
  "https://www.lamda.nju.edu.cn/yuy/",
  "NJU professorship, Zhi-Hua Zhou supervision and reinforcement-learning research",
);
const zongzhangZhang = official(
  "LAMDA · 章宗长主页",
  "https://www.lamda.nju.edu.cn/zhangzz/",
  "Current professorship, LAMDA-RL membership, career and research programme",
);
const deChuanZhan = official(
  "LAMDA · 詹德川主页",
  "https://www.lamda.nju.edu.cn/zhandc.MainPage.ashx",
  "Zhi-Hua Zhou supervision and machine-learning research history",
);
const lijunZhang = official(
  "南京大学 · 张利军主页",
  "https://ai.nju.edu.cn/zlj/",
  "Current professorship, LAMDA membership and machine-learning optimization research",
);
const hanjiaYe = official(
  "LAMDA · 叶翰嘉主页",
  "https://www.lamda.nju.edu.cn/yehj/",
  "Current appointment, doctoral advisers, research areas, students and destinations",
);
const pengZhao = official(
  "LAMDA · 赵鹏主页",
  "https://www.lamda.nju.edu.cn/zhaop/",
  "Current appointment, Zhi-Hua Zhou supervision and online-learning research",
);

export const lamdaPersonEnhancements: Record<string, Partial<Person>> = {
  "zhihua-zhou-nju": {
    role: "中国科学院院士 · 南京大学副校长 · 教授",
    area: "机器学习理论与方法 · 数据挖掘 · 人工智能",
    tags: ["中国科学院院士", "LAMDA 负责人", "机器学习", "数据挖掘", "集成学习", "学件"],
    summary: "2025 年当选中国科学院院士，现任南京大学副校长、教授与 LAMDA 负责人；长期研究机器学习理论与方法，并于 2018 年出任南京大学人工智能学院首任院长。",
    facts: [
      { label: "院士", value: "2025 年当选中国科学院院士（信息技术科学部）", source: zhouAcademician },
      { label: "现职", value: "南京大学副校长、教授，LAMDA 负责人", source: zhouNju },
      { label: "学院建设", value: "2018 年出任南京大学人工智能学院首任院长", source: zhouNju },
      { label: "教育经历", value: "1996、1998、2000 年在南京大学获得学士、硕士和博士学位", source: zhouAcademician },
      { label: "研究主题", value: "机器学习理论与方法，覆盖集成学习、弱监督学习、开放环境学习与学件等方向", source: lamdaHome },
      { label: "实验室", value: "LAMDA（Learning And Mining from DatA）负责人；实验室横跨南京大学计算机学院与人工智能学院", source: lamdaHome },
    ],
    sources: [zhouAcademician, zhouNju, lamdaHome, lamdaRoster, zhouStudents],
    lastVerifiedAt: checkedAt,
  },
};

export const lamdaPeople: Person[] = [
  makeLamdaPerson({
    id: "wei-gao-lamda", name: "高尉", role: "教授 · 博士生导师", institution: "NJU",
    area: "机器学习理论 · 学习理论 · 随机森林 · AUC 优化", tags: ["LAMDA", "学习理论", "随机森林", "AUC 优化"],
    summary: "LAMDA 机器学习理论方向教授，研究学习理论、随机森林、排序与 AUC 优化；博士阶段在南京大学完成。",
    stage: "senior", x: 808, y: 822, profile: weiGao, sources: [],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院教授、LAMDA 教师", source: weiGao },
      { label: "教育经历", value: "2009 年南开大学硕士，2014 年南京大学博士", source: weiGao },
      { label: "研究主线", value: "学习理论、随机森林、排序学习与鲁棒决策树", source: weiGao },
    ],
  }),
  makeLamdaPerson({
    id: "yuan-jiang-lamda", name: "姜远", role: "教授 · 博士生导师", institution: "NJU",
    area: "机器学习 · 数据挖掘 · 深度森林", tags: ["LAMDA", "机器学习", "数据挖掘", "深度森林"],
    summary: "LAMDA 资深教授，长期从事机器学习与数据挖掘，并培养了多位继续留在 LAMDA 或走向高校与产业的学生。",
    stage: "senior", x: 828, y: 876, profile: yuanJiang, sources: [],
    facts: [
      { label: "当前任职", value: "南京大学计算机学院教授、LAMDA 教师", source: yuanJiang },
      { label: "教育经历", value: "2004 年获南京大学计算机科学博士学位", source: yuanJiang },
      { label: "研究主线", value: "机器学习、数据挖掘与深度森林", source: yuanJiang },
    ],
  }),
  makeLamdaPerson({
    id: "yu-feng-li-lamda", name: "李宇峰", role: "教授 · 博士生导师", institution: "NJU",
    area: "弱监督学习 · 神经符号学习 · 统计学习与优化", tags: ["LAMDA", "弱监督学习", "神经符号", "统计学习"],
    summary: "LAMDA 教授，研究溯因与神经符号学习、半监督和弱监督学习，以及面向图像、文本、图和视频的统计学习。",
    stage: "senior", x: 848, y: 930, profile: yuFengLi, sources: [zhouStudents],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院教授、LAMDA 教师", source: yuFengLi },
      { label: "学术谱系", value: "周志华官方学生页列为 2008–2013 年博士生", source: zhouStudents },
      { label: "研究主线", value: "溯因与神经符号、半监督与弱监督、统计学习与优化", source: yuFengLi },
    ],
  }),
  makeLamdaPerson({
    id: "chao-qian-lamda", name: "钱超", role: "教授 · 博士生导师 · 院长助理", institution: "NJU",
    area: "演化计算 · 机器学习 · 黑盒优化 · AI for Science", tags: ["LAMDA", "演化计算", "黑盒优化", "AI4Science", "华为合作"],
    summary: "LAMDA 演化学习与黑盒优化方向教授；部分成果已用于芯片布局、无线网络、制造与供应链优化，并与华为、中石化开展公开合作。",
    stage: "senior", x: 868, y: 984, profile: chaoQian, sources: [],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院教授、博导、院长助理", source: chaoQian },
      { label: "学术谱系", value: "2009 年南京大学学士，2015 年在周志华指导下获博士学位", source: chaoQian },
      { label: "人才流动", value: "博士毕业后任中国科大副研究员，2019 年回南京大学，2024 年晋升教授", source: chaoQian },
      { label: "产业连接", value: "研究成果公开用于华为芯片、网络、计算系统和供应链优化，并担任中石化—南京大学数据联合实验室主任", source: chaoQian },
    ],
  }),
  makeLamdaPerson({
    id: "yang-yu-lamda", name: "俞扬", role: "教授 · 博士生导师 · LAMDA-RL 负责人", institution: "NJU",
    area: "强化学习 · 演化学习 · 无梯度优化 · 智能体", tags: ["LAMDA-RL", "强化学习", "演化学习", "智能体"],
    summary: "LAMDA-RL 核心教授，研究强化学习、无梯度优化和演化学习；博士阶段由周志华指导，后在南京大学建立强化学习分支。",
    stage: "senior", x: 888, y: 1038, profile: yangYu, sources: [lamdaRoster],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院教授、LAMDA-RL 核心教师", source: lamdaRoster },
      { label: "学术谱系", value: "2011 年获南京大学博士学位，导师为周志华", source: yangYu },
      { label: "研究主线", value: "强化学习、无梯度优化、表示与迁移，以及演化学习", source: yangYu },
      { label: "子研究组", value: "LAMDA 官方成员页将俞扬、章宗长、袁雷、许天列为 LAMDA-RL 小组", source: lamdaRoster },
    ],
  }),
  makeLamdaPerson({
    id: "zongzhang-zhang-lamda", name: "章宗长", role: "教授 · LAMDA-RL", institution: "NJU",
    area: "强化学习 · 多智能体系统 · 概率规划 · 模仿学习", tags: ["LAMDA-RL", "强化学习", "多智能体", "大模型强化学习"],
    summary: "LAMDA-RL 教授，研究深度与安全强化学习、多智能体协同、POMDP 规划、模仿学习及面向大模型的强化学习。",
    stage: "senior", x: 908, y: 1092, profile: zongzhangZhang, sources: [],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院教授、LAMDA-RL 成员", source: zongzhangZhang },
      { label: "人才流动", value: "曾任 NUS Research Fellow、苏州大学副教授，2019 年加入南京大学，2024 年晋升教授", source: zongzhangZhang },
      { label: "产业经历", value: "2012 年曾任华为诺亚方舟实验室 Research Engineer", source: zongzhangZhang },
      { label: "研究主线", value: "强化学习、多智能体系统、概率规划、模仿学习与大模型强化学习", source: zongzhangZhang },
    ],
  }),
  makeLamdaPerson({
    id: "dechuan-zhan-lamda", name: "詹德川", role: "教授 · 博士生导师", institution: "NJU",
    area: "机器学习 · 表征学习 · 度量学习 · 模型复用", tags: ["LAMDA", "机器学习", "度量学习", "模型复用"],
    summary: "LAMDA 资深教授，早期研究降维、特征选择与度量学习，近年延伸到模型复用、持续学习和多模态学习。",
    stage: "senior", x: 928, y: 1146, profile: deChuanZhan, sources: [],
    facts: [
      { label: "当前任职", value: "LAMDA 官方成员页列为教授", source: lamdaRoster },
      { label: "学术谱系", value: "2003 年加入 LAMDA，并在周志华指导下开展研究", source: deChuanZhan },
      { label: "研究主线", value: "降维、特征选择、度量学习，以及模型复用与持续学习", source: deChuanZhan },
    ],
  }),
  makeLamdaPerson({
    id: "lijun-zhang-lamda", name: "张利军", role: "教授 · 博士生导师", institution: "NJU",
    area: "机器学习 · 在线学习 · 优化", tags: ["LAMDA", "机器学习", "在线学习", "优化"],
    summary: "LAMDA 机器学习与优化方向教授，重点研究在线学习、在线凸优化、随机优化与多分布学习。",
    stage: "senior", x: 948, y: 1200, profile: lijunZhang, sources: [],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院教授、LAMDA 成员", source: lijunZhang },
      { label: "任职轨迹", value: "2019 年加入南京大学，2020 年起任教授", source: lijunZhang },
      { label: "研究主线", value: "机器学习与优化，尤其是在线学习和在线凸优化", source: lijunZhang },
    ],
  }),
  makeLamdaPerson({
    id: "hanjia-ye-lamda", name: "叶翰嘉", role: "准聘副教授 · 博士生导师", institution: "NJU",
    area: "模型复用 · 表格学习 · 持续学习 · 多模态大模型", tags: ["LAMDA", "模型复用", "表格学习", "持续学习", "多模态大模型"],
    summary: "LAMDA 新生代独立 PI，研究模型复用、表格表征、元学习与持续学习、多模态大模型；主页公开列出学生流向腾讯、华为、阿里、字节、蚂蚁和小红书。",
    stage: "emerging", x: 968, y: 1254, profile: hanjiaYe, sources: [],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院准聘副教授、LAMDA 教师", source: hanjiaYe },
      { label: "学术谱系", value: "博士阶段由姜远与詹德川共同指导，2019 年获南京大学博士学位", source: hanjiaYe },
      { label: "研究主线", value: "模型复用、表格学习、元学习与持续学习、多模态大模型", source: hanjiaYe },
      { label: "学生流向", value: "公开去向覆盖腾讯、华为、快手、阿里、字节、蚂蚁、小红书", source: hanjiaYe },
    ],
  }),
  makeLamdaPerson({
    id: "peng-zhao-lamda", name: "赵鹏", role: "准聘副教授 · 博士生导师", institution: "NJU",
    area: "在线学习 · Bandit · 优化 · 强化学习与智能体", tags: ["LAMDA", "在线学习", "Bandit", "优化", "智能体"],
    summary: "LAMDA 新生代理论机器学习 PI，研究在线学习、Bandit、优化、强化学习与智能体；博士阶段由周志华指导。",
    stage: "emerging", x: 988, y: 1308, profile: pengZhao, sources: [],
    facts: [
      { label: "当前任职", value: "南京大学人工智能学院准聘副教授、LAMDA 教师", source: lamdaRoster },
      { label: "学术谱系", value: "2021 年获南京大学博士学位，导师为周志华", source: pengZhao },
      { label: "研究主线", value: "在线学习、Bandit、在线博弈、LLM 优化、强化学习与智能体", source: pengZhao },
    ],
  }),
];

export const lamdaRelationships: Relationship[] = [
  { id: "zhou-wei-gao-lamda", from: "zhihua-zhou-nju", to: "wei-gao-lamda", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "周志华官方学生页列出高尉为 2009–2014 年博士生；高尉主页记录 2014 年获南京大学博士学位。", source: zhouStudents, verified: true, endYear: 2014 },
  { id: "zhou-yufeng-li-lamda", from: "zhihua-zhou-nju", to: "yu-feng-li-lamda", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "周志华官方学生页列出李宇峰为 2008–2013 年博士生。", source: zhouStudents, verified: true, endYear: 2013 },
  { id: "zhou-chao-qian-lamda", from: "zhihua-zhou-nju", to: "chao-qian-lamda", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "钱超官方简历写明其 2015 年南京大学博士由周志华指导。", source: chaoQian, verified: true, endYear: 2015 },
  { id: "zhou-yang-yu-lamda", from: "zhihua-zhou-nju", to: "yang-yu-lamda", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "俞扬官方主页写明其 2011 年南京大学博士导师为周志华。", source: yangYu, verified: true, endYear: 2011 },
  { id: "zhou-dechuan-zhan-lamda", from: "zhihua-zhou-nju", to: "dechuan-zhan-lamda", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "詹德川 LAMDA 主页写明其加入研究组后由周志华指导。", source: deChuanZhan, verified: true },
  { id: "zhou-peng-zhao-lamda", from: "zhihua-zhou-nju", to: "peng-zhao-lamda", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "赵鹏主页写明其 2021 年南京大学博士由周志华指导。", source: pengZhao, verified: true, endYear: 2021 },
  { id: "jiang-hanjia-ye-lamda", from: "yuan-jiang-lamda", to: "hanjia-ye-lamda", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "叶翰嘉主页写明博士阶段由姜远与詹德川共同指导。", source: hanjiaYe, verified: true, endYear: 2019 },
  { id: "zhan-hanjia-ye-lamda", from: "dechuan-zhan-lamda", to: "hanjia-ye-lamda", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "叶翰嘉主页写明博士阶段由姜远与詹德川共同指导。", source: hanjiaYe, verified: true, endYear: 2019 },
];

export const lamdaGroupMembers: GroupMember[] = [
  { id: "zhou-jiawei-shan", teacherId: "zhihua-zhou-nju", name: "单家威", role: "博士生 · 2022–", source: lamdaRoster },
  { id: "zhou-yuyang-qian", teacherId: "zhihua-zhou-nju", name: "钱宇阳", role: "博士生 · 2023–", source: lamdaRoster },
  { id: "zhou-jing-wang", teacherId: "zhihua-zhou-nju", name: "王景", role: "博士生 · 2023–", source: lamdaRoster },
  { id: "zhou-wenbo-du", teacherId: "zhihua-zhou-nju", name: "杜闻博", role: "博士生 · 2024–", source: lamdaRoster },
  { id: "zhou-haoyi-lei", teacherId: "zhihua-zhou-nju", name: "雷昊一", role: "博士生 · 2024–", source: lamdaRoster },
  { id: "zhou-yanfeng-xie", teacherId: "zhihua-zhou-nju", name: "谢龑锋", role: "博士生 · 2024–", source: lamdaRoster },
  { id: "zhou-xinhao-zhu", teacherId: "zhihua-zhou-nju", name: "朱鑫浩", role: "博士生 · 2025–", source: lamdaRoster },
];

const placement = (id: string, student: string, company: string, role: string): StudentPlacement => ({
  id,
  student,
  teacherId: "hanjia-ye-lamda",
  company,
  role,
  kind: "first_job",
  sector: "industry",
  source: hanjiaYe,
  verifiedAt: checkedAt,
});

export const lamdaPlacements: StudentPlacement[] = [
  placement("ye-qiwei-wang-wechat", "Qi-Wei Wang", "Tencent", "WeChat"),
  placement("ye-tingji-huang-huawei", "Ting-Ji Huang", "Huawei", "Terminal research"),
  placement("ye-lu-ren-kuaishou", "Lu Ren", "Kuaishou", "Research / engineering"),
  placement("ye-chao-yi-alibaba", "Chao Yi", "Alibaba", "Research / engineering"),
  placement("ye-qile-zhou-bytedance", "Qi-Le Zhou", "ByteDance", "Research / engineering"),
  placement("ye-xuyang-chen-bytedance", "Xu-Yang Chen", "ByteDance", "Research / engineering"),
  placement("ye-hailong-sun-ant", "Hai-Long Sun", "Ant Group", "Ling Team"),
  placement("ye-huaihong-yin-xhs", "Huai-Hong Yin", "Xiaohongshu", "Research / engineering"),
  placement("ye-tao-zhou-huawei", "Tao Zhou", "Huawei", "Nanjing Research Institute"),
];

export const lamdaSources = { lamdaRoster, lamdaHome, zhouAcademician, zhouNju, zhouStudents };
