import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ledger = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-europe-remaining-disposition-2026-09-03.json"), "utf8"));
const readyNames = new Set(["Ana Klimovic", "Gustavo Alonso", "David Basin", "Srdjan Čapkun", "Shweta Shinde", "Zhendong Su"]);
const records = ledger.decisions
  .filter((row) => row.disposition === "missing_relationship" || readyNames.has(row.name))
  .map((row) => readyNames.has(row.name)
    ? { ...row, batch10Disposition: "ready_batch_10", blocker: null }
    : {
        ...row,
        batch10Disposition: "blocked_missing_specific_first_party_network_evidence",
        blocker: "已核验冻结名录、官方 faculty/profile 入口与头像，但本轮仍未找到能明确到具名导师、学生、课题组成员或产业流向的第一方关系记录；不可用合著或泛化团队描述替代。",
        attemptedUrls: row.evidenceUrls,
      });
const byDisposition = Object.fromEntries([...new Set(records.map((row) => row.batch10Disposition))].sort().map((key) => [key, records.filter((row) => row.batch10Disposition === key).length]));
const output = { generatedAt: "2026-09-03", scope: "Europe P0 relationship-first review through batch 10", total: records.length, byDisposition, readyNames: [...readyNames], records };
const outputPath = path.join(root, "data/candidate-priority-p0-europe-batch-10-review-2026-09-03.json");
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: records.length, byDisposition }, null, 2));
