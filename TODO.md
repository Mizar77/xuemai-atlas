# 学脉 Atlas 路线图 / Xuemai Atlas Roadmap

[中文](#中文) · [English](#english)

本路线图来自 AP / PI、PhD 学生、Master 学生、本科入门者、产业研究者与公共数据使用者等不同角色的使用评审。优先级综合考虑用户价值、数据可信度、实现依赖与维护成本。

This roadmap consolidates user reviews from APs/PIs, PhD students, Master's students, undergraduate newcomers, industry researchers, and public-data users. Priorities reflect user value, data trust, implementation dependencies, and maintenance cost.

---

<a id="中文"></a>

## 中文

### P0 — 可信、可找、可分享

#### 搜索与导航

- [x] 将搜索扩展为跨地区全局搜索，不再只搜索当前地区。
- [x] 搜索人物中英文名、机构、实验室、研究主题、当前组员、学生、公司、部门、职位与关系证据。
- [x] 支持组合筛选，例如“RAG + 新加坡 + 招收 RA”或“Google + 博士毕业 + Berkeley”。
- [x] 为人物生成稳定链接，并将地区、视图、筛选和选中人物写入 URL（采用兼容 GitHub Pages 的查询参数深链）。
- [x] 增加入门任务入口：了解研究方向、寻找导师/RA、申请 PhD、寻找实习、进入某家公司。
- [x] 为 PI、师承、共同指导、相邻节点、人才流向等术语提供简短说明。

验收标准：任意人物及其聚焦关系均可通过 URL 直接打开和分享；搜索结果可跨地区命中人物、学生和公司。

#### 来源、时间与覆盖度

- [ ] 为人物、关系、招生状态和学生去向增加 `lastVerifiedAt` / `asOf`。
- [ ] 从“人物有来源”升级为字段级来源；明确来源支持的是哪一条陈述。
- [x] 区分官方来源、本人提交、论文/CV 与第三方公开资料。
- [ ] 显示资料完整度，并区分“暂无公开记录”“尚未核验”和“确认不存在”。
- [ ] 对职位、机构、招生状态和当前任职等易变化字段显示最近核验日期。

验收标准：用户能够判断一条信息来自哪里、对应什么时间，以及数据缺失是否只是尚未收录。

#### 关系语义

- [x] 细分博士导师、共同导师、博士后导师、长期研究合作、单篇论文合作、共同项目、联合实验室和产业合作。
- [x] 为关系增加起止年份、最近合作年份、相关论文/项目及证据链接；缺失字段明确显示“待补”。
- [ ] 使用公开可解释的指标描述合作规模，例如共同论文数量；不生成主观关系强度分数。
- [x] 在图例和详情中解释每种边的含义。

验收标准：一次共同署名不会与长期共同指导显示为同一种关系；每条边都能打开对应证据。

#### 学生去向

- [ ] 增加学位类型、毕业年份、第一份工作、当前任职、公司部门、职位和共同导师字段。
- [x] 显示“已知毕业生数 / 已核验公开去向数”的覆盖口径；分母未知时明确说明。
- [x] 区分学术界、工业界、创业、博后和其他去向。
- [x] 公司反向图支持去向口径、部门、年份与学位筛选；现有第一份工作/当前任职由去向口径区分。
- [x] 在所有统计旁声明：公开记录数量不代表导师培养能力或因果性的就业优势。

验收标准：去向记录具有时间和来源，且任何汇总数字都同时显示样本覆盖度。

#### 移动端

- [x] 移动端默认提供清晰的人物名录，而不是简单缩小桌面大画布。
- [x] 移动端关系图提供一跳 ego graph；桌面图保留平移浏览和一键复位。
- [ ] 人物详情改为适合手机的 bottom sheet，并保留返回前的筛选与滚动位置。
- [x] 检查键盘操作、触摸目标、颜色对比度和屏幕阅读器标签。

验收标准：在常见手机宽度下，人物姓名无需放大即可阅读，且可完成搜索、选人、查看关系与返回四个核心任务。

#### 纠错闭环与数据质量

- [x] 允许贡献者使用反馈编号查询 `待审核 / 核验中 / 已采纳 / 未采纳` 状态。
- [ ] 提供可选的状态变更邮件通知。
- [x] 增加 GitHub Issue 模板：新增人物、关系纠错、职位更新、学生去向和来源补充。
- [x] 发布数据更新日志；反馈采纳历史仍需后续接入审核工作台。
- [x] 增加自动校验：重复 ID、悬空关系、来源 URL 格式与人物来源完整性；在线失效链接巡检仍待补。
- [x] 将页面统计改为从数据自动计算，避免测试依赖手写人数。

验收标准：每次数据修改都通过结构校验；网站提交者能够查询处理结果。

### P1 — 比较、行动与社区维护

#### PI 对比与收藏

- [ ] 支持同时比较 2–4 位 PI。
- [ ] 比较研究主题、代表成果、组员结构、招生状态、学生去向、产业连接、覆盖度和更新时间。
- [ ] 支持收藏、私人备注和申请/合作/实习分类。
- [ ] 支持将候选名单导出为 Markdown 或 CSV，并生成可分享链接。

#### 研究画像

- [ ] 将研究画像拆分为研究对象与研究方法两个维度。
- [ ] 研究对象覆盖 RAG、Agent、Multimodal、Alignment、Safety、Reasoning 等可扩展标签。
- [ ] 研究方法覆盖训练、评测、系统、理论、数据和应用。
- [ ] 增加近三年研究主题、代表论文、经典工作、项目和开源代码。
- [ ] 在公开资料允许时，展示当前组员各自的研究主题。

#### 招生与机会

- [ ] 增加 PhD、Master、RA、Postdoc 和访问学生机会。
- [ ] 显示适用学位、技能要求、开始时间、截止日期、官方申请链接与核验日期。
- [ ] 只收录官方页面或实验室主动提交的信息，不根据历史招生情况推断当前机会。
- [ ] 允许实验室或 PI 认领页面、更新简介与招生状态，并保留审核记录。

#### 跨地区与产业探索

- [ ] 提供跨地区、多跳师承和合作路径搜索。
- [ ] 支持按研究主题查看跨校研究群落，而不只按地理区域浏览。
- [ ] 将公司反向图扩展为“公司 → 部门 → 学生 → 导师”。
- [ ] 允许从公司结果将相关导师加入收藏或对比。
- [ ] 提供带版本号的 CSV / JSON 数据快照和字段说明。

### P2 — 时间演化与高级能力

- [x] 增加人物任职、合作关系、研究主题和人才流动的时间轴。
- [ ] 提供按年份查看学术群落变化的历史快照。
- [ ] 提供可解释的研究兴趣匹配；展示匹配字段，不生成黑箱综合排名。
- [ ] 支持订阅人物招生、任职和学生去向更新。
- [ ] 在数据量和覆盖度足够时提供共著、跨机构流动与主题演化分析。
- [ ] 评估公开只读 API，支持研究和公共数据使用。

### 持续任务

- [ ] 继续补充中国大陆、香港、新加坡和美国的机构、独立 PI、组员、学生去向与产业联系。
- [ ] 建立地区覆盖审计清单，并定期与机构官方名录核对。
- [ ] 为高频变化字段设置复核周期。
- [ ] 持续修复无效来源，并优先使用第一方资料。
- [ ] 维护中英文名称、机构别名和研究主题词表。
- [ ] 为重大数据结构和收录规则变化记录决策说明。

### 明确不做

- 不制作导师声誉、实验室好坏或“就业能力”排名。
- 不发布未经核验的实验室传闻、私人联系方式或非公开就业信息。
- 不因同校、同会、方向相近或一次同场活动自动推断师承与合作。
- 不把缺少公开资料解释为没有学生、合作或产业联系。
- 不以学生去向相关性推断导师造成了某种职业结果。
- 不提供无法解释依据的推荐分数或关系强度分数。

---

<a id="english"></a>

## English

### P0 — Trustworthy, discoverable, and shareable

- [x] Add cross-region global search across people, aliases, institutions, labs, topics, group members, students, companies, departments, roles, and relationship evidence.
- [x] Support compound filters and goal-based entry points for learning a field, finding an adviser/RA, applying for a PhD, finding an internship, or exploring a company.
- [x] Create stable, GitHub Pages-compatible person links and persist region, view, filters, and selected nodes in the URL.
- [ ] Add field-level sources, `lastVerifiedAt` / `asOf`, source type, completeness, and explicit missing-data states.
- [x] Distinguish PhD adviser, co-adviser, postdoc mentor, sustained collaboration, single-paper co-authorship, joint project, joint lab, and industry collaboration.
- [x] Add dates and evidence objects to relationships without introducing subjective strength scores; missing values remain visibly incomplete.
- [ ] Add degree, graduation year, first job, current role, department, co-adviser, source, and coverage denominator to placement records.
- [x] Add company-side filters for department, placement kind, year, degree, and first-versus-current employment.
- [x] Distinguish academic, industry, entrepreneurship, postdoc, and other career destinations.
- [x] Replace the scaled desktop graph on mobile with a readable roster and one-hop ego graph; complete core accessibility checks.
- [ ] Add feedback-status lookup, optional notifications, structured GitHub Issue templates, a changelog, and automated data-integrity checks. Status lookup, templates, changelog, and validation are shipped; optional notifications remain.

P0 is complete when a user can find and share any person, understand exactly what each edge means, verify the time and source of material claims, and interpret placement counts with their coverage denominator.

### P1 — Comparison, action, and community maintenance

- [ ] Add side-by-side comparison for 2–4 PIs.
- [ ] Add shortlists, private notes, categories, Markdown/CSV export, and shareable lists.
- [ ] Separate research objects from research methods and add recent topics, representative papers, projects, and code.
- [ ] Add official, time-stamped PhD, Master's, RA, postdoc, and visiting opportunities with requirements and application links.
- [ ] Add moderated profile claiming for labs and PIs.
- [ ] Add cross-region, multi-hop lineage and collaboration path search.
- [ ] Expand the reverse industry view to company → department → student → adviser.
- [ ] Publish versioned CSV/JSON snapshots with schema documentation.

### P2 — Temporal and advanced exploration

- [x] Add evidence-linked person timelines for appointments, relationships, topics, and talent movement.
- [ ] Add historical year-by-year snapshots of institutions and research communities.
- [ ] Add explainable research-interest matching without black-box rankings.
- [ ] Add subscriptions for recruitment, appointment, and placement updates.
- [ ] Add co-authorship, institutional mobility, and topic-evolution analysis once coverage is sufficient.
- [ ] Evaluate a public read-only API for research and public-data use.

### Ongoing work

- [ ] Continue expanding institution, PI, group-member, placement, and industry coverage in Mainland China, Hong Kong, Singapore, and the United States.
- [ ] Audit each region against official institutional rosters and define review intervals for volatile fields.
- [ ] Repair stale sources, prefer first-party evidence, and maintain bilingual aliases and topic vocabularies.
- [ ] Document material changes to the data model and inclusion rules.

### Explicit non-goals

- Do not rank adviser reputation, lab quality, or employment outcomes.
- Do not publish rumors, private contact details, or non-public employment information.
- Do not infer relationships from proximity, shared venues, or research similarity alone.
- Do not interpret missing public data as evidence that a relationship or outcome does not exist.
- Do not claim that an adviser caused a student's career outcome.
- Do not provide recommendation or relationship scores whose rationale cannot be inspected.

## Contributing / 参与路线图

When opening an Issue or Pull Request for a roadmap item, please link the relevant checklist entry, state the user persona it serves, and define a verifiable acceptance criterion. Data changes should include public sources and their applicable dates.

提交路线图相关 Issue 或 Pull Request 时，请链接对应待办，说明服务的用户角色，并给出可验证的验收标准。涉及数据的修改应同时提供公开来源及其适用时间。
