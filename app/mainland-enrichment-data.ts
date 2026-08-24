import type { GroupMember, IndustryPathway, Person, Relationship, Source, StudentPlacement } from "./data";

const official = (label: string, url: string): Source => ({ label, url, kind: "official" });
const profile = (label: string, url: string): Source => ({ label, url, kind: "profile" });

const tangProfile = profile("唐杰 KEG 主页（学生与成果）", "https://keg.cs.tsinghua.edu.cn/persons/jietang/index.html");
const tangEducation = official("清华人工智能国际治理研究院", "https://aiig.tsinghua.edu.cn/info/2797/2176.htm");
const tangThesisQiu = official("清华学位论文：裘捷中", "https://newetds.lib.tsinghua.edu.cn/qh/paper/summary?dbCode=ETDQH&sysId=273307");
const cheProfile = official("哈工大 SCIR：车万翔", "https://ir.hit.edu.cn/_s334/2024/1021/c19599a356042/page.psp");
const cheThesis = official("哈工大优秀博士论文公示", "https://hitgs.hit.edu.cn/2025/0928/c17455a379037/page.htm");
const sunProfile = official("清华教师主页：孙茂松", "https://www.cs.tsinghua.edu.cn/info/1121/3554.htm");
const liuProfile = official("哈工大 SCIR：刘挺履历", "https://ir.hit.edu.cn/19589/list76.htm");
const wenProfile = official("人大 DEKE：文继荣", "https://deke.ruc.edu.cn/kytd/xsdtr/340049a15927468a9e1205fd9521e0d0.htm");
const dongProfile = official("人大高瓴：董冠霆", "https://ai.ruc.edu.cn/newslist/newsdetail/20260203.html");
const zongProfile = official("中科院自动化所：宗成庆", "https://ia.cas.cn/rcdw/yjy/202404/t20240425_7131828.html");
const wangProfile = official("北大教师主页：王厚峰", "https://eecs.pku.edu.cn/xxkxjsxy/info/1501/6749.htm");
const chenProfile = official("南京大学教师主页：陈家骏", "https://cs.nju.edu.cn/58/22/c2639a153634/pagem.htm");
const yuProfile = official("上海交大教师主页：俞凯", "https://www.cs.sjtu.edu.cn/jiaoshiml/yukai.html");
const yuAdvisor = official("上海交大：俞凯学术与创业经历", "https://www.seiee.sjtu.edu.cn/index_news/2554.html");
const huangProfile = official("北京理工大学教师主页：黄河燕", "https://cs.bit.edu.cn/szdw/jsml/bssds/172f42bb4b8742ce8d91e88e2680b0b0.htm");
const zhouProfile = official("华东师范大学教师主页：周爱民", "https://faculty.ecnu.edu.cn/_s16/zam/main.psp");

export type MainlandPersonEnhancement = Partial<Pick<Person, "summary" | "tags" | "facts" | "sources">>;

export const mainlandPersonEnhancements: Record<string, MainlandPersonEnhancement> = {
  "jie-tang-thu": {
    summary: "清华计算机系 WeBank 讲席教授、基础模型研究中心主任和 KEG 核心 PI，横跨 AMiner 学术知识图谱、社会网络挖掘与 GLM/ChatGLM 基础模型；智谱 AI 联合创始人。个人主页同时公开了博士生、博士后和多批学生去向。",
    tags: ["ACM Fellow", "AAAI Fellow", "IEEE Fellow", "AMiner", "学生谱系"],
    facts: [
      { label: "教育", value: "2006 年获清华大学计算机科学与技术博士", source: tangEducation },
      { label: "学术身份", value: "ACM、AAAI、IEEE Fellow；国家杰青", source: tangProfile },
      { label: "代表平台", value: "AMiner；GLM-130B、ChatGLM、CogView/CogVideo、CodeGeeX", source: tangProfile },
      { label: "培养谱系", value: "主页逐项列出博士后、博士生、硕士生及部分毕业去向", source: tangProfile },
    ],
    sources: [tangProfile, tangEducation],
  },
  "wanxiang-che": {
    summary: "哈工大人工智能研究院副院长、自然语言处理研究所副所长和 SCIR 语言分析组负责人。研究从词法、句法、语义分析延伸到预训练模型与大模型；LTP 已被 600 余家机构共享，并授权百度、腾讯等使用。",
    tags: ["Stanford", "Baidu", "MSRA", "IBM CRL", "I²R"],
    facts: [
      { label: "教育", value: "哈工大计算机本科（2002）与博士（2008）", source: cheProfile },
      { label: "海外经历", value: "2012–2013 年访问 Stanford NLP Group", source: cheProfile },
      { label: "产业经历", value: "曾访问百度，并在 I²R、IBM 中国研究院、微软亚洲研究院实习", source: cheProfile },
      { label: "技术平台", value: "LTP 被 600 余家机构共享，授权百度、腾讯等使用", source: cheProfile },
      { label: "人才培养", value: "徐啸的博士论文入选哈工大 2025 年校优秀博士论文", source: cheThesis },
    ],
    sources: [cheProfile],
  },
  "maosong-sun": {
    summary: "清华基础模型研究中心首席科学家、THUNLP 资深带头人。长期推进中文分词、中文信息处理标准、计算人文与大模型研究，并主持建设学堂在线和古典诗词生成系统“九歌”。",
    tags: ["CityU PhD", "ISO 标准", "学堂在线", "九歌", "计算人文"],
    facts: [
      { label: "教育", value: "清华计算机本科、硕士；香港城市大学计算语言学博士（2004）", source: sunProfile },
      { label: "标准建设", value: "主持研制并发布语言资源管理相关 ISO 国际标准", source: sunProfile },
      { label: "教育平台", value: "2013 年率队设计并实现学堂在线", source: sunProfile },
      { label: "计算人文", value: "2015 年领衔研制中国古典诗词写作系统“九歌”", source: sunProfile },
    ],
    sources: [sunProfile],
  },
  "ting-liu-hit": {
    summary: "哈工大副校长、自然语言处理研究所所长与国家语言技术和数字经济研究中心主任，早年组建信息检索研究室，长期领导 SCIR 的自然语言处理、社会计算、认知安全与大模型研究。",
    tags: ["MSRA", "SCIR 创建", "国家语言技术中心", "学生谱系"],
    facts: [
      { label: "教育", value: "1989–1998 年就读哈工大计算机系，获计算机应用技术博士", source: liuProfile },
      { label: "早期任职", value: "博士毕业后进入微软中国研究院，2000 年回哈工大任教", source: liuProfile },
      { label: "团队建设", value: "2001 年组建信息检索研究室，后发展为 SCIR 主线", source: liuProfile },
    ],
    sources: [liuProfile],
  },
  "jirong-wen": {
    summary: "人大高瓴人工智能学院执行院长，研究信息检索、搜索、数据挖掘与大模型。1999–2013 年在微软亚洲研究院任职并领导互联网搜索与数据挖掘组，相关成果进入 Bing、微软学术搜索和人立方。",
    tags: ["MSRA 14年", "Bing", "微软学术搜索", "人才培养导师组"],
    facts: [
      { label: "教育", value: "人大计算机本科、硕士；中科院计算所博士（1999）", source: wenProfile },
      { label: "产业履历", value: "微软亚洲研究院 14 年，曾任互联网搜索与数据挖掘组主任", source: wenProfile },
      { label: "产品转化", value: "研究进入 Bing，并领导开发微软学术搜索、人立方等系统", source: wenProfile },
      { label: "人才培养", value: "与窦志成共同指导董冠霆，方向为智能检索与智能体强化学习", source: dongProfile },
    ],
    sources: [wenProfile, dongProfile],
  },
  "chengqing-zong": {
    summary: "中科院自动化所研究员，长期研究自然语言处理、机器翻译、语言认知计算与人机对话；曾任模式识别国家重点实验室副主任，并于 2025 年担任 ACL 主席、当选欧洲科学院外籍院士。",
    tags: ["ACL President 2025", "ACL Fellow", "IEEE Fellow", "ATR", "IMAG"],
    facts: [
      { label: "教育与博士后", value: "中科院计算所博士（1998）；自动化所博士后（1998–2000）", source: zongProfile },
      { label: "国际经历", value: "日本 ATR 客座研究员（1999、2001）；法国 IMAG 高访（2004）", source: zongProfile },
      { label: "组织任职", value: "模式识别国家重点实验室副主任（2006–2014）", source: zongProfile },
      { label: "国际学术领导", value: "ACL 主席（2025）；欧洲科学院外籍院士（2025）", source: zongProfile },
    ],
    sources: [zongProfile],
  },
  "houfeng-wang": {
    summary: "北大计算语言学研究所资深教授，研究问答、对话、观点挖掘和语言资源；团队建设的北大多视图中文树库兼容短语、依存与语义依存视图，并在多家机构和企业使用。",
    tags: ["中文树库", "问答", "对话", "语言资源"],
    facts: [
      { label: "教育", value: "武汉大学本科（1986）、中科院计算所硕士（1989）、武汉大学博士（1998）", source: wangProfile },
      { label: "语言资源", value: "建设北大多视图中文树库，支持三类句法/语义视图", source: wangProfile },
      { label: "应用", value: "相关中文树库已在 20 余家研究机构和企业使用", source: wangProfile },
    ],
    sources: [wangProfile],
  },
  "jiajun-chen-nju": {
    summary: "南京大学 NLP 实验室主任，自 20 世纪 80 年代起从事机器翻译、汉语语言处理和软件工程研究，是 NJUNLP 资深组织节点，并长期参与人才培养和系统建设。",
    tags: ["NJUNLP 主任", "机器翻译", "汉语处理", "1980s"],
    facts: [
      { label: "教育", value: "南京大学计算机软件专业学士、硕士、博士", source: chenProfile },
      { label: "研究历程", value: "自 20 世纪 80 年代开始从事 NLP 与系统开发", source: chenProfile },
      { label: "组织节点", value: "南京大学自然语言处理实验室主任", source: chenProfile },
    ],
    sources: [chenProfile],
  },
  "kai-yu-sjtu": {
    summary: "上海交大机器智能研究所所长、X-LANCE 创建者，研究语音、语言理解和人机对话；思必驰联合创始人兼首席科学家，连接剑桥语音研究传统、上海交大学术团队与语言计算产业化。",
    tags: ["Cambridge PhD", "Steve Young", "X-LANCE", "VocallQ", "思必驰"],
    facts: [
      { label: "教育", value: "清华自动化本科、硕士；剑桥大学工程系博士（2006）", source: yuProfile },
      { label: "师承", value: "剑桥博士阶段导师为语音识别学者 Steve Young", source: yuAdvisor },
      { label: "团队建设", value: "2012 年在上海交大创建 SpeechLab，后扩展为 X-LANCE", source: yuProfile },
      { label: "产业转化", value: "共同创办 VocallQ 与思必驰，现任思必驰首席科学家", source: yuAdvisor },
    ],
    sources: [yuProfile, yuAdvisor],
  },
  "heyan-huang-bit": {
    summary: "北理工特聘教授、语言智能处理与内容安全工信部重点实验室主任，研究语言信息处理、大模型垂域应用与内容安全；曾任北理工计算机学院院长，并有长期中科院计算所研究经历。",
    tags: ["中科院计算所", "北理工前院长", "垂域大模型", "内容安全"],
    facts: [
      { label: "教育", value: "武汉测绘学院本科、国防科大硕士、中科院计算所博士（1989）", source: huangProfile },
      { label: "任职轨迹", value: "曾在中科院计算所与语言信息工程研究中心任职；2009–2020 年任北理工计算机学院院长", source: huangProfile },
      { label: "团队平台", value: "语言智能处理与内容安全工信部重点实验室主任", source: huangProfile },
      { label: "学生去向概况", value: "官方页列高校科研院所、微软/IBM/Google、百度/阿里/华为/腾讯等去向；暂无完整姓名级清单", source: huangProfile },
    ],
    sources: [huangProfile],
  },
  "aimin-zhou-ecnu": {
    summary: "华东师大上海智能教育研究院院长、上海创智学院全时导师，曾任计算机学院院长。研究从演化优化扩展到大语言模型、智能体系统、智能教育与科学智能。",
    tags: ["Essex PhD", "智能教育", "教育大模型", "演化优化", "上海创智学院"],
    facts: [
      { label: "教育", value: "武汉大学本科、硕士；英国 Essex 大学博士（2009）", source: zhouProfile },
      { label: "博士导师", value: "Qingfu Zhang、Edward Tsang、Yaochu Jin、Bernhard Sendhoff", source: zhouProfile },
      { label: "组织任职", value: "上海智能教育研究院院长；曾任华东师大计算机学院院长", source: zhouProfile },
      { label: "项目", value: "上海市“中国版教育大模型”重大攻关任务负责人", source: zhouProfile },
    ],
    sources: [zhouProfile],
  },
};

export const mainlandEnrichmentRelationships: Relationship[] = [
  { id: "tang-yangyang-student", from: "jie-tang-thu", to: "jie-tang-thu", type: "lineage", label: "博士生：杨洋 → 浙江大学", evidence: "唐杰主页将杨洋列为博士生，并记录其后任浙江大学 Assistant Professor。", source: tangProfile, verified: true },
  { id: "tang-jingzhang-student", from: "jie-tang-thu", to: "jie-tang-thu", type: "lineage", label: "博士生：张静 → 中国人民大学", evidence: "唐杰主页将 Jing Zhang 列为博士生，并记录其后任中国人民大学 Assistant Professor。", source: tangProfile, verified: true },
  { id: "tang-qiujiezhong-student", from: "jie-tang-thu", to: "jie-tang-thu", type: "lineage", label: "博士生：裘捷中", evidence: "清华学位论文系统明确列唐杰为裘捷中博士论文导师。", source: tangThesisQiu, verified: true },
  { id: "che-xuxiao-student", from: "wanxiang-che", to: "wanxiang-che", type: "lineage", label: "博士生：徐啸", evidence: "哈工大学位评定公示列车万翔为徐啸的博士导师，论文入选 2025 年校优秀博士论文。", source: cheThesis, verified: true },
  { id: "che-industry-trajectory", from: "wanxiang-che", to: "wanxiang-che", type: "industry", label: "Baidu / I²R / IBM / MSRA 经历", evidence: "车万翔官方履历逐项记录百度访问及 I²R、IBM 中国研究院、微软亚洲研究院实习经历。", source: cheProfile, verified: true },
  { id: "wen-dong-student", from: "jirong-wen", to: "jirong-wen", type: "lineage", label: "共同指导：董冠霆（与窦志成）", evidence: "人大高瓴官方报道列董冠霆由文继荣、窦志成共同指导。", source: dongProfile, verified: true },
  { id: "yu-steve-young-lineage", from: "kai-yu-sjtu", to: "kai-yu-sjtu", type: "lineage", label: "博士导师：Steve Young", evidence: "上海交大官方报道记录俞凯与剑桥导师 Steve Young 的学术与创业联系。", source: yuAdvisor, verified: true },
  { id: "zhou-essex-lineage", from: "aimin-zhou-ecnu", to: "aimin-zhou-ecnu", type: "lineage", label: "Essex 博士导师组", evidence: "华东师大主页列 Qingfu Zhang、Edward Tsang、Yaochu Jin、Bernhard Sendhoff 为周爱民博士论文导师。", source: zhouProfile, verified: true },
];

export const mainlandEnrichmentGroupMembers: GroupMember[] = [
  { id: "wen-dong-guanting", teacherId: "jirong-wen", name: "董冠霆", role: "2024级博士生 · 与窦志成共同指导", focus: "智能信息检索 · 智能体强化学习", source: dongProfile },
];

export const mainlandEnrichmentStudentPlacements: StudentPlacement[] = [
  { id: "tang-shayuan-baai", student: "Sha Yuan", teacherId: "jie-tang-thu", company: "BAAI", role: "Leader", kind: "reported", highLevel: true, source: tangProfile },
  { id: "tang-yutao-recurrent", student: "Yutao Zhang", teacherId: "jie-tang-thu", company: "Recurrent.ai", role: "CTO", kind: "reported", highLevel: true, source: tangProfile },
  { id: "tang-yuhan-alibaba", student: "Yu Han", teacherId: "jie-tang-thu", company: "Alibaba", role: "公开主页所列去向", kind: "reported", source: tangProfile },
  { id: "tang-muyang-facepp", student: "Mu Yang", teacherId: "jie-tang-thu", company: "Face++", role: "CTO", kind: "reported", highLevel: true, source: tangProfile },
  { id: "tang-wenbin-facepp", student: "Wenbin Tang", teacherId: "jie-tang-thu", company: "Face++", role: "CTO", kind: "reported", highLevel: true, source: tangProfile },
  { id: "tang-zhanpeng-google-ms", student: "方展鹏", teacherId: "jie-tang-thu", company: "Google", department: "US", role: "2016 届硕士去向", kind: "first_job", source: tangProfile },
  { id: "tang-yangyang-zju", student: "杨洋", teacherId: "jie-tang-thu", company: "Zhejiang University", role: "Assistant Professor（主页记录）", kind: "reported", source: tangProfile },
  { id: "tang-jingzhang-ruc", student: "Jing Zhang", teacherId: "jie-tang-thu", company: "Renmin University of China", role: "Assistant Professor（主页记录）", kind: "reported", source: tangProfile },
  { id: "wen-dong-bytedance", student: "董冠霆", teacherId: "jirong-wen", company: "ByteDance", department: "Seed", role: "Research intern · 与窦志成共同指导", kind: "internship", source: dongProfile },
  { id: "wen-dong-alibaba", student: "董冠霆", teacherId: "jirong-wen", company: "Alibaba", department: "Qwen", role: "Research intern · 与窦志成共同指导", kind: "internship", source: dongProfile },
  { id: "wen-dong-kuaishou", student: "董冠霆", teacherId: "jirong-wen", company: "Kuaishou", department: "Kwai Large Model", role: "Research intern · 与窦志成共同指导", kind: "internship", source: dongProfile },
];

export const mainlandEnrichmentIndustryPathways: IndustryPathway[] = [
  { id: "cn-hit-che-trajectory", region: "Mainland China", kind: "RESEARCH MOBILITY + TECH TRANSFER", title: "车万翔 / LTP ↔ Stanford、Baidu、I²R、IBM、MSRA", description: "车万翔履历串联 Stanford NLP、百度访问与三家研究机构实习；LTP 随后被 600 余家机构共享，并授权百度、腾讯等使用。", source: cheProfile },
  { id: "cn-ruc-wen-msra", region: "Mainland China", kind: "INDUSTRY-TO-ACADEMIA", title: "文继荣 ↔ Microsoft Research Asia / Bing", description: "文继荣在 MSRA 任职 14 年并领导互联网搜索与数据挖掘组，相关成果进入 Bing、微软学术搜索与人立方；2013 年回到人大任教。", source: wenProfile },
];
