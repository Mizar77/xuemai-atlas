import type { GroupMember, Person, Region, Relationship, Source, StudentPlacement } from "./data";
import type { AcademicCommunity } from "./academic-community-data";

/**
 * Canada expansion (reviewed 2026-08-30).
 *
 * Integration note: `Region` needs `Canada`; `Institution` needs the seven
 * institution labels declared below.  They are cast locally so this module can
 * land independently without touching the shared unions.
 */
const checkedAt = "2026-08-30";

const official = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "official", checkedAt, supports,
});
const profile = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "profile", checkedAt, supports,
});

export const canadaExpansionInstitutionLabels = [
  "U of Toronto", "Université de Montréal", "McGill", "Polytechnique Montréal",
  "UBC", "University of Alberta", "Waterloo",
] as const;
type CanadaInstitution = (typeof canadaExpansionInstitutionLabels)[number];

const torontoDirectory = official("University of Toronto CS faculty directory", "https://web.cs.toronto.edu/people/faculty-directory", "Current U of T appointment, rank and research areas");
const vectorTeam = official("Vector Institute research team", "https://vectorinstitute.ai/research-talent/research-team/", "Current Vector faculty roster and cross-institution research network");
const milaDirectory = official("Mila academic directory", "https://mila.quebec/en/directory?member-type=45", "Current Mila academic roster and institutional affiliations");
const milaHome = official("Mila institute overview", "https://mila.quebec/en", "Mila scope, member universities and research network");
const mcgillPeople = official("McGill School of Computer Science people", "https://www.cs.mcgill.ca/people/", "Current McGill faculty roster and research areas");
const mcgillRl = official("McGill Reasoning and Learning Lab team", "https://rl.cs.mcgill.ca/team/", "Current core professors, students and supervision records");
const ubcAi = official("UBC AI and machine-learning faculty", "https://www.cs.ubc.ca/people/faculty?research_groups=5006", "Current UBC faculty and AI/ML research groups");
const ubcNlp = official("UBC NLP Group people", "https://nlp.cs.ubc.ca/people", "Current UBC NLP faculty and research areas");
const rlai = official("University of Alberta RLAI people", "https://rlai.ualberta.ca/people.html", "Current RLAI principal investigators and institutional affiliations");
const waterlooAi = official("Waterloo AI and machine-learning research area", "https://uwaterloo.ca/computer-science/research/research-areas/artificial-intelligence-and-machine-learning", "Current Waterloo AI/ML faculty group");
const waterlooHighlights = official("Waterloo CS highlights 2025", "https://cs.uwaterloo.ca/sites/default/files/uploads/documents/school-highlights-2025.pdf", "Current faculty highlights and Canada CIFAR AI Chairs");

type CanadaPersonInput = Omit<Person, "institution" | "region" | "category" | "primary" | "lastVerifiedAt" | "facts"> & {
  institution: CanadaInstitution;
  node: string;
  sources: [Source, Source, ...Source[]];
  historical?: boolean;
};

const makePerson = ({ institution, node, historical, ...person }: CanadaPersonInput): Person => ({
  ...person,
  institution: institution as Person["institution"],
  region: "Canada" as Person["region"],
  // Foundational/emeritus scholars stay visible in the graph, but do not
  // inflate current-PI counts or recruiting-oriented results.
  category: "core",
  primary: !historical,
  status: person.status ?? (historical ? "emeritus / foundational" : "current PI"),
  lastVerifiedAt: checkedAt,
  facts: [
    { label: "现职", value: person.role, source: person.sources[0] },
    { label: "研究主题", value: person.area, source: person.sources[0] },
    { label: "公开研究节点", value: node, source: person.sources[1] },
  ],
});

export const canadaExpansionPeople: Person[] = [
  makePerson({
    id: "geoffrey-hinton-ca", name: "Geoffrey Hinton", role: "University Professor Emeritus", institution: "U of Toronto",
    area: "Deep Learning · Neural Networks · AI Safety", tags: ["深度学习", "神经网络", "AI 安全", "奠基人物", "Vector"],
    summary: "多伦多深度学习谱系的奠基人物之一。现为多伦多大学荣休教授；官方名录明确注明不再招收研究生，因此本图将其作为历史与师承节点，而不是招生中的 current PI。",
    node: "U of T Machine Learning / Vector Institute", stage: "historical", historical: true, x: 120, y: 220,
    sources: [
      torontoDirectory,
      official("U of T — Geoffrey Hinton at Toronto Tech Week", "https://www.utoronto.ca/news/geoffrey-hinton-discusses-promise-and-perils-ai-toronto-tech-week", "Emeritus status, 2024 Nobel Prize and current AI-safety work"),
      profile("Geoffrey Hinton CV", "https://www.cs.utoronto.ca/~hinton/fullcv2024.pdf", "Academic history, emeritus date, Vector and Google roles"),
    ],
  }),
  makePerson({
    id: "sanja-fidler-ca", name: "Sanja Fidler", role: "Associate Professor of Computer Science", institution: "U of Toronto",
    area: "Computer Vision · 3D Vision · Multimodal Learning", tags: ["计算机视觉", "3D 视觉", "多模态", "NVIDIA", "Vector"],
    summary: "多伦多视觉与多模态学习的核心 PI，研究三维场景理解、生成式视觉与具身感知，并连接 Vector 与 NVIDIA Toronto AI Lab。",
    node: "U of T Machine Learning / Vector Institute", stage: "senior", x: 270, y: 220,
    sources: [torontoDirectory, vectorTeam, profile("Sanja Fidler homepage", "https://www.cs.toronto.edu/~fidler/", "Research programme, group and NVIDIA affiliation")],
  }),
  makePerson({
    id: "roger-grosse-ca", name: "Roger Grosse", role: "Faculty Member, Computer Science", institution: "U of Toronto",
    area: "Deep Learning · Optimization · AI Alignment", tags: ["深度学习", "优化", "AI 对齐", "Vector"],
    summary: "研究深度网络优化、可扩展训练与 AI 对齐的多伦多 PI，是 Vector 机器学习理论与现代基础模型训练方向的重要节点。",
    node: "U of T Machine Learning / Vector Institute", stage: "senior", x: 420, y: 220,
    sources: [torontoDirectory, vectorTeam, profile("Roger Grosse homepage", "https://www.cs.toronto.edu/~rgrosse/", "Research programme and group")],
  }),
  makePerson({
    id: "david-duvenaud-ca", name: "David Duvenaud", role: "Faculty Member, Computer Science", institution: "U of Toronto",
    area: "Machine Learning · Probabilistic Models · Scientific ML", tags: ["机器学习", "概率模型", "科学机器学习", "Vector"],
    summary: "多伦多概率机器学习与科学智能 PI，研究神经微分方程、生成模型和自动化科学发现。",
    node: "U of T Machine Learning / Vector Institute", stage: "senior", x: 570, y: 220,
    sources: [torontoDirectory, vectorTeam, profile("David Duvenaud homepage", "https://www.cs.toronto.edu/~duvenaud/", "Research programme, publications and group")],
  }),
  makePerson({
    id: "jimmy-ba-ca", name: "Jimmy Ba", role: "Assistant Professor · Canada CIFAR AI Chair", institution: "U of Toronto",
    area: "Deep Learning · Efficient Learning · Reinforcement Learning", tags: ["深度学习", "高效学习", "强化学习", "Hinton 学生", "Vector"],
    summary: "Hinton 学术谱系中的独立 PI，研究高效学习算法、优化与强化学习；个人主页明确记录其博士导师为 Geoffrey Hinton。",
    node: "U of T Machine Learning / Vector Institute", stage: "emerging", x: 720, y: 220,
    sources: [profile("Jimmy Ba homepage", "https://www.cs.utoronto.ca/~jba/", "Current appointment, research and Geoffrey Hinton supervision"), vectorTeam],
  }),
  makePerson({
    id: "bo-wang-toronto-ca", name: "Bo Wang", role: "Faculty Member · Lead AI Scientist, UHN", institution: "U of Toronto",
    area: "Machine Learning for Health · Foundation Models · Computational Biology", tags: ["医疗 AI", "基础模型", "计算生物学", "Vector"],
    summary: "连接多伦多大学、Vector 与 University Health Network 的医疗 AI PI，研究生物医学基础模型、单细胞与临床机器学习。",
    node: "Vector Institute / UHN AI Hub", stage: "senior", x: 870, y: 220,
    sources: [torontoDirectory, vectorTeam, official("UHN AI Hub — Bo Wang", "https://www.uhnresearch.ca/researcher/bo-wang", "UHN role and biomedical machine-learning programme")],
  }),
  makePerson({
    id: "richard-zemel-ca", name: "Richard Zemel", role: "Professor of Computer Science", institution: "U of Toronto",
    area: "Representation Learning · Generative Models · Responsible AI", tags: ["表征学习", "生成模型", "负责任 AI", "Vector"],
    summary: "多伦多表征学习与负责任 AI 的资深 PI，研究生成模型、视觉与算法公平，并长期参与 Vector 学术网络。",
    node: "U of T Machine Learning / Vector Institute", stage: "senior", x: 1020, y: 220,
    sources: [torontoDirectory, vectorTeam, profile("Richard Zemel homepage", "https://www.cs.toronto.edu/~zemel/", "Research programme and publications")],
  }),

  makePerson({
    id: "yoshua-bengio-ca", name: "Yoshua Bengio", role: "Full Professor · Mila Founder and Scientific Advisor", institution: "Université de Montréal",
    area: "Deep Learning · Generative Models · AI Safety", tags: ["深度学习", "生成模型", "AI 安全", "Mila", "奠基人物"],
    summary: "蒙特利尔深度学习谱系与 Mila 的奠基人物。2025 年从科学主任转任创始人兼科学顾问，现仍是 UdeM 教授、Mila 核心学术成员与 Canada CIFAR AI Chair。",
    node: "Mila — Quebec AI Institute", stage: "senior", x: 120, y: 610,
    sources: [
      official("Mila directory — Yoshua Bengio", "https://mila.quebec/en/directory/yoshua-bengio", "Current UdeM title, Mila role and research topics"),
      official("Mila scientific-direction transition", "https://mila.quebec/en/news/transition-in-milas-scientific-direction", "2025 transition to Founder and Scientific Advisor"),
      milaHome,
    ],
  }),
  makePerson({
    id: "hugo-larochelle-ca", name: "Hugo Larochelle", role: "Scientific Director, Mila · Adjunct Professor", institution: "Université de Montréal",
    area: "Deep Learning · Representation Learning", tags: ["深度学习", "Mila", "Google Research", "Bengio 学生"],
    summary: "2025 年 9 月出任 Mila 科学主任；此前领导 Google Montréal AI Research，并在 UdeM 与 McGill 担任兼职教授。Mila 官方资料明确称其为 Yoshua Bengio 的 former student。",
    node: "Mila — Quebec AI Institute", stage: "senior", x: 270, y: 610,
    sources: [
      official("Mila directory — Hugo Larochelle", "https://mila.quebec/en/directory/hugo-larochelle", "Current scientific-director and adjunct-professor roles"),
      official("Mila appoints Hugo Larochelle", "https://mila.quebec/en/news/hugo-larochelle-becomes-the-new-scientific-director-of-mila", "2025 appointment and previous Google Montréal role"),
      milaHome,
    ],
  }),
  makePerson({
    id: "aaron-courville-ca", name: "Aaron Courville", role: "Full Professor · IVADO Scientific Director", institution: "Université de Montréal",
    area: "Deep Learning · Generative Models · Reinforcement Learning · Vision", tags: ["深度学习", "生成模型", "强化学习", "计算机视觉", "Mila"],
    summary: "Mila 创始学术成员之一，研究生成模型、强化学习、视觉与多智能体，并担任 IVADO 科学主任。",
    node: "Mila — Quebec AI Institute", stage: "senior", x: 420, y: 610,
    sources: [official("Mila directory — Aaron Courville", "https://mila.quebec/en/directory/aaron-courville", "Current UdeM title, IVADO role and research topics"), milaDirectory],
  }),
  makePerson({
    id: "irina-rish-ca", name: "Irina Rish", role: "Full Professor · Canada Excellence Research Chair", institution: "Université de Montréal",
    area: "Autonomous AI · Foundation Models · Continual Learning", tags: ["自主 AI", "基础模型", "持续学习", "多模态", "Mila"],
    summary: "UdeM Autonomous AI Lab 负责人，研究大规模基础模型、持续学习、强化学习与计算神经科学，并公开记录 Nolano.ai 联合创办人身份。",
    node: "Mila / Autonomous AI Lab", stage: "senior", x: 570, y: 610,
    sources: [official("Mila directory — Irina Rish", "https://mila.quebec/en/directory/irina-rish", "Current professorship, chairs, lab, research and startup role"), milaDirectory],
  }),
  makePerson({
    id: "jian-tang-ca", name: "Jian Tang", role: "Professor · Canada CIFAR AI Chair", institution: "Université de Montréal",
    area: "Graph Machine Learning · AI for Science · Foundation Models", tags: ["图机器学习", "AI for Science", "基础模型", "药物发现", "Mila"],
    summary: "Mila 图机器学习与科学智能 PI，研究图神经网络、分子与材料建模、知识推理和基础模型。",
    node: "Mila — Quebec AI Institute", stage: "senior", x: 720, y: 610,
    sources: [official("Mila directory — Jian Tang", "https://mila.quebec/en/directory/jian-tang", "Current academic membership, affiliation and research topics"), milaDirectory],
  }),
  makePerson({
    id: "gauthier-gidel-ca", name: "Gauthier Gidel", role: "Assistant Professor", institution: "Université de Montréal",
    area: "Optimization · Generative Models · AI Safety", tags: ["优化", "生成模型", "AI 安全", "对抗学习", "Mila"],
    summary: "Mila 新生代机器学习理论 PI，研究非凸优化、生成建模、博弈与 AI 安全。",
    node: "Mila — Quebec AI Institute", stage: "emerging", x: 870, y: 610,
    sources: [official("Mila directory — Gauthier Gidel", "https://mila.quebec/en/directory/gauthier-gidel", "Current academic affiliation and research topics"), milaDirectory],
  }),
  makePerson({
    id: "christopher-pal-ca", name: "Christopher Pal", role: "Professor · Canada CIFAR AI Chair", institution: "Polytechnique Montréal",
    area: "Deep Learning · Generative Models · Multimodal Learning", tags: ["深度学习", "生成模型", "多模态", "NLP", "Mila"],
    summary: "Polytechnique Montréal 与 Mila 的资深 PI，研究生成建模、语言与多模态学习，并长期连接学术研究和产业实验室。",
    node: "Mila / Polytechnique Montréal", stage: "senior", x: 1020, y: 610,
    sources: [official("Mila directory — Christopher Pal", "https://mila.quebec/en/directory/christopher-pal", "Current academic membership, affiliation and research topics"), milaDirectory],
  }),

  makePerson({
    id: "doina-precup-ca", name: "Doina Precup", role: "Professor · Canada CIFAR AI Chair", institution: "McGill",
    area: "Reinforcement Learning · Planning under Uncertainty · AI for Health", tags: ["强化学习", "规划", "不确定性", "医疗 AI", "Mila"],
    summary: "McGill 强化学习资深 PI，研究不确定环境中的学习与规划以及社会影响应用；同时是 Mila 核心学术网络的重要节点。",
    node: "McGill Reasoning and Learning Lab / Mila", stage: "senior", x: 120, y: 950,
    sources: [official("McGill profile — Doina Precup", "https://www.mcgill.ca/newsroom/doina-precup", "Current McGill title, research and Canada CIFAR AI Chair"), mcgillRl, mcgillPeople],
  }),
  makePerson({
    id: "joelle-pineau-ca", name: "Joëlle Pineau", role: "Professor · Core Member, Mila (part-time leave)", institution: "McGill",
    area: "Reinforcement Learning · Robotics · Health · Reproducible ML", tags: ["强化学习", "机器人", "医疗 AI", "可复现性", "Meta FAIR"],
    summary: "McGill 强化学习与机器人资深 PI，曾于 2017–2025 年领导 Meta FAIR；个人主页注明目前从 McGill part-time leave，且不招收新研究生。",
    node: "McGill Reasoning and Learning Lab / Mila", stage: "senior", status: "on part-time leave · not recruiting", x: 300, y: 950,
    sources: [profile("Joëlle Pineau McGill homepage", "https://www.cs.mcgill.ca/~jpineau/", "Current leave status, professorship, Mila role and 2017–2025 Meta FAIR history"), mcgillPeople, mcgillRl],
  }),
  makePerson({
    id: "siva-reddy-ca", name: "Siva Reddy", role: "Associate Professor of Computer Science", institution: "McGill",
    area: "Natural Language Processing · Language Models · Reasoning", tags: ["NLP", "语言模型", "推理", "计算语言学", "Mila"],
    summary: "McGill 与 Mila 的 NLP 核心 PI，研究语言理解、知识与推理、语言模型评测和多语言 NLP。",
    node: "McGill NLP / Mila", stage: "senior", x: 480, y: 950,
    sources: [mcgillPeople, mcgillRl, profile("Siva Reddy homepage", "https://www.sivareddy.in/", "Research programme, group and publications")],
  }),
  makePerson({
    id: "jackie-cheung-ca", name: "Jackie Chi Kit Cheung", role: "Associate Professor of Computer Science", institution: "McGill",
    area: "Natural Language Processing · Summarization · Computational Semantics", tags: ["NLP", "摘要", "计算语义", "对话", "Mila"],
    summary: "McGill NLP 资深 PI，研究文本摘要、计算语义、生成与负责任语言技术，是 Reasoning and Learning Lab 的核心教授。",
    node: "McGill NLP / Reasoning and Learning Lab", stage: "senior", x: 660, y: 950,
    sources: [mcgillPeople, mcgillRl, profile("Jackie Cheung homepage", "https://www.cs.mcgill.ca/~jcheung/", "Research programme and publications")],
  }),
  makePerson({
    id: "david-rolnick-ca", name: "David Rolnick", role: "Associate Professor · Canada CIFAR AI Chair", institution: "McGill",
    area: "Machine Learning · Climate Change · AI for Science", tags: ["机器学习", "气候 AI", "AI for Science", "Mila"],
    summary: "McGill 与 Mila 的 AI for Climate 代表性 PI，研究机器学习理论、气候建模和面向社会影响的 AI。",
    node: "McGill Reasoning and Learning Lab / Mila", stage: "emerging", x: 840, y: 950,
    sources: [mcgillPeople, mcgillRl, profile("David Rolnick homepage", "https://www.davidrolnick.com/", "Research programme and climate-AI work")],
  }),

  makePerson({
    id: "leonid-sigal-ca", name: "Leonid Sigal", role: "Professor · Canada Research Chair · CIFAR AI Chair", institution: "UBC",
    area: "Computer Vision · Vision-Language · Generative Models", tags: ["计算机视觉", "视觉语言", "生成模型", "Vector", "Borealis AI"],
    summary: "UBC 视觉与机器学习资深 PI，研究视频、视觉语言、生成和三维理解；公开主页记录其 Vector Chair 与 RBC/Borealis AI 学术顾问身份。",
    node: "UBC Computer Vision Lab / Vector Institute", stage: "senior", x: 120, y: 1270,
    sources: [official("UBC profile — Leonid Sigal", "https://www.cs.ubc.ca/people/leonid-sigal", "Current title, research areas and groups"), vectorTeam, profile("Leonid Sigal homepage", "https://www.cs.ubc.ca/~lsigal/", "Research programme and industry affiliations")],
  }),
  makePerson({
    id: "vered-shwartz-ca", name: "Vered Shwartz", role: "Assistant Professor · Canada CIFAR AI Chair", institution: "UBC",
    area: "Natural Language Processing · Commonsense · Vision-Language", tags: ["NLP", "常识推理", "视觉语言", "文化能力", "Vector"],
    summary: "UBC NLP 新生代核心 PI，研究常识与文化能力、视觉语言模型以及敏感领域中的负责任 NLP。",
    node: "UBC NLP Group / Vector Institute", stage: "emerging", x: 300, y: 1270,
    sources: [profile("Vered Shwartz UBC homepage", "https://www.cs.ubc.ca/~vshwartz/", "Current title, Vector role, research programme and lab"), ubcNlp, vectorTeam],
  }),
  makePerson({
    id: "kwang-moo-yi-ca", name: "Kwang Moo Yi", role: "Associate Professor of Computer Science", institution: "UBC",
    area: "Computer Vision · 3D Geometry · Local Features", tags: ["计算机视觉", "3D 几何", "特征匹配", "机器人"],
    summary: "UBC 视觉与几何学习 PI，研究局部特征、三维重建、鲁棒视觉匹配和面向机器人感知的机器学习。",
    node: "UBC Computer Vision Lab", stage: "emerging", x: 480, y: 1270,
    sources: [official("UBC profile — Kwang Moo Yi", "https://www.cs.ubc.ca/people/kwang-moo-yi", "Current title and research groups"), ubcAi],
  }),
  makePerson({
    id: "mark-schmidt-ca", name: "Mark Schmidt", role: "Professor of Computer Science", institution: "UBC",
    area: "Machine Learning · Optimization · Large-Scale Learning", tags: ["机器学习", "优化", "大规模学习", "Amii"],
    summary: "UBC 机器学习优化方向资深 PI，研究大规模与结构化优化、机器学习算法和科学应用。",
    node: "UBC Machine Learning Group", stage: "senior", x: 660, y: 1270,
    sources: [official("UBC profile — Mark Schmidt", "https://www.cs.ubc.ca/people/mark-schmidt", "Current title and research groups"), ubcAi],
  }),
  makePerson({
    id: "jeff-clune-ca", name: "Jeff Clune", role: "Associate Professor of Computer Science", institution: "UBC",
    area: "Open-Ended AI · Evolutionary Computation · AI Agents", tags: ["开放式 AI", "演化计算", "智能体", "AI 安全", "Vector"],
    summary: "UBC 开放式智能与演化学习 PI，研究 AI agents、质量多样性、自动化创新与安全，并属于 Vector 跨校学术网络。",
    node: "UBC Machine Learning / Vector Institute", stage: "senior", x: 840, y: 1270,
    sources: [official("UBC profile — Jeff Clune", "https://www.cs.ubc.ca/people/jeff-clune", "Current UBC appointment and research groups"), vectorTeam],
  }),
  makePerson({
    id: "hila-gonen-ca", name: "Hila Gonen", role: "Assistant Professor of Computer Science", institution: "UBC",
    area: "Natural Language Processing · Responsible NLP · Multilingual Models", tags: ["NLP", "多语言", "负责任 AI", "语言模型"],
    summary: "UBC NLP 新生代 PI，研究多语言与社会偏见、负责任语言模型和语言技术评测。",
    node: "UBC NLP Group", stage: "emerging", x: 1020, y: 1270,
    sources: [ubcNlp, official("UBC CS faculty directory", "https://www.cs.ubc.ca/people/faculty", "Current faculty appointment")],
  }),

  makePerson({
    id: "richard-sutton-ca", name: "Richard S. Sutton", role: "Professor · Chief Scientific Advisor, Amii", institution: "University of Alberta",
    area: "Reinforcement Learning · Temporal-Difference Learning · AGI", tags: ["强化学习", "时序差分", "AGI", "Amii", "奠基人物"],
    summary: "阿尔伯塔强化学习学派的奠基人物，现任 University of Alberta 教授、Amii 首席科学顾问，并兼任 Keen Technologies 研究科学家。",
    node: "RLAI Lab / Alberta Machine Intelligence Institute", stage: "senior", x: 120, y: 1590,
    sources: [official("Amii profile — Richard Sutton", "https://www.amii.ca/people/richard-s-sutton", "Current academic, Amii and industry affiliations; research programme"), rlai],
  }),
  makePerson({
    id: "martha-white-ca", name: "Martha White", role: "Professor of Computing Science", institution: "University of Alberta",
    area: "Reinforcement Learning · Representation Learning · Optimization", tags: ["强化学习", "表征学习", "优化", "Amii"],
    summary: "RLAI 核心 PI，研究可扩展强化学习、表征学习、预测与优化，是阿尔伯塔新一代强化学习人才培养的重要节点。",
    node: "RLAI Lab / Amii", stage: "senior", x: 300, y: 1590,
    sources: [profile("Martha White UAlberta homepage", "https://webdocs.cs.ualberta.ca/~whitem/", "Current research programme and group"), rlai],
  }),
  makePerson({
    id: "adam-white-ca", name: "Adam White", role: "Professor of Computing Science", institution: "University of Alberta",
    area: "Reinforcement Learning · Continual Learning · Autonomous Agents", tags: ["强化学习", "持续学习", "自主智能体", "Amii"],
    summary: "RLAI 核心 PI，研究持续强化学习、在线预测、自主智能体与真实系统中的学习。",
    node: "RLAI Lab / Amii", stage: "senior", x: 480, y: 1590,
    sources: [profile("Adam White homepage", "https://adamwhite.ca/", "Current appointment, research and group"), rlai],
  }),
  makePerson({
    id: "michael-bowling-ca", name: "Michael Bowling", role: "Professor · Canada CIFAR AI Chair", institution: "University of Alberta",
    area: "Reinforcement Learning · Multi-Agent Systems · Game AI", tags: ["强化学习", "多智能体", "博弈 AI", "DeepMind", "Amii"],
    summary: "阿尔伯塔多智能体与博弈 AI 资深 PI，研究强化学习、计算博弈和机器人；公开资料记录其 Google DeepMind 研究连接。",
    node: "RLAI Lab / Computer Poker Research Group", stage: "senior", x: 660, y: 1590,
    sources: [profile("Michael Bowling UAlberta homepage", "https://webdocs.cs.ualberta.ca/~mbowling/", "Research programme and group"), rlai, official("Amii — Michael Bowling AAAI Fellow", "https://www.amii.ca/updates-insights/michael-bowling-aaai-fellow", "Academic, Amii and DeepMind roles")],
  }),
  makePerson({
    id: "csaba-szepesvari-ca", name: "Csaba Szepesvári", role: "Professor of Computing Science", institution: "University of Alberta",
    area: "Reinforcement Learning · Bandits · Statistical Learning", tags: ["强化学习", "Bandits", "统计学习", "DeepMind", "Amii"],
    summary: "阿尔伯塔强化学习理论资深 PI，研究 bandits、序贯决策和统计学习，并连接 RLAI 与 Google DeepMind。",
    node: "RLAI Lab / Amii", stage: "senior", x: 840, y: 1590,
    sources: [profile("Csaba Szepesvári UAlberta homepage", "https://sites.ualberta.ca/~szepesva/", "Research programme and publications"), rlai],
  }),
  makePerson({
    id: "patrick-pilarski-ca", name: "Patrick M. Pilarski", role: "Professor · Canada CIFAR AI Chair", institution: "University of Alberta",
    area: "Reinforcement Learning · Human-Machine Interaction · Bionics", tags: ["强化学习", "人机交互", "仿生学", "医疗 AI", "Amii"],
    summary: "RLAI 中连接强化学习与真实人机系统的 PI，研究自适应辅助设备、仿生肢体和交互式机器智能。",
    node: "RLAI Lab / Amii", stage: "senior", x: 1020, y: 1590,
    sources: [rlai, official("Amii research fellows", "https://www.amii.ca/people", "Current Amii affiliation and research expertise")],
  }),

  makePerson({
    id: "pascal-poupart-ca", name: "Pascal Poupart", role: "Professor of Computer Science", institution: "Waterloo",
    area: "Machine Learning · Reinforcement Learning · NLP · Health", tags: ["机器学习", "强化学习", "NLP", "医疗 AI", "Vector"],
    summary: "Waterloo AI 资深 PI，研究概率机器学习、强化学习、NLP 与医疗应用，并属于 Vector 跨校研究网络。",
    node: "Waterloo AI Group / Vector Institute", stage: "senior", x: 120, y: 1910,
    sources: [profile("Pascal Poupart Waterloo homepage", "https://cs.uwaterloo.ca/~ppoupart/", "Current appointment and research programme"), waterlooAi, vectorTeam],
  }),
  makePerson({
    id: "jimmy-lin-ca", name: "Jimmy Lin", role: "David R. Cheriton Chair · Professor", institution: "Waterloo",
    area: "Information Retrieval · Natural Language Processing · Data Systems", tags: ["信息检索", "NLP", "大数据", "Primal", "产业转化"],
    summary: "Waterloo 检索与 NLP 资深 PI，研究搜索、问答和数据密集型文本处理；个人主页记录其 Primal Chief Scientist 及过往 Twitter、Cloudera 产业经历。",
    node: "Waterloo Data Systems / AI Group", stage: "senior", x: 270, y: 1910,
    sources: [profile("Jimmy Lin Waterloo homepage", "https://cs.uwaterloo.ca/~jimmylin/", "Current chair, research and industry roles"), waterlooAi],
  }),
  makePerson({
    id: "kate-larson-ca", name: "Kate Larson", role: "Professor of Computer Science", institution: "Waterloo",
    area: "Multi-Agent Systems · Algorithmic Game Theory · AI Governance", tags: ["多智能体", "算法博弈", "机制设计", "AI 治理"],
    summary: "Waterloo 多智能体与算法博弈资深 PI，研究协作、机制设计与 AI 社会决策；2025 年当选 AAAI Fellow。",
    node: "Waterloo AI Group", stage: "senior", x: 420, y: 1910,
    sources: [waterlooAi, waterlooHighlights, profile("Kate Larson Waterloo homepage", "https://cs.uwaterloo.ca/~klarson/", "Research programme and publications")],
  }),
  makePerson({
    id: "wenhu-chen-ca", name: "Wenhu Chen", role: "Assistant Professor of Computer Science", institution: "Waterloo",
    area: "Natural Language Processing · Knowledge Reasoning · LLM Agents", tags: ["NLP", "知识推理", "LLM Agents", "多模态"],
    summary: "Waterloo NLP 新生代 PI，研究知识增强语言模型、复杂推理、多模态理解和智能体。",
    node: "Waterloo AI Group", stage: "emerging", x: 570, y: 1910,
    sources: [official("Waterloo profile story — Wenhu Chen", "https://uwaterloo.ca/computer-science/news/wenhu-chen-professor-studies-nlp-dl-knowledge-representation-reasoning", "Appointment, research areas and Waterloo AI network"), waterlooAi],
  }),
  makePerson({
    id: "freda-shi-ca", name: "Freda Shi", role: "Assistant Professor · Canada CIFAR AI Chair", institution: "Waterloo",
    area: "Natural Language Processing · Multilingual Learning · Language Models", tags: ["NLP", "多语言", "语言模型", "CIFAR AI Chair"],
    summary: "Waterloo NLP 新生代 PI，研究多语言学习、语言模型的能力边界与计算语言学；2024 年获 Canada CIFAR AI Chair。",
    node: "Waterloo AI Group", stage: "emerging", x: 720, y: 1910,
    sources: [waterlooAi, waterlooHighlights, profile("Freda Shi homepage", "https://freda-shi.github.io/", "Research programme and publications")],
  }),
  makePerson({
    id: "victor-zhong-ca", name: "Victor Zhong", role: "Assistant Professor · Canada CIFAR AI Chair", institution: "Waterloo",
    area: "Natural Language Processing · Language Agents · Reasoning", tags: ["NLP", "语言智能体", "推理", "人机交互"],
    summary: "Waterloo 语言智能体与交互学习 PI，研究语言驱动的智能体、推理、工具使用和交互式系统；2024 年获 Canada CIFAR AI Chair。",
    node: "Waterloo AI Group", stage: "emerging", x: 870, y: 1910,
    sources: [waterlooAi, waterlooHighlights, profile("Victor Zhong homepage", "https://www.victorzhong.com/", "Research programme and publications")],
  }),
  makePerson({
    id: "yuntian-deng-ca", name: "Yuntian Deng", role: "Assistant Professor of Computer Science", institution: "Waterloo",
    area: "Natural Language Processing · Machine Learning · Reasoning", tags: ["NLP", "机器学习", "推理", "语言模型"],
    summary: "Waterloo NLP 与机器学习新生代 PI，研究语言建模、推理和学习算法。",
    node: "Waterloo AI Group", stage: "emerging", x: 1020, y: 1910,
    sources: [waterlooAi, profile("Yuntian Deng homepage", "https://yuntiandeng.com/", "Current appointment and research programme")],
  }),
];

const hintonStudents = profile("Geoffrey Hinton former PhD students", "https://www.cs.utoronto.ca/~hinton/gradstuphd.html", "Named former PhD students and graduation years");
const jimmyBa = profile("Jimmy Ba homepage", "https://www.cs.utoronto.ca/~jba/", "Geoffrey Hinton doctoral supervision");
const milaImpact2025 = official("Mila 2024–25 impact report", "https://mila.quebec/sites/default/files/impact-reports/13130/2025rapportpdffinaleng.pdf", "Hugo Larochelle as former Yoshua Bengio student and 2025 Mila Scientific Director");
const hintonDnnResearch = official("U of T — Google acquires DNNresearch", "https://www.utoronto.ca/news/google-acquires-u-t-neural-networks-company", "Hinton, Sutskever and Krizhevsky founded DNNresearch and Google acquired it in 2013");

export const canadaExpansionRelationships: Relationship[] = [
  { id: "ca-hinton-jimmy-ba", from: "geoffrey-hinton-ca", to: "jimmy-ba-ca", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Jimmy Ba 个人主页明确写明其博士由 Geoffrey Hinton 指导。", source: jimmyBa, verified: true },
  { id: "ca-bengio-hugo", from: "yoshua-bengio-ca", to: "hugo-larochelle-ca", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Mila 2024–25 年报将 Hugo Larochelle 明确称为 Yoshua Bengio 的 former student。", source: milaImpact2025, verified: true },
];

export const canadaExpansionPlacements: StudentPlacement[] = [
  { id: "ca-hinton-ilya-dnnresearch", student: "Ilya Sutskever", teacherId: "geoffrey-hinton-ca", company: "DNNresearch / Google", role: "Co-founder · Research Scientist", kind: "founder", sector: "startup", degree: "PhD", graduationYear: 2012, note: "U of T 官方记录 DNNresearch 由 Hinton、Sutskever 与 Krizhevsky 创立，2013 年被 Google 收购。", source: hintonDnnResearch, verifiedAt: checkedAt },
  { id: "ca-hinton-alex-dnnresearch", student: "Alex Krizhevsky", teacherId: "geoffrey-hinton-ca", company: "DNNresearch / Google", role: "Co-founder · Research Scientist", kind: "founder", sector: "startup", degree: "PhD", note: "Hinton 官方学生页与 U of T 收购新闻共同支持其学生和创业身份。", source: hintonStudents, verifiedAt: checkedAt },
  { id: "ca-bengio-hugo-mila", student: "Hugo Larochelle", teacherId: "yoshua-bengio-ca", company: "Mila", role: "Scientific Director", kind: "current", sector: "other", currentRole: "Scientific Director", source: milaImpact2025, verifiedAt: checkedAt },
];

export const canadaExpansionGroupMembers: GroupMember[] = [
  { id: "ca-mcgill-nicholas-meade", teacherId: "siva-reddy-ca", name: "Nicholas Meade", role: "PhD Student", focus: "Natural language processing", source: mcgillRl },
  { id: "ca-mcgill-vaibhav-adlakha", teacherId: "siva-reddy-ca", name: "Vaibhav Adlakha", role: "PhD Student", focus: "NLP and deep learning", source: mcgillRl },
  { id: "ca-mcgill-meng-cao", teacherId: "jackie-cheung-ca", name: "Meng Cao", role: "PhD Student", focus: "NLP and deep learning", source: mcgillRl },
  { id: "ca-mcgill-veronica-chelu", teacherId: "doina-precup-ca", name: "Veronica Chelu", role: "PhD Student", focus: "Reinforcement and lifelong learning", source: mcgillRl },
];

export const canadaExpansionCoverage = [
  { region: "Canada" as Region, institution: "U of Toronto", core: 6, adjacent: 1, note: "6 位 current PI；Geoffrey Hinton 作为荣休/奠基节点显示，但不计入 current PI" },
  { region: "Canada" as Region, institution: "Université de Montréal", core: 6, adjacent: 0, note: "以 Mila 为跨校母体，覆盖深度学习、生成模型、AI 安全、图学习与优化" },
  { region: "Canada" as Region, institution: "McGill", core: 5, adjacent: 0, note: "强化学习、NLP、机器人与 AI for Climate；Joëlle Pineau 当前 part-time leave 且不招生" },
  { region: "Canada" as Region, institution: "Polytechnique Montréal", core: 1, adjacent: 0, note: "Christopher Pal 为本批代表性 Mila 核心学术成员" },
  { region: "Canada" as Region, institution: "UBC", core: 6, adjacent: 0, note: "视觉、NLP、优化、开放式 AI；与 Vector 存在跨地区学术网络" },
  { region: "Canada" as Region, institution: "University of Alberta", core: 6, adjacent: 0, note: "RLAI / Amii 强化学习主线，含 Richard Sutton 奠基节点与多位 current PI" },
  { region: "Canada" as Region, institution: "Waterloo", core: 7, adjacent: 0, note: "检索、NLP、语言智能体、多智能体与强化学习" },
];

export const canadaExpansionTopicCommunities = [
  { region: "Canada" as Region, kicker: "多伦多跨校网络", name: "Vector Institute ML, Vision & Responsible AI", anchor: "Geoffrey Hinton · Sanja Fidler · Roger Grosse · David Duvenaud · Jimmy Ba · Bo Wang · Richard Zemel", description: "以多伦多大学为重要学术母体，连接深度学习、视觉、概率建模、医疗 AI 与负责任 AI。", color: "cobalt" },
  { region: "Canada" as Region, kicker: "蒙特利尔跨校网络", name: "Mila Deep Learning, NLP & AI Safety", anchor: "Yoshua Bengio · Hugo Larochelle · Aaron Courville · Irina Rish · Jian Tang · Doina Precup · Siva Reddy", description: "跨 UdeM、McGill 与 Polytechnique Montréal，覆盖深度学习、强化学习、NLP、科学智能与 AI 安全。", color: "violet" },
  { region: "Canada" as Region, kicker: "强化学习学派", name: "Alberta RLAI & Amii", anchor: "Richard Sutton · Martha White · Adam White · Michael Bowling · Csaba Szepesvári · Patrick Pilarski", description: "从时序差分学习和强化学习理论延伸到多智能体、持续学习、游戏 AI 与真实人机系统。", color: "lime" },
  { region: "Canada" as Region, kicker: "跨三省语言智能", name: "Canadian NLP, Retrieval & Language Agents", anchor: "Siva Reddy · Jackie Cheung · Vered Shwartz · Hila Gonen · Jimmy Lin · Wenhu Chen · Freda Shi · Victor Zhong", description: "连接蒙特利尔、温哥华与滑铁卢的 NLP、检索、多语言、视觉语言和语言智能体研究。", color: "coral" },
] as const;

export const canadaAcademicCommunities: AcademicCommunity[] = [
  {
    id: "vector-canada-network", name: "Vector Institute 跨校学术网络", kicker: "研究院母体 · 多伦多与跨省成员", kind: "lab_network",
    roots: "历史根节点：Geoffrey Hinton；当前跨校研究团队：Vector Faculty",
    anchor: "U of Toronto · UBC · Waterloo · Ontario partner universities",
    description: "Vector 官方研究团队把多伦多大学的深度学习、视觉和医疗 AI 与 UBC、Waterloo 等跨省 PI 连接起来；成员关系表示研究院学术成员，不等于共同论文或师承。",
    color: "cobalt", regions: ["Canada" as Region],
    memberIds: ["geoffrey-hinton-ca", "sanja-fidler-ca", "roger-grosse-ca", "david-duvenaud-ca", "jimmy-ba-ca", "bo-wang-toronto-ca", "richard-zemel-ca", "leonid-sigal-ca", "vered-shwartz-ca", "jeff-clune-ca", "pascal-poupart-ca"],
    branches: [
      { label: "U of Toronto", memberIds: ["geoffrey-hinton-ca", "sanja-fidler-ca", "roger-grosse-ca", "david-duvenaud-ca", "jimmy-ba-ca", "bo-wang-toronto-ca", "richard-zemel-ca"] },
      { label: "跨省 Vector Faculty", memberIds: ["leonid-sigal-ca", "vered-shwartz-ca", "jeff-clune-ca", "pascal-poupart-ca"] },
    ],
    sources: [vectorTeam, torontoDirectory],
  },
  {
    id: "mila-canada-network", name: "Mila 跨校学术网络", kicker: "研究院母体 · 蒙特利尔多校", kind: "lab_network",
    roots: "创始节点：Yoshua Bengio；现任科学主任：Hugo Larochelle",
    anchor: "Université de Montréal · McGill · Polytechnique Montréal",
    description: "Mila 官方资料显示其横跨 UdeM、McGill、Polytechnique Montréal 与 HEC Montréal；此处记录本批已核验的核心学术成员。",
    color: "violet", regions: ["Canada" as Region],
    memberIds: ["yoshua-bengio-ca", "hugo-larochelle-ca", "aaron-courville-ca", "irina-rish-ca", "jian-tang-ca", "gauthier-gidel-ca", "christopher-pal-ca", "doina-precup-ca", "joelle-pineau-ca", "siva-reddy-ca", "jackie-cheung-ca", "david-rolnick-ca"],
    branches: [
      { label: "UdeM", memberIds: ["yoshua-bengio-ca", "hugo-larochelle-ca", "aaron-courville-ca", "irina-rish-ca", "jian-tang-ca", "gauthier-gidel-ca"] },
      { label: "McGill", memberIds: ["doina-precup-ca", "joelle-pineau-ca", "siva-reddy-ca", "jackie-cheung-ca", "david-rolnick-ca"] },
      { label: "Polytechnique Montréal", memberIds: ["christopher-pal-ca"] },
    ],
    sources: [milaHome, milaDirectory],
  },
  {
    id: "alberta-rlai-lineage", name: "Alberta RLAI / Amii 强化学习学派", kicker: "实验室母体 · 方法学谱系", kind: "lab_network",
    roots: "奠基节点：Richard S. Sutton",
    anchor: "University of Alberta · RLAI · Amii",
    description: "RLAI 官方成员页列出 Sutton 与多位当前 principal investigators，呈现阿尔伯塔强化学习从基础理论到游戏、持续学习和仿生交互的研究共同体。",
    color: "lime", regions: ["Canada" as Region],
    memberIds: ["richard-sutton-ca", "martha-white-ca", "adam-white-ca", "michael-bowling-ca", "csaba-szepesvari-ca", "patrick-pilarski-ca"],
    branches: [{ label: "RLAI principal investigators", memberIds: ["richard-sutton-ca", "martha-white-ca", "adam-white-ca", "michael-bowling-ca", "csaba-szepesvari-ca", "patrick-pilarski-ca"] }],
    sources: [rlai, official("Amii profile — Richard Sutton", "https://www.amii.ca/people/richard-s-sutton", "RLAI founding role, current Amii and UAlberta affiliations")],
  },
];

export const canadaExpansionIntegrationRequirements = {
  regionUnion: "Add Canada to Region",
  institutionUnion: canadaExpansionInstitutionLabels,
  regionLabel: { Canada: "加拿大" },
  navigationOrder: ["Mainland China", "Hong Kong", "Singapore", "United States", "Europe", "Canada"],
  suggestedTheme: { accent: "#ef4444", secondary: "#f8fafc", mapLabel: "CANADA" },
  integrationArrays: ["people", "relationships", "placements", "groupMembers", "coverage", "topicCommunities", "academicCommunities"],
  visibilityNote: "Geoffrey Hinton uses category=core, stage=historical, primary=false: visible as a foundational node but excluded from current-PI counts.",
  portraitNote: "No portrait mapping was landed in this module because the browser/export surface became unavailable after source verification; do not substitute unverified or scraped third-party images.",
} as const;

export const people = canadaExpansionPeople;
export const relationships = canadaExpansionRelationships;
export const placements = canadaExpansionPlacements;
export const groupMembers = canadaExpansionGroupMembers;
export const coverage = canadaExpansionCoverage;
export const topicCommunities = canadaExpansionTopicCommunities;
export const academicCommunities = canadaAcademicCommunities;
