import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-08-30";

function portrait(id: string, name: string, label: string, url: string): Portrait {
  return {
    src: `portraits/final-europe-hk/${id}.jpg`,
    alt: `Portrait of ${name}`,
    source: {
      label,
      url,
      kind: "official",
      checkedAt,
      supports: `Portrait identity for ${name}`,
    },
  };
}

/**
 * Portraits verified against first-party university or research-institute pages.
 * Entries are intentionally omitted when the only available image is a group shot,
 * a logo, a screenshot, or cannot be confidently matched to the named scholar.
 */
export const finalEuropeHkPortraits: Record<string, Portrait> = {
  "tim-rocktaschel-eu": portrait(
    "tim-rocktaschel-eu",
    "Tim Rocktäschel",
    "Portrait source · UCL Profiles",
    "https://profiles.ucl.ac.uk/41247-tim-rocktaschel",
  ),
  "ferenc-huszar-eu": portrait(
    "ferenc-huszar-eu",
    "Ferenc Huszár",
    "Portrait source · University of Cambridge profile",
    "https://www.cst.cam.ac.uk/people/fh277",
  ),
  "lourdes-agapito-eu": portrait(
    "lourdes-agapito-eu",
    "Lourdes Agapito",
    "Portrait source · UCL Vision and Imaging Science group",
    "https://www.ucl.ac.uk/engineering/computer-science/research/research-groups-and-centres/vision-and-imaging-science-group",
  ),
  "david-silver-eu": portrait(
    "david-silver-eu",
    "David Silver",
    "Portrait source · Royal Society profile",
    "https://www.royalsociety.org/people/david-silver-35033/",
  ),
  "ivan-titov-eu": portrait(
    "ivan-titov-eu",
    "Ivan Titov",
    "Portrait source · University of Edinburgh supervisor profile",
    "https://informatics.ed.ac.uk/cdt-in-machine-learning-systems/people/supervisors/natural-language-processing-and-speech-systems",
  ),
  "hakan-bilen-eu": portrait(
    "hakan-bilen-eu",
    "Hakan Bilen",
    "Portrait source · University of Edinburgh homepage",
    "https://homepages.inf.ed.ac.uk/hbilen/index.html",
  ),
  "thomas-hofmann-eu": portrait(
    "thomas-hofmann-eu",
    "Thomas Hofmann",
    "Portrait source · ETH Zürich Data Analytics Lab",
    "https://da.inf.ethz.ch/people/ThomasHofmann/",
  ),
  "martin-jaggi-eu": portrait(
    "martin-jaggi-eu",
    "Martin Jaggi",
    "Portrait source · EPFL Mediatheque",
    "https://mediatheque.epfl.ch/en/media/bf15efba-b3bb-447f-9e18-f4e3caa2d03a/",
  ),
  "volkan-cevher-eu": portrait(
    "volkan-cevher-eu",
    "Volkan Cevher",
    "Portrait source · EPFL Mediatheque",
    "https://mediatheque.epfl.ch/en/media/3e6a2e20-a465-4a41-9037-bd414a0025e6/",
  ),
  "michael-black-eu": portrait(
    "michael-black-eu",
    "Michael J. Black",
    "Portrait source · Max Planck IMPRS-IS profile",
    "https://imprs.is.tue.mpg.de/person/black",
  ),
  "iryna-gurevych-eu": portrait(
    "iryna-gurevych-eu",
    "Iryna Gurevych",
    "Portrait source · TU Darmstadt Computer Science",
    "https://www.informatik.tu-darmstadt.de/fb20/ueber_uns_details_312192.en.jsp",
  ),
  "stefan-roth-eu": portrait(
    "stefan-roth-eu",
    "Stefan Roth",
    "Portrait source · TU Darmstadt Visual Inference Lab",
    "https://www.visinf.tu-darmstadt.de/visual_inference/people_vi/stefan_roth.en.jsp",
  ),
  "maarten-de-rijke-eu": portrait(
    "maarten-de-rijke-eu",
    "Maarten de Rijke",
    "Portrait source · University of Amsterdam profile",
    "https://www.uva.nl/en/about-the-uva/organisation/professors/university-professors/maarten-de-rijke.html",
  ),
  "cees-snoek-eu": portrait(
    "cees-snoek-eu",
    "Cees Snoek",
    "Portrait source · University of Amsterdam appointment",
    "https://www.uva.nl/shared-content/uva/en/news/professor-appointments/2018/01/cees-snoek-professor-of-intelligent-sensory-information-systems.html",
  ),
  "luc-de-raedt-eu": portrait(
    "luc-de-raedt-eu",
    "Luc De Raedt",
    "Portrait source · KU Leuven Faculty of Engineering Science",
    "https://eng.kuleuven.be/en/media/images/luc-de-raedt/view",
  ),
  "cordelia-schmid-eu": portrait(
    "cordelia-schmid-eu",
    "Cordelia Schmid",
    "Portrait source · Inria award profile",
    "https://inria.fr/en/computer-vision-cordelia-schmid-data-visualization-scientific-award-korber",
  ),
  "gael-varoquaux-eu": portrait(
    "gael-varoquaux-eu",
    "Gaël Varoquaux",
    "Portrait source · Inria profile",
    "https://www.inria.fr/fr/gael-varoquaux-0",
  ),
  "roberto-navigli-eu": portrait(
    "roberto-navigli-eu",
    "Roberto Navigli",
    "Portrait source · Sapienza University of Rome profile",
    "https://www.diag.uniroma1.it/users/roberto_navigli",
  ),
  "michael-lyu-cuhk": portrait(
    "michael-lyu-cuhk",
    "Michael R. Lyu",
    "Portrait source · CUHK CSE homepage",
    "https://www.cse.cuhk.edu.hk/lyu/",
  ),
  "jiaya-jia-hkust": portrait(
    "jiaya-jia-hkust",
    "Jiaya Jia",
    "Portrait source · HKUST School of Engineering profile",
    "https://seng.hkust.edu.hk/about/people/faculty/jiaya-jia",
  ),
  "xiaoou-tang-cuhk": portrait(
    "xiaoou-tang-cuhk",
    "Xiaoou Tang",
    "Portrait source · CUHK Multimedia Laboratory people page",
    "https://mmlab.ie.cuhk.edu.hk/people.html",
  ),
};
