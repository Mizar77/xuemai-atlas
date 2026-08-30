import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

const checkedAt = "2026-08-30";

export const lamdaPortraits: Record<string, Portrait> = {
  "wei-gao-lamda": {
    src: "portraits/lamda/wei-gao-lamda.jpg",
    alt: "高尉肖像",
    source: { label: "高尉 LAMDA 主页", url: "https://www.lamda.nju.edu.cn/gaow/", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
  "yuan-jiang-lamda": {
    src: "portraits/lamda/yuan-jiang-lamda.jpg",
    alt: "姜远肖像",
    source: { label: "姜远 LAMDA 主页", url: "https://www.lamda.nju.edu.cn/jiangy/", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
  "yu-feng-li-lamda": {
    src: "portraits/lamda/yu-feng-li-lamda.jpg",
    alt: "李宇峰肖像",
    source: { label: "李宇峰 LAMDA 主页", url: "https://www.lamda.nju.edu.cn/liyf/", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
  "chao-qian-lamda": {
    src: "portraits/lamda/chao-qian-lamda.jpg",
    alt: "钱超肖像",
    source: { label: "钱超 LAMDA 主页", url: "https://www.lamda.nju.edu.cn/qianc/", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
  "yang-yu-lamda": {
    src: "portraits/lamda/yang-yu-lamda.jpg",
    alt: "俞扬肖像",
    source: { label: "俞扬个人主页", url: "https://www.wolai.com/eyounx/dtR1MTyRXS5tP5Cex4KtdK", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
  "zongzhang-zhang-lamda": {
    src: "portraits/lamda/zongzhang-zhang-lamda.jpg",
    alt: "章宗长肖像",
    source: { label: "章宗长 LAMDA 主页", url: "https://www.lamda.nju.edu.cn/zhangzz/", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
  "dechuan-zhan-lamda": {
    src: "portraits/lamda/dechuan-zhan-lamda.jpg",
    alt: "詹德川肖像",
    source: { label: "腾讯高校合作 · 卓越导师名单", url: "https://ur.tencent.com/article/1462", kind: "company", checkedAt, supports: "Portrait and identity" },
  },
  "lijun-zhang-lamda": {
    src: "portraits/lamda/lijun-zhang-lamda.jpg",
    alt: "张利军肖像",
    source: { label: "张利军南京大学主页", url: "https://ai.nju.edu.cn/zlj/", kind: "official", checkedAt, supports: "Portrait and identity" },
  },
  "hanjia-ye-lamda": {
    src: "portraits/lamda/hanjia-ye-lamda.jpg",
    alt: "叶翰嘉肖像",
    source: { label: "叶翰嘉 LAMDA 主页", url: "https://www.lamda.nju.edu.cn/yehj/", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
  "peng-zhao-lamda": {
    src: "portraits/lamda/peng-zhao-lamda.jpg",
    alt: "赵鹏肖像",
    source: { label: "赵鹏 LAMDA 主页", url: "https://www.lamda.nju.edu.cn/zhaop/", kind: "profile", checkedAt, supports: "Portrait and identity" },
  },
};
