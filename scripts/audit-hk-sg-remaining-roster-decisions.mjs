import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = process.cwd();
const decisionPath = path.join(root, "data/roster-decisions/hk-sg-remaining-892-2026-09-03.json");
const data = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
const failures = [];
const allowed = new Set(["included_existing", "include_new_pi", "excluded_non_ai_cs", "excluded_non_pi", "excluded_historical", "excluded_industry_only", "excluded_insufficient_scope_evidence"]);

if (data.reviewedThisBatch !== 892 || data.decisions.length !== 892) failures.push(`expected 892 decisions, got ${data.decisions.length}`);
if (data.remainingUnchecked !== 0) failures.push(`remainingUnchecked is ${data.remainingUnchecked}`);
if (data.decisions.some((row) => row.decision === "pending_profile_verification")) failures.push("pending_profile_verification remains after second-round resolution");
if (data.pendingProfileResolution?.remainingPending !== 0) failures.push("pendingProfileResolution does not report zero remaining");
const keys = data.decisions.map((row) => `${row.unitUrl}:${row.rosterName.normalize("NFKD").replace(/[^a-z0-9\p{Script=Han}]/giu, "").toLowerCase()}`);
if (new Set(keys).size !== keys.length) failures.push("duplicate rosterName+unitUrl keys");
for (const row of data.decisions) {
  if (!allowed.has(row.decision)) failures.push(`${row.rosterName}: invalid decision ${row.decision}`);
  if (!row.officialId) failures.push(`${row.rosterName}: missing officialId`);
  if (!row.evidenceUrl?.startsWith("http")) failures.push(`${row.rosterName}: missing direct evidence URL`);
  if (!row.sourcePageUrl?.startsWith("http")) failures.push(`${row.rosterName}: missing official roster URL`);
  if (!row.reason || row.reason.length < 20) failures.push(`${row.rosterName}: reason is not specific`);
  if (row.decision === "included_existing" && !row.atlasPersonId) failures.push(`${row.rosterName}: included_existing lacks atlasPersonId`);
}

const adapterBundle = "/private/tmp/hk-sg-remaining-roster-audits-2026.mjs";
await build({ entryPoints: [path.join(root, "app/hk-sg-remaining-roster-audits-2026.ts")], outfile: adapterBundle, bundle: true, platform: "node", format: "esm", logLevel: "silent" });
const adapter = await import(`${pathToFileURL(adapterBundle).href}?v=${Date.now()}`);
if (adapter.hkSgRemainingRosterAudits2026.length !== 902) failures.push("adapter does not export 892 resolved rows plus 10 preserved baseline audits");

const unitReviewed = data.units.reduce((sum, unit) => sum + unit.reviewedThisBatch, 0);
const unitFrozen = data.units.reduce((sum, unit) => sum + unit.frozenCount, 0);
const unitPrior = data.units.reduce((sum, unit) => sum + unit.previouslyChecked, 0);
if (unitReviewed !== 892) failures.push(`unit reviewed total is ${unitReviewed}`);
if (unitFrozen !== unitPrior + unitReviewed) failures.push("frozen != previous + reviewed");

if (failures.length) {
  console.error(`HK/SG remaining-roster audit failed (${failures.length}):`);
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(JSON.stringify({ status: "passed", frozen: unitFrozen, previouslyChecked: unitPrior, reviewedThisBatch: unitReviewed, remainingUnchecked: 0, counts: data.counts, units: data.units.length }, null, 2));
}
