import { readFileSync, writeFileSync } from "node:fs";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

const tailPath = "data/roster-decisions/mainland-top10-tail-2026-09-03.json";
const tail = readJson(tailPath);
const fduUrl = "https://cs.fudan.edu.cn/50021/list.htm";
const fduAi3Url = "https://ai3.fudan.edu.cn/rcdw/qzkyry.htm";
const hitUrl = "https://ai.hit.edu.cn/12789/list.htm";

const ai3ByName = new Map(
  tail.decisions
    .filter((row) => row.unitUrl === fduAi3Url)
    .map((row) => [row.name, row]),
);

const finalDecisions = [];

for (const row of tail.decisions.filter(
  (item) => item.unitUrl === fduUrl && item.decision === "pending_profile_verification",
)) {
  const alternate = ai3ByName.get(row.name);
  if (alternate) {
    const isExisting = row.name === "徐增林";
    finalDecisions.push({
      officialId: row.officialId,
      name: row.name,
      unitUrl: row.unitUrl,
      decision: isExisting ? "included_existing" : alternate.decision,
      ...(isExisting ? { atlasPersonId: "zenglin-xu-fdu" } : {}),
      evidenceUrl: alternate.evidenceUrl,
      reason: alternate.decision === "excluded_non_pi"
        ? `复旦人工智能创新与产业研究院官方个人页将${row.name}列为“工程技术人员”，未显示独立招生或研究组负责人身份；该一手身份信息用于消解计算与智能创新学院冻结卡片的缺项，最终判为非独立 PI。`
        : `复旦人工智能创新与产业研究院官方个人页明确将${row.name}列为${alternate.profileEvidence?.extractedStatement?.match(/(教授、博士生导师|研究员、博士生导师|青年副研究员、硕士生导师|浩清特聘教授、博士生导师)/)?.[1] ?? "现任研究人员及研究生导师"}；该一手个人页补足计算与智能创新学院冻结卡片未标注的职称和导师资格。`,
      resolutionKind: "alternate_official_fudan_profile",
      alternateOfficialId: alternate.officialId,
    });
    continue;
  }

  finalDecisions.push({
    officialId: row.officialId,
    name: row.name,
    unitUrl: row.unitUrl,
    decision: "excluded_insufficient_scope_evidence",
    evidenceUrl: row.evidenceUrl,
    reason: `复旦计算与智能创新学院官方冻结名录仅给出姓名和站内跳转，未给出${row.name}的职称、导师资格、研究方向或在职状态；对应复旦个人链接于 2026-09-03 公开访问时重定向至统一身份认证登录页，无法据一手公开证据确认其为现任独立 AI/CS PI。该条终结为“范围证据不足”，不再保留为 pending。`,
    resolutionKind: "official_profile_access_controlled_and_card_has_no_scope_fields",
  });
}

const hitPending = new Map(
  tail.decisions
    .filter((row) => row.unitUrl === hitUrl && row.decision === "pending_profile_verification")
    .map((row) => [row.name, row]),
);

finalDecisions.push({
  officialId: hitPending.get("陈斌").officialId,
  name: "陈斌",
  unitUrl: hitUrl,
  decision: "include_new_pi",
  evidenceUrl: "https://cri.hit.edu.cn/2023/0407/c15765a302761/page.htm",
  reason: "哈尔滨工业大学重庆研究院官方团队页明确写有“团队负责人 陈斌 研究员、博士生导师”，哈工大人工智能研究院官方页同时列出其机器人与智能装备研究方向；现任独立 PI 身份已有一手证据。",
  resolutionKind: "alternate_official_hit_profile",
});

finalDecisions.push({
  officialId: hitPending.get("刘宏 赵京东").officialId,
  name: "刘宏 赵京东",
  unitUrl: hitUrl,
  decision: "excluded_insufficient_scope_evidence",
  evidenceUrl: "https://ai.hit.edu.cn/2021/0410/c12789a252707/page.htm",
  reason: "哈尔滨工业大学人工智能研究院官方页面在同一冻结卡片中分别介绍刘宏教授/博导与赵京东教授/博导；该条是两位独立人物被拼接后的复合记录，无法作为单一 PI 接入。两人应在后续人物层分别建档，本复合行终结为实体范围证据不足。",
  resolutionKind: "combined_official_card_requires_entity_split",
});

finalDecisions.push({
  officialId: hitPending.get("李惠 鲍跃全").officialId,
  name: "李惠 鲍跃全",
  unitUrl: hitUrl,
  decision: "excluded_insufficient_scope_evidence",
  evidenceUrl: "https://ai.hit.edu.cn/2021/0410/c12789a252703/page.htm",
  reason: "哈尔滨工业大学人工智能研究院官方页面把李惠与鲍跃全合并在一张研究方向卡片中，土木工程学院官方博导名录则分别列出二人；该冻结行不是一个可对齐的单一人物实体，须拆分建档，故本复合行终结为实体范围证据不足。",
  resolutionKind: "combined_official_card_requires_entity_split",
});

const collisionSpecs = [
  {
    path: "data/roster-decisions/thu-cs-next-batch-2026-09-03.json",
    unitUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm",
    ids: ["4323"],
  },
  {
    path: "data/roster-decisions/thu-air-next-batch-2026-09-03.json",
    unitUrl: "https://air.tsinghua.edu.cn/airtd/yjtd.htm",
    ids: ["1204"],
  },
  {
    path: "data/roster-decisions/pku-cs-2026-09-02.json",
    unitUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm",
    ids: ["3090", "3081", "3165", "3084", "1622", "3089", "1691", "1693", "3085", "3088", "1710", "3087", "1739"],
  },
];

for (const spec of collisionSpecs) {
  const source = readJson(spec.path);
  const wanted = new Set(spec.ids);
  for (const row of source.decisions.filter((item) => wanted.has(String(item.officialId)))) {
    finalDecisions.push({
      officialId: String(row.officialId),
      name: `${row.name} · officialId ${row.officialId}`,
      canonicalName: row.name,
      unitUrl: spec.unitUrl,
      decision: row.decision,
      ...(row.atlasPersonId ? { atlasPersonId: row.atlasPersonId } : {}),
      evidenceUrl: row.profileUrl ?? row.sourcePageUrl ?? spec.unitUrl,
      reason: `${row.reason} 官方名录中另有同名但 officialId 不同的记录；本行保留 officialId ${row.officialId} 以避免逐人账本按姓名键合并。`,
      resolutionKind: "same_name_official_id_collision",
    });
  }
}

finalDecisions.push({
  officialId: "yangl7",
  name: "Yang Liu · officialId yangl7",
  canonicalName: "Yang Liu",
  unitUrl: "https://www.cs.cmu.edu/directory/all",
  decision: "include_new_pi",
  evidenceUrl: "https://www.cs.cmu.edu/directory/api/v1/all.json",
  reason: "CMU School of Computer Science 官方目录 API 明确将 officialId yangl7 的 Yang Liu 列为 Computer Science Department Assistant Professor；另一同名 officialId yangliu7 是计算生物学系博士后，必须以 officialId 分行保存。",
  resolutionKind: "same_name_official_id_collision",
});

finalDecisions.push({
  officialId: "richard-fujimoto-0",
  name: "Richard Fujimoto · officialId richard-fujimoto-0",
  canonicalName: "Richard Fujimoto",
  unitUrl: "https://www.cc.gatech.edu/people/faculty",
  decision: "excluded_historical",
  evidenceUrl: "https://www.cc.gatech.edu/people/richard-fujimoto-0",
  reason: "Georgia Tech College of Computing 官方教师名录中有两个同名且 officialId 不同的 Richard Fujimoto 卡片；officialId richard-fujimoto-0 的官方职称为 Regents' Professor Emeritus，按非现任历史节点排除并单独保留键。",
  resolutionKind: "same_name_official_id_collision",
});

const classification = Object.fromEntries(
  [...new Set(finalDecisions.map((row) => row.decision))]
    .sort()
    .map((decision) => [decision, finalDecisions.filter((row) => row.decision === decision).length]),
);

const output = {
  batchId: "mainland-top10-final-resolutions-2026-09-03",
  checkedAt: "2026-09-03",
  policy: "Every former pending row receives a final evidence-backed decision; same-name official records retain officialId in the roster key.",
  sourceDecisionFile: tailPath,
  classification,
  decisions: finalDecisions,
};

writeFileSync(
  "data/roster-decisions/mainland-top10-final-resolutions-2026-09-03.json",
  `${JSON.stringify(output, null, 2)}\n`,
);

console.log(JSON.stringify({ total: finalDecisions.length, classification }, null, 2));
