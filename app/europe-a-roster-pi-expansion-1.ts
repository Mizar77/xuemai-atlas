import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const tuebingenRoster = official(
  "University of Tübingen Computer Science research groups",
  "https://uni-tuebingen.de/en/faculties/faculty-of-science/departments/computer-science/research/",
  "Official department research-group roster and institutional affiliation",
);
const copenhagenRoster = official(
  "University of Copenhagen DIKU scientific staff roster",
  "https://di.ku.dk/english/staff/vip/",
  "Official scientific staff roster and current DIKU appointments",
);
const surreyRoster = official(
  "University of Surrey CVSSP people roster",
  "https://www.surrey.ac.uk/centre-vision-speech-signal-processing/people",
  "Official centre roster and current CVSSP affiliation",
);

type Seed = {
  id: string;
  name: string;
  role: string;
  institution: "Tübingen/MPI" | "Copenhagen" | "Surrey";
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  profile: Source;
  roster: Source;
  portraitSource?: Source;
  extraSources?: Source[];
  facts: { label: string; value: string; source?: Source }[];
  x: number;
  y: number;
};

function person(seed: Seed): Person {
  const portraitSource = seed.portraitSource ?? seed.profile;
  const facts = seed.facts.map((fact) => ({
    ...fact,
    source: fact.source ?? seed.profile,
  }));
  const trainingFact = facts.find((fact) =>
    /(教育|学术训练|学术路径|博士导师)/.test(fact.label),
  );
  if (!facts.some((fact) => fact.label === "教育与学术训练")) {
    if (trainingFact) {
      trainingFact.label = "教育与学术训练";
    } else {
      facts.push({
        label: "教育与学术训练",
        value: "本轮一手公开页面未披露足以逐项核验的完整学位与导师信息；保留为后续 CV/论文反查项。",
        source: seed.profile,
      });
    }
  }
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: seed.institution,
    region: "Europe",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts,
    stage: seed.stage,
    category: "core",
    status: "current PI · official roster and first-party profile verified",
    sources: [seed.profile, seed.roster, ...(seed.extraSources ?? [])],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/europe-a-roster-2026/${seed.id}.jpg`,
      alt: `${seed.name} official portrait`,
      source: portraitSource,
    },
  };
}

const bethgeProfile = official(
  "University of Tübingen — Matthias Bethge research group",
  "https://www.physik.uni-tuebingen.de/institute/institut-fuer-theoretische-physik/arbeitsgruppen/ag-bethge.html",
  "Current professorship, research programme, methods and Tübingen AI Center affiliation",
);
const butzProfile = official(
  "University of Tübingen — Martin V. Butz profile",
  "https://uni-tuebingen.de/en/research/core-research/research-training-groups/rtg-1808-ambiguity-production-and-perception/participants/researchers/prof-dr-martin-v-butz/",
  "Current role, research programme, degrees, habilitation and prior appointments",
);
const heinProfile = official(
  "University of Tübingen — Matthias Hein profile",
  "https://uni-tuebingen.de/en/164260",
  "Current Bosch endowed chair, machine-learning research and MSc coordination",
);
const heinTeam = official(
  "University of Tübingen Machine Learning group — team",
  "https://uni-tuebingen.de/fakultaeten/mathematisch-naturwissenschaftliche-fakultaet/fachbereiche/informatik/lehrstuehle/maschinelles-lernen/team/",
  "Group leadership, current members and publicly listed alumni destinations",
);
const kuehneProfile = official(
  "Hilde Kühne — first-party academic profile",
  "https://hildekuehne.github.io/index.html",
  "Current appointment, research, degree history and prior academic/industry research training",
);
const kuehneAppointment = official(
  "University of Tübingen — Hilde Kühne appointment",
  "https://uni-tuebingen.de/fr/271893",
  "W3 Multimodal Learning professorship and Tübingen AI Center appointment date",
);
const krennProfile = official(
  "University of Tübingen — Mario Krenn profile",
  "https://uni-tuebingen.de/en/282066",
  "Current professorship, education, postdoctoral training and research trajectory",
);
const krennLab = official(
  "Artificial Scientist Lab — Mario Krenn",
  "https://artificial-scientist-lab.ai/",
  "Lab leadership and research on AI systems for scientific discovery",
);
const ponsMollProfile = official(
  "Real Virtual Humans — Gerard Pons-Moll profile",
  "https://virtualhumans.mpi-inf.mpg.de/people/pons-moll.html",
  "Current appointments, education, prior training and 3D human research programme",
);

const sogaardProfile = official(
  "University of Copenhagen — Anders Søgaard research profile",
  "https://researchprofiles.ku.dk/en/persons/anders-s%C3%B8gaard/",
  "Current professorship, organisational affiliations and NLP/ML research",
);
const sogaardPersonal = official(
  "Anders Søgaard — first-party academic homepage",
  "https://anderssoegaard.github.io/",
  "Research agenda and prior Google Research and Amazon Core ML experience",
);
const sogaardTraining = official(
  "Carlsberg Foundation researcher profile — Anders Søgaard",
  "https://www.carlsbergfondet.dk/viden/maanedens-forsker-1-2024-anders-soegaard/",
  "Computational linguistics education and doctorate trajectory",
);
const liomaProfile = official(
  "University of Copenhagen — Christina Lioma research profile",
  "https://researchprofiles.ku.dk/en/persons/christina-lioma/",
  "Current professorship, research areas, degrees and prior academic appointments",
);
const igelProfile = official(
  "University of Copenhagen — Christian Igel research profile",
  "https://researchprofiles.ku.dk/en/persons/christian-igel/",
  "Current professorship and centre leadership, research agenda, doctorate and habilitation",
);
const elliottProfile = official(
  "University of Copenhagen — Desmond Elliott research profile",
  "https://researchprofiles.ku.dk/en/persons/desmond-elliott/",
  "Current appointment, multimodal/multilingual research, education and research awards",
);
const belongieProfile = official(
  "University of Copenhagen — Serge Belongie faculty profile",
  "https://di.ku.dk/english/staff/vip/?pure=en/persons/575485",
  "Current DIKU professorship and Pioneer Centre for AI leadership",
);
const belongieNews = official(
  "University of Copenhagen — Serge Belongie appointment profile",
  "https://di.ku.dk/english/news/2021/how-birds-species-made-new-professor-serge-belongie-world-famous-within-computer-vision/",
  "Research agenda, Cornell/Google trajectory and company co-founding record",
);
const belongieCv: Source = {
  label: "Serge Belongie official Cornell CV",
  url: "https://www.cs.cornell.edu/~sjb/cv.pdf",
  kind: "cv",
  checkedAt,
  supports: "Caltech and Berkeley education; UC Berkeley PhD adviser Jitendra Malik",
};
const deBruijneProfile = official(
  "University of Copenhagen — Marleen de Bruijne research profile",
  "https://researchprofiles.ku.dk/en/persons/marleen-de-bruijne/",
  "Current dual professorship, medical-image research, degrees and supervision record",
);
const hershcovichProfile = official(
  "University of Copenhagen — Daniel Hershcovich research profile",
  "https://researchprofiles.ku.dk/en/persons/daniel-hershcovich/",
  "Current tenure-track appointment, research agenda and education",
);

const bowdenProfile = official(
  "University of Surrey — Richard Bowden profile",
  "https://www.surrey.ac.uk/people/richard-bowden",
  "Current professorship, group leadership, degrees, research and Signapse role",
);
const carneiroProfile = official(
  "University of Surrey — Gustavo Carneiro profile",
  "https://www.surrey.ac.uk/people/gustavo-carneiro",
  "Current professorship, research programme and prior academic leadership/training",
);
const collomosseProfile = official(
  "University of Surrey — John Collomosse profile",
  "https://www.surrey.ac.uk/people/john-collomosse",
  "Current professorship, DECaDE leadership, Adobe Research role and research programme",
);
const hadfieldProfile = official(
  "University of Surrey — Simon Hadfield profile",
  "https://www.surrey.ac.uk/people/simon-hadfield",
  "Current professorship, research areas, Surrey degrees and PhD supervision by Richard Bowden",
);
const songProfile = official(
  "University of Surrey — Yi-Zhe Song profile",
  "https://www.surrey.ac.uk/people/yi-zhe-song",
  "Current professorship and institute leadership, education and visual-AI research",
);
const wangProfile = official(
  "University of Surrey — Wenwu Wang profile",
  "https://www.surrey.ac.uk/people/wenwu-wang",
  "Current professorship and leadership, degrees, machine-audition research and industrial partners",
);
const zhuProfile = official(
  "University of Surrey — Xiatian Zhu profile",
  "https://www.surrey.ac.uk/people/xiatian-zhu",
  "Current readership, lab leadership, doctoral qualification and multimodal/physical AI research",
);

export const europeARosterPiExpansion1People: Person[] = [
  person({
    id: "matthias-bethge-tuebingen", name: "Matthias Bethge", role: "Professor · Computational Neuroscience & Machine Learning", institution: "Tübingen/MPI",
    area: "Computational Neuroscience · Machine Learning · Computational Vision", tags: ["计算神经科学", "机器学习", "计算视觉", "可解释网络"],
    summary: "把视觉神经科学、统计推断与机器学习连接起来，研究生物和人工网络为何能够形成高性能表征。", stage: "senior", profile: bethgeProfile, roster: tuebingenRoster,
    facts: [
      { label: "当前任职", value: "图宾根大学理论物理研究所教授，并参与 Tübingen AI Center 与 Bernstein Center。" },
      { label: "研究主线", value: "计算神经科学、机器学习和计算视觉，重点比较生物神经网络与人工神经网络。" },
      { label: "学术训练主线", value: "以统计推断、学习理论、信号处理、非线性动力学和优化为共同方法基础。" },
      { label: "为什么值得关注", value: "其团队处在自然智能机制与可解释人工视觉模型之间，是图宾根跨学科 AI 生态的重要桥梁。" },
    ], x: 120, y: 120,
  }),
  person({
    id: "martin-butz-tuebingen", name: "Martin V. Butz", role: "Professor · Cognitive Modeling", institution: "Tübingen/MPI",
    area: "Cognitive Modeling · Predictive Learning · Human-Compatible AI", tags: ["认知建模", "预测学习", "深度学习", "人机兼容 AI"],
    summary: "从事件预测认知出发，把计算机科学、心理学和神经科学结合到人类兼容 AI 的建模中。", stage: "senior", profile: butzProfile, roster: tuebingenRoster,
    facts: [
      { label: "当前任职", value: "图宾根大学计算机科学系 Cognitive Modeling 全职教授，并兼任心理学系教授。" },
      { label: "研究主线", value: "事件预测认知、贝叶斯与深度学习、具身智能以及人类兼容 AI。" },
      { label: "教育与学术训练", value: "2001 年获维尔茨堡大学计算机科学文凭，2004 年获伊利诺伊大学厄巴纳-香槟分校计算机科学博士，2011 年在维尔茨堡完成 habilitation。" },
      { label: "为什么值得关注", value: "其工作把认知机制的可计算解释与现代学习系统连接起来，而不是只优化任务指标。" },
    ], x: 280, y: 120,
  }),
  person({
    id: "matthias-hein-tuebingen", name: "Matthias Hein", role: "Bosch Endowed Professor · Machine Learning", institution: "Tübingen/MPI",
    area: "Robust Machine Learning · Explainable AI · Learning Theory", tags: ["鲁棒机器学习", "安全 AI", "可解释 AI", "学习理论"],
    summary: "图宾根机器学习资深 PI，集中研究深度模型的鲁棒性、安全性、可解释性与理论保证。", stage: "senior", profile: heinProfile, roster: tuebingenRoster, extraSources: [heinTeam],
    facts: [
      { label: "当前任职", value: "图宾根大学 Bosch Endowed Professor of Machine Learning，并协调国际 Machine Learning MSc 项目。" },
      { label: "研究主线", value: "鲁棒、安全、可解释机器学习，以及深度学习和统计学习的理论问题。" },
      { label: "学术训练与团队", value: "官方团队页公开列出研究人员及校友去向，可追踪其研究组从理论方法到产业研究的训练路径。", source: heinTeam },
      { label: "为什么值得关注", value: "其研究直接回答高风险部署中模型何时可靠、如何解释和如何给出保证。" },
    ], x: 440, y: 120,
  }),
  person({
    id: "hilde-kuehne-tuebingen", name: "Hilde Kühne", role: "Professor · Multimodal Learning", institution: "Tübingen/MPI",
    area: "Multimodal Learning · Video Understanding · Foundation Models", tags: ["多模态学习", "视频理解", "基础模型", "视觉语言"],
    summary: "以视频为核心连接文本、图像和音频，是图宾根多模态基础模型方向的代表性 PI。", stage: "senior", profile: kuehneProfile, roster: tuebingenRoster, extraSources: [kuehneAppointment],
    facts: [
      { label: "当前任职", value: "自 2024 年 8 月起任图宾根大学 W3 Multimodal Learning 教授，并加入 Tübingen AI Center。", source: kuehneAppointment },
      { label: "研究主线", value: "跨文本、图像、音频的视频理解、多模态学习与基础模型。" },
      { label: "教育与学术训练", value: "在科布伦茨学习 Computational Visualistics，于 KIT 完成动作识别博士；其后在波恩、MIT-IBM Watson AI Lab、法兰克福与波恩继续研究。" },
      { label: "为什么值得关注", value: "其路径贯穿经典动作识别、产业研究实验室和当代多模态基础模型。" },
    ], x: 600, y: 120,
  }),
  person({
    id: "mario-krenn-tuebingen", name: "Mario Krenn", role: "Professor · Machine Learning in Science II", institution: "Tübingen/MPI",
    area: "AI for Science · Scientific Discovery · AI Agents", tags: ["AI for Science", "科学发现", "实验设计", "智能体"],
    summary: "研究 AI 如何提出科学概念、设计实验并辅助发现，是图宾根 AI for Science 新方向的重要节点。", stage: "institute", profile: krennProfile, roster: tuebingenRoster, extraSources: [krennLab],
    facts: [
      { label: "当前任职", value: "自 2025 年 6 月起任图宾根大学 Machine Learning in Science II 教授。" },
      { label: "研究主线", value: "用机器学习和 AI 智能体推动物理学概念发现、实验设计与科学创意生成。", source: krennLab },
      { label: "教育与学术训练", value: "在维也纳学习物理并在 Anton Zeilinger 团队完成量子物理博士；之后进入 Vector Institute / Toronto 的 Alan Aspuru-Guzik 团队。" },
      { label: "学术路径", value: "2021 至 2025 年 5 月在 Max Planck Institute for the Science of Light 领导 Artificial Scientist Lab。" },
    ], x: 760, y: 120,
  }),
  person({
    id: "gerard-pons-moll-tuebingen", name: "Gerard Pons-Moll", role: "Professor · Head, Real Virtual Humans", institution: "Tübingen/MPI",
    area: "3D Human Modeling · Computer Vision · Graphics", tags: ["三维人体", "计算机视觉", "图形学", "生成模型"],
    summary: "围绕可学习的三维人体、姿态、服装和运动建模，连接计算机视觉、图形学与生成式模型。", stage: "institute", profile: ponsMollProfile, roster: tuebingenRoster,
    facts: [
      { label: "当前任职", value: "图宾根大学 Carl Zeiss Foundation Endowed Professor、Tübingen AI Center 核心成员，并在 MPI Informatics 领导 Real Virtual Humans。" },
      { label: "研究主线", value: "三维人体姿态、形状、服装和运动的捕捉、重建与生成。" },
      { label: "教育与学术训练", value: "在 UPC 获通信工程学位，2014 年于 Leibniz University Hannover 获博士；曾在 Northeastern、Toronto、Microsoft Research Cambridge 与 MPI 接受研究训练。" },
      { label: "为什么值得关注", value: "其研究把真实人体的可测量几何结构转化为可学习、可生成和可交互的数字人表示。" },
    ], x: 920, y: 120,
  }),

  person({
    id: "anders-sogaard-copenhagen", name: "Anders Søgaard", role: "Professor · NLP & Machine Learning", institution: "Copenhagen",
    area: "Natural Language Processing · Multilingual Models · Responsible AI", tags: ["NLP", "多语言", "语言模型", "负责任 AI"],
    summary: "哥本哈根大学跨院系 NLP 教授，长期研究跨语言泛化、语言模型与负责任 AI。", stage: "senior", profile: sogaardProfile, roster: copenhagenRoster, extraSources: [sogaardPersonal, sogaardTraining],
    facts: [
      { label: "当前任职", value: "哥本哈根大学 NLP/ML 教授，连接 DIKU、传播与哲学、Pioneer Centre for AI 和社会数据科学中心。" },
      { label: "研究主线", value: "跨语言语义、句法分析、迁移学习、多语言语言模型与负责任 AI。" },
      { label: "教育与学术训练", value: "2004 年获 computational linguistics 硕士，2007 年在哥本哈根大学完成 language technology 博士，2014 年获 dr.phil.。", source: sogaardTraining },
      { label: "产业研究经历", value: "个人学术主页列出 Google Research 与 Amazon Core ML 的研究经历。", source: sogaardPersonal },
    ], x: 120, y: 300,
  }),
  person({
    id: "christina-lioma-copenhagen", name: "Christina Lioma", role: "Professor · Machine Learning", institution: "Copenhagen",
    area: "Information Retrieval · Text Analytics · Natural Language Processing", tags: ["信息检索", "文本分析", "NLP", "推荐系统"],
    summary: "以搜索和信息检索为主线，将 NLP、数据挖掘与推荐系统连接到可用的信息访问系统。", stage: "senior", profile: liomaProfile, roster: copenhagenRoster,
    facts: [
      { label: "当前任职", value: "自 2019 年起任哥本哈根大学 DIKU Machine Learning 全职教授。" },
      { label: "研究主线", value: "信息检索、搜索、数据与网页挖掘、文本分析、NLP 和推荐系统。" },
      { label: "教育与学术训练", value: "2001 年获 Glasgow M.Hons，2003 年获 Manchester MSc，2007 年获 Glasgow PhD。" },
      { label: "学术路径", value: "博士后阶段先后在 KU Leuven、Konstanz、Stuttgart 和 DTU 研究，2012 年进入 DIKU。" },
    ], x: 280, y: 300,
  }),
  person({
    id: "christian-igel-copenhagen", name: "Christian Igel", role: "Professor · Director, SCIENCE AI Centre", institution: "Copenhagen",
    area: "Machine Learning · Evolution Strategies · Reinforcement Learning", tags: ["机器学习", "进化策略", "强化学习", "PAC-Bayes"],
    summary: "从进化优化、强化学习到随机神经网络与 PAC-Bayes 理论，覆盖机器学习方法的多个基础层面。", stage: "institute", profile: igelProfile, roster: copenhagenRoster,
    facts: [
      { label: "当前任职", value: "哥本哈根大学 DIKU 机器学习教授，并任 SCIENCE AI Centre 主任。" },
      { label: "研究主线", value: "核方法、进化策略、强化学习、深度与随机神经网络、PAC-Bayes 理论。" },
      { label: "教育与学术训练", value: "在 TU Dortmund 学习计算机科学，2002 年于 Bielefeld 获博士，2010 年在 Ruhr University Bochum 完成 habilitation。" },
      { label: "为什么值得关注", value: "其工作横跨学习理论、优化算法和神经网络，是 DIKU 方法型机器学习的重要节点。" },
    ], x: 440, y: 300,
  }),
  person({
    id: "desmond-elliott-copenhagen", name: "Desmond Elliott", role: "Associate Professor · Promotion Programme", institution: "Copenhagen",
    area: "Multimodal NLP · Multilingual Models · Vision-Language", tags: ["多模态 NLP", "多语言", "视觉语言", "无分词模型"],
    summary: "研究语言模型如何跨视觉与语言、跨语言迁移，重点包括多模态表示和 tokenization-free NLP。", stage: "emerging", profile: elliottProfile, roster: copenhagenRoster,
    facts: [
      { label: "当前任职", value: "哥本哈根大学 DIKU AI Section Associate Professor（Promotion Programme）。" },
      { label: "研究主线", value: "多模态与多语言模型、视觉语言学习，以及 tokenization-free NLP。" },
      { label: "教育与学术训练", value: "2007 年获 Edinburgh BSc，2011 年获 Glasgow MSc(R)，2015 年获 Edinburgh 计算机科学博士。" },
      { label: "代表性认可", value: "官方档案列出 EMNLP 2021 Best Long Paper，并记录 COLING 2018 area-chair favourite。" },
    ], x: 600, y: 300,
  }),
  person({
    id: "serge-belongie-copenhagen", name: "Serge Belongie", role: "Professor · Director, Pioneer Centre for AI", institution: "Copenhagen",
    area: "Computer Vision · Machine Learning · Fine-Grained Recognition", tags: ["计算机视觉", "机器学习", "细粒度识别", "人机协同"],
    summary: "国际计算机视觉资深学者，兼具 Berkeley 师承、Cornell/Cornell Tech 学术领导与 Google 产业研究经历。", stage: "institute", profile: belongieProfile, roster: copenhagenRoster, extraSources: [belongieNews, belongieCv],
    facts: [
      { label: "当前任职", value: "哥本哈根大学 DIKU 教授，并任 Pioneer Centre for AI 主任。" },
      { label: "研究主线", value: "计算机视觉、机器学习、细粒度识别、人机协同与视觉信息可信性。", source: belongieNews },
      { label: "教育与师承", value: "1995 年获 Caltech EE 学士，1997/2000 年获 Berkeley EECS 硕士与博士；博士导师为 Jitendra Malik。", source: belongieCv },
      { label: "学术与产业路径", value: "曾任 Cornell 教授、Cornell Tech 副院长并访问 Google；大学报道还列出 Digital Persona、Anchovi Labs 和 Orpix 的共同创办经历。", source: belongieNews },
    ], x: 760, y: 300,
  }),
  person({
    id: "marleen-de-bruijne-copenhagen", name: "Marleen de Bruijne", role: "Professor · AI in Medical Image Analysis", institution: "Copenhagen",
    area: "Medical Image Analysis · Machine Learning · Computer-Aided Diagnosis", tags: ["医学影像", "机器学习", "计算机辅助诊断", "定量影像"],
    summary: "在哥本哈根与 Erasmus MC 双聘，长期用机器学习建立可量化的医学影像分析与辅助诊断系统。", stage: "senior", profile: deBruijneProfile, roster: copenhagenRoster,
    facts: [
      { label: "当前任职", value: "哥本哈根大学与 Erasmus MC 的 AI in Medical Image Analysis 教授。" },
      { label: "研究主线", value: "医学影像定量分析、机器学习与计算机辅助诊断。" },
      { label: "教育与学术训练", value: "1997 年获 Utrecht University 物理学硕士，2003 年在同校完成医学影像博士。" },
      { label: "人才培养与转化", value: "官方档案记录其共同指导 30 名博士生，并拥有 7 项专利。" },
    ], x: 920, y: 300,
  }),
  person({
    id: "daniel-hershcovich-copenhagen", name: "Daniel Hershcovich", role: "Tenure-Track Assistant Professor", institution: "Copenhagen",
    area: "Cross-Cultural NLP · Language Models · Hybrid AI", tags: ["跨文化 NLP", "语言模型", "价值观", "混合 AI"],
    summary: "研究语言模型如何表达跨文化价值、规范与知识，并把 NLP 延伸到法律和食品等应用领域。", stage: "emerging", profile: hershcovichProfile, roster: copenhagenRoster,
    facts: [
      { label: "当前任职", value: "哥本哈根大学 DIKU tenure-track assistant professor。" },
      { label: "研究主线", value: "跨文化 NLP、语言模型中的价值与规范、知识表示，以及混合/多智能体 AI。" },
      { label: "教育与学术训练", value: "2010 年获 Open University of Israel 数学与计算机科学学士，2019 年在 Hebrew University of Jerusalem 完成博士。" },
      { label: "为什么值得关注", value: "把语言模型的跨文化差异转化为可研究的表示、评测和应用问题。" },
    ], x: 1080, y: 300,
  }),

  person({
    id: "richard-bowden-surrey", name: "Richard Bowden", role: "Professor · Cognitive Vision Group Lead", institution: "Surrey",
    area: "Human Understanding · Sign Language · Computer Vision", tags: ["人体理解", "手语识别", "动作识别", "计算机视觉"],
    summary: "Surrey 人体视觉理解资深 PI，连接手语、动作、唇读与人机交互，并将技术推进到 Signapse AI。", stage: "institute", profile: bowdenProfile, roster: surreyRoster,
    facts: [
      { label: "当前任职", value: "Surrey 计算机视觉与机器学习教授，领导 Cognitive Vision Group，并为 People-Centred AI Fellow。" },
      { label: "研究主线", value: "人体定位、跟踪与理解，包括手语、手势、动作、唇读以及 HCI/robotics。" },
      { label: "教育与学术训练", value: "1993 年获 London BSc，1995 年获 Leeds distinction MSc，1999 年获 Brunel 计算机视觉博士。" },
      { label: "产业连接", value: "官方主页列其为 Signapse AI 的共同创办人兼 Chief Scientist。" },
    ], x: 120, y: 480,
  }),
  person({
    id: "gustavo-carneiro-surrey", name: "Gustavo Carneiro", role: "Professor · Artificial Intelligence & Machine Learning", institution: "Surrey",
    area: "Medical Image Analysis · Computer Vision · Machine Learning", tags: ["医学影像", "计算机视觉", "机器学习", "AI 医疗"],
    summary: "以医学影像分析为核心，连接计算机视觉、理论机器学习与临床辅助决策。", stage: "senior", profile: carneiroProfile, roster: surreyRoster,
    facts: [
      { label: "当前任职", value: "Surrey 人工智能与机器学习教授，并为 Institute for People-Centred AI Fellow。" },
      { label: "研究主线", value: "医学影像分析、计算机视觉与理论机器学习。" },
      { label: "学术训练与路径", value: "曾在 University of Adelaide 任教授、ARC Future Fellow，并领导 Australian Institute for Machine Learning 的 Medical Machine Learning 团队。" },
      { label: "国际研究经历", value: "官方主页列出 Technical University of Munich 访问职位、Humboldt Fellowship 以及 CMU-Portugal 访问教职经历。" },
    ], x: 280, y: 480,
  }),
  person({
    id: "john-collomosse-surrey", name: "John Collomosse", role: "Professor · Computer Vision & AI", institution: "Surrey",
    area: "Content Authenticity · Computer Vision · Media Provenance", tags: ["内容真实性", "媒体溯源", "视觉检索", "生成内容"],
    summary: "研究视觉内容真实性、来源追踪与生成媒体治理，同时连接 Surrey 学术团队和 Adobe Research。", stage: "institute", profile: collomosseProfile, roster: surreyRoster,
    facts: [
      { label: "当前任职", value: "Surrey Computer Vision & AI 教授，并创办及领导 DECaDE。" },
      { label: "研究主线", value: "内容真实性、媒体溯源、虚假信息、视觉搜索、水印与指纹技术。" },
      { label: "产业研究角色", value: "官方主页列其同时任 Adobe Research Senior Principal Scientist。" },
      { label: "为什么值得关注", value: "其研究直接面向生成式 AI 时代的内容来源、版权与可信传播基础设施。" },
    ], x: 440, y: 480,
  }),
  person({
    id: "simon-hadfield-surrey", name: "Simon Hadfield", role: "Professor · Robot Vision & Autonomous Systems", institution: "Surrey",
    area: "Robot Vision · Event Cameras · Embodied AI", tags: ["机器人视觉", "事件相机", "具身 AI", "三维视觉"],
    summary: "研究面向动态现实环境的机器人视觉、事件相机与自主系统，是 Surrey 视觉师承链中的现任 PI。", stage: "senior", profile: hadfieldProfile, roster: surreyRoster,
    facts: [
      { label: "当前任职", value: "Surrey Robot Vision and Autonomous Systems 教授。" },
      { label: "研究主线", value: "事件相机、机器学习与自主系统、三维计算机视觉和具身 AI。" },
      { label: "教育与师承", value: "在 Surrey 完成 Electronic & Computer Engineering MEng 和计算机视觉博士，博士由 Richard Bowden 指导。" },
      { label: "为什么值得关注", value: "其工作把非传统视觉传感器与机器人在开放动态场景中的感知问题结合起来。" },
    ], x: 600, y: 480,
  }),
  person({
    id: "yi-zhe-song-surrey", name: "Yi-Zhe Song", role: "Professor · Co-Director, People-Centred AI", institution: "Surrey",
    area: "Sketch Understanding · Generative Visual AI · Human Vision", tags: ["草图理解", "生成视觉 AI", "人本 AI", "计算机视觉"],
    summary: "以草图和人类视觉表达为入口研究生成式视觉 AI，并共同领导 Surrey People-Centred AI Institute。", stage: "institute", profile: songProfile, roster: surreyRoster,
    facts: [
      { label: "当前任职", value: "Surrey 计算机视觉与 AI 教授、Institute for People-Centred AI Co-Director，并领导 SketchX。" },
      { label: "研究主线", value: "草图理解、生成式视觉 AI 与人类视觉表达。" },
      { label: "教育与学术训练", value: "官方主页列出 University of Bath BSc、Cambridge MSc 和 Bath PhD。" },
      { label: "为什么值得关注", value: "其团队把人类快速、抽象的视觉表达方式转化为可学习和可生成的计算模型。" },
    ], x: 760, y: 480,
  }),
  person({
    id: "wenwu-wang-surrey", name: "Wenwu Wang", role: "Professor · Signal Processing & Machine Learning", institution: "Surrey",
    area: "Machine Audition · Multimodal Fusion · Signal Processing", tags: ["机器听觉", "多模态融合", "信号处理", "异常检测"],
    summary: "Surrey 机器听觉与多模态信号学习带头人，兼具学院领导和长期产业合作经验。", stage: "institute", profile: wangProfile, roster: surreyRoster,
    facts: [
      { label: "当前任职", value: "Surrey Signal Processing and Machine Learning 教授、学院 Associate Head，并共同领导 Machine Audition Lab。" },
      { label: "研究主线", value: "信号处理、机器听觉、感知建模、多模态融合与异常检测。" },
      { label: "教育与学术训练", value: "1997、2000、2002 年在 Harbin Engineering University 分别完成 BSc、ME 和 PhD。" },
      { label: "产业连接", value: "官方主页列出与 BBC、Meta、Samsung、Tencent 和 Huawei 等机构的项目合作。" },
    ], x: 920, y: 480,
  }),
  person({
    id: "xiatian-zhu-surrey", name: "Xiatian Zhu", role: "Reader · Lead, UP Lab", institution: "Surrey",
    area: "Multimodal Generative AI · Physical AI · World Models", tags: ["多模态生成 AI", "物理 AI", "世界模型", "计算机视觉"],
    summary: "Surrey 新一代视觉 PI，研究多模态生成模型、世界模型与面向现实环境的 Physical AI。", stage: "emerging", profile: zhuProfile, roster: surreyRoster,
    facts: [
      { label: "当前任职", value: "Surrey Reader（Associate Professor），隶属 People-Centred AI 与 CVSSP，并领导 UP Lab。" },
      { label: "研究主线", value: "多模态生成 AI、Physical AI、世界模型和计算机视觉。" },
      { label: "教育与学术训练", value: "官方主页列出 London 博士资格，并记录其获得 2016 Sullivan Doctoral Thesis Prize。" },
      { label: "为什么值得关注", value: "其研究由视觉表征进一步走向能够理解环境动态并参与行动的世界模型。" },
    ], x: 1080, y: 480,
  }),
];

export const europeARosterPiExpansion1Relationships: Relationship[] = [
  {
    id: "serge-belongie-jitendra-malik-phd",
    from: "jitendra-malik-us",
    to: "serge-belongie-copenhagen",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Serge Belongie 的官方 Cornell CV 列明 UC Berkeley 博士导师为 Jitendra Malik。",
    source: belongieCv,
    verified: true,
    endYear: 2000,
    evidenceObject: "Serge Belongie official Cornell CV",
  },
  {
    id: "simon-hadfield-richard-bowden-phd",
    from: "richard-bowden-surrey",
    to: "simon-hadfield-surrey",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "University of Surrey 官方主页写明 Simon Hadfield 的计算机视觉博士由 Richard Bowden 指导。",
    source: hadfieldProfile,
    verified: true,
    evidenceObject: "University of Surrey — Simon Hadfield profile",
  },
];

export const europeARosterPiExpansion1Portraits: Record<string, Person["portrait"]> =
  Object.fromEntries(
    europeARosterPiExpansion1People.map((entry) => [entry.id, entry.portrait]),
  );

export const europeARosterPiExpansion1DeferredLeaderIds = new Set([
  "christian-igel-copenhagen",
  "yi-zhe-song-surrey",
]);

export const europeARosterPiExpansion1PublishedPeople = europeARosterPiExpansion1People.filter(
  (person) => !europeARosterPiExpansion1DeferredLeaderIds.has(person.id),
);

export const europeARosterPiExpansion1Deferred: {
  id: string;
  name: string;
  reason: string;
}[] = [];
