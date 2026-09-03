import { readFileSync, writeFileSync } from "node:fs";
import { people } from "../app/data";
import { topSchoolRosterPersonAudits, topSchoolRosterUnitSnapshots } from "../app/top-school-roster-ledger";
import { topSchoolRosterScope } from "../app/top-school-roster-scope";

type OfficialPerson = {
  officialId: string;
  name: string;
  officialSections?: string[];
  title?: string;
  profileUrl?: string;
  portraitUrl?: string;
  researchArea?: string;
  officialFields?: Record<string, unknown>;
};

type RawDecision = OfficialPerson & {
  unitUrl: string;
  institution: string;
  unitName: string;
  decision: "included_existing" | "include_new_pi" | "excluded_non_ai_cs" | "excluded_non_pi" | "excluded_historical" | "excluded_industry_only" | "pending_profile_verification";
  atlasPersonId?: string;
  evidenceUrl: string;
  reason: string;
};

const reviewedAt = "2026-09-03";
const outputPath = "data/roster-decisions/mainland-top10-tail-2026-09-03.json";

const auditNormalize = (value: string) => value
  .replace(/^(prof(?:essor)?|dr)\.?\s+/iu, "")
  .replace(/\s*\([^)]*\)\s*$/u, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();

const personNormalize = (value: string) => value
  .replace(/^(prof(?:essor)?|dr)\.?\s+/iu, "")
  .replace(/[（(][^）)]*[）)]/gu, "")
  .replace(/\s+\d+$/u, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();

const institutionAliases: Record<string, Set<string>> = {
  "北京大学": new Set(["PKU"]),
  "上海交通大学": new Set(["SJTU"]),
  "浙江大学": new Set(["ZJU"]),
  "南京大学": new Set(["NJU"]),
  "中国科学技术大学": new Set(["USTC"]),
  "哈尔滨工业大学": new Set(["HIT"]),
  "中国科学院大学 / 中国科学院": new Set(["CAS-IA", "CAS-ICT", "UCAS"]),
  "中国人民大学": new Set(["RUC"]),
  "复旦大学": new Set(["FDU"]),
};

const atlasByInstitutionAndName = new Map<string, string>();
for (const person of people) {
  if (!person.primary || person.region !== "Mainland China") continue;
  for (const value of [person.name, person.chinese].filter(Boolean) as string[]) {
    atlasByInstitutionAndName.set(`${person.institution}:${personNormalize(value)}`, person.id);
  }
}

const priorAuditKeys = new Set(topSchoolRosterPersonAudits.map((row) => `${row.unitUrl}:${auditNormalize(row.rosterName)}`));
const snapshotByUrl = new Map(topSchoolRosterUnitSnapshots.map((snapshot) => [snapshot.unitUrl, snapshot] as const));
const targetUnits = topSchoolRosterScope
  .filter((item) => item.region === "Mainland China" && item.rank <= 10)
  .flatMap((school) => school.units.map((unit) => {
    const snapshot = snapshotByUrl.get(unit.url);
    if (!snapshot?.artifactPath || snapshot.fetchStatus !== "complete") return null;
    const artifact = JSON.parse(readFileSync(snapshot.artifactPath, "utf8")) as { people: OfficialPerson[] };
    return { school, unit, artifact };
  }))
  .filter((item): item is NonNullable<typeof item> => item !== null);
const officialNameFrequency = new Map<string, number>();
for (const { school, artifact } of targetUnits) {
  for (const person of artifact.people) {
    const key = `${school.institution}:${personNormalize(person.name)}`;
    officialNameFrequency.set(key, (officialNameFrequency.get(key) ?? 0) + 1);
  }
}

const joined = (person: OfficialPerson) => [
  person.title ?? "",
  ...(person.officialSections ?? []),
  ...Object.values(person.officialFields ?? {}).filter((value): value is string => typeof value === "string"),
].join(" · ").trim();

const isHistorical = (metadata: string) => /荣休|退休|离休|已故|名誉|former|emeritus/iu.test(metadata);
const isNonPi = (metadata: string) => /博士后|行政|管理|秘书|馆员|实验师|实验中心|工程技术人员|助理工程师|工程师|研究实习员|助教|讲师|助理研究员|技术人员|专业技术人员|学生/iu.test(metadata);
const isAffiliate = (metadata: string) => /兼职|客座|双聘|跨学科博导/iu.test(metadata);
const isIndependentTitle = (metadata: string) => /院士|教授|研究员|准长聘|长聘|准聘|预聘|博导/iu.test(metadata) && !/助理研究员|研究实习员/iu.test(metadata);

function classify(person: OfficialPerson, unitUrl: string): { decision: RawDecision["decision"]; reason: string } {
  const metadata = joined(person);
  const section = (person.officialSections ?? []).join("；") || "官网未标注分组";
  const title = person.title?.trim() || "官网未标注职称";
  const area = person.researchArea?.trim();
  const evidence = `官方冻结名录分组“${section}”，职称“${title}”${area ? `，研究方向“${area}”` : ""}`;

  if (isHistorical(metadata)) return { decision: "excluded_historical", reason: `${evidence}；官方分组/职称明确为荣休、退休或历史人员，不作为现任 PI。` };
  if (isAffiliate(metadata)) return { decision: "excluded_non_pi", reason: `${evidence}；该条为兼职、客座、双聘或跨单位导师，不能据此认定为本单位现任独立 PI。` };

  if (unitUrl === "https://www.cs.sjtu.edu.cn/jiaoshiml.html") {
    if (/^教师名录/u.test(section)) return { decision: "include_new_pi", reason: `${evidence}；上海交大计算机学院当前教师名录按研究所列出，属于 CS 教师候选，待补完整个人资料包。` };
  }

  if (unitUrl === "http://www.cs.zju.edu.cn/csen/27003/list.htm") {
    if (/机关|实验中心|基础教学|应用工程中心/u.test(section)) return { decision: "excluded_non_pi", reason: `${evidence}；官方分组属于机关、教学/实验支持或应用工程中心，未显示独立 PI 身份。` };
    return { decision: "include_new_pi", reason: `${evidence}；官方目录将其列入计算机学院研究所/重点实验室，作为现任 CS 研究 PI 候选，待补完整资料包。` };
  }

  if (unitUrl === "http://www.cse.zju.edu.cn/39568/list.htm") {
    return { decision: "include_new_pi", reason: `${evidence}；官方控制学院师资目录按研究所列出，研究范围覆盖智能系统、工业智能、感知与控制，作为 AI/CS 相邻 PI 候选。` };
  }

  if (unitUrl === "https://computing.hit.edu.cn/jsml/list.htm") {
    if (/实验中心/u.test(section) || person.name === "感知计算研究中心") return { decision: "excluded_non_pi", reason: `${evidence}；该条属于实验教学支持分组或误抓取的研究中心标题，不是可确认的独立 PI。` };
    return { decision: "include_new_pi", reason: `${evidence}；哈工大计算学部官方教师名录按研究中心列出，属于 AI/CS 教师候选，待补职称与个人资料。` };
  }

  if (unitUrl === "https://ai.hit.edu.cn/12789/list.htm") {
    return { decision: "pending_profile_verification", reason: `${evidence}；页面仅标“研究人员”且个人链接回到同一名录，尚不足以确认现任独立 PI/招生资格。` };
  }

  if (unitUrl === "https://ict.cas.cn/yjdw/" || unitUrl === "https://ia.cas.cn/rcdw/") {
    return { decision: "include_new_pi", reason: `${evidence}；中科院官方研究队伍名录明确标为研究员或副研究员岗位，属于 AI/CS 研究 PI 候选，待补个人资料与招生证据。` };
  }

  if (unitUrl === "https://ai3.fudan.edu.cn/rcdw/qzkyry.htm") {
    if (/工程技术人员|博士后|兼职专家/u.test(metadata)) return { decision: "excluded_non_pi", reason: `${evidence}；官方身份为工程技术、博士后或兼职专家，不满足本单位现任独立 PI 门槛。` };
    return { decision: "pending_profile_verification", reason: `${evidence}；“全职科研人员”未进一步给出教授/研究员或独立招生身份，需查个人页后再决定纳入。` };
  }

  if (isNonPi(metadata)) return { decision: "excluded_non_pi", reason: `${evidence}；官方职称/分组未达到可确认的独立 PI 或研究组负责人门槛。` };
  if (isIndependentTitle(metadata)) return { decision: "include_new_pi", reason: `${evidence}；官方名录确认现任教授、研究员、院士或具博导资格的独立学术岗位，属于 AI/CS PI 候选。` };

  if (unitUrl === "https://sai.sjtu.edu.cn/cn/faculty/zzjs") {
    return { decision: "pending_profile_verification", reason: `${evidence}；专职教师条目未提供足以确认独立 PI 的职称，需个人页复核。` };
  }

  if (unitUrl === "https://www.cis.pku.edu.cn/szdw/zzjs.htm") {
    return { decision: "pending_profile_verification", reason: `${evidence}；官方条目未显示可确认的独立 PI 职称，需个人页复核。` };
  }

  if (unitUrl === "https://info.ruc.edu.cn/jsky/szdw/ajxjgcx/bx/bx1/index.htm" || unitUrl === "https://cs.fudan.edu.cn/50021/list.htm") {
    return { decision: "pending_profile_verification", reason: `${evidence}；全员卡片未标注职称/独立招生资格，需进入个人页核验。` };
  }

  return { decision: "pending_profile_verification", reason: `${evidence}；冻结名录字段不足以确认其是否为现任 AI/CS 独立 PI。` };
}

const decisions: RawDecision[] = [];
const unitSummaries: Array<Record<string, unknown>> = [];
for (const { school, unit, artifact } of targetUnits) {
    const unitDecisions: RawDecision[] = [];
    for (const person of artifact.people) {
      if (priorAuditKeys.has(`${unit.url}:${auditNormalize(person.name)}`)) continue;
      const initial = classify(person, unit.url);
      const aliases = institutionAliases[school.institution] ?? new Set<string>();
      const frequencyKey = `${school.institution}:${personNormalize(person.name)}`;
      const atlasPerson = officialNameFrequency.get(frequencyKey) === 1
        ? [...aliases]
          .map((institution) => atlasByInstitutionAndName.get(`${institution}:${personNormalize(person.name)}`))
          .find(Boolean)
        : undefined;
      const decision = initial.decision === "include_new_pi" && atlasPerson ? "included_existing" : initial.decision;
      const reason = decision === "included_existing"
        ? `${initial.reason} 图谱中已有同校现任节点，已对齐为 included_existing。`
        : initial.reason;
      unitDecisions.push({
        ...person,
        unitUrl: unit.url,
        institution: school.institution,
        unitName: unit.name,
        decision,
        ...(atlasPerson ? { atlasPersonId: atlasPerson } : {}),
        evidenceUrl: person.profileUrl?.startsWith("http") ? person.profileUrl : unit.url,
        reason,
      });
    }
    decisions.push(...unitDecisions);
    unitSummaries.push({
      rank: school.rank,
      institution: school.institution,
      unitName: unit.name,
      unitUrl: unit.url,
      frozen: artifact.people.length,
      previouslyDecided: artifact.people.length - unitDecisions.length,
      decidedThisBatch: unitDecisions.length,
      classification: Object.fromEntries([...new Set(unitDecisions.map((row) => row.decision))].sort().map((kind) => [kind, unitDecisions.filter((row) => row.decision === kind).length])),
    });
}

const classification = Object.fromEntries([...new Set(decisions.map((row) => row.decision))].sort().map((kind) => [kind, decisions.filter((row) => row.decision === kind).length]));
writeFileSync(outputPath, `${JSON.stringify({
  scope: "Mainland China top-school ranks 1-10 frozen official rosters",
  checkedAt: reviewedAt,
  decisionKey: "unitUrl + officialId (rosterName retained verbatim)",
  note: "Only rows not already present in the shared ledger at generation time are included. candidate/include_new_pi means roster eligibility is decided but the atlas profile package remains for a later publishing batch.",
  unitSummaries,
  classification,
  decisions,
}, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, decisions: decisions.length, classification, units: unitSummaries.length }, null, 2));
