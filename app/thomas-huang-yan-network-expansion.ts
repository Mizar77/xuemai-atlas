import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-02";
const official = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });
const profile = (label: string, url: string, supports: string): Source => ({ label, url, kind: "profile", checkedAt, supports });

const illinoisFellowship = official(
  "Illinois ECE — Thomas and Margaret Huang PhD Fellowship",
  "https://ece.illinois.edu/news/huang-fellowship-established",
  "Thomas Huang's 120+ doctoral and postdoctoral trainees and named group alumni",
);
const illinoisCareer = official(
  "Illinois ECE — Thomas Huang elected Academician",
  "https://ece.illinois.edu/news/2579",
  "Thomas Huang's education, MIT/Purdue/Illinois trajectory, research and academy honours",
);
const illinoisYong = official(
  "Illinois ECE — Gifts celebrate Thomas and Margaret Huang",
  "https://ece.illinois.edu/news/13283",
  "Yong Rui's 1999 Illinois PhD and work in Thomas Huang's group",
);
const illinoisHumphrey = official(
  "Illinois ECE — Agriculture-Vision",
  "https://ece.illinois.edu/news/7638",
  "Humphrey Shi's Illinois MS/PhD years and research with Thomas Huang",
);
const pkuYan = official(
  "北京大学数学科学学院院友网 — 颜水成",
  "https://www.math.pku.edu.cn/mathalumni/yyxw/rdxw/141114.htm",
  "颜水成 2004 年博士学位、博士导师程乾生及职业概况",
);
const pkuCheng = official(
  "北京大学数学科学学院 — 程乾生先生生平",
  "https://www.math.pku.edu.cn/docs/20220830092744756496.pdf",
  "程乾生在北京大学的教学科研生涯与生卒年份",
);
const yanNus = official(
  "NUS Computing — Shuicheng Yan",
  "https://www.comp.nus.edu.sg/cs/people/yansc/",
  "颜水成现职、教育、Sea 经历、研究领域和团队成果",
);
const yan360 = official(
  "360 社区 — 颜水成与 360 人工智能研究院",
  "https://bbs.360.cn/thread-15209009-1-1.html",
  "2017 年 360 副总裁、首席科学家、人工智能研究院院长职务及研究院成立时间",
);
const yanLvLab = profile(
  "Learning and Vision Laboratory — history",
  "https://www.lv-lab.org/history_lv_lab.html",
  "LV Lab 2007 年创立、颜水成 2015 年加入 360、Jiashi Feng 接任及 2025 年回归",
);
const yanStudents = official(
  "NUS ECE — student awards and achievements",
  "https://www.ece.nus.edu.sg/community/students/awards/",
  "Min Lin、Chen Qiang、Jian Dong、Junshi Huang、Wei Xia、Canyi Lu 等学生与颜水成的指导关系",
);
const jiashiAdvisers = profile(
  "Huan Xu homepage — alumni",
  "https://guppy.mpe.nus.edu.sg/mpexuh/",
  "Jiashi Feng 2009–2014 NUS PhD and co-advisers Huan Xu and Shuicheng Yan",
);
const panSmu = official(
  "SMU Faculty Directory — Pan Zhou",
  "https://faculty.smu.edu.sg/profile/zhou-pan-7776",
  "Pan Zhou's current appointment, PhD institution, research and current advisees",
);
const panHome = profile(
  "Pan Zhou homepage",
  "https://panzhous.github.io/",
  "NUS PhD co-advisers Jiashi Feng and Shuicheng Yan, prior Sea/Salesforce roles and research",
);
const minHome = profile(
  "Min Lin homepage",
  "https://linmin.me/",
  "Current Sea AI Lab research leadership and research interests",
);
const lvLabPeople = profile(
  "Learning and Vision Laboratory — people",
  "https://www.lv-lab.org/index.html",
  "Jiashi Feng's former LV Lab directorship and subsequent move to ByteDance",
);
const changHome = profile(
  "PolyU COMP — Chang Wen Chen",
  "https://www4.comp.polyu.edu.hk/~chencw/Home.html",
  "Current PolyU chair professorship, research and career",
);
const changBio = profile(
  "PolyU COMP — Chang Wen Chen biography",
  "https://web.comp.polyu.edu.hk/chencw/Biography.html",
  "Illinois PhD, Buffalo and CUHK-Shenzhen leadership trajectory",
);
const humphreyGt = official(
  "Georgia Tech College of Computing — Humphrey Shi",
  "https://www.ic.gatech.edu/people/humphrey-shi",
  "Current Georgia Tech appointment, research and education",
);
const humphreyHome = profile(
  "Humphrey Shi homepage",
  "https://www.humphreyshi.com/",
  "NVIDIA leadership, prior Picsart and IBM roles, research and student outcomes",
);
const yongLenovo = official(
  "Lenovo — leadership biography for Yong Rui",
  "https://www.lenovo.com/in/en/about/who-we-are/our-leadership/",
  "Current Emerging Technology Group presidency, prior Microsoft career, education and research leadership",
);
const yongAnnouncement = official(
  "Lenovo Research — Emerging Technology Group appointment",
  "https://research.lenovo.com/webapp/view_English/newsDetails.html?id=783",
  "Yong Rui's 2024 move from group CTO to President of Emerging Technology Group",
);
const canyiHome = profile(
  "Canyi Lu homepage",
  "https://canyilu.github.io/",
  "NUS PhD work with Shuicheng Yan, Zhouchen Lin and Jiashi Feng and research interests",
);

const adjacent = (entry: Pick<Person, "id" | "name" | "chinese" | "role" | "institution" | "actualInstitution" | "region" | "area" | "tags" | "summary" | "facts" | "sources">): Person => ({
  ...entry,
  stage: "adjacent",
  category: "adjacent",
  primary: false,
  status: "verified adjacent / alumni node",
  x: 0,
  y: 0,
  lastVerifiedAt: checkedAt,
});

export const thomasHuangYanPeople: Person[] = [
  adjacent({
    id: "cheng-qiansheng-pku-historical", name: "程乾生", role: "北京大学数学科学学院教授（1940–2010）", institution: "PKU", region: "Mainland China",
    area: "Applied Mathematics · Image Analysis · Pattern Recognition", tags: ["应用数学", "模式识别", "博士导师", "颜水成谱系"],
    summary: "北京大学应用数学教授，是颜水成博士阶段的明确导师节点。",
    facts: [
      { label: "学术任职", value: "长期任教于北京大学数学科学学院，并参与概率统计与图像处理相关人才培养。", source: pkuCheng },
      { label: "培养关系", value: "北京大学院友资料明确记载，颜水成 2004 年应用数学博士师从程乾生。", source: pkuYan },
      { label: "图谱位置", value: "作为颜水成学术谱系的上游节点，连接北大应用数学与新加坡计算机视觉、机器学习网络。", source: pkuYan },
    ],
    sources: [pkuCheng, pkuYan],
  }),
  {
    id: "humphrey-shi-gatech", name: "Humphrey Shi", chinese: "施宏辉", role: "Associate Professor · VP of High-Performance AI, NVIDIA", institution: "Georgia Tech", region: "United States",
    area: "Computer Vision · Efficient AI · Vision-Language Models", tags: ["计算机视觉", "高性能 AI", "NVIDIA", "Thomas Huang 谱系"],
    summary: "Georgia Tech 副教授、NVIDIA 高性能 AI 副总裁；Illinois 博士阶段受 Thomas S. Huang 指导。",
    facts: [
      { label: "当前任职", value: "Georgia Tech College of Computing 副教授，并在 NVIDIA 负责高性能 AI 研究。", source: humphreyGt },
      { label: "教育与学术训练", value: "2017 年获 Illinois ECE 博士；论文致谢和 Illinois 官方资料均将 Thomas S. Huang 列为导师。", source: illinoisHumphrey },
      { label: "研究主线", value: "研究计算机视觉、高性能 AI 与视觉语言模型，关注高效、可扩展的视觉智能。", source: humphreyHome },
      { label: "产业轨迹", value: "曾任 Picsart Chief Scientist，并有 IBM Research 经历；当前连接高校视觉研究与 NVIDIA 产业研发。", source: humphreyHome },
      { label: "为什么值得关注", value: "是 Thomas Huang 晚期深度视觉人才谱系中同时具有高校 PI 与大型 AI 公司领导角色的代表节点。", source: illinoisFellowship },
    ],
    stage: "senior", category: "core", primary: true, status: "current PI", sources: [humphreyGt, humphreyHome, illinoisHumphrey, illinoisFellowship], x: 0, y: 0, lastVerifiedAt: checkedAt, introducedAt: checkedAt,
  },
  {
    id: "chang-wen-chen-polyu", name: "Chang Wen Chen", chinese: "陈长汶", role: "Chair Professor of Visual Computing", institution: "PolyU", region: "Hong Kong",
    area: "Visual Computing · Multimedia · AI Systems", tags: ["视觉计算", "多媒体", "研究领导", "Thomas Huang 谱系"],
    summary: "PolyU 视觉计算讲席教授；Illinois 博士阶段受 Thomas S. Huang 指导，职业轨迹横跨美国、中国内地与香港。",
    facts: [
      { label: "当前任职", value: "香港理工大学视觉计算讲席教授。", source: changHome },
      { label: "教育与学术训练", value: "1992 年获 Illinois ECE 博士，是 Thomas S. Huang Image Formation and Processing Group 校友。", source: illinoisFellowship },
      { label: "研究主线", value: "聚焦视觉计算、多媒体通信、图像与视频处理及相关 AI 系统。", source: changHome },
      { label: "领导经历", value: "曾任 SUNY Buffalo Empire Innovation Professor，并于 2017–2020 年担任 CUHK-Shenzhen 理工学院院长。", source: changBio },
      { label: "为什么值得关注", value: "连接 Thomas Huang 视觉/多媒体谱系与香港、深圳及北美高校研究网络。", source: changBio },
    ],
    stage: "senior", category: "core", primary: true, status: "current PI", sources: [changHome, changBio, illinoisFellowship], x: 0, y: 0, lastVerifiedAt: checkedAt, introducedAt: checkedAt,
  },
  adjacent({
    id: "yong-rui-lenovo", name: "Yong Rui", chinese: "芮勇", role: "Senior Vice President · President, Emerging Technology Group, Lenovo", institution: "SEU", actualInstitution: "Lenovo Emerging Technology Group", region: "Mainland China",
    area: "Artificial Intelligence · Multimedia · Technology Strategy", tags: ["产业研究", "多媒体", "Lenovo", "Thomas Huang 谱系"],
    summary: "联想集团高级副总裁、Emerging Technology Group 总裁；Illinois 博士阶段在 Thomas Huang 组内完成研究。",
    facts: [
      { label: "现职", value: "2024 年起任联想 Emerging Technology Group 总裁，此前七年担任集团 CTO。", source: yongAnnouncement },
      { label: "博士师承", value: "1999 年获 Illinois 博士，Illinois 官方资料将其列为 Thomas Huang 研究组成员。", source: illinoisYong },
      { label: "产业轨迹", value: "加入联想前在 Microsoft 工作 18 年，历任研究、孵化与产品研发领导岗位。", source: yongLenovo },
      { label: "图谱位置", value: "是 Thomas Huang 学术人才流向全球大型科技公司研发管理层的代表节点。", source: yongLenovo },
    ],
    sources: [yongLenovo, yongAnnouncement, illinoisYong],
  }),
  adjacent({
    id: "min-lin-sea", name: "Min Lin", chinese: "林敏", role: "Principal Research Scientist · Head of Research, Sea AI Lab", institution: "External", actualInstitution: "Sea AI Lab", region: "Singapore",
    area: "Continual Learning · AI for Science · ML Systems", tags: ["Sea AI Lab", "持续学习", "AI for Science", "颜水成谱系"],
    summary: "Sea AI Lab 研究负责人；NUS 官方记录其博士阶段团队由颜水成指导。",
    facts: [
      { label: "现职", value: "公开主页列为 Sea AI Lab Principal Research Scientist 与 Head of Research。", source: minHome },
      { label: "博士培养", value: "NUS ECE 奖项记录将 Min Lin 列为颜水成指导的 NGS 博士生团队成员。", source: yanStudents },
      { label: "研究主题", value: "关注在线持续学习、AI for Science 与机器学习系统。", source: minHome },
    ], sources: [minHome, yanStudents],
  }),
  adjacent({
    id: "jiashi-feng-bytedance", name: "Jiashi Feng", chinese: "冯佳时", role: "Former NUS Assistant Professor · ByteDance AI researcher", institution: "External", actualInstitution: "ByteDance", region: "Singapore",
    area: "Computer Vision · Deep Learning · Robust Learning", tags: ["计算机视觉", "深度学习", "ByteDance", "颜水成谱系"],
    summary: "颜水成与 Huan Xu 共同指导的 NUS 博士，曾任 NUS Assistant Professor 和 LV Lab 主任，后进入 ByteDance。",
    facts: [
      { label: "博士师承", value: "2009–2014 年在 NUS 攻读博士，由 Huan Xu 与 Shuicheng Yan 共同指导。", source: jiashiAdvisers },
      { label: "学术任职", value: "2015 年加入 NUS ECE 任 Assistant Professor，并于 2015–2021 年领导 LV Lab。", source: yanLvLab },
      { label: "人才流动", value: "LV Lab 公开历史页记录其 2021 年后进入 ByteDance。", source: lvLabPeople },
    ], sources: [jiashiAdvisers, yanLvLab, lvLabPeople],
  }),
  {
    id: "pan-zhou-smu", name: "Pan Zhou", chinese: "周盼", role: "Assistant Professor · Lee Kong Chian Fellow", institution: "SMU", region: "Singapore",
    area: "Efficient AI · Multimodal Learning · Agentic Reasoning", tags: ["高效 AI", "多模态", "LLM Agent", "颜水成谱系", "招 PhD/RA"],
    summary: "SMU tenure-track Assistant Professor、LV Lab 主任；NUS 博士由 Jiashi Feng 与 Shuicheng Yan 共同指导。",
    facts: [
      { label: "当前任职", value: "SMU 计算与信息系统学院 Assistant Professor、Lee Kong Chian Fellow，并领导 LV Lab@SMU。", source: panSmu },
      { label: "教育与学术训练", value: "NUS 博士由 Jiashi Feng 与 Shuicheng Yan 共同指导。", source: panHome },
      { label: "研究主线", value: "研究高效 AI、多模态学习、生成式模型与智能体推理。", source: panHome },
      { label: "产业经历", value: "加入 SMU 前曾任 Sea AI Lab Senior Research Scientist 与 Salesforce Research Scientist。", source: panHome },
      { label: "招生状态", value: "个人主页公开招收全日制/兼职博士、访问学生与研究实习，方向包括 agent、LLM/MLLM 和生成式 AI。", source: panHome },
    ],
    stage: "emerging", category: "core", primary: true, status: "current PI · recruiting", sources: [panSmu, panHome, yanLvLab], x: 0, y: 0, lastVerifiedAt: checkedAt, introducedAt: checkedAt,
  },
  adjacent({
    id: "canyi-lu-yan-alumnus", name: "Canyi Lu", chinese: "卢参义", role: "NUS PhD alumnus · machine learning researcher", institution: "External", region: "Singapore",
    area: "Low-Rank Learning · Optimization · Computer Vision", tags: ["低秩学习", "优化", "计算机视觉", "颜水成谱系"],
    summary: "NUS 博士阶段与颜水成、林宙辰和 Jiashi Feng 合作，是颜水成早期视觉与优化人才网络中的明确节点。",
    facts: [
      { label: "博士培养", value: "NUS 官方奖项资料明确称其为颜水成指导的博士生。", source: yanStudents },
      { label: "共同指导网络", value: "个人主页列出博士阶段与 Shuicheng Yan、Zhouchen Lin 和 Jiashi Feng 密切合作。", source: canyiHome },
      { label: "研究主题", value: "聚焦结构稀疏性、低秩矩阵/张量学习、优化与计算机视觉。", source: canyiHome },
    ], sources: [yanStudents, canyiHome],
  }),
];

export const thomasHuangYanPersonEnhancements: Record<string, Partial<Person>> = {
  "thomas-huang-historical": {
    summary: "图像处理、模式识别与计算机视觉奠基性学者；其跨 MIT、Purdue、Illinois 的培养体系包含 120 多名博士生和博士后，并向北美、亚洲高校及大型科技企业扩散。",
    tags: ["图像处理奠基", "计算机视觉", "120+ 博士/博士后", "跨地区导师谱系", "NAE"],
    knownAlumniCount: 120,
    facts: [
      { label: "培养规模", value: "Illinois 官方纪念资料记载，他指导了 120 多名博士生与博士后；这是公开下限，不等于完整名单。", source: illinoisFellowship },
      { label: "代表性学生/博士后", value: "公开点名的组员包括 Yong Rui、Chang Wen Chen、Shuicheng Yan、Humphrey Shi；图谱另已有 Zhangyang Wang。", source: illinoisFellowship },
      { label: "任职轨迹", value: "1963 年获 MIT ScD 后留校任教，1973 年转 Purdue，1980 年加入 Illinois。", source: illinoisCareer },
      { label: "研究贡献", value: "长期推进图像压缩、二维序列的三维信息恢复、模式识别、计算机视觉及多模态信号分析。", source: illinoisCareer },
      { label: "重要荣誉", value: "美国国家工程院院士、中国科学院与中国工程院外籍院士、中央研究院院士，并获 IEEE Jack Kilby Medal 等荣誉。", source: illinoisCareer },
      { label: "为什么值得关注", value: "他的影响不只来自论文，而来自大规模、跨地区的学术培养网络；缺失这些边会让多个亚洲视觉研究团队看起来彼此孤立。", source: illinoisFellowship },
    ], sources: [illinoisFellowship, illinoisCareer, illinoisYong, illinoisHumphrey], lastVerifiedAt: checkedAt,
  },
  "shuicheng-yan-nus": {
    summary: "NUS 杰出实践教授、LV Lab 创始人；博士师承北大程乾生，后在 Thomas S. Huang 组内做博士后，曾创建并领导 360 人工智能研究院、担任 Sea Group 集团首席科学家，形成横跨高校与产业研究院的视觉/机器学习人才网络。",
    tags: ["计算机视觉", "机器学习", "LV Lab", "360 AI Institute", "Sea AI Lab", "导师谱系"],
    facts: [
      { label: "博士师承", value: "2004 年获北京大学应用数学博士，导师为程乾生。", source: pkuYan },
      { label: "博士后谱系", value: "Illinois 官方资料将其列为 Thomas S. Huang 研究组 2007 年博士后校友。", source: illinoisFellowship },
      { label: "360 产业任职", value: "2015 年领导成立 360 人工智能研究院；2017 年公开职务为 360 副总裁、首席科学家及研究院院长。", source: yan360 },
      { label: "Sea 产业任职", value: "此后曾任 Sea Group 集团首席科学家并领导 Sea AI Lab；现已回到 NUS。", source: yanNus },
      { label: "实验室演进", value: "2007 年创立 LV Lab，2015 年加入 360 后由 Jiashi Feng 接任；2025 年回到 NUS 再次领导该实验室。", source: yanLvLab },
      { label: "代表性培养节点", value: "公开一手记录可核验 Jiashi Feng、Min Lin、Pan Zhou、Canyi Lu 等博士培养关系；本次只将明确写出 supervision/adviser 的记录画成边。", source: yanStudents },
      { label: "为什么值得关注", value: "其网络同时连接北大应用数学、Illinois 视觉谱系、NUS/SMU 学术团队，以及 360、Sea、ByteDance 等产业研究组织。", source: yanLvLab },
    ], sources: [yanNus, pkuYan, yan360, yanLvLab, yanStudents, jiashiAdvisers, panHome], lastVerifiedAt: checkedAt,
  },
};

export const thomasHuangYanRelationships: Relationship[] = [
  { id: "thomas-huang-humphrey-shi-phd", from: "thomas-huang-historical", to: "humphrey-shi-gatech", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Illinois 官方资料记载 Humphrey Shi 于 2017 年获 ECE 博士并与 Thomas Huang 共同领导研究；其博士论文致谢明确称 Thomas Huang 为 advisor。", evidenceObject: "Humphrey Shi · Illinois ECE PhD 2017", source: illinoisHumphrey, verified: true, endYear: 2017 },
  { id: "thomas-huang-chang-wen-chen-phd", from: "thomas-huang-historical", to: "chang-wen-chen-polyu", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Illinois 官方纪念资料将 Chang Wen Chen（PhD 1992）列为 Thomas Huang Image Formation and Processing Group 校友。", evidenceObject: "Chang Wen Chen · Illinois ECE PhD 1992", source: illinoisFellowship, verified: true, endYear: 1992 },
  { id: "thomas-huang-yong-rui-phd", from: "thomas-huang-historical", to: "yong-rui-lenovo", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Illinois 官方资料记载 Yong Rui 1999 年获博士，并在 Thomas Huang 的 Image Formation and Processing Group 工作。", evidenceObject: "Yong Rui · Illinois PhD 1999", source: illinoisYong, verified: true, endYear: 1999 },
  { id: "cheng-qiansheng-shuicheng-yan-phd", from: "cheng-qiansheng-pku-historical", to: "shuicheng-yan-nus", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "北京大学数学科学学院院友资料明确写明颜水成 2004 年应用数学博士师从程乾生教授。", evidenceObject: "颜水成 · 北京大学应用数学博士 2004", source: pkuYan, verified: true, endYear: 2004 },
  { id: "shuicheng-yan-min-lin-phd", from: "shuicheng-yan-nus", to: "min-lin-sea", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "NUS ECE 官方奖项记录将 NGS 博士生 Min Lin 所在团队明确列为由颜水成指导。", evidenceObject: "Min Lin · NGS/NUS doctoral team", source: yanStudents, verified: true },
  { id: "shuicheng-yan-jiashi-feng-coadviser", from: "shuicheng-yan-nus", to: "jiashi-feng-bytedance", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "Huan Xu 的 NUS 主页明确列出 Jiashi Feng 2009–2014 年博士阶段由其与 Shuicheng Yan 共同指导。", evidenceObject: "Jiashi Feng · NUS PhD 2014", source: jiashiAdvisers, verified: true, endYear: 2014 },
  { id: "shuicheng-yan-pan-zhou-coadviser", from: "shuicheng-yan-nus", to: "pan-zhou-smu", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "Pan Zhou 个人主页明确写明其 NUS 博士由 Jiashi Feng 与 Shuicheng Yan 共同指导。", evidenceObject: "Pan Zhou · NUS PhD 2020", source: panHome, verified: true, endYear: 2020 },
  { id: "jiashi-feng-pan-zhou-coadviser", from: "jiashi-feng-bytedance", to: "pan-zhou-smu", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "Pan Zhou 个人主页明确写明其 NUS 博士由 Jiashi Feng 与 Shuicheng Yan 共同指导。", evidenceObject: "Pan Zhou · NUS PhD 2020", source: panHome, verified: true, endYear: 2020 },
  { id: "shuicheng-yan-canyi-lu-phd", from: "shuicheng-yan-nus", to: "canyi-lu-yan-alumnus", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "NUS ECE 官方资料将 Canyi Lu 明确称为由 Assoc Prof Yan Shuicheng 指导的博士生。", evidenceObject: "Canyi Lu · NUS PhD", source: yanStudents, verified: true },
  { id: "shuicheng-yan-360-leadership", from: "shuicheng-yan-nus", to: "shuicheng-yan-nus", type: "industry", subtype: "industry_affiliation", label: "360 副总裁 / 首席科学家 / AI 研究院院长", evidence: "360 官方社区 2017 年活动报道列出颜水成担任集团副总裁、首席科学家、人工智能研究院院长，并说明其 2015 年领导成立该研究院。", evidenceObject: "360 AI Research Institute", source: yan360, verified: true, startYear: 2015, recentYear: 2017 },
  { id: "shuicheng-yan-sea-chief-scientist", from: "shuicheng-yan-nus", to: "shuicheng-yan-nus", type: "industry", subtype: "industry_affiliation", label: "Sea Group 集团首席科学家 / Sea AI Lab", evidence: "NUS 当前官方简介记载颜水成此前担任 Sea Group Group Chief Scientist。", evidenceObject: "Sea AI Lab", source: yanNus, verified: true, recentYear: 2021 },
];

export const thomasHuangYanGroupMembers: GroupMember[] = [
  { id: "huang-roster-humphrey-shi", teacherId: "thomas-huang-historical", name: "Humphrey Shi", role: "PhD alumnus (2017)", focus: "Computer vision · efficient AI", source: illinoisFellowship },
  { id: "huang-roster-yong-rui", teacherId: "thomas-huang-historical", name: "Yong Rui", role: "PhD alumnus (1999)", focus: "Multimedia · AI leadership", source: illinoisYong },
  { id: "huang-roster-chang-wen-chen", teacherId: "thomas-huang-historical", name: "Chang Wen Chen", role: "PhD alumnus (1992)", focus: "Visual computing · multimedia", source: illinoisFellowship },
  { id: "huang-roster-shuicheng-yan", teacherId: "thomas-huang-historical", name: "Shuicheng Yan", role: "Postdoctoral alumnus (2007)", focus: "Computer vision · machine learning", source: illinoisFellowship },
  { id: "yan-roster-min-lin", teacherId: "shuicheng-yan-nus", name: "Min Lin", role: "PhD alumnus", focus: "Continual learning · ML systems", source: yanStudents },
  { id: "yan-roster-jiashi-feng", teacherId: "shuicheng-yan-nus", name: "Jiashi Feng", role: "Co-advised PhD alumnus (2014)", focus: "Computer vision · deep learning", source: jiashiAdvisers },
  { id: "yan-roster-pan-zhou", teacherId: "shuicheng-yan-nus", name: "Pan Zhou", role: "Co-advised PhD alumnus (2020)", focus: "Efficient and multimodal AI", source: panHome },
  { id: "yan-roster-canyi-lu", teacherId: "shuicheng-yan-nus", name: "Canyi Lu", role: "PhD alumnus", focus: "Low-rank learning · optimization", source: yanStudents },
  { id: "yan-roster-chen-qiang", teacherId: "shuicheng-yan-nus", name: "Chen Qiang", role: "ECE PhD student/alumnus", focus: "ImageNet team", source: yanStudents },
  { id: "yan-roster-jian-dong", teacherId: "shuicheng-yan-nus", name: "Jian Dong", role: "ECE PhD student/alumnus", focus: "ImageNet team", source: yanStudents },
  { id: "yan-roster-junshi-huang", teacherId: "shuicheng-yan-nus", name: "Junshi Huang", role: "ECE PhD student/alumnus", focus: "ImageNet team", source: yanStudents },
  { id: "yan-roster-wei-xia", teacherId: "shuicheng-yan-nus", name: "Wei Xia", role: "ECE PhD student/alumnus", focus: "ImageNet team", source: yanStudents },
];

export const thomasHuangYanPlacements: StudentPlacement[] = [
  { id: "huang-humphrey-gatech-nvidia", student: "Humphrey Shi", teacherId: "thomas-huang-historical", company: "Georgia Tech / NVIDIA", department: "College of Computing / High-Performance AI", role: "Associate Professor · Vice President", kind: "current", highLevel: true, degree: "PhD", graduationYear: 2017, sector: "academia", currentRole: "Georgia Tech Associate Professor; NVIDIA VP of High-Performance AI", source: humphreyHome, verifiedAt: checkedAt },
  { id: "huang-yong-lenovo", student: "Yong Rui", teacherId: "thomas-huang-historical", company: "Lenovo", department: "Emerging Technology Group", role: "Senior Vice President · President", kind: "current", highLevel: true, degree: "PhD", graduationYear: 1999, sector: "industry", currentRole: "President, Emerging Technology Group", source: yongLenovo, verifiedAt: checkedAt },
  { id: "huang-chang-polyu", student: "Chang Wen Chen", teacherId: "thomas-huang-historical", company: "Hong Kong Polytechnic University", role: "Chair Professor of Visual Computing", kind: "current", highLevel: true, degree: "PhD", graduationYear: 1992, sector: "academia", currentRole: "Chair Professor of Visual Computing", source: changHome, verifiedAt: checkedAt },
  { id: "yan-min-sea", student: "Min Lin", teacherId: "shuicheng-yan-nus", company: "Sea AI Lab", role: "Principal Research Scientist · Head of Research", kind: "current", highLevel: true, degree: "PhD", sector: "industry", currentRole: "Head of Research, Sea AI Lab", source: minHome, verifiedAt: checkedAt },
  { id: "yan-jiashi-bytedance", student: "Jiashi Feng", teacherId: "shuicheng-yan-nus", company: "ByteDance", role: "AI researcher", kind: "current", degree: "PhD", graduationYear: 2014, sector: "industry", currentRole: "ByteDance AI researcher", source: lvLabPeople, verifiedAt: checkedAt },
  { id: "yan-pan-smu", student: "Pan Zhou", teacherId: "shuicheng-yan-nus", company: "Singapore Management University", department: "School of Computing and Information Systems", role: "Assistant Professor · Lee Kong Chian Fellow", kind: "current", degree: "PhD", graduationYear: 2020, sector: "academia", currentRole: "SMU Assistant Professor", source: panSmu, verifiedAt: checkedAt },
];
