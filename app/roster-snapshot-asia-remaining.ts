/**
 * Independently verified snapshot proposals for the remaining Asia workstream.
 * Keys remain the original 124-unit scope URLs; sourceDataUrl records the
 * current official directory used when a scoped URL is obsolete.
 *
 * This file is intentionally not wired into the shared ledger so the parent
 * audit task can merge the records atomically.
 */

export type AsiaVerifiedRosterSnapshot = {
  officialRosterCount: number | null;
  snapshotAt: string;
  fetchStatus: "complete" | "partial";
  sourceDataUrl: string;
  artifactPath?: string;
  note: string;
};

export const asiaRemainingRosterSnapshots: Record<string, AsiaVerifiedRosterSnapshot> = {
  "https://scs.bupt.edu.cn/szdw/jsml.htm": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://scs.bupt.edu.cn/szjs1/jsyl.htm",
    note: "原 scope URL 已迁移到当前教师一览，但 2026-09-02 的 HTTPS/HTTP 直连和浏览器读取均只返回校方 JavaScript WAF 挑战空壳。搜索索引可见一份约1.2年前抓取的完整栏目文本，但不能证明当前名录，故不冻结人数、不把旧索引当快照。",
  },
  "https://ai.bupt.edu.cn/szdw.htm": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://ai.bupt.edu.cn/szdw/szyl/znxxgcx.htm",
    note: "学院官网把师资拆为智能信息工程系、智能科学与技术系、智能控制系、脑认知与智能医学系、实验中心并含多页；2026-09-02 直连和浏览器均被校方 JavaScript WAF 阻断。搜索索引只覆盖部分分页且抓取时间约1.2年前，因此不拼接、不猜总数。",
  },
  "https://csse.szu.edu.cn/pages/user/index": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://csse.szu.edu.cn/pages/teacherTeam/index",
    note: "当前官方师资页公开职称/研究中心筛选和人员规模说明，但 2026-09-02 直连与浏览器只返回 JavaScript WAF 空壳。搜索索引显示专任教师128人与职称筛选合计131人相互冲突，且无法逐页取得当前全部人物链接，因此不冻结人数。",
  },
  "https://cs.hust.edu.cn/szdw/js.htm": {
    officialRosterCount: 163,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "http://www.cs.hust.edu.cn/szdw/jsml/axmpyszmlb.htm",
    artifactPath: "data/official-rosters/hust-cs-alphabetical-faculty-2026-09-02.json",
    note: "原 scope URL 返回校方 404；已从当前官方按姓名拼音首字母列表完整冻结 B–Z 全部 163 位人物。实验工程人员与博士后在官网为独立目录，未混入本单位。",
  },
  "https://sse.hust.edu.cn/szdw.htm": {
    officialRosterCount: 38,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://sse.hust.edu.cn/szdw1/js_yjy.htm",
    artifactPath: "data/official-rosters/hust-sse-full-time-faculty-2026-09-02.json",
    note: "完整遍历教授/研究员 14、副教授两页 21、讲师 3，共 38 位。学院概况仍写 39 人（讲师 4），与当前逐人目录相差 1 人；快照冻结可逐人核对的当前目录，不猜补缺名。",
  },
  "https://aia.hust.edu.cn/szdw.htm": {
    officialRosterCount: 125,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://aia.hust.edu.cn/szdw/xysz/axlb.htm",
    artifactPath: "data/official-rosters/hust-aia-department-faculty-2026-09-02.json",
    note: "原 scope URL 返回校方 404；已从当前官方按系列表逐系冻结全部正高、副高、中级教师。杰出学者、实验工程、博士后及荣休教师为独立栏目，未混入本单位。",
  },
  "https://cc.nankai.edu.cn/szdw/list.htm": {
    officialRosterCount: 98,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cc.nankai.edu.cn/jswyjy/list.htm",
    artifactPath: "data/official-rosters/nankai-cs-full-faculty-2026-09-02.json",
    note: "原综合师资 URL 已失效；已从当前官方导航完整冻结教授/研究员 46、副教授/副研究员 42、讲师 10，共 98 位。实验教学、博后、兼职与退休人员为独立目录。",
  },
  "https://ai.nankai.edu.cn/szdw/list.htm": {
    officialRosterCount: 69,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ai.nankai.edu.cn/szdw/js_yjy_.htm",
    artifactPath: "data/official-rosters/nankai-ai-full-faculty-2026-09-02.json",
    note: "完整冻结当前官方教授/研究员 39、副教授/副研究员 23、讲师 7，共 69 位；实验教学、博士后、兼职与荣休人员为独立目录。",
  },
};
