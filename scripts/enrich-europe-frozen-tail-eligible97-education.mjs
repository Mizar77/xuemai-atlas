import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const profileFile = "data/roster-decisions/europe-frozen-tail-eligible97-profile-evidence-2026-09-03.json";
const profilePath = path.join(root, profileFile);
const profilePackage = JSON.parse(fs.readFileSync(profilePath, "utf8"));

const decode = (value) => String(value ?? "")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&quot;|&#34;/gi, '"')
  .replace(/&#039;|&#39;|&apos;/gi, "'")
  .replace(/&auml;/gi, "ä").replace(/&ouml;/gi, "ö").replace(/&uuml;/gi, "ü")
  .replace(/&Auml;/g, "Ä").replace(/&Ouml;/g, "Ö").replace(/&Uuml;/g, "Ü")
  .replace(/&szlig;/gi, "ß")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)));

const plain = (html) => decode(html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<br\s*\/?>/gi, ". ")
  .replace(/<\/p>|<\/li>|<\/div>|<\/h\d>/gi, ". ")
  .replace(/<[^>]+>/g, " "))
  .replace(/\s+/g, " ")
  .replace(/\.\s*\./g, ".")
  .trim();

async function fetchHtml(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 Xuemai Atlas education evidence audit" },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return { html: await response.text(), finalUrl: response.url };
}

function compact(value, max = 680) {
  const normalized = value.replace(/\s+/g, " ").replace(/\s+([,.;:])/g, "$1").trim();
  return normalized.length <= max ? normalized : `${normalized.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function verified(value, sourceUrl, sourceLabel) {
  return {
    status: "verified",
    value: compact(value),
    sourceUrl,
    sourceLabel,
    sourceSupports: "Education and academic training: degrees, doctoral or postdoctoral history",
  };
}

function extractAalto(html, sourceUrl, name) {
  const block = html.match(/<div[^>]+rendering_personeducationrendererportal[^>]*>([\s\S]*?)(?=<div[^>]+(?:rendering_keywordable|rendering_personfieldofresearch|rendering_personexternalposition))/i)?.[1];
  if (!block) return null;
  const entries = [...block.matchAll(/<div[^>]+rendering_personeducation\b[^>]*>([\s\S]*?)<\/div>/gi)]
    .map((match) => plain(match[1]))
    .filter((entry) => /degree|doctor|Ph\.?D\.?|master|licentiate|diploma|qualification/i.test(entry));
  if (!entries.length) return null;
  return verified(`官方学术档案列出：${entries.slice(0, 3).join("；")}`, sourceUrl, `${name} — Aalto official education record`);
}

function splitSentences(value) {
  return value
    .split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function extractTum(html, sourceUrl, name) {
  const section = html.match(/Academic Career and Research Areas\s*<\/h3>([\s\S]*?)(?=<h[23]|<ul|<div[^>]+frame-type)/i)?.[1];
  if (!section) return null;
  const sentences = splitSentences(plain(section));
  const education = sentences.filter((sentence) =>
    /\b(?:doctoral|doctorate|doctor's|doctorate|Ph\.?D\.?|master'?s|M\.?Sc\.?|diploma|degree|graduat(?:ed|ion)|studied|studies|education|postdoc(?:toral)?|habilitation)\b/i.test(sentence)
    && /\b(?:universit(?:y|ies)|universit[aä]t|institute|laborator(?:y|ies)|academy|school|college|ETH|EPFL|MIT|Stanford|Berkeley|TUM|LMU|RWTH|KTH|TU|MPI|Ph\.?D\.?|doctor|master|diploma|habilitation)\b/i.test(sentence));
  if (!education.length) return null;
  return verified(`TUM 官方教授履历记录：${education.slice(0, 3).join(" ")}`, sourceUrl, `${name} — TUM official professor biography`);
}

const explicitEvidence = {
  "Juho Leinonen": {
    url: "https://research.aalto.fi/en/persons/juho-leinonen-2/",
    value: "Aalto 官方学术档案列出其博士学位研究（PhD），博士论文为 Keystroke Data in Programming Courses，授予机构为 University of Helsinki。",
    label: "Juho Leinonen — Aalto official research profile",
  },
  "Mario Di Francesco": {
    url: "https://www.aalto.fi/en/people/mario-di-francesco",
    value: "Aalto 官方个人页记录其 2009 年于 University of Pisa 获 Information Engineering 博士学位，博士导师为 Giuseppe Anastasi。",
    label: "Mario Di Francesco — Aalto official biography",
  },
  "Sebastian Szyller": {
    url: "https://www.aalto.fi/en/people/sebastian-szyller",
    value: "Aalto 官方个人页记录其在 Aalto University 完成硕士与博士训练，两个学位阶段均由 N. Asokan 指导。",
    label: "Sebastian Szyller — Aalto official biography",
  },
  "Verena Distler": {
    url: "https://www.aalto.fi/en/people/verena-distler",
    value: "Aalto 官方个人页记录其于 University of Luxembourg 获心理学博士学位，之后在 University of the Bundeswehr Munich 从事博士后研究，并曾访问 Carnegie Mellon University CyLab。",
    label: "Verena Distler — Aalto official biography",
  },
  "Vili Lehdonvirta": {
    url: "https://www.aalto.fi/en/news/vili-lehdonvirta-the-digital-world-isnt-a-separate-dimension-in-some-virtual-cloud",
    value: "Aalto 官方访谈记录其 2005 年获 Helsinki University of Technology 工程学位，2009 年获 Turku School of Economics 经济社会学博士学位，随后在东京与伦敦从事博士后研究。",
    label: "Vili Lehdonvirta — Aalto official biography",
  },
  "Helen Hastie": {
    url: "https://homepages.inf.ed.ac.uk/hhastie2/aboutme.html",
    value: "University of Edinburgh 官方个人页记录其在 Edinburgh Centre for Speech Technology Research 获博士学位，并于 Georgetown University 获硕士学位、University of Edinburgh 获文学硕士学位。",
    label: "Helen Hastie — University of Edinburgh official profile",
  },
  "Michael Herrmann": {
    url: "https://www.research.ed.ac.uk/en/persons/michael-herrmann/",
    value: "University of Edinburgh 官方学术档案记录其 1988 年于 University of Leipzig 获 Diploma、1993 年获博士学位，随后在丹麦与日本从事博士后研究。",
    label: "Michael Herrmann — University of Edinburgh official research profile",
  },
  "Alexandros Hollender": {
    url: "https://www.asc.ox.ac.uk/people/dr-alexandros-hollender",
    value: "University of Oxford 官方页面记录其在 Oxford 完成计算机科学 DPhil，导师为 Paul Goldberg；此前于 Stanford 获计算机科学硕士，并在 École Polytechnique 与 TUM 完成工程和数学训练。",
    label: "Alexandros Hollender — University of Oxford official profile",
  },
  "Amr Abdelhafez": {
    url: "https://mediatum.ub.tum.de/doc/1533825/1533825.pdf",
    value: "TUM 官方论文库收录其博士论文《Set-Based Prediction and Fault-Tolerant Control》，学位论文于 2020 年获 TUM 接受，审阅人为 Matthias Althoff 与 João P. Hespanha。",
    label: "Amr Abdelhafez — TUM doctoral dissertation",
  },
  "Berna Özkale Edelmann": {
    url: "https://www.ee.cit.tum.de/en/rmn/people/",
    value: "TUM 官方研究组履历记录其 2009 年获 Istanbul Technical University 化学工程学士、2011 年获 ETH Zurich 生物医学工程硕士、2016 年获 ETH Zurich 博士学位，并在 ETH、EPFL 与 Harvard 从事博士后研究。",
    label: "Berna Özkale Edelmann — TUM official group profile",
  },
  "Bernd Finkbeiner": {
    url: "https://rct.cit.tum.de/people/finkbeiner/",
    value: "TUM 官方研究组个人页记录其 2003 年于 Stanford University 获计算机科学博士学位。",
    label: "Bernd Finkbeiner — TUM official group profile",
  },
  "Maribel Acosta Deibe": {
    url: "https://www.cs.cit.tum.de/en/cde/people/maribel-acosta/",
    value: "TUM 官方个人页记录其于 Karlsruhe Institute of Technology 获计算机科学博士学位，博士训练由 Rudi Studer 指导。",
    label: "Maribel Acosta — TUM official profile",
  },
  "Pramod Bhatotia": {
    url: "https://dse.in.tum.de/bhatotia/",
    value: "TUM 官方研究组个人页记录其于 Max Planck Institute for Software Systems 完成博士训练并获博士学位。",
    label: "Pramod Bhatotia — TUM official group profile",
  },
  "Ali Sunyaev": {
    url: "https://www.dualcareer.tum.de/fileadmin/w00bif/www/_my_direct_uploads/TUM_Prelude_Yearbook_2024.pdf",
    value: "TUM 官方新任教授年鉴记录其 2005 年于 TUM 获计算机科学 Diplom，2010 年于 TUM 获信息系统博士学位，并曾在 Harvard University 与 Russian Academy of Sciences 开展访问研究。",
    label: "Ali Sunyaev — TUM Prelude official biography",
  },
  "Matthias Grabmair": {
    url: "https://legaltech.cit.tum.de/people/matthias-grabmair/",
    value: "TUM Legal Tech 官方个人页记录其于 University of Augsburg 获法律 Diplom，并于 University of Pittsburgh 获 LL.M. 与 Intelligent Systems 博士学位，博士导师为 Kevin Ashley；之后在 CMU Language Technologies Institute 从事博士后及研究工作。",
    label: "Matthias Grabmair — TUM Legal Tech official profile",
  },
  "Stefanie Jegelka": {
    url: "https://ilpstex.mit.edu/en/content/faculty-profiles/stefanie-jegelka",
    value: "MIT 官方教师履历记录其于 ETH Zurich 获计算机科学博士学位（与 Max Planck Institute for Intelligent Systems 合作完成），此前于 University of Tübingen 获生物信息学 Diplom，并在 UC Berkeley 从事博士后研究。",
    label: "Stefanie Jegelka — MIT official faculty biography",
  },
  "Suvrit Sra": {
    url: "https://engineering.mit.edu/people/suvrit-sra",
    value: "MIT School of Engineering 官方履历记录其 2007 年于 University of Texas at Austin 获计算机科学博士学位，之后在 Max Planck Institute for Intelligent Systems 任高级研究科学家。",
    label: "Suvrit Sra — MIT School of Engineering biography",
  },
  "Jara Joel Olavi Uitto": {
    url: "https://www.aalto.fi/en/news/many-practical-issues-are-related-to-questions-of-theory-this-steered-jara-uittos-interest-towards",
    value: "Aalto 官方访谈记录其于 ETH Zürich 完成博士论文并获 Doctor of Science，之后有一年工业界经历，并在德国从事两年博士后研究。",
    label: "Jara Uitto — Aalto official academic-career interview",
  },
  "Sándor Kisfaludi-Bak": {
    url: "https://research.aalto.fi/en/publications/eth-tight-algorithms-for-geometric-network-problems",
    value: "Aalto 官方研究门户收录其博士论文《ETH-Tight Algorithms for Geometric Network Problems》，记录为 Eindhoven University of Technology 于 2019 年授予的博士学位。",
    label: "Sándor Kisfaludi-Bak — Aalto official doctoral-thesis record",
  },
  "Achim Lilienthal": {
    url: "https://www.mirmi.tum.de/en/mirmi/news/article/vortrag-achim-lilienthal0/",
    value: "TUM MIRMI 官方讲座履历记录其于 University of Tübingen 获计算机科学博士学位，并于 University of Konstanz 获物理学硕士学位。",
    label: "Achim Lilienthal — TUM MIRMI official biography",
  },
  "Andrea Stocco": {
    url: "https://homes.cs.washington.edu/~rao/brain2brain/researchers.html",
    value: "University of Washington 官方研究项目履历记录其于 University of Trieste 获心理学博士学位，之后在 Carnegie Mellon University 从事博士后和研究工作。",
    label: "Andrea Stocco — University of Washington official research profile",
  },
  "Florian Zuleger": {
    url: "https://www.cs.cit.tum.de/en/prog/people/florian-zuleger/",
    value: "TUM 官方个人页记录其在 TUM 学习数学与计算机科学，之后于 TU Wien 获计算机科学博士学位；其学术训练还包括 Microsoft Research 实习与 IRIF Paris 访问研究。",
    label: "Florian Zuleger — TUM official group profile",
  },
};

const tumSlugOverrides = {
  "Alin Olimpiu Albu-Schäffer": "albu-schaeffer-alin",
  "Alois Christian Knoll": "knoll-alois-christian",
  "Francisco Javier Esparza Estaun": "esparza-estaun-francisco-javier",
  "Jana Giceva Makreshanska": "giceva-jana",
  "Michael Marc Wolf": "wolf-michael",
  "V. Spors": "spors-velvet",
  "Zeynep Akata-Schulz": "akata-zeynep",
};

function normalize(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/gi, " ").trim().toLowerCase();
}

function bestTumPage(name, entries) {
  if (tumSlugOverrides[name]) return `https://www.professoren.tum.de/en/${tumSlugOverrides[name]}`;
  const tokens = new Set(normalize(name).split(" ").filter((token) => token.length > 1));
  const scored = entries.map((entry) => {
    const candidate = new Set(normalize(entry.title).split(" ").filter((token) => token.length > 1));
    const overlap = [...tokens].filter((token) => candidate.has(token)).length;
    return { ...entry, score: overlap / Math.max(tokens.size, candidate.size) };
  }).sort((a, b) => b.score - a.score);
  return scored[0]?.score >= 0.5 ? new URL(scored[0].href, "https://www.professoren.tum.de").href : null;
}

let tumEntries = [];
try {
  const { html } = await fetchHtml("https://www.professoren.tum.de/en/professors/alphabetical");
  tumEntries = [...html.matchAll(/<a href="([^"]+)" title="([^"]+)"[^>]*><span>/gi)]
    .map((match) => ({ href: match[1], title: decode(match[2]) }));
} catch (error) {
  console.warn(`Could not load TUM professor index: ${error instanceof Error ? error.message : String(error)}`);
}

const queue = [...profilePackage.records];
const enriched = [];
const workers = Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const record = queue.shift();
    const next = { ...record };
    if (record.status !== "ready") {
      next.publicationStatus = "queued_portrait_evidence";
      next.publicationBlocker = record.blocker || "Official portrait evidence unavailable";
      enriched.push(next);
      continue;
    }
    try {
      const explicit = explicitEvidence[record.name];
      if (explicit) {
        next.education = verified(explicit.value, explicit.url, explicit.label);
      } else if (record.unitId === "aalto-cs") {
        const { html, finalUrl } = await fetchHtml(record.profileUrl);
        next.education = extractAalto(html, finalUrl, record.name);
      } else if (record.unitId === "tum-cit") {
        const url = bestTumPage(record.name, tumEntries);
        if (url) {
          const { html, finalUrl } = await fetchHtml(url);
          next.education = extractTum(html, finalUrl, record.name);
        }
      }
      if (!next.education) throw new Error("No specific degree, doctoral, postdoctoral, or academic-training statement found on an official page");
      next.publicationStatus = "ready";
      delete next.publicationBlocker;
    } catch (error) {
      next.publicationStatus = "queued_education_evidence";
      next.publicationBlocker = error instanceof Error ? error.message : String(error);
      delete next.education;
    }
    enriched.push(next);
  }
});

await Promise.all(workers);
enriched.sort((a, b) => a.unitId.localeCompare(b.unitId) || a.name.localeCompare(b.name));

const educationVerifiedCount = enriched.filter((row) => row.publicationStatus === "ready" && row.education?.status === "verified").length;
const educationBlocked = enriched
  .filter((row) => row.publicationStatus !== "ready")
  .map((row) => ({ atlasPersonId: row.atlasPersonId, unitId: row.unitId, name: row.name, status: row.publicationStatus, blocker: row.publicationBlocker }));

const output = {
  ...profilePackage,
  schemaVersion: 2,
  educationAuditAt: "2026-09-03",
  educationVerifiedCount,
  publicationReadyCount: educationVerifiedCount,
  publicationBlockedCount: educationBlocked.length,
  educationBlocked,
  records: enriched,
};

fs.writeFileSync(profilePath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ profileFile, educationVerifiedCount, publicationBlockedCount: educationBlocked.length, educationBlocked }, null, 2));
