import type { Person, Source } from "./data";

const checkedAt = "2026-08-31";
const official = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });
const profile = (label: string, url: string, supports: string): Source => ({ label, url, kind: "profile", checkedAt, supports });

const toronto = official("University of Toronto CS faculty directory", "https://web.cs.toronto.edu/people/faculty-directory", "Current Toronto appointment and research area");
const vector = official("Vector Institute research team", "https://vectorinstitute.ai/research-talent/research-team/", "Current Vector research network affiliation");
const mila = official("Mila academic directory", "https://mila.quebec/en/directory?member-type=45", "Current Mila academic roster and affiliations");
const mcgill = official("McGill School of Computer Science people", "https://www.cs.mcgill.ca/people/", "Current McGill faculty roster");
const rlLab = official("McGill Reasoning and Learning Lab", "https://rl.cs.mcgill.ca/team/", "Lab faculty, students and alumni");

type Enhancement = Partial<Pick<Person, "role" | "summary" | "tags" | "facts" | "sources" | "status" | "stage" | "primary" | "lastVerifiedAt">>;
const e = (value: Omit<Enhancement, "lastVerifiedAt">): Enhancement => ({ ...value, lastVerifiedAt: checkedAt });

const hinton = profile("Geoffrey Hinton homepage", "https://www.cs.utoronto.ca/~hinton/", "Biography and explicit no-longer-recruiting notice");
const hintonCv = profile("Geoffrey Hinton CV", "https://www.cs.toronto.edu/~hinton/fullcv2024.pdf", "Education, appointments, Google and Vector chronology");
const hintonNobel = official("Nobel Prize · Geoffrey Hinton", "https://www.nobelprize.org/prizes/physics/2024/hinton/facts/", "2024 Nobel Prize and University of Toronto affiliation");
const fidler = profile("Sanja Fidler homepage", "https://www.cs.toronto.edu/~fidler/index.html", "Appointment, Vector/NVIDIA roles, research and recruiting notice");
const grosse = profile("Roger Grosse homepage", "https://www.cs.toronto.edu/~rgrosse/", "Appointment, Vector, Anthropic, research and fellowships");
const duvenaud = profile("David Duvenaud homepage", "https://www.cs.toronto.edu/~duvenaud/", "Appointment, training, current research, Anthropic sabbatical and recruiting status");
const duvenaudUoft = official("U of T Distinguished Lecture · David Duvenaud", "https://web.cs.toronto.edu/dls/archive", "Current rank, chairs, Vector role and AI-safety programme");
const jimmy = profile("Jimmy Ba homepage", "https://www.cs.utoronto.ca/~jba/", "Appointment, Hinton supervision, research, group and application guidance");
const boUhn = official("UHN Research · Bo Wang", "https://www.uhnresearch.ca/researcher/bo-wang", "UHN, Toronto and Vector appointments, Stanford PhD and research programme");
const zemel = profile("Richard Zemel homepage", "https://www.cs.columbia.edu/~zemel/", "Current Columbia role, ARNI, research, recruiting and Toronto/Vector history");
const zemelColumbia = official("Columbia Engineering · Richard Zemel", "https://www.engineering.columbia.edu/faculty-staff/directory/richard-zemel", "Columbia appointment since 2021 and prior Toronto/Vector roles");

const bengio = official("Mila · Yoshua Bengio", "https://mila.quebec/en/directory/yoshua-bengio", "Current UdeM/Mila roles, topics, honours and public student roster");
const bengioTransition = official("Mila scientific-direction transition", "https://mila.quebec/en/news/transition-in-milas-scientific-direction", "2025 transition to Founder and Scientific Advisor");
const hugo = official("Mila · Hugo Larochelle", "https://mila.quebec/en/directory/hugo-larochelle", "Current roles, training, research and industry trajectory");
const hugoAppointment = official("Mila appoints Hugo Larochelle", "https://mila.quebec/en/news/hugo-larochelle-becomes-the-new-scientific-director-of-mila", "2025 appointment, Bengio/Hinton training, Whetlab, Twitter and Google history");
const courville = official("Mila · Aaron Courville", "https://mila.quebec/en/directory/aaron-courville", "Current UdeM and IVADO roles, topics and public student roster");
const rish = official("Mila · Irina Rish", "https://mila.quebec/en/directory/irina-rish", "Current chair, Autonomous AI Lab, research and startup role");
const rishLab = official("Autonomous AI Lab", "https://aailab.ca/", "Lab leadership and research programme");
const tang = official("Mila · Jian Tang", "https://mila.quebec/en/directory/jian-tang", "Current UdeM/Mila roles, topics and public student roster");
const tangHome = profile("Jian Tang homepage", "https://jian-tang.com/", "Research programme, education and group");
const gidel = official("Mila · Gauthier Gidel", "https://mila.quebec/en/directory/gauthier-gidel", "Current affiliation, research topics and public student roster");
const gidelHome = profile("Gauthier Gidel homepage", "https://gauthiergidel.github.io/", "Research programme and academic trajectory");
const pal = official("Mila · Chris Pal", "https://mila.quebec/en/directory/chris-pal", "Current Polytechnique/UdeM/ServiceNow roles, research and students");
const palRecruit = official("Mila postdoctoral call · Charlin and Pal", "https://mila.quebec/en/news/call-for-application-postdoctoral-scholar-lcharlin-cpal", "Time-bounded 2024 postdoctoral call; not evidence of a current opening");

const precup = official("Mila · Doina Precup", "https://mila.quebec/en/directory/doina-precup", "Current McGill, Mila and Google DeepMind roles, topics and student roster");
const pineau = profile("Joëlle Pineau McGill homepage", "https://www.cs.mcgill.ca/~jpineau/", "Current leave and no-recruiting notice, education and 2017–2025 FAIR role");
const pineauMila = official("Mila · Joëlle Pineau", "https://mila.quebec/en/directory/joelle-pineau", "McGill/Mila affiliation and research topics");
const reddy = official("Mila · Siva Reddy", "https://mila.quebec/en/directory/siva-reddy", "Current joint McGill appointment, Stanford postdoc, topics and students");
const reddyHome = profile("Siva Reddy homepage", "https://www.sivareddy.in/", "Research programme, group and publications");
const cheung = official("Mila · Jackie Cheung", "https://mila.quebec/en/directory/jackie-cheung", "Current Mila/McGill/Microsoft roles, topics and students");
const cheungBio = profile("Jackie Cheung biographical sketch", "https://www.cs.mcgill.ca/~jcheung/bio.html", "Education, Gerald Penn supervision and academic history");
const rolnick = official("Mila · David Rolnick", "https://mila.quebec/en/directory/david-rolnick", "Current McGill/Mila roles and climate-AI research");
const rolnickHome = profile("David Rolnick homepage", "https://www.davidrolnick.com/", "Research programme, Climate Change AI and career history");

export const canadaEastPersonEnhancements: Record<string, Enhancement> = {
  "geoffrey-hinton-ca": e({
    summary: "多伦多深度学习谱系的奠基节点：多伦多大学荣休教授、Vector 首席科学顾问，2013–2023 年兼任 Google 研究领导；当前主页明确不再接收学生、博士后或访问者。",
    status: "emeritus / foundational · not recruiting", stage: "historical", primary: false,
    facts: [
      { label: "当前身份", value: "University Professor Emeritus · University of Toronto", source: hinton },
      { label: "职业轨迹", value: "CMU → U of T → UCL Gatsby → U of T；2013–2023 Google，2017– Vector 首席科学顾问", source: hintonCv },
      { label: "公开招生", value: "明确不再接收学生、博士后或访问者", source: hinton },
      { label: "重要荣誉", value: "2024 Nobel Prize in Physics", source: hintonNobel },
    ], sources: [hinton, hintonCv, hintonNobel, toronto],
  }),
  "sanja-fidler-ca": e({
    role: "Associate Professor · VP of AI Research, NVIDIA",
    summary: "U of T 视觉、三维与多模态方向核心 PI，Vector 联合创始学术成员，同时领导 NVIDIA Toronto AI Research；个人主页公开招收 MSc/PhD、访问学生和博士后。",
    status: "current PI · recruiting notice published",
    facts: [
      { label: "当前任职", value: "Associate Professor, University of Toronto · VP of AI Research, NVIDIA", source: fidler },
      { label: "研究组织", value: "Vector Institute co-founder and affiliated faculty", source: fidler },
      { label: "研究主题", value: "Computer vision + graphics、3D reconstruction/synthesis、interactive annotation", source: fidler },
      { label: "公开招生", value: "主页明确寻找 MSc/PhD、访问学生及博士后", source: fidler },
    ], sources: [fidler, toronto, vector],
  }),
  "roger-grosse-ca": e({
    role: "Associate Professor · Schwartz Reisman Chair · Anthropic MTS",
    summary: "多伦多大学与 Vector 的深度学习优化、训练动力学和 AI 对齐 PI；目前同时在 Anthropic Alignment Science 团队研究训练数据归因。",
    facts: [
      { label: "当前任职", value: "Associate Professor · Schwartz Reisman Chair, University of Toronto", source: grosse },
      { label: "产业研究", value: "Member of Technical Staff, Anthropic Alignment Science", source: grosse },
      { label: "研究主题", value: "Neural-net training dynamics、data attribution、alignment and unlearning", source: grosse },
    ], sources: [grosse, toronto, vector],
  }),
  "david-duvenaud-ca": e({
    role: "Associate Professor · Schwartz Reisman Chair",
    summary: "从概率深度学习与 Neural ODE 延伸到前沿模型危险能力评测、AI 治理和灾难性风险缓解；曾在 Anthropic Alignment Science 进行长期学术休假。",
    status: "current PI · not taking new students",
    facts: [
      { label: "当前任职", value: "Associate Professor, University of Toronto · founding Vector faculty", source: duvenaudUoft },
      { label: "教育师承", value: "Cambridge PhD，导师 Carl Rasmussen 与 Zoubin Ghahramani；Harvard 博后师从 Ryan Adams", source: duvenaud },
      { label: "研究转向", value: "AGI governance、dangerous-capability evaluation 与 catastrophic-risk mitigation", source: duvenaud },
      { label: "公开招生", value: "主页明确表示不接收新学生", source: duvenaud },
    ], sources: [duvenaud, duvenaudUoft, toronto],
  }),
  "jimmy-ba-ca": e({
    summary: "Geoffrey Hinton 博士生谱系中的多伦多独立 PI，研究高效深度学习、强化学习和通用问题求解；主页公开列出当前学生并指引申请者走院系招生流程。",
    facts: [
      { label: "当前任职", value: "Assistant Professor · Vector Faculty · Canada CIFAR AI Chair", source: jimmy },
      { label: "博士导师", value: "Geoffrey Hinton · University of Toronto", source: jimmy },
      { label: "研究主题", value: "Efficient learning algorithms、deep neural networks、reinforcement learning", source: jimmy },
      { label: "申请说明", value: "有兴趣的申请者应通过院系正式招生流程申请；不等同于逐年保证名额", source: jimmy },
    ], sources: [jimmy, toronto, vector],
  }),
  "bo-wang-toronto-ca": e({
    role: "Assistant Professor · Chief AI Scientist, UHN · Canada CIFAR AI Chair",
    summary: "连接 U of T、University Health Network 与 Vector 的医疗 AI PI，研究临床影像、病历 NLP、单细胞组学和个体化决策支持。",
    facts: [
      { label: "当前任职", value: "Chief AI Scientist, UHN；U of T Computer Science / Laboratory Medicine and Pathobiology 联合 tenure-track", source: boUhn },
      { label: "教育经历", value: "2017 Stanford Computer Science PhD", source: boUhn },
      { label: "研究主题", value: "Medical imaging、clinical-note NLP、single-cell genomics 与可解释预测模型", source: boUhn },
    ], sources: [boUhn, toronto, vector],
  }),
  "richard-zemel-ca": e({
    role: "Professor, Columbia · former U of T / Vector research director",
    summary: "这是加拿大谱系的历史节点，而非当前加拿大 PI：2021 年起任 Columbia 教授并领导 NSF ARNI；此前长期任教 U of T，并联合创办 Vector、担任首任研究主任。",
    status: "historical Canada node · current Columbia PI", stage: "historical", primary: false,
    facts: [
      { label: "当前任职", value: "Trianthe Dakolias Professor, Columbia University · Director, NSF ARNI", source: zemel },
      { label: "加拿大轨迹", value: "U of T faculty 2000–2021；Vector co-founder and inaugural research director", source: zemelColumbia },
      { label: "研究主题", value: "Reliable/controllable ML、multimodal learning、fairness、continual learning", source: zemel },
      { label: "公开招生", value: "Columbia 主页称通常每年招收 1–2 名博士生", source: zemel },
    ], sources: [zemel, zemelColumbia, vector],
  }),

  "yoshua-bengio-ca": e({
    role: "Full Professor · Mila Founder and Scientific Advisor",
    summary: "蒙特利尔深度学习与 Mila 的奠基节点；2025 年转任 Mila 创始人兼科学顾问，继续担任 UdeM 教授、核心学术成员和 Canada CIFAR AI Chair，并把研究重心扩展到 AI 安全。",
    facts: [
      { label: "当前任职", value: "Full Professor, Université de Montréal · Mila Founder and Scientific Advisor", source: bengio },
      { label: "角色变化", value: "2025 年由 Mila 科学主任转为 Founder and Scientific Advisor", source: bengioTransition },
      { label: "研究主题", value: "Deep learning、generative models、causality、GNN、NLP 与 AI safety", source: bengio },
      { label: "学生信息", value: "Mila 个人页公开当前学生与共同指导关系，可逐项核验", source: bengio },
    ], sources: [bengio, bengioTransition, mila],
  }),
  "hugo-larochelle-ca": e({
    role: "Scientific Director, Mila · Adjunct Professor",
    summary: "2025 年出任 Mila 科学主任；博士阶段师从 Yoshua Bengio、后在 Geoffrey Hinton 组做博士后，职业路径连接 Whetlab、Twitter Cortex、Google Montréal/DeepMind 与学术界。",
    facts: [
      { label: "当前任职", value: "Scientific Director, Mila；Adjunct Professor at UdeM and McGill", source: hugo },
      { label: "师承关系", value: "Yoshua Bengio 博士生；Geoffrey Hinton 博士后", source: hugoAppointment },
      { label: "产业轨迹", value: "Whetlab co-founder → Twitter Cortex → head of Google Montréal AI Research", source: hugoAppointment },
    ], sources: [hugo, hugoAppointment, mila],
  }),
  "aaron-courville-ca": e({
    summary: "Mila 创始学术成员、UdeM 教授与 IVADO 科学主任，研究生成模型、强化学习、多智能体和视觉；Mila 个人页提供可逐项核验的学生名录。",
    facts: [
      { label: "当前任职", value: "Full Professor, Université de Montréal · Scientific Director, IVADO", source: courville },
      { label: "研究主题", value: "Deep learning、generative models、reinforcement learning、multi-agent systems、vision", source: courville },
      { label: "学生信息", value: "Mila 个人页公开当前学生及共同指导关系", source: courville },
    ], sources: [courville, mila],
  }),
  "irina-rish-ca": e({
    summary: "UdeM Autonomous AI Lab 负责人和 Canada Excellence Research Chair，研究持续学习、基础模型、自主智能与计算神经科学，并有 IBM 研究与 Nolano.ai 创业经历。",
    facts: [
      { label: "当前任职", value: "Full Professor, UdeM · Canada Excellence Research Chair", source: rish },
      { label: "研究组织", value: "Founder and director, Autonomous AI Lab", source: rishLab },
      { label: "职业轨迹", value: "长期 IBM Research 经历；Nolano.ai co-founder", source: rish },
    ], sources: [rish, rishLab, mila],
  }),
  "jian-tang-ca": e({
    summary: "Mila 的图机器学习与 AI for Science PI，研究图神经网络、分子和材料建模、知识推理及基础模型，公开页面列出在读学生与合作指导关系。",
    facts: [
      { label: "当前任职", value: "Professor, Université de Montréal · Canada CIFAR AI Chair", source: tang },
      { label: "研究主题", value: "Graph ML、AI for science、drug discovery、foundation models", source: tang },
      { label: "研究组", value: "个人主页公开研究方向、成员与论文", source: tangHome },
    ], sources: [tang, tangHome, mila],
  }),
  "gauthier-gidel-ca": e({
    summary: "Mila 机器学习理论与优化新生代 PI，研究非凸优化、学习博弈、生成模型和 AI 安全；公开页面给出学生名录，但未发布常年招生承诺。",
    facts: [
      { label: "当前任职", value: "Assistant Professor, Université de Montréal · Mila Core Academic Member", source: gidel },
      { label: "研究主题", value: "Optimization、learning in games、generative models、AI safety", source: gidel },
      { label: "研究信息", value: "个人主页公开论文、教学和研究方向", source: gidelHome },
    ], sources: [gidel, gidelHome, mila],
  }),
  "christopher-pal-ca": e({
    role: "Full Professor · Canada CIFAR AI Chair · ServiceNow Distinguished Researcher",
    summary: "Polytechnique Montréal、UdeM 与 Mila 的资深生成式 AI/NLP PI，同时任 ServiceNow Distinguished Researcher；Mila 页面公开学生名录，2024 招聘信息仅作为历史岗位记录。",
    facts: [
      { label: "当前任职", value: "Full Professor, Polytechnique Montréal · Adjunct Professor, UdeM", source: pal },
      { label: "产业连接", value: "Distinguished Researcher, ServiceNow Research", source: pal },
      { label: "教育经历", value: "PhD in Computer Science, University of Waterloo", source: pal },
      { label: "招生说明", value: "2024 年曾公开招聘特定项目博士后；不代表当前仍有空缺", source: palRecruit },
    ], sources: [pal, palRecruit, mila],
  }),

  "doina-precup-ca": e({
    role: "Associate Professor · Research Team Leader, Google DeepMind",
    summary: "McGill 强化学习学派核心 PI，同时领导 Google DeepMind 研究团队；研究不确定性下的学习与规划、持续学习以及医疗等社会影响应用。",
    facts: [
      { label: "当前任职", value: "Associate Professor, McGill · Research Team Leader, Google DeepMind", source: precup },
      { label: "研究主题", value: "Reinforcement learning、planning under uncertainty、medical ML", source: precup },
      { label: "学生信息", value: "Mila 页面公开当前学生；RL Lab 页面公开部分毕业生去向", source: rlLab },
    ], sources: [precup, mcgill, rlLab],
  }),
  "joelle-pineau-ca": e({
    role: "Professor · Core Member, Mila (part-time leave)",
    summary: "McGill 强化学习、机器人与可复现机器学习资深 PI；2017–2025 年领导 Meta FAIR，当前处于 McGill part-time leave，个人主页明确不招收新研究生。",
    status: "on part-time leave · not recruiting",
    facts: [
      { label: "当前状态", value: "Professor, McGill · Mila core member · on part-time leave", source: pineau },
      { label: "产业轨迹", value: "Led Meta FAIR / VP AI Research, 2017–2025", source: pineau },
      { label: "教育经历", value: "Waterloo BASc；CMU MSc and PhD in Robotics", source: pineau },
      { label: "公开招生", value: "明确不接收新研究生、国际访问者或实习生", source: pineau },
    ], sources: [pineau, pineauMila, mcgill],
  }),
  "siva-reddy-ca": e({
    role: "Assistant Professor · Canada CIFAR AI Chair",
    summary: "McGill 计算机与语言学交叉任职的 NLP PI，研究语言理解、推理、问答与多模态交互；2019 年完成 Stanford NLP 博士后。",
    facts: [
      { label: "当前任职", value: "Assistant Professor, McGill Computer Science and Linguistics", source: reddy },
      { label: "职业轨迹", value: "Stanford NLP Group postdoctoral researcher through September 2019", source: reddy },
      { label: "研究主题", value: "NLP、reasoning、representation learning、question answering and conversational systems", source: reddyHome },
    ], sources: [reddy, reddyHome, mcgill],
  }),
  "jackie-cheung-ca": e({
    role: "Associate Professor · Mila Associate Scientific Director · Microsoft Research Consultant",
    summary: "McGill NLP 与 Mila 的组织型节点，研究 NLP 评测、生成、摘要与计算语义；同时任 Mila 副科学主任和 Microsoft Research 顾问研究员。",
    facts: [
      { label: "当前任职", value: "Associate Professor, McGill · Associate Scientific Director, Mila", source: cheung },
      { label: "产业连接", value: "Consultant Researcher, Microsoft Research", source: cheung },
      { label: "博士导师", value: "Gerald Penn · University of Toronto", source: cheungBio },
      { label: "研究主题", value: "NLP evaluation、generation、summarization、computational pragmatics", source: cheungBio },
    ], sources: [cheung, cheungBio, mcgill, rlLab],
  }),
  "david-rolnick-ca": e({
    summary: "McGill 与 Mila 的 AI for Climate 代表性 PI，研究遥感、气候建模、能源与生物多样性，并联合创办 Climate Change AI。",
    facts: [
      { label: "当前任职", value: "Associate Professor, McGill · Canada CIFAR AI Chair · Mila Core Academic Member", source: rolnick },
      { label: "研究组织", value: "Co-founder and Chair, Climate Change AI", source: rolnickHome },
      { label: "研究主题", value: "Climate ML、remote sensing、energy systems、biodiversity、AI for science", source: rolnick },
    ], sources: [rolnick, rolnickHome, mcgill, rlLab],
  }),
};
