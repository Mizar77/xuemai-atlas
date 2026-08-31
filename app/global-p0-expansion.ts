import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";
const official = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });
const profile = (label: string, url: string, supports: string): Source => ({ label, url, kind: "profile", checkedAt, supports });

const sources = {
  jordanBerkeley: official("UC Berkeley EECS profile", "https://www2.eecs.berkeley.edu/Faculty/Homepages/jordan.html", "Emeritus title, biography, awards and research areas"),
  jordanHome: profile("Michael I. Jordan homepage", "https://people.eecs.berkeley.edu/~jordan/", "Current Inria role and academic history"),
  jordanInria: official("Inria Markets and Machine Learning chair", "https://www.inria.fr/en/new-research-chair-bringing-together-economics-and-artificial-intelligence", "Current chair leadership, Berkeley emeritus status and research programme"),
  zoubinCambridge: official("Cambridge Engineering profile", "https://www.eng.cam.ac.uk/node/755", "Current professorship and research"),
  zoubinMlg: official("Cambridge Machine Learning Group", "https://mlg.eng.cam.ac.uk/people/zoubin-ghahramani/", "Current faculty status, research and career trajectory"),
  zoubinCv: official("Cambridge-hosted CV", "https://mlg.eng.cam.ac.uk/zoubin/fullcv.pdf", "MIT doctoral supervision by Michael I. Jordan and Tomaso Poggio"),
  zissermanOxford: official("Oxford Engineering profile", "https://eng.ox.ac.uk/people/andrew-zisserman", "Current title and VGG role"),
  zissermanVgg: official("Oxford Visual Geometry Group", "https://www.robots.ox.ac.uk/~az/", "Computer-vision research and group leadership"),
  cremersTum: official("TUM professor profile", "https://www.professoren.tum.de/cremers-daniel", "Current chair, research, institute leadership and awards"),
  cremersGroup: official("TUM Computer Vision Group", "https://www.vision.in.tum.de/members/cremers", "Current appointment and research programme"),
  dayanMpi: official("Max Planck Institute profile", "https://www.kyb.tuebingen.mpg.de/person/95844", "Current directorship and department"),
  dayanDepartment: official("MPI Computational Neuroscience", "https://www.kyb.tuebingen.mpg.de/computational-neuroscience", "Department leadership and research programme"),
  hintonPostdocs: profile("Geoffrey Hinton former postdocs", "https://www.cs.utoronto.ca/~hinton/postdocs.html", "Peter Dayan in the Toronto postdoctoral lineage"),
  yiHku: official("HKU AI profile", "https://www.ai.hku.hk/people/academic-staff/mayi", "Current chair, directorships and research"),
  yiCv: official("HKU-hosted CV", "https://www.ai.hku.hk/images/people/CV-YIMA.pdf", "Current HKU leadership and academic trajectory"),
  tongHkust: official("HKUST Mathematics profile", "https://www.math.hkust.edu.hk/people/faculty/profile/tongzhang/", "Current chair professorship and research interests"),
  tongHome: profile("Tong Zhang homepage", "https://tongzhang-ml.org/", "Machine-learning research and publications"),
  hsuNus: official("NUS Computing profile", "https://www.comp.nus.edu.sg/cs/people/dyhsu/", "Current chair, SSI leadership and research"),
  hsuSsi: official("NUS Smart Systems Institute", "https://ssi.nus.edu.sg/", "Current institute leadership and embodied-AI programme"),
  yanNus: official("NUS Computing profile", "https://www.comp.nus.edu.sg/cs/people/yansc/", "Current practice-track professorship, research and Sea history"),
  yanLab: profile("Learning and Vision Lab", "https://www.lv-lab.org/", "Research group and programme"),
  tsangAstar: official("A*STAR CFAR profile", "https://www.a-star.edu.sg/cfar/about-cfar/management/prof-ivor-tsang", "Current CFAR directorship, NTU affiliation and research"),
  tsangStudents: official("A*STAR CFAR affiliated PhD students", "https://www.a-star.edu.sg/cfar/talent/affiliated-phd-students", "Current doctoral supervision network"),
  hoiSmu: official("SMU faculty profile", "https://faculty.smu.edu.sg/profile/steven-hoi-6686", "Current professorship and research areas"),
  hoiThesis: official("CUHK doctoral thesis", "https://www.cse.cuhk.edu.hk/~lyu/student/phd/steven/hoi_term_2005.pdf", "Doctoral supervision by Michael R. Lyu"),
  russellBerkeley: official("UC Berkeley EECS profile", "https://www2.eecs.berkeley.edu/Faculty/Homepages/russell.html", "Emeritus title, CHAI leadership, research and awards"),
  russellHome: profile("Stuart Russell homepage", "https://aima.cs.berkeley.edu/~russell/", "Current research groups and AI programme"),
};

type Entry = Pick<Person, "id" | "name" | "chinese" | "role" | "institution" | "region" | "area" | "tags" | "summary" | "stage"> & {
  why: string;
  sources: [Source, Source, ...Source[]];
  historical?: boolean;
};

const person = (entry: Entry): Person => ({
  ...entry,
  category: "core",
  primary: !entry.historical,
  status: entry.role.includes("Emeritus") ? "emeritus / active research node" : "current PI",
  lastVerifiedAt: checkedAt,
  x: 0,
  y: 0,
  facts: [
    { label: "现职", value: entry.role, source: entry.sources[0] },
    { label: "研究主题", value: entry.area, source: entry.sources[0] },
    { label: "为什么值得关注", value: entry.why, source: entry.sources[1] },
  ],
});

/** High-confidence omissions found by the 2026-08-31 global completeness audit. */
export const globalP0People: Person[] = [
  person({
    id: "michael-jordan-eu", name: "Michael I. Jordan", role: "Scientific Lead, Inria Markets and Machine Learning Chair · Professor Emeritus, Berkeley", institution: "Inria", region: "Europe",
    area: "Machine Learning · Statistics · Decision Systems", tags: ["机器学习", "概率模型", "统计学习", "导师谱系"], stage: "institute",
    summary: "现任 Inria 研究主任、Berkeley 荣休教授，是统计机器学习和概率建模的关键导师节点。",
    why: "其学术谱系连接 Zoubin Ghahramani、Andrew Ng、David Blei、Eric Xing 等多位重要 AI/ML 学者；缺失会切断欧美统计机器学习主线。",
    sources: [sources.jordanInria, sources.jordanHome, sources.jordanBerkeley],
  }),
  person({
    id: "zoubin-ghahramani-eu", name: "Zoubin Ghahramani", role: "Professor of Information Engineering", institution: "Cambridge", region: "Europe",
    area: "Bayesian Machine Learning · Probabilistic Models", tags: ["贝叶斯学习", "概率模型", "机器学习", "近似推断"], stage: "senior",
    summary: "Cambridge 概率机器学习资深教授，研究贝叶斯建模、近似推断与非参数学习。",
    why: "其 MIT 博士由 Michael I. Jordan 主要指导，是统计机器学习导师谱系的关键继承与扩散节点。",
    sources: [sources.zoubinCambridge, sources.zoubinCv, sources.zoubinMlg],
  }),
  person({
    id: "andrew-zisserman-eu", name: "Andrew Zisserman", role: "Professor · Royal Society Research Professor", institution: "Oxford", region: "Europe",
    area: "Computer Vision · Visual Geometry · Video Understanding", tags: ["计算机视觉", "VGG", "视觉几何", "视频理解"], stage: "institute",
    summary: "Oxford Visual Geometry Group 核心带头人，长期推动多视图几何、识别和视频理解。",
    why: "VGG 是欧洲计算机视觉最重要的训练与方法输出节点之一；缺失会让 Oxford 视觉谱系失去其资深锚点。",
    sources: [sources.zissermanOxford, sources.zissermanVgg],
  }),
  person({
    id: "daniel-cremers-eu", name: "Daniel Cremers", role: "Professor · Chair of Computer Vision and AI", institution: "TUM", region: "Europe",
    area: "Computer Vision · 3D Vision · Robotics · Machine Learning", tags: ["计算机视觉", "3D", "机器人", "MCML"], stage: "institute",
    summary: "TUM 计算机视觉与人工智能讲席教授，并领导 MCML、MDSI 与 ELLIS Munich 等研究网络。",
    why: "其 TUM Computer Vision Group 长期覆盖视觉、机器学习、三维重建与机器人，是德国视觉研究的重要训练节点。",
    sources: [sources.cremersTum, sources.cremersGroup],
  }),
  person({
    id: "peter-dayan-eu", name: "Peter Dayan", role: "Director · Department of Computational Neuroscience", institution: "Tübingen/MPI", region: "Europe",
    area: "Reinforcement Learning · Computational Neuroscience · Decision Making", tags: ["强化学习", "计算神经科学", "决策", "Hinton 网络"], stage: "institute",
    summary: "Max Planck 计算神经科学部主任，研究强化学习、神经调制与行为决策。",
    why: "是早期强化学习与计算神经科学的关键桥梁，并与 Geoffrey Hinton 的 Toronto 研究网络存在明确博士后谱系连接。",
    sources: [sources.dayanMpi, sources.hintonPostdocs, sources.dayanDepartment],
  }),
  person({
    id: "yi-ma-hku", name: "Yi Ma", chinese: "马毅", role: "Chair of Artificial Intelligence · Director, HKU CDS and IDS", institution: "HKU", region: "Hong Kong",
    area: "Computer Vision · High-Dimensional Data · Intelligent Systems", tags: ["计算机视觉", "高维数据", "智能系统", "研究领导"], stage: "institute",
    summary: "HKU 人工智能讲席教授、计算与数据科学学院及数据科学研究院主任。",
    why: "其职业轨迹横跨 Berkeley、UIUC、MSRA、上海科技大学与 HKU，是连接中美港视觉和数据科学网络的重要节点。",
    sources: [sources.yiHku, sources.yiCv],
  }),
  person({
    id: "tong-zhang-hkust", name: "Tong Zhang", chinese: "张潼", role: "Chair Professor", institution: "HKUST", region: "Hong Kong",
    area: "Machine Learning Theory · Optimization · Statistical Learning", tags: ["机器学习理论", "优化", "统计学习", "大数据"], stage: "senior",
    summary: "HKUST 讲席教授，研究机器学习算法与理论、统计方法和大规模数据学习。",
    why: "为香港现有以 NLP/CV 为主的图谱补上机器学习理论、优化与统计学习的资深主轴。",
    sources: [sources.tongHkust, sources.tongHome],
  }),
  person({
    id: "david-hsu-nus", name: "David Hsu", role: "Provost's Chair Professor · Director, Smart Systems Institute", institution: "NUS", region: "Singapore",
    area: "Robotics · AI Planning · Learning under Uncertainty", tags: ["机器人", "规划", "不确定性", "具身 AI"], stage: "institute",
    summary: "NUS Provost's Chair Professor、NUS AI Lab 创始主任及 Smart Systems Institute 主任。",
    why: "为新加坡图谱补上机器人规划与 embodied AI 的资深主轴，并连接 NUS AI Lab 与跨学科智能系统研究。",
    sources: [sources.hsuNus, sources.hsuSsi],
  }),
  person({
    id: "shuicheng-yan-nus", name: "Shuicheng Yan", chinese: "颜水成", role: "Distinguished Professor (Practice Track)", institution: "NUS", region: "Singapore",
    area: "Computer Vision · Machine Learning · Multimedia AI", tags: ["计算机视觉", "机器学习", "多媒体", "Sea AI Lab"], stage: "senior",
    summary: "NUS 杰出实践教授，曾任 Sea Group 集团首席科学家，研究视觉、机器学习与多媒体智能。",
    why: "其学术和产业团队长期向亚洲视觉研究网络输出人才与方法，是中国—新加坡视觉及工业研究流动的重要节点。",
    sources: [sources.yanNus, sources.yanLab],
  }),
  person({
    id: "ivor-tsang-astar", name: "Ivor W. Tsang", role: "Director, Centre for Frontier AI Research", institution: "A*STAR", region: "Singapore",
    area: "Transfer Learning · Generative Models · Large-Scale Machine Learning", tags: ["迁移学习", "生成模型", "弱监督", "CFAR"], stage: "institute",
    summary: "A*STAR CFAR 主任、NTU 兼职教授，研究迁移学习、生成模型和大规模机器学习。",
    why: "CFAR 是新加坡国家级前沿 AI 研究节点；其缺失会使 A*STAR 只呈现语言与视觉应用而缺少总体 AI 研究领导层。",
    sources: [sources.tsangAstar, sources.tsangStudents],
  }),
  person({
    id: "steven-hoi-smu", name: "Steven Hoi", chinese: "许主洪", role: "Professor of Computer Science", institution: "SMU", region: "Singapore",
    area: "Machine Learning · Online Learning · Multimedia AI", tags: ["机器学习", "在线学习", "多媒体", "Salesforce Research"], stage: "senior",
    summary: "SMU 计算机科学教授，研究机器学习、在线学习、视觉与多媒体，并曾领导 Salesforce Research Asia。",
    why: "其 CUHK 博士师承 Michael R. Lyu，直接连接香港导师谱系与新加坡学术、产业研究网络。",
    sources: [sources.hoiSmu, sources.hoiThesis],
  }),
  person({
    id: "stuart-russell-us", name: "Stuart Russell", role: "Professor Emeritus · Director, Center for Human-Compatible AI", institution: "Berkeley", region: "United States",
    area: "Artificial Intelligence · Rational Agents · AI Safety", tags: ["AI 基础", "智能体", "AI 安全", "CHAI"], stage: "institute",
    summary: "Berkeley 荣休教授、CHAI 主任，研究理性智能体、决策和可控人工智能。",
    why: "是通用 AI 方法、智能体与人类兼容 AI 的核心学术节点；现有美国名录缺少这一基础 AI 主线。",
    historical: true,
    sources: [sources.russellBerkeley, sources.russellHome],
  }),
];

export const globalP0Relationships: Relationship[] = [
  {
    id: "global-p0-jordan-zoubin-phd", from: "michael-jordan-eu", to: "zoubin-ghahramani-eu", type: "lineage", subtype: "phd_adviser", label: "博士导师",
    evidence: "Zoubin Ghahramani 的 Cambridge 托管简历明确列出 Michael I. Jordan 为主要博士导师。", evidenceObject: "Zoubin Ghahramani · MIT PhD 1995",
    source: sources.zoubinCv, verified: true, endYear: 1995,
  },
  {
    id: "global-p0-lyu-hoi-phd", from: "michael-lyu-cuhk", to: "steven-hoi-smu", type: "lineage", subtype: "phd_adviser", label: "博士导师",
    evidence: "CUHK 托管的 Steven Hoi 博士论文明确写明由 Michael R. Lyu 指导。", evidenceObject: "Steven Hoi · CUHK PhD",
    source: sources.hoiThesis, verified: true,
  },
];
