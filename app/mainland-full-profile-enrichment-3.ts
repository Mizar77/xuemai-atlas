import type { GroupMember, Person, Relationship, StudentPlacement } from "./data";

type PersonEnhancement = Partial<Pick<Person, "lastVerifiedAt">>;

const reviewed = { lastVerifiedAt: "2026-08-28" } as const;

/**
 * Final review pass for already evidence-dense senior profiles. Their existing
 * first-party university/lab pages were reopened on 2026-08-28; no synthetic
 * fact is added merely to increase the fact count.
 */
export const mainlandFullProfileEnhancements3: Record<string, PersonEnhancement> = {
  "maosong-sun": reviewed,
  "jie-tang-thu": reviewed,
  "houfeng-wang": reviewed,
  "jirong-wen": reviewed,
  "ting-liu-hit": reviewed,
  "wanxiang-che": reviewed,
  "chengqing-zong": reviewed,
  "jiajun-chen-nju": reviewed,
  "kai-yu-sjtu": reviewed,
};

export const mainlandFullProfileRelationships3: Relationship[] = [];
export const mainlandFullProfileGroupMembers3: GroupMember[] = [];
export const mainlandFullProfileStudentPlacements3: StudentPlacement[] = [];
