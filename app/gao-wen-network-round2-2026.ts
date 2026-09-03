import type { Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-02";
const source = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });
const jdl = source("先进人机通信技术联合实验室 · 桃李天下", "https://www.jdl.ac.cn/rencai/taolitianxia", "高文指导或共同指导的博士姓名、完成时间、研究方向和当时毕业去向");
const hitFaculty = source("哈尔滨工业大学人工智能学院 · 专任教师", "https://sai.hit.edu.cn/zrjs/list.htm", "现任教师职称、导师资格和研究方向");

type PiSeed = {
  id: string; name: string; role: string; institution: Person["institution"]; area: string; tags: string[];
  summary: string; current: string; research: string; education: string; why: string;
  profile: Source; portraitFile: string; stage: Person["stage"]; x: number; y: number;
};

const seeds: PiSeed[] = [
  {
    id: "zhai-deming-hit", name: "翟德明", role: "副教授 · 博士生导师", institution: "HIT",
    area: "Machine Learning · Image Processing · Audio-visual Intelligence", tags: ["机器学习", "图像处理", "视听智能", "高文谱系"],
    summary: "哈尔滨工业大学机器学习与图像处理 PI；博士阶段由高文指导，现持续在哈工大计算学部培养研究生。",
    current: "哈尔滨工业大学计算学部副教授、博士生导师。", research: "机器学习、图像处理与视听智能。",
    education: "2014 年在哈工大完成机器学习与图像处理方向博士；JDL 名录明确列高文为导师。",
    why: "处于高文视觉与多媒体谱系在哈工大的新一代独立 PI 分支。",
    profile: source("哈尔滨工业大学 · 翟德明", "https://homepage.hit.edu.cn/zhaideming?lang=zh", "当前院系、学科、联系方式与官方肖像"), portraitFile: "zhai-deming", stage: "senior", x: 680, y: 1230,
  },
  {
    id: "hong-xiaopeng-hit", name: "洪晓鹏", role: "教授 · 博士生导师", institution: "HIT",
    area: "Computer Vision · Multimodal Learning · Continual Learning", tags: ["计算机视觉", "多模态学习", "持续学习", "高文谱系"],
    summary: "哈尔滨工业大学视觉、多模态与持续学习 PI；个人主页明确写明博士师从高文，并公开了较完整的学生培养信息。",
    current: "哈尔滨工业大学计算学部教授、博士生导师，并参与哈工大—鹏城实验室联合培养。", research: "多模态目标感知、持续与增量学习、多智能体调度。",
    education: "2010 年在哈工大获得博士学位；本人官方主页和 JDL 名录均明确导师为高文。",
    why: "个人主页公开在读博士、合作指导博士和毕业生，可继续反向核验其下游学术与产业去向。",
    profile: source("哈尔滨工业大学 · 洪晓鹏", "https://homepage.hit.edu.cn/hongxiaopeng?lang=zh", "当前任职、研究方向、教育经历、培养名录和官方肖像"), portraitFile: "hong-xiaopeng", stage: "senior", x: 820, y: 1230,
  },
  {
    id: "liu-shaohui-hit", name: "刘绍辉", role: "副教授 · 博士生导师", institution: "HIT",
    area: "Computer Vision · Machine Learning · Media Content Security", tags: ["计算机视觉", "机器学习", "内容安全", "高文谱系"],
    summary: "哈尔滨工业大学图像视频处理与媒体内容安全 PI，是高文多媒体内容安全谱系在哈工大的延伸。",
    current: "哈尔滨工业大学计算学部副教授、博士生导师。", research: "计算机视觉、机器学习、信号处理和媒体内容安全。",
    education: "JDL 名录记录其 2007 年完成多媒体内容安全与图像处理方向博士，导师为高文。",
    why: "学校教师和博士导师名录持续将其列为招生导师。",
    profile: source("哈尔滨工业大学 · 刘绍辉", "https://homepage.hit.edu.cn/liushaohui", "当前任职、院系和官方肖像"), portraitFile: "liu-shaohui", stage: "senior", x: 960, y: 1230,
  },
  {
    id: "zhang-baochang-buaa", name: "张宝昌", role: "教授 · 博士生导师", institution: "BUAA",
    area: "Computer Vision · Efficient Deep Learning · Object Detection", tags: ["计算机视觉", "目标检测", "模型压缩", "高文谱系"],
    summary: "北京航空航天大学人工智能学院视觉与高效深度学习 PI，研究小目标检测、模型压缩和控制理论与深度学习结合。",
    current: "北京航空航天大学人工智能学院教授、博士生导师。", research: "复杂背景快速小目标检测、深度模型压缩和控制理论与深度学习结合。",
    education: "JDL 名录记录其 2006 年完成人脸识别方向博士，导师为高文。", why: "官方主页记录其 2018 年进入北航长聘系列。",
    profile: source("北京航空航天大学人工智能学院 · 张宝昌", "https://iai.buaa.edu.cn/info/1013/1094.htm", "当前任职、研究方向、任职轨迹和官方肖像"), portraitFile: "zhang-baochang", stage: "senior", x: 820, y: 930,
  },
  {
    id: "ye-qixiang-ucas", name: "叶齐祥", role: "教授 · 博士生导师", institution: "UCAS",
    area: "Visual Representation · Spatial Intelligence · Machine Perception", tags: ["视觉表征", "空间智能", "目标检测", "高文谱系"],
    summary: "中国科学院大学视觉表征、成像和空间智能 PI，长期研究目标检测、视觉感知和机器学习。",
    current: "中国科学院大学教授、博士生导师，负责机器学习与感知（LAMP）中关村开放实验室。", research: "视觉表征、成像、空间智能与机器感知。",
    education: "JDL 名录记录其 2006 年完成多媒体计算博士，导师为高文。", why: "官方主页记录其指导多名学生获得国家级和中科院优秀博士培养奖励。",
    profile: source("中国科学院大学 · 叶齐祥", "https://people.ucas.ac.cn/~qxye?language=cn", "当前任职、研究方向、教育背景、培养成果和官方肖像"), portraitFile: "ye-qixiang", stage: "institute", x: 820, y: 1080,
  },
  {
    id: "han-jiqing-hit", name: "韩纪庆", role: "二级教授 · 中心主任", institution: "HIT",
    area: "Speech Recognition · Audio Intelligence · Multimodal Perception", tags: ["语音识别", "音频智能", "多模态感知", "高文谱系"],
    summary: "哈尔滨工业大学听觉智能研究中心主任，是高文早期博士培养网络中的语音与音频智能分支。",
    current: "哈尔滨工业大学二级教授、长聘教授、博士生导师、听觉智能研究中心主任。", research: "语音处理、音频信息处理与听觉智能。",
    education: "1998 年在哈工大获博士学位；JDL 名录明确其语音识别博士导师为高文。", why: "长期承担国家科研项目并参与中文语音信息专业学术组织。",
    profile: source("哈尔滨工业大学听觉智能研究中心 · 韩纪庆", "https://aic.hit.edu.cn/", "当前任职、教育经历、研究方向、人才培养和官方肖像"), portraitFile: "han-jiqing", stage: "institute", x: 1100, y: 1230,
  },
  {
    id: "zhan-dechen-hit", name: "战德臣", role: "教授 · 博士生导师", institution: "HIT",
    area: "Artificial Intelligence · Image Processing · Computer Systems", tags: ["人工智能", "图像处理", "计算机系统", "高文谱系"],
    summary: "哈尔滨工业大学资深教授、博士生导师；JDL 记录其早期图像处理博士由李仲荣与高文共同指导。",
    current: "哈尔滨工业大学计算学部教授、博士生导师。", research: "人工智能、图像处理与计算机系统相关研究。",
    education: "JDL 名录记录其 1994 年完成图像处理博士，由李仲荣与高文共同指导。", why: "属于高文早期博士培养网络，并在哈工大继续承担博士生培养。",
    profile: source("哈尔滨工业大学 · 战德臣", "https://homepage.hit.edu.cn/zhandechen?lang=zh", "当前教授与博士生导师身份、院系和官方肖像"), portraitFile: "zhan-dechen", stage: "institute", x: 1240, y: 1230,
  },
];

export const gaoWenNetworkRound2People2026: Person[] = seeds.map((seed) => ({
  id: seed.id, name: seed.name, role: seed.role, institution: seed.institution, region: "Mainland China",
  area: seed.area, tags: seed.tags, summary: seed.summary, stage: seed.stage, category: "core", primary: true,
  facts: [
    { label: "当前任职", value: seed.current, source: seed.profile },
    { label: "研究主线", value: seed.research, source: seed.profile },
    { label: "教育与学术训练", value: seed.education, source: jdl },
    { label: "为什么值得关注", value: seed.why, source: seed.profile },
  ],
  sources: seed.institution === "HIT" ? [seed.profile, hitFaculty, jdl] : [seed.profile, jdl],
  portrait: { src: `portraits/gao-wen-network-round2/${seed.portraitFile}.jpg`, alt: `${seed.name} 肖像`, source: seed.profile },
  introducedAt: checkedAt, lastVerifiedAt: checkedAt, x: seed.x, y: seed.y,
}));

const edges = [
  ["zhai-deming-hit", "翟德明", "2014", false], ["hong-xiaopeng-hit", "洪晓鹏", "2010", false],
  ["liu-shaohui-hit", "刘绍辉", "2007", false], ["zhang-baochang-buaa", "张宝昌", "2006", false],
  ["ye-qixiang-ucas", "叶齐祥", "2006", false], ["han-jiqing-hit", "韩纪庆", "1998", false],
  ["zhan-dechen-hit", "战德臣", "1994", true],
] as const;

export const gaoWenNetworkRound2Relationships2026: Relationship[] = edges.map(([to, name, year, coAdvised]) => ({
  id: `gao-wen-${to}-phd`, from: "gao-wen-pku", to, type: "lineage", subtype: coAdvised ? "co_adviser" : "phd_adviser",
  label: coAdvised ? "共同博士导师" : "博士导师",
  evidence: `JDL 博士名录列${name} ${year} 年博士${coAdvised ? "由李仲荣与高文共同指导" : "导师为高文"}。`,
  evidenceObject: "JDL doctoral alumni roster", source: jdl, verified: true,
}));

const firstDestinations = [
  ["翟德明", "2014", "哈尔滨工业大学", "任教", "academia"], ["洪晓鹏", "2010", "University of Oulu", "博士后", "postdoc"],
  ["刘绍辉", "2007", "哈尔滨工业大学", "毕业去向", "academia"], ["张宝昌", "2006", "The Chinese University of Hong Kong", "博士后", "postdoc"],
  ["叶齐祥", "2006", "中国科学院研究生院", "毕业去向", "academia"], ["韩纪庆", "1998", "哈尔滨工业大学", "毕业去向", "academia"],
  ["战德臣", "1994", "哈尔滨工业大学", "毕业去向", "academia"],
] as const;

export const gaoWenNetworkRound2Placements2026: StudentPlacement[] = firstDestinations.map(([student, year, company, role, sector]) => ({
  id: `gao-jdl-r2-${student}-${year}`, student, teacherId: "gao-wen-pku", company, role, sector, kind: "first_job",
  note: "JDL 历史页面记录的毕业当年去向，不表示当前任职。", source: jdl,
}));

export const gaoWenNetworkRound2PersonEnhancements2026: Record<string, Partial<Person>> = {
  "gao-wen-pku": {
    facts: [{ label: "第二轮现任 PI 差集", value: "继续从完整培养名录反查现职，新增翟德明、洪晓鹏、刘绍辉、张宝昌、叶齐祥、韩纪庆和战德臣 7 位现任独立 PI；两轮合计提升 19 位学生为人物节点。", source: jdl }],
    sources: [jdl], lastVerifiedAt: checkedAt,
  },
};

export const gaoWenNetworkRound2Audit2026 = {
  checkedAt,
  method: "完整培养名录 → 现有人物去重 → 当前高校官方主页复核 → 官方头像人工检查 → 师承接入",
  promotedCurrentPIs: gaoWenNetworkRound2People2026.map((person) => person.id),
  promotedCount: gaoWenNetworkRound2People2026.length,
  cumulativePromotedFromGaoRoster: 19,
  safeguards: ["普通合著不当作师承", "历史毕业去向不覆盖当前任职", "未完成当前官方核验者只保留在培养名录"],
};
