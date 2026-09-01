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

const thesis = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "thesis",
  checkedAt,
  supports,
});

const sources = {
  bengioCv: cv(
    "Yoshua Bengio academic CV",
    "https://yoshuabengio.org/wp-content/uploads/2020/01/Yoshua_Bengio_CV_1Aug2019.pdf",
    "MIT and AT&T postdoctoral mentors; former PhD, MSc and postdoctoral trainees",
  ),
  bengioMila: official(
    "Mila directory — Yoshua Bengio",
    "https://mila.quebec/en/directory/yoshua-bengio",
    "Current UdeM professorship, Mila role, research programme and supervision",
  ),
  kruegerMila: official(
    "Mila directory — David Krueger",
    "https://mila.quebec/en/directory/david-scott-krueger?page=0%2C1",
    "Current UdeM appointment, Mila membership, research and Montreal training network",
  ),
  kruegerUdem: official(
    "Université de Montréal profile — David Krueger",
    "https://diro.umontreal.ca/english/departement-directory/professors/professor/in/in38219/sg/David%20Krueger/",
    "Current faculty appointment and research interests",
  ),
  vincentMila: official(
    "Mila directory — Pascal Vincent",
    "https://mila.quebec/en/directory/pascal-vincent?page=0%2C1",
    "Meta FAIR role, UdeM adjunct appointment and research biography",
  ),
  vincentUdem: official(
    "Université de Montréal profile — Pascal Vincent",
    "https://diro.umontreal.ca/english/departement-directory/professors/professor/in/in15603/sg/Pascal%20Vincent/",
    "UdeM affiliation, research topics and academic trajectory",
  ),
  goodfellowBio: profile(
    "Ian Goodfellow biography",
    "https://www.iangoodfellow.com/bio",
    "Doctoral supervision, deep-learning research and industry trajectory",
  ),
  goodfellowThesis: thesis(
    "Université de Montréal thesis record — Ian Goodfellow",
    "https://hdl.handle.net/1866/11674",
    "UdeM doctoral thesis identity and degree record",
  ),
  ngStanford: official(
    "Stanford AIMI profile — Andrew Ng",
    "https://aimi.stanford.edu/people/andrew-ng",
    "Current Stanford role, AI research and education leadership",
  ),
  ngProfile: official(
    "Stanford Profiles — Andrew Ng",
    "https://profiles.stanford.edu/andrew-ng",
    "Stanford appointment and research profile",
  ),
  bleiHome: profile(
    "David Blei homepage",
    "https://www.cs.columbia.edu/~blei/",
    "Current Columbia professorship and probabilistic-machine-learning research",
  ),
  bleiCv: cv(
    "David Blei academic CV",
    "https://www.cs.columbia.edu/~blei/static/blei_cv.pdf",
    "MIT PhD supervision by Michael I. Jordan and academic trajectory",
  ),
  jordanCv: cv(
    "Michael I. Jordan academic CV",
    "https://people.eecs.berkeley.edu/~jordan/jordan-cv.pdf",
    "Graduate and postdoctoral supervision, including Bengio, Ng, Blei, Jaakkola and Liang",
  ),
  taylorGuelph: official(
    "University of Guelph profile — Graham Taylor",
    "https://www.uoguelph.ca/engineering/people/graham-w-taylor-phd-peng",
    "Current professorship, research programme and institute leadership",
  ),
  taylorHome: profile(
    "Graham Taylor homepage",
    "https://www.gwtaylor.ca/",
    "Research programme and academic trajectory",
  ),
  lecunPeople: profile(
    "Yann LeCun laboratory members and alumni",
    "https://cs.nyu.edu/~yann/people.html",
    "Past postdoctoral researchers in Yann LeCun's NYU group",
  ),
  choromanskaNyu: official(
    "NYU Tandon profile — Anna Choromanska",
    "https://engineering.nyu.edu/faculty/anna-choromanska",
    "Current associate professorship, research and postdoctoral training under Yann LeCun",
  ),
  choromanskaNyuStory: official(
    "NYU AI seminar profile — Anna Choromanska",
    "https://engineering.nyu.edu/news/final-lecture-ai-seminar-series-explores-how-machines-might-learn-humans-do",
    "NYU research role and machine-learning programme",
  ),
  russellGroup: profile(
    "Stuart Russell research group and alumni",
    "https://people.eecs.berkeley.edu/~russell/rugs.html",
    "Former doctoral students and postdoctoral researchers with current destinations",
  ),
  dylanMit: official(
    "MIT CSAIL profile — Dylan Hadfield-Menell",
    "https://www.csail.mit.edu/person/dylan-hadfield-menell",
    "Current MIT faculty role and research programme",
  ),
  dylanHome: profile(
    "Dylan Hadfield-Menell homepage",
    "https://people.csail.mit.edu/dhm/",
    "Research on AI alignment, human-AI systems and decision making",
  ),
  emmaStanford: official(
    "Stanford Profiles — Emma Brunskill",
    "https://profiles.stanford.edu/emma-brunskill",
    "Current Stanford professorship and research programme",
  ),
  emmaLab: official(
    "Stanford AI Lab — Emma Brunskill",
    "https://ai.stanford.edu/~ebrun/",
    "Reinforcement-learning research, lab and academic trajectory",
  ),
  yiTsinghua: official(
    "Tsinghua IIIS profile — Yi Wu",
    "https://iiis.tsinghua.edu.cn/en/info/1044/1842.htm",
    "Tsinghua faculty appointment, research and Berkeley PhD supervision by Stuart Russell",
  ),
};

type NewPerson = Pick<Person, "id" | "name" | "role" | "institution" | "actualInstitution" | "region" | "area" | "tags" | "summary" | "stage" | "category" | "primary" | "status"> & {
  why: string;
  trajectory: string;
  sources: [Source, Source, ...Source[]];
};

const person = (entry: NewPerson, index: number): Person => ({
  ...entry,
  lastVerifiedAt: checkedAt,
  x: 120 + (index % 5) * 180,
  y: 120 + Math.floor(index / 5) * 150,
  facts: [
    { label: "当前角色", value: entry.role, source: entry.sources[0] },
    { label: "学术轨迹", value: entry.trajectory, source: entry.sources[1] },
    { label: "研究主线", value: entry.area, source: entry.sources[0] },
    { label: "为什么值得关注", value: entry.why, source: entry.sources[1] },
  ],
});

/**
 * People required to expose the explicitly documented academic networks around
 * Bengio, Jordan, LeCun and Russell. Industry-only alumni stay adjacent rather
 * than being counted as current faculty.
 */
export const foundationalNetworkPeople: Person[] = [
  person({
    id: "david-krueger-foundational", name: "David Krueger", role: "Assistant Professor · Core Academic Member, Mila", institution: "Université de Montréal", region: "Canada",
    area: "AI Safety · Deep Learning · Alignment", tags: ["AI 安全", "深度学习", "对齐", "Bengio 谱系"], stage: "emerging", category: "core", primary: true, status: "current PI",
    summary: "UdeM 与 Mila 的 AI safety PI；Bengio 履历将其列为前硕士生，是蒙特利尔深度学习谱系向对齐研究延伸的代表节点。",
    trajectory: "在蒙特利尔与 Yoshua Bengio、Roland Memisevic 和 Aaron Courville 开展研究，现任 UdeM 助理教授。",
    why: "把 Bengio 的早期深度学习训练网络连接到今天的 AI safety 与 alignment 研究。",
    sources: [sources.kruegerMila, sources.kruegerUdem, sources.bengioCv],
  }, 0),
  person({
    id: "pascal-vincent-foundational", name: "Pascal Vincent", role: "Research Scientist, Meta FAIR · Adjunct Professor, UdeM", institution: "Université de Montréal", region: "Canada",
    area: "Representation Learning · Generative Models · Deep Learning", tags: ["表征学习", "生成模型", "Meta FAIR", "Bengio 谱系"], stage: "senior", category: "adjacent", primary: false, status: "industry research · adjunct faculty",
    summary: "Bengio 的早期博士生之一，现连接 UdeM/Mila 与 Meta FAIR；是蒙特利尔表征学习谱系的重要产业—学术桥梁。",
    trajectory: "UdeM 博士后长期参与蒙特利尔机器学习研究，后进入 Meta FAIR 并保留 UdeM 兼职教授身份。",
    why: "其去噪自编码器与表征学习工作是 Bengio 学术谱系向现代生成建模演化的重要一环。",
    sources: [sources.vincentMila, sources.vincentUdem, sources.bengioCv],
  }, 1),
  person({
    id: "ian-goodfellow-foundational", name: "Ian Goodfellow", role: "AI Researcher · Deep Learning co-author", institution: "External", actualInstitution: "Industry AI research", region: "United States",
    area: "Generative Adversarial Networks · Deep Learning · AI Safety", tags: ["GAN", "深度学习", "AI 安全", "Bengio 谱系"], stage: "adjacent", category: "adjacent", primary: false, status: "industry / independent research node",
    summary: "Bengio 与 Aaron Courville 共同指导的 UdeM 博士，GAN 提出者之一；作为非高校节点展示，不计入当前 PI。",
    trajectory: "UdeM 博士后先后在 Google Brain、OpenAI、Apple 与 Google DeepMind 等产业研究组织任职。",
    why: "是 Bengio 学术谱系向生成模型与全球工业研究扩散的最具代表性节点之一。",
    sources: [sources.goodfellowBio, sources.goodfellowThesis, sources.bengioCv],
  }, 2),
  person({
    id: "andrew-ng-foundational", name: "Andrew Ng", role: "Adjunct Professor · Founder, DeepLearning.AI", institution: "Stanford", region: "United States",
    area: "Machine Learning · AI Education · Applied AI", tags: ["机器学习", "AI 教育", "产业 AI", "Jordan 谱系"], stage: "senior", category: "adjacent", primary: false, status: "adjunct faculty · industry/education leader",
    summary: "Michael I. Jordan 的博士生，现以 Stanford 兼职教授和 AI 教育、创业领导者身份连接学术训练与大规模产业传播。",
    trajectory: "UC Berkeley 博士后加入 Stanford，曾领导 Google Brain 与百度 AI，并创办 DeepLearning.AI。",
    why: "是 Jordan 统计机器学习谱系向产业、教育和全球人才培养扩散的关键节点。",
    sources: [sources.ngStanford, sources.ngProfile, sources.jordanCv],
  }, 3),
  person({
    id: "david-blei-foundational", name: "David Blei", role: "Professor of Statistics and Computer Science", institution: "Columbia", region: "United States",
    area: "Probabilistic Machine Learning · Topic Models · Bayesian Statistics", tags: ["概率机器学习", "主题模型", "贝叶斯统计", "Jordan 谱系"], stage: "senior", category: "core", primary: true, status: "current PI",
    summary: "Columbia 概率机器学习资深 PI，Michael I. Jordan 的博士生，是统计机器学习谱系的重要独立分支。",
    trajectory: "MIT 博士由 Michael I. Jordan 指导，后在 Princeton 任教并转入 Columbia。",
    why: "其主题模型与概率建模研究形成了持续输出学生和方法的独立学术网络。",
    sources: [sources.bleiHome, sources.bleiCv, sources.jordanCv],
  }, 4),
  person({
    id: "graham-taylor-foundational", name: "Graham W. Taylor", role: "Professor · Canada CIFAR AI Chair", institution: "External", actualInstitution: "University of Guelph", region: "Canada",
    area: "Deep Learning · Computer Vision · Sequential Models", tags: ["深度学习", "计算机视觉", "序列模型", "LeCun 谱系"], stage: "senior", category: "core", primary: true, status: "current PI",
    summary: "University of Guelph 教授与 Canada CIFAR AI Chair，曾在 Yann LeCun 的 NYU 实验室从事博士后研究。",
    trajectory: "博士后进入 LeCun 的 NYU 研究组，后在 Guelph 建立机器学习研究团队。",
    why: "连接 NYU 深度学习谱系与加拿大 Vector/Guelph 生态。",
    sources: [sources.taylorGuelph, sources.taylorHome, sources.lecunPeople],
  }, 5),
  person({
    id: "anna-choromanska-foundational", name: "Anna Choromanska", role: "Associate Professor", institution: "NYU", region: "United States",
    area: "Deep Learning · Optimization · Autonomous Systems", tags: ["深度学习", "优化", "自主系统", "LeCun 谱系"], stage: "senior", category: "core", primary: true, status: "current PI",
    summary: "NYU Tandon 机器学习 PI，官方简介记录其曾在 Yann LeCun 指导下从事博士后研究。",
    trajectory: "Columbia 博士后进入 NYU Courant/Center for Data Science 的 LeCun 团队，随后在 NYU Tandon 独立任教。",
    why: "展示 LeCun 网络从核心实验室向优化、机器人和自主系统方向形成的新 PI 分支。",
    sources: [sources.choromanskaNyu, sources.choromanskaNyuStory, sources.lecunPeople],
  }, 6),
  person({
    id: "dylan-hadfield-menell-foundational", name: "Dylan Hadfield-Menell", role: "Associate Professor", institution: "MIT", region: "United States",
    area: "AI Alignment · Human-AI Systems · Decision Making", tags: ["AI 对齐", "人机协作", "决策", "Russell 谱系"], stage: "emerging", category: "core", primary: true, status: "current PI",
    summary: "MIT AI alignment PI，Stuart Russell 在 Berkeley 指导的博士生，是 CHAI 谱系向新一代独立实验室扩散的重要节点。",
    trajectory: "Berkeley 博士由 Stuart Russell 指导，后加入 MIT EECS/CSAIL 建立人类兼容 AI 研究方向。",
    why: "把 Russell 的理性智能体与 human-compatible AI 主线连接到 MIT 的独立 PI 网络。",
    sources: [sources.dylanMit, sources.dylanHome, sources.russellGroup],
  }, 7),
  person({
    id: "emma-brunskill-foundational", name: "Emma Brunskill", role: "Associate Professor of Computer Science", institution: "Stanford", region: "United States",
    area: "Reinforcement Learning · Decision Making · AI for Education", tags: ["强化学习", "决策", "教育 AI", "Russell 谱系"], stage: "senior", category: "core", primary: true, status: "current PI",
    summary: "Stanford 强化学习 PI，曾在 Stuart Russell 的 Berkeley 研究组从事博士后研究。",
    trajectory: "MIT 博士后在 Berkeley Russell 组开展研究，后在 Carnegie Mellon 与 Stanford 任教。",
    why: "连接 Russell 的决策与智能体研究到强化学习、教育和医疗等高影响应用。",
    sources: [sources.emmaStanford, sources.emmaLab, sources.russellGroup],
  }, 8),
  person({
    id: "yi-wu-foundational", name: "吴翼", role: "Assistant Professor", institution: "THU", region: "Mainland China",
    area: "Reinforcement Learning · Robotics · Multi-Agent Systems", tags: ["强化学习", "机器人", "多智能体", "Russell 谱系"], stage: "emerging", category: "core", primary: true, status: "current PI",
    summary: "清华交叉信息院强化学习 PI，Berkeley 博士由 Stuart Russell 指导，连接美国 AI 基础研究与中国大陆新生代独立 PI。",
    trajectory: "Berkeley 博士阶段师从 Stuart Russell，随后加入清华大学交叉信息研究院。",
    why: "是 Russell 学术谱系跨地区流动到中国大陆强化学习与机器人研究的重要节点。",
    sources: [sources.yiTsinghua, sources.russellGroup],
  }, 9),
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
  label: subtype === "postdoc_mentor" ? "博士后指导" : subtype === "co_adviser" ? "共同博士导师" : subtype === "master_adviser" ? "硕士导师" : "博士导师",
  evidence,
  source,
  verified: true,
  endYear,
});

/** Adviser points to trainee; every edge below is explicitly stated by a CV, thesis or official group roster. */
export const foundationalNetworkRelationships: Relationship[] = [
  lineage("foundation-jordan-bengio-postdoc", "michael-jordan-eu", "yoshua-bengio-ca", "postdoc_mentor", "Bengio 的官方履历记录其 1991–1992 年在 MIT Michael I. Jordan 研究组从事博士后研究。", sources.bengioCv, 1992),
  lineage("foundation-lecun-bengio-postdoc", "yann-lecun-us", "yoshua-bengio-ca", "postdoc_mentor", "Bengio 的官方履历记录其 1992–1993 年在 AT&T Bell Labs 的 Larry Jackel / Yann LeCun 研究组从事博士后研究。", sources.bengioCv, 1993),
  lineage("foundation-bengio-vincent-phd", "yoshua-bengio-ca", "pascal-vincent-foundational", "phd_adviser", "Bengio 的官方履历将 Pascal Vincent 列为 2003 年毕业的 former PhD student。", sources.bengioCv, 2003),
  lineage("foundation-bengio-goodfellow-phd", "yoshua-bengio-ca", "ian-goodfellow-foundational", "co_adviser", "Ian Goodfellow 的公开履历与 Bengio CV 记录其 UdeM 博士由 Yoshua Bengio 与 Aaron Courville 共同指导。", sources.goodfellowBio, 2014),
  lineage("foundation-courville-goodfellow-phd", "aaron-courville-ca", "ian-goodfellow-foundational", "co_adviser", "Ian Goodfellow 的公开履历记录 Aaron Courville 为其 UdeM 博士共同导师。", sources.goodfellowBio, 2014),
  lineage("foundation-bengio-krueger-master", "yoshua-bengio-ca", "david-krueger-foundational", "master_adviser", "Bengio 的官方履历将 David Krueger 列为 2016 年毕业的 former MSc student。", sources.bengioCv, 2016),
  lineage("foundation-bengio-cho-postdoc", "yoshua-bengio-ca", "kyunghyun-cho-us", "postdoc_mentor", "Bengio 的官方履历将 Kyunghyun Cho 列为 2015 年结束的 former postdoctoral researcher。", sources.bengioCv, 2015),
  lineage("foundation-bengio-courville-postdoc", "yoshua-bengio-ca", "aaron-courville-ca", "postdoc_mentor", "Bengio 的官方履历将 Aaron Courville 列为 2011 年结束的 former postdoctoral researcher。", sources.bengioCv, 2011),

  lineage("foundation-jordan-ng-phd", "michael-jordan-eu", "andrew-ng-foundational", "phd_adviser", "Michael I. Jordan 的官方履历将 Andrew Ng 列入其博士生指导名单。", sources.jordanCv, 2002),
  lineage("foundation-jordan-blei-phd", "michael-jordan-eu", "david-blei-foundational", "phd_adviser", "David Blei 的官方履历明确列出 MIT 博士导师 Michael I. Jordan。", sources.bleiCv, 2004),
  lineage("foundation-jordan-percy-coadvisor", "michael-jordan-eu", "percy-liang-us", "co_adviser", "Michael I. Jordan 的官方履历将 Percy Liang 列入其 Berkeley graduate supervision 名单；图中同时保留 Dan Klein 的博士导师关系。", sources.jordanCv, 2011),
  lineage("foundation-jordan-jaakkola-phd", "michael-jordan-eu", "tommi-jaakkola-lineage", "phd_adviser", "Michael I. Jordan 的官方履历将 Tommi Jaakkola 列入其博士生指导名单。", sources.jordanCv, 1997),

  lineage("foundation-lecun-taylor-postdoc", "yann-lecun-us", "graham-taylor-foundational", "postdoc_mentor", "Yann LeCun 的实验室成员名录将 Graham Taylor 列为 2009–2011 年 past postdoc。", sources.lecunPeople, 2011),
  lineage("foundation-lecun-choromanska-postdoc", "yann-lecun-us", "anna-choromanska-foundational", "postdoc_mentor", "NYU 官方简介记录 Anna Choromanska 曾在 Yann LeCun 指导下从事博士后研究。", sources.choromanskaNyu),

  lineage("foundation-russell-dylan-phd", "stuart-russell-us", "dylan-hadfield-menell-foundational", "phd_adviser", "Stuart Russell 的 Berkeley 研究组名录将 Dylan Hadfield-Menell 列为 2021 年毕业博士生。", sources.russellGroup, 2021),
  lineage("foundation-russell-yiwu-phd", "stuart-russell-us", "yi-wu-foundational", "phd_adviser", "清华官方简介与 Russell 研究组名录均记录吴翼的 Berkeley 博士导师为 Stuart Russell。", sources.yiTsinghua, 2020),
  lineage("foundation-russell-brunskill-postdoc", "stuart-russell-us", "emma-brunskill-foundational", "postdoc_mentor", "Stuart Russell 的 Berkeley 研究组名录将 Emma Brunskill 列为 2009–2011 年博士后成员。", sources.russellGroup, 2011),
];
