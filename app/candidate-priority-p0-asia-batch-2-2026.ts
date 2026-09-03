import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  qingyaoOfficial: source(
    "清华大学计算机系 · Qingyao Ai",
    "https://www.cs.tsinghua.edu.cn/csen/info/1313/4587.htm",
    "official",
    "现任副教授、入职时间、教育背景、研究方向、奖项、论文和官方头像",
  ),
  qingyaoHome: source(
    "Qingyao Ai · personal homepage",
    "https://qingyaoai.github.io/",
    "profile",
    "现任职级、W. Bruce Croft 博士指导关系、产业研究实习、本科论文指导、招生状态和研究主线",
  ),
  pengOfficial: source(
    "清华大学计算机系 · 崔鹏",
    "https://www.cs.tsinghua.edu.cn/info/1117/3545.htm",
    "official",
    "现任职级、教育经历、研究方向、代表性荣誉和官方头像",
  ),
  pengCollaboration: source(
    "清华大学计算机系 · Wenwu Zhu",
    "https://www.cs.tsinghua.edu.cn/csen/info/1306/4336.htm",
    "official",
    "朱文武与崔鹏在图表示学习、网络嵌入和多媒体计算方向持续共同署名的论文记录",
  ),
  qiOfficial: source(
    "CUHK CSE · Qi Dou",
    "https://www.cse.cuhk.edu.hk/people/faculty/qi-dou/",
    "official",
    "现任副教授、研究机构任职、教育和博士后经历、研究领域、荣誉与官方头像",
  ),
  qiHome: source(
    "Qi Dou · CUHK personal homepage",
    "https://www.cse.cuhk.edu.hk/~qdou/",
    "profile",
    "北航本科、CUHK 博士和 Imperial College London 博士后经历",
  ),
  qiThesisAward: source(
    "CUHK Faculty of Engineering · Outstanding Thesis Award 2018",
    "https://www.erg.cuhk.edu.hk/erg/sites/default/files/Booklet-upload.pdf",
    "official",
    "Qi Dou 博士论文题目及 Pheng Ann Heng 博士导师关系",
  ),
  qiTeam: source(
    "Qi Dou Lab · Team",
    "https://www.cse.cuhk.edu.hk/~qdou/homepage/team/",
    "profile",
    "当前博士生、共同指导关系、毕业博士及其学术和工业去向",
  ),
  beiOfficial: source(
    "CUHK CSE · Bei Yu",
    "https://www.cse.cuhk.edu.hk/people/faculty/bei-yu/",
    "official",
    "CUHK 教授席位、机器学习与 EDA/CV 研究方向和官方头像",
  ),
  beiCv: source(
    "Bei Yu · CUHK-hosted CV",
    "https://www.cse.cuhk.edu.hk/~byu/doc/cv-byu.pdf",
    "cv",
    "2025 年晋升正教授、教育经历、学术服务、完整指导名单和校友去向",
  ),
  beiStudents: source(
    "Bei Yu · Students",
    "https://www.cse.cuhk.edu.hk/~byu/students.html",
    "profile",
    "当前研究成员、已毕业博士及后续学术和工业去向",
  ),
  weiLiNus: source(
    "NUS Computing · Wei Li",
    "https://www.comp.nus.edu.sg/cs/people/weili/",
    "official",
    "Wei Li 的 CUHK MPhil 由 Bei Yu 与 Michael R. Lyu 共同指导",
  ),
  qianruOfficial: source(
    "SMU Faculty Directory · SUN Qianru",
    "https://faculty.smu.edu.sg/profile/sun-qianru-551",
    "official",
    "现任副教授与 Lee Kong Chian Fellow、研究领域、博士学位、在读指导学生和官方头像",
  ),
  qianruCv: source(
    "SUN Qianru · SMU-hosted CV",
    "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2026-03/qianrusun-CV.pdf",
    "cv",
    "教育经历、2019 至今 SMU 任职轨迹和完整发表记录",
  ),
  qianruSeminar: source(
    "SMU research seminar · Qianru Sun",
    "https://computing.smu.edu.sg/newsletter/sis-research-seminar-qianru-sun-learning-learn-small-data-era-big-data",
    "official",
    "博士导师 Hong Liu、MPII 博士后经历，以及在 NUS NExT++ Lab 与 Tat-Seng Chua 的研究合作",
  ),
  qianruStudents: source(
    "SMU research seminar · Ying Jiahao and Tian Zichen",
    "https://computing.smu.edu.sg/newsletter/research-seminar-ying-jiahao-and-tian-zichen",
    "official",
    "Jiahao Ying 与 Zichen Tian 的在读博士身份和 SUN Qianru 指导关系",
  ),
  chuanxiaOfficial: source(
    "NTU CCDS · New Faculty 2025 · Zheng Chuanxia",
    "https://www.ntu.edu.sg/computing/our-faculty/new-faculty-at-ccds-(2025)",
    "official",
    "现任 Nanyang Assistant Professor、NRF Fellow、教育经历、研究主线、博士后经历和官方头像",
  ),
  chuanxiaHome: source(
    "Physical Vision Group · Chuanxia Zheng",
    "https://physicalvision.github.io/people/~chuanxia",
    "profile",
    "Physical Vision Group 负责人、Tat-Jen Cham 与 Jianfei Cai 博士指导关系、Oxford VGG 经历和研究项目",
  ),
  tatJenBio: source(
    "Tat-Jen Cham · NTU biography",
    "https://www3.ntu.edu.sg/home/astjcham/bio.html",
    "profile",
    "Chuanxia Zheng 为 2021 年 NTU 博士毕业生并获学院优秀博士论文奖",
  ),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, sourceValue: Source) => ({
  label,
  value,
  source: sourceValue,
});

type PersonSeed = Omit<
  Person,
  "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"
> & {
  portraitFile: string;
  portraitSource: Source;
};

const person = (seed: PersonSeed): Person => ({
  ...seed,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-asia-batch-2-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0AsiaBatch2People2026: Person[] = [
  person({
    id: "qingyao-ai-thu-p0-2026", name: "艾清遥", role: "副教授", institution: "THU", region: "Mainland China",
    area: "Information Retrieval · Retrieval-Augmented Generation · AI Agents", tags: ["信息检索", "RAG", "智能体", "生成式 AI"],
    stage: "emerging", x: 120, y: 120, portraitFile: "qingyao-ai.jpg", portraitSource: sources.qingyaoOfficial,
    summary: "清华信息检索青年 PI，把检索、生成式 AI 与智能体连接起来；训练轨迹进入 UMass CIIR 的 W. Bruce Croft 学术体系，并有 Google、Microsoft Research 与 Amazon Search 研究经历。",
    facts: [
      fact("当前任职", "2024 年 12 月起任清华大学计算机系副教授，2022 年加入 THUIR。", sources.qingyaoHome),
      fact("教育与学术训练", "清华大学计算机学士；UMass Amherst 计算机硕士、博士，导师 W. Bruce Croft。", sources.qingyaoHome),
      fact("研究主线", "信息检索、检索增强生成、排序优化、提示自动优化与持续学习智能体。", sources.qingyaoOfficial),
      fact("产业连接", "博士阶段先后在 Microsoft Research、Google Research 与 Amazon Search 从事研究实习。", sources.qingyaoHome),
      fact("招生信息", "个人主页明确公开招收博士后与博士生。", sources.qingyaoHome),
    ],
    sources: [sources.qingyaoOfficial, sources.qingyaoHome],
  }),
  person({
    id: "peng-cui-thu-p0-2026", name: "崔鹏", role: "长聘副教授", institution: "THU", region: "Mainland China",
    area: "Causal Machine Learning · Out-of-Distribution Generalization · Network Representation", tags: ["因果机器学习", "稳健学习", "OOD", "网络表示"],
    stage: "senior", x: 280, y: 120, portraitFile: "peng-cui.jpg", portraitSource: sources.pengOfficial,
    summary: "清华因果稳健学习与网络表示资深 PI，把分布偏移、因果推断和社会网络建模连成一条方法线，并与朱文武长期共同推进网络表示和多媒体计算。",
    facts: [
      fact("当前任职", "清华大学计算机系长聘副教授，隶属媒体与网络实验室。", sources.pengOfficial),
      fact("教育与学术训练", "2005 年获北京科技大学计算机学士，2010 年获清华大学计算机博士。", sources.pengOfficial),
      fact("研究主线", "因果正则机器学习、分布外泛化、网络表示学习与社会动力学建模。", sources.pengOfficial),
      fact("学术影响", "官方履历列其为国家杰青、ACM Distinguished Scientist，并记录多项 KDD、ICDM、ICME 与 ACM MM 奖项。", sources.pengOfficial),
      fact("合作网络", "清华官方主页持续记录其与朱文武在图表示、网络嵌入和多媒体计算方向的共同工作。", sources.pengCollaboration),
    ],
    sources: [sources.pengOfficial, sources.pengCollaboration],
  }),
  person({
    id: "qi-dou-cuhk-p0-2026", name: "Qi Dou", role: "Associate Professor", institution: "CUHK", region: "Hong Kong",
    area: "Medical Image Analysis · Surgical Robotics · Safe Embodied AI", tags: ["医学影像", "手术机器人", "具身 AI", "医疗 AI"],
    stage: "emerging", x: 440, y: 120, portraitFile: "qi-dou.jpg", portraitSource: sources.qiOfficial,
    knownAlumniCount: 13,
    summary: "CUHK 医学影像、手术机器人与安全具身 AI 带头人；博士师承 Pheng Ann Heng，公开组员页把学生流向 Huawei、Tencent、Ant Group 与 HKU 等机构逐人列出。",
    facts: [
      fact("当前任职", "CUHK CSE Associate Professor，并参与 T-Stone Robotics Institute、Institute of Medical Intelligence and XR 等研究机构。", sources.qiOfficial),
      fact("教育与学术训练", "2014 年获北航生物医学工程学士，2018 年获 CUHK 计算机博士；后在 Imperial College London 从事博士后研究。", sources.qiHome),
      fact("博士师承", "CUHK 工程学院 2018 年优秀博士论文奖册明确列 Pheng Ann Heng 为其博士导师。", sources.qiThesisAward),
      fact("研究主线", "医学影像分析、自主手术机器人、安全具身 AI 与医疗场景机器学习。", sources.qiOfficial),
      fact("人才培养", "组员页记录 13 名已毕业博士，并逐人给出 Tencent、Huawei、Ant Group、HKU 等现职。", sources.qiTeam),
    ],
    sources: [sources.qiOfficial, sources.qiHome, sources.qiThesisAward, sources.qiTeam],
  }),
  person({
    id: "bei-yu-cuhk-p0-2026", name: "Bei Yu", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Machine Learning for EDA · Combinatorial Optimization · Computer Vision", tags: ["ML for EDA", "组合优化", "芯片设计", "计算机视觉"],
    stage: "senior", x: 600, y: 120, portraitFile: "bei-yu.jpg", portraitSource: sources.beiOfficial,
    summary: "CUHK 机器学习驱动 EDA 与组合优化教授，培养网络已延伸至清华、复旦、上科大、港科广和 Huawei Noah；亦与 Michael R. Lyu 共同指导芯片 AI 青年 PI Wei Li。",
    facts: [
      fact("当前任职", "2025 年 8 月起任 CUHK CSE Full Professor，并任工程学院 Assistant Dean (Mainland Affairs)。", sources.beiCv),
      fact("教育与学术训练", "电子科技大学学士、清华大学计算机硕士、University of Texas at Austin ECE 博士。", sources.beiCv),
      fact("研究主线", "机器学习与组合算法及其在电子设计自动化和计算机视觉中的应用。", sources.beiOfficial),
      fact("人才培养", "CV 逐人列出已毕业博士进入 ShanghaiTech、Fudan、CUHK-Shenzhen、Huawei Noah、Adobe 等机构。", sources.beiCv),
      fact("学术与产业接口", "2023 年起担任系内 internship and industry liaison chair。", sources.beiCv),
    ],
    sources: [sources.beiOfficial, sources.beiCv, sources.beiStudents, sources.weiLiNus],
  }),
  person({
    id: "qianru-sun-smu-p0-2026", name: "Qianru Sun", role: "Associate Professor · Lee Kong Chian Fellow", institution: "SMU", region: "Singapore",
    area: "Computer Vision · Causal Representation · Few-Shot Learning", tags: ["计算机视觉", "因果表示", "小样本学习", "持续学习"],
    stage: "emerging", x: 760, y: 120, portraitFile: "qianru-sun.jpg", portraitSource: sources.qianruOfficial,
    summary: "SMU 视觉与小样本学习 PI，研究因果表示、元学习和持续学习；训练和合作轨迹连接北大、MPII 与 NUS Tat-Seng Chua 的 NExT++ Lab。",
    facts: [
      fact("当前任职", "2024 年 7 月起任 SMU Computer Science Associate Professor，并获 Lee Kong Chian Fellowship。", sources.qianruCv),
      fact("教育与学术训练", "2010 年获南京邮电大学学士，2016 年获北京大学博士；博士论文导师 Hong Liu，随后在 MPII 从事博士后研究。", sources.qianruSeminar),
      fact("研究主线", "计算机视觉、因果推理、元学习、小样本与持续学习。", sources.qianruOfficial),
      fact("学术网络", "2018 年起在 NUS NExT++ Lab 与 Tat-Seng Chua 合作并负责计算机视觉组，随后共同发表多篇视觉学习工作。", sources.qianruSeminar),
      fact("当前培养", "SMU 官方名录列 Tian Zichen 与 Wang Qing 为其指导或共同指导学生。", sources.qianruOfficial),
    ],
    sources: [sources.qianruOfficial, sources.qianruCv, sources.qianruSeminar, sources.qianruStudents],
  }),
  person({
    id: "chuanxia-zheng-ntu-p0-2026", name: "Chuanxia Zheng", role: "Nanyang Assistant Professor · NRF Fellow", institution: "NTU", region: "Singapore",
    area: "Physical AI · Spatial AI · Generative 3D/4D Vision", tags: ["Physical AI", "Spatial AI", "生成式视觉", "3D/4D 重建"],
    stage: "emerging", x: 920, y: 120, portraitFile: "chuanxia-zheng.jpg", portraitSource: sources.chuanxiaOfficial,
    summary: "NTU Physical Vision Group 负责人，研究可感知、重建并交互于物理世界的生成式 3D/4D 系统；博士师承 Tat-Jen Cham 与 Jianfei Cai，后在 Oxford VGG 与 Andrea Vedaldi 合作。",
    facts: [
      fact("当前任职", "NTU CCDS Nanyang Assistant Professor、NRF Fellow，并领导 Physical Vision Group。", sources.chuanxiaOfficial),
      fact("教育与学术训练", "北京交通大学信息工程学士、北航计算机硕士、2021 年 NTU 计算机博士，博士导师 Tat-Jen Cham 与 Jianfei Cai。", sources.chuanxiaHome),
      fact("研究主线", "Physical AI、Spatial AI，以及从单图或视频进行生成式 3D/4D 重建。", sources.chuanxiaOfficial),
      fact("博士后与合作", "加入 NTU 前在 Oxford VGG 任 MSCA Fellow，与 Andrea Vedaldi 研究前馈式真实感 3D/4D 重建。", sources.chuanxiaHome),
      fact("独立项目", "NRF Fellowship 项目以自然世界的物理属性建模为目标，主页将其明确列为 PI。", sources.chuanxiaHome),
    ],
    sources: [sources.chuanxiaOfficial, sources.chuanxiaHome, sources.tatJenBio],
  }),
];

export const candidatePriorityP0AsiaBatch2Relationships2026: Relationship[] = [
  {
    id: "candidate-p0-asia-b2-shaoping-ma-qingyao-ai",
    from: "shaoping-ma-thu", to: "qingyao-ai-thu-p0-2026", type: "collaboration", subtype: "publication", label: "信息检索论文合作",
    evidence: "清华官方个人页列出 Qingyao Ai 与 Shaoping Ma 在检索、法律检索和用户行为研究上的多篇共同署名论文。",
    source: sources.qingyaoOfficial, verified: true, evidenceObject: "multiple information-retrieval publications", recentYear: 2023,
  },
  {
    id: "candidate-p0-asia-b2-wenwu-zhu-peng-cui",
    from: "wenwu-zhu-thu", to: "peng-cui-thu-p0-2026", type: "collaboration", subtype: "sustained_collaboration", label: "网络表示与多媒体持续合作",
    evidence: "清华官方主页列出朱文武、崔鹏等共同完成的图表示学习、网络嵌入和多媒体计算论文。",
    source: sources.pengCollaboration, verified: true, evidenceObject: "graph representation and multimedia publications", recentYear: 2020,
  },
  {
    id: "candidate-p0-asia-b2-bei-yu-wei-li",
    from: "bei-yu-cuhk-p0-2026", to: "wei-li-nus-pending-resolution", type: "lineage", subtype: "co_adviser", label: "MPhil 共同导师",
    evidence: "NUS 官方个人页明确写明 Wei Li 在 CUHK 的 MPhil 由 Bei Yu 与 Michael R. Lyu 共同指导。",
    source: sources.weiLiNus, verified: true, evidenceObject: "Wei Li CUHK MPhil", endYear: 2021,
  },
  {
    id: "candidate-p0-asia-b2-tat-seng-qianru-sun",
    from: "tat-seng-chua", to: "qianru-sun-smu-p0-2026", type: "collaboration", subtype: "sustained_collaboration", label: "NExT++ 视觉研究合作",
    evidence: "SMU 官方讲座介绍 Qianru Sun 自 2018 年在 NUS NExT++ Lab 与 Tat-Seng Chua 工作并负责视觉组；其 SMU CV 继续列出双方多篇共同论文。",
    source: sources.qianruSeminar, verified: true, evidenceObject: "NExT++ Lab and repeated joint publications", startYear: 2018, recentYear: 2021,
  },
  {
    id: "candidate-p0-asia-b2-tat-jen-chuanxia-zheng",
    from: "tat-jen-cham-ntu", to: "chuanxia-zheng-ntu-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师",
    evidence: "Chuanxia Zheng 的第一方主页明确写明其 NTU 计算机博士由 Tat-Jen Cham 与 Jianfei Cai 共同指导；Tat-Jen Cham 的 NTU 主页亦将其列为 2021 年博士毕业生。",
    source: sources.chuanxiaHome, verified: true, evidenceObject: "NTU Computer Science PhD", endYear: 2021,
  },
];

export const candidatePriorityP0AsiaBatch2GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-asia-b2-qi-qianhan-feng", teacherId: "qi-dou-cuhk-p0-2026", name: "Qianhan Feng", role: "PhD student", focus: "Medical AI · co-advised with Winnie Chu", source: sources.qiTeam },
  { id: "candidate-p0-asia-b2-qi-jiawei-fu", teacherId: "qi-dou-cuhk-p0-2026", name: "Jiawei Fu", role: "PhD student", focus: "Surgical embodied intelligence", source: sources.qiTeam },
  { id: "candidate-p0-asia-b2-bei-zixiao-wang", teacherId: "bei-yu-cuhk-p0-2026", name: "Zixiao Wang", role: "PhD student", focus: "Machine learning for EDA", source: sources.beiStudents },
  { id: "candidate-p0-asia-b2-bei-shixin-chen", teacherId: "bei-yu-cuhk-p0-2026", name: "Shixin Chen", role: "PhD student · HKPFS", focus: "Machine learning for EDA", source: sources.beiStudents },
  { id: "candidate-p0-asia-b2-qianru-tian-zichen", teacherId: "qianru-sun-smu-p0-2026", name: "Zichen Tian", role: "PhD student", focus: "Parameter-efficient transfer learning · remote sensing", source: sources.qianruStudents },
  { id: "candidate-p0-asia-b2-qianru-ying-jiahao", teacherId: "qianru-sun-smu-p0-2026", name: "Jiahao Ying", role: "PhD candidate · co-advised with Yixin Cao", focus: "LLM evaluation and improvement", source: sources.qianruStudents },
];

const placement = (
  id: string,
  student: string,
  teacherId: string,
  company: string,
  role: string,
  sourceValue: Source,
  sector: StudentPlacement["sector"] = "industry",
): StudentPlacement => ({
  id,
  student,
  teacherId,
  company,
  role,
  kind: "current",
  degree: "PhD",
  sector,
  source: sourceValue,
  verifiedAt: checkedAt,
});

export const candidatePriorityP0AsiaBatch2Placements2026: StudentPlacement[] = [
  placement("candidate-p0-asia-b2-qi-zhao-wang", "Zhao Wang", "qi-dou-cuhk-p0-2026", "Alibaba", "Researcher · previously ByteDance", sources.qiTeam),
  placement("candidate-p0-asia-b2-qi-meirui-jiang", "Meirui Jiang", "qi-dou-cuhk-p0-2026", "Ant Group", "Researcher", sources.qiTeam),
  placement("candidate-p0-asia-b2-qi-wenao-ma", "Wenao Ma", "qi-dou-cuhk-p0-2026", "Huawei", "Researcher", sources.qiTeam),
  placement("candidate-p0-asia-b2-qi-quande-liu", "Quande Liu", "qi-dou-cuhk-p0-2026", "Tencent", "Researcher", sources.qiTeam),
  placement("candidate-p0-asia-b2-qi-cheng-chen", "Cheng Chen", "qi-dou-cuhk-p0-2026", "University of Hong Kong", "Assistant Professor", sources.qiTeam, "academia"),
  placement("candidate-p0-asia-b2-bei-xinyun-zhang", "Xinyun Zhang", "bei-yu-cuhk-p0-2026", "ShanghaiTech University", "Assistant Professor", sources.beiCv, "academia"),
  placement("candidate-p0-asia-b2-bei-yuxuan-zhao", "Yuxuan Zhao", "bei-yu-cuhk-p0-2026", "CUHK-Shenzhen", "Assistant Professor", sources.beiCv, "academia"),
  placement("candidate-p0-asia-b2-bei-chen-bai", "Chen Bai", "bei-yu-cuhk-p0-2026", "Fudan University", "Assistant Professor", sources.beiCv, "academia"),
  placement("candidate-p0-asia-b2-bei-guojin-chen", "Guojin Chen", "bei-yu-cuhk-p0-2026", "Huawei Noah's Ark Lab", "Researcher", sources.beiCv),
];

export type CandidatePriorityP0AsiaBatch2RosterPromotion2026 = {
  unitUrl: string;
  rosterName: string;
  atlasPersonId: string;
};

export const candidatePriorityP0AsiaBatch2RosterPromotions2026: CandidatePriorityP0AsiaBatch2RosterPromotion2026[] = [
  { unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", rosterName: "Qingyao Ai", atlasPersonId: "qingyao-ai-thu-p0-2026" },
  { unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", rosterName: "Peng CUI", atlasPersonId: "peng-cui-thu-p0-2026" },
  { unitUrl: "https://www.cse.cuhk.edu.hk/people/faculty/", rosterName: "Qi Dou", atlasPersonId: "qi-dou-cuhk-p0-2026" },
  { unitUrl: "https://www.cse.cuhk.edu.hk/people/faculty/", rosterName: "Bei Yu", atlasPersonId: "bei-yu-cuhk-p0-2026" },
  { unitUrl: "https://computing.smu.edu.sg/faculty", rosterName: "SUN Qianru", atlasPersonId: "qianru-sun-smu-p0-2026" },
  { unitUrl: "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", rosterName: "Asst Prof Chuanxia Zheng", atlasPersonId: "chuanxia-zheng-ntu-p0-2026" },
];

export const People = candidatePriorityP0AsiaBatch2People2026;
export const Relationships = candidatePriorityP0AsiaBatch2Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch2Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch2GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch2RosterPromotions2026;

export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
