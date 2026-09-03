import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  roster: source("ETH Zurich D-INFK · Faculty", "https://inf.ethz.ch/people/faculty.html", "official", "ETH D-INFK 现任教授名录、职称与院系归属"),
  gaertnerCareer: source("Bernd Gärtner · Professional Career", "https://people.inf.ethz.ch/gaertner/subdir/about_me.html", "profile", "Freie Universität Berlin 数学教育、Emo Welzl 指导的硕博训练、产业经历与 ETH 任职"),
  gaertnerStudents: source("Bernd Gärtner · Former PhD Students", "https://people.inf.ethz.ch/gaertner/subdir/students/students.html", "profile", "官方个人页明确列出 15 位由 Bernd Gärtner 主指导并已完成学位的博士生"),
  hofheinzProfile: source("Dennis Hofheinz · academic homepage", "https://people.inf.ethz.ch/dhofheinz/", "profile", "ETH Foundations of Cryptography Group、研究目标与公开成果"),
  hofheinzInterview: source("ETH D-INFK · Dennis Hofheinz interview", "https://inf.ethz.ch/de/news-und-veranstaltungen/spotlights/infk-news-channel/2024/03/bei-einer-forschungskarriere-spielt-das-glueck-immer-eine-rolle.html", "official", "KIT 教育、CWI 博后、KIT 教职、ETH 组长与学习导师脉络"),
  hofheinzGroup: source("Foundations of Cryptography · People", "https://foc.ethz.ch/", "official", "Dennis Hofheinz 为教授，并逐名列出博士后和博士生等当前团队成员"),
  bringmannEth: source("ETH D-INFK · Welcome Karl Bringmann", "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/01/welcome-karl-bringmann.html", "official", "ETH Full Professor 任职、Saarland 经历、组合算法与 fine-grained complexity 研究"),
  bringmannHome: source("Karl Bringmann · Max Planck academic homepage", "https://people.mpi-inf.mpg.de/~kbringma/", "profile", "Saarland/Max Planck 任职、研究范围、奖项与转任 ETH 信息"),
  bringmannDegree: source("Saarland University Repository · Karl Bringmann dissertation", "https://publikationen.sulb.uni-saarland.de/bitstream/20.500.11880/25473/1/thesis_final.pdf", "official", "Karl Bringmann 于 Saarland University 提交的 2014 年博士论文及学位信息"),
  bringmannThesis: source("Saarland University Repository · Algorithmic Results for Clustering", "https://publikationen.sulb.uni-saarland.de/bitstream/20.500.11880/27234/1/thesis.pdf", "official", "博士论文致谢明确 Karl Bringmann 与 Kurt Mehlhorn 共同指导该博士研究"),
  kokologiannakisProfile: source("Michalis Kokologiannakis · academic homepage", "https://people.inf.ethz.ch/mkokologiann/", "profile", "ETH Assistant Professor、NTUA MEng、MPI-SWS PhD、研究方向与工具"),
  kokologiannakisWelcome: source("ETH D-INFK · Welcome Michalis Kokologiannakis", "https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2024/08/welcome-michalis-kologiannakis.html", "official", "2023 年获聘、MPI-SWS 博士与博后训练、自动推理和并发验证研究"),
  kokologiannakisTeam: source("Automated Reasoning and Verification Group · People", "https://arv.inf.ethz.ch/people.html", "official", "Michalis Kokologiannakis 为组长，并列出当前博士生 Matthias Roshardt 与 Yuchen Gu"),
} satisfies Record<string, Source>;

const fact = (label: string, value: string, s: Source) => ({ label, value, source: s });

type Seed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & {
  portraitPath: string;
  portraitSource: Source;
};

const person = (s: Seed): Person => ({
  ...s,
  category: "core",
  primary: true,
  status: "current independent PI · official profile verified",
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: { src: s.portraitPath, alt: `${s.name} 头像`, source: s.portraitSource },
});

export const candidatePriorityP0EuropeBatch13People2026: Person[] = [
  person({
    id: "bernd-gartner-eth-p0-2026",
    name: "Bernd Gärtner",
    role: "Professor · Theory of Combinatorial Algorithms",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Algorithms · Combinatorial Optimization · Computational Geometry",
    tags: ["Algorithms", "Optimization", "Computational Geometry", "Machine Learning Theory"],
    summary: "ETH 组合算法与优化资深教授，师承 Emo Welzl，并已形成覆盖优化、机器学习与计算几何的博士生网络。",
    stage: "senior",
    x: 150,
    y: 240,
    portraitPath: "portraits/candidate-p0-europe-profile-audit-2026/Europe-ETH-Zurich-berndgartner.jpg",
    portraitSource: sources.roster,
    facts: [
      fact("当前任职", "2013 年起任 ETH Zurich Department of Computer Science 教授，参与 Theory of Combinatorial Algorithms Group。", sources.gaertnerCareer),
      fact("教育与学术训练", "在 Freie Universität Berlin 学习数学并完成计算机科学博士；硕士和博士论文均由 Emo Welzl 指导。", sources.gaertnerCareer),
      fact("研究主线", "研究组合算法、计算几何、随机优化及其与机器学习优化方法的连接。", sources.gaertnerCareer),
      fact("学生体系", "官方个人页记录 15 位已完成学位、由其担任主导师的博士生，包括 Martin Jaggi、Sebastian Stich 与 Hemant Tyagi。", sources.gaertnerStudents),
      fact("产业经历", "2001–2002 年曾任 Perspectix AG 软件工程师，之后回到学术界。", sources.gaertnerCareer),
    ],
    sources: [sources.roster, sources.gaertnerCareer, sources.gaertnerStudents],
  }),
  person({
    id: "dennis-hofheinz-eth-p0-2026",
    name: "Dennis Hofheinz",
    role: "Professor · Foundations of Cryptography Group Head",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Theoretical Cryptography · Provable Security",
    tags: ["Cryptography", "Provable Security", "Information Security", "Theory"],
    summary: "ETH Foundations of Cryptography Group 负责人，连接 KIT、CWI 与 ETH 密码学网络，专注可证明安全且可部署的密码构件。",
    stage: "senior",
    x: 360,
    y: 240,
    portraitPath: "portraits/candidate-p0-europe-profile-audit-2026/Europe-ETH-Zurich-dennishofheinz.jpg",
    portraitSource: sources.roster,
    facts: [
      fact("当前任职", "自 2020 年起领导 ETH Zurich Foundations of Cryptography Group；2024 年起曾任 D-INFK Studiendirektor。", sources.hofheinzInterview),
      fact("教育与学术训练", "在 Karlsruhe 学习计算机科学，随后在 Amsterdam 的 Centrum Wiskunde & Informatica 从事博士后研究，并在 Ronald Cramer 组内接受训练。", sources.hofheinzInterview),
      fact("研究主线", "研究公钥加密、数字签名、代码混淆，以及具有严格安全证明且面向大规模信息系统的密码构件。", sources.hofheinzProfile),
      fact("任职经历", "加入 ETH 前曾在 Karlsruhe Institute of Technology 任 Junior Professor 和教授。", sources.hofheinzInterview),
      fact("团队建设", "官方组页逐名列出当前博士后与博士生，并持续发布团队研究动态。", sources.hofheinzGroup),
    ],
    sources: [sources.roster, sources.hofheinzProfile, sources.hofheinzInterview, sources.hofheinzGroup],
  }),
  person({
    id: "karl-bringmann-eth-p0-2026",
    name: "Karl Bringmann",
    role: "Full Professor · Theoretical Computer Science",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Fine-Grained Complexity · Combinatorial Algorithms",
    tags: ["Fine-Grained Complexity", "Algorithms", "Optimization", "Computational Geometry"],
    summary: "ETH 理论计算机科学教授，以 fine-grained complexity 和高效组合算法连接 Saarland、MPI-INF 与 ETH。",
    stage: "senior",
    x: 570,
    y: 240,
    portraitPath: "portraits/candidate-p0-europe-profile-audit-2026/Europe-ETH-Zurich-karlbringmann.jpg",
    portraitSource: sources.roster,
    facts: [
      fact("当前任职", "2025 年获聘 ETH Zurich Full Professor of Computer Science，并于 2026 年到任。", sources.bringmannEth),
      fact("教育与学术训练", "2014 年在 Saarland University 完成计算机科学博士论文《Sampling from Discrete Distributions and Computing Fréchet Distances》。", sources.bringmannDegree),
      fact("研究主线", "研究组合算法、fine-grained complexity、优化、计算几何、图和字符串问题，并探索更现实的计算模型。", sources.bringmannEth),
      fact("任职经历", "转任 ETH 前为 Saarland University 教授并附属于 Max Planck Institute for Informatics。", sources.bringmannHome),
      fact("学术荣誉", "曾获 EATCS Distinguished Dissertation Award、Presburger Award、Heinz Maier-Leibnitz Prize 与 ERC Starting Grant。", sources.bringmannHome),
    ],
    sources: [sources.roster, sources.bringmannEth, sources.bringmannHome, sources.bringmannDegree, sources.bringmannThesis],
  }),
  person({
    id: "michalis-kokologiannakis-eth-p0-2026",
    name: "Michalis Kokologiannakis",
    role: "Assistant Professor · ARV Group Head",
    institution: "ETH Zurich",
    region: "Europe",
    area: "Automated Reasoning · Software Verification · Programming Languages",
    tags: ["Formal Verification", "Programming Languages", "Concurrency", "Automated Reasoning"],
    summary: "ETH Automated Reasoning and Verification Group 负责人，研究并发程序、弱内存模型与可扩展软件验证工具。",
    stage: "emerging",
    x: 780,
    y: 240,
    portraitPath: "portraits/candidate-p0-europe-profile-audit-2026/Europe-ETH-Zurich-michaliskokologiannakis.jpg",
    portraitSource: sources.roster,
    facts: [
      fact("当前任职", "ETH Zurich Assistant Professor，并领导 Automated Reasoning and Verification Group。", sources.kokologiannakisTeam),
      fact("教育与学术训练", "在 National Technical University of Athens 获 MEng，在 Max Planck Institute for Software Systems 完成博士并继续从事博士后研究。", sources.kokologiannakisProfile),
      fact("研究主线", "研究程序语言、编译器、自动推理与软件验证，重点关注并发程序和现代处理器弱内存模型。", sources.kokologiannakisProfile),
      fact("工具建设", "开发 GenMC 与 Kater 等模型检测和内存模型验证工具，强调可复用研究软件。", sources.kokologiannakisProfile),
      fact("团队建设", "官方组页列出 Matthias Roshardt 与 Yuchen Gu 等当前博士生。", sources.kokologiannakisTeam),
    ],
    sources: [sources.roster, sources.kokologiannakisProfile, sources.kokologiannakisWelcome, sources.kokologiannakisTeam],
  }),
];

export const candidatePriorityP0EuropeBatch13Relationships2026: Relationship[] = [];
export const candidatePriorityP0EuropeBatch13Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0EuropeBatch13GroupMembers2026: GroupMember[] = [
  { id: "p0-eu13-gartner-martin-jaggi", teacherId: "bernd-gartner-eth-p0-2026", name: "Martin Jaggi", role: "Former PhD student · main supervisor Bernd Gärtner", focus: "Sparse convex optimization for machine learning", source: sources.gaertnerStudents },
  { id: "p0-eu13-hofheinz-kristina-hostakova", teacherId: "dennis-hofheinz-eth-p0-2026", name: "Kristina Hostáková", role: "Current postdoctoral researcher", focus: "Foundations of cryptography", source: sources.hofheinzGroup },
  { id: "p0-eu13-bringmann-vincent-cohen-addad", teacherId: "karl-bringmann-eth-p0-2026", name: "Vincent Cohen-Addad", role: "Former doctoral researcher · co-supervised by Karl Bringmann and Kurt Mehlhorn", focus: "Algorithmic clustering", source: sources.bringmannThesis },
  { id: "p0-eu13-kokologiannakis-matthias-roshardt", teacherId: "michalis-kokologiannakis-eth-p0-2026", name: "Matthias Roshardt", role: "Current PhD student", focus: "Automated reasoning and verification", source: sources.kokologiannakisTeam },
];

export const candidatePriorityP0EuropeBatch13RosterPromotions2026 = [
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Bernd Gärtner", atlasPersonId: "bernd-gartner-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Dennis Hofheinz", atlasPersonId: "dennis-hofheinz-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Karl Bringmann", atlasPersonId: "karl-bringmann-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Michalis Kokologiannakis", atlasPersonId: "michalis-kokologiannakis-eth-p0-2026" },
] as const;

export const people = candidatePriorityP0EuropeBatch13People2026;
export const relationships = candidatePriorityP0EuropeBatch13Relationships2026;
export const placements = candidatePriorityP0EuropeBatch13Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch13GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch13RosterPromotions2026;
