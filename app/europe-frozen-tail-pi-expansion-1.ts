import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

const firstParty = (
  label: string,
  url: string,
  supports: string,
  kind: Source["kind"] = "official",
): Source => ({ label, url, supports, kind, checkedAt });

const tumRoster = firstParty(
  "TUM CIT — Professors",
  "https://www.cit.tum.de/en/cit/school/people/professors/",
  "Current TUM CIT professorial appointment",
);
const tumCsChairs = firstParty(
  "TUM Computer Science — Chairs and Professors",
  "https://www.cs.cit.tum.de/en/cs/research/professorships/",
  "Current TUM Computer Science chair and research-unit title",
);
const tumMdsi = firstParty(
  "Munich Data Science Institute — Core Members",
  "https://www.mdsi.tum.de/en/mdsi/about-us/core-members/",
  "TUM data-science/AI research scope and official portraits",
);
const aaltoRoster = firstParty(
  "Aalto Department of Computer Science — People",
  "https://www.aalto.fi/en/department-of-computer-science/people",
  "Current Department of Computer Science professor status",
);
const tuebingenRoster = firstParty(
  "Tübingen Computer Science — MVL1 Research Groups",
  "https://uni-tuebingen.de/en/faculties/faculty-of-science/departments/computer-science/how-to-find-us/research-groups-mvl1/",
  "Current coopted professor and research-group scope",
);

type Seed = {
  id: string;
  name: string;
  role: string;
  institution: "TUM" | "Aalto" | "Tübingen/MPI";
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  x: number;
  y: number;
  profile: Source;
  roster: Source;
  extras: Source[];
  portraitSource: Source;
  portraitFile: string;
  facts: NonNullable<Person["facts"]>;
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
    sources: [seed.profile, seed.roster, ...seed.extras],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/europe-frozen-tail-2026/${seed.portraitFile}.webp`,
      alt: `${seed.name} official portrait`,
      source: seed.portraitSource,
    },
  };
}

const angelaProfile = firstParty("TUM Professorial Faculty — Angela Dai", "https://www.professoren.tum.de/en/dai-angela", "Role, 3D AI research, education, career and awards", "profile");
const angelaLab = firstParty("3D AI Lab — Angela Dai", "https://www.3dunderstanding.org/", "Lab leadership, research and team", "profile");
const angelaPortrait = firstParty("MDSI official portrait — Angela Dai", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/angela_dai.svg", "Official portrait", "profile");

const stefanProfile = firstParty("TUM Professorial Faculty — Stefan Bauer", "https://www.professoren.tum.de/en/bauer-stefan", "Role, research, doctoral training and prior appointments", "profile");
const stefanPortrait = firstParty("MDSI official portrait — Stefan Bauer", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/stefan_bauer.svg", "Official portrait", "profile");

const nikiProfile = firstParty("TUM Professorial Faculty — Niki Kilbertus", "https://www.professoren.tum.de/en/kilbertus-niki", "Role, causal/fair ML research and academic trajectory", "profile");
const nikiGrant = firstParty("TUM — ERC Starting Grants: Niki Kilbertus", "https://www.tum.de/en/news-and-events/all-news/press-releases/details/six-erc-starting-grants-for-researchers-at-tum", "Current chair, Helmholtz AI leadership and DYNAMICAUS project", "profile");
const nikiPortrait = firstParty("MDSI official portrait — Niki Kilbertus", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/Kilbertus_Niki.svg", "Official portrait", "profile");

const debarghyaProfile = firstParty("TUM Professorial Faculty — Debarghya Ghoshdastidar", "https://www.professoren.tum.de/en/ghoshdastidar-debarghya", "Role, learning theory research, education and career", "profile");
const debarghyaGroup = firstParty("TUM TFAI — Debarghya Ghoshdastidar", "https://www.cs.cit.tum.de/en/tfai/people/debarghya-ghoshdastidar/", "Research focus, funding and group leadership", "profile");
const debarghyaCv = firstParty("Debarghya Ghoshdastidar — official short CV", "https://www.cs.cit.tum.de/fileadmin/w00cfj/tfai/pdf/cv-short.pdf", "Named doctoral students and research service", "cv");
const debarghyaPortrait = firstParty("MDSI official portrait — Debarghya Ghoshdastidar", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/Ghoshdastidar_Debarghya_.svg", "Official portrait", "profile");

const stephanProfile = firstParty("TUM Professorial Faculty — Stephan Günnemann", "https://www.professoren.tum.de/en/guennemann-stephan/", "Role, research, education, career and awards", "profile");
const stephanPortal = firstParty("TUM Research Portal — Stephan Günnemann", "https://portal.fis.tum.de/en/persons/stephan-g%C3%BCnnemann/", "Current Data Analytics and Machine Learning chair", "profile");
const stephanPortrait = firstParty("MDSI official portrait — Stephan Günnemann", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/Guennemann_Stephan.svg", "Official portrait", "profile");

const matthiasProfile = firstParty("TUM Professorial Faculty — Matthias Nießner", "https://www.professoren.tum.de/en/niessner-matthias", "Role, visual-computing research, doctoral adviser and career", "profile");
const matthiasLab = firstParty("TUM — Visual Computing Focus Group", "https://www.ias.tum.de/ias/research-areas/advanced-computation-and-modeling/alumni-focus-groups/visual-computing/", "Visual Computing Lab leadership and research", "profile");
const matthiasPortrait = firstParty("MDSI official portrait — Matthias Nießner", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/matthias_niessner_resized.svg", "Official portrait", "profile");

const danielProfile = firstParty("TUM Institute for AI and Informatics in Medicine — Daniel Rückert", "https://kiinformatik.mri.tum.de/de/team/daniel_rueckert-2", "Role, education, research, team scale, alumni and commercialization", "profile");
const danielPrize = firstParty("TUM — Daniel Rückert receives Leibniz Prize", "https://www.tum.de/en/news-and-events/all-news/press-releases/details/medical-ai-researcher-daniel-rueckert-receives-leibniz-prize", "Medical-AI work, prior leadership, award and startup", "profile");
const danielPortrait = firstParty("MDSI official portrait — Daniel Rückert", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/Rueckert_Daniel_.svg", "Official portrait", "profile");

const juliaProfile = firstParty("TUM Professorial Faculty — Julia Schnabel", "https://www.professoren.tum.de/schnabel-julia/", "Role, medical-imaging research, education and career", "profile");
const juliaResearch = firstParty("TUM Chair of Computational Imaging and AI in Medicine — Research", "https://www.cs.cit.tum.de/ciam/forschung/", "Chair leadership and research programme", "profile");
const juliaPortrait = firstParty("MDSI official portrait — Julia Schnabel", "https://www.mdsi.tum.de/fileadmin/w00cet/mdsi/Persons/Schnabel_Julia.svg", "Official portrait", "profile");

const nilsProfile = firstParty("TUM Professorial Faculty — Nils Thürey", "https://www.professoren.tum.de/en/thuerey-nils", "Role, physics-based deep learning, education and industry career", "profile");
const nilsTeam = firstParty("TUM Computer Graphics and Visualization — Nils Thürey team", "https://www.cs.cit.tum.de/en/cg/people/", "Current Physics-based Simulation group members", "profile");
const nilsPortrait = firstParty("TUMonline official portrait — Nils Thürey", "https://campus.tum.de/tumonline/visitenkarte.showImage?pPersonenGruppe=3&pPersonenId=38AE07215465C3BB", "Official portrait", "profile");

const heikkiProfile = firstParty("Aalto Research Portal — Heikki Mannila", "https://research.aalto.fi/en/persons/heikki-mannila/", "Current appointments, research, education and industry experience", "profile");
const heikkiNews = firstParty("Aalto — Heikki Mannila appointed Associate Vice President for AI", "https://www.aalto.fi/en/news/heikki-mannila-appointed-as-aalto-universitys-associate-vice-president-ai-strategy-and-adoption", "Current AI leadership, House of AI and career", "profile");
const heikkiPortrait = firstParty("Aalto official portrait — Heikki Mannila", "https://research.aalto.fi/files-asset/3070297/275539_x_512.jpg/", "Official portrait", "profile");

const ilkkaProfile = firstParty("Aalto — Ilkka Niemelä", "https://www.aalto.fi/en/people/ilkka-niemela", "Current leadership, computer-science professorship, automated-reasoning research and honors", "profile");
const ilkkaResearch = firstParty("Aalto Research Portal — Ilkka Niemelä", "https://research.aalto.fi/en/persons/ilkka-niemel%C3%A4/", "Research outputs and honors", "profile");
const ilkkaPortrait = firstParty("Aalto official portrait — Ilkka Niemelä", "https://research.aalto.fi/files-asset/3069003/275546_x_512.jpg/", "Official portrait", "profile");

const peterProfile = firstParty("Tübingen AI Center — Peter Gehler", "https://gehler.tuebingen.ai/team", "Current role, research, career, team and industry experience", "profile");
const peterCluster = firstParty("Tübingen Cluster of Excellence ML — Peter Gehler", "https://uni-tuebingen.de/en/research/core-research/cluster-of-excellence-machine-learning/people/team/cluster-members/", "Research focus and cluster membership", "profile");
const peterPortrait = firstParty("Tübingen AI Center official portrait — Peter Gehler", "https://gehler.tuebingen.ai/fileadmin/labs_upload/12/csm_Peter-Gehler_7535770367__4_.jpg", "Official portrait", "profile");

const nassirProfile = firstParty("TUM Professorial Faculty — Nassir Navab", "https://www.professoren.tum.de/en/navab-nassir", "Current professorship, research scope, education, academic career and patents", "profile");
const nassirLab = firstParty("TUM CAMP — Nassir Navab", "https://www.cs.cit.tum.de/en/camp/members/cv-nassir-navab/nassir-navab/", "Current laboratory leadership, medical-AI research, honors and student awards", "official");
const nassirPortrait = firstParty("TUMonline official portrait — Nassir Navab", "https://campus.tum.de/tumonline/visitenkarte.showImage?pPersonenGruppe=3&pPersonenId=E6B642962195591B", "Official portrait", "official");

export const europeFrozenTailPiExpansion1People: Person[] = [
  makePerson({ id: "angela-dai-tum-tail", name: "Angela Dai", role: "Professor of 3D Artificial Intelligence", institution: "TUM", area: "3D AI · Computer Vision · Scene Understanding", tags: ["3D AI", "Computer Vision", "Generative 3D", "Robotics"], summary: "TUM 3D AI Lab 负责人，研究真实场景的三维重建、语义理解与生成式 3D 学习。", stage: "senior", x: 120, y: 120, profile: angelaProfile, roster: tumRoster, extras: [tumCsChairs, angelaLab, tumMdsi], portraitSource: angelaPortrait, portraitFile: "angela", facts: [
    { label: "当前任职", value: "TUM 3D Artificial Intelligence 教授，2020 年起领导 3D AI Lab。" },
    { label: "研究主线", value: "3D 重建、真实场景语义理解、生成式 3D 深度学习，以及面向虚拟和机器人智能体的场景交互。" },
    { label: "教育与学术训练", value: "2018 年获 Stanford 计算机科学博士，2013 年获 Princeton 计算机科学 BSE。" },
    { label: "代表性影响", value: "官方履历列出 SIGGRAPH Outstanding Doctoral Dissertation Honorable Mention 与 ScanNet 等代表工作。" },
  ] }),
  makePerson({ id: "stefan-bauer-tum-tail", name: "Stefan Bauer", role: "Professor of Algorithmic Machine Learning & Explainable AI", institution: "TUM", area: "Reasoning Models · Structured Learning · Explainable AI", tags: ["Reasoning", "Explainable AI", "Structured Learning", "Foundation Models"], summary: "TUM 算法机器学习与可解释 AI 教授，聚焦结构化表示、自适应推理和多步决策。", stage: "senior", x: 280, y: 120, profile: stefanProfile, roster: tumRoster, extras: [tumCsChairs, tumMdsi], portraitSource: stefanPortrait, portraitFile: "stefan", facts: [
    { label: "当前任职", value: "TUM Algorithmic Machine Learning & Explainable AI 教授，并共同协调 Helmholtz Foundation Model Initiative。" },
    { label: "研究主线", value: "让模型形成抽象、调整计算过程，并用离散和结构化表示完成复杂推理。" },
    { label: "教育与学术训练", value: "获 ETH Zurich 计算机科学博士，博士论文获 ETH Medal。" },
    { label: "学术与产业经历", value: "加入 TUM 前任 KTH 助理教授、MPI-IS 组长，并曾访问 MILA、GSK 和 Microsoft Research。" },
  ] }),
  makePerson({ id: "niki-kilbertus-tum-tail", name: "Niki Kilbertus", role: "Professor of AI for Scientific Modeling", institution: "TUM", area: "Causal ML · Responsible AI · Scientific Modeling", tags: ["Causal Inference", "Responsible AI", "AI for Science", "Fairness"], summary: "TUM AI for Scientific Modeling 教授，将因果推断、机制模型与可靠机器学习连接起来。", stage: "senior", x: 440, y: 120, profile: nikiProfile, roster: tumRoster, extras: [tumCsChairs, nikiGrant, tumMdsi], portraitSource: nikiPortrait, portraitFile: "niki", facts: [
    { label: "当前任职", value: "TUM AI for Scientific Modeling 教授，同时领导 Helmholtz AI 研究组。" },
    { label: "研究主线", value: "因果推断、可靠自动决策、算法公平性，以及数据驱动与机制建模的结合。" },
    { label: "教育与学术训练", value: "2020 年在 University of Cambridge 与 Max Planck Institute for Intelligent Systems 联合项目中获机器学习博士。" },
    { label: "科研项目", value: "ERC Starting Grant 项目 DYNAMICAUS 研究复杂动力系统中的因果建模。", source: nikiGrant },
  ] }),
  makePerson({ id: "debarghya-ghoshdastidar-tum-tail", name: "Debarghya Ghoshdastidar", role: "Professor of Theoretical Foundations of AI", institution: "TUM", area: "Learning Theory · Graph ML · Network Science", tags: ["Learning Theory", "Graph ML", "Network Science", "High-dimensional Statistics"], summary: "TUM 理论 AI 教授，以统计学习理论解释图、网络和深度学习方法。", stage: "senior", x: 600, y: 120, profile: debarghyaProfile, roster: tumRoster, extras: [tumCsChairs, debarghyaGroup, debarghyaCv], portraitSource: debarghyaPortrait, portraitFile: "debarghya", facts: [
    { label: "当前任职", value: "TUM Theoretical Foundations of Artificial Intelligence 教授；2019 年以 tenure-track professor 身份加入。" },
    { label: "研究主线", value: "统计学习理论、高维统计、深度学习理论、图机器学习与网络分析。", source: debarghyaGroup },
    { label: "教育与学术训练", value: "Jadavpur University 电气工程本科、Indian Institute of Science 硕士和博士；之后在 Tübingen 开展博士后研究。" },
    { label: "学生体系", value: "官方 CV 列出 Leena Chennuru Vankadara、Pascal Mattia Esser 等博士生，并记录多名后续在读学生。", source: debarghyaCv },
  ] }),
  makePerson({ id: "stephan-guennemann-tum-tail", name: "Stephan Günnemann", role: "Professor of Data Analytics and Machine Learning", institution: "TUM", area: "Graph ML · Robust ML · Data Analytics", tags: ["Graph Neural Networks", "Robust ML", "Data Analytics", "Reliable AI"], summary: "TUM 数据分析与机器学习教授，研究图神经网络、鲁棒学习与可靠 AI。", stage: "senior", x: 760, y: 120, profile: stephanProfile, roster: tumRoster, extras: [tumCsChairs, stephanPortal, tumMdsi], portraitSource: stephanPortrait, portraitFile: "stephan", facts: [
    { label: "当前任职", value: "TUM Data Analytics and Machine Learning 教授、Munich Data Science Institute 执行主任和 Konrad Zuse School of Excellence in Reliable AI 主任。" },
    { label: "研究主线", value: "图与时间数据、鲁棒和对抗机器学习、不确定性估计及图神经网络。" },
    { label: "教育与学术训练", value: "2012 年获 RWTH Aachen 计算机科学博士，之后在 Carnegie Mellon 任博士后与高级研究员。" },
    { label: "产业经历", value: "官方履历记录其曾在 Siemens Research & Technology Center 任研究员。" },
  ] }),
  makePerson({ id: "matthias-niessner-tum-tail", name: "Matthias Nießner", role: "Professor of Visual Computing and Artificial Intelligence", institution: "TUM", area: "3D Vision · Neural Rendering · Synthetic Media", tags: ["3D Vision", "Neural Rendering", "Computer Graphics", "Synthetic Media"], summary: "TUM Visual Computing Lab 负责人，连接三维视觉、神经渲染与合成媒体分析。", stage: "senior", x: 120, y: 320, profile: matthiasProfile, roster: tumRoster, extras: [tumCsChairs, matthiasLab, tumMdsi], portraitSource: matthiasPortrait, portraitFile: "matthias", facts: [
    { label: "当前任职", value: "TUM Visual Computing and Artificial Intelligence 教授、Visual Computing Lab 负责人。" },
    { label: "研究主线", value: "三维重建、场景理解、神经渲染、视频编辑与 synthetic media/deepfake 分析。" },
    { label: "教育与学术训练", value: "2013 年在 University of Erlangen–Nuremberg 获博士，官方履历明确列 Günther Greiner 为博士导师。" },
    { label: "学术经历", value: "2013–2017 年在 Stanford 任访问教授，2017 年加入 TUM。" },
  ] }),
  makePerson({ id: "daniel-rueckert-tum-tail", name: "Daniel Rückert", role: "Alexander von Humboldt Professor of AI in Medicine", institution: "TUM", area: "Medical Imaging · Biomedical AI · Digital Health", tags: ["Medical AI", "Medical Imaging", "Digital Health", "Biomedical AI"], summary: "TUM 医疗 AI 资深教授，以机器学习推进医学影像、诊断和数字医疗。", stage: "senior", x: 280, y: 320, profile: danielProfile, roster: tumRoster, extras: [tumCsChairs, danielPrize, tumMdsi], portraitSource: danielPortrait, portraitFile: "daniel", facts: [
    { label: "当前任职", value: "TUM Alexander von Humboldt Professor for AI in Medicine and Healthcare，领导 Institute for AI and Informatics in Medicine。" },
    { label: "研究主线", value: "医学图像计算、医学数据科学、AI 辅助影像采集、分析和解释。" },
    { label: "教育与学术训练", value: "TU Berlin 计算机科学 Diplom，1997 年获 Imperial College London 计算机科学博士。" },
    { label: "学生与产业", value: "官方简介记录其已培养 50 余名博士；其研究成果用于 Imperial spin-out IXICO，并另创办医学影像相关创业公司。" },
  ] }),
  makePerson({ id: "julia-schnabel-tum-tail", name: "Julia Schnabel", role: "Professor of Computational Imaging and AI in Medicine", institution: "TUM", area: "Medical Imaging · Machine Learning · Clinical AI", tags: ["Medical AI", "Image Registration", "Segmentation", "Clinical AI"], summary: "TUM 计算成像与医疗 AI 教授，研究从图像重建到临床预测的完整链条。", stage: "senior", x: 440, y: 320, profile: juliaProfile, roster: tumRoster, extras: [tumCsChairs, juliaResearch, tumMdsi], portraitSource: juliaPortrait, portraitFile: "julia", facts: [
    { label: "当前任职", value: "2021 年起任 TUM Computational Imaging and AI in Medicine 教授，并与 Helmholtz Munich 联合任职。" },
    { label: "研究主线", value: "生物医学成像中的机器学习、运动建模、图像重建、质量控制、分割和分类。" },
    { label: "教育与学术训练", value: "TU Berlin 计算机科学学位，1998 年获 UCL 博士；之后在 Utrecht、King’s College London 与 UCL 开展博士后研究。" },
    { label: "学术经历", value: "曾任 Oxford 副教授与 King’s College London 计算成像教授。" },
  ] }),
  makePerson({ id: "nils-thuerey-tum-tail", name: "Nils Thürey", role: "Professor of Physics-based Simulation", institution: "TUM", area: "Physics-based Deep Learning · Computer Graphics", tags: ["Physics-based ML", "Simulation", "Computer Graphics", "Diffusion Models"], summary: "TUM 物理仿真教授，用深度学习连接流体力学、可微模拟与计算机图形学。", stage: "senior", x: 600, y: 320, profile: nilsProfile, roster: tumRoster, extras: [tumCsChairs, nilsTeam], portraitSource: nilsPortrait, portraitFile: "nils", facts: [
    { label: "当前任职", value: "2013 年起任 TUM Physics-based Simulation 教授。" },
    { label: "研究主线", value: "流体仿真、物理驱动深度学习、可微求解器与计算机图形学。" },
    { label: "教育与学术训练", value: "在 University of Erlangen–Nuremberg 完成计算机科学学位与 2006 年液体仿真博士。" },
    { label: "产业经历", value: "曾与 Ageia/Nvidia 合作开展 ETH 博士后研究，并任 ScanlineVFX Research & Development Lead。" },
  ] }),
  makePerson({ id: "heikki-mannila-aalto-tail", name: "Heikki Mannila", role: "Professor of Computer Science · Associate Vice President for AI", institution: "Aalto", area: "Data Mining · Machine Learning · AI Strategy", tags: ["Data Mining", "Machine Learning", "AI Strategy", "Interdisciplinary AI"], summary: "Aalto 数据挖掘资深教授与 AI 战略负责人，长期连接算法、跨学科研究与产业应用。", stage: "senior", x: 120, y: 520, profile: heikkiProfile, roster: aaltoRoster, extras: [heikkiNews], portraitSource: heikkiPortrait, portraitFile: "heikki", facts: [
    { label: "当前任职", value: "Aalto 计算机科学教授、Associate Vice President for AI Strategy and Adoption，并领导 House of AI。" },
    { label: "研究主线", value: "数据分析、数据挖掘、机器学习，以及这些方法在其他科学与产业中的应用。" },
    { label: "教育与学术训练", value: "1985 年在 University of Helsinki 完成博士论文，并长期在 Helsinki University 与 Helsinki University of Technology/Aalto 任教。" },
    { label: "产业与公共领导", value: "曾在 Microsoft Research Redmond 与 Nokia Research 工作，并于 2012–2022 年任 Academy of Finland 主席。" },
  ] }),
  makePerson({ id: "ilkka-niemela-aalto-tail", name: "Ilkka Niemelä", role: "President of Aalto University · Professor of Computer Science", institution: "Aalto", area: "Automated Reasoning · Constraint Programming · Logic AI", tags: ["Automated Reasoning", "Constraint Programming", "Knowledge Representation", "Logic AI"], summary: "Aalto 校长与计算机科学教授，研究自动推理、约束编程和逻辑型人工智能。", stage: "senior", x: 280, y: 520, profile: ilkkaProfile, roster: aaltoRoster, extras: [ilkkaResearch], portraitSource: ilkkaPortrait, portraitFile: "ilkka", facts: [
    { label: "当前任职", value: "Aalto University President，同时保有计算机科学教授身份。" },
    { label: "研究主线", value: "自动推理、约束编程、answer-set programming 与知识表示。" },
    { label: "教育与学术训练", value: "官方履历列 D.Sc. (Tech.) 学位；其计算机科学博士论文于 1993 年获 Finnish Society for Computer Science 年度论文奖。" },
    { label: "学术领导", value: "曾任理论计算机科学实验室主任、School of Science 院长、Vice President、Provost 与 Deputy President。" },
    { label: "国际经历", value: "官方履历记录其曾访问 SRI International AI Center、Universität Koblenz-Landau 和 National ICT Australia。" },
  ] }),
  makePerson({ id: "peter-gehler-tuebingen-tail", name: "Peter Gehler", role: "Professor of Machine Learning Engineering and Technology Transfer", institution: "Tübingen/MPI", area: "Machine Learning Engineering · Computer Vision · Tech Transfer", tags: ["Machine Learning", "Computer Vision", "AI Engineering", "Tech Transfer"], summary: "Tübingen AI Center 教授，把机器学习与计算机视觉研究连接到工程化、创业和技术转移。", stage: "senior", x: 440, y: 520, profile: peterProfile, roster: tuebingenRoster, extras: [peterCluster], portraitSource: peterPortrait, portraitFile: "peter", facts: [
    { label: "当前任职", value: "Tübingen AI Center Machine Learning Engineering and Technology Transfer 教授。" },
    { label: "研究主线", value: "机器学习工程、计算机视觉、现代 AI 系统及安全可靠的技术落地。" },
    { label: "教育与学术训练", value: "2009 年获博士；曾任 ETH 博士后、MPI Informatics 组长、University of Würzburg 正教授。" },
    { label: "产业与创业", value: "2017 年共同建立 Amazon Tübingen Research Center，曾任 Amazon Senior Applied Scientist 与 Zalando Senior Principal Applied Scientist；现推动 AI 创业和技术转移。" },
  ] }),
];

export const europeFrozenTailPiExpansion1Relationships: Relationship[] = [
  {
    id: "europe-tail-dai-niessner-3d-publication",
    from: "angela-dai-tum-tail",
    to: "matthias-niessner-tum-tail",
    type: "collaboration",
    subtype: "publication",
    label: "3D 场景理解合作",
    evidence: "Angela Dai 的 TUM 官方履历列出其与 Matthias Nießner 共同署名 ScanNet、3DMV 与 BundleFusion 等工作。",
    evidenceObject: "ScanNet / 3DMV / BundleFusion",
    source: angelaProfile,
    verified: true,
  },
  {
    id: "europe-tail-rueckert-schnabel-medical-imaging",
    from: "daniel-rueckert-tum-tail",
    to: "julia-schnabel-tum-tail",
    type: "collaboration",
    subtype: "publication",
    label: "医疗影像合作",
    evidence: "Julia Schnabel 的 TUM 官方履历列出与 Daniel Rückert 共同署名的 medical image computing 综述。",
    evidenceObject: "Model-based and data-driven strategies in medical image computing",
    source: juliaProfile,
    verified: true,
  },
];

const member = (id: string, teacherId: string, name: string, role: string, source: Source, focus?: string): GroupMember => ({ id, teacherId, name, role, source, focus });

export const europeFrozenTailPiExpansion1GroupMembers: GroupMember[] = [
  member("europe-tail-member-debarghya-leena", "debarghya-ghoshdastidar-tum-tail", "Leena Chennuru Vankadara", "Doctoral alumna", debarghyaCv, "Learning theory and graph statistics"),
  member("europe-tail-member-debarghya-pascal", "debarghya-ghoshdastidar-tum-tail", "Pascal Mattia Esser", "Doctoral alumnus / former postdoc", debarghyaCv, "Theoretical machine learning"),
  member("europe-tail-member-nils-bhatia", "nils-thuerey-tum-tail", "Kanishk Bhatia", "Doctoral researcher", nilsTeam, "Physics-based simulation"),
  member("europe-tail-member-nils-medrano", "nils-thuerey-tum-tail", "Luis Medrano Navarro", "Doctoral researcher", nilsTeam, "Physics-based simulation"),
  member("europe-tail-member-peter-yu", "peter-gehler-tuebingen-tail", "Yixuan Yu", "PhD student", peterProfile, "Machine learning engineering"),
  member("europe-tail-member-peter-zhang", "peter-gehler-tuebingen-tail", "Shuwang Zhang", "PhD student", peterProfile, "Machine learning engineering"),
];

export const europeFrozenTailPiExpansion1StudentPlacements: StudentPlacement[] = [];

export const europeFrozenTailPiExpansion1PersonEnhancements: Record<string, Partial<Person>> = {
  "nassir-navab-lineage": {
    role: "Professor · Director, Computer Aided Medical Procedures",
    institution: "TUM",
    actualInstitution: "Technical University of Munich",
    region: "Europe",
    area: "Medical AI · Computer Vision · Augmented Reality · Surgical Robotics",
    tags: ["TUM", "Medical AI", "Computer Vision", "Augmented Reality", "Surgical Robotics", "CAMP"],
    summary: "TUM CAMP 实验室主任，长期连接计算机视觉、医疗影像、增强现实与数字化手术流程；其公开履历记录了 INRIA/Paris XI 博士训练、MIT Media Lab 博士后和 Siemens Corporate Research 经历。",
    facts: [
      { label: "当前任职", value: "TUM Computer Aided Medical Procedures & Augmented Reality 教授及 CAMP 实验室主任。", source: nassirLab },
      { label: "教育与学术训练", value: "在 INRIA / Paris XI 获博士，随后在 MIT Media Laboratory 完成两年博士后研究。", source: nassirProfile },
      { label: "研究主线", value: "计算机辅助医疗、医学影像、增强现实、数字化手术流程与机器人影像。", source: nassirLab },
      { label: "产业与转化", value: "加入 TUM 前任 Siemens Corporate Research Distinguished Member of Technical Staff；官方履历记录逾 60 项国际专利。", source: nassirProfile },
      { label: "学术影响", value: "CAMP 官方简介记录 MICCAI Enduring Impact Award、IEEE ISMAR Career Impact Award，以及其团队在 MICCAI、IPCAI、IPMI 和 ISMAR 的多项最佳论文奖。", source: nassirLab },
    ],
    stage: "senior",
    category: "core",
    status: "current PI · TUM official roster and first-party profile verified",
    sources: [tumRoster, nassirProfile, nassirLab],
    primary: true,
    lastVerifiedAt: checkedAt,
  },
};

export const europeFrozenTailPiExpansion1Portraits: Record<string, Person["portrait"]> = {
  ...Object.fromEntries(europeFrozenTailPiExpansion1People.map((person) => [person.id, person.portrait])),
  "nassir-navab-lineage": {
    src: "portraits/europe-frozen-tail-2026/nassir-navab.jpg",
    alt: "Nassir Navab TUM official portrait",
    source: nassirPortrait,
  },
};
