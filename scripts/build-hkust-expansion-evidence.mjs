import fs from "node:fs";
import path from "node:path";

const checkedAt = "2026-09-02";
const profileDir = process.argv.find((arg) => arg.startsWith("--profile-dir="))?.split("=")[1];
const evidencePath = "data/official-rosters/hkust-cse-profile-evidence-batch2-2026-09-02.json";
const proposalPath = "data/roster-decisions/hkust-cse-expansion-proposal-batch2-2026-09-02.json";

const selected = {
  "9c4d1717e1d42b5d": "lei-chen-hkust",
  "de41612e7bb48529": "yike-guo-hkust",
  "fbef5672f01df3a5": "huamin-qu-hkust",
  "6d0debded94bf780": "albert-chung-hkust",
  "a25753583e06810d": "james-kwok-hkust",
  "7b2545ea45a2ad1f": "fangzhen-lin-hkust",
  "a251b47edaa322e3": "long-quan-hkust",
  "0986e0cb0f1f45b0": "chi-keung-tang-hkust",
  "b7354aaff17b5c85": "xiaojuan-ma-hkust",
  "7fe4d5c5e8aee69f": "long-chen-hkust",
  "d4dbd48ba8cbcff9": "sehi-lyi-hkust",
  "fe463eb171f63a33": "zihan-zhang-hkust",
};

const decisions = JSON.parse(fs.readFileSync("data/roster-decisions/hkust-cse-2026-09-02.json", "utf8"));
const strip = (value) => value
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&rsquo;/gi, "’")
  .replace(/&ldquo;|&rdquo;/gi, '"')
  .replace(/&#039;/g, "'")
  .replace(/\s+/g, " ")
  .trim();

const capture = (html, expression) => strip(html.match(expression)?.[1] ?? "");

let evidence;
if (profileDir) {
  evidence = decisions.decisions
    .filter((decision) => selected[decision.officialId])
    .map((decision) => {
      const html = fs.readFileSync(path.join(profileDir, `${decision.officialId}.html`), "utf8");
      return {
        officialId: decision.officialId,
        atlasPersonId: selected[decision.officialId],
        name: decision.name,
        profileUrl: decision.profileUrl,
        portraitUrl: decision.portraitUrl,
        displayName: capture(html, /<h4 class="name">([\s\S]*?)<\/h4>/i),
        education: capture(html, /<p class="edu">([\s\S]*?)<\/p>/i),
        position: capture(html, /<p class="post">([\s\S]*?)<\/p>/i),
        researchInterests: capture(html, /<h5>Research Interests<\/h5>\s*<p>([\s\S]*?)<\/p>/i),
        biography: capture(html, /<h5>Biography<\/h5>([\s\S]*?)(?:<\/div>|<h5>)/i),
      };
    });
  fs.writeFileSync(evidencePath, `${JSON.stringify({
    unitId: "hkust-cse",
    extractedAt: checkedAt,
    sourcePageUrl: decisions.sourcePageUrl,
    people: evidence,
  }, null, 2)}\n`);
} else {
  evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8")).people;
}

if (evidence.length !== Object.keys(selected).length) {
  throw new Error(`Expected ${Object.keys(selected).length} selected profiles, found ${evidence.length}`);
}

fs.writeFileSync(proposalPath, `${JSON.stringify({
  unitId: "hkust-cse",
  reviewedAt: checkedAt,
  module: "app/hkust-cse-roster-expansion-batch2-2026.ts",
  relationshipPolicy: "Only supervision, career and student outcomes explicitly stated by a first-party university or personal profile are represented. Co-authorship alone is never treated as lineage.",
  readyCount: evidence.length,
  ready: evidence.map((person) => ({
    officialId: person.officialId,
    name: person.name,
    atlasPersonId: person.atlasPersonId,
    profileUrl: person.profileUrl,
    portraitPath: `public/portraits/hkust-cse-roster-batch2-2026/${person.atlasPersonId}.jpg`,
    status: "ready_for_parent_integration",
  })),
}, null, 2)}\n`);

console.log(JSON.stringify({ readyCount: evidence.length, evidencePath, proposalPath }, null, 2));
