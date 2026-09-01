import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, checkedAt, supports });

const zongTraining = source(
  "中国科学院自动化研究所 · 宗成庆",
  "https://ia.cas.cn/rcdw/yjy/202404/t20240425_7131828.html",
  "official",
  "宗成庆于 1998 年在中国科学院计算技术研究所获得博士学位；公开页面未列博士导师姓名",
);

const zongZhang = source(
  "模式识别国家重点实验室 · 张家俊、宗成庆获 PACLIC23 最佳论文",
  "https://nlpr.ia.ac.cn/cip/cqzongAcademicActsBefore.htm",
  "official",
  "官方报道明确称张家俊为博士生、宗成庆为其导师",
);

const zhaoStudents = source(
  "中国科学院自动化研究所 · 赵军毕业生名录",
  "https://nlpr.ia.ac.cn/cip/english/jzhaoEn.htm",
  "official",
  "赵军官方毕业生名录列出刘康 2010 年博士论文与何世柱 2016 年博士论文",
);

const liuProfile = source(
  "中国科学院自动化研究所 · 刘康个人主页",
  "https://nlpr.ia.ac.cn/cip/~liukang/index.html",
  "profile",
  "本人主页明确写明博士导师为赵军、硕士导师为焦李成",
);

const heProfile = source(
  "何世柱个人主页",
  "https://heshizhu.github.io/",
  "profile",
  "本人主页明确写明 2016 年在 NLPR 获博士学位，导师为赵军",
);

const jiaoProfile = source(
  "西安电子科技大学 · 焦李成",
  "https://web.xidian.edu.cn/lchjiao/index.html",
  "official",
  "焦李成现任西安电子科技大学人工智能学院杰出教授、博士生导师及人工智能研究院院长",
);

const jiaoRoster = source(
  "西安电子科技大学人工智能学院 · 教师名录",
  "https://faculty.xidian.edu.cn/xyjslb.jsp?PAGENUM=1&id=2472&lang=zh_CN&st=0&totalpage=3&urltype=tsites.CollegeTeacherList&wbtreeid=1001",
  "official",
  "人工智能学院教师名录列出焦李成及其当前学院归属",
);

/**
 * A current adviser outside the atlas' institution-first roster. Keeping this
 * node non-primary lets the global graph place it outside CAS-IA while still
 * exposing Liu Kang's verified master's-training branch.
 */
export const thesisSupervisorPeople: Person[] = [
  {
    id: "licheng-jiao-lineage",
    name: "焦李成",
    role: "杰出教授 · 博士生导师 · 人工智能研究院院长",
    institution: "External",
    actualInstitution: "Xidian University",
    region: "Mainland China",
    area: "Artificial Intelligence · Pattern Recognition · Deep Learning",
    tags: ["人工智能", "模式识别", "深度学习", "类脑计算", "导师谱系"],
    summary: "西安电子科技大学人工智能学院资深学者；刘康硕士阶段导师，研究智能感知、模式识别、深度学习与类脑计算。",
    facts: [
      { label: "当前任职", value: "西安电子科技大学人工智能学院杰出教授、博士生导师、人工智能研究院院长。", source: jiaoProfile },
      { label: "研究主线", value: "智能感知与图像理解、深度学习与类脑计算、进化优化与遥感解译。", source: jiaoProfile },
      { label: "培养关系", value: "刘康个人主页明确记录其硕士阶段由焦李成指导。", source: liuProfile },
    ],
    stage: "senior",
    category: "core",
    status: "current PI · external mentor node",
    sources: [jiaoProfile, jiaoRoster, liuProfile],
    x: 80,
    y: 80,
    primary: false,
    lastVerifiedAt: checkedAt,
  },
];

export const thesisSupervisorPersonEnhancements: Record<string, Partial<Person>> = {
  "chengqing-zong": {
    facts: [
      {
        label: "博士训练核验",
        value: "1998 年获中国科学院计算技术研究所博士学位；本轮尚未从公开论文首页或一手履历中核实导师姓名，因此暂不生成师承边。",
        source: zongTraining,
      },
    ],
    sources: [zongTraining],
    lastVerifiedAt: checkedAt,
  },
  "jiajun-zhang-cas": {
    facts: [
      { label: "博士导师", value: "宗成庆；自动化所官方报道明确称张家俊为博士生、宗成庆为其导师。", source: zongZhang },
    ],
    sources: [zongZhang],
    lastVerifiedAt: checkedAt,
  },
  "kang-liu-cas": {
    facts: [
      { label: "博士导师", value: "赵军；2010 年在 NLPR 获博士学位。", source: liuProfile },
      { label: "硕士导师", value: "焦李成；2005 年在西安电子科技大学完成模式识别方向硕士训练。", source: liuProfile },
    ],
    sources: [liuProfile, zhaoStudents],
    lastVerifiedAt: checkedAt,
  },
  "shizhu-he": {
    facts: [
      { label: "博士导师", value: "赵军；2016 年在 NLPR 获计算机科学博士学位。", source: heProfile },
    ],
    sources: [heProfile, zhaoStudents],
    lastVerifiedAt: checkedAt,
  },
};

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: "phd_adviser" | "master_adviser",
  evidence: string,
  evidenceSource: Source,
  endYear?: number,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "phd_adviser" ? "博士导师" : "硕士导师",
  evidence,
  source: evidenceSource,
  verified: true,
  endYear,
  evidenceObject: "博士论文/导师官方毕业生名录/本人一手履历；不由合著关系推断",
});

/** Adviser points to trainee. */
export const thesisSupervisorRelationships: Relationship[] = [
  lineage(
    "thesis-supervisor-zong-jiajun-zhang",
    "chengqing-zong",
    "jiajun-zhang-cas",
    "phd_adviser",
    "自动化所官方报道明确称张家俊为博士生、宗成庆为其导师。",
    zongZhang,
    2011,
  ),
  lineage(
    "thesis-supervisor-zhao-kang-liu",
    "jun-zhao-cas",
    "kang-liu-cas",
    "phd_adviser",
    "刘康本人主页明确写明博士导师为赵军；赵军官方毕业生名录同时列出其 2010 年博士论文。",
    liuProfile,
    2010,
  ),
  lineage(
    "thesis-supervisor-zhao-shizhu-he",
    "jun-zhao-cas",
    "shizhu-he",
    "phd_adviser",
    "何世柱本人主页明确写明 2016 年 NLPR 博士导师为赵军；赵军官方毕业生名录交叉确认。",
    heProfile,
    2016,
  ),
  lineage(
    "thesis-supervisor-jiao-kang-liu",
    "licheng-jiao-lineage",
    "kang-liu-cas",
    "master_adviser",
    "刘康本人主页明确写明其 2005 年西安电子科技大学模式识别硕士阶段由焦李成指导。",
    liuProfile,
    2005,
  ),
];

export type ThesisSupervisorAuditRecord = {
  personId: string;
  doctoralInstitution: string;
  doctoralYear?: number;
  status: "verified" | "supervisor_not_publicly_verified";
  supervisorId?: string;
  source: Source;
};

/**
 * Machine-readable audit trail for the thesis-first verification pass. Records
 * remain visible even when no edge is emitted, so absence is not mistaken for
 * evidence that a scholar had no adviser.
 */
export const thesisSupervisorAudit: ThesisSupervisorAuditRecord[] = [
  { personId: "chengqing-zong", doctoralInstitution: "Institute of Computing Technology, CAS", doctoralYear: 1998, status: "supervisor_not_publicly_verified", source: zongTraining },
  { personId: "jiajun-zhang-cas", doctoralInstitution: "Institute of Automation, CAS", doctoralYear: 2011, status: "verified", supervisorId: "chengqing-zong", source: zongZhang },
  { personId: "kang-liu-cas", doctoralInstitution: "Institute of Automation, CAS", doctoralYear: 2010, status: "verified", supervisorId: "jun-zhao-cas", source: liuProfile },
  { personId: "shizhu-he", doctoralInstitution: "Institute of Automation, CAS", doctoralYear: 2016, status: "verified", supervisorId: "jun-zhao-cas", source: heProfile },
];
