import type { Person, Source } from "./data";

const checkedAt = "2026-08-31";
const portrait = (id: string, name: string, label: string, url: string): NonNullable<Person["portrait"]> => ({
  src: `portraits/canada-west/${id}.jpg`,
  alt: `${name} official portrait`,
  source: { label, url, kind: "official", checkedAt, supports: "Official or self-published single-person portrait" } satisfies Source,
});

export const canadaWestPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "leonid-sigal-ca": portrait("leonid-sigal-ca", "Leonid Sigal", "UBC CS · Leonid Sigal", "https://www.cs.ubc.ca/people/leonid-sigal"),
  "vered-shwartz-ca": portrait("vered-shwartz-ca", "Vered Shwartz", "Vered Shwartz · official high-resolution headshots", "https://www.cs.ubc.ca/~vshwartz/index.html"),
  "kwang-moo-yi-ca": portrait("kwang-moo-yi-ca", "Kwang Moo Yi", "UBC CS · Kwang Moo Yi", "https://www.cs.ubc.ca/people/kwang-moo-yi"),
  "mark-schmidt-ca": portrait("mark-schmidt-ca", "Mark Schmidt", "UBC CS · Mark Schmidt", "https://www.cs.ubc.ca/people/mark-schmidt"),
  "jeff-clune-ca": portrait("jeff-clune-ca", "Jeff Clune", "UBC CS · Jeff Clune", "https://www.cs.ubc.ca/people/jeff-clune"),
  "hila-gonen-ca": portrait("hila-gonen-ca", "Hila Gonen", "UBC CS · Hila Gonen", "https://www.cs.ubc.ca/news/2025/11/dr-hila-gonen-brings-trustworthy-and-reliable-ai-ubc-computer-science"),
  "richard-sutton-ca": portrait("richard-sutton-ca", "Richard S. Sutton", "Amii · Richard S. Sutton", "https://www.amii.ca/people/richard-s-sutton"),
  "martha-white-ca": portrait("martha-white-ca", "Martha White", "Amii · Martha White", "https://www.amii.ca/people/martha-white"),
  "adam-white-ca": portrait("adam-white-ca", "Adam White", "University of Alberta · Adam White", "https://apps.ualberta.ca/directory/person/amw8"),
  "michael-bowling-ca": portrait("michael-bowling-ca", "Michael Bowling", "University of Alberta · Michael Bowling", "https://apps.ualberta.ca/directory/person/mbowling"),
  "csaba-szepesvari-ca": portrait("csaba-szepesvari-ca", "Csaba Szepesvári", "University of Alberta · Csaba Szepesvári", "https://apps.ualberta.ca/directory/person/szepesva"),
  "patrick-pilarski-ca": portrait("patrick-pilarski-ca", "Patrick Pilarski", "University of Alberta · Patrick Pilarski", "https://apps.ualberta.ca/directory/person/pilarski"),
  "pascal-poupart-ca": portrait("pascal-poupart-ca", "Pascal Poupart", "Waterloo CS · Pascal Poupart", "https://uwaterloo.ca/computer-science/contacts/pascal-poupart"),
  "jimmy-lin-ca": portrait("jimmy-lin-ca", "Jimmy Lin", "Waterloo CS · Jimmy Lin", "https://uwaterloo.ca/computer-science/contacts/jimmy-lin"),
  "kate-larson-ca": portrait("kate-larson-ca", "Kate Larson", "Waterloo CS · Kate Larson", "https://uwaterloo.ca/computer-science/contacts/kate-larson"),
  "wenhu-chen-ca": portrait("wenhu-chen-ca", "Wenhu Chen", "Waterloo CS · Wenhu Chen", "https://uwaterloo.ca/computer-science/about/people/wenhuche"),
  "freda-shi-ca": portrait("freda-shi-ca", "Freda Shi", "Waterloo CS · Freda Shi", "https://uwaterloo.ca/computer-science/about/people/fhs"),
  "victor-zhong-ca": portrait("victor-zhong-ca", "Victor Zhong", "Waterloo CS · Victor Zhong", "https://uwaterloo.ca/computer-science/about/people/vzhng"),
  "yuntian-deng-ca": portrait("yuntian-deng-ca", "Yuntian Deng", "Waterloo CS · Yuntian Deng", "https://uwaterloo.ca/computer-science/about/people/yuntian"),
};
