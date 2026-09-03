import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const queuePath = path.join(root, "data/candidate-priority-queue-2026-09-03.json");
const outputPath = path.join(
  root,
  "data/candidate-priority-p0-europe-remaining-disposition-2026-09-03.json",
);

const rosterFiles = {
  "Technical University of Munich": "data/roster-decisions/tum-cit-2026-09-02.json",
  EPFL: "data/roster-decisions/epfl-ic-2026-09-02.json",
  "ETH Zurich": "data/roster-decisions/eth-inf-2026-09-02.json",
  "University of Edinburgh": "data/roster-decisions/edinburgh-informatics-2026-09-02.json",
  "University of Cambridge": "data/roster-decisions/cambridge-cst-2026-09-02.json",
};

const normalizeName = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const candidates = queue.candidates.filter(
  (candidate) => candidate.region === "Europe" && candidate.tier === "P0",
);

const rosterByInstitution = new Map();
for (const [institution, relativePath] of Object.entries(rosterFiles)) {
  const artifact = JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
  rosterByInstitution.set(
    institution,
    new Map(artifact.decisions.map((decision) => [normalizeName(decision.name), decision])),
  );
}

// Exact name + institution matches were resolved against a fresh app/data.ts bundle
// on 2026-09-03. Keep the resolved IDs in this standalone adapter so it does not
// depend on a temporary build artifact.
const existingAtlasMatches = new Map([
  [normalizeName("Markus Püschel"), { id: "uw-uiuc-markus-pueschel-mentor", institution: "ETH Zurich" }],
  [normalizeName("Martin Vechev"), { id: "uw-uiuc-martin-vechev-mentor", institution: "ETH Zurich" }],
]);

// TUMOnline cards in the frozen roster expose only a shell URL. These current
// first-party TUM pages provide the second source required to move four records
// out of source-verification limbo without claiming that the remaining portrait
// and network gates are complete.
const supplementalSecondSources = new Map([
  [normalizeName("Florian Bruse"), "https://www.professoren.tum.de/en/bruse-florian"],
  [normalizeName("Francisco Javier Esparza Estaun"), "https://portal.fis.tum.de/en/persons/francisco-javier-esparza-estaun/"],
  [normalizeName("Marie-Christine Düker"), "https://www.math.cit.tum.de/math/personen/professuren/dueker-marie/"],
  [normalizeName("Seyed Jalal Etesami"), "https://www.professoren.tum.de/en/etesami-seyed-jalal"],
  [normalizeName("V. Spors"), "https://www.cit.tum.de/en/cit/news/article/professor-velvet-spors/"],
  [normalizeName("Yannis Chronis"), "https://chronis.inf.ethz.ch/"],
]);

const newlyReadyNames = new Set([
  "Barbara Solenthaler",
  "Stelian Coros",
  "Mennatallah El-Assady",
  "April Yi Wang",
  "Valentina Boeva",
  "Celestine Mendler-Dünner",
  "Christian Holz",
  "Lenka Zdeborova",
  "Martin Schrimpf",
  "Adam Lopez",
  "Emily Allaway",
  "Hatice Gunes",
  "Shivaram Venkataraman",
  "Amanda Prorok",
  "Rika Antonova",
  "Pietro Liò",
  "Evangelia Kalyvianaki",
  "Cecilia Mascolo",
  "Simone Teufel",
  "Tom Gur",
  "Ann Copestake",
  "Carl Henrik Ek",
  "Damon Wischik",
  "Ian Wassell",
  "Jon Crowcroft",
  "Martin Kleppmann",
  "Paula Buttery",
  "Robert Mullins",
  "Robert Watson",
  "Simon Moore",
  "Edouard Bugnion",
  "Nicholas Lane",
  "Frank Stajano",
  "Alastair Beresford",
  "Anil Madhavapeddy",
  "Emily Shuckburgh",
  "Peter Sewell",
  "Timothy Jones",
  "Clément Pit-Claudel",
  "Ken Holstein",
  "Ola Svensson",
  "Paolo Ienne",
  "Cengiz Oztireli",
  "Rafal Mantiuk",
  "Sean Holden",
  "Weiwei Sun",
  "Ana Klimovic",
  "Gustavo Alonso",
  "David Basin",
  "Srdjan Čapkun",
  "Shweta Shinde",
  "Zhendong Su",
  "Peter Müller",
  "Kenny Paterson",
  "Vera Traub",
  "David Steurer",
  "Ralf Jung",
  "Rasmus Kyng",
  "Timothy Roscoe",
  "Bernd Gärtner",
  "Dennis Hofheinz",
  "Karl Bringmann",
  "Michalis Kokologiannakis",
  "Dennis Komm",
  "Johannes Lengler",
  "Jules Jacobs",
  "Michal Friedman",
].map(normalizeName));

const retiredCurrentCheck = new Map([
  [normalizeName("Angelika Steger"), "ETH 官方研究组主页明确写明其已于 2026 年 8 月退休，故不再作为现任独立 PI 发布。来源：https://as.inf.ethz.ch/people/prof/index.html"],
]);

const exactNetworkBlockers = new Map([
  [normalizeName("Yannis Chronis"), "官方个人页已明确其 University of Wisconsin–Madison 博士导师为 Jignesh Patel，本硕导师为 Yannis Ioannidis；但两位导师尚无可与本批模块安全合并的图谱端点。需先建立或解析导师端点，不能把导师关系误写成当前课题组成员。来源：https://chronis.inf.ethz.ch/"],
]);

const decisions = candidates.map((candidate) => {
  const rosterDecision = rosterByInstitution
    .get(candidate.institution)
    ?.get(normalizeName(candidate.name));
  if (!rosterDecision) {
    throw new Error(`Missing frozen roster decision for ${candidate.institution}: ${candidate.name}`);
  }

  const resolvedAtlasMatch = existingAtlasMatches.get(normalizeName(candidate.name));
  const exactInstitutionMatch =
    resolvedAtlasMatch?.institution === candidate.institution ? resolvedAtlasMatch : null;

  const sourceUrls = [...new Set([
    candidate.rosterMemberships?.[0]?.unitUrl,
    candidate.evidenceUrl,
    rosterDecision.sourcePageUrl,
    rosterDecision.profileUrl,
    /^https?:/.test(rosterDecision.evidence ?? "") ? rosterDecision.evidence : null,
    supplementalSecondSources.get(normalizeName(candidate.name)),
  ].filter(Boolean))];

  let disposition;
  let reason;
  let atlasPersonId = null;

  if (retiredCurrentCheck.has(normalizeName(candidate.name))) {
    disposition = "exclude_non_pi";
    reason = retiredCurrentCheck.get(normalizeName(candidate.name));
  } else if (newlyReadyNames.has(normalizeName(candidate.name))) {
    disposition = "ready";
    reason = "独立数据模块已补齐两项以上来源、3–5 条带来源事实（含教育与学术训练）、512×512 官方头像及一手团队/合作/学生证据，可供主线程集成。";
  } else if (exactInstitutionMatch) {
    disposition = "duplicate";
    atlasPersonId = exactInstitutionMatch.id;
    reason = `同名且同机构人物已存在于当前图谱（${exactInstitutionMatch.id}），不重复创建。`;
  } else if (rosterDecision.decision === "excluded_historical") {
    disposition = "exclude_non_pi";
    reason = `官方名录明确标注为荣休/历史人员：${rosterDecision.reason}`;
  } else if (rosterDecision.decision === "excluded_non_pi") {
    disposition = "exclude_non_pi";
    reason = rosterDecision.reason;
  } else if (rosterDecision.decision === "excluded_industry_only") {
    disposition = "exclude_non_pi";
    reason = rosterDecision.reason;
  } else if (
    sourceUrls.length < 2
    || (
      rosterDecision.decision === "pending_profile_verification"
      && !supplementalSecondSources.has(normalizeName(candidate.name))
    )
  ) {
    disposition = "missing_second_source";
    reason = `冻结名录只能确认候选身份，尚缺第二项能同时支持现任独立 PI 与 AI/ML/NLP/CV 范围的官方来源。${rosterDecision.reason ? ` ${rosterDecision.reason}` : ""}`;
  } else if (!rosterDecision.portraitUrl) {
    disposition = "missing_portrait";
    reason = "官方名录和个人页已形成两项来源，但现有缓存没有可发布的可靠头像；人物事实、教育训练与关系仍须在头像补齐时一并复核。";
  } else {
    disposition = "missing_relationship";
    reason = exactNetworkBlockers.get(normalizeName(candidate.name))
      ?? "现任 faculty、两项官方入口与头像均已具备，但缓存中没有达到发布门槛的一手师承、学生、团队或产业关系证据。";
  }

  return {
    canonicalKey: candidate.canonicalKey,
    name: candidate.name,
    region: candidate.region,
    institution: candidate.institution,
    score: candidate.score,
    disposition,
    atlasPersonId,
    officialId: rosterDecision.officialId,
    officialTitle: rosterDecision.title,
    officialSection: rosterDecision.section,
    profileUrl: rosterDecision.profileUrl ?? supplementalSecondSources.get(normalizeName(candidate.name)) ?? null,
    portraitUrl: rosterDecision.portraitUrl,
    rosterUrl: candidate.rosterMemberships?.[0]?.unitUrl ?? rosterDecision.sourcePageUrl,
    evidenceUrls: sourceUrls,
    reason,
    sourceDecision: rosterDecision.decision,
  };
});

const allowed = new Set([
  "ready",
  "duplicate",
  "exclude_non_pi",
  "exclude_out_of_scope",
  "missing_second_source",
  "missing_portrait",
  "missing_relationship",
]);
for (const decision of decisions) {
  if (!allowed.has(decision.disposition)) {
    throw new Error(`Unexpected disposition: ${decision.disposition}`);
  }
  if (!decision.rosterUrl) {
    throw new Error(`Missing official roster URL: ${decision.name}`);
  }
  if (
    !decision.profileUrl &&
    decision.disposition !== "missing_second_source"
  ) {
    throw new Error(`Missing official profile URL outside source-blocked state: ${decision.name}`);
  }
}

const byDisposition = Object.fromEntries(
  [...allowed].map((status) => [
    status,
    decisions.filter((decision) => decision.disposition === status).length,
  ]),
);
const byInstitution = Object.fromEntries(
  Object.keys(rosterFiles).map((institution) => [
    institution,
    {
      total: decisions.filter((decision) => decision.institution === institution).length,
      byDisposition: Object.fromEntries(
        [...allowed].map((status) => [
          status,
          decisions.filter(
            (decision) =>
              decision.institution === institution && decision.disposition === status,
          ).length,
        ]),
      ),
    },
  ]),
);

const output = {
  generatedAt: "2026-09-03",
  scope: "All remaining Europe P0 candidates after through-p0-batch-3",
  policy: {
    ready:
      "Current independent PI; at least two supporting sources; 3–5 sourced facts including 教育与学术训练; verified 512×512 portrait; at least one reliable network edge or public group/student record.",
    precedence:
      "duplicate → exclusion → missing_second_source → missing_portrait → missing_relationship → ready",
    note:
      "A missing-* disposition is a publication blocker, not a negative judgment about the scholar. No scope exclusion is inferred from name or coauthorship alone.",
  },
  queueGeneratedAt: queue.generatedAt,
  queueCompletedBatch: queue.completedBatch,
  total: decisions.length,
  byDisposition,
  byInstitution,
  decisions,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: decisions.length, byDisposition, byInstitution }, null, 2));
