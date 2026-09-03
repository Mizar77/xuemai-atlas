import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const cuhkCseRoster = source("CUHK CSE · Faculty roster", "https://www.cse.cuhk.edu.hk/people/faculty/", "official", "香港中文大学计算机系现任教师名录");
const cityuCsRoster = source("CityUHK CS · Academic staff", "https://www.cs.cityu.edu.hk/people/academic-staff", "official", "香港城市大学计算机系现任教师名录");
const ntuRoster = source("NTU CCDS · Faculty roster", "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", "official", "南洋理工大学计算与数据科学学院现任教师名录");
const nusRoster = source("NUS Computing · Faculty roster", "https://www.comp.nus.edu.sg/about/faculty/", "official", "新加坡国立大学计算学院现任教师名录");
const smuRoster = source("SMU SCIS · Faculty roster", "https://computing.smu.edu.sg/faculty", "official", "新加坡管理大学计算与信息系统学院现任教师名录");

const jimmyProfile = source("CUHK CSE · Jimmy Ho Man Lee", "https://www.cse.cuhk.edu.hk/people/faculty/jimmy-ho-man-lee/", "official", "现任职务、教育训练、博士导师、研究与官方头像");
const ziliProfile = source("CUHK CSE · Zili Shao", "https://www.cse.cuhk.edu.hk/people/faculty/zili-shao/", "official", "现任职务、教育训练、研究方向与官方头像");
const ziliHome = source("Zili Shao · Academic homepage", "https://www.cse.cuhk.edu.hk/~shao/", "profile", "研究主线、招生状态与论文合作");
const kedeProfile = source("CityUHK Scholars · Kede Ma", "https://scholars.cityu.edu.hk/en/persons/kede-ma(4136de50-41a0-410b-8c2d-78d8b142db45).html", "official", "现任职务、教育训练、研究方向、学生与项目");
const jingProfile = source("CityUHK Scholars · Jing Liao", "https://scholars.cityu.edu.hk/en/persons/jing-liao(45757c38-f737-420d-8a7f-73b58d30c1fd).html", "official", "现任职务、教育训练、研究方向、学生与项目");
const linqiProfile = source("CityUHK Scholars · Linqi Song", "https://scholars.cityu.edu.hk/en/persons/linqi-song(a665d7a3-8847-404d-a56a-2b10b470327c).html", "official", "现任职务、教育训练、研究方向、学生与项目");
const zhangProfile = source("NTU Research · Zhang Mengmi", "https://dr.ntu.edu.sg/entities/person/Zhang-Mengmi", "official", "现任职务、博士及博士后训练、研究与官方头像");
const zhangLab = source("BRAINS Lab · Mengmi Zhang", "https://www.mengmi.info/", "profile", "实验室研究、团队与学术履历");
const ilyaProfile = source("NUS Computing · Ilya Sergey", "https://www.comp.nus.edu.sg/cs/people/ilya", "official", "现任职务、教育训练、研究方向与官方头像");
const ilyaStudents = source("Ilya Sergey · Students", "https://ilyasergey.net/students/", "profile", "当前学生、博士毕业生及首份去向");
const ilyaNews = source("NUS Computing · PLDI 2023 award", "https://www.comp.nus.edu.sg/news/2023-acm-sigplan-isergey/", "official", "Ilya Sergey 与学生 Kiran Gopinathan、Mayank Keoliya 的获奖合作");
const surangaProfile = source("NUS Computing · Suranga Nanayakkara", "https://www.comp.nus.edu.sg/cs/people/suranga", "official", "现任职务、教育训练、研究、履历与官方头像");
const surangaLab = source("Augmented Human Lab · People", "https://ahlab.org/people/", "profile", "实验室当前成员和校友");
const hadyProfile = source("SMU Faculty · Hady W. Lauw", "https://faculty.smu.edu.sg/profile/hady-w-lauw-341", "official", "现任职务、教育训练、研究方向与指导学生");
const hadyCv = source("Hady W. Lauw · CV", "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2026-02/hadywlauw-CV.pdf", "cv", "教育经历、学术与产业履历、指导论文");
const kwohHome = source("Kwoh Chee Keong · Academic homepage", "https://www3.ntu.edu.sg/home/asckkwoh/", "profile", "现任单位、教育训练、研究方向与公开履历");
const kwohPace = source("NTU PACE · Kwoh Chee Keong", "https://www.ntu.edu.sg/pace/for-individuals/student-immersion-programmes/ntu-immersion-programme-the-power-and-possibilities-of-ai", "official", "教育训练、研究方向、任职年限与指导规模");
const kwohStudent = source("NTU HIL Seminar · Liu Chen", "https://www.ntu.edu.sg/docs/librariesprovider118/stories/hil_research_seminars.pdf?sfvrsn=72c2d84c_1", "official", "博士生 Liu Chen 及导师 Kwoh Chee Keong");

export const candidatePriorityP0HkSgTailBatch2People2026: Person[] = [
  {
    id: "jimmy-lee-cuhk-p0-tail-b2", name: "Jimmy Ho Man Lee", role: "Professor · Director, University Planning Office", institution: "CUHK", region: "Hong Kong",
    area: "Constraint Programming · Artificial Intelligence", tags: ["AI", "Constraint Programming", "Combinatorial Optimization"],
    summary: "CUHK 计算机系教授，长期研究约束逻辑编程与组合优化；官方简介直接记录其博士导师。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 150, y: 145, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/jimmy-ho-man-lee.png", alt: "Jimmy Ho Man Lee 官方头像", source: jimmyProfile },
    sources: [jimmyProfile, cuhkCseRoster], facts: [
      fact("当前任职", "香港中文大学计算机科学与工程学系教授，并任大学规划处处长。", jimmyProfile),
      fact("教育与学术训练", "在香港中文大学完成本科和硕士训练，1992 年于 University of Victoria 完成博士研究。", jimmyProfile),
      fact("师承关系", "官方简介明确说明其博士研究由 Maarten van Emden 指导。", jimmyProfile),
      fact("研究主线", "研究约束逻辑编程、约束求解与组合优化。", jimmyProfile),
    ],
  },
  {
    id: "zili-shao-cuhk-p0-tail-b2", name: "Zili Shao", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Storage Systems · Embedded Systems · LLM Systems", tags: ["Systems", "Storage", "Embedded Systems", "LLM Systems"],
    summary: "CUHK 计算机系教授，研究存储与嵌入式系统，近期工作延伸到大模型推理系统。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 310, y: 145, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/zili-shao.png", alt: "Zili Shao 官方头像", source: ziliProfile },
    sources: [ziliProfile, cuhkCseRoster, ziliHome], facts: [
      fact("当前任职", "香港中文大学计算机科学与工程学系教授。", ziliProfile),
      fact("教育与学术训练", "本科毕业于 UESTC，并于 University of Texas at Dallas 获博士学位。", ziliProfile),
      fact("任职轨迹", "2018 年加入 CUHK，此前任职于 Hong Kong Polytechnic University。", ziliProfile),
      fact("研究主线", "研究嵌入式与存储系统；个人主页列出其与 Tianyu Wang 共同开展的 GPU-CPU 并行大模型推理工作。", ziliHome),
    ],
  },
  {
    id: "kede-ma-cityu-p0-tail-b2", name: "Kede Ma", chinese: "马柯德", role: "Professor", institution: "CityU", region: "Hong Kong",
    area: "Perceptual Image Processing · Visual Quality · Generative AI", tags: ["Computer Vision", "Image Quality", "Generative AI", "Perception"],
    summary: "CityU 计算机系教授，研究感知图像处理、视觉质量与生成模型，学校研究系统公开列出其博士生。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 470, y: 145, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/kede-ma.png", alt: "Kede Ma 官方头像", source: kedeProfile },
    sources: [kedeProfile, cityuCsRoster], facts: [
      fact("当前任职", "香港城市大学计算机科学系教授。", kedeProfile),
      fact("教育与学术训练", "本科毕业于 USTC，并在 University of Waterloo 完成硕士与博士训练。", kedeProfile),
      fact("研究主线", "研究感知图像处理、视觉质量评估、机器学习与生成模型。", kedeProfile),
      fact("学生体系", "CityUHK Scholars 公开列出 Ziqiang Cui、Guanzhi Deng、Jiaqi He 等受指导学生。", kedeProfile),
    ],
  },
  {
    id: "jing-liao-cityu-p0-tail-b2", name: "Jing Liao", chinese: "廖菁", role: "Associate Professor", institution: "CityU", region: "Hong Kong",
    area: "Computer Graphics · Computer Vision · Generative 3D", tags: ["Computer Graphics", "Computer Vision", "3D Generation", "Computational Photography"],
    summary: "CityU 计算机系副教授，研究计算机图形学、视觉与生成式 3D，曾任微软亚洲研究院研究员。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 630, y: 145, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/jing-liao.png", alt: "Jing Liao 官方头像", source: jingProfile },
    sources: [jingProfile, cityuCsRoster], facts: [
      fact("当前任职", "香港城市大学计算机科学系副教授。", jingProfile),
      fact("教育与学术训练", "本科毕业于 HUST，并在 Zhejiang University 与 HKUST 完成博士训练。", jingProfile),
      fact("任职轨迹", "加入 CityU 前曾任 Microsoft Research Asia Visual Computing Group 研究员。", jingProfile),
      fact("研究主线", "研究计算机图形学、视觉和计算摄影；学校研究系统列出 Junrong Huang、Zhitong Huang 等博士生。", jingProfile),
    ],
  },
  {
    id: "linqi-song-cityu-p0-tail-b2", name: "Linqi Song", chinese: "宋林琦", role: "Professor", institution: "CityU", region: "Hong Kong",
    area: "Machine Learning · Multi-agent Systems · Wireless AI", tags: ["Machine Learning", "Multi-agent", "LLM Agents", "Federated Learning"],
    summary: "CityU 计算机系教授，研究机器学习、网络优化和大模型多智能体系统，官方研究系统公开其学生体系。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 790, y: 145, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/linqi-song.png", alt: "Linqi Song 官方头像", source: linqiProfile },
    sources: [linqiProfile, cityuCsRoster], facts: [
      fact("当前任职", "香港城市大学计算机科学系教授。", linqiProfile),
      fact("教育与学术训练", "2006、2009 年于 Tsinghua University 获学士和硕士学位，后于 UCLA 获电气工程博士学位并从事博士后研究。", linqiProfile),
      fact("研究主线", "研究机器学习、无线网络、联邦学习及 LLM 驱动的多智能体系统。", linqiProfile),
      fact("学生体系", "官方研究系统列出 Xuecheng Cai、Guanzhi Deng、Feilong Ding 等博士生。", linqiProfile),
    ],
  },
  {
    id: "mengmi-zhang-ntu-p0-tail-b2", name: "Mengmi Zhang", chinese: "张梦旻", role: "Nanyang Assistant Professor", institution: "NTU", region: "Singapore",
    area: "Brain-inspired AI · Computer Vision · Continual Learning", tags: ["Brain-inspired AI", "Computer Vision", "Continual Learning", "Computational Neuroscience"],
    summary: "NTU Nanyang Assistant Professor，研究脑启发视觉智能、持续学习与计算神经科学。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 150, y: 335, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/zhang-mengmi.png", alt: "Mengmi Zhang 官方头像", source: zhangProfile },
    sources: [zhangProfile, ntuRoster, zhangLab], facts: [
      fact("当前任职", "NTU College of Computing & Data Science tenure-track Nanyang Assistant Professor。", zhangProfile),
      fact("教育与学术训练", "在 NUS 完成博士训练，并在 Harvard-MIT Center for Brains, Minds, and Machines 接受博士后训练。", zhangProfile),
      fact("博士后训练", "NTU 官方简介明确列出其博士后导师为 Gabriel Kreiman。", zhangProfile),
      fact("研究主线", "研究脑启发人工智能、视觉搜索、工作记忆和持续学习。", zhangProfile),
    ],
  },
  {
    id: "ilya-sergey-nus-p0-tail-b2", name: "Ilya Sergey", role: "Associate Professor · VERSE Lab Lead", institution: "NUS", region: "Singapore",
    area: "Programming Languages · Formal Verification · Program Synthesis", tags: ["Formal Verification", "Programming Languages", "Program Synthesis", "Trustworthy Systems"],
    summary: "NUS 终身副教授与 VERSE Lab 负责人，研究形式化验证、程序综合和可信软件系统。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 310, y: 335, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/ilya-sergey.png", alt: "Ilya Sergey 官方头像", source: ilyaProfile },
    sources: [ilyaProfile, nusRoster, ilyaStudents, ilyaNews], facts: [
      fact("当前任职", "新加坡国立大学计算学院终身副教授，并领导 VERSE Lab。", ilyaProfile),
      fact("教育与学术训练", "2008 年获 Saint Petersburg State University 硕士，2012 年于 KU Leuven 获计算机博士。", ilyaProfile),
      fact("任职轨迹", "加入 NUS 前曾在 IMDEA Software Institute 从事博士后研究，并任教于 UCL。", ilyaProfile),
      fact("研究主线", "研究程序语言、形式化验证、并发系统与可证明的软件工程。", ilyaProfile),
      fact("学生与人才流动", "个人学生页记录 Kiran Gopinathan 于 2024 年博士毕业，首份去向为 UIUC 博士后。", ilyaStudents),
    ],
  },
  {
    id: "suranga-nanayakkara-nus-p0-tail-b2", name: "Suranga Nanayakkara", role: "Associate Professor · Augmented Human Lab Founder", institution: "NUS", region: "Singapore",
    area: "Human-Computer Interaction · Assistive AI · Wearable Computing", tags: ["HCI", "Assistive AI", "Wearables", "Multimodal Interaction"],
    summary: "NUS 计算机系副教授、Augmented Human Lab 创办人，研究扩展人类感知与认知能力的智能交互技术。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 470, y: 335, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/suranga-nanayakkara.png", alt: "Suranga Nanayakkara 官方头像", source: surangaProfile },
    sources: [surangaProfile, nusRoster, surangaLab], facts: [
      fact("当前任职", "新加坡国立大学计算机系副教授，并任 Augmented Human Lab 首席研究员。", surangaProfile),
      fact("教育与学术训练", "2005 年于 NUS 获工程学士，2010 年于 NUS 获博士学位；随后在 MIT Media Lab 从事博士后研究。", surangaProfile),
      fact("任职轨迹", "曾任教于 SUTD 与 University of Auckland，之后加入 NUS。", surangaProfile),
      fact("研究主线", "研究增强人类交互、可穿戴界面与人机交互。", surangaProfile),
      fact("学生与团队", "实验室人员页公开列出 Phoebe Chua、Mia Nguyen、Yize Wei 等当前博士生。", surangaLab),
    ],
  },
  {
    id: "hady-lauw-smu-p0-tail-b2", name: "Hady W. Lauw", role: "Associate Professor · BSc CS Programme Director", institution: "SMU", region: "Singapore",
    area: "Recommender Systems · Data Mining · Machine Learning", tags: ["Recommender Systems", "Data Mining", "Machine Learning", "Information Retrieval"],
    summary: "SMU 计算机副教授与本科计算机项目主任，研究推荐、数据挖掘和机器学习，并公开完整指导学生名单。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 630, y: 335, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/hady-lauw.png", alt: "Hady W. Lauw 官方头像", source: hadyProfile },
    sources: [hadyProfile, smuRoster, hadyCv], facts: [
      fact("当前任职", "SMU 计算与信息系统学院计算机副教授，并任 BSc Computer Science Programme Director。", hadyProfile),
      fact("教育与学术训练", "2002 年获 NTU 工程学士，2008 年于 NTU 获博士学位。", hadyCv),
      fact("任职轨迹", "博士后在 Microsoft Research Search Labs 工作，之后任 A*STAR I²R Scientist，再加入 SMU。", hadyCv),
      fact("研究主线", "研究数据挖掘、机器学习、推荐与信息检索。", hadyProfile),
      fact("学生体系", "官方教师目录列出 Dong Viet Hoang、Le Thi Phuong 等当前 Research Advisor/Co-Research Advisor 关系。", hadyProfile),
    ],
  },
  {
    id: "kwoh-chee-keong-ntu-p0-tail-b2", name: "Kwoh Chee Keong", role: "Associate Professor", institution: "NTU", region: "Singapore",
    area: "Machine Learning · Bioinformatics · Graph-based Inference", tags: ["Machine Learning", "Bioinformatics", "Graph Learning", "Health AI"],
    summary: "NTU 计算与数据科学学院副教授，长期将机器学习与图推断用于生物信息学，并形成较大博士生培养体系。",
    category: "core", primary: true, status: "current independent PI · official profile verified", stage: "senior", x: 790, y: 335, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
    portrait: { src: "portraits/candidate-p0-hk-sg-tail-batch-2-2026/kwoh-chee-keong.png", alt: "Kwoh Chee Keong 官方头像", source: kwohHome },
    sources: [kwohHome, kwohPace, ntuRoster, kwohStudent], facts: [
      fact("当前任职", "南洋理工大学计算与数据科学学院副教授。", kwohPace),
      fact("教育与学术训练", "在 NUS 获电气工程学士和工业系统工程硕士，1995 年于 Imperial College 获博士学位。", kwohPace),
      fact("研究主线", "研究数据挖掘、软计算、图推断及其在生物信息学与生物医学工程中的应用。", kwohPace),
      fact("学生体系", "NTU 官方介绍称其已培养 26 名博士和 8 名 MEng；HIL 研讨会材料另明确 Liu Chen 为其博士生。", kwohPace),
    ],
  },
];

export const candidatePriorityP0HkSgTailBatch2SupportingPeople2026: Person[] = [
  {
    id: "maarten-van-emden-p0-tail-b2-support", name: "Maarten van Emden", role: "PhD adviser · historical endpoint", institution: "External", region: "Canada",
    area: "Logic Programming · Constraint Programming", tags: ["Logic Programming", "Constraint Programming"], summary: "Jimmy Ho Man Lee 的博士导师，用于连接由 CUHK 官方简介直接核验的师承关系。",
    category: "historical", primary: false, status: "historical verified adviser endpoint", stage: "historical", x: 150, y: 520, lastVerifiedAt: checkedAt,
    sources: [jimmyProfile], facts: [fact("师承关系", "CUHK 官方简介明确记录 Maarten van Emden 指导 Jimmy Ho Man Lee 的博士研究。", jimmyProfile)],
  },
  {
    id: "tianyu-wang-zili-p0-tail-b2-support", name: "Tianyu Wang", role: "Research collaborator", institution: "External", region: "Hong Kong",
    area: "Storage Systems · LLM Systems", tags: ["Systems", "LLM Inference"], summary: "Zili Shao 个人主页中多篇系统论文的共同作者。",
    category: "adjacent", primary: false, status: "adjacent verified collaborator endpoint", stage: "adjacent", x: 310, y: 520, lastVerifiedAt: checkedAt,
    sources: [ziliHome], facts: [fact("合作关系", "Zili Shao 个人主页列出 Tianyu Wang 与其共同署名的存储和 LLM 推理系统论文。", ziliHome)],
  },
  {
    id: "gabriel-kreiman-p0-tail-b2-support", name: "Gabriel Kreiman", role: "Postdoctoral mentor", institution: "Harvard", region: "United States",
    area: "Computational Neuroscience · Vision", tags: ["Computational Neuroscience", "Vision"], summary: "Mengmi Zhang 的博士后导师，用于连接 NTU 官方履历直接核验的训练关系。",
    category: "adjacent", primary: false, status: "adjacent verified mentor endpoint", stage: "adjacent", x: 470, y: 520, lastVerifiedAt: checkedAt,
    sources: [zhangProfile], facts: [fact("指导关系", "NTU 官方简介明确记录 Mengmi Zhang 在 Gabriel Kreiman 指导下完成博士后训练。", zhangProfile)],
  },
];

export const candidatePriorityP0HkSgTailBatch2Relationships2026: Relationship[] = [
  { id: "p0-hksg-tail-b2-emden-lee", from: "maarten-van-emden-p0-tail-b2-support", to: "jimmy-lee-cuhk-p0-tail-b2", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "CUHK 官方简介明确说明 Jimmy Ho Man Lee 在 Maarten van Emden 指导下完成博士研究。", evidenceObject: "University of Victoria doctoral supervision", source: jimmyProfile, verified: true },
  { id: "p0-hksg-tail-b2-shao-wang", from: "zili-shao-cuhk-p0-tail-b2", to: "tianyu-wang-zili-p0-tail-b2-support", type: "collaboration", subtype: "publication", label: "系统论文合作", evidence: "Zili Shao 个人主页列出两人共同署名的 TwinPilots、SmartCache 等系统论文。", evidenceObject: "TwinPilots · SYSTOR 2024; SmartCache · NeurIPS 2025", source: ziliHome, verified: true, recentYear: 2025 },
  { id: "p0-hksg-tail-b2-kreiman-zhang", from: "gabriel-kreiman-p0-tail-b2-support", to: "mengmi-zhang-ntu-p0-tail-b2", type: "lineage", subtype: "postdoc_mentor", label: "博士后导师", evidence: "NTU 官方简介明确记录 Mengmi Zhang 在 Gabriel Kreiman 指导下完成博士后训练。", evidenceObject: "Harvard-MIT CBMM postdoctoral training", source: zhangProfile, verified: true },
];

export const candidatePriorityP0HkSgTailBatch2GroupMembers2026: GroupMember[] = [
  { id: "p0-hksg-tail-b2-kede-cui", teacherId: "kede-ma-cityu-p0-tail-b2", name: "Ziqiang Cui", role: "PhD student", focus: "machine learning and visual quality", source: kedeProfile },
  { id: "p0-hksg-tail-b2-jing-huang", teacherId: "jing-liao-cityu-p0-tail-b2", name: "Junrong Huang", role: "PhD student", focus: "computer graphics and generative models", source: jingProfile },
  { id: "p0-hksg-tail-b2-linqi-cai", teacherId: "linqi-song-cityu-p0-tail-b2", name: "Xuecheng Cai", role: "PhD student", focus: "federated machine learning", source: linqiProfile },
  { id: "p0-hksg-tail-b2-ilya-kiran", teacherId: "ilya-sergey-nus-p0-tail-b2", name: "Kiran Gopinathan", role: "PhD alumnus · NUS 2019–2024", focus: "formal verification and proof repair", source: ilyaStudents },
  { id: "p0-hksg-tail-b2-suranga-phoebe", teacherId: "suranga-nanayakkara-nus-p0-tail-b2", name: "Phoebe Chua", role: "PhD candidate", focus: "augmented human interaction", source: surangaLab },
  { id: "p0-hksg-tail-b2-hady-dong", teacherId: "hady-lauw-smu-p0-tail-b2", name: "Dong Viet Hoang", role: "PhD student · research advisee", focus: "data mining and machine learning", source: hadyProfile },
  { id: "p0-hksg-tail-b2-kwoh-liu", teacherId: "kwoh-chee-keong-ntu-p0-tail-b2", name: "Liu Chen", role: "PhD student", focus: "computational biology and artificial intelligence", source: kwohStudent },
];

export const candidatePriorityP0HkSgTailBatch2Placements2026: StudentPlacement[] = [
  { id: "p0-hksg-tail-b2-ilya-kiran-uiuc", student: "Kiran Gopinathan", teacherId: "ilya-sergey-nus-p0-tail-b2", company: "UIUC", role: "Postdoctoral Researcher", kind: "first_job", sector: "postdoc", degree: "PhD", graduationYear: 2024, firstJob: "Postdoctoral Researcher at UIUC", source: ilyaStudents, verifiedAt: checkedAt },
];

export const candidatePriorityP0HkSgTailBatch2RosterPromotions2026 = [
  { unitUrl: cuhkCseRoster.url, rosterName: "Jimmy Ho Man Lee", atlasPersonId: "jimmy-lee-cuhk-p0-tail-b2" },
  { unitUrl: cuhkCseRoster.url, rosterName: "Zili Shao", atlasPersonId: "zili-shao-cuhk-p0-tail-b2" },
  { unitUrl: cityuCsRoster.url, rosterName: "Prof MA, Kede 馬柯德", atlasPersonId: "kede-ma-cityu-p0-tail-b2" },
  { unitUrl: cityuCsRoster.url, rosterName: "Prof LIAO, Jing 廖菁", atlasPersonId: "jing-liao-cityu-p0-tail-b2" },
  { unitUrl: cityuCsRoster.url, rosterName: "Prof SONG, Linqi 宋林琦", atlasPersonId: "linqi-song-cityu-p0-tail-b2" },
  { unitUrl: ntuRoster.url, rosterName: "Asst Prof Zhang Mengmi", atlasPersonId: "mengmi-zhang-ntu-p0-tail-b2" },
  { unitUrl: nusRoster.url, rosterName: "Ilya SERGEY", atlasPersonId: "ilya-sergey-nus-p0-tail-b2" },
  { unitUrl: nusRoster.url, rosterName: "Suranga NANAYAKKARA", atlasPersonId: "suranga-nanayakkara-nus-p0-tail-b2" },
  { unitUrl: smuRoster.url, rosterName: "Hady W. LAUW", atlasPersonId: "hady-lauw-smu-p0-tail-b2" },
  { unitUrl: ntuRoster.url, rosterName: "Assoc Prof Kwoh Chee Keong", atlasPersonId: "kwoh-chee-keong-ntu-p0-tail-b2" },
];

export const People = candidatePriorityP0HkSgTailBatch2People2026;
export const SupportingPeople = candidatePriorityP0HkSgTailBatch2SupportingPeople2026;
export const Relationships = candidatePriorityP0HkSgTailBatch2Relationships2026;
export const GroupMembers = candidatePriorityP0HkSgTailBatch2GroupMembers2026;
export const Placements = candidatePriorityP0HkSgTailBatch2Placements2026;
export const RosterPromotions = candidatePriorityP0HkSgTailBatch2RosterPromotions2026;
export const people = People;
export const supportingPeople = SupportingPeople;
export const relationships = Relationships;
export const groupMembers = GroupMembers;
export const placements = Placements;
export const rosterPromotions = RosterPromotions;
