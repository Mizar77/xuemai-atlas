import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const snapshotAt = "2026-09-02";
const unitId = "ucl-cs";
const rosterPath = path.join(root, "data/official-rosters/ucl-computer-science-all-profiles-2026-09-02.json");
const priorPath = path.join(root, "data/roster-decisions/ucl-cs-2026-09-02.json");
const evidencePath = path.join(root, "data/roster-decisions/ucl-profile-evidence-2026-09-02.json");
const summaryPath = path.join(root, "data/roster-decisions/europe-c-summary-2026-09-02.json");
const cacheDir = "/private/tmp/ucl-profile-api";

const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));

function appointmentIsCurrent(appointment) {
  if (!appointment?.endDate) return true;
  const end = appointment.endDate.dateTime || [
    appointment.endDate.year,
    String(appointment.endDate.month || 12).padStart(2, "0"),
    String(appointment.endDate.day || 31).padStart(2, "0"),
  ].join("-");
  return String(end).slice(0, 10) >= snapshotAt;
}

function uclAppointment(appointment) {
  const institution = appointment?.institution || {};
  return /University College London|\bUCL\b/i.test(
    [institution.organisation, institution.singleLineFormat, institution.subOrganisation].filter(Boolean).join(" "),
  );
}

function compactProfile(profile) {
  const positions = (profile.positions || []).map((row) => ({
    position: row.position || null,
    department: row.department || null,
    fromInstitutionalAppointment: Boolean(row.fromInstitutionalAppointment),
  }));
  const currentInstitutionalAppointments = (profile.institutionalAppointments || [])
    .filter((row) => appointmentIsCurrent(row) && uclAppointment(row))
    .map((row) => ({ position: row.position || null, institution: row.institution?.singleLineFormat || null, startDate: row.startDate || null, endDate: row.endDate || null }));
  const currentAcademicAppointments = (profile.academicAppointments || [])
    .filter((row) => appointmentIsCurrent(row) && uclAppointment(row))
    .map((row) => ({ position: row.position || null, institution: row.institution?.singleLineFormat || null, startDate: row.startDate || null, endDate: row.endDate || null }));
  return {
    discoveryId: String(profile.discoveryId),
    discoveryUrlId: profile.discoveryUrlId || null,
    firstNameLastName: profile.firstNameLastName || null,
    title: profile.title || null,
    positions,
    currentInstitutionalAppointments,
    currentAcademicAppointments,
    degrees: (profile.degrees || []).map((row) => ({ name: row.name || null, fieldOfStudy: row.fieldOfStudy || null, institution: row.institution?.singleLineFormat || null, endDate: row.endDate || null })),
    postgraduateTraining: profile.postgraduateTraining || [],
    about: profile.tabSummaryAbout?.htmlStripped?.replace(/&nbsp;/g, " ").trim().slice(0, 6000) || null,
    research: profile.tabSummaryGrants?.htmlStripped?.replace(/&nbsp;/g, " ").trim().slice(0, 4000) || null,
    tags: [...new Set([...(profile.tags?.explicit || []).map((row) => row.value), ...(profile.tags?.implicit || [])].filter(Boolean))],
    personalWebsites: profile.personalWebsites || [],
    hasThumbnail: Boolean(profile.hasThumbnail),
    thumbnailApiUrl: profile.hasThumbnail ? `https://profiles.ucl.ac.uk/api/users/${profile.discoveryId}/thumbnail` : null,
    profileApiUrl: `https://profiles.ucl.ac.uk/api/users/${profile.discoveryId}`,
    updatedWhen: profile.updatedWhen || null,
  };
}

async function fetchProfiles() {
  fs.mkdirSync(cacheDir, { recursive: true });
  let index = 0;
  const workers = Array.from({ length: 16 }, async () => {
    while (index < roster.people.length) {
      const person = roster.people[index++];
      const file = path.join(cacheDir, `${person.officialId}.json`);
      if (fs.existsSync(file) && fs.statSync(file).size > 100) continue;
      const response = await fetch(`https://profiles.ucl.ac.uk/api/users/${person.officialId}`);
      if (!response.ok) throw new Error(`${person.officialId}: HTTP ${response.status}`);
      fs.writeFileSync(file, `${JSON.stringify(await response.json())}\n`);
    }
  });
  await Promise.all(workers);
}

function captureEvidence() {
  const profiles = {};
  for (const person of roster.people) {
    const file = path.join(cacheDir, `${person.officialId}.json`);
    if (!fs.existsSync(file) || fs.statSync(file).size < 100) throw new Error(`Missing UCL API profile ${person.officialId}`);
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    profiles[String(person.officialId)] = compactProfile(raw);
  }
  const artifact = {
    schemaVersion: 1,
    snapshotAt,
    officialRosterUrl: roster.officialPageUrl,
    officialApiPattern: "https://profiles.ucl.ac.uk/api/users/{discoveryId}",
    profileCount: Object.keys(profiles).length,
    fieldsRetained: ["title", "positions", "current UCL appointments", "degrees", "about", "research", "tags", "official thumbnail endpoint"],
    profiles,
  };
  fs.writeFileSync(evidencePath, `${JSON.stringify(artifact, null, 2)}\n`);
}

function currentRoleText(profile) {
  return [...new Set([
    ...(profile.positions || []).map((row) => row.position),
    ...(profile.currentInstitutionalAppointments || []).map((row) => row.position),
    ...(profile.currentAcademicAppointments || []).map((row) => row.position),
  ].filter(Boolean))].join(" | ");
}

const historicalPattern = /\b(?:Emeritus|Retired)\b/i;
const honoraryPattern = /\bHonorary\b/i;
const independentPattern = /\b(?:Professor|Associate Professor|Assistant Professor|Senior Lecturer|Lecturer|Reader|Chair)\b/i;
const teachingTrackPattern = /\bTeaching\b/i;
const nonPiPattern = /\b(?:PGTA|Post\s*Graduate Teaching Assistant|Postgraduate Teaching Assistant|Student|PhD Student|Doctoral Student|Research Fellow|Research Assistant|Research Associate|Researcher|Teaching Fellow|Associate Lecturer|Tutor|Technician|Manager|Administrator|Strategic Alliances Director|Strategic Partnerships Manager|Head of Operations|Communications|Professorial Research Associate)\b/i;

function classify(person, profile, prior) {
  const role = currentRoleText(profile);
  const base = {
    officialId: String(person.officialId),
    name: person.name,
    profileUrl: person.profileUrl,
    portraitUrl: profile.thumbnailApiUrl,
    title: role || null,
    section: person.section || "Dept of Computer Science A-Z",
    sourcePageUrl: person.profileUrl,
    evidence: [role, profile.tags.slice(0, 12).join(", "), profile.research?.slice(0, 500)].filter(Boolean).join("；").slice(0, 1200),
  };

  if (historicalPattern.test(role)) {
    return { ...base, decision: "excluded_historical", reason: "UCL Profiles 官方 current-role 字段明确标为 Emeritus/Retired。" };
  }
  if (honoraryPattern.test(role)) {
    return { ...base, decision: "excluded_non_pi", reason: "UCL Profiles 官方 current-role 字段为 Honorary；未作为 UCL Computer Science 核心独立 PI 纳入。" };
  }
  if (independentPattern.test(role) && !teachingTrackPattern.test(role)) {
    if (prior?.decision === "included_existing" && prior.atlasPersonId) {
      return { ...base, decision: "included_existing", atlasPersonId: prior.atlasPersonId, reason: "UCL Profiles 官方 current-role 字段确认现任独立 faculty；人物已在图谱中。" };
    }
    return { ...base, decision: "include_new_pi", reason: "UCL Profiles 官方 current-role 字段确认其为现任 Professor/Associate Professor/Assistant Professor/Lecturer/Reader/Chair；所属单位为 Dept of Computer Science。" };
  }
  if (teachingTrackPattern.test(role)) {
    return { ...base, decision: "excluded_non_pi", reason: "UCL Profiles 官方 current-role 字段明确为 Teaching track；当前证据未确认独立研究 PI/招生席位。" };
  }
  if (nonPiPattern.test(role)) {
    return { ...base, decision: "excluded_non_pi", reason: "UCL Profiles 官方 current-role 字段为学生、研究辅助、教学辅助、行政或非独立研究职位。" };
  }
  return {
    ...base,
    decision: "pending_profile_verification",
    reason: "UCL 官方 API 未提供可判定的当前职称/任职字段；不能仅凭姓名、称谓或处于院系 A–Z 索引而默认纳入。",
    evidence: person.profileUrl,
  };
}

if (process.argv.includes("--fetch")) await fetchProfiles();
if (process.argv.includes("--capture-evidence") || !fs.existsSync(evidencePath)) captureEvidence();

const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
if (evidence.profileCount !== roster.people.length) throw new Error("UCL evidence count does not match frozen roster");
const prior = JSON.parse(fs.readFileSync(priorPath, "utf8"));
const priorById = new Map(prior.decisions.map((row) => [String(row.officialId), row]));
const decisions = roster.people.map((person) => classify(person, evidence.profiles[String(person.officialId)], priorById.get(String(person.officialId))));
const officialIds = roster.people.map((person) => String(person.officialId));
const decisionIds = decisions.map((row) => String(row.officialId));
if (decisions.length !== roster.people.length) throw new Error("UCL decisionCount != rosterCount");
if (new Set(decisionIds).size !== decisions.length) throw new Error("UCL duplicate officialId in decisions");
for (const officialId of officialIds) if (!decisionIds.includes(officialId)) throw new Error(`UCL missing decision ${officialId}`);

const decisionKinds = ["included_existing", "include_new_pi", "excluded_non_ai_cs", "excluded_non_pi", "excluded_historical", "excluded_industry_only", "excluded_duplicate", "pending_profile_verification"];
const counts = Object.fromEntries(decisionKinds.map((kind) => [kind, decisions.filter((row) => row.decision === kind).length]));
const output = {
  schemaVersion: 2,
  unitId,
  snapshotAt,
  rosterArtifact: "data/official-rosters/ucl-computer-science-all-profiles-2026-09-02.json",
  evidenceArtifact: "data/roster-decisions/ucl-profile-evidence-2026-09-02.json",
  rosterCount: decisions.length,
  decisionCount: decisions.length,
  counts,
  decisions,
};
fs.writeFileSync(priorPath, `${JSON.stringify(output, null, 2)}\n`);

const summary = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
summary.units[unitId] = { rosterArtifact: output.rosterArtifact, rosterCount: output.rosterCount, decisionCount: output.decisionCount, counts };
const unitFiles = Object.keys(summary.units).map((id) => JSON.parse(fs.readFileSync(path.join(root, `data/roster-decisions/${id}-2026-09-02.json`), "utf8")));
summary.counts = Object.fromEntries(decisionKinds.map((kind) => [kind, unitFiles.reduce((sum, file) => sum + (file.counts[kind] || 0), 0)]));
summary.rosterCount = unitFiles.reduce((sum, file) => sum + file.rosterCount, 0);
summary.decisionCount = unitFiles.reduce((sum, file) => sum + file.decisionCount, 0);
fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ unitId, counts, rosterCount: decisions.length, europeSummaryCounts: summary.counts }, null, 2));
