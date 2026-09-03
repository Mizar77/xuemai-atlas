import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { build } from "esbuild";

const root = process.cwd();
const decisionFile = "data/roster-decisions/europe-frozen-tail-eligible97-final-2026-09-03.json";
const profileFile = "data/roster-decisions/europe-frozen-tail-eligible97-profile-evidence-2026-09-03.json";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function loadExpansion() {
  const result = await build({
    stdin: {
      contents: 'export { europeFrozenTailPiExpansion2People } from "./app/europe-frozen-tail-pi-expansion-2";',
      resolveDir: root,
      sourcefile: "europe-tail2-audit.ts",
      loader: "ts",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    write: false,
    logLevel: "silent",
  });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
}

const decisions = JSON.parse(fs.readFileSync(path.join(root, decisionFile), "utf8"));
const profiles = JSON.parse(fs.readFileSync(path.join(root, profileFile), "utf8"));
const { europeFrozenTailPiExpansion2People: people } = await loadExpansion();

assert(decisions.finalDecisionCount === 97 && decisions.decisions.length === 97, "Expected 97 final decisions");
assert(decisions.pendingCount === 0, "Eligible tail still has pending decisions");
assert(decisions.decisions.every((row) => row.priorDecision === "eligible_future_batch" && row.decision === "include_new_pi"), "Decision transition invalid");
const publishableProfiles = profiles.records.filter((row) => row.status === "ready" && row.publicationStatus === "ready" && row.education?.status === "verified");
const blockedProfiles = profiles.records.filter((row) => row.publicationStatus !== "ready");
assert(profiles.recordCount === 97, "Expected 97 profile audit records");
assert(profiles.educationVerifiedCount === publishableProfiles.length, "Education verified count mismatch");
assert(profiles.publicationReadyCount === publishableProfiles.length, "Publication-ready count mismatch");
assert(profiles.publicationBlockedCount === blockedProfiles.length, "Publication blocker count mismatch");
assert(people.length === publishableProfiles.length, "Expansion module must contain only education-and-portrait verified people");
assert(new Set(people.map((person) => person.id)).size === people.length, "Duplicate person id");
assert(new Set(people.map((person) => person.name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase())).size === people.length, "Duplicate person name");

const hashes = [];
for (const person of people) {
  assert(person.sources?.length >= 2, `${person.name}: fewer than two public sources`);
  assert(person.facts?.length >= 3, `${person.name}: fewer than three facts`);
  const education = person.facts?.find((fact) => fact.label === "教育与学术训练");
  assert(education?.value && education.value.length >= 20, `${person.name}: missing exact education fact`);
  assert(education?.source?.url && /education|academic training|degree|doctoral|postdoctoral/i.test(education.source.supports ?? ""), `${person.name}: education source does not support education/training`);
  assert(person.summary?.length >= 25, `${person.name}: summary too short`);
  assert(person.portrait?.src && person.portrait.source?.url, `${person.name}: portrait evidence missing`);
  const portraitPath = path.join(root, "public", person.portrait.src);
  assert(fs.existsSync(portraitPath), `${person.name}: portrait file missing`);
  const metadata = await sharp(portraitPath).metadata();
  assert(metadata.width === 512 && metadata.height === 512 && metadata.format === "webp", `${person.name}: portrait must be 512x512 WebP`);
  hashes.push(crypto.createHash("sha256").update(fs.readFileSync(portraitPath)).digest("hex"));
}
assert(new Set(hashes).size === hashes.length, "Duplicate portrait binary found");

const unitCounts = Object.fromEntries(Object.entries(decisions.unitCounts).map(([unitId, expected]) => [
  unitId,
  {
    decided: expected,
    ready: people.filter((person) => ({ TUM: "tum-cit", Aalto: "aalto-cs", Surrey: "surrey-pai", Edinburgh: "edinburgh-informatics" })[person.institution] === unitId).length,
    blocked: profiles.records.filter((row) => row.unitId === unitId && row.publicationStatus !== "ready").length,
  },
]));
assert(Object.values(unitCounts).every((count) => count.decided === count.ready + count.blocked), "Unit counts do not match");

console.log(JSON.stringify({
  status: blockedProfiles.length ? "PASS_WITH_DOCUMENTED_BLOCKERS" : "PASS",
  finalDecisions: 97,
  pending: 0,
  portraitReadyProfiles: profiles.readyCount,
  publicationReadyProfiles: publishableProfiles.length,
  blockers: blockedProfiles.map((row) => ({ name: row.name, status: row.publicationStatus, blocker: row.publicationBlocker })),
  validatedPortraits: hashes.length,
  expansionPeople: people.length,
  unitCounts,
}, null, 2));
