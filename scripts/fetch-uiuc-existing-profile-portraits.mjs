import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public/portraits/uiuc-existing-profile-2026");

const targets = [
  {
    id: "julia-hockenmaier-lineage",
    url: "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=4957&s=400&type=portrait",
  },
  {
    id: "chengxiang-zhai-lineage",
    url: "https://ws.engr.illinois.edu/directory/viewphoto.aspx?id=4933&s=400&type=portrait",
  },
];

await fs.mkdir(outputDir, { recursive: true });

for (const target of targets) {
  const response = await fetch(target.url);
  if (!response.ok) throw new Error(`${target.id}: ${response.status} ${response.statusText}`);
  const input = Buffer.from(await response.arrayBuffer());
  await sharp(input)
    .resize(512, 512, { fit: "cover", position: "attention" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(outputDir, `${target.id}.jpg`));
}

console.log(`Downloaded and normalized ${targets.length} UIUC portraits.`);
