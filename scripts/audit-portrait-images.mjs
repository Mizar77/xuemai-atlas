import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import sharp from "sharp";

const root = join(process.cwd(), "public", "portraits");

function imageFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    // Candidate-research caches are retained for provenance review but are not
    // atlas portrait assets; promoted portraits live in their batch folders.
    if (entry.isDirectory() && entry.name.includes("profile-audit")) return [];
    return entry.isDirectory() ? imageFiles(path) : [path];
  }).filter((path) => [".jpg", ".jpeg", ".png", ".webp"].includes(extname(path).toLowerCase()));
}

const files = imageFiles(root);
const hashes = new Map();

for (const path of files) {
  const label = relative(process.cwd(), path);
  const { width, height } = await sharp(path).metadata();
  if (width !== 512 || height !== 512) throw new Error(`${label} must be a 512×512 square portrait; found ${width}×${height}`);
  if (statSync(path).size > 500_000) throw new Error(`${label} is larger than 500 KB`);

  const stats = await sharp(path).stats();
  const mean = stats.channels.slice(0, 3).reduce((sum, channel) => sum + channel.mean, 0) / 3;
  if (mean < 12 || mean > 248 || stats.entropy < 1.5) throw new Error(`${label} looks blank or nearly uniform (mean ${mean.toFixed(1)}, entropy ${stats.entropy.toFixed(2)})`);

  const hash = createHash("sha256").update(readFileSync(path)).digest("hex");
  const duplicate = hashes.get(hash);
  if (duplicate) throw new Error(`${label} duplicates ${duplicate}`);
  hashes.set(hash, label);
}

console.log(`Portrait image audit passed: ${files.length} square, non-blank, unique local assets.`);
