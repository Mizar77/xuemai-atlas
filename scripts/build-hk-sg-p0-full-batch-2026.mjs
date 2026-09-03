import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const masterPath = path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json");
const outputPath = path.join(root, "data/candidate-priority-p0-hk-sg-full-batch-2026-09-03.json");
const master = JSON.parse(fs.readFileSync(masterPath, "utf8"));

const pending = master.records.filter((row) =>
  ["Hong Kong", "Singapore"].includes(row.region)
  && ["missing_portrait", "missing_relationship"].includes(row.disposition),
);

function relationshipCandidate(row) {
  if (row.canonicalKey === "Hong Kong:香港中文大学:sinnojialinpan") {
    return { kind: "existing_relationship", name: "Wenya Wang", endpointId: "wenya-wang", evidence: "Wenya Wang 一手主页明确记录其博士阶段由 Sinno Jialin Pan 指导；图谱已有已核验 pan-wang 师承边。" };
  }
  const text = (row.extractedEvidence?.relationshipEvidenceCandidates ?? []).join(" ").replace(/\s+/g, " ");
  let match = text.match(/Supervised Students\s+(?:Mr\.\s+|Ms\.\s+|Miss\s+)?([A-Z][A-Za-z'-]+(?:\s+[A-Z][A-Za-z'-]+)?)(?:,\s*[\u3400-\u9fff豈-﫿]+)?\s+(?:Department|School)/);
  if (match) return { kind: "student", name: match[1], evidence: `CityUHK Scholars 的 Supervised Students 栏明确列出 ${match[1]}。` };
  match = text.match(/Research Advisor\/Co-Research Advisor to\s+([A-Z][A-Za-z'-]+(?:\s+[A-Z][A-Za-z'-]+){0,2}?)(?=\s+(?:Where to find us|Videos|SENARATH|NGUYEN|YE |WU |ZHANG |JIANG |WANG |OUYANG )|\s*\()/);
  if (match) return { kind: "student", name: match[1], evidence: `SMU 官方教师页的 Research Advisor/Co-Research Advisor 栏明确列出 ${match[1]}。` };
  if (row.canonicalKey === "Singapore:Nanyang Technological University:jordanboydgraberying") {
    return { kind: "adviser", name: "David Blei", endpointId: "david-blei-foundational", evidence: "NTU 官方学术档案明确写明其 Princeton 博士阶段与 David Blei 开展研究。" };
  }
  return null;
}

const selected = pending.map((row) => ({ row, relationship: relationshipCandidate(row) })).filter((entry) => entry.relationship);
const held = pending.filter((row) => !relationshipCandidate(row));
const report = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  scope: "Hong Kong and Singapore P0 strict-gate pass using official supervised-student/adviser evidence",
  totalPendingReviewed: pending.length,
  selectedCount: selected.length,
  heldCount: held.length,
  selected: selected.map(({ row, relationship }) => ({
    canonicalKey: row.canonicalKey,
    name: row.name,
    region: row.region,
    institution: row.institution,
    profileUrl: row.evidenceUrls?.[0],
    rosterUrl: row.evidenceUrls?.[1],
    portraitUrl: row.portraitUrl,
    relationship,
    pageTitle: row.extractedEvidence?.pageTitle,
    metaDescription: row.extractedEvidence?.metaDescription,
    evidenceText: (row.extractedEvidence?.relationshipEvidenceCandidates ?? []).join(" ").replace(/\s+/g, " "),
  })),
  held: held.map((row) => ({
    canonicalKey: row.canonicalKey,
    name: row.name,
    region: row.region,
    institution: row.institution,
    disposition: row.disposition,
    reason: row.reason,
  })),
};
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, totalPendingReviewed: pending.length, selected: selected.length, held: held.length }, null, 2));
