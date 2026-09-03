import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });
const official = (label: string, url: string, supports = "Current appointment, research areas, biography and official portrait") => source(label, url, "official", supports);
const profile = (label: string, url: string, supports: string) => source(label, url, "profile", supports);
const cv = (label: string, url: string, supports: string) => source(label, url, "cv", supports);
const thesis = (label: string, url: string, supports: string) => source(label, url, "thesis", supports);

const s = {
  byron: official("UW Allen School · Byron Boots", "https://www.cs.washington.edu/people/faculty/byron-boots/"),
  byronThesis: thesis("Byron Boots · CMU dissertation", "https://homes.cs.washington.edu/~bboots/files/BootsThesis.pdf", "PhD thesis committee with Geoffrey Gordon as chair"),
  ira: official("UW Allen School · Ira Kemelmacher-Shlizerman", "https://www.cs.washington.edu/people/faculty/ira-kemelmacher-shlizerman/"),
  iraCv: cv("Ira Kemelmacher-Shlizerman · CV", "https://homes.cs.washington.edu/~kemelmi/Ira_CV.pdf", "Education, UW/Google/Facebook employment and Dreambit founding"),
  iraGoogle: official("Google Research · Ira Kemelmacher-Shlizerman", "https://research.google/people/irakemelmachershlizerman/", "Google Distinguished Scientist role and generative-AI leadership"),
  iraAdvisor: profile("LDV Vision Summit · Ira Kemelmacher-Shlizerman interview", "https://www.ldv.co/blog/2018/1/11/how-professor-ira-kemelmacher-shlizerman-built-dreambit-sold-it-to-facebook", "First-person account naming Ronen Basri as PhD adviser and Steve Seitz as postdoctoral mentor"),
  maya: official("UW Allen School · Maya Cakmak", "https://www.cs.washington.edu/people/faculty/maya-cakmak/", "Current professorship, HCR Lab, research, education and advisers"),
  mayaLab: profile("UW Human-Centered Robotics Lab", "https://hcrlab.cs.washington.edu/", "Current lab programme, people and human-centered robotics projects"),
  natasha: official("UW Allen School · Natasha Jaques", "https://www.cs.washington.edu/people/faculty/natasha-jaques/"),
  natashaHome: profile("Natasha Jaques · homepage", "https://natashajaques.ai/", "Social RL Lab, Google DeepMind role, research and education"),
  natashaCv: cv("Natasha Jaques · CV", "https://natashajaques.ai/uploads/cv_natasha_jaques.pdf", "PhD adviser Rosalind Picard, Berkeley postdoc mentor Sergey Levine and industry history"),
  pang: official("UW Allen School · Pang Wei Koh", "https://www.cs.washington.edu/people/faculty/pang-wei-koh/"),
  pangHome: profile("Pang Wei Koh · homepage", "https://koh.pw/", "Stanford adviser Percy Liang, UW group roster, Microsoft AI role and alumni destinations"),
  simon: official("UW Allen School · Simon Shaolei Du", "https://www.cs.washington.edu/people/faculty/simon-du/"),
  simonCv: cv("Simon Shaolei Du · CV", "https://www.simonshaoleidu.com/Simon_Du_CV.pdf", "Education, advisers Aarti Singh and Barnabás Póczos, research and industry research experience"),
  suin: official("UW Allen School · Su-In Lee", "https://www.cs.washington.edu/people/faculty/su-in-lee/"),
  suinHome: profile("AIMS Lab · Su-In Lee", "https://suinlee.cs.washington.edu/su-in-lee", "Current endowed professorship, program leadership, Stanford PhD adviser and explainable-AI programme"),
  seitz: official("UW Allen School · Steven Seitz", "https://www.cs.washington.edu/people/faculty/steven-seitz/"),
  seitzCv: cv("Steven M. Seitz · extended CV", "https://homes.cs.washington.edu/~seitz/resumeExt.pdf", "Education, student and postdoc roster, alumni destinations and Google employment"),
  alex: official("UIUC Siebel School · Alexander Schwing", "https://siebelschool.illinois.edu/about/people/all-faculty/aschwing"),
  alexHome: profile("Alexander Schwing · homepage", "https://www.alexander-schwing.de/", "Current appointment, vision/ML programme, ETH doctoral collaborators and Toronto postdoc"),
  rehg: official("UIUC Siebel School · Jim Rehg", "https://siebelschool.illinois.edu/about/people/all-faculty/jrehg"),
  rehgHome: profile("James M. Rehg · lab", "https://rehg.org/", "Current professorship, lab roster, research programme and alumni destinations"),
  gagandeep: official("UIUC Siebel School · Gagandeep Singh", "https://siebelschool.illinois.edu/about/people/all-faculty/ggnds"),
  gagandeepHome: profile("FOCAL Lab · Gagandeep Singh", "https://ggndpsngh.github.io/", "Current lab, research agenda, PhD advisers and recruiting status"),
  huan: official("UIUC Siebel School · Huan Zhang", "https://siebelschool.illinois.edu/about/people/all-faculty/huanz"),
  huanHome: profile("Huan Zhang · homepage", "https://www.huan-zhang.com/index.html", "Trustworthy-AI programme, UCLA PhD adviser, CMU postdoc mentor and openings"),
  yuxiong: official("UIUC Grainger · Yuxiong Wang", "https://grainger.illinois.edu/about/directory/faculty/yxw"),
  yuxiongHome: profile("Yuxiong Wang · homepage", "https://yxw.cs.illinois.edu/", "Current appointment, research programme, PhD adviser and group roster"),
  jiaxuan: official("UIUC Siebel School · Jiaxuan You", "https://siebelschool.illinois.edu/about/people/all-faculty/jiaxuan"),
  jiaxuanHome: profile("Jiaxuan You · homepage", "https://cs.stanford.edu/people/jiaxuan/", "Current U Lab, Stanford training, Kumo AI/NVIDIA roles and recruiting"),
  jiaxuanAdvisor: official("UIUC iSchool · Jiaxuan You presentation", "https://ischool.illinois.edu/news-events/events/2023/03/08/jiaxuan-you-presentation", "Official biography explicitly naming Jure Leskovec as PhD adviser"),
  hanzhao: official("UIUC Siebel School · Han Zhao", "https://siebelschool.illinois.edu/about/people/faculty/hanzhao"),
  hanzhaoHome: profile("Han Zhao · homepage", "https://hanzhaoml.github.io/", "Current appointment, trustworthy-ML programme, Amazon Scholar role, current group and alumni destinations"),
  hanzhaoCv: cv("Han Zhao · CV", "https://hanzhaoml.github.io/files/hanzhao_cv.pdf", "CMU PhD adviser Geoffrey Gordon, Waterloo adviser Pascal Poupart and academic/industry trajectory"),
};

type Seed = {
  id: string; name: string; chinese?: string; role: string; institution: "UW" | "UIUC"; area: string; tags: string[];
  summary: string; facts: NonNullable<Person["facts"]>; sources: Source[]; portraitFile: string;
  portraitSource: Source; stage: Person["stage"]; x: number; y: number;
};

const person = (p: Seed): Person => ({
  id: p.id, name: p.name, chinese: p.chinese, role: p.role, institution: p.institution, region: "United States", area: p.area,
  tags: p.tags, summary: p.summary, facts: p.facts, stage: p.stage, category: "core",
  status: `current independent PI · ${p.institution} official roster verified`, sources: p.sources,
  x: p.x, y: p.y, primary: true, introducedAt: checkedAt, lastVerifiedAt: checkedAt,
  portrait: { src: `portraits/us-uw-uiuc-2026/${p.portraitFile}`, alt: `${p.name} 官方头像`, source: p.portraitSource },
});

export const usUwUiucRosterPeople: Person[] = [
  person({ id: "byron-boots-uw", name: "Byron Boots", role: "Amazon Professor of Machine Learning", institution: "UW", stage: "senior", x: 110, y: 120, portraitFile: "byron-boots.jpg", portraitSource: s.byron,
    area: "Robot Learning · Reinforcement Learning · Perception and Control", tags: ["机器人学习", "强化学习", "NVIDIA Research", "UW Robot Learning Lab"],
    summary: "UW Robot Learning Lab 负责人，把机器学习理论、视觉、强化学习与真实机器人控制连接起来，同时任 NVIDIA Research Principal Research Scientist。",
    facts: [
      { label: "当前任职", value: "UW Amazon Professor of Machine Learning、Robot Learning Lab 主任，并任 NVIDIA Seattle Robotics Lab Principal Research Scientist。", source: s.byron },
      { label: "研究主线", value: "机器学习、人工智能与机器人，重点整合感知、学习和控制。", source: s.byron },
      { label: "教育与学术训练", value: "CMU 博士论文委员会由 Geoffrey J. Gordon 任 Chair。", source: s.byronThesis },
      { label: "职业轨迹", value: "Georgia Tech faculty 之后加入 UW；更早曾在 Dieter Fox 的 UW RSE Lab 做博士后。", source: s.byron },
    ], sources: [s.byron, s.byronThesis] }),
  person({ id: "ira-kemelmacher-shlizerman-uw", name: "Ira Kemelmacher-Shlizerman", role: "Professor · Google Distinguished Scientist", institution: "UW", stage: "senior", x: 250, y: 120, portraitFile: "ira-kemelmacher-shlizerman.jpg", portraitSource: s.ira,
    area: "Computer Vision · Generative AI · Human Modeling", tags: ["计算机视觉", "生成式 AI", "Google", "Dreambit"],
    summary: "连接 UW 视觉研究、Google 生成式 AI 与创业并购的产业型资深 PI，长期研究人物建模、虚拟试穿和计算摄影。",
    facts: [
      { label: "当前任职", value: "UW 计算机教授；Google Research 页面列为 Distinguished Scientist、Gen AI for Google Shopping 负责人。", source: s.iraGoogle },
      { label: "研究主线", value: "计算机视觉、图形学、人物外观建模、生成式视觉与虚拟试穿。", source: s.ira },
      { label: "产业与创业", value: "CV 记录其创办 Dreambit（后被 Facebook 收购），并先后在 Facebook 与 Google 任研究职务。", source: s.iraCv },
      { label: "教育与学术训练", value: "本人访谈明确称 Ronen Basri 为博士导师，并在 UW 跟随 Steve Seitz 做博士后。", source: s.iraAdvisor },
    ], sources: [s.ira, s.iraCv, s.iraGoogle, s.iraAdvisor] }),
  person({ id: "maya-cakmak-uw", name: "Maya Cakmak", role: "Robert E. Dinning Professor", institution: "UW", stage: "senior", x: 390, y: 120, portraitFile: "maya-cakmak.jpg", portraitSource: s.maya,
    area: "Human-Robot Interaction · Assistive Robotics · End-User Programming", tags: ["人机交互", "辅助机器人", "机器人编程", "HCR Lab"],
    summary: "UW Human-Centered Robotics Lab 负责人，研究如何让非专家和残障用户安全、直观地教会与控制机器人。",
    facts: [
      { label: "当前任职", value: "UW Robert E. Dinning Professor，领导 Human-Centered Robotics Lab。", source: s.maya },
      { label: "研究主线", value: "人机交互、终端用户编程与辅助机器人。", source: s.maya },
      { label: "教育与学术训练", value: "Georgia Tech Robotics 博士，官方简介明确列 Andrea L. Thomaz 为导师。", source: s.maya },
      { label: "博士后", value: "毕业后在 Willow Garage 与 Leila Takayama 开展一年博士后研究。", source: s.maya },
      { label: "当前团队", value: "Human-Centered Robotics Lab 主页公开当前成员及人本机器人项目。", source: s.mayaLab },
    ], sources: [s.maya, s.mayaLab] }),
  person({ id: "natasha-jaques-uw", name: "Natasha Jaques", role: "Assistant Professor · Google DeepMind Senior Research Scientist", institution: "UW", stage: "emerging", x: 530, y: 120, portraitFile: "natasha-jaques.jpg", portraitSource: s.natasha,
    area: "Social Reinforcement Learning · Multi-Agent Learning · Human-AI Interaction", tags: ["Social RL", "多智能体", "Human-AI", "Google DeepMind"],
    summary: "以社会学习和多智能体协调为核心，连接 UW Social RL Lab、Google DeepMind 与人类反馈强化学习。",
    facts: [
      { label: "当前任职", value: "UW 助理教授、Social RL Lab 负责人，同时任 Google DeepMind Senior Research Scientist。", source: s.natashaHome },
      { label: "研究主线", value: "社会强化学习、多智能体协调、泛化与 human-AI interaction。", source: s.natashaHome },
      { label: "教育与学术训练", value: "MIT Media Lab 博士；本人 CV 明确列 Rosalind Picard 为导师。", source: s.natashaCv },
      { label: "职业轨迹", value: "曾在 Sergey Levine 组做 Berkeley 访问博士后，并任 Google Brain Senior Research Scientist。", source: s.natashaCv },
    ], sources: [s.natasha, s.natashaHome, s.natashaCv] }),
  person({ id: "pang-wei-koh-uw", name: "Pang Wei Koh", role: "Assistant Professor · Microsoft AI MTS", institution: "UW", stage: "emerging", x: 670, y: 120, portraitFile: "pang-wei-koh.jpg", portraitSource: s.pang,
    area: "Reliable AI · Foundation Models · AI for Science", tags: ["可靠 AI", "基础模型", "AI4Science", "Microsoft AI"],
    summary: "研究真实世界可靠 AI、科学发现和医疗应用，公开团队页同时给出学生、共同指导与 Anthropic、Meta 等校友去向。",
    facts: [
      { label: "当前任职", value: "UW 助理教授，同时任 Microsoft AI Member of Technical Staff。", source: s.pangHome },
      { label: "研究主线", value: "面向科学与医疗的有用、负责、可靠 AI。", source: s.pangHome },
      { label: "教育与学术训练", value: "本人主页明确写明 Stanford 计算机博士由 Percy Liang 指导。", source: s.pangHome },
      { label: "人才流动", value: "公开校友名单含 Anthropic、Meta、Nuro、Codesignal、Stanford 与 Princeton 等去向。", source: s.pangHome },
    ], sources: [s.pang, s.pangHome] }),
  person({ id: "simon-shaolei-du-uw", name: "Simon Shaolei Du", role: "Associate Professor", institution: "UW", stage: "senior", x: 810, y: 120, portraitFile: "simon-shaolei-du.jpg", portraitSource: s.simon,
    area: "Foundations of Machine Learning · Deep Learning Theory · Reinforcement Learning", tags: ["机器学习理论", "深度学习理论", "强化学习", "优化"],
    summary: "聚焦深度学习与强化学习的理论基础，把优化、表示学习和统计问题连接到现代大模型与决策系统。",
    facts: [
      { label: "当前任职", value: "UW Paul G. Allen School 副教授。", source: s.simon },
      { label: "研究主线", value: "理论机器学习、深度学习理论、非凸优化与强化学习。", source: s.simonCv },
      { label: "教育与学术训练", value: "CMU Machine Learning 博士；CV 明确列 Aarti Singh 与 Barnabás Póczos 为导师。", source: s.simonCv },
      { label: "产业研究", value: "CV 记录在 Microsoft 与 Facebook/Meta 研究实验室的经历。", source: s.simonCv },
    ], sources: [s.simon, s.simonCv] }),
  person({ id: "su-in-lee-uw", name: "Su-In Lee", role: "Boeing Endowed Professor", institution: "UW", stage: "senior", x: 320, y: 300, portraitFile: "su-in-lee.jpg", portraitSource: s.suin,
    area: "Explainable AI · Computational Biology · AI for Medicine", tags: ["可解释 AI", "计算生物", "医疗 AI", "AIMS Lab"],
    summary: "可解释 AI 与生物医学交叉的资深 PI，兼任 UW Computational Molecular Biology Program 主任。",
    facts: [
      { label: "当前任职", value: "UW Boeing Endowed Professor、Computational Molecular Biology Program 主任。", source: s.suinHome },
      { label: "研究主线", value: "可解释人工智能及其在生物学、衰老与医学中的应用。", source: s.suinHome },
      { label: "教育与学术训练", value: "2009 年获 Stanford MS/PhD；AIMS Lab 页面明确列 Daphne Koller 为导师。", source: s.suinHome },
      { label: "职业轨迹", value: "在 CMU 任 Visiting Assistant Professor 后于 2010 年加入 UW。", source: s.suinHome },
    ], sources: [s.suin, s.suinHome] }),
  person({ id: "steven-seitz-uw", name: "Steven Seitz", role: "Professor · Google Distinguished Engineer", institution: "UW", stage: "senior", x: 500, y: 300, portraitFile: "steven-seitz.jpg", portraitSource: s.seitz,
    area: "Computer Vision · 3D Reconstruction · Computational Photography", tags: ["计算机视觉", "3D 重建", "计算摄影", "Google"],
    summary: "三维视觉和计算摄影资深 PI，长期连接 UW、CMU 与 Google，并在扩展 CV 中公开学生与博士后去向。",
    facts: [
      { label: "当前任职", value: "UW 计算机教授；官方与个人资料记录其 Google 研究任职。", source: s.seitz },
      { label: "研究主线", value: "计算机视觉、图形学、三维重建、图像式渲染与计算摄影。", source: s.seitz },
      { label: "教育与学术训练", value: "Wisconsin–Madison 博士；曾任 CMU Robotics/CS faculty，后加入 UW。", source: s.seitzCv },
      { label: "人才网络", value: "扩展 CV 按博士生、博士后和论文委员会成员记录大量学术与工业去向。", source: s.seitzCv },
    ], sources: [s.seitz, s.seitzCv] }),
  person({ id: "alexander-schwing-uiuc", name: "Alexander Schwing", role: "Associate Professor of ECE", institution: "UIUC", stage: "senior", x: 1040, y: 120, portraitFile: "alexander-schwing.jpg", portraitSource: s.alex,
    area: "Computer Vision · Machine Learning · Multimodal Learning", tags: ["计算机视觉", "机器学习", "多模态", "生成模型"],
    summary: "UIUC 视觉与机器学习 PI，研究结构化预测、视频理解、生成模型和多模态学习。",
    facts: [
      { label: "当前任职", value: "UIUC ECE 副教授，并隶属 CSL 与 Siebel School。", source: s.alexHome },
      { label: "研究主线", value: "计算机视觉、机器学习、结构化预测、视频与多模态生成。", source: s.alexHome },
      { label: "教育与学术训练", value: "在 ETH Zurich Computer Vision and Geometry Group 完成博士，主页明确记录与 Marc Pollefeys、Tamir Hazan、Raquel Urtasun 工作。", source: s.alexHome },
      { label: "博士后", value: "在 Toronto Machine Learning Group 与 Raquel Urtasun、Rich Zemel、Ruslan Salakhutdinov 合作。", source: s.alexHome },
    ], sources: [s.alex, s.alexHome] }),
  person({ id: "jim-rehg-uiuc", name: "Jim Rehg", role: "Founder Professor · HCESC Director", institution: "UIUC", stage: "senior", x: 1180, y: 120, portraitFile: "jim-rehg.jpg", portraitSource: s.rehg,
    area: "Computer Vision · Multimodal Foundation Models · AI for Health", tags: ["计算机视觉", "多模态", "医疗 AI", "Ego4D"],
    summary: "连接视觉、行为理解、移动健康和多模态基础模型的资深 PI，领导 UIUC Health Care Engineering Systems Center。",
    facts: [
      { label: "当前任职", value: "UIUC Founder Professor，并任 Health Care Engineering Systems Center 主任。", source: s.rehgHome },
      { label: "研究主线", value: "人本计算机视觉、行为与健康、机器人、多模态基础模型和 Ego4D。", source: s.rehgHome },
      { label: "教育与学术训练", value: "1995 年获 CMU 博士；曾管理 DEC/Compaq Cambridge Research Lab 视觉组，后任 Georgia Tech 教授。", source: s.rehgHome },
      { label: "人才流动", value: "公开实验室页列出校友进入 Google、Amazon、Meta、Dolby、UC Berkeley 等去向。", source: s.rehgHome },
    ], sources: [s.rehg, s.rehgHome] }),
  person({ id: "gagandeep-singh-uiuc", name: "Gagandeep Singh", role: "Assistant Professor · FOCAL Lab Director", institution: "UIUC", stage: "emerging", x: 1320, y: 120, portraitFile: "gagandeep-singh.jpg", portraitSource: s.gagandeep,
    area: "Trustworthy AI · Formal Verification · Mechanistic Interpretability", tags: ["可信 AI", "形式化验证", "可解释性", "AI Safety"],
    summary: "FOCAL Lab 负责人，以形式化方法研究 LLM/VLM/Agent 的验证、解释、对齐与安全。",
    facts: [
      { label: "当前任职", value: "UIUC Siebel School 助理教授，领导 FOCAL Lab。", source: s.gagandeepHome },
      { label: "研究主线", value: "LLM/VLM/Agent 形式化验证、机制可解释性、对齐、RLHF 与 AI 治理。", source: s.gagandeepHome },
      { label: "教育与学术训练", value: "2020 年获 ETH Zurich 博士；本人主页明确列 Markus Püschel 与 Martin Vechev。", source: s.gagandeepHome },
      { label: "团队与资助", value: "FOCAL Lab 页面列出 NSF、Amazon、Google、Qualcomm、Anthropic 等支持。", source: s.gagandeepHome },
    ], sources: [s.gagandeep, s.gagandeepHome] }),
  person({ id: "huan-zhang-uiuc", name: "Huan Zhang", chinese: "张焕", role: "Assistant Professor of ECE", institution: "UIUC", stage: "emerging", x: 1460, y: 120, portraitFile: "huan-zhang.jpg", portraitSource: s.huan,
    area: "Trustworthy AI · Neural Network Verification · AI Safety", tags: ["可信 AI", "神经网络验证", "AI Safety", "Agentic AI"],
    summary: "围绕 α,β-CROWN 构建可扩展神经网络验证体系，并将形式化安全扩展到 LLM、VLM 和具身智能体。",
    facts: [
      { label: "当前任职", value: "UIUC ECE 助理教授，并隶属 Siebel School 与 CSL。", source: s.huanHome },
      { label: "研究主线", value: "可信 AI、神经网络形式验证、鲁棒性、LLM/VLM 与 agentic AI 安全。", source: s.huanHome },
      { label: "教育与学术训练", value: "2020 年获 UCLA 计算机博士；本人主页明确列 Cho-Jui Hsieh 为导师。", source: s.huanHome },
      { label: "博士后", value: "2021–2023 年在 CMU 与 Zico Kolter 开展博士后研究。", source: s.huanHome },
    ], sources: [s.huan, s.huanHome] }),
  person({ id: "yuxiong-wang-uiuc", name: "Yuxiong Wang", chinese: "王宇雄", role: "Assistant Professor", institution: "UIUC", stage: "emerging", x: 1110, y: 300, portraitFile: "yuxiong-wang.jpg", portraitSource: s.yuxiong,
    area: "Open-World Vision · Multimodal Learning · Agent Learning", tags: ["开放世界视觉", "多模态", "生成模型", "智能体学习"],
    summary: "研究开放世界感知、生成—判别统一学习和 agent learning，覆盖 3D/4D 视觉、机器人与自动驾驶。",
    facts: [
      { label: "当前任职", value: "UIUC 计算机助理教授与 NCSA Faculty Fellow。", source: s.yuxiongHome },
      { label: "研究主线", value: "开放世界感知、元学习、多模态、生成建模、机器人与 agent learning。", source: s.yuxiongHome },
      { label: "教育与学术训练", value: "CMU Robotics 博士；本人主页明确列 Martial Hebert 为导师。", source: s.yuxiongHome },
      { label: "当前团队", value: "主页公开列出十三位博士生，并持续招收博士、硕士、本科和访问学生。", source: s.yuxiongHome },
    ], sources: [s.yuxiong, s.yuxiongHome] }),
  person({ id: "jiaxuan-you-uiuc", name: "Jiaxuan You", chinese: "游佳轩", role: "Assistant Professor · U Lab Director", institution: "UIUC", stage: "emerging", x: 1250, y: 300, portraitFile: "jiaxuan-you.jpg", portraitSource: s.jiaxuan,
    area: "Graph Machine Learning · AI Agents · AI Systems", tags: ["图机器学习", "AI Agent", "关系数据", "NVIDIA"],
    summary: "以图学习与关系数据为基础构建 AI agents，职业路径连接 Stanford、Kumo AI、NVIDIA 与 UIUC U Lab。",
    facts: [
      { label: "当前任职", value: "UIUC Siebel School 助理教授，领导 U Lab。", source: s.jiaxuanHome },
      { label: "研究主线", value: "图机器学习、关系数据库上的预测系统、AI agents 与知识发现。", source: s.jiaxuanHome },
      { label: "教育与学术训练", value: "UIUC 官方活动简介明确写明其 Stanford 计算机博士由 Jure Leskovec 指导。", source: s.jiaxuanAdvisor },
      { label: "产业轨迹", value: "本人主页记录其为 Kumo AI 核心创始成员，并曾任 NVIDIA Senior Research Scientist 参与 LLM 预训练与后训练。", source: s.jiaxuanHome },
    ], sources: [s.jiaxuan, s.jiaxuanHome, s.jiaxuanAdvisor] }),
  person({ id: "han-zhao-uiuc", name: "Han Zhao", chinese: "赵晗", role: "Assistant Professor · Amazon Scholar", institution: "UIUC", stage: "emerging", x: 1390, y: 300, portraitFile: "han-zhao.jpg", portraitSource: s.hanzhao,
    area: "Trustworthy Machine Learning · Domain Generalization · Fairness", tags: ["可信 ML", "迁移学习", "公平性", "Amazon Scholar"],
    summary: "研究分布偏移、公平性和可解释概率模型，公开学生去向覆盖 OpenAI、Thinking Machines Lab、Google Research 与 Google DeepMind。",
    facts: [
      { label: "当前任职", value: "UIUC 计算机助理教授、ECE affiliate，同时任 Amazon AI and Search Science Scholar。", source: s.hanzhaoHome },
      { label: "研究主线", value: "迁移学习、分布鲁棒、算法公平、概率电路及其在语言、视觉和量化金融中的应用。", source: s.hanzhaoHome },
      { label: "教育与学术训练", value: "本人 CV 明确列 Geoffrey Gordon 为 CMU Machine Learning 博士导师。", source: s.hanzhaoCv },
      { label: "人才流动", value: "公开校友列表记录 OpenAI、Thinking Machines Lab、Google Research、Google DeepMind、Microsoft、NVIDIA 等去向。", source: s.hanzhaoHome },
    ], sources: [s.hanzhao, s.hanzhaoHome, s.hanzhaoCv] }),
];

const mentor = (id: string, name: string, institution: Person["institution"], region: Person["region"], area: string, src: Source, x: number): Person => ({
  id, name, role: "Academic adviser / research mentor", institution, region, area, tags: ["师承上游"],
  summary: "本批一手资料明确记录的学术训练上游节点。", stage: "historical", category: "historical",
  sources: [src], x, y: 520, lastVerifiedAt: checkedAt,
});

export const usUwUiucRosterMentors: Person[] = [
  mentor("uw-uiuc-andrea-thomaz-mentor", "Andrea L. Thomaz", "External", "United States", "Human-Robot Interaction", s.maya, 80),
  mentor("uw-uiuc-rosalind-picard-mentor", "Rosalind Picard", "MIT", "United States", "Affective Computing", s.natashaCv, 180),
  mentor("uw-uiuc-aarti-singh-mentor", "Aarti Singh", "CMU", "United States", "Machine Learning Theory", s.simonCv, 280),
  mentor("uw-uiuc-barnabas-poczos-mentor", "Barnabás Póczos", "CMU", "United States", "Machine Learning", s.simonCv, 380),
  mentor("uw-uiuc-daphne-koller-mentor", "Daphne Koller", "Stanford", "United States", "Machine Learning · Computational Biology", s.suinHome, 480),
  mentor("uw-uiuc-ronen-basri-mentor", "Ronen Basri", "External", "United States", "Computer Vision", s.iraAdvisor, 580),
  mentor("uw-uiuc-martin-vechev-mentor", "Martin Vechev", "ETH Zurich", "Europe", "Programming Languages · Trustworthy AI", s.gagandeepHome, 680),
  mentor("uw-uiuc-markus-pueschel-mentor", "Markus Püschel", "ETH Zurich", "Europe", "Computational Systems · Formal Methods", s.gagandeepHome, 780),
  mentor("uw-uiuc-cho-jui-hsieh-mentor", "Cho-Jui Hsieh", "UCLA", "United States", "Machine Learning", s.huanHome, 880),
  mentor("uw-uiuc-martial-hebert-mentor", "Martial Hebert", "CMU", "United States", "Computer Vision · Robotics", s.yuxiongHome, 980),
];

const relation = (id: string, from: string, to: string, label: string, subtype: NonNullable<Relationship["subtype"]>, src: Source, evidence: string): Relationship => ({
  id, from, to, type: subtype === "postdoc_mentor" ? "lineage" : "lineage", label, subtype, source: src, evidence, verified: true,
});

export const usUwUiucRosterRelationships: Relationship[] = [
  relation("uw-uiuc-gordon-boots", "geoffrey-gordon-lineage", "byron-boots-uw", "博士导师", "phd_adviser", s.byronThesis, "Byron Boots 的 CMU 博士论文将 Geoffrey J. Gordon 列为论文委员会 Chair。"),
  relation("uw-uiuc-basri-ira", "uw-uiuc-ronen-basri-mentor", "ira-kemelmacher-shlizerman-uw", "博士导师", "phd_adviser", s.iraAdvisor, "Ira Kemelmacher-Shlizerman 在第一人称访谈中明确称 Ronen Basri 为其博士导师。"),
  relation("uw-uiuc-thomaz-cakmak", "uw-uiuc-andrea-thomaz-mentor", "maya-cakmak-uw", "博士导师", "phd_adviser", s.maya, "UW 官方简介明确写明 Maya Cakmak 在 Georgia Tech 博士阶段由 Andrea L. Thomaz 指导。"),
  relation("uw-uiuc-picard-jaques", "uw-uiuc-rosalind-picard-mentor", "natasha-jaques-uw", "博士导师", "phd_adviser", s.natashaCv, "Natasha Jaques 的本人 CV 明确列 Rosalind Picard 为 MIT 博士导师。"),
  relation("uw-uiuc-liang-koh", "percy-liang-us", "pang-wei-koh-uw", "博士导师", "phd_adviser", s.pangHome, "Pang Wei Koh 本人主页明确写明 Stanford 计算机博士由 Percy Liang 指导。"),
  relation("uw-uiuc-singh-du", "uw-uiuc-aarti-singh-mentor", "simon-shaolei-du-uw", "共同博士导师", "co_adviser", s.simonCv, "Simon Du 本人 CV 明确列 Aarti Singh 为 CMU 博士导师之一。"),
  relation("uw-uiuc-poczos-du", "uw-uiuc-barnabas-poczos-mentor", "simon-shaolei-du-uw", "共同博士导师", "co_adviser", s.simonCv, "Simon Du 本人 CV 明确列 Barnabás Póczos 为 CMU 博士导师之一。"),
  relation("uw-uiuc-koller-lee", "uw-uiuc-daphne-koller-mentor", "su-in-lee-uw", "博士导师", "phd_adviser", s.suinHome, "Su-In Lee 的 AIMS Lab 页面明确列 Daphne Koller 为 Stanford MS/PhD 导师。"),
  relation("uw-uiuc-pollefeys-schwing", "marc-pollefeys-eu", "alexander-schwing-uiuc", "博士阶段指导与合作", "other", s.alexHome, "Alexander Schwing 本人主页明确记录其在 ETH 博士阶段于 Marc Pollefeys 领导的 Computer Vision and Geometry Group 工作；页面同时列 Tamir Hazan 与 Raquel Urtasun，故不把 Marc 单独断言为唯一正式导师。"),
  relation("uw-uiuc-vechev-singh", "uw-uiuc-martin-vechev-mentor", "gagandeep-singh-uiuc", "共同博士导师", "co_adviser", s.gagandeepHome, "Gagandeep Singh 本人主页明确列 Martin Vechev 为 ETH 博士共同导师。"),
  relation("uw-uiuc-pueschel-singh", "uw-uiuc-markus-pueschel-mentor", "gagandeep-singh-uiuc", "共同博士导师", "co_adviser", s.gagandeepHome, "Gagandeep Singh 本人主页明确列 Markus Püschel 为 ETH 博士共同导师。"),
  relation("uw-uiuc-hsieh-zhang", "uw-uiuc-cho-jui-hsieh-mentor", "huan-zhang-uiuc", "博士导师", "phd_adviser", s.huanHome, "Huan Zhang 本人主页明确写明 UCLA 博士导师为 Cho-Jui Hsieh。"),
  relation("uw-uiuc-hebert-wang", "uw-uiuc-martial-hebert-mentor", "yuxiong-wang-uiuc", "博士导师", "phd_adviser", s.yuxiongHome, "Yuxiong Wang 本人主页明确写明 CMU Robotics 博士由 Martial Hebert 指导。"),
  relation("uw-uiuc-leskovec-you", "jure-leskovec-lineage", "jiaxuan-you-uiuc", "博士导师", "phd_adviser", s.jiaxuanAdvisor, "UIUC 官方活动简介明确写明 Jiaxuan You 的 Stanford 计算机博士导师为 Jure Leskovec。"),
  relation("uw-uiuc-gordon-zhao", "geoffrey-gordon-lineage", "han-zhao-uiuc", "博士导师", "phd_adviser", s.hanzhaoCv, "Han Zhao 本人 CV 明确列 Geoffrey Gordon 为 CMU Machine Learning 博士导师。"),
];

const member = (id: string, teacherId: string, name: string, role: string, focus: string, src: Source): GroupMember => ({ id, teacherId, name, role, focus, source: src });
export const usUwUiucRosterGroupMembers: GroupMember[] = [
  member("uw-uiuc-koh-scott-geng", "pang-wei-koh-uw", "Scott Geng", "PhD student", "Reliable and useful AI", s.pangHome),
  member("uw-uiuc-rehg-xiang-li", "jim-rehg-uiuc", "Xiang Li", "PhD student", "Computer vision and multimodal learning", s.rehgHome),
  member("uw-uiuc-wang-garvita-allabadi", "yuxiong-wang-uiuc", "Garvita Allabadi", "PhD student", "Open-world vision", s.yuxiongHome),
  member("uw-uiuc-zhao-si-qi-zeng", "han-zhao-uiuc", "Siqi (Cindy) Zeng", "PhD student · Anthropic Fellow", "Foundation-model merging", s.hanzhaoHome),
];

export const people = [...usUwUiucRosterPeople, ...usUwUiucRosterMentors];
export const relationships = usUwUiucRosterRelationships;
export const groupMembers = usUwUiucRosterGroupMembers;
