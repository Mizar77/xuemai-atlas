import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, sourceItem: Source) => ({ label, value, source: sourceItem });

const sources = {
  sjtuCsRoster: source("上海交通大学计算机学院 · 教师名录", "https://www.cs.sjtu.edu.cn/jiaoshiml.html", "official", "现任教师名录"),
  weinanOfficial: source("上海交通大学计算机学院 · 张伟楠", "https://www.cs.sjtu.edu.cn/jiaoshiml/zhangweinan.html", "official", "现任教授、教育背景、研究与工作履历"),
  weinanHome: source("张伟楠 · 个人主页", "https://wnzhang.net/", "profile", "现任任职、教育、研究、招生与代表论文"),
  weinanUcl: source("UCL Computer Science · Weinan Zhang", "https://www0.cs.ucl.ac.uk/staff/Weinan.Zhang/", "official", "博士阶段及 Jun Wang、Stephen Robertson 共同指导关系"),

  sjtuAiRoster: source("上海交通大学人工智能学院 · 专职教师", "https://sai.sjtu.edu.cn/cn/faculty/zzjs", "official", "现任专职教师名录"),
  songhuaOfficial: source("上海交通大学人工智能学院 · 刘松桦", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/liusonghua", "official", "现任助理教授、博士学位与研究方向"),
  songhuaHome: source("Songhua Liu · Go-There Lab", "https://huage001.github.io/", "profile", "博士导师、研究实习、研究方向与招生信息"),
  linfengOfficial: source("上海交通大学人工智能学院 · 张林峰", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/zhanglinfeng", "official", "现任助理教授与官方头像"),
  linfengZhiyuan: source("上海交通大学致远学院 · Linfeng Zhang", "https://en.zhiyuan.sjtu.edu.cn/en/faculty/958/detail", "official", "现任任职、博士教育与研究方向"),
  linfengHome: source("张林峰 · EPIC Lab", "https://www.zhanglinfeng.tech/index_chinese.html", "profile", "独立实验室、学生名单、研究与学生实习去向"),
  linfengCv: source("Linfeng Zhang · CV", "https://www.zhanglinfeng.tech/assets/images/CV-new.pdf", "cv", "教育经历、博士导师与独立 PI 任职"),

  pkuRoster: source("北京大学计算机学院 · 教研系列名录", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "现任教师名录"),
  cuiOfficial: source("北京大学计算机学院 · 崔斌", "https://cs.pku.edu.cn/info/1062/1608.htm", "official", "现任教授、研究方向、学术职务与产业合作"),
  cuiHome: source("Bin Cui · 个人主页", "https://cuibinpku.github.io/", "profile", "教育、现任职务、研究与工业合作"),
  cuiStudents: source("Bin Cui · Students", "https://cuibinpku.github.io/student.html", "profile", "在读学生、毕业生与公开职业去向"),

  thuAutoRoster: source("清华大学自动化系 · 教师队伍", "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm", "official", "现任教师名录"),
  daiOfficial: source("清华大学自动化系 · 戴琼海", "https://www.au.tsinghua.edu.cn/info/1080/3225.htm", "official", "现任教授与研究方向"),
  daiLab: source("清华大学成像与智能技术实验室 · 戴琼海", "https://media.au.tsinghua.edu.cn/cn/info/1009/1112.htm", "official", "院士身份、实验室领导与研究方向"),
  daiFeature: source("清华大学 · 戴琼海团队", "https://www.tsinghua.edu.cn/info/1181/52952.htm", "official", "博士教育、清华任职轨迹与团队研究"),
  daiThesisList: source("清华大学 · 北京市优秀博士学位论文名单", "https://www.tsinghua.edu.cn/jxjywj/qinghuadaxuelinianruxuanbeijingshiyouxiuboshixueweilunwenmingdan2025.pdf", "official", "曹汛博士论文及导师戴琼海"),
};

const portrait = (file: string, name: string, url: string, sourceItem: Source) => ({
  src: `portraits/candidate-p0-mainland-tail-batch-1-2026/${file}`,
  alt: `${name} 官方或本人主页头像`,
  source: { ...sourceItem, label: `${sourceItem.label} · portrait`, url, supports: "人物头像" },
});

export const candidatePriorityP0MainlandTailBatch1People2026: Person[] = [
  {
    id: "weinan-zhang-sjtu-p0-tail-b1",
    name: "张伟楠",
    role: "Professor · PhD Advisor · Assistant to the Dean",
    institution: "SJTU",
    region: "Mainland China",
    area: "Reinforcement Learning · Agentic AI · Embodied AI",
    tags: ["强化学习", "智能体", "决策大模型", "具身智能"],
    summary: "从计算广告与推荐系统延伸到强化学习、智能体和具身智能，并持续建设决策智能研究体系的上海交大教授。",
    category: "core",
    status: "current independent PI · official faculty and personal profiles verified",
    stage: "senior",
    primary: true,
    x: 160,
    y: 160,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: portrait("weinan-zhang.png", "张伟楠", "https://www.cs.sjtu.edu.cn/upload/image/20251009/20251009122003.png", sources.weinanHome),
    sources: [sources.weinanOfficial, sources.weinanHome, sources.weinanUcl],
    facts: [
      fact("当前任职", "上海交通大学计算机学院教授、博士生导师、院长助理。", sources.weinanHome),
      fact("教育与学术训练", "2011 年获上海交通大学 ACM 班学士，2016 年获 UCL 计算机博士。", sources.weinanOfficial),
      fact("博士师承", "UCL 主页明确记录博士阶段由 Jun Wang 与 Stephen Robertson 共同指导。", sources.weinanUcl),
      fact("研究主线", "研究强化学习、智能体、具身智能与决策大模型。", sources.weinanOfficial),
      fact("人才培养", "个人主页公开招收智能体、强化学习、机器人学习等方向博士生。", sources.weinanHome),
    ],
  },
  {
    id: "songhua-liu-sjtu-p0-tail-b1",
    name: "刘松桦",
    role: "Assistant Professor · PhD Advisor",
    institution: "SJTU",
    region: "Mainland China",
    area: "Generative AI · Synthetic Data · Efficient Deep Learning",
    tags: ["生成式AI", "合成数据", "AIGC", "高效学习"],
    summary: "围绕生成式 AI 与合成数据驱动训练建设 Go-There Lab 的上海交大青年独立 PI。",
    category: "core",
    status: "current independent PI · official faculty and personal profiles verified",
    stage: "emerging",
    primary: true,
    x: 320,
    y: 160,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: portrait("songhua-liu.jpg", "刘松桦", "https://sai.sjtu.edu.cn/Upload/Faculty/liusonghua.jpg", sources.songhuaOfficial),
    sources: [sources.songhuaOfficial, sources.songhuaHome, sources.sjtuAiRoster],
    facts: [
      fact("当前任职", "上海交通大学人工智能学院助理教授、博士生导师。", sources.songhuaOfficial),
      fact("教育与学术训练", "南京大学计算机本科；2025 年获 NUS 电子与计算机工程博士。", sources.songhuaHome),
      fact("博士师承", "个人主页明确记录博士阶段由 Xinchao Wang 指导。", sources.songhuaHome),
      fact("研究主线", "研究生成式 AI，重点关注合成数据驱动的高效深度学习。", sources.songhuaOfficial),
      fact("科研与招生", "创建 Go-There Lab，并公开博士、硕士、博后与研究实习招生计划。", sources.songhuaHome),
    ],
  },
  {
    id: "linfeng-zhang-sjtu-p0-tail-b1",
    name: "张林峰",
    role: "Assistant Professor · PI, EPIC Lab",
    institution: "SJTU",
    region: "Mainland China",
    area: "Efficient Foundation Models · Multimodal AI · Data-Centric AI",
    tags: ["高效大模型", "多模态", "AIGC", "数据中心AI"],
    summary: "聚焦高效、精准、可部署基础模型并公开学生研究与产业实习轨迹的 EPIC Lab 独立 PI。",
    category: "core",
    status: "current independent PI · official faculty, CV and lab profiles verified",
    stage: "emerging",
    primary: true,
    x: 480,
    y: 160,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: portrait("linfeng-zhang.jpg", "张林峰", "https://www.zhanglinfeng.tech/assets/images/linfeng.jpg", sources.linfengHome),
    sources: [sources.linfengOfficial, sources.linfengZhiyuan, sources.linfengHome, sources.linfengCv],
    facts: [
      fact("当前任职", "上海交通大学人工智能学院助理教授、EPIC Lab 独立 PI。", sources.linfengCv),
      fact("教育与学术训练", "东北大学本科；2024 年获清华大学交叉信息研究院博士。", sources.linfengHome),
      fact("博士师承", "本人 CV 明确记录清华博士阶段由 Kaisheng Ma 指导。", sources.linfengCv),
      fact("研究主线", "研究轻量高效语言/多模态大模型、AIGC 与数据高效人工智能。", sources.linfengZhiyuan),
      fact("人才流动", "实验室主页公开记录学生在 Alibaba Qwen、Kimi、上海 AI Lab、蚂蚁和 DP Technology 等处实习。", sources.linfengHome),
    ],
  },
  {
    id: "bin-cui-pku-p0-tail-b1",
    name: "崔斌",
    role: "Boya Distinguished Professor · Vice Dean",
    institution: "PKU",
    region: "Mainland China",
    area: "AI Systems · Databases · Big Data",
    tags: ["AI系统", "数据库", "大模型系统", "大数据"],
    summary: "连接数据库、AI 系统与大模型训练推理，并保持广泛产业合作和公开学生去向记录的北大资深 PI。",
    category: "core",
    status: "current independent PI · official faculty and personal profiles verified",
    stage: "senior",
    primary: true,
    x: 640,
    y: 160,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: portrait("bin-cui.jpg", "崔斌", "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5LmLCZnzLPLzCDoQ7LZnzM2LzWVM4lq8LR7bn7Q7LNUPL4N0gihFp2hmCIa0LYhfLYybM1yDn7-DLzlZL4vYMzfRnzCsUmLbMm78MmCiLlVFnRLPL7V2MzfFL8rfLN-Jv2bjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.png", sources.cuiOfficial),
    sources: [sources.cuiOfficial, sources.cuiHome, sources.cuiStudents, sources.pkuRoster],
    facts: [
      fact("当前任职", "北京大学博雅特聘教授、计算机学院副院长、数据科学与工程研究所所长。", sources.cuiHome),
      fact("教育与学术训练", "1996 年获西安交通大学学士，2004 年获新加坡国立大学博士。", sources.cuiHome),
      fact("研究主线", "研究 AI 系统、大模型训练推理、数据库与大数据管理分析。", sources.cuiOfficial),
      fact("学生体系", "个人主页公开列出在读学生、博士后及多届博士和硕士毕业生。", sources.cuiStudents),
      fact("产业连接", "官方简介列出与腾讯、阿里、苹果、微软、百度、字节、快手、百川等企业的项目合作。", sources.cuiOfficial),
    ],
  },
  {
    id: "qionghai-dai-thu-p0-tail-b1",
    name: "戴琼海",
    role: "Professor · CAE Academician · Lab Chief Scientist",
    institution: "THU",
    region: "Mainland China",
    area: "Computational Imaging · Artificial Intelligence · Brain Science",
    tags: ["计算成像", "人工智能", "脑科学", "光电计算"],
    summary: "从立体视觉与计算成像拓展到脑科学和光电计算，并形成跨自动化、生命科学和人工智能人才体系的清华资深 PI。",
    category: "core",
    status: "current independent PI · official faculty and laboratory profiles verified",
    stage: "senior",
    primary: true,
    x: 800,
    y: 160,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: portrait("qionghai-dai.jpg", "戴琼海", "https://www.au.tsinghua.edu.cn/__local/0/E0/44/6F7AB3AA88CC4408F28722A343A_ADB460D0_4793.jpg", sources.daiOfficial),
    sources: [sources.daiOfficial, sources.daiLab, sources.daiFeature, sources.daiThesisList, sources.thuAutoRoster],
    facts: [
      fact("当前任职", "清华大学教授、中国工程院院士、成像与智能技术实验室首席科学家。", sources.daiLab),
      fact("教育与学术训练", "1996 年获东北大学工学博士；1999 年进入清华自动化系从事博士后研究并留校。", sources.daiFeature),
      fact("研究主线", "研究计算成像、生物医学人工智能、脑与认知以及神经形态光电计算。", sources.daiLab),
      fact("学生体系", "清华优秀博士论文名单记录曹汛的控制科学与工程博士论文导师为戴琼海。", sources.daiThesisList),
      fact("人才培养", "实验室公开招收自动化系与人工智能学院博士生，并说明研究生多次获研究生特奖与学术新秀。", sources.daiLab),
    ],
  },
];

export const candidatePriorityP0MainlandTailBatch1SupportingPeople2026: Person[] = [
  { id: "jun-wang-ucl-p0-tail-support", name: "Jun Wang", role: "PhD supervisor", institution: "UCL", region: "Europe", area: "Information Retrieval · Computational Advertising", tags: ["博士导师", "信息检索"], summary: "张伟楠 UCL 博士阶段共同导师。", category: "adjacent", stage: "adjacent", primary: false, x: 160, y: 40, sources: [sources.weinanUcl] },
  { id: "xinchao-wang-nus-p0-tail-support", name: "Xinchao Wang", role: "PhD supervisor", institution: "NUS", region: "Singapore", area: "Computer Vision · Machine Learning", tags: ["博士导师", "计算机视觉"], summary: "刘松桦 NUS 博士导师。", category: "adjacent", stage: "adjacent", primary: false, x: 320, y: 40, sources: [sources.songhuaHome] },
  { id: "kaisheng-ma-thu-p0-tail-support", name: "Kaisheng Ma", role: "PhD supervisor", institution: "THU", region: "Mainland China", area: "Efficient AI · Computer Architecture", tags: ["博士导师", "高效AI"], summary: "张林峰清华博士阶段导师。", category: "adjacent", stage: "adjacent", primary: false, x: 480, y: 40, sources: [sources.linfengCv] },
  { id: "yujie-wang-pku-cui-p0-tail-support", name: "Wang Yujie", role: "PhD Student", institution: "PKU", region: "Mainland China", area: "AI Systems", tags: ["博士生", "AI系统"], summary: "崔斌主页列出的在读博士生。", category: "adjacent", stage: "adjacent", primary: false, x: 640, y: 280, sources: [sources.cuiStudents] },
  { id: "xun-cao-dai-p0-tail-support", name: "Xun Cao", chinese: "曹汛", role: "PhD alumnus", institution: "External", region: "Mainland China", actualInstitution: "Nanjing University", area: "Computational Imaging · Computer Vision", tags: ["博士校友", "计算成像"], summary: "清华官方优秀博士论文名单记录的戴琼海博士生。", category: "adjacent", stage: "adjacent", primary: false, x: 800, y: 280, sources: [sources.daiThesisList] },
];

export const candidatePriorityP0MainlandTailBatch1Relationships2026: Relationship[] = [
  { id: "p0-mainland-tail-b1-wang-zhang-lineage", from: "jun-wang-ucl-p0-tail-support", to: "weinan-zhang-sjtu-p0-tail-b1", type: "lineage", subtype: "co_adviser", label: "博士共同导师", evidence: "UCL 的张伟楠旧主页明确称其博士阶段由 Jun Wang 与 Stephen Robertson 共同指导。", source: sources.weinanUcl, evidenceObject: "UCL Computer Science · Weinan Zhang biography", verified: true },
  { id: "p0-mainland-tail-b1-xinchao-songhua-lineage", from: "xinchao-wang-nus-p0-tail-support", to: "songhua-liu-sjtu-p0-tail-b1", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "刘松桦个人主页明确记录其 NUS 博士由 Xinchao Wang 指导。", source: sources.songhuaHome, evidenceObject: "Songhua Liu homepage · About Me", verified: true },
  { id: "p0-mainland-tail-b1-ma-linfeng-lineage", from: "kaisheng-ma-thu-p0-tail-support", to: "linfeng-zhang-sjtu-p0-tail-b1", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "张林峰本人 CV 明确记录其清华博士阶段由 Kaisheng Ma 指导。", source: sources.linfengCv, evidenceObject: "Linfeng Zhang CV · Education", verified: true },
  { id: "p0-mainland-tail-b1-cui-wang-lineage", from: "bin-cui-pku-p0-tail-b1", to: "yujie-wang-pku-cui-p0-tail-support", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "崔斌个人主页的 Current students 表将 Wang Yujie 列为 2021 级博士生。", source: sources.cuiStudents, evidenceObject: "CUI Bin's Students · Current students table", verified: true },
  { id: "p0-mainland-tail-b1-dai-cao-lineage", from: "qionghai-dai-thu-p0-tail-b1", to: "xun-cao-dai-p0-tail-support", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "清华大学北京市优秀博士学位论文名单记录曹汛博士论文导师为戴琼海。", source: sources.daiThesisList, evidenceObject: "清华大学历年入选北京市优秀博士学位论文名单 · 2013 控制科学与工程", verified: true },
];

export const candidatePriorityP0MainlandTailBatch1GroupMembers2026: GroupMember[] = [
  { id: "p0-mainland-tail-b1-linfeng-shaobo", teacherId: "linfeng-zhang-sjtu-p0-tail-b1", name: "王少博", role: "PhD student · efficient data-centric AI", source: sources.linfengHome },
  { id: "p0-mainland-tail-b1-cui-sheng-zeang", teacherId: "bin-cui-pku-p0-tail-b1", name: "Sheng Zeang", role: "PhD student · Data + AI", source: sources.cuiStudents },
];

export const candidatePriorityP0MainlandTailBatch1Placements2026: StudentPlacement[] = [
  { id: "p0-mainland-tail-b1-linfeng-zichen-kimi", student: "温子辰", teacherId: "linfeng-zhang-sjtu-p0-tail-b1", company: "Kimi", role: "Research intern", kind: "reported", sector: "industry", note: "EPIC Lab 主页公开记录温子辰在 Kimi 实习。", source: sources.linfengHome, verifiedAt: checkedAt },
  { id: "p0-mainland-tail-b1-cui-chen-lijiang-hp", student: "Chen Lijiang", teacherId: "bin-cui-pku-p0-tail-b1", company: "HP Labs", role: "PhD alumnus", kind: "reported", sector: "industry", note: "崔斌学生页记录博士毕业生 Chen Lijiang 去向 HP Lab。", source: sources.cuiStudents, verifiedAt: checkedAt },
];

export const candidatePriorityP0MainlandTailBatch1RosterPromotions2026 = [
  { unitUrl: "https://www.cs.sjtu.edu.cn/jiaoshiml.html", rosterName: "张伟楠", atlasPersonId: "weinan-zhang-sjtu-p0-tail-b1" },
  { unitUrl: "https://sai.sjtu.edu.cn/cn/faculty/zzjs", rosterName: "刘松桦", atlasPersonId: "songhua-liu-sjtu-p0-tail-b1" },
  { unitUrl: "https://sai.sjtu.edu.cn/cn/faculty/zzjs", rosterName: "张林峰", atlasPersonId: "linfeng-zhang-sjtu-p0-tail-b1" },
  { unitUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", rosterName: "崔斌", atlasPersonId: "bin-cui-pku-p0-tail-b1" },
  { unitUrl: "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm", rosterName: "戴琼海", atlasPersonId: "qionghai-dai-thu-p0-tail-b1" },
];
