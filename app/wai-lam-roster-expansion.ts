import type { GroupMember, Person, Relationship, Source, StudentPlacement } from "./data";

const checkedAt = "2026-09-01";

const waiLamRosterSource: Source = {
  label: "CUHK Text Mining Group · Students & Alumni",
  url: "https://www1.se.cuhk.edu.hk/~textmine/",
  kind: "profile",
  checkedAt,
  supports: "Wai Lam biography, eight current PhD students, 34 alumni and the destinations explicitly shown beside 23 alumni",
};

const dengCaiHomepage: Source = {
  label: "Deng Cai personal homepage",
  url: "https://jcyk.github.io/",
  kind: "profile",
  checkedAt,
  supports: "current and incoming roles, education timeline, research agenda and portrait",
};

const dengCaiZjuSource: Source = {
  label: "Zhejiang University · Deng Cai",
  url: "https://person.zju.edu.cn/en/dengcai",
  kind: "official",
  checkedAt,
  supports: "identity disambiguation for the older Zhejiang University professor with the same romanized and Chinese name",
};

export const waiLamRosterPeople: Person[] = [
  {
    id: "deng-cai-sjtu",
    name: "Deng Cai",
    chinese: "蔡登",
    role: "Incoming Associate Professor · ByteDance Seed Research Scientist",
    institution: "SJTU",
    region: "Mainland China",
    area: "Continual Learning · Long-context Models · Agentic Memory",
    tags: ["持续学习", "长上下文", "智能体记忆", "ByteDance Seed", "Tencent AI Lab", "林伟学生"],
    stage: "emerging",
    category: "core",
    status: "个人主页标注即将加入上海交通大学，并公开招募博士生、研究助理与博士后",
    summary: "林伟在 CUHK 指导的博士生；此后任 Tencent AI Lab Senior Researcher、ByteDance Seed Research Scientist，个人主页标注即将加入上海交通大学并建立 ContinuousAI Lab。",
    facts: [
      {
        label: "教育与学术训练",
        value: "厦门大学计算机本科、上海交通大学计算机硕士；2018–2022 年在 CUHK SEEM 攻读博士，导师为 Wai Lam（林伟）。",
        source: dengCaiHomepage,
      },
      {
        label: "教育经历",
        value: "厦门大学计算机本科（2011–2015）、上海交通大学计算机硕士（2015–2018）、CUHK SEEM 博士（2018–2022）。",
        source: dengCaiHomepage,
      },
      {
        label: "当前任职",
        value: "现任 ByteDance Seed Research Scientist；个人主页标注即将加入上海交通大学任 Associate Professor，并公开招募博士生、研究助理与博士后。此前任 Tencent AI Lab Senior Researcher。",
        source: dengCaiHomepage,
      },
      {
        label: "研究主线",
        value: "研究自演化方法、长上下文模型、智能体记忆与 AI for AI / Science / Personal AI；主页标注即将加入上海交通大学并建立 ContinuousAI Lab。",
        source: dengCaiHomepage,
      },
      {
        label: "同名消歧",
        value: "本节点不是浙江大学计算机学院教授蔡登；两人同名，教育与任职时间线不同。",
        source: dengCaiZjuSource,
      },
    ],
    sources: [waiLamRosterSource, dengCaiHomepage, dengCaiZjuSource],
    portrait: {
      src: "portraits/wai-lam-roster/deng-cai-sjtu.jpg",
      alt: "Deng Cai · 蔡登",
      source: dengCaiHomepage,
    },
    x: 980,
    y: 610,
    primary: true,
    introducedAt: checkedAt,
    lastVerifiedAt: checkedAt,
  },
];

export const waiLamRosterPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "deng-cai-sjtu": waiLamRosterPeople[0].portrait!,
};

export const waiLamRosterPersonEnhancements: Record<string, Partial<Person>> = {
  "wai-lam": {
    knownAlumniCount: 34,
    tags: ["公开导师名录", "8 名在读博士生", "34 名公开校友"],
    facts: [
      {
        label: "公开培养名录",
        value: "Text Mining Group 主页在核验日列出 8 名在读博士生与 34 名校友；其中 23 名校友附有公开去向。",
        source: waiLamRosterSource,
      },
      {
        label: "学术界流向",
        value: "公开名录包含 SMU、SUTD、University of Copenhagen、University of Cambridge、University of Kent、HKUST、Guizhou University 等学术去向。",
        source: waiLamRosterSource,
      },
      {
        label: "工业界流向",
        value: "公开名录包含 Alibaba Qwen / DAMO、Huawei、Tencent AI Lab / Cloud、ByteDance、JD.com、HP Labs China 等产业去向。",
        source: waiLamRosterSource,
      },
    ],
    sources: [waiLamRosterSource],
    lastVerifiedAt: checkedAt,
  },
};

export const waiLamRosterRelationships: Relationship[] = [
  {
    id: "wai-lam-deng-cai-sjtu-phd",
    from: "wai-lam",
    to: "deng-cai-sjtu",
    type: "lineage",
    subtype: "phd_adviser",
    label: "博士导师",
    evidence: "林伟组主页将 Deng Cai 列为 PhD alumnus；蔡登个人主页将 CUHK 博士阶段列为 2018–2022，两条一手来源共同确认该培养关系。",
    evidenceObject: "CUHK SEEM PhD supervision (2018–2022)",
    source: waiLamRosterSource,
    verified: true,
    startYear: 2018,
    endYear: 2022,
  },
];

const currentStudents = [
  ["chaojun-wang", "Chaojun Wang", "2021"],
  ["shuaiyi-li", "Shuaiyi Li", "2022"],
  ["sen-yang", "Sen Yang", "2022"],
  ["junpeng-liu", "Junpeng Liu", "2023"],
  ["chulun-zhou", "Chulun Zhou", "2023"],
  ["bowen-cao", "Bowen Cao", "2024"],
  ["siheng-li", "Siheng Li", "2024"],
  ["ting-xu", "Ting Xu", "2024"],
] as const;

export const waiLamRosterGroupMembers: GroupMember[] = currentStudents.map(([id, name, year]) => ({
  id: `wai-lam-current-${id}`,
  teacherId: "wai-lam",
  name,
  role: `PhD Student · ${year}–`,
  focus: "CUHK Text Mining Group",
  source: waiLamRosterSource,
}));

type PlacementSeed = {
  id: string;
  student: string;
  company: string;
  role: string;
  degree?: StudentPlacement["degree"];
  sector: NonNullable<StudentPlacement["sector"]>;
  highLevel?: boolean;
};

const placementSeeds: PlacementSeed[] = [
  { id: "hongyuan-lu-facemind", student: "Hongyuan Lu", company: "FaceMind", role: "公开名录去向", degree: "PhD", sector: "startup" },
  { id: "chang-gao-qwen", student: "Chang Gao", company: "Alibaba", role: "Researcher", degree: "PhD", sector: "industry", highLevel: true },
  { id: "weiwen-xu-damo", student: "Weiwen Xu", company: "Alibaba", role: "Researcher", degree: "PhD", sector: "industry" },
  { id: "haoran-yang-huawei", student: "Haoran Yang", company: "Huawei", role: "Researcher", degree: "PhD", sector: "industry" },
  { id: "yang-deng-smu", student: "Yang Deng", company: "Singapore Management University", role: "Assistant Professor", degree: "PhD", sector: "academia", highLevel: true },
  { id: "yifei-yuan-copenhagen", student: "Yifei Yuan", company: "University of Copenhagen", role: "Academic destination", degree: "PhD", sector: "academia" },
  { id: "deng-cai-tencent", student: "Deng Cai", company: "Tencent", role: "Senior Researcher", degree: "PhD", sector: "industry", highLevel: true },
  { id: "wenxuan-zhang-sutd", student: "Wenxuan Zhang", company: "Singapore University of Technology and Design", role: "Assistant Professor", degree: "PhD", sector: "academia", highLevel: true },
  { id: "zihao-fu-cambridge", student: "Zihao Fu", company: "University of Cambridge", role: "Academic destination", degree: "PhD", sector: "academia" },
  { id: "xin-li-damo", student: "Xin Li", company: "Alibaba", role: "Researcher", degree: "PhD", sector: "industry" },
  { id: "qian-yu-jd", student: "Qian Yu", company: "JD.com", role: "Researcher", degree: "PhD", sector: "industry" },
  { id: "bei-shi-bytedance", student: "Bei Shi", company: "ByteDance", role: "Researcher", degree: "PhD", sector: "industry" },
  { id: "piji-li-nuaa", student: "Piji Li", company: "Nanjing University of Aeronautics and Astronautics", role: "Faculty", degree: "PhD", sector: "academia" },
  { id: "yi-liao-tencent", student: "Yi Liao", company: "Tencent", role: "Researcher", degree: "PhD", sector: "industry" },
  { id: "yinqing-xu-qube", student: "Yinqing Xu", company: "Qube Research & Technologies", role: "Researcher", sector: "industry" },
  { id: "mohammad-jameel-kent", student: "Mohammad Shoaib Jameel", company: "University of Kent", role: "Faculty", sector: "academia" },
  { id: "lidong-bing-damo", student: "Lidong Bing", company: "Alibaba", role: "Researcher", sector: "industry", highLevel: true },
  { id: "tak-lam-wong-hkied", student: "Tak Lam Wong", company: "The Hong Kong Institute of Education", role: "Academic destination", sector: "academia" },
  { id: "ki-cecia-chan-hkust", student: "Ki Cecia Chan", company: "HKUST", role: "Academic destination", sector: "academia" },
  { id: "bo-chen-tencent-cloud", student: "Bo Chen", company: "Tencent", role: "Tencent Cloud", sector: "industry" },
  { id: "xiaofeng-yu-hp-labs", student: "Xiaofeng Yu", company: "HP Labs China", role: "Researcher", sector: "industry" },
  { id: "ruizhang-huang-guizhou", student: "Ruizhang Huang", company: "Guizhou University", role: "Academic destination", sector: "academia" },
  { id: "andy-chung-azeus", student: "On Yip Andy Chung", company: "Azeus Systems Limited", role: "Industry destination", sector: "industry" },
];

const rosterNote = "导师主页公开列出的去向；未单独核验为当前任职，人物后续可能发生流动。主页中的 PhD 年份按入学/名录年份理解，不作为毕业年份写入。";

export const waiLamRosterPlacements: StudentPlacement[] = placementSeeds.map((placement) => ({
  id: `wai-lam-${placement.id}`,
  student: placement.student,
  teacherId: "wai-lam",
  company: placement.company,
  department: placement.id.includes("qwen") ? "Qwen" : placement.id.includes("damo") ? "DAMO Academy" : undefined,
  role: placement.role,
  kind: "reported",
  highLevel: placement.highLevel,
  degree: placement.degree,
  sector: placement.sector,
  note: placement.student === "Deng Cai"
    ? `${rosterNote} 蔡登个人主页进一步记录其后续转至 ByteDance Seed，并标注即将加入上海交通大学。`
    : rosterNote,
  source: waiLamRosterSource,
  verifiedAt: checkedAt,
}));

export const waiLamAdviserRosterAudit = {
  id: "wai-lam-textmine-roster",
  teacherId: "wai-lam",
  source: waiLamRosterSource,
  currentStudentNames: currentStudents.map(([, name]) => name),
  alumniCount: 34,
  alumniWithPublishedDestination: placementSeeds.map((placement) => placement.student),
  alumniRepresentedAsPeople: [
    { name: "Yang Deng", personId: "yang-deng" },
    { name: "Deng Cai", personId: "deng-cai-sjtu" },
    { name: "Wenxuan Zhang", personId: "wenxuan-zhang" },
  ],
  interpretation: "The year printed beside PhD alumni is treated as the roster/start year unless a separate first-party CV or thesis confirms graduation.",
} as const;
