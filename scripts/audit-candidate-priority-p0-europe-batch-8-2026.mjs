import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const modulePath = path.join(root, "app/candidate-priority-p0-europe-batch-8-2026.ts");
const bundlePath = "/private/tmp/candidate-p0-europe-batch-8-2026.mjs";

execFileSync(
  path.join(root, "node_modules/.bin/esbuild"),
  [modulePath, "--bundle", "--platform=node", "--format=esm", `--outfile=${bundlePath}`],
  { stdio: "ignore" },
);
const mod = await import(`file://${bundlePath}?t=${Date.now()}`);
const { people, relationships, placements, groupMembers, rosterPromotions } = mod;

const review = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/candidate-priority-p0-europe-batch-8-review-2026-09-03.json"),
    "utf8",
  ),
);
const ledger = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/candidate-priority-p0-europe-remaining-disposition-2026-09-03.json"),
    "utf8",
  ),
);

const errors = [];
const ids = new Set(people.map((person) => person.id));

if (people.length !== 8) errors.push(`expected 8 people, got ${people.length}`);
if (ids.size !== people.length) errors.push("duplicate person id");
if (rosterPromotions.length !== people.length) {
  errors.push(`promotion count ${rosterPromotions.length} != people ${people.length}`);
}

for (const person of people) {
  if ((person.sources ?? []).length < 2) errors.push(`${person.name}: fewer than two sources`);
  if ((person.facts ?? []).length < 3 || person.facts.length > 5) {
    errors.push(`${person.name}: facts must be 3-5`);
  }
  for (const row of person.facts ?? []) {
    if (!row.source?.url || !row.source?.supports) {
      errors.push(`${person.name}: fact ${row.label} lacks source URL/supports`);
    }
  }
  if (!person.facts?.some((row) => row.label === "教育与学术训练" && row.source?.url)) {
    errors.push(`${person.name}: missing exact sourced education fact`);
  }
  if (!person.portrait?.source?.url || !person.portrait?.source?.supports) {
    errors.push(`${person.name}: portrait source is incomplete`);
  }
  const portraitPath = path.join(root, "public", person.portrait?.src ?? "");
  if (!person.portrait?.src || !fs.existsSync(portraitPath)) {
    errors.push(`${person.name}: missing portrait`);
  } else {
    const dimensions = execFileSync(
      "sips",
      ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath],
      { encoding: "utf8" },
    );
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) {
      errors.push(`${person.name}: portrait is not 512x512`);
    }
  }
  const networkCount =
    relationships.filter((row) => row.from === person.id || row.to === person.id).length
    + placements.filter((row) => row.teacherId === person.id).length
    + groupMembers.filter((row) => row.teacherId === person.id).length;
  if (!networkCount) errors.push(`${person.name}: missing concrete network evidence`);
}

for (const edge of relationships) {
  for (const endpoint of [edge.from, edge.to]) {
    if (!ids.has(endpoint)) errors.push(`${edge.id}: unresolved endpoint ${endpoint}`);
  }
  if (!edge.verified || !edge.source?.url || !edge.evidence) {
    errors.push(`${edge.id}: relationship evidence incomplete`);
  }
}

for (const row of [...placements, ...groupMembers]) {
  if (!ids.has(row.teacherId)) errors.push(`${row.id}: unresolved teacher ${row.teacherId}`);
  if (!row.source?.url || !row.source?.supports) errors.push(`${row.id}: source incomplete`);
}

const promotionKeys = new Set();
for (const promotion of rosterPromotions) {
  const key = `${promotion.unitUrl}::${promotion.rosterName}`;
  if (promotionKeys.has(key)) errors.push(`duplicate promotion key ${key}`);
  promotionKeys.add(key);
  if (!ids.has(promotion.atlasPersonId)) errors.push(`promotion target missing ${promotion.atlasPersonId}`);
}

const normalizeName = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
for (const person of people) {
  const reviewRow = review.records.find(
    (row) => normalizeName(row.name) === normalizeName(person.name),
  );
  if (!reviewRow || reviewRow.disposition !== "ready_batch_8") {
    errors.push(`${person.name}: batch 8 review is not ready`);
  }
}

if (review.total !== 82) errors.push(`expected 82 portrait-ready cohort records, got ${review.total}`);
if (review.byDisposition.ready_batch_8 !== 8) {
  errors.push(`expected 8 batch 8 ready records, got ${review.byDisposition.ready_batch_8}`);
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  people: people.length,
  relationships: relationships.length,
  placements: placements.length,
  groupMembers: groupMembers.length,
  rosterPromotions: rosterPromotions.length,
  cohort: { total: review.total, byDisposition: review.byDisposition },
  ledger: { total: ledger.total, byDisposition: ledger.byDisposition },
}, null, 2));
