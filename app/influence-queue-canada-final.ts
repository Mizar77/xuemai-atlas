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
  gordonStanford: source(
    "Stanford Profiles · Gordon Wetzstein",
    "https://profiles.stanford.edu/gordon-wetzstein",
    "official",
    "Stanford appointments, Computational Imaging Lab leadership, SCIEN co-directorship, research areas, awards and named doctoral advisees",
  ),
  gordonHome: source(
    "Gordon Wetzstein · Stanford homepage",
    "https://stanford.edu/~gordonwz/",
    "profile",
    "Stanford EE/CS appointments, Physical and Spatial Intelligence Lab leadership, research programme and official portrait",
  ),
  davidLindellCv: source(
    "David B. Lindell · CV",
    "https://davidlindell.com/assets/pdf/cv.pdf",
    "cv",
    "David Lindell's 2021–2022 Stanford postdoctoral appointment and Gordon Wetzstein explicitly named as adviser",
  ),
  simonUdem: source(
    "Université de Montréal DIRO · Simon Lacoste-Julien",
    "https://diro.umontreal.ca/repertoire-departement/professeurs/professeur/in/in28264/sg/Simon%20Lacoste-Julien/",
    "official",
    "Université de Montréal faculty appointment and departmental affiliation",
  ),
  simonMila: source(
    "Mila · Simon Lacoste-Julien",
    "https://mila.quebec/en/directory/simon-lacoste-julien",
    "official",
    "Full professorship, Mila leadership, Canada CIFAR AI Chair, SAIT AI Lab leadership, research areas, current doctoral roster and official portrait",
  ),
  gauthierHome: source(
    "Gauthier Gidel · homepage",
    "https://gauthiergidel.github.io/",
    "profile",
    "Gauthier Gidel explicitly states that Simon Lacoste-Julien supervised his Université de Montréal PhD",
  ),
  sanjaStudents: source(
    "Sanja Fidler · students",
    "https://www.cs.toronto.edu/~fidler/students.html",
    "profile",
    "Named PhD and MSc students, co-supervisors, former trainees and destinations on the adviser-maintained roster",
  ),
  boHassaan: source(
    "Temerty Medicine · COVID-19 platform",
    "https://temertymedicine.utoronto.ca/news/canadian-scientists-develop-platform-track-changes-genetic-structure-covid-19-virus",
    "official",
    "University of Toronto identifies Hassaan Maan as Bo Wang's doctoral student",
  ),
  boMica: source(
    "University of Toronto Moses Lab · people",
    "https://moses.csb.utoronto.ca/people/",
    "official",
    "Mica Consens is listed as a PhD student co-supervised with Bo Wang",
  ),
  boZeinab: source(
    "Zeinab Navidi · University of Toronto homepage",
    "https://www.cs.utoronto.ca/~zeinabnvd/",
    "profile",
    "Zeinab Navidi identifies Bo Wang and Benjamin Haibe-Kains as her PhD co-supervisors",
  ),
  danielStudents: source(
    "University of Toronto Statistical Sciences · student publication highlights",
    "https://www.statistics.utoronto.ca/research/student-publication-highlights",
    "official",
    "Blair Bilodeau is identified as supervised by Daniel Roy; Yanbo Tang and Mufan Li are identified as jointly supervised by Daniel Roy",
  ),
  danielAwards: source(
    "University of Toronto Statistical Sciences · graduate research award winners",
    "https://www.statistics.utoronto.ca/news/celebrating-graduate-student-excellence-meet-our-recent-research-award-winners",
    "official",
    "Yanbo Tang and Mufan Li are explicitly identified as Daniel Roy's jointly supervised PhD students",
  ),
  geraldStudents: source(
    "Gerald Penn · students",
    "https://www.cs.toronto.edu/~gpenn/students.html",
    "profile",
    "Adviser-maintained roster of current postdoctoral, PhD and MSc students and former students with destinations",
  ),
  kyrosHome: source(
    "Kyros Kutulakos · University of Toronto homepage",
    "https://www.cs.toronto.edu/~kyros/",
    "profile",
    "University of Toronto appointment and named PhD, MSc, postdoctoral and undergraduate group members",
  ),
  rogerGroup: source(
    "Roger Grosse · group",
    "https://www.cs.toronto.edu/~rgrosse/group/",
    "profile",
    "Adviser-maintained graduate-student, postdoctoral and alumni roster with co-advisers and destinations",
  ),
  hugoMila: source(
    "Mila · Hugo Larochelle",
    "https://mila.quebec/en/directory/hugo-larochelle",
    "official",
    "Mila leadership profile and current-student listing with programme and principal-supervisor annotations",
  ),
  duvenaudGroup: source(
    "David Duvenaud · joining the group",
    "https://www.cs.toronto.edu/~duvenaud/joining.html",
    "profile",
    "Adviser-maintained former-student and postdoctoral roster with degree, co-supervisor and current destination",
  ),
};

const gordonPortrait: NonNullable<Person["portrait"]> = {
  src: "portraits/influence-queue-canada-final/gordon-wetzstein-stanford.jpg",
  alt: "Gordon Wetzstein official Stanford portrait",
  source: sources.gordonHome,
};

const simonPortrait: NonNullable<Person["portrait"]> = {
  src: "portraits/influence-queue-canada-final/simon-lacoste-julien-ca.jpg",
  alt: "Simon Lacoste-Julien official Mila portrait",
  source: sources.simonMila,
};

export const influenceQueueCanadaFinalPeople: Person[] = [
  {
    id: "gordon-wetzstein-stanford",
    name: "Gordon Wetzstein",
    role: "Associate Professor of Electrical Engineering · Computer Science (by courtesy)",
    institution: "Stanford",
    region: "United States",
    area: "Computer Vision · Computational Imaging · Neural Rendering",
    tags: ["计算机视觉", "计算成像", "神经渲染", "创意 AI", "Stanford"],
    summary: "Stanford 计算成像与空间智能 PI，研究跨越视觉、图形学、AI 与计算光学；David B. Lindell 的本人 CV 明确记录其 Stanford 博士后由 Wetzstein 指导。",
    facts: [
      {
        label: "当前任职",
        value: "Stanford Electrical Engineering Associate Professor，并在 Computer Science 兼任 Associate Professor (by courtesy)。",
        source: sources.gordonStanford,
      },
      {
        label: "研究组织",
        value: "领导 Stanford Physical and Spatial Intelligence Lab，并任 Stanford Center for Image Systems Engineering Faculty Director。",
        source: sources.gordonHome,
      },
      {
        label: "研究主线",
        value: "连接计算机图形学、计算机视觉、人工智能、计算光学与神经渲染，面向下一代成像、机器人和可穿戴计算。",
        source: sources.gordonHome,
      },
      {
        label: "学术荣誉",
        value: "Stanford 官方履历列出 Optica Fellow、NSF CAREER、Sloan Fellowship、SIGGRAPH Significant New Researcher Award 与 PECASE 等荣誉。",
        source: sources.gordonStanford,
      },
      {
        label: "教育与学术训练",
        value: "Stanford Profiles 的 Doctoral Dissertation Advisor 名录公开列出多位博士指导对象；David Lindell 的 CV 另核验了博士后指导关系。",
        source: sources.gordonStanford,
      },
    ],
    stage: "senior",
    category: "core",
    status: "current PI · verified postdoctoral lineage",
    sources: [sources.gordonStanford, sources.gordonHome, sources.davidLindellCv],
    x: 2140,
    y: 940,
    primary: true,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait: gordonPortrait,
  },
  {
    id: "simon-lacoste-julien-ca",
    name: "Simon Lacoste-Julien",
    role: "Full Professor · Associate Scientific Director, Mila · SAIT AI Lab Director",
    institution: "Université de Montréal",
    region: "Canada",
    area: "Machine Learning Theory · Optimization · Generative Models",
    tags: ["机器学习理论", "优化", "生成模型", "因果推断", "NLP", "计算机视觉"],
    summary: "Université de Montréal / Mila 机器学习 PI，连接优化理论、生成模型、计算机视觉与 NLP，并领导 SAIT AI Lab Montréal；Gauthier Gidel 本人主页明确其博士由 Lacoste-Julien 指导。",
    facts: [
      {
        label: "当前任职",
        value: "Université de Montréal DIRO Full Professor，并任 Mila Associate Scientific Director。",
        source: sources.simonMila,
      },
      {
        label: "研究组织",
        value: "Mila 共同创始成员、Canada CIFAR AI Chair，同时担任 Samsung Advanced Institute of Technology AI Lab Montréal 的 Vice President and Lab Director。",
        source: sources.simonMila,
      },
      {
        label: "研究主线",
        value: "研究机器学习与应用数学，覆盖优化、因果推断、生成模型，以及计算机视觉和自然语言处理应用。",
        source: sources.simonMila,
      },
      {
        label: "教育与学术训练",
        value: "Mila 官方简介记录其 UC Berkeley 计算机科学博士、Cambridge 博士后，以及 INRIA / ENS Paris 研究经历。",
        source: sources.simonMila,
      },
      {
        label: "人才培养",
        value: "Mila 官方目录公开维护其当前博士生与共同指导信息；Gauthier Gidel 本人履历明确记录其博士指导关系。",
        source: sources.gauthierHome,
      },
    ],
    stage: "senior",
    category: "core",
    status: "current PI · verified doctoral lineage",
    sources: [sources.simonUdem, sources.simonMila, sources.gauthierHome],
    x: 1280,
    y: 980,
    primary: true,
    lastVerifiedAt: checkedAt,
    introducedAt: checkedAt,
    portrait: simonPortrait,
  },
];

const rosterEnhancement = (rosterSources: Source[], detail: string): Partial<Person> => ({
  sources: rosterSources,
  facts: [{ label: "团队与培养体系", value: detail, source: rosterSources[0] }],
  lastVerifiedAt: checkedAt,
});

export const influenceQueueCanadaFinalPersonEnhancements: Record<string, Partial<Person>> = {
  "david-lindell-ca-award": rosterEnhancement(
    [sources.davidLindellCv],
    "本人 CV 明确记录 2021–2022 年 Stanford 博士后阶段的 adviser 为 Gordon Wetzstein。",
  ),
  "gauthier-gidel-ca": rosterEnhancement(
    [sources.gauthierHome],
    "本人主页明确记录 Université de Montréal 博士阶段由 Simon Lacoste-Julien 指导。",
  ),
  "sanja-fidler-ca": rosterEnhancement(
    [sources.sanjaStudents],
    "本人学生页按博士、硕士、本科、访问学生与历届成员维护具名名录，并标注共同指导和部分毕业去向。",
  ),
  "bo-wang-toronto-ca": rosterEnhancement(
    [sources.boHassaan, sources.boMica, sources.boZeinab],
    "University of Toronto / Vector 体系的一手页面与学生本人主页交叉核验三名博士生及共同指导关系。",
  ),
  "daniel-roy-award": rosterEnhancement(
    [sources.danielStudents, sources.danielAwards],
    "University of Toronto Statistical Sciences 官方页面明确列出 Blair Bilodeau、Yanbo Tang 与 Mufan Li 的博士指导关系。",
  ),
  "gerald-penn-lineage": rosterEnhancement(
    [sources.geraldStudents],
    "本人维护的学生页分列当前博士后、博士、硕士与历届学生，并记录论文题目和部分去向。",
  ),
  "kyros-kutulakos-lineage": rosterEnhancement(
    [sources.kyrosHome],
    "University of Toronto 本人主页公开列出当前博士、硕士、博士后和本科团队成员。",
  ),
  "roger-grosse-ca": rosterEnhancement(
    [sources.rogerGroup],
    "本人团队页维护当前研究生、博士后与校友名录，并明确共同指导关系和部分校友去向。",
  ),
  "hugo-larochelle-ca": rosterEnhancement(
    [sources.hugoMila],
    "Mila 官方目录的 Current Students 区域逐项列出项目类型，并在适用处标注 principal supervisor。",
  ),
  "david-duvenaud-ca": rosterEnhancement(
    [sources.duvenaudGroup],
    "本人团队页列出历届博士、硕士、博士后与访问研究者，并公开毕业年份、共同导师和当前去向。",
  ),
};

const member = (
  teacherId: string,
  slug: string,
  name: string,
  role: string,
  memberSource: Source,
  focus?: string,
): GroupMember => ({
  id: `influence-canada-final-${teacherId}-${slug}`,
  teacherId,
  name,
  role,
  focus,
  source: memberSource,
});

export const influenceQueueCanadaFinalGroupMembers: GroupMember[] = [
  member("gordon-wetzstein-stanford", "brian-chao", "Brian Chao", "Doctoral dissertation advisee", sources.gordonStanford),
  member("gordon-wetzstein-stanford", "ryan-po", "Ryan Po", "Doctoral dissertation advisee", sources.gordonStanford),
  member("gordon-wetzstein-stanford", "jackie-yang", "Jackie Yang", "Doctoral dissertation advisee", sources.gordonStanford),

  member("simon-lacoste-julien-ca", "vitoria-barin-pacela", "Vitoria Barin Pacela", "PhD student · Université de Montréal", sources.simonMila),
  member("simon-lacoste-julien-ca", "simon-dufort-labbe", "Simon Dufort-Labbé", "PhD student · Université de Montréal", sources.simonMila),
  member("simon-lacoste-julien-ca", "antonio-gois", "Antonio Gois", "PhD student · Université de Montréal", sources.simonMila),

  member("sanja-fidler-ca", "david-acuna", "David Acuna", "PhD student", sources.sanjaStudents),
  member("sanja-fidler-ca", "harris-chan", "Harris Chan", "PhD student · co-supervised with Jimmy Ba", sources.sanjaStudents),
  member("sanja-fidler-ca", "wenzheng-chen", "Wenzheng Chen", "PhD student · co-supervised with Kyros Kutulakos", sources.sanjaStudents),

  member("bo-wang-toronto-ca", "hassaan-maan", "Hassaan Maan", "Doctoral student", sources.boHassaan),
  member("bo-wang-toronto-ca", "mica-consens", "Mica Consens", "PhD student · co-supervised with Alan Moses", sources.boMica),
  member("bo-wang-toronto-ca", "zeinab-navidi", "Zeinab Navidi", "PhD candidate · co-supervised with Benjamin Haibe-Kains", sources.boZeinab),

  member("daniel-roy-award", "blair-bilodeau", "Blair Bilodeau", "PhD student · supervised by Daniel Roy", sources.danielStudents),
  member("daniel-roy-award", "yanbo-tang", "Yanbo Tang", "PhD student · jointly supervised with Nancy Reid", sources.danielAwards),
  member("daniel-roy-award", "mufan-li", "Mufan Li", "PhD candidate · co-supervised with Murat Erdogdu", sources.danielAwards),

  member("gerald-penn-lineage", "samarendra-dash", "Samarendra Dash", "Current PhD student", sources.geraldStudents, "Social reading technology"),
  member("gerald-penn-lineage", "ken-shi", "Ken Shi", "Current PhD student", sources.geraldStudents, "Social reading technology"),
  member("gerald-penn-lineage", "tian-yu", "Tian Yu", "Current PhD student", sources.geraldStudents, "Social reading technology"),

  member("kyros-kutulakos-lineage", "mian-wei", "Mian Wei", "PhD student", sources.kyrosHome),
  member("kyros-kutulakos-lineage", "parsa-mirdehghan", "Parsa Mirdehghan", "PhD student", sources.kyrosHome),
  member("kyros-kutulakos-lineage", "robin-swanson", "Robin Swanson", "PhD student", sources.kyrosHome),

  member("roger-grosse-ca", "xuchan-bao", "Xuchan (Jenny) Bao", "Graduate student", sources.rogerGroup),
  member("roger-grosse-ca", "nikita-dhawan", "Nikita Dhawan", "Graduate student · co-advised with Chris Maddison", sources.rogerGroup),
  member("roger-grosse-ca", "max-kaufmann", "Max Kaufmann", "Graduate student", sources.rogerGroup),

  member("hugo-larochelle-ca", "jiang-evan", "Jiang Evan (Duoduo)", "Current-student listing · Professional Master's · McGill", sources.hugoMila),
  member("hugo-larochelle-ca", "denis-therien", "Denis Therien", "Current-student listing · independent visiting researcher · McGill", sources.hugoMila),
  member("hugo-larochelle-ca", "martin-weiss", "Martin Weiss", "Current-student listing · postdoctorate · principal supervisor Chris Pal", sources.hugoMila),

  member("david-duvenaud-ca", "james-requeima", "James Requeima", "Former postdoc · Research Scientist at Google DeepMind", sources.duvenaudGroup),
  member("david-duvenaud-ca", "dami-choi", "Dami Choi", "Former CS PhD · co-supervised with Chris Maddison · Transluce", sources.duvenaudGroup),
  member("david-duvenaud-ca", "daniel-johnson", "Daniel D. Johnson", "Former CS PhD · co-supervised with Chris Maddison · Transluce", sources.duvenaudGroup),
];

export const influenceQueueCanadaFinalRelationships: Relationship[] = [
  {
    id: "influence-canada-final-wetzstein-lindell-postdoc",
    from: "gordon-wetzstein-stanford",
    to: "david-lindell-ca-award",
    type: "talent",
    subtype: "postdoc_mentor",
    label: "博士后指导",
    evidence: "David B. Lindell 本人 CV 明确记录其 2021–2022 年 Stanford Postdoctoral Scholar 阶段的 Advisor 为 Gordon Wetzstein。",
    evidenceObject: "David B. Lindell curriculum vitae · Previous Professional Experience",
    source: sources.davidLindellCv,
    verified: true,
    startYear: 2021,
    endYear: 2022,
  },
  {
    id: "influence-canada-final-lacoste-julien-gidel",
    from: "simon-lacoste-julien-ca",
    to: "gauthier-gidel-ca",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "Gauthier Gidel 本人主页明确写明其在 Université de Montréal 完成博士学位，并由 Simon Lacoste-Julien 指导。",
    evidenceObject: "Gauthier Gidel first-person biography",
    source: sources.gauthierHome,
    verified: true,
  },
];

export const influenceQueueCanadaFinalPlacements: StudentPlacement[] = [];

export const influenceQueueCanadaFinalPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "gordon-wetzstein-stanford": gordonPortrait,
  "simon-lacoste-julien-ca": simonPortrait,
};

export const influenceQueueCanadaFinalDeferred = [] as const;

export const influenceQueueCanadaFinalAudit = {
  targetedIds: [
    "david-lindell-ca-award",
    "gauthier-gidel-ca",
    "sanja-fidler-ca",
    "bo-wang-toronto-ca",
    "daniel-roy-award",
    "gerald-penn-lineage",
    "kyros-kutulakos-lineage",
    "roger-grosse-ca",
    "hugo-larochelle-ca",
    "david-duvenaud-ca",
  ],
  passed: 10,
  deferred: 0,
  addedPeople: influenceQueueCanadaFinalPeople.length,
  addedRelationships: influenceQueueCanadaFinalRelationships.length,
  addedGroupMembers: influenceQueueCanadaFinalGroupMembers.length,
} as const;

export const enhancements = influenceQueueCanadaFinalPersonEnhancements;
export const people = influenceQueueCanadaFinalPeople;
export const relationships = influenceQueueCanadaFinalRelationships;
export const groupMembers = influenceQueueCanadaFinalGroupMembers;
export const placements = influenceQueueCanadaFinalPlacements;
export const portraitMap = influenceQueueCanadaFinalPortraits;
