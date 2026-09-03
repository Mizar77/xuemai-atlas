/**
 * Independently verified roster snapshots for the Europe-B and residual-US
 * workstream. These entries deliberately keep the original 124-unit scope URL
 * as their key. `sourceDataUrl` points to the current official page used to
 * build the frozen artifact when the scoped URL has moved or become stale.
 *
 * This module is intentionally not wired into the shared ledger: the parent
 * audit task can merge these records atomically after parallel work finishes.
 */

export type VerifiedRosterSnapshot = {
  officialRosterCount: number | null;
  snapshotAt: string;
  fetchStatus: "complete" | "partial";
  sourceDataUrl: string;
  artifactPath?: string;
  note: string;
};

export const europeBUsRosterSnapshots: Record<string, VerifiedRosterSnapshot> = {
  "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html",
    note: "官方 CS Faculty List 可由搜索索引确认仍在更新，但直接 HTTPS 请求、浏览器读取与二次页面读取均超时；索引摘要只覆盖部分人物，无法据此证明名录终点，因此不冻结人数。",
  },
  "https://bair.berkeley.edu/people/faculty.html": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://bair.berkeley.edu/people/faculty.html",
    note: "BAIR 官方目录索引确认 faculty.html/faculty.txt 于 2026-07-23 更新，但目录、HTML 与 TXT 的标准读取均超时；未取得完整正文，不能用搜索摘要或既有人物反推总数。",
  },
  "https://cds.nyu.edu/people/faculty/": {
    officialRosterCount: 149,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cds.nyu.edu/joint-faculty/",
    artifactPath: "data/official-rosters/nyu-cds-all-faculty-2026-09-02.json",
    note: "已遍历 CDS 官方菜单列出的八类教师页。共 150 张卡片、149 个唯一人物；Todd Gureckis 同时位于 Joint 与 Affiliated，快照合并人物并保留双重类别。",
  },
  "https://www.aalto.fi/en/department-of-computer-science/people": {
    officialRosterCount: 96,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.aalto.fi/en/department-of-computer-science/faculty-0",
    artifactPath: "data/official-rosters/aalto-computer-science-faculty-2026-09-02.json",
    note: "原 scope URL 现展示 Complex Systems 小组页面；已改用当前官方 Faculty 页并冻结 Professors 53、Lecturers 22、Affiliated professors 3、Emeriti 14、Alumni 4，共 96 人。",
  },
  "https://www.aalto.fi/en/department-of-computer-science/machine-learning-data-science-and-artificial-intelligence": {
    officialRosterCount: 19,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.aalto.fi/en/department-of-computer-science/machine-learning-data-science-and-ai",
    artifactPath: "data/official-rosters/aalto-machine-learning-data-science-ai-2026-09-02.json",
    note: "原长 URL 已返回 404；当前 2026 官方 Machine Learning, Data Science and AI 页面有一个完整 Faculty 栏目，共 19 人。",
  },
  "https://www.diag.uniroma1.it/en/people/faculty": {
    officialRosterCount: 134,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.diag.uniroma1.it/persone/docenti",
    artifactPath: "data/official-rosters/sapienza-diag-docenti-2026-09-02.json",
    note: "原英文名录 URL 已返回 404；已冻结当前官方 Docenti 单表全部 134 行：ricercatore 41、associate 41、full 45、emeritus 5、honorary 1、Ambassador Sapienza 1，身份留待下一阶段分类。",
  },
  "https://www.cs.manchester.ac.uk/about/people/academic-and-research-staff/": {
    officialRosterCount: 111,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.manchester.ac.uk/about/people/academic-and-research-staff/",
    artifactPath: "data/official-rosters/manchester-computer-science-academic-research-staff-2026-09-02.json",
    note: "已冻结官方 A–Z 单页全部 111 行：Academic staff 97、Emeritus and honorary staff 14；页面没有分页或继续加载入口。",
  },
  "https://www.nactem.ac.uk/staff/": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://nactem.ac.uk/people.php",
    note: "旧 /staff/ 已迁移到当前 People 页面，但 NaCTeM 的 TLS 证书过期，浏览器与标准校验请求均拒绝直接读取。搜索索引能确认当前页面存在 Core staff、Visiting、Associated、PhD students 与 Alumni，但不能证明全部行数，因此不冻结人数。",
  },
  "https://www.informatik.kit.edu/english/people.php": {
    officialRosterCount: 69,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.informatik.kit.edu/english/5097.php",
    artifactPath: "data/official-rosters/kit-informatics-research-group-leaders-2026-09-02.json",
    note: "旧 People URL 返回 404；已遍历当前官方 Research Groups 的十张研究所表格，78 个研究组行合并为 69 位唯一教授/负责人，并保留跨研究所、多研究组身份及荣休栏目。",
  },
  "https://cvhci.iar.kit.edu/people.php": {
    officialRosterCount: 60,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cvhci.iar.kit.edu/people.php",
    artifactPath: "data/official-rosters/kit-cvhci-all-people-2026-09-02.json",
    note: "已冻结 People 页五张表全部 60 人：Director 1、Secretary 1、Academic Staff 12、External Ph.D. Students 2、Alumni 44；后续再逐人排除非 PI 与历史人员。",
  },
  "https://www.tudelft.nl/en/eemcs/the-faculty/departments": {
    officialRosterCount: 83,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.tudelft.nl/en/eemcs/the-faculty/professors",
    artifactPath: "data/official-rosters/tudelft-eemcs-professors-2026-09-02.json",
    note: "原 scope 页是院系说明而非人物名录；已冻结其官方 EEMCS Professors 总览全部 83 张教授卡：Electrical Engineering 11、Microelectronics 22、Quantum & Computer Engineering 6、Mathematics 17、Intelligent Systems 14、Software Technology 13。",
  },
};
