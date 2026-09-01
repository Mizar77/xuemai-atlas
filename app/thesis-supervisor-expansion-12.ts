import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";
const ermonCv: Source = {
  label: "Stefano Ermon · curriculum vitae",
  url: "https://cs.stanford.edu/~ermon/cv.pdf",
  kind: "cv",
  checkedAt,
  supports: "Ermon's own CV names Carla P. Gomes and Bart Selman as Cornell PhD advisers",
};

const mentor = (id: string, name: string, area: string, x: number): Person => ({
  id,
  name,
  role: "Professor",
  institution: "External",
  actualInstitution: "Cornell University",
  region: "United States",
  area,
  tags: ["导师节点", "培养关系", "人工智能"],
  summary: "由学生本人 CV 明确确认的博士导师节点。",
  facts: [{ label: "图谱定位", value: "Stefano Ermon 的 Cornell 共同博士导师。", source: ermonCv }],
  stage: "historical",
  category: "historical",
  sources: [ermonCv],
  x,
  y: 55,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople12: Person[] = [
  mentor("carla-gomes-lineage", "Carla P. Gomes", "Artificial Intelligence · Computational Sustainability", 995),
  mentor("bart-selman-lineage", "Bart Selman", "Artificial Intelligence · Reasoning", 1125),
];

const relationship = (id: string, from: string, name: string): Relationship => ({
  id,
  from,
  to: "stefano-ermon-us",
  type: "lineage",
  subtype: "co_adviser",
  label: "共同博士导师",
  evidence: `Stefano Ermon 的本人 CV 明确列 ${name} 为 Cornell 博士导师。`,
  source: ermonCv,
  verified: true,
  evidenceObject: "本人 CV",
});

export const thesisSupervisorRelationships12: Relationship[] = [
  relationship("thesis12-gomes-ermon", "carla-gomes-lineage", "Carla P. Gomes"),
  relationship("thesis12-selman-ermon", "bart-selman-lineage", "Bart Selman"),
];

export const thesisSupervisorPersonEnhancements12: Record<string, Partial<Person>> = {
  "stefano-ermon-us": {
    facts: [{ label: "培养轨迹", value: "Cornell 共同博士导师：Carla P. Gomes、Bart Selman。", source: ermonCv }],
    sources: [ermonCv],
    lastVerifiedAt: checkedAt,
  },
};
