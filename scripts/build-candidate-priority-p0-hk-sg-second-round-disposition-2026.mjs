import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const master = JSON.parse(fs.readFileSync(path.join(root, "data/candidate-priority-p0-master-disposition-2026-09-03.json"), "utf8"));
const publicationAuditPath = path.join(root, "data/candidate-priority-p0-hk-sg-publication-relations-2026-09-03.json");
const publicationAudit = fs.existsSync(publicationAuditPath) ? JSON.parse(fs.readFileSync(publicationAuditPath, "utf8")) : { records: [] };
const publicationByKey = new Map(publicationAudit.records.map((row) => [row.canonicalKey, row]));

const pending = master.records.filter((row) =>
  ["Hong Kong", "Singapore"].includes(row.region)
  && ["missing_portrait", "missing_relationship"].includes(row.disposition),
);

const strictReady = new Map([
  ["Hong Kong:香港中文大学:evangelinefyyoung", "evangeline-young-cuhk-p0-r2"],
  ["Hong Kong:香港中文大学:laurenpick", "lauren-pick-cuhk-p0-r2"],
  ["Hong Kong:香港中文大学:mingchangyang", "ming-chang-yang-cuhk-p0-r2"],
  ["Hong Kong:香港中文大学:tsungyiho", "tsung-yi-ho-cuhk-p0-r2"],
  ["Hong Kong:香港中文大学:zhidingliang", "zhiding-liang-cuhk-p0-r2"],
  ["Hong Kong:香港城市大学:lishuaicheng李帥成", "shuaicheng-li-cityu-p0-r2"],
  ["Hong Kong:香港理工大学:caojiannong", "jiannong-cao-polyu-p0-r2"],
  ["Singapore:Singapore University of Technology and Design:chongernest", "ernest-chong-sutd-p0-r2"],
  ["Singapore:Singapore University of Technology and Design:lecongthanh", "thanh-le-cong-sutd-p0-r2"],
  ["Singapore:Singapore University of Technology and Design:sohdewen", "de-wen-soh-sutd-p0-r2"],
  ["Singapore:Singapore University of Technology and Design:zhaoruochenesther", "esther-zhao-sutd-p0-r2"],
]);

const readyPortraits = new Map([
  ["Hong Kong:香港中文大学:evangelinefyyoung", "portraits/candidate-p0-hk-sg-second-round-ready-2026/evangeline-young.png"],
  ["Hong Kong:香港中文大学:laurenpick", "portraits/candidate-p0-hk-sg-second-round-ready-2026/lauren-pick.png"],
  ["Hong Kong:香港中文大学:mingchangyang", "portraits/candidate-p0-hk-sg-second-round-ready-2026/ming-chang-yang.png"],
  ["Hong Kong:香港中文大学:tsungyiho", "portraits/candidate-p0-hk-sg-second-round-ready-2026/tsung-yi-ho.png"],
  ["Hong Kong:香港中文大学:zhidingliang", "portraits/candidate-p0-hk-sg-second-round-ready-2026/zhiding-liang.png"],
  ["Hong Kong:香港城市大学:lishuaicheng李帥成", "portraits/candidate-p0-hk-sg-second-round-ready-2026/shuaicheng-li.png"],
  ["Hong Kong:香港理工大学:caojiannong", "portraits/candidate-p0-hk-sg-second-round-ready-2026/jiannong-cao.png"],
]);

const secondPortraitDir = path.join(root, "public/portraits/candidate-p0-hk-sg-second-round-2026");
const portraitSlug = (row) => row.canonicalKey.split(":").at(-1).replace(/[^a-z0-9]+/gi, "-").toLowerCase();
const localPortraitFor = (row) => {
  if (readyPortraits.has(row.canonicalKey)) return readyPortraits.get(row.canonicalKey);
  const fileName = `${portraitSlug(row)}.png`;
  return fs.existsSync(path.join(secondPortraitDir, fileName)) ? `portraits/candidate-p0-hk-sg-second-round-2026/${fileName}` : null;
};

const records = pending.map((row) => {
  const atlasPersonId = strictReady.get(row.canonicalKey);
  const localPortrait = localPortraitFor(row);
  const publicationAttempt = publicationByKey.get(row.canonicalKey);
  if (atlasPersonId) {
    return {
      canonicalKey: row.canonicalKey,
      name: row.name,
      region: row.region,
      institution: row.institution,
      previousDisposition: row.disposition,
      disposition: "ready",
      atlasPersonId,
      localPortrait,
      checkedSources: row.checkedSources,
      reason: "第二轮逐人复核确认现任独立 PI；官方名录与个人页提供双来源和教育/履历/研究事实；官方头像已本地化；官方个人页、官方论文页或出版页提供可建边的导师或共同论文端点。",
    };
  }
  if (row.disposition === "missing_portrait") {
    if (localPortrait) {
      return {
        canonicalKey: row.canonicalKey,
        name: row.name,
        region: row.region,
        institution: row.institution,
        previousDisposition: row.disposition,
        disposition: "missing_relationship",
        localPortrait,
        checkedSources: row.checkedSources,
        reason: "第二轮已从官方人物页取得头像并本地转制为 512×512；但现有官方页尚未同时给出可唯一定位端点的导师、学生、共同论文作者或产业关系，因此不能仅凭头像晋级。",
      };
    }
    const hkuProtected = row.institution === "香港大学";
    const sutdPlaceholder = row.canonicalKey.endsWith(":ramasamysavitha");
    return {
      canonicalKey: row.canonicalKey,
      name: row.name,
      region: row.region,
      institution: row.institution,
      previousDisposition: row.disposition,
      disposition: "missing_portrait",
      localPortrait: null,
      checkedSources: row.checkedSources,
      reason: hkuProtected
        ? "HKU 官方个人页给出头像路径，但图片主机对自动化下载返回 403/安全网关 HTML，无法把该响应当作可靠头像；需人工取得同一官方资源或个人主页原图。"
        : sutdPlaceholder
          ? "SUTD 官方个人页当前只提供站点占位图，未发现可核验的人物照片；不得用占位图晋级。"
          : "第二轮仍未取得可核验的非占位人物头像。",
    };
  }
  const rejectedFalseMatch = ["shaohuali", "songtaolu", "weimeng", ":yuli"].some((suffix) => row.canonicalKey.includes(suffix));
  return {
    canonicalKey: row.canonicalKey,
    name: row.name,
    region: row.region,
    institution: row.institution,
    previousDisposition: row.disposition,
    disposition: "missing_relationship",
    localPortrait: null,
    remotePortraitUrl: row.portraitUrl ?? null,
    checkedSources: row.checkedSources,
    bibliographicAttempt: publicationAttempt ? {
      result: publicationAttempt.disposition,
      authorId: publicationAttempt.openAlexAuthor?.id ?? publicationAttempt.openAlexAuthorId ?? null,
      work: publicationAttempt.relationship?.work ?? null,
    } : null,
    reason: rejectedFalseMatch
      ? "第二轮作者库检索出现同名但研究主题明显不符的候选论文，已按机构、研究方向和论文主题三重消歧驳回；尚无一手可建边关系。"
      : publicationAttempt?.disposition === "fetch_error"
        ? "已复核官方院系页与个人页但未发现可建边端点；补充作者库请求遭遇 429 限流，未取得足以消歧的共同作者记录，因此保持关系证据缺口并等待后续一手材料。"
        : "已复核官方院系页与个人页；机器辅助作者库检索未形成可同时通过姓名、当前机构和研究主题消歧的一手关系端点，继续保持关系证据缺口。",
  };
});

const dispositionCounts = Object.fromEntries([...new Set(records.map((row) => row.disposition))].sort().map((status) => [status, records.filter((row) => row.disposition === status).length]));
const transitionCounts = Object.fromEntries([...new Set(records.map((row) => `${row.previousDisposition}->${row.disposition}`))].sort().map((transition) => [transition, records.filter((row) => `${row.previousDisposition}->${row.disposition}` === transition).length]));
const report = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  scope: "Second-round disposition for every remaining Hong Kong and Singapore P0 strict-gate candidate",
  strictGate: "current independent PI; at least two reliable sources; 3–5 sourced facts including education/trajectory; reliable local portrait; at least one first-party-verifiable adviser/student/collaboration/industry relationship",
  reviewed: records.length,
  dispositionCounts,
  transitionCounts,
  localPortraitResolvedCount: records.filter((row) => row.localPortrait).length,
  newlyReadyCount: records.filter((row) => row.disposition === "ready").length,
  records,
};

const output = path.join(root, "data/candidate-priority-p0-hk-sg-second-round-disposition-2026-09-03.json");
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ output, reviewed: report.reviewed, dispositionCounts, transitionCounts, localPortraitResolvedCount: report.localPortraitResolvedCount }, null, 2));
