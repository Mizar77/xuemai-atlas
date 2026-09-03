import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { build } from "esbuild";

const root = process.cwd();
const entry = path.join(root, "app/uiuc-existing-profile-enhancements-2026.ts");
const outfile = "/private/tmp/audit-uiuc-existing-profile-enhancements.mjs";

await build({ entryPoints: [entry], outfile, bundle: true, platform: "node", format: "esm", logLevel: "silent" });
const exportedData = await import(`file://${outfile}?t=${Date.now()}`);
const enhancements = exportedData.uiucExistingProfileEnhancements2026;
const portraits = exportedData.uiucExistingProfilePortraits2026;
const expected = ["julia-hockenmaier-lineage", "chengxiang-zhai-lineage"];

const failures = [];
if (JSON.stringify(Object.keys(enhancements).sort()) !== JSON.stringify(expected.slice().sort())) failures.push("enhancement ID set mismatch");
if (JSON.stringify(Object.keys(portraits).sort()) !== JSON.stringify(expected.slice().sort())) failures.push("portrait ID set mismatch");

for (const id of expected) {
  const item = enhancements[id];
  if (!item) continue;
  if (item.institution !== "UIUC" || item.region !== "United States") failures.push(`${id}: current affiliation missing`);
  if (item.category !== "core" || item.stage === "historical" || item.primary !== true) failures.push(`${id}: not corrected to current core PI`);
  if (!item.summary || item.summary.length < 60) failures.push(`${id}: summary too short`);
  if (!item.facts || item.facts.length < 5) failures.push(`${id}: fewer than five facts`);
  if (!item.sources || item.sources.length < 3) failures.push(`${id}: fewer than three first-party sources`);
  if (item.sources?.some((s) => !["official", "profile", "cv", "thesis"].includes(s.kind))) failures.push(`${id}: non-first-party source kind`);
  if (!item.portrait || item.portrait.src !== portraits[id]?.src) failures.push(`${id}: portrait map mismatch`);

  const imagePath = path.join(root, "public", portraits[id].src);
  if (!fs.existsSync(imagePath)) {
    failures.push(`${id}: local portrait missing`);
  } else {
    const metadata = await sharp(imagePath).metadata();
    if (metadata.width !== 512 || metadata.height !== 512 || metadata.format !== "jpeg") failures.push(`${id}: portrait must be 512x512 JPEG`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({ enhancements: expected.length, portraits: expected.length, facts: expected.map((id) => enhancements[id].facts.length), qa: "pass" }, null, 2));
