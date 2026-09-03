/**
 * Independent rescue pass for roster units whose first-party directories were
 * previously blocked. This module is intentionally not imported by the shared
 * ledger; the parent audit can merge the records after review.
 *
 * No person-level inclusion/exclusion decision is made here. A complete
 * snapshot means only that every row in the official directory result set was
 * frozen for the later classification phase.
 */

export type BerkeleyUclRescueRosterSnapshot = {
  officialRosterCount: number | null;
  snapshotAt: string;
  fetchStatus: "complete" | "partial";
  sourceDataUrl: string;
  artifactPath?: string;
  note: string;
};

export const berkeleyUclRescueRosterSnapshots: Record<string, BerkeleyUclRescueRosterSnapshot> = {
  "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html",
    note: "官方 CS Faculty List 仍被 Berkeley EECS 当前 Faculty 导航直接链接，搜索索引也显示页面于本周抓取并包含 2026 秋季教学信息；但 128.32.139.28:443 在标准 curl、浏览器导航和检索系统的直接读取中均于建立 HTTPS 连接前超时。由于没有取得完整正文，不能根据搜索摘要冻结人数。",
  },
  "https://bair.berkeley.edu/people/faculty.html": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://bair.berkeley.edu/people/faculty.html",
    note: "BAIR 官方 /people/ 索引可确认 faculty.html（11K）与 faculty.txt（7.5K）均于 2026-07-23 更新；但目录、HTML 与 TXT 在标准 HTTPS 请求及检索系统的直接读取中都超时。只取得文件存在、大小和更新时间，未取得全部人物正文，因此不冻结人数。",
  },
  "https://www.ucl.ac.uk/computer-science/people/academic-and-research-staff": {
    officialRosterCount: 554,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://profiles.ucl.ac.uk/search?by=text&d=Dept+of+Computer+Science&type=user&v=",
    artifactPath: "data/official-rosters/ucl-computer-science-all-profiles-2026-09-02.json",
    note: "当前 UCL Computer Science Academic staff 页面将 All staff (A-Z) 指向 UCL Profiles 的 Dept of Computer Science 过滤结果。已遍历全部 23 页，页面总数与 554 个唯一官方 profile ID 一致。该官方结果集混合教授、讲师、研究员、honorary、PGTA、技术及专业岗位；本阶段一律保留，下一阶段再逐人分类。",
  },
  "https://www.nactem.ac.uk/staff/": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://nactem.ac.uk/people.php",
    note: "旧 /staff/ 已迁移到官方 People 页面。标准 HTTPS 请求对旧、新地址均以 curl 错误 60 拒绝：NaCTeM 服务器证书已过期。按安全约束没有关闭证书验证；搜索索引只能确认页面包含 Core staff、Visiting、Associated、PhD students 与 Alumni，无法证明完整名单终点，因此不冻结人数。",
  },
};
