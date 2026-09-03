import fs from "node:fs";
import path from "node:path";
import {
  People,
  Relationships,
  RosterPromotions,
  SupportingPeople,
} from "../app/candidate-priority-p0-hk-sg-second-round-batch-2026.ts";

const root = process.cwd();
const ledgerPath = path.join(root, "data/candidate-priority-p0-hk-sg-second-round-disposition-2026-09-03.json");
const priorPassPath = path.join(root, "data/candidate-priority-p0-hk-sg-full-batch-2026-09-03.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const priorPass = JSON.parse(fs.readFileSync(priorPassPath, "utf8"));
const failures: string[] = [];
type LedgerRow = {
  canonicalKey: string;
  region: string;
  disposition: string;
  atlasPersonId?: string;
  reason?: string;
  localPortrait?: string | null;
};

const pending = (priorPass.held as LedgerRow[]).filter((row) =>
  ["missing_portrait", "missing_relationship"].includes(row.disposition),
);
const keys = (ledger.records as LedgerRow[]).map((row) => row.canonicalKey);
if (pending.length !== 216) failures.push(`expected 216 prior-pass pending rows, found ${pending.length}`);
if (ledger.reviewed !== 216 || ledger.records.length !== 216) failures.push(`ledger does not cover all 216 rows`);
if (new Set(keys).size !== keys.length) failures.push("ledger contains duplicate canonical keys");
const priorKeys = new Set(pending.map((row) => row.canonicalKey));
for (const key of keys) if (!priorKeys.has(key)) failures.push(`ledger key not in prior-pass pending: ${key}`);
for (const row of pending) if (!keys.includes(row.canonicalKey)) failures.push(`prior-pass pending key omitted: ${row.canonicalKey}`);

const expectedCounts: Record<string, number> = { ready: 11, missing_relationship: 189, missing_portrait: 16 };
for (const [status, expected] of Object.entries(expectedCounts)) {
  const actual = (ledger.records as LedgerRow[]).filter((row) => row.disposition === status).length;
  if (actual !== expected) failures.push(`${status}: expected ${expected}, found ${actual}`);
}

const readyRows = (ledger.records as LedgerRow[]).filter((row) => row.disposition === "ready");
if (People.length !== 11) failures.push(`expected 11 new PI objects, found ${People.length}`);
if (RosterPromotions.length !== 11) failures.push(`expected 11 roster promotions, found ${RosterPromotions.length}`);
const peopleById = new Map(People.map((person) => [person.id, person]));
const supportIds = new Set(SupportingPeople.map((person) => person.id));
const allowedExistingEndpoints = new Set(["shafiq-joty", "aixin-sun"]);

function pngSize(filePath: string) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

for (const row of readyRows) {
  const person = peopleById.get(row.atlasPersonId);
  if (!person) {
    failures.push(`ready ledger row lacks person object: ${row.canonicalKey}`);
    continue;
  }
  if (!person.primary || !person.status?.includes("current independent PI")) failures.push(`${person.id}: not marked current independent PI`);
  if (person.sources.length < 2) failures.push(`${person.id}: fewer than two sources`);
  if (!person.facts || person.facts.length < 3 || person.facts.length > 5) failures.push(`${person.id}: facts outside 3–5 range`);
  if (!person.facts?.some((item) => /教育|学术训练/.test(item.label))) failures.push(`${person.id}: missing education fact`);
  if (person.facts?.some((item) => !item.source?.url)) failures.push(`${person.id}: unsourced fact`);
  if (!person.portrait?.src || /placeholder/i.test(person.portrait.src)) failures.push(`${person.id}: missing or placeholder portrait`);
  if (person.portrait?.src) {
    const portraitPath = path.join(root, "public", person.portrait.src);
    if (!fs.existsSync(portraitPath)) failures.push(`${person.id}: portrait file missing at ${portraitPath}`);
    else {
      const size = pngSize(portraitPath);
      if (!size || size.width !== 512 || size.height !== 512) failures.push(`${person.id}: portrait is not 512×512 PNG`);
    }
  }
  const related = Relationships.filter((edge) => edge.from === person.id || edge.to === person.id);
  if (!related.length) failures.push(`${person.id}: no relationship edge`);
  if (related.some((edge) => !edge.verified || !edge.source?.url || !edge.evidenceObject)) failures.push(`${person.id}: relationship lacks verified source/evidence object`);
}

const allNewIds = new Set([...peopleById.keys(), ...supportIds, ...allowedExistingEndpoints]);
for (const edge of Relationships) {
  if (!allNewIds.has(edge.from)) failures.push(`${edge.id}: missing from endpoint ${edge.from}`);
  if (!allNewIds.has(edge.to)) failures.push(`${edge.id}: missing to endpoint ${edge.to}`);
}
for (const promotion of RosterPromotions) {
  if (!peopleById.has(promotion.atlasPersonId)) failures.push(`promotion points to missing person: ${promotion.atlasPersonId}`);
}

for (const row of ledger.records) {
  if (!row.reason) failures.push(`${row.canonicalKey}: missing disposition reason`);
  if (row.localPortrait) {
    const portraitPath = path.join(root, "public", row.localPortrait);
    if (!fs.existsSync(portraitPath)) failures.push(`${row.canonicalKey}: ledger portrait missing`);
    else {
      const size = pngSize(portraitPath);
      if (!size || size.width !== 512 || size.height !== 512) failures.push(`${row.canonicalKey}: ledger portrait not 512×512 PNG`);
    }
  }
}

const result = {
  ok: failures.length === 0,
  reviewed: ledger.records.length,
  dispositionCounts: ledger.dispositionCounts,
  transitionCounts: ledger.transitionCounts,
  newPeople: People.length,
  supportingPeople: SupportingPeople.length,
  relationships: Relationships.length,
  rosterPromotions: RosterPromotions.length,
  localPortraits: (ledger.records as LedgerRow[]).filter((row) => row.localPortrait).length,
  failures,
};
const outputPath = path.join(root, "data/candidate-priority-p0-hk-sg-second-round-audit-2026-09-03.json");
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
