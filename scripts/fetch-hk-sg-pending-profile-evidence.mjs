import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const decisionPath = path.join(root, "data/roster-decisions/hk-sg-remaining-892-2026-09-03.json");
const outputPath = path.join(root, "data/roster-decisions/hk-sg-pending-profile-evidence-2026-09-03.json");
const batch = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
const pending = batch.decisions.filter((row) => row.decision === "pending_profile_verification");

const researchTerms = [
  "artificial intelligence", "machine learning", "deep learning", "computer vision",
  "natural language", "language model", "data science", "data mining", "knowledge graph",
  "information retrieval", "pattern recognition", "image processing", "image analysis",
  "medical imaging", "robotics", "robot learning", "reinforcement learning", "intelligent system",
  "computational intelligence", "human-computer interaction", "human computer interaction",
  "multimedia", "generative ai", "generative artificial intelligence", "speech recognition",
  "speech processing", "big data", "computer graphics", "visual computing", "optimization",
  "bioinformatics", "biomedical informatics", "statistical learning", "neural network",
];
const roleTerms = [
  "chair professor", "full professor", "professor", "associate professor", "assistant professor",
  "research professor", "principal investigator", "group leader", "team leader", "head of",
  "lecturer", "senior lecturer", "research assistant professor", "adjunct", "honorary", "emeritus",
  "postdoctoral", "post-doctoral", "research fellow", "research associate", "scientist", "engineer",
];

function decodeHtml(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—" };
  return value
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/giu, (_, token) => {
      if (token.startsWith("#x")) return String.fromCodePoint(Number.parseInt(token.slice(2), 16));
      if (token.startsWith("#")) return String.fromCodePoint(Number.parseInt(token.slice(1), 10));
      return named[token.toLowerCase()] ?? `&${token};`;
    });
}

function htmlToText(html) {
  return decodeHtml(html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, " ")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/giu, " ")
    .replace(/<!--([\s\S]*?)-->/gu, " ")
    .replace(/<[^>]+>/gu, " "))
    .replace(/\s+/gu, " ")
    .trim();
}

function titleFromHtml(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/iu);
  return match ? htmlToText(match[1]) : null;
}

function matchingTerms(text, terms) {
  const lower = text.toLowerCase();
  return terms.filter((term) => lower.includes(term));
}

function snippetsFor(text, terms) {
  const lower = text.toLowerCase();
  const snippets = [];
  const seen = new Set();
  for (const term of terms) {
    let index = lower.indexOf(term);
    if (index < 0) continue;
    const snippet = text.slice(Math.max(0, index - 180), Math.min(text.length, index + term.length + 260)).trim();
    const key = snippet.toLowerCase();
    if (!seen.has(key)) {
      snippets.push(snippet);
      seen.add(key);
    }
    if (snippets.length >= 12) break;
  }
  return snippets;
}

function labelledSnippets(text) {
  const labels = ["research interests", "research interest", "research areas", "research area", "research expertise", "research focus", "biography", "profile", "academic position", "current position", "view scopus profile"];
  const lower = text.toLowerCase();
  const snippets = [];
  const seen = new Set();
  for (const label of labels) {
    let from = 0;
    while (from < lower.length) {
      const index = lower.indexOf(label, from);
      if (index < 0) break;
      const snippet = text.slice(Math.max(0, index - 120), Math.min(text.length, index + 900)).trim();
      const key = snippet.toLowerCase();
      if (!seen.has(key)) {
        snippets.push(snippet);
        seen.add(key);
      }
      from = index + label.length;
      if (snippets.length >= 24) return snippets;
    }
  }
  return snippets;
}

async function fetchOne(row) {
  const url = row.profileUrl || row.evidenceUrl || row.sourcePageUrl;
  if (!url?.startsWith("http")) {
    return { officialId: row.officialId, unitId: row.unitId, rosterName: row.rosterName, url: null, status: "missing_url", textLength: 0, researchHits: [], roleHits: [], snippets: [] };
  }
  try {
    const { stdout } = await execFileAsync("curl", ["-k", "-L", "--compressed", "--max-time", "35", "-A", "Mozilla/5.0 roster-audit", "-sS", url], { maxBuffer: 16 * 1024 * 1024 });
    const text = htmlToText(stdout);
    const researchHits = matchingTerms(text, researchTerms);
    const roleHits = matchingTerms(text, roleTerms);
    return {
      officialId: row.officialId,
      unitId: row.unitId,
      rosterName: row.rosterName,
      url,
      status: text.length >= 200 ? "fetched" : "empty_or_blocked",
      pageTitle: titleFromHtml(stdout),
      textLength: text.length,
      researchHits,
      roleHits,
      snippets: snippetsFor(text, [...researchHits, ...roleHits]),
      labelledSnippets: labelledSnippets(text),
    };
  } catch (error) {
    return {
      officialId: row.officialId,
      unitId: row.unitId,
      rosterName: row.rosterName,
      url,
      status: "fetch_error",
      error: String(error?.stderr || error?.message || error).slice(0, 500),
      textLength: 0,
      researchHits: [],
      roleHits: [],
      snippets: [],
      labelledSnippets: [],
    };
  }
}

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < pending.length) {
    const index = cursor++;
    results[index] = await fetchOne(pending[index]);
    if ((index + 1) % 25 === 0) console.error(`fetched ${index + 1}/${pending.length}`);
  }
}
await Promise.all(Array.from({ length: 8 }, () => worker()));

const output = {
  schemaVersion: 1,
  fetchedAt: "2026-09-03",
  sourceDecisionFile: path.relative(root, decisionPath),
  pendingCount: pending.length,
  statusCounts: Object.fromEntries([...new Set(results.map((row) => row.status))].sort().map((status) => [status, results.filter((row) => row.status === status).length])),
  results,
};
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath: path.relative(root, outputPath), pendingCount: pending.length, statusCounts: output.statusCounts, withResearchHits: results.filter((row) => row.researchHits.length).length, withRoleHits: results.filter((row) => row.roleHits.length).length }, null, 2));
