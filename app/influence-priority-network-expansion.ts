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
  isolaHome: source(
    "Phillip Isola · MIT homepage",
    "https://web.mit.edu/phillipi/www/",
    "profile",
    "MIT 现职、Ted Adelson 博士指导、Alexei Efros 博士后指导、OpenAI 经历与当前研究组",
  ),
  isolaMit: source(
    "MIT CSAIL · Phillip Isola",
    "https://www.csail.mit.edu/person/phillip-isola",
    "official",
    "MIT 任职与计算机视觉、机器学习研究方向",
  ),
  suhrSimons: source(
    "Simons Institute · Alane Suhr",
    "https://simons.berkeley.edu/people/alane-suhr",
    "official",
    "Berkeley 现职、Yoav Artzi 博士指导与 Yejin Choi 团队经历",
  ),
  suhrBerkeley: source(
    "UC Berkeley Research · Alane Suhr",
    "https://vcresearch.berkeley.edu/faculty/alane-suhr",
    "official",
    "Berkeley faculty 身份与研究方向",
  ),
  demszkyStanford: source(
    "Stanford GSE · Dora Demszky",
    "https://ed.stanford.edu/faculty/ddemszky",
    "official",
    "Stanford 现职、Dan Jurafsky 博士指导与教育 NLP 研究",
  ),
  maartenThesis: source(
    "Maarten Sap · University of Washington dissertation",
    "https://homes.cs.washington.edu/~msap/pdfs/sap2021positiveAIwithSocialCommonsenseModels.pdf",
    "thesis",
    "2021 年博士论文及 Yejin Choi、Noah A. Smith 共同指导记录",
  ),
  maartenCmu: source(
    "CMU LTI · Maarten Sap",
    "https://www.lti.cs.cmu.edu/people/faculty/sap-maarten.html",
    "official",
    "CMU 现职、社会智能与负责任 NLP 研究方向",
  ),
  shuranStanford: source(
    "Stanford Profiles · Shuran Song",
    "https://profiles.stanford.edu/shuran-song",
    "official",
    "Stanford 现职、教育经历、研究方向及当前博士论文指导名单",
  ),
  shuranPrinceton: source(
    "Princeton CS · Shuran Song wins Facebook Fellowship",
    "https://www.cs.princeton.edu/news/shuran-song-wins-facebook-fellowship",
    "official",
    "Princeton 博士阶段的研究与 Jianxiong Xiao 指导记录",
  ),
  dawnBerkeley: source(
    "UC Berkeley EECS · Dawn Song",
    "https://www2.eecs.berkeley.edu/Faculty/Homepages/song.html",
    "official",
    "Berkeley 现职、RDI 领导角色与 AI 安全研究",
  ),
  dawnPastStudents: source(
    "Dawn Song · Former Students and Postdocs",
    "https://people.eecs.berkeley.edu/~dawnsong/past-students.html",
    "profile",
    "Dawn Song 本人维护的博士生、博士后与离组时去向名录",
  ),
  brumleyCmu: source(
    "CMU CyLab · David Brumley",
    "https://www.cylab.cmu.edu/directory/bios/brumley-david.html",
    "official",
    "CMU 教授任职、教育经历、软件安全研究与 CyLab 经历",
  ),
  gaoSmu: source(
    "SMU SCIS · Debin Gao",
    "https://computing.smu.edu.sg/faculty/profile/346/debin-gao-346",
    "official",
    "SMU 副院长、教授、中心主任职务，博士经历及网络安全研究",
  ),
  liangNus: source(
    "NUS · Zhenkai Liang",
    "https://www.comp.nus.edu.sg/~liangzk/index.html",
    "profile",
    "NUS 副教授、NCL 共同首席研究员、研究组与招生信息",
  ),
  takeoCmu: source(
    "CMU Robotics Institute · Takeo Kanade",
    "https://www.ri.cmu.edu/ri-faculty/takeo-kanade/",
    "official",
    "CMU University Professor 任职、研究方向、实验室和学生入口",
  ),
};

const portrait = (src: string, alt: string, portraitSource: Source): NonNullable<Person["portrait"]> => ({
  src,
  alt,
  source: portraitSource,
});

const alumniPerson = (args: {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Person["institution"];
  region: Person["region"];
  area: string;
  tags: string[];
  summary: string;
  facts: NonNullable<Person["facts"]>;
  sources: Source[];
  portrait: NonNullable<Person["portrait"]>;
  x: number;
  y: number;
  stage?: Person["stage"];
}): Person => ({
  ...args,
  stage: args.stage ?? "senior",
  category: "adjacent",
  status: "current PI · verified adviser lineage",
  primary: true,
  lastVerifiedAt: checkedAt,
  introducedAt: checkedAt,
});

/**
 * P0 sample selected by the influence-priority rule: current faculty trained by a
 * senior Berkeley AI-security leader, including one formal academic leader at SMU.
 */
export const influencePriorityPeople: Person[] = [
  alumniPerson({
    id: "david-brumley-cmu",
    name: "David Brumley",
    role: "Professor of ECE · Affiliated Professor of Computer Science",
    institution: "CMU",
    region: "United States",
    area: "Software Security · AI/ML Security · Program Analysis",
    tags: ["软件安全", "AI 安全", "程序分析", "Dawn Song 博士谱系", "ForAllSecure"],
    summary: "CMU 软件安全资深教授与 ForAllSecure 创业者；Dawn Song 本人名录将其列为博士毕业生，当前官方简介记录其曾任 CyLab 主任。",
    facts: [
      { label: "当前任职", value: "Carnegie Mellon University ECE 教授，并在 Computer Science Department 兼任。", source: sources.brumleyCmu },
      { label: "教育与学术训练", value: "2008 年获 Carnegie Mellon University 计算机科学博士学位。", source: sources.brumleyCmu },
      { label: "研究主线", value: "软件安全、程序分析、形式化方法，以及 AI/ML 系统安全。", source: sources.brumleyCmu },
      { label: "学术谱系", value: "Dawn Song 本人维护的历届学生页将 David Brumley 列为博士毕业生。", source: sources.dawnPastStudents },
      { label: "为什么值得关注", value: "将 Dawn Song 的系统安全谱系延伸到 CMU、CyLab 与自动化安全创业。", source: sources.brumleyCmu },
    ],
    sources: [sources.brumleyCmu, sources.dawnPastStudents],
    portrait: portrait("portraits/influence-priority/david-brumley-cmu.jpg", "David Brumley official portrait", sources.brumleyCmu),
    x: 1110,
    y: 690,
  }),
  alumniPerson({
    id: "debin-gao-smu",
    name: "Debin Gao",
    role: "Associate Dean (Research) · Professor · Centre Director",
    institution: "SMU",
    region: "Singapore",
    area: "Cybersecurity · Trustworthy AI Systems · Software Security",
    tags: ["网络安全", "可信 AI", "副院长", "中心主任", "Dawn Song 博士谱系"],
    summary: "SMU SCIS 研究副院长、计算机科学教授及安全中心主任；属于正式领导职位触发的深挖节点，上游连接 Dawn Song 的博士培养谱系。",
    facts: [
      { label: "当前任职", value: "SMU SCIS Associate Dean (Research)、Professor of Computer Science，并任 SMC 主任。", source: sources.gaoSmu },
      { label: "教育与学术训练", value: "SMU 官方履历记录其 2006 年获 Carnegie Mellon University 博士学位。", source: sources.gaoSmu },
      { label: "研究主线", value: "网络安全、软件工程，以及数字平台和 AI 系统的安全与治理。", source: sources.gaoSmu },
      { label: "学术谱系", value: "Dawn Song 本人维护的历届学生页将 Debin Gao 列为博士毕业生。", source: sources.dawnPastStudents },
      { label: "为什么值得关注", value: "兼具导师谱系、学院管理与安全研究中心领导角色，是跨地区学术扩散的高信息密度节点。", source: sources.gaoSmu },
    ],
    sources: [sources.gaoSmu, sources.dawnPastStudents],
    portrait: portrait("portraits/influence-priority/debin-gao-smu.jpg", "Debin Gao official portrait", sources.gaoSmu),
    x: 1150,
    y: 640,
  }),
  alumniPerson({
    id: "zhenkai-liang-nus",
    name: "Zhenkai Liang",
    chinese: "梁振凯",
    role: "Associate Professor · Co-lead PI, National Cybersecurity R&D Lab",
    institution: "NUS",
    region: "Singapore",
    area: "Systems Security · Cybersecurity · Security Education",
    tags: ["系统安全", "网络安全", "NCL", "Dawn Song 博士后谱系", "招生"],
    summary: "NUS 系统安全独立 PI 与国家网络安全研发实验室共同负责人；Dawn Song 的公开名录记录其博士后训练。",
    facts: [
      { label: "当前任职", value: "NUS School of Computing 副教授，并共同领导 National Cybersecurity R&D Laboratory。", source: sources.liangNus },
      { label: "教育与学术训练", value: "Dawn Song 本人维护的名录将其列为 2008 年离组博士后。", source: sources.dawnPastStudents },
      { label: "研究主线", value: "系统与系统安全、网络安全的社会经济问题，以及安全教育。", source: sources.liangNus },
      { label: "团队建设", value: "领导 Curiosity Research Group，并公开招募本科、硕士、博士与博士后。", source: sources.liangNus },
      { label: "为什么值得关注", value: "把 Berkeley/CMU 安全谱系延伸到 NUS 与新加坡国家级网络安全研发平台。", source: sources.liangNus },
    ],
    sources: [sources.liangNus, sources.dawnPastStudents],
    portrait: portrait("portraits/influence-priority/zhenkai-liang-nus.jpg", "Zhenkai Liang official portrait", sources.liangNus),
    x: 250,
    y: 640,
  }),
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: NonNullable<Relationship["subtype"]>,
  evidence: string,
  relationshipSource: Source,
  endYear?: number,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "postdoc_mentor" ? "博士后指导" : subtype === "co_adviser" ? "共同博士导师" : "博士导师",
  evidence,
  evidenceObject: "Explicit adviser, dissertation committee or mentor-maintained alumni record",
  source: relationshipSource,
  verified: true,
  endYear,
});

/** Adviser points to trainee. No edge is inferred from ordinary co-authorship or prestige. */
export const influencePriorityRelationships: Relationship[] = [
  lineage("influence-efros-isola-postdoc", "alexei-efros-us", "phillip-isola-us", "postdoc_mentor", "Phillip Isola 本人主页明确记录其在 Berkeley 由 Alexei Efros 指导博士后研究。", sources.isolaHome),
  lineage("influence-choi-sap-coadvisor", "yejin-choi-us", "maarten-sap-award", "co_adviser", "Maarten Sap 的 University of Washington 博士论文将 Yejin Choi 列为 supervisory committee co-chair，并在致谢中称为 advisor。", sources.maartenThesis, 2021),
  lineage("influence-smith-sap-coadvisor", "noah-smith-us", "maarten-sap-award", "co_adviser", "Maarten Sap 的 University of Washington 博士论文将 Noah A. Smith 列为 supervisory committee co-chair，并在致谢中称为 advisor。", sources.maartenThesis, 2021),
  lineage("influence-dawn-brumley-phd", "dawn-song-award", "david-brumley-cmu", "phd_adviser", "Dawn Song 本人维护的 former students 名录将 David Brumley 列在 Graduated PhD Students 下。", sources.dawnPastStudents, 2008),
  lineage("influence-dawn-gao-phd", "dawn-song-award", "debin-gao-smu", "phd_adviser", "Dawn Song 本人维护的 former students 名录将 Debin Gao 列在 Graduated PhD Students 下。", sources.dawnPastStudents),
  lineage("influence-dawn-liang-postdoc", "dawn-song-award", "zhenkai-liang-nus", "postdoc_mentor", "Dawn Song 本人维护的 former students 名录将 Zhenkai Liang 列在 Graduated Postdocs 下。", sources.dawnPastStudents, 2008),
];

export const influencePriorityGroupMembers: GroupMember[] = [
  ...["Yihuai Gao", "Zeyi Liu", "Chuer Pan", "Austin Patel", "Xiaomeng Xu", "Mandi Zhao"].map((name, index): GroupMember => ({
    id: `influence-shuran-doctoral-${index + 1}`,
    teacherId: "shuran-song-us",
    name,
    role: "Doctoral Dissertation Advisee",
    focus: "Stanford Profiles 当前博士论文指导名录",
    source: sources.shuranStanford,
  })),
];

export const influencePriorityPlacements: StudentPlacement[] = [
  { id: "influence-dawn-brumley-cmu", student: "David Brumley", teacherId: "dawn-song-award", company: "Carnegie Mellon University", department: "ECE / Computer Science", role: "Professor", kind: "current", sector: "academia", source: sources.brumleyCmu, verifiedAt: checkedAt },
  { id: "influence-dawn-gao-smu", student: "Debin Gao", teacherId: "dawn-song-award", company: "Singapore Management University", department: "SCIS", role: "Associate Dean (Research) · Professor · Centre Director", kind: "current", highLevel: true, sector: "academia", source: sources.gaoSmu, verifiedAt: checkedAt },
  { id: "influence-dawn-liang-nus", student: "Zhenkai Liang", teacherId: "dawn-song-award", company: "National University of Singapore", department: "School of Computing / NCL", role: "Associate Professor · Co-lead PI", kind: "current", highLevel: true, sector: "academia", source: sources.liangNus, verifiedAt: checkedAt },
];

export const influencePriorityPersonEnhancements: Record<string, Partial<Person>> = {
  "phillip-isola-us": {
    summary: "MIT 视觉与生成建模独立 PI；上游连接 Ted Adelson 的视觉科学博士训练与 Alexei Efros 的 Berkeley 博士后网络，并有 OpenAI 访问研究经历。",
    facts: [
      { label: "当前角色", value: "MIT EECS Associate Professor，研究 computer vision、machine learning 与 AI。", source: sources.isolaHome },
      { label: "博士导师", value: "Ted Adelson · MIT Brain and Cognitive Sciences。", source: sources.isolaHome },
      { label: "博士后导师", value: "Alexei Efros · UC Berkeley EECS。", source: sources.isolaHome },
      { label: "人才网络", value: "当前公开研究组列 10 名博士生与 1 名博士后。", source: sources.isolaHome },
      { label: "为什么值得关注", value: "连接经典视觉科学、Berkeley 视觉谱系与生成式/具身智能研究。", source: sources.isolaMit },
    ],
    sources: [sources.isolaHome, sources.isolaMit],
    lastVerifiedAt: checkedAt,
  },
  "alane-suhr-us": {
    summary: "Berkeley 具身与交互语言方向青年 PI；博士导师为 Yoav Artzi，随后在 Yejin Choi 领导的 AI2 Mosaic 团队完成 Young Investigator 阶段。",
    facts: [
      { label: "当前角色", value: "UC Berkeley EECS Assistant Professor。", source: sources.suhrSimons },
      { label: "博士导师", value: "Yoav Artzi · Cornell Computer Science。", source: sources.suhrSimons },
      { label: "博士后阶段", value: "AI2 Mosaic Young Investigator，团队由 Yejin Choi 领导。", source: sources.suhrSimons },
      { label: "为什么值得关注", value: "同时连接 Cornell grounded language 与 AI2 社会/常识智能网络。", source: sources.suhrBerkeley },
    ],
    sources: [sources.suhrSimons, sources.suhrBerkeley],
    lastVerifiedAt: checkedAt,
  },
  "dora-demszky-us": {
    summary: "Stanford 教育数据科学青年 PI；博士由 Dan Jurafsky 指导，把 NLP 方法延伸到教师反馈、课堂对话与教育公平。",
    facts: [
      { label: "当前角色", value: "Stanford Graduate School of Education Assistant Professor。", source: sources.demszkyStanford },
      { label: "博士导师", value: "Dan Jurafsky · Stanford Linguistics。", source: sources.demszkyStanford },
      { label: "研究主线", value: "面向公平和以学生为中心教学的 NLP、反馈系统与课堂话语分析。", source: sources.demszkyStanford },
      { label: "为什么值得关注", value: "代表 Stanford NLP 谱系向教育科学和真实课堂干预的跨学院扩散。", source: sources.demszkyStanford },
    ],
    sources: [sources.demszkyStanford],
    lastVerifiedAt: checkedAt,
  },
  "maarten-sap-award": {
    summary: "CMU 社会智能与负责任 NLP 青年 PI；UW 博士论文明确列 Yejin Choi 与 Noah A. Smith 为共同主席，形成 AI2/UW 双导师谱系。",
    facts: [
      { label: "当前角色", value: "CMU Language Technologies Institute 与 HCII Assistant Professor。", source: sources.maartenCmu },
      { label: "共同博士导师", value: "Yejin Choi、Noah A. Smith · University of Washington。", source: sources.maartenThesis },
      { label: "研究主线", value: "社会常识、对话智能、语言偏见与负责任 AI。", source: sources.maartenCmu },
      { label: "为什么值得关注", value: "把 UW/AI2 的常识与社会智能谱系带到 CMU，且已形成独立研究方向。", source: sources.maartenThesis },
    ],
    sources: [sources.maartenCmu, sources.maartenThesis],
    lastVerifiedAt: checkedAt,
  },
  "shuran-song-us": {
    summary: "Stanford REAL Lab 负责人；Princeton 博士阶段公开记录由 Jianxiong Xiao 指导，当前 Stanford 官方页面列出 6 名博士论文指导对象。",
    facts: [
      { label: "当前角色", value: "Stanford Electrical Engineering Assistant Professor。", source: sources.shuranStanford },
      { label: "博士训练", value: "Princeton Computer Science PhD；Princeton 官方报道记录 Jianxiong Xiao 的指导。", source: sources.shuranPrinceton },
      { label: "当前博士生体系", value: "Stanford Profiles 列出 6 名 Doctoral Dissertation Advisee。", source: sources.shuranStanford },
      { label: "为什么值得关注", value: "是从 3D 视觉转向具身智能、机器人操作和视觉—行动学习的重要青年团队。", source: sources.shuranStanford },
    ],
    sources: [sources.shuranStanford, sources.shuranPrinceton],
    lastVerifiedAt: checkedAt,
  },
  "dawn-song-award": {
    summary: "Berkeley AI 安全与系统安全资深 PI；本人公开名录显示其博士与博士后网络已扩散到 CMU、SMU、NUS 及工业研究机构。",
    facts: [
      { label: "当前角色", value: "UC Berkeley EECS Professor，并担任 Berkeley RDI 联合负责人。", source: sources.dawnBerkeley },
      { label: "研究主线", value: "AI 安全、agentic AI、深度学习安全、隐私与去中心化技术。", source: sources.dawnBerkeley },
      { label: "公开培养体系", value: "本人名录列出 7 名博士毕业生、2 名博士后、1 名访问学生和 4 名硕士毕业生。", source: sources.dawnPastStudents },
      { label: "学术扩散", value: "已核验的人才路径连接 CMU、SMU 与 NUS；图中同时保留当前去向与原始导师名录证据。", source: sources.dawnPastStudents },
      { label: "为什么值得关注", value: "其网络同时跨越 AI 安全、系统安全、大学研究中心与技术创业。", source: sources.dawnBerkeley },
    ],
    sources: [sources.dawnBerkeley, sources.dawnPastStudents],
    lastVerifiedAt: checkedAt,
    knownAlumniCount: 14,
  },
  "takeo-kanade-historical": {
    summary: "CMU Robotics Institute 视觉与机器人奠基者；当前官方页不仅列 University Professor 身份，也公开保留 Students/Affiliates 入口和长期项目脉络。",
    facts: [
      { label: "当前角色", value: "SCS Founders University Professor · CMU Robotics Institute / CSD。", source: sources.takeoCmu },
      { label: "研究主线", value: "计算机视觉、三维视觉、运动与立体感知、医疗机器人及自主系统。", source: sources.takeoCmu },
      { label: "人才体系入口", value: "CMU 官方人物页提供 Students/Affiliates 与实验室入口；后续审计以明确导师记录逐项建边。", source: sources.takeoCmu },
      { label: "为什么值得关注", value: "属于需要按长期学生体系持续反查的奠基型节点，而不应只依靠当前合著关系衡量影响。", source: sources.takeoCmu },
    ],
    sources: [sources.takeoCmu],
    lastVerifiedAt: checkedAt,
  },
};

export const influencePriorityReviewedIds = [
  "phillip-isola-us",
  "alane-suhr-us",
  "dora-demszky-us",
  "maarten-sap-award",
  "shuran-song-us",
  "dawn-song-award",
  "david-brumley-cmu",
  "debin-gao-smu",
  "zhenkai-liang-nus",
] as const;
