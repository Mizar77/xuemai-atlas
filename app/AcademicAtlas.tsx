"use client";

import { useMemo, useState } from "react";
import { communities, coverage, groupMembers, industryPathways, people, regionOf, regionalInstitutions, relationships, stageLabels, studentPlacements, type Person, type Region, type Relationship } from "./data";
import FeedbackDrawer from "./FeedbackDrawer";

type EdgeFilter = "all" | Relationship["type"];
type InstitutionFilter = "All" | Person["institution"];
type FocusFilter = "all" | "core" | "emerging" | "adjacent" | "historical";

const edgeLabels: Record<EdgeFilter, string> = { all: "全部关系", lineage: "师承", collaboration: "合作", industry: "产业", talent: "人才流向" };
const focusLabels: Record<FocusFilter, string> = { all: "全部当前 PI", core: "核心 NLP / LLM", emerging: "发展期独立 PI", adjacent: "AI / 系统相邻", historical: "历史节点" };
const institutionColors: Record<Person["institution"], string> = {
  NUS: "#275ee6", NTU: "#f16f51", SUTD: "#d99f00", SMU: "#8a5bdb", "A*STAR": "#07a383",
  HKU: "#8f1d2c", HKUST: "#007c8a", CUHK: "#6f3aa8", CityU: "#cf4e20", PolyU: "#a32638", HKBU: "#1f6b52", External: "#8390a5",
  THU: "#7b2431", PKU: "#a33a4a", FDU: "#244c8f", RUC: "#76509b", HIT: "#0b668d", "CAS-IA": "#28726f", NJU: "#6653a2", SJTU: "#a52e2e",
  ZJU: "#2f67a3", USTC: "#3d7b66", BIT: "#9b5c2e", BUAA: "#315b8f", BUPT: "#5b4c9a", XJTU: "#9a3e35", SYSU: "#1d746c", ECNU: "#7b4d91", WHU: "#355f9d",
  Stanford: "#8c1515", Berkeley: "#003262", CMU: "#c41230", UW: "#4b2e83", MIT: "#a31f34", Princeton: "#e77500", Cornell: "#b31b1b", NYU: "#57068c", Columbia: "#5b9bd5", UMass: "#881c1c", JHU: "#2c2c77", "UT Austin": "#bf5700",
};
const relationColors: Record<Relationship["type"], string> = { lineage: "#275ee6", collaboration: "#f16f51", industry: "#07a383", talent: "#8a5bdb" };
const placementKindLabels = { current: "当前任职", first_job: "毕业去向", founder: "创业", reported: "组页记录", internship: "产业实习" } as const;
const regionLabels: Record<Region, string> = { Singapore: "新加坡", "Hong Kong": "香港", "Mainland China": "中国大陆", "United States": "美国" };

const graphZones: Record<Region, { institution: string; note: string; className: string }[]> = {
  Singapore: [
    { institution: "NUS", note: "8 current PI", className: "zone-nus" },
    { institution: "NTU", note: "8 current PI", className: "zone-ntu" },
    { institution: "SUTD", note: "1 current PI", className: "zone-sutd" },
    { institution: "SMU", note: "2 current + 1 historical", className: "zone-smu" },
    { institution: "A*STAR", note: "3 research PIs", className: "zone-astar" },
  ],
  "Hong Kong": [
    { institution: "HKU", note: "3 core + 1 adjacent", className: "zone-hku" },
    { institution: "HKUST", note: "5 core + 1 adjacent", className: "zone-hkust" },
    { institution: "CUHK", note: "3 core + 2 adjacent", className: "zone-cuhk" },
    { institution: "CityU", note: "5 core + 3 adjacent", className: "zone-cityu" },
    { institution: "PolyU", note: "5 core + 2 adjacent", className: "zone-polyu" },
    { institution: "HKBU", note: "2 core + 2 adjacent", className: "zone-hkbu" },
  ],
  "Mainland China": [
    { institution: "THU", note: "5 core PI", className: "zone-thu" },
    { institution: "PKU", note: "6 core PI", className: "zone-pku" },
    { institution: "FDU", note: "7 core PI", className: "zone-fdu" },
    { institution: "RUC", note: "6 core PI", className: "zone-ruc" },
    { institution: "HIT", note: "6 core PI", className: "zone-hit" },
    { institution: "CAS-IA", note: "6 core PI", className: "zone-casia" },
    { institution: "NJU", note: "6 core PI", className: "zone-nju" },
    { institution: "SJTU", note: "4 core + 2 adjacent", className: "zone-sjtu" },
    { institution: "ZJU", note: "5 core PI", className: "zone-zju" },
    { institution: "USTC", note: "4 core + 1 adjacent", className: "zone-ustc" },
    { institution: "BIT", note: "5 core PI", className: "zone-bit" },
    { institution: "BUAA", note: "5 core PI", className: "zone-buaa" },
    { institution: "BUPT", note: "3 core + 2 adjacent", className: "zone-bupt" },
    { institution: "XJTU", note: "5 core PI", className: "zone-xjtu" },
    { institution: "SYSU", note: "4 core + 1 adjacent", className: "zone-sysu" },
    { institution: "ECNU", note: "5 core PI", className: "zone-ecnu" },
    { institution: "WHU", note: "5 core PI", className: "zone-whu" },
  ],
  "United States": [
    { institution: "Stanford", note: "7 core + 1 adjacent", className: "zone-stanford" },
    { institution: "Berkeley", note: "5 core + 1 adjacent", className: "zone-berkeley" },
    { institution: "CMU", note: "5 core + 1 adjacent", className: "zone-cmu" },
    { institution: "UW", note: "5 core + 1 adjacent", className: "zone-uw" },
    { institution: "MIT", note: "3 core PI", className: "zone-mit" },
    { institution: "Princeton", note: "2 core PI", className: "zone-princeton" },
    { institution: "Cornell", note: "6 core PI", className: "zone-cornell" },
    { institution: "NYU", note: "4 core PI", className: "zone-nyu" },
    { institution: "Columbia", note: "5 core PI", className: "zone-columbia" },
    { institution: "UMass", note: "4 core PI", className: "zone-umass" },
    { institution: "JHU", note: "3 core + 1 adjacent", className: "zone-jhu" },
    { institution: "UT Austin", note: "2 core + 2 adjacent", className: "zone-utaustin" },
  ],
};

function RelationChip({ type }: { type: Relationship["type"] }) {
  return <span className={`relation-chip relation-${type}`}>{edgeLabels[type]}</span>;
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

function primaryName(person: Person) {
  return regionOf(person) === "Mainland China" && person.chinese ? person.chinese : person.name;
}

function secondaryName(person: Person) {
  return regionOf(person) === "Mainland China" ? undefined : person.chinese;
}

function displayName(person: Person) {
  const secondary = secondaryName(person);
  return `${primaryName(person)}${secondary ? ` · ${secondary}` : ""}`;
}

function evidenceSummary(person: Person) {
  const relationCount = relationships.filter((relation) => relation.from === person.id || relation.to === person.id).length;
  const placementCount = studentPlacements.filter((placement) => placement.teacherId === person.id).length;
  const memberCount = groupMembers.filter((member) => member.teacherId === person.id).length;
  return [
    `来源 ${person.sources.length}`,
    person.facts?.length ? `脉络 ${person.facts.length}` : "",
    relationCount ? `关系 ${relationCount}` : "",
    placementCount ? `去向 ${placementCount}` : "",
    memberCount ? `组员 ${memberCount}` : "",
  ].filter(Boolean).join(" · ");
}

export default function AcademicAtlas() {
  const [region, setRegion] = useState<Region>("Mainland China");
  const [edgeFilter, setEdgeFilter] = useState<EdgeFilter>("all");
  const [institution, setInstitution] = useState<InstitutionFilter>("All");
  const [focus, setFocus] = useState<FocusFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("maosong-sun");
  const [graphFocusId, setGraphFocusId] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState("Huawei");
  const [view, setView] = useState<"graph" | "people" | "evidence">("people");

  const regionPeople = useMemo(() => people.filter((person) => regionOf(person) === region), [region]);
  const regionIds = useMemo(() => new Set(regionPeople.map((person) => person.id)), [regionPeople]);
  const regionalPlacements = useMemo(
    () => studentPlacements.filter((placement) => regionIds.has(placement.teacherId)),
    [regionIds],
  );
  const selected = people.find((person) => person.id === selectedId) ?? regionPeople[0];
  const selectedRelations = relationships.filter((r) => r.from === selected.id || r.to === selected.id);
  const selectedPlacements = studentPlacements.filter((placement) => placement.teacherId === selected.id);
  const selectedGroupMembers = groupMembers.filter((member) => member.teacherId === selected.id);

  const companyIndex = useMemo(() => Array.from(new Set(regionalPlacements.map((placement) => placement.company))).map((company) => {
    const placements = regionalPlacements.filter((placement) => placement.company === company);
    return { company, placements, teachers: new Set(placements.map((placement) => placement.teacherId)).size };
  }).sort((a, b) => b.teachers - a.teachers || b.placements.length - a.placements.length || a.company.localeCompare(b.company)), [regionalPlacements]);
  const selectedCompanyData = companyIndex.find((entry) => entry.company === selectedCompany) ?? companyIndex[0];
  const companyPipelines = Array.from(new Set(selectedCompanyData.placements.map((placement) => placement.teacherId))).map((teacherId) => ({
    teacher: people.find((person) => person.id === teacherId)!,
    placements: selectedCompanyData.placements.filter((placement) => placement.teacherId === teacherId),
  }));

  const visiblePeople = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return regionPeople.filter((person) => {
      const institutionMatch = institution === "All" || person.institution === institution;
      const focusMatch =
        focus === "all" ? person.category !== "historical" || person.institution === "External" :
        focus === "core" ? person.category === "core" :
        focus === "emerging" ? person.stage === "emerging" :
        focus === "adjacent" ? person.category === "adjacent" : person.category === "historical";
      const queryMatch = !needle || [person.name, person.chinese, person.area, person.role, ...person.tags].filter(Boolean).join(" ").toLowerCase().includes(needle);
      return institutionMatch && focusMatch && queryMatch;
    });
  }, [focus, institution, query, regionPeople]);

  const visibleIds = new Set(visiblePeople.map((person) => person.id));
  const visibleRelations = relationships.filter((relation) =>
    (edgeFilter === "all" || relation.type === edgeFilter) && visibleIds.has(relation.from) && visibleIds.has(relation.to)
  );
  const activeGraphFocusId = graphFocusId && visibleIds.has(graphFocusId) ? graphFocusId : null;
  const graphFocusedIds = new Set<string>();
  if (activeGraphFocusId) {
    graphFocusedIds.add(activeGraphFocusId);
    visibleRelations.forEach((relation) => {
      if (relation.from === activeGraphFocusId) graphFocusedIds.add(relation.to);
      if (relation.to === activeGraphFocusId) graphFocusedIds.add(relation.from);
    });
  }
  const coreCount = regionPeople.filter((p) => p.primary && p.category === "core").length;
  const regionalCoverage = coverage.filter((row) => row.region === region);
  const regionalCommunities = communities.filter((community) => community.region === region);
  const regionalPathways = industryPathways.filter((pathway) => pathway.region === region);
  const graphHeight = region === "Mainland China" ? 2640 : region === "United States" ? 1810 : 910;

  function changeRegion(nextRegion: Region) {
    setRegion(nextRegion);
    setInstitution("All");
    setQuery("");
    setGraphFocusId(null);
    setSelectedId(nextRegion === "Hong Kong" ? "lingpeng-kong" : nextRegion === "Singapore" ? "wei-lu" : nextRegion === "United States" ? "christopher-manning-us" : "maosong-sun");
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="学脉 Atlas 首页"><span className="brand-mark">脉</span><span>学脉 Atlas</span></a>
        <nav aria-label="站内导航"><a href="#atlas">人物图谱</a><a href="#companies">公司反向图</a><a href="#coverage">覆盖审计</a><a href="#communities">研究群落</a><a href="#industry">产业连接</a></nav>
        <span className="status-pill"><i /> Open research atlas</span>
      </header>

      <section className="hero" id="top">
        <picture className="hero-visual">
          <source media="(max-width: 760px)" srcSet="atlas-hero-portrait.png" />
          <img src="atlas-hero-natural.png" alt="学脉 Atlas：连接中国大陆、香港、新加坡与美国的 AI、NLP、LLM 学术关系图谱" />
        </picture>
        <div className="sr-only">
          <h1>梳理学术脉络，连接人才流向。</h1>
          <p>从机构名录到导师、学生和公司的三层关系，呈现师承、合作、产业连接与公开职业去向。</p>
        </div>
        <div className="hero-utility">
          <div className="region-switch" role="tablist" aria-label="地区切换">
            {(["Mainland China", "Hong Kong", "Singapore", "United States"] as Region[]).map((item) => <button key={item} className={region === item ? "active" : ""} onClick={() => changeRegion(item)}>{regionLabels[item]}<small>{item}</small></button>)}
          </div>
          <div className="hero-summary" aria-live="polite">
            <div><strong>{coreCount}</strong><span>核心 PI</span></div>
            <div><strong>{regionalInstitutions[region].length}</strong><span>{regionLabels[region]}机构</span></div>
            <div><strong>{regionalPlacements.length}</strong><span>学生去向</span></div>
          </div>
          <div className="hero-actions"><a className="primary-button" href="#atlas">浏览完整名录 <span>↘</span></a><a className="text-button" href="#coverage">查看覆盖边界 <span>→</span></a></div>
        </div>
      </section>

      <section className="atlas-section" id="atlas">
        <div className="section-heading">
          <div><p className="section-index">01 / ROSTER + INTERACTIVE ATLAS</p><h2>{regionLabels[region]} NLP / LLM / AI PI 名录</h2></div>
          <div className="view-switch" role="tablist" aria-label="图谱视图">
            {(["people", "graph", "evidence"] as const).map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{item === "graph" ? "关系图" : item === "people" ? "人物名录" : "证据清单"}</button>)}
          </div>
        </div>

        <div className="atlas-shell">
          <div className="atlas-toolbar">
            <label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索学者、实验室、方向…" /></label>
            <div className="filter-row" aria-label="机构筛选">
              {(["All", ...regionalInstitutions[region]] as InstitutionFilter[]).map((item) => <button key={item} className={institution === item ? "active" : ""} onClick={() => setInstitution(item)}>{item === "All" ? "全部机构" : item}</button>)}
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
                <div className="graph-canvas" style={{ height: graphHeight }} aria-label="学者关系网络">
                  <button className="graph-reset-surface" aria-label="显示全部人物关系" onClick={() => setGraphFocusId(null)} />
                  <div className="graph-instruction"><span>点击人物聚焦关系 · 点击空白恢复全图</span>{activeGraphFocusId && <button onClick={() => setGraphFocusId(null)}>显示全部</button>}</div>
                  {graphZones[region].map((zone) => <div className={`institution-zone ${zone.className}`} key={zone.institution}><b>{zone.institution}</b><span>{zone.note}</span></div>)}
                  <svg className="edge-layer" viewBox={`0 0 1180 ${graphHeight}`} aria-hidden="true">
                    {visibleRelations.filter((r) => r.from !== r.to).map((relation) => {
                      const from = people.find((p) => p.id === relation.from)!;
                      const to = people.find((p) => p.id === relation.to)!;
                      const active = activeGraphFocusId !== null && (relation.from === activeGraphFocusId || relation.to === activeGraphFocusId);
                      return <line key={relation.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={active ? relationColors[relation.type] : "#8290a0"} strokeWidth={active ? 3 : 1.25} strokeDasharray={relation.type === "collaboration" ? "7 5" : relation.type === "talent" ? "2 5" : undefined} opacity={active ? .95 : .42}><title>{relation.label}：{relation.evidence}</title></line>;
                    })}
                  </svg>
                  {visiblePeople.map((person) => (
                    <button key={person.id} className={`person-node ${person.primary ? "primary-node" : "external-node"} ${activeGraphFocusId === person.id ? "selected" : ""} ${activeGraphFocusId && !graphFocusedIds.has(person.id) ? "dimmed" : "focus-active"}`} style={{ left: person.x, top: person.y, "--node-color": institutionColors[person.institution] } as React.CSSProperties} onClick={(event) => { event.stopPropagation(); setSelectedId(person.id); setGraphFocusId((current) => current === person.id ? null : person.id); }}>
                      <span className="node-avatar">{initials(primaryName(person))}</span><span className="node-copy"><strong>{displayName(person)}</strong><small>{person.institution} · {person.stage === "emerging" ? "发展期 PI" : person.area.split(" · ")[0]}</small></span>
                    </button>
                  ))}
                  {visibleRelations.filter((r) => r.from === r.to).map((r, index) => {
                    const owner = people.find((p) => p.id === r.from)!;
                    return <button key={r.id} className={`self-relation-badge badge-${r.type} ${activeGraphFocusId && activeGraphFocusId !== owner.id ? "dimmed" : ""}`} style={{ left: owner.x + 62, top: owner.y + 22 + (index % 2) * 13 }} onClick={(event) => { event.stopPropagation(); setSelectedId(owner.id); setGraphFocusId((current) => current === owner.id ? null : owner.id); }}>↗ {r.label}</button>;
                  })}
                  {visiblePeople.length === 0 && <div className="empty-state">没有匹配结果。试试清除筛选条件。</div>}
                </div>
              </div>
            )}

            {view === "people" && (
              <div className="people-directory">
                {regionalInstitutions[region].map((inst) => {
                  const group = visiblePeople.filter((p) => p.primary && p.institution === inst);
                  if (!group.length) return null;
                  return <section className="institution-group" key={inst}>
                    <header><span style={{ background: institutionColors[inst] }} /> <h3>{inst}</h3><b>{group.length}</b></header>
                    <div className="people-grid">{group.map((person) => (
                      <button key={person.id} className={`person-card ${selected.id === person.id ? "selected" : ""}`} onClick={() => setSelectedId(person.id)}>
                        <span className="person-monogram" style={{ background: institutionColors[person.institution] }}>{initials(primaryName(person))}</span>
                        <span><small>{stageLabels[person.stage]}</small><strong>{primaryName(person)}{secondaryName(person) && <span className="card-chinese"> · {secondaryName(person)}</span>}</strong><em>{person.area}</em><span className="card-evidence">{evidenceSummary(person)}</span></span><b>→</b>
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
                return <article key={relation.id}><RelationChip type={relation.type} /><div><strong>{primaryName(from)}{from.id !== to.id ? ` → ${primaryName(to)}` : ""}</strong><p>{relation.evidence}</p></div><a href={relation.source.url} target="_blank" rel="noreferrer">原始来源 ↗</a></article>;
              })}</div>
            )}

            <aside className="inspector">
              <div className="inspector-top"><span className="large-monogram" style={{ background: institutionColors[selected.institution] }}>{initials(primaryName(selected))}</span><span className="verified-badge">✓ SOURCED</span></div>
              <div className="inspector-meta"><p className="institution-label">{selected.institution}</p><span className={`stage-badge stage-${selected.stage}`}>{stageLabels[selected.stage]}</span></div>
              <h3>{primaryName(selected)}</h3>{secondaryName(selected) && <p className="chinese-name">{secondaryName(selected)}</p>}<p className="role-label">{selected.role}</p><p className="summary">{selected.summary}</p>
              {selected.status && <p className="status-note">◷ {selected.status}</p>}
              <div className="tag-list">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {selected.facts?.length ? <div className="inspector-block fact-block"><h4>人物脉络 <span>{selected.facts.length} 项</span></h4>
                {selected.facts.map((fact) => {
                  const content = <><small>{fact.label}</small><strong>{fact.value}</strong>{fact.source && <b>↗</b>}</>;
                  return fact.source ? <a key={`${fact.label}-${fact.value}`} href={fact.source.url} target="_blank" rel="noreferrer">{content}</a> : <div key={`${fact.label}-${fact.value}`}>{content}</div>;
                })}
              </div> : null}
              {selectedGroupMembers.length ? <div className="inspector-block group-block"><h4>当前研究组 <span>{selectedGroupMembers.length} 位公开成员</span></h4>
                <p className="placement-context">这里列在读学生与研究人员，不计入毕业就业去向。</p>
                {selectedGroupMembers.map((member) => <a key={member.id} href={member.source.url} target="_blank" rel="noreferrer"><span><strong>{member.name}</strong><small>{member.role}{member.focus ? ` · ${member.focus}` : ""}</small></span><b>↗</b></a>)}
              </div> : null}
              <div className="inspector-block placement-block"><h4>学生去向 <span>{selectedPlacements.length ? `${selectedPlacements.length} 条已核验` : "待补"}</span></h4>
                {selected.id === "tat-seng-chua" && <p className="placement-context">个人主页列出 37 名博士毕业生；下方是目前已逐条核验的产业/创业去向，不代表完整就业统计。</p>}
                {selectedPlacements.slice(0, 8).map((placement) => <a key={placement.id} className="placement-row" href={placement.source.url} target="_blank" rel="noreferrer"><span className="placement-person"><strong>{placement.student}</strong><small>{placementKindLabels[placement.kind]} · {placement.role}</small>{placement.note && <small className="placement-note">口径：{placement.note}</small>}</span><span className="placement-destination"><b>{placement.company}</b>{placement.department && <small>{placement.department}</small>}</span>{placement.highLevel && <em>重点职位</em>}</a>)}
                {selectedPlacements.length > 8 && <a className="more-placements" href="#companies">另有 {selectedPlacements.length - 8} 条，在公司反向图中查看 →</a>}
                {selectedPlacements.length === 0 && <p className="quiet">尚未找到可逐条核验的公开学生职业去向；这不表示该导师没有相关学生记录。</p>}
              </div>
              <div className="inspector-block"><h4>关系证据 <span>{selectedRelations.length}</span></h4>
                {selectedRelations.slice(0, 10).map((relation) => <a key={relation.id} className="relation-row" href={relation.source.url} target="_blank" rel="noreferrer"><RelationChip type={relation.type} /><span><strong>{relation.label}</strong><small>{relation.evidence}</small></span><b>↗</b></a>)}
                {selectedRelations.length === 0 && <p className="quiet">暂无已核验关系；不以“共同任职”自动推断合作。</p>}
              </div>
              <div className="inspector-block source-block"><h4>人物来源 <span>{selected.sources.length}</span></h4>{selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}<span>↗</span></a>)}</div>
            </aside>
          </div>
        </div>
      </section>

      <section className="coverage-section" id="coverage">
        <div className="section-heading"><div><p className="section-index">02 / COVERAGE AUDIT</p><h2>覆盖多少，也写清楚。</h2></div><p>“完整”取决于边界。当前核心口径是：{regionLabels[region]}现任、可独立招生或领导研究组，且官方研究描述明确包含 NLP、LLM、语言/语音或多模态语言。{region === "Mainland China" && " 大陆第二期已扩展到 17 个重点机构、覆盖多区域与新晋 PI；仍不表述为全国穷尽名录。"}</p></div>
        <div className="coverage-table">
          <div className="coverage-head"><span>机构</span><span>核心 NLP / LLM</span><span>相邻层</span><span>本轮覆盖说明</span></div>
          {regionalCoverage.map((row) => <div className="coverage-row" key={row.institution}><strong>{row.institution}</strong><span>{row.core}</span><span>{row.adjacent}</span><p>{row.note}</p></div>)}
        </div>
        <div className="scope-notes">
          <article><strong>计入核心</strong><p>NLP、LLM、语言/语音、多模态语言为主要研究主线的现任独立 PI 或研究院 PI。</p></article>
          <article><strong>单列相邻</strong><p>基础模型系统、深度学习理论、多智能体等与 LLM 强相关但不以语言为主轴的 PI。</p></article>
          <article><strong>不强行连边</strong><p>共同机构、共同会议或相似方向不等于师承或合作；没有一手证据就保持为空。</p></article>
        </div>
      </section>

      <section className="communities-section" id="communities">
        <div className="section-heading light-heading"><div><p className="section-index">03 / RESEARCH COMMUNITIES</p><h2>从导师谱系到研究群落。</h2></div><p>群落同时参考师承、实验室、长期合作与组织关系；这里呈现由公开证据支持的研究集群，不对群体作价值判断。</p></div>
        <div className="community-grid">{regionalCommunities.map((community, index) => <article key={community.name} className={`community-card ${community.color}`}><span className="community-number">0{index + 1}</span><p>{community.kicker}</p><h3>{community.name}</h3><strong>{community.anchor}</strong><span>{community.description}</span><button onClick={() => document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" })}>在名录中查看 ↗</button></article>)}</div>
      </section>

      <section className="company-section" id="companies">
        <div className="section-heading">
          <div><p className="section-index">04 / COMPANY-CENTERED GRAPH</p><h2>从机构观察人才流向。</h2></div>
          <p>选择公司或部门，中心图会显示{regionLabels[region]}哪些老师的学生进入该组织、学生姓名与公开职位。重点职位单独标记；“毕业去向”“当前任职”与“组页记录”保留原始页面口径。</p>
        </div>
        <div className="company-atlas">
          <aside className="company-index" aria-label="公司与部门索引">
            <header><strong>公司 / 机构</strong><span>{companyIndex.length} 个节点</span></header>
            <div>{companyIndex.map((entry) => <button key={entry.company} className={selectedCompanyData.company === entry.company ? "active" : ""} onClick={() => setSelectedCompany(entry.company)}><span><strong>{entry.company}</strong><small>{entry.teachers} 位导师 · {entry.placements.length} 名学生</small></span><b>→</b></button>)}</div>
          </aside>
          <div className="company-graph" aria-label={`${selectedCompanyData.company} 的导师学生流向图`}>
            <div className="company-hub"><small>COMPANY / DEPARTMENT</small><strong>{selectedCompanyData.company}</strong><span>{selectedCompanyData.placements.length} 名已核验学生</span></div>
            <div className="pipeline-list">{companyPipelines.map(({ teacher, placements }) => <article className="pipeline" key={teacher.id}>
              <button className="pipeline-teacher" onClick={() => { setSelectedId(teacher.id); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }); }}><span style={{ background: institutionColors[teacher.institution] }}>{initials(primaryName(teacher))}</span><div><small>{teacher.institution} · 导师</small><strong>{displayName(teacher)}</strong></div></button>
              <div className="pipeline-edge"><span>{placements.length} 名学生</span></div>
              <div className="pipeline-students">{placements.map((placement) => <a href={placement.source.url} target="_blank" rel="noreferrer" key={placement.id}><span><strong>{placement.student}</strong><small>{placementKindLabels[placement.kind]} · {placement.role}{placement.department ? ` · ${placement.department}` : ""}</small>{placement.note && <small className="placement-note">口径：{placement.note}</small>}</span>{placement.highLevel && <em>高管 / 高级职位</em>}</a>)}</div>
            </article>)}</div>
            <p className="company-disclaimer">只展示公开页面可逐条核验的去向；公司节点没有连线，不代表该导师没有学生进入。</p>
          </div>
        </div>
      </section>

      <section className="industry-section" id="industry">
        <div className="section-heading"><div><p className="section-index">05 / INDUSTRY PATHWAYS</p><h2>导师本人的产业连接。</h2></div><p>这里记录 PI 本人的正式/联合任职、前雇主、研究资助、联合实验室、创业与技术部署；学生就业单独放在上面的公司反向图。</p></div>
        <div className="pathways">
          {regionalPathways.map((pathway, index) => <article key={pathway.id}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{pathway.kind}</small><h3>{pathway.title}</h3><p>{pathway.description}</p></div><a href={pathway.source.url} target="_blank" rel="noreferrer">证据 ↗</a></article>)}
        </div>
      </section>

      <section className="method-section" id="method">
        <div><p className="section-index">06 / EVIDENCE STANDARD</p><h2>从名单到关系，<br />分四层核验。</h2></div>
        <div className="method-copy"><p>图谱以公开证据为基础，持续核验人物、关系与职业信息。</p><ol>
          <li><span>A</span><div><strong>机构 roster</strong><p>先按 {regionalInstitutions[region].join("、")} 核对现任人员。</p></div></li>
          <li><span>B</span><div><strong>PI 与方向边界</strong><p>确认是否独立招生/带组，并区分核心语言方向与 AI 相邻层。</p></div></li>
          <li><span>C</span><div><strong>关系类型不混用</strong><p>导师、共同论文、联合项目、任职与人才流向分别建边。</p></div></li>
          <li><span>D</span><div><strong>保留历史状态</strong><p>on leave、跨地区任职和前雇主单独标注，不计作当前核心节点。</p></div></li>
        </ol></div>
      </section>

      <FeedbackDrawer defaultSubject={displayName(selected)} />
      <footer><div className="brand"><span className="brand-mark">脉</span><span>学脉 Atlas</span></div><p>{regionLabels[region]} NLP / LLM / AI 学术关系图谱 · 基于公开来源持续维护</p><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
