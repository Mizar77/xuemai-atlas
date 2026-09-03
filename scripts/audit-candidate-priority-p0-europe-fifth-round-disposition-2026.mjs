import fs from "node:fs";

const ledger = JSON.parse(fs.readFileSync("data/candidate-priority-p0-europe-fifth-round-disposition-2026-09-03.json", "utf8"));
const master = JSON.parse(fs.readFileSync("data/candidate-priority-p0-master-disposition-2026-09-03.json", "utf8"));
const errors = [];
const counts = ledger.records.reduce((acc, row) => ((acc[row.disposition] = (acc[row.disposition] ?? 0) + 1), acc), {});
const expected = { ready: 15, duplicate: 1, missing_portrait: 24 };

if (ledger.records.length !== 40 || ledger.counts.total !== 40) errors.push("ledger does not cover exactly 40 candidates");
for (const [key, value] of Object.entries(expected)) if ((counts[key] ?? 0) !== value) errors.push(`${key}: expected ${value}, got ${counts[key] ?? 0}`);
if (ledger.counts.ready !== 15 || ledger.counts.duplicate !== 1 || ledger.counts.missingPortrait !== 24 || ledger.counts.unresolvedWithoutDisposition !== 0) errors.push("declared counts mismatch");
if (new Set(ledger.records.map((row) => row.canonicalKey)).size !== ledger.records.length) errors.push("duplicate canonicalKey");
for (const row of ledger.records) {
  const source = master.records.find((candidate) => candidate.canonicalKey === row.canonicalKey);
  if (!source) errors.push(`${row.name}: absent from master P0 disposition`);
  if (!row.reason) errors.push(`${row.name}: missing explicit reason`);
  if (row.disposition === "ready" && !row.atlasPersonId) errors.push(`${row.name}: ready without atlasPersonId`);
  if (row.disposition === "missing_portrait" && row.atlasPersonId !== null) errors.push(`${row.name}: blocked candidate unexpectedly has atlasPersonId`);
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, total: ledger.records.length, dispositions: counts, unresolvedWithoutDisposition: 0 }, null, 2));
