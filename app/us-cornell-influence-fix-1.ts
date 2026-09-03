import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const firstParty = (
  label: string,
  url: string,
  supports: string,
  kind: Source["kind"] = "profile",
): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  abeGroup: firstParty(
    "Abe Davis Group · Group Members",
    "https://www.cs.cornell.edu/abe/group/members",
    "First-party group roster explicitly identifies current PhD advisees",
  ),
  adityaPeople: firstParty(
    "Aditya Vashistha · People",
    "https://www.adityavashistha.com/people.html",
    "First-party people page explicitly separates current postdocs, PhD advisees and alumni",
  ),
  allisonIsabel: firstParty(
    "Cornell Information Science · Isabel Corpus",
    "https://infosci.cornell.edu/people/isabel-corpus",
    "Official PhD profile explicitly says Isabel Corpus is jointly advised by Allison Koenecke and Mor Naaman",
    "official",
  ),
  allisonEmma: firstParty(
    "Cornell Information Science · Emma Harvey",
    "https://infosci.cornell.edu/people/emma-harvey",
    "Official PhD profile explicitly says Emma Harvey is supervised by Allison Koenecke and Rene Kizilcec",
    "official",
  ),
  allisonAndrea: firstParty(
    "Cornell Information Science · Andrea Wang",
    "https://infosci.cornell.edu/people/andrea-wang",
    "Official PhD profile explicitly says Andrea Wang is co-advised by Allison Koenecke and David Mimno",
    "official",
  ),
  andrewHome: firstParty(
    "Andrew Owens · Homepage",
    "https://andrewowens.com/",
    "First-party biography explicitly names William Freeman and Antonio Torralba as PhD advisers and Alexei Efros and Jitendra Malik as postdoctoral mentors",
  ),
  angelinaHome: firstParty(
    "Angelina Wang · Homepage",
    "https://angelina-wang.infosci.cornell.edu/",
    "First-party biography explicitly names Olga Russakovsky as PhD adviser",
  ),
  angelinaGroup: firstParty(
    "Angelina Wang · Research Group",
    "https://angelina-wang.infosci.cornell.edu/group.html",
    "First-party research-group roster explicitly lists three current PhD students and their co-advisers where applicable",
  ),
  chengGroup: firstParty(
    "Cornell SciFi Lab · Team",
    "https://www.scifilab.org/people",
    "First-party lab roster explicitly lists current PhD students and start terms",
  ),
  deSaGroup: firstParty(
    "Relax ML Lab · Team",
    "https://relax-ml.cs.cornell.edu/team/",
    "First-party lab roster explicitly lists current PhD students and research areas",
  ),
  dianaHome: firstParty(
    "Diana Cai · Homepage",
    "https://www.dianacai.com/",
    "First-party biography explicitly names Ryan Adams and Barbara Engelhardt as PhD advisers",
  ),
  hadarHome: firstParty(
    "Hadar Averbuch-Elor · Homepage and Research Group",
    "https://www.hadarelor.com/",
    "First-party page explicitly names Noah Snavely for postdoctoral training and lists current group members",
  ),
  jenniferHome: firstParty(
    "Jennifer J. Sun · Homepage",
    "https://jenjsun.com/",
    "First-party biography explicitly names Pietro Perona and Yisong Yue as PhD co-advisers",
  ),
  jenniferGroup: firstParty(
    "SunLab at Cornell · People",
    "https://lab.jenjsun.com/",
    "First-party lab roster explicitly lists current graduate students and co-advisers",
  ),
};

const enhancement = (value: string, evidenceSources: Source[]): Partial<Person> => ({
  facts: [{ label: "师承与当前团队", value, source: evidenceSources[0] }],
  sources: evidenceSources,
  lastVerifiedAt: checkedAt,
});

export const usCornellInfluenceFix1PersonEnhancements: Record<string, Partial<Person>> = {
  "abe-davis-cornell": enhancement(
    "本人研究组页明确列出 Longxiulin Deng、Peter Michael、Nhan Tran 等当前博士生，并另列毕业博士与去向。",
    [sources.abeGroup],
  ),
  "aditya-vashistha-cornell": enhancement(
    "本人 People 页把 Dipto Das 列为当前博士后，并把 Deepak Varuvel Dennison、Gauri Nayak、Dhruv Agarwal 等列为当前博士指导学生。",
    [sources.adityaPeople],
  ),
  "allison-koenecke-cornell": enhancement(
    "Cornell Information Science 官方博士生资料分别明确 Isabel Corpus、Emma Harvey 与 Andrea Wang 由 Allison Koenecke 共同指导或监督。",
    [sources.allisonIsabel, sources.allisonEmma, sources.allisonAndrea],
  ),
  "andrew-owens-cornell": enhancement(
    "本人主页明确记录 MIT 博士由 William Freeman 与 Antonio Torralba 共同指导，并在 Berkeley 与 Alexei Efros、Jitendra Malik 开展博士后研究。",
    [sources.andrewHome],
  ),
  "angelina-wang-cornell": enhancement(
    "本人主页明确记录 Princeton 博士导师为 Olga Russakovsky；研究组页另列 Evan Dong、Nicky Kriplani、Vyoma Raman 三位当前博士生。",
    [sources.angelinaHome, sources.angelinaGroup],
  ),
  "cheng-zhang-cornell": enhancement(
    "SciFi Lab 官方团队页把 Hyunchul Lim、Ruidong Zhang、Saif Mahmud 等列为当前博士生，并标明入组学期。",
    [sources.chengGroup],
  ),
  "christopher-de-sa-cornell": enhancement(
    "Relax ML Lab 官方团队页列出 Jerry Chee、A. Feder Cooper、Yucheng Lu 等当前博士生及其研究主题。",
    [sources.deSaGroup],
  ),
  "diana-cai-cornell": enhancement(
    "本人主页明确记录 Princeton 博士由 Ryan Adams 与 Barbara Engelhardt 共同指导；本轮仅对已有规范人物节点 Ryan Adams 建边。",
    [sources.dianaHome],
  ),
  "hadar-averbuch-elor-cornell": enhancement(
    "本人主页明确记录在 Cornell Tech 与 Noah Snavely 开展博士后研究，并列出 Etai Sella、Daniel Garibi、Hao Phung 等当前博士生。",
    [sources.hadarHome],
  ),
  "jennifer-sun-cornell": enhancement(
    "本人主页明确记录 Caltech 博士由 Pietro Perona 与 Yisong Yue 共同指导；SunLab 页另列 Kai Horstmann、Linxi Zhao、Param Mohapatra 等当前研究生。",
    [sources.jenniferHome, sources.jenniferGroup],
  ),
};

const member = (
  teacherId: keyof typeof usCornellInfluenceFix1PersonEnhancements,
  slug: string,
  name: string,
  role: string,
  source: Source,
  focus?: string,
): GroupMember => ({
  id: `cornell-influence-2026-${teacherId}-${slug}`,
  teacherId,
  name,
  role,
  focus,
  source,
});

export const usCornellInfluenceFix1GroupMembers: GroupMember[] = [
  member("abe-davis-cornell", "longxiulin-deng", "Longxiulin Deng", "Current PhD advisee", sources.abeGroup),
  member("abe-davis-cornell", "peter-michael", "Peter Michael", "Current PhD advisee", sources.abeGroup),
  member("abe-davis-cornell", "nhan-tran", "Nhan Tran", "Current PhD advisee", sources.abeGroup),

  member("aditya-vashistha-cornell", "deepak-varuvel-dennison", "Deepak Varuvel Dennison", "Current PhD advisee · Information Science", sources.adityaPeople),
  member("aditya-vashistha-cornell", "gauri-nayak", "Gauri Nayak", "Current PhD advisee · Information Science", sources.adityaPeople),
  member("aditya-vashistha-cornell", "dhruv-agarwal", "Dhruv Agarwal", "Current PhD advisee · Computer Science", sources.adityaPeople),

  member("allison-koenecke-cornell", "isabel-corpus", "Isabel Corpus", "Current PhD student · jointly advised with Mor Naaman", sources.allisonIsabel, "Algorithmic Fairness · HCI"),
  member("allison-koenecke-cornell", "emma-harvey", "Emma Harvey", "Current PhD student · jointly supervised with Rene Kizilcec", sources.allisonEmma, "Algorithmic Fairness · Algorithm Auditing"),
  member("allison-koenecke-cornell", "andrea-wang", "Andrea Wang", "Current PhD student · co-advised with David Mimno", sources.allisonAndrea, "NLP · Data Science · Computational Social Science"),

  member("angelina-wang-cornell", "evan-dong", "Evan Dong", "Current PhD student · co-advised with Nikhil Garg", sources.angelinaGroup),
  member("angelina-wang-cornell", "nicky-kriplani", "Nicky Kriplani", "Current PhD student · co-advised with Hadar Averbuch-Elor", sources.angelinaGroup),
  member("angelina-wang-cornell", "vyoma-raman", "Vyoma Raman", "Current PhD student", sources.angelinaGroup),

  member("cheng-zhang-cornell", "hyunchul-lim", "Hyunchul Lim", "Current PhD student · Information Science", sources.chengGroup),
  member("cheng-zhang-cornell", "ruidong-zhang", "Ruidong Zhang", "Current PhD student · Information Science", sources.chengGroup),
  member("cheng-zhang-cornell", "saif-mahmud", "Saif Mahmud", "Current PhD student · Information Science", sources.chengGroup),

  member("christopher-de-sa-cornell", "jerry-chee", "Jerry Chee", "Current PhD student · Computer Science", sources.deSaGroup, "Scalable and resource-efficient ML"),
  member("christopher-de-sa-cornell", "a-feder-cooper", "A. Feder Cooper", "Current PhD student · Computer Science", sources.deSaGroup, "Accountable and robust ML systems"),
  member("christopher-de-sa-cornell", "yucheng-lu", "Yucheng Lu", "Current PhD student · Computer Science", sources.deSaGroup, "Distributed optimization · ML systems"),

  member("hadar-averbuch-elor-cornell", "etai-sella", "Etai Sella", "Current PhD student · co-advised with Or Patashnik", sources.hadarHome),
  member("hadar-averbuch-elor-cornell", "daniel-garibi", "Daniel Garibi", "Current PhD student · co-advised with Daniel Cohen-Or", sources.hadarHome),
  member("hadar-averbuch-elor-cornell", "hao-phung", "Hao Phung", "Current PhD student", sources.hadarHome),

  member("jennifer-sun-cornell", "kai-horstmann", "Kai Horstmann", "Current PhD student", sources.jenniferGroup),
  member("jennifer-sun-cornell", "linxi-zhao", "Linxi Zhao", "Current PhD student · co-advised with Kilian Weinberger", sources.jenniferGroup),
  member("jennifer-sun-cornell", "param-mohapatra", "Param Mohapatra", "Current PhD student", sources.jenniferGroup),
];

const lineage = (
  id: string,
  from: string,
  to: keyof typeof usCornellInfluenceFix1PersonEnhancements,
  subtype: NonNullable<Relationship["subtype"]>,
  label: string,
  evidence: string,
  source: Source,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label,
  evidence,
  source,
  verified: true,
});

export const usCornellInfluenceFix1Relationships: Relationship[] = [
  lineage("cornell-influence-freeman-owens", "william-freeman-lineage", "andrew-owens-cornell", "co_adviser", "共同博士导师", "Andrew Owens 本人主页明确称 MIT 博士阶段由 William Freeman 与 Antonio Torralba 共同指导。", sources.andrewHome),
  lineage("cornell-influence-torralba-owens", "antonio-torralba-us", "andrew-owens-cornell", "co_adviser", "共同博士导师", "Andrew Owens 本人主页明确称 MIT 博士阶段由 William Freeman 与 Antonio Torralba 共同指导。", sources.andrewHome),
  lineage("cornell-influence-efros-owens", "alexei-efros-us", "andrew-owens-cornell", "postdoc_mentor", "博士后指导", "Andrew Owens 本人主页明确记录在 UC Berkeley 与 Alexei A. Efros 和 Jitendra Malik 开展博士后研究。", sources.andrewHome),
  lineage("cornell-influence-malik-owens", "jitendra-malik-us", "andrew-owens-cornell", "postdoc_mentor", "博士后指导", "Andrew Owens 本人主页明确记录在 UC Berkeley 与 Alexei A. Efros 和 Jitendra Malik 开展博士后研究。", sources.andrewHome),
  lineage("cornell-influence-russakovsky-wang", "olga-russakovsky-us", "angelina-wang-cornell", "phd_adviser", "博士导师", "Angelina Wang 本人主页明确写明 Princeton 计算机博士由 Olga Russakovsky 指导。", sources.angelinaHome),
  lineage("cornell-influence-adams-cai", "ryan-adams-us", "diana-cai-cornell", "co_adviser", "共同博士导师", "Diana Cai 本人主页明确写明 Princeton 计算机博士由 Ryan Adams 与 Barbara Engelhardt 共同指导。", sources.dianaHome),
  lineage("cornell-influence-snavely-averbuch-elor", "noah-snavely-us", "hadar-averbuch-elor-cornell", "postdoc_mentor", "博士后指导", "Hadar Averbuch-Elor 本人主页明确记录在 Cornell Tech 与 Noah Snavely 开展博士后研究。", sources.hadarHome),
  lineage("cornell-influence-perona-sun", "pietro-perona-lineage", "jennifer-sun-cornell", "co_adviser", "共同博士导师", "Jennifer J. Sun 本人主页明确写明 Caltech 博士由 Pietro Perona 与 Yisong Yue 共同指导。", sources.jenniferHome),
  lineage("cornell-influence-yue-sun", "yisong-yue-caltech-award", "jennifer-sun-cornell", "co_adviser", "共同博士导师", "Jennifer J. Sun 本人主页明确写明 Caltech 博士由 Pietro Perona 与 Yisong Yue 共同指导。", sources.jenniferHome),
];

export const enhancements = usCornellInfluenceFix1PersonEnhancements;
export const relationships = usCornellInfluenceFix1Relationships;
export const groupMembers = usCornellInfluenceFix1GroupMembers;
