import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-09-01";

const portrait = (
  id: string,
  name: string,
  label: string,
  url: string,
  kind: "official" | "profile" = "official",
): Portrait => ({
  src: `portraits/network-expansion/${id}.jpg`,
  alt: `Portrait of ${name}`,
  source: {
    label,
    url,
    kind,
    checkedAt,
    supports: `Portrait identity for ${name}`,
  },
});

/**
 * Portraits for the Goodfellow/Mila, Western foundational, and Asian senior
 * network expansions. Every asset was checked against the cited first-party
 * page and cropped locally from a single-person image.
 */
export const networkExpansionPortraits: Record<string, Portrait> = {
  "yann-dauphin-mila-network": portrait("yann-dauphin-mila-network", "Yann N. Dauphin", "Google Research profile", "https://research.google/people/106804/"),
  "nicolas-le-roux-mila-network": portrait("nicolas-le-roux-mila-network", "Nicolas Le Roux", "Mila directory", "https://mila.quebec/en/directory/nicolas-le-roux?page=0%2C0"),
  "dzmitry-bahdanau-mila-network": portrait("dzmitry-bahdanau-mila-network", "Dzmitry Bahdanau", "Mila directory", "https://mila.quebec/en/directory/dzmitry-bahdanau"),
  "rishabh-agarwal-mila-network": portrait("rishabh-agarwal-mila-network", "Rishabh Agarwal", "Mila directory", "https://mila.quebec/en/directory/rishabh-agarwal?page=0%2C1"),
  "marc-bellemare-mila-network": portrait("marc-bellemare-mila-network", "Marc G. Bellemare", "Mila directory", "https://mila.quebec/en/directory/marc-gendron-bellemare?page=0%2C0"),
  "joan-bresnan-foundational": portrait("joan-bresnan-foundational", "Joan Bresnan", "Stanford academic homepage", "https://web.stanford.edu/~bresnan/bio/index.html", "profile"),
  "rina-dechter-foundational": portrait("rina-dechter-foundational", "Rina Dechter", "UC Irvine faculty associate profile", "https://its.uci.edu/people/rina-dechter/"),
  "elias-bareinboim-foundational": portrait("elias-bareinboim-foundational", "Elias Bareinboim", "Columbia CausalAI Lab homepage", "https://www.causalai.net/", "profile"),
  "adnan-darwiche-foundational": portrait("adnan-darwiche-foundational", "Adnan Darwiche", "UCLA academic homepage", "https://web.cs.ucla.edu/~darwiche/", "profile"),
  "deepak-pathak-foundational": portrait("deepak-pathak-foundational", "Deepak Pathak", "CMU academic homepage", "https://www.cs.cmu.edu/~dpathak/", "profile"),
  "dinesh-jayaraman-foundational": portrait("dinesh-jayaraman-foundational", "Dinesh Jayaraman", "Penn AI faculty directory", "https://ai.upenn.edu/ai-foundations"),
  "shaoping-ma-thu": portrait("shaoping-ma-thu", "马少平", "清华大学计算机系教师主页", "https://www.cs.tsinghua.edu.cn/info/1121/3556.htm"),
  "biqing-huang-thu": portrait("biqing-huang-thu", "黄必清", "清华大学自动化系教师主页", "https://www.au.tsinghua.edu.cn/info/1092/1519.htm"),
  "ruihua-song-ruc": portrait("ruihua-song-ruc", "宋睿华", "中国人民大学高瓴人工智能学院教师主页", "https://ai.ruc.edu.cn/academicfaculty/szdwn/srh/index.htm"),
  "zibin-zheng-sysu": portrait("zibin-zheng-sysu", "郑子彬", "中山大学软件工程学院教师主页", "https://sse.sysu.edu.cn/node/100"),
  "kaizhu-huang-dku": portrait("kaizhu-huang-dku", "黄开竹", "昆山杜克大学教师主页", "https://faculty.dukekunshan.edu.cn/zh-hans/faculty_profiles/huangkaizhu"),
  "pinjia-he-cuhksz": portrait("pinjia-he-cuhksz", "贺品嘉", "贺品嘉课题组主页", "https://pinjiahe.github.io/team/", "profile"),
  "lizi-liao-smu": portrait("lizi-liao-smu", "Lizi Liao", "Lizi Liao academic homepage", "https://liziliao.github.io/", "profile"),
  "zhijiang-guo-hkustgz": portrait("zhijiang-guo-hkustgz", "郭志江", "Zhijiang Guo academic homepage", "https://cartus.github.io/", "profile"),
};
