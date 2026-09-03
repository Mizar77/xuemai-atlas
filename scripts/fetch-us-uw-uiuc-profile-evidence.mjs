import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const decisionDir = path.join(root, "data/roster-decisions/us-uw-uiuc-2026-09-03");
const files = ["uw-allen-school-2026-09-03.json", "uiuc-siebel-school-2026-09-03.json"];
const pending = [];

for (const file of files) {
  const document = JSON.parse(await fs.readFile(path.join(decisionDir, file), "utf8"));
  for (const row of document.decisions) {
    if (row.decision === "pending_profile_verification" && row.profileUrl) pending.push({ unitId: document.unitId, rosterName: row.rosterName, profileUrl: row.profileUrl });
  }
}

function textFromHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const results = new Array(pending.length);
let cursor = 0;
async function worker() {
  while (true) {
    const index = cursor++;
    if (index >= pending.length) return;
    const item = pending[index];
    try {
      const response = await fetch(item.profileUrl, { redirect: "follow", signal: AbortSignal.timeout(30000) });
      const html = await response.text();
      results[index] = { ...item, ok: response.ok, status: response.status, finalUrl: response.url, text: textFromHtml(html).slice(0, 30000) };
    } catch (error) {
      results[index] = { ...item, ok: false, error: String(error), text: "" };
    }
  }
}

await Promise.all(Array.from({ length: 12 }, worker));
await fs.writeFile(path.join(decisionDir, "profile-evidence-cache-2026-09-03.json"), `${JSON.stringify({ fetchedAt: "2026-09-03", count: results.length, results }, null, 2)}\n`);
console.log(`Fetched ${results.filter((row) => row.ok).length}/${results.length} official profiles.`);
