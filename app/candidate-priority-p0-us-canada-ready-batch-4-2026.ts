import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label, url, kind, supports, checkedAt,
});

const s = {
  rusOfficial: source("MIT CSAIL · Daniela Rus", "https://www.csail.mit.edu/person/daniela-rus", "official", "Current MIT CSAIL directorship, professorship, Cornell doctorate and robotics/AI research"),
  rusGroup: source("Daniela Rus · Distributed Robotics Lab members", "https://danielarus.csail.mit.edu/group-2/", "profile", "Current group and alumni with doctoral, postdoctoral, academic and industry destinations"),
  rusPortrait: source("MIT CSAIL portrait · Daniela Rus", "https://www.csail.mit.edu/sites/default/files/styles/headshot/public/images/migration/rus.jpg", "official", "Official faculty portrait"),
  shahOfficial: source("MIT CSAIL · Julie Shah", "https://www.csail.mit.edu/person/julie-shah", "official", "Current PI status, AI/ML and robotics research, and Interactive Robotics Group leadership"),
  shahAero: source("MIT AeroAstro · Julie Shah", "https://aeroastro.mit.edu/people/julie-shah/", "official", "Current chair, degrees, Boeing postdoctoral training, research programme and portrait"),
  shahStudent: source("Ankit Shah · MIT-hosted profile", "https://people.csail.mit.edu/ajshah/", "profile", "MIT doctorate under Julie Shah and subsequent Brown postdoctoral appointment"),
  shahPortrait: source("MIT AeroAstro portrait · Julie Shah", "https://aeroastro.mit.edu/wp-content/uploads/2024/05/0079_040623_AeroAstro_079-1-scaled-aspect-ratio-575-575-scaled-1152x1152-c-default.jpg", "official", "Official faculty portrait"),
  bernsteinOfficial: source("Stanford Computer Science · Michael Bernstein", "https://www.cs.stanford.edu/people/michael-bernstein", "official", "Current Computer Science professorship and HAI role"),
  bernsteinProfile: source("Stanford Profiles · Michael Bernstein", "https://profiles.stanford.edu/michael-bernstein", "official", "Current appointments, Stanford/MIT education and human-computer interaction biography"),
  bernsteinCv: source("Michael Bernstein · Stanford-hosted CV", "https://hci.stanford.edu/msb/files/msb-cv.pdf", "cv", "Education and named current/former PhD students, postdocs and destinations"),
  bernsteinPortrait: source("Stanford Computer Science portrait · Michael Bernstein", "https://www.cs.stanford.edu/sites/g/files/sbiybj28076/files/styles/square_1900/public/media/person/michael-bernstein1724859548085.jpg", "official", "Official faculty portrait"),
  foxOfficial: source("Stanford Computer Science · Emily Fox", "https://www.cs.stanford.edu/people/emily-fox", "official", "Current joint Statistics and Computer Science professorship"),
  foxProfile: source("Stanford Profiles · Emily Fox", "https://profiles.stanford.edu/248640", "official", "MIT degree history, current appointments and official doctoral advisees"),
  foxGroup: source("Stanford Machine Learning Group · students", "https://statsml.stanford.edu/students.html", "official", "Named doctoral students and advisers, including Emily Fox"),
  foxPortrait: source("Stanford Computer Science portrait · Emily Fox", "https://www.cs.stanford.edu/sites/g/files/sbiybj28076/files/styles/square_1900/public/media/person/2486401646854997992.jpg", "official", "Official faculty portrait"),
  banerjeeOfficial: source("Illinois Siebel School · Arindam Banerjee", "https://siebelschool.illinois.edu/about/people/all-faculty/arindamb", "official", "Current endowed professorship and Artificial Intelligence/Data and Information Systems research areas"),
  banerjeeHome: source("Arindam Banerjee · Illinois faculty homepage", "https://arindam.cs.illinois.edu/index.html", "profile", "Machine learning research programme and current graduate recruitment"),
  banerjeeStudents: source("Arindam Banerjee · students", "https://arindam.cs.illinois.edu/students.html", "profile", "Named current and former students with degree years and career destinations"),
  banerjeeEducation: source("Arindam Banerjee · self-hosted PAMI author biography", "https://arindam.cs.illinois.edu/papers/09/pami-tdt.pdf", "publication", "UT Austin doctorate and machine-learning/data-mining research biography"),
  banerjeePortrait: source("Illinois Engineering portrait · Arindam Banerjee", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=111120&s=1200&type=portrait", "official", "Official Illinois directory portrait"),
  hasegawaOfficial: source("Illinois ECE · Mark Hasegawa-Johnson", "https://ece.illinois.edu/about/directory/faculty/jhasegaw", "official", "Current professorship, MIT doctorate and speech/AI research areas"),
  hasegawaCv: source("Mark Hasegawa-Johnson · Illinois-hosted CV", "https://speechtechnology.web.illinois.edu/media/Hasegawa-Johnson_CV.pdf", "cv", "Degree and postdoctoral advisers, appointments, students and career destinations"),
  hasegawaGroup: source("Statistical Speech Technology Group · Mark Hasegawa-Johnson", "https://speechtechnology.web.illinois.edu/mark-a-hasegawa-johnson/", "profile", "Current speech-technology research and academic family tree"),
  hasegawaPortrait: source("Illinois Engineering portrait · Mark Hasegawa-Johnson", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=4954&s=1200&type=portrait", "official", "Official Illinois directory portrait"),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, factSource: Source) => ({ label, value, source: factSource });

type Seed = {
  id: string;
  name: string;
  role: string;
  institution: Person["institution"];
  area: string;
  tags: string[];
  summary: string;
  facts: NonNullable<Person["facts"]>;
  sources: Source[];
  portraitFile: string;
  portraitSource: Source;
  stage: Person["stage"];
  x: number;
};

const person = (seed: Seed): Person => ({
  ...seed,
  region: "United States",
  category: "core",
  status: "current independent PI · official faculty profile verified",
  y: 120,
  primary: true,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-us-canada-ready-batch-4-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0UsCanadaReadyBatch4People2026: Person[] = [
  person({
    id: "daniela-rus-mit-p0-b4", name: "Daniela Rus", role: "Panasonic Professor · Director, MIT CSAIL", institution: "MIT", stage: "senior", x: 120,
    area: "Robotics · AI · Mobile Computing · Data Science", tags: ["机器人", "AI", "分布式机器人", "CSAIL"],
    summary: "MIT CSAIL 主任、分布式机器人和具身智能资深带头人；公开实验室名录展示了横跨高校、Google、Amazon Robotics 与自动驾驶公司的学生和博士后网络。",
    facts: [
      fact("当前任职", "MIT Panasonic Professor of Computer Science，并任 CSAIL 主任。", s.rusOfficial),
      fact("教育与学术训练", "获 Cornell University 计算机科学博士；加入 MIT 前曾在 Dartmouth College 历任助理教授、副教授和教授。", s.rusOfficial),
      fact("研究主线", "机器人、移动计算与数据科学，覆盖分布式、自重构与软体机器人。", s.rusOfficial),
      fact("学术领导力", "MIT 官方简介列其为 National Academy of Engineering 成员及 ACM、AAAI、IEEE Fellow。", s.rusOfficial),
      fact("学生与产业流向", "实验室公开名单记录校友进入 Stanford、Cornell、USC、Google Research、Amazon Robotics、Apple、Tesla 与 Boston Dynamics。", s.rusGroup),
    ],
    sources: [s.rusOfficial, s.rusGroup], portraitFile: "daniela-rus.jpg", portraitSource: s.rusPortrait,
  }),
  person({
    id: "julie-shah-mit-p0-b4", name: "Julie Shah", role: "H.N. Slater Professor · Chair, MIT AeroAstro", institution: "MIT", stage: "senior", x: 300,
    area: "Human-Robot Collaboration · AI Planning · Autonomous Systems", tags: ["人机协作", "机器人", "AI 规划", "自主系统"],
    summary: "把人机团队、规划调度与真实制造和医疗场景连接起来的 MIT Interactive Robotics Group 负责人，并拥有清晰可核验的学生体系。",
    facts: [
      fact("当前任职", "MIT AeroAstro H.N. Slater Professor、系主任，并领导 Interactive Robotics Group。", s.shahAero),
      fact("教育与学术训练", "2004、2006、2011 年分别获 MIT S.B.、S.M. 与 Ph.D.；随后于 Boeing Research and Technology 任博士后。", s.shahAero),
      fact("研究主线", "自主系统、人机协作、AI 规划与调度，以及航空航天、医疗和制造中的交互机器人。", s.shahAero),
      fact("实验室网络", "MIT CSAIL 将其列为 Interactive Robotics Group lead，研究领域为 AI & ML 和 Robotics。", s.shahOfficial),
      fact("学生体系", "Ankit Shah 的 MIT-hosted 主页明确其博士由 Julie Shah 指导，后进入 Brown University 从事机器人博士后研究。", s.shahStudent),
    ],
    sources: [s.shahOfficial, s.shahAero, s.shahStudent], portraitFile: "julie-shah.jpg", portraitSource: s.shahPortrait,
  }),
  person({
    id: "michael-bernstein-stanford-p0-b4", name: "Michael Bernstein", role: "Professor of Computer Science · HAI Senior Fellow", institution: "Stanford", stage: "senior", x: 480,
    area: "Human-Computer Interaction · Social Computing · Human-AI Interaction", tags: ["HCI", "人机协同", "社会计算", "生成式 AI"],
    summary: "研究人与算法如何共同组织、协作和创造的 Stanford HCI 学者；公开 CV 逐项列出博士生、博士后及其学术、工业和创业去向。",
    facts: [
      fact("当前任职", "Stanford 计算机科学教授、Bass University Fellow，并任 Stanford HAI Senior Fellow。", s.bernsteinProfile),
      fact("教育与学术训练", "Stanford Symbolic Systems 学士；MIT 计算机科学 S.M. 与 Ph.D.。", s.bernsteinProfile),
      fact("研究主线", "社会计算、人机协作、集体智能，以及生成式 AI 驱动的交互系统。", s.bernsteinOfficial),
      fact("学生去向", "公开 CV 列出博士校友进入 MIT、UW、UC Berkeley、KAIST、Google、Adobe、Instagram、Discord 和创业公司。", s.bernsteinCv),
      fact("公开培养网络", "CV 分别列出当前/毕业博士生、博士后和共同指导关系，使学术后代与产业流向可逐条追溯。", s.bernsteinCv),
    ],
    sources: [s.bernsteinOfficial, s.bernsteinProfile, s.bernsteinCv], portraitFile: "michael-bernstein.jpg", portraitSource: s.bernsteinPortrait,
  }),
  person({
    id: "emily-fox-stanford-p0-b4", name: "Emily Fox", role: "Professor of Statistics and Computer Science", institution: "Stanford", stage: "senior", x: 660,
    area: "Bayesian Machine Learning · Time Series · Health AI · Causal Inference", tags: ["贝叶斯机器学习", "时序建模", "健康 AI", "因果推断"],
    summary: "以贝叶斯动态模型、时序学习和健康 AI 为主线的 Stanford 教授；官方档案同时给出 MIT 训练背景和当前博士生指导关系。",
    facts: [
      fact("当前任职", "Stanford 统计学与计算机科学教授。", s.foxOfficial),
      fact("教育与学术训练", "2004、2005、2008、2009 年依次获 MIT S.B.、M.Eng.、E.E. 与 EECS Ph.D.。", s.foxProfile),
      fact("研究主线", "大规模贝叶斯动态建模、机器学习、时序数据、计算神经科学和健康应用。", s.foxOfficial),
      fact("学生体系", "Stanford 官方 Profiles 列出其博士论文导师/共同导师和博士后 sponsor 记录。", s.foxProfile),
      fact("公开团队", "Stanford Machine Learning Group 名单将 Alex Wang 等博士生列在 Emily Fox 指导名下。", s.foxGroup),
    ],
    sources: [s.foxOfficial, s.foxProfile, s.foxGroup], portraitFile: "emily-fox.jpg", portraitSource: s.foxPortrait,
  }),
  person({
    id: "arindam-banerjee-uiuc-p0-b4", name: "Arindam Banerjee", role: "Founder Professor in Engineering", institution: "UIUC", stage: "senior", x: 840,
    area: "Machine Learning · Generative Models · Optimization · AI for Science", tags: ["机器学习", "生成模型", "优化", "AI for Science"],
    summary: "从机器学习理论与优化延伸到生成模型、序列决策和气候科学的 UIUC 学者；公开学生页保留了二十余位博士校友的论文题目与职业去向。",
    facts: [
      fact("当前任职", "UIUC Founder Professor in Engineering，官方研究领域为 Artificial Intelligence 与 Data and Information Systems。", s.banerjeeOfficial),
      fact("教育与学术训练", "2005 年获 University of Texas at Austin 博士；其自托管论文作者简介明确记录该学位。", s.banerjeeEducation),
      fact("研究主线", "机器学习、人工智能和数据挖掘，当前关注过参数化与深度/生成模型、序列决策和 AI for Science。", s.banerjeeHome),
      fact("招生与团队", "本人主页公开招收 core ML 及 ML 科学应用方向的硕士和博士生。", s.banerjeeHome),
      fact("学生与产业流向", "公开学生页列出博士校友进入 Vanderbilt、Buffalo、Microsoft、Google、Amazon、Apple、IBM、Facebook 与创业公司。", s.banerjeeStudents),
    ],
    sources: [s.banerjeeOfficial, s.banerjeeHome, s.banerjeeStudents, s.banerjeeEducation], portraitFile: "arindam-banerjee.jpg", portraitSource: s.banerjeePortrait,
  }),
  person({
    id: "mark-hasegawa-johnson-uiuc-p0-b4", name: "Mark Hasegawa-Johnson", role: "M.E. Van Valkenburg Professor of ECE", institution: "UIUC", stage: "senior", x: 1020,
    area: "Speech Recognition · Low-Resource Speech · Audio AI · Accessibility", tags: ["语音识别", "低资源语言", "音频 AI", "无障碍技术"],
    summary: "长期研究低资源语音识别、音频理解和无障碍语音技术的 UIUC 资深教授；CV 清晰记录 MIT 师承、UCLA 博士后训练和学生去向。",
    facts: [
      fact("当前任职", "UIUC M.E. Van Valkenburg Professor of Electrical and Computer Engineering，并与 Siebel School/Beckman Institute 交叉。", s.hasegawaOfficial),
      fact("教育与学术训练", "MIT EECS B.S./M.S.（1989）及 Ph.D.（1996）；随后在 MIT/UCLA 和 UCLA 从事博士后研究。", s.hasegawaCv),
      fact("博士与博士后师承", "CV 明确列 Kenneth N. Stevens 为博士导师，并列 Stevens 与 Abeer Alwan 为联合博士后导师。", s.hasegawaCv),
      fact("研究主线", "低资源 ASR、语音合成、说话人匿名化、音频源分离和构音障碍语音建模。", s.hasegawaGroup),
      fact("学生与产业流向", "CV 的学生列表记录博士校友进入 Washington University、Chicago、HP、Qualcomm、IBM、Microsoft、A*STAR 和 BBN。", s.hasegawaCv),
    ],
    sources: [s.hasegawaOfficial, s.hasegawaCv, s.hasegawaGroup], portraitFile: "mark-hasegawa-johnson.jpg", portraitSource: s.hasegawaPortrait,
  }),
];

export const candidatePriorityP0UsCanadaReadyBatch4SupportingPeople2026: Person[] = [
  {
    id: "kenneth-stevens-mit-lineage-p0-b4", name: "Kenneth N. Stevens", role: "Clarence J. LeBel Professor Emeritus", institution: "MIT", region: "United States",
    area: "Speech Science · Acoustic Phonetics", tags: ["博士导师", "语音科学", "声学语音学"],
    summary: "Mark Hasegawa-Johnson 在 MIT 的博士导师及联合博士后导师。", stage: "historical", category: "historical",
    status: "supporting mentor node · relationship evidence only", sources: [s.hasegawaCv], x: 1020, y: 20, primary: false, lastVerifiedAt: checkedAt,
  },
];

export const candidatePriorityP0UsCanadaReadyBatch4Relationships2026: Relationship[] = [
  {
    id: "candidate-p0-usca-b4-stevens-hasegawa", from: "kenneth-stevens-mit-lineage-p0-b4", to: "mark-hasegawa-johnson-uiuc-p0-b4",
    type: "lineage", subtype: "phd_adviser", label: "博士导师",
    evidence: "Mark Hasegawa-Johnson 的 Illinois-hosted CV 明确列 Kenneth N. Stevens 为 MIT EECS 博士导师。", source: s.hasegawaCv, verified: true,
  },
];

export const candidatePriorityP0UsCanadaReadyBatch4Placements2026: StudentPlacement[] = [
  { id: "candidate-p0-usca-b4-mac-schwager", student: "Mac Schwager", teacherId: "daniela-rus-mit-p0-b4", company: "Stanford University", role: "Faculty", kind: "current", degree: "Postdoc", sector: "academia", note: "Distributed Robotics Lab 名单将 Mac Schwager 列为前博士后，现任 Stanford faculty。", source: s.rusGroup, verifiedAt: checkedAt },
  { id: "candidate-p0-usca-b4-ankit-shah", student: "Ankit Shah", teacherId: "julie-shah-mit-p0-b4", company: "Brown University", role: "Postdoctoral researcher", kind: "reported", degree: "PhD", sector: "postdoc", note: "Ankit Shah 的 MIT-hosted 页面明确其博士由 Julie Shah 指导，并记录随后在 Brown 从事博士后研究。", source: s.shahStudent, verifiedAt: checkedAt },
  { id: "candidate-p0-usca-b4-mitchell-gordon", student: "Mitchell Gordon", teacherId: "michael-bernstein-stanford-p0-b4", company: "MIT", role: "Assistant Professor", kind: "current", degree: "PhD", sector: "academia", note: "Michael Bernstein 的 Stanford-hosted CV 将 Mitchell Gordon 列为博士校友、现任 MIT EECS Assistant Professor。", source: s.bernsteinCv, verifiedAt: checkedAt },
  { id: "candidate-p0-usca-b4-adam-stewart", student: "Adam Stewart", teacherId: "arindam-banerjee-uiuc-p0-b4", company: "Technical University of Munich", role: "Postdoctoral researcher", kind: "first_job", degree: "PhD", sector: "postdoc", note: "Arindam Banerjee 学生页将 Adam Stewart 列为 2023 年博士校友，首份职位为 TUM 博士后。", source: s.banerjeeStudents, verifiedAt: checkedAt },
  { id: "candidate-p0-usca-b4-ken-chen", student: "Ken Chen", teacherId: "mark-hasegawa-johnson-uiuc-p0-b4", company: "Washington University in St. Louis", role: "Faculty", kind: "reported", degree: "PhD", sector: "academia", note: "Illinois-hosted CV 的学生列表记录 Ken Chen 为博士校友，去向为 Washington University。", source: s.hasegawaCv, verifiedAt: checkedAt },
];

export const candidatePriorityP0UsCanadaReadyBatch4GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-usca-b4-rus-annan", teacherId: "daniela-rus-mit-p0-b4", name: "Annan Zhang", role: "PhD student", source: s.rusGroup },
  { id: "candidate-p0-usca-b4-rus-makram", teacherId: "daniela-rus-mit-p0-b4", name: "Makram Chahine", role: "PhD student", source: s.rusGroup },
  { id: "candidate-p0-usca-b4-shah-ankit", teacherId: "julie-shah-mit-p0-b4", name: "Ankit Shah", role: "PhD alumnus", focus: "Interactive robot training", source: s.shahStudent },
  { id: "candidate-p0-usca-b4-bernstein-joon", teacherId: "michael-bernstein-stanford-p0-b4", name: "Joon Sung Park", role: "PhD student", focus: "Generative agents · human-AI interaction", source: s.bernsteinCv },
  { id: "candidate-p0-usca-b4-fox-alex", teacherId: "emily-fox-stanford-p0-b4", name: "Alex Wang", role: "PhD student", focus: "Probabilistic machine learning · healthcare", source: s.foxGroup },
  { id: "candidate-p0-usca-b4-fox-you-he", teacherId: "emily-fox-stanford-p0-b4", name: "You He", role: "Doctoral advisee", source: s.foxProfile },
  { id: "candidate-p0-usca-b4-banerjee-zhijie", teacherId: "arindam-banerjee-uiuc-p0-b4", name: "Zhijie Chen", role: "PhD student", source: s.banerjeeStudents },
  { id: "candidate-p0-usca-b4-hasegawa-sujeeth", teacherId: "mark-hasegawa-johnson-uiuc-p0-b4", name: "Sujeeth Bharadwaj", role: "PhD student", focus: "Speech and audio", source: s.hasegawaCv },
];

export type CandidatePriorityP0UsCanadaReadyBatch4RosterPromotion = {
  unitUrl: string;
  rosterName: string;
  atlasPersonId: string;
};

export const candidatePriorityP0UsCanadaReadyBatch4RosterPromotions2026: CandidatePriorityP0UsCanadaReadyBatch4RosterPromotion[] = [
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Daniela Rus", atlasPersonId: "daniela-rus-mit-p0-b4" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Julie Shah", atlasPersonId: "julie-shah-mit-p0-b4" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Michael Bernstein", atlasPersonId: "michael-bernstein-stanford-p0-b4" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Emily Fox", atlasPersonId: "emily-fox-stanford-p0-b4" },
  { unitUrl: "https://siebelschool.illinois.edu/about/people/all-faculty", rosterName: "Arindam Banerjee", atlasPersonId: "arindam-banerjee-uiuc-p0-b4" },
  { unitUrl: "https://siebelschool.illinois.edu/about/people/all-faculty", rosterName: "Mark Hasegawa-Johnson", atlasPersonId: "mark-hasegawa-johnson-uiuc-p0-b4" },
];

export const people = [
  ...candidatePriorityP0UsCanadaReadyBatch4People2026,
  ...candidatePriorityP0UsCanadaReadyBatch4SupportingPeople2026,
];
export const relationships = candidatePriorityP0UsCanadaReadyBatch4Relationships2026;
export const placements = candidatePriorityP0UsCanadaReadyBatch4Placements2026;
export const groupMembers = candidatePriorityP0UsCanadaReadyBatch4GroupMembers2026;
export const rosterPromotions = candidatePriorityP0UsCanadaReadyBatch4RosterPromotions2026;
