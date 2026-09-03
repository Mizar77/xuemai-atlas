import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-02";
const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const src = {
  jdl: official("先进人机通信技术联合实验室 · 桃李天下", "https://www.jdl.ac.cn/rencai/taolitianxia", "博士培养名录中的姓名、完成时间、导师和毕业当年去向"),
  zhang2021: official("北京大学视频与视觉技术中心 · 2021 年度总结", "https://idm.pku.edu.cn/info/1012/1449.htm", "叶剑鸣的年级和导师为张史梁；张嘉琪、鲁昊鹏的共同导师包括马思伟"),
  zhang2022: official("北京大学视频与视觉技术中心 · 2022 年度总结", "https://idm.pku.edu.cn/info/1012/1629.htm", "王东凯的年级和导师为张史梁；翟云鹏的导师为田永鸿"),
  zhangLi: official("北京大学 · 李佳宁博士答辩", "https://idm.pku.edu.cn/info/1034/1517.htm", "博士论文、导师张史梁、2022 年毕业去向 Sony Semiconductor Solutions"),
  zhangWang: official("北京大学 · 王东凯博士答辩", "https://idm.pku.edu.cn/info/1034/1903.htm", "博士论文、导师张史梁、2024 年毕业去向西南财经大学"),
  zhangMao: official("北京大学 · 毛书南博士答辩", "https://idm.pku.edu.cn/info/1034/1931.htm", "博士论文、导师张史梁、2024 年毕业去向上海市张江数学研究院"),
  zhangYe: official("北京大学 · 叶剑鸣博士答辩", "https://idm.pku.edu.cn/info/1034/1714.htm", "博士论文、导师张史梁、2023 年毕业去向 OPPO"),
  zhangXuan: official("北京大学 · 轩诗宇博士答辩", "https://idm.pku.edu.cn/info/1034/1904.htm", "博士论文、导师张史梁、2024 年毕业去向南京理工大学"),
  zhangChen: official("北京大学 · 陈震博士答辩", "https://idm.pku.edu.cn/info/1034/2349.htm", "博士论文、导师张史梁、2025 年毕业去向中国电信"),
  tianGroup: official("北京大学多媒体学习组 · Staff", "https://www.pkuml.org/staff/all-staff.html", "MLG 当前博士后、博士生与历届博士、博士后名录"),
  tianZhu: official("北京大学 · 朱林博士答辩", "https://idm.pku.edu.cn/info/1034/1515.htm", "博士论文、导师田永鸿、2022 年毕业去向北京理工大学"),
  tianFang: official("北京大学 · 方维博士答辩", "https://idm.pku.edu.cn/info/1034/1907.htm", "博士论文、导师田永鸿、2024 年毕业去向海外博士后"),
  tianMa: official("北京大学 · 马力博士答辩", "https://idm.pku.edu.cn/info/1034/1641.htm", "博士论文与导师田永鸿"),
  tianYue: official("北京大学 · 岳洋硕士答辩", "https://idm.pku.edu.cn/info/1034/1715.htm", "硕士论文、导师田永鸿、2023 年毕业去向河北省选调生"),
  tianChenWei: official("北京大学 · 陈伟硕士答辩", "https://idm.pku.edu.cn/info/1034/1194.htm", "硕士论文、导师田永鸿、2015 年毕业去向出国留学"),
  tianChenZhengying: official("北京大学 · 陈峥莹硕士答辩", "https://idm.pku.edu.cn/info/1034/1187.htm", "硕士论文、导师田永鸿、2016 年毕业去向谷歌科技"),
  maLi: official("北京大学 · 黎吉国博士答辩", "https://idm.pku.edu.cn/info/1034/1516.htm", "博士论文、共同导师高文与马思伟、毕业去向复旦大学/莱陆科技"),
  maHan: official("北京大学 · 韩旭博士答辩", "https://idm.pku.edu.cn/info/1034/1935.htm", "博士论文、共同导师高文与马思伟、2024 年毕业去向博士后"),
  maLiu: official("北京大学 · 刘振华博士答辩", "https://idm.pku.edu.cn/info/1034/1540.htm", "博士论文、共同导师高文与马思伟、2022 年毕业去向华为"),
  maRen: official("北京大学 · 任荟文博士答辩", "https://idm.pku.edu.cn/info/1034/1899.htm", "博士论文、共同导师高文与马思伟、2024 年毕业去向书行科技"),
  maChang: official("北京大学 · 常建慧博士答辩", "https://idm.pku.edu.cn/info/1034/1902.htm", "博士论文、共同导师高文与马思伟、2024 年毕业去向电信云计算研究院"),
  maHuang: official("北京大学 · 黄志勐博士答辩", "https://idm.pku.edu.cn/info/1034/1948.htm", "博士论文、导师马思伟、2024 年毕业去向北京大学博雅博士后"),
  maYin: official("北京大学 · 尹茜博士答辩", "https://idm.pku.edu.cn/info/1034/2359.htm", "博士论文、导师马思伟、2025 年毕业去向小米生态链武汉"),
  han2026: official("哈尔滨工业大学听觉智能研究中心 · Interspeech 2026", "https://aic.hit.edu.cn/2026/0604/c16510a393527/page.htm", "李文慧、张珏和刘陈林的学生身份、导师组合与研究方向"),
  han2003: official("哈尔滨工业大学 · 2003 年优秀学位论文名单", "https://hitee.hit.edu.cn/2004/0215/c17100a309610/page.htm", "马永林的计算机应用技术硕士论文导师为韩纪庆"),
  wangProfile: official("西南财经大学 · 王东凯", "https://it.swufe.edu.cn/info/1120/17208.htm", "当前教授、博士生导师任职，研究方向、教育经历、招生与官方肖像"),
  xuanProfile: official("南京理工大学智能媒体分析研究所 · 轩诗宇", "https://imag-njust.net/author/%E8%BD%A9%E8%AF%97%E5%AE%87/", "当前副教授任职、研究方向与官方肖像"),
  zhuProfile: official("北京理工大学可视媒体计算实验室 · 朱林", "https://vmcl.bit.edu.cn/xztd/js/js_js/0efb9347875a4e408a4091fd9a0cbd96.htm", "当前助理教授、特别副研究员、硕士生导师任职与官方肖像"),
  kanProfile: official("中国科学院大学 · 阚美娜", "https://people.ucas.ac.cn/~kanmeina", "当前中科院计算所博导身份、计算机视觉与具身智能方向及官方肖像"),
  ictAdvisers: official("中科院计算所智能信息处理重点实验室 · 博士生导师", "https://iip.ict.ac.cn/yjspy/ds/bssds/", "阚美娜现任博士生导师与人脸识别研究组信息"),
  mouProfile: official("北京工业大学人工智能研究院 · 牟伦田", "https://biai.bjut.edu.cn/info/1065/1464.htm", "当前副教授、硕士生导师任职，博士导师陈熙霖/黄铁军及官方肖像"),
  linProfile: official("福建农林大学 · 林宇舜", "https://jtxy.fafu.edu.cn/1f/e3/c716a270307/page.htm", "当前副教授、硕士生导师任职，研究方向、博士教育与官方肖像"),
};

export const fiveScholarStudentSystemPeople2026: Person[] = [
  {
    id: "dongkai-wang-swufe", name: "王东凯", role: "教授 · 博士生导师", institution: "External", actualInstitution: "Southwestern University of Finance and Economics", region: "Mainland China",
    area: "Computer Vision · Multimodal Understanding · Embodied AI", tags: ["计算机视觉", "多模态理解", "具身智能", "张史梁学生"],
    summary: "西南财经大学计算机与人工智能学院教授、博士生导师；北京大学博士阶段由张史梁指导，现研究计算机视觉、多模态理解与具身智能。",
    stage: "emerging", category: "core", primary: true, introducedAt: checkedAt, lastVerifiedAt: checkedAt, x: 480, y: 1560,
    facts: [
      { label: "当前任职", value: "西南财经大学计算机与人工智能学院教授、博士生导师。", source: src.wangProfile },
      { label: "教育与学术训练", value: "2019–2024 年在北京大学攻读博士；答辩记录明确导师为张史梁。", source: src.zhangWang },
      { label: "研究主线", value: "计算机视觉、多模态感知与理解、具身智能。", source: src.wangProfile },
      { label: "为什么值得关注", value: "从张史梁的人体形态感知与视觉检索方向成长为独立 PI，并开始招收硕士、博士研究生。", source: src.wangProfile },
    ],
    sources: [src.wangProfile, src.zhangWang],
    portrait: { src: "portraits/five-scholar-students/dongkai-wang-swufe.jpg", alt: "王东凯肖像", source: src.wangProfile },
  },
  {
    id: "shiyu-xuan-njust", name: "轩诗宇", role: "副教授", institution: "External", actualInstitution: "Nanjing University of Science and Technology", region: "Mainland China",
    area: "Computer Vision · Multimodal Understanding · Open-world Perception", tags: ["计算机视觉", "多模态", "开放世界感知", "张史梁学生"],
    summary: "南京理工大学智能媒体分析研究所副教授；北京大学博士阶段由张史梁指导，研究开放场景视觉感知与多模态内容理解。",
    stage: "emerging", category: "core", primary: true, introducedAt: checkedAt, lastVerifiedAt: checkedAt, x: 620, y: 1560,
    facts: [
      { label: "当前任职", value: "南京理工大学计算机科学与工程学院副教授。", source: src.xuanProfile },
      { label: "教育与学术训练", value: "2024 年北京大学博士毕业；校方答辩记录明确导师为张史梁。", source: src.zhangXuan },
      { label: "研究主线", value: "开放场景视觉感知、多模态内容理解与大模型知识迁移。", source: src.xuanProfile },
      { label: "为什么值得关注", value: "是张史梁近年进入高校独立发展的青年学术分支之一。", source: src.xuanProfile },
    ],
    sources: [src.xuanProfile, src.zhangXuan],
    portrait: { src: "portraits/five-scholar-students/shiyu-xuan-njust.jpg", alt: "轩诗宇肖像", source: src.xuanProfile },
  },
  {
    id: "lin-zhu-bit", name: "朱林", role: "助理教授 · 特别副研究员 · 硕士生导师", institution: "BIT", region: "Mainland China",
    area: "Neuromorphic Vision · Event-based Vision · Computer Vision", tags: ["神经形态视觉", "事件相机", "计算机视觉", "田永鸿学生"],
    summary: "北京理工大学可视媒体计算实验室助理教授、特别副研究员；北京大学博士阶段由田永鸿指导，研究神经形态与事件视觉。",
    stage: "emerging", category: "core", primary: true, introducedAt: checkedAt, lastVerifiedAt: checkedAt, x: 1120, y: 900,
    facts: [
      { label: "当前任职", value: "北京理工大学计算机学院助理教授、特别副研究员、硕士生导师。", source: src.zhuProfile },
      { label: "教育与学术训练", value: "2022 年北京大学博士毕业；答辩记录明确导师为田永鸿。", source: src.tianZhu },
      { label: "研究主线", value: "神经形态视觉重建、事件视觉与连续视觉表征。", source: src.zhuProfile },
      { label: "为什么值得关注", value: "把田永鸿团队的类脑视觉方向延伸到北京理工大学独立培养体系。", source: src.zhuProfile },
    ],
    sources: [src.zhuProfile, src.tianZhu],
    portrait: { src: "portraits/five-scholar-students/lin-zhu-bit.jpg", alt: "朱林肖像", source: src.zhuProfile },
  },
  {
    id: "meina-kan-cas", name: "阚美娜", role: "研究员 · 博士生导师", institution: "CAS-ICT", region: "Mainland China",
    area: "Computer Vision · Face Recognition · Embodied Intelligence", tags: ["计算机视觉", "人脸识别", "具身智能", "陈熙霖学生"],
    summary: "中科院计算所研究员、博士生导师；陈熙霖培养的计算机视觉博士，现在人脸识别与具身智能方向独立招生。",
    stage: "senior", category: "core", primary: true, introducedAt: checkedAt, lastVerifiedAt: checkedAt, x: 1280, y: 1080,
    facts: [
      { label: "当前任职", value: "中国科学院计算技术研究所研究员、博士生导师。", source: src.kanProfile },
      { label: "教育与学术训练", value: "JDL 培养名录记录其 2013 年博士导师为陈熙霖。", source: src.jdl },
      { label: "研究主线", value: "计算机视觉、人脸识别与具身智能。", source: src.kanProfile },
      { label: "为什么值得关注", value: "已从陈熙霖视觉识别谱系成长为中科院计算所独立博士生导师。", source: src.ictAdvisers },
    ],
    sources: [src.kanProfile, src.ictAdvisers, src.jdl],
    portrait: { src: "portraits/five-scholar-students/meina-kan-cas.jpg", alt: "阚美娜肖像", source: src.kanProfile },
  },
  {
    id: "luntian-mou-bjut", name: "牟伦田", role: "副教授 · 硕士生导师", institution: "External", actualInstitution: "Beijing University of Technology", region: "Mainland China",
    area: "Computer Vision · Artificial Intelligence · Pattern Recognition", tags: ["计算机视觉", "人工智能", "模式识别", "陈熙霖学生"],
    summary: "北京工业大学人工智能研究院副教授、硕士生导师；博士阶段由陈熙霖与黄铁军共同指导，之后在高文指导下完成博士后训练。",
    stage: "senior", category: "core", primary: true, introducedAt: checkedAt, lastVerifiedAt: checkedAt, x: 760, y: 1560,
    facts: [
      { label: "当前任职", value: "北京工业大学人工智能研究院副教授、硕士生导师。", source: src.mouProfile },
      { label: "教育与学术训练", value: "官方履历明确博士导师为陈熙霖与黄铁军。", source: src.mouProfile },
      { label: "博士后训练", value: "官方履历明确博士后合作导师为高文。", source: src.mouProfile },
      { label: "研究主线", value: "计算机视觉、人工智能与模式识别。", source: src.mouProfile },
      { label: "为什么值得关注", value: "同时连接陈熙霖、黄铁军与高文三个视觉/媒体计算培养分支。", source: src.mouProfile },
    ],
    sources: [src.mouProfile, src.jdl],
    portrait: { src: "portraits/five-scholar-students/luntian-mou-bjut.jpg", alt: "牟伦田肖像", source: src.mouProfile },
  },
  {
    id: "yushun-lin-fafu", name: "林宇舜", role: "副教授 · 硕士生导师", institution: "External", actualInstitution: "Fujian Agriculture and Forestry University", region: "Mainland China",
    area: "Computer Vision · Intelligent Transportation · AI Applications", tags: ["计算机视觉", "智能交通", "AI 交叉应用", "陈熙霖学生"],
    summary: "福建农林大学副教授、硕士生导师；中科院计算所博士阶段由陈熙霖指导，现研究计算机视觉、智能交通与 AI 交叉应用。",
    stage: "senior", category: "core", primary: true, introducedAt: checkedAt, lastVerifiedAt: checkedAt, x: 900, y: 1560,
    facts: [
      { label: "当前任职", value: "福建农林大学交通工程系副教授、硕士生导师。", source: src.linProfile },
      { label: "教育与学术训练", value: "2018 年中科院计算所博士毕业；JDL 培养名录明确导师为陈熙霖。", source: src.jdl },
      { label: "研究主线", value: "计算机视觉、智能交通及人工智能交叉应用。", source: src.linProfile },
      { label: "为什么值得关注", value: "将陈熙霖的视觉与手势识别训练延伸到智能交通和地方高校研究生培养。", source: src.linProfile },
    ],
    sources: [src.linProfile, src.jdl],
    portrait: { src: "portraits/five-scholar-students/yushun-lin-fafu.jpg", alt: "林宇舜肖像", source: src.linProfile },
  },
];

const lineage = (id: string, from: string, to: string, label: string, evidence: string, source: Source, subtype: Relationship["subtype"] = "phd_adviser"): Relationship => ({
  id, from, to, type: "lineage", subtype, label, evidence, source, verified: true,
});

export const fiveScholarStudentSystemRelationships2026: Relationship[] = [
  lineage("zhang-shiliang-dongkai-wang-phd", "zhang-shiliang-pku", "dongkai-wang-swufe", "博士导师", "北京大学博士答辩记录明确王东凯的导师为张史梁。", src.zhangWang),
  lineage("zhang-shiliang-shiyu-xuan-phd", "zhang-shiliang-pku", "shiyu-xuan-njust", "博士导师", "北京大学博士答辩记录明确轩诗宇的导师为张史梁。", src.zhangXuan),
  lineage("tian-yonghong-lin-zhu-phd", "tian-yonghong-pku", "lin-zhu-bit", "博士导师", "北京大学博士答辩记录明确朱林的导师为田永鸿。", src.tianZhu),
  lineage("chen-xilin-meina-kan-phd", "chen-xilin-cas-ict", "meina-kan-cas", "博士导师", "JDL 培养名录明确阚美娜的博士导师为陈熙霖。", src.jdl),
  lineage("chen-xilin-luntian-mou-phd", "chen-xilin-cas-ict", "luntian-mou-bjut", "共同博士导师", "北京工业大学官方履历明确牟伦田博士阶段由陈熙霖与黄铁军共同指导。", src.mouProfile, "co_adviser"),
  lineage("chen-xilin-yushun-lin-phd", "chen-xilin-cas-ict", "yushun-lin-fafu", "博士导师", "JDL 培养名录明确林宇舜的博士导师为陈熙霖。", src.jdl),
];

const member = (id: string, teacherId: string, name: string, role: string, source: Source, focus?: string): GroupMember => ({ id, teacherId, name, role, focus, source });

export const fiveScholarStudentSystemGroupMembers2026: GroupMember[] = [
  member("zhang-shiliang-li-jianing", "zhang-shiliang-pku", "李佳宁", "博士校友 · 2022", src.zhangLi, "行人重识别"),
  member("zhang-shiliang-wang-dongkai", "zhang-shiliang-pku", "王东凯", "博士校友 · 2024 · 现任西南财经大学教授", src.zhangWang, "人体形态感知"),
  member("zhang-shiliang-mao-shunan", "zhang-shiliang-pku", "毛书南", "博士校友 · 2024", src.zhangMao, "精细化视觉检索"),
  member("zhang-shiliang-ye-jianming", "zhang-shiliang-pku", "叶剑鸣", "博士校友 · 2023", src.zhangYe, "神经网络自适应压缩"),
  member("zhang-shiliang-xuan-shiyu", "zhang-shiliang-pku", "轩诗宇", "博士校友 · 2024 · 现任南京理工大学副教授", src.zhangXuan, "视觉感知泛化"),
  member("zhang-shiliang-chen-zhen", "zhang-shiliang-pku", "陈震", "博士校友 · 2025", src.zhangChen, "视频分割"),
  member("zhang-shiliang-wang-dongkai-current-record", "zhang-shiliang-pku", "王东凯", "2019 级直博生（2022 年公开记录）", src.zhang2022),

  member("tian-yonghong-zhu-lin", "tian-yonghong-pku", "朱林", "博士校友 · 2022 · 现任北京理工大学助理教授", src.tianZhu, "神经形态视觉"),
  member("tian-yonghong-fang-wei", "tian-yonghong-pku", "方维", "博士校友 · 2024", src.tianFang, "深度脉冲神经网络"),
  member("tian-yonghong-ma-li", "tian-yonghong-pku", "马力", "博士校友 · 2022", src.tianMa, "压缩图像视频增强"),
  member("tian-yonghong-yue-yang", "tian-yonghong-pku", "岳洋", "硕士校友 · 2023", src.tianYue, "视觉鲁棒性"),
  member("tian-yonghong-chen-wei", "tian-yonghong-pku", "陈伟", "硕士校友 · 2015", src.tianChenWei, "监控视频高效编码"),
  member("tian-yonghong-chen-zhengying", "tian-yonghong-pku", "陈峥莹", "硕士校友 · 2016", src.tianChenZhengying, "异常行为检测"),
  member("tian-yonghong-zhai-yunpeng", "tian-yonghong-pku", "翟云鹏", "2020 级博士生（2022 年公开记录）", src.zhang2022),

  member("ma-siwei-li-jiguo", "ma-siwei-pku", "黎吉国", "共同指导博士校友 · 2022", src.maLi, "跨模态图像生成 · 与高文共同指导"),
  member("ma-siwei-han-xu", "ma-siwei-pku", "韩旭", "共同指导博士校友 · 2024", src.maHan, "超高清视频编码 · 与高文共同指导"),
  member("ma-siwei-liu-zhenhua", "ma-siwei-pku", "刘振华", "共同指导博士校友 · 2022", src.maLiu, "神经网络压缩 · 与高文共同指导"),
  member("ma-siwei-ren-huiwen", "ma-siwei-pku", "任荟文", "共同指导博士校友 · 2024", src.maRen, "高效视频编码 · 与高文共同指导"),
  member("ma-siwei-chang-jianhui", "ma-siwei-pku", "常建慧", "共同指导博士校友 · 2024", src.maChang, "生成式图像编码 · 与高文共同指导"),
  member("ma-siwei-huang-zhimeng", "ma-siwei-pku", "黄志勐", "博士校友 · 2024", src.maHuang, "机器视觉图像视频编码"),
  member("ma-siwei-yin-qian", "ma-siwei-pku", "尹茜", "博士校友 · 2025", src.maYin, "点云编解码"),
  member("ma-siwei-zhang-jiaqi", "ma-siwei-pku", "张嘉琪", "共同指导博士生（2021 年公开记录）", src.zhang2021, "与高文共同指导"),
  member("ma-siwei-lu-haopeng", "ma-siwei-pku", "鲁昊鹏", "共同指导博士生（2021 年公开记录）", src.zhang2021, "与高文共同指导"),

  member("chen-xilin-lin-yushun", "chen-xilin-cas-ict", "林宇舜", "博士校友 · 2018 · 现任福建农林大学副教授", src.jdl, "计算机视觉"),
  member("chen-xilin-liang-kongming", "chen-xilin-cas-ict", "梁孔明", "博士校友 · 2018 · 现任北京邮电大学副教授", src.jdl, "计算机视觉"),
  member("chen-xilin-wang-hanjie", "chen-xilin-cas-ict", "王汉杰", "博士校友 · 2016", src.jdl, "计算机视觉"),
  member("chen-xilin-cui-zhen", "chen-xilin-cas-ict", "崔振", "博士校友 · 2014", src.jdl, "计算机视觉"),
  member("chen-xilin-ji-naye", "chen-xilin-cas-ict", "吉娜烨", "博士校友 · 2014", src.jdl, "计算机视觉"),
  member("chen-xilin-kan-meina", "chen-xilin-cas-ict", "阚美娜", "博士校友 · 2013 · 现任中科院计算所研究员", src.jdl, "计算机视觉"),
  member("chen-xilin-zhao-xiaowei", "chen-xilin-cas-ict", "赵小伟", "博士校友 · 2013", src.jdl, "计算机视觉"),
  member("chen-xilin-zheng-wei", "chen-xilin-cas-ict", "郑伟", "博士校友 · 2013", src.jdl, "计算机视觉"),
  member("chen-xilin-mou-luntian", "chen-xilin-cas-ict", "牟伦田", "共同指导博士校友 · 2012 · 现任北京工业大学副教授", src.jdl, "计算机视觉"),
  member("chen-xilin-xie-shufu", "chen-xilin-cas-ict", "谢术富", "博士校友 · 2011", src.jdl, "计算机视觉"),
  member("chen-xilin-wang-qi", "chen-xilin-cas-ict", "王骐", "博士校友 · 2008", src.jdl, "计算机视觉"),

  member("han-jiqing-li-wenhui", "han-jiqing-hit", "李文慧", "硕士研究生 · 2026 公开记录", src.han2026, "生成式歌声与音乐 · 与何勇军共同指导"),
  member("han-jiqing-zhang-jue", "han-jiqing-hit", "张珏", "硕士研究生 · 2026 公开记录", src.han2026, "流式关键词检测与语音识别 · 与郑贵滨共同指导"),
  member("han-jiqing-liu-chenlin", "han-jiqing-hit", "刘陈林", "博士研究生 · 2026 公开记录", src.han2026, "文本转语音与语言模型解码"),
  member("han-jiqing-ma-yonglin", "han-jiqing-hit", "马永林", "硕士校友 · 2003 优秀学位论文记录", src.han2003, "计算机应用技术"),
];

const placement = (id: string, student: string, teacherId: string, company: string, role: string, sector: StudentPlacement["sector"], source: Source, graduationYear?: number): StudentPlacement => ({
  id, student, teacherId, company, role, sector, graduationYear, degree: role.includes("博士") ? "PhD" : undefined,
  kind: "first_job", note: "来源记录的是毕业当年去向，不表示当前任职。", source, verifiedAt: checkedAt,
});

export const fiveScholarStudentSystemPlacements2026: StudentPlacement[] = [
  placement("zhang-li-jianing-sony", "李佳宁", "zhang-shiliang-pku", "Sony Semiconductor Solutions", "博士毕业去向", "industry", src.zhangLi, 2022),
  placement("zhang-wang-dongkai-swufe", "王东凯", "zhang-shiliang-pku", "Southwestern University of Finance and Economics", "博士毕业去向 · 教授", "academia", src.zhangWang, 2024),
  placement("zhang-mao-shunan-zjmath", "毛书南", "zhang-shiliang-pku", "Shanghai Zhangjiang Institute of Mathematics", "博士毕业去向", "academia", src.zhangMao, 2024),
  placement("zhang-ye-jianming-oppo", "叶剑鸣", "zhang-shiliang-pku", "OPPO", "博士毕业去向", "industry", src.zhangYe, 2023),
  placement("zhang-xuan-shiyu-njust", "轩诗宇", "zhang-shiliang-pku", "Nanjing University of Science and Technology", "博士毕业去向 · 副教授", "academia", src.zhangXuan, 2024),
  placement("zhang-chen-zhen-telecom", "陈震", "zhang-shiliang-pku", "China Telecom", "博士毕业去向", "industry", src.zhangChen, 2025),

  placement("tian-zhu-lin-bit", "朱林", "tian-yonghong-pku", "Beijing Institute of Technology", "博士毕业去向 · 助理教授/特别副研究员", "academia", src.tianZhu, 2022),
  placement("tian-fang-wei-postdoc", "方维", "tian-yonghong-pku", "Overseas postdoctoral position", "博士毕业去向 · 博士后", "postdoc", src.tianFang, 2024),
  placement("tian-yue-yang-hebei", "岳洋", "tian-yonghong-pku", "Hebei selected graduate programme", "硕士毕业去向", "other", src.tianYue, 2023),
  placement("tian-chen-wei-overseas", "陈伟", "tian-yonghong-pku", "Overseas study", "硕士毕业去向", "academia", src.tianChenWei, 2015),
  placement("tian-chen-zhengying-google", "陈峥莹", "tian-yonghong-pku", "Google", "硕士毕业去向", "industry", src.tianChenZhengying, 2016),

  placement("ma-li-jiguo-fudan", "黎吉国", "ma-siwei-pku", "Fudan University / Lailu Technology", "博士毕业去向", "academia", src.maLi, 2022),
  placement("ma-han-xu-postdoc", "韩旭", "ma-siwei-pku", "Postdoctoral position", "博士毕业去向 · 博士后", "postdoc", src.maHan, 2024),
  placement("ma-liu-zhenhua-huawei", "刘振华", "ma-siwei-pku", "Huawei", "博士毕业去向", "industry", src.maLiu, 2022),
  placement("ma-ren-huiwen-shuxing", "任荟文", "ma-siwei-pku", "Shuxing Technology", "博士毕业去向", "startup", src.maRen, 2024),
  placement("ma-chang-jianhui-ctcloud", "常建慧", "ma-siwei-pku", "China Telecom Cloud Computing Research Institute", "博士毕业去向", "industry", src.maChang, 2024),
  placement("ma-huang-zhimeng-pku-postdoc", "黄志勐", "ma-siwei-pku", "Peking University", "博士毕业去向 · 博雅博士后", "postdoc", src.maHuang, 2024),
  placement("ma-yin-qian-xiaomi", "尹茜", "ma-siwei-pku", "Xiaomi Ecosystem · Wuhan", "博士毕业去向", "industry", src.maYin, 2025),

  placement("chen-lin-yushun-fafu", "林宇舜", "chen-xilin-cas-ict", "Fujian Agriculture and Forestry University", "博士毕业去向", "academia", src.jdl, 2018),
  placement("chen-liang-kongming-pku-postdoc", "梁孔明", "chen-xilin-cas-ict", "Peking University", "博士毕业去向 · 博士后", "postdoc", src.jdl, 2018),
  placement("chen-wang-hanjie-tencent", "王汉杰", "chen-xilin-cas-ict", "Tencent", "博士毕业去向", "industry", src.jdl, 2016),
  placement("chen-kan-meina-ict-postdoc", "阚美娜", "chen-xilin-cas-ict", "CAS Institute of Computing Technology", "博士毕业去向 · 博士后", "postdoc", src.jdl, 2013),
  placement("chen-zhao-xiaowei-imperial", "赵小伟", "chen-xilin-cas-ict", "Imperial College London", "博士毕业去向 · 博士后", "postdoc", src.jdl, 2013),
  placement("chen-zheng-wei-samsung", "郑伟", "chen-xilin-cas-ict", "Samsung Beijing", "博士毕业去向", "industry", src.jdl, 2013),
  placement("chen-mou-luntian-pku-postdoc", "牟伦田", "chen-xilin-cas-ict", "Peking University", "博士毕业去向 · 博士后", "postdoc", src.jdl, 2012),
  placement("chen-xie-shufu-fujitsu", "谢术富", "chen-xilin-cas-ict", "Fujitsu", "博士毕业去向", "industry", src.jdl, 2011),
  placement("chen-wang-qi-ict-postdoc", "王骐", "chen-xilin-cas-ict", "CAS Institute of Computing Technology", "博士毕业去向 · 博士后", "postdoc", src.jdl, 2008),
];

export const fiveScholarStudentSystemEnhancements2026: Record<string, Partial<Person>> = {
  "zhang-shiliang-pku": {
    facts: [{ label: "培养体系", value: "已逐项核验 6 名博士校友：李佳宁、王东凯、毛书南、叶剑鸣、轩诗宇、陈震；其中王东凯与轩诗宇已进入高校独立发展。", source: src.zhangWang }],
    sources: [src.zhangLi, src.zhangWang, src.zhangMao, src.zhangYe, src.zhangXuan, src.zhangChen], lastVerifiedAt: checkedAt,
  },
  "tian-yonghong-pku": {
    facts: [{ label: "培养体系", value: "已核验朱林、方维、马力等博士及岳洋、陈伟、陈峥莹等硕士记录；朱林已成为北京理工大学独立 PI。", source: src.tianGroup }],
    sources: [src.tianGroup, src.tianZhu, src.tianFang, src.tianMa, src.tianYue, src.tianChenWei, src.tianChenZhengying], lastVerifiedAt: checkedAt,
  },
  "ma-siwei-pku": {
    facts: [{ label: "培养体系", value: "已核验黎吉国、韩旭、刘振华、任荟文、常建慧等与高文共同指导的博士，以及黄志勐、尹茜等直接指导博士；去向覆盖高校博士后、华为、电信云、小米和创业公司。", source: src.maHuang }],
    sources: [src.maLi, src.maHan, src.maLiu, src.maRen, src.maChang, src.maHuang, src.maYin, src.zhang2021], lastVerifiedAt: checkedAt,
  },
  "chen-xilin-cas-ict": {
    facts: [{ label: "培养体系", value: "JDL 博士名录已核验 11 名博士校友；其中阚美娜、牟伦田、林宇舜已作为独立 PI 接入图谱，梁孔明保留为已核验高校导师校友。", source: src.jdl }],
    sources: [src.jdl, src.kanProfile, src.mouProfile, src.linProfile], lastVerifiedAt: checkedAt,
  },
  "han-jiqing-hit": {
    facts: [{ label: "培养体系", value: "已从哈工大一手页面核验李文慧、张珏、刘陈林 3 名当前研究生，以及 2003 年优秀硕士论文作者马永林；共同指导信息按校方原文保留。", source: src.han2026 }],
    sources: [src.han2026, src.han2003], lastVerifiedAt: checkedAt,
  },
};

export const fiveScholarStudentSystemAudit2026 = {
  checkedAt,
  targetIds: ["zhang-shiliang-pku", "tian-yonghong-pku", "chen-xilin-cas-ict", "han-jiqing-hit", "ma-siwei-pku"],
  promotedCurrentPIs: fiveScholarStudentSystemPeople2026.map((person) => person.id),
  directLineageEdges: fiveScholarStudentSystemRelationships2026.length,
  studentRecords: fiveScholarStudentSystemGroupMembers2026.length,
  placementRecords: fiveScholarStudentSystemPlacements2026.length,
  safeguard: "只有论文答辩、导师主页、校方名录或本人官方履历明确写出指导关系时才建立师承边；实验室总名录不自动等同于个人导师。",
};
