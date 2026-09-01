import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  zongProfile: source("中国科学院自动化研究所 · 宗成庆", "https://ia.cas.cn/rcdw/yjy/202404/t20240425_7131828.html", "official", "现职、教育、国际经历、研究方向、学术领导与荣誉"),
  zongStudents: source("中国科学院大学 · 宗成庆指导学生名录", "https://people.ucas.ac.cn/~zongchengqing?language=en", "official", "已指导和现指导的博士、硕士研究生名单"),
  zongGroup: source("自动化所 · 机器翻译与自然语言处理团队走访", "https://www.ia.ac.cn/kxcb/kpwz/201311/t20131107_3969537.html", "official", "团队规模、培养理念、课程建设和人才流动"),
  zongAcademic: source("NLPR · 宗成庆学术活动", "https://nlpr.ia.ac.cn/cip/cqzongAcademicActivities.htm", "official", "研究组历史、学术活动与出门问问联合实验室"),
  shoushanSuda: source("苏州大学 · 李寿山", "https://web.suda.edu.cn/lishoushan/", "official", "现职、教育、博士后、研究、产业项目与招生"),
  shoushanLab: source("苏州大学自然语言处理实验室", "https://nlp.suda.edu.cn/", "official", "实验室 faculty roster and research community"),
  ruiNju: source("南京大学 · 夏睿", "https://is.nju.edu.cn/28/c9/c64270a796873/page.htm", "official", "现职、教育、研究方向与学术奖励"),
  ruiHome: source("夏睿 · academic homepage", "https://rxiacn.github.io/", "profile", "研究、论文、团队与公开招生信息"),
  yuUcas: source("中国科学院大学 · 周玉", "https://people.ucas.edu.cn/~zhouyu", "official", "现职、自动化所博士教育、研究方向与当前学生"),
  zhangProfile: source("中国科学院自动化研究所 · 张家俊", "https://www.ia.cas.cn/rcdw/qch/202404/t20240422_7129862.html", "official", "现职、研究方向与团队角色"),
  feifeiHome: source("NLPR-hosted profile · Feifei Zhai", "https://nlpr.ia.ac.cn/cip/ffzhai.htm", "profile", "宗成庆博士指导、博士后经历与 Sogou/IBM 职业轨迹"),
};

type NewPerson = Omit<Person, "facts" | "lastVerifiedAt" | "introducedAt" | "x" | "y"> & {
  education: string;
  connection: string;
  career: string;
};

const makePerson = (person: NewPerson, index: number): Person => {
  const { education, connection, career, ...base } = person;
  return {
    ...base,
    x: 210 + index * 190,
    y: 190,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    facts: [
      { label: "当前任职", value: base.role, source: base.sources[0] },
      { label: "研究主线", value: base.area, source: base.sources[0] },
      { label: "教育与学术训练", value: education, source: base.sources[0] },
      { label: "宗成庆培养网络", value: connection, source: sources.zongStudents },
      { label: "职业轨迹", value: career, source: base.sources[0] },
    ],
  };
};

export const zongNetworkPeople: Person[] = [
  makePerson({
    id: "shoushan-li-suda", name: "李寿山", role: "Professor · PhD Adviser", institution: "Soochow", region: "Mainland China",
    area: "Natural Language Processing · Sentiment Analysis · Multimodal Analysis", tags: ["自然语言处理", "情感分析", "多模态", "智能问答", "宗成庆博士谱系"], stage: "senior", category: "core", primary: true,
    summary: "苏州大学教授、博士生导师，研究情感分析、多模态理解和智能问答；是宗成庆早期博士生培养网络向苏州大学 NLP 群体延伸的节点。",
    sources: [sources.shoushanSuda, sources.shoushanLab, sources.zongStudents],
    education: "西安电子科技大学计算机本科；中国科学院自动化研究所模式识别与智能系统博士（2008）。",
    connection: "中国科学院大学宗成庆指导学生名录将李寿山列为博士研究生。",
    career: "香港理工大学博士后（2008–2010）后加入苏州大学，2014 年晋升教授；主持情感分析、问答及企业联合项目。",
  }, 0),
  makePerson({
    id: "rui-xia-nju", name: "夏睿", role: "Professor · PhD Adviser", institution: "NJU", region: "Mainland China",
    area: "Natural Language Processing · Text Mining · Affective Computing · LLM Applications", tags: ["自然语言处理", "文本挖掘", "情感计算", "大模型应用", "宗成庆博士谱系"], stage: "senior", category: "core", primary: true,
    summary: "南京大学智能科学与技术学院教授、博士生导师，研究文本挖掘、情感计算和大模型应用，获 ACL 2019/2023 杰出论文奖。",
    sources: [sources.ruiNju, sources.ruiHome, sources.zongStudents],
    education: "2011 年获中国科学院自动化研究所博士学位；宗成庆 UCAS 名录将其列为博士研究生。",
    connection: "中国科学院大学宗成庆指导学生名录明确列出夏睿为博士研究生。",
    career: "长期在南京理工大学从事 NLP 教学科研，现任南京大学智能科学与技术学院教授、博士生导师。",
  }, 1),
];

const lineage = (id: string, to: string, evidence: string, object: string, endYear?: number): Relationship => ({
  id, from: "chengqing-zong", to, type: "lineage", subtype: "phd_adviser", label: "博士导师",
  evidence, evidenceObject: object, source: sources.zongStudents, verified: true, endYear,
});

export const zongNetworkRelationships: Relationship[] = [
  lineage("zong-shoushan-li-phd", "shoushan-li-suda", "宗成庆的中国科学院大学官方指导学生名录将李寿山列为博士研究生；苏州大学履历记录其 2008 年获自动化所博士。", "李寿山 · CASIA PhD", 2008),
  lineage("zong-rui-xia-phd", "rui-xia-nju", "宗成庆的中国科学院大学官方指导学生名录将夏睿列为博士研究生；南京大学履历记录其 2011 年获自动化所博士。", "夏睿 · CASIA PhD", 2011),
  lineage("zong-yu-zhou-phd", "yu-zhou-cas", "宗成庆的中国科学院大学官方指导学生名录将周玉列为博士研究生；周玉 UCAS 主页记录 2008 年获自动化所博士。", "周玉 · CASIA PhD", 2008),
];

export const zongNetworkPersonEnhancements: Record<string, Partial<Person>> = {
  "chengqing-zong": {
    summary: "中科院自动化所自然语言处理、机器翻译与语言认知计算资深带头人，2025 年 ACL 主席、欧洲科学院外籍院士；其公开培养名录连接 CASIA、南京大学、苏州大学及产业研究团队。",
    tags: ["ACL President 2025", "Academia Europaea", "ACL Fellow", "IEEE Fellow", "机器翻译", "语言认知计算", "统计自然语言处理", "CASIA NLP"],
    knownAlumniCount: 56,
    facts: [
      { label: "当前任职", value: "中国科学院自动化研究所研究员、博士生导师，中国科学院大学岗位教授（A 类）。", source: sources.zongProfile },
      { label: "研究主线", value: "自然语言处理、机器翻译、文本数据挖掘、语言认知计算与人机对话系统。", source: sources.zongProfile },
      { label: "教育与学术训练", value: "1998 年获中国科学院计算技术研究所博士；1998–2000 年在自动化所模式识别国家重点实验室从事博士后研究。博士导师姓名尚未获得一手公开证据。", source: sources.zongProfile },
      { label: "培养网络", value: "UCAS 页面列出 56 条已指导硕博记录和 10 名当前学生；学术界学生包括张家俊、周玉、李寿山、夏睿。", source: sources.zongStudents },
      { label: "学术领导", value: "2025 年 ACL 主席、ICCL 委员、中国中文信息学会副理事长；曾任 AFNLP 主席、ACL 2015 程序委员会主席和 ACL 2021 大会主席。", source: sources.zongProfile },
      { label: "学术荣誉", value: "Academia Europaea 外籍院士，IEEE/ACL/AAIA/CAAI/CCF Fellow；获国家科技进步奖二等奖及中国科学院优秀导师等荣誉。", source: sources.zongProfile },
      { label: "教材与学科建设", value: "长期讲授自然语言理解；《统计自然语言处理》及《文本数据挖掘》构成中文 NLP 教学与研究的重要教材线。", source: sources.zongGroup },
      { label: "产业连接", value: "自动化所 NLP 团队与出门问问共建语言智能与人机交互联合实验室。", source: sources.zongAcademic },
    ],
    sources: [sources.zongProfile, sources.zongStudents, sources.zongGroup, sources.zongAcademic],
    lastVerifiedAt: checkedAt,
  },
  "jiajun-zhang-cas": {
    facts: [{ label: "博士师承", value: "2011 年在中国科学院自动化研究所获博士学位，导师为宗成庆。", source: sources.zongStudents }],
    sources: [sources.zongStudents, sources.zhangProfile],
    lastVerifiedAt: checkedAt,
  },
  "yu-zhou-cas": {
    facts: [{ label: "博士师承", value: "2008 年在中国科学院自动化研究所获博士学位；宗成庆 UCAS 指导学生名录将周玉列为博士研究生。", source: sources.zongStudents }],
    sources: [sources.zongStudents, sources.yuUcas],
    lastVerifiedAt: checkedAt,
  },
};

export const zongNetworkGroupMembers: GroupMember[] = [
  { id: "zong-current-ma-cong", teacherId: "chengqing-zong", name: "马聪", role: "PhD Student", source: sources.zongStudents },
  { id: "zong-current-wu-junhong", teacherId: "chengqing-zong", name: "武俊宏", role: "PhD Student", source: sources.zongStudents },
  { id: "zong-current-zhang-xiang", teacherId: "chengqing-zong", name: "张翔", role: "PhD Student", source: sources.zongStudents },
  { id: "zong-current-ren-zixuan", teacherId: "chengqing-zong", name: "任子轩", role: "Master Student", source: sources.zongStudents },
  { id: "zong-current-zhang-xingquan", teacherId: "chengqing-zong", name: "张兴泉", role: "PhD Student", source: sources.zongStudents },
  { id: "zong-current-ye-jing", teacherId: "chengqing-zong", name: "叶静", role: "Master Student", source: sources.zongStudents },
  { id: "zong-current-zhang-zhiyang", teacherId: "chengqing-zong", name: "张志扬", role: "PhD Student", source: sources.zongStudents },
  { id: "zong-current-li-chong", teacherId: "chengqing-zong", name: "李翀", role: "PhD Student", source: sources.zongStudents },
  { id: "zong-current-zhang-yunhao", teacherId: "chengqing-zong", name: "张云豪", role: "PhD Student", source: sources.zongStudents },
  { id: "zong-current-zhao-xinpei", teacherId: "chengqing-zong", name: "赵心培", role: "Master Student", source: sources.zongStudents },
];

const placement = (id: string, student: string, company: string, role: string, sector: StudentPlacement["sector"], degree: StudentPlacement["degree"], year?: number, sourceOverride: Source = sources.zongStudents): StudentPlacement => ({
  id, student, teacherId: "chengqing-zong", company, role, currentRole: `${role} · ${company}`, kind: "current", sector, degree, graduationYear: year, source: sourceOverride, verifiedAt: checkedAt,
});

export const zongNetworkPlacements: StudentPlacement[] = [
  placement("zong-jiajun-casia", "张家俊", "中国科学院自动化研究所", "研究员 · 博士生导师", "academia", "PhD", 2011, sources.zhangProfile),
  placement("zong-yu-zhou-casia", "周玉", "中国科学院自动化研究所", "正研级高级工程师 · 博士生导师", "academia", "PhD", 2008, sources.yuUcas),
  placement("zong-shoushan-suda", "李寿山", "苏州大学", "教授 · 博士生导师", "academia", "PhD", 2008, sources.shoushanSuda),
  placement("zong-rui-nju", "夏睿", "南京大学", "教授 · 博士生导师", "academia", "PhD", 2011, sources.ruiNju),
  placement("zong-feifei-sogou", "翟飞飞", "Sogou", "Senior Researcher · Machine Translation Project Lead", "industry", "PhD", 2014, sources.feifeiHome),
];
