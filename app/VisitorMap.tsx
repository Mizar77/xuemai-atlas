"use client";

import { useEffect, useMemo, useState } from "react";

type CountryVisit = { countryCode: string; visits: number };
type VisitorSnapshot = { totalVisits: number; countries: CountryVisit[] };

const liveVisitorApi = "https://xuemai-atlas-stats.xut0092.workers.dev/api/visitors";

// Approximate country centroids for the on-page equirectangular map. Countries
// without a marker are still retained in the ranked list returned by the API.
const countryCentroids: Record<string, [number, number]> = {
  AR: [-64, -34], AT: [14, 47.5], AU: [134, -25], BE: [4.6, 50.8], BR: [-52, -10],
  CA: [-106, 57], CH: [8.2, 46.8], CL: [-71, -33], CN: [104, 35], CO: [-74, 4],
  CZ: [15.5, 49.8], DE: [10.4, 51], DK: [9.5, 56], EG: [30, 27], ES: [-3.5, 40],
  FI: [26, 64], FR: [2.2, 46.4], GB: [-2.5, 54], GR: [22, 39], HK: [114.2, 22.3],
  HU: [19.4, 47], ID: [118, -2], IE: [-8, 53], IL: [35, 31.5], IN: [79, 22],
  IT: [12.5, 42.5], JP: [138, 36], KR: [128, 36], MX: [-102, 23], MY: [102, 4],
  NG: [8, 9], NL: [5.5, 52.2], NO: [9, 62], NZ: [172, -41], PH: [122, 12],
  PK: [69, 30], PL: [19, 52], PT: [-8, 39.5], RO: [25, 46], RU: [90, 61],
  SA: [45, 24], SE: [16, 62], SG: [103.8, 1.35], TH: [101, 15], TR: [35, 39],
  TW: [121, 23.7], UA: [31, 49], US: [-99, 39], VN: [108, 16], ZA: [24, -29],
};

const landRows = [
  "...........######..........................####...........",
  ".........#########.......................######..........",
  ".......############.............####....###########.......",
  "......##############...........######################.....",
  "......#############............########################...",
  ".......###########..............#########################..",
  ".........########...............########################...",
  "..........######.................######################....",
  "...........#####..................####################......",
  "............#####..................###############..........",
  ".............#####..................############............",
  "..............####..................###########.............",
  "...............####..................########......#####....",
  "................###...................######.......#######..",
  ".................##....................####........########.",
  "........................................##..........######..",
  ".....................................................####...",
  "............................................................",
];

function visitorApiUrl() {
  return window.location.hostname.endsWith("github.io") ? liveVisitorApi : "/api/visitors";
}

function countryName(code: string) {
  try {
    return new Intl.DisplayNames(["zh-CN"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export default function VisitorMap() {
  const [snapshot, setSnapshot] = useState<VisitorSnapshot>({ totalVisits: 0, countries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const navigatorWithPrivacy = navigator as Navigator & { globalPrivacyControl?: boolean };
      const privacyOptOut = navigatorWithPrivacy.globalPrivacyControl === true || navigator.doNotTrack === "1";
      let alreadyCounted = false;
      try {
        alreadyCounted = sessionStorage.getItem("xuemai-visit-counted") === "1";
      } catch {
        // Storage can be unavailable in hardened browsers; the server still only stores an aggregate country count.
      }

      try {
        const endpoint = visitorApiUrl();
        const response = !privacyOptOut && !alreadyCounted
          ? await fetch(endpoint, { method: "POST" })
          : await fetch(endpoint);
        if (!response.ok) throw new Error("visitor stats unavailable");
        const data = await response.json() as VisitorSnapshot;
        if (active) setSnapshot(data);
        if (!privacyOptOut && !alreadyCounted) {
          try { sessionStorage.setItem("xuemai-visit-counted", "1"); } catch { /* optional session guard */ }
        }
      } catch {
        // The local preview has no D1 binding. Keep the honest empty state instead of inventing traffic.
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  const markers = useMemo(() => snapshot.countries.flatMap((country) => {
    const centroid = countryCentroids[country.countryCode];
    if (!centroid) return [];
    const [longitude, latitude] = centroid;
    return [{ ...country, left: ((longitude + 180) / 360) * 100, top: ((90 - latitude) / 180) * 100 }];
  }), [snapshot.countries]);

  return <section className="visitor-section" id="visitors" aria-labelledby="visitor-map-title">
    <div className="visitor-copy">
      <p className="section-index">07 / GLOBAL READERS</p>
      <h2 id="visitor-map-title">学脉从哪里被看见。</h2>
      <p>地图按国家或地区汇总公开访问次数，用来观察这份学术图谱连接到了哪些地方。</p>
      <div className="visitor-total"><strong>{loading ? "—" : snapshot.totalVisits.toLocaleString("zh-CN")}</strong><span>累计访问次数</span></div>
      <p className="visitor-privacy">不保存原始 IP、城市、浏览轨迹或个人身份；尊重 Do Not Track 与 Global Privacy Control。刷新页面不会在同一浏览会话中重复计数。</p>
    </div>
    <div className="visitor-map-card">
      <div className="visitor-world" aria-label="网站访问地区分布图">
        <div className="visitor-land" style={{ gridTemplateColumns: `repeat(${landRows[0].length}, 1fr)` }} aria-hidden="true">
          {landRows.flatMap((row, rowIndex) => row.padEnd(landRows[0].length, ".").slice(0, landRows[0].length).split("").map((cell, columnIndex) => <i className={cell === "#" ? "land" : ""} key={`${rowIndex}-${columnIndex}`} />))}
        </div>
        {markers.map((marker) => <span className="visitor-marker" key={marker.countryCode} style={{ left: `${marker.left}%`, top: `${marker.top}%`, "--marker-scale": Math.min(1.9, 1 + Math.log10(marker.visits + 1) * .35) } as React.CSSProperties} title={`${countryName(marker.countryCode)}：${marker.visits} 次访问`}><i /><b>{marker.visits}</b></span>)}
        {!loading && snapshot.totalVisits === 0 && <p className="visitor-empty">线上部署后开始累计真实访问，不显示模拟数据。</p>}
      </div>
      <div className="visitor-ranking">
        <header><strong>访问来源</strong><span>{snapshot.countries.length} 个国家 / 地区</span></header>
        {snapshot.countries.slice(0, 6).map((country, index) => <div key={country.countryCode}><span><b>{String(index + 1).padStart(2, "0")}</b>{countryName(country.countryCode)}</span><strong>{country.visits.toLocaleString("zh-CN")}</strong></div>)}
        {!loading && snapshot.countries.length === 0 && <p>尚未记录到线上访问。</p>}
        {loading && <p>正在读取公开访问统计…</p>}
      </div>
    </div>
  </section>;
}
