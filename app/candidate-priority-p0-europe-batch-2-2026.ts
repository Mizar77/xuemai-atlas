import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  wenzelProfile: source(
    "EPFL · Wenzel Jakob",
    "https://people.epfl.ch/wenzel.jakob?lang=en",
    "official",
    "EPFL 现任副教授、Realistic Graphics Lab 负责人、研究方向、Cornell 博士师承、ETH 博士后经历与官方头像",
  ),
  wenzelLab: source(
    "EPFL Realistic Graphics Lab · Wenzel Jakob",
    "https://rgl.epfl.ch/people/wjakob",
    "profile",
    "实验室负责人、研究项目、课程和当前/历届博士生",
  ),
  olgaProfile: source(
    "ETH Zurich D-INFK · Olga Sorkine-Hornung",
    "https://inf.ethz.ch/people/person-detail.sorkine.html",
    "official",
    "ETH 计算机系全职教授、Interactive Geometry Lab 负责人、研究方向、教育与博士后经历及官方头像",
  ),
  olgaCv: source(
    "ETH Interactive Geometry Lab · Olga Sorkine-Hornung CV",
    "https://igl.ethz.ch/people/sorkine/Sorkine_CV.pdf",
    "cv",
    "特拉维夫大学博士论文、博士导师 Daniel Cohen-Or、完整学术任职与获奖记录",
  ),
  iainProfile: source(
    "University of Edinburgh Research Explorer · Iain Murray",
    "https://www.research.ed.ac.uk/en/persons/iain-murray/",
    "official",
    "机器学习与推断讲席教授、研究方向、UCL 博士训练与官方头像",
  ),
  iainBio: source(
    "University of Edinburgh · Iain Murray biography",
    "https://homepages.inf.ed.ac.uk/imurray2/bio.html",
    "profile",
    "现任教授、博士导师 Zoubin Ghahramani、Toronto fellowship、研究方向和 Amazon Scholar 经历",
  ),
  timothyProfile: source(
    "University of Edinburgh Research Explorer · Timothy Hospedales",
    "https://www.research.ed.ac.uk/en/persons/timothy-hospedales/",
    "official",
    "人工智能讲席教授、招生状态、教育经历、CV/机器人/机器学习方向与官方头像",
  ),
  timothyBio: source(
    "University of Edinburgh · Timothy Hospedales",
    "https://homepages.inf.ed.ac.uk/thospeda/",
    "profile",
    "Edinburgh 博士师承 Sethu Vijayakumar、Machine Intelligence Research group 与 Samsung AI Research Europe 职务",
  ),
  sethuProfile: source(
    "University of Edinburgh Research Explorer · Sethu Vijayakumar",
    "https://www.research.ed.ac.uk/en/persons/sethu-vijayakumar/",
    "official",
    "机器人学讲席教授、博士招生、Tokyo Institute of Technology 博士训练、现行产业合作项目与官方头像",
  ),
  sethuGroup: source(
    "University of Edinburgh SLMC · People",
    "https://informatics.ed.ac.uk/slmc/people",
    "official",
    "SLMC 负责人、机器人学习研究方向、研究人员与博士生团队",
  ),
  florianProfile: source(
    "ETH Zurich · Florian Tramèr",
    "https://informationsecurity.ethz.ch/people/person-detail.MjU5NzMw.TGlzdC8xMDgyLDEwNzA2NjcyNg%3D%3D.html",
    "official",
    "ETH 计算机系 tenure-track 助理教授现职及官方头像",
  ),
  florianNews: source(
    "ETH Zurich · Florian Tramèr USENIX Test of Time Award",
    "https://ethz.ch/staffnet/de/news-und-veranstaltungen/intern-aktuell/archiv/2026/08/florian-tramer-test-of-time-award.html",
    "official",
    "AI 安全与隐私研究、EPFL 本硕、Stanford 博士师承 Dan Boneh 与 Google Brain 经历",
  ),
  florianGroup: source(
    "Secure and Private AI Lab · People",
    "https://spylab.ai/",
    "profile",
    "Florian Tramèr 为 faculty，及实验室现任博士后、博士生和研究主题",
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
    src: `portraits/candidate-p0-europe-batch-2-2026/${seed.portraitFile}`,
    alt: `${seed.name} 官方头像`,
    source: seed.portraitSource,
  },
});

export const candidatePriorityP0EuropeBatch2People2026: Person[] = [
  person({
    id: "wenzel-jakob-epfl-p0-2026",
    name: "Wenzel Jakob",
    role: "Associate Professor · Realistic Graphics Lab Director",
    institution: "EPFL",
    region: "Europe",
    area: "Inverse Graphics · Differentiable Rendering · Appearance Modeling",
    tags: ["Inverse Graphics", "Differentiable Rendering", "Computer Graphics", "Mitsuba"],
    summary: "EPFL Realistic Graphics Lab 负责人，以可微渲染、逆向图形学与 Mitsuba 研究生态连接计算机视觉、图形学和科学计算。",
    stage: "emerging",
    x: 180,
    y: 150,
    portraitFile: "wenzel-jakob.jpg",
    portraitSource: sources.wenzelProfile,
    facts: [
      fact("当前任职", "EPFL 副教授并领导 Realistic Graphics Lab。", sources.wenzelProfile),
      fact("教育与学术训练", "在 Cornell University 完成计算机科学博士，导师为 Steve Marschner；随后在 ETH Zurich Interactive Geometry Lab 与 Olga Sorkine-Hornung 开展博士后研究。", sources.wenzelProfile),
      fact("研究主线", "逆向图形学、外观建模、物理渲染与可微渲染系统。", sources.wenzelProfile),
      fact("开放研究生态", "团队维护 Mitsuba，并公开当前和历届博士生及研究项目。", sources.wenzelLab),
    ],
    sources: [sources.wenzelProfile, sources.wenzelLab],
  }),
  person({
    id: "olga-sorkine-hornung-eth-p0-2026",
    name: "Olga Sorkine-Hornung",
    role: "Full Professor · Interactive Geometry Lab Director",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Geometry Processing · Computer Graphics · Digital Fabrication",
    tags: ["Geometry Processing", "Computer Graphics", "3D Modeling", "Digital Fabrication"],
    summary: "ETH Interactive Geometry Lab 负责人，是几何处理与交互式三维建模的重要学者；其培养与博士后网络连接 Tel Aviv、TU Berlin、NYU 和 EPFL。",
    stage: "senior",
    x: 360,
    y: 150,
    portraitFile: "olga-sorkine-hornung.jpg",
    portraitSource: sources.olgaProfile,
    facts: [
      fact("当前任职", "ETH Zurich 计算机系全职教授，领导 Institute of Visual Computing 下属 Interactive Geometry Lab。", sources.olgaProfile),
      fact("教育与学术训练", "2006 年获 Tel Aviv University 计算机科学博士，博士导师为 Daniel Cohen-Or；之后获 Humboldt Fellowship 在 TU Berlin 从事博士后研究。", sources.olgaCv),
      fact("研究主线", "几何处理、形状表达与建模、数字制造、计算机动画及离散微分几何。", sources.olgaProfile),
      fact("学术任职路径", "加入 ETH 前曾任 NYU Courant Institute 计算机科学助理教授。", sources.olgaProfile),
    ],
    sources: [sources.olgaProfile, sources.olgaCv],
  }),
  person({
    id: "iain-murray-edinburgh-p0-2026",
    name: "Iain Murray",
    role: "Personal Chair of Machine Learning and Inference",
    institution: "Edinburgh",
    region: "Europe",
    area: "Probabilistic Machine Learning · Bayesian Inference · MCMC",
    tags: ["Probabilistic ML", "Bayesian Inference", "MCMC", "Density Estimation"],
    summary: "Edinburgh 概率机器学习与推断讲席教授，研究贝叶斯推断、MCMC 和灵活生成模型；博士师承 Zoubin Ghahramani。",
    stage: "senior",
    x: 540,
    y: 150,
    portraitFile: "iain-murray.jpg",
    portraitSource: sources.iainProfile,
    facts: [
      fact("当前任职", "University of Edinburgh School of Informatics 机器学习与推断讲席教授。", sources.iainProfile),
      fact("教育与学术训练", "2007 年获 UCL Gatsby Computational Neuroscience Unit 博士，导师为 Zoubin Ghahramani；之后在 University of Toronto 任 Commonwealth Fellow。", sources.iainBio),
      fact("研究主线", "层次概率模型、贝叶斯推断、密度估计、MCMC 与神经推断方法。", sources.iainProfile),
      fact("产业连接", "2018–2024 年任 Amazon Scholar，并是欧洲首位获该任命者。", sources.iainBio),
    ],
    sources: [sources.iainProfile, sources.iainBio],
  }),
  person({
    id: "timothy-hospedales-edinburgh-p0-2026",
    name: "Timothy Hospedales",
    role: "Personal Chair of Artificial Intelligence · MIG Director",
    institution: "Edinburgh",
    region: "Europe",
    area: "Transfer Learning · Meta-Learning · Computer Vision · Robotics",
    tags: ["Meta-Learning", "Transfer Learning", "Computer Vision", "Vision-Language"],
    summary: "Edinburgh 人工智能讲席教授，研究迁移学习、元学习、视觉语言与机器人；同时连接 Samsung AI Research Europe 的产业研究体系。",
    stage: "senior",
    x: 720,
    y: 150,
    portraitFile: "timothy-hospedales.jpg",
    portraitSource: sources.timothyProfile,
    facts: [
      fact("当前任职", "University of Edinburgh School of Informatics 人工智能讲席教授，并领导 Machine Intelligence Research group。", sources.timothyProfile),
      fact("教育与学术训练", "University of Cambridge 计算机科学学士；2008 年获 University of Edinburgh 神经信息学博士，导师为 Sethu Vijayakumar。", sources.timothyBio),
      fact("研究主线", "迁移学习、元学习、终身学习、计算机视觉、视觉语言与机器人强化学习。", sources.timothyProfile),
      fact("产业连接", "本人机构主页列其为 Samsung AI Research Europe 的 VP AI / Head。", sources.timothyBio),
    ],
    sources: [sources.timothyProfile, sources.timothyBio],
  }),
  person({
    id: "sethu-vijayakumar-edinburgh-p0-2026",
    name: "Sethu Vijayakumar",
    role: "Personal Chair in Robotics · SLMC Director",
    institution: "Edinburgh",
    region: "Europe",
    area: "Robot Learning · Motion Planning · Optimal Control",
    tags: ["Robotics", "Robot Learning", "Optimal Control", "Humanoid Robotics"],
    summary: "Edinburgh 机器人学讲席教授与 SLMC 负责人，长期推动统计机器学习进入高自由度机器人控制，并形成连接学界与 Microsoft、Honda 等机构的研究网络。",
    stage: "senior",
    x: 900,
    y: 150,
    portraitFile: "sethu-vijayakumar.jpg",
    portraitSource: sources.sethuProfile,
    facts: [
      fact("当前任职", "University of Edinburgh School of Informatics 机器人学讲席教授，领导 Statistical Learning and Motor Control Group。", sources.sethuGroup),
      fact("教育与学术训练", "1998 年获 Tokyo Institute of Technology 计算机科学与工程博士，论文研究增量与主动学习。", sources.sethuProfile),
      fact("研究主线", "人形机器人、机器人学习、高维运动规划、最优控制与人体感觉运动适应。", sources.sethuGroup),
      fact("产业与机构合作", "Edinburgh 官方项目页列其与 Honda Research Institute Europe、Microsoft Research 等机构的长期机器人研究项目。", sources.sethuProfile),
    ],
    sources: [sources.sethuProfile, sources.sethuGroup],
  }),
  person({
    id: "florian-tramer-eth-p0-2026",
    name: "Florian Tramèr",
    role: "Assistant Professor · Secure and Private AI Lab Director",
    institution: "ETH Zurich",
    region: "Europe",
    area: "AI Security · Privacy · Robust Machine Learning",
    tags: ["AI Security", "Privacy", "Robustness", "LLM Security"],
    summary: "ETH Secure and Private AI Lab 负责人，研究机器学习与大模型的安全、隐私和鲁棒性；博士师承 Dan Boneh，并有 Google Brain 产业研究经历。",
    stage: "emerging",
    x: 1080,
    y: 150,
    portraitFile: "florian-tramer.jpg",
    portraitSource: sources.florianProfile,
    facts: [
      fact("当前任职", "ETH Zurich 计算机系 tenure-track 助理教授，并领导 Secure and Private AI Lab。", sources.florianProfile),
      fact("教育与学术训练", "在 EPFL 完成本科和硕士，随后于 Stanford University 完成博士，博士导师为 Dan Boneh。", sources.florianNews),
      fact("研究主线", "机器学习系统与大语言模型的安全、隐私、鲁棒性和可信性。", sources.florianNews),
      fact("产业连接", "加入 ETH 前曾在 Google Brain 工作。", sources.florianNews),
    ],
    sources: [sources.florianProfile, sources.florianNews, sources.florianGroup],
  }),
];

export const candidatePriorityP0EuropeBatch2Relationships2026: Relationship[] = [
  {
    id: "p0-eu2-olga-wenzel-postdoc",
    from: "olga-sorkine-hornung-eth-p0-2026",
    to: "wenzel-jakob-epfl-p0-2026",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导",
    evidence: "Wenzel Jakob 的 EPFL 官方简介写明，他在 ETH Zurich Interactive Geometry Lab 任博士后期间与 Olga Sorkine-Hornung 工作。",
    source: sources.wenzelProfile,
    verified: true,
  },
  {
    id: "p0-eu2-zoubin-iain-phd",
    from: "zoubin-ghahramani-eu",
    to: "iain-murray-edinburgh-p0-2026",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Iain Murray 的 Edinburgh 官方履历明确写明其 UCL 博士由 Zoubin Ghahramani 指导。",
    source: sources.iainProfile,
    verified: true,
  },
  {
    id: "p0-eu2-sethu-timothy-phd",
    from: "sethu-vijayakumar-edinburgh-p0-2026",
    to: "timothy-hospedales-edinburgh-p0-2026",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Timothy Hospedales 的 Edinburgh 机构个人主页明确列 Sethu Vijayakumar 为其神经信息学博士导师。",
    source: sources.timothyBio,
    verified: true,
  },
];

export const candidatePriorityP0EuropeBatch2Placements2026: StudentPlacement[] = [];

export const candidatePriorityP0EuropeBatch2GroupMembers2026: GroupMember[] = [
  {
    id: "p0-eu2-wenzel-lovro-nuic",
    teacherId: "wenzel-jakob-epfl-p0-2026",
    name: "Lovro Nuic",
    role: "PhD Student",
    focus: "Realistic and differentiable rendering",
    source: sources.wenzelProfile,
  },
  {
    id: "p0-eu2-florian-daniel-paleka",
    teacherId: "florian-tramer-eth-p0-2026",
    name: "Daniel Paleka",
    role: "PhD Student",
    focus: "Secure and private AI",
    source: sources.florianGroup,
  },
];

export const candidatePriorityP0EuropeBatch2RosterPromotions2026 = [
  { unitUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/", rosterName: "Wenzel Jakob", atlasPersonId: "wenzel-jakob-epfl-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Olga Sorkine-Hornung", atlasPersonId: "olga-sorkine-hornung-eth-p0-2026" },
  { unitUrl: "https://informatics.ed.ac.uk/people/academic-staff", rosterName: "Iain Murray", atlasPersonId: "iain-murray-edinburgh-p0-2026" },
  { unitUrl: "https://informatics.ed.ac.uk/people/academic-staff", rosterName: "Timothy Hospedales", atlasPersonId: "timothy-hospedales-edinburgh-p0-2026" },
  { unitUrl: "https://informatics.ed.ac.uk/people/academic-staff", rosterName: "Sethu Vijayakumar", atlasPersonId: "sethu-vijayakumar-edinburgh-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Florian Tramèr", atlasPersonId: "florian-tramer-eth-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch2People2026;
export const relationships = candidatePriorityP0EuropeBatch2Relationships2026;
export const placements = candidatePriorityP0EuropeBatch2Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch2GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch2RosterPromotions2026;
