import { mkdir, writeFile } from "node:fs/promises";
import decisions from "../data/roster-decisions/mainland-top10-tail-2026-09-03.json" with { type: "json" };

const directory = "/private/tmp/xuemai-mainland-top10-pending-profiles";
await mkdir(directory, { recursive: true });
const pending = decisions.decisions.filter((row) => row.decision === "pending_profile_verification" && row.profileUrl?.startsWith("http"));
let cursor = 0;
let saved = 0;
async function worker() {
  while (cursor < pending.length) {
    const row = pending[cursor++];
    try {
      const response = await fetch(row.profileUrl, { redirect: "follow", signal: AbortSignal.timeout(20_000) });
      if (!response.ok) continue;
      const html = await response.text();
      if (html.length < 500) continue;
      await writeFile(`${directory}/${encodeURIComponent(row.unitUrl)}--${row.officialId}.html`, html);
      saved += 1;
    } catch {
      // Network failures remain explicit pending blockers in the decision ledger.
    }
  }
}
await Promise.all(Array.from({ length: 10 }, () => worker()));
console.log(JSON.stringify({ requested: pending.length, saved, directory }));
