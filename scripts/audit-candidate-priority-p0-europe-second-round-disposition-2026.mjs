import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-second-round-disposition-2026-09-03.json"), "utf8"));
const expected = { total: 164, ready: 2, missingRelationship: 2, missingProfileFactsAndRelationship: 25, missingPortrait: 7, fetchFailed: 128, unresolvedWithoutDisposition: 0 };
const errors = [];
for (const [key, value] of Object.entries(expected)) if (ledger.counts?.[key] !== value) errors.push(`${key}: expected ${value}, found ${ledger.counts?.[key]}`);
if (ledger.records?.length !== expected.total) errors.push(`records: expected ${expected.total}, found ${ledger.records?.length}`);
if (new Set(ledger.records?.map((row) => row.canonicalKey)).size !== expected.total) errors.push("canonical keys are not unique");
for (const row of ledger.records ?? []) {
  if (!row.disposition) errors.push(`${row.canonicalKey}: missing disposition`);
  if (row.disposition === "ready") {
    if (!row.atlasPersonId) errors.push(`${row.canonicalKey}: ready without atlasPersonId`);
    if (row.blocker) errors.push(`${row.canonicalKey}: ready record retains blocker`);
  } else {
    if (!row.blocker) errors.push(`${row.canonicalKey}: blocked without blocker`);
    if (!Array.isArray(row.secondRoundRequiredEvidence) || row.secondRoundRequiredEvidence.length === 0) errors.push(`${row.canonicalKey}: no explicit evidence gap`);
  }
}
const institutionTotal = (ledger.byInstitution ?? []).reduce((sum, row) => sum + row.total, 0);
if (institutionTotal !== expected.total) errors.push(`institution total: expected ${expected.total}, found ${institutionTotal}`);
if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, counts: ledger.counts, institutions: ledger.byInstitution.length }, null, 2));
