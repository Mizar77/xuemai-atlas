import type { Person, Source } from "./data";

const checkedAt = "2026-09-02";
const portrait = (id: string, name: string, label: string, url: string): NonNullable<Person["portrait"]> => ({
  src: `portraits/huang-yan-network/${id}.jpg`,
  alt: `${name} official portrait`,
  source: { label, url, kind: "official", checkedAt, supports: "Official single-person portrait" } satisfies Source,
});

export const thomasHuangYanPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "humphrey-shi-gatech": portrait("humphrey-shi-gatech", "Humphrey Shi", "Georgia Tech College of Computing — Humphrey Shi", "https://www.ic.gatech.edu/people/humphrey-shi"),
  "chang-wen-chen-polyu": portrait("chang-wen-chen-polyu", "Chang Wen Chen", "PolyU COMP — Chang Wen Chen", "https://www4.comp.polyu.edu.hk/~chencw/Home.html"),
  "pan-zhou-smu": portrait("pan-zhou-smu", "Pan Zhou", "SMU Faculty Directory — Pan Zhou", "https://faculty.smu.edu.sg/profile/zhou-pan-7776"),
};
