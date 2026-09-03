import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  johnOfficial: source("Stanford Statistics · John Duchi", "https://statistics.stanford.edu/people/john-duchi", "official", "Current Stanford appointments, machine-learning research areas and official portrait"),
  johnCv: source("John Duchi · Stanford-hosted CV", "https://web.stanford.edu/~jduchi/cv.pdf", "cv", "Education, Michael I. Jordan and Martin J. Wainwright as PhD advisers, Google research history and supervised researchers"),
  johnGroup: source("John Duchi · Students and postdoctoral researchers", "https://web.stanford.edu/~jduchi/group.html", "profile", "Current students and former researchers with first or current destinations"),
  noahOfficial: source("Stanford Center for Affective Science · Noah Goodman", "https://cas.stanford.edu/people/noah-goodman", "official", "Current professorship, education, lab affiliation and official portrait"),
  noahCs: source("Stanford Computer Science · Noah Goodman", "https://www.cs.stanford.edu/people/noah-goodman", "official", "Computer Science faculty membership and research profile"),
  noahCv: source("Noah Goodman · Stanford CoCoLab CV", "https://cocolab.stanford.edu/ndg-cv.html", "cv", "Stanford appointments, UT Austin doctorate and MIT postdoctoral/research-scientist trajectory"),
  noahPeople: source("Stanford CoCoLab · People", "https://cocolab.stanford.edu/people", "profile", "Noah Goodman as principal investigator and named current graduate students"),
  russOfficial: source("MIT CSAIL · Russ Tedrake", "https://www.csail.mit.edu/person/russ-tedrake", "official", "Current MIT professorship, Center for Robotics leadership, AI/robotics research and official portrait"),
  russCv: source("Russ Tedrake · MIT-hosted CV", "https://locomotion.csail.mit.edu/russt_cv.pdf", "cv", "MIT doctorate, H. Sebastian Seung as PhD adviser and academic career"),
  russHome: source("MIT Robot Locomotion Group · Russ Tedrake", "https://locomotion.csail.mit.edu/russt.html", "profile", "Current research programme, Drake software and Physical AI startup statement"),
  russPeople: source("MIT Robot Locomotion Group · People", "https://locomotion.csail.mit.edu/people.html", "profile", "Current students and alumni with academic and industry destinations"),
  tamaraOfficial: source("MIT CSAIL · Tamara Broderick", "https://www.csail.mit.edu/person/tamara-broderick", "official", "Current MIT PI status, machine-learning research and official portrait"),
  tamaraCsb: source("MIT CSB · Tamara Broderick", "https://csbphd.mit.edu/faculty/tamara-broderick/", "official", "Current appointments, complete degree history, research programme and awards"),
  tamaraSpotlight: source("MIT CSB · Tamara Broderick faculty spotlight", "https://csbphd.mit.edu/faculty_spotlight/broderick/", "official", "Michael I. Jordan as PhD adviser and Berkeley Bayesian-machine-learning training"),
  tamaraHome: source("Tamara Broderick · MIT faculty homepage", "https://tamarabroderick.com/index.html", "profile", "Current and former PhD students and postdocs with destinations"),
  nancyOfficial: source("Illinois Siebel School · Nancy M. Amato", "https://siebelschool.illinois.edu/about/people/all-faculty/namato", "official", "Current school-director role, education, AI/robotics research, mentoring record and official portrait"),
  nancyCv: source("Nancy M. Amato · Illinois-hosted CV", "https://parasollab.web.illinois.edu/people/amato/cv-amato.pdf", "cv", "Academic career, current and graduated doctoral students, postdocs and career destinations"),
  nancyPeople: source("Illinois Parasol Lab · People and alumni", "https://www.parasollab.web.illinois.edu/people/", "profile", "Current and former group members, adviser labels and destinations"),
  hanghangOfficial: source("Illinois Siebel School · Hanghang Tong", "https://siebelschool.illinois.edu/about/people/all-faculty/htong", "official", "Current professorship, AI research areas and official portrait"),
  hanghangHome: source("Hanghang Tong · Faculty homepage", "http://tonghanghang.org/", "profile", "Current PhD students, alumni, research topics and hosted CV"),
  hanghangFellow: source("Illinois Grainger Engineering · Hanghang Tong named ACM Fellow", "https://grainger.illinois.edu/news/stories/tong-ACM-Fellow", "official", "Christos Faloutsos explicitly identified as PhD adviser and current graph-mining impact"),
  hanghangStudentCv: source("Jian Kang · Illinois-hosted CV", "https://jiank2.web.illinois.edu/files/CV.pdf", "cv", "Hanghang Tong as doctoral adviser and University of Rochester faculty destination"),
  portraitJohn: source("Stanford Statistics portrait · John Duchi", "https://statistics.stanford.edu/sites/statistics/files/media/people/Duchi.jpg", "official", "Official Stanford directory portrait"),
  portraitNoah: source("Stanford Profiles portrait · Noah Goodman", "https://profiles.stanford.edu/proxy/api/cap/profiles/23483/resources/profilephoto/350x350.1509529004826.jpg", "official", "Official Stanford profile portrait"),
  portraitRuss: source("MIT CSAIL portrait · Russ Tedrake", "https://www.csail.mit.edu/sites/default/files/images/people/profile/m6sedxovjc.png", "official", "Official MIT CSAIL profile portrait"),
  portraitTamara: source("MIT CSAIL portrait · Tamara Broderick", "https://www.csail.mit.edu/sites/default/files/images/people/profile/head_pic.jpg", "official", "Official MIT CSAIL profile portrait"),
  portraitNancy: source("Illinois Engineering portrait · Nancy M. Amato", "https://ws.engr.illinois.edu/directory/viewphoto/namato/1200", "official", "Official Illinois Engineering directory portrait"),
  portraitHanghang: source("Illinois Engineering portrait · Hanghang Tong", "https://ws.engr.illinois.edu/directory/viewphoto/htong/1200", "official", "Official Illinois Engineering directory portrait"),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, factSource: Source) => ({ label, value, source: factSource });

type PersonSeed = {
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
  y: number;
};

const person = (seed: PersonSeed): Person => ({
  id: seed.id,
  name: seed.name,
  role: seed.role,
  institution: seed.institution,
  region: "United States",
  area: seed.area,
  tags: seed.tags,
  summary: seed.summary,
  facts: seed.facts,
  sources: seed.sources,
  stage: seed.stage,
  category: "core",
  status: "current independent PI · official faculty profile verified",
  x: seed.x,
  y: seed.y,
  primary: true,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-us-canada-batch-3-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0UsCanadaBatch3People2026: Person[] = [
  person({
    id: "john-duchi-stanford-p0-2026", name: "John Duchi", role: "Associate Professor of Statistics and Electrical Engineering", institution: "Stanford", stage: "senior", x: 120, y: 120,
    area: "Statistical Machine Learning · Optimization · Privacy · Information Theory", tags: ["机器学习理论", "优化", "隐私", "统计学习"],
    summary: "研究统计效率、计算、通信与隐私之间基本权衡的 Stanford 学者，并把理论方法延伸到大规模优化和可信机器学习。",
    facts: [
      fact("当前任职", "Stanford 统计学与电气工程副教授，并在计算机科学系兼任。", sources.johnOfficial),
      fact("教育与学术训练", "Stanford 计算机本科、硕士；2014 年获 UC Berkeley EECS 博士。", sources.johnCv),
      fact("博士师承", "本人 CV 明确列 Michael I. Jordan 与 Martin J. Wainwright 为 Berkeley 博士共同导师。", sources.johnCv),
      fact("研究主线", "统计机器学习、随机优化、信息论，以及隐私和有限通信条件下的统计推断。", sources.johnOfficial),
      fact("学生与产业流向", "公开团队页列出多位博士生和博士后；校友去向包括 OpenAI、Apple、Sisu Data 与 UIUC。", sources.johnGroup),
    ],
    sources: [sources.johnOfficial, sources.johnCv, sources.johnGroup], portraitFile: "john-duchi.jpg", portraitSource: sources.portraitJohn,
  }),
  person({
    id: "noah-goodman-stanford-p0-2026", name: "Noah Goodman", role: "Professor of Psychology and Computer Science", institution: "Stanford", stage: "senior", x: 310, y: 120,
    area: "Computational Cognitive Science · Probabilistic Programming · Language Pragmatics · AI", tags: ["认知科学", "概率编程", "语用学", "AI"],
    summary: "把概率模型、语言语用学与人类认知机制连接起来的 Stanford CoCoLab PI，研究机器和人如何推理、交流与学习。",
    facts: [
      fact("当前任职", "Stanford 心理学与计算机科学教授，领导 Computation and Cognition Lab。", sources.noahOfficial),
      fact("教育与学术训练", "University of Arizona 数学学士、物理学士；2003 年获 UT Austin 数学博士，随后在 MIT 任博士后与研究科学家。", sources.noahCv),
      fact("研究主线", "概率认知模型、概率编程、概念学习、自然语言语义与语用，以及社会推理。", sources.noahCs),
      fact("方法影响", "其研究以贝叶斯推断和可执行概率程序统一人类概念、语言与因果学习的计算解释。", sources.noahCv),
      fact("公开团队", "CoCoLab 人员页明确列 Noah Goodman 为 PI，并列出 Kanishk Gandhi、Michael Li、Joy He-Yueya 等当前研究生。", sources.noahPeople),
    ],
    sources: [sources.noahOfficial, sources.noahCs, sources.noahCv, sources.noahPeople], portraitFile: "noah-goodman.jpg", portraitSource: sources.portraitNoah,
  }),
  person({
    id: "russ-tedrake-mit-p0-2026", name: "Russ Tedrake", role: "Toyota Professor · Director, MIT CSAIL Center for Robotics", institution: "MIT", stage: "senior", x: 500, y: 120,
    area: "Robotics · Control · Robot Learning · Physical AI", tags: ["机器人", "控制", "机器人学习", "Physical AI"],
    summary: "将非线性控制、优化与机器学习结合到灵巧操作和动态机器人中的 MIT 机器人带头人，公开学生网络横跨学术界与机器人产业。",
    facts: [
      fact("当前任职", "MIT Toyota Professor，横跨 EECS、Aero/Astro 与 MechE，并任 CSAIL Center for Robotics 主任。", sources.russOfficial),
      fact("教育与学术训练", "University of Michigan 计算机工程学士；2004 年获 MIT EECS 博士，随后在 MIT Brain and Cognitive Sciences 从事博士后研究。", sources.russCv),
      fact("博士师承", "本人 MIT-hosted CV 明确列 H. Sebastian Seung 为博士导师。", sources.russCv),
      fact("研究主线", "动力系统、非线性控制、优化与机器学习，当前聚焦机器人操作和 Physical AI。", sources.russHome),
      fact("学生与产业流向", "实验室公开校友页列出进入 Princeton、UW、Oxford、OpenAI、Google Brain、Boston Dynamics 与 Toyota Research Institute 的成员。", sources.russPeople),
    ],
    sources: [sources.russOfficial, sources.russCv, sources.russHome, sources.russPeople], portraitFile: "russ-tedrake.jpg", portraitSource: sources.portraitRuss,
  }),
  person({
    id: "tamara-broderick-mit-p0-2026", name: "Tamara Broderick", role: "Associate Professor of EECS and IDSS", institution: "MIT", stage: "senior", x: 690, y: 120,
    area: "Bayesian Machine Learning · Uncertainty · Robust Statistics", tags: ["贝叶斯机器学习", "不确定性", "鲁棒统计", "可扩展推断"],
    summary: "以可扩展贝叶斯推断和现代数据分析中的不确定性量化为核心的 MIT 学者，并培养出进入学术界、创业公司与工业研究的学生。",
    facts: [
      fact("当前任职", "MIT EECS 与 IDSS 副教授，并加入 CSAIL、LIDS 和 Statistics and Data Science Center。", sources.tamaraCsb),
      fact("教育与学术训练", "Princeton 数学本科；Cambridge 数学高级研究硕士与物理 MPhil；UC Berkeley 计算机硕士、统计学博士。", sources.tamaraCsb),
      fact("博士师承", "MIT 官方 faculty spotlight 明确写明其 Berkeley 博士阶段在 Michael I. Jordan 指导下研究贝叶斯非参数方法。", sources.tamaraSpotlight),
      fact("研究主线", "面向复杂现代数据分析的可扩展贝叶斯机器学习、不确定性量化与鲁棒性。", sources.tamaraOfficial),
      fact("学生与产业流向", "本人团队页列出校友进入 UBC、Wisconsin、Berkeley、Stanford、Amazon、MIT Lincoln Laboratory 与创业公司。", sources.tamaraHome),
    ],
    sources: [sources.tamaraOfficial, sources.tamaraCsb, sources.tamaraSpotlight, sources.tamaraHome], portraitFile: "tamara-broderick.jpg", portraitSource: sources.portraitTamara,
  }),
  person({
    id: "nancy-amato-uiuc-p0-2026", name: "Nancy M. Amato", role: "Abel Bliss Professor · Director, Siebel School", institution: "UIUC", stage: "senior", x: 880, y: 120,
    area: "Robotics · Motion Planning · Parallel Algorithms · Computational Biology", tags: ["机器人", "运动规划", "并行算法", "计算生物学"],
    summary: "领导 UIUC Siebel School 的机器人与算法资深学者；其公开 CV 展示了庞大的博士生、博士后及其学术和产业去向网络。",
    facts: [
      fact("当前任职", "UIUC Siebel School Director、Abel Bliss Professor of Engineering。", sources.nancyOfficial),
      fact("教育与学术训练", "Stanford 数学科学与经济学本科；UC Berkeley 计算机硕士；University of Illinois 计算机博士。", sources.nancyOfficial),
      fact("研究主线", "机器人任务与运动规划、计算几何、计算生物学，以及并行和分布式计算。", sources.nancyOfficial),
      fact("人才培养", "官方简介记录其已培养 29 位博士，其中 13 人进入 faculty、9 人进入政府或产业研究机构。", sources.nancyOfficial),
      fact("学生网络", "Illinois-hosted CV 逐人列出博士生、博士后及首份或当前职位，形成可追溯的学术与产业流向。", sources.nancyCv),
    ],
    sources: [sources.nancyOfficial, sources.nancyCv, sources.nancyPeople], portraitFile: "nancy-amato.jpg", portraitSource: sources.portraitNancy,
  }),
  person({
    id: "hanghang-tong-uiuc-p0-2026", name: "Hanghang Tong", role: "Professor of Computer Science", institution: "UIUC", stage: "senior", x: 1070, y: 120,
    area: "Graph Mining · Graph Machine Learning · Trustworthy AI · LLMs", tags: ["图挖掘", "图机器学习", "可信 AI", "LLM"],
    summary: "从经典图挖掘延伸到图神经网络、可信 AI 和 LLM 推理的 UIUC ACM Fellow，拥有清晰的 CMU 师承和公开学生体系。",
    facts: [
      fact("当前任职", "UIUC Siebel School 计算机教授，研究领域列入 Artificial Intelligence 与 Data and Information Systems。", sources.hanghangOfficial),
      fact("教育与学术训练", "2008 年和 2009 年分别获 Carnegie Mellon University Machine Learning 硕士与博士学位。", sources.hanghangFellow),
      fact("博士师承", "Illinois ACM Fellow 官方报道直接引用其表述，确认 CMU 博士导师为 Christos Faloutsos。", sources.hanghangFellow),
      fact("研究主线", "大规模图与多媒体数据挖掘、图机器学习、网络分析、可信 AI，以及图与 LLM 的交叉。", sources.hanghangOfficial),
      fact("公开学生体系", "本人主页持续列出当前博士生与博士校友，方向覆盖图学习、公平性、知识图谱、LLM 推理、post-training 与 agentic AI。", sources.hanghangHome),
    ],
    sources: [sources.hanghangOfficial, sources.hanghangHome, sources.hanghangFellow, sources.hanghangStudentCv], portraitFile: "hanghang-tong.jpg", portraitSource: sources.portraitHanghang,
  }),
];

export const candidatePriorityP0UsCanadaBatch3SupportingPeople2026: Person[] = [
  {
    id: "martin-wainwright-lineage-p0-b3", name: "Martin J. Wainwright", role: "Professor", institution: "Berkeley", region: "United States",
    area: "Statistics · Machine Learning · Optimization", tags: ["博士导师", "统计学习", "优化"],
    summary: "John Duchi 在 UC Berkeley 博士阶段的共同导师。", stage: "senior", category: "adjacent",
    status: "supporting mentor node · relationship evidence only", sources: [sources.johnCv], x: 80, y: 20, primary: false, lastVerifiedAt: checkedAt,
  },
  {
    id: "sebastian-seung-lineage-p0-b3", name: "H. Sebastian Seung", role: "Professor", institution: "Princeton", region: "United States",
    area: "Computational Neuroscience · Machine Learning", tags: ["博士导师", "计算神经科学", "机器学习"],
    summary: "Russ Tedrake 在 MIT EECS 博士阶段的导师。", stage: "senior", category: "adjacent",
    status: "supporting mentor node · relationship evidence only", sources: [sources.russCv], x: 500, y: 20, primary: false, lastVerifiedAt: checkedAt,
  },
  {
    id: "lawrence-rauchwerger-collab-p0-b3", name: "Lawrence Rauchwerger", role: "Professor", institution: "Texas A&M", region: "United States",
    area: "Parallel Computing · Compilers", tags: ["长期合作", "并行计算", "STAPL"],
    summary: "Nancy M. Amato 在 STAPL 与并行图算法方向的长期合作者。", stage: "senior", category: "adjacent",
    status: "supporting collaborator node · relationship evidence only", sources: [sources.nancyOfficial], x: 880, y: 20, primary: false, lastVerifiedAt: checkedAt,
  },
];

const lineage = (id: string, from: string, to: string, evidence: string, relationSource: Source): Relationship => ({
  id, from, to, type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence, source: relationSource, verified: true,
});

export const candidatePriorityP0UsCanadaBatch3Relationships2026: Relationship[] = [
  lineage("candidate-p0-usca-b3-jordan-duchi", "michael-jordan-eu", "john-duchi-stanford-p0-2026", "John Duchi 的 Stanford-hosted CV 明确列 Michael I. Jordan 为 Berkeley 博士共同导师。", sources.johnCv),
  lineage("candidate-p0-usca-b3-wainwright-duchi", "martin-wainwright-lineage-p0-b3", "john-duchi-stanford-p0-2026", "John Duchi 的 Stanford-hosted CV 明确列 Martin J. Wainwright 为 Berkeley 博士共同导师。", sources.johnCv),
  lineage("candidate-p0-usca-b3-seung-tedrake", "sebastian-seung-lineage-p0-b3", "russ-tedrake-mit-p0-2026", "Russ Tedrake 的 MIT-hosted CV 明确列 H. Sebastian Seung 为博士导师。", sources.russCv),
  lineage("candidate-p0-usca-b3-jordan-broderick", "michael-jordan-eu", "tamara-broderick-mit-p0-2026", "MIT 官方 faculty spotlight 明确写明 Tamara Broderick 在 Michael I. Jordan 指导下完成 Berkeley 博士研究。", sources.tamaraSpotlight),
  lineage("candidate-p0-usca-b3-faloutsos-tong", "christos-faloutsos", "hanghang-tong-uiuc-p0-2026", "Illinois 官方 ACM Fellow 报道直接确认 Christos Faloutsos 为 Hanghang Tong 的博士导师。", sources.hanghangFellow),
  {
    id: "candidate-p0-usca-b3-amato-rauchwerger", from: "nancy-amato-uiuc-p0-2026", to: "lawrence-rauchwerger-collab-p0-b3",
    type: "collaboration", subtype: "sustained_collaboration", label: "STAPL 长期合作",
    evidence: "Nancy Amato 的 Illinois 官方简介明确称其与 Lawrence Rauchwerger 在 STAPL 和并行图算法方向保持长期合作。", source: sources.nancyOfficial, verified: true,
  },
];

export const candidatePriorityP0UsCanadaBatch3Placements2026: StudentPlacement[] = [
  {
    id: "candidate-p0-usca-b3-placement-yu-bai", student: "Yu Bai", teacherId: "john-duchi-stanford-p0-2026",
    company: "OpenAI", role: "Researcher", kind: "current", degree: "PhD", sector: "industry",
    note: "John Duchi 公开团队页将 Yu Bai 列为 2019 年 Statistics PhD 校友并记录其去向为 OpenAI。", source: sources.johnGroup, verifiedAt: checkedAt,
  },
  {
    id: "candidate-p0-usca-b3-placement-boyuan-chen", student: "Boyuan Chen", teacherId: "russ-tedrake-mit-p0-2026",
    company: "OpenAI", role: "Researcher", kind: "current", degree: "PhD", sector: "industry",
    note: "Robot Locomotion Group 官方成员页列其为 2025 年 EECS 博士校友，现于 OpenAI。", source: sources.russPeople, verifiedAt: checkedAt,
  },
  {
    id: "candidate-p0-usca-b3-placement-trevor-campbell", student: "Trevor Campbell", teacherId: "tamara-broderick-mit-p0-2026",
    company: "University of British Columbia", role: "Associate Professor", kind: "current", degree: "Unknown", sector: "academia",
    source: sources.tamaraHome, verifiedAt: checkedAt,
  },
  {
    id: "candidate-p0-usca-b3-placement-diane-uwacu", student: "Diane Uwacu", teacherId: "nancy-amato-uiuc-p0-2026",
    company: "Mount Holyoke College", role: "Assistant Professor", kind: "first_job", degree: "PhD", sector: "academia",
    source: sources.nancyCv, verifiedAt: checkedAt,
  },
  {
    id: "candidate-p0-usca-b3-placement-jian-kang", student: "Jian Kang", teacherId: "hanghang-tong-uiuc-p0-2026",
    company: "University of Rochester", role: "Assistant Professor", kind: "current", degree: "PhD", sector: "academia",
    source: sources.hanghangStudentCv, verifiedAt: checkedAt,
  },
];

export const candidatePriorityP0UsCanadaBatch3GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-usca-b3-duchi-audrey", teacherId: "john-duchi-stanford-p0-2026", name: "Audrey Xie", role: "Computer Science PhD student", source: sources.johnGroup },
  { id: "candidate-p0-usca-b3-duchi-rohith", teacherId: "john-duchi-stanford-p0-2026", name: "Rohith Kuditipudi", role: "Computer Science PhD student", source: sources.johnGroup },
  { id: "candidate-p0-usca-b3-noah-kanishk", teacherId: "noah-goodman-stanford-p0-2026", name: "Kanishk Gandhi", role: "Graduate student", focus: "Reasoning, discovery and interaction", source: sources.noahPeople },
  { id: "candidate-p0-usca-b3-noah-michael", teacherId: "noah-goodman-stanford-p0-2026", name: "Michael Li", role: "Graduate student", focus: "Probabilistic machine learning and LLMs", source: sources.noahPeople },
  { id: "candidate-p0-usca-b3-russ-tommy", teacherId: "russ-tedrake-mit-p0-2026", name: "Tommy Cohn", role: "EECS PhD candidate", focus: "Robot motion planning", source: sources.russPeople },
  { id: "candidate-p0-usca-b3-russ-adam", teacherId: "russ-tedrake-mit-p0-2026", name: "Adam Wei", role: "EECS PhD candidate", source: sources.russPeople },
  { id: "candidate-p0-usca-b3-tamara-david", teacherId: "tamara-broderick-mit-p0-2026", name: "David Burt", role: "PhD student", focus: "Bayesian machine learning", source: sources.tamaraHome },
  { id: "candidate-p0-usca-b3-tamara-yunyi", teacherId: "tamara-broderick-mit-p0-2026", name: "Yunyi Shen", role: "PhD student", focus: "Uncertainty and robust inference", source: sources.tamaraHome },
  { id: "candidate-p0-usca-b3-hanghang-zhichen", teacherId: "hanghang-tong-uiuc-p0-2026", name: "Zhichen Zeng", role: "PhD student", focus: "Multi-networks · LLM ensemble · disparate machine learning", source: sources.hanghangHome },
  { id: "candidate-p0-usca-b3-hanghang-gaotang", teacherId: "hanghang-tong-uiuc-p0-2026", name: "Gaotang Li", role: "PhD student", focus: "LLM reasoning · post-training", source: sources.hanghangHome },
];

export type CandidatePriorityP0UsCanadaBatch3RosterPromotion = {
  unitUrl: string;
  rosterName: string;
  atlasPersonId: string;
};

export const candidatePriorityP0UsCanadaBatch3RosterPromotions2026: CandidatePriorityP0UsCanadaBatch3RosterPromotion[] = [
  { unitUrl: "https://ee.stanford.edu/people/faculty", rosterName: "John Duchi", atlasPersonId: "john-duchi-stanford-p0-2026" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Noah Goodman", atlasPersonId: "noah-goodman-stanford-p0-2026" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Russ Tedrake", atlasPersonId: "russ-tedrake-mit-p0-2026" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Tamara Broderick", atlasPersonId: "tamara-broderick-mit-p0-2026" },
  { unitUrl: "https://siebelschool.illinois.edu/about/people/all-faculty", rosterName: "Nancy M. Amato", atlasPersonId: "nancy-amato-uiuc-p0-2026" },
  { unitUrl: "https://siebelschool.illinois.edu/about/people/all-faculty", rosterName: "Hanghang Tong", atlasPersonId: "hanghang-tong-uiuc-p0-2026" },
];

export const people = [
  ...candidatePriorityP0UsCanadaBatch3People2026,
  ...candidatePriorityP0UsCanadaBatch3SupportingPeople2026,
];
export const relationships = candidatePriorityP0UsCanadaBatch3Relationships2026;
export const placements = candidatePriorityP0UsCanadaBatch3Placements2026;
export const groupMembers = candidatePriorityP0UsCanadaBatch3GroupMembers2026;
export const rosterPromotions = candidatePriorityP0UsCanadaBatch3RosterPromotions2026;
