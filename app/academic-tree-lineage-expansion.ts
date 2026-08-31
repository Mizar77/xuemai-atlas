import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";

const source = (label: string, url: string, supports: string, kind: Source["kind"] = "official"): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const academicTreeExport = source(
  "Academic Tree · open data export",
  "https://academictree.org/export.php",
  "CC BY 3.0 genealogy data and explicit relation codes; used only to discover candidates, not as sole verification",
  "profile",
);
const levyTree = source(
  "Academic Tree · Roger Levy",
  "https://academictree.org/linguistics/peopleinfo.php?pid=158314",
  "Candidate discovery for the Manning → Levy → Futrell lineage",
  "profile",
);

const levyHome = source(
  "MIT · Roger Levy",
  "https://www.mit.edu/~rplevy/",
  "Current MIT professorship, Computational Psycholinguistics Laboratory leadership and research programme",
  "profile",
);
const levyCv = source(
  "Roger Levy · CV",
  "https://www.mit.edu/~rplevy/roger-levy-cv.pdf",
  "Stanford PhD, dissertation committee chaired by Christopher Manning, and academic career",
  "cv",
);
const levyThesis = source(
  "Stanford NLP · Roger Levy dissertation",
  "https://nlp.stanford.edu/~manning/dissertations/Levy-Roger-2005-thesis.pdf",
  "Dissertation acknowledgement explicitly identifies Christopher Manning as adviser",
  "thesis",
);
const futrellHome = source(
  "Richard Futrell · homepage",
  "https://sites.socsci.uci.edu/~rfutrell/index.html",
  "MIT PhD thesis explicitly listed as completed with Ted Gibson and Roger Levy",
  "profile",
);

const bartoUmass = source(
  "UMass Amherst CICS · Andrew G. Barto",
  "https://www.cics.umass.edu/about/directory/andrew-g-barto",
  "Professor Emeritus status, Autonomous Learning Laboratory leadership and reinforcement-learning research",
);
const bartoSutton = source(
  "UMass Amherst · Barto and Sutton Turing Award",
  "https://www.cics.umass.edu/news/barto-2024-acm-turing-award",
  "Richard Sutton is identified as Andrew Barto's former graduate student",
);
const acmBarto = source(
  "ACM · Andrew Barto",
  "https://awards.acm.org/award_winners/barto_9471663",
  "2024 Turing Award and description of Sutton as Barto's PhD student",
);

const hintonStudents = source(
  "Geoffrey Hinton · former PhD students",
  "https://www.cs.utoronto.ca/~hinton/gradstuphd.html",
  "First-party roster lists Richard Zemel (1994) and Yee Whye Teh (2003)",
  "profile",
);

export const academicTreeLineagePeople: Person[] = [
  {
    id: "roger-levy-us",
    name: "Roger Levy",
    role: "Professor · Director, Computational Psycholinguistics Laboratory",
    institution: "MIT",
    region: "United States",
    area: "Computational Psycholinguistics · Natural Language Processing",
    tags: ["NLP", "心理语言学", "语言处理", "导师谱系", "Academic Tree 复核"],
    summary: "MIT 计算心理语言学实验室负责人，以概率建模、心理语言学实验和大规模语言数据研究人类语言处理；师承链连接 Christopher Manning 与 Richard Futrell。",
    facts: [
      { label: "当前任职", value: "MIT Brain and Cognitive Sciences Professor · Computational Psycholinguistics Laboratory Director", source: levyHome },
      { label: "博士师承", value: "Stanford Linguistics PhD；论文致谢明确称 Christopher Manning 为 adviser", source: levyThesis },
      { label: "研究主线", value: "语言处理与习得的概率模型、心理语言学实验和自然语言数据分析", source: levyHome },
      { label: "学术轨迹", value: "UC San Diego faculty → MIT faculty；2025–2027 MIT Faculty Chair", source: levyHome },
    ],
    stage: "senior",
    category: "core",
    status: "current PI",
    sources: [levyHome, levyCv, levyThesis, levyTree, academicTreeExport],
    x: 0,
    y: 0,
    primary: true,
    lastVerifiedAt: checkedAt,
  },
  {
    id: "andrew-barto-us",
    name: "Andrew G. Barto",
    role: "Professor Emeritus · Co-founder, Autonomous Learning Laboratory",
    institution: "UMass",
    region: "United States",
    area: "Reinforcement Learning · Artificial Intelligence",
    tags: ["强化学习", "AI 奠基人物", "图灵奖", "Richard Sutton 导师"],
    summary: "强化学习的奠基人物、UMass Amherst 荣休教授；作为 Richard Sutton 的博士导师，以真实学校节点连接美国与加拿大的 RLAI 谱系。",
    facts: [
      { label: "学术身份", value: "UMass Amherst Professor Emeritus；Autonomous Learning Laboratory 联合创办人", source: bartoUmass },
      { label: "师承位置", value: "UMass 与 ACM 均明确称 Richard Sutton 为其 former graduate / PhD student", source: bartoSutton },
      { label: "重要荣誉", value: "2024 ACM A.M. Turing Award（与 Richard Sutton 共同获奖）", source: acmBarto },
      { label: "招生状态", value: "2012 年退休，不再接收学生、实习生或博士后", source: source("Andrew Barto · homepage", "https://people.cs.umass.edu/~barto/", "Retirement and no-longer-recruiting notice", "profile") },
    ],
    stage: "historical",
    category: "historical",
    status: "荣休 · 通过师承关系展示",
    sources: [bartoUmass, bartoSutton, acmBarto, academicTreeExport],
    x: 0,
    y: 0,
    primary: false,
    lastVerifiedAt: checkedAt,
  },
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: NonNullable<Relationship["subtype"]>,
  evidence: string,
  evidenceSource: Source,
  endYear?: number,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "co_adviser" ? "共同博士导师" : "博士导师",
  evidence,
  source: evidenceSource,
  verified: true,
  endYear,
  evidenceObject: "Academic Tree candidate discovery; reverified against first-party CV, thesis or institutional record",
});

export const academicTreeLineageRelationships: Relationship[] = [
  lineage("academic-tree-manning-levy", "christopher-manning-us", "roger-levy-us", "phd_adviser", "Roger Levy 的 Stanford 博士论文致谢明确称 Christopher Manning 为 adviser；其 CV 将 Manning 列为论文委员会主席。", levyThesis, 2005),
  lineage("academic-tree-levy-futrell", "roger-levy-us", "richard-futrell-award", "co_adviser", "Richard Futrell 的本人主页将 2017 MIT 博士论文列为与 Ted Gibson、Roger Levy 共同完成。", futrellHome, 2017),
  lineage("academic-tree-barto-sutton", "andrew-barto-us", "richard-sutton-ca", "phd_adviser", "UMass Amherst 与 ACM 的 2024 Turing Award 资料均明确称 Richard Sutton 是 Andrew Barto 的博士生。", bartoSutton, 1984),
  lineage("academic-tree-hinton-zemel", "geoffrey-hinton-ca", "richard-zemel-ca", "phd_adviser", "Geoffrey Hinton 的本人 former-PhD-students 名录列出 Richard Zemel（1994）及其博士论文。", hintonStudents, 1994),
  lineage("academic-tree-hinton-teh", "geoffrey-hinton-ca", "yee-whye-teh-lineage", "phd_adviser", "Geoffrey Hinton 的本人 former-PhD-students 名录列出 Yee Whye Teh（2003）及其博士论文。", hintonStudents, 2003),
];

