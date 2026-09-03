import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = process.cwd();
const reviewedAt = "2026-09-03";
const outputPath = path.join(root, "data/roster-decisions/hk-sg-remaining-892-2026-09-03.json");

const units = [
  ["cuhk-cse", "https://www.cse.cuhk.edu.hk/people/faculty/", "cuhk-cse-all-faculty-2026-09-02.json", "pure_cs"],
  ["cuhk-ee", "https://www.ee.cuhk.edu.hk/en-gb/people/academic-staff", "cuhk-ee-academic-staff-2026-09-02.json", "mixed_ee"],
  ["hku-cs", "https://www.cs.hku.hk/people/academic-staff", "hku-cs-academic-staff-2026-09-02.json", "pure_cs"],
  ["hku-ece", "https://ece.hku.hk/people/", "hku-ece-academic-teaching-staff-2026-09-02.json", "mixed_ee"],
  ["cityu-cs", "https://www.cs.cityu.edu.hk/people/academic-staff", "cityu-cs-academic-staff-2026-09-02.json", "pure_cs"],
  ["polyu-comp", "https://www.polyu.edu.hk/comp/people/academic-staff/", "polyu-comp-academic-staff-2026-09-02.json", "pure_cs"],
  ["eduhk-mit", "https://www.eduhk.hk/mit/en/people.php", "eduhk-mit-academic-staff-2026-09-02.json", "mixed_mit"],
  ["lingnan-sds", "https://scholars.ln.edu.hk/en/organisations/school-of-data-science/persons/", "lingnan-sds-researcher-profiles-2026-09-02.json", "rank_unknown"],
  ["lingnan-ai", "https://scholars.ln.edu.hk/en/organisations/division-of-artificial-intelligence/persons/", "lingnan-ai-researcher-profiles-2026-09-02.json", "rank_unknown"],
  ["hkmu-st", "https://www.hkmu.edu.hk/st/people/key-staff/", "hkmu-st-key-staff-2026-09-02.json", "mixed_st"],
  ["hsuhk-cs", "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/", "hsuhk-cs-academic-staff-2026-09-02.json", "pure_cs"],
  ["ntu-ccds-tail", "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", "ntu-ccds-faculty-directory-2026-09-02.json", "pure_cs"],
  ["sutd-istd", "https://www.sutd.edu.sg/istd/people/faculty", "sutd-istd-all-faculty-2026-09-02.json", "pure_cs"],
  ["sutd-aai", "https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/", "sutd-artificial-augmented-intelligence-2026-09-02.json", "pure_ai"],
  ["sit-ict", "https://www.singaporetech.edu.sg/directory/faculty", "sit-infocomm-technology-faculty-2026-09-02.json", "rank_unknown"],
  ["suss-sst", "https://www.suss.edu.sg/academics/schools-college/faculty-listing?schools=school-of-science-and-technology", "suss-school-science-technology-faculty-2026-09-02.json", "mixed_st"],
  ["astar-cfar", "https://www.a-star.edu.sg/cfar/about-cfar/our-team", "astar-cfar-management-team-2026-09-02.json", "research_center"],
  ["duke-nus-daisi", "https://www.duke-nus.edu.sg/daisi/people/faculty", "duke-nus-daisi-faculty-2026-09-02.json", "biomedical_ai"],
].map(([unitId, unitUrl, artifactName, policy]) => ({
  unitId,
  unitUrl,
  policy,
  artifactPath: `data/official-rosters/${artifactName}`,
}));

const unitInstitutions = {
  "cuhk-cse": new Set(["CUHK"]),
  "cuhk-ee": new Set(["CUHK"]),
  "hku-cs": new Set(["HKU"]),
  "hku-ece": new Set(["HKU"]),
  "cityu-cs": new Set(["CityU"]),
  "polyu-comp": new Set(["PolyU"]),
  "eduhk-mit": new Set(["EdUHK"]),
  "lingnan-sds": new Set(["Lingnan"]),
  "lingnan-ai": new Set(["Lingnan"]),
  "hkmu-st": new Set(["HKMU"]),
  "hsuhk-cs": new Set(["HSUHK"]),
  "ntu-ccds-tail": new Set(["NTU"]),
  "sutd-istd": new Set(["SUTD"]),
  "sutd-aai": new Set(["SUTD"]),
  "sit-ict": new Set(["SIT"]),
  "suss-sst": new Set(["SUSS"]),
  "astar-cfar": new Set(["A*STAR"]),
  "duke-nus-daisi": new Set(["Duke-NUS"]),
};

function normalizedName(value) {
  return String(value ?? "")
    .replace(/^(prof(?:essor)?|dr)\.?\s+/iu, "")
    .replace(/\s*\([^)]*\)\s*$/u, "")
    .normalize("NFKD")
    .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
    .toLocaleLowerCase();
}

function tokenKey(value) {
  return String(value ?? "")
    .replace(/[\p{Script=Han}（）]/gu, " ")
    .replace(/\([^)]*\)/gu, " ")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .match(/[a-z]+/g)
    ?.filter((token) => !new Set(["prof", "professor", "dr", "mr", "mrs", "ms", "associate", "assistant", "chair", "distinguished", "emeritus", "adjunct", "phd", "dphil", "ieee", "fellow"]).has(token))
    .sort()
    .join("") ?? "";
}

function exactEvidenceUrl(value) {
  if (!value?.startsWith("http")) return "";
  try {
    const url = new URL(value);
    url.hash = "";
    return url.toString().replace(/\/$/, "").toLowerCase();
  } catch {
    return "";
  }
}

const dataBundle = "/private/tmp/hk-sg-existing-data-2026.mjs";
await build({ entryPoints: [path.join(root, "app/data.ts")], outfile: dataBundle, bundle: true, platform: "node", format: "esm", logLevel: "silent" });
const atlas = await import(`${pathToFileURL(dataBundle).href}?v=${Date.now()}`);

// Freeze the 126 decisions that pre-date this batch instead of reading the
// live aggregate ledger. The live ledger imports this batch after integration,
// so deriving the baseline from it makes a rebuild incorrectly treat our own
// 892 rows as prior work. NTU contributes 116 unique pre-existing name keys;
// its second distinct "Li Yi" profile is intentionally reviewed here.
const priorOfficialIds = new Set([
  "hku-ece:https://ece.hku.hk/people/xjqi/",
  "eduhk-mit:Research Chair Professor / Chair Professor:Prof. Neri Ferrante",
  "eduhk-mit:Assistant Professor:Dr. Yang Yu",
  "lingnan-ai:https://scholars.ln.edu.hk/en/persons/haoran-xie/",
  "hkmu-st:https://www.hkmu.edu.hk/st/people/key-staff/staff-profile/?email=pwang&unit=ST&po=N",
  "hsuhk-cs:930",
  "sutd-aai:https://www.sutd.edu.sg/istd/profile/zhao-na/",
  "sit-ict:sit-ict-002",
  "suss-sst:https://www.suss.edu.sg/academics/schools-college/faculty-listing/detail/dr-bheema-thiagarajan-lokesh",
  "duke-nus-daisi:https://www.duke-nus.edu.sg/directory/detail/liu-nan",
]);
const ntuPriorDecisions = JSON.parse(
  fs.readFileSync(path.join(root, "data/roster-decisions/ntu-ccds-next-batch-2026-09-03.json"), "utf8"),
).decisions;
for (const row of ntuPriorDecisions) {
  if (row.officialId !== "https://dr.ntu.edu.sg/entities/person/yili") priorOfficialIds.add(`ntu-ccds-tail:${row.officialId}`);
}

const sourceUrlToAtlasId = new Map();
const tokenKeyToPeople = new Map();
for (const person of atlas.people) {
  for (const source of person.sources ?? []) {
    const key = exactEvidenceUrl(source.url);
    if (key) sourceUrlToAtlasId.set(key, person.id);
  }
  const key = tokenKey(person.name);
  if (!key) continue;
  const matches = tokenKeyToPeople.get(key) ?? [];
  matches.push({ id: person.id, institution: person.institution });
  tokenKeyToPeople.set(key, matches);
}

function existingAtlasId(unit, person) {
  for (const url of [person.profileUrl, person.scholarUrl, person.officialId]) {
    const id = sourceUrlToAtlasId.get(exactEvidenceUrl(url));
    if (id) return id;
  }
  const expectedInstitutions = unitInstitutions[unit.unitId] ?? new Set();
  const matches = (tokenKeyToPeople.get(tokenKey(person.name)) ?? [])
    .filter((match) => expectedInstitutions.has(match.institution));
  return matches.length === 1 ? matches[0].id : null;
}

const historicalPattern = /(emeritus|retired|former|honorary professor|professor emeritus)/i;
const nonPiPattern = /(adjunct|courtesy|by courtesy|professor-at-large|lecturer|teaching fellow|professor of practice|research assistant professor|assistant lecturer|faculty fellow|guest|visiting|operations|engineer|scientist|student advising coordinator|senior manager)/i;
const professorPattern = /(professor|chairperson|head of pillar|president|dean)/i;
const aiTopicPattern = /(artificial intelligence|intelligent|computer|computing|data science|machine learning|vision|language|robot|digital media|information and communication technology|cloud computing|cyber)/i;
const explicitNonAiTopicPattern = /(environmental|construction|building|facilities|events management|aerospace|mathematics programme|electronics engineering programme|biomedical engineering programme|human factors and safety|antennas|electromagnetics|infectious diseases|paediatrics)/i;

function classify(unit, person) {
  const title = String(person.title ?? "").trim();
  const section = String(person.section ?? person.officialSection ?? person.category ?? "").trim();
  const unitName = String(person.unit ?? "").trim();
  const context = [title, section, unitName, person.keywords ?? "", person.researchAreas ?? "", person.researchInterests ?? ""].filter(Boolean).join(" · ");
  const atlasPersonId = existingAtlasId(unit, person);
  if (historicalPattern.test(context)) {
    return { decision: "excluded_historical", reason: `官方名录将其标为非现任或荣休身份（${context}），不作为当前 PI 纳入。` };
  }
  if (nonPiPattern.test(context)) {
    return { decision: "excluded_non_pi", reason: `官方名录职务属于教学、兼职、礼聘、研究助理或非独立研究序列（${context || "未列教授序列职称"}）。` };
  }
  if (atlasPersonId) {
    return {
      decision: "included_existing",
      atlasPersonId,
      reason: "官方名录姓名/个人页与图谱现有人物一致；保留为已收录的现任 AI/CS 人物。",
    };
  }

  if (unit.policy === "research_center") {
    if (/management.*director|group leads?|team leads?/i.test(context)) {
      return { decision: "include_new_pi", reason: `A*STAR CFAR 官方团队页将其列为独立研究领导角色（${context}），符合 AI 研究中心 PI 范围。` };
    }
    return { decision: "excluded_non_pi", reason: `A*STAR CFAR 官方团队页仅列一般成员、顾问或名誉角色（${context}），未显示独立研究组负责人身份。` };
  }

  if (unit.policy === "biomedical_ai") {
    if (explicitNonAiTopicPattern.test(unitName)) {
      return { decision: "excluded_non_ai_cs", reason: `Duke-NUS 官方 DAISI 名录显示其主单位为 ${unitName}，未显示 AI/CS 或生物医学数据科学主线。` };
    }
    if (professorPattern.test(title) && /biomedical data science/i.test(unitName)) {
      return { decision: "include_new_pi", reason: `Duke-NUS 官方名录确认教授序列职称（${title}），并隶属 Centre for Biomedical Data Science。` };
    }
    return { decision: "pending_profile_verification", reason: `官方名录列出 ${context || "faculty"}，但当前快照不足以同时确认独立 PI 身份与 AI/CS 研究主线，需核对个人页。` };
  }

  if (unit.policy === "mixed_st") {
    if (explicitNonAiTopicPattern.test(context)) {
      return { decision: "excluded_non_ai_cs", reason: `官方职务明确属于当前图谱范围外的专业方向（${context}）。` };
    }
    if (aiTopicPattern.test(context) && professorPattern.test(context)) {
      return { decision: "include_new_pi", reason: `官方名录同时确认教授/研究领导身份及 AI/CS 相关方向（${context}）。` };
    }
    return { decision: "pending_profile_verification", reason: `官方跨学科学院名录仅提供 ${context || "姓名与个人页"}，不足以确认其研究是否属于 AI/CS 主线，需核对个人页。` };
  }

  if (unit.policy === "mixed_ee" || unit.policy === "mixed_mit") {
    if (explicitNonAiTopicPattern.test(context)) {
      return { decision: "excluded_non_ai_cs", reason: `官方名录职务/方向明确落在当前 AI/CS 图谱范围之外（${context}）。` };
    }
    return { decision: "pending_profile_verification", reason: `该院系同时覆盖 AI/CS 与其他方向；官方冻结名录仅显示 ${context || "姓名与个人页"}，需进入个人页确认研究方向和独立 PI 身份。` };
  }

  if (unit.policy === "rank_unknown") {
    return { decision: "pending_profile_verification", reason: `官方名录未在冻结卡片中给出可判断独立 PI 身份的职称/研究方向（${context || "仅标 Researcher Profile"}），需核对个人页。` };
  }

  if (unit.policy === "pure_ai" || unit.policy === "pure_cs") {
    if (unit.unitId === "ntu-ccds-tail" && /mathematics/i.test(String(person.keywords ?? ""))) {
      return { decision: "excluded_non_ai_cs", reason: `NTU 官方个人页关键词仅列 ${person.keywords}，未显示属于当前 AI/CS 图谱主线。` };
    }
    if (professorPattern.test(context) || /full-time faculty/i.test(section)) {
      return { decision: "include_new_pi", reason: `官方 ${unit.policy === "pure_ai" ? "AI 研究方向" : "计算机/信息"} 名录确认其为现任教授序列或全职研究型 faculty（${context || "Full-time Faculty"}）。` };
    }
    return { decision: "pending_profile_verification", reason: `官方院系名录未给出足以确认独立 PI 身份的职称（${context || "职称缺失"}），需核对个人页。` };
  }

  throw new Error(`Unknown policy ${unit.policy}`);
}

const decisions = [];
const unitSummaries = [];
for (const unit of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, unit.artifactPath), "utf8"));
  const rows = [];
  const seenRosterNames = new Set();
  for (const person of artifact.people) {
    if (priorOfficialIds.has(`${unit.unitId}:${person.officialId}`)) continue;
    const duplicateRosterCard = seenRosterNames.has(normalizedName(person.name));
    const distinctSameNamePerson = unit.unitId === "ntu-ccds-tail"
      && person.officialId === "https://dr.ntu.edu.sg/entities/person/yili";
    seenRosterNames.add(normalizedName(person.name));
    const result = duplicateRosterCard
      ? {
          decision: "excluded_non_pi",
          reason: `官方冻结名录重复指向同一人物个人页（${person.profileUrl || person.officialId}）；此卡不代表第二位独立 PI。`,
        }
      : classify(unit, person);
    const auditRosterName = duplicateRosterCard
      ? `${person.name} [duplicate roster card ${person.officialId}]`
      : distinctSameNamePerson
        ? `${person.name} [officialId: yili]`
      : person.name;
    rows.push({
      unitId: unit.unitId,
      unitUrl: unit.unitUrl,
      officialId: person.officialId,
      rosterName: auditRosterName,
      ...(duplicateRosterCard || distinctSameNamePerson ? { rawRosterName: person.name } : {}),
      title: person.title ?? null,
      section: person.section ?? person.officialSection ?? person.category ?? null,
      profileUrl: person.profileUrl || person.scholarUrl || null,
      portraitUrl: person.portraitUrl || person.photoUrl || null,
      decision: result.decision,
      ...(result.atlasPersonId ? { atlasPersonId: result.atlasPersonId } : {}),
      reason: result.reason,
      evidenceUrl: person.profileUrl?.startsWith("http")
        ? person.profileUrl
        : person.scholarUrl?.startsWith("http")
          ? person.scholarUrl
          : unit.unitUrl,
      sourcePageUrl: unit.unitUrl,
      reviewedAt,
    });
  }
  decisions.push(...rows);
  const counts = Object.fromEntries([...new Set(rows.map((row) => row.decision))].sort().map((decision) => [decision, rows.filter((row) => row.decision === decision).length]));
  unitSummaries.push({ unitId: unit.unitId, unitUrl: unit.unitUrl, rosterArtifact: unit.artifactPath, frozenCount: artifact.officialRosterCount, previouslyChecked: artifact.people.length - rows.length, reviewedThisBatch: rows.length, counts });
}

if (decisions.length !== 892) throw new Error(`Expected exactly 892 unchecked Hong Kong/Singapore rows, got ${decisions.length}: ${JSON.stringify(unitSummaries.map((unit) => [unit.unitId, unit.previouslyChecked, unit.reviewedThisBatch]))}`);
const keySet = new Set(decisions.map((row) => `${row.unitUrl}:${normalizedName(row.rosterName)}`));
if (keySet.size !== decisions.length) {
  const seen = new Set();
  const duplicates = decisions.filter((row) => {
    const key = `${row.unitUrl}:${normalizedName(row.rosterName)}`;
    if (seen.has(key)) return true;
    seen.add(key);
    return false;
  });
  throw new Error(`Duplicate rosterName+unitUrl keys: ${decisions.length - keySet.size}; ${JSON.stringify(duplicates.map((row) => [row.unitId, row.rosterName, row.officialId]))}`);
}
const allowed = new Set(["included_existing", "include_new_pi", "excluded_non_ai_cs", "excluded_non_pi", "excluded_historical", "excluded_industry_only", "pending_profile_verification"]);
if (decisions.some((row) => !allowed.has(row.decision))) throw new Error("Unexpected decision category");
if (decisions.some((row) => !row.evidenceUrl?.startsWith("http") || !row.reason || !row.officialId)) throw new Error("A decision lacks evidence, reason, or officialId");

const counts = Object.fromEntries([...allowed].map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]));
const output = {
  schemaVersion: 1,
  reviewedAt,
  scope: "All previously unchecked frozen Hong Kong and Singapore roster records (CUHK Shenzhen excluded as Mainland China)",
  frozenCount: unitSummaries.reduce((sum, unit) => sum + unit.frozenCount, 0),
  previouslyChecked: unitSummaries.reduce((sum, unit) => sum + unit.previouslyChecked, 0),
  reviewedThisBatch: decisions.length,
  remainingUnchecked: 0,
  counts,
  units: unitSummaries,
  decisions,
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath: path.relative(root, outputPath), frozenCount: output.frozenCount, previouslyChecked: output.previouslyChecked, reviewedThisBatch: output.reviewedThisBatch, counts, units: unitSummaries }, null, 2));
