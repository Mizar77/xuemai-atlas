import type { Person, Source } from "./data";

const checkedAt = "2026-08-31";

const portrait = (
  id: string,
  name: string,
  label: string,
  url: string,
): NonNullable<Person["portrait"]> => ({
  src: `portraits/global-p0-b/${id}.jpg`,
  alt: `${name} official portrait`,
  source: {
    label,
    url,
    kind: "official",
    checkedAt,
    supports: "Official or self-published single-person portrait",
  } satisfies Source,
});

export const globalP0BPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "yi-ma-hku": portrait(
    "yi-ma-hku",
    "Yi Ma",
    "HKU Faculty of Engineering · Yi Ma",
    "https://engg.hku.hk/About-Us/Faculty-Leadership/Heads-of-Departments",
  ),
  "tong-zhang-hkust": portrait(
    "tong-zhang-hkust",
    "Tong Zhang",
    "HKUST Department of Mathematics · Tong Zhang",
    "https://www.math.hkust.edu.hk/people/faculty/profile/tongzhang/",
  ),
  "david-hsu-nus": portrait(
    "david-hsu-nus",
    "David Hsu",
    "NUS AI Lab · David Hsu",
    "https://nusail.comp.nus.edu.sg/nus-computing-prof-david-hsu-prof-lee-wee-sun-and-et-all-win-2022-ijcai-jair-best-paper-award/",
  ),
  "shuicheng-yan-nus": portrait(
    "shuicheng-yan-nus",
    "Shuicheng Yan",
    "Shuicheng Yan · Personal homepage",
    "https://yanshuicheng.info/",
  ),
  "ivor-tsang-astar": portrait(
    "ivor-tsang-astar",
    "Ivor W. Tsang",
    "A*STAR CFAR · Ivor Tsang",
    "https://www.a-star.edu.sg/cfar/about-cfar/management/prof-ivor-tsang",
  ),
  "steven-hoi-smu": portrait(
    "steven-hoi-smu",
    "Steven Hoi",
    "SMU Faculty Directory · Steven Hoi",
    "https://faculty.smu.edu.sg/profile/steven-hoi-6686",
  ),
};
