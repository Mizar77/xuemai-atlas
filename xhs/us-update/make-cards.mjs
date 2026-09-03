import { mkdir, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(fileURLToPath(import.meta.url));
const rawDir = join(root, "raw");
const svgDir = join(root, "svg");
const cardsDir = join(root, "cards");

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

function lineText(lines, x, y, size, gap, className = "") {
  return `<text x="${x}" y="${y}" font-size="${size}" class="${className}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? gap : 0}">${esc(line)}</tspan>`).join("")}</text>`;
}

async function cover() {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1242" height="1656" viewBox="0 0 1242 1656">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#102038" stop-opacity=".98"/>
      <stop offset=".35" stop-color="#102038" stop-opacity=".86"/>
      <stop offset=".67" stop-color="#102038" stop-opacity=".28"/>
      <stop offset="1" stop-color="#102038" stop-opacity=".96"/>
    </linearGradient>
    <style>.font{font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Noto Sans SC',sans-serif}.heavy{font-weight:900}.bold{font-weight:750}</style>
  </defs>
  <rect width="1242" height="1656" fill="url(#shade)"/>
  <rect x="78" y="80" width="490" height="58" rx="29" fill="none" stroke="#c7f36b" stroke-opacity=".82"/>
  <text x="105" y="118" font-size="20" letter-spacing="3" fill="#c7f36b" class="font heavy">AI · NLP · LLM ACADEMIC ATLAS</text>
  <g fill="#ffffff">${lineText(["学术图谱", "更新啦"], 78, 305, 114, 122, "font heavy")}</g>
  <text x="78" y="595" font-size="38" fill="#f4f6f1" class="font bold">覆盖中 · 美 · 新 · 港</text>
  <line x1="78" y1="1474" x2="1164" y2="1474" stroke="#ffffff" stroke-opacity=".34"/>
  <text x="78" y="1530" font-size="28" fill="#ffffff" class="font heavy">学脉 Atlas</text>
  <text x="78" y="1572" font-size="20" fill="#d2dcd1" class="font">mizar77.github.io/xuemai-atlas/</text>
  <circle cx="1118" cy="1535" r="47" fill="#c7f36b"/><text x="1118" y="1552" text-anchor="middle" font-size="38" fill="#102038" class="font heavy">脉</text>
  </svg>`;
}

async function standard(spec) {
  const shotY = spec.shotY ?? 380;
  const shotH = spec.shotH ?? 850;
  const pointY = shotY + shotH + 42;
  const chips = spec.points.map((point, index) => {
    const widths = [180, 230, 265];
    const width = widths[index] ?? 220;
    const x = 66 + spec.points.slice(0, index).reduce((sum, _, i) => sum + widths[i] + 16, 0);
    const fill = index % 2 ? "#e4ebde" : "#102038";
    const color = index % 2 ? "#102038" : "#ffffff";
    return `<rect x="${x}" y="${pointY}" width="${width}" height="58" rx="29" fill="${fill}"/><text x="${x + width / 2}" y="${pointY + 38}" text-anchor="middle" font-size="21" fill="${color}" class="font heavy">${esc(point)}</text>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1242" height="1656" viewBox="0 0 1242 1656">
  <defs>
    <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f9fbf6"/><stop offset="1" stop-color="#eff3eb"/></linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%"><feDropShadow dx="15" dy="18" stdDeviation="0" flood-color="#275ee6" flood-opacity=".08"/></filter>
    <clipPath id="clip"><rect x="66" y="${shotY}" width="1110" height="${shotH}" rx="24"/></clipPath>
    <style>.font{font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Noto Sans SC',sans-serif}.heavy{font-weight:900}.bold{font-weight:700}</style>
  </defs>
  <rect width="1242" height="1656" fill="url(#paper)"/>
  <text x="66" y="92" font-size="19" letter-spacing="3" fill="#275ee6" class="font heavy">${esc(spec.kicker)}</text>
  <text x="1120" y="92" text-anchor="end" font-size="19" letter-spacing="2" fill="#829080" class="font heavy">${esc(spec.index)}</text>
  ${lineText(spec.title, 66, 190, 74, 80, "font heavy")}
  ${lineText(spec.subtitle, 66, spec.subtitleY ?? 320, 27, 40, "font bold")}
  <rect x="66" y="${shotY}" width="1110" height="${shotH}" rx="24" fill="#ffffff" stroke="#c8d2c6" filter="url(#shadow)"/>
  ${chips}
  <line x1="66" y1="1512" x2="1176" y2="1512" stroke="#c8d2c6"/>
  <text x="66" y="1560" font-size="23" fill="#102038" class="font heavy">${esc(spec.footerTitle ?? "学脉 Atlas")}</text>
  <text x="66" y="1600" font-size="17" fill="#6f7c73" class="font">${esc(spec.footer ?? "mizar77.github.io/xuemai-atlas/")}</text>
  <circle cx="1148" cy="1564" r="27" fill="#c7f36b"/><text x="1148" y="1575" text-anchor="middle" font-size="20" fill="#102038" class="font heavy">脉</text>
  </svg>`;
}

const cards = [
  { name: "01-cover", readyCover: true, image: "cover-atlas-four-regions.png" },
  { name: "02-regions", image: "home.png", kicker: "COVERAGE", index: "02 / 07", title: ["现在覆盖 4 个地区"], subtitle: ["中国大陆 · 香港 · 新加坡 · 美国"], shotY: 350, shotH: 700, points: ["按地区切换", "按机构索引", "来源可追溯"], fit: "slice" },
  { name: "03-singapore", image: "singapore-wenxuan.png", kicker: "PREVIOUS CHAPTER", index: "03 / 07", title: ["上一期：新加坡", "学术圈"], subtitle: ["从 NUS、NTU、SUTD、SMU 到研究机构与产业连接"], subtitleY: 360, shotY: 420, shotH: 820, points: ["师承关系", "产业连接", "独立 PI"] },
  { name: "04-new-regions", image: "updates-us-mainland-hk.png", kicker: "NEW CHAPTER", index: "04 / 07", title: ["本次新增：美国", "中国大陆、中国香港"], subtitle: ["继续补充重点机构、师承关系与学生去向"], subtitleY: 360, shotY: 420, shotH: 720, points: ["美国", "中国大陆", "中国香港"] },
  { name: "05-focus", image: "dan-klein-focus-placements.png", kicker: "RELATIONSHIP + PLACEMENTS", index: "05 / 07", title: ["点击人物，关系", "和去向一起看"], subtitle: ["师承、合作关系，以及学生进入公司的公开职业去向"], subtitleY: 360, shotY: 420, shotH: 820, points: ["师承关系", "合作网络", "学生去向"] },
  { name: "06-companies", image: "company-google.png", kicker: "COMPANY-CENTERED GRAPH", index: "06 / 07", title: ["也可以从公司", "反向查"], subtitle: ["查看一家公司里分别有哪些老师的学生"], subtitleY: 360, shotY: 420, shotH: 820, points: ["导师", "学生", "公司部门"], footerTitle: "网页  mizar77.github.io/xuemai-atlas/", footer: "Repo  github.com/Mizar77/xuemai-atlas" },
  { name: "07-contribute", image: "feedback-drawer.png", kicker: "COMMUNITY CONTRIBUTION", index: "07 / 07", title: ["欢迎一起补全"], subtitle: ["网页 Comment、GitHub Issue / PR，或者给 Repo 一个 Star"], shotY: 350, shotH: 880, points: ["Comment", "Issue · PR", "Star ⭐"], footerTitle: "每条有来源的反馈都很重要", footer: "github.com/Mizar77/xuemai-atlas" },
];

await mkdir(svgDir, { recursive: true });
await mkdir(cardsDir, { recursive: true });
for (const card of cards) {
  const pngPath = join(cardsDir, `${basename(card.name)}.png`);
  if (card.readyCover) {
    await sharp(join(rawDir, card.image))
      .resize(1242, 1656, { fit: "cover", position: "centre" })
      .png()
      .toFile(pngPath);
    continue;
  }
  const output = card.cover ? await cover(card) : await standard(card);
  const svgPath = join(svgDir, `${basename(card.name)}.svg`);
  await writeFile(svgPath, output);
  if (card.cover) {
    const background = await sharp(join(rawDir, card.image))
      .resize(1242, 1656, { fit: "cover", position: "centre" })
      .png()
      .toBuffer();
    await sharp(background)
      .composite([{ input: Buffer.from(output), left: 0, top: 0 }])
      .png()
      .toFile(pngPath);
  } else {
    const shotY = card.shotY ?? 380;
    const shotH = card.shotH ?? 850;
    const screenshot = await sharp(join(rawDir, card.image))
      .resize(1110, shotH, {
        fit: card.fit === "slice" ? "cover" : "contain",
        position: "centre",
        background: "#ffffff",
      })
      .composite([{
        input: Buffer.from(`<svg width="1110" height="${shotH}"><rect width="1110" height="${shotH}" rx="24" fill="#fff"/></svg>`),
        blend: "dest-in",
      }])
      .png()
      .toBuffer();
    await sharp(Buffer.from(output))
      .composite([{ input: screenshot, left: 66, top: shotY }])
      .png()
      .toFile(pngPath);
  }
}

console.log(`Generated ${cards.length} PNG cards in ${root}`);
