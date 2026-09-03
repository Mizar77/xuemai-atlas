import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-remaining-disposition-2026-09-03.json"), "utf8"));
const unresolved = ledger.decisions
  .filter((row) => row.disposition === "missing_relationship" || row.disposition === "missing_portrait")
  .map((row) => ({
    canonicalKey: row.canonicalKey,
    name: row.name,
    institution: row.institution,
    disposition: row.disposition,
    blocker: row.disposition === "missing_relationship"
      ? "官方 roster/profile 与可靠 512×512 头像已取得；仍缺能明确到具名导师、学生、课题组成员或产业去向的第一方关系记录。现有入口不能仅凭合著推断指导或长期合作。"
      : "官方 roster/profile 已确认候选身份，但尚未取得可发布的可靠官方人物照片并验证为 512×512；人物事实、教育训练和具体网络关系仍需在头像补齐时逐条映射，不能仅把名录卡片直接发布。",
    missingDimensions: row.disposition === "missing_relationship"
      ? ["specific_first_party_network_evidence"]
      : ["verified_official_512_portrait", "manual_fact_to_source_mapping", "specific_first_party_network_evidence"],
    attemptedUrls: [...new Set([...(row.evidenceUrls ?? []), row.rosterUrl, row.profileUrl, row.portraitUrl].filter(Boolean))],
  }));
const byInstitution = Object.fromEntries([...new Set(unresolved.map((row) => row.institution))].sort().map((institution) => [institution, {
  total: unresolved.filter((row) => row.institution === institution).length,
  missingRelationship: unresolved.filter((row) => row.institution === institution && row.disposition === "missing_relationship").length,
  missingPortrait: unresolved.filter((row) => row.institution === institution && row.disposition === "missing_portrait").length,
}]));
const output = { generatedAt: "2026-09-03", scope: "Europe P0 unresolved records after ready batches 9–12", total: unresolved.length, byDisposition: {
  missing_relationship: unresolved.filter((row) => row.disposition === "missing_relationship").length,
  missing_portrait: unresolved.filter((row) => row.disposition === "missing_portrait").length,
}, byInstitution, records: unresolved };
const outputPath = path.join(root, "data/candidate-priority-p0-europe-unresolved-after-batch-12-2026-09-03.json");
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: output.total, byDisposition: output.byDisposition, byInstitution }, null, 2));
