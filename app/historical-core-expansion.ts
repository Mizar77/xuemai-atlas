import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-08-31";

const official = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const sources = {
  zhangBo: official("清华大学计算机系 · 张钹", "https://www.cs.tsinghua.edu.cn/info/1121/3552.htm", "院士身份、清华任职与人工智能研究经历"),
  zhangBoAi: official("清华大学人工智能学院 · 师资队伍", "https://collegeai.tsinghua.edu.cn/rydw.htm", "张钹作为人工智能学院名誉院长的当前机构连接"),
  luRuqian: official("中国科学院计算技术研究所 · 陆汝钤", "https://www.ict.cas.cn/sourcedb/cn/jssrck/200909/t20090917_2496684.html", "知识工程、人工智能与科学院任职经历"),
  luRuqianFudan: official("复旦大学 IIPL · 实验室沿革", "https://iipl.fudan.edu.cn/_t3359/29153/list.htm", "陆汝钤与复旦智能信息处理实验室的历史连接"),
  shiZhongzhi: official("中国科学院大学 · 史忠植", "https://people.ucas.ac.cn/~0012883", "人工智能、机器学习与智能科学研究履历"),
  shiLab: official("中国科学院智能科学实验室 · 关于我们", "https://www.intsci.ac.cn/gywm/", "史忠植与智能科学实验室的组织谱系"),
  liDeyi: official("上海大学 · 李德毅", "https://www.shu.edu.cn/info/1607/75500.htm", "中国工程院院士身份、人工智能与认知研究方向"),
  liDeyiSeu: official("东南大学 · 李德毅", "https://www.seu.edu.cn/2016/0303/c154a146539/page.htm", "学术经历与云模型、智能驾驶研究贡献"),
  huangChangning: official("清华大学计算机系 · 自然语言处理研究历史", "https://www.cs.tsinghua.edu.cn/info/1088/2958.htm", "黄昌宁在清华中文信息处理与计算语言学发展中的作用"),
  huangChangningCips: official("中国中文信息学会 · 计算语言学专业委员会", "https://cips-cl.org/?page_id=87296", "中国计算语言学共同体的历史组织连接"),
  wuWenjun: official("中国科学院学部 · 吴文俊", "https://casad.cas.cn/ysxx2022/ygys/200906/t20090624_1791995.html", "院士身份、数学机械化与自动推理贡献"),
  wuWenjunAmss: official("中国科学院数学与系统科学研究院 · 吴文俊", "https://amss.cas.cn/ryszl/wwj/202106/t20210618_6114096.html", "数学机械化研究纲领与机构谱系"),
  gaoXiaoshan: official("中国科学院数学与系统科学研究院 · 高小山", "https://iss.amss.cas.cn/gb2019/zsds/sx/ds/201901/t20190128_637590.html", "高小山的现任研究员与博士生导师身份、自动推理研究方向"),
  gaoXiaoshanRoster: official("中国科学院数学与系统科学研究院 · 研究人员名录", "https://amss.cas.cn/rcjy/yjy/", "高小山仍列于研究院现任研究人员名录"),
  wuGaoLineage: official("中国科学院数学与系统科学研究院 · 追忆吴文俊", "https://www.amss.cas.cn/wwj/sp/201905/t20190510_5291782.html", "高小山回忆在吴文俊指导下进入研究生阶段并开展数学机械化研究"),
  zhangBoZhuJun: official("清华大学计算机系 · 朱军", "https://www.cs.tsinghua.edu.cn/info/1034/1848.htm", "清华官方页面明确列出朱军的导师为张钹院士"),

  mccarthy: official("Stanford CS · John McCarthy memoriam", "https://legacy.cs.stanford.edu/memoriam/professor-john-mccarthy", "人工智能术语、LISP 与 Stanford AI Lab 的奠基贡献"),
  mccarthyEngineering: official("Stanford Engineering · John McCarthy", "https://engineering.stanford.edu/news/stanfords-john-mccarthy-seminal-figure-artificial-intelligence-dead-84", "Dartmouth、LISP、分时系统与 Stanford 任职历史"),
  minsky: official("MIT News · Marvin Minsky", "https://news.mit.edu/2016/marvin-minsky-obituary-0125", "MIT AI Laboratory 共同创办人与人工智能奠基贡献"),
  minskyMit: official("MIT · Marvin Minsky archive", "https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/minsky.html", "研究主题、MIT 任职与学术档案"),
  cmuAiHistory: official("Carnegie Mellon · History of AI", "https://ai.cmu.edu/research-and-policy-impact/history-of-ai-at-cmu", "Newell、Simon、Reddy 与 CMU 人工智能传统"),
  newell: official("Carnegie Mellon Libraries · Allen Newell Collection", "https://digitalcollections.library.cmu.edu/cmu-collection/allen-newell", "Allen Newell 的研究档案、Logic Theorist 与认知架构贡献"),
  simon: official("Carnegie Mellon · Herbert A. Simon biography", "https://www.cs.cmu.edu/simon/bio.html", "Simon 的 CMU 任职、AI 与认知科学贡献"),
  simonFounder: official("Carnegie Mellon · Herbert Simon founder story", "https://www.cmu.edu/50/founder-stories/story-simon.html", "Simon 与 Newell、Feigenbaum的导师和研究团队谱系"),
  feigenbaum: official("Stanford Engineering · Edward Feigenbaum", "https://engineering.stanford.edu/people/edward-feigenbaum", "专家系统、Knowledge Systems Laboratory 与 Stanford 任职"),
  feigenbaumCmu: official("Carnegie Mellon · Edward Feigenbaum biography", "https://www.cs.cmu.edu/~raj-symposium/feigenbaum.html", "Feigenbaum 在 Herbert Simon 指导下完成博士研究"),
  reddy: official("Carnegie Mellon CSD · Raj Reddy", "https://www.csd.cs.cmu.edu/people/faculty/raj-reddy", "语音识别、机器人研究与 CMU 领导经历"),
  reddyTuring: official("Raj Reddy · Turing Award lecture", "https://www.rr.cs.cmu.edu/turing.htm", "Raj Reddy 明确称 John McCarthy 为博士论文导师"),
  pearl: official("UCLA Samueli · Judea Pearl", "https://samueli.ucla.edu/people/judea-pearl/", "因果推断、贝叶斯网络与 UCLA 任职"),
  pearlAward: official("UCLA CS · Judea Pearl emeritus award", "https://www.cs.ucla.edu/judea-pearl-wins-ucla-edward-a-dickson-emeritus-professorship-award/", "荣休身份与持续学术影响"),
  kanade: official("CMU Robotics Institute · Takeo Kanade", "https://www.ri.cmu.edu/ri-faculty/takeo-kanade/", "计算机视觉、机器人与 Robotics Institute 任职"),
  kanadeAward: official("CMU CSD · Takeo Kanade award", "https://www.csd.cs.cmu.edu/news/kanade-receives-bbva-foundation-frontiers-of-knowledge-award-for-computer-vision-legacy", "计算机视觉领域的长期奠基影响"),
  bajcsy: official("Berkeley EECS · Ruzena Bajcsy", "https://www2.eecs.berkeley.edu/Faculty/Homepages/bajcsy.html", "机器人、主动感知与 Berkeley 任职"),
  bajcsyHome: official("Berkeley · Ruzena Bajcsy homepage", "https://people.eecs.berkeley.edu/~bajcsy/", "研究主题与学术履历"),
  thomasHuang: official("Beckman Institute · Remembering Thomas Huang", "https://beckman.illinois.edu/news/article/2020/04/27/remembering-thomas-huang-inaugural-beckman-institute-faculty-member", "图像处理、计算机视觉与 Illinois 学术谱系"),
  thomasHuangSymposium: official("Beckman Institute · Thomas Huang Symposium", "https://huang-symposium.beckman.illinois.edu/", "Thomas Huang 的学生、合作网络与领域影响"),
  thomasHuangYan: official("Illinois ECE · Thomas and Margaret Huang Fellowship", "https://ece.illinois.edu/news/huang-fellowship-established", "Illinois 官方页面将颜水成列为 Thomas Huang 研究组的博士后校友（2007）"),
  winograd: official("Stanford Profiles · Terry Winograd", "https://profiles.stanford.edu/terry-winograd", "Stanford 任职、自然语言理解与人机交互研究"),
  winogradHai: official("Stanford HAI · Terry Winograd", "https://hai.stanford.edu/people/terry-winograd", "AI、HCI 与 Stanford HAI 的持续连接"),

  michie: official("University of Edinburgh · Donald Michie archive", "https://www.aiai.ed.ac.uk/~dm/dm.html", "机器学习、人工智能与 Edinburgh 学术历史"),
  michieCv: official("University of Edinburgh · Donald Michie CV", "https://www.aiai.ed.ac.uk/~dm/dmcv.html", "任职、研究项目与机器学习贡献"),
  sparckJones: official("University of Cambridge · Karen Spärck Jones obituary", "https://www.cl.cam.ac.uk/misc/obituaries/sparck-jones/", "信息检索、NLP 与 Cambridge 任职历史"),
  sparckJonesCv: official("University of Cambridge · Karen Spärck Jones CV", "https://www.cl.cam.ac.uk/misc/obituaries/sparck-jones/cv.html", "CLRU 经历、研究主题与学术荣誉"),
  masterman: official("University of Cambridge · Women philosophers", "https://www.phil.cam.ac.uk/aboutus/women-philosophers", "Margaret Masterman、CLRU 与机器翻译研究"),
  mastermanLink: official("University of Cambridge · Karen Spärck Jones obituary", "https://www.cl.cam.ac.uk/misc/obituaries/sparck-jones/", "Karen Spärck Jones 在 Masterman 创办的 CLRU 工作的共同体连接"),
  wilks: official("Oxford Internet Institute · Yorick Wilks", "https://www.oii.ox.ac.uk/people/profiles/yorick-wilks/", "自然语言语义、AI 与 Oxford/Sheffield 学术履历"),
  wilksMemorial: official("Oxford Internet Institute · In memory of Yorick Wilks", "https://www.oii.ox.ac.uk/in-memory-of-professor-yorick-wilks/", "自然语言处理领域的历史影响"),

  levesque: official("University of Toronto · Hector Levesque", "https://www.cs.utoronto.ca/~hector/", "知识表示、认知机器人与 Toronto 任职"),
  levesqueAward: official("University of Toronto · Hector Levesque Newell Award", "https://www.utoronto.ca/celebrates/hector-levesque-receives-2020-allen-newell-award", "荣休身份与知识表示领域贡献"),
  mackworth: official("UBC Computer Science · Alan Mackworth", "https://www.cs.ubc.ca/people/alan-mackworth", "约束推理、机器人与 UBC 任职"),
  mackworthExpert: official("UBC News · Alan Mackworth", "https://news.ubc.ca/expert/alan-mackworth/", "人工智能、机器人与机构公共档案"),
  mylopoulos: official("University of Toronto · John Mylopoulos", "https://www.cs.utoronto.ca/~jm/", "概念建模、需求工程与人工智能研究"),
  mylopoulosEmeritus: official("University of Toronto Governing Council · emeritus appointments", "https://governingcouncil.utoronto.ca/media/16248", "John Mylopoulos 的 Professor Emeritus 身份"),
};

type HistoricalPerson = Omit<Person, "stage" | "category" | "primary" | "status" | "lastVerifiedAt" | "facts"> & {
  legacy: string;
  current?: boolean;
  deceased?: boolean;
  sources: [Source, Source, ...Source[]];
};

const historical = ({ legacy, current = false, deceased = false, ...person }: HistoricalPerson): Person => ({
  ...person,
  stage: current ? "senior" : "historical",
  category: current ? "core" : "historical",
  primary: current,
  status: current ? "在职资深 PI" : deceased || /\(\d{4}[–-]\d{4}\)/.test(person.role) ? "已故 · 通过师承关系展示" : "荣休或非现任 · 通过师承关系展示",
  lastVerifiedAt: checkedAt,
  tags: Array.from(new Set(["奠基性影响", ...person.tags])),
  facts: [
    { label: "学术影响", value: legacy, source: person.sources[0] },
    { label: "研究主线", value: person.area, source: person.sources[0] },
    { label: current ? "当前状态" : "图谱呈现", value: current ? "官方机构页面仍列为在职教授或博士生导师，因此计入当前 PI 名录。" : "仅在有公开师承证据时作为上游人物连接到后续学者，不单列为当前 PI。", source: person.sources[1] },
  ],
});

export const historicalCorePeople: Person[] = [
  historical({ id: "bo-zhang-thu-historical", name: "张钹", role: "中国科学院院士 · 清华大学教授", institution: "THU", region: "Mainland China", area: "Artificial Intelligence · Pattern Recognition", tags: ["人工智能", "模式识别", "清华 AI"], summary: "中国人工智能研究与人才培养的重要奠基者，长期连接清华计算机系、智能技术与系统方向和新一代人工智能学院。", legacy: "中国人工智能研究与教育的奠基型学者之一。", current: true, sources: [sources.zhangBo, sources.zhangBoAi], x: 118, y: 110 }),
  historical({ id: "ruqian-lu-historical", name: "陆汝钤", role: "中国科学院院士 · 研究员", institution: "Award Network", actualInstitution: "中国科学院计算技术研究所 / 复旦大学", region: "Mainland China", area: "Knowledge Engineering · Artificial Intelligence", tags: ["知识工程", "人工智能", "智能信息处理"], summary: "知识工程与人工智能资深学者，其机构轨迹连接中科院计算所与复旦智能信息处理研究共同体。", legacy: "中国知识工程与人工智能研究的早期开拓者。", sources: [sources.luRuqian, sources.luRuqianFudan], x: 275, y: 105 }),
  historical({ id: "zhongzhi-shi-historical", name: "史忠植", role: "研究员 · 博士生导师", institution: "Award Network", actualInstitution: "中国科学院计算技术研究所", region: "Mainland China", area: "Artificial Intelligence · Machine Learning · Intelligent Science", tags: ["智能科学", "机器学习", "知识工程"], summary: "长期从事人工智能、机器学习与智能科学研究，是中科院智能科学研究组织谱系的重要资深学者。", legacy: "中国智能科学与人工智能研究共同体的资深组织者。", current: true, sources: [sources.shiZhongzhi, sources.shiLab], x: 432, y: 105 }),
  historical({ id: "deyi-li-historical", name: "李德毅", role: "中国工程院院士", institution: "Award Network", actualInstitution: "中国人民解放军军事科学院", region: "Mainland China", area: "Artificial Intelligence · Cognitive Computing · Autonomous Driving", tags: ["云模型", "认知计算", "智能驾驶"], summary: "围绕云模型、认知计算与自主智能形成持续研究影响，并连接高校、学会与智能驾驶产业实践。", legacy: "中国人工智能工程化与认知计算方向的代表性资深节点。", sources: [sources.liDeyi, sources.liDeyiSeu], x: 589, y: 105 }),
  historical({ id: "changning-huang-thu-historical", name: "黄昌宁", role: "教授 · 中国计算语言学先驱", institution: "THU", region: "Mainland China", area: "Computational Linguistics · Chinese Information Processing", tags: ["计算语言学", "中文信息处理", "NLP 历史"], summary: "清华中文信息处理与中国计算语言学发展史上的关键人物，适合作为当前 NLP 师承与研究共同体的上游节点。", legacy: "中国计算语言学与中文信息处理的奠基型学者。", deceased: true, sources: [sources.huangChangning, sources.huangChangningCips], x: 746, y: 110 }),
  historical({ id: "wenjun-wu-historical", name: "吴文俊", role: "中国科学院院士 · 数学家", institution: "Award Network", actualInstitution: "中国科学院数学与系统科学研究院", region: "Mainland China", area: "Automated Reasoning · Mathematics Mechanization", tags: ["自动推理", "数学机械化", "机器证明"], summary: "以吴方法和数学机械化推动自动定理证明，是连接数学基础、符号推理与中国人工智能史的重要节点。", legacy: "数学机械化与自动推理的奠基型学者。", deceased: true, sources: [sources.wuWenjun, sources.wuWenjunAmss], x: 903, y: 105 }),
  historical({ id: "gao-xiaoshan-amss", name: "高小山", role: "研究员 · 博士生导师", institution: "Award Network", actualInstitution: "中国科学院数学与系统科学研究院", region: "Mainland China", area: "Automated Reasoning · Symbolic Computation · Mathematics Mechanization", tags: ["自动推理", "符号计算", "数学机械化"], summary: "研究自动推理、符号计算与数学机械化；其研究生阶段师从吴文俊，是数学机械化谱系连接当前 AI 基础研究的重要节点。", legacy: "吴文俊数学机械化研究谱系中的现任研究员与博士生导师。", current: true, sources: [sources.gaoXiaoshan, sources.gaoXiaoshanRoster, sources.wuGaoLineage], x: 1040, y: 105 }),

  historical({ id: "john-mccarthy-historical", name: "John McCarthy", role: "Professor Emeritus (1927–2011)", institution: "Stanford", region: "United States", area: "Artificial Intelligence · Lisp · Automated Reasoning", tags: ["Dartmouth", "Lisp", "SAIL"], summary: "提出“artificial intelligence”这一名称、创制 Lisp，并在 Stanford 建立早期 AI 研究传统。", legacy: "现代人工智能学科的核心奠基者。", sources: [sources.mccarthy, sources.mccarthyEngineering], x: 115, y: 105 }),
  historical({ id: "marvin-minsky-historical", name: "Marvin Minsky", role: "MIT Professor (1927–2016)", institution: "MIT", region: "United States", area: "Artificial Intelligence · Cognitive Science", tags: ["MIT AI Lab", "认知科学", "AI 历史"], summary: "MIT Artificial Intelligence Laboratory 共同创办人，研究跨越知识表示、认知与机器智能。", legacy: "MIT 人工智能传统的奠基者之一。", sources: [sources.minsky, sources.minskyMit], x: 260, y: 105 }),
  historical({ id: "allen-newell-historical", name: "Allen Newell", role: "CMU Professor (1927–1992)", institution: "CMU", region: "United States", area: "Artificial Intelligence · Cognitive Architecture", tags: ["Logic Theorist", "Soar", "认知架构"], summary: "与 Herbert Simon 共同发展 Logic Theorist、General Problem Solver，并推动统一认知理论与 Soar。", legacy: "符号人工智能与认知架构的奠基者。", sources: [sources.newell, sources.cmuAiHistory], x: 405, y: 105 }),
  historical({ id: "herbert-simon-historical", name: "Herbert A. Simon", role: "CMU Professor (1916–2001)", institution: "CMU", region: "United States", area: "Artificial Intelligence · Decision Science · Cognitive Science", tags: ["Logic Theorist", "决策科学", "CMU AI"], summary: "把人工智能、认知科学和决策研究连接起来，并形成 Newell、Feigenbaum 等重要学术谱系。", legacy: "AI、认知科学与决策科学的跨学科奠基者。", sources: [sources.simon, sources.simonFounder], x: 550, y: 105 }),
  historical({ id: "edward-feigenbaum-historical", name: "Edward Feigenbaum", role: "Professor Emeritus", institution: "Stanford", region: "United States", area: "Expert Systems · Knowledge Engineering", tags: ["专家系统", "知识工程", "Stanford"], summary: "专家系统与知识工程的核心奠基者，在 Stanford 建立 Knowledge Systems Laboratory 传统。", legacy: "专家系统和知识工程的代表性奠基者。", sources: [sources.feigenbaum, sources.feigenbaumCmu], x: 695, y: 105 }),
  historical({ id: "raj-reddy-historical", name: "Raj Reddy", role: "University Professor Emeritus", institution: "CMU", region: "United States", area: "Speech Recognition · Robotics · Artificial Intelligence", tags: ["语音识别", "机器人", "CMU"], summary: "语音识别与机器人研究先驱，长期塑造 CMU 计算机科学与 Robotics Institute 的研究生态。", legacy: "语音人工智能与机器人研究的奠基型学者。", sources: [sources.reddy, sources.reddyTuring], x: 840, y: 105 }),
  historical({ id: "judea-pearl-historical", name: "Judea Pearl", role: "Professor Emeritus", institution: "UCLA", region: "United States", area: "Causal Inference · Bayesian Networks", tags: ["因果推断", "贝叶斯网络", "AI Foundations"], summary: "以贝叶斯网络和因果推断重塑 AI 的不确定性推理方法，是当前因果机器学习谱系的重要上游节点。", legacy: "概率推理与因果推断的奠基者。", sources: [sources.pearl, sources.pearlAward], x: 985, y: 105 }),
  historical({ id: "takeo-kanade-historical", name: "Takeo Kanade", role: "U.A. and Helen Whitaker University Professor", institution: "CMU", region: "United States", area: "Computer Vision · Robotics", tags: ["计算机视觉", "机器人", "CMU RI"], summary: "在视觉跟踪、三维视觉、自动驾驶和机器人领域形成长期技术与人才影响。", legacy: "现代计算机视觉与机器人研究的奠基型学者。", current: true, sources: [sources.kanade, sources.kanadeAward], x: 1130, y: 105 }),
  historical({ id: "ruzena-bajcsy-historical", name: "Ruzena Bajcsy", role: "Professor Emerita", institution: "Berkeley", region: "United States", area: "Robotics · Computer Vision · Active Perception", tags: ["主动感知", "机器人", "Berkeley"], summary: "主动感知、机器人与计算机视觉先驱，研究轨迹连接 Penn GRASP、NSF 与 Berkeley。", legacy: "主动感知和机器人视觉的奠基型学者。", sources: [sources.bajcsy, sources.bajcsyHome], x: 1275, y: 105 }),
  historical({ id: "thomas-huang-historical", name: "Thomas S. Huang", role: "UIUC Professor (1936–2020)", institution: "UIUC", region: "United States", area: "Image Processing · Computer Vision · Multimodal Signal Processing", tags: ["图像处理", "计算机视觉", "人才谱系"], summary: "图像处理、计算机视觉和多模态信号研究的资深学者，其广泛学生网络影响北美与亚洲多个院校。", legacy: "图像处理与计算机视觉人才谱系的关键上游节点。", sources: [sources.thomasHuang, sources.thomasHuangSymposium], x: 1420, y: 105 }),
  historical({ id: "terry-winograd-historical", name: "Terry Winograd", role: "Professor Emeritus", institution: "Stanford", region: "United States", area: "Natural Language Understanding · Human-Computer Interaction", tags: ["SHRDLU", "NLP 历史", "HCI"], summary: "早期自然语言理解系统 SHRDLU 的代表人物，后续把研究拓展到人机交互与以人为本的技术设计。", legacy: "自然语言理解与人机交互之间的桥梁型历史节点。", sources: [sources.winograd, sources.winogradHai], x: 1565, y: 105 }),

  historical({ id: "donald-michie-historical", name: "Donald Michie", role: "University of Edinburgh Professor (1923–2007)", institution: "Edinburgh", region: "Europe", area: "Machine Learning · Artificial Intelligence", tags: ["机器学习", "Edinburgh AI", "AI 历史"], summary: "英国早期人工智能与机器学习研究的重要组织者，连接 Edinburgh 的 AI 研究机构与欧洲机器智能传统。", legacy: "英国人工智能与机器学习研究的早期奠基者。", sources: [sources.michie, sources.michieCv], x: 115, y: 105 }),
  historical({ id: "karen-sparck-jones-historical", name: "Karen Spärck Jones", role: "Cambridge Professor (1935–2007)", institution: "Cambridge", region: "Europe", area: "Information Retrieval · Natural Language Processing", tags: ["信息检索", "IDF", "NLP 历史"], summary: "信息检索和自然语言处理先驱，其统计词项权重与检索思想持续影响搜索和现代语言技术。", legacy: "信息检索与统计 NLP 的奠基型学者。", sources: [sources.sparckJones, sources.sparckJonesCv], x: 370, y: 105 }),
  historical({ id: "margaret-masterman-historical", name: "Margaret Masterman", role: "Founder, Cambridge Language Research Unit (1910–1986)", institution: "Cambridge", region: "Europe", area: "Machine Translation · Computational Linguistics", tags: ["CLRU", "机器翻译", "计算语言学"], summary: "创办 Cambridge Language Research Unit，推动机器翻译、语义与早期计算语言学研究共同体形成。", legacy: "英国机器翻译与计算语言学研究的组织奠基者。", sources: [sources.masterman, sources.mastermanLink], x: 625, y: 105 }),
  historical({ id: "yorick-wilks-historical", name: "Yorick Wilks", role: "Professor Emeritus (1939–2023)", institution: "Oxford", actualInstitution: "University of Sheffield / Oxford Internet Institute", region: "Europe", area: "Natural Language Semantics · Artificial Intelligence", tags: ["NLP", "语义", "Sheffield"], summary: "自然语言语义与人工智能资深学者，长期连接 Cambridge、Sheffield 与 Oxford 的语言技术传统。", legacy: "自然语言语义与知识驱动 NLP 的资深历史节点。", sources: [sources.wilks, sources.wilksMemorial], x: 880, y: 105 }),

  historical({ id: "hector-levesque-historical", name: "Hector Levesque", role: "Professor Emeritus", institution: "U of Toronto", region: "Canada", area: "Knowledge Representation · Cognitive Robotics", tags: ["知识表示", "认知机器人", "Winograd Schema"], summary: "知识表示、常识推理和认知机器人研究的代表性学者，是 Toronto 符号 AI 传统的重要节点。", legacy: "知识表示与常识推理的奠基型学者。", sources: [sources.levesque, sources.levesqueAward], x: 125, y: 105 }),
  historical({ id: "alan-mackworth-historical", name: "Alan Mackworth", role: "Professor Emeritus", institution: "UBC", region: "Canada", area: "Constraint Reasoning · Robotics · Computer Vision", tags: ["约束推理", "机器人", "计算机视觉"], summary: "约束推理、机器人与视觉研究先驱，也长期参与加拿大人工智能研究共同体建设。", legacy: "加拿大约束推理与机器人研究的奠基型学者。", sources: [sources.mackworth, sources.mackworthExpert], x: 425, y: 105 }),
  historical({ id: "john-mylopoulos-historical", name: "John Mylopoulos", role: "Professor Emeritus", institution: "U of Toronto", region: "Canada", area: "Conceptual Modeling · Requirements Engineering · Artificial Intelligence", tags: ["概念建模", "需求工程", "知识表示"], summary: "把知识表示思想带入概念建模和需求工程，是 Toronto AI 与软件工程交叉谱系的资深节点。", legacy: "概念建模和需求工程的奠基型学者。", sources: [sources.mylopoulos, sources.mylopoulosEmeritus], x: 725, y: 105 }),
];

export const historicalCoreRelationships: Relationship[] = [
  { id: "zhang-bo-zhu-jun-lineage", from: "bo-zhang-thu-historical", to: "jun-zhu-thu", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "清华大学计算机系朱军页面明确列出其导师为张钹院士。", source: sources.zhangBoZhuJun, verified: true },
  { id: "wu-wenjun-gao-xiaoshan-lineage", from: "wenjun-wu-historical", to: "gao-xiaoshan-amss", type: "lineage", subtype: "phd_adviser", label: "研究生导师", evidence: "高小山在中国科学院数学与系统科学研究院的追忆材料中写明，自己在吴文俊指导下进入研究生阶段并开展数学机械化研究。", source: sources.wuGaoLineage, verified: true },
  { id: "thomas-huang-shuicheng-yan-lineage", from: "thomas-huang-historical", to: "shuicheng-yan-nus", type: "lineage", subtype: "postdoc_mentor", label: "博士后指导", evidence: "Illinois ECE 的 Thomas Huang 纪念奖学金页面将 Shuicheng Yan 列为 Thomas Huang 研究组的博士后校友（2007）。", source: sources.thomasHuangYan, verified: true },
  { id: "simon-newell-historical", from: "herbert-simon-historical", to: "allen-newell-historical", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "CMU 的 Herbert Simon 机构史料记录 Allen Newell 加入 Simon 的研究团队并作为其博士生开展研究。", source: sources.simonFounder, verified: true },
  { id: "simon-feigenbaum-historical", from: "herbert-simon-historical", to: "edward-feigenbaum-historical", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "CMU 的 Edward Feigenbaum 传记记录其在 Herbert Simon 指导下完成博士研究。", source: sources.feigenbaumCmu, verified: true },
  { id: "mccarthy-reddy-historical", from: "john-mccarthy-historical", to: "raj-reddy-historical", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Raj Reddy 的官方 Turing Award 讲稿明确称 John McCarthy 为其 thesis advisor。", source: sources.reddyTuring, verified: true },
  { id: "masterman-sparck-jones-historical", from: "margaret-masterman-historical", to: "karen-sparck-jones-historical", type: "talent", subtype: "other", label: "CLRU 学术共同体", evidence: "Cambridge 史料记录 Karen Spärck Jones 曾在 Margaret Masterman 创办的 Cambridge Language Research Unit 工作；此处仅表示机构共同体连接，不推断博士师承。", source: sources.mastermanLink, verified: true },
];
