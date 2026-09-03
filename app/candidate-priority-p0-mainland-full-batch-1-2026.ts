import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const src = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, source: Source) => ({ label, value, source });

const roster = {
  sjtuCs: src("上海交通大学计算机学院 · 教师名录", "https://www.cs.sjtu.edu.cn/jiaoshiml.html", "official", "现任教师与个人页入口"),
  sjtuAi: src("上海交通大学人工智能学院 · 专职教师", "https://sai.sjtu.edu.cn/cn/faculty/zzjs", "official", "现任专职教师名录"),
  pkuCs: src("北京大学计算机学院 · 教研系列名录", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "现任教师名录"),
  pkuCis: src("北京大学智能学院 · 专职教师", "https://www.cis.pku.edu.cn/szdw/zzjs.htm", "official", "现任专职教师名录"),
  njuAi: src("南京大学人工智能学院 · 师资名录", "https://ai.nju.edu.cn/people/list.htm", "official", "现任教师与职称"),
  thuAir: src("清华大学智能产业研究院 · 研究团队", "https://air.tsinghua.edu.cn/airtd/yjtd.htm", "official", "现任研究团队名录"),
  thuAu: src("清华大学自动化系 · 教师队伍", "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm", "official", "现任教师名录"),
};

const p = {
  manhua: src("上海交通大学计算机学院 · 刘满华", "https://www.cs.sjtu.edu.cn/jiaoshiml/liumanhua.html", "official", "现职、教育、研究、访问经历与头像"),
  yadong: src("上海交通大学计算机学院 · 吴亚东", "https://www.cs.sjtu.edu.cn/jiaoshiml/wuyadong.html", "official", "现职、教育、博士及博士后导师、研究与头像"),
  yuhao: src("上海交通大学计算机学院 · 张宇昊", "https://www.cs.sjtu.edu.cn/jiaoshiml/zhangyuhao.html", "official", "现职、教育、博士导师、研究与头像"),
  haojin: src("上海交通大学计算机学院 · 朱浩瑾", "https://www.cs.sjtu.edu.cn/jiaoshiml/zhuhaojin.html", "official", "现职、教育、博士及硕士导师、研究与头像"),
  chuan: src("上海交通大学人工智能学院 · 汶川", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/wenchuan", "official", "现职、博士与访问导师、研究、荣誉与头像"),
  yuncong: src("上海交通大学计算机学院 · 胡云聪", "https://www.cs.sjtu.edu.cn/jiaoshiml/huyuncong.html", "official", "现职、教育、共同博士导师、研究与头像"),
  weidi: src("上海交通大学人工智能学院 · 谢伟迪", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/xieweidi", "official", "现职、博士导师、研究、产业联合身份与头像"),
  hao: src("上海交通大学计算机学院 · 钟浩", "https://www.cs.sjtu.edu.cn/jiaoshiml/zhonghao.html", "official", "现职、博士与共同导师、工作履历及头像"),
  xieChen: src("上海交通大学计算机学院 · 陈谐", "https://www.cs.sjtu.edu.cn/jiaoshiml/chenxie.html", "official", "现职、教育、导师、产业经历、研究与头像"),
  tao: src("北京大学计算机学院 · 谢涛", "https://cs.pku.edu.cn/info/1084/1713.htm", "official", "现职、教育、导师、研究、学生培养与头像"),
  yanzhen: src("北京大学计算机学院 · 邹艳珍", "https://cs.pku.edu.cn/info/1012/4740.htm", "official", "现职、教育、博士导师、研究与头像"),
  jing: src("北京大学智能学院 · 陈婧", "https://www.cis.pku.edu.cn/info/1362/2249.htm", "official", "现职、博士与博士后导师、研究与头像"),
  henry: src("Henry W. J. Reeve · personal academic profile", "https://henryreeve.netlify.app", "profile", "教育、导师、研究、当前学生与人物照片"),
  guyue: src("清华大学智能产业研究院 · 周谷越", "https://air.tsinghua.edu.cn/info/1046/1199.htm", "official", "现职、教育、博士导师、产业经历、研究与头像"),
  yilin: src("清华大学自动化系 · 莫一林", "https://www.au.tsinghua.edu.cn/info/1076/3152.htm", "official", "现职、教育、博士与博士后导师、研究与头像"),
  xin: src("清华大学自动化系 · 裴欣", "https://www.au.tsinghua.edu.cn/info/1076/3250.htm", "official", "现职、教育、硕博及博士后导师、研究与头像"),
};

const portrait = (file: string, name: string, url: string, source: Source) => ({
  src: `portraits/candidate-p0-mainland-full-2026/${file}`,
  alt: `${name} 官方头像`,
  source: { ...source, label: `${source.label} · 人物头像`, url, supports: "个人页单人头像；已人工检查并转制为 512×512" },
});

const makePerson = (entry: {
  id: string; name: string; role: string; institution: Person["institution"]; area: string; tags: string[]; summary: string;
  stage: Person["stage"]; source: Source; rosterSource: Source; portraitFile: string; portraitUrl: string; facts: Array<[string, string]>;
  x: number; y: number;
}): Person => ({
  id: entry.id, name: entry.name, role: entry.role, institution: entry.institution, region: "Mainland China",
  area: entry.area, tags: entry.tags, summary: entry.summary, category: "core", status: "current independent PI · strict P0 gate verified",
  stage: entry.stage, primary: true, x: entry.x, y: entry.y, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
  portrait: portrait(entry.portraitFile, entry.name, entry.portraitUrl, entry.source), sources: [entry.source, entry.rosterSource],
  facts: entry.facts.map(([label, value]) => fact(label === "教育训练" ? "教育与学术训练" : label, value, entry.source)),
});

export const candidatePriorityP0MainlandFullBatch1People2026: Person[] = [
  makePerson({ id: "manhua-liu-sjtu-p0-full-b1", name: "刘满华", role: "Professor · PhD Advisor", institution: "SJTU", area: "Multimodal AI · Medical Imaging · Computer Vision", tags: ["多模态", "医学影像", "计算机视觉", "时空智能"], summary: "面向多模态医学影像、疾病诊断与三维视觉开展交叉 AI 研究的上海交大教授。", stage: "senior", source: p.manhua, rosterSource: roster.sjtuCs, portraitFile: "manhua-liu.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%88%98%E6%BB%A1%E5%8D%8E.jpg", x: 120, y: 140, facts: [["当前任职", "上海交通大学计算机学院教授、博士生导师。"], ["教育训练", "2006 年获南洋理工大学图像处理与模式识别博士，此前获上海交大硕士和华北工学院学士。"], ["研究主线", "研究人工智能、时空智能、多模态医学影像计算、疾病诊断和疗效预测。"], ["学术训练网络", "官方履历记录 2011–2012 年在 UNC 医学院放射系访问，由沈定刚教授指导。"]] }),
  makePerson({ id: "yadong-wu-sjtu-p0-full-b1", name: "吴亚东", role: "Tenure-track Associate Professor", institution: "SJTU", area: "Quantum Computing · Quantum AI", tags: ["量子计算", "量子人工智能", "量子信息"], summary: "聚焦量子信息与人工智能交叉研究的上海交大长聘教轨副教授。", stage: "emerging", source: p.yadong, rosterSource: roster.sjtuCs, portraitFile: "yadong-wu.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%90%B4%E4%BA%9A%E4%B8%9C.jpg", x: 260, y: 140, facts: [["当前任职", "上海交通大学 John Hopcroft 计算机科学中心长聘教轨副教授。"], ["教育训练", "2020 年获卡尔加里大学物理博士；此前获上海交大硕士和学士。"], ["博士师承", "官方页面明确其博士导师为 Barry Sanders。"], ["研究主线", "近期研究聚焦量子信息与人工智能的交叉领域。"], ["博士后训练", "2020–2024 年在香港大学从事博士后研究，由 Giulio Chiribella 指导。"]] }),
  makePerson({ id: "yuhao-zhang-sjtu-p0-full-b1", name: "张宇昊", role: "Tenure-track Associate Professor", institution: "SJTU", area: "Theoretical Computer Science · Online Algorithms", tags: ["理论计算机", "在线算法", "近似算法"], summary: "研究在线算法、近似算法与一般化算法分析框架的上海交大青年 PI。", stage: "emerging", source: p.yuhao, rosterSource: roster.sjtuCs, portraitFile: "yuhao-zhang.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%BC%A0%E5%AE%87%E6%98%8A.jpg", x: 400, y: 140, facts: [["当前任职", "上海交通大学计算机学院长聘教轨副教授，隶属理论计算机科学研究所与 John Hopcroft 中心。"], ["教育训练", "本科毕业于浙江大学，博士毕业于香港大学。"], ["博士师承", "官方页面明确其香港大学博士导师为黄志毅。"], ["研究主线", "研究理论计算机中的在线算法、近似算法及可推广的算法分析框架。"]] }),
  makePerson({ id: "haojin-zhu-sjtu-p0-full-b1", name: "朱浩瑾", role: "Distinguished Professor · IEEE Fellow", institution: "SJTU", area: "Security · Trustworthy AI · IoT", tags: ["安全", "可信 AI", "物联网", "隐私"], summary: "连接物联网安全、认知安全与可信人工智能的上海交大资深 PI。", stage: "senior", source: p.haojin, rosterSource: roster.sjtuCs, portraitFile: "haojin-zhu.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E6%9C%B1%E6%B5%A9%E7%91%BE.jpg", x: 540, y: 140, facts: [["当前任职", "上海交通大学计算机学院特聘教授、博士生导师、IEEE Fellow，并任人工智能与认知安全研究所所长。"], ["教育训练", "2009 年获滑铁卢大学博士，2005 年获上海交大硕士，2002 年获武汉大学学士。"], ["博士师承", "官方履历明确博士导师为 Xuemin Sherman Shen。"], ["硕士师承", "官方履历明确硕士导师为曹珍富。"], ["研究主线", "研究物联网系统安全，并延伸到认知安全和可信人工智能。"]] }),
  makePerson({ id: "chuan-wen-sjtu-p0-full-b1", name: "汶川", role: "Assistant Professor", institution: "SJTU", area: "Embodied AI · Robot Learning", tags: ["具身智能", "机器人", "感知与控制", "强化学习"], summary: "研究智能机器人感知与控制、具有清华与 Berkeley 训练背景的上海交大具身智能 PI。", stage: "emerging", source: p.chuan, rosterSource: roster.sjtuAi, portraitFile: "chuan-wen.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/wenchuan.jpg", x: 680, y: 140, facts: [["当前任职", "上海交通大学人工智能学院助理教授。"], ["教育训练", "博士毕业于清华大学交叉信息研究院。"], ["博士师承", "官方简介明确其博士阶段师从高阳。"], ["访问训练", "博士期间在 UC Berkeley 访学并师从 Pieter Abbeel。"], ["研究主线", "研究具身智能，重点是智能机器人感知与控制。"]] }),
  makePerson({ id: "yuncong-hu-sjtu-p0-full-b1", name: "胡云聪", role: "Assistant Professor · PhD Advisor", institution: "SJTU", area: "Applied Cryptography · Zero-Knowledge Proofs", tags: ["应用密码学", "零知识证明", "区块链", "可信计算"], summary: "从 Berkeley 密码学谱系进入上海交大、推动零知识证明理论与开源系统的青年 PI。", stage: "emerging", source: p.yuncong, rosterSource: roster.sjtuCs, portraitFile: "yuncong-hu.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E8%83%A1%E4%BA%91%E8%81%AA.jpg", x: 820, y: 140, facts: [["当前任职", "上海交通大学计算机学院助理教授、博士生导师。"], ["教育训练", "2017 年获上海交大学士，2022 年获 UC Berkeley 博士。"], ["共同博士导师", "官方简介明确其博士由 Raluca Popa 与 Alessandro Chiesa 共同指导。"], ["研究主线", "研究应用密码学与零知识证明，并参与 Marlin 与 Arkworks。"], ["产业连接", "官方页面记录其主持华为 ExploreX 基金项目。"]] }),
  makePerson({ id: "weidi-xie-sjtu-p0-full-b1", name: "谢伟迪", role: "Associate Professor · Shanghai AI Lab Adjunct Scientist", institution: "SJTU", area: "Computer Vision · Multimodal AI · AI for Medicine", tags: ["计算机视觉", "多模态", "AI4Medicine", "生成模型"], summary: "由 Oxford VGG 训练、连接上海交大与上海人工智能实验室的视觉和医学 AI PI。", stage: "emerging", source: p.weidi, rosterSource: roster.sjtuAi, portraitFile: "weidi-xie.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/xieweidi.png", x: 960, y: 140, facts: [["当前任职", "上海交通大学人工智能学院副教授、上海人工智能实验室双聘青年科学家。"], ["教育训练", "2018 年毕业于牛津大学视觉几何组（VGG）。"], ["博士师承", "官方简介明确其师从 Andrew Zisserman。"], ["研究主线", "研究计算机视觉、AI for Medicine 与多模态人工智能。"], ["人才项目", "承担科技创新 2030—新一代人工智能重大项目青年项目。"]] }),
  makePerson({ id: "hao-zhong-sjtu-p0-full-b1", name: "钟浩", role: "Research Professor", institution: "SJTU", area: "Software Engineering · Program Analysis", tags: ["软件工程", "程序分析", "软件智能"], summary: "从北大软件工程谱系延伸到中科院软件所与上海交大的研究型 PI。", stage: "senior", source: p.hao, rosterSource: roster.sjtuCs, portraitFile: "hao-zhong.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E9%92%9F%E6%B5%A9.jpg", x: 1100, y: 140, facts: [["当前任职", "上海交通大学计算机学院研究员，隶属智能软件与系统研究所。"], ["教育训练", "2009 年获北京大学计算机博士。"], ["博士师承", "本人简介明确博士导师为梅宏。"], ["共同指导", "本人简介记录博士阶段由张路与谢涛共同指导。"], ["研究主线", "研究软件工程、程序分析与智能软件系统。"]] }),
  makePerson({ id: "xie-chen-sjtu-p0-full-b1", name: "陈谐", role: "Associate Professor", institution: "SJTU", area: "Speech · Audio · Multimodal NLP", tags: ["语音", "音频生成", "自然语言处理", "多模态"], summary: "具有 Cambridge 与 Microsoft 训练背景、研究音频理解生成和语音对话的上海交大 PI。", stage: "emerging", source: p.xieChen, rosterSource: roster.sjtuCs, portraitFile: "xie-chen.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E9%99%88%E8%B0%90.jpg", x: 1240, y: 140, facts: [["当前任职", "上海交通大学计算机学院副教授、X-LANCE Lab 成员。"], ["教育训练", "获厦门大学学士、清华大学硕士和剑桥大学博士。"], ["博士师承", "官方履历明确剑桥博士导师为 Mark Gales。"], ["研究主线", "研究音频理解、音频生成、语音交互与对话，以及 NLP 和多模态处理。"], ["产业经历", "2018–2021 年在微软语言与对话研究组任高级及资深研究员。"]] }),
  makePerson({ id: "tao-xie-pku-p0-full-b1", name: "谢涛", role: "Chair Professor · Department Chair", institution: "PKU", area: "Software Engineering · Trustworthy AI · AI Systems", tags: ["软件工程", "可信人工智能", "智能系统", "RISC-V"], summary: "横跨软件工程、可信 AI 与开放计算系统，并拥有清晰师承和学生培养记录的北大讲席教授。", stage: "senior", source: p.tao, rosterSource: roster.pkuCs, portraitFile: "tao-xie.jpg", portraitUrl: "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5M4lCPUlVfMm7snQmfRLNn2UzfVMRfq7nlLYolVVn7-sL4l0gihFp2hmCIa0UShfoSysMYyaUzlZLmf7M7nRLNU4nzrkU4LaUlQfM77bU46FM4rkM4CiMzfFL4WkUz-Jv2bjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.png", x: 120, y: 320, facts: [["当前任职", "北京大学讲席教授、计算机学院软件科学与工程系主任，并在复旦大学双聘。"], ["教育训练", "1997 年获复旦学士、2000 年获北大硕士、2005 年获华盛顿大学博士。"], ["师承关系", "官方履历明确北大硕士师从梅宏，华盛顿大学博士师从 David Notkin。"], ["研究主线", "研究软件工程、操作系统、可信人工智能与 RISC-V。"], ["学生体系", "官方简介记录其博士生获得 ACM SIGSOFT 杰出博士论文奖等学生荣誉。"]] }),
  makePerson({ id: "yanzhen-zou-pku-p0-full-b1", name: "邹艳珍", role: "Research Professor", institution: "PKU", area: "Software Engineering · Software Mining", tags: ["软件工程", "软件复用", "软件数据挖掘"], summary: "在软件复用、软件数据挖掘与智能化软件工程方向延续北大梅宏谱系的研究型 PI。", stage: "senior", source: p.yanzhen, rosterSource: roster.pkuCs, portraitFile: "yanzhen-zou.jpg", portraitUrl: "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5UmVCfL4fknNLDUQNVkn7n7M7-bol7qDnlLbMRlaU4lZMl70gihFp2hmCIa0LkyYL1yYnSyioRvaU8-DL47inmLanlrRM7UbU8-4nl-snRWFMzCsnRV2oRrFUlrRLR-Jv2bjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.png", x: 280, y: 320, facts: [["当前任职", "北京大学计算机学院软件研究所研究员。"], ["教育训练", "2002 年获吉林大学计算机硕士，2010 年获北京大学计算机软件与理论博士。"], ["博士师承", "官方简介明确其北大博士师从梅宏。"], ["研究主线", "研究软件工程、软件复用与软件数据挖掘。"], ["学术履历", "2002 年起在北京大学信息科学技术学院任教。"]] }),
  makePerson({ id: "jing-chen-pku-p0-full-b1", name: "陈婧", role: "Research Professor", institution: "PKU", area: "Speech Perception · Auditory Intelligence", tags: ["语音", "听觉信息处理", "人机交互", "智能感知"], summary: "研究言语识别的听觉机制、助听与人工耳蜗信号处理的北大智能学院 PI。", stage: "senior", source: p.jing, rosterSource: roster.pkuCis, portraitFile: "jing-chen.jpg", portraitUrl: "https://www.cis.pku.edu.cn/virtual_attach_file.vsb?afc=5L8LCZUzW7LmlsUQN7sUNnVUNlDnRTqVLN7DM4GDozl4M4U0gihFp2hmCIa0U1ybnSyiM1yPnRnfnRNZLRARoRGsM8CYMm9PM8-4nz7DL7rFU4CiM8UboRAFM7Q2MYb/v2veo4Oe_tbZ_IbT6YhXptQ0gY84gY84gtA8pUpcc&oid=1887772040&e=.jpg", x: 440, y: 320, facts: [["当前任职", "北京大学智能学院研究员，研究听觉信息处理。"], ["教育训练", "2009 年获北京大学智能科学系信号与信息处理博士。"], ["共同博士导师", "官方简介明确其博士由迟惠生与吴玺宏共同指导。"], ["博士后训练", "2009–2012 年在剑桥大学由 Brian Moore 指导博士后研究。"], ["研究主线", "研究言语识别的听觉加工、言语可懂度与质量评价、助听器和人工耳蜗信号处理。"]] }),
  makePerson({ id: "henry-reeve-nju-p0-full-b1", name: "Henry W. J. Reeve", role: "Tenured Associate Professor", institution: "NJU", area: "Machine Learning Theory · Statistics", tags: ["机器学习理论", "统计学习", "迁移学习", "非参数推断"], summary: "在南京大学建设自适应非参数推断与机器学习团队、拥有双博士训练背景的理论 AI PI。", stage: "emerging", source: p.henry, rosterSource: roster.njuAi, portraitFile: "henry-reeve.jpg", portraitUrl: "https://henryreeve.netlify.app/images/avatar.jpg", x: 600, y: 320, facts: [["当前任职", "南京大学人工智能学院长聘副教授，建设 Adaptive Non-parametric Inference and Machine Learning 研究组。"], ["教育训练", "拥有 Manchester 计算机博士和 Bristol 纯数学博士学位。"], ["博士师承", "本人主页明确 Manchester 博士由 Gavin Brown 指导、Bristol 博士由 Thomas Jordan 指导。"], ["研究主线", "研究统计与机器学习，近期关注迁移学习、分布偏移与非参数推断。"], ["学生体系", "主页公开列出 Josh Givens、Manuel Müller、Isabella Degen 等共同指导学生。"]] }),
  makePerson({ id: "guyue-zhou-thu-p0-full-b1", name: "周谷越", role: "Associate Professor · DISCOVER Lab Director", institution: "THU", area: "Robotics · Computer Vision · Embodied AI", tags: ["机器人", "计算机视觉", "具身智能", "先进制造", "DJI"], summary: "从李泽湘谱系和 DJI 核心团队进入清华 AIR、兼具机器人科研和产品落地经验的 PI。", stage: "emerging", source: p.guyue, rosterSource: roster.thuAir, portraitFile: "guyue-zhou.jpg", portraitUrl: "https://air.tsinghua.edu.cn/__local/7/66/86/0467222E8E364F88539A1840816_E0C6E598_13C46.jpg", x: 760, y: 320, facts: [["当前任职", "清华大学智能产业研究院副研究员/副教授、DISCOVER Lab 主任。"], ["教育训练", "2014 年获香港科技大学电子与计算机工程博士。"], ["博士师承", "官方简介明确其博士师从李泽湘。"], ["研究主线", "研究先进制造、智能机器人、计算机视觉与人机交互。"], ["产业经历", "2012–2020 年任 DJI 技术负责人、产品经理和科学家，后兼任求之科技首席科学家。"]] }),
  makePerson({ id: "yilin-mo-thu-p0-full-b1", name: "莫一林", role: "Associate Professor", institution: "THU", area: "Cyber-Physical Systems · Networked Control", tags: ["信息物理系统", "网络化控制", "安全", "智能系统"], summary: "研究信息物理系统与网络化控制、连接 CMU、Caltech、NTU 和清华的自动化 PI。", stage: "senior", source: p.yilin, rosterSource: roster.thuAu, portraitFile: "yilin-mo.jpg", portraitUrl: "https://www.au.tsinghua.edu.cn/__local/B/87/8E/63A84EDA5AD59EF578637F060B8_18EAB042_C9A68.jpg", x: 920, y: 320, facts: [["当前任职", "清华大学自动化系副教授，隶属智能与网络化系统研究中心。"], ["教育训练", "2007 年获清华自动化学士，2012 年获 CMU 电子与计算机工程博士。"], ["博士师承", "官方页面明确其博士导师为 Bruno Sinopoli。"], ["博士后训练", "2013–2015 年在 Caltech 从事博士后研究，由 Richard M. Murray 指导。"], ["研究主线", "研究信息物理系统与网络化控制系统。"]] }),
  makePerson({ id: "xin-pei-thu-p0-full-b1", name: "裴欣", role: "Associate Research Professor", institution: "THU", area: "Intelligent Transportation · Decision and Control", tags: ["智能交通", "风险预测", "协同决策", "自动驾驶"], summary: "研究人—车—路协同安全、风险感知预测和智能决策控制的清华自动化 PI。", stage: "senior", source: p.xin, rosterSource: roster.thuAu, portraitFile: "xin-pei.jpg", portraitUrl: "https://www.au.tsinghua.edu.cn/__local/9/08/A4/BE52D3AA40552B86BF99CFA274A_88E6369D_4635.jpg", x: 1080, y: 320, facts: [["当前任职", "清华大学自动化系系统工程研究所副研究员。"], ["教育训练", "获清华自动化学士、清华交通运输规划与管理硕士和香港大学交通工程博士。"], ["硕博师承", "官方履历明确硕士导师为陆化普、博士导师为 S. C. Wong。"], ["博士后训练", "清华博士后阶段合作导师为姚丹亚。"], ["研究主线", "研究道路交通安全、驾驶风险、泛在网联环境下的协同安全决策与控制。"]] }),
];

const support = (id: string, name: string, role: string, area: string, source: Source, institution: Person["institution"] = "External"): Person => ({
  id, name, role, institution, area, tags: ["导师", area], summary: `一手人物页明确记录的 ${name} 学术指导关系节点。`, category: "adjacent", stage: "adjacent", primary: false, sources: [source], x: 0, y: 0,
});

export const candidatePriorityP0MainlandFullBatch1SupportingPeople2026: Person[] = [
  support("dinggang-shen-p0-full-b1-support", "Dinggang Shen", "Visiting research mentor", "Medical Imaging", p.manhua),
  support("barry-sanders-p0-full-b1-support", "Barry Sanders", "PhD supervisor", "Quantum Information", p.yadong),
  support("giulio-chiribella-p0-full-b1-support", "Giulio Chiribella", "Postdoctoral mentor", "Quantum Information", p.yadong),
  support("zhiyi-huang-p0-full-b1-support", "黄志毅", "PhD supervisor", "Theoretical Computer Science", p.yuhao),
  support("sherman-shen-p0-full-b1-support", "Xuemin Sherman Shen", "PhD supervisor", "Networks and Security", p.haojin),
  support("zhenfu-cao-p0-full-b1-support", "曹珍富", "Master supervisor", "Cryptography", p.haojin),
  support("yang-gao-p0-full-b1-support", "高阳", "PhD supervisor", "Robot Learning", p.chuan),
  support("raluca-popa-p0-full-b1-support", "Raluca Ada Popa", "Co-PhD supervisor", "Security and Cryptography", p.yuncong, "Berkeley"),
  support("hong-mei-p0-full-b1-support", "梅宏", "PhD/Master supervisor", "Software Engineering", p.tao, "PKU"),
  support("lu-zhang-p0-full-b1-support", "张路", "Co-PhD supervisor", "Software Engineering", p.hao),
  support("mark-gales-p0-full-b1-support", "Mark Gales", "PhD supervisor", "Speech Recognition", p.xieChen, "Cambridge"),
  support("david-notkin-p0-full-b1-support", "David Notkin", "PhD supervisor", "Software Engineering", p.tao),
  support("huisheng-chi-p0-full-b1-support", "迟惠生", "Co-PhD supervisor", "Signal Processing", p.jing),
  support("xihong-wu-p0-full-b1-support", "吴玺宏", "Co-PhD supervisor", "Speech and Hearing", p.jing, "PKU"),
  support("brian-moore-p0-full-b1-support", "Brian Moore", "Postdoctoral mentor", "Auditory Perception", p.jing, "Cambridge"),
  support("gavin-brown-p0-full-b1-support", "Gavin Brown", "PhD supervisor", "Machine Learning", p.henry, "Manchester"),
  support("thomas-jordan-p0-full-b1-support", "Thomas Jordan", "PhD supervisor", "Mathematics", p.henry),
  support("zexiang-li-p0-full-b1-support", "李泽湘", "PhD supervisor", "Robotics", p.guyue, "HKUST"),
  support("bruno-sinopoli-p0-full-b1-support", "Bruno Sinopoli", "PhD supervisor", "Networked Control", p.yilin),
  support("richard-murray-p0-full-b1-support", "Richard M. Murray", "Postdoctoral mentor", "Control Systems", p.yilin),
  support("huapu-lu-p0-full-b1-support", "陆化普", "Master supervisor", "Transportation Systems", p.xin, "THU"),
  support("sc-wong-p0-full-b1-support", "S. C. Wong", "PhD supervisor", "Transportation Engineering", p.xin, "HKU"),
  support("danya-yao-p0-full-b1-support", "姚丹亚", "Postdoctoral mentor", "Intelligent Transportation", p.xin, "THU"),
];

const rel = (id: string, from: string, to: string, subtype: Relationship["subtype"], label: string, evidence: string, source: Source): Relationship => ({ id, from, to, type: "lineage", subtype, label, evidence, source, verified: true });
export const candidatePriorityP0MainlandFullBatch1Relationships2026: Relationship[] = [
  rel("p0-mainland-full-b1-shen-liu", "dinggang-shen-p0-full-b1-support", "manhua-liu-sjtu-p0-full-b1", "postdoc_mentor", "访问研究指导", "上海交大官方履历记录刘满华在 UNC 医学院放射系访问期间由沈定刚指导。", p.manhua),
  rel("p0-mainland-full-b1-sanders-wu", "barry-sanders-p0-full-b1-support", "yadong-wu-sjtu-p0-full-b1", "phd_adviser", "博士导师", "上海交大官方履历明确吴亚东在卡尔加里大学博士阶段的导师为 Barry Sanders。", p.yadong),
  rel("p0-mainland-full-b1-chiribella-wu", "giulio-chiribella-p0-full-b1-support", "yadong-wu-sjtu-p0-full-b1", "postdoc_mentor", "博士后导师", "上海交大官方履历明确吴亚东在香港大学博士后阶段由 Giulio Chiribella 指导。", p.yadong),
  rel("p0-mainland-full-b1-huang-zhang", "zhiyi-huang-p0-full-b1-support", "yuhao-zhang-sjtu-p0-full-b1", "phd_adviser", "博士导师", "上海交大官方页面明确张宇昊的香港大学博士导师为黄志毅。", p.yuhao),
  rel("p0-mainland-full-b1-shen-zhu", "sherman-shen-p0-full-b1-support", "haojin-zhu-sjtu-p0-full-b1", "phd_adviser", "博士导师", "上海交大官方履历明确朱浩瑾的滑铁卢大学博士导师为 Xuemin Sherman Shen。", p.haojin),
  rel("p0-mainland-full-b1-cao-zhu", "zhenfu-cao-p0-full-b1-support", "haojin-zhu-sjtu-p0-full-b1", "master_adviser", "硕士导师", "上海交大官方履历明确朱浩瑾的上海交大硕士导师为曹珍富。", p.haojin),
  rel("p0-mainland-full-b1-gao-wen", "yang-gao-p0-full-b1-support", "chuan-wen-sjtu-p0-full-b1", "phd_adviser", "博士导师", "上海交大人工智能学院官方简介明确汶川的清华博士导师为高阳。", p.chuan),
  rel("p0-mainland-full-b1-abbeel-wen", "pieter-abbeel-us", "chuan-wen-sjtu-p0-full-b1", "other", "访问导师", "上海交大人工智能学院官方简介明确汶川在 Berkeley 访问期间师从 Pieter Abbeel。", p.chuan),
  rel("p0-mainland-full-b1-popa-hu", "raluca-popa-p0-full-b1-support", "yuncong-hu-sjtu-p0-full-b1", "co_adviser", "共同博士导师", "上海交大官方简介明确胡云聪的 Berkeley 博士由 Raluca Popa 共同指导。", p.yuncong),
  rel("p0-mainland-full-b1-chiesa-hu", "alessandro-chiesa-epfl-p0-2026", "yuncong-hu-sjtu-p0-full-b1", "co_adviser", "共同博士导师", "上海交大官方简介明确胡云聪的 Berkeley 博士由 Alessandro Chiesa 共同指导。", p.yuncong),
  rel("p0-mainland-full-b1-zisserman-xie", "andrew-zisserman-eu", "weidi-xie-sjtu-p0-full-b1", "phd_adviser", "博士导师", "上海交大人工智能学院官方简介明确谢伟迪在 Oxford VGG 师从 Andrew Zisserman。", p.weidi),
  rel("p0-mainland-full-b1-mei-zhong", "hong-mei-p0-full-b1-support", "hao-zhong-sjtu-p0-full-b1", "phd_adviser", "博士导师", "钟浩在上海交大官方简介中明确写明北大博士导师为梅宏。", p.hao),
  rel("p0-mainland-full-b1-zhang-zhong", "lu-zhang-p0-full-b1-support", "hao-zhong-sjtu-p0-full-b1", "co_adviser", "共同博士导师", "钟浩本人简介记录北大博士阶段由张路共同指导。", p.hao),
  rel("p0-mainland-full-b1-xie-zhong", "tao-xie-pku-p0-full-b1", "hao-zhong-sjtu-p0-full-b1", "co_adviser", "共同博士导师", "钟浩本人简介记录北大博士阶段由谢涛共同指导。", p.hao),
  rel("p0-mainland-full-b1-gales-chen", "mark-gales-p0-full-b1-support", "xie-chen-sjtu-p0-full-b1", "phd_adviser", "博士导师", "上海交大官方履历明确陈谐的剑桥大学博士导师为 Mark Gales。", p.xieChen),
  rel("p0-mainland-full-b1-mei-xie", "hong-mei-p0-full-b1-support", "tao-xie-pku-p0-full-b1", "master_adviser", "硕士导师", "北大官方履历明确谢涛的北京大学硕士阶段师从梅宏。", p.tao),
  rel("p0-mainland-full-b1-notkin-xie", "david-notkin-p0-full-b1-support", "tao-xie-pku-p0-full-b1", "phd_adviser", "博士导师", "北大官方履历明确谢涛的华盛顿大学博士导师为 David Notkin。", p.tao),
  rel("p0-mainland-full-b1-mei-zou", "hong-mei-p0-full-b1-support", "yanzhen-zou-pku-p0-full-b1", "phd_adviser", "博士导师", "北大官方简介明确邹艳珍的博士师从梅宏。", p.yanzhen),
  rel("p0-mainland-full-b1-chi-chen", "huisheng-chi-p0-full-b1-support", "jing-chen-pku-p0-full-b1", "co_adviser", "共同博士导师", "北大智能学院官方简介明确陈婧博士由迟惠生共同指导。", p.jing),
  rel("p0-mainland-full-b1-wu-chen", "xihong-wu-p0-full-b1-support", "jing-chen-pku-p0-full-b1", "co_adviser", "共同博士导师", "北大智能学院官方简介明确陈婧博士由吴玺宏共同指导。", p.jing),
  rel("p0-mainland-full-b1-moore-chen", "brian-moore-p0-full-b1-support", "jing-chen-pku-p0-full-b1", "postdoc_mentor", "博士后导师", "北大官方简介明确陈婧在剑桥博士后阶段由 Brian Moore 指导。", p.jing),
  rel("p0-mainland-full-b1-brown-reeve", "gavin-brown-p0-full-b1-support", "henry-reeve-nju-p0-full-b1", "phd_adviser", "博士导师", "Henry Reeve 本人学术主页明确其 Manchester 计算机博士由 Gavin Brown 指导。", p.henry),
  rel("p0-mainland-full-b1-jordan-reeve", "thomas-jordan-p0-full-b1-support", "henry-reeve-nju-p0-full-b1", "phd_adviser", "博士导师", "Henry Reeve 本人学术主页明确其 Bristol 纯数学博士由 Thomas Jordan 指导。", p.henry),
  rel("p0-mainland-full-b1-li-zhou", "zexiang-li-p0-full-b1-support", "guyue-zhou-thu-p0-full-b1", "phd_adviser", "博士导师", "清华 AIR 官方简介明确周谷越在香港科技大学博士阶段师从李泽湘。", p.guyue),
  rel("p0-mainland-full-b1-sinopoli-mo", "bruno-sinopoli-p0-full-b1-support", "yilin-mo-thu-p0-full-b1", "phd_adviser", "博士导师", "清华自动化系官方履历明确莫一林的 CMU 博士导师为 Bruno Sinopoli。", p.yilin),
  rel("p0-mainland-full-b1-murray-mo", "richard-murray-p0-full-b1-support", "yilin-mo-thu-p0-full-b1", "postdoc_mentor", "博士后导师", "清华自动化系官方履历明确莫一林在 Caltech 博士后阶段由 Richard M. Murray 指导。", p.yilin),
  rel("p0-mainland-full-b1-lu-pei", "huapu-lu-p0-full-b1-support", "xin-pei-thu-p0-full-b1", "master_adviser", "硕士导师", "清华自动化系官方履历明确裴欣的清华硕士导师为陆化普。", p.xin),
  rel("p0-mainland-full-b1-wong-pei", "sc-wong-p0-full-b1-support", "xin-pei-thu-p0-full-b1", "phd_adviser", "博士导师", "清华自动化系官方履历明确裴欣的香港大学博士导师为 S. C. Wong。", p.xin),
  rel("p0-mainland-full-b1-yao-pei", "danya-yao-p0-full-b1-support", "xin-pei-thu-p0-full-b1", "postdoc_mentor", "博士后导师", "清华自动化系官方履历明确裴欣的清华博士后合作导师为姚丹亚。", p.xin),
];

export const candidatePriorityP0MainlandFullBatch1GroupMembers2026: GroupMember[] = [
  { id: "p0-mainland-full-b1-reeve-givens", teacherId: "henry-reeve-nju-p0-full-b1", name: "Josh Givens", role: "Current student · co-supervised", focus: "Machine learning theory", source: p.henry },
  { id: "p0-mainland-full-b1-reeve-muller", teacherId: "henry-reeve-nju-p0-full-b1", name: "Manuel Müller", role: "Current student · co-supervised", focus: "Machine learning theory", source: p.henry },
  { id: "p0-mainland-full-b1-reeve-degen", teacherId: "henry-reeve-nju-p0-full-b1", name: "Isabella Degen", role: "Current student · co-supervised", focus: "Machine learning theory", source: p.henry },
];

export const candidatePriorityP0MainlandFullBatch1Placements2026: StudentPlacement[] = [];

export const candidatePriorityP0MainlandFullBatch1RosterPromotions2026 = [
  { unitUrl: roster.sjtuCs.url, rosterName: "刘满华", atlasPersonId: "manhua-liu-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuCs.url, rosterName: "吴亚东", atlasPersonId: "yadong-wu-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuCs.url, rosterName: "张宇昊", atlasPersonId: "yuhao-zhang-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuCs.url, rosterName: "朱浩瑾", atlasPersonId: "haojin-zhu-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuAi.url, rosterName: "汶川", atlasPersonId: "chuan-wen-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuCs.url, rosterName: "胡云聪", atlasPersonId: "yuncong-hu-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuAi.url, rosterName: "谢伟迪", atlasPersonId: "weidi-xie-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuCs.url, rosterName: "钟浩", atlasPersonId: "hao-zhong-sjtu-p0-full-b1" },
  { unitUrl: roster.sjtuCs.url, rosterName: "陈谐", atlasPersonId: "xie-chen-sjtu-p0-full-b1" },
  { unitUrl: roster.pkuCs.url, rosterName: "谢涛", atlasPersonId: "tao-xie-pku-p0-full-b1" },
  { unitUrl: roster.pkuCs.url, rosterName: "邹艳珍", atlasPersonId: "yanzhen-zou-pku-p0-full-b1" },
  { unitUrl: roster.pkuCis.url, rosterName: "陈婧", atlasPersonId: "jing-chen-pku-p0-full-b1" },
  { unitUrl: roster.njuAi.url, rosterName: "Henry W.J. Reeve（长聘副教授）", atlasPersonId: "henry-reeve-nju-p0-full-b1" },
  { unitUrl: roster.thuAir.url, rosterName: "周谷越", atlasPersonId: "guyue-zhou-thu-p0-full-b1" },
  { unitUrl: roster.thuAu.url, rosterName: "莫一林", atlasPersonId: "yilin-mo-thu-p0-full-b1" },
  { unitUrl: roster.thuAu.url, rosterName: "裴欣", atlasPersonId: "xin-pei-thu-p0-full-b1" },
];

export const candidatePriorityP0MainlandFullBatch1DispositionOverrides2026 = [
  ...candidatePriorityP0MainlandFullBatch1RosterPromotions2026.map((row) => ({
    canonicalKey: `Mainland China:${row.unitUrl.includes("sjtu") ? "上海交通大学" : row.unitUrl.includes("pku") ? "北京大学" : row.unitUrl.includes("nju") ? "南京大学" : "清华大学"}:${row.rosterName.replace(/[\s·•._()（）\-—–]+/g, "").toLowerCase()}`,
    disposition: "ready" as const,
    atlasPersonId: row.atlasPersonId,
  })),
  { canonicalKey: "Mainland China:北京大学:邹艳珍officialid1739", disposition: "duplicate" as const, atlasPersonId: "yanzhen-zou-pku-p0-full-b1" },
];
