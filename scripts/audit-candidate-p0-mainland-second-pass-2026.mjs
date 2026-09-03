import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const checkedAt = "2026-09-03";
const firstPassPath = "data/candidate-priority-p0-mainland-full-disposition-2026-09-03.json";
const outputPath = "data/candidate-priority-p0-mainland-second-pass-source-audit-2026-09-03.json";
const cacheDir = ".cache/candidate-p0-mainland-second-pass-2026";
const firstCacheDir = ".cache/candidate-p0-mainland-full-2026";
const concurrency = 24;

const sha = (value) => createHash("sha256").update(value).digest("hex").slice(0, 20);
const decode = (value = "") => value
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<br\s*\/?\s*>/gi, "\n").replace(/<\/(?:p|li|div|tr|h[1-6])\s*>/gi, "\n").replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;|&#34;/gi, '"').replace(/&#39;|&apos;/gi, "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code))).replace(/[ \t\f\v]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
const normalize = (value = "") => value.toLowerCase().replace(/[\s·•._()（）\-—–]+/g, "");
const readMaybe = async (path) => { try { return await readFile(path, "utf8"); } catch { return null; } };

const fetchPage = async (url, allowFirstCache = false) => {
  const first = allowFirstCache ? await readMaybe(`${firstCacheDir}/${sha(url)}.html`) : null;
  if (first) return { ok: true, status: 200, finalUrl: url, html: first, cache: "first-pass" };
  const cached = await readMaybe(`${cacheDir}/${sha(url)}.html`);
  if (cached) return { ok: true, status: 200, finalUrl: url, html: cached, cache: "second-pass" };
  let lastError = null;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 22000);
    try {
      const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "Mozilla/5.0 (compatible; XuemaiAtlasResearchAudit/1.0; +https://github.com/Mizar77/xuemai-atlas)", accept: "text/html,application/xhtml+xml,text/plain" } });
      const contentType = response.headers.get("content-type") ?? "";
      if (/pdf|octet-stream/i.test(contentType) || /\.pdf(?:$|\?)/i.test(response.url)) return { ok: false, status: response.status, finalUrl: response.url, html: "", cache: "miss", error: "PDF requires separate manual extraction" };
      const html = await response.text();
      if (response.ok && html.length > 350) { await writeFile(`${cacheDir}/${sha(url)}.html`, html); return { ok: true, status: response.status, finalUrl: response.url, html, cache: "miss" }; }
      lastError = `HTTP ${response.status}; ${html.length} bytes`;
    } catch (error) { lastError = error instanceof Error ? error.message : String(error); }
    finally { clearTimeout(timer); }
  }
  return { ok: false, status: null, finalUrl: url, html: "", cache: "miss", error: lastError };
};

const links = (html, baseUrl) => {
  const found = [];
  const baseHost = new URL(baseUrl).hostname;
  for (const match of html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    let url; try { url = new URL(match[1], baseUrl).href; } catch { continue; }
    if (!/^https?:/i.test(url) || /(?:login|search|javascript|mailto|tel:)/i.test(url)) continue;
    const label = decode(match[2]).slice(0, 160);
    const hay = `${url} ${label}`.toLowerCase();
    const explicitPersonal = /个人主页|homepage|personal|curriculum|vitae|简历|我的主页|课题组主页|实验室主页/.test(hay);
    const sameHost = new URL(url).hostname === baseHost;
    if (sameHost && /\/(?:xsgz|news|article|szdw|faculty|team|yjtd|list|admission|student)(?:[/.?#]|$)/i.test(new URL(url).pathname) && !explicitPersonal) continue;
    let score = 0;
    if (/个人主页|主页|homepage|personal|about me|profile/.test(hay)) score += 8;
    if (/students?|people|team|members?|alumni|group|lab|课题组|团队|成员|学生/.test(hay)) score += 7;
    if (/cv(?:\.|\/|\b)|curriculum|vitae|简历/.test(hay)) score += 6;
    if (/scholar\.google|dblp|orcid|github|researchgate|linkedin|weibo|wechat|bilibili/.test(hay)) score -= 8;
    if (/news|article|detail|info/.test(hay)) score += 1;
    if (!sameHost) score += 3;
    if (score > 0) found.push({ url, label, score });
  }
  const plain = decode(html);
  for (const match of plain.matchAll(/https?:\/\/[^\s<>"'，。；）)]+/g)) {
    const url = match[0].replace(/[.,;:]$/, ""); const hay = url.toLowerCase(); let score = 0;
    let parsed; try { parsed = new URL(url); } catch { continue; }
    if (parsed.hostname === baseHost && /\/(?:xsgz|news|article|szdw|faculty|team|yjtd|list|admission|student)(?:[/.?#]|$)/i.test(parsed.pathname)) continue;
    if (/github\.io|netlify|\.com\/?$|\.edu\/?$|homepage|people|faculty|profile|~/.test(hay)) score += 4;
    if (parsed.hostname !== baseHost) score += 3;
    if (/scholar\.google|dblp|orcid|researchgate|linkedin/.test(hay)) score -= 8;
    if (score > 0) found.push({ url, label: "plain-text profile link", score });
  }
  return [...new Map(found.sort((a, b) => b.score - a.score).map((item) => [item.url.replace(/#.*$/, ""), item])).values()].slice(0, 3);
};

const images = (html, baseUrl, name) => {
  const out = []; const key = normalize(name);
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0]; const src = tag.match(/(?:src|data-src|data-original)\s*=\s*["']([^"']+)["']/i)?.[1]; if (!src) continue;
    let url; try { url = new URL(src, baseUrl).href; } catch { continue; }
    const alt = decode(tag.match(/alt\s*=\s*["']([^"']*)["']/i)?.[1] ?? ""); const hay = normalize(`${url} ${alt} ${tag}`);
    if (/logo|icon|banner|qrcode|wechat|wx|xhs|bili|arrow|loading|default|placeholder|sprite|footer|header/.test(hay)) continue;
    let score = key && hay.includes(key) ? 8 : 0;
    if (/avatar|portrait|photo|faculty|teacher|people|person|head|jiaoshiml/.test(hay)) score += 4;
    if (/upload|media|images/.test(hay)) score += 2;
    if (/\.svg(?:\?|$)|\.gif(?:\?|$)/i.test(url)) score -= 5;
    out.push({ url, alt, score });
  }
  return [...new Map(out.sort((a, b) => b.score - a.score).map((item) => [item.url, item])).values()].slice(0, 8);
};

const around = (text, index, radius = 170) => text.slice(Math.max(0, index - radius), Math.min(text.length, index + radius)).replace(/\s+/g, " ").trim();
const strictRelationships = (text) => {
  const found = [];
  const patterns = [
    /(?:师从|受教于)\s*(?:Prof\.?\s*)?([A-Z][A-Za-z .'-]{2,55}|[\u4e00-\u9fff]{2,6})(?:教授|老师)?/giu,
    /(?:博士|硕士|Ph\.?D\.?).{0,55}?(?:导师(?:为|是|[:：])|指导教师(?:为|是|[:：])|supervised by|advisor(?:s)?(?: was| were| is| are|[:：]))\s*(?:Prof(?:essor)?\.?\s*)?([A-Z][A-Za-z .'-]{2,70}|[\u4e00-\u9fff]{2,6})(?:教授|老师)?/giu,
    /(?:My|His|Her)\s+(?:Ph\.?D\.?\s+)?advisor\s+(?:was|is)\s+(?:Prof(?:essor)?\.?\s*)?([A-Z][A-Za-z .'-]{2,70})/giu,
    /(?:co-?supervised by|co-?advised by|合作导师(?:为|是|[:：]))\s*(?:Prof(?:essor)?\.?\s*)?([A-Z][A-Za-z .'-]{2,70}|[\u4e00-\u9fff]{2,6})(?:教授|老师)?/giu,
  ];
  for (const pattern of patterns) for (const match of text.matchAll(pattern)) {
    const snippet = around(text, match.index ?? 0);
    if (/优秀博士|导师奖|指导教师奖|获奖|招生|博士生导师/.test(snippet)) continue;
    const endpoint = match[1]?.trim().replace(/[，。；;:].*$/, "");
    if (!endpoint || /^(研究|学生|本人|团队|教授|老师|博士|硕士)$/.test(endpoint)) continue;
    found.push({ kind: /硕士/.test(match[0]) ? "master_adviser" : /合作|co-/.test(match[0]) ? "postdoc_or_co_mentor" : "phd_adviser", endpoint, snippet });
  }
  const industryPatterns = [
    /(?:曾任|此前任|加入|任职于|worked at|was (?:a |an )?(?:researcher|scientist|engineer) at)\s*([^，。；;\n]{0,90}?(?:Microsoft|Google|DeepMind|Meta|Facebook|Amazon|Alibaba|阿里巴巴|ByteDance|字节跳动|Tencent|腾讯|Huawei|华为|IBM|NVIDIA|DJI|大疆|Baidu|百度|SenseTime|商汤|OpenAI|Anthropic|Apple|美团|滴滴|京东)[^，。；;\n]{0,60})/giu,
  ];
  for (const pattern of industryPatterns) for (const match of text.matchAll(pattern)) found.push({ kind: "industry_affiliation", endpoint: match[1].trim(), snippet: around(text, match.index ?? 0) });
  return [...new Map(found.map((item) => [`${item.kind}:${normalize(item.endpoint)}`, item])).values()].slice(0, 10);
};

const factSnippets = (text) => ({
  education: [...text.matchAll(/(?:教育背景|教育经历|Education|Ph\.?D\.?|博士学位)/giu)].slice(0, 4).map((m) => around(text, m.index ?? 0, 130)),
  employment: [...text.matchAll(/(?:工作经历|任职经历|现任|Current position|Employment|Professional Experience)/giu)].slice(0, 4).map((m) => around(text, m.index ?? 0, 130)),
  research: [...text.matchAll(/(?:研究方向|研究领域|研究兴趣|Research Interests?|Research Areas?)/giu)].slice(0, 4).map((m) => around(text, m.index ?? 0, 130)),
});

await mkdir(cacheDir, { recursive: true });
const firstPass = JSON.parse(await readFile(firstPassPath, "utf8"));
const candidates = firstPass.records.filter((row) => ["missing_portrait", "missing_relationship"].includes(row.disposition));
const results = Array(candidates.length); let cursor = 0;
const worker = async () => {
  while (true) {
    const index = cursor++; if (index >= candidates.length) return; const candidate = candidates[index];
    const official = await fetchPage(candidate.profileUrl, true);
    const leads = official.ok ? links(official.html, official.finalUrl).filter((lead) => lead.url !== candidate.profileUrl) : [];
    const fetchedLeads = [];
    for (const lead of leads) { const fetched = await fetchPage(lead.url); fetchedLeads.push({ ...lead, fetch: { ok: fetched.ok, status: fetched.status, finalUrl: fetched.finalUrl, error: fetched.error }, html: fetched.html }); }
    const pages = [official.ok ? { url: official.finalUrl, kind: "official_profile", html: official.html } : null, ...fetchedLeads.filter((lead) => lead.fetch.ok).map((lead) => ({ url: lead.fetch.finalUrl, kind: "linked_profile", html: lead.html }))].filter(Boolean);
    const texts = pages.map((page) => ({ url: page.url, kind: page.kind, text: decode(page.html) }));
    const relationshipLeads = texts.flatMap((page) => strictRelationships(page.text).map((item) => ({ ...item, sourceUrl: page.url, sourceKind: page.kind })));
    const imageLeads = pages.flatMap((page) => images(page.html, page.url, candidate.name).map((item) => ({ ...item, sourceUrl: page.url, sourceKind: page.kind }))).sort((a, b) => b.score - a.score);
    const facts = texts.map((page) => ({ sourceUrl: page.url, ...factSnippets(page.text) }));
    const hasPortrait = Boolean(candidate.portraitLead?.url || imageLeads.some((item) => item.score >= 4));
    const priorFacts = candidate.evidence ?? {};
    const factCategories = [
      (priorFacts.education?.length ?? 0) + facts.reduce((n, row) => n + row.education.length, 0),
      (priorFacts.employment?.length ?? 0) + facts.reduce((n, row) => n + row.employment.length, 0),
      (priorFacts.research?.length ?? 0) + facts.reduce((n, row) => n + row.research.length, 0),
    ].filter(Boolean).length;
    const state = !official.ok ? "blocked_profile_fetch" : !hasPortrait ? "missing_portrait" : relationshipLeads.length === 0 ? "missing_relationship" : factCategories < 3 ? "missing_profile_facts" : "manual_ready_review";
    results[index] = {
      canonicalKey: candidate.canonicalKey, name: candidate.name, institution: candidate.institution,
      priorDisposition: candidate.disposition, disposition: state === "missing_portrait" ? "missing_portrait" : "missing_relationship", verificationState: state,
      profileUrl: candidate.profileUrl, rosterUrl: candidate.rosterUrl, officialFetch: { ok: official.ok, status: official.status, finalUrl: official.finalUrl, error: official.error },
      followedLinks: fetchedLeads.map((fetchedLead) => {
        const lead = { ...fetchedLead };
        delete lead.html;
        return lead;
      }),
      portraitLead: candidate.portraitLead ?? imageLeads[0] ?? null, imageLeads: imageLeads.slice(0, 8), relationshipLeads, facts,
      reason: state === "manual_ready_review" ? "第二轮在官方页或其直接链接的个人材料中恢复了头像、三类人物事实和明确关系原句；须人工核对身份、端点与原句后才能发布。" : state === "missing_profile_facts" ? "找到可靠头像和明确关系原句，但仍不足以组织 3–5 条有来源人物事实。" : state === "missing_relationship" ? "官方页及其直接链接材料没有出现可建立图谱边的明确关系原句。" : state === "missing_portrait" ? "官方页及其直接链接材料仍没有身份可核验的非占位单人头像。" : `个人页第二轮仍抓取失败：${official.error ?? "unknown error"}`,
    };
    if ((index + 1) % 50 === 0) process.stderr.write(`second-pass ${index + 1}/${candidates.length}\n`);
  }
};
await Promise.all(Array.from({ length: concurrency }, () => worker()));
const countBy = (field) => Object.fromEntries([...new Set(results.map((row) => row[field]))].sort().map((value) => [value, results.filter((row) => row[field] === value).length]));
const report = { schemaVersion: 1, checkedAt, scope: "All 854 Mainland China P0 candidates remaining after strict first-pass publication", source: firstPassPath, candidateCount: candidates.length, reviewedCount: results.length, followedLinkCount: results.reduce((n, row) => n + row.followedLinks.length, 0), successfulLinkedPageCount: results.reduce((n, row) => n + row.followedLinks.filter((link) => link.fetch.ok).length, 0), byPriorDisposition: countBy("priorDisposition"), byDisposition: countBy("disposition"), byVerificationState: countBy("verificationState"), automaticallyPublished: 0, records: results };
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, candidateCount: report.candidateCount, reviewedCount: report.reviewedCount, followedLinkCount: report.followedLinkCount, successfulLinkedPageCount: report.successfulLinkedPageCount, byPriorDisposition: report.byPriorDisposition, byDisposition: report.byDisposition, byVerificationState: report.byVerificationState, automaticallyPublished: 0 }, null, 2));
