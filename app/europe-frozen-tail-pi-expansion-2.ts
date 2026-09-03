import profilePackage from "../data/roster-decisions/europe-frozen-tail-eligible97-profile-evidence-2026-09-03.json";
import finalDecisions from "../data/roster-decisions/europe-frozen-tail-eligible97-final-2026-09-03.json";
import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";

type ProfileRecord = {
  atlasPersonId: string;
  unitId: string;
  name: string;
  profileUrl: string | null;
  supportingUrl: string | null;
  jobTitle: string;
  affiliations: string[];
  researchAreas: string[];
  portraitSourceUrl: string;
  portraitLocalPath: string;
  status: "ready";
  publicationStatus: "ready" | "queued_education_evidence" | "queued_portrait_evidence";
  education?: {
    status: "verified";
    value: string;
    sourceUrl: string;
    sourceLabel: string;
    sourceSupports: string;
  };
};

type DecisionRecord = {
  atlasPersonId: string;
  unitId: string;
  unitUrl: string;
  rosterName: string;
  title: string | null;
  evidence: string;
  evidenceUrl: string;
  decision: "include_new_pi";
};

const records = (profilePackage.records as unknown as ProfileRecord[]).filter(
  (row) => row.status === "ready" && row.publicationStatus === "ready" && row.education?.status === "verified",
);
const decisions = finalDecisions.decisions as unknown as DecisionRecord[];
const decisionById = new Map(decisions.map((row) => [row.atlasPersonId, row]));

const institutionByUnit: Record<string, Person["institution"]> = {
  "tum-cit": "TUM",
  "aalto-cs": "Aalto",
  "surrey-pai": "Surrey",
  "edinburgh-informatics": "Edinburgh",
};

const rosterLabelByUnit: Record<string, string> = {
  "tum-cit": "TUM CIT official professor roster",
  "aalto-cs": "Aalto Department of Computer Science official people roster",
  "surrey-pai": "Surrey Institute for People-Centred AI official people roster",
  "edinburgh-informatics": "Edinburgh School of Informatics official academic staff roster",
};

const source = (label: string, url: string, supports: string, kind: Source["kind"] = "official"): Source => ({
  label,
  url,
  supports,
  kind,
  checkedAt,
});

function cleanArea(value: string) {
  return value
    .replace(/^Computer Science\s*-\s*/i, "")
    .replace(/\s*-\s*Research area$/i, "")
    .replace(/\s*-\s*Cross-cutting theme\s*-\s*/i, " · ")
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function areaFor(record: ProfileRecord, decision: DecisionRecord) {
  const areas = record.researchAreas.map(cleanArea).filter(Boolean);
  return [...new Set(areas)].slice(0, 3).join(" · ") || cleanArea(decision.evidence) || "Computer Science";
}

function tagsFor(area: string) {
  return [...new Set(area.split(/\s*[·,/]\s*/).map((tag) => tag.trim()).filter(Boolean))].slice(0, 5);
}

function summaryFor(record: ProfileRecord, area: string) {
  const institution = institutionByUnit[record.unitId];
  return `${institution} 现任独立 PI，研究与教学席位聚焦 ${area}；任职和方向均已由院系名录及官方个人页交叉核验。`;
}

function buildPerson(record: ProfileRecord, index: number): Person {
  const decision = decisionById.get(record.atlasPersonId);
  if (!decision) throw new Error(`Missing final decision for ${record.name}`);
  const roster = source(rosterLabelByUnit[record.unitId], decision.unitUrl, "Current independent-PI appointment and department membership");
  const profile = source(`${record.name} — official profile`, record.profileUrl ?? decision.evidenceUrl, "Current role, affiliations and public research profile", "profile");
  const supporting = source(`${record.name} — official research-unit evidence`, record.supportingUrl ?? decision.evidenceUrl, "Research-unit title and scope", "profile");
  const portraitSource = source(`${record.name} — official portrait`, record.portraitSourceUrl, "Official portrait", "profile");
  if (!record.education) throw new Error(`Missing verified education evidence for ${record.name}`);
  const educationSource = source(
    record.education.sourceLabel,
    record.education.sourceUrl,
    record.education.sourceSupports,
    "profile",
  );
  const area = areaFor(record, decision);
  const institution = institutionByUnit[record.unitId];
  const displayName = record.name === "V. Spors" ? "Velvet Spors" : record.name;
  const unitIndex = records.filter((row) => row.unitId === record.unitId).findIndex((row) => row.atlasPersonId === record.atlasPersonId);
  const institutionFacts = record.affiliations.filter((item) => /department|school|institute|centre|center|university/i.test(item)).slice(0, 3);
  return {
    id: record.atlasPersonId,
    name: displayName,
    role: record.jobTitle || decision.title || "Professor",
    institution,
    region: "Europe",
    area,
    tags: tagsFor(area),
    summary: summaryFor(record, area),
    facts: [
      { label: "当前任职", value: `${record.jobTitle || decision.title || "Professor"}，由 ${rosterLabelByUnit[record.unitId]} 核验。`, source: roster },
      { label: "教育与学术训练", value: record.education.value, source: educationSource },
      { label: "研究主线", value: area, source: supporting },
      { label: "学术组织", value: institutionFacts.join("；") || `${institution} 相关计算机科学或人工智能研究单元。`, source: profile },
      { label: "证据边界", value: "仅记录当前官方页面可核验的任职、研究单元与公开履历；未找到一手证据的导师、学生及产业流向不作推断。", source: profile },
    ],
    stage: /assistant professor|lecturer/i.test(record.jobTitle) ? "emerging" : "senior",
    category: "core",
    status: "current PI · official roster and profile verified",
    sources: [profile, supporting, roster, educationSource],
    x: 120 + (unitIndex % 8) * 145,
    y: 120 + Math.floor(unitIndex / 8) * 145 + index % 2,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: record.portraitLocalPath,
      alt: `${record.name} official portrait`,
      source: portraitSource,
    },
  };
}

export const europeFrozenTailPiExpansion2People: Person[] = records.map(buildPerson);
export const europeFrozenTailPiExpansion2Relationships: Relationship[] = [
  {
    id: "helen-hastie-michael-herrmann-cdt-ras-leadership",
    from: "helen-hastie-edinburgh-tail2",
    to: "michael-herrmann-edinburgh-tail2",
    type: "collaboration",
    subtype: "sustained_collaboration",
    label: "CDT-RAS 学术领导团队",
    evidence: "Edinburgh Centre for Robotics 官方年度报告列 Helen Hastie 为 CDT-RAS Director、Michael Herrmann 为 Deputy Director，记录两人在该博士培养中心的联合学术领导关系。",
    evidenceObject: "EPSRC Centre for Doctoral Training in Robotics and Autonomous Systems (CDT-RAS)",
    source: source(
      "Edinburgh Centre for Robotics — CDT-RAS Annual Review 2021/22",
      "https://www.edinburgh-robotics.org/sites/default/files/CDT-RAS-Annual-Review-2022.pdf",
      "Helen Hastie and Michael Herrmann served together as Director and Deputy Director of CDT-RAS",
    ),
    verified: true,
    recentYear: 2022,
  },
  {
    id: "jari-saramaki-mikko-kivela-temporal-networks",
    from: "jari-saramaki-aalto-tail2",
    to: "mikko-kivela-aalto-tail2",
    type: "collaboration",
    subtype: "publication",
    label: "时序网络研究合作",
    evidence: "Aalto 官方研究门户收录 Jari Saramäki 与 Mikko Kivelä 共同署名的时序网络连通性论文，并同时标注两人的 Aalto 研究单元。",
    evidenceObject: "Weighted temporal event graphs and temporal network connectivity",
    source: source(
      "Aalto research portal — Weighted temporal event graphs and temporal network connectivity",
      "https://research.aalto.fi/en/publications/weighted-temporal-event-graphs-and-temporal-network-connectivity/",
      "Jari Saramäki and Mikko Kivelä are coauthors of an Aalto-indexed temporal-networks publication",
    ),
    verified: true,
    recentYear: 2023,
  },
  {
    id: "maarit-korpi-lagg-jari-saramaki-cs-leadership",
    from: "jari-saramaki-aalto-tail2",
    to: "maarit-korpi-lagg-aalto-tail2",
    type: "collaboration",
    subtype: "sustained_collaboration",
    label: "计算机系领导团队",
    evidence: "Aalto Department of Computer Science 官方联系页将 Jari Saramäki 列为系主任，并将 Maarit Korpi-Lagg 列为创新与基础设施副主任，构成同一院系的正式领导团队。",
    evidenceObject: "Aalto Department of Computer Science leadership team",
    source: source(
      "Aalto Department of Computer Science — Contact us",
      "https://www.aalto.fi/en/department-of-computer-science/contact-us",
      "Official department page lists Jari Saramäki as Head of Department and Maarit Korpi-Lagg as Vice Head of Innovations and infrastructure",
    ),
    verified: true,
    recentYear: 2026,
  },
];
export const europeFrozenTailPiExpansion2GroupMembers: GroupMember[] = [
  {
    id: "helen-hastie-konstantinos-gavrillidis",
    teacherId: "helen-hastie-edinburgh-tail2",
    name: "Konstantinos Gavrillidis",
    role: "Current doctoral student · co-supervised with Wei Pang",
    focus: "Explainable autonomy and data-to-text interfaces for autonomous underwater vehicles",
    source: source(
      "Edinburgh Centre for Robotics — Konstantinos Gavrillidis",
      "https://www.edinburgh-robotics.org/students/konstantinos-gavrillidis",
      "Current student status, research project and Helen Hastie supervision",
      "profile",
    ),
  },
  {
    id: "jari-saramaki-takayuki-hiraoka",
    teacherId: "jari-saramaki-aalto-tail2",
    name: "Takayuki Hiraoka",
    role: "Research Fellow · Complex Systems research group",
    focus: "Complex systems and network science",
    source: source(
      "Aalto Department of Computer Science — Complex Systems group people",
      "https://www.aalto.fi/en/department-of-computer-science/people",
      "Official group roster lists Takayuki Hiraoka and Jari Saramäki and directs enquiries to Jari Saramäki",
      "profile",
    ),
  },
  {
    id: "maarit-korpi-lagg-ghassem-gozaliasl",
    teacherId: "maarit-korpi-lagg-aalto-tail2",
    name: "Ghassem Gozaliasl",
    role: "Postdoctoral Researcher · Professorship Korpi-Lagg Maarit",
    focus: "Astroinformatics and high-performance data analysis",
    source: source(
      "Aalto research portal — Professorship Korpi-Lagg Maarit",
      "https://research.aalto.fi/en/organisations/professorship-korpi-lagg-maarit/",
      "Official research-unit roster lists Ghassem Gozaliasl as a postdoctoral researcher in the Korpi-Lagg professorship",
      "profile",
    ),
  },
];
export const europeFrozenTailPiExpansion2StudentPlacements: StudentPlacement[] = [];
export const europeFrozenTailPiExpansion2Portraits: Record<string, Person["portrait"]> =
  Object.fromEntries(europeFrozenTailPiExpansion2People.map((person) => [person.id, person.portrait]));
