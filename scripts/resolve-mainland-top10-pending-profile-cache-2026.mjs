import { readFile, writeFile } from "node:fs/promises";

const decisionPath = "data/roster-decisions/mainland-top10-tail-2026-09-03.json";
const cacheDirectory = "/private/tmp/xuemai-mainland-top10-pending-profiles";
const file = JSON.parse(await readFile(decisionPath, "utf8"));

function decode(value) {
  return value
    .replace(/&lt;/giu, "<")
    .replace(/&gt;/giu, ">")
    .replace(/&quot;/giu, '"')
    .replace(/&#39;|&apos;/giu, "'")
    .replace(/&nbsp;/giu, " ")
    .replace(/&amp;/giu, "&");
}

function textFromHtml(html) {
  return decode(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, " ")
    .replace(/<[^>]+>/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function meta(html, name) {
  const expressions = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, "iu"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, "iu"),
  ];
  return decode(expressions.map((expression) => html.match(expression)?.[1]).find(Boolean) ?? "").replace(/<[^>]+>/gu, " ").replace(/\s+/gu, " ").trim();
}

let resolved = 0;
const blockers = [];
for (const row of file.decisions) {
  if (row.decision !== "pending_profile_verification") continue;
  const cachePath = `${cacheDirectory}/${encodeURIComponent(row.unitUrl)}--${row.officialId}.html`;
  let html;
  try {
    html = await readFile(cachePath, "utf8");
  } catch {
    blockers.push({ name: row.name, unit: row.unitName, blocker: "profile fetch missing" });
    continue;
  }
  const columnType = meta(html, "ColumnType");
  const description = meta(html, "description");
  const pageText = textFromHtml(html);
  const namePosition = pageText.indexOf(row.name.split(/\s+/u)[0]);
  const nearby = pageText.slice(Math.max(0, namePosition), namePosition < 0 ? 600 : namePosition + 700);
  const statement = [columnType, description, nearby].filter(Boolean).join("；").slice(0, 700);

  if (row.institution === "复旦大学" && row.unitName.includes("计算与智能创新学院")) {
    blockers.push({ name: row.name, unit: row.unitName, blocker: "legacy personal URL serves only a client-side shell without profile fields" });
    continue;
  }
  if (/Retired Faculty|荣休|退休|离休/iu.test(statement)) {
    row.decision = "excluded_historical";
    row.reason = `官方个人页元数据标注“${[columnType, description].filter(Boolean).join("；").slice(0, 220)}”；据此确认为退休/历史人员，不作为现任 PI。`;
  } else if (/教授|研究员|博士生导师|博导|硕士生导师|院长|副院长|国家杰青/iu.test(statement)) {
    if (/刘宏\s+赵京东|李惠\s+鲍跃全/u.test(row.name)) {
      blockers.push({ name: row.name, unit: row.unitName, blocker: "one frozen card concatenates two people and must be split before PI alignment" });
      continue;
    }
    row.decision = "include_new_pi";
    row.reason = `官方个人页明确记载“${statement.slice(0, 260)}”；可确认其为现任教授、研究员、导师或研究团队负责人，作为 AI/CS 独立 PI 候选。`;
  } else if (/博士后|工程师|讲师|助理研究员|行政|管理/iu.test(statement)) {
    row.decision = "excluded_non_pi";
    row.reason = `官方个人页明确记载“${statement.slice(0, 260)}”；该岗位未达到独立 PI 门槛。`;
  } else {
    blockers.push({ name: row.name, unit: row.unitName, blocker: "official profile has no explicit independent-PI title" });
    continue;
  }
  row.profileEvidence = {
    url: row.profileUrl,
    checkedAt: file.checkedAt,
    extractedStatement: statement.slice(0, 500),
  };
  resolved += 1;
}

file.classification = Object.fromEntries([...new Set(file.decisions.map((row) => row.decision))].sort().map((decision) => [decision, file.decisions.filter((row) => row.decision === decision).length]));
file.pendingResolution = {
  checkedAt: file.checkedAt,
  profilesFetched: 151,
  resolved,
  remaining: blockers.length,
  blockers,
};
for (const unit of file.unitSummaries) {
  const rows = file.decisions.filter((row) => row.unitUrl === unit.unitUrl);
  unit.classification = Object.fromEntries([...new Set(rows.map((row) => row.decision))].sort().map((decision) => [decision, rows.filter((row) => row.decision === decision).length]));
}
await writeFile(decisionPath, `${JSON.stringify(file, null, 2)}\n`);
console.log(JSON.stringify({ resolved, remaining: blockers.length, classification: file.classification }, null, 2));
