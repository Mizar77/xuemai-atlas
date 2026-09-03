import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-fourth-round-disposition-2026-09-03.json"), "utf8"));
const review = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-fourth-round-batch-1-review-2026-09-03.json"), "utf8"));
const expected = { total: 26, ready: 17, missingProfileFactsAndRelationship: 7, missingPortrait: 2, unresolvedWithoutDisposition: 0 };
const errors = [];

for (const [key, value] of Object.entries(expected)) if (ledger.counts?.[key] !== value) errors.push(`${key}: expected ${value}, found ${ledger.counts?.[key]}`);
if (ledger.records?.length !== expected.total) errors.push(`records: expected ${expected.total}, found ${ledger.records?.length}`);
if (new Set(ledger.records?.map((row) => row.canonicalKey)).size !== expected.total) errors.push("canonical keys are not unique");
const readyMap = new Map(review.records.map((row) => [row.canonicalKey, row.atlasPersonId]));
if (readyMap.size !== expected.ready) errors.push(`review ready count: expected ${expected.ready}, found ${readyMap.size}`);

for (const row of ledger.records ?? []) {
  if (row.disposition === "ready") {
    if (!row.atlasPersonId || row.blocker) errors.push(`${row.canonicalKey}: invalid ready record`);
    if (readyMap.get(row.canonicalKey) !== row.atlasPersonId) errors.push(`${row.canonicalKey}: batch review mismatch`);
  } else if (!row.blocker || !Array.isArray(row.fourthRoundRequiredEvidence) || row.fourthRoundRequiredEvidence.length === 0) {
    errors.push(`${row.canonicalKey}: blocked record lacks explicit gap`);
  }
}

const institutionTotal = (ledger.byInstitution ?? []).reduce((sum, row) => sum + row.total, 0);
if (institutionTotal !== expected.total) errors.push(`institution total: expected ${expected.total}, found ${institutionTotal}`);
if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, counts: ledger.counts, institutions: ledger.byInstitution.length, reviewedPromotions: readyMap.size }, null, 2));
