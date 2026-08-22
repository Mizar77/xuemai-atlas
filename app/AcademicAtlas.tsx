"use client";

import { useMemo, useState } from "react";
import { communities, people, relationships, type Person, type Relationship } from "./data";

type EdgeFilter = "all" | Relationship["type"];
type InstitutionFilter = "All" | Person["institution"];

const edgeLabels: Record<EdgeFilter, string> = {
  all: "全部关系",
  lineage: "师承",
  collaboration: "合作",
  industry: "产业",
  talent: "人才流向",
};

const institutionColors: Record<Person["institution"], string> = {
  NUS: "#275ee6",
  NTU: "#f16f51",
  SMU: "#8a5bdb",
  "A*STAR": "#07a383",
  External: "#8390a5",
};

const lineGeometry: Record<string, { left: number; top: number; width: number; rotate: number }> = {
  "mooney-ng": { left: 96, top: 90, width: 155, rotate: 58 },
  "mckeown-kan": { left: 392, top: 73, width: 108, rotate: 82 },
  "demmel-you": { left: 143, top: 376, width: 112, rotate: 11 },
  "lesser-an": { left: 774, top: 421, width: 96, rotate: -63 },
  "ng-kan": { left: 255, top: 171, width: 163, rotate: -13 },
};

function RelationChip({ type }: { type: Relationship["type"] }) {
  return <span className={`relation-chip relation-${type}`}>{edgeLabels[type]}</span>;
}

export default function AcademicAtlas() {
  const [edgeFilter, setEdgeFilter] = useState<EdgeFilter>("all");
  const [institution, setInstitution] = useState<InstitutionFilter>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("min-yen-kan");
  const [view, setView] = useState<"graph" | "people" | "evidence">("graph");

  const selected = people.find((person) => person.id === selectedId) ?? people[0];
  const selectedRelations = relationships.filter((r) => r.from === selected.id || r.to === selected.id);

  const visiblePeople = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return people.filter((person) => {
      const institutionMatch = institution === "All" || person.institution === institution;
      const queryMatch = !needle || [person.name, person.chinese, person.area, ...person.tags].filter(Boolean).join(" ").toLowerCase().includes(needle);
      return institutionMatch && queryMatch;
    });
  }, [institution, query]);

  const visibleIds = new Set(visiblePeople.map((person) => person.id));
  const visibleRelations = relationships.filter((relation) =>
    (edgeFilter === "all" || relation.type === edgeFilter) &&
    visibleIds.has(relation.from) && visibleIds.has(relation.to)
  );

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="学脉 Atlas 首页">
          <span className="brand-mark">脉</span>
          <span>学脉 Atlas</span>
        </a>
        <nav aria-label="站内导航">
          <a href="#atlas">图谱</a>
          <a href="#communities">研究群落</a>
          <a href="#industry">产业连接</a>
          <a href="#method">方法</a>
        </nav>
        <span className="pilot-pill"><i /> Singapore pilot · v0.1</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Academic lineage × collaboration × industry</p>
          <h1>谁师承谁，<br />谁与产业同行。</h1>
          <p className="hero-deck">从导师谱系到论文合作，再到企业任职、联合项目与人才流向。每条关系都带来源、时间与可信度。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#atlas">探索新加坡图谱 <span>↘</span></a>
            <a className="text-button" href="#method">查看证据标准 <span>→</span></a>
          </div>
        </div>
        <div className="hero-metrics" aria-label="试点数据概况">
          <div><strong>8</strong><span>核心学者</span></div>
          <div><strong>4</strong><span>研究机构</span></div>
          <div><strong>9</strong><span>已核验关系</span></div>
          <div><strong>20</strong><span>资料来源</span></div>
          <p>首轮收录 · 更新于 2026.08.22</p>
        </div>
      </section>

      <section className="atlas-section" id="atlas">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / INTERACTIVE ATLAS</p>
            <h2>新加坡 AI / NLP 学术关系图</h2>
          </div>
          <div className="view-switch" role="tablist" aria-label="图谱视图">
            {(["graph", "people", "evidence"] as const).map((item) => (
              <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>
                {item === "graph" ? "关系图" : item === "people" ? "人物" : "证据"}
              </button>
            ))}
          </div>
        </div>

        <div className="atlas-shell">
          <div className="atlas-toolbar">
            <label className="search-box">
              <span>⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索学者、方向、关键词…" />
            </label>
            <div className="filter-row" aria-label="机构筛选">
              {(["All", "NUS", "NTU", "SMU", "A*STAR"] as InstitutionFilter[]).map((item) => (
                <button key={item} className={institution === item ? "active" : ""} onClick={() => setInstitution(item)}>{item === "All" ? "全部机构" : item}</button>
              ))}
            </div>
            <div className="filter-row relation-filter" aria-label="关系筛选">
              {(Object.keys(edgeLabels) as EdgeFilter[]).map((item) => (
                <button key={item} className={edgeFilter === item ? "active" : ""} onClick={() => setEdgeFilter(item)}>
                  {item !== "all" && <i className={`dot-${item}`} />}{edgeLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div className="atlas-content">
            {view === "graph" && (
              <div className="graph-scroll">
                <div className="graph-canvas" aria-label="学者关系网络">
                  <div className="institution-zone zone-nus">NUS</div>
                  <div className="institution-zone zone-ntu">NTU</div>
                  <div className="institution-zone zone-astar">A*STAR</div>
                  {visibleRelations.map((relation) => {
                    const geom = lineGeometry[relation.id];
                    if (!geom || relation.from === relation.to) return null;
                    return <div key={relation.id} className={`graph-line line-${relation.type}`} style={{ left: geom.left, top: geom.top, width: geom.width, transform: `rotate(${geom.rotate}deg)` }} title={`${relation.label}: ${relation.evidence}`} />;
                  })}
                  {visiblePeople.map((person) => (
                    <button
                      key={person.id}
                      className={`person-node ${person.primary ? "primary-node" : "external-node"} ${selected.id === person.id ? "selected" : ""}`}
                      style={{ left: person.x, top: person.y, "--node-color": institutionColors[person.institution] } as React.CSSProperties}
                      onClick={() => setSelectedId(person.id)}
                    >
                      <span className="node-avatar">{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                      <span className="node-copy"><strong>{person.name}</strong><small>{person.institution} · {person.area.split(" · ")[0]}</small></span>
                    </button>
                  ))}
                  {visibleRelations.filter((r) => r.from === r.to).map((r, index) => {
                    const owner = people.find((p) => p.id === r.from)!;
                    return <button key={r.id} className={`self-relation-badge badge-${r.type}`} style={{ left: owner.x + 36, top: owner.y + 66 + index * 4 }} onClick={() => setSelectedId(owner.id)}>{r.type === "industry" ? "↗" : "→"} {r.label}</button>;
                  })}
                  {visiblePeople.length === 0 && <div className="empty-state">没有匹配结果。试试清除筛选条件。</div>}
                </div>
              </div>
            )}

            {view === "people" && (
              <div className="people-grid">
                {visiblePeople.filter((p) => p.primary).map((person) => (
                  <button key={person.id} className="person-card" onClick={() => { setSelectedId(person.id); setView("graph"); }}>
                    <span className="person-monogram" style={{ background: institutionColors[person.institution] }}>{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                    <span><small>{person.institution}</small><strong>{person.name}</strong><em>{person.area}</em></span>
                    <b>↗</b>
                  </button>
                ))}
              </div>
            )}

            {view === "evidence" && (
              <div className="evidence-list">
                {visibleRelations.map((relation) => {
                  const from = people.find((p) => p.id === relation.from)!;
                  const to = people.find((p) => p.id === relation.to)!;
                  return (
                    <article key={relation.id}>
                      <RelationChip type={relation.type} />
                      <div><strong>{from.name}{from.id !== to.id ? ` → ${to.name}` : ""}</strong><p>{relation.evidence}</p></div>
                      <a href={relation.source.url} target="_blank" rel="noreferrer">原始来源 ↗</a>
                    </article>
                  );
                })}
              </div>
            )}

            <aside className="inspector">
              <div className="inspector-top">
                <span className="large-monogram" style={{ background: institutionColors[selected.institution] }}>{selected.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                <span className="verified-badge">✓ SOURCED</span>
              </div>
              <p className="institution-label">{selected.institution}</p>
              <h3>{selected.name}</h3>
              {selected.chinese && <p className="chinese-name">{selected.chinese}</p>}
              <p className="role-label">{selected.role}</p>
              <p className="summary">{selected.summary}</p>
              {selected.status && <p className="status-note">◷ {selected.status}</p>}
              <div className="tag-list">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="inspector-block">
                <h4>关系证据 <span>{selectedRelations.length}</span></h4>
                {selectedRelations.slice(0, 4).map((relation) => (
                  <a key={relation.id} className="relation-row" href={relation.source.url} target="_blank" rel="noreferrer">
                    <RelationChip type={relation.type} />
                    <span><strong>{relation.label}</strong><small>{relation.evidence}</small></span>
                    <b>↗</b>
                  </a>
                ))}
                {selectedRelations.length === 0 && <p className="quiet">本轮暂无已核验关系。</p>}
              </div>
              <div className="inspector-block source-block">
                <h4>人物来源 <span>{selected.sources.length}</span></h4>
                {selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}<span>↗</span></a>)}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="communities-section" id="communities">
        <div className="section-heading light-heading">
          <div><p className="section-index">02 / RESEARCH COMMUNITIES</p><h2>这里有哪些研究群落？</h2></div>
          <p>群落来自师承、长期合作与组织关系的组合观察；它不是对“派系”的主观判断。</p>
        </div>
        <div className="community-grid">
          {communities.map((community, index) => (
            <article key={community.name} className={`community-card ${community.color}`}>
              <span className="community-number">0{index + 1}</span>
              <p>{community.kicker}</p>
              <h3>{community.name}</h3>
              <strong>{community.anchor}</strong>
              <span>{community.description}</span>
              <button onClick={() => { document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }); }}>在图谱中查看 ↗</button>
            </article>
          ))}
        </div>
      </section>

      <section className="industry-section" id="industry">
        <div className="section-heading">
          <div><p className="section-index">03 / INDUSTRY PATHWAYS</p><h2>连接不只一种。</h2></div>
          <p>我们把正式任职、企业资助、创业、技术采用与学生流向分开记录。</p>
        </div>
        <div className="pathways">
          <article><span>01</span><div><small>RESEARCH AWARD + PRIOR EMPLOYMENT</small><h3>Yang You ↔ Google / NVIDIA / Microsoft</h3><p>公开主页列出多家企业研究经历；2026 年获得 Google Research Award。技术采用与正式任职分开标注。</p></div><a href="https://www.comp.nus.edu.sg/~youy/" target="_blank" rel="noreferrer">证据 ↗</a></article>
          <article><span>02</span><div><small>EMPLOYMENT + FOUNDER</small><h3>Erik Cambria ↔ MSRA / HP Labs / SenticNet</h3><p>企业研究院经历与创业公司均有 NTU 实验室公开资料支持。</p></div><a href="https://blogs.ntu.edu.sg/multi-net-lab/erik-cambria-5/" target="_blank" rel="noreferrer">证据 ↗</a></article>
          <article><span>03</span><div><small>TECH TRANSFER</small><h3>Nancy Chen ↔ Spin-offs / Public deployment</h3><p>A*STAR 官方资料确认团队成果已有商业 spin-off 与政府部署，但在未获取公司名称前不做额外推断。</p></div><a href="https://www.a-star.edu.sg/i2r/i2r-profiles/nancychen" target="_blank" rel="noreferrer">证据 ↗</a></article>
          <article><span>04</span><div><small>TALENT FLOW ≠ FORMAL TIE</small><h3>Min-Yen Kan → Google</h3><p>博士毕业生首份或后续工作去向可以展示人才流动，但不会自动升级为 PI 的企业合作关系。</p></div><a href="https://www.comp.nus.edu.sg/cs/people/kanmy/" target="_blank" rel="noreferrer">证据 ↗</a></article>
        </div>
      </section>

      <section className="method-section" id="method">
        <div>
          <p className="section-index">04 / EVIDENCE STANDARD</p>
          <h2>先有证据，<br />再连一条边。</h2>
        </div>
        <div className="method-copy">
          <p>一张漂亮但无法核验的关系图没有学术价值。学脉 Atlas 把“事实”“推断”和“未知”明确分开。</p>
          <ol>
            <li><span>A</span><div><strong>一手来源优先</strong><p>博士论文、学校主页、个人 CV、研究机构公告。</p></div></li>
            <li><span>B</span><div><strong>关系类型不混用</strong><p>共同论文不是师承；学生入职公司也不是 PI 的正式产业合作。</p></div></li>
            <li><span>C</span><div><strong>保留时间与状态</strong><p>任职和连接会变化；例如 on leave、访问职位与历史任职都会单独记录。</p></div></li>
          </ol>
        </div>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark">脉</span><span>学脉 Atlas</span></div>
        <p>新加坡 AI / NLP 学术关系试点 · 公开来源研究项目</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
