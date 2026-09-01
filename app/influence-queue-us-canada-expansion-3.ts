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
  deepak: source("Deepak Pathak · CMU homepage", "https://www.cs.cmu.edu/~dpathak/", "profile", "Named PhD students in the Pathak Lab research group"),
  graham: source("Graham Neubig · CMU LTI", "https://www.lti.cmu.edu/people/faculty/neubig-graham.html", "official", "Named current advisees"),
  jeff: source("Jeff Schneider · CMU Robotics Institute", "https://www.ri.cmu.edu/ri-faculty/jeff-schneider/", "official", "Current and former PhD students"),
  jia: source("Princeton Vision & Learning Lab · people", "https://pvl.cs.princeton.edu/people.html", "official", "Named PhD students in Jia Deng's lab"),
  jimLai: source("Cheng-I Lai · MIT CSAIL homepage", "https://people.csail.mit.edu/clai24/", "profile", "First-person statement that James Glass advises the MIT PhD"),
  jimHe: source("Tianxing He · MIT CSAIL homepage", "https://people.csail.mit.edu/cloudygoose/", "profile", "First-person statement that James Glass supervises the MIT PhD"),
  deneroReport: source("Berkeley EECS technical report · Sridhara and Phothilimthana", "https://www2.eecs.berkeley.edu/Pubs/TechRpts/2017/EECS-2017-187.html", "official", "John DeNero identified as adviser for both authors"),
  deneroAltieri: source("Nicholas Altieri · Berkeley CTML", "https://ctml.berkeley.edu/people/nicholas-altieri", "official", "John DeNero identified as a PhD adviser"),
  kaimingDeng: source("Mingyang Deng · MIT CSAIL profile book", "https://cap.csail.mit.edu/sites/default/files/resource-pdfs/2024%20Student%20and%20Postdoctoral%20Profile%20Book.pdf", "official", "Kaiming He identified as primary CSAIL adviser"),
  kaimingLi: source("Zongyi Li · MIT CCSE", "https://cse.mit.edu/people/zongyi-li/", "official", "Kaiming He identified as postdoctoral research adviser"),
  kaimingTianhong: source("MIT CSAIL · Academic Job Search Seminar", "https://courses.csail.mit.edu/6.9970/", "official", "Kaiming He identified as Tianhong Li's current adviser"),
  guibas: source("Stanford Geometric Computation Group · people", "https://geometry.stanford.edu/", "official", "Named postdoctoral researchers and graduate students in the Guibas Lab"),
  zaharia: source("Matei Zaharia · Stanford DAWN", "https://dawn.cs.stanford.edu/people/matei-zaharia", "official", "Named advisees"),
  otooleAttal: source("Benjamin Attal · CMU Robotics Institute", "https://www.ri.cmu.edu/ri-people/benjamin-attal/", "official", "Matthew O'Toole identified as PhD adviser"),
  otooleTeh: source("Arjun Teh · CMU CSD degree record", "https://csd.cmu.edu/academics/doctoral/degrees-conferred/arjun-teh", "official", "Matthew O'Toole identified as PhD adviser"),
  otooleQin: source("Yingsi Qin · homepage", "https://yingsiqin.github.io/", "profile", "First-person statement that Matthew O'Toole co-advises the PhD"),
  chang: source("Columbia DVMM · people", "https://www.ee.columbia.edu/ln/dvmm/old_dvmm/people.htm", "official", "Named students in Shih-Fu Chang's DVMM group"),
  bergerWolf: source("UIC Computer Science · PhD alumni", "https://cs.uic.edu/graduate/phd-alumni-list/", "official", "Tanya Berger-Wolf identified as adviser for named PhD alumni"),
  princetonGrad: source("Princeton Computer Science · graduate students", "https://www.cs.princeton.edu/people/grad?page=1", "official", "Current graduate-student adviser assignments"),
  ruslan: source("Ruslan Salakhutdinov · people", "https://www.cs.cmu.edu/~rsalakhu/people.html", "profile", "Current students and alumni in the CMU group"),
  artzi: source("Yoav Artzi · lab", "https://yoavartzi.com/", "profile", "Current PhD students and postdoctoral researchers"),
  adams: source("Ryan Adams · Princeton homepage", "https://www.cs.princeton.edu/~rpa//", "profile", "Current graduate students and postdoctoral researchers"),
};

const member = (teacherId: string, slug: string, name: string, role: string, memberSource: Source): GroupMember => ({
  id: `influence-us-ca-3-${teacherId}-${slug}`,
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

export const influenceQueueUsCanadaPeople3: Person[] = [];

export const influenceQueueUsCanadaPersonEnhancements3: Record<string, Partial<Person>> = {
  "deepak-pathak-foundational": enhancement(sources.deepak, "本人 CMU 主页列出 Pathak Lab 的具名博士生。"),
  "graham-neubig-us": enhancement(sources.graham, "CMU LTI 官方教师页列出当前 advisees。"),
  "jeff-schneider-lineage": enhancement(sources.jeff, "CMU Robotics Institute 官方页区分当前与历届博士生。"),
  "jia-deng-us": enhancement(sources.jia, "Princeton Vision & Learning Lab 官方页列出博士生名录。"),
  "jim-glass-lineage": enhancement(sources.jimLai, "MIT CSAIL 学生本人主页明确记录 James Glass 的博士指导关系。"),
  "john-denero-us": enhancement(sources.deneroReport, "Berkeley 官方报告和研究中心页面明确记录 John DeNero 的博士指导关系。"),
  "kaiming-he-us": enhancement(sources.kaimingDeng, "MIT 官方页面记录其博士生、博士后与本科研究指导对象。"),
  "leonidas-guibas-lineage": enhancement(sources.guibas, "Stanford Guibas Lab 官方页分列博士后与研究生。"),
  "matei-zaharia-lineage": enhancement(sources.zaharia, "Stanford DAWN 官方页面列出 Matei Zaharia 的 advisees。"),
  "matthew-otoole-cmu-award": enhancement(sources.otooleAttal, "CMU 官方学位与人员页面、学生本人主页共同核验博士指导记录。"),
  "shih-fu-chang-lineage": enhancement(sources.chang, "Columbia DVMM 官方存档页列出研究组学生。"),
  "tanya-berger-wolf-osu-award": enhancement(sources.bergerWolf, "UIC 官方博士校友名录逐项标注 Tanya Berger-Wolf 的指导关系。"),
  "karthik-narasimhan-us": enhancement(sources.princetonGrad, "Princeton CS 官方研究生目录列出当前博士生的 adviser。"),
  "olga-russakovsky-us": enhancement(sources.princetonGrad, "Princeton CS 官方研究生目录列出当前博士生的 adviser。"),
  "ruslan-salakhutdinov-us": enhancement(sources.ruslan, "本人 CMU 团队页区分当前学生与历届成员。"),
  "yoav-artzi-us": enhancement(sources.artzi, "本人实验室页面列出博士生与博士后。"),
  "ryan-adams-us": enhancement(sources.adams, "本人 Princeton 主页列出当前研究生与博士后。"),
};

export const influenceQueueUsCanadaGroupMembers3: GroupMember[] = [
  member("deepak-pathak-foundational", "ananye-agarwal", "Ananye Agarwal", "PhD student", sources.deepak),
  member("deepak-pathak-foundational", "lili-chen", "Lili Chen", "PhD student", sources.deepak),
  member("deepak-pathak-foundational", "alex-li", "Alex Li", "PhD student", sources.deepak),
  member("graham-neubig-us", "amanda-bertsch", "Amanda Bertsch", "Advisee", sources.graham),
  member("graham-neubig-us", "patrick-fernandes", "Patrick Fernandes", "Advisee", sources.graham),
  member("jeff-schneider-lineage", "anoushka-alavilli", "Anoushka Alavilli", "PhD student", sources.jeff),
  member("jeff-schneider-lineage", "wen-tse-chen", "Wen-Tse Chen", "PhD student", sources.jeff),
  member("jia-deng-us", "stamatis-alexandropoulos", "Stamatis Alexandropoulos", "PhD student", sources.jia),
  member("jia-deng-us", "shmuel-berman", "Shmuel Berman", "PhD student", sources.jia),
  member("jim-glass-lineage", "cheng-i-lai", "Cheng-I Lai", "PhD student · advised by James Glass", sources.jimLai),
  member("jim-glass-lineage", "tianxing-he", "Tianxing He", "PhD student · supervised by James Glass", sources.jimHe),
  member("john-denero-us", "sumukh-sridhara", "Sumukh Sridhara", "Graduate researcher · advised by John DeNero", sources.deneroReport),
  member("john-denero-us", "phitchaya-phothilimthana", "Phitchaya Phothilimthana", "Graduate researcher · advised by John DeNero", sources.deneroReport),
  member("john-denero-us", "nicholas-altieri", "Nicholas Altieri", "PhD student · co-advised with Bin Yu", sources.deneroAltieri),
  member("kaiming-he-us", "mingyang-deng", "Mingyang Deng", "PhD student · primary CSAIL adviser Kaiming He", sources.kaimingDeng),
  member("kaiming-he-us", "zongyi-li", "Zongyi Li", "Postdoctoral researcher · research adviser Kaiming He", sources.kaimingLi),
  member("kaiming-he-us", "tianhong-li", "Tianhong Li", "PhD student · current adviser Kaiming He", sources.kaimingTianhong),
  member("leonidas-guibas-lineage", "boyang-deng", "Boyang Deng", "Graduate student", sources.guibas),
  member("leonidas-guibas-lineage", "boxiao-pan", "Boxiao Pan", "Graduate student", sources.guibas),
  member("matei-zaharia-lineage", "firas-abuzaid", "Firas Abuzaid", "Advisee", sources.zaharia),
  member("matei-zaharia-lineage", "cody-coleman", "Cody Coleman", "Advisee", sources.zaharia),
  member("matthew-otoole-cmu-award", "benjamin-attal", "Benjamin Attal", "Former PhD student", sources.otooleAttal),
  member("matthew-otoole-cmu-award", "arjun-teh", "Arjun Teh", "Former PhD student · co-advised", sources.otooleTeh),
  member("matthew-otoole-cmu-award", "yingsi-qin", "Yingsi Qin", "PhD student · co-advised", sources.otooleQin),
  member("shih-fu-chang-lineage", "winston-hsu", "Winston Hsu", "DVMM student", sources.chang),
  member("shih-fu-chang-lineage", "lexing-xie", "Lexing Xie", "DVMM student", sources.chang),
  member("tanya-berger-wolf-osu-award", "chainarong-amornbunchornvej", "Chainarong Amornbunchornvej", "Former PhD student", sources.bergerWolf),
  member("tanya-berger-wolf-osu-award", "chayant-tantipathananandh", "Chayant Tantipathananandh", "Former PhD student", sources.bergerWolf),
  member("karthik-narasimhan-us", "wenhao-chai", "Wenhao Chai", "PhD student", sources.princetonGrad),
  member("karthik-narasimhan-us", "austin-wang", "Austin Wang", "PhD student", sources.princetonGrad),
  member("karthik-narasimhan-us", "jonathan-williams", "Jonathan Williams", "PhD student", sources.princetonGrad),
  member("olga-russakovsky-us", "kun-wang", "Kun Wang", "PhD student", sources.princetonGrad),
  member("olga-russakovsky-us", "xindi-wu", "Xindi Wu", "PhD student", sources.princetonGrad),
  member("olga-russakovsky-us", "william-yang", "William Yang", "PhD student", sources.princetonGrad),
  member("ruslan-salakhutdinov-us", "kelly-he", "Kelly He", "PhD student", sources.ruslan),
  member("ruslan-salakhutdinov-us", "brandon-trabucco", "Brandon Trabucco", "PhD student", sources.ruslan),
  member("yoav-artzi-us", "zizhao-chen", "Zizhao (Zoe) Chen", "PhD student", sources.artzi),
  member("yoav-artzi-us", "yair-feldman", "Yair Feldman", "PhD student", sources.artzi),
  member("ryan-adams-us", "joshua-aduol", "Joshua Aduol", "Graduate student", sources.adams),
  member("ryan-adams-us", "cyrill-boesch", "Cyrill Boesch", "Graduate student", sources.adams),
  member("ryan-adams-us", "alex-guerra", "Alex Guerra", "Graduate student", sources.adams),
  member("ryan-adams-us", "nicholas-richardson", "Nicholas Richardson", "Graduate student", sources.adams),
];

export const influenceQueueUsCanadaRelationships3: Relationship[] = [];
export const influenceQueueUsCanadaPlacements3: StudentPlacement[] = [];
export const influenceQueueUsCanadaPortraits3: Record<string, NonNullable<Person["portrait"]>> = {};

export const influenceQueueUsCanadaDeferred3 = [
  {
    id: "shuran-song-us",
    reason: "Princeton explicitly names Jianxiong Xiao as the PhD adviser, but the atlas does not yet contain a complete current-PI node and portrait for him; no synthetic edge was added.",
  },
] as const;
