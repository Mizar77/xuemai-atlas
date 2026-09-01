import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  rolnick: source(
    "McGill Reasoning and Learning Lab · David Rolnick",
    "https://rl.cs.mcgill.ca/people/david-rolnick/",
    "official",
    "Official lab profile names Nir Shavit, Max Tegmark, and Ed Boyden as PhD co-advisers and Konrad Kording as postdoctoral mentor",
  ),
  rish: source(
    "Irina Rish · UC Irvine PhD dissertation",
    "https://ics.uci.edu/~dechter/publications/r81-irina_thesis.pdf",
    "thesis",
    "Dissertation front matter lists Professor Rina Dechter as committee chair",
  ),
  clune: source(
    "Jeff Clune · curriculum vitae",
    "https://jeffclune.com/media/Jeff-Clune-CV.pdf",
    "cv",
    "CV explicitly lists Hod Lipson and Charles Ofria as postdoctoral advisers",
  ),
};

const mentor = (
  id: string,
  name: string,
  role: string,
  area: string,
  proof: Source,
  actualInstitution: string,
  x: number,
): Person => ({
  id,
  name,
  role,
  institution: "External",
  actualInstitution,
  region: "United States",
  area,
  tags: ["导师节点", "培养关系", ...area.split(" · ").slice(0, 2)],
  summary: "由博士论文、本人履历或院系官方页面明确确认的培养节点。",
  facts: [{ label: "图谱定位", value: "仅表达公开材料明确记载的培养关系。", source: proof }],
  stage: "historical",
  category: "historical",
  sources: [proof],
  x,
  y: 55,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople10: Person[] = [
  mentor("nir-shavit-lineage", "Nir Shavit", "Professor", "Distributed Computing · Machine Learning", sources.rolnick, "MIT", 90),
  mentor("max-tegmark-lineage", "Max Tegmark", "Professor", "Physics · Artificial Intelligence", sources.rolnick, "MIT", 220),
  mentor("ed-boyden-lineage", "Ed Boyden", "Professor", "Neurotechnology · Artificial Intelligence", sources.rolnick, "MIT", 350),
  mentor("konrad-kording-lineage", "Konrad Kording", "Professor", "Computational Neuroscience · Machine Learning", sources.rolnick, "University of Pennsylvania", 480),
  mentor("hod-lipson-lineage", "Hod Lipson", "Professor", "Robotics · Artificial Intelligence", sources.clune, "Columbia University", 610),
  mentor("charles-ofria-lineage", "Charles Ofria", "Professor", "Evolutionary Computation · Artificial Life", sources.clune, "Michigan State University", 740),
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: "phd_adviser" | "co_adviser" | "postdoc_mentor",
  proof: Source,
  evidence: string,
): Relationship => ({
  id,
  from,
  to,
  type: subtype === "postdoc_mentor" ? "talent" : "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : subtype === "co_adviser" ? "共同博士导师" : "博士后导师",
  evidence,
  source: proof,
  verified: true,
  evidenceObject: "博士论文 / 本人履历 / 院系官方页面",
});

export const thesisSupervisorRelationships10: Relationship[] = [
  lineage("thesis10-shavit-rolnick", "nir-shavit-lineage", "david-rolnick-ca", "co_adviser", sources.rolnick, "McGill 官方实验室人物页明确列 Nir Shavit 为 David Rolnick 的共同博士导师。"),
  lineage("thesis10-tegmark-rolnick", "max-tegmark-lineage", "david-rolnick-ca", "co_adviser", sources.rolnick, "McGill 官方实验室人物页明确列 Max Tegmark 为 David Rolnick 的共同博士导师。"),
  lineage("thesis10-boyden-rolnick", "ed-boyden-lineage", "david-rolnick-ca", "co_adviser", sources.rolnick, "McGill 官方实验室人物页明确列 Ed Boyden 为 David Rolnick 的共同博士导师。"),
  lineage("thesis10-kording-rolnick", "konrad-kording-lineage", "david-rolnick-ca", "postdoc_mentor", sources.rolnick, "McGill 官方实验室人物页明确记载 David Rolnick 在宾大与 Konrad Kording 开展博士后研究。"),
  lineage("thesis10-dechter-rish", "rina-dechter-foundational", "irina-rish-ca", "phd_adviser", sources.rish, "Irina Rish 的 UC Irvine 博士论文首页将 Rina Dechter 列为委员会主席。"),
  lineage("thesis10-lipson-clune", "hod-lipson-lineage", "jeff-clune-ca", "postdoc_mentor", sources.clune, "Jeff Clune 的本人 CV 明确列 Hod Lipson 为 Cornell 博士后导师。"),
  lineage("thesis10-ofria-clune", "charles-ofria-lineage", "jeff-clune-ca", "postdoc_mentor", sources.clune, "Jeff Clune 的本人 CV 明确列 Charles Ofria 为 BEACON 博士后导师。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({
  facts: [{ label: "培养轨迹", value, source: proof }],
  sources: [proof],
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPersonEnhancements10: Record<string, Partial<Person>> = {
  "david-rolnick-ca": targetFact("MIT 共同博士导师：Nir Shavit、Max Tegmark、Ed Boyden；宾大博士后导师：Konrad Kording。", sources.rolnick),
  "irina-rish-ca": targetFact("UC Irvine 博士导师：Rina Dechter。", sources.rish),
  "jeff-clune-ca": targetFact("博士后导师：Hod Lipson（Cornell）与 Charles Ofria（BEACON / Michigan State）。", sources.clune),
};
