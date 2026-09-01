import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

type PersonEnhancement = Partial<Pick<Person, "summary" | "tags" | "facts" | "sources" | "lastVerifiedAt" | "status" | "knownAlumniCount">>;

const checkedAt = "2026-08-28";
const src = (label: string, url: string, supports: string, kind: Source["kind"] = "profile"): Source => ({ label, url, kind, checkedAt, supports });
const enhance = (source: Source, summary: string, tags: string[], facts: [string, string][]): PersonEnhancement => ({
  summary, tags, facts: facts.map(([label, value]) => ({ label, value, source })), sources: [source], lastVerifiedAt: checkedAt,
});

const manning = src("Christopher Manning homepage", "https://nlp.stanford.edu/~manning/", "education, Stanford appointment, research and lab leadership");
const liang = src("Percy Liang homepage", "https://cs.stanford.edu/~pliang/", "education, faculty trajectory, CRFM and foundation-model research");
const potts = src("Christopher Potts homepage", "https://web.stanford.edu/~cgpotts/", "education, Stanford roles and computational semantics research");
const hashimoto = src("Tatsunori Hashimoto homepage", "https://thashim.github.io/", "education, Stanford postdoctoral mentors and appointment, research, former advisees and public placements");
const choi = src("Yejin Choi homepage", "https://yejinchoi.com/", "education, UW/AI2/Stanford trajectory and research");
const demszky = src("Stanford GSE profile: Dora Demszky", "https://ed.stanford.edu/faculty/ddemszky", "education, doctoral supervision, Stanford appointment and NLP-for-education research", "official");
const klein = src("Dan Klein homepage", "https://people.eecs.berkeley.edu/~klein/", "education, Berkeley role, NLP research and group alumni");
const min = src("Sewon Min homepage", "https://sewonmin.com/", "education, postdoctoral and Berkeley trajectory, LLM research");
const suhr = src("Alane Suhr homepage", "https://www.alanesuhr.com/", "education, Berkeley appointment and grounded-language research");
const bamman = src("David Bamman homepage", "https://people.ischool.berkeley.edu/~dbamman/", "education, Berkeley appointment, cultural-analytics research, group and alumni destinations");
const denero = src("John DeNero homepage", "https://denero.org/", "education, Google/Berkeley trajectory and NLP research");
const bird = src("Steven Bird homepage", "https://www.stevenbird.net/", "education, international faculty trajectory and language-resource research");
const neubig = src("Graham Neubig homepage", "https://www.phontron.com/", "education, CMU appointment, NeuLab and research");
const bisk = src("Yonatan Bisk homepage", "https://yonatanbisk.com/", "education, faculty trajectory and grounded-language research");
const fried = src("Daniel Fried homepage", "https://dfried.github.io/", "education, Berkeley/CMU trajectory and agents research");
const asai = src("Akari Asai homepage", "https://akariasai.github.io/", "education, AI2/CMU trajectory and retrieval research");
const rose = src("Carolyn Rose homepage", "https://www.cs.cmu.edu/~cprose/", "education, CMU roles and conversational-learning research");
const smith = src("Noah A. Smith homepage", "https://nasmith.github.io/", "education, CMU/UW trajectory and NLP research");
const zettlemoyer = src("Luke Zettlemoyer homepage", "https://homes.cs.washington.edu/~lsz/", "education, UW/Meta roles, advisees and research");
const hajishirzi = src("Hanna Hajishirzi homepage", "https://homes.cs.washington.edu/~hannaneh/", "education, UW/AI2 roles, open-model research and group");
const tsvetkov = src("Yulia Tsvetkov homepage", "https://homes.cs.washington.edu/~yuliats/", "education, CMU/UW trajectory and multilingual responsible NLP");
const wang = src("Lucy Lu Wang homepage", "https://homes.cs.washington.edu/~lucylw/", "education, AI2/UW trajectory and scientific NLP");
const althoff = src("Tim Althoff homepage", "https://homes.cs.washington.edu/~althoff/", "education, Stanford/UW trajectory and human-centered AI");
const barzilay = src("MIT CSAIL profile: Regina Barzilay", "https://www.csail.mit.edu/person/regina-barzilay", "education, MIT roles, NLP and AI-for-health research", "official");
const andreas = src("Jacob Andreas homepage", "https://www.mit.edu/~jda/", "education, Berkeley/MIT trajectory and language-agent research");
const yoonkim = src("Yoon Kim homepage", "https://people.csail.mit.edu/yoonkim/", "education, Harvard/MIT trajectory and efficient NLP research");
const danqi = src("Danqi Chen homepage", "https://www.cs.princeton.edu/~danqic/", "education, Stanford/Facebook/Princeton trajectory and current leave status");
const karthik = src("Karthik Narasimhan homepage", "https://www.cs.princeton.edu/~karthikn/", "education, MIT/OpenAI/Sierra/Princeton trajectory and agents research");
const cardie = src("Cornell profile: Claire Cardie", "https://www.cs.cornell.edu/people/claire-cardie", "education, Cornell roles and information-extraction research", "official");
const artzi = src("Yoav Artzi homepage", "https://yoavartzi.com/", "education, UW/Cornell trajectory and grounded-language research");
const cristian = src("Cristian Danescu-Niculescu-Mizil homepage", "https://www.cs.cornell.edu/~cristian/", "education, Cornell appointment and computational social science research");
const goyal = src("Tanya Goyal homepage", "https://tanyagoyal.com/", "education, Princeton postdoctoral and Cornell trajectory, generation research");
const lee = src("Lillian Lee homepage", "https://www.cs.cornell.edu/home/llee/", "education, Cornell roles and NLP research");
const rush = src("Alexander Rush homepage", "https://rush-nlp.com/", "education, Harvard/Cornell trajectory and efficient open NLP research");
const bowman = src("Samuel Bowman homepage", "https://sbowman.info/", "education, Stanford/NYU trajectory and language-model evaluation research");
const cho = src("Kyunghyun Cho homepage", "https://kyunghyuncho.me/", "education, Montreal/NYU trajectory and neural sequence-model research");
const eunsol = src("Eunsol Choi homepage", "https://eunsol.github.io/", "education, doctoral advisers, UW/Google/UT Austin/NYU trajectory, research, group and alumni destinations");
const hehe = src("He He homepage", "https://hhexiy.github.io/", "education, Stanford/NYU trajectory and interactive NLP research");
const mckeown = src("Kathleen McKeown CV", "https://www.cs.columbia.edu/~kathy/mckeown-vita.pdf", "education, Columbia appointments, leadership and advisees", "cv");
const hirschberg = src("Julia Hirschberg homepage", "https://www.cs.columbia.edu/~julia/", "education, Bell Labs/Columbia trajectory and speech research");
const muresan = src("Smaranda Muresan homepage", "https://www.cs.columbia.edu/~smara/", "education, Barnard/Columbia/Amazon roles and NLP research");
const zhouyu = src("Zhou Yu homepage", "https://zhouyu.cs.columbia.edu/", "education, UC Davis/Columbia trajectory and conversational-AI research");
const hewitt = src("John Hewitt homepage", "https://nlp.stanford.edu/~johnhew/", "education, Stanford/Columbia trajectory and interpretability research");
const mccallum = src("Andrew McCallum biography", "https://people.cs.umass.edu/~mccallum/bio.html", "education, industry/UMass trajectory and information-extraction research");
const erk = src("Katrin Erk homepage", "https://www.katrinerk.com/", "education, UT Austin/UMass trajectory and computational-semantics research");
const oconnor = src("Brendan O'Connor homepage", "https://brenocon.com/", "education, CMU/UMass trajectory and computational social science research");
const iyyer = src("Mohit Iyyer CV", "https://people.cs.umass.edu/~miyyer/data/cv.pdf", "education, UMass appointment, advisees and placements", "cv");
const vandurme = src("Benjamin Van Durme homepage", "https://www.cs.jhu.edu/~vandurme/", "education, JHU/Microsoft roles and NLP research");
const eisner = src("Jason Eisner homepage", "https://www.cs.jhu.edu/~jason/", "education, JHU role and computational-linguistics research");
const koehn = src("Philipp Koehn homepage", "https://www.cs.jhu.edu/~phi/", "education, Edinburgh/JHU trajectory and machine-translation research");
const dredze = src("Mark Dredze homepage", "https://www.cs.jhu.edu/~mdredze/", "education, JHU roles and health/social-media NLP research");
const durrett = src("Greg Durrett homepage", "https://www.cs.utexas.edu/~gdurrett/", "education, Berkeley/UT Austin trajectory and NLP research");
const mooney = src("Raymond Mooney homepage", "https://www.cs.utexas.edu/~mooney/", "education, Illinois/UT Austin trajectory and language-learning research");
const stone = src("Peter Stone homepage", "https://www.cs.utexas.edu/~pstone/", "education, CMU/AT&T/UT Austin trajectory and multi-agent research");
const qliu = src("Qiang Liu homepage", "https://www.cs.utexas.edu/~lqiang/", "education, Dartmouth/UT Austin trajectory and generative-AI research");

export const usFullProfileEnhancements: Record<string, PersonEnhancement> = {
  "christopher-manning-us": enhance(manning, "Stanford Thomas M. Siebel Professor、SAIL 主任，研究计算语言学、深度学习与基础模型。", ["Cambridge", "Stanford PhD", "SAIL", "Foundation Models"], [["教育", "Cambridge 数学本科；Stanford Linguistics 博士"], ["任职轨迹", "曾任 Carnegie Mellon faculty，2000 年加入 Stanford"], ["研究主线", "句法、统计 NLP、深度学习与基础模型"]]),
  "percy-liang-us": enhance(liang, "Stanford 教授、CRFM 创始主任，研究基础模型、评测、数据与社会影响。", ["MIT", "Berkeley PhD", "CRFM", "HELM"], [["教育", "MIT 本科；UC Berkeley 博士"], ["组织建设", "创立并领导 Stanford Center for Research on Foundation Models"], ["研究主线", "基础模型、机器学习、评测及社会影响"]]),
  "christopher-potts-us": enhance(potts, "Stanford 语言学教授兼系主任，连接形式语义、语用学与计算语言学。", ["UC Santa Cruz PhD", "Semantics", "Pragmatics", "Stanford NLP"], [["教育", "UC Santa Cruz Linguistics 博士"], ["任职", "Stanford Linguistics Professor and Chair"], ["研究主线", "语义、语用、语言推理与计算建模"]]),
  "tatsunori-hashimoto-us": enhance(hashimoto, "Stanford 副教授，研究可靠的基础模型训练、数据选择、评测与社会影响。", ["MIT PhD", "Stanford Postdoc", "Microsoft Semantic Machines", "Foundation Models"], [["教育", "Harvard 统计与数学本科；MIT CSAIL 博士，由 Tommi Jaakkola 与 David Gifford 共同指导"], ["任职轨迹", "Stanford CS/Statistics 博士后（2016–2019）→ Microsoft Semantic Machines（2019–2020）→ Stanford faculty（2020–）"], ["研究主线", "基础模型训练、鲁棒性、数据与评测"]]),
  "yejin-choi-us": enhance(choi, "Stanford 教授，长期连接 UW、AI2 与 Stanford，研究常识推理、生成模型和 AI 安全。", ["Cornell PhD", "UW", "AI2", "AI Safety"], [["教育", "Cornell 计算机科学博士"], ["任职轨迹", "曾长期任职 UW 并领导 AI2 研究；2025 年加入 Stanford"], ["研究主线", "常识推理、语言生成、多模态与 AI 安全"]]),
  "dora-demszky-us": enhance(demszky, "Stanford GSE 助理教授，使用 NLP 与人机协作技术研究公平、以学生为中心的教学。", ["Princeton BA", "Stanford Linguistics PhD", "Dan Jurafsky", "Education NLP"], [["教育", "Princeton Linguistics 本科；Stanford Linguistics 博士（2023）"], ["博士师承", "博士由 Dan Jurafsky 指导"], ["研究主线", "教育 NLP、教师反馈、课堂对话与以学生为中心的教学"]]),
  "dan-klein-us": enhance(klein, "Berkeley 教授与 NLP Group 资深 PI，研究解析、机器翻译和语言模型。", ["Stanford PhD", "Berkeley NLP", "Parsing", "Machine Translation"], [["教育", "Stanford 计算机科学博士"], ["任职轨迹", "2004 年加入 UC Berkeley faculty"], ["研究主线", "自然语言处理、解析、机器翻译与机器学习"]]),
  "sewon-min-us": enhance(min, "Berkeley 助理教授兼 AI2 Research Scientist，研究大模型的性能、适应性、事实性、推理以及数据/模型审计。", ["University of Washington PhD", "AI2", "LLM Knowledge", "Model Auditing"], [["教育", "University of Washington 计算机科学博士"], ["联合任职", "UC Berkeley EECS Assistant Professor，同时任 Allen Institute for AI Research Scientist"], ["产业经历", "公开主页列出 Meta AI、Google 与 Salesforce 的研究经历"]]),
  "alane-suhr-us": enhance(suhr, "Berkeley 助理教授，研究情境化、多智能体和具身交互中的语言使用与学习。", ["Cornell PhD", "AI2 Young Investigator", "Grounded Language", "Multi-agent Interaction"], [["教育", "Cornell 计算机科学博士（2022），导师 Yoav Artzi"], ["任职轨迹", "博士后曾在 AI2 Mosaic team 任 Young Investigator，随后加入 Berkeley"], ["研究主线", "情境化语言、多智能体/具身交互与交互式学习"]]),
  "david-bamman-us": enhance(bamman, "Berkeley 副教授，以 NLP 支持文化分析、数字人文与长时段文本研究。", ["Carnegie Mellon PhD", "Cultural Analytics", "Digital Humanities", "NLP"], [["教育", "Carnegie Mellon 计算机科学博士"], ["任职", "UC Berkeley School of Information faculty"], ["研究主线", "NLP、文化分析、数字人文和叙事"]]),
  "john-denero-us": enhance(denero, "Berkeley 教授，研究 NLP 与机器翻译，并长期建设计算机教育课程。", ["Berkeley PhD", "Google", "Machine Translation", "Education"], [["教育", "UC Berkeley 计算机科学博士，导师 Dan Klein"], ["任职轨迹", "曾在 Google 从事机器翻译研究，后回到 Berkeley 任教"], ["研究主线", "NLP、机器翻译与计算教育"]]),
  "steven-bird-us": enhance(bird, "Berkeley 教授，长期研究低资源语言、计算语言学与语言数据基础设施。", ["Edinburgh PhD", "Low-resource Languages", "Language Documentation", "NLTK"], [["教育", "University of Edinburgh 计算语言学博士"], ["任职轨迹", "曾在 University of Melbourne 等机构任教并开展语言技术项目"], ["研究主线", "低资源语言、语言记录、计算语言学与语言资源"]]),
  "graham-neubig-us": enhance(neubig, "CMU 副教授、NeuLab 负责人，研究多语言 NLP、大模型、代码智能与开放软件。", ["NAIST PhD", "NeuLab", "Multilingual NLP", "Code Intelligence"], [["教育", "Nara Institute of Science and Technology 博士"], ["任职轨迹", "曾任 Carnegie Mellon 前的奈良先端科学技术大学 faculty"], ["研究主线", "多语言 NLP、LLM、代码智能与开放工具"]]),
  "yonatan-bisk-us": enhance(bisk, "CMU 副教授、CLAW Lab 负责人，研究语言如何与物理世界、感知和控制相连接。", ["UIUC PhD", "CLAW Lab", "Grounded Language", "Embodied AI"], [["教育", "University of Illinois Urbana-Champaign 博士，研究无监督贝叶斯句法模型"], ["任职轨迹", "公开主页列出 USC ISI、University of Washington、Microsoft Research 与 Meta Embodied AI 经历"], ["研究主线", "语言落地、具身语言、感知、控制与交流"]]),
  "daniel-fried-us": enhance(fried, "CMU 助理教授，研究语言智能体、代码、交互式学习和语言落地。", ["Berkeley PhD", "Stanford Postdoc", "Agents", "Code"], [["教育", "UC Berkeley 计算机科学博士，导师 Dan Klein"], ["任职轨迹", "在 Stanford 从事博士后研究后加入 CMU"], ["研究主线", "语言智能体、交互、代码与自然语言处理"]]),
  "akari-asai-us": enhance(asai, "CMU 2026 秋季新 PI，研究检索增强、多语言模型、开放模型与知识密集型 NLP。", ["University of Washington PhD", "AI2", "Retrieval", "Open Models"], [["教育", "University of Washington 计算机科学博士"], ["任职轨迹", "博士阶段与 AI2 紧密合作；CMU 官方名录列 2026 秋季入职"], ["研究主线", "检索增强、多语言、开放模型与知识密集型 NLP"]]),
  "carolyn-rose-us": enhance(rose, "CMU 教授，连接对话系统、协作学习、学习科学与计算社会科学。", ["Carnegie Mellon PhD", "Conversational AI", "Learning Sciences", "Discourse"], [["教育", "Carnegie Mellon 计算语言学博士"], ["任职", "CMU Language Technologies Institute 与 Human-Computer Interaction Institute faculty"], ["研究主线", "对话、话语分析、协作学习与学习科学"]]),
  "noah-smith-us": enhance(smith, "UW 教授，研究 NLP、机器学习和计算社会科学，并长期参与跨机构共同指导。", ["Johns Hopkins PhD", "Carnegie Mellon", "UW NLP", "Computational Social Science"], [["教育", "Johns Hopkins 计算机科学博士"], ["任职轨迹", "曾任 Carnegie Mellon faculty，后加入 University of Washington"], ["研究主线", "自然语言处理、机器学习与计算社会科学"]]),
  "luke-zettlemoyer-us": enhance(zettlemoyer, "UW 教授兼 Meta FAIR 高级研究总监，研究语义、NLP 与基础模型。", ["MIT PhD", "UW", "Meta FAIR", "Semantics"], [["教育", "MIT 计算机科学博士"], ["产业任职", "University of Washington 教授，同时任 Meta FAIR Senior Research Director"], ["研究主线", "语义解析、NLP 与基础模型"]]),
  "hannaneh-hajishirzi-us": enhance(hajishirzi, "UW 教授兼 AI2 AI 高级总监，领导开放语言模型与多模态研究。", ["UIUC PhD", "UW", "AI2", "OLMo"], [["教育", "University of Illinois Urbana-Champaign 博士"], ["联合任职", "UW 教授、Allen Institute for AI Senior Director of AI"], ["研究主线", "开放语言模型、生成式 AI、多模态与问答"]]),
  "yulia-tsvetkov-us": enhance(tsvetkov, "UW 副教授，研究多语言、社会文化因素、公平性和负责任 NLP。", ["Carnegie Mellon PhD", "Multilingual NLP", "Responsible AI", "Sociolinguistics"], [["教育", "Carnegie Mellon Language Technologies Institute 博士"], ["任职轨迹", "曾任 Carnegie Mellon faculty，后加入 University of Washington"], ["研究主线", "多语言 NLP、公平、社会语言学和负责任 AI"]]),
  "lucy-lu-wang-us": enhance(wang, "UW 助理教授，研究科学文献理解、信息获取与开放知识基础设施。", ["Northwestern PhD", "AI2", "Scientific NLP", "Information Access"], [["教育", "Northwestern University 博士"], ["任职轨迹", "曾在 Allen Institute for AI 任研究科学家，后加入 UW"], ["研究主线", "科学 NLP、文献理解、信息获取与知识基础设施"]]),
  "tim-althoff-us": enhance(althoff, "UW 副教授，研究人本 AI、计算健康和大规模社会行为分析。", ["Stanford PhD", "Human-centered AI", "Computational Health", "Social Computing"], [["教育", "Stanford 计算机科学博士"], ["任职", "University of Washington faculty，领导 Behavioral Data Science Group"], ["研究主线", "人本 AI、计算健康、社会计算和语言数据分析"]]),
  "regina-barzilay-us": enhance(barzilay, "MIT 杰出教授，研究 NLP 与面向癌症和药物发现的 AI。", ["Columbia PhD", "MIT CSAIL", "Jameel Clinic", "AI for Health"], [["教育", "Columbia University 计算机科学博士"], ["组织角色", "MIT Jameel Clinic AI faculty lead"], ["研究主线", "自然语言处理、机器学习、癌症检测与药物发现"]]),
  "jacob-andreas-us": enhance(andreas, "MIT 副教授，研究语言智能体、推理、交互式学习和语言落地。", ["Berkeley PhD", "MIT", "Language Agents", "Grounding"], [["教育", "UC Berkeley 计算机科学博士，导师 Dan Klein"], ["任职轨迹", "在 MIT 完成博士后研究后加入 MIT faculty"], ["研究主线", "语言智能体、推理、交互与语言落地"]]),
  "yoon-kim-us": enhance(yoonkim, "MIT 副教授，研究表示学习、生成模型与高效语言建模。", ["Harvard PhD", "Alexander Rush", "MIT-IBM Watson AI Lab", "Efficient NLP"], [["教育", "Harvard 计算机科学博士（2020），导师 Alexander Rush"], ["任职轨迹", "MIT-IBM Watson AI Lab 博士后（2019–2021）→ MIT 助理教授（2021–2025）→ 副教授（2025–）"], ["研究主线", "表示学习、生成模型和高效 NLP"]]),
  "danqi-chen-us": enhance(danqi, "Princeton 副教授，研究检索、知识密集型 NLP 与开放语言模型。", ["Stanford PhD", "Facebook AI Research", "Princeton NLP", "Thinking Machines Lab"], [["教育", "Tsinghua 本科；Stanford 计算机科学博士，导师 Christopher Manning"], ["任职轨迹", "曾在 Facebook AI Research 任访问/研究岗位，2018 年加入 Princeton"], ["当前状态", "个人主页记录 2026 年休假并任 Thinking Machines Lab Member of Technical Staff"]]),
  "karthik-narasimhan-us": enhance(karthik, "Princeton 副教授，研究语言智能体、强化学习和交互式决策。", ["MIT PhD", "OpenAI", "Sierra", "Language Agents"], [["教育", "MIT 计算机科学博士，导师 Regina Barzilay"], ["产业轨迹", "曾任 OpenAI Research Scientist；2023–2025 任 Sierra Head of Research"], ["研究主线", "语言智能体、强化学习与交互式学习"]]),
  "claire-cardie-us": enhance(cardie, "Cornell 教授，长期研究信息抽取、意见挖掘与论证分析。", ["UMass PhD", "Cornell NLP", "Information Extraction", "Opinion Mining"], [["教育", "University of Massachusetts Amherst 计算机科学博士"], ["任职", "Cornell Computer Science faculty，并长期领导 NLP 研究"], ["研究主线", "信息抽取、观点挖掘、论证与文本分析"]]),
  "yoav-artzi-us": enhance(artzi, "Cornell 副教授，研究语义解析、语言落地与交互式智能体。", ["University of Washington PhD", "Cornell", "Grounded Language", "Agents"], [["教育", "University of Washington 计算机科学博士，导师 Luke Zettlemoyer"], ["任职", "Cornell Computer Science faculty"], ["研究主线", "语义解析、语言落地、交互式学习与智能体"]]),
  "cristian-danescu-us": enhance(cristian, "Cornell 副教授，使用 NLP 研究语言、社会互动与在线社区。", ["Cornell PhD", "Computational Social Science", "Online Communities", "NLP"], [["教育", "Cornell University 计算机科学博士"], ["任职", "Cornell Information Science faculty"], ["研究主线", "计算社会科学、语言与社会互动、在线社区"]]),
  "tanya-goyal-us": enhance(goyal, "Cornell 助理教授，研究文本生成、评测、事实性与语言模型。", ["University of Texas PhD", "Princeton Postdoc", "Generation", "Evaluation"], [["教育", "University of Texas at Austin 计算机科学博士"], ["任职轨迹", "在 Princeton Language and Intelligence 从事博士后研究后加入 Cornell"], ["研究主线", "文本生成、评测、事实性与 LLM"]]),
  "lillian-lee-us": enhance(lee, "Cornell 教授，研究自然语言处理、文本生成、社会互动与语言风格。", ["Harvard PhD", "Cornell NLP", "Text Generation", "Social Interaction"], [["教育", "Harvard University 计算机科学博士"], ["任职", "Cornell Computer Science and Information Science faculty"], ["研究主线", "NLP、生成、社会互动和语言风格"]]),
  "sasha-rush-us": enhance(rush, "Cornell 副教授，研究高效语言模型、结构化预测与开放源代码工具。", ["MIT PhD", "Harvard", "Efficient LLM", "Open Source"], [["教育", "MIT 计算机科学博士"], ["任职轨迹", "曾任 Harvard faculty，后加入 Cornell"], ["研究主线", "高效 LLM、结构化预测和开源 NLP 系统"]]),
  "samuel-bowman-us": enhance(bowman, "NYU 副教授，研究语言模型评测、可靠性、推理与 AI 安全。", ["Stanford PhD", "NYU", "Evaluation", "AI Safety"], [["教育", "Stanford Linguistics 博士"], ["任职", "NYU faculty；公开页面标注 2025–26 学年休假"], ["研究主线", "语言模型评测、可靠性、推理和 AI 安全"]]),
  "kyunghyun-cho-us": enhance(cho, "NYU 讲席教授，研究神经序列模型、机器翻译和生成式机器学习。", ["Aalto PhD", "Montreal", "Neural Machine Translation", "Generative Models"], [["教育", "Aalto University 博士"], ["任职轨迹", "曾在 Université de Montréal 从事博士后研究，后加入 NYU"], ["研究主线", "神经机器翻译、生成模型和机器学习"]]),
  "eunsol-choi-us": enhance(eunsol, "NYU 助理教授，研究知识密集型 NLP、问答和语言推理。", ["University of Washington PhD", "Google", "UT Austin", "Knowledge NLP"], [["教育", "University of Washington 计算机科学博士，由 Luke Zettlemoyer 与 Yejin Choi 共同指导"], ["任职轨迹", "曾任 Google Research Scientist 与 UT Austin faculty，后加入 NYU"], ["研究主线", "知识、问答、信息抽取与语言推理"]]),
  "he-he-us": enhance(hehe, "NYU 副教授，研究交互式学习、自然语言生成和负责任 AI。", ["University of Maryland PhD", "NYU", "Interactive Learning", "Responsible AI"], [["教育", "University of Maryland 计算机科学博士"], ["任职", "NYU Computer Science and Center for Data Science faculty"], ["研究主线", "交互式学习、自然语言生成和负责任语言技术"]]),
  "kathleen-mckeown-us": enhance(mckeown, "Columbia 讲席教授、Data Science Institute 创始主任，研究摘要、生成和信息访问。", ["Penn PhD", "Columbia NLP", "Summarization", "Data Science Institute"], [["教育", "University of Pennsylvania 计算机与信息科学博士"], ["组织建设", "Columbia Data Science Institute 创始主任"], ["研究主线", "自然语言生成、摘要、问答和信息访问"]]),
  "julia-hirschberg-us": enhance(hirschberg, "Columbia 讲席教授，研究语音、韵律、对话系统与可信语音技术。", ["Penn PhD", "Bell Labs", "Speech", "Prosody"], [["教育", "University of Pennsylvania 计算机与信息科学博士"], ["任职轨迹", "曾在 Bell Labs / AT&T Labs 任研究与管理岗位，后加入 Columbia"], ["研究主线", "语音、计算韵律、对话和可信语音系统"]]),
  "smaranda-muresan-us": enhance(muresan, "Barnard 副教授、Columbia 关联教师与 Amazon Scholar，研究人本 NLP、论证和错误信息。", ["Columbia PhD", "Barnard", "Amazon Scholar", "Human-centered NLP"], [["教育", "Columbia University 计算机科学博士"], ["联合任职", "Barnard faculty、Columbia affiliate 与 Amazon Scholar"], ["研究主线", "人本 NLP、论证、事实核查和错误信息"]]),
  "zhou-yu-us": enhance(zhouyu, "Columbia 副教授，研究对话系统、社交智能与人机协作。", ["Carnegie Mellon PhD", "UC Davis", "Conversational AI", "Human-AI Interaction"], [["教育", "Carnegie Mellon Language Technologies Institute 博士"], ["任职轨迹", "曾任 UC Davis faculty，后加入 Columbia"], ["研究主线", "对话系统、社交智能、人机协作与 LLM"]]),
  "john-hewitt-us": enhance(hewitt, "Columbia 助理教授，研究语言模型表示、结构、学习机制与可解释性。", ["Stanford PhD", "Interpretability", "Representations", "NLP"], [["教育", "Stanford 计算机科学博士"], ["任职轨迹", "2025 年加入 Columbia Computer Science"], ["研究主线", "语言模型表示、结构探针、学习机制和可解释性"]]),
  "andrew-mccallum-us": enhance(mccallum, "UMass Amherst 杰出教授，研究信息抽取、知识库和统计机器学习。", ["Rochester PhD", "WhizBang", "Information Extraction", "Knowledge Bases"], [["教育", "University of Rochester 计算机科学博士"], ["任职轨迹", "曾参与创办 WhizBang! Labs，后加入 UMass Amherst"], ["研究主线", "信息抽取、知识库、图模型和机器学习"]]),
  "katrin-erk-us": enhance(erk, "UMass Amherst 教授，研究计算语义、词义、语境表示与语言理解。", ["Saarland PhD", "UT Austin", "Computational Semantics", "Word Meaning"], [["教育", "Saarland University 计算语言学博士"], ["任职轨迹", "曾任 UT Austin faculty，后加入 UMass Amherst"], ["研究主线", "计算语义、词义、语境与语言表示"]]),
  "brendan-oconnor-us": enhance(oconnor, "UMass Amherst 副教授，研究计算社会科学、政治语言和 NLP 中的社会因素。", ["Carnegie Mellon PhD", "Computational Social Science", "Political Language", "NLP"], [["教育", "Carnegie Mellon 计算机科学博士"], ["任职", "UMass Amherst Computer Science faculty"], ["研究主线", "计算社会科学、政治语言、社会因素与 NLP"]]),
  "mohit-iyyer-us": enhance(iyyer, "UMass Amherst adjunct associate professor，研究长文本生成、叙事和问答；CV 公开学生去向。", ["Maryland PhD", "UMass", "Long-form Generation", "Student Placements"], [["教育", "University of Maryland 计算机科学博士"], ["任职轨迹", "2018 年加入 UMass Amherst faculty；当前名录列 adjunct"], ["研究主线", "文本生成、长文本、叙事、问答和语言模型评测"]]),
  "benjamin-van-durme-us": enhance(vandurme, "JHU 教授兼 Microsoft Frontier Tuning 团队负责人，研究推理、知识与 AI 安全。", ["Rochester PhD", "JHU", "Microsoft", "Reasoning"], [["教育", "University of Rochester 计算机科学博士"], ["联合任职", "JHU 教授，并领导 Microsoft Frontier Tuning 研究团队"], ["研究主线", "NLP、推理、知识表示与 AI 安全"]]),
  "jason-eisner-us": enhance(eisner, "JHU 教授，研究计算语言学、解析、形态与机器学习方法。", ["Penn PhD", "JHU CLSP", "Parsing", "Computational Linguistics"], [["教育", "University of Pennsylvania 计算机与信息科学博士"], ["任职", "Johns Hopkins Computer Science 与 CLSP faculty"], ["研究主线", "解析、形态、语法、机器学习与计算语言学"]]),
  "philipp-koehn-us": enhance(koehn, "JHU 教授，长期研究统计与神经机器翻译、多语言和开源 MT 系统。", ["USC PhD", "Edinburgh", "Machine Translation", "Moses"], [["教育", "University of Southern California 计算机科学博士"], ["任职轨迹", "曾任 University of Edinburgh professor，后加入 Johns Hopkins"], ["研究主线", "机器翻译、多语言 NLP 与开源 MT 系统"]]),
  "mark-dredze-us": enhance(dredze, "JHU 副教授，研究健康 NLP、社交媒体分析、公共卫生与语言技术。", ["Penn PhD", "JHU", "Health NLP", "Social Media"], [["教育", "University of Pennsylvania 计算机与信息科学博士"], ["任职", "Johns Hopkins Computer Science 与相关公共卫生项目 faculty"], ["研究主线", "健康 NLP、社交媒体、公共卫生和机器学习"]]),
  "greg-durrett-us": enhance(durrett, "UT Austin 副教授，研究 NLP、信息抽取、问答、语言模型推理与评测。", ["Berkeley PhD", "UT Austin", "Information Extraction", "LLM Reasoning"], [["教育", "UC Berkeley 计算机科学博士，导师 Dan Klein"], ["任职", "UT Austin Computer Science faculty"], ["研究主线", "NLP、信息抽取、问答、推理与评测"]]),
  "raymond-mooney-us": enhance(mooney, "UT Austin 教授，长期研究机器学习、自然语言理解和语言到行动的映射。", ["Illinois PhD", "UT Austin", "Machine Learning", "Grounded Language"], [["教育", "University of Illinois Urbana-Champaign 计算机科学博士"], ["任职", "UT Austin Computer Science faculty"], ["研究主线", "机器学习、自然语言理解、语义解析与语言落地"]]),
  "peter-stone-us": enhance(stone, "UT Austin 教授，研究多智能体系统、强化学习、机器人和 AI agents。", ["Carnegie Mellon PhD", "AT&T Labs", "Multi-agent Systems", "Reinforcement Learning"], [["教育", "Carnegie Mellon 计算机科学博士"], ["任职轨迹", "曾在 AT&T Labs 从事研究，后加入 UT Austin"], ["研究主线", "多智能体系统、强化学习、机器人与自主智能体"]]),
  "qiang-liu-us": enhance(qliu, "UT Austin 副教授，研究生成式 AI、统计机器学习、推断与优化。", ["UC Irvine PhD", "Dartmouth", "Generative AI", "Probabilistic Inference"], [["教育", "University of California, Irvine 计算机科学博士"], ["任职轨迹", "曾任 Dartmouth faculty，后加入 UT Austin"], ["研究主线", "生成式 AI、概率推断、优化与机器学习"]]),
};

// Only direct adviser/postdoctoral statements are converted into edges; coauthorship
// by itself is deliberately not treated as evidence of a strong relationship.
export const usFullProfileRelationships: Relationship[] = [
  { id: "us-full-jurafsky-demszky", from: "dan-jurafsky-us", to: "dora-demszky-us", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Stanford GSE 官方简介明确写明 Dora Demszky 的 Stanford Linguistics 博士由 Dan Jurafsky 指导。", source: demszky, verified: true, endYear: 2023 },
  { id: "us-full-artzi-suhr", from: "yoav-artzi-us", to: "alane-suhr-us", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Alane Suhr 个人主页明确写明其 Cornell 计算机科学博士由 Yoav Artzi 指导。", source: suhr, verified: true, endYear: 2022 },
  { id: "us-full-liang-hashimoto", from: "percy-liang-us", to: "tatsunori-hashimoto-us", type: "lineage", subtype: "postdoc_mentor", label: "博士后指导", evidence: "Tatsunori Hashimoto 个人主页记录其 2016–2019 年在 Stanford CS/Statistics 从事博士后研究，合作导师包括 Percy Liang 与 John Duchi。", source: hashimoto, verified: true, startYear: 2016, endYear: 2019 },
  { id: "us-full-rush-yoonkim", from: "sasha-rush-us", to: "yoon-kim-us", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Yoon Kim 个人主页与 CV 明确写明其 Harvard 计算机科学博士导师为 Alexander Rush。", source: yoonkim, verified: true, endYear: 2020 },
];

export const usFullProfileGroupMembers: GroupMember[] = [
  { id: "us-full-yoon-hadeel", teacherId: "yoon-kim-us", name: "Hadeel Al-Negheimish", role: "Postdoctoral researcher", source: yoonkim },
  { id: "us-full-yoon-lucas", teacherId: "yoon-kim-us", name: "Lucas Torroba Hennigen", role: "PhD student", source: yoonkim },
  { id: "us-full-yoon-han", teacherId: "yoon-kim-us", name: "Han Guo", role: "PhD student · co-advised with Eric Xing", source: yoonkim },
  { id: "us-full-yoon-linlu", teacherId: "yoon-kim-us", name: "Linlu Qiu", role: "PhD student", source: yoonkim },
  { id: "us-full-yoon-zhaofeng", teacherId: "yoon-kim-us", name: "Zhaofeng Wu", role: "PhD student", source: yoonkim },
  { id: "us-full-yoon-isha", teacherId: "yoon-kim-us", name: "Isha Puri", role: "PhD student · co-advised with Marzyeh Ghassemi", source: yoonkim },
];

export const usFullProfileStudentPlacements: StudentPlacement[] = [
  { id: "us-full-hashimoto-esin", student: "Esin Durmus", teacherId: "tatsunori-hashimoto-us", company: "Anthropic", role: "Research Scientist", kind: "reported", source: hashimoto, verifiedAt: checkedAt },
  { id: "us-full-hashimoto-niladri", student: "Niladri Chatterji", teacherId: "tatsunori-hashimoto-us", company: "Meta", role: "Researcher", kind: "reported", source: hashimoto, verifiedAt: checkedAt },
  { id: "us-full-hashimoto-shibani", student: "Shibani Santurkar", teacherId: "tatsunori-hashimoto-us", company: "OpenAI", role: "Researcher", kind: "reported", source: hashimoto, verifiedAt: checkedAt },
  { id: "us-full-hashimoto-xuechen", student: "Xuechen Li", teacherId: "tatsunori-hashimoto-us", company: "xAI", role: "Researcher", kind: "reported", source: hashimoto, verifiedAt: checkedAt },
  { id: "us-full-hashimoto-rohan", student: "Rohan Taori", teacherId: "tatsunori-hashimoto-us", company: "Anthropic", role: "Researcher", kind: "reported", source: hashimoto, verifiedAt: checkedAt },
  { id: "us-full-eunsol-jifan", student: "Jifan Chen", teacherId: "eunsol-choi-us", company: "Amazon AWS", role: "Researcher", kind: "reported", note: "Eunsol Choi 组页列为共同指导（with Greg Durrett）的 PhD alumni。", source: eunsol, verifiedAt: checkedAt },
  { id: "us-full-eunsol-yasumasa", student: "Yasumasa Onoe", teacherId: "eunsol-choi-us", company: "Google Research", role: "Researcher", kind: "reported", note: "Eunsol Choi 组页列为共同指导（with Greg Durrett）的 PhD alumni。", source: eunsol, verifiedAt: checkedAt },
  { id: "us-full-bamman-sims", student: "Matt Sims", teacherId: "david-bamman-us", company: "Sudowrite", role: "Alumnus", kind: "reported", source: bamman, verifiedAt: checkedAt },
];
