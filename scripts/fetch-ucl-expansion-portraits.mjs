import fs from "node:fs/promises";
import path from "node:path";

const people = [
  ["9842", "david-barber"],
  ["33703", "neill-campbell"],
  ["32290", "danail-stoyanov"],
  ["102308", "lorenzo-jamone"],
  ["73094", "dimitrios-kanoulas"],
  ["42716", "vasileios-lampos"],
  ["19058", "mirco-musolesi"],
  ["857", "massimiliano-pontil"],
  ["10973", "john-shawe-taylor"],
  ["4850", "marta-betcke"],
  ["770", "ivana-drobnjak"],
  ["838", "ann-blandford"],
];

const outDir = path.resolve("public/portraits/europe-c-ucl-roster-2026");
await fs.mkdir(outDir, { recursive: true });

for (const [officialId, slug] of people) {
  const url = `https://profiles.ucl.ac.uk/api/users/${officialId}/thumbnail`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${officialId}: HTTP ${response.status}`);
  const payload = await response.json();
  if (typeof payload.thumbnail !== "string" || payload.thumbnail.length < 1000) {
    throw new Error(`${officialId}: missing/short thumbnail payload`);
  }
  const image = Buffer.from(payload.thumbnail.replace(/^data:image\/[^;]+;base64,/, ""), "base64");
  const isPng = image.length > 1000 && image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isJpeg = image.length > 1000 && image[0] === 0xff && image[1] === 0xd8;
  const isWebp = image.length > 1000 && image.subarray(0, 4).toString("ascii") === "RIFF" && image.subarray(8, 12).toString("ascii") === "WEBP";
  if (!isPng && !isJpeg && !isWebp) throw new Error(`${officialId}: unsupported thumbnail format`);
  const extension = isPng ? "png" : isJpeg ? "jpg" : "webp";
  await fs.writeFile(path.join(outDir, `${slug}.${extension}`), image);
}

console.log(`Downloaded ${people.length} verified UCL profile thumbnails to ${outDir}`);
