import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });

const sources = {
  dongStudents: source("Illinois iSchool · Doctoral Students", "https://ischool.illinois.edu/people/doctoral-students", "official", "Jessica Choi、Yifan Liu 与 Ruichen Yao 的导师字段均为 Dong Wang"),
  hartPaper: source("Graphics at Illinois · Real-Time Analytic Antialiased Text", "https://graphics.cs.illinois.edu/aa-text/", "official", "2019 年成果页逐名列出 Apollo Ellis、Warren Hunt 与 John C. Hart"),
  rezaStudent: source("NUS Computing · Yao Tong", "https://www.comp.nus.edu.sg/~yaotong/", "official", "Yao Tong 主页明确 Reza Shokri 为博士导师"),
  fanStudents: source("清华大学自动化系 · 杨帆", "https://www.au.tsinghua.edu.cn/info/1189/3140.htm", "official", "在读博士生名单列出李维杨"),
  guStudents: source("上海交通大学计算机学院 · 谷大武", "https://www.cs.sjtu.edu.cn/jiaoshiml/gudawu.html", "official", "博士毕业生名单列出 Jeroen Delvaux"),
};

const supporting = (
  id: string,
  name: string,
  role: string,
  institution: Person["institution"],
  region: Person["region"],
  area: string,
  summary: string,
  sourceItem: Source,
  x: number,
  y: number,
): Person => ({
  id,
  name,
  role,
  institution,
  region,
  area,
  tags: ["学术关系", role],
  summary,
  stage: "adjacent",
  category: "adjacent",
  status: "supporting relationship node · first-party evidence",
  primary: false,
  x,
  y,
  sources: [sourceItem],
  lastVerifiedAt: checkedAt,
});

export const p0LeadershipNetworkFixPeople2026: Person[] = [
  supporting("jessica-choi-dong-wang-advisee", "Jessica Choi", "PhD student", "UIUC", "United States", "Human-centered AI", "Illinois iSchool 官方博士生名录所列 Dong Wang 博士生。", sources.dongStudents, 1920, 240),
  supporting("apollo-ellis-john-hart-collaborator", "Apollo Ellis", "Research collaborator", "UIUC", "United States", "Computer Graphics", "与 John C. Hart 共同发表计算机图形学研究的 Illinois 研究者。", sources.hartPaper, 1380, 240),
  supporting("yao-tong-reza-shokri-advisee", "Yao Tong", "PhD student", "NUS", "Singapore", "Trustworthy AI · Privacy", "NUS 个人主页明确记录由 Reza Shokri 指导的博士生。", sources.rezaStudent, 720, 260),
  supporting("li-weiyang-fan-yang-advisee", "李维杨", "PhD student", "THU", "Mainland China", "Industrial Systems Intelligence", "清华大学自动化系官方主页所列杨帆博士生。", sources.fanStudents, 900, 260),
  supporting("jeroen-delvaux-gu-dawu-advisee", "Jeroen Delvaux", "PhD alumnus", "SJTU", "Mainland China", "Hardware Security · PUF", "上海交通大学官方主页所列谷大武博士毕业生。", sources.guStudents, 1080, 260),
];

export const p0LeadershipNetworkFixRelationships2026: Relationship[] = [
  {
    id: "p0-leader-fix-dong-wang-jessica-choi",
    from: "dong-wang-uiuc-p0-b14",
    to: "jessica-choi-dong-wang-advisee",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Illinois iSchool 官方博士生名录在 Jessica Choi 条目中将 Dong Wang 列为导师。",
    evidenceObject: "Jessica Choi · Advisor: Dong Wang",
    source: sources.dongStudents,
    verified: true,
  },
  {
    id: "p0-leader-fix-hart-ellis",
    from: "john-hart-uiuc-p0-b15",
    to: "apollo-ellis-john-hart-collaborator",
    type: "collaboration",
    subtype: "publication",
    label: "计算机图形学论文合作",
    evidence: "Graphics at Illinois 官方成果页列出 John C. Hart 与 Apollo Ellis 共同署名的研究成果。",
    evidenceObject: "Real-Time Analytic Antialiased Text for 3-D Environments · High-Performance Graphics 2019",
    source: sources.hartPaper,
    verified: true,
  },
  {
    id: "p0-leader-fix-reza-yao-tong",
    from: "reza-shokri-nus-p0-2026",
    to: "yao-tong-reza-shokri-advisee",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Yao Tong 的 NUS 个人主页明确写明其博士研究由 Reza Shokri 指导。",
    evidenceObject: "Yao Tong · PhD supervision by Reza Shokri",
    source: sources.rezaStudent,
    verified: true,
  },
  {
    id: "p0-leader-fix-fan-li-weiyang",
    from: "fan-yang-thu-auto-p0-2026",
    to: "li-weiyang-fan-yang-advisee",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "清华大学自动化系杨帆官方主页在博士生名单中列出李维杨。",
    evidenceObject: "杨帆官方主页 · 在读博士生 · 李维杨",
    source: sources.fanStudents,
    verified: true,
  },
  {
    id: "p0-leader-fix-gu-jeroen-delvaux",
    from: "dawu-gu-sjtu-p0-2026",
    to: "jeroen-delvaux-gu-dawu-advisee",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "上海交通大学谷大武官方主页在博士毕业生名单中列出 Jeroen Delvaux。",
    evidenceObject: "谷大武官方主页 · 博士毕业生 · Jeroen Delvaux",
    source: sources.guStudents,
    verified: true,
  },
];
