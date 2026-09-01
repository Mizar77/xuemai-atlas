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
  yejin: source("Yejin Choi · Cornell CV", "https://www.cs.cornell.edu/~ychoi/Papers/YejinChoi-CV.pdf", "cv", "Cornell PhD education entry explicitly names Claire Cardie as adviser"),
  noah: source("Jason Eisner · CV", "https://www.cs.jhu.edu/~jason/cv.pdf", "cv", "Jason Eisner lists Noah A. Smith among former PhD students advised from 2001 to 2006"),
  luke: source("Michael Collins · Former Group Members", "https://www.cs.columbia.edu/~mcollins/group.html", "profile", "Luke Zettlemoyer is listed with MIT PhD co-advisers Michael Collins and Leslie Kaelbling"),
  hannaneh: source("UIUC IDEALS · Hannaneh Hajishirzi dissertation", "https://www.ideals.illinois.edu/items/29911", "thesis", "Institutional dissertation metadata names Eyal Amir as adviser"),
  yulia: source("CMU LTI · Yulia Tsvetkov alumni profile", "https://www.lti.cs.cmu.edu/people/alumni/alumni-2016/tsvetkov-yulia.html", "official", "CMU alumni record names Christopher Dyer as academic adviser"),
  althoff: source("Tim Althoff · Stanford PhD thesis", "https://homes.cs.washington.edu/~althoff/docs/althoff-2018-phd_thesis.pdf", "thesis", "Dissertation acknowledgements explicitly identify Jure Leskovec as PhD adviser"),
  grosse: source("Roger Grosse · MIT PhD thesis", "https://www.cs.toronto.edu/~rgrosse/publications/phd-thesis.pdf", "thesis", "Signed thesis title page names William T. Freeman as thesis supervisor"),
  doina: source("UMass ScholarWorks · Doina Precup dissertation", "https://scholarworks.umass.edu/dissertations/AAI9978540/", "thesis", "Institutional dissertation record for Temporal Abstraction in Reinforcement Learning identifies Richard Sutton's supervision"),
  silver: source("University of Alberta repository · David Silver dissertation", "https://doi.org/10.7939/R39D8T", "thesis", "Institutional doctoral record for Reinforcement Learning and Simulation-Based Search in Computer Go identifies Richard Sutton"),
  pineau: source("CMU Robotics Institute · Joëlle Pineau dissertation", "https://www.ri.cmu.edu/pub_files/pub4/pineau_joelle_2004_1/pineau_joelle_2004_1.pdf", "thesis", "CMU dissertation title material names Sebastian Thrun and Geoffrey Gordon as supervisors"),
  torr: source("Oxford Engineering · Philip Torr", "https://eng.ox.ac.uk/people/philip-torr", "official", "Oxford biography explicitly states that Philip Torr completed his DPhil under David Murray"),
  lawrence: source("Neil Lawrence · Cambridge homepage", "https://www.cl.cam.ac.uk/~ndl21/", "profile", "Contemporaneous Cambridge homepage states PhD study under Christopher Bishop"),
  jiaya: source("HKUST VisGraph · People", "https://cse.hkust.edu.hk/visgraph/people.html", "official", "HKUST laboratory alumni roster lists Leo Jiaya Jia with adviser Chi-Keung Tang"),
  qiang: source("Qiang Yang · HKUST homepage", "https://cse.hkust.edu.hk/~qyang/", "profile", "Biography explicitly names Dana S. Nau as University of Maryland PhD supervisor"),
  yima: source("Shankar Sastry · official student list", "https://people.eecs.berkeley.edu/~sastry/students.htm", "profile", "Berkeley adviser roster lists Yi Ma among Shankar Sastry's former students"),
};

const mentor = (
  id: string,
  name: string,
  role: string,
  institution: Person["institution"],
  region: Person["region"],
  area: string,
  summary: string,
  proof: Source,
  x: number,
  y: number,
  actualInstitution?: string,
): Person => ({
  id,
  name,
  role,
  institution,
  actualInstitution,
  region,
  area,
  tags: ["导师节点", "博士培养", ...area.split(" · ").slice(0, 2)],
  summary,
  facts: [
    { label: "图谱定位", value: "由博士论文、本人履历或导师官方学生名录反向确认的导师节点。", source: proof },
    { label: "证据边界", value: "只表达公开材料明确记载的培养关系；不从合著自动推断师承。", source: proof },
  ],
  stage: "historical",
  category: "historical",
  sources: [proof],
  x,
  y,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople2: Person[] = [
  mentor("michael-collins-lineage", "Michael Collins", "Professor", "Columbia", "United States", "NLP · Statistical Parsing", "Luke Zettlemoyer 的 MIT 共同博士导师。", sources.luke, 160, 70),
  mentor("eyal-amir-lineage", "Eyal Amir", "Professor", "UIUC", "United States", "Artificial Intelligence · Reasoning", "Hannaneh Hajishirzi 的 UIUC 博士导师。", sources.hannaneh, 260, 70),
  mentor("jure-leskovec-lineage", "Jure Leskovec", "Professor", "Stanford", "United States", "Graph Learning · Data Mining", "Tim Althoff 的 Stanford 博士导师。", sources.althoff, 360, 70),
  mentor("geoffrey-gordon-lineage", "Geoffrey Gordon", "Professor", "CMU", "United States", "Machine Learning · Reinforcement Learning", "Joëlle Pineau 的 CMU 共同博士导师。", sources.pineau, 460, 70),
  mentor("sebastian-thrun-lineage", "Sebastian Thrun", "Founder and former Stanford Professor", "Stanford", "United States", "Robotics · Artificial Intelligence", "Joëlle Pineau 的 CMU 共同博士导师。", sources.pineau, 560, 70),
  mentor("david-murray-lineage", "David Murray", "Professor Emeritus", "Oxford", "Europe", "Computer Vision · Robotics", "Philip Torr 的 Oxford DPhil 导师。", sources.torr, 160, 70),
  mentor("christopher-bishop-lineage", "Christopher Bishop", "Technical Fellow and Laboratory Director", "Cambridge", "Europe", "Machine Learning · Probabilistic Models", "Neil Lawrence 的 Cambridge 博士导师。", sources.lawrence, 260, 70, "Microsoft Research Cambridge"),
  mentor("chi-keung-tang-lineage", "Chi-Keung Tang", "Professor", "HKUST", "Hong Kong", "Computer Vision · Graphics", "Jiaya Jia 的 HKUST 博士导师。", sources.jiaya, 360, 70),
  mentor("dana-nau-lineage", "Dana S. Nau", "Professor Emeritus", "External", "United States", "AI Planning · Search", "Qiang Yang 的 University of Maryland 博士导师。", sources.qiang, 460, 70, "University of Maryland"),
  mentor("shankar-sastry-lineage", "Shankar Sastry", "Professor", "Berkeley", "United States", "Control · Robotics · Computer Vision", "Yi Ma 的 Berkeley 博士导师。", sources.yima, 560, 70),
];

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: "phd_adviser" | "co_adviser",
  proof: Source,
  evidence: string,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "co_adviser" ? "共同博士导师" : "博士导师",
  evidence,
  source: proof,
  verified: true,
  evidenceObject: "博士论文 / 校方学位记录 / 本人 CV / 导师官方学生名录",
});

export const thesisSupervisorRelationships2: Relationship[] = [
  lineage("thesis2-cardie-choi", "claire-cardie-us", "yejin-choi-us", "phd_adviser", sources.yejin, "Yejin Choi 的 Cornell CV 明确列出博士导师 Claire Cardie。"),
  lineage("thesis2-eisner-smith", "jason-eisner-us", "noah-smith-us", "phd_adviser", sources.noah, "Jason Eisner 的 CV 将 Noah A. Smith 列为其博士生。"),
  lineage("thesis2-collins-zettlemoyer", "michael-collins-lineage", "luke-zettlemoyer-us", "co_adviser", sources.luke, "Michael Collins 的官方组员页列出 Luke Zettlemoyer 及两位 MIT 共同博士导师。"),
  lineage("thesis2-kaelbling-zettlemoyer", "leslie-kaelbling-award", "luke-zettlemoyer-us", "co_adviser", sources.luke, "Michael Collins 的官方组员页列出 Luke Zettlemoyer 及两位 MIT 共同博士导师。"),
  lineage("thesis2-amir-hajishirzi", "eyal-amir-lineage", "hannaneh-hajishirzi-us", "phd_adviser", sources.hannaneh, "UIUC 学位库明确将 Eyal Amir 列为 Hannaneh Hajishirzi 博士论文导师。"),
  lineage("thesis2-dyer-tsvetkov", "chris-dyer", "yulia-tsvetkov-us", "phd_adviser", sources.yulia, "CMU LTI 校友页明确列出 Yulia Tsvetkov 的 Academic Advisor 为 Christopher Dyer。"),
  lineage("thesis2-leskovec-althoff", "jure-leskovec-lineage", "tim-althoff-us", "phd_adviser", sources.althoff, "Tim Althoff 博士论文致谢明确称 Jure Leskovec 为博士导师。"),
  lineage("thesis2-freeman-grosse", "william-freeman-lineage", "roger-grosse-ca", "phd_adviser", sources.grosse, "Roger Grosse 的 MIT 博士论文签字页列 William T. Freeman 为 Thesis Supervisor。"),
  lineage("thesis2-sutton-precup", "richard-sutton-ca", "doina-precup-ca", "phd_adviser", sources.doina, "UMass 博士论文记录确认 Doina Precup 的强化学习博士训练由 Richard Sutton 指导。"),
  lineage("thesis2-sutton-silver", "richard-sutton-ca", "david-silver-eu", "phd_adviser", sources.silver, "University of Alberta 博士论文记录确认 David Silver 的导师为 Richard Sutton。"),
  lineage("thesis2-thrun-pineau", "sebastian-thrun-lineage", "joelle-pineau-ca", "co_adviser", sources.pineau, "Joëlle Pineau 的 CMU 博士论文列 Sebastian Thrun 为共同导师。"),
  lineage("thesis2-gordon-pineau", "geoffrey-gordon-lineage", "joelle-pineau-ca", "co_adviser", sources.pineau, "Joëlle Pineau 的 CMU 博士论文列 Geoffrey Gordon 为共同导师。"),
  lineage("thesis2-murray-torr", "david-murray-lineage", "philip-torr-eu", "phd_adviser", sources.torr, "Oxford 官方简介明确写明 Philip Torr 在 David Murray 指导下完成 DPhil。"),
  lineage("thesis2-bishop-lawrence", "christopher-bishop-lineage", "neil-lawrence-eu", "phd_adviser", sources.lawrence, "Neil Lawrence 的 Cambridge 主页明确写明博士阶段由 Chris Bishop 指导。"),
  lineage("thesis2-tang-jia", "chi-keung-tang-lineage", "jiaya-jia-hkust", "phd_adviser", sources.jiaya, "HKUST VisGraph 官方校友名录将 Jiaya Jia 的导师列为 Chi-Keung Tang。"),
  lineage("thesis2-nau-yang", "dana-nau-lineage", "qiang-yang-polyu", "phd_adviser", sources.qiang, "Qiang Yang 本人 HKUST 主页明确写明 Maryland 博士导师为 Dana S. Nau。"),
  lineage("thesis2-sastry-ma", "shankar-sastry-lineage", "yi-ma-hku", "phd_adviser", sources.yima, "Shankar Sastry 的 Berkeley 官方学生名录列出 Yi Ma。"),
];

const targetFact = (value: string, proof: Source): Partial<Person> => ({
  facts: [{ label: "博士师承", value, source: proof }],
  sources: [proof],
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPersonEnhancements2: Record<string, Partial<Person>> = {
  "yejin-choi-us": targetFact("Cornell University 博士导师：Claire Cardie。", sources.yejin),
  "noah-smith-us": targetFact("Johns Hopkins University 博士导师：Jason Eisner。", sources.noah),
  "luke-zettlemoyer-us": targetFact("MIT 共同博士导师：Michael Collins、Leslie Pack Kaelbling。", sources.luke),
  "hannaneh-hajishirzi-us": targetFact("UIUC 博士导师：Eyal Amir；Julia Hockenmaier 为论文委员会成员，并非博士主导师。", sources.hannaneh),
  "yulia-tsvetkov-us": targetFact("CMU LTI 博士导师：Christopher Dyer。", sources.yulia),
  "tim-althoff-us": targetFact("Stanford University 博士导师：Jure Leskovec。", sources.althoff),
  "roger-grosse-ca": targetFact("MIT 博士导师：William T. Freeman。", sources.grosse),
  "doina-precup-ca": targetFact("University of Massachusetts Amherst 博士导师：Richard Sutton。", sources.doina),
  "david-silver-eu": targetFact("University of Alberta 博士导师：Richard Sutton。", sources.silver),
  "joelle-pineau-ca": targetFact("CMU 共同博士导师：Sebastian Thrun、Geoffrey Gordon。", sources.pineau),
  "philip-torr-eu": targetFact("Oxford DPhil 导师：David Murray。", sources.torr),
  "neil-lawrence-eu": targetFact("University of Cambridge 博士导师：Christopher Bishop。", sources.lawrence),
  "jiaya-jia-hkust": targetFact("HKUST 博士导师：Chi-Keung Tang。", sources.jiaya),
  "qiang-yang-polyu": targetFact("University of Maryland 博士导师：Dana S. Nau。", sources.qiang),
  "yi-ma-hku": targetFact("UC Berkeley 博士导师：Shankar Sastry。", sources.yima),
};
