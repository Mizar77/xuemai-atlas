import type { GroupMember, IndustryPathway, Person, Region, Relationship, Source } from "./data";

const official = (label: string, url: string): Source => ({ label, url, kind: "official" });

const zjuRoster = official("浙江大学 2026 研究生导师信息库", "https://www.cs.zju.edu.cn/_upload/article/files/d4/45/e46a2ca6469693738d84d1fffc3f/642ea7c2-932e-4023-b1bb-ce1618ee6c27.pdf");
const buptRoster = official("北邮人工智能学院导师名录", "https://ai.bupt.edu.cn/info/1050/2952.htm");
const sysuRoster = official("中山大学软件工程学院师资名录", "https://sse.sysu.edu.cn/teacher");
const whuRoster = official("武汉大学计算机学院教师名录", "https://jszy.whu.edu.cn/xyjslb.jsp?id=2012&lang=zh_CN&st=0&urltype=tsites.CollegeTeacherList&wbtreeid=1006");

export const mainlandPhase2People: Person[] = [
  // 浙江大学：知识引擎、NLP、多模态与新晋 Agent PI
  {
    id: "huajun-chen-zju", name: "Huajun Chen", chinese: "陈华钧", role: "Professor · Director, Knowledge Engine Lab", institution: "ZJU", region: "Mainland China",
    area: "Knowledge Graphs · NLP · Knowledge-enhanced LLM", tags: ["知识图谱", "NLP", "知识增强大模型", "OpenKG"], stage: "senior", category: "core",
    summary: "浙江大学知识引擎实验室负责人，研究知识图谱、自然语言处理、知识增强大模型与 AI for Science；兼具开源知识基础设施和校企联合实验室建设经验。",
    facts: [
      { label: "组织节点", value: "知识引擎实验室 / OpenKG", source: official("浙江大学个人主页", "https://mypage.zju.edu.cn/huajun/569215.html") },
      { label: "产业合作", value: "浙江大学—阿里巴巴知识引擎联合实验室主任", source: official("浙大科创中心", "https://hic.zju.edu.cn/ibct/2021/0903/c65955a2509758/page.htm") },
    ],
    sources: [official("浙江大学个人主页", "https://mypage.zju.edu.cn/huajun/569215.html"), zjuRoster], x: 150, y: 1190, primary: true,
  },
  {
    id: "siliang-tang-zju", name: "Siliang Tang", chinese: "汤斯亮", role: "Professor · PhD Advisor", institution: "ZJU", region: "Mainland China",
    area: "NLP · Multimodal LLM · Embodied AI", tags: ["NLP", "多模态大模型", "具身智能", "图神经网络"], stage: "senior", category: "core",
    summary: "浙江大学人工智能学院教授，研究自然语言处理、多模态大模型、具身智能与图神经网络，是语言与跨模态方向的重要 PI。",
    facts: [{ label: "研究主线", value: "语言—多模态—具身智能", source: official("浙江大学个人主页", "https://person.zju.edu.cn/siliang/0.html") }],
    sources: [official("浙江大学个人主页", "https://person.zju.edu.cn/siliang/0.html")], x: 150, y: 1245, primary: true,
  },
  {
    id: "weiming-lu-zju", name: "Weiming Lu", chinese: "鲁伟明", role: "Associate Professor · PhD Advisor", institution: "ZJU", region: "Mainland China",
    area: "NLP · Knowledge QA · LLM Agents", tags: ["信息抽取", "知识问答", "垂域大模型", "智能体"], stage: "senior", category: "core",
    summary: "围绕信息抽取、知识图谱与知识问答开展 NLP 研究，并延伸到垂域、多模态和推理大模型及智能体。",
    facts: [{ label: "平台", value: "数字图书馆与知识中心", source: official("浙江大学个人主页", "https://person.zju.edu.cn/lwm/678523.html") }],
    sources: [official("浙江大学个人主页", "https://person.zju.edu.cn/lwm/678523.html")], x: 150, y: 1300, primary: true,
  },
  {
    id: "shumin-deng-zju", name: "Shumin Deng", chinese: "邓淑敏", role: "Hundred Talents Researcher · PhD Advisor", institution: "ZJU", region: "Mainland China",
    area: "NLP · LLM Agents · Knowledge Mechanisms", tags: ["大模型智能体", "知识机理", "知识图谱", "新 PI"], stage: "emerging", category: "core",
    summary: "浙江大学人工智能学院百人计划研究员，研究自然语言处理、大模型智能体的知识机理、知识图谱与具身智能。",
    facts: [{ label: "独立 PI", value: "人工智能学院百人计划研究员、博导", source: official("浙江大学个人主页", "https://person.zju.edu.cn/shumin") }],
    sources: [official("浙江大学个人主页", "https://person.zju.edu.cn/shumin")], x: 150, y: 1355, primary: true,
  },
  {
    id: "qiang-zhang-zju", name: "Qiang Zhang", chinese: "张强", role: "Assistant Professor · Researcher", institution: "ZJU", region: "Mainland China",
    area: "NLP · Knowledge Graphs · Information Retrieval", tags: ["NLP", "知识图谱", "信息检索", "新 PI"], stage: "emerging", category: "core",
    summary: "ZJUI 助理教授、研究员，研究自然语言处理、知识图谱和信息检索；曾在伦敦大学学院完成博士与博士后训练。",
    facts: [{ label: "博士导师", value: "Emine Yilmaz（UCL）", source: official("ZJUI 教师主页", "https://zjui.zju.edu.cn/team/teacherinfo/2673") }],
    sources: [official("ZJUI 教师主页", "https://zjui.zju.edu.cn/team/teacherinfo/2673")], x: 150, y: 1410, primary: true,
  },

  // 中国科学技术大学：NLP、搜索推荐、多模态与大模型智能体
  {
    id: "yan-song-ustc", name: "Yan Song", chinese: "宋彦", role: "Professor · PhD Advisor", institution: "USTC", region: "Mainland China",
    area: "NLP · Text Representation · Large Models", tags: ["NLP", "信息抽取", "文本表示", "大模型"], stage: "senior", category: "core",
    summary: "中国科大教授，研究 NLP、信息检索与抽取、文本表征、多模态内容处理和大模型；加入高校前长期在微软与腾讯 AI 团队任职。",
    facts: [{ label: "产业履历", value: "微软、腾讯 AI 团队；微软小冰创始团队成员", source: official("中国科大导师主页", "https://dslx.ustc.edu.cn/?expertid=6569681&menu=expert_paper") }],
    sources: [official("中国科大导师主页", "https://dslx.ustc.edu.cn/?expertid=6569681&menu=expert_paper")], x: 440, y: 1190, primary: true,
  },
  {
    id: "defu-lian-ustc", name: "Defu Lian", chinese: "连德富", role: "Professor · Vice Dean", institution: "USTC", region: "Mainland China",
    area: "RAG · LLM Agents · Recommender Systems", tags: ["RAG", "智能体", "推荐系统", "ToolACE"], stage: "senior", category: "core",
    summary: "中国科大计算机学院副院长，研究大模型检索增强、智能体和科学智能，建设 Nexus、ToolACE 等系统。",
    facts: [{ label: "系统", value: "Nexus 检索系统与 ToolACE 工具调用模型", source: official("中国科大个人主页", "https://faculty.ustc.edu.cn/liandefu") }],
    sources: [official("中国科大个人主页", "https://faculty.ustc.edu.cn/liandefu")], x: 440, y: 1245, primary: true,
  },
  {
    id: "an-zhang-ustc", name: "An Zhang", chinese: "张岸", role: "Specially Appointed Professor · PhD Advisor", institution: "USTC", region: "Mainland China",
    area: "Generative Models · LLM Agents · Reasoning", tags: ["智能体", "复杂推理", "Scaling Law", "2025 新 PI"], stage: "emerging", category: "core",
    summary: "2025 年加入中国科大的新独立 PI，聚焦生成模型、大模型智能体、复杂推理、自我提升、多模态尺度律与安全。",
    facts: [{ label: "学术训练", value: "2021 年获 NUS 博士；2025 年加入中国科大", source: official("中国科大个人主页", "https://faculty.ustc.edu.cn/zhangan12/zh_CN/zdylm/999929/list/index.htm") }],
    sources: [official("中国科大个人主页", "https://faculty.ustc.edu.cn/zhangan12/zh_CN/zdylm/999929/list/index.htm")], x: 440, y: 1300, primary: true,
  },
  {
    id: "kai-zhang-ustc", name: "Kai Zhang", chinese: "张凯", role: "Associate Researcher · Master Advisor", institution: "USTC", region: "Mainland China",
    area: "NLP · Domain Adaptation · Efficient LLM", tags: ["语义表示", "领域适配", "知识注入", "轻量化大模型"], stage: "emerging", category: "core",
    summary: "研究细粒度语义表示、知识引导迁移和 NLP 领域适配，当前关注大模型知识注入、资源压缩与垂域工具。",
    facts: [{ label: "大模型方向", value: "知识注入、资源压缩与垂域大模型工具", source: official("中国科大个人主页", "https://faculty.ustc.edu.cn/zhangkai123/zh_CN/yjfx/986682/content/6220.htm") }],
    sources: [official("中国科大个人主页", "https://faculty.ustc.edu.cn/zhangkai123/zh_CN/yjfx/986682/content/6220.htm")], x: 440, y: 1355, primary: true,
  },
  {
    id: "zhendong-mao-ustc", name: "Zhendong Mao", chinese: "毛震东", role: "Professor · PhD Advisor", institution: "USTC", region: "Mainland China",
    area: "Multimodal Understanding · Pretrained Models", tags: ["多模态", "图文生成", "预训练大模型", "内容安全"], stage: "senior", category: "adjacent",
    summary: "长期研究多模态内容理解、图像文本生成、预训练大模型与网络内容安全，是中国科大语言—视觉交叉层的重要 PI。",
    facts: [{ label: "转化", value: "成果应用于媒体、公共部门与互联网企业", source: official("中国科大实验室主页", "https://leinao.ustc.edu.cn/2021/0910/c25925a522163/page.htm") }],
    sources: [official("中国科大实验室主页", "https://leinao.ustc.edu.cn/2021/0910/c25925a522163/page.htm")], x: 440, y: 1410, primary: true,
  },

  // 北京理工大学：语言智能、检索、垂域大模型
  {
    id: "heyan-huang-bit", name: "Heyan Huang", chinese: "黄河燕", role: "Professor · Lab Director", institution: "BIT", region: "Mainland China",
    area: "Language Intelligence · Domain LLM · Content Safety", tags: ["语言信息处理", "垂域大模型", "内容安全", "实验室带头人"], stage: "senior", category: "core",
    summary: "北京理工大学语言智能处理与内容安全重点实验室负责人，研究语言信息处理、垂域大模型与信息内容安全。",
    facts: [{ label: "组织节点", value: "语言智能处理与内容安全工信部重点实验室主任", source: official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml/bssds/172f42bb4b8742ce8d91e88e2680b0b0.htm") }],
    sources: [official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml/bssds/172f42bb4b8742ce8d91e88e2680b0b0.htm")], x: 730, y: 1190, primary: true,
  },
  {
    id: "huaping-zhang-bit", name: "Huaping Zhang", chinese: "张华平", role: "Distinguished Professor · Vice Dean", institution: "BIT", region: "Mainland China",
    area: "Multilingual NLP · Search · Data Mining", tags: ["NLPIR", "ICTCLAS", "多语种 NLP", "ChatBIT"], stage: "senior", category: "core",
    summary: "人工智能学院与计算机学院副院长、NLPIR 实验室主任，ICTCLAS 创始人，推动多语种 NLP、搜索挖掘及 ChatBIT 明理大模型。",
    facts: [{ label: "代表系统", value: "ICTCLAS / NLPIR / ChatBIT", source: official("北理工人工智能学院", "https://ai.bit.edu.cn/szdw/b02464e4a27b4084a9b3fd42afb4aae5.htm") }],
    sources: [official("北理工人工智能学院", "https://ai.bit.edu.cn/szdw/b02464e4a27b4084a9b3fd42afb4aae5.htm")], x: 730, y: 1245, primary: true,
  },
  {
    id: "dawei-song-bit", name: "Dawei Song", chinese: "宋大为", role: "Professor · Deputy Director, Key Lab", institution: "BIT", region: "Mainland China",
    area: "Information Retrieval · NLP · LLM Alignment", tags: ["信息检索", "模型蒸馏", "价值观对齐", "RAG"], stage: "senior", category: "core",
    summary: "研究信息检索、自然语言处理与认知信息获取，近年来重点推进大模型蒸馏、对齐、RAG 和推理优化。",
    facts: [{ label: "产业项目", value: "华为搜索 NLP、华夏银行量子计算与大模型项目", source: official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/0fc03ac63f2e4a1a9f0f9fb63c83e633.htm") }],
    sources: [official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/0fc03ac63f2e4a1a9f0f9fb63c83e633.htm")], x: 730, y: 1300, primary: true,
  },
  {
    id: "kan-li-bit", name: "Kan Li", chinese: "李侃", role: "Professor · PhD Advisor", institution: "BIT", region: "Mainland China",
    area: "Machine Learning · LLM Reasoning · Pattern Recognition", tags: ["大模型推理", "机器学习", "模式识别", "ACL"], stage: "senior", category: "core",
    summary: "研究机器学习、大语言模型与模式识别；官方论文与培养记录覆盖大模型多路径共识推理和 NLP 研究。",
    facts: [{ label: "培养记录", value: "2026 年校级优秀博士论文含大模型多路径共识推理", source: official("北理工研究生院", "https://grd.bit.edu.cn/docs/2026-06/3a70e96c52fd49cc969ad4aa6c19801a.pdf") }],
    sources: [official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/ccd1cee89da749eaaf31fde0c96b2163.htm")], x: 730, y: 1355, primary: true,
  },
  {
    id: "hongzheng-li-bit", name: "Hongzheng Li", chinese: "李洪政", role: "Tenure-track Associate Professor · PhD Advisor", institution: "BIT", region: "Mainland China",
    area: "NLP · LLM · Machine Translation", tags: ["NLP", "大语言模型", "机器翻译", "智慧教育"], stage: "emerging", category: "core",
    summary: "北京理工大学外国语学院长聘副教授、博导，研究自然语言处理、大语言模型、机器翻译与智慧教育，代表语言学—计算机交叉的新 PI。",
    facts: [{ label: "交叉方向", value: "外国语学院的 NLP / LLM 独立 PI", source: official("北理工教师主页", "https://sfl.bit.edu.cn/szdw/yyx/dd23086bcfd74ad5bce595974a8b36b2.htm") }],
    sources: [official("北理工教师主页", "https://sfl.bit.edu.cn/szdw/yyx/dd23086bcfd74ad5bce595974a8b36b2.htm")], x: 730, y: 1410, primary: true,
  },

  // 北京航空航天大学：NLP、数据智能与可信大模型新 PI 集群
  {
    id: "deqing-wang-buaa", name: "Deqing Wang", chinese: "王德庆", role: "Professor · PhD Advisor", institution: "BUAA", region: "Mainland China",
    area: "LLM · NLP · Graph Learning", tags: ["大模型", "NLP", "图神经网络", "科技情报"], stage: "senior", category: "core",
    summary: "北航计算机学院教授，研究大模型、自然语言处理、图神经网络及科技大数据分析与挖掘。",
    facts: [{ label: "平台", value: "国家科技资源共享服务工程技术研究中心总工", source: official("北航教师主页", "https://scse.buaa.edu.cn/info/1078/11323.htm") }],
    sources: [official("北航教师主页", "https://scse.buaa.edu.cn/info/1078/11323.htm")], x: 1020, y: 1190, primary: true,
  },
  {
    id: "feiran-huang-buaa", name: "Feiran Huang", chinese: "黄斐然", role: "Professor · PhD Advisor", institution: "BUAA", region: "Mainland China",
    area: "Natural Language Processing", tags: ["NLP", "语言理解", "计算机学院"], stage: "senior", category: "core",
    summary: "北航计算机学院教授、博导，以自然语言处理为主要研究方向，是该校稳定的语言技术 PI 节点。",
    facts: [{ label: "研究方向", value: "自然语言处理", source: official("北航教师主页", "https://shi.buaa.edu.cn/huangfeiran/zh_CN/yjfx/231635/content/6811.htm") }],
    sources: [official("北航教师主页", "https://shi.buaa.edu.cn/huangfeiran/zh_CN/yjfx/231635/content/6811.htm")], x: 1020, y: 1245, primary: true,
  },
  {
    id: "chongyang-tao-buaa", name: "Chongyang Tao", chinese: "陶重阳", role: "Associate Professor", institution: "BUAA", region: "Mainland China",
    area: "LLM Reasoning · Reward Models · Data Intelligence", tags: ["WizardLM", "长程推理", "奖励模型", "微软"], stage: "emerging", category: "core",
    summary: "北航新生代 NLP / LLM PI，研究长程交互推理、奖励模型、自进化学习与数据工程；加入高校前任微软高级研究科学家。",
    facts: [{ label: "产业履历", value: "微软小冰、Bing 与 WizardLM 研发", source: official("北航教师主页", "https://teacher.buaa.edu.cn/nlp/en/index.htm") }],
    sources: [official("北航教师主页", "https://teacher.buaa.edu.cn/nlp/en/index.htm")], x: 1020, y: 1300, primary: true,
  },
  {
    id: "junfan-chen-buaa", name: "Junfan Chen", chinese: "陈俊帆", role: "Associate Professor", institution: "BUAA", region: "Mainland China",
    area: "NLP · Knowledge Engineering · Intelligent Software", tags: ["低资源 NLP", "知识工程", "智能软件工程", "2025 新 PI"], stage: "emerging", category: "core",
    summary: "2025 年成为北航软件学院副教授，研究低标注数据场景下的 NLP、知识工程和智能软件工程。",
    facts: [{ label: "成长路径", value: "北航博士—博士后—2025 年独立 PI", source: official("北航教师主页", "https://teacher.buaa.edu.cn/chenjunfan1/en/index/222611/list/index.htm") }],
    sources: [official("北航教师主页", "https://teacher.buaa.edu.cn/chenjunfan1/en/index/222611/list/index.htm")], x: 1020, y: 1355, primary: true,
  },
  {
    id: "ruijie-wang-buaa", name: "Ruijie Wang", chinese: "王睿杰", role: "Professor · PhD Advisor", institution: "BUAA", region: "Mainland China",
    area: "Trustworthy LLM · Agents · Multimodal Foundation Models", tags: ["后训练", "智能体", "多模态基础模型", "2025 新 PI"], stage: "emerging", category: "core",
    summary: "2025 年入职北航的青年 PI，研究大模型对齐微调、复杂推理、智能体与结构化知识驱动的多模态基础模型。",
    facts: [{ label: "产业履历", value: "加入北航前在 Amazon 从事大模型研究", source: official("北航教师主页", "https://scse.buaa.edu.cn/info/1546/12281.htm") }],
    sources: [official("北航教师主页", "https://scse.buaa.edu.cn/info/1546/12281.htm")], x: 1020, y: 1410, primary: true,
  },

  // 北京邮电大学：语言理解、对话、语音与大模型安全
  {
    id: "xiaojie-wang-bupt", name: "Xiaojie Wang", chinese: "王小捷", role: "Professor · Center Director", institution: "BUPT", region: "Mainland China",
    area: "Chinese NLP · Language Understanding · Dialogue", tags: ["中文信息处理", "语言理解", "人机对话", "课程群"], stage: "senior", category: "core",
    summary: "北邮智能科学与技术中心主任，长期研究中文自然语言处理、理解与生成、人机对话、信息检索和信息抽取。",
    facts: [{ label: "组织节点", value: "智能科学与技术中心主任、自然语言处理课程群带头人", source: official("北邮中心主页", "https://scs.bupt.edu.cn/xygk/jgsz/dsjx/znkxyjszx_.htm") }],
    sources: [official("北邮中心主页", "https://scs.bupt.edu.cn/xygk/jgsz/dsjx/znkxyjszx_.htm"), buptRoster], x: 150, y: 1710, primary: true,
  },
  {
    id: "caixia-yuan-bupt", name: "Caixia Yuan", chinese: "袁彩霞", role: "Associate Professor · Master Advisor", institution: "BUPT", region: "Mainland China",
    area: "NLP · Human-machine Dialogue · Multi-agent Dialogue", tags: ["NLP", "人机对话", "多智能体对话"], stage: "senior", category: "core",
    summary: "北邮人工智能学院 NLP 教师，研究自然语言处理、人机对话与多智能体对话。",
    facts: [{ label: "研究方向", value: "自然语言处理、人机与多智能体对话", source: official("北邮招生网", "https://zsb.bupt.edu.cn/info/1004/1111.htm") }],
    sources: [official("北邮招生网", "https://zsb.bupt.edu.cn/info/1004/1111.htm"), buptRoster], x: 150, y: 1765, primary: true,
  },
  {
    id: "ya-li-bupt", name: "Ya Li", chinese: "李雅", role: "Associate Professor · PhD Advisor", institution: "BUPT", region: "Mainland China",
    area: "Speech LLM · Affective Dialogue · Speech Understanding", tags: ["语音大模型", "情感对话", "语音理解", "多模态"], stage: "emerging", category: "core",
    summary: "北邮人工智能学院副教授、博导，研究可控语音合成大模型、语音内容理解、情感合成与个性化对话。",
    facts: [{ label: "当前项目", value: "可控语音合成大模型研究", source: official("北邮教师主页", "https://teacher.bupt.edu.cn/liya/zh_CN/kyxm/216807/list/index.htm") }],
    sources: [official("北邮教师主页", "https://teacher.bupt.edu.cn/liya/zh_CN/kyxm/216807/list/index.htm")], x: 150, y: 1820, primary: true,
  },
  {
    id: "dongliang-xie-bupt", name: "Dongliang Xie", chinese: "谢东亮", role: "Professor · Center Director", institution: "BUPT", region: "Mainland China",
    area: "Multimodal Context · NLP · Knowledge Graphs", tags: ["多模态", "NLP", "知识图谱", "人机协同"], stage: "senior", category: "adjacent",
    summary: "北邮人机协同与人工智能联合实验室主任，研究文本、音频、视频多模态上下文计算、NLP 与知识图谱。",
    facts: [{ label: "毕业生态", value: "主页列学生进入运营商、华为及多家国内外互联网公司", source: official("北邮教师主页", "https://scs.bupt.edu.cn/info/1289/2755.htm") }],
    sources: [official("北邮教师主页", "https://scs.bupt.edu.cn/info/1289/2755.htm")], x: 150, y: 1875, primary: true,
  },
  {
    id: "da-xiao-bupt", name: "Da Xiao", chinese: "肖达", role: "Associate Professor", institution: "BUPT", region: "Mainland China",
    area: "LLM Security · NLP · Program Analysis", tags: ["大模型安全", "可解释性", "NLP", "程序分析"], stage: "emerging", category: "adjacent",
    summary: "北邮网安学院副教授，研究大模型基础架构与可解释性，以及大模型在 NLP、程序分析和软件安全中的应用。",
    facts: [{ label: "学术训练", value: "清华大学计算机系博士", source: official("北邮网安学院", "https://scss.bupt.edu.cn/szdw/jsml/rjaqzx1.htm") }],
    sources: [official("北邮网安学院", "https://scss.bupt.edu.cn/szdw/jsml/rjaqzx1.htm")], x: 150, y: 1930, primary: true,
  },

  // 西安交通大学：大模型原理、自然语言理解与新晋可信 AI PI
  {
    id: "ning-ding-xjtu", name: "Ning Ding", chinese: "丁宁", role: "Professor · PhD Advisor", institution: "XJTU", region: "Mainland China",
    area: "LLM Principles · NLP · Speech", tags: ["大模型原理", "NLP", "语音", "阿里巴巴"], stage: "senior", category: "core",
    summary: "西安交大人工智能学院教授，研究大模型原理与应用、自然语言处理、语音和人机交互；入校前在阿里巴巴任算法总监。",
    facts: [{ label: "产业履历", value: "2020–2023 阿里巴巴算法总监", source: official("西安交大教师主页", "https://gr.xjtu.edu.cn/dingning/") }],
    sources: [official("西安交大教师主页", "https://gr.xjtu.edu.cn/dingning/")], x: 440, y: 1710, primary: true,
  },
  {
    id: "jun-liu-xjtu", name: "Jun Liu", chinese: "刘均", role: "Professor · PhD Advisor", institution: "XJTU", region: "Mainland China",
    area: "Natural Language Understanding · Vision · Intelligent Education", tags: ["自然语言理解", "智慧教育", "多模态", "知识工程"], stage: "senior", category: "core",
    summary: "西安交大计算机学院教授，长期研究自然语言理解、计算机视觉和智慧教育，是语言智能与教育应用的资深节点。",
    facts: [{ label: "研究主线", value: "自然语言理解、计算机视觉、智慧教育", source: official("西安交大教师主页", "https://faculty.xjtu.edu.cn/liukeen/zh_CN/zdylm/997556/list/index.htm") }],
    sources: [official("西安交大教师主页", "https://faculty.xjtu.edu.cn/liukeen/zh_CN/zdylm/997556/list/index.htm")], x: 440, y: 1765, primary: true,
  },
  {
    id: "peilin-jiang-xjtu", name: "Peilin Jiang", chinese: "姜沛林", role: "Associate Professor · PhD Advisor", institution: "XJTU", region: "Mainland China",
    area: "Natural Language Understanding · Pattern Recognition", tags: ["自然语言理解", "NLP 教学", "模式识别"], stage: "senior", category: "core",
    summary: "西安交大人工智能学院副教授、博导，研究自然语言理解、模式识别与智能系统，并长期承担自然语言处理课程。",
    facts: [{ label: "学术服务", value: "中国人工智能学会自然语言理解专委会委员", source: official("西安交大教师主页", "https://faculty.xjtu.edu.cn/pljiang/zh_CN/index.htm") }],
    sources: [official("西安交大教师主页", "https://faculty.xjtu.edu.cn/pljiang/zh_CN/index.htm")], x: 440, y: 1820, primary: true,
  },
  {
    id: "huiqi-deng-xjtu", name: "Huiqi Deng", chinese: "邓辉琦", role: "Assistant Professor · Master Advisor", institution: "XJTU", region: "Mainland China",
    area: "Trustworthy LLM · Agent Safety · Explainability", tags: ["可信推理", "智能体安全", "可解释性", "发展期 PI"], stage: "emerging", category: "core",
    summary: "研究大模型与智能体的可信推理、可解释性、安全评测和防护，并探索网络配置与药物发现等交叉应用。",
    facts: [{ label: "入职", value: "2024 年加入西安交大计算机学院", source: official("西安交大教师主页", "https://faculty.xjtu.edu.cn/denghq7/zh_CN/zdylm/1000526/list/index.htm") }],
    sources: [official("西安交大教师主页", "https://faculty.xjtu.edu.cn/denghq7/zh_CN/zdylm/1000526/list/index.htm")], x: 440, y: 1875, primary: true,
  },
  {
    id: "wenbin-an-xjtu", name: "Wenbin An", chinese: "安文斌", role: "Assistant Professor · Master Advisor", institution: "XJTU", region: "Mainland China",
    area: "Multimodal LLM · RAG · Agents", tags: ["多模态大模型", "RAG", "幻觉", "2026 新 PI"], stage: "emerging", category: "core",
    summary: "2026 年加入西安交大的新 PI，研究多模态大模型、检索增强、幻觉消除、智能体和智慧教育。",
    facts: [{ label: "入职", value: "2026 年加入计算机科学与技术学院", source: official("西安交大教师主页", "https://faculty.xjtu.edu.cn/anwenbin/zh_CN/yjgk/1040042/list/index.htm") }],
    sources: [official("西安交大教师主页", "https://faculty.xjtu.edu.cn/anwenbin/zh_CN/yjgk/1040042/list/index.htm")], x: 440, y: 1930, primary: true,
  },

  // 中山大学：神经符号、生成模型、软件工程与 LLM
  {
    id: "yongmei-liu-sysu", name: "Yongmei Liu", chinese: "刘咏梅", role: "Professor · PhD Advisor", institution: "SYSU", region: "Mainland China",
    area: "Knowledge Representation · NLP · LLM Reasoning", tags: ["知识表示推理", "神经符号", "大模型推理", "智能体"], stage: "senior", category: "core",
    summary: "中山大学教授，研究知识表示与推理、NLP、多智能体和智能规划，探索符号逻辑与大模型、强化学习的结合。",
    facts: [{ label: "研究主线", value: "神经符号 AI 与下一代推理智能体", source: official("中山大学教师主页", "https://cse.sysu.edu.cn/teacher/LiuYongmei") }],
    sources: [official("中山大学教师主页", "https://cse.sysu.edu.cn/teacher/LiuYongmei")], x: 730, y: 1710, primary: true,
  },
  {
    id: "qinliang-su-sysu", name: "Qinliang Su", chinese: "苏勤亮", role: "Associate Professor · PhD Advisor", institution: "SYSU", region: "Mainland China",
    area: "Generative Models · LLM · Multi-agent Systems", tags: ["生成模型", "LLM", "多智能体", "多模态"], stage: "senior", category: "core",
    summary: "研究生成模型、大语言模型、多智能体与多模态理解；组页明确记录毕业生主要进入字节、腾讯、阿里或继续深造。",
    facts: [{ label: "毕业生态", value: "组页称毕业生主要进入字节、腾讯、阿里或海内外高校", source: official("中山大学教师主页", "https://cse.sysu.edu.cn/teacher/SuQinliang") }],
    sources: [official("中山大学教师主页", "https://cse.sysu.edu.cn/teacher/SuQinliang")], x: 730, y: 1765, primary: true,
  },
  {
    id: "jingping-liu-sysu", name: "Jingping Liu", chinese: "刘井平", role: "Associate Professor · PhD Advisor", institution: "SYSU", region: "Mainland China",
    area: "LLM Training · Agents · NLP", tags: ["大模型训练", "智能体", "NLP", "知识工程"], stage: "emerging", category: "core",
    summary: "中山大学软件工程学院副教授、博导，研究大模型训练与推理、智能体、NLP 和知识工程，并与多家互联网企业开展合作。",
    facts: [{ label: "产业合作", value: "华为、美团、蚂蚁、阿里等企业项目", source: official("中山大学教师主页", "https://sse.sysu.edu.cn/teacher/985") }],
    sources: [official("中山大学教师主页", "https://sse.sysu.edu.cn/teacher/985")], x: 730, y: 1820, primary: true,
  },
  {
    id: "yanlin-wang-sysu", name: "Yanlin Wang", chinese: "王焱林", role: "Associate Professor · Master Advisor", institution: "SYSU", region: "Mainland China",
    area: "LLM · NLP · Intelligent Software Engineering", tags: ["代码大模型", "大模型安全", "模型记忆", "MSRA"], stage: "emerging", category: "core",
    summary: "中山大学百人计划副教授，研究大模型、NLP 与智能软件工程；入校前任微软亚洲研究院主管研究员。",
    facts: [{ label: "产业履历", value: "微软亚洲研究院前主管研究员", source: official("中山大学教师主页", "https://sse.sysu.edu.cn/teacher/329") }],
    sources: [official("中山大学教师主页", "https://sse.sysu.edu.cn/teacher/329")], x: 730, y: 1875, primary: true,
  },
  {
    id: "hai-wan-sysu", name: "Hai Wan", chinese: "万海", role: "Professor · PhD Advisor", institution: "SYSU", region: "Mainland China",
    area: "Knowledge Representation · Trustworthy LLM · Formal Methods", tags: ["可信大模型", "形式化方法", "知识推理", "神经符号"], stage: "senior", category: "adjacent",
    summary: "研究人工智能基础理论、知识表示与推理、可信大模型和形式化方法，是中大大模型推理与可靠性相邻层的重要 PI。",
    facts: [{ label: "研究主线", value: "知识表示推理、可信大模型与形式化方法", source: official("中山大学教师主页", "https://cse.sysu.edu.cn/teacher/WanHai") }],
    sources: [official("中山大学教师主页", "https://cse.sysu.edu.cn/teacher/WanHai"), sysuRoster], x: 730, y: 1930, primary: true,
  },

  // 华东师范大学：教育大模型、语言认知与新晋 NLP PI
  {
    id: "aimin-zhou-ecnu", name: "Aimin Zhou", chinese: "周爱民", role: "Professor · Director, Institute of AI Education", institution: "ECNU", region: "Mainland China",
    area: "LLM · Agent Systems · Intelligent Education", tags: ["大语言模型", "智能体", "智能教育", "AI4Science"], stage: "senior", category: "core",
    summary: "华东师大上海智能教育研究院院长、前计算机学院院长，研究大语言模型、智能体系统、智能教育与科学智能。",
    facts: [{ label: "组织节点", value: "上海智能教育研究院院长、上海创智学院全时导师", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/zam/main.psp") }],
    sources: [official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/zam/main.psp")], x: 1020, y: 1710, primary: true,
  },
  {
    id: "xiaofeng-he-ecnu", name: "Xiaofeng He", chinese: "何晓丰", role: "Professor · PhD Advisor", institution: "ECNU", region: "Mainland China",
    area: "NLP · LLM Editing · Hallucination & Reasoning", tags: ["模型编辑", "幻觉", "推理", "垂域大模型"], stage: "senior", category: "core",
    summary: "研究 NLP 与垂域大模型，当前聚焦模型编辑、幻觉、推理和强化学习；曾在 Yahoo Labs 与微软搜索技术中心工作。",
    facts: [{ label: "产业履历", value: "Yahoo Labs、微软搜索技术中心", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/hxf/main.psp") }],
    sources: [official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/hxf/main.psp")], x: 1020, y: 1765, primary: true,
  },
  {
    id: "yan-yang-ecnu", name: "Yan Yang", chinese: "杨艳", role: "Associate Professor", institution: "ECNU", region: "Mainland China",
    area: "Language Cognition · LLM · Dialogue Systems", tags: ["语言认知", "大语言模型", "多智能体", "对话系统"], stage: "senior", category: "core",
    summary: "研究语言认知与知识计算，包括大语言模型、多智能体、推理决策、问答和对话系统。",
    facts: [{ label: "应用", value: "通讯、医疗、金融、教育与文化场景", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/yy2/main.psp") }],
    sources: [official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/yy2/main.psp")], x: 1020, y: 1820, primary: true,
  },
  {
    id: "jie-zhou-ecnu", name: "Jie Zhou", chinese: "周杰", role: "Young Researcher · PhD Advisor", institution: "ECNU", region: "Mainland China",
    area: "Continual Learning · LLM · Agents", tags: ["持续学习", "大模型", "智能体", "EduChat"], stage: "emerging", category: "core",
    summary: "华东师大青年研究员、上海 AI 实验室双聘，研究持续学习、大模型和智能体，带领团队开源 AutoSkill 与 EduChat。",
    facts: [{ label: "博士后导师", value: "黄萱菁（复旦 NLP，2021–2023）", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/zj2/main.psp") }],
    sources: [official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/zj2/main.psp")], x: 1020, y: 1875, primary: true,
  },
  {
    id: "fei-tan-ecnu", name: "Fei Tan", chinese: "谈飞", role: "Associate Professor · PhD Advisor", institution: "ECNU", region: "Mainland China",
    area: "NLP · LLM · Intelligent Education", tags: ["NLP", "大语言模型", "智能教育", "产业转化"], stage: "emerging", category: "core",
    summary: "上海智能教育研究院副教授、博导，研究 NLP 和大语言模型在智能教育中的应用，具有多段工业研究与技术管理经历。",
    facts: [{ label: "产业履历", value: "Adobe、Yahoo、小红书、商汤科技", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s47/tf2/list.psp") }],
    sources: [official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s47/tf2/list.psp")], x: 1020, y: 1930, primary: true,
  },

  // 武汉大学：NLP、大模型安全、金融与医学大模型
  {
    id: "min-peng-whu", name: "Min Peng", chinese: "彭敏", role: "Professor · Head, Department of AI", institution: "WHU", region: "Mainland China",
    area: "NLP · LLM · Financial Intelligence", tags: ["NLP", "大模型", "金融智能", "PIXIU"], stage: "senior", category: "core",
    summary: "武汉大学人工智能系主任，研究人工智能、自然语言处理与大模型，团队建设金融大模型、产业知识图谱等方向。",
    facts: [{ label: "代表工作", value: "金融大模型与评测基准 PIXIU", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/pengmin/zh_CN/zhym/166810/list/index.htm") }],
    sources: [official("武汉大学教师主页", "https://jszy.whu.edu.cn/pengmin/zh_CN/zhym/166810/list/index.htm")], x: 150, y: 2230, primary: true,
  },
  {
    id: "tieyun-qian-whu", name: "Tieyun Qian", chinese: "钱铁云", role: "Professor · PhD Advisor", institution: "WHU", region: "Mainland China",
    area: "NLP · LLM Safety · Knowledge Reasoning", tags: ["大模型安全", "对齐", "幻觉检测", "知识问答"], stage: "senior", category: "core",
    summary: "武汉大学教授，研究 NLP、Web 数据挖掘与大模型安全，重点覆盖对齐、泛化、毒性与幻觉检测、隐私保护和知识推理。",
    facts: [{ label: "当前项目", value: "面向大语言模型的文本内容无害化治理", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/qiantieyun/en/index/236186/list/index.htm") }],
    sources: [official("武汉大学教师主页", "https://jszy.whu.edu.cn/qiantieyun/en/index/236186/list/index.htm")], x: 150, y: 2285, primary: true,
  },
  {
    id: "fei-li-whu", name: "Fei Li", chinese: "李霏", role: "Associate Professor · PhD Advisor", institution: "WHU", region: "Mainland China",
    area: "NLP · Information Extraction · LLM Security", tags: ["信息抽取", "情感计算", "大模型安全", "NLP"], stage: "senior", category: "core",
    summary: "武汉大学国家网络安全学院副教授、博导，研究信息抽取、情感计算、大模型及相关安全问题。",
    facts: [{ label: "教学", value: "长期讲授自然语言处理与 AI 实训", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/lifei10/zh_CN/index.htm") }],
    sources: [official("武汉大学教师主页", "https://jszy.whu.edu.cn/lifei10/zh_CN/index.htm")], x: 150, y: 2340, primary: true,
  },
  {
    id: "juhua-liu-whu", name: "Juhua Liu", chinese: "刘菊华", role: "Professor · PhD Advisor", institution: "WHU", region: "Mainland China",
    area: "Language & Multimodal LLM · Medical AI", tags: ["语言大模型", "多模态", "医学 AI", "织女"], stage: "senior", category: "core",
    summary: "研究语言/多模态大模型与医学 AI，曾联合京东探索研究院训练织女 V1/V2，并建设多个医疗语言和多模态模型。",
    facts: [{ label: "产业合作", value: "联合京东探索研究院训练织女 V1/V2", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/liujuhua1/zh_CN/index.htm") }],
    sources: [official("武汉大学教师主页", "https://jszy.whu.edu.cn/liujuhua1/zh_CN/index.htm"), whuRoster], x: 150, y: 2395, primary: true,
  },
  {
    id: "yongcheng-jing-whu", name: "Yongcheng Jing", chinese: "静永程", role: "Professor · PhD Advisor", institution: "WHU", region: "Mainland China",
    area: "Efficient LLM Inference · AI for Healthcare", tags: ["大模型推理", "高效推理", "医疗 AI", "2026 新 PI"], stage: "emerging", category: "core",
    summary: "2026 年加入武汉大学计算机学院的新 PI，长期研究大语言模型高效推理，当前聚焦人工智能与医疗交叉。",
    facts: [{ label: "成长路径", value: "悉尼大学博士；悉尼大学、NTU 博士后；2026 加入武大", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/jingyongcheng/zh_CN/index/1731728/list/index.htm") }],
    sources: [official("武汉大学教师主页", "https://jszy.whu.edu.cn/jingyongcheng/zh_CN/index/1731728/list/index.htm")], x: 150, y: 2450, primary: true,
  },
];

export const mainlandPhase2Relationships: Relationship[] = [
  { id: "zju-chen-alibaba", from: "huajun-chen-zju", to: "huajun-chen-zju", type: "industry", label: "浙大—阿里知识引擎联合实验室", evidence: "浙江大学官方介绍列陈华钧为浙江大学—阿里巴巴知识引擎联合实验室主任。", source: official("浙大科创中心", "https://hic.zju.edu.cn/ibct/2021/0903/c65955a2509758/page.htm"), verified: true },
  { id: "zju-zhang-yilmaz", from: "qiang-zhang-zju", to: "qiang-zhang-zju", type: "lineage", label: "博士导师：Emine Yilmaz", evidence: "ZJUI 官方简介记录张强在 UCL 师从信息检索学者 Emine Yilmaz。", source: official("ZJUI 教师主页", "https://zjui.zju.edu.cn/team/teacherinfo/2673"), verified: true },
  { id: "ustc-song-industry", from: "yan-song-ustc", to: "yan-song-ustc", type: "industry", label: "微软 / 腾讯 AI 前核心研究员", evidence: "中国科大官方导师简介记录宋彦曾在微软、腾讯 AI 团队任职，并参与微软小冰早期建设。", source: official("中国科大导师主页", "https://dslx.ustc.edu.cn/?expertid=6569681&menu=expert_paper"), verified: true },
  { id: "bit-huang-song-org", from: "heyan-huang-bit", to: "dawei-song-bit", type: "collaboration", label: "语言智能与社会计算研究组织", evidence: "北理工官方教师页将两人列入语言智能相关研究组织，宋大为兼任工信部重点实验室副主任。", source: official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/0fc03ac63f2e4a1a9f0f9fb63c83e633.htm"), verified: true },
  { id: "bit-song-huawei", from: "dawei-song-bit", to: "dawei-song-bit", type: "industry", label: "华为搜索 NLP 合作", evidence: "教师主页列其负责华为终端搜索场景下自然语言处理技术项目。", source: official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/0fc03ac63f2e4a1a9f0f9fb63c83e633.htm"), verified: true },
  { id: "buaa-tao-microsoft", from: "chongyang-tao-buaa", to: "chongyang-tao-buaa", type: "industry", label: "微软前高级研究科学家", evidence: "北航官方主页记录其参与微软小冰、Bing 和 WizardLM 系列模型研发。", source: official("北航教师主页", "https://teacher.buaa.edu.cn/nlp/en/index.htm"), verified: true },
  { id: "buaa-wang-amazon", from: "ruijie-wang-buaa", to: "ruijie-wang-buaa", type: "industry", label: "Amazon 大模型研究经历", evidence: "北航官方主页记录王睿杰入职前在 Amazon 负责电商大模型后训练与落地。", source: official("北航教师主页", "https://scse.buaa.edu.cn/info/1546/12281.htm"), verified: true },
  { id: "bupt-wang-yuan-org", from: "xiaojie-wang-bupt", to: "caixia-yuan-bupt", type: "collaboration", label: "北邮 NLP / 对话群落", evidence: "北邮人工智能学院导师名录同时列出王小捷与袁彩霞，中心介绍将语言理解、生成和对话列为核心方向。", source: buptRoster, verified: true },
  { id: "xjtu-ding-alibaba", from: "ning-ding-xjtu", to: "ning-ding-xjtu", type: "industry", label: "阿里巴巴前算法总监", evidence: "西安交大教师主页记录丁宁 2020–2023 年任阿里巴巴算法总监。", source: official("西安交大教师主页", "https://gr.xjtu.edu.cn/dingning/"), verified: true },
  { id: "sysu-liu-industry", from: "jingping-liu-sysu", to: "jingping-liu-sysu", type: "industry", label: "华为 / 美团 / 蚂蚁 / 阿里合作", evidence: "中山大学教师主页列出其主持或技术负责的多项企业合作及成果落地。", source: official("中山大学教师主页", "https://sse.sysu.edu.cn/teacher/985"), verified: true },
  { id: "sysu-wang-msra", from: "yanlin-wang-sysu", to: "yanlin-wang-sysu", type: "industry", label: "微软亚洲研究院前主管研究员", evidence: "中山大学教师主页记录王焱林加入中大前任微软亚洲研究院主管研究员。", source: official("中山大学教师主页", "https://sse.sysu.edu.cn/teacher/329"), verified: true },
  { id: "ecnu-huang-zhou", from: "xuanjing-huang", to: "jie-zhou-ecnu", type: "lineage", label: "博士后合作导师", evidence: "华东师大教师主页记录周杰 2021–2023 年在复旦 NLP 实验室做博士后，合作导师为黄萱菁。", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s16/zj2/main.psp"), verified: true },
  { id: "ecnu-tan-industry", from: "fei-tan-ecnu", to: "fei-tan-ecnu", type: "industry", label: "Adobe / Yahoo / 小红书 / 商汤经历", evidence: "华东师大官方简介列出谈飞在四家公司的研究和技术管理经历。", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s47/tf2/list.psp"), verified: true },
  { id: "whu-liu-jd", from: "juhua-liu-whu", to: "juhua-liu-whu", type: "industry", label: "京东探索研究院联合训练", evidence: "武汉大学主页记录团队与京东探索研究院联合训练织女 V1/V2。", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/liujuhua1/zh_CN/index.htm"), verified: true },
];

export const mainlandPhase2Coverage = [
  { region: "Mainland China" as Region, institution: "ZJU", core: 5, adjacent: 0, note: "覆盖知识引擎、人工智能学院和 ZJUI 的 NLP、知识增强、多模态与智能体 PI" },
  { region: "Mainland China" as Region, institution: "USTC", core: 4, adjacent: 1, note: "覆盖 NLP、RAG/推荐、大模型智能体与多模态语言相邻层；含 2025 年新 PI" },
  { region: "Mainland China" as Region, institution: "BIT", core: 5, adjacent: 0, note: "以语言智能处理、NLPIR、信息检索与垂域大模型为主轴，含语言学交叉 PI" },
  { region: "Mainland China" as Region, institution: "BUAA", core: 5, adjacent: 0, note: "覆盖传统 NLP、科技数据智能和 2025 年后入职的大模型推理/智能体新 PI" },
  { region: "Mainland China" as Region, institution: "BUPT", core: 3, adjacent: 2, note: "覆盖语言理解与对话、语音大模型，并单列多模态计算和大模型安全相邻层" },
  { region: "Mainland China" as Region, institution: "XJTU", core: 5, adjacent: 0, note: "覆盖自然语言理解、大模型原理、可信智能体及 2026 年多模态/RAG 新 PI" },
  { region: "Mainland China" as Region, institution: "SYSU", core: 4, adjacent: 1, note: "覆盖神经符号推理、生成模型、NLP 与代码大模型，可信形式化方向单列相邻层" },
  { region: "Mainland China" as Region, institution: "ECNU", core: 5, adjacent: 0, note: "以教育大模型、语言认知、持续学习和产业转化为主线，记录与复旦 NLP 的培养链" },
  { region: "Mainland China" as Region, institution: "WHU", core: 5, adjacent: 0, note: "覆盖金融 NLP、大模型安全、信息抽取、医学语言模型及 2026 年高效推理新 PI" },
];

export const mainlandPhase2Communities = [
  { region: "Mainland China" as Region, kicker: "知识增强与多模态", name: "ZJU Knowledge + Language Intelligence", anchor: "陈华钧 · 汤斯亮 · 鲁伟明 · 邓淑敏 · 张强", description: "知识图谱、NLP、多模态大模型与智能体在知识引擎和人工智能学院两条组织线上交汇。", color: "cobalt" },
  { region: "Mainland China" as Region, kicker: "搜索推荐到智能体", name: "USTC NLP, RAG & Agent Cluster", anchor: "宋彦 · 连德富 · 张岸 · 张凯 · 毛震东", description: "从文本表示、搜索推荐延伸到 RAG、工具调用、复杂推理和多模态模型。", color: "lime" },
  { region: "Mainland China" as Region, kicker: "语言智能与垂域模型", name: "BIT Language Intelligence", anchor: "黄河燕 · 张华平 · 宋大为 · 李侃 · 李洪政", description: "语言信息处理传统向 ChatBIT、模型蒸馏、对齐、RAG 和智慧教育扩展。", color: "coral" },
  { region: "Mainland China" as Region, kicker: "新 PI 密集增长", name: "BUAA NLP & Trustworthy LLM", anchor: "王德庆 · 黄斐然 · 陶重阳 · 陈俊帆 · 王睿杰", description: "传统 NLP 与近年从微软、Amazon 回流的大模型推理、对齐和智能体 PI 形成新集群。", color: "violet" },
  { region: "Mainland China" as Region, kicker: "语言、语音与安全", name: "BUPT Language & Speech Intelligence", anchor: "王小捷 · 袁彩霞 · 李雅 · 谢东亮 · 肖达", description: "中文理解、对话和语音大模型，与多模态人机协同及大模型安全相连接。", color: "cobalt" },
  { region: "Mainland China" as Region, kicker: "大模型原理与可信智能", name: "XJTU LLM & NLU Cluster", anchor: "丁宁 · 刘均 · 姜沛林 · 邓辉琦 · 安文斌", description: "自然语言理解、语音和智慧教育主线，叠加可信智能体、多模态 RAG 新 PI。", color: "lime" },
  { region: "Mainland China" as Region, kicker: "神经符号与软件智能", name: "SYSU Reasoning & LLM Cluster", anchor: "刘咏梅 · 苏勤亮 · 刘井平 · 王焱林 · 万海", description: "符号推理、生成模型、代码智能和可信大模型构成多条互补路线。", color: "coral" },
  { region: "Mainland China" as Region, kicker: "教育大模型", name: "ECNU EduChat & Language Cognition", anchor: "周爱民 · 何晓丰 · 杨艳 · 周杰 · 谈飞", description: "教育大模型、语言认知、持续学习和产业经验围绕上海智能教育研究院汇聚。", color: "violet" },
  { region: "Mainland China" as Region, kicker: "安全、金融与医学", name: "WHU Domain LLM Cluster", anchor: "彭敏 · 钱铁云 · 李霏 · 刘菊华 · 静永程", description: "从通用 NLP 延伸到金融、无害化治理、医学大模型和高效推理。", color: "cobalt" },
];

export const mainlandPhase2IndustryPathways: IndustryPathway[] = [
  { id: "cn-zju-alibaba", region: "Mainland China", kind: "JOINT LAB", title: "浙江大学知识引擎 ↔ 阿里巴巴", description: "陈华钧任浙江大学—阿里巴巴知识引擎联合实验室主任，形成知识图谱与知识增强大模型的明确产学研连接。", source: official("浙大科创中心", "https://hic.zju.edu.cn/ibct/2021/0903/c65955a2509758/page.htm") },
  { id: "cn-ustc-industry", region: "Mainland China", kind: "INDUSTRY-TO-ACADEMIA", title: "中国科大 NLP ↔ 微软 / 腾讯", description: "宋彦加入中国科大前在微软和腾讯 AI 团队从事 NLP 研发，并参与微软小冰早期建设。", source: official("中国科大导师主页", "https://dslx.ustc.edu.cn/?expertid=6569681&menu=expert_paper") },
  { id: "cn-bit-industry", region: "Mainland China", kind: "APPLIED RESEARCH", title: "北理工语言智能 ↔ 华为 / 金融机构", description: "宋大为主页记录华为搜索 NLP 与华夏银行大模型项目；NLPIR 还承担多语种和行业情报系统转化。", source: official("北理工教师主页", "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/0fc03ac63f2e4a1a9f0f9fb63c83e633.htm") },
  { id: "cn-buaa-industry", region: "Mainland China", kind: "INDUSTRY-TO-ACADEMIA", title: "北航新 PI ↔ Microsoft / Amazon", description: "陶重阳与王睿杰分别从微软、Amazon 的大模型研究岗位进入北航，连接对话、WizardLM、电商后训练与高校研究。", source: official("北航教师主页", "https://teacher.buaa.edu.cn/nlp/en/index.htm") },
  { id: "cn-bupt-industry", region: "Mainland China", kind: "TALENT PIPELINE", title: "北邮人机协同 ↔ 运营商 / 华为 / 互联网企业", description: "谢东亮主页概括毕业生进入三大运营商、华为、Ericsson 及多家国内外互联网企业；当前暂无公开姓名级完整表。", source: official("北邮教师主页", "https://scs.bupt.edu.cn/info/1289/2755.htm") },
  { id: "cn-xjtu-alibaba", region: "Mainland China", kind: "INDUSTRY-TO-ACADEMIA", title: "西安交大大模型 PI ↔ 阿里巴巴", description: "丁宁在加入西安交大前任阿里巴巴算法总监，主页同时明确团队提供阿里、字节等企业实习机会。", source: official("西安交大教师主页", "https://gr.xjtu.edu.cn/dingning/") },
  { id: "cn-sysu-industry", region: "Mainland China", kind: "RESEARCH COLLABORATION", title: "中大软件智能 ↔ 华为 / 美团 / 蚂蚁 / 阿里", description: "刘井平官方主页列出多家企业合作与上线成果；王焱林从微软亚洲研究院进入中大。", source: official("中山大学教师主页", "https://sse.sysu.edu.cn/teacher/985") },
  { id: "cn-ecnu-industry", region: "Mainland China", kind: "INDUSTRY-TO-ACADEMIA", title: "华东师大智能教育 ↔ Adobe / Yahoo / 小红书 / 商汤", description: "谈飞的工业研究和管理经历将核心算法、推荐/内容平台与教育大模型连接起来。", source: official("华东师大教师主页", "https://faculty.ecnu.edu.cn/_s47/tf2/list.psp") },
  { id: "cn-whu-jd", region: "Mainland China", kind: "JOINT MODEL DEVELOPMENT", title: "武汉大学大模型团队 ↔ 京东探索研究院", description: "刘菊华团队与京东探索研究院联合训练织女 V1/V2，并将大模型路线延伸到医学语言与多模态模型。", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/liujuhua1/zh_CN/index.htm") },
];

export const mainlandPhase2GroupMembers: GroupMember[] = [
  { id: "bit-song-zhangchen", teacherId: "dawei-song-bit", name: "张辰", role: "PhD Student", focus: "LLM distillation · alignment · reasoning", source: official("北理工学院新闻", "https://cs.bit.edu.cn/xyxw/f0bb162f4173439382355f27f568793b.htm") },
  { id: "whu-liu-zhongqihuang", teacherId: "juhua-liu-whu", name: "钟起煌", role: "PhD Student", focus: "Domain LLM fine-tuning · medical LLM", source: official("武汉大学教师主页", "https://jszy.whu.edu.cn/liujuhua1/zh_CN/index.htm") },
];
