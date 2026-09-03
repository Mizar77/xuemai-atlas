import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-third-round-disposition-2026-09-03.json"), "utf8"));
const review = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-third-round-batch-1-review-2026-09-03.json"), "utf8"));
const expected = { total: 162, ready: 8, missingRelationship: 0, missingProfileFactsAndRelationship: 23, missingPortrait: 3, fetchFailed: 128, unresolvedWithoutDisposition: 0 };
const errors = [];

for (const [key, value] of Object.entries(expected)) if (ledger.counts?.[key] !== value) errors.push(`${key}: expected ${value}, found ${ledger.counts?.[key]}`);
if (ledger.records?.length !== expected.total) errors.push(`records: expected ${expected.total}, found ${ledger.records?.length}`);
if (new Set(ledger.records?.map((row) => row.canonicalKey)).size !== expected.total) errors.push("canonical keys are not unique");

const reviewMap = new Map(review.records.map((row) => [row.canonicalKey, row.atlasPersonId]));
for (const row of ledger.records ?? []) {
  if (!row.disposition) errors.push(`${row.canonicalKey}: missing disposition`);
  if (row.disposition === "ready") {
    if (!row.atlasPersonId) errors.push(`${row.canonicalKey}: ready without atlasPersonId`);
    if (row.blocker) errors.push(`${row.canonicalKey}: ready record retains blocker`);
    if (reviewMap.get(row.canonicalKey) !== row.atlasPersonId) errors.push(`${row.canonicalKey}: ready record does not match batch review`);
  } else {
    if (!row.blocker) errors.push(`${row.canonicalKey}: blocked without blocker`);
    if (!Array.isArray(row.thirdRoundRequiredEvidence) || row.thirdRoundRequiredEvidence.length === 0) errors.push(`${row.canonicalKey}: no explicit third-round evidence gap`);
  }
}

if (reviewMap.size !== expected.ready) errors.push(`batch review ready count: expected ${expected.ready}, found ${reviewMap.size}`);
for (const [canonicalKey] of reviewMap) if (!ledger.records.some((row) => row.canonicalKey === canonicalKey && row.disposition === "ready")) errors.push(`${canonicalKey}: reviewed promotion missing from ledger`);

for (const canonicalKey of ["Europe:Technical University of Munich:florianbruse", "Europe:Technical University of Munich:vspors"]) {
  const row = ledger.records.find((candidate) => candidate.canonicalKey === canonicalKey);
  if (row?.disposition !== "missing_portrait" || row?.cachedPortrait?.status !== "rejected_generic_placeholder") errors.push(`${canonicalKey}: generic portrait invalidation missing`);
}

const institutionTotal = (ledger.byInstitution ?? []).reduce((sum, row) => sum + row.total, 0);
if (institutionTotal !== expected.total) errors.push(`institution total: expected ${expected.total}, found ${institutionTotal}`);
if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, counts: ledger.counts, institutions: ledger.byInstitution.length, reviewedPromotions: reviewMap.size }, null, 2));
