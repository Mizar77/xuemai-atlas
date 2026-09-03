import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const checkedAt = "2026-09-03";
const masterPath = "data/candidate-priority-p0-master-disposition-2026-09-03.json";
const outputPath = "data/candidate-priority-p0-mainland-full-source-audit-2026-09-03.json";
const cacheDir = ".cache/candidate-p0-mainland-full-2026";
const concurrency = 18;

const decodeHtml = (value = "") => value
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<br\s*\/?\s*>/gi, "\n")
  .replace(/<\/p\s*>/gi, "\n")
  .replace(/<\/li\s*>/gi, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&lt;/gi, "<")
  .replace(/&gt;/gi, ">")
  .replace(/&quot;|&#34;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/[ \t\f\v]+/g, " ")
  .replace(/\n\s*\n+/g, "\n")
  .trim();

const normalize = (value = "") => value.toLowerCase().replace(/[\s·•._()（）\-—–]+/g, "");
const sha = (value) => createHash("sha256").update(value).digest("hex").slice(0, 20);
const cachePath = (url) => `${cacheDir}/${sha(url)}.html`;

const readCache = async (url) => {
  try { return await readFile(cachePath(url), "utf8"); } catch { return null; }
};

const fetchPage = async (url) => {
  const cached = await readCache(url);
  if (cached) return { ok: true, status: 200, finalUrl: url, html: cached, cache: "hit" };
  let lastError = null;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; XuemaiAtlasResearchAudit/1.0; +https://github.com/Mizar77/xuemai-atlas)",
          accept: "text/html,application/xhtml+xml",
        },
      });
      const html = await response.text();
      if (response.ok && html.length > 400) {
        await writeFile(cachePath(url), html);
        return { ok: true, status: response.status, finalUrl: response.url, html, cache: "miss" };
      }
      lastError = `HTTP ${response.status}; ${html.length} bytes`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    } finally {
      clearTimeout(timeout);
    }
  }
  return { ok: false, status: null, finalUrl: url, html: "", cache: "miss", error: lastError };
};

const imageCandidates = (html, baseUrl, name) => {
  const results = [];
  const nameKey = normalize(name);
  const re = /<img\b[^>]*>/gi;
  for (const match of html.matchAll(re)) {
    const tag = match[0];
    const srcMatch = tag.match(/(?:src|data-src|data-original)\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) continue;
    let url;
    try { url = new URL(srcMatch[1], baseUrl).href; } catch { continue; }
    const alt = tag.match(/alt\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
    const context = normalize(`${url} ${alt} ${tag}`);
    if (/logo|icon|banner|qrcode|wechat|wx\.|xhs|bili|arrow|loading|default|placeholder|avatar-default/.test(context)) continue;
    let score = 0;
    if (nameKey && context.includes(nameKey)) score += 8;
    if (/faculty|teacher|photo|portrait|avatar|jiaoshiml|szdw|people|person/.test(context)) score += 4;
    if (/upload|uploads|media|images/.test(context)) score += 2;
    if (/\.svg(?:\?|$)|\.gif(?:\?|$)/i.test(url)) score -= 4;
    results.push({ url, alt: decodeHtml(alt), score, tag: tag.slice(0, 300) });
  }
  return [...new Map(results.sort((a, b) => b.score - a.score).map((item) => [item.url, item])).values()].slice(0, 8);
};

const snippets = (text, patterns, { exclude = [], radius = 120, limit = 8 } = {}) => {
  const found = [];
  for (const pattern of patterns) {
    const re = new RegExp(pattern, "giu");
    for (const match of text.matchAll(re)) {
      const start = Math.max(0, match.index - radius);
      const end = Math.min(text.length, match.index + match[0].length + radius);
      const snippet = text.slice(start, end).replace(/\s+/g, " ").trim();
      if (exclude.some((term) => new RegExp(term, "iu").test(snippet))) continue;
      if (!found.some((entry) => normalize(entry) === normalize(snippet))) found.push(snippet);
      if (found.length >= limit) return found;
    }
  }
  return found;
};

const analyze = (candidate, fetched) => {
  if (!fetched.ok) {
    return {
      canonicalKey: candidate.canonicalKey,
      name: candidate.name,
      institution: candidate.institution,
      priorDisposition: candidate.disposition,
      finalDisposition: candidate.disposition,
      verificationState: "blocked_fetch",
      profileUrl: candidate.evidenceUrls?.[0] ?? null,
      rosterUrl: candidate.evidenceUrls?.[1] ?? null,
      fetch: { ok: false, status: fetched.status, finalUrl: fetched.finalUrl, error: fetched.error },
      reason: `个人页本轮抓取失败，保留原缺口：${fetched.error ?? "unknown error"}`,
    };
  }
  const text = decodeHtml(fetched.html);
  const title = decodeHtml(fetched.html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const images = imageCandidates(fetched.html, fetched.finalUrl, candidate.name);
  const relationshipEvidence = snippets(text, [
    "博士(?:学位)?(?:论文)?(?:由|导师|指导教师|指导老师)",
    "硕士(?:学位)?(?:论文)?(?:由|导师|指导教师|指导老师)",
    "师从", "导师(?:是|为|：|:)", "指导教师(?:是|为|：|:)",
    "supervised by", "advisor(?:s)?(?:\\s+was|\\s+were|\\s*:)",
    "ph\\.?d\\.? advisor", "doctoral advisor", "my students", "former students",
    "毕业生去向", "学生去向", "团队成员", "课题组成员",
  ], { exclude: ["博士生导师", "博士研究生导师", "招生"], radius: 150, limit: 10 });
  const educationEvidence = snippets(text, ["教育背景", "教育经历", "学习经历", "academic background", "education", "ph\\.?d\\.?", "博士学位", "硕士学位"], { radius: 110, limit: 6 });
  const employmentEvidence = snippets(text, ["工作经历", "任职经历", "现任", "加入.*大学", "employment", "professional experience", "currently"], { radius: 110, limit: 6 });
  const researchEvidence = snippets(text, ["研究方向", "研究领域", "研究兴趣", "research interests?", "research areas?"], { radius: 110, limit: 5 });
  const candidatePortrait = images.find((item) => item.score >= 4) ?? null;
  const hasPortraitLead = Boolean(candidate.portraitUrl || candidatePortrait);
  const hasRelationshipLead = relationshipEvidence.length > 0;
  const factCategoryCount = [educationEvidence, employmentEvidence, researchEvidence].filter((items) => items.length > 0).length;
  const verificationState = !hasPortraitLead
    ? "missing_portrait"
    : !hasRelationshipLead
      ? "missing_relationship"
      : factCategoryCount < 3
        ? "missing_profile_facts"
        : "manual_ready_review";
  const finalDisposition = verificationState === "missing_portrait" ? "missing_portrait" : "missing_relationship";
  return {
    canonicalKey: candidate.canonicalKey,
    name: candidate.name,
    institution: candidate.institution,
    priorDisposition: candidate.disposition,
    finalDisposition,
    verificationState,
    profileUrl: candidate.evidenceUrls?.[0] ?? null,
    rosterUrl: candidate.evidenceUrls?.[1] ?? null,
    fetch: { ok: true, status: fetched.status, finalUrl: fetched.finalUrl, cache: fetched.cache, htmlBytes: fetched.html.length, textChars: text.length },
    title,
    portraitLead: candidate.portraitUrl ? { url: candidate.portraitUrl, provenance: "frozen_ledger" } : candidatePortrait,
    imageCandidates: images,
    evidence: { education: educationEvidence, employment: employmentEvidence, research: researchEvidence, relationship: relationshipEvidence },
    reason: verificationState === "manual_ready_review"
      ? "自动化来源恢复同时找到头像、教育、任职、研究与关系线索；仍须逐项人工核对端点、头像身份和原文后才能发布。"
      : verificationState === "missing_profile_facts"
        ? "已找到头像与关系线索，但页面不足以支持 3–5 条结构化人物事实。"
        : verificationState === "missing_relationship"
          ? "已找到头像线索，但未找到可直接建立图谱边的一手关系陈述。"
          : "个人页未找到可可靠归属于该人物的非占位头像。",
  };
};

await mkdir(cacheDir, { recursive: true });
const master = JSON.parse(await readFile(masterPath, "utf8"));
const candidates = master.records.filter((row) => row.region === "Mainland China" && ["missing_portrait", "missing_relationship"].includes(row.disposition));
const results = Array(candidates.length);
let cursor = 0;
const worker = async () => {
  while (true) {
    const index = cursor;
    cursor += 1;
    if (index >= candidates.length) return;
    const candidate = candidates[index];
    const profileUrl = candidate.evidenceUrls?.[0];
    const fetched = profileUrl ? await fetchPage(profileUrl) : { ok: false, status: null, finalUrl: null, error: "missing profile URL" };
    results[index] = analyze(candidate, fetched);
    if ((index + 1) % 50 === 0) process.stderr.write(`checked ${index + 1}/${candidates.length}\n`);
  }
};
await Promise.all(Array.from({ length: concurrency }, () => worker()));

const countBy = (field) => Object.fromEntries([...new Set(results.map((row) => row[field]))].sort().map((value) => [value, results.filter((row) => row[field] === value).length]));
const report = {
  schemaVersion: 1,
  checkedAt,
  scope: "Every Mainland China P0 candidate left at missing_portrait or missing_relationship in the frozen master ledger",
  strictGate: "No automatic publication. A manual pass must confirm current independent PI, two sources, 3–5 sourced facts including education/employment, a non-placeholder identity-matched portrait, and at least one graph-edge relationship with verifiable endpoints.",
  sourceMaster: masterPath,
  candidateCount: candidates.length,
  checkedCount: results.length,
  byPriorDisposition: countBy("priorDisposition"),
  byFinalDisposition: countBy("finalDisposition"),
  byVerificationState: countBy("verificationState"),
  fetchSucceeded: results.filter((row) => row.fetch.ok).length,
  fetchFailed: results.filter((row) => !row.fetch.ok).length,
  automaticallyPublished: 0,
  records: results,
};
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, candidateCount: report.candidateCount, checkedCount: report.checkedCount, byPriorDisposition: report.byPriorDisposition, byFinalDisposition: report.byFinalDisposition, byVerificationState: report.byVerificationState, fetchSucceeded: report.fetchSucceeded, fetchFailed: report.fetchFailed, automaticallyPublished: 0 }, null, 2));
