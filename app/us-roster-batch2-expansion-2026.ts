import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const official = (slug: string, name: string, supports = "Current appointment, research areas, biography and official portrait") =>
  source(`UT Austin CS · ${name}`, `https://www.cs.utexas.edu/people/faculty-researchers/${slug}`, "official", supports);

const sources = {
  adam: official("adam-klivans", "Adam Klivans", "Current professorship, AI leadership, research areas and official portrait"),
  adamHome: source("Adam Klivans · homepage", "https://www.cs.utexas.edu/~klivans/", "profile", "IFML and ML Lab leadership, current students, postdocs and named former students"),
  adamThesis: source("Adam Klivans · MIT thesis abstract", "https://www.cs.utexas.edu/~klivans/abstract.html", "thesis", "First-party thesis page explicitly names Dan Spielman as thesis supervisor"),
  amy: official("amy-zhang", "Amy Zhang"),
  amyHome: source("Amy Zhang · homepage", "https://amyzhang.github.io/", "profile", "Current MIDI Lab, research programme and PhD co-supervisors Joelle Pineau and Doina Precup"),
  chenfeng: official("chenfeng-xu", "Chenfeng Xu", "Current appointment, efficient ML and robotics systems research, industry uptake, education and official portrait"),
  chenfengHome: source("Chenfeng Xu · homepage", "https://www.chenfengx.com/", "profile", "Current research programme and project record"),
  david: official("david-harwath", "David Harwath"),
  davidHome: source("David Harwath · homepage", "https://www.cs.utexas.edu/~harwath/", "profile", "SALT Lab, speech-language and multimodal research, MIT PhD supervision by Jim Glass"),
  elias: official("elias-stengel-eskin", "Elias Stengel-Eskin"),
  eliasHome: source("Elias Stengel-Eskin · homepage", "https://esteng.github.io/", "profile", "AI-agent and NLP programme, Johns Hopkins PhD supervision and UNC postdoctoral mentor"),
  georgios: official("georgios-pavlakos", "Georgios Pavlakos", "Current appointment, education, doctoral adviser, postdoctoral advisers, Facebook Reality Labs experience and portrait"),
  georgiosHome: source("Georgios Pavlakos · homepage", "https://geopavlakos.github.io/", "profile", "Computer-vision and 3D human reconstruction research programme"),
  inderjit: official("inderjit-dhillon", "Inderjit Dhillon"),
  inderjitBio: source("Inderjit Dhillon · biography", "https://www.cs.utexas.edu/~inderjit/biography.shtml", "profile", "Current Google leave, prior Amazon vice-president role and Berkeley research-lab leadership"),
  inderjitCv: source("Inderjit Dhillon · CV", "https://www.cs.utexas.edu/~inderjit/cv.pdf", "cv", "IIT Bombay undergraduate degree, UC Berkeley PhD and doctoral advisers Beresford N. Parlett and James W. Demmel"),
  joydeep: official("joydeep-biswas", "Joydeep Biswas", "Current appointment, long-term robot autonomy, CMU PhD, prior UMass role and official portrait"),
  joydeepHome: source("Joydeep Biswas · homepage", "https://www.joydeepb.com/", "profile", "Autonomous Mobile Robotics Laboratory and current research programme"),
  kevin: official("kevin-tian", "Kevin Tian", "Current appointment, research areas, doctoral adviser, Microsoft Research postdoc and official portrait"),
  kevinHome: source("Kevin Tian · homepage", "https://kjtian.github.io/", "profile", "Stanford PhD adviser, Microsoft Research postdoc and named current group roster"),
  matthew: official("matthew-lease", "Matthew Lease", "Current professorship, information retrieval, crowdsourcing and AI/HCC lab affiliation"),
  matthewHome: source("Matthew Lease · homepage", "https://www.ischool.utexas.edu/~ml/", "profile", "AI and Human-Centered Computing lab, Amazon Science affiliation and current research programme"),
  matthewProfile: source("UT iSchool · Matthew Lease", "https://ischool.utexas.edu/profiles/matthew-lease", "official", "Brown University PhD and MSc, University of Washington BSc, current research programme and laboratory leadership"),
  noah: official("noah-golowich", "Noah Golowich", "Current appointment, modern-AI theory, Microsoft Research postdoc, education and official portrait"),
  noahHome: source("Noah Golowich · homepage", "https://noahgol.github.io/index.html", "profile", "MIT PhD co-advisers, Microsoft Research postdoc and research programme"),
  qixing: official("qixing-huang", "Qixing Huang"),
  qixingCv: source("Qixing Huang · CV", "https://www.cs.utexas.edu/~huangqx/Qixing_Huang_CV.pdf", "cv", "Stanford PhD adviser, Tsinghua master adviser, postdoc, internships and consulting"),
  qixingGroup: source("Qixing Huang · current group", "https://www.cs.utexas.edu/~huangqx/group.html", "profile", "First-party current postdoc and PhD roster with co-supervision annotations"),
  sanjay: official("sanjay-shakkottai", "Sanjay Shakkottai", "Current professorship, Center for Generative AI leadership, research scope, education and portrait"),
  sanjayHome: source("Sanjay Shakkottai · homepage", "https://sites.google.com/view/sanjay-shakkottai/", "profile", "Generative AI, diffusion models, networks and current research programme"),
  genAiCenter: source("UT Machine Learning Laboratory · Center for Generative AI", "https://ml.utexas.edu/center-for-generative-ai", "official", "Sanjay Shakkottai as director and Adam Klivans as executive-committee member of the same center"),
  sujay: official("sujay-sanghavi", "Sujay Sanghavi", "Current professorship, education, machine-learning and systems research and official portrait"),
  sujayHome: source("Sujay Sanghavi · homepage", "https://sites.utexas.edu/sanghavi/", "profile", "Machine-learning, high-dimensional data and systems research programme"),
  yan: official("yan-leng", "Yan Leng", "Current UT appointment, Machine Learning Lab membership, AI/network-science research and official portrait"),
  yanCv: source("Yan Leng · CV", "https://yleng.github.io/www/Leng_CV.pdf", "cv", "2020-present faculty appointment, MIT education, LLM and network-science programme, grants and service"),
};

type Seed = {
  id: string;
  name: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  facts: NonNullable<Person["facts"]>;
  portraitFile: string;
  portraitSource: Source;
  personSources: Source[];
  stage: Person["stage"];
  x: number;
  y: number;
};

const person = (seed: Seed): Person => ({
  id: seed.id,
  name: seed.name,
  role: seed.role,
  institution: "UT Austin",
  region: "United States",
  area: seed.area,
  tags: seed.tags,
  summary: seed.summary,
  facts: seed.facts,
  stage: seed.stage,
  category: "core",
  status: "current independent PI · UT Austin official roster verified",
  sources: seed.personSources,
  x: seed.x,
  y: seed.y,
  primary: true,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/us-roster-batch2-2026/${seed.portraitFile}`,
    alt: `${seed.name} UT Austin 官方头像`,
    source: seed.portraitSource,
  },
});

export const usRosterBatch2People: Person[] = [
  person({
    id: "adam-klivans-ut-austin", name: "Adam Klivans", role: "Professor · Director of AI Initiatives", stage: "senior", x: 120, y: 120,
    area: "Foundations of Machine Learning · Learning Theory · Generative AI", tags: ["机器学习理论", "生成式 AI", "IFML", "学习理论"],
    summary: "领导 NSF IFML、UT Machine Learning Lab 与 Center for Generative AI，把学习理论和生成式 AI 基础研究连接起来的 UT Austin 资深 PI。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机教授、School of Computing AI Initiatives 主任，并领导 NSF IFML 与 UT Machine Learning Lab。", source: sources.adam },
      { label: "研究主线", value: "机器学习理论、计算复杂性、分布偏移学习与生成式 AI 基础。", source: sources.adamHome },
      { label: "教育与学术训练", value: "MIT 博士论文页面明确列 Dan Spielman 为 thesis supervisor。", source: sources.adamThesis },
      { label: "当前团队", value: "本人主页列 Kostas Stavropoulos、Gautam Chandrasekaran、Kulin Shah 为学生，并公开 postdocs 与 former students。", source: sources.adamHome },
      { label: "为什么值得关注", value: "他同时处在学习理论、国家级 AI 研究所和生成式 AI 平台建设的交汇点。", source: sources.adam },
    ], portraitFile: "adam-klivans.jpg", portraitSource: sources.adam, personSources: [sources.adam, sources.adamHome, sources.adamThesis],
  }),
  person({
    id: "amy-zhang-ut-austin", name: "Amy Zhang", role: "Assistant Professor · Texas Instruments/Kilby Fellow", stage: "emerging", x: 270, y: 120,
    area: "Reinforcement Learning · Sequential Decision Making · Robot Learning", tags: ["强化学习", "机器人学习", "决策", "表征学习"],
    summary: "以样本效率、泛化和鲁棒性为核心，把强化学习理论推进到真实机器人与交互决策问题的青年 PI。",
    facts: [
      { label: "当前任职", value: "UT Austin ECE 助理教授与 Texas Robotics affiliate，领导 MIDI Lab。", source: sources.amyHome },
      { label: "研究主线", value: "强化学习、自监督学习、表征学习和真实场景序列决策。", source: sources.amy },
      { label: "教育与学术训练", value: "本人主页明确写明 McGill/Mila 博士由 Joëlle Pineau 与 Doina Precup 共同指导。", source: sources.amyHome },
      { label: "招生状态", value: "本人主页核验日明确写明不招收 Fall 2027 学生。", source: sources.amyHome },
    ], portraitFile: "amy-zhang.jpg", portraitSource: sources.amy, personSources: [sources.amy, sources.amyHome],
  }),
  person({
    id: "chenfeng-xu-ut-austin", name: "Chenfeng Xu", role: "Assistant Professor of Computer Science", stage: "emerging", x: 420, y: 120,
    area: "Efficient Machine Learning · ML Systems · Robotics", tags: ["高效 ML", "ML Systems", "机器人", "边缘 AI"],
    summary: "研究高效机器学习和机器人系统，强调模型在移动端、嵌入式设备、机器人与自动驾驶中的实际部署。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系助理教授。", source: sources.chenfeng },
      { label: "研究主线", value: "高效机器学习、ML systems 与机器人系统，面向移动和嵌入式设备、机器人及自动驾驶。", source: sources.chenfeng },
      { label: "教育与学术训练", value: "2025 年获 UC Berkeley 博士学位。", source: sources.chenfeng },
      { label: "产业连接", value: "UT 官方简介明确指出其方法已获得广泛产业采用与开源使用；本轮不把未点名公司推断为具体任职。", source: sources.chenfeng },
    ], portraitFile: "chenfeng-xu.jpg", portraitSource: sources.chenfeng, personSources: [sources.chenfeng, sources.chenfengHome],
  }),
  person({
    id: "david-harwath-ut-austin", name: "David Harwath", role: "Assistant Professor of Computer Science", stage: "emerging", x: 570, y: 120,
    area: "Speech · Multimodal Learning · Language Acquisition", tags: ["语音", "多模态", "语言习得", "低资源学习"],
    summary: "从视觉、语音等多模态输入中学习语言结构，连接自动语音识别、口语理解和低资源自监督学习。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系助理教授，领导 Speech, Audio, and Language Technologies (SALT) Lab。", source: sources.davidHome },
      { label: "研究主线", value: "自动语音识别、口语理解、多模态学习以及低资源自监督方法。", source: sources.david },
      { label: "教育与学术训练", value: "本人主页明确写明 MIT CSAIL 博士由 Jim Glass 指导。", source: sources.davidHome },
      { label: "职业轨迹", value: "博士毕业后于 2018–2020 年在 MIT CSAIL 任 Research Scientist。", source: sources.davidHome },
    ], portraitFile: "david-harwath.jpg", portraitSource: sources.david, personSources: [sources.david, sources.davidHome],
  }),
  person({
    id: "elias-stengel-eskin-ut-austin", name: "Elias Stengel-Eskin", role: "Assistant Professor of Computer Science", stage: "emerging", x: 720, y: 120,
    area: "NLP · AI Agents · Multimodal Reasoning · Multi-Agent Communication", tags: ["NLP", "AI Agent", "多智能体", "多模态推理"],
    summary: "研究能够与人及其他智能体沟通协作的 AI agents，覆盖多智能体讨论、语言到行动和视觉语言 grounding。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系助理教授。", source: sources.elias },
      { label: "研究主线", value: "多智能体沟通协作、语言到行动、视觉语言 grounding，以及不确定性和歧义。", source: sources.eliasHome },
      { label: "教育与学术训练", value: "本人主页明确写明 2023 年 Johns Hopkins 计算机博士由 Benjamin Van Durme 指导。", source: sources.eliasHome },
      { label: "博士后", value: "加入 UT 前在 UNC Chapel Hill 与 Mohit Bansal 开展博士后研究。", source: sources.eliasHome },
    ], portraitFile: "elias-stengel-eskin.jpg", portraitSource: sources.elias, personSources: [sources.elias, sources.eliasHome],
  }),
  person({
    id: "georgios-pavlakos-ut-austin", name: "Georgios Pavlakos", role: "Assistant Professor of Computer Science", stage: "emerging", x: 195, y: 300,
    area: "Computer Vision · 3D Humans · Robotics · Generative Vision", tags: ["计算机视觉", "3D 人体", "机器人", "生成视觉"],
    summary: "围绕三维人体理解、重建与生成建模开展研究，连接计算机视觉、图形学、具身感知与机器人学习。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系助理教授。", source: sources.georgios },
      { label: "研究主线", value: "三维人体理解、人体重建与生成建模，以及视觉、图形学、具身感知和机器人学习的交叉研究。", source: sources.georgiosHome },
      { label: "教育与学术训练", value: "UT 官方简介明确写明 Penn 博士导师为 Kostas Daniilidis。", source: sources.georgios },
      { label: "博士后", value: "在 Berkeley 博士后阶段由 Angjoo Kanazawa 与 Jitendra Malik 指导。", source: sources.georgios },
      { label: "产业连接", value: "官方简介记录其曾在 Facebook Reality Labs 开展研究。", source: sources.georgios },
      { label: "研究影响", value: "博士论文获 Penn 计算机最佳论文奖，ICCV 2025 工作获 Best Student Paper Honorable Mention。", source: sources.georgios },
    ], portraitFile: "georgios-pavlakos.jpg", portraitSource: sources.georgios, personSources: [sources.georgios, sources.georgiosHome],
  }),
  person({
    id: "inderjit-dhillon-ut-austin", name: "Inderjit Dhillon", role: "Professor · Director, Center for Big Data Analytics", stage: "senior", x: 345, y: 300,
    area: "Large-Scale Machine Learning · Optimization · Data Mining", tags: ["大规模机器学习", "优化", "数据挖掘", "产业研究"],
    summary: "长期研究可扩展机器学习、线性代数与大数据分析，并连接 UT Austin、Google 与 Amazon 研究管理。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机与数学教授、Center for Big Data Analytics 主任；目前离校在 Google 任 Distinguished Scientist。", source: sources.inderjitBio },
      { label: "研究主线", value: "机器学习、大规模数据分析、生物信息学、网络分析、线性代数与优化。", source: sources.inderjit },
      { label: "教育与学术训练", value: "获 IIT Bombay 计算机 B.Tech、UC Berkeley 计算机博士；本人 CV 列 Beresford N. Parlett 与 James W. Demmel 为博士导师。", source: sources.inderjitCv },
      { label: "产业轨迹", value: "此前任 Amazon Vice President and Distinguished Scientist，并领导 Amazon Research Lab Berkeley，团队方法用于 Amazon Search。", source: sources.inderjitBio },
      { label: "为什么值得关注", value: "他是学术算法研究向大型搜索系统和产业研究组织流动的关键节点。", source: sources.inderjitBio },
    ], portraitFile: "inderjit-dhillon.jpg", portraitSource: sources.inderjit, personSources: [sources.inderjit, sources.inderjitBio, sources.inderjitCv],
  }),
  person({
    id: "joydeep-biswas-ut-austin", name: "Joydeep Biswas", role: "Associate Professor of Computer Science", stage: "senior", x: 495, y: 300,
    area: "Long-Term Robot Autonomy · Perception · Planning", tags: ["长期自主", "机器人感知", "规划", "共享自主"],
    summary: "面向校园到城市尺度的长期自主移动机器人，研究感知、规划、故障恢复和人机共享自主。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系副教授，领导 Autonomous Mobile Robotics Laboratory。", source: sources.joydeep },
      { label: "研究主线", value: "长期自主、机器感知、规划、故障恢复与人机共享自主。", source: sources.joydeep },
      { label: "教育与学术训练", value: "2014 年获 Carnegie Mellon Robotics 博士；此前获 IIT Bombay Engineering Physics 学士。", source: sources.joydeep },
      { label: "职业轨迹", value: "加入 UT 前任 UMass Amherst Assistant Professor。", source: sources.joydeep },
    ], portraitFile: "joydeep-biswas.jpg", portraitSource: sources.joydeep, personSources: [sources.joydeep, sources.joydeepHome],
  }),
  person({
    id: "kevin-tian-ut-austin", name: "Kevin Tian", role: "Assistant Professor of Computer Science", stage: "emerging", x: 645, y: 300,
    area: "Optimization · Sampling · High-Dimensional Statistics · Trustworthy ML", tags: ["优化", "采样", "高维统计", "可信 ML"],
    summary: "研究现代数据科学的连续优化、采样和高维统计基础，并延伸到鲁棒性、隐私与公平。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系助理教授。", source: sources.kevin },
      { label: "研究主线", value: "连续优化、采样与高维统计基础，并延伸到机器学习的鲁棒性、隐私与公平。", source: sources.kevin },
      { label: "教育与学术训练", value: "本人主页明确写明 Stanford 计算机博士由 Aaron Sidford 指导。", source: sources.kevinHome },
      { label: "产业研究", value: "2022–2023 年在 Microsoft Research Redmond 的 Machine Learning Foundations group 任博士后研究员。", source: sources.kevinHome },
      { label: "当前团队", value: "本人主页列出 postdoc、五位博士生及其共同导师，并持续更新团队成员。", source: sources.kevinHome },
    ], portraitFile: "kevin-tian.jpg", portraitSource: sources.kevin, personSources: [sources.kevin, sources.kevinHome],
  }),
  person({
    id: "matthew-lease-ut-austin", name: "Matthew Lease", role: "Professor", stage: "senior", x: 795, y: 300,
    area: "Information Retrieval · Human Computation · NLP", tags: ["信息检索", "众包", "NLP", "Human-AI"],
    summary: "围绕信息检索、众包质量控制和 human-AI hybrid systems 研究搜索体验与评测方法。",
    facts: [
      { label: "当前任职", value: "UT Austin School of Information 教授，并在 UTCS 官方名录列为 AI/NLP faculty researcher。", source: sources.matthew },
      { label: "研究主线", value: "信息检索、众包、人类计算、NLP，以及结合 AI 与人工判断的混合系统。", source: sources.matthew },
      { label: "教育与学术训练", value: "UT iSchool 官方简介列 Brown University 计算机博士（2010）与硕士（2004）、University of Washington 计算机学士（1999）。", source: sources.matthewProfile },
      { label: "研究团队", value: "领导 Artificial Intelligence and Human-Centered Computing Lab，并加入 Intelligent Systems Research Group。", source: sources.matthewHome },
      { label: "产业连接", value: "本人主页公开 Amazon Scholar 页面并参与 UT Austin–Amazon Science Hub advisory board。", source: sources.matthewHome },
    ], portraitFile: "matthew-lease.jpg", portraitSource: sources.matthew, personSources: [sources.matthew, sources.matthewHome, sources.matthewProfile],
  }),
  person({
    id: "noah-golowich-ut-austin", name: "Noah Golowich", role: "Assistant Professor of Computer Science", stage: "emerging", x: 270, y: 480,
    area: "Foundations of AI · Multi-Agent Learning · Reinforcement Learning · Game Theory", tags: ["AI 理论", "多智能体", "强化学习", "博弈论"],
    summary: "研究计算约束如何塑造现代 AI 算法工具箱，覆盖多智能体学习、强化学习和博弈论。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系助理教授。", source: sources.noah },
      { label: "研究主线", value: "现代 AI 的理论基础、多智能体学习、强化学习与博弈论，重点研究计算约束如何塑造可用算法。", source: sources.noahHome },
      { label: "教育与学术训练", value: "本人主页明确写明 MIT 博士由 Constantinos Daskalakis 与 Ankur Moitra 共同指导。", source: sources.noahHome },
      { label: "产业研究", value: "2025–2026 年在 Microsoft Research New York 任博士后研究员。", source: sources.noahHome },
      { label: "研究影响", value: "获 2025 AAAI/ACM SIGAI 与 SIGecom 博士论文奖、2026 EATCS 博士论文奖。", source: sources.noahHome },
    ], portraitFile: "noah-golowich.jpg", portraitSource: sources.noah, personSources: [sources.noah, sources.noahHome],
  }),
  person({
    id: "qixing-huang-ut-austin", name: "Qixing Huang", role: "Associate Professor of Computer Science", stage: "senior", x: 420, y: 480,
    area: "3D Vision · Graphics · Generative Models · Geometry Processing", tags: ["3D 视觉", "图形学", "生成模型", "几何处理"],
    summary: "在视觉、图形学和机器学习交叉点研究 3D 基础生成模型、几何先验与大规模三维数据。",
    facts: [
      { label: "当前任职", value: "UT Austin 计算机系副教授。", source: sources.qixing },
      { label: "研究主线", value: "3D 视觉、计算机图形学、生成模型与几何处理，重点研究三维基础生成模型和几何先验。", source: sources.qixing },
      { label: "教育与学术训练", value: "本人 CV 明确列 Stanford 博士导师为 Leonidas Guibas，并列清华硕士导师为胡事民。", source: sources.qixingCv },
      { label: "硕士师承", value: "本人 CV 明确列清华硕士导师为胡事民。", source: sources.qixingCv },
      { label: "当前团队", value: "本人组页列出 Haibo Liu 以及多位博士生，并明确部分学生与 Atlas Wang、Georgios Pavlakos 等共同指导。", source: sources.qixingGroup },
      { label: "产业轨迹", value: "CV 记录其长期为 XYZRGB 提供咨询，并曾在 Google 与 Adobe Research 实习。", source: sources.qixingCv },
    ], portraitFile: "qixing-huang.jpg", portraitSource: sources.qixing, personSources: [sources.qixing, sources.qixingCv, sources.qixingGroup],
  }),
  person({
    id: "sanjay-shakkottai-ut-austin", name: "Sanjay Shakkottai", role: "Professor · Director, Center for Generative AI", stage: "senior", x: 570, y: 480,
    area: "Generative AI · Diffusion Models · Language Models · Networked Decision Making", tags: ["生成式 AI", "扩散模型", "语言模型", "网络决策"],
    summary: "领导 UT Center for Generative AI，研究扩散模型、语言模型、图像编辑与网络化决策。",
    facts: [
      { label: "当前任职", value: "UT Austin ECE 与 CS 教授、Center for Generative AI 主任。", source: sources.sanjay },
      { label: "研究主线", value: "扩散模型与生成式 AI，应用覆盖语言模型、图像编辑和无线网络决策。", source: sources.sanjay },
      { label: "教育与学术训练", value: "2002 年获 UIUC ECE 博士。", source: sources.sanjay },
      { label: "为什么值得关注", value: "他把生成模型与网络系统、序列决策结合，是 UT 生成式 AI 平台的重要组织节点。", source: sources.sanjay },
    ], portraitFile: "sanjay-shakkottai.jpg", portraitSource: sources.sanjay, personSources: [sources.sanjay, sources.sanjayHome],
  }),
  person({
    id: "sujay-sanghavi-ut-austin", name: "Sujay Sanghavi", role: "Professor", stage: "senior", x: 720, y: 480,
    area: "Machine Learning · High-Dimensional Data · Networked Systems", tags: ["机器学习", "高维数据", "网络系统", "算法"],
    summary: "研究大规模网络与高维数据分析中的算法设计和评测，连接机器学习、优化理论与网络系统。",
    facts: [
      { label: "当前任职", value: "UT Austin ECE 教授，并在 UTCS 官方 ML faculty roster。", source: sources.sujay },
      { label: "研究主线", value: "大规模网络、高维数据分析及其算法设计和评测。", source: sources.sujay },
      { label: "教育与学术训练", value: "UIUC 博士、MIT 博士后；2009 年加入 UT Austin。", source: sources.sujay },
      { label: "为什么值得关注", value: "其研究在机器学习理论与大规模网络系统之间形成稳定交叉。", source: sources.sujayHome },
    ], portraitFile: "sujay-sanghavi.jpg", portraitSource: sources.sujay, personSources: [sources.sujay, sources.sujayHome],
  }),
  person({
    id: "yan-leng-ut-austin", name: "Yan Leng", role: "Assistant Professor · UT Machine Learning Lab Core Member", stage: "emerging", x: 870, y: 480,
    area: "Computational Social Science · Network Science · Interpretable ML · LLM Behavior", tags: ["计算社会科学", "网络科学", "可解释 ML", "LLM 行为"],
    summary: "以可解释深度学习和网络科学研究信息、影响与行为扩散，并系统分析 LLM 的人类式偏差与社会行为。",
    facts: [
      { label: "当前任职", value: "2020 年起任 UT Austin McCombs School 助理教授，并任 UTCS courtesy faculty、UT Machine Learning Lab core member。", source: sources.yanCv },
      { label: "研究主线", value: "网络上的可解释机器学习、社会影响与扩散、生成式 AI 的人本可解释性和 LLM 行为审计。", source: sources.yan },
      { label: "教育与学术训练", value: "2020 年获 MIT Media Lab Human Dynamics Group 博士；此前在 MIT 获计算机和交通工程双硕士。", source: sources.yanCv },
      { label: "产业与平台连接", value: "CV 记录 OpenAI Researcher Access Program 支持，并持续研究面向业务和社会科学的 agentic AI。", source: sources.yanCv },
    ], portraitFile: "yan-leng.jpg", portraitSource: sources.yan, personSources: [sources.yan, sources.yanCv],
  }),
];

const supportPerson = (
  id: string,
  name: string,
  role: string,
  institution: Person["institution"],
  actualInstitution: string | undefined,
  area: string,
  summary: string,
  evidence: Source,
  x: number,
): Person => ({
  id, name, role, institution, actualInstitution, region: "United States", area, tags: ["师承节点"], summary,
  stage: "senior", category: "adjacent", status: "supporting mentor node · relationship evidence only",
  sources: [evidence], x, y: 25, primary: false, lastVerifiedAt: checkedAt,
});

export const usRosterBatch2SupportingPeople: Person[] = [
  supportPerson("daniel-spielman-lineage", "Daniel Spielman", "Professor", "External", "Yale University", "Theoretical Computer Science", "Adam Klivans 的 MIT 博士论文导师。", sources.adamThesis, 110),
  supportPerson("mohit-bansal-lineage", "Mohit Bansal", "Professor", "UNC", undefined, "NLP · Multimodal AI", "Elias Stengel-Eskin 的 UNC 博士后导师。", sources.eliasHome, 250),
  supportPerson("kostas-daniilidis-lineage", "Kostas Daniilidis", "Professor", "Penn", undefined, "Computer Vision · Robotics", "Georgios Pavlakos 的 Penn 博士导师。", sources.georgios, 390),
  supportPerson("aaron-sidford-lineage", "Aaron Sidford", "Associate Professor", "Stanford", undefined, "Optimization · Algorithms", "Kevin Tian 的 Stanford 博士导师。", sources.kevinHome, 530),
  supportPerson("ankur-moitra-lineage", "Ankur Moitra", "Professor", "MIT", undefined, "Theoretical Machine Learning", "Noah Golowich 的 MIT 共同博士导师。", sources.noahHome, 670),
  supportPerson("beresford-parlett-lineage", "Beresford N. Parlett", "Professor Emeritus", "Berkeley", undefined, "Numerical Linear Algebra", "Inderjit Dhillon 本人 CV 列出的共同博士导师。", sources.inderjitCv, 810),
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: NonNullable<Relationship["subtype"]>,
  label: string,
  evidence: string,
  evidenceSource: Source,
): Relationship => ({ id, from, to, type: "lineage", subtype, label, evidence, source: evidenceSource, verified: true });

export const usRosterBatch2Relationships: Relationship[] = [
  lineage("us-roster-b2-spielman-klivans", "daniel-spielman-lineage", "adam-klivans-ut-austin", "phd_adviser", "博士导师", "Adam Klivans 的 MIT 博士论文页面明确列 Dan Spielman 为 thesis supervisor。", sources.adamThesis),
  lineage("us-roster-b2-pineau-amy-zhang", "joelle-pineau-ca", "amy-zhang-ut-austin", "co_adviser", "共同博士导师", "Amy Zhang 本人主页明确写明 McGill/Mila 博士由 Joëlle Pineau 与 Doina Precup 共同指导。", sources.amyHome),
  lineage("us-roster-b2-precup-amy-zhang", "doina-precup-ca", "amy-zhang-ut-austin", "co_adviser", "共同博士导师", "Amy Zhang 本人主页明确写明 McGill/Mila 博士由 Joëlle Pineau 与 Doina Precup 共同指导。", sources.amyHome),
  lineage("us-roster-b2-glass-harwath", "jim-glass-lineage", "david-harwath-ut-austin", "phd_adviser", "博士导师", "David Harwath 本人主页明确写明 MIT CSAIL 博士由 Jim Glass 指导。", sources.davidHome),
  lineage("us-roster-b2-vandurme-stengel", "benjamin-van-durme-us", "elias-stengel-eskin-ut-austin", "phd_adviser", "博士导师", "Elias Stengel-Eskin 本人主页明确写明 Johns Hopkins 计算机博士由 Benjamin Van Durme 指导。", sources.eliasHome),
  lineage("us-roster-b2-bansal-stengel", "mohit-bansal-lineage", "elias-stengel-eskin-ut-austin", "postdoc_mentor", "博士后指导", "Elias Stengel-Eskin 本人主页明确记录加入 UT 前在 UNC 与 Mohit Bansal 开展博士后研究。", sources.eliasHome),
  lineage("us-roster-b2-daniilidis-pavlakos", "kostas-daniilidis-lineage", "georgios-pavlakos-ut-austin", "phd_adviser", "博士导师", "UT 官方简介明确写明 Georgios Pavlakos 的 Penn 博士导师为 Kostas Daniilidis。", sources.georgios),
  lineage("us-roster-b2-kanazawa-pavlakos", "angjoo-kanazawa-us", "georgios-pavlakos-ut-austin", "postdoc_mentor", "博士后指导", "UT 官方简介明确写明 Georgios Pavlakos 在 Berkeley 博士后由 Angjoo Kanazawa 与 Jitendra Malik 指导。", sources.georgios),
  lineage("us-roster-b2-malik-pavlakos", "jitendra-malik-us", "georgios-pavlakos-ut-austin", "postdoc_mentor", "博士后指导", "UT 官方简介明确写明 Georgios Pavlakos 在 Berkeley 博士后由 Angjoo Kanazawa 与 Jitendra Malik 指导。", sources.georgios),
  lineage("us-roster-b2-sidford-tian", "aaron-sidford-lineage", "kevin-tian-ut-austin", "phd_adviser", "博士导师", "Kevin Tian 本人主页明确写明 Stanford 计算机博士由 Aaron Sidford 指导。", sources.kevinHome),
  lineage("us-roster-b2-daskalakis-golowich", "constantinos-daskalakis-award", "noah-golowich-ut-austin", "co_adviser", "共同博士导师", "Noah Golowich 本人主页明确写明 MIT 博士由 Constantinos Daskalakis 与 Ankur Moitra 共同指导。", sources.noahHome),
  lineage("us-roster-b2-moitra-golowich", "ankur-moitra-lineage", "noah-golowich-ut-austin", "co_adviser", "共同博士导师", "Noah Golowich 本人主页明确写明 MIT 博士由 Constantinos Daskalakis 与 Ankur Moitra 共同指导。", sources.noahHome),
  lineage("us-roster-b2-guibas-huang", "leonidas-guibas-lineage", "qixing-huang-ut-austin", "phd_adviser", "博士导师", "Qixing Huang 本人 CV 明确列 Stanford 博士导师为 Leonidas Guibas。", sources.qixingCv),
  lineage("us-roster-b2-parlett-dhillon", "beresford-parlett-lineage", "inderjit-dhillon-ut-austin", "co_adviser", "共同博士导师", "Inderjit Dhillon 本人 CV 列 Beresford N. Parlett 为其 UC Berkeley 博士导师之一。", sources.inderjitCv),
  lineage("us-roster-b2-demmel-dhillon", "james-demmel-lineage", "inderjit-dhillon-ut-austin", "co_adviser", "共同博士导师", "Inderjit Dhillon 本人 CV 列 James W. Demmel 为其 UC Berkeley 博士导师之一。", sources.inderjitCv),
  {
    id: "us-roster-b2-shakkottai-klivans-genai-center",
    from: "sanjay-shakkottai-ut-austin",
    to: "adam-klivans-ut-austin",
    type: "collaboration",
    subtype: "joint_project",
    label: "Center for Generative AI",
    evidence: "UT Machine Learning Laboratory 官方团队页列 Sanjay Shakkottai 为 Center for Generative AI 主任、Adam Klivans 为执行委员会成员。",
    source: sources.genAiCenter,
    verified: true,
  },
];

const member = (id: string, teacherId: string, name: string, role: string, memberSource: Source, focus?: string): GroupMember => ({
  id, teacherId, name, role, focus, source: memberSource,
});

export const usRosterBatch2GroupMembers: GroupMember[] = [
  member("us-roster-b2-klivans-stavropoulos", "adam-klivans-ut-austin", "Kostas Stavropoulos", "Current student", sources.adamHome, "Learning theory"),
  member("us-roster-b2-klivans-chandrasekaran", "adam-klivans-ut-austin", "Gautam Chandrasekaran", "Current student", sources.adamHome, "Learning theory"),
  member("us-roster-b2-klivans-shah", "adam-klivans-ut-austin", "Kulin Shah", "Current student", sources.adamHome, "Generative-model theory"),
  member("us-roster-b2-tian-gu", "kevin-tian-ut-austin", "Anming Gu", "Current PhD student", sources.kevinHome, "Optimization and sampling"),
  member("us-roster-b2-tian-kumar", "kevin-tian-ut-austin", "Syamantak Kumar", "Current PhD student · co-advised with Purnamrita Sarkar", sources.kevinHome, "High-dimensional statistics"),
  member("us-roster-b2-tian-yang", "kevin-tian-ut-austin", "Chutong Yang", "Current PhD student", sources.kevinHome, "Online learning and calibration"),
  member("us-roster-b2-tian-zhu", "kevin-tian-ut-austin", "Yusong Zhu", "Current PhD student · co-advised with Eric Price", sources.kevinHome, "Private and robust learning"),
  member("us-roster-b2-huang-liyan-chen", "qixing-huang-ut-austin", "Liyan Chen", "Current PhD student", sources.qixingGroup, "3D vision and graphics"),
  member("us-roster-b2-huang-yuezhi-yang", "qixing-huang-ut-austin", "Yuezhi Yang", "Current PhD student", sources.qixingGroup, "3D vision and graphics"),
  member("us-roster-b2-huang-yuehao-wang", "qixing-huang-ut-austin", "Yuehao Wang", "Current PhD student · co-supervised with Atlas Wang", sources.qixingGroup, "3D generative models"),
  member("us-roster-b2-huang-zhiqiang-luo", "qixing-huang-ut-austin", "Zhiqiang Luo", "Current PhD student · co-advised with Etienne Vouga", sources.qixingGroup, "Geometry processing"),
];

export const usRosterBatch2Portraits: Record<string, NonNullable<Person["portrait"]>> = Object.fromEntries(
  usRosterBatch2People.map((entry) => [entry.id, entry.portrait!]),
);

export const people = [...usRosterBatch2People, ...usRosterBatch2SupportingPeople];
export const relationships = usRosterBatch2Relationships;
export const groupMembers = usRosterBatch2GroupMembers;
