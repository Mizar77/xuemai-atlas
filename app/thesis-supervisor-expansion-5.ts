import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  jing: source("UIUC IDEALS · Jing Jiang PhD thesis", "https://www.ideals.illinois.edu/items/11496/bitstreams/42109/data.pdf", "thesis", "Thesis acknowledgements explicitly identify ChengXiang Zhai as Jing Jiang's adviser"),
  loy: source("Chen Change Loy · profile", "https://www.mmlab-ntu.com/person/ccloy/profile.html", "profile", "Profile lists Tao Xiang and Shaogang Gong as PhD advisers"),
  pan: source("Xingang Pan · homepage", "https://xingangpan.github.io/", "profile", "Homepage names Xiaoou Tang as PhD supervisor and Christian Theobalt as postdoctoral adviser"),
  hsu: source("David Hsu · Stanford-hosted homepage", "https://ai.stanford.edu/~dyhsu/", "profile", "Homepage names Jean-Claude Latombe as Stanford PhD supervisor"),
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
  summary: "由博士论文、本人主页或教师履历明确确认的导师节点。",
  facts: [{ label: "图谱定位", value: "仅表达公开材料明确记载的培养关系。", source: proof }],
  stage: "historical",
  category: "historical",
  sources: [proof],
  x,
  y: 55,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople5: Person[] = [
  mentor("chengxiang-zhai-lineage", "ChengXiang Zhai", "Professor", "United States", "Information Retrieval · Natural Language Processing", sources.jing, "University of Illinois Urbana-Champaign", 180),
  mentor("shaogang-gong-lineage", "Shaogang Gong", "Professor", "Europe", "Computer Vision · Visual Computing", sources.loy, "Queen Mary University of London", 380),
  mentor("christian-theobalt-lineage", "Christian Theobalt", "Director", "Europe", "Computer Vision · Computer Graphics", sources.pan, "Max Planck Institute for Informatics", 580),
  mentor("jean-claude-latombe-lineage", "Jean-Claude Latombe", "Professor Emeritus", "United States", "Robotics · Motion Planning", sources.hsu, "Stanford University", 780),
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
  evidenceObject: "博士论文 / 本人主页 / 本人履历",
});

export const thesisSupervisorRelationships5: Relationship[] = [
  lineage("thesis5-zhai-jiang", "chengxiang-zhai-lineage", "jing-jiang", "phd_adviser", sources.jing, "Jing Jiang 的 UIUC 博士论文致谢明确称 ChengXiang Zhai 为 adviser。"),
  lineage("thesis5-xiang-loy", "tao-xiang-lineage", "chen-change-loy", "co_adviser", sources.loy, "Chen Change Loy 本人履历明确列 Tao Xiang 为 Queen Mary 共同博士导师。"),
  lineage("thesis5-gong-loy", "shaogang-gong-lineage", "chen-change-loy", "co_adviser", sources.loy, "Chen Change Loy 本人履历明确列 Shaogang Gong 为 Queen Mary 共同博士导师。"),
  lineage("thesis5-tang-pan", "xiaoou-tang-cuhk", "xingang-pan-ntu", "phd_adviser", sources.pan, "Xingang Pan 本人主页明确列 Xiaoou Tang 为 CUHK 博士导师。"),
  lineage("thesis5-theobalt-pan", "christian-theobalt-lineage", "xingang-pan-ntu", "postdoc_mentor", sources.pan, "Xingang Pan 本人主页明确列 Christian Theobalt 为 MPI 博士后导师。"),
  lineage("thesis5-latombe-hsu", "jean-claude-latombe-lineage", "david-hsu-nus", "phd_adviser", sources.hsu, "David Hsu 的 Stanford 托管主页明确列 Jean-Claude Latombe 为博士导师。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({ facts: [{ label: "培养轨迹", value, source: proof }], sources: [proof], lastVerifiedAt: checkedAt });

export const thesisSupervisorPersonEnhancements5: Record<string, Partial<Person>> = {
  "jing-jiang": targetFact("UIUC 博士导师：ChengXiang Zhai。", sources.jing),
  "chen-change-loy": targetFact("Queen Mary 共同博士导师：Tao Xiang、Shaogang Gong。", sources.loy),
  "xingang-pan-ntu": targetFact("CUHK 博士导师：Xiaoou Tang；MPI 博士后导师：Christian Theobalt。", sources.pan),
  "david-hsu-nus": targetFact("Stanford 博士导师：Jean-Claude Latombe。", sources.hsu),
};
