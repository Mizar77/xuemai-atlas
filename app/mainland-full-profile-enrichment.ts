import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-28";

type PersonEnhancement = Partial<Pick<Person, "summary" | "tags" | "facts" | "sources" | "status" | "lastVerifiedAt" | "knownAlumniCount">>;

const official = (label: string, url: string, supports: string, asOf?: string): Source => ({
  label, url, kind: "official", checkedAt, supports, ...(asOf ? { asOf } : {}),
});
const profile = (label: string, url: string, supports: string, asOf?: string): Source => ({
  label, url, kind: "profile", checkedAt, supports, ...(asOf ? { asOf } : {}),
});

const liuZhiyuan = official("清华大学计算机系：刘知远", "https://www.cs.tsinghua.edu.cn/info/1121/7037.htm", "教育年份、研究方向与教授职务");
const liuZhiyuanHome = profile("刘知远个人主页", "https://lzy.thunlp.org/index_cn.html", "THUNLP 身份、基础模型与知识图谱研究主线");
const xuSun = official("北京大学计算机学院：孙栩", "https://cs.pku.edu.cn/info/1078/1673.htm", "教育年份、2010–2012 研究经历、2012 年加入北大与研究方向");
const xuSunHome = profile("孙栩个人主页", "https://xusun26.github.io/", "论文、团队与自然语言生成研究");
const huangXuanjing = official("复旦大学教师主页：黄萱菁", "https://faculty.fudan.edu.cn/xjhuang/zh_CN/index.htm", "教师身份与自然语言处理研究");
const huangXuanjingLineage = official("复旦大学校庆报道", "https://news.fudan.edu.cn/2023/0527/c2610a135077/page.htm", "黄萱菁与复旦 NLP 创建者吴立德的明确师承");
const zhaoXin = official("中国人民大学高瓴人工智能学院：赵鑫", "https://ai.ruc.edu.cn/academicfaculty/szdwn/zx/index.htm", "2014–2026 任职轨迹、产业访问经历与研究方向");
const zhaoXinBio = official("中国人民大学高瓴人工智能学院教师简介：赵鑫", "https://ai.ruc.edu.cn/academicfaculty/szdwn/zx/f17e70d0cd6944b385e1b2d8beda8f50.htm", "2014 年北大博士、开源工具与大模型著作", "2025-11-07");
const qinBing = official("哈工大 SCIR 成员介绍", "https://ir.hit.edu.cn/19590/list.htm", "秦兵的研究中心主任与博士生导师身份");
const qinBingAnniversary = official("哈工大 SCIR 25 周年成果回顾", "https://ir.hit.edu.cn/2025/0919/c19589a378391/page.htm", "大模型审校、情感分析、对话等团队技术成果", "2025-09-19");
const qinBingStudent = official("哈工大 SCIR：张牧宇博士答辩", "https://ir.hit.edu.cn/2016/0317/c19589a356926/page.htm", "秦兵指导张牧宇及其毕业后进入腾讯", "2016-03-17");
const zhaoJun = official("中国科学院自动化研究所：赵军", "https://ia.cas.cn/rcdw/yjy/202404/t20240422_7129836.html", "1998 年博士、1998–2002 博士后、2002 年入所以及研究与项目");
const casRoster = official("中科院自动化所导师名录", "https://www.ia.cas.cn/yjsjy/dsjj/index.html", "当前研究生导师身份");
const daiXinyu = official("南京大学人工智能学院：Xinyu Dai", "https://ai.nju.edu.cn/daixinyu/", "1999/2005 教育、2005–2017 任职晋升、2010–2011 Berkeley 访问与研究方向");
const njuNlp = official("南京大学 NLP 人员名录", "https://nlp.nju.edu.cn/people.html", "NJUNLP 教师身份及公开团队名录");
const guXiaodong = official("上海交通大学计算机学院：顾小东", "https://www.cs.sjtu.edu.cn/jiaoshiml/guxiaodong.html", "代码大模型研究、2022–2025 企业合作项目与课程");
const guXiaodongHome = profile("顾小东个人主页", "https://guxd.github.io/", "当前博士生与论文列表");
const chenHuajun = official("浙江大学个人主页：陈华钧", "https://mypage.zju.edu.cn/huajun/569213.html", "研究方向、知识引擎实验室、OpenKG 与专著");
const chenHuajunJointLab = official("浙江大学科创中心：知识引擎联合实验室", "https://hic.zju.edu.cn/ibct/2021/0903/c65955a2509758/page.htm", "浙江大学—阿里巴巴知识引擎联合实验室主任", "2021-09-03");
const songYan = official("中国科学技术大学导师主页：宋彦", "https://dslx.ustc.edu.cn/?expertid=6569681&menu=expert_paper", "微软、腾讯经历，小冰与中文词向量项目，以及研究和招生方向");
const ustcRoster = official("中国科学技术大学导师主页系统", "https://dslx.ustc.edu.cn/", "当前导师归属与公开招生入口");
const zhangHuaping = official("北京理工大学人工智能学院：张华平", "https://ai.bit.edu.cn/szdw/b02464e4a27b4084a9b3fd42afb4aae5.htm", "学院职务、NLPIR/ICTCLAS、研究方向与近期代表成果", "2025-09-15");
const zhangHuapingTeam = official("北京理工大学人工智能学院科研团队", "https://ai.bit.edu.cn/kxyj/kypt_1/89ee520c7a7c4988b4cfe499a9f2c7f0.htm", "NLPIR 团队、ChatBIT 与开源情报技术方向");
const wangDeqing = official("北京航空航天大学计算机学院：王德庆", "https://scse.buaa.edu.cn/info/1078/11323.htm", "研究方向、国家科技资源平台职务与成果应用", "2024-08-27");
const wangDeqingTeam = profile("北航 KTL 团队主页", "https://ktl.buaa.edu.cn/", "团队与科技大数据研究平台");
const wangXiaojie = official("北京邮电大学智能科学与技术中心", "https://scs.bupt.edu.cn/xygk/jgsz/dsjx/znkxyjszx_.htm", "中心沿革、王小捷主任身份、研究生规模与研究方向");
const buptRoster = official("北邮人工智能学院导师名录", "https://ai.bupt.edu.cn/info/1050/2952.htm", "当前导师身份与学院归属");
const dingNing = official("西安交通大学教师主页：丁宁", "https://gr.xjtu.edu.cn/dingning/zh_CN/zhym/1001739/list/index.htm", "2001–2012 教育、2012–2023 产业任职、2023 年入职与招生信息");
const xjtuRoster = official("西安交通大学人工智能学院", "https://gr.xjtu.edu.cn/dingning/", "当前教授、博士生导师与学院归属");
const liuYongmei = official("中山大学计算机学院：刘咏梅", "https://cse.sysu.edu.cn/teacher/LiuYongmei", "教育、2007 年入职、研究方向与招生主题");
const liuYongmeiHome = profile("刘咏梅个人主页", "https://ymliu-sysu.github.io/", "论文与神经符号推理研究");
const heXiaofeng = official("华东师范大学教师主页：何晓丰", "https://faculty.ecnu.edu.cn/_s16/hxf/main.psp", "宾州州立博士、LBNL/Yahoo/微软经历与大模型研究主题");
const ecnuRoster = official("华东师范大学计算机学院", "https://cs.ecnu.edu.cn/", "当前学院归属");
const pengMin = official("武汉大学教师主页：彭敏", "https://jszy.whu.edu.cn/pengmin/zh_CN/zhym/166810/list/index.htm", "人工智能系主任、研究方向、PIXIU 与产业知识图谱成果");
const whuProfile = official("武汉大学教师主页：彭敏基本信息", "https://jszy.whu.edu.cn/pengmin/zh_CN/tzysd/166815/list/index.htm", "武汉大学教育背景与博士生导师身份");

export const mainlandFullProfileEnhancements: Record<string, PersonEnhancement> = {
  "zhiyuan-liu": {
    facts: [
      { label: "教育", value: "清华大学计算机科学工学学士（2006）、工学博士（2011）", source: liuZhiyuan },
      { label: "研究主线", value: "知识图谱与语义计算、社会计算与计算社会科学、基础模型", source: liuZhiyuan },
      { label: "学术组织", value: "THUNLP 教授，并参与清华基础模型研究中心建设", source: liuZhiyuanHome },
    ],
    sources: [liuZhiyuan, liuZhiyuanHome], lastVerifiedAt: checkedAt,
  },
  "xu-sun-pku": {
    facts: [
      { label: "教育", value: "华中科技大学学士（2004）、北京大学硕士（2007）、东京大学博士（2010）", source: xuSun },
      { label: "任职轨迹", value: "2010–2012 年在东京大学、Cornell、香港理工等机构从事研究；2012 年加入北京大学", source: xuSun },
      { label: "研究主线", value: "自然语言生成、结构化语言处理及面向语言的深度学习", source: xuSun },
      { label: "团队方向", value: "研究成果覆盖 NLG、语言模型与结构学习", source: xuSunHome },
    ],
    sources: [xuSun, xuSunHome], lastVerifiedAt: checkedAt,
  },
  "xuanjing-huang": {
    facts: [
      { label: "明确师承", value: "师从复旦 NLP 实验室创建者吴立德", source: huangXuanjingLineage },
      { label: "研究主线", value: "自然语言处理、语言理解与中文信息处理", source: huangXuanjing },
      { label: "组织脉络", value: "连接复旦早期计算语言学传统与现有 NLP 实验室", source: huangXuanjingLineage },
    ],
    sources: [huangXuanjing, huangXuanjingLineage], lastVerifiedAt: checkedAt,
  },
  "xin-zhao-ruc": {
    facts: [
      { label: "教育", value: "北京大学博士（2014）", source: zhaoXinBio },
      { label: "人大任职", value: "讲师（2014–2017）→ 副教授（2017–2020）→ 教授/长聘副教授（2020–）", source: zhaoXin },
      { label: "产业访问", value: "MSRA 实习/访问（2013、2017），百度访问（2018），科大讯飞访问（2018–）", source: zhaoXin },
      { label: "开源与著作", value: "主导 RecBole、TextBox，并组织《A Survey of Large Language Models》与《大语言模型》", source: zhaoXinBio },
    ],
    sources: [zhaoXin, zhaoXinBio], lastVerifiedAt: checkedAt,
  },
  "bing-qin": {
    facts: [
      { label: "组织节点", value: "哈工大社会计算与交互机器人研究中心主任、博士生导师", source: qinBing },
      { label: "团队成果", value: "覆盖大模型中文审校与润色、情感分析、开放域对话和社交媒体智能体", source: qinBingAnniversary },
      { label: "博士培养", value: "官方答辩记录明确秦兵指导张牧宇完成篇章语义分析博士论文（2016）", source: qinBingStudent },
      { label: "公开学生去向", value: "张牧宇博士毕业后进入腾讯", source: qinBingStudent },
    ],
    sources: [qinBing, qinBingAnniversary, qinBingStudent], lastVerifiedAt: checkedAt,
  },
  "jun-zhao-cas": {
    facts: [
      { label: "教育", value: "清华大学博士（1998）", source: zhaoJun },
      { label: "任职轨迹", value: "香港科技大学博士后（1998–2002）；2002 年加入中科院自动化所", source: zhaoJun },
      { label: "研究主线", value: "自然语言处理、知识工程、文本知识获取与语义计算", source: zhaoJun },
      { label: "重大项目", value: "负责科技创新 2030 ‘以自然语言为核心的语义理解’ 等项目", source: zhaoJun },
    ],
    sources: [zhaoJun, casRoster], lastVerifiedAt: checkedAt,
  },
  "xinyu-dai": {
    facts: [
      { label: "教育", value: "南京大学计算机学士（1999）、博士（2005）", source: daiXinyu },
      { label: "任职轨迹", value: "2005 年留校任教，2008 年副教授，2017 年教授", source: daiXinyu },
      { label: "海外访问", value: "UC Berkeley EECS 与统计系访问（2010.08–2011.09）", source: daiXinyu },
      { label: "研究主线", value: "语言智能与知识工程、语言处理与人机交流", source: daiXinyu },
    ],
    sources: [daiXinyu, njuNlp], lastVerifiedAt: checkedAt,
  },
  "xiaodong-gu": {
    facts: [
      { label: "研究主线", value: "代码大模型、程序生成与修复、智能化软件工程和 Agent 问答", source: guXiaodong },
      { label: "产业项目", value: "主持 CCF-腾讯犀牛鸟项目（2022–2023）及多项华为代码大模型项目（2023–2025）", source: guXiaodong },
      { label: "课程", value: "开设《大语言模型基础与实践》《机器学习》等课程", source: guXiaodong },
      { label: "当前团队", value: "个人主页公开列出 Yuling Shi 等博士生", source: guXiaodongHome },
    ],
    sources: [guXiaodong, guXiaodongHome], lastVerifiedAt: checkedAt,
  },
  "huajun-chen-zju": {
    facts: [
      { label: "研究主线", value: "知识图谱、自然语言处理、知识增强大模型与 AI for Science", source: chenHuajun },
      { label: "开放基础设施", value: "知识引擎实验室与 OpenKG", source: chenHuajun },
      { label: "产业合作", value: "浙江大学—阿里巴巴知识引擎联合实验室主任", source: chenHuajunJointLab },
      { label: "专著", value: "《大模型知识增强》", source: chenHuajun },
    ],
    sources: [chenHuajun, chenHuajunJointLab], lastVerifiedAt: checkedAt,
  },
  "yan-song-ustc": {
    facts: [
      { label: "产业任职", value: "加入中科大前在微软、腾讯 AI 团队担任核心研究人员", source: songYan },
      { label: "产品与资源", value: "微软小冰创始团队成员之一；领导腾讯大规模中文词向量数据集建设", source: songYan },
      { label: "研究主线", value: "NLP、信息检索与抽取、文本表征、多模态内容处理和大模型", source: songYan },
      { label: "招生状态", value: "官网核验日公开招收学术及工程博士研究生；以最新主页为准", source: songYan },
    ],
    sources: [songYan, ustcRoster], status: "官网截至 2026-08-28 显示招收学术及工程博士研究生", lastVerifiedAt: checkedAt,
  },
  "huaping-zhang-bit": {
    facts: [
      { label: "组织节点", value: "NLPIR 实验室主任、人工智能学院与计算机学院副院长", source: zhangHuaping },
      { label: "代表系统", value: "ICTCLAS / NLPIR 中文语义智能处理平台", source: zhangHuaping },
      { label: "近期大模型", value: "团队建设 ChatBIT 明理大模型与开源情报智能分析系统", source: zhangHuapingTeam },
      { label: "研究主线", value: "多语种智能信息处理、大数据搜索与挖掘、自然语言处理", source: zhangHuaping },
    ],
    sources: [zhangHuaping, zhangHuapingTeam], lastVerifiedAt: checkedAt,
  },
  "deqing-wang-buaa": {
    facts: [
      { label: "平台职务", value: "国家科技资源共享服务工程技术研究中心总工", source: wangDeqing },
      { label: "研究主线", value: "大模型、NLP、图神经网络与科技大数据分析", source: wangDeqing },
      { label: "技术转化", value: "团队平台成果应用于科技部、航天二院等科技与安全任务", source: wangDeqing },
      { label: "团队", value: "KTL 团队聚焦知识技术与科技大数据", source: wangDeqingTeam },
    ],
    sources: [wangDeqing, wangDeqingTeam], lastVerifiedAt: checkedAt,
  },
  "xiaojie-wang-bupt": {
    facts: [
      { label: "组织节点", value: "智能科学与技术中心主任；中心成立于 1999 年", source: wangXiaojie },
      { label: "人才培养", value: "中心支撑智能科学与技术本科、硕士和博士授权点，公开规模为博士硕士研究生 100 余名", source: wangXiaojie },
      { label: "研究主线", value: "中文 NLP、语言理解与生成、人机对话、信息检索和抽取", source: wangXiaojie },
    ],
    sources: [wangXiaojie, buptRoster], lastVerifiedAt: checkedAt,
  },
  "ning-ding-xjtu": {
    facts: [
      { label: "教育", value: "西安交大学士（2005）、硕士（2008）；日本庆应大学博士（2012）", source: dingNing },
      { label: "产业任职", value: "东芝 Research Scientist（2012–2020）；阿里巴巴算法总监（2020–2023）", source: dingNing },
      { label: "高校任职", value: "2023 年 8 月加入西安交通大学任教授", source: dingNing },
      { label: "研究主线", value: "大模型原理与应用、具身智能、人机交互、NLP 与语音处理", source: dingNing },
    ],
    sources: [dingNing, xjtuRoster], status: "官网截至 2026-08-28 显示招收硕士、博士、博士后与本科实习生", lastVerifiedAt: checkedAt,
  },
  "yongmei-liu-sysu": {
    facts: [
      { label: "教育", value: "武汉大学计算机学士；多伦多大学计算机硕士、博士", source: liuYongmei },
      { label: "高校任职", value: "2007 年 12 月起任职中山大学", source: liuYongmei },
      { label: "研究主线", value: "知识表示与推理、NLP、多智能体系统与智能规划", source: liuYongmei },
      { label: "近期方向", value: "将经典符号逻辑与 LLM、强化学习结合，研究神经符号推理智能体", source: liuYongmeiHome },
    ],
    sources: [liuYongmei, liuYongmeiHome], lastVerifiedAt: checkedAt,
  },
  "xiaofeng-he-ecnu": {
    facts: [
      { label: "教育", value: "宾夕法尼亚州立大学计算机科学与工程博士", source: heXiaofeng },
      { label: "任职轨迹", value: "曾任职美国能源部 Lawrence Berkeley National Laboratory、Yahoo Labs 与微软搜索技术中心", source: heXiaofeng },
      { label: "大模型方向", value: "模型编辑、幻觉、推理与强化学习，以及垂直领域大模型", source: heXiaofeng },
      { label: "交叉应用", value: "智慧教育、因果推断与金融风险知识图谱", source: heXiaofeng },
    ],
    sources: [heXiaofeng, ecnuRoster], lastVerifiedAt: checkedAt,
  },
  "min-peng-whu": {
    facts: [
      { label: "教育", value: "武汉大学博士", source: whuProfile },
      { label: "组织节点", value: "武汉大学人工智能学院人工智能系主任、博士生导师", source: pengMin },
      { label: "研究主线", value: "人工智能、自然语言处理与大模型", source: pengMin },
      { label: "代表成果", value: "金融大模型、指令数据与评测基准 PIXIU（NeurIPS 2023 Benchmark）", source: pengMin },
      { label: "知识图谱", value: "《基于产业知识图谱的区域产业关联分析研究》（2023）", source: pengMin },
    ],
    sources: [pengMin, whuProfile], lastVerifiedAt: checkedAt,
  },
};

export const mainlandFullProfileRelationships: Relationship[] = [
  {
    id: "mainland-full-huang-wulide-lineage", from: "xuanjing-huang", to: "xuanjing-huang", type: "lineage", subtype: "phd_adviser",
    label: "师承：吴立德", evidence: "复旦大学校庆报道明确记载黄萱菁师从复旦 NLP 实验室创建者吴立德。", source: huangXuanjingLineage, verified: true,
  },
  {
    id: "mainland-full-qin-zhangmuyu-lineage", from: "bing-qin", to: "bing-qin", type: "lineage", subtype: "phd_adviser",
    label: "博士生：张牧宇", evidence: "哈工大 SCIR 的 2016 年博士答辩报道明确列秦兵为张牧宇导师。", source: qinBingStudent, verified: true, recentYear: 2016,
  },
  {
    id: "mainland-full-gu-huawei-projects", from: "xiaodong-gu", to: "xiaodong-gu", type: "industry", subtype: "joint_project",
    label: "华为代码大模型项目（2023–2025）", evidence: "上海交大教师主页逐项列出华为支持的恶意代码生成、Java 代码生成与多智能体能力项目。", source: guXiaodong, verified: true, startYear: 2023, endYear: 2025,
  },
];

export const mainlandFullProfileGroupMembers: GroupMember[] = [
  { id: "mainland-full-gu-yuling-shi", teacherId: "xiaodong-gu", name: "Yuling Shi", role: "PhD Student", focus: "Code LLMs · software engineering", source: guXiaodongHome },
];

export const mainlandFullProfileStudentPlacements: StudentPlacement[] = [
  {
    id: "mainland-full-qin-zhangmuyu-tencent", student: "张牧宇", teacherId: "bing-qin", company: "Tencent", role: "毕业后入职腾讯",
    kind: "first_job", degree: "PhD", graduationYear: 2016, firstJob: "Tencent", source: qinBingStudent, verifiedAt: checkedAt, sector: "industry",
  },
];
