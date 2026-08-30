import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-08-30";

function portrait(id: string, name: string, label: string, url: string, kind: "official" | "profile" = "official"): Portrait {
  return {
    src: `portraits/final-us/${id}.jpg`,
    alt: `Portrait of ${name}`,
    source: {
      label,
      url,
      kind,
      checkedAt,
      supports: `Portrait identity for ${name}`,
    },
  };
}

/** High-confidence US portraits downloaded from the cited profile pages. */
export const finalUsPortraits: Record<string, Portrait> = {
  "fei-fei-li-us": portrait("fei-fei-li-us", "Fei-Fei Li", "Stanford faculty profile", "https://profiles.stanford.edu/fei-fei-li"),
  "jiajun-wu-stanford-us": portrait("jiajun-wu-stanford-us", "Jiajun Wu", "Stanford faculty profile", "https://profiles.stanford.edu/jiajun-wu"),
  "deva-ramanan-us": portrait("deva-ramanan-us", "Deva Ramanan", "CMU Robotics Institute faculty profile", "https://www.ri.cmu.edu/ri-faculty/deva-kannan-ramanan/"),
  "antonio-torralba-us": portrait("antonio-torralba-us", "Antonio Torralba", "MIT CSAIL profile", "https://www.csail.mit.edu/person/antonio-torralba"),
  "phillip-isola-us": portrait("phillip-isola-us", "Phillip Isola", "Phillip Isola MIT homepage", "https://web.mit.edu/phillipi/", "profile"),
  "olga-russakovsky-us": portrait("olga-russakovsky-us", "Olga Russakovsky", "Princeton Computer Science faculty profile", "https://www.cs.princeton.edu/people/profile/olgarus"),
  "kristen-grauman-us": portrait("kristen-grauman-us", "Kristen Grauman", "UT Austin Computer Science faculty profile", "https://www.cs.utexas.edu/people/faculty-researchers/kristen-grauman"),
  "rada-mihalcea-us": portrait("rada-mihalcea-us", "Rada Mihalcea", "University of Michigan CSE faculty profile", "https://cse.engin.umich.edu/personnel/mihalcea-rada"),
  "rose-yu-us": portrait("rose-yu-us", "Rose Yu", "Rose Yu homepage", "https://roseyu.com/", "profile"),
  "kaiming-he-us": portrait("kaiming-he-us", "Kaiming He", "MIT CSAIL profile", "https://www.csail.mit.edu/person/kaiming-he"),
  "shuran-song-us": portrait("shuran-song-us", "Shuran Song", "Stanford faculty profile", "https://profiles.stanford.edu/shuran-song?tab=bio"),
  "raymond-mooney": portrait("raymond-mooney", "Raymond Mooney", "UT Austin Computer Science faculty profile", "https://www.cs.utexas.edu/people/faculty-researchers/raymond-mooney"),
  "kathleen-mckeown": portrait("kathleen-mckeown", "Kathleen McKeown", "Kathleen McKeown Columbia homepage", "https://www.cs.columbia.edu/~kathy/", "profile"),
  "noah-smith": portrait("noah-smith", "Noah A. Smith", "Noah A. Smith homepage", "https://homes.cs.washington.edu/~nasmith/", "profile"),
};
