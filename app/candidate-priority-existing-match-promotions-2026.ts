/**
 * Exact same-institution matches between the frozen P0 roster and people that
 * were already published through an earlier influence, award or lineage audit.
 * These records close the roster bookkeeping gap; they do not create new nodes.
 */
export const candidatePriorityExistingMatchPromotions2026 = [
  { unitUrl: "https://www.cis.pku.edu.cn/szdw/zzjs.htm", rosterName: "封举富", atlasPersonId: "jufu-feng-pku" },
  { unitUrl: "https://sai.sjtu.edu.cn/cn/faculty/zzjs", rosterName: "严骏驰", atlasPersonId: "junchi-yan-award" },
  { unitUrl: "https://sai.sjtu.edu.cn/cn/faculty/zzjs", rosterName: "卢策吾", atlasPersonId: "cewu-lu-sjtu" },
  { unitUrl: "https://www.cs.sjtu.edu.cn/jiaoshiml.html", rosterName: "易冉", atlasPersonId: "ran-yi-sjtu-2026" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Aaron Sidford", atlasPersonId: "aaron-sidford-lineage" },
  { unitUrl: "https://www.cs.stanford.edu/people/faculty", rosterName: "Kunle Olukotun", atlasPersonId: "kunle-olukotun-lineage" },
  { unitUrl: "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus", rosterName: "Fredo Durand", atlasPersonId: "fredo-durand-lineage" },
  { unitUrl: "https://cs.nju.edu.cn/1651/list.htm", rosterName: "周志华 (院士、博导)", atlasPersonId: "zhihua-zhou-nju" },
  { unitUrl: "http://www.cs.zju.edu.cn/csen/27003/list.htm", rosterName: "杨洋", atlasPersonId: "yang-yang-tang-alumnus" },
  { unitUrl: "https://ee.stanford.edu/people/faculty", rosterName: "Benjamin Van Roy", atlasPersonId: "benjamin-van-roy-stanford-p0-b8" },
] as const;
