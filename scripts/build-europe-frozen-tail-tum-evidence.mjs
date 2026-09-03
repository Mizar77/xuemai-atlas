import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceFiles = {
  computerScienceProfessors: "/private/tmp/tum-cs-professors.html",
  citChairs: "/private/tmp/tum-cit-chairs.html",
};
const outputFile = "data/official-rosters/tum-cit-ai-cs-supplemental-evidence-2026-09-03.json";

function normalizeName(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(?:prof|dr|phd|univ)\b\.?/gi, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .toLowerCase()
    .trim();
}

function cleanHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

for (const source of Object.values(sourceFiles)) {
  if (!fs.existsSync(source)) throw new Error(`Missing frozen source page: ${source}`);
}

const csHtml = fs.readFileSync(sourceFiles.computerScienceProfessors, "utf8");
const chairsHtml = fs.readFileSync(sourceFiles.citChairs, "utf8");
const prior = JSON.parse(fs.readFileSync(path.join(root, "data/roster-decisions/tum-cit-2026-09-02.json"), "utf8"));
const pendingNames = prior.decisions
  .filter((row) => row.decision === "pending_profile_verification")
  .map((row) => row.rosterName ?? row.name);
const normalizedCsText = normalizeName(cleanHtml(csHtml));

const chairs = [...chairsHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
  .map((match) => ({ html: match[1], text: cleanHtml(match[1]) }))
  .map((entry) => {
    const match = entry.text.match(/^(.*?)\s*\(Prof\.\s*(.*?)\)$/);
    if (!match) return null;
    return {
      chairTitle: match[1].trim(),
      professor: match[2].trim(),
      href: entry.html.match(/href=["']([^"']+)["']/i)?.[1] ?? null,
    };
  })
  .filter(Boolean);

const output = {
  schemaVersion: 1,
  snapshotAt: "2026-09-03",
  purpose: "Frozen first-party evidence used to close the pending TUM CIT tail without depending on mutable live HTML during decision rebuilds",
  sources: [
    {
      label: "TUM Department of Computer Science — Professors",
      url: "https://www.cs.cit.tum.de/cs/personen/professuren/",
      sourceFile: sourceFiles.computerScienceProfessors,
      sha256: crypto.createHash("sha256").update(csHtml).digest("hex"),
    },
    {
      label: "TUM CIT — Chairs and Professorships",
      url: "https://www.cit.tum.de/en/cit/school/organization/chairs-professorships/",
      sourceFile: sourceFiles.citChairs,
      sha256: crypto.createHash("sha256").update(chairsHtml).digest("hex"),
    },
  ],
  computerScienceProfessorRosterMatches: pendingNames.filter((name) => normalizedCsText.includes(normalizeName(name))),
  chairs,
};

fs.writeFileSync(path.join(root, outputFile), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputFile, computerScienceProfessorRosterMatches: output.computerScienceProfessorRosterMatches.length, chairs: chairs.length }, null, 2));
