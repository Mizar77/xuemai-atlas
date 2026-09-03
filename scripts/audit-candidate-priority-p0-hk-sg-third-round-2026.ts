import fs from "node:fs";
import path from "node:path";
import { People, Relationships, RosterPromotions, SupportingPeople } from "../app/candidate-priority-p0-hk-sg-third-round-batch-2026.ts";

const root = process.cwd();
const ledgerPath = path.join(root, "data/candidate-priority-p0-hk-sg-third-round-disposition-2026-09-03.json");
const priorPath = path.join(root, "data/candidate-priority-p0-hk-sg-second-round-disposition-2026-09-03.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const prior = JSON.parse(fs.readFileSync(priorPath, "utf8"));
const failures: string[] = [];
type Row = { canonicalKey: string; name: string; region: string; disposition: string; atlasPersonId?: string; reason?: string; localPortrait?: string | null };

const expected = (prior.records as Row[]).filter((row) => row.disposition === "missing_relationship");
const rows = ledger.records as Row[];
if (expected.length !== 189) failures.push(`prior missing_relationship expected 189, found ${expected.length}`);
if (rows.length !== 189 || ledger.reviewed !== 189) failures.push(`third-round ledger expected 189, found ${rows.length}`);
const expectedKeys = new Set(expected.map((row) => row.canonicalKey));
const keys = rows.map((row) => row.canonicalKey);
if (new Set(keys).size !== keys.length) failures.push("duplicate canonical keys in third-round ledger");
for (const key of keys) if (!expectedKeys.has(key)) failures.push(`unexpected third-round key: ${key}`);
for (const key of expectedKeys) if (!keys.includes(key)) failures.push(`omitted prior key: ${key}`);

const expectedCounts: Record<string, number> = { ready: 16, missing_relationship: 171, exclude_non_independent: 1, exclude_out_of_scope: 1 };
for (const [status, count] of Object.entries(expectedCounts)) {
  const actual = rows.filter((row) => row.disposition === status).length;
  if (actual !== count) failures.push(`${status}: expected ${count}, found ${actual}`);
}
if (People.length !== 16) failures.push(`expected 16 new PI objects, found ${People.length}`);
if (RosterPromotions.length !== 16) failures.push(`expected 16 promotions, found ${RosterPromotions.length}`);

const peopleById = new Map(People.map((person) => [person.id, person]));
const supportIds = new Set(SupportingPeople.map((person) => person.id));
const allowedExisting = new Set(["jing-jiang", "aixin-sun", "david-hsu-nus", "ernest-chong-sutd-p0-r2"]);
const readyRows = rows.filter((row) => row.disposition === "ready");

function pngSize(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const row of rows) if (!row.reason) failures.push(`${row.canonicalKey}: missing disposition reason`);
for (const row of readyRows) {
  const person = peopleById.get(row.atlasPersonId ?? "");
  if (!person) { failures.push(`${row.canonicalKey}: ready row lacks person object`); continue; }
  if (!person.primary || !person.status?.includes("current independent PI")) failures.push(`${person.id}: not current independent PI`);
  if (person.sources.length < 2) failures.push(`${person.id}: fewer than two sources`);
  if (!person.facts || person.facts.length < 3 || person.facts.length > 5) failures.push(`${person.id}: facts outside 3-5`);
  if (!person.facts?.some((item) => /教育|学术训练/.test(item.label))) failures.push(`${person.id}: missing education fact`);
  if (person.facts?.some((item) => !item.source?.url)) failures.push(`${person.id}: unsourced fact`);
  if (!person.portrait?.src || /placeholder/i.test(person.portrait.src)) failures.push(`${person.id}: missing portrait`);
  if (person.portrait?.src) {
    const fullPath = path.join(root, "public", person.portrait.src);
    if (!fs.existsSync(fullPath)) failures.push(`${person.id}: portrait file missing`);
    else {
      const size = pngSize(fullPath);
      if (!size || size.width !== 512 || size.height !== 512) failures.push(`${person.id}: portrait not 512x512 PNG`);
    }
  }
  const edges = Relationships.filter((edge) => edge.from === person.id || edge.to === person.id);
  if (!edges.length) failures.push(`${person.id}: no relationship edge`);
  if (edges.some((edge) => !edge.verified || !edge.source?.url || !edge.evidenceObject)) failures.push(`${person.id}: incomplete relationship evidence`);
}

const endpoints = new Set([...peopleById.keys(), ...supportIds, ...allowedExisting]);
for (const edge of Relationships) {
  if (!endpoints.has(edge.from)) failures.push(`${edge.id}: unresolved from ${edge.from}`);
  if (!endpoints.has(edge.to)) failures.push(`${edge.id}: unresolved to ${edge.to}`);
}
for (const promotion of RosterPromotions) if (!peopleById.has(promotion.atlasPersonId)) failures.push(`promotion points to missing person: ${promotion.atlasPersonId}`);

const result = {
  ok: failures.length === 0,
  reviewed: rows.length,
  dispositionCounts: ledger.dispositionCounts,
  regionCounts: ledger.regionCounts,
  priorityLocalPortraitReviewed: ledger.priorityLocalPortraitReviewed,
  newPeople: People.length,
  supportingPeople: SupportingPeople.length,
  relationships: Relationships.length,
  rosterPromotions: RosterPromotions.length,
  failures,
};
const outputPath = path.join(root, "data/candidate-priority-p0-hk-sg-third-round-audit-2026-09-03.json");
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
