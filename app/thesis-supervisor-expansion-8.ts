import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  potts: source("Christopher Potts · PhD dissertation", "https://web.stanford.edu/~cgpotts/dissertation/potts-dissertation-1up.pdf", "thesis", "Dissertation front matter names Geoffrey K. Pullum as committee chair for Potts's UC Santa Cruz PhD"),
  bisk: source("Yonatan Bisk · PhD dissertation", "https://yonatanbisk.com/papers/Thesis.pdf", "thesis", "Dissertation acknowledgements explicitly identify Julia Hockenmaier as adviser"),
  rose: source("Carnegie Mellon LTI · Carolyn Rosé dissertation", "https://www.lti.cs.cmu.edu/people/alumni/alumni-thesis/rose-carolyn-thesis.pdf", "thesis", "Dissertation acknowledgements explicitly call Lori Levin the adviser"),
  wang: source("Lucy Lu Wang · curriculum vitae", "https://llwang.net/cv.pdf", "cv", "CV lists John Gennari as PhD dissertation chair and David Sherman as master's thesis adviser"),
  hehe: source("University of Maryland CS · He He", "https://www.cs.umd.edu/community/alumnus/he-he", "official", "Official alumni record lists Hal Daumé III as adviser for He He's 2016 dissertation"),
  hehePostdoc: source("Percy Liang · group alumni", "https://cs.stanford.edu/people/pliang/", "profile", "Official group page lists He He as a Stanford postdoc in 2018"),
};

const mentor = (id: string, name: string, role: string, region: Person["region"], area: string, proof: Source, actualInstitution: string, x: number): Person => ({
  id,
  name,
  role,
  institution: "External",
  actualInstitution,
  region,
  area,
  tags: ["导师节点", "培养关系", ...area.split(" · ").slice(0, 2)],
  summary: "由博士论文、学校论文记录或本人履历明确确认的导师节点。",
  facts: [{ label: "图谱定位", value: "仅表达公开材料明确记载的培养关系。", source: proof }],
  stage: "historical",
  category: "historical",
  sources: [proof],
  x,
  y: 55,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople8: Person[] = [
  mentor("geoffrey-pullum-lineage", "Geoffrey K. Pullum", "Professor Emeritus", "Europe", "Linguistics · Syntax", sources.potts, "University of Edinburgh", 140),
  mentor("julia-hockenmaier-lineage", "Julia Hockenmaier", "Professor", "United States", "Natural Language Processing · Multimodal Learning", sources.bisk, "University of Illinois Urbana-Champaign", 310),
  mentor("lori-levin-lineage", "Lori Levin", "Research Professor", "United States", "Computational Linguistics · Machine Translation", sources.rose, "Carnegie Mellon University", 480),
  mentor("john-gennari-lineage", "John Gennari", "Professor", "United States", "Biomedical Informatics · Knowledge Representation", sources.wang, "University of Washington", 650),
  mentor("david-sherman-lineage", "David Sherman", "Research Professor", "United States", "Biomedical Engineering · Neural Systems", sources.wang, "Johns Hopkins University", 820),
  mentor("hal-daume-lineage", "Hal Daumé III", "Professor", "United States", "Machine Learning · Natural Language Processing", sources.hehe, "University of Maryland", 990),
];

const lineage = (id: string, from: string, to: string, subtype: "phd_adviser" | "master_adviser" | "postdoc_mentor", proof: Source, evidence: string): Relationship => ({
  id,
  from,
  to,
  type: subtype === "postdoc_mentor" ? "talent" : "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : subtype === "master_adviser" ? "硕士导师" : "博士后导师",
  evidence,
  source: proof,
  verified: true,
  evidenceObject: "博士论文 / 学校论文记录 / 本人履历",
});

export const thesisSupervisorRelationships8: Relationship[] = [
  lineage("thesis8-pullum-potts", "geoffrey-pullum-lineage", "christopher-potts-us", "phd_adviser", sources.potts, "Christopher Potts 的博士论文首页将 Geoffrey K. Pullum 列为委员会主席。"),
  lineage("thesis8-hockenmaier-bisk", "julia-hockenmaier-lineage", "yonatan-bisk-us", "phd_adviser", sources.bisk, "Yonatan Bisk 的博士论文致谢明确称 Julia Hockenmaier 为导师。"),
  lineage("thesis8-levin-rose", "lori-levin-lineage", "carolyn-rose-us", "phd_adviser", sources.rose, "Carolyn Rosé 的 CMU 博士论文致谢明确称 Lori Levin 为导师。"),
  lineage("thesis8-gennari-wang", "john-gennari-lineage", "lucy-lu-wang-us", "phd_adviser", sources.wang, "Lucy Lu Wang 的 CV 将 John Gennari 列为博士论文委员会主席。"),
  lineage("thesis8-sherman-wang", "david-sherman-lineage", "lucy-lu-wang-us", "master_adviser", sources.wang, "Lucy Lu Wang 的 CV 将 David Sherman 列为硕士论文导师。"),
  lineage("thesis8-daume-he", "hal-daume-lineage", "he-he-us", "phd_adviser", sources.hehe, "University of Maryland CS 官方校友记录将 Hal Daumé III 列为 He He 的博士导师。"),
  lineage("thesis8-liang-he", "percy-liang-us", "he-he-us", "postdoc_mentor", sources.hehePostdoc, "Percy Liang 的 Stanford 研究组页面将 He He 列为 2018 年博士后成员。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({ facts: [{ label: "培养轨迹", value, source: proof }], sources: [proof], lastVerifiedAt: checkedAt });

export const thesisSupervisorPersonEnhancements8: Record<string, Partial<Person>> = {
  "christopher-potts-us": { ...targetFact("UC Santa Cruz 博士导师：Geoffrey K. Pullum。", sources.potts), tags: ["UC Santa Cruz PhD"] },
  "yonatan-bisk-us": targetFact("UIUC 博士导师：Julia Hockenmaier。", sources.bisk),
  "carolyn-rose-us": targetFact("Carnegie Mellon 博士导师：Lori Levin。", sources.rose),
  "lucy-lu-wang-us": targetFact("University of Washington 博士导师：John Gennari；Johns Hopkins 硕士导师：David Sherman。", sources.wang),
  "he-he-us": { ...targetFact("University of Maryland 博士导师：Hal Daumé III；之后在 Stanford Percy Liang 研究组从事博士后研究。", sources.hehe), sources: [sources.hehe, sources.hehePostdoc], tags: ["University of Maryland PhD", "Stanford postdoc"] },
};
