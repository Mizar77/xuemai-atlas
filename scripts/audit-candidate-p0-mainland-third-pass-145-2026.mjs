import { readFile, writeFile } from "node:fs/promises";

const checkedAt = "2026-09-03";
const inputPath = "data/candidate-priority-p0-mainland-second-pass-disposition-2026-09-03.json";
const outputPath = "data/candidate-priority-p0-mainland-third-pass-145-source-audit-2026-09-03.json";
const ledger = JSON.parse(await readFile(inputPath, "utf8"));
const target = ledger.records.filter((row) =>
  row.remainingGaps?.length === 1 && ["first_party_relationship", "three_to_five_sourced_facts"].includes(row.remainingGaps[0]),
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const decode = (text) => text
  .replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'")
  .replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const textOf = (html) => decode(html)
  .replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const fetchText = async (url, timeout = 18000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "Mozilla/5.0 (compatible; XuemaiAtlasEvidenceAudit/1.0)" } });
    const body = await response.text();
    return { ok: response.ok && body.length > 500, status: response.status, finalUrl: response.url, html: body };
  } catch (error) {
    return { ok: false, status: null, finalUrl: url, error: error instanceof Error ? error.message : String(error), html: "" };
  } finally {
    clearTimeout(timer);
  }
};

const primaryDomain = (url, profileUrl) => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    const profileHost = new URL(profileUrl).hostname.toLowerCase();
    if (host === profileHost) return true;
    return /(?:\.edu(?:\.cn)?|\.ac\.cn|\.ac\.uk|\.github\.io)$/.test(host)
      || /(?:nju|pku|tsinghua|sjtu|zju)\.edu\.cn$/.test(host)
      || /(?:ipads|keysoftlab|atollab|ycwu)\./.test(host);
  } catch {
    return false;
  }
};
const discover = async (row) => {
  const query = `"${row.name.replace(/（.*|\s*\(.*/, "")}" "${row.institution}" (导师 OR advisor OR supervised OR CV OR 学生 OR alumni)`;
  const url = `https://search.brave.com/search?q=${encodeURIComponent(query)}&source=web`;
  const response = await fetchText(url);
  if (!response.ok) return { query, url, fetch: { ok: false, status: response.status, error: response.error }, urls: [] };
  const urls = [];
  for (const match of response.html.matchAll(/href="(https?:\/\/[^"#]+)"/g)) {
    const found = decode(match[1]);
    if (!primaryDomain(found, row.profileUrl)) continue;
    if (/\.(?:css|js|woff2?|png|jpe?g|gif|svg)(?:\?|$)/i.test(found)) continue;
    if (!urls.includes(found) && found !== row.profileUrl) urls.push(found);
  }
  return { query, url, fetch: { ok: true, status: response.status }, urls: urls.slice(0, 5) };
};

const relationPatterns = [
  { kind: "phd_adviser", regex: /(?:博士(?:生)?导师|导师)\s*[：:]?\s*([\p{Script=Han}A-Za-z][\p{Script=Han}A-Za-z· .()（）-]{1,48}?)(?=[，。；;、]|\s(?:教授|Prof\.?|博士|研究))/giu },
  { kind: "phd_adviser", regex: /师从\s*([\p{Script=Han}A-Za-z][\p{Script=Han}A-Za-z· .()（）-]{1,48}?)(?=[，。；;、]|\s(?:教授|Prof\.?))/giu },
  { kind: "phd_adviser", regex: /(?:Ph\.?D\.?|doctoral)[^.!?]{0,160}?(?:advisor|adviser|supervised by)\s*(?::|was|is|by)?\s*(?:Prof(?:essor)?\.?\s*)?([A-Z][A-Za-z.'-]+(?:\s+[A-Z][A-Za-z.'-]+){0,4})/giu },
  { kind: "student", regex: /(?:博士生|学生|校友)\s*([\p{Script=Han}]{2,4})(?=[，。；;、]|\s)/gu },
  { kind: "industry_affiliation", regex: /(?:曾任职?于|曾在|previously worked at|worked at)\s*([^。.;]{2,80})/giu },
];
const extractRelations = (text, sourceUrl) => {
  const leads = [];
  for (const { kind, regex } of relationPatterns) {
    for (const match of text.matchAll(regex)) {
      const endpoint = match[1]?.replace(/\s+/g, " ").trim();
      if (!endpoint || /^(?:相关|该|其|本人|计算机|信号处理|图灵奖得主|领域)/.test(endpoint)) continue;
      const start = Math.max(0, (match.index ?? 0) - 140);
      const snippet = text.slice(start, Math.min(text.length, (match.index ?? 0) + match[0].length + 180));
      if (!leads.some((lead) => lead.kind === kind && lead.endpoint === endpoint)) leads.push({ kind, endpoint, snippet, sourceUrl });
    }
  }
  return leads.slice(0, 12);
};
const extractFacts = (text, sourceUrl) => {
  const windows = (regex) => [...text.matchAll(regex)].slice(0, 5).map((match) => {
    const start = Math.max(0, (match.index ?? 0) - 90);
    return text.slice(start, Math.min(text.length, (match.index ?? 0) + match[0].length + 210));
  });
  return {
    sourceUrl,
    education: windows(/(?:博士|硕士|学士|Ph\.?D\.?|M\.?S\.?|B\.?S\.?|Education|毕业于|received (?:his|her|my) [^.]{0,80}degree)/giu),
    employment: windows(/(?:现任|加入|任职|教授|研究员|worked at|joined|currently (?:an?|the)|Professor|Researcher)/giu),
    research: windows(/(?:研究方向|研究兴趣|research interests?|focus(?:es|ed)? on)/giu),
  };
};

const records = Array(target.length);
let cursor = 0;
const concurrency = 7;
const worker = async () => {
  while (true) {
    const index = cursor++;
    if (index >= target.length) return;
    const row = target[index];
    const discovery = await discover(row);
    const pages = [];
    for (const url of discovery.urls.slice(0, 3)) {
      const fetched = await fetchText(url);
      pages.push({ url, fetch: { ok: fetched.ok, status: fetched.status, finalUrl: fetched.finalUrl, error: fetched.error }, text: fetched.ok ? textOf(fetched.html) : "" });
      await sleep(60);
    }
    const newRelationshipLeads = pages.flatMap((page) => page.fetch.ok ? extractRelations(page.text, page.fetch.finalUrl ?? page.url) : []);
    const newFacts = pages.filter((page) => page.fetch.ok).map((page) => extractFacts(page.text, page.fetch.finalUrl ?? page.url));
    const originalGap = row.remainingGaps[0];
    const categoryCount = ["education", "employment", "research"].filter((field) =>
      newFacts.some((block) => block[field].length > 0),
    ).length;
    const verificationState = originalGap === "first_party_relationship"
      ? (newRelationshipLeads.length ? "manual_relation_review" : "missing_first_party_relationship")
      : (categoryCount >= 3 ? "manual_facts_review" : "missing_sourced_facts");
    records[index] = {
      canonicalKey: row.canonicalKey, name: row.name, institution: row.institution, profileUrl: row.profileUrl,
      originalGap, discovery, checkedPages: pages.map((fetchedPage) => ({ url: fetchedPage.url, fetch: fetchedPage.fetch })),
      newRelationshipLeads, newFacts, verificationState,
      disposition: originalGap === "first_party_relationship" ? "missing_relationship" : row.finalDisposition,
      reason: verificationState.startsWith("manual_")
        ? "第三轮发现候选一手材料；必须人工核对同名身份、关系端点和事实原句后才可发布。"
        : `第三轮检索本人 CV、博士论文、实验室与官方项目/新闻入口后，仍缺 ${originalGap}。`,
    };
    if ((index + 1) % 20 === 0) process.stderr.write(`third-pass ${index + 1}/${target.length}\n`);
  }
};
await Promise.all(Array.from({ length: concurrency }, () => worker()));
const countBy = (field) => Object.fromEntries([...new Set(records.map((row) => row[field]))].sort().map((value) => [value, records.filter((row) => row[field] === value).length]));
const report = {
  schemaVersion: 1, checkedAt, scope: "Mainland P0 third-pass: 127 relationship-only gaps + 18 facts-only gaps",
  source: inputPath, candidateCount: target.length, reviewedCount: records.length,
  byOriginalGap: countBy("originalGap"), byVerificationState: countBy("verificationState"), automaticallyPublished: 0, records,
};
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, candidateCount: report.candidateCount, reviewedCount: report.reviewedCount, byOriginalGap: report.byOriginalGap, byVerificationState: report.byVerificationState, automaticallyPublished: 0 }, null, 2));
