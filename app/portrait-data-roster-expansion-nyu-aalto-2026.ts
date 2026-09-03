import type { Person, Source } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-09-02";

function portrait(id: string, name: string, profileUrl: string): Portrait {
  const source: Source = {
    label: `Official faculty-profile portrait — ${name}`,
    url: profileUrl,
    kind: "official",
    checkedAt,
    supports: `Portrait identity for ${name}`,
  };

  return {
    src: `portraits/roster-expansion-nyu-aalto-2026/${id}.jpg`,
    alt: `${name} official faculty portrait`,
    source,
  };
}

/**
 * Portraits were taken from the single-person faculty pages named below,
 * center-cropped to 1:1, resized to 512×512 and visually checked one by one.
 */
export const nyuAaltoRosterPortraits2026: Record<string, Portrait> = {
  "qi-chen-aalto": portrait("qi-chen-aalto", "Qi Chen", "https://www.aalto.fi/en/people/qi-chen"),
  "francesco-croce-aalto": portrait("francesco-croce-aalto", "Francesco Croce", "https://www.aalto.fi/en/people/francesco-croce"),
  "azade-farshad-aalto": portrait("azade-farshad-aalto", "Azade Farshad", "https://www.aalto.fi/en/people/azade-farshad"),
  "christian-guckelsberger-aalto": portrait("christian-guckelsberger-aalto", "Christian Guckelsberger", "https://www.aalto.fi/en/people/christian-guckelsberger"),
  "perttu-hamalainen-aalto": portrait("perttu-hamalainen-aalto", "Perttu Hämäläinen", "https://www.aalto.fi/en/people/perttu-hamalainen"),
  "alex-jung-aalto": portrait("alex-jung-aalto", "Alex Jung", "https://www.aalto.fi/en/people/alex-jung"),
  "juho-kannala-aalto": portrait("juho-kannala-aalto", "Juho Kannala", "https://www.aalto.fi/en/people/juho-kannala"),
  "juhi-kulshrestha-aalto": portrait("juhi-kulshrestha-aalto", "Juhi Kulshrestha", "https://www.aalto.fi/en/people/juhi-kulshrestha"),
  "harri-lahdesmaki-aalto": portrait("harri-lahdesmaki-aalto", "Harri Lähdesmäki", "https://www.aalto.fi/en/people/harri-lahdesmaki"),
  "jussi-rintanen-aalto": portrait("jussi-rintanen-aalto", "Jussi Rintanen", "https://www.aalto.fi/en/people/jussi-rintanen"),
  "juho-rousu-aalto": portrait("juho-rousu-aalto", "Juho Rousu", "https://www.aalto.fi/en/people/juho-rousu"),
  "aki-vehtari-aalto": portrait("aki-vehtari-aalto", "Aki Vehtari", "https://www.aalto.fi/en/people/aki-vehtari"),
  "johanna-viitanen-aalto": portrait("johanna-viitanen-aalto", "Johanna Viitanen", "https://www.aalto.fi/en/people/johanna-viitanen"),
  "robin-welsch-aalto": portrait("robin-welsch-aalto", "Robin Welsch", "https://www.aalto.fi/en/people/robin-welsch"),
  "deepika-yadav-aalto": portrait("deepika-yadav-aalto", "Deepika Yadav", "https://www.aalto.fi/en/people/deepika-yadav"),
  "bo-zhao-aalto": portrait("bo-zhao-aalto", "Bo Zhao", "https://www.aalto.fi/en/people/bo-zhao"),
  "andrew-gordon-wilson-nyu": portrait("andrew-gordon-wilson-nyu", "Andrew Gordon Wilson", "https://cds.nyu.edu/team/andrew-wilson/"),
  "brian-mcfee-nyu": portrait("brian-mcfee-nyu", "Brian McFee", "https://cds.nyu.edu/team/brian-mcfee/"),
  "carlos-fernandez-granda-nyu": portrait("carlos-fernandez-granda-nyu", "Carlos Fernandez-Granda", "https://cds.nyu.edu/team/carlos-fernandez-granda-2/"),
  "joan-bruna-nyu": portrait("joan-bruna-nyu", "Joan Bruna", "https://cds.nyu.edu/team/joan-bruna-2/"),
};
