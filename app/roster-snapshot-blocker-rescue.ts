/**
 * Independent first-party roster snapshot proposals for formerly blocked units.
 *
 * This file is deliberately not wired into the shared 124-unit ledger. It lets
 * the parent audit merge complete snapshots atomically while preserving exact
 * failure evidence for units that still cannot be frozen without guessing.
 */

export type BlockerRescueSnapshot = {
  officialRosterCount: number | null;
  snapshotAt: "2026-09-02";
  fetchStatus: "complete" | "partial";
  sourceDataUrl: string;
  artifactPath?: string;
  note: string;
  attemptedOfficialEndpoints?: Array<{
    url: string;
    result: string;
  }>;
};

export const blockerRescueRosterSnapshots: Record<string, BlockerRescueSnapshot> = {
  "https://scs.bupt.edu.cn/szdw/jsml.htm": {
    officialRosterCount: 224,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "http://scs.bupt.edu.cn/szjs1/jsyl.htm",
    artifactPath: "data/official-rosters/bupt-cs-complete-faculty-2026-09-02.json",
    note: "原 scope URL 已迁移。当前官方教师一览可通过校方 HTTP/移动兼容响应完整读取；已冻结全部 16 个研究中心表格，共 225 条中心成员记录、224 个唯一官方人物记录。戴志涛为同一官方 profile 的跨栏目重复；两条同名王玉龙记录对应不同官方 profile，未擅自合并。",
    attemptedOfficialEndpoints: [
      {
        url: "https://scs.bupt.edu.cn/szjs1/jsyl.htm",
        result: "返回约 2.5 KB 的校方 JavaScript WAF 挑战空壳。",
      },
      {
        url: "http://scs.bupt.edu.cn/szjs1/jsyl.htm",
        result: "使用移动兼容请求返回约 56 KB 的完整官方教师一览 HTML。",
      },
    ],
  },
  "https://ai.bupt.edu.cn/szdw.htm": {
    officialRosterCount: 141,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "http://ai.bupt.edu.cn/szdw/szyl/znxxgcx.htm",
    artifactPath: "data/official-rosters/bupt-ai-complete-faculty-2026-09-02.json",
    note: "通过学院官方师资一览导航遍历全部四个栏目及 17 个分页：智能信息工程系 73、智能科学与技术系 51、脑认知与智能医学系 13、实验中心 4，共 141 张唯一人物卡片。本阶段不预先排除博士后、实验人员或非独立 PI。",
    attemptedOfficialEndpoints: [
      {
        url: "https://ai.bupt.edu.cn/szdw/szyl/znxxgcx.htm",
        result: "返回约 2.5 KB 的校方 JavaScript WAF 挑战空壳。",
      },
      {
        url: "http://ai.bupt.edu.cn/szdw/szyl/znxxgcx.htm",
        result: "使用移动兼容请求返回官方目录及完整分页元数据；随后逐页冻结四个栏目。",
      },
    ],
  },
  "https://csse.szu.edu.cn/pages/user/index": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://csse.szu.edu.cn/pages/teacherTeam/index?sx=8",
    note: "无法从当前官网取得可逐人复核的完整目录，因此不冻结搜索索引显示的 128 名专任教师，也不把职称筛选数字相加后猜数。HTTPS、HTTP、移动请求和浏览器执行均停留在同一校方 JavaScript WAF 空壳；官方 robots.txt 为空，sitemap.xml 返回校方 Page Not Found。",
    attemptedOfficialEndpoints: [
      {
        url: "https://csse.szu.edu.cn/pages/user/index",
        result: "返回约 2.5 KB 的 JavaScript WAF 挑战空壳。",
      },
      {
        url: "https://csse.szu.edu.cn/pages/teacherTeam/index?sx=8",
        result: "当前官方师资页；HTTPS、HTTP 和移动请求均返回约 2.5 KB WAF 空壳。",
      },
      {
        url: "https://csse.szu.edu.cn/robots.txt",
        result: "官方响应为空。",
      },
      {
        url: "https://csse.szu.edu.cn/sitemap.xml",
        result: "官方响应为 Page Not Found，未暴露人物目录。",
      },
    ],
  },
  "https://www.a-star.edu.sg/i2r/research-capabilities": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://www.a-star.edu.sg/iaic",
    note: "I²R 官方首页明确写明已成为 A*STAR Institute of Advanced Intelligence and Computing (IAIC)。新 IAIC 官网导航仅公开 About、Management、Sector Focus、Research Capabilities、News 与 Contact，没有全体研究人员目录。Management 页可完整读取 25 个管理岗位展示项（其中含 Vacant），但它不是全体人员名录，不能替代原 I²R 名录，因此不冻结人数。",
    attemptedOfficialEndpoints: [
      {
        url: "https://www.a-star.edu.sg/i2r",
        result: "官方页面明确显示 ‘We are now the A*STAR Institute of Advanced Intelligence and Computing (A*STAR IAIC).’",
      },
      {
        url: "https://www.a-star.edu.sg/iaic/management",
        result: "公开 25 个管理岗位展示项，但没有全体研究人员分页或目录入口。",
      },
      {
        url: "https://www.a-star.edu.sg/iaic/capabilities",
        result: "研究能力页面，不是逐人名录。",
      },
    ],
  },
  "https://www.a-star.edu.sg/ihpc/research-capabilities": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://www.a-star.edu.sg/iaic",
    note: "IHPC 官方首页同样明确写明已成为 IAIC。当前 IAIC 官网没有全体研究人员目录；25 项 Management 展示不能代表原 IHPC 或新 IAIC 的完整研究人员，故不冻结人数，也不使用旧缓存或第三方名单拼接。",
    attemptedOfficialEndpoints: [
      {
        url: "https://www.a-star.edu.sg/ihpc",
        result: "官方页面明确显示 ‘We are now the A*STAR Institute of Advanced Intelligence and Computing (A*STAR IAIC).’",
      },
      {
        url: "https://www.a-star.edu.sg/iaic/management",
        result: "仅管理层/职能负责人目录，不是全体研究人员名录。",
      },
      {
        url: "https://www.a-star.edu.sg/iaic/about-iaic",
        result: "机构介绍页面，没有人员分页或全体员工列表。",
      },
    ],
  },
};
