import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, sourceRef: Source) => ({ label, value, source: sourceRef });

const rosters = {
  sjtuCs: source("上海交通大学计算机学院 · 教师名录", "https://www.cs.sjtu.edu.cn/jiaoshiml.html", "official", "现任教师名录与个人页入口"),
  sjtuAi: source("上海交通大学人工智能学院 · 专职教师", "https://sai.sjtu.edu.cn/cn/faculty/zzjs", "official", "现任专职教师名录"),
  njuCs: source("南京大学计算机学院 · 师资队伍", "https://cs.nju.edu.cn/1651/list.htm", "official", "现任教师名录与职称"),
  thuAir: source("清华大学智能产业研究院 · 研究团队", "https://air.tsinghua.edu.cn/airtd/yjtd.htm", "official", "现任研究团队名录"),
  pkuCs: source("北京大学计算机学院 · 教研系列", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", "official", "现任教师名录"),
};

const profiles = {
  weiwen: source("上海交通大学计算机学院 · 刘卫文", "https://www.cs.sjtu.edu.cn/jiaoshiml/liuweiwen.html", "official", "现职、博士教育、研究方向、华为履历与个人主页入口"),
  weiwenHome: source("Weiwen Liu · personal academic profile", "https://wwliu555.github.io/", "profile", "香港中文大学博士、导师、华为履历、研究方向与头像"),
  chentao: source("上海交通大学计算机学院 · 吴晨涛", "https://www.cs.sjtu.edu.cn/jiaoshiml/wuchentao.html", "official", "现职、双博士教育、存储研究、学术服务与头像"),
  chentaoHome: source("Chentao Wu · personal academic profile", "https://www.cs.sjtu.edu.cn/~wuct", "profile", "博士导师、研究方向、在读学生与校友去向"),
  xiaofan: source("上海交通大学计算机学院 · 张晓凡", "https://www.cs.sjtu.edu.cn/jiaoshiml/zhangxiaofan.html", "official", "现职、教育、产业经历、研究方向与头像"),
  xiaofanHome: source("Xiaofan Zhang · personal academic profile", "https://zhangxiaofan101.github.io", "profile", "教育训练、JD 与 SenseTime 履历及医学多模态研究"),
  yang: source("上海交通大学人工智能学院 · 杨旸", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/yangyang", "official", "现职、教育、Meta E7 履历、AI Agent 研究与头像"),
  yangHome: source("Yang Yang · personal academic profile", "https://angelayangyang1.github.io", "profile", "清华本科、西北大学博士和产业转学术履历"),
  lingxiao: source("南京大学计算机学院 · 黄棱潇", "https://cs.nju.edu.cn/a5/dd/c56396a632285/pagem.htm", "official", "现职、教育、博士后及华为履历、研究方向与头像"),
  lingxiaoHome: source("Lingxiao Huang · personal academic profile", "https://sites.google.com/site/lingxiaohuang1990", "profile", "清华博士导师、EPFL 与 Yale 博士后导师及研究方向"),
  yanwei: source("上海交通大学人工智能学院 · 李彦玮", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/liyanwei", "official", "现职、博士教育、ByteDance Seed 履历、研究与头像"),
  yanweiHome: source("Yanwei Li · personal academic profile", "https://yanwei-li.com/", "profile", "香港中文大学博士导师、多模态研究和招生信息"),
  li: source("上海交通大学计算机学院 · 蒋力", "https://www.cs.sjtu.edu.cn/jiaoshiml/jiangli.html", "official", "现职、教育、AI 系统研究、产业转化与个人主页入口"),
  liHome: source("Li Jiang · personal academic profile", "https://jianglisjtu.github.io/", "profile", "香港中文大学博士导师、研究方向、招生与头像"),
  wenzhao: source("上海交通大学人工智能学院 · 连文昭", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/lianwenzhao", "official", "现职、Duke 博士、Google X 与 Figure AI 履历、研究与头像"),
  wenzhaoHome: source("Wenzhao Lian · personal academic profile", "https://lianwenzhao.github.io/", "profile", "Duke 博士导师、学术训练与机器人产业履历"),
  mingda: source("上海交通大学人工智能学院 · 陈明达", "https://sai.sjtu.edu.cn/cn/facultydetails/zzjs/chenmingda", "official", "现职、Meta FAIR 履历、大模型研究与头像"),
  mingdaHome: source("Mingda Chen · personal academic profile", "https://mingdachen.github.io/", "profile", "Meta FAIR 研究履历、Google PhD Fellowship、研究与招生"),
  qing: source("南京大学计算机学院 · 汪庆", "https://cs.nju.edu.cn/10/3c/c56396a790588/pagem.htm", "official", "现职、清华博士、系统研究与代表成果"),
  qingHome: source("Qing Wang · personal academic profile", "https://wangqing.io/", "profile", "清华博士导师、华科本科、博士后履历与头像"),
  rong: source("上海交通大学计算机学院 · 陈榕", "https://www.cs.sjtu.edu.cn/jiaoshiml/chenrong.html", "official", "现职、系统软件研究、学术荣誉与头像"),
  rongHome: source("Rong Chen · IPADS profile", "https://ipads.se.sjtu.edu.cn/rong_chen", "profile", "复旦本硕博、博士导师、研究方向与学生名录"),
  biaoshuai: source("上海交通大学计算机学院 · 陶表帅", "https://www.cs.sjtu.edu.cn/jiaoshiml/taobiaoshuai.html", "official", "现职、教育、理论计算机研究与头像"),
  biaoshuaiHome: source("Biaoshuai Tao · personal academic profile", "https://jhc.sjtu.edu.cn/~bstao/", "profile", "Michigan 博士导师、南洋理工本科与研究方向"),
  xiang: source("北京大学计算机学院 · 陈翔", "https://cs.pku.edu.cn/info/1062/2863.htm", "official", "现职、研究所、AI 系统方向与官方头像"),
  xiangHome: source("Intelligent Fusion Lab · 陈翔", "https://if-lab-pku.github.io/", "profile", "匹兹堡博士导师、乔治梅森任教、研究与招生"),
  mingyu: source("上海交通大学计算机学院 · 吴明瑜", "https://www.cs.sjtu.edu.cn/jiaoshiml/wumingyu.html", "official", "现职、教育、运行时系统研究与头像"),
  mingyuHome: source("IPADS · 吴明瑜", "https://ipads.se.sjtu.edu.cn/zh/pub/members/mingyu_wu/", "profile", "博士导师、任职履历、研究方向与学生名录"),
  yan: source("清华大学智能产业研究院 · 王岩", "https://air.tsinghua.edu.cn/info/1046/1555.htm", "official", "现职、教育、商汤履历、研究方向与头像"),
  yanHome: source("Yan Wang · personal academic profile", "https://yanwang202199.github.io/", "profile", "清华博士、Cornell 访问经历与生成模型研究"),
};

type Entry = {
  id: string; name: string; role: string; institution: Person["institution"]; area: string; tags: string[]; summary: string;
  stage: Person["stage"]; official: Source; personal: Source; roster: Source; portraitFile: string; portraitUrl: string; portraitSource?: Source;
  facts: Array<[string, string, Source]>; x: number; y: number;
};

const makePerson = (entry: Entry): Person => ({
  id: entry.id, name: entry.name, role: entry.role, institution: entry.institution, region: "Mainland China", area: entry.area,
  tags: entry.tags, summary: entry.summary, category: "core", stage: entry.stage, primary: true,
  status: "current independent PI · strict P0 second-pass verified", x: entry.x, y: entry.y,
  introducedAt: checkedAt, lastVerifiedAt: checkedAt, sources: [entry.official, entry.personal, entry.roster],
  portrait: { src: `portraits/candidate-p0-mainland-second-pass-2026/${entry.portraitFile}`, alt: `${entry.name} 官方或本人主页头像`, source: { ...(entry.portraitSource ?? entry.official), label: `${(entry.portraitSource ?? entry.official).label} · 人物头像`, url: entry.portraitUrl, supports: "本人或官方院系页单人头像；已人工检查并转制为 512×512" } },
  facts: entry.facts.map(([label, value, sourceRef]) => fact(
    ["教育与师承", "教育训练", "学术训练"].includes(label) ? "教育与学术训练" : label,
    value,
    sourceRef,
  )),
});

export const candidatePriorityP0MainlandSecondPassBatch1People2026: Person[] = [
  makePerson({ id: "weiwen-liu-sjtu-p0-second-b1", name: "刘卫文", role: "Tenure-track Associate Professor", institution: "SJTU", area: "LLM Agents · User Preference · Information Retrieval", tags: ["LLM Agent", "用户偏好", "信息检索", "推荐系统"], summary: "从香港中文大学训练与华为诺亚方舟实验室进入上海交大、研究智能体与用户偏好的青年 PI。", stage: "emerging", official: profiles.weiwen, personal: profiles.weiwenHome, roster: rosters.sjtuCs, portraitFile: "weiwen-liu.jpg", portraitUrl: "https://wwliu555.github.io/images/profile.png", portraitSource: profiles.weiwenHome, x: 120, y: 520, facts: [["当前任职", "上海交通大学计算机学院长聘教轨副教授，隶属 John Hopcroft 中心与 APEX 实验室。", profiles.weiwen], ["教育与师承", "2020 年获香港中文大学计算机科学与工程博士，个人主页明确由 Pheng Ann Heng 等指导。", profiles.weiwenHome], ["产业履历", "2020 年 9 月至 2025 年 4 月任职华为诺亚方舟实验室；院系页记载其曾任主任工程师。", profiles.weiwenHome], ["研究主线", "研究大模型智能体、用户偏好建模与信息检索。", profiles.weiwen]] }),
  makePerson({ id: "chentao-wu-sjtu-p0-second-b1", name: "吴晨涛", role: "Professor · PhD Advisor", institution: "SJTU", area: "Storage Systems · Cloud Systems", tags: ["存储系统", "云计算", "大数据", "系统"], summary: "围绕可靠存储、云存储与大数据存储建设团队，并公开学生体系的上海交大教授。", stage: "senior", official: profiles.chentao, personal: profiles.chentaoHome, roster: rosters.sjtuCs, portraitFile: "chentao-wu.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%90%B4%E6%99%A8%E6%B6%9B.jpg", x: 280, y: 520, facts: [["当前任职", "上海交通大学计算机学院教授、博士生导师，任智能软件与系统研究所副所长。", profiles.chentao], ["教育训练", "先后在华中科技大学和 Virginia Commonwealth University 完成博士训练。", profiles.chentao], ["博士师承", "本人主页明确其 VCU 博士导师为 Xubin (Ben) He。", profiles.chentaoHome], ["研究主线", "研究可靠存储设备、文件系统数据管理、云存储和智能存储。", profiles.chentaoHome], ["学生体系", "本人主页公开列出在读生与校友及其首份工作去向。", profiles.chentaoHome]] }),
  makePerson({ id: "xiaofan-zhang-sjtu-p0-second-b1", name: "张晓凡", role: "Tenure-track Associate Professor · PhD Advisor", institution: "SJTU", area: "Medical AI · Multimodal Decision", tags: ["医学影像", "多模态", "LLM", "医疗 AI"], summary: "连接医学图像、医学大模型与多模态决策，并具有 JD 和 SenseTime 产业训练的上海交大 PI。", stage: "emerging", official: profiles.xiaofan, personal: profiles.xiaofanHome, roster: rosters.sjtuCs, portraitFile: "xiaofan-zhang.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%BC%A0%E6%99%93%E5%87%A1.jpg", x: 440, y: 520, facts: [["当前任职", "上海交通大学计算机学院清源研究院长聘教轨副教授、博士生导师，并在上海人工智能实验室双聘。", profiles.xiaofan], ["教育训练", "获北京航空航天大学学士和 UNC Charlotte 计算机博士。", profiles.xiaofan], ["产业履历", "曾任京东硅谷研究院计算机视觉研究员和商汤科技北美智慧医疗实验室高级研究员。", profiles.xiaofan], ["研究主线", "研究病理图像分析、医学领域大模型与多模态决策。", profiles.xiaofanHome]] }),
  makePerson({ id: "yang-yang-sjtu-p0-second-b1", name: "杨旸", role: "Tenure-track Associate Professor", institution: "SJTU", area: "AI Agents · Recommender Systems", tags: ["AI Agent", "推荐系统", "复杂网络", "产业 AI"], summary: "从统计物理转向大规模产业 AI、曾领导 Meta Business AI Agent 团队的上海交大 PI。", stage: "emerging", official: profiles.yang, personal: profiles.yangHome, roster: rosters.sjtuAi, portraitFile: "yang-yang.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/yangyang.png", x: 600, y: 520, facts: [["当前任职", "上海交通大学人工智能学院长聘教轨副教授。", profiles.yang], ["教育训练", "2010 年获清华大学物理学学士，2016 年获 Northwestern University 博士，随后留校做博士后。", profiles.yangHome], ["产业履历", "2018 年加入 Meta 广告与商业化 AI 团队，晋升至 E7 研究科学家。", profiles.yang], ["团队领导", "2023–2025 年担任 Meta Business AI Agent 团队负责人。", profiles.yang], ["研究主线", "聚焦 AI Agent、推荐系统与复杂网络在真实业务中的规模化应用。", profiles.yang]] }),
  makePerson({ id: "lingxiao-huang-nju-p0-second-b1", name: "黄棱潇", role: "Tenure-track Associate Professor · PhD Advisor", institution: "NJU", area: "Algorithms · Machine Learning Theory", tags: ["算法", "机器学习理论", "计算社会选择", "大数据"], summary: "由清华交叉信息院训练、历经 EPFL、Yale 与华为理论实验室的南京大学理论计算 PI。", stage: "emerging", official: profiles.lingxiao, personal: profiles.lingxiaoHome, roster: rosters.njuCs, portraitFile: "lingxiao-huang.jpg", portraitUrl: "https://cs.nju.edu.cn/_upload/article/images/c0/7c/b0feb5a64d50aa2e7f72933c9bd6/6b221133-11fa-4345-8b7f-912e4cf56ebb.jpg", x: 760, y: 520, facts: [["当前任职", "南京大学计算机学院准聘副教授、博士生导师。", profiles.lingxiao], ["教育与师承", "2017 年获清华大学交叉信息院博士，个人主页明确导师为 Jian Li。", profiles.lingxiaoHome], ["博士后训练", "先后在 EPFL 与 Yale 从事博士后研究，接受 Nisheeth K. Vishnoi 等指导。", profiles.lingxiaoHome], ["产业履历", "2020–2022 年在华为理论计算机实验室任高级研究员。", profiles.lingxiaoHome], ["研究主线", "研究算法、机器学习和计算社会选择。", profiles.lingxiaoHome]] }),
  makePerson({ id: "yanwei-li-sjtu-p0-second-b1", name: "李彦玮", role: "Tenure-track Assistant Professor", institution: "SJTU", area: "Multimodal Foundation Models · Generative AI", tags: ["多模态", "基础模型", "生成式 AI", "具身智能"], summary: "由贾佳亚指导、曾参与 ByteDance Seed 多模态模型研发的上海交大青年 PI。", stage: "emerging", official: profiles.yanwei, personal: profiles.yanweiHome, roster: rosters.sjtuAi, portraitFile: "yanwei-li.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/liyanwei.jpg", x: 920, y: 520, facts: [["当前任职", "上海交通大学人工智能学院长聘教轨助理教授。", profiles.yanwei], ["教育与师承", "2024 年获香港中文大学博士，个人主页明确导师为贾佳亚。", profiles.yanweiHome], ["产业履历", "曾任 ByteDance Seed 美国团队高级研究科学家。", profiles.yanwei], ["模型研发", "作为核心成员参与 Seed2.0、Seed1.8 与 Seed1.5-VL 等多模态基础模型。", profiles.yanwei], ["研究主线", "研究多模态基础模型、图像与视频生成、世界模型和具身机器人。", profiles.yanweiHome]] }),
  makePerson({ id: "li-jiang-sjtu-p0-second-b1", name: "蒋力", role: "Research Professor", institution: "SJTU", area: "AI Systems · Computer Architecture · EDA", tags: ["AI 系统", "体系结构", "EDA", "存算一体"], summary: "研究 AI 加速器、编译器与存算一体架构，并具有产业落地记录的上海交大研究员。", stage: "senior", official: profiles.li, personal: profiles.liHome, roster: rosters.sjtuCs, portraitFile: "li-jiang.jpg", portraitUrl: "https://jianglisjtu.github.io/photo.jpg", portraitSource: profiles.liHome, x: 1080, y: 520, facts: [["当前任职", "上海交通大学计算机学院研究员，隶属可扩展计算研究所。", profiles.li], ["教育训练", "在香港中文大学完成计算机科学与工程硕士和计算机系统结构博士。", profiles.li], ["博士师承", "本人主页明确其香港中文大学博士导师为徐强。", profiles.liHome], ["研究主线", "研究计算机体系结构、EDA、AI 专用处理器、编译器与存算一体。", profiles.liHome], ["产业转化", "院系页记录相关技术经华为、阿里巴巴产品线测试或大规模部署试用。", profiles.li]] }),
  makePerson({ id: "wenzhao-lian-sjtu-p0-second-b1", name: "连文昭", role: "Professor", institution: "SJTU", area: "Robotics · Dexterous Manipulation · Machine Learning", tags: ["机器人", "灵巧操作", "机器学习", "具身智能"], summary: "由 Lawrence Carin 指导、历经 Vicarious、Google X 与 Figure AI 的上海交大机器人 PI。", stage: "senior", official: profiles.wenzhao, personal: profiles.wenzhaoHome, roster: rosters.sjtuAi, portraitFile: "wenzhao-lian.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/lianwenzhao.png", x: 1240, y: 520, facts: [["当前任职", "上海交通大学人工智能学院教授。", profiles.wenzhao], ["教育与师承", "2015 年获 Duke University 电子与计算机工程博士，本人主页明确导师为 Lawrence Carin。", profiles.wenzhaoHome], ["产业履历", "曾任 Vicarious 高级研究员、Google X/Intrinsic 资深研究科学家及 Figure AI 技术总监。", profiles.wenzhaoHome], ["研究主线", "研究智能机器人、灵巧操作与机器学习。", profiles.wenzhao]] }),
  makePerson({ id: "mingda-chen-sjtu-p0-second-b1", name: "陈明达", role: "Associate Professor · PhD Advisor", institution: "SJTU", area: "LLM · Multimodal Foundation Models", tags: ["LLM", "多模态", "基础模型", "预训练"], summary: "曾在 Meta FAIR 领导预训练、多模态与记忆方向工作，并参与 ALBERT、Chameleon 和 LLaMA 的上海交大 PI。", stage: "emerging", official: profiles.mingda, personal: profiles.mingdaHome, roster: rosters.sjtuAi, portraitFile: "mingda-chen.jpg", portraitUrl: "https://sai.sjtu.edu.cn/Upload/Faculty/chenmingda.jpeg", x: 1400, y: 520, facts: [["当前任职", "上海交通大学人工智能学院副教授、博士生导师。", profiles.mingda], ["学术训练", "博士期间获 Google PhD Fellowship（自然语言处理方向）。", profiles.mingda], ["产业履历", "回国前任职 Meta Fundamental AI Research，领导预训练、多模态和记忆方向工作。", profiles.mingdaHome], ["模型研发", "官方简介记录其作为核心成员领导或参与 ALBERT、Chameleon 与 LLaMA 等模型研发。", profiles.mingda], ["研究主线", "研究文本与多模态大模型。", profiles.mingda]] }),
  makePerson({ id: "qing-wang-nju-p0-second-b1", name: "汪庆", role: "Tenure-track Associate Professor · PhD Advisor", institution: "NJU", area: "Storage · Networks · Operating Systems", tags: ["存储系统", "网络系统", "操作系统", "系统"], summary: "由舒继武指导、研究网络加速存储与新型内存系统的南京大学青年 PI。", stage: "emerging", official: profiles.qing, personal: profiles.qingHome, roster: rosters.njuCs, portraitFile: "qing-wang.jpg", portraitUrl: "https://wangqing.io/assets/wq.jpg", portraitSource: profiles.qingHome, x: 120, y: 700, facts: [["当前任职", "南京大学计算机学院准聘副教授、博士生导师。", profiles.qing], ["教育与师承", "2023 年获清华大学计算机博士，本人主页明确导师为舒继武；本科毕业于华中科技大学。", profiles.qingHome], ["博士后训练", "2023–2025 年从事博士后研究后进入南京大学。", profiles.qingHome], ["研究主线", "研究存储系统、网络系统与操作系统。", profiles.qing], ["代表方向", "第一作者工作覆盖网络加速分布式存储、分离式与非易失内存系统。", profiles.qing]] }),
  makePerson({ id: "rong-chen-sjtu-p0-second-b1", name: "陈榕", role: "Professor", institution: "SJTU", area: "Operating Systems · Distributed Systems", tags: ["操作系统", "分布式系统", "软硬协同", "系统软件"], summary: "从复旦系统谱系进入上海交大 IPADS、研究操作系统和分布式系统的资深 PI。", stage: "senior", official: profiles.rong, personal: profiles.rongHome, roster: rosters.sjtuCs, portraitFile: "rong-chen.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E9%99%88%E6%A6%95.jpg", x: 280, y: 700, facts: [["当前任职", "上海交通大学计算机学院教授、IPADS 成员。", profiles.rong], ["教育与师承", "在复旦大学完成计算机学士、硕士和博士，个人主页明确博士导师为臧斌宇。", profiles.rongHome], ["任职履历", "2012 年起加入上海交通大学并行与分布式系统研究所。", profiles.rongHome], ["研究主线", "研究操作系统、分布式系统与软硬件协同设计。", profiles.rongHome], ["学术影响", "院系页记录其在 OSDI、SOSP、EuroSys、ATC 等系统会议发表系列工作并获多次最佳论文奖。", profiles.rong]] }),
  makePerson({ id: "biaoshuai-tao-sjtu-p0-second-b1", name: "陶表帅", role: "Associate Professor", institution: "SJTU", area: "Algorithmic Game Theory · Computational Social Choice", tags: ["算法博弈论", "社会选择", "公平分配", "理论计算机"], summary: "研究理论计算机与经济学交叉问题、由 Grant Schoenebeck 指导的上海交大 PI。", stage: "emerging", official: profiles.biaoshuai, personal: profiles.biaoshuaiHome, roster: rosters.sjtuCs, portraitFile: "biaoshuai-tao.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E9%99%B6%E8%A1%A8%E5%B8%85.jpg", x: 440, y: 700, facts: [["当前任职", "2024 年起任上海交通大学计算机学院副教授。", profiles.biaoshuai], ["教育训练", "获南洋理工大学数学学士和 University of Michigan 计算机博士。", profiles.biaoshuai], ["博士师承", "本人主页明确博士导师为 Grant Schoenebeck。", profiles.biaoshuaiHome], ["研究主线", "研究算法博弈论、计算社会选择、公平分配与社会网络分析。", profiles.biaoshuai]] }),
  makePerson({ id: "xiang-chen-pku-p0-second-b1", name: "陈翔", role: "Tenure-track Associate Professor", institution: "PKU", area: "AI Systems · Hardware-Software Co-design", tags: ["AI Infra", "软硬协同", "多模态", "边缘计算"], summary: "由陈怡然指导、在 George Mason 获终身教职后回到北大建设 AI 计算系统的 PI。", stage: "emerging", official: profiles.xiang, personal: profiles.xiangHome, roster: rosters.pkuCs, portraitFile: "xiang-chen.jpg", portraitUrl: "https://cs.pku.edu.cn/virtual_attach_file.vsb?afc=5L4vCaUmGYMRNYMQR-DMRWknllbLRGqaL77soznVUzrRUml0gihFp2hmCIa0U1y8Mkh2USyaM4UiLNWRnRMRU8nVLzVfol-DMmnRo7VRLRQFLRf2Lz74nmTFUz67nRCJqjfjo4OeoDX4qjAb_khXptQ0gY84gY84gtA8pUpcc&oid=1934453449&e=.jpg", x: 600, y: 700, facts: [["当前任职", "北京大学计算机学院预聘副教授，隶属网络与高能效计算研究所。", profiles.xiang], ["教育与师承", "2016 年获 University of Pittsburgh 计算机工程博士，实验室主页明确师从陈怡然。", profiles.xiangHome], ["学术履历", "博士毕业后在 George Mason University 任教并获终身教职，2023 年全职加入北京大学。", profiles.xiangHome], ["研究主线", "研究软硬件协同、AI 加速系统与体系结构、边缘计算、多模态与生成式 AI、AI Infra。", profiles.xiangHome], ["招生信息", "实验室主页公开博士生与本科/研究生实习岗位。", profiles.xiangHome]] }),
  makePerson({ id: "mingyu-wu-sjtu-p0-second-b1", name: "吴明瑜", role: "Associate Professor · PhD Advisor", institution: "SJTU", area: "Operating Systems · Language Runtimes · AI Systems", tags: ["操作系统", "语言运行时", "AI for Science", "系统"], summary: "由陈海波指导、研究智能终端与 AI for Science 运行时系统的上海交大 PI。", stage: "emerging", official: profiles.mingyu, personal: profiles.mingyuHome, roster: rosters.sjtuCs, portraitFile: "mingyu-wu.jpg", portraitUrl: "https://www.cs.sjtu.edu.cn/upload/image/jiaoshiml/%E5%90%B4%E6%98%8E%E7%91%9C.jpg", x: 760, y: 700, facts: [["当前任职", "上海交通大学计算机学院副教授、博士生导师，IPADS 成员。", profiles.mingyuHome], ["教育与师承", "2020 年获上海交通大学计算机博士，IPADS 主页明确导师为陈海波。", profiles.mingyuHome], ["任职履历", "2020–2023 年任上海交大助理研究员，2023 年 12 月起任副教授。", profiles.mingyuHome], ["研究主线", "研究智能终端操作系统、语言运行时以及面向 AI for Science 的新型运行时。", profiles.mingyuHome], ["学生体系", "本人主页公开列出博士生、硕士生、本科生与校友。", profiles.mingyuHome]] }),
  makePerson({ id: "yan-wang-thu-p0-second-b1", name: "王岩", role: "Assistant Research Professor · Assistant Professor", institution: "THU", area: "Generative Models · Autonomous Driving · Embodied AI", tags: ["生成模型", "自动驾驶", "具身智能", "压缩"], summary: "从清华安全工程与 Cornell 访问训练进入商汤，再回到清华 AIR 研究生成模型应用的 PI。", stage: "emerging", official: profiles.yan, personal: profiles.yanHome, roster: rosters.thuAir, portraitFile: "yan-wang.jpg", portraitUrl: "https://air.tsinghua.edu.cn/__local/1/34/FC/DE8F20815E5E67609B865DEE62B_B8496BA0_38139.jpg", x: 920, y: 700, facts: [["当前任职", "清华大学智能产业研究院助理研究员、助理教授。", profiles.yan], ["教育训练", "2014–2019 年在清华大学获安全科学与工程博士，2017–2018 年赴 Cornell 访问。", profiles.yan], ["产业履历", "2019–2021 年在商汤科技任研究员和高级研究员，带领目标检测、模型压缩与数据压缩工作。", profiles.yan], ["研究主线", "研究生成模型在数据压缩、自动驾驶与具身智能中的应用。", profiles.yan]] }),
];

const support = (id: string, name: string, role: string, area: string, sourceRef: Source, institution: Person["institution"] = "External"): Person => ({
  id, name, role, institution, area, tags: ["导师", area], summary: `一手人物页明确记录的 ${name} 学术指导关系节点。`, category: "adjacent", stage: "adjacent", primary: false, sources: [sourceRef], x: 0, y: 0,
});

export const candidatePriorityP0MainlandSecondPassBatch1SupportingPeople2026: Person[] = [
  support("pheng-ann-heng-p0-second-b1-support", "Pheng Ann Heng", "PhD supervisor", "Computer Vision", profiles.weiwenHome, "CUHK"),
  support("xubin-he-p0-second-b1-support", "Xubin (Ben) He", "PhD supervisor", "Storage Systems", profiles.chentaoHome),
  support("jian-li-p0-second-b1-support", "Jian Li", "PhD supervisor", "Theoretical Computer Science", profiles.lingxiaoHome, "THU"),
  support("lawrence-carin-p0-second-b1-support", "Lawrence Carin", "PhD supervisor", "Machine Learning", profiles.wenzhaoHome),
  support("jiwu-shu-p0-second-b1-support", "舒继武", "PhD supervisor", "Storage Systems", profiles.qingHome, "THU"),
  support("binyu-zang-p0-second-b1-support", "臧斌宇", "PhD supervisor", "Operating Systems", profiles.rongHome, "FDU"),
  support("grant-schoenebeck-p0-second-b1-support", "Grant Schoenebeck", "PhD supervisor", "Theoretical Computer Science", profiles.biaoshuaiHome),
  support("yiran-chen-p0-second-b1-support", "陈怡然", "PhD supervisor", "AI Systems", profiles.xiangHome),
  support("haibo-chen-p0-second-b1-support", "陈海波", "PhD supervisor", "Operating Systems", profiles.mingyuHome, "SJTU"),
];

const lineage = (id: string, from: string, to: string, label: string, evidence: string, sourceRef: Source): Relationship => ({ id, from, to, type: "lineage", subtype: "phd_adviser", label, evidence, source: sourceRef, verified: true });
const industry = (id: string, personId: string, label: string, evidence: string, sourceRef: Source): Relationship => ({ id, from: personId, to: personId, type: "industry", subtype: "industry_affiliation", label, evidence, source: sourceRef, verified: true });

export const candidatePriorityP0MainlandSecondPassBatch1Relationships2026: Relationship[] = [
  lineage("p0-mainland-second-b1-heng-liu", "pheng-ann-heng-p0-second-b1-support", "weiwen-liu-sjtu-p0-second-b1", "博士导师", "刘卫文本人主页明确其香港中文大学博士由 Pheng Ann Heng 等指导。", profiles.weiwenHome),
  lineage("p0-mainland-second-b1-he-wu", "xubin-he-p0-second-b1-support", "chentao-wu-sjtu-p0-second-b1", "博士导师", "吴晨涛本人主页明确其 Virginia Commonwealth University 博士导师为 Xubin (Ben) He。", profiles.chentaoHome),
  industry("p0-mainland-second-b1-zhang-industry", "xiaofan-zhang-sjtu-p0-second-b1", "JD / SenseTime 产业履历", "上海交大官方简介记录张晓凡曾任京东硅谷研究院研究员及商汤科技北美智慧医疗实验室高级研究员。", profiles.xiaofan),
  industry("p0-mainland-second-b1-yang-meta", "yang-yang-sjtu-p0-second-b1", "Meta E7 / Business AI Agent", "上海交大官方简介记录杨旸在 Meta 晋升 E7 研究科学家并领导 Business AI Agent 团队。", profiles.yang),
  lineage("p0-mainland-second-b1-li-huang", "jian-li-p0-second-b1-support", "lingxiao-huang-nju-p0-second-b1", "博士导师", "黄棱潇本人主页明确其清华交叉信息院博士导师为 Jian Li。", profiles.lingxiaoHome),
  lineage("p0-mainland-second-b1-jia-li", "jiaya-jia-hkust", "yanwei-li-sjtu-p0-second-b1", "博士导师", "李彦玮本人主页明确其香港中文大学博士导师为贾佳亚。", profiles.yanweiHome),
  lineage("p0-mainland-second-b1-xu-jiang", "qiang-xu-cuhk-p0-tail", "li-jiang-sjtu-p0-second-b1", "博士导师", "蒋力本人主页明确其香港中文大学博士导师为徐强。", profiles.liHome),
  lineage("p0-mainland-second-b1-carin-lian", "lawrence-carin-p0-second-b1-support", "wenzhao-lian-sjtu-p0-second-b1", "博士导师", "连文昭本人主页明确其 Duke University 博士导师为 Lawrence Carin。", profiles.wenzhaoHome),
  industry("p0-mainland-second-b1-chen-meta", "mingda-chen-sjtu-p0-second-b1", "Meta FAIR 研究履历", "上海交大官方简介与本人主页均记录陈明达回国前任职 Meta FAIR。", profiles.mingda),
  lineage("p0-mainland-second-b1-shu-wang", "jiwu-shu-p0-second-b1-support", "qing-wang-nju-p0-second-b1", "博士导师", "汪庆本人主页明确其清华大学博士导师为舒继武。", profiles.qingHome),
  lineage("p0-mainland-second-b1-zang-chen", "binyu-zang-p0-second-b1-support", "rong-chen-sjtu-p0-second-b1", "博士导师", "陈榕本人 IPADS 主页明确其复旦大学博士导师为臧斌宇。", profiles.rongHome),
  lineage("p0-mainland-second-b1-schoenebeck-tao", "grant-schoenebeck-p0-second-b1-support", "biaoshuai-tao-sjtu-p0-second-b1", "博士导师", "陶表帅本人主页明确其 Michigan 博士导师为 Grant Schoenebeck。", profiles.biaoshuaiHome),
  lineage("p0-mainland-second-b1-chen-chen", "yiran-chen-p0-second-b1-support", "xiang-chen-pku-p0-second-b1", "博士导师", "陈翔实验室主页明确其 Pittsburgh 博士师从陈怡然。", profiles.xiangHome),
  lineage("p0-mainland-second-b1-chen-wu", "haibo-chen-p0-second-b1-support", "mingyu-wu-sjtu-p0-second-b1", "博士导师", "吴明瑜 IPADS 主页明确其上海交大博士导师为陈海波。", profiles.mingyuHome),
  industry("p0-mainland-second-b1-wang-sensetime", "yan-wang-thu-p0-second-b1", "商汤科技研究履历", "清华 AIR 官方页面记录王岩 2019–2021 年在商汤科技任研究员和高级研究员。", profiles.yan),
];

export const candidatePriorityP0MainlandSecondPassBatch1GroupMembers2026: GroupMember[] = [];
export const candidatePriorityP0MainlandSecondPassBatch1Placements2026: StudentPlacement[] = [];

export const candidatePriorityP0MainlandSecondPassBatch1RosterPromotions2026 = [
  { unitUrl: rosters.sjtuCs.url, rosterName: "刘卫文", atlasPersonId: "weiwen-liu-sjtu-p0-second-b1" },
  { unitUrl: rosters.sjtuCs.url, rosterName: "吴晨涛", atlasPersonId: "chentao-wu-sjtu-p0-second-b1" },
  { unitUrl: rosters.sjtuCs.url, rosterName: "张晓凡", atlasPersonId: "xiaofan-zhang-sjtu-p0-second-b1" },
  { unitUrl: rosters.sjtuAi.url, rosterName: "杨旸", atlasPersonId: "yang-yang-sjtu-p0-second-b1" },
  { unitUrl: rosters.njuCs.url, rosterName: "黄棱潇（准聘副教授、博导）", atlasPersonId: "lingxiao-huang-nju-p0-second-b1" },
  { unitUrl: rosters.sjtuAi.url, rosterName: "李彦玮", atlasPersonId: "yanwei-li-sjtu-p0-second-b1" },
  { unitUrl: rosters.sjtuCs.url, rosterName: "蒋力", atlasPersonId: "li-jiang-sjtu-p0-second-b1" },
  { unitUrl: rosters.sjtuAi.url, rosterName: "连文昭", atlasPersonId: "wenzhao-lian-sjtu-p0-second-b1" },
  { unitUrl: rosters.sjtuAi.url, rosterName: "陈明达", atlasPersonId: "mingda-chen-sjtu-p0-second-b1" },
  { unitUrl: rosters.njuCs.url, rosterName: "汪庆（准聘副教授、博导）", atlasPersonId: "qing-wang-nju-p0-second-b1" },
  { unitUrl: rosters.sjtuCs.url, rosterName: "陈榕", atlasPersonId: "rong-chen-sjtu-p0-second-b1" },
  { unitUrl: rosters.sjtuCs.url, rosterName: "陶表帅", atlasPersonId: "biaoshuai-tao-sjtu-p0-second-b1" },
  { unitUrl: rosters.pkuCs.url, rosterName: "陈翔", atlasPersonId: "xiang-chen-pku-p0-second-b1" },
  { unitUrl: rosters.sjtuCs.url, rosterName: "吴明瑜", atlasPersonId: "mingyu-wu-sjtu-p0-second-b1" },
  { unitUrl: rosters.thuAir.url, rosterName: "王岩", atlasPersonId: "yan-wang-thu-p0-second-b1" },
];

export const candidatePriorityP0MainlandSecondPassBatch1DispositionOverrides2026 = [
  { canonicalKey: "Mainland China:上海交通大学:刘卫文", disposition: "ready" as const, atlasPersonId: "weiwen-liu-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:吴晨涛", disposition: "ready" as const, atlasPersonId: "chentao-wu-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:张晓凡", disposition: "ready" as const, atlasPersonId: "xiaofan-zhang-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:杨旸", disposition: "ready" as const, atlasPersonId: "yang-yang-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:南京大学:黄棱潇准聘副教授博导", disposition: "ready" as const, atlasPersonId: "lingxiao-huang-nju-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:李彦玮", disposition: "ready" as const, atlasPersonId: "yanwei-li-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:蒋力", disposition: "ready" as const, atlasPersonId: "li-jiang-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:连文昭", disposition: "ready" as const, atlasPersonId: "wenzhao-lian-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:陈明达", disposition: "ready" as const, atlasPersonId: "mingda-chen-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:南京大学:汪庆准聘副教授博导", disposition: "ready" as const, atlasPersonId: "qing-wang-nju-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:陈榕", disposition: "ready" as const, atlasPersonId: "rong-chen-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:陶表帅", disposition: "ready" as const, atlasPersonId: "biaoshuai-tao-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:北京大学:陈翔", disposition: "ready" as const, atlasPersonId: "xiang-chen-pku-p0-second-b1" },
  { canonicalKey: "Mainland China:上海交通大学:吴明瑜", disposition: "ready" as const, atlasPersonId: "mingyu-wu-sjtu-p0-second-b1" },
  { canonicalKey: "Mainland China:清华大学:王岩", disposition: "ready" as const, atlasPersonId: "yan-wang-thu-p0-second-b1" },
];
