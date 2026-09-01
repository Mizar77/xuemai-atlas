import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  mooney: source(
    "Raymond Mooney · academic genealogy",
    "https://www.cs.utexas.edu/~mooney/genealogy.html",
    "profile",
    "Mooney's own UT Austin page identifies Gerald F. DeJong as his PhD adviser",
  ),
  stone: source(
    "Peter Stone · curriculum vitae",
    "https://www.cs.utexas.edu/~pstone/cv/cv.html",
    "cv",
    "Stone's own UT Austin CV lists Manuela Veloso as chair of his PhD thesis committee",
  ),
};

export const thesisSupervisorPeople11: Person[] = [{
  id: "gerald-dejong-lineage",
  name: "Gerald F. DeJong",
  role: "Professor Emeritus",
  institution: "External",
  actualInstitution: "University of Illinois Urbana-Champaign",
  region: "United States",
  area: "Machine Learning · Artificial Intelligence",
  tags: ["导师节点", "培养关系", "机器学习"],
  summary: "由学生本人维护的学术谱系页明确确认的博士导师节点。",
  facts: [{ label: "图谱定位", value: "Raymond Mooney 的 UIUC 博士导师。", source: sources.mooney }],
  stage: "historical",
  category: "historical",
  sources: [sources.mooney],
  x: 865,
  y: 55,
  primary: false,
  lastVerifiedAt: checkedAt,
}];

const lineage = (id: string, from: string, to: string, proof: Source, evidence: string): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype: "phd_adviser",
  label: "博士导师",
  evidence,
  source: proof,
  verified: true,
  evidenceObject: "本人学术谱系页 / 本人 CV",
});

export const thesisSupervisorRelationships11: Relationship[] = [
  lineage("thesis11-dejong-mooney", "gerald-dejong-lineage", "raymond-mooney-us", sources.mooney, "Raymond Mooney 本人在 UT Austin 域名维护的学术谱系页明确列 Gerald F. DeJong 为博士导师。"),
  lineage("thesis11-veloso-stone", "manuela-veloso-lineage", "peter-stone-us", sources.stone, "Peter Stone 的本人 CV 将 Manuela Veloso 列为博士论文委员会主席。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({
  facts: [{ label: "培养轨迹", value, source: proof }],
  sources: [proof],
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPersonEnhancements11: Record<string, Partial<Person>> = {
  "raymond-mooney-us": targetFact("UIUC 博士导师：Gerald F. DeJong。", sources.mooney),
  "peter-stone-us": targetFact("Carnegie Mellon 博士导师：Manuela Veloso。", sources.stone),
};
