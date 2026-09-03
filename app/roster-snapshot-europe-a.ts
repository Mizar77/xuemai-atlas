/**
 * Frozen first-party roster snapshots for the Europe A audit batch.
 *
 * These records are kept separate from top-school-roster-ledger.ts so that
 * the main audit can merge them deliberately.  `unitUrl` is the URL currently
 * present in the 124-unit scope; `sourceDataUrl` records the current official
 * directory used when a legacy scope URL has moved or returns 404.
 */
export type EuropeARosterSnapshotProposal = {
  unitUrl: string;
  officialRosterCount: number | null;
  snapshotAt: "2026-09-02";
  fetchStatus: "complete" | "partial";
  sourceDataUrl: string;
  artifactPath?: string;
  note: string;
};

export const europeARosterSnapshotProposals: EuropeARosterSnapshotProposal[] = [
  {
    unitUrl: "https://uni-tuebingen.de/en/157455",
    officialRosterCount: 58,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://uni-tuebingen.de/en/faculties/faculty-of-science/departments/computer-science/research-groups/",
    artifactPath: "data/official-rosters/tuebingen-cs-research-groups-2026-09-02.json",
    note: "旧 scope URL 已指向无关页面；改用当前官方 All research groups 页，冻结 Former professors, retired professors 独立栏目之前的全部 58 位具名研究组负责人。教授、coopted、honorary 与 4 位非教授组长均原样保留，留待逐人分类。",
  },
  {
    unitUrl: "https://www.informatik.tu-darmstadt.de/fachbereich/organisation/index.en.jsp",
    officialRosterCount: 79,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.informatik.tu-darmstadt.de/fb20/professuren_und_gruppenleitungen/",
    artifactPath: "data/official-rosters/tu-darmstadt-cs-professors-group-leaders-2026-09-02.json",
    note: "旧 scope URL 返回 TU Darmstadt 官方 404；改用当前 Professuren und Gruppenleitungen 目录，冻结全部 79 人。官网的正教授、助理/访问教授、第二成员、荣誉教授、独立青年组长、Athene Young Investigator、Privatdozent 与 emeriti 分类均保留。",
  },
  {
    unitUrl: "https://www.surrey.ac.uk/school-computer-science-electronic-engineering/people",
    officialRosterCount: 95,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.surrey.ac.uk/school-computer-science-electronic-engineering/people/academic-staff",
    artifactPath: "data/official-rosters/surrey-csee-academic-staff-2026-09-02.json",
    note: "旧 scope URL 返回 Surrey 官方 404；从 Faculty of Engineering and Physical Sciences 当前 People 页进入新的 Academic staff 目录，冻结 Head of School 1、Computer science 36、Electronic engineering 58，共 95 人。",
  },
  {
    unitUrl: "https://www.surrey.ac.uk/centre-vision-speech-signal-processing/people",
    officialRosterCount: 28,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.surrey.ac.uk/centre-vision-speech-signal-processing/people/academic-staff",
    artifactPath: "data/official-rosters/surrey-cvssp-academic-emeritus-2026-09-02.json",
    note: "CVSSP People 页将角色拆为独立子目录；联合冻结 Academic staff 26 与 Emeritus staff 2，共 28 人。研究人员、博士生、访客和行政人员不属于本次 faculty 快照。",
  },
  {
    unitUrl: "https://www.surrey.ac.uk/artificial-intelligence/people",
    officialRosterCount: 110,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://www.surrey.ac.uk/artificial-intelligence/people",
    artifactPath: "data/official-rosters/surrey-people-centred-ai-2026-09-02.json",
    note: "冻结 PAI 官方 People 页 Leadership、Professional Services、Academic staff、Surrey Future Fellows、pan-University Fellows and Associates 全部 112 个展示项；按官方 profile ID 合并 2 个跨栏目重复人物后为 110 个唯一人物。",
  },
  {
    unitUrl: "https://di.ku.dk/english/staff/?pure=en/persons",
    officialRosterCount: 367,
    snapshotAt: "2026-09-02",
    fetchStatus: "complete",
    sourceDataUrl: "https://di.ku.dk/english/staff/vip/",
    artifactPath: "data/official-rosters/copenhagen-diku-research-staff-2026-09-02.json",
    note: "从 scope 的 Staff 页进入完整 Research staff 表格，读取 371 行；4 个 Pure person ID 因多重职务重复，合并并保留全部 titles 后为 367 个唯一人物。教授、博士后、博士生、访客、教学和 emeritus 等角色留待逐人分类。",
  },
  {
    unitUrl: "https://ivi.uva.nl/people/academic-staff/academic-staff.html",
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://ivi.uva.nl/research/research-groups-landing.html",
    artifactPath: "data/official-rosters/uva-informatics-partial-evidence-2026-09-02.json",
    note: "旧 academic-staff scope URL 已失效。当前官方研究组页明确 15 个研究组并列出 16 位组长；Faculty of Science 教授目录只给出 Informatics Institute 的 15 位 full professors 过滤计数。两处均不是全体 academic/research staff 名录，故不猜测总数、不冻结 officialRosterCount。",
  },
  {
    unitUrl: "https://www.ucl.ac.uk/computer-science/people/academic-and-research-staff",
    officialRosterCount: null,
    snapshotAt: "2026-09-02",
    fetchStatus: "partial",
    sourceDataUrl: "https://profiles.ucl.ac.uk/search?by=text&d=Dept+of+Computer+Science&type=user&v=",
    artifactPath: "data/official-rosters/ucl-computer-science-partial-evidence-2026-09-02.json",
    note: "当前 UCL Engineering Academic staff 页将 All staff (A-Z) 跳转到 UCL Profiles。官方搜索显示 554 条、23 页，但混合教授、研究员、honorary、PGTA、行政等职务，且 SPA 分页本次未暴露稳定导出/页码 URL。保留第一页 25 条逐人证据，但不把 554 当作完整 academic/research roster 冻结。",
  },
];

export const europeAScopeUrlChanges = [
  {
    from: "https://uni-tuebingen.de/en/157455",
    to: "https://uni-tuebingen.de/en/faculties/faculty-of-science/departments/computer-science/research-groups/",
  },
  {
    from: "https://www.informatik.tu-darmstadt.de/fachbereich/organisation/index.en.jsp",
    to: "https://www.informatik.tu-darmstadt.de/fb20/professuren_und_gruppenleitungen/",
  },
  {
    from: "https://www.surrey.ac.uk/school-computer-science-electronic-engineering/people",
    to: "https://www.surrey.ac.uk/school-computer-science-electronic-engineering/people/academic-staff",
  },
  {
    from: "https://ivi.uva.nl/people/academic-staff/academic-staff.html",
    to: "https://ivi.uva.nl/research/research-groups-landing.html",
  },
  {
    from: "https://www.ucl.ac.uk/computer-science/people/academic-and-research-staff",
    to: "https://www.ucl.ac.uk/engineering/computer-science/people/academic-staff-ucl-profiles",
  },
] as const;
