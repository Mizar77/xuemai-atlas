import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-08-31";

const official = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "official", checkedAt, supports,
});
const profile = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "profile", checkedAt, supports,
});
const cv = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "cv", checkedAt, supports,
});
const thesis = (label: string, url: string, supports: string): Source => ({
  label, url, kind: "thesis", checkedAt, supports,
});
const fact = (label: string, value: string, source: Source) => ({ label, value, source });

const s = {
  sigalUbc: official("UBC CS · Leonid Sigal", "https://www.cs.ubc.ca/people/leonid-sigal", "Current appointment, chairs and research groups"),
  sigalHome: profile("Leonid Sigal · Homepage", "https://www.cs.ubc.ca/~lsigal/", "Research, Disney/CMU history and Borealis affiliation"),
  sigalThesis: thesis("Leonid Sigal · Brown PhD thesis", "https://www.cs.ubc.ca/~lsigal/Publications/Sigal_Thesis.pdf", "Brown doctorate and Michael J. Black supervision"),
  shwartzHome: profile("Vered Shwartz · UBC homepage", "https://www.cs.ubc.ca/~vshwartz/index.html", "Current role, education, postdoc and research programme"),
  shwartzContact: profile("Vered Shwartz · Prospective students", "https://www.cs.ubc.ca/~vshwartz/contact.html", "Prospective-student and internship guidance"),
  shwartzUbc: official("UBC CS · Introducing Vered Shwartz", "https://www.cs.ubc.ca/news/2021/10/introducing-dr-vered-shwartz-natural-language-processing-researcher", "UBC appointment and research agenda"),
  yiUbc: official("UBC CS · Kwang Moo Yi", "https://www.cs.ubc.ca/people/kwang-moo-yi", "Current rank and research groups"),
  yiHome: profile("Kwang Moo Yi · Homepage", "https://www.cs.ubc.ca/~kmyi/", "Education, advisers and career history"),
  schmidtUbc: official("UBC CS · Mark Schmidt", "https://www.cs.ubc.ca/people/mark-schmidt", "Current rank and UBC appointment history"),
  schmidtHome: profile("Mark Schmidt · Homepage", "https://www.cs.ubc.ca/~schmidtm/", "Education, postdoctoral training and chairs"),
  cluneUbc: official("UBC CS · Jeff Clune", "https://www.cs.ubc.ca/people/jeff-clune", "Current professorship and 2026 leave status"),
  cluneBio: profile("Jeff Clune · Biography", "https://jeffclune.com/bio.html", "Education, academic and industry career"),
  cluneUbcNews: official("UBC CS · Jeff Clune joins UBC", "https://www.cs.ubc.ca/news/2021/06/associate-professor-jeff-clune-joins-ubc-cs-department", "UBC recruitment and prior OpenAI/Uber career"),
  gonenUbc: official("UBC CS · Hila Gonen", "https://www.cs.ubc.ca/news/2025/11/dr-hila-gonen-brings-trustworthy-and-reliable-ai-ubc-computer-science", "2025 appointment, education and research programme"),
  gonenDirectory: official("UBC CS · Faculty directory", "https://www.cs.ubc.ca/people/faculty", "Current faculty appointment"),
  suttonAmii: official("Amii · Richard S. Sutton", "https://www.amii.ca/people/richard-s-sutton", "Current roles, education and career history"),
  suttonTimeline: official("Amii · Reinforcement-learning timeline", "https://www.amii.ca/rl/timeline-rl-amii", "RLAI founding and Alberta reinforcement-learning history"),
  whiteMarthaAmii: official("Amii · Martha White", "https://www.amii.ca/people/martha-white", "Current roles, RLCore and supervision record"),
  whiteMarthaCv: cv("Martha White · CV", "https://webdocs.cs.ualberta.ca/~whitem/publications/cv.pdf", "Education and doctoral advisers"),
  whiteAdamUa: official("University of Alberta · Adam White", "https://apps.ualberta.ca/directory/person/amw8", "Current academic appointment and education"),
  whiteAdamHome: profile("Adam White · Homepage", "https://adamwhite.ca/", "Amii, RLCore and DeepMind career"),
  bowlingUa: official("University of Alberta · Michael Bowling", "https://apps.ualberta.ca/directory/person/mbowling", "Current professorship and research"),
  bowlingCv: cv("Michael Bowling · CV", "https://webdocs.cs.ualberta.ca/~mbowling/cv.pdf", "CMU doctorate, Manuela Veloso supervision and Alberta career"),
  szepesvariUa: official("University of Alberta · Csaba Szepesvári", "https://apps.ualberta.ca/directory/person/szepesva", "Current professorship and research"),
  szepesvariHome: profile("Csaba Szepesvári · Homepage", "https://sites.ualberta.ca/~szepesva/", "DeepMind role, education and prospective-student information"),
  pilarskiUa: official("University of Alberta · Patrick Pilarski", "https://apps.ualberta.ca/directory/person/pilarski", "Primary Medicine appointment, education and research roles"),
  pilarskiHome: profile("Patrick Pilarski · Homepage", "https://pilarski.github.io/#projects", "RLAI/iSMART/BLINC work and DeepMind career"),
  poupartUw: official("Waterloo CS · Pascal Poupart", "https://uwaterloo.ca/computer-science/contacts/pascal-poupart", "Current professorship and research"),
  poupartBio: profile("Pascal Poupart · Biography", "https://cs.uwaterloo.ca/~ppoupart/biography.html", "Education and Borealis AI career"),
  linUw: official("Waterloo CS · Jimmy Lin", "https://uwaterloo.ca/computer-science/contacts/jimmy-lin", "Current chair and research areas"),
  linHome: profile("Jimmy Lin · Homepage", "https://cs.uwaterloo.ca/~jimmylin/", "MIT education and industry career"),
  larsonUw: official("Waterloo CS · Kate Larson", "https://uwaterloo.ca/computer-science/contacts/kate-larson", "Current professorship and research areas"),
  larsonAai: official("Waterloo CS · Kate Larson elected AAAI Fellow", "https://uwaterloo.ca/computer-science/news/kate-larson-elected-2025-aaai-fellow", "Education, Google DeepMind role and research contributions"),
  chenUw: official("Waterloo CS · Wenhu Chen", "https://uwaterloo.ca/computer-science/about/people/wenhuche", "Current appointment and research"),
  chenNews: official("Waterloo CS · Wenhu Chen profile", "https://uwaterloo.ca/computer-science/news/wenhu-chen-professor-studies-nlp-dl-knowledge-representation-reasoning", "Education, Google career and William Wang supervision"),
  chenHome: profile("Wenhu Chen · Homepage", "https://cs.uwaterloo.ca/~wenhuche/", "Research programme and current recruiting statement"),
  shiUw: official("Waterloo CS · Freda Shi", "https://uwaterloo.ca/computer-science/about/people/fhs", "Current appointment and CompLING Lab"),
  shiNews: official("Waterloo CS · Freda Shi profile", "https://uwaterloo.ca/computer-science/news/freda-shi-computer-scientist-advances-grounded-language-learning-computational-linguistics", "Education, advisers and research agenda"),
  zhongUw: official("Waterloo CS · Victor Zhong", "https://uwaterloo.ca/computer-science/about/people/vzhng", "Current appointment and Reading to Learn Lab"),
  zhongNews: official("Waterloo CS · Victor Zhong profile", "https://uwaterloo.ca/computer-science/news/victor-zhong-computer-scientist-makes-ml-more-general-and-efficient-through-nl", "Education and Microsoft/Salesforce/Meta/Google career"),
  dengUw: official("Waterloo CS · Yuntian Deng", "https://uwaterloo.ca/computer-science/about/people/yuntian", "Current appointment and research"),
  dengNews: official("Waterloo CS · Yuntian Deng profile", "https://uwaterloo.ca/computer-science/news/yuntian-deng-computer-scientist-studies-natural-language-processing-and-machine-learning", "Education, doctoral advisers and AI2 postdoc"),
};

export const canadaWestPersonEnhancements: Record<string, Partial<Person>> = {
  "leonid-sigal-ca": { summary: "UBC 视觉与多模态学习资深 PI；Brown 博士由 Michael J. Black 指导，职业轨迹连接 Disney Research、CMU、Vector 与 RBC/Borealis AI。", facts: [fact("当前角色", "Professor · Canada Research Chair · Canada CIFAR AI Chair", s.sigalUbc), fact("博士师承", "Brown University PhD · adviser Michael J. Black", s.sigalThesis), fact("产业连接", "Former Disney Research Pittsburgh scientist; academic adviser to RBC/Borealis AI", s.sigalHome)], sources: [s.sigalUbc, s.sigalHome, s.sigalThesis], lastVerifiedAt: checkedAt },
  "vered-shwartz-ca": { summary: "UBC NLP 与 Vector 的发展期 PI，研究常识、文化能力、视觉语言与负责任 NLP；博士后阶段连接 AI2 与 University of Washington。", facts: [fact("当前角色", "Assistant Professor, UBC · Canada CIFAR AI Chair", s.shwartzHome), fact("教育与训练", "Bar-Ilan University PhD; postdoctoral research at AI2 and UW", s.shwartzHome), fact("招生说明", "主页给出 prospective-student 流程；UBC 不接收实习，Vector 偶尔开放实习", s.shwartzContact)], sources: [s.shwartzHome, s.shwartzContact, s.shwartzUbc], lastVerifiedAt: checkedAt },
  "kwang-moo-yi-ca": { summary: "UBC Computer Vision Lab 的视觉几何 PI，研究局部特征、三维重建与鲁棒匹配；学术轨迹连接 SNU、EPFL 与 University of Victoria。", facts: [fact("当前角色", "Associate Professor · UBC Computer Vision Lab", s.yiUbc), fact("博士师承", "Seoul National University PhD · adviser Jin Young Choi", s.yiHome), fact("职业轨迹", "EPFL postdoc with Pascal Fua and Vincent Lepetit; former UVic assistant professor", s.yiHome)], sources: [s.yiUbc, s.yiHome], lastVerifiedAt: checkedAt },
  "mark-schmidt-ca": { summary: "UBC 大规模机器学习与优化资深 PI，兼具 Canada Research Chair 与 Amii Canada CIFAR AI Chair 身份。", facts: [fact("当前角色", "Professor, UBC Computer Science (promoted 2024)", s.schmidtUbc), fact("教育", "UBC PhD (2010); University of Alberta MSc (2005) and BSc (2003)", s.schmidtHome), fact("职业轨迹", "Postdoctoral research at UBC, ENS Paris and Simon Fraser University", s.schmidtHome)], sources: [s.schmidtUbc, s.schmidtHome], lastVerifiedAt: checkedAt },
  "jeff-clune-ca": { role: "Professor · Canada CIFAR AI Chair · on leave in 2026", summary: "开放式智能与演化计算资深学者，学术和产业轨迹贯穿 Wyoming、Uber AI Labs、OpenAI、DeepMind、UBC 与 Recursive。", facts: [fact("当前角色", "Professor, UBC; on leave January–December 2026", s.cluneUbc), fact("产业与创业", "Co-founder of Recursive; former OpenAI research manager and founding member of Uber AI Labs", s.cluneBio), fact("教育", "Michigan State University PhD and MS; University of Michigan BA", s.cluneBio)], sources: [s.cluneUbc, s.cluneBio, s.cluneUbcNews], lastVerifiedAt: checkedAt },
  "hila-gonen-ca": { summary: "2025 年加入 UBC 的 NLP PI，围绕语言模型可靠性、多语言能力和社会偏见开展研究，并建设新的研究组。", facts: [fact("当前角色", "Assistant Professor, UBC Computer Science", s.gonenDirectory), fact("教育", "MSc, Hebrew University; PhD, Bar-Ilan University", s.gonenUbc), fact("研究组", "Leads a UBC group on reliable and multilingual language models", s.gonenUbc)], sources: [s.gonenUbc, s.gonenDirectory], lastVerifiedAt: checkedAt },
  "richard-sutton-ca": { summary: "阿尔伯塔强化学习学派与 RLAI 的奠基人物、2024 ACM 图灵奖得主；研究和组织轨迹连接 UMass、AT&T、GTE、UAlberta 与 Amii。", facts: [fact("当前角色", "Professor, University of Alberta · Chief Scientific Advisor, Amii", s.suttonAmii), fact("教育", "University of Massachusetts Amherst PhD (1984); Stanford BA in psychology (1978)", s.suttonAmii), fact("研究组织", "Founded the Reinforcement Learning and Artificial Intelligence Laboratory at Alberta in 2003", s.suttonTimeline)], sources: [s.suttonAmii, s.suttonTimeline], lastVerifiedAt: checkedAt },
  "martha-white-ca": { role: "Associate Professor · Amii Fellow · Canada CIFAR AI Chair", summary: "RLAI 强化学习 PI、Amii Fellow 与 RLCore 联合创办人；博士阶段由 Michael Bowling 与 Dale Schuurmans 共同指导。", facts: [fact("当前角色", "Associate Professor, University of Alberta · Amii Fellow · Canada CIFAR AI Chair", s.whiteMarthaAmii), fact("博士师承", "University of Alberta PhD (2014) · Michael Bowling and Dale Schuurmans", s.whiteMarthaCv), fact("创业与培养", "Founder and CEO of RLCore; public profile records supervision of 30+ early-career researchers", s.whiteMarthaAmii)], sources: [s.whiteMarthaAmii, s.whiteMarthaCv], lastVerifiedAt: checkedAt },
  "adam-white-ca": { role: "Associate Professor · Director, Amii · Canada CIFAR AI Chair", summary: "RLAI 强化学习 PI、Amii Director 与 RLCore 联合创办人，曾于 2017–2023 年在 DeepMind 从事强化学习研究。", facts: [fact("当前角色", "Associate Professor, University of Alberta · Director, Amii", s.whiteAdamUa), fact("教育", "University of Alberta PhD (2015) and MSc (2006); UNB BSc (2004)", s.whiteAdamUa), fact("产业与创业", "RLCore co-founder/CSO; DeepMind research scientist, 2017–2023", s.whiteAdamHome)], sources: [s.whiteAdamUa, s.whiteAdamHome], lastVerifiedAt: checkedAt },
  "michael-bowling-ca": { summary: "阿尔伯塔强化学习与多智能体系统资深 PI，创建 Computer Poker Research Group，并推动 Arcade Learning Environment。", facts: [fact("当前角色", "Professor, University of Alberta", s.bowlingUa), fact("博士师承", "Carnegie Mellon University PhD (2003) · adviser Manuela Veloso", s.bowlingCv), fact("阿尔伯塔轨迹", "Assistant Professor 2003–2008, Associate Professor 2008–2013, Professor since 2013", s.bowlingCv)], sources: [s.bowlingUa, s.bowlingCv], lastVerifiedAt: checkedAt },
  "csaba-szepesvari-ca": { summary: "强化学习、bandits 与学习理论资深 PI；在 UAlberta 与 Google DeepMind 之间保持跨学术界和产业研究的长期连接。", facts: [fact("当前角色", "Professor, University of Alberta · Canada CIFAR AI Chair", s.szepesvariUa), fact("产业连接", "Leads a Foundations team at Google DeepMind; on partial leave from Alberta since 2017", s.szepesvariHome), fact("教育与招生", "PhD in probability and statistics (1999); homepage provides a prospective MSc/PhD entry", s.szepesvariHome)], sources: [s.szepesvariUa, s.szepesvariHome], lastVerifiedAt: checkedAt },
  "patrick-pilarski-ca": { role: "Professor, Physical Medicine & Rehabilitation · Canada CIFAR AI Chair", summary: "医工交叉强化学习 PI，主职在 UAlberta 医学院；连接 RLAI、iSMART、BLINC 人机接口研究与 DeepMind Edmonton。", facts: [fact("当前角色", "Professor, Division of Physical Medicine & Rehabilitation, Department of Medicine", s.pilarskiUa), fact("训练轨迹", "UAlberta ECE PhD (2009); postdoctoral training with Richard Sutton through 2014", s.pilarskiUa), fact("产业连接", "Co-led DeepMind Edmonton and served as Senior Staff Research Scientist through 2023", s.pilarskiHome)], sources: [s.pilarskiUa, s.pilarskiHome], lastVerifiedAt: checkedAt },
  "pascal-poupart-ca": { summary: "Waterloo 机器学习与强化学习资深 PI、Vector Research Director；职业轨迹连接 Toronto 博士训练与 Borealis AI Waterloo。", facts: [fact("当前角色", "Professor, Waterloo · Canada CIFAR AI Chair · Vector Research Director", s.poupartUw), fact("教育", "McGill BSc (1998), UBC MSc (2000), University of Toronto PhD (2005)", s.poupartBio), fact("产业连接", "Borealis AI Waterloo Research Director and Principal Scientist, 2018–2020", s.poupartBio)], sources: [s.poupartUw, s.poupartBio], lastVerifiedAt: checkedAt },
  "jimmy-lin-ca": { summary: "Waterloo 信息检索与数据系统资深 PI，MIT 博士训练后长期连接 Maryland、Twitter、Cloudera、Waterloo 与产业搜索团队。", facts: [fact("当前角色", "Professor · David R. Cheriton Chair, Waterloo", s.linUw), fact("教育", "MIT BS (2000), MEng (2001), PhD (2004)", s.linHome), fact("产业轨迹", "Twitter sabbatical 2010–2012; later work with Cloudera and Primal", s.linHome)], sources: [s.linUw, s.linHome], lastVerifiedAt: checkedAt },
  "kate-larson-ca": { summary: "多智能体系统、算法博弈论与协作 AI 资深 PI，兼具 Waterloo University Research Chair 与 Google DeepMind 研究角色。", facts: [fact("当前角色", "Professor · University Research Chair, Waterloo", s.larsonUw), fact("教育", "Carnegie Mellon University PhD (2004); Washington University MSc; Memorial BSc", s.larsonAai), fact("产业连接", "Research Scientist at Google DeepMind", s.larsonAai)], sources: [s.larsonUw, s.larsonAai], lastVerifiedAt: checkedAt },
  "wenhu-chen-ca": { summary: "Waterloo NLP、知识推理与多模态学习 PI；UCSB 博士由 William Wang 指导，加入 Waterloo 前曾在 Google Research 工作。", facts: [fact("当前角色", "Assistant Professor, Waterloo (since 2022)", s.chenUw), fact("博士师承", "UC Santa Barbara PhD · adviser William Wang", s.chenNews), fact("招生状态", "Personal homepage says the group is always looking for talented and self-motivated students", s.chenHome)], sources: [s.chenUw, s.chenNews, s.chenHome], lastVerifiedAt: checkedAt },
  "freda-shi-ca": { summary: "Waterloo CompLING Lab 负责人，研究 grounded language learning、计算多语言学与 NLP；博士由 Karen Livescu 与 Kevin Gimpel 共同指导。", facts: [fact("当前角色", "Assistant Professor, Waterloo · Canada CIFAR AI Chair · Vector Faculty", s.shiUw), fact("博士师承", "TTIC PhD (2024) · Karen Livescu and Kevin Gimpel", s.shiNews), fact("研究组织", "Leads Waterloo's CompLING Lab", s.shiUw)], sources: [s.shiUw, s.shiNews], lastVerifiedAt: checkedAt },
  "victor-zhong-ca": { summary: "Waterloo Reading to Learn Lab 负责人，研究让模型通过语言与交互更高效地学习；经历覆盖 Salesforce Research、MSR、Meta AI 与 Google Brain。", facts: [fact("当前角色", "Tenure-track Assistant Professor, Waterloo (since August 2024)", s.zhongUw), fact("教育", "University of Washington PhD (2023), Stanford MS (2016), Toronto BASc (2014)", s.zhongNews), fact("职业轨迹", "Former Microsoft Research postdoc and founding member of Salesforce Research; also worked at Meta AI and Google Brain", s.zhongNews)], sources: [s.zhongUw, s.zhongNews], lastVerifiedAt: checkedAt },
  "yuntian-deng-ca": { summary: "Waterloo NLP/ML 发展期 PI，研究多智能体与语言模型通信；Harvard 博士后在 AI2 接受 Yejin Choi 指导。", facts: [fact("当前角色", "Assistant Professor, Waterloo (since August 2024)", s.dengUw), fact("博士师承", "Harvard PhD (2023) · Alexander Rush and Stuart Shieber", s.dengNews), fact("博士后训练", "Allen Institute for AI postdoc · adviser Yejin Choi", s.dengNews)], sources: [s.dengUw, s.dengNews], lastVerifiedAt: checkedAt },
};

export const canadaWestRelationships: Relationship[] = [
  { id: "ca-west-black-sigal", from: "michael-black-eu", to: "leonid-sigal-ca", type: "lineage", subtype: "phd_adviser", label: "博士导师", evidence: "Leonid Sigal 的 Brown 博士论文明确列 Michael J. Black 为 supervisor。", source: s.sigalThesis, verified: true },
  { id: "ca-west-bowling-martha-white", from: "michael-bowling-ca", to: "martha-white-ca", type: "lineage", subtype: "co_adviser", label: "共同博士导师", evidence: "Martha White 的公开 CV 明确列 Michael Bowling 与 Dale Schuurmans 为博士导师。", source: s.whiteMarthaCv, verified: true },
  { id: "ca-west-sutton-pilarski", from: "richard-sutton-ca", to: "patrick-pilarski-ca", type: "lineage", subtype: "postdoc_mentor", label: "博士后指导", evidence: "UAlberta 官方简介明确记录 Patrick Pilarski 在 Richard Sutton 指导下开展博士后研究。", source: s.pilarskiUa, verified: true },
];

// The first-party pages audited in this pass did not provide a stable, complete
// current-member or alumnus-placement table for these 19 people.  Keep these
// arrays explicit and empty rather than inferring membership from co-authorship.
export const canadaWestGroupMembers: GroupMember[] = [];
export const canadaWestStudentPlacements: StudentPlacement[] = [];

