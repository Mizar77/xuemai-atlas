import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  hanwangThesis: source(
    "NUS ScholarBank · Hanwang Zhang PhD thesis",
    "https://scholarbank.nus.edu.sg/handle/10635/49363",
    "thesis",
    "The repository metadata identifies ZHANG HANWANG as the PhD author and CHUA TAT SENG as supervisor.",
  ),
  hanwangNtu: source(
    "NTU Artificial & Augmented Intelligence · Hanwang Zhang",
    "https://www.ntu.edu.sg/research/research-focus/research-cluster-1-artificalandaugumentedintelligence/our-people/2",
    "official",
    "Current NTU appointment and applied-causality research profile.",
  ),
  xiangWangHome: source(
    "Xiang Wang · academic homepage",
    "https://xiangwang1223.github.io/",
    "profile",
    "NUS PhD supervision by Tat-Seng Chua, NExT++ research-fellow trajectory, current USTC appointment and research profile.",
  ),
  xiangWangUstc: source(
    "中国科大人工智能与数据科学学院 · 王翔",
    "https://saids.ustc.edu.cn/2022/0321/c36362a549612/page.htm",
    "official",
    "Current USTC professorship, NUS PhD period and research record.",
  ),
  fuliHome: source(
    "Fuli Feng · academic homepage",
    "https://fulifeng.github.io/",
    "profile",
    "NUS PhD adviser Tat-Seng Chua, NUS postdoctoral supervision and current USTC appointment.",
  ),
  fuliUstc: source(
    "中国科大人工智能与数据科学学院 · 冯福利",
    "https://saids.ustc.edu.cn/2022/0317/c36359a549216/page.htm",
    "official",
    "Current USTC professorship and NUS postdoctoral research trajectory.",
  ),
  wenjieHome: source(
    "Wenjie Wang · USTC faculty homepage",
    "https://dslx.ustc.edu.cn/?expertid=6572502&menu=expert_paper",
    "official",
    "Current USTC professorship, NUS PhD adviser Tat-Seng Chua, NExT++ postdoctoral work and research topics.",
  ),
  wenjieUstc: source(
    "中国科大信息科学技术学院 · 王文杰",
    "https://eeis.ustc.edu.cn/2025/0704/c2648a690173/page.htm",
    "official",
    "Current USTC faculty profile and representative work in recommendation and generative AI.",
  ),
  xunUstc: source(
    "中国科大教师主页 · 杨勋",
    "https://faculty.ustc.edu.cn/yangxun/",
    "official",
    "Current USTC appointment and 2018–2021 NUS NExT postdoctoral supervision by Tat-Seng Chua.",
  ),
  xunHome: source(
    "Xun Yang · academic homepage",
    "https://sites.google.com/site/xunyangprofile/",
    "profile",
    "USTC tenure-track role, NUS NExT++ postdoctoral adviser and multimodal-computing research.",
  ),
  junbinUstc: source(
    "中国科大教师主页 · 肖俊斌",
    "https://faculty.ustc.edu.cn/xiaojunbin/zh_CN/index.htm",
    "official",
    "Current USTC professorship and NUS PhD supervision by Tat-Seng Chua.",
  ),
  junbinHome: source(
    "Junbin Xiao · curriculum vitae",
    "https://doc-doc.github.io/cv/",
    "cv",
    "NUS PhD adviser, NExT++ trajectory, current USTC appointment and multimodal research focus.",
  ),
  anHome: source(
    "An Zhang · academic homepage",
    "https://anzhang314.github.io/",
    "profile",
    "Current USTC appointment and NExT++ postdoctoral research with Tat-Seng Chua.",
  ),
  anNus: source(
    "Zhang An · NExT++ profile",
    "https://anzhang.mystrikingly.com/",
    "profile",
    "Research-fellow supervision by Tat-Seng Chua and separate PhD supervision by Chen Zehua.",
  ),
  heHome: source(
    "Xiangnan He · academic homepage",
    "https://hexiangnan.github.io/",
    "profile",
    "NUS postdoctoral supervision by Tat-Seng Chua and current USTC role.",
  ),
};

const person = (
  id: string,
  name: string,
  role: string,
  area: string,
  tags: string[],
  summary: string,
  personSources: [Source, Source],
  index: number,
): Person => ({
  id,
  name,
  role,
  institution: "USTC",
  region: "Mainland China",
  area,
  tags,
  summary,
  stage: "senior",
  category: "core",
  primary: true,
  x: 130 + (index % 3) * 155,
  y: 150 + Math.floor(index / 3) * 130,
  sources: personSources,
  facts: [
    { label: "当前任职", value: `中国科学技术大学 · ${role}`, source: personSources[1] },
    { label: "蔡达成谱系", value: summary, source: personSources[0] },
    { label: "研究主线", value: area, source: personSources[0] },
  ],
  lastVerifiedAt: checkedAt,
});

/**
 * Current USTC faculty found by checking first-party faculty pages and CVs for
 * an explicit Tat-Seng Chua adviser/mentor statement. Ordinary coauthors are
 * intentionally excluded.
 */
export const chuaUstcLineagePeople: Person[] = [
  person(
    "xiang-wang-ustc",
    "王翔",
    "Professor",
    "Graph Learning · Recommender Systems · Explainable AI · Foundation Models",
    ["图学习", "推荐系统", "可解释 AI", "基础模型", "NExT++"],
    "2014–2019 年在 NUS 攻读计算机博士，导师为蔡达成；随后在 NExT++ 任 Research Fellow / Senior Research Fellow，2022 年加入中国科大。",
    [sources.xiangWangHome, sources.xiangWangUstc],
    0,
  ),
  person(
    "fuli-feng-ustc",
    "冯福利",
    "Professor",
    "Recommender Systems · Causal Learning · Personalized LLMs",
    ["推荐系统", "因果学习", "个性化 LLM", "NExT++"],
    "2015–2019 年在 NUS 攻读计算机博士，导师为蔡达成；之后继续在 NUS 从事博士后研究，2022 年加入中国科大。",
    [sources.fuliHome, sources.fuliUstc],
    1,
  ),
  person(
    "wenjie-wang-ustc",
    "王文杰",
    "Professor",
    "Personalized LLMs and Agents · Multimodal Generation · Causal Reasoning",
    ["个性化 LLM", "智能体", "多模态生成", "因果推理", "NExT++"],
    "2019–2023 年在 NUS 攻读计算机博士，导师为蔡达成，Fuli Feng 与何向南担任 mentors；之后在 NExT++ 从事博士后研究。",
    [sources.wenjieHome, sources.wenjieUstc],
    2,
  ),
  person(
    "xun-yang-ustc",
    "杨勋",
    "Specially Appointed Professor · PhD Adviser",
    "Multimedia Computing · Computer Vision · Multimodal Reasoning · Trustworthy AI",
    ["多媒体", "计算机视觉", "多模态推理", "可信 AI", "NExT"],
    "博士导师为汪萌；2018–2021 年在 NUS NExT 任全职博士后研究员，由蔡达成指导，2021 年加入中国科大。",
    [sources.xunUstc, sources.xunHome],
    3,
  ),
  person(
    "junbin-xiao-ustc",
    "肖俊斌",
    "Specially Appointed Professor · PhD Adviser",
    "Multimodal LLMs · Video Question Answering · Embodied Assistance · Trustworthy AI",
    ["多模态大模型", "视频问答", "具身辅助", "可信 AI", "NExT++"],
    "2023 年获 NUS 计算机博士学位，导师为蔡达成，并与 Angela Yao 紧密合作；留校博士后至 2026 年后加入中国科大。",
    [sources.junbinUstc, sources.junbinHome],
    4,
  ),
];
export const chuaUstcLineagePersonEnhancements: Record<string, Partial<Person>> = {
  "hanwang-zhang-ntu": {
    summary: "NTU 因果 AI、计算机视觉与视觉语言推理 PI；NUS 博士论文库明确记录其博士导师为蔡达成。",
    tags: ["蔡达成谱系", "NUS 博士", "因果 AI", "视觉语言推理"],
    facts: [
      { label: "博士师承", value: "NUS 计算机博士；博士论文《Attribute-based Image Retrieval》元数据明确列蔡达成为 supervisor。", source: sources.hanwangThesis },
      { label: "当前任职", value: "NTU Associate Professor，研究应用因果 AI、计算机视觉与视觉语言推理。", source: sources.hanwangNtu },
    ],
    sources: [sources.hanwangThesis, sources.hanwangNtu],
    lastVerifiedAt: checkedAt,
  },
  "an-zhang-ustc": {
    tags: ["蔡达成谱系", "NExT++ 博士后"],
    facts: [
      { label: "NExT++ 指导", value: "NUS 统计学博士导师为陈泽华；博士后 Research Fellow 阶段在 NExT++ 与蔡达成工作。", source: sources.anNus },
      { label: "当前任职", value: "中国科大教授、Alpha Lab 负责人，研究 LLM、AI Agents、个性化与可信 AI。", source: sources.anHome },
    ],
    sources: [sources.anHome, sources.anNus],
    lastVerifiedAt: checkedAt,
  },
  "xiangnan-he-ustc-award": {
    tags: ["蔡达成谱系", "NExT++ 博士后"],
    facts: [
      { label: "NExT++ 指导", value: "2016–2019 年在 NUS 从事博士后研究，由蔡达成指导；此关系不是其博士师承。", source: sources.heHome },
    ],
    sources: [sources.heHome],
    lastVerifiedAt: checkedAt,
  },
};

const lineage = (
  id: string,
  to: string,
  subtype: "phd_adviser" | "postdoc_mentor",
  evidence: string,
  evidenceSource: Source,
  endYear?: number,
): Relationship => ({
  id,
  from: "tat-seng-chua",
  to,
  type: "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : "博士后 / Research Fellow 指导",
  evidence,
  evidenceObject: "一手博士论文元数据、学校教师主页或本人履历；不以普通合著推断师承",
  source: evidenceSource,
  verified: true,
  endYear,
});

export const chuaUstcLineageRelationships: Relationship[] = [
  lineage("chua-hanwang-zhang-phd", "hanwang-zhang-ntu", "phd_adviser", "NUS ScholarBank 的 Hanwang Zhang 博士论文元数据明确把 CHUA TAT SENG 列为 supervisor。", sources.hanwangThesis, 2014),
  lineage("chua-xiang-wang-ustc-phd", "xiang-wang-ustc", "phd_adviser", "王翔本人主页明确记录其 NUS 计算机博士由 Tat-Seng Chua 指导。", sources.xiangWangHome, 2019),
  lineage("chua-fuli-feng-ustc-phd", "fuli-feng-ustc", "phd_adviser", "冯福利本人主页明确记录其 NUS 计算机博士导师为 Tat-Seng Chua。", sources.fuliHome, 2019),
  lineage("chua-wenjie-wang-ustc-phd", "wenjie-wang-ustc", "phd_adviser", "王文杰中国科大个人主页明确记录其 NUS 计算机博士导师为 Tat-Seng Chua。", sources.wenjieHome, 2023),
  lineage("chua-junbin-xiao-ustc-phd", "junbin-xiao-ustc", "phd_adviser", "中国科大官方教师主页明确记录肖俊斌的 NUS 博士师从蔡达成。", sources.junbinUstc, 2023),
  lineage("chua-xun-yang-ustc-postdoc", "xun-yang-ustc", "postdoc_mentor", "中国科大官方教师主页明确记录杨勋 2018–2021 年在 NUS NExT 任博士后，指导教授为 Tat-Seng Chua。", sources.xunUstc, 2021),
  lineage("chua-an-zhang-ustc-postdoc", "an-zhang-ustc", "postdoc_mentor", "张岸本人履历明确区分：NUS 统计学博士导师为陈泽华，随后在 NExT++ 任 Research Fellow 并由 Tat-Seng Chua 指导。", sources.anNus),
];
