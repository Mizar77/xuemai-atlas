import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  xiaogang: source(
    "Xiaogang Wang · CUHK CV",
    "https://www.ee.cuhk.edu.hk/~xgwang/cv_xiaogang_cuhk.pdf",
    "cv",
    "CV names W. Eric L. Grimson as Xiaogang Wang's MIT PhD adviser",
  ),
  tianfan: source(
    "Tianfan Xue · homepage",
    "https://tianfan.info/index.html",
    "profile",
    "Homepage names William T. Freeman as PhD supervisor and Xiaoou Tang and Jianzhuang Liu as MPhil supervisors",
  ),
  anyi: source(
    "Anyi Rao · homepage",
    "https://anyirao.com/",
    "profile",
    "Homepage names Dahua Lin and Bolei Zhou for the CUHK PhD and Maneesh Agrawala for the Stanford postdoc",
  ),
  hengshuang: source(
    "Hengshuang Zhao · HKU homepage",
    "https://i.cs.hku.hk/~hszhao/",
    "profile",
    "Homepage names Jiaya Jia as PhD supervisor and Antonio Torralba and Philip Torr as postdoctoral supervisors",
  ),
  dan: source(
    "Dan Xu · homepage",
    "https://www.danxurgb.net/",
    "profile",
    "Homepage names Nicu Sebe as PhD supervisor and Andrea Vedaldi and Andrew Zisserman as postdoctoral supervisors",
  ),
  xihui: source(
    "HKU ECE · Xihui Liu",
    "https://ece.hku.hk/people/xihui-liu/",
    "official",
    "Official biography names Xiaogang Wang and Hongsheng Li as PhD supervisors and Trevor Darrell as postdoctoral adviser",
  ),
};

const mentor = (
  id: string,
  name: string,
  role: string,
  region: Person["region"],
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
  region,
  area,
  tags: ["导师节点", "培养关系", ...area.split(" · ").slice(0, 2)],
  summary: "由本人 CV、个人主页或院系官方履历明确确认的培养节点。",
  facts: [{ label: "图谱定位", value: "仅表达公开材料明确记载的培养关系。", source: proof }],
  stage: "historical",
  category: "historical",
  sources: [proof],
  x,
  y: 55,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople4: Person[] = [
  mentor("eric-grimson-lineage", "W. Eric L. Grimson", "Professor", "United States", "Computer Vision · Artificial Intelligence", sources.xiaogang, "MIT", 160),
  mentor("jianzhuang-liu-lineage", "Jianzhuang Liu", "Computer vision researcher", "Hong Kong", "Computer Vision · Pattern Recognition", sources.tianfan, "CUHK / Shenzhen Institute of Artificial Intelligence and Robotics for Society", 360),
  mentor("maneesh-agrawala-lineage", "Maneesh Agrawala", "Professor", "United States", "Computer Graphics · Human-Computer Interaction", sources.anyi, "Stanford University", 560),
  mentor("nicu-sebe-lineage", "Nicu Sebe", "Professor", "Europe", "Multimedia · Computer Vision", sources.dan, "University of Trento", 760),
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: "phd_adviser" | "co_adviser" | "master_adviser" | "postdoc_mentor",
  proof: Source,
  evidence: string,
): Relationship => ({
  id,
  from,
  to,
  type: subtype === "postdoc_mentor" ? "talent" : "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : subtype === "co_adviser" ? "共同博士导师" : subtype === "master_adviser" ? "硕士导师" : "博士后导师",
  evidence,
  source: proof,
  verified: true,
  evidenceObject: "本人 CV / 本人主页 / 院系官方履历",
});

export const thesisSupervisorRelationships4: Relationship[] = [
  lineage("thesis4-grimson-wang", "eric-grimson-lineage", "xiaogang-wang-cuhk", "phd_adviser", sources.xiaogang, "Xiaogang Wang 的 CUHK CV 明确列 W. Eric L. Grimson 为 MIT 博士导师。"),
  lineage("thesis4-freeman-xue", "william-freeman-lineage", "tianfan-xue-cuhk", "phd_adviser", sources.tianfan, "Tianfan Xue 本人主页明确列 William T. Freeman 为 MIT 博士导师。"),
  lineage("thesis4-tang-xue", "xiaoou-tang-cuhk", "tianfan-xue-cuhk", "master_adviser", sources.tianfan, "Tianfan Xue 本人主页明确列 Xiaoou Tang 为 CUHK MPhil 导师。"),
  lineage("thesis4-liu-xue", "jianzhuang-liu-lineage", "tianfan-xue-cuhk", "master_adviser", sources.tianfan, "Tianfan Xue 本人主页明确列 Jianzhuang Liu 为 CUHK MPhil 导师。"),
  lineage("thesis4-lin-rao", "dahua-lin-cuhk", "anyi-rao-hkust", "co_adviser", sources.anyi, "Anyi Rao 本人主页明确列 Dahua Lin 为 CUHK 共同博士导师。"),
  lineage("thesis4-zhou-rao", "bolei-zhou-us", "anyi-rao-hkust", "co_adviser", sources.anyi, "Anyi Rao 本人主页明确列 Bolei Zhou 为 CUHK 共同博士导师。"),
  lineage("thesis4-agrawala-rao", "maneesh-agrawala-lineage", "anyi-rao-hkust", "postdoc_mentor", sources.anyi, "Anyi Rao 本人主页明确记录其 Stanford 博士后阶段与 Maneesh Agrawala 工作。"),
  lineage("thesis4-jia-zhao", "jiaya-jia-hkust", "hengshuang-zhao-hku", "phd_adviser", sources.hengshuang, "Hengshuang Zhao 本人主页明确列 Jiaya Jia 为 CUHK 博士导师。"),
  lineage("thesis4-torralba-zhao", "antonio-torralba-us", "hengshuang-zhao-hku", "postdoc_mentor", sources.hengshuang, "Hengshuang Zhao 本人主页明确列 Antonio Torralba 为 MIT 博士后导师。"),
  lineage("thesis4-torr-zhao", "philip-torr-eu", "hengshuang-zhao-hku", "postdoc_mentor", sources.hengshuang, "Hengshuang Zhao 本人主页明确列 Philip Torr 为 Oxford 博士后导师。"),
  lineage("thesis4-sebe-xu", "nicu-sebe-lineage", "dan-xu-hkust", "phd_adviser", sources.dan, "Dan Xu 本人主页明确列 Nicu Sebe 为 University of Trento 博士导师。"),
  lineage("thesis4-vedaldi-xu", "andrea-vedaldi-oxford-award", "dan-xu-hkust", "postdoc_mentor", sources.dan, "Dan Xu 本人主页明确列 Andrea Vedaldi 为 Oxford 博士后导师。"),
  lineage("thesis4-zisserman-xu", "andrew-zisserman-eu", "dan-xu-hkust", "postdoc_mentor", sources.dan, "Dan Xu 本人主页明确列 Andrew Zisserman 为 Oxford 博士后导师。"),
  lineage("thesis4-wang-liu", "xiaogang-wang-cuhk", "xihui-liu-hku", "co_adviser", sources.xihui, "HKU ECE 官方简介明确列 Xiaogang Wang 为 Xihui Liu 的 CUHK 共同博士导师。"),
  lineage("thesis4-li-liu", "hongsheng-li-cuhk", "xihui-liu-hku", "co_adviser", sources.xihui, "HKU ECE 官方简介明确列 Hongsheng Li 为 Xihui Liu 的 CUHK 共同博士导师。"),
  lineage("thesis4-darrell-liu", "trevor-darrell-us", "xihui-liu-hku", "postdoc_mentor", sources.xihui, "HKU ECE 官方简介明确列 Trevor Darrell 为 Xihui Liu 的 Berkeley 博士后导师。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({
  facts: [{ label: "培养轨迹", value, source: proof }],
  sources: [proof],
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPersonEnhancements4: Record<string, Partial<Person>> = {
  "xiaogang-wang-cuhk": targetFact("MIT 博士导师：W. Eric L. Grimson。", sources.xiaogang),
  "tianfan-xue-cuhk": targetFact("MIT 博士导师：William T. Freeman；CUHK MPhil 导师：Xiaoou Tang、Jianzhuang Liu。", sources.tianfan),
  "anyi-rao-hkust": targetFact("CUHK 共同博士导师：Dahua Lin、Bolei Zhou；Stanford 博士后导师：Maneesh Agrawala。", sources.anyi),
  "hengshuang-zhao-hku": targetFact("CUHK 博士导师：Jiaya Jia；MIT/Oxford 博士后导师：Antonio Torralba、Philip Torr。", sources.hengshuang),
  "dan-xu-hkust": targetFact("Trento 博士导师：Nicu Sebe；Oxford 博士后导师：Andrea Vedaldi、Andrew Zisserman。", sources.dan),
  "xihui-liu-hku": targetFact("CUHK 共同博士导师：Xiaogang Wang、Hongsheng Li；Berkeley 博士后导师：Trevor Darrell。", sources.xihui),
};
