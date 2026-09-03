import fs from "node:fs";
import path from "node:path";

const artifactPath = path.join(process.cwd(), "data/candidate-priority-p0-europe-unresolved-after-batch-13-2026-09-03.json");
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const errors = [];
if (artifact.total !== artifact.records.length) errors.push("total does not match records length");
const unique = new Set(artifact.records.map((row) => row.canonicalKey));
if (unique.size !== artifact.records.length) errors.push("duplicate canonicalKey in unresolved records");
for (const row of artifact.records) {
  if (!["missing_relationship", "missing_portrait"].includes(row.disposition)) errors.push(`${row.name}: invalid unresolved disposition`);
  if (!(row.attemptedUrls ?? []).length) errors.push(`${row.name}: missing attempted URLs`);
  if (!(row.missingDimensions ?? []).length) errors.push(`${row.name}: missing exact dimensions`);
  if (!row.blocker) errors.push(`${row.name}: missing blocker detail`);
}
const relationshipCount = artifact.records.filter((row) => row.disposition === "missing_relationship").length;
const portraitCount = artifact.records.filter((row) => row.disposition === "missing_portrait").length;
if (relationshipCount !== artifact.byDisposition.missing_relationship) errors.push("missing_relationship count mismatch");
if (portraitCount !== artifact.byDisposition.missing_portrait) errors.push("missing_portrait count mismatch");
if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, total: artifact.total, byDisposition: artifact.byDisposition, byInstitution: artifact.byInstitution }, null, 2));
