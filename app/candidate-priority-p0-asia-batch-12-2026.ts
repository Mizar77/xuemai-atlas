import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-03";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, supports, checkedAt });
const fact = (label: string, value: string, proof: Source) => ({ label, value, source: proof });

const profile = source("清华大学计算机系 · 王云涛", "https://www.cs.tsinghua.edu.cn/csen/info/1307/4339.htm", "official", "现任职务、教育训练、研究、论文和官方头像");
const roster = source("清华大学计算机系 · 全职教师名录", "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm", "official", "计算机系现任全职教师名录");

export const candidatePriorityP0AsiaBatch12People2026: Person[] = [{
  id: "yuntao-wang-thu-p0-b12", name: "王云涛", role: "研究副教授", institution: "THU", region: "Mainland China",
  area: "Human-Computer Interaction · Ubiquitous Computing · Wearable Sensing", tags: ["HCI", "普适计算", "可穿戴感知", "智能交互"],
  summary: "清华智能交互研究副教授，研究移动与可穿戴设备上的行为、生理感知及资源受限端侧界面。",
  category: "core", primary: true, status: "current independent PI · official profile verified", stage: "emerging", x: 180, y: 160,
  introducedAt: checkedAt, lastVerifiedAt: checkedAt,
  portrait: { src: "portraits/candidate-p0-asia-batch-12-2026/yuntao-wang.jpg", alt: "王云涛官方头像", source: profile },
  sources: [profile, roster],
  facts: [
    fact("当前任职", "2022 年 12 月起任清华大学计算机科学与技术系研究副教授。", profile),
    fact("教育与学术训练", "2011 年获北京邮电大学计算机学士，2016 年获清华大学计算机博士；随后在清华从事博士后研究。", profile),
    fact("任职轨迹", "2018–2021 年在 University of Washington 任 Visiting Assistant Professor / Research Associate。", profile),
    fact("研究主线", "人机交互与普适计算，聚焦移动和可穿戴设备上的行为、生理感知及智能界面。", profile),
    fact("代表性合作", "官方论文表列出其与史元春、喻纯共同署名的 IMWUT 2024 G-VOILA 论文。", profile),
  ],
}];

export const candidatePriorityP0AsiaBatch12Relationships2026: Relationship[] = [
  { id: "candidate-p0-asia-b12-wang-shi", from: "yuntao-wang-thu-p0-b12", to: "yuanchun-shi-thu-p0-b10", type: "collaboration", subtype: "publication", label: "智能交互论文合作", evidence: "王云涛的清华官方主页列出两人共同署名的 IMWUT 2024 G-VOILA 论文。", evidenceObject: "G-VOILA: gaze-facilitated information querying in daily scenarios · IMWUT 2024", source: profile, verified: true, recentYear: 2024 },
  { id: "candidate-p0-asia-b12-wang-yu", from: "yuntao-wang-thu-p0-b12", to: "chun-yu-thu-p0-b10", type: "collaboration", subtype: "publication", label: "智能交互论文合作", evidence: "王云涛的清华官方主页列出两人共同署名的 IMWUT 2024 G-VOILA 论文。", evidenceObject: "G-VOILA: gaze-facilitated information querying in daily scenarios · IMWUT 2024", source: profile, verified: true, recentYear: 2024 },
];

export const candidatePriorityP0AsiaBatch12Placements2026: StudentPlacement[] = [];
export const candidatePriorityP0AsiaBatch12GroupMembers2026: GroupMember[] = [];
export const candidatePriorityP0AsiaBatch12RosterPromotions2026 = [
  { unitUrl: roster.url, rosterName: "Yuntao WANG", atlasPersonId: "yuntao-wang-thu-p0-b12" },
];

export const People = candidatePriorityP0AsiaBatch12People2026;
export const Relationships = candidatePriorityP0AsiaBatch12Relationships2026;
export const Placements = candidatePriorityP0AsiaBatch12Placements2026;
export const GroupMembers = candidatePriorityP0AsiaBatch12GroupMembers2026;
export const RosterPromotions = candidatePriorityP0AsiaBatch12RosterPromotions2026;
export const people = People;
export const relationships = Relationships;
export const placements = Placements;
export const groupMembers = GroupMembers;
export const rosterPromotions = RosterPromotions;
