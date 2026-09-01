import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { transform } from "esbuild";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: path.startsWith("/api/") ? "application/json" : "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the public academic atlas", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>学脉 Atlas — AI \/ NLP \/ CV 学术关系图谱<\/title>/i);
  assert.match(html, /中国大陆、香港、新加坡、美国、加拿大与欧洲 AI、NLP、计算机视觉、多模态与机器人学者/);
  assert.match(html, /Mainland China/);
  assert.match(html, /Hong Kong/);
  assert.match(html, /Singapore/);
  assert.match(html, /United States/);
  assert.match(html, /Canada/);
  assert.match(html, /Europe/);
  assert.match(html, /纠错 \/ 补充/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("person search expands the complete undirected connected component", async () => {
  const source = await readFile(new URL("../app/graph-connectivity.ts", import.meta.url), "utf8");
  const compiled = await transform(source, { loader: "ts", format: "esm", target: "es2022" });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.code).toString("base64")}`;
  const { undirectedConnectedPersonIds, undirectedHopDistances } = await import(moduleUrl);
  const links = [
    { from: "mentor", to: "center" },
    { from: "center", to: "student" },
    { from: "student", to: "second-hop" },
    { from: "isolated", to: "isolated" },
  ];
  assert.deepEqual([...undirectedConnectedPersonIds("center", links)].sort(), ["center", "mentor", "second-hop", "student"]);
  assert.equal(undirectedHopDistances("center", links).get("second-hop"), 2);
  assert.deepEqual([...undirectedConnectedPersonIds("second-hop", links)].sort(), ["center", "mentor", "second-hop", "student"]);
});

test("includes evidence-backed Goodfellow and foundational scholar networks", async () => {
  const [goodfellow, western, asia, portraits, dataSource, auditSource] = await Promise.all([
    readFile(new URL("../app/goodfellow-mila-network-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/western-foundational-network-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/asia-senior-network-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/portrait-data-network-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/audit-network-coverage.ts", import.meta.url), "utf8"),
  ]);
  for (const relationship of ["goodfellow-network-ng-goodfellow-msc", "goodfellow-network-bengio-dauphin-phd", "goodfellow-network-bengio-bahdanau-phd"]) {
    assert.match(goodfellow, new RegExp(relationship));
  }
  for (const relationship of ["western-bresnan-manning-phd", "western-malik-efros-phd", "western-pearl-bareinboim-phd", "western-abbeel-levine-postdoc"]) {
    assert.match(western, new RegExp(relationship));
  }
  for (const relationship of ["asia-senior-zhang-bo-ma-shaoping", "asia-senior-sun-maosong-liu-zhiyuan", "asia-senior-lyu-zibin-zheng", "asia-senior-chua-lizi-liao"]) {
    assert.match(asia, new RegExp(relationship));
  }
  for (const integration of ["goodfellowMilaNetworkPeople", "westernFoundationalNetworkPeople", "westernFoundationalNetworkPersonEnhancements", "asiaSeniorNetworkPeople"]) {
    assert.match(dataSource, new RegExp(integration));
  }
  for (const portraitId of ["yann-dauphin-mila-network", "joan-bresnan-foundational", "dinesh-jayaraman-foundational", "shaoping-ma-thu", "lizi-liao-smu"]) {
    assert.match(portraits, new RegExp(portraitId));
  }
  assert.match(dataSource, /networkExpansionPortraits/);
  for (const scholar of ["ian-goodfellow-foundational", "christopher-manning-us", "jitendra-malik-us", "judea-pearl-historical"]) {
    assert.match(auditSource, new RegExp(scholar));
  }
});

test("includes the United States roster, lineages, and student destinations", async () => {
  const source = await readFile(new URL("../app/us-data.ts", import.meta.url), "utf8");

  for (const institution of ["Stanford", "Berkeley", "CMU", "UW", "MIT", "Princeton", "Cornell", "NYU", "Columbia", "UMass", "JHU", "UT Austin"]) {
    assert.match(source, new RegExp(`"${institution}"`));
  }
  for (const scholar of ["Christopher Manning", "Dan Klein", "Graham Neubig", "Hanna Hajishirzi", "Regina Barzilay", "Danqi Chen", "Kathleen McKeown", "Benjamin Van Durme"]) {
    assert.match(source, new RegExp(scholar));
  }
  for (const destination of ["Thinking Machines Lab", "Meta FAIR", "Google Gemini", "Microsoft Frontier Tuning"]) {
    assert.match(source, new RegExp(destination));
  }
});

test("includes the cross-region AI and computer-vision expansion", async () => {
  const [mainland, hkSg, us, dataSource] = await Promise.all([
    readFile(new URL("../app/mainland-ai-cv-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/hk-sg-ai-cv-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/us-ai-cv-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
  ]);

  for (const scholar of ["朱军", "王亦洲", "谭铁牛", "卢策吾"]) assert.match(mainland, new RegExp(scholar));
  for (const scholar of ["Mohan Kankanhalli", "Chen Change Loy", "Xiaogang Wang", "Dahua Lin"]) assert.match(hkSg, new RegExp(scholar));
  for (const scholar of ["Fei-Fei Li", "Trevor Darrell", "Yann LeCun", "Kristen Grauman", "Rose Yu"]) assert.match(us, new RegExp(scholar));
  for (const institution of ["UMich", "UIUC", "Georgia Tech", "UCLA", "UCSD"]) assert.match(dataSource, new RegExp(`"${institution}"`));
  assert.match(dataSource, /US Vision, Generative & Spatial Intelligence/);
  assert.match(dataSource, /Vision, Multimodal & Embodied AI/);
});

test("includes the Europe roster, academic lineages, and industry bridges", async () => {
  const [europe, dataSource] = await Promise.all([
    readFile(new URL("../app/europe-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
  ]);
  for (const institution of ["Oxford", "Cambridge", "UCL", "Edinburgh", "ETH Zurich", "EPFL", "Tübingen/MPI", "TU Darmstadt", "UvA", "KU Leuven", "Inria", "Sapienza"]) {
    assert.match(europe, new RegExp(`"${institution.replace("/", "\\/")}"`));
  }
  for (const scholar of ["Mirella Lapata", "Yarin Gal", "Michael Bronstein", "Cordelia Schmid", "Iryna Gurevych", "Roberto Navigli"]) {
    assert.match(europe, new RegExp(scholar));
  }
  for (const connection of ["Microsoft", "Amazon", "Toshiba", "CuspAI", "Babelscape", "Google Research"]) {
    assert.match(europe, new RegExp(connection));
  }
  assert.match(dataSource, /europePeople/);
  assert.match(dataSource, /europeRelationships/);
});

test("includes Canada, foundational AI lineages, and the global P0 audit", async () => {
  const [canada, foundational, globalP0, portraits, dataSource] = await Promise.all([
    readFile(new URL("../app/canada-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/us-foundational-audit-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/global-p0-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/portrait-data-us-foundational.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
  ]);

  for (const institution of ["U of Toronto", "Université de Montréal", "McGill", "UBC", "University of Alberta", "Waterloo"]) {
    assert.match(canada, new RegExp(institution));
  }
  for (const scholar of ["Geoffrey Hinton", "Yoshua Bengio", "Richard Sutton", "Joëlle Pineau", "Hugo Larochelle"]) {
    assert.match(canada, new RegExp(scholar));
  }
  for (const network of ["Vector Institute", "Mila", "RLAI"]) assert.match(canada, new RegExp(network));
  assert.match(foundational, /foundation-hinton-lecun/);
  assert.match(foundational, /Ilya Sutskever/);
  for (const scholar of ["Michael I. Jordan", "Andrew Zisserman", "Yi Ma", "David Hsu", "Stuart Russell"]) {
    assert.match(globalP0, new RegExp(scholar));
  }
  assert.match(portraits, /yann-lecun-us/);
  for (const integration of ["canadaExpansionPeople", "usFoundationalAuditPeople", "globalP0People"]) {
    assert.match(dataSource, new RegExp(integration));
  }
});

test("includes detailed Canada and global P0 profiles with verified portrait mappings", async () => {
  const [east, west, eastPortraits, westPortraits, globalP0, globalP0BPortraits, dataSource] = await Promise.all([
    readFile(new URL("../app/canada-east-profile-enrichment.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/canada-west-profile-enrichment.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/portrait-data-canada-east.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/portrait-data-canada-west.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/global-p0-profile-enrichment.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/portrait-data-global-p0-b.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
  ]);

  for (const scholar of ["geoffrey-hinton-ca", "yoshua-bengio-ca", "sanja-fidler-ca", "doina-precup-ca", "siva-reddy-ca"]) {
    assert.match(east, new RegExp(scholar));
    assert.match(eastPortraits, new RegExp(scholar));
  }
  for (const scholar of ["richard-sutton-ca", "vered-shwartz-ca", "pascal-poupart-ca", "wenhu-chen-ca", "yuntian-deng-ca"]) {
    assert.match(west, new RegExp(scholar));
    assert.match(westPortraits, new RegExp(scholar));
  }
  for (const correction of ["Columbia", "on leave January–December 2026", "Associate Professor", "Physical Medicine & Rehabilitation"]) {
    assert.match(`${east}\n${west}`, new RegExp(correction));
  }
  for (const relationship of ["ca-west-black-sigal", "ca-west-bowling-martha-white", "ca-west-sutton-pilarski", "global-p0-enrich-hinton-dayan"]) {
    assert.match(`${west}\n${globalP0}`, new RegExp(relationship));
  }
  for (const scholar of ["yi-ma-hku", "tong-zhang-hkust", "david-hsu-nus", "shuicheng-yan-nus", "ivor-tsang-astar", "steven-hoi-smu"]) {
    assert.match(globalP0BPortraits, new RegExp(scholar));
  }
  assert.doesNotMatch(globalP0BPortraits, /src: `\/portraits/);
  for (const integration of ["canadaEastPersonEnhancements", "canadaWestPersonEnhancements", "globalP0PersonEnhancements", "globalP0BPortraits"]) {
    assert.match(dataSource, new RegExp(integration));
  }
});

test("includes the systematic faculty-roster audit", async () => {
  const [roster, dataSource] = await Promise.all([
    readFile(new URL("../app/systematic-roster-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
  ]);

  for (const scholar of ["Hanwang Zhang", "张含望", "Xingang Pan", "Xihui Liu", "Dan Xu", "高文", "Chelsea Finn", "Pieter Abbeel"]) {
    assert.match(roster, new RegExp(scholar));
  }
  assert.match(dataSource, /systematicRosterPeople/);
  assert.match(dataSource, /systematicRosterRelationships/);
});

test("includes the reverse lineage and flagship CV roster audit", async () => {
  const [audit, communities, dataSource] = await Promise.all([
    readFile(new URL("../app/cv-roster-audit-expansion.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/academic-community-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
  ]);

  for (const scholar of ["Kaiming He", "何恺明", "Xiaoou Tang", "汤晓鸥", "Jitendra Malik", "Abhinav Gupta", "Shuran Song", "Saining Xie", "Angjoo Kanazawa", "Jiaya Jia"]) {
    assert.match(audit, new RegExp(scholar));
  }
  assert.match(audit, /tang-kaiming-phd-lineage/);
  assert.match(audit, /CUHK IE 官方页面明确称何恺明为汤晓鸥的博士生/);
  assert.match(communities, /北美学术分支/);
  assert.match(dataSource, /cvRosterAuditPeople/);
  assert.match(dataSource, /cvRosterAuditRelationships/);
});

test("includes the 2024–2026 conference-award reverse audit", async () => {
  const [acl, neurips, cvpr, iclrIcml, dataSource, atlasSource] = await Promise.all([
    readFile(new URL("../app/award-audit-acl.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/award-audit-neurips.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/award-audit-cvpr.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/award-audit-iclr-icml.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/AcademicAtlas.tsx", import.meta.url), "utf8"),
  ]);

  for (const page of ["2024.aclweb.org/program/best_papers", "neurips.cc/virtual/2025/awards_detail", "cvpr.thecvf.com/Conferences/2026/News/Best_Papers", "blog.iclr.cc/2026", "icml.cc/virtual/2025/awards_detail"]) {
    assert.match(`${acl}\n${neurips}\n${cvpr}\n${iclrIcml}`, new RegExp(page.replaceAll("/", "\\/")));
  }
  for (const scholar of ["Richard Futrell", "Boaz Barak", "Andrea Vedaldi", "Eero P. Simoncelli", "Stéphane Mallat", "Dale Schuurmans"]) {
    assert.match(`${acl}\n${neurips}\n${cvpr}\n${iclrIcml}`, new RegExp(scholar));
  }
  assert.match(dataSource, /awardAuditEnhancements/);
  assert.match(dataSource, /conferenceAwardAudit/);
  assert.match(dataSource, /iclrIcmlAwardAuditRelationships/);
  assert.match(atlasSource, /获奖作者网络/);
  assert.match(atlasSource, /conferenceAwardAudit/);
});

test("renders company and evidence sections", async () => {
  const response = await render();
  const html = await response.text();
  const companyLineages = await readFile(new URL("../app/company-lineage-data.ts", import.meta.url), "utf8");
  const atlasSource = await readFile(new URL("../app/AcademicAtlas.tsx", import.meta.url), "utf8");

  assert.match(html, /COMPANY-CENTERED GRAPH/);
  assert.match(html, /EVIDENCE STANDARD/);
  assert.match(html, /Hong Kong/);
  assert.match(html, /Singapore/);
  for (const company of ["ByteDance Seed", "Alibaba Qwen", "Moonshot AI / Kimi", "Zhipu AI / GLM", "OpenAI", "Anthropic", "Meta FAIR", "Character.AI", "Thinking Machines Lab", "Safe Superintelligence", "Google DeepMind"]) {
    assert.match(companyLineages, new RegExp(company));
  }
  for (const researcher of ["Wanjun Zhong", "Fangzhi Xu", "Bowen Yu", "Chujie Zheng", "Zhilin Yang", "Zhengxiao Du", "Noam Brown", "Nicholas Carlini", "Luke Zettlemoyer", "Noam Shazeer", "John Schulman", "Ilya Sutskever", "Koray Kavukcuoglu"]) {
    assert.match(companyLineages, new RegExp(researcher));
  }
  assert.match(atlasSource, /company-orbit-canvas/);
  assert.match(atlasSource, /历史关系/);
  assert.match(atlasSource, /未找到可公开核验的正式导师关系/);
  assert.match(atlasSource, /不根据作者顺序推断职位或贡献大小/);
});

test("renders the expanded Mainland China roster and coverage", async () => {
  const response = await render();
  const html = await response.text();

  for (const institution of ["THU", "PKU", "FDU", "RUC", "HIT", "CAS-IA", "NJU", "SJTU", "ZJU", "USTC", "BIT", "BUAA", "BUPT", "XJTU", "SYSU", "ECNU", "WHU"]) {
    assert.match(html, new RegExp(`>${institution}<`));
  }
  for (const scholar of ["孙茂松", "潘亮铭", "邱锡鹏", "窦志成", "车万翔", "宗成庆", "黄书剑", "吴小宝"]) {
    assert.match(html, new RegExp(scholar));
  }
  for (const romanizedName of ["Maosong Sun", "Liangming Pan", "Xipeng Qiu", "Zhicheng Dou"]) {
    assert.doesNotMatch(html, new RegExp(`<(?:strong|h3)>${romanizedName}</(?:strong|h3)>`));
  }
  for (const addedScholar of ["陈华钧", "张岸", "黄河燕", "陶重阳", "王小捷", "丁宁", "刘咏梅", "周杰", "钱铁云"]) {
    assert.match(html, new RegExp(addedScholar));
  }
  assert.match(html, /大陆第二期|17 个重点机构/);
});

test("renders enriched senior-scholar profiles and evidence density", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /学堂在线/);
  assert.match(html, /来源 [4-9]\d* · 脉络 (?:[5-9]|\d{2,}) · 关系 (?:[3-9]|\d{2,}) · 去向 (?:[8-9]|\d{2,})/);
  assert.match(html, /来源 3 · 脉络 5 · 关系 2 · 去向 24/);
  assert.match(html, /来源 4 · 脉络 4 · 关系 1 · 去向 3 · 组员 1/);
});

test("renders named Mainland student destinations with teacher coverage", async () => {
  const response = await render();
  const html = await response.text();
  const placements = await readFile(new URL("../app/mainland-enrichment-data.ts", import.meta.url), "utf8");

  assert.match(html, /学生去向/);
  assert.match(html, /公开可核验样本，不是完整就业统计或导师排名/);
  for (const student of ["宋皓宇", "袁建华", "王兴昊", "朱泽圻"]) {
    assert.match(placements, new RegExp(student));
  }
  assert.match(placements, /Genius Youth Program/);
  assert.match(html, /去向 24/);
});

test("renders P0 discovery, trust, and contribution controls", async () => {
  const response = await render();
  const html = await response.text();
  const atlasSource = await readFile(new URL("../app/AcademicAtlas.tsx", import.meta.url), "utf8");
  const feedbackSource = await readFile(new URL("../app/FeedbackDrawer.tsx", import.meta.url), "utf8");
  const feedbackRouteSource = await readFile(new URL("../app/api/feedback/route.ts", import.meta.url), "utf8");

  assert.match(html, /跨六地区搜索人物、学生、公司、方向/);
  assert.match(html, /从你的目标开始/);
  assert.match(html, /复制人物链接/);
  assert.match(html, /资料核验/);
  assert.match(atlasSource, /学位待补/);
  assert.match(feedbackSource, /查询进度/);
  assert.match(feedbackRouteSource, /export async function GET/);
  assert.match(feedbackRouteSource, /未找到该反馈编号/);
});

test("renders destination sectors and evidence-linked person timelines", async () => {
  const response = await render();
  const html = await response.text();
  const dataSource = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");
  const atlasSource = await readFile(new URL("../app/AcademicAtlas.tsx", import.meta.url), "utf8");

  for (const sector of ["学术界", "工业界", "创业", "博后", "其他去向"]) {
    assert.match(dataSource, new RegExp(sector));
  }
  assert.match(atlasSource, /人物时间轴/);
  assert.match(atlasSource, /人物任职/);
  assert.match(atlasSource, /合作关系/);
  assert.match(atlasSource, /研究方向/);
  assert.match(atlasSource, /人才流动/);
  assert.match(atlasSource, /未知年份不会推断/);
  assert.doesNotMatch(html, /当前快照|数据快照/);
  assert.match(dataSource, /export function placementSectorOf/);
});

test("includes evidence-dense profiles from the original four regions", async () => {
  const enrichment = await readFile(new URL("../app/profile-enrichment-data.ts", import.meta.url), "utf8");

  for (const scholarId of [
    "xiting-wang", "pengfei-liu-sjtu", "hai-zhao-sjtu",
    "yi-fung", "xixin-wu", "liangliang-cao",
    "aixin-sun", "anh-tuan-luu", "jiancong-xiao",
    "dan-jurafsky-us", "diyi-yang-us", "mona-diab-us",
  ]) {
    assert.match(enrichment, new RegExp(`"${scholarId}"`));
  }
  for (const detail of ["微软亚洲研究院研究员", "Inspired Cognition", "Helen Meng", "Regina Barzilay", "Google Cloud Speech", "Socially Aware NLP", "R3LIT Lab"]) {
    assert.match(enrichment, new RegExp(detail));
  }
  assert.match(enrichment, /fourRegionProfileGroupMembers/);
  assert.match(enrichment, /fourRegionProfileStudentPlacements/);
});

test("renders the sourced portrait collection and privacy-preserving visitor map", async () => {
  const dataSource = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");
  const atlasSource = await readFile(new URL("../app/AcademicAtlas.tsx", import.meta.url), "utf8");
  const visitorSource = await readFile(new URL("../app/VisitorMap.tsx", import.meta.url), "utf8");
  const visitorRoute = await readFile(new URL("../app/api/visitors/route.ts", import.meta.url), "utf8");
  const portraitMaps = await Promise.all([
    "portrait-data-mainland.ts",
    "portrait-data-mainland-fill-a.ts",
    "portrait-data-mainland-fill-b.ts",
    "portrait-data-hk-sg.ts",
    "portrait-data-us.ts",
    "portrait-data-lamda.ts",
  ].map((name) => readFile(new URL(`../app/${name}`, import.meta.url), "utf8")));

  for (const portrait of ["portraits/lingpeng-kong.jpg", "portraits/tao-yu.jpg", "portraits/qi-liu.jpg"]) {
    assert.match(dataSource, new RegExp(portrait));
    assert.ok((await readFile(new URL(`../public/${portrait}`, import.meta.url))).byteLength > 10_000);
  }
  const mappedPortraitIds = portraitMaps.flatMap((source) => Array.from(source.matchAll(/^ {2}"([^"]+)"\s*:/gm), (match) => match[1]));
  assert.ok(mappedPortraitIds.length >= 190, `expected broad portrait coverage, found ${mappedPortraitIds.length}`);
  assert.equal(new Set(mappedPortraitIds).size, mappedPortraitIds.length);
  for (const id of ["wei-gao-lamda", "yuan-jiang-lamda", "yu-feng-li-lamda", "chao-qian-lamda", "yang-yu-lamda", "zongzhang-zhang-lamda", "dechuan-zhan-lamda", "lijun-zhang-lamda", "hanjia-ye-lamda", "peng-zhao-lamda"]) {
    assert.ok(mappedPortraitIds.includes(id), `expected a sourced portrait for ${id}`);
  }
  assert.match(atlasSource, /头像来源 ↗/);
  assert.match(visitorSource, /学脉从哪里被看见/);
  assert.match(visitorSource, /累计访问次数/);
  assert.match(visitorSource, /不保存原始 IP、城市、浏览轨迹或个人身份/);
  assert.match(visitorRoute, /visitorCountryCounts/);
  assert.doesNotMatch(visitorRoute, /ip_address|user_agent|city/i);
});
