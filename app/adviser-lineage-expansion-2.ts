import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";
const source = (label: string, url: string, supports: string, kind: Source["kind"] = "official"): Source => ({ label, url, supports, kind, checkedAt });

const feifeiThesis = source(
  "Fei-Fei Li doctoral thesis · Stanford Vision Lab mirror",
  "https://svl.stanford.edu/assets/publications/pdfs/FeiFeiLi_phD_thesis_2005.pdf",
  "论文致谢明确称 Pietro Perona 与 Christof Koch 为两位博士导师。",
  "thesis",
);
const peronaProfile = source("Caltech · Pietro Perona", "https://www.eas.caltech.edu/people/perona", "现任职务、机器视觉与 AI 研究方向。", "official");
const kochProfile = source("Allen Institute · Christof Koch", "https://alleninstitute.org/person/christof-koch", "当前 Meritorious Investigator 身份与 Caltech 历史任职。", "official");
const jiajunMit = source(
  "MIT CSAIL · Jiajun Wu doctoral dissertation award",
  "https://www.csail.mit.edu/news/wu-receives-acm-doctoral-dissertation-honorable-mention-award",
  "MIT 官方报道明确列 Bill Freeman、Joshua Tenenbaum 与 Armando Solar-Lezama 为博士导师。",
  "official",
);
const freemanProfile = source("MIT · William T. Freeman", "https://billf.mit.edu/", "MIT 计算机视觉教授与研究方向。", "profile");
const tenenbaumProfile = source("MIT BCS · Joshua B. Tenenbaum", "https://bcs.mit.edu/directory/joshua-b-tenenbaum", "MIT 教授身份与计算认知科学研究。", "official");
const solarProfile = source("MIT CSAIL · Armando Solar-Lezama", "https://www.csail.mit.edu/person/armando-solar-lezama", "MIT 教授、CSAIL 领导职务与神经符号程序综合研究。", "official");
const yarinOxford = source("Oxford OATML · Yarin Gal", "https://www.cs.ox.ac.uk/oatml/members/yarin/", "个人简介明确记录其 Cambridge 博士阶段与 Zoubin Ghahramani 工作。", "official");

const person = (record: Omit<Person, "x" | "y" | "lastVerifiedAt">, index: number): Person => ({
  ...record,
  x: 75 + index * 115,
  y: 55,
  lastVerifiedAt: checkedAt,
});

export const adviserLineagePeople2: Person[] = [
  person({
    id: "pietro-perona-lineage", name: "Pietro Perona", role: "Allen E. Puckett Professor of Electrical Engineering · Director, Information Science and Technology", institution: "Award Network", actualInstitution: "California Institute of Technology", region: "United States",
    area: "Computer Vision · Machine Learning · Perception", tags: ["计算机视觉", "视觉识别", "导师谱系"], stage: "senior", category: "core", primary: true,
    summary: "Caltech 计算机视觉资深教授；Fei-Fei Li 博士论文明确将其列为博士导师之一。", facts: [{ label: "当前角色", value: "Caltech Allen E. Puckett Professor；Information Science and Technology Director", source: peronaProfile }, { label: "师承连接", value: "Fei-Fei Li 的共同博士导师", source: feifeiThesis }, { label: "研究主线", value: "机器视觉、人工智能、感知与视觉识别", source: peronaProfile }], sources: [peronaProfile, feifeiThesis],
  }, 0),
  person({
    id: "christof-koch-lineage", name: "Christof Koch", role: "Meritorious Investigator", institution: "External", actualInstitution: "Allen Institute", region: "United States",
    area: "Computational Neuroscience · Vision · Consciousness", tags: ["计算神经科学", "视觉", "导师谱系"], stage: "historical", category: "historical", primary: false,
    summary: "计算神经科学家、Caltech 前教授；Fei-Fei Li 博士论文明确将其列为博士导师之一。", facts: [{ label: "当前角色", value: "Allen Institute Meritorious Investigator", source: kochProfile }, { label: "师承连接", value: "Fei-Fei Li 的共同博士导师", source: feifeiThesis }], sources: [kochProfile, feifeiThesis],
  }, 1),
  person({
    id: "william-freeman-lineage", name: "William T. Freeman", role: "Professor of Electrical Engineering and Computer Science", institution: "MIT", region: "United States",
    area: "Computer Vision · Machine Learning · Graphics", tags: ["计算机视觉", "机器学习", "导师谱系"], stage: "senior", category: "core", primary: true,
    summary: "MIT 计算机视觉资深教授；MIT 官方报道将其列为 Jiajun Wu 的博士导师之一。", facts: [{ label: "当前角色", value: "MIT EECS Professor", source: freemanProfile }, { label: "师承连接", value: "Jiajun Wu 的共同博士导师", source: jiajunMit }, { label: "研究主线", value: "计算机视觉、机器学习与计算机图形学", source: freemanProfile }], sources: [freemanProfile, jiajunMit],
  }, 2),
  person({
    id: "joshua-tenenbaum-lineage", name: "Joshua B. Tenenbaum", role: "Professor of Computational Cognitive Science", institution: "MIT", region: "United States",
    area: "Artificial Intelligence · Computational Cognitive Science", tags: ["认知科学", "世界模型", "导师谱系"], stage: "senior", category: "core", primary: true,
    summary: "MIT 计算认知科学与 AI 资深教授；MIT 官方报道将其列为 Jiajun Wu 的博士导师之一。", facts: [{ label: "当前角色", value: "MIT Professor of Computational Cognitive Science", source: tenenbaumProfile }, { label: "师承连接", value: "Jiajun Wu 的共同博士导师", source: jiajunMit }, { label: "研究主线", value: "计算认知科学、概率建模与人工智能", source: tenenbaumProfile }], sources: [tenenbaumProfile, jiajunMit],
  }, 3),
  person({
    id: "armando-solar-lezama-lineage", name: "Armando Solar-Lezama", role: "Distinguished Professor of Computing · CSAIL Associate Director and COO", institution: "MIT", region: "United States",
    area: "Program Synthesis · Neuro-symbolic AI · AI for Code", tags: ["程序综合", "神经符号 AI", "AI for Code", "导师谱系"], stage: "senior", category: "adjacent", primary: true,
    summary: "MIT 程序综合与神经符号 AI 教授；MIT 官方报道将其列为 Jiajun Wu 的博士导师之一。", facts: [{ label: "当前角色", value: "MIT Distinguished Professor；CSAIL Associate Director and COO", source: solarProfile }, { label: "师承连接", value: "Jiajun Wu 的共同博士导师", source: jiajunMit }, { label: "研究主线", value: "程序综合、神经符号 AI 与 AI for Code", source: solarProfile }], sources: [solarProfile, jiajunMit],
  }, 4),
];

const lineage = (id: string, from: string, to: string, label: string, evidence: string, evidenceSource: Source): Relationship => ({
  id, from, to, type: "lineage", subtype: "co_adviser", label, evidence, source: evidenceSource, verified: true,
});

export const adviserLineageRelationships2: Relationship[] = [
  lineage("lineage-perona-feifei", "pietro-perona-lineage", "fei-fei-li-us", "共同博士导师", "Fei-Fei Li 博士论文致谢明确称 Pietro Perona 为其两位博士导师之一。", feifeiThesis),
  lineage("lineage-koch-feifei", "christof-koch-lineage", "fei-fei-li-us", "共同博士导师", "Fei-Fei Li 博士论文致谢明确称 Christof Koch 为其两位博士导师之一。", feifeiThesis),
  lineage("lineage-freeman-jiajun-wu", "william-freeman-lineage", "jiajun-wu-stanford-us", "共同博士导师", "MIT CSAIL 官方报道明确列 Bill Freeman 为 Jiajun Wu 的博士导师。", jiajunMit),
  lineage("lineage-tenenbaum-jiajun-wu", "joshua-tenenbaum-lineage", "jiajun-wu-stanford-us", "共同博士导师", "MIT CSAIL 官方报道明确列 Joshua Tenenbaum 为 Jiajun Wu 的博士导师。", jiajunMit),
  lineage("lineage-solar-jiajun-wu", "armando-solar-lezama-lineage", "jiajun-wu-stanford-us", "共同博士导师", "MIT CSAIL 官方报道明确列 Armando Solar-Lezama 为 Jiajun Wu 的博士导师。", jiajunMit),
  { id: "lineage-zoubin-yarin-gal", from: "zoubin-ghahramani-eu", to: "yarin-gal-eu", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Oxford OATML 官方简介明确记录 Yarin Gal 在 Cambridge 博士阶段与 Zoubin Ghahramani 工作。", evidenceObject: "Yarin Gal · Cambridge PhD", source: yarinOxford, verified: true },
];
