import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, factSource: Source) => ({ label, value, source: factSource });

const s = {
  berger: source("MIT CSAIL · Bonnie Berger", "https://www.csail.mit.edu/person/bonnie-berger", "official", "Current MIT professorship, CSAIL PI status and computational biology research"),
  bergerCv: source("Bonnie Berger · MIT Mathematics CV", "https://math.mit.edu/documents/uploads/cv/2024_08_22_CV_bab.pdf", "cv", "MIT-hosted education, appointments, trainees and alumni destinations"),
  bergerPortrait: source("MIT CSAIL portrait · Bonnie Berger", "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/migration/berger.jpg", "official", "Official faculty portrait"),
  kellis: source("MIT CSAIL · Manolis Kellis", "https://www.csail.mit.edu/person/manolis-kellis", "official", "Current MIT professorship and computational genomics research"),
  kellisBio: source("Manolis Kellis · MIT-hosted biosketch", "https://web.mit.edu/manoli/www/manoli.html", "profile", "MIT group leadership, research programme and teaching"),
  kellisRecord: source("Manolis Kellis · MIT Faculty Personnel Record", "https://web.mit.edu/manoli/www/resume.pdf", "cv", "MIT degrees, Cold Spring Harbor and Broad training"),
  kellisResearch: source("Manolis Kellis · MIT-hosted research profile", "https://web.mit.edu/manoli/www/research.html", "profile", "PhD advisers Bonnie Berger and Eric Lander and master's adviser Patrick Winston"),
  kellisPeople: source("MIT Computational Biology Group · people", "https://compbio.mit.edu/people.html", "official", "Lab head and named current staff, students and postdocs"),
  kellisPortrait: source("MIT CSAIL portrait · Manolis Kellis", "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/migration/kellis.jpg", "official", "Official faculty portrait"),
  leonard: source("MIT CSAIL · John Leonard", "https://www.csail.mit.edu/person/john-leonard", "official", "Current MIT professorship, degrees and Marine Robotics Group"),
  leonardCv: source("John J. Leonard · MIT MechE CV", "https://meche.mit.edu/sites/default/files/cv/leonard_cv_october_2023.pdf", "cv", "MIT-hosted appointments, research leadership and student collaboration"),
  leonardGroup: source("MIT Marine Robotics Group", "https://marinerobotics.mit.edu/", "official", "John Leonard leadership and current group research"),
  leonardStudents: source("MIT CSAIL Alliances · student poster presentations", "https://cap.csail.mit.edu/annual-meeting-2023-student-poster-presentations", "official", "Jiahui Fu and Qiangqiang Huang identified as John Leonard doctoral students"),
  leonardTalk: source("MIT CSAIL Alliances · John Leonard transcript", "https://cap.csail.mit.edu/john-leonard-byte-bites-transcript", "official", "Named former students and their Boston Dynamics, Google X and Tesla destinations"),
  leonardPortrait: source("MIT CSAIL portrait · John Leonard", "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/people/card/jleonard_headshot3_nov2014.jpg", "official", "Official faculty portrait"),
  roy: source("MIT AeroAstro · Nicholas Roy", "https://aeroastro.mit.edu/people/nicholas-roy/", "official", "Current endowed professorship, degrees, Robust Robotics Group and Google X role"),
  royCsail: source("MIT CSAIL · Nicholas Roy", "https://www.csail.mit.edu/person/nicholas-roy", "official", "Current CSAIL PI status and AI/robotics research"),
  royPeople: source("MIT Robust Robotics Group · people", "https://www.mit.edu/~nickroy/people.html", "profile", "Named current students and alumni"),
  royPortrait: source("MIT CSAIL portrait · Nicholas Roy", "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/people/card/Square%20version%20of%2023917.png", "official", "Official faculty portrait"),
  khatib: source("Stanford Computer Science · Oussama Khatib", "https://www.cs.stanford.edu/people/oussama-khatib", "official", "Current Stanford professorship and robotics leadership"),
  khatibProfile: source("Stanford Profiles · Oussama Khatib", "https://profiles.stanford.edu/oussama-khatib", "official", "Sup-Aero doctorate and named current doctoral advisees"),
  khatibLab: source("Stanford Robotics Lab · Oussama Khatib", "https://khatib.stanford.edu/", "profile", "Lab directorship and human-centered robotics programme"),
  khatibPortrait: source("Stanford AI Lab portrait · Oussama Khatib", "https://ai.stanford.edu/wp-content/uploads/2020/09/oussama-khatib.png", "official", "Official SAIL faculty portrait"),
  linderman: source("Stanford Faculty Development · Scott Linderman", "https://facultydevelopment.stanford.edu/people/scott-linderman", "official", "Current appointment, Harvard advisers, Columbia postdoctoral mentors and Microsoft employment"),
  lindermanLab: source("Linderman Lab · Stanford", "https://web.stanford.edu/~swl1/", "profile", "Research programme and current lab members"),
  lindermanPortrait: source("Stanford AI Lab portrait · Scott Linderman", "https://ai.stanford.edu/wp-content/uploads/2020/09/scott-linderman.png", "official", "Official SAIL faculty portrait"),
  kochenderfer: source("Stanford Computer Science · Mykel Kochenderfer", "https://www.cs.stanford.edu/people/mykel-kochenderfer", "official", "Current appointment, education, SISL directorship and MIT Lincoln Laboratory experience"),
  kochenderferProfile: source("Stanford Profiles · Mykel Kochenderfer", "https://profiles.stanford.edu/mykel-kochenderfer", "official", "Professional education and named doctoral/postdoctoral advisees"),
  kochenderferStudents: source("Stanford Safe Aviation Autonomy · outreach", "https://safeaviationautonomy.stanford.edu/outreach-2023", "official", "Named PhD students advised by Mykel Kochenderfer"),
  kochenderferPortrait: source("Stanford AI Lab portrait · Mykel Kochenderfer", "https://ai.stanford.edu/wp-content/uploads/2020/09/mykel-kochenderfer-2022_sm.jpg", "official", "Official SAIL faculty portrait"),
  minje: source("Illinois Siebel School · Minje Kim", "https://siebelschool.illinois.edu/about/people/all-faculty/minje", "official", "Current associate professorship and AI-for-audio research"),
  minjeDirectory: source("Illinois Grainger Engineering · Minje Kim", "https://grainger.illinois.edu/about/directory/faculty/minje", "official", "Education, prior ETRI/Indiana positions and Amazon Scholar appointment"),
  minjeCv: source("Minje Kim · Illinois-hosted CV", "https://minje.cs.illinois.edu/wp-content/uploads/cv_minjekim.pdf", "cv", "UIUC doctorate and Paris Smaragdis adviser evidence"),
  smaragdisCv: source("Paris Smaragdis · Illinois-hosted CV", "https://paris.cs.illinois.edu/smaragdis-cv-v.pdf", "cv", "Minje Kim listed as 2016 Computer Science PhD student and current UIUC associate professor"),
  minjePortrait: source("Illinois Engineering portrait · Minje Kim", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=46370&s=1200&type=portrait", "official", "Official Illinois directory portrait"),
  peng: source("Illinois Siebel School · Hao Peng", "https://siebelschool.illinois.edu/about/people/all-faculty/haopeng", "official", "Current assistant professorship and NLP/LLM research"),
  pengSeminar: source("Illinois CS Special Seminar · Hao Peng", "https://mediaspace.illinois.edu/media/t/1_5ladjjd8/180208991", "official", "University of Washington PhD and Noah A. Smith adviser evidence"),
  pengStudent: source("Illinois Machine Learning Seminar · Lifan Yuan", "https://calendars.illinois.edu/detail/7684?eventId=33548236", "official", "Lifan Yuan identified as Hao Peng's UIUC PhD student and former Gemini student researcher"),
  pengPortrait: source("Illinois Engineering portrait · Hao Peng", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=130553&s=1200&type=portrait", "official", "Official Illinois directory portrait"),
  lourentzou: source("Illinois iSchool · Ismini Lourentzou", "https://ischool.illinois.edu/people/ismini-lourentzou", "official", "Current appointment, PLAN Lab leadership, doctorate and multimodal AI research"),
  lourentzouThesis: source("Illinois IDEALS dissertation · Ismini Lourentzou", "https://www.ideals.illinois.edu/items/113917", "publication", "UIUC doctorate and ChengXiang Zhai adviser evidence"),
  zhaiPeople: source("TIMAN Group · ChengXiang Zhai students", "https://timan.cs.illinois.edu/ir/people.html", "profile", "Ismini Lourentzou PhD year and IBM Research to Virginia Tech to UIUC trajectory"),
  lourentzouPortrait: source("Illinois Engineering portrait · Ismini Lourentzou", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=147388&s=1200&type=portrait", "official", "Official Illinois directory portrait"),
} satisfies Record<string, Source>;

type Seed = Pick<Person, "id" | "name" | "role" | "institution" | "area" | "tags" | "summary" | "facts" | "sources" | "stage"> & { portraitFile: string; portraitSource: Source; x: number };
const person = (p: Seed): Person => ({
  ...p, region: "United States", category: "core", status: "current independent PI · official faculty profile verified",
  primary: true, x: p.x, y: 120, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
  portrait: { src: `portraits/candidate-p0-us-canada-ready-batch-5-2026/${p.portraitFile}`, alt: `${p.name} 官方头像`, source: p.portraitSource },
});

export const candidatePriorityP0UsCanadaReadyBatch5People2026: Person[] = [
  person({ id: "bonnie-berger-mit-p0-b5", name: "Bonnie Berger", role: "Simons Professor of Mathematics · CSAIL PI", institution: "MIT", stage: "senior", x: 120,
    area: "Computational Biology · Algorithms · Machine Learning for Genomics", tags: ["计算生物学", "算法", "基因组学", "机器学习"],
    summary: "以算法和机器学习连接基因组学与生物医学的 MIT 资深学者；公开 CV 提供完整训练背景和跨高校、科研机构的学生体系。",
    facts: [fact("当前任职", "MIT Simons Professor of Mathematics，并任 CSAIL PI。", s.berger), fact("教育与学术训练", "Brandeis 计算机科学学士；MIT 计算机科学 S.M. 与 1990 年 Ph.D.；随后在 MIT 从事应用数学博士后。", s.bergerCv), fact("研究主线", "计算生物学、算法与机器学习，重点处理基因组和生物医学数据。", s.berger), fact("学生体系", "MIT-hosted CV 逐名记录博士生、博士后及学术与产业去向，覆盖 Stanford、Yale、Duke、Fred Hutch 和研究型企业。", s.bergerCv)],
    sources: [s.berger, s.bergerCv], portraitFile: "bonnie-berger.jpg", portraitSource: s.bergerPortrait }),
  person({ id: "manolis-kellis-mit-p0-b5", name: "Manolis Kellis", role: "Professor of Computer Science · Head, Computational Biology Group", institution: "MIT", stage: "senior", x: 300,
    area: "Computational Genomics · Machine Learning · Disease Biology", tags: ["计算基因组学", "机器学习", "疾病生物学", "Broad Institute"],
    summary: "把机器学习、调控基因组学和疾病机制结合起来的 MIT Computational Biology Group 负责人，并与 Broad Institute 保持长期交叉。",
    facts: [fact("当前任职", "MIT 计算机科学教授、CSAIL PI，并领导 MIT Computational Biology Group。", s.kellis), fact("教育与学术训练", "MIT B.S./M.Eng.（1999）与 Ph.D.（2003）；随后在 Cold Spring Harbor Laboratory 接受遗传学训练并在 Broad Institute 从事博士后研究。", s.kellisRecord), fact("博士师承", "MIT 本人研究页明确写明博士论文由 Eric Lander 与 Bonnie Berger 共同指导。", s.kellisResearch), fact("研究主线", "使用算法、统计推断和机器学习理解基因调控、基因组演化与复杂疾病。", s.kellisBio), fact("公开团队", "MIT Computational Biology Group 的 People 页面列出当前学生、博士后、研究人员和职员。", s.kellisPeople)],
    sources: [s.kellis, s.kellisRecord, s.kellisResearch, s.kellisPeople], portraitFile: "manolis-kellis.jpg", portraitSource: s.kellisPortrait }),
  person({ id: "john-leonard-mit-p0-b5", name: "John Leonard", role: "Samuel C. Collins Professor · Director, Marine Robotics Group", institution: "MIT", stage: "senior", x: 480,
    area: "Robot Navigation · SLAM · Autonomous Vehicles", tags: ["机器人", "SLAM", "自主系统", "导航"],
    summary: "以机器人定位、建图和长期自主导航为主线的 MIT Marine Robotics Group 负责人，研究横跨水下、地面机器人和自动驾驶。",
    facts: [fact("当前任职", "MIT Samuel C. Collins Professor of Mechanical and Ocean Engineering，并任 CSAIL 成员。", s.leonard), fact("教育与学术训练", "University of Pennsylvania 电气工程 B.S.E.E.（1987）；University of Oxford 工程科学 D.Phil.（1994）。", s.leonard), fact("研究主线", "自主机器人导航、定位与建图，覆盖水下与地面环境及自动驾驶。", s.leonardGroup), fact("学术领导力", "MIT-hosted CV 记录其曾任机械工程系科研副系主任，后任教育副系主任。", s.leonardCv), fact("团队网络", "Marine Robotics Group 官方首页明确由 John Leonard 领导，并持续发布学生团队项目。", s.leonardGroup)],
    sources: [s.leonard, s.leonardCv, s.leonardGroup, s.leonardStudents, s.leonardTalk], portraitFile: "john-leonard.jpg", portraitSource: s.leonardPortrait }),
  person({ id: "nicholas-roy-mit-p0-b5", name: "Nicholas Roy", role: "Jerome C. Hunsaker Professor · Director, Robust Robotics Group", institution: "MIT", stage: "senior", x: 660,
    area: "Robotics · Autonomous Systems · Planning under Uncertainty", tags: ["机器人", "自主系统", "规划", "机器学习"],
    summary: "研究不确定环境中感知与决策的 MIT Robust Robotics Group 负责人，并把学术研究延伸到 Google X 的 Project Wing。",
    facts: [fact("当前任职", "MIT Jerome C. Hunsaker Professor、Robust Robotics Group 主任和 CSAIL PI。", s.roy), fact("教育与学术训练", "McGill University B.Sc.（1995）与 M.Sc.（1997）；Carnegie Mellon University Ph.D.（2003）。", s.roy), fact("研究主线", "机器人、机器学习、自主系统、规划推理、人机交互与微型飞行器。", s.royCsail), fact("产业连接", "MIT AeroAstro 官方简介记录其为 Google X Project Wing 创始人。", s.roy), fact("公开团队", "Robust Robotics Group 人员页列出 current students 与 alumni。", s.royPeople)],
    sources: [s.roy, s.royCsail, s.royPeople], portraitFile: "nicholas-roy.png", portraitSource: s.royPortrait }),
  person({ id: "oussama-khatib-stanford-p0-b5", name: "Oussama Khatib", role: "Weichai Professor · Director, Stanford Robotics Lab", institution: "Stanford", stage: "senior", x: 840,
    area: "Robotics · Human-Robot Interaction · Control", tags: ["机器人", "人机交互", "控制", "具身智能"],
    summary: "Stanford 人本机器人学与操作控制的核心带头人；官方 Profiles 直接列出当前博士生和博士后指导网络。",
    facts: [fact("当前任职", "Stanford Computer Science Weichai Professor，并任 Stanford Robotics Lab 主任。", s.khatib), fact("教育与学术训练", "1980 年获法国 Sup-Aero 博士。", s.khatibProfile), fact("研究主线", "机器人控制、感知、人机安全协作、触觉与遥操作，以及水下和极端环境机器人。", s.khatibLab), fact("学生体系", "Stanford Profiles 列出 William Chong、Chinmay Devmalya、Wesley Guo、Boyeon Kim 与 Adrian Piedra 为其博士论文学生。", s.khatibProfile)],
    sources: [s.khatib, s.khatibProfile, s.khatibLab], portraitFile: "oussama-khatib.png", portraitSource: s.khatibPortrait }),
  person({ id: "scott-linderman-stanford-p0-b5", name: "Scott Linderman", role: "Assistant Professor of Statistics", institution: "Stanford", stage: "developing", x: 1020,
    area: "Machine Learning · Computational Neuroscience · Bayesian Statistics", tags: ["机器学习", "计算神经科学", "贝叶斯统计", "时序模型"],
    summary: "在机器学习、贝叶斯统计和大规模神经数据之间建立方法桥梁的 Stanford PI，学术训练链条及 Microsoft 产业经历均有官方证据。",
    facts: [fact("当前任职", "Stanford 统计学助理教授，并兼任计算机科学与电子工程教授。", s.linderman), fact("教育与学术训练", "Cornell ECE B.S.；Harvard 计算机科学 S.M./Ph.D.，博士由 Ryan Adams 与 Leslie Valiant 指导；随后在 Columbia 跟随 Liam Paninski 与 David Blei 从事博士后研究。", s.linderman), fact("研究主线", "面向大规模神经数据的机器学习、计算神经科学与统计方法。", s.lindermanLab), fact("产业经历", "读博前在 Microsoft 任软件工程师三年。", s.linderman), fact("公开团队", "本人 Stanford lab 页面列出当前学生和博士后成员。", s.lindermanLab)],
    sources: [s.linderman, s.lindermanLab], portraitFile: "scott-linderman.png", portraitSource: s.lindermanPortrait }),
  person({ id: "mykel-kochenderfer-stanford-p0-b5", name: "Mykel Kochenderfer", role: "Associate Professor · Director, Stanford Intelligent Systems Laboratory", institution: "Stanford", stage: "senior", x: 1200,
    area: "Decision Making under Uncertainty · AI Safety · Autonomous Systems", tags: ["不确定性决策", "AI 安全", "自主系统", "强化学习"],
    summary: "面向航空与其他高风险自主系统的决策、优化和安全研究者，公开档案连接 Stanford SISL、MIT Lincoln Laboratory 与学生网络。",
    facts: [fact("当前任职", "Stanford 航空航天副教授、计算机科学兼任副教授和 HAI Senior Fellow，并任 SISL 主任。", s.kochenderfer), fact("教育与学术训练", "Stanford 计算机科学 B.S./M.S.（2003）；University of Edinburgh Informatics Ph.D.（2006）。", s.kochenderferProfile), fact("研究主线", "不确定性决策、概率规划、优化与安全关键自主系统。", s.kochenderfer), fact("产业与应用经历", "加入 Stanford 前在 MIT Lincoln Laboratory 从事空域建模与防撞系统研究。", s.kochenderfer), fact("学生体系", "Stanford 官方页面明确列 Dylan Asmar 与 Sydney Katz 为其博士生；Profiles 另列博士论文与博士后指导记录。", s.kochenderferStudents)],
    sources: [s.kochenderfer, s.kochenderferProfile, s.kochenderferStudents], portraitFile: "mykel-kochenderfer.jpg", portraitSource: s.kochenderferPortrait }),
  person({ id: "minje-kim-uiuc-p0-b5", name: "Minje Kim", role: "Associate Professor · Amazon Scholar", institution: "UIUC", stage: "developing", x: 1380,
    area: "AI for Audio · Speech Enhancement · Model Compression", tags: ["音频 AI", "语音增强", "模型压缩", "个性化 AI"],
    summary: "研究高效、个性化音频 AI 的 UIUC 学者；官方资料把其 UIUC 博士师承、ETRI/Indiana 经历和 Amazon Scholar 角色连成完整轨迹。",
    facts: [fact("当前任职", "UIUC Siebel School 副教授，并任 Amazon Scholar。", s.minjeDirectory), fact("教育与学术训练", "Ajou University B.E.、POSTECH M.S.、UIUC Computer Science Ph.D.（2016）。", s.minjeDirectory), fact("博士师承", "Illinois-hosted CV 明确记录博士导师为 Paris Smaragdis；Smaragdis 的 CV 也将 Minje Kim 列为 2016 年博士生。", s.minjeCv), fact("研究主线", "音频机器学习、模型压缩、个性化 AI、源分离、语音增强和神经音频编码。", s.minje), fact("任职轨迹", "加入 UIUC 前曾在 ETRI 工作，并在 Indiana University 任教。", s.minjeDirectory)],
    sources: [s.minje, s.minjeDirectory, s.minjeCv, s.smaragdisCv], portraitFile: "minje-kim.jpg", portraitSource: s.minjePortrait }),
  person({ id: "hao-peng-uiuc-p0-b5", name: "Hao Peng", role: "Assistant Professor", institution: "UIUC", stage: "developing", x: 1560,
    area: "Natural Language Processing · Large Language Models · AI for Science", tags: ["NLP", "大语言模型", "高效学习", "AI for Science"],
    summary: "聚焦高效、可泛化 NLP 与大模型的 UIUC PI；官方讲座与学生页面同时给出 Noah A. Smith 师承和新一代学生的 Gemini 研究经历。",
    facts: [fact("当前任职", "UIUC Siebel School 计算机科学助理教授。", s.peng), fact("教育与学术训练", "Peking University 学士；University of Washington Computer Science & Engineering Ph.D.（2022）。", s.peng), fact("博士师承", "Illinois CS 官方讲座简介明确其在 UW 博士阶段由 Noah A. Smith 指导。", s.pengSeminar), fact("研究主线", "自然语言处理、计算语言学、机器学习、大语言模型和 AI for Science。", s.peng), fact("学生与产业连接", "Illinois 官方活动页将 Lifan Yuan 列为 Hao Peng 博士生，并记录其曾在 Google DeepMind Gemini 团队任 student researcher。", s.pengStudent)],
    sources: [s.peng, s.pengSeminar, s.pengStudent], portraitFile: "hao-peng.jpg", portraitSource: s.pengPortrait }),
  person({ id: "ismini-lourentzou-uiuc-p0-b5", name: "Ismini Lourentzou", role: "Assistant Professor · Director, PLAN Lab", institution: "UIUC", stage: "developing", x: 1740,
    area: "Multimodal Machine Learning · Vision-Language Models · Embodied AI", tags: ["多模态", "视觉语言模型", "具身 AI", "健康 AI"],
    summary: "领导 UIUC PLAN Lab、研究多模态和具身智能的交叉型 PI；博士论文库与导师学生页共同验证其 ChengXiang Zhai 师承和 IBM Research—Virginia Tech—UIUC 轨迹。",
    facts: [fact("当前任职", "UIUC iSchool 助理教授、PLAN Lab 负责人，并交叉任职 Siebel School、ECE 与 NCSA。", s.lourentzou), fact("教育与学术训练", "University of Illinois Urbana-Champaign Computer Science Ph.D.（2019）。", s.lourentzou), fact("博士师承", "Illinois IDEALS 博士论文元数据明确列 ChengXiang Zhai 为导师及委员会主席。", s.lourentzouThesis), fact("研究主线", "弱监督/有限监督学习、多模态机器学习、视觉语言模型、具身 AI 和健康应用。", s.lourentzou), fact("任职与产业轨迹", "导师学生页记录其博士毕业后依次进入 IBM Research、Virginia Tech，再回到 UIUC。", s.zhaiPeople)],
    sources: [s.lourentzou, s.lourentzouThesis, s.zhaiPeople], portraitFile: "ismini-lourentzou.jpg", portraitSource: s.lourentzouPortrait }),
];

export const candidatePriorityP0UsCanadaReadyBatch5SupportingPeople2026: Person[] = [
  { id: "paris-smaragdis-uiuc-lineage-p0-b5", name: "Paris Smaragdis", role: "Professor", institution: "UIUC", region: "United States", area: "Machine Learning for Audio · Signal Processing", tags: ["博士导师", "音频 AI", "信号处理"], summary: "Minje Kim 在 UIUC 的博士导师。", stage: "senior", category: "historical", status: "supporting mentor node · relationship evidence only", sources: [s.minjeCv, s.smaragdisCv], x: 1380, y: 20, primary: false, lastVerifiedAt: checkedAt },
];

export const candidatePriorityP0UsCanadaReadyBatch5Relationships2026: Relationship[] = [
  { id: "candidate-p0-usca-b5-berger-kellis", from: "bonnie-berger-mit-p0-b5", to: "manolis-kellis-mit-p0-b5", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "Manolis Kellis 的 MIT-hosted research profile 明确写明其博士论文由 Eric Lander 与 Bonnie Berger 共同指导。", source: s.kellisResearch, verified: true },
  { id: "candidate-p0-usca-b5-ryan-linderman", from: "ryan-adams-us", to: "scott-linderman-stanford-p0-b5", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "Stanford 官方简介明确 Scott Linderman 的 Harvard 博士由 Ryan Adams 与 Leslie Valiant 指导。", source: s.linderman, verified: true },
  { id: "candidate-p0-usca-b5-paris-minje", from: "paris-smaragdis-uiuc-lineage-p0-b5", to: "minje-kim-uiuc-p0-b5", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Minje Kim 与 Paris Smaragdis 的 Illinois-hosted CV 双向确认 2016 年 UIUC Computer Science 博士师承。", source: s.minjeCv, verified: true },
  { id: "candidate-p0-usca-b5-smith-peng", from: "noah-smith-us", to: "hao-peng-uiuc-p0-b5", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Illinois CS 官方讲座简介明确 Hao Peng 的 University of Washington 博士由 Noah A. Smith 指导。", source: s.pengSeminar, verified: true },
  { id: "candidate-p0-usca-b5-zhai-lourentzou", from: "chengxiang-zhai-lineage", to: "ismini-lourentzou-uiuc-p0-b5", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Illinois IDEALS 博士论文元数据明确 ChengXiang Zhai 是 Ismini Lourentzou 的导师。", source: s.lourentzouThesis, verified: true },
];

export const candidatePriorityP0UsCanadaReadyBatch5Placements2026: StudentPlacement[] = [
  { id: "candidate-p0-usca-b5-berger-brian-hie", student: "Brian Hie", teacherId: "bonnie-berger-mit-p0-b5", company: "Stanford University", role: "Assistant Professor", kind: "reported", degree: "PhD", sector: "academia", note: "Bonnie Berger 的 MIT-hosted CV 将 Brian Hie 列为博士校友及 Stanford faculty。", source: s.bergerCv, verifiedAt: checkedAt },
  { id: "candidate-p0-usca-b5-leonard-kevin-doherty", student: "Kevin Doherty", teacherId: "john-leonard-mit-p0-b5", company: "Boston Dynamics", role: "Robotics Researcher", kind: "current", degree: "PhD", sector: "industry", note: "MIT CSAIL Alliances 的 John Leonard 访谈逐名说明 Kevin Doherty 已进入 Boston Dynamics，从事 Atlas 机器人的空间感知与导航。", source: s.leonardTalk, verifiedAt: checkedAt },
];

export const candidatePriorityP0UsCanadaReadyBatch5GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-usca-b5-kellis-alexander", teacherId: "manolis-kellis-mit-p0-b5", name: "Alexander Lenail", role: "PhD student", focus: "Computational systems biology", source: s.kellisPeople },
  { id: "candidate-p0-usca-b5-leonard-jiahui", teacherId: "john-leonard-mit-p0-b5", name: "Jiahui Fu", role: "PhD student", focus: "Long-term object-based SLAM", source: s.leonardStudents },
  { id: "candidate-p0-usca-b5-roy-emma", teacherId: "nicholas-roy-mit-p0-b5", name: "Emma Brunskill", role: "Former group student", source: s.royPeople },
  { id: "candidate-p0-usca-b5-khatib-wesley", teacherId: "oussama-khatib-stanford-p0-b5", name: "Wesley Guo", role: "Doctoral advisee", source: s.khatibProfile },
  { id: "candidate-p0-usca-b5-linderman-lab", teacherId: "scott-linderman-stanford-p0-b5", name: "Linderman Lab members", role: "Graduate students and postdocs", source: s.lindermanLab },
  { id: "candidate-p0-usca-b5-kochenderfer-dylan", teacherId: "mykel-kochenderfer-stanford-p0-b5", name: "Dylan Asmar", role: "PhD student", source: s.kochenderferStudents },
  { id: "candidate-p0-usca-b5-peng-lifan", teacherId: "hao-peng-uiuc-p0-b5", name: "Lifan Yuan", role: "PhD student", focus: "LLM reinforcement learning · self-evolving AI", source: s.pengStudent },
  { id: "candidate-p0-usca-b5-lourentzou-plan", teacherId: "ismini-lourentzou-uiuc-p0-b5", name: "PLAN Lab members", role: "Graduate researchers", focus: "Multimodal learning · embodied AI", source: s.lourentzou },
];

export type CandidatePriorityP0UsCanadaReadyBatch5RosterPromotion = { unitUrl: string; rosterName: string; atlasPersonId: string };
export const candidatePriorityP0UsCanadaReadyBatch5RosterPromotions2026: CandidatePriorityP0UsCanadaReadyBatch5RosterPromotion[] = [
  ...["Bonnie Berger", "Manolis Kellis", "John Leonard", "Nicholas Roy"].map((rosterName, i) => ({ unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName, atlasPersonId: ["bonnie-berger-mit-p0-b5", "manolis-kellis-mit-p0-b5", "john-leonard-mit-p0-b5", "nicholas-roy-mit-p0-b5"][i] })),
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Oussama Khatib", atlasPersonId: "oussama-khatib-stanford-p0-b5" },
  { unitUrl: "https://ai.stanford.edu/faculty/", rosterName: "Scott Linderman", atlasPersonId: "scott-linderman-stanford-p0-b5" },
  { unitUrl: "https://ai.stanford.edu/faculty/", rosterName: "Mykel Kochenderfer", atlasPersonId: "mykel-kochenderfer-stanford-p0-b5" },
  ...["Minje Kim", "Hao Peng", "Ismini Lourentzou"].map((rosterName, i) => ({ unitUrl: "https://siebelschool.illinois.edu/about/people/all-faculty", rosterName, atlasPersonId: ["minje-kim-uiuc-p0-b5", "hao-peng-uiuc-p0-b5", "ismini-lourentzou-uiuc-p0-b5"][i] })),
];

export const candidatePriorityP0UsCanadaReadyBatch5ExistingRosterPromotions2026: CandidatePriorityP0UsCanadaReadyBatch5RosterPromotion[] = [
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Carlos Ernesto Guestrin", atlasPersonId: "carlos-guestrin-lineage" },
  { unitUrl: "https://ai.stanford.edu/faculty/", rosterName: "Carlos Guestrin", atlasPersonId: "carlos-guestrin-lineage" },
  { unitUrl: "https://ai.stanford.edu/faculty/", rosterName: "Chris Re", atlasPersonId: "chris-re-stanford" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Daniel Yamins", atlasPersonId: "dan-yamins-stanford" },
  { unitUrl: "https://ai.stanford.edu/faculty/", rosterName: "Karen Liu", atlasPersonId: "karen-liu-stanford" },
  { unitUrl: "https://ee.stanford.edu/people/faculty", rosterName: "Kunle A. Olukotun", atlasPersonId: "kunle-olukotun-lineage" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Costis Daskalakis", atlasPersonId: "constantinos-daskalakis-award" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Dave Gifford", atlasPersonId: "david-gifford-lineage" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Joshua Tenenbaum", atlasPersonId: "joshua-tenenbaum-lineage" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Leslie Kaelbling", atlasPersonId: "leslie-kaelbling-award" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "William Freeman", atlasPersonId: "william-freeman-lineage" },
];

export const people = [...candidatePriorityP0UsCanadaReadyBatch5People2026, ...candidatePriorityP0UsCanadaReadyBatch5SupportingPeople2026];
export const relationships = candidatePriorityP0UsCanadaReadyBatch5Relationships2026;
export const placements = candidatePriorityP0UsCanadaReadyBatch5Placements2026;
export const groupMembers = candidatePriorityP0UsCanadaReadyBatch5GroupMembers2026;
export const rosterPromotions = candidatePriorityP0UsCanadaReadyBatch5RosterPromotions2026;
export const existingRosterPromotions = candidatePriorityP0UsCanadaReadyBatch5ExistingRosterPromotions2026;
