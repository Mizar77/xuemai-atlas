import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  jurafsky: source(
    "UC Berkeley EECS · Robert Wilensky dissertations",
    "https://www2.eecs.berkeley.edu/Pubs/Dissertations/Faculty/wilensky.html",
    "official",
    "Berkeley's official dissertation index lists Daniel Jurafsky's 1992 dissertation under Robert Wilensky",
  ),
  bamman: source(
    "David Bamman · curriculum vitae",
    "https://people.ischool.berkeley.edu/~dbamman/bammanCV.pdf",
    "cv",
    "CV explicitly names Noah Smith as PhD adviser",
  ),
  diyi: source(
    "Carnegie Mellon · Diyi Yang thesis defense",
    "https://www.cs.cmu.edu/afs/.cs.cmu.edu/Web/Posters/LTIThesis-DiyiYang19.pdf",
    "thesis",
    "Official defense poster identifies Robert E. Kraut and Eduard Hovy as thesis co-chairs",
  ),
  cristian: source(
    "Cristian Danescu-Niculescu-Mizil · PhD dissertation",
    "https://www.cs.cornell.edu/~cristian/A_computational_approach_to_linguistic_coordination_files/cristian_phd_thesis.pdf",
    "thesis",
    "Dissertation acknowledgements explicitly identify Lillian Lee as adviser",
  ),
  lillian: source(
    "Lillian Lee · Harvard PhD dissertation",
    "https://www.cs.cornell.edu/home/llee/papers/thesis.pdf",
    "thesis",
    "Dissertation record and front matter identify Stuart Shieber as doctoral adviser",
  ),
  akari: source(
    "Akari Asai · homepage",
    "https://akariasai.github.io/",
    "profile",
    "Homepage explicitly states that Hannaneh Hajishirzi advised her UW PhD",
  ),
  rush: source(
    "Alexander M. Rush · curriculum vitae",
    "https://nlp.seas.harvard.edu/cv/cv.pdf",
    "cv",
    "CV names Michael Collins as MIT PhD adviser and Yann LeCun as FAIR postdoctoral adviser",
  ),
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
  summary: "由学校论文索引、博士论文或本人履历明确确认的导师节点。",
  facts: [{ label: "图谱定位", value: "仅表达公开材料明确记载的学位培养关系。", source: proof }],
  stage: "historical",
  category: "historical",
  sources: [proof],
  x,
  y: 55,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople7: Person[] = [
  mentor("robert-wilensky-lineage", "Robert Wilensky", "Professor Emeritus (1951–2013)", "United States", "Artificial Intelligence · Natural Language Processing", sources.jurafsky, "University of California, Berkeley", 180),
  mentor("robert-kraut-lineage", "Robert E. Kraut", "Herbert A. Simon Professor Emeritus", "United States", "Human–Computer Interaction · Computational Social Science", sources.diyi, "Carnegie Mellon University", 400),
  mentor("eduard-hovy-lineage", "Eduard Hovy", "Research Professor", "United States", "Natural Language Processing · Computational Social Science", sources.diyi, "Carnegie Mellon University", 620),
];

const lineage = (id: string, from: string, to: string, subtype: "phd_adviser" | "co_adviser" | "postdoc_mentor", proof: Source, evidence: string): Relationship => ({
  id,
  from,
  to,
  type: subtype === "postdoc_mentor" ? "talent" : "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : subtype === "co_adviser" ? "共同博士导师" : "博士后导师",
  evidence,
  source: proof,
  verified: true,
  evidenceObject: "学校论文索引 / 博士论文 / 本人履历",
});

export const thesisSupervisorRelationships7: Relationship[] = [
  lineage("thesis7-wilensky-jurafsky", "robert-wilensky-lineage", "dan-jurafsky-us", "phd_adviser", sources.jurafsky, "UC Berkeley EECS 官方博士论文索引将 Dan Jurafsky 的 1992 年博士论文列在 Robert Wilensky 名下。"),
  lineage("thesis7-smith-bamman", "noah-smith-us", "david-bamman-us", "phd_adviser", sources.bamman, "David Bamman 的 CV 明确列 Noah Smith 为 CMU 博士导师。"),
  lineage("thesis7-kraut-diyi", "robert-kraut-lineage", "diyi-yang-us", "co_adviser", sources.diyi, "CMU 官方博士答辩海报将 Robert E. Kraut 列为 Diyi Yang 的共同主席。"),
  lineage("thesis7-hovy-diyi", "eduard-hovy-lineage", "diyi-yang-us", "co_adviser", sources.diyi, "CMU 官方博士答辩海报将 Eduard Hovy 列为 Diyi Yang 的共同主席。"),
  lineage("thesis7-lee-danescu", "lillian-lee-us", "cristian-danescu-us", "phd_adviser", sources.cristian, "Cristian Danescu-Niculescu-Mizil 的博士论文致谢明确称 Lillian Lee 为导师。"),
  lineage("thesis7-shieber-lee", "stuart-shieber-lineage", "lillian-lee-us", "phd_adviser", sources.lillian, "Lillian Lee 的 Harvard 博士论文将 Stuart Shieber 列为导师。"),
  lineage("thesis7-hajishirzi-asai", "hannaneh-hajishirzi-us", "akari-asai-us", "phd_adviser", sources.akari, "Akari Asai 本人主页明确写明 UW 博士由 Hannaneh Hajishirzi 指导。"),
  lineage("thesis7-collins-rush", "michael-collins-lineage", "sasha-rush-us", "phd_adviser", sources.rush, "Alexander Rush 的 CV 明确列 Michael Collins 为 MIT 博士导师。"),
  lineage("thesis7-lecun-rush", "yann-lecun-us", "sasha-rush-us", "postdoc_mentor", sources.rush, "Alexander Rush 的 CV 明确列 Yann LeCun 为 FAIR 博士后导师。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({ facts: [{ label: "培养轨迹", value, source: proof }], sources: [proof], lastVerifiedAt: checkedAt });

export const thesisSupervisorPersonEnhancements7: Record<string, Partial<Person>> = {
  "dan-jurafsky-us": targetFact("UC Berkeley 博士导师：Robert Wilensky。", sources.jurafsky),
  "david-bamman-us": targetFact("CMU 博士导师：Noah A. Smith。", sources.bamman),
  "diyi-yang-us": targetFact("CMU 共同博士导师：Robert E. Kraut、Eduard Hovy。", sources.diyi),
  "cristian-danescu-us": targetFact("Cornell 博士导师：Lillian Lee。", sources.cristian),
  "lillian-lee-us": targetFact("Harvard 博士导师：Stuart Shieber。", sources.lillian),
  "akari-asai-us": targetFact("University of Washington 博士导师：Hannaneh Hajishirzi。", sources.akari),
  "sasha-rush-us": targetFact("MIT 博士导师：Michael Collins；FAIR 博士后导师：Yann LeCun。", sources.rush),
};
