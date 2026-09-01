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
  yinLiHome: source(
    "Yin Li · UW–Madison homepage",
    "https://www.biostat.wisc.edu/~yli/",
    "profile",
    "UW–Madison Associate Professor appointment, research areas, current team, alumni roster and Yiwu Zhong's 2018–2023 PhD training",
  ),
  yinLiUw: source(
    "UW–Madison Computer Sciences · Yin Li",
    "https://www.cs.wisc.edu/staff/li-yin/",
    "official",
    "UW–Madison faculty affiliation, institutional contact record and official portrait",
  ),
  yiwuThesis: source(
    "UW–Madison dissertation · Learning Visual Knowledge from Natural Language Supervision",
    "https://asset.library.wisc.edu/1711.dl/NDW2GRIYP7CZ68Y/R/file-e1c7b.pdf",
    "thesis",
    "Yiwu Zhong's 2023 doctoral dissertation explicitly identifies Yin Li as adviser",
  ),
};

const yinLiPortrait: NonNullable<Person["portrait"]> = {
  src: "portraits/influence-queue-asia-final/yin-li-wisc.jpg",
  alt: "Yin Li official UW–Madison faculty portrait",
  source: sources.yinLiUw,
};

export const influenceQueueAsiaFinalPeople: Person[] = [
  {
    id: "yin-li-wisc",
    name: "Yin Li",
    role: "Associate Professor · Biostatistics & Medical Informatics · Computer Sciences",
    institution: "External",
    actualInstitution: "University of Wisconsin–Madison",
    region: "United States",
    area: "Computer Vision · Multimodal Learning · Mobile Health",
    tags: ["计算机视觉", "视频理解", "多模态学习", "移动健康", "UW–Madison"],
    summary: "UW–Madison 计算机视觉与机器学习 PI，团队覆盖视频理解、视觉—语言学习与移动健康；本人维护的校友名录和博士论文共同核验其对钟亦武的博士指导关系。",
    facts: [
      {
        label: "当前任职",
        value: "University of Wisconsin–Madison Associate Professor，任职于 Biostatistics & Medical Informatics，并与 Computer Sciences 交叉任职。",
        source: sources.yinLiHome,
      },
      {
        label: "研究主线",
        value: "Computer Vision、Machine Learning 与 Mobile Health，覆盖视频理解、视觉表征和多模态学习。",
        source: sources.yinLiHome,
      },
      {
        label: "教育与学术训练",
        value: "本人主页按当前成员与 alumni 分列博士生、共同指导学生及公开去向。",
        source: sources.yinLiHome,
      },
      {
        label: "博士生谱系",
        value: "本人校友名录将 Yiwu Zhong 列为 2018–2023 年 Computer Sciences 博士生；其 UW–Madison 博士论文题名页明确标注 Yin Li 为 Adviser。",
        source: sources.yiwuThesis,
      },
      {
        label: "为什么值得关注",
        value: "连接 UW–Madison 视觉学习谱系与北京大学新一代多模态 PI，并公开保留完整团队和校友职业流向。",
        source: sources.yinLiHome,
      },
    ],
    stage: "senior",
    category: "adjacent",
    status: "current PI · verified doctoral lineage",
    sources: [sources.yinLiHome, sources.yinLiUw, sources.yiwuThesis],
    x: 2380,
    y: 1020,
    primary: true,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait: yinLiPortrait,
  },
];

export const influenceQueueAsiaFinalRelationships: Relationship[] = [
  {
    id: "influence-asia-final-yin-li-yiwu-zhong",
    from: "yin-li-wisc",
    to: "yiwu-zhong-pku",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "钟亦武 2023 年 UW–Madison 博士论文题名页明确将 Yin Li 标为 Adviser；Yin Li 本人维护的 alumni 名录亦列出钟亦武的 2018–2023 博士训练。",
    evidenceObject: "UW–Madison doctoral dissertation title page and adviser-maintained alumni roster",
    source: sources.yiwuThesis,
    verified: true,
  },
];

export const influenceQueueAsiaFinalPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "yin-li-wisc": yinLiPortrait,
};

export const people = influenceQueueAsiaFinalPeople;
export const relationships = influenceQueueAsiaFinalRelationships;
export const portraitMap = influenceQueueAsiaFinalPortraits;
