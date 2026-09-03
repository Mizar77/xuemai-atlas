import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const artifact = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/candidate-priority-p0-europe-profile-attempts-2026-09-03.json"),
    "utf8",
  ),
);
const errors = [];

if (artifact.records.length !== artifact.counts.total) errors.push("record count mismatch");
if (artifact.counts.total !== 256) errors.push(`expected 256 records, got ${artifact.counts.total}`);
if (artifact.counts.officialProfile404 !== 130) {
  errors.push(`expected 130 frozen Edinburgh 404s, got ${artifact.counts.officialProfile404}`);
}

const keys = new Set();
for (const record of artifact.records) {
  if (keys.has(record.canonicalKey)) errors.push(`duplicate canonical key ${record.canonicalKey}`);
  keys.add(record.canonicalKey);
  if (!record.rosterUrl || !record.checkedSources?.length) {
    errors.push(`${record.name}: missing checked official source`);
  }
  if (!record.blockerDetail) errors.push(`${record.name}: missing blocker detail`);
  if (record.portrait.status === "verified_512") {
    const portraitPath = path.join(root, record.portrait.localPath);
    if (!fs.existsSync(portraitPath)) {
      errors.push(`${record.name}: verified portrait file missing`);
      continue;
    }
    const dimensions = execFileSync(
      "sips",
      ["-g", "pixelWidth", "-g", "pixelHeight", portraitPath],
      { encoding: "utf8" },
    );
    if (!/pixelWidth:\s+512/.test(dimensions) || !/pixelHeight:\s+512/.test(dimensions)) {
      errors.push(`${record.name}: verified portrait is not 512x512`);
    }
  }
}

const recomputed = {
  ready: artifact.records.filter((row) => row.currentDisposition === "ready").length,
  duplicate: artifact.records.filter((row) => row.currentDisposition === "duplicate").length,
  verifiedPortrait512: artifact.records.filter((row) => row.portrait.status === "verified_512").length,
  unresolvedPortrait: artifact.records.filter((row) => row.portrait.status === "unresolved").length,
  officialProfile404: artifact.records.filter((row) => row.profileFetchStatus === "official_profile_404").length,
  missingRelationship: artifact.records.filter((row) => row.currentDisposition === "missing_relationship").length,
};
for (const [key, value] of Object.entries(recomputed)) {
  if (artifact.counts[key] !== value) errors.push(`${key}: ${artifact.counts[key]} != ${value}`);
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, ...artifact.counts }, null, 2));
