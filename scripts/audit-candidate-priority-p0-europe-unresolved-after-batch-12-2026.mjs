import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const artifact = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-unresolved-after-batch-12-2026-09-03.json"), "utf8"));
const errors = [];
if (artifact.total !== artifact.records.length) errors.push("total mismatch");
if (artifact.byDisposition.missing_relationship + artifact.byDisposition.missing_portrait !== artifact.total) errors.push("disposition total mismatch");
const keys = new Set();
for (const row of artifact.records) {
  if (keys.has(row.canonicalKey)) errors.push(`${row.name}: duplicate canonical key`);
  keys.add(row.canonicalKey);
  if (!row.blocker || !(row.missingDimensions?.length > 0)) errors.push(`${row.name}: missing exact blocker`);
  if (!(row.attemptedUrls?.length >= 2) || row.attemptedUrls.some((url) => !/^https?:/.test(url))) errors.push(`${row.name}: attempted URLs missing or invalid`);
}
if (errors.length) { console.error(JSON.stringify({ ok: false, errors }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ ok: true, total: artifact.total, byDisposition: artifact.byDisposition, byInstitution: artifact.byInstitution }, null, 2));
