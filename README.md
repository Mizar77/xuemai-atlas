# 学脉 Atlas / Xuemai Atlas

[中文](#中文) · [English](#english)

**在线图谱 / Live website:** [https://mizar77.github.io/xuemai-atlas/](https://mizar77.github.io/xuemai-atlas/)

学脉 Atlas 是一个由公开证据驱动的 AI、NLP 与 LLM 学术关系图谱。我们希望更清楚地呈现研究者之间的师承、合作、人才流动与产业连接，并通过社区纠错持续补全信息。

Xuemai Atlas is an evidence-linked academic network for AI, NLP, and LLM researchers. It maps academic lineage, collaboration, career movement, and industry connections, and improves through community-contributed corrections and additions.

---

<a id="中文"></a>

## 中文

### 这个项目是什么？

学术关系很难从单一网页看清：导师与学生可能分布在不同学校，合作者可能跨越多个机构，学生毕业后又会进入高校、研究院、创业公司或互联网企业。学脉 Atlas 将这些分散在学校主页、个人简历、论文、实验室页面和公司资料中的公开信息连接起来，形成可以按人物、机构、关系类型和公司反向查找的图谱。

当前版本覆盖**中国大陆、香港与新加坡的 AI、NLP 与 LLM 学术生态**。中国大陆第二期已扩展到 17 个重点机构：清华、北大、复旦、人大、哈工大、中科院自动化所、南京大学、上海交大、浙江大学、中国科大、北京理工、北航、北邮、西安交大、中山大学、华东师大与武汉大学；香港包括 HKU、HKUST、CUHK、CityU、PolyU 与 HKBU；新加坡包括 NUS、NTU、SUTD、SMU 与 A\*STAR。大陆范围较大，网页会明确标出当前覆盖边界，并持续按机构名录补充。

### 图谱里有什么信息？

- 学者姓名与公开中文名、现任机构、职务、研究方向和实验室
- 资深 PI、发展期独立 PI、相邻 AI 方向与历史节点
- 博士导师、博士后指导或合作、公开论文合作
- 教师与企业研究部门、联合实验室、创业公司的连接
- 已公开核验的学生毕业去向、当前任职和重要职位
- 以公司或部门为中心的反向人才图
- 每条人物信息和关系所对应的公开来源
- 覆盖范围、统计口径以及尚待补充的空白

图谱不会因为两个人在同一机构、参加同一会议或研究方向相近，就自动推断他们存在师承或合作关系。没有可靠来源时，我们宁愿暂时留空。

### 查看在线图谱

访问：[学脉 Atlas 在线网站](https://mizar77.github.io/xuemai-atlas/)

你可以搜索人物与研究方向、按机构和关系类型筛选、点击人物突出直接关系，并从公司反向查看不同教师的学生去向。

### 欢迎纠错、补充和 Comment

这份图谱一定还有遗漏，也可能遇到职位变化、主页更新或关系证据不完整。**欢迎任何了解相关领域的人提交纠正与补充。每一条有来源的反馈，都会让图谱更准确。**

你可以通过三种方式参与：

1. **网站侧边栏**：打开在线图谱，点击页面右侧的“纠错 / 补充”，选择反馈类型，填写涉及对象、具体说明和公开来源链接。提交内容会进入审核队列，不会未经核验直接公开。
2. **GitHub Issue**：在 [Issues](https://github.com/Mizar77/xuemai-atlas/issues/new) 中提出新增人物、关系纠错、职位更新、学生去向或来源补充。
3. **Pull Request**：如果你熟悉代码，可以直接修改 [`app/data.ts`](./app/data.ts) 或相关页面并提交 PR。请在 PR 中说明修改理由并附上来源。

为了便于核验，建议反馈尽量包含：

- 人物的中英文姓名
- 需要新增或修改的具体字段
- 关系双方及关系类型
- 学校主页、个人 CV、博士论文、论文页面、实验室或公司官方页面
- 信息对应的时间，例如“2026 年起任职”

请不要提交私人联系方式、未经公开的就业信息、传闻或仅凭印象判断的关系。

### 数据与审核原则

- 优先使用学校、研究机构、个人主页、CV、论文和公司官方资料
- 师承、合作与职业去向均需有可访问的公开证据
- 区分当前任职、历史节点和跨地区流动
- 对争议信息保持中性描述，并保留来源与时间语境
- 社区提交默认先审核，再进入公开图谱

### 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

验证构建：

```bash
npm run build
npm test
```

项目使用 React、vinext、Cloudflare Workers、D1 与 Drizzle。反馈接口位于 `app/api/feedback`，数据库结构位于 `db/`，迁移文件位于 `drizzle/`。

---

<a id="english"></a>

## English

### What is this repository?

Academic relationships are scattered across faculty pages, CVs, dissertations, papers, lab websites, and company profiles. Xuemai Atlas connects those public records so that academic lineage, collaboration, career movement, and industry links can be explored in one place.

The atlas currently covers the **AI, NLP, and LLM ecosystems in Mainland China, Hong Kong, and Singapore**. The second Mainland China release covers 17 focal institutions: Tsinghua, Peking University, Fudan, Renmin University, Harbin Institute of Technology, CAS Institute of Automation, Nanjing University, Shanghai Jiao Tong University, Zhejiang University, University of Science and Technology of China, Beijing Institute of Technology, Beihang University, Beijing University of Posts and Telecommunications, Xi'an Jiaotong University, Sun Yat-sen University, East China Normal University, and Wuhan University. Hong Kong includes HKU, HKUST, CUHK, CityU, PolyU, and HKBU; Singapore includes NUS, NTU, SUTD, SMU, and A\*STAR. Because Mainland China is much larger, the site labels the current boundary explicitly and continues auditing institution rosters.

### What information does the atlas contain?

- Researchers' names and publicly established Chinese names, affiliations, roles, research areas, and labs
- Senior PIs, emerging independent PIs, adjacent AI areas, and historical nodes
- PhD supervision, postdoctoral mentorship or collaboration, and verified publication links
- Connections to industrial research teams, joint labs, startups, and technology companies
- Publicly verifiable student placements, current roles, and selected senior positions
- A reverse index organized by company or department
- Source links attached to people and relationships
- Coverage notes, inclusion rules, and known gaps

The atlas does not infer a relationship merely because two people share an institution, conference, or research interest. When reliable evidence is unavailable, the edge is left open.

### Explore the live atlas

Visit: [Xuemai Atlas](https://mizar77.github.io/xuemai-atlas/)

You can search by researcher or topic, filter by institution and relationship type, select a person to highlight direct connections, and browse student pipelines from the company side.

### Corrections, additions, and comments are welcome

This atlas is necessarily incomplete, and academic roles and affiliations change over time. **If you know this community, please help us improve the data. A well-sourced correction or missing connection is genuinely valuable.**

There are three ways to contribute:

1. **Website feedback drawer:** open the live atlas and select “纠错 / 补充” on the right side. Choose a feedback type and provide the subject, explanation, and a public source URL. Submissions enter a moderation queue and are not published automatically.
2. **GitHub Issue:** open a [new issue](https://github.com/Mizar77/xuemai-atlas/issues/new) for a missing researcher, incorrect relationship, role change, student placement, or additional source.
3. **Pull Request:** edit [`app/data.ts`](./app/data.ts) or the relevant page and submit a PR. Explain the change and include supporting sources.

Helpful submissions usually include:

- The researcher's English and Chinese names, when applicable
- The exact field or statement to add or correct
- Both endpoints and the type of a proposed relationship
- A university page, CV, dissertation, paper, lab page, or official company profile
- A date or time context for role and affiliation changes

Please do not submit private contact details, non-public employment information, rumors, or relationships inferred only from proximity.

### Data and moderation principles

- Prefer first-party university, institute, researcher, publication, and company sources
- Require accessible public evidence for lineage, collaboration, and career outcomes
- Distinguish current appointments from historical and cross-region nodes
- Describe disputed information neutrally and preserve its source and time context
- Review community submissions before publishing them in the atlas

### Local development

Node.js `>=22.13.0` is required.

```bash
npm install
npm run dev
```

Validate the project with:

```bash
npm run build
npm test
```

The project uses React, vinext, Cloudflare Workers, D1, and Drizzle. The feedback API lives under `app/api/feedback`, the database schema is in `db/`, and migrations are stored in `drizzle/`.

---

## Acknowledgement / 致谢

感谢每一位提供纠错、来源与遗漏线索的贡献者。学术生态持续变化，这个项目也会随着可靠的新证据持续更新。

Thank you to everyone who contributes corrections, sources, and missing links. Academic communities evolve, and this project should evolve with reliable new evidence.
