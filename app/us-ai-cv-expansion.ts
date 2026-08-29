import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-29";

const official = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "official", checkedAt, supports,
});

const profile = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "profile", checkedAt, supports,
});

const cv = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "cv", checkedAt, supports,
});

type ExpansionInstitution = Person["institution"] | "UMich" | "UIUC" | "Georgia Tech" | "UCLA" | "UCSD";

type ExpansionPerson = Omit<Person, "institution" | "region" | "category" | "primary" | "lastVerifiedAt" | "facts"> & {
  institution: ExpansionInstitution;
  node: string;
  sources: [Source, Source, ...Source[]];
};

const makePerson = ({ node, institution, ...person }: ExpansionPerson): Person => ({
  ...person,
  institution: institution as Person["institution"],
  region: "United States",
  category: "core",
  primary: true,
  status: person.status ?? "current PI",
  lastVerifiedAt: checkedAt,
  facts: [
    { label: "现职", value: person.role, source: person.sources[0] },
    { label: "研究主题", value: person.area, source: person.sources[0] },
    { label: "公开研究节点", value: node, source: person.sources[1] },
  ],
});

export const usAiCvExpansionPeople: Person[] = [
  makePerson({
    id: "fei-fei-li-us", name: "Fei-Fei Li", role: "Sequoia Professor · Co-Director, Stanford HAI", institution: "Stanford",
    area: "Computer Vision · Spatial Intelligence · Human-Centered AI", tags: ["计算机视觉", "空间智能", "多模态", "Human-Centered AI"],
    summary: "Stanford 视觉与人本人工智能方向的资深 PI，研究从视觉识别、ImageNet 延伸到具身与空间智能；公开资料同时记录其 World Labs 联合创办人兼 CEO 身份。",
    node: "Stanford Vision and Learning Lab / Stanford HAI", stage: "senior", x: 90, y: 550,
    sources: [
      official("Stanford profile — Fei-Fei Li", "https://profiles.stanford.edu/fei-fei-li", "Current title, HAI leadership, research and World Labs role"),
      official("Stanford Vision and Learning Lab", "https://svl.stanford.edu/", "Research group and vision-learning programme"),
    ],
  }),
  makePerson({
    id: "jiajun-wu-stanford-us", name: "Jiajun Wu", role: "Assistant Professor of Computer Science", institution: "Stanford",
    area: "Computer Vision · Robotics · Computational Cognitive Science", tags: ["计算机视觉", "机器人", "生成模型", "认知科学"],
    summary: "Stanford 新生代独立 PI，研究可学习的视觉世界模型、机器人感知与计算认知科学，连接视觉、多模态生成和具身智能。",
    node: "Stanford Vision and Learning Lab", stage: "emerging", x: 220, y: 550,
    sources: [
      official("Stanford profile — Jiajun Wu", "https://profiles.stanford.edu/jiajun-wu", "Current appointment and research interests"),
      profile("Jiajun Wu public homepage", "https://jiajunwu.com/", "Current laboratory, students and research programme"),
    ],
  }),

  makePerson({
    id: "trevor-darrell-us", name: "Trevor Darrell", role: "Professor of EECS · Co-Director, BAIR", institution: "Berkeley",
    area: "Computer Vision · Multimodal Learning · Embodied AI", tags: ["计算机视觉", "多模态", "具身 AI", "BAIR"],
    summary: "Berkeley 视觉与机器学习资深 PI，参与建设 BAIR，并长期推动视觉识别、多模态学习、机器人与开放研究基础设施。",
    node: "Berkeley AI Research / Berkeley DeepDrive", stage: "senior", x: 380, y: 490,
    sources: [
      official("Berkeley EECS faculty profile — Trevor Darrell", "https://www2.eecs.berkeley.edu/Faculty/Homepages/trevor.html", "Current faculty appointment and research areas"),
      profile("Trevor Darrell public homepage", "https://people.eecs.berkeley.edu/~trevor/", "BAIR leadership, groups and current research"),
    ],
  }),
  makePerson({
    id: "alexei-efros-us", name: "Alexei A. Efros", role: "Howard Friesen Professor of EECS", institution: "Berkeley",
    area: "Computer Vision · Graphics · Visual Generative Models", tags: ["计算机视觉", "图形学", "生成模型", "视觉表征"],
    summary: "Berkeley 视觉与图形学资深 PI，研究视觉数据驱动建模、图像生成与表征学习；公开履历可追溯其导师与跨校学生、博士后网络。",
    node: "Berkeley AI Research", stage: "senior", x: 510, y: 490,
    sources: [
      official("Berkeley EECS faculty profile — Alexei Efros", "https://www2.eecs.berkeley.edu/Faculty/Homepages/efros.html", "Current faculty appointment and research fields"),
      profile("Alexei Efros public homepage", "https://people.eecs.berkeley.edu/~efros/", "Research programme, students and postdocs"),
      cv("Alexei Efros CV", "https://people.eecs.berkeley.edu/~efros/cv.html", "Academic history and advising lineage"),
    ],
  }),

  makePerson({
    id: "deva-ramanan-us", name: "Deva Ramanan", role: "Professor, Robotics Institute", institution: "CMU",
    area: "Computer Vision · 3D Perception · Embodied Perception", tags: ["计算机视觉", "3D 感知", "第一视角", "机器人"],
    summary: "CMU Robotics Institute 视觉方向资深 PI，研究识别、三维感知、第一视角视觉与自动系统；个人组页公开列出当前成员和校友去向。",
    node: "CMU Robotics Institute · Deva Ramanan Group", stage: "senior", x: 670, y: 490,
    sources: [
      official("CMU Robotics Institute profile — Deva Ramanan", "https://www.ri.cmu.edu/ri-faculty/deva-kannan-ramanan/", "Current appointment and research interests"),
      profile("Deva Ramanan group homepage", "https://www.cs.cmu.edu/~deva/", "Current group members, alumni and placements"),
    ],
  }),
  makePerson({
    id: "louis-philippe-morency-us", name: "Louis-Philippe Morency", role: "Leonardo Associate Professor", institution: "CMU",
    area: "Multimodal Machine Learning · Spoken Language · Human Behavior", tags: ["多模态", "语音", "对话", "人类行为"],
    summary: "CMU 多模态计算代表性 PI，研究语言、语音、视觉和人类行为的联合建模，连接 LTI、机器学习与人机交互。",
    node: "CMU MultiComp Lab / Language Technologies Institute", stage: "senior", x: 800, y: 490,
    sources: [
      official("CMU LTI profile — Louis-Philippe Morency", "https://www.lti.cs.cmu.edu/people/faculty/morency-louis-philippe.html", "Current appointment and research areas"),
      official("CMU MultiComp Lab", "https://multicomp.cs.cmu.edu/", "Laboratory, people and multimodal research programme"),
    ],
  }),

  makePerson({
    id: "antonio-torralba-us", name: "Antonio Torralba", role: "Delta Electronics Professor · Head, AI+D", institution: "MIT",
    area: "Computer Vision · Machine Learning · Human Visual Perception", tags: ["计算机视觉", "机器学习", "场景理解", "人类视觉"],
    summary: "MIT CSAIL 视觉方向资深 PI，研究场景理解、视觉感知和大规模视觉数据，并领导 AI+D 跨学术单元。",
    node: "MIT CSAIL Computer Vision / AI+D", stage: "senior", x: 90, y: 995,
    sources: [
      official("MIT CSAIL profile — Antonio Torralba", "https://www.csail.mit.edu/person/antonio-torralba", "Current title, AI+D leadership and research"),
      profile("Antonio Torralba public homepage", "https://web.mit.edu/torralba/www/", "Research group, publications and students"),
    ],
  }),
  makePerson({
    id: "phillip-isola-us", name: "Phillip Isola", role: "Associate Professor of EECS", institution: "MIT",
    area: "Computer Vision · Generative Models · Representation Learning", tags: ["计算机视觉", "生成模型", "表征学习", "多模态"],
    summary: "MIT 视觉与生成建模独立 PI，研究视觉生成、表征学习和人机协作，代表从经典视觉向基础生成模型延展的一支。",
    node: "MIT CSAIL", stage: "emerging", x: 220, y: 995,
    sources: [
      official("MIT CSAIL profile — Phillip Isola", "https://www.csail.mit.edu/person/phillip-isola", "Current appointment and research interests"),
      profile("Phillip Isola public homepage", "https://web.mit.edu/phillipi/", "Research programme, publications and group"),
    ],
  }),

  makePerson({
    id: "ali-farhadi-us", name: "Ali Farhadi", role: "Professor · CEO, Allen Institute for AI", institution: "UW",
    area: "Computer Vision · Multimodal Reasoning · Embodied AI", tags: ["计算机视觉", "多模态推理", "具身 AI", "AI2"],
    summary: "UW 教授兼 Allen Institute for AI CEO，研究视觉、语言和推理，并通过 RAIVN 与 AI2 连接高校和非营利工业研究组织。",
    node: "UW RAIVN Lab / Allen Institute for AI", stage: "senior", x: 960, y: 490,
    sources: [
      official("UW Allen School faculty profile — Ali Farhadi", "https://www.cs.washington.edu/people/faculty/ali/", "Current UW faculty appointment and research"),
      official("Allen Institute for AI profile — Ali Farhadi", "https://allenai.org/team/ali-farhadi", "Current AI2 leadership role"),
      official("UW RAIVN Lab people", "https://raivn.cs.washington.edu/people/", "Faculty role, current students and advisers"),
    ],
  }),
  makePerson({
    id: "dieter-fox-us", name: "Dieter Fox", role: "Professor · Head, RSE-Lab", institution: "UW",
    area: "Robotics · Artificial Intelligence · State Estimation", tags: ["机器人", "基础模型", "具身 AI", "AI2"],
    summary: "UW 机器人与状态估计资深 PI，在 AI2 推进机器人基础模型；官方资料也记录其此前领导 NVIDIA Seattle Robotics Lab 的经历。",
    node: "UW Robotics and State Estimation Lab / AI2", stage: "senior", x: 1090, y: 490,
    sources: [
      official("UW Allen School faculty profile — Dieter Fox", "https://www.cs.washington.edu/people/faculty/dieter-fox/", "Current appointment, research, AI2 and NVIDIA roles"),
      official("UW RSE-Lab people", "https://rse-lab.cs.washington.edu/people/", "Laboratory leadership and research group"),
    ],
  }),

  makePerson({
    id: "bharath-hariharan-us", name: "Bharath Hariharan", role: "Associate Professor of Computer Science", institution: "Cornell",
    area: "Computer Vision · Machine Learning · Visual Recognition", tags: ["计算机视觉", "机器学习", "视觉识别", "多模态"],
    summary: "Cornell 视觉与机器学习 PI，研究数据高效视觉识别、视觉表征与多模态感知，公开主页列出当前学生与近期研究。",
    node: "Cornell Computer Vision", stage: "senior", x: 670, y: 1090,
    sources: [
      official("Cornell Bowers CS profile — Bharath Hariharan", "https://www.cs.cornell.edu/people/bharath-hariharan", "Current appointment and research interests"),
      profile("Bharath Hariharan public homepage", "https://www.cs.cornell.edu/~bharathh/", "Current group, publications and research programme"),
    ],
  }),
  makePerson({
    id: "noah-snavely-us", name: "Noah Snavely", role: "Professor of Computer Science", institution: "Cornell",
    area: "Computer Vision · Computer Graphics · 3D Reconstruction", tags: ["计算机视觉", "图形学", "三维重建", "Google DeepMind"],
    summary: "Cornell Tech / Cornell Bowers 视觉与图形学资深 PI，研究三维场景重建和互联网规模视觉；公开资料记录其 Google DeepMind 研究科学家身份。",
    node: "Cornell Graphics and Vision Group", stage: "senior", x: 800, y: 1090,
    sources: [
      official("Cornell Bowers CS profile — Noah Snavely", "https://www.cs.cornell.edu/people/noah-snavely", "Current Cornell appointment and research interests"),
      profile("Noah Snavely public homepage", "https://www.cs.cornell.edu/~snavely/", "Research programme and publications"),
      official("Cornell RGB faculty", "https://rgb.cs.cornell.edu/people_categories/faculty/", "Cornell group and Google DeepMind affiliation"),
    ],
  }),

  makePerson({
    id: "olga-russakovsky-us", name: "Olga Russakovsky", role: "Associate Professor of Computer Science", institution: "Princeton",
    area: "Computer Vision · Human-Centered AI · Responsible AI", tags: ["计算机视觉", "人本 AI", "公平性", "AI Lab"],
    summary: "Princeton 视觉与负责任 AI PI，研究视觉识别、人机协作和公平性；公开履历给出 Fei-Fei Li 博士师承及 CMU 博士后网络。",
    node: "Princeton Visual AI Lab / Princeton AI Lab", stage: "senior", x: 380, y: 900,
    sources: [
      official("Princeton CS profile — Olga Russakovsky", "https://www.cs.princeton.edu/people/profile/olgarus", "Current appointment and research interests"),
      profile("Olga Russakovsky public homepage", "https://www.cs.princeton.edu/~olgarus/", "AI Lab role, research group and publications"),
      cv("Olga Russakovsky CV", "https://www.cs.princeton.edu/~olgarus/OlgaRussakovsky_CV.pdf", "Doctoral and postdoctoral advising lineage"),
    ],
  }),
  makePerson({
    id: "jia-deng-us", name: "Jia Deng", role: "Professor of Computer Science", institution: "Princeton",
    area: "Computer Vision · Machine Learning · Visual Intelligence", tags: ["计算机视觉", "机器学习", "视觉智能", "具身感知"],
    summary: "Princeton Vision & Learning Lab 负责人，研究视觉识别、三维与具身感知，是 ImageNet 之后视觉智能谱系的重要独立 PI。",
    node: "Princeton Vision & Learning Lab", stage: "senior", x: 510, y: 900,
    sources: [
      official("Princeton CS profile — Jia Deng", "https://www.cs.princeton.edu/people/profile/jiadeng", "Current appointment and research areas"),
      profile("Jia Deng public homepage", "https://www.cs.princeton.edu/~jiadeng/", "Current title, lab and research programme"),
      official("Princeton Vision & Learning Lab people", "https://pvl.cs.princeton.edu/people.html", "Laboratory leadership and current members"),
    ],
  }),

  makePerson({
    id: "yann-lecun-us", name: "Yann LeCun", role: "Silver Professor of Computer Science and Neural Science", institution: "NYU",
    area: "Machine Learning · Computer Vision · Autonomous Intelligence", tags: ["机器学习", "计算机视觉", "自监督学习", "世界模型"],
    summary: "NYU 深度学习与视觉资深 PI，研究从卷积网络、自监督表征延伸到世界模型与自主机器智能。",
    node: "NYU Center for Data Science / Courant", stage: "senior", x: 960, y: 995,
    sources: [
      official("NYU Computer Science faculty roster", "https://cs.nyu.edu/dynamic/people/faculty/type/1/?area=Machine+Learning", "Current NYU faculty appointment and research areas"),
      profile("Yann LeCun public homepage", "https://yann.lecun.com/", "Research programme, publications and biography"),
    ],
  }),
  makePerson({
    id: "rob-fergus-us", name: "Rob Fergus", role: "Professor of Computer Science", institution: "NYU",
    area: "Computer Vision · Machine Learning · Computational Photography", tags: ["计算机视觉", "机器学习", "计算摄影", "生成模型"],
    summary: "NYU 视觉与机器学习资深 PI，研究视觉识别、生成与计算摄影；本图仅记录可由 NYU 当前名录核验的学术任职。",
    node: "NYU Vision, Learning and Graphics", stage: "senior", x: 1090, y: 995,
    sources: [
      official("NYU Computer Science vision faculty", "https://cs.nyu.edu/dynamic/people/faculty/area/Graphics%2C%20Vision%2C%20User%20Interfaces%2C%20and%20Games/?type=1", "Current title and research areas"),
      profile("Rob Fergus public homepage", "https://cs.nyu.edu/~fergus/intro.htm", "Research programme and publications"),
    ],
  }),

  makePerson({
    id: "shree-nayar-us", name: "Shree K. Nayar", role: "T. C. Chang Professor of Computer Science", institution: "Columbia",
    area: "Computational Imaging · Computer Vision · Visual Perception", tags: ["计算成像", "计算机视觉", "相机系统", "视觉感知"],
    summary: "Columbia CAVE 负责人，长期研究计算成像、视觉感知与新型相机，是计算机视觉硬件—算法协同方向的重要资深节点。",
    node: "Columbia CAVE / First Principles of Computer Vision", stage: "senior", x: 90, y: 1690,
    sources: [
      profile("Shree Nayar public homepage", "https://www.cs.columbia.edu/~nayar/", "Current title, research and group leadership"),
      official("Columbia CAVE", "https://www.cs.columbia.edu/CAVE/", "Laboratory leadership and computational imaging programme"),
      official("First Principles of Computer Vision", "https://fpcv.cs.columbia.edu/", "Public vision education and research initiative"),
    ],
  }),
  makePerson({
    id: "carl-vondrick-us", name: "Carl Vondrick", role: "Yemini Associate Professor of Computer Science", institution: "Columbia",
    area: "Computer Vision · Multimodal Learning · Robotics", tags: ["计算机视觉", "多模态", "视频理解", "机器人"],
    summary: "Columbia 新生代视觉 PI，研究视频、多模态学习和机器人感知；个人主页公开记录学生、校友去向及 Apple 研究身份。",
    node: "Columbia Visual Learning Group / CAIL", stage: "emerging", x: 220, y: 1690,
    sources: [
      official("Columbia CS directory — Carl Vondrick", "https://www.cs.columbia.edu/people/directory/", "Current faculty title and institutional appointment"),
      profile("Carl Vondrick public homepage", "https://www.cs.columbia.edu/~vondrick/", "Research programme, group members, alumni and Apple role"),
    ],
  }),

  makePerson({
    id: "alan-yuille-us", name: "Alan Yuille", role: "Bloomberg Distinguished Professor", institution: "JHU",
    area: "Computer Vision · Machine Learning · Computational Cognition", tags: ["计算机视觉", "机器学习", "计算认知", "医学影像"],
    summary: "Johns Hopkins 视觉与计算认知资深 PI，研究视觉理解、机器学习、认知与医学图像，领导 CCVL 跨学科团队。",
    node: "Computational Cognition, Vision, and Learning", stage: "senior", x: 670, y: 1595,
    sources: [
      official("Johns Hopkins CS profile — Alan Yuille", "https://www.cs.jhu.edu/faculty/alan-yuille/", "Current title, appointments and research interests"),
      official("Johns Hopkins CCVL", "https://ccvl.jhu.edu/", "Laboratory leadership and research programme"),
    ],
  }),
  makePerson({
    id: "rama-chellappa-us", name: "Rama Chellappa", role: "Bloomberg Distinguished Professor", institution: "JHU",
    area: "Computer Vision · Pattern Recognition · Biometrics", tags: ["计算机视觉", "模式识别", "生物识别", "AI"],
    summary: "Johns Hopkins 计算机视觉与模式识别资深 PI，长期研究人脸、生物识别、视频分析和人工智能系统。",
    node: "Johns Hopkins ECE / Center for Imaging Science", stage: "senior", x: 800, y: 1595,
    sources: [
      official("Johns Hopkins ECE profile — Rama Chellappa", "https://engineering.jhu.edu/ece/faculty/rama-chellappa/", "Current appointment, biography and research areas"),
      official("Johns Hopkins CS joint and secondary faculty", "https://www.cs.jhu.edu/people/cs-affiliates/joint-and-secondary-faculty/", "Current cross-department faculty affiliation"),
    ],
  }),

  makePerson({
    id: "kristen-grauman-us", name: "Kristen Grauman", role: "Professor of Computer Science", institution: "UT Austin",
    area: "Computer Vision · Egocentric Video · Embodied AI", tags: ["计算机视觉", "第一视角视频", "具身 AI", "多模态"],
    summary: "UT Austin 视觉方向资深 PI，研究第一视角视频、具身感知与视觉语言学习；公开履历记录其 Meta FAIR 研究领导经历。",
    node: "UT Austin Computer Vision Group", stage: "senior", x: 960, y: 1595,
    sources: [
      official("UT Austin CS profile — Kristen Grauman", "https://www.cs.utexas.edu/people/faculty-researchers/kristen-grauman", "Current appointment and research interests"),
      profile("Kristen Grauman biography", "https://www.cs.utexas.edu/~grauman/bio.html", "Research programme and biography"),
      cv("Kristen Grauman CV", "https://www.cs.utexas.edu/~grauman/grauman_cv.pdf", "Academic and Meta FAIR employment history"),
    ],
  }),
  makePerson({
    id: "atlas-wang-us", name: "Atlas Wang", role: "Assistant Professor of ECE", institution: "UT Austin",
    area: "Efficient and Trustworthy AI · Computer Vision · Foundation Models", tags: ["高效 AI", "可信 AI", "计算机视觉", "基础模型"],
    summary: "UT Austin VITA Group 负责人，研究高效与可信机器学习、计算机视觉和基础模型，连接算法、系统与真实部署。",
    node: "Visual Informatics Group (VITA)", stage: "emerging", x: 1090, y: 1595,
    sources: [
      official("UT Austin CS profile — Atlas Wang", "https://www.cs.utexas.edu/people/faculty-researchers/atlas-wang", "Current appointment and research interests"),
      profile("UT Austin VITA Group", "https://vita-group.github.io/", "Laboratory leadership, people and research programme"),
    ],
  }),

  makePerson({
    id: "rada-mihalcea-us", name: "Rada Mihalcea", role: "Janice M. Jenkins Collegiate Professor · Director, AI Lab", institution: "UMich",
    area: "Natural Language Processing · Multimodal Behavior · Computational Social Science", tags: ["NLP", "多模态", "计算社会科学", "Human-Centered AI"],
    summary: "Michigan AI Lab 负责人，研究语言、多模态人类行为和计算社会科学，代表 NLP 与通用人本 AI 的交叉节点。",
    node: "Michigan Artificial Intelligence Lab / LIT", stage: "senior", x: 90, y: 2000,
    sources: [
      official("Michigan CSE profile — Rada Mihalcea", "https://cse.engin.umich.edu/personnel/mihalcea-rada", "Current title, AI Lab leadership and research interests"),
      profile("Rada Mihalcea public homepage", "https://web.eecs.umich.edu/~mihalcea/", "Research programme, publications and group"),
      official("Michigan LIT Lab people", "https://lit.eecs.umich.edu/people.html", "Laboratory leadership and current members"),
    ],
  }),
  makePerson({
    id: "satinder-singh-us", name: "Satinder Singh Baveja", role: "Toyota Professor of Artificial Intelligence", institution: "UMich",
    area: "Reinforcement Learning · Autonomous Agents · Multi-Agent Learning", tags: ["强化学习", "自主智能体", "多智能体", "DeepMind"],
    summary: "Michigan 强化学习与自主智能体资深 PI，研究复杂环境中的学习与决策；个人任职页公开记录 DeepMind 研究科学家与 Cogitai 创业经历。",
    node: "Michigan Artificial Intelligence Lab", stage: "senior", x: 220, y: 2000,
    sources: [
      official("Michigan CSE AI faculty", "https://cse.engin.umich.edu/people/researchers-by-area/artificial-intelligence/", "Current Michigan faculty affiliation and AI area"),
      profile("Satinder Singh employment history", "https://web.eecs.umich.edu/~baveja/employment.html", "Current academic and industry appointments"),
      profile("Satinder Singh research", "https://web.eecs.umich.edu/~baveja/research.html", "Research programme in reinforcement learning and agents"),
    ],
  }),

  makePerson({
    id: "svetlana-lazebnik-us", name: "Svetlana Lazebnik", role: "Professor of Computer Science", institution: "UIUC",
    area: "Computer Vision · Vision-Language Learning · Generative Models", tags: ["计算机视觉", "视觉语言", "生成模型", "机器人"],
    summary: "UIUC 视觉资深 PI，研究场景理解、图像—文本联合建模和视觉生成；个人主页公开列出学生与 Amazon、Google、Snap、Meta 等去向。",
    node: "Illinois Computer Vision Group", stage: "senior", x: 380, y: 2000,
    sources: [
      profile("Svetlana Lazebnik public homepage", "https://slazebni.cs.illinois.edu/", "Current title, research, students and alumni placements"),
      official("Illinois Computer Vision Group", "https://vision.cs.illinois.edu/", "Current institutional vision research group"),
      cv("Svetlana Lazebnik CV", "https://slazebni.cs.illinois.edu/lana_cv.pdf", "Academic appointment and advising history"),
    ],
  }),
  makePerson({
    id: "derek-hoiem-us", name: "Derek Hoiem", role: "Professor of Computer Science", institution: "UIUC",
    area: "Dynamic Learning · Vision for Action · Long-Form Vision", tags: ["计算机视觉", "持续学习", "视觉行动", "创业"],
    summary: "UIUC 视觉资深 PI，研究动态学习、面向行动的视觉和长时空视觉；公开简介记录其 Reconstruct 联合创办人兼 Chief Science Officer 身份。",
    node: "Illinois Computer Vision Group", stage: "senior", x: 510, y: 2000,
    sources: [
      profile("Derek Hoiem public homepage", "https://dhoiem.cs.illinois.edu/main.html", "Current title, research programme and group members"),
      profile("Derek Hoiem biography", "https://dhoiem.cs.illinois.edu/bio.html", "Academic biography and Reconstruct role"),
      official("Illinois Computer Vision Group", "https://vision.cs.illinois.edu/", "Current institutional vision research group"),
    ],
  }),

  makePerson({
    id: "james-hays-us", name: "James Hays", role: "Professor of Interactive Computing", institution: "Georgia Tech",
    area: "Computer Vision · Machine Learning · Robotics", tags: ["计算机视觉", "机器学习", "机器人", "自动驾驶"],
    summary: "Georgia Tech 视觉与机器学习资深 PI，研究大规模视觉与机器人；官方简介记录其 Alexei Efros 博士师承、Antonio Torralba 博士后及 Argo AI 经历。",
    node: "Georgia Tech Computer Vision", stage: "senior", x: 670, y: 2000,
    sources: [
      official("Georgia Tech profile — James Hays", "https://www.cc.gatech.edu/people/james-hays", "Current appointment, research, lineage and Argo AI history"),
      profile("James Hays public homepage", "https://faculty.cc.gatech.edu/~hays/", "Research programme, publications and group"),
    ],
  }),
  makePerson({
    id: "zsolt-kira-us", name: "Zsolt Kira", role: "Associate Professor of Machine Learning", institution: "Georgia Tech",
    area: "Robot Learning · Vision-Language-Action Models · Foundation Models", tags: ["机器人学习", "视觉语言行动", "基础模型", "具身 AI"],
    summary: "Georgia Tech RIPL 负责人，研究感知、视觉语言行动模型和机器人基础模型，是具身 AI 方向的独立 PI。",
    node: "RobotIcs and Intelligent Learning Lab (RIPL)", stage: "emerging", x: 800, y: 2000,
    sources: [
      official("Georgia Tech profile — Zsolt Kira", "https://www.cc.gatech.edu/people/zsolt-kira", "Current appointment, ML@GT role and research interests"),
      profile("Zsolt Kira public homepage", "https://faculty.cc.gatech.edu/~zk15/", "Current laboratory and research programme"),
      profile("RIPL group members", "https://faculty.cc.gatech.edu/~zk15/group/", "Current students and group members"),
    ],
  }),

  makePerson({
    id: "bolei-zhou-us", name: "Bolei Zhou", role: "Associate Professor of Computer Science", institution: "UCLA",
    area: "Computer Vision · Embodied AI · Physical Intelligence", tags: ["计算机视觉", "具身 AI", "物理智能", "机器人"],
    summary: "UCLA 视觉与具身智能 PI，研究场景理解、机器人学习和物理智能，推动视觉模型从互联网数据走向真实环境交互。",
    node: "UCLA Vision, Cognition, Learning, and Autonomy", stage: "emerging", x: 960, y: 2000,
    sources: [
      official("UCLA Samueli profile — Bolei Zhou", "https://samueli.ucla.edu/people/bolei-zhou/", "Current appointment and research programme"),
      profile("Bolei Zhou public homepage", "https://boleizhou.github.io/", "Research, publications and group"),
      official("UCLA faculty profile — Bolei Zhou", "https://profiles.ucla.edu/bolei.zhou", "Current UCLA affiliation"),
    ],
  }),
  makePerson({
    id: "achuta-kadambi-us", name: "Achuta Kadambi", role: "Associate Professor of ECE", institution: "UCLA",
    area: "Computational Imaging · Computer Vision · Robotics", tags: ["计算成像", "计算机视觉", "机器人", "创业"],
    summary: "UCLA 计算成像与视觉 PI，研究物理感知、机器人和机器学习；公开履历记录 Akasha Imaging 与 Vayu Robotics 的创业连接。",
    node: "UCLA Visual Machines Group", stage: "emerging", x: 1090, y: 2000,
    sources: [
      official("UCLA ECE profile — Achuta Kadambi", "https://www.ee.ucla.edu/achuta-kadambi/", "UCLA faculty affiliation and research interests"),
      profile("UCLA Visual Machines people", "https://visual.ee.ucla.edu/people/", "Current title and laboratory members"),
      cv("Achuta Kadambi CV", "https://visual.ee.ucla.edu/assets/kadambi_cv.pdf", "Current rank, academic history and startup roles"),
    ],
  }),

  makePerson({
    id: "rose-yu-us", name: "Rose Yu", role: "Associate Professor of Data Science and CSE", institution: "UCSD",
    area: "Spatiotemporal Machine Learning · AI for Science · Generative Models", tags: ["时空机器学习", "AI for Science", "生成模型", "多模态"],
    summary: "UC San Diego 新生代 AI PI，研究时空机器学习、生成建模与科学智能，覆盖气候、物理系统和多模态数据。",
    node: "UCSD HDSI / AI Group", stage: "emerging", x: 90, y: 2400,
    sources: [
      official("UCSD HDSI profile — Rose Yu", "https://datascience.ucsd.edu/people/rose-yu/", "Current appointment, affiliations and research interests"),
      profile("Rose Yu public homepage", "https://roseyu.com/", "Research programme, publications and group"),
    ],
  }),
  makePerson({
    id: "julian-mcauley-us", name: "Julian McAuley", role: "Professor of Computer Science and Engineering", institution: "UCSD",
    area: "Recommender Systems · Multimodal Learning · Data Mining", tags: ["推荐系统", "多模态", "机器学习", "数据挖掘"],
    summary: "UC San Diego 推荐与多模态学习资深 PI，研究个性化、视觉语言与大规模行为数据；个人主页公开列出当前学生和校友去向。",
    node: "UCSD Recommender Systems Group", stage: "senior", x: 220, y: 2400,
    sources: [
      official("UCSD Jacobs profile — Julian McAuley", "https://jacobs.ucsd.edu/people/profile/julian-mcauley", "Current appointment and research interests"),
      profile("Julian McAuley public homepage", "https://cseweb.ucsd.edu/~jmcauley/", "Current group, research and alumni placements"),
    ],
  }),
];

const feiCv = cv("Olga Russakovsky CV", "https://www.cs.princeton.edu/~olgarus/OlgaRussakovsky_CV.pdf", "Fei-Fei Li doctoral advising and CMU postdoctoral mentorship");
const alexeiPeople = profile("Alexei Efros public homepage", "https://people.eecs.berkeley.edu/~efros/", "Students and postdocs, including James Hays and Ali Farhadi");
const carlProfile = profile("Carl Vondrick public homepage", "https://www.cs.columbia.edu/~vondrick/", "MIT doctoral adviser, students, alumni placements and Apple role");
const devaGroup = profile("Deva Ramanan group homepage", "https://www.cs.cmu.edu/~deva/", "Current group members and alumni placements");
const svetlanaProfile = profile("Svetlana Lazebnik public homepage", "https://slazebni.cs.illinois.edu/", "Students and alumni placements");
const julianProfile = profile("Julian McAuley public homepage", "https://cseweb.ucsd.edu/~jmcauley/", "Current group and alumni placements");

export const usAiCvExpansionRelationships: Relationship[] = [
  { id: "us-ai-fei-olga", from: "fei-fei-li-us", to: "olga-russakovsky-us", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Olga Russakovsky 的公开 CV 将 Fei-Fei Li 列为博士导师。", source: feiCv, verified: true },
  { id: "us-ai-deva-olga", from: "deva-ramanan-us", to: "olga-russakovsky-us", type: "lineage", subtype: "postdoc_mentor", label: "博士后指导", evidence: "Olga Russakovsky 的公开 CV 记录其在 CMU 博士后阶段由 Deva Ramanan 与 Abhinav Gupta 指导。", source: feiCv, verified: true },
  { id: "us-ai-antonio-carl", from: "antonio-torralba-us", to: "carl-vondrick-us", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Carl Vondrick 个人主页写明 MIT 博士由 Antonio Torralba 指导。", source: carlProfile, verified: true },
  { id: "us-ai-alexei-james", from: "alexei-efros-us", to: "james-hays-us", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Georgia Tech 官方简介写明 James Hays 博士阶段由 Alexei Efros 指导。", source: official("Georgia Tech profile — James Hays", "https://www.cc.gatech.edu/people/james-hays", "Doctoral adviser and postdoctoral mentor"), verified: true },
  { id: "us-ai-alexei-ali", from: "alexei-efros-us", to: "ali-farhadi-us", type: "lineage", subtype: "postdoc_mentor", label: "博士后指导", evidence: "Alexei Efros 的公开成员页列 Ali Farhadi 为 2011–2012 博士后，并注明与 Martial Hebert 共同指导。", source: alexeiPeople, verified: true },
];

export const usAiCvExpansionPlacements: StudentPlacement[] = [
  { id: "us-ai-deva-zhiqiu", student: "Zhiqiu Lin", teacherId: "deva-ramanan-us", company: "Moodio", role: "Co-founder", kind: "reported", sector: "startup", graduationYear: 2026, source: devaGroup, verifiedAt: checkedAt },
  { id: "us-ai-deva-neehar", student: "Neehar Peri", teacherId: "deva-ramanan-us", company: "Caltech", role: "Assistant Professor", kind: "first_job", sector: "academia", graduationYear: 2026, source: devaGroup, verifiedAt: checkedAt },
  { id: "us-ai-carl-sachit", student: "Sachit Menon", teacherId: "carl-vondrick-us", company: "Anthropic", role: "Researcher", kind: "first_job", sector: "industry", graduationYear: 2026, source: carlProfile, verifiedAt: checkedAt },
  { id: "us-ai-carl-mia", student: "Mia Chiquier", teacherId: "carl-vondrick-us", company: "Mistral AI", role: "Researcher", kind: "first_job", sector: "industry", graduationYear: 2025, source: carlProfile, verifiedAt: checkedAt },
  { id: "us-ai-svetlana-aiyu", student: "Aiyu Cui", teacherId: "svetlana-lazebnik-us", company: "Amazon", role: "Researcher", kind: "first_job", sector: "industry", graduationYear: 2024, source: svetlanaProfile, verifiedAt: checkedAt },
  { id: "us-ai-svetlana-viraj", student: "Viraj Shah", teacherId: "svetlana-lazebnik-us", company: "Google", role: "Researcher", kind: "first_job", sector: "industry", graduationYear: 2024, source: svetlanaProfile, verifiedAt: checkedAt },
  { id: "us-ai-julian-yupeng", student: "Yupeng Hou", teacherId: "julian-mcauley-us", company: "Google DeepMind", role: "Researcher", kind: "first_job", sector: "industry", graduationYear: 2026, source: julianProfile, verifiedAt: checkedAt },
  { id: "us-ai-julian-yuwang", student: "Yu Wang", teacherId: "julian-mcauley-us", company: "xAI", role: "Researcher", kind: "first_job", sector: "industry", graduationYear: 2025, source: julianProfile, verifiedAt: checkedAt },
];

export const usAiCvExpansionGroupMembers: GroupMember[] = [
  { id: "us-ai-deva-sally", teacherId: "deva-ramanan-us", name: "Sally Chen", role: "PhD Student", focus: "Computer vision", source: devaGroup },
  { id: "us-ai-deva-ava", teacherId: "deva-ramanan-us", name: "Ava Pun", role: "PhD Student", focus: "Computer vision", source: devaGroup },
  { id: "us-ai-carl-arjun", teacherId: "carl-vondrick-us", name: "Arjun Mani", role: "PhD Student", focus: "Vision and multimodal learning", source: carlProfile },
  { id: "us-ai-svetlana-shivansh", teacherId: "svetlana-lazebnik-us", name: "Shivansh Patel", role: "PhD Student", focus: "Vision-language and robotics", source: svetlanaProfile },
  { id: "us-ai-derek-zhen", teacherId: "derek-hoiem-us", name: "Zhen Zhu", role: "PhD Student", focus: "Computer vision", source: profile("Derek Hoiem group", "https://dhoiem.cs.illinois.edu/main.html", "Current group members") },
  { id: "us-ai-zsolt-shivam", teacherId: "zsolt-kira-us", name: "Shivam Aarya", role: "PhD Student", focus: "Robot learning", source: profile("RIPL group members", "https://faculty.cc.gatech.edu/~zk15/group/", "Current group members") },
  { id: "us-ai-julian-yueqi", teacherId: "julian-mcauley-us", name: "Yueqi Wang", role: "PhD Student", focus: "Recommender systems and multimodal learning", source: julianProfile },
  { id: "us-ai-jia-stamatis", teacherId: "jia-deng-us", name: "Stamatis Alexandropoulos", role: "PhD Student", focus: "Computer vision", source: official("Princeton Vision & Learning Lab people", "https://pvl.cs.princeton.edu/people.html", "Current group members") },
];

export const people = usAiCvExpansionPeople;
export const relationships = usAiCvExpansionRelationships;
export const placements = usAiCvExpansionPlacements;
export const groupMembers = usAiCvExpansionGroupMembers;
