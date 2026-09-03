import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const snapshotDate = "2026-09-02";
const root = process.cwd();
const cacheDir = "/private/tmp/asia-roster-profiles";
const outputDir = path.join(root, "data/roster-decisions");

const units = [
  ["hust-cs", "data/official-rosters/hust-cs-alphabetical-faculty-2026-09-02.json"],
  ["hust-aia", "data/official-rosters/hust-aia-department-faculty-2026-09-02.json"],
  ["hust-sse", "data/official-rosters/hust-sse-full-time-faculty-2026-09-02.json"],
  ["nankai-cs", "data/official-rosters/nankai-cs-full-faculty-2026-09-02.json"],
  ["nankai-ai", "data/official-rosters/nankai-ai-full-faculty-2026-09-02.json"],
];

const existingByUnitAndName = new Map([
  ["hust-sse\u0000白翔", "xiang-bai-hust"],
  ["nankai-cs\u0000程明明", "mingming-cheng-top"],
]);

const nonPersonNames = new Set(["华中科技大学", "中国计算机学会", "院内科研机构"]);

// The atlas scope is AI/NLP/CV/ML/robotics/data-mining and closely related
// intelligent perception/decision/graphics fields, not every CS discipline.
const aiPattern = /(人工智能|\bAI\b|机器学习|深度学习|大模型|基础模型|语言模型|自然语言|知识图谱|计算机视觉|机器视觉|图像|视频|视觉|多媒体|模式识别|机器人|智能控制|智能计算|智能优化|智能感知|自主系统|自动驾驶|无人驾驶|无人机|无人系统|具身|强化学习|数据挖掘|推荐系统|神经网络|进化计算|群体智能|多智能体|博弈智能|生成模型|生成式|语音|声学|生物信息|医学影像|医学图像|数字孪生|人机交互|计算机图形|图形学|可视化|三维重建|SLAM|智能诊疗|智能医疗|脑机|认知计算|情感计算|智能科学|AI for Science|智能算法|智能决策|智能信息处理|智能信号处理|智能网络|智能系统|智能装备|智能检测|目标检测|目标识别|目标跟踪|图学习|联邦学习|迁移学习|表示学习|计算智能|artificial intelligence|machine learning|deep learning|large language model|foundation model|natural language|knowledge graph|computer vision|image processing|pattern recognition|data mining|recommender system|reinforcement learning|graph neural|generative model|multimodal|robotics?|autonomous system|speech recognition|computational linguistics|computer graphics|visualization)/i;
const historicalPattern = /(已故|逝世|荣休|退休教师|名誉退休|emeritus)/i;
const explicitInactivePattern = /(在职信息\s*[：:]?\s*(?:退休|离职)|于\s*\d{4}[^。]{0,30}逝世)/i;
const highTitlePattern = /(教授|研究员|副教授|副研究员|助理教授|特聘研究员|associate professor|assistant professor|professor|researcher)/i;
const lowTitlePattern = /(中级|讲师|助教|助理研究员|实验师|工程师|博士后|postdoc|student)/i;
const adviserPattern = /(博士生导师|博士导师|硕士生导师|硕士导师|博导|硕导|招收博士|招收硕士|招生专业)/i;

function cleanHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;|&ensp;|&emsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function cachedProfile(url) {
  if (!url || !/^https?:/i.test(url)) return "";
  const key = crypto.createHash("sha1").update(url).digest("hex");
  const file = path.join(cacheDir, `${key}.html`);
  return fs.existsSync(file) ? cleanHtml(fs.readFileSync(file, "utf8")) : "";
}

function clip(text, pattern, radius = 110) {
  const match = pattern.exec(text);
  if (!match) return "";
  const start = Math.max(0, match.index - 20);
  return text.slice(start, Math.min(text.length, match.index + match[0].length + radius));
}

function relevantProfileText(text) {
  if (!text) return "";
  const segments = [];
  // Avoid navigation labels such as "研究方向 Research Focus" / "研究领域".
  // Those occur on every university-profile template and, at AIA, would make
  // the college name itself a false AI keyword hit. Only retain explicit
  // profile fields and the actual personal-profile body.
  for (const marker of ["研究方向：", "研究方向:", "主要研究方向", "研究领域为", "个人简介 Personal Profile", "个人简介：", "个人简介:"]) {
    let from = 0;
    while (true) {
      const index = text.indexOf(marker, from);
      if (index < 0) break;
      segments.push(text.slice(index, index + 1200));
      from = index + marker.length;
    }
  }
  return segments.join(" ");
}

function classify(unitId, person, seenOfficialIds) {
  const text = cachedProfile(person.profileUrl);
  const sanitizedProfile = text
    .replaceAll("人工智能与自动化学院", "")
    .replaceAll("计算机科学与技术学院", "")
    .replaceAll("软件学院", "");
  // HUST's faculty-platform pages frequently expose the research summary only
  // in free-form biography text. After removing organizational names that
  // would otherwise create keyword false positives, the full official profile
  // is the best available field. Nankai exposes a structured research field.
  const relevant = [
    person.researchDirections || "",
    unitId.startsWith("hust-") ? sanitizedProfile : relevantProfileText(text),
  ].join(" ");
  const titleEvidence = [person.title || "", clip(text, /(博士生导师|硕士生导师|职称\s*[：:]?\s*[^ ]{1,12}|华中科技大学(?:教授|副教授|讲师)|南开大学(?:教授|副教授|讲师))/i, 80)].filter(Boolean).join("；");
  const researchEvidence = person.researchDirections || clip(relevant, aiPattern, 180) || clip(relevant, /研究方向/i, 180);
  const base = {
    officialId: person.officialId,
    name: person.name,
    profileUrl: person.profileUrl || null,
    title: person.title || null,
    section: person.section || null,
    sourcePageUrl: person.sourcePageUrl,
  };

  if (seenOfficialIds.has(person.officialId)) {
    return { ...base, decision: "excluded_duplicate", reason: `同一 officialId 已在 ${seenOfficialIds.get(person.officialId)} 出现。`, evidence: person.officialId };
  }
  seenOfficialIds.set(person.officialId, unitId);

  if (nonPersonNames.has(person.name)) {
    return { ...base, decision: "excluded_non_pi", reason: "官方目录抓取中的机构/导航链接，不是自然人。", evidence: person.profileUrl || person.name };
  }
  const rosterStatusText = [person.section || "", person.title || ""].join(" ");
  if (historicalPattern.test(rosterStatusText) || explicitInactivePattern.test(sanitizedProfile)) {
    return { ...base, decision: "excluded_historical", reason: "官方页面显示为退休、荣休或历史人物。", evidence: clip(`${rosterStatusText} ${sanitizedProfile}`, explicitInactivePattern, 100) || rosterStatusText };
  }

  const existingId = existingByUnitAndName.get(`${unitId}\u0000${person.name}`);
  if (existingId) {
    return { ...base, decision: "included_existing", atlasPersonId: existingId, reason: "同一院系、同名人物已在图谱中。", evidence: titleEvidence || person.profileUrl };
  }

  const hasAi = aiPattern.test(relevant);
  const hasAdviser = adviserPattern.test(text);
  const rowTitle = person.title || "";
  const hasHighTitle = highTitlePattern.test(`${rowTitle} ${titleEvidence}`);
  const hasLowOnly = lowTitlePattern.test(`${rowTitle} ${titleEvidence}`) && !hasHighTitle;

  if (!text && !person.researchDirections) {
    return { ...base, decision: "pending_profile_verification", reason: "官方名录只有姓名，个人页缺失或未成功读取，无法核验研究方向与独立招生资格。", evidence: person.sourcePageUrl };
  }
  if (!hasAi) {
    return { ...base, decision: "excluded_non_ai_cs", reason: "官方研究方向/简介未显示属于本图谱的 AI、NLP、CV、ML、机器人或数据挖掘主线。", evidence: researchEvidence || "已检查官方个人页，未检出范围内研究方向" };
  }
  if (hasLowOnly && !hasAdviser) {
    return { ...base, decision: "excluded_non_pi", reason: "研究方向符合，但当前官方职称为讲师/中级，且个人页未显示独立研究生导师或招生资格。", evidence: titleEvidence || rowTitle };
  }
  if (!hasHighTitle && !hasAdviser) {
    return { ...base, decision: "pending_profile_verification", reason: "研究方向符合，但现有官方页面不足以确认独立 PI / 可招生教师身份。", evidence: [titleEvidence, researchEvidence].filter(Boolean).join("；") };
  }
  return {
    ...base,
    decision: "include_new_pi",
    reason: hasAdviser ? "官方个人页显示范围内研究方向，并明确博士/硕士导师或招生资格。" : "官方页面显示范围内研究方向及教授、副教授或研究员职称。",
    evidence: [titleEvidence, researchEvidence].filter(Boolean).join("；").slice(0, 700),
  };
}

fs.mkdirSync(outputDir, { recursive: true });
const seenOfficialIds = new Map();
const summary = {};
const allDecisions = [];
for (const [unitId, relativeArtifact] of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, relativeArtifact), "utf8"));
  const decisions = artifact.people.map((person) => classify(unitId, person, seenOfficialIds));
  if (decisions.length !== artifact.officialRosterCount) throw new Error(`${unitId}: decision count mismatch`);
  const counts = Object.fromEntries([...new Set(decisions.map((row) => row.decision))].sort().map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]));
  const output = {
    schemaVersion: 1,
    unitId,
    snapshotAt: snapshotDate,
    rosterArtifact: relativeArtifact,
    officialRosterCount: artifact.officialRosterCount,
    decisionCount: decisions.length,
    counts,
    decisions,
  };
  const outputPath = path.join(outputDir, `${unitId}-2026-09-02.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  allDecisions.push(...decisions.map((row) => ({ unitId, ...row })));
  summary[unitId] = { officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, outputPath: path.relative(root, outputPath) };
}

const total = Object.values(summary).reduce((sum, unit) => sum + unit.decisionCount, 0);
if (total !== 493) throw new Error(`expected 493 decisions, got ${total}`);
const totalsByDecision = Object.fromEntries(
  [...new Set(allDecisions.map((row) => row.decision))]
    .sort()
    .map((decision) => [decision, allDecisions.filter((row) => row.decision === decision).length]),
);
const includeNewPi = allDecisions
  .filter((row) => row.decision === "include_new_pi")
  .map(({ unitId, officialId, name, profileUrl, title, section, evidence }) => ({ unitId, officialId, name, profileUrl, title, section, evidence }));
const consolidated = {
  schemaVersion: 1,
  snapshotAt: snapshotDate,
  scope: "HUST CS/AIA/SSE and Nankai CS/AI official rosters",
  decisionPolicy: "Current independent PI or independently recruiting faculty in AI/NLP/CV/ML/robotics/data-mining and closely related intelligent perception/decision/graphics fields.",
  officialRosterTotal: 493,
  decisionTotal: total,
  totalsByDecision,
  units: summary,
  includeNewPiCount: includeNewPi.length,
  includeNewPi,
};
const consolidatedPath = path.join(outputDir, "asia-remaining-summary-2026-09-02.json");
fs.writeFileSync(consolidatedPath, `${JSON.stringify(consolidated, null, 2)}\n`);
console.log(JSON.stringify({ total, totalsByDecision, units: summary, consolidatedPath: path.relative(root, consolidatedPath) }, null, 2));
