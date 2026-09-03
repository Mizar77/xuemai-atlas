import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public/portraits/us-roster-batch2-2026");
const roster = JSON.parse(await fs.readFile(path.join(root, "data/official-rosters/utexas-cs-faculty-researchers-2026-09-02.json"), "utf8"));
const selected = new Set([
  "Adam Klivans", "Amy Zhang", "Chenfeng Xu", "David Harwath", "Elias Stengel-Eskin",
  "Georgios Pavlakos", "Inderjit Dhillon", "Joydeep Biswas", "Kevin Tian", "Matthew Lease",
  "Noah Golowich", "Qixing Huang", "Sanjay Shakkottai", "Sujay Sanghavi", "Yan Leng",
]);

await fs.mkdir(outputDir, { recursive: true });
for (const person of roster.people.filter((row) => selected.has(row.name))) {
  const response = await fetch(person.portraitUrl, { redirect: "follow" });
  if (!response.ok) throw new Error(`${person.name}: portrait download failed (${response.status})`);
  const input = Buffer.from(await response.arrayBuffer());
  const output = path.join(outputDir, `${person.officialId}.jpg`);
  await sharp(input)
    .rotate()
    .resize(512, 512, { fit: "cover", position: "attention" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(output);
  const metadata = await sharp(output).metadata();
  if (metadata.width !== 512 || metadata.height !== 512) throw new Error(`${person.name}: portrait is not 512x512`);
  console.log(`${person.name}\t${path.relative(root, output)}\t${metadata.width}x${metadata.height}`);
}
