import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const sources = {
  roster: source("NUS Computing · faculty roster", "https://www.comp.nus.edu.sg/about/faculty/", "official", "School of Computing 现任 faculty roster"),
  cuhkRoster: source("CUHK CSE · faculty roster", "https://www.cse.cuhk.edu.hk/people/faculty/", "official", "Department of Computer Science and Engineering 现任 faculty roster"),
  ntuRoster: source("NTU CCDS · faculty roster", "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", "official", "College of Computing and Data Science 现任 faculty roster"),
  duan: source("NUS Computing · DUAN Jiafei", "https://www.comp.nus.edu.sg/cs/people/duanjf/", "official", "现任职务、教育训练、Dieter Fox 与 Ranjay Krishna 博士指导关系、研究方向和官方头像"),
  shao: source("NUS Computing · SHAO Lin", "https://www.comp.nus.edu.sg/cs/people/shaol/", "official", "现任职务、教育训练、Jeannette Bohg 与 Leonidas Guibas 博士指导关系、研究方向和官方头像"),
  soh: source("NUS Computing · Harold Soh", "https://www.comp.nus.edu.sg/cs/people/hsoh/", "official", "现任职务、教育训练、CLeAR 团队、研究方向、与 David Hsu 的论文合作和官方头像"),
  scarlett: source("NUS Computing · Jonathan Scarlett", "https://www.comp.nus.edu.sg/cs/people/scarlett/", "official", "现任职务、教育训练、研究方向、与 Stefanie Jegelka 和 Volkan Cevher 的论文合作及官方头像"),
  khoo: source("NUS Computing · Siau-Cheng Khoo", "https://www.comp.nus.edu.sg/cs/people/khoosc/", "official", "现任职务、教育训练、研究方向、与 Abhik Roychoudhury 和 David Lo 的论文合作及官方头像"),
  wang: source("NUS Computing · Ye Wang", "https://www.comp.nus.edu.sg/cs/people/wangye/", "official", "现任职务、教育训练、研究方向、学生培养、与 David Hsu 的论文合作和官方头像"),
  liwei: source("CUHK CSE · Liwei Wang", "https://www.cse.cuhk.edu.hk/people/faculty/liwei-wang/", "official", "现任职务、UIUC 博士与 Svetlana Lazebnik 导师关系、Tencent AI Lab 履历、LaVi 团队和官方头像"),
  weiyang: source("CUHK CSE · Weiyang Liu", "https://www.cse.cuhk.edu.hk/people/faculty/Weiyang-Liu/", "official", "现任职务、双博士训练、Bernhard Schölkopf 博士后指导关系、产业履历、SphereLab 和官方头像"),
  jaehong: source("NTU Research · Jaehong Yoon", "https://dr.ntu.edu.sg/entities/person/Jaehong-Yoon", "official", "现任职务、KAIST 博士、UNC 博士后、Mohit Bansal 合作指导、研究方向和官方研究档案"),
  jaehongHome: source("Jaehong Yoon · faculty homepage", "https://jaehong31.github.io/index.html", "profile", "现任 NTU 身份、教育训练、导师、招募信息和头像"),
  sean: source("NTU Research · Sean Du", "https://dr.ntu.edu.sg/entities/person/Xuefeng-Du", "official", "现任职务、UW–Madison 博士与 Sharon Li 导师关系、研究方向和官方研究档案"),
  seanHome: source("Sean Du · faculty homepage", "https://d12306.github.io/", "profile", "现任 NTU 身份、教育训练、导师、研究方向、招生与头像"),
} satisfies Record<string, Source>;

type PersonSeed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & {
  portraitFile: string;
  portraitSource: Source;
};

const person = (seed: PersonSeed): Person => ({
  ...seed,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: { src: `portraits/candidate-p0-asia-batch-7-2026/${seed.portraitFile}`, alt: `${seed.name} 官方头像`, source: seed.portraitSource },
});

export const candidatePriorityP0AsiaBatch7People2026: Person[] = [
  person({
    id: "jiafei-duan-nus-p0-2026", name: "Jiafei Duan", role: "NUS Presidential Young Professor", institution: "NUS", region: "Singapore",
    area: "Embodied AI · Robot Learning · Multimodal Foundation Models", tags: ["具身智能", "机器人学习", "多模态大模型", "3D 视觉"], stage: "emerging", x: 120, y: 120,
    portraitFile: "duan-jiafei.jpg", portraitSource: sources.duan,
    summary: "NUS 具身智能与机器人基础模型青年 PI，UW 博士阶段由 Dieter Fox 和 Ranjay Krishna 共同指导，研究连接机器人推理、视觉语言模型与可扩展数据生成。",
    facts: [
      fact("当前任职", "NUS School of Computing Presidential Young Professor，并兼任 A*STAR IAIC Research Scientist。", sources.duan),
      fact("教育与学术训练", "NTU 电气与电子工程学士；University of Washington 计算机硕士、博士，博士阶段由 Dieter Fox 和 Ranjay Krishna 指导。", sources.duan),
      fact("研究主线", "具身智能、机器人学习、3D 视觉、多模态大语言模型、推理与机器人操作。", sources.duan),
      fact("研究组织", "领导 Manipulation and General Intelligence Control（MAGIC）Lab。", sources.duan),
      fact("学术成果", "NUS 主页列其工作发表于 ICLR、ICML、RSS、CoRL、ECCV、IJCAI、CoLM 与 EMNLP。", sources.duan),
    ], sources: [sources.duan, sources.roster],
  }),
  person({
    id: "lin-shao-nus-p0-2026", name: "Lin Shao", role: "Assistant Professor", institution: "NUS", region: "Singapore",
    area: "Robot Learning · Robotic Perception · Reinforcement Learning", tags: ["机器人学习", "强化学习", "物理仿真", "具身操作"], stage: "emerging", x: 280, y: 120,
    portraitFile: "lin-shao.jpg", portraitSource: sources.shao,
    summary: "NUS 机器人感知与操作 PI，Stanford 博士阶段由 Jeannette Bohg 指导、Leonidas Guibas 共同指导，研究面向通用机器人操作和可微物理仿真。",
    facts: [
      fact("当前任职", "NUS School of Computing 计算机系助理教授。", sources.shao),
      fact("教育与学术训练", "南京大学学士；Stanford University 硕士、博士，博士导师为 Jeannette Bohg，共同导师为 Leonidas J. Guibas。", sources.shao),
      fact("研究主线", "机器人感知与操作、强化学习、可微物理仿真和机器人操作基础模型。", sources.shao),
      fact("研究愿景", "建设能在真实物理环境中完成多类任务的通用机器人系统。", sources.shao),
      fact("学术服务", "担任 IEEE Robotics and Automation Society Robot Learning Technical Committee 联席主席。", sources.shao),
    ], sources: [sources.shao, sources.roster],
  }),
  person({
    id: "harold-soh-nus-p0-2026", name: "Harold Soh", role: "Associate Professor · Associate Director, NUS AI Lab", institution: "NUS", region: "Singapore",
    area: "Human-Robot Interaction · Trustworthy AI · Decision Making", tags: ["人机协作", "可信 AI", "机器人", "决策"], stage: "senior", x: 440, y: 120,
    portraitFile: "harold-soh.jpg", portraitSource: sources.soh,
    summary: "NUS 可信协作机器人副教授，领导 CLeAR Group 并任 NUS AI Lab 副主任，研究从人类信任建模延伸到触觉感知与机器人决策。",
    facts: [
      fact("当前任职", "NUS 计算机系副教授、Computing Horizons Office 主任、NUS AI Lab 副主任。", sources.soh),
      fact("教育与学术训练", "UC Davis 计算机与经济学学士、University of Melbourne 软件工程硕士、Imperial College London 人工智能与机器人博士。", sources.soh),
      fact("博士指导", "在 Imperial College London 由 Yiannis Demiris 指导，研究面向辅助机器人的在线学习。", sources.soh),
      fact("研究主线", "可信协作机器人的机器学习与决策，覆盖人类信任建模、机器人感知和新型电子皮肤。", sources.soh),
      fact("研究组织", "在 NUS 领导 Collaborative Learning and Adaptive Robots（CLeAR）Group。", sources.soh),
    ], sources: [sources.soh, sources.roster],
  }),
  person({
    id: "jonathan-scarlett-nus-p0-2026", name: "Jonathan Scarlett", role: "Associate Professor · Assistant Dean, Graduate Studies", institution: "NUS", region: "Singapore",
    area: "Machine Learning Theory · Information Theory · Bayesian Optimization", tags: ["学习理论", "信息论", "贝叶斯优化", "高维统计"], stage: "senior", x: 600, y: 120,
    portraitFile: "jonathan-scarlett.jpg", portraitSource: sources.scarlett,
    summary: "NUS 信息论与学习理论副教授，研究贝叶斯优化、群体测试和高维统计；EPFL 博士后阶段形成与欧洲学习理论群体的持续论文连接。",
    facts: [
      fact("当前任职", "NUS 计算机系副教授、研究生事务助理院长，并兼任数学系和 Institute of Data Science。", sources.scarlett),
      fact("教育与学术训练", "University of Melbourne 电气工程学士和计算机科学学士；University of Cambridge 信息工程博士。", sources.scarlett),
      fact("任职轨迹", "2014–2017 年在 EPFL Laboratory for Information and Inference Systems 从事博士后研究。", sources.scarlett),
      fact("研究主线", "信息论、机器学习、高维统计、贝叶斯优化与群体测试。", sources.scarlett),
      fact("研究组织", "领导 Information Theory and Statistical Learning Group。", sources.scarlett),
    ], sources: [sources.scarlett, sources.roster],
  }),
  person({
    id: "siau-cheng-khoo-nus-p0-2026", name: "Siau-Cheng Khoo", role: "Associate Professor · Co-Director, Business Analytics Centre", institution: "NUS", region: "Singapore",
    area: "Programming Languages · Software Engineering · Code Analytics", tags: ["程序语言", "软件工程", "代码分析", "规约挖掘"], stage: "senior", x: 760, y: 120,
    portraitFile: "siau-cheng-khoo.jpg", portraitSource: sources.khoo,
    summary: "NUS 程序语言与代码分析资深副教授，研究静态分析、动态优化和规约挖掘，并共同建设面向产业需求的 Business Analytics Centre。",
    facts: [
      fact("当前任职", "NUS 计算机系副教授、NUS Business Analytics Centre 联席主任。", sources.khoo),
      fact("教育与学术训练", "1992 年获 Yale University 计算机科学博士。", sources.khoo),
      fact("研究主线", "程序语言、代码分析、软件工程、规约挖掘、程序分析与优化。", sources.khoo),
      fact("研究方法", "开发静态程序分析、动态程序优化和面向程序行为发现的数据挖掘方法。", sources.khoo),
      fact("产业连接", "与 NUS Business School 共同建设 Business Analytics Centre，官方简介记录该中心与新加坡 EDB、IBM 的合作。", sources.khoo),
    ], sources: [sources.khoo, sources.roster],
  }),
  person({
    id: "ye-wang-nus-p0-2026", name: "Ye Wang", role: "Associate Professor", institution: "NUS", region: "Singapore",
    area: "Sound and Music Computing · Multimedia · Health AI", tags: ["音乐计算", "多媒体", "健康 AI", "音频处理"], stage: "senior", x: 920, y: 120,
    portraitFile: "ye-wang.jpg", portraitSource: sources.wang,
    summary: "NUS 声音与音乐计算副教授，从 Nokia 工业研究转入学术界，研究音乐计算与康复健康交叉；官方主页记录其已培养 11 名博士。",
    facts: [
      fact("当前任职", "NUS School of Computing 终身副教授。", sources.wang),
      fact("教育与学术训练", "华南理工大学通信学士、Braunschweig University of Technology 通信硕士、Tampere University of Technology 信息技术博士。", sources.wang),
      fact("任职轨迹", "1994–2002 年任 Nokia Research Center 技术人员，2002 年加入 NUS。", sources.wang),
      fact("研究主线", "声音与音乐计算、移动与可穿戴计算、健康和学习应用、音频压缩。", sources.wang),
      fact("人才培养", "官方主页记录其已指导毕业 11 名博士和 20 余名 MComp 学生，当前指导 6 名博士。", sources.wang),
    ], sources: [sources.wang, sources.roster],
  }),
  person({
    id: "liwei-wang-cuhk-p0-2026", name: "Liwei Wang", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "Vision-Language Learning · NLP · Computer Vision", tags: ["多模态", "视觉语言", "NLP", "计算机视觉"], stage: "emerging", x: 1080, y: 120,
    portraitFile: "liwei-wang.jpg", portraitSource: sources.liwei,
    summary: "CUHK 视觉语言与多模态青年 PI，UIUC 博士阶段由 Svetlana Lazebnik 指导，加入教职前曾在 Tencent AI Lab Bellevue 从事 NLP 研究。",
    facts: [
      fact("当前任职", "香港中文大学计算机科学与工程系助理教授。", sources.liwei),
      fact("教育与学术训练", "University of Illinois Urbana-Champaign Computer Vision Group 博士，导师为 Svetlana Lazebnik。", sources.liwei),
      fact("产业经历", "加入 CUHK 前在 Tencent AI Lab Bellevue 的 NLP Group 任 Senior Researcher 两年多。", sources.liwei),
      fact("研究主线", "自然语言处理、计算机视觉及两者交叉的多模态语言与视觉学习。", sources.liwei),
      fact("研究组织", "在 CUHK 领导 multimodal Language and Vision（LaVi）Team。", sources.liwei),
    ], sources: [sources.liwei, sources.cuhkRoster],
  }),
  person({
    id: "weiyang-liu-cuhk-p0-2026", name: "Weiyang Liu", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong",
    area: "Machine Learning · Scalable Reasoning · Computer Vision", tags: ["机器学习", "学习原理", "可扩展推理", "计算机视觉"], stage: "emerging", x: 1240, y: 120,
    portraitFile: "weiyang-liu.jpg", portraitSource: sources.weiyang,
    summary: "CUHK 可扩展学习与推理青年 PI，拥有 Cambridge 机器学习与 Georgia Tech 计算机双博士训练，并在 Bernhard Schölkopf 团队完成博士后研究。",
    facts: [
      fact("当前任职", "香港中文大学计算机科学与工程系助理教授。", sources.weiyang),
      fact("教育与学术训练", "获 University of Cambridge 机器学习博士和 Georgia Institute of Technology 计算机科学博士。", sources.weiyang),
      fact("博士后训练", "在 Max Planck Institute for Intelligent Systems 从事博士后研究，由 Bernhard Schölkopf 指导。", sources.weiyang),
      fact("产业经历", "曾在 Google、Nvidia 和 Mitsubishi Electric Research Laboratories 从事研究。", sources.weiyang),
      fact("研究主线", "在 CUHK 领导 Scalable Principles for Learning and Reasoning Lab（SphereLab），研究可扩展学习、推理与计算机视觉。", sources.weiyang),
    ], sources: [sources.weiyang, sources.cuhkRoster],
  }),
  person({
    id: "jaehong-yoon-ntu-p0-2026", name: "Jaehong Yoon", role: "Assistant Professor", institution: "NTU", region: "Singapore",
    area: "Continual Learning · Trustworthy AI · Multimodal AI", tags: ["持续学习", "可信 AI", "多模态", "具身智能"], stage: "emerging", x: 1400, y: 120,
    portraitFile: "jaehong-yoon.jpg", portraitSource: sources.jaehongHome,
    summary: "NTU 持续学习与可信多模态 AI 青年 PI，KAIST 博士毕业后在 Mohit Bansal 的 UNC-NLP 团队做博士后，研究动态环境中的可适应 AI。",
    facts: [
      fact("当前任职", "NTU College of Computing and Data Science 助理教授。", sources.jaehong),
      fact("教育与学术训练", "UNIST 学士、硕士；KAIST School of Computing 博士，导师为 Sung Ju Hwang。", sources.jaehongHome),
      fact("博士后训练", "加入 NTU 前在 UNC Chapel Hill MURGe-Lab / UNC-NLP Group 任博士后研究员，与 Mohit Bansal 工作。", sources.jaehong),
      fact("研究主线", "持续可适应、可信且可交互的 AI，覆盖动态真实环境、多模态与具身智能。", sources.jaehong),
      fact("招生状态", "个人主页公开招募博士生和博士后。", sources.jaehongHome),
    ], sources: [sources.jaehong, sources.jaehongHome, sources.ntuRoster],
  }),
  person({
    id: "sean-du-ntu-p0-2026", name: "Sean Du", role: "Assistant Professor", institution: "NTU", region: "Singapore",
    area: "Reliable Machine Learning · Foundation Model Safety · OOD", tags: ["可靠机器学习", "基础模型安全", "OOD", "LLM 可靠性"], stage: "emerging", x: 1560, y: 120,
    portraitFile: "sean-du.jpg", portraitSource: sources.seanHome,
    summary: "NTU 可靠机器学习与基础模型安全青年 PI，UW–Madison 博士阶段由 Sharon Li 指导，研究 OOD 泛化、LLM 幻觉与基础模型安全。",
    facts: [
      fact("当前任职", "NTU College of Computing and Data Science 助理教授，并任 NTU GIFTS Faculty Affiliate。", sources.seanHome),
      fact("教育与学术训练", "西安交通大学电子工程学士；University of Wisconsin–Madison 计算机博士，导师为 Sharon Li。", sources.seanHome),
      fact("研究主线", "可靠机器学习、基础模型可靠性与安全、分布外检测和不确定性估计。", sources.sean),
      fact("大模型方向", "研究 LLM、多模态 LLM 与长程智能体的盲点、幻觉检测和缓解。", sources.seanHome),
      fact("招生状态", "个人主页公开招募博士生、研究助理、访问学生和实习生。", sources.seanHome),
    ], sources: [sources.sean, sources.seanHome, sources.ntuRoster],
  }),
];

export const candidatePriorityP0AsiaBatch7Relationships2026: Relationship[] = [
  { id: "candidate-p0-asia-b7-fox-duan", from: "dieter-fox-us", to: "jiafei-duan-nus-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "NUS 官方简介明确写明 Jiafei Duan 在 University of Washington 博士阶段由 Dieter Fox 指导。", evidenceObject: "Jiafei Duan · UW PhD", source: sources.duan, verified: true, endYear: 2026 },
  { id: "candidate-p0-asia-b7-krishna-duan", from: "ranjay-krishna-uw-award", to: "jiafei-duan-nus-p0-2026", type: "lineage", subtype: "co_adviser", label: "博士共同导师", evidence: "NUS 官方简介明确写明 Jiafei Duan 的 UW 博士阶段由 Ranjay Krishna 共同指导。", evidenceObject: "Jiafei Duan · UW PhD", source: sources.duan, verified: true, endYear: 2026 },
  { id: "candidate-p0-asia-b7-bohg-shao", from: "jeannette-bohg-stanford", to: "lin-shao-nus-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "NUS 官方简介明确写明 Lin Shao 的 Stanford 博士导师为 Jeannette Bohg。", evidenceObject: "Lin Shao · Stanford PhD", source: sources.shao, verified: true, endYear: 2021 },
  { id: "candidate-p0-asia-b7-guibas-shao", from: "leonidas-guibas-lineage", to: "lin-shao-nus-p0-2026", type: "lineage", subtype: "co_adviser", label: "博士共同导师", evidence: "NUS 官方简介明确写明 Leonidas J. Guibas 共同指导 Lin Shao 的 Stanford 博士阶段。", evidenceObject: "Lin Shao · Stanford PhD", source: sources.shao, verified: true, endYear: 2021 },
  { id: "candidate-p0-asia-b7-soh-hsu", from: "harold-soh-nus-p0-2026", to: "david-hsu-nus", type: "collaboration", subtype: "publication", label: "机器人信任建模论文合作", evidence: "Harold Soh 的 NUS 官方主页列出两人共同署名的 IJRR 2020 论文 Multi-Task Trust Transfer for Human Robot Interaction。", evidenceObject: "Multi-Task Trust Transfer for Human Robot Interaction · IJRR 2020", source: sources.soh, verified: true, recentYear: 2020 },
  { id: "candidate-p0-asia-b7-scarlett-cevher", from: "jonathan-scarlett-nus-p0-2026", to: "volkan-cevher-eu", type: "collaboration", subtype: "publication", label: "贝叶斯优化论文合作", evidence: "Jonathan Scarlett 的 NUS 官方主页列出两人共同署名的 COLT 2017 Gaussian-process bandit optimization 论文。", evidenceObject: "Lower bounds on regret for noisy Gaussian process bandit optimization · COLT 2017", source: sources.scarlett, verified: true, recentYear: 2017 },
  { id: "candidate-p0-asia-b7-khoo-roychoudhury", from: "siau-cheng-khoo-nus-p0-2026", to: "abhik-roychoudhury-nus-p0-2026", type: "collaboration", subtype: "publication", label: "软件规约论文合作", evidence: "Siau-Cheng Khoo 的 NUS 官方主页列出两人共同署名的 ICSE 2012 分布式系统规约推断论文。", evidenceObject: "Inferring class level specifications for distributed systems · ICSE 2012", source: sources.khoo, verified: true, recentYear: 2012 },
  { id: "candidate-p0-asia-b7-wang-hsu", from: "ye-wang-nus-p0-2026", to: "david-hsu-nus", type: "collaboration", subtype: "publication", label: "音乐学习系统论文合作", evidence: "Ye Wang 的 NUS 官方主页列出两人共同署名的 ACM Multimedia 2005 论文 Digital Violin Tutor。", evidenceObject: "Digital Violin Tutor · ACM Multimedia 2005", source: sources.wang, verified: true, recentYear: 2005 },
  { id: "candidate-p0-asia-b7-lazebnik-wang", from: "svetlana-lazebnik-us", to: "liwei-wang-cuhk-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "CUHK 官方简介明确写明 Liwei Wang 在 UIUC Computer Vision Group 获博士学位，导师为 Svetlana Lazebnik。", evidenceObject: "Liwei Wang · UIUC PhD", source: sources.liwei, verified: true },
  { id: "candidate-p0-asia-b7-schoelkopf-liu", from: "bernhard-schoelkopf-eu", to: "weiyang-liu-cuhk-p0-2026", type: "lineage", subtype: "postdoc_mentor", label: "博士后指导", evidence: "CUHK 官方简介明确写明 Weiyang Liu 在 MPI-IS 从事博士后研究，并由 Bernhard Schölkopf 指导。", evidenceObject: "Weiyang Liu · MPI-IS postdoc", source: sources.weiyang, verified: true },
  { id: "candidate-p0-asia-b7-bansal-yoon", from: "mohit-bansal-lineage", to: "jaehong-yoon-ntu-p0-2026", type: "lineage", subtype: "postdoc_mentor", label: "博士后合作指导", evidence: "NTU 官方研究档案与 Jaehong Yoon 主页均写明其在 UNC Chapel Hill 博士后阶段与 Mohit Bansal 工作。", evidenceObject: "Jaehong Yoon · UNC postdoc", source: sources.jaehong, verified: true },
  { id: "candidate-p0-asia-b7-li-du", from: "sharon-li-wisc-2026", to: "sean-du-ntu-p0-2026", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "NTU 官方研究档案与 Sean Du 主页均明确写明其 UW–Madison 计算机博士导师为 Sharon Li。", evidenceObject: "Sean Du · UW–Madison PhD", source: sources.sean, verified: true, endYear: 2025 },
];

export const candidatePriorityP0AsiaBatch7Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0AsiaBatch7GroupMembers2026: GroupMember[] = [];

export type CandidatePriorityP0AsiaBatch7RosterPromotion2026 = { unitUrl: string; rosterName: string; atlasPersonId: string };
export const candidatePriorityP0AsiaBatch7RosterPromotions2026: CandidatePriorityP0AsiaBatch7RosterPromotion2026[] = [
  { unitUrl: sources.roster.url, rosterName: "DUAN Jiafei", atlasPersonId: "jiafei-duan-nus-p0-2026" },
  { unitUrl: sources.roster.url, rosterName: "Lin SHAO", atlasPersonId: "lin-shao-nus-p0-2026" },
  { unitUrl: sources.roster.url, rosterName: "Harold SOH Soon Hong", atlasPersonId: "harold-soh-nus-p0-2026" },
  { unitUrl: sources.roster.url, rosterName: "Jonathan SCARLETT", atlasPersonId: "jonathan-scarlett-nus-p0-2026" },
  { unitUrl: sources.roster.url, rosterName: "KHOO Siau Cheng", atlasPersonId: "siau-cheng-khoo-nus-p0-2026" },
  { unitUrl: sources.roster.url, rosterName: "WANG Ye", atlasPersonId: "ye-wang-nus-p0-2026" },
  { unitUrl: sources.cuhkRoster.url, rosterName: "Liwei Wang", atlasPersonId: "liwei-wang-cuhk-p0-2026" },
  { unitUrl: sources.cuhkRoster.url, rosterName: "Weiyang Liu", atlasPersonId: "weiyang-liu-cuhk-p0-2026" },
  { unitUrl: sources.ntuRoster.url, rosterName: "Asst Prof Jaehong Yoon", atlasPersonId: "jaehong-yoon-ntu-p0-2026" },
  { unitUrl: sources.ntuRoster.url, rosterName: "Asst Prof Sean Du", atlasPersonId: "sean-du-ntu-p0-2026" },
];

// These roster rows resolve to already-published atlas people. They remain separate
// from the new-PI promotions above so integration cannot accidentally duplicate a node.
export const candidatePriorityP0AsiaBatch7DuplicateRosterPromotions2026: CandidatePriorityP0AsiaBatch7RosterPromotion2026[] = [
  { unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", rosterName: "Hang Su", atlasPersonId: "hang-su-thu" },
  { unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", rosterName: "Juanzi LI", atlasPersonId: "juanzi-li-thu" },
  { unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", rosterName: "Lei Hou", atlasPersonId: "lei-hou-thu" },
  { unitUrl: sources.roster.url, rosterName: "Bryan HOOI Kuen-Yew", atlasPersonId: "bryan-hooi" },
  { unitUrl: sources.roster.url, rosterName: "Mike SHOU", atlasPersonId: "mike-zheng-shou" },
  { unitUrl: sources.roster.url, rosterName: "Qizhe XIE", atlasPersonId: "qizhe-shieh" },
  { unitUrl: "https://www.polyu.edu.hk/comp/people/academic-staff/", rosterName: "Prof. LI Wenjie Maggie", atlasPersonId: "wenjie-li" },
  { unitUrl: "https://www.polyu.edu.hk/comp/people/academic-staff/", rosterName: "Prof. ZHANG Lei John", atlasPersonId: "lei-zhang-polyu" },
  { unitUrl: "https://ai.nju.edu.cn/people/list.htm", rosterName: "周志华（院士）", atlasPersonId: "zhihua-zhou-nju" },
  { unitUrl: "https://cs.nju.edu.cn/1651/list.htm", rosterName: "谭铁牛（院士、博导）", atlasPersonId: "tieniu-tan-cas" },
];

export const People = candidatePriorityP0AsiaBatch7People2026;
export const Relationships = candidatePriorityP0AsiaBatch7Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch7Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch7GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch7RosterPromotions2026;
export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
export const DuplicateRosterPromotions = candidatePriorityP0AsiaBatch7DuplicateRosterPromotions2026;
export const duplicateRosterPromotions = DuplicateRosterPromotions;
