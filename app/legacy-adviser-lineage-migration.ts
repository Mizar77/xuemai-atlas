import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";

const source = (label: string, url: string, supports: string, kind: Source["kind"] = "official"): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const profiles = {
  xuezhe: source("USC Information Sciences Institute · Xuezhe Ma", "https://www.isi.edu/directory/xuezhe-ma/", "Current USC Research Assistant Professor appointment and NLP/ML research"),
  meng: source("University of Notre Dame · Meng Jiang", "https://engineering.nd.edu/faculty/meng-jiang/", "Current collegiate professorship and data mining, ML and NLP research"),
  rainforth: source("University of Oxford · Tom Rainforth", "https://www.stats.ox.ac.uk/people/tom-rainforth", "Current Associate Professor role and RainML leadership"),
  teh: source("University of Oxford · Yee Whye Teh", "https://www.stats.ox.ac.uk/people/yee-whye-teh", "Current Professor of Statistical Machine Learning role"),
  changXu: source("University of Sydney · Chang Xu", "https://dsi.sydney.edu.au/wps-members/dr-chang-xu/", "Faculty role and computer-vision and machine-learning research"),
  chaoZhang: source("北京大学智能学院 · 张超", "https://www.cis.pku.edu.cn/info/1177/1380.htm", "北京大学智能学院教师身份与机器感知研究"),
  steveYoung: source("Emmanuel College Cambridge · Steve Young", "https://www.emma.cam.ac.uk/people/prof-steve-young", "Emeritus status and foundational speech and conversational-AI work"),
  qingfu: source("City University of Hong Kong · Qingfu Zhang", "https://www.cs.cityu.edu.hk/en/people/academic-staff", "Current Chair Professor of Computational Intelligence role"),
  edward: source("University of Essex · Edward Tsang", "https://www.essex.ac.uk/people/tsang70303/edward-tsang", "Emeritus Professor status"),
  yaochu: source("Westlake University · Yaochu Jin", "https://en.westlake.edu.cn/faculty/yaochu-jin.html", "Current Chair Professor of Artificial Intelligence appointment"),
  bernhard: source("Honda R&D · Bernhard Sendhoff", "https://global.honda/en/RandD/about/member/", "Current Honda R&D operating-officer role"),
  wulide: source("复旦大学自然语言处理实验室", "https://nlp.fudan.edu.cn/", "吴立德创建复旦 NLP 实验室及其奠基性研究角色"),
  emine: source("UCL · Information and Decision Systems Group", "https://www.ucl.ac.uk/engineering/computer-science/research/research-groups-and-centres/information-and-decision-systems-group-ids", "Current UCL Professor role and information-retrieval research"),
  helen: source("CUHK Research Portal · Helen Meng", "https://research.cuhk.edu.hk/en/persons/mei-ling-helen-meng/", "Current endowed professorship and speech/language research"),
  luo: source("CUHK-Shenzhen · Zhi-Quan Tom Luo", "https://sse.cuhk.edu.cn/en/faculty/luozhiquan", "Current Presidential Chair Professor and vice-president appointment"),
  degen: source("Stanford Profiles · Judith Degen", "https://profiles.stanford.edu/judith-degen", "Current Stanford faculty affiliation and psycholinguistics research"),
  aiken: source("Stanford Profiles · Alex Aiken", "https://profiles.stanford.edu/alex-aiken", "Current Alcatel-Lucent Professorship in Computer Science"),
  zaharia: source("UC Berkeley EECS · Matei Zaharia", "https://www2.eecs.berkeley.edu/Faculty/Homepages/matei.html", "Current Associate Professor appointment and AI systems research"),
  feiSha: source("USC ShaLab · Fei Sha", "https://shalab.usc.edu/people/", "Current Associate Professor role and research-group leadership"),
  jueWang: source("Oregon State · Fuxin Li", "https://engineering.oregonstate.edu/people/fuxin-li", "Fuxin Li's doctoral education and adviser Jue Wang"),
  soatto: source("UCLA Samueli · Stefano Soatto", "https://samueli.ucla.edu/people/stefano-soatto/", "Current UCLA professorship in computer science and ECE"),
  kutulakos: source("University of Toronto · Kyros Kutulakos", "https://www.cs.utoronto.ca/~kyros/", "Current professorship and computational-imaging group leadership", "profile"),
  guibas: source("Stanford Engineering · Leonidas Guibas", "https://engineering.stanford.edu/people/leonidas-guibas", "Current Paul Pigott Professorship and geometric-computation research"),
  schneider: source("Carnegie Mellon · Jeff Schneider", "https://www.cs.cmu.edu/~schneide/", "Current Research Professor role and active PhD supervision", "profile"),
  papadimitriou: source("Simons Institute · Christos Papadimitriou", "https://simons.berkeley.edu/people/christos-papadimitriou", "Current Columbia professorship and theoretical-computer-science research"),
};

const lineageSources = {
  zhisong: source("CMU LTI Alumni · Zhisong Zhang", "https://www.lti.cs.cmu.edu/people/alumni/alumni-2023/zhang-zhisong.html", "Xuezhe Ma listed as Zhisong Zhang's academic adviser"),
  gang: source("Gang Liu · homepage", "https://liugangcode.github.io/", "Notre Dame PhD advised by Meng Jiang", "profile"),
  ning: source("Oxford CSML · Ning Miao", "https://csml.stats.ox.ac.uk/people/miao/", "DPhil co-supervised by Tom Rainforth and Yee Whye Teh"),
  guo: source("Jianyuan Guo · homepage", "https://ggjy.github.io/", "University of Sydney PhD advised by Chang Xu and earlier PKU mentoring by Chao Zhang", "profile"),
  kaiYu: source("上海交通大学 · 俞凯学术与创业报道", "https://news.sjtu.edu.cn/jdyw/20201130/133775.html", "剑桥博士阶段导师 Steve Young"),
  aimin: source("华东师范大学 · 周爱民", "https://faculty.ecnu.edu.cn/_s16/zam/main.psp", "Essex 博士论文导师组包含 Qingfu Zhang、Edward Tsang、Yaochu Jin 与 Bernhard Sendhoff"),
  wulide: source("复旦大学校庆报道 · 吴立德学术谱系", "https://news.fudan.edu.cn/2023/0527/c2610a135077/page.htm", "黄萱菁与邱锡鹏师从吴立德"),
  yilmaz: source("ZJUI · 张强", "https://zjui.zju.edu.cn/team/teacherinfo/2673", "UCL 博士阶段师从 Emine Yilmaz"),
  xixin: source("Xixin Wu · homepage", "https://xixinwu.github.io/", "CUHK PhD advised by Helen Meng", "profile"),
  jiancong: source("NUS · Jiancong Xiao", "https://www.comp.nus.edu.sg/cs/people/jiancong-xiao/", "CUHK-Shenzhen PhD advised by Zhi-Quan Tom Luo"),
  michaelHahn: source("Saarland University · Michael Hahn", "https://www.uni-saarland.de/fachrichtung/lst/news/michael-hahn-nimmt-ruf-auf-die-tenure-track-professur-in-unserer-fachrichtung-an-23976.html", "Stanford Linguistics PhD jointly advised by Judith Degen and Dan Jurafsky"),
  zhihaoJia: source("Carnegie Mellon · Zhihao Jia", "https://csd.cs.cmu.edu/people/faculty/zhihao-jia", "Stanford PhD jointly advised by Alex Aiken and Matei Zaharia"),
  weiLunChao: source("Ohio State · Wei-Lun Chao", "https://tdai.osu.edu/people/chao.209", "USC Computer Science PhD advised by Fei Sha"),
  fuxinLi: source("Oregon State · Fuxin Li", "https://engineering.oregonstate.edu/people/fuxin-li", "CAS Institute of Automation PhD advised by Jue Wang"),
  vedaldi: source("Oxford Engineering · Andrea Vedaldi", "https://eng.ox.ac.uk/people/andrea-vedaldi", "UCLA PhD advised by Stefano Soatto"),
  otoole: source("Carnegie Mellon · Matthew O'Toole", "https://csd.cmu.edu/people/faculty/matthew-otoole", "University of Toronto MSc and PhD advised by Kyros Kutulakos"),
  heWang: source("Peking University · He Wang", "https://cfcs.pku.edu.cn/english/people/faculty/hewang/index.htm", "Stanford PhD advised by Leonidas J. Guibas"),
  danica: source("UBC · Danica J. Sutherland", "https://www.cs.ubc.ca/people/danica-sutherland", "CMU PhD advised by Jeff Schneider"),
  aditi: source("Carnegie Mellon · Aditi Raghunathan", "https://csd.cs.cmu.edu/people/faculty/aditi-raghunathan", "Stanford Computer Science PhD advised by Percy Liang"),
  daskalakis: source("Constantinos Daskalakis · homepage", "https://people.csail.mit.edu/costis/", "UC Berkeley PhD advised by Christos Papadimitriou", "profile"),
};

type Seed = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Person["institution"];
  actualInstitution?: string;
  region: NonNullable<Person["region"]>;
  area: string;
  tags: string[];
  current: boolean;
  profile: Source;
  lineage: Source;
};

const seeds: Seed[] = [
  { id: "xuezhe-ma-lineage", name: "Xuezhe Ma", role: "Research Assistant Professor", institution: "Award Network", actualInstitution: "University of Southern California", region: "United States", area: "Natural Language Processing · Representation Learning", tags: ["NLP", "结构化预测"], current: true, profile: profiles.xuezhe, lineage: lineageSources.zhisong },
  { id: "meng-jiang-lineage", name: "Meng Jiang", role: "Freimann Collegiate Professor", institution: "Award Network", actualInstitution: "University of Notre Dame", region: "United States", area: "Data Mining · Machine Learning · NLP", tags: ["NLP", "图学习", "AI for Science"], current: true, profile: profiles.meng, lineage: lineageSources.gang },
  { id: "tom-rainforth-lineage", name: "Tom Rainforth", role: "Associate Professor of Statistical Machine Learning", institution: "Oxford", region: "Europe", area: "Probabilistic Machine Learning · Uncertainty · LLMs", tags: ["概率机器学习", "不确定性", "LLM"], current: true, profile: profiles.rainforth, lineage: lineageSources.ning },
  { id: "yee-whye-teh-lineage", name: "Yee Whye Teh", role: "Professor of Statistical Machine Learning", institution: "Oxford", region: "Europe", area: "Bayesian Machine Learning · Deep Learning", tags: ["贝叶斯学习", "概率模型"], current: true, profile: profiles.teh, lineage: lineageSources.ning },
  { id: "chang-xu-lineage", name: "Chang Xu", role: "Senior Lecturer · ARC DECRA Fellow", institution: "Award Network", actualInstitution: "University of Sydney", region: "United States", area: "Machine Learning · Computer Vision", tags: ["计算机视觉", "机器学习"], current: true, profile: profiles.changXu, lineage: lineageSources.guo },
  { id: "chao-zhang-pku-lineage", name: "张超", role: "Associate Professor", institution: "PKU", region: "Mainland China", area: "Machine Perception · Signal Processing", tags: ["机器感知", "信号处理"], current: true, profile: profiles.chaoZhang, lineage: lineageSources.guo },
  { id: "steve-young-lineage", name: "Steve Young", role: "Emeritus Professor of Information Engineering", institution: "Cambridge", region: "Europe", area: "Speech Recognition · Spoken Dialogue Systems", tags: ["语音识别", "对话系统"], current: false, profile: profiles.steveYoung, lineage: lineageSources.kaiYu },
  { id: "qingfu-zhang-lineage", name: "Qingfu Zhang", chinese: "张青富", role: "Chair Professor of Computational Intelligence", institution: "CityU", region: "Hong Kong", area: "Evolutionary Computation · Multi-objective Optimization", tags: ["进化计算", "多目标优化"], current: true, profile: profiles.qingfu, lineage: lineageSources.aimin },
  { id: "edward-tsang-lineage", name: "Edward Tsang", role: "Emeritus Professor", institution: "Award Network", actualInstitution: "University of Essex", region: "Europe", area: "Computational Intelligence · Constraint Satisfaction", tags: ["计算智能", "约束求解"], current: false, profile: profiles.edward, lineage: lineageSources.aimin },
  { id: "yaochu-jin-lineage", name: "金耀初", role: "Chair Professor of Artificial Intelligence", institution: "Award Network", actualInstitution: "Westlake University", region: "Mainland China", area: "Trustworthy AI · Evolutionary Optimization · Embodied AI", tags: ["可信 AI", "进化优化", "具身智能"], current: true, profile: profiles.yaochu, lineage: lineageSources.aimin },
  { id: "bernhard-sendhoff-lineage", name: "Bernhard Sendhoff", role: "Operating Officer · Honda R&D", institution: "External", actualInstitution: "Honda Research Institutes", region: "Europe", area: "Evolutionary Computation · Industrial AI", tags: ["进化计算", "工业 AI"], current: false, profile: profiles.bernhard, lineage: lineageSources.aimin },
  { id: "wulide-lineage", name: "吴立德", role: "Founder · Fudan NLP Laboratory", institution: "FDU", region: "Mainland China", area: "Natural Language Processing · Information Retrieval", tags: ["NLP", "信息检索", "奠基者"], current: false, profile: profiles.wulide, lineage: lineageSources.wulide },
  { id: "emine-yilmaz-lineage", name: "Emine Yilmaz", role: "Professor of Computer Science", institution: "UCL", region: "Europe", area: "Information Retrieval · Conversational Search", tags: ["信息检索", "对话搜索"], current: true, profile: profiles.emine, lineage: lineageSources.yilmaz },
  { id: "helen-meng-lineage", name: "Helen Meng", chinese: "蒙美玲", role: "Patrick Huen Wing Ming Professor", institution: "CUHK", region: "Hong Kong", area: "Speech and Language Processing · Conversational AI", tags: ["语音", "NLP", "对话 AI"], current: true, profile: profiles.helen, lineage: lineageSources.xixin },
  { id: "zhi-quan-luo-lineage", name: "Zhi-Quan Tom Luo", role: "Presidential Chair Professor · Vice President (Academic)", institution: "Award Network", actualInstitution: "CUHK-Shenzhen", region: "Mainland China", area: "Optimization · Big Data Analytics · AI", tags: ["优化", "机器学习", "AI"], current: true, profile: profiles.luo, lineage: lineageSources.jiancong },
  { id: "judith-degen-lineage", name: "Judith Degen", role: "Faculty · Linguistics", institution: "Award Network", actualInstitution: "Stanford University", region: "United States", area: "Psycholinguistics · Pragmatics · Language Models", tags: ["语言学", "语用学"], current: true, profile: profiles.degen, lineage: lineageSources.michaelHahn },
  { id: "alex-aiken-lineage", name: "Alex Aiken", role: "Alcatel-Lucent Professor of Computer Science", institution: "Stanford", region: "United States", area: "Programming Languages · AI Systems", tags: ["编程语言", "系统"], current: true, profile: profiles.aiken, lineage: lineageSources.zhihaoJia },
  { id: "matei-zaharia-lineage", name: "Matei Zaharia", role: "Associate Professor of EECS", institution: "Berkeley", region: "United States", area: "AI Systems · Data Management · Information Retrieval", tags: ["AI 系统", "数据系统", "Databricks"], current: true, profile: profiles.zaharia, lineage: lineageSources.zhihaoJia },
  { id: "fei-sha-lineage", name: "Fei Sha", role: "Associate Professor", institution: "Award Network", actualInstitution: "University of Southern California", region: "United States", area: "Machine Learning · Computer Vision · Robotics", tags: ["机器学习", "计算机视觉"], current: true, profile: profiles.feiSha, lineage: lineageSources.weiLunChao },
  { id: "jue-wang-cas-lineage", name: "Jue Wang", chinese: "王珏", role: "Doctoral Adviser · CAS Institute of Automation", institution: "CAS-IA", region: "Mainland China", area: "Machine Learning · Pattern Recognition", tags: ["机器学习", "模式识别"], current: false, profile: profiles.jueWang, lineage: lineageSources.fuxinLi },
  { id: "stefano-soatto-lineage", name: "Stefano Soatto", role: "Professor of Computer Science and ECE", institution: "UCLA", region: "United States", area: "Computer Vision · Machine Learning · Robotics", tags: ["计算机视觉", "机器人"], current: true, profile: profiles.soatto, lineage: lineageSources.vedaldi },
  { id: "kyros-kutulakos-lineage", name: "Kyros Kutulakos", role: "Professor of Computer Science", institution: "U of Toronto", region: "Canada", area: "Computer Vision · Computational Imaging", tags: ["计算机视觉", "计算成像"], current: true, profile: profiles.kutulakos, lineage: lineageSources.otoole },
  { id: "leonidas-guibas-lineage", name: "Leonidas Guibas", role: "Paul Pigott Professor of Engineering", institution: "Stanford", region: "United States", area: "Computer Vision · Geometric Computing · Robotics", tags: ["计算机视觉", "几何计算", "机器人"], current: true, profile: profiles.guibas, lineage: lineageSources.heWang },
  { id: "jeff-schneider-lineage", name: "Jeff Schneider", role: "Research Professor", institution: "CMU", region: "United States", area: "Machine Learning · Reinforcement Learning · Robotics", tags: ["机器学习", "强化学习"], current: true, profile: profiles.schneider, lineage: lineageSources.danica },
  { id: "christos-papadimitriou-lineage", name: "Christos Papadimitriou", role: "Professor of Computer Science", institution: "Columbia", region: "United States", area: "Algorithms · Complexity · Learning Theory", tags: ["算法", "计算复杂性", "学习理论"], current: true, profile: profiles.papadimitriou, lineage: lineageSources.daskalakis },
];

export const legacyAdviserLineagePeople: Person[] = seeds.map((seed, index) => ({
  id: seed.id,
  name: seed.name,
  chinese: seed.chinese,
  role: seed.role,
  institution: seed.institution,
  actualInstitution: seed.actualInstitution,
  region: seed.region,
  area: seed.area,
  tags: ["导师谱系", ...seed.tags],
  summary: `${seed.name} 作为可核验的学位导师节点进入图谱；人物现职与师承关系分别由机构页面和学生履历支持。`,
  facts: [
    { label: "当前角色", value: seed.role, source: seed.profile },
    { label: "研究主线", value: seed.area, source: seed.profile },
    { label: "师承证据", value: seed.lineage.supports ?? "学生公开履历明确记录导师关系。", source: seed.lineage },
  ],
  stage: seed.current ? "senior" : "historical",
  category: seed.current ? "core" : "historical",
  status: seed.current ? "在职 PI" : "通过师承关系展示",
  sources: [seed.profile, seed.lineage],
  x: 85 + (index % 8) * 120,
  y: 55 + Math.floor(index / 8) * 95,
  primary: seed.current,
  lastVerifiedAt: checkedAt,
}));

const lineage = (id: string, from: string, to: string, subtype: NonNullable<Relationship["subtype"]>, sourceRecord: Source, evidence: string): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "master_adviser" ? "硕士导师" : subtype === "co_adviser" ? "共同博士导师" : "博士导师",
  evidence,
  source: sourceRecord,
  verified: true,
});

export const legacyAdviserLineageRelationships: Relationship[] = [
  lineage("lineage-xuezhe-ma-zhisong-zhang", "xuezhe-ma-lineage", "zhisong-zhang", "phd_adviser", lineageSources.zhisong, "CMU LTI 校友记录明确列 Xuezhe Ma 为 Zhisong Zhang 的 Academic Advisor。"),
  lineage("lineage-meng-jiang-gang-liu", "meng-jiang-lineage", "gang-liu-cityu", "phd_adviser", lineageSources.gang, "Gang Liu 个人主页明确记录其 Notre Dame 博士由 Meng Jiang 指导。"),
  lineage("lineage-rainforth-ning-miao", "tom-rainforth-lineage", "ning-miao", "co_adviser", lineageSources.ning, "Oxford CSML 记录 Ning Miao 的 DPhil 由 Tom Rainforth 共同指导。"),
  lineage("lineage-teh-ning-miao", "yee-whye-teh-lineage", "ning-miao", "co_adviser", lineageSources.ning, "Oxford CSML 与 Yee Whye Teh 组页记录 Ning Miao 的 DPhil 由 Yee Whye Teh 共同指导。"),
  lineage("lineage-chang-xu-jianyuan-guo", "chang-xu-lineage", "jianyuan-guo", "phd_adviser", lineageSources.guo, "Jianyuan Guo 个人主页明确列 Chang Xu 为其 University of Sydney 博士导师。"),
  lineage("lineage-chao-zhang-jianyuan-guo", "chao-zhang-pku-lineage", "jianyuan-guo", "master_adviser", lineageSources.guo, "Jianyuan Guo 个人主页明确记录其北大本科/硕士阶段由张超指导；本图保守归入硕士导师层。"),
  lineage("lineage-steve-young-kai-yu", "steve-young-lineage", "kai-yu-sjtu", "phd_adviser", lineageSources.kaiYu, "上海交大官方报道记录俞凯博士阶段师从 Steve Young。"),
  lineage("lineage-qingfu-zhang-aimin-zhou", "qingfu-zhang-lineage", "aimin-zhou-ecnu", "co_adviser", lineageSources.aimin, "华东师大主页列 Qingfu Zhang 为周爱民博士论文导师之一。"),
  lineage("lineage-edward-tsang-aimin-zhou", "edward-tsang-lineage", "aimin-zhou-ecnu", "co_adviser", lineageSources.aimin, "华东师大主页列 Edward Tsang 为周爱民博士论文导师之一。"),
  lineage("lineage-yaochu-jin-aimin-zhou", "yaochu-jin-lineage", "aimin-zhou-ecnu", "co_adviser", lineageSources.aimin, "华东师大主页列金耀初为周爱民博士论文导师之一。"),
  lineage("lineage-sendhoff-aimin-zhou", "bernhard-sendhoff-lineage", "aimin-zhou-ecnu", "co_adviser", lineageSources.aimin, "华东师大主页列 Bernhard Sendhoff 为周爱民博士论文导师之一。"),
  lineage("lineage-wulide-xuanjing-huang", "wulide-lineage", "xuanjing-huang", "phd_adviser", lineageSources.wulide, "复旦大学校庆报道明确记载黄萱菁师从吴立德。"),
  lineage("lineage-wulide-xipeng-qiu", "wulide-lineage", "xipeng-qiu", "phd_adviser", lineageSources.wulide, "复旦大学校庆报道明确记载邱锡鹏师从吴立德。"),
  lineage("lineage-yilmaz-qiang-zhang", "emine-yilmaz-lineage", "qiang-zhang-zju", "phd_adviser", lineageSources.yilmaz, "ZJUI 官方简介记录张强在 UCL 博士阶段师从 Emine Yilmaz。"),
  lineage("lineage-helen-meng-xixin-wu", "helen-meng-lineage", "xixin-wu", "phd_adviser", lineageSources.xixin, "Xixin Wu 个人主页明确列 Helen Meng 为其 CUHK 博士导师。"),
  lineage("lineage-tom-luo-jiancong-xiao", "zhi-quan-luo-lineage", "jiancong-xiao", "phd_adviser", lineageSources.jiancong, "NUS 官方主页明确记录 Jiancong Xiao 的 CUHK-Shenzhen 博士导师为 Zhi-Quan Tom Luo。"),
  lineage("lineage-degen-michael-hahn", "judith-degen-lineage", "michael-hahn-award", "co_adviser", lineageSources.michaelHahn, "Saarland University 介绍记录 Michael Hahn 的 Stanford Linguistics 博士由 Judith Degen 共同指导。"),
  lineage("lineage-jurafsky-michael-hahn", "dan-jurafsky-us", "michael-hahn-award", "co_adviser", lineageSources.michaelHahn, "Saarland University 介绍记录 Michael Hahn 的 Stanford Linguistics 博士由 Dan Jurafsky 共同指导。"),
  lineage("lineage-aiken-zhihao-jia", "alex-aiken-lineage", "zhihao-jia-award", "co_adviser", lineageSources.zhihaoJia, "CMU 官方简介记录 Zhihao Jia 的 Stanford 博士由 Alex Aiken 共同指导。"),
  lineage("lineage-zaharia-zhihao-jia", "matei-zaharia-lineage", "zhihao-jia-award", "co_adviser", lineageSources.zhihaoJia, "CMU 官方简介记录 Zhihao Jia 的 Stanford 博士由 Matei Zaharia 共同指导。"),
  lineage("lineage-fei-sha-wei-lun-chao", "fei-sha-lineage", "wei-lun-chao-osu-award", "phd_adviser", lineageSources.weiLunChao, "Ohio State 官方简介记录 Wei-Lun Chao 的 USC 博士导师为 Fei Sha。"),
  lineage("lineage-jue-wang-fuxin-li", "jue-wang-cas-lineage", "fuxin-li-oregon-award", "phd_adviser", lineageSources.fuxinLi, "Oregon State 官方简介记录 Fuxin Li 的中科院自动化所博士导师为 Jue Wang。"),
  lineage("lineage-soatto-vedaldi", "stefano-soatto-lineage", "andrea-vedaldi-oxford-award", "phd_adviser", lineageSources.vedaldi, "Oxford 官方简介记录 Andrea Vedaldi 的 UCLA 博士导师为 Stefano Soatto。"),
  lineage("lineage-kutulakos-otoole", "kyros-kutulakos-lineage", "matthew-otoole-cmu-award", "phd_adviser", lineageSources.otoole, "CMU 官方简介记录 Matthew O'Toole 的 Toronto 硕博阶段由 Kyros Kutulakos 指导。"),
  lineage("lineage-guibas-he-wang", "leonidas-guibas-lineage", "he-wang-pku-award", "phd_adviser", lineageSources.heWang, "北京大学官方简介记录 He Wang 的 Stanford 博士导师为 Leonidas J. Guibas。"),
  lineage("lineage-schneider-danica-sutherland", "jeff-schneider-lineage", "danica-sutherland-award", "phd_adviser", lineageSources.danica, "UBC 官方简介记录 Danica J. Sutherland 的 CMU 博士导师为 Jeff Schneider。"),
  lineage("lineage-percy-liang-aditi-raghunathan", "percy-liang-us", "aditi-raghunathan-award", "phd_adviser", lineageSources.aditi, "CMU 官方简介记录 Aditi Raghunathan 的 Stanford 博士导师为 Percy Liang。"),
  lineage("lineage-papadimitriou-daskalakis", "christos-papadimitriou-lineage", "constantinos-daskalakis-award", "phd_adviser", lineageSources.daskalakis, "Constantinos Daskalakis 的公开履历记录 UC Berkeley 博士导师为 Christos Papadimitriou。"),
];

/**
 * These legacy records encoded a named adviser or student as a self-loop.
 * Their evidence remains in the source modules, but the graph now uses real
 * person-to-person edges above (or a placement entry when the other endpoint
 * is not yet a verified in-scope scholar).
 */
export const supersededLegacyLineageIds = new Set([
  "ma-zhisong-lineage",
  "jiang-gang-lineage",
  "ning-oxford-lineage",
  "guo-lineage",
  "tang-yangyang-student",
  "tang-jingzhang-student",
  "tang-qiujiezhong-student",
  "che-xuxiao-student",
  "wen-dong-student",
  "yu-steve-young-lineage",
  "zhou-essex-lineage",
  "pan-kan-lineage",
  "fdu-wu-huang-lineage",
  "fdu-wu-qiu-lineage",
  "zju-zhang-yilmaz",
  "xixin-helen-meng-lineage",
  "xiao-luo-lineage",
  "mainland-full-huang-wulide-lineage",
  "mainland-full-qin-zhangmuyu-lineage",
  "mainland-full2-qiu-wulide-lineage",
]);
