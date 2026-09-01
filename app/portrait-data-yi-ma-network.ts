import type { Person, Source } from "./data";

const checkedAt = "2026-09-01";
const portrait = (id: string, name: string, sourceUrl: string, label: string): NonNullable<Person["portrait"]> => ({
  src: `portraits/yi-ma-network/${id}.jpg`,
  alt: `${name} portrait`,
  source: { label, url: sourceUrl, kind: "official", checkedAt, supports: "Public single-person portrait used for identity display" } satisfies Source,
});

export const yiMaNetworkPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "haozhi-qi-us": portrait("haozhi-qi-us", "Haozhi Qi", "https://haozhi.io/", "Haozhi Qi academic homepage"),
  "yaodong-yu-us": portrait("yaodong-yu-us", "Yaodong Yu", "https://yaodongyu.github.io/", "Yaodong Yu academic homepage"),
  "john-wright-us": portrait("john-wright-us", "John Wright", "https://www.engineering.columbia.edu/faculty-staff/directory/john-wright", "Columbia Engineering faculty directory"),
  "kun-huang-us": portrait("kun-huang-us", "Kun Huang", "https://medicine.iu.edu/faculty/38697/huang-kun", "Indiana University School of Medicine faculty profile"),
  "zihan-zhou-us": portrait("zihan-zhou-us", "Zihan Zhou", "https://iee.psu.edu/people/zihan-zhou", "Penn State faculty profile"),
};
