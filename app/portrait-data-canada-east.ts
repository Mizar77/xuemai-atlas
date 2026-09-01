import type { Person, Source } from "./data";

const checkedAt = "2026-08-31";
const portraitSource = (label: string, url: string): Source => ({
  label, url, kind: "official", checkedAt, supports: "Official single-person portrait used for the local 512×512 crop",
});

const sources: Record<string, Source> = {
  "geoffrey-hinton-ca": portraitSource("Nobel Prize · Geoffrey Hinton portrait", "https://www.nobelprize.org/prizes/physics/2024/hinton/facts/"),
  "sanja-fidler-ca": portraitSource("Sanja Fidler homepage portrait", "https://www.cs.toronto.edu/~fidler/index.html"),
  "roger-grosse-ca": portraitSource("U of T CS · Roger Grosse portrait", "https://web.cs.toronto.edu/news-events/news/two-department-of-computer-science-researchers-receive-2021-sloan-research-fellowships"),
  "david-duvenaud-ca": portraitSource("David Duvenaud homepage portrait", "https://www.cs.toronto.edu/~duvenaud/"),
  "jimmy-ba-ca": portraitSource("Jimmy Ba homepage portrait", "https://www.cs.utoronto.ca/~jba/"),
  "bo-wang-toronto-ca": portraitSource("UHN Research · Bo Wang portrait", "https://www.uhnresearch.ca/researcher/bo-wang"),
  "richard-zemel-ca": portraitSource("Richard Zemel homepage portrait", "https://www.cs.columbia.edu/~zemel/"),
  "yoshua-bengio-ca": portraitSource("Mila · Yoshua Bengio portrait", "https://mila.quebec/en/directory/yoshua-bengio"),
  "hugo-larochelle-ca": portraitSource("Mila · Hugo Larochelle portrait", "https://mila.quebec/en/directory/hugo-larochelle"),
  "aaron-courville-ca": portraitSource("Mila · Aaron Courville portrait", "https://mila.quebec/en/directory/aaron-courville"),
  "irina-rish-ca": portraitSource("Mila · Irina Rish portrait", "https://mila.quebec/en/directory/irina-rish"),
  "jian-tang-ca": portraitSource("Mila · Jian Tang portrait", "https://mila.quebec/en/directory/jian-tang"),
  "gauthier-gidel-ca": portraitSource("Mila · Gauthier Gidel portrait", "https://mila.quebec/en/directory/gauthier-gidel"),
  "christopher-pal-ca": portraitSource("Mila · Chris Pal portrait", "https://mila.quebec/en/directory/chris-pal"),
  "doina-precup-ca": portraitSource("Mila · Doina Precup portrait", "https://mila.quebec/en/directory/doina-precup"),
  "joelle-pineau-ca": portraitSource("Mila · Joëlle Pineau portrait", "https://mila.quebec/en/directory/joelle-pineau"),
  "siva-reddy-ca": portraitSource("Mila · Siva Reddy portrait", "https://mila.quebec/en/directory/siva-reddy"),
  "jackie-cheung-ca": portraitSource("Mila · Jackie Cheung portrait", "https://mila.quebec/en/directory/jackie-cheung"),
  "david-rolnick-ca": portraitSource("Mila · David Rolnick portrait", "https://mila.quebec/en/directory/david-rolnick"),
};

export const canadaEastPortraits: Record<string, NonNullable<Person["portrait"]>> = Object.fromEntries(
  Object.entries(sources).map(([id, source]) => [id, {
    src: `portraits/canada-east/${id}.jpg`,
    alt: `${id.replace(/-ca$/, "").replaceAll("-", " ")} official portrait`,
    source,
  }]),
);
