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
  bo: source("University of Toronto LMP · Bo Wang", "https://lmp.utoronto.ca/faculty/bo-wang", "official", "University profile explicitly names Serafim Batzoglou as Bo Wang's Stanford PhD supervisor"),
  siva: source("Siva Reddy · homepage", "https://sivareddy.in/", "profile", "Personal homepage names Mirella Lapata and Mark Steedman as PhD supervisors and Christopher Manning as postdoctoral mentor"),
  vered: source("UBC faculty CV · Vered Shwartz", "https://www.cs.ubc.ca/~vshwartz/contact/CV-Vered_Shwartz.pdf", "cv", "UBC faculty CV names Ido Dagan as PhD supervisor"),
  hila: source("Hila Gonen · CV", "https://gonenhila.github.io/files/cv.pdf", "cv", "CV names Yoav Goldberg as PhD supervisor and Orna Kupferman as MSc supervisor"),
  adam: source("Adam White · CV", "https://sites.ualberta.ca/~amw8/cv.pdf", "cv", "CV names Richard Sutton as both MSc and PhD adviser"),
  victor: source("Victor Zhong · homepage", "https://www.victorzhong.com/", "profile", "Homepage names Luke Zettlemoyer as PhD adviser and Christopher Manning as MSc adviser"),
  daniel: source("Daniel M. Roy · homepage", "https://danroy.org/", "profile", "Homepage states that Leslie Kaelbling advised his MIT doctorate"),
  kate: source("Kate Larson · Carnegie Mellon CV", "https://www.cs.cmu.edu/~klarson/katescv.pdf", "cv", "CV explicitly names Tuomas Sandholm as PhD adviser"),
  pascal: source("University of Waterloo · Pascal Poupart CV record", "https://uwaterloo.ca/secretariat/sites/default/files/uploads/files/final_ii_and_iii_only_-_mdsaiandmmathds_january_2019_002_redacted.pdf", "official", "University record lists Craig Boutilier as Pascal Poupart's doctoral supervisor"),
  mark: source("Kevin Murphy · former students", "https://www.cs.ubc.ca/~murphyk/formerStudents.html", "profile", "Kevin Murphy's official former-student list identifies Mark Schmidt and his UBC PhD thesis"),
  christian: source("Magdalen College Oxford · Christian Rupprecht", "https://www.magd.ox.ac.uk/people/professor-christian-rupprecht/", "official", "Oxford college biography names Nassir Navab and Gregory D. Hager as PhD advisers and Andrea Vedaldi as postdoctoral mentor"),
  antoine: source("Antoine Bosselut · homepage", "https://atcbosselut.github.io/", "profile", "Homepage states that his Washington PhD was with Yejin Choi and his Stanford postdoc with Jure Leskovec and Christopher Manning"),
  krause: source("Andreas Krause · ETH CV", "https://las.inf.ethz.ch/wp-content/uploads/2021/01/krause-cv-2p.pdf", "cv", "ETH CV explicitly names Carlos Guestrin as PhD adviser"),
  bronstein: source("Ron Kimmel · official students list", "https://ron.cs.technion.ac.il/students/", "profile", "Ron Kimmel's official student list records Michael Bronstein's MSc, PhD and postdoctoral training"),
};

const mentor = (
  id: string,
  name: string,
  role: string,
  region: Person["region"],
  area: string,
  proof: Source,
  x: number,
  y: number,
  actualInstitution: string,
): Person => ({
  id,
  name,
  role,
  institution: "External",
  actualInstitution,
  region,
  area,
  tags: ["导师节点", "博士培养", ...area.split(" · ").slice(0, 2)],
  summary: "由博士论文、本人履历、院校记录或导师官方学生名录反向确认的导师节点。",
  facts: [
    { label: "图谱定位", value: "只表达公开材料明确记载的培养关系，不从普通合著推断师承。", source: proof },
  ],
  stage: "historical",
  category: "historical",
  sources: [proof],
  x,
  y,
  primary: false,
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPeople3: Person[] = [
  mentor("serafim-batzoglou-lineage", "Serafim Batzoglou", "Professor and former Stanford faculty", "United States", "Computational Biology · Machine Learning", sources.bo, 120, 55, "Stanford University / Seer"),
  mentor("mark-steedman-lineage", "Mark Steedman", "Professor Emeritus", "Europe", "Computational Linguistics · Parsing", sources.siva, 220, 55, "University of Edinburgh"),
  mentor("ido-dagan-lineage", "Ido Dagan", "Professor", "Europe", "Natural Language Processing · Textual Inference", sources.vered, 320, 55, "Bar-Ilan University"),
  mentor("yoav-goldberg-lineage", "Yoav Goldberg", "Professor", "Europe", "Natural Language Processing · Deep Learning", sources.hila, 420, 55, "Bar-Ilan University"),
  mentor("orna-kupferman-lineage", "Orna Kupferman", "Professor", "Europe", "Formal Verification · Automata", sources.hila, 520, 55, "Hebrew University of Jerusalem"),
  mentor("tuomas-sandholm-lineage", "Tuomas Sandholm", "Professor", "United States", "Multi-Agent Systems · Game Theory", sources.kate, 620, 55, "Carnegie Mellon University"),
  mentor("craig-boutilier-lineage", "Craig Boutilier", "Principal Scientist and former Professor", "Canada", "Decision Making · Reinforcement Learning", sources.pascal, 720, 55, "University of Toronto / Google"),
  mentor("kevin-murphy-lineage", "Kevin Murphy", "Research Scientist and former UBC Professor", "Canada", "Probabilistic Machine Learning · Graphical Models", sources.mark, 820, 55, "University of British Columbia / Google DeepMind"),
  mentor("nassir-navab-lineage", "Nassir Navab", "Professor", "Europe", "Computer Vision · Medical Imaging", sources.christian, 920, 55, "Technical University of Munich"),
  mentor("gregory-hager-lineage", "Gregory D. Hager", "Professor", "United States", "Computer Vision · Robotics", sources.christian, 1020, 55, "Johns Hopkins University"),
  mentor("carlos-guestrin-lineage", "Carlos Guestrin", "Professor", "United States", "Machine Learning · Data Systems", sources.krause, 1120, 55, "Stanford University"),
  mentor("ron-kimmel-lineage", "Ron Kimmel", "Professor", "Europe", "Computer Vision · Geometry Processing", sources.bronstein, 1220, 55, "Technion"),
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
  evidenceObject: "博士论文 / 校方学位记录 / 本人 CV / 导师官方学生名录",
});

export const thesisSupervisorRelationships3: Relationship[] = [
  lineage("thesis3-batzoglou-bo", "serafim-batzoglou-lineage", "bo-wang-toronto-ca", "phd_adviser", sources.bo, "University of Toronto 官方简介明确记录 Bo Wang 的 Stanford 博士由 Serafim Batzoglou 指导。"),
  lineage("thesis3-lapata-reddy", "mirella-lapata-eu", "siva-reddy-ca", "co_adviser", sources.siva, "Siva Reddy 本人主页明确列 Mirella Lapata 为 Edinburgh 共同博士导师。"),
  lineage("thesis3-steedman-reddy", "mark-steedman-lineage", "siva-reddy-ca", "co_adviser", sources.siva, "Siva Reddy 本人主页明确列 Mark Steedman 为 Edinburgh 共同博士导师。"),
  lineage("thesis3-manning-reddy", "christopher-manning-us", "siva-reddy-ca", "postdoc_mentor", sources.siva, "Siva Reddy 本人主页明确记录其 Stanford 博士后阶段由 Christopher Manning 指导。"),
  lineage("thesis3-dagan-shwartz", "ido-dagan-lineage", "vered-shwartz-ca", "phd_adviser", sources.vered, "Vered Shwartz 的 UBC faculty CV 明确列 Ido Dagan 为博士导师。"),
  lineage("thesis3-goldberg-gonen", "yoav-goldberg-lineage", "hila-gonen-ca", "phd_adviser", sources.hila, "Hila Gonen 的本人 CV 明确列 Yoav Goldberg 为博士导师。"),
  lineage("thesis3-kupferman-gonen", "orna-kupferman-lineage", "hila-gonen-ca", "master_adviser", sources.hila, "Hila Gonen 的本人 CV 明确列 Orna Kupferman 为硕士导师。"),
  lineage("thesis3-sutton-white-phd", "richard-sutton-ca", "adam-white-ca", "phd_adviser", sources.adam, "Adam White 的本人 CV 明确列 Richard Sutton 为 University of Alberta 博士导师。"),
  lineage("thesis3-sutton-white-msc", "richard-sutton-ca", "adam-white-ca", "master_adviser", sources.adam, "Adam White 的本人 CV 同时明确列 Richard Sutton 为硕士导师。"),
  lineage("thesis3-zettlemoyer-zhong", "luke-zettlemoyer-us", "victor-zhong-ca", "phd_adviser", sources.victor, "Victor Zhong 本人主页明确列 Luke Zettlemoyer 为 University of Washington 博士导师。"),
  lineage("thesis3-manning-zhong", "christopher-manning-us", "victor-zhong-ca", "master_adviser", sources.victor, "Victor Zhong 本人主页明确列 Christopher Manning 为 Stanford 硕士导师。"),
  lineage("thesis3-kaelbling-roy", "leslie-kaelbling-award", "daniel-roy-award", "phd_adviser", sources.daniel, "Daniel M. Roy 本人主页明确写明 MIT 博士阶段由 Leslie Kaelbling 指导。"),
  lineage("thesis3-sandholm-larson", "tuomas-sandholm-lineage", "kate-larson-ca", "phd_adviser", sources.kate, "Kate Larson 的 Carnegie Mellon CV 明确列 Tuomas Sandholm 为博士导师。"),
  lineage("thesis3-boutilier-poupart", "craig-boutilier-lineage", "pascal-poupart-ca", "phd_adviser", sources.pascal, "University of Waterloo 履历记录明确列 Craig Boutilier 为 Pascal Poupart 的博士导师。"),
  lineage("thesis3-murphy-schmidt", "kevin-murphy-lineage", "mark-schmidt-ca", "phd_adviser", sources.mark, "Kevin Murphy 的官方 former-student list 列出 Mark Schmidt 及其 UBC 博士论文。"),
  lineage("thesis3-navab-rupprecht", "nassir-navab-lineage", "christian-rupprecht-eu", "co_adviser", sources.christian, "Oxford Magdalen College 官方简介明确列 Nassir Navab 为 Christian Rupprecht 共同博士导师。"),
  lineage("thesis3-hager-rupprecht", "gregory-hager-lineage", "christian-rupprecht-eu", "co_adviser", sources.christian, "Oxford Magdalen College 官方简介明确列 Gregory D. Hager 为 Christian Rupprecht 共同博士导师。"),
  lineage("thesis3-vedaldi-rupprecht", "andrea-vedaldi-oxford-award", "christian-rupprecht-eu", "postdoc_mentor", sources.christian, "Oxford Magdalen College 官方简介记录 Christian Rupprecht 在 Andrea Vedaldi 指导下从事博士后研究。"),
  lineage("thesis3-choi-bosselut", "yejin-choi-us", "antoine-bosselut-eu", "phd_adviser", sources.antoine, "Antoine Bosselut 本人主页明确记录其 University of Washington 博士阶段与 Yejin Choi 合作并受其指导。"),
  lineage("thesis3-leskovec-bosselut", "jure-leskovec-lineage", "antoine-bosselut-eu", "postdoc_mentor", sources.antoine, "Antoine Bosselut 本人主页明确记录其 Stanford SNAP 博士后阶段与 Jure Leskovec 工作。"),
  lineage("thesis3-manning-bosselut", "christopher-manning-us", "antoine-bosselut-eu", "postdoc_mentor", sources.antoine, "Antoine Bosselut 本人主页明确记录其 Stanford NLP 博士后阶段与 Christopher Manning 工作。"),
  lineage("thesis3-guestrin-krause", "carlos-guestrin-lineage", "andreas-krause-eu", "phd_adviser", sources.krause, "Andreas Krause 的 ETH CV 明确列 Carlos Guestrin 为 Carnegie Mellon 博士导师。"),
  lineage("thesis3-kimmel-bronstein", "ron-kimmel-lineage", "michael-bronstein-eu", "phd_adviser", sources.bronstein, "Ron Kimmel 的官方学生名录明确列出 Michael Bronstein 的 Technion 博士训练。"),
];

const targetFact = (label: string, value: string, proof: Source): Partial<Person> => ({
  facts: [{ label, value, source: proof }],
  sources: [proof],
  lastVerifiedAt: checkedAt,
});

export const thesisSupervisorPersonEnhancements3: Record<string, Partial<Person>> = {
  "bo-wang-toronto-ca": targetFact("博士师承", "Stanford 博士导师：Serafim Batzoglou。", sources.bo),
  "siva-reddy-ca": targetFact("培养轨迹", "Edinburgh 共同博士导师：Mirella Lapata、Mark Steedman；Stanford 博士后导师：Christopher Manning。", sources.siva),
  "vered-shwartz-ca": targetFact("博士师承", "Bar-Ilan University 博士导师：Ido Dagan。", sources.vered),
  "hila-gonen-ca": targetFact("培养轨迹", "Bar-Ilan 博士导师：Yoav Goldberg；Hebrew University 硕士导师：Orna Kupferman。", sources.hila),
  "adam-white-ca": targetFact("培养轨迹", "University of Alberta 硕士、博士导师均为 Richard Sutton。", sources.adam),
  "victor-zhong-ca": targetFact("培养轨迹", "University of Washington 博士导师：Luke Zettlemoyer；Stanford 硕士导师：Christopher Manning。", sources.victor),
  "daniel-roy-award": targetFact("博士师承", "MIT 博士导师：Leslie Pack Kaelbling。", sources.daniel),
  "kate-larson-ca": targetFact("博士师承", "Carnegie Mellon University 博士导师：Tuomas Sandholm。", sources.kate),
  "pascal-poupart-ca": targetFact("博士师承", "University of Toronto 博士导师：Craig Boutilier。", sources.pascal),
  "mark-schmidt-ca": targetFact("博士师承", "University of British Columbia 博士导师：Kevin Murphy。", sources.mark),
  "christian-rupprecht-eu": targetFact("培养轨迹", "TUM/JHU 共同博士导师：Nassir Navab、Gregory D. Hager；Oxford 博士后导师：Andrea Vedaldi。", sources.christian),
  "antoine-bosselut-eu": targetFact("培养轨迹", "University of Washington 博士导师：Yejin Choi；Stanford 博士后合作导师：Jure Leskovec、Christopher Manning。", sources.antoine),
  "andreas-krause-eu": targetFact("博士师承", "Carnegie Mellon University 博士导师：Carlos Guestrin。", sources.krause),
  "michael-bronstein-eu": targetFact("博士师承", "Technion 博士导师：Ron Kimmel。", sources.bronstein),
};
