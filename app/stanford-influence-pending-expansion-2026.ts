import type { GroupMember, Person, Relationship, Source } from "./data";

const checkedAt = "2026-09-03";

const source = (label: string, url: string, supports: string): Source => ({
  label,
  url,
  kind: "official",
  checkedAt,
  supports,
});

const sources = {
  azalia: source(
    "Stanford Profiles · Azalia Mirhoseini",
    "https://profiles.stanford.edu/azalia-mirhoseini",
    "Stanford Advisees section explicitly names doctoral dissertation advisees and co-advisees",
  ),
  karen: source(
    "Stanford Profiles · C. Karen Liu",
    "https://profiles.stanford.edu/c-karen-liu",
    "Stanford Advisees section explicitly names doctoral dissertation advisees",
  ),
  chris: source(
    "Christopher Ré · Stanford homepage",
    "https://cs.stanford.edu/people/chrismre/",
    "First-party lab roster explicitly lists current PhD students and co-advisers",
  ),
  dan: source(
    "Stanford NeuroAILab · People",
    "https://neuroailab.stanford.edu/people.html",
    "First-party lab roster explicitly lists current PhD students, postdoctoral scholars and joint supervision",
  ),
  jeannette: source(
    "Stanford Interactive Perception and Robot Learning Lab · People",
    "https://iprl.stanford.edu/index.html",
    "First-party lab roster explicitly lists current PhD students and co-advisers",
  ),
  monica: source(
    "Monica S. Lam · Stanford homepage",
    "https://suif.stanford.edu/~lam/",
    "First-party homepage explicitly lists current PhD students and PhD graduates",
  ),
  dorsa: source(
    "Stanford ILIAD · People",
    "https://iliad.stanford.edu/people/",
    "First-party lab roster explicitly lists current PhD students, co-advisers and alumni destinations",
  ),
  jure: source(
    "Stanford SNAP · People",
    "https://snap.stanford.edu/people.html",
    "First-party group roster explicitly lists current PhD students",
  ),
};

const enhancement = (value: string, rosterSource: Source): Partial<Person> => ({
  facts: [{ label: "团队与培养体系", value, source: rosterSource }],
  sources: [rosterSource],
  lastVerifiedAt: checkedAt,
});

export const stanfordInfluencePendingPersonEnhancements: Record<string, Partial<Person>> = {
  "azalia-mirhoseini-stanford": enhancement(
    "Stanford Profiles 的 Stanford Advisees 栏明确记录 Jon Saad-Falcon 为博士论文指导学生，并记录 Hermann Kumbong、Yuzhen Mao 等博士共同指导学生。",
    sources.azalia,
  ),
  "karen-liu-stanford": enhancement(
    "Stanford Profiles 的 Stanford Advisees 栏明确记录 Joao Araujo、Tyler Lum、Keenon Werling 等博士论文指导学生。",
    sources.karen,
  ),
  "chris-re-stanford": enhancement(
    "本人 Stanford 主页维护当前博士生名录，逐人标注共同导师，并另列博士与博士后校友的学术、创业和工业去向。",
    sources.chris,
  ),
  "dan-yamins-stanford": enhancement(
    "NeuroAILab 官方团队页区分当前博士生、博士后与校友，并明确标注共同指导关系及部分校友现职。",
    sources.dan,
  ),
  "jeannette-bohg-stanford": enhancement(
    "Interactive Perception and Robot Learning Lab 官方团队页列出当前博士后、博士生及其共同导师。",
    sources.jeannette,
  ),
  "monica-lam-stanford": enhancement(
    "本人 Stanford 主页明确列出当前博士生与历届博士毕业生，形成从编译器到 OVAL/LLM agents 的跨代培养记录。",
    sources.monica,
  ),
  "dorsa-sadigh-stanford": enhancement(
    "ILIAD 官方团队页逐人列出当前博士生、共同导师，以及博士生和博士后校友的下一站。",
    sources.dorsa,
  ),
  "jure-leskovec-lineage": enhancement(
    "SNAP 官方团队页列出 Michael Bereket、Jared Quincy Davis、Kexin Huang 等当前博士生，为既有 downstream 师承边补充一手当前团队记录。",
    sources.jure,
  ),
};

const member = (
  teacherId: keyof typeof stanfordInfluencePendingPersonEnhancements,
  slug: string,
  name: string,
  role: string,
  rosterSource: Source,
): GroupMember => ({
  id: `stanford-influence-2026-${teacherId}-${slug}`,
  teacherId,
  name,
  role,
  source: rosterSource,
});

export const stanfordInfluencePendingGroupMembers: GroupMember[] = [
  member("azalia-mirhoseini-stanford", "jon-saad-falcon", "Jon Saad-Falcon", "Doctoral dissertation advisee", sources.azalia),
  member("azalia-mirhoseini-stanford", "hermann-kumbong", "Hermann Kumbong", "Doctoral dissertation co-advisee", sources.azalia),
  member("azalia-mirhoseini-stanford", "yuzhen-mao", "Yuzhen Mao", "Doctoral dissertation co-advisee", sources.azalia),

  member("karen-liu-stanford", "joao-araujo", "Joao Araujo", "Doctoral dissertation advisee", sources.karen),
  member("karen-liu-stanford", "tyler-lum", "Tyler Lum", "Doctoral dissertation advisee", sources.karen),
  member("karen-liu-stanford", "keenon-werling", "Keenon Werling", "Doctoral dissertation advisee", sources.karen),

  member("chris-re-stanford", "yasa-baig", "Yasa Baig", "Current PhD student · co-advised with Stephen Quake", sources.chris),
  member("chris-re-stanford", "nasim-borazjanizadeh", "Nasim Borazjanizadeh", "Current PhD student", sources.chris),
  member("chris-re-stanford", "catherine-deng", "Catherine Deng", "Current PhD student", sources.chris),

  member("dan-yamins-stanford", "klemen-kotar", "Klemen Kotar", "Current PhD student · jointly advised with Jiajun Wu", sources.dan),
  member("dan-yamins-stanford", "wanhee-lee", "Wanhee Lee", "Current PhD student", sources.dan),
  member("dan-yamins-stanford", "yash-shah", "Yash Shah", "Current PhD student", sources.dan),

  member("jeannette-bohg-stanford", "jingyun-yang", "Jingyun Yang", "Current PhD student", sources.jeannette),
  member("jeannette-bohg-stanford", "carlota-pares", "Carlota Pares", "Current PhD student", sources.jeannette),
  member("jeannette-bohg-stanford", "ria-doshi", "Ria Doshi", "Current PhD student", sources.jeannette),

  member("monica-lam-stanford", "yucheng-jiang", "Yucheng Jiang", "Current PhD student", sources.monica),
  member("monica-lam-stanford", "harshit-joshi", "Harshit Joshi", "Current PhD student", sources.monica),
  member("monica-lam-stanford", "shicheng-liu", "Shicheng Liu", "Current PhD student", sources.monica),

  member("dorsa-sadigh-stanford", "megha-srivastava", "Megha Srivastava", "Current PhD student · co-advised with Dan Boneh", sources.dorsa),
  member("dorsa-sadigh-stanford", "suvir-mirchandani", "Suvir Mirchandani", "Current PhD student", sources.dorsa),
  member("dorsa-sadigh-stanford", "hengyuan-hu", "Hengyuan Hu", "Current PhD student", sources.dorsa),

  member("jure-leskovec-lineage", "michael-bereket", "Michael Bereket", "Current PhD student", sources.jure),
  member("jure-leskovec-lineage", "jared-quincy-davis", "Jared Quincy Davis", "Current PhD student", sources.jure),
  member("jure-leskovec-lineage", "kexin-huang", "Kexin Huang", "Current PhD student", sources.jure),
];

// The eight people satisfy this audit through explicit first-party team/advising
// rosters. No ordinary co-authorship was promoted into a lineage edge.
export const stanfordInfluencePendingRelationships: Relationship[] = [];

export const enhancements = stanfordInfluencePendingPersonEnhancements;
export const relationships = stanfordInfluencePendingRelationships;
export const groupMembers = stanfordInfluencePendingGroupMembers;
