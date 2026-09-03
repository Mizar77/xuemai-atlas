import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const src = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, source: Source) => ({ label, value, source });

const roster = {
  thu: src("清华大学自动化系 · 教师队伍", "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm", "official", "现任教师名录"),
  pkuAi: src("北京大学智能学院 · 专职教师", "https://www.cis.pku.edu.cn/szdw/zzjs.htm", "official", "现任专职教师名录"),
  pkuCs: src("北京大学计算机学院 · 教师名录", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "现任教师名录"),
  sjtu: src("上海交通大学计算机学院 · 教师名录", "https://www.cs.sjtu.edu.cn/jiaoshiml.html", "official", "现任教师名录"),
  zju: src("浙江大学计算机学院 · 教师名录", "http://www.cs.zju.edu.cn/csen/27003/list.htm", "official", "现任教师名录"),
};

const sources = {
  feng: src("清华大学自动化系 · 冯建江", "https://www.au.tsinghua.edu.cn/info/1078/3262.htm", "official", "现职、教育、履历、方向与成果"),
  fengTeam: src("清华大学智能视觉组 · 科研奖励", "https://ivg.au.tsinghua.edu.cn/award.html", "profile", "冯建江作为周杰团队核心成员共同完成专利、论文和获奖项目"),
  tao: src("清华大学自动化系 · 陶建华", "https://www.au.tsinghua.edu.cn/info/1080/3219.htm", "official", "现职、教育、履历与研究方向"),
  taoIndustry: src("清华大学 BNRist · 清华—咪咕联合中心", "https://www.bnrist.tsinghua.edu.cn/info/1088/3295.htm", "official", "陶建华担任清华—咪咕联合研究中心机构负责人"),
  wu: src("浙江大学 · 巫英才", "https://person.zju.edu.cn/ycwu", "official", "现职、学院职务、方向与头像"),
  wuBio: src("HKUST CSE · Yingcai Wu author biography", "https://www.cse.ust.hk/~huamin/tvcg_qing_2017.pdf", "official", "香港科大博士训练与微软亚洲研究院研究经历"),
  wang: src("浙江大学 · 王文冠", "https://person.zju.edu.cn/wenguanwang", "official", "现职、教育、履历、研究方向与头像"),
  wangMentor: src("北京理工大学研究生院 · 王文冠", "https://grd.bit.edu.cn/fczs/b122509.htm", "official", "博士导师简兵与 UCLA 联培导师朱松纯"),
  yuan: src("北京大学智能学院 · 袁晓如", "https://eecs.pku.edu.cn/xxkxjsxy/info/1480/9819.htm", "official", "现职、教育、研究与学术服务"),
  yuanCollab: src("HKUST VisNexus · Publications", "https://vis.cse.ust.hk/groups/visnexus/publications.html", "official", "袁晓如与屈华民的多篇共同论文"),
  song: src("北京大学智能学院 · 宋国杰", "https://sai.pku.edu.cn/info/1022/2212.htm", "official", "现职、教育、方向、联合实验室与产业项目"),
  songEdu: src("北京大学信息科学技术学院 · Guojie Song", "https://eecs.pku.edu.cn/xxkxjsxy/info/1474/9679.htm", "official", "北京大学博士教育与研究方向"),
  huang: src("北京大学计算机学院 · 黄铁军", "https://cs.pku.edu.cn/info/1067/1625.htm", "official", "现职、研究方向与头像"),
  huangBio: src("北京大学 · 黄铁军教师简介", "https://eecs.pku.edu.cn/__local/1/A6/3A/752DDACB03CE1975A4D4ADF7933_3704D7BF_1AC4BB.pdf", "official", "教育经历、研究方向与学术履历"),
  huangIndustry: src("北京大学新闻网 · 北大—华为智能媒体联合实验室", "https://news.pku.edu.cn/xwzh/9e7c8e6e6a3240eb9823b246b759e3c4.htm", "official", "黄铁军担任北大—华为智能媒体联合实验室负责人"),
  lu: src("上海交通大学计算机学院 · 吕宝粮", "https://www.cs.sjtu.edu.cn/jiaoshiml/lyubaoliang.html", "official", "现职、教育、履历、方向与头像"),
  luStudent: src("上海交通大学新闻网 · 孔琦团队", "https://news.sjtu.edu.cn/zhxw/20250820/213732.html", "official", "孔琦在吕宝粮与赵海指导下完成硕士训练"),
  zhang: src("上海交通大学计算机学院 · 张拳石", "https://www.cs.sjtu.edu.cn/jiaoshiml/zhangquanshi.html", "official", "现职、教育、研究、荣誉与头像"),
  zhangLab: src("SJTU Explainable AI Lab · Quanshi Zhang", "https://sjtu-xai-lab.github.io/", "profile", "博士导师柴崎亮介与博士后导师朱松纯"),
  yang: src("上海交通大学计算机学院 · 杨小康", "https://www.cs.sjtu.edu.cn/jiaoshiml/yangxiaokang.html", "official", "现职、方向与头像"),
  yangBio: src("上海交通大学电子信息与电气工程学院 · Xiaokang Yang", "https://dzb.seiee.sjtu.edu.cn/english/detail/842_802.htm", "official", "教育、国际研究履历与研究方向"),
  yangIndustry: src("上海交通大学计算机学院 · 科研合作", "https://cs.sjtu.edu.cn/kyhz.html", "official", "杨小康负责联想、中国太保和华为联合实验室"),
};

type Entry = { id: string; name: string; role: string; institution: Person["institution"]; area: string; tags: string[]; summary: string; stage: Person["stage"]; profile: Source; roster: Source; portraitFile: string; portraitUrl: string; facts: Array<[string, string, Source]>; x: number };
const person = (e: Entry): Person => ({
  id: e.id, name: e.name, role: e.role, institution: e.institution, region: "Mainland China", area: e.area, tags: e.tags,
  summary: e.summary, category: "core", stage: e.stage, primary: true, status: "current independent PI · strict P0 fourth-pass verified",
  x: e.x, y: 980, introducedAt: checkedAt, lastVerifiedAt: checkedAt, sources: [e.profile, e.roster],
  portrait: { src: `portraits/candidate-p0-mainland-fourth-pass-2026/${e.portraitFile}`, alt: `${e.name} 官方头像`, source: { ...e.profile, label: `${e.profile.label} · 人物头像`, url: e.portraitUrl, supports: "官方院系或本人主页单人头像；已人工检查并转制为 512×512" } },
  facts: e.facts.map(([label, value, source]) => fact(label, value, source)),
});

export const candidatePriorityP0MainlandFourthPassBatch1People2026: Person[] = [
  person({ id: "jianjiang-feng-thu-p0-fourth-b1", name: "冯建江", role: "Tenured Associate Professor", institution: "THU", area: "Computer Vision · Biometrics", tags: ["计算机视觉", "生物特征识别", "指纹识别"], summary: "清华智能视觉组骨干，研究指纹、人体生物特征与医学影像分析。", stage: "senior", profile: sources.feng, roster: roster.thu, portraitFile: "jianjiang-feng.jpg", portraitUrl: "https://www.au.tsinghua.edu.cn/__local/8/96/08/6B65844A3C743D4F205088E9612_ED1D1C18_586F.jpg", x: 120, facts: [["当前任职", "清华大学自动化系长聘副教授。", sources.feng], ["教育与学术训练", "北京邮电大学取得学士和博士学位，后在香港理工大学任研究助理、在密歇根州立大学从事博士后研究。", sources.feng], ["研究主线", "研究指纹识别、人体生物特征识别、计算机视觉与医学影像分析。", sources.feng], ["团队合作", "清华智能视觉组页面将其列为周杰团队核心成员，并记录共同专利、论文与奖励。", sources.fengTeam]] }),
  person({ id: "jianhua-tao-thu-p0-fourth-b1", name: "陶建华", role: "Tenured Professor", institution: "THU", area: "Speech · Affective Computing · Multimodal AI", tags: ["语音", "情感计算", "多模态", "人机交互"], summary: "从中科院自动化所转入清华，研究语音、情感计算与多模态人机交互。", stage: "senior", profile: sources.tao, roster: roster.thu, portraitFile: "jianhua-tao.jpg", portraitUrl: "https://www.au.tsinghua.edu.cn/__local/0/0D/4A/56C7ADA0952ADD2A2B4E8174CCC_A58F22D4_5ADB.jpg", x: 300, facts: [["当前任职", "清华大学自动化系长聘教授。", sources.tao], ["教育与学术训练", "南京大学获理学学士和硕士，2001 年获清华大学工学博士。", sources.tao], ["职业履历", "曾在清华计算机系与中国科学院自动化研究所任职，2022 年回到清华自动化系。", sources.tao], ["研究主线", "研究语音、情感计算、智能融合与多模态人机交互。", sources.tao], ["产业合作", "清华官方页面记录其担任清华—咪咕联合研究中心机构负责人。", sources.taoIndustry]] }),
  person({ id: "yingcai-wu-zju-p0-fourth-b1", name: "巫英才", role: "Professor · Deputy Dean", institution: "ZJU", area: "Visual Analytics · HCI", tags: ["可视分析", "信息可视化", "HCI"], summary: "浙江大学可视分析与人机交互方向教授、计算机学院副院长。", stage: "senior", profile: sources.wu, roster: roster.zju, portraitFile: "yingcai-wu.jpg", portraitUrl: "https://person.zju.edu.cn/person//attachments/2024-11/1119055202-88581959.jpg", x: 480, facts: [["当前任职", "浙江大学计算机学院教授、博士生导师、副院长。", sources.wu], ["教育与学术训练", "香港科技大学取得博士学位。", sources.wuBio], ["产业研究履历", "HKUST 托管的作者履历记录其曾在微软亚洲研究院任研究员。", sources.wuBio], ["研究主线", "研究可视分析、信息可视化和人机交互。", sources.wu]] }),
  person({ id: "wenguan-wang-zju-p0-fourth-b1", name: "王文冠", role: "ZJU100 Young Professor · PhD Advisor", institution: "ZJU", area: "Embodied AI · Vision-Language", tags: ["具身智能", "视觉语言", "神经符号", "AI4Science"], summary: "具有 ETH、UCLA 与产业研究训练，聚焦具身智能和视觉语言学习的青年 PI。", stage: "emerging", profile: sources.wang, roster: roster.zju, portraitFile: "wenguan-wang.jpg", portraitUrl: "https://person.zju.edu.cn/person//attachments/2026-08/0814102611-260858540.png", x: 660, facts: [["当前任职", "浙江大学百人计划研究员、博士生导师。", sources.wang], ["教育与学术训练", "2018 年获北京理工大学博士，北理工官方页面明确博士导师为简兵。", sources.wangMentor], ["联合培养", "博士期间在 UCLA 联合培养，北理工官方页面记录合作导师为朱松纯。", sources.wangMentor], ["职业履历", "曾在 ETH Zurich 从事研究并在悉尼科技大学任讲师。", sources.wang], ["研究主线", "研究具身智能、视觉语言学习、AI4Science 与神经符号方法。", sources.wang]] }),
  person({ id: "xiaoru-yuan-pku-p0-fourth-b1", name: "袁晓如", role: "Research Professor", institution: "PKU", area: "Visualization · Visual Analytics · HCI", tags: ["可视化", "可视分析", "HCI", "图形学"], summary: "北京大学信息可视化与可视分析方向资深 PI。", stage: "senior", profile: sources.yuan, roster: roster.pkuAi, portraitFile: "xiaoru-yuan.jpg", portraitUrl: "https://eecs.pku.edu.cn/virtual_attach_file.vsb?afc=GUzVfkU8-ZMmV7Lkl7aLNl8M7CZL7lRiMmGaL7LbUzCiUNU0gihFp2hmCIa0M1yZM1y4UYy4LNU8UllaMNUao7CYLN78o7LbnNQVMzM7L8WFUzGDM8QkMmVFLlCDM1b/v2veo4Oe_dAK_2X4_dN0qIbtpYyPMR9ag4NZLzNJqd7nx&oid=1535126037&tid=1480&nid=9819&e=.jpg", x: 840, facts: [["当前任职", "北京大学研究员，任信息科学中心副主任。", sources.yuan], ["教育与学术训练", "在北京大学接受化学与法学本科训练，2006 年获明尼苏达大学计算机科学博士。", sources.yuan], ["研究主线", "研究科学可视化、信息可视化、可视分析、人机交互与计算机图形学。", sources.yuan], ["学术合作", "HKUST VisNexus 官方论文列表记录其与屈华民的多篇共同论文。", sources.yuanCollab]] }),
  person({ id: "guojie-song-pku-p0-fourth-b1", name: "宋国杰", role: "Tenured Associate Professor · Researcher", institution: "PKU", area: "Graph Machine Learning · AI Agents", tags: ["图机器学习", "智能体", "价值观建模"], summary: "负责多所联合实验室、连接图学习与智能体产业应用的北京大学 PI。", stage: "senior", profile: sources.song, roster: roster.pkuAi, portraitFile: "guojie-song.jpg", portraitUrl: "https://sai.pku.edu.cn/virtual_attach_file.vsb?afc=jLNVwRolWRLmMfUXml8MNLinR9DMz6/kLmvaMlQ7M4CPnRv0gihFp2hmCIa0LYyYn1yZL1y4MzvZnmvDnRAfLzrkU8QRnmC4L7VVLRNaLmnFM7U4M8MfMzVFnR-iMm-Jqjfjo4OeosXJ_dTJQ5v0qIbtpYyPLR-Yg4-YLz-JqdKnx&oid=1887772040&tid=1022&nid=2212&e=.jpg", x: 1020, facts: [["当前任职", "北京大学长聘副教授、研究员，并担任智能学院与相关研究机构管理职务。", sources.song], ["教育与学术训练", "2004 年获北京大学计算机科学博士。", sources.songEdu], ["研究主线", "研究价值观建模、智能体建模与应用以及图机器学习。", sources.song], ["产业合作", "官方简介记录其负责北大—阿里妈妈、北大—中国铁塔联合实验室，并承担阿里和华为项目。", sources.song]] }),
  person({ id: "tiejun-huang-pku-p0-fourth-b1", name: "黄铁军", role: "Professor", institution: "PKU", area: "Computer Vision · Video Coding", tags: ["计算机视觉", "图像识别", "视频编码"], summary: "北京大学视觉信息处理与视频编码方向资深教授。", stage: "senior", profile: sources.huang, roster: roster.pkuCs, portraitFile: "tiejun-huang.jpg", portraitUrl: "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5UmNCZnNlsLNrRnQRvYozrfMmlsL8MqVUzUZnmlaMR-8LRL0gihFp2hmCIa0LSyZokysn1y8M4QRLzf7MRG8nmN8M47ZnzNZo7LZLmWVM4WFUmUinmA2nlWFMRTRM49Jv2bjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.png", x: 1200, facts: [["当前任职", "北京大学计算机学院教授。", sources.huang], ["教育与学术训练", "1998 年获华中科技大学博士学位。", sources.huangBio], ["研究主线", "研究图像识别、视频编码、数字媒体与视觉信息处理。", sources.huang], ["产业合作", "北京大学新闻网记录其担任北大—华为智能媒体联合实验室负责人。", sources.huangIndustry]] }),
  person({ id: "baoliang-lu-sjtu-p0-fourth-b1", name: "吕宝粮", role: "Professor", institution: "SJTU", area: "Brain-like Computing · Machine Learning", tags: ["类脑计算", "机器学习", "脑机接口", "情感计算"], summary: "上海交大类脑计算、脑机接口和情感计算方向资深 PI。", stage: "senior", profile: sources.lu, roster: roster.sjtu, portraitFile: "baoliang-lu.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%90%95%E5%AE%9D%E7%B2%AE.jpg", x: 1380, facts: [["当前任职", "上海交通大学计算机学院教授。", sources.lu], ["教育与学术训练", "青岛大学本科、西北工业大学硕士，1994 年获京都大学博士。", sources.lu], ["职业履历", "曾在日本理化学研究所工作，2002 年起任职上海交通大学。", sources.lu], ["研究主线", "研究类脑计算、机器学习、脑机接口与情感计算。", sources.lu], ["人才培养", "上海交大新闻网明确孔琦的硕士阶段由吕宝粮和赵海共同指导。", sources.luStudent]] }),
  person({ id: "quanshi-zhang-sjtu-p0-fourth-b1", name: "张拳石", role: "Tenured Associate Professor", institution: "SJTU", area: "Explainable AI · Computer Vision", tags: ["可解释 AI", "计算机视觉", "机器学习"], summary: "研究深度模型可解释性和计算机视觉的上海交大 PI。", stage: "emerging", profile: sources.zhang, roster: roster.sjtu, portraitFile: "quanshi-zhang.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%BC%A0%E6%8B%B3%E7%9F%B3.jpg", x: 1560, facts: [["当前任职", "上海交通大学计算机学院长聘副教授。", sources.zhang], ["教育与学术训练", "北京大学本科，东京大学硕士和博士。", sources.zhang], ["博士师承", "本人实验室主页明确博士导师为柴崎亮介。", sources.zhangLab], ["博士后训练", "本人实验室主页明确在 UCLA 由朱松纯指导博士后研究。", sources.zhangLab], ["研究主线", "研究可解释人工智能、机器学习与计算机视觉。", sources.zhang]] }),
  person({ id: "xiaokang-yang-sjtu-p0-fourth-b1", name: "杨小康", role: "Chair Professor", institution: "SJTU", area: "Computer Vision · Multimedia", tags: ["计算机视觉", "多媒体", "图像视频", "模式识别"], summary: "连接视觉、多媒体和大型校企联合实验室的上海交大讲席教授。", stage: "senior", profile: sources.yang, roster: roster.sjtu, portraitFile: "xiaokang-yang.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E6%9D%A8%E5%B0%8F%E5%BA%B7.jpg", x: 1740, facts: [["当前任职", "上海交通大学计算机学院讲席研究员、人工智能研究院教授。", sources.yang], ["教育与学术训练", "厦门大学本科、中国科学院硕士，2000 年获上海交通大学博士。", sources.yangBio], ["国际研究履历", "曾在 Freiburg、A*STAR/I2R 与南洋理工大学从事研究。", sources.yangBio], ["研究主线", "研究图像视频处理、计算机视觉、多媒体与模式识别。", sources.yangBio], ["产业合作", "学院科研合作页列出其负责联想、中国太保与华为联合实验室。", sources.yangIndustry]] }),
];

const support = (id: string, name: string, institution: Person["institution"], role: string, source: Source): Person => ({ id, name, role, institution, region: "Mainland China", area: "Verified relationship endpoint", tags: ["关系端点"], summary: "由一手来源确认的关系端点。", category: "adjacent", stage: "adjacent", primary: false, sources: [source], x: 0, y: 0 });
export const candidatePriorityP0MainlandFourthPassBatch1SupportingPeople2026: Person[] = [
  support("jie-zhou-thu-p0-fourth-support", "周杰", "THU", "Professor · collaborator", sources.fengTeam),
  support("jianbing-shen-p0-fourth-support", "简兵", "BIT", "PhD supervisor", sources.wangMentor),
  support("huamin-qu-p0-fourth-support", "屈华民", "HKUST", "Professor · collaborator", sources.yuanCollab),
  support("qi-kong-p0-fourth-support", "孔琦", "External", "Founder · former master student", sources.luStudent),
  support("ryosuke-shibasaki-p0-fourth-support", "Ryosuke Shibasaki", "External", "PhD supervisor", sources.zhangLab),
];

const rel = (id: string, from: string, to: string, type: Relationship["type"], subtype: NonNullable<Relationship["subtype"]>, label: string, evidence: string, source: Source): Relationship => ({ id, from, to, type, subtype, label, evidence, source, verified: true });
const industry = (id: string, personId: string, label: string, evidence: string, source: Source) => rel(id, personId, personId, "industry", "industry_affiliation", label, evidence, source);
export const candidatePriorityP0MainlandFourthPassBatch1Relationships2026: Relationship[] = [
  rel("p0-mainland-fourth-feng-zhou", "jianjiang-feng-thu-p0-fourth-b1", "jie-zhou-thu-p0-fourth-support", "collaboration", "joint_project", "团队核心合作", "清华智能视觉组官方页面将冯建江列为周杰团队核心成员，并记录双方共同完成专利、论文与获奖项目。", sources.fengTeam),
  industry("p0-mainland-fourth-tao-migu", "jianhua-tao-thu-p0-fourth-b1", "清华—咪咕联合研究中心", "清华 BNRist 官方页面明确陶建华担任该联合研究中心的清华机构负责人。", sources.taoIndustry),
  industry("p0-mainland-fourth-wu-msra", "yingcai-wu-zju-p0-fourth-b1", "Microsoft Research Asia", "HKUST CSE 托管的论文作者履历明确记录巫英才曾在微软亚洲研究院任研究员。", sources.wuBio),
  rel("p0-mainland-fourth-shen-wang", "jianbing-shen-p0-fourth-support", "wenguan-wang-zju-p0-fourth-b1", "lineage", "phd_adviser", "博士导师", "北京理工大学研究生院官方页面明确王文冠博士阶段由简兵指导。", sources.wangMentor),
  rel("p0-mainland-fourth-yuan-qu", "xiaoru-yuan-pku-p0-fourth-b1", "huamin-qu-p0-fourth-support", "collaboration", "publication", "论文合作", "HKUST VisNexus 官方论文列表记录袁晓如与屈华民共同发表多篇可视化论文。", sources.yuanCollab),
  industry("p0-mainland-fourth-song-industry", "guojie-song-pku-p0-fourth-b1", "阿里妈妈 / 中国铁塔 / 华为", "北大官方简介明确宋国杰负责北大—阿里妈妈、北大—中国铁塔联合实验室并承担华为项目。", sources.song),
  industry("p0-mainland-fourth-huang-huawei", "tiejun-huang-pku-p0-fourth-b1", "北大—华为智能媒体联合实验室", "北京大学新闻网明确黄铁军担任北大—华为智能媒体联合实验室负责人。", sources.huangIndustry),
  rel("p0-mainland-fourth-lu-kong", "baoliang-lu-sjtu-p0-fourth-b1", "qi-kong-p0-fourth-support", "lineage", "co_adviser", "共同硕士导师", "上海交通大学新闻网明确孔琦的硕士阶段由吕宝粮与赵海共同指导。", sources.luStudent),
  rel("p0-mainland-fourth-shibasaki-zhang", "ryosuke-shibasaki-p0-fourth-support", "quanshi-zhang-sjtu-p0-fourth-b1", "lineage", "phd_adviser", "博士导师", "张拳石本人实验室主页明确其东京大学博士导师为 Ryosuke Shibasaki。", sources.zhangLab),
  industry("p0-mainland-fourth-yang-joint-labs", "xiaokang-yang-sjtu-p0-fourth-b1", "联想 / 中国太保 / 华为联合实验室", "上海交大计算机学院科研合作页列出杨小康负责三家企业联合实验室。", sources.yangIndustry),
];

export const candidatePriorityP0MainlandFourthPassBatch1GroupMembers2026: GroupMember[] = [];
export const candidatePriorityP0MainlandFourthPassBatch1Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0MainlandFourthPassBatch1RosterPromotions2026 = [
  { unitUrl: roster.thu.url, rosterName: "冯建江", atlasPersonId: "jianjiang-feng-thu-p0-fourth-b1" }, { unitUrl: roster.thu.url, rosterName: "陶建华", atlasPersonId: "jianhua-tao-thu-p0-fourth-b1" },
  { unitUrl: roster.zju.url, rosterName: "巫英才", atlasPersonId: "yingcai-wu-zju-p0-fourth-b1" }, { unitUrl: roster.zju.url, rosterName: "王文冠", atlasPersonId: "wenguan-wang-zju-p0-fourth-b1" },
  { unitUrl: roster.pkuAi.url, rosterName: "袁晓如", atlasPersonId: "xiaoru-yuan-pku-p0-fourth-b1" }, { unitUrl: roster.pkuAi.url, rosterName: "宋国杰", atlasPersonId: "guojie-song-pku-p0-fourth-b1" },
  { unitUrl: roster.pkuCs.url, rosterName: "黄铁军", atlasPersonId: "tiejun-huang-pku-p0-fourth-b1" }, { unitUrl: roster.sjtu.url, rosterName: "吕宝粮", atlasPersonId: "baoliang-lu-sjtu-p0-fourth-b1" },
  { unitUrl: roster.sjtu.url, rosterName: "张拳石", atlasPersonId: "quanshi-zhang-sjtu-p0-fourth-b1" }, { unitUrl: roster.sjtu.url, rosterName: "杨小康", atlasPersonId: "xiaokang-yang-sjtu-p0-fourth-b1" },
];
export const candidatePriorityP0MainlandFourthPassBatch1DispositionOverrides2026 = [
  ["Mainland China:清华大学:冯建江", "jianjiang-feng-thu-p0-fourth-b1"], ["Mainland China:清华大学:陶建华", "jianhua-tao-thu-p0-fourth-b1"], ["Mainland China:浙江大学:巫英才", "yingcai-wu-zju-p0-fourth-b1"], ["Mainland China:浙江大学:王文冠", "wenguan-wang-zju-p0-fourth-b1"], ["Mainland China:北京大学:袁晓如", "xiaoru-yuan-pku-p0-fourth-b1"], ["Mainland China:北京大学:宋国杰", "guojie-song-pku-p0-fourth-b1"], ["Mainland China:北京大学:黄铁军", "tiejun-huang-pku-p0-fourth-b1"], ["Mainland China:上海交通大学:吕宝粮", "baoliang-lu-sjtu-p0-fourth-b1"], ["Mainland China:上海交通大学:张拳石", "quanshi-zhang-sjtu-p0-fourth-b1"], ["Mainland China:上海交通大学:杨小康", "xiaokang-yang-sjtu-p0-fourth-b1"],
].map(([canonicalKey, atlasPersonId]) => ({ canonicalKey, disposition: "ready" as const, atlasPersonId }));
