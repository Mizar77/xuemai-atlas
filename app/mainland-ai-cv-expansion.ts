import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-29";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const profile = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "profile",
  checkedAt,
  supports,
});

type ExpansionPerson = Omit<Person, "region" | "category" | "primary" | "lastVerifiedAt" | "facts"> & {
  node: string;
  sources: [Source, Source, ...Source[]];
};

const makePerson = ({ node, ...person }: ExpansionPerson): Person => ({
  ...person,
  region: "Mainland China",
  category: "core",
  primary: true,
  status: person.status ?? "current PI",
  lastVerifiedAt: checkedAt,
  facts: [
    { label: "现职", value: person.role, source: person.sources[0] },
    { label: "研究主题", value: person.area, source: person.sources[0] },
    { label: "公开研究节点", value: node, source: person.sources[1] },
  ],
});

const thuFaculty = official(
  "Tsinghua CS full-time faculty directory",
  "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm",
  "Current department appointment",
);
const pkuVisualFaculty = official(
  "PKU Institute for Visual Technology faculty directory",
  "https://cs.pku.edu.cn/English/People/Faculty/By_Institute/Institute_for_Visual_Technology.htm",
  "Current appointment and research interests",
);
const casVisionAdvisers = official(
  "CAS Institute of Automation adviser directory",
  "https://www.ia.cas.cn/yjsjy/dsjj/index.html",
  "Current computer-vision advisers",
);
const hitAiFaculty = official(
  "HIT School of AI faculty directory",
  "https://sai.hit.edu.cn/zrjs/list.htm",
  "Current appointment and research interests",
);

export const mainlandAiCvPeople: Person[] = [
  makePerson({
    id: "jun-zhu-thu", name: "朱军", role: "博世人工智能冠名教授 · 清华大学人工智能研究院副院长", institution: "THU",
    area: "机器学习 · 贝叶斯方法 · 深度学习 · AI 安全", tags: ["机器学习", "贝叶斯学习", "深度学习", "AI 安全"],
    summary: "清华机器学习与人工智能方向资深 PI，研究概率学习、对抗学习与可信人工智能，并建设开源概率编程和强化学习系统。",
    node: "清华大学人工智能研究院与机器学习研究组", stage: "senior", x: 240, y: 150,
    sources: [
      official("清华计算机系朱军主页", "https://www.cs.tsinghua.edu.cn/info/1121/3551.htm", "Current title, education, research and systems"),
      thuFaculty,
    ],
  }),
  makePerson({
    id: "junliang-xing-thu", name: "邢俊亮", role: "教授", institution: "THU",
    area: "计算机视觉 · 多模态感知 · 博弈交互学习", tags: ["计算机视觉", "多模态", "智能决策", "博弈学习"],
    summary: "从目标检测、跟踪和识别延伸到多模态态势感知与博弈交互决策的清华计算机系 PI。",
    node: "清华人机交互与媒体集成研究所", stage: "senior", x: 240, y: 205,
    sources: [
      official("Tsinghua CS Junliang Xing profile", "https://www.cs.tsinghua.edu.cn/csen/info/1306/4423.htm", "Current appointment, career and research fields"),
      profile("Junliang Xing research-group profile", "https://pi.cs.tsinghua.edu.cn/lab/people/jlxing/en/", "Research group and current interests"),
      thuFaculty,
    ],
  }),

  makePerson({
    id: "yizhou-wang-pku", name: "王亦洲", role: "博雅特聘教授 · 前沿计算研究中心副主任", institution: "PKU",
    area: "计算机视觉 · 认知计算 · 医学影像 · 计算艺术", tags: ["计算机视觉", "认知计算", "医学影像", "多模态"],
    summary: "北京大学视觉与认知计算资深 PI，研究从视觉感知、医学影像扩展到主动视觉和通用智能建模。",
    node: "PKU CVDA Lab / 前沿计算研究中心", stage: "senior", x: 530, y: 150,
    sources: [
      official("PKU CFCS Wang Yizhou profile", "https://cfcs.pku.edu.cn/people/faculty/yizhouwang/", "Current title, biography and research interests"),
      official("PKU CVDA Lab", "https://cfcs.pku.edu.cn/research/research_labs/42cfcs238405.htm", "Laboratory leadership and research programme"),
      pkuVisualFaculty,
    ],
  }),
  makePerson({
    id: "boxin-shi-pku", name: "施柏鑫", role: "长聘副教授 · 研究员", institution: "PKU",
    area: "计算摄影 · 神经形态视觉 · 生成式 AI · 具身智能", tags: ["计算摄影", "神经形态视觉", "生成式 AI", "具身智能"],
    summary: "以计算摄影和视觉感知为基础，向生成式视觉、事件相机与具身智能延展的北大独立 PI。",
    node: "北京大学视觉技术研究所", stage: "emerging", x: 530, y: 205,
    sources: [
      pkuVisualFaculty,
      profile("Boxin Shi public homepage", "https://shiboxin.github.io/", "Current appointment, publications and research topics"),
    ],
  }),
  makePerson({
    id: "yiwu-zhong-pku", name: "钟亦武", role: "助理教授", institution: "PKU",
    area: "视觉语言学习 · 多模态大模型 · 智能体 · 三维空间推理", tags: ["视觉语言", "多模态大模型", "智能体", "三维视觉"],
    summary: "北京大学智能学院新生代独立 PI，聚焦视觉语言、多模态基础模型、三维推理与具身机器人。",
    node: "北京大学智能学院", stage: "emerging", x: 530, y: 260,
    sources: [
      official("北京大学智能学院专职教师名录", "https://www.cis.pku.edu.cn/szdw/zzjs/1.htm", "Current title and research fields"),
      profile("Yiwu Zhong public homepage", "https://yiwuzhong.github.io/", "Current research programme and publications"),
    ],
  }),

  makePerson({
    id: "tieniu-tan-cas", name: "谭铁牛", role: "研究员 · 智能感知与计算研究中心主任", institution: "CAS-IA",
    area: "模式识别 · 计算机视觉 · 生物特征识别 · 视频理解", tags: ["模式识别", "计算机视觉", "生物识别", "视频理解"],
    summary: "中科院自动化所模式识别与视觉方向代表性资深学者，长期研究生物识别、图像视频理解和内容安全。",
    node: "多模态人工智能系统全国重点实验室", stage: "senior", x: 530, y: 670,
    sources: [
      official("中科院自动化所谭铁牛主页", "https://ia.cas.cn/rcdw/jcqn/202404/t20240422_7129881.html", "Current appointment, biography and research directions"),
      casVisionAdvisers,
    ],
  }),
  makePerson({
    id: "liang-wang-cas", name: "王亮", role: "研究员 · 全国重点实验室副主任", institution: "CAS-IA",
    area: "计算机视觉 · 模式识别 · 机器学习 · 多模态语义理解", tags: ["计算机视觉", "模式识别", "机器学习", "多模态"],
    summary: "中科院自动化所视觉与多模态方向资深 PI，研究行为识别、跨模态匹配和复杂场景语义理解。",
    node: "多模态人工智能系统全国重点实验室", stage: "senior", x: 530, y: 725,
    sources: [
      official("中科院自动化所王亮主页", "https://www.ia.cas.cn/rcdw/yjy/202404/t20240422_7129880.html", "Current title, laboratory role and research directions"),
      casVisionAdvisers,
    ],
  }),
  makePerson({
    id: "zhenan-sun-cas", name: "孙哲南", role: "研究员", institution: "CAS-IA",
    area: "生物特征识别 · 模式识别 · 计算机视觉", tags: ["生物识别", "模式识别", "计算机视觉", "人脸识别"],
    summary: "长期研究虹膜、人脸等生物特征识别和视觉模式分析，并推动相关技术产业化的中科院自动化所 PI。",
    node: "模式识别实验室", stage: "senior", x: 530, y: 780,
    sources: [
      official("中科院自动化所孙哲南主页", "https://www.ia.cas.cn/rcdw/qch/202404/t20240422_7129879.html", "Current appointment, research and technology transfer"),
      official("中科院自动化所模式识别实验室", "https://www.ia.cas.cn/jgsz/kyxt/ZNGZ/", "Laboratory scope and research directions"),
      casVisionAdvisers,
    ],
  }),

  makePerson({
    id: "cewu-lu-sjtu", name: "卢策吾", role: "教授 · 人工智能学院副院长", institution: "SJTU",
    area: "计算机视觉 · 机器人学习 · 具身智能", tags: ["计算机视觉", "机器人学习", "具身智能", "多模态感知"],
    summary: "上海交大具身智能与机器人学习方向核心 PI，研究视觉感知、机器人操作和跨模态具身数据。",
    node: "SJTU MVIG / 具身智能研究团队", stage: "senior", x: 1110, y: 670,
    sources: [
      official("上海交大卢策吾教师简介", "https://dnastorage.sjtu.edu.cn/info/1053/1168.htm", "Current appointment, career and research directions"),
      profile("SJTU MVIG Lab", "https://mvig.sjtu.edu.cn/", "Research group and current projects"),
    ],
  }),
  makePerson({
    id: "yanfeng-wang-sjtu", name: "王延峰", role: "教授 · 人工智能学院执行院长", institution: "SJTU",
    area: "人工智能 · 计算机视觉 · 医疗影像 · 媒体智能", tags: ["计算机视觉", "医疗影像", "媒体智能", "产学研"],
    summary: "连接媒体智能、医疗人工智能和成果转化的上海交大资深 PI 与学院组织节点。",
    node: "SJTU MediaBrain / 人工智能学院", stage: "senior", x: 1110, y: 725,
    sources: [
      official("上海交大人工智能学院王延峰主页", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/wangyanfeng", "Current title, leadership and research profile"),
      profile("Wang Yanfeng public homepage", "https://cmic.sjtu.edu.cn/wangyanfeng/", "Projects, publications and awards"),
      official("SJTU MediaBrain team", "https://mediabrain.sjtu.edu.cn/join-us/", "Research group and topics"),
    ],
  }),
  makePerson({
    id: "guangtao-zhai-sjtu", name: "翟广涛", role: "教授 · 上海人工智能实验室双聘研究员", institution: "SJTU",
    area: "多媒体智能 · 视觉质量评价 · 感知计算", tags: ["多媒体", "视觉质量", "感知计算", "数字人"],
    summary: "上海交大多媒体智能方向资深 PI，研究视觉质量、感知计算、视频处理与虚拟现实。",
    node: "图像所多媒体实验室", stage: "senior", x: 1110, y: 780,
    sources: [
      official("上海交大计算机学院翟广涛主页", "https://cs.sjtu.edu.cn/jzhspjs/1360.html", "Current appointment and research profile"),
      official("上海交大图像所多媒体实验室", "https://multimedia.sjtu.edu.cn/index.php?a=index&c=Lists&m=home&tid=13", "Faculty team and research topics"),
    ],
  }),

  makePerson({
    id: "fei-wu-zju", name: "吴飞", role: "教授 · 博士生导师", institution: "ZJU",
    area: "人工智能 · 跨媒体计算 · 多媒体分析与检索", tags: ["人工智能", "跨媒体", "多媒体检索", "视觉语言"],
    summary: "浙江大学跨媒体智能与多媒体分析方向资深 PI，覆盖视觉、语言和跨媒体语义建模。",
    node: "浙江大学人工智能学院", stage: "senior", x: 240, y: 1190,
    sources: [
      official("浙江大学吴飞中文主页", "https://person.zju.edu.cn/wufei", "Current appointment, leadership and research directions"),
      official("Zhejiang University Wu Fei profile", "https://person.zju.edu.cn/person/en/wufei", "Current appointment and research directions"),
    ],
  }),
  makePerson({
    id: "deng-cai-zju", name: "蔡登", role: "教授 · 博士生导师", institution: "ZJU",
    area: "机器学习 · 数据挖掘 · 计算机视觉", tags: ["机器学习", "数据挖掘", "计算机视觉", "表征学习"],
    summary: "浙江大学机器学习与数据挖掘资深 PI，研究低维表征、视觉识别和大规模数据分析。",
    node: "浙江大学计算机学院", stage: "senior", x: 240, y: 1245,
    sources: [
      official("浙江大学蔡登中文主页", "https://person.zju.edu.cn/0009217", "Current title and research directions"),
      official("Zhejiang University Deng Cai profile", "https://person.zju.edu.cn/en/dengcai", "Current appointment and research directions"),
    ],
  }),
  makePerson({
    id: "jiajun-bu-zju", name: "卜佳俊", role: "教授 · 博士生导师", institution: "ZJU",
    area: "智能媒体计算 · 多模态大模型 · 智能体", tags: ["多模态大模型", "智能媒体", "智能体", "信息无障碍"],
    summary: "浙江大学智能媒体方向资深 PI，研究多模态大模型、智能体和信息无障碍计算。",
    node: "浙江大学计算机学院智能媒体团队", stage: "senior", x: 240, y: 1300,
    sources: [
      official("浙江大学卜佳俊中文主页", "https://person.zju.edu.cn/bjj/0.html", "Current appointment, leadership and research directions"),
      official("Zhejiang University Jiajun Bu profile", "https://person.zju.edu.cn/en/bjj", "Current appointment and research topics"),
    ],
  }),

  makePerson({
    id: "xiangyang-xue-fdu", name: "薛向阳", role: "教授 · 类脑智能研究院副院长", institution: "FDU",
    area: "计算机视觉 · 多媒体内容分析 · 类脑智能 · 机器学习", tags: ["计算机视觉", "多媒体", "类脑智能", "深度学习"],
    summary: "复旦视觉、多媒体与类脑智能方向资深 PI，研究视频图像理解、自动驾驶和服务机器人视觉。",
    node: "复旦类脑智能科学与技术研究院", stage: "senior", x: 820, y: 150,
    sources: [
      official("复旦类脑智能研究院薛向阳主页", "https://istbi.fudan.edu.cn/info/1774/4602.htm", "Current title, institute role and research directions"),
      official("复旦 IIPL 薛向阳主页", "https://iipl.fudan.edu.cn/70/cc/c45863a684236/page.htm", "Current appointment and research programme"),
    ],
  }),
  makePerson({
    id: "zuxuan-wu-fdu", name: "吴祖煊", role: "教授 · 智能机器人与先进制造创新学院副院长", institution: "FDU",
    area: "计算机视觉 · 深度学习 · 视频理解", tags: ["计算机视觉", "视频理解", "深度学习", "智能机器人"],
    summary: "复旦新生代视觉 PI，长期研究视频理解、视觉表征和深度学习，并连接智能机器人方向。",
    node: "复旦 IIPL / 智能机器人与先进制造创新学院", stage: "emerging", x: 820, y: 205,
    sources: [
      official("复旦 IIPL 吴祖煊主页", "https://iipl.fudan.edu.cn/7f/c1/c45855a688065/page.htm", "Current title, institute role and research profile"),
      official("复旦计算机学院吴祖煊主页", "https://cs.fudan.edu.cn/52/f7/c25906a348919/page.htm", "Current appointment and personal profile"),
    ],
  }),

  makePerson({
    id: "zhihua-zhou-nju", name: "周志华", role: "教授 · 南京大学副校长", institution: "NJU",
    area: "人工智能 · 机器学习 · 数据挖掘", tags: ["机器学习", "数据挖掘", "集成学习", "学件"],
    summary: "南京大学 LAMDA 学术带头人，研究机器学习、数据挖掘与学件，是大陆通用机器学习的重要资深节点。",
    node: "LAMDA 机器学习与数据挖掘研究所", stage: "senior", x: 820, y: 670,
    sources: [
      official("南京大学周志华中文简历", "https://cs.nju.edu.cn/zhouzh/zhouzh.files/resume_cn.htm", "Current title, leadership and research fields"),
      profile("LAMDA Zhou Zhihua homepage", "https://www.lamda.nju.edu.cn/zhouzh/", "Research group, publications and students"),
    ],
  }),
  makePerson({
    id: "jianxin-wu-nju", name: "吴建鑫", role: "教授 · 博士生导师", institution: "NJU",
    area: "机器学习 · 计算机视觉 · 资源受限视觉学习", tags: ["计算机视觉", "机器学习", "高效学习", "场景理解"],
    summary: "南京大学视觉与机器学习 PI，关注资源受限条件下的大规模学习、目标识别和场景理解。",
    node: "南京大学人工智能学院", stage: "senior", x: 820, y: 725,
    sources: [
      profile("南京大学吴建鑫中文主页", "https://cs.nju.edu.cn/wujx/Chinese.html", "Current appointment, career and research programme"),
      official("南京大学人工智能学院", "https://ai.nju.edu.cn/", "Current institutional home"),
    ],
  }),
  makePerson({
    id: "tong-lu-nju", name: "路通", role: "教授 · 计算机学院副院长", institution: "NJU",
    area: "模式识别 · 计算机视觉 · 自动驾驶视觉", tags: ["计算机视觉", "模式识别", "自动驾驶", "视觉学习"],
    summary: "南京大学计算机视觉资深 PI，研究目标检测、视觉识别和自动驾驶，并长期承担视觉人才培养。",
    node: "计算机软件新技术全国重点实验室", stage: "senior", x: 820, y: 780,
    sources: [
      official("南京大学路通教师主页", "https://cs.nju.edu.cn/58/01/c2639a153601/pagem.htm", "Current appointment, leadership and research direction"),
      profile("Tong Lu public homepage", "https://cs.nju.edu.cn/tonglu/", "Research group and publications"),
    ],
  }),

  makePerson({
    id: "houqiang-li-ustc", name: "李厚强", role: "教授 · 博士生导师", institution: "USTC",
    area: "计算机视觉 · 图像处理 · 强化学习 · 多媒体检索", tags: ["计算机视觉", "多媒体", "强化学习", "机器博弈"],
    summary: "中国科大视觉与多媒体方向资深 PI，研究图像视频、检索、强化学习和机器博弈。",
    node: "多媒体计算与通信教育部—微软重点实验室", stage: "senior", x: 530, y: 1190,
    sources: [
      official("中国科大李厚强教师主页", "https://faculty.ustc.edu.cn/lihouqiang/zh_CN/index.htm", "Current appointment, laboratory and research directions"),
      official("中国科大电子工程系李厚强简介", "https://eeis.ustc.edu.cn/2010/0825/c2648a21007/page.htm", "Career, research programme and projects"),
    ],
  }),
  makePerson({
    id: "enhong-chen-ustc", name: "陈恩红", role: "讲席教授 · 认知智能全国重点实验室副主任", institution: "USTC",
    area: "机器学习 · 数据挖掘 · 推荐系统 · 智能教育", tags: ["机器学习", "数据挖掘", "推荐系统", "智能教育"],
    summary: "中国科大数据智能资深 PI，研究推荐、教育智能、社会网络和大数据机器学习。",
    node: "认知智能全国重点实验室 / 大数据分析团队", stage: "senior", x: 530, y: 1245,
    sources: [
      official("中国科大计算机学院陈恩红主页", "https://cs.ustc.edu.cn/2020/0806/c23235a460077/page.htm", "Current title, laboratory roles and research directions"),
      official("中国科大陈恩红教师主页", "https://faculty.ustc.edu.cn/chenenhong/zh_CN/jsxx/184937/jsxx/jsxx.htm", "Current appointment and institutional role"),
    ],
  }),

  makePerson({
    id: "junjun-jiang-hit", name: "江俊君", role: "长聘教授 · 人工智能学院副院长", institution: "HIT",
    area: "图像视频处理 · 计算机视觉 · 深度学习", tags: ["计算机视觉", "图像处理", "视频理解", "深度学习"],
    summary: "哈工大图像视频与视觉学习方向独立 PI，研究低层视觉、视频理解和智能人机接口。",
    node: "智能接口与人机交互研究中心", stage: "emerging", x: 240, y: 670,
    sources: [
      official("哈工大江俊君教师主页", "https://homepage.hit.edu.cn/jiangjunjun", "Current title and research directions"),
      hitAiFaculty,
    ],
  }),
  makePerson({
    id: "chen-zhao-hit", name: "赵琛", role: "教授 · 博士生导师", institution: "HIT",
    area: "视频理解 · 视频生成 · 多模态大模型 · 高效神经网络", tags: ["计算机视觉", "视频生成", "多模态大模型", "高效网络"],
    summary: "哈工大（深圳）新生代视觉 PI，聚焦长视频理解、生成式视频、多模态基础模型和高效网络。",
    node: "哈工大（深圳）计算机科学与技术学院", stage: "emerging", x: 240, y: 725,
    sources: [
      official("哈工大赵琛教师主页", "https://homepage.hit.edu.cn/zhaochen", "Current appointment, education and research directions"),
      profile("Chen Zhao public homepage", "https://www.zhao-chen.com/", "Research programme and publications"),
    ],
  }),
];

// These arrays intentionally remain empty until a public page explicitly names
// the relationship, advisee, or destination. Co-authorship and affiliation alone
// are not treated as evidence of supervision or placement.
export const mainlandAiCvRelationships: Relationship[] = [];
export const mainlandAiCvPlacements: StudentPlacement[] = [];
export const mainlandAiCvGroupMembers: GroupMember[] = [];
