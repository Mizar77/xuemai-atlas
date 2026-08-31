import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";
const official = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });
const profile = (label: string, url: string, supports: string): Source => ({ label, url, kind: "profile", checkedAt, supports });

const award2024 = official("CVPR 2024 Awards", "https://cvpr.thecvf.com/Conferences/2024/News/Awards", "2024 Best Paper、runner-up、Best Student Paper 与 student runner-up 结果");
const award2025 = official("CVPR 2025 Best Papers", "https://cvpr.thecvf.com/Conferences/2025/BestPapersDemos", "2025 Best Paper、Honorable Mention、Best Student Paper 与 student honorable mention 结果");
const award2026 = official("CVPR 2026 Best Papers", "https://cvpr.thecvf.com/Conferences/2026/News/Best_Papers", "2026 Best Paper、Honorable Mention、Best Student Paper 与 student honorable mention 结果");
const cvfAwards = official("Computer Vision Foundation awards index", "https://www.thecvf.com/?page_id=413", "CVPR 2024–2026 Best Paper 与 Best Student Paper 历年索引");

type Candidate = {
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
  trajectory: string;
  community: string;
  award: string;
  awardSource: Source;
  sources: [Source, Source, ...Source[]];
};

export type AwardAuditPerson = Person & { actualInstitution?: string };

const person = (c: Candidate): AwardAuditPerson => ({
  id: c.id, name: c.name, chinese: c.chinese, role: c.role, institution: c.institution, region: c.region,
  actualInstitution: c.actualInstitution,
  area: c.area, tags: ["CVPR 获奖论文 faculty", ...c.area.split(" · ").slice(0, 3)], stage: c.stage, category: "core", primary: true,
  status: "current PI", lastVerifiedAt: checkedAt, x: 0, y: 0,
  summary: `${c.role}。${c.community}；作为 current faculty/独立 PI 参与 ${c.award}。`,
  facts: [
    { label: "教育 / 师承", value: c.education, source: c.sources[0] },
    { label: "职业轨迹", value: c.trajectory, source: c.sources[0] },
    { label: "研究共同体", value: c.community, source: c.sources[1] },
    { label: "CVPR 奖项", value: c.award, source: c.awardSource },
  ],
  sources: [...c.sources, c.awardSource],
});

const s = {
  boxin: official("Peking University — Boxin Shi", "https://idm.pku.edu.cn/en/info/1009/1013.htm", "现职、教育、博士后轨迹、Camera Intelligence Group 与研究"),
  boxin2: official("PKU CFCS — Boxin Shi", "https://cfcs.pku.edu.cn/english/research/turing_program/research_advisors/s2/index.htm", "当前导师身份与研究方向"),
  taglia: official("Simon Fraser University — Andrea Tagliasacchi", "https://www.sfu.ca/fas/computing/people/faculty/faculty-members/taiya.html", "现职、教育、Wayve 联合任职与研究"),
  taglia2: official("SFU faculty directory", "https://www.sfu.ca/fas/computing/people/faculty.html", "当前 faculty 与 Visual Computing Research Chair"),
  sitzmann: official("MIT CSAIL — Vincent Sitzmann", "https://www.csail.mit.edu/person/vincent-sitzmann", "当前职称、Scene Representation Group 与研究"),
  sitzmann2: official("MIT School of Engineering — Vincent Sitzmann", "https://engineering.mit.edu/people/vincent-sitzmann", "教育、博士后导师与入职轨迹"),
  tanya: official("Ohio State — Tanya Berger-Wolf", "https://cse.osu.edu/people/berger-wolf.1", "现职、UIUC 博士、Imageomics 与职业轨迹"),
  tanya2: official("Ohio State Science Spotlight — Berger-Wolf", "https://foodsforhealth.osu.edu/story/science-spotlight-bergerwolf", "BioCLIP 与 Imageomics 研究主线"),
  chao: official("Ohio State TDAI — Wei-Lun Chao", "https://tdai.osu.edu/people/chao.209", "现职、教育、导师、Cornell 博后与研究"),
  chao2: official("Ohio State-hosted CV — Wei-Lun Chao", "https://people.engineering.osu.edu/media/document/2023-10-08/weilunchao_cv.pdf", "完整教育、导师与职业轨迹"),
  yusu: official("Ohio State — Yu Su", "https://cse.osu.edu/people/su.809", "现职、教育、Microsoft Semantic Machines 与研究"),
  yusu2: official("Ohio State new faculty cohort", "https://engineering.osu.edu/news/2020/10/meet-our-newest-faculty-cohort", "入职与研究共同体"),
  florian: official("University of Bonn — Florian Bernard", "https://www.uni-bonn.de/de/forschung-lehre/forschungsprofil/transdisziplinaere-forschungsbereiche/modelling/mitgliederverzeichnis/florian-bernard", "现职与研究方向"),
  florian2: official("Bonn LOVC — Florian Bernard", "https://lovc.cs.uni-bonn.de/index.php/team/florian-bernard/", "组负责人、MPI/TUM/Bonn 轨迹与开放岗位"),
  ioannis: official("CMU Robotics Institute — Ioannis Gkioulekas", "https://www.ri.cmu.edu/ri-faculty/ioannis-gkioulekas/", "现职、Computational Imaging Lab、研究与学生"),
  ioannis2: official("CMU new faculty profile — Ioannis Gkioulekas", "https://scsdean.cs.cmu.edu/new-faculty/2017.html", "教育与研究方向"),
  fuxin: official("Oregon State — Fuxin Li", "https://engineering.oregonstate.edu/people/fuxin-li", "现职、教育、职业轨迹、研究组与招生状态"),
  fuxin2: profile("Oregon State-hosted Fuxin Li homepage", "https://web.engr.oregonstate.edu/~lif/", "Deep Machine Vision、DRAIL、研究与职业轨迹"),
  vedaldi: official("Oxford Engineering — Andrea Vedaldi", "https://eng.ox.ac.uk/people/andrea-vedaldi", "现职、VGG 与研究"),
  vedaldi2: profile("Oxford-hosted Andrea Vedaldi CV", "https://www.robots.ox.ac.uk/~vedaldi/assets/resume.pdf", "教育、Stefano Soatto 师承、Oxford/FAIR/Meta 轨迹"),
  otoole: official("CMU CSD — Matthew O'Toole", "https://csd.cmu.edu/people/faculty/matthew-otoole", "现职、教育、Kyros Kutulakos 师承、Stanford 博后与研究"),
  otoole2: official("CMU ECE — Matthew O'Toole", "https://ece.cmu.edu/directory/bios/otoole-matthew.html", "当前跨院系任职"),
  lindell: official("University of Toronto — David Lindell", "https://www.artsci.utoronto.ca/about/glance/new-faculty/2022-23/david-lindell", "现职、Stanford 博士与研究"),
  lindell2: official("U of T Computer Science faculty list", "https://artsci.calendar.utoronto.ca/section/computer-science", "当前 Assistant Professor faculty 状态"),
  yatskar: official("Penn NLP — people", "https://nlp.cis.upenn.edu/", "当前 Penn NLP faculty 状态"),
  yatskar2: official("Penn Database Group", "https://db.cis.upenn.edu/", "当前 Penn faculty 交叉共同体与 AI for Science 方向"),
  ccb: official("Penn Wharton — Chris Callison-Burch", "https://executiveeducation.wharton.upenn.edu/faculty/christopher-callison-burch/", "现职与 NLP/AI 研究"),
  ccb2: official("Penn Engineering teaching award — Callison-Burch", "https://almanac.upenn.edu/articles/penn-engineering-2022-teaching-and-advising-awards", "Stanford/Edinburgh 教育与 faculty mentoring"),
  head: official("Penn Engineering new faculty", "https://magazine.seas.upenn.edu/wp-content/uploads/2022/12/Penn-Engineering-Magazine-Fall-2022.pdf", "现职、Berkeley 博士与 Penn 到任"),
  head2: official("Penn Engineering HCI Group", "https://magazine.seas.upenn.edu/wp-content/uploads/2023/12/Penn-Engineering-Magazine-Fall-2023.pdf", "Penn HCI Group 与研究主线"),
  ranjay: official("University of Washington — Ranjay Krishna", "https://www.cs.washington.edu/people/faculty/ranjay-krishna/", "现职、教育、研究与 RAIVN"),
  ranjay2: official("UW RAIVN Lab — people", "https://raivn.cs.washington.edu/people/", "研究共同体、当前学生与校友"),
  hewang: official("PKU CFCS — He Wang", "https://cfcs.pku.edu.cn/english/people/faculty/hewang/index.htm", "现职、Stanford/Guibas 师承、EPIC 与研究"),
  hewang2: official("PKU Computer Science — He Wang", "https://cs.pku.edu.cn/info/1230/2030.htm", "当前 PI、EPIC、GALBOT 与产业连接"),
  ludwig: official("UW College of Engineering — Ludwig Schmidt", "https://www.engr.washington.edu/facresearch/newfaculty/2021/schmidt", "现职、教育、Berkeley/Toyota 轨迹与研究"),
  ludwig2: official("UW Allen School faculty news — Ludwig Schmidt", "https://news.cs.washington.edu/2021/11/15/recent-faculty-hires-expand-the-allen-schools-leadership-in-machine-learning-computational-biology-systems-security-and-more/", "faculty 到任与可靠机器学习方向"),
  georgia: official("Caltech EAS — Georgia Gkioxari", "https://www.eas.caltech.edu/people/georgia-gkioxari", "现职、教育与研究组方向"),
  georgia2: official("Caltech catalog", "https://www.catalog.caltech.edu/documents/183/catalog_25_26.pdf", "当前 faculty 与视觉研究共同体"),
  yisong: official("Caltech directory — Yisong Yue", "https://directory.caltech.edu/personnel/yyue", "现职、教育与 Caltech 轨迹"),
  yisong2: official("Caltech DOLCIT", "https://dolcit.cms.caltech.edu/people.html", "DOLCIT 联合主任与统计机器学习研究"),
  yejin: official("Stanford Profiles — Yejin Choi", "https://profiles.stanford.edu/yejin-choi", "现职、研究、Stanford HAI 与当前指导记录"),
  yejin2: official("Stanford AI Lab faculty", "https://ai.stanford.edu/faculty/", "SAIL faculty 状态"),
  yuke: official("UT Austin Experts — Yuke Zhu", "https://experts.utexas.edu/yuke_zhu", "现职、教育、产业合作与研究"),
  yuke2: official("UT Austin CS faculty profiles", "https://www.cs.utexas.edu/faculty-profiles", "当前 faculty 状态"),
};

export const cvprAwardAuditPeople: AwardAuditPerson[] = [
  person({ id: "andrea-tagliasacchi-ca-award", name: "Andrea Tagliasacchi", role: "Associate Professor, Simon Fraser University · Visual Computing Research Chair · Principal Scientist, Wayve", institution: "External", actualInstitution: "Simon Fraser University", region: "Canada", area: "3D Perception · Geometric Deep Learning · Graphics", stage: "senior", education: "Politecnico di Milano BSc/MSc；Simon Fraser University PhD（2013）", trajectory: "EPFL 博后 → SFU faculty；并任 Wayve Principal Scientist", community: "SFU Visual Computing / Theia Lab", award: "CVPR 2024 Best Paper Runner-up · pixelSplat", awardSource: award2024, sources: [s.taglia, s.taglia2] }),
  person({ id: "vincent-sitzmann-mit-award", name: "Vincent Sitzmann", role: "Associate Professor · Scene Representation Group Lead", institution: "MIT", region: "United States", area: "Neural Scene Representation · 3D Vision · Graphics", stage: "senior", education: "TUM BSc；Stanford MSc/PhD", trajectory: "MIT CSAIL 博士后（Josh Tenenbaum、Bill Freeman、Fredo Durand）→ MIT faculty（2022–）", community: "MIT CSAIL Scene Representation Group / Visual Computing", award: "CVPR 2024 Best Paper Runner-up · pixelSplat", awardSource: award2024, sources: [s.sitzmann, s.sitzmann2] }),
  person({ id: "tanya-berger-wolf-osu-award", name: "Tanya Berger-Wolf", role: "Professor, The Ohio State University · Director, Translational Data Analytics Institute", institution: "External", actualInstitution: "The Ohio State University", region: "United States", area: "AI for Science · Imageomics · Computational Ecology", stage: "institute", education: "Hebrew University 双专业；UIUC Computer Science PhD", trajectory: "UIC faculty → Ohio State Professor 与 TDAI Director（2020–）", community: "Imageomics Institute / TDAI / ABC Global Climate Center", award: "CVPR 2024 Best Student Paper · BioCLIP", awardSource: award2024, sources: [s.tanya, s.tanya2] }),
  person({ id: "wei-lun-chao-osu-award", name: "Wei-Lun Chao", role: "Distinguished Assistant Professor, The Ohio State University", institution: "External", actualInstitution: "The Ohio State University", region: "United States", area: "Machine Learning · Computer Vision · Imageomics", stage: "emerging", education: "NCTU BS、NTU MS、USC Computer Science PhD（Fei Sha）", trajectory: "Cornell 博后（Kilian Weinberger、Mark Campbell）→ Ohio State faculty", community: "Ohio State TDAI / Imageomics / ICICLE", award: "CVPR 2024 Best Student Paper · BioCLIP", awardSource: award2024, sources: [s.chao, s.chao2] }),
  person({ id: "yu-su-osu-award", name: "Yu Su", role: "Associate Professor of Computer Science and Engineering, The Ohio State University", institution: "External", actualInstitution: "The Ohio State University", region: "United States", area: "NLP · AI Agents · Knowledge Bases", stage: "senior", education: "Tsinghua Computer Science BS；UC Santa Barbara PhD", trajectory: "Microsoft Semantic Machines Senior Researcher → Ohio State faculty", community: "Ohio State NLP / ICICLE / Imageomics", award: "CVPR 2024 Best Student Paper · BioCLIP", awardSource: award2024, sources: [s.yusu, s.yusu2] }),
  person({ id: "florian-bernard-bonn-award", name: "Florian Bernard", role: "Professor, University of Bonn · LOVC Group Head", institution: "External", actualInstitution: "University of Bonn", region: "Europe", area: "3D Shape Analysis · Visual Computing · Optimization", stage: "senior", education: "官方当前页核验其 Visual Computing faculty 身份；教育细节未在本轮一手页展开", trajectory: "MPI Informatics 博后 → TUM Visiting Professor → Bonn Assistant Professor/Professor", community: "University of Bonn Learning and Optimisation for Visual Computing", award: "CVPR 2024 Best Student Paper Runner-up · SpiderMatch", awardSource: award2024, sources: [s.florian, s.florian2] }),
  person({ id: "ioannis-gkioulekas-cmu-award", name: "Ioannis Gkioulekas", role: "Associate Professor with Tenure", institution: "CMU", region: "United States", area: "Computational Imaging · Computer Vision · Graphics", stage: "senior", education: "NTUA Diplomate、Harvard MS/PhD", trajectory: "Harvard PhD → CMU Robotics Institute faculty", community: "Computational Imaging at CMU", award: "CVPR 2024 Best Student Paper Runner-up · Objects as Volumes", awardSource: award2024, sources: [s.ioannis2, s.ioannis] }),
  person({ id: "fuxin-li-oregon-award", name: "Fuxin Li", chinese: "李复新", role: "Professor of Computer Science, Oregon State University", institution: "External", actualInstitution: "Oregon State University", region: "United States", area: "Explainable Vision · 3D Perception · Uncertainty", stage: "senior", education: "Zhejiang University B.E.；CAS Institute of Automation PhD（Jue Wang）", trajectory: "Bonn → Georgia Tech → Apple research positions → Oregon State faculty", community: "Deep Machine Vision / DRAIL", award: "CVPR 2024 Best Student Paper Runner-up · Comparing Transformers and CNNs", awardSource: award2024, sources: [s.fuxin, s.fuxin2] }),
  person({ id: "andrea-vedaldi-oxford-award", name: "Andrea Vedaldi", role: "Professor of Computer Vision and Machine Learning", institution: "Oxford", region: "Europe", area: "Computer Vision · Self-Supervision · 3D Geometry", stage: "senior", education: "University of Padua degree；UCLA MSc/PhD（Stefano Soatto）", trajectory: "Oxford JRF/faculty；2018–2023 FAIR，2023– Meta Generative AI 联合任职", community: "Oxford Visual Geometry Group", award: "CVPR 2025 Best Paper · VGGT", awardSource: award2025, sources: [s.vedaldi, s.vedaldi2] }),
  person({ id: "matthew-otoole-cmu-award", name: "Matthew O'Toole", role: "Associate Professor", institution: "CMU", region: "United States", area: "Computational Imaging · Computer Vision · Optics", stage: "senior", education: "UBC BSc；University of Toronto MSc/PhD（Kyros Kutulakos）", trajectory: "Stanford Computational Imaging 博后 → CMU Robotics Institute/CSD faculty", community: "CMU Computational Imaging", award: "CVPR 2025 Best Student Paper · Neural Inverse Rendering", awardSource: award2025, sources: [s.otoole, s.otoole2] }),
  person({ id: "david-lindell-ca-award", name: "David B. Lindell", role: "Assistant Professor of Computer Science", institution: "U of Toronto", region: "Canada", area: "Computational Imaging · Neural Rendering · 3D Vision", stage: "emerging", education: "Stanford University PhD", trajectory: "Stanford doctoral research → University of Toronto faculty（2022–）", community: "U of T Visual Computing / Computational Imaging", award: "CVPR 2025 Best Student Paper · Neural Inverse Rendering", awardSource: award2025, sources: [s.lindell, s.lindell2] }),
  person({ id: "mark-yatskar-upenn-award", name: "Mark Yatskar", role: "Assistant Professor of Computer and Information Science, University of Pennsylvania", institution: "External", actualInstitution: "University of Pennsylvania", region: "United States", area: "NLP · Vision-Language · AI for Science", stage: "emerging", education: "本轮官方共同体页面核验 current faculty；教育细节未在纳入来源中展开", trajectory: "University of Pennsylvania CIS faculty", community: "Penn NLP / Penn AI for Science", award: "CVPR 2025 Best Paper Honorable Mention · Molmo and PixMo", awardSource: award2025, sources: [s.yatskar, s.yatskar2] }),
  person({ id: "chris-callison-burch-upenn-award", name: "Chris Callison-Burch", role: "Professor of Computer and Information Science, University of Pennsylvania", institution: "External", actualInstitution: "University of Pennsylvania", region: "United States", area: "NLP · Machine Translation · Crowdsourcing", stage: "senior", education: "Stanford Symbolic Systems BS；University of Edinburgh MS/PhD", trajectory: "Johns Hopkins research faculty → University of Pennsylvania faculty", community: "Penn NLP", award: "CVPR 2025 Best Paper Honorable Mention · Molmo and PixMo", awardSource: award2025, sources: [s.ccb, s.ccb2] }),
  person({ id: "andrew-head-upenn-award", name: "Andrew Head", role: "Assistant Professor of Computer and Information Science, University of Pennsylvania", institution: "External", actualInstitution: "University of Pennsylvania", region: "United States", area: "Human-Computer Interaction · AI-assisted Reading · Programming Tools", stage: "emerging", education: "UC Berkeley Computer Science PhD", trajectory: "UC Berkeley doctoral research → Penn CIS faculty（2022–）", community: "Penn Human-Computer Interaction Group", award: "CVPR 2025 Best Paper Honorable Mention · Molmo and PixMo", awardSource: award2025, sources: [s.head, s.head2] }),
  person({ id: "ranjay-krishna-uw-award", name: "Ranjay Krishna", role: "Assistant Professor", institution: "UW", region: "United States", area: "Computer Vision · Human-Centered AI · Vision-Language", stage: "emerging", education: "Cornell 双学士；Stanford CS MSc/PhD", trajectory: "Stanford doctoral research → University of Washington faculty", community: "UW RAIVN Lab / UW NLP", award: "CVPR 2025 Best Paper Honorable Mention · Molmo and PixMo", awardSource: award2025, sources: [s.ranjay, s.ranjay2] }),
  person({ id: "he-wang-pku-award", name: "He Wang", chinese: "王鹤", role: "Research Professor · EPIC Lab Founder", institution: "PKU", region: "Mainland China", area: "Embodied AI · 3D Vision · Robotics", stage: "emerging", education: "Tsinghua University BS；Stanford University PhD（Leonidas J. Guibas，2021）", trajectory: "Stanford PhD → PKU CFCS tenure-track PI；并创办 GALBOT、任 CTO", community: "PKU EPIC Lab / PKU-Galbot Joint Lab / BAAI Embodied AI", award: "CVPR 2025 Best Paper Honorable Mention · 3D Student Splatting and Scooping", awardSource: award2025, sources: [s.hewang, s.hewang2] }),
  person({ id: "ludwig-schmidt-uw-award", name: "Ludwig Schmidt", role: "Assistant Professor", institution: "UW", region: "United States", area: "Reliable Machine Learning · Datasets · Evaluation", stage: "emerging", education: "Cambridge BA；MIT MS/PhD（2018）", trajectory: "UC Berkeley 博后、Toyota Research visiting scientist → UW faculty", community: "UW Allen School reliable machine learning", award: "CVPR 2026 Best Paper Honorable Mention · NitroGen", awardSource: award2026, sources: [s.ludwig, s.ludwig2] }),
  person({ id: "georgia-gkioxari-caltech-award", name: "Georgia Gkioxari", role: "Assistant Professor, California Institute of Technology · William H. Hurt Scholar", institution: "External", actualInstitution: "California Institute of Technology", region: "United States", area: "2D/3D Perception · Spatial Reasoning · Vision Models", stage: "emerging", education: "NTUA Diplom；UC Berkeley PhD（2016）", trajectory: "FAIR research → Caltech Visiting Associate（2022）→ Assistant Professor（2023–）", community: "Caltech Vision / Gkioxari Group", award: "CVPR 2026 Best Paper Honorable Mentions · NitroGen and SAM 3D", awardSource: award2026, sources: [s.georgia, s.georgia2] }),
  person({ id: "yisong-yue-caltech-award", name: "Yisong Yue", role: "Professor of Computing and Mathematical Sciences, California Institute of Technology", institution: "External", actualInstitution: "California Institute of Technology", region: "United States", area: "Statistical Machine Learning · Interactive Learning · Decision Systems", stage: "senior", education: "UIUC BS；Cornell PhD（2010）", trajectory: "CMU 博后、Disney Research → Caltech faculty（2014–）", community: "Caltech DOLCIT (Decision, Optimization and Learning)", award: "CVPR 2026 Best Paper Honorable Mention · NitroGen", awardSource: award2026, sources: [s.yisong, s.yisong2] }),
  person({ id: "yuke-zhu-utaustin-award", name: "Yuke Zhu", chinese: "朱毓", role: "Associate Professor of Computer Science", institution: "UT Austin", region: "United States", area: "Embodied AI · Robot Learning · Computer Vision", stage: "senior", education: "Zhejiang/SFU 双学位；Stanford MS/PhD（2019）", trajectory: "Stanford doctoral research → UT Austin faculty（2020–）", community: "UT Austin Robot Learning / Embodied AI", award: "CVPR 2026 Best Paper Honorable Mention · NitroGen", awardSource: award2026, sources: [s.yuke, s.yuke2] }),
];

export const cvprAwardAuditRelationships: Relationship[] = [];

export type CvprAwardAuditRecord = {
  year: 2024 | 2025 | 2026;
  award: "Best Paper" | "Best Paper Honorable Mention / Runner-up" | "Best Student Paper" | "Best Student Paper Honorable Mention / Runner-up";
  paper: string;
  facultyAuthors: string[];
  existing: string[];
  added: string[];
  excluded: string[];
  source: Source;
};

export const cvprAwardAuditRecords: CvprAwardAuditRecord[] = [
  { year: 2024, award: "Best Paper", paper: "Generative Image Dynamics", facultyAuthors: ["Noah Snavely"], existing: ["Noah Snavely"], added: [], excluded: ["Aleksander Holynski — industry researcher, not verified current faculty"], source: award2024 },
  { year: 2024, award: "Best Paper", paper: "Rich Human Feedback for Text-to-Image Generation", facultyAuthors: [], existing: [], added: [], excluded: ["No current faculty/independent PI verified among the official author list"], source: award2024 },
  { year: 2024, award: "Best Paper Honorable Mention / Runner-up", paper: "EventPS", facultyAuthors: ["Boxin Shi"], existing: ["Boxin Shi / 施柏鑫"], added: [], excluded: ["Student and non-faculty authors"], source: award2024 },
  { year: 2024, award: "Best Paper Honorable Mention / Runner-up", paper: "pixelSplat", facultyAuthors: ["Andrea Tagliasacchi", "Vincent Sitzmann"], existing: [], added: ["Andrea Tagliasacchi", "Vincent Sitzmann"], excluded: ["Student authors"], source: award2024 },
  { year: 2024, award: "Best Student Paper", paper: "Mip-Splatting", facultyAuthors: ["Andreas Geiger"], existing: ["Andreas Geiger"], added: [], excluded: ["Student authors"], source: award2024 },
  { year: 2024, award: "Best Student Paper", paper: "BioCLIP", facultyAuthors: ["Tanya Berger-Wolf", "Wei-Lun Chao", "Yu Su"], existing: [], added: ["Tanya Berger-Wolf", "Wei-Lun Chao", "Yu Su"], excluded: ["Student, staff and domain-science coauthors not independently verified as AI PI"], source: award2024 },
  { year: 2024, award: "Best Student Paper Honorable Mention / Runner-up", paper: "SpiderMatch", facultyAuthors: ["Florian Bernard"], existing: [], added: ["Florian Bernard"], excluded: ["Student author"], source: award2024 },
  { year: 2024, award: "Best Student Paper Honorable Mention / Runner-up", paper: "Image Processing GNN", facultyAuthors: [], existing: [], added: [], excluded: ["Huawei researchers and student authors; no current academic PI verified"], source: award2024 },
  { year: 2024, award: "Best Student Paper Honorable Mention / Runner-up", paper: "Objects as Volumes", facultyAuthors: ["Ioannis Gkioulekas"], existing: [], added: ["Ioannis Gkioulekas"], excluded: ["Student authors"], source: award2024 },
  { year: 2024, award: "Best Student Paper Honorable Mention / Runner-up", paper: "Comparing the Decision-Making Mechanisms by Transformers and CNNs", facultyAuthors: ["Fuxin Li"], existing: [], added: ["Fuxin Li"], excluded: ["Student authors"], source: award2024 },
  { year: 2025, award: "Best Paper", paper: "VGGT", facultyAuthors: ["Andrea Vedaldi", "Christian Rupprecht"], existing: ["Christian Rupprecht"], added: ["Andrea Vedaldi"], excluded: ["Student and industry authors"], source: award2025 },
  { year: 2025, award: "Best Student Paper", paper: "Neural Inverse Rendering from Propagating Light", facultyAuthors: ["Matthew O'Toole", "David B. Lindell"], existing: [], added: ["Matthew O'Toole", "David B. Lindell"], excluded: ["Student authors"], source: award2025 },
  { year: 2025, award: "Best Paper Honorable Mention / Runner-up", paper: "MegaSaM", facultyAuthors: ["Noah Snavely", "Angjoo Kanazawa"], existing: ["Noah Snavely", "Angjoo Kanazawa"], added: [], excluded: ["Industry and student authors"], source: award2025 },
  { year: 2025, award: "Best Paper Honorable Mention / Runner-up", paper: "Navigation World Models", facultyAuthors: ["Trevor Darrell", "Yann LeCun"], existing: ["Trevor Darrell", "Yann LeCun"], added: [], excluded: ["Student and industry authors"], source: award2025 },
  { year: 2025, award: "Best Paper Honorable Mention / Runner-up", paper: "Molmo and PixMo", facultyAuthors: ["Mark Yatskar", "Chris Callison-Burch", "Andrew Head", "Ranjay Krishna", "Noah A. Smith", "Hanna Hajishirzi", "Ali Farhadi"], existing: ["Noah A. Smith", "Hanna Hajishirzi", "Ali Farhadi"], added: ["Mark Yatskar", "Chris Callison-Burch", "Andrew Head", "Ranjay Krishna"], excluded: ["AI2/industry staff and non-faculty authors"], source: award2025 },
  { year: 2025, award: "Best Paper Honorable Mention / Runner-up", paper: "3D Student Splatting and Scooping", facultyAuthors: ["He Wang"], existing: [], added: ["He Wang"], excluded: ["Student authors"], source: award2025 },
  { year: 2025, award: "Best Student Paper Honorable Mention / Runner-up", paper: "Generative Multimodal Pretraining with Discrete Diffusion Timestep Tokens", facultyAuthors: ["Siliang Tang", "Hanwang Zhang"], existing: ["Siliang Tang", "Hanwang Zhang"], added: [], excluded: ["Student authors"], source: award2025 },
  { year: 2026, award: "Best Paper", paper: "Efficiently Reconstructing Dynamic Scenes One D4RT at a Time", facultyAuthors: ["Zoubin Ghahramani", "Andrew Zisserman"], existing: ["Zoubin Ghahramani", "Andrew Zisserman"], added: [], excluded: ["Google DeepMind and student authors"], source: award2026 },
  { year: 2026, award: "Best Student Paper", paper: "Native and Compact Structured Latents for 3D Generation", facultyAuthors: [], existing: [], added: [], excluded: ["Academic students and Microsoft Research authors; no current academic PI verified"], source: award2026 },
  { year: 2026, award: "Best Paper Honorable Mention / Runner-up", paper: "NitroGen", facultyAuthors: ["Ludwig Schmidt", "Georgia Gkioxari", "Yisong Yue", "Yejin Choi", "Yuke Zhu"], existing: ["Yejin Choi"], added: ["Ludwig Schmidt", "Georgia Gkioxari", "Yisong Yue", "Yuke Zhu"], excluded: ["Industry and student authors"], source: award2026 },
  { year: 2026, award: "Best Paper Honorable Mention / Runner-up", paper: "SAM 3D", facultyAuthors: ["Georgia Gkioxari", "Jitendra Malik"], existing: ["Jitendra Malik"], added: ["Georgia Gkioxari"], excluded: ["Meta researchers without current faculty status"], source: award2026 },
  { year: 2026, award: "Best Student Paper Honorable Mention / Runner-up", paper: "ChordEdit", facultyAuthors: [], existing: [], added: [], excluded: ["All authors verified as students; corresponding author Yang Shi identifies as an undergraduate"], source: award2026 },
];

export const cvprAwardAuditCoverage = [
  { year: 2024 as const, awardPapers: 10, facultyAuthors: 11, alreadyCovered: 3, newlyAdded: 8, officialSources: [award2024, cvfAwards] },
  { year: 2025 as const, awardPapers: 7, facultyAuthors: 18, alreadyCovered: 10, newlyAdded: 8, officialSources: [award2025, cvfAwards] },
  { year: 2026 as const, awardPapers: 5, facultyAuthors: 9, alreadyCovered: 4, newlyAdded: 4, officialSources: [award2026, cvfAwards] },
];
