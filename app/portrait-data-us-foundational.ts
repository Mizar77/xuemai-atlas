import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-08-30";

/**
 * Portraits for the cross-region foundational audit.  Only original image
 * assets retrieved from the cited first-party profile are admitted here.
 */
export const usFoundationalPortraits: Record<string, Portrait> = {
  "yann-lecun-us": {
    src: "portraits/us-foundational/yann-lecun-us.jpg",
    alt: "Portrait of Yann LeCun",
    source: {
      label: "NYU Center for Data Science · Yann LeCun",
      url: "https://cds.nyu.edu/team/yann-lecun/",
      kind: "official",
      checkedAt,
      supports: "Portrait identity for Yann LeCun",
    },
  },
};

export const portraits = usFoundationalPortraits;
