import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const src = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, source: Source) => ({ label, value, source });

const sources = {
  isbell: src("Illinois Siebel School · Charles L. Isbell, Jr.", "https://siebelschool.illinois.edu/about/people/all-faculty/isbell", "official", "Current Illinois chancellor and computing professor appointment"),
  isbellBio: src("Office of the Chancellor · Charles L. Isbell, Jr.", "https://chancellor.illinois.edu/about/", "official", "Education, career trajectory and human-centered AI research"),
  isbellMentor: src("MIT CSAIL · Rodney Brooks graduated PhDs", "https://people.csail.mit.edu/brooks/phd%20students.html", "official", "Rodney Brooks lists Charles Isbell as a 1998 supervised PhD, jointly with Paul Viola"),
  valiant: src("Stanford Computer Science · Gregory Valiant", "https://www.cs.stanford.edu/people/gregory-valiant", "official", "Current Stanford Computer Science appointment"),
  valiantProfile: src("Stanford Profiles · Gregory Valiant", "https://profiles.stanford.edu/gregory-valiant", "official", "Education, research interests and named doctoral advisees"),
  valiantCv: src("Gregory Valiant · Stanford CV", "https://theory.stanford.edu/~valiant/CV_Valiant", "cv", "Academic history and Microsoft/IBM research training"),
  landay: src("Stanford Computer Science · James Landay", "https://www.cs.stanford.edu/people/james-landay", "official", "Current Stanford Computer Science and HAI leadership appointment"),
  landayProfile: src("Stanford Profiles · James Landay", "https://profiles.stanford.edu/james-landay", "official", "Education, faculty trajectory, Intel Labs and NetRaker roles"),
  landayLab: src("Stanford Ambient Intelligence Lab", "https://ami.stanford.edu/", "profile", "Current lab people and multimodal health-interface research"),
  dror: src("Stanford Computer Science · Ron Dror", "https://www.cs.stanford.edu/people/ron-dror", "official", "Current Stanford Computer Science appointment"),
  drorBio: src("Dror Lab · Ron Dror", "https://drorlab.stanford.edu/rondror.html", "profile", "Education, research program and D. E. Shaw Research role"),
  drorPeople: src("Dror Lab · People", "https://drorlab.stanford.edu/people.html", "profile", "Current doctoral students and postdoctoral researchers"),
};

type Seed = Omit<Person, "portrait" | "category" | "status" | "primary" | "introducedAt" | "lastVerifiedAt">;
const person = (seed: Seed, file: string, portraitUrl: string): Person => ({
  ...seed,
  category: "core",
  status: "current independent PI · official faculty profile verified",
  primary: true,
  introducedAt: checkedAt,
  lastVerifiedAt: checkedAt,
  portrait: {
    src: `portraits/candidate-p0-us-canada-ready-batch-13-2026/${file}.jpg`,
    alt: `${seed.name} 官方头像`,
    source: src(`${seed.institution} portrait · ${seed.name}`, portraitUrl, "official", "Official university portrait"),
  },
});

export const candidatePriorityP0UsCanadaReadyBatch13People2026: Person[] = [
  person({ id: "charles-isbell-uiuc-p0-b13", name: "Charles L. Isbell, Jr.", role: "Chancellor and Professor", institution: "UIUC", region: "United States", area: "Interactive AI · Reinforcement Learning · Computing Education", tags: ["交互式AI", "强化学习", "负责任AI", "计算教育"], summary: "以交互式机器学习和普惠计算教育连接 AI 研究与大学治理的 UIUC 校长、计算机教授。", stage: "senior", x: 120, y: 120, sources: [sources.isbell, sources.isbellBio, sources.isbellMentor], facts: [fact("当前任职", "2025 年起任 UIUC 第 11 任校长，学术归属为 Siebel School of Computing and Data Science。", sources.isbellBio), fact("教育与学术训练", "Georgia Tech 信息与计算机科学学士；MIT EECS 硕士及博士（1998）。", sources.isbellBio), fact("研究主线", "人工智能与机器学习，重点关注系统与人的交互、责任与包容性。", sources.isbellBio), fact("产业经历", "博士毕业后曾在 AT&T Labs/Research 工作，2002 年回到 Georgia Tech 任教。", sources.isbellBio), fact("学术领导", "曾任 Georgia Tech College of Computing 院长、Wisconsin–Madison 教务长。", sources.isbellBio)] }, "charles-isbell", "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=163743&s=400&type=portrait"),
  person({ id: "gregory-valiant-stanford-p0-b13", name: "Gregory Valiant", role: "Associate Professor of Computer Science", institution: "Stanford", region: "United States", area: "Machine Learning Theory · Algorithms · Statistics", tags: ["机器学习理论", "算法", "统计", "数据中心AI"], summary: "研究学习、统计与信息提取可行性边界的 Stanford 理论机器学习 PI。", stage: "senior", x: 300, y: 120, sources: [sources.valiant, sources.valiantProfile, sources.valiantCv], facts: [fact("当前任职", "Stanford Computer Science 副教授，并为 HAI Faculty Affiliate。", sources.valiantProfile), fact("教育与学术训练", "Harvard 数学 BA（2006）；UC Berkeley Computer Science PhD（2012）。", sources.valiantProfile), fact("研究主线", "算法、学习、应用概率与统计，关注机器学习和数据中心应用中的信息提取极限。", sources.valiantProfile), fact("研究经历", "博士后阶段在 Microsoft Research New England；博士期间曾在 Microsoft Research 与 IBM Research 实习。", sources.valiantCv), fact("学生体系", "Stanford Profiles 公开列出 Steven Cao、Chirag Pabbaraju、Aidan Perreault 等博士共同指导关系。", sources.valiantProfile)] }, "gregory-valiant", "https://www.cs.stanford.edu/sites/g/files/sbiybj28076/files/styles/square_1900/public/media/person/gregory-valiant1509504690906.jpg?h=ab2a7541&itok=BdwAPDlE"),
  person({ id: "james-landay-stanford-p0-b13", name: "James Landay", role: "Professor · Co-Director, Stanford HAI", institution: "Stanford", region: "United States", area: "Human-Computer Interaction · Human-Centered AI · Multimodal Systems", tags: ["人机交互", "以人为本AI", "多模态", "健康计算"], summary: "从人机交互出发塑造以人为本 AI、并共同领导 Stanford HAI 的资深 PI。", stage: "senior", x: 480, y: 120, sources: [sources.landay, sources.landayProfile, sources.landayLab], facts: [fact("当前任职", "Stanford Computer Science 教授、Stanford HAI 联合主任。", sources.landayProfile), fact("教育与学术训练", "UC Berkeley EECS BS（1990）；Carnegie Mellon Computer Science MS（1993）与 PhD（1996）。", sources.landayProfile), fact("研究主线", "人机交互、以人为本 AI、普适与多模态交互系统。", sources.landayProfile), fact("产业经历", "曾任 Intel Labs Seattle 主任，并共同创办 NetRaker；该公司 2004 年被 KeyNote Systems 收购。", sources.landayProfile), fact("当前团队", "Stanford Ambient Intelligence Lab 页面列出其与 Ehsan Adeli、Andrea Cuadra 等共同开展多模态健康智能研究。", sources.landayLab)] }, "james-landay", "https://www.cs.stanford.edu/sites/g/files/sbiybj28076/files/styles/square_1900/public/media/person/james-landay1550864054869.jpg?h=4d1e379c&itok=yqG9V51i"),
  person({ id: "ron-dror-stanford-p0-b13", name: "Ron Dror", role: "Cheriton Family Professor", institution: "Stanford", region: "United States", area: "Machine Learning · Computational Biology · Drug Discovery", tags: ["机器学习", "计算生物学", "药物发现", "分子模拟"], summary: "把机器学习和大规模分子模拟用于生物机制与药物发现的 Stanford PI。", stage: "senior", x: 660, y: 120, sources: [sources.dror, sources.drorBio, sources.drorPeople], facts: [fact("当前任职", "Stanford Cheriton Family Professor，主聘 Computer Science，并交叉 Structural Biology 等单位。", sources.drorBio), fact("教育与学术训练", "Rice 数学与电气计算机工程本科学位；Cambridge Biological Sciences MPhil；MIT EECS PhD。", sources.drorBio), fact("研究主线", "分子模拟与机器学习，用于解释生物分子结构、动力学与功能并指导药物设计。", sources.drorBio), fact("产业经历", "加入 Stanford 前是 D. E. Shaw Research 首位员工并任二号负责人。", sources.drorBio), fact("学生体系", "实验室公开列出 Daniel Richman、Ayush Pandit 等在读计算机博士生及跨学科博士生。", sources.drorPeople)] }, "ron-dror", "https://www.cs.stanford.edu/sites/g/files/sbiybj28076/files/styles/square_1900/public/media/person/ron-dror1520301604203.jpg?h=3e18aca6&itok=NUMM2_JK"),
];

export const candidatePriorityP0UsCanadaReadyBatch13SupportingPeople2026: Person[] = [{ id: "rodney-brooks-lineage-p0-b13", name: "Rodney Brooks", role: "Professor Emeritus · doctoral adviser", institution: "MIT", region: "United States", area: "Robotics · Artificial Intelligence", tags: ["机器人", "人工智能", "博士导师"], summary: "Charles Isbell 博士阶段的指导教师。", stage: "historical", category: "historical", status: "supporting mentor node · relationship evidence only", primary: false, x: 120, y: 20, sources: [sources.isbellMentor], lastVerifiedAt: checkedAt }];

export const candidatePriorityP0UsCanadaReadyBatch13Relationships2026: Relationship[] = [{ id: "p0-usca-b13-brooks-isbell", from: "rodney-brooks-lineage-p0-b13", to: "charles-isbell-uiuc-p0-b13", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Rodney Brooks 的 MIT CSAIL 学生页列出 Charles Isbell 为其 1998 年毕业博士，并注明与 Paul Viola 联合指导。", source: sources.isbellMentor, verified: true, endYear: 1998 }];

export const candidatePriorityP0UsCanadaReadyBatch13GroupMembers2026: GroupMember[] = [
  { id: "p0-usca-b13-valiant-advisees", teacherId: "gregory-valiant-stanford-p0-b13", name: "Valiant doctoral advisees", role: "Doctoral co-advisees and program advisees", source: sources.valiantProfile },
  { id: "p0-usca-b13-landay-team", teacherId: "james-landay-stanford-p0-b13", name: "Stanford Ambient Intelligence Lab team", role: "Faculty and researchers", source: sources.landayLab },
  { id: "p0-usca-b13-dror-students", teacherId: "ron-dror-stanford-p0-b13", name: "Dror Lab doctoral students", role: "PhD students", source: sources.drorPeople },
];

export const candidatePriorityP0UsCanadaReadyBatch13Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0UsCanadaReadyBatch13RosterPromotions2026 = [
  { unitUrl: "https://siebelschool.illinois.edu/about/people/all-faculty", rosterName: "Charles L. Isbell, Jr.", atlasPersonId: "charles-isbell-uiuc-p0-b13" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Gregory Valiant", atlasPersonId: "gregory-valiant-stanford-p0-b13" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "James Landay", atlasPersonId: "james-landay-stanford-p0-b13" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Ron Dror", atlasPersonId: "ron-dror-stanford-p0-b13" },
];

export const people = [...candidatePriorityP0UsCanadaReadyBatch13People2026, ...candidatePriorityP0UsCanadaReadyBatch13SupportingPeople2026];
export const relationships = candidatePriorityP0UsCanadaReadyBatch13Relationships2026;
export const placements = candidatePriorityP0UsCanadaReadyBatch13Placements2026;
export const groupMembers = candidatePriorityP0UsCanadaReadyBatch13GroupMembers2026;
export const rosterPromotions = candidatePriorityP0UsCanadaReadyBatch13RosterPromotions2026;
