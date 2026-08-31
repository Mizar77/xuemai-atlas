import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";
const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const iclr2024 = official("ICLR 2024 Outstanding Paper Awards", "https://blog.iclr.cc/2024/05/06/iclr-2024-outstanding-paper-awards/", "5 Outstanding Papers and 11 Honorable Mentions, with author lists and OpenReview links");
const iclr2025 = official("ICLR 2025 Outstanding Paper Awards", "https://blog.iclr.cc/2025/04/22/announcing-the-outstanding-paper-awards-at-iclr-2025/", "3 Outstanding Papers and 3 Honorable Mentions, with author lists and OpenReview links");
const iclr2026 = official("ICLR 2026 Outstanding Papers", "https://blog.iclr.cc/2026/04/23/announcing-the-iclr-2026-outstanding-papers/", "2 Outstanding Papers and 1 Honorable Mention, with author lists and OpenReview links");
const icml2024 = official("ICML 2024 Awards", "https://icml.cc/virtual/2024/awards_detail", "10 distinct Best Paper / position-paper records and their author lists");
const icml2025 = official("ICML 2025 Awards", "https://icml.cc/virtual/2025/awards_detail", "6 Outstanding Papers and 2 Outstanding Position Papers, with author lists and paper pages");
const icml2026 = official("ICML 2026 Awards", "https://blog.icml.cc/2026/07/05/announcing-the-icml-2026-awards/", "2 Outstanding Papers, 1 Outstanding Position Paper, 5 Honorable Mentions, and 1 position-paper Honorable Mention");

type FacultySeed = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Person["institution"];
  actualInstitution?: string;
  region: NonNullable<Person["region"]>;
  area: string;
  stage: Person["stage"];
  education: string;
  community: string;
  award: string;
  awardSource: Source;
  page: Source;
  recruiting?: string;
};

const profile = (label: string, url: string, supports: string) => official(label, url, supports);

const seeds: FacultySeed[] = [
  {
    id: "eero-simoncelli-award", name: "Eero P. Simoncelli", role: "Silver Professor · Neural Science, Mathematics, Data Science and Psychology", institution: "NYU", region: "United States", area: "Computational Vision · Statistical Image Models · Neuroscience", stage: "senior",
    education: "MIT doctoral training followed by a long-running NYU research career across neural science, mathematics and data science.", community: "NYU Center for Neural Science / Center for Data Science; develops mathematical and perceptual models of visual signals.", award: "ICLR 2024 Outstanding Paper · Generalization in diffusion models arises from geometry-adaptive harmonic representations.", awardSource: iclr2024,
    page: profile("NYU Center for Data Science · Eero Simoncelli", "https://cds.nyu.edu/team/eero-simoncelli/", "current Silver Professorship, cross-department appointments and research focus"),
  },
  {
    id: "stephane-mallat-award", name: "Stéphane Mallat", role: "Professor · Data Science Chair", institution: "External", actualInstitution: "Collège de France", region: "Europe", area: "Harmonic Analysis · Wavelets · Machine Learning", stage: "senior",
    education: "University of Pennsylvania PhD (1988); developed wavelet and scattering methods before taking the Collège de France Data Science chair.", community: "Collège de France Data Science chair and ENS-linked mathematical data-science network.", award: "ICLR 2024 Outstanding Paper · Generalization in diffusion models arises from geometry-adaptive harmonic representations.", awardSource: iclr2024,
    page: profile("Collège de France · Stéphane Mallat", "https://www.college-de-france.fr/en/chair/stephane-mallat-data-science-statutory-chair", "current chair, biography and research program"),
  },
  {
    id: "leslie-kaelbling-award", name: "Leslie Pack Kaelbling", role: "Panasonic Professor of Computer Science and Engineering", institution: "MIT", region: "United States", area: "Robotics · Planning · Reinforcement Learning", stage: "senior",
    education: "Stanford PhD; built a research career spanning reinforcement learning, planning and integrated robot intelligence.", community: "MIT CSAIL Learning and Intelligent Systems group principal investigator.", award: "ICLR 2024 Outstanding Paper · Learning Interactive Real-World Simulators.", awardSource: iclr2024,
    page: profile("MIT CSAIL · Leslie Kaelbling", "https://www.csail.mit.edu/person/leslie-kaelbling", "current professorship, research group and research areas"),
  },
  {
    id: "dale-schuurmans-award", name: "Dale Schuurmans", role: "Professor of Computing Science · Research Director, Google DeepMind", institution: "University of Alberta", region: "Canada", area: "Machine Learning · Reinforcement Learning · Optimization", stage: "senior",
    education: "University of Toronto PhD; academic leadership in machine learning alongside a public Google DeepMind research-director role.", community: "University of Alberta / Amii reinforcement-learning and machine-learning network.", award: "ICLR 2024 Outstanding Paper · Learning Interactive Real-World Simulators.", awardSource: iclr2024,
    page: profile("University of Alberta directory · Dale Schuurmans", "https://apps.ualberta.ca/directory/person/daes", "current university appointment, DeepMind role, education and research"),
  },
  {
    id: "richard-bonneau-award", name: "Richard Bonneau", role: "Professor of Biology and Computer Science", institution: "NYU", region: "United States", area: "Computational Biology · Protein Design · Machine Learning", stage: "senior",
    education: "University of Washington PhD; career connecting computational biology, systems biology and protein design.", community: "NYU Courant / Biology computational protein-science network.", award: "ICLR 2024 Outstanding Paper · Protein Discovery with Discrete Walk-Jump Sampling.", awardSource: iclr2024,
    page: profile("NYU Courant · Richard Bonneau", "https://cims.nyu.edu/people/profiles/data/BONNEAU_Richard_data.html", "current NYU role, education and research interests"),
  },
  {
    id: "julien-mairal-award", name: "Julien Mairal", role: "Inria Research Director · Thoth Team Lead", institution: "Inria", region: "Europe", area: "Machine Learning · Optimization · Computer Vision", stage: "senior",
    education: "Research trajectory through École Polytechnique, Inria and visual-recognition / optimization research.", community: "Inria Thoth team, working on mathematical foundations and visual learning.", award: "ICLR 2024 Outstanding Paper · Vision Transformers Need Registers.", awardSource: iclr2024,
    page: profile("Inria · Julien Mairal", "https://www.inria.fr/fr/julien-mairal-0", "current role, team leadership and research trajectory"),
  },
  {
    id: "guillaume-lajoie-award", name: "Guillaume Lajoie", role: "Associate Professor · Canada CIFAR AI Chair", institution: "Université de Montréal", region: "Canada", area: "AI and Neuroscience · Deep Learning · Dynamical Systems", stage: "senior",
    education: "Applied mathematics PhD at the University of Washington, followed by Max Planck and University of Washington postdoctoral work.", community: "Université de Montréal mathematics and statistics; Mila core academic member linking AI and neuroscience.", award: "ICLR 2024 Honorable Mention · Amortizing intractable inference in large language models.", awardSource: iclr2024,
    page: profile("Université de Montréal · Guillaume Lajoie", "https://recherche.umontreal.ca/chercheur/is/in29437/", "current appointment, chair, training and research themes"),
  },
  {
    id: "di-he-pku-award", name: "贺笛", role: "Assistant Professor · Doctoral Supervisor", institution: "PKU", region: "Mainland China", area: "Machine Learning · NLP · Graph Neural Networks", stage: "emerging",
    education: "北京大学博士，博士导师王立威；加入北大前曾任微软亚洲研究院主管研究员。", community: "北京大学人工智能研究院 / 机器学习研究网络。", award: "ICLR 2024 Honorable Mention · Beyond Weisfeiler-Lehman.", awardSource: iclr2024,
    page: profile("北京大学人工智能研究院 · 贺笛", "https://www.ai.pku.edu.cn/info/1154/2942.htm", "现职、研究方向与微软亚洲研究院职业轨迹"),
  },
  {
    id: "liwei-wang-pku-award", name: "王立威", role: "Professor · Doctoral Supervisor", institution: "PKU", region: "Mainland China", area: "Machine Learning Theory · Deep Learning · Optimization", stage: "senior",
    education: "北京大学博士（2005），长期从事机器学习理论、算法与深度学习研究。", community: "北京大学机器学习研究共同体，承担研究生培养与课程工作。", award: "ICLR 2024 Honorable Mention · Beyond Weisfeiler-Lehman.", awardSource: iclr2024,
    page: profile("北京大学人工智能研究院 · 王立威", "https://www.ai.pku.edu.cn/info/1284/1642.htm", "现职、教育与研究方向"),
  },
  {
    id: "deyu-meng-xjtu-award", name: "孟德宇", role: "Professor · Doctoral Supervisor", institution: "XJTU", region: "Mainland China", area: "Machine Learning · Computer Vision · Optimization", stage: "senior",
    education: "西安交通大学教授、博士生导师，长期研究机器学习、计算机视觉与人工智能。", community: "西安交通大学数学与人工智能交叉研究网络。", award: "ICLR 2024 Honorable Mention · Meta Continual Learning Revisited.", awardSource: iclr2024,
    page: profile("西安交通大学教师主页 · 孟德宇", "https://gr.xjtu.edu.cn/mengdeyu/zh_CN/zdylm/1068401/list/index.htm", "现职、研究方向与公开招生信息"), recruiting: "官方个人主页设有招生栏目，申请前仍应核对当年名额与要求。",
  },
  {
    id: "ying-wei-cityu-award", name: "Ying Wei", chinese: "魏颖", role: "Hundred Talents Researcher · Doctoral Supervisor", institution: "ZJU", region: "Mainland China", area: "Transfer Learning · Continual Learning · Foundation Models · AI for Science", stage: "emerging",
    education: "HKUST PhD (2017); subsequently worked at Tencent AI Lab and CityU before joining Zhejiang University.", community: "Zhejiang University School of Artificial Intelligence / Complife Lab; works on transfer, continual and foundation-model learning.", award: "ICLR 2024 Honorable Mention · Meta Continual Learning Revisited.", awardSource: iclr2024,
    page: profile("浙江大学 · 魏颖", "https://person.zju.edu.cn/0024167", "current appointment, doctoral-supervisor status and research directions"),
  },
  {
    id: "andrea-montanari-award", name: "Andrea Montanari", role: "Professor of Statistics and Electrical Engineering", institution: "Stanford", region: "United States", area: "High-Dimensional Statistics · Machine Learning Theory · Optimization", stage: "senior",
    education: "Academic career across mathematical physics, information theory and high-dimensional statistics.", community: "Stanford Statistics / Mathematics / EE theoretical machine-learning network.", award: "ICLR 2024 Honorable Mention · Towards a statistical theory of data selection under weak supervision.", awardSource: iclr2024,
    page: profile("Stanford Mathematics · Andrea Montanari", "https://mathematics.stanford.edu/people/andrea-montanari", "current appointment and research program"),
  },
  {
    id: "prateek-mittal-award", name: "Prateek Mittal", role: "Professor of Electrical and Computer Engineering", institution: "Princeton", region: "United States", area: "Privacy · Security · Adversarial Machine Learning", stage: "senior",
    education: "UC Berkeley PhD; built Princeton research programs connecting privacy, security and adversarial learning.", community: "Princeton ECE / Center for Information Technology Policy security-and-ML network.", award: "ICLR 2025 Outstanding Paper and Honorable Mention · Safety Alignment; Data Shapley.", awardSource: iclr2025,
    page: profile("Princeton · Prateek Mittal", "https://www.princeton.edu/~pmittal/", "current role, research themes and lab information"), recruiting: "Personal page publishes opportunities; applicants should verify the current call before contacting the group.",
  },
  {
    id: "peter-henderson-award", name: "Peter Henderson", role: "Assistant Professor · Computer Science and Public Affairs", institution: "Princeton", region: "United States", area: "Responsible AI · NLP · Law and Policy", stage: "emerging",
    education: "Stanford J.D./PhD (2023); joined Princeton across Computer Science, SPIA and CITP.", community: "Princeton CITP and machine-learning / law-and-policy research network.", award: "ICLR 2025 Outstanding Paper · Safety Alignment Should be Made More Than Just a Few Tokens Deep.", awardSource: iclr2025,
    page: profile("Princeton Computer Science · Peter Henderson", "https://www.cs.princeton.edu/people/profile/ph4162", "current joint appointments, education and research"),
  },
  {
    id: "danica-sutherland-award", name: "Danica J. Sutherland", role: "Associate Professor · Canada CIFAR AI Chair", institution: "UBC", region: "Canada", area: "Machine Learning Theory · Statistics · Deep Learning", stage: "senior",
    education: "CMU PhD advised by Jeff Schneider; faculty career in statistical and theoretical machine learning.", community: "UBC Computer Science / Amii-associated Canadian machine-learning network.", award: "ICLR 2025 Outstanding Paper · Learning Dynamics of LLM Finetuning.", awardSource: iclr2025,
    page: profile("UBC Computer Science · Danica Sutherland", "https://www.cs.ubc.ca/people/danica-sutherland", "current appointment, education, chair and research"),
  },
  {
    id: "xiangnan-he-ustc-award", name: "何向南", role: "Professor · Vice Dean, School of AI and Data Science", institution: "USTC", region: "Mainland China", area: "Recommender Systems · Information Retrieval · LLMs", stage: "senior",
    education: "新加坡国立大学计算机博士，后在多媒体推荐、信息检索和大模型方向建立研究团队。", community: "中国科学技术大学人工智能与数据科学学院推荐系统研究网络。", award: "ICLR 2025 Outstanding Paper · AlphaEdit.", awardSource: iclr2025,
    page: profile("中国科学技术大学 · 何向南", "https://faculty.ustc.edu.cn/hexiangnan/en/index.htm", "现职、学院管理角色与研究方向"),
  },
  {
    id: "dawn-song-award", name: "Dawn Song", role: "Professor of Electrical Engineering and Computer Sciences", institution: "Berkeley", region: "United States", area: "AI Security · Privacy · Trustworthy Machine Learning", stage: "senior",
    education: "UC Berkeley PhD; research career spanning systems security, privacy and trustworthy AI.", community: "Berkeley AI Research and Responsible Decentralized Intelligence research networks.", award: "ICLR 2025 Honorable Mention · Data Shapley in One Training Run.", awardSource: iclr2025,
    page: profile("UC Berkeley EECS · Dawn Song", "https://www2.eecs.berkeley.edu/Faculty/Homepages/song.html", "current professorship, education and research programs"),
  },
  {
    id: "tengyu-ma-award", name: "Tengyu Ma", role: "Assistant Professor of Computer Science and Statistics", institution: "Stanford", region: "United States", area: "Machine Learning Theory · Foundation Models · Optimization", stage: "emerging",
    education: "Princeton PhD; joined Stanford after research on the theory and practice of modern machine learning.", community: "Stanford AI Lab / ML theory and foundation-model research network.", award: "ICLR 2025 Honorable Mention · SAM 2.", awardSource: iclr2025,
    page: profile("Stanford · Tengyu Ma", "https://ai.stanford.edu/~tengyuma/", "current appointments, research and group roster"),
  },
  {
    id: "ryan-cotterell-award", name: "Ryan Cotterell", role: "Assistant Professor of Computer Science", institution: "ETH Zurich", region: "Europe", area: "NLP · Computational Linguistics · Formal Language Theory", stage: "emerging",
    education: "University of Cambridge doctoral training and lectureship before joining ETH Zurich in 2020.", community: "ETH Rycolab / Institute for Machine Learning and ETH AI Center.", award: "ICLR 2026 Outstanding Paper · Transformers are Inherently Succinct.", awardSource: iclr2026,
    page: profile("ETH Zurich · Ryan Cotterell", "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2020/02/welcome-professor-ryan-cotterell.html", "appointment, prior trajectory and NLP research"),
  },
  {
    id: "jennifer-neville-award", name: "Jennifer Neville", role: "Professor of Computer Science and Statistics", institution: "External", actualInstitution: "Purdue University", region: "United States", area: "Relational Machine Learning · Data Mining · AI Evaluation", stage: "senior",
    education: "University of Massachusetts Amherst PhD; established a faculty program in relational learning and data mining at Purdue.", community: "Purdue Computer Science / Statistics machine-learning network.", award: "ICLR 2026 Outstanding Paper · LLMs Get Lost In Multi-Turn Conversation.", awardSource: iclr2026,
    page: profile("Purdue Computer Science · Jennifer Neville", "https://www.cs.purdue.edu/people/faculty/neville.html", "current appointments, education and research"),
  },
  {
    id: "christopher-musco-award", name: "Christopher Musco", role: "Associate Professor of Computer Science and Engineering", institution: "NYU", region: "United States", area: "Randomized Algorithms · Numerical Linear Algebra · Machine Learning", stage: "senior",
    education: "MIT PhD; joined NYU after research on algorithmic foundations of data science and machine learning.", community: "NYU Tandon algorithms and machine-learning theory network.", award: "ICLR 2026 Honorable Mention · The Polar Express.", awardSource: iclr2026,
    page: profile("NYU Tandon · Christopher Musco", "https://engineering.nyu.edu/faculty/christopher-musco", "current appointment, education and research"),
  },
  {
    id: "daniel-roy-award", name: "Daniel M. Roy", role: "Professor of Statistical Sciences and Computer Science", institution: "U of Toronto", region: "Canada", area: "Machine Learning Theory · Probabilistic Programming · Statistics", stage: "senior",
    education: "MIT PhD; faculty program on statistical foundations, probabilistic programming and the theory of learning.", community: "University of Toronto Statistics / Computer Science, Vector Institute and CIFAR network.", award: "ICML 2024 Best Paper · Information Complexity of Stochastic Convex Optimization.", awardSource: icml2024,
    page: profile("University of Toronto Statistics · Daniel Roy", "https://www.statistics.utoronto.ca/people/directories/all-faculty/daniel-roy", "current appointments, affiliations, education and research"),
  },
  {
    id: "ming-hsuan-yang-award", name: "Ming-Hsuan Yang", role: "Professor of Electrical Engineering and Computer Science", institution: "External", actualInstitution: "University of California, Merced", region: "United States", area: "Computer Vision · Machine Learning · Pattern Recognition", stage: "senior",
    education: "University of Illinois Urbana-Champaign PhD; faculty career in visual tracking, recognition and machine learning.", community: "UC Merced EECS visual learning and computer-vision network.", award: "ICML 2024 Best Paper · VideoPoet.", awardSource: icml2024,
    page: profile("UC Merced EECS · Ming-Hsuan Yang", "https://eecs.ucmerced.edu/content/ming-hsuan-yang", "current role, education and research"),
  },
  {
    id: "aditi-raghunathan-award", name: "Aditi Raghunathan", role: "Assistant Professor of Computer Science", institution: "CMU", region: "United States", area: "Reliable Machine Learning · Frontier Model Evaluation · Robustness", stage: "emerging",
    education: "Stanford Computer Science PhD advised by Percy Liang; joined CMU in 2022.", community: "AI Reliability at CMU; affiliated with the Machine Learning Department.", award: "ICML 2025 Outstanding Paper · Roll the dice & look before you leap.", awardSource: icml2025,
    page: profile("CMU Computer Science · Aditi Raghunathan", "https://csd.cs.cmu.edu/people/faculty/aditi-raghunathan", "current appointment, research and advisees"), recruiting: "Her CMU-hosted group page publishes an application route for current CMU undergraduate and master's students.",
  },
  {
    id: "thomas-griffiths-award", name: "Thomas L. Griffiths", role: "Professor of Psychology and Computer Science", institution: "Princeton", region: "United States", area: "Cognitive Science · Machine Learning · Bayesian Models", stage: "senior",
    education: "Academic program combining mathematical models of cognition with machine learning and human problem solving.", community: "Princeton Laboratory for Artificial Intelligence and Psychology / Computer Science network.", award: "ICML 2025 Outstanding Paper · Conformal Prediction as Bayesian Quadrature.", awardSource: icml2025,
    page: profile("Princeton Engineering · Tom Griffiths", "https://engineering.princeton.edu/faculty/tom-griffiths", "current endowed professorship, joint appointments and research"),
  },
  {
    id: "sham-kakade-award", name: "Sham M. Kakade", role: "Rampell Family Professor of Computer Science and Statistics", institution: "External", actualInstitution: "Harvard University", region: "United States", area: "Machine Learning Theory · Reinforcement Learning · Foundation Models", stage: "senior",
    education: "UCL Gatsby Unit PhD; prior faculty and research roles at the University of Washington and Microsoft Research before Harvard.", community: "Co-director of the Kempner Institute for the Study of Natural and Artificial Intelligence.", award: "ICML 2025 Outstanding Paper · Train for the Worst, Plan for the Best.", awardSource: icml2025,
    page: profile("Harvard SEAS · Sham Kakade", "https://seas.harvard.edu/person/sham-kakade", "current professorship, Kempner leadership and research"), recruiting: "Official personal page explicitly invites prospective students with ML, optimization, mathematics and theory backgrounds.",
  },
  {
    id: "james-zou-award", name: "James Zou", role: "Associate Professor of Biomedical Data Science", institution: "Stanford", region: "United States", area: "Reliable AI · Biomedical Machine Learning · Human-Compatible AI", stage: "senior",
    education: "Harvard PhD (2014), followed by Microsoft Research and a Simons fellowship at Berkeley; joined Stanford in 2016.", community: "Stanford Biomedical Data Science / SAIL / HAI research network.", award: "ICML 2025 Outstanding Paper · CollabLLM.", awardSource: icml2025,
    page: profile("Stanford Profiles · James Zou", "https://profiles.stanford.edu/james-zou", "current appointments, education, group and research"),
  },
  {
    id: "constantinos-daskalakis-award", name: "Constantinos Daskalakis", role: "Avanessians Professor of Electrical Engineering and Computer Science", institution: "MIT", region: "United States", area: "Theory of Computation · Game Theory · Machine Learning", stage: "senior",
    education: "UC Berkeley PhD advised by Christos Papadimitriou; faculty career in computation, economics and learning theory.", community: "MIT CSAIL theory, game-theory and machine-learning network.", award: "ICML 2026 Outstanding Paper · High-Accuracy Sampling for Diffusion Models and Log-Concave Distributions.", awardSource: icml2026,
    page: profile("MIT CSAIL · Constantinos Daskalakis", "https://people.csail.mit.edu/costis/", "current professorship, education, research and ICML 2026 recognition"),
  },
];

const makePerson = (seed: FacultySeed, index: number): Person => ({
  id: seed.id,
  name: seed.name,
  chinese: seed.chinese,
  role: seed.role,
  institution: seed.institution,
  actualInstitution: seed.actualInstitution,
  region: seed.region,
  area: seed.area,
  tags: ["ICLR / ICML award-audited faculty", ...seed.area.split(" · ").slice(0, 3)],
  summary: `${seed.role}。${seed.community}；作为现任 faculty / 独立 PI 参与 ${seed.award}`,
  facts: [
    { label: "当前角色", value: seed.role, source: seed.page },
    { label: "教育与职业轨迹", value: seed.education, source: seed.page },
    { label: "研究共同体", value: seed.community, source: seed.page },
    { label: "获奖论文", value: seed.award, source: seed.awardSource },
    ...(seed.recruiting ? [{ label: "公开招生状态", value: seed.recruiting, source: seed.page }] : []),
  ],
  stage: seed.stage,
  category: "core",
  status: "current PI · award-audited",
  sources: [seed.page, seed.awardSource],
  x: 150 + (index % 7) * 165,
  y: 150 + Math.floor(index / 7) * 150,
  primary: true,
  lastVerifiedAt: checkedAt,
});

export const iclrIcmlAwardAuditPeople: Person[] = seeds.map(makePerson);

const heDiThesis = official("北京大学博士学位论文答辩信息 · 贺笛", "https://grs.pku.edu.cn/sjdj/bs/index617.htm", "博士候选人贺笛及导师王立威");

export const iclrIcmlAwardAuditRelationships: Relationship[] = [
  {
    id: "award-audit-liwei-wang-di-he",
    from: "liwei-wang-pku-award",
    to: "di-he-pku-award",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "北京大学研究生院博士论文答辩记录明确列出贺笛为博士候选人、王立威为导师。",
    source: heDiThesis,
    verified: true,
  },
];

export type AwardFacultyAudit = {
  name: string;
  status: "covered" | "added" | "out_of_scope" | "industry_or_nonfaculty" | "deferred";
  personId?: string;
  note?: string;
};

export type IclrIcmlAwardRecord = {
  id: string;
  venue: "ICLR" | "ICML";
  year: 2024 | 2025 | 2026;
  distinction: "Outstanding Paper" | "Best Paper" | "Honorable Mention" | "Outstanding Position Paper" | "Position Paper Honorable Mention";
  title: string;
  authors: string[];
  awardSource: Source;
  paperUrl: string;
  facultyAudit: AwardFacultyAudit[];
};

const audit = (name: string, status: AwardFacultyAudit["status"], personId?: string, note?: string): AwardFacultyAudit => ({ name, status, personId, note });
const record = (id: string, venue: IclrIcmlAwardRecord["venue"], year: IclrIcmlAwardRecord["year"], distinction: IclrIcmlAwardRecord["distinction"], title: string, authors: string, paperUrl: string, awardSource: Source, facultyAudit: AwardFacultyAudit[] = []): IclrIcmlAwardRecord => ({
  id, venue, year, distinction, title, authors: authors.split(" | "), paperUrl, awardSource, facultyAudit,
});

export const iclrIcmlAwardRecords: IclrIcmlAwardRecord[] = [
  record("iclr24-diffusion-geometry", "ICLR", 2024, "Outstanding Paper", "Generalization in diffusion models arises from geometry-adaptive harmonic representations", "Zahra Kadkhodaie | Florentin Guth | Eero P Simoncelli | Stéphane Mallat", "https://openreview.net/forum?id=ANvmVS2Yr0", iclr2024, [audit("Eero P. Simoncelli", "added", "eero-simoncelli-award"), audit("Stéphane Mallat", "added", "stephane-mallat-award")]),
  record("iclr24-unisim", "ICLR", 2024, "Outstanding Paper", "Learning Interactive Real-World Simulators", "Sherry Yang | Yilun Du | Seyed Kamyar Seyed Ghasemipour | Jonathan Tompson | Leslie Pack Kaelbling | Dale Schuurmans | Pieter Abbeel", "https://openreview.net/forum?id=sFyTZEqmUY", iclr2024, [audit("Leslie Pack Kaelbling", "added", "leslie-kaelbling-award"), audit("Dale Schuurmans", "added", "dale-schuurmans-award"), audit("Pieter Abbeel", "covered", "pieter-abbeel-us")]),
  record("iclr24-never-scratch", "ICLR", 2024, "Outstanding Paper", "Never Train from Scratch: Fair Comparison of Long-Sequence Models Requires Data-Driven Priors", "Ido Amos | Jonathan Berant | Ankit Gupta", "https://openreview.net/forum?id=PdaPky8MUn", iclr2024, [audit("Jonathan Berant", "out_of_scope", undefined, "Current faculty in Israel; retained in report only")]),
  record("iclr24-protein", "ICLR", 2024, "Outstanding Paper", "Protein Discovery with Discrete Walk-Jump Sampling", "Nathan C. Frey | Dan Berenberg | Karina Zadorozhny | Joseph Kleinhenz | Julien Lafrance-Vanasse | Isidro Hotzel | Yan Wu | Stephen Ra | Richard Bonneau | Kyunghyun Cho | Andreas Loukas | Vladimir Gligorijevic | Saeed Saremi", "https://openreview.net/forum?id=zMPHKOmQNb", iclr2024, [audit("Richard Bonneau", "added", "richard-bonneau-award"), audit("Kyunghyun Cho", "covered", "kyunghyun-cho-us"), audit("Andreas Loukas", "deferred", undefined, "Current faculty in Switzerland; official current-faculty page was not fully audited in this pass")]),
  record("iclr24-registers", "ICLR", 2024, "Outstanding Paper", "Vision Transformers Need Registers", "Timothée Darcet | Maxime Oquab | Julien Mairal | Piotr Bojanowski", "https://openreview.net/forum?id=2dnO3LLiJ1", iclr2024, [audit("Julien Mairal", "added", "julien-mairal-award")]),
  record("iclr24-amortized", "ICLR", 2024, "Honorable Mention", "Amortizing intractable inference in large language models", "Edward J Hu | Moksh Jain | Eric Elmoznino | Younesse Kaddar | Guillaume Lajoie | Yoshua Bengio | Nikolay Malkin", "https://openreview.net/forum?id=Ouj6p4ca60", iclr2024, [audit("Guillaume Lajoie", "added", "guillaume-lajoie-award"), audit("Yoshua Bengio", "covered", "yoshua-bengio-ca")]),
  record("iclr24-nash", "ICLR", 2024, "Honorable Mention", "Approximating Nash Equilibria in Normal-Form Games via Stochastic Optimization", "Ian Gemp | Luke Marris | Georgios Piliouras", "https://openreview.net/forum?id=cc8h3I3V4E", iclr2024, [audit("Georgios Piliouras", "deferred", undefined, "Official current-faculty page was not sufficiently verified in this pass")]),
  record("iclr24-gnn", "ICLR", 2024, "Honorable Mention", "Beyond Weisfeiler-Lehman: A Quantitative Framework for GNN Expressiveness", "Bohang Zhang | Jingchu Gai | Yiheng Du | Qiwei Ye | Di He | Liwei Wang", "https://openreview.net/forum?id=HSKaGOi7Ar", iclr2024, [audit("Di He", "added", "di-he-pku-award"), audit("Liwei Wang", "added", "liwei-wang-pku-award")]),
  record("iclr24-flow", "ICLR", 2024, "Honorable Mention", "Flow Matching on General Geometries", "Ricky T. Q. Chen | Yaron Lipman", "https://openreview.net/forum?id=g7ohDlTITL", iclr2024, [audit("Yaron Lipman", "out_of_scope", undefined, "Current faculty in Israel")]),
  record("iclr24-video", "ICLR", 2024, "Honorable Mention", "Is ImageNet worth 1 video? Learning strong image encoders from 1 long unlabelled video", "Shashanka Venkataramanan | Mamshad Nayeem Rizve | Joao Carreira | Yuki M Asano | Yannis Avrithis", "https://openreview.net/forum?id=Yen1lGns2o", iclr2024),
  record("iclr24-continual", "ICLR", 2024, "Honorable Mention", "Meta Continual Learning Revisited", "Yichen Wu | Long-Kai Huang | Renzhen Wang | Deyu Meng | Ying Wei", "https://openreview.net/forum?id=TpD2aG1h0D", iclr2024, [audit("Deyu Meng", "added", "deyu-meng-xjtu-award"), audit("Ying Wei", "added", "ying-wei-cityu-award")]),
  record("iclr24-kv", "ICLR", 2024, "Honorable Mention", "Model Tells You What to Discard: Adaptive KV Cache Compression for LLMs", "Suyu Ge | Yunan Zhang | Liyuan Liu | Minjia Zhang | Jiawei Han | Jianfeng Gao", "https://openreview.net/forum?id=uNrFpDPMyo", iclr2024, [audit("Jiawei Han", "covered", "jiawei-han-us"), audit("Jianfeng Gao", "covered", "jianfeng-gao-us")]),
  record("iclr24-contamination", "ICLR", 2024, "Honorable Mention", "Proving Test Set Contamination in Black-Box Language Models", "Yonatan Oren | Nicole Meister | Niladri S. Chatterji | Faisal Ladhak | Tatsunori Hashimoto", "https://openreview.net/forum?id=KS8mIvetg2", iclr2024, [audit("Tatsunori Hashimoto", "covered", "tatsunori-hashimoto-us")]),
  record("iclr24-causal", "ICLR", 2024, "Honorable Mention", "Robust agents learn causal world models", "Jonathan Richens | Tom Everitt", "https://openreview.net/forum?id=pOoKI3ouv1", iclr2024),
  record("iclr24-mechanistic", "ICLR", 2024, "Honorable Mention", "The mechanistic basis of data dependence and abrupt learning in an in-context classification task", "Gautam Reddy", "https://openreview.net/forum?id=aN4Jf6Cx69", iclr2024),
  record("iclr24-selection", "ICLR", 2024, "Honorable Mention", "Towards a statistical theory of data selection under weak supervision", "Germain Kolossov | Andrea Montanari | Pulkit Tandon", "https://openreview.net/forum?id=HhfcNgQn6p", iclr2024, [audit("Andrea Montanari", "added", "andrea-montanari-award")]),

  record("iclr25-safety", "ICLR", 2025, "Outstanding Paper", "Safety Alignment Should be Made More Than Just a Few Tokens Deep", "Xiangyu Qi | Ashwinee Panda | Kaifeng Lyu | Xiao Ma | Subhrajit Roy | Ahmad Beirami | Prateek Mittal | Peter Henderson", "https://openreview.net/forum?id=6Mxhg9PtDE", iclr2025, [audit("Prateek Mittal", "added", "prateek-mittal-award"), audit("Peter Henderson", "added", "peter-henderson-award")]),
  record("iclr25-finetuning", "ICLR", 2025, "Outstanding Paper", "Learning Dynamics of LLM Finetuning", "Yi Ren | Danica J. Sutherland", "https://openreview.net/forum?id=tPNHOoZFl9", iclr2025, [audit("Danica J. Sutherland", "added", "danica-sutherland-award")]),
  record("iclr25-alphaedit", "ICLR", 2025, "Outstanding Paper", "AlphaEdit: Null-Space Constrained Model Editing for Language Models", "Junfeng Fang | Houcheng Jiang | Kun Wang | Yunshan Ma | Jie Shi | Xiang Wang | Xiangnan He | Tat-Seng Chua", "https://openreview.net/forum?id=HvSytvg3Jh", iclr2025, [audit("Xiangnan He", "added", "xiangnan-he-ustc-award"), audit("Tat-Seng Chua", "covered", "tat-seng-chua")]),
  record("iclr25-shapley", "ICLR", 2025, "Honorable Mention", "Data Shapley in One Training Run", "Jiachen T. Wang | Prateek Mittal | Dawn Song | Ruoxi Jia", "https://openreview.net/forum?id=HD6bWcj87Y", iclr2025, [audit("Prateek Mittal", "added", "prateek-mittal-award"), audit("Dawn Song", "added", "dawn-song-award"), audit("Ruoxi Jia", "covered", "ruoxi-jia-award", "Added by the ACL award audit module")]),
  record("iclr25-sam2", "ICLR", 2025, "Honorable Mention", "SAM 2: Segment Anything in Images and Videos", "Nikhila Ravi | Valentin Gabeur | Yuan-Ting Hu | Ronghang Hu | Chaitanya Ryali | Tengyu Ma | Haitham Khedr | Roman Rädle | Chloe Rolland | Laura Gustafson | Eric Mintun | Junting Pan | Kalyan Vasudev Alwala | Nicolas Carion | Chao-Yuan Wu | Ross Girshick | Piotr Dollar | Christoph Feichtenhofer", "https://openreview.net/forum?id=Ha6RTeWMd0", iclr2025, [audit("Tengyu Ma", "added", "tengyu-ma-award")]),
  record("iclr25-cascades", "ICLR", 2025, "Honorable Mention", "Faster Cascades via Speculative Decoding", "Harikrishna Narasimhan | Wittawat Jitkrittum | Ankit Singh Rawat | Seungyeon Kim | Neha Gupta | Aditya Krishna Menon | Sanjiv Kumar", "https://openreview.net/forum?id=vo9t20wsmd", iclr2025, [audit("Author set", "industry_or_nonfaculty", undefined, "No verified current six-region faculty / independent PI in this author set")]),

  record("iclr26-succinct", "ICLR", 2026, "Outstanding Paper", "Transformers are Inherently Succinct", "Pascal Bergsträßer | Ryan Cotterell | Anthony Widjaja Lin", "https://openreview.net/forum?id=Yxz92UuPLQ", iclr2026, [audit("Ryan Cotterell", "added", "ryan-cotterell-award")]),
  record("iclr26-multiturn", "ICLR", 2026, "Outstanding Paper", "LLMs Get Lost In Multi-Turn Conversation", "Philippe Laban | Hiroaki Hayashi | Yingbo Zhou | Jennifer Neville", "https://openreview.net/forum?id=VKGTGGcwl6", iclr2026, [audit("Jennifer Neville", "added", "jennifer-neville-award")]),
  record("iclr26-polar", "ICLR", 2026, "Honorable Mention", "The Polar Express: Optimal Matrix Sign Methods and their Application to the Muon Algorithm", "Noah Amsel | David Persson | Christopher Musco | Robert M. Gower", "https://openreview.net/forum?id=yRtgZ1K8hO", iclr2026, [audit("Christopher Musco", "added", "christopher-musco-award"), audit("Robert M. Gower", "deferred", undefined, "Current faculty in France; official current-faculty page was not fully audited in this pass")]),

  record("icml24-stealing", "ICML", 2024, "Best Paper", "Stealing part of a production language model", "Nicholas Carlini | Daniel Paleka | Krishnamurthy Dvijotham | Thomas Steinke | Jonathan Hayase | A. Feder Cooper | Katherine Lee | Matthew Jagielski | Milad Nasr | Arthur Conmy | Eric Wallace | David Rolnick | Florian Tramer", "https://icml.cc/virtual/2024/poster/33922", icml2024, [audit("David Rolnick", "covered", "david-rolnick-ca")]),
  record("icml24-dp-position", "ICML", 2024, "Best Paper", "Position: Considerations for Differentially Private Learning with Large-Scale Public Pretraining", "Florian Tramer | Gautam Kamath | Nicholas Carlini", "https://icml.cc/virtual/2024/poster/33114", icml2024),
  record("icml24-diversity-position", "ICML", 2024, "Best Paper", "Position: Measure Dataset Diversity, Don't Just Claim It", "Dora Zhao | Jerone Andrews | Orestis Papakyriakopoulos | Alice Xiang", "https://icml.cc/virtual/2024/oral/35476", icml2024),
  record("icml24-rectified-flow", "ICML", 2024, "Best Paper", "Scaling Rectified Flow Transformers for High-Resolution Image Synthesis", "Patrick Esser | Sumith Kulal | Andreas Blattmann | Rahim Entezari | Jonas Müller | Harry Saini | Yam Levi | Dominik Lorenz | Axel Sauer | Frederic Boesel | Dustin Podell | Tim Dockhorn | Zion English | Robin Rombach", "https://icml.cc/virtual/2024/oral/35548", icml2024, [audit("Author set", "industry_or_nonfaculty")]),
  record("icml24-information", "ICML", 2024, "Best Paper", "Information Complexity of Stochastic Convex Optimization: Applications to Generalization, Memorization, and Tracing", "Idan Attias | Gintare Karolina Dziugaite | Mahdi Haghifam | Roi Livni | Daniel Roy", "https://icml.cc/virtual/2024/poster/34649", icml2024, [audit("Roi Livni", "out_of_scope", undefined, "Current faculty in Israel"), audit("Daniel Roy", "added", "daniel-roy-award")]),
  record("icml24-twisted", "ICML", 2024, "Best Paper", "Probabilistic Inference in Language Models via Twisted Sequential Monte Carlo", "Stephen Zhao | Rob Brekelmans | Alireza Makhzani | Roger Grosse", "https://icml.cc/virtual/2024/oral/35490", icml2024, [audit("Roger Grosse", "covered", "roger-grosse-ca")]),
  record("icml24-discrete", "ICML", 2024, "Best Paper", "Discrete Diffusion Modeling by Estimating the Ratios of the Data Distribution", "Aaron Lou | Chenlin Meng | Stefano Ermon", "https://icml.cc/virtual/2024/poster/34686", icml2024, [audit("Stefano Ermon", "covered", "stefano-ermon-us")]),
  record("icml24-debate", "ICML", 2024, "Best Paper", "Debating with More Persuasive LLMs Leads to More Truthful Answers", "Akbir Khan | John Hughes | Dan Valentine | Laura Ruis | Kshitij Sachan | Ansh Radhakrishnan | Edward Grefenstette | Samuel Bowman | Tim Rocktäschel | Ethan Perez", "https://icml.cc/virtual/2024/poster/33360", icml2024, [audit("Samuel Bowman", "covered", "samuel-bowman-us"), audit("Tim Rocktäschel", "covered", "tim-rocktaschel-eu")]),
  record("icml24-genie", "ICML", 2024, "Best Paper", "Genie: Generative Interactive Environments", "Jake Bruce | Michael Dennis | Ashley Edwards | Jack Parker-Holder | Yuge Shi | Edward Hughes | Matthew Lai | Aditi Mavalankar | Richie Steigerwald | Chris Apps | Yusuf Aytar | Sarah Bechtle | Feryal Behbahani | Stephanie Chan | Nicolas Heess | Lucy Gonzalez | Simon Osindero | Sherjil Ozair | Scott Reed | Jingwei Zhang | Konrad Zolna | Jeff Clune | Nando de Freitas | Satinder Singh | Tim Rocktäschel", "https://icml.cc/virtual/2024/oral/35508", icml2024, [audit("Jeff Clune", "covered", "jeff-clune-ca"), audit("Satinder Singh", "covered", "satinder-singh-us"), audit("Tim Rocktäschel", "covered", "tim-rocktaschel-eu")]),
  record("icml24-videopoet", "ICML", 2024, "Best Paper", "VideoPoet: A Large Language Model for Zero-Shot Video Generation", "Dan Kondratyuk | Lijun Yu | Xiuye Gu | Jose Lezama | Jonathan Huang | Grant Schindler | Rachel Hornung | Vighnesh N Birodkar | Jimmy Yan | Ming-Chang Chiu | Krishna Somandepalli | Hassan Akbari | Yair Alon | Yong Cheng | Joshua V Dillon | Agrim Gupta | Meera Hahn | Anja Hauth | David Hendon | Alonso Martinez | David Minnen | Mikhail Sirotenko | Kihyuk Sohn | Xuan Yang | Hartwig Adam | Ming-Hsuan Yang | Irfan Essa | Huisheng Wang | David Ross | Bryan Seybold | Lu Jiang", "https://icml.cc/virtual/2024/poster/34296", icml2024, [audit("Ming-Hsuan Yang", "added", "ming-hsuan-yang-award"), audit("Irfan Essa", "covered", "irfan-essa-us")]),

  record("icml25-worst-off", "ICML", 2025, "Outstanding Paper", "The Value of Prediction in Identifying the Worst-Off", "Unai Fischer Abaigar | Christoph Kern | Juan Perdomo", "https://icml.cc/virtual/2025/poster/46605", icml2025, [audit("Juan Perdomo", "deferred", undefined, "Current-faculty status/profile was not fully verified in this pass")]),
  record("icml25-dice", "ICML", 2025, "Outstanding Paper", "Roll the dice & look before you leap: Going beyond the creative limits of next-token prediction", "Vaishnavh Nagarajan | Chen Wu | Charles Ding | Aditi Raghunathan", "https://icml.cc/virtual/2025/oral/47241", icml2025, [audit("Aditi Raghunathan", "added", "aditi-raghunathan-award")]),
  record("icml25-conformal", "ICML", 2025, "Outstanding Paper", "Conformal Prediction as Bayesian Quadrature", "Jake Snell | Thomas Griffiths", "https://icml.cc/virtual/2025/oral/47227", icml2025, [audit("Thomas Griffiths", "added", "thomas-griffiths-award")]),
  record("icml25-masked", "ICML", 2025, "Outstanding Paper", "Train for the Worst, Plan for the Best: Understanding Token Ordering in Masked Diffusions", "Jaeyeon Kim | Kulin Shah | Vasilis Kontonis | Sham Kakade | Sitan Chen", "https://icml.cc/virtual/2025/oral/47251", icml2025, [audit("Sham Kakade", "added", "sham-kakade-award")]),
  record("icml25-collabllm", "ICML", 2025, "Outstanding Paper", "CollabLLM: From Passive Responders to Active Collaborators", "Shirley Wu | Michel Galley | Baolin Peng | Hao Cheng | Gavin Li | Yao Dou | Weixin Cai | James Zou | Jure Leskovec | Jianfeng Gao", "https://icml.cc/virtual/2025/oral/47250", icml2025, [audit("James Zou", "added", "james-zou-award"), audit("Jure Leskovec", "covered", "jure-leskovec-us"), audit("Jianfeng Gao", "covered", "jianfeng-gao-us")]),
  record("icml25-score", "ICML", 2025, "Outstanding Paper", "Score Matching with Missing Data", "Josh Givens | Song Liu | Henry Reeve", "https://icml.cc/virtual/2025/poster/44169", icml2025),
  record("icml25-work-position", "ICML", 2025, "Outstanding Position Paper", "Position: AI Safety should prioritize the Future of Work", "Sanchaita Hazra | Bodhisattwa Prasad Majumder | Tuhin Chakrabarty", "https://icml.cc/virtual/2025/oral/40167", icml2025),
  record("icml25-review-position", "ICML", 2025, "Outstanding Position Paper", "Position: The AI Conference Peer Review Crisis Demands Author Feedback and Reviewer Rewards", "Jaeho Kim | Yunseok Lee | Seulki Lee", "https://icml.cc/virtual/2025/oral/40109", icml2025, [audit("Author set", "out_of_scope", undefined, "Current affiliations outside the six supported atlas regions or not independently verified")]),

  record("icml26-flexibility", "ICML", 2026, "Outstanding Paper", "The Flexibility Trap: Rethinking the Value of Arbitrary Order in Diffusion Language Models", "Zanlin Ni | Shenzhi Wang | Yang Yue | Tianyu Yu | Weilin Zhao | Yeguo Hua | Tianyi Chen | Jun Song | Cheng Yu | Bo Zheng | Gao Huang", "https://icml.cc/virtual/2026/oral/71086", icml2026, [audit("Gao Huang", "covered", "gao-huang-thu")]),
  record("icml26-sampling", "ICML", 2026, "Outstanding Paper", "High-Accuracy Sampling for Diffusion Models and Log-Concave Distributions", "Fan Chen | Sinho Chewi | Constantinos Daskalakis | Alexander Rakhlin", "https://icml.cc/virtual/2026/oral/71132", icml2026, [audit("Constantinos Daskalakis", "added", "constantinos-daskalakis-award"), audit("Sinho Chewi", "deferred"), audit("Alexander Rakhlin", "deferred")]),
  record("icml26-censor", "ICML", 2026, "Outstanding Position Paper", "Position: The Alignment Community is Unintentionally Building a Censor's Toolkit", "Sarah Ball | Phil Hackemann", "https://icml.cc/virtual/2026/oral/71119", icml2026, [audit("Author set", "industry_or_nonfaculty")]),
  record("icml26-obfuscation", "ICML", 2026, "Honorable Mention", "The Obfuscation Atlas: Mapping Where Honesty Emerges in RLVR with Deception Probes", "Mohammad Taufeeque | Stefan Heimersheim | Adam Gleave | Chris Cundy", "https://icml.cc/virtual/2026/oral/71065", icml2026),
  record("icml26-motion", "ICML", 2026, "Honorable Mention", "Motion Attribution for Video Generation", "Xindi Wu | Despoina Paschalidou | Jun Gao | Antonio Torralba | Laura Leal-Taixé | Olga Russakovsky | Sanja Fidler | Jonathan Lorraine", "https://icml.cc/virtual/2026/oral/71049", icml2026, [audit("Antonio Torralba", "covered", "antonio-torralba-us"), audit("Laura Leal-Taixé", "covered", "laura-leal-taixe-eu"), audit("Olga Russakovsky", "covered", "olga-russakovsky-us"), audit("Sanja Fidler", "covered", "sanja-fidler-ca")]),
  record("icml26-memorize", "ICML", 2026, "Honorable Mention", "How much can language models memorize?", "John Xavier Morris | Chawin Sitawarin | Narine Kokhlikyan | Chuan Guo | G. Edward Suh | Alexander M Rush | Kamalika Chaudhuri | Saeed Mahloujifar", "https://icml.cc/virtual/2026/oral/71168", icml2026, [audit("Alexander M. Rush", "covered", "sasha-rush-us"), audit("Kamalika Chaudhuri", "deferred")]),
  record("icml26-random-matrix", "ICML", 2026, "Honorable Mention", "A Random Matrix Perspective on the Consistency of Diffusion Models", "Binxu Wang | Jacob A Zavatone-Veth | Cengiz Pehlevan", "https://icml.cc/virtual/2026/oral/71191", icml2026),
  record("icml26-grok", "ICML", 2026, "Honorable Mention", "To Grok Grokking: Provable Grokking in Ridge Regression", "Mingyue Xu | Gal Vardi | Itay Safran", "https://icml.cc/virtual/2026/oral/71134", icml2026, [audit("Gal Vardi", "out_of_scope", undefined, "Current faculty in Israel"), audit("Itay Safran", "out_of_scope", undefined, "Current faculty in Israel")]),
  record("icml26-deepfake", "ICML", 2026, "Position Paper Honorable Mention", "Position: AI/ML Deepfake Research is Misaligned with AI Generated Non-Consensual Intimate Imagery", "Li Qiwei | Wells Lucas Santo | Sarita Schoenebeck | Eric Gilbert", "https://icml.cc/virtual/2026/oral/71187", icml2026),
];

export const iclrIcmlAwardAuditCoverage = {
  venues: ["ICLR", "ICML"] as const,
  years: [2024, 2025, 2026] as const,
  officialAwardPages: [iclr2024, iclr2025, iclr2026, icml2024, icml2025, icml2026],
  counts: {
    ICLR: { 2024: { outstanding: 5, honorableMention: 11 }, 2025: { outstanding: 3, honorableMention: 3 }, 2026: { outstanding: 2, honorableMention: 1 } },
    ICML: { 2024: { best: 10 }, 2025: { outstanding: 6, outstandingPosition: 2 }, 2026: { outstanding: 2, outstandingPosition: 1, honorableMention: 5, positionHonorableMention: 1 } },
  },
  policy: "Audit every official award record, then add only current faculty / independent PIs in the atlas's six supported regions with an official institutional or personal faculty page. Coauthorship is not converted into an adviser or collaboration edge.",
  lastVerifiedAt: checkedAt,
};
