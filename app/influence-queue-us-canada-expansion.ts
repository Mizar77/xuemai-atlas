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
  abhinav: source("Abhinav Gupta · CMU homepage", "https://www.cs.cmu.edu/~abhinavg/", "profile", "CMU postdocs, current students and former PhD students; Larry S. Davis PhD supervision"),
  abhinavThesis: source("Abhinav Gupta · CMU PhD dissertation", "https://www.cs.cmu.edu/~abhinavg/papers/abhinav_thesis.pdf", "thesis", "Dissertation directed by Larry S. Davis"),
  montanariCv: source("Andrea Montanari · Stanford CV", "https://web.stanford.edu/~montanar/INFO/curriculum14.pdf", "cv", "Doctoral and postdoctoral students supervised, including their destinations"),
  bharath: source("Bharath Hariharan · Cornell homepage", "https://www.cs.cornell.edu/~bharathh/", "profile", "Current and former PhD students with co-adviser and destination annotations"),
  bharathCv: source("Bharath Hariharan · CV", "https://www.cs.cornell.edu/~bharathh/cv.pdf", "cv", "Cornell appointment and Jitendra Malik PhD supervision"),
  colin: source("Colin Raffel · homepage", "https://colinraffel.com/", "profile", "University of Toronto appointment and current lab-member roster"),
  davidLindellCv: source("David B. Lindell · CV", "https://davidlindell.com/assets/pdf/cv.pdf", "cv", "Toronto appointment and Gordon Wetzstein PhD/postdoc supervision"),
  davidLindellPeople: source("David B. Lindell · people", "https://davidlindell.com/people/", "profile", "Current postdocs, PhD students, former members and destinations"),
  gauthier: source("Gauthier Gidel · homepage", "https://gauthiergidel.github.io/", "profile", "Université de Montréal appointment and Simon Lacoste-Julien PhD supervision"),
  gauthierMila: source("Gauthier Gidel · Mila directory", "https://mila.quebec/fr/annuaire/gauthier-gidel", "official", "Current students and supervision roles"),
  guillaume: source("Guillaume Lajoie · Mila directory", "https://mila.quebec/en/directory/guillaume-lajoie", "official", "Current PhD students and postdocs"),
  ioannis: source("Ioannis Gkioulekas · CMU CSD", "https://csd.cs.cmu.edu/people/faculty/ioannis-gkioulekas", "official", "CMU appointment and named advisees"),
  shumianThesis: source("Shumian Xin · CMU PhD dissertation", "https://www.ri.cmu.edu/app/uploads/2023/01/sxin_phd_ri_2022-1.pdf", "thesis", "Ioannis Gkioulekas and Srinivasa Narasimhan identified as PhD advisers"),
  james: source("James Zou Group · team", "https://zou-group.github.io/team/", "profile", "Named postdoctoral fellows and graduate students in the Stanford group"),
  jian: source("Jian Tang · Mila directory", "https://mila.quebec/fr/annuaire/jian-tang?page=0%2C5", "official", "HEC Montréal/Mila appointment and current students"),
  morencyThesis: source("Pei-Hao Liang · CMU PhD dissertation", "https://ml.cmu.edu/research/phd-dissertation-pdfs/pliang_phd_mld_20241.pdf", "thesis", "Acknowledgements explicitly identify Louis-Philippe Morency's research group and its members"),
  noah: source("Noah Snavely · Cornell homepage", "https://www.cs.cornell.edu/~snavely/", "profile", "Current PhD students and alumni destinations"),
  peterStanford: source("Peter Henderson · Stanford profile", "https://profiles.stanford.edu/peter-henderson", "official", "Dan Jurafsky PhD supervision and prior McGill advisers"),
  sanmi: source("Sanmi Koyejo · Stanford profile", "https://profiles.stanford.edu/sanmi-koyejo", "official", "Current doctoral dissertation advisees and postdoctoral mentee"),
  shuranStanford: source("Shuran Song · Stanford profile", "https://profiles.stanford.edu/shuran-song?tab=bio", "official", "Stanford appointment and current doctoral advisees"),
  shuranPrinceton: source("Princeton CS · Shuran Song fellowship", "https://www.cs.princeton.edu/news/shuran-song-wins-facebook-fellowship", "official", "Jianxiong Xiao explicitly identified as Shuran Song's PhD adviser"),
  takeo: source("Takeo Kanade · CMU Robotics Institute", "https://www.ri.cmu.edu/ri-faculty/takeo-kanade/", "official", "CMU position and former PhD-student roster"),
  griffiths: source("Computational Cognitive Science Lab · people", "https://cocosci.princeton.edu/people.php/joe/joe/tom/tom/index.php", "official", "Tom Griffiths lab postdocs and graduate students"),
  sitzmannCv: source("Vincent Sitzmann · CV", "https://www.vincentsitzmann.com/docs/cv_vincent_sitzmann.pdf", "cv", "MIT graduate students supervised and former destination"),
  bamman: source("David Bamman · Berkeley homepage", "https://people.ischool.berkeley.edu/~dbamman/", "profile", "Current research group and alumni destinations"),
  irina: source("Irina Rish · Mila directory", "https://mila.quebec/en/directory/irina-rish?page=0%2C0", "official", "Université de Montréal role and current students"),
  aaron: source("Aaron Courville · Mila directory", "https://mila.quebec/en/directory/aaron-courville", "official", "Université de Montréal role and current students"),
  benThesis: source("Benjamin Eysenbach · CMU PhD dissertation", "https://ml.cmu.edu/research/phd-dissertation-pdfs/thesis_eysenbach.pdf", "thesis", "Thesis committee and adviser record; Ruslan Salakhutdinov is committee chair and Sergey Levine is named adviser"),
  benHome: source("Benjamin Eysenbach · homepage", "https://ben-eysenbach.github.io/", "profile", "First-person record that Ruslan Salakhutdinov and Sergey Levine advised his CMU PhD"),
};

const member = (teacherId: string, slug: string, name: string, role: string, memberSource: Source, focus?: string): GroupMember => ({
  id: `influence-us-ca-${teacherId}-${slug}`,
  teacherId,
  name,
  role,
  focus,
  source: memberSource,
});

const rosterEnhancement = (rosterSource: Source, detail: string): Partial<Person> => ({
  sources: [rosterSource],
  facts: [{ label: "团队与培养体系", value: detail, source: rosterSource }],
  lastVerifiedAt: checkedAt,
});

export const influenceQueueUsCanadaPeople: Person[] = [];

export const influenceQueueUsCanadaPersonEnhancements: Record<string, Partial<Person>> = {
  "abhinav-gupta-us": rosterEnhancement(sources.abhinav, "本人主页逐项列出当前博士生、博士后、历届博士生及其公开去向。"),
  "andrea-montanari-award": rosterEnhancement(sources.montanariCv, "Stanford CV 的 Doctoral Students Supervised 一节列出博士生姓名、毕业年份、论文与去向。"),
  "bharath-hariharan-us": rosterEnhancement(sources.bharath, "本人主页区分当前与历届博士生，并标注共同指导和毕业去向。"),
  "colin-raffel-award": rosterEnhancement(sources.colin, "本人主页公开维护当前实验室成员名录。"),
  "david-lindell-ca-award": rosterEnhancement(sources.davidLindellPeople, "本人团队页区分博士后、博士生、硕士生和历届成员，并标注部分去向。"),
  "gauthier-gidel-ca": rosterEnhancement(sources.gauthierMila, "Mila 官方目录列出当前学生及共同指导关系。"),
  "guillaume-lajoie-award": rosterEnhancement(sources.guillaume, "Mila 官方目录列出当前博士生、博士后与共同指导信息。"),
  "ioannis-gkioulekas-cmu-award": rosterEnhancement(sources.ioannis, "CMU 官方教师页列出当前 advisees；另以 CMU 博士论文核验早期博士生。"),
  "james-zou-award": rosterEnhancement(sources.james, "Stanford Zou Group 团队页按博士后和研究生列出成员。"),
  "jian-tang-ca": rosterEnhancement(sources.jian, "Mila 官方目录列出当前博士生及其院校、主导师或共同导师。"),
  "louis-philippe-morency-us": rosterEnhancement(sources.morencyThesis, "CMU 博士论文致谢明确列举 Louis-Philippe Morency 研究组成员。"),
  "noah-snavely-us": rosterEnhancement(sources.noah, "本人主页公开区分当前博士生与校友，并列出校友去向。"),
  "peter-henderson-award": rosterEnhancement(sources.peterStanford, "Stanford 官方履历明确其博士由 Dan Jurafsky 指导。"),
  "sanmi-koyejo-award": rosterEnhancement(sources.sanmi, "Stanford 官方页面列出博士论文指导对象和博士后 mentee。"),
  "shuran-song-us": rosterEnhancement(sources.shuranStanford, "Stanford 官方页面列出当前博士论文指导对象；Princeton 官方新闻明确其博士导师。"),
  "takeo-kanade-historical": rosterEnhancement(sources.takeo, "CMU Robotics Institute 官方页保留完整的 former PhD students 名录。"),
  "thomas-griffiths-award": rosterEnhancement(sources.griffiths, "Princeton Computational Cognitive Science Lab 官方成员页列出博士后和研究生。"),
  "vincent-sitzmann-mit-award": rosterEnhancement(sources.sitzmannCv, "本人 CV 的 Students Supervised 一节列出 MIT 研究生及部分毕业去向。"),
  "david-bamman-us": rosterEnhancement(sources.bamman, "本人主页列出当前博士生、博士后和历届成员去向。"),
  "irina-rish-ca": rosterEnhancement(sources.irina, "Mila 官方目录列出当前学生以及共同指导情况。"),
  "aaron-courville-ca": rosterEnhancement(sources.aaron, "Mila 官方目录列出当前博士生及共同指导情况。"),
  "benjamin-eysenbach-award": rosterEnhancement(sources.benHome, "本人主页明确记录 CMU 博士阶段由 Ruslan Salakhutdinov 与 Sergey Levine 指导。"),
};

export const influenceQueueUsCanadaGroupMembers: GroupMember[] = [
  member("abhinav-gupta-us", "unnat-jain", "Unnat Jain", "Postdoctoral researcher", sources.abhinav),
  member("abhinav-gupta-us", "sudeep-dasari", "Sudeep Dasari", "Robotics PhD student", sources.abhinav),
  member("abhinav-gupta-us", "aravind-rajeswaran", "Aravind Rajeswaran", "Research group member", sources.abhinav),
  member("andrea-montanari-award", "sewoong-oh", "Sewoong Oh", "Former PhD student · faculty destination", sources.montanariCv),
  member("andrea-montanari-award", "yash-kanoria", "Yashodhan Kanoria", "Former PhD student · faculty destination", sources.montanariCv),
  member("andrea-montanari-award", "raghunandan-keshavan", "Raghunandan Keshavan", "Former PhD student · Google", sources.montanariCv),
  member("bharath-hariharan-us", "shreelekha-revankar", "Shreelekha Revankar", "PhD student · co-advised with Kavita Bala", sources.bharath),
  member("bharath-hariharan-us", "chia-hsiang-kao", "Chia-Hsiang Kao", "PhD student", sources.bharath),
  member("bharath-hariharan-us", "kuan-wei-huang", "Kuan Wei Huang", "PhD student", sources.bharath),
  member("colin-raffel-award", "marco-ciccone", "Marco Ciccone", "Current lab member", sources.colin),
  member("colin-raffel-award", "boglarka-ecsedi", "Boglárka Ecsedi", "Current lab member", sources.colin),
  member("colin-raffel-award", "malikeh-ehghaghi", "Malikeh Ehghaghi", "Current lab member", sources.colin),
  member("david-lindell-ca-award", "esther-lin", "Esther Lin", "PhD student", sources.davidLindellPeople),
  member("david-lindell-ca-award", "anagh-malik", "Anagh Malik", "PhD student", sources.davidLindellPeople),
  member("david-lindell-ca-award", "dongyu-du", "Dongyu Du", "Postdoctoral researcher", sources.davidLindellPeople),
  member("gauthier-gidel-ca", "sadhana-anand", "Sadhana Anand", "Research master's student", sources.gauthierMila),
  member("gauthier-gidel-ca", "yuan-chen-chang", "Yuan-Chen Chang", "PhD student", sources.gauthierMila),
  member("gauthier-gidel-ca", "david-dobre", "David Dobre", "PhD student", sources.gauthierMila),
  member("guillaume-lajoie-award", "sangnie-bhardwaj", "Sangnie Bhardwaj", "PhD student · co-supervised", sources.guillaume),
  member("guillaume-lajoie-award", "colin-bredenberg", "Colin Bredenberg", "Postdoctoral researcher · co-supervised", sources.guillaume),
  member("guillaume-lajoie-award", "leo-choiniere", "Leo Choiniere", "PhD student", sources.guillaume),
  member("ioannis-gkioulekas-cmu-award", "tanli-su", "Tanli Su", "Advisee", sources.ioannis),
  member("ioannis-gkioulekas-cmu-award", "bailey-miller", "Bailey Miller", "Advisee", sources.ioannis),
  member("ioannis-gkioulekas-cmu-award", "shumian-xin", "Shumian Xin", "Former PhD student · co-advised", sources.shumianThesis),
  member("james-zou-award", "amirali-aghazadeh", "Amirali Aghazadeh", "Postdoctoral fellow", sources.james),
  member("james-zou-award", "abubakar-abid", "Abubakar Abid", "Graduate student", sources.james),
  member("james-zou-award", "amirata-ghorbani", "Amirata Ghorbani", "Graduate student", sources.james),
  member("jian-tang-ca", "huiyu-cai", "Huiyu Cai", "PhD student · Université de Montréal", sources.jian),
  member("jian-tang-ca", "xixian-liu", "Xixian Liu", "PhD student · Université de Montréal", sources.jian),
  member("jian-tang-ca", "jiarui-lu", "Jiarui Lu", "PhD student · Université de Montréal", sources.jian),
  member("louis-philippe-morency-us", "hubert-tsai", "Hubert Tsai", "Research-group member named in CMU dissertation", sources.morencyThesis),
  member("louis-philippe-morency-us", "amir-zadeh", "Amir Zadeh", "Research-group member named in CMU dissertation", sources.morencyThesis),
  member("louis-philippe-morency-us", "chaitanya-ahuja", "Chaitanya Ahuja", "Research-group member named in CMU dissertation", sources.morencyThesis),
  member("noah-snavely-us", "yen-yu-chang", "Yen-Yu Chang", "PhD student", sources.noah),
  member("noah-snavely-us", "hanyu-chen", "Hanyu Chen", "PhD student", sources.noah),
  member("noah-snavely-us", "gene-chou", "Gene Chou", "PhD student", sources.noah),
  member("sanmi-koyejo-award", "ahmed-ahmed", "Ahmed Ahmed", "Doctoral dissertation co-advisee", sources.sanmi),
  member("sanmi-koyejo-award", "suhana-bedi", "Suhana Bedi", "Doctoral dissertation co-advisee", sources.sanmi),
  member("sanmi-koyejo-award", "anka-reuel", "Anka Reuel", "Doctoral dissertation co-advisee", sources.sanmi),
  member("takeo-kanade-historical", "omead-amidi", "Omead Amidi", "Former PhD student", sources.takeo),
  member("takeo-kanade-historical", "peter-barnum", "Peter Barnum", "Former PhD student", sources.takeo),
  member("takeo-kanade-historical", "joao-costeira", "João Costeira", "Former PhD student", sources.takeo),
  member("thomas-griffiths-award", "tiwa-eisape", "Tiwa Eisape", "Postdoctoral research fellow", sources.griffiths),
  member("thomas-griffiths-award", "akshay-jagadish", "Akshay Jagadish", "Research group member", sources.griffiths),
  member("thomas-griffiths-award", "rafael-batista", "Rafael Batista", "Postdoctoral research associate", sources.griffiths),
  member("vincent-sitzmann-mit-award", "ana-dodik", "Ana Dodik", "Graduate student · co-advised", sources.sitzmannCv),
  member("vincent-sitzmann-mit-award", "hyunwoo-ryu", "Hyunwoo Ryu", "Graduate student", sources.sitzmannCv),
  member("vincent-sitzmann-mit-award", "eric-chen", "Eric Chen", "Graduate student", sources.sitzmannCv),
  member("david-bamman-us", "kent-chang", "Kent Chang", "PhD student", sources.bamman),
  member("david-bamman-us", "nikita-mehandru", "Nikita Mehandru", "PhD student · co-advised", sources.bamman),
  member("irina-rish-ca", "ivan-anokhin", "Ivan Anokhin", "PhD student · co-supervised", sources.irina),
  member("irina-rish-ca", "rifat-arefin", "Rifat Arefin", "PhD student", sources.irina),
  member("irina-rish-ca", "ethan-caballero", "Ethan Caballero", "PhD student", sources.irina),
  member("aaron-courville-ca", "ayush-agrawal", "Ayush Agrawal", "PhD student", sources.aaron),
];

const lineage = (id: string, from: string, to: string, relationshipSource: Source, evidence: string): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype: "phd_adviser",
  label: "博士导师",
  evidence,
  evidenceObject: "First-party biography or doctoral dissertation explicitly naming the adviser",
  source: relationshipSource,
  verified: true,
});

export const influenceQueueUsCanadaRelationships: Relationship[] = [
  lineage("influence-us-ca-larry-abhinav", "larry-davis-historical", "abhinav-gupta-us", sources.abhinavThesis, "Abhinav Gupta 的 CMU 博士论文题名页将 Larry S. Davis 列为 dissertation director。"),
  lineage("influence-us-ca-malik-hariharan", "jitendra-malik-us", "bharath-hariharan-us", sources.bharathCv, "Bharath Hariharan 的本人 CV 明确列出 Berkeley PhD advisor 为 Jitendra Malik。"),
  lineage("influence-us-ca-jurafsky-henderson", "dan-jurafsky-us", "peter-henderson-award", sources.peterStanford, "Peter Henderson 的 Stanford 官方履历明确写明其博士由 Dan Jurafsky 指导。"),
  lineage("influence-us-ca-ruslan-eysenbach", "ruslan-salakhutdinov-us", "benjamin-eysenbach-award", sources.benHome, "Benjamin Eysenbach 本人主页明确写明 CMU 博士由 Ruslan Salakhutdinov 与 Sergey Levine 指导。"),
  lineage("influence-us-ca-levine-eysenbach", "sergey-levine-us", "benjamin-eysenbach-award", sources.benThesis, "Benjamin Eysenbach 的 CMU 博士论文及本人履历共同明确 Sergey Levine 的博士指导关系。"),
];

export const influenceQueueUsCanadaPlacements: StudentPlacement[] = [];
export const influenceQueueUsCanadaPortraits: Record<string, NonNullable<Person["portrait"]>> = {};

/**
 * Candidates inspected in this pass but intentionally not represented by an
 * adviser edge because the adviser is not yet a complete atlas person node.
 */
export const influenceQueueUsCanadaDeferred = [
  { id: "david-lindell-ca-award", reason: "Gordon Wetzstein is explicit in the CV, but a complete current-PI node is not yet available." },
  { id: "gauthier-gidel-ca", reason: "Simon Lacoste-Julien is explicit on the homepage, but a complete current-PI node is not yet available." },
  { id: "shuran-song-us", reason: "Princeton explicitly names Jianxiong Xiao, but a complete current-PI node is not yet available." },
] as const;
