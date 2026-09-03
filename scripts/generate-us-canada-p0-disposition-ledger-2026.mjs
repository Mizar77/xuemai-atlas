import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));

const queue = read("data/candidate-priority-queue-2026-09-03.json");
const decisionArtifacts = [
  read("data/roster-decisions/cmu-scs-2026-09-03.json"),
  read("data/roster-decisions/us-canada-batch2/mit-csail-2026-09-03.json"),
  read("data/roster-decisions/stanford-cs-2026-09-02.json"),
  read("data/roster-decisions/stanford-ee-2026-09-02.json"),
  read("data/roster-decisions/stanford-sail-2026-09-02.json"),
  read("data/roster-decisions/us-uw-uiuc-2026-09-03/uiuc-siebel-school-2026-09-03.json"),
];

const normalize = (value) => value
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/· officialId.*$/i, "")
  .replace(/[^a-z0-9]+/gi, "")
  .toLowerCase();

const decisionIndex = new Map();
for (const artifact of decisionArtifacts) {
  for (const decision of artifact.decisions ?? []) {
    const name = decision.rosterName ?? decision.name;
    if (!name) continue;
    const key = normalize(name);
    const rows = decisionIndex.get(key) ?? [];
    rows.push({ ...decision, unitUrl: decision.unitUrl ?? artifact.unitUrl ?? decision.sourcePageUrl });
    decisionIndex.set(key, rows);
  }
}

const duplicateAtlasIds = new Map(Object.entries({
  "costis-daskalakis": "constantinos-daskalakis-award",
  "dave-gifford": "david-gifford-lineage",
  "joshua-tenenbaum": "joshua-tenenbaum-lineage",
  "leslie-kaelbling": "leslie-kaelbling-award",
  "william-freeman": "william-freeman-lineage",
  "carlos-ernesto-guestrin": "carlos-guestrin-lineage",
  "carlos-guestrin": "carlos-guestrin-lineage",
  "chris-re": "chris-re-stanford",
  "daniel-yamins": "dan-yamins-stanford",
  "karen-liu": "karen-liu-stanford",
  "kunle-a-olukotun": "kunle-olukotun-lineage",
}));

const duplicateCandidates = new Map(Object.entries({
  "christoforos-kozyrakis": "Christos Kozyrakis",
  "mark-a-horowitz": "Mark Horowitz",
}));

const nonPi = new Set([
  "Zhiyong Lu",
  // Stanford/MIT first-party profiles explicitly mark these entries emeritus rather than current independent PI.
  "Ken Salisbury",
  "Tomaso Poggio",
]);

const outOfScope = new Set([
  // MIT: programming languages, architecture, pure theory or education without a sustained AI line.
  "Adam Chlipala", "Anant Agarwal", "Hal Abelson", "Michel Goemans",
  // Stanford: communications, hardware, systems, cryptography and pure theory outside the atlas AI scope.
  "Abbas El Gamal", "Ada Poon", "Adam Bouland", "Amin Arbabian", "Ayfer Ozgur", "Brad Osgood",
  "Caroline Trippel", "Christos Kozyrakis", "Clark Barrett", "Dan Boneh", "David Mazieres", "David Tse",
  "Dawson Engler", "Dustin Schroeder", "Emma Dauterman", "Fouad A. Tobagi", "Fredrik Kjolstad",
  "H.-S. Philip Wong", "Howard Zebker", "John L. Hennessy", "John M. Pauly", "Joseph M. Kahn",
  "Li-Yang Tan", "Mark Horowitz", "Mark Zhandry", "Mary Wootters", "Mendel Rosenblum", "Nicholas Bambos",
  "Nima Anari", "Omer Reingold", "Philip Levis", "Ram Rajagopal", "Sanjay Lall", "Sara Achour",
  "Subhasish Mitra", "Thomas Lee", "Yanjie Shao", "Zakir Durumeric",
  // UIUC: law, cryptography, PL/formal methods, systems, pure theory and scientific computing without an AI main line.
  "Masooda N. Bashir", "Deming Chen", "Jugal Garg", "David Heath", "Reyhaneh Jabbarvand", "Sarah Lawsky",
  "Ning Luo", "Ruta Mehta", "Sayan Mitra", "William S. Moses", "Luke Olson", "Yongjoo Park", "Talia Ringer",
  "Ilan Shomorony", "Edgar Solomonik", "Yurii Vlasov", "Yupeng Zhang",
  // CMU official profile identifies Yang P. Liu's main line as theory: algorithms, complexity, geometry and combinatorics.
  "Yang Liu",
  // Verified from the current official profile: primary work is data management, graphics/systems,
  // neuromorphic hardware, accelerator hardware, computational biology, or programming systems.
  "Jennifer Widom", "Kayvon Fatahalian", "Kwabena Boahen", "Thierry Tambe",
  "Bruce Tidor", "Jonathan Ragan-Kelley",
]);

const readyNames = new Set([
  "Daniela Rus",
  "Julie Shah",
  "Michael Bernstein",
  "Emily Fox",
  "Arindam Banerjee",
  "Mark Hasegawa-Johnson",
  "Bonnie Berger",
  "Manolis Kellis",
  "John Leonard",
  "Nicholas Roy",
  "Oussama Khatib",
  "Scott Linderman",
  "Mykel Kochenderfer",
  "Minje Kim",
  "Hao Peng",
  "Ismini Lourentzou",
  "Brian Williams",
  "John Guttag",
  "Justin Solomon",
  "Mina  Konakovic Lukovic",
  "Peter Szolovits",
  "Polina Golland",
  "Ted Adelson",
  "Tomas Lozano-Perez",
  "Wojciech Matusik",
  "Girish Chowdhary",
  "Katie Driggs-Campbell",
  "Kris Hauser",
  "Steven M. LaValle",
  "Yaoyao Liu",
  "Minh N. Do",
  "Tong Zhang",
  "Tandy Warnow",
  "Wenzhen Yuan",
  "Anshul Kundaje",
  "Benjamin Van Roy",
  "Ehsan Adeli",
  "Ellen Vitercik",
  "Mert Pilanci",
  "Stephen P. Boyd",
  "Tsachy Weissman",
  "Dina Katabi",
  "Shenlong Wang",
  "Lingming Zhang",
  "Bin Hu",
  "Daniel Kang",
  "Fan Lai",
  "Minjia Zhang",
  "Ge Liu",
  "Jiaqi Ma",
  "Haohan Wang",
  "Charles L. Isbell, Jr.",
  "Gregory Valiant",
  "James Landay",
  "Ron Dror",
  "Deepak Vasisht",
  "Kevin Chenchuan Chang",
  "Maxim Raginsky",
  "Romit Roy Choudhury",
  "Gill Bejerano",
  "Michael Genesereth",
  "Vasilis Syrgkanis",
  "Randall Davis",
  "Rob Miller",
  "Stefanie Mueller",
  "Dong Wang",
  "Francis Yan",
  "Melkior Ornik",
  "Kaiyu Guan",
  "Timothy Bretl",
  "Varun Chandrasekaran",
  "Yunzong Xu",
  "Ron Fedkiw",
  "Thomas Icard",
  "Gerald Sussman",
  "John C. Hart",
  "Mohammed El-Kebir",
  "Olgica Milenkovic",
  "Rainer Engelken",
  "Rayadurgam Srikant",
  "Shuang Zhao",
]);

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const candidates = queue.candidates.filter((candidate) =>
  candidate.tier === "P0" && (candidate.region === "United States" || candidate.region === "Canada"));

const decisions = candidates.map((candidate) => {
  const rosterName = candidate.name.replace(/ · officialId.*$/i, "");
  const matched = decisionIndex.get(normalize(rosterName)) ?? [];
  const evidenceRows = matched.map((row) => ({
    unitUrl: row.unitUrl,
    officialId: row.officialId ?? null,
    title: row.title ?? null,
    profileUrl: row.profileUrl ?? row.sourcePageUrl ?? candidate.evidenceUrl,
    portraitUrl: row.portraitUrl ?? null,
    decision: row.decision,
    evidence: row.evidence ?? null,
    profileExcerpt: row.profileEvidence?.excerpt ?? null,
  }));
  const candidateSlug = slug(rosterName);
  const portraitUrl = evidenceRows.find((row) => row.portraitUrl)?.portraitUrl ?? null;
  let disposition;
  let reason;
  let atlasPersonId = null;
  let duplicateOfCandidate = null;

  if (duplicateAtlasIds.has(candidateSlug)) {
    disposition = "duplicate";
    atlasPersonId = duplicateAtlasIds.get(candidateSlug);
    reason = `已在正式图谱中，身份由姓名、机构与官方个人页共同匹配；正式节点 ${atlasPersonId}。`;
  } else if (duplicateCandidates.has(candidateSlug)) {
    disposition = "duplicate";
    duplicateOfCandidate = duplicateCandidates.get(candidateSlug);
    reason = `同一人的跨名录姓名变体；保留 ${duplicateOfCandidate} 作为后续资料包的规范姓名。`;
  } else if (nonPi.has(rosterName)) {
    disposition = "exclude_non_pi";
    reason = rosterName === "Ken Salisbury"
      ? "Stanford Profiles 与 Salisbury Robotics Lab 均明确标注 Research Professor, Emeritus；不作为现任独立 PI 接入。"
      : rosterName === "Tomaso Poggio"
        ? "MIT McGovern Institute 明确标注 Eugene McDermott Professor Emeritus；保留作既有历史关系节点，不作为现任独立 PI 晋升。"
        : "官方名录显示其为外部机构教授/附属条目，而非该冻结单位内可独立招生的现任 PI。";
  } else if (outOfScope.has(rosterName)) {
    disposition = "exclude_out_of_scope";
    reason = "官方个人页的研究主线属于硬件、通信、系统、密码、编程语言、纯理论或其他非 AI 主线；不纳入当前 AI/NLP/CV/ML/机器人图谱。";
  } else if (readyNames.has(rosterName)) {
    disposition = "ready";
    reason = "本批正式数据模块已达到双来源、3–5 条带来源事实、512×512 头像和网络证据门槛。";
  } else if (!portraitUrl) {
    disposition = "missing_portrait";
    reason = "官方当前任职与研究范围成立，但冻结名录/个人页缓存没有可发布的可靠头像；同时仍需完成第二来源与网络证据核验。";
  } else {
    disposition = "missing_second_source";
    reason = "官方名录或个人页已确认现任独立 PI 与范围，但尚未形成第二项一手来源支持的完整资料包；关系证据也需随后核验。";
  }

  const blockers = [];
  if (!["duplicate", "exclude_non_pi", "exclude_out_of_scope", "ready"].includes(disposition)) {
    if (disposition !== "missing_second_source") blockers.push("missing_second_source");
    if (!portraitUrl) blockers.push("missing_portrait");
    blockers.push("missing_relationship");
  }

  const attemptedUrls = [...new Set([
    candidate.evidenceUrl,
    ...evidenceRows.map((row) => row.profileUrl),
    ...(rosterName === "Ken Salisbury" ? ["https://profiles.stanford.edu/john-salisbury", "https://sr.stanford.edu/"] : []),
    ...(rosterName === "Tomaso Poggio" ? ["https://mcgovern.mit.edu/profile/tomaso-poggio/", "https://poggio-lab.mit.edu/"] : []),
  ].filter(Boolean))];

  return {
    canonicalKey: candidate.canonicalKey,
    rosterName,
    originalCandidateName: candidate.name,
    region: candidate.region,
    institution: candidate.institution,
    institutionRank: candidate.institutionRank,
    score: candidate.score,
    disposition,
    reason,
    atlasPersonId,
    duplicateOfCandidate,
    officialEvidenceUrl: candidate.evidenceUrl,
    rosterMemberships: candidate.rosterMemberships,
    portraitUrl,
    blockers,
    evidenceRows,
    attemptedUrls,
    failureType: disposition === "missing_second_source" ? "second_first_party_source_not_yet_verified" : null,
    reviewedAt: "2026-09-03",
  };
});

const dispositions = [
  "ready",
  "duplicate",
  "exclude_non_pi",
  "exclude_out_of_scope",
  "missing_second_source",
  "missing_portrait",
  "missing_relationship",
];
const counts = Object.fromEntries(dispositions.map((status) => [
  status,
  decisions.filter((row) => row.disposition === status).length,
]));

const output = {
  schemaVersion: 1,
  snapshotAt: "2026-09-03",
  scope: "All remaining P0 candidates in United States and Canada from candidate-priority-queue-2026-09-03.json",
  frozenCount: candidates.length,
  reviewedCount: decisions.length,
  counts,
  notes: [
    "A disposition is exclusive; blockers preserves additional unmet gates for non-final candidates.",
    "missing_second_source means the official current-PI and scope gate is met, but a second first-party source and person-network evidence remain to be packaged.",
    "No Canada candidate is currently tiered P0 in the source queue; this ledger therefore contains only United States rows.",
    "Same-name matches across different institutions are not treated as duplicates without identity evidence.",
  ],
  decisions,
};

const outputPath = path.join(root, "data/candidate-priority-p0-us-canada-disposition-ledger-2026-09-03.json");
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, frozenCount: output.frozenCount, reviewedCount: output.reviewedCount, counts }, null, 2));
