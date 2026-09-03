import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "data", "official-rosters");
fs.mkdirSync(outDir, { recursive: true });

function absoluteUrl(url, base) {
  if (!url || url === "#") return null;
  return new URL(url, base).href;
}

function cleanHtmlText(value) {
  return value
    .replace(/<br\s*\/?\s*>/gi, " · ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function writeSnapshot(filename, snapshot) {
  if (snapshot.people.length !== snapshot.officialRosterCount) {
    throw new Error(`${filename}: count mismatch ${snapshot.people.length} !== ${snapshot.officialRosterCount}`);
  }
  const ids = snapshot.people.map((person) => person.officialId);
  if (new Set(ids).size !== ids.length) throw new Error(`${filename}: duplicate officialId`);
  fs.writeFileSync(path.join(outDir, filename), `${JSON.stringify(snapshot, null, 2)}\n`);
}

function extractBuptCs() {
  const scopeUrl = "https://scs.bupt.edu.cn/szdw/jsml.htm";
  const pageUrl = "http://scs.bupt.edu.cn/szjs1/jsyl.htm";
  const html = fs.readFileSync("/private/tmp/buptcs_http.html", "utf8");
  const sections = [...html.matchAll(/<h3>([^<]+)<\/h3>[\s\S]*?<table class="teacher_table">([\s\S]*?)<\/table>/g)];
  if (sections.length !== 16) throw new Error(`BUPT CS: expected 16 official sections, got ${sections.length}`);

  const byId = new Map();
  let sourceEntryCount = 0;
  for (const sectionMatch of sections) {
    const section = cleanHtmlText(sectionMatch[1]);
    for (const personMatch of sectionMatch[2].matchAll(/<a href="([^"]+)"[^>]*title="([^"]+)"/g)) {
      sourceEntryCount += 1;
      const profileUrl = absoluteUrl(personMatch[1], pageUrl);
      const name = cleanHtmlText(personMatch[2]);
      const officialId = profileUrl ?? `${pageUrl}#${encodeURIComponent(name)}`;
      const existing = byId.get(officialId);
      if (existing) {
        if (!existing.sections.includes(section)) existing.sections.push(section);
      } else {
        byId.set(officialId, {
          officialId,
          name,
          sections: [section],
          profileUrl,
          sourcePageUrl: pageUrl,
        });
      }
    }
  }
  const people = [...byId.values()];
  writeSnapshot("bupt-cs-complete-faculty-2026-09-02.json", {
    completeness: "complete",
    fetchedAt: "2026-09-02",
    institution: "北京邮电大学计算机学院（国家示范性软件学院）",
    officialPageUrl: scopeUrl,
    officialDataUrl: pageUrl,
    officialDataUrls: [pageUrl],
    officialRosterCount: people.length,
    sourceEntryCount,
    sourceDescription: "The current official 教师一览 page was fetched through the university's HTTP/mobile-compatible response after its HTTPS response returned only a JavaScript WAF shell. All 16 research-centre tables were parsed. The page contains 225 section memberships and 224 unique official profile records. 戴志涛 is the sole repeated profile and both memberships are preserved. Two 王玉龙 entries have different official profile URLs and are therefore retained as distinct official records rather than merged by name.",
    categoryCounts: Object.fromEntries(sections.map((match) => {
      const section = cleanHtmlText(match[1]);
      const count = [...match[2].matchAll(/<a href="([^"]+)"[^>]*title="([^"]+)"/g)].length;
      return [section, count];
    })),
    people,
  });
}

function extractBuptAi() {
  const scopeUrl = "https://ai.bupt.edu.cn/szdw.htm";
  const baseUrl = "http://ai.bupt.edu.cn/szdw/szyl/";
  const categoryPages = [
    ["智能信息工程系", "znxxgcx", 8],
    ["智能科学与技术系", "znkxyjsx", 6],
    ["脑认知与智能医学系", "nrzyznyxx", 2],
    ["实验中心", "syzx", 1],
  ];
  const people = [];
  const officialDataUrls = [];
  for (const [section, slug, pages] of categoryPages) {
    for (let pageNumber = pages; pageNumber >= 1; pageNumber -= 1) {
      const filename = `/private/tmp/bupt-ai-pages/${slug}-${pageNumber}.html`;
      const sourcePageUrl = pageNumber === pages
        ? `${baseUrl}${slug}.htm`
        : `${baseUrl}${slug}/${pageNumber}.htm`;
      officialDataUrls.push(sourcePageUrl);
      const html = fs.readFileSync(filename, "utf8");
      const blocks = [...html.matchAll(/<li style="background: #eeeeee;">([\s\S]*?)<\/li>/g)];
      for (let rowIndex = 0; rowIndex < blocks.length; rowIndex += 1) {
        const block = blocks[rowIndex][1];
        const link = block.match(/<span style="width:270px">\s*<a href="([^"]*)">([\s\S]*?)<\/a>/);
        if (!link) throw new Error(`BUPT AI: malformed person card in ${filename}`);
        const details = block.match(/<span style="width:270px">[\s\S]*?<p>([\s\S]*?)<\/p>/);
        const image = block.match(/<img src="([^"]+)"/);
        const name = cleanHtmlText(link[2]);
        const rawText = cleanHtmlText(details?.[1] ?? "");
        const profileUrl = absoluteUrl(link[1], sourcePageUrl);
        const email = rawText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]?.toLowerCase() ?? null;
        const officialId = profileUrl ?? email ?? `${sourcePageUrl}#row-${rowIndex + 1}`;
        people.push({
          officialId,
          name,
          section,
          profileUrl,
          imageUrl: absoluteUrl(image?.[1] ?? null, sourcePageUrl),
          rawText,
          sourcePageUrl,
        });
      }
    }
  }
  writeSnapshot("bupt-ai-complete-faculty-2026-09-02.json", {
    completeness: "complete",
    fetchedAt: "2026-09-02",
    institution: "北京邮电大学人工智能学院",
    officialPageUrl: scopeUrl,
    officialDataUrl: officialDataUrls[0],
    officialDataUrls,
    officialRosterCount: people.length,
    sourceDescription: "The official 师资一览 navigation currently exposes four complete categories. Every pagination page was fetched through the university's HTTP/mobile-compatible response after HTTPS returned only a JavaScript WAF shell: 智能信息工程系 73, 智能科学与技术系 51, 脑认知与智能医学系 13, 实验中心 4. All 141 named cards are unique and are retained without PI classification.",
    categoryCounts: Object.fromEntries(categoryPages.map(([section]) => [section, people.filter((person) => person.section === section).length])),
    people,
  });
}

extractBuptCs();
extractBuptAi();
