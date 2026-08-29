import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-29";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const ntuDirectory = source("NTU CCDS faculty directory", "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds", "official", "current NTU faculty appointment");
const ntuGroups = source("NTU CCDS research groups", "https://www.ntu.edu.sg/computing/research/research-groups", "official", "AI, Computer Vision and Language faculty roster");
const ntuGrail = source("NTU GrAIL · Our People", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people", "official", "generative AI research, biography and current NTU role");
const ntuSlab = source("NTU S-Lab · Our People", "https://www.ntu.edu.sg/s-lab/our-people", "official", "computer vision, machine learning and generative AI roster");
const ntuAiLab = source("NTU Artificial Intelligence Laboratory · Our People", "https://www.ntu.edu.sg/ail/about-us/our-people", "official", "current AI research-group membership");
const ntuAiCluster = source("NTU Artificial & Augmented Intelligence cluster", "https://www.ntu.edu.sg/research/research-focus/research-cluster-1-artificalandaugumentedintelligence/our-people", "official", "current appointment and AI research profile");
const ntuZhangNews = source("NTU CCDS · Nanyang Research Award", "https://www.ntu.edu.sg/computing/news-events/news/detail/nanyang-awards-2024", "official", "Hanwang Zhang current role and applied-causality research");
const ntuLuHome = source("Shijian Lu · NTU homepage", "https://www3.ntu.edu.sg/home/shijian.lu/index.htm", "official", "education, computer-vision research and current appointment");
const ntuGuan = source("NTU CRADLE · Cuntai Guan", "https://www.ntu.edu.sg/cradle/our-people", "official", "current leadership roles and AI appointment");

const hkuIds = source("HKU Institute of Data Science · People", "https://datascience.hku.hk/people/", "official", "current HKU IDS academic staff roster");
const hkuMmlab = source("CUHK MMLab · multi-campus faculty roster", "https://mmlab.ie.cuhk.edu.hk/people.html", "official", "current HKU, HKUST and CUHK MMLab faculty roster");
const hkuXihui = source("HKU IDS · Xihui Liu", "https://datascience.hku.hk/people/xihui-liu/", "official", "appointment, education and multimodal generative-AI research");
const hkuHongyang = source("HKU IDS · Hongyang Li", "https://datascience.hku.hk/people/hongyang-li/", "official", "appointment, OpenDriveLab affiliation and embodied-AI research");
const hkuBo = source("HKU IDS · Bo Dai", "https://datascience.hku.hk/people/bo-dai/", "official", "appointment, doctoral adviser and generative-AI research");

const hkustDirectory = source("HKUST CSE faculty directory", "https://cse.hkust.edu.hk/admin/people/faculty/", "official", "current regular and joint faculty roster and research-area classification");
const hkustDan = source("HKUST CSE · Dan Xu", "https://cse.hkust.edu.hk/admin/people/faculty/profile/danxu", "official", "appointment, education and multimodal scene-understanding research");
const hkustAnyi = source("HKUST CSE joint faculty directory", "https://cse.hkust.edu.hk/admin/people/faculty/?c=joint_appointments&d=textview", "official", "Anyi Rao joint appointment and Vision & Graphics classification");
const hkustHao = source("HKUST CSE · Hao Chen", "https://cse.hkust.edu.hk/admin/people/faculty/profile/jhc", "official", "current appointment and AI / Vision classification");
const hkustYinghao = source("HKUST CSE · Yinghao Xu", "https://cse.hkust.edu.hk/admin/people/faculty/profile/justimyhxu", "official", "current appointment and AI / Vision classification");

const cuhkMmlab = source("CUHK Multimedia Laboratory · People", "https://mmlab.ie.cuhk.edu.hk/people.html", "official", "current CUHK MMLab academic staff roster");
const cuhkMmlabAlumni = source("CUHK Multimedia Laboratory · Alumni", "https://mmlab.ie.cuhk.edu.hk/alumni.html", "official", "education, supervision and lab lineage context");

const pkuWen = source("Peking University CFCS · Wen Gao", "https://cfcs.pku.edu.cn/english/people/directors/wengao/index.htm", "official", "current PKU role, education and research interests");
const pkuVisual = source("PKU National Engineering Research Center of Visual Technology · Wen Gao", "https://idm.pku.edu.cn/en/info/1009/1023.htm", "official", "current chair professorship and visual-AI research");
const thuHu = source("Tsinghua Graphics & Geometric Computing · Shi-Min Hu", "https://cg.cs.tsinghua.edu.cn/~shimin/", "official", "current Tsinghua professorship, education and research");
const thuGraphics = source("Tsinghua Graphics & Geometric Computing · Faculty", "https://cg.cs.tsinghua.edu.cn/people_main.htm", "official", "current group faculty roster");

const stanfordFaculty = source("Stanford Computer Science · Faculty", "https://www.cs.stanford.edu/people/faculty", "official", "current Stanford faculty appointment");
const stanfordMl = source("Stanford Computer Science · Empirical Machine Learning", "https://www.cs.stanford.edu/people-cs/faculty-research/empirical-machine-learning", "official", "machine-learning faculty roster");
const chelseaHome = source("Chelsea Finn · Stanford homepage", "https://ai.stanford.edu/~cbfinn/", "profile", "robot learning, meta-learning and research-group focus");
const ermonHome = source("Stefano Ermon · Stanford homepage", "https://cs.stanford.edu/~ermon/", "profile", "machine learning, generative modeling and AI for science research");
const berkeleyFaculty = source("UC Berkeley EECS · CS faculty list", "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html", "official", "current faculty appointment, education and research areas");
const abbeelHome = source("Pieter Abbeel · Berkeley biography", "https://people.eecs.berkeley.edu/~pabbeel/brief_bio.html", "official", "robot learning research, companies and student startup outcomes");
const levineHome = source("Sergey Levine · Berkeley homepage", "https://people.eecs.berkeley.edu/~svlevine/", "official", "current appointment, education and reinforcement-learning research");
const mitFaculty = source("MIT EECS · People", "https://www.eecs.mit.edu/people/", "official", "current appointment and AI / robotics research classification");
const pulkitHome = source("Pulkit Agrawal · MIT CSAIL homepage", "https://people.csail.mit.edu/pulkitag/", "official", "current appointment, robot-learning research and entrepreneurship");
const cmuRuslan = source("Ruslan Salakhutdinov · CMU homepage", "https://www.cs.cmu.edu/~rsalakhu/", "official", "current CMU professorship and machine-learning research");
const cmuRuslanBio = source("Ruslan Salakhutdinov · CMU biography", "https://www.cs.cmu.edu/~rsalakhu/bio.html", "official", "education and academic background");

type RosterEntry = {
  id: string;
  name: string;
  chinese?: string;
  role: string;
  institution: Person["institution"];
  region: NonNullable<Person["region"]>;
  area: string;
  tags: string[];
  summary: string;
  stage: Person["stage"];
  sources: [Source, Source];
  context: string;
};

const entry = (item: RosterEntry, index: number): Person => ({
  ...item,
  category: "core",
  primary: true,
  facts: [
    { label: "当前任职", value: `${item.institution} · ${item.role}`, source: item.sources[0] },
    { label: "研究主线", value: item.area, source: item.sources[1] },
    { label: "名录说明", value: item.context, source: item.sources[0] },
  ],
  lastVerifiedAt: checkedAt,
  x: 120 + (index % 6) * 160,
  y: 150 + Math.floor(index / 6) * 120,
});

const roster: RosterEntry[] = [
  { id: "hanwang-zhang-ntu", name: "Hanwang Zhang", chinese: "张含望", role: "Associate Professor", institution: "NTU", region: "Singapore", area: "Causal AI · Computer Vision · Vision-Language Reasoning", tags: ["因果 AI", "多模态推理", "计算机视觉", "视觉语言"], summary: "NTU 应用因果 AI 与视觉语言推理代表 PI，把因果推断用于稳健、可解释和去偏的多模态学习。", stage: "senior", sources: [ntuDirectory, ntuZhangNews], context: "NTU CCDS faculty directory 与官方奖项页共同确认现职；此前的 CV 扩展漏收。" },
  { id: "xingang-pan-ntu", name: "Xingang Pan", chinese: "潘新钢", role: "Nanyang Assistant Professor", institution: "NTU", region: "Singapore", area: "Generative AI · Computer Vision · 3D Graphics", tags: ["生成式 AI", "3D", "计算机视觉", "图形学"], summary: "NTU 生成式视觉 PI，研究图像视频生成、3D 表征与视觉—图形统一建模。", stage: "emerging", sources: [ntuDirectory, ntuSlab], context: "NTU S-Lab 将其列为生成式 AI、CV、机器学习和图形学 PI。" },
  { id: "guosheng-lin-ntu", name: "Guosheng Lin", chinese: "林国盛", role: "Associate Professor", institution: "NTU", region: "Singapore", area: "Computer Vision · Data-Efficient Learning · Generative Learning", tags: ["场景理解", "数据高效学习", "生成学习", "3D 视觉"], summary: "研究场景理解、数据高效视觉学习、内容生成与 3D 视觉的 NTU PI。", stage: "senior", sources: [ntuDirectory, ntuGrail], context: "NTU GrAIL 与 CCDS 名录均列为现任视觉与深度学习教师。" },
  { id: "shijian-lu-ntu", name: "Shijian Lu", chinese: "卢世健", role: "Associate Professor", institution: "NTU", region: "Singapore", area: "Computer Vision · Visual Intelligence · Document AI", tags: ["视觉智能", "场景文字", "文档 AI", "域适应"], summary: "NTU 视觉智能与场景文字/文档理解 PI，也研究域适应、图像合成和视觉感知。", stage: "senior", sources: [ntuSlab, ntuLuHome], context: "NTU 官方主页与 S-Lab 名录共同确认现职和视觉研究方向。" },
  { id: "weisi-lin-ntu", name: "Weisi Lin", chinese: "林维斯", role: "President's Chair Professor", institution: "NTU", region: "Singapore", area: "Visual Signal Processing · Multimedia AI · Perceptual Computing", tags: ["多媒体", "视觉质量", "感知计算", "视频 AI"], summary: "NTU 多媒体与视觉感知资深 PI，连接视觉信号处理、质量评估和学习式媒体系统。", stage: "senior", sources: [ntuDirectory, ntuAiCluster], context: "NTU 人工与增强智能集群列为现任 President's Chair Professor。" },
  { id: "boyang-li-ntu", name: "Boyang Li", chinese: "李博扬", role: "Associate Professor", institution: "NTU", region: "Singapore", area: "Multimodal Learning · Data-Centric AI · Narrative Intelligence", tags: ["多模态", "数据中心 AI", "叙事智能", "生成式 AI"], summary: "研究多模态学习、数据中心 AI 与计算叙事智能，具有 Disney Research 与 Baidu Research 经历。", stage: "emerging", sources: [ntuDirectory, ntuGrail], context: "NTU GrAIL 官方简介确认现职、研究主线与产业研究经历。" },
  { id: "eng-siong-chng-ntu", name: "Eng Siong Chng", role: "Professor", institution: "NTU", region: "Singapore", area: "Speech and Language Processing · Speech-LLM Integration", tags: ["语音", "LLM", "代码切换", "口语理解"], summary: "NTU 语音与语言处理资深 PI，领导 AISG Speech Lab，研究代码切换 ASR、口语理解与 LLM—speech 融合。", stage: "senior", sources: [ntuDirectory, ntuGrail], context: "NTU GrAIL 官方简介明确列出语音、语言与大模型方向。" },
  { id: "yew-soon-ong-ntu", name: "Yew-Soon Ong", chinese: "王义顺", role: "President's Chair Professor · Yidan Professor in AI", institution: "NTU", region: "Singapore", area: "Evolutionary AI · Machine Learning · Trustworthy AI", tags: ["进化学习", "机器学习", "AI 优化", "可信 AI"], summary: "NTU 人工智能资深带头人，研究进化与迁移优化、机器学习和可信智能系统。", stage: "institute", sources: [ntuAiCluster, ntuAiLab], context: "NTU AI Laboratory 与校级 AI 集群均列为核心研究负责人。" },
  { id: "cuntai-guan-ntu", name: "Cuntai Guan", chinese: "关存太", role: "President's Chair Professor · Director, AI.R", institution: "NTU", region: "Singapore", area: "Brain-Computer Interfaces · Machine Learning · AI for Health", tags: ["脑机接口", "医疗 AI", "机器学习", "神经技术"], summary: "NTU AI.R 主任，把机器学习、脑机接口与康复和医疗智能连接起来。", stage: "institute", sources: [ntuAiLab, ntuGuan], context: "NTU 官方中心页确认其 AI.R、S-Lab 与康复研究领导角色。" },
  { id: "jie-zhang-ntu", name: "Jie Zhang", role: "Professor · AI Laboratory Research Group Leader", institution: "NTU", region: "Singapore", area: "Multi-Agent Systems · Trustworthy AI · Recommender Systems", tags: ["多智能体", "可信 AI", "推荐系统", "agent"], summary: "NTU 多智能体与可信 AI PI，关注自主智能体、信任建模和推荐决策。", stage: "senior", sources: [ntuDirectory, ntuAiLab], context: "NTU AI Laboratory 将其列为 Research Group Leader。" },
  { id: "yonggang-wen-ntu", name: "Yonggang Wen", chinese: "文勇刚", role: "President's Chair Professor", institution: "NTU", region: "Singapore", area: "AI Systems · Multimedia Computing · Edge Intelligence", tags: ["AI 系统", "多媒体计算", "边缘智能", "云计算"], summary: "研究 AI 与多媒体系统、边缘—云计算和大规模智能基础设施的 NTU PI。", stage: "senior", sources: [ntuDirectory, ntuGroups], context: "NTU 数据科学研究组官方名录列为现任 faculty。" },
  { id: "tat-jen-cham-ntu", name: "Tat-Jen Cham", role: "Associate Professor", institution: "NTU", region: "Singapore", area: "Computer Vision · Generative Methods · 3D Telepresence", tags: ["生成式视觉", "3D telepresence", "图像补全", "计算机视觉"], summary: "NTU 计算机视觉 PI，研究利用语义与上下文的生成方法、3D telepresence 和视觉内容生成。", stage: "senior", sources: [ntuGroups, ntuGrail], context: "NTU CVL 与 GrAIL 官方页面共同确认现任研究角色。" },

  { id: "xihui-liu-hku", name: "Xihui Liu", chinese: "刘希慧", role: "Assistant Professor", institution: "HKU", region: "Hong Kong", area: "Multimodal AI · Vision-Language · Generative Models", tags: ["多模态 AI", "视觉语言", "扩散模型", "开放世界"], summary: "HKU MMLab/IDS 新一代视觉 PI，研究多模态世界理解、视觉语言和可控生成。", stage: "emerging", sources: [hkuIds, hkuXihui], context: "HKU IDS 官方人物页确认现职、CUHK MMLab 博士与 Berkeley 博后经历。" },
  { id: "hongyang-li-hku", name: "Hongyang Li", chinese: "李弘扬", role: "Assistant Professor · OpenDriveLab Research Scientist", institution: "HKU", region: "Hong Kong", area: "Embodied AI · Autonomous Driving · Foundation Models", tags: ["具身智能", "自动驾驶", "世界模型", "机器人"], summary: "HKU/OpenDriveLab PI，以自动驾驶和具身基础模型连接学术研究与上海 AI Lab。", stage: "emerging", sources: [hkuIds, hkuHongyang], context: "HKU IDS 官方简介确认 OpenDriveLab 联合身份与 embodied AI 主线。" },
  { id: "bo-dai-hku", name: "Bo Dai", chinese: "戴勃", role: "Assistant Professor", institution: "HKU", region: "Hong Kong", area: "Generative AI · Embodied AI · 3D Scene Modeling", tags: ["生成式 AI", "视频生成", "3D 场景", "具身智能"], summary: "HKU IDS 生成式 AI PI，代表方向包括视频生成、城市级神经渲染和 real-to-sim-to-real。", stage: "emerging", sources: [hkuIds, hkuBo], context: "HKU 官方简介明确记录 CUHK 博士导师 Dahua Lin。" },
  { id: "hengshuang-zhao-hku", name: "Hengshuang Zhao", chinese: "赵恒爽", role: "Assistant Professor", institution: "HKU", region: "Hong Kong", area: "3D Vision · Scene Understanding · Foundation Models", tags: ["3D 视觉", "场景理解", "点云", "视觉基础模型"], summary: "HKU 3D 视觉与场景理解 PI，研究点云表征、开放世界感知和视觉基础模型。", stage: "emerging", sources: [hkuIds, hkuMmlab], context: "HKU IDS/MMLab 生态中的 3D 视觉与多模态研究节点。" },
  { id: "dan-xu-hkust", name: "Dan Xu", chinese: "徐旦", role: "Associate Professor", institution: "HKUST", region: "Hong Kong", area: "Multimodal Learning · 2D/3D Scene Understanding · Vision", tags: ["多模态", "2D/3D", "场景理解", "自动驾驶"], summary: "HKUST 视觉 PI，研究多模态与结构化表示、2D/3D 场景理解和机器人导航。", stage: "senior", sources: [hkustDirectory, hkustDan], context: "HKUST 官方人物页列出 Oxford VGG 博后与 CUHK MMLab 访问经历。" },
  { id: "anyi-rao-hkust", name: "Anyi Rao", chinese: "饶安逸", role: "Assistant Professor · Joint CSE Appointment", institution: "HKUST", region: "Hong Kong", area: "Generative Video · Multimodal Content · Vision and Graphics", tags: ["视频生成", "多模态内容", "视觉与图形", "生成式 AI"], summary: "HKUST 生成式视频与多模态内容 PI，以联合 CSE 身份进入 Vision & Graphics 社区。", stage: "emerging", sources: [hkustAnyi, hkuMmlab], context: "HKUST CSE 官方 joint-faculty 目录与 MMLab roster 均确认其现任位置。" },
  { id: "hao-chen-hkust", name: "Hao Chen", chinese: "陈浩", role: "Assistant Professor", institution: "HKUST", region: "Hong Kong", area: "Medical AI · Computer Vision · Foundation Models", tags: ["医疗 AI", "计算机视觉", "基础模型", "可信学习"], summary: "HKUST 医疗视觉与 AI PI，研究医学图像分析、基础模型和可信临床智能。", stage: "emerging", sources: [hkustDirectory, hkustHao], context: "HKUST CSE 最新 regular-faculty 目录归入 Vision & Graphics / AI。" },
  { id: "yinghao-xu-hkust", name: "Yinghao Xu", chinese: "徐英豪", role: "Assistant Professor", institution: "HKUST", region: "Hong Kong", area: "Generative AI · 3D Vision · Neural Rendering", tags: ["生成式 AI", "3D 视觉", "神经渲染", "数字人"], summary: "HKUST 新一代生成式视觉 PI，研究 3D 生成、神经渲染和可控视觉内容。", stage: "emerging", sources: [hkustDirectory, hkustYinghao], context: "HKUST CSE 最新目录归入 Artificial Intelligence / Vision & Graphics。" },
  { id: "hongsheng-li-cuhk", name: "Hongsheng Li", chinese: "李鸿升", role: "Associate Professor", institution: "CUHK", region: "Hong Kong", area: "Computer Vision · Multimodal Learning · Embodied Intelligence", tags: ["MMLab", "视觉识别", "多模态", "具身智能"], summary: "CUHK MMLab PI，研究大规模视觉识别、多模态学习与具身感知。", stage: "senior", sources: [cuhkMmlab, cuhkMmlabAlumni], context: "CUHK MMLab 当前 academic staff，并具备清晰的本实验室博士谱系。" },
  { id: "tianfan-xue-cuhk", name: "Tianfan Xue", chinese: "薛天帆", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong", area: "Computational Photography · Video Generation · Computer Vision", tags: ["计算摄影", "视频生成", "视觉", "图像处理"], summary: "CUHK MMLab PI，研究计算摄影、视频理解与生成以及学习式图像处理。", stage: "emerging", sources: [cuhkMmlab, cuhkMmlabAlumni], context: "CUHK MMLab 当前 faculty；早期亦在该实验室完成 MPhil。" },
  { id: "wanli-ouyang-cuhk", name: "Wanli Ouyang", chinese: "欧阳万里", role: "Professor", institution: "CUHK", region: "Hong Kong", area: "Computer Vision · Multimodal Foundation Models · Detection", tags: ["视觉基础模型", "检测", "多模态", "MMLab"], summary: "CUHK MMLab 资深视觉 PI，覆盖检测、表征学习和多模态基础模型。", stage: "senior", sources: [cuhkMmlab, cuhkMmlabAlumni], context: "CUHK MMLab 官方 roster 列为现任 Professor。" },
  { id: "xiangyu-yue-cuhk", name: "Xiangyu Yue", chinese: "岳翔宇", role: "Assistant Professor", institution: "CUHK", region: "Hong Kong", area: "Embodied AI · Autonomous Systems · 3D Vision", tags: ["具身智能", "自动系统", "3D 视觉", "世界模型"], summary: "CUHK MMLab 新一代 PI，研究具身感知、自主系统和 3D 场景智能。", stage: "emerging", sources: [cuhkMmlab, cuhkMmlabAlumni], context: "CUHK MMLab 当前 academic staff。" },

  { id: "gao-wen-pku", name: "高文", role: "Boya Chair Professor", institution: "PKU", region: "Mainland China", area: "Artificial Intelligence · Multimedia · Computer Vision", tags: ["多媒体", "计算机视觉", "模式识别", "AI"], summary: "北京大学视觉与多媒体 AI 资深带头人，研究计算机视觉、模式识别、图像处理与虚拟现实。", stage: "institute", sources: [pkuWen, pkuVisual], context: "北大 CFCS 与视觉技术国家工程研究中心官方页共同确认现职。" },
  { id: "hu-shimin-thu", name: "胡事民", role: "Professor", institution: "THU", region: "Mainland China", area: "Computer Graphics · Visual Computing · Multimodal Reasoning", tags: ["计算机图形学", "视觉计算", "多模态推理", "内容生成"], summary: "清华图形学与视觉计算资深 PI，近年延伸至多模态输出、视觉推理和生成内容。", stage: "senior", sources: [thuHu, thuGraphics], context: "清华图形与几何计算组官方教师名录确认现任 Professor。" },

  { id: "chelsea-finn-us", name: "Chelsea Finn", role: "Assistant Professor", institution: "Stanford", region: "United States", area: "Robot Learning · Meta-Learning · Embodied AI", tags: ["机器人学习", "元学习", "具身智能", "foundation policy"], summary: "Stanford 机器人学习 PI，研究从少量数据中快速适应的通用机器人与元学习。", stage: "emerging", sources: [stanfordFaculty, chelseaHome], context: "Stanford CS faculty 与 empirical ML roster 均列为现任教师。" },
  { id: "stefano-ermon-us", name: "Stefano Ermon", role: "Associate Professor", institution: "Stanford", region: "United States", area: "Generative Models · Probabilistic AI · AI for Science", tags: ["生成模型", "概率 AI", "AI for Science", "可持续 AI"], summary: "Stanford 概率与生成式 AI PI，把机器学习用于科学发现、环境与社会问题。", stage: "senior", sources: [stanfordMl, ermonHome], context: "Stanford CS 官方目录确认现任 Associate Professor。" },
  { id: "pieter-abbeel-us", name: "Pieter Abbeel", role: "Professor", institution: "Berkeley", region: "United States", area: "Robot Learning · Reinforcement Learning · Generative AI", tags: ["机器人学习", "强化学习", "生成式 AI", "创业"], summary: "Berkeley 机器人学习核心 PI，学生与校友网络连接 OpenAI、Perplexity、Physical Intelligence、Skild 等创业团队。", stage: "institute", sources: [berkeleyFaculty, abbeelHome], context: "Berkeley 官方名录与个人校内简介共同确认现职、研究及创业网络。" },
  { id: "sergey-levine-us", name: "Sergey Levine", role: "Associate Professor", institution: "Berkeley", region: "United States", area: "Deep Reinforcement Learning · Robot Learning · Decision Making", tags: ["深度强化学习", "机器人学习", "决策", "offline RL"], summary: "Berkeley RAIL 负责人，研究通用自主体的强化学习、模仿学习与现实世界机器人决策。", stage: "senior", sources: [berkeleyFaculty, levineHome], context: "Berkeley 官方教师名录与 RAIL 主页确认现任职位。" },
  { id: "pulkit-agrawal-us", name: "Pulkit Agrawal", role: "Associate Professor", institution: "MIT", region: "United States", area: "Robot Learning · Reinforcement Learning · Sensorimotor Intelligence", tags: ["机器人学习", "强化学习", "运动智能", "创业"], summary: "MIT Improbable AI Lab PI，研究接近人类操控与运动能力的机器人学习，并联合创办 Eka Robotics。", stage: "senior", sources: [mitFaculty, pulkitHome], context: "MIT EECS 与 CSAIL 主页共同确认现职、研究和创业经历。" },
  { id: "ruslan-salakhutdinov-us", name: "Ruslan Salakhutdinov", role: "UPMC Professor of Computer Science", institution: "CMU", region: "United States", area: "Deep Learning · Probabilistic Models · Generative AI", tags: ["深度学习", "概率模型", "生成式 AI", "机器学习"], summary: "CMU Machine Learning Department 资深 PI，研究深度生成模型、概率学习与表示学习。", stage: "senior", sources: [cmuRuslan, cmuRuslanBio], context: "CMU 官方个人页确认 UPMC Professor 现职与机器学习研究。" },
];

export const systematicRosterPeople: Person[] = roster.map(entry);

export const systematicRosterRelationships: Relationship[] = [
  { id: "roster-dahua-bo-dai-lineage", from: "dahua-lin-cuhk", to: "bo-dai-hku", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "HKU IDS 官方简介记录 Bo Dai 在 CUHK 跟随 Dahua Lin 完成博士。", evidenceObject: "Bo Dai CUHK PhD", source: hkuBo, verified: true },
  { id: "roster-abbeel-finn-lineage", from: "pieter-abbeel-us", to: "chelsea-finn-us", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Pieter Abbeel 的 Berkeley 官方简介将 Chelsea Finn 列入其学生与创业校友网络。", evidenceObject: "Berkeley robot-learning lineage", source: abbeelHome, verified: true },
  { id: "roster-pulkit-eka", from: "pulkit-agrawal-us", to: "pulkit-agrawal-us", type: "industry", subtype: "industry_affiliation", label: "Eka Robotics 联合创始人", evidence: "MIT CSAIL 个人主页公开写明其为 Eka Robotics co-founder。", source: pulkitHome, verified: true },
];

export const systematicRosterPlacements: StudentPlacement[] = [];
export const systematicRosterGroupMembers: GroupMember[] = [];

