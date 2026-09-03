import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const src = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, source: Source) => ({ label, value, source });

const roster = {
  sjtuAi: src("上海交通大学人工智能学院 · 专职教师", "https://sai.sjtu.edu.cn/cn/faculty/zzjs", "official", "现任专职教师名录"),
  sjtuCs: src("上海交通大学计算机学院 · 教师名录", "https://www.cs.sjtu.edu.cn/jiaoshiml.html", "official", "现任教师名录"),
  pkuCis: src("北京大学智能学院 · 专职教师", "https://www.cis.pku.edu.cn/szdw/zzjs.htm", "official", "现任专职教师名录"),
  njuAi: src("南京大学人工智能学院 · 教师名录", "https://ai.nju.edu.cn/people/list.htm", "official", "现任教师名录"),
  njuCs: src("南京大学计算机学院 · 师资队伍", "https://cs.nju.edu.cn/1651/list.htm", "official", "现任教师名录"),
  thuAir: src("清华大学智能产业研究院 · 研究团队", "https://air.tsinghua.edu.cn/airtd/yjtd.htm", "official", "现任研究团队名录"),
  thuAutomation: src("清华大学自动化系 · 系统工程研究所", "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm", "official", "现任教师名录"),
};

const profile = {
  lin: src("上海交通大学人工智能学院 · 林洲汉", "https://sai.sjtu.edu.cn/cn/facultydetails/jgsz/linzhouhan", "official", "现职、教育、博士导师、产业研究经历、方向与头像"),
  hong: src("上海交通大学计算机学院 · 洪佳楠", "https://www.cs.sjtu.edu.cn/jiaoshiml/hongjianan.html", "official", "现职、教育、华为履历、研究方向与项目"),
  hongHome: src("Jianan Hong · personal homepage", "https://hongjianansjtu.github.io/", "profile", "博士导师、华为履历、研究方向、招生与头像"),
  cheng: src("Yuan Cheng · personal homepage", "https://cyuan328.github.io/", "profile", "现职、教育、博士后导师、阿里与港大经历、研究方向和头像"),
  zhaoPeilin: src("上海交通大学人工智能学院 · 赵沛霖", "https://sai.sjtu.edu.cn/cn/facultydetails/jgsz/zhaopeilin", "official", "现职、教育、腾讯/蚂蚁/A*STAR/罗格斯履历、研究与头像"),
  wu: src("北京大学智能学院 · 吴玺宏", "https://www.cis.pku.edu.cn/info/1362/2253.htm", "official", "现职、教育、中心职务、研究方向、项目与头像"),
  jing: src("北京大学智能学院 · 陈婧", "https://www.cis.pku.edu.cn/info/1362/2249.htm", "official", "陈婧博士由迟惠生与吴玺宏共同指导"),
  shen: src("南京大学人工智能学院 · 申富饶", "https://ai.nju.edu.cn/e9/5e/c18540a321886/pagem.htm", "official", "现职、教育、海外研究履历、神经计算研究与头像"),
  shenMembers: src("南京大学 RINC · 成员", "https://ai.nju.edu.cn/rinc/Member.html", "official", "指导教师及博士、硕士研究生名录"),
  zhaoJianhua: src("南京大学计算机学院 · 赵建华", "https://cs.nju.edu.cn/58/18/c2639a153624/pagem.htm", "official", "现职、南京大学本硕博、博士导师与研究方向"),
  zhang: src("清华大学 AIR · 张亚勤", "https://air.tsinghua.edu.cn/info/1046/1207.htm", "official", "现职、微软与百度履历、研究贡献、荣誉与头像"),
  zhangEducation: src("清华大学新闻网 · 张亚勤加盟清华", "https://www.tsinghua.edu.cn/en/info/1244/3024.htm", "official", "中国科大与乔治华盛顿大学教育经历、清华聘任和研究任务"),
  guan: src("清华大学自动化系 · 管晓宏", "https://www.au.tsinghua.edu.cn/info/1076/3185.htm", "official", "现职、教育、院士荣誉、研究方向与头像"),
  chenXiuzhen: src("上海交通大学计算机学院 · 陈秀真", "https://www.cs.sjtu.edu.cn/jiaoshiml/chenxiuzhen.html", "official", "陈秀真博士由管晓宏和郑庆华指导"),
};

type Entry = {
  id: string; name: string; role: string; institution: Person["institution"]; area: string; tags: string[]; summary: string;
  stage: Person["stage"]; profile: Source; roster: Source; portraitFile: string; portraitUrl: string;
  facts: Array<[string, string, Source]>; x: number; y: number;
};

const person = (entry: Entry): Person => ({
  id: entry.id,
  name: entry.name,
  role: entry.role,
  institution: entry.institution,
  region: "Mainland China",
  area: entry.area,
  tags: entry.tags,
  summary: entry.summary,
  category: "core",
  stage: entry.stage,
  primary: true,
  status: "current independent PI · strict P0 third-pass verified",
  x: entry.x,
  y: entry.y,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  sources: [entry.profile, entry.roster],
  portrait: {
    src: `portraits/candidate-p0-mainland-third-pass-2026/${entry.portraitFile}`,
    alt: `${entry.name} 官方或本人主页头像`,
    source: { ...entry.profile, label: `${entry.profile.label} · 人物头像`, url: entry.portraitUrl, supports: "本人或官方院系页单人头像；已人工检查并转制为 512×512" },
  },
  facts: entry.facts.map(([label, value, source]) => fact(
    ["教育训练", "教育与师承", "博士师承", "博士后师承"].includes(label)
      ? "教育与学术训练"
      : label === "研究贡献"
        ? "研究主线"
        : label,
    value,
    source,
  )),
});

export const candidatePriorityP0MainlandThirdPassBatch1People2026: Person[] = [
  person({ id: "zhouhan-lin-sjtu-p0-third-b1", name: "林洲汉", role: "Associate Professor", institution: "SJTU", area: "Machine Learning · NLP", tags: ["机器学习", "NLP", "自注意力", "大模型"], summary: "由 Yoshua Bengio 指导、连接 Mila 与 FAIR 训练路径，研究机器学习和自然语言处理的上海交大 PI。", stage: "emerging", profile: profile.lin, roster: roster.sjtuAi, portraitFile: "zhouhan-lin.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/linzhouhan.png", x: 120, y: 900, facts: [["当前任职", "上海交通大学人工智能学院副教授。", profile.lin], ["教育与师承", "2019 年获蒙特利尔大学 Mila 计算机博士，官方简介明确师从 Yoshua Bengio。", profile.lin], ["产业研究训练", "博士期间在 Google AI、IBM Watson 与 Microsoft Research 实习，加入交大前曾任 Facebook AI Research 访问科学家。", profile.lin], ["研究主线", "研究机器学习和自然语言处理，并围绕机器智能的知识获取、推理与交互开展工作。", profile.lin], ["学术服务", "长期担任 JMLR、ICLR、NeurIPS、ICML、ACL、EMNLP 等期刊会议审稿人与领域主席。", profile.lin]] }),
  person({ id: "jianan-hong-sjtu-p0-third-b1", name: "洪佳楠", role: "Associate Researcher · Master Supervisor", institution: "SJTU", area: "Network Security · Privacy · Blockchain", tags: ["网络安全", "隐私", "区块链", "应用密码学"], summary: "从中科大博士训练与华为上海研究中心进入上海交大，研究网络安全、隐私认证和区块链的 PI。", stage: "emerging", profile: profile.hongHome, roster: roster.sjtuCs, portraitFile: "jianan-hong.jpg", portraitUrl: "https://hongjianansjtu.github.io/head.jpg", x: 300, y: 900, facts: [["当前任职", "上海交通大学计算机学院副研究员、硕士生导师，隶属系统安全研究所。", profile.hong], ["教育与师承", "2018 年获中国科学技术大学博士，本人主页明确导师为薛开平。", profile.hongHome], ["产业履历", "2018–2021 年在华为上海研究中心 CSPL 实验室任研究员；院系页进一步记录云核心网 NFV 与数据安全隐私团队经历。", profile.hongHome], ["研究主线", "研究云计算安全、区块链、认证与隐私授权和应用密码学。", profile.hongHome], ["人才培养", "本人主页公开招募从本科到研究生各层次学生参与网络安全研究。", profile.hongHome]] }),
  person({ id: "yuan-cheng-sjtu-p0-third-b1", name: "程远", role: "Tenure-track Associate Professor", institution: "SJTU", area: "Optical Computing · Multimodal AI · Embodied AI", tags: ["光计算", "多模态", "具身智能", "边缘智能"], summary: "具有阿里达摩院产业经历和清华 Sigma Lab 博士后训练、研究光电计算与 AI 协同设计的青年 PI。", stage: "emerging", profile: profile.cheng, roster: roster.sjtuAi, portraitFile: "yuan-cheng.jpg", portraitUrl: "https://cyuan328.github.io/images/head.png", x: 480, y: 900, facts: [["当前任职", "上海交通大学人工智能学院长聘教轨副教授。", profile.cheng], ["教育训练", "2016 年获电子科技大学工学学士，2021 年获上海交通大学博士。", profile.cheng], ["博士后师承", "2022–2025 年在清华大学 Sigma Lab 从事博士后研究，本人主页明确导师为卢芳。", profile.cheng], ["产业与访问", "2020–2021 年任阿里巴巴达摩院研究员，并曾在香港大学由 Ngai Wong 接待访问。", profile.cheng], ["研究主线", "研究光计算架构、大规模算法、边缘智能、神经形态传感与多模态/具身智能。", profile.cheng]] }),
  person({ id: "peilin-zhao-sjtu-p0-third-b1", name: "赵沛霖", role: "Professor", institution: "SJTU", area: "Machine Learning · LLM Alignment · Reinforcement Learning", tags: ["机器学习", "LLM 对齐", "强化学习", "AutoML"], summary: "横跨腾讯、蚂蚁、A*STAR 与罗格斯研究经历，聚焦机器学习、大模型安全对齐和强化学习的上海交大教授。", stage: "senior", profile: profile.zhaoPeilin, roster: roster.sjtuAi, portraitFile: "peilin-zhao.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/zhaopeilin.jpg", x: 660, y: 900, facts: [["当前任职", "上海交通大学人工智能学院教授。", profile.zhaoPeilin], ["教育训练", "本科毕业于浙江大学数学系，后获南洋理工大学计算机科学博士。", profile.zhaoPeilin], ["产业与研究履历", "官方简介记录其曾在腾讯集团、蚂蚁集团、新加坡科技研究局和罗格斯大学工作。", profile.zhaoPeilin], ["研究主线", "研究机器学习及其应用，覆盖大模型安全对齐、强化学习和自动化学习。", profile.zhaoPeilin], ["应用方向", "领导或参与制药 AI、新闻推荐与公益风控等产业项目。", profile.zhaoPeilin]] }),
  person({ id: "xihong-wu-p0-full-b1-support", name: "吴玺宏", role: "Professor · PhD Advisor", institution: "PKU", area: "Speech · Auditory Intelligence · HCI", tags: ["语音", "听觉智能", "人机交互", "语音识别"], summary: "长期建设北大言语听觉研究体系、覆盖听感知计算、语音识别与人机交互的资深 PI。", stage: "senior", profile: profile.wu, roster: roster.pkuCis, portraitFile: "xihong-wu.jpg", portraitUrl: "https://www.cis.pku.edu.cn/virtual_attach_file.vsb?afc=DL7UsZLRNaLR-DLZz-iMmrRLz-iLR-bDnl7YnzvsMzU8o7U0gihFp2hmCIa0L1yDMkysMkhkLzA7MllDUlLDnz9ZoRL4LlVVMzM2L4QkU4WFM8laUz-bolnFMRf2U1b/v2veo4Oe_tbZ_IbT6YhXptQ0g474Mm-0Lm-iLYbw62E8c&oid=1887772040&tid=1362&nid=2253&e=.jpg", x: 840, y: 900, facts: [["当前任职", "北京大学教授、博士生导师，任言语听觉研究中心主任。", profile.wu], ["教育训练", "1995 年获北京大学无线电电子学系理学博士，随后在北大计算机系从事博士后研究。", profile.wu], ["学术职责", "兼任机器感知与智能教育部重点实验室副主任及信息科学中心副主任。", profile.wu], ["研究主线", "研究听感知计算模型、心理声学、语音识别、语音合成和人机交互。", profile.wu], ["人才培养", "北大官方人物页明确记录陈婧的博士阶段由吴玺宏与迟惠生共同指导。", profile.jing]] }),
  person({ id: "furao-shen-nju-p0-third-b1", name: "申富饶", role: "Professor · PhD Advisor", institution: "NJU", area: "Neural Computing · Robotics · Data Mining", tags: ["神经计算", "机器人", "数据挖掘", "SOINN"], summary: "由数学训练转向神经计算与机器人智能、建设南京大学 RINC 研究组的资深 PI。", stage: "senior", profile: profile.shen, roster: roster.njuAi, portraitFile: "furao-shen.jpg", portraitUrl: "https://keysoftlab.nju.edu.cn/_upload/article/0f/c5/f28dc2494dcd89800930089fe4ee/1f6ba397-e5a2-4461-bc75-ba27972893da.jpg", x: 1020, y: 900, facts: [["当前任职", "南京大学教授、博士生导师，并担任机器人智能与神经计算研究组指导教师。", profile.shen], ["教育训练", "1995、1998 年分别获南京大学数学学士和硕士，2006 年获东京工业大学智能系统科学工学博士。", profile.shen], ["海外研究履历", "曾在日本企业、日本科学技术振兴机构和日本学术振兴会从事研究。", profile.shen], ["研究主线", "研究神经网络、数据挖掘、机器人智能、自组织增量学习网络与联想记忆。", profile.shen], ["学生体系", "RINC 官方成员页列出其指导团队及多届博士、硕士研究生。", profile.shenMembers]] }),
  person({ id: "jianhua-zhao-nju-p0-third-b1", name: "赵建华", role: "Professor · PhD Advisor", institution: "NJU", area: "Formal Methods · Software Engineering", tags: ["形式化方法", "模型检验", "软件工程", "程序语言"], summary: "在南京大学完成本硕博并留校，研究形式化方法、模型检验和程序语言的资深 PI。", stage: "senior", profile: profile.zhaoJianhua, roster: roster.njuCs, portraitFile: "jianhua-zhao.jpg", portraitUrl: "https://cs.nju.edu.cn/_upload/article/images/81/2c/d570e54a49759eecb8b787c0725c/20c5acaa-2b2d-47b3-8f4b-fc0778694045.jpg", x: 1200, y: 900, facts: [["当前任职", "南京大学计算机学院教授、博士生导师。", profile.zhaoJianhua], ["教育训练", "1989–1999 年在南京大学计算机系依次完成学士、硕士和博士训练。", profile.zhaoJianhua], ["博士师承", "官方简介明确其博士阶段师从郑国梁教授。", profile.zhaoJianhua], ["国际训练", "博士期间曾赴澳门联合国大学国际软件技术研究所学习和研究。", profile.zhaoJianhua], ["研究主线", "研究形式化方法、模型检验、数据精化、软件工程和程序设计语言。", profile.zhaoJianhua]] }),
  person({ id: "yaqin-zhang-thu-p0-third-b1", name: "张亚勤", role: "Chair Professor · Founding Dean", institution: "THU", area: "AI · Digital Video · Autonomous Driving", tags: ["AI", "数字视频", "自动驾驶", "产业研究"], summary: "从微软亚洲研究院与百度进入清华 AIR、连接前沿研究、人才培养和产业落地的资深节点。", stage: "senior", profile: profile.zhang, roster: roster.thuAir, portraitFile: "yaqin-zhang.jpg", portraitUrl: "https://air.tsinghua.edu.cn/__local/4/52/D9/4980D361E9CF0CE31D583FAFC36_E13031D0_24ED7.jpg", x: 1380, y: 900, facts: [["当前任职", "清华大学智能科学讲席教授、智能产业研究院创始院长。", profile.zhang], ["教育训练", "1978 年进入中国科学技术大学少年班，1989 年获乔治华盛顿大学电气工程理学博士。", profile.zhangEducation], ["产业履历", "2014–2019 年任百度总裁；此前在微软工作 16 年，历任微软亚洲研究院院长、微软全球资深副总裁与微软中国董事长等职。", profile.zhang], ["研究贡献", "研究覆盖数字视频、人工智能、移动通信与多媒体系统，多项视频压缩和传输技术进入国际标准。", profile.zhang], ["学术荣誉", "为中国工程院外籍院士、美国艺术与科学院院士、澳大利亚国家工程院外籍院士及 IEEE Fellow。", profile.zhang]] }),
  person({ id: "xiaohong-guan-thu-p0-third-b1", name: "管晓宏", role: "Professor · CAS Academician", institution: "THU", area: "Networked Systems · Cyber-Physical Systems · Optimization", tags: ["网络化系统", "信息物理系统", "智能电网", "网络安全"], summary: "研究复杂网络化系统安全与经济性、智能电网和网络安全的清华资深 PI 与科学院院士。", stage: "senior", profile: profile.guan, roster: roster.thuAutomation, portraitFile: "xiaohong-guan.jpg", portraitUrl: "https://www.au.tsinghua.edu.cn/__local/6/CA/51/3A7091C59352B0FAC24F8062E6B_7C24D2DB_62CA.jpg", x: 1560, y: 900, facts: [["当前任职", "清华大学自动化系教授、智能与网络化系统研究中心主任。", profile.guan], ["教育训练", "1982、1985 年获清华大学自动化系学士和硕士，1993 年获康涅狄格大学电机与系统工程博士。", profile.guan], ["学术荣誉", "2007 年当选 IEEE Fellow，2017 年当选中国科学院院士。", profile.guan], ["研究主线", "研究复杂网络化系统安全与经济性、生产系统优化、电力市场、信息物理系统、智能电网和网络安全。", profile.guan], ["人才培养", "上海交大官方人物页明确记录陈秀真的博士阶段由管晓宏与郑庆华共同指导。", profile.chenXiuzhen]] }),
];

const support = (id: string, name: string, role: string, institution: Person["institution"], area: string, source: Source): Person => ({
  id, name, role, institution, region: "Mainland China", area,
  tags: ["关系端点", area], summary: `一手人物页或研究组名录明确记录的 ${name} 关系节点。`, category: "adjacent", stage: "adjacent", primary: false, sources: [source], x: 0, y: 0,
});

export const candidatePriorityP0MainlandThirdPassBatch1SupportingPeople2026: Person[] = [
  support("kaiping-xue-p0-third-b1-support", "薛开平", "PhD supervisor", "USTC", "Network Security", profile.hongHome),
  support("fang-lu-p0-third-b1-support", "卢芳", "Postdoctoral supervisor", "THU", "Computational Imaging", profile.cheng),
  support("suhan-guo-p0-third-b1-support", "郭苏涵", "PhD student", "NJU", "Medical AI", profile.shenMembers),
  support("guoliang-zheng-p0-third-b1-support", "郑国梁", "PhD supervisor", "NJU", "Formal Methods", profile.zhaoJianhua),
  support("xiuzhen-chen-p0-third-b1-support", "陈秀真", "Professor · PhD advisee", "SJTU", "Cybersecurity", profile.chenXiuzhen),
];

const lineage = (id: string, from: string, to: string, subtype: NonNullable<Relationship["subtype"]>, label: string, evidence: string, source: Source): Relationship => ({ id, from, to, type: "lineage", subtype, label, evidence, source, verified: true });
const industry = (id: string, personId: string, label: string, evidence: string, source: Source): Relationship => ({ id, from: personId, to: personId, type: "industry", subtype: "industry_affiliation", label, evidence, source, verified: true });

export const candidatePriorityP0MainlandThirdPassBatch1Relationships2026: Relationship[] = [
  lineage("p0-mainland-third-b1-bengio-lin", "yoshua-bengio-ca", "zhouhan-lin-sjtu-p0-third-b1", "phd_adviser", "博士导师", "上海交大官方简介明确林洲汉在蒙特利尔大学 Mila 的博士导师为 Yoshua Bengio。", profile.lin),
  lineage("p0-mainland-third-b1-xue-hong", "kaiping-xue-p0-third-b1-support", "jianan-hong-sjtu-p0-third-b1", "phd_adviser", "博士导师", "洪佳楠本人主页明确其中国科学技术大学博士由薛开平指导。", profile.hongHome),
  lineage("p0-mainland-third-b1-lu-cheng", "fang-lu-p0-third-b1-support", "yuan-cheng-sjtu-p0-third-b1", "postdoc_mentor", "博士后导师", "程远本人主页明确其清华 Sigma Lab 博士后导师为卢芳。", profile.cheng),
  industry("p0-mainland-third-b1-zhao-industry", "peilin-zhao-sjtu-p0-third-b1", "腾讯 / 蚂蚁 / A*STAR / Rutgers", "上海交大官方简介明确记录赵沛霖此前在腾讯、蚂蚁、新加坡科技研究局和罗格斯大学工作。", profile.zhaoPeilin),
  lineage("p0-mainland-third-b1-wu-jing", "xihong-wu-p0-full-b1-support", "jing-chen-pku-p0-full-b1", "co_adviser", "共同博士导师", "北大智能学院官方简介明确陈婧博士由吴玺宏与迟惠生共同指导。", profile.jing),
  lineage("p0-mainland-third-b1-shen-guo", "furao-shen-nju-p0-third-b1", "suhan-guo-p0-third-b1-support", "phd_adviser", "博士导师", "南京大学 RINC 官方成员页将申富饶列为指导教师，并将郭苏涵列为博士研究生。", profile.shenMembers),
  lineage("p0-mainland-third-b1-zheng-zhao", "guoliang-zheng-p0-third-b1-support", "jianhua-zhao-nju-p0-third-b1", "phd_adviser", "博士导师", "南京大学计算机学院官方简介明确赵建华博士阶段师从郑国梁。", profile.zhaoJianhua),
  industry("p0-mainland-third-b1-zhang-industry", "yaqin-zhang-thu-p0-third-b1", "微软亚洲研究院 / 百度", "清华 AIR 官方简介明确张亚勤曾在微软任职 16 年并于 2014–2019 年担任百度总裁。", profile.zhang),
  lineage("p0-mainland-third-b1-guan-chen", "xiaohong-guan-thu-p0-third-b1", "xiuzhen-chen-p0-third-b1-support", "co_adviser", "共同博士导师", "上海交大官方简介明确陈秀真在西安交通大学博士阶段由管晓宏与郑庆华共同指导。", profile.chenXiuzhen),
];

export const candidatePriorityP0MainlandThirdPassBatch1GroupMembers2026: GroupMember[] = [];
export const candidatePriorityP0MainlandThirdPassBatch1Placements2026: StudentPlacement[] = [];

export const candidatePriorityP0MainlandThirdPassBatch1RosterPromotions2026 = [
  { unitUrl: roster.sjtuAi.url, rosterName: "林洲汉", atlasPersonId: "zhouhan-lin-sjtu-p0-third-b1" },
  { unitUrl: roster.sjtuCs.url, rosterName: "洪佳楠", atlasPersonId: "jianan-hong-sjtu-p0-third-b1" },
  { unitUrl: roster.sjtuAi.url, rosterName: "程远", atlasPersonId: "yuan-cheng-sjtu-p0-third-b1" },
  { unitUrl: roster.sjtuAi.url, rosterName: "赵沛霖", atlasPersonId: "peilin-zhao-sjtu-p0-third-b1" },
  { unitUrl: roster.pkuCis.url, rosterName: "吴玺宏", atlasPersonId: "xihong-wu-p0-full-b1-support" },
  { unitUrl: roster.njuAi.url, rosterName: "申富饶（教授）", atlasPersonId: "furao-shen-nju-p0-third-b1" },
  { unitUrl: roster.njuCs.url, rosterName: "赵建华 (博导)", atlasPersonId: "jianhua-zhao-nju-p0-third-b1" },
  { unitUrl: roster.thuAir.url, rosterName: "张亚勤", atlasPersonId: "yaqin-zhang-thu-p0-third-b1" },
  { unitUrl: roster.thuAutomation.url, rosterName: "管晓宏", atlasPersonId: "xiaohong-guan-thu-p0-third-b1" },
];

export const candidatePriorityP0MainlandThirdPassBatch1DispositionOverrides2026 = [
  { canonicalKey: "Mainland China:上海交通大学:林洲汉", disposition: "ready" as const, atlasPersonId: "zhouhan-lin-sjtu-p0-third-b1" },
  { canonicalKey: "Mainland China:上海交通大学:洪佳楠", disposition: "ready" as const, atlasPersonId: "jianan-hong-sjtu-p0-third-b1" },
  { canonicalKey: "Mainland China:上海交通大学:程远", disposition: "ready" as const, atlasPersonId: "yuan-cheng-sjtu-p0-third-b1" },
  { canonicalKey: "Mainland China:上海交通大学:赵沛霖", disposition: "ready" as const, atlasPersonId: "peilin-zhao-sjtu-p0-third-b1" },
  { canonicalKey: "Mainland China:北京大学:吴玺宏", disposition: "ready" as const, atlasPersonId: "xihong-wu-p0-full-b1-support" },
  { canonicalKey: "Mainland China:南京大学:申富饶教授", disposition: "ready" as const, atlasPersonId: "furao-shen-nju-p0-third-b1" },
  { canonicalKey: "Mainland China:南京大学:赵建华", disposition: "ready" as const, atlasPersonId: "jianhua-zhao-nju-p0-third-b1" },
  { canonicalKey: "Mainland China:清华大学:张亚勤", disposition: "ready" as const, atlasPersonId: "yaqin-zhang-thu-p0-third-b1" },
  { canonicalKey: "Mainland China:清华大学:管晓宏", disposition: "ready" as const, atlasPersonId: "xiaohong-guan-thu-p0-third-b1" },
];
