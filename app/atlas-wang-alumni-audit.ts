import type { GroupMember, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";

const vitaTeam: Source = {
  label: "VITA Group — complete team and alumni roster",
  url: "https://www.vita-group.space/team",
  kind: "profile",
  checkedAt,
  supports: "Complete current postdoc/PhD/undergraduate roster and all 32 named PhD/postdoc alumni, including programme dates and stated current destinations",
};

const shiweiProfile: Source = {
  label: "Shiwei Liu — personal profile",
  url: "https://shiweiliuiiiiiii.github.io/",
  kind: "profile",
  checkedAt,
  supports: "Atlas Wang postdoctoral mentorship, Oxford transition and current ELLIS Institute / MPI-IS PI and group-leader roles",
};

const ziweiHku: Source = {
  label: "HKU Scholars Hub — Ziwei Yang",
  url: "https://repository.hku.hk/cris/rp/rp03531",
  kind: "official",
  checkedAt,
  supports: "Current Research Assistant Professor title and prior postdoctoral work in Atlas Wang's group",
};

const yanHanProfile: Source = {
  label: "Yan Han — personal profile",
  url: "https://yannhan.github.io/",
  kind: "profile",
  checkedAt,
  supports: "Atlas Wang co-advising, LinkedIn/Amazon career sequence and current Microsoft Senior Applied Scientist role",
};

const xinyuGongProfile: Source = {
  label: "Xinyu Gong — personal profile",
  url: "https://gongxinyuu.github.io/",
  kind: "profile",
  checkedAt,
  supports: "TikTok-to-Adobe career sequence and current Adobe Firefly Applied Scientist title",
};

const dejiaXuProfile: Source = {
  label: "Dejia Xu — personal profile",
  url: "https://ir1d.github.io/",
  kind: "profile",
  checkedAt,
  supports: "Atlas Wang PhD advising and current Research Lead role at Luma AI",
};

const junyuanHongProfile: Source = {
  label: "Junyuan Hong — personal profile",
  url: "https://jyhong.gitlab.io/",
  kind: "profile",
  checkedAt,
  supports: "Atlas Wang postdoctoral mentorship, MGH/Harvard transition and current NUS tenure-track appointment",
};

const placement = (
  id: string,
  student: string,
  company: string,
  role: string,
  degree: StudentPlacement["degree"],
  graduationYear: number | undefined,
  sector: StudentPlacement["sector"],
  options: {
    source?: Source;
    firstJob?: string;
    currentRole?: string;
    note?: string;
    highLevel?: boolean;
  } = {},
): StudentPlacement => ({
  id,
  student,
  teacherId: "atlas-wang-us",
  company,
  role,
  degree,
  ...(graduationYear ? { graduationYear } : {}),
  sector,
  kind: "current",
  highLevel: options.highLevel,
  firstJob: options.firstJob,
  currentRole: options.currentRole ?? `${role}, ${company}`,
  note: options.note,
  verifiedAt: checkedAt,
  source: options.source ?? vitaTeam,
});

/**
 * Missing current members relative to the six already present in atlas-wang-enrichment.ts.
 * Together the two modules cover the complete 2026-09-01 VITA roster:
 * 3 postdocs + 16 PhD students + 2 undergraduate students = 21 people (PI excluded).
 */
export const atlasWangAlumniAuditGroupMembers: GroupMember[] = [
  { id: "atlas-junbo-li", teacherId: "atlas-wang-us", name: "Junbo Li", role: "PhD Student · Fall 2024–", source: vitaTeam },
  { id: "atlas-yuehao-wang", teacherId: "atlas-wang-us", name: "Yuehao Wang", role: "PhD Student · Fall 2024–", source: vitaTeam },
  { id: "atlas-kevin-wang", teacherId: "atlas-wang-us", name: "Kevin Wang", role: "PhD Student · Fall 2024–", source: vitaTeam },
  { id: "atlas-yeonju-ro", teacherId: "atlas-wang-us", name: "Yeonju Ro", role: "PhD Student · Spring 2025–", source: vitaTeam },
  { id: "atlas-jiajun-zhu", teacherId: "atlas-wang-us", name: "Jiajun Zhu", role: "PhD Student · Fall 2025–", source: vitaTeam },
  { id: "atlas-jinghan-ke", teacherId: "atlas-wang-us", name: "Jinghan Ke", role: "PhD Student · Fall 2025–", source: vitaTeam },
  { id: "atlas-john-robertson", teacherId: "atlas-wang-us", name: "John Robertson", role: "PhD Student · Fall 2025–", source: vitaTeam },
  { id: "atlas-zhizhou-sha", teacherId: "atlas-wang-us", name: "Zhizhou Sha", role: "PhD Student · Fall 2025–", source: vitaTeam },
  { id: "atlas-tushaar-gangavarapu", teacherId: "atlas-wang-us", name: "Tushaar Gangavarapu", role: "PhD Student · Fall 2025–", source: vitaTeam },
  { id: "atlas-jinju-kim", teacherId: "atlas-wang-us", name: "Jinju Kim", role: "PhD Student · Fall 2026–", source: vitaTeam },
  { id: "atlas-cissy-xie", teacherId: "atlas-wang-us", name: "Cissy Xie", role: "PhD Student · Fall 2026–", source: vitaTeam },
  { id: "atlas-kaijing-ma", teacherId: "atlas-wang-us", name: "Kaijing Ma", role: "PhD Student · Fall 2026–", source: vitaTeam },
  { id: "atlas-bei-ouyang", teacherId: "atlas-wang-us", name: "Bei Ouyang", role: "PhD Student · Fall 2026–", source: vitaTeam },
  { id: "atlas-rohan-siva", teacherId: "atlas-wang-us", name: "Rohan Siva", role: "Undergraduate Researcher · Jan 2025–", source: vitaTeam },
  { id: "atlas-vincent-ha", teacherId: "atlas-wang-us", name: "Vincent Ha", role: "Undergraduate Researcher · Jan 2026–", source: vitaTeam },
];

/** Missing 17 placements; with the original 15 this closes the 32-person PhD/postdoc alumni denominator. */
export const atlasWangAlumniAuditStudentPlacements: StudentPlacement[] = [
  placement("atlas-haotao-wang-qualcomm", "Haotao Wang", "Qualcomm AI Research", "Research Scientist", "PhD", 2023, "industry"),
  placement("atlas-ziyu-jiang-nec", "Ziyu Jiang", "NEC Laboratories America", "Research Scientist", "PhD", 2023, "industry"),
  placement("atlas-jiayi-shen-amazon", "Jiayi Shen", "Amazon", "Applied Scientist", "PhD", 2023, "industry"),
  placement("atlas-yan-han-microsoft", "Yan Han", "Microsoft", "Senior Applied Scientist", "PhD", 2023, "industry", {
    source: yanHanProfile,
    firstJob: "Machine Learning Engineer, LinkedIn (2022–2024; continued across PhD completion)",
    currentRole: "Senior Applied Scientist, Microsoft (March 2026–)",
    note: "VITA labels the current role MTS at Microsoft AI; the alumnus's updated page gives the more precise Senior Applied Scientist title and records an intervening Amazon Applied Scientist role.",
  }),
  placement("atlas-xinyu-gong-adobe", "Xinyu Gong", "Adobe Firefly", "Applied Scientist", "PhD", 2023, "industry", {
    source: xinyuGongProfile,
    firstJob: "Machine Learning Engineer, TikTok (2023–2026)",
    currentRole: "Applied Scientist, Adobe Firefly (February 2026–)",
    note: "VITA says Research Scientist; the alumnus's current page uses Applied Scientist.",
  }),
  placement("atlas-shiwei-liu-ellis-mpi", "Shiwei Liu", "ELLIS Institute Tübingen / MPI-IS", "Principal Investigator · Research Group Leader", "Postdoc", 2023, "academia", {
    source: shiweiProfile,
    firstJob: "Royal Society Newton International Fellow, University of Oxford",
    currentRole: "Principal Investigator, ELLIS Institute Tübingen · Group Leader, MPI-IS",
    note: "Corrects VITA's imprecise 'Assistant Professor, MPI Intelligent Systems' wording; the destination and personal pages identify a PI / independent group-leader appointment.",
    highLevel: true,
  }),
  placement("atlas-scott-hoang-apple", "Scott Hoang", "Apple AI/ML", "Senior Research Scientist", "PhD", undefined, "industry", {
    note: "VITA marks the PhD degree as frozen after Summer 2024; no graduation year is asserted.",
    highLevel: true,
  }),
  placement("atlas-yuning-you-cuhksz", "Yuning You", "CUHK-Shenzhen", "Assistant Professor · Presidential Young Fellow", "PhD", 2024, "academia", {
    firstJob: "Postdoctoral Researcher, Caltech (2024–2025)",
    currentRole: "Assistant Professor · Presidential Young Fellow, CUHK-Shenzhen",
    highLevel: true,
  }),
  placement("atlas-dejia-xu-luma", "Dejia Xu", "Luma AI", "Research Lead", "PhD", 2025, "startup", {
    source: dejiaXuProfile,
    currentRole: "Research Lead, Luma AI",
    note: "The alumnus's updated page supersedes VITA's Research Scientist title and describes leadership of multimodal-agent and physical-AI work.",
    highLevel: true,
  }),
  placement("atlas-ziwei-yang-hku", "Ziwei Yang", "The University of Hong Kong", "Research Assistant Professor · Medicine", "Postdoc", 2024, "academia", {
    source: ziweiHku,
    currentRole: "Research Assistant Professor, Department of Microbiology, HKU Medicine",
    note: "Corrects VITA's broader Assistant Professor wording to HKU's official title.",
  }),
  placement("atlas-junyuan-hong-nus", "Junyuan Hong", "National University of Singapore", "Tenure-track Assistant Professor · ECE", "Postdoc", 2025, "academia", {
    source: junyuanHongProfile,
    firstJob: "Research Fellow, Massachusetts General Hospital / Harvard Medical School (2025–2026)",
    currentRole: "Tenure-track Assistant Professor, NUS ECE (July 2026–)",
    highLevel: true,
  }),
  placement("atlas-zhiwen-fan-tamu", "Zhiwen Fan", "Texas A&M University", "Assistant Professor · ECE", "PhD", 2025, "academia", { highLevel: true }),
  placement("atlas-ajay-jaiswal-apple", "Ajay Jaiswal", "Apple AI/ML", "Research Scientist", "PhD", 2025, "industry"),
  placement("atlas-wes-robbins-clearview", "Wes Robbins", "Clearview AI", "Research Engineer", "PhD", undefined, "startup", {
    note: "VITA marks the PhD degree as frozen after Summer 2025; no graduation year is asserted.",
  }),
  placement("atlas-xuxi-chen-xtx", "Xuxi Chen", "XTX Markets", "Quantitative Researcher", "PhD", 2025, "industry"),
  placement("atlas-zhangheng-li-zoom", "Zhangheng Li", "Zoom AI", "Research Scientist", "PhD", 2025, "industry"),
  placement("atlas-yan-zheng-unity", "Yan Zheng", "Unity AI", "Research Scientist", "PhD", 2026, "industry"),
];

/**
 * Corrections that should be merged into records already defined in atlas-wang-enrichment.ts.
 * Keeping these separate avoids duplicate placements while making the audit actionable.
 */
export const atlasWangExistingPlacementCorrections: Record<string, Partial<StudentPlacement>> = {
  "atlas-ye-yuan-bytedance": {
    graduationYear: 2020,
    currentRole: "Research Scientist, ByteDance Seattle",
    note: "VITA dates the PhD through Summer 2020, not 2021.",
  },
  "atlas-guoliang-kang-beihang": {
    graduationYear: 2021,
    currentRole: "Full Professor, Beihang University ECE",
    note: "The VITA postdoctoral appointment ran March–October 2021; 2022 is the Beihang joining year, not the postdoc completion year.",
  },
  "atlas-junru-wu-deepmind": {
    graduationYear: 2023,
    currentRole: "Research Engineer, Google DeepMind",
    note: "VITA dates the PhD through Summer 2023, not 2022.",
  },
  "atlas-wuyang-chen-sfu": {
    firstJob: "Postdoctoral Researcher, UC Berkeley (2023–2024)",
    currentRole: "Assistant Professor, Simon Fraser University Computing Science (Fall 2024–)",
  },
  "atlas-tianlong-chen-unc": {
    firstJob: "Postdoctoral Researcher, MIT CSAIL / Harvard BMI (2023–2024)",
    currentRole: "Assistant Professor, UNC Chapel Hill Computer Science (Fall 2024–)",
  },
  "atlas-runjin-chen-anthropic": {
    graduationYear: undefined,
    firstJob: "AI Safety Research Fellow, Anthropic (March–September 2025)",
    currentRole: "Member of Technical Staff, Anthropic (October 2025–)",
    note: "Runjin Chen remains a part-time UT Austin PhD student with an expected 2028 completion; Summer 2025 is the full-time-to-part-time transition, not a graduation year.",
  },
  "atlas-greg-holste-cornell": {
    currentRole: "Tenure-track Assistant Professor, Weill Cornell Medicine (September 2026–)",
    note: "The destination is Weill Cornell Medicine (Population Health Sciences / Radiology, courtesy Cardiology), not generic 'Cornell Medicine'.",
  },
};

export const atlasWangAlumniAuditCoverage = {
  checkedAt,
  currentTeam: {
    denominator: 21,
    postdocs: 3,
    phdStudents: 16,
    undergraduateResearchers: 2,
    alreadyPresent: 6,
    addedHere: 15,
    rosterVerified: 21,
    deferred: 0,
  },
  phdAndPostdocAlumni: {
    denominator: 32,
    academia: 10,
    industryOrStartup: 22,
    alreadyPresent: 15,
    addedHere: 17,
    adviserRosterVerified: 32,
    independentlyDestinationChecked: 19,
    destinationCheckDeferred: 13,
  },
} as const;
