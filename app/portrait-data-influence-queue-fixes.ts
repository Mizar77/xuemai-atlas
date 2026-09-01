import type { Person, Source } from "./data";

const katsushiIkeuchiPortraitSource = {
  label: "Katsushi Ikeuchi · University of Tokyo CVL homepage",
  url: "https://www.cvl.iis.u-tokyo.ac.jp/~ki/",
  kind: "profile",
  checkedAt: "2026-09-01",
  supports: "First-party University of Tokyo CVL biography and embedded single-person portrait",
} satisfies Source;

export const influenceQueueFixPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "katsushi-ikeuchi-historical": {
    src: "portraits/influence-queue-fixes/katsushi-ikeuchi-historical.jpg",
    alt: "Katsushi Ikeuchi portrait from his University of Tokyo CVL homepage",
    source: katsushiIkeuchiPortraitSource,
  },
};

export const portraitMap = influenceQueueFixPortraits;
