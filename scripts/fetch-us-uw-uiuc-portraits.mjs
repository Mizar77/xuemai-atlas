import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public/portraits/us-uw-uiuc-2026");
const rosters = [
  JSON.parse(await fs.readFile(path.join(root, "data/official-rosters/uw-allen-school-all-faculty-2026-09-02.json"), "utf8")),
  JSON.parse(await fs.readFile(path.join(root, "data/official-rosters/uiuc-siebel-all-faculty-2026-09-02.json"), "utf8")),
];
const files = new Map([
  ["Alexander Schwing", "alexander-schwing.jpg"], ["Byron Boots", "byron-boots.jpg"],
  ["Gagandeep Singh", "gagandeep-singh.jpg"], ["Han Zhao", "han-zhao.jpg"],
  ["Huan Zhang", "huan-zhang.jpg"], ["Ira Kemelmacher-Shlizerman", "ira-kemelmacher-shlizerman.jpg"],
  ["Jiaxuan You", "jiaxuan-you.jpg"], ["Jim Rehg", "jim-rehg.jpg"],
  ["Maya Cakmak", "maya-cakmak.jpg"], ["Natasha Jaques", "natasha-jaques.jpg"],
  ["Pang Wei Koh", "pang-wei-koh.jpg"], ["Simon Shaolei Du", "simon-shaolei-du.jpg"],
  ["Steven Seitz", "steven-seitz.jpg"], ["Su-In Lee", "su-in-lee.jpg"],
  ["Yuxiong Wang", "yuxiong-wang.jpg"],
]);

const rows = rosters.flatMap((roster) => roster.people).filter((row) => files.has(row.name));
if (rows.length !== files.size) throw new Error(`Expected ${files.size} roster portraits, found ${rows.length}`);
await fs.mkdir(outputDir, { recursive: true });

for (const person of rows) {
  if (!person.portraitUrl) throw new Error(`${person.name}: missing official portrait URL`);
  const response = await fetch(person.portraitUrl, { redirect: "follow", signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${person.name}: portrait download failed (${response.status})`);
  const input = Buffer.from(await response.arrayBuffer());
  const output = path.join(outputDir, files.get(person.name));
  await sharp(input).rotate().resize(512, 512, { fit: "cover", position: "attention" }).jpeg({ quality: 88, mozjpeg: true }).toFile(output);
  const metadata = await sharp(output).metadata();
  if (metadata.width !== 512 || metadata.height !== 512 || metadata.format !== "jpeg") throw new Error(`${person.name}: invalid normalized portrait`);
  console.log(`${person.name}\t${path.relative(root, output)}\t512x512 JPEG`);
}
