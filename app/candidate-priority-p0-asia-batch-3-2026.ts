import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  xiaofeiOfficial: source(
    "浙江大学个人主页 · 何晓飞",
    "https://person.zju.edu.cn/0007101",
    "official",
    "现任教授、博士生导师、计算机学院归属、人工智能与机器学习研究方向和官方头像",
  ),
  xiaofeiEducation: source(
    "Frontiers of Electrical and Electronic Engineering · author biography",
    "https://journal.hep.com.cn/fee/EN/PDF/10.1007/s11460-011-0124-4",
    "publication",
    "浙江大学计算机学士、University of Chicago 计算机博士、Yahoo! Research 经历和研究方向",
  ),
  xiaofeiStudent: source(
    "浙江大学 · 博士生胡尧获得首届百度奖学金",
    "https://www.zju.edu.cn/2013/0904/c41533a64288/pagem.htm",
    "official",
    "胡尧为浙江大学计算机博士生，蔡登与何晓飞为共同导师，并给出其机器学习、视觉和数据挖掘方向",
  ),
  shanghangOfficial: source(
    "北京大学计算机学院 · 仉尚航",
    "https://cs.pku.edu.cn/info/1086/1735.htm",
    "official",
    "现任助理教授、视频与视觉技术研究所归属、研究方向、项目、论文和官方头像",
  ),
  shanghangCenter: source(
    "北京大学视频与视觉技术国家工程研究中心 · 仉尚航",
    "https://idm.pku.edu.cn/info/1017/1598.htm",
    "official",
    "长聘系列助理教授、研究员、博士生导师，CMU 博士、Berkeley BAIR 博士后和研究主线",
  ),
  shanghangZeng: source(
    "北京大学视频与视觉技术国家工程研究中心 · 曾承清硕士答辩",
    "https://idm.pku.edu.cn/info/1034/2180.htm",
    "official",
    "曾承清由仉尚航指导、研究医学图像压缩，并于 2025 年毕业后进入美团",
  ),
  shanghangDavid: source(
    "北京大学计算机学院 · 留学生科研分享会",
    "https://cs.pku.edu.cn/info/1263/3451.htm",
    "official",
    "David Hong 为仉尚航指导的硕士生，并开展具身智能研究",
  ),
  farzanOfficial: source(
    "CUHK CSE · Farzan Farnia",
    "https://www.cse.cuhk.edu.hk/people/faculty/farzan-farnia/",
    "official",
    "现任助理教授、教育背景、MIT 博士后、David Tse 指导经历、研究方向和官方头像",
  ),
  farzanHome: source(
    "Farzan Farnia · CUHK personal homepage",
    "https://www.cse.cuhk.edu.hk/~farnia/",
    "profile",
    "CUHK 独立 PI 身份、Stanford 学位与 David Tse 指导关系、MIT LIDS 博士后和多学习者学习研究主线",
  ),
  farzanBeiPaper: source(
    "CUHK-hosted paper · ChatPattern",
    "https://www.cse.cuhk.edu.hk/~byu/papers/C224-DAC2024-ChatPattern.pdf",
    "publication",
    "Farzan Farnia 与 Bei Yu 共同署名 DAC 2024 论文 ChatPattern",
  ),
  farzanStudent: source(
    "Qi Dou Lab · Team",
    "https://www.cse.cuhk.edu.hk/~qdou/homepage/team/",
    "profile",
    "Shizhan Gong 为 Qi Dou 与 Farzan Farnia 共同指导的 CUHK 博士生",
  ),
  antoniHome: source(
    "Antoni B. Chan · CityU personal homepage",
    "https://www.cs.cityu.edu.hk/~abchan/",
    "profile",
    "现任教授、学院研究与研究生副院长、教育和博士后经历、研究主线、产业实习和官方头像",
  ),
  antoniManagement: source(
    "CityUHK College of Computing · Management Team",
    "https://www.cityu.edu.hk/cc/about-us/management-team",
    "official",
    "Antoni Bert Chan 现任 College of Computing Associate Dean (Research and Postgraduate)",
  ),
  antoniThesis: source(
    "UC San Diego dissertation · Antoni Bert Chan",
    "https://escholarship.org/content/qt8226r9vj/qt8226r9vj.pdf",
    "thesis",
    "2008 年 UC San Diego 电子工程博士论文封面明确列 Nuno Vasconcelos 为 Chair",
  ),
  angelaOfficial: source(
    "NUS Computing · Angela YAO",
    "https://www.comp.nus.edu.sg/cs/people/ayao/",
    "official",
    "Dean's Chair Associate Professor、Assistant Dean Research、教育背景、研究方向、荣誉和官方头像",
  ),
  angelaHome: source(
    "Angela Yao · NUS personal homepage",
    "https://www.comp.nus.edu.sg/~ayao/",
    "profile",
    "现任研究组、研究主线、创业经历、Meta Reality Labs 访学和博士生、博士后校友去向",
  ),
  angelaPublications: source(
    "Angela Yao · Publications",
    "https://www.comp.nus.edu.sg/~ayao/publications.html",
    "publication",
    "Angela Yao 与 Tat-Seng Chua 在视频问答和视频理解方向的多篇长期共同署名论文",
  ),
  stefanoOfficial: source(
    "NTU CCDS · AI Faculty",
    "https://www.ntu.edu.sg/computing/ai-at-ntu/ai-faculty",
    "official",
    "现任副教授、Autonomous Agents Research Group 负责人、AI 研究归属和官方头像",
  ),
  stefanoBio: source(
    "Stefano V. Albrecht · first-party biography",
    "https://agents-lab.org/stefano-albrecht/bio.txt",
    "profile",
    "NTU 任职、Edinburgh 任职轨迹、UT Austin 与 Peter Stone 博士后、教育经历和产业合作",
  ),
  stefanoPeople: source(
    "Autonomous Agents Research Group · People",
    "https://agents-lab.org/people/",
    "profile",
    "Stefano V. Albrecht 的组负责人身份、当前博士后与博士生名单及逐人研究项目",
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
    src: `portraits/candidate-p0-asia-batch-3-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0AsiaBatch3People2026: Person[] = [
  person({
    id: "xiaofei-he-zju-p0-2026", name: "何晓飞", role: "教授 · 博士生导师", institution: "ZJU", region: "Mainland China",
    area: "Machine Learning · Computer Vision · Manifold Learning", tags: ["机器学习", "计算机视觉", "流形学习", "数据挖掘"],
    stage: "senior", x: 120, y: 120, portraitFile: "xiaofei-he.jpg", portraitSource: sources.xiaofeiOfficial,
    summary: "浙江大学机器学习资深 PI，研究从流形学习、统计学习延伸到视觉与数据挖掘；与蔡登长期共同培养机器学习和计算机视觉学生。",
    facts: [
      fact("当前任职", "浙江大学计算机科学与技术学院教授、博士生导师。", sources.xiaofeiOfficial),
      fact("教育与学术训练", "2000 年获浙江大学计算机学士，2005 年获 University of Chicago 计算机博士。", sources.xiaofeiEducation),
      fact("产业研究经历", "加入浙江大学前曾在 Yahoo! Research 任 Research Scientist。", sources.xiaofeiEducation),
      fact("研究主线", "机器学习、计算机视觉、流形学习、统计学习理论与核方法。", sources.xiaofeiEducation),
      fact("人才培养", "浙江大学官方报道明确将博士生胡尧列为蔡登、何晓飞共同指导。", sources.xiaofeiStudent),
    ],
    sources: [sources.xiaofeiOfficial, sources.xiaofeiEducation, sources.xiaofeiStudent],
  }),
  person({
    id: "shanghang-zhang-pku-p0-2026", name: "仉尚航", role: "长聘系列助理教授 · 研究员 · 博士生导师", institution: "PKU", region: "Mainland China",
    area: "Open-World Generalization · Embodied AI · Brain-Inspired Vision", tags: ["开放世界学习", "具身智能", "类脑视觉", "AI for Science"],
    stage: "emerging", x: 280, y: 120, portraitFile: "shanghang-zhang.jpg", portraitSource: sources.shanghangOfficial,
    summary: "北大开放世界学习与具身智能青年 PI，把泛化机器学习、类脑视觉和 AI for Science 连成一条研究线；公开培养记录已延伸到医学图像压缩与具身智能。",
    facts: [
      fact("当前任职", "北京大学计算机学院长聘系列助理教授（研究员）、博士生导师，隶属视频与视觉技术研究所。", sources.shanghangCenter),
      fact("教育与学术训练", "2018 年获 Carnegie Mellon University 博士；2020 年起在 UC Berkeley BAIR 从事博士后研究。", sources.shanghangCenter),
      fact("研究主线", "开放世界泛化机器学习、类脑视觉感知与学习、AI 驱动科学计算和具身智能。", sources.shanghangOfficial),
      fact("代表性成果", "官方简介记录其 Informer 工作获 AAAI 2021 Best Paper Award。", sources.shanghangCenter),
      fact("人才培养", "北大官方页面记录其指导曾承清完成医学图像压缩方向硕士论文，并明确给出其毕业去向。", sources.shanghangZeng),
    ],
    sources: [sources.shanghangOfficial, sources.shanghangCenter, sources.shanghangZeng, sources.shanghangDavid],
  }),
  person({
    id: "farzan-farnia-cuhk-p0-2026", name: "Farzan Farnia", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "Learning Theory · Optimization · Information Theory", tags: ["学习理论", "优化", "信息论", "鲁棒学习"],
    stage: "emerging", x: 440, y: 120, portraitFile: "farzan-farnia.jpg", portraitSource: sources.farzanOfficial,
    summary: "CUHK 学习理论与优化 PI，关注多学习者系统的收敛、均衡与鲁棒性；训练网络连接 Stanford David Tse 与 MIT LIDS，并和 Bei Yu 展开生成式芯片版图合作。",
    facts: [
      fact("当前任职", "CUHK Computer Science and Engineering Assistant Professor。", sources.farzanOfficial),
      fact("教育与学术训练", "Sharif University 电气工程与数学学士；Stanford University 电气工程硕士、博士，由 David Tse 指导。", sources.farzanHome),
      fact("博士后经历", "2019—2021 年在 MIT Laboratory for Information and Decision Systems 任博士后研究员。", sources.farzanOfficial),
      fact("研究主线", "机器学习与深度学习理论、优化、信息论，以及多学习者框架的收敛、均衡和鲁棒性。", sources.farzanHome),
      fact("跨方向合作", "与 Bei Yu 团队共同推进生成式芯片版图研究，合作成果包括 DAC 2024 ChatPattern。", sources.farzanBeiPaper),
    ],
    sources: [sources.farzanOfficial, sources.farzanHome, sources.farzanBeiPaper, sources.farzanStudent],
  }),
  person({
    id: "antoni-chan-cityu-p0-2026", name: "Antoni B. Chan", chinese: "陈万师", role: "Professor · Associate Dean (Research & Postgraduate)", institution: "CityU", region: "Hong Kong",
    area: "Computer Vision · Explainable AI · Crowd Analysis", tags: ["计算机视觉", "可解释 AI", "人群分析", "多模态"],
    stage: "senior", x: 600, y: 120, portraitFile: "antoni-chan.jpg", portraitSource: sources.antoniHome,
    summary: "CityU 视觉与可解释 AI 资深 PI，兼任计算学院研究与研究生副院长；博士师承 Nuno Vasconcelos，研究覆盖人群分析、视觉语言和声音理解。",
    facts: [
      fact("当前任职", "CityU 计算机系教授、计算学院 Associate Dean (Research and Postgraduate)，并任 MERC 副主任。", sources.antoniHome),
      fact("教育与学术训练", "Cornell University 电气工程 BSc、MEng；2008 年获 UC San Diego 电气工程博士，随后在 UCSD 从事博士后研究。", sources.antoniHome),
      fact("博士师承", "UC San Diego 博士论文明确列 Nuno Vasconcelos 为 Chair。", sources.antoniThesis),
      fact("研究主线", "计算机视觉、机器学习、可解释 AI、人群分析、视觉语言、计算机听觉与音乐信息检索。", sources.antoniHome),
      fact("产业连接", "个人履历记录其 2005 年在 Google New York 从事暑期研究实习。", sources.antoniHome),
    ],
    sources: [sources.antoniHome, sources.antoniManagement, sources.antoniThesis],
  }),
  person({
    id: "angela-yao-nus-p0-2026", name: "Angela Yao", chinese: "姚颖洁", role: "Dean's Chair Associate Professor · Assistant Dean, Research", institution: "NUS", region: "Singapore",
    area: "Human-Centric Vision · Video Understanding · Embodied AI", tags: ["人体视觉", "视频理解", "具身 AI", "3D 人体建模"],
    stage: "senior", x: 760, y: 120, portraitFile: "angela-yao.jpg", portraitSource: sources.angelaOfficial,
    knownAlumniCount: 20,
    summary: "NUS 人体中心视觉与视频理解带头人，研究从动作语义延伸到 3D 身体和手部建模；公开组员页系统列出学生流向 Huawei、Alibaba、Amazon 与 Meta。",
    facts: [
      fact("当前任职", "NUS Computing Dean's Chair Associate Professor，并任 Assistant Dean, Research。", sources.angelaOfficial),
      fact("教育与学术训练", "University of Toronto Engineering Science 学士；ETH Zurich 硕士、博士。", sources.angelaOfficial),
      fact("研究主线", "人体中心视觉、视频动作理解、真实和具身环境中的情境 AI，以及 3D 身体与手部姿态/形状估计。", sources.angelaHome),
      fact("创业与产业连接", "曾共同创办智能停车公司 Parquery，并于 2025 年在 Meta Reality Labs Zurich 休假访学。", sources.angelaHome),
      fact("人才培养", "第一方组员页逐人列出博士和博士后校友进入 USTC、Huawei、Alibaba、Amazon、Meta 等机构。", sources.angelaHome),
    ],
    sources: [sources.angelaOfficial, sources.angelaHome, sources.angelaPublications],
  }),
  person({
    id: "stefano-albrecht-ntu-p0-2026", name: "Stefano V. Albrecht", role: "Associate Professor · AARG Head", institution: "NTU", region: "Singapore",
    area: "Reinforcement Learning · Multi-Agent Systems · Autonomous Agents", tags: ["强化学习", "多智能体", "自主智能体", "LLM Agents"],
    stage: "senior", x: 920, y: 120, portraitFile: "stefano-albrecht.jpg", portraitSource: sources.stefanoOfficial,
    summary: "NTU Autonomous Agents Research Group 负责人，研究强化学习、多智能体交互和自主系统；博士后阶段与 Peter Stone 工作，产业项目覆盖自动驾驶、仓储机器人和人机流程。",
    facts: [
      fact("当前任职", "NTU College of Computing and Data Science Associate Professor，并领导 Autonomous Agents Research Group。", sources.stefanoOfficial),
      fact("教育与学术训练", "TU Darmstadt 计算机学士；University of Edinburgh 人工智能硕士、博士；2016—2017 年在 UT Austin 与 Peter Stone 从事博士后研究。", sources.stefanoBio),
      fact("任职轨迹", "2017—2025 年在 University of Edinburgh 历任 Lecturer 与 Reader，随后加入 NTU。", sources.stefanoBio),
      fact("研究主线", "强化学习、多智能体交互、自主智能体、机器人决策和 LLM agent 协同。", sources.stefanoPeople),
      fact("产业连接", "第一方简介记录其与 FiveAI/Bosch、Dematic、DeepFlow 合作开发自动驾驶、多机器人仓储与人机工作流应用。", sources.stefanoBio),
    ],
    sources: [sources.stefanoOfficial, sources.stefanoBio, sources.stefanoPeople],
  }),
];

export const candidatePriorityP0AsiaBatch3Relationships2026: Relationship[] = [
  {
    id: "candidate-p0-asia-b3-deng-cai-xiaofei-he",
    from: "deng-cai-zju", to: "xiaofei-he-zju-p0-2026", type: "collaboration", subtype: "sustained_collaboration", label: "机器学习学生共同培养",
    evidence: "浙江大学官方报道明确将博士生胡尧列为蔡登、何晓飞共同指导，并说明其研究覆盖机器学习、计算机视觉与数据挖掘。",
    source: sources.xiaofeiStudent, verified: true, evidenceObject: "Hu Yao · ZJU doctoral student", recentYear: 2013,
  },
  {
    id: "candidate-p0-asia-b3-bei-yu-farzan-farnia",
    from: "bei-yu-cuhk-p0-2026", to: "farzan-farnia-cuhk-p0-2026", type: "collaboration", subtype: "publication", label: "生成式芯片版图合作",
    evidence: "CUHK 托管的 DAC 2024 ChatPattern 论文由 Farzan Farnia 与 Bei Yu 共同署名。",
    source: sources.farzanBeiPaper, verified: true, evidenceObject: "ChatPattern · DAC 2024", recentYear: 2024,
  },
  {
    id: "candidate-p0-asia-b3-nuno-antoni-chan",
    from: "nuno-vasconcelos-ucsd", to: "antoni-chan-cityu-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师",
    evidence: "Antoni Bert Chan 的 2008 年 UC San Diego 博士论文封面明确列 Professor Nuno Vasconcelos 为 Chair。",
    source: sources.antoniThesis, verified: true, evidenceObject: "UC San Diego Electrical Engineering PhD", endYear: 2008,
  },
  {
    id: "candidate-p0-asia-b3-chua-angela-yao",
    from: "tat-seng-chua", to: "angela-yao-nus-p0-2026", type: "collaboration", subtype: "sustained_collaboration", label: "视频理解持续合作",
    evidence: "Angela Yao 的第一方发表列表记录其与 Tat-Seng Chua 在视频问答、视频图模型和多模态理解方向的多篇持续共同署名论文。",
    source: sources.angelaPublications, verified: true, evidenceObject: "VideoQA and video-understanding publications", recentYear: 2026,
  },
  {
    id: "candidate-p0-asia-b3-stone-albrecht",
    from: "peter-stone-us", to: "stefano-albrecht-ntu-p0-2026", type: "talent", subtype: "postdoc_mentor", label: "博士后指导",
    evidence: "Stefano V. Albrecht 的第一方简介明确写明其 2016—2017 年在 UT Austin 任博士后并与 Peter Stone 工作。",
    source: sources.stefanoBio, verified: true, evidenceObject: "UT Austin postdoctoral fellowship", startYear: 2016, endYear: 2017,
  },
];

export const candidatePriorityP0AsiaBatch3GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-asia-b3-shanghang-david-hong", teacherId: "shanghang-zhang-pku-p0-2026", name: "David Hong", role: "Master's student", focus: "Embodied AI · robotics", source: sources.shanghangDavid },
  { id: "candidate-p0-asia-b3-farzan-shizhan-gong", teacherId: "farzan-farnia-cuhk-p0-2026", name: "Shizhan Gong", role: "PhD student · co-advised with Qi Dou", focus: "Medical AI · learning", source: sources.farzanStudent },
  { id: "candidate-p0-asia-b3-angela-xinyao-liao", teacherId: "angela-yao-nus-p0-2026", name: "Xinyao Liao", role: "PhD student", focus: "Human-centric computer vision", source: sources.angelaHome },
  { id: "candidate-p0-asia-b3-angela-fanyue-wei", teacherId: "angela-yao-nus-p0-2026", name: "Fanyue Wei", role: "PhD student", focus: "Video understanding", source: sources.angelaHome },
  { id: "candidate-p0-asia-b3-stefano-eason-yu", teacherId: "stefano-albrecht-ntu-p0-2026", name: "Eason Yu", role: "PhD student", focus: "Auto-curriculum learning via self-play", source: sources.stefanoPeople },
  { id: "candidate-p0-asia-b3-stefano-ziyuan-liu", teacherId: "stefano-albrecht-ntu-p0-2026", name: "Ziyuan Liu", role: "PhD student", focus: "Inter-agent alignment in ad hoc multi-agent workflows", source: sources.stefanoPeople },
];

const placement = (
  id: string,
  student: string,
  teacherId: string,
  company: string,
  role: string,
  sourceValue: Source,
  degree: StudentPlacement["degree"] = "PhD",
  sector: StudentPlacement["sector"] = "industry",
): StudentPlacement => ({
  id,
  student,
  teacherId,
  company,
  role,
  kind: "current",
  degree,
  sector,
  source: sourceValue,
  verifiedAt: checkedAt,
});

export const candidatePriorityP0AsiaBatch3Placements2026: StudentPlacement[] = [
  placement("candidate-p0-asia-b3-shanghang-zeng-chengqing", "曾承清", "shanghang-zhang-pku-p0-2026", "美团", "2025 届硕士毕业去向", sources.shanghangZeng, "Master"),
  placement("candidate-p0-asia-b3-angela-shihao-zhang", "Shihao Zhang", "angela-yao-nus-p0-2026", "Huawei Singapore", "2025 届博士毕业去向", sources.angelaHome),
  placement("candidate-p0-asia-b3-angela-bo-ji", "Bo Ji", "angela-yao-nus-p0-2026", "Alibaba", "2025 届博士毕业去向", sources.angelaHome),
  placement("candidate-p0-asia-b3-angela-dipika-singhania", "Dipika Singhania", "angela-yao-nus-p0-2026", "Amazon India", "2025 届博士毕业去向", sources.angelaHome),
  placement("candidate-p0-asia-b3-angela-fadime-sener", "Fadime Sener", "angela-yao-nus-p0-2026", "Meta Reality Labs", "2021 届博士毕业去向", sources.angelaHome),
  placement("candidate-p0-asia-b3-angela-yicong-li", "Yicong Li", "angela-yao-nus-p0-2026", "University of Science and Technology of China", "Faculty", sources.angelaHome, "Postdoc", "academia"),
];

export type CandidatePriorityP0AsiaBatch3RosterPromotion2026 = {
  unitUrl: string;
  rosterName: string;
  atlasPersonId: string;
};

export const candidatePriorityP0AsiaBatch3RosterPromotions2026: CandidatePriorityP0AsiaBatch3RosterPromotion2026[] = [
  { unitUrl: "http://www.cs.zju.edu.cn/csen/27003/list.htm", rosterName: "何晓飞", atlasPersonId: "xiaofei-he-zju-p0-2026" },
  { unitUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm", rosterName: "仉尚航", atlasPersonId: "shanghang-zhang-pku-p0-2026" },
  { unitUrl: "https://www.cse.cuhk.edu.hk/people/faculty/", rosterName: "Farzan Farnia", atlasPersonId: "farzan-farnia-cuhk-p0-2026" },
  { unitUrl: "https://www.cs.cityu.edu.hk/people/academic-staff", rosterName: "Prof CHAN, Antoni Bert 陳萬師", atlasPersonId: "antoni-chan-cityu-p0-2026" },
  { unitUrl: "https://www.comp.nus.edu.sg/about/faculty/", rosterName: "Angela YAO", atlasPersonId: "angela-yao-nus-p0-2026" },
  { unitUrl: "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", rosterName: "Assoc Prof Stefano V. Albrecht", atlasPersonId: "stefano-albrecht-ntu-p0-2026" },
];

export const People = candidatePriorityP0AsiaBatch3People2026;
export const Relationships = candidatePriorityP0AsiaBatch3Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch3Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch3GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch3RosterPromotions2026;

export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
