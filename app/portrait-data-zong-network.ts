import type { Person, Source } from "./data";

const checkedAt = "2026-09-01";
const portrait = (id: string, name: string, url: string, label: string): NonNullable<Person["portrait"]> => ({
  src: `portraits/zong-network/${id}.jpg`,
  alt: `${name} portrait`,
  source: { label, url, kind: "official", checkedAt, supports: "Public single-person portrait used for identity display" } satisfies Source,
});

export const zongNetworkPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "shoushan-li-suda": portrait("shoushan-li-suda", "李寿山", "https://web.suda.edu.cn/lishoushan/", "苏州大学教师主页"),
  "rui-xia-nju": portrait("rui-xia-nju", "夏睿", "https://rxiacn.github.io/", "夏睿学术主页"),
};
