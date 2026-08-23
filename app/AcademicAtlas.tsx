"use client";

import { useMemo, useState } from "react";
import { communities, coverage, people, relationships, stageLabels, studentPlacements, type Person, type Relationship } from "./data";
import FeedbackDrawer from "./FeedbackDrawer";

type EdgeFilter = "all" | Relationship["type"];
type InstitutionFilter = "All" | Person["institution"];
type FocusFilter = "all" | "core" | "emerging" | "adjacent" | "historical";

const edgeLabels: Record<EdgeFilter, string> = { all: "全部关系", lineage: "师承", collaboration: "合作", industry: "产业", talent: "人才流向" };
const focusLabels: Record<FocusFilter, string> = { all: "全部当前 PI", core: "核心 NLP / LLM", emerging: "发展期独立 PI", adjacent: "AI / 系统相邻", historical: "历史节点" };
const institutionColors: Record<Person["institution"], string> = {
  NUS: "#275ee6", NTU: "#f16f51", SUTD: "#d99f00", SMU: "#8a5bdb", "A*STAR": "#07a383", External: "#8390a5",
};
const relationColors: Record<Relationship["type"], string> = { lineage: "#275ee6", collaboration: "#f16f51", industry: "#07a383", talent: "#8a5bdb" };
const placementKindLabels = { current: "当前任职", first_job: "毕业去向", founder: "创业" } as const;

function RelationChip({ type }: { type: Relationship["type"] }) {
  return <span className={`relation-chip relation-${type}`}>{edgeLabels[type]}</span>;
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

export default function AcademicAtlas() {
  const [edgeFilter, setEdgeFilter] = useState<EdgeFilter>("all");
  const [institution, setInstitution] = useState<InstitutionFilter>("All");
  const [focus, setFocus] = useState<FocusFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("wei-lu");
  const [graphFocusId, setGraphFocusId] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState("Salesforce");
  const [view, setView] = useState<"graph" | "people" | "evidence">("people");

  const selected = people.find((person) => person.id === selectedId) ?? people[0];
  const selectedRelations = relationships.filter((r) => r.from === selected.id || r.to === selected.id);
  const selectedPlacements = studentPlacements.filter((placement) => placement.teacherId === selected.id);

  const companyIndex = useMemo(() => Array.from(new Set(studentPlacements.map((placement) => placement.company))).map((company) => {
    const placements = studentPlacements.filter((placement) => placement.company === company);
    return { company, placements, teachers: new Set(placements.map((placement) => placement.teacherId)).size };
  }).sort((a, b) => b.teachers - a.teachers || b.placements.length - a.placements.length || a.company.localeCompare(b.company)), []);
  const selectedCompanyData = companyIndex.find((entry) => entry.company === selectedCompany) ?? companyIndex[0];
  const companyPipelines = Array.from(new Set(selectedCompanyData.placements.map((placement) => placement.teacherId))).map((teacherId) => ({
    teacher: people.find((person) => person.id === teacherId)!,
    placements: selectedCompanyData.placements.filter((placement) => placement.teacherId === teacherId),
  }));

  const visiblePeople = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return people.filter((person) => {
      const institutionMatch = institution === "All" || person.institution === institution;
      const focusMatch =
        focus === "all" ? person.category !== "historical" || person.institution === "External" :
        focus === "core" ? person.category === "core" :
        focus === "emerging" ? person.stage === "emerging" :
        focus === "adjacent" ? person.category === "adjacent" : person.category === "historical";
      const queryMatch = !needle || [person.name, person.chinese, person.area, person.role, ...person.tags].filter(Boolean).join(" ").toLowerCase().includes(needle);
      return institutionMatch && focusMatch && queryMatch;
    });
  }, [focus, institution, query]);

  const visibleIds = new Set(visiblePeople.map((person) => person.id));
  const visibleRelations = relationships.filter((relation) =>
    (edgeFilter === "all" || relation.type === edgeFilter) && visibleIds.has(relation.from) && visibleIds.has(relation.to)
  );
  const graphFocusedIds = new Set<string>();
  if (graphFocusId) {
    graphFocusedIds.add(graphFocusId);
    visibleRelations.forEach((relation) => {
      if (relation.from === graphFocusId) graphFocusedIds.add(relation.to);
      if (relation.to === graphFocusId) graphFocusedIds.add(relation.from);
    });
  }
  const currentPiCount = people.filter((p) => p.primary && p.category !== "historical").length;
  const coreCount = people.filter((p) => p.primary && p.category === "core").length;
  const sourceCount = new Set(people.flatMap((p) => p.sources.map((s) => s.url)).concat(relationships.map((r) => r.source.url), studentPlacements.map((p) => p.source.url))).size;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="学脉 Atlas 首页"><span className="brand-mark">脉</span><span>学脉 Atlas</span></a>
        <nav aria-label="站内导航"><a href="#atlas">人物图谱</a><a href="#companies">公司反向图</a><a href="#coverage">覆盖审计</a><a href="#communities">研究群落</a><a href="#industry">产业连接</a></nav>
        <span className="status-pill"><i /> Open research atlas</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Roster first · evidence linked · scope explicit</p>
          <h1>梳理学术脉络，<br />连接人才流向。</h1>
          <p className="hero-deck">从机构名录到导师—学生—公司三层关系：呈现核心 PI、发展期独立 PI、相邻方向与历史节点，并把公开职业去向映射到企业和研究部门。</p>
          <div className="hero-actions"><a className="primary-button" href="#atlas">浏览完整名录 <span>↘</span></a><a className="text-button" href="#coverage">查看覆盖边界 <span>→</span></a></div>
        </div>
        <div className="hero-metrics" aria-label="图谱数据概况">
          <div><strong>{coreCount}</strong><span>核心 NLP / LLM PI</span></div>
          <div><strong>5</strong><span>新加坡机构</span></div>
          <div><strong>{currentPiCount}</strong><span>当前 PI（含相邻层）</span></div>
          <div><strong>{studentPlacements.length}</strong><span>已核验学生去向</span></div>
          <p>{sourceCount} 个去重来源 · 更新于 2026.08.23</p>
        </div>
      </section>

      <section className="atlas-section" id="atlas">
        <div className="section-heading">
          <div><p className="section-index">01 / ROSTER + INTERACTIVE ATLAS</p><h2>新加坡 NLP / LLM PI 名录</h2></div>
          <div className="view-switch" role="tablist" aria-label="图谱视图">
            {(["people", "graph", "evidence"] as const).map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{item === "graph" ? "关系图" : item === "people" ? "人物名录" : "证据清单"}</button>)}
          </div>
        </div>

        <div className="atlas-shell">
          <div className="atlas-toolbar">
            <label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索学者、实验室、方向…" /></label>
            <div className="filter-row" aria-label="机构筛选">
              {(["All", "NUS", "NTU", "SUTD", "SMU", "A*STAR"] as InstitutionFilter[]).map((item) => <button key={item} className={institution === item ? "active" : ""} onClick={() => setInstitution(item)}>{item === "All" ? "全部机构" : item}</button>)}
            </div>
            <span className="result-count">{visiblePeople.filter((p) => p.primary).length} 人</span>
          </div>
          <div className="focus-toolbar">
            <span>收录层级</span>
            <div className="filter-row">{(Object.keys(focusLabels) as FocusFilter[]).map((item) => <button key={item} className={focus === item ? "active" : ""} onClick={() => setFocus(item)}>{focusLabels[item]}</button>)}</div>
            {view !== "people" && <div className="filter-row relation-filter">{(Object.keys(edgeLabels) as EdgeFilter[]).map((item) => <button key={item} className={edgeFilter === item ? "active" : ""} onClick={() => setEdgeFilter(item)}>{item !== "all" && <i className={`dot-${item}`} />}{edgeLabels[item]}</button>)}</div>}
          </div>

          <div className="atlas-content">
            {view === "graph" && (
              <div className="graph-scroll">
                <div className="graph-canvas" aria-label="学者关系网络">
                  <div className="graph-instruction"><span>点击人物，聚焦其直接关系</span>{graphFocusId && <button onClick={() => setGraphFocusId(null)}>显示全部</button>}</div>
                  <div className="institution-zone zone-nus"><b>NUS</b><span>7 current PI</span></div>
                  <div className="institution-zone zone-ntu"><b>NTU</b><span>8 current PI</span></div>
                  <div className="institution-zone zone-sutd"><b>SUTD</b><span>1 current PI</span></div>
                  <div className="institution-zone zone-smu"><b>SMU</b><span>2 current + 1 historical</span></div>
                  <div className="institution-zone zone-astar"><b>A*STAR</b><span>3 research PIs</span></div>
                  <svg className="edge-layer" viewBox="0 0 1180 800" aria-hidden="true">
                    {visibleRelations.filter((r) => r.from !== r.to).map((relation) => {
                      const from = people.find((p) => p.id === relation.from)!;
                      const to = people.find((p) => p.id === relation.to)!;
                      const active = graphFocusId !== null && (relation.from === graphFocusId || relation.to === graphFocusId);
                      return <line key={relation.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={active ? relationColors[relation.type] : "#aeb9c5"} strokeWidth={active ? 3 : 1} strokeDasharray={relation.type === "collaboration" ? "7 5" : relation.type === "talent" ? "2 5" : undefined} opacity={active ? .95 : .2}><title>{relation.label}：{relation.evidence}</title></line>;
                    })}
                  </svg>
                  {visiblePeople.map((person) => (
                    <button key={person.id} className={`person-node ${person.primary ? "primary-node" : "external-node"} ${graphFocusId === person.id ? "selected" : ""} ${graphFocusId && !graphFocusedIds.has(person.id) ? "dimmed" : "focus-active"}`} style={{ left: person.x, top: person.y, "--node-color": institutionColors[person.institution] } as React.CSSProperties} onClick={() => { setSelectedId(person.id); setGraphFocusId((current) => current === person.id ? null : person.id); }}>
                      <span className="node-avatar">{initials(person.name)}</span><span className="node-copy"><strong>{person.name}{person.chinese ? ` · ${person.chinese}` : ""}</strong><small>{person.institution} · {person.stage === "emerging" ? "发展期 PI" : person.area.split(" · ")[0]}</small></span>
                    </button>
                  ))}
                  {visibleRelations.filter((r) => r.from === r.to).map((r, index) => {
                    const owner = people.find((p) => p.id === r.from)!;
                    return <button key={r.id} className={`self-relation-badge badge-${r.type} ${graphFocusId && graphFocusId !== owner.id ? "dimmed" : ""}`} style={{ left: owner.x + 28, top: owner.y + 35 + (index % 2) * 15 }} onClick={() => { setSelectedId(owner.id); setGraphFocusId((current) => current === owner.id ? null : owner.id); }}>↗ {r.label}</button>;
                  })}
                  {visiblePeople.length === 0 && <div className="empty-state">没有匹配结果。试试清除筛选条件。</div>}
                </div>
              </div>
            )}

            {view === "people" && (
              <div className="people-directory">
                {(["NUS", "NTU", "SUTD", "SMU", "A*STAR"] as Person["institution"][]).map((inst) => {
                  const group = visiblePeople.filter((p) => p.primary && p.institution === inst);
                  if (!group.length) return null;
                  return <section className="institution-group" key={inst}>
                    <header><span style={{ background: institutionColors[inst] }} /> <h3>{inst}</h3><b>{group.length}</b></header>
                    <div className="people-grid">{group.map((person) => (
                      <button key={person.id} className={`person-card ${selected.id === person.id ? "selected" : ""}`} onClick={() => setSelectedId(person.id)}>
                        <span className="person-monogram" style={{ background: institutionColors[person.institution] }}>{initials(person.name)}</span>
                        <span><small>{stageLabels[person.stage]}</small><strong>{person.name}{person.chinese && <span className="card-chinese"> · {person.chinese}</span>}</strong><em>{person.area}</em></span><b>→</b>
                      </button>
                    ))}</div>
                  </section>;
                })}
                {visiblePeople.filter((p) => p.primary).length === 0 && <div className="directory-empty">没有匹配的当前 PI。</div>}
              </div>
            )}

            {view === "evidence" && (
              <div className="evidence-list">{visibleRelations.map((relation) => {
                const from = people.find((p) => p.id === relation.from)!; const to = people.find((p) => p.id === relation.to)!;
                return <article key={relation.id}><RelationChip type={relation.type} /><div><strong>{from.name}{from.id !== to.id ? ` → ${to.name}` : ""}</strong><p>{relation.evidence}</p></div><a href={relation.source.url} target="_blank" rel="noreferrer">原始来源 ↗</a></article>;
              })}</div>
            )}

            <aside className="inspector">
              <div className="inspector-top"><span className="large-monogram" style={{ background: institutionColors[selected.institution] }}>{initials(selected.name)}</span><span className="verified-badge">✓ SOURCED</span></div>
              <div className="inspector-meta"><p className="institution-label">{selected.institution}</p><span className={`stage-badge stage-${selected.stage}`}>{stageLabels[selected.stage]}</span></div>
              <h3>{selected.name}</h3>{selected.chinese && <p className="chinese-name">{selected.chinese}</p>}<p className="role-label">{selected.role}</p><p className="summary">{selected.summary}</p>
              {selected.status && <p className="status-note">◷ {selected.status}</p>}
              <div className="tag-list">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="inspector-block placement-block"><h4>学生去向 <span>{selectedPlacements.length ? `${selectedPlacements.length} 条已核验` : "待补"}</span></h4>
                {selected.id === "tat-seng-chua" && <p className="placement-context">个人主页列出 37 名博士毕业生；下方是目前已逐条核验的产业/创业去向，不代表完整就业统计。</p>}
                {selectedPlacements.slice(0, 8).map((placement) => <a key={placement.id} className="placement-row" href={placement.source.url} target="_blank" rel="noreferrer"><span className="placement-person"><strong>{placement.student}</strong><small>{placementKindLabels[placement.kind]} · {placement.role}</small></span><span className="placement-destination"><b>{placement.company}</b>{placement.department && <small>{placement.department}</small>}</span>{placement.highLevel && <em>重点职位</em>}</a>)}
                {selectedPlacements.length > 8 && <a className="more-placements" href="#companies">另有 {selectedPlacements.length - 8} 条，在公司反向图中查看 →</a>}
                {selectedPlacements.length === 0 && <p className="quiet">尚未找到可逐条核验的公开学生职业去向；这不表示该导师没有相关学生记录。</p>}
              </div>
              <div className="inspector-block"><h4>关系证据 <span>{selectedRelations.length}</span></h4>
                {selectedRelations.slice(0, 6).map((relation) => <a key={relation.id} className="relation-row" href={relation.source.url} target="_blank" rel="noreferrer"><RelationChip type={relation.type} /><span><strong>{relation.label}</strong><small>{relation.evidence}</small></span><b>↗</b></a>)}
                {selectedRelations.length === 0 && <p className="quiet">暂无已核验关系；不以“共同任职”自动推断合作。</p>}
              </div>
              <div className="inspector-block source-block"><h4>人物来源 <span>{selected.sources.length}</span></h4>{selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}<span>↗</span></a>)}</div>
            </aside>
          </div>
        </div>
      </section>

      <section className="coverage-section" id="coverage">
        <div className="section-heading"><div><p className="section-index">02 / COVERAGE AUDIT</p><h2>覆盖多少，也写清楚。</h2></div><p>“完整”取决于边界。当前核心口径是：新加坡现任、可独立招生或领导研究组，且官方研究描述明确包含 NLP、LLM、语言/语音或多模态语言。</p></div>
        <div className="coverage-table">
          <div className="coverage-head"><span>机构</span><span>核心 NLP / LLM</span><span>相邻层</span><span>本轮覆盖说明</span></div>
          {coverage.map((row) => <div className="coverage-row" key={row.institution}><strong>{row.institution}</strong><span>{row.core}</span><span>{row.adjacent}</span><p>{row.note}</p></div>)}
        </div>
        <div className="scope-notes">
          <article><strong>计入核心</strong><p>NLP、LLM、语言/语音、多模态语言为主要研究主线的现任独立 PI 或研究院 PI。</p></article>
          <article><strong>单列相邻</strong><p>基础模型系统、深度学习理论、多智能体等与 LLM 强相关但不以语言为主轴的 PI。</p></article>
          <article><strong>不强行连边</strong><p>共同机构、共同会议或相似方向不等于师承或合作；没有一手证据就保持为空。</p></article>
        </div>
      </section>

      <section className="communities-section" id="communities">
        <div className="section-heading light-heading"><div><p className="section-index">03 / RESEARCH COMMUNITIES</p><h2>从导师谱系到研究群落。</h2></div><p>群落同时参考师承、实验室、长期合作与组织关系；这里呈现由公开证据支持的研究集群，不对群体作价值判断。</p></div>
        <div className="community-grid">{communities.map((community, index) => <article key={community.name} className={`community-card ${community.color}`}><span className="community-number">0{index + 1}</span><p>{community.kicker}</p><h3>{community.name}</h3><strong>{community.anchor}</strong><span>{community.description}</span><button onClick={() => document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" })}>在名录中查看 ↗</button></article>)}</div>
      </section>

      <section className="company-section" id="companies">
        <div className="section-heading">
          <div><p className="section-index">04 / COMPANY-CENTERED GRAPH</p><h2>从机构观察人才流向。</h2></div>
          <p>选择公司或部门，中心图会显示哪些老师的学生进入该组织、学生姓名与公开职位。重点职位单独标记；“首份去向”与“当前任职”保留原始页面口径。</p>
        </div>
        <div className="company-atlas">
          <aside className="company-index" aria-label="公司与部门索引">
            <header><strong>公司 / 机构</strong><span>{companyIndex.length} 个节点</span></header>
            <div>{companyIndex.map((entry) => <button key={entry.company} className={selectedCompanyData.company === entry.company ? "active" : ""} onClick={() => setSelectedCompany(entry.company)}><span><strong>{entry.company}</strong><small>{entry.teachers} 位导师 · {entry.placements.length} 名学生</small></span><b>→</b></button>)}</div>
          </aside>
          <div className="company-graph" aria-label={`${selectedCompanyData.company} 的导师学生流向图`}>
            <div className="company-hub"><small>COMPANY / DEPARTMENT</small><strong>{selectedCompanyData.company}</strong><span>{selectedCompanyData.placements.length} 名已核验学生</span></div>
            <div className="pipeline-list">{companyPipelines.map(({ teacher, placements }) => <article className="pipeline" key={teacher.id}>
              <button className="pipeline-teacher" onClick={() => { setSelectedId(teacher.id); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }); }}><span style={{ background: institutionColors[teacher.institution] }}>{initials(teacher.name)}</span><div><small>{teacher.institution} · 导师</small><strong>{teacher.name}{teacher.chinese ? ` · ${teacher.chinese}` : ""}</strong></div></button>
              <div className="pipeline-edge"><span>{placements.length} 名学生</span></div>
              <div className="pipeline-students">{placements.map((placement) => <a href={placement.source.url} target="_blank" rel="noreferrer" key={placement.id}><span><strong>{placement.student}</strong><small>{placementKindLabels[placement.kind]} · {placement.role}{placement.department ? ` · ${placement.department}` : ""}</small></span>{placement.highLevel && <em>高管 / 高级职位</em>}</a>)}</div>
            </article>)}</div>
            <p className="company-disclaimer">只展示公开页面可逐条核验的去向；公司节点没有连线，不代表该导师没有学生进入。</p>
          </div>
        </div>
      </section>

      <section className="industry-section" id="industry">
        <div className="section-heading"><div><p className="section-index">05 / INDUSTRY PATHWAYS</p><h2>导师本人的产业连接。</h2></div><p>这里记录 PI 本人的正式/联合任职、前雇主、研究资助、联合实验室、创业与技术部署；学生就业单独放在上面的公司反向图。</p></div>
        <div className="pathways">
          <article><span>01</span><div><small>JOINT / PARALLEL AFFILIATION</small><h3>Shafiq Joty ↔ Salesforce Research</h3><p>NTU 官方公告以 Salesforce Research、NTU 双重身份署名，是最直接的学界—企业研究连接。</p></div><a href="https://www.ntu.edu.sg/computing/news-events/news/detail/the-2024-conference-on-empirical-methods-in-natural-language-processing" target="_blank" rel="noreferrer">证据 ↗</a></article>
          <article><span>02</span><div><small>PRIOR EMPLOYMENT</small><h3>Wenxuan Zhang ↔ Alibaba Singapore</h3><p>SUTD 官方简介记录其此前为 Alibaba Group Singapore 研究科学家，并获 Ali Star。</p></div><a href="https://www.sutd.edu.sg/profile/zhang-wenxuan" target="_blank" rel="noreferrer">证据 ↗</a></article>
          <article><span>03</span><div><small>JOINT LAB + STARTUPS</small><h3>Tat-Seng Chua（蔡达成）↔ Sea / ViSenze / 6Estates</h3><p>公开主页明确列出 Sea–NExT Joint Lab，以及其共同创办的视觉搜索公司 ViSenze Pte Ltd 和大数据智能公司 6Estates Pte Ltd；学生 Guangda Li 任 ViSenze 联合创始人兼 CTO。</p></div><a href="https://www.chuatatseng.com/" target="_blank" rel="noreferrer">证据 ↗</a></article>
          <article><span>04</span><div><small>RESEARCH COLLABORATION</small><h3>Wei Lu ↔ Alibaba</h3><p>其在 SUTD 任职期间的公开报道记录了团队与 Alibaba 在 NLP 方向的合作；Wei Lu 现已转任 NTU。</p></div><a href="https://www.sutd.edu.sg/stories-listing/taking-natural-language-processing-to-greater-heights" target="_blank" rel="noreferrer">证据 ↗</a></article>
          <article><span>05</span><div><small>INDUSTRY RESEARCH CENTRE</small><h3>Jian Su ↔ Baidu–I²R</h3><p>A*STAR 官方页列其为 Baidu I²R Research Centre 联合主任。</p></div><a href="https://research.a-star.edu.sg/researcher/jian-su/" target="_blank" rel="noreferrer">证据 ↗</a></article>
        </div>
      </section>

      <section className="method-section" id="method">
        <div><p className="section-index">06 / EVIDENCE STANDARD</p><h2>从名单到关系，<br />分四层核验。</h2></div>
        <div className="method-copy"><p>图谱以公开证据为基础，持续核验人物、关系与职业信息。</p><ol>
          <li><span>A</span><div><strong>机构 roster</strong><p>先按 NUS、NTU、SUTD、SMU、A*STAR 核对现任人员。</p></div></li>
          <li><span>B</span><div><strong>PI 与方向边界</strong><p>确认是否独立招生/带组，并区分核心语言方向与 AI 相邻层。</p></div></li>
          <li><span>C</span><div><strong>关系类型不混用</strong><p>导师、共同论文、联合项目、任职与人才流向分别建边。</p></div></li>
          <li><span>D</span><div><strong>保留历史状态</strong><p>on leave、跨地区任职和前雇主单独标注，不计作当前核心节点。</p></div></li>
        </ol></div>
      </section>

      <FeedbackDrawer defaultSubject={`${selected.name}${selected.chinese ? `（${selected.chinese}）` : ""}`} />
      <footer><div className="brand"><span className="brand-mark">脉</span><span>学脉 Atlas</span></div><p>新加坡 NLP / LLM 学术关系图谱 · 基于公开来源持续维护</p><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
