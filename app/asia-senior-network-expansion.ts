import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  zhangBoFeature: source(
    "清华大学 · 张钹：天才的决心",
    "https://www.tsinghua.edu.cn/info/1182/114382.htm",
    "official",
    "张钹的博士生培养记录；明确记载马少平选择张钹为博士导师、黄必清于 1990 年开始跟随张钹攻读博士",
  ),
  maTsinghua: source(
    "清华大学计算机系 · 马少平",
    "https://www.cs.tsinghua.edu.cn/info/1121/3556.htm",
    "official",
    "清华教授身份、1997 年博士学位、智能信息处理与信息检索研究方向及实验室任职",
  ),
  maScholar: source(
    "清华大学学者库 · 马少平",
    "https://www.sigs.tsinghua.edu.cn/ms/main.htm",
    "profile",
    "马少平的清华任职、研究方向与代表性学术工作",
  ),
  huangAutomation: source(
    "清华大学自动化系 · 黄必清",
    "https://www.au.tsinghua.edu.cn/info/1092/1519.htm",
    "official",
    "清华研究员和博士生导师身份、1990—1994 年清华博士训练及工业智能研究方向",
  ),
  huangImem: source(
    "清华大学工业工程系 · 黄必清",
    "https://www.imem.tsinghua.edu.cn/info/1330/2148.htm",
    "official",
    "黄必清的教育经历、研究方向和智能制造相关学术任职",
  ),
  songRucCn: source(
    "中国人民大学高瓴人工智能学院 · 宋睿华",
    "https://ai.ruc.edu.cn/academicfaculty/szdwn/srh/index.htm",
    "official",
    "人大长聘副教授身份、清华硕士阶段导师马少平、上海交大博士导师与多模态研究方向",
  ),
  songRucEn: source(
    "Renmin University of China · Ruihua Song",
    "https://ai.ruc.edu.cn/qysj/GSAI_FACULTY/b75fa33713354d458741a07efa53633d.htm",
    "official",
    "宋睿华的现任教职、教育经历、研究兴趣和产业研究经历",
  ),
  liuThesis: source(
    "刘知远 · 清华大学博士学位论文",
    "https://lzy.thunlp.org/publications/phd_thesis.pdf",
    "thesis",
    "论文致谢明确称孙茂松教授为导师",
  ),
  liuProfile: source(
    "清华大学自然语言处理实验室 · 刘知远",
    "https://nlp.csai.tsinghua.edu.cn/~lzy/zh.html",
    "profile",
    "刘知远的清华博士训练、当前教职与自然语言处理研究方向",
  ),
  mmlabAlumni: source(
    "CUHK MMLab · Alumni",
    "https://mmlab.ie.cuhk.edu.hk/alumni.html",
    "official",
    "实验室校友名录明确记载 Ziwei Liu 的博士由 Xiaoou Tang 与 Xiaogang Wang 共同指导",
  ),
  lyuStudents: source(
    "Michael R. Lyu · Graduated PhD Students",
    "https://www.cse.cuhk.edu.hk/lyu/students/phd",
    "official",
    "吕建成的官方博士毕业生名录及郑子彬、黄开竹、贺品嘉的毕业年份和公开去向",
  ),
  lyuProfile: source(
    "CUHK CSE · Michael R. Lyu",
    "https://www.cse.cuhk.edu.hk/lyu/",
    "official",
    "吕建成的现任教职、可靠软件与人工智能研究方向及学生培养规模",
  ),
  zhengSysu: source(
    "中山大学软件工程学院 · 郑子彬",
    "https://sse.sysu.edu.cn/node/100",
    "official",
    "中山大学教授和博士生导师身份，以及可信大模型、软件可靠性和区块链研究方向",
  ),
  zhengSysuInterview: source(
    "中山大学软件工程学院 · 郑子彬专访",
    "https://sse.sysu.edu.cn/article/469",
    "official",
    "郑子彬的学院任职、科研组织工作与软件工程研究轨迹",
  ),
  huangXjtluTeam: source(
    "Xi'an Jiaotong-Liverpool University · Research team",
    "https://www.xjtlu.edu.cn/en/research/suzhou-key-lab/laboratory-of-cognitive-computation-and-applied-technology/research-team",
    "official",
    "黄开竹的 Duke Kunshan University 教职、2004 年 CUHK 博士与可信人工智能研究方向",
  ),
  huangXjtluNews: source(
    "Xi'an Jiaotong-Liverpool University · AI research recognition",
    "https://www.xjtlu.edu.cn/en/news/2018/09/more-recognition-for-ai-research-at-xjtlu",
    "official",
    "黄开竹在人工智能、机器学习和对抗鲁棒性方向的研究与学术荣誉",
  ),
  heArise: source(
    "CUHK ARISE Lab · Members",
    "https://ariselab.cse.cuhk.edu.hk/members.html",
    "official",
    "贺品嘉的 CUHK-Shenzhen 助理教授身份、实验室领导角色与可靠智能系统研究方向",
  ),
  heCuhkSeminar: source(
    "CUHK CSE · Toward Reliable NLP Systems via Software Testing",
    "https://www.cse.cuhk.edu.hk/upcoming-events/toward-reliable-nlp-systems-via-software-testing/",
    "official",
    "贺品嘉的 2018 年 CUHK 博士、ETH Zurich 博士后经历与可靠 NLP / 软件工程研究",
  ),
  liaoSmu: source(
    "Singapore Management University · Lizi Liao",
    "https://faculty.smu.edu.sg/profile/liao-lizi-6261",
    "official",
    "SMU 助理教授身份、2019 年 NUS 博士与人工智能和多媒体研究方向",
  ),
  liaoHome: source(
    "Lizi Liao · Homepage",
    "https://liziliao.github.io/",
    "profile",
    "本人简介明确记载 NUS 博士由 Tat-Seng Chua 指导，并列出 CoAgent Lab 与多模态、对话式 AI 研究",
  ),
  chuaNusGs: source(
    "NUS Graduate School · Tat-Seng Chua",
    "https://nusgs.nus.edu.sg/thesis-advisors/dcscts",
    "official",
    "蔡达成的 NUS 教职、研究领域与公开博士校友规模",
  ),
  heXiangnan: source(
    "何向南 · Homepage",
    "https://hexiangnan.github.io/",
    "profile",
    "本人履历明确记载 2016—2019 年在 NUS 从事博士后研究并由 Tat-Seng Chua 指导",
  ),
  guoHkustGz: source(
    "HKUST(GZ) Faculty Profiles · Zhijiang Guo",
    "https://facultyprofiles.hkust-gz.edu.cn/faculty-personal-page?id=526",
    "official",
    "HKUST(GZ) 助理教授身份、2020 年 SUTD 博士及大语言模型和智能体研究方向",
  ),
  guoHome: source(
    "Zhijiang Guo · Homepage",
    "https://cartus.github.io/",
    "profile",
    "本人简介明确记载 SUTD 博士由 Wei Lu 指导，并列出 Cambridge、Huawei 与 HKUST(GZ) 学术轨迹",
  ),
  luSutd: source(
    "SUTD · Wei Lu",
    "https://www.sutd.edu.sg/esd/profile/lu-wei/",
    "official",
    "Wei Lu 的研究组校友名录列出 Zhijiang Guo 及其进入 HKUST(GZ) 任助理教授的去向",
  ),
};

type PersonInput = Omit<Person, "facts" | "lastVerifiedAt" | "x" | "y"> & {
  sources: [Source, Source, ...Source[]];
  training: string;
  significance: string;
};

const makePerson = (input: PersonInput, index: number): Person => {
  const { training, significance, ...person } = input;
  return {
    ...person,
    x: 140 + (index % 4) * 210,
    y: 160 + Math.floor(index / 4) * 190,
    lastVerifiedAt: checkedAt,
    facts: [
      { label: "当前角色", value: person.role, source: person.sources[0] },
      { label: "学术训练与轨迹", value: training, source: person.sources[1] },
      { label: "研究主线", value: person.area, source: person.sources[0] },
      { label: "为什么值得关注", value: significance, source: person.sources[0] },
    ],
  };
};

/**
 * People needed to expose first-party-verified adviser branches around major
 * Asian senior scholars. Every person below has at least two independent
 * public sources and three source-linked facts.
 */
export const asiaSeniorNetworkPeople: Person[] = [
  makePerson({
    id: "shaoping-ma-thu",
    name: "马少平",
    role: "教授 · 博士生导师",
    institution: "THU",
    region: "Mainland China",
    area: "Information Retrieval · Intelligent Information Processing",
    tags: ["信息检索", "智能信息处理", "自然语言处理", "张钹谱系"],
    summary: "清华大学计算机系教授，长期研究信息检索与智能信息处理；博士阶段师从张钹，并连接宋睿华等后续学术节点。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.maTsinghua, sources.zhangBoFeature, sources.maScholar],
    training: "1997 年获清华大学博士学位；清华官方校史访谈明确记载其选择张钹为博士导师。",
    significance: "把清华早期人工智能谱系连接到信息检索、搜索技术与当前多模态信息获取研究。",
  }, 0),
  makePerson({
    id: "biqing-huang-thu",
    name: "黄必清",
    role: "研究员 · 博士生导师",
    institution: "THU",
    region: "Mainland China",
    area: "Industrial Intelligence · Intelligent Manufacturing · Artificial Intelligence",
    tags: ["工业智能", "智能制造", "人工智能", "张钹谱系"],
    summary: "清华大学自动化系研究员、博士生导师，围绕工业智能与智能制造开展研究；博士阶段师从张钹。",
    stage: "senior",
    category: "adjacent",
    primary: true,
    status: "current PI",
    sources: [sources.huangAutomation, sources.huangImem, sources.zhangBoFeature],
    training: "1990—1994 年在清华攻读博士；清华官方访谈明确记载其 1990 年开始跟随张钹攻读博士。",
    significance: "代表张钹人工智能谱系向工业智能、制造系统和工程落地延伸的重要分支。",
  }, 1),
  makePerson({
    id: "ruihua-song-ruc",
    name: "宋睿华",
    role: "长聘副教授 · 博士生导师",
    institution: "RUC",
    region: "Mainland China",
    area: "Multimodal Understanding and Generation · Information Retrieval",
    tags: ["多模态", "信息检索", "内容生成", "马少平谱系"],
    summary: "中国人民大学高瓴人工智能学院长聘副教授，研究多模态内容理解与生成；清华硕士阶段师从马少平。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.songRucCn, sources.songRucEn],
    training: "清华大学硕士阶段导师为马少平；其后在上海交通大学完成博士训练，并有微软亚洲研究院研究经历。",
    significance: "连接清华信息检索传统、微软亚洲研究院与人民大学多模态人工智能研究。",
  }, 2),
  makePerson({
    id: "zibin-zheng-sysu",
    name: "郑子彬",
    role: "教授 · 博士生导师 · 副院长",
    institution: "SYSU",
    region: "Mainland China",
    area: "Trustworthy Large Language Models · Software Reliability · Blockchain",
    tags: ["可信大模型", "软件可靠性", "区块链", "吕建成谱系"],
    summary: "中山大学软件工程学院教授、博士生导师，研究可信大模型、软件可靠性与区块链；CUHK 博士阶段师从吕建成。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.zhengSysu, sources.zhengSysuInterview, sources.lyuStudents],
    training: "吕建成官方博士毕业生名录列其为 2010 年 CUHK 博士毕业生；后在中山大学建立软件可靠性研究团队。",
    significance: "把 CUHK 可靠软件谱系连接到中国大陆的可信大模型、软件工程与区块链研究。",
  }, 3),
  makePerson({
    id: "kaizhu-huang-dku",
    name: "黄开竹",
    role: "终身教授",
    institution: "Duke Kunshan",
    actualInstitution: "Duke Kunshan University",
    region: "Mainland China",
    area: "Trustworthy Artificial Intelligence · Machine Learning · Pattern Recognition",
    tags: ["可信人工智能", "机器学习", "模式识别", "吕建成谱系"],
    summary: "Duke Kunshan University 终身教授，研究可信人工智能、机器学习与模式识别；2004 年在 CUHK 完成吕建成指导的博士训练。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.huangXjtluTeam, sources.huangXjtluNews, sources.lyuStudents],
    training: "2004 年获 CUHK 博士学位；吕建成官方毕业生名录将其列入博士生名单，现任 Duke Kunshan University 教授。",
    significance: "将 CUHK 可靠系统谱系延伸到可信人工智能、对抗鲁棒性和机器学习方法研究。",
  }, 4),
  makePerson({
    id: "pinjia-he-cuhksz",
    name: "贺品嘉",
    role: "助理教授 · ARISE Lab 负责人",
    institution: "CUHK-Shenzhen",
    actualInstitution: "The Chinese University of Hong Kong, Shenzhen",
    region: "Mainland China",
    area: "Reliable AI Systems · Natural Language Processing · Software Engineering",
    tags: ["可靠 AI", "NLP", "软件测试", "吕建成谱系"],
    summary: "香港中文大学（深圳）助理教授、ARISE Lab 负责人，研究可靠 AI 系统、NLP 与软件工程；CUHK 博士阶段师从吕建成。",
    stage: "emerging",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.heArise, sources.heCuhkSeminar, sources.lyuStudents],
    training: "2018 年获 CUHK 博士学位，后在 ETH Zurich 从事博士后研究，再加入 CUHK-Shenzhen。",
    significance: "把吕建成的可靠软件研究传统连接到大模型和 NLP 系统的测试、监控与可靠性。",
  }, 5),
  makePerson({
    id: "lizi-liao-smu",
    name: "Lizi Liao",
    chinese: "廖丽子",
    role: "Assistant Professor · CoAgent Lab",
    institution: "SMU",
    region: "Singapore",
    area: "Multimodal AI · Conversational AI · Recommender Systems",
    tags: ["多模态", "对话式 AI", "推荐系统", "蔡达成谱系"],
    summary: "SMU 助理教授、CoAgent Lab 负责人，研究多模态与对话式人工智能；NUS 博士阶段师从 Tat-Seng Chua（蔡达成）。",
    stage: "emerging",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.liaoSmu, sources.liaoHome, sources.chuaNusGs],
    training: "2019 年获 NUS 博士学位；本人主页明确记载博士导师为 Tat-Seng Chua。",
    significance: "把 NUS 多媒体信息检索谱系连接到 SMU 的多模态智能体、对话系统与推荐研究。",
  }, 6),
  makePerson({
    id: "zhijiang-guo-hkustgz",
    name: "郭志江",
    role: "助理教授",
    institution: "HKUST(GZ)",
    actualInstitution: "The Hong Kong University of Science and Technology (Guangzhou)",
    region: "Mainland China",
    area: "Large Language Models · Agentic AI · Natural Language Processing",
    tags: ["LLM", "智能体", "NLP", "Wei Lu 谱系"],
    summary: "HKUST(GZ) 助理教授，研究大语言模型、智能体与自然语言处理；SUTD 博士阶段师从 Wei Lu。",
    stage: "emerging",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.guoHkustGz, sources.guoHome, sources.luSutd],
    training: "2020 年获 SUTD 博士学位，由 Wei Lu 指导；之后有 Cambridge 与 Huawei 研究经历并加入 HKUST(GZ)。",
    significance: "把 Wei Lu 的结构化 NLP 谱系连接到当前大语言模型、Agentic AI 与粤港澳高校网络。",
  }, 7),
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: "phd_adviser" | "co_adviser" | "master_adviser" | "postdoc_mentor",
  evidence: string,
  evidenceSource: Source,
  endYear?: number,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : subtype === "co_adviser" ? "共同博士导师" : subtype === "master_adviser" ? "硕士导师" : "博士后导师",
  evidence,
  source: evidenceSource,
  verified: true,
  endYear,
  evidenceObject: "一手学校页面、本人学术主页、官方校友名录或博士学位论文；不以普通合著推断师承",
});

/** Adviser/mentor points to the trainee. */
export const asiaSeniorNetworkRelationships: Relationship[] = [
  lineage("asia-senior-zhang-bo-ma-shaoping", "bo-zhang-thu-historical", "shaoping-ma-thu", "phd_adviser", "清华大学官方人物特写明确记载马少平决定选择张钹为博士导师。", sources.zhangBoFeature, 1997),
  lineage("asia-senior-zhang-bo-huang-biqing", "bo-zhang-thu-historical", "biqing-huang-thu", "phd_adviser", "清华大学官方人物特写明确记载黄必清于 1990 年开始跟随张钹攻读博士。", sources.zhangBoFeature, 1994),
  lineage("asia-senior-ma-shaoping-song-ruihua", "shaoping-ma-thu", "ruihua-song-ruc", "master_adviser", "中国人民大学官方教师页在宋睿华教育经历中明确列出清华硕士导师马少平。", sources.songRucCn),
  lineage("asia-senior-sun-maosong-liu-zhiyuan", "maosong-sun", "zhiyuan-liu", "phd_adviser", "刘知远的清华博士学位论文致谢明确称孙茂松教授为导师。", sources.liuThesis, 2011),
  lineage("asia-senior-tang-xiaoou-liu-ziwei", "xiaoou-tang-cuhk", "ziwei-liu-ntu", "co_adviser", "CUHK MMLab 官方校友名录明确记载 Ziwei Liu 的博士由 Xiaoou Tang 与 Xiaogang Wang 共同指导。", sources.mmlabAlumni, 2017),
  lineage("asia-senior-lyu-zibin-zheng", "michael-lyu-cuhk", "zibin-zheng-sysu", "phd_adviser", "吕建成官方博士毕业生名录列出 Zibin Zheng 为 2010 年毕业博士生。", sources.lyuStudents, 2010),
  lineage("asia-senior-lyu-kaizhu-huang", "michael-lyu-cuhk", "kaizhu-huang-dku", "phd_adviser", "吕建成官方博士毕业生名录列出 Kaizhu Huang 为 2004 年毕业博士生。", sources.lyuStudents, 2004),
  lineage("asia-senior-lyu-pinjia-he", "michael-lyu-cuhk", "pinjia-he-cuhksz", "phd_adviser", "吕建成官方博士毕业生名录列出 Pinjia He 为 2018 年毕业博士生。", sources.lyuStudents, 2018),
  lineage("asia-senior-chua-lizi-liao", "tat-seng-chua", "lizi-liao-smu", "phd_adviser", "Lizi Liao 本人学术主页明确记载其 NUS 博士由 Tat-Seng Chua 指导。", sources.liaoHome, 2019),
  lineage("asia-senior-chua-xiangnan-he", "tat-seng-chua", "xiangnan-he-ustc-award", "postdoc_mentor", "何向南本人学术主页明确记载其 2016—2019 年 NUS 博士后由 Tat-Seng Chua 指导。", sources.heXiangnan, 2019),
  lineage("asia-senior-lu-zhijiang-guo", "wei-lu", "zhijiang-guo-hkustgz", "phd_adviser", "郭志江本人学术主页明确记载其 SUTD 博士由 Wei Lu 指导；SUTD 官方 Wei Lu 页面亦将其列为校友。", sources.guoHome, 2020),
];

export const people = asiaSeniorNetworkPeople;
export const relationships = asiaSeniorNetworkRelationships;
