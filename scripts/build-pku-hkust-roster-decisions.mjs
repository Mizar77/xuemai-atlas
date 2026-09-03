import fs from "node:fs";

const reviewedAt = "2026-09-02";

const units = [
  {
    unitId: "pku-cs",
    institution: "Peking University",
    unitName: "School of Computer Science",
    sourcePageUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm",
    rosterPath: "data/official-rosters/pku-cs-all-faculty-2026-09-02.json",
    decisionPath: "data/roster-decisions/pku-cs-2026-09-02.json",
  },
  {
    unitId: "hkust-cse",
    institution: "Hong Kong University of Science and Technology",
    unitName: "Department of Computer Science and Engineering",
    sourcePageUrl: "https://cse.hkust.edu.hk/admin/people/faculty",
    rosterPath: "data/official-rosters/hkust-cse-all-faculty-2026-09-02.json",
    decisionPath: "data/roster-decisions/hkust-cse-2026-09-02.json",
  },
];

const pkuExisting = {
  "1609": "baobao-chang",
  "1695": "ma-siwei-pku",
  "3937": "liangming-pan",
  "1674": "boxin-shi-pku",
  "1672": "zhifang-sui",
  "1696": "tian-yonghong-pku",
  "1704": "yizhou-wang-pku",
  "1731": "zhang-shiliang-pku",
  "1673": "xu-sun-pku",
  "1707": "he-wang-pku-award",
  "1701": "houfeng-wang",
};

const hkustExisting = {
  "5004f1ccf700ad94": "song-guo-hkust",
  "976cc76e383d5c00": "jiaya-jia-hkust",
  "6f3748e47c1351ed": "qifeng-chen-hkust",
  "2a9b6b8bee98b99b": "yangqiu-song",
  "864e2ecfde2820d3": "dan-xu-hkust",
  "cded9a5ea5675fd1": "hao-chen-hkust",
  "fb6238ebbfc38f60": "yi-fung",
  "eb432e7a279b1ce4": "junxian-he",
  "9da7cabefc40c8f2": "yinghao-xu-hkust",
  "7deca8993d08f4b6": "anyi-rao-hkust",
  "dc80854ded7bbff2": "de-kai",
};

const pkuAiPattern = /人工智能|机器学习|深度学习|大语言模型|自然语言|计算语言|计算机视觉|视觉理解|图像|视频|多媒体|图形|虚拟现实|增强现实|模式识别|数据挖掘|知识图谱|知识工程|数据库|大数据|数据科学|智能机器人|情感与认知|人机交互|强化学习|多模态|类脑计算|推荐系统|信息检索|程序生成|高可靠人工智能|智能软件|智能计算|智能开发|无线科学智能|AI\+DB|AI系统|量子机器学习/;
const hkustAiPattern = /Artificial Intelligence|Vision and Graphics|Human-Computer Interaction|Data, Knowledge and Information Management/;

function pkuDecision(person) {
  const research = person.researchArea ?? "";
  const atlasPersonId = pkuExisting[person.officialId];
  if (person.title === "光荣退休") {
    return {
      decision: "excluded_historical",
      reason: "北京大学官方名录将该人物列在光荣退休类别，不作为现任 PI 收录。",
    };
  }
  if (/工程师|讲师/.test(person.title ?? "")) {
    return {
      decision: "excluded_non_pi",
      reason: "官方职称为工程师或讲师，当前页面未确认独立 PI / 招生导师身份。",
    };
  }
  if (/助理研究员/.test(person.title ?? "")) {
    return {
      decision: "pending_profile_verification",
      reason: "官方职称为助理研究员，需要个人主页进一步确认独立招生与 PI 身份。",
    };
  }
  if (pkuAiPattern.test(research)) {
    return atlasPersonId
      ? {
          decision: "included_existing",
          atlasPersonId,
          reason: "北大官方名录确认其为现任 AI/NLP/CV/ML/数据智能相关教师，图谱已有同一人物节点。",
        }
      : {
          decision: "include_new_pi",
          reason: "北大官方名录显示现任教授、副教授、助理教授、研究员或副研究员身份，研究方向属于 AI/NLP/CV/ML/数据智能主线。",
        };
  }
  return {
    decision: "excluded_non_ai_cs",
    reason: research
      ? "官方研究方向以系统、网络、软件、理论、安全或其他非 AI 主线为主。"
      : "当前官方名录未给出符合本图谱 AI/NLP/CV/ML/数据智能范围的研究方向。",
  };
}

function hkustDecision(person) {
  const research = person.researchArea ?? "";
  const atlasPersonId = hkustExisting[person.officialId];
  if (person.officialSection === "Emeritus" || /Emeritus/.test(person.title ?? "")) {
    return {
      decision: "excluded_historical",
      reason: "HKUST CSE official roster lists this person under Emeritus; not counted as a current PI in this unit.",
    };
  }
  if (["Teaching Track", "Adjunct", "Visiting"].includes(person.officialSection)) {
    return {
      decision: "excluded_non_pi",
      reason: `Official section is ${person.officialSection}; the roster does not establish a current independent research PI appointment.`,
    };
  }
  if (person.officialSection === "Joint Appointments") {
    if (atlasPersonId && hkustAiPattern.test(research)) {
      return {
        decision: "included_existing",
        atlasPersonId,
        reason: "Current HKUST joint appointment in an AI/CV/HCI area; the atlas already contains the same independent PI node.",
      };
    }
    return {
      decision: "pending_profile_verification",
      reason: "The CSE roster confirms a joint appointment but omits the primary faculty title; the home department profile must confirm independent PI status before inclusion.",
    };
  }
  if (hkustAiPattern.test(research)) {
    return atlasPersonId
      ? {
          decision: "included_existing",
          atlasPersonId,
          reason: "HKUST CSE official roster confirms a current AI/CV/HCI/data faculty appointment; the atlas already contains the same person.",
        }
      : {
          decision: "include_new_pi",
          reason: "HKUST CSE official roster confirms a current Regular or Research Track faculty appointment in AI, vision, HCI or data intelligence.",
        };
  }
  return {
    decision: "excluded_non_ai_cs",
    reason: "Official research area is systems, networking, software engineering, theory or cybersecurity rather than the current AI/NLP/CV/ML/data-intelligence scope.",
  };
}

const summaries = [];
for (const unit of units) {
  const roster = JSON.parse(fs.readFileSync(unit.rosterPath, "utf8"));
  const decisions = roster.people.map((person) => {
    const classified = unit.unitId === "pku-cs" ? pkuDecision(person) : hkustDecision(person);
    return {
      officialId: person.officialId,
      name: person.name,
      profileUrl: person.profileUrl,
      portraitUrl: person.portraitUrl ?? person.photoUrl,
      title: person.title ?? null,
      section: person.officialSection ?? person.officialSections?.join("; ") ?? null,
      officialInstitute: person.officialInstitute ?? null,
      researchArea: person.researchArea ?? null,
      sourcePageUrl: unit.sourcePageUrl,
      ...classified,
    };
  });
  const officialIds = new Set(decisions.map((decision) => decision.officialId));
  if (officialIds.size !== roster.officialRosterCount || decisions.length !== roster.officialRosterCount) {
    throw new Error(`${unit.unitId}: decision coverage does not match frozen official roster`);
  }
  const decisionCounts = Object.fromEntries(
    [...new Set(decisions.map((decision) => decision.decision))]
      .sort()
      .map((key) => [key, decisions.filter((decision) => decision.decision === key).length]),
  );
  fs.writeFileSync(unit.decisionPath, `${JSON.stringify({
    unitId: unit.unitId,
    institution: unit.institution,
    unitName: unit.unitName,
    sourcePageUrl: unit.sourcePageUrl,
    snapshotAt: reviewedAt,
    officialRosterCount: roster.officialRosterCount,
    checkedCount: decisions.length,
    decisionCounts,
    decisions,
  }, null, 2)}\n`);
  summaries.push({
    unitId: unit.unitId,
    sourcePageUrl: unit.sourcePageUrl,
    officialPeople: roster.officialRosterCount,
    checkedPeople: decisions.length,
    decisionCounts,
  });
}

fs.writeFileSync("data/roster-decisions/pku-hkust-summary-2026-09-02.json", `${JSON.stringify({
  reviewedAt,
  units: summaries.length,
  officialPeople: summaries.reduce((sum, unit) => sum + unit.officialPeople, 0),
  checkedPeople: summaries.reduce((sum, unit) => sum + unit.checkedPeople, 0),
  unitSummaries: summaries,
  note: "Every frozen officialId in PKU CS and HKUST CSE has exactly one deterministic person-level decision. Joint appointments without a primary title remain pending rather than being inferred as independent CSE PIs.",
}, null, 2)}\n`);

console.log(JSON.stringify(summaries, null, 2));
