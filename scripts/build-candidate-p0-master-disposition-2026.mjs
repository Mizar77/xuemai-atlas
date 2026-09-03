import { readFileSync, writeFileSync } from "node:fs";

const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const queuePath = "data/candidate-priority-queue-2026-09-03.json";
const asiaPath = "data/candidate-priority-p0-asia-disposition-2026-09-03.json";
const europePath = "data/candidate-priority-p0-europe-remaining-disposition-2026-09-03.json";
const usCanadaPath = "data/candidate-priority-p0-us-canada-disposition-ledger-2026-09-03.json";
const mainlandFullPath = "data/candidate-priority-p0-mainland-full-disposition-2026-09-03.json";
const hkSgFullPath = "data/candidate-priority-p0-hk-sg-full-batch-2026-09-03.json";
const europeFullPath = "data/candidate-priority-p0-europe-full-disposition-2026-09-03.json";
const mainlandSecondPassPath = "data/candidate-priority-p0-mainland-second-pass-disposition-2026-09-03.json";
const europeSecondRoundPath = "data/candidate-priority-p0-europe-second-round-disposition-2026-09-03.json";
const hkSgSecondRoundPath = "data/candidate-priority-p0-hk-sg-second-round-disposition-2026-09-03.json";
const europeThirdRoundPath = "data/candidate-priority-p0-europe-third-round-disposition-2026-09-03.json";
const hkSgThirdRoundPath = "data/candidate-priority-p0-hk-sg-third-round-disposition-2026-09-03.json";
const europeFourthRoundPath = "data/candidate-priority-p0-europe-fourth-round-disposition-2026-09-03.json";
const mainlandThirdPassPath = "data/candidate-priority-p0-mainland-third-pass-145-disposition-2026-09-03.json";
const hkSgFourthRoundPath = "data/candidate-priority-p0-hk-sg-fourth-round-disposition-2026-09-03.json";
const hkSgFifthRoundPath = "data/candidate-priority-p0-hk-sg-fifth-round-disposition-2026-09-03.json";
const mainlandFourthPassPath = "data/candidate-priority-p0-mainland-fourth-pass-disposition-2026-09-03.json";
const europeFifthRoundPath = "data/candidate-priority-p0-europe-fifth-round-disposition-2026-09-03.json";
const outputPath = "data/candidate-priority-p0-master-disposition-2026-09-03.json";

const queue = read(queuePath);
const asia = read(asiaPath);
const europe = read(europePath);
const usCanada = read(usCanadaPath);
const mainlandFull = read(mainlandFullPath);
const hkSgFull = read(hkSgFullPath);
const europeFull = read(europeFullPath);
const mainlandSecondPass = read(mainlandSecondPassPath);
const europeSecondRound = read(europeSecondRoundPath);
const hkSgSecondRound = read(hkSgSecondRoundPath);
const europeThirdRound = read(europeThirdRoundPath);
const hkSgThirdRound = read(hkSgThirdRoundPath);
const europeFourthRound = read(europeFourthRoundPath);
const mainlandThirdPass = read(mainlandThirdPassPath);
const hkSgFourthRound = read(hkSgFourthRoundPath);
const hkSgFifthRound = read(hkSgFifthRoundPath);
const mainlandFourthPass = read(mainlandFourthPassPath);
const europeFifthRound = read(europeFifthRoundPath);
const records = [
  ...asia.ledger.map((row) => ({ ...row, disposition: row.status, sourceLedger: asiaPath })),
  ...europe.decisions.map((row) => ({ ...row, sourceLedger: europePath })),
  ...usCanada.decisions.map((row) => ({ ...row, name: row.rosterName, sourceLedger: usCanadaPath })),
];

// These candidates passed the strict gate after the Asia ledger snapshot was
// frozen. Keep the original frozen population, but promote their disposition
// in the reproducible master report instead of leaving published people marked
// as pending.
const postSnapshotReady = new Map([
  ["Mainland China:清华大学:chunyu", "chun-yu-thu-p0-b10"],
  ["Mainland China:清华大学:yuanchunshi", "yuanchun-shi-thu-p0-b10"],
  ["Mainland China:清华大学:hongningwang", "hongning-wang-thu-p0-b10"],
  ["Hong Kong:香港科技大学:linpingyuan", "linping-yuan-hkust-p0-b10"],
  ["Mainland China:清华大学:lifengsun", "lifeng-sun-thu-p0-b11"],
  ["Mainland China:清华大学:taijiangmu", "taijiang-mu-thu-p0-b11"],
  ["Mainland China:清华大学:刘云新", "yunxin-liu-thu-air-p0-b11"],
  ["Mainland China:清华大学:曹婷", "ting-cao-thu-air-p0-b11"],
  ["Mainland China:北京大学:吴云芳", "yunfang-wu-pku-p0-b11"],
  ["Mainland China:北京大学:谢辽夏", "sergey-mechtaev-pku-p0-b11"],
  ["Mainland China:清华大学:yuntaowang", "yuntao-wang-thu-p0-b12"],
  ["Mainland China:上海交通大学:张伟楠", "weinan-zhang-sjtu-p0-tail-b1"],
  ["Mainland China:上海交通大学:刘松桦", "songhua-liu-sjtu-p0-tail-b1"],
  ["Mainland China:上海交通大学:张林峰", "linfeng-zhang-sjtu-p0-tail-b1"],
  ["Mainland China:北京大学:崔斌", "bin-cui-pku-p0-tail-b1"],
  ["Mainland China:清华大学:戴琼海", "qionghai-dai-thu-p0-tail-b1"],
  ["Hong Kong:香港中文大学:chiwingfu", "chi-wing-fu-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:patrickpclee", "patrick-lee-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:qiangxu", "qiang-xu-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:yuanyixuan袁奕萱", "yixuan-yuan-cuhk-p0-tail"],
  ["Hong Kong:香港中文大学:shengchaoliu", "shengchao-liu-cuhk-p0-tail"],
  ["Singapore:Nanyang Technological University:assocprofyingzhenli", "yingzhen-li-ntu-p0-tail"],
  ["Singapore:Nanyang Technological University:assocprofyuhan", "yu-han-ntu-p0-tail"],
  ["Singapore:Nanyang Technological University:asstprofalvinchanguowei", "alvin-chan-ntu-p0-tail"],
  ["Singapore:National University of Singapore:anjiliu", "anji-liu-nus-p0-tail"],
  ["Singapore:National University of Singapore:chentsuhan", "tsuhan-chen-nus-p0-tail"],
  ["Mainland China:清华大学:jiajia", "jia-jia-thu-p0-tail-b2"],
  ["Mainland China:北京大学:王奕森", "yisen-wang-pku-p0-tail-b2"],
  ["Mainland China:北京大学:卢宗青", "zongqing-lu-pku-p0-tail-b2"],
  ["Mainland China:清华大学:fuchunsun", "fuchun-sun-thu-p0-tail-b2"],
  ["Mainland China:清华大学:huapingliu", "huaping-liu-thu-p0-tail-b2"],
  ["Hong Kong:香港中文大学:jimmyhomanlee", "jimmy-lee-cuhk-p0-tail-b2"],
  ["Hong Kong:香港中文大学:zilishao", "zili-shao-cuhk-p0-tail-b2"],
  ["Hong Kong:香港城市大学:makede馬柯德", "kede-ma-cityu-p0-tail-b2"],
  ["Hong Kong:香港城市大学:liaojing廖菁", "jing-liao-cityu-p0-tail-b2"],
  ["Hong Kong:香港城市大学:songlinqi宋林琦", "linqi-song-cityu-p0-tail-b2"],
  ["Singapore:Nanyang Technological University:asstprofzhangmengmi", "mengmi-zhang-ntu-p0-tail-b2"],
  ["Singapore:National University of Singapore:ilyasergey", "ilya-sergey-nus-p0-tail-b2"],
  ["Singapore:National University of Singapore:surangananayakkara", "suranga-nanayakkara-nus-p0-tail-b2"],
  ["Singapore:Singapore Management University:hadywlauw", "hady-lauw-smu-p0-tail-b2"],
  ["Singapore:Nanyang Technological University:assocprofkwohcheekeong", "kwoh-chee-keong-ntu-p0-tail-b2"],
  ["Mainland China:清华大学:huaxu", "hua-xu-thu-p0-tail-b3"],
  ["Mainland China:清华大学:jisun", "ji-sun-thu-p0-tail-b3"],
  ["Mainland China:北京大学:董豪", "hao-dong-pku-p0-tail-b3"],
  ["Mainland China:北京大学:李彤阳", "tongyang-li-pku-p0-tail-b3"],
  ["Mainland China:北京大学:周迪宇", "diyu-zhou-pku-p0-tail-b3"],
  ["Hong Kong:香港大学:cuiheming崔鶴鳴", "heming-cui-hku-p0-tail-b3"],
  ["Hong Kong:香港大学:wuchuan吳川", "chuan-wu-hku-p0-tail-b3"],
  ["Hong Kong:香港大学:wuchenshu吳陳沭", "chenshu-wu-hku-p0-tail-b3"],
  ["Hong Kong:香港大学:lamtakwah林德華", "tak-wah-lam-hku-p0-tail-b3"],
  ["Singapore:Singapore University of Technology and Design:leeroy", "roy-lee-sutd-p0-tail-b3"],
  ["Singapore:Singapore University of Technology and Design:songpeng", "peng-song-sutd-p0-tail-b3"],
  ["Europe:EPFL:francescomondada", "francesco-mondada-epfl-p0-2026"],
  ["Europe:EPFL:katerinaargyraki", "katerina-argyraki-epfl-p0-2026"],
  ["Europe:EPFL:sergevaudenay", "serge-vaudenay-epfl-p0-2026"],
  ["Europe:EPFL:michaelcgastpar", "michael-gastpar-epfl-p0-2026"],
  ["Europe:EPFL:nicolasmacris", "nicolas-macris-epfl-p0-2026"],
  ["Hong Kong:香港科技大学:chaojianli", "chaojian-li-hkust-p0-next"],
  ["Mainland China:清华大学:haixinduan", "haixin-duan-thu-p0-next"],
  ["Mainland China:清华大学:kunxu", "kun-xu-thu-p0-next"],
  ["Mainland China:清华大学:juren", "ju-ren-thu-p0-next"],
  ["Mainland China:清华大学:zhidongdeng", "zhidong-deng-thu-p0-next"],
]);

const hkSgAtlasId = (row) => {
  if (row.canonicalKey === "Hong Kong:香港中文大学:sinnojialinpan") return "sinno-pan";
  return `${row.name.toLowerCase().normalize("NFKD").replace(/prof\.?\s*/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-p0-hksg-full`;
};
const supplementalDispositions = new Map([
  ...mainlandFull.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition,
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...hkSgFull.selected.map((row) => [row.canonicalKey, { disposition: "ready", atlasPersonId: hkSgAtlasId(row) }]),
  ...hkSgFull.held.map((row) => [row.canonicalKey, { disposition: row.disposition, reason: row.reason }]),
  ...europeFull.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition === "ready"
      ? "ready"
      : ["fetch_failed", "missing_portrait"].includes(row.disposition)
        ? "missing_portrait"
        : "missing_relationship",
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...mainlandSecondPass.records.map((row) => [row.canonicalKey, {
    disposition: row.finalDisposition,
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...europeSecondRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition === "ready"
      ? "ready"
      : ["fetch_failed", "missing_portrait"].includes(row.disposition)
        ? "missing_portrait"
        : "missing_relationship",
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...hkSgSecondRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition,
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...europeThirdRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition === "ready"
      ? "ready"
      : ["fetch_failed", "missing_portrait"].includes(row.disposition)
        ? "missing_portrait"
        : "missing_relationship",
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...hkSgThirdRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition === "exclude_non_independent" ? "exclude_non_pi" : row.disposition,
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...europeFourthRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition === "ready"
      ? "ready"
      : row.disposition === "missing_portrait"
        ? "missing_portrait"
        : "missing_relationship",
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...mainlandThirdPass.records.map((row) => [row.canonicalKey, {
    disposition: row.finalDisposition === "ready"
      ? "ready"
      : row.finalDisposition === "not_independent_pi"
        ? "exclude_non_pi"
        : "missing_relationship",
    atlasPersonId: row.atlasPersonId,
    reason: row.thirdPassReview ?? row.reviewNote,
  }]),
  ...hkSgFourthRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition,
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...hkSgFifthRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition,
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...mainlandFourthPass.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition === "ready" ? "ready" : "missing_relationship",
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...europeFifthRound.records.map((row) => [row.canonicalKey, {
    disposition: row.disposition === "ready"
      ? "ready"
      : row.disposition === "duplicate"
        ? "duplicate"
        : "missing_portrait",
    atlasPersonId: row.atlasPersonId,
    reason: row.reason,
  }]),
  ...[
    ["Hong Kong:香港科技大学:chaojianli", "chaojian-li-hkust-p0-next"],
    ["Mainland China:清华大学:haixinduan", "haixin-duan-thu-p0-next"],
    ["Mainland China:清华大学:kunxu", "kun-xu-thu-p0-next"],
    ["Mainland China:清华大学:juren", "ju-ren-thu-p0-next"],
    ["Mainland China:清华大学:zhidongdeng", "zhidong-deng-thu-p0-next"],
  ].map(([canonicalKey, atlasPersonId]) => [canonicalKey, {
    disposition: "ready",
    atlasPersonId,
    reason: "已通过现任独立 PI、双来源、3–5 条带来源事实、可靠头像及至少一条可核验师承、学生或合作关系门槛，并已接入图谱。",
  }]),
]);

for (const record of records) {
  const atlasPersonId = postSnapshotReady.get(record.canonicalKey);
  if (!atlasPersonId) continue;
  record.disposition = "ready";
  record.status = "ready";
  record.atlasPersonId = atlasPersonId;
  record.reason = "已通过现任独立 PI、双来源、3–5 条带来源事实、教育训练、可靠头像及至少一条可核验网络证据门槛，并已接入图谱。";
}

for (const record of records) {
  const override = supplementalDispositions.get(record.canonicalKey);
  if (!override) continue;
  record.disposition = override.disposition;
  record.status = override.disposition;
  record.atlasPersonId = override.atlasPersonId;
  record.reason = override.disposition === "ready"
    ? "全量 P0 证据缺口复核确认其通过现任独立 PI、双来源、3–5 条带来源事实、教育训练、可靠头像及至少一条可核验网络证据门槛，并已接入图谱。"
    : override.disposition === "duplicate"
      ? "全量 P0 复核确认该冻结名录项与已接入人物重复，已归并到同一图谱节点。"
      : override.reason ?? record.reason;
}

const byKey = new Map();
for (const record of records) {
  if (!record.canonicalKey) throw new Error(`Missing canonicalKey in ${record.sourceLedger}`);
  if (byKey.has(record.canonicalKey)) throw new Error(`Duplicate P0 disposition key: ${record.canonicalKey}`);
  byKey.set(record.canonicalKey, record);
}

const currentP0 = queue.candidates.filter((candidate) => candidate.tier === "P0");
const uncoveredCurrentCandidates = currentP0.filter((candidate) => !byKey.has(candidate.canonicalKey));
if (uncoveredCurrentCandidates.length) {
  throw new Error(`Current P0 candidates without a disposition: ${uncoveredCurrentCandidates.slice(0, 20).map((row) => row.canonicalKey).join(", ")}`);
}

const allowed = ["ready", "duplicate", "exclude_non_pi", "exclude_out_of_scope", "missing_second_source", "missing_portrait", "missing_relationship"];
for (const record of records) {
  if (!allowed.includes(record.disposition)) throw new Error(`Unknown P0 disposition: ${record.disposition}`);
  if (!record.reason) throw new Error(`Missing reason for ${record.canonicalKey}`);
}

const dispositionCounts = Object.fromEntries(allowed.map((status) => [status, records.filter((record) => record.disposition === status).length]));
const regions = [...new Set(records.map((record) => record.region))].sort();
const regionCounts = Object.fromEntries(regions.map((region) => [region, records.filter((record) => record.region === region).length]));
const currentRemainingDispositionCounts = Object.fromEntries(allowed.map((status) => [
  status,
  currentP0.filter((candidate) => byKey.get(candidate.canonicalKey)?.disposition === status).length,
]));
const strictQualityGatePendingCount = ["missing_second_source", "missing_portrait", "missing_relationship"]
  .reduce((sum, status) => sum + currentRemainingDispositionCounts[status], 0);

const report = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  scope: "Every P0 candidate frozen for the all-region completion pass",
  definitionOfComplete: "Every frozen P0 candidate has one exclusive, evidence-aware disposition. Only ready candidates are published; unresolved quality-gate failures remain explicit.",
  sourceLedgers: [asiaPath, europePath, usCanadaPath, mainlandFullPath, hkSgFullPath, europeFullPath, mainlandSecondPassPath, europeSecondRoundPath, hkSgSecondRoundPath, europeThirdRoundPath, hkSgThirdRoundPath, europeFourthRoundPath, mainlandThirdPassPath, hkSgFourthRoundPath, hkSgFifthRoundPath, mainlandFourthPassPath, europeFifthRoundPath],
  frozenCandidateCount: records.length,
  reviewedCandidateCount: records.length,
  uncoveredCandidateCount: 0,
  dispositionCounts,
  regionCounts,
  publishedReadyCount: dispositionCounts.ready,
  cumulativePromotedRosterCandidates: queue.completedBatch?.promotedRosterCandidates ?? null,
  currentQueue: {
    source: queuePath,
    p0Count: currentP0.length,
    allCoveredByLedger: true,
    dispositionCounts: currentRemainingDispositionCounts,
    strictQualityGatePendingCount,
    duplicateReviewCount: currentRemainingDispositionCounts.duplicate,
    excludedAfterReviewCount: currentRemainingDispositionCounts.exclude_non_pi + currentRemainingDispositionCounts.exclude_out_of_scope,
  },
  records: records.sort((a, b) => a.region.localeCompare(b.region) || a.institution.localeCompare(b.institution) || a.name.localeCompare(b.name)),
};

writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  outputPath,
  frozenCandidateCount: report.frozenCandidateCount,
  reviewedCandidateCount: report.reviewedCandidateCount,
  dispositionCounts,
  regionCounts,
  currentP0Count: currentP0.length,
  strictQualityGatePendingCount,
}, null, 2));
