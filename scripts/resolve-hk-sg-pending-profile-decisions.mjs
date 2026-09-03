import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const decisionPath = path.join(root, "data/roster-decisions/hk-sg-remaining-892-2026-09-03.json");
const evidencePath = path.join(root, "data/roster-decisions/hk-sg-pending-profile-evidence-2026-09-03.json");
const batch = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const evidenceById = new Map(evidence.results.map((row) => [row.officialId, row]));

const strongAiTerms = [
  "artificial intelligence", "embodied ai", "ai4x", "machine learning", "deep learning",
  "natural language processing", "language model", "computer vision", "medical image analysis",
  "image processing", "pattern recognition", "automatic speech recognition", "spoken language",
  "speech signal processing", "speech synthesis", "information retrieval", "robotics", "robotic autonomy",
  "robot perception", "computer audition", "multi-modality", "multimodal", "neuromorphic computing",
  "learning analytics", "educational robotics", "generative ai", "data mining", "big data analytics",
  "bayesian machine learning", "statistical learning", "iot/ai security", "computers in education",
  "technology-enhanced learning", "technology enhanced learning", "data-driven and artificial intelligence",
];

function compact(value, max = 460) {
  return String(value ?? "").replace(/\s+/gu, " ").trim().slice(0, max);
}

function labelledText(record) {
  return (record?.labelledSnippets ?? []).join(" ");
}

function identityText(record) {
  const snippets = record?.labelledSnippets ?? [];
  return compact(
    snippets.find((text) => /View Scopus Profile/i.test(text))
      ?? [...snippets].reverse().find((text) => /\bPeople\b/i.test(text))
      ?? snippets[0]
      ?? "",
    900,
  );
}

function researchText(record) {
  const text = labelledText(record);
  const patterns = [
    /Research Interests?\s*:\s*([\s\S]{1,900}?)(?:Read More|Resume of Career|Copyright)/i,
    /Research Interests?\s+([\s\S]{1,900}?)(?:Teaching Interests|Selected Outputs|Research Projects|Journal Publications)/i,
    /research interests include\s+([\s\S]{1,600}?)(?:\.|Research Interests|Selected Outputs)/i,
    /RESEARCH AREAS\s+([\s\S]{1,500}?)(?:Biography|Research Interests|Publications)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return compact(match[1], 700);
  }
  return "";
}

function matchedTopics(text) {
  const lower = text.toLowerCase();
  return strongAiTerms.filter((term) => lower.includes(term));
}

function insufficient(row, profile, missing) {
  return {
    decision: "excluded_insufficient_scope_evidence",
    reason: `已核对官方个人页 ${profile?.url || row.profileUrl || row.evidenceUrl}；${missing}，因此无法可靠确认其同时属于 AI/CS 主线且具独立 PI 身份。本轮不纳入，避免凭姓名或论文推断。`,
    sourceSupports: missing,
  };
}

function resolve(row, profile) {
  if (!profile || profile.status !== "fetched" || /403 Forbidden|Just a moment|Attention Required|Discovery/i.test(profile.pageTitle ?? "")) {
    return insufficient(row, profile, `官方页面当前返回 ${profile?.pageTitle || profile?.status || "不可读取/内容为空"}，未取得可核验的职称与研究方向正文`);
  }

  const identity = identityText(profile);
  const interests = researchText(profile);
  const topics = matchedTopics(interests || identity);

  if (row.unitId === "cuhk-cse") {
    if (/Tien Chi Chen/i.test(row.rosterName)) {
      return {
        decision: "excluded_historical",
        reason: "CUHK CSE 官方个人页明确标为 Emeritus Professor，并说明其已于 1992 年退休；属于历史节点而非现任 PI。",
        sourceSupports: "Emeritus Professor；retired in 1992",
      };
    }
    if (/Sean Xiaoou Tang/i.test(row.rosterName)) {
      return {
        decision: "excluded_non_pi",
        reason: "CUHK CSE 官方个人页将该院系身份明确写为 Professor (by courtesy)，不作为该名录单位的现任独立 PI 重复纳入。",
        sourceSupports: "Professor (by courtesy)",
      };
    }
  }

  if (row.unitId === "cuhk-ee") {
    if (!interests) return insufficient(row, profile, "页面未提取到该人物专属的 Research Interests 字段");
    if (topics.length) {
      return {
        decision: "include_new_pi",
        reason: `CUHK EE 官方名录列为教授序列，个人页 Research Interests 明确包含 ${topics.slice(0, 5).join("、")}，符合 AI/NLP/CV/机器人范围。`,
        sourceSupports: `Professor section；research topics: ${topics.join(", ")}`,
      };
    }
    return {
      decision: "excluded_non_ai_cs",
      reason: `CUHK EE 官方个人页已给出研究方向，但仅显示 ${compact(interests, 220)}，未进入本图谱 AI/NLP/CV/机器学习/机器人主线。`,
      sourceSupports: `Research Interests: ${compact(interests, 300)}`,
    };
  }

  if (row.unitId === "eduhk-mit") {
    const currentIdentity = identity;
    if (/Senior Lecturer|\bLecturer\b|Research Assistant Professor/i.test(currentIdentity)) {
      return {
        decision: "excluded_non_pi",
        reason: `EdUHK 官方个人页显示当前身份为 ${compact(currentIdentity.match(/(Research Assistant Professor|Senior Lecturer(?:\s+[IVX]+)?|Lecturer(?:\s+[IVX]+)?)/i)?.[0] || "非独立教学/研究序列", 100)}，不满足独立 PI 门槛。`,
        sourceSupports: compact(currentIdentity, 260),
      };
    }
    if (!/(Chair Professor|Research Chair Professor|Associate Professor|Assistant Professor|\bProfessor\b)/i.test(currentIdentity)) {
      return insufficient(row, profile, "个人页正文未确认现任教授序列或独立 PI 职称");
    }
    if (!interests && !topics.length) return insufficient(row, profile, "个人页虽确认教授序列，但未取得可归类的个人研究方向字段");
    if (topics.length) {
      return {
        decision: "include_new_pi",
        reason: `EdUHK 官方个人页确认现任教授序列，个人研究简介/Research Interests 明确涉及 ${topics.slice(0, 5).join("、")}。`,
        sourceSupports: `${compact(currentIdentity, 180)}；research topics: ${topics.join(", ")}`,
      };
    }
    return {
      decision: "excluded_non_ai_cs",
      reason: `EdUHK 官方个人页确认教授序列，但个人 Research Interests 仅显示 ${compact(interests, 220)}，未进入本图谱 AI/CS 主线。`,
      sourceSupports: `Research Interests: ${compact(interests, 300)}`,
    };
  }

  if (row.unitId === "lingnan-sds" || row.unitId === "lingnan-ai") {
    if (/PhD Student|MPhil Student|Research Assistant Professor|Assistant Professor of Teaching|Part-time Assistant|Research Officer|Teaching Officer/i.test(identity)) {
      const role = identity.match(/(PhD Student|MPhil Student|Research Assistant Professor|Assistant Professor of Teaching|Part-time Assistant (?:Teaching|Research) Officer|Research Officer|Teaching Officer)/i)?.[0];
      return {
        decision: "excluded_non_pi",
        reason: `Lingnan Scholars 官方个人页明确当前身份为 ${role || "学生/研究助理/教学序列"}，不属于现任独立 PI。`,
        sourceSupports: compact(identity, 280),
      };
    }
    if (/(Chair Professor|Associate Professor|Assistant Professor|\bProfessor\b)/i.test(identity)) {
      const expectedUnit = row.unitId === "lingnan-ai" ? /Division of Artificial Intelligence/i : /(School of Data Science|Division of Industrial Data Science)/i;
      if (!expectedUnit.test(identity)) return insufficient(row, profile, "个人页确认教授职称，但当前主职未显示属于该 AI/Data Science 单位，名录关系可能为附属关联");
      return {
        decision: "include_new_pi",
        reason: `Lingnan Scholars 官方个人页确认现任教授序列，并明确隶属${row.unitId === "lingnan-ai" ? "人工智能部" : "数据科学学院/工业数据科学部"}。`,
        sourceSupports: compact(identity, 300),
      };
    }
    return insufficient(row, profile, "个人页未显示教授序列或独立研究组负责人身份");
  }

  if (row.unitId === "sutd-aai") {
    if (/Professor/i.test(identity) && topics.length) {
      return {
        decision: "include_new_pi",
        reason: `SUTD 官方个人页确认 Professor 身份，研究方向明确包含 ${topics.slice(0, 5).join("、")}。`,
        sourceSupports: `Professor；research topics: ${topics.join(", ")}`,
      };
    }
    return insufficient(row, profile, "个人页未同时确认教授序列与 AI 研究方向");
  }

  if (row.unitId === "duke-nus-daisi") {
    if (/Andrea Low/i.test(row.rosterName)) {
      return {
        decision: "excluded_non_ai_cs",
        reason: "SGH 官方个人页确认其为风湿免疫科临床医生及 Duke-NUS Assistant Professor，但未列 AI、数据科学或计算研究方向，不纳入技术 AI/CS 主线。",
        sourceSupports: "Senior Consultant, Rheumatology and Immunology；Assistant Professor, Duke-NUS",
      };
    }
    return insufficient(row, profile, "官方个人页未提供足以确认 AI/CS 研究主线的正文");
  }

  return insufficient(row, profile, "官方个人页未提供可同时确认研究范围与独立 PI 身份的结构化信息");
}

let resolvedCount = 0;
const resolutionCounts = {};
for (const row of batch.decisions) {
  if (row.decision !== "pending_profile_verification") continue;
  const profile = evidenceById.get(row.officialId);
  const resolved = resolve(row, profile);
  row.priorDecision = row.decision;
  row.decision = resolved.decision;
  row.reason = resolved.reason;
  row.evidenceUrl = profile?.url || row.evidenceUrl;
  row.profileEvidence = {
    fetchStatus: profile?.status ?? "missing",
    pageTitle: profile?.pageTitle ?? null,
    sourceSupports: resolved.sourceSupports,
  };
  resolvedCount += 1;
  resolutionCounts[row.decision] = (resolutionCounts[row.decision] ?? 0) + 1;
}

if (resolvedCount !== 247) throw new Error(`Expected 247 pending resolutions, got ${resolvedCount}`);
if (batch.decisions.some((row) => row.decision === "pending_profile_verification")) throw new Error("Pending decisions remain");

const decisionCategories = [...new Set(batch.decisions.map((row) => row.decision))].sort();
batch.counts = Object.fromEntries(decisionCategories.map((decision) => [decision, batch.decisions.filter((row) => row.decision === decision).length]));
batch.pendingProfileResolution = {
  resolvedAt: "2026-09-03",
  sourceEvidenceArtifact: path.relative(root, evidencePath),
  inputPendingCount: 247,
  resolutionCounts,
  remainingPending: 0,
};
for (const unit of batch.units) {
  const rows = batch.decisions.filter((row) => row.unitId === unit.unitId);
  unit.counts = Object.fromEntries([...new Set(rows.map((row) => row.decision))].sort().map((decision) => [decision, rows.filter((row) => row.decision === decision).length]));
}

fs.writeFileSync(decisionPath, `${JSON.stringify(batch, null, 2)}\n`);
console.log(JSON.stringify({ resolvedCount, resolutionCounts, finalCounts: batch.counts, remainingPending: 0 }, null, 2));
