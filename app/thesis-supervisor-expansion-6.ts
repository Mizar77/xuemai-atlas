import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });

const sources = {
  sun: source(
    "Chinese Academy of Sciences · history of iris recognition",
    "https://www.cas.cn/cm/202411/t20241118_5039789.shtml",
    "CAS article explicitly describes Zhenan Sun as a doctoral researcher trained by Tieniu Tan",
  ),
  wang: source(
    "CCF Computer Vision Technical Committee · Wang Liang profile",
    "https://tc.ccf.org.cn/upload/resources/file/2018/07/09/76492.pdf",
    "CCF profile explicitly identifies Tieniu Tan as Liang Wang's adviser",
  ),
};

const lineage = (id: string, to: string, proof: Source, evidence: string): Relationship => ({
  id,
  from: "tieniu-tan-cas",
  to,
  type: "lineage",
  subtype: "phd_adviser",
  label: "博士导师",
  evidence,
  source: proof,
  verified: true,
  evidenceObject: "中科院学术史料 / CCF 人物专访",
});

export const thesisSupervisorRelationships6: Relationship[] = [
  lineage("thesis6-tan-sun", "zhenan-sun-cas", sources.sun, "中国科学院学术史料明确称孙哲南为谭铁牛培养的虹膜识别领域博士。"),
  lineage("thesis6-tan-wang", "liang-wang-cas", sources.wang, "CCF 计算机视觉专委会人物材料明确称谭铁牛为王亮的导师。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({ facts: [{ label: "博士师承", value, source: proof }], sources: [proof], lastVerifiedAt: checkedAt });

export const thesisSupervisorPersonEnhancements6: Record<string, Partial<Person>> = {
  "zhenan-sun-cas": targetFact("中国科学院自动化所博士导师：谭铁牛。", sources.sun),
  "liang-wang-cas": targetFact("中国科学院自动化所博士导师：谭铁牛。", sources.wang),
};
