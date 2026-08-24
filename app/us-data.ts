import type { GroupMember, IndustryPathway, Person, Region, Relationship, Source, StudentPlacement } from "./data";

const official = (label: string, url: string): Source => ({ label, url, kind: "official" });
const profile = (label: string, url: string): Source => ({ label, url, kind: "profile" });

const stanfordRoster = official("Stanford NLP People", "https://nlp.stanford.edu/people/");
const berkeleyRoster = official("Berkeley NLP Group", "https://nlp.cs.berkeley.edu/members.shtml");
const cmuRoster = official("CMU Language Technologies Institute faculty", "https://www.lti.cs.cmu.edu/people/faculty/index.html");
const uwRoster = official("UW NLP People", "https://nlp.washington.edu/people/");
const mitRoster = official("MIT CSAIL NLP Group", "https://www.csail.mit.edu/research/natural-language-processing-group");
const princetonRoster = official("Princeton NLP Group", "https://nlp.cs.princeton.edu/");
const cornellRoster = official("Cornell NLP People", "https://nlp.cornell.edu/people/");
const nyuRoster = official("NYU NLP faculty", "https://cs.nyu.edu/dynamic/people/faculty/area/Natural%20Language%2C%20Speech%20Processing%2C%20and%20Knowledge%20Representation/?type=22");
const columbiaRoster = official("Columbia NLP People", "https://www.cs.columbia.edu/nlp/people.cgi");
const umassRoster = official("UMass NLP members", "https://nlp.cs.umass.edu/members/");
const jhuRoster = official("Johns Hopkins CLSP faculty", "https://www.clsp.jhu.edu/faculty/");
const utaustinRoster = official("UT Austin NLP faculty", "https://www.cs.utexas.edu/research/areas/natural-language-processing");

function p(
  id: string, name: string, role: string, institution: Person["institution"], area: string, tags: string[],
  stage: Person["stage"], category: Person["category"], summary: string, sources: Source[], x: number, y: number,
): Person {
  return { id, name, role, institution, region: "United States", area, tags, stage, category, summary, sources, x, y, primary: true };
}

export const usPeople: Person[] = [
  // Stanford: Stanford NLP + CRFM + HAI
  p("christopher-manning-us", "Christopher Manning", "Thomas M. Siebel Professor · Director, Stanford AI Lab", "Stanford", "NLP · Deep Learning · Foundation Models", ["NLP", "LLM", "Stanford NLP", "SAIL"], "senior", "core", "Stanford NLP 的核心带头人之一，研究句法、表示学习和基础模型；公开组页同时给出大规模校友职业去向。", [stanfordRoster, official("Stanford CS profile", "https://www.cs.stanford.edu/people/christopher-manning")], 90, 205),
  p("dan-jurafsky-us", "Dan Jurafsky", "Professor of Linguistics and Computer Science", "Stanford", "NLP · Speech · Computational Social Science", ["NLP", "语音", "计算社会科学"], "senior", "core", "连接 NLP、语音、语言学与计算社会科学的资深 PI，Stanford NLP 的共同建设者。", [stanfordRoster], 220, 205),
  p("percy-liang-us", "Percy Liang", "Associate Professor · Director, CRFM", "Stanford", "Foundation Models · Evaluation · AI Policy", ["基础模型", "HELM", "CRFM", "评测"], "senior", "core", "Stanford Center for Research on Foundation Models 创始主任，研究基础模型的建模、评测与社会影响。", [stanfordRoster, official("Stanford CRFM", "https://crfm.stanford.edu/")], 90, 300),
  p("christopher-potts-us", "Christopher Potts", "Professor and Chair of Linguistics", "Stanford", "Computational Semantics · Pragmatics", ["语义", "语用", "NLP"], "senior", "core", "计算语义与语用学资深 PI，是 Stanford NLP 跨语言学与计算机科学结构的重要节点。", [stanfordRoster], 220, 300),
  p("tatsunori-hashimoto-us", "Tatsunori Hashimoto", "Associate Professor", "Stanford", "Foundation Models · Robust ML", ["LLM", "鲁棒性", "数据治理"], "emerging", "core", "研究基础模型训练、鲁棒性与数据治理，并参与 Stanford NLP、SAIL 与 CRFM。", [stanfordRoster], 90, 395),
  p("diyi-yang-us", "Diyi Yang", "Assistant Professor", "Stanford", "Human-centered NLP · Computational Social Science", ["人本 NLP", "计算社会科学", "LLM"], "emerging", "core", "人本 NLP 与计算社会科学独立 PI，关注语言技术、社会交互和负责任 AI。", [stanfordRoster], 220, 395),
  p("yejin-choi-us", "Yejin Choi", "Dieter Schwarz Foundation Professor", "Stanford", "NLP · Commonsense · AI Safety", ["NLP", "常识推理", "AI Safety", "AI2"], "senior", "core", "2025 年加入 Stanford 的资深 NLP 学者，研究常识推理、生成模型与 AI 安全；此前长期任职 UW 与 AI2。", [stanfordRoster, official("Stanford CS NLP faculty", "https://www.cs.stanford.edu/people-cs/faculty-research/natural-language-processing-and-speech")], 90, 490),
  p("dora-demszky-us", "Dora Demszky", "Assistant Professor, Graduate School of Education", "Stanford", "NLP for Education · Human-AI Interaction", ["教育 NLP", "人机协作", "社会影响"], "emerging", "adjacent", "以教育场景中的语言技术和人机协作为主线，是 Stanford NLP 的跨学院关联 PI。", [stanfordRoster], 220, 490),

  // UC Berkeley
  p("dan-klein-us", "Dan Klein", "Professor", "Berkeley", "NLP · Machine Learning", ["NLP", "解析", "语言模型", "导师谱系"], "senior", "core", "Berkeley NLP 资深带头人；公开组页保留完整校友去向，学术谱系延伸到 Stanford、MIT、CMU 与 UT Austin。", [berkeleyRoster], 380, 205),
  p("sewon-min-us", "Sewon Min", "Assistant Professor", "Berkeley", "LLMs · Knowledge · Data", ["LLM", "知识", "数据", "开放模型"], "emerging", "core", "2025 年加入 Berkeley 的新独立 PI，研究大模型的数据使用、知识与开放模型。", [berkeleyRoster], 510, 205),
  p("alane-suhr-us", "Alane Suhr", "Assistant Professor", "Berkeley", "Grounded Language · Embodied AI", ["具身语言", "交互", "多模态"], "emerging", "core", "研究自然语言在交互环境中的落地、具身推理和多模态学习。", [berkeleyRoster], 380, 300),
  p("david-bamman-us", "David Bamman", "Associate Professor", "Berkeley", "NLP · Cultural Analytics", ["NLP", "数字人文", "文化分析"], "senior", "core", "将 NLP 与文化分析、数字人文结合的独立 PI。", [official("Berkeley NLP faculty", "https://nlp.berkeley.edu/people/")], 510, 300),
  p("john-denero-us", "John DeNero", "Professor", "Berkeley", "NLP · Machine Translation · Education", ["NLP", "机器翻译", "教学"], "senior", "core", "Dan Klein 的博士生，后回到 Berkeley 任教；研究 NLP、机器翻译与计算教育。", [berkeleyRoster], 380, 395),
  p("steven-bird-us", "Steven Bird", "Professor", "Berkeley", "Computational Linguistics · Low-resource Languages", ["计算语言学", "低资源语言", "语言资源"], "senior", "adjacent", "长期研究计算语言学、低资源语言与语言资源基础设施。", [official("Berkeley NLP faculty", "https://nlp.berkeley.edu/people/")], 510, 395),

  // Carnegie Mellon LTI
  p("graham-neubig-us", "Graham Neubig", "Associate Professor", "CMU", "NLP · LLMs · Code Intelligence", ["NLP", "LLM", "代码智能", "多语言"], "senior", "core", "NeuLab 负责人，研究多语言 NLP、大模型与代码智能，并通过开放课程和开源软件扩大研究传播。", [cmuRoster, official("CMU Graham Neubig profile", "https://lti.cs.cmu.edu/people/faculty/neubig-graham.html")], 670, 205),
  p("mona-diab-us", "Mona Diab", "Professor · Director, LTI", "CMU", "Multilingual NLP · Responsible AI", ["多语言 NLP", "Responsible AI", "低资源语言"], "senior", "core", "CMU Language Technologies Institute 主任，研究多语言、低资源与负责任语言技术。", [cmuRoster], 800, 205),
  p("yonatan-bisk-us", "Yonatan Bisk", "Assistant Professor", "CMU", "Grounded Language · Embodied AI", ["具身 AI", "多模态", "语言落地"], "emerging", "core", "研究语言与物理世界、机器人和多模态环境之间的落地。", [cmuRoster], 670, 300),
  p("daniel-fried-us", "Daniel Fried", "Assistant Professor", "CMU", "NLP · Agents · Code", ["NLP", "智能体", "代码"], "emerging", "core", "Dan Klein 的博士生，现为 CMU 新一代 NLP PI，研究语言智能体、交互与代码。", [cmuRoster, berkeleyRoster], 800, 300),
  p("akari-asai-us", "Akari Asai", "Assistant Professor (starting Fall 2026)", "CMU", "Retrieval · Multilingual LLMs · Open Models", ["RAG", "多语言", "开放模型", "2026 新 PI"], "emerging", "core", "CMU LTI 官方名录列出的 2026 秋季新 PI，研究检索增强、多语言和开放大模型。", [cmuRoster], 670, 395),
  p("carolyn-rose-us", "Carolyn Rosé", "Professor", "CMU", "Conversational AI · Learning Sciences", ["对话", "学习科学", "计算社会科学"], "senior", "adjacent", "连接对话系统、协作学习与计算社会科学的跨学科资深 PI。", [cmuRoster], 800, 395),

  // University of Washington + AI2
  p("noah-smith-us", "Noah A. Smith", "Professor", "UW", "NLP · Machine Learning · Computational Social Science", ["NLP", "机器学习", "计算社会科学"], "senior", "core", "UW NLP 资深带头人之一，学生与共同指导网络连接 UW、AI2 和多所高校。", [uwRoster], 960, 205),
  p("luke-zettlemoyer-us", "Luke Zettlemoyer", "Professor · Senior Research Director, Meta FAIR", "UW", "NLP · Semantics · Foundation Models", ["NLP", "LLM", "Meta FAIR", "ACL President"], "senior", "core", "UW 教授与 Meta FAIR 高级研究总监；个人主页公开列出博士、博士后及其首份工作。", [uwRoster, profile("Luke Zettlemoyer homepage", "https://homes.cs.washington.edu/~lsz/")], 1090, 205),
  p("hannaneh-hajishirzi-us", "Hanna Hajishirzi", "Professor · Senior Director of AI, AI2", "UW", "Generative AI · Open LLMs · NLP", ["OLMo", "Tulu", "开放模型", "AI2"], "senior", "core", "UW 教授、AI2 AI 高级总监，联合领导 OLMo 与 Tulu；H2Lab 页面公开学生与博士后去向。", [uwRoster, profile("Hanna Hajishirzi homepage", "https://homes.cs.washington.edu/~hannaneh/index.html")], 960, 300),
  p("yulia-tsvetkov-us", "Yulia Tsvetkov", "Associate Professor", "UW", "Multilingual NLP · Responsible AI", ["多语言 NLP", "公平", "社会影响"], "senior", "core", "研究多语言 NLP、模型公平和语言技术的社会影响。", [uwRoster], 1090, 300),
  p("lucy-lu-wang-us", "Lucy Lu Wang", "Assistant Professor", "UW", "Scientific NLP · Information Access", ["科学文献", "NLP", "信息获取"], "emerging", "core", "研究科学文献理解、信息获取和负责任的知识基础设施。", [uwRoster], 960, 395),
  p("tim-althoff-us", "Tim Althoff", "Associate Professor", "UW", "Human-centered AI · Computational Health", ["人本 AI", "健康", "计算社会科学"], "senior", "adjacent", "从人本 AI、计算健康和社会计算切入语言模型应用与评测。", [uwRoster], 1090, 395),

  // MIT
  p("regina-barzilay-us", "Regina Barzilay", "School of Engineering Distinguished Professor for AI and Health", "MIT", "NLP · AI for Health", ["NLP", "AI for Health", "Jameel Clinic"], "senior", "core", "MIT NLP 与 AI for Health 资深 PI，Jameel Clinic AI faculty lead；博士谱系延伸到 Princeton 的 Karthik Narasimhan。", [mitRoster, official("MIT faculty profile", "https://ilp.mit.edu/node/11283")], 90, 805),
  p("jacob-andreas-us", "Jacob Andreas", "Associate Professor", "MIT", "NLP · Language Agents · Grounding", ["NLP", "智能体", "语言落地"], "senior", "core", "Dan Klein 的博士生，研究语言智能体、推理、交互和语言落地。", [mitRoster, official("MIT CSAIL profile", "https://www.csail.mit.edu/person/jacob-andreas")], 220, 805),
  p("yoon-kim-us", "Yoon Kim", "Assistant Professor", "MIT", "NLP · Representation Learning · Efficient Models", ["NLP", "高效模型", "表示学习"], "emerging", "core", "MIT NLP 新一代 PI，研究表示学习、生成模型与高效语言建模。", [mitRoster], 90, 900),

  // Princeton
  p("danqi-chen-us", "Danqi Chen", "Associate Professor · Associate Director, PLI", "Princeton", "NLP · Retrieval · Open LLMs", ["NLP", "RAG", "开放模型", "Thinking Machines"], "senior", "core", "Princeton NLP 共同负责人；Christopher Manning 的博士生。2026 年休假期间任 Thinking Machines Lab Member of Technical Staff。", [princetonRoster, profile("Danqi Chen homepage", "https://www.cs.princeton.edu/~danqic/")], 380, 805),
  p("karthik-narasimhan-us", "Karthik Narasimhan", "Associate Professor · Co-director, Princeton NLP", "Princeton", "Language Agents · Reinforcement Learning", ["智能体", "ReAct", "SWE-agent", "Sierra"], "senior", "core", "Regina Barzilay 的博士生，研究语言智能体与决策；曾任 OpenAI 研究科学家及 Sierra 研究负责人。", [princetonRoster, profile("Karthik Narasimhan homepage", "https://www.cs.princeton.edu/~karthikn/")], 510, 805),

  // Cornell
  p("claire-cardie-us", "Claire Cardie", "Professor", "Cornell", "NLP · Information Extraction · Opinion Mining", ["NLP", "信息抽取", "观点挖掘"], "senior", "core", "Cornell NLP 资深 PI，长期研究信息抽取、意见与论证分析。", [cornellRoster, official("Cornell profile", "https://www.cs.cornell.edu/people/claire-cardie")], 670, 805),
  p("yoav-artzi-us", "Yoav Artzi", "Associate Professor", "Cornell", "Grounded Language · Agents", ["语言落地", "智能体", "语义解析"], "senior", "core", "Luke Zettlemoyer 的博士生，研究语义解析、语言落地和交互式智能体。", [cornellRoster], 800, 805),
  p("cristian-danescu-us", "Cristian Danescu-Niculescu-Mizil", "Associate Professor", "Cornell", "Computational Social Science · NLP", ["计算社会科学", "NLP", "社交互动"], "senior", "core", "研究语言、社会互动和在线社区的计算社会科学 PI。", [cornellRoster], 670, 900),
  p("tanya-goyal-us", "Tanya Goyal", "Assistant Professor", "Cornell", "NLP · Generation · Evaluation", ["文本生成", "评测", "LLM"], "emerging", "core", "曾在 Princeton Language and Intelligence 做博士后，现为 Cornell 新独立 PI，研究生成与评测。", [cornellRoster, profile("Danqi Chen lab alumni", "https://www.cs.princeton.edu/~danqic/lab.html")], 800, 900),
  p("lillian-lee-us", "Lillian Lee", "Professor", "Cornell", "NLP · Social Interaction · Generation", ["NLP", "社会互动", "文本生成"], "senior", "core", "Cornell NLP 资深 PI，研究文本生成、社会互动与语言风格。", [cornellRoster], 670, 995),
  p("sasha-rush-us", "Alexander Rush", "Associate Professor", "Cornell", "NLP · Efficient LLMs · Open Source", ["LLM", "高效训练", "开源", "Hugging Face"], "senior", "core", "研究高效语言模型、结构化预测与开源工具，连接学术研究和开放模型生态。", [cornellRoster, official("Cornell CS faculty", "https://www.cs.cornell.edu/people/faculty")], 800, 995),

  // NYU
  p("samuel-bowman-us", "Samuel Bowman", "Associate Professor · On leave 2025–26", "NYU", "NLP · AI Safety · Evaluation", ["NLP", "AI Safety", "评测", "Anthropic"], "senior", "core", "研究语言模型评测、可靠性与 AI 安全；NYU 名录标注 2025–26 学年休假，Stanford NLP 校友页列其同时与 Anthropic 有联系。", [nyuRoster, stanfordRoster], 960, 805),
  p("kyunghyun-cho-us", "Kyunghyun Cho", "Glen de Vries Chair Professor", "NYU", "Machine Learning · NLP", ["神经机器翻译", "NLP", "生成模型"], "senior", "core", "神经机器翻译与生成模型代表性学者，NYU NLP 与机器学习的重要资深 PI。", [nyuRoster], 1090, 805),
  p("eunsol-choi-us", "Eunsol Choi", "Assistant Professor", "NYU", "NLP · Knowledge · Reasoning", ["NLP", "知识", "推理", "问答"], "emerging", "core", "由 Luke Zettlemoyer 与 Yejin Choi 共同指导，现任 NYU 新独立 PI，研究知识密集型语言理解与推理。", [nyuRoster, profile("Luke Zettlemoyer alumni", "https://homes.cs.washington.edu/~lsz/")], 960, 900),
  p("he-he-us", "He He", "Associate Professor", "NYU", "NLP · Interactive Learning · Responsible AI", ["NLP", "交互学习", "Responsible AI"], "senior", "core", "研究交互式学习、自然语言生成和负责任语言技术。", [nyuRoster], 1090, 900),

  // Columbia
  p("kathleen-mckeown-us", "Kathleen McKeown", "Henry and Gertrude Rothschild Professor", "Columbia", "NLP · Summarization · Generation", ["NLP", "摘要", "生成", "导师谱系"], "senior", "core", "Columbia NLP 资深带头人、Data Science Institute 创始主任；师承网络包括 MIT 的 Regina Barzilay。", [columbiaRoster, profile("Kathleen McKeown CV", "https://www.cs.columbia.edu/~kathy/mckeown-vita.pdf")], 90, 1405),
  p("julia-hirschberg-us", "Julia Hirschberg", "Percy K. and Vida L. W. Hudson Professor", "Columbia", "Speech · NLP · Computational Prosody", ["语音", "NLP", "韵律"], "senior", "core", "语音与语言技术资深 PI，研究计算韵律、对话与可信语音系统。", [columbiaRoster], 220, 1405),
  p("smaranda-muresan-us", "Smaranda Muresan", "Associate Professor, Barnard · Columbia affiliate", "Columbia", "Human-centered NLP · Computational Social Science", ["人本 NLP", "事实核查", "Amazon Scholar"], "senior", "core", "研究人本 NLP、论证与错误信息；现任 Barnard 副教授、Columbia 关联教师及 Amazon Scholar。", [columbiaRoster, profile("Smaranda Muresan homepage", "https://www.cs.columbia.edu/~smara/")], 90, 1500),
  p("zhou-yu-us", "Zhou Yu", "Associate Professor", "Columbia", "Conversational AI · Human-AI Interaction", ["对话系统", "人机交互", "LLM"], "senior", "core", "研究对话系统、社交智能与人机协作。", [columbiaRoster], 220, 1500),
  p("john-hewitt-us", "John Hewitt", "Assistant Professor", "Columbia", "NLP · Interpretability · Representation", ["NLP", "可解释性", "表示学习"], "emerging", "core", "2025 年加入 Columbia 的新独立 PI，研究语言模型表示、结构与可解释性。", [columbiaRoster], 90, 1595),

  // UMass Amherst
  p("andrew-mccallum-us", "Andrew McCallum", "Distinguished Professor", "UMass", "NLP · Information Extraction · Machine Learning", ["NLP", "信息抽取", "机器学习"], "senior", "core", "UMass NLP 与数据科学资深 PI，研究信息抽取、知识库和统计机器学习。", [umassRoster, profile("Andrew McCallum bio", "https://people.cs.umass.edu/~mccallum/bio.html")], 380, 1405),
  p("katrin-erk-us", "Katrin Erk", "Professor", "UMass", "Computational Semantics · NLP", ["计算语义", "词义", "NLP"], "senior", "core", "研究计算语义、词义与上下文表示，连接计算机科学和语言学。", [umassRoster], 510, 1405),
  p("brendan-oconnor-us", "Brendan O'Connor", "Associate Professor", "UMass", "Computational Social Science · NLP", ["计算社会科学", "NLP", "社会因素"], "senior", "core", "研究 NLP 中的社会因素、政治语言与计算社会科学。", [umassRoster], 380, 1500),
  p("mohit-iyyer-us", "Mohit Iyyer", "Adjunct Associate Professor", "UMass", "NLP · Generation · Long-form Text", ["NLP", "文本生成", "叙事", "学生去向"], "senior", "core", "研究文本生成、问答与叙事；公开 CV 记录博士毕业生去向覆盖 Google Gemini、Google DeepMind、NVIDIA 与 Databricks。", [umassRoster, { label: "Mohit Iyyer CV", url: "https://people.cs.umass.edu/~miyyer/data/cv.pdf", kind: "cv" }], 510, 1500),

  // Johns Hopkins CLSP
  p("benjamin-van-durme-us", "Benjamin Van Durme", "Professor · Microsoft Frontier Tuning lead", "JHU", "NLP · Reasoning · AI Safety", ["NLP", "推理", "AI Safety", "Microsoft"], "senior", "core", "JHU 教授、CLSP/HLTCOE 成员，并领导 Microsoft Frontier Tuning 研究团队。", [jhuRoster, profile("Benjamin Van Durme homepage", "https://www.cs.jhu.edu/~vandurme/")], 670, 1405),
  p("jason-eisner-us", "Jason Eisner", "Professor", "JHU", "NLP · Computational Linguistics", ["NLP", "计算语言学", "解析"], "senior", "core", "计算语言学与形式方法资深 PI，长期任职 JHU CLSP。", [jhuRoster], 800, 1405),
  p("philipp-koehn-us", "Philipp Koehn", "Professor", "JHU", "Machine Translation · NLP", ["机器翻译", "NLP", "多语言"], "senior", "core", "机器翻译资深 PI，建设开放翻译工具与大规模多语言研究。", [jhuRoster], 670, 1500),
  p("mark-dredze-us", "Mark Dredze", "John C. Malone Professor", "JHU", "NLP · Computational Health · Responsible AI", ["NLP", "健康", "Responsible AI"], "senior", "adjacent", "连接 NLP、公共健康、社会媒体分析和负责任 AI 的跨领域 PI。", [jhuRoster], 800, 1500),

  // UT Austin
  p("greg-durrett-us", "Greg Durrett", "Associate Professor", "UT Austin", "NLP · Information Extraction · LLMs", ["NLP", "信息抽取", "LLM"], "senior", "core", "Dan Klein 的博士生，研究信息抽取、问答和语言模型推理。", [utaustinRoster, berkeleyRoster], 960, 1405),
  p("raymond-mooney-us", "Raymond Mooney", "Professor", "UT Austin", "Machine Learning · NLP · Robotics", ["NLP", "机器学习", "机器人"], "senior", "core", "UT Austin 机器学习与 NLP 资深 PI，师承网络延伸到新加坡 NUS 的 Hwee Tou Ng。", [utaustinRoster], 1090, 1405),
  p("peter-stone-us", "Peter Stone", "Truchard Foundation Chair Professor", "UT Austin", "Reinforcement Learning · Multi-agent Systems · Robotics", ["强化学习", "多智能体", "机器人"], "senior", "adjacent", "从强化学习、多智能体和机器人切入具身智能与语言智能体相邻研究。", [official("UT Austin AI faculty", "https://www.cs.utexas.edu/research/artificial-intelligence")], 960, 1500),
  p("qiang-liu-us", "Qiang Liu", "Associate Professor", "UT Austin", "Machine Learning · Generative AI", ["机器学习", "生成式 AI", "推断"], "senior", "adjacent", "研究统计机器学习、推断与生成式 AI，属于语言模型方法相邻层。", [official("UT Austin AI faculty", "https://www.cs.utexas.edu/research/artificial-intelligence")], 1090, 1500),
];

export const usRelationships: Relationship[] = [
  { id: "us-klein-liang", from: "dan-klein-us", to: "percy-liang-us", type: "lineage", label: "博士导师", evidence: "Berkeley NLP alumni 页列 Percy Liang 为 PhD '11；其博士导师为 Dan Klein。", source: berkeleyRoster, verified: true },
  { id: "us-klein-andreas", from: "dan-klein-us", to: "jacob-andreas-us", type: "lineage", label: "博士导师", evidence: "Berkeley NLP alumni 页列 Jacob Andreas 为 PhD '18。", source: berkeleyRoster, verified: true },
  { id: "us-klein-durrett", from: "dan-klein-us", to: "greg-durrett-us", type: "lineage", label: "博士导师", evidence: "Berkeley NLP alumni 页列 Greg Durrett 为 PhD '16。", source: berkeleyRoster, verified: true },
  { id: "us-klein-fried", from: "dan-klein-us", to: "daniel-fried-us", type: "lineage", label: "博士导师", evidence: "Berkeley NLP alumni 页列 Daniel Fried 为 PhD '21，现任 CMU 助理教授。", source: berkeleyRoster, verified: true },
  { id: "us-klein-denero", from: "dan-klein-us", to: "john-denero-us", type: "lineage", label: "博士导师", evidence: "Berkeley NLP alumni 页列 John DeNero 为 PhD '10，现任 Berkeley 教授。", source: berkeleyRoster, verified: true },
  { id: "us-manning-chen", from: "christopher-manning-us", to: "danqi-chen-us", type: "lineage", label: "博士导师", evidence: "Danqi Chen 主页明确写明 Stanford 博士由 Christopher Manning 指导。", source: profile("Danqi Chen homepage", "https://www.cs.princeton.edu/~danqic/"), verified: true },
  { id: "us-barzilay-narasimhan", from: "regina-barzilay-us", to: "karthik-narasimhan-us", type: "lineage", label: "博士导师", evidence: "Karthik Narasimhan 主页明确写明 MIT 博士导师为 Regina Barzilay。", source: profile("Karthik Narasimhan homepage", "https://www.cs.princeton.edu/~karthikn/"), verified: true },
  { id: "us-mckeown-barzilay", from: "kathleen-mckeown-us", to: "regina-barzilay-us", type: "lineage", label: "博士导师", evidence: "Columbia MultiGen 项目页将 Regina Barzilay 列为 Kathleen McKeown 项目博士生。", source: official("Columbia MultiGen People", "https://www.cs.columbia.edu/diglib/sumDemo/multiGen/people.html"), verified: true },
  { id: "us-luke-eunsol", from: "luke-zettlemoyer-us", to: "eunsol-choi-us", type: "lineage", label: "共同博士导师", evidence: "Luke Zettlemoyer alumni 页列 Eunsol Choi 为博士生并注明与 Yejin Choi 共同指导。", source: profile("Luke Zettlemoyer alumni", "https://homes.cs.washington.edu/~lsz/"), verified: true },
  { id: "us-yejin-eunsol", from: "yejin-choi-us", to: "eunsol-choi-us", type: "lineage", label: "共同博士导师", evidence: "Luke Zettlemoyer alumni 页注明 Eunsol Choi 由 Luke Zettlemoyer 与 Yejin Choi 共同指导。", source: profile("Luke Zettlemoyer alumni", "https://homes.cs.washington.edu/~lsz/"), verified: true },
  { id: "us-luke-sewon", from: "luke-zettlemoyer-us", to: "sewon-min-us", type: "lineage", label: "共同博士导师", evidence: "Luke Zettlemoyer alumni 页列 Sewon Min 为 2024 博士，并注明与 Hanna Hajishirzi 共同指导。", source: profile("Luke Zettlemoyer alumni", "https://homes.cs.washington.edu/~lsz/"), verified: true },
  { id: "us-hanna-sewon", from: "hannaneh-hajishirzi-us", to: "sewon-min-us", type: "lineage", label: "共同博士导师", evidence: "Hanna Hajishirzi 学生页与 Luke Zettlemoyer alumni 页均注明共同指导 Sewon Min。", source: profile("Hanna Hajishirzi students", "https://homes.cs.washington.edu/~hannaneh/students.html"), verified: true },
  { id: "us-luke-artzi", from: "luke-zettlemoyer-us", to: "yoav-artzi-us", type: "lineage", label: "博士导师", evidence: "Luke Zettlemoyer alumni 页列 Yoav Artzi 为 2015 博士，首份教职为 Cornell。", source: profile("Luke Zettlemoyer alumni", "https://homes.cs.washington.edu/~lsz/"), verified: true },
  { id: "us-chen-goyal", from: "danqi-chen-us", to: "tanya-goyal-us", type: "talent", label: "PLI 博士后 → Cornell", evidence: "Danqi Chen lab 页列 Tanya Goyal 为 2023–24 PLI postdoc，随后任 Cornell 助理教授。", source: profile("Danqi Chen lab", "https://www.cs.princeton.edu/~danqic/lab.html"), verified: true },
  { id: "us-danqi-industry", from: "danqi-chen-us", to: "danqi-chen-us", type: "industry", label: "Thinking Machines Lab · MTS", evidence: "个人主页记录 2026 年休假期间在 Thinking Machines Lab 任 Member of Technical Staff。", source: profile("Danqi Chen homepage", "https://www.cs.princeton.edu/~danqic/"), verified: true },
  { id: "us-karthik-industry", from: "karthik-narasimhan-us", to: "karthik-narasimhan-us", type: "industry", label: "OpenAI / Sierra", evidence: "个人主页记录曾任 OpenAI research scientist 与 Sierra Head of Research。", source: profile("Karthik Narasimhan homepage", "https://www.cs.princeton.edu/~karthikn/"), verified: true },
  { id: "us-luke-meta", from: "luke-zettlemoyer-us", to: "luke-zettlemoyer-us", type: "industry", label: "Meta FAIR Senior Research Director", evidence: "个人主页列明 UW 教授与 Meta FAIR 高级研究总监双重身份。", source: profile("Luke Zettlemoyer homepage", "https://homes.cs.washington.edu/~lsz/"), verified: true },
  { id: "us-hanna-ai2", from: "hannaneh-hajishirzi-us", to: "hannaneh-hajishirzi-us", type: "industry", label: "AI2 Senior Director · OLMo / Tulu", evidence: "个人主页列明其为 AI2 Senior Director 并共同领导 OLMo、Tulu。", source: profile("Hanna Hajishirzi homepage", "https://homes.cs.washington.edu/~hannaneh/index.html"), verified: true },
  { id: "us-smara-amazon", from: "smaranda-muresan-us", to: "smaranda-muresan-us", type: "industry", label: "Amazon Scholar", evidence: "个人主页列明其现任 Amazon Scholar。", source: profile("Smaranda Muresan homepage", "https://www.cs.columbia.edu/~smara/"), verified: true },
  { id: "us-vandurme-microsoft", from: "benjamin-van-durme-us", to: "benjamin-van-durme-us", type: "industry", label: "Microsoft Frontier Tuning team lead", evidence: "个人主页写明其领导 Microsoft Frontier Tuning 研究团队。", source: profile("Benjamin Van Durme homepage", "https://www.cs.jhu.edu/~vandurme/"), verified: true },
];

export const usCoverage = [
  { region: "United States" as Region, institution: "Stanford", core: "7", adjacent: "1", note: "Stanford NLP 当前教授名录；纳入 CRFM、HAI 与教育 NLP 的直接关联层。" },
  { region: "United States" as Region, institution: "Berkeley", core: "5", adjacent: "1", note: "以 Berkeley NLP Group 当前 faculty 为核心，补入同校文化分析与低资源语言方向。" },
  { region: "United States" as Region, institution: "CMU", core: "5", adjacent: "1", note: "聚焦 LTI 当前语言技术 PI；Akari Asai 按官方名录标注为 2026 秋季入职。" },
  { region: "United States" as Region, institution: "UW", core: "5", adjacent: "1", note: "以 UW NLP 当前名录为主，并明确区分 UW、AI2 与 Meta 的联合身份。" },
  { region: "United States" as Region, institution: "MIT", core: "3", adjacent: "0", note: "覆盖 CSAIL NLP Group 的语言技术核心 PI；暂不扩展全校通用 ML。" },
  { region: "United States" as Region, institution: "Princeton", core: "2", adjacent: "0", note: "覆盖 Princeton NLP 两位共同负责人，并记录 2026 年产业休假状态。" },
  { region: "United States" as Region, institution: "Cornell", core: "6", adjacent: "0", note: "依据 Cornell NLP People 收录计算机科学与信息科学中的主要 NLP PI。" },
  { region: "United States" as Region, institution: "NYU", core: "4", adjacent: "0", note: "依据 NYU 官方 NLP faculty 名录；标明 Samuel Bowman 2025–26 休假。" },
  { region: "United States" as Region, institution: "Columbia", core: "5", adjacent: "0", note: "依据 Columbia NLP People；包含 Barnard 任职、Columbia affiliate 的 Smaranda Muresan。" },
  { region: "United States" as Region, institution: "UMass", core: "4", adjacent: "0", note: "依据 UMass NLP members；Mohit Iyyer 依当前组页标为 adjunct affiliate。" },
  { region: "United States" as Region, institution: "JHU", core: "3", adjacent: "1", note: "聚焦 CLSP 中 NLP、机器翻译、推理与计算健康方向。" },
  { region: "United States" as Region, institution: "UT Austin", core: "2", adjacent: "2", note: "聚焦 NLP 核心，并纳入与语言智能体直接相邻的强化学习和生成式 AI。" },
];

export const usCommunities = [
  { region: "United States" as Region, kicker: "NLP + FOUNDATION MODELS", name: "Stanford NLP / CRFM / HAI", anchor: "Christopher Manning · Percy Liang · Yejin Choi · Diyi Yang", description: "从计算语言学和深度学习延伸到基础模型评测、人本 NLP 与 AI 安全。", color: "cobalt" },
  { region: "United States" as Region, kicker: "ACADEMIC LINEAGE", name: "Berkeley NLP lineage", anchor: "Dan Klein → Percy Liang · Jacob Andreas · Greg Durrett · Daniel Fried", description: "一个公开校友页能观察到的跨校谱系，延伸到 Stanford、MIT、CMU、UT Austin 与工业研究团队。", color: "lime" },
  { region: "United States" as Region, kicker: "LANGUAGE TECHNOLOGIES", name: "CMU LTI", anchor: "Mona Diab · Graham Neubig · Yonatan Bisk · Daniel Fried", description: "多语言 NLP、代码智能、语言落地和对话学习在大型语言技术学院内并行发展。", color: "coral" },
  { region: "United States" as Region, kicker: "ACADEMIA + NONPROFIT LABS", name: "UW NLP × AI2 × Meta FAIR", anchor: "Noah Smith · Luke Zettlemoyer · Hanna Hajishirzi · Yulia Tsvetkov", description: "共同指导网络与联合任职把 UW、AI2 的开放模型和 Meta FAIR 连接起来。", color: "violet" },
  { region: "United States" as Region, kicker: "NORTHEAST NETWORK", name: "MIT · Princeton · Cornell · NYU", anchor: "Regina Barzilay → Karthik Narasimhan · Danqi Chen → Tanya Goyal", description: "师承、博士后流动和新 PI 招聘将多所东北部高校连接成高密度网络。", color: "cobalt" },
  { region: "United States" as Region, kicker: "ESTABLISHED CENTERS", name: "Columbia · UMass · JHU · UT Austin", anchor: "Kathleen McKeown · Andrew McCallum · Benjamin Van Durme · Raymond Mooney", description: "老牌 NLP、语言与语音中心持续向计算社会科学、健康、推理和生成式 AI 扩展。", color: "lime" },
];

export const usIndustryPathways: IndustryPathway[] = [
  { id: "us-stanford-crfm", region: "United States", kind: "FOUNDATION MODEL ECOSYSTEM", title: "Stanford NLP ↔ CRFM / HAI", description: "Stanford NLP 与 CRFM、HAI 形成校内基础模型研究、评测和政策接口；图谱将其作为组织连接而非公司雇佣。", source: official("Stanford NLP", "https://nlp.stanford.edu/") },
  { id: "us-uw-meta", region: "United States", kind: "JOINT APPOINTMENT", title: "Luke Zettlemoyer ↔ Meta FAIR", description: "UW 教授与 Meta FAIR Senior Research Director 双重身份，学生去向也集中出现 Meta 与 Google Research。", source: profile("Luke Zettlemoyer homepage", "https://homes.cs.washington.edu/~lsz/") },
  { id: "us-uw-ai2", region: "United States", kind: "UNIVERSITY + NONPROFIT LAB", title: "Hanna Hajishirzi / UW ↔ AI2", description: "Hanna 在 UW 与 AI2 联合领导开放模型研究，H2Lab 校友去向覆盖 Google、Apple、Amazon 与多所高校。", source: profile("Hanna Hajishirzi homepage", "https://homes.cs.washington.edu/~hannaneh/index.html") },
  { id: "us-princeton-danqi", region: "United States", kind: "SABBATICAL INDUSTRY ROLE", title: "Danqi Chen ↔ Thinking Machines Lab", description: "2026 年个人主页记录其从 Princeton 休假，并任 Thinking Machines Lab Member of Technical Staff。", source: profile("Danqi Chen homepage", "https://www.cs.princeton.edu/~danqic/") },
  { id: "us-princeton-karthik", region: "United States", kind: "RESEARCH + STARTUP LEADERSHIP", title: "Karthik Narasimhan ↔ OpenAI / Sierra", description: "个人主页记录其曾任 OpenAI 研究科学家，并在 2023–25 年任 Sierra Head of Research。", source: profile("Karthik Narasimhan homepage", "https://www.cs.princeton.edu/~karthikn/") },
  { id: "us-columbia-amazon", region: "United States", kind: "INDUSTRY SCHOLAR", title: "Smaranda Muresan ↔ Amazon", description: "个人主页列明 Amazon Scholar 联合身份，研究仍以 Barnard / Columbia 的人本 NLP 为核心。", source: profile("Smaranda Muresan homepage", "https://www.cs.columbia.edu/~smara/") },
  { id: "us-jhu-microsoft", region: "United States", kind: "INDUSTRY RESEARCH LEAD", title: "Benjamin Van Durme ↔ Microsoft Frontier Tuning", description: "其 2026 年更新的个人主页写明领导 Microsoft Frontier Tuning 研究团队。", source: profile("Benjamin Van Durme homepage", "https://www.cs.jhu.edu/~vandurme/") },
  { id: "us-umass-pipeline", region: "United States", kind: "STUDENT PIPELINE", title: "UMass NLP → Google Gemini / DeepMind / NVIDIA / Databricks", description: "Mohit Iyyer 的 CV 逐项列出博士毕业生去向，形成可核验的公司反向人才链。", source: { label: "Mohit Iyyer CV", url: "https://people.cs.umass.edu/~miyyer/data/cv.pdf", kind: "cv" } },
];

const danqiLab = profile("Danqi Chen lab alumni", "https://www.cs.princeton.edu/~danqic/lab.html");
const lukeAlumni = profile("Luke Zettlemoyer alumni", "https://homes.cs.washington.edu/~lsz/");
const hannaAlumni = profile("H2Lab alumni", "https://h2lab.cs.washington.edu/members.html");
const mohitCv: Source = { label: "Mohit Iyyer CV", url: "https://people.cs.umass.edu/~miyyer/data/cv.pdf", kind: "cv" };

export const usGroupMembers: GroupMember[] = [
  { id: "us-danqi-gabriel", teacherId: "danqi-chen-us", name: "Gabriel Sarch", role: "PLI Postdoc", focus: "Language models", source: danqiLab },
  { id: "us-danqi-adithya", teacherId: "danqi-chen-us", name: "Adithya Bhaskar", role: "PhD Student", focus: "NLP · LLM", source: danqiLab },
  { id: "us-graham-amanda", teacherId: "graham-neubig-us", name: "Amanda Bertsch", role: "PhD Advisee", focus: "NLP · LLM", source: official("CMU Graham Neubig profile", "https://lti.cs.cmu.edu/people/faculty/neubig-graham.html") },
  { id: "us-hanna-tong", teacherId: "hannaneh-hajishirzi-us", name: "Tong Chen", role: "PhD Student · co-advised with Luke Zettlemoyer", focus: "Open LLMs", source: hannaAlumni },
  { id: "us-klein-charlie", teacherId: "dan-klein-us", name: "Charlie Snell", role: "PhD Student · co-advised with Sergey Levine", focus: "Language models · agents", source: berkeleyRoster },
  { id: "us-luke-weijia", teacherId: "luke-zettlemoyer-us", name: "Weijia Shi", role: "PhD Student · co-advised with Noah Smith", focus: "Language models", source: lukeAlumni },
];

export const usStudentPlacements: StudentPlacement[] = [
  // Dan Klein / Berkeley NLP group alumni
  { id: "us-klein-ruiqi", student: "Ruiqi Zhong", teacherId: "dan-klein-us", company: "Thinking Machines Lab", role: "Member of Technical Staff", kind: "reported", highLevel: true, note: "Berkeley NLP group alumni 页记录；作为组页去向展示。", source: berkeleyRoster },
  { id: "us-klein-eric", student: "Eric Wallace", teacherId: "dan-klein-us", company: "OpenAI", role: "Member of Technical Staff", kind: "reported", highLevel: true, note: "Berkeley NLP group alumni 页记录。", source: berkeleyRoster },
  { id: "us-klein-kevin", student: "Kevin Lin", teacherId: "dan-klein-us", company: "Letta", role: "Member of Technical Staff", kind: "reported", source: berkeleyRoster },
  { id: "us-klein-gaddy", student: "David Gaddy", teacherId: "dan-klein-us", company: "Google", role: "Research Scientist", kind: "reported", source: berkeleyRoster },
  { id: "us-klein-david-hall", student: "David Hall", teacherId: "dan-klein-us", company: "Stanford CRFM", role: "Research Engineering Lead", kind: "reported", highLevel: true, source: berkeleyRoster },
  { id: "us-klein-burkett", student: "David Burkett", teacherId: "dan-klein-us", company: "Microsoft", department: "Semantic Machines", role: "Principal Researcher", kind: "reported", highLevel: true, source: berkeleyRoster },
  { id: "us-klein-dave", student: "Dave Golland", teacherId: "dan-klein-us", company: "LinkedIn", role: "Senior Staff Software Engineer", kind: "reported", source: berkeleyRoster },
  { id: "us-klein-blitzer", student: "John Blitzer", teacherId: "dan-klein-us", company: "Google", role: "Research Scientist", kind: "reported", source: berkeleyRoster },
  { id: "us-klein-aria", student: "Aria Haghighi", teacherId: "dan-klein-us", company: "Twitter", role: "Senior Manager", kind: "reported", highLevel: true, source: berkeleyRoster },
  { id: "us-klein-slav", student: "Slav Petrov", teacherId: "dan-klein-us", company: "Google", role: "Senior Research Director", kind: "reported", highLevel: true, source: berkeleyRoster },

  // Danqi Chen: the lab page gives role-specific placements
  { id: "us-danqi-wettig", student: "Alexander Wettig", teacherId: "danqi-chen-us", company: "Cursor", role: "Technical staff", kind: "first_job", source: danqiLab },
  { id: "us-danqi-gao", student: "Tianyu Gao", teacherId: "danqi-chen-us", company: "Meta TBD", role: "Researcher · incoming UCSD Assistant Professor", kind: "first_job", highLevel: true, source: danqiLab },
  { id: "us-danqi-howard", student: "Howard Chen", teacherId: "danqi-chen-us", company: "Engram", role: "Technical staff", kind: "first_job", note: "与 Karthik Narasimhan 共同指导。", source: danqiLab },
  { id: "us-danqi-mengzhou", student: "Mengzhou Xia", teacherId: "danqi-chen-us", company: "OpenAI", role: "Researcher · incoming CMU MLD Assistant Professor", kind: "first_job", highLevel: true, source: danqiLab },
  { id: "us-danqi-friedman", student: "Dan Friedman", teacherId: "danqi-chen-us", company: "Apple", role: "Researcher", kind: "first_job", source: danqiLab },
  { id: "us-danqi-zhong", student: "Zexuan Zhong", teacherId: "danqi-chen-us", company: "Meta TBD", role: "Researcher", kind: "first_job", source: danqiLab },
  { id: "us-danqi-xinyi", student: "Xinyi Wang", teacherId: "danqi-chen-us", company: "Luma AI", role: "Research Scientist", kind: "reported", source: danqiLab },
  { id: "us-danqi-yong", student: "Yong Lin", teacherId: "danqi-chen-us", company: "Thinking Machines Lab", role: "Technical staff", kind: "reported", source: danqiLab },
  { id: "us-danqi-catherine", student: "Catherine Chen", teacherId: "danqi-chen-us", company: "Abridge", role: "Researcher", kind: "reported", source: danqiLab },
  { id: "us-danqi-alexis", student: "Alexis Chevalier", teacherId: "danqi-chen-us", company: "Cohere", role: "Researcher", kind: "reported", source: danqiLab },
  { id: "us-danqi-jinhyuk", student: "Jinhyuk Lee", teacherId: "danqi-chen-us", company: "Google", role: "Researcher", kind: "reported", source: danqiLab },
  { id: "us-danqi-wuwei", student: "Wuwei Zhang", teacherId: "danqi-chen-us", company: "Snowflake", role: "Engineer", kind: "first_job", source: danqiLab },
  { id: "us-danqi-sabhya", student: "Sabhya Chhabria", teacherId: "danqi-chen-us", company: "Databricks", role: "Engineer", kind: "first_job", source: danqiLab },
  { id: "us-danqi-kevinwang", student: "Kevin Wang", teacherId: "danqi-chen-us", company: "OpenAI", role: "Technical staff", kind: "first_job", source: danqiLab },

  // Luke Zettlemoyer
  { id: "us-luke-suchin", student: "Suchin Gururangan", teacherId: "luke-zettlemoyer-us", company: "Meta", role: "Research Scientist", kind: "first_job", note: "与 Noah Smith 共同指导。", source: lukeAlumni },
  { id: "us-luke-fitzgerald", student: "Nicholas FitzGerald", teacherId: "luke-zettlemoyer-us", company: "Google", department: "Google Research NYC", role: "Researcher", kind: "first_job", source: lukeAlumni },
  { id: "us-luke-garrette", student: "Dan Garrette", teacherId: "luke-zettlemoyer-us", company: "Google", department: "Google Research NYC", role: "Researcher", kind: "reported", source: lukeAlumni },
  { id: "us-luke-luheng", student: "Luheng He", teacherId: "luke-zettlemoyer-us", company: "Google", department: "Google Research Mountain View", role: "Researcher", kind: "first_job", source: lukeAlumni },
  { id: "us-luke-srinivasan", student: "Srinivasan Iyer", teacherId: "luke-zettlemoyer-us", company: "Meta", role: "Research Scientist", kind: "first_job", source: lukeAlumni },
  { id: "us-luke-kenton", student: "Kenton Lee", teacherId: "luke-zettlemoyer-us", company: "Google", department: "Google Research Seattle", role: "Researcher", kind: "first_job", source: lukeAlumni },
  { id: "us-luke-omer", student: "Omer Levy", teacherId: "luke-zettlemoyer-us", company: "Meta", department: "FAIR", role: "Researcher", kind: "reported", source: lukeAlumni },
  { id: "us-luke-mike", student: "Mike Lewis", teacherId: "luke-zettlemoyer-us", company: "Meta", department: "FAIR", role: "Researcher", kind: "reported", source: lukeAlumni },
  { id: "us-luke-victoria", student: "Victoria Lin", teacherId: "luke-zettlemoyer-us", company: "Meta", role: "Research Scientist", kind: "first_job", source: lukeAlumni },
  { id: "us-luke-bhargavi", student: "Bhargavi Paranjape", teacherId: "luke-zettlemoyer-us", company: "Meta", role: "Research Scientist", kind: "first_job", note: "与 Hanna Hajishirzi 共同指导。", source: lukeAlumni },
  { id: "us-luke-clark", student: "Chris Clark", teacherId: "luke-zettlemoyer-us", company: "AI2", role: "Young Investigator", kind: "first_job", source: lukeAlumni },

  // Hanna Hajishirzi / H2Lab
  { id: "us-hanna-ben", student: "Ben Bogin", teacherId: "hannaneh-hajishirzi-us", company: "Google", role: "Research Scientist", kind: "first_job", source: hannaAlumni },
  { id: "us-hanna-qingqing", student: "Qingqing Cao", teacherId: "hannaneh-hajishirzi-us", company: "Apple", role: "Research Scientist", kind: "first_job", source: hannaAlumni },
  { id: "us-hanna-rajarshi", student: "Rajarshi Das", teacherId: "hannaneh-hajishirzi-us", company: "Amazon", role: "Researcher", kind: "first_job", source: hannaAlumni },
  { id: "us-hanna-prithviraj", student: "Prithviraj Ammanabrolu", teacherId: "hannaneh-hajishirzi-us", company: "MosaicML", role: "Gap-year researcher · then UCSD Assistant Professor", kind: "reported", highLevel: true, note: "与 Yejin Choi 共同指导。", source: hannaAlumni },

  // Mohit Iyyer
  { id: "us-mohit-kalpesh", student: "Kalpesh Krishna", teacherId: "mohit-iyyer-us", company: "Google", department: "Gemini", role: "Research Scientist", kind: "current", source: mohitCv },
  { id: "us-mohit-tu", student: "Tu Vu", teacherId: "mohit-iyyer-us", company: "Google", department: "DeepMind", role: "Research Scientist · Virginia Tech Assistant Professor", kind: "current", highLevel: true, source: mohitCv },
  { id: "us-mohit-simeng", student: "Simeng Sun", teacherId: "mohit-iyyer-us", company: "NVIDIA", role: "Research Scientist", kind: "first_job", source: mohitCv },
  { id: "us-mohit-drozdov", student: "Andrew Drozdov", teacherId: "mohit-iyyer-us", company: "Databricks", role: "Research Scientist", kind: "first_job", note: "与 Andrew McCallum 共同指导。", source: mohitCv },

  // Explicit lineage-to-current-role examples
  { id: "us-manning-danqi-placement", student: "Danqi Chen", teacherId: "christopher-manning-us", company: "Thinking Machines Lab", role: "Member of Technical Staff · Princeton Associate Professor", kind: "current", highLevel: true, source: profile("Danqi Chen homepage", "https://www.cs.princeton.edu/~danqic/") },
  { id: "us-regina-karthik-placement", student: "Karthik Narasimhan", teacherId: "regina-barzilay-us", company: "Sierra", department: "Research", role: "Former Head of Research · Princeton Associate Professor", kind: "reported", highLevel: true, source: profile("Karthik Narasimhan homepage", "https://www.cs.princeton.edu/~karthikn/") },
];
