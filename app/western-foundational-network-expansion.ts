import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const profile = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "profile",
  checkedAt,
  supports,
});

const cv = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "cv",
  checkedAt,
  supports,
});

const sources = {
  manningHome: profile(
    "Christopher Manning homepage",
    "https://nlp.stanford.edu/~manning/",
    "Current Stanford appointment, research programme and maintained dissertation roster",
  ),
  manningDissertations: official(
    "Christopher Manning and PhD students' dissertations",
    "https://nlp.stanford.edu/~manning/dissertations/",
    "Doctoral adviser and co-adviser relationships, graduation years and academic ancestors",
  ),
  bresnanBio: profile(
    "Joan Bresnan biosketch",
    "https://web.stanford.edu/~bresnan/bio/index.html",
    "Emerita status, Stanford trajectory, LFG and probabilistic-syntax research",
  ),
  bresnanCv: cv(
    "Joan Bresnan academic CV",
    "https://web.stanford.edu/~bresnan/cv/cv-21.pdf",
    "Academic appointments, education and honours",
  ),
  malikHome: profile(
    "Jitendra Malik homepage and trainee roster",
    "https://people.eecs.berkeley.edu/~malik/",
    "Current Berkeley role and former doctoral and postdoctoral trainees",
  ),
  malikCv: cv(
    "Jitendra Malik academic CV",
    "https://people.eecs.berkeley.edu/~malik/malik-cv-full.pdf",
    "Doctoral theses supervised and their current destinations",
  ),
  princetonJia: official(
    "Princeton CS doctoral graduates — Jia Deng",
    "https://www.cs.princeton.edu/news/computer-science-phd-graduates-move",
    "Jia Deng's Princeton doctorate and co-advisers Fei-Fei Li and Kai Li",
  ),
  feifeiProfile: official(
    "Stanford profile — Fei-Fei Li",
    "https://profiles.stanford.edu/fei-fei-li",
    "Current Stanford appointment, education and computer-vision research",
  ),
  pearlBio: profile(
    "Judea Pearl biographical sketch",
    "https://bayes.cs.ucla.edu/stat_bio.html",
    "UCLA trajectory, causal and probabilistic AI research and honours",
  ),
  pearlLab: official(
    "UCLA Cognitive Systems Laboratory",
    "https://bayes.cs.ucla.edu/",
    "Laboratory leadership, faculty associates and causal-reasoning programme",
  ),
  uclaAlumni: official(
    "UCLA Computer Science distinguished alumni",
    "https://www.cs.ucla.edu/distinguished-alumni/",
    "Rina Dechter's UCLA doctorate under Judea Pearl and current UCI role",
  ),
  uclaDechter: official(
    "UCLA classic AI paper award — Rina Dechter",
    "https://www.cs.ucla.edu/professor-judea-pearl-wins-classic-ai-paper-award-from-the-ai-journal/",
    "Rina Dechter's Pearl doctoral lineage and constraint-processing research",
  ),
  bareinboimCv: cv(
    "Elias Bareinboim academic CV",
    "https://www.engineering.columbia.edu/sites/default/files/2024-06/cv-bareinboim.pdf",
    "Columbia appointment, UCLA doctorate and postdoctoral training under Judea Pearl",
  ),
  bareinboimHome: profile(
    "Elias Bareinboim and CausalAI Laboratory",
    "https://www.causalai.net/",
    "Current research group, causal-AI programme and academic trajectory",
  ),
  darwicheUcla: official(
    "UCLA profile — Adnan Darwiche",
    "https://www.cs.ucla.edu/prof-adnan-darwiche-recipient-of-lockheed-martin-excellence-in-teaching-award/",
    "UCLA faculty role and postdoctoral research with Judea Pearl",
  ),
  darwicheHome: profile(
    "Adnan Darwiche homepage",
    "https://web.cs.ucla.edu/~darwiche/",
    "Current UCLA professorship, Automated Reasoning Group and research topics",
  ),
  abbeelHome: profile(
    "Pieter Abbeel brief biography",
    "https://people.eecs.berkeley.edu/~pabbeel/brief_bio.html",
    "Current Berkeley role and former trainees' academic and startup destinations",
  ),
  abbeelGroup: profile(
    "Pieter Abbeel Robot Learning Lab people",
    "https://people.eecs.berkeley.edu/~pabbeel/group.html",
    "Former students and postdoctoral researchers, including Sergey Levine and Deepak Pathak",
  ),
  levineHome: profile(
    "Sergey Levine homepage",
    "https://people.eecs.berkeley.edu/~svlevine/",
    "Current Berkeley role and robot-learning research programme",
  ),
  levineCv: cv(
    "Sergey Levine academic CV",
    "https://people.eecs.berkeley.edu/~svlevine/papers/cv.pdf",
    "Stanford doctorate and Berkeley postdoctoral training with Pieter Abbeel",
  ),
  chelseaBerkeley: official(
    "Berkeley EECS — Chelsea Finn doctoral dissertation award",
    "https://eecs.berkeley.edu/news/chelsea-finn-wins-2018-acm-doctoral-dissertation-award/",
    "Chelsea Finn's Berkeley doctorate co-advised by Pieter Abbeel and Sergey Levine",
  ),
  pathakHome: profile(
    "Deepak Pathak homepage",
    "https://www.cs.cmu.edu/~dpathak/",
    "Current CMU professorship, Skild AI role and visiting postdoc with Pieter Abbeel",
  ),
  pathakCv: cv(
    "Deepak Pathak academic CV",
    "https://www.cs.cmu.edu/~dpathak/CV_Pathak.pdf",
    "Berkeley PhD, visiting postdoctoral work with Pieter Abbeel and CMU appointment",
  ),
  dineshPenn: official(
    "University of Pennsylvania profile — Dinesh Jayaraman",
    "https://curf.upenn.edu/profile/dinesh-jayaraman",
    "Current Penn faculty role and vision-based robot-learning programme",
  ),
  dineshCv: cv(
    "Dinesh Jayaraman academic CV",
    "https://www.seas.upenn.edu/~dineshj/media/cv.pdf",
    "Academic trajectory, Berkeley postdoctoral period and current Penn appointment",
  ),
  alexeiPeople: profile(
    "Alexei Efros group and alumni",
    "https://people.eecs.berkeley.edu/~efros/",
    "Dinesh Jayaraman's Berkeley postdoctoral co-advising with Sergey Levine",
  ),
};

type NewPerson = Pick<Person, "id" | "name" | "role" | "institution" | "actualInstitution" | "region" | "area" | "tags" | "summary" | "stage" | "category" | "primary" | "status"> & {
  trajectory: string;
  why: string;
  sources: [Source, Source, ...Source[]];
};

const person = (entry: NewPerson, index: number): Person => ({
  ...entry,
  lastVerifiedAt: checkedAt,
  x: 140 + (index % 3) * 220,
  y: 140 + Math.floor(index / 3) * 180,
  facts: [
    { label: "当前角色", value: entry.role, source: entry.sources[0] },
    { label: "学术轨迹", value: entry.trajectory, source: entry.sources[1] },
    { label: "研究主线", value: entry.area, source: entry.sources[0] },
    { label: "为什么值得关注", value: entry.why, source: entry.sources[1] },
  ],
});

/** Additional people needed to expose the documented adviser networks of foundational US AI researchers. */
export const westernFoundationalNetworkPeople: Person[] = [
  person({
    id: "joan-bresnan-foundational",
    name: "Joan Bresnan",
    role: "Sadie Dernham Patek Professor in Humanities, Emerita",
    institution: "Stanford",
    region: "United States",
    area: "Syntax · Lexical-Functional Grammar · Probabilistic Grammar",
    tags: ["句法", "LFG", "概率语法", "Manning 谱系"],
    summary: "Stanford 语言学荣休教授、LFG 共同奠基人；Christopher Manning 的博士导师，是 Stanford NLP 更早一代的学术上游。",
    trajectory: "MIT 博士后历任 UMass、MIT 与 Stanford，并曾在 Xerox PARC Intelligent Systems Laboratory 任研究人员。",
    why: "把 Manning 的统计 NLP 与更早的形式句法、计算语法和概率语法传统连接起来。",
    stage: "historical",
    category: "historical",
    primary: false,
    status: "emerita · foundational lineage node",
    sources: [sources.bresnanBio, sources.bresnanCv, sources.manningDissertations],
  }, 0),
  person({
    id: "rina-dechter-foundational",
    name: "Rina Dechter",
    role: "Distinguished Professor of Computer Science",
    institution: "External",
    actualInstitution: "University of California, Irvine",
    region: "United States",
    area: "Constraint Processing · Automated Reasoning · Probabilistic AI",
    tags: ["约束推理", "知识表示", "概率 AI", "Pearl 谱系"],
    summary: "UCI 自动推理资深教授，UCLA 博士由 Judea Pearl 指导；将 Pearl 的不确定性推理传统发展为约束处理的重要独立分支。",
    trajectory: "1985 年在 UCLA 完成计算机科学博士，随后在 UC Irvine 建立约束处理与自动推理研究体系。",
    why: "是 Pearl 学术谱系中最早形成持续独立学派的代表性学生之一。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.uclaAlumni, sources.uclaDechter, sources.pearlLab],
  }, 1),
  person({
    id: "elias-bareinboim-foundational",
    name: "Elias Bareinboim",
    role: "Associate Professor · Director, Causal Artificial Intelligence Lab",
    institution: "Columbia",
    region: "United States",
    area: "Causal Inference · Causal AI · Data Fusion · Fairness",
    tags: ["因果推断", "Causal AI", "数据融合", "Pearl 谱系"],
    summary: "Columbia CausalAI Lab 主任，UCLA 博士及博士后阶段均跟随 Judea Pearl，是因果推断向现代机器学习扩展的重要学术继承者。",
    trajectory: "UCLA 计算机博士由 Judea Pearl 指导，随后继续在 Pearl 的 Cognitive Systems Lab 从事博士后研究，再赴 Purdue 与 Columbia 任教。",
    why: "将 Pearl 的结构因果模型推进到数据融合、公平性与因果强化学习。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.bareinboimCv, sources.bareinboimHome, sources.pearlLab],
  }, 2),
  person({
    id: "adnan-darwiche-foundational",
    name: "Adnan Darwiche",
    role: "Professor · Director, Automated Reasoning Group",
    institution: "UCLA",
    region: "United States",
    area: "Automated Reasoning · Bayesian Networks · Symbolic and Numeric AI",
    tags: ["自动推理", "贝叶斯网络", "符号 AI", "Pearl 博后"],
    summary: "UCLA 自动推理资深教授；在 Judea Pearl 组完成博士后训练，连接概率图模型、符号推理与现代机器学习。",
    trajectory: "Stanford 计算机博士后进入 UCLA Judea Pearl 组从事博士后研究，随后返回 UCLA 建立 Automated Reasoning Group。",
    why: "展示 Pearl 网络不仅输出因果推断分支，也发展出知识驱动与数值 AI 融合的自动推理分支。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.darwicheUcla, sources.darwicheHome, sources.pearlLab],
  }, 3),
  person({
    id: "deepak-pathak-foundational",
    name: "Deepak Pathak",
    role: "Raj Reddy Associate Professor · Co-Founder and CEO, Skild AI",
    institution: "CMU",
    region: "United States",
    area: "Robot Learning · Computer Vision · Embodied AI",
    tags: ["机器人学习", "计算机视觉", "具身智能", "Abbeel 博后", "Skild AI"],
    summary: "CMU 机器人学习 PI 与 Skild AI 联合创始人；曾在 Pieter Abbeel 的 Berkeley 组从事访问博士后研究。",
    trajectory: "Berkeley 博士由 Alexei Efros 与 Trevor Darrell 指导，后在 Meta AI 和 Pieter Abbeel 组开展研究，再加入 CMU。",
    why: "连接 Berkeley 视觉与机器人学习谱系，并进一步连接到具身基础模型创业网络。",
    stage: "senior",
    category: "core",
    primary: true,
    status: "current PI · startup founder",
    sources: [sources.pathakHome, sources.pathakCv, sources.abbeelGroup],
  }, 4),
  person({
    id: "dinesh-jayaraman-foundational",
    name: "Dinesh Jayaraman",
    role: "Assistant Professor of Computer and Information Science",
    institution: "External",
    actualInstitution: "University of Pennsylvania",
    region: "United States",
    area: "Robot Learning · Computer Vision · Multimodal Perception",
    tags: ["机器人学习", "计算机视觉", "多模态感知", "Levine 博后"],
    summary: "Penn 视觉机器人学习 PI；Berkeley 博士后阶段由 Alexei Efros 与 Sergey Levine 共同指导。",
    trajectory: "UT Austin 博士后于 Berkeley AI Research 完成博士后训练，2020 年加入 University of Pennsylvania。",
    why: "是 Levine 深度强化学习网络向视觉—触觉机器人学习和新独立 PI 扩散的代表节点。",
    stage: "emerging",
    category: "core",
    primary: true,
    status: "current PI",
    sources: [sources.dineshPenn, sources.dineshCv, sources.alexeiPeople],
  }, 5),
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: NonNullable<Relationship["subtype"]>,
  evidence: string,
  source: Source,
  endYear?: number,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "postdoc_mentor" ? "博士后指导" : subtype === "co_adviser" ? "共同博士导师" : "博士导师",
  evidence,
  evidenceObject: "Explicit adviser or laboratory-roster record",
  source,
  verified: true,
  endYear,
});

/** Adviser points to trainee. No relationship below is inferred from ordinary co-authorship. */
export const westernFoundationalNetworkRelationships: Relationship[] = [
  lineage("western-bresnan-manning-phd", "joan-bresnan-foundational", "christopher-manning-us", "phd_adviser", "Manning 本人维护的博士论文谱系页明确记录其 1994 年 Stanford 博士由 Joan Bresnan 指导。", sources.manningDissertations, 1994),
  lineage("western-manning-dan-klein-phd", "christopher-manning-us", "dan-klein-us", "phd_adviser", "Manning 本人的博士毕业生名录列出 Dan Klein 及其 2005 年 Stanford 博士论文。", sources.manningDissertations, 2005),
  lineage("western-manning-bowman-coadvisor", "christopher-manning-us", "samuel-bowman-us", "co_adviser", "Manning 本人的博士毕业生名录列出 Samuel Bowman，并明确注明由 Chris Potts 共同指导。", sources.manningDissertations, 2016),

  lineage("western-feifei-jia-deng-coadvisor", "fei-fei-li-us", "jia-deng-us", "co_adviser", "Princeton CS 官方博士毕业生记录将 Fei-Fei Li 与 Kai Li 列为 Jia Deng 的共同导师。", sources.princetonJia, 2012),

  lineage("western-malik-perona-phd", "jitendra-malik-us", "pietro-perona-lineage", "phd_adviser", "Jitendra Malik 本人维护的博士生名录列出 Pietro Perona 及其 1990 年 Berkeley 博士论文。", sources.malikHome, 1990),
  lineage("western-malik-efros-phd", "jitendra-malik-us", "alexei-efros-us", "phd_adviser", "Jitendra Malik 本人维护的博士生名录列出 Alyosha（Alexei A.）Efros 及其 2003 年 Berkeley 博士论文。", sources.malikHome, 2003),
  lineage("western-malik-deva-phd", "jitendra-malik-us", "deva-ramanan-us", "phd_adviser", "Jitendra Malik 的本人名录与学术 CV 将 Deva Ramanan 列入其 Berkeley 博士生指导记录。", sources.malikCv),

  lineage("western-pearl-dechter-phd", "judea-pearl-historical", "rina-dechter-foundational", "phd_adviser", "UCLA Computer Science 官方校友记录明确写明 Rina Dechter 于 1985 年完成博士，导师为 Judea Pearl。", sources.uclaAlumni, 1985),
  lineage("western-pearl-bareinboim-phd", "judea-pearl-historical", "elias-bareinboim-foundational", "phd_adviser", "Elias Bareinboim 的 Columbia 官方 CV 明确列出 2014 年 UCLA 博士导师 Judea Pearl。", sources.bareinboimCv, 2014),
  lineage("western-pearl-darwiche-postdoc", "judea-pearl-historical", "adnan-darwiche-foundational", "postdoc_mentor", "UCLA 官方简介记录 Adnan Darwiche 在博士毕业后加入 Judea Pearl 研究组从事博士后研究。", sources.darwicheUcla),

  lineage("western-abbeel-levine-postdoc", "pieter-abbeel-us", "sergey-levine-us", "postdoc_mentor", "Sergey Levine 的本人 CV 记录其 2014–2016 年在 Berkeley Pieter Abbeel 的 Robot Learning Lab 从事博士后研究。", sources.levineCv, 2016),
  lineage("western-abbeel-pathak-postdoc", "pieter-abbeel-us", "deepak-pathak-foundational", "postdoc_mentor", "Deepak Pathak 的本人主页与 CV 记录其在 Berkeley 由 Pieter Abbeel 指导访问博士后研究。", sources.pathakCv, 2020),
  lineage("western-levine-chelsea-coadvisor", "sergey-levine-us", "chelsea-finn-us", "co_adviser", "Berkeley EECS 官方报道明确记录 Chelsea Finn 的博士由 Pieter Abbeel 与 Sergey Levine 共同指导。", sources.chelseaBerkeley, 2018),
  lineage("western-levine-dinesh-postdoc", "sergey-levine-us", "dinesh-jayaraman-foundational", "postdoc_mentor", "Alexei Efros 的 Berkeley 官方成员页将 Dinesh Jayaraman 列为与 Sergey Levine 共同指导的博士后。", sources.alexeiPeople, 2019),
];

/** Optional detail enrichments for existing focal nodes when this module is integrated. */
export const westernFoundationalNetworkPersonEnhancements: Record<string, Partial<Person>> = {
  "christopher-manning-us": {
    summary: "Stanford NLP 核心带头人；本人维护的博士谱系从 Joan Bresnan 的形式句法传统延伸到 Dan Klein、Samuel Bowman、Danqi Chen 与 Roger Levy 等多代 NLP PI。",
    facts: [
      { label: "当前角色", value: "Thomas M. Siebel Professor in Machine Learning · Stanford", source: sources.manningHome },
      { label: "博士导师", value: "Joan Bresnan · Stanford Linguistics", source: sources.manningDissertations },
      { label: "公开博士谱系", value: "本人页面逐项公开 1998–2025 年博士毕业生与论文", source: sources.manningDissertations },
    ],
    sources: [sources.manningHome, sources.manningDissertations],
    lastVerifiedAt: checkedAt,
  },
  "jitendra-malik-us": {
    summary: "Berkeley 计算机视觉资深带头人；本人公开名录连接 Pietro Perona、Alexei Efros、Deva Ramanan 以及多代视觉与机器人学习 PI。",
    facts: [
      { label: "当前角色", value: "Arthur J. Chick Professor of EECS · Berkeley", source: sources.malikHome },
      { label: "博士谱系", value: "本人页面公开历届博士生、论文和去向", source: sources.malikHome },
      { label: "研究主线", value: "计算机视觉、视觉识别、分割与机器人学习", source: sources.malikCv },
    ],
    sources: [sources.malikHome, sources.malikCv],
    lastVerifiedAt: checkedAt,
  },
  "judea-pearl-historical": {
    summary: "UCLA 荣休教授与因果 AI 奠基者；公开证据连接 Rina Dechter、Elias Bareinboim 和 Adnan Darwiche 等自动推理与因果机器学习分支。",
    facts: [
      { label: "学术身份", value: "Professor Emeritus · UCLA Cognitive Systems Laboratory", source: sources.pearlLab },
      { label: "研究主线", value: "人工智能、概率推理、结构因果模型与科学哲学", source: sources.pearlBio },
      { label: "学术网络", value: "博士生与博士后形成约束处理、因果 AI 和自动推理分支", source: sources.uclaAlumni },
    ],
    sources: [sources.pearlBio, sources.pearlLab, sources.uclaAlumni],
    lastVerifiedAt: checkedAt,
  },
  "pieter-abbeel-us": {
    summary: "Berkeley 机器人学习核心 PI；公开实验室名录连接 Sergey Levine、Chelsea Finn、Deepak Pathak 等独立 PI，并向多家机器人和基础模型公司扩散。",
    facts: [
      { label: "当前角色", value: "Professor of AI and Robotics · Berkeley", source: sources.abbeelHome },
      { label: "博士后谱系", value: "Sergey Levine、Deepak Pathak 等", source: sources.abbeelGroup },
      { label: "人才扩散", value: "校友连接 OpenAI、Perplexity、Physical Intelligence、Skild 等", source: sources.abbeelHome },
    ],
    sources: [sources.abbeelHome, sources.abbeelGroup],
    lastVerifiedAt: checkedAt,
  },
  "sergey-levine-us": {
    summary: "Berkeley RAIL 负责人；上游连接 Pieter Abbeel 博士后网络，下游通过 Chelsea Finn 与 Dinesh Jayaraman 延伸到 Stanford 和 Penn 的机器人学习团队。",
    facts: [
      { label: "当前角色", value: "Associate Professor · UC Berkeley EECS", source: sources.levineHome },
      { label: "博士后导师", value: "Pieter Abbeel · Berkeley Robot Learning Lab", source: sources.levineCv },
      { label: "研究主线", value: "深度强化学习、机器人学习与通用自主体", source: sources.levineHome },
    ],
    sources: [sources.levineHome, sources.levineCv, sources.chelseaBerkeley],
    lastVerifiedAt: checkedAt,
  },
};
