import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-28";

type PersonEnhancement = Partial<Pick<Person, "summary" | "tags" | "facts" | "sources" | "status" | "lastVerifiedAt" | "knownAlumniCount">>;
type RawProfile = {
  id: string;
  name: string;
  institution: string;
  role: string;
  area: string;
  tags: string[];
  summary: string;
  basis: { label: string; url: string; kind: Source["kind"] };
  extra: { label: string; url: string };
};

const rawProfiles: RawProfile[] = [
  { id: "minlie-huang", name: "黄民烈", institution: "THU", role: "Professor · Deputy Director, Center for Foundation Models", area: "Conversational AI · LLM Alignment · AI Safety", tags: ["对话系统","LLM 对齐","安全伦理","CoAI"], summary: "CoAI 负责人、基础模型研究中心副主任，聚焦语言生成、对话、大模型对齐、安全伦理与社会智能。", basis: { label: "清华教师主页", url: "https://www.cs.tsinghua.edu.cn/info/1121/5620.htm", kind: "official" }, extra: { label: "清华大学计算机系教师名录", url: "https://www.cs.tsinghua.edu.cn/szdw/jsml.htm" } },
  { id: "yang-liu-thu", name: "刘洋", institution: "THU", role: "Professor", area: "Machine Translation · Natural Language Processing", tags: ["机器翻译","NLP","THUMT","THUNLP"], summary: "THUNLP 机器翻译与自然语言处理 PI，长期建设数据驱动机器翻译算法与系统。", basis: { label: "清华教师主页", url: "https://www.cs.tsinghua.edu.cn/info/1121/3575.htm", kind: "official" }, extra: { label: "清华大学计算机系教师名录", url: "https://www.cs.tsinghua.edu.cn/szdw/jsml.htm" } },
  { id: "zhifang-sui", name: "穗志方", institution: "PKU", role: "Professor", area: "Computational Linguistics · NLP", tags: ["计算语言学","NLP","语言资源"], summary: "北京大学计算语言学研究所资深 PI；列入学院自然语言处理博士生导师名录。", basis: { label: "北大计算机学院导师名录", url: "https://cs.pku.edu.cn/zsxx/yjszs/dsxx.htm", kind: "official" }, extra: { label: "北京大学计算机学院师资队伍", url: "https://cs.pku.edu.cn/szdw.htm" } },
  { id: "baobao-chang", name: "常宝宝", institution: "PKU", role: "Associate Professor", area: "Computational Linguistics · Parsing · NLP", tags: ["句法语义","中文分词","NLP"], summary: "研究计算语言学、中文分词、句法与语义分析，是北大计算语言学研究所核心教师之一。", basis: { label: "北大教师主页", url: "https://cs.pku.edu.cn/info/1210/1966.htm", kind: "official" }, extra: { label: "北京大学计算机学院师资队伍", url: "https://cs.pku.edu.cn/szdw.htm" } },
  { id: "yansong-feng", name: "冯岩松", institution: "PKU", role: "Professor", area: "NLP · Knowledge-enhanced Language Models", tags: ["NLP","知识增强","问答","信息抽取"], summary: "北大自然语言处理博士生导师，研究知识增强语言理解、信息抽取与问答。", basis: { label: "北大计算机学院导师名录", url: "https://cs.pku.edu.cn/zsxx/yjszs/dsxx.htm", kind: "official" }, extra: { label: "北京大学计算机学院师资队伍", url: "https://cs.pku.edu.cn/szdw.htm" } },
  { id: "liangming-pan", name: "潘亮铭", institution: "PKU", role: "Assistant Professor · Researcher", area: "LLM Reasoning · Interpretability · NLP", tags: ["大模型推理","可解释性","事实核查","2025 新 PI"], summary: "2025 年加入北大的新独立 PI，研究大模型推理、机理可解释性与可靠生成；博士毕业于 NUS。", basis: { label: "北大教师主页", url: "https://cs.pku.edu.cn/info/1090/3938.htm", kind: "official" }, extra: { label: "北京大学计算机学院师资队伍", url: "https://cs.pku.edu.cn/szdw.htm" } },
  { id: "xipeng-qiu", name: "邱锡鹏", institution: "FDU", role: "Professor · MOSS Lead", area: "NLP · Deep Learning · Foundation Models", tags: ["MOSS","FastNLP","NLP","可信大模型"], summary: "复旦 NLP 与大模型团队核心 PI，负责 MOSS，主持 FudanNLP 与 FastNLP 等开源工作。", basis: { label: "复旦教师主页", url: "https://ai.fudan.edu.cn/3e/e4/c25921a278244/page.htm", kind: "official" }, extra: { label: "复旦大学 NLP 教师名录", url: "https://nlp.fudan.edu.cn/28695/list.htm" } },
  { id: "qi-zhang-fdu", name: "张奇", institution: "FDU", role: "Professor", area: "NLP · Information Retrieval", tags: ["NLP","信息检索","可解释性","MOSS"], summary: "研究自然语言处理、信息检索与模型可理解分析，是复旦 NLP 与 MOSS 团队核心成员。", basis: { label: "复旦教师主页", url: "https://iipl.fudan.edu.cn/7f/c0/c45855a688064/page.htm", kind: "official" }, extra: { label: "复旦大学计算机学院师资队伍", url: "https://cs.fudan.edu.cn/39009/list.htm" } },
  { id: "yixin-cao-fdu", name: "曹艺馨", institution: "FDU", role: "Young Researcher · PhD Advisor", area: "NLP · Knowledge-enhanced LLMs", tags: ["知识增强","LLM","NLP","发展期 PI"], summary: "复旦 NLP 实验室青年研究员、博导；本图将其作为公开名录中的发展期独立 PI 收录。", basis: { label: "复旦 NLP 教师名录", url: "https://nlp.fudan.edu.cn/28695/list.htm", kind: "official" }, extra: { label: "复旦 NLP 与大模型团队", url: "https://iipl.fudan.edu.cn/NLPydmx/" } },
  { id: "yaqian-zhou", name: "周雅倩", institution: "FDU", role: "Associate Professor", area: "Natural Language Processing · Foundation Models", tags: ["NLP","大模型","语言理解"], summary: "复旦 NLP 与大模型团队现任副教授，参与团队的大模型与语言理解研究。", basis: { label: "复旦 NLP 教师名录", url: "https://nlp.fudan.edu.cn/28695/list.htm", kind: "official" }, extra: { label: "复旦大学计算机学院师资队伍", url: "https://cs.fudan.edu.cn/39009/list.htm" } },
  { id: "xiaoqing-zheng", name: "郑骁庆", institution: "FDU", role: "Associate Professor", area: "Natural Language Processing · Machine Learning", tags: ["NLP","机器学习","语言模型"], summary: "复旦 NLP 与大模型团队现任副教授，研究自然语言处理与机器学习。", basis: { label: "复旦 NLP 教师名录", url: "https://nlp.fudan.edu.cn/28695/list.htm", kind: "official" }, extra: { label: "复旦大学计算机学院师资队伍", url: "https://cs.fudan.edu.cn/39009/list.htm" } },
  { id: "tao-gui", name: "桂韬", institution: "FDU", role: "Associate Professor", area: "LLM Agents · Robust & Interpretable NLP", tags: ["LLM Agents","信息抽取","鲁棒性","可解释性"], summary: "从信息抽取、鲁棒性与可解释性延伸到大模型智能体，是复旦 NLP 团队的新生代独立 PI。", basis: { label: "复旦 NLP 教师名录", url: "https://nlp.fudan.edu.cn/28695/list.htm", kind: "official" }, extra: { label: "复旦 NLP 与大模型团队", url: "https://iipl.fudan.edu.cn/NLPydmx/" } },
  { id: "zhicheng-dou", name: "窦志成", institution: "RUC", role: "Tenured Professor · Vice Dean", area: "Generative Retrieval · RAG · AI Agents", tags: ["信息检索","RAG","智能体","FlashRAG"], summary: "高瓴副院长，聚焦生成式检索、RAG、深度搜索和智能体；团队开源 FlashRAG、WebThinker、ARPO 等系统。", basis: { label: "人大教师主页", url: "https://ai.ruc.edu.cn/academicfaculty/szdwn/dzc/2019bb0ea0db41b1bed636b91f8355ce.htm", kind: "official" }, extra: { label: "中国人民大学高瓴人工智能学院师资队伍", url: "https://ai.ruc.edu.cn/academicfaculty/szdwn/index.htm" } },
  { id: "yankai-lin", name: "林衍凯", institution: "RUC", role: "Pre-tenure Associate Professor", area: "Pretrained Models · NLP · Tool-using Agents", tags: ["预训练模型","工具学习","智能体","腾讯微信"], summary: "清华博士、腾讯微信前高级研究员，现研究预训练模型、自然语言处理与工具使用智能体。", basis: { label: "人大教师主页", url: "https://ai.ruc.edu.cn/academicfaculty/szdwn/lyk/index.htm", kind: "official" }, extra: { label: "中国人民大学高瓴人工智能学院师资队伍", url: "https://ai.ruc.edu.cn/academicfaculty/szdwn/index.htm" } },
  { id: "xu-chen-ruc", name: "陈旭", institution: "RUC", role: "Pre-tenure Associate Professor", area: "LLM Agents · Social Simulation · Reinforcement Learning", tags: ["LLM Agents","社会模拟","强化学习","玉兰-万象"], summary: "研究大模型智能体、社会科学模拟、强化学习与因果推断，建设“玉兰-万象”社会模拟平台。", basis: { label: "人大教师主页", url: "https://ai.ruc.edu.cn/academicfaculty/szdwn/cx/751e55616ca84df5b48bf3244d40d53b.htm", kind: "official" }, extra: { label: "中国人民大学高瓴人工智能学院师资队伍", url: "https://ai.ruc.edu.cn/academicfaculty/szdwn/index.htm" } },
  { id: "weinan-zhang-hit", name: "张伟男", institution: "HIT", role: "Professor", area: "Dialogue · Social Computing · LLM", tags: ["对话系统","社会计算","大模型","SCIR"], summary: "SCIR 教授，研究对话、社会计算与大模型相关方法。", basis: { label: "SCIR 成员页", url: "https://ir.hit.edu.cn/19590/list.htm", kind: "official" }, extra: { label: "哈工大自然语言处理研究所", url: "https://nlp.hit.edu.cn/" } },
  { id: "xiaocheng-feng", name: "冯骁骋", institution: "HIT", role: "Professor", area: "Text Generation · Large Language Models", tags: ["文本生成","大模型","思维链","发展期 PI"], summary: "SCIR 新生代教授，研究复杂文本生成、大模型与推理方法。", basis: { label: "SCIR 成员页", url: "https://ir.hit.edu.cn/19590/list.htm", kind: "official" }, extra: { label: "哈工大人工智能学院教师名录", url: "https://sai.hit.edu.cn/zrjs/list.htm" } },
  { id: "yanyan-zhao-hit", name: "赵妍妍", institution: "HIT", role: "Professor", area: "Social Computing · Natural Language Processing", tags: ["社会计算","NLP","文本分析"], summary: "SCIR 教授，研究社会计算与自然语言处理。", basis: { label: "SCIR 成员页", url: "https://ir.hit.edu.cn/19590/list.htm", kind: "official" }, extra: { label: "哈工大自然语言处理研究所", url: "https://nlp.hit.edu.cn/" } },
  { id: "jiajun-zhang-cas", name: "张家俊", institution: "CAS-IA", role: "Research Professor · Zidong Taichu Center", area: "Multilingual & Multimodal LLMs · NLP", tags: ["紫东太初","多语言","多模态大模型","机器翻译"], summary: "紫东太初大模型研究中心研究员，研究自然语言处理、多语言多模态大模型与应用。", basis: { label: "自动化所主页", url: "https://www.ia.cas.cn/rcdw/qch/202404/t20240422_7129862.html", kind: "official" }, extra: { label: "中科院自动化所人才队伍", url: "https://www.ia.cas.cn/rcdw/" } },
  { id: "kang-liu-cas", name: "刘康", institution: "CAS-IA", role: "Research Professor", area: "NLP · Knowledge Acquisition · Large Models", tags: ["NLP","知识获取","大模型","信息抽取"], summary: "自动化所自然语言处理导师，研究知识获取、信息抽取与语言模型。", basis: { label: "中科院自动化所 NLP 导师名录", url: "https://www.ia.cas.cn/yjsjy/dsjj/index.html", kind: "official" }, extra: { label: "中科院自动化所人才队伍", url: "https://www.ia.cas.cn/rcdw/" } },
  { id: "shizhu-he", name: "何世柱", institution: "CAS-IA", role: "Research Professor", area: "NLP · Knowledge Graphs · Language Models", tags: ["知识图谱","NLP","语言模型"], summary: "自动化所自然语言处理导师，方向覆盖知识图谱、语言理解与语言模型。", basis: { label: "中科院自动化所 NLP 导师名录", url: "https://www.ia.cas.cn/yjsjy/dsjj/index.html", kind: "official" }, extra: { label: "中科院自动化所人才队伍", url: "https://www.ia.cas.cn/rcdw/" } },
  { id: "yu-zhou-cas", name: "周玉", institution: "CAS-IA", role: "Research Professor", area: "Natural Language Processing · Machine Translation", tags: ["NLP","机器翻译","语言理解"], summary: "自动化所自然语言处理导师，长期属于机器翻译与 NLP 团队。", basis: { label: "中科院自动化所 NLP 导师名录", url: "https://www.ia.cas.cn/yjsjy/dsjj/index.html", kind: "official" }, extra: { label: "中科院自动化所人才队伍", url: "https://www.ia.cas.cn/rcdw/" } },
  { id: "shujian-huang", name: "黄书剑", institution: "NJU", role: "Professor · LLM Group Lead", area: "Multilingual LLMs · Machine Translation · Reasoning", tags: ["多语言大模型","机器翻译","推理","强化学习"], summary: "南京大学大语言模型研究小组负责人，聚焦多语言能力、知识学习、推理与机器翻译。", basis: { label: "个人主页", url: "https://nlp.nju.edu.cn/huangsj/", kind: "profile" }, extra: { label: "南京大学 NLP 人员名录", url: "https://nlp.nju.edu.cn/people.html" } },
  { id: "feng-yang-nju", name: "冯洋", institution: "NJU", role: "Professor · PhD Advisor", area: "Natural Language Processing · Machine Translation", tags: ["NLP","机器翻译","大模型"], summary: "南京大学计算机学院 NLP 与机器翻译方向博导。", basis: { label: "南京大学教师主页", url: "https://cs.nju.edu.cn/38/52/c2641a473170/pagem.htm", kind: "official" }, extra: { label: "南京大学 NLP 人员名录", url: "https://nlp.nju.edu.cn/people.html" } },
  { id: "jianbing-zhang", name: "张建兵", institution: "NJU", role: "Associate Professor · PhD Advisor", area: "Multimodal LLMs · Computer-use Agents · AI4Science", tags: ["多模态大模型","Computer-use Agent","AI4Science","发展期 PI"], summary: "从图文生成发展到多模态大模型、数字智能体与 AI4Science 的独立 PI。", basis: { label: "南京大学教师主页", url: "https://cs.nju.edu.cn/zhangjb/index.htm", kind: "official" }, extra: { label: "南京大学 NLP 人员名录", url: "https://nlp.nju.edu.cn/people.html" } },
  { id: "zequn-sun", name: "孙泽群", institution: "NJU", role: "Tenure-track Assistant Professor", area: "Knowledge Graphs · Large Language Models", tags: ["知识图谱","大模型","表示学习","青年 PI"], summary: "知识图谱与大语言模型方向的青年独立 PI，主持国自然青年基金与腾讯犀牛鸟项目。", basis: { label: "南京大学教师主页", url: "https://cs.nju.edu.cn/95/2d/c56396a628013/page.htm", kind: "official" }, extra: { label: "南京大学 NLP 人员名录", url: "https://nlp.nju.edu.cn/people.html" } },
  { id: "xiaobao-wu", name: "吴小宝", institution: "SJTU", role: "Assistant Professor", area: "Natural Language Processing · Large Language Models", tags: ["NLP","大模型","可靠性","2026 新 PI"], summary: "2026 年加入上海交大的新独立 PI，博士毕业于 NTU，研究自然语言处理与大语言模型。", basis: { label: "上海交大教师主页", url: "https://www.cs.sjtu.edu.cn/jiaoshiml/wuxiaobao.html", kind: "official" }, extra: { label: "上海交通大学计算机学院教师名录", url: "https://www.cs.sjtu.edu.cn/jiaoshiml/index.html" } },
  { id: "yaohui-jin", name: "金耀辉", institution: "SJTU", role: "Tenured Professor · Chief Engineer, AI Institute", area: "LLM Enhancement & Applications · AI4Science", tags: ["大模型增强","智慧司法","AI4Science","数据治理"], summary: "上海交大人工智能研究院总工程师，研究大模型增强与行业应用、智慧司法和 AI4Science。", basis: { label: "上海交大教师主页", url: "https://www.cs.sjtu.edu.cn/en/jiaoshiml/jinyaohui.html", kind: "official" }, extra: { label: "上海交通大学计算机学院教师名录", url: "https://www.cs.sjtu.edu.cn/jiaoshiml/index.html" } },
  { id: "siliang-tang-zju", name: "汤斯亮", institution: "ZJU", role: "Professor · PhD Advisor", area: "NLP · Multimodal LLM · Embodied AI", tags: ["NLP","多模态大模型","具身智能","图神经网络"], summary: "浙江大学人工智能学院教授，研究自然语言处理、多模态大模型、具身智能与图神经网络，是语言与跨模态方向的重要 PI。", basis: { label: "浙江大学个人主页", url: "https://person.zju.edu.cn/siliang/0.html", kind: "official" }, extra: { label: "浙江大学计算机学院师资队伍", url: "https://www.cs.zju.edu.cn/csen/27011/list.htm" } },
  { id: "weiming-lu-zju", name: "鲁伟明", institution: "ZJU", role: "Associate Professor · PhD Advisor", area: "NLP · Knowledge QA · LLM Agents", tags: ["信息抽取","知识问答","垂域大模型","智能体"], summary: "围绕信息抽取、知识图谱与知识问答开展 NLP 研究，并延伸到垂域、多模态和推理大模型及智能体。", basis: { label: "浙江大学个人主页", url: "https://person.zju.edu.cn/lwm/678523.html", kind: "official" }, extra: { label: "浙江大学计算机学院师资队伍", url: "https://www.cs.zju.edu.cn/csen/27011/list.htm" } },
  { id: "shumin-deng-zju", name: "邓淑敏", institution: "ZJU", role: "Hundred Talents Researcher · PhD Advisor", area: "NLP · LLM Agents · Knowledge Mechanisms", tags: ["大模型智能体","知识机理","知识图谱","新 PI"], summary: "浙江大学人工智能学院百人计划研究员，研究自然语言处理、大模型智能体的知识机理、知识图谱与具身智能。", basis: { label: "浙江大学个人主页", url: "https://person.zju.edu.cn/shumin", kind: "official" }, extra: { label: "浙江大学计算机学院师资队伍", url: "https://www.cs.zju.edu.cn/csen/27011/list.htm" } },
  { id: "qiang-zhang-zju", name: "张强", institution: "ZJU", role: "Assistant Professor · Researcher", area: "NLP · Knowledge Graphs · Information Retrieval", tags: ["NLP","知识图谱","信息检索","新 PI"], summary: "ZJUI 助理教授、研究员，研究自然语言处理、知识图谱和信息检索；曾在伦敦大学学院完成博士与博士后训练。", basis: { label: "ZJUI 教师主页", url: "https://zjui.zju.edu.cn/team/teacherinfo/2673", kind: "official" }, extra: { label: "浙江大学计算机学院师资队伍", url: "https://www.cs.zju.edu.cn/csen/27011/list.htm" } },
  { id: "defu-lian-ustc", name: "连德富", institution: "USTC", role: "Professor · Vice Dean", area: "RAG · LLM Agents · Recommender Systems", tags: ["RAG","智能体","推荐系统","ToolACE"], summary: "中国科大计算机学院副院长，研究大模型检索增强、智能体和科学智能，建设 Nexus、ToolACE 等系统。", basis: { label: "中国科大个人主页", url: "https://faculty.ustc.edu.cn/liandefu", kind: "official" }, extra: { label: "中国科学技术大学导师遴选系统", url: "https://dslx.ustc.edu.cn/" } },
  { id: "an-zhang-ustc", name: "张岸", institution: "USTC", role: "Specially Appointed Professor · PhD Advisor", area: "Generative Models · LLM Agents · Reasoning", tags: ["智能体","复杂推理","Scaling Law","2025 新 PI"], summary: "2025 年加入中国科大的新独立 PI，聚焦生成模型、大模型智能体、复杂推理、自我提升、多模态尺度律与安全。", basis: { label: "中国科大个人主页", url: "https://faculty.ustc.edu.cn/zhangan12/zh_CN/zdylm/999929/list/index.htm", kind: "official" }, extra: { label: "中国科学技术大学导师遴选系统", url: "https://dslx.ustc.edu.cn/" } },
  { id: "kai-zhang-ustc", name: "张凯", institution: "USTC", role: "Associate Researcher · Master Advisor", area: "NLP · Domain Adaptation · Efficient LLM", tags: ["语义表示","领域适配","知识注入","轻量化大模型"], summary: "研究细粒度语义表示、知识引导迁移和 NLP 领域适配，当前关注大模型知识注入、资源压缩与垂域工具。", basis: { label: "中国科大个人主页", url: "https://faculty.ustc.edu.cn/zhangkai123/zh_CN/yjfx/986682/content/6220.htm", kind: "official" }, extra: { label: "中国科学技术大学导师遴选系统", url: "https://dslx.ustc.edu.cn/" } },
  { id: "zhendong-mao-ustc", name: "毛震东", institution: "USTC", role: "Professor · PhD Advisor", area: "Multimodal Understanding · Pretrained Models", tags: ["多模态","图文生成","预训练大模型","内容安全"], summary: "长期研究多模态内容理解、图像文本生成、预训练大模型与网络内容安全，是中国科大语言—视觉交叉层的重要 PI。", basis: { label: "中国科大实验室主页", url: "https://leinao.ustc.edu.cn/2021/0910/c25925a522163/page.htm", kind: "official" }, extra: { label: "中国科学技术大学导师遴选系统", url: "https://dslx.ustc.edu.cn/" } },
  { id: "heyan-huang-bit", name: "黄河燕", institution: "BIT", role: "Professor · Lab Director", area: "Language Intelligence · Domain LLM · Content Safety", tags: ["语言信息处理","垂域大模型","内容安全","实验室带头人","中科院计算所","北理工前院长"], summary: "北理工特聘教授、语言智能处理与内容安全工信部重点实验室主任，研究语言信息处理、大模型垂域应用与内容安全；曾任北理工计算机学院院长，并有长期中科院计算所研究经历。", basis: { label: "北理工教师主页", url: "https://cs.bit.edu.cn/szdw/jsml/bssds/172f42bb4b8742ce8d91e88e2680b0b0.htm", kind: "official" }, extra: { label: "北京理工大学人工智能学院师资队伍", url: "https://ai.bit.edu.cn/szdw/" } },
  { id: "dawei-song-bit", name: "宋大为", institution: "BIT", role: "Professor · Deputy Director, Key Lab", area: "Information Retrieval · NLP · LLM Alignment", tags: ["信息检索","模型蒸馏","价值观对齐","RAG"], summary: "研究信息检索、自然语言处理与认知信息获取，近年来重点推进大模型蒸馏、对齐、RAG 和推理优化。", basis: { label: "北理工教师主页", url: "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/0fc03ac63f2e4a1a9f0f9fb63c83e633.htm", kind: "official" }, extra: { label: "北京理工大学人工智能学院师资队伍", url: "https://ai.bit.edu.cn/szdw/" } },
  { id: "kan-li-bit", name: "李侃", institution: "BIT", role: "Professor · PhD Advisor", area: "Machine Learning · LLM Reasoning · Pattern Recognition", tags: ["大模型推理","机器学习","模式识别","ACL"], summary: "研究机器学习、大语言模型与模式识别；官方论文与培养记录覆盖大模型多路径共识推理和 NLP 研究。", basis: { label: "北理工教师主页", url: "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/ccd1cee89da749eaaf31fde0c96b2163.htm", kind: "official" }, extra: { label: "北京理工大学人工智能学院师资队伍", url: "https://ai.bit.edu.cn/szdw/" } },
  { id: "hongzheng-li-bit", name: "李洪政", institution: "BIT", role: "Tenure-track Associate Professor · PhD Advisor", area: "NLP · LLM · Machine Translation", tags: ["NLP","大语言模型","机器翻译","智慧教育"], summary: "北京理工大学外国语学院长聘副教授、博导，研究自然语言处理、大语言模型、机器翻译与智慧教育，代表语言学—计算机交叉的新 PI。", basis: { label: "北理工教师主页", url: "https://sfl.bit.edu.cn/szdw/yyx/dd23086bcfd74ad5bce595974a8b36b2.htm", kind: "official" }, extra: { label: "北京理工大学人工智能学院师资队伍", url: "https://ai.bit.edu.cn/szdw/" } },
  { id: "feiran-huang-buaa", name: "黄斐然", institution: "BUAA", role: "Professor · PhD Advisor", area: "Natural Language Processing", tags: ["NLP","语言理解","计算机学院"], summary: "北航计算机学院教授、博导，以自然语言处理为主要研究方向，是该校稳定的语言技术 PI 节点。", basis: { label: "北航教师主页", url: "https://shi.buaa.edu.cn/huangfeiran/zh_CN/yjfx/231635/content/6811.htm", kind: "official" }, extra: { label: "北京航空航天大学计算机学院师资队伍", url: "https://scse.buaa.edu.cn/szdw/jsml.htm" } },
  { id: "chongyang-tao-buaa", name: "陶重阳", institution: "BUAA", role: "Associate Professor", area: "LLM Reasoning · Reward Models · Data Intelligence", tags: ["WizardLM","长程推理","奖励模型","微软"], summary: "北航新生代 NLP / LLM PI，研究长程交互推理、奖励模型、自进化学习与数据工程；加入高校前任微软高级研究科学家。", basis: { label: "北航教师主页", url: "https://teacher.buaa.edu.cn/nlp/en/index.htm", kind: "official" }, extra: { label: "北京航空航天大学计算机学院师资队伍", url: "https://scse.buaa.edu.cn/szdw/jsml.htm" } },
  { id: "junfan-chen-buaa", name: "陈俊帆", institution: "BUAA", role: "Associate Professor", area: "NLP · Knowledge Engineering · Intelligent Software", tags: ["低资源 NLP","知识工程","智能软件工程","2025 新 PI"], summary: "2025 年成为北航软件学院副教授，研究低标注数据场景下的 NLP、知识工程和智能软件工程。", basis: { label: "北航教师主页", url: "https://teacher.buaa.edu.cn/chenjunfan1/en/index/222611/list/index.htm", kind: "official" }, extra: { label: "北京航空航天大学计算机学院师资队伍", url: "https://scse.buaa.edu.cn/szdw/jsml.htm" } },
  { id: "ruijie-wang-buaa", name: "王睿杰", institution: "BUAA", role: "Professor · PhD Advisor", area: "Trustworthy LLM · Agents · Multimodal Foundation Models", tags: ["后训练","智能体","多模态基础模型","2025 新 PI"], summary: "2025 年入职北航的青年 PI，研究大模型对齐微调、复杂推理、智能体与结构化知识驱动的多模态基础模型。", basis: { label: "北航教师主页", url: "https://scse.buaa.edu.cn/info/1546/12281.htm", kind: "official" }, extra: { label: "北京航空航天大学计算机学院师资队伍", url: "https://scse.buaa.edu.cn/szdw/jsml.htm" } },
  { id: "caixia-yuan-bupt", name: "袁彩霞", institution: "BUPT", role: "Associate Professor · Master Advisor", area: "NLP · Human-machine Dialogue · Multi-agent Dialogue", tags: ["NLP","人机对话","多智能体对话"], summary: "北邮人工智能学院 NLP 教师，研究自然语言处理、人机对话与多智能体对话。", basis: { label: "北邮招生网", url: "https://zsb.bupt.edu.cn/info/1004/1111.htm", kind: "official" }, extra: { label: "北京邮电大学计算机学院师资队伍", url: "https://scs.bupt.edu.cn/szdw.htm" } },
  { id: "ya-li-bupt", name: "李雅", institution: "BUPT", role: "Associate Professor · PhD Advisor", area: "Speech LLM · Affective Dialogue · Speech Understanding", tags: ["语音大模型","情感对话","语音理解","多模态"], summary: "北邮人工智能学院副教授、博导，研究可控语音合成大模型、语音内容理解、情感合成与个性化对话。", basis: { label: "北邮教师主页", url: "https://teacher.bupt.edu.cn/liya/zh_CN/kyxm/216807/list/index.htm", kind: "official" }, extra: { label: "北京邮电大学人工智能学院导师名录", url: "https://ai.bupt.edu.cn/info/1050/2952.htm" } },
  { id: "dongliang-xie-bupt", name: "谢东亮", institution: "BUPT", role: "Professor · Center Director", area: "Multimodal Context · NLP · Knowledge Graphs", tags: ["多模态","NLP","知识图谱","人机协同"], summary: "北邮人机协同与人工智能联合实验室主任，研究文本、音频、视频多模态上下文计算、NLP 与知识图谱。", basis: { label: "北邮教师主页", url: "https://scs.bupt.edu.cn/info/1289/2755.htm", kind: "official" }, extra: { label: "北京邮电大学人工智能学院导师名录", url: "https://ai.bupt.edu.cn/info/1050/2952.htm" } },
  { id: "da-xiao-bupt", name: "肖达", institution: "BUPT", role: "Associate Professor", area: "LLM Security · NLP · Program Analysis", tags: ["大模型安全","可解释性","NLP","程序分析"], summary: "北邮网安学院副教授，研究大模型基础架构与可解释性，以及大模型在 NLP、程序分析和软件安全中的应用。", basis: { label: "北邮网安学院", url: "https://scss.bupt.edu.cn/szdw/jsml/rjaqzx1.htm", kind: "official" }, extra: { label: "北京邮电大学人工智能学院导师名录", url: "https://ai.bupt.edu.cn/info/1050/2952.htm" } },
  { id: "jun-liu-xjtu", name: "刘均", institution: "XJTU", role: "Professor · PhD Advisor", area: "Natural Language Understanding · Vision · Intelligent Education", tags: ["自然语言理解","智慧教育","多模态","知识工程"], summary: "西安交大计算机学院教授，长期研究自然语言理解、计算机视觉和智慧教育，是语言智能与教育应用的资深节点。", basis: { label: "西安交大教师主页", url: "https://faculty.xjtu.edu.cn/liukeen/zh_CN/zdylm/997556/list/index.htm", kind: "official" }, extra: { label: "西安交通大学人工智能学院", url: "https://iair.xjtu.edu.cn/" } },
  { id: "peilin-jiang-xjtu", name: "姜沛林", institution: "XJTU", role: "Associate Professor · PhD Advisor", area: "Natural Language Understanding · Pattern Recognition", tags: ["自然语言理解","NLP 教学","模式识别"], summary: "西安交大人工智能学院副教授、博导，研究自然语言理解、模式识别与智能系统，并长期承担自然语言处理课程。", basis: { label: "西安交大教师主页", url: "https://faculty.xjtu.edu.cn/pljiang/zh_CN/index.htm", kind: "official" }, extra: { label: "西安交通大学人工智能学院", url: "https://iair.xjtu.edu.cn/" } },
  { id: "huiqi-deng-xjtu", name: "邓辉琦", institution: "XJTU", role: "Assistant Professor · Master Advisor", area: "Trustworthy LLM · Agent Safety · Explainability", tags: ["可信推理","智能体安全","可解释性","发展期 PI"], summary: "研究大模型与智能体的可信推理、可解释性、安全评测和防护，并探索网络配置与药物发现等交叉应用。", basis: { label: "西安交大教师主页", url: "https://faculty.xjtu.edu.cn/denghq7/zh_CN/zdylm/1000526/list/index.htm", kind: "official" }, extra: { label: "西安交通大学人工智能学院", url: "https://iair.xjtu.edu.cn/" } },
  { id: "wenbin-an-xjtu", name: "安文斌", institution: "XJTU", role: "Assistant Professor · Master Advisor", area: "Multimodal LLM · RAG · Agents", tags: ["多模态大模型","RAG","幻觉","2026 新 PI"], summary: "2026 年加入西安交大的新 PI，研究多模态大模型、检索增强、幻觉消除、智能体和智慧教育。", basis: { label: "西安交大教师主页", url: "https://faculty.xjtu.edu.cn/anwenbin/zh_CN/yjgk/1040042/list/index.htm", kind: "official" }, extra: { label: "西安交通大学人工智能学院", url: "https://iair.xjtu.edu.cn/" } },
  { id: "qinliang-su-sysu", name: "苏勤亮", institution: "SYSU", role: "Associate Professor · PhD Advisor", area: "Generative Models · LLM · Multi-agent Systems", tags: ["生成模型","LLM","多智能体","多模态"], summary: "研究生成模型、大语言模型、多智能体与多模态理解；组页明确记录毕业生主要进入字节、腾讯、阿里或继续深造。", basis: { label: "中山大学教师主页", url: "https://cse.sysu.edu.cn/teacher/SuQinliang", kind: "official" }, extra: { label: "中山大学计算机学院专任教师名录", url: "https://cse.sysu.edu.cn/teacher" } },
  { id: "jingping-liu-sysu", name: "刘井平", institution: "SYSU", role: "Associate Professor · PhD Advisor", area: "LLM Training · Agents · NLP", tags: ["大模型训练","智能体","NLP","知识工程"], summary: "中山大学软件工程学院副教授、博导，研究大模型训练与推理、智能体、NLP 和知识工程，并与多家互联网企业开展合作。", basis: { label: "中山大学教师主页", url: "https://sse.sysu.edu.cn/teacher/985", kind: "official" }, extra: { label: "中山大学计算机学院专任教师名录", url: "https://cse.sysu.edu.cn/teacher" } },
  { id: "yanlin-wang-sysu", name: "王焱林", institution: "SYSU", role: "Associate Professor · Master Advisor", area: "LLM · NLP · Intelligent Software Engineering", tags: ["代码大模型","大模型安全","模型记忆","MSRA"], summary: "中山大学百人计划副教授，研究大模型、NLP 与智能软件工程；入校前任微软亚洲研究院主管研究员。", basis: { label: "中山大学教师主页", url: "https://sse.sysu.edu.cn/teacher/329", kind: "official" }, extra: { label: "中山大学计算机学院专任教师名录", url: "https://cse.sysu.edu.cn/teacher" } },
  { id: "hai-wan-sysu", name: "万海", institution: "SYSU", role: "Professor · PhD Advisor", area: "Knowledge Representation · Trustworthy LLM · Formal Methods", tags: ["可信大模型","形式化方法","知识推理","神经符号"], summary: "研究人工智能基础理论、知识表示与推理、可信大模型和形式化方法，是中大大模型推理与可靠性相邻层的重要 PI。", basis: { label: "中山大学教师主页", url: "https://cse.sysu.edu.cn/teacher/WanHai", kind: "official" }, extra: { label: "中山大学计算机学院专任教师名录", url: "https://cse.sysu.edu.cn/teacher" } },
  { id: "aimin-zhou-ecnu", name: "周爱民", institution: "ECNU", role: "Professor · Director, Institute of AI Education", area: "LLM · Agent Systems · Intelligent Education", tags: ["大语言模型","智能体","智能教育","AI4Science","Essex PhD","教育大模型","演化优化","上海创智学院"], summary: "华东师大上海智能教育研究院院长、上海创智学院全时导师，曾任计算机学院院长。研究从演化优化扩展到大语言模型、智能体系统、智能教育与科学智能。", basis: { label: "华东师大教师主页", url: "https://faculty.ecnu.edu.cn/_s16/zam/main.psp", kind: "official" }, extra: { label: "华东师范大学计算机学院师资队伍", url: "https://cs.ecnu.edu.cn/szdw/list.htm" } },
  { id: "yan-yang-ecnu", name: "杨艳", institution: "ECNU", role: "Associate Professor", area: "Language Cognition · LLM · Dialogue Systems", tags: ["语言认知","大语言模型","多智能体","对话系统"], summary: "研究语言认知与知识计算，包括大语言模型、多智能体、推理决策、问答和对话系统。", basis: { label: "华东师大教师主页", url: "https://faculty.ecnu.edu.cn/_s16/yy2/main.psp", kind: "official" }, extra: { label: "华东师范大学计算机学院师资队伍", url: "https://cs.ecnu.edu.cn/szdw/list.htm" } },
  { id: "jie-zhou-ecnu", name: "周杰", institution: "ECNU", role: "Young Researcher · PhD Advisor", area: "Continual Learning · LLM · Agents", tags: ["持续学习","大模型","智能体","EduChat"], summary: "华东师大青年研究员、上海 AI 实验室双聘，研究持续学习、大模型和智能体，带领团队开源 AutoSkill 与 EduChat。", basis: { label: "华东师大教师主页", url: "https://faculty.ecnu.edu.cn/_s16/zj2/main.psp", kind: "official" }, extra: { label: "华东师范大学计算机学院师资队伍", url: "https://cs.ecnu.edu.cn/szdw/list.htm" } },
  { id: "fei-tan-ecnu", name: "谈飞", institution: "ECNU", role: "Associate Professor · PhD Advisor", area: "NLP · LLM · Intelligent Education", tags: ["NLP","大语言模型","智能教育","产业转化"], summary: "上海智能教育研究院副教授、博导，研究 NLP 和大语言模型在智能教育中的应用，具有多段工业研究与技术管理经历。", basis: { label: "华东师大教师主页", url: "https://faculty.ecnu.edu.cn/_s47/tf2/list.psp", kind: "official" }, extra: { label: "华东师范大学计算机学院师资队伍", url: "https://cs.ecnu.edu.cn/szdw/list.htm" } },
  { id: "tieyun-qian-whu", name: "钱铁云", institution: "WHU", role: "Professor · PhD Advisor", area: "NLP · LLM Safety · Knowledge Reasoning", tags: ["大模型安全","对齐","幻觉检测","知识问答"], summary: "武汉大学教授，研究 NLP、Web 数据挖掘与大模型安全，重点覆盖对齐、泛化、毒性与幻觉检测、隐私保护和知识推理。", basis: { label: "武汉大学教师主页", url: "https://jszy.whu.edu.cn/qiantieyun/en/index/236186/list/index.htm", kind: "official" }, extra: { label: "武汉大学人工智能学院师资队伍", url: "https://ai.whu.edu.cn/szdw.htm" } },
  { id: "fei-li-whu", name: "李霏", institution: "WHU", role: "Associate Professor · PhD Advisor", area: "NLP · Information Extraction · LLM Security", tags: ["信息抽取","情感计算","大模型安全","NLP"], summary: "武汉大学国家网络安全学院副教授、博导，研究信息抽取、情感计算、大模型及相关安全问题。", basis: { label: "武汉大学教师主页", url: "https://jszy.whu.edu.cn/lifei10/zh_CN/index.htm", kind: "official" }, extra: { label: "武汉大学人工智能学院师资队伍", url: "https://ai.whu.edu.cn/szdw.htm" } },
  { id: "juhua-liu-whu", name: "刘菊华", institution: "WHU", role: "Professor · PhD Advisor", area: "Language & Multimodal LLM · Medical AI", tags: ["语言大模型","多模态","医学 AI","织女"], summary: "研究语言/多模态大模型与医学 AI，曾联合京东探索研究院训练织女 V1/V2，并建设多个医疗语言和多模态模型。", basis: { label: "武汉大学教师主页", url: "https://jszy.whu.edu.cn/liujuhua1/zh_CN/index.htm", kind: "official" }, extra: { label: "武汉大学人工智能学院师资队伍", url: "https://ai.whu.edu.cn/szdw.htm" } },
  { id: "yongcheng-jing-whu", name: "静永程", institution: "WHU", role: "Professor · PhD Advisor", area: "Efficient LLM Inference · AI for Healthcare", tags: ["大模型推理","高效推理","医疗 AI","2026 新 PI"], summary: "2026 年加入武汉大学计算机学院的新 PI，长期研究大语言模型高效推理，当前聚焦人工智能与医疗交叉。", basis: { label: "武汉大学教师主页", url: "https://jszy.whu.edu.cn/jingyongcheng/zh_CN/index/1731728/list/index.htm", kind: "official" }, extra: { label: "武汉大学人工智能学院师资队伍", url: "https://ai.whu.edu.cn/szdw.htm" } },
];

function checkedSource(raw: RawProfile["basis"] | RawProfile["extra"], supports: string): Source {
  return {
    label: raw.label,
    url: raw.url,
    kind: "kind" in raw ? raw.kind : "official",
    checkedAt,
    supports,
  };
}

/**
 * Coverage-first second pass. These cards deliberately keep relationship claims
 * conservative: role, research scope, and the public biographical description
 * are copied from the named first-party profile/roster. Adviser edges are added
 * only below when a first-party page explicitly names the adviser.
 */
export const mainlandFullProfileEnhancements2: Record<string, PersonEnhancement> = Object.fromEntries(
  rawProfiles.map((person) => {
    const basis = checkedSource(person.basis, `${person.name}的研究方向、项目或公开人物简介`);
    const roster = checkedSource(person.extra, `${person.name}的当前机构归属或公开师资名录位置`);
    return [person.id, {
      facts: [
        { label: "公开职责", value: `${person.institution} · ${person.role}`, source: roster },
        { label: "研究主线", value: person.area, source: basis },
        { label: "公开研究脉络", value: person.summary, source: basis },
        { label: "研究关键词", value: person.tags.join(" · "), source: basis },
      ],
      sources: [basis, roster],
      lastVerifiedAt: checkedAt,
    }];
  }),
);

const panProfile: Source = {
  label: "北京大学菁英论坛：潘亮铭",
  url: "https://cs.pku.edu.cn/info/1019/3191.htm",
  kind: "official",
  checkedAt,
  supports: "潘亮铭的 NUS 博士导师为 Min-Yen Kan",
};
const qiuLineage: Source = {
  label: "复旦大学校庆报道",
  url: "https://news.fudan.edu.cn/2023/0527/c2610a135077/page.htm",
  kind: "official",
  checkedAt,
  supports: "邱锡鹏师从复旦 NLP 实验室创建者吴立德",
};
const zhouJieProfile: Source = {
  label: "华东师范大学教师主页：周杰",
  url: "https://faculty.ecnu.edu.cn/_s16/zj2/main.psp",
  kind: "official",
  checkedAt,
  supports: "周杰于 2021–2023 年在复旦 NLP 实验室从事博士后研究，合作导师为黄萱菁",
};
export const mainlandFullProfileRelationships2: Relationship[] = [
  {
    id: "mainland-full2-pan-kan-lineage",
    from: "min-yen-kan",
    to: "liangming-pan",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "北京大学官方论坛简介明确写明潘亮铭在 NUS 博士阶段由 Min-Yen Kan 指导。",
    source: panProfile,
    verified: true,
  },
  {
    id: "mainland-full2-qiu-wulide-lineage",
    from: "xipeng-qiu",
    to: "xipeng-qiu",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师：吴立德",
    evidence: "复旦大学校庆报道明确记载邱锡鹏师从复旦 NLP 实验室创建者吴立德。",
    source: qiuLineage,
    verified: true,
  },
  {
    id: "mainland-full2-huang-zhou-postdoc",
    from: "xuanjing-huang",
    to: "jie-zhou-ecnu",
    type: "talent",
    subtype: "postdoc_mentor",
    label: "复旦 NLP 博士后合作导师（2021–2023）",
    evidence: "华东师大教师主页记录周杰 2021–2023 年在复旦 NLP 实验室从事博士后研究，合作导师为黄萱菁。",
    source: zhouJieProfile,
    verified: true,
    startYear: 2021,
    endYear: 2023,
  },
];

export const mainlandFullProfileGroupMembers2: GroupMember[] = [];

export const mainlandFullProfileStudentPlacements2: StudentPlacement[] = [];
