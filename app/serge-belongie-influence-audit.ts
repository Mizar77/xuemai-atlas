import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const source = (label: string, url: string, kind: Source["kind"], supports: string): Source => ({
  label,
  url,
  kind,
  checkedAt,
  supports,
});

const sources = {
  pioneerProfile: source(
    "Pioneer Centre for AI · Serge Belongie",
    "https://www.aicentre.dk/people/serge-belongie",
    "official",
    "Pioneer Centre directorship, Copenhagen professorship, prior Cornell/Google trajectory and current research agenda",
  ),
  belongieLab: source(
    "Belongie Lab · Team",
    "https://belongielab.org/team/",
    "profile",
    "Serge Belongie's self-maintained current postdoctoral and PhD group roster",
  ),
  belongieCv: source(
    "Serge Belongie · official Cornell CV",
    "https://www.cs.cornell.edu/~sjb/cv.pdf",
    "cv",
    "Berkeley doctorate and Jitendra Malik adviser record; named current and graduated PhD and master's advisees with destinations as of the CV update",
  ),
  pioneerPerona: source(
    "Pioneer Centre for AI · Visipedia founders award",
    "https://www.aicentre.dk/news/visipedia-founders-awarded-2025-stibitz-wilson-award-for-pioneering-work-in-human-centred-ai",
    "official",
    "Pietro Perona's undergraduate mentorship of Serge Belongie and the resulting long-term Visipedia collaboration",
  ),
};

export const sergeBelongieInfluencePersonEnhancements: Record<string, Partial<Person>> = {
  "serge-belongie-copenhagen": {
    summary: "Pioneer Centre for AI 主任与哥本哈根大学计算机科学教授；上游连接 Pietro Perona 的 Caltech 本科研究指导和 Jitendra Malik 的 Berkeley 博士谱系，下游公开团队覆盖视觉语言、3D、细粒度识别与可信 AI。",
    tags: ["计算机视觉", "机器学习", "细粒度识别", "视觉语言", "人机协同", "Pietro Perona", "Jitendra Malik"],
    facts: [
      { label: "当前角色", value: "University of Copenhagen 计算机科学教授、Pioneer Centre for AI 主任。", source: sources.pioneerProfile },
      { label: "研究主线", value: "计算机视觉、机器学习、目标识别与图像分割；近期进一步研究语言—视觉模型和面向错误信息防护的人本 AI。", source: sources.pioneerProfile },
      { label: "上游师承", value: "Pioneer Centre 官方报道明确称 Pietro Perona 在 Caltech 本科阶段指导其研究；本人 Cornell CV 列明 Berkeley 博士导师为 Jitendra Malik。", source: sources.pioneerPerona },
      { label: "当前培养网络", value: "Belongie Lab 本人维护的团队页列出 2 名博士后与 8 名博士生；本模块逐人记录这些公开成员，不把普通合著者计为学生。", source: sources.belongieLab },
      { label: "历史培养记录", value: "Cornell 官方域名上的本人 CV 逐名列出在读及已毕业博士、硕士学生，并为多名毕业生注明 Google、HHMI Janelia、Facebook AI Research、Zoox、Amazon 等当时去向。", source: sources.belongieCv },
      { label: "长期学术网络", value: "其与本科导师 Pietro Perona 的学术关系演化为长期 Visipedia 合作，并因该项目共同获得 2025 Stibitz-Wilson Award。", source: sources.pioneerPerona },
      { label: "为什么值得关注", value: "该节点把 Berkeley 经典视觉谱系、UCSD/Cornell 多代人才培养、欧洲跨校 AI 中心和人本视觉系统连接在一起。", source: sources.pioneerProfile },
    ],
    sources: [sources.pioneerProfile, sources.belongieLab, sources.belongieCv, sources.pioneerPerona],
    lastVerifiedAt: checkedAt,
  },
};

/**
 * This is not an edge inferred from co-authorship: the Pioneer Centre explicitly
 * describes Perona's mentorship and the later long-term Visipedia collaboration.
 */
export const sergeBelongieInfluenceRelationships: Relationship[] = [
  {
    id: "serge-belongie-pietro-perona-undergrad-mentor",
    from: "pietro-perona-lineage",
    to: "serge-belongie-copenhagen",
    type: "lineage",
    subtype: "other",
    label: "本科研究导师",
    evidence: "Pioneer Centre for AI 官方报道明确写明 Serge Belongie 在 1990 年代初于 Caltech 本科阶段在 Pietro Perona 指导下开展研究；该学术关系后来发展为长期 Visipedia 合作。",
    evidenceObject: "Pietro Perona → Serge Belongie · undergraduate research mentorship",
    source: sources.pioneerPerona,
    verified: true,
  },
  {
    id: "serge-belongie-pietro-perona-visipedia",
    from: "serge-belongie-copenhagen",
    to: "pietro-perona-lineage",
    type: "collaboration",
    subtype: "sustained_collaboration",
    label: "Visipedia 长期合作",
    evidence: "Pioneer Centre for AI 官方报道将二人称为 Visipedia founders，并说明早期导师关系演化为奠定 Visipedia 基础的长期合作；二人共同获 2025 Stibitz-Wilson Award。",
    evidenceObject: "Visipedia · 2025 Stibitz-Wilson Award",
    source: sources.pioneerPerona,
    verified: true,
    recentYear: 2025,
  },
];

const member = (id: string, name: string, role: string): GroupMember => ({
  id: `serge-belongie-current-${id}`,
  teacherId: "serge-belongie-copenhagen",
  name,
  role,
  focus: "Belongie Lab current public roster",
  source: sources.belongieLab,
});

export const sergeBelongieInfluenceGroupMembers: GroupMember[] = [
  member("postdoc-ioannis-siglidis", "Ioannis Siglidis", "Postdoctoral Researcher"),
  member("postdoc-stella-frank", "Stella Frank", "Postdoctoral Researcher"),
  member("phd-vesteinn-snaebjarnarson", "Vésteinn Snæbjarnarson", "PhD Student"),
  member("phd-peter-ebert-christensen", "Peter Ebert Christensen", "PhD Student"),
  member("phd-sebastian-loeschcke", "Sebastian Loeschcke", "PhD Student"),
  member("phd-srishti-yadav", "Srishti Yadav", "PhD Student"),
  member("phd-zhaochong-an", "Zhaochong An", "PhD Student"),
  member("phd-jiaang-li", "Jiaang Li", "PhD Student"),
  member("phd-marco-schouten", "Marco Schouten", "PhD Student"),
  member("phd-noah-rothenberger", "Noah Rothenberger", "PhD Student"),
];

/** Person IDs that have completed this formal-leader influence pass. */
export const sergeBelongieInfluenceReviewedIds = ["serge-belongie-copenhagen"] as const;
