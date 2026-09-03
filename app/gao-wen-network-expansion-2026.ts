import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-02";
const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  jdlRoster: source(
    "先进人机通信技术联合实验室 · 桃李天下",
    "https://www.jdl.ac.cn/rencai/taolitianxia",
    "official",
    "高文指导或共同指导的博士、硕士与博士后姓名、完成时间、研究方向和当时毕业去向",
  ),
  gaoProfile: source("北京大学高文人物报道", "https://news.pku.edu.cn/xwzh/129-251948.htm", "official", "高文的学术任职、研究方向与人才培养理念"),
  zhangShiliang: source("北京大学人工智能研究院 · 张史梁", "https://www.ai.pku.edu.cn/info/1173/2933.htm", "official", "张史梁当前任职、研究领域、教育经历与肖像"),
  maSiwei: source("北京大学计算机学院 · 马思伟", "https://cs.pku.edu.cn/info/1004/1001.htm", "official", "马思伟当前任职、博士训练、视频编码研究与肖像"),
  tianYonghong: source("北京大学计算机学院 · 田永鸿", "https://cs.pku.edu.cn/info/1089/1781.htm", "official", "田永鸿当前任职、教育背景、研究领域与肖像"),
  jiangShuqiang: source("中科院计算所 VIPL · 蒋树强", "https://vipl.ict.ac.cn/people/sqjiang/", "official", "蒋树强当前任职、研究方向、教育经历与肖像"),
  shanShiguang: source("智能算法安全全国重点实验室 · 山世光", "https://klais.ict.ac.cn/yjspy/ds/bd/202404/t20240407_210245.html", "official", "山世光当前任职、博士导师、研究方向与肖像"),
  wangRuiping: source("中国科学院大学 · 王瑞平", "https://people.ucas.ac.cn/~rpwang", "official", "王瑞平当前任职、教育背景、研究方向、学生名录与肖像"),
  chenXilin: source("中科院计算所 · 陈熙霖", "https://ict.cas.cn/jssgk/xrsld/202511/t20251112_8010592.html", "official", "陈熙霖当前所长、党委书记、研究员身份与研究方向"),
  huangQingming: source("中国科学院大学 · 黄庆明", "https://people.ucas.ac.cn/~qmhuang", "official", "黄庆明当前任职、研究方向、教育背景与肖像"),
  zhaoDebin: source("哈尔滨工业大学 · 赵德斌", "https://homepage.hit.edu.cn/zhaodebin?lang=zh", "official", "赵德斌当前教授、博士生导师身份与肖像"),
  zhaoTiejun: source("哈尔滨工业大学 · 赵铁军", "https://homepage.hit.edu.cn/zhaotiejun", "official", "赵铁军当前教授、博士生导师身份与肖像"),
  yaoHongxun: source("哈尔滨工业大学 · 姚鸿勋", "https://homepage.hit.edu.cn/yaohongxun", "official", "姚鸿勋当前教授、博士生导师、研究方向与肖像"),
  jiangFeng: source("哈尔滨工业大学 · 姜峰", "https://homepage.hit.edu.cn/jiangfeng", "official", "姜峰当前博士生导师身份、计算机学科与人工智能研究方向、肖像"),
};

function pi(value: Omit<Person, "category" | "primary" | "introducedAt" | "lastVerifiedAt" | "portrait"> & { portraitSource: Source }): Person {
  const { portraitSource, ...rest } = value;
  return {
    ...rest,
    category: "core",
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
    portrait: {
      src: `portraits/gao-wen-network-2026/${value.id.replace(/-(?:pku|cas-ict|ucas|hit)$/, "")}.jpg`,
      alt: `${value.name} 肖像`,
      source: portraitSource,
    },
  };
}

export const gaoWenNetworkPeople2026: Person[] = [
  pi({
    id: "zhang-shiliang-pku", name: "张史梁", role: "长聘副教授 · 博雅青年学者", institution: "PKU", region: "Mainland China",
    area: "Computer Vision · Multimedia Retrieval · Person Re-identification", tags: ["计算机视觉", "多媒体检索", "行人重识别", "高文谱系"],
    summary: "北京大学视觉媒体计算团队 PI，研究行人重识别、细粒度识别与大规模视觉检索；JDL 官方培养名录将其列为高文博士生。",
    facts: [
      { label: "当前任职", value: "北京大学计算机学院长聘副教授、博雅青年学者、博士生导师。", source: sources.zhangShiliang },
      { label: "研究主线", value: "多媒体内容分析与检索、计算机视觉、模式识别，重点包括行人重识别、细粒度识别和海量视觉检索。", source: sources.zhangShiliang },
      { label: "教育与学术训练", value: "2012 年在中国科学院计算技术研究所获得博士学位；JDL 官方培养名录明确列高文为导师。", source: sources.jdlRoster },
      { label: "任职轨迹", value: "博士毕业后先后在 UT San Antonio 与 NEC Labs America 从事研究，之后加入北京大学。", source: sources.zhangShiliang },
    ], stage: "senior", sources: [sources.zhangShiliang, sources.jdlRoster], portraitSource: sources.zhangShiliang, x: 120, y: 930,
  }),
  pi({
    id: "ma-siwei-pku", name: "马思伟", role: "博雅特聘教授 · 计算机学院党委副书记", institution: "PKU", region: "Mainland China",
    area: "Video Coding · Visual Media · Multimedia Systems", tags: ["视频编码", "视觉媒体", "AVS", "高文谱系"],
    summary: "北京大学视频编码与视觉媒体资深 PI，长期参与 AVS 自主标准和超高清视频技术体系建设。",
    facts: [
      { label: "当前任职", value: "北京大学博雅特聘教授、计算机学院党委副书记，视频与视觉技术研究所教师。", source: sources.maSiwei },
      { label: "研究主线", value: "视频处理与编码、视频传输、超高清视觉媒体与自主音视频标准。", source: sources.maSiwei },
      { label: "教育与学术训练", value: "2005 年获中国科学院计算技术研究所博士学位；JDL 名录明确列高文为博士导师。", source: sources.jdlRoster },
      { label: "学术与产业影响", value: "持续推动 AVS 视频编码标准与超高清视频产业化，并培养学术界和产业界人才。", source: sources.maSiwei },
    ], stage: "institute", sources: [sources.maSiwei, sources.jdlRoster], portraitSource: sources.maSiwei, x: 260, y: 930,
  }),
  pi({
    id: "tian-yonghong-pku", name: "田永鸿", role: "教授 · 博士生导师", institution: "PKU", region: "Mainland China",
    area: "Video Big Data · Machine Learning · Neuromorphic Computing", tags: ["视频大数据", "机器学习", "类脑计算", "高文谱系"],
    summary: "北京大学视频大数据、机器学习与类脑计算 PI，连接高文多媒体谱系和神经形态视觉研究。",
    facts: [
      { label: "当前任职", value: "北京大学计算机学院教授、博士生导师，视频与视觉技术研究所教师。", source: sources.tianYonghong },
      { label: "研究主线", value: "视频大数据分析处理、机器学习与类脑计算。", source: sources.tianYonghong },
      { label: "教育与学术训练", value: "2005 年在中国科学院计算技术研究所获工学博士；JDL 名录明确列高文为导师。", source: sources.jdlRoster },
      { label: "为什么值得关注", value: "其工作把图像视频分析、城市视觉计算与神经形态计算连接到同一条研究主线。", source: sources.tianYonghong },
    ], stage: "institute", sources: [sources.tianYonghong, sources.jdlRoster], portraitSource: sources.tianYonghong, x: 400, y: 930,
  }),
  pi({
    id: "jiang-shuqiang-cas-ict", name: "蒋树强", role: "研究员 · 重点实验室副主任", institution: "CAS-ICT", region: "Mainland China",
    area: "Multimodal Intelligence · Multimedia Analysis · Food Computing", tags: ["多模态智能", "多媒体分析", "食品计算", "高文谱系"],
    summary: "中科院计算所多媒体与多模态智能 PI，研究图像视频理解、跨模态分析和食品计算。",
    facts: [
      { label: "当前任职", value: "中国科学院计算技术研究所研究员、博士生导师、智能信息处理重点实验室副主任、国科大岗位教授。", source: sources.jiangShuqiang },
      { label: "研究主线", value: "图像与视频多媒体内容分析、多模态智能和食品计算。", source: sources.jiangShuqiang },
      { label: "教育与学术训练", value: "中科院计算所官方简介记录 2006 年取得博士学位；JDL 培养名录将其列为高文博士生。", source: sources.jdlRoster },
      { label: "招生状态", value: "官方主页明确持续招收博士生和硕士生。", source: sources.jiangShuqiang },
    ], stage: "institute", sources: [sources.jiangShuqiang, sources.jdlRoster], portraitSource: sources.jiangShuqiang, x: 120, y: 1080,
  }),
  pi({
    id: "shan-shiguang-cas-ict", name: "山世光", role: "研究员 · 实验室主任", institution: "CAS-ICT", region: "Mainland China",
    area: "Computer Vision · Multimodal Models · AI Safety", tags: ["计算机视觉", "人脸识别", "多模态大模型", "AI 安全", "高文谱系"],
    summary: "中科院计算所视觉与智能算法安全资深 PI，从人脸识别拓展到多模态大模型、情感计算与 AI 安全。",
    facts: [
      { label: "当前任职", value: "中国科学院计算技术研究所研究员、智能信息处理重点实验室主任、智能算法安全全国重点实验室副主任。", source: sources.shanShiguang },
      { label: "研究主线", value: "计算机视觉、人脸识别、情感与心理计算、多模态大模型、人工智能安全及 AI for Science。", source: sources.shanShiguang },
      { label: "教育与学术训练", value: "1999–2004 年在中科院计算所读博，官方履历明确写明导师为高文院士。", source: sources.shanShiguang },
      { label: "研究组织", value: "长期组织视觉信息处理与学习团队，并承担国家级智能算法安全实验室管理工作。", source: sources.shanShiguang },
    ], stage: "institute", sources: [sources.shanShiguang, sources.jdlRoster], portraitSource: sources.shanShiguang, x: 260, y: 1080,
  }),
  pi({
    id: "wang-ruiping-cas-ict", name: "王瑞平", role: "研究员 · 博士生导师", institution: "CAS-ICT", region: "Mainland China",
    area: "Computer Vision · Open-world Perception · Pattern Recognition", tags: ["计算机视觉", "开放世界", "模式识别", "高文谱系"],
    summary: "中科院计算所开放世界视觉感知 PI，研究图像集合识别、场景理解和开放环境下的稳健视觉学习。",
    facts: [
      { label: "当前任职", value: "中国科学院计算技术研究所研究员、博士生导师。", source: sources.wangRuiping },
      { label: "研究主线", value: "计算机视觉、模式识别、机器学习与图像处理，重点关注开放世界视觉感知。", source: sources.wangRuiping },
      { label: "教育与学术训练", value: "2003–2010 年在中科院计算所获工学博士；JDL 名录与中科院优秀博士论文材料均记录高文为导师。", source: sources.jdlRoster },
      { label: "团队与招生", value: "官方主页列出持续招生信息和完整在读学生名录。", source: sources.wangRuiping },
    ], stage: "senior", sources: [sources.wangRuiping, sources.jdlRoster], portraitSource: sources.wangRuiping, x: 400, y: 1080,
  }),
  pi({
    id: "chen-xilin-cas-ict", name: "陈熙霖", role: "所长、党委书记 · 研究员", institution: "CAS-ICT", region: "Mainland China",
    area: "Computer Vision · Pattern Recognition · Human-centered Perception", tags: ["计算机视觉", "模式识别", "人本感知", "高文谱系"],
    summary: "中国科学院计算技术研究所计算机视觉资深学者，长期研究模式识别、人本感知与多模态人机接口。",
    facts: [
      { label: "当前任职", value: "中国科学院计算技术研究所所长、党委书记、研究员。", source: sources.chenXilin },
      { label: "研究主线", value: "计算机视觉、模式识别、多媒体技术与多模式人机接口。", source: sources.chenXilin },
      { label: "教育与学术训练", value: "JDL 博士名录记录其 1994 年博士由李仲荣与高文共同指导。", source: sources.jdlRoster },
      { label: "为什么值得关注", value: "他是高文早期视觉谱系的重要学术分支，并继续培养计算机视觉和人本感知人才。", source: sources.chenXilin },
    ], stage: "institute", sources: [sources.chenXilin, sources.jdlRoster], portraitSource: sources.chenXilin, x: 540, y: 1080,
  }),
  pi({
    id: "huang-qingming-ucas", name: "黄庆明", role: "讲席教授 · 博士生导师", institution: "External", actualInstitution: "University of Chinese Academy of Sciences", region: "Mainland China",
    area: "Multimedia Computing · Computer Vision · Pattern Recognition", tags: ["多媒体计算", "计算机视觉", "模式识别", "高文谱系"],
    summary: "中国科学院大学多媒体计算与视觉资深 PI，连接早期高文视觉谱系、模式识别和多媒体人才培养。",
    facts: [
      { label: "当前任职", value: "中国科学院大学计算机科学与技术学院讲席教授、博士生导师。", source: sources.huangQingming },
      { label: "研究主线", value: "多媒体计算、图像与视频处理、模式识别、机器学习和计算机视觉。", source: sources.huangQingming },
      { label: "教育与学术训练", value: "JDL 博士名录记录其 1994 年博士由李仲荣与高文共同指导。", source: sources.jdlRoster },
      { label: "学术影响", value: "国家杰出青年科学基金获得者、IEEE Fellow，长期承担多媒体计算与视觉项目和研究生培养。", source: sources.huangQingming },
    ], stage: "institute", sources: [sources.huangQingming, sources.jdlRoster], portraitSource: sources.huangQingming, x: 680, y: 1080,
  }),
  pi({
    id: "zhao-debin-hit", name: "赵德斌", role: "教授 · 博士生导师", institution: "HIT", region: "Mainland China",
    area: "Video Coding · Computer Vision · Multimedia", tags: ["视频编码", "多媒体", "计算机视觉", "高文谱系"],
    summary: "哈尔滨工业大学视频编码与多媒体资深 PI，是高文早期博士谱系回流哈工大的重要节点。",
    facts: [
      { label: "当前任职", value: "哈尔滨工业大学计算学部教授、博士生导师。", source: sources.zhaoDebin },
      { label: "研究主线", value: "视频与图像编码、多媒体信息处理、计算机视觉。", source: sources.zhaoDebin },
      { label: "教育与学术训练", value: "JDL 博士名录记录其 1998 年图像压缩方向博士由高文指导。", source: sources.jdlRoster },
      { label: "人才培养", value: "哈工大官方博士生导师名录持续列其为计算机科学与技术学科导师。", source: sources.zhaoDebin },
    ], stage: "institute", sources: [sources.zhaoDebin, sources.jdlRoster], portraitSource: sources.zhaoDebin, x: 120, y: 1230,
  }),
  pi({
    id: "zhao-tiejun-hit", name: "赵铁军", role: "教授 · 博士生导师", institution: "HIT", region: "Mainland China",
    area: "Natural Language Processing · Machine Translation · AI", tags: ["NLP", "机器翻译", "语言理解", "高文谱系"],
    summary: "哈尔滨工业大学机器翻译与自然语言理解资深 PI，连接李生、高文两条早期语言与人工智能培养谱系。",
    facts: [
      { label: "当前任职", value: "哈尔滨工业大学计算学部教授、博士生导师，语言技术研究中心学术带头人。", source: sources.zhaoTiejun },
      { label: "研究主线", value: "机器翻译、自然语言理解、互联网文本智能处理与人工智能。", source: sources.zhaoTiejun },
      { label: "教育与学术训练", value: "JDL 博士名录记录其 1998 年机器翻译博士由高文与李生共同指导。", source: sources.jdlRoster },
      { label: "学术组织", value: "长期参与哈工大语言语音重点实验室与 NLP 研究所建设。", source: sources.zhaoTiejun },
    ], stage: "institute", sources: [sources.zhaoTiejun, sources.jdlRoster], portraitSource: sources.zhaoTiejun, x: 260, y: 1230,
  }),
  pi({
    id: "yao-hongxun-hit", name: "姚鸿勋", role: "教授 · 博士生导师", institution: "HIT", region: "Mainland China",
    area: "Computer Vision · Multimedia Understanding · Affective Computing", tags: ["计算机视觉", "多媒体理解", "情感计算", "高文谱系"],
    summary: "哈尔滨工业大学视觉与情感计算资深 PI，研究多媒体数据分析、视频理解和情感智能。",
    facts: [
      { label: "当前任职", value: "哈尔滨工业大学计算学部教授、博士生导师。", source: sources.yaoHongxun },
      { label: "研究主线", value: "计算机视觉、多媒体数据分析与理解、视频监控和情感计算。", source: sources.yaoHongxun },
      { label: "教育与学术训练", value: "JDL 博士名录记录其 2003 年唇读方向博士由高文指导。", source: sources.jdlRoster },
      { label: "学术组织", value: "长期组织哈工大计算机视觉智能与情感计算研究。", source: sources.yaoHongxun },
    ], stage: "institute", sources: [sources.yaoHongxun, sources.jdlRoster], portraitSource: sources.yaoHongxun, x: 400, y: 1230,
  }),
  pi({
    id: "jiang-feng-hit", name: "姜峰", role: "博士生导师", institution: "HIT", region: "Mainland China",
    area: "Artificial Intelligence · Human–Computer Interaction · Computer Vision", tags: ["人工智能", "人机交互", "计算机视觉", "高文谱系"],
    summary: "哈尔滨工业大学人工智能与人机交互方向博士生导师，早期博士研究聚焦手语识别和机器学习。",
    facts: [
      { label: "当前任职", value: "哈尔滨工业大学博士生导师，当前页面列计算机科学与技术学科。", source: sources.jiangFeng },
      { label: "研究主线", value: "人工智能、人机工程与计算机视觉相关研究。", source: sources.jiangFeng },
      { label: "教育与学术训练", value: "JDL 博士名录记录其 2008 年手语识别、机器学习与人工智能方向博士由高文指导。", source: sources.jdlRoster },
      { label: "任职轨迹", value: "JDL 记录其博士毕业去向为哈尔滨工业大学；当前官方主页继续确认在校指导研究生。", source: sources.jdlRoster },
    ], stage: "senior", sources: [sources.jiangFeng, sources.jdlRoster], portraitSource: sources.jiangFeng, x: 540, y: 1230,
  }),
];

export const gaoWenPersonEnhancements2026: Record<string, Partial<Person>> = {
  "gao-wen-pku": {
    summary: "中国多媒体、计算机视觉与人工智能的重要奠基者之一。JDL 官方培养页记录了跨三十年的博士、硕士与博士后谱系；本图谱把毕业当年去向与当前任职严格分开。",
    knownAlumniCount: 110,
    tags: ["中国工程院院士", "多媒体", "计算机视觉", "模式识别", "视频编码", "大规模人才培养"],
    facts: [
      { label: "人才培养规模", value: "JDL 公开页面中，可解析到 110 条由高文单独或共同指导的博士记录，以及 14 条合作博士后记录；页面还另列硕士培养记录。", source: sources.jdlRoster },
      { label: "学术谱系", value: "已将仍可由官方页面核验为现任独立 PI 的张史梁、马思伟、田永鸿、蒋树强、山世光、王瑞平、陈熙霖、黄庆明、赵德斌、赵铁军、姚鸿勋与姜峰提升为人物节点。", source: sources.jdlRoster },
      { label: "去向解释", value: "JDL 页面中的“毕业去向”按历史首次去向保存，不当作这些校友在 2026 年的当前职位。", source: sources.jdlRoster },
      { label: "为什么值得关注", value: "其培养网络从北大、中科院计算所和哈工大继续向视觉、多媒体、NLP、视频编码及产业研究部门扩散，是理解中国 AI 人才流动的重要主干。", source: sources.gaoProfile },
    ],
    sources: [sources.jdlRoster, sources.gaoProfile],
    lastVerifiedAt: checkedAt,
  },
};

const lineage = (id: string, to: string, label: string, evidence: string, coAdvised = false): Relationship => ({
  id, from: "gao-wen-pku", to, type: "lineage", subtype: coAdvised ? "co_adviser" : "phd_adviser", label, evidence,
  evidenceObject: "JDL doctoral alumni roster", source: sources.jdlRoster, verified: true,
});

export const gaoWenNetworkRelationships2026: Relationship[] = [
  lineage("gao-wen-zhang-shiliang-phd", "zhang-shiliang-pku", "博士导师", "JDL 博士名录列张史梁 2012 年博士导师为高文。"),
  lineage("gao-wen-ma-siwei-phd", "ma-siwei-pku", "博士导师", "JDL 博士名录列马思伟 2005 年博士导师为高文。"),
  lineage("gao-wen-tian-yonghong-phd", "tian-yonghong-pku", "博士导师", "JDL 博士名录列田永鸿 2005 年博士导师为高文。"),
  lineage("gao-wen-jiang-shuqiang-phd", "jiang-shuqiang-cas-ict", "博士导师", "JDL 博士名录列蒋树强博士导师为高文；当前官方简介记录其在中科院计算所完成博士训练。"),
  lineage("gao-wen-shan-shiguang-phd", "shan-shiguang-cas-ict", "博士导师", "JDL 与山世光官方履历均明确其博士导师为高文。"),
  lineage("gao-wen-wang-ruiping-phd", "wang-ruiping-cas-ict", "博士导师", "JDL 名录列王瑞平 2010 年博士导师为高文。"),
  lineage("gao-wen-chen-xilin-phd", "chen-xilin-cas-ict", "共同博士导师", "JDL 博士名录列陈熙霖 1994 年博士由李仲荣与高文共同指导。", true),
  lineage("gao-wen-huang-qingming-phd", "huang-qingming-ucas", "共同博士导师", "JDL 博士名录列黄庆明 1994 年博士由李仲荣与高文共同指导。", true),
  lineage("gao-wen-zhao-debin-phd", "zhao-debin-hit", "博士导师", "JDL 博士名录列赵德斌 1998 年图像压缩方向博士导师为高文。"),
  lineage("gao-wen-zhao-tiejun-phd", "zhao-tiejun-hit", "共同博士导师", "JDL 博士名录列赵铁军 1998 年博士由高文与李生共同指导。", true),
  lineage("gao-wen-yao-hongxun-phd", "yao-hongxun-hit", "博士导师", "JDL 博士名录列姚鸿勋 2003 年博士导师为高文。"),
  lineage("gao-wen-jiang-feng-phd", "jiang-feng-hit", "博士导师", "JDL 博士名录列姜峰 2008 年博士导师为高文。"),
  lineage("gao-wen-zhao-chen-phd", "chen-zhao-hit", "博士导师", "JDL 博士名录列赵琛 2016 年博士导师为高文。"),
];

const doctoralRoster = `
159|罗法蕾|2019.01|视频编码|高文|北京大学（博士后）
151|苏驰|2017.07|计算机视觉|高文|小米通讯技术有限公司
149|赵琛|2016.07|图像视频处理|高文|北京大学博士后
141|罗庆军|2015.01|多媒体技术|高文|NEC中国研究院
137|翟德明|2014.07|机器学习及图像处理|高文|哈尔滨工业大学任教
135|张新峰|2014.07|视频编码和处理|高文|南洋理工大学博后
134|张贤国|2013.07|视频编码|高文|MTK
128|张史梁|2012.07|多媒体技术|高文|美国德克萨斯州大学圣安东尼奥分校博后
125|郭歌|2012.07|计算机视觉、模式识别|高文|国家信息中心
124|张哲斌|2012.07|计算机视觉、视频处理|高文|北京大学
123|王悦|2012.07|视频/图像编码和处理、质量评价|高文|思科中国研发中心
121|赵欣|2012.07|视频编码|高文|高通公司
120|杨晶晶|2011.08|模式识别、多媒体数据挖掘|高文|中国南方电网广东电网公司
117|韩琥|2011.07|计算机视觉与模式识别|高文|美国密歇根州立大学博士后
115|张凯|2011.01|视频编码|高文|腾讯研究院
114|李甲|2011.01|计算机视觉、多媒体技术|高文|新加坡南洋理工大学博士后
113|李远宁|2011.01|多媒体内容分析、计算机视觉|高文|中国移动通信集团广东有限公司
110|李勇鹏|2011.01|视频编码|高文|
109|王海鹏|2010.07|计算蛋白质组学|高文|Toyota Technological Institute at Chicago
108|洪晓鹏|2010.09|物体检测与跟踪|高文|芬兰 Oulu 大学博士后
105|国玫|2010.07|分布式视频编码|高文|Apple
104|黄倩|2010.06|视频处理|高文|联发科
102|王志航|2010.07|信号处理与多媒体数据压缩|高文|奇艺网
101|王瑞平|2010.06|计算机视觉与模式识别|高文|清华大学自动化系博士后
100|索津莉|2010.06|计算机应用技术|高文|清华大学博士后流动站
96|周宇|2009.12|模式识别|高文|
94|刘亚洲|2009.09|人体检测|高文|芬兰博士后
89|苏煜|2009.10|人脸识别|高文|法国卡昂大学博士后
85|刘军发|2009.07|多媒体技术、计算机图形学|高文|中科院计算所
84|苏荔|2009.07|视频编码与传输|高文|中科院博士后
82|张莉|2009.6|视频编码|高文|北京大学博士后
81|王强|2009.04|视频编码|赵德斌、高文|国家广播电影电视总局广播科学研究院
79|张鹏|2009.03|视频编解码芯片体系结构|高文|
78|郑俊浩|2009.03|视频编解码算法及 VLSI 实现|高文|
76|姜峰|2008.09|手语识别、机器学习、人工智能|高文|哈尔滨工业大学
75|陈翔|2008.08|生物信息|高文|中科院计算所
74|赵峰|2008.07|多媒体技术|高文|诺基亚（中国）
73|张力|2008.07|视频编码和相关芯片设计|高文|展讯通信
72|秦磊|2008.07|模式识别、计算机视觉|高文|中国科学院计算技术研究所
71|贾惠柱|2008.07|视频解码器结构|高文|展讯通信
70|张鹏|2008.07|视频编解码|高文|网通研究院
69|季向阳|2008.07|视频编码|赵德斌、高文|
68|齐洪钢|2008.07|视频压缩|高文|中国科学院研究生院
67|郑清芳|2008.02|多媒体技术|高文|北京新岸线网络科技有限公司
66|陈杰|2007.09|人脸检测、模式识别、计算机视觉、数字水印|高文|芬兰奥卢大学
65|柴秀娟|2007.09|人脸识别、模式识别、图像处理|高文|诺基亚（中国）
64|李德泉|2007.06|生物信息学|高文|国家气象信息中心
63|张桢睿|2007.06|多媒体通讯|高文|展讯通信北京分公司
62|曹波|2007.06|人脸识别技术|高文|微软亚洲工程院
61|刘德兵|2007.06|网络多媒体|高文|
60|张远|2007.05|视频处理和通信|高文|中国传媒大学
59|郭峋|2007.04||高文|
58|刘绍辉|2007.04|多媒体内容安全、图像处理|高文|哈尔滨工业大学
57|张文超|2007.04|人脸识别|高文|松下新加坡研发中心
56|付岩|2007.02|生物信息|高文|中科院计算所
55|生滨|2006.11|视频压缩、数字图像处理与集成电路设计|高文|
54|刘扬|2006.11|多媒体分析、计算机视觉|高文|
53|张宝昌|2006.11|人脸识别|高文|香港中文大学博士后
52|刘永亮|2006.8|条件接收|高文|中星微
51|张京芬|2006.6|生物信息学|高文|美国密苏里大学
50|孙俊|2006.6|多媒体编码|高文|北京大学
49|霍龙社|2006.6|多媒体通信|高文|北京大学
48|郑燕峰|2006.6|计算机网络|高文|中国人民银行
47|孙书韬|2006.3|计算机网络|高文|中国传媒大学
46|叶齐祥|2006.3|多媒体计算|高文|中科院研究生院
45|王建宇|2006.2|计算机视觉、机器学习、模式识别、视频处理|高文|NEC 中国研究院
44|张洪明|2006.2|计算机视觉、模式识别、图像处理|高文|NEC 中国研究院
43|蒋树强|2005.11|多媒体技术|高文|中科院计算所
42|高奎|2005.6|多媒体技术|高文|Thomson 宽带研发（北京）
41|马思伟|2005.6|视频编码|高文|University of Southern California 博士后
40|苗军|2005.6|人脸图像分析|高文|中科院计算所
39|王耀威|2005.6|多媒体技术|高文|北京理工大学
38|田永鸿|2005.6|多媒体技术|高文|中科院计算所
37|卿来云|2005.6|多媒体技术|高文|中科院研究生院
36|袁禄军|2005.6|多媒体技术|高文|微软亚洲工程院
35|曾炜|2005.2|多媒体处理|高文|NEC 中国研究院
34|姜大龙|2005.1|人脸合成|高文|北京金洪恩软件公司
33|方高林|2004.9|手语识别的统计模型|高文|富士通研究中心
32|山世光|2004.7|多媒体技术|高文|中科院计算所
31|吕岩|2003.12|视频压缩|高文|微软亚洲研究院
30|孙晓艳|2003.12|视频压缩|高文|微软亚洲研究院
29|庞斌|2003.10|计算机网络|高文|NEC 中国研究院
28|王春立|2003.9|中国手语识别|高文|大连理工大学
27|姚鸿勋|2003.8|唇读研究|高文|哈尔滨工业大学
26|谭国真|2003.5|网络资源调度|高文|大连理工大学计算机系
25|段立娟|2003.2|多媒体检索|高文|北京工业大学
24|陈益强|2003.2|数据挖掘|高文|中科院计算所
23|王实|2001.8|数据挖掘|高文|中创软件
22|王伟强|2001.6|多媒体检索|高文|中科院计算所
21|何冬梅|2000.8|语音数据压缩|高文|上海贝尔
20|吴江琴|2000.7|手语识别|高文|浙江大学
19|徐琳|2000.7|手势理解|高文|国家自然科学基金委
18|金辉|2000.3|表情识别|高文|中兴
17|朱廷邵|1999.9|机器学习|高文|加拿大阿尔伯特大学研究助理
16|晏洁|1999.8|人脸合成|高文|美国科罗拉多大学研究助理
15|吴枫|1999.8|MPEG-4|高文|微软亚洲研究院
14|马继涌|1999.3|话音识别|高文|美国科罗拉多大学
13|王海峰|1999.2|口语翻译|高文、李生|东芝北京研究中心
12|韩纪庆|1998.6|语音识别|高文|哈尔滨工业大学
11|李星原|1998.6|文字识别|高文、洪家荣|美国
10|陈维强|1998.6|图像压缩|高文|青岛海信软件
9|赵铁军|1998.3|机器翻译|高文、李生|哈尔滨工业大学
8|赵德斌|1998.3|图像压缩|高文|哈尔滨工业大学
7|薛晓辉|1998.3|图像压缩|高文|加拿大西安大略大学
6|刘明宝|1997.11|人脸跟踪|高文、洪家荣|新华 LINUX
5|姚郑|1997.11|面向智能体技术|高文|中科院研究生院
4|张晶|1996.5|媒体计算|李仲荣、高文|中科院计算所
3|战德臣|1994.9|图像处理|李仲荣、高文|哈尔滨工业大学
2|黄庆明|1994.9|计算机视觉|李仲荣、高文|中科院研究生院
1|陈熙霖|1994.9|计算机视觉|李仲荣、高文|哈尔滨工业大学
`.trim().split("\n").map((row) => row.split("|"));

const postdocRoster = `
14|齐红威|2006.2|NEC（中国）研究院
13|王春立|2006.2|大连理工大学
12|谢建国|2005.6|广东外语外贸大学
11|孙瑞祥|2004.7|中科院计算所
10|林永兵|2004.7|北京北广电子集团
9|王亚波|2004.7|NEC 中国研究院
8|张小明|2003.10|中科院网络中心
7|周德龙|2003.10|浙江工业大学
6|魏志强|2003|青岛海信
5|黄铁军|2001|中科院研究生院
4|马继涌|2001|美国科罗拉多大学
3|罗森林|2000|北京理工大学
2|高鹏|2000|中科院研究生院
1|尹宝才|1996|北京工业大学
`.trim().split("\n").map((row) => row.split("|"));

export const gaoWenNetworkGroupMembers2026: GroupMember[] = [
  ...doctoralRoster.map(([no, name, year, topic, advisers, destination]) => ({
    id: `gao-wen-doctoral-alumnus-${no}`,
    teacherId: "gao-wen-pku",
    name,
    role: `博士校友 · ${year}${destination ? ` · JDL 当年去向：${destination}` : ""}`,
    focus: `${topic || "研究方向未在页面列出"} · 导师：${advisers}`,
    source: sources.jdlRoster,
  })),
  ...postdocRoster.map(([no, name, year, destination]) => ({
    id: `gao-wen-postdoc-alumnus-${no}`,
    teacherId: "gao-wen-pku",
    name,
    role: `已出站博士后 · ${year}${destination ? ` · JDL 当年去向：${destination}` : ""}`,
    focus: "合作教授：高文",
    source: sources.jdlRoster,
  })),
];

const selectedFirstJobs = [
  ["张史梁", "zhang-shiliang-pku", "2012", "University of Texas at San Antonio", "博士后", "postdoc"],
  ["马思伟", "ma-siwei-pku", "2005", "University of Southern California", "博士后", "postdoc"],
  ["田永鸿", "tian-yonghong-pku", "2005", "CAS Institute of Computing Technology", "研究人员", "academia"],
  ["蒋树强", "jiang-shuqiang-cas-ict", "2005", "CAS Institute of Computing Technology", "研究人员", "academia"],
  ["山世光", "shan-shiguang-cas-ict", "2004", "CAS Institute of Computing Technology", "研究人员", "academia"],
  ["王瑞平", "wang-ruiping-cas-ict", "2010", "Tsinghua University", "博士后", "postdoc"],
  ["陈熙霖", "chen-xilin-cas-ict", "1994", "Harbin Institute of Technology", "JDL 当年去向", "academia"],
  ["黄庆明", "huang-qingming-ucas", "1994", "University of Chinese Academy of Sciences", "JDL 当年去向", "academia"],
  ["赵德斌", "zhao-debin-hit", "1998", "Harbin Institute of Technology", "JDL 当年去向", "academia"],
  ["赵铁军", "zhao-tiejun-hit", "1998", "Harbin Institute of Technology", "JDL 当年去向", "academia"],
  ["姚鸿勋", "yao-hongxun-hit", "2003", "Harbin Institute of Technology", "JDL 当年去向", "academia"],
  ["姜峰", "jiang-feng-hit", "2008", "Harbin Institute of Technology", "JDL 当年去向", "academia"],
] as const;

export const gaoWenNetworkPlacements2026: StudentPlacement[] = selectedFirstJobs.map(([student, personId, year, company, role, sector]) => ({
  id: `gao-wen-${personId}-first-destination`, student, teacherId: "gao-wen-pku", company, department: personId,
  role, kind: "first_job", degree: "PhD", graduationYear: Number(year), firstJob: company, sector,
  note: "这是 JDL 页面记录的毕业当年去向，不代表 2026 年当前任职。", source: sources.jdlRoster, verifiedAt: checkedAt,
}));

export const gaoWenRosterAudit2026 = {
  source: sources.jdlRoster,
  doctoralRows: doctoralRoster.length,
  postdocRows: postdocRoster.length,
  promotedCurrentPiIds: gaoWenNetworkPeople2026.map((person) => person.id),
  policy: "完整名录保留为历史培养记录；只有官方现职页可交叉核验者才提升为当前 PI 人物节点。",
};
