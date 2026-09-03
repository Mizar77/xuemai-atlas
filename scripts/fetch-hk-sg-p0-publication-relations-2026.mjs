import fs from "node:fs";

const master = JSON.parse(fs.readFileSync("data/candidate-priority-p0-master-disposition-2026-09-03.json", "utf8"));
const firstPass = JSON.parse(fs.readFileSync("data/candidate-priority-p0-hk-sg-full-batch-2026-09-03.json", "utf8"));
const completed = new Set(firstPass.selected.map((row) => row.canonicalKey));
const rows = master.records.filter((row) =>
  ["Hong Kong", "Singapore"].includes(row.region)
  && row.disposition === "missing_relationship"
  && !completed.has(row.canonicalKey),
);

const aliases = {
  "香港中文大学": ["Chinese University of Hong Kong", "CUHK"],
  "香港城市大学": ["City University of Hong Kong", "CityU"],
  "香港理工大学": ["Hong Kong Polytechnic University", "PolyU"],
  "National University of Singapore": ["National University of Singapore", "NUS"],
  "Nanyang Technological University": ["Nanyang Technological University", "NTU"],
  "Singapore Management University": ["Singapore Management University", "SMU"],
  "Singapore University of Technology and Design": ["Singapore University of Technology and Design", "SUTD"],
};

const cleanName = (name) => name
  .replace(/^Prof\.?\s+/i, "")
  .replace(/[\u3400-\u9fff豈-﫿]+/g, "")
  .replace(/\s+/g, " ")
  .trim();
const normalize = (value) => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]/g, "");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, retries = 4) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const response = await fetch(url, { headers: { "User-Agent": "XuemaiAtlas/1.0 (public academic graph audit)" } });
    if (response.ok) return response.json();
    if (![429, 500, 502, 503, 504].includes(response.status) || attempt === retries) throw new Error(`${response.status} ${response.statusText}`);
    await sleep(750 * (attempt + 1));
  }
}

function institutionText(author) {
  return (author.affiliations ?? []).flatMap((entry) => entry.institution ? [entry.institution.display_name] : [])
    .concat((author.last_known_institutions ?? []).map((entry) => entry.display_name))
    .join(" | ");
}

function chooseAuthor(row, results) {
  const target = normalize(cleanName(row.name).replace(/,/g, " "));
  const instAliases = aliases[row.institution] ?? [row.institution];
  return (results ?? []).map((author) => {
    const candidate = normalize(author.display_name);
    const nameScore = candidate === target ? 8 : (candidate.includes(target) || target.includes(candidate) ? 5 : 0);
    const affiliation = institutionText(author).toLowerCase();
    const institutionScore = instAliases.some((alias) => affiliation.includes(alias.toLowerCase())) ? 6 : 0;
    return { author, score: nameScore + institutionScore, nameScore, institutionScore, affiliation };
  }).sort((a, b) => b.score - a.score)[0];
}

async function processRow(row) {
  try {
    const query = encodeURIComponent(cleanName(row.name).replace(/,/g, " "));
    const authorData = await getJson(`https://api.openalex.org/authors?search=${query}&per-page=5&mailto=xuemai-atlas-audit@example.com`);
    const match = chooseAuthor(row, authorData.results);
    if (!match || match.nameScore < 5 || match.institutionScore < 6) {
      return { canonicalKey: row.canonicalKey, name: row.name, disposition: "missing_relationship", reason: "OpenAlex 作者检索未找到姓名与当前机构同时匹配的唯一作者；为避免同名误连，保持待核验。", authorCandidates: (authorData.results ?? []).slice(0, 5).map((author) => ({ id: author.id, name: author.display_name, affiliation: institutionText(author) })) };
    }
    const authorId = match.author.id.split("/").pop();
    const works = await getJson(`https://api.openalex.org/works?filter=author.id:${authorId},from_publication_date:2021-01-01&sort=cited_by_count:desc&per-page=20&select=id,doi,display_name,publication_year,primary_location,authorships&mailto=xuemai-atlas-audit@example.com`);
    const work = (works.results ?? []).find((item) => {
      const coauthors = (item.authorships ?? []).filter((entry) => entry.author?.id !== match.author.id && entry.author?.display_name);
      return coauthors.length > 0 && Boolean(item.doi || item.primary_location?.landing_page_url);
    });
    if (!work) return { canonicalKey: row.canonicalKey, name: row.name, disposition: "missing_relationship", reason: "已唯一匹配 OpenAlex 作者与当前机构，但近年论文中未找到同时具备共同作者和可追溯出版链接的记录。", openAlexAuthorId: match.author.id };
    const coauthor = work.authorships.find((entry) => entry.author?.id !== match.author.id && entry.author?.display_name)?.author;
    return {
      canonicalKey: row.canonicalKey,
      name: row.name,
      disposition: "publication_relation_found",
      profileUrl: row.evidenceUrls?.[0],
      rosterUrl: row.evidenceUrls?.[1],
      portraitUrl: row.portraitUrl,
      openAlexAuthor: { id: match.author.id, name: match.author.display_name, affiliation: match.affiliation },
      relationship: {
        type: "collaboration",
        coauthor: { id: coauthor.id, name: coauthor.display_name },
        work: work.display_name,
        year: work.publication_year,
        evidenceUrl: work.doi || work.primary_location?.landing_page_url || work.id,
        openAlexWork: work.id,
      },
    };
  } catch (error) {
    return { canonicalKey: row.canonicalKey, name: row.name, disposition: "fetch_error", reason: String(error) };
  }
}

const results = [];
let cursor = 0;
async function worker() {
  while (cursor < rows.length) {
    const index = cursor;
    cursor += 1;
    results[index] = await processRow(rows[index]);
  }
}
await Promise.all(Array.from({ length: 4 }, () => worker()));

const report = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  scope: "Remaining HK+SG P0 missing-relationship candidates; current-affiliation disambiguated publication coauthor audit",
  reviewed: rows.length,
  counts: Object.fromEntries([...new Set(results.map((row) => row.disposition))].sort().map((status) => [status, results.filter((row) => row.disposition === status).length])),
  records: results,
};
fs.writeFileSync("data/candidate-priority-p0-hk-sg-publication-relations-2026-09-03.json", `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ reviewed: report.reviewed, counts: report.counts }, null, 2));
