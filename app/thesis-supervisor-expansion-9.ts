import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  hewitt: source("John Hewitt · homepage", "https://nlp.stanford.edu/~johnhew/", "profile", "Homepage explicitly states that Christopher Manning and Percy Liang co-advised the Stanford PhD"),
  zhou: source("Zhou Yu · CMU PhD dissertation", "https://www.cs.cmu.edu/~zhouyu/PhD_thesis.pdf", "thesis", "Dissertation front matter lists Alan W. Black as chair and Alexander I. Rudnicky as co-chair"),
  mccallum: source("Andrew McCallum · curriculum vitae", "https://people.cs.umass.edu/~mccallum/mccallum-vita.pdf", "cv", "CV names Dana Ballard as PhD adviser and Sebastian Thrun and Tom Mitchell as postdoctoral advisers"),
  brendan: source("Noah A. Smith · career statement", "https://www.cs.cmu.edu/~nasmith/statement13-web.pdf", "cv", "Smith's faculty statement explicitly identifies Brendan O'Connor as his PhD student"),
  iyyer: source("Mohit Iyyer · curriculum vitae", "https://people.cs.umass.edu/~miyyer/data/cv.pdf", "cv", "CV names Jordan Boyd-Graber and Hal Daumé III as PhD advisers and Luke Zettlemoyer and Scott Yih as postdoctoral supervisors"),
  eisner: source("Jason Eisner · curriculum vitae", "https://www.cs.jhu.edu/~jason/cv.pdf", "cv", "CV explicitly names Mitch Marcus as University of Pennsylvania PhD adviser"),
  huang: source("Tsinghua Alumni · Zhu Xiaoyan profile", "https://www.tsinghua.org.cn/info/1951/36984.htm", "official", "Tsinghua alumni profile identifies Minlie Huang as Zhu Xiaoyan's former student"),
};

const mentor = (id: string, name: string, role: string, region: Person["region"], area: string, proof: Source, actualInstitution: string, x: number): Person => ({
  id, name, role, institution: "External", actualInstitution, region, area,
  tags: ["导师节点", "培养关系", ...area.split(" · ").slice(0, 2)],
  summary: "由博士论文、本人履历或导师公开名录明确确认的培养节点。",
  facts: [{ label: "图谱定位", value: "仅表达公开材料明确记载的培养关系。", source: proof }],
  stage: "historical", category: "historical", sources: [proof], x, y: 55, primary: false, lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople9: Person[] = [
  mentor("alan-black-lineage", "Alan W. Black", "Professor", "United States", "Speech · Spoken Dialogue", sources.zhou, "Carnegie Mellon University", 100),
  mentor("alexander-rudnicky-lineage", "Alexander I. Rudnicky", "Professor Emeritus", "United States", "Speech · Human–Computer Interaction", sources.zhou, "Carnegie Mellon University", 225),
  mentor("dana-ballard-lineage", "Dana H. Ballard", "Professor Emeritus", "United States", "Computer Vision · Reinforcement Learning", sources.mccallum, "University of Texas at Austin", 350),
  mentor("tom-mitchell-lineage", "Tom M. Mitchell", "Founders University Professor", "United States", "Machine Learning · Artificial Intelligence", sources.mccallum, "Carnegie Mellon University", 475),
  mentor("jordan-boyd-graber-lineage", "Jordan Boyd-Graber", "Professor", "United States", "Natural Language Processing · Machine Learning", sources.iyyer, "University of Maryland", 600),
  mentor("scott-yih-lineage", "Wen-tau Yih", "Research Scientist", "United States", "Natural Language Processing · Machine Learning", sources.iyyer, "Meta AI", 725),
  mentor("mitch-marcus-lineage", "Mitch Marcus", "Professor Emeritus", "United States", "Natural Language Processing · Syntax", sources.eisner, "University of Pennsylvania", 850),
  mentor("zhu-xiaoyan-lineage", "朱小燕", "教授", "Mainland China", "自然语言处理 · 人工智能", sources.huang, "清华大学", 975),
];

const lineage = (id: string, from: string, to: string, subtype: "phd_adviser" | "co_adviser" | "postdoc_mentor", proof: Source, evidence: string): Relationship => ({
  id, from, to,
  type: subtype === "postdoc_mentor" ? "talent" : "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : subtype === "co_adviser" ? "共同博士导师" : "博士后导师",
  evidence, source: proof, verified: true, evidenceObject: "博士论文 / 本人履历 / 导师公开名录",
});

export const thesisSupervisorRelationships9: Relationship[] = [
  lineage("thesis9-manning-hewitt", "christopher-manning-us", "john-hewitt-us", "co_adviser", sources.hewitt, "John Hewitt 本人主页明确列 Christopher Manning 为共同博士导师。"),
  lineage("thesis9-liang-hewitt", "percy-liang-us", "john-hewitt-us", "co_adviser", sources.hewitt, "John Hewitt 本人主页明确列 Percy Liang 为共同博士导师。"),
  lineage("thesis9-black-zhou", "alan-black-lineage", "zhou-yu-us", "co_adviser", sources.zhou, "Zhou Yu 的 CMU 博士论文首页将 Alan W. Black 列为 Chair。"),
  lineage("thesis9-rudnicky-zhou", "alexander-rudnicky-lineage", "zhou-yu-us", "co_adviser", sources.zhou, "Zhou Yu 的 CMU 博士论文首页将 Alexander I. Rudnicky 列为 Co-chair。"),
  lineage("thesis9-ballard-mccallum", "dana-ballard-lineage", "andrew-mccallum-us", "phd_adviser", sources.mccallum, "Andrew McCallum 的 CV 明确列 Dana Ballard 为博士导师。"),
  lineage("thesis9-thrun-mccallum", "sebastian-thrun-lineage", "andrew-mccallum-us", "postdoc_mentor", sources.mccallum, "Andrew McCallum 的 CV 明确列 Sebastian Thrun 为博士后导师。"),
  lineage("thesis9-mitchell-mccallum", "tom-mitchell-lineage", "andrew-mccallum-us", "postdoc_mentor", sources.mccallum, "Andrew McCallum 的 CV 明确列 Tom Mitchell 为博士后导师。"),
  lineage("thesis9-smith-oconnor", "noah-smith-us", "brendan-oconnor-us", "phd_adviser", sources.brendan, "Noah Smith 的教师履历明确将 Brendan O'Connor 列为博士生。"),
  lineage("thesis9-boyd-iyyer", "jordan-boyd-graber-lineage", "mohit-iyyer-us", "co_adviser", sources.iyyer, "Mohit Iyyer 的 CV 明确列 Jordan Boyd-Graber 为博士导师。"),
  lineage("thesis9-daume-iyyer", "hal-daume-lineage", "mohit-iyyer-us", "co_adviser", sources.iyyer, "Mohit Iyyer 的 CV 明确列 Hal Daumé III 为博士导师。"),
  lineage("thesis9-zettlemoyer-iyyer", "luke-zettlemoyer-us", "mohit-iyyer-us", "postdoc_mentor", sources.iyyer, "Mohit Iyyer 的 CV 明确列 Luke Zettlemoyer 为 AI2 博士后导师。"),
  lineage("thesis9-yih-iyyer", "scott-yih-lineage", "mohit-iyyer-us", "postdoc_mentor", sources.iyyer, "Mohit Iyyer 的 CV 明确列 Scott Yih 为 AI2 博士后导师。"),
  lineage("thesis9-marcus-eisner", "mitch-marcus-lineage", "jason-eisner-us", "phd_adviser", sources.eisner, "Jason Eisner 的 CV 明确列 Mitch Marcus 为博士导师。"),
  lineage("thesis9-zhu-huang", "zhu-xiaoyan-lineage", "minlie-huang", "phd_adviser", sources.huang, "清华校友总会朱小燕人物报道明确称黄民烈是其学生。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({ facts: [{ label: "培养轨迹", value, source: proof }], sources: [proof], lastVerifiedAt: checkedAt });

export const thesisSupervisorPersonEnhancements9: Record<string, Partial<Person>> = {
  "john-hewitt-us": targetFact("Stanford 共同博士导师：Christopher Manning、Percy Liang。", sources.hewitt),
  "zhou-yu-us": targetFact("CMU 共同博士导师：Alan W. Black、Alexander I. Rudnicky。", sources.zhou),
  "andrew-mccallum-us": targetFact("University of Rochester 博士导师：Dana Ballard；CMU 博士后导师：Sebastian Thrun、Tom Mitchell。", sources.mccallum),
  "brendan-oconnor-us": targetFact("CMU 博士导师：Noah A. Smith。", sources.brendan),
  "mohit-iyyer-us": targetFact("University of Maryland 共同博士导师：Jordan Boyd-Graber、Hal Daumé III；AI2 博士后导师：Luke Zettlemoyer、Scott Yih。", sources.iyyer),
  "jason-eisner-us": targetFact("University of Pennsylvania 博士导师：Mitch Marcus。", sources.eisner),
  "minlie-huang": targetFact("清华大学博士导师：朱小燕。", sources.huang),
};
