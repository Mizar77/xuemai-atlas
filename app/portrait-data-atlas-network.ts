import type { Person } from "./data";

const checkedAt = "2026-09-01";

const portrait = (
  id: string,
  name: string,
  label: string,
  url: string,
): NonNullable<Person["portrait"]> => ({
  src: `portraits/atlas-network/${id}.jpg`,
  alt: `${name} portrait`,
  source: {
    label,
    url,
    kind: label.includes("University") || label.includes("HKU") || label.includes("UT Austin") ? "official" : "profile",
    checkedAt,
    supports: `${name} 本人头像；已下载原图、裁为 512×512，并完成人工身份与构图核验`,
  },
});

export const atlasNetworkPortraits: Record<string, NonNullable<Person["portrait"]>> = {
  "guoliang-kang-buaa-atlas": portrait("guoliang-kang-buaa-atlas", "康国梁", "Guoliang Kang academic homepage", "https://kgl-prml.github.io/"),
  "wuyang-chen-sfu-atlas": portrait("wuyang-chen-sfu-atlas", "Wuyang Chen", "Wuyang Chen academic homepage", "https://chenwydj.github.io/"),
  "tianlong-chen-unc-atlas": portrait("tianlong-chen-unc-atlas", "Tianlong Chen", "Tianlong Chen academic homepage", "https://tianlong-chen.github.io/"),
  "shiwei-liu-ellis-atlas": portrait("shiwei-liu-ellis-atlas", "Shiwei Liu", "Shiwei Liu academic homepage", "https://shiweiliuiiiiiii.github.io/"),
  "yuning-you-cuhksz-atlas": portrait("yuning-you-cuhksz-atlas", "Yuning You", "Yuning You academic homepage", "https://yyou1996.github.io/"),
  "ziwei-yang-hku-atlas": portrait("ziwei-yang-hku-atlas", "Ziwei Yang", "HKU Department of Microbiology · Ziwei Yang", "https://hkumicro.hku.hk/university-staff/dr-yang-ziwei/"),
  "junyuan-hong-nus-atlas": portrait("junyuan-hong-nus-atlas", "Junyuan Hong", "Junyuan Hong academic homepage", "https://jyhong.gitlab.io/"),
  "zhiwen-fan-tamu-atlas": portrait("zhiwen-fan-tamu-atlas", "Zhiwen Fan", "Texas A&M University Engineering · Zhiwen Fan", "https://engineering.tamu.edu/electrical/profiles/fan-zhiwen.html"),
  "gregory-holste-cornell-atlas": portrait("gregory-holste-cornell-atlas", "Gregory Holste", "Gregory Holste academic homepage", "https://www.gholste.me/"),
  "neel-bhatt-utd-atlas": portrait("neel-bhatt-utd-atlas", "Neel P. Bhatt", "Neel P. Bhatt academic homepage", "https://neel1302.github.io/"),
  "yang-shen-tamu-atlas-audit": portrait("yang-shen-tamu-atlas-audit", "Yang Shen", "Texas A&M University Engineering · Yang Shen", "https://engineering.tamu.edu/electrical/profiles/shen-yang.html"),
  "philipp-krahenbuhl-ut-atlas-audit": portrait("philipp-krahenbuhl-ut-atlas-audit", "Philipp Krähenbühl", "UT Austin Computer Science · Philipp Krähenbühl", "https://www.cs.utexas.edu/people/faculty-researchers/philipp-krahenbuhl"),
};
