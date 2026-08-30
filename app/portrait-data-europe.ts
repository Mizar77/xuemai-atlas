import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-08-30";

function portrait(id: string, name: string, label: string, url: string, kind: "official" | "profile" = "official"): Portrait {
  return {
    src: `portraits/europe/${id}.jpg`,
    alt: `${name} portrait`,
    source: {
      label,
      url,
      kind,
      checkedAt,
      supports: `${name} portrait identity`,
    },
  };
}

/**
 * Conservative first batch: every image was extracted from a page that names
 * the scholar and was visually checked before being added. Missing entries
 * deliberately keep their initials instead of using a low-confidence photo.
 */
export const europePortraits: Record<string, Portrait> = {
  "yarin-gal-eu": portrait("yarin-gal-eu", "Yarin Gal", "Oxford CS profile", "https://www.cs.ox.ac.uk/people/yarin.gal/index.html"),
  "michael-bronstein-eu": portrait("michael-bronstein-eu", "Michael Bronstein", "Oxford CS profile", "https://www.cs.ox.ac.uk/people/michael.bronstein/"),
  "philip-torr-eu": portrait("philip-torr-eu", "Philip Torr", "Oxford Engineering profile", "https://eng.ox.ac.uk/people/philip-torr"),
  "christian-rupprecht-eu": portrait("christian-rupprecht-eu", "Christian Rupprecht", "Christian Rupprecht homepage", "https://chrirupp.github.io/", "profile"),
  "michael-wooldridge-eu": portrait("michael-wooldridge-eu", "Michael Wooldridge", "Oxford CS profile", "https://www.cs.ox.ac.uk/people/michael.wooldridge/"),
  "neil-lawrence-eu": portrait("neil-lawrence-eu", "Neil Lawrence", "Cambridge profile", "https://www.cst.cam.ac.uk/people/ndl21"),
  "andreas-vlachos-eu": portrait("andreas-vlachos-eu", "Andreas Vlachos", "Andreas Vlachos homepage", "https://andreasvlachos.github.io/", "profile"),
  "anna-korhonen-eu": portrait("anna-korhonen-eu", "Anna Korhonen", "Cambridge MMLL profile", "https://www.mmll.cam.ac.uk/people/anna-korhonen"),
  "roberto-cipolla-eu": portrait("roberto-cipolla-eu", "Roberto Cipolla", "Cambridge Engineering profile", "https://www.eng.cam.ac.uk/profiles/rc10001"),
  "sebastian-riedel-eu": portrait("sebastian-riedel-eu", "Sebastian Riedel", "UCL NLP profile", "https://nlp.cs.ucl.ac.uk/", "profile"),
  "marc-deisenroth-eu": portrait("marc-deisenroth-eu", "Marc Deisenroth", "Marc Deisenroth homepage", "https://www.deisenroth.cc/", "profile"),
  "mirella-lapata-eu": portrait("mirella-lapata-eu", "Mirella Lapata", "University of Edinburgh Research Explorer", "https://www.research.ed.ac.uk/en/persons/mirella-lapata/"),
  "amos-storkey-eu": portrait("amos-storkey-eu", "Amos Storkey", "Amos Storkey homepage", "https://homepages.inf.ed.ac.uk/amos/", "profile"),
  "andreas-krause-eu": portrait("andreas-krause-eu", "Andreas Krause", "ETH Learning & Adaptive Systems", "https://las.inf.ethz.ch/", "profile"),
  "marc-pollefeys-eu": portrait("marc-pollefeys-eu", "Marc Pollefeys", "ETH Computer Science profile", "https://inf.ethz.ch/people/person-detail.pollefeys.html"),
  "zeynep-akata-eu": portrait("zeynep-akata-eu", "Zeynep Akata", "TUM professor profile", "https://www.professoren.tum.de/akata-zeynep"),
  "max-welling-eu": portrait("max-welling-eu", "Max Welling", "Amsterdam Machine Learning Lab", "https://amlab-amsterdam.github.io/people/MaxWelling/", "profile"),
  "benoit-sagot-eu": portrait("benoit-sagot-eu", "Benoît Sagot", "Benoît Sagot homepage", "https://pauillac.inria.fr/~sagot/", "profile"),
};
