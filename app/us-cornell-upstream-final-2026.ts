import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label, url, kind, checkedAt, supports,
});

const sources = {
  abeThesis: source("Abe Davis · MIT dissertation", "https://abedavis.com/thesis.pdf", "thesis", "Dissertation title page explicitly names Fredo Durand as thesis supervisor"),
  adityaThesis: source("Aditya Vashistha · UW dissertation", "https://www.adityavashistha.com/uploads/2/0/8/0/20800650/adityav-phd-thesis-2019.pdf", "thesis", "Dissertation abstract names Richard J. Anderson as chair of the supervisory committee; acknowledgments explicitly call him the author's advisor"),
  allisonHome: source("Allison Koenecke · homepage", "https://infosci.cornell.edu/~koenecke/index.html", "profile", "First-party biography says her Stanford PhD was completed under the guidance of reading-committee members Susan Athey, Sharad Goel and Hal Varian"),
  chengHome: source("Cheng Zhang · homepage", "https://czhang.org/", "profile", "First-party biography explicitly names Gregory D. Abowd and Omer Inan as Georgia Tech PhD advisers"),
  chengCv: source("Cheng Zhang · CV", "https://czhang.org/assets/pdf/CV_Sep24.pdf", "cv", "CV education section explicitly names Gregory D. Abowd and Omer Inan as PhD advisers"),
  deSaCv: source("Christopher De Sa · CV", "https://www.cs.cornell.edu/~cdesa/papers/cdesa-cv.pdf", "cv", "CV education section explicitly names Kunle Olukotun and Christopher Ré as Stanford PhD advisers"),
};

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
  historical = false,
): Person => ({
  id,
  name,
  role,
  institution,
  actualInstitution,
  region: "United States",
  area,
  tags: ["师承节点"],
  summary,
  stage: historical ? "historical" : "senior",
  category: historical ? "historical" : "adjacent",
  status: "supporting mentor node · relationship evidence only",
  sources: [evidence],
  x,
  y: 20,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const usCornellUpstreamPeople: Person[] = [
  supportPerson("fredo-durand-lineage", "Frédo Durand", "Professor", "MIT", undefined, "Computer Graphics · Computational Photography", "Abe Davis 的 MIT 博士论文导师。", sources.abeThesis, 90),
  supportPerson("richard-anderson-lineage", "Richard J. Anderson", "Professor", "UW", undefined, "ICTD · HCI", "Aditya Vashistha 的 UW 博士导师。", sources.adityaThesis, 210),
  supportPerson("susan-athey-lineage", "Susan Athey", "Professor", "Stanford", undefined, "Economics · Machine Learning", "Allison Koenecke 本人所述 Stanford 博士阶段 reading committee 指导成员。", sources.allisonHome, 330),
  supportPerson("sharad-goel-lineage", "Sharad Goel", "Professor", "Harvard", undefined, "Computational Social Science · Public Policy", "Allison Koenecke 本人所述 Stanford 博士阶段 reading committee 指导成员。", sources.allisonHome, 450),
  supportPerson("hal-varian-lineage", "Hal Varian", "Emeritus Professor · Chief Economist, Google", "Berkeley", undefined, "Economics · Data Science", "Allison Koenecke 本人所述 Stanford 博士阶段 reading committee 指导成员。", sources.allisonHome, 570),
  supportPerson("gregory-abowd-lineage", "Gregory D. Abowd", "Regents' Professor", "Georgia Tech", undefined, "Ubiquitous Computing · HCI", "Cheng Zhang 的 Georgia Tech 共同博士导师。", sources.chengCv, 690, true),
  supportPerson("omer-inan-lineage", "Omer Inan", "Professor", "Georgia Tech", undefined, "Wearable Computing · Biomedical Sensing", "Cheng Zhang 的 Georgia Tech 共同博士导师。", sources.chengCv, 810),
  supportPerson("kunle-olukotun-lineage", "Kunle Olukotun", "Professor", "Stanford", undefined, "Computer Architecture · ML Systems", "Christopher De Sa 的 Stanford 共同博士导师。", sources.deSaCv, 930),
];

export const usCornellUpstreamEnhancements: Record<string, Partial<Person>> = {
  "abe-davis-cornell": {
    facts: [{ label: "博士师承", value: "MIT 博士论文首页明确列 Frédo Durand 为 thesis supervisor。", source: sources.abeThesis }],
    sources: [sources.abeThesis], lastVerifiedAt: checkedAt,
  },
  "aditya-vashistha-cornell": {
    facts: [{ label: "博士师承", value: "UW 博士论文摘要列 Richard J. Anderson 为 supervisory committee chair；致谢进一步明确称其为“my advisor”。", source: sources.adityaThesis }],
    sources: [sources.adityaThesis], lastVerifiedAt: checkedAt,
  },
  "allison-koenecke-cornell": {
    facts: [{ label: "博士阶段指导", value: "本人主页写明 Stanford 博士阶段由 reading committee 的 Susan Athey、Sharad Goel 与 Hal Varian 指导；因原文未指定唯一 formal adviser，本轮保留为三条已核验指导关系。", source: sources.allisonHome }],
    sources: [sources.allisonHome], lastVerifiedAt: checkedAt,
  },
  "cheng-zhang-cornell": {
    facts: [{ label: "博士师承", value: "本人主页与 CV 均明确列 Georgia Tech 博士共同导师为 Gregory D. Abowd 与 Omer Inan。", source: sources.chengCv }],
    sources: [sources.chengHome, sources.chengCv], lastVerifiedAt: checkedAt,
  },
  "christopher-de-sa-cornell": {
    facts: [{ label: "博士师承", value: "本人 CV 明确列 Stanford 电气工程博士共同导师为 Kunle Olukotun 与 Christopher Ré。", source: sources.deSaCv }],
    sources: [sources.deSaCv], lastVerifiedAt: checkedAt,
  },
};

const edge = (
  id: string,
  from: string,
  to: string,
  subtype: NonNullable<Relationship["subtype"]>,
  label: string,
  evidence: string,
  evidenceSource: Source,
): Relationship => ({
  id, from, to, type: "lineage", subtype, label, evidence, source: evidenceSource, verified: true,
});

export const usCornellUpstreamRelationships: Relationship[] = [
  edge("cornell-upstream-durand-davis", "fredo-durand-lineage", "abe-davis-cornell", "phd_adviser", "博士导师", "Abe Davis 的 MIT 博士论文标题页明确列 Fredo Durand 为 thesis supervisor。", sources.abeThesis),
  edge("cornell-upstream-anderson-vashistha", "richard-anderson-lineage", "aditya-vashistha-cornell", "phd_adviser", "博士导师", "Aditya Vashistha 的 UW 博士论文摘要列 Richard J. Anderson 为 supervisory committee chair，致谢明确称其为 advisor。", sources.adityaThesis),
  edge("cornell-upstream-athey-koenecke", "susan-athey-lineage", "allison-koenecke-cornell", "other", "博士阶段 reading committee 指导", "Allison Koenecke 本人主页明确写明 Stanford 博士阶段在 Susan Athey、Sharad Goel 和 Hal Varian 组成的 reading committee 指导下完成；原文不支持指定唯一 formal adviser。", sources.allisonHome),
  edge("cornell-upstream-goel-koenecke", "sharad-goel-lineage", "allison-koenecke-cornell", "other", "博士阶段 reading committee 指导", "Allison Koenecke 本人主页明确写明 Stanford 博士阶段在 Susan Athey、Sharad Goel 和 Hal Varian 组成的 reading committee 指导下完成；原文不支持指定唯一 formal adviser。", sources.allisonHome),
  edge("cornell-upstream-varian-koenecke", "hal-varian-lineage", "allison-koenecke-cornell", "other", "博士阶段 reading committee 指导", "Allison Koenecke 本人主页明确写明 Stanford 博士阶段在 Susan Athey、Sharad Goel 和 Hal Varian 组成的 reading committee 指导下完成；原文不支持指定唯一 formal adviser。", sources.allisonHome),
  edge("cornell-upstream-abowd-zhang", "gregory-abowd-lineage", "cheng-zhang-cornell", "co_adviser", "共同博士导师", "Cheng Zhang 本人 CV 教育栏明确列 Gregory D. Abowd 与 Omer Inan 为 Georgia Tech 博士导师。", sources.chengCv),
  edge("cornell-upstream-inan-zhang", "omer-inan-lineage", "cheng-zhang-cornell", "co_adviser", "共同博士导师", "Cheng Zhang 本人 CV 教育栏明确列 Gregory D. Abowd 与 Omer Inan 为 Georgia Tech 博士导师。", sources.chengCv),
  edge("cornell-upstream-olukotun-desa", "kunle-olukotun-lineage", "christopher-de-sa-cornell", "co_adviser", "共同博士导师", "Christopher De Sa 本人 CV 教育栏明确列 Kunle Olukotun 与 Christopher Ré 为 Stanford 博士导师。", sources.deSaCv),
  edge("cornell-upstream-re-desa", "chris-re-stanford", "christopher-de-sa-cornell", "co_adviser", "共同博士导师", "Christopher De Sa 本人 CV 教育栏明确列 Kunle Olukotun 与 Christopher Ré 为 Stanford 博士导师。", sources.deSaCv),
];

export const people = usCornellUpstreamPeople;
export const enhancements = usCornellUpstreamEnhancements;
export const relationships = usCornellUpstreamRelationships;
