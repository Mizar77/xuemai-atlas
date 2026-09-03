import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const previous = JSON.parse(
  fs.readFileSync(
    path.join(root, "data/candidate-priority-p0-europe-batch-7-review-2026-09-03.json"),
    "utf8",
  ),
);

const readyNames = new Set([
  "Edouard Bugnion",
  "Nicholas Lane",
  "Frank Stajano",
  "Alastair Beresford",
  "Anil Madhavapeddy",
  "Emily Shuckburgh",
  "Peter Sewell",
  "Timothy Jones",
]);

const records = previous.records.map((row) => {
  if (!readyNames.has(row.name)) return row;
  return {
    ...row,
    disposition: "ready_batch_8",
    blocker: null,
  };
});

const byDisposition = Object.fromEntries(
  [...new Set(records.map((row) => row.disposition))]
    .sort()
    .map((key) => [key, records.filter((row) => row.disposition === key).length]),
);

const output = {
  generatedAt: "2026-09-03",
  scope: "Europe P0 portrait-ready cohort reviewed through batch 8",
  total: records.length,
  byDisposition,
  batch8ReadyNames: [...readyNames],
  records,
};

const outputPath = path.join(
  root,
  "data/candidate-priority-p0-europe-batch-8-review-2026-09-03.json",
);
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: records.length, byDisposition }, null, 2));
