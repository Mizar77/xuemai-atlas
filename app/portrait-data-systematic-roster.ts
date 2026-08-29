import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-08-30";

function portrait(id: string, name: string, label: string, url: string, kind: "official" | "profile" = "official"): Portrait {
  return {
    src: `portraits/systematic-roster/${id}.jpg`,
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

export const systematicRosterPortraits: Record<string, Portrait> = {
  "tat-jen-cham-ntu": portrait("tat-jen-cham-ntu", "Tat-Jen Cham", "NTU GrAIL people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people"),
  "guosheng-lin-ntu": portrait("guosheng-lin-ntu", "Guosheng Lin", "NTU GrAIL people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people"),
  "shijian-lu-ntu": portrait("shijian-lu-ntu", "Shijian Lu", "NTU GrAIL people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people"),
  "eng-siong-chng-ntu": portrait("eng-siong-chng-ntu", "Eng Siong Chng", "NTU GrAIL people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people"),
  "hanwang-zhang-ntu": portrait("hanwang-zhang-ntu", "Hanwang Zhang", "NTU GrAIL people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people"),
  "boyang-li-ntu": portrait("boyang-li-ntu", "Boyang Li", "NTU GrAIL people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people"),
  "xingang-pan-ntu": portrait("xingang-pan-ntu", "Xingang Pan", "NTU GrAIL people", "https://www.ntu.edu.sg/computing/research/institutes-centres/grail/our-people"),
  "weisi-lin-ntu": portrait("weisi-lin-ntu", "Weisi Lin", "Weisi Lin NTU homepage", "https://www3.ntu.edu.sg/home/wslin/", "profile"),
  "yew-soon-ong-ntu": portrait("yew-soon-ong-ntu", "Yew-Soon Ong", "Yew-Soon Ong NTU homepage", "https://www3.ntu.edu.sg/home/asysong/home.html", "profile"),
  "cuntai-guan-ntu": portrait("cuntai-guan-ntu", "Cuntai Guan", "NTU S-Lab people", "https://www.ntu.edu.sg/s-lab/our-people"),
  "jie-zhang-ntu": portrait("jie-zhang-ntu", "Jie Zhang", "Jie Zhang NTU homepage", "https://personal.ntu.edu.sg/zhangj/main.html", "profile"),
  "yonggang-wen-ntu": portrait("yonggang-wen-ntu", "Yonggang Wen", "Yonggang Wen NTU homepage", "https://www3.ntu.edu.sg/home/ygwen/", "profile"),

  "xihui-liu-hku": portrait("xihui-liu-hku", "Xihui Liu", "HKU IDS faculty profile", "https://datascience.hku.hk/people/xihui-liu/"),
  "hongyang-li-hku": portrait("hongyang-li-hku", "Hongyang Li", "HKU IDS faculty profile", "https://datascience.hku.hk/people/hongyang-li/"),
  "bo-dai-hku": portrait("bo-dai-hku", "Bo Dai", "HKU IDS faculty profile", "https://datascience.hku.hk/people/bo-dai/"),
  "hengshuang-zhao-hku": portrait("hengshuang-zhao-hku", "Hengshuang Zhao", "Hengshuang Zhao HKU homepage", "https://i.cs.hku.hk/~hszhao/", "profile"),
  "dan-xu-hkust": portrait("dan-xu-hkust", "Dan Xu", "HKUST CSE faculty profile", "https://cse.hkust.edu.hk/admin/people/faculty/profile/danxu"),
  "anyi-rao-hkust": portrait("anyi-rao-hkust", "Anyi Rao", "HKUST research portal", "https://researchportal.hkust.edu.hk/en/persons/anyi-rao/"),
  "hao-chen-hkust": portrait("hao-chen-hkust", "Hao Chen", "HKUST research portal", "https://researchportal.hkust.edu.hk/en/persons/hao-chen/"),
  "yinghao-xu-hkust": portrait("yinghao-xu-hkust", "Yinghao Xu", "HKUST CSE faculty profile", "https://cse.hkust.edu.hk/admin/people/faculty/profile/justimyhxu"),
  "hongsheng-li-cuhk": portrait("hongsheng-li-cuhk", "Hongsheng Li", "CUHK MMLab people", "https://mmlab.ie.cuhk.edu.hk/people.html"),
  "tianfan-xue-cuhk": portrait("tianfan-xue-cuhk", "Tianfan Xue", "CUHK research portal", "https://research.cuhk.edu.hk/en/persons/tianfan-xue/"),
  "wanli-ouyang-cuhk": portrait("wanli-ouyang-cuhk", "Wanli Ouyang", "CUHK MMLab people", "https://mmlab.ie.cuhk.edu.hk/people.html"),
  "xiangyu-yue-cuhk": portrait("xiangyu-yue-cuhk", "Xiangyu Yue", "CUHK MMLab people", "https://mmlab.ie.cuhk.edu.hk/people.html"),

  "gao-wen-pku": portrait("gao-wen-pku", "高文", "Peking University faculty profile", "https://cs.pku.edu.cn/info/1236/2162.htm"),
  "hu-shimin-thu": portrait("hu-shimin-thu", "胡事民", "Tsinghua IIIS faculty profile", "https://iiis.tsinghua.edu.cn/en/People/Adjunct_Instructors/HuShimin.htm"),

  "chelsea-finn-us": portrait("chelsea-finn-us", "Chelsea Finn", "Chelsea Finn Stanford homepage", "https://ai.stanford.edu/~cbfinn/", "profile"),
  "stefano-ermon-us": portrait("stefano-ermon-us", "Stefano Ermon", "Stefano Ermon Stanford homepage", "https://cs.stanford.edu/~ermon/", "profile"),
  "pieter-abbeel-us": portrait("pieter-abbeel-us", "Pieter Abbeel", "UC Berkeley Bakar Fellows profile", "https://bakarfellows.berkeley.edu/profile/pieter-abbeel/"),
  "sergey-levine-us": portrait("sergey-levine-us", "Sergey Levine", "UC Berkeley Simons Institute profile", "https://simons.berkeley.edu/people/sergey-levine"),
  "pulkit-agrawal-us": portrait("pulkit-agrawal-us", "Pulkit Agrawal", "Pulkit Agrawal MIT homepage", "https://people.csail.mit.edu/pulkitag/", "profile"),
  "ruslan-salakhutdinov-us": portrait("ruslan-salakhutdinov-us", "Ruslan Salakhutdinov", "Ruslan Salakhutdinov CMU homepage", "https://www.cs.cmu.edu/~rsalakhu/", "profile"),
};
