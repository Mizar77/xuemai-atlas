import type { Person, Source } from "./data";

export type ConferenceAwardRecord = {
  id: string;
  venue: "ACL";
  year: 2024 | 2025 | 2026;
  category: string;
  paper: string;
  facultyAuthorIds: string[];
  source: Source;
};

const checkedAt = "2026-08-31";
const official = (label: string, url: string, supports: string): Source => ({ label, url, kind: "official", checkedAt, supports });
const profile = (label: string, url: string, supports: string): Source => ({ label, url, kind: "profile", checkedAt, supports });
const acl2024 = official("ACL 2024 · Best Paper Awards", "https://2024.aclweb.org/program/best_papers/", "ACL 2024 best, special and outstanding paper titles and author lists");
const acl2025 = official("ACL 2025 · Awards", "https://2025.aclweb.org/program/awards/", "ACL 2025 best, special and outstanding paper titles and author lists");
const acl2026 = official("ACL 2026 · Best Paper Awards", "https://2026.aclweb.org/program/best_papers/", "ACL 2026 best, special and outstanding paper titles and author lists");

type FacultySeed = {
  id: string;
  name: string;
  institution: Person["institution"];
  actualInstitution?: string;
  region: NonNullable<Person["region"]>;
  role: string;
  area: string;
  stage: Person["stage"];
  summary: string;
  education: string;
  community: string;
  award: Source;
  awardFact: string;
  page: Source;
};

const faculty = (seed: FacultySeed, index: number): Person => ({
  id: seed.id,
  name: seed.name,
  institution: seed.institution,
  actualInstitution: seed.actualInstitution,
  region: seed.region,
  role: seed.role,
  area: seed.area,
  tags: ["Award-audited", "ACL award author", ...seed.area.split(" · ").slice(0, 3)],
  summary: seed.summary,
  facts: [
    { label: "获奖论文", value: seed.awardFact, source: seed.award },
    { label: "当前任职 / 研究组", value: seed.community, source: seed.page },
    { label: "教育 / 学术轨迹", value: seed.education, source: seed.page },
  ],
  stage: seed.stage,
  category: "core",
  status: "current PI · award-audited",
  sources: [seed.award, seed.page],
  x: 140 + (index % 5) * 170,
  y: 2820 + Math.floor(index / 5) * 120,
  primary: true,
  lastVerifiedAt: checkedAt,
});

const seeds: FacultySeed[] = [
  {
    id: "richard-futrell-award", name: "Richard Futrell", institution: "External", actualInstitution: "University of California, Irvine", region: "United States", role: "Associate Professor · UC Irvine Language Science", area: "Psycholinguistics · NLP · AI Interpretability", stage: "emerging",
    summary: "UC Irvine Language Processing Group 负责人，以信息论和贝叶斯认知建模连接人类语言处理、NLP 与模型可解释性。",
    education: "MIT Cognitive Science PhD；现任 UC Irvine Associate Professor。", community: "UC Irvine Language Processing Group lead。",
    award: acl2024, awardFact: "ACL 2024 Best Paper · Mission: Impossible Language Models；ACL 2026 Best Paper · Memory Efficiency and Resource-Rational Encoding in Sentence Processing。",
    page: profile("Richard Futrell homepage", "https://sites.socsci.uci.edu/~rfutrell/index.html", "current UC Irvine role, group leadership, research and award publication list"),
  },
  {
    id: "kyle-mahowald-award", name: "Kyle Mahowald", institution: "UT Austin", region: "United States", role: "Associate Professor of Linguistics", area: "Computational Linguistics · Psycholinguistics · LLM Interpretability", stage: "emerging",
    summary: "UT Austin 计算语言学与心理语言学 PI，研究语言效率、认知与语言模型可解释性，并公开表示正在接收学生。",
    education: "MIT Brain and Cognitive Sciences PhD；Stanford postdoc with Dan Jurafsky and Dan McFarland。", community: "UT Austin Computational Linguistics Research Group、NLP community 与 AI+Human Objectives Initiative。",
    award: acl2024, awardFact: "ACL 2024 Best Paper · Mission: Impossible Language Models。",
    page: official("UT Austin Linguistics · Kyle Mahowald", "https://liberalarts.utexas.edu/linguistics/faculty/km49784", "current faculty role and research areas"),
  },
  {
    id: "michael-hahn-award", name: "Michael Hahn", institution: "External", actualInstitution: "Saarland University", region: "Europe", role: "Tenure-Track Professor · LaCoCo Lab", area: "Computational Linguistics · Language Models · Cognitive Science", stage: "emerging",
    summary: "Saarland Language, Computation and Cognition Lab 负责人，研究 Transformer 表达能力、语言效率和人类语言处理。",
    education: "Stanford Linguistics PhD，Judith Degen 与 Dan Jurafsky 共同指导。", community: "Saarland LaCoCo Lab；公开招聘 PhD、RA 与 postdoc。",
    award: acl2024, awardFact: "ACL 2024 Best Paper · Why are Sensitive Functions Hard for Transformers?；ACL 2026 Outstanding Paper · Systematicity between Forms and Meanings across Languages Supports Efficient Communication。",
    page: official("Saarland University · Michael Hahn", "https://www.uni-saarland.de/fachrichtung/lst/news/michael-hahn-nimmt-ruf-auf-die-tenure-track-professur-in-unserer-fachrichtung-an-23976.html", "professorship, research focus and appointment"),
  },
  {
    id: "ruoxi-jia-award", name: "Ruoxi Jia", institution: "External", actualInstitution: "Virginia Tech", region: "United States", role: "Assistant Professor · ECE", area: "Trustworthy ML · Data Valuation · Privacy", stage: "emerging",
    summary: "Virginia Tech 数据中心型可信机器学习 PI，研究数据价值、隐私、安全与数据市场的算法基础。",
    education: "Peking University BS；UC Berkeley EECS PhD (2018)。", community: "Virginia Tech Sanghani Center core faculty。",
    award: acl2024, awardFact: "ACL 2024 Best Social Impact Paper · How Johnny Can Persuade LLMs to Jailbreak Them。",
    page: official("Virginia Tech Sanghani Center · Ruoxi Jia", "https://sanghani.cs.vt.edu/people/our-team/faculty/ruoxi-jia.html", "current faculty role, education and research"),
  },
  {
    id: "weiyan-shi-award", name: "Weiyan Shi", institution: "External", actualInstitution: "Northeastern University", region: "United States", role: "Assistant Professor · Khoury / ECE", area: "Dialogue Systems · AI Safety · Human-AI Interaction", stage: "emerging",
    summary: "Northeastern 联合聘任 PI，研究说服、谈判与社会影响对话，以及语言模型的安全、隐私与人机交互。",
    education: "Columbia Computer Science PhD；Stanford NLP postdoc。", community: "Northeastern Khoury College 与 College of Engineering joint appointment。",
    award: acl2024, awardFact: "ACL 2024 Best Social Impact Paper · How Johnny Can Persuade LLMs to Jailbreak Them；另参与 ACL 2024 Outstanding Paper。",
    page: official("Northeastern Khoury · Weiyan Shi", "https://www.khoury.northeastern.edu/people/weiyan-shi/", "current appointment, education, research and students"),
  },
  {
    id: "david-chiang-award", name: "David Chiang", chinese: "蒋伟", institution: "External", actualInstitution: "University of Notre Dame", region: "United States", role: "Associate Professor · Computer Science and Engineering", area: "Formal Language Theory · Multilingual NLP · Language Models", stage: "senior",
    summary: "Notre Dame NLP 教师，以形式语言理论研究语言模型的能力边界，并长期推进低资源、多语言 NLP。",
    education: "University of Pennsylvania PhD；曾任 USC/ISI 与 Notre Dame faculty。", community: "Notre Dame Natural Language Processing Group。",
    award: acl2024, awardFact: "ACL 2024 Best Social Impact Paper · DIALECTBENCH；ACL 2024 Outstanding Paper · Language Complexity and Speech Recognition Accuracy。",
    page: profile("David Chiang homepage", "https://academicweb.nd.edu/~dchiang/", "current Notre Dame role, research, teaching and publication record"),
  } as FacultySeed & { chinese: string },
  {
    id: "antonios-anastasopoulos-award", name: "Antonios Anastasopoulos", institution: "External", actualInstitution: "George Mason University", region: "United States", role: "Associate Professor · Computer Science", area: "Multilingual NLP · Low-Resource Languages · Speech", stage: "emerging",
    summary: "George Mason NLP PI，研究低资源语言、多语言 NLP 与语音技术，是 ACL 社会影响奖作者网络中的关键教师。",
    education: "University of Notre Dame PhD；现任 George Mason CS Associate Professor。", community: "George Mason Computer Science primary faculty。",
    award: acl2024, awardFact: "ACL 2024 Best Social Impact Paper · DIALECTBENCH。",
    page: official("George Mason CS faculty", "https://cs.gmu.edu/people/faculty", "current associate professorship and NLP research"),
  },
  {
    id: "alan-ritter-award", name: "Alan Ritter", institution: "Georgia Tech", region: "United States", role: "Associate Professor · School of Interactive Computing", area: "NLP · Information Extraction · Social Media", stage: "senior",
    summary: "Georgia Tech NLP PI，研究开放域信息抽取、社会媒体语言和鲁棒语言技术。",
    education: "University of Washington PhD；曾在 CMU 与 Ohio State 开展研究和任职。", community: "Georgia Tech School of Interactive Computing / ML@GT。",
    award: acl2024, awardFact: "ACL 2024 Best Social Impact Paper · Having Beer after Prayer? Measuring Cultural Bias in Large Language Models。",
    page: official("Georgia Tech · Alan Ritter", "https://www.cc.gatech.edu/people/alan-ritter", "current faculty role and NLP research"),
  },
  {
    id: "wei-xu-award", name: "Wei Xu", institution: "Georgia Tech", region: "United States", role: "Associate Professor · School of Interactive Computing", area: "NLP · LLM Evaluation · Text Generation", stage: "senior",
    summary: "Georgia Tech NLP PI，研究大模型后训练、长上下文与多轮评测、文本生成及跨学科 AI 应用。",
    education: "Tsinghua BS/MS；NYU Computer Science PhD。", community: "Georgia Tech School of Interactive Computing 与 ML@GT。",
    award: acl2024, awardFact: "ACL 2024 Best Social Impact Paper · Having Beer after Prayer?；另参与 ACL 2024 Outstanding Paper。",
    page: official("Georgia Tech College of Computing · Wei Xu", "https://www.cc.gatech.edu/people/wei-xu", "current role, education and research"),
  },
  {
    id: "zhihao-jia-award", name: "Zhihao Jia", institution: "CMU", region: "United States", role: "Assistant Professor · Computer Science", area: "ML Systems · Efficient Deep Learning · Distributed Systems", stage: "emerging",
    summary: "CMU Catalyst Group / Parallel Data Lab PI，研究深度学习计算加速、分布式机器学习和大规模数据系统。",
    education: "Stanford CS PhD，Alex Aiken 与 Matei Zaharia 共同指导；此前任 Facebook Research Scientist。", community: "CMU Catalyst Group 与 Parallel Data Lab。",
    award: acl2024, awardFact: "ACL 2024 Outstanding Paper · Quantized Side Tuning。",
    page: official("CMU CSD · Zhihao Jia", "https://csd.cs.cmu.edu/people/faculty/zhihao-jia", "current appointment, advisers, prior role and research"),
  },
  {
    id: "sanmi-koyejo-award", name: "Sanmi Koyejo", institution: "Stanford", region: "United States", role: "Associate Professor · Computer Science", area: "Trustworthy AI · Evaluation · AI for Health", stage: "senior",
    summary: "Stanford STAIR Lab 负责人，发展可信 AI 的测量理论、能力评估、算法问责与隐私学习。",
    education: "UT Austin PhD；Stanford postdoctoral research；此前任 UIUC faculty。", community: "Stanford Trustworthy AI Research Lab、SAIL 与 HAI。",
    award: acl2025, awardFact: "ACL 2025 Best Paper · Fairness through Difference Awareness。",
    page: official("Stanford Profiles · Sanmi Koyejo", "https://profiles.stanford.edu/sanmi-koyejo", "current role, STAIR lab, research and advisees"),
  },
  {
    id: "david-jurgens-award", name: "David Jurgens", institution: "UMich", region: "United States", role: "Associate Professor · Information / CSE", area: "Computational Social Science · NLP · Responsible AI", stage: "senior",
    summary: "University of Michigan 计算社会科学与 NLP 教师，研究在线行为、社会语义和负责任语言技术。",
    education: "Stanford Computer Science PhD；现任 Michigan tenure faculty。", community: "Michigan School of Information / CSE affiliated AI faculty。",
    award: acl2025, awardFact: "ACL 2025 Best Resource Paper · UniMoral。",
    page: official("Michigan EECS faculty directory · David Jurgens", "https://www.eecs.umich.edu/eecs/etc/people/byalpha.cgi", "current tenure-faculty status"),
  },
  {
    id: "tal-linzen-award", name: "Tal Linzen", institution: "NYU", region: "United States", role: "Associate Professor · Linguistics and Data Science", area: "Language Models · Psycholinguistics · Generalization", stage: "senior",
    summary: "NYU CAP Lab 负责人，以语言学与认知科学设计神经语言模型的泛化和结构评测。",
    education: "NYU PhD；École Normale Supérieure postdoc；曾任 Johns Hopkins faculty。", community: "NYU Computation and Psycholinguistics Lab、ML² co-PI。",
    award: acl2025, awardFact: "ACL 2025 Outstanding Paper · Between Circuits and Chomsky。",
    page: official("NYU Center for Data Science · Tal Linzen", "https://cds.nyu.edu/team/tal-linzen/", "current role, career trajectory, CAP Lab and research"),
  },
  {
    id: "alexandra-birch-award", name: "Alexandra Birch", institution: "Edinburgh", region: "Europe", role: "Personal Chair of Multilingual NLP", area: "Machine Translation · Multilingual NLP · LLMs", stage: "senior",
    summary: "Edinburgh 多语言 NLP 教授，研究机器翻译、跨语言模型和低资源语言技术。",
    education: "University of Edinburgh academic trajectory；现任 Personal Chair。", community: "Edinburgh Institute for Language, Cognition and Computation。",
    award: acl2025, awardFact: "ACL 2025 Outstanding Paper · Bridging the Language Gaps in Large Language Models。",
    page: official("Edinburgh Informatics staff · Alexandra Birch", "https://people.inf.ed.ac.uk/", "current Personal Chair title and institute listing"),
  },
  {
    id: "robert-west-award", name: "Robert West", institution: "EPFL", region: "Europe", role: "Associate Professor · Data Science & AI Lab", area: "NLP · Computational Social Science · AI Safety", stage: "senior",
    summary: "EPFL dlab 负责人，连接 NLP、计算社会科学与人类安全导向的 AI，并研究智能体系统。",
    education: "TUM undergraduate；McGill MSc；Stanford CS PhD (2016)。", community: "EPFL Data Science & AI Lab principal investigator。",
    award: acl2024, awardFact: "ACL 2024 Outstanding Papers · Do Llamas Work in English? 与 Getting Serious about Humor。",
    page: official("EPFL · Robert West", "https://people.epfl.ch/robert.west?lang=en", "current role, education, lab, research and awards"),
  },
  {
    id: "walid-magdy-award", name: "Walid Magdy", institution: "Edinburgh", region: "Europe", role: "Personal Chair of Computational Social Science", area: "Computational Social Science · Social NLP · Arabic NLP", stage: "senior",
    summary: "Edinburgh SMASH Group 创始人与负责人，研究社会媒体、政治偏见、极化及阿拉伯语等低资源语言。",
    education: "长期任职 University of Edinburgh School of Informatics。", community: "Social Media Analysis and Support for Humanity (SMASH) Group。",
    award: acl2024, awardFact: "ACL 2024 Outstanding Paper · Estimating the Level of Dialectness Predicts Inter-annotator Agreement。",
    page: official("University of Edinburgh · Walid Magdy", "https://www.research.ed.ac.uk/en/persons/walid-magdy/", "current chair, SMASH leadership and research"),
  },
  {
    id: "junchi-yan-award", name: "Junchi Yan", chinese: "严骏驰", institution: "SJTU", region: "Mainland China", role: "Professor · School of Artificial Intelligence", area: "Machine Learning · Graph Matching · AI for Science", stage: "senior",
    summary: "上海交大人工智能学院教授、ThinkLab 负责人，研究图匹配、组合优化、机器学习与 AI for Science。",
    education: "上海交通大学硕士、博士；曾任 IBM Research staff。", community: "SJTU ThinkLab、AI School 与 Zhiyuan AI Elite Class。",
    award: acl2025, awardFact: "ACL 2025 Outstanding Paper · LLMs know their vulnerabilities。",
    page: official("SJTU · Junchi Yan", "https://speit.sjtu.edu.cn/en/faculty/42920", "current role, education, lab and academic leadership"),
  } as FacultySeed & { chinese: string },
  {
    id: "liang-lin-award", name: "Liang Lin", chinese: "林倞", institution: "SYSU", region: "Mainland China", role: "Professor · School of Computer Science", area: "Multimodal AI · World Models · Embodied AI", stage: "senior",
    summary: "中山大学多模态 AI 资深教授，研究多模态理解、生成式世界模型与具身智能，并有商汤研究院领导经历。",
    education: "中山大学教授、博士生导师；曾任商汤科技研究院执行院长 / 首席研发总监。", community: "广东省大数据分析与处理重点实验室与 SYSU HCP Lab。",
    award: acl2025, awardFact: "ACL 2025 Outstanding Paper · MiniLongBench（官方教师页记录其为唯一通讯作者）。",
    page: official("中山大学计算机学院 · 林倞", "https://cse.sysu.edu.cn/teacher/LinLiang", "current role, research, lab, industry trajectory and ACL award"),
  } as FacultySeed & { chinese: string },
  {
    id: "yanghua-xiao-award", name: "Yanghua Xiao", chinese: "肖仰华", institution: "FDU", region: "Mainland China", role: "Professor · School of Computer Science", area: "Knowledge Graphs · LLM Reasoning · AI Governance", stage: "senior",
    summary: "复旦大学知识图谱与大模型推理教授，兼具数据科学平台建设和 AI 治理研究影响。",
    education: "复旦大学计算机学院教授。", community: "Shanghai Key Laboratory of Data Science leadership network。",
    award: acl2025, awardFact: "ACL 2025 Outstanding Paper · Past Meets Present: Creating Historical Analogy with Large Language Models。",
    page: official("Fudan CGAIG · Yanghua Xiao", "https://cgaig.fudan.edu.cn/ba/82/c54664a768642/page.htm", "current professorship, school and AI-governance role"),
  } as FacultySeed & { chinese: string },
  {
    id: "ndapa-nakashole-award", name: "Ndapa Nakashole", institution: "UCSD", region: "United States", role: "Associate Professor · Computer Science and Engineering", area: "NLP · Low-Resource Languages · AI for Health", stage: "senior",
    summary: "UC San Diego NLP PI，研究低资源语言、知识获取、问答与面向医疗可访问性的语言技术。",
    education: "Saarland University PhD；曾在 CMU 开展博士后研究。", community: "UCSD CSE primary AI faculty and graduate adviser。",
    award: acl2025, awardFact: "ACL 2025 Outstanding Paper · Typology-Guided Adaptation for African NLP。",
    page: official("UCSD CSE · Ndapa Nakashole", "https://cse.ucsd.edu/people/faculty-profiles/ndapa-nakashole", "current faculty identity and contact"),
  },
  {
    id: "anna-rohrbach-award", name: "Anna Rohrbach", institution: "TU Darmstadt", region: "Europe", role: "Professor · Multimodal Grounded Learning", area: "Vision-Language · Visual Grounding · Trustworthy Multimodal AI", stage: "emerging",
    summary: "TU Darmstadt Multimodal AI Lab 联合负责人，研究视觉语言、视觉定位、偏差诊断和可解释多模态模型。",
    education: "MPI Informatics PhD under Bernt Schiele；曾任 UC Berkeley Research Scientist。", community: "TU Darmstadt Multimodal Grounded Learning group / hessian.AI。",
    award: acl2026, awardFact: "ACL 2026 Best Resource Paper · VeriTaS。",
    page: official("TU Darmstadt · Anna Rohrbach", "https://www.informatik.tu-darmstadt.de/mai/multimodal_ai/people_mai/teamdetails_136832.en.jsp", "current professorship, education trajectory and research"),
  },
  {
    id: "marcus-rohrbach-award", name: "Marcus Rohrbach", institution: "TU Darmstadt", region: "Europe", role: "Professor · Multimodal Reliable AI", area: "Vision-Language · Reliable AI · Video Understanding", stage: "senior",
    summary: "TU Darmstadt Multimodal AI Lab 联合负责人，研究可靠多模态 AI、视觉语言与视频理解。",
    education: "曾在 UC Berkeley 与 Meta AI 从事视觉语言研究；后加入 TU Darmstadt。", community: "TU Darmstadt Multimodal Reliable AI group / hessian.AI。",
    award: acl2026, awardFact: "ACL 2026 Best Resource Paper · VeriTaS。",
    page: official("TU Darmstadt Multimodal AI Lab", "https://www.informatik.tu-darmstadt.de/mai/multimodal_ai/index.en.jsp", "joint lab leadership, research and ACL 2026 award"),
  },
  {
    id: "bing-liu-award", name: "Bing Liu", institution: "External", actualInstitution: "University of Illinois Chicago", region: "United States", role: "Distinguished Professor · Wexler Professor of Computing", area: "Sentiment Analysis · Continual Learning · NLP", stage: "senior",
    summary: "UIC 资深 NLP 与数据挖掘教授，开创性推进情感分析、意见挖掘、终身与持续学习。",
    education: "University of Edinburgh AI PhD；此前任 NUS faculty。", community: "UIC Computer Science / Artificial Intelligence Laboratory。",
    award: acl2026, awardFact: "ACL 2026 Best Resource Paper · Audio MultiChallenge。",
    page: official("UIC Computer Science · Bing Liu", "https://cs.uic.edu/profiles/bing-liu/", "current distinguished professorship, education and research"),
  },
  {
    id: "elisabeth-andre-award", name: "Elisabeth André", institution: "External", actualInstitution: "University of Augsburg", region: "Europe", role: "Full Professor · Human-Centered AI", area: "Multimodal Interaction · Affective Computing · Social Robotics", stage: "senior",
    summary: "Augsburg 人本 AI 教席负责人，研究多模态交互、情感计算、社会机器人和具身会话智能体。",
    education: "Saarland University Computer Science；2000 年起担任 Augsburg C4/W3 professorship。", community: "Augsburg Chair for Human-Centered Artificial Intelligence。",
    award: acl2026, awardFact: "ACL 2026 Outstanding Paper · CAR-bench。",
    page: official("University of Augsburg · Elisabeth André", "https://www.uni-augsburg.de/de/fakultaet/fai/informatik/prof/hcm/team/andre/", "current chair, career and research"),
  },
  {
    id: "mubarak-shah-award", name: "Mubarak Shah", institution: "External", actualInstitution: "University of Central Florida", region: "United States", role: "Trustee Chair Professor · Director, CRCV", area: "Computer Vision · Video Understanding · Activity Recognition", stage: "senior",
    summary: "UCF 计算机视觉学术带头人、CRCV 创始主任，长期培养视觉人才并研究视频理解、跟踪和行为识别。",
    education: "Wayne State Computer Science PhD；1986 年起任职 UCF。", community: "UCF Center for Research in Computer Vision founding director。",
    award: acl2026, awardFact: "ACL 2026 Outstanding Paper · ViLL-E: Video LLM Embeddings for Retrieval。",
    page: official("UCF Computer Science · Mubarak Shah", "https://www.cs.ucf.edu/person/mubarakshah/", "current chair professorship, CRCV leadership, education and research"),
  },
];

export const aclAwardAuditPeople: Person[] = seeds.map((seed, index) => {
  const person = faculty(seed, index);
  const chinese = (seed as FacultySeed & { chinese?: string }).chinese;
  return chinese ? { ...person, chinese } : person;
});

export const aclAwardRecords: ConferenceAwardRecord[] = [
  { id: "acl24-best-mission-impossible", venue: "ACL", year: 2024, category: "Best Paper", paper: "Mission: Impossible Language Models", facultyAuthorIds: ["richard-futrell-award", "kyle-mahowald-award", "christopher-potts-us"], source: acl2024 },
  { id: "acl24-best-sensitive-functions", venue: "ACL", year: 2024, category: "Best Paper", paper: "Why are Sensitive Functions Hard for Transformers?", facultyAuthorIds: ["michael-hahn-award"], source: acl2024 },
  { id: "acl24-social-jailbreak", venue: "ACL", year: 2024, category: "Best Social Impact Paper", paper: "How Johnny Can Persuade LLMs to Jailbreak Them", facultyAuthorIds: ["diyi-yang-us", "ruoxi-jia-award", "weiyan-shi-award"], source: acl2024 },
  { id: "acl24-social-dialectbench", venue: "ACL", year: 2024, category: "Best Social Impact Paper", paper: "DIALECTBENCH", facultyAuthorIds: ["david-chiang-award", "yulia-tsvetkov-us", "antonios-anastasopoulos-award"], source: acl2024 },
  { id: "acl24-social-cultural-bias", venue: "ACL", year: 2024, category: "Best Social Impact Paper", paper: "Having Beer after Prayer?", facultyAuthorIds: ["alan-ritter-award", "wei-xu-award"], source: acl2024 },
  { id: "acl24-outstanding-qst", venue: "ACL", year: 2024, category: "Outstanding Paper", paper: "Quantized Side Tuning", facultyAuthorIds: ["zhihao-jia-award"], source: acl2024 },
  { id: "acl24-outstanding-llamas", venue: "ACL", year: 2024, category: "Outstanding Paper", paper: "Do Llamas Work in English?", facultyAuthorIds: ["robert-west-award"], source: acl2024 },
  { id: "acl25-best-fairness", venue: "ACL", year: 2025, category: "Best Paper", paper: "Fairness through Difference Awareness", facultyAuthorIds: ["sanmi-koyejo-award"], source: acl2025 },
  { id: "acl25-resource-unimoral", venue: "ACL", year: 2025, category: "Best Resource Paper", paper: "UniMoral", facultyAuthorIds: ["david-jurgens-award"], source: acl2025 },
  { id: "acl25-outstanding-circuits", venue: "ACL", year: 2025, category: "Outstanding Paper", paper: "Between Circuits and Chomsky", facultyAuthorIds: ["tal-linzen-award"], source: acl2025 },
  { id: "acl25-outstanding-language-gap", venue: "ACL", year: 2025, category: "Outstanding Paper", paper: "Bridging the Language Gaps in Large Language Models", facultyAuthorIds: ["alexandra-birch-award"], source: acl2025 },
  { id: "acl25-outstanding-minilongbench", venue: "ACL", year: 2025, category: "Outstanding Paper", paper: "MiniLongBench", facultyAuthorIds: ["liang-lin-award"], source: acl2025 },
  { id: "acl25-outstanding-typology", venue: "ACL", year: 2025, category: "Outstanding Paper", paper: "Typology-Guided Adaptation for African NLP", facultyAuthorIds: ["ndapa-nakashole-award"], source: acl2025 },
  { id: "acl26-resource-veritas", venue: "ACL", year: 2026, category: "Best Resource Paper", paper: "VeriTaS", facultyAuthorIds: ["marcus-rohrbach-award", "anna-rohrbach-award"], source: acl2026 },
  { id: "acl26-resource-audio", venue: "ACL", year: 2026, category: "Best Resource Paper", paper: "Audio MultiChallenge", facultyAuthorIds: ["bing-liu-award"], source: acl2026 },
  { id: "acl26-outstanding-carbench", venue: "ACL", year: 2026, category: "Outstanding Paper", paper: "CAR-bench", facultyAuthorIds: ["elisabeth-andre-award"], source: acl2026 },
  { id: "acl26-outstanding-ville", venue: "ACL", year: 2026, category: "Outstanding Paper", paper: "ViLL-E", facultyAuthorIds: ["mubarak-shah-award"], source: acl2026 },
];

export const aclAwardAuditCoverage = {
  venue: "ACL",
  years: [2024, 2025, 2026] as const,
  includedCategories: ["Best Paper", "Best Theme Paper", "Best Resource Paper", "Best Social Impact Paper", "Outstanding Paper"],
  policy: "Current faculty or independent PI in the atlas's six supported regions; other geographies remain in the audit report rather than being assigned to an incorrect region.",
  officialAwardPages: [acl2024, acl2025, acl2026],
};
