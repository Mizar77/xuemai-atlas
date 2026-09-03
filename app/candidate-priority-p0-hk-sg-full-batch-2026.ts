import batch from "../data/candidate-priority-p0-hk-sg-full-batch-2026-09-03.json";
import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";
const compact = (value: string) => value.replace(/\s+/g, " ").trim();
const slug = (value: string) => value.toLowerCase().normalize("NFKD").replace(/prof\.?\s*/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const source = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });

type Raw = (typeof batch.selected)[number];

const educationOverrides: Record<string, { value: string; label: string; url: string }> = {
  "Hong Kong:香港城市大学:huangheqing黄河清": { value: "BSc，西安电子科技大学；MSc，Imperial College London；PhD，HKUST。", label: "CityU CS · Academic Staff", url: "https://www.cs.cityu.edu.hk/people/academic-staff" },
  "Hong Kong:香港城市大学:liminming李閩溟": { value: "BEng、PhD，清华大学。", label: "CityU · Minming Li Staff Profile", url: "https://www.cityu.edu.hk/stfprofile/minming.li.htm" },
  "Hong Kong:香港城市大学:liangweifa梁維發": { value: "BSc，武汉大学；MEng，USTC；PhD，Australian National University。", label: "CityU · Weifa Liang Staff Profile", url: "https://www.cityu.edu.hk/stfprofile/Weifa_Liang.htm" },
  "Hong Kong:香港城市大学:majiaweiphoenix馬佳葳": { value: "PhD，Columbia University；博士导师为 Shih-Fu Chang。", label: "Jiawei Ma · CityU homepage", url: "https://www.cs.cityu.edu.hk/~jiaweima/" },
  "Hong Kong:香港城市大学:qiujunqiao邱俊喬": { value: "B.S.，Sun Yat-sen University；Ph.D.，University of California, Riverside。", label: "CityU CS · Academic Staff", url: "https://www.cs.cityu.edu.hk/people/academic-staff" },
  "Hong Kong:香港城市大学:qiushuang邱爽": { value: "BEng，USTB；MS，UCAS；PhD，University of Michigan。", label: "CityU · Shuang Qiu Staff Profile", url: "https://www.cityu.edu.hk/stfprofile/shuanqiu.htm" },
  "Hong Kong:香港城市大学:wangjun王鈞": { value: "BEng、MEng，Dalian University of Technology；PhD，Case Western Reserve University。", label: "CityU · Jun Wang Staff Profile", url: "https://www.cityu.edu.hk/stfprofile/jwang.cs.htm" },
  "Hong Kong:香港城市大学:zuojinhang左金航": { value: "BEng，NUPT；MSc、PhD，Carnegie Mellon University。", label: "CityU CS · Academic Staff", url: "https://www.cs.cityu.edu.hk/people/academic-staff" },
};

function education(raw: Raw) {
  if (educationOverrides[raw.canonicalKey]) return educationOverrides[raw.canonicalKey].value;
  const text = compact(raw.evidenceText);
  const patterns = [
    /Qualifications? \(Brief\)\s+(.{5,220}?)(?=\s+Biography\b|\s+Research interests\b|\s+Research Areas\b|\s+Teaching|\s+Project\s*:)/i,
    /Qualification\s+(.{5,180}?)(?=\s+Teaching|\s+Research Advisor|\s+Where to find us)/i,
    /Education\/Academic qualification\s+(.{5,220}?)(?=\s+Expertise|\s+Fingerprint|\s+Project\s*:|\s+Research output|\s+\(Principal Investigator)/i,
    /(received an MS degree in Mathematics from .{5,180}?and a PhD degree in .{5,260}?)(?=\.\s+He joined)/i,
    /(obtained my PhD degree from .{5,160}?)(?=\.|\s+Research Interests)/i,
    /(earned his PhD in computer science from .{5,180}?)(?=\.|\s+Research output)/i,
    /His PhD is from (.{5,140}?)(?=\.|, and)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return compact(match[1]);
  }
  return null;
}

function displayName(raw: Raw) {
  if (raw.pageTitle && raw.pageTitle.endsWith(" - CityUHK Scholars")) return raw.pageTitle.replace(" - CityUHK Scholars", "");
  return raw.name.replace(/^Prof\.?\s+/i, "").trim();
}

function role(raw: Raw) {
  if (raw.canonicalKey.includes("jordanboydgraber")) return "Professor of Natural Language Processing and Human–AI Collaboration";
  const text = compact(raw.evidenceText);
  if (/\b(?:an? |currently an? )Assistant Professor\b/i.test(text)) return "Assistant Professor";
  if (/\b(?:an? |currently an? )Associate Professor\b/i.test(text)) return "Associate Professor";
  if (/\bfull professor\b/i.test(text)) return "Professor";
  return "Faculty · Independent PI";
}

function institution(raw: Raw): Person["institution"] {
  if (raw.institution === "香港城市大学") return "CityU";
  if (raw.institution === "Nanyang Technological University") return "NTU";
  return "SMU";
}

function area(raw: Raw) {
  const text = compact(raw.evidenceText);
  const smu = text.match(/Research Areas ▸ School of Computing and Information Systems (.{5,420}?) Strategic Priorities/i)?.[1];
  if (smu) return compact(smu).replace(/\s+/g, " · ");
  if (/Large Language Model|Language Modeling|Vision-Language/i.test(text)) return "AI · Machine Learning · Large Language Models";
  if (/Human-Computer Interaction|Interactivity/i.test(text)) return "Human-Computer Interaction · Interactive AI";
  if (/Autonomous Driving|Computer Vision|Image|Video|Motion Capture/i.test(text)) return "Computer Vision · Multimedia · Machine Learning";
  if (/Security|Privacy|Blockchain/i.test(text)) return "AI Systems · Security · Privacy";
  if (/Algorithm|Optimization|Mechanism Design/i.test(text)) return "Algorithms · Optimization · Machine Learning";
  return "Artificial Intelligence · Computer Science";
}

const strictRows = batch.selected.filter((raw) => Boolean(raw.portraitUrl && education(raw)));

export const candidatePriorityP0HkSgFullBatchPeople2026: Person[] = strictRows.map((raw, index) => {
  const id = `${slug(raw.name)}-p0-hksg-full`;
  const profile = source(`${displayName(raw)} · official profile`, raw.profileUrl, "现任职务、教育训练、研究方向、头像与学生/师承关系");
  const roster = source(`${raw.institution} · official faculty roster`, raw.rosterUrl, "现任独立 PI 的院系名录身份");
  const educationOverride = educationOverrides[raw.canonicalKey];
  const educationProof = educationOverride ? source(educationOverride.label, educationOverride.url, "教育与学术训练") : profile;
  const educationValue = education(raw)!;
  const relation = raw.relationship as { kind: string; name: string; evidence: string; endpointId?: string };
  return {
    id,
    name: displayName(raw),
    chinese: (raw.name.match(/[\u3400-\u9fff豈-﫿]+/g) ?? []).join("") || undefined,
    role: role(raw),
    institution: institution(raw),
    region: raw.region as Person["region"],
    area: area(raw),
    tags: area(raw).split(" · ").slice(0, 5),
    summary: `${displayName(raw)} 是 ${raw.institution} 的现任独立 PI；官方资料页同时提供教育训练与可核验的${relation.kind === "adviser" ? "博士师承" : "学生指导"}记录。`,
    category: "core",
    primary: true,
    status: "current independent PI · official profile and relationship verified",
    stage: /Professor|Faculty/.test(role(raw)) && !/Assistant/.test(role(raw)) ? "senior" : "emerging",
    x: 140 + (index % 6) * 145,
    y: 140 + Math.floor(index / 6) * 145,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: { src: `portraits/candidate-p0-hk-sg-full-2026/${id}.png`, alt: `${displayName(raw)} 官方头像`, source: profile },
    sources: Array.from(new Map([profile, roster, educationProof].map((item) => [item.url, item])).values()),
    facts: [
      { label: "当前任职", value: `${raw.institution} 官方名录与个人页共同确认其现任独立 PI 身份。`, source: roster },
      { label: "教育与学术训练", value: educationValue, source: educationProof },
      { label: "研究主线", value: area(raw), source: profile },
      { label: relation.kind === "adviser" ? "博士师承" : "学生指导", value: relation.evidence, source: profile },
    ],
  };
});

const peopleByKey = new Map(strictRows.map((raw, index) => [raw.canonicalKey, candidatePriorityP0HkSgFullBatchPeople2026[index]]));

export const candidatePriorityP0HkSgFullBatchGroupMembers2026: GroupMember[] = strictRows.flatMap((raw) => {
  const relation = raw.relationship as { kind: string; name: string; evidence: string };
  const person = peopleByKey.get(raw.canonicalKey)!;
  if (relation.kind !== "student") return [];
  return [{ id: `p0-hksg-full-${person.id}-student`, teacherId: person.id, name: relation.name, role: "Current graduate student · official profile listed", focus: "AI / CS research", source: person.sources[0] }];
});

export const candidatePriorityP0HkSgFullBatchRelationships2026: Relationship[] = strictRows.flatMap((raw) => {
  const relation = raw.relationship as { kind: string; name: string; evidence: string; endpointId?: string };
  const person = peopleByKey.get(raw.canonicalKey)!;
  if (relation.kind !== "adviser" || !relation.endpointId) return [];
  return [{
    id: `p0-hksg-full-${relation.endpointId}-${person.id}`,
    from: relation.endpointId,
    to: person.id,
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: relation.evidence,
    evidenceObject: "official academic profile PhD biography",
    source: person.sources[0],
    verified: true,
  }];
});

export const candidatePriorityP0HkSgFullBatchRosterPromotions2026 = strictRows.map((raw) => ({
  unitUrl: raw.rosterUrl,
  rosterName: raw.name,
  atlasPersonId: peopleByKey.get(raw.canonicalKey)!.id,
  canonicalKey: raw.canonicalKey,
}));

const sinnoProfile = source("CUHK CSE · Sinno Jialin Pan", "https://www.cse.cuhk.edu.hk/people/faculty/sinno-jialin-pan/", "现任职务、教育训练、研究方向与官方头像");
const sinnoHome = source("Sinno Jialin Pan · academic homepage", "https://www.cse.cuhk.edu.hk/~sinnopan/index.html", "完整教育与工作履历");
const sinnoGroup = source("Sinno Jialin Pan · group members", "https://www.cse.cuhk.edu.hk/~sinnopan/group.html", "当前学生、博士毕业生及产业去向");

export const candidatePriorityP0HkSgFullBatchPersonEnhancements2026: Record<string, Partial<Person>> = {
  "sinno-pan": {
    role: "Vice-Chairman (Postgraduate) · Professor · IEEE Fellow",
    institution: "CUHK",
    region: "Hong Kong",
    area: "Machine Learning · Transfer Learning · Symbolic Reasoning",
    tags: ["Machine Learning", "Transfer Learning", "Domain Adaptation", "Symbolic Reasoning"],
    category: "core",
    primary: true,
    stage: "senior",
    status: "current independent PI · official profile verified",
    summary: "CUHK CSE 教授及研究生事务副主任，领导 JC STEM Lab of Machine Learning and Symbolic Reasoning；其学术谱系连接 HKUST、NTU 与 CUHK。",
    portrait: { src: "portraits/candidate-p0-hk-sg-full-2026/sinno-jialin-pan-p0-hksg-full.png", alt: "Sinno Jialin Pan 官方头像", source: sinnoProfile },
    sources: [sinnoProfile, sinnoHome, sinnoGroup],
    facts: [
      { label: "当前任职", value: "CUHK CSE 教授、研究生事务副主任，并任 JC STEM Lab of Machine Learning and Symbolic Reasoning 主任。", source: sinnoProfile },
      { label: "教育与学术训练", value: "2003、2005 年在中山大学获应用数学学士、硕士学位；2011 年于 HKUST 获计算机博士学位。", source: sinnoHome },
      { label: "任职轨迹", value: "曾任 A*STAR I²R 科学家及文本分析实验室负责人，随后在 NTU 历任 Nanyang Assistant Professor、教授及 Provost's Chair Professor，2022 年加入 CUHK。", source: sinnoHome },
      { label: "学生体系", value: "公开组页列出 7 名在读博士生和 12 名博士毕业生，并记录其当前去向。", source: sinnoGroup },
      { label: "产业流向", value: "组页记录博士毕业生 Zhanfeng Mo 加入 TikTok Singapore 任 Machine Learning Engineer。", source: sinnoGroup },
    ],
    lastVerifiedAt: checkedAt,
  },
};

export const candidatePriorityP0HkSgFullBatchExtraGroupMembers2026: GroupMember[] = [
  { id: "p0-hksg-full-sinno-haosen-shi", teacherId: "sinno-pan", name: "Haosen Shi", role: "PhD student · 2023–present", focus: "machine learning and symbolic reasoning", source: sinnoGroup },
  { id: "p0-hksg-full-sinno-zhanfeng-mo", teacherId: "sinno-pan", name: "Zhanfeng Mo", role: "PhD alumnus · 2025", focus: "parameter-efficient neural network training and inference", source: sinnoGroup },
];

export const candidatePriorityP0HkSgFullBatchExtraRosterPromotions2026 = [
  { unitUrl: "https://www.cse.cuhk.edu.hk/people/faculty/", rosterName: "Sinno Jialin Pan", atlasPersonId: "sinno-pan", canonicalKey: "Hong Kong:香港中文大学:sinnojialinpan" },
];

export const People = candidatePriorityP0HkSgFullBatchPeople2026;
export const GroupMembers = [...candidatePriorityP0HkSgFullBatchGroupMembers2026, ...candidatePriorityP0HkSgFullBatchExtraGroupMembers2026];
export const Relationships = candidatePriorityP0HkSgFullBatchRelationships2026;
export const RosterPromotions = [...candidatePriorityP0HkSgFullBatchRosterPromotions2026, ...candidatePriorityP0HkSgFullBatchExtraRosterPromotions2026];
export const PersonEnhancements = candidatePriorityP0HkSgFullBatchPersonEnhancements2026;
export const people = People;
export const groupMembers = GroupMembers;
export const relationships = Relationships;
export const rosterPromotions = RosterPromotions;
export const personEnhancements = PersonEnhancements;
