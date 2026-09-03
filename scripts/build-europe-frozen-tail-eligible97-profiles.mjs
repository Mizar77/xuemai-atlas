import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const decisionFile = "data/roster-decisions/europe-frozen-tail-eligible97-final-2026-09-03.json";
const outputFile = "data/roster-decisions/europe-frozen-tail-eligible97-profile-evidence-2026-09-03.json";
const portraitDirectory = "public/portraits/europe-frozen-tail-eligible97-2026";
const decisions = JSON.parse(fs.readFileSync(path.join(root, decisionFile), "utf8")).decisions;
const aaltoResearchProfileOverrides = {
  "Jara Joel Olavi Uitto": "https://research.aalto.fi/en/persons/jara-uitto/",
  "Jari Saramäki": "https://research.aalto.fi/en/persons/jari-saram%C3%A4ki/",
  "Mikko Kivelä": "https://research.aalto.fi/en/persons/mikko-kivel%C3%A4/",
  // The unsuffixed research-portal route belongs to a different Aalto employee.
  // The Department of Computer Science professor's canonical Pure record is -2.
  "Juho Leinonen": "https://research.aalto.fi/en/persons/juho-leinonen-2/",
};

// Some official directory pages expose a generic person.svg through og:image.
// These overrides point to an identity-specific image on an official university,
// research-centre, lab, or academic-conference page. We deliberately leave
// Florian Bruse unresolved rather than publishing the generic TUM icon as a photo.
const portraitOverrides = {
  "Alexandros Hollender": "https://www.asc.ox.ac.uk/sites/default/files/styles/person_full_page/public/2026-07/Hollender_A.jpg.avif?itok=GZinPYH9",
  "Cristina Piazza": "https://portal.fis.tum.de/files-asset/64384318/piazza-cristina.jpg/",
  "Hans-Joachim Bungartz": "https://portal.fis.tum.de/files-asset/64386373/bungartz-hans-joachim.jpg/",
  "Harald Räcke": "https://www.professoren.tum.de/fileadmin/w00bgr/www/pics/Ra__ckeHarald.jpg",
  "Julien Gagneur": "https://portal.fis.tum.de/files-asset/64390749/gagneur-julien.jpg/",
  "Maribel Acosta Deibe": "https://www.cs.cit.tum.de/fileadmin/_processed_/2/8/csm_Screenshot_2024-09-24_at_09.32.21_f4bf5afaad.webp",
  "Pramod Bhatotia": "https://dse.in.tum.de/wp-content/uploads/2024/01/Bhatotia-2022.jpeg",
  "Reinhard Heckel": "https://portal.fis.tum.de/files-asset/64391042/heckel-reinhard.jpg/",
  "Riccardo Marin": "https://mcml.ai/images/pis/marin_riccardo.webp",
  "Stefanie Jegelka": "https://mcml.ai/images/pis/jegelka.webp",
  "Suvrit Sra": "https://mcml.ai/images/pis/sra.webp",
  "V. Spors": "https://www.mindtrek.org/wp-content/uploads/2024/01/Academic-Chairs-photos_Velvet-300x300.png",
  "Zeynep Akata-Schulz": "https://mcml.ai/images/pis/akata.webp",
  "Juho Leinonen": "https://research.aalto.fi/files-asset/177027486/pic.jpg?w=800&f=jpg",
  "Verena Distler": "https://acris.aalto.fi/ws/portalfiles/portal/231423547/profile.jpg",
  "Vili Lehdonvirta": "https://www.aalto.fi/sites/default/files/styles/o_288w_ah_n/public/2024-04/Aalto_University_Vili_Lehdonvirta_26-3-2024_photo_by_Mikko_Raskinen_001.jpg?itok=EpAVTCae",
};

const decode = (value) => String(value ?? "")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#039;|&#39;/g, "'")
  .replace(/&nbsp;/g, " ");

const slugFromUrl = (url) => new URL(url).pathname.split("/").filter(Boolean).at(-1);
const absolute = (url, base) => new URL(decode(url), base).href;

async function fetchBuffer(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 Xuemai Atlas roster audit" } });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return { buffer: Buffer.from(await response.arrayBuffer()), finalUrl: response.url, contentType: response.headers.get("content-type") ?? "" };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 250));
    }
  }
  throw lastError;
}

function parseAalto(html, profileUrl) {
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let person = null;
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(decode(block[1]));
      if (parsed?.["@type"] === "Person") { person = parsed; break; }
    } catch {
      // Ignore malformed embedded JSON-LD and continue to the remaining blocks.
    }
  }
  const image = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
  const affiliations = (person?.affiliation ?? []).map((entry) => entry.name).filter(Boolean);
  const researchAreas = affiliations.filter((name) => /research area|cross-cutting theme|institute|centre|center/i.test(name));
  return {
    profileUrl,
    jobTitle: person?.jobTitle ?? "Professor",
    affiliations,
    researchAreas,
    portraitUrl: image ? absolute(image, profileUrl) : null,
  };
}

async function evidenceFor(row) {
  if (row.unitId === "tum-cit") {
    return {
      profileUrl: row.profileUrl,
      supportingUrl: row.evidenceUrl,
      jobTitle: row.title || "Professor",
      researchAreas: [row.evidence],
      affiliations: ["Technical University of Munich", "TUM School of Computation, Information and Technology"],
      portraitUrl: portraitOverrides[row.rosterName]
        ?? (/\/person\.svg(?:$|\?)/i.test(row.portraitUrl ?? "") ? null : row.portraitUrl),
    };
  }
  if (row.unitId === "aalto-cs") {
    const researchProfile = aaltoResearchProfileOverrides[row.rosterName]
      ?? `https://research.aalto.fi/en/persons/${slugFromUrl(row.profileUrl)}/`;
    const { buffer, finalUrl } = await fetchBuffer(researchProfile);
    const evidence = parseAalto(buffer.toString("utf8"), finalUrl);
    return {
      ...evidence,
      supportingUrl: row.profileUrl,
      portraitUrl: portraitOverrides[row.rosterName] ?? evidence.portraitUrl,
    };
  }
  if (row.unitId === "surrey-pai") {
    return {
      profileUrl: "https://www.surrey.ac.uk/artificial-intelligence/people",
      supportingUrl: "https://surreylawtech.org/authors/firlejm/",
      jobTitle: "Lecturer in AI and Regulation",
      researchAreas: ["AI regulation", "law and technology"],
      affiliations: ["University of Surrey", "Institute for People-Centred AI"],
      portraitUrl: "https://www.surrey.ac.uk/sites/default/files/styles/image_150x150_scale_and_crop/public/2022-03/Mikolaj_Firlej_400x400.jpg?itok=sV4I0Q_k",
    };
  }
  if (row.rosterName === "Helen Hastie") {
    return {
      profileUrl: "https://homepages.inf.ed.ac.uk/hhastie2/aboutme.html",
      supportingUrl: "https://informatics.ed.ac.uk/news-events/news/news-archive/helen-hastie-appointed-new-head-of-school",
      jobTitle: "Head of School · Professor of Human-Robot Interaction",
      researchAreas: ["human-robot interaction", "natural language interfaces", "trustworthy autonomous systems"],
      affiliations: ["University of Edinburgh", "School of Informatics", "Edinburgh Centre for Robotics"],
      portraitUrl: "https://homepages.inf.ed.ac.uk/hhastie2/images/Hastie-bw.png",
    };
  }
  if (row.rosterName === "Michael Herrmann") {
    return {
      profileUrl: "https://www.research.ed.ac.uk/en/persons/michael-herrmann/",
      supportingUrl: "https://informatics.ed.ac.uk/ipab/people2",
      jobTitle: "Lecturer in Robotics",
      researchAreas: ["robot learning", "computational neuroscience", "machine learning"],
      affiliations: ["University of Edinburgh", "School of Informatics", "Institute of Perception, Action and Behaviour"],
      portraitUrl: "https://www.research.ed.ac.uk/files-asset/14441696/Herrmann_Michael_2.png/",
    };
  }
  throw new Error(`No profile strategy for ${row.rosterName}`);
}

fs.mkdirSync(path.join(root, portraitDirectory), { recursive: true });
const records = [];
const queue = [...decisions];
const workers = Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const row = queue.shift();
    const record = { atlasPersonId: row.atlasPersonId, unitId: row.unitId, name: row.rosterName };
    const localPath = `${portraitDirectory}/${row.atlasPersonId}.webp`;
    try {
      const evidence = await evidenceFor(row);
      Object.assign(record, evidence);
      if (!evidence.portraitUrl) throw new Error("No official portrait URL found");
      const portrait = await fetchBuffer(evidence.portraitUrl);
      await sharp(portrait.buffer)
        .rotate()
        .resize(512, 512, { fit: "cover", position: "attention" })
        .webp({ quality: 88 })
        .toFile(path.join(root, localPath));
      record.portraitSourceUrl = portrait.finalUrl;
      record.portraitLocalPath = localPath.replace(/^public\//, "");
      record.status = "ready";
    } catch (error) {
      const stalePortrait = path.join(root, localPath);
      if (fs.existsSync(stalePortrait)) fs.unlinkSync(stalePortrait);
      record.status = "blocked";
      record.blocker = error instanceof Error ? error.message : String(error);
    }
    records.push(record);
  }
});
await Promise.all(workers);
records.sort((a, b) => a.unitId.localeCompare(b.unitId) || a.name.localeCompare(b.name));

const readyCount = records.filter((row) => row.status === "ready").length;
const output = {
  schemaVersion: 1,
  snapshotAt: "2026-09-03",
  decisionArtifact: decisionFile,
  portraitDirectory,
  recordCount: records.length,
  readyCount,
  blockedCount: records.length - readyCount,
  records,
};
fs.writeFileSync(path.join(root, outputFile), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, recordCount: records.length, readyCount, blockedCount: records.length - readyCount, blocked: records.filter((row) => row.status === "blocked").map((row) => ({ name: row.name, blocker: row.blocker })) }, null, 2));
