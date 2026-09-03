import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const queuePath = path.join(root, "data/candidate-priority-queue-2026-09-03.json");
const rosterDir = path.join(root, "data/official-rosters");
const outputPath = path.join(root, "data/candidate-priority-p0-asia-disposition-2026-09-03.json");

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const sourceCachePath = path.join(
  root,
  "data/candidate-priority-p0-asia-source-cache-2026-09-03.json",
);
const sourceCache = fs.existsSync(sourceCachePath)
  ? JSON.parse(fs.readFileSync(sourceCachePath, "utf8")).records
  : [];
const sourceCacheByKey = new Map(sourceCache.map((record) => [record.canonicalKey, record]));
const regions = new Set(["Mainland China", "Hong Kong", "Singapore"]);
const candidates = queue.candidates.filter(
  (candidate) => candidate.tier === "P0" && regions.has(candidate.region),
);

const normalizeUrl = (value) =>
  String(value ?? "")
    .trim()
    .replace(/^http:/, "https:")
    .replace(/\/$/, "")
    .toLowerCase();

const profileEvidence = new Map();

const visit = (value, file) => {
  if (Array.isArray(value)) {
    value.forEach((entry) => visit(entry, file));
    return;
  }
  if (!value || typeof value !== "object") return;

  const urls = [value.profileUrl, value.evidenceUrl, value.url]
    .map(normalizeUrl)
    .filter(Boolean);
  const portraitUrl =
    value.portraitUrl ?? value.photoUrl ?? value.imageUrl ?? value.avatarUrl ?? null;

  for (const url of urls) {
    const previous = profileEvidence.get(url) ?? {
      files: new Set(),
      portraitUrls: new Set(),
    };
    previous.files.add(file);
    if (portraitUrl) previous.portraitUrls.add(portraitUrl);
    profileEvidence.set(url, previous);
  }

  Object.values(value).forEach((entry) => visit(entry, file));
};

for (const file of fs.readdirSync(rosterDir)) {
  if (!file.endsWith(".json")) continue;
  try {
    visit(JSON.parse(fs.readFileSync(path.join(rosterDir, file), "utf8")), file);
  } catch {
    // An unrelated malformed artifact must not make the frozen disposition disappear.
  }
}

const ready = new Map([
  ["Mainland China:清华大学:chunyu", "chun-yu-thu-p0-b10"],
  ["Mainland China:清华大学:yuanchunshi", "yuanchun-shi-thu-p0-b10"],
  ["Mainland China:清华大学:hongningwang", "hongning-wang-thu-p0-b10"],
  ["Hong Kong:香港科技大学:linpingyuan", "linping-yuan-hkust-p0-b10"],
  ["Mainland China:清华大学:lifengsun", "lifeng-sun-thu-p0-b11"],
  ["Mainland China:清华大学:taijiangmu", "taijiang-mu-thu-p0-b11"],
  ["Mainland China:清华大学:刘云新", "yunxin-liu-thu-air-p0-b11"],
  ["Mainland China:清华大学:曹婷", "ting-cao-thu-air-p0-b11"],
  ["Mainland China:北京大学:吴云芳", "yunfang-wu-pku-p0-b11"],
  ["Mainland China:北京大学:谢辽夏", "sergey-mechtaev-pku-p0-b11"],
  ["Mainland China:清华大学:yuntaowang", "yuntao-wang-thu-p0-b12"],
  ["Hong Kong:香港科技大学:dimitrispapadias", "dimitris-papadias-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:keyi", "ke-yi-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:qiongluo", "qiong-luo-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:raymondchiwingwong", "raymond-wong-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:wilfredsiuhungng", "wilfred-ng-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:xiaofangzhou", "xiaofang-zhou-hkust-p0-2026"],
  ["Hong Kong:香港中文大学:jamescheng", "james-cheng-cuhk-p0-2026"],
  ["Hong Kong:香港中文大学:yufeitao", "yufei-tao-cuhk-p0-2026"],
  ["Singapore:Singapore Management University:davidlo", "david-lo-smu-p0-2026"],
  ["Singapore:Singapore Management University:jianglingxiao", "lingxiao-jiang-smu-p0-2026"],
  ["Singapore:Singapore Management University:sunjun", "jun-sun-smu-p0-2026"],
  ["Hong Kong:香港科技大学:andrewbhorner", "andrew-horner-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:arpitnarechania", "arpit-narechania-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:binhangyuan", "binhang-yuan-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:nevinlianwenzhang", "nevin-zhang-hkust-p0-2026"],
  ["Hong Kong:香港科技大学:pedrosander", "pedro-sander-hkust-p0-2026"],
  ["Singapore:National University of Singapore:abhikroychoudhury", "abhik-roychoudhury-nus-p0-2026"],
  ["Singapore:National University of Singapore:rezashokri", "reza-shokri-nus-p0-2026"],
  ["Singapore:National University of Singapore:lowkianhsiang", "bryan-low-nus-p0-2026"],
  ["Singapore:National University of Singapore:hsuwynne", "wynne-hsu-nus-p0-2026"],
  ["Singapore:National University of Singapore:leeweesun", "wee-sun-lee-nus-p0-2026"],
  ["Mainland China:上海交通大学:王德泉", "dequan-wang-sjtu-p0-2026"],
  ["Mainland China:上海交通大学:谷大武", "dawu-gu-sjtu-p0-2026"],
  ["Mainland China:清华大学:陆文凯", "wenkai-lu-thu-p0-2026"],
  ["Mainland China:清华大学:杨帆", "fan-yang-thu-auto-p0-2026"],
  ["Mainland China:清华大学:胡坚明", "jianming-hu-thu-p0-2026"],
  ["Mainland China:北京大学:许超", "chao-xu-pku-p0-2026"],
  ["Singapore:National University of Singapore:brianlimyouliang", "brian-lim-nus-p0-2026"],
  ["Singapore:National University of Singapore:huangkewei", "kewei-huang-nus-p0-2026"],
  ["Singapore:National University of Singapore:tanchengyianbernard", "bernard-tan-nus-p0-2026"],
  ["Singapore:National University of Singapore:duanjiafei", "jiafei-duan-nus-p0-2026"],
  ["Singapore:National University of Singapore:linshao", "lin-shao-nus-p0-2026"],
  ["Singapore:National University of Singapore:haroldsohsoonhong", "harold-soh-nus-p0-2026"],
  ["Singapore:National University of Singapore:jonathanscarlett", "jonathan-scarlett-nus-p0-2026"],
  ["Singapore:National University of Singapore:khoosiaucheng", "siau-cheng-khoo-nus-p0-2026"],
  ["Singapore:National University of Singapore:wangye", "ye-wang-nus-p0-2026"],
  ["Hong Kong:香港中文大学:liweiwang", "liwei-wang-cuhk-p0-2026"],
  ["Hong Kong:香港中文大学:weiyangliu", "weiyang-liu-cuhk-p0-2026"],
  ["Singapore:Nanyang Technological University:asstprofjaehongyoon", "jaehong-yoon-ntu-p0-2026"],
  ["Singapore:Nanyang Technological University:asstprofseandu", "sean-du-ntu-p0-2026"],
  ["Mainland China:清华大学:刘菁菁", "jingjing-liu-thu-air-p0-2026"],
  ["Mainland China:清华大学:周浩", "hao-zhou-thu-air-p0-2026"],
  ["Mainland China:清华大学:yiqunliu", "yiqun-liu-thu-p0-2026"],
  ["Mainland China:清华大学:qiangzhou", "qiang-zhou-thu-p0-2026"],
  ["Mainland China:清华大学:zhengfengji", "zhengfeng-ji-thu-p0-2026"],
  ["Mainland China:北京大学:张昕", "xin-zhang-pku-p0-2026"],
  ["Mainland China:北京大学:陈宝权", "baoquan-chen-pku-p0-2026"],
  ["Hong Kong:香港中文大学:hanruizhang", "hanrui-zhang-cuhk-p0-2026"],
  ["Singapore:National University of Singapore:wangbohan", "bohan-wang-nus-p0-2026"],
  ["Mainland China:清华大学:mingshengying", "mingsheng-ying-thu-p0-2026"],
  ["Mainland China:清华大学:minzhang", "min-zhang-thu-p0-2026"],
  ["Mainland China:清华大学:haizhouai", "haizhou-ai-thu-p0-2026"],
  ["Mainland China:清华大学:xiaolinhu", "xiaolin-hu-thu-p0-2026"],
  ["Mainland China:清华大学:songhaizhang", "songhai-zhang-thu-p0-2026"],
  ["Mainland China:清华大学:兰艳艳", "yanyan-lan-thu-air-p0-2026"],
  ["Mainland China:北京大学:张铭", "ming-zhang-pku-p0-2026"],
  ["Singapore:National University of Singapore:simmongchengterence", "terence-sim-nus-p0-2026"],
]);

// These matches are identity-safe: six share the exact official profile URL with an
// existing atlas node; the remaining five match institution plus full name and were
// manually checked against the existing node. They should not be promoted twice.
const duplicate = new Map([
  ["Mainland China:清华大学:hangsu", "hang-su-thu"],
  ["Mainland China:清华大学:juanzili", "juanzi-li-thu"],
  ["Mainland China:清华大学:leihou", "lei-hou-thu"],
  ["Singapore:National University of Singapore:bryanhooikuenyew", "bryan-hooi"],
  ["Singapore:National University of Singapore:mikeshou", "mike-zheng-shou"],
  ["Singapore:National University of Singapore:qizhexie", "qizhe-shieh"],
  ["Mainland China:浙江大学:杨洋", "yang-yang-tang-alumnus"],
  ["Mainland China:南京大学:周志华院士", "zhihua-zhou-nju"],
  ["Mainland China:南京大学:谭铁牛院士博导", "tieniu-tan-cas"],
  ["Hong Kong:香港理工大学:liwenjiemaggie", "wenjie-li"],
  ["Hong Kong:香港理工大学:zhangleijohn", "lei-zhang-polyu"],
]);

const ledger = candidates.map((candidate) => {
  const profile = profileEvidence.get(normalizeUrl(candidate.evidenceUrl));
  const portraitUrls = [...(profile?.portraitUrls ?? [])];
  const rosterUrls = (candidate.rosterMemberships ?? [])
    .flatMap((membership) => [membership.unitUrl, membership.evidenceUrl])
    .filter(Boolean);
  const evidenceUrls = [...new Set([candidate.evidenceUrl, ...rosterUrls])];
  const distinctSourceCount = new Set(evidenceUrls.map(normalizeUrl)).size;
  const checkedProfile = sourceCacheByKey.get(candidate.canonicalKey);
  const checkedSources = [
    ...evidenceUrls.map((url) => ({ url, kind: url === candidate.evidenceUrl ? "official_profile" : "official_roster", result: "identified" })),
    ...(checkedProfile
      ? [{
          url: checkedProfile.requestedUrl,
          finalUrl: checkedProfile.finalUrl,
          kind: "profile_fetch",
          result: checkedProfile.ok ? "fetched" : "fetch_failed",
          httpStatus: checkedProfile.httpStatus,
          error: checkedProfile.error,
        }]
      : []),
  ];
  const extractedEvidence = checkedProfile
    ? {
        pageTitle: checkedProfile.pageTitle,
        metaDescription: checkedProfile.metaDescription,
        imageCandidates: checkedProfile.imageCandidates,
        relationshipEvidenceCandidates: checkedProfile.relationExcerpts,
        relevantLinks: checkedProfile.evidenceLinks,
      }
    : null;

  if (ready.has(candidate.canonicalKey)) {
    return {
      canonicalKey: candidate.canonicalKey,
      name: candidate.name,
      region: candidate.region,
      institution: candidate.institution,
      status: "ready",
      atlasPersonId: ready.get(candidate.canonicalKey),
      evidenceUrls,
      portraitUrl: portraitUrls[0] ?? null,
      checkedSources,
      extractedEvidence,
      reason:
        "现任独立 PI、两项以上一手来源、五条带来源事实、教育训练、512×512 官方头像及人物关系/学生去向均已形成独立接入模块。",
    };
  }

  if (duplicate.has(candidate.canonicalKey)) {
    return {
      canonicalKey: candidate.canonicalKey,
      name: candidate.name,
      region: candidate.region,
      institution: candidate.institution,
      status: "duplicate",
      atlasPersonId: duplicate.get(candidate.canonicalKey),
      evidenceUrls,
      portraitUrl: portraitUrls[0] ?? null,
      checkedSources,
      extractedEvidence,
      reason: "与现有图谱节点完成官方主页或机构内全名身份核对，不重复创建人物。",
    };
  }

  if (distinctSourceCount < 2) {
    return {
      canonicalKey: candidate.canonicalKey,
      name: candidate.name,
      region: candidate.region,
      institution: candidate.institution,
      status: "missing_second_source",
      evidenceUrls,
      portraitUrl: portraitUrls[0] ?? null,
      checkedSources,
      extractedEvidence,
      reason: "当前只有一项可区分的一手页面，尚未达到两项来源门槛。",
    };
  }

  if (portraitUrls.length === 0) {
    return {
      canonicalKey: candidate.canonicalKey,
      name: candidate.name,
      region: candidate.region,
      institution: candidate.institution,
      status: "missing_portrait",
      evidenceUrls,
      portraitUrl: null,
      checkedSources,
      extractedEvidence,
      reason: "官方名录与个人页已定位，但冻结资料缓存未提供可核验头像；需补官方头像并转制、人工检查为 512×512。",
    };
  }

  return {
    canonicalKey: candidate.canonicalKey,
    name: candidate.name,
    region: candidate.region,
    institution: candidate.institution,
    status: "missing_relationship",
    evidenceUrls,
    portraitUrl: portraitUrls[0],
    checkedSources,
    extractedEvidence,
    reason: "现任 PI、两项来源和官方头像已具备；尚缺可由一手材料确认且端点可接入的师承、学生、合作或产业关系。",
  };
});

const statusValues = [
  "ready",
  "duplicate",
  "exclude_non_pi",
  "exclude_out_of_scope",
  "missing_second_source",
  "missing_portrait",
  "missing_relationship",
];

const statusCounts = Object.fromEntries(
  statusValues.map((status) => [status, ledger.filter((entry) => entry.status === status).length]),
);
const regionCounts = Object.fromEntries(
  [...regions].map((region) => [region, ledger.filter((entry) => entry.region === region).length]),
);

const output = {
  schemaVersion: 1,
  generatedAt: "2026-09-03",
  sourceQueue: "data/candidate-priority-queue-2026-09-03.json",
  scope: "All remaining P0 candidates in Mainland China, Hong Kong and Singapore",
  policyNotes: [
    "The queue already contains only records previously classified as current candidate_new_pi; therefore exclusion statuses are zero in this pass.",
    "A distinct official roster URL plus a specific official profile URL count as two first-party sources.",
    "missing_portrait and missing_relationship identify the first unmet publication gate represented by this ledger; they are not negative judgments about the scholar.",
    "ready rows in this remaining-candidate snapshot are implemented in independent candidate-priority-p0-asia batch modules and are not yet wired into app/data.ts.",
  ],
  total: ledger.length,
  regionCounts,
  statusCounts,
  ledger,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, total: ledger.length, regionCounts, statusCounts }, null, 2));
