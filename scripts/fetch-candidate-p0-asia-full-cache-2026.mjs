import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ledgerPath = path.join(
  root,
  "data/candidate-priority-p0-asia-disposition-2026-09-03.json",
);
const outputPath = path.join(
  root,
  "data/candidate-priority-p0-asia-source-cache-2026-09-03.json",
);

const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8")).ledger.filter(
  (entry) => !["ready", "duplicate"].includes(entry.status),
);

const decodeEntities = (value) =>
  String(value ?? "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

const plainText = (html) =>
  decodeEntities(
    String(html)
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();

const metaValue = (html, names) => {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const patterns = [
      new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`, "i"),
    ];
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match?.[1]) return decodeEntities(match[1].trim());
    }
  }
  return null;
};

const titleValue = (html) => {
  const value = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return value ? plainText(value) : null;
};

const absoluteUrl = (value, base) => {
  if (!value || /^(data:|javascript:|mailto:|tel:)/i.test(value)) return null;
  try {
    return new URL(decodeEntities(value), base).href;
  } catch {
    return null;
  }
};

const imageCandidates = (html, base) => {
  const candidates = [];
  const meta = metaValue(html, ["og:image", "twitter:image", "twitter:image:src"]);
  if (meta) candidates.push(meta);
  for (const match of html.matchAll(/<img\b[^>]*(?:src|data-src|data-original)=["']([^"']+)["'][^>]*>/gi)) {
    candidates.push(match[1]);
  }
  return [...new Set(candidates.map((value) => absoluteUrl(value, base)).filter(Boolean))].slice(0, 30);
};

const relationExcerpts = (text) => {
  const clauses = text.split(/(?<=[.!?。！？;；])\s*/).filter(Boolean);
  const relationshipPattern = /\b(?:ph\.?d\.?|doctor(?:al|ate)?|advisor|adviser|supervisor|student|alumn(?:us|a|i)|postdoc|post-doctoral|mentor|join(?:ed)?|worked at|research scientist|intern(?:ship)?|founder|co-founder|principal investigator|lab(?:oratory)?|group)\b|博士|导师|指导|学生|毕业生|校友|博士后|联合培养|创始|任职|研究组|实验室|团队/i;
  return clauses
    .filter((clause) => relationshipPattern.test(clause))
    .map((clause) => clause.trim())
    .filter((clause) => clause.length >= 25 && clause.length <= 800)
    .slice(0, 30);
};

const links = (html, base) => {
  const output = [];
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = absoluteUrl(match[1], base);
    const label = plainText(match[2]);
    if (!url || !label) continue;
    if (/cv|vita|bio|student|people|team|member|group|lab|alumni|placement|graduate|论文|简历|学生|团队|成员|实验室/i.test(`${label} ${url}`)) {
      output.push({ label: label.slice(0, 200), url });
    }
  }
  return [...new Map(output.map((entry) => [`${entry.label}\0${entry.url}`, entry])).values()].slice(0, 40);
};

const fetchOne = async (entry) => {
  const url = entry.evidenceUrls?.[0];
  const startedAt = Date.now();
  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; AcademicAtlasRosterAudit/1.0)",
        accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(45_000),
    });
    const contentType = response.headers.get("content-type") ?? "";
    const html = contentType.includes("html") ? await response.text() : "";
    const text = plainText(html);
    return {
      canonicalKey: entry.canonicalKey,
      name: entry.name,
      region: entry.region,
      institution: entry.institution,
      requestedUrl: url,
      finalUrl: response.url,
      checkedAt: "2026-09-03",
      httpStatus: response.status,
      ok: response.ok && html.length > 500,
      contentType,
      byteLength: Buffer.byteLength(html),
      elapsedMs: Date.now() - startedAt,
      pageTitle: titleValue(html),
      metaDescription: metaValue(html, ["description", "og:description", "twitter:description"]),
      imageCandidates: imageCandidates(html, response.url),
      relationExcerpts: relationExcerpts(text),
      evidenceLinks: links(html, response.url),
      textExcerpt: text.slice(0, 6000),
      error: null,
    };
  } catch (error) {
    return {
      canonicalKey: entry.canonicalKey,
      name: entry.name,
      region: entry.region,
      institution: entry.institution,
      requestedUrl: url,
      finalUrl: null,
      checkedAt: "2026-09-03",
      httpStatus: null,
      ok: false,
      contentType: null,
      byteLength: 0,
      elapsedMs: Date.now() - startedAt,
      pageTitle: null,
      metaDescription: null,
      imageCandidates: [],
      relationExcerpts: [],
      evidenceLinks: [],
      textExcerpt: "",
      error: String(error?.message ?? error),
    };
  }
};

const concurrency = 16;
const records = Array(ledger.length);
let cursor = 0;
const workers = Array.from({ length: concurrency }, async () => {
  while (true) {
    const index = cursor++;
    if (index >= ledger.length) return;
    records[index] = await fetchOne(ledger[index]);
    if ((index + 1) % 100 === 0) console.error(`fetched ${index + 1}/${ledger.length}`);
  }
});

await Promise.all(workers);

const output = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  sourceLedger: path.relative(root, ledgerPath),
  total: records.length,
  ok: records.filter((record) => record.ok).length,
  failed: records.filter((record) => !record.ok).length,
  withImageCandidates: records.filter((record) => record.imageCandidates.length > 0).length,
  withRelationExcerpts: records.filter((record) => record.relationExcerpts.length > 0).length,
  records,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: output.total, ok: output.ok, failed: output.failed, withImageCandidates: output.withImageCandidates, withRelationExcerpts: output.withRelationExcerpts }, null, 2));
