import type { GroupMember, IndustryPathway, Person, Region, Relationship, Source, StudentPlacement } from "./data";

const official = (label: string, url: string): Source => ({ label, url, kind: "official" });
const profile = (label: string, url: string): Source => ({ label, url, kind: "profile" });

const thuCenter = official("清华基础模型研究中心", "https://www.cs.tsinghua.edu.cn/info/1088/5512.htm");
const pkuRoster = official("北大计算机学院导师名录", "https://cs.pku.edu.cn/zsxx/yjszs/dsxx.htm");
const fduRoster = official("复旦 NLP 教师名录", "https://nlp.fudan.edu.cn/28695/list.htm");
const rucRoster = official("人大高瓴教师名录", "https://ai.ruc.edu.cn/academicfaculty/szdwn/index.htm");
const hitRoster = official("哈工大人工智能学院教师名录", "https://sai.hit.edu.cn/zrjs/list.htm");
const casRoster = official("中科院自动化所 NLP 导师名录", "https://www.ia.cas.cn/yjsjy/dsjj/index.html");
const njuRoster = official("南京大学 NLP 教师名录", "https://cs.nju.edu.cn/nlp/people.html");

export const mainlandPeople: Person[] = [
  // 清华大学：THUNLP + 基础模型中心
  {
    id: "maosong-sun", name: "Maosong Sun", chinese: "孙茂松", role: "Professor · Chief Scientist, Center for Foundation Models", institution: "THU", region: "Mainland China",
    area: "NLP · Foundation Models · Chinese Computing", tags: ["NLP", "大模型", "中文信息处理", "THUNLP"], stage: "senior", category: "core",
    summary: "清华自然语言处理与社会人文计算主线带头人，基础模型研究中心首席科学家；研究覆盖自然语言处理、大模型、中文信息处理与计算人文。",
    facts: [{ label: "组织节点", value: "基础模型研究中心首席科学家", source: thuCenter }],
    sources: [official("清华教师主页", "https://www.cs.tsinghua.edu.cn/info/1121/3554.htm"), thuCenter], x: 150, y: 150, primary: true,
  },
  {
    id: "jie-tang-thu", name: "Jie Tang", chinese: "唐杰", role: "Professor · Director, Center for Foundation Models", institution: "THU", region: "Mainland China",
    area: "Foundation Models · Knowledge Graphs · AI", tags: ["GLM", "知识图谱", "AMiner", "智谱AI"], stage: "senior", category: "core",
    summary: "清华基础模型研究中心主任、知识工程实验室核心 PI；GLM 与 AMiner 的学术—产业转化连接点，智谱 AI 联合创始人。",
    facts: [{ label: "创业", value: "智谱 AI 联合创始人", source: official("清华新闻", "https://www.tsinghua.edu.cn/info/1182/124487.htm") }],
    sources: [official("清华教师主页", "https://www.cs.tsinghua.edu.cn/info/1111/3486.htm"), thuCenter], x: 150, y: 205, primary: true,
  },
  {
    id: "zhiyuan-liu", name: "Zhiyuan Liu", chinese: "刘知远", role: "Professor · Deputy Director, Center for Foundation Models", institution: "THU", region: "Mainland China",
    area: "NLP · Knowledge Graphs · Foundation Models", tags: ["NLP", "知识图谱", "大模型", "OpenNRE"], stage: "senior", category: "core",
    summary: "THUNLP 教授与基础模型研究中心副主任，研究知识图谱、语义计算、社会计算和基础模型。",
    sources: [official("清华教师主页", "https://www.cs.tsinghua.edu.cn/info/1121/7037.htm"), profile("个人主页", "https://lzy.thunlp.org/index_cn.html")], x: 150, y: 260, primary: true,
  },
  {
    id: "minlie-huang", name: "Minlie Huang", chinese: "黄民烈", role: "Professor · Deputy Director, Center for Foundation Models", institution: "THU", region: "Mainland China",
    area: "Conversational AI · LLM Alignment · AI Safety", tags: ["对话系统", "LLM 对齐", "安全伦理", "CoAI"], stage: "senior", category: "core",
    summary: "CoAI 负责人、基础模型研究中心副主任，聚焦语言生成、对话、大模型对齐、安全伦理与社会智能。",
    sources: [official("清华教师主页", "https://www.cs.tsinghua.edu.cn/info/1121/5620.htm"), profile("CoAI 主页", "https://hml.coai.cs.tsinghua.edu.cn/hml")], x: 150, y: 315, primary: true,
  },
  {
    id: "yang-liu-thu", name: "Yang Liu", chinese: "刘洋", role: "Professor", institution: "THU", region: "Mainland China",
    area: "Machine Translation · Natural Language Processing", tags: ["机器翻译", "NLP", "THUMT", "THUNLP"], stage: "senior", category: "core",
    summary: "THUNLP 机器翻译与自然语言处理 PI，长期建设数据驱动机器翻译算法与系统。",
    sources: [official("清华教师主页", "https://www.cs.tsinghua.edu.cn/info/1121/3575.htm")], x: 150, y: 370, primary: true,
  },

  // 北京大学：计算语言学研究所
  {
    id: "zhifang-sui", name: "Zhifang Sui", chinese: "穗志方", role: "Professor", institution: "PKU", region: "Mainland China",
    area: "Computational Linguistics · NLP", tags: ["计算语言学", "NLP", "语言资源"], stage: "senior", category: "core",
    summary: "北京大学计算语言学研究所资深 PI；列入学院自然语言处理博士生导师名录。",
    sources: [pkuRoster, official("北大人工智能方向页", "https://cs.pku.edu.cn/info/1024/1243.htm")], x: 440, y: 150, primary: true,
  },
  {
    id: "baobao-chang", name: "Baobao Chang", chinese: "常宝宝", role: "Associate Professor", institution: "PKU", region: "Mainland China",
    area: "Computational Linguistics · Parsing · NLP", tags: ["句法语义", "中文分词", "NLP"], stage: "senior", category: "core",
    summary: "研究计算语言学、中文分词、句法与语义分析，是北大计算语言学研究所核心教师之一。",
    sources: [official("北大教师主页", "https://cs.pku.edu.cn/info/1210/1966.htm"), pkuRoster], x: 440, y: 205, primary: true,
  },
  {
    id: "xu-sun-pku", name: "Xu Sun", chinese: "孙栩", role: "Research Professor · Tenured Associate Professor", institution: "PKU", region: "Mainland China",
    area: "Natural Language Generation · Machine Learning", tags: ["NLG", "结构学习", "深度学习", "NLP"], stage: "senior", category: "core",
    summary: "聚焦自然语言生成、结构化语言处理和面向语言的深度学习，是计算语言所现任博导。",
    sources: [official("北大教师主页", "https://cs.pku.edu.cn/info/1078/1673.htm")], x: 440, y: 260, primary: true,
  },
  {
    id: "houfeng-wang", name: "Houfeng Wang", chinese: "王厚峰", role: "Professor", institution: "PKU", region: "Mainland China",
    area: "NLP · Question Answering · Dialogue", tags: ["问答", "对话", "语义分析", "语言资源"], stage: "senior", category: "core",
    summary: "研究大规模语言知识获取、语义分析、自动问答、人机对话与观点挖掘。",
    sources: [official("北大教师主页", "https://cs.pku.edu.cn/info/1090/1771.htm")], x: 440, y: 315, primary: true,
  },
  {
    id: "yansong-feng", name: "Yansong Feng", chinese: "冯岩松", role: "Professor", institution: "PKU", region: "Mainland China",
    area: "NLP · Knowledge-enhanced Language Models", tags: ["NLP", "知识增强", "问答", "信息抽取"], stage: "senior", category: "core",
    summary: "北大自然语言处理博士生导师，研究知识增强语言理解、信息抽取与问答。",
    sources: [pkuRoster], x: 440, y: 370, primary: true,
  },
  {
    id: "liangming-pan", name: "Liangming Pan", chinese: "潘亮铭", role: "Assistant Professor · Researcher", institution: "PKU", region: "Mainland China",
    area: "LLM Reasoning · Interpretability · NLP", tags: ["大模型推理", "可解释性", "事实核查", "2025 新 PI"], stage: "emerging", category: "core",
    summary: "2025 年加入北大的新独立 PI，研究大模型推理、机理可解释性与可靠生成；博士毕业于 NUS。",
    facts: [{ label: "博士导师", value: "Min-Yen Kan（NUS）", source: official("北大菁英论坛简介", "https://cs.pku.edu.cn/info/1019/3191.htm") }],
    sources: [official("北大教师主页", "https://cs.pku.edu.cn/info/1090/3938.htm")], x: 440, y: 425, primary: true,
  },

  // 复旦大学：NLP 与大模型团队
  {
    id: "xuanjing-huang", name: "Xuanjing Huang", chinese: "黄萱菁", role: "Professor · NLP Lab Lead", institution: "FDU", region: "Mainland China",
    area: "Natural Language Processing · AI", tags: ["NLP", "语言理解", "实验室带头人"], stage: "senior", category: "core",
    summary: "复旦自然语言处理实验室带头人之一，连接复旦早期计算语言学传统与当前大模型团队。",
    facts: [{ label: "学术谱系", value: "师从复旦 NLP 实验室创建者吴立德", source: official("复旦校庆报道", "https://news.fudan.edu.cn/2023/0527/c2610a135077/page.htm") }],
    sources: [fduRoster, official("复旦教师主页", "https://faculty.fudan.edu.cn/xjhuang/zh_CN/index.htm")], x: 730, y: 150, primary: true,
  },
  {
    id: "xipeng-qiu", name: "Xipeng Qiu", chinese: "邱锡鹏", role: "Professor · MOSS Lead", institution: "FDU", region: "Mainland China",
    area: "NLP · Deep Learning · Foundation Models", tags: ["MOSS", "FastNLP", "NLP", "可信大模型"], stage: "senior", category: "core",
    summary: "复旦 NLP 与大模型团队核心 PI，负责 MOSS，主持 FudanNLP 与 FastNLP 等开源工作。",
    facts: [{ label: "学术谱系", value: "师从复旦 NLP 实验室创建者吴立德", source: official("复旦校庆报道", "https://news.fudan.edu.cn/2023/0527/c2610a135077/page.htm") }],
    sources: [official("复旦教师主页", "https://ai.fudan.edu.cn/3e/e4/c25921a278244/page.htm"), official("复旦 NLP 与大模型团队", "https://iipl.fudan.edu.cn/NLPydmx/")], x: 730, y: 205, primary: true,
  },
  {
    id: "qi-zhang-fdu", name: "Qi Zhang", chinese: "张奇", role: "Professor", institution: "FDU", region: "Mainland China",
    area: "NLP · Information Retrieval", tags: ["NLP", "信息检索", "可解释性", "MOSS"], stage: "senior", category: "core",
    summary: "研究自然语言处理、信息检索与模型可理解分析，是复旦 NLP 与 MOSS 团队核心成员。",
    sources: [official("复旦教师主页", "https://iipl.fudan.edu.cn/7f/c0/c45855a688064/page.htm"), fduRoster], x: 730, y: 260, primary: true,
  },
  {
    id: "yixin-cao-fdu", name: "Yixin Cao", chinese: "曹艺馨", role: "Young Researcher · PhD Advisor", institution: "FDU", region: "Mainland China",
    area: "NLP · Knowledge-enhanced LLMs", tags: ["知识增强", "LLM", "NLP", "发展期 PI"], stage: "emerging", category: "core",
    summary: "复旦 NLP 实验室青年研究员、博导；本图将其作为公开名录中的发展期独立 PI 收录。",
    sources: [fduRoster], x: 730, y: 315, primary: true,
  },
  {
    id: "yaqian-zhou", name: "Yaqian Zhou", chinese: "周雅倩", role: "Associate Professor", institution: "FDU", region: "Mainland China",
    area: "Natural Language Processing · Foundation Models", tags: ["NLP", "大模型", "语言理解"], stage: "senior", category: "core",
    summary: "复旦 NLP 与大模型团队现任副教授，参与团队的大模型与语言理解研究。",
    sources: [fduRoster, official("复旦 NLP 与大模型团队", "https://iipl.fudan.edu.cn/NLPydmx/")], x: 730, y: 370, primary: true,
  },
  {
    id: "xiaoqing-zheng", name: "Xiaoqing Zheng", chinese: "郑骁庆", role: "Associate Professor", institution: "FDU", region: "Mainland China",
    area: "Natural Language Processing · Machine Learning", tags: ["NLP", "机器学习", "语言模型"], stage: "senior", category: "core",
    summary: "复旦 NLP 与大模型团队现任副教授，研究自然语言处理与机器学习。",
    sources: [fduRoster, official("复旦 NLP 与大模型团队", "https://iipl.fudan.edu.cn/NLPydmx/")], x: 730, y: 425, primary: true,
  },
  {
    id: "tao-gui", name: "Tao Gui", chinese: "桂韬", role: "Associate Professor", institution: "FDU", region: "Mainland China",
    area: "LLM Agents · Robust & Interpretable NLP", tags: ["LLM Agents", "信息抽取", "鲁棒性", "可解释性"], stage: "emerging", category: "core",
    summary: "从信息抽取、鲁棒性与可解释性延伸到大模型智能体，是复旦 NLP 团队的新生代独立 PI。",
    sources: [fduRoster, official("复旦现代语言学研究院", "https://imoll.fudan.edu.cn/info/1018/1342.htm")], x: 730, y: 480, primary: true,
  },

  // 中国人民大学：高瓴人工智能学院
  {
    id: "jirong-wen", name: "Ji-Rong Wen", chinese: "文继荣", role: "Tenured Professor · Executive Dean", institution: "RUC", region: "Mainland China",
    area: "Information Retrieval · Large Models · Agents", tags: ["信息检索", "大模型", "智能体", "MSRA"], stage: "senior", category: "core",
    summary: "高瓴人工智能学院执行院长，研究信息检索、数据挖掘与大规模神经模型；曾任微软亚洲研究院研究负责人。",
    sources: [official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/wjr/index.htm"), rucRoster], x: 1020, y: 150, primary: true,
  },
  {
    id: "xin-zhao-ruc", name: "Xin Zhao", chinese: "赵鑫", role: "Professor · Tenured Associate Professor", institution: "RUC", region: "Mainland China",
    area: "LLM Training · NLP · Retrieval & Recommendation", tags: ["大模型", "NLP", "推荐", "RAG", "AI Box"], stage: "senior", category: "core",
    summary: "AI Box 负责人，研究大模型训练与微调、自然语言处理、信息检索和推荐系统。",
    sources: [official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/zx/index.htm")], x: 1020, y: 205, primary: true,
  },
  {
    id: "zhicheng-dou", name: "Zhicheng Dou", chinese: "窦志成", role: "Tenured Professor · Vice Dean", institution: "RUC", region: "Mainland China",
    area: "Generative Retrieval · RAG · AI Agents", tags: ["信息检索", "RAG", "智能体", "FlashRAG"], stage: "senior", category: "core",
    summary: "高瓴副院长，聚焦生成式检索、RAG、深度搜索和智能体；团队开源 FlashRAG、WebThinker、ARPO 等系统。",
    sources: [official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/dzc/2019bb0ea0db41b1bed636b91f8355ce.htm"), profile("实验室主页", "https://playbigdata.ruc.edu.cn/dou/dou_cn.aspx")], x: 1020, y: 260, primary: true,
  },
  {
    id: "xiting-wang", name: "Xiting Wang", chinese: "王希廷", role: "Associate Professor", institution: "RUC", region: "Mainland China",
    area: "LLM Interpretability · Alignment · Evaluation", tags: ["可解释性", "对齐", "评测", "MSRA"], stage: "emerging", category: "core",
    summary: "2023 年从微软亚洲研究院加入人大，研究大模型解释、对齐与评测，是新生代独立 PI。",
    sources: [official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/wxt/index.htm")], x: 1020, y: 315, primary: true,
  },
  {
    id: "yankai-lin", name: "Yankai Lin", chinese: "林衍凯", role: "Pre-tenure Associate Professor", institution: "RUC", region: "Mainland China",
    area: "Pretrained Models · NLP · Tool-using Agents", tags: ["预训练模型", "工具学习", "智能体", "腾讯微信"], stage: "emerging", category: "core",
    summary: "清华博士、腾讯微信前高级研究员，现研究预训练模型、自然语言处理与工具使用智能体。",
    sources: [official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/lyk/index.htm")], x: 1020, y: 370, primary: true,
  },
  {
    id: "xu-chen-ruc", name: "Xu Chen", chinese: "陈旭", role: "Pre-tenure Associate Professor", institution: "RUC", region: "Mainland China",
    area: "LLM Agents · Social Simulation · Reinforcement Learning", tags: ["LLM Agents", "社会模拟", "强化学习", "玉兰-万象"], stage: "emerging", category: "core",
    summary: "研究大模型智能体、社会科学模拟、强化学习与因果推断，建设“玉兰-万象”社会模拟平台。",
    sources: [official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/cx/751e55616ca84df5b48bf3244d40d53b.htm")], x: 1020, y: 425, primary: true,
  },

  // 哈尔滨工业大学：SCIR / 跨三校区 NLP 研究所
  {
    id: "ting-liu-hit", name: "Ting Liu", chinese: "刘挺", role: "Professor · Vice President · Director, NLP Institute", institution: "HIT", region: "Mainland China",
    area: "Natural Language Processing · Social Computing", tags: ["NLP", "社会计算", "SCIR", "CCF Fellow"], stage: "senior", category: "core",
    summary: "哈工大副校长、跨三校区自然语言处理研究所所长，长期领导 SCIR 的 NLP 与社会计算研究。",
    sources: [hitRoster, official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm")], x: 150, y: 670, primary: true,
  },
  {
    id: "wanxiang-che", name: "Wanxiang Che", chinese: "车万翔", role: "Professor · Deputy Director, NLP Institute", institution: "HIT", region: "Mainland China",
    area: "NLP · Large Language Models", tags: ["NLP", "大模型", "预训练模型", "LTP"], stage: "senior", category: "core",
    summary: "哈工大人工智能研究院副院长、NLP 研究所副所长，研究自然语言处理、大模型与预训练方法。",
    sources: [hitRoster, official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm")], x: 150, y: 725, primary: true,
  },
  {
    id: "bing-qin", name: "Bing Qin", chinese: "秦兵", role: "Professor · Director, SCIR", institution: "HIT", region: "Mainland China",
    area: "NLP · Sentiment & Cognitive Large Models", tags: ["NLP", "情感计算", "知识图谱", "大模型"], stage: "senior", category: "core",
    summary: "SCIR 研究中心主任，研究自然语言处理、情感计算、知识图谱与大模型认知调控。",
    sources: [hitRoster, official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm")], x: 150, y: 780, primary: true,
  },
  {
    id: "weinan-zhang-hit", name: "Weinan Zhang", chinese: "张伟男", role: "Professor", institution: "HIT", region: "Mainland China",
    area: "Dialogue · Social Computing · LLM", tags: ["对话系统", "社会计算", "大模型", "SCIR"], stage: "senior", category: "core",
    summary: "SCIR 教授，研究对话、社会计算与大模型相关方法。",
    sources: [official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm"), hitRoster], x: 150, y: 835, primary: true,
  },
  {
    id: "xiaocheng-feng", name: "Xiaocheng Feng", chinese: "冯骁骋", role: "Professor", institution: "HIT", region: "Mainland China",
    area: "Text Generation · Large Language Models", tags: ["文本生成", "大模型", "思维链", "发展期 PI"], stage: "emerging", category: "core",
    summary: "SCIR 新生代教授，研究复杂文本生成、大模型与推理方法。",
    sources: [official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm"), official("哈工大科研项目", "https://nlp.hit.edu.cn/21122/list.htm")], x: 150, y: 890, primary: true,
  },
  {
    id: "yanyan-zhao-hit", name: "Yanyan Zhao", chinese: "赵妍妍", role: "Professor", institution: "HIT", region: "Mainland China",
    area: "Social Computing · Natural Language Processing", tags: ["社会计算", "NLP", "文本分析"], stage: "senior", category: "core",
    summary: "SCIR 教授，研究社会计算与自然语言处理。",
    sources: [official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm"), hitRoster], x: 150, y: 945, primary: true,
  },

  // 中国科学院自动化研究所
  {
    id: "chengqing-zong", name: "Chengqing Zong", chinese: "宗成庆", role: "Research Professor · ACL President 2025", institution: "CAS-IA", region: "Mainland China",
    area: "NLP · Machine Translation · Dialogue", tags: ["机器翻译", "NLP", "对话", "ACL Fellow"], stage: "senior", category: "core",
    summary: "自动化所自然语言处理与机器翻译资深带头人，2025 年 ACL 主席，长期建设机器翻译、语言认知与对话研究。",
    sources: [official("自动化所主页", "https://ia.cas.cn/rcdw/yjy/202404/t20240425_7131828.html"), casRoster], x: 440, y: 670, primary: true,
  },
  {
    id: "jun-zhao-cas", name: "Jun Zhao", chinese: "赵军", role: "Research Professor", institution: "CAS-IA", region: "Mainland China",
    area: "NLP · Information Extraction · Knowledge", tags: ["信息抽取", "知识获取", "NLP", "问答"], stage: "senior", category: "core",
    summary: "自动化所自然语言处理资深 PI，长期参与机器翻译与 NLP 团队，并研究信息抽取和知识获取。",
    sources: [official("自动化所主页", "https://ia.cas.cn/rcdw/yjy/202404/t20240422_7129836.html"), casRoster], x: 440, y: 725, primary: true,
  },
  {
    id: "jiajun-zhang-cas", name: "Jiajun Zhang", chinese: "张家俊", role: "Research Professor · Zidong Taichu Center", institution: "CAS-IA", region: "Mainland China",
    area: "Multilingual & Multimodal LLMs · NLP", tags: ["紫东太初", "多语言", "多模态大模型", "机器翻译"], stage: "senior", category: "core",
    summary: "紫东太初大模型研究中心研究员，研究自然语言处理、多语言多模态大模型与应用。",
    sources: [official("自动化所主页", "https://www.ia.cas.cn/rcdw/qch/202404/t20240422_7129862.html"), casRoster], x: 440, y: 780, primary: true,
  },
  {
    id: "kang-liu-cas", name: "Kang Liu", chinese: "刘康", role: "Research Professor", institution: "CAS-IA", region: "Mainland China",
    area: "NLP · Knowledge Acquisition · Large Models", tags: ["NLP", "知识获取", "大模型", "信息抽取"], stage: "senior", category: "core",
    summary: "自动化所自然语言处理导师，研究知识获取、信息抽取与语言模型。",
    sources: [casRoster], x: 440, y: 835, primary: true,
  },
  {
    id: "shizhu-he", name: "Shizhu He", chinese: "何世柱", role: "Research Professor", institution: "CAS-IA", region: "Mainland China",
    area: "NLP · Knowledge Graphs · Language Models", tags: ["知识图谱", "NLP", "语言模型"], stage: "senior", category: "core",
    summary: "自动化所自然语言处理导师，方向覆盖知识图谱、语言理解与语言模型。",
    sources: [casRoster], x: 440, y: 890, primary: true,
  },
  {
    id: "yu-zhou-cas", name: "Yu Zhou", chinese: "周玉", role: "Research Professor", institution: "CAS-IA", region: "Mainland China",
    area: "Natural Language Processing · Machine Translation", tags: ["NLP", "机器翻译", "语言理解"], stage: "senior", category: "core",
    summary: "自动化所自然语言处理导师，长期属于机器翻译与 NLP 团队。",
    sources: [casRoster, official("自动化所团队走访", "https://www.ia.cas.cn/kxcb/kpwz/201311/t20131107_3969537.html")], x: 440, y: 945, primary: true,
  },

  // 南京大学：NJUNLP + 大模型协同创新中心
  {
    id: "jiajun-chen-nju", name: "Jiajun Chen", chinese: "陈家骏", role: "Professor", institution: "NJU", region: "Mainland China",
    area: "Machine Translation · Natural Language Processing", tags: ["机器翻译", "NLP", "NJUNLP"], stage: "senior", category: "core",
    summary: "南京大学自然语言处理研究组资深带头人，研究机器翻译、文本分析与语言理解。",
    sources: [njuRoster, official("NJUNLP 主页", "https://nlp.nju.edu.cn/")], x: 730, y: 670, primary: true,
  },
  {
    id: "xinyu-dai", name: "Xinyu Dai", chinese: "戴新宇", role: "Professor · Vice Dean, School of AI", institution: "NJU", region: "Mainland China",
    area: "Natural Language Processing · Large Language Models", tags: ["NLP", "大模型", "语言理解"], stage: "senior", category: "core",
    summary: "南京大学人工智能学院副院长、NJUNLP 教授，研究自然语言处理与大语言模型。",
    sources: [njuRoster, official("南京大学讲座简介", "https://slle.nju.edu.cn/txt/zbhg/20250516/i316201.html")], x: 730, y: 725, primary: true,
  },
  {
    id: "shujian-huang", name: "Shujian Huang", chinese: "黄书剑", role: "Professor · LLM Group Lead", institution: "NJU", region: "Mainland China",
    area: "Multilingual LLMs · Machine Translation · Reasoning", tags: ["多语言大模型", "机器翻译", "推理", "强化学习"], stage: "senior", category: "core",
    summary: "南京大学大语言模型研究小组负责人，聚焦多语言能力、知识学习、推理与机器翻译。",
    facts: [{ label: "博士与课题组谱系", value: "南京大学博士；长期在陈家骏带领的 NJUNLP 研究组", source: profile("个人主页", "https://nlp.nju.edu.cn/huangsj/") }],
    sources: [profile("个人主页", "https://nlp.nju.edu.cn/huangsj/"), official("南大大模型中心", "https://cs.nju.edu.cn/lm/research/llm/index.html")], x: 730, y: 780, primary: true,
  },
  {
    id: "feng-yang-nju", name: "Feng Yang", chinese: "冯洋", role: "Professor · PhD Advisor", institution: "NJU", region: "Mainland China",
    area: "Natural Language Processing · Machine Translation", tags: ["NLP", "机器翻译", "大模型"], stage: "senior", category: "core",
    summary: "南京大学计算机学院 NLP 与机器翻译方向博导。",
    sources: [official("南京大学教师主页", "https://cs.nju.edu.cn/38/52/c2641a473170/pagem.htm")], x: 730, y: 835, primary: true,
  },
  {
    id: "jianbing-zhang", name: "Jianbing Zhang", chinese: "张建兵", role: "Associate Professor · PhD Advisor", institution: "NJU", region: "Mainland China",
    area: "Multimodal LLMs · Computer-use Agents · AI4Science", tags: ["多模态大模型", "Computer-use Agent", "AI4Science", "发展期 PI"], stage: "emerging", category: "core",
    summary: "从图文生成发展到多模态大模型、数字智能体与 AI4Science 的独立 PI。",
    sources: [official("南京大学教师主页", "https://cs.nju.edu.cn/zhangjb/index.htm")], x: 730, y: 890, primary: true,
  },
  {
    id: "zequn-sun", name: "Zequn Sun", chinese: "孙泽群", role: "Tenure-track Assistant Professor", institution: "NJU", region: "Mainland China",
    area: "Knowledge Graphs · Large Language Models", tags: ["知识图谱", "大模型", "表示学习", "青年 PI"], stage: "emerging", category: "core",
    summary: "知识图谱与大语言模型方向的青年独立 PI，主持国自然青年基金与腾讯犀牛鸟项目。",
    sources: [official("南京大学教师主页", "https://cs.nju.edu.cn/95/2d/c56396a628013/page.htm")], x: 730, y: 945, primary: true,
  },

  // 上海交通大学：语言、语音、生成式 AI 与代码大模型
  {
    id: "kai-yu-sjtu", name: "Kai Yu", chinese: "俞凯", role: "Distinguished Professor · Director, Institute of Machine Intelligence", institution: "SJTU", region: "Mainland China",
    area: "Speech & Language · Dialogue · LLM Agents", tags: ["语音", "对话", "语言大模型", "思必驰"], stage: "senior", category: "core",
    summary: "交大 X-LANCE/机器智能研究所负责人，研究语音、自然语言、对话与大模型智能体；思必驰联合创始人兼首席科学家。",
    sources: [official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/jiaoshiml/yukai.html")], x: 1020, y: 670, primary: true,
  },
  {
    id: "hai-zhao-sjtu", name: "Hai Zhao", chinese: "赵海", role: "Tenured Professor", institution: "SJTU", region: "Mainland China",
    area: "Natural Language Understanding · Foundation Models", tags: ["NLU", "大模型", "脑启发", "AGI"], stage: "senior", category: "core",
    summary: "自然语言处理与理解资深 PI，近年聚焦基础模型之上的通用智能与脑启发大语言模型。",
    sources: [official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/en/jiaoshiml/zhaohai.html")], x: 1020, y: 725, primary: true,
  },
  {
    id: "pengfei-liu-sjtu", name: "Pengfei Liu", chinese: "刘鹏飞", role: "Tenure-track Associate Professor · GAIR Lead", institution: "SJTU", region: "Mainland China",
    area: "LLM Training · Alignment · Multimodal Generation", tags: ["提示学习", "LLM 对齐", "多模态生成", "GAIR"], stage: "emerging", category: "core",
    summary: "交大生成式人工智能研究组负责人，研究大模型训练、推理、对齐与多模态世界模型。",
    sources: [official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/en/jiaoshiml/liupengfei.html")], x: 1020, y: 780, primary: true,
  },
  {
    id: "xiaodong-gu", name: "Xiaodong Gu", chinese: "顾小东", role: "Tenure-track Associate Professor", institution: "SJTU", region: "Mainland China",
    area: "Code LLMs · Agents · NLP for Software", tags: ["代码大模型", "智能体", "程序生成", "软件工程"], stage: "emerging", category: "adjacent",
    summary: "研究代码大模型、程序生成与修复和智能问答 Agent；属于语言模型与软件系统交叉层。",
    sources: [official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/jiaoshiml/guxiaodong.html")], x: 1020, y: 835, primary: true,
  },
  {
    id: "xiaobao-wu", name: "Xiaobao Wu", chinese: "吴小宝", role: "Assistant Professor", institution: "SJTU", region: "Mainland China",
    area: "Natural Language Processing · Large Language Models", tags: ["NLP", "大模型", "可靠性", "2026 新 PI"], stage: "emerging", category: "core",
    summary: "2026 年加入上海交大的新独立 PI，博士毕业于 NTU，研究自然语言处理与大语言模型。",
    sources: [official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/jiaoshiml/wuxiaobao.html")], x: 1020, y: 890, primary: true,
  },
  {
    id: "yaohui-jin", name: "Yaohui Jin", chinese: "金耀辉", role: "Tenured Professor · Chief Engineer, AI Institute", institution: "SJTU", region: "Mainland China",
    area: "LLM Enhancement & Applications · AI4Science", tags: ["大模型增强", "智慧司法", "AI4Science", "数据治理"], stage: "adjacent", category: "adjacent",
    summary: "上海交大人工智能研究院总工程师，研究大模型增强与行业应用、智慧司法和 AI4Science。",
    sources: [official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/en/jiaoshiml/jinyaohui.html")], x: 1020, y: 945, primary: true,
  },
];

export const mainlandRelationships: Relationship[] = [
  { id: "thu-foundation-tang-huang", from: "jie-tang-thu", to: "minlie-huang", type: "collaboration", label: "基础模型中心主任 / 副主任", evidence: "清华官方公告列唐杰为主任、黄民烈为副主任。", source: thuCenter, verified: true },
  { id: "thu-foundation-tang-liu", from: "jie-tang-thu", to: "zhiyuan-liu", type: "collaboration", label: "基础模型中心主任 / 副主任", evidence: "清华官方公告列唐杰为主任、刘知远为副主任。", source: thuCenter, verified: true },
  { id: "thu-sun-liu", from: "maosong-sun", to: "zhiyuan-liu", type: "collaboration", label: "THUNLP 长期合作", evidence: "刘知远主页列出与孙茂松共同完成的大规模中文词汇语义分析与结构化知识表示成果。", source: profile("刘知远主页", "https://lzy.thunlp.org/index_cn.html"), verified: true },
  { id: "thu-sun-yang", from: "maosong-sun", to: "yang-liu-thu", type: "collaboration", label: "THUNLP 机器翻译合作", evidence: "清华公开论文与 THUNLP 介绍记录两人在机器翻译方向的长期合作。", source: official("清华教师主页", "https://www.cs.tsinghua.edu.cn/csen/info/1154/3908.htm"), verified: true },
  { id: "tang-zhipu", from: "jie-tang-thu", to: "jie-tang-thu", type: "industry", label: "智谱 AI 联合创始人", evidence: "清华新闻明确称唐杰为智谱联合创始人；智谱由清华 KEG 科研成果转化而来。", source: official("清华新闻", "https://www.tsinghua.edu.cn/info/1182/124487.htm"), verified: true },
  { id: "huang-industry", from: "minlie-huang", to: "minlie-huang", type: "industry", label: "CoAI 企业合作", evidence: "CoAI 官方页列出与华为、Google、Microsoft、Tencent、Alibaba、Meituan 等企业的合作。", source: profile("CoAI 主页", "https://hml.coai.cs.tsinghua.edu.cn/"), verified: true },

  { id: "pan-kan-lineage", from: "liangming-pan", to: "liangming-pan", type: "lineage", label: "博士导师：Min-Yen Kan", evidence: "北大官方讲座简介记录潘亮铭在 NUS 博士阶段由 Min-Yen Kan 指导。", source: official("北大菁英论坛", "https://cs.pku.edu.cn/info/1019/3191.htm"), verified: true },
  { id: "pan-feng-collab", from: "yansong-feng", to: "liangming-pan", type: "collaboration", label: "问题生成合作", evidence: "潘亮铭北大主页列出其与冯岩松共同署名的 ACL 2020 工作。", source: official("北大教师主页", "https://cs.pku.edu.cn/info/1090/3938.htm"), verified: true },

  { id: "fdu-wu-huang-lineage", from: "xuanjing-huang", to: "xuanjing-huang", type: "lineage", label: "导师：吴立德", evidence: "复旦校庆报道明确称吴立德指导黄萱菁成长。", source: official("复旦校庆报道", "https://news.fudan.edu.cn/2023/0527/c2610a135077/page.htm"), verified: true },
  { id: "fdu-wu-qiu-lineage", from: "xipeng-qiu", to: "xipeng-qiu", type: "lineage", label: "导师：吴立德", evidence: "复旦校庆报道明确称吴立德指导邱锡鹏成长。", source: official("复旦校庆报道", "https://news.fudan.edu.cn/2023/0527/c2610a135077/page.htm"), verified: true },
  { id: "fdu-huang-qiu", from: "xuanjing-huang", to: "xipeng-qiu", type: "collaboration", label: "复旦 NLP / MOSS 合作", evidence: "复旦官方报道与团队页记录两人共同指导论文并共同建设 MOSS。", source: official("复旦 CCL 报道", "https://news.fudan.edu.cn/2019/1031/c235a102620/page.htm"), verified: true },
  { id: "fdu-qiu-zhang", from: "xipeng-qiu", to: "qi-zhang-fdu", type: "collaboration", label: "MOSS 团队", evidence: "复旦官方 NLP 与大模型团队页将两人列为核心教师，并共同发布 MOSS。", source: official("复旦 NLP 与大模型团队", "https://iipl.fudan.edu.cn/NLPydmx/"), verified: true },
  { id: "fdu-qiu-gui", from: "xipeng-qiu", to: "tao-gui", type: "collaboration", label: "MOSS / 大模型团队", evidence: "复旦官方团队与年度成果记录将邱锡鹏、桂韬列为 MOSS 主要成员。", source: official("复旦 NLP 与大模型团队", "https://iipl.fudan.edu.cn/NLPydmx/"), verified: true },
  { id: "fdu-industry", from: "xipeng-qiu", to: "xipeng-qiu", type: "industry", label: "复旦 NLP 团队产学研合作", evidence: "团队官方页列出与荣耀、华为、百度、联想、科大讯飞等 20 余家企业开展成果转化与应用。", source: official("复旦 NLP 与大模型团队", "https://iipl.fudan.edu.cn/NLPydmx/"), verified: true },

  { id: "ruc-wen-dou", from: "jirong-wen", to: "zhicheng-dou", type: "collaboration", label: "智源智能检索方向", evidence: "人大公告列文继荣为智源“智能信息检索与挖掘”首席科学家、窦志成为项目经理。", source: official("人大高瓴公告", "https://ai.ruc.edu.cn/newslist/newsdetail/6db9dee6359348ca8038c909dbe977b6.htm"), verified: true },
  { id: "ruc-dou-industry", from: "zhicheng-dou", to: "zhicheng-dou", type: "industry", label: "多家大模型 / 搜索团队合作", evidence: "实验室主页列出与 Huawei、ByteDance、OPPO、Tencent、Kuaishou、Baidu、Baichuan、BAAI、MSRA、JD 等合作。", source: profile("窦志成主页", "https://playbigdata.ruc.edu.cn/dou/dou_cn.aspx"), verified: true },
  { id: "ruc-zhao-industry", from: "xin-zhao-ruc", to: "xin-zhao-ruc", type: "industry", label: "iFlytek / Baidu / MSRA 访问经历", evidence: "人大教师主页记录其在科大讯飞北京研究院、百度 AI 部门和微软亚洲研究院的访问经历。", source: official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/zx/index.htm"), verified: true },
  { id: "ruc-lin-tencent", from: "yankai-lin", to: "yankai-lin", type: "industry", label: "腾讯微信前高级研究员", evidence: "人大教师主页记录林衍凯 2019–2022 年任腾讯微信模式识别中心高级研究员。", source: official("人大教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/lyk/index.htm"), verified: true },

  { id: "hit-liu-che", from: "ting-liu-hit", to: "wanxiang-che", type: "collaboration", label: "NLP 研究所所长 / 副所长", evidence: "哈工大研究所公告列刘挺为所长、车万翔为副所长。", source: official("哈工大 NLP 研究所", "https://nlp.hit.edu.cn/2025/1209/c21123a384358/page.htm"), verified: true },
  { id: "hit-liu-qin", from: "ting-liu-hit", to: "bing-qin", type: "collaboration", label: "SCIR 组织与研究合作", evidence: "SCIR 成员页列刘挺为 NLP 研究所所长、秦兵为研究中心主任。", source: official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm"), verified: true },

  { id: "cas-zong-zhang", from: "chengqing-zong", to: "jiajun-zhang-cas", type: "collaboration", label: "机器翻译与语言模型合作", evidence: "张家俊官方主页列出多篇与宗成庆共同署名的机器翻译及语言模型论文。", source: official("自动化所主页", "https://www.ia.cas.cn/rcdw/qch/202404/t20240422_7129862.html"), verified: true },
  { id: "cas-zong-zhao", from: "chengqing-zong", to: "jun-zhao-cas", type: "collaboration", label: "机器翻译与 NLP 团队", evidence: "自动化所团队走访将宗成庆与赵军列为团队资深研究员。", source: official("自动化所团队走访", "https://www.ia.cas.cn/kxcb/kpwz/201311/t20131107_3969537.html"), verified: true },

  { id: "nju-chen-huang", from: "jiajun-chen-nju", to: "shujian-huang", type: "lineage", label: "导师 / 长期共同指导", evidence: "黄书剑主页写明其自本科起加入陈家骏领导的 NJUNLP，并列出多项共同指导学生成果。", source: profile("黄书剑主页", "https://nlp.nju.edu.cn/huangsj/"), verified: true },
  { id: "nju-huang-industry", from: "shujian-huang", to: "shujian-huang", type: "industry", label: "多家工业研究合作", evidence: "个人主页列出与 Baidu、Tencent、Alibaba、ByteDance、Huawei、ZTE、China Mobile 等工业实验室合作。", source: profile("黄书剑主页", "https://nlp.nju.edu.cn/huangsj/index.html"), verified: true },

  { id: "sjtu-yu-aispeech", from: "kai-yu-sjtu", to: "kai-yu-sjtu", type: "industry", label: "思必驰联合创始人 / 首席科学家", evidence: "上海交大教师主页明确记录其思必驰联合创始人及首席科学家身份。", source: official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/jiaoshiml/yukai.html"), verified: true },
  { id: "sjtu-gu-industry", from: "xiaodong-gu", to: "xiaodong-gu", type: "industry", label: "Huawei / Tencent 项目", evidence: "上海交大主页记录其主持或参与 Huawei、Tencent 等企业课题。", source: official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/en/jiaoshiml/guxiaodong.html"), verified: true },
];

export const mainlandCoverage = [
  { region: "Mainland China" as Region, institution: "THU", core: 5, adjacent: 0, note: "第一期覆盖 THUNLP 与基础模型研究中心的主要现任 PI；暂未穷举清华其他院系的泛 AI 教师" },
  { region: "Mainland China" as Region, institution: "PKU", core: 6, adjacent: 0, note: "从计算语言学研究所与学院 NLP 博导名录中选取方向最明确的资深与新晋 PI" },
  { region: "Mainland China" as Region, institution: "FDU", core: 7, adjacent: 0, note: "按复旦 NLP 官方教师名录与 NLP/大模型团队页收录，覆盖 MOSS 主轴和发展期 PI" },
  { region: "Mainland China" as Region, institution: "RUC", core: 6, adjacent: 0, note: "聚焦高瓴人工智能学院的大模型、智能检索、NLP、对齐与智能体群落" },
  { region: "Mainland China" as Region, institution: "HIT", core: 6, adjacent: 0, note: "以跨三校区 NLP 研究所和 SCIR 为主轴；完整教师名录更大，本期先收录主要负责人" },
  { region: "Mainland China" as Region, institution: "CAS-IA", core: 6, adjacent: 0, note: "以自动化所官方自然语言处理导师名录和紫东太初大模型中心为边界" },
  { region: "Mainland China" as Region, institution: "NJU", core: 6, adjacent: 0, note: "覆盖 NJUNLP、大语言模型研究组及知识图谱/多模态智能体新 PI" },
  { region: "Mainland China" as Region, institution: "SJTU", core: 4, adjacent: 2, note: "覆盖语音语言、生成式 AI 与新晋 NLP PI；代码大模型和行业 LLM 单列相邻层" },
];

export const mainlandCommunities = [
  { region: "Mainland China" as Region, kicker: "基础模型与知识主线", name: "THUNLP + Center for Foundation Models", anchor: "孙茂松 · 唐杰 · 刘知远 · 黄民烈 · 刘洋", description: "从中文 NLP、机器翻译与知识图谱延伸到 GLM、对话对齐和基础模型产业转化。", color: "cobalt" },
  { region: "Mainland China" as Region, kicker: "计算语言学传统", name: "PKU Institute of Computational Linguistics", anchor: "穗志方 · 常宝宝 · 孙栩 · 王厚峰 · 冯岩松 · 潘亮铭", description: "资深计算语言学、语言资源、问答与知识增强研究，叠加 2025 年回国的大模型推理新 PI。", color: "lime" },
  { region: "Mainland China" as Region, kicker: "实验室谱系 + 开源模型", name: "Fudan NLP & MOSS", anchor: "黄萱菁 · 邱锡鹏 · 张奇 · 桂韬", description: "吴立德开创的实验室传统延伸到 FudanNLP、FastNLP、MOSS、可信大模型和智能体。", color: "coral" },
  { region: "Mainland China" as Region, kicker: "搜索到智能体", name: "RUC Search, RAG & Agent Cluster", anchor: "文继荣 · 赵鑫 · 窦志成 · 王希廷 · 林衍凯 · 陈旭", description: "围绕生成式检索、RAG、对齐评测、工具学习与社会模拟形成密集的新 PI 群。", color: "violet" },
  { region: "Mainland China" as Region, kicker: "跨校区组织化研究", name: "HIT NLP Institute & SCIR", anchor: "刘挺 · 车万翔 · 秦兵 · 冯骁骋", description: "从 LTP、社会计算与情感分析延伸到预训练模型、思维链和生成式大模型。", color: "cobalt" },
  { region: "Mainland China" as Region, kicker: "科研院所大模型平台", name: "CAS-IA NLP & Zidong Taichu", anchor: "宗成庆 · 赵军 · 张家俊 · 刘康", description: "机器翻译、知识获取与多语言多模态大模型在科研院所平台内交汇。", color: "lime" },
  { region: "Mainland China" as Region, kicker: "多语言与新智能体", name: "NJU NLP & LLM Center", anchor: "陈家骏 · 戴新宇 · 黄书剑 · 张建兵 · 孙泽群", description: "传统机器翻译谱系向多语言大模型、知识推理、多模态和 computer-use agents 扩展。", color: "coral" },
  { region: "Mainland China" as Region, kicker: "语音语言与生成式 AI", name: "SJTU Language & Generative AI", anchor: "俞凯 · 赵海 · 刘鹏飞 · 吴小宝", description: "语音对话、语言理解、大模型对齐与多模态生成并行，并通过思必驰形成强产业转化节点。", color: "violet" },
];

export const mainlandIndustryPathways: IndustryPathway[] = [
  { id: "cn-thu-zhipu", region: "Mainland China", kind: "SPIN-OFF + JOINT RESEARCH", title: "清华 KEG / 基础模型中心 ↔ 智谱 AI", description: "智谱由清华 KEG 科研成果转化而来；唐杰为联合创始人，GLM/ChatGLM 构成该集群最明确的产业化主线。", source: official("清华新闻", "https://www.tsinghua.edu.cn/info/1182/124487.htm") },
  { id: "cn-thu-coai", region: "Mainland China", kind: "RESEARCH COLLABORATION", title: "清华 CoAI ↔ 多家互联网与科技公司", description: "CoAI 官方页列出 Huawei、Google、Microsoft、Samsung、Tencent、Alibaba、Sogou、Meituan 等合作组织。", source: profile("CoAI 主页", "https://hml.coai.cs.tsinghua.edu.cn/") },
  { id: "cn-fdu-industry", region: "Mainland China", kind: "TECH TRANSFER", title: "复旦 NLP / MOSS ↔ 荣耀、华为、百度、联想、科大讯飞等", description: "复旦团队页明确称与 20 余家企业开展产学研成果转化和应用。", source: official("复旦 NLP 与大模型团队", "https://iipl.fudan.edu.cn/NLPydmx/") },
  { id: "cn-ruc-labs", region: "Mainland China", kind: "JOINT LABS", title: "人大高瓴 ↔ 华为、快手、百川、联通、腾讯", description: "学院官方材料列出多家校企联合实验室；2026 年与腾讯进一步共建未来智能技术联合重点实验室。", source: official("人大高瓴培养简介", "https://ai.ruc.edu.cn/docs/2025-04/c6ed235ea8ed40c19656eca62b100e2f.pdf") },
  { id: "cn-ruc-dou", region: "Mainland China", kind: "LAB COLLABORATION", title: "窦志成团队 ↔ 搜索与大模型产业团队", description: "团队主页列出 Huawei、ByteDance、OPPO、Tencent、Kuaishou、Baidu、Baichuan、MSRA、JD 等合作，并为学生提供企业实习机会。", source: profile("窦志成主页", "https://playbigdata.ruc.edu.cn/dou/dou_cn.aspx") },
  { id: "cn-hit-baidu", region: "Mainland China", kind: "PART-TIME INDUSTRY ADVISOR", title: "哈工大 NLP 研究所 ↔ 百度", description: "SCIR 官方成员页列百度 CTO 王海峰为兼职博士生导师，构成研究所层面的直接产业连接。", source: official("SCIR 成员页", "https://ir.hit.edu.cn/19590/list.htm") },
  { id: "cn-nju-industry", region: "Mainland China", kind: "RESEARCH COLLABORATION", title: "黄书剑团队 ↔ 百度、腾讯、阿里、字节、华为等", description: "黄书剑主页列出与多家工业实验室在机器翻译和大模型方向的广泛合作。", source: profile("黄书剑主页", "https://nlp.nju.edu.cn/huangsj/index.html") },
  { id: "cn-sjtu-aispeech", region: "Mainland China", kind: "STARTUP + JOINT LAB", title: "俞凯 / 上海交大 ↔ 思必驰", description: "俞凯为思必驰联合创始人兼首席科学家，并建设上海交大—思必驰智能人机交互联合实验室。", source: official("上海交大教师主页", "https://www.cs.sjtu.edu.cn/jiaoshiml/yukai.html") },
];

const dongSource = official("人大高瓴董冠霆报道", "https://ai.ruc.edu.cn/newslist/newsdetail/20260203.html");
const hitLiSource = official("哈工大李忠阳博士答辩报道", "https://ir.hit.edu.cn/2021/0325/c19589a357055/page.htm");

export const mainlandGroupMembers: GroupMember[] = [
  { id: "dou-dong-guanting", teacherId: "zhicheng-dou", name: "董冠霆", role: "PhD Student · co-advised with Ji-Rong Wen", focus: "Intelligent retrieval · agent RL", source: dongSource },
];

export const mainlandStudentPlacements: StudentPlacement[] = [
  { id: "hit-li-zhongyang-huawei", student: "李忠阳", teacherId: "ting-liu-hit", company: "Huawei", department: "Genius Youth Program", role: "R&D researcher", kind: "first_job", highLevel: true, source: hitLiSource },
  { id: "ruc-dong-bytedance", student: "董冠霆", teacherId: "zhicheng-dou", company: "ByteDance", department: "Seed", role: "Research intern", kind: "internship", note: "与文继荣共同指导；官方报道记录其实习经历。", source: dongSource },
  { id: "ruc-dong-alibaba", student: "董冠霆", teacherId: "zhicheng-dou", company: "Alibaba", department: "Qwen", role: "Research intern", kind: "internship", note: "与文继荣共同指导；官方报道记录其实习经历。", source: dongSource },
  { id: "ruc-dong-kuaishou", student: "董冠霆", teacherId: "zhicheng-dou", company: "Kuaishou", department: "Kwai Large Model", role: "Research intern", kind: "internship", note: "与文继荣共同指导；官方报道记录其实习经历。", source: dongSource },
];
