import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the public academic atlas", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>学脉 Atlas — AI \/ NLP 学术关系图谱<\/title>/i);
  assert.match(html, /中国大陆、香港、新加坡与美国 AI、NLP、LLM 学者/);
  assert.match(html, /Mainland China/);
  assert.match(html, /Hong Kong/);
  assert.match(html, /Singapore/);
  assert.match(html, /United States/);
  assert.match(html, /纠错 \/ 补充/);
  assert.doesNotMatch(html, /codex-preview/);
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

test("renders company and evidence sections", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /COMPANY-CENTERED GRAPH/);
  assert.match(html, /EVIDENCE STANDARD/);
  assert.match(html, /Hong Kong/);
  assert.match(html, /Singapore/);
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
    assert.doesNotMatch(html, new RegExp(romanizedName));
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
  assert.match(html, /来源 4 · 脉络 5 · 关系 6 · 去向 8/);
  assert.match(html, /来源 3 · 脉络 5 · 关系 3/);
  assert.match(html, /来源 4 · 脉络 4 · 关系 2 · 去向 3 · 组员 1/);
});

test("renders named Mainland student destinations with teacher coverage", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /已核验学生去向 · .*12.* 位导师/);
  assert.match(html, /<strong>79<\/strong><span>已核验学生去向/);
  for (const student of ["宋皓宇", "袁建华", "王兴昊", "朱泽圻"]) {
    assert.match(html, new RegExp(student));
  }
  assert.match(html, /Genius Youth Program/);
  assert.match(html, /去向 24/);
});
