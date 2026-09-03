import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.join(process.cwd(), "public/portraits/us-canada-remaining-priority-2026");
const targets = [
  ["dinesh-manocha", "https://www.umiacs.umd.edu/sites/default/files/styles/optimized/public/Dinesh%20Manocha-Hallway-med%202_0.jpg.webp?itok=lyLXpR_v"],
  ["tom-goldstein", "https://www.cs.umd.edu/sites/default/files/styles/thumbnail/public/images/userpictures/good2_wide_edit_crop_1.jpg?itok=WWIQZE7I&c=31bede39b717b3f42b1307d45f57e540"],
  ["yiannis-aloimonos", "https://www.cs.umd.edu/sites/default/files/styles/thumbnail/public/images/userpictures/John%20Aloimonos.jpg?itok=YuhsCK5A&c=ca7af2ca2800a2c42d8a4113f182c35c"],
  ["rene-vidal", "https://www.grasp.upenn.edu/wp-content/uploads/2023/05/Vidal_Rene_Photo-e1666973953718.jpg"],
  ["kai-wei-chang", "https://samueli.ucla.edu/wp-content/uploads/samueli/Kai_Wei_Chang-300x200.jpg"],
  ["sharon-li", "https://www.cs.wisc.edu/wp-content/uploads/sites/166/2020/06/Sharon-Li-150-x-190-1.png"],
  ["yan-liu", "https://viterbi.usc.edu/directory/images/1146c398529ee3df7e21f45c58e4dcb6.jpg"],
  ["bistra-dilkina", "https://viterbi.usc.edu/directory/images/bdd4e95b0bf1b5acde4ae9000008da8d.png"],
  ["yanjun-qi", "https://med.virginia.edu/faculty/wp-content/uploads/sites/45/2025/06/yq2h.jpeg"],
  ["stefanos-nikolaidis", "https://viterbi.usc.edu/directory/images/57eb30277f47b209688f8be04697cf3d.jpg"],
  ["carla-gomes", "https://www.cs.cornell.edu/sites/default/files/styles/people_directory/public/2025-09/gomes-aaai-fp-2021.png?h=d1cb525d&itok=bt-VL8Dx"],
  ["siddhartha-srinivasa", "https://www.cs.washington.edu/wp-content/uploads/2024/08/portrait-siddhartha-srinivasa.jpg"],
];

await fs.mkdir(outputDir, { recursive: true });
for (const [id, url] of targets) {
  const response = await fetch(url, { headers: { "user-agent": "xuemai-atlas-research/1.0" } });
  if (!response.ok) throw new Error(`${id}: ${response.status} ${response.statusText}`);
  const input = Buffer.from(await response.arrayBuffer());
  await sharp(input).resize(512, 512, { fit: "cover", position: "attention" }).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(outputDir, `${id}.jpg`));
}
console.log(`Downloaded and normalized ${targets.length} official portraits.`);
