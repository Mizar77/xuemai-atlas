import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";
const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const sources = {
  roster: source("ETH Zurich D-INFK · Faculty", "https://inf.ethz.ch/people/faculty.html", "official", "ETH Zurich D-INFK 现任教授名录、职称和研究范围"),
  mueller: source("ETH Programming Methodology · Peter Müller", "https://www.pm.inf.ethz.ch/people/personal/pmueller-pers.html", "official", "Programming Methodology Group 负责人、Hagen 博士、Microsoft Research 与 Deutsche Bank 经历、研究方向"),
  muellerBio: source("ETH · Peter Müller ACM Fellow", "https://ethz.ch/staffnet/en/news-and-events/internal-news/archive/2026/01/peter-mueller-acm-fellow.html", "official", "TUM 1996 Diplom、Hagen 2001 博士、ETH Full Professor 与研究领导履历"),
  eilers: source("ETH Programming Methodology · Marco Eilers", "https://www.pm.inf.ethz.ch/people/personal/meilers-pers.html", "official", "Marco Eilers 明确记录其 2022 年 ETH 博士由 Peter Müller 指导"),
  patersonBio: source("ETH · Welcome Professor Kenny Paterson", "https://inf.ethz.ch/news-and-events/spotlights/2019/04/welcome-prof-kenny-paterson.html", "official", "2019 年加入 ETH、此前 Royal Holloway 任职及应用密码研究方向"),
  patersonEducation: source("ETH ZISC · Kenny Paterson biography", "https://zisc.ethz.ch/events/zisc-workshop-2014/", "official", "1993 年离散数学博士、HP Labs 与 Royal Holloway 经历、应用密码与网络安全研究"),
  patersonStudent: source("ETH Applied Cryptography · 2022 news", "https://appliedcrypto.ethz.ch/news-events/news-events-archive/2022.html", "official", "Kien Tuong Truong 加入 Applied Cryptography Group 任博士生及研究主题"),
  traub: source("Vera Traub · ETH academic homepage", "https://people.inf.ethz.ch/vtraub/", "profile", "ETH Associate Professor、Bonn 博士与 Jens Vygen 指导、Rico Zenklusen 博后、研究方向和当前博士生名单"),
} satisfies Record<string, Source>;
const fact = (label: string, value: string, s: Source) => ({ label, value, source: s });
type Seed = Omit<Person, "category" | "primary" | "status" | "introducedAt" | "lastVerifiedAt" | "portrait"> & { portraitFile: string; portraitSource: Source };
const person = (s: Seed): Person => ({ ...s, category: "core", primary: true, status: "current independent PI · official profile verified", introducedAt: checkedAt, lastVerifiedAt: checkedAt, portrait: { src: `portraits/candidate-p0-europe-batch-11-2026/${s.portraitFile}`, alt: `${s.name} 头像`, source: s.portraitSource } });
export const candidatePriorityP0EuropeBatch11People2026: Person[] = [
  person({ id: "peter-muller-eth-p0-2026", name: "Peter Müller", role: "Full Professor · Programming Methodology Group Head", institution: "ETH Zurich", region: "Europe", area: "Program Verification · Programming Languages · Software Engineering", tags: ["Program Verification", "Programming Languages", "Software Engineering", "AI-assisted Programming"], summary: "ETH Programming Methodology Group 负责人，研究可验证软件、程序语言与自动推理，并连接 Microsoft Research、产业软件工程和持续博士培养。", stage: "senior", x: 180, y: 240, portraitFile: "peter-muller.jpg", portraitSource: sources.roster, facts: [fact("当前任职", "自 2008 年起领导 ETH Programming Methodology Group，现为 Full Professor。", sources.mueller), fact("教育与学术训练", "1996 年获 Technical University of Munich 计算机科学 Diplom，2001 年在 University of Hagen 获博士。", sources.muellerBio), fact("研究主线", "研究构建正确软件所需的语言、方法和工具，重点包括自动化、模块化程序验证。", sources.mueller), fact("产业经历", "曾任 Microsoft Research Redmond researcher，并在 Deutsche Bank 任项目经理。", sources.mueller)], sources: [sources.roster, sources.mueller, sources.muellerBio, sources.eilers] }),
  person({ id: "kenny-paterson-eth-p0-2026", name: "Kenny Paterson", role: "Professor · Applied Cryptography Group", institution: "ETH Zurich", region: "Europe", area: "Applied Cryptography · Protocol Security · Privacy", tags: ["Applied Cryptography", "Protocol Security", "TLS", "Privacy"], summary: "ETH Applied Cryptography Group 教授，研究真实世界密码协议与网络安全，履历连接 HP Labs、Royal Holloway 和 ETH 密码学人才网络。", stage: "senior", x: 460, y: 240, portraitFile: "kenny-paterson.jpg", portraitSource: sources.roster, facts: [fact("当前任职", "2019 年加入 ETH Zurich Department of Computer Science，任 Applied Cryptography Professor。", sources.patersonBio), fact("教育与学术训练", "1993 年在离散数学方向取得博士学位，之后研究重心转向密码学和网络安全。", sources.patersonEducation), fact("研究主线", "研究应用密码、真实世界协议及 IPsec、TLS、SSH 等网络协议的安全性。", sources.patersonEducation), fact("产业经历", "1996–2001 年在 Hewlett-Packard European Research Laboratories 任技术人员与项目经理，后赴 Royal Holloway。", sources.patersonEducation)], sources: [sources.roster, sources.patersonBio, sources.patersonEducation, sources.patersonStudent] }),
  person({ id: "vera-traub-eth-p0-2026", name: "Vera Traub", role: "Associate Professor", institution: "ETH Zurich", region: "Europe", area: "Combinatorial Optimization · Approximation Algorithms", tags: ["Combinatorial Optimization", "Approximation Algorithms", "TSP", "Network Design"], summary: "ETH 组合优化与近似算法教授，研究旅行商、Steiner tree 与网络设计问题，师承 Jens Vygen，并在 Rico Zenklusen 团队完成博士后训练。", stage: "emerging", x: 740, y: 240, portraitFile: "vera-traub.jpg", portraitSource: sources.roster, facts: [fact("当前任职", "2025 年加入 ETH Zurich，现任 Department of Computer Science Associate Professor。", sources.traub), fact("教育与学术训练", "2020 年在 University of Bonn 获博士，导师 Jens Vygen；2020–2022 年在 ETH Rico Zenklusen 团队从事博士后研究。", sources.traub), fact("研究主线", "研究组合优化与近似算法，具体包括旅行商问题、Steiner trees 和网络设计。", sources.traub), fact("团队建设", "个人主页列出 Manuel Christalla、Sharat Ibrahimpur、Paul Paschmanns 与 Theophile Thiery 等当前博士生和博士后。", sources.traub)], sources: [sources.roster, sources.traub] }),
];
export const candidatePriorityP0EuropeBatch11Relationships2026: Relationship[] = [];
export const candidatePriorityP0EuropeBatch11Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0EuropeBatch11GroupMembers2026: GroupMember[] = [
  { id: "p0-eu11-mueller-marco-eilers", teacherId: "peter-muller-eth-p0-2026", name: "Marco Eilers", role: "Completed PhD student · 2022", focus: "Program verification", source: sources.eilers },
  { id: "p0-eu11-paterson-kien-truong", teacherId: "kenny-paterson-eth-p0-2026", name: "Kien Tuong Truong", role: "Applied Cryptography Group doctoral student", focus: "Real-world cryptographic protocols", source: sources.patersonStudent },
  { id: "p0-eu11-traub-paul-paschmanns", teacherId: "vera-traub-eth-p0-2026", name: "Paul Paschmanns", role: "Current PhD student", focus: "Approximation algorithms and Steiner trees", source: sources.traub },
];
export const candidatePriorityP0EuropeBatch11RosterPromotions2026 = [
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Peter Müller", atlasPersonId: "peter-muller-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Kenny Paterson", atlasPersonId: "kenny-paterson-eth-p0-2026" },
  { unitUrl: "https://inf.ethz.ch/people/faculty.html", rosterName: "Vera Traub", atlasPersonId: "vera-traub-eth-p0-2026" },
] as const;
export const people = candidatePriorityP0EuropeBatch11People2026;
export const relationships = candidatePriorityP0EuropeBatch11Relationships2026;
export const placements = candidatePriorityP0EuropeBatch11Placements2026;
export const groupMembers = candidatePriorityP0EuropeBatch11GroupMembers2026;
export const rosterPromotions = candidatePriorityP0EuropeBatch11RosterPromotions2026;
