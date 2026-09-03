import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = path.join(root, "data/roster-decisions/us-uw-uiuc-2026-09-03");
const cache = JSON.parse(fs.readFileSync(path.join(dir, "profile-evidence-cache-2026-09-03.json"), "utf8"));
const byKey = new Map(cache.results.map((row) => [`${row.unitId}::${row.rosterName}`, row]));
const selected = new Set([
  "Alexander Schwing", "Byron Boots", "Gagandeep Singh", "Han Zhao", "Huan Zhang",
  "Ira Kemelmacher-Shlizerman", "Jiaxuan You", "Jim Rehg", "Maya Cakmak", "Natasha Jaques",
  "Pang Wei Koh", "Simon Shaolei Du", "Steven Seitz", "Su-In Lee", "Yuxiong Wang",
]);

const uwInScope = /(Artificial Intelligence|Machine Learning|Computer Vision|Generative AI|Robotics|Human-Centered AI|Data Science|Data Mining|Information Retrieval|Deep Learning|Reinforcement Learning|Computational Biology|Bioinformatics)/i;
const uiucInScope = /(Artificial Intelligence|machine learning|natural language|computer vision|deep learning|reinforcement learning|generative|robotics?|multimodal|foundation model|language model|data mining|information retrieval|human-AI|computational biology|bioinformatics)/i;
const uiucManualInScope = new Set([
  "Varun Chandrasekaran", "Katie Driggs-Campbell", "Charles L. Isbell, Jr.", "David Heath",
  "Haohan Wang", "Ilan Shomorony", "Melkior Ornik", "Tong Zhang", "Zhiyong Lu",
]);

function uiucBody(row) {
  const marker = `Home About People All Faculty ${row.rosterName}`;
  const index = row.text.lastIndexOf(marker);
  return index >= 0 ? row.text.slice(index) : row.text.slice(-6000);
}

function uiucSpecificResearch(row) {
  const body = uiucBody(row);
  const matches = [
    body.match(/Research Areas?\s+([\s\S]*?)(?:Recent Courses|Research Honors|Related News|News Notes|Siebel School)/i),
    body.match(/Research Statement\s+([\s\S]*?)(?:Recent Courses|Research Honors|Related News|News Notes|Siebel School)/i),
    body.match(/Research Interests?\s+([\s\S]*?)(?:Recent Courses|Research Honors|Related News|News Notes|Siebel School)/i),
  ];
  return matches.find(Boolean)?.[1]?.trim() ?? "";
}

function refine(document) {
  for (const row of document.decisions) {
    if (row.decision === "include_new_pi") {
      row.enrichmentStatus = selected.has(row.rosterName) ? "module_complete" : "queued_after_scope_decision";
    }
    if (row.decision !== "pending_profile_verification") continue;
    const evidence = byKey.get(`${document.unitId}::${row.rosterName}`);
    if (!evidence?.ok) continue;
    let inScope = false;
    let researchEvidence = "";
    if (document.unitId === "uw-allen-school") {
      const focus = evidence.text.match(/Focus Area:\s*([\s\S]*?)\s+(?:Expertise:|Email:)/i)?.[1] ?? "";
      const expertise = evidence.text.match(/Expertise:\s*([\s\S]*?)\s+Email:/i)?.[1] ?? "";
      researchEvidence = `${focus}; ${expertise}`.trim();
      inScope = uwInScope.test(researchEvidence);
    } else {
      researchEvidence = uiucSpecificResearch(evidence);
      inScope = uiucInScope.test(researchEvidence) || uiucManualInScope.has(row.rosterName);
    }
    if (inScope) {
      row.decision = "include_new_pi";
      row.reason = selected.has(row.rosterName)
        ? "本批高价值接入：官方个人页确认现任独立 PI 与 AI/ML/NLP/CV 研究主线，并已完成资料、头像和关系补全。"
        : "官方个人页确认现任独立 PI 与 AI/ML/NLP/CV 研究主线；完成纳入判断，资料深化排入后续批次。";
      row.enrichmentStatus = selected.has(row.rosterName) ? "module_complete" : "queued_after_scope_decision";
    } else {
      row.decision = "excluded_non_ai_cs";
      row.reason = "官方个人页已核验；研究主线未落入本图谱 AI、NLP、CV、ML、机器人或相关数据智能范围。";
      row.enrichmentStatus = "not_applicable";
    }
    row.profileEvidence = {
      fetchedFrom: evidence.finalUrl || evidence.profileUrl,
      checkedAt: "2026-09-03",
      excerpt: researchEvidence.slice(0, 900) || uiucBody(evidence).slice(0, 900),
    };
  }
  const counts = {};
  for (const row of document.decisions) counts[row.decision] = (counts[row.decision] || 0) + 1;
  document.counts = counts;
  document.profileEvidenceAudit = {
    fetched: document.decisions.filter((row) => row.profileEvidence).length,
    unresolvedPending: document.decisions.filter((row) => row.decision === "pending_profile_verification").length,
    method: "Official profile Focus Area / Research Areas / Research Statement plus conservative manual review of profiles lacking structured research fields",
  };
  return document;
}

const files = ["uw-allen-school-2026-09-03.json", "uiuc-siebel-school-2026-09-03.json"];
const documents = [];
for (const file of files) {
  const document = refine(JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")));
  fs.writeFileSync(path.join(dir, file), `${JSON.stringify(document, null, 2)}\n`);
  documents.push(document);
}

const summaryPath = path.join(dir, "summary-2026-09-03.json");
const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
const totals = {};
for (const document of documents) {
  summary.units[document.unitId].counts = document.counts;
  summary.units[document.unitId].unresolvedPending = document.profileEvidenceAudit.unresolvedPending;
  summary.units[document.unitId].moduleCompleteCount = document.decisions.filter((row) => row.enrichmentStatus === "module_complete").length;
  summary.units[document.unitId].queuedAfterScopeDecisionCount = document.decisions.filter((row) => row.enrichmentStatus === "queued_after_scope_decision").length;
  for (const [key, count] of Object.entries(document.counts)) totals[key] = (totals[key] || 0) + count;
}
summary.totals.counts = totals;
summary.totals.unresolvedPending = totals.pending_profile_verification || 0;
summary.totals.moduleCompleteCount = Object.values(summary.units).reduce((sum, unit) => sum + unit.moduleCompleteCount, 0);
summary.totals.queuedAfterScopeDecisionCount = Object.values(summary.units).reduce((sum, unit) => sum + unit.queuedAfterScopeDecisionCount, 0);
summary.profileEvidenceCache = "data/roster-decisions/us-uw-uiuc-2026-09-03/profile-evidence-cache-2026-09-03.json";
summary.inclusionSemantics = "include_new_pi is a completed scope decision; enrichmentStatus distinguishes the 15 complete expansion records from confirmed in-scope PIs queued for later profile enrichment.";
fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
