import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = process.cwd();
const reviewedAt = "2026-09-03";
const cacheDir = "/private/tmp/thu-ntu-pages";
const outputDir = path.join(root, "data/roster-decisions");
const decisionCategories = [
  "included_existing",
  "include_new_pi",
  "excluded_non_pi",
  "excluded_non_ai_cs",
  "excluded_historical",
  "excluded_industry_only",
  "pending_profile_verification",
];

const units = [
  { id: "thu-cs-next-batch", roster: "data/official-rosters/thu-cs-full-time-faculty-2026-09-02.json", cachePrefix: "thu-cs", institution: "THU" },
  { id: "thu-automation-next-batch", roster: "data/official-rosters/thu-automation-faculty-2026-09-02.json", cachePrefix: "thu-auto", institution: "THU" },
  { id: "thu-air-next-batch", roster: "data/official-rosters/thu-air-research-team-2026-09-02.json", cachePrefix: "thu-air", institution: "THU" },
  { id: "ntu-ccds-next-batch", roster: "data/official-rosters/ntu-ccds-faculty-directory-2026-09-02.json", cachePrefix: "ntu-ccds", institution: "NTU" },
];

const explicitAtlasAliases = new Map(Object.entries({
  "thu-cs-next-batch:Jie TANG": "jie-tang-thu",
  "thu-cs-next-batch:Shimin HU": "hu-shimin-thu",
  "thu-cs-next-batch:Junliang XING": "junliang-xing-thu",
  "thu-cs-next-batch:Minlie HUANG": "minlie-huang",
  "thu-cs-next-batch:Yang Liu": "yang-liu-thu",
  "thu-cs-next-batch:Zhiyuan Liu": "zhiyuan-liu",
  "thu-cs-next-batch:Shaoping MA": "shaoping-ma-thu",
  "thu-cs-next-batch:Maosong SUN": "maosong-sun",
  "thu-cs-next-batch:Bo ZHANG": "bo-zhang-thu-historical",
  "thu-cs-next-batch:Jun ZHU": "jun-zhu-thu",
  "thu-cs-next-batch:Jianfei Chen": "jianfei-chen-thu",
  "thu-automation-next-batch:宋士吉": "shiji-song-award",
  "thu-automation-next-batch:黄必清": "biqing-huang-thu",
  "thu-automation-next-batch:黄高": "gao-huang-tsinghua-award",
  "thu-automation-next-batch:朱松纯": "songchun-zhu-pku",
  "thu-air-next-batch:马维英": "wei-ying-ma",
  "thu-air-next-batch#1204": "yang-liu-thu",
}));

const thuCsAiSoftwareNames = new Set([
  "Guoliang LI", "Juanzi LI", "Jie TANG", "Jianyong WANG", "Yuxiao DONG", "Lei Hou", "Ji Sun",
]);

function normalizeName(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[（）()·,]/g, " ")
    .replace(/\b(?:assoc|asst|assistant|associate|prof|professor|dr|mr|ms|nanyang|president'?s|chair)\b\.?/gi, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLowerCase();
}

function tokenKey(value) {
  return normalizeName(value).split(/\s+/).filter(Boolean).sort().join(" ");
}

function stripHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

await build({
  entryPoints: [path.join(root, "app/data.ts")],
  outfile: "/private/tmp/thu-ntu-decision-current-data.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});
const atlas = await import(`${pathToFileURL("/private/tmp/thu-ntu-decision-current-data.mjs").href}?v=${Date.now()}`);
const atlasById = new Map(atlas.people.map((person) => [person.id, person]));
const atlasUrls = new Map();
for (const person of atlas.people) {
  for (const source of person.sources ?? []) {
    if (source.url) atlasUrls.set(source.url.replace(/\/$/, ""), person.id);
  }
}

function findAtlasPerson(unit, person) {
  const explicit = explicitAtlasAliases.get(`${unit.id}#${person.officialId}`)
    ?? explicitAtlasAliases.get(`${unit.id}:${person.name}`);
  if (explicit && atlasById.has(explicit)) return explicit;
  const urlHit = atlasUrls.get(String(person.profileUrl ?? "").replace(/\/$/, ""));
  if (urlHit) return urlHit;

  const key = tokenKey(person.name);
  if (!key || key.length < 4) return null;
  const candidates = atlas.people.filter((candidate) => candidate.institution === unit.institution);
  for (const candidate of candidates) {
    const aliases = [candidate.name, candidate.chinese].filter(Boolean);
    if (aliases.some((alias) => tokenKey(alias) === key)) return candidate.id;
  }
  if (unit.institution === "NTU") {
    const rosterTokens = new Set(key.split(" "));
    for (const candidate of candidates) {
      const candidateTokens = tokenKey(candidate.name).split(" ").filter(Boolean);
      if (candidateTokens.length >= 2 && candidateTokens.every((token) => rosterTokens.has(token))) return candidate.id;
    }
  }
  return null;
}

function base(unit, person, index) {
  const cached = path.join(cacheDir, `${unit.cachePrefix}-${index}.html`);
  const profileText = fs.existsSync(cached) ? stripHtml(fs.readFileSync(cached, "utf8")) : "";
  return {
    officialId: person.officialId,
    name: person.name,
    title: person.title || null,
    officialSections: person.officialSections ?? [],
    affiliation: person.affiliation || null,
    profileUrl: person.profileUrl || null,
    portraitUrl: person.portraitUrl || person.photoUrl || null,
    keywords: person.keywords || null,
    sourcePageUrl: JSON.parse(fs.readFileSync(path.join(root, unit.roster), "utf8")).officialPageUrl,
    profileFetched: Boolean(profileText),
    profileText,
  };
}

function result(baseValue, decision, reason, evidence, atlasPersonId) {
  const publicBase = Object.fromEntries(
    Object.entries(baseValue).filter(([key]) => key !== "profileText"),
  );
  return {
    ...publicBase,
    decision,
    ...(atlasPersonId ? { atlasPersonId } : {}),
    reason,
    evidence,
  };
}

function classifyThuCs(unit, person, index) {
  const value = base(unit, person, index);
  const existing = findAtlasPerson(unit, person);
  if (existing) return result(value, "included_existing", "姓名或官方主页与图谱现有人物一致。", person.profileUrl, existing);
  const title = person.title ?? "";
  const section = (person.officialSections ?? []).join("; ");
  if (/emeritus|retired|deceased/i.test(`${title} ${value.profileText}`)) {
    return result(value, "excluded_historical", "官方记录显示为荣休、退休或已故人物。", title || person.profileUrl);
  }
  if (/senior engineer|engineer|assistant researcher|assistant research fellow|research associate|research fellow/i.test(title)) {
    return result(value, "excluded_non_pi", "官方职称属于工程、助理研究或非独立研究序列。", title);
  }
  const independent = /professor|associate researcher/i.test(title);
  if (!independent) return result(value, "pending_profile_verification", "官方卡片未给出足以确认独立 PI 身份的职称。", title || person.profileUrl);
  const aiSection = /Institute of Artificial Intelligence|Human-computer Interaction\(HCI\) and Media Integration/i.test(section);
  const aiSoftware = /Institute of Computing Software/i.test(section) && thuCsAiSoftwareNames.has(person.name);
  if (aiSection || aiSoftware) {
    return result(value, "include_new_pi", "当前教授序列职称明确，且所在研究所或官方研究主题位于 AI、NLP、CV、HCI、图形与数据智能范围。", `${title}; ${section}`);
  }
  return result(value, "excluded_non_ai_cs", "当前研究所主线为系统、网络、传统软件或教学基础设施，未达到本图谱 AI/NLP/CV 主线门槛。", `${title}; ${section}`);
}

function classifyThuAutomation(unit, person, index) {
  const value = base(unit, person, index);
  const existing = findAtlasPerson(unit, person);
  if (existing) return result(value, "included_existing", "姓名或官方主页与图谱现有人物一致。", person.profileUrl, existing);
  const section = (person.officialSections ?? []).join("; ");
  if (/自动化实验教学中心/.test(section)) {
    return result(value, "excluded_non_pi", "官方卡片位于实验教学中心，未显示独立科研 PI 序列。", section);
  }
  if (/已故|逝世|荣休|退休/.test(value.profileText)) {
    return result(value, "excluded_historical", "官方个人页显示为已故、荣休或退休人物。", person.profileUrl);
  }
  const roleMatches = value.profileText.match(/(?:清华大学[^。；]{0,40})?(?:助理教授|副教授|教授|副研究员|研究员|中国科学院院士|中国工程院院士)/g) ?? [];
  if (roleMatches.length === 0) {
    return result(value, "pending_profile_verification", "冻结名录没有职称字段，且缓存官方个人页未能抽取独立 PI 职称。", person.profileUrl);
  }
  return result(value, "include_new_pi", "官方个人页可确认教授或研究员序列身份，所在自动化研究所属于智能感知、控制、机器人、认知或工业智能范围。", `${section}; ${roleMatches.slice(0, 2).join("; ")}`);
}

function classifyThuAir(unit, person, index) {
  const value = base(unit, person, index);
  const title = person.title ?? "";
  const section = (person.officialSections ?? []).join("; ");
  if (/科研工程师|研发工程师/.test(`${section} ${title}`)) {
    return result(value, "excluded_non_pi", "AIR 官方名录将其列为科研/研发工程师，而非独立 PI。", `${section}; ${title}`);
  }
  if (/曾任清华大学智能产业研究院|former member/i.test(value.profileText)) {
    return result(value, "excluded_historical", "官方个人页明确把 AIR 任职写为过去时，不作为当前 PI 接入。", person.profileUrl);
  }
  const existing = findAtlasPerson(unit, person);
  if (existing) return result(value, "included_existing", "姓名或官方主页与图谱现有人物一致。", person.profileUrl, existing);
  if (/访问教授/.test(`${section} ${title}`)) {
    return result(value, "excluded_non_pi", "AIR 官方名录将其列为访问教授，不作为该单位当前独立 PI 接入。", `${section}; ${title}`);
  }
  if (/教授|研究员/.test(title)) {
    return result(value, "include_new_pi", "AIR 官方研究团队将其列为教授或研究员序列，且研究机构主线属于产业人工智能。", title);
  }
  return result(value, "pending_profile_verification", "位于教授/研究员分组，但官方卡片缺少职称，需进一步确认独立 PI 身份。", person.profileUrl);
}

function classifyNtu(unit, person, index) {
  const value = base(unit, person, index);
  const existing = findAtlasPerson(unit, person);
  if (existing) return result(value, "included_existing", "清洗职称前缀并处理姓名顺序后，与图谱现有 NTU 人物一致。", person.profileUrl, existing);
  const title = person.title ?? "";
  const keywords = person.keywords ?? "";
  if (/emeritus|retired/i.test(title)) {
    return result(value, "excluded_historical", "官方记录显示为荣休或退休身份。", title);
  }
  if (/\b(?:lecturer|senior lecturer)\b/i.test(title) || /^(?:Dr|Mr|Ms)\b/.test(person.name)) {
    return result(value, "excluded_non_pi", "官方职称为 Lecturer/Senior Lecturer 等教学序列，未显示独立 PI 身份。", title);
  }
  if (!/professor/i.test(title)) {
    return result(value, "pending_profile_verification", "官方职称不足以确认当前独立 PI 身份。", title || person.profileUrl);
  }
  if (!keywords) {
    return result(value, "pending_profile_verification", "冻结官方目录未给研究关键词，需核验个人页后判断研究范围。", person.profileUrl);
  }
  const relevant = /(Artificial and Augmented Intelligence|Computational Intelligence|Computer Vision and Sensing|Robotics and Intelligent Systems|Graphics and Interactive Computing|Brain Machine Interface|Biomedical Informatics and Data Science|Machine-Person Interoperability|Linguistics and Multilingual Studies)/i;
  if (relevant.test(keywords)) {
    return result(value, "include_new_pi", "官方 CCDS 目录确认教授序列职称，研究关键词位于 AI、机器学习、视觉、机器人、NLP、图形或人机智能范围。", `${title}; ${keywords}`);
  }
  return result(value, "excluded_non_ai_cs", "虽为教授序列，但官方研究关键词未进入本图谱 AI/NLP/CV/机器人/智能交互主线。", `${title}; ${keywords}`);
}

function classify(unit, person, index) {
  if (unit.id === "thu-cs-next-batch") return classifyThuCs(unit, person, index);
  if (unit.id === "thu-automation-next-batch") return classifyThuAutomation(unit, person, index);
  if (unit.id === "thu-air-next-batch") return classifyThuAir(unit, person, index);
  return classifyNtu(unit, person, index);
}

fs.mkdirSync(outputDir, { recursive: true });
const all = [];
const unitSummaries = [];
for (const unit of units) {
  const roster = JSON.parse(fs.readFileSync(path.join(root, unit.roster), "utf8"));
  const decisions = roster.people.map((person, index) => classify(unit, person, index));
  if (decisions.length !== roster.officialRosterCount) throw new Error(`${unit.id}: roster count mismatch`);
  const counts = Object.fromEntries(
    decisionCategories.map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]),
  );
  const output = {
    schemaVersion: 1,
    unitId: unit.id,
    unitUrl: roster.officialPageUrl,
    rosterArtifact: unit.roster,
    snapshotAt: roster.fetchedAt,
    reviewedAt,
    officialRosterCount: roster.officialRosterCount,
    decisionCount: decisions.length,
    decisionPolicy: "First deduplicate by official URL and normalized name; then classify current independent PI status and AI/NLP/CV/robotics/intelligent-interaction scope from frozen official fields and cached first-party profiles.",
    counts,
    decisions,
  };
  const outputPath = path.join(outputDir, `${unit.id}-2026-09-03.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  all.push(...decisions.map((row) => ({ unitId: unit.id, ...row })));
  unitSummaries.push({ unitId: unit.id, rosterArtifact: unit.roster, officialRosterCount: roster.officialRosterCount, decisionCount: decisions.length, counts, outputPath: path.relative(root, outputPath) });
}

if (all.length !== 396) throw new Error(`Expected 396 decisions, got ${all.length}`);
const totalsByDecision = Object.fromEntries(
  decisionCategories.map((decision) => [decision, all.filter((row) => row.decision === decision).length]),
);
const summary = {
  schemaVersion: 1,
  scope: "THU CS + THU Automation + THU AIR + NTU CCDS frozen roster decisions",
  reviewedAt,
  officialRosterTotal: 396,
  decisionTotal: all.length,
  totalsByDecision,
  units: unitSummaries,
  unresolved: all.filter((row) => row.decision === "pending_profile_verification").map(({ unitId, officialId, name, title, profileUrl, reason }) => ({ unitId, officialId, name, title, profileUrl, reason })),
  includeNewPi: all.filter((row) => row.decision === "include_new_pi").map(({ unitId, officialId, name, title, profileUrl, portraitUrl, keywords, officialSections }) => ({ unitId, officialId, name, title, profileUrl, portraitUrl, keywords, officialSections })),
};
fs.writeFileSync(path.join(outputDir, "thu-ntu-next-batch-summary-2026-09-03.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ total: all.length, totalsByDecision, units: unitSummaries }, null, 2));
