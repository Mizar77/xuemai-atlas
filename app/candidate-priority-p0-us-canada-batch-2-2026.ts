import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const unitUrl = "https://siebelschool.illinois.edu/about/people/all-faculty";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  hengOfficial: source("Illinois Siebel School · Heng Ji", "https://siebelschool.illinois.edu/about/people/all-faculty/hengji", "official", "Current professorship, education, NLP/LLM research, AICE leadership, Amazon Scholar affiliation and official portrait"),
  hengAcl: source("Illinois Siebel School · Heng Ji named ACL Fellow", "https://siebelschool.illinois.edu/news/heng-ji-ACL-Fellow", "official", "Ralph Grishman explicitly identified as Heng Ji's PhD adviser and current research leadership"),
  davidOfficial: source("Illinois Siebel School · David Forsyth", "https://siebelschool.illinois.edu/about/people/all-faculty/daf", "official", "Current named chair, computer-vision research areas and official portrait"),
  davidBio: source("Illinois Siebel School · David Forsyth biography", "https://siebelschool.illinois.edu/TAU-UIUC/DavidForsyth", "official", "Current chair, Berkeley career, publication record, awards and field leadership"),
  davidVision: source("Illinois Siebel School · Vision Group and alumni", "https://siebelschool.illinois.edu/news/illinois-cs-vision-group-provides-leadership-rapidly-growing-field", "official", "Vision Group leadership and named alumni/student career destinations"),
  jimengOfficial: source("Illinois Siebel School · Jimeng Sun", "https://siebelschool.illinois.edu/about/people/department-faculty/jimeng", "official", "Current professorship, AI-for-healthcare research and official portrait"),
  jimengThesis: source("CMU Computer Science · Jimeng Sun PhD", "https://www.csd.cmu.edu/academics/doctoral/degrees-conferred/jimeng-sun", "thesis", "CMU PhD title, graduation date and Christos Faloutsos as adviser"),
  jimengHome: source("Jimeng Sun · CMU-hosted homepage", "https://www.cs.cmu.edu/~jimeng/home.htm", "profile", "HKUST degrees, CMU doctoral training, adviser and IBM T. J. Watson transition"),
  saurabhOfficial: source("Illinois Siebel School · Saurabh Gupta", "https://siebelschool.illinois.edu/about/people/all-faculty/saurabhg", "official", "Current ECE appointment, AI/vision/robotics research and official portrait"),
  saurabhHome: source("Saurabh Gupta · Illinois homepage", "https://saurabhg.web.illinois.edu/", "profile", "Berkeley PhD adviser Jitendra Malik, FAIR research role, research programme and recruitment"),
  saurabhCv: source("Saurabh Gupta · Illinois-hosted CV", "https://saurabhg.web.illinois.edu/sgupta.pdf", "cv", "Current and graduated students, co-advising, first destinations and career record"),
  dilekOfficial: source("Illinois Siebel School · Dilek Hakkani-Tür", "https://siebelschool.illinois.edu/about/people/department-faculty/dilek", "official", "Current professorship, education, conversational AI research, Amazon/Google/Microsoft/AT&T career and official portrait"),
  cedar: source("Illinois Siebel School · CEDAR project", "https://siebelschool.illinois.edu/news/-CEDAR", "official", "Dilek Hakkani-Tür and Heng Ji as Illinois co-PIs on an IARPA-backed LLM hallucination project"),
  nanOfficial: source("Illinois Siebel School · Nan Jiang", "https://siebelschool.illinois.edu/about/people/faculty/nanjiang", "official", "Current associate professorship, education, reinforcement-learning research and official portrait"),
  nanCv: source("Nan Jiang · Illinois-hosted CV", "https://nanjiang.cs.illinois.edu/files/cv-nanjiang.pdf", "cv", "UIUC promotion, Michigan PhD, Microsoft Research postdoc and research awards"),
  nanMichigan: source("University of Michigan CSE · Nan Jiang fellowship", "https://cse.engin.umich.edu/stories/nan-jiang-receives-rackham-predoctoral-fellowship-for-research-on-reinforcement-learning", "official", "Satinder Singh explicitly identified as Nan Jiang's doctoral adviser and dissertation topic"),
  uiucAi: source("Illinois Siebel School · Artificial Intelligence area", "https://siebelschool.illinois.edu/research/areas/artificial-intelligence", "official", "Official AI-area scope for the six selected faculty"),
  portraitHeng: source("Illinois Engineering directory portrait · Heng Ji", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=91347&s=800&type=portrait", "official", "Official directory portrait"),
  portraitDavid: source("Illinois Engineering directory portrait · David Forsyth", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=4934&s=800&type=portrait", "official", "Official directory portrait"),
  portraitJimeng: source("Illinois Engineering directory portrait · Jimeng Sun", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=99470&s=800&type=portrait", "official", "Official directory portrait"),
  portraitSaurabh: source("Illinois Engineering directory portrait · Saurabh Gupta", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=89586&s=800&type=portrait", "official", "Official directory portrait"),
  portraitDilek: source("Illinois Engineering directory portrait · Dilek Hakkani-Tür", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=139707&s=800&type=portrait", "official", "Official directory portrait"),
  portraitNan: source("Illinois Engineering directory portrait · Nan Jiang", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=77846&s=800&type=portrait", "official", "Official directory portrait"),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, factSource: Source) => ({ label, value, source: factSource });

type PersonSeed = {
  id: string;
  name: string;
  role: string;
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
  institution: "UIUC",
  region: "United States",
  area: seed.area,
  tags: seed.tags,
  summary: seed.summary,
  facts: seed.facts,
  sources: seed.sources,
  stage: seed.stage,
  category: "core",
  status: "current independent PI · Illinois official profile verified",
  x: seed.x,
  y: seed.y,
  primary: true,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-us-canada-batch-2-2026/${seed.portraitFile}`,
    alt: `${seed.name} Illinois 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0UsCanadaBatch2People2026: Person[] = [
  person({
    id: "heng-ji-uiuc-p0-2026", name: "Heng Ji", role: "Professor · Founding Director, AICE", stage: "senior", x: 130, y: 130,
    area: "Natural Language Processing · Knowledge-enhanced LLMs · Multimodal Information Extraction", tags: ["NLP", "LLM", "信息抽取", "多模态", "AICE"],
    summary: "UIUC 信息抽取与知识增强大模型带头人，创建 Amazon–Illinois AICE，并把多语种、多模态知识抽取推进到可信 LLM 与 AI for Science。",
    facts: [
      fact("当前任职", "UIUC 计算机教授，并任 ECE 与 Coordinated Science Laboratory affiliated faculty；创建 Amazon–Illinois AICE。", sources.hengOfficial),
      fact("教育与学术训练", "清华计算语言学学士、硕士；纽约大学计算机硕士、博士。", sources.hengOfficial),
      fact("博士师承", "Illinois 官方 ACL Fellow 报道中，Heng Ji 明确称 Ralph Grishman 为其博士导师。", sources.hengAcl),
      fact("研究主线", "多媒体、多语种信息抽取，知识增强大语言模型与视觉语言模型。", sources.hengOfficial),
      fact("产业与平台连接", "官方简介记录其 Amazon Scholar 身份及 AICE 创始主任经历，项目亦长期获 Amazon、Google、Bosch、IBM 等支持。", sources.hengOfficial),
    ],
    sources: [sources.hengOfficial, sources.hengAcl, sources.uiucAi], portraitFile: "heng-ji.jpg", portraitSource: sources.portraitHeng,
  }),
  person({
    id: "david-forsyth-uiuc-p0-2026", name: "David Forsyth", role: "Fulton Watson Copp Chair in Computer Science", stage: "senior", x: 310, y: 130,
    area: "Computer Vision · Computer Graphics · Machine Learning", tags: ["计算机视觉", "图形学", "机器学习", "视觉学术谱系"],
    summary: "从 Berkeley 到 UIUC 的计算机视觉资深学者，长期领导 Illinois Vision Group，并培养出进入学术界和视觉创业公司的多位学生。",
    facts: [
      fact("当前任职", "UIUC Fulton Watson Copp Chair in Computer Science。", sources.davidOfficial),
      fact("教育与学术训练", "获 Oxford University DPhil；加入 UIUC 前曾任 UC Berkeley 计算机教授。", sources.davidBio),
      fact("研究主线", "计算机视觉、计算机图形学与机器学习，近年亦研究生成视觉模型。", sources.davidOfficial),
      fact("学术服务与影响", "曾多次担任 CVPR program/general chair 与 ICCV general chair，并获 IEEE Technical Achievement Award、ACM/IEEE Fellow 和 Mark Everingham Prize。", sources.davidBio),
      fact("学生体系", "Illinois Vision Group 官方报道列出 Ali Farhadi、Brett Jones、Kevin Karsch、Raj Sodhi 与 Gang Wang 等视觉校友及其学术或产业去向。", sources.davidVision),
    ],
    sources: [sources.davidOfficial, sources.davidBio, sources.davidVision], portraitFile: "david-forsyth.jpg", portraitSource: sources.portraitDavid,
  }),
  person({
    id: "jimeng-sun-uiuc-p0-2026", name: "Jimeng Sun", role: "Professor", stage: "senior", x: 490, y: 130,
    area: "AI for Healthcare · Clinical Foundation Models · Drug Discovery · Data Mining", tags: ["AI for Healthcare", "医疗大模型", "药物发现", "数据挖掘"],
    summary: "把深度学习、图学习与临床数据系统用于药物发现、临床试验和数字孪生的 UIUC AI for Healthcare 资深 PI。",
    facts: [
      fact("当前任职", "UIUC Siebel School 计算机教授。", sources.jimengOfficial),
      fact("教育与学术训练", "HKUST 计算机学士与 MPhil；2007 年获 CMU 计算机博士。", sources.jimengHome),
      fact("博士师承", "CMU 官方博士记录列 Christos Faloutsos 为导师，论文研究流、图与张量上的增量模式发现。", sources.jimengThesis),
      fact("研究主线", "深度学习用于药物发现、临床试验优化、计算表型、临床预测、治疗推荐与健康监测。", sources.jimengOfficial),
      fact("产业轨迹", "本人 CMU-hosted 主页记录博士毕业后加入 IBM T. J. Watson Research。", sources.jimengHome),
    ],
    sources: [sources.jimengOfficial, sources.jimengThesis, sources.jimengHome], portraitFile: "jimeng-sun.jpg", portraitSource: sources.portraitJimeng,
  }),
  person({
    id: "saurabh-gupta-uiuc-p0-2026", name: "Saurabh Gupta", role: "Associate Professor of ECE", stage: "senior", x: 670, y: 130,
    area: "Computer Vision · Robot Learning · Embodied AI", tags: ["计算机视觉", "机器人学习", "具身智能", "视频学习"],
    summary: "从 Berkeley 视觉谱系与 FAIR 研究经历出发，研究机器人如何从视频、三维场景与真实交互中学习操作和导航。",
    facts: [
      fact("当前任职", "UIUC Electrical and Computer Engineering 副教授，并列入 Siebel School AI faculty。", sources.saurabhOfficial),
      fact("教育与学术训练", "IIT Delhi 计算机本科；UC Berkeley 计算机博士，导师为 Jitendra Malik。", sources.saurabhHome),
      fact("研究主线", "计算机视觉、机器人学习和具身 AI，覆盖视频学习、移动操作与泛化机器人策略。", sources.saurabhOfficial),
      fact("产业经历", "加入 UIUC 前在 Facebook AI Research Pittsburgh 与 Abhinav Gupta 开展研究。", sources.saurabhHome),
      fact("学生流向", "本人 CV 记录 Matthew Chang 博士毕业后赴 Meta AI Research，Aditya Prakash 博士毕业后赴 Skild AI。", sources.saurabhCv),
    ],
    sources: [sources.saurabhOfficial, sources.saurabhHome, sources.saurabhCv], portraitFile: "saurabh-gupta.jpg", portraitSource: sources.portraitSaurabh,
  }),
  person({
    id: "dilek-hakkani-tur-uiuc-p0-2026", name: "Dilek Hakkani-Tür", role: "Professor · Amazon Scholar", stage: "senior", x: 850, y: 130,
    area: "Conversational AI · Large Language Models · Speech and Language Processing", tags: ["对话系统", "LLM", "语音", "NLP", "Amazon Scholar"],
    summary: "横跨 AT&T、Microsoft、Google、Amazon 与 UIUC 的对话 AI 资深学者，研究知识增强对话、具身智能体与可信大模型。",
    facts: [
      fact("当前任职", "UIUC 计算机教授，并任 Amazon Health Science Amazon Scholar。", sources.dilekOfficial),
      fact("教育与学术训练", "Middle East Technical University 学士；Bilkent University 计算机工程硕士、博士。", sources.dilekOfficial),
      fact("研究主线", "对话 AI、自然语言与语音处理、口语对话系统、知识增强 LLM 和多智能体框架。", sources.dilekOfficial),
      fact("产业轨迹", "曾任 Amazon Alexa AI Senior Principal Scientist、Google Research 对话团队负责人、Microsoft Research Principal Researcher，并在 ICSI 与 AT&T Labs 工作。", sources.dilekOfficial),
      fact("共同项目", "Illinois 官方 CEDAR 报道列其与 Heng Ji 为共同 PI，研究大模型幻觉检测与可信生成。", sources.cedar),
    ],
    sources: [sources.dilekOfficial, sources.cedar], portraitFile: "dilek-hakkani-tur.jpg", portraitSource: sources.portraitDilek,
  }),
  person({
    id: "nan-jiang-uiuc-p0-2026", name: "Nan Jiang", chinese: "姜楠", role: "Associate Professor", stage: "senior", x: 1030, y: 130,
    area: "Reinforcement Learning Theory · Offline RL · Sequential Decision Making", tags: ["强化学习", "Offline RL", "理论", "序列决策"],
    summary: "研究函数逼近和离线数据条件下强化学习理论的 UIUC 学者，连接 Michigan 强化学习谱系与 Microsoft Research。",
    facts: [
      fact("当前任职", "2024 年起任 UIUC 计算机副教授。", sources.nanCv),
      fact("教育与学术训练", "清华自动化学士；2017 年获 University of Michigan 计算机科学与工程博士。", sources.nanOfficial),
      fact("博士师承", "Michigan CSE 官方报道明确写明其博士导师为 Satinder Singh。", sources.nanMichigan),
      fact("研究主线", "强化学习理论，尤其关注函数逼近、离线强化学习和模型选择。", sources.nanOfficial),
      fact("产业研究", "2017–2018 年在 Microsoft Research New York 任博士后研究员。", sources.nanCv),
    ],
    sources: [sources.nanOfficial, sources.nanCv, sources.nanMichigan], portraitFile: "nan-jiang.jpg", portraitSource: sources.portraitNan,
  }),
];

export const candidatePriorityP0UsCanadaBatch2SupportingPeople2026: Person[] = [
  {
    id: "ralph-grishman-lineage-uiuc-p0", name: "Ralph Grishman", role: "Professor Emeritus", institution: "NYU", region: "United States",
    area: "Natural Language Processing · Information Extraction", tags: ["博士导师", "NLP", "信息抽取"],
    summary: "Heng Ji 在纽约大学计算机博士阶段的导师。", stage: "historical", category: "historical",
    status: "supporting mentor node · relationship evidence only", sources: [sources.hengAcl], x: 130, y: 20, primary: false, lastVerifiedAt: checkedAt,
  },
];

const lineage = (id: string, from: string, to: string, label: string, evidence: string, relationSource: Source): Relationship => ({
  id, from, to, type: "lineage", subtype: "phd_adviser", label, evidence, source: relationSource, verified: true,
});

export const candidatePriorityP0UsCanadaBatch2Relationships2026: Relationship[] = [
  lineage("candidate-p0-usca-b2-grishman-ji", "ralph-grishman-lineage-uiuc-p0", "heng-ji-uiuc-p0-2026", "博士导师", "Illinois 官方 ACL Fellow 报道直接称 Ralph Grishman 为 Heng Ji 的 PhD advisor。", sources.hengAcl),
  lineage("candidate-p0-usca-b2-faloutsos-sun", "christos-faloutsos", "jimeng-sun-uiuc-p0-2026", "博士导师", "CMU 官方博士记录列 Christos Faloutsos 为 Jimeng Sun 的博士导师。", sources.jimengThesis),
  lineage("candidate-p0-usca-b2-malik-gupta", "jitendra-malik-us", "saurabh-gupta-uiuc-p0-2026", "博士导师", "Saurabh Gupta 本人 Illinois 主页明确写明其 Berkeley 计算机博士由 Jitendra Malik 指导。", sources.saurabhHome),
  lineage("candidate-p0-usca-b2-singh-jiang", "satinder-singh-us", "nan-jiang-uiuc-p0-2026", "博士导师", "University of Michigan CSE 官方报道明确写明 Nan Jiang 由 Satinder Singh 指导。", sources.nanMichigan),
  {
    id: "candidate-p0-usca-b2-forsyth-gupta-coadvising", from: "david-forsyth-uiuc-p0-2026", to: "saurabh-gupta-uiuc-p0-2026",
    type: "collaboration", subtype: "sustained_collaboration", label: "共同指导学生",
    evidence: "Saurabh Gupta 的 Illinois-hosted CV 记录 Aditya Prakash 由其与 David Forsyth 共同指导。", source: sources.saurabhCv, verified: true,
  },
  {
    id: "candidate-p0-usca-b2-dilek-heng-cedar", from: "dilek-hakkani-tur-uiuc-p0-2026", to: "heng-ji-uiuc-p0-2026",
    type: "collaboration", subtype: "joint_project", label: "CEDAR 共同 PI",
    evidence: "Illinois 官方报道列 Dilek Hakkani-Tür 与 Heng Ji 为 IARPA CEDAR 项目的共同 PI，联合研究 LLM 幻觉与可信生成。", source: sources.cedar, verified: true,
  },
];

export const candidatePriorityP0UsCanadaBatch2Placements2026: StudentPlacement[] = [
  {
    id: "candidate-p0-usca-b2-placement-brett-jones", student: "Brett Jones", teacherId: "david-forsyth-uiuc-p0-2026",
    company: "Lightform", role: "Co-founder", kind: "founder", degree: "PhD", sector: "startup",
    note: "Illinois Vision Group 官方报道将 Brett Jones 列为 Forsyth 指导的博士校友及 Lightform 创始人。", source: sources.davidVision, verifiedAt: checkedAt,
  },
  {
    id: "candidate-p0-usca-b2-placement-matthew-chang", student: "Matthew Chang", teacherId: "saurabh-gupta-uiuc-p0-2026",
    company: "Meta AI Research", role: "Research Scientist", kind: "first_job", degree: "PhD", sector: "industry",
    source: sources.saurabhCv, verifiedAt: checkedAt,
  },
  {
    id: "candidate-p0-usca-b2-placement-aditya-prakash", student: "Aditya Prakash", teacherId: "saurabh-gupta-uiuc-p0-2026",
    company: "Skild AI", role: "Research Scientist", kind: "first_job", degree: "PhD", sector: "startup",
    coAdvisers: ["David Forsyth"], source: sources.saurabhCv, verifiedAt: checkedAt,
  },
];

export const candidatePriorityP0UsCanadaBatch2GroupMembers2026: GroupMember[] = [
  { id: "candidate-p0-usca-b2-gupta-arjun", teacherId: "saurabh-gupta-uiuc-p0-2026", name: "Arjun Gupta", role: "PhD student", focus: "Generalizable mobile manipulation", source: sources.saurabhCv },
  { id: "candidate-p0-usca-b2-gupta-shaowei", teacherId: "saurabh-gupta-uiuc-p0-2026", name: "Shaowei Liu", role: "PhD student · co-advised with Shenlong Wang", focus: "Understanding and generating motion", source: sources.saurabhCv },
  { id: "candidate-p0-usca-b2-gupta-runpei", teacherId: "saurabh-gupta-uiuc-p0-2026", name: "Runpei Dong", role: "PhD student", focus: "Robot learning", source: sources.saurabhCv },
];

export type CandidatePriorityP0UsCanadaBatch2RosterPromotion = {
  unitUrl: string;
  rosterName: string;
  atlasPersonId: string;
};

export const candidatePriorityP0UsCanadaBatch2RosterPromotions2026: CandidatePriorityP0UsCanadaBatch2RosterPromotion[] =
  candidatePriorityP0UsCanadaBatch2People2026.map((entry) => ({ unitUrl, rosterName: entry.name, atlasPersonId: entry.id }));

export const people = [
  ...candidatePriorityP0UsCanadaBatch2People2026,
  ...candidatePriorityP0UsCanadaBatch2SupportingPeople2026,
];
export const relationships = candidatePriorityP0UsCanadaBatch2Relationships2026;
export const placements = candidatePriorityP0UsCanadaBatch2Placements2026;
export const groupMembers = candidatePriorityP0UsCanadaBatch2GroupMembers2026;
export const rosterPromotions = candidatePriorityP0UsCanadaBatch2RosterPromotions2026;
