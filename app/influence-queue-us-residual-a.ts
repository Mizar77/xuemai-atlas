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
  mittalPrinceton: source(
    "Princeton ECE · Prateek Mittal",
    "https://ece.princeton.edu/people/prateek-mittal",
    "official",
    "Prateek Mittal 的教授与系领导职务、教育、研究方向和官方 advisee 名单",
  ),
  mittalCitp: source(
    "Princeton CITP · Prateek Mittal",
    "https://citp.princeton.edu/people/prateek-mittal",
    "official",
    "Prateek Mittal 的 CITP faculty 身份和隐私、安全研究主线",
  ),
  birdCdu: source(
    "Charles Darwin University · Steven Bird",
    "https://researchers.cdu.edu.au/en/persons/steven-bird/",
    "official",
    "Steven Bird 的 CDU 现职、学术轨迹、研究方向、博士学位和 Top End Language Lab 领导角色",
  ),
  birdLanguageLab: source(
    "Charles Darwin University · Top End Language Lab",
    "https://language-lab.cdu.edu.au/",
    "official",
    "Top End Language Lab 的 staff、博士生及其研究主题",
  ),
  tengyuHome: source(
    "Tengyu Ma · Stanford homepage",
    "https://ai.stanford.edu/~tengyuma/",
    "profile",
    "Tengyu Ma 的 Stanford 任职、研究方向、当前博士生与博士后和校友去向",
  ),
  tengyuPrinceton: source(
    "Princeton Computer Science · Tengyu Ma IBM Fellowship",
    "https://www.cs.princeton.edu/news/tengyu-ma-receives-ibm-fellowship-award",
    "official",
    "Princeton 官方报道明确 Tengyu Ma 博士期间与 Sanjeev Arora 工作，研究机器学习算法",
  ),
  aikenHome: source(
    "Alex Aiken · Stanford homepage",
    "https://theory.stanford.edu/~aiken/",
    "profile",
    "Alex Aiken 的 Stanford 与 SLAC 现职、教育、学术轨迹、研究项目和当前团队",
  ),
  aikenStudents: source(
    "Alex Aiken · Graduated PhD students",
    "https://theory.stanford.edu/~aiken/phds.html",
    "profile",
    "Alex Aiken 本人维护的 primary-adviser 博士毕业生、论文与当前去向名录",
  ),
  solarHome: source(
    "Armando Solar-Lezama · MIT homepage",
    "https://people.csail.mit.edu/asolar/",
    "profile",
    "Armando Solar-Lezama 的 MIT 与 CSAIL 领导职务、研究方向、博士导师及 CAP Group 领导角色",
  ),
  solarCap: source(
    "MIT CSAIL · Computer-Aided Programming Group",
    "https://groups.csail.mit.edu/cap/",
    "official",
    "CAP Group 的研究项目、团队校友及公开去向",
  ),
  roseCmu: source(
    "CMU HCII · Carolyn Rosé",
    "https://hcii.cmu.edu/people/carolyn-rose",
    "official",
    "Carolyn Rosé 的讲席教授职务、跨 LTI/HCII 任职、研究方向和 Teledia 领导角色",
  ),
  roseHome: source(
    "Carolyn Penstein Rosé · homepage",
    "https://cp3a.github.io/",
    "profile",
    "Carolyn Rosé 本人对 Teledia 跨学科实验室、当前工作和学术服务的说明",
  ),
  roseTeam: source(
    "Carolyn Penstein Rosé · Teledia Team",
    "https://cp3a.github.io/Teledia%20Team/",
    "profile",
    "Teledia 当前博士生、硕士生、团队成员及历届博士生去向",
  ),
  pottsHome: source(
    "Christopher Potts · Stanford homepage",
    "https://web.stanford.edu/~cgpotts/",
    "profile",
    "Christopher Potts 的 Stanford Linguistics 与 Computer Science 任职",
  ),
  pottsStudents: source(
    "Christopher Potts · Students",
    "https://web.stanford.edu/~cgpotts/students.html",
    "profile",
    "Christopher Potts 本人维护的当前博士生、共同导师、博士毕业生与博士后名单",
  ),
  cardieCornell: source(
    "Cornell Bowers · Claire Cardie",
    "https://www.cs.cornell.edu/people/claire-cardie",
    "official",
    "Claire Cardie 的讲席教授与副院长职务、教育、研究方向和学术荣誉",
  ),
  cornellPhdAlumni: source(
    "Cornell Computer Science · PhD alumni by adviser",
    "https://www.cs.cornell.edu/phd-computer-science/alumni",
    "official",
    "Cornell 官方博士校友表中的学生、导师和毕业年份字段",
  ),
  daskalakisHome: source(
    "Constantinos Daskalakis · MIT homepage",
    "https://people.csail.mit.edu/costis/",
    "profile",
    "Constantinos Daskalakis 的 MIT 讲席教授与 Archimedes AI 职务、研究方向、奖项和学生名录",
  ),
  daskalakisThesis: source(
    "Constantinos Daskalakis · Berkeley doctoral dissertation",
    "https://people.csail.mit.edu/costis/thesis.pdf",
    "thesis",
    "博士论文委员会记录 Christos Papadimitriou 的指导身份",
  ),
  cristianCornell: source(
    "Cornell Bowers · Cristian Danescu-Niculescu-Mizil",
    "https://bowers.cornell.edu/people/cristian-danescu-niculescu-mizil",
    "official",
    "Cristian Danescu-Niculescu-Mizil 的 Cornell 教授任职和计算社会科学研究方向",
  ),
  cristianChangThesis: source(
    "Cornell · Jonathan P. Chang doctoral dissertation",
    "https://www.cs.cornell.edu/~cristian/papers/chang_thesis.pdf",
    "thesis",
    "Jonathan P. Chang 博士论文致谢明确 Cristian Danescu-Niculescu-Mizil 为导师",
  ),
  cristianZhangThesis: source(
    "Cornell eCommons · Justine Zhang doctoral dissertation",
    "https://ecommons.cornell.edu/bitstreams/66ef551d-7b78-4406-a32f-aff8dfcbcf17/download",
    "thesis",
    "Justine Zhang 博士论文致谢明确 Cristian Danescu-Niculescu-Mizil 为导师",
  ),
  cristianGangavarapu: source(
    "Tushaar Gangavarapu · homepage",
    "https://tushaargvs.github.io/",
    "profile",
    "Tushaar Gangavarapu 本人说明此前在 Cornell 由 Sasha Rush 与 Cristian Danescu-Niculescu-Mizil 指导",
  ),
  brumleyCmu: source(
    "CMU Engineering · David Brumley",
    "https://engineering.cmu.edu/directory/bios/brumley-david.html",
    "official",
    "David Brumley 的 CMU 教授职务、教育、软件安全方向及 PPP faculty mentor 身份",
  ),
  brumleyHome: source(
    "David Brumley · CMU homepage",
    "https://users.ece.cmu.edu/~dbrumley/index.html",
    "profile",
    "David Brumley 本人维护的博士生、博士后、去向及 ForAllSecure 创业信息",
  ),
  giffordMit: source(
    "MIT EECS · David Gifford",
    "https://www.eecs.mit.edu/people/david-gifford/",
    "official",
    "David Gifford 的 MIT 教授职务及 AI for Healthcare and Life Sciences 研究方向",
  ),
  giffordLab: source(
    "MIT · Gifford Laboratory team",
    "https://cgs.csail.mit.edu/team/",
    "official",
    "Gifford Lab 当前与历届研究生、博士后及公开去向",
  ),
};

const fact = (label: string, value: string, factSource: Source): NonNullable<Person["facts"]>[number] => ({
  label,
  value,
  source: factSource,
});

const member = (
  teacherId: string,
  slug: string,
  name: string,
  role: string,
  memberSource: Source,
  focus?: string,
): GroupMember => ({
  id: `influence-us-residual-a-${teacherId}-${slug}`,
  teacherId,
  name,
  role,
  focus,
  source: memberSource,
});

const enhancement = (
  summary: string,
  personSources: Source[],
  facts: NonNullable<Person["facts"]>,
  extra: Partial<Person> = {},
): Partial<Person> => ({
  ...extra,
  summary,
  facts,
  sources: personSources,
  lastVerifiedAt: checkedAt,
});

/**
 * Final US residual slice of the influence-priority queue. Every named team or
 * student record below is supported by an official university page, a faculty-
 * maintained roster, a CV, or a dissertation. Co-authorship alone is never
 * converted into supervision or group membership.
 */
export const influenceQueueUsResidualAPeople: Person[] = [];

export const influenceQueueUsResidualAPersonEnhancements: Record<string, Partial<Person>> = {
  "prateek-mittal-award": enhancement(
    "Princeton 隐私、安全与对抗机器学习资深 PI；同时担任 ECE Associate Chair，并在官方档案公开列出当前 advisees。",
    [sources.mittalPrinceton, sources.mittalCitp],
    [
      fact("当前任职", "Princeton ECE 教授、Associate Chair 与 Associate Director of Undergraduate Studies。", sources.mittalPrinceton),
      fact("跨院身份", "同时为 Computer Science 与 Center for Information Technology Policy associated faculty。", sources.mittalPrinceton),
      fact("研究主线", "隐私保护与安全系统、安全/隐私机器学习、网络系统与应用密码学。", sources.mittalPrinceton),
      fact("人才培养", "Princeton 官方档案公开列出 David Huang、Cyrill Krähenbühl、Seungju Lee 等 advisees。", sources.mittalPrinceton),
    ],
  ),
  "steven-bird-us": enhancement(
    "现任 Charles Darwin University 教授、Top End Language Lab 负责人；从计算语言学基础设施转向 Indigenous languages、语言活力与社区主导的 AI。",
    [sources.birdCdu, sources.birdLanguageLab],
    [
      fact("当前任职", "Charles Darwin University Faculty of Arts and Society / Northern Institute 教授。", sources.birdCdu),
      fact("实验室", "自 2017 年起在 CDU 任 research professor，并领导 Top End Language Lab。", sources.birdCdu),
      fact("基础设施贡献", "建立 ACL Anthology、Open Language Archives Community 与 Natural Language Toolkit，并曾任 ACL 主席。", sources.birdCdu),
      fact("当前研究", "少数化语言、Indigenous language vitality、跨文化沟通及社区控制下的生成式 AI。", sources.birdLanguageLab),
    ],
    {
      role: "Professor · Director, Top End Language Lab",
      actualInstitution: "Charles Darwin University · Northern Institute",
    },
  ),
  "tengyu-ma-award": enhancement(
    "Stanford 机器学习理论与基础模型 PI，研究预训练、强化学习、鲁棒性、非凸优化和高维统计；Princeton 官方材料明确其博士阶段由 Sanjeev Arora 指导。",
    [sources.tengyuHome, sources.tengyuPrinceton],
    [
      fact("当前任职", "Stanford Computer Science Assistant Professor。", sources.tengyuHome),
      fact("研究主线", "机器学习算法与理论、深度强化学习、预训练/基础模型、鲁棒性与优化。", sources.tengyuHome),
      fact("博士导师", "Princeton 官方报道明确其博士期间与 Sanjeev Arora 工作。", sources.tengyuPrinceton),
      fact("人才培养", "本人主页分列当前博士生/博士后，并公开多名校友在 OpenAI、Anthropic、Meta 与 TTIC 的去向。", sources.tengyuHome),
    ],
  ),
  "alex-aiken-lineage": enhancement(
    "Stanford 编程语言与 AI systems 资深教授，兼任 SLAC Computer Science Division Director；本人维护了 1999—2026 年完整 primary-adviser 博士谱系。",
    [sources.aikenHome, sources.aikenStudents],
    [
      fact("当前任职", "Stanford Alcatel-Lucent Professor，同时任 SLAC Computer Science Division Director。", sources.aikenHome),
      fact("学术轨迹", "Cornell 博士；曾任 IBM Almaden research staff 与 Berkeley EECS 教授，2003 年加入 Stanford。", sources.aikenHome),
      fact("研究主线", "编程语言、程序分析，以及面向深度学习训练和推理的自动并行系统。", sources.aikenHome),
      fact("人才培养", "本人页面列出 36 名由其担任 primary adviser 的毕业博士及论文、去向。", sources.aikenStudents),
    ],
  ),
  "armando-solar-lezama-lineage": enhancement(
    "MIT 程序综合与神经符号编程带头人，现任 Distinguished Professor of Computing、CSAIL Associate Director and COO，并领导 Computer-Aided Programming Group。",
    [sources.solarHome, sources.solarCap],
    [
      fact("当前任职", "MIT Distinguished Professor of Computing；CSAIL Associate Director and COO。", sources.solarHome),
      fact("博士训练", "2008 年获 Berkeley 博士，明确由 Rastislav Bodik 指导。", sources.solarHome),
      fact("研究主线", "程序综合、自动推理、神经符号编程及可预测、稳健的学习系统。", sources.solarHome),
      fact("研究共同体", "领导 MIT Computer-Aided Programming Group；官方组页列出项目与完整校友去向。", sources.solarCap),
    ],
  ),
  "carolyn-rose-us": enhancement(
    "CMU Kavčić-Moura 讲席教授，跨 LTI 与 HCII，领导 Teledia 实验室，把对话技术、学习科学与人机协作连接起来。",
    [sources.roseCmu, sources.roseHome, sources.roseTeam],
    [
      fact("当前任职", "CMU Kavčić-Moura Professor of Language Technologies and Human-Computer Interaction。", sources.roseCmu),
      fact("实验室", "领导跨博士、硕士、本科、staff 与 affiliates 的 Teledia Lab。", sources.roseHome),
      fact("研究主线", "计算话语分析、对话代理、协作学习、社会计算与 human-centered AI。", sources.roseCmu),
      fact("人才培养", "Teledia 团队页公开当前 LTI/HCII 学生及历届博士生的学术界、工业界去向。", sources.roseTeam),
    ],
  ),
  "christopher-potts-us": enhancement(
    "Stanford 计算语义与语用学资深教授，兼任 Computer Science courtesy faculty；本人维护当前博士生、共同导师和完整毕业生名录。",
    [sources.pottsHome, sources.pottsStudents],
    [
      fact("当前任职", "Stanford Professor of Linguistics，并兼任 Computer Science courtesy professor。", sources.pottsHome),
      fact("研究定位", "连接形式语义、语用学、自然语言推理与计算建模。", sources.pottsHome),
      fact("当前培养", "本人 roster 公开列出 Stanford Linguistics 与 Computer Science 当前博士生。", sources.pottsStudents),
      fact("共同指导", "学生页逐名标注与 Dan Jurafsky、Beth Levin、Diyi Yang、Tatsunori Hashimoto 等共同指导的博士生。", sources.pottsStudents),
    ],
  ),
  "claire-cardie-us": enhancement(
    "Cornell NLP 奠基型资深教授与学院教育领导者，长期研究信息抽取、总结、观点与论证分析；Cornell 官方校友表保存其博士培养谱系。",
    [sources.cardieCornell, sources.cornellPhdAlumni],
    [
      fact("当前任职", "Cornell John C. Ford Professor，并任 Cornell Bowers inaugural Associate Dean for Education。", sources.cardieCornell),
      fact("机构建设", "曾任 Cornell Information Science founding chair，并领导相关学术项目建设。", sources.cardieCornell),
      fact("研究主线", "信息抽取、文本总结、共指、观点、论证与欺骗检测。", sources.cardieCornell),
      fact("人才培养", "Cornell 官方博士校友表长期记录 Cardie 指导的毕业生与毕业年份。", sources.cornellPhdAlumni),
    ],
  ),
  "constantinos-daskalakis-award": enhancement(
    "MIT 理论计算与机器学习资深带头人，研究博弈、机制设计、统计与多智能体学习；本人主页公开当前和历届博士生、博士后及去向。",
    [sources.daskalakisHome, sources.daskalakisThesis],
    [
      fact("当前任职", "MIT Avanessians Professor，兼任 CSAIL、LIDS、ORC 与 FoDS investigator。", sources.daskalakisHome),
      fact("学术创业", "Archimedes AI research center 联合创办人兼 chief scientist。", sources.daskalakisHome),
      fact("博士导师", "Berkeley 博士论文记录 Christos Papadimitriou 为指导委员会主席。", sources.daskalakisThesis),
      fact("人才培养", "本人主页分列当前博士生、历届博士生与博士后，并公开多位 faculty 去向。", sources.daskalakisHome),
    ],
  ),
  "cristian-danescu-us": enhancement(
    "Cornell 计算社会科学与 NLP 教授，研究语言、社会互动和在线社区；博士论文与学生本人材料明确记录多条指导关系。",
    [sources.cristianCornell, sources.cristianChangThesis, sources.cristianZhangThesis, sources.cristianGangavarapu],
    [
      fact("当前任职", "Cornell Bowers Information Science 教授。", sources.cristianCornell),
      fact("研究主线", "以 NLP 和计算社会科学研究对话实践、在线社区与支持人际沟通的 AI。", sources.cristianCornell),
      fact("博士培养", "Jonathan P. Chang 与 Justine Zhang 的博士论文均明确称其为 advisor。", sources.cristianChangThesis),
      fact("共同指导", "Tushaar Gangavarapu 本人记录此前在 Cornell 由 Sasha Rush 与 Cristian 共同指导。", sources.cristianGangavarapu),
    ],
  ),
  "david-brumley-cmu": enhancement(
    "CMU 软件安全资深教授、前 CyLab Director 与 ForAllSecure CEO；本人公开博士生、博士后、创业和学术去向。",
    [sources.brumleyCmu, sources.brumleyHome],
    [
      fact("当前任职", "CMU ECE 教授，并在 Computer Science Department 兼任 courtesy appointment。", sources.brumleyCmu),
      fact("研究主线", "软件安全、程序分析、自动漏洞发现与可利用性验证。", sources.brumleyHome),
      fact("产业连接", "ForAllSecure CEO；Thanassis Avgerinos 与 Alex Rebert 等学生参与共同创业。", sources.brumleyHome),
      fact("人才培养", "本人主页逐名列出博士生、博士后及其 SEI、IBM Watson、KAIST、Duolingo 等去向。", sources.brumleyHome),
    ],
  ),
  "david-gifford-lineage": enhancement(
    "MIT AI for healthcare and computational genomics 资深教授；Gifford Lab 团队页公开博士生、博士后、产业与 faculty 去向。",
    [sources.giffordMit, sources.giffordLab],
    [
      fact("当前任职", "MIT Professor of CS and Engineering，归属 AI+D and CS。", sources.giffordMit),
      fact("研究主线", "AI for Healthcare and Life Sciences、机器学习与计算基因组学。", sources.giffordMit),
      fact("实验室", "领导 MIT Gifford Laboratory；团队页列出成员、学位年份和公开去向。", sources.giffordLab),
      fact("人才流动", "校友去向覆盖 Citadel、nference、City of Boston、NVIDIA、Amazon AWS 及多所高校。", sources.giffordLab),
    ],
  ),
};

export const influenceQueueUsResidualAGroupMembers: GroupMember[] = [
  member("prateek-mittal-award", "david-huang", "David Huang", "Princeton ECE advisee", sources.mittalPrinceton),
  member("prateek-mittal-award", "cyrill-kraehenbuehl", "Cyrill Krähenbühl", "Princeton ECE / CITP advisee", sources.mittalPrinceton),
  member("prateek-mittal-award", "seungju-lee", "Seungju Lee", "Princeton ECE advisee", sources.mittalPrinceton),

  member("steven-bird-us", "angelina-aquino", "Angelina Aquino", "Top End Language Lab PhD student", sources.birdLanguageLab, "Disaster communication · intercultural translation · language technology"),
  member("steven-bird-us", "annie-cameron", "Annie Cameron", "Top End Language Lab PhD student", sources.birdLanguageLab, "Digital collection management · language revitalisation"),
  member("steven-bird-us", "ian-gumbula", "Ian Gumbula", "Top End Language Lab PhD student", sources.birdLanguageLab, "Language vitality · intercultural communication"),

  member("tengyu-ma-award", "caroline-choi", "Caroline Choi", "Current PhD student · co-advised with Ludwig Schmidt", sources.tengyuHome),
  member("tengyu-ma-award", "luke-bailey", "Luke Bailey", "Current PhD student · co-advised with Tatsunori Hashimoto", sources.tengyuHome),
  member("tengyu-ma-award", "kaiyue-wen", "Kaiyue Wen", "Current PhD student · co-advised with Percy Liang", sources.tengyuHome),

  member("alex-aiken-lineage", "jeff-foster", "Jeff Foster", "Former primary-adviser PhD student · Professor, Tufts", sources.aikenStudents),
  member("alex-aiken-lineage", "zhendong-su", "Zhendong Su", "Former primary-adviser PhD student · Professor, ETH", sources.aikenStudents),
  member("alex-aiken-lineage", "isil-dillig", "Isil Dillig", "Former primary-adviser PhD student · Professor, UT Austin", sources.aikenStudents),

  member("armando-solar-lezama-lineage", "jeevana-inala", "Jeevana Inala", "Computer-Aided Programming Group alumna · Microsoft Research", sources.solarCap),
  member("armando-solar-lezama-lineage", "kevin-ellis", "Kevin Ellis", "Computer-Aided Programming Group alumnus · Cornell", sources.solarCap),
  member("armando-solar-lezama-lineage", "nadia-polikarpova", "Nadia Polikarpova", "Computer-Aided Programming Group alumna · UC San Diego", sources.solarCap),

  member("carolyn-rose-us", "luke-breitfeller", "Luke Breitfeller", "Teledia / LTI PhD student", sources.roseTeam, "Event ordering · models of authorial intent"),
  member("carolyn-rose-us", "ritam-dutt", "Ritam Dutt", "Teledia / LTI PhD student", sources.roseTeam, "Neural model generalizability"),
  member("carolyn-rose-us", "yiqing-xie", "Yiqing Xie", "Teledia / LTI PhD student", sources.roseTeam, "Code model agents"),

  member("christopher-potts-us", "aryaman-arora", "Aryaman Arora", "Stanford CS PhD student · co-chair Dan Jurafsky", sources.pottsStudents),
  member("christopher-potts-us", "adolfo-hermosillo", "Adolfo Hermosillo", "Stanford Linguistics PhD student · co-chair Beth Levin", sources.pottsStudents),
  member("christopher-potts-us", "nathan-hu", "Nathan Hu", "Stanford CS PhD student", sources.pottsStudents),

  member("claire-cardie-us", "scott-mardis", "Scott Anthony Mardis", "Former Cornell PhD student · graduated 2000", sources.cornellPhdAlumni),
  member("claire-cardie-us", "nicholas-howe", "Nicholas Read Howe", "Former Cornell PhD student · graduated 2001", sources.cornellPhdAlumni),
  member("claire-cardie-us", "kiri-wagstaff", "Kiri Wagstaff", "Former Cornell PhD student · graduated 2002", sources.cornellPhdAlumni),

  member("constantinos-daskalakis-award", "fan-chen", "Fan Chen", "Current MIT PhD student", sources.daskalakisHome),
  member("constantinos-daskalakis-award", "kerem-dayi", "Kerem Dayi", "Current MIT PhD student", sources.daskalakisHome),
  member("constantinos-daskalakis-award", "phevos-paschalidis", "Phevos Paschalidis", "Current MIT PhD student", sources.daskalakisHome),

  member("cristian-danescu-us", "jonathan-chang", "Jonathan P. Chang", "Former Cornell PhD student", sources.cristianChangThesis),
  member("cristian-danescu-us", "justine-zhang", "Justine Zhang", "Former Cornell PhD student", sources.cristianZhangThesis),
  member("cristian-danescu-us", "tushaar-gangavarapu", "Tushaar Gangavarapu", "Former Cornell advisee · co-advised with Sasha Rush", sources.cristianGangavarapu),

  member("david-brumley-cmu", "tiffany-bao", "Tiffany Bao", "PhD student", sources.brumleyHome),
  member("david-brumley-cmu", "matthew-maurer", "Matthew Maurer", "PhD student", sources.brumleyHome),
  member("david-brumley-cmu", "thanassis-avgerinos", "Thanassis Avgerinos", "Former PhD student · ForAllSecure co-founder", sources.brumleyHome),

  member("david-gifford-lineage", "zheng-dai", "Zheng Dai", "Gifford Lab PhD '24 · Citadel Investment Group", sources.giffordLab),
  member("david-gifford-lineage", "jon-krog", "Jon Krog", "Gifford Lab PhD '24 · nference", sources.giffordLab),
  member("david-gifford-lineage", "bianca-lepe", "Bianca Lepe", "Gifford Lab PhD '24 · City of Boston", sources.giffordLab),
];

export const influenceQueueUsResidualARelationships: Relationship[] = [];
export const influenceQueueUsResidualAPlacements: StudentPlacement[] = [];
export const influenceQueueUsResidualAPortraits: Record<string, NonNullable<Person["portrait"]>> = {};

export const influenceQueueUsResidualADeferred = [
  {
    id: "tengyu-ma-award",
    reason:
      "Princeton 官方页面已明确 Sanjeev Arora 为 Tengyu Ma 的博士导师，但 Sanjeev Arora 尚不在当前图谱。按本批次只处理既有 12 个 ID、不得创建低资料人物节点的边界，暂不生成悬空 lineage 边。",
    source: sources.tengyuPrinceton,
  },
] as const;
