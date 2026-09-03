import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const snapshotAt = "2026-09-02";
const outputDir = path.join(root, "data/roster-decisions");
const officialProfileCache = "/private/tmp/europe-a-official-profiles";
const surreyProfileCache = "/private/tmp/europe-a-surrey-profiles";

// Process the specialist Surrey centre before the broad school and institute so
// the same official profile is represented once in this batch.
const units = [
  ["tuebingen-cs", "data/official-rosters/tuebingen-cs-research-groups-2026-09-02.json"],
  ["tu-darmstadt-cs", "data/official-rosters/tu-darmstadt-cs-professors-group-leaders-2026-09-02.json"],
  ["surrey-cvssp", "data/official-rosters/surrey-cvssp-academic-emeritus-2026-09-02.json"],
  ["surrey-csee", "data/official-rosters/surrey-csee-academic-staff-2026-09-02.json"],
  ["surrey-pai", "data/official-rosters/surrey-people-centred-ai-2026-09-02.json"],
  ["copenhagen-diku", "data/official-rosters/copenhagen-diku-research-staff-2026-09-02.json"],
];

const allowedDecisions = new Set([
  "included_existing", "include_new_pi", "excluded_non_ai_cs", "excluded_non_pi",
  "excluded_historical", "excluded_industry_only", "excluded_duplicate",
  "pending_profile_verification",
]);

const existingByUnitOfficialId = new Map(Object.entries({
  "tuebingen-cs\u0000prof-michael-j-black-ph-d-honorary-prof": "michael-black-eu",
  "tuebingen-cs\u0000prof-dr-peter-dayan-phd-humboldt-professur-fur-kunstliche-intelligenz": "peter-dayan-eu",
  "tuebingen-cs\u0000prof-dr-ing-andreas-geiger": "andreas-geiger-eu",
  "tuebingen-cs\u0000prof-dr-bernhard-scholkopf-honorary-prof": "bernhard-schoelkopf-eu",
  "tu-darmstadt-cs\u0000iryna-gurevych": "iryna-gurevych-eu",
  "tu-darmstadt-cs\u0000anna-rohrbach": "anna-rohrbach-award",
  "tu-darmstadt-cs\u0000marcus-rohrbach": "marcus-rohrbach-award",
  "tu-darmstadt-cs\u0000stefan-roth-ph-d": "stefan-roth-eu",
  "surrey-cvssp\u0000adrian-hilton": "adrian-hilton-surrey",
  "surrey-cvssp\u0000josef-kittler": "josef-kittler-surrey",
  "surrey-cvssp\u0000tao-xiang": "tao-xiang-lineage",
  "surrey-csee\u0000ferrante-neri": "ferrante-neri-eduhk",
  "copenhagen-diku\u0000597320": "isabelle-augenstein-top",
}));

const aiPattern = /(artificial intelligence|\bAI\b|machine learning|deep learning|foundation model|large language model|\bLLM\b|natural language|computational linguistics|knowledge graph|computer vision|machine vision|image analysis|image processing|medical imaging|visual recognition|pattern recognition|data mining|data science|recommender|reinforcement learning|graph neural|generative model|multimodal|robotics?|robot vision|autonomous systems?|speech recognition|speech processing|machine audition|computational biology|bioinformatics|human.?computer interaction|computer graphics|visuali[sz]ation|neural network|intelligent systems?|intelligent data|cognitive computing|decision.?making|language technology)/i;
const independentRolePattern = /(full professor|associate professor|assistant professor|distinguished professor|regius professor|chair professor|\bprofessor\b|\breader\b|senior lecturer|\blecturer\b|junior professor|jun\.?-prof|surrey future fellow|independent .*group|group leader|head of .*lab|director of .*research|director of .*centre)/i;
const nonPiRolePattern = /(postdoc|postdoctoral|phd (student|fellow|researcher)|doctoral|research assistant|teaching assistant|personal assistant|professional services|programme manager|administrator|technician|secretary|guest researcher|industrial phd|external postdoc|part-time lecturer|instructor|teaching associate professor|visiting academic|vice chancellor fellow)/i;
const historicalPattern = /(emeritus|emeriti|retired|former professor|†|deceased)/i;

// Curated from the official group/profile pages downloaded for this snapshot.
// Explicit IDs avoid treating site-wide navigation or another professor's card
// as research evidence when a departmental CMS returns a directory wrapper.
const tuebingenAiIds = new Set([
  "prof-dr-philipp-berens-coopted", "prof-dr-matthias-bethge-coopted", "prof-martin-butz-ph-d",
  "prof-dr-manfred-claassen-coopted", "prof-dr-peter-dayan-phd-humboldt-professur-fur-kunstliche-intelligenz",
  "apl-prof-dr-rer-nat-britta-dorn", "jun-prof-dr-stephan-eckstein-coopted", "prof-dr-carsten-eickhoff-coopted",
  "dr-shahram-eivazi-festo-ioc", "prof-dr-michael-franke-coopted", "prof-dr-rer-nat-volker-franz",
  "prof-dr-peter-gehler-coopted", "prof-dr-ing-andreas-geiger", "prof-dr-moritz-hardt-honorary-prof",
  "prof-dr-daniel-haufle-coopted", "prof-dr-rer-nat-matthias-hein", "prof-dr-philipp-hennig",
  "prof-dr-niels-henze", "prof-dr-math-daniel-huson", "prof-dr-ing-oliver-kohlbacher", "prof-dr-mario-krenn",
  "prof-dr-hilde-kuhne-coopted", "prof-dr-ing-thomas-kustner-coopted", "prof-dr-ing-hendrik-lensch",
  "apl-prof-dr-anna-levina-martius", "prof-dr-zhaoping-li-phd", "jun-prof-dr-nicole-ludwig-coopted",
  "prof-dr-rer-nat-ulrike-von-luxburg", "prof-dr-jakob-macke", "prof-dr-georg-martius", "prof-dr-detmar-meurers",
  "prof-dr-rer-nat-sven-nahnsen", "prof-dr-math-kay-nieselt", "prof-dr-rer-nat-nico-pfeifer",
  "prof-dr-gerard-pons-moll", "prof-dr-kerstin-ritter-coopted", "jun-prof-dr-harry-scells-coopted",
  "prof-dr-bernhard-scholkopf-honorary-prof", "prof-felix-wichmann-dphil", "prof-dr-robert-c-williamson",
  "prof-dr-rer-nat-andreas-zell",
]);

const darmstadtAiIds = new Set([
  "carsten-binnig", "georgia-chalvatzaki-ph-d", "naser-damer", "roderich-gro", "iryna-gurevych",
  "kristian-kersting", "mohammad-emtiyaz-khan-ph-d", "arjan-kuijper", "dominik-l-michels", "jan-peters-ph-d",
  "christian-reuter", "anna-rohrbach", "marcus-rohrbach", "stefan-roth-ph-d", "ahmad-reza-sadeghi",
  "simone-schaub-meyer", "oskar-von-stryk", "justus-thies", "jan-gugenheimer", "florian-muller",
  "kay-hamacher", "constantin-rothkopf", "angela-yu", "simone-balloccu-ph-d", "manisha-luthra-agnihotri-ne-luthra",
]);

const technicalAiPattern = /(machine learning|deep learning|foundation model|large language model|\bLLM\b|natural language|computational linguistics|knowledge graph|computer vision|image analysis|pattern recognition|data mining|data science|recommender|reinforcement learning|graph neural|generative model|multimodal|robotics?|autonomous systems?|speech processing|signal processing|bioinformatics|human.?computer interaction|computer graphics|neural network|intelligent systems?)/i;

function cleanHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ").replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;|&ensp;|&emsp;/gi, " ").replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/\s+/g, " ").trim();
}

function profileCacheFile(unitId, person) {
  if (unitId.startsWith("surrey-")) {
    const slug = (person.profileUrl || "").split("/").filter(Boolean).at(-1);
    return slug ? path.join(surreyProfileCache, `${slug}.html`) : null;
  }
  const cacheUnit = unitId === "copenhagen-diku" ? "copenhagen" : unitId.replace(/-cs$/, "");
  return path.join(officialProfileCache, `${cacheUnit}--${person.officialId}.html`);
}

function profileText(unitId, person) {
  const file = profileCacheFile(unitId, person);
  if (!file || !fs.existsSync(file) || fs.statSync(file).size < 1000) return "";
  return cleanHtml(fs.readFileSync(file, "utf8"));
}

async function fetchProfileEvidence() {
  fs.mkdirSync(officialProfileCache, { recursive: true });
  fs.mkdirSync(surreyProfileCache, { recursive: true });
  const tasks = [];
  const targetSeen = new Set();
  for (const [unitId, rosterArtifact] of units) {
    const artifact = JSON.parse(fs.readFileSync(path.join(root, rosterArtifact), "utf8"));
    for (const person of artifact.people) {
      if (!/^https?:/i.test(person.profileUrl || "")) continue;
      if (unitId === "copenhagen-diku" && !/(Professor|Associate Professor|Assistant Professor)/i.test((person.titles || [person.title]).filter(Boolean).join(" "))) continue;
      const target = profileCacheFile(unitId, person);
      if (!target || targetSeen.has(target)) continue;
      targetSeen.add(target);
      if (fs.existsSync(target) && fs.statSync(target).size >= 1000) continue;
      tasks.push({ target, url: person.profileUrl });
    }
  }
  for (let index = 0; index < tasks.length; index += 12) {
    await Promise.all(tasks.slice(index, index + 12).map(async ({ target, url }) => {
      try {
        const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "Xuemai Atlas roster audit/2026-09-02" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
      } catch (error) {
        console.error(`profile fetch failed: ${url}: ${error.message}`);
      }
    }));
  }
}

function localContext(text, person, radius = 6500) {
  if (!text) return "";
  const candidates = [person.name, person.displayName].filter(Boolean);
  const departments = text.indexOf("Academic and research departments");
  let index = -1;
  for (const name of candidates) {
    const found = text.indexOf(name, 100);
    if (found >= 0 && (departments < 0 || found < departments) && (index < 0 || found < index)) index = found;
  }
  if (index < 0) {
    if (departments > 0) index = Math.max(0, departments - 850);
  }
  const context = index >= 0 ? text.slice(index, index + radius) : text.slice(0, radius);
  return context
    .replace(/Surrey Institute for People.?Centred Artificial Intelligence(?: \(PAI\))?/gi, " ")
    .replace(/Employees in the research sections[\s\S]*$/i, " ");
}

function leadContext(text, person) {
  const context = localContext(text, person, 1800);
  const stop = context.indexOf("Academic and research departments");
  return stop > 0 ? context.slice(0, stop) : context.slice(0, 600);
}

function evidenceClip(text, pattern = aiPattern, radius = 220) {
  const match = pattern.exec(text);
  if (!match) return text.slice(0, Math.min(420, text.length));
  return text.slice(Math.max(0, match.index - 90), Math.min(text.length, match.index + match[0].length + radius));
}

function baseRow(person, artifact) {
  return {
    officialId: person.officialId,
    name: person.name,
    profileUrl: person.profileUrl || null,
    title: person.title || null,
    section: person.officialSection || person.section || null,
    sourcePageUrl: person.source || person.sourcePageUrl || artifact.officialDataUrl || artifact.officialPageUrl || null,
  };
}

function result(base, decision, reason, evidence, extra = {}) {
  if (!allowedDecisions.has(decision)) throw new Error(`invalid decision ${decision}`);
  return { ...base, decision, reason, evidence: String(evidence || base.sourcePageUrl || base.officialId).slice(0, 1000), ...extra };
}

function activeDecision(base, existingId, evidence, reason = "官方页面显示现任独立教师/研究组负责人及范围内研究方向。") {
  return existingId
    ? result(base, "included_existing", "同一现任范围内 PI 已在图谱中。", evidence, { atlasPersonId: existingId })
    : result(base, "include_new_pi", reason, evidence);
}

function copenhagenSection(text, person) {
  const context = localContext(text, person, 700);
  const sections = ["The Artificial Intelligence Section", "Artificial Intelligence", "Machine Learning", "Pioneer AI (P1AI)", "Human-Centred Computing", "Image Analysis, Computational Modelling and Geometry", "Software, Data, People & Society", "Programming Languages and Theory of Computation", "Algorithms and Complexity"];
  return sections.find((section) => context.includes(section)) || "";
}

function classify(unitId, person, artifact, seenSurrey) {
  const base = baseRow(person, artifact);
  const text = profileText(unitId, person);
  const context = localContext(text, person);
  const lead = leadContext(text, person);
  const existingId = existingByUnitOfficialId.get(`${unitId}\u0000${person.officialId}`);

  if (unitId.startsWith("surrey-")) {
    const prior = seenSurrey.get(person.officialId);
    if (prior) return result(base, "excluded_duplicate", `同一 Surrey 官方人物已在本批次的 ${prior} 名录中处理。`, person.profileUrl || person.officialId);
  }

  if (unitId === "tuebingen-cs") {
    if (existingId) return activeDecision(base, existingId, person.profileUrl);
    if (/Andrei Lupas/i.test(person.name)) return result(base, "excluded_non_ai_cs", "官方组页所示方向为结构生物学，不属于本图谱 AI/CS 主线。", person.profileUrl);
    if (/Thomas Kropf/i.test(person.name)) return result(base, "excluded_industry_only", "该条为 honorary professor，官方链接指向 Bosch 企业研究管理履历，未作为本单位独立 PI 纳入。", person.profileUrl);
    if (/Honorary prof/i.test(person.name) && !/Moritz Hardt/i.test(person.name)) return result(base, "excluded_non_pi", "官方条目为 honorary professor，未显示该院系独立招生/PI 席位。", person.name);
    if (!tuebingenAiIds.has(person.officialId)) return result(base, "excluded_non_ai_cs", "官方研究组主题不属于本图谱 AI、ML、NLP、CV、机器人、HCI 或数据科学主线。", evidenceClip(context, /research|forschung|group/i) || person.profileUrl);
    if (!text) return result(base, "pending_profile_verification", "官方研究组名录确认负责人及范围内组别，但个人/研究组页面未成功读取。", person.profileUrl);
    return activeDecision(base, null, evidenceClip(context));
  }

  if (unitId === "tu-darmstadt-cs") {
    const section = person.officialSection || "";
    if (/Emeriti/i.test(section)) return result(base, "excluded_historical", "官方分类为 Emeriti，不是当前 PI。", section);
    if (/Honorarprofessuren/i.test(section)) return result(base, "excluded_non_pi", "官方分类为 Honorarprofessuren，未作为该院系当前独立 PI 纳入。", section);
    if (/Vertretungs- und Gastprofessuren/i.test(section)) return result(base, "excluded_non_pi", "官方分类为代理/访问教授，未作为该院系核心独立 PI 纳入。", section);
    if (/Privatdozent/i.test(section)) return result(base, "pending_profile_verification", "Privatdozent 身份未直接证明当前独立招生/PI 席位，留待个人页核验。", section);
    if (existingId) return activeDecision(base, existingId, person.profileUrl);
    if (!darmstadtAiIds.has(person.officialId)) return result(base, "excluded_non_ai_cs", "官方教授/研究组主题不属于本图谱 AI、ML、NLP、CV、机器人、HCI 或数据科学主线。", evidenceClip(context, /research|forschung|professur/i) || person.profileUrl);
    if (!text) return result(base, "pending_profile_verification", "官方目录确认当前教授/组长及范围内组别，但个人页未成功读取。", person.profileUrl);
    return activeDecision(base, null, evidenceClip(context));
  }

  if (unitId === "surrey-cvssp") {
    if (/Emeritus/i.test(person.officialSection || "") || historicalPattern.test(lead)) return result(base, "excluded_historical", "官方 CVSSP 分类或个人页显示 emeritus/retired。", person.officialSection || lead);
    if (nonPiRolePattern.test(lead) && !independentRolePattern.test(lead)) return result(base, "excluded_non_pi", "官方个人页显示 visiting/fellow/research-only 身份，未确认独立 PI 席位。", lead);
    if (existingId) {
      seenSurrey.set(person.officialId, unitId);
      return activeDecision(base, existingId, person.profileUrl);
    }
    if (!text || !independentRolePattern.test(lead)) return result(base, "pending_profile_verification", "CVSSP academic staff 名录确认当前成员，但现有个人页不足以确认独立 faculty/PI 职称。", person.profileUrl);
    seenSurrey.set(person.officialId, unitId);
    return activeDecision(base, null, lead, "CVSSP 官方 Academic staff 名录与个人页共同显示现任独立教师身份；该中心属于视觉、语音和信号处理主线。");
  }

  if (unitId === "surrey-csee") {
    if (historicalPattern.test(lead)) return result(base, "excluded_historical", "官方个人页显示 emeritus/retired。", lead);
    if (nonPiRolePattern.test(lead) && !independentRolePattern.test(lead)) return result(base, "excluded_non_pi", "官方个人页显示访问、教学、研究助理或非独立职位。", lead);
    if (!text || !independentRolePattern.test(lead)) return result(base, "pending_profile_verification", "官方 Academic staff 名录有此人，但个人页未提供足够的当前独立 PI/招生证据。", person.profileUrl);
    seenSurrey.set(person.officialId, unitId);
    if (!aiPattern.test(context)) return result(base, "excluded_non_ai_cs", "官方个人页显示当前教师身份，但研究主线不属于 AI、NLP、CV、ML、机器人、HCI 或数据科学。", evidenceClip(context, /research|areas of specialism|biography/i));
    return activeDecision(base, existingId, evidenceClip(context));
  }

  if (unitId === "surrey-pai") {
    const section = person.officialSection || "";
    if (/Professional Services/i.test(section)) return result(base, "excluded_non_pi", "官方分类为 Professional Services，不是独立 PI。", section);
    if (historicalPattern.test(lead)) return result(base, "excluded_historical", "官方个人页显示 emeritus/retired。", lead);
    if (nonPiRolePattern.test(lead) && !independentRolePattern.test(lead)) return result(base, "excluded_non_pi", "官方个人页显示访问、研究辅助或非独立职位。", lead);
    if (!text || !independentRolePattern.test(lead)) return result(base, "pending_profile_verification", "PAI 名录确认成员身份，但个人页不足以确认当前独立 faculty/PI 职位。", person.profileUrl);
    seenSurrey.set(person.officialId, unitId);
    const directAiUnit = /Leadership team|Academic staff|Surrey Future Fellows/i.test(section);
    if (!directAiUnit && !technicalAiPattern.test(context)) return result(base, "excluded_non_ai_cs", "该条是 pan-University Fellow/Associate；官方个人页未显示技术型 AI/CS 为主要研究方向。", evidenceClip(context, /research|areas of specialism|biography/i));
    return activeDecision(base, existingId, directAiUnit ? `${section}；${lead}` : evidenceClip(context));
  }

  if (unitId === "copenhagen-diku") {
    const titles = (person.titles || [person.title]).filter(Boolean).join(" | ");
    if (historicalPattern.test(titles)) return result(base, "excluded_historical", "官方职称为 emeritus。", titles);
    if (/Visiting Professor/i.test(titles)) return result(base, "excluded_non_pi", "官方职称为 Visiting Professor，不是本单位核心独立 PI。", titles);
    if (!/(^|\| )(Professor|Associate Professor(?: - Promotion Programme)?|Assistant Professor(?: - Tenure Track)?)( \||$)/i.test(titles)) return result(base, "excluded_non_pi", "官方职称为博士后、博士生、研究助理、访客、教学或其他非独立 PI 职位。", titles);
    if (!text) return result(base, "pending_profile_verification", "官方职称属于 faculty，但个人页未成功读取，无法核验研究分区。", person.profileUrl);
    const section = copenhagenSection(text, person);
    const relevant = /Artificial Intelligence|Machine Learning|Pioneer AI|Human-Centred Computing|Image Analysis/i.test(section);
    if (!relevant) return result(base, "excluded_non_ai_cs", "官方 DIKU 个人页显示研究分区不属于本批次 AI/ML/CV/HCI 主线。", section || leadContext(text, person));
    return activeDecision(base, existingId, `${titles}；${section}`, "DIKU 官方个人页显示现任 faculty 职称及 AI/ML/CV/HCI 研究分区。");
  }

  throw new Error(`unhandled unit ${unitId}`);
}

if (process.argv.includes("--fetch-profiles")) await fetchProfileEvidence();

fs.mkdirSync(outputDir, { recursive: true });
const seenSurrey = new Map();
const unitSummary = {};
const allDecisions = [];

for (const [unitId, rosterArtifact] of units) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, rosterArtifact), "utf8"));
  const decisions = artifact.people.map((person) => classify(unitId, person, artifact, seenSurrey));
  if (decisions.length !== artifact.officialRosterCount) throw new Error(`${unitId}: ${decisions.length} != ${artifact.officialRosterCount}`);
  if (new Set(decisions.map((row) => row.officialId)).size !== decisions.length) throw new Error(`${unitId}: duplicate officialId`);
  const counts = Object.fromEntries([...allowedDecisions].map((decision) => [decision, decisions.filter((row) => row.decision === decision).length]).filter(([, count]) => count));
  const outputPath = path.join(outputDir, `${unitId}-2026-09-02.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify({ schemaVersion: 1, unitId, snapshotAt, rosterArtifact, officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, decisions }, null, 2)}\n`);
  unitSummary[unitId] = { officialRosterCount: artifact.officialRosterCount, decisionCount: decisions.length, counts, outputPath: path.relative(root, outputPath) };
  allDecisions.push(...decisions.map((row) => ({ unitId, ...row })));
}

if (allDecisions.length !== 737) throw new Error(`expected 737 decisions; got ${allDecisions.length}`);
const totalsByDecision = Object.fromEntries([...allowedDecisions].map((decision) => [decision, allDecisions.filter((row) => row.decision === decision).length]).filter(([, count]) => count));
const includeNewPi = allDecisions.filter((row) => row.decision === "include_new_pi").map(({ unitId, officialId, name, profileUrl, title, section, evidence }) => ({ unitId, officialId, name, profileUrl, title, section, evidence }));
const summary = {
  schemaVersion: 1, snapshotAt,
  scope: "Tübingen CS; TU Darmstadt CS; Surrey CSEE, CVSSP and People-Centred AI; Copenhagen DIKU",
  decisionPolicy: "Current independent PI or independently recruiting faculty in AI/NLP/CV/ML/robotics/data science and closely related HCI, graphics, intelligent perception and decision fields. Visitors, students, postdocs, administrative, emeritus and research-only entries are not treated as core PI without explicit evidence.",
  officialRosterTotal: 737, decisionTotal: allDecisions.length, totalsByDecision,
  units: unitSummary, includeNewPiCount: includeNewPi.length, includeNewPi,
};
fs.writeFileSync(path.join(outputDir, "europe-a-summary-2026-09-02.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ decisionTotal: allDecisions.length, totalsByDecision, units: unitSummary, includeNewPiCount: includeNewPi.length }, null, 2));
