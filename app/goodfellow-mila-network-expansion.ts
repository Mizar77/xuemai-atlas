import type { Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-01";

const source = (
  label: string,
  url: string,
  kind: Source["kind"],
  supports: string,
): Source => ({ label, url, kind, checkedAt, supports });

const sources = {
  bengioCv: source(
    "Yoshua Bengio academic CV",
    "https://yoshuabengio.org/wp-content/uploads/2020/01/Yoshua_Bengio_CV_1Aug2019.pdf",
    "cv",
    "Graduate and postdoctoral supervision in the Montreal deep-learning group",
  ),
  goodfellowBio: source(
    "Ian Goodfellow biography",
    "https://www.iangoodfellow.com/bio",
    "profile",
    "Stanford study with Andrew Ng and UdeM study with Yoshua Bengio and Aaron Courville",
  ),
  ngCv: source(
    "Andrew Ng academic CV",
    "https://ai.stanford.edu/~ang//curriculum-vitae.pdf",
    "cv",
    "Ian Goodfellow in Andrew Ng's former MSc-student roster",
  ),
  ngGroup: source(
    "Andrew Ng Stanford research-group roster",
    "https://ai.stanford.edu/~ang/group.html",
    "official",
    "Ian Goodfellow in the Stanford group's MSc-student roster",
  ),
  dauphinGoogle: source(
    "Google Research — Yann N. Dauphin",
    "https://research.google/people/106804/",
    "company",
    "Google DeepMind role, research contributions and PhD supervision by Yoshua Bengio",
  ),
  dauphinMila: source(
    "Mila directory — Yann Dauphin",
    "https://mila.quebec/en/directory/yann-dauphin",
    "official",
    "Mila alumni record and research publications",
  ),
  leRouxMila: source(
    "Mila directory — Nicolas Le Roux",
    "https://mila.quebec/en/directory/nicolas-le-roux?page=0%2C0",
    "official",
    "Microsoft Research role, McGill/UdeM adjunct appointments and research topics",
  ),
  leRouxMicrosoft: source(
    "Microsoft Research publication — Nicolas Le Roux and Yoshua Bengio",
    "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/representational_power.pdf",
    "publication",
    "UdeM research affiliation and documented work in Bengio's group",
  ),
  bahdanauMila: source(
    "Mila directory — Dzmitry Bahdanau",
    "https://mila.quebec/en/directory/dzmitry-bahdanau",
    "official",
    "Periodic role, McGill adjunct appointment, topics and UdeM PhD work with Yoshua Bengio",
  ),
  bahdanauServiceNow: source(
    "ServiceNow Research — Dzmitry Bahdanau",
    "https://www.servicenow.com/workflow/author/dzmitry-bahdanau.html",
    "company",
    "Former research-lead role, Mila/McGill affiliations and language-research programme",
  ),
  agarwalMila: source(
    "Mila directory — Rishabh Agarwal",
    "https://mila.quebec/en/directory/rishabh-agarwal?page=0%2C1",
    "official",
    "Google DeepMind role, McGill adjunct appointment, and PhD guidance by Aaron Courville and Marc Bellemare",
  ),
  agarwalDeepMind: source(
    "Google DeepMind — Many-Shot In-Context Learning",
    "https://deepmind.google/research/publications/88349/",
    "company",
    "Current Google DeepMind research output on large-language-model in-context learning",
  ),
  bellemareMila: source(
    "Mila directory — Marc Gendron-Bellemare",
    "https://mila.quebec/en/directory/marc-gendron-bellemare?page=0%2C0",
    "official",
    "Cohere role, McGill/UdeM adjunct appointments, research topics and student supervision",
  ),
  bellemareMcGill: source(
    "McGill School of Computer Science people",
    "https://www.cs.mcgill.ca/people/",
    "official",
    "McGill adjunct-faculty affiliation and reinforcement-learning area",
  ),
};

type PersonInput = Omit<Person, "facts" | "lastVerifiedAt" | "x" | "y"> & {
  sources: [Source, Source, ...Source[]];
  trajectory: string;
  significance: string;
};

const makePerson = (input: PersonInput, index: number): Person => {
  const { trajectory, significance, ...person } = input;
  return {
    ...person,
    x: 140 + (index % 3) * 220,
    y: 180 + Math.floor(index / 3) * 180,
    lastVerifiedAt: checkedAt,
    facts: [
      { label: "当前角色", value: person.role, source: person.sources[0] },
      { label: "学术训练与任职", value: trajectory, source: person.sources[1] },
      { label: "研究主线", value: person.area, source: person.sources[0] },
      { label: "为什么值得关注", value: significance, source: person.sources[0] },
    ],
  };
};

/**
 * Verified people needed to expose the wider Goodfellow–Bengio–Courville
 * training network. Industry researchers are adjacent nodes and do not inflate
 * the site's current-PI totals.
 */
export const goodfellowMilaNetworkPeople: Person[] = [
  makePerson({
    id: "yann-dauphin-mila-network",
    name: "Yann N. Dauphin",
    role: "Research Scientist, Google DeepMind",
    institution: "External",
    actualInstitution: "Google DeepMind",
    region: "United States",
    area: "Deep Learning · Optimization · Language Models",
    tags: ["深度学习", "优化", "GLU", "Google DeepMind", "Bengio 谱系"],
    summary: "Bengio 指导的 UdeM 博士、Google DeepMind 研究员；其工作覆盖 GLU、Mixup、Top-k sampling 与深度网络优化。",
    stage: "adjacent",
    category: "adjacent",
    primary: false,
    status: "industry research",
    sources: [sources.dauphinGoogle, sources.dauphinMila, sources.bengioCv],
    trajectory: "在 UdeM 完成 Yoshua Bengio 指导的博士，曾任 Facebook AI Research 研究员，后加入 Google DeepMind。",
    significance: "将蒙特利尔深度学习训练网络连接到现代语言模型组件与 Google DeepMind 的基础研究。",
  }, 0),
  makePerson({
    id: "nicolas-le-roux-mila-network",
    name: "Nicolas Le Roux",
    role: "Research Scientist, Microsoft Research · Adjunct Professor",
    institution: "McGill",
    region: "Canada",
    area: "Optimization · Reinforcement Learning · Generative Models",
    tags: ["优化", "强化学习", "生成模型", "Microsoft Research", "Bengio 谱系"],
    summary: "Bengio 的早期博士生之一，现任 Microsoft Research 研究员，并在 McGill 与 UdeM 担任兼职教授。",
    stage: "senior",
    category: "adjacent",
    primary: false,
    status: "industry research · adjunct faculty",
    sources: [sources.leRouxMila, sources.leRouxMicrosoft, sources.bengioCv],
    trajectory: "在 UdeM/Bengio 研究组完成博士训练，随后进入产业研究，同时持续参与蒙特利尔高校与 Mila 的学生培养。",
    significance: "连接 Bengio 的表征学习传统、现代优化方法与 LLM 强化学习后训练。",
  }, 1),
  makePerson({
    id: "dzmitry-bahdanau-mila-network",
    name: "Dzmitry Bahdanau",
    role: "AI Research Scientist, Periodic · Adjunct Professor, McGill",
    institution: "McGill",
    region: "Canada",
    area: "Neural Machine Translation · Attention · Systematic Generalization",
    tags: ["注意力机制", "机器翻译", "NLP", "系统泛化", "Bengio 谱系"],
    summary: "在 Bengio 指导下完成 UdeM/Mila 博士训练，是神经机器翻译注意力机制的重要贡献者；现连接学术界与产业研究。",
    stage: "senior",
    category: "adjacent",
    primary: false,
    status: "industry research · adjunct faculty",
    sources: [sources.bahdanauMila, sources.bahdanauServiceNow, sources.bengioCv],
    trajectory: "在 UdeM/Mila 与 Yoshua Bengio 开展博士研究，后领导 ServiceNow AI Research 对话研究，并任 McGill 兼职教授。",
    significance: "是 Bengio 谱系从深度表征学习走向注意力、神经机器翻译与现代 NLP 的关键节点。",
  }, 2),
  makePerson({
    id: "rishabh-agarwal-mila-network",
    name: "Rishabh Agarwal",
    role: "Research Scientist, Google DeepMind · Adjunct Professor, McGill",
    institution: "McGill",
    region: "Canada",
    area: "Large Language Models · Deep Reinforcement Learning",
    tags: ["LLM", "强化学习", "推理", "Google DeepMind", "Courville 谱系"],
    summary: "Aaron Courville 与 Marc Bellemare 共同指导的 Mila 博士，现任 Google DeepMind 研究员与 McGill 兼职教授。",
    stage: "emerging",
    category: "adjacent",
    primary: false,
    status: "industry research · adjunct faculty",
    sources: [sources.agarwalMila, sources.agarwalDeepMind],
    trajectory: "在 Mila 完成 Courville/Bellemare 共同指导的博士，曾进入 Geoffrey Hinton 的 Google Brain 团队，现于 Google DeepMind 研究 LLM 与深度强化学习。",
    significance: "把 Courville 的生成与强化学习网络连接到大模型推理、可扩展强化学习和 DeepMind。",
  }, 3),
  makePerson({
    id: "marc-bellemare-mila-network",
    name: "Marc G. Bellemare",
    role: "VP, Modeling, Cohere · Adjunct Professor",
    institution: "McGill",
    region: "Canada",
    area: "Reinforcement Learning · Large Language Models · Representation Learning",
    tags: ["强化学习", "LLM", "Cohere", "分布式强化学习", "Mila"],
    summary: "强化学习资深产业研究者与蒙特利尔兼职教授，曾在 DeepMind 与 Google Brain 任职，现任 Cohere VP, Modeling。",
    stage: "senior",
    category: "adjacent",
    primary: false,
    status: "industry leadership · adjunct faculty",
    sources: [sources.bellemareMila, sources.bellemareMcGill],
    trajectory: "University of Alberta 博士后进入 DeepMind 与 Google Brain，随后在 Cohere 领导模型研究，并持续在 McGill/UdeM 指导学生。",
    significance: "通过共同指导 Rishabh Agarwal，将 Courville/Mila 网络连接到分布式强化学习和 Cohere 模型团队。",
  }, 4),
];
const lineage = (
  id: string,
  from: string,
  to: string,
  subtype: "phd_adviser" | "co_adviser" | "master_adviser",
  label: string,
  evidence: string,
  evidenceSource: Source,
  endYear?: number,
): Relationship => ({
  id,
  from,
  to,
  type: "lineage",
  subtype,
  label,
  evidence,
  source: evidenceSource,
  verified: true,
  endYear,
});

/** Adviser points to trainee. No edge below is inferred from co-authorship. */
export const goodfellowMilaNetworkRelationships: Relationship[] = [
  lineage(
    "goodfellow-network-ng-goodfellow-msc",
    "andrew-ng-foundational",
    "ian-goodfellow-foundational",
    "master_adviser",
    "硕士导师",
    "Andrew Ng 的官方履历将 Ian Goodfellow 列入 former MSc students；Goodfellow 本人履历亦记录其在 Stanford 与 Andrew Ng 学习。",
    sources.ngCv,
    2010,
  ),
  lineage(
    "goodfellow-network-bengio-dauphin-phd",
    "yoshua-bengio-ca",
    "yann-dauphin-mila-network",
    "phd_adviser",
    "博士导师",
    "Google Research 官方人物页明确记录 Yann Dauphin 的 UdeM 博士由 Yoshua Bengio 指导。",
    sources.dauphinGoogle,
    2016,
  ),
  lineage(
    "goodfellow-network-bengio-leroux-phd",
    "yoshua-bengio-ca",
    "nicolas-le-roux-mila-network",
    "phd_adviser",
    "博士导师",
    "Yoshua Bengio 的官方履历将 Nicolas Le Roux 列入其 former PhD students。",
    sources.bengioCv,
  ),
  lineage(
    "goodfellow-network-bengio-bahdanau-phd",
    "yoshua-bengio-ca",
    "dzmitry-bahdanau-mila-network",
    "phd_adviser",
    "博士导师",
    "Mila 官方人物页明确记录 Dzmitry Bahdanau 在 UdeM/Mila 博士阶段与 Yoshua Bengio 工作。",
    sources.bahdanauMila,
  ),
  lineage(
    "goodfellow-network-courville-agarwal-phd",
    "aaron-courville-ca",
    "rishabh-agarwal-mila-network",
    "co_adviser",
    "共同博士导师",
    "Mila 官方人物页明确记录 Rishabh Agarwal 的博士由 Aaron Courville 与 Marc Bellemare 共同指导。",
    sources.agarwalMila,
  ),
  lineage(
    "goodfellow-network-bellemare-agarwal-phd",
    "marc-bellemare-mila-network",
    "rishabh-agarwal-mila-network",
    "co_adviser",
    "共同博士导师",
    "Mila 官方人物页明确记录 Rishabh Agarwal 的博士由 Marc Bellemare 与 Aaron Courville 共同指导。",
    sources.agarwalMila,
  ),
];
