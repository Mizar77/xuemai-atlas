import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  feifei: source("Fei-Fei Li · Stanford profile", "https://profiles.stanford.edu/fei-fei-li", "official", "Current Stanford doctoral advisees and co-advisees"),
  antonio: source("Antonio Torralba · MIT homepage", "https://web.mit.edu/torralba/www/", "profile", "Current lab members and named past students and postdocs"),
  trevor: source("Trevor Darrell · Berkeley homepage archive", "https://people.eecs.berkeley.edu/~trevor/indexsav2.html", "profile", "Berkeley group roster with PhD students and postdocs"),
  stefano: source("Stefano Ermon · Stanford profile", "https://profiles.stanford.edu/stefano-ermon", "official", "Current Stanford doctoral advisees, co-advisees and postdoctoral sponsorship"),
  emma: source("Emma Brunskill · Stanford profile", "https://profiles.stanford.edu/emma-brunskill", "official", "Current doctoral advisees and postdoctoral mentee"),
  lillian: source("Lillian Lee · students and postdocs", "https://www.cs.cornell.edu/home/llee/papers-by-students.html", "profile", "Explicit advisee list with degree or postdoc role, year and first destination"),
  andreasCv: source("Jacob Andreas · CV", "https://web.mit.edu/jda/www/docs/jda_cv.pdf", "cv", "Current and former PhD students and postdoctoral researchers, including co-advisers and destinations"),
  pulkit: source("Pulkit Agrawal · MIT homepage", "https://people.csail.mit.edu/pulkitag/", "profile", "Improbable AI Lab postdocs, graduate students, staff and student researchers"),
  tenenbaum: source("Joshua Tenenbaum · CBMM profile", "https://cbmm-new.mit.edu/about/people/tenenbaum", "official", "Current and past advisees with role labels"),
  tommi: source("Tommi Jaakkola · MIT homepage", "https://people.csail.mit.edu/tommi/", "profile", "Current group members and recent PhD graduates with destinations"),
  roger: source("MIT Computational Psycholinguistics Lab · people", "https://cpl.mit.edu/people.html", "official", "Current postdocs and PhD students plus alumni roster"),
};

const member = (teacherId: string, slug: string, name: string, role: string, memberSource: Source): GroupMember => ({
  id: `influence-us-ca-2-${teacherId}-${slug}`,
  teacherId,
  name,
  role,
  source: memberSource,
});

const enhancement = (rosterSource: Source, value: string): Partial<Person> => ({
  sources: [rosterSource],
  facts: [{ label: "团队与培养体系", value, source: rosterSource }],
  lastVerifiedAt: checkedAt,
});

export const influenceQueueUsCanadaPeople2: Person[] = [];

export const influenceQueueUsCanadaPersonEnhancements2: Record<string, Partial<Person>> = {
  "fei-fei-li-us": enhancement(sources.feifei, "Stanford 官方档案列出当前博士项目学生、博士论文导师与共同导师关系。"),
  "antonio-torralba-us": enhancement(sources.antonio, "本人 MIT 主页维护当前成员与历届博士生、博士后名录，并标注部分毕业年份。"),
  "trevor-darrell-us": enhancement(sources.trevor, "本人 Berkeley 主页保存博士生、博士后与共同指导信息。"),
  "stefano-ermon-us": enhancement(sources.stefano, "Stanford 官方档案列出博士论文指导、共同指导与博士后 sponsor 记录。"),
  "emma-brunskill-foundational": enhancement(sources.emma, "Stanford 官方档案列出博士论文指导对象和博士后 mentee。"),
  "lillian-lee-us": enhancement(sources.lillian, "本人学生页逐项列出博士生、博士后、毕业年份和第一去向。"),
  "jacob-andreas-us": enhancement(sources.andreasCv, "本人 CV 的 Advising 一节列出博士后、博士生、共同指导及公开去向。"),
  "pulkit-agrawal-us": enhancement(sources.pulkit, "本人 MIT 实验室主页分列博士后、博士生、研究人员与学生研究者。"),
  "joshua-tenenbaum-lineage": enhancement(sources.tenenbaum, "MIT/CBMM 官方档案分列当前与历届 advisees，并标注角色。"),
  "tommi-jaakkola-lineage": enhancement(sources.tommi, "本人 MIT 主页列出当前组员和近期博士毕业生去向。"),
  "roger-levy-us": enhancement(sources.roger, "MIT Computational Psycholinguistics Lab 官方页列出博士生、博士后与历届成员。"),
};

export const influenceQueueUsCanadaGroupMembers2: GroupMember[] = [
  member("fei-fei-li-us", "kyle-sargent", "Kyle Sargent", "Doctoral dissertation co-advisee", sources.feifei),
  member("antonio-torralba-us", "joanna-materzynska", "Joanna Materzynska", "Former graduate student · graduated 2025", sources.antonio),
  member("trevor-darrell-us", "jeff-donahue", "Jeff Donahue", "PhD student", sources.trevor),
  member("stefano-ermon-us", "amil-merchant", "Amil Merchant", "Doctoral dissertation advisee", sources.stefano),
  member("stefano-ermon-us", "haotian-ye", "Haotian Ye", "Doctoral dissertation co-advisee", sources.stefano),
  member("stefano-ermon-us", "zhuo-zheng", "Zhuo Zheng", "Postdoctoral researcher · faculty sponsor", sources.stefano),
  member("emma-brunskill-foundational", "matthew-joerke", "Matthew Joerke", "Doctoral dissertation advisee", sources.emma),
  member("emma-brunskill-foundational", "joy-he-yueya", "Joy He-Yueya", "Doctoral program advisee", sources.emma),
  member("emma-brunskill-foundational", "ananya-bhattacharjee", "Ananya Bhattacharjee", "Postdoctoral research mentee", sources.emma),
  member("lillian-lee-us", "jack-hessel", "Jack Hessel", "Former PhD student · Allen Institute for AI", sources.lillian),
  member("lillian-lee-us", "chenhao-tan", "Chenhao Tan", "Former PhD student · faculty destination", sources.lillian),
  member("jacob-andreas-us", "alexis-ross", "Alexis Ross", "PhD student", sources.andreasCv),
  member("jacob-andreas-us", "gabe-grand", "Gabe Grand", "PhD student · co-advised with Josh Tenenbaum", sources.andreasCv),
  member("jacob-andreas-us", "leshem-choshen", "Leshem Choshen", "Postdoctoral researcher", sources.andreasCv),
  member("pulkit-agrawal-us", "haoshu-fang", "Haoshu Fang", "Postdoctoral researcher", sources.pulkit),
  member("pulkit-agrawal-us", "antonia-bronars", "Antonia Bronars", "Graduate student", sources.pulkit),
  member("pulkit-agrawal-us", "idan-shenfeld", "Idan Shenfeld", "Graduate student", sources.pulkit),
  member("joshua-tenenbaum-lineage", "andres-campero", "Andres Campero Nunez", "Graduate student", sources.tenenbaum),
  member("joshua-tenenbaum-lineage", "marta-kryven", "Marta Kryven", "Postdoctoral researcher", sources.tenenbaum),
  member("tommi-jaakkola-lineage", "julia-balla", "Julia Balla", "Research group member · co-advised", sources.tommi),
  member("tommi-jaakkola-lineage", "peter-holderrieth", "Peter Holderrieth", "Research group member", sources.tommi),
  member("roger-levy-us", "kuan-jung-huang", "Kuan-Jung Huang", "Postdoctoral researcher", sources.roger),
  member("roger-levy-us", "thomas-clark", "Thomas Hikaru Clark", "PhD student", sources.roger),
  member("roger-levy-us", "ben-lipkin", "Ben Lipkin", "PhD student", sources.roger),
];

export const influenceQueueUsCanadaRelationships2: Relationship[] = [];
export const influenceQueueUsCanadaPlacements2: StudentPlacement[] = [];
export const influenceQueueUsCanadaPortraits2: Record<string, NonNullable<Person["portrait"]>> = {};

export const influenceQueueUsCanadaDeferred2 = [] as const;
