import { build } from "esbuild";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const entry = `
  import { existsSync, statSync } from "node:fs";
  import { join } from "node:path";
  import { people, relationships } from "../app/data";
  import { thuNtuNextBatchPiExpansionPeople2026 } from "../app/thu-ntu-next-batch-pi-expansion-2026";
  import { asiaPendingResolutionPiExpansionPeople2026 } from "../app/asia-pending-resolution-pi-expansion-2026";

  const targetPeople = [...thuNtuNextBatchPiExpansionPeople2026, ...asiaPendingResolutionPiExpansionPeople2026];
  const errors = [];
  const degrees = [];
  const validHttpUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  };

  for (const person of targetPeople) {
    const labels = new Set((person.facts ?? []).map((fact) => fact.label));
    if (people.filter((item) => item.id === person.id).length !== 1) errors.push(person.id + " is missing or duplicated in integrated people");
    if ((person.facts?.length ?? 0) < 4) errors.push(person.id + " has fewer than four facts");
    if (!person.lastVerifiedAt) errors.push(person.id + " is missing lastVerifiedAt");
    if (!labels.has("当前任职")) errors.push(person.id + " missing exact 当前任职 fact");
    if (!labels.has("研究主线")) errors.push(person.id + " missing exact 研究主线 fact");
    if (!labels.has("教育与学术训练")) errors.push(person.id + " missing exact 教育与学术训练 fact");
    if (person.sources.length < 2) errors.push(person.id + " has fewer than two sources");
    if (!person.sources.every((source) => validHttpUrl(source.url))) errors.push(person.id + " has an invalid source URL");
    if (!person.portrait) errors.push(person.id + " has no portrait");
    if (person.portrait && !validHttpUrl(person.portrait.source.url)) errors.push(person.id + " has an invalid portrait source URL");
    if (person.portrait && !/^https?:/.test(person.portrait.src)) {
      const portrait = join(process.cwd(), "public", person.portrait.src);
      if (!existsSync(portrait) || statSync(portrait).size < 2000) errors.push(person.id + " has missing/undersized portrait");
    }
    const linked = relationships.filter((edge) => edge.from === person.id || edge.to === person.id);
    for (const edge of linked) {
      if (!people.some((item) => item.id === edge.from) || !people.some((item) => item.id === edge.to)) errors.push(edge.id + " has a missing endpoint");
      if (!validHttpUrl(edge.source.url)) errors.push(edge.id + " has an invalid source URL");
    }
    degrees.push({ id: person.id, degree: linked.length });
  }

  const expected = [
    ["thu-next-huang-li-juanzi", "changning-huang-thu-historical", "juanzi-li-thu", "lineage", "phd_adviser"],
    ["thu-next-wang-li-juanzi", "zuoying-wang-thu", "juanzi-li-thu", "lineage", "postdoc_mentor"],
    ["thu-next-gao-ji-xiangyang", "gao-wen-pku", "xiangyang-ji-thu", "lineage", "co_adviser"],
    ["thu-next-zhao-ji-xiangyang", "zhao-debin-hit", "xiangyang-ji-thu", "lineage", "co_adviser"],
    ["kambhampati-nie-phd-adviser-asia-resolution", "subbarao-kambhampati-asu-upstream", "zaiqing-nie-air", "lineage", "phd_adviser"],
    ["jie-zhou-jifeng-dai-phd-adviser-asia-resolution", "jie-zhou-thu-auto", "jifeng-dai-thu-upstream", "lineage", "phd_adviser"],
    ["sai-kit-yeung-ivor-tsang-sustained-collaboration-asia-resolution", "sai-kit-yeung-hkust-pending-resolution", "ivor-tsang-astar", "collaboration", "sustained_collaboration"],
  ];
  for (const [id, from, to, type, subtype] of expected) {
    const edge = relationships.find((item) => item.id === id);
    if (!edge) errors.push("missing relationship " + id);
    else if (relationships.filter((item) => item.id === id).length !== 1) errors.push("duplicate relationship id " + id);
    else if (edge.from !== from || edge.to !== to || edge.subtype !== subtype || edge.type !== type) {
      errors.push("direction/subtype mismatch for " + id);
    }
  }

  const targetIds = new Set(targetPeople.map((person) => person.id));
  const duplicateKeys = new Map();
  for (const edge of relationships.filter((item) => targetIds.has(item.from) || targetIds.has(item.to))) {
    const key = [edge.from, edge.to, edge.type, edge.subtype].join("::");
    duplicateKeys.set(key, [...(duplicateKeys.get(key) ?? []), edge.id]);
  }
  const duplicateEdges = [...duplicateKeys.entries()].filter(([, ids]) => ids.length > 1);
  if (duplicateEdges.length) errors.push("duplicate conceptual relationships: " + JSON.stringify(duplicateEdges));

  if (errors.length) throw new Error(errors.join("\\n"));
  console.log(JSON.stringify({
    targetPeople: targetPeople.length,
    exactEducationFacts: targetPeople.filter((person) => person.facts?.some((fact) => fact.label === "教育与学术训练")).length,
    twoSourceProfiles: targetPeople.filter((person) => person.sources.length >= 2).length,
    portraits: targetPeople.filter((person) => person.portrait).length,
    linkedPeople: degrees.filter((item) => item.degree > 0).length,
    isolatedPeople: degrees.filter((item) => item.degree === 0).map((item) => item.id),
    checkedReadyEdges: expected.length,
  }, null, 2));
`;

const result = await build({
  stdin: { contents: entry, resolveDir: join(process.cwd(), "scripts"), sourcefile: "audit-thu-asia-integrated-batch-entry.ts", loader: "ts" },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});

const temporaryDirectory = await mkdtemp(join(tmpdir(), "xuemai-thu-asia-audit-"));
const bundlePath = join(temporaryDirectory, "audit.mjs");
try {
  await writeFile(bundlePath, result.outputFiles[0].text);
  await import(pathToFileURL(bundlePath).href);
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
