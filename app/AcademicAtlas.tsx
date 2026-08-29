"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { communities, coverage, groupMembers, industryPathways, people, placementSectorLabels, placementSectorOf, regionOf, regionalInstitutions, relationships, relationshipSubtypeLabels, relationshipSubtypeOf, stageLabels, studentPlacements, type Person, type PlacementSector, type Region, type Relationship, type Source, type StudentPlacement } from "./data";
import FeedbackDrawer from "./FeedbackDrawer";
import VisitorMap from "./VisitorMap";

type EdgeFilter = "all" | Relationship["type"];
type InstitutionFilter = "All" | Person["institution"];
type FocusFilter = "all" | "core" | "emerging" | "adjacent" | "historical";
type AtlasView = "graph" | "people" | "evidence";
type PlacementKindFilter = "all" | StudentPlacement["kind"];
type PlacementSectorFilter = "all" | PlacementSector;
type TimelineType = "appointment" | "collaboration" | "topic" | "talent";
type TimelineFilter = "all" | TimelineType;
type TimelineEvent = {
  id: string;
  type: TimelineType;
  dateLabel: string;
  sortYear: number;
  title: string;
  detail: string;
  source: Source;
};

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
const timelineTypeLabels: Record<TimelineType, string> = { appointment: "人物任职", collaboration: "合作关系", topic: "研究方向", talent: "人才流动" };
const regionLabels: Record<Region, string> = { Singapore: "新加坡", "Hong Kong": "香港", "Mainland China": "中国大陆", "United States": "美国" };
const sourceKindLabels = { official: "官方", self_submitted: "本人 / 实验室提交", cv: "CV", thesis: "学位论文", profile: "个人主页", publication: "论文", company: "公司资料" } as const;
const regionSlugs: Record<Region, string> = { Singapore: "singapore", "Hong Kong": "hong-kong", "Mainland China": "mainland", "United States": "us" };

function regionFromSlug(value: string | null): Region | undefined {
  return (Object.keys(regionSlugs) as Region[]).find((key) => regionSlugs[key] === value);
}

function normalizedTokens(value: string) {
  return value.toLocaleLowerCase().split(/\s+/).map((token) => token.trim()).filter(Boolean);
}

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

function PersonAvatar({ person, className, style }: { person: Person; className: string; style?: React.CSSProperties }) {
  return <span className={`${className}${person.portrait ? " has-portrait" : ""}`} style={style} aria-hidden="true">
    {/* Small local card portraits are already cropped and compressed; routing them through image optimization would add avoidable requests. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {person.portrait ? <img src={person.portrait.src} alt="" loading="lazy" decoding="async" /> : initials(primaryName(person))}
  </span>;
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

function relationshipYears(relationship: Relationship) {
  if (relationship.startYear && relationship.endYear) return `${relationship.startYear}–${relationship.endYear}`;
  if (relationship.startYear) return `${relationship.startYear}–至今`;
  if (relationship.recentYear) return `最近记录 ${relationship.recentYear}`;
  const mentionedYears = Array.from(`${relationship.label} ${relationship.evidence}`.matchAll(/\b(?:19|20)\d{2}\b/g), (match) => Number(match[0]));
  if (mentionedYears.length > 1) return `证据所述 ${Math.min(...mentionedYears)}–${Math.max(...mentionedYears)}`;
  if (mentionedYears.length === 1) return `证据记录 ${mentionedYears[0]}`;
  return "时间待补";
}

function yearsIn(value: string) {
  return Array.from(value.matchAll(/\b(?:19|20)\d{2}\b/g), (match) => Number(match[0]));
}

function buildPersonTimeline(person: Person, personRelations: Relationship[], placements: StudentPlacement[]): TimelineEvent[] {
  const fallbackSource = person.sources[0];
  const events: TimelineEvent[] = [];

  person.facts?.forEach((fact, index) => {
    const content = `${fact.label} ${fact.value}`;
    const years = yearsIn(content);
    const isAppointment = /任职|职位|履历|加入|创办|创业|回到|调任|career|appointment|joined|found/i.test(content);
    const isTopic = /研究主题|研究方向|方向变化|research (?:theme|focus|area)/i.test(content);
    // A timeline should show dated development, not turn an undated current-profile
    // statement into a synthetic snapshot event.
    if ((!isAppointment && !isTopic) || years.length === 0) return;
    events.push({
      id: `${person.id}-fact-${index}`,
      type: isTopic ? "topic" : "appointment",
      dateLabel: years.length ? (years.length > 1 ? `${Math.min(...years)}–${Math.max(...years)}` : String(years[0])) : "时间待补",
      sortYear: years.length ? Math.max(...years) : 0,
      title: fact.label,
      detail: fact.value,
      source: fact.source ?? fallbackSource,
    });
  });

  personRelations.forEach((relationship) => {
    const counterpartId = relationship.from === person.id ? relationship.to : relationship.from;
    const counterpart = people.find((candidate) => candidate.id === counterpartId);
    const years = [relationship.startYear, relationship.endYear, relationship.recentYear].filter((year): year is number => Boolean(year));
    events.push({
      id: `timeline-${relationship.id}`,
      type: "collaboration",
      dateLabel: relationshipYears(relationship),
      sortYear: years.length ? Math.max(...years) : Math.max(0, ...yearsIn(`${relationship.label} ${relationship.evidence}`)),
      title: `${relationshipSubtypeLabels[relationshipSubtypeOf(relationship)]}${counterpart && counterpart.id !== person.id ? ` · ${displayName(counterpart)}` : ""}`,
      detail: relationship.evidenceObject ?? relationship.evidence,
      source: relationship.source,
    });
  });

  placements.forEach((placement) => {
    events.push({
      id: `timeline-${placement.id}`,
      type: "talent",
      dateLabel: placement.graduationYear ? `${placement.graduationYear} 届` : "时间待补",
      sortYear: placement.graduationYear ?? 0,
      title: `${placement.student} → ${placement.company}`,
      detail: `${placementSectorLabels[placementSectorOf(placement)]} · ${placementKindLabels[placement.kind]} · ${placement.role}`,
      source: placement.source,
    });
  });

  return events.sort((a, b) => b.sortYear - a.sortYear || a.title.localeCompare(b.title));
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
  const [view, setView] = useState<AtlasView>("people");
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>("all");
  const [companySector, setCompanySector] = useState<PlacementSectorFilter>("all");
  const [companyKind, setCompanyKind] = useState<PlacementKindFilter>("all");
  const [companyDepartment, setCompanyDepartment] = useState("all");
  const [companyDegree, setCompanyDegree] = useState("all");
  const [companyYear, setCompanyYear] = useState("all");
  const [urlReady, setUrlReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const applyUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlRegion = regionFromSlug(params.get("region"));
      const person = people.find((candidate) => candidate.id === params.get("person"));
      const urlView = params.get("view") as AtlasView | null;
      const urlFocus = params.get("focus") as FocusFilter | null;
      const urlEdge = params.get("relation") as EdgeFilter | null;
      if (person) {
        setSelectedId(person.id);
        setRegion(regionOf(person));
        if (urlView === "graph") setGraphFocusId(person.id);
      } else if (urlRegion) {
        setRegion(urlRegion);
      }
      if (urlView && ["graph", "people", "evidence"].includes(urlView)) setView(urlView);
      if (urlFocus && Object.hasOwn(focusLabels, urlFocus)) setFocus(urlFocus);
      if (urlEdge && Object.hasOwn(edgeLabels, urlEdge)) setEdgeFilter(urlEdge);
      setQuery(params.get("q") ?? "");
      setSelectedCompany(params.get("company") ?? selectedCompany);
      setInstitution("All");
    };
    const initialSync = window.setTimeout(() => {
      applyUrlState();
      setUrlReady(true);
    }, 0);
    window.addEventListener("popstate", applyUrlState);
    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener("popstate", applyUrlState);
    };
  // URL state is intentionally read only once and again on browser navigation.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!urlReady) return;
    const params = new URLSearchParams();
    params.set("region", regionSlugs[region]);
    params.set("view", view);
    params.set("person", selectedId);
    if (query) params.set("q", query);
    if (focus !== "all") params.set("focus", focus);
    if (edgeFilter !== "all") params.set("relation", edgeFilter);
    if (selectedCompany) params.set("company", selectedCompany);
    const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  }, [edgeFilter, focus, query, region, selectedCompany, selectedId, urlReady, view]);

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
  const selectedTimeline = buildPersonTimeline(selected, selectedRelations, selectedPlacements);
  const visibleTimeline = selectedTimeline.filter((event) => timelineFilter === "all" || event.type === timelineFilter);

  const globalMatches = useMemo(() => {
    const tokens = normalizedTokens(query);
    if (!tokens.length) return [];
    return people.map((person) => {
      const members = groupMembers.filter((member) => member.teacherId === person.id);
      const placements = studentPlacements.filter((placement) => placement.teacherId === person.id);
      const personRelations = relationships.filter((relationship) => relationship.from === person.id || relationship.to === person.id);
      const fields = {
        person: [person.name, person.chinese, person.institution, regionOf(person), regionLabels[regionOf(person)], person.role, person.area, ...person.tags, person.summary, ...(person.facts ?? []).flatMap((fact) => [fact.label, fact.value])].filter(Boolean).join(" "),
        group: members.flatMap((member) => [member.name, member.role, member.focus]).filter(Boolean).join(" "),
        placement: placements.flatMap((placement) => [placement.student, placement.company, placement.department, placement.role, placement.degree, placement.graduationYear]).filter(Boolean).join(" "),
        relation: personRelations.flatMap((relationship) => [relationship.label, relationship.evidence, relationship.evidenceObject, relationship.source.label]).filter(Boolean).join(" "),
      };
      const haystack = Object.values(fields).join(" ").toLocaleLowerCase();
      if (!tokens.every((token) => haystack.includes(token))) return null;
      const matchedIn = Object.entries(fields).filter(([, value]) => tokens.some((token) => value.toLocaleLowerCase().includes(token))).map(([key]) => key);
      return { person, matchedIn };
    }).filter((result): result is { person: Person; matchedIn: string[] } => Boolean(result)).slice(0, 24);
  }, [query]);

  const companyIndex = useMemo(() => Array.from(new Set(regionalPlacements.map((placement) => placement.company))).map((company) => {
    const placements = regionalPlacements.filter((placement) => placement.company === company);
    return { company, placements, teachers: new Set(placements.map((placement) => placement.teacherId)).size };
  }).sort((a, b) => b.teachers - a.teachers || b.placements.length - a.placements.length || a.company.localeCompare(b.company)), [regionalPlacements]);
  const selectedCompanyData = companyIndex.find((entry) => entry.company === selectedCompany) ?? companyIndex[0];
  const companyFilterOptions = useMemo(() => ({
    departments: Array.from(new Set(regionalPlacements.map((placement) => placement.department).filter((value): value is string => Boolean(value)))).sort(),
    degrees: Array.from(new Set(regionalPlacements.map((placement) => placement.degree).filter((value): value is NonNullable<StudentPlacement["degree"]> => Boolean(value)))).sort(),
    years: Array.from(new Set(regionalPlacements.map((placement) => placement.graduationYear).filter((value): value is number => Boolean(value)))).sort((a, b) => b - a),
  }), [regionalPlacements]);
  const filteredCompanyPlacements = selectedCompanyData.placements.filter((placement) =>
    (companySector === "all" || placementSectorOf(placement) === companySector) &&
    (companyKind === "all" || placement.kind === companyKind) &&
    (companyDepartment === "all" || placement.department === companyDepartment) &&
    (companyDegree === "all" || placement.degree === companyDegree) &&
    (companyYear === "all" || placement.graduationYear === Number(companyYear))
  );
  const companyPipelines = Array.from(new Set(filteredCompanyPlacements.map((placement) => placement.teacherId))).map((teacherId) => ({
    teacher: people.find((person) => person.id === teacherId)!,
    placements: filteredCompanyPlacements.filter((placement) => placement.teacherId === teacherId),
  }));
  const regionalSectorCounts = (Object.keys(placementSectorLabels) as PlacementSector[]).map((sector) => ({
    sector,
    count: regionalPlacements.filter((placement) => placementSectorOf(placement) === sector).length,
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
      const queryMatch = !needle || globalMatches.some((match) => match.person.id === person.id);
      return institutionMatch && focusMatch && queryMatch;
    });
  }, [focus, globalMatches, institution, query, regionPeople]);

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

  function openPerson(person: Person, nextView: AtlasView = view) {
    setRegion(regionOf(person));
    setInstitution("All");
    setSelectedId(person.id);
    setView(nextView);
    setGraphFocusId(nextView === "graph" ? person.id : null);
  }

  async function copyPersonLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("region", regionSlugs[regionOf(selected)]);
    url.searchParams.set("person", selected.id);
    url.searchParams.set("view", view);
    url.hash = "atlas";
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
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

      <section className="task-entry" aria-label="按目标开始探索">
        <div><small>从你的目标开始</small><strong>不必先读懂整张图</strong></div>
        <button onClick={() => { setView("people"); setQuery(""); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }); }}>找导师 / 研究组<span>按地区和方向浏览 →</span></button>
        <button onClick={() => { setView("graph"); setGraphFocusId(selected.id); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }); }}>看师承与合作<span>从一位人物的一跳关系开始 →</span></button>
        <button onClick={() => document.querySelector("#companies")?.scrollIntoView({ behavior: "smooth" })}>看学生工业去向<span>从公司、部门和职位反查 →</span></button>
        <button onClick={() => { setView("evidence"); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }); }}>核验一条资料<span>查看关系类型与原始来源 →</span></button>
        <details className="atlas-glossary"><summary>第一次使用？查看术语说明</summary><div><p><strong>PI</strong>可独立领导研究组或招生的研究负责人。</p><p><strong>师承</strong>有公开资料直接支持的博士导师、共同导师或博士后指导关系。</p><p><strong>相邻节点</strong>与 LLM 密切相关、但主要研究主线不以语言为中心的 AI 或系统学者。</p><p><strong>人才流向</strong>公开可核验的学习、任职或职业移动，不表示因果关系。</p></div></details>
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
            <div className="search-wrap">
              <label className="search-box"><span>⌕</span><input ref={searchInputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="跨四地区搜索人物、学生、公司、方向…" aria-label="全局搜索" /></label>
              {query.trim() && <div className="global-search-results" role="listbox" aria-label="全局搜索结果">
                <header><strong>全局结果</strong><span>{globalMatches.length} 位相关学者</span></header>
                {globalMatches.map(({ person, matchedIn }) => <button key={person.id} role="option" aria-selected={selected.id === person.id} onClick={() => { openPerson(person, "people"); setQuery(""); }}>
                  <PersonAvatar person={person} className="search-monogram" style={{ background: institutionColors[person.institution] }} />
                  <span><strong>{displayName(person)}</strong><small>{regionLabels[regionOf(person)]} · {person.institution} · {person.area}</small><em>命中：{matchedIn.map((field) => ({ person: "人物", group: "组员", placement: "学生去向", relation: "关系证据" })[field]).join("、")}</em></span>
                  <b>→</b>
                </button>)}
                {globalMatches.length === 0 && <p>没有同时满足所有关键词的结果。可尝试减少一个关键词。</p>}
              </div>}
            </div>
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
              <>
              <div className="mobile-ego" aria-label={`${displayName(selected)} 的一跳关系`}>
                <header><div><small>ONE-HOP RELATIONSHIPS</small><strong>{displayName(selected)}</strong><span>{selected.institution} · {selected.area}</span></div><button onClick={() => openPerson(selected, "people")}>查看详情</button></header>
                <div>{selectedRelations.filter((relation) => relation.from !== relation.to).map((relation) => {
                  const neighborId = relation.from === selected.id ? relation.to : relation.from;
                  const neighbor = people.find((person) => person.id === neighborId);
                  if (!neighbor) return null;
                  return <button key={relation.id} onClick={() => openPerson(neighbor, "graph")}>
                    <PersonAvatar person={neighbor} className="search-monogram" style={{ background: institutionColors[neighbor.institution] }} />
                    <span><strong>{displayName(neighbor)}</strong><small>{relationshipSubtypeLabels[relationshipSubtypeOf(relation)]} · {relationshipYears(relation)}</small><em>{relation.evidence}</em></span><b>→</b>
                  </button>;
                })}</div>
                {selectedRelations.filter((relation) => relation.from !== relation.to).length === 0 && <p>暂无已核验的一跳人物关系；这不表示不存在相关联系。</p>}
              </div>
              <div className="graph-scroll">
                <div className="graph-canvas" style={{ height: graphHeight }} aria-label="学者关系网络">
                  <button className="graph-reset-surface" aria-label="显示全部人物关系" onClick={() => setGraphFocusId(null)} />
                  <div className="graph-instruction"><span>点击人物聚焦关系 · 点击空白恢复全图</span>{activeGraphFocusId && <button onClick={() => setGraphFocusId(null)}>显示全部</button>}</div>
                  {graphZones[region].map((zone) => <div className={`institution-zone ${zone.className}`} key={zone.institution}><b>{zone.institution}</b><span>{regionPeople.filter((person) => person.primary && person.institution === zone.institution).length} current nodes</span></div>)}
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
                      <PersonAvatar person={person} className="node-avatar" /><span className="node-copy"><strong>{displayName(person)}</strong><small>{person.institution} · {person.stage === "emerging" ? "发展期 PI" : person.area.split(" · ")[0]}</small></span>
                    </button>
                  ))}
                  {visibleRelations.filter((r) => r.from === r.to).map((r, index) => {
                    const owner = people.find((p) => p.id === r.from)!;
                    return <button key={r.id} className={`self-relation-badge badge-${r.type} ${activeGraphFocusId && activeGraphFocusId !== owner.id ? "dimmed" : ""}`} style={{ left: owner.x + 62, top: owner.y + 22 + (index % 2) * 13 }} onClick={(event) => { event.stopPropagation(); setSelectedId(owner.id); setGraphFocusId((current) => current === owner.id ? null : owner.id); }}>↗ {r.label}</button>;
                  })}
                  {visiblePeople.length === 0 && <div className="empty-state">没有匹配结果。试试清除筛选条件。</div>}
                </div>
              </div>
              </>
            )}

            {view === "people" && (
              <div className="people-directory">
                {regionalInstitutions[region].map((inst) => {
                  const group = visiblePeople.filter((p) => p.primary && p.institution === inst);
                  if (!group.length) return null;
                  return <section className="institution-group" key={inst}>
                    <header><span style={{ background: institutionColors[inst] }} /> <h3>{inst}</h3><b>{group.length}</b></header>
                    <div className="people-grid">{group.map((person) => (
                      <button key={person.id} className={`person-card ${selected.id === person.id ? "selected" : ""}`} onClick={() => openPerson(person, "people")}>
                        <PersonAvatar person={person} className="person-monogram" style={{ background: institutionColors[person.institution] }} />
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
                return <article key={relation.id}><RelationChip type={relation.type} /><div><strong>{primaryName(from)}{from.id !== to.id ? ` → ${primaryName(to)}` : ""}</strong><small>{relationshipSubtypeLabels[relationshipSubtypeOf(relation)]} · {relationshipYears(relation)}</small><p>{relation.evidence}</p></div><a href={relation.source.url} target="_blank" rel="noreferrer">原始来源 ↗</a></article>;
              })}</div>
            )}

            <aside className="inspector">
              <div className="inspector-top">
                <div className="inspector-portrait">
                  <PersonAvatar person={selected} className="large-monogram" style={{ background: institutionColors[selected.institution] }} />
                  {selected.portrait && <a href={selected.portrait.source.url} target="_blank" rel="noreferrer">头像来源 ↗</a>}
                </div>
                <span className="verified-badge">✓ {selected.sources.length} SOURCES</span>
              </div>
              <div className="inspector-meta"><p className="institution-label">{selected.institution}</p><span className={`stage-badge stage-${selected.stage}`}>{stageLabels[selected.stage]}</span></div>
              <h3>{primaryName(selected)}</h3>{secondaryName(selected) && <p className="chinese-name">{secondaryName(selected)}</p>}<p className="role-label">{selected.role}</p><p className="summary">{selected.summary}</p>
              {selected.status && <p className="status-note">◷ {selected.status}</p>}
              <div className="record-status"><span><small>资料核验</small><strong>{selected.lastVerifiedAt ?? "待补"}</strong></span><button onClick={copyPersonLink}>{copied ? "已复制 ✓" : "复制人物链接"}</button></div>
              <div className="tag-list">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="inspector-block timeline-block"><h4>人物时间轴 <span>{visibleTimeline.length} / {selectedTimeline.length} 项</span></h4>
                <p className="timeline-context">按公开记录整理任职、合作、研究方向变化和学生人才流动；未知年份不会推断。</p>
                <div className="timeline-filters" aria-label="时间轴类型筛选">
                  {(["all", "appointment", "collaboration", "topic", "talent"] as TimelineFilter[]).map((item) => <button key={item} className={timelineFilter === item ? "active" : ""} onClick={() => setTimelineFilter(item)}>{item === "all" ? "全部" : timelineTypeLabels[item]}</button>)}
                </div>
                <ol className="person-timeline">{visibleTimeline.map((event) => <li className={`timeline-${event.type}`} key={event.id}>
                  <span className="timeline-marker" />
                  <div><small>{event.dateLabel} · {timelineTypeLabels[event.type]}</small><strong>{event.title}</strong><p>{event.detail}</p><a href={event.source.url} target="_blank" rel="noreferrer">查看证据 ↗</a></div>
                </li>)}</ol>
                {visibleTimeline.length === 0 && <p className="quiet">该类型暂无公开记录。</p>}
              </div>
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
              <div className="inspector-block placement-block"><h4>学生去向 <span>{selectedPlacements.length ? `${selectedPlacements.length} 条已核验${selected.knownAlumniCount ? ` / 已知 ${selected.knownAlumniCount}` : ""}` : "待补"}</span></h4>
                <p className="placement-context">{selected.knownAlumniCount ? `公开名录记录 ${selected.knownAlumniCount} 名毕业生；下方仅为目前逐条核验的公开去向。` : "尚未建立完整毕业生分母；下方数量是公开可核验样本，不是完整就业统计或导师排名。"}</p>
                {selectedPlacements.slice(0, 8).map((placement) => <a key={placement.id} className="placement-row" href={placement.source.url} target="_blank" rel="noreferrer"><span className="placement-person"><strong>{placement.student}</strong><small><i className={`sector-badge sector-${placementSectorOf(placement)}`}>{placementSectorLabels[placementSectorOf(placement)]}</i>{placementKindLabels[placement.kind]} · {placement.degree ?? "学位待补"}{placement.graduationYear ? ` · ${placement.graduationYear}` : ""}</small><small>{placement.firstJob ? `首份工作：${placement.firstJob}` : placement.currentRole ? `当前：${placement.currentRole}` : placement.role}</small>{placement.note && <small className="placement-note">口径：{placement.note}</small>}</span><span className="placement-destination"><b>{placement.company}</b>{placement.department && <small>{placement.department}</small>}<small>{placement.verifiedAt ? `核验 ${placement.verifiedAt}` : "核验日期待补"}</small></span>{placement.highLevel && <em>重点职位</em>}</a>)}
                {selectedPlacements.length > 8 && <a className="more-placements" href="#companies">另有 {selectedPlacements.length - 8} 条，在公司反向图中查看 →</a>}
                {selectedPlacements.length === 0 && <p className="quiet">尚未找到可逐条核验的公开学生职业去向；这不表示该导师没有相关学生记录。</p>}
              </div>
              <div className="inspector-block"><h4>关系证据 <span>{selectedRelations.length}</span></h4>
                {selectedRelations.slice(0, 10).map((relation) => <a key={relation.id} className="relation-row" href={relation.source.url} target="_blank" rel="noreferrer"><RelationChip type={relation.type} /><span><strong>{relationshipSubtypeLabels[relationshipSubtypeOf(relation)]} · {relation.label}</strong><small>{relationshipYears(relation)} · {relation.evidenceObject ?? relation.evidence}</small></span><b>↗</b></a>)}
                {selectedRelations.length === 0 && <p className="quiet">暂无已核验关系；不以“共同任职”自动推断合作。</p>}
              </div>
              <div className="inspector-block source-block"><h4>人物来源 <span>{selected.sources.length}</span></h4>{selected.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.label}</strong><small>{sourceKindLabels[source.kind]} · {source.supports ?? "支持人物基础信息"} · {source.checkedAt ? `核验 ${source.checkedAt}` : "核验日期待补"}{source.asOf ? ` · 信息截至 ${source.asOf}` : ""}</small></span><b>↗</b></a>)}</div>
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
          <p>选择单位或部门，中心图会显示{regionLabels[region]}哪些老师的学生进入该组织、学生姓名与公开职位。职业去向分为学术界、工业界、创业、博后和其他；“毕业去向”“当前任职”等则保留原始页面的记录口径。</p>
        </div>
        <div className="sector-summary" aria-label="职业去向类别统计">{regionalSectorCounts.map(({ sector, count }) => <button key={sector} className={`${companySector === sector ? "active" : ""} sector-summary-${sector}`} onClick={() => setCompanySector((current) => current === sector ? "all" : sector)}><span>{placementSectorLabels[sector]}</span><strong>{count}</strong></button>)}</div>
        <div className="company-filterbar" aria-label="学生去向筛选">
          <label>职业去向<select value={companySector} onChange={(event) => setCompanySector(event.target.value as PlacementSectorFilter)}><option value="all">全部五类去向</option>{Object.entries(placementSectorLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label>记录口径<select value={companyKind} onChange={(event) => setCompanyKind(event.target.value as PlacementKindFilter)}><option value="all">全部公开口径</option>{Object.entries(placementKindLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label>部门<select value={companyDepartment} onChange={(event) => setCompanyDepartment(event.target.value)}><option value="all">全部部门</option>{companyFilterOptions.departments.map((department) => <option key={department}>{department}</option>)}</select></label>
          <label>学位<select value={companyDegree} onChange={(event) => setCompanyDegree(event.target.value)}><option value="all">全部学位</option>{companyFilterOptions.degrees.map((degree) => <option key={degree}>{degree}</option>)}</select></label>
          <label>毕业年份<select value={companyYear} onChange={(event) => setCompanyYear(event.target.value)}><option value="all">全部年份</option>{companyFilterOptions.years.map((year) => <option key={year}>{year}</option>)}</select></label>
          <button onClick={() => { setCompanySector("all"); setCompanyKind("all"); setCompanyDepartment("all"); setCompanyDegree("all"); setCompanyYear("all"); }}>清除筛选</button>
        </div>
        <div className="company-atlas">
          <aside className="company-index" aria-label="公司与部门索引">
            <header><strong>公司 / 机构</strong><span>{companyIndex.length} 个节点</span></header>
            <div>{companyIndex.map((entry) => <button key={entry.company} className={selectedCompanyData.company === entry.company ? "active" : ""} onClick={() => setSelectedCompany(entry.company)}><span><strong>{entry.company}</strong><small>{entry.teachers} 位导师 · {entry.placements.length} 名学生</small></span><b>→</b></button>)}</div>
          </aside>
          <div className="company-graph" aria-label={`${selectedCompanyData.company} 的导师学生流向图`}>
            <div className="company-hub"><small>COMPANY / DEPARTMENT</small><strong>{selectedCompanyData.company}</strong><span>{filteredCompanyPlacements.length} / {selectedCompanyData.placements.length} 条匹配记录</span></div>
            <div className="pipeline-list">{companyPipelines.map(({ teacher, placements }) => <article className="pipeline" key={teacher.id}>
              <button className="pipeline-teacher" onClick={() => { openPerson(teacher, "people"); document.querySelector("#atlas")?.scrollIntoView({ behavior: "smooth" }); }}><PersonAvatar person={teacher} className="pipeline-avatar" style={{ background: institutionColors[teacher.institution] }} /><div><small>{teacher.institution} · 导师</small><strong>{displayName(teacher)}</strong></div></button>
              <div className="pipeline-edge"><span>{placements.length} 名学生</span></div>
              <div className="pipeline-students">{placements.map((placement) => <a href={placement.source.url} target="_blank" rel="noreferrer" key={placement.id}><span><strong>{placement.student} <i className={`sector-badge sector-${placementSectorOf(placement)}`}>{placementSectorLabels[placementSectorOf(placement)]}</i></strong><small>{placementKindLabels[placement.kind]} · {placement.role}{placement.department ? ` · ${placement.department}` : ""}</small><small>{placement.degree ?? "学位待补"}{placement.graduationYear ? ` · ${placement.graduationYear} 届` : " · 年份待补"}{placement.verifiedAt ? ` · 核验 ${placement.verifiedAt}` : ""}</small>{placement.note && <small className="placement-note">口径：{placement.note}</small>}</span>{placement.highLevel && <em>高管 / 高级职位</em>}</a>)}</div>
            </article>)}</div>
            {filteredCompanyPlacements.length === 0 && <div className="company-empty">当前筛选没有匹配记录。缺少学位或年份的数据不会被推断，请清除相应筛选后查看。</div>}
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

      <VisitorMap />

      <FeedbackDrawer defaultSubject={displayName(selected)} />
      <footer><div className="brand"><span className="brand-mark">脉</span><span>学脉 Atlas</span></div><p>{regionLabels[region]} NLP / LLM / AI 学术关系图谱 · 基于公开来源持续维护</p><a href="#top">回到顶部 ↑</a></footer>
    </main>
  );
}
