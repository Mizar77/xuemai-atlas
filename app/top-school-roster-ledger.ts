import { topSchoolRosterScope } from "./top-school-roster-scope";
import { asiaRemainingRosterSnapshots } from "./roster-snapshot-asia-remaining";
import { blockerRescueRosterSnapshots } from "./roster-snapshot-blocker-rescue";
import { berkeleyUclRescueRosterSnapshots } from "./roster-snapshot-berkeley-ucl-rescue";
import { europeARosterSnapshotProposals } from "./roster-snapshot-europe-a";
import { europeBUsRosterSnapshots } from "./roster-snapshot-europe-b-us";
import { newRosterPersonAudits } from "./roster-person-audits-new";

export type RosterAuditDecision =
  | "included"
  | "candidate_new_pi"
  | "excluded_non_ai_cs"
  | "excluded_non_pi"
  | "excluded_historical"
  | "excluded_industry_only"
  | "excluded_insufficient_scope_evidence"
  | "excluded_duplicate"
  | "pending_profile_verification"
  | "pending_portrait";

export type RosterPersonAudit = {
  unitUrl: string;
  rosterName: string;
  decision: RosterAuditDecision;
  atlasPersonId?: string;
  reason: string;
  evidenceUrl: string;
  reviewedAt: string;
};

export type RosterUnitSnapshot = {
  unitUrl: string;
  officialRosterCount: number | null;
  snapshotAt: string | null;
  fetchStatus: "not_started" | "partial" | "complete";
  sourceDataUrl?: string;
  artifactPath?: string;
  note: string;
};

export type RosterUnitAudit = RosterUnitSnapshot & {
  checkedCount: number;
  includedCount: number;
  candidateCount: number;
  excludedCount: number;
  excludedByReason: Partial<Record<RosterAuditDecision, number>>;
  pendingCount: number | null;
  decisions: RosterPersonAudit[];
  status: "pending_snapshot" | "in_progress" | "complete";
};

export const rosterDecisionLabels: Record<RosterAuditDecision, string> = {
  included: "纳入图谱",
  candidate_new_pi: "新 PI 候选：待补全资料与头像",
  excluded_non_ai_cs: "排除：非 AI/CS 主线",
  excluded_non_pi: "排除：非独立 PI",
  excluded_historical: "排除：非现任",
  excluded_industry_only: "排除：仅工业界任职",
  excluded_insufficient_scope_evidence: "暂不纳入：缺少足够的范围或独立 PI 证据",
  excluded_duplicate: "排除：重复名录项",
  pending_profile_verification: "待核：个人主页/现职",
  pending_portrait: "待核：可靠头像",
};

const include = (
  unitUrl: string,
  rosterName: string,
  atlasPersonId: string,
  evidenceUrl: string,
): RosterPersonAudit => ({
  unitUrl,
  rosterName,
  atlasPersonId,
  decision: "included",
  reason: "官方院系名录与个人主页确认其为现任、可独立招生或领导研究组的 AI/CS PI。",
  evidenceUrl,
  reviewedAt: "2026-09-02",
});

/**
 * Person-level decisions already made in the three institution-first audit
 * rounds.  Older atlas records are intentionally not counted as checked until
 * they are reconciled against one exact roster unit; this prevents an
 * institution-level affiliation from being mistaken for a completed roster.
 */
const legacyTopSchoolRosterPersonAudits: RosterPersonAudit[] = [
  include("https://www.cs.umd.edu/people/faculty", "Furong Huang", "furong-huang-top", "https://www.cs.umd.edu/people/faculty/furong-huang"),
  include("https://www.cs.wisc.edu/people/faculty-2/", "Yixuan Li", "yixuan-li-top", "https://pages.cs.wisc.edu/~sharonli/"),
  include("https://www.cis.upenn.edu/faculty/", "Dan Roth", "dan-roth-top", "https://www.cis.upenn.edu/~danroth/"),
  include("https://www.cs.usc.edu/faculty/", "Xiang Ren", "xiang-ren-top", "https://www.cs.usc.edu/directory/faculty/profile/?lname=Ren&fname=Xiang"),
  include("https://cse.seu.edu.cn/szdw_48203/list.htm", "张敏灵", "minling-zhang-top", "https://palm.seu.edu.cn/zhangml/"),
  include("https://cc.nankai.edu.cn/szdw/list.htm", "程明明", "mingming-cheng-top", "https://mmcheng.net/cmm/"),
  include("https://www.imperial.ac.uk/computing/people/academic-staff/", "Jiankang Deng", "jiankang-deng-top", "https://www.imperial.ac.uk/people/j.deng16"),
  include("https://di.ku.dk/english/staff/?pure=en/persons", "Isabelle Augenstein", "isabelle-augenstein-top", "https://isabelle-augenstein.github.io/"),
  include("https://www.ifi.lmu.de/institut/index.html", "Barbara Plank", "barbara-plank-top", "https://bplank.github.io/"),
  include("https://www.aalto.fi/en/department-of-computer-science/people", "Samuel Kaski", "samuel-kaski-top", "https://www.aalto.fi/en/people/samuel-kaski"),
  include("https://ece.hku.hk/people/", "Xiaojuan Qi", "xiaojuan-qi-top", "https://ece.hku.hk/people/xjqi/"),
  include("https://www.comp.nus.edu.sg/about/faculty/", "Gim Hee Lee", "gim-hee-lee-top", "https://www.comp.nus.edu.sg/~leegh/"),
  include("https://computing.smu.edu.sg/faculty", "Zhiguang Cao", "zhiguang-cao-top", "https://computing.smu.edu.sg/faculty/profile/zhiguang-cao"),

  include("https://engineering.virginia.edu/department/computer-science/people", "Aidong Zhang", "aidong-zhang-uva", "https://engineering.virginia.edu/faculty/aidong-zhang"),
  include("https://engineering.virginia.edu/department/computer-science/people", "Yangfeng Ji", "yangfeng-ji-uva", "https://engineering.virginia.edu/faculty/yangfeng-ji"),
  include("https://engineering.virginia.edu/department/computer-science/people", "Jundong Li", "jundong-li-uva", "https://engineering.virginia.edu/faculty/jundong-li"),
  include("https://faculty.uestc.edu.cn/xylb.jsp?id=2031&lang=zh_CN&st=0&urltype=tsites.CollegeTeacherList&wbtreeid=1035", "申恒涛", "hengtao-shen-uestc", "https://faculty.uestc.edu.cn/shenhengtao/zh_CN/index.htm"),
  include("https://faculty.uestc.edu.cn/xylb.jsp?id=2031&lang=zh_CN&st=0&urltype=tsites.CollegeTeacherList&wbtreeid=1035", "沈复民", "fumin-shen-uestc", "https://faculty.uestc.edu.cn/shenfumin/zh_CN/index.htm"),
  include("https://informatics.tuwien.ac.at/people/professors", "Thomas Lukasiewicz", "thomas-lukasiewicz-tuwien", "https://informatics.tuwien.ac.at/people/thomas-lukasiewicz"),
  include("https://informatics.tuwien.ac.at/people/professors", "Thomas Gärtner", "thomas-gaertner-tuwien", "https://informatics.tuwien.ac.at/people/thomas-gaertner"),
  include("https://www.eduhk.hk/mit/en/people.php", "Ferrante Neri", "ferrante-neri-eduhk", "https://www.eduhk.hk/en/experts/professor-neri-ferrante"),
  include("https://www.eduhk.hk/mit/en/people.php", "Yu Yang", "yu-yang-eduhk", "https://www.eduhk.hk/mit/zht/staff/yangyy"),
  include("https://www.hkmu.edu.hk/st/people/key-staff/", "Philips Wang", "philips-wang-hkmu", "https://www.hkmu.edu.hk/st/people/key-staff/staff-profile/?email=pwang&unit=ST&po=N"),
  include("https://www.singaporetech.edu.sg/directory/faculty", "Indriyati Atmosukarto", "indriyati-atmosukarto-sit", "https://www.singaporetech.edu.sg/directory/faculty/indriyati-atmosukarto"),

  include("https://siebelschool.illinois.edu/about/people/all-faculty", "Jiawei Han", "jiawei-han-uiuc", "https://grainger.illinois.edu/about/directory/faculty/hanj"),
  include("https://ece.ucsd.edu/people/faculty", "Nuno Vasconcelos", "nuno-vasconcelos-ucsd", "https://jacobsschool.ucsd.edu/people/profile/nuno-vasconcelos"),
  include("https://ic.gatech.edu/people/faculty", "Mark Riedl", "mark-riedl-gatech", "https://www.cc.gatech.edu/people/mark-riedl"),
  include("https://sse.hust.edu.cn/szdw.htm", "白翔", "xiang-bai-hust", "https://sse.hust.edu.cn/info/1083/3520.htm"),
  include("https://ai.szu.edu.cn/szdw/js.htm", "沈琳琳", "linlin-shen-szu", "https://ai.szu.edu.cn/info/1073/1623.htm"),
  include("https://www.surrey.ac.uk/centre-vision-speech-signal-processing/people", "Adrian Hilton", "adrian-hilton-surrey", "https://www.surrey.ac.uk/people/adrian-hilton"),
  include("https://www.surrey.ac.uk/centre-vision-speech-signal-processing/people", "Josef Kittler", "josef-kittler-surrey", "https://www.surrey.ac.uk/people/josef-kittler"),
  include("https://cvhci.iar.kit.edu/people.php", "Rainer Stiefelhagen", "rainer-stiefelhagen-kit", "https://cvhci.iar.kit.edu/people_596.php"),
  include("https://www.nactem.ac.uk/staff/", "Sophia Ananiadou", "sophia-ananiadou-manchester", "https://research.manchester.ac.uk/en/persons/sophia-ananiadou/"),
  include("https://www.aalto.fi/en/department-of-computer-science/machine-learning-data-science-and-artificial-intelligence", "Pekka Marttinen", "pekka-marttinen-aalto", "https://www.aalto.fi/en/people/pekka-marttinen"),
  include("https://scholars.ln.edu.hk/en/organisations/division-of-artificial-intelligence/persons/", "Haoran Xie", "haoran-xie-lingnan", "https://scholars.ln.edu.hk/en/persons/haoran-xie/"),
  include("https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/", "Hai Liu", "hai-liu-hsuhk", "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/?staffId=930"),
  include("https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/", "Na Zhao", "na-zhao-sutd", "https://www.sutd.edu.sg/profile/zhao-na/"),
  include("https://www.tudelft.nl/en/eemcs/the-faculty/departments", "Frans A. Oliehoek", "frans-oliehoek-tudelft", "https://research.tudelft.nl/en/persons/fa-oliehoek/"),
  include("https://www.suss.edu.sg/academics/schools-college/faculty-listing?schools=school-of-science-and-technology", "Bheema Thiagarajan Lokesh", "bheema-lokesh-suss", "https://www.suss.edu.sg/academics/schools-college/faculty-listing/detail/dr-bheema-thiagarajan-lokesh"),
  include("https://www.duke-nus.edu.sg/daisi/people/faculty", "Nan Liu", "nan-liu-duke-nus", "https://www.duke-nus.edu.sg/directory/detail/liu-nan"),
];

const normalizedAuditName = (value: string) => value
  .replace(/^(prof(?:essor)?|dr)\.?\s+/iu, "")
  .replace(/\s*\([^)]*\)\s*$/u, "")
  .normalize("NFKD")
  .replace(/[^a-z0-9\p{Script=Han}]/giu, "")
  .toLocaleLowerCase();

const newlyAuditedUnitUrls = new Set(newRosterPersonAudits.map((audit) => audit.unitUrl));
const newRosterAuditKeys = new Set(newRosterPersonAudits.map((audit) => `${audit.unitUrl}:${normalizedAuditName(audit.rosterName)}`));
const partialReplacementUnitUrls = new Set([
  "https://siebelschool.illinois.edu/about/people/all-faculty",
]);

/**
 * Most imported decision files replace a unit's legacy sample completely. UIUC
 * is the explicit exception: its batch covered the 250 still-unreviewed cards,
 * so the earlier Jiawei Han decision remains part of the frozen 251-person set.
 */
export const topSchoolRosterPersonAudits: RosterPersonAudit[] = [
  ...legacyTopSchoolRosterPersonAudits.filter((audit) => {
    if (!newlyAuditedUnitUrls.has(audit.unitUrl)) return true;
    return partialReplacementUnitUrls.has(audit.unitUrl)
      && !newRosterAuditKeys.has(`${audit.unitUrl}:${normalizedAuditName(audit.rosterName)}`);
  }),
  ...newRosterPersonAudits,
];

/**
 * A roster total is frozen only after every visible person on that official
 * page has a person-level decision.  No inferred totals are allowed.
 */
const snapshotOverrides: Record<string, Omit<RosterUnitSnapshot, "unitUrl">> = {
  ...asiaRemainingRosterSnapshots,
  ...blockerRescueRosterSnapshots,
  ...Object.fromEntries(
    europeARosterSnapshotProposals.map(({ unitUrl, ...snapshot }) => [unitUrl, snapshot]),
  ),
  ...europeBUsRosterSnapshots,
  ...berkeleyUclRescueRosterSnapshots,
  "https://www.cs.cmu.edu/directory/all": {
    officialRosterCount: 507,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.cmu.edu/directory/api/v1/all.json",
    artifactPath: "data/official-rosters/cmu-scs-2026-09-02.json",
    note: "已冻结 CMU SCS 官方目录中 aff=Faculty 的 507 条记录；原始逐人快照保存在 data/official-rosters/cmu-scs-2026-09-02.json。目录接口生成于 2026-09-01。",
  },
  "https://siebelschool.illinois.edu/about/people/all-faculty": {
    officialRosterCount: 251,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://siebelschool.illinois.edu/about/people/all-faculty",
    artifactPath: "data/official-rosters/uiuc-siebel-all-faculty-2026-09-02.json",
    note: "已冻结 Siebel School 官方 All Faculty 页面全部 251 张人物卡；页面无分页，官方 ID 与 NetID 均唯一。",
  },
  "https://ece.illinois.edu/about/directory/faculty": {
    officialRosterCount: 226,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ece.illinois.edu/about/directory/faculty",
    artifactPath: "data/official-rosters/uiuc-ece-all-faculty-2026-09-02.json",
    note: "已冻结 UIUC ECE 官方 All Faculty 页面全部 226 张人物卡；页面无分页，官方 ID 与 NetID 均唯一。",
  },
  "https://www.cs.stanford.edu/people/faculty": {
    officialRosterCount: 95,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.stanford.edu/people/faculty",
    artifactPath: "data/official-rosters/stanford-cs-faculty-2026-09-02.json",
    note: "已跟随 Stanford CS 官方 Drupal 无限滚动分页抓取第 0–2 页，共 95 张 Faculty 人物卡；第 3 页起为空。",
  },
  "https://ee.stanford.edu/people/faculty": {
    officialRosterCount: 150,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ee.stanford.edu/people/faculty",
    artifactPath: "data/official-rosters/stanford-ee-all-faculty-2026-09-02.json",
    note: "已通过 Stanford EE 官方筛选表单选择 Type=All、Limit=150，冻结全部 150 条记录；包含 active、courtesy、incoming 与 emeritus，后续逐人分类时再区分。",
  },
  "https://ai.stanford.edu/faculty/": {
    officialRosterCount: 63,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ai.stanford.edu/faculty/",
    artifactPath: "data/official-rosters/stanford-sail-faculty-2026-09-02.json",
    note: "已冻结 SAIL 当前官方 Faculty 页面 63 人：Faculty 32、Affiliated Faculty 26、Former & Emeritus 5；三类原样保留，后续再作收录/历史分类。",
  },
  "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus": {
    officialRosterCount: 132,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.csail.mit.edu/api-proxy/angular-solr",
    artifactPath: "data/official-rosters/mit-csail-faculty-pi-2026-09-02.json",
    note: "已通过 CSAIL 官方 Angular/Solr 目录接口按官网 Faculty 入口的四类角色抓取 132 人：Principal Investigators、Core/Dual、Associates、Emeritus；API numFound 与返回记录数一致。",
  },
  "https://www.cs.umd.edu/people/faculty": {
    officialRosterCount: 176,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.umd.edu/people/faculty",
    artifactPath: "data/official-rosters/umd-cs-all-faculty-2026-09-02.json",
    note: "已冻结 UMD CS 官方单页名录全部 176 人：CS Faculty 93、Emeritus Faculty 18、Adjunct Faculty 24、Affiliate Faculty 39、Post Doctoral Scientists/Research Assistants 2；官方类别原样保留，后续逐人分类。",
  },
  "https://www.umiacs.umd.edu/our-experts/faculty": {
    officialRosterCount: 129,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.umiacs.umd.edu/our-experts/faculty",
    artifactPath: "data/official-rosters/umd-umiacs-faculty-2026-09-02.json",
    note: "已冻结 UMIACS 官方 Faculty 页面全部 129 张人物卡；页面没有分页或继续加载入口。原入口已重定向至 /our-experts/faculty，快照使用规范地址。",
  },
  "https://cse.ucsd.edu/people/faculty-profiles": {
    officialRosterCount: 178,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cse.ucsd.edu/people/faculty-profiles",
    artifactPath: "data/official-rosters/ucsd-cse-faculty-profiles-2026-09-02.json",
    note: "已冻结 UCSD CSE Faculty Profiles 页面 178 个唯一人物：Department Leadership 5、Faculty 77、Continuing Lecturers 10、Researchers 1、Adjunct 8、Affiliated 45、Emeritus 19、Alumni 13；类别原样保留待逐人分类。",
  },
  "https://ece.ucsd.edu/people/faculty": {
    officialRosterCount: 61,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ece.ucsd.edu/people/faculty",
    artifactPath: "data/official-rosters/ucsd-ece-faculty-2026-09-02.json",
    note: "已冻结 UCSD ECE 官方 Faculty 页面全部 61 张人物卡；页面无分页或继续加载入口。",
  },
  "https://www.cc.gatech.edu/people/faculty": {
    officialRosterCount: 230,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cc.gatech.edu/people/faculty",
    artifactPath: "data/official-rosters/gatech-college-computing-faculty-2026-09-02.json",
    note: "已跟随 Georgia Tech College of Computing 官方分页从 page=0 抓取至最后一页 page=19，共 230 张人物卡；前 19 页各 12 人，末页 2 人。",
  },
  "https://ic.gatech.edu/people/faculty": {
    officialRosterCount: 59,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ic.gatech.edu/people/faculty",
    artifactPath: "data/official-rosters/gatech-interactive-computing-faculty-2026-09-02.json",
    note: "已冻结 Georgia Tech School of Interactive Computing 官方 Faculty 页面全部 59 张人物卡；页面无分页或继续加载入口。",
  },
  "https://www.cs.jhu.edu/faculty/": {
    officialRosterCount: 77,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.jhu.edu/wp-json/wp/v2/people?per_page=100&_fields=id,slug,link,title,meta",
    artifactPath: "data/official-rosters/jhu-cs-faculty-2026-09-02.json",
    note: "已冻结 JHU CS 官方 Faculty 页面 77 人；官方 WordPress People API 同样返回 77 条。页面 rel=next 指向的归档页重复同一批记录，不作为新增名单。",
  },
  "https://www.clsp.jhu.edu/faculty/": {
    officialRosterCount: 30,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.clsp.jhu.edu/faculty/",
    artifactPath: "data/official-rosters/jhu-clsp-current-faculty-2026-09-02.json",
    note: "已冻结 JHU CLSP 官方现任 Faculty 页面全部 30 人；Affiliated Faculty 与 Former Faculty 是独立页面，未混入现任名录。原 /people/ 入口已修正为 /faculty/。",
  },
  "https://www.cis.upenn.edu/faculty/": {
    officialRosterCount: 121,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cis.upenn.edu/faculty/",
    artifactPath: "data/official-rosters/upenn-cis-faculty-2026-09-02.json",
    note: "已冻结 Penn CIS 官方 Faculty 页面全部 121 人：Primary Faculty 68、Secondary Faculty 46、Emeritus and Adjunct Faculty 7；三个官方分组原样保留。",
  },
  "https://www.grasp.upenn.edu/role/faculty/": {
    officialRosterCount: 42,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.grasp.upenn.edu/wp-json/wp/v2/people",
    artifactPath: "data/official-rosters/upenn-grasp-faculty-2026-09-02.json",
    note: "已通过 GRASP 官方 Role taxonomy 冻结 42 个唯一人物；Faculty 标签 38 人、Secondary 标签 16 人，其中 12 人同时属于两类，已保留双重类别但不重复计数。",
  },
  "https://www.cs.wisc.edu/people/faculty-2/": {
    officialRosterCount: 128,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.wisc.edu/wp-json/wp/v2/uw_staff",
    artifactPath: "data/official-rosters/wisc-cs-faculty-2026-09-02.json",
    note: "已通过 UW–Madison CS 官方 WordPress 人员接口冻结 128 人：Core Faculty 54、Teaching Faculty 21、Instructors 1、Affiliate Faculty 32、Emeritus Faculty 20；五类无重复，均原样保留待后续逐人分类。",
  },
  "https://www.cs.utexas.edu/people": {
    officialRosterCount: 127,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.utexas.edu/people",
    artifactPath: "data/official-rosters/utexas-cs-faculty-researchers-2026-09-02.json",
    note: "已冻结 UT Austin CS 官方 Faculty & Researchers 目录 127 人：主名录 109、Affiliated Faculty 18；单页无分页，后续再逐人区分独立 PI、教学岗、附属与历史身份。",
  },
  "https://www.ece.utexas.edu/people/faculty": {
    officialRosterCount: 109,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.ece.utexas.edu/people/faculty",
    artifactPath: "data/official-rosters/utexas-ece-faculty-2026-09-02.json",
    note: "已冻结 Texas ECE 官方 Faculty 目录全部 109 张人物卡；页面无分页，职称与官方头像链接已保留待逐人分类。",
  },
  "https://www.cs.cornell.edu/directory?department=15": {
    officialRosterCount: 143,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.cornell.edu/directory?department=15",
    artifactPath: "data/official-rosters/cornell-cs-faculty-2026-09-02.json",
    note: "已将 Cornell Bowers 官方教师目录限定为 Computer Science，跟随全部 8 页冻结 143 张唯一人物卡；前 7 页各 20 人，末页 3 人。",
  },
  "https://tech.cornell.edu/people/faculty/": {
    officialRosterCount: 53,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://tech.cornell.edu/people/faculty/",
    artifactPath: "data/official-rosters/cornell-tech-faculty-2026-09-02.json",
    note: "已冻结 Cornell Tech 官方 Faculty 页面全部 53 人：Faculty 51、Affiliated Faculty 2；官方分组原样保留待后续逐人分类。",
  },
  "https://samueli.ucla.edu/search-faculty/#cs": {
    officialRosterCount: 78,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://samueli.ucla.edu/wp-admin/admin-ajax.php",
    artifactPath: "data/official-rosters/ucla-cs-faculty-2026-09-02.json",
    note: "已调用 UCLA Samueli 官方教师搜索接口并限定 department=cs，冻结 78 个唯一人物；各类别原始卡片合计 82，领导职务与 Core 重复 4 人，已保留多类别但不重复计数。",
  },
  "https://samueli.ucla.edu/search-faculty/#ece": {
    officialRosterCount: 96,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://samueli.ucla.edu/wp-admin/admin-ajax.php",
    artifactPath: "data/official-rosters/ucla-ece-faculty-2026-09-02.json",
    note: "已调用 UCLA Samueli 官方教师搜索接口并限定 department=ece，冻结 96 个唯一人物；各类别原始卡片合计 102，领导职务与 Core 重复 6 人，已保留多类别但不重复计数。",
  },
  "https://cs.nyu.edu/dynamic/people/faculty/": {
    officialRosterCount: 122,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cs.nyu.edu/dynamic/people/faculty/",
    artifactPath: "data/official-rosters/nyu-cs-faculty-2026-09-02.json",
    note: "已冻结 NYU CS 官方教师页全部 122 人：Tenure-Track Faculty 92、Associated/Affiliated Faculty 30；单页无分页，原始分组已保留。",
  },
  "https://cds.nyu.edu/people/faculty/": {
    officialRosterCount: 149,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cds.nyu.edu/joint-faculty/",
    artifactPath: "data/official-rosters/nyu-cds-all-faculty-2026-09-02.json",
    note: "已遍历 NYU CDS 官方 Faculty 菜单的八类完整名录：Joint 28、Clinical 4、Faculty Fellows 14、Associated 9、Affiliated 86、Affiliated Shanghai 3、Visiting 1、Adjunct 5。原始 150 张卡片中 Todd Gureckis 跨两类重复，合并后冻结 149 位唯一人物；原始分类和八个来源页均保留在快照中。",
  },
  "https://www.cs.purdue.edu/people/faculty/index.html": {
    officialRosterCount: 150,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.purdue.edu/people/faculty/index.html",
    artifactPath: "data/official-rosters/purdue-cs-faculty-2026-09-02.json",
    note: "已冻结 Purdue CS 官方 Faculty 目录全部 150 人；原页同时包含 tenure-line、teaching、courtesy、adjunct、Indianapolis 与 emeritus 身份，全部保留待后续逐人分类。",
  },
  "https://www.cs.washington.edu/people/faculty-members/": {
    officialRosterCount: 264,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.washington.edu/people/faculty-members/",
    artifactPath: "data/official-rosters/uw-allen-school-all-faculty-2026-09-02.json",
    note: "已冻结 Allen School 四个官方栏目全部 264 个唯一人物：Current 94、Adjunct 50、Emeritus 18、Affiliate 102；四栏无重名，栏目身份完整保留。",
  },
  "https://www.ece.uw.edu/faculty/": {
    officialRosterCount: 243,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.ece.uw.edu/faculty/",
    artifactPath: "data/official-rosters/uw-ece-all-faculty-2026-09-02.json",
    note: "已冻结 UW ECE 四个官方栏目全部 243 个唯一人物：Faculty 60、Affiliate 124、Adjunct 38、Emeritus 22；原始卡片共 244，Ang Li 跨两栏重复一次，合并后保留双重栏目身份。",
  },
  "https://cse.engin.umich.edu/people/faculty/": {
    officialRosterCount: 161,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cse.engin.umich.edu/people/faculty/",
    artifactPath: "data/official-rosters/umich-cse-all-faculty-2026-09-02.json",
    note: "已从 Michigan CSE 官方 All Faculty A–Z 页面冻结全部 161 张人物卡片；未按 tenure、teaching、research、courtesy 或 emeritus 身份预先筛选。",
  },
  "https://robotics.umich.edu/people/faculty/": {
    officialRosterCount: 37,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://robotics.umich.edu/people/faculty/",
    artifactPath: "data/official-rosters/umich-robotics-faculty-2026-09-02.json",
    note: "已冻结 Michigan Robotics 官方 Faculty Directory 单页全部 37 张人物卡片；页面无分页，姓名、职称、研究方向、聚焦领域与官方头像链接均原样保留。",
  },
  "https://www.cs.usc.edu/faculty/": {
    officialRosterCount: 149,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.usc.edu/faculty/",
    artifactPath: "data/official-rosters/usc-cs-faculty-2026-09-02.json",
    note: "已冻结 USC Computer Science 官方 Faculty 单页全部 149 张卡片；practice、research、courtesy、adjunct、visiting 与 emeritus 等角色均保留，待后续逐人分类。",
  },
  "https://www.isi.edu/affiliated-faculty-scientists/": {
    officialRosterCount: 22,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.isi.edu/affiliated-faculty-scientists/",
    artifactPath: "data/official-rosters/usc-isi-affiliated-faculty-scientists-2026-09-02.json",
    note: "scope 中旧 /about/team/ 已返回 404；已迁移到 ISI 当前官方 Affiliated Faculty, Scientists, and Artists 名录并冻结全部 22 人。全体雇员 Directory 含行政人员与研究助理，不混入本院系教师/科学家名录口径。",
  },
  "https://engineering.virginia.edu/department/computer-science/people": {
    officialRosterCount: 89,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://engineering.virginia.edu/department/computer-science/people",
    artifactPath: "data/official-rosters/uva-cs-faculty-2026-09-02.json",
    note: "scope 中旧 departments 路径已返回 404；已迁移到当前 UVA CS People 页面，并在 Position = Any 的默认口径下冻结全部 89 张 faculty 卡片，包含 primary、joint、courtesy、teaching、visiting 与 emeritus 身份。",
  },
  "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm": {
    officialRosterCount: 129,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm",
    artifactPath: "data/official-rosters/thu-cs-full-time-faculty-2026-09-02.json",
    note: "scope 中旧详情页已返回 404；已迁移到计算机系当前 Directory of in-service faculty，按 6 个研究所及职级冻结全部 129 张卡片。实验技术人员也原样保留，后续逐人分类时再排除非独立 PI。",
  },
  "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm": {
    officialRosterCount: 111,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm",
    artifactPath: "data/official-rosters/thu-automation-faculty-2026-09-02.json",
    note: "scope 中旧 Faculty.htm 已返回 404；已迁移到自动化系当前教师目录，并抓取其指向的 8 个研究所/教学中心子页，共冻结 111 张唯一人物卡片。",
  },
  "https://air.tsinghua.edu.cn/airtd/yjtd.htm": {
    officialRosterCount: 39,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://air.tsinghua.edu.cn/airtd/yjtd.htm",
    artifactPath: "data/official-rosters/thu-air-research-team-2026-09-02.json",
    note: "已冻结清华 AIR 官方研究团队单页全部 39 人：教授/研究员 23、访问教授 6、科研工程师 10。页面中已明确写明曾任的人员也保留，后续再分类为非现任；科研工程师后续再判断是否独立 PI。",
  },
  "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm": {
    officialRosterCount: 195,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm",
    artifactPath: "data/official-rosters/pku-cs-all-faculty-2026-09-02.json",
    note: "scope 中旧详情页已返回 404；已迁移到计算机学院当前师资目录，完整抓取教研系列 10 页 119 张卡片、研究系列 10、教学系列 4、工程系列 5，并录入光荣退休 62 个官方姓名。五人同时出现在在职系列与退休名单，合并后冻结 195 个唯一人物。",
  },
  "https://www.cis.pku.edu.cn/szdw/zzjs.htm": {
    officialRosterCount: 49,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cis.pku.edu.cn/szdw/zzjs.htm",
    artifactPath: "data/official-rosters/pku-intelligence-all-faculty-2026-09-02.json",
    note: "scope 中旧学院概况链接已返回 404；已迁移到智能学院当前师资目录，抓取专职教师全部 5 页共 36 张卡片，并录入荣休教师 14 个官方姓名。迟惠生同时出现在两栏，合并后冻结 49 个唯一人物。",
  },
  "https://www.cs.sjtu.edu.cn/jiaoshiml.html": {
    officialRosterCount: 412,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.sjtu.edu.cn/active/ajax_teacher_list.html",
    artifactPath: "data/official-rosters/sjtu-cs-all-faculty-2026-09-02.json",
    note: "scope 中旧 Faculty.aspx 已跳转到学院首页；已迁移到当前教师名录，通过公开目录接口冻结 19 个研究所的 289 位唯一在册人物（308 条研究所成员关系），另录入访问、双聘及客座教师 9 人和退休教师 115 人。徐雷同时出现在访问与退休栏，合并后冻结 412 位唯一人物。",
  },
  "https://sai.sjtu.edu.cn/cn/faculty/zzjs": {
    officialRosterCount: 57,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://sai.sjtu.edu.cn/cn/faculty/zzjs",
    artifactPath: "data/official-rosters/sjtu-ai-all-faculty-2026-09-02.json",
    note: "scope 中原人工智能学院地址已返回 404；已迁移到学院当前师资页，冻结专职教师 45 人及双聘/客座教师 12 人，共 57 位唯一人物。单独的师资概览页重复同一批 45 位专职教师，仅用于交叉核验，不重复计数。",
  },
  "http://www.cs.zju.edu.cn/csen/27003/list.htm": {
    officialRosterCount: 223,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "http://www.cs.zju.edu.cn/csen/27003/list.htm",
    artifactPath: "data/official-rosters/zju-cs-all-directory-2026-09-02.json",
    note: "scope 中原 27025 路径实际为博士生会；已迁移到当前教师名录入口。该页一次性渲染 8 个研究所、中心及机关栏目共 224 条成员记录；金小刚跨两个研究所重复出现，合并后冻结 223 位唯一人物。实验中心和机关人员也先完整保留，待逐人分类时再记录排除原因。",
  },
  "http://www.cse.zju.edu.cn/39568/list.htm": {
    officialRosterCount: 108,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "http://www.cse.zju.edu.cn/39568/list.htm",
    artifactPath: "data/official-rosters/zju-control-all-faculty-2026-09-02.json",
    note: "scope 中原 people/faculty 路径为无效栏目；已迁移到控制学院当前“教师”页，完整冻结工业控制、智能系统与控制、智能感知与检测、工业智能与系统工程、控制装备及综合安全 5 个研究所的 108 位教师。",
  },
  "https://cs.nju.edu.cn/1651/list.htm": {
    officialRosterCount: 243,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cs.nju.edu.cn/2639/listm.htm",
    artifactPath: "data/official-rosters/nju-cs-all-personnel-2026-09-02.json",
    note: "scope 中原 szll 路径已返回 404；已迁移到当前师资队伍入口，并逐一抓取教授、副教授、准长聘、跨学科博导、讲师/科研/博士后、高级工程师、专业技术、行政管理及两类离退休人员共 10 个官方栏目，冻结 243 位人物。非独立 PI 和退休身份留待下一阶段逐人分类。",
  },
  "https://ai.nju.edu.cn/people/list.htm": {
    officialRosterCount: 52,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ai.nju.edu.cn/people/list.htm",
    artifactPath: "data/official-rosters/nju-ai-all-personnel-2026-09-02.json",
    note: "scope 中原 xygk/szdw 路径已返回 404；已迁移到人工智能学院当前教职工名录。单页完整呈现教师 33、专职科研/博士后 5、行政管理人员 14，共冻结 52 位人物。",
  },
  "https://cs.ustc.edu.cn/zgj_23225/list.htm": {
    officialRosterCount: 110,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cs.ustc.edu.cn/js_23235/list.htm",
    artifactPath: "data/official-rosters/ustc-cs-all-faculty-2026-09-02.json",
    note: "scope 中原链接为已失效的旧文章页；已迁移到当前师资队伍入口并遍历全部 9 个官方分类及分页，冻结院士 2、教授 32、特任教授 18、特任研究员 1、副教授 36、特任副研究员 11、讲师 1、博士后 0、兼职教授/博导 9，共 110 人。",
  },
  "https://saids.ustc.edu.cn/szdw/list.htm": {
    officialRosterCount: 29,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://saids.ustc.edu.cn/zjs/list.htm",
    artifactPath: "data/official-rosters/ustc-ai-all-faculty-2026-09-02.json",
    note: "原 scope 只有学院首页；已迁移到师资队伍入口并遍历教授页全部分页及副教授、兼职博导栏目，冻结教授 16、副教授 8、兼职博导 5，共 29 人。",
  },
  "https://computing.hit.edu.cn/jsml/list.htm": {
    officialRosterCount: 246,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://computing.hit.edu.cn/jsml/list.htm",
    artifactPath: "data/official-rosters/hit-computing-all-directory-2026-09-02.json",
    note: "scope 中原 11970 路径已失效；已迁移到计算学部当前教师名录。官网单页表格覆盖计算机、网络安全、人工智能三学院及实验中心、编辑部，共出现 249 个姓名单元格；合并同名重复展示后冻结 246 个唯一姓名，并保留各研究中心栏目。由于表格不提供个人链接，同名歧义将在逐人核验阶段复查。",
  },
  "https://ai.hit.edu.cn/12789/list.htm": {
    officialRosterCount: 31,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ai.hit.edu.cn/12789/list.htm",
    artifactPath: "data/official-rosters/hit-ai-research-personnel-2026-09-02.json",
    note: "原 scope 只有研究院首页；已迁移到官方研究人员总名录并抓取全部 3 页，共冻结 31 人。官网未在列表页区分专职、兼职及独立 PI，留待下一阶段逐人核验。",
  },
  "https://ict.cas.cn/yjdw/": {
    officialRosterCount: 284,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ict.cas.cn/yjdw/yjy2020/",
    artifactPath: "data/official-rosters/cas-ict-research-staff-2026-09-02.json",
    note: "原 sourcedb 总目录对当前抓取环境仅返回占位字符；已改用计算所当前官方“研究队伍”名录，遍历研究员/正高级工程师 4 页 96 人，以及副研究员/高级工程师 8 页 188 人，共冻结 284 人。不同官方个人页即使同名也分别保留。",
  },
  "https://ia.cas.cn/rcdw/": {
    officialRosterCount: 346,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ia.cas.cn/rcdw/yjy/",
    artifactPath: "data/official-rosters/cas-ia-research-staff-2026-09-02.json",
    note: "已遍历自动化所当前研究员/正高级工程师目录全部 7 页 133 人，以及副研究员/高级工程师目录全部 11 页 213 人，共冻结 346 人。以官方个人页为身份键，避免把同名的不同研究人员误合并。",
  },
  "https://info.ruc.edu.cn/jsky/szdw/ajxjgcx/bx/bx1/index.htm": {
    officialRosterCount: 87,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://info.ruc.edu.cn/jsky/szdw/ajxjgcx/bx/bx1/index.htm",
    artifactPath: "data/official-rosters/ruc-information-all-faculty-2026-09-02.json",
    note: "信息学院旧目录先后跳转到当前按教学机构查询的“不限”全员目录；已抓取 index.htm 至 index4.htm 全部 5 页，分别 20、20、20、20、7 人，共冻结 87 位人物。官网全员卡片未直接显示职称，快照依据个人链接所属的教授、副教授、讲师和师资博士后栏目保留原始类别；6 人的链接路径未明确类别，留待逐人核验。",
  },
  "https://ai.ruc.edu.cn/academicfaculty/szdwn/index.htm": {
    officialRosterCount: 29,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ai.ruc.edu.cn/academicfaculty/szdwn/index.htm",
    artifactPath: "data/official-rosters/ruc-gaoling-ai-full-time-faculty-2026-09-02.json",
    note: "高瓴人工智能学院旧教师链接已失效；已迁移到当前官方“专任教师”单页目录，逐卡冻结姓名、职称、个人页与头像，共 29 人。页面没有分页或继续加载入口。",
  },
  "https://cs.fudan.edu.cn/50021/list.htm": {
    officialRosterCount: 289,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cs.fudan.edu.cn/_wp3services/generalQuery?queryObj=teacherHome",
    artifactPath: "data/official-rosters/fdu-computing-all-teacher-directory-2026-09-02.json",
    note: "原 11851 路径正文为空；已迁移到计算与智能创新学院当前“教师名录”。该页通过同站 teacherHome 接口动态加载，按官方页面脚本 rows=999 抓取，接口 total 与返回记录均为 289。所有职称为空或标“无”的记录也保留，下一阶段再判断现任、PI 与研究范围。",
  },
  "https://ai3.fudan.edu.cn/rcdw/qzkyry.htm": {
    officialRosterCount: 34,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ai3.fudan.edu.cn/rcdw/qzkyry.htm",
    artifactPath: "data/official-rosters/fdu-ai3-all-personnel-2026-09-02.json",
    note: "已遍历 AI³ 院官方人才队伍全部栏目：全职科研人员 17、工程技术人员 8、兼职专家 3、博士后 6，共冻结 34 位唯一人物。四栏均为单页且无分页；导师队伍仅作交叉核验，不重复计数。",
  },
  "https://cs.whu.edu.cn/szdw/zrjs.htm": {
    officialRosterCount: 322,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cs.whu.edu.cn/szdw/zrjs.htm",
    artifactPath: "data/official-rosters/whu-cs-all-personnel-2026-09-02.json",
    note: "原 /szdw.htm 已返回 404；已按学院当前导航遍历专任教师单页 135 人、实验技术人员全部 2 页 19 人、荣休教师 168 人，共冻结 322 位人物。高层次人才是专任教师的荣誉标签视图，不重复计数；非 PI 与荣休身份留待下一阶段分类。",
  },
  "https://sai.whu.edu.cn/teacher/zzjs/jxx.htm": {
    officialRosterCount: 122,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://sai.whu.edu.cn/teacher/zzjs/jxx.htm",
    artifactPath: "data/official-rosters/whu-ai-all-faculty-2026-09-02.json",
    note: "原 /szdw.htm 已返回 404；已按学院当前导航冻结在职教师 45 人和双聘教师 78 张卡。两栏有 1 个相同官方个人页，合并后为 122 位唯一人物；兼职教师页明确显示“内容更新中”，冻结为 0。两院院士与高层次人才为荣誉标签视图，不重复计数。",
  },
  "https://faculty.uestc.edu.cn/xylb.jsp?id=2031&lang=zh_CN&st=0&urltype=tsites.CollegeTeacherList&wbtreeid=1035": {
    officialRosterCount: 150,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://faculty.uestc.edu.cn/xylb.jsp?id=2031&lang=zh_CN&st=0&urltype=tsites.CollegeTeacherList&wbtreeid=1035",
    artifactPath: "data/official-rosters/uestc-cs-all-faculty-2026-09-02.json",
    note: "学院旧站名录触发脚本防护；已改用电子科技大学统一教师个人主页中的学院官方筛选结果。页眉明确共 150 条、10 页，已抓取 PAGENUM 1–10（前 9 页各 16 人、末页 6 人），冻结姓名、职称、个人主页及头像资源。",
  },
  "https://cse.seu.edu.cn/szdw_48203/list.htm": {
    officialRosterCount: 195,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cse.seu.edu.cn/szdw_48203/list.htm",
    artifactPath: "data/official-rosters/seu-cse-all-faculty-2026-09-02.json",
    note: "原 22190 栏目已失效；已迁移到计算机科学与工程学院、软件学院、人工智能学院当前共同师资目录。页眉明确每页 14 条、总共 195 条，已抓取 list.htm 与 list2.htm–list14.htm 全部 14 页，冻结 195 个唯一官方个人页。",
  },
  "https://cse.sysu.edu.cn/teacher": {
    officialRosterCount: 150,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cse.sysu.edu.cn/teacher",
    artifactPath: "data/official-rosters/sysu-cse-all-personnel-2026-09-02.json",
    note: "已遍历计算机学院官方师资队伍中的专任教师 110、专职科研人员 3、在站博士后 24、专业技术人员 13，共冻结 150 位人物。三个栏目均为单页且无分页；人才工程属于荣誉标签视图，不重复计数。",
  },
  "https://sai.sysu.edu.cn/teachers": {
    officialRosterCount: 62,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://sai.sysu.edu.cn/teachers",
    artifactPath: "data/official-rosters/sysu-ai-all-faculty-and-mentors-2026-09-02.json",
    note: "原 /teacher 路径返回 404；已迁移到学院当前师资导航，冻结教师名录 30、院外研究生导师 3、校外行业导师 29，共 62 人。三个栏目均为单页且无分页；校外行业导师在下一阶段单独按非独立 PI/仅工业界分类。",
  },
  "https://scse.buaa.edu.cn/szdw/qtjs.htm": {
    officialRosterCount: 80,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://scse.buaa.edu.cn/szdw/qtjs.htm",
    artifactPath: "data/official-rosters/buaa-cs-all-faculty-2026-09-02.json",
    note: "学院旧 /szdw/jsml.htm 路径返回 404；已按当前官网导航迁移到“全体教师”。已抓取 qtjs.htm 及 qtjs/6.htm–qtjs/1.htm 全部 7 页，逐页 12、12、12、12、12、12、8 人，共冻结 80 个唯一官方个人页，并保留职称与头像 URL。",
  },
  "https://iai.buaa.edu.cn/szdw.htm": {
    officialRosterCount: 58,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://iai.buaa.edu.cn/szdw.htm",
    artifactPath: "data/official-rosters/buaa-ai-all-personnel-2026-09-02.json",
    note: "已抓取人工智能学院师资队伍全部 4 页（18、18、18、2 人）及博士后栏目 2 人，共冻结 58 个唯一人物。博士后留待下一阶段按非独立 PI 分类，不在本阶段提前排除。",
  },
  "https://sds.cuhk.edu.cn/teacher-search": {
    officialRosterCount: 105,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://sds.cuhk.edu.cn/teacher-search",
    artifactPath: "data/official-rosters/cuhksz-sds-all-faculty-2026-09-02.json",
    note: "学院旧 /teacher 路径返回 404；已迁移到当前官方“师资力量”入口 /teacher-search，并抓取 page=0–10 全部 11 页（前 10 页各 10 人、末页 5 人），冻结 105 个唯一人物。全职、特聘、荣休、教学与研究职称均原样保留，下一阶段再逐人分类。",
  },
  "https://www.cit.tum.de/en/cit/school/people/professors/": {
    officialRosterCount: 270,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cit.tum.de/en/cit/school/people/professors/",
    artifactPath: "data/official-rosters/tum-cit-all-professors-2026-09-02.json",
    note: "原 School /people/ 入口当前规范跳转到 Professors 目录。已冻结 Professors 161、Affiliated 31、Adjunct 11、Honorary 22、Emeriti of Excellence 16、Retired 30、Distinguished Affiliated 11，共 282 个栏目条目；12 人跨栏目重复，合并为 270 位唯一人物。身份类别原样保留，下一阶段逐人分类。",
  },
  "https://www.epfl.ch/schools/ic/about/faculty-members/": {
    officialRosterCount: 103,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.epfl.ch/schools/ic/about/faculty-members/",
    artifactPath: "data/official-rosters/epfl-ic-all-faculty-2026-09-02.json",
    note: "原 /schools/ic/faculty/ 路径已跳转到奖项页面；已迁移到 IC 当前 Faculty members 官方页。单页完整冻结 Professors 60、External faculty members 5、Courtesy Appointments 1、Senior Scientists 6、Emeritus Professors 28、Academic hosts and visiting Professors 3，共 103 位唯一人物；本阶段不提前按身份筛除。",
  },
  "https://inf.ethz.ch/people/faculty.html": {
    officialRosterCount: 89,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://inf.ethz.ch/people/faculty.html",
    artifactPath: "data/official-rosters/eth-inf-all-faculty-2026-09-02.json",
    note: "官方 Faculty 入口将完整名录拆成四个子目录；已逐一冻结 Department Faculty 49、Affiliated Faculty 15、Adjunct Professors 2、Emeritus Faculty 23，共 89 位唯一人物。现任、兼职与荣休身份原样保留，留待下一阶段逐人分类。",
  },
  "https://informatics.ed.ac.uk/people/academic-staff": {
    officialRosterCount: 147,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://informatics.ed.ac.uk/people/academic-staff",
    artifactPath: "data/official-rosters/edinburgh-informatics-academic-staff-2026-09-02.json",
    note: "官方入口规范跳转到 /people/academic.html，并以单张字母序表格给出完整 Academic Staff 名录。已排除表头，冻结 147 位具名人员及其职称、官方个人页、邮箱和办公室；本阶段不按职称或研究方向过滤。",
  },
  "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en": {
    officialRosterCount: 61,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en",
    artifactPath: "data/official-rosters/cambridge-cst-faculty-2026-09-02.json",
    note: "原 /people/academic-staff 路径返回 404；已迁移到当前官方 People: Faculty 目录。页面以完整字母序表格列出 61 人，已冻结姓名、CRSID、办公室电话、房间及个人页；页面中显式标注 emeritus 的人物也原样保留，下一阶段再分类。",
  },
  "https://www.cs.ox.ac.uk/people/faculty.html": {
    officialRosterCount: 76,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.ox.ac.uk/people/faculty.html",
    artifactPath: "data/official-rosters/oxford-cs-faculty-2026-09-02.json",
    note: "官方 Faculty 页面以单页字母索引给出完整名录；已冻结 76 位人物、官方职称和个人页。研究方向与独立 PI 资格留待下一阶段逐人判断。",
  },
  "https://www.ifi.lmu.de/institut/index.html": {
    officialRosterCount: 30,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.ifi.lmu.de/institut/index.html",
    artifactPath: "data/official-rosters/lmu-informatics-professors-2026-09-02.json",
    note: "原 /people/professors/ 路径返回 404；联合抓取 Institute 官方 Lehr- und Forschungseinheiten 页面与 CIS 官方 Professoren 名录。前者列出 25 名教授，后者列出 Alexander Fraser、Valentin Hofmann、Barbara Plank、Klaus Schulz、Hinrich Schütze 5 人，合计冻结 30 位唯一人物；apl. 与 associated 状态原样保留，下一阶段再分类。",
  },
  "https://informatics.tuwien.ac.at/people/professors": {
    officialRosterCount: 109,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://informatics.tuwien.ac.at/people/professors",
    artifactPath: "data/official-rosters/tuwien-informatics-professors-2026-09-02.json",
    note: "原 /people/faculty/ 路径返回 404；已迁移到当前官方 Professors 目录。页面冻结现任教授 86 人、Emeriti and Retired Professors 23 人，共 109 位；保留职称、研究单元、个人页和头像资源，身份分类留待下一阶段。",
  },
  "https://cse.hkust.edu.hk/admin/people/faculty": {
    officialRosterCount: 97,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://cse.hkust.edu.hk/admin/people/faculty",
    artifactPath: "data/official-rosters/hkust-cse-all-faculty-2026-09-02.json",
    note: "已遍历官方 Faculty 目录的全部七个分类：Regular 53、Joint Appointments 12、Visiting 1、Teaching Track 10、Research Track 5、Adjunct 2、Emeritus 14，共冻结 97 位唯一人物，并保留职称、研究领域、个人页与头像资源；下一阶段再按身份分类。",
  },
  "https://www.cse.cuhk.edu.hk/people/faculty/": {
    officialRosterCount: 76,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cse.cuhk.edu.hk/people/faculty/",
    artifactPath: "data/official-rosters/cuhk-cse-all-faculty-2026-09-02.json",
    note: "官方 Faculty 页面用 By Profile、By Name、By Research Area、By Programme 展示同一批人员；已将 By Profile 作为去重基准，冻结全部 76 张人物卡。名录含现任、emeritus、courtesy、adjunct、teaching 与 research 职称；2 张卡未公开 profession 文本，下一阶段标为待核而非提前排除。",
  },
  "https://www.ee.cuhk.edu.hk/en-gb/people/academic-staff": {
    officialRosterCount: 50,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.ee.cuhk.edu.hk/en-gb/people/academic-staff",
    artifactPath: "data/official-rosters/cuhk-ee-academic-staff-2026-09-02.json",
    note: "官方 Academic Staff 页面导航完整列出 Chairperson 1、Professors 42、Lecturer 2、Emeritus Professors 5，共 50 个个人页。正文卡片只渲染其中 41 人，因此以页面内完整官方导航为人数基准；缺少正文卡片的 9 人仍保留，下一阶段再核验状态与头像。",
  },
  "https://www.cs.cityu.edu.hk/people/academic-staff": {
    officialRosterCount: 51,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.cityu.edu.hk/people/academic-staff",
    artifactPath: "data/official-rosters/cityu-cs-academic-staff-2026-09-02.json",
    note: "已冻结 CityU CS 官方 Academic Staff 页面全部 51 张人物卡；每张卡的姓名、职称、研究兴趣、CityU Scholars 链接和头像资源均原样保存，下一阶段再判断研究范围与独立 PI 资格。",
  },
  "https://www.polyu.edu.hk/comp/people/academic-staff/": {
    officialRosterCount: 77,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.polyu.edu.hk/comp/people/academic-staff/",
    artifactPath: "data/official-rosters/polyu-comp-academic-staff-2026-09-02.json",
    note: "已冻结 PolyU COMP 官方 Academic and Teaching Staff 页面全部 77 张唯一人物卡；官方职称、个人页与头像资源均保留，教学、研究与独立 PI 状态留待下一阶段分类。",
  },
  "https://www.comp.hkbu.edu.hk/v1/?page=faculty": {
    officialRosterCount: 44,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.comp.hkbu.edu.hk/v1/?page=faculty",
    artifactPath: "data/official-rosters/hkbu-comp-faculty-2026-09-02.json",
    note: "已冻结 HKBU COMP 官方 Faculty Members 页面全部 44 个唯一 profile ID；姓名、官方个人页和头像资源原样保存，具体职称与独立 PI 资格留待逐人审计。",
  },
  "https://www.cs.hku.hk/people/academic-staff": {
    officialRosterCount: 69,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.cs.hku.hk/people/academic-staff",
    artifactPath: "data/official-rosters/hku-cs-academic-staff-2026-09-02.json",
    note: "直接请求会收到 WAF 页面，故使用浏览器完整渲染同一官方名录；冻结 Academic Staff 28、Honorary/Adjunct/Emeritus 17、Part-time Lecturers 24，共 69 人。页面后续 Senior Research Staff、Postdoctoral Fellow 与 support staff 不属于本 faculty roster。",
  },
  "https://ece.hku.hk/people/": {
    officialRosterCount: 66,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ece.hku.hk/people/",
    artifactPath: "data/official-rosters/hku-ece-academic-teaching-staff-2026-09-02.json",
    note: "旧 EEE academic-staff 地址已迁移并在新 ECE 站点返回 404；通过当前官方 People 导航进入 Academic and Teaching Staff 页面，冻结全部 66 个 h3 人物条目及其配对职称，含 emeritus、lecturer 与 research appointments，下一阶段再分类。",
  },
  "https://www.eduhk.hk/mit/en/people.php": {
    officialRosterCount: 96,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.eduhk.hk/mit/en/people.php",
    artifactPath: "data/official-rosters/eduhk-mit-academic-staff-2026-09-02.json",
    note: "已冻结官方 People 页面从 Acting Head 到 Guest Lecturers 的全部学术任职：具名职员卡 46、Adjunct Professors 10、Guest Lecturers 40，共 96 人。行政、技术、顾问、导师与学生栏目未混入 faculty roster。",
  },
  "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/": {
    officialRosterCount: 14,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/",
    artifactPath: "data/official-rosters/hsuhk-cs-academic-staff-2026-09-02.json",
    note: "已冻结 HSUHK Department of Computer Science 官方 Academic Staff 页面全部 14 条唯一 staffId；包含 adjunct 与 teaching 职称，下一阶段逐人分类。",
  },
  "https://scholars.ln.edu.hk/en/organisations/school-of-data-science/persons/": {
    officialRosterCount: 5,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://scholars.ln.edu.hk/en/organisations/school-of-data-science/persons/",
    artifactPath: "data/official-rosters/lingnan-sds-researcher-profiles-2026-09-02.json",
    note: "官方 Lingnan Scholars 组织页明确显示 Researcher Profiles (5)，已冻结全部 5 个官方人物链接；职称与是否独立 PI 留待下一阶段。",
  },
  "https://scholars.ln.edu.hk/en/organisations/division-of-artificial-intelligence/persons/": {
    officialRosterCount: 35,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://scholars.ln.edu.hk/en/organisations/division-of-artificial-intelligence/persons/",
    artifactPath: "data/official-rosters/lingnan-ai-researcher-profiles-2026-09-02.json",
    note: "官方 Lingnan Scholars 组织页明确显示 Researcher Profiles (35)，已冻结全部 35 个唯一人物链接；其中 teaching、research 与非 faculty 头衔均原样保留待后续分类。",
  },
  "https://www.hkmu.edu.hk/st/people/key-staff/": {
    officialRosterCount: 100,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.hkmu.edu.hk/st/people/key-staff/",
    artifactPath: "data/official-rosters/hkmu-st-key-staff-2026-09-02.json",
    note: "旧 Academic Staff 页面已失效；当前 School 官方 sitemap 仅提供 Key Staff 作为完整人员目录。已冻结页面全部 100 张 staff card，不提前过滤 academic、teaching、visiting、adjunct 或行政支持头衔，下一阶段逐人分类。",
  },
  "https://computing.smu.edu.sg/faculty": {
    officialRosterCount: 96,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://computing.smu.edu.sg/faculty",
    artifactPath: "data/official-rosters/smu-scis-full-time-faculty-2026-09-02.json",
    note: "SMU 官方 Faculty 页面内嵌锁定 Full-time Faculty 与 School of Computing and Information Systems 的完整结构化名录；已冻结全部 96 个唯一 profile ID，并保留职称、所属学校、研究方向、个人页与头像 URL。",
  },
  "https://www.comp.nus.edu.sg/about/faculty/": {
    officialRosterCount: 216,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.comp.nus.edu.sg/about/faculty/",
    artifactPath: "data/official-rosters/nus-computing-faculty-2026-09-02.json",
    note: "旧 Computer Science Faculty URL 已返回 404；通过 NUS Computing 官方 About > People 导航进入当前 Faculty & Staff 目录，并使用官网 Faculty 筛选器冻结全部 216 张可见 faculty card。Adjunct、part-time、educator、practice、courtesy 与 emeritus 等任职先原样保留，下一阶段逐人分类。",
  },
  "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds": {
    officialRosterCount: 117,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds",
    artifactPath: "data/official-rosters/ntu-ccds-faculty-directory-2026-09-02.json",
    note: "旧 /computing/our-people/faculty 地址已返回 404；通过 CCDS 官方 Faculty 导航进入当前 Faculty Directory，遍历全部 12 个前端分页并冻结 117 个唯一官方人物链接。Courtesy、跨学院任职与研究方向先原样保留，下一阶段逐人分类。",
  },
  "https://www.sutd.edu.sg/istd/people/faculty": {
    officialRosterCount: 53,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.sutd.edu.sg/istd/people/faculty/full-time/",
    artifactPath: "data/official-rosters/sutd-istd-all-faculty-2026-09-02.json",
    note: "官方 ISTD Faculty 导航将名录拆为 Full-time 与 Adjunct 两栏；已遍历 Full-time 全部 4 页 43 人及 Adjunct 单页 10 人，共冻结 53 位，不在本阶段提前排除兼职人员。",
  },
  "https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/": {
    officialRosterCount: 28,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/",
    artifactPath: "data/official-rosters/sutd-artificial-augmented-intelligence-2026-09-02.json",
    note: "已遍历官方 Artificial and Augmented Intelligence 人员名录全部 3 页，冻结 12 + 12 + 4 = 28 个唯一人物链接；该研究主题名录与 ISTD Faculty 重叠是官网结构本身，逐人去重留待下一阶段。",
  },
  "https://www.singaporetech.edu.sg/directory/faculty": {
    officialRosterCount: 66,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.singaporetech.edu.sg/directory/faculty?cluster=31",
    artifactPath: "data/official-rosters/sit-infocomm-technology-faculty-2026-09-02.json",
    note: "已在 SIT 官方 Faculty Directory 使用 Infocomm Technology（cluster=31）筛选并遍历全部 7 页，冻结官网显示的 66 行。官网把 Raymond Chan 同一 profile 重复显示两次，快照保留这两行以保持官方人数，下一阶段再标记 excluded_duplicate。",
  },
  "https://www.suss.edu.sg/academics/schools-college/faculty-listing?schools=school-of-science-and-technology": {
    officialRosterCount: 30,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.suss.edu.sg/academics/schools-college/faculty-listing?schools=school-of-science-and-technology",
    artifactPath: "data/official-rosters/suss-school-science-technology-faculty-2026-09-02.json",
    note: "旧 About Faculty and Staff URL 已迁移到当前 Faculty Listing；通过官方 School/Department 筛选器选择 School of Science and Technology，遍历全部 3 页并冻结 30 个唯一人物链接，含 adjunct 项待下一阶段分类。",
  },
  "https://www.a-star.edu.sg/cfar/about-cfar/our-team": {
    officialRosterCount: 66,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.a-star.edu.sg/cfar/about-cfar/management",
    artifactPath: "data/official-rosters/astar-cfar-management-team-2026-09-02.json",
    note: "通过 CFAR 官方 About 导航联合冻结 Management 与 Our Team：Management 2、Advisory 4、Our Team 去重后 60，共 66 人。Li Chen、Li Jing、Tanya Veeravalli 与 Tang Tianyi 在多个团队栏目重复出现，快照合并人物但保留全部栏目；运营、工程师和 adjunct 仍留待下一阶段分类。",
  },
  "https://www.a-star.edu.sg/i2r/research-capabilities": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://www.a-star.edu.sg/i2r",
    note: "I²R 官方首页明确说明该机构现已并入 A*STAR Institute of Advanced Intelligence and Computing (IAIC)。IAIC 当前官网公开研究能力与执行主任信息，但未公开可证明完整性的全体研究人员名录，因此暂不冻结人数，也不以旧缓存或搜索结果拼接名单。",
  },
  "https://www.a-star.edu.sg/ihpc/research-capabilities": {
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://www.a-star.edu.sg/ihpc",
    note: "IHPC 官方首页明确说明该机构现已并入 A*STAR Institute of Advanced Intelligence and Computing (IAIC)。旧 Management 页面不能代表新机构的全体研究人员，IAIC 当前官网亦未公开可证明完整性的人员总目录，因此暂不冻结人数。",
  },
  "https://www.duke-nus.edu.sg/daisi/people/faculty": {
    officialRosterCount: 19,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.duke-nus.edu.sg/daisi/people/faculty",
    artifactPath: "data/official-rosters/duke-nus-daisi-faculty-2026-09-02.json",
    note: "通过 DAISI 官方 People 导航联合冻结 Primary Faculty 与 Affiliated Faculty：完整展开 Primary Faculty 的 Load more 后为 17 人，Affiliated Faculty 为 2 人，共 19 人。两类人员均原样保留，是否为独立 PI 与是否纳入 AI/CS 主线留待下一阶段逐人分类。",
  },
  "https://ai.szu.edu.cn/szdw/js.htm": {
    officialRosterCount: 57,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://ai.szu.edu.cn/szdw/js.htm",
    artifactPath: "data/official-rosters/szu-ai-full-faculty-2026-09-02.json",
    note: "通过学院官方师资导航联合冻结教授 12 人、副教授 7 人、讲师/助理教授 38 人，共 57 人；已遍历三个栏目全部分页。周岩峰的官网卡片没有人物页链接，快照以官网卡片中的校内邮箱作为唯一标识，仍保留在完整名录中。",
  },
  "https://www.imperial.ac.uk/computing/people/academic-staff/": {
    officialRosterCount: 68,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.imperial.ac.uk/computing/people/academic-staff/",
    artifactPath: "data/official-rosters/imperial-computing-academic-staff-2026-09-02.json",
    note: "已冻结 Department of Computing 官方 All Academics 栏目的全部 68 张人物卡片。Teaching fellows、research staff、emeritus/honorary staff 与 alumni 在官网中有独立目录，不计入本单位的 Academic staff 官方人数。",
  },
  "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html": {
    officialRosterCount: null,
    snapshotAt: null,
    fetchStatus: "partial",
    sourceDataUrl: "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html",
    note: "2026-09-02 两次直接请求及一次页面读取均超时；搜索索引只可证明页面存在，不能证明完整人数，因此不冻结。",
  },
  "https://bair.berkeley.edu/people/faculty.html": {
    officialRosterCount: null,
    snapshotAt: null,
    fetchStatus: "partial",
    sourceDataUrl: "https://bair.berkeley.edu/people/faculty.html",
    note: "官方 /people/ 目录索引显示 faculty.html 于 2026-07-23 更新，但直接读取超时；未取得完整正文前不冻结人数。",
  },
};

export const topSchoolRosterUnitSnapshots: RosterUnitSnapshot[] = topSchoolRosterScope.flatMap((school) =>
  school.units.map((unit) => ({
    unitUrl: unit.url,
    officialRosterCount: snapshotOverrides[unit.url]?.officialRosterCount ?? null,
    snapshotAt: snapshotOverrides[unit.url]?.snapshotAt ?? null,
    fetchStatus: snapshotOverrides[unit.url]?.fetchStatus ?? "not_started",
    sourceDataUrl: snapshotOverrides[unit.url]?.sourceDataUrl,
    artifactPath: snapshotOverrides[unit.url]?.artifactPath,
    note: snapshotOverrides[unit.url]?.note ?? "尚未冻结完整官方名录快照；官方人数和待处理人数保持未知。",
  })),
);

export function rosterUnitAudit(unitUrl: string): RosterUnitAudit {
  const snapshot = topSchoolRosterUnitSnapshots.find((item) => item.unitUrl === unitUrl);
  if (!snapshot) throw new Error(`Unknown roster unit: ${unitUrl}`);
  const decisions = topSchoolRosterPersonAudits.filter((item) => item.unitUrl === unitUrl);
  const checked = decisions.filter((item) => !item.decision.startsWith("pending_"));
  const includedCount = checked.filter((item) => item.decision === "included").length;
  const candidateCount = checked.filter((item) => item.decision === "candidate_new_pi").length;
  const excluded = checked.filter((item) => item.decision.startsWith("excluded_"));
  const excludedByReason = excluded.reduce<Partial<Record<RosterAuditDecision, number>>>((summary, item) => {
    summary[item.decision] = (summary[item.decision] ?? 0) + 1;
    return summary;
  }, {});
  const pendingCount = snapshot.officialRosterCount === null
    ? null
    : Math.max(snapshot.officialRosterCount - checked.length, 0);
  const status = snapshot.officialRosterCount === null
    ? "pending_snapshot"
    : pendingCount === 0
      ? "complete"
      : "in_progress";
  return {
    ...snapshot,
    checkedCount: checked.length,
    includedCount,
    candidateCount,
    excludedCount: excluded.length,
    excludedByReason,
    pendingCount,
    decisions,
    status,
  };
}

export const topSchoolRosterLedgerSummary = (() => {
  const units = topSchoolRosterUnitSnapshots.map((unit) => rosterUnitAudit(unit.unitUrl));
  const frozenUnits = units.filter((unit) => unit.officialRosterCount !== null);
  return {
    unitCount: units.length,
    completedUnitCount: units.filter((unit) => unit.status === "complete").length,
    snapshottedUnitCount: units.filter((unit) => unit.officialRosterCount !== null).length,
    frozenRosterPersonCount: frozenUnits.reduce((sum, unit) => sum + (unit.officialRosterCount ?? 0), 0),
    checkedPersonCount: frozenUnits.reduce((sum, unit) => sum + unit.checkedCount, 0),
    decisionPersonCount: frozenUnits.reduce((sum, unit) => sum + unit.decisions.length, 0),
    includedPersonCount: frozenUnits.reduce((sum, unit) => sum + unit.includedCount, 0),
    candidateNewPiCount: frozenUnits.reduce(
      (sum, unit) => sum + unit.decisions.filter((decision) => decision.decision === "candidate_new_pi").length,
      0,
    ),
    excludedPersonCount: frozenUnits.reduce((sum, unit) => sum + unit.excludedCount, 0),
    pendingPersonCount: frozenUnits.reduce(
      (sum, unit) => sum + unit.decisions.filter((decision) => decision.decision.startsWith("pending_")).length,
      0,
    ),
  };
})();
