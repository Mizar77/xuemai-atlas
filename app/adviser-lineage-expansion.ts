import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";

const source = (label: string, url: string, supports: string, kind: Source["kind"] = "official"): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  leslie: source("MIT CSAIL · Leslie Pack Kaelbling", "https://people.csail.mit.edu/lpk/bio.html", "Current MIT professorship and robotics, planning and learning research"),
  demmel: source("UC Berkeley EECS · James Demmel", "https://www2.eecs.berkeley.edu/Faculty/Homepages/demmel.html", "Professor Emeritus and Professor in the Graduate School status"),
  tao: source("University of Surrey · Tao Xiang", "https://www.surrey.ac.uk/people/tao-xiang", "Current Professor of Computer Vision and Machine Learning appointment"),
  shihFu: source("Columbia Engineering · Shih-Fu Chang", "https://www.ee.columbia.edu/~sfchang/", "Current Columbia professorship, lab leadership and multimedia research"),
  tommi: source("MIT Statistics and Data Science Center · Tommi Jaakkola", "https://stat.mit.edu/people/tommi-s-jaakkola/", "Current MIT EECS professorship and machine-learning research"),
  gifford: source("MIT EECS · David Gifford", "https://www.eecs.mit.edu/people/david-gifford/", "Current MIT professorship and AI for healthcare and life sciences research"),
  rasmussen: source("Cambridge Engineering · Carl Edward Rasmussen", "https://www.eng.cam.ac.uk/profiles/cer54", "Current Professor of Machine Learning appointment"),
  penn: source("University of Toronto · Gerald Penn", "https://www.cs.utoronto.ca/~gpenn/", "Current professorship and computational-linguistics research"),
  jinChoi: source("Seoul National University ECE · Jin Young Choi", "https://ece.snu.ac.kr/en/research-faculty/faculty/fulltime?md=view&profid=p048", "Emeritus status and visual pattern learning research"),
  veloso: source("Carnegie Mellon · Manuela Veloso", "https://engineering.cmu.edu/thailand/directory/bios/veloso-manuela.html", "Professor Emeritus status and AI/robotics research"),
  william: source("UC Santa Barbara CS · William Wang", "https://www.cs.ucsb.edu/people/faculty/william-wang", "Current professor and NLP group director appointment"),
  livescu: source("TTIC · Karen Livescu", "https://www.ttic.edu/faculty/livescu/", "Current professorship and speech/language research"),
  gimpel: source("TTIC · Faculty alumni", "https://ttic.edu/faculty-alumni/", "Kevin Gimpel's 2012–2024 TTIC faculty period and subsequent industry role"),
  shieber: source("Harvard SEAS · Stuart Shieber", "https://seas.harvard.edu/person/stuart-shieber", "Current Welch Professorship and computational-linguistics research"),
  glass: source("MIT CSAIL · Jim Glass", "https://www.csail.mit.edu/person/jim-glass", "Current CSAIL PI and Spoken Language Systems Group leadership"),
  mackay: source("Cambridge Engineering · David MacKay memorial", "https://www.eng.cam.ac.uk/node/3490", "MacKay's 1967–2016 life dates and machine-learning contributions"),

  kenji: source("NUS · Kenji Kawaguchi", "https://www.comp.nus.edu.sg/cs/people/kenji/", "MIT PhD and Leslie Kaelbling as doctoral adviser", "profile"),
  yangYou: source("NUS · Yang You", "https://www.comp.nus.edu.sg/cs/people/youy/", "UC Berkeley PhD and James Demmel as doctoral adviser", "profile"),
  kaiyang: source("HKBU · Kaiyang Zhou biography", "https://www.comp.hkbu.edu.hk/wsb2025/lecturer_details.php?lect_id=16", "University of Surrey PhD and Tao Xiang as doctoral adviser"),
  boHan: source("HKBU · Bo Han", "https://www.comp.hkbu.edu.hk/v1/index.php?id=bhanml&lang=sc&page=profile", "UTS PhD and Ivor W. Tsang as principal supervisor"),
  mikeShou: source("Show Lab · Mike Zheng Shou", "https://sites.google.com/view/showlab/home", "Columbia PhD and Shih-Fu Chang as doctoral adviser", "profile"),
  shiqiWang: source("Shiqi Wang · homepage", "https://www.cs.cityu.edu.hk/~shiqwang/", "Peking University PhD and Wen Gao as doctoral adviser", "profile"),
  hashimoto: source("Tatsunori Hashimoto · homepage", "https://thashim.github.io/", "MIT PhD jointly advised by Tommi Jaakkola and David Gifford", "profile"),
  duvenaud: source("David Duvenaud · homepage", "https://www.cs.toronto.edu/~duvenaud/", "Cambridge PhD advisers and Harvard postdoctoral adviser", "profile"),
  jackie: source("McGill · Jackie Cheung biography", "https://www.cs.mcgill.ca/~jcheung/bio.html", "University of Toronto PhD and Gerald Penn as doctoral adviser", "profile"),
  kwangMoo: source("Kwang Moo Yi · homepage", "https://www.cs.ubc.ca/~kmyi/", "Seoul National University PhD and Jin Young Choi as adviser", "profile"),
  bowling: source("Michael Bowling · CV", "https://webdocs.cs.ualberta.ca/~mbowling/cv.pdf", "Carnegie Mellon PhD and Manuela Veloso as adviser", "cv"),
  wenhu: source("University of Waterloo · Wenhu Chen", "https://uwaterloo.ca/computer-science/news/wenhu-chen-professor-studies-nlp-dl-knowledge-representation-reasoning", "UC Santa Barbara PhD and William Wang as adviser"),
  freda: source("Freda Shi · CV", "https://home.ttic.edu/~freda/data/files/cv/cv.pdf", "TTIC PhD jointly advised by Karen Livescu and Kevin Gimpel", "cv"),
  yuntian: source("University of Waterloo · Yuntian Deng", "https://uwaterloo.ca/computer-science/news/yuntian-deng-computer-scientist-studies-natural-language-processing-and-machine-learning", "Harvard PhD advisers and AI2 postdoctoral adviser"),
  karenCv: source("Karen Livescu · CV", "https://home.ttic.edu/~klivescu/cv_karen_livescu_20240201.pdf", "MIT PhD and Jim Glass as adviser", "cv"),
  ryanCv: source("Ryan P. Adams · CV", "https://www.cs.princeton.edu/~rpa/rpa-cv.pdf", "Cambridge PhD and David MacKay as supervisor", "cv"),
  carlHome: source("Carl Edward Rasmussen · homepage", "https://mlg.eng.cam.ac.uk/carl/", "PhD with Geoffrey Hinton and current Cambridge role", "profile"),
};

type AdviserSeed = {
  id: string;
  name: string;
  role: string;
  institution: Person["institution"];
  actualInstitution?: string;
  region: NonNullable<Person["region"]>;
  area: string;
  tags: string[];
  current: boolean;
  profile: Source;
  lineage: Source;
};

const adviser = (seed: AdviserSeed, index: number): Person => ({
  id: seed.id,
  name: seed.name,
  role: seed.role,
  institution: seed.institution,
  actualInstitution: seed.actualInstitution,
  region: seed.region,
  area: seed.area,
  tags: ["导师谱系", ...seed.tags],
  summary: `${seed.name} 的公开机构页面与学生履历共同支持其在本图谱中的导师节点身份；只记录明确的学位或博士后指导关系。`,
  facts: [
    { label: "当前角色", value: seed.role, source: seed.profile },
    { label: "研究主线", value: seed.area, source: seed.profile },
    { label: "导师证据", value: seed.lineage.supports ?? "学生公开履历明确记录导师关系。", source: seed.lineage },
  ],
  stage: seed.current ? "senior" : "historical",
  category: seed.current ? "core" : "historical",
  status: seed.current ? "在职 PI" : seed.role.includes("1967–2016") ? "已故 · 通过师承关系展示" : "荣休或非现任 · 通过师承关系展示",
  sources: [seed.profile, seed.lineage],
  x: 90 + (index % 10) * 105,
  y: 65 + Math.floor(index / 10) * 80,
  primary: seed.current,
  lastVerifiedAt: checkedAt,
});

const seeds: AdviserSeed[] = [
  { id: "james-demmel-lineage", name: "James Demmel", role: "Professor Emeritus · Professor in the Graduate School", institution: "External", actualInstitution: "UC Berkeley", region: "United States", area: "Numerical Linear Algebra · High-Performance Computing", tags: ["科学计算", "并行计算"], current: false, profile: sources.demmel, lineage: sources.yangYou },
  { id: "tao-xiang-lineage", name: "Tao Xiang", role: "Professor of Computer Vision and Machine Learning", institution: "Award Network", actualInstitution: "University of Surrey", region: "Europe", area: "Computer Vision · Representation Learning", tags: ["计算机视觉", "表征学习"], current: true, profile: sources.tao, lineage: sources.kaiyang },
  { id: "shih-fu-chang-lineage", name: "Shih-Fu Chang", role: "Professor · Senior Executive Vice Dean", institution: "Columbia", region: "United States", area: "Multimedia · Computer Vision · Machine Learning", tags: ["多媒体", "视频理解"], current: true, profile: sources.shihFu, lineage: sources.mikeShou },
  { id: "tommi-jaakkola-lineage", name: "Tommi Jaakkola", role: "Professor of EECS", institution: "MIT", region: "United States", area: "Machine Learning · Statistical Inference", tags: ["机器学习", "统计推断"], current: true, profile: sources.tommi, lineage: sources.hashimoto },
  { id: "david-gifford-lineage", name: "David Gifford", role: "Professor of EECS and Biological Engineering", institution: "MIT", region: "United States", area: "Machine Learning · Computational Biology", tags: ["AI for Science", "计算生物"], current: true, profile: sources.gifford, lineage: sources.hashimoto },
  { id: "carl-rasmussen-lineage", name: "Carl Edward Rasmussen", role: "Professor of Machine Learning", institution: "Cambridge", region: "Europe", area: "Probabilistic Machine Learning · Gaussian Processes", tags: ["概率机器学习", "高斯过程"], current: true, profile: sources.rasmussen, lineage: sources.duvenaud },
  { id: "gerald-penn-lineage", name: "Gerald Penn", role: "Professor of Computer Science", institution: "U of Toronto", region: "Canada", area: "Computational Linguistics · Spoken Language Processing", tags: ["计算语言学", "语音"], current: true, profile: sources.penn, lineage: sources.jackie },
  { id: "jin-young-choi-lineage", name: "Jin Young Choi", role: "Professor Emeritus", institution: "External", actualInstitution: "Seoul National University", region: "United States", area: "Visual Pattern Learning · Intelligent Control", tags: ["计算机视觉", "智能控制"], current: false, profile: sources.jinChoi, lineage: sources.kwangMoo },
  { id: "manuela-veloso-lineage", name: "Manuela Veloso", role: "Professor Emerita", institution: "External", actualInstitution: "Carnegie Mellon University", region: "United States", area: "Artificial Intelligence · Robotics · Multi-Agent Systems", tags: ["机器人", "多智能体"], current: false, profile: sources.veloso, lineage: sources.bowling },
  { id: "william-wang-lineage", name: "William Wang", role: "Professor · NLP Group Director", institution: "Award Network", actualInstitution: "UC Santa Barbara", region: "United States", area: "Natural Language Processing · Machine Learning", tags: ["NLP", "知识表示"], current: true, profile: sources.william, lineage: sources.wenhu },
  { id: "karen-livescu-lineage", name: "Karen Livescu", role: "Professor", institution: "Award Network", actualInstitution: "Toyota Technological Institute at Chicago", region: "United States", area: "Speech and Language Processing · Machine Learning", tags: ["语音", "NLP"], current: true, profile: sources.livescu, lineage: sources.freda },
  { id: "kevin-gimpel-lineage", name: "Kevin Gimpel", role: "Former TTIC Faculty · Senior Director of Research", institution: "External", actualInstitution: "QuillBot", region: "United States", area: "Natural Language Processing · Machine Learning", tags: ["NLP", "机器学习"], current: false, profile: sources.gimpel, lineage: sources.freda },
  { id: "stuart-shieber-lineage", name: "Stuart Shieber", role: "Welch Professor of Computer Science", institution: "Award Network", actualInstitution: "Harvard University", region: "United States", area: "Computational Linguistics · Natural Language Processing", tags: ["计算语言学", "NLP"], current: true, profile: sources.shieber, lineage: sources.yuntian },
  { id: "jim-glass-lineage", name: "Jim Glass", role: "Senior Research Scientist · CSAIL PI", institution: "MIT", region: "United States", area: "Speech Recognition · Spoken Language Processing", tags: ["语音识别", "多模态"], current: true, profile: sources.glass, lineage: sources.karenCv },
  { id: "david-mackay-lineage", name: "David MacKay", role: "Cambridge Professor (1967–2016)", institution: "Cambridge", region: "Europe", area: "Information Theory · Bayesian Machine Learning", tags: ["信息论", "贝叶斯学习"], current: false, profile: sources.mackay, lineage: sources.ryanCv },
];

export const adviserLineagePeople: Person[] = seeds.map(adviser);

const lineage = (id: string, from: string, to: string, subtype: NonNullable<Relationship["subtype"]>, sourceRecord: Source, evidence: string): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "postdoc_mentor" ? "博士后指导" : subtype === "co_adviser" ? "共同博士导师" : subtype === "master_adviser" ? "硕士导师" : "博士导师",
  evidence,
  source: sourceRecord,
  verified: true,
});

export const adviserLineageRelationships: Relationship[] = [
  lineage("lineage-kaelbling-kawaguchi", "leslie-kaelbling-award", "kenji-kawaguchi", "phd_adviser", sources.kenji, "NUS 官方履历明确记录 Kenji Kawaguchi 的 MIT 博士导师为 Leslie Pack Kaelbling。"),
  lineage("lineage-demmel-yang-you", "james-demmel-lineage", "yang-you", "phd_adviser", sources.yangYou, "NUS 官方履历明确记录 Yang You 的 UC Berkeley 博士导师为 James Demmel。"),
  lineage("lineage-tao-xiang-kaiyang-zhou", "tao-xiang-lineage", "kaiyang-zhou", "phd_adviser", sources.kaiyang, "HKBU 公开个人简介明确记录 Kaiyang Zhou 的 University of Surrey 博士导师为 Tao Xiang。"),
  lineage("lineage-ivor-tsang-bo-han", "ivor-tsang-astar", "bo-han-hkbu", "phd_adviser", sources.boHan, "HKBU 官方主页明确记录 Bo Han 的 UTS 博士主要导师为 Ivor W. Tsang。"),
  lineage("lineage-shih-fu-chang-mike-shou", "shih-fu-chang-lineage", "mike-zheng-shou", "phd_adviser", sources.mikeShou, "Show Lab 个人主页明确记录 Mike Zheng Shou 的 Columbia 博士导师为 Shih-Fu Chang。"),
  lineage("lineage-wen-gao-shiqi-wang", "gao-wen-pku", "shiqi-wang-cityu", "phd_adviser", sources.shiqiWang, "Shiqi Wang 个人主页明确记录其北京大学博士导师为高文。"),
  lineage("lineage-jaakkola-hashimoto", "tommi-jaakkola-lineage", "tatsunori-hashimoto-us", "co_adviser", sources.hashimoto, "Tatsunori Hashimoto 个人主页明确记录 MIT 博士由 Tommi Jaakkola 共同指导。"),
  lineage("lineage-gifford-hashimoto", "david-gifford-lineage", "tatsunori-hashimoto-us", "co_adviser", sources.hashimoto, "Tatsunori Hashimoto 个人主页明确记录 MIT 博士由 David Gifford 共同指导。"),
  lineage("lineage-rasmussen-duvenaud", "carl-rasmussen-lineage", "david-duvenaud-ca", "co_adviser", sources.duvenaud, "David Duvenaud 个人主页明确记录 Cambridge 博士导师包括 Carl Edward Rasmussen。"),
  lineage("lineage-zoubin-duvenaud", "zoubin-ghahramani-eu", "david-duvenaud-ca", "co_adviser", sources.duvenaud, "David Duvenaud 个人主页明确记录 Cambridge 博士导师包括 Zoubin Ghahramani。"),
  lineage("lineage-ryan-adams-duvenaud", "ryan-adams-us", "david-duvenaud-ca", "postdoc_mentor", sources.duvenaud, "David Duvenaud 个人主页明确记录 Harvard 博士后导师为 Ryan Adams。"),
  lineage("lineage-gerald-penn-jackie-cheung", "gerald-penn-lineage", "jackie-cheung-ca", "phd_adviser", sources.jackie, "McGill 个人简介明确记录 Jackie Cheung 的 Toronto 博士导师为 Gerald Penn。"),
  lineage("lineage-jin-choi-kwang-moo-yi", "jin-young-choi-lineage", "kwang-moo-yi-ca", "phd_adviser", sources.kwangMoo, "Kwang Moo Yi 个人主页明确记录其 Seoul National University 博士导师为 Jin Young Choi。"),
  lineage("lineage-veloso-bowling", "manuela-veloso-lineage", "michael-bowling-ca", "phd_adviser", sources.bowling, "Michael Bowling 的公开 CV 明确记录 Carnegie Mellon 博士导师为 Manuela Veloso。"),
  lineage("lineage-william-wang-wenhu-chen", "william-wang-lineage", "wenhu-chen-ca", "phd_adviser", sources.wenhu, "Waterloo 官方报道明确记录 Wenhu Chen 的 UC Santa Barbara 博士导师为 William Wang。"),
  lineage("lineage-livescu-freda-shi", "karen-livescu-lineage", "freda-shi-ca", "co_adviser", sources.freda, "Freda Shi 的公开 CV 明确记录 TTIC 博士由 Karen Livescu 共同指导。"),
  lineage("lineage-gimpel-freda-shi", "kevin-gimpel-lineage", "freda-shi-ca", "co_adviser", sources.freda, "Freda Shi 的公开 CV 明确记录 TTIC 博士由 Kevin Gimpel 共同指导。"),
  lineage("lineage-rush-yuntian-deng", "sasha-rush-us", "yuntian-deng-ca", "co_adviser", sources.yuntian, "Waterloo 官方介绍明确记录 Yuntian Deng 的 Harvard 博士导师包括 Alexander Rush。"),
  lineage("lineage-shieber-yuntian-deng", "stuart-shieber-lineage", "yuntian-deng-ca", "co_adviser", sources.yuntian, "Waterloo 官方介绍明确记录 Yuntian Deng 的 Harvard 博士导师包括 Stuart Shieber。"),
  lineage("lineage-choi-yuntian-deng", "yejin-choi-us", "yuntian-deng-ca", "postdoc_mentor", sources.yuntian, "Waterloo 官方介绍明确记录 Yuntian Deng 在 AI2 的博士后导师为 Yejin Choi。"),
  lineage("lineage-hinton-rasmussen", "geoffrey-hinton-ca", "carl-rasmussen-lineage", "phd_adviser", sources.carlHome, "Carl Edward Rasmussen 的个人主页明确写明其博士阶段师从 Geoffrey Hinton。"),
  lineage("lineage-glass-livescu", "jim-glass-lineage", "karen-livescu-lineage", "phd_adviser", sources.karenCv, "Karen Livescu 的公开 CV 明确记录 MIT 博士导师为 Jim Glass。"),
  lineage("lineage-mackay-ryan-adams", "david-mackay-lineage", "ryan-adams-us", "phd_adviser", sources.ryanCv, "Ryan P. Adams 的公开 CV 明确记录 Cambridge 博士导师为 David MacKay。"),
];

