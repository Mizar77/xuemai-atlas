import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const snapshotAt = "2026-09-02";
const profileCache = "/private/tmp/europe-b-us-profiles";
const outputDir = path.join(root, "data/roster-decisions");
const evidenceArtifactPath = path.join(outputDir, "europe-b-us-profile-evidence-2026-09-02.json");
let capturedEvidence = fs.existsSync(evidenceArtifactPath)
  ? JSON.parse(fs.readFileSync(evidenceArtifactPath, "utf8"))
  : null;

const units = [
  ["nyu-cds", "data/official-rosters/nyu-cds-all-faculty-2026-09-02.json"],
  ["aalto-cs", "data/official-rosters/aalto-computer-science-faculty-2026-09-02.json"],
  ["aalto-ml-ds-ai", "data/official-rosters/aalto-machine-learning-data-science-ai-2026-09-02.json"],
  ["sapienza-diag", "data/official-rosters/sapienza-diag-docenti-2026-09-02.json"],
  ["manchester-cs", "data/official-rosters/manchester-computer-science-academic-research-staff-2026-09-02.json"],
  ["kit-informatics", "data/official-rosters/kit-informatics-research-group-leaders-2026-09-02.json"],
  ["kit-cvhci", "data/official-rosters/kit-cvhci-all-people-2026-09-02.json"],
  ["tudelft-eemcs", "data/official-rosters/tudelft-eemcs-professors-2026-09-02.json"],
];

const allowedDecisions = new Set([
  "included_existing",
  "include_new_pi",
  "excluded_non_ai_cs",
  "excluded_non_pi",
  "excluded_historical",
  "excluded_industry_only",
  "excluded_duplicate",
  "pending_profile_verification",
]);

const aiPattern = /(artificial intelligence|machine learning|deep learning|foundation model|large language model|natural language|computational linguistics|knowledge graph|computer vision|image processing|visual recognition|pattern recognition|data mining|data science|recommender|reinforcement learning|graph neural|generative model|multimodal|robotics?|autonomous systems?|speech recognition|speech processing|computational biology|bioinformatics|human.computer interaction|computer graphics|visuali[sz]ation|medical imaging|neural network|intelligenza artificiale|apprendimento automatico|visione artificiale|elaborazione del linguaggio|reti neurali|robotica|intelligent systems?|intelligent process|intelligent robot|artificial intelligence and secuity)/i;
const blockedPagePattern = /(access denied|forbidden|captcha|cloudflare|enable javascript|page not found|not found|error 404|robot check)/i;

const aaltoAiProfessors = new Set([
  "Qi Chen", "Francesco Croce", "Stephane Deny", "Azade Farshad", "Vikas Kumar Garg",
  "Christian Guckelsberger", "Perttu Hämäläinen", "Alex Jung", "Juho Kannala", "Samuel Kaski",
  "Juhi Kulshrestha", "Jouko Lampinen", "Jaakko Lehtinen", "Harri Lähdesmäki", "Pekka Marttinen",
  "Jussi Rintanen", "Juho Rousu", "Arno Solin", "Aki Vehtari", "Johanna Viitanen",
  "Robin Welsch", "Deepika Yadav", "Bo Zhao",
]);

const tudelftAiOutsideIntelligentSystems = new Set([
  "Prof.dr.ir. J.A. La Poutré", "Prof.dr. A. Webb", "Prof.dr. P.A.N. Bosman",
  "Prof.dr.ir. A.Bozzon", "Prof.dr.ir. G.J.P.M. Houben", "Peter Stuckey",
  "Prof.dr. M.M. de Weerdt",
]);

function cleanHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;|&ensp;|&emsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function rawCachedProfile(url) {
  if (!url || !/^https?:/i.test(url)) return "";
  const key = crypto.createHash("sha1").update(url).digest("hex");
  const file = path.join(profileCache, `${key}.html`);
  if (!fs.existsSync(file) || fs.statSync(file).size < 1000) return "";
  const text = cleanHtml(fs.readFileSync(file, "utf8"));
  return blockedPagePattern.test(text.slice(0, 1000)) ? "" : text;
}

function cachedProfile(url) {
  if (capturedEvidence?.profiles?.[url]) return capturedEvidence.profiles[url].classificationText || "";
  return rawCachedProfile(url);
}

function normalizeName(value) {
  let name = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u200b|\u200c|\u200d|\ufeff/g, "")
    .replace(/\b(?:Prof(?:essor)?|Dr|Ing|Jun|apl|T\.?-?T\.?)\b\.?/gi, " ")
    .replace(/\bKIT Distinguished Senior Fellow\b/gi, " ")
    .replace(/[†*]/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .trim();
  if (name.includes(",")) {
    const [last, ...rest] = name.split(",");
    name = `${rest.join(" ")} ${last}`;
  }
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function atlasPeople() {
  const byName = new Map();
  for (const file of fs.readdirSync(path.join(root, "app")).filter((name) => name.endsWith(".ts"))) {
    const source = ts.createSourceFile(file, fs.readFileSync(path.join(root, "app", file), "utf8"), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isObjectLiteralExpression(node)) {
        let id;
        let name;
        for (const property of node.properties) {
          if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) continue;
          if (property.name.text === "id" && ts.isStringLiteralLike(property.initializer)) id = property.initializer.text;
          if (property.name.text === "name" && ts.isStringLiteralLike(property.initializer)) name = property.initializer.text;
        }
        if (id && name) byName.set(normalizeName(name), { id, name });
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  return byName;
}

const existingByName = atlasPeople();

function evidenceClip(text, pattern = aiPattern, radius = 190) {
  const match = pattern.exec(text);
  if (!match) return "";
  return text.slice(Math.max(0, match.index - 80), Math.min(text.length, match.index + match[0].length + radius));
}

function researchFieldText(text) {
  if (!text) return "";
  const markers = [
    /research interests?/gi,
    /research areas?/gi,
    /research topics?/gi,
    /interessi di ricerca/gi,
    /keywords?/gi,
    /membro di/gi,
    /member of/gi,
  ];
  const pieces = [];
  for (const marker of markers) {
    for (const match of text.matchAll(marker)) {
      const raw = text.slice(match.index, match.index + 800);
      pieces.push(raw.split(/Ultime pubblicazioni|Latest publications|Awards|© Università|TEACHING|EDUCATION/i)[0]);
    }
  }
  return pieces.join(" ");
}

function captureEvidenceArtifact() {
  const urls = new Set();
  for (const [, rosterArtifact] of units) {
    const artifact = JSON.parse(fs.readFileSync(path.join(root, rosterArtifact), "utf8"));
    for (const person of artifact.people) if (person.profileUrl && /^https?:/i.test(person.profileUrl)) urls.add(person.profileUrl);
  }
  const profiles = {};
  for (const url of [...urls].sort()) {
    const text = rawCachedProfile(url);
    const researchText = researchFieldText(text);
    profiles[url] = {
      available: Boolean(text),
      textSha256: text ? crypto.createHash("sha256").update(text).digest("hex") : null,
      classificationText: text ? [text.slice(0, 500), researchText].filter(Boolean).join(" ").slice(0, 12000) : "",
    };
  }
  capturedEvidence = { schemaVersion: 1, snapshotAt, source: "Official profile pages downloaded from URLs frozen in the eight roster artifacts", profileCount: urls.size, availableProfileCount: Object.values(profiles).filter((row) => row.available).length, profiles };
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(evidenceArtifactPath, `${JSON.stringify(capturedEvidence, null, 2)}\n`);
}

function findExisting(unitId, person) {
  const exact = existingByName.get(normalizeName(person.name));
  if (exact) return exact;
  if (unitId === "sapienza-diag") {
    const tokens = person.name.trim().split(/\s+/);
    const rotated = [...tokens.slice(1), tokens[0]].join(" ");
    const match = existingByName.get(normalizeName(rotated));
    if (match) return match;
  }
  if (unitId === "tudelft-eemcs" && person.name === "Prof. dr. F.A.Oliehoek") return { id: "frans-oliehoek-tudelft", name: "Frans A. Oliehoek" };
  return undefined;
}

function baseRow(person, artifact) {
  return {
    officialId: person.officialId,
    name: person.name,
    profileUrl: person.profileUrl || null,
    title: person.title || null,
    section: person.section || person.category || (person.categories || []).join(" | ") || null,
    sourcePageUrl: person.sourcePageUrl || person.sourceUrl || artifact.officialPageUrl || artifact.officialDataUrl || artifact.officialDataUrls?.[0] || null,
  };
}

function result(base, decision, reason, evidence, extra = {}) {
  if (!allowedDecisions.has(decision)) throw new Error(`invalid decision ${decision}`);
  return { ...base, decision, reason, evidence: String(evidence || base.sourcePageUrl || base.officialId).slice(0, 900), ...extra };
}

function activeAiDecision(base, text, relevant, existing, reasonPrefix = "官方个人页") {
  if (existing) return result(base, "included_existing", "同名现任范围内 PI 已在图谱中。", evidenceClip(text) || base.profileUrl, { atlasPersonId: existing.id });
  if (!relevant) {
    if (!text) return result(base, "pending_profile_verification", "官方名录缺少研究方向，个人页也未成功读取，无法核验是否属于范围内 AI/CS 主线。", base.sourcePageUrl);
    return result(base, "excluded_non_ai_cs", "官方个人页未显示属于 AI、NLP、CV、ML、机器人、HCI 或数据科学主线的研究方向。", evidenceClip(text, /(research|interessi di ricerca|membro di)/i) || text.slice(0, 500));
  }
  return result(base, "include_new_pi", `${reasonPrefix}显示现任独立教师身份及范围内研究方向。`, evidenceClip(text) || [base.title, base.section].filter(Boolean).join("；"));
}

function classify(unitId, person, artifact, seen) {
  const base = baseRow(person, artifact);
  const text = cachedProfile(person.profileUrl);
  const normalized = normalizeName(person.name);
  const existing = findExisting(unitId, person);
  const categories = (person.categories || [person.category, person.section]).filter(Boolean).join(" | ");
  const structuralText = [person.title, person.area, person.domain, categories, ...(person.researchGroups || [])].filter(Boolean).join(" | ");
  const seenAt = seen.get(normalized);

  if (seenAt) return result(base, "excluded_duplicate", `同一人物已在本批次的 ${seenAt} 官方名录中逐人处理。`, normalized);

  if (unitId === "nyu-cds") {
    if (/Faculty Fellows/i.test(categories)) return result(base, "excluded_non_pi", "NYU CDS 官方栏目为 Faculty Fellow，不是独立 faculty/PI 名额。", categories);
    if (/Adjunct|Clinical|Visiting/i.test(categories)) return result(base, "excluded_non_pi", "NYU CDS 官方栏目为 adjunct、clinical 或 visiting，未作为本单位现任独立 PI 纳入。", categories);
    const coreCdsFaculty = /Joint Faculty|Associated Faculty/i.test(categories);
    const relevant = coreCdsFaculty || aiPattern.test(researchFieldText(text));
    seen.set(normalized, unitId);
    return activeAiDecision(base, text, relevant, existing, coreCdsFaculty ? "NYU CDS 官方 Joint/Associated Faculty 栏目" : "官方个人页");
  }

  if (unitId === "aalto-cs") {
    if (/Emeriti|Alumni/i.test(categories)) return result(base, "excluded_historical", "Aalto 官方栏目为 Emeriti 或 Alumni，不是当前院系 PI。", categories);
    if (/Affiliated professors/i.test(categories)) return result(base, "excluded_non_pi", "Aalto 官方栏目为 affiliated professor，未作为该院系当前核心独立 PI 纳入。", categories);
    const relevant = aaltoAiProfessors.has(person.name) || aiPattern.test(researchFieldText(text));
    if (/Lecturers/i.test(categories)) {
      seen.set(normalized, unitId);
      return relevant
        ? result(base, "excluded_non_pi", "研究方向与 AI/数据科学相关，但官方栏目为 Lecturer，现有证据不足以确认独立 PI/招生资格。", evidenceClip(text) || categories)
        : result(base, "excluded_non_ai_cs", "官方 Lecturer 个人页未显示本图谱范围内研究主线。", evidenceClip(text, /research/i) || categories);
    }
    seen.set(normalized, unitId);
    return activeAiDecision(base, text, relevant, existing);
  }

  if (unitId === "aalto-ml-ds-ai") {
    if (seenAt) return result(base, "excluded_duplicate", `同一人物已在本批次的 ${seenAt} 官方名录中逐人处理。`, normalized);
    seen.set(normalized, unitId);
    return activeAiDecision(base, text, true, existing, "Aalto ML/DS/AI 官方 Faculty 名录");
  }

  if (unitId === "sapienza-diag") {
    if (/emerito|onorario|Ambassador/i.test(person.title || "")) return result(base, "excluded_historical", "Sapienza 官方职称为 emeritus、honorary 或 Ambassador，不是当前独立 PI。", person.title);
    const relevant = aiPattern.test(researchFieldText(text));
    seen.set(normalized, unitId);
    return activeAiDecision(base, text, relevant, existing);
  }

  if (unitId === "manchester-cs") {
    if (/Emeritus and honorary/i.test(categories) || /Emeritus|Honorary/i.test(person.title || "")) return result(base, "excluded_historical", "Manchester 官方栏目/职称为 emeritus 或 honorary。", `${categories}；${person.title}`);
    const relevantArea = /(Machine learning and robotics|Natural language processing and text mining|Neuromorphic systems|Human computer systems|Autonomy and verification|Robotics, Control, Communications & AI)/i.test(person.area || "");
    const relevant = relevantArea || aiPattern.test(person.title || "");
    seen.set(normalized, unitId);
    if (!relevant) return result(base, "excluded_non_ai_cs", "Manchester 官方研究领域栏目未显示属于 AI、NLP、CV、ML、机器人、HCI 或数据科学主线。", `${person.area || "未列领域"}；${person.title || "未列职称"}`);
    return activeAiDecision(base, text, true, existing, relevantArea ? "Manchester 官方研究领域栏目" : "Manchester 官方职称");
  }

  if (unitId === "kit-informatics") {
    if (/Emeriti and retired/i.test(categories)) return result(base, "excluded_historical", "KIT 官方栏目为 Emeriti and retired Professors。", categories);
    if (/Affiliated Professors/i.test(categories)) return result(base, "excluded_non_pi", "KIT 官方栏目为 Affiliated Professors，未作为该院系当前核心 PI 纳入。", categories);
    const relevant = aiPattern.test(structuralText);
    seen.set(normalized, unitId);
    if (!relevant) return result(base, "excluded_non_ai_cs", "KIT 官方研究组名称未显示属于本图谱 AI/ML/CV/机器人/HCI/数据科学主线。", structuralText);
    return activeAiDecision(base, text, true, existing, "KIT 官方研究组名称");
  }

  if (unitId === "kit-cvhci") {
    if (/Alumni/i.test(categories)) return result(base, "excluded_historical", "cv:hci 官方栏目为 Alumni，不是当前实验室 PI。", categories);
    if (/Secretary|Academic Staff|External Ph\.D\. Students/i.test(categories)) return result(base, "excluded_non_pi", "cv:hci 官方栏目为行政人员、学术员工或外部博士生，而非独立 PI。", categories);
    seen.set(normalized, unitId);
    return activeAiDecision(base, text, true, existing, "cv:hci 官方 Director 栏目");
  }

  if (unitId === "tudelft-eemcs") {
    const relevant = person.section === "Intelligent Systems" || tudelftAiOutsideIntelligentSystems.has(person.name);
    seen.set(normalized, unitId);
    if (!relevant) return result(base, "excluded_non_ai_cs", "TU Delft 官方教授名录分组不属于 Intelligent Systems，且未见范围内 AI/ML/CV/机器人/数据科学主线证据。", `${person.domain}；${person.section}`);
    return activeAiDecision(base, text, true, existing, "TU Delft 官方教授名录与院系分组");
  }

  throw new Error(`unhandled unit ${unitId}`);
}

if (process.argv.includes("--capture-evidence") || !capturedEvidence) captureEvidenceArtifact();
fs.mkdirSync(outputDir, { recursive: true });
const seen = new Map();
const unitSummary = {};
const allDecisions = [];

for (const [unitId, rosterArtifact] of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, rosterArtifact), "utf8"));
  const decisions = artifact.people.map((person) => classify(unitId, person, artifact, seen));
  if (decisions.length !== artifact.officialRosterCount) throw new Error(`${unitId}: ${decisions.length} != ${artifact.officialRosterCount}`);
  if (new Set(decisions.map((row) => row.officialId)).size !== decisions.length) throw new Error(`${unitId}: duplicate officialId in decisions`);
  const counts = Object.fromEntries([...allowedDecisions].map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]).filter(([, count]) => count));
  const outputPath = path.join(outputDir, `${unitId}-2026-09-02.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify({ schemaVersion: 1, unitId, snapshotAt, rosterArtifact, officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, decisions }, null, 2)}\n`);
  unitSummary[unitId] = { officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, outputPath: path.relative(root, outputPath) };
  allDecisions.push(...decisions.map((row) => ({ unitId, ...row })));
}

if (allDecisions.length !== 721) throw new Error(`expected 721 total decisions; got ${allDecisions.length}`);
const totalsByDecision = Object.fromEntries([...allowedDecisions].map((decision) => [decision, allDecisions.filter((row) => row.decision === decision).length]).filter(([, count]) => count));
const includeNewPi = allDecisions.filter((row) => row.decision === "include_new_pi").map(({ unitId, officialId, name, profileUrl, title, section, evidence }) => ({ unitId, officialId, name, profileUrl, title, section, evidence }));
const summary = {
  schemaVersion: 1,
  snapshotAt,
  scope: "NYU CDS; Aalto CS and ML/DS/AI; Sapienza DIAG; Manchester CS; KIT Informatics and cv:hci; TU Delft EEMCS",
  decisionPolicy: "Current independent PI or independently recruiting faculty in AI/NLP/CV/ML/robotics/data science and closely related HCI/graphics/intelligent perception and decision fields. Affiliated, adjunct, visitor, student, postdoc, administrative, emeritus and alumni entries are not treated as core PI without explicit evidence.",
  officialRosterTotal: 721,
  decisionTotal: allDecisions.length,
  totalsByDecision,
  units: unitSummary,
  includeNewPiCount: includeNewPi.length,
  includeNewPi,
};
fs.writeFileSync(path.join(outputDir, "europe-b-us-summary-2026-09-02.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ decisionTotal: allDecisions.length, totalsByDecision, units: unitSummary, includeNewPiCount: includeNewPi.length }, null, 2));
