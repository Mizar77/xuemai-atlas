import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  ustcProfile: source(
    "中国科学技术大学 · 吴枫",
    "https://faculty.ustc.edu.cn/wufeng1/zh_CN/index.htm",
    "official",
    "中国科大教授、博士生导师、科技成果转化院院长（兼任），以及教育、微软亚洲研究院经历和研究方向",
  ),
  caeProfile: source(
    "中国工程院 · 吴枫院士",
    "https://www.cae.cn/cae/html/main/colys/95871425.html",
    "official",
    "多媒体压缩与网络传输专家身份，以及 2025 年当选中国工程院院士",
  ),
  ustcAward: source(
    "中国科大报 · 吴枫获 IEEE CAS Mac Van Valkenburg 奖",
    "https://zgkdb.ustc.edu.cn/ndetail/6874",
    "official",
    "网络流媒体、国际视频编码标准、IEEE 数据压缩标准及产业转化贡献",
  ),
  ustcLab: source(
    "中国科学技术大学 · 类脑智能技术及应用国家工程实验室",
    "https://leinao.ustc.edu.cn/2021/0430/c25923a483642/page.htm",
    "official",
    "稳定的教育与职业经历、实验室建设和研究方向",
  ),
  wuFirstPerson: source(
    "吴枫自述 · 我乐意给学生打工（微软亚洲研究院员工故事存档）",
    "https://blog.sina.com.cn/s/blog_4caedc7a01000awz.html",
    "profile",
    "吴枫第一人称称高文为导师，并写明 1999 年跟随高文完成博士阶段学习",
  ),
  haichuanThesis: source(
    "中国科学技术大学 · 2023 年中国科学院优秀博士学位论文材料（马海川）",
    "https://gradschool.ustc.edu.cn/static/upload/article/file/1695020709977/2ea167888edc4588a83b78a254a38407.pdf",
    "official",
    "马海川 2022 年博士毕业、博士导师吴枫、论文主题与代表性成果",
  ),
  haichuanHuawei: source(
    "华为云媒体创新 Lab · 马海川",
    "https://www.huaweicloud.com/lab/multimedia/about.html",
    "company",
    "马海川在华为云媒体创新 Lab 的公开成员记录、研究背景及 iWave / AVS3 经历",
  ),
  yindaHome: source(
    "Yinda Chen（陈胤达）· Academic Homepage",
    "https://ydchen0806.github.io/",
    "profile",
    "中国科大—上海人工智能实验室联合培养博士生身份、吴枫与熊志伟指导关系及研究方向",
  ),
};

export const wuFengNetworkPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "feng-wu-ustc": {
    src: "portraits/wu-feng-network/feng-wu-ustc.jpg",
    alt: "吴枫中国科学技术大学官方头像",
    source: sources.ustcProfile,
  },
  "haichuan-ma-huawei": {
    src: "portraits/wu-feng-network/haichuan-ma-huawei.jpg",
    alt: "马海川华为云媒体创新 Lab 官方头像",
    source: sources.haichuanHuawei,
  },
};

export const wuFengNetworkPeople: Person[] = [
  {
    id: "feng-wu-ustc",
    name: "吴枫",
    role: "中国工程院院士 · 教授 · 博士生导师 · 科技成果转化院院长（兼任）",
    institution: "USTC",
    region: "Mainland China",
    area: "多媒体压缩 · 视频编码与通信 · 计算机视觉 · 智能媒体",
    tags: ["中国工程院院士", "视频编码", "多媒体通信", "计算机视觉", "智能媒体", "IEEE Fellow", "微软亚洲研究院", "高文博士谱系", "人才培养"],
    summary: "中国多媒体压缩与网络传输领域的代表性学者，长期贯通基础理论、国际标准和大规模产业应用；博士阶段由高文指导，后在微软亚洲研究院和中国科大持续建设视频编码、智能媒体与人才培养体系。",
    facts: [
      { label: "当前任职", value: "中国科学技术大学教授、博士生导师，兼任科技成果转化院院长；2025 年当选中国工程院院士。", source: sources.ustcProfile },
      { label: "研究主线", value: "视频编码与通信、多媒体内容分析、计算机视觉，以及面向智能媒体的图像和视频高效表示。", source: sources.ustcProfile },
      { label: "教育与学术训练", value: "1996 年、1999 年分别获哈尔滨工业大学计算机科学与技术硕士、博士学位；其第一人称经历明确称高文为导师。", source: sources.wuFirstPerson },
      { label: "院士与学术荣誉", value: "2025 年当选中国工程院院士；2013 年当选 IEEE Fellow；2021 年获 IEEE CAS Mac Van Valkenburg Award。", source: sources.caeProfile },
      { label: "产业研究经历", value: "1999–2014 年在微软亚洲研究院历任研究员、主任研究员和首席研究员，此后全职任教中国科大。", source: sources.ustcProfile },
      { label: "标准与产业影响", value: "多项技术被 MPEG-4、H.264、H.265 等国际标准采纳，并牵头 IEEE 数据压缩系列标准；相关编解码技术进入 Windows、华为麒麟芯片和腾讯会议等产业系统。", source: sources.ustcAward },
      { label: "已核验学生", value: "马海川的中科大优秀博士材料明确写明指导老师为吴枫；陈胤达的公开履历写明博士阶段由吴枫、熊志伟等共同指导。", source: sources.haichuanThesis },
      { label: "为什么值得关注", value: "他连接了高文的多媒体学术谱系、微软亚洲研究院的工业研究体系、中国科大的智能媒体研究，以及从博士培养到华为技术团队的人才流动。", source: sources.ustcAward },
    ],
    stage: "senior",
    category: "core",
    status: "current PI",
    primary: true,
    x: 785,
    y: 935,
    sources: [sources.ustcProfile, sources.caeProfile, sources.ustcAward, sources.ustcLab, sources.wuFirstPerson, sources.haichuanThesis, sources.yindaHome],
    portrait: wuFengNetworkPortraits["feng-wu-ustc"],
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
  },
  {
    id: "haichuan-ma-huawei",
    name: "马海川",
    role: "华为云媒体创新 Lab 研究成员（“天才少年”）",
    institution: "External",
    actualInstitution: "Huawei Cloud Media Innovation Lab",
    region: "Mainland China",
    area: "学习式图像压缩 · 视频编码 · 深度学习",
    tags: ["图像压缩", "视频编码", "深度学习", "iWave", "AVS3", "华为", "吴枫博士谱系"],
    summary: "吴枫培养的图像编码方向博士，提出学习式类小波图像压缩方法 iWave；博士毕业后进入华为云媒体创新 Lab，将学术成果延伸到标准软件与产业研发。",
    facts: [
      { label: "当前任职", value: "华为云媒体创新 Lab 公开成员，官方页面列入“天才少年”板块。", source: sources.haichuanHuawei },
      { label: "研究主线", value: "基于深度学习的图像／视频编码与处理，重点包括可学习类小波变换与端到端压缩。", source: sources.haichuanThesis },
      { label: "教育与学术训练", value: "2017 年获西安电子科技大学学士；2022 年获中国科学技术大学信息与通信工程博士，指导老师为吴枫。", source: sources.haichuanThesis },
      { label: "代表性成果", value: "iWave 被确定为 IEEE 1857.11 标准制定参考软件，并参与 AVS3 参考软件开发。", source: sources.haichuanHuawei },
      { label: "为什么值得关注", value: "他是“高文—吴枫”视频编码谱系向华为智能媒体研发流动的可核验案例。", source: sources.haichuanHuawei },
    ],
    stage: "adjacent",
    category: "adjacent",
    status: "industry researcher",
    primary: false,
    x: 865,
    y: 1000,
    sources: [sources.haichuanThesis, sources.haichuanHuawei],
    portrait: wuFengNetworkPortraits["haichuan-ma-huawei"],
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
  },
];

export const wuFengNetworkRelationships: Relationship[] = [
  {
    id: "gao-wen-feng-wu-phd",
    from: "gao-wen-pku",
    to: "feng-wu-ustc",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "吴枫在第一人称经历中称高文为导师，并写明 1999 年跟随高文完成博士阶段学习。",
    evidenceObject: "吴枫第一人称学术经历",
    source: sources.wuFirstPerson,
    verified: true,
    endYear: 1999,
  },
  {
    id: "feng-wu-haichuan-ma-phd",
    from: "feng-wu-ustc",
    to: "haichuan-ma-huawei",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "中国科大 2023 年中国科学院优秀博士学位论文材料明确写明马海川在中国科大攻读博士、指导老师为吴枫教授。",
    evidenceObject: "中国科学院优秀博士学位论文材料",
    source: sources.haichuanThesis,
    verified: true,
    endYear: 2022,
  },
];

export const wuFengNetworkGroupMembers: GroupMember[] = [
  {
    id: "wu-feng-yinda-chen-current-phd",
    teacherId: "feng-wu-ustc",
    name: "陈胤达（Yinda Chen）",
    role: "联合培养博士生 · 预计 2027",
    focus: "自监督预训练 · 多模态大模型 · 世界模型 · 图像编码；与上海人工智能实验室联合培养，吴枫、熊志伟等指导",
    source: sources.yindaHome,
  },
  {
    id: "wu-feng-haichuan-ma-alumnus",
    teacherId: "feng-wu-ustc",
    name: "马海川",
    role: "博士校友 · 2022",
    focus: "学习式图像压缩 · iWave；现进入华为云媒体创新 Lab",
    source: sources.haichuanThesis,
  },
];

export const wuFengNetworkPlacements: StudentPlacement[] = [
  {
    id: "wu-feng-haichuan-ma-huawei",
    student: "马海川",
    teacherId: "feng-wu-ustc",
    company: "Huawei",
    department: "华为云媒体创新 Lab",
    role: "研究成员（官方页面列入“天才少年”板块）",
    kind: "current",
    sector: "industry",
    degree: "PhD",
    graduationYear: 2022,
    currentRole: "华为云媒体创新 Lab 研究成员",
    note: "中科大优秀博士材料留有 @huawei.com 邮箱；华为云官方成员页记录其博士背景与 iWave / AVS3 工作。",
    source: sources.haichuanHuawei,
    verifiedAt: checkedAt,
  },
];
