import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  korhonenCambridge: source(
    "Cambridge MMLL · Anna Korhonen",
    "https://www.mmll.cam.ac.uk/people/anna-korhonen",
    "official",
    "Anna Korhonen 的 Cambridge 任职、研究方向及页面所列受指导学生",
  ),
  cambridgePhdRegister: source(
    "Cambridge Computer Science · PhD students by supervisor",
    "https://www.cl.cam.ac.uk/lists/phd/supervisor.html",
    "official",
    "Cambridge 学位委员会维护的博士生—导师名录，包括 Anna Korhonen、Neil Lawrence 与 Ferenc Huszár 的记录",
  ),
  huszarCambridge: source(
    "Cambridge Computer Science · Ferenc Huszár",
    "https://www.cst.cam.ac.uk/people/fh277",
    "official",
    "Ferenc Huszár 的 Cambridge 教授任职、研究方向和产业经历",
  ),
  huszarHome: source(
    "Ferenc Huszár · About",
    "https://www.inference.vc/about/",
    "profile",
    "Ferenc Huszár 本人对博士训练及 Carl Rasmussen、Máté Lengyel、Zoubin Ghahramani 指导关系的说明",
  ),
  wooldridgeOxford: source(
    "Oxford Computer Science · Michael Wooldridge",
    "https://www.cs.ox.ac.uk/people/michael.wooldridge/",
    "official",
    "Michael Wooldridge 的 Oxford 任职、研究方向及 Past Students 名单",
  ),
  cipollaCambridge: source(
    "Cambridge Engineering · Roberto Cipolla",
    "https://www.eng.cam.ac.uk/profiles/rc10001",
    "official",
    "Roberto Cipolla 的 Cambridge 任职与机器视觉研究方向",
  ),
  cipollaThesis: source(
    "Roberto Cipolla · Active Visual Inference of Surface Shape",
    "https://mi.eng.cam.ac.uk/~cipolla/publications/authoredBook/1995-LNCS-Cipolla-book.pdf",
    "thesis",
    "作者前言明确说明相关博士研究在 Andrew Blake 指导下完成",
  ),
  kendallCambridge: source(
    "Cambridge Engineering · Alex Kendall alumni story",
    "https://www.eng.cam.ac.uk/news/alumni-stories-meet-alex-kendall-autonomous-vehicle-pioneer-global-ambition",
    "official",
    "Cambridge 官方校友报道明确 Alex Kendall 的博士导师为 Roberto Cipolla",
  ),
  cipollaStudentsCambridge: source(
    "Cambridge Engineering · Machine Intelligence Laboratory",
    "https://www.eng.cam.ac.uk/node/194",
    "official",
    "Cambridge 官方页面明确 Duncan Robertson 为 Roberto Cipolla 的 former PhD student，并列出博士生 Yu Chen",
  ),
  haleOxford: source(
    "Oxford Internet Institute · Scott A. Hale",
    "https://www.oii.ox.ac.uk/people/profiles/scott-hale/",
    "official",
    "Scott A. Hale 的 Oxford 职务、研究方向及当前博士生名单",
  ),
  haleThesis: source(
    "Oxford Research Archive · Scott Hale doctoral thesis",
    "https://ora.ox.ac.uk/objects/uuid%3A3040a250-c526-4f10-aa9b-25117fd4dea2",
    "thesis",
    "Oxford 博士论文记录及 Eric Meyer、Sandra González-Bailón 的导师字段",
  ),
  vlachosHome: source(
    "Andreas Vlachos · Cambridge homepage",
    "https://andreasvlachos.github.io/",
    "profile",
    "Andreas Vlachos 的 Cambridge 任职、研究方向及 Ted Briscoe、Zoubin Ghahramani 博士指导说明",
  ),
  vlachosTeam: source(
    "Andreas Vlachos · Team and collaborators",
    "https://andreasvlachos.github.io/_pages/0_collabs/",
    "profile",
    "Andreas Vlachos 本人维护的当前博士生、博士后与校友名录",
  ),
  vggPeople: source(
    "Oxford Visual Geometry Group · People",
    "https://robots.ox.ac.uk/~vgg/people.html",
    "official",
    "VGG 官方人员页列出 Andrew Zisserman、Andrea Vedaldi 与当前 research students",
  ),
  bronsteinOxford: source(
    "Oxford Computer Science · Michael Bronstein",
    "https://www.cs.ox.ac.uk/people/michael.bronstein/",
    "official",
    "Michael Bronstein 的 Oxford 职务、研究方向与当前博士生名单",
  ),
  blackMpi: source(
    "Max Planck Institute for Intelligent Systems · Michael J. Black",
    "https://is.mpg.de/en/person/black",
    "official",
    "Michael J. Black 的 Epic Games 现职、MPI-IS emeritus 身份、研究方向与退休说明",
  ),
  blackCvpr: source(
    "MPI-IS · Michael Black, Deqing Sun and Stefan Roth CVPR award",
    "https://is.mpg.de/en/news/michael-j-black-awarded-major-test-of-time-prize-at-the-2020-conference-on-computer-vision-and-pattern-recognition-cvpr",
    "official",
    "MPI-IS 官方报道明确 Deqing Sun 与 Stefan Roth 为 Michael Black 的 former students",
  ),
  tripathiThesis: source(
    "MPI-IS · Shashank Tripathi doctoral thesis",
    "https://is.mpg.de/uploads/publication_attachment/attachment/817/Shashank_Thesis_for_web.pdf",
    "thesis",
    "Shashank Tripathi 博士论文致谢明确 Michael Black 的导师身份",
  ),
  lawrenceCambridge: source(
    "Cambridge Computer Science · Neil Lawrence",
    "https://www.cst.cam.ac.uk/people/ndl21",
    "official",
    "Neil Lawrence 的 DeepMind Professorship、研究方向与学术经历",
  ),
  rainforthOxford: source(
    "Oxford Statistics · Tom Rainforth",
    "https://www.stats.ox.ac.uk/people/tom-rainforth?page=1",
    "official",
    "Tom Rainforth 的 Oxford 任职、研究方向和团队入口",
  ),
  rainforthGroup: source(
    "Tom Rainforth · Group",
    "https://www.robots.ox.ac.uk/~twgr/group/",
    "profile",
    "Tom Rainforth 本人维护的博士后、DPhil 学生与校友名单",
  ),
  rainforthCv: source(
    "Tom Rainforth · Curriculum vitae",
    "https://www.robots.ox.ac.uk/~twgr/assets/pdf/tom_rainforth_cv.pdf",
    "cv",
    "Tom Rainforth 的 Oxford DPhil 及 Frank Wood、Michael Osborne 共同指导记录",
  ),
  oatmlMembers: source(
    "Oxford Applied and Theoretical Machine Learning · Members",
    "https://oatml.cs.ox.ac.uk/members.html",
    "official",
    "OATML 官方成员名录及 Yarin Gal 团队成员",
  ),
  yarinOatml: source(
    "OATML · Yarin Gal",
    "https://oatml.cs.ox.ac.uk/members/yarin/",
    "official",
    "Yarin Gal 的 OATML 领导角色、研究方向与 Zoubin Ghahramani 博士指导记录",
  ),
  carlCambridge: source(
    "Cambridge Machine Learning Group · Carl Edward Rasmussen",
    "https://mlg.eng.cam.ac.uk/carl/",
    "profile",
    "Carl Rasmussen 本人维护的博士导师、当前学生及历届 students and postdocs 名单",
  ),
  torrOxford: source(
    "Oxford Engineering · Philip Torr",
    "https://eng.ox.ac.uk/people/philip-torr",
    "official",
    "Philip Torr 的 Oxford 教授职务、计算机视觉研究与 David Murray 博士指导记录",
  ),
  torrVision: source(
    "Torr Vision Group · People",
    "https://torrvision.com/people/",
    "profile",
    "Torr Vision Group 本人团队页列出的当前 graduate students 与毕业博士生",
  ),
  tehGroup: source(
    "Yee Whye Teh · Research Group",
    "https://www.stats.ox.ac.uk/~teh/group.html",
    "profile",
    "Yee Whye Teh 本人维护的当前研究组成员及共同指导信息",
  ),
  zoubinCambridge: source(
    "Cambridge Machine Learning Group · Zoubin Ghahramani",
    "https://mlg.eng.cam.ac.uk/zoubin/",
    "profile",
    "Zoubin Ghahramani 本人维护的 Cambridge 研究简介及 students and postdocs 名单",
  ),
};

const fact = (label: string, value: string, factSource: Source): NonNullable<Person["facts"]>[number] => ({
  label,
  value,
  source: factSource,
});

const member = (
  id: string,
  teacherId: string,
  name: string,
  role: string,
  memberSource: Source,
  focus?: string,
): GroupMember => ({ id, teacherId, name, role, focus, source: memberSource });

const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: NonNullable<Relationship["subtype"]>,
  evidence: string,
  relationshipSource: Source,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label: subtype === "co_adviser" ? "共同博士导师" : "博士导师",
  evidence,
  evidenceObject: "本人履历或官方博士导师记录",
  source: relationshipSource,
  verified: true,
});

/**
 * Europe slice of the influence-priority audit queue. This module intentionally
 * uses only university/institute pages, first-party group rosters, CVs and theses.
 * Ordinary co-authorship is not encoded as supervision or team membership.
 */
export const influenceQueueEuropePersonEnhancements: Record<string, Partial<Person>> = {
  "anna-korhonen-eu": {
    summary: "Cambridge Language Technology Lab 负责人，研究计算语言学、语义表示与面向人类健康和社会挑战的 NLP；官方页面同时提供具名受指导学生名录。",
    facts: [
      fact("当前任职", "Cambridge 教授，并领导 Language Technology Lab。", sources.korhonenCambridge),
      fact("研究主线", "计算语言学、词汇语义、语言模型及面向健康与社会挑战的 NLP。", sources.korhonenCambridge),
      fact("博士训练", "Cambridge 学位委员会名录将其博士论文列在 Ted Briscoe 名下。", sources.cambridgePhdRegister),
      fact("人才培养", "官方页面公开列出 Panagiotis Fytas、Songbo Hu、Evgeniia Razumovskaia 等受指导学生。", sources.korhonenCambridge),
    ],
    sources: [sources.korhonenCambridge, sources.cambridgePhdRegister],
    lastVerifiedAt: checkedAt,
  },
  "ferenc-huszar-eu": {
    summary: "Cambridge 机器学习教授，研究生成模型、深度学习与概率建模；本人履历明确其博士训练连接 Carl Rasmussen、Máté Lengyel 与 Zoubin Ghahramani。",
    facts: [
      fact("当前任职", "University of Cambridge 机器学习教授。", sources.huszarCambridge),
      fact("研究主线", "深度生成模型、概率机器学习及神经网络。", sources.huszarCambridge),
      fact("博士师承", "本人履历明确博士阶段由 Carl Rasmussen、Máté Lengyel 与 Zoubin Ghahramani 指导。", sources.huszarHome),
      fact("产业经历", "Cambridge 官方简介记录其曾共同创办 Magic Pony Technology，后在 Twitter 任职。", sources.huszarCambridge),
    ],
    sources: [sources.huszarCambridge, sources.huszarHome, sources.cambridgePhdRegister],
    lastVerifiedAt: checkedAt,
  },
  "michael-wooldridge-eu": {
    summary: "Oxford 计算机科学教授，长期研究多智能体系统与 AI 的逻辑基础；官方主页公开列出一批已毕业学生。",
    facts: [
      fact("当前任职", "Oxford Department of Computer Science 教授。", sources.wooldridgeOxford),
      fact("研究主线", "多智能体系统、理性行动及 AI 的逻辑和计算基础。", sources.wooldridgeOxford),
      fact("人才培养", "Oxford 官方主页的 Past Students 名单包括 Jiarui Gan、Lewis Hammond、Dongge Han 等。", sources.wooldridgeOxford),
      fact("为什么值得关注", "其公开学生网络把多智能体与博弈研究延伸到多所高校和研究机构。", sources.wooldridgeOxford),
    ],
    sources: [sources.wooldridgeOxford],
    lastVerifiedAt: checkedAt,
  },
  "roberto-cipolla-eu": {
    summary: "Cambridge 机器视觉资深教授，研究三维视觉、识别与机器人感知；博士训练上游连接 Andrew Blake，学生网络包括 Wayve 联合创始人 Alex Kendall。",
    facts: [
      fact("当前任职", "Cambridge Engineering 教授，研究机器视觉与机器人感知。", sources.cipollaCambridge),
      fact("博士师承", "其 Cambridge-hosted 博士研究专著前言明确工作在 Andrew Blake 指导下完成。", sources.cipollaThesis),
      fact("人才培养", "Cambridge 官方报道明确 Alex Kendall 在 Roberto Cipolla 指导下完成博士研究。", sources.kendallCambridge),
      fact("学生网络", "Cambridge 官方页面还明确 Duncan Robertson 为 former PhD student，并列出博士生 Yu Chen。", sources.cipollaStudentsCambridge),
    ],
    sources: [sources.cipollaCambridge, sources.cipollaThesis, sources.kendallCambridge, sources.cipollaStudentsCambridge],
    lastVerifiedAt: checkedAt,
  },
  "scott-hale-award": {
    role: "Professor of Social Data Science · Director, Oxford Internet Institute",
    summary: "Oxford Internet Institute 主任、社会数据科学教授，研究多语种在线信息、数字不平等与公共政策；官方页面公开列出当前博士生。",
    facts: [
      fact("当前任职", "Professor of Social Data Science，并任 Oxford Internet Institute Director。", sources.haleOxford),
      fact("研究主线", "多语种在线信息、数字不平等、社会数据科学与公共政策。", sources.haleOxford),
      fact("博士师承", "Oxford Research Archive 将 Eric Meyer 与 Sandra González-Bailón 列为其博士论文导师。", sources.haleThesis),
      fact("人才培养", "官方页面列出 Hannah Rose Kirk、Yixin Chen、Manuel Tonneau 等当前博士生。", sources.haleOxford),
    ],
    sources: [sources.haleOxford, sources.haleThesis],
    lastVerifiedAt: checkedAt,
  },
  "andreas-vlachos-eu": {
    summary: "Cambridge NLP 教授，研究事实核验、结构化预测与面向真实世界的信息处理；本人主页公开博士师承与当前团队。",
    facts: [
      fact("当前任职", "Cambridge 教授并领导面向真实世界问题的 NLP 研究。", sources.vlachosHome),
      fact("博士师承", "本人主页明确其博士阶段由 Ted Briscoe 与 Zoubin Ghahramani 指导。", sources.vlachosHome),
      fact("当前团队", "本人团队页列出 Eric Chamoun、Yulong Chen、Yizhou Chi 等博士生或博士后。", sources.vlachosTeam),
      fact("研究主线", "事实核验、结构化预测、机器学习与自然语言处理。", sources.vlachosHome),
    ],
    sources: [sources.vlachosHome, sources.vlachosTeam],
    lastVerifiedAt: checkedAt,
  },
  "andrew-zisserman-eu": {
    summary: "Oxford Visual Geometry Group 核心教授，长期研究视觉识别、视频理解与视觉几何；VGG 官方 roster 展示其跨代际研究团队。",
    facts: [
      fact("研究组织", "Oxford VGG 官方人员页将 Andrew Zisserman 列为 Principal Researcher。", sources.vggPeople),
      fact("研究主线", "视觉识别、视频理解与视觉几何。", sources.vggPeople),
      fact("团队网络", "VGG roster 列出 Niki Amini-Naieni、Piyush Bagad、Minghao Chen 等当前 research students。", sources.vggPeople),
      fact("证据边界", "本模块仅把这些人物记录为 VGG 团队成员，不由 roster 推断一对一博士指导。", sources.vggPeople),
    ],
    sources: [sources.vggPeople],
    lastVerifiedAt: checkedAt,
  },
  "michael-bronstein-eu": {
    summary: "Oxford 几何深度学习教授，研究图神经网络、非欧几里得学习与结构化表示；官方主页公开当前学生名录。",
    facts: [
      fact("当前任职", "Oxford Department of Computer Science 教授。", sources.bronsteinOxford),
      fact("研究主线", "几何深度学习、图神经网络及非欧几里得数据分析。", sources.bronsteinOxford),
      fact("人才培养", "官方主页列出 Jacob Bamberger、Federico Barbero、Oscar Davis 等当前学生。", sources.bronsteinOxford),
      fact("为什么值得关注", "其团队把几何学习连接到图、分子、视觉与科学机器学习。", sources.bronsteinOxford),
    ],
    sources: [sources.bronsteinOxford],
    lastVerifiedAt: checkedAt,
  },
  "michael-black-eu": {
    role: "Vice President, Digital Human Research at Epic Games · Emeritus Director, MPI-IS",
    summary: "计算机视觉与人体建模资深学者，现任 Epic Games 数字人研究副总裁、MPI-IS Emeritus Director；官方材料可核验多位 former students。",
    facts: [
      fact("当前任职", "Epic Games Vice President for Digital Human Research，并为 MPI-IS Emeritus Director。", sources.blackMpi),
      fact("状态说明", "MPI-IS 页面说明其已退休并不再接收新学生。", sources.blackMpi),
      fact("人才培养", "MPI-IS 官方报道明确 Deqing Sun 与 Stefan Roth 为 Michael Black 的 former students。", sources.blackCvpr),
      fact("博士指导", "Shashank Tripathi 的 MPI-IS 博士论文致谢明确 Michael Black 的导师身份。", sources.tripathiThesis),
    ],
    sources: [sources.blackMpi, sources.blackCvpr, sources.tripathiThesis],
    lastVerifiedAt: checkedAt,
  },
  "neil-lawrence-eu": {
    summary: "Cambridge 首任 DeepMind Professor of Machine Learning，研究概率机器学习、数据科学与人本 AI；官方博士名录展示其学生网络。",
    facts: [
      fact("当前任职", "Cambridge DeepMind Professor of Machine Learning。", sources.lawrenceCambridge),
      fact("研究主线", "概率机器学习、数据科学及机器学习系统的社会影响。", sources.lawrenceCambridge),
      fact("人才培养", "Cambridge 学位委员会名录在 Neil Lawrence 名下列出 Samuel Bell、Andrei Paleyes、Francisco Vargas 等博士生。", sources.cambridgePhdRegister),
      fact("为什么值得关注", "其学术与产业经历连接概率机器学习、企业研究和公共技术治理。", sources.lawrenceCambridge),
    ],
    sources: [sources.lawrenceCambridge, sources.cambridgePhdRegister],
    lastVerifiedAt: checkedAt,
  },
  "tom-rainforth-lineage": {
    summary: "Oxford 统计与机器学习教授，研究概率推断、生成模型与 AI 安全；本人 CV 和团队页分别给出博士师承与当前培养网络。",
    facts: [
      fact("当前任职", "Oxford Department of Statistics 学术人员，研究机器学习与概率推断。", sources.rainforthOxford),
      fact("博士师承", "本人 CV 明确 Oxford DPhil 由 Frank Wood 与 Michael Osborne 共同指导。", sources.rainforthCv),
      fact("当前团队", "本人团队页列出 Tom Rossa、Ole Jorgensen、Zhuoyue Huang 等博士后或 DPhil 学生。", sources.rainforthGroup),
      fact("研究主线", "概率推断、生成模型、机器学习方法与 AI 安全。", sources.rainforthOxford),
    ],
    sources: [sources.rainforthOxford, sources.rainforthCv, sources.rainforthGroup],
    lastVerifiedAt: checkedAt,
  },
  "yarin-gal-eu": {
    summary: "Oxford OATML 负责人，研究贝叶斯深度学习、不确定性与安全机器学习；OATML 官方成员页公开团队组成。",
    facts: [
      fact("研究组织", "Yarin Gal 领导 Oxford Applied and Theoretical Machine Learning group。", sources.yarinOatml),
      fact("博士师承", "OATML 官方个人页明确其博士导师为 Zoubin Ghahramani。", sources.yarinOatml),
      fact("当前团队", "OATML 名录列出 Anushka Nair、Shreshth Malik、Hazel Kim 等研究成员。", sources.oatmlMembers),
      fact("研究主线", "贝叶斯深度学习、不确定性估计和安全机器学习。", sources.yarinOatml),
    ],
    sources: [sources.yarinOatml, sources.oatmlMembers],
    lastVerifiedAt: checkedAt,
  },
  "carl-rasmussen-lineage": {
    summary: "Cambridge 概率机器学习教授，高斯过程代表性学者；本人主页同时公开 Geoffrey Hinton 博士师承以及 current/former students and postdocs。",
    facts: [
      fact("当前任职", "Cambridge Machine Learning Group 教授。", sources.carlCambridge),
      fact("博士师承", "本人主页明确其博士阶段师从 Geoffrey Hinton。", sources.carlCambridge),
      fact("人才培养", "本人 roster 列出 Talay Cheema、Stratis Markou 以及 Marc Deisenroth 等 current/former students and postdocs。", sources.carlCambridge),
      fact("研究主线", "高斯过程、贝叶斯机器学习与概率建模。", sources.carlCambridge),
    ],
    sources: [sources.carlCambridge],
    lastVerifiedAt: checkedAt,
  },
  "philip-torr-eu": {
    summary: "Oxford 计算机视觉资深教授、Torr Vision Group 负责人，研究视觉识别、深度学习与可信 AI；官方资料公开博士师承和团队 roster。",
    facts: [
      fact("当前任职", "Oxford Engineering 计算机视觉与机器学习教授。", sources.torrOxford),
      fact("博士师承", "Oxford 官方简介明确其博士导师为 David Murray。", sources.torrOxford),
      fact("当前团队", "TVG 人员页列出 Aleksandar Petrov、Jensen Zhou、Alexander Pondaven 等 graduate students。", sources.torrVision),
      fact("研究主线", "计算机视觉、机器学习、视觉识别与可信 AI。", sources.torrOxford),
    ],
    sources: [sources.torrOxford, sources.torrVision],
    lastVerifiedAt: checkedAt,
  },
  "yee-whye-teh-lineage": {
    summary: "Oxford 统计机器学习教授，研究贝叶斯非参数、概率建模与强化学习；本人研究组页面公开当前成员和共同指导信息。",
    facts: [
      fact("当前团队", "本人团队页列出 Abbas Mammadov、Hen Davidov、Paul Francis 等当前成员。", sources.tehGroup),
      fact("研究主线", "贝叶斯非参数、概率机器学习与强化学习。", sources.tehGroup),
      fact("证据边界", "团队页明确标注部分共同指导关系；本模块只按页面角色记录，不将普通合作推断为指导。", sources.tehGroup),
      fact("为什么值得关注", "其研究组连接 Oxford 概率建模、强化学习与机器学习理论网络。", sources.tehGroup),
    ],
    sources: [sources.tehGroup],
    lastVerifiedAt: checkedAt,
  },
  "andrea-vedaldi-oxford-award": {
    summary: "Oxford Visual Geometry Group 核心教授，研究视觉表征、识别与机器学习；VGG 官方 roster 展示其共同构建的跨代际团队。",
    facts: [
      fact("研究组织", "Oxford VGG 官方人员页将 Andrea Vedaldi 列为 Principal Researcher。", sources.vggPeople),
      fact("研究主线", "视觉表征、识别、深度学习与视觉几何。", sources.vggPeople),
      fact("团队网络", "VGG roster 列出 Niki Amini-Naieni、Piyush Bagad、Minghao Chen 等当前 research students。", sources.vggPeople),
      fact("证据边界", "本模块只记录公开 roster 中的团队归属，不据此推断一对一博士师承。", sources.vggPeople),
    ],
    sources: [sources.vggPeople],
    lastVerifiedAt: checkedAt,
  },
  "zoubin-ghahramani-eu": {
    summary: "Cambridge 概率机器学习资深学者，研究贝叶斯学习、概率模型与非参数方法；本人主页公开一批 students and postdocs。",
    facts: [
      fact("研究主线", "贝叶斯机器学习、概率模型与非参数方法。", sources.zoubinCambridge),
      fact("人才培养", "本人 roster 列出 Matej Balog、John Bradshaw、Karolina Dziugaite 等 students and postdocs。", sources.zoubinCambridge),
      fact("谱系扩散", "其公开培养网络延伸到 Cambridge、Oxford 及产业研究团队。", sources.zoubinCambridge),
      fact("证据边界", "本模块仅采用本人明确列为 student 或 postdoc 的人员，不由合著关系推断指导。", sources.zoubinCambridge),
    ],
    sources: [sources.zoubinCambridge],
    lastVerifiedAt: checkedAt,
  },
};

/** Existing-node adviser edges only; adviser points to trainee. */
export const influenceQueueEuropeRelationships: Relationship[] = [
  lineage(
    "influence-eu-carl-ferenc-coadvisor",
    "carl-rasmussen-lineage",
    "ferenc-huszar-eu",
    "co_adviser",
    "Ferenc Huszár 本人履历明确 Carl Rasmussen 是其博士导师之一。",
    sources.huszarHome,
  ),
  lineage(
    "influence-eu-zoubin-ferenc-coadvisor",
    "zoubin-ghahramani-eu",
    "ferenc-huszar-eu",
    "co_adviser",
    "Ferenc Huszár 本人履历明确 Zoubin Ghahramani 是其博士导师之一。",
    sources.huszarHome,
  ),
];

export const influenceQueueEuropeGroupMembers: GroupMember[] = [
  member("influence-eu-korhonen-fytas", "anna-korhonen-eu", "Panagiotis Fytas", "Supervised student", sources.korhonenCambridge, "Cambridge MMLL supervisor roster"),
  member("influence-eu-korhonen-hu", "anna-korhonen-eu", "Songbo Hu", "Supervised student", sources.korhonenCambridge, "Cambridge MMLL supervisor roster"),
  member("influence-eu-korhonen-razumovskaia", "anna-korhonen-eu", "Evgeniia Razumovskaia", "Supervised student", sources.korhonenCambridge, "Cambridge MMLL supervisor roster"),

  member("influence-eu-huszar-carrell", "ferenc-huszar-eu", "Annabelle Carrell", "PhD student", sources.cambridgePhdRegister, "Cambridge doctoral supervisor register"),
  member("influence-eu-huszar-rajkumar", "ferenc-huszar-eu", "Nitarshan Rajkumar", "PhD student", sources.cambridgePhdRegister, "Cambridge doctoral supervisor register"),
  member("influence-eu-huszar-stankeviciute", "ferenc-huszar-eu", "Kamilė Stankevičiūtė", "PhD student", sources.cambridgePhdRegister, "Cambridge doctoral supervisor register"),

  member("influence-eu-wooldridge-gan", "michael-wooldridge-eu", "Jiarui Gan", "Past student", sources.wooldridgeOxford, "Oxford official Past Students list"),
  member("influence-eu-wooldridge-hammond", "michael-wooldridge-eu", "Lewis Hammond", "Past student", sources.wooldridgeOxford, "Oxford official Past Students list"),
  member("influence-eu-wooldridge-han", "michael-wooldridge-eu", "Dongge Han", "Past student", sources.wooldridgeOxford, "Oxford official Past Students list"),

  member("influence-eu-cipolla-kendall", "roberto-cipolla-eu", "Alex Kendall", "Former PhD student", sources.kendallCambridge, "Wayve co-founder"),
  member("influence-eu-cipolla-robertson", "roberto-cipolla-eu", "Duncan Robertson", "Former PhD student", sources.cipollaStudentsCambridge),
  member("influence-eu-cipolla-chen", "roberto-cipolla-eu", "Yu Chen", "PhD student", sources.cipollaStudentsCambridge),

  member("influence-eu-hale-kirk", "scott-hale-award", "Hannah Rose Kirk", "Doctoral student", sources.haleOxford),
  member("influence-eu-hale-yixin-chen", "scott-hale-award", "Yixin Chen", "Doctoral student", sources.haleOxford),
  member("influence-eu-hale-tonneau", "scott-hale-award", "Manuel Tonneau", "Doctoral student", sources.haleOxford),

  member("influence-eu-vlachos-chamoun", "andreas-vlachos-eu", "Eric Chamoun", "PhD student", sources.vlachosTeam),
  member("influence-eu-vlachos-yulong-chen", "andreas-vlachos-eu", "Yulong Chen", "Postdoctoral researcher", sources.vlachosTeam),
  member("influence-eu-vlachos-chi", "andreas-vlachos-eu", "Yizhou Chi", "PhD student", sources.vlachosTeam),

  member("influence-eu-zisserman-amini", "andrew-zisserman-eu", "Niki Amini-Naieni", "VGG research student", sources.vggPeople),
  member("influence-eu-zisserman-bagad", "andrew-zisserman-eu", "Piyush Bagad", "VGG research student", sources.vggPeople),
  member("influence-eu-zisserman-chen", "andrew-zisserman-eu", "Minghao Chen", "VGG research student", sources.vggPeople),

  member("influence-eu-bronstein-bamberger", "michael-bronstein-eu", "Jacob Bamberger", "Student", sources.bronsteinOxford),
  member("influence-eu-bronstein-barbero", "michael-bronstein-eu", "Federico Barbero", "Student", sources.bronsteinOxford),
  member("influence-eu-bronstein-davis", "michael-bronstein-eu", "Oscar Davis", "Student", sources.bronsteinOxford),

  member("influence-eu-black-sun", "michael-black-eu", "Deqing Sun", "Former student", sources.blackCvpr),
  member("influence-eu-black-roth", "michael-black-eu", "Stefan Roth", "Former student", sources.blackCvpr),
  member("influence-eu-black-tripathi", "michael-black-eu", "Shashank Tripathi", "Former PhD student", sources.tripathiThesis),

  member("influence-eu-lawrence-bell", "neil-lawrence-eu", "Samuel Bell", "PhD student", sources.cambridgePhdRegister, "Cambridge doctoral supervisor register"),
  member("influence-eu-lawrence-paleyes", "neil-lawrence-eu", "Andrei Paleyes", "PhD student", sources.cambridgePhdRegister, "Cambridge doctoral supervisor register"),
  member("influence-eu-lawrence-vargas", "neil-lawrence-eu", "Francisco Vargas", "PhD student", sources.cambridgePhdRegister, "Cambridge doctoral supervisor register"),

  member("influence-eu-rainforth-rossa", "tom-rainforth-lineage", "Tom Rossa", "Postdoctoral researcher", sources.rainforthGroup),
  member("influence-eu-rainforth-jorgensen", "tom-rainforth-lineage", "Ole Jorgensen", "DPhil student", sources.rainforthGroup),
  member("influence-eu-rainforth-huang", "tom-rainforth-lineage", "Zhuoyue Huang", "DPhil student", sources.rainforthGroup),

  member("influence-eu-gal-nair", "yarin-gal-eu", "Anushka Nair", "OATML doctoral researcher", sources.oatmlMembers),
  member("influence-eu-gal-malik", "yarin-gal-eu", "Shreshth Malik", "OATML doctoral researcher", sources.oatmlMembers),
  member("influence-eu-gal-kim", "yarin-gal-eu", "Hazel Kim", "OATML doctoral researcher", sources.oatmlMembers),

  member("influence-eu-rasmussen-cheema", "carl-rasmussen-lineage", "Talay Cheema", "Current student", sources.carlCambridge),
  member("influence-eu-rasmussen-markou", "carl-rasmussen-lineage", "Stratis Markou", "Current student", sources.carlCambridge),
  member("influence-eu-rasmussen-deisenroth", "carl-rasmussen-lineage", "Marc Deisenroth", "Former student / postdoc", sources.carlCambridge),

  member("influence-eu-torr-petrov", "philip-torr-eu", "Aleksandar Petrov", "Graduate student", sources.torrVision),
  member("influence-eu-torr-zhou", "philip-torr-eu", "Jensen (Jinghao) Zhou", "Graduate student", sources.torrVision),
  member("influence-eu-torr-pondaven", "philip-torr-eu", "Alexander Pondaven", "Graduate student", sources.torrVision),

  member("influence-eu-teh-mammadov", "yee-whye-teh-lineage", "Abbas Mammadov", "Current group member", sources.tehGroup),
  member("influence-eu-teh-davidov", "yee-whye-teh-lineage", "Hen Davidov", "Current group member", sources.tehGroup),
  member("influence-eu-teh-francis", "yee-whye-teh-lineage", "Paul Francis", "Current group member", sources.tehGroup),

  member("influence-eu-vedaldi-amini", "andrea-vedaldi-oxford-award", "Niki Amini-Naieni", "VGG research student", sources.vggPeople),
  member("influence-eu-vedaldi-bagad", "andrea-vedaldi-oxford-award", "Piyush Bagad", "VGG research student", sources.vggPeople),
  member("influence-eu-vedaldi-chen", "andrea-vedaldi-oxford-award", "Minghao Chen", "VGG research student", sources.vggPeople),

  member("influence-eu-zoubin-balog", "zoubin-ghahramani-eu", "Matej Balog", "Student / postdoc", sources.zoubinCambridge),
  member("influence-eu-zoubin-bradshaw", "zoubin-ghahramani-eu", "John Bradshaw", "Student / postdoc", sources.zoubinCambridge),
  member("influence-eu-zoubin-dziugaite", "zoubin-ghahramani-eu", "Karolina Dziugaite", "Student / postdoc", sources.zoubinCambridge),
];

/** No new Person is introduced: every audited Europe candidate already exists. */
export const influenceQueueEuropePeople: Person[] = [];

/** No placement is used to satisfy the threshold; team and adviser evidence is direct. */
export const influenceQueueEuropePlacements: StudentPlacement[] = [];

/** No portrait asset is needed because no new Person is introduced. */
export const influenceQueueEuropePortraits: Record<string, NonNullable<Person["portrait"]>> = {};

export const influenceQueueEuropeReviewedIds = [
  "anna-korhonen-eu",
  "ferenc-huszar-eu",
  "michael-wooldridge-eu",
  "roberto-cipolla-eu",
  "scott-hale-award",
  "andreas-vlachos-eu",
  "andrew-zisserman-eu",
  "michael-bronstein-eu",
  "michael-black-eu",
  "neil-lawrence-eu",
  "tom-rainforth-lineage",
  "yarin-gal-eu",
  "carl-rasmussen-lineage",
  "philip-torr-eu",
  "yee-whye-teh-lineage",
  "andrea-vedaldi-oxford-award",
  "zoubin-ghahramani-eu",
] as const;

// Stable aliases let data.ts integrate this independent module without renaming.
export const enhancements = influenceQueueEuropePersonEnhancements;
export const people = influenceQueueEuropePeople;
export const relationships = influenceQueueEuropeRelationships;
export const groupMembers = influenceQueueEuropeGroupMembers;
export const placements = influenceQueueEuropePlacements;
export const portraitMap = influenceQueueEuropePortraits;
