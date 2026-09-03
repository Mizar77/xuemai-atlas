import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const firstParty = (
  label: string,
  url: string,
  supports: string,
  kind: Source["kind"] = "official",
): Source => ({ label, url, supports, kind, checkedAt });

const oxfordRoster = firstParty(
  "Oxford Computer Science faculty roster",
  "https://www.cs.ox.ac.uk/people/faculty.html",
  "Oxford CS current faculty appointment",
);
const oxfordAiMl = firstParty(
  "Oxford Computer Science AI & ML people",
  "https://www.cs.ox.ac.uk/research/ai_ml/people.html",
  "Oxford AI/ML research-community membership and research scope",
);
const ethRoster = firstParty(
  "ETH D-INFK professors roster",
  "https://inf.ethz.ch/people/faculty/professors.html",
  "ETH D-INFK current professor appointment",
);
const epflRoster = firstParty(
  "EPFL School of Computer and Communication Sciences faculty",
  "https://www.epfl.ch/schools/ic/about/faculty-members/",
  "EPFL IC current professor appointment",
);

type Seed = {
  id: string;
  name: string;
  role: string;
  institution: "Oxford" | "ETH Zurich" | "EPFL";
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  x: number;
  y: number;
  profile: Source;
  roster: Source;
  extras?: Source[];
  facts: NonNullable<Person["facts"]>;
  portraitSource: Source;
  portraitFile: string;
};

function makePerson(seed: Seed): Person {
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: seed.institution,
    region: "Europe",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: seed.facts.map((fact) => ({ ...fact, source: fact.source ?? seed.profile })),
    stage: seed.stage,
    category: "core",
    status: "current PI · official roster and first-party profile verified",
    sources: [seed.profile, seed.roster, ...(seed.extras ?? [])],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/europe-next-2026/${seed.portraitFile}.webp`,
      alt: `${seed.name} official portrait`,
      source: seed.portraitSource,
    },
  };
}

const saraProfile = firstParty("Oxford — Sara Bernardini", "https://www.cs.ox.ac.uk/people/Sara.Bernardini", "Current role, research, prior appointments and students", "profile");
const saraPortrait = firstParty("Oxford official portrait — Sara Bernardini", "https://www.cs.ox.ac.uk/files/14752//250327_168-NEF.jpg", "Official portrait", "profile");
const giuseppeProfile = firstParty("Oxford — Giuseppe De Giacomo", "https://www.cs.ox.ac.uk/people/Giuseppe.DeGiacomo", "Current role, research, honours, prior appointment and students", "profile");
const giuseppePortrait = firstParty("Oxford official portrait — Giuseppe De Giacomo", "https://www.cs.ox.ac.uk/files/14949//Giuseppe%20De%20Giacomo%20-Viso.pdf", "Official portrait", "profile");
const sethProfile = firstParty("Oxford — Seth Flaxman", "https://www.cs.ox.ac.uk/people/Seth.Flaxman", "Current role, research and academic trajectory", "profile");
const sethPortrait = firstParty("Oxford official portrait — Seth Flaxman", "https://www.cs.ox.ac.uk/files/13385//Seth-Flaxman-portrait-2--tojpeg_1507562162991_x1.jpg", "Official portrait", "profile");
const sethMarkPaper = firstParty("Oxford CS — Numerically Stable Sparse Gaussian Processes", "https://www.cs.ox.ac.uk/publications/publication15977-abstract.html", "Seth Flaxman and Mark van der Wilk co-authorship on sparse Gaussian processes", "publication");
const varunProfile = firstParty("Oxford — Varun Kanade", "https://www.cs.ox.ac.uk/people/Varun.Kanade", "Current role, machine-learning research and students", "profile");
const varunThesis = firstParty("Varun Kanade DPhil thesis", "https://www.cs.ox.ac.uk/people/varun.kanade/docs/thesis.pdf", "DPhil thesis and adviser acknowledgements", "thesis");
const varunPortrait = firstParty("Oxford official portrait — Varun Kanade", "https://www.cs.ox.ac.uk/files/7873//me.png", "Official portrait", "profile");
const markProfile = firstParty("Oxford — Mark van der Wilk", "https://www.cs.ox.ac.uk/people/Mark.vanderWilk", "Current role, research and doctoral training", "profile");
const markLab = firstParty("Mark van der Wilk group — people", "https://mvdw.uk/people/", "Current students and alumni destinations", "profile");
const markBio = firstParty("Mark van der Wilk — first-party biography", "https://mvdw.uk/", "Doctoral adviser, Google visit and industrial research", "profile");
const markPortrait = firstParty("Oxford official portrait — Mark van der Wilk", "https://www.cs.ox.ac.uk/files/14394//pasfoto.jpeg", "Official portrait", "profile");

const niaoProfile = firstParty("ETH D-INFK — Niao He", "https://inf.ethz.ch/people/people-atoz/person-detail.Mjc3NTYx.TGlzdC8zMDQsLTIxNDE4MTU0NjA=.html", "Current ETH appointment", "profile");
const niaoLab = firstParty("Optimization and Decision Intelligence — Niao He", "https://odi.inf.ethz.ch/niaohe", "Research, education, adviser and group leadership", "profile");
const niaoTeam = firstParty("Optimization and Decision Intelligence — people", "https://odi.inf.ethz.ch/people", "Current group members", "profile");
const niaoPortrait = firstParty("ODI official portrait — Niao He", "https://odi.inf.ethz.ch/img/personal/personal-big1.jpg", "Official portrait", "profile");
const gunnarProfile = firstParty("ETH D-INFK — Gunnar Rätsch", "https://inf.ethz.ch/people/person-detail.raetsch.html", "Current ETH appointment", "profile");
const gunnarBio = firstParty("Biomedical Informatics Group — Gunnar Rätsch", "https://bmi.inf.ethz.ch/people/person/gunnar-raetsch/", "Role, research and academic training", "profile");
const gunnarTeam = firstParty("Biomedical Informatics Group — people", "https://bmi.inf.ethz.ch/people/", "Current group members", "profile");
const gunnarPortrait = firstParty("ETH BMI official portrait — Gunnar Rätsch", "https://bmi.inf.ethz.ch/fileadmin/user_upload/_processed_/9/f/csm_Gunnar_Raetsch_0498_1b063e022a.jpg", "Official portrait", "profile");
const mrinmayaProfile = firstParty("ETH D-INFK — Mrinmaya Sachan", "https://inf.ethz.ch/people/person-detail.MjYyNzc4.TGlzdC8zMDQsLTg3NDc3NjI0MQ==.html", "Current ETH appointment", "profile");
const mrinmayaWelcome = firstParty("ETH D-INFK welcome — Mrinmaya Sachan", "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2020/08/welcome-professor-mrinmaya-sachan.html", "Appointment and research programme", "profile");
const mrinmayaTeam = firstParty("Language, Reasoning and Education Lab — team", "https://lre.inf.ethz.ch/team/", "Education and current lab members", "profile");
const mrinmayaPortrait = firstParty("ETH official portrait — Mrinmaya Sachan", "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2020/08/welcome-professor-mrinmaya-sachan/_jcr_content/pageimages/imageCarousel.imageformat.lightbox.605347415.jpg", "Official portrait", "profile");
const juliaProfile = firstParty("ETH D-INFK — Julia Vogt", "https://inf.ethz.ch/people/person-detail.vogt.html", "Current ETH appointment", "profile");
const juliaBio = firstParty("Medical Data Science — Julia Vogt", "https://mds.inf.ethz.ch/team/detail/julia-vogt/", "Role, research, training and group leadership", "profile");
const juliaTeam = firstParty("Medical Data Science — team", "https://mds.inf.ethz.ch/team/", "Current group members", "profile");
const juliaPortrait = firstParty("ETH MDS official portrait — Julia Vogt", "https://mds.inf.ethz.ch/fileadmin/user_upload/julia_vogt_export.jpg", "Official portrait", "profile");
const fannyProfile = firstParty("ETH D-INFK — Fanny Yang", "https://inf.ethz.ch/people/people-atoz/person-detail.MjIyNDYy.TGlzdC8zMDQsLTIxNDE4MTU0NjA=.html", "Current ETH appointment", "profile");
const fannyLab = firstParty("Statistical Machine Learning — Fanny Yang", "https://sml.inf.ethz.ch/group/fannyy/", "Role, research, education, advisers and career trajectory", "profile");
const fannyTeam = firstParty("Statistical Machine Learning — group", "https://sml.inf.ethz.ch/group/", "Current students and alumni destinations", "profile");
const fannyPortrait = firstParty("ETH SML official portrait — Fanny Yang", "https://sml.inf.ethz.ch/groupsite/assets/img/fanny_033-800.webp", "Official portrait", "profile");

const mariaProfile = firstParty("EPFL — Maria Brbic", "https://people.epfl.ch/maria.brbic?lang=en", "Current EPFL appointments", "profile");
const mariaLab = firstParty("Brbic Lab", "https://brbiclab.epfl.ch/", "Research, academic trajectory and current lab members", "profile");
const mariaTeam = firstParty("Brbic Lab — team", "https://brbiclab.epfl.ch/team/", "Current lab members", "profile");
const mariaPortrait = firstParty("EPFL official portrait — Maria Brbic", "https://people.epfl.ch/maria.brbic/photo", "Official portrait", "profile");
const charlotteProfile = firstParty("EPFL — Charlotte Bunne", "https://people.epfl.ch/charlotte.bunne?lang=en", "Current EPFL appointments", "profile");
const charlotteLab = firstParty("AI for Molecular Medicine Lab", "https://aimm.epfl.ch/", "Research and current group members", "profile");
const charlotteCv = firstParty("Charlotte Bunne — first-party résumé", "https://aimm.epfl.ch/resume-2/", "Doctoral and postdoctoral advisers and training", "cv");
const charlottePortrait = firstParty("EPFL official portrait — Charlotte Bunne", "https://people.epfl.ch/charlotte.bunne/photo", "Official portrait", "profile");
const nicolasProfile = firstParty("EPFL — Nicolas Flammarion", "https://people.epfl.ch/nicolas.flammarion?lang=en", "Current EPFL appointment and biography", "profile");
const nicolasTeam = firstParty("EPFL Theory of Machine Learning — team", "https://www.epfl.ch/labs/tml/theory-of-machine-learning/team/", "Research scope and current group members", "profile");
const nicolasPortrait = firstParty("EPFL official portrait — Nicolas Flammarion", "https://people.epfl.ch/nicolas.flammarion/photo", "Official portrait", "profile");
const caglarProfile = firstParty("EPFL — Caglar Gulcehre", "https://people.epfl.ch/caglar.gulcehre?lang=en", "Current EPFL appointment and biography", "profile");
const caglarTeam = firstParty("EPFL CLAIRE — people", "https://www.epfl.ch/labs/claire/people/", "Lab leadership and current doctoral assistants", "profile");
const caglarPortrait = firstParty("EPFL official portrait — Caglar Gulcehre", "https://people.epfl.ch/caglar.gulcehre/photo", "Official portrait", "profile");
const amirProfile = firstParty("EPFL — Amir Zamir", "https://people.epfl.ch/amir.zamir?lang=en", "Current EPFL appointment and biography", "profile");
const amirLab = firstParty("Visual Intelligence and Learning Lab", "https://vilab.epfl.ch/", "Research, academic trajectory, industry role and team", "profile");
const amirPortrait = firstParty("EPFL official portrait — Amir Zamir", "https://people.epfl.ch/amir.zamir/photo", "Official portrait", "profile");

export const europeNextRosterPiExpansion1People: Person[] = [
  makePerson({ id: "sara-bernardini-oxford-next", name: "Sara Bernardini", role: "Professor of Computer Science", institution: "Oxford", area: "AI Planning · Autonomous Systems", tags: ["AI Planning", "Autonomous Systems", "Space AI"], summary: "Oxford AI 规划与自主系统 PI，把基础规划方法连接到机器人、海洋和航天任务。", stage: "senior", x: 120, y: 120, profile: saraProfile, roster: oxfordRoster, extras: [oxfordAiMl], portraitSource: saraPortrait, portraitFile: "sara", facts: [
    { label: "当前任职", value: "Oxford 计算机科学教授、Mansfield College Tutorial Fellow。" },
    { label: "研究主线", value: "人工智能规划、自主系统，以及面向现实机器人和航天任务的决策。" },
    { label: "教育与学术训练", value: "官方履历记录其曾在 Royal Holloway、King’s、UCL、MIT 与 NASA Ames 开展研究。" },
    { label: "团队与应用", value: "现指导 Christian Hagemeier，并兼任英国 National Oceanography Centre 的 AI/Data Science Principal Research Scientist。" },
  ] }),
  makePerson({ id: "giuseppe-de-giacomo-oxford-next", name: "Giuseppe De Giacomo", role: "Professor of Computer Science", institution: "Oxford", area: "Knowledge Representation · Reasoning · Agents", tags: ["Knowledge Representation", "Reasoning", "Planning", "Agents"], summary: "Oxford 知识表示与推理资深 PI，研究逻辑、规划和自主智能体。", stage: "senior", x: 260, y: 120, profile: giuseppeProfile, roster: oxfordRoster, extras: [oxfordAiMl], portraitSource: giuseppePortrait, portraitFile: "giuseppe", facts: [
    { label: "当前任职", value: "Oxford 计算机科学教授、Green Templeton College Fellow。" },
    { label: "研究主线", value: "知识表示、自动推理、规划、智能体与数据库理论。" },
    { label: "教育与学术训练", value: "加入 Oxford 前长期任教于 Sapienza University of Rome。" },
    { label: "团队与荣誉", value: "AAAI、ACM 与 EurAI Fellow；官方主页列出 Christian Hagemeier、Christoph Weinhuber 等在读学生。" },
  ] }),
  makePerson({ id: "seth-flaxman-oxford-next", name: "Seth Flaxman", role: "Associate Professor of Computer Science", institution: "Oxford", area: "Bayesian Machine Learning · Spatiotemporal Statistics", tags: ["Bayesian ML", "Spatiotemporal", "Public Policy"], summary: "以可扩展贝叶斯与时空统计研究公共卫生、政策和社会科学问题。", stage: "senior", x: 400, y: 120, profile: sethProfile, roster: oxfordRoster, extras: [oxfordAiMl], portraitSource: sethPortrait, portraitFile: "seth", facts: [
    { label: "当前任职", value: "Oxford 计算机科学副教授、Jesus College Tutorial Fellow。" },
    { label: "研究主线", value: "可扩展贝叶斯机器学习、时空统计及其公共政策与社会科学应用。" },
    { label: "教育与学术训练", value: "Harvard 本科、Carnegie Mellon 博士（2011–2015），之后在 Oxford Statistics 与 Imperial 开展博士后研究。" },
    { label: "跨界经历", value: "官方主页记录其曾在 WHO 与 EPFL Media and Design Lab 工作。" },
  ] }),
  makePerson({ id: "varun-kanade-oxford-next", name: "Varun Kanade", role: "Associate Professor of Computer Science", institution: "Oxford", area: "Machine Learning Theory · Randomised Algorithms", tags: ["Learning Theory", "Randomised Algorithms", "Deep Learning"], summary: "Oxford 机器学习理论 PI，连接学习理论、随机算法与深度学习基础。", stage: "senior", x: 540, y: 120, profile: varunProfile, roster: oxfordRoster, extras: [oxfordAiMl, varunThesis], portraitSource: varunPortrait, portraitFile: "varun", facts: [
    { label: "当前任职", value: "Oxford 计算机科学副教授。" },
    { label: "研究主线", value: "机器学习理论、随机算法和深度学习理论。" },
    { label: "教育与学术训练", value: "其 Oxford DPhil 论文致谢将 Leslie Valiant 与 Adam Kalai 明确称为 advisers。", source: varunThesis },
    { label: "团队", value: "官方主页列出 Charles London 等当前学生，并维护历届学生名单。" },
  ] }),
  makePerson({ id: "mark-van-der-wilk-oxford-next", name: "Mark van der Wilk", role: "Associate Professor of Machine Learning", institution: "Oxford", area: "Probabilistic ML · Causality · Foundation Models", tags: ["Probabilistic ML", "Causality", "Continual Learning", "Foundation Models"], summary: "Oxford 概率机器学习 PI，覆盖归纳偏置、因果、持续学习与科学基础模型。", stage: "senior", x: 680, y: 120, profile: markProfile, roster: oxfordRoster, extras: [oxfordAiMl, markLab, markBio], portraitSource: markPortrait, portraitFile: "mark", facts: [
    { label: "当前任职", value: "Oxford 机器学习副教授。" },
    { label: "研究主线", value: "等变性、因果与持续学习，以及用于工业化学的贝叶斯优化和基础模型。" },
    { label: "教育与学术训练", value: "2017 年获 Cambridge 博士，博士导师为 Carl Rasmussen。", source: markBio },
    { label: "产业与人才流动", value: "曾访问 Google；团队公开校友去向包括 MediaTek Research、Amazon Berlin、SOLVE Chemistry 与 Xyme。", source: markLab },
  ] }),

  makePerson({ id: "niao-he-eth-next", name: "Niao He", role: "Associate Professor of Computer Science", institution: "ETH Zurich", area: "Optimization · Machine Learning · Decision Intelligence", tags: ["Optimization", "Machine Learning", "Trustworthy AI"], summary: "ETH Optimization and Decision Intelligence 负责人，研究优化、学习与可信决策。", stage: "senior", x: 120, y: 300, profile: niaoProfile, roster: ethRoster, extras: [niaoLab, niaoTeam], portraitSource: niaoPortrait, portraitFile: "niao", facts: [
    { label: "当前任职", value: "ETH Zurich 计算机科学副教授、Optimization and Decision Intelligence Lab 负责人。" },
    { label: "研究主线", value: "优化、机器学习和可信决策智能。", source: niaoLab },
    { label: "教育与学术训练", value: "2015 年获 Georgia Tech 博士，导师为 Arkadi Nemirovski。", source: niaoLab },
    { label: "团队", value: "ODI 官方团队页列出 Xiang Li 等在读博士生。", source: niaoTeam },
  ] }),
  makePerson({ id: "gunnar-raetsch-eth-next", name: "Gunnar Rätsch", role: "Full Professor of Biomedical Informatics", institution: "ETH Zurich", area: "Machine Learning · Genomics · Biomedical Informatics", tags: ["Biomedical AI", "Genomics", "Machine Learning"], summary: "ETH Biomedical Informatics 负责人，以机器学习连接基因组学、医学与临床数据。", stage: "senior", x: 260, y: 300, profile: gunnarProfile, roster: ethRoster, extras: [gunnarBio, gunnarTeam], portraitSource: gunnarPortrait, portraitFile: "gunnar", facts: [
    { label: "当前任职", value: "ETH Zurich 生物医学信息学正教授、Biomedical Informatics Group 负责人。" },
    { label: "研究主线", value: "用于基因组学、医学和临床数据的机器学习与数据科学。", source: gunnarBio },
    { label: "教育与学术训练", value: "在 German National Lab 完成博士训练，导师 Klaus-Robert Müller；其后与 Bob Williamson、Bernhard Schölkopf 开展博士后研究。", source: gunnarBio },
    { label: "团队", value: "BMI 官方名录列出 Sonali Andani、Manuel Burger 等研究人员。", source: gunnarTeam },
  ] }),
  makePerson({ id: "mrinmaya-sachan-eth-next", name: "Mrinmaya Sachan", role: "Assistant Professor of Computer Science", institution: "ETH Zurich", area: "Natural Language Processing · Reasoning · AI in Education", tags: ["NLP", "Reasoning", "AI in Education"], summary: "ETH Language, Reasoning and Education Lab 负责人，研究语言推理和教育智能。", stage: "emerging", x: 400, y: 300, profile: mrinmayaProfile, roster: ethRoster, extras: [mrinmayaWelcome, mrinmayaTeam], portraitSource: mrinmayaPortrait, portraitFile: "mrinmaya", facts: [
    { label: "当前任职", value: "ETH Zurich 计算机科学助理教授、Language, Reasoning and Education Lab 负责人。" },
    { label: "研究主线", value: "自然语言处理、知识发现与推理，以及 AI in Education。", source: mrinmayaWelcome },
    { label: "教育与学术训练", value: "IIT Kanpur 本科，Carnegie Mellon 硕士与博士。", source: mrinmayaTeam },
    { label: "团队", value: "LRE 官方团队页列出 Sankalan Pal Chowdhury、Peng Cui 等博士生。", source: mrinmayaTeam },
  ] }),
  makePerson({ id: "julia-vogt-eth-next", name: "Julia Vogt", role: "Associate Professor of Medical Data Science", institution: "ETH Zurich", area: "Machine Learning · Precision Medicine", tags: ["Medical AI", "Precision Medicine", "Machine Learning"], summary: "ETH Medical Data Science 负责人，聚焦机器学习、精准医疗和可解释生物医学建模。", stage: "senior", x: 540, y: 300, profile: juliaProfile, roster: ethRoster, extras: [juliaBio, juliaTeam], portraitSource: juliaPortrait, portraitFile: "julia", facts: [
    { label: "当前任职", value: "ETH Zurich 医疗数据科学副教授、Medical Data Science Group 负责人。" },
    { label: "研究主线", value: "面向精准医疗的机器学习、数据科学与生物医学建模。", source: juliaBio },
    { label: "教育与学术训练", value: "在 Konstanz 与 Sydney 学习数学，获 Basel 计算机科学博士；其后在 MSKCC 和 Konstanz 开展博士后研究。", source: juliaBio },
    { label: "团队", value: "MDS 官方团队页列出 Thomas Sutter 等研究人员。", source: juliaTeam },
  ] }),
  makePerson({ id: "fanny-yang-eth-next", name: "Fanny Yang", role: "Associate Professor of Computer Science", institution: "ETH Zurich", area: "Statistical Machine Learning · Robustness", tags: ["Statistical ML", "Robustness", "Domain Generalization"], summary: "ETH Statistical Machine Learning PI，研究可靠泛化、鲁棒性与统计学习理论。", stage: "senior", x: 680, y: 300, profile: fannyProfile, roster: ethRoster, extras: [fannyLab, fannyTeam], portraitSource: fannyPortrait, portraitFile: "fanny", facts: [
    { label: "当前任职", value: "ETH Zurich 计算机科学副教授；2020 年加入 ETH，并于 2026 年获 tenure。", source: fannyLab },
    { label: "研究主线", value: "统计机器学习、可靠泛化、鲁棒性与 domain generalization。", source: fannyLab },
    { label: "教育与学术训练", value: "UC Berkeley 博士导师为 Martin Wainwright；其后在 Stanford 与 John Duchi、Percy Liang 开展博士后研究。", source: fannyLab },
    { label: "产业与人才流动", value: "团队校友去向包括 Amazon NYC Applied Scientist 与 Isomorphic Labs Research Scientist。", source: fannyTeam },
  ] }),

  makePerson({ id: "maria-brbic-epfl-next", name: "Maria Brbic", role: "Tenure Track Assistant Professor", institution: "EPFL", area: "Machine Learning · Computational Biology · AI for Science", tags: ["AI for Science", "Biomedical AI", "Machine Learning"], summary: "EPFL 交叉 AI PI，以机器学习研究生物医学和单细胞系统。", stage: "emerging", x: 120, y: 480, profile: mariaProfile, roster: epflRoster, extras: [mariaLab, mariaTeam], portraitSource: mariaPortrait, portraitFile: "maria", facts: [
    { label: "当前任职", value: "EPFL IC 与 Life Sciences 双聘 tenure-track assistant professor、Brbic Lab 负责人。" },
    { label: "研究主线", value: "机器学习、生物医学数据、单细胞系统与 AI for Science。", source: mariaLab },
    { label: "教育与学术训练", value: "2019 年获 University of Zagreb 博士，之后在 Stanford 与 Jure Leskovec 及 Chan Zuckerberg Biohub 开展博士后研究。", source: mariaProfile },
    { label: "团队", value: "Brbic Lab 公开名录列出 Siba Smarak Panigrahi 等博士生。", source: mariaTeam },
  ] }),
  makePerson({ id: "charlotte-bunne-epfl-next", name: "Charlotte Bunne", role: "Tenure Track Assistant Professor", institution: "EPFL", area: "Machine Learning · Molecular Medicine", tags: ["Molecular AI", "Generative Models", "Biomedical AI"], summary: "EPFL AI for Molecular Medicine Lab 负责人，连接生成建模、药物研发与生物医学。", stage: "emerging", x: 260, y: 480, profile: charlotteProfile, roster: epflRoster, extras: [charlotteLab, charlotteCv], portraitSource: charlottePortrait, portraitFile: "charlotte", facts: [
    { label: "当前任职", value: "EPFL IC 与 Life Sciences 双聘 tenure-track assistant professor、AI for Molecular Medicine Lab 负责人。" },
    { label: "研究主线", value: "用于分子医学、药物研发和生物系统的机器学习与生成模型。", source: charlotteLab },
    { label: "教育与学术训练", value: "ETH Zurich 博士由 Andreas Krause 与 Marco Cuturi 指导；之后在 Genentech/Stanford 与 Aviv Regev、Jure Leskovec 开展博士后研究。", source: charlotteProfile },
    { label: "团队", value: "AIMM 官方团队页列出 Johann Wenckstern、Eeshaan Jain、Benedikt von Querfurth 等博士生。", source: charlotteLab },
  ] }),
  makePerson({ id: "nicolas-flammarion-epfl-next", name: "Nicolas Flammarion", role: "Associate Professor of Computer Science", institution: "EPFL", area: "Machine Learning Theory · Optimization · Statistics", tags: ["Learning Theory", "Optimization", "Statistics"], summary: "EPFL Theory of Machine Learning PI，研究优化、统计与现代机器学习基础。", stage: "senior", x: 400, y: 480, profile: nicolasProfile, roster: epflRoster, extras: [nicolasTeam], portraitSource: nicolasPortrait, portraitFile: "nicolas", facts: [
    { label: "当前任职", value: "EPFL 计算机科学副教授、Theory of Machine Learning Group 负责人。" },
    { label: "研究主线", value: "机器学习理论、优化、统计以及鲁棒且可实践的学习方法。", source: nicolasTeam },
    { label: "教育与学术训练", value: "本轮一手公开页面未披露足以逐项核验的完整学位与导师链；保留 CV/论文反查项。" },
    { label: "团队", value: "TML 官方团队页列出 Francesco D’Angelo 等博士生。", source: nicolasTeam },
  ] }),
  makePerson({ id: "caglar-gulcehre-epfl-next", name: "Caglar Gulcehre", role: "Tenure Track Assistant Professor", institution: "EPFL", area: "Deep Learning · Reinforcement Learning · Generative AI", tags: ["Deep Learning", "Reinforcement Learning", "Generative AI", "Agents"], summary: "EPFL CLAIRE Lab 负责人，研究深度学习、强化学习和生成式智能体。", stage: "emerging", x: 540, y: 480, profile: caglarProfile, roster: epflRoster, extras: [caglarTeam], portraitSource: caglarPortrait, portraitFile: "caglar", facts: [
    { label: "当前任职", value: "EPFL tenure-track assistant professor、CLAIRE Lab 负责人。" },
    { label: "研究主线", value: "深度学习、强化学习、生成模型与智能体。", source: caglarTeam },
    { label: "教育与学术训练", value: "本轮一手公开页面未披露足以逐项核验的完整导师链；保留 CV/论文反查项。" },
    { label: "团队", value: "CLAIRE 官方团队页列出 Justin Samuel Deschenaux、Liangze Jiang、Amin Mansouri 等博士生。", source: caglarTeam },
  ] }),
  makePerson({ id: "amir-zamir-epfl-next", name: "Amir Zamir", role: "Tenure Track Assistant Professor", institution: "EPFL", area: "Computer Vision · Multimodal Learning · Embodied AI", tags: ["Computer Vision", "Multimodal", "Embodied AI"], summary: "EPFL Visual Intelligence and Learning Lab 负责人，研究视觉、多模态与具身智能。", stage: "emerging", x: 680, y: 480, profile: amirProfile, roster: epflRoster, extras: [amirLab], portraitSource: amirPortrait, portraitFile: "amir", facts: [
    { label: "当前任职", value: "EPFL tenure-track assistant professor、Visual Intelligence and Learning Lab 负责人。" },
    { label: "研究主线", value: "计算机视觉、多模态学习、表征学习与具身智能。", source: amirLab },
    { label: "教育与学术训练", value: "官方实验室履历记录其在 UC Berkeley、Stanford 与 UCF 的学术经历。", source: amirLab },
    { label: "产业与团队", value: "2015–2022 年担任 Aurora Solar Chief Scientist，并持续担任企业顾问；当前团队包括 Andrei Atanov。", source: amirLab },
  ] }),
];

const lineage = (id: string, from: string, to: string, subtype: "phd_adviser" | "postdoc_mentor", evidence: string, source: Source): Relationship => ({
  id, from, to, subtype,
  type: subtype === "postdoc_mentor" ? "talent" : "lineage",
  label: subtype === "phd_adviser" ? "博士导师" : "博士后指导",
  evidence, source, verified: true,
});

export const europeNextRosterPiExpansion1Relationships: Relationship[] = [
  lineage("europe-next-carl-rasmussen-mark-vdw", "carl-rasmussen-lineage", "mark-van-der-wilk-oxford-next", "phd_adviser", "Mark van der Wilk 的一手个人履历明确写明 Cambridge 博士导师为 Carl Rasmussen。", markBio),
  lineage("europe-next-krause-bunne", "andreas-krause-eu", "charlotte-bunne-epfl-next", "phd_adviser", "Charlotte Bunne 的 EPFL 官方简介明确列 Andreas Krause 与 Marco Cuturi 为博士导师。", charlotteProfile),
  lineage("europe-next-leskovec-brbic", "jure-leskovec-lineage", "maria-brbic-epfl-next", "postdoc_mentor", "Maria Brbic 的 EPFL 官方简介记录其在 Stanford 与 Jure Leskovec 开展博士后研究。", mariaProfile),
  lineage("europe-next-leskovec-bunne", "jure-leskovec-lineage", "charlotte-bunne-epfl-next", "postdoc_mentor", "Charlotte Bunne 的 EPFL 官方简介记录其 Stanford 博士后导师包括 Jure Leskovec。", charlotteProfile),
  lineage("europe-next-schoelkopf-raetsch", "bernhard-schoelkopf-eu", "gunnar-raetsch-eth-next", "postdoc_mentor", "ETH BMI 官方简介记录 Gunnar Rätsch 曾与 Bernhard Schölkopf 开展博士后研究。", gunnarBio),
  {
    id: "europe-next-flaxman-van-der-wilk-publication",
    from: "seth-flaxman-oxford-next",
    to: "mark-van-der-wilk-oxford-next",
    type: "collaboration",
    subtype: "publication",
    label: "稀疏高斯过程合作",
    evidence: "Oxford CS 官方出版物页列 Seth Flaxman 与 Mark van der Wilk 共同署名 Numerically Stable Sparse Gaussian Processes via Minimum Separation using Cover Trees。",
    evidenceObject: "Numerically Stable Sparse Gaussian Processes via Minimum Separation using Cover Trees",
    source: sethMarkPaper,
    verified: true,
  },
];

const member = (id: string, teacherId: string, name: string, role: string, source: Source, focus?: string): GroupMember => ({ id, teacherId, name, role, source, focus });

export const europeNextRosterPiExpansion1GroupMembers: GroupMember[] = [
  member("europe-next-member-sara-hagemeier", "sara-bernardini-oxford-next", "Christian Hagemeier", "DPhil student", saraProfile, "AI planning"),
  member("europe-next-member-giuseppe-weinhuber", "giuseppe-de-giacomo-oxford-next", "Christoph Weinhuber", "DPhil student", giuseppeProfile, "Knowledge representation and reasoning"),
  member("europe-next-member-varun-london", "varun-kanade-oxford-next", "Charles London", "DPhil student", varunProfile, "Machine learning theory"),
  member("europe-next-member-mark-dhir", "mark-van-der-wilk-oxford-next", "Anish Dhir", "DPhil student", markLab, "Probabilistic machine learning"),
  member("europe-next-member-niao-li", "niao-he-eth-next", "Xiang Li", "PhD student", niaoTeam, "Optimization and decision intelligence"),
  member("europe-next-member-gunnar-andani", "gunnar-raetsch-eth-next", "Sonali Andani", "PhD student", gunnarTeam, "Biomedical informatics"),
  member("europe-next-member-mrinmaya-chowdhury", "mrinmaya-sachan-eth-next", "Sankalan Pal Chowdhury", "PhD student", mrinmayaTeam, "NLP and reasoning"),
  member("europe-next-member-julia-sutter", "julia-vogt-eth-next", "Thomas Sutter", "Postdoctoral researcher", juliaTeam, "Medical data science"),
  member("europe-next-member-fanny-kostin", "fanny-yang-eth-next", "Julia Kostin", "PhD student", fannyTeam, "Statistical machine learning"),
  member("europe-next-member-maria-panigrahi", "maria-brbic-epfl-next", "Siba Smarak Panigrahi", "PhD student", mariaTeam, "Biomedical machine learning"),
  member("europe-next-member-charlotte-wenckstern", "charlotte-bunne-epfl-next", "Johann Wenckstern", "PhD student", charlotteLab, "AI for molecular medicine"),
  member("europe-next-member-nicolas-dangelo", "nicolas-flammarion-epfl-next", "Francesco D’Angelo", "PhD student", nicolasTeam, "Theory of machine learning"),
  member("europe-next-member-caglar-deschenaux", "caglar-gulcehre-epfl-next", "Justin Samuel Deschenaux", "Doctoral assistant", caglarTeam, "Deep and reinforcement learning"),
  member("europe-next-member-amir-atanov", "amir-zamir-epfl-next", "Andrei Atanov", "PhD student", amirLab, "Visual intelligence"),
];

const placement = (id: string, student: string, company: string, role: string, kind: StudentPlacement["kind"], sector: StudentPlacement["sector"], source: Source, highLevel = false): StudentPlacement => ({
  id, student, teacherId: "mark-van-der-wilk-oxford-next", company, role, kind, sector, source, highLevel, verifiedAt: checkedAt, degree: "PhD",
});

export const europeNextRosterPiExpansion1StudentPlacements: StudentPlacement[] = [
  placement("europe-next-placement-artem-artemev", "Artem Artemev", "MediaTek Research", "Senior AI Research Scientist", "current", "industry", markLab, true),
  placement("europe-next-placement-jose-folch", "Jose Pablo Folch", "SOLVE Chemistry", "Co-founder & Chief Scientific Officer", "founder", "startup", markLab, true),
  placement("europe-next-placement-pola-schwoebel", "Pola Schwöbel", "Amazon Berlin", "Applied Scientist", "current", "industry", markLab),
];

export const europeNextRosterPiExpansion1Portraits: Record<string, Person["portrait"]> =
  Object.fromEntries(europeNextRosterPiExpansion1People.map((person) => [person.id, person.portrait]));
