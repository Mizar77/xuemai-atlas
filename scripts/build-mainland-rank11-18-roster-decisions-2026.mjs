import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checkedAt = "2026-09-03";
const cacheDir = "/private/tmp/mainland-rank11-18-profile-cache-2026";
const outputDir = path.join(root, "data/roster-decisions/mainland-rank11-18-2026-09-03");

const units = [
  { rank: 11, institution: "武汉大学", unitId: "whu-cs-rank11-18", unitName: "计算机学院", roster: "whu-cs-all-personnel-2026-09-02.json", atlasAliases: ["whu"] },
  { rank: 11, institution: "武汉大学", unitId: "whu-ai-rank11-18", unitName: "人工智能学院", roster: "whu-ai-all-faculty-2026-09-02.json", aiUnit: true, atlasAliases: ["whu"] },
  { rank: 12, institution: "电子科技大学", unitId: "uestc-cs-rank11-18", unitName: "计算机科学与工程学院（网络空间安全学院）", roster: "uestc-cs-all-faculty-2026-09-02.json", atlasAliases: ["uestc"] },
  { rank: 13, institution: "东南大学", unitId: "seu-cse-rank11-18", unitName: "计算机科学与工程学院 / 软件学院 / 人工智能学院", roster: "seu-cse-all-faculty-2026-09-02.json", atlasAliases: ["seu"] },
  { rank: 14, institution: "中山大学", unitId: "sysu-cse-rank11-18", unitName: "计算机学院", roster: "sysu-cse-all-personnel-2026-09-02.json", atlasAliases: ["sysu"] },
  { rank: 14, institution: "中山大学", unitId: "sysu-ai-rank11-18", unitName: "人工智能学院", roster: "sysu-ai-all-faculty-and-mentors-2026-09-02.json", aiUnit: true, atlasAliases: ["sysu"] },
  { rank: 15, institution: "北京航空航天大学", unitId: "buaa-cs-rank11-18", unitName: "计算机学院", roster: "buaa-cs-all-faculty-2026-09-02.json", atlasAliases: ["buaa"] },
  { rank: 15, institution: "北京航空航天大学", unitId: "buaa-ai-rank11-18", unitName: "人工智能学院", roster: "buaa-ai-all-personnel-2026-09-02.json", aiUnit: true, atlasAliases: ["buaa"] },
  { rank: 16, institution: "香港中文大学（深圳）", unitId: "cuhksz-sds-rank11-18", unitName: "数据科学学院", roster: "cuhksz-sds-all-faculty-2026-09-02.json", aiUnit: true, atlasAliases: ["cuhksz", "cuhk-shenzhen"] },
  { rank: 17, institution: "北京邮电大学", unitId: "bupt-cs-rank11-18", unitName: "计算机学院", roster: "bupt-cs-complete-faculty-2026-09-02.json", atlasAliases: ["bupt"] },
  { rank: 17, institution: "北京邮电大学", unitId: "bupt-ai-rank11-18", unitName: "人工智能学院", roster: "bupt-ai-complete-faculty-2026-09-02.json", aiUnit: true, atlasAliases: ["bupt"] },
  { rank: 18, institution: "深圳大学", unitId: "szu-ai-rank11-18", unitName: "人工智能学院", roster: "szu-ai-full-faculty-2026-09-02.json", aiUnit: true, atlasAliases: ["szu"] },
];

const validDecisions = new Set([
  "included_existing",
  "include_new_pi",
  "excluded_non_ai_cs",
  "excluded_non_pi",
  "excluded_historical",
  "excluded_industry_only",
  "excluded_insufficient_scope_evidence",
  "pending_profile_verification",
]);
const aiPattern = /(人工智能|机器学习|深度学习|大模型|基础模型|语言模型|自然语言|知识图谱|知识工程|计算机视觉|机器视觉|图像|视频|视觉|多媒体|模式识别|机器人|智能控制|智能计算|智能优化|智能感知|自主系统|自动驾驶|无人驾驶|无人机|无人系统|具身|强化学习|数据挖掘|数据科学|数据库|推荐系统|神经网络|进化计算|群体智能|多智能体|博弈智能|生成模型|生成式|语音|声学|生物信息|医学影像|医学图像|数字孪生|人机交互|计算机图形|图形学|可视化|三维重建|SLAM|智能诊疗|智能医疗|脑机|认知计算|情感计算|智能科学|智能算法|智能决策|智能信息处理|智能信号处理|智能网络|智能系统|目标检测|目标识别|目标跟踪|图学习|联邦学习|迁移学习|表示学习|计算智能|artificial intelligence|machine learning|deep learning|large language model|foundation model|natural language|knowledge graph|computer vision|image processing|pattern recognition|data mining|data science|database|recommender system|reinforcement learning|graph neural|generative model|multimodal|robotics?|autonomous system|speech recognition|computational linguistics|computer graphics|visualization)/iu;
const historicalPattern = /(荣休|退休|离休|已故|逝世|名誉教授|emeritus|retired|former faculty|历史教师)/iu;
const industryOnlyPattern = /(产业导师|行业导师|企业导师|industrial mentor|industry mentor)/iu;
const clearNonPiPattern = /(行政|党政|办公室|秘书|辅导员|教务|实验技术|实验师|工程师|工程人员|专业技术人员|技术员|科研助理|研究助理|博士后|博士研究生|硕士研究生|student|postdoc|laboratory technician|administrative)/iu;
const highTitlePattern = /(院士|教授|研究员|副教授|副研究员|助理教授|特聘研究员|特任研究员|特任教授|讲席|博导|博士生导师|硕士生导师|professor|reader|principal investigator|research fellow|researcher)/iu;
const lowTitlePattern = /(讲师|助教|助理研究员|助理工程师|工程师|实验师|postdoc|student|lecturer|instructor|research assistant|engineer)/iu;
const adviserPattern = /(博士生导师|博士导师|硕士生导师|硕士导师|博导|硕导|招生|招收博士|招收硕士|principal investigator|group leader)/iu;
const nonPersonRosterNames = new Set([
  "学院简介", "历史沿革", "现任领导", "组织机构", "联系我们", "计科映像", "高层次人才", "专任教师",
  "实验技术人员", "荣休教师", "本科生教育", "研究生教育", "留学生教育", "国际交流", "科研进展",
  "学术交流", "项目申报", "研究平台", "党建工作", "纪检工作", "工会工作", "共青团工作", "学习资料",
  "师资岗位招聘", "博士后招聘", "非编人员招聘", "杰出校友", "校友动态", "校友库", "规章制度",
  "办事流程", "常用下载",
]);

function cleanHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/giu, " ")
    .replace(/<style[\s\S]*?<\/style>/giu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/&nbsp;|&#160;|&ensp;|&emsp;/giu, " ")
    .replace(/&amp;/giu, "&")
    .replace(/&lt;/giu, "<")
    .replace(/&gt;/giu, ">")
    .replace(/&quot;/giu, "\"")
    .replace(/\s+/gu, " ")
    .trim();
}

function cachedProfile(url) {
  if (!/^https?:/iu.test(url ?? "")) return "";
  const cacheKey = crypto.createHash("sha1").update(url).digest("hex");
  const cachePath = path.join(cacheDir, `${cacheKey}.html`);
  return fs.existsSync(cachePath) ? cleanHtml(fs.readFileSync(cachePath, "utf8")) : "";
}

function normalizeName(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLocaleLowerCase("en-US")
    .replace(/\b(prof(?:essor)?|dr|mr|ms|associate|assistant|chair)\b\.?/giu, "")
    .replace(/[·•，,()（）\-_.\s]/gu, "");
}

function relevantProfileText(text) {
  if (!text) return "";
  const markers = ["研究方向", "研究领域", "研究兴趣", "Research Interests", "Research Area", "个人简介", "Biography", "教育背景", "招生信息"];
  const sections = [];
  for (const marker of markers) {
    let from = 0;
    while (true) {
      const index = text.toLocaleLowerCase("en-US").indexOf(marker.toLocaleLowerCase("en-US"), from);
      if (index < 0) break;
      sections.push(text.slice(index, index + 1800));
      from = index + marker.length;
    }
  }
  return sections.join(" ");
}

function excerpt(text, pattern, radius = 180) {
  const match = pattern.exec(text);
  if (!match) return "";
  const start = Math.max(0, match.index - 70);
  return text.slice(start, Math.min(text.length, match.index + match[0].length + radius)).replace(/\s+/gu, " ").trim();
}

const atlasPeople = JSON.parse(fs.readFileSync("/private/tmp/atlas-people.json", "utf8"));
const atlasByName = new Map();
const atlasByUrl = new Map();
for (const person of atlasPeople) {
  for (const name of [person.name, person.chinese]) {
    if (!name) continue;
    const key = normalizeName(name);
    if (!atlasByName.has(key)) atlasByName.set(key, []);
    atlasByName.get(key).push(person);
  }
  for (const url of [person.profile, ...(person.sources ?? [])]) {
    if (url) atlasByUrl.set(url.replace(/\/$/u, ""), person);
  }
}

function existingAtlasPerson(unit, person) {
  const directUrl = atlasByUrl.get(String(person.profileUrl ?? "").replace(/\/$/u, ""));
  if (directUrl) return directUrl;
  const matches = atlasByName.get(normalizeName(person.name)) ?? [];
  if (matches.length !== 1) return undefined;
  const [candidate] = matches;
  return unit.atlasAliases.some((alias) => candidate.id.includes(alias)) ? candidate : undefined;
}

function ownProfileText(name, profileText) {
  if (!profileText) return "";
  const normalizedName = String(name ?? "").replace(/\s+/gu, " ").trim();
  const candidates = [normalizedName, normalizedName.split(/[·•，,]/u)[0]?.trim()].filter(Boolean);
  for (const candidate of candidates) {
    const index = profileText.toLocaleLowerCase("en-US").indexOf(candidate.toLocaleLowerCase("en-US"));
    if (index >= 0) return profileText.slice(Math.max(0, index - 250), index + candidate.length + 1800);
  }
  return profileText.slice(0, 1200);
}

function structuredText(person) {
  return [
    person.title,
    person.section,
    person.officialSection,
    ...(person.officialSections ?? []),
    ...(person.sections ?? []),
    person.affiliation,
    person.researchArea,
    person.researchAreas,
    person.researchDirections,
    person.keywords,
    person.rawText,
    person.educationAndHonors,
    person.officialFields && JSON.stringify(person.officialFields),
  ].filter(Boolean).join(" | ");
}

function classify(unit, roster, person) {
  const profileText = cachedProfile(person.profileUrl);
  const structured = structuredText(person);
  const ownProfile = ownProfileText(person.name, profileText);
  const statusText = `${structured} ${ownProfile}`;
  const relevant = `${structured} ${relevantProfileText(profileText)}`
    .replaceAll(unit.unitName, "")
    .replaceAll("人工智能学院", "")
    .replaceAll("计算机学院", "");
  const officialRosterUrl = roster.officialPageUrl ?? roster.officialDataUrl;
  const profileUrl = person.profileUrl ?? null;
  const evidenceUrl = profileText && profileUrl ? profileUrl : person.sourcePageUrl ?? officialRosterUrl;
  const base = {
    officialId: String(person.officialId ?? normalizeName(person.name)),
    name: person.name,
    title: person.title ?? null,
    officialSections: person.officialSections ?? person.sections ?? [person.officialSection ?? person.section].filter(Boolean),
    profileUrl,
    portraitUrl: person.portraitUrl ?? person.photoUrl ?? person.imageUrl ?? null,
    sourcePageUrl: person.sourcePageUrl ?? officialRosterUrl,
    officialRosterUrl,
    profileChecked: Boolean(profileText),
  };

  const existing = existingAtlasPerson(unit, person);
  if (existing) {
    return {
      ...base,
      decision: "included_existing",
      atlasPersonId: existing.id,
      reason: `图谱已有同一人物 ${existing.id}；官方名录/个人页确认其当前属于${unit.institution}${unit.unitName}。`,
      evidenceUrl,
      evidenceExcerpt: excerpt(relevant || statusText, aiPattern) || structured.slice(0, 500) || "官方名录现任教师记录",
    };
  }

  if (nonPersonRosterNames.has(String(person.name).trim())) {
    return {
      ...base,
      decision: "excluded_non_pi",
      reason: "冻结名录抓取结果中的该条目是学院导航栏目而非人物；保留记录以使冻结分母可复核，但不作为独立 PI。",
      evidenceUrl: person.sourcePageUrl ?? officialRosterUrl,
      evidenceExcerpt: `${person.name}｜${base.officialSections.join(" / ")}｜${person.title ?? "未标注职称"}`,
    };
  }

  if (historicalPattern.test(structured)) {
    return {
      ...base,
      decision: "excluded_historical",
      reason: "官方名录分组、职称或个人页明确标示为退休、荣休、名誉或历史人员，不属于现任独立 PI。",
      evidenceUrl,
      evidenceExcerpt: excerpt(statusText, historicalPattern) || structured.slice(0, 500),
    };
  }
  if (industryOnlyPattern.test(structured) && !/(教授|研究员|副教授|副研究员|博导|硕导)/u.test(structured.replace(industryOnlyPattern, ""))) {
    return {
      ...base,
      decision: "excluded_industry_only",
      reason: "官方名录将其列为产业/行业/企业导师，现有官方资料没有同时确认高校或研究机构的现任独立 PI 身份。",
      evidenceUrl,
      evidenceExcerpt: excerpt(statusText, industryOnlyPattern) || structured.slice(0, 500),
    };
  }

  const hasAdviser = adviserPattern.test(statusText);
  const highTitle = highTitlePattern.test(statusText);
  const lowTitle = lowTitlePattern.test(statusText);
  if (clearNonPiPattern.test(structured) && !highTitle && !hasAdviser) {
    return {
      ...base,
      decision: "excluded_non_pi",
      reason: "官方名录职类为行政、实验技术、工程、科研助理、博士后或学生，且个人页未显示独立招生或研究组负责人资格。",
      evidenceUrl,
      evidenceExcerpt: excerpt(statusText, clearNonPiPattern) || structured.slice(0, 500),
    };
  }
  if (lowTitle && !highTitle && !hasAdviser) {
    return {
      ...base,
      decision: "excluded_non_pi",
      reason: "官方职称为讲师、助理研究员、工程师或同等级非独立岗位，个人页未显示博士/硕士导师或独立招生资格。",
      evidenceUrl,
      evidenceExcerpt: excerpt(statusText, lowTitlePattern) || structured.slice(0, 500),
    };
  }

  const inScope = aiPattern.test(relevant)
    || (unit.aiUnit && /(人工智能|智能信息|智能科学|科学智能|社会智能|核心技术|数据科学|机器人)/iu.test(structured));
  if (inScope && (highTitle || hasAdviser)) {
    return {
      ...base,
      decision: "include_new_pi",
      reason: unit.aiUnit
        ? `官方${unit.unitName}名录和个人页确认其为教授、副教授、研究员或可独立招生导师；该单位研究主线属于 AI、数据科学及相关智能计算范围。`
        : "官方个人页的研究方向命中 AI/NLP/CV/ML、数据智能、机器人或紧密相关方向，并确认教授/研究员或独立招生资格。",
      evidenceUrl,
      evidenceExcerpt: excerpt(relevant, aiPattern) || excerpt(statusText, highTitlePattern) || structured.slice(0, 500),
    };
  }
  if (!inScope && profileText) {
    return {
      ...base,
      decision: "excluded_non_ai_cs",
      reason: "已检查官方个人页及名录字段，公开研究主线未显示 AI、NLP、CV、ML、数据智能、机器人或本图谱紧密相邻方向。",
      evidenceUrl,
      evidenceExcerpt: relevantProfileText(profileText).slice(0, 500) || structured.slice(0, 500) || profileText.slice(0, 500),
    };
  }
  return {
    ...base,
    decision: "excluded_insufficient_scope_evidence",
    reason: profileUrl
      ? inScope
        ? "官方资料能确认相关研究方向，但可访问页面不足以证明其现任独立 PI 或招生资格；本轮按证据门槛不纳入，而非推断为非 PI。"
        : "官方名录提供个人页，但页面无法解析出足够的研究方向与独立 PI 证据；本轮按证据门槛不纳入，而非推断为非 AI/CS 或非 PI。"
      : inScope
        ? "官方名录能确认相关院系或研究方向，但缺少个人页及独立招生证据；本轮按证据门槛不纳入，而非推断为非 PI。"
        : "官方名录仅有姓名或职类，缺少个人页、研究方向和独立招生证据；本轮按证据门槛不纳入，而非推断人物身份。",
    evidenceUrl,
    evidenceExcerpt: excerpt(relevant, aiPattern) || structured.slice(0, 500) || "官方名录记录；个人资料不足",
  };
}

fs.mkdirSync(outputDir, { recursive: true });
const summaryUnits = {};
const all = [];
for (const unit of units) {
  const rosterPath = path.join(root, "data/official-rosters", unit.roster);
  const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));
  const decisions = roster.people.map((person) => classify(unit, roster, person));
  if (decisions.length !== roster.officialRosterCount) throw new Error(`${unit.unitId}: roster count mismatch`);
  if (decisions.some((decision) => !validDecisions.has(decision.decision))) throw new Error(`${unit.unitId}: invalid decision`);
  const counts = Object.fromEntries([...validDecisions].map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]));
  const document = {
    schemaVersion: 1,
    region: "Mainland China",
    rank: unit.rank,
    institution: unit.institution,
    unitId: unit.unitId,
    unitName: unit.unitName,
    snapshotAt: roster.fetchedAt ?? "2026-09-02",
    reviewedAt: checkedAt,
    rosterArtifact: `data/official-rosters/${unit.roster}`,
    officialRosterUrl: roster.officialPageUrl ?? roster.officialDataUrl,
    officialRosterCount: roster.officialRosterCount,
    decisionCount: decisions.length,
    counts,
    decisions,
  };
  const outputPath = path.join(outputDir, `${unit.unitId}.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(document, null, 2)}\n`);
  summaryUnits[unit.unitId] = {
    rank: unit.rank,
    institution: unit.institution,
    unitName: unit.unitName,
    officialRosterCount: roster.officialRosterCount,
    decisionCount: decisions.length,
    counts,
    outputPath: path.relative(root, outputPath),
  };
  all.push(...decisions.map((decision) => ({ unitId: unit.unitId, ...decision })));
}

const batchCount = all.length;
const priorCompletedCount = 493;
const frozenRank11To20Count = priorCompletedCount + batchCount;
if (batchCount !== 1666 || frozenRank11To20Count !== 2159) throw new Error(`unexpected totals ${batchCount}/${frozenRank11To20Count}`);
const totalsByDecision = Object.fromEntries([...validDecisions].map((decision) => [decision, all.filter((row) => row.decision === decision).length]));
const summary = {
  schemaVersion: 1,
  region: "Mainland China",
  scope: "Top-school audit ranks 11–20 (Wuhan University through Nankai University)",
  reviewedAt: checkedAt,
  frozenOfficialRosterCount: frozenRank11To20Count,
  previouslyDecidedCount: priorCompletedCount,
  previousDecisionSources: [
    "data/roster-decisions/hust-cs-2026-09-02.json",
    "data/roster-decisions/hust-aia-2026-09-02.json",
    "data/roster-decisions/hust-sse-2026-09-02.json",
    "data/roster-decisions/nankai-cs-2026-09-02.json",
    "data/roster-decisions/nankai-ai-2026-09-02.json",
  ],
  batchDecisionCount: batchCount,
  totalsByDecision,
  pendingCount: totalsByDecision.pending_profile_verification,
  remainingUncheckedCount: 0,
  units: summaryUnits,
};
fs.writeFileSync(path.join(outputDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
