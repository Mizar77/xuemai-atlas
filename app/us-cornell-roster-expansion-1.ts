import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-02";
const roster: Source = {
  label: "Cornell Bowers CS faculty directory",
  url: "https://www.cs.cornell.edu/directory?department=15",
  kind: "official",
  checkedAt,
  supports: "Current Cornell faculty status, research-area classification and official portrait",
};

const official = (name: string, url: string): Source => ({
  label: `Cornell faculty profile — ${name}`,
  url,
  kind: "official",
  checkedAt,
  supports: "Current appointment, research programme, education and career history",
});

const profile = (name: string, url: string): Source => ({
  label: `${name} research homepage`,
  url,
  kind: "profile",
  checkedAt,
  supports: "Research focus, group or training information published by the scholar",
});

type Seed = {
  id: string;
  name: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  officialUrl: string;
  profileUrl: string;
  portraitFile: string;
  education: string;
  career: string;
  peopleFlow: string;
  x: number;
  y: number;
};

function person(seed: Seed): Person {
  const officialSource = official(seed.name, seed.officialUrl);
  const profileSource = profile(seed.name, seed.profileUrl);
  return {
    id: seed.id,
    name: seed.name,
    role: seed.role,
    institution: "Cornell",
    region: "United States",
    area: seed.area,
    tags: seed.tags,
    summary: seed.summary,
    facts: [
      { label: "当前任职", value: `${seed.role}，Cornell Bowers / Cornell Tech 官方名录在列。`, source: officialSource },
      { label: "研究主线", value: seed.area.replaceAll(" · ", "、") + "。", source: officialSource },
      { label: "教育与学术训练", value: seed.education, source: officialSource },
      { label: "职业轨迹", value: seed.career, source: officialSource },
      { label: "学生与产业去向", value: seed.peopleFlow, source: profileSource },
      { label: "为什么值得关注", value: seed.summary, source: profileSource },
    ],
    stage: "emerging",
    category: "core",
    status: "current PI · Cornell official roster verified",
    sources: [officialSource, profileSource, roster],
    x: seed.x,
    y: seed.y,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/us-cornell-roster-2026/${seed.portraitFile}`,
      alt: `${seed.name} Cornell 官方教师头像`,
      source: roster,
    },
  };
}

export const usCornellRosterExpansion1People: Person[] = [
  person({
    id: "abe-davis-cornell", name: "Abe Davis", role: "Assistant Professor of Computer Science",
    area: "Computer Graphics · Computer Vision · Human-Computer Interaction", tags: ["图形学", "计算机视觉", "HCI", "多模态感知"],
    summary: "把图形学、视觉与 HCI 结合起来研究跨模态感知和内容真实性的 Cornell 青年 PI。",
    officialUrl: "https://www.cs.cornell.edu/people/abe-davis", profileUrl: "https://www.cs.cornell.edu/abe/group/", portraitFile: "abe-davis-cornell.png",
    education: "Stanford 计算机本科；MIT EECS 硕士与博士；随后在 Stanford 与 Cornell Tech 从事博士后研究。",
    career: "Cornell 官方简介记录其在 Stanford 与 Cornell Tech 的博士后经历；2026 年获 Sloan Research Fellowship。",
    peopleFlow: "本人研究组页公开当前成员；本轮未找到可逐人核验的毕业生现职或稳定企业去向，暂不推断。", x: 120, y: 120,
  }),
  person({
    id: "aditya-vashistha-cornell", name: "Aditya Vashistha", role: "Assistant Professor of Information Science",
    area: "Human-Centered AI · ICTD · Social Computing · AI Auditing", tags: ["以人为本 AI", "AI 审计", "ICTD", "社会计算"],
    summary: "领导 Cornell Global AI Initiative，关注全球公平的 AI 设计、评测与治理。",
    officialUrl: "https://www.cs.cornell.edu/people/aditya-vashistha", profileUrl: "https://www.adityavashistha.com/", portraitFile: "aditya-vashistha-cornell.jpg",
    education: "University of Washington 计算机科学与工程博士；其博士论文获校级与区域性论文奖。",
    career: "在 Cornell 同时指导 Information Science 与 Computer Science 学生，并领导跨学科 Global AI Initiative。",
    peopleFlow: "官方页确认其独立指导学生；公开页面尚未形成可逐人核验的毕业去向清单，后续从研究组校友页继续反查。", x: 270, y: 120,
  }),
  person({
    id: "ahmed-el-alaoui-cornell", name: "Ahmed El Alaoui", role: "Assistant Professor of Statistics and Data Science",
    area: "High-Dimensional Statistics · Machine Learning · Stochastic Processes", tags: ["高维统计", "机器学习", "随机过程", "学习理论"],
    summary: "连接高维统计、统计物理与学习算法，并进入 Cornell CS graduate field 的理论型 PI。",
    officialUrl: "https://bowers.cornell.edu/people/ahmed-el-alaoui", profileUrl: "https://elalaoui.stat.cornell.edu/", portraitFile: "ahmed-el-alaoui-cornell.jpg",
    education: "2018 年获 UC Berkeley EECS 博士，官方简介明确博士导师为 Michael I. Jordan。",
    career: "2018–2020 年在 Stanford 由 Andrea Montanari 接待从事博士后研究；2021 年加入 Cornell。",
    peopleFlow: "个人页公开研究与课程，但未列出可逐人核验的毕业学生或产业去向；本轮仅接入已核验博士师承。", x: 420, y: 120,
  }),
  person({
    id: "allison-koenecke-cornell", name: "Allison Koenecke", role: "Assistant Professor of Information Science",
    area: "Algorithmic Fairness · AI Auditing · Causal Inference · Speech Recognition", tags: ["算法公平", "AI 审计", "因果推断", "语音识别"],
    summary: "研究语音识别与公共服务中的算法公平，连接学术界、大厂、非营利组织与政府部门。",
    officialUrl: "https://www.cs.cornell.edu/people/allison-koenecke", profileUrl: "https://infosci.cornell.edu/~koenecke/index.html", portraitFile: "allison-koenecke-cornell.jpg",
    education: "Stanford ICME 博士；本人主页列 reading committee 为 Susan Athey、Sharad Goel 与 Hal Varian。",
    career: "加入 Cornell 前在 Microsoft Research New England 的 Machine Learning and Statistics group 从事博士后研究。",
    peopleFlow: "CV 记录 Google、Microsoft AI & Research、Facebook 等产业经历；reading committee 不等同单一博士导师，本轮不据此画导师边。", x: 570, y: 120,
  }),
  person({
    id: "andrew-owens-cornell", name: "Andrew Owens", role: "Associate Professor of Computer Science",
    area: "Multimodal Learning · Computer Vision · Graphics · Robot Perception", tags: ["多模态", "视觉", "音频", "触觉", "机器人"],
    summary: "研究无需人工标注、从视觉—声音—触觉共现中学习的多模态感知系统。",
    officialUrl: "https://www.cs.cornell.edu/people/andrew-owens", profileUrl: "https://www.andrewowens.com/", portraitFile: "andrew-owens-cornell.jpg",
    education: "Cornell 计算机本科；2016 年获 MIT 计算机科学博士。",
    career: "曾任 University of Michigan 助理教授，并在 UC Berkeley 从事博士后研究；现任 Cornell Tech / Bowers 副教授。",
    peopleFlow: "公开页列出机器人操作、AI 生成图像检测等应用；未找到可逐人核验的毕业学生就业清单，暂不从论文作者推断。", x: 720, y: 120,
  }),
  person({
    id: "angelina-wang-cornell", name: "Angelina Wang", role: "Assistant Professor of Information Science",
    area: "Responsible AI · AI Evaluation · Algorithmic Fairness", tags: ["负责任 AI", "模型评测", "算法公平", "AI 治理"],
    summary: "研究 AI 社会影响、评测和超越单一数学公平定义的负责任 AI 青年 PI。",
    officialUrl: "https://www.cs.cornell.edu/people/angelina-wang", profileUrl: "https://angelina-wang.github.io/", portraitFile: "angelina-wang-cornell.jpg",
    education: "UC Berkeley EECS 本科、Princeton 计算机博士。",
    career: "加入 Cornell Tech 前在 Stanford 从事博士后研究，并获 Microsoft AI & Society Fellowship。",
    peopleFlow: "官方页记录 Cornell Tech 与 Mastercard 的 AI governance 合作；未公开可核验的毕业学生去向，暂不推断。", x: 120, y: 290,
  }),
  person({
    id: "cheng-zhang-cornell", name: "Cheng Zhang", role: "Associate Professor of Information Science",
    area: "Human-AI Interaction · Ubiquitous Computing · Health Sensing", tags: ["HCI", "泛在计算", "健康感知", "人体计算"],
    summary: "从传感硬件、形态设计到机器学习算法端到端构建人体周边智能感知系统。",
    officialUrl: "https://www.cs.cornell.edu/people/cheng-zhang-0", profileUrl: "https://czhang.org/", portraitFile: "cheng-zhang-cornell.png",
    education: "南开大学软件工程本科、中科院软件所硕士、Georgia Tech 计算机博士；官方页明确其博士阶段与 Gregory Abowd、Omer Inan 合作。",
    career: "其 HCI 与 ubiquitous computing 工作获得两项 best paper，并形成八项以上待批美国及国际专利。",
    peopleFlow: "公开页确认学生指导与专利转化，但未提供可逐人核验的毕业生现职；‘worked with’不自动归类为单一博士导师。", x: 270, y: 290,
  }),
  person({
    id: "christopher-de-sa-cornell", name: "Christopher De Sa", role: "Associate Professor of Computer Science",
    area: "Machine Learning Systems · Distributed Optimization · Efficient Deep Learning", tags: ["机器学习系统", "分布式优化", "低精度训练", "深度学习"],
    summary: "领导 Relax ML Lab，研究高性能、并行、分布式和低精度机器学习算法与系统。",
    officialUrl: "https://www.cs.cornell.edu/people/christopher-de-sa", profileUrl: "https://relax-ml.cs.cornell.edu/", portraitFile: "christopher-de-sa-cornell.jpg",
    education: "在 Stanford University 完成电气工程 B.S.、M.A. 与 Ph.D.。",
    career: "Cornell Machine Learning Group 成员并领导 Relax ML Lab，研究从随机优化到软硬件协同的 ML 系统。",
    peopleFlow: "研究组页提供当前团队入口；本轮未找到可逐人核验的毕业学生或产业去向，保留待核。", x: 420, y: 290,
  }),
  person({
    id: "diana-cai-cornell", name: "Diana Cai", role: "Assistant Professor of Computer Science",
    area: "Probabilistic Machine Learning · AI for Science · Bayesian Methods", tags: ["概率机器学习", "AI for Science", "贝叶斯", "科学计算"],
    summary: "面向生物、化学和物理科学发现设计概率机器学习方法的 Cornell 新晋 PI。",
    officialUrl: "https://www.cs.cornell.edu/people/diana-cai", profileUrl: "https://www.dianacai.com/", portraitFile: "diana-cai-cornell.png",
    education: "Harvard 计算机与统计本科、University of Chicago 统计硕士、Princeton 计算机硕士与博士。",
    career: "加入 Cornell 前任 Flatiron Institute Center for Computational Mathematics Research Fellow。",
    peopleFlow: "2026 秋开始 Cornell 任职；尚无可核验的毕业学生去向，产业信息也不从合作论文推断。", x: 570, y: 290,
  }),
  person({
    id: "hadar-averbuch-elor-cornell", name: "Hadar Averbuch-Elor", role: "Assistant Professor of Computer Science",
    area: "Computer Vision · Graphics · Vision-Language · 3D Geometry", tags: ["计算机视觉", "图形学", "视觉语言", "3D"],
    summary: "把像素与自然语言、三维几何等结构化模态结合起来的视觉与图形学 PI。",
    officialUrl: "https://www.cs.cornell.edu/people/hadar-averbuch-elor", profileUrl: "https://www.hadarelor.com/", portraitFile: "hadar-averbuch-elor-cornell.png",
    education: "Technion 本科、Tel Aviv University 博士。",
    career: "加入 Cornell Tech 前任 Tel Aviv University 助理教授，并获 Zuckerman 与 Schmidt 博士后资助。",
    peopleFlow: "官方页公开当前研究方向与项目；未找到可逐人核验的毕业学生现职或企业流向，暂不推断。", x: 720, y: 290,
  }),
  person({
    id: "jennifer-sun-cornell", name: "Jennifer J. Sun", role: "Assistant Professor of Computer Science",
    area: "AI for Science · Computer Vision · Generative Modeling · Program Synthesis", tags: ["AI for Science", "计算机视觉", "生成模型", "程序合成"],
    summary: "与领域科学家共同构建人类专家—机器学习协作方法，以加速跨学科发现。",
    officialUrl: "https://www.cs.cornell.edu/people/jennifer-j-sun", profileUrl: "https://jenjsun.com/", portraitFile: "jennifer-sun-cornell.jpeg",
    education: "University of Toronto 工程科学本科；Caltech Computing and Mathematical Sciences 博士。",
    career: "2026 年加入 Cornell，研究表示学习、程序合成、生成建模与 human-AI collaboration。",
    peopleFlow: "新晋 PI 的公开页尚未列出毕业学生现职；当前跨领域合作不直接映射为产业去向。", x: 120, y: 460,
  }),
  person({
    id: "john-thickstun-cornell", name: "John Thickstun", role: "Assistant Professor of Computer Science",
    area: "Generative Models · Controllable AI · Music AI · NLP", tags: ["生成模型", "可控 AI", "音乐 AI", "NLP"],
    summary: "研究如何从用户、模型提供方和政策制定者视角控制生成模型行为，并扩展到音乐模态。",
    officialUrl: "https://www.cs.cornell.edu/people/john-thickstun", profileUrl: "https://johnthickstun.com/", portraitFile: "john-thickstun-cornell.jpg",
    education: "Brown 应用数学本科；University of Washington 计算机博士，官方页明确由 Sham Kakade 与 Zaid Harchaoui 共同指导。",
    career: "加入 Cornell 前在 Stanford 由 Percy Liang 指导从事博士后研究。",
    peopleFlow: "新晋 PI 暂无可核验毕业生就业清单；本轮接入共同博士导师与博士后导师两类一手关系。", x: 270, y: 460,
  }),
];

const ahmedProfile = official("Ahmed El Alaoui", "https://bowers.cornell.edu/people/ahmed-el-alaoui");
const johnProfile = official("John Thickstun", "https://www.cs.cornell.edu/people/john-thickstun");

export const usCornellRosterExpansion1Relationships: Relationship[] = [
  {
    id: "cornell-roster-jordan-el-alaoui",
    from: "michael-jordan-eu",
    to: "ahmed-el-alaoui-cornell",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Cornell 官方简介明确写明 Ahmed El Alaoui 的 UC Berkeley 博士由 Michael I. Jordan 指导。",
    source: ahmedProfile,
    verified: true,
    endYear: 2018,
  },
  {
    id: "cornell-roster-liang-thickstun",
    from: "percy-liang-us",
    to: "john-thickstun-cornell",
    type: "lineage",
    subtype: "postdoc_mentor",
    label: "博士后指导",
    evidence: "Cornell 官方简介明确记录 John Thickstun 在 Stanford 的博士后导师为 Percy Liang。",
    source: johnProfile,
    verified: true,
  },
  {
    id: "cornell-roster-kakade-thickstun",
    from: "sham-kakade-award",
    to: "john-thickstun-cornell",
    type: "lineage",
    subtype: "co_adviser",
    label: "共同博士导师",
    evidence: "Cornell 官方简介明确记录 John Thickstun 的 University of Washington 博士由 Sham Kakade 与 Zaid Harchaoui 共同指导。",
    source: johnProfile,
    verified: true,
  },
];
