import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const cacheDir = "/private/tmp/mainland-rank11-18-profile-cache-2026";
const rosterFiles = [
  "whu-cs-all-personnel-2026-09-02.json",
  "whu-ai-all-faculty-2026-09-02.json",
  "uestc-cs-all-faculty-2026-09-02.json",
  "seu-cse-all-faculty-2026-09-02.json",
  "sysu-cse-all-personnel-2026-09-02.json",
  "sysu-ai-all-faculty-and-mentors-2026-09-02.json",
  "buaa-cs-all-faculty-2026-09-02.json",
  "buaa-ai-all-personnel-2026-09-02.json",
  "cuhksz-sds-all-faculty-2026-09-02.json",
  "bupt-cs-complete-faculty-2026-09-02.json",
  "bupt-ai-complete-faculty-2026-09-02.json",
  "szu-ai-full-faculty-2026-09-02.json",
];

fs.mkdirSync(cacheDir, { recursive: true });
const urls = [...new Set(rosterFiles.flatMap((file) => {
  const roster = JSON.parse(fs.readFileSync(path.join(root, "data/official-rosters", file), "utf8"));
  return roster.people.map((person) => person.profileUrl).filter((url) => /^https?:/iu.test(url ?? ""));
}))];

let cursor = 0;
const results = [];
async function worker() {
  while (cursor < urls.length) {
    const index = cursor++;
    const url = urls[index];
    const cacheKey = crypto.createHash("sha1").update(url).digest("hex");
    const outputPath = path.join(cacheDir, `${cacheKey}.html`);
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 500) {
      results[index] = { url, status: "cached", bytes: fs.statSync(outputPath).size };
      continue;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 (compatible; XuemailAtlasRosterAudit/1.0)" },
        redirect: "follow",
        signal: controller.signal,
      });
      const body = await response.text();
      if (response.ok && body.length > 500) fs.writeFileSync(outputPath, body);
      results[index] = { url, status: response.status, bytes: body.length };
    } catch (error) {
      results[index] = { url, status: "error", error: String(error) };
    } finally {
      clearTimeout(timeout);
    }
  }
}

await Promise.all(Array.from({ length: 24 }, () => worker()));
fs.writeFileSync(path.join(cacheDir, "manifest.json"), `${JSON.stringify(results, null, 2)}\n`);
const successful = results.filter((result) => result && (result.status === "cached" || (typeof result.status === "number" && result.status >= 200 && result.status < 300)) && result.bytes > 500).length;
console.log(JSON.stringify({ requested: urls.length, successful, failed: urls.length - successful, cacheDir }, null, 2));
