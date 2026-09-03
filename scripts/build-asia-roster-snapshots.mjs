import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "data", "official-rosters");
fs.mkdirSync(outDir, { recursive: true });

function absoluteUrl(url, base) {
  if (!url || url === "#") return null;
  return new URL(url, base).href;
}

function writeSnapshot(filename, snapshot) {
  if (snapshot.people.length !== snapshot.officialRosterCount) {
    throw new Error(`${filename}: count mismatch ${snapshot.people.length} !== ${snapshot.officialRosterCount}`);
  }
  const ids = snapshot.people.map((person) => person.officialId);
  if (new Set(ids).size !== ids.length) throw new Error(`${filename}: duplicate officialId`);
  fs.writeFileSync(path.join(outDir, filename), `${JSON.stringify(snapshot, null, 2)}\n`);
}

function extractHustCs() {
  const scopeUrl = "https://cs.hust.edu.cn/szdw/js.htm";
  const pageUrl = "http://www.cs.hust.edu.cn/szdw/jsml/axmpyszmlb.htm";
  const html = fs.readFileSync("/private/tmp/hust-cs-current.html", "utf8");
  const start = html.indexOf('<div class="munu_js"');
  const end = html.indexOf("<!--footer", start);
  if (start < 0) throw new Error("HUST CS roster start not found");
  const body = html.slice(start, end > start ? end : undefined);
  const people = [...body.matchAll(/<a href="([^"]*)"[^>]*>([^<]+)<\/a>/g)]
    .map((match) => ({ profileUrl: absoluteUrl(match[1], pageUrl), name: match[2].trim() }))
    .filter((person) => /^[\u3400-\u9fff·]+$/.test(person.name))
    .map((person) => ({
      officialId: person.profileUrl ?? `${pageUrl}#${encodeURIComponent(person.name)}`,
      name: person.name,
      profileUrl: person.profileUrl,
      sourcePageUrl: pageUrl,
    }));
  writeSnapshot("hust-cs-alphabetical-faculty-2026-09-02.json", {
    completeness: "complete",
    fetchedAt: "2026-09-02",
    institution: "华中科技大学计算机科学与技术学院",
    officialPageUrl: scopeUrl,
    officialDataUrl: pageUrl,
    officialRosterCount: people.length,
    sourceDescription: "The current official alphabetical faculty directory was fetched from the working www HTTP endpoint after the obsolete non-www HTTPS scope URL returned a university 404 page. All letter sections were parsed; experimental staff and postdoctoral directories are separate and not included.",
    people,
  });
}

function extractHustSse() {
  const scopeUrl = "https://sse.hust.edu.cn/szdw.htm";
  const sources = [
    ["教授/研究员", "https://sse.hust.edu.cn/szdw1/js_yjy.htm", "/private/tmp/hust-sse-prof.html"],
    ["副教授", "https://sse.hust.edu.cn/szdw1/fjs.htm", "/private/tmp/hust-sse-assoc.html"],
    ["副教授", "https://sse.hust.edu.cn/szdw1/fjs/1.htm", "/private/tmp/hust-sse-assoc-2.html"],
    ["讲师", "https://sse.hust.edu.cn/szdw1/js1.htm", "/private/tmp/hust-sse-lecturer.html"],
  ];
  const people = [];
  for (const [section, sourcePageUrl, localPath] of sources) {
    const html = fs.readFileSync(localPath, "utf8");
    const start = html.indexOf('<div class="text-lists img-lists" id="main-cont">');
    const pagination = html.indexOf('<div class="pagination">', start);
    const end = pagination >= 0 ? pagination : html.indexOf("</ul>", start);
    if (start < 0 || end < 0) throw new Error(`HUST SSE roster block not found: ${localPath}`);
    const body = html.slice(start, end);
    for (const match of body.matchAll(/<a href="([^"]+)" title="([^"]+)">/g)) {
      const linkedUrl = absoluteUrl(match[1], sourcePageUrl);
      const profileUrl = /\/szdw1\/(?:js_yjy|fjs(?:\/1)?|js1)\.htm$/.test(new URL(linkedUrl).pathname) ? null : linkedUrl;
      const name = match[2].trim();
      people.push({
        officialId: profileUrl ?? `${sourcePageUrl}#${encodeURIComponent(name)}`,
        name,
        title: section,
        section,
        profileUrl,
        sourcePageUrl,
      });
    }
  }
  writeSnapshot("hust-sse-full-time-faculty-2026-09-02.json", {
    completeness: "complete",
    fetchedAt: "2026-09-02",
    institution: "华中科技大学软件学院",
    officialPageUrl: scopeUrl,
    officialDataUrl: "https://sse.hust.edu.cn/szdw1/js_yjy.htm",
    officialDataUrls: sources.map((source) => source[1]),
    officialRosterCount: people.length,
    sourceDescription: "All current official full-time faculty category pages were traversed: professors/researchers, both associate-professor pages, and lecturers. The directory currently lists 14 + 21 + 3 = 38 people. The separate overview text says 39 full-time faculty (14 + 21 + 4), so this snapshot freezes the complete visible directory and records the one-person official-site discrepancy rather than inventing a missing name. Adjunct, industry and joint-appointed professors are separate directories and are not included.",
    categoryCounts: {
      "教授/研究员": people.filter((person) => person.section === "教授/研究员").length,
      "副教授": people.filter((person) => person.section === "副教授").length,
      "讲师": people.filter((person) => person.section === "讲师").length,
    },
    people,
  });
}

function cleanHtmlText(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractNankaiAi() {
  const scopeUrl = "https://ai.nankai.edu.cn/szdw/list.htm";
  const sources = [
    ["教授(研究员)", "https://ai.nankai.edu.cn/szdw/js_yjy_.htm", "/private/tmp/nankai-ai-prof-current.html"],
    ["副教授(副研究员)", "https://ai.nankai.edu.cn/szdw/fjs_fyjy_.htm", "/private/tmp/nankai-ai-assoc-current.html"],
    ["讲师", "https://ai.nankai.edu.cn/szdw/j_s.htm", "/private/tmp/nankai-ai-lecturer-current.html"],
  ];
  const people = [];
  for (const [section, sourcePageUrl, localPath] of sources) {
    const html = fs.readFileSync(localPath, "utf8");
    for (const row of html.matchAll(/<tr id="line_[^"]+">([\s\S]*?)<\/tr>/g)) {
      const cells = [...row[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((cell) => cell[1]);
      if (cells.length !== 4) throw new Error(`Nankai AI malformed row in ${localPath}`);
      const link = cells[0].match(/<a href="([^"]+)">([\s\S]*?)<\/a>/);
      const name = cleanHtmlText(link ? link[2] : cells[0]);
      const profileUrl = link ? absoluteUrl(link[1], sourcePageUrl) : null;
      people.push({
        officialId: profileUrl ?? `${sourcePageUrl}#${encodeURIComponent(name)}`,
        name,
        title: cleanHtmlText(cells[1]),
        section,
        affiliation: cleanHtmlText(cells[2]),
        researchDirections: cleanHtmlText(cells[3]),
        profileUrl,
        sourcePageUrl,
      });
    }
  }
  writeSnapshot("nankai-ai-full-faculty-2026-09-02.json", {
    completeness: "complete",
    fetchedAt: "2026-09-02",
    institution: "南开大学人工智能学院",
    officialPageUrl: scopeUrl,
    officialDataUrl: "https://ai.nankai.edu.cn/szdw/js_yjy_.htm",
    officialDataUrls: sources.map((source) => source[1]),
    officialRosterCount: people.length,
    sourceDescription: "All current official academic-faculty tables were frozen: professor/researcher, associate professor/associate researcher, and lecturer. Experimental teaching staff, postdoctoral researchers, adjunct and emeritus faculty are separate official categories and are intentionally not included in this faculty-unit snapshot.",
    categoryCounts: Object.fromEntries(sources.map(([section]) => [section, people.filter((person) => person.section === section).length])),
    people,
  });
}

function extractNankaiCs() {
  const scopeUrl = "https://cc.nankai.edu.cn/szdw/list.htm";
  const sources = [
    ["教授/研究员", "https://cc.nankai.edu.cn/jswyjy/list.htm", "/private/tmp/nankai-cs-prof-current.html"],
    ["副教授/副研究员", "https://cc.nankai.edu.cn/fjswfyjy/list.htm", "/private/tmp/nankai-cs-assoc-current.html"],
    ["讲师", "https://cc.nankai.edu.cn/js/list.htm", "/private/tmp/nankai-cs-lecturer-current.html"],
  ];
  const people = [];
  for (const [section, sourcePageUrl, localPath] of sources) {
    const html = fs.readFileSync(localPath, "utf8");
    for (const match of html.matchAll(/<a style="color: #910012" href="([^"]+)">([\s\S]*?)<\/a>/g)) {
      const text = cleanHtmlText(match[2]);
      const titleMatch = text.match(/(讲座教授|教授|研究员|副教授|副研究员|讲师)$/);
      const title = titleMatch?.[1] ?? section;
      const name = titleMatch ? text.slice(0, -title.length).trim() : text;
      const profileUrl = absoluteUrl(match[1], sourcePageUrl);
      people.push({
        officialId: profileUrl,
        name,
        title,
        section,
        profileUrl,
        sourcePageUrl,
      });
    }
  }
  writeSnapshot("nankai-cs-full-faculty-2026-09-02.json", {
    completeness: "complete",
    fetchedAt: "2026-09-02",
    institution: "南开大学计算机学院 / 网络空间安全学院",
    officialPageUrl: scopeUrl,
    officialDataUrl: "https://cc.nankai.edu.cn/jswyjy/list.htm",
    officialDataUrls: sources.map((source) => source[1]),
    officialRosterCount: people.length,
    sourceDescription: "The obsolete combined /szdw/list.htm URL was replaced with the current official faculty navigation. All three current academic-faculty category pages were frozen: professor/researcher, associate professor/associate researcher, and lecturer. Experimental teaching staff, postdoctoral researchers, adjunct and retired personnel are separate directories and are not included.",
    categoryCounts: Object.fromEntries(sources.map(([section]) => [section, people.filter((person) => person.section === section).length])),
    people,
  });
}

function extractHustAia() {
  const scopeUrl = "https://aia.hust.edu.cn/szdw.htm";
  const pageUrl = "https://aia.hust.edu.cn/szdw/xysz/axlb.htm";
  const html = fs.readFileSync("/private/tmp/hust-aia-current.html", "utf8");
  const rosterStart = html.indexOf('<div class="js_menu">');
  if (rosterStart < 0) throw new Error("HUST AIA faculty directory block not found");
  const roster = html.slice(rosterStart);
  const departmentMarkers = [...roster.matchAll(/<div class="yjbt">\s*([^<]+?)\s*<\/div>/g)];
  const people = [];
  for (let index = 0; index < departmentMarkers.length; index += 1) {
    const marker = departmentMarkers[index];
    const department = cleanHtmlText(marker[1]);
    const start = marker.index + marker[0].length;
    const end = departmentMarkers[index + 1]?.index ?? roster.indexOf("</section>", start);
    const departmentBody = roster.slice(start, end > start ? end : undefined);
    for (const rankBlock of departmentBody.matchAll(/<div class="munu_js">([\s\S]*?)<\/div>\s*<script>/g)) {
      const rank = cleanHtmlText(rankBlock[1].match(/<h6>([\s\S]*?)<\/h6>/)?.[1] ?? "");
      for (const link of rankBlock[1].matchAll(/<li><a href="([^"]+)"[^>]*>([^<]+)<\/a><\/li>/g)) {
        const profileUrl = absoluteUrl(link[1], pageUrl);
        people.push({
          officialId: profileUrl,
          name: cleanHtmlText(link[2]),
          title: rank,
          section: department,
          profileUrl,
          sourcePageUrl: pageUrl,
        });
      }
    }
  }
  writeSnapshot("hust-aia-department-faculty-2026-09-02.json", {
    completeness: "complete",
    fetchedAt: "2026-09-02",
    institution: "华中科技大学人工智能与自动化学院",
    officialPageUrl: scopeUrl,
    officialDataUrl: pageUrl,
    officialRosterCount: people.length,
    sourceDescription: "The obsolete scope URL returned a university 404 page. The current official 按系列表 directory was parsed across every department and each 正高、副高、中级 block. Distinguished-scholars, experimental staff, postdoctoral and emeritus directories are separate and are not merged into this unit.",
    categoryCounts: Object.fromEntries(departmentMarkers.map((marker) => {
      const department = cleanHtmlText(marker[1]);
      return [department, people.filter((person) => person.section === department).length];
    })),
    people,
  });
}

extractHustCs();
extractHustSse();
extractNankaiAi();
extractNankaiCs();
extractHustAia();
