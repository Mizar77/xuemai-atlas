import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-29";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, checkedAt, supports });

const s = {
  mohanNus: source("NUS Computing faculty profile · Mohan Kankanhalli", "https://www.comp.nus.edu.sg/cs/people/mohan/", "official", "current NUS appointments, education and research interests"),
  mohanHome: source("Mohan Kankanhalli NUS homepage", "https://www.comp.nus.edu.sg/~mohan/", "official", "NUS AI Institute and AI Singapore leadership, research programme"),
  shouNus: source("NUS Computing faculty profile · Mike Shou", "https://www.comp.nus.edu.sg/cs/people/mikeshou/", "official", "current appointment, Columbia PhD, former Facebook AI role and multimodal research"),
  shouLab: source("Show Lab @ NUS", "https://sites.google.com/view/showlab/home", "profile", "current lab, multimodal research themes and doctoral adviser"),
  shouAlumni: source("Show Lab @ NUS · lab members", "https://sites.google.com/view/showlab/lab-members", "profile", "public lab roster and alumni destinations"),
  loyAward: source("NTU CCDS · Chen Change Loy research award profile", "https://www.ntu.edu.sg/computing/news-events/news/detail/ccds-s-prof-loy-chen-change-receives-prestigious-iit-bombay-international-award", "official", "current chair professorship, AI.X and S-Lab roles, computer-vision research"),
  sLab: source("NTU S-Lab · our people", "https://www.ntu.edu.sg/s-lab/our-people", "official", "current S-Lab leadership and research interests"),
  ziweiFaculty: source("NTU CCDS faculty directory · Ziwei Liu", "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", "official", "current NTU appointment and faculty identity"),
  ziweiGrail: source("NTU GrAIL · our people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people", "official", "current appointment and computer vision, graphics and machine-learning research"),
  jiangStory: source("NTU CCDS · Jiang Yuming doctoral profile", "https://www.ntu.edu.sg/computing/news-events/news/detail/jiang-yuming--building-tangible--trustworthy-ai", "official", "joint doctoral supervision by Ziwei Liu and Chen Change Loy"),
  cheungSutd: source("SUTD faculty profile · Ngai-Man Cheung", "https://www.sutd.edu.sg/lkycic/profile/cheung-ngai-man/", "official", "current appointment, education, visual AI research and KroniKare.ai spin-off"),
  cheungRepo: source("SUTD research portal · Ngai-Man Cheung", "https://repository.sutd.edu.sg/esploro/profile/ngai_man_cheung", "official", "current Associate Professor and Associate Head appointment"),
  pangSmu: source("SMU SCIS faculty profile · Guansong Pang", "https://computing.smu.edu.sg/faculty/profile/6271/guansong-pang", "official", "current appointment, PhD and research areas"),
  pangCv: source("Guansong Pang · SMU-hosted CV", "https://computing.smu.edu.sg/sites/scis.smu.edu.sg/files/2026-02/gspang-CV.pdf", "cv", "appointment history and open-world, anomaly and trustworthy AI research"),
  limAstar: source("A*STAR I²R profile · Lim Joo Hwee", "https://www.a-star.edu.sg/i2r/home/i2r-management/lim-joo-hwee", "official", "current department-head role, education and visual-intelligence research"),
  astarVisual: source("A*STAR I²R · Visual Intelligence", "https://www.a-star.edu.sg/i2r/research-capabilities/visual-intelligence", "official", "department programme in visual reasoning, multimodal models and spatial computing"),
  pingHku: source("HKU IDS profile · Ping Luo", "https://datascience.hku.hk/people/ping-luo/", "official", "current HKU appointment, PhD advisers, SenseTime role and research"),
  pingHome: source("Ping Luo homepage", "https://luoping.me/", "profile", "HKU and HKU-Shanghai AI Lab roles, generative and embodied AI programme"),
  yizhouHome: source("Yizhou Yu HKU homepage", "https://i.cs.hku.hk/~yzyu/index.html", "official", "chair professorship, AI Lab leadership, education and research"),
  hkuAi2000: source("HKU CDS · 2025 AI 2000 scholars", "https://www.cs.hku.hk/news-events/news-and-announcements?catid=18%3Anews&id=572%3Ahku-cds-professors-named-among-world-s-top-scholars-in-2025-ai-2000-global-artificial-intelligence-scholars-list&view=article", "official", "current HKU faculty identity and visual-computing recognition"),
  qifengProfile: source("HKUST CSE faculty profile · Qifeng Chen", "https://cse.hkust.edu.hk/admin/people/faculty/profile/cqf", "official", "current appointment, Stanford PhD and research interests"),
  qifengDirectory: source("HKUST CSE faculty directory · Vision & Graphics", "https://cse.hkust.edu.hk/admin/people/faculty/?a=VG&c=regular&s=name", "official", "2026 regular-faculty status and AI/Vision classification"),
  xiaogangPortal: source("CUHK research portal · Xiaogang Wang", "https://research.cuhk.edu.hk/en/persons/xiaogang-wang/", "official", "current professorship, education and research interests"),
  cuhkMmlab: source("CUHK Multimedia Laboratory · people", "https://mmlab.ie.cuhk.edu.hk/people.html", "official", "current CUHK, NTU and HKU MMLab faculty rosters"),
  cuhkAlumni: source("CUHK Multimedia Laboratory · alumni", "https://mmlab.ie.cuhk.edu.hk/alumni.html", "official", "doctoral supervision and public alumni career destinations"),
  dahuaIe: source("CUHK Information Engineering faculty profile · Dahua Lin", "https://www.ie.cuhk.edu.hk/faculty/lin-dahua/", "official", "current appointment, education and research interests"),
  dahuaAward: source("CUHK IE · 2026 AI & Robotics prize", "https://www.ie.cuhk.edu.hk/prof-dahua-lin-awarded-bochk-science-and-technology-innovation-prize-in-ai-robotics/", "official", "current CUHK affiliation and AI research recognition"),
  shiqiHome: source("Shiqi Wang CityU homepage", "https://www.cs.cityu.edu.hk/~shiqwang/", "profile", "current professorship, education, adviser, career history and research"),
  shiqiCityu: source("CityU staff profile · Shiqi Wang", "https://www.cityu.edu.hk/stfprofile/shiqwang.htm", "official", "CityU faculty affiliation and multimedia research programme"),
  leiHome: source("Lei Zhang PolyU homepage", "https://web.comp.polyu.edu.hk/cslzhang/", "official", "current chair professorship, education, visual-computing lab and OPPO affiliation"),
  leiPortal: source("PolyU Scholars Hub · Lei Zhang", "https://research.polyu.edu.hk/en/persons/lei-zhang-2/", "official", "current PolyU appointment and research activity"),
  jieHkbu: source("HKBU Computer Science profile · Jie Chen", "https://www.comp.hkbu.edu.hk/v1/?id=chenjie&page=profile", "official", "current appointment, prior industry role and computer-vision research"),
  jiePortal: source("HKBU Scholars · Jie Chen", "https://scholars.hkbu.edu.hk/en/persons/CHENJIE/", "official", "current associate professorship, education and research projects"),
};

const fact = (label: string, value: string, factSource: Source) => ({ label, value, source: factSource });

export const hkSgAiCvExpansionPeople: Person[] = [
  {
    id: "mohan-kankanhalli", name: "Mohan Kankanhalli", role: "Provost's Chair Professor · Director, NUS AI Institute", institution: "NUS", region: "Singapore",
    area: "Multimodal Computing · Computer Vision · Trustworthy AI", tags: ["多模态", "计算机视觉", "可信 AI", "AI Singapore"],
    summary: "NUS AI Institute 主任、AI Singapore 副执行主席，长期连接多模态计算、视觉理解与可信 AI。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "NUS Provost's Chair Professor、NUS AI Institute Director、AI Singapore Deputy Executive Chairman", s.mohanNus),
      fact("教育背景", "1990 年获 Rensselaer Polytechnic Institute 计算机与系统工程博士", s.mohanNus),
      fact("研究主线", "Multimodal computing、computer vision、trustworthy AI 与图像视频理解", s.mohanHome),
    ], sources: [s.mohanNus, s.mohanHome], lastVerifiedAt: checkedAt, x: 130, y: 455,
  },
  {
    id: "mike-zheng-shou", name: "Mike Zheng Shou", role: "Assistant Professor · Presidential Young Professor · NRF Fellow", institution: "NUS", region: "Singapore",
    area: "Multimodal Intelligence · Video Understanding & Generation", tags: ["视频 LLM", "多模态生成", "具身视频", "Show Lab"],
    summary: "Show Lab PI，研究视频理解、视频生成与统一多模态模型；加入 NUS 前任 Facebook AI Research Scientist。", stage: "emerging", category: "core", primary: true, knownAlumniCount: 10,
    facts: [
      fact("当前任职", "NUS tenure-track Assistant Professor、Presidential Young Professor 与 NRF Fellow", s.shouNus),
      fact("博士师承", "Columbia University 博士，导师 Shih-Fu Chang", s.shouLab),
      fact("研究与产业", "研究 video LLM、vision-language、video diffusion；此前任 Facebook AI Research Scientist", s.shouNus),
    ], sources: [s.shouNus, s.shouLab], lastVerifiedAt: checkedAt, x: 305, y: 455,
  },
  {
    id: "chen-change-loy", name: "Chen Change Loy", chinese: "呂健勤", role: "President's Chair Professor · MMLab@NTU Director", institution: "NTU", region: "Singapore",
    area: "Computer Vision · Generative Visual Intelligence", tags: ["生成式视觉", "图像视频修复", "视觉基础模型", "MMLab@NTU"],
    summary: "MMLab@NTU 负责人，代表方向包括图像视频修复、生成式视觉与视觉表征；同时参与 S-Lab 与 AI.X 领导。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "NTU President's Chair Professor，AI.X Deputy Director、S-Lab Co-Associate Director", s.loyAward),
      fact("研究主线", "Computer vision、deep learning、creative content generation 与 representation learning", s.sLab),
      fact("研究影响", "CodeFormer、BasicVSR 等成果被 NTU 官方介绍为视觉修复与生成方向代表工作", s.loyAward),
    ], sources: [s.loyAward, s.sLab], lastVerifiedAt: checkedAt, x: 485, y: 455,
  },
  {
    id: "ziwei-liu-ntu", name: "Ziwei Liu", chinese: "劉子緯", role: "Associate Professor · MMLab@NTU", institution: "NTU", region: "Singapore",
    area: "Computer Vision · Generative AI · Computer Graphics", tags: ["生成式 AI", "3D / 4D", "数字人", "视觉基础模型"],
    summary: "MMLab@NTU 新一代视觉 PI，研究计算机视觉、生成式 AI、图形学以及 3D/4D 人体与场景建模。", stage: "emerging", category: "core", primary: true,
    facts: [
      fact("当前任职", "NTU College of Computing & Data Science Associate Professor", s.ziweiFaculty),
      fact("研究主线", "Computer vision、machine learning、computer graphics 与生成式视觉", s.ziweiGrail),
      fact("团队位置", "NTU GrAIL 与 MMLab@NTU 的生成式 AI / 视觉研究 PI", s.ziweiGrail),
    ], sources: [s.ziweiFaculty, s.ziweiGrail], lastVerifiedAt: checkedAt, x: 660, y: 455,
  },
  {
    id: "ngai-man-cheung", name: "Ngai-Man Cheung", role: "Associate Professor · Associate Head of Pillar", institution: "SUTD", region: "Singapore",
    area: "Visual Computing · Computer Vision · AI", tags: ["视觉计算", "CV", "AI for Healthcare", "创业"],
    summary: "SUTD 视觉计算 PI，覆盖图像视频处理、计算机视觉与 AI；研究成果促成医疗 AI spin-off KroniKare.ai。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "SUTD Associate Professor、ISTD Associate Head of Pillar (Education)", s.cheungSutd),
      fact("教育经历", "University of Southern California 电气工程博士，后在 Stanford 从事博士后研究", s.cheungSutd),
      fact("转化经历", "研究成果促成 SUTD 医疗 AI spin-off KroniKare.ai，并有多项技术授权", s.cheungSutd),
    ], sources: [s.cheungSutd, s.cheungRepo], lastVerifiedAt: checkedAt, x: 965, y: 215,
  },
  {
    id: "guansong-pang", name: "Guansong Pang", role: "Assistant Professor", institution: "SMU", region: "Singapore",
    area: "Open-World Learning · Anomaly Detection · Trustworthy AI", tags: ["开放世界", "异常检测", "Foundation Model Safety", "图学习"],
    summary: "SMU 新一代机器学习 PI，研究开放世界与异常检测、持续学习、图异常以及可信基础模型。", stage: "emerging", category: "core", primary: true,
    facts: [
      fact("当前任职", "SMU School of Computing and Information Systems Assistant Professor", s.pangSmu),
      fact("教育经历", "2019 年获 University of Technology Sydney 博士", s.pangSmu),
      fact("研究演进", "从 anomaly / open-world learning 延伸到 trustworthy continual AI 与 foundation-model failure detection", s.pangCv),
    ], sources: [s.pangSmu, s.pangCv], lastVerifiedAt: checkedAt, x: 1040, y: 460,
  },
  {
    id: "joo-hwee-lim", name: "Joo Hwee Lim", role: "Department Head, Visual Intelligence · Principal Scientist II", institution: "A*STAR", region: "Singapore",
    area: "Visual Intelligence · Neuro-Symbolic AI · Multimodal Reasoning", tags: ["视觉智能", "神经符号", "人机协同", "空间计算"],
    summary: "A*STAR I²R Visual Intelligence 部门负责人，研究视觉学习与推理、神经符号 AI、人机协同和空间计算。", stage: "institute", category: "core", primary: true,
    facts: [
      fact("当前任职", "A*STAR I²R Visual Intelligence Department Head、Principal Scientist II", s.limAstar),
      fact("教育经历", "获 UNSW 计算机科学与工程博士", s.limAstar),
      fact("研究平台", "部门覆盖视觉问答与推理、可控图像视频生成、3D vision 和 construction multimodal model", s.astarVisual),
    ], sources: [s.limAstar, s.astarVisual], lastVerifiedAt: checkedAt, x: 630, y: 720,
  },
  {
    id: "ping-luo-hku", name: "Ping Luo", chinese: "羅平", role: "Associate Professor · MMLab@HKU Director", institution: "HKU", region: "Hong Kong",
    area: "Generative AI · Embodied AI · Computer Vision", tags: ["生成式 AI", "具身智能", "视觉语言", "MMLab@HKU"],
    summary: "MMLab@HKU 负责人，研究生成式与具身 AI、视觉语言、3D 视觉和深度学习基础；曾任 SenseTime Research Director。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "HKU Computer Science Associate Professor、HKU IDS Associate Director、HKU–Shanghai AI Lab Joint Lab Deputy Director", s.pingHome),
      fact("博士师承", "CUHK 博士，导师 Xiaoou Tang 与 Xiaogang Wang", s.pingHku),
      fact("产业与研究", "加入 HKU 前任 SenseTime Research Director；现聚焦生成式、具身与机器视觉", s.pingHku),
    ], sources: [s.pingHku, s.pingHome], lastVerifiedAt: checkedAt, x: 120, y: 425,
  },
  {
    id: "yizhou-yu-hku", name: "Yizhou Yu", role: "Chair Professor · Director, HKU AI Lab", institution: "HKU", region: "Hong Kong",
    area: "Foundation Models · Visual Computing · AI for Medicine", tags: ["视觉计算", "基础模型", "多媒体生成", "AI 医疗"],
    summary: "HKU AI Lab 主任，资深视觉计算 PI，当前方向覆盖基础模型、AI 内容生成、计算机视觉与医疗 AI。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "HKU Computer Science Chair Professor、AI Lab Director", s.yizhouHome),
      fact("教育与经历", "UC Berkeley 计算机视觉方向博士，曾在 UIUC 任教十二年", s.yizhouHome),
      fact("研究演进", "从视觉计算与图形学扩展到 foundation models、multimedia generation 与 AI for medicine", s.yizhouHome),
    ], sources: [s.yizhouHome, s.hkuAi2000], lastVerifiedAt: checkedAt, x: 280, y: 425,
  },
  {
    id: "qifeng-chen-hkust", name: "Qifeng Chen", chinese: "陳启峰", role: "Associate Professor", institution: "HKUST", region: "Hong Kong",
    area: "Computer Vision · Generative Models · Graphics", tags: ["视频生成", "3D 视觉", "计算摄影", "机器人视觉"],
    summary: "HKUST Vision & Graphics / AI PI，研究计算机视觉、生成模型、3D 与图形学，并延伸到机器人操作。", stage: "emerging", category: "core", primary: true,
    facts: [
      fact("当前任职", "HKUST CSE 与 ECE Associate Professor", s.qifengProfile),
      fact("教育经历", "2017 年获 Stanford University 计算机科学博士", s.qifengProfile),
      fact("研究主线", "Computer vision、machine learning、optimization、graphics；当前 regular faculty 归入 Vision & Graphics / AI", s.qifengDirectory),
    ], sources: [s.qifengProfile, s.qifengDirectory], lastVerifiedAt: checkedAt, x: 525, y: 345,
  },
  {
    id: "xiaogang-wang-cuhk", name: "Xiaogang Wang", chinese: "王曉剛", role: "Professor", institution: "CUHK", region: "Hong Kong",
    area: "Computer Vision · Multimodal Foundation Models", tags: ["MMLab", "视觉识别", "多模态大模型", "医学影像"],
    summary: "CUHK MMLab 资深视觉 PI，研究识别、跟踪、图像视频检索与医学影像；近年项目延伸至多模态大模型。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "CUHK Department of Electronic Engineering Professor", s.xiaogangPortal),
      fact("教育背景", "MIT Computer Science 博士、CUHK Information Engineering MPhil", s.xiaogangPortal),
      fact("研究平台", "CUHK MMLab current academic staff；研究覆盖 CV、pattern recognition、visual search 与 multimodal LLM", s.cuhkMmlab),
    ], sources: [s.xiaogangPortal, s.cuhkMmlab], lastVerifiedAt: checkedAt, x: 1080, y: 165,
  },
  {
    id: "dahua-lin-cuhk", name: "Dahua Lin", chinese: "林達華", role: "Associate Professor", institution: "CUHK", region: "Hong Kong",
    area: "Machine Learning · Vision-Language Understanding", tags: ["大规模机器学习", "图文理解", "概率模型", "MMLab"],
    summary: "CUHK MMLab PI，研究大规模机器学习、图像与文本深层理解及概率推断，是视觉—语言与通用 AI 的重要连接点。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "CUHK Department of Information Engineering Associate Professor", s.dahuaIe),
      fact("教育背景", "MIT EECS 博士、CUHK Information Engineering MPhil", s.dahuaIe),
      fact("研究主线", "Machine learning for big data、deep understanding of images and text、Bayesian modeling and inference", s.dahuaIe),
    ], sources: [s.dahuaIe, s.dahuaAward], lastVerifiedAt: checkedAt, x: 1080, y: 285,
  },
  {
    id: "shiqi-wang-cityu", name: "Shiqi Wang", role: "Professor · Associate Dean, College of Computing", institution: "CityU", region: "Hong Kong",
    area: "Visual Communication · AIGC Management · Multimedia Forensics", tags: ["AIGC", "视觉通信", "多媒体取证", "质量评估"],
    summary: "CityU 多媒体视觉 PI，覆盖语义视觉通信、AIGC 内容管理、信息取证以及图像视频质量评估。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "CityU Computer Science Professor、College of Computing Associate Dean", s.shiqiHome),
      fact("博士师承", "2014 年获北京大学博士，导师 Wen Gao", s.shiqiHome),
      fact("研究与产业", "研究 AIGC management、visual communication、multimedia forensics；曾在 MSRA 实习", s.shiqiCityu),
    ], sources: [s.shiqiHome, s.shiqiCityu], lastVerifiedAt: checkedAt, x: 195, y: 800,
  },
  {
    id: "lei-zhang-polyu", name: "Lei Zhang", chinese: "張磊", role: "Chair Professor of Computer Vision and Image Analysis", institution: "PolyU", region: "Hong Kong",
    area: "Computer Vision · Image Restoration · Generative AI", tags: ["视觉增强", "图像复原", "生成式视觉", "OPPO Research"],
    summary: "PolyU Visual Computing Lab 负责人，研究图像复原、视觉增强、识别与生成式视觉，并公开兼任 OPPO Research Institute。", stage: "senior", category: "core", primary: true,
    facts: [
      fact("当前任职", "PolyU Department of Computing Chair Professor of Computer Vision and Image Analysis", s.leiPortal),
      fact("教育与轨迹", "Northwestern Polytechnical University 博士；2006 年加入 PolyU、2017 年起任 Chair Professor", s.leiHome),
      fact("产业连接", "个人主页公开列出同时任职 OPPO Research Institute", s.leiHome),
    ], sources: [s.leiHome, s.leiPortal], lastVerifiedAt: checkedAt, x: 790, y: 805,
  },
  {
    id: "jie-chen-hkbu", name: "Jie Chen", chinese: "陳杰", role: "Associate Professor", institution: "HKBU", region: "Hong Kong",
    area: "Computational Photography · 3D Vision · AI for Art-Tech", tags: ["计算摄影", "3D 视觉", "内容生成", "Art-Tech"],
    summary: "HKBU 计算摄影与视觉 PI，研究新型成像、3D 内容生成和 AI for Art-Tech；此前在 OmniVision 与 ST Engineering–NTU Corporate Lab 工作。", stage: "emerging", category: "core", primary: true,
    facts: [
      fact("当前任职", "HKBU Department of Computer Science Associate Professor", s.jiePortal),
      fact("教育背景", "NTU School of Electrical & Electronic Engineering 博士", s.jieHkbu),
      fact("产业经历", "加入 HKBU 前任 OmniVision Singapore Senior Algorithm Engineer，并在 ST Engineering–NTU Corporate Lab 任 Research Fellow", s.jieHkbu),
    ], sources: [s.jieHkbu, s.jiePortal], lastVerifiedAt: checkedAt, x: 1090, y: 800,
  },
];

export const hkSgAiCvExpansionRelationships: Relationship[] = [
  {
    id: "cv-xiaogang-ping-lineage", from: "xiaogang-wang-cuhk", to: "ping-luo-hku", type: "lineage", subtype: "co_adviser", label: "共同博士导师",
    evidence: "HKU IDS 官方简介明确记录 Ping Luo 的 CUHK 博士由 Xiaoou Tang 与 Xiaogang Wang 共同指导。", evidenceObject: "Ping Luo CUHK PhD", source: s.pingHku, verified: true,
  },
  {
    id: "cv-loy-ziwei-co-supervision", from: "chen-change-loy", to: "ziwei-liu-ntu", type: "collaboration", subtype: "sustained_collaboration", label: "MMLab@NTU 共同指导",
    evidence: "NTU 官方博士生故事明确记录 Jiang Yuming 的博士由 Ziwei Liu 与 Chen Change Loy 共同指导。", evidenceObject: "Jiang Yuming PhD supervision", source: s.jiangStory, verified: true,
  },
  {
    id: "cv-shou-meta", from: "mike-zheng-shou", to: "mike-zheng-shou", type: "industry", subtype: "industry_affiliation", label: "Facebook AI 前研究科学家",
    evidence: "NUS 官方简介记录其加入 NUS 前任 Facebook AI Research Scientist。", source: s.shouNus, verified: true,
  },
  {
    id: "cv-cheung-kronikare", from: "ngai-man-cheung", to: "ngai-man-cheung", type: "industry", subtype: "industry_affiliation", label: "KroniKare.ai spin-off",
    evidence: "SUTD 官方简介记录其研究成果促成医疗 AI spin-off KroniKare.ai。", source: s.cheungSutd, verified: true,
  },
  {
    id: "cv-ping-sensetime", from: "ping-luo-hku", to: "ping-luo-hku", type: "industry", subtype: "industry_affiliation", label: "SenseTime 前研究总监",
    evidence: "HKU IDS 官方简介记录其曾任 SenseTime Research Director。", source: s.pingHku, verified: true,
  },
  {
    id: "cv-lei-oppo", from: "lei-zhang-polyu", to: "lei-zhang-polyu", type: "industry", subtype: "industry_affiliation", label: "OPPO Research Institute 联合身份",
    evidence: "PolyU 个人主页公开写明其同时任职 OPPO Research Institute。", source: s.leiHome, verified: true,
  },
  {
    id: "cv-jie-omnivision", from: "jie-chen-hkbu", to: "jie-chen-hkbu", type: "industry", subtype: "industry_affiliation", label: "OmniVision 前高级算法工程师",
    evidence: "HKBU 官方简介记录其加入学校前在 OmniVision Singapore 从事下一代 HDR 技术。", source: s.jieHkbu, verified: true,
  },
];

export const hkSgAiCvExpansionPlacements: StudentPlacement[] = [
  { id: "cv-shou-chang-alibaba", student: "Shuning Chang", teacherId: "mike-zheng-shou", company: "Alibaba", role: "Research / engineering", kind: "current", degree: "PhD", source: s.shouAlumni, verifiedAt: checkedAt },
  { id: "cv-shou-xu-bytedance", student: "Eric Zhongcong Xu", teacherId: "mike-zheng-shou", company: "ByteDance", department: "Singapore", role: "Research / engineering", kind: "current", degree: "PhD", source: s.shouAlumni, verifiedAt: checkedAt },
  { id: "cv-shou-liu-meta", student: "Jiawei Liu", teacherId: "mike-zheng-shou", company: "Meta", department: "Superintelligence Lab · USA", role: "Research", kind: "current", degree: "PhD", highLevel: true, source: s.shouAlumni, verifiedAt: checkedAt },
  { id: "cv-shou-zhang-google", student: "David Junhao Zhang", teacherId: "mike-zheng-shou", company: "Google", department: "USA", role: "Research / engineering", kind: "current", degree: "PhD", source: s.shouAlumni, verifiedAt: checkedAt },
  { id: "cv-shou-wu-nvidia", student: "Jay Zhangjie Wu", teacherId: "mike-zheng-shou", company: "NVIDIA", department: "Canada", role: "Research / engineering", kind: "current", degree: "PhD", source: s.shouAlumni, verifiedAt: checkedAt },
  { id: "cv-wang-kang-apple", student: "Kai Kang", teacherId: "xiaogang-wang-cuhk", company: "Apple", role: "Staff Machine Learning Engineer & Manager", kind: "current", degree: "PhD", highLevel: true, source: s.cuhkAlumni, verifiedAt: checkedAt },
  { id: "cv-wang-chu-meta", student: "Xiao Chu", teacherId: "xiaogang-wang-cuhk", company: "Meta", department: "Facebook AI Applied Research", role: "AI Research Scientist", kind: "current", degree: "PhD", source: s.cuhkAlumni, verifiedAt: checkedAt },
  { id: "cv-wang-shen-aws", student: "Yantao Shen", teacherId: "xiaogang-wang-cuhk", company: "Amazon", department: "AWS", role: "Applied Scientist", kind: "current", degree: "PhD", source: s.cuhkAlumni, verifiedAt: checkedAt },
  { id: "cv-wang-li-sensetime", student: "Hongyang Li", teacherId: "xiaogang-wang-cuhk", company: "SenseTime", department: "Autonomous Driving", role: "Senior Research Manager", kind: "current", degree: "PhD", highLevel: true, source: s.cuhkAlumni, verifiedAt: checkedAt },
];

export const hkSgAiCvExpansionGroupMembers: GroupMember[] = [
  { id: "cv-shou-yuchao-gu", teacherId: "mike-zheng-shou", name: "Yuchao Gu", role: "PhD student", focus: "Multimodal intelligence", source: s.shouAlumni },
  { id: "cv-shou-ziteng-gao", teacherId: "mike-zheng-shou", name: "Ziteng Gao", role: "PhD student", focus: "Video and multimodal learning", source: s.shouAlumni },
  { id: "cv-pang-jiawen-zhu", teacherId: "guansong-pang", name: "Jiawen Zhu", role: "Research advisee", focus: "Generalist anomaly detection", source: s.pangSmu },
  { id: "cv-pang-hezhe-qiao", teacherId: "guansong-pang", name: "Hezhe Qiao", role: "Research advisee", focus: "Graph anomaly detection and foundation-model safety", source: s.pangSmu },
];

// Short aliases make the module convenient to merge while preserving descriptive exports.
export const people = hkSgAiCvExpansionPeople;
export const relationships = hkSgAiCvExpansionRelationships;
export const placements = hkSgAiCvExpansionPlacements;
export const groupMembers = hkSgAiCvExpansionGroupMembers;
