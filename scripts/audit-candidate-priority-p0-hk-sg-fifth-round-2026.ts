import fs from "node:fs";
import path from "node:path";
import { People, Relationships, RosterPromotions, SupportingPeople } from "../app/candidate-priority-p0-hk-sg-fifth-round-batch-2026.ts";

const root = process.cwd();
const masterPath = path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json");
const ledgerPath = path.join(root, "data/candidate-priority-p0-hk-sg-fifth-round-disposition-2026-09-03.json");
const master = JSON.parse(fs.readFileSync(masterPath, "utf8"));
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const failures: string[] = [];
type Row = { canonicalKey: string; name: string; region: string; disposition: string; atlasPersonId?: string; reason?: string; localPortrait?: string | null; fifthRoundPriorityReview?: boolean };

const rows = ledger.records as Row[];
if (rows.length !== 178 || ledger.reviewed !== 178) failures.push(`fifth-round ledger expected 178, found ${rows.length}`);
if (rows.filter((row) => row.fifthRoundPriorityReview).length !== 40 || ledger.fifthRoundPriorityReviewed !== 40) failures.push("fifth-round priority review must contain exactly 40 candidates");

const masterByKey = new Map((master.records as Row[]).map((row) => [row.canonicalKey, row]));
const keys = rows.map((row) => row.canonicalKey);
// The fifth-round ledger is an immutable snapshot. Candidates can be promoted by
// a later evidence round without rewriting that historical decision.
const laterPromotions = new Set(["Hong Kong:香港科技大学:chaojianli"]);
if (new Set(keys).size !== keys.length) failures.push("duplicate canonical keys in fifth-round ledger");
for (const row of rows) {
  const masterRow = masterByKey.get(row.canonicalKey);
  const expectedDisposition = laterPromotions.has(row.canonicalKey) ? "ready" : row.disposition;
  if (!masterRow) failures.push(`fifth-round key missing from master: ${row.canonicalKey}`);
  else if (masterRow.disposition !== expectedDisposition) failures.push(`${row.canonicalKey}: master disposition ${masterRow.disposition} does not match expected ${expectedDisposition}`);
}

const expectedCounts: Record<string, number> = { ready: 14, missing_relationship: 148, missing_portrait: 16 };
for (const [status, count] of Object.entries(expectedCounts)) {
  const actual = rows.filter((row) => row.disposition === status).length;
  if (actual !== count) failures.push(`${status}: expected ${count}, found ${actual}`);
}
if (People.length !== 14) failures.push(`expected 14 new PI objects, found ${People.length}`);
if (SupportingPeople.length !== 10) failures.push(`expected 10 supporting people, found ${SupportingPeople.length}`);
if (Relationships.length !== 14) failures.push(`expected 14 relationships, found ${Relationships.length}`);
if (RosterPromotions.length !== 14) failures.push(`expected 14 promotions, found ${RosterPromotions.length}`);

const peopleById = new Map(People.map((person) => [person.id, person]));
const supportIds = new Set(SupportingPeople.map((person) => person.id));
const allowedExisting = new Set(["irwin-king", "wenke-lee-p0-r4-support", "jun-sun-smu-p0-2026", "xiaoou-tang-cuhk"]);
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
  if (!row.fifthRoundPriorityReview) failures.push(`${row.canonicalKey}: ready row was not priority reviewed`);
  if (!person.primary || !person.status?.includes("current independent PI")) failures.push(`${person.id}: not current independent PI`);
  if (person.sources.length < 2) failures.push(`${person.id}: fewer than two reliable sources`);
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
  priorityReviewed: ledger.fifthRoundPriorityReviewed,
  dispositionCounts: ledger.dispositionCounts,
  regionCounts: ledger.regionCounts,
  newPeople: People.length,
  supportingPeople: SupportingPeople.length,
  relationships: Relationships.length,
  rosterPromotions: RosterPromotions.length,
  failures,
};
const outputPath = path.join(root, "data/candidate-priority-p0-hk-sg-fifth-round-audit-2026-09-03.json");
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
