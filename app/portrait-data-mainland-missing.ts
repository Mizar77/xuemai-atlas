import type { Person } from "./data";

type Portrait = NonNullable<Person["portrait"]>;

export const mainlandMissingPortraits: Record<string, Portrait> = {
  "feng-yang-nju": {
    src: "portraits/mainland-missing/feng-yang-nju.jpg",
    alt: "冯洋肖像",
    source: { label: "冯洋个人主页", url: "https://fengyang-nju.github.io/", kind: "profile", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "heyan-huang-bit": {
    src: "portraits/mainland-missing/heyan-huang-bit.jpg",
    alt: "黄河燕肖像",
    source: { label: "北京理工大学计算机学院教师主页", url: "https://cs.bit.edu.cn/szdw/jsml/bssds/172f42bb4b8742ce8d91e88e2680b0b0.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "dawei-song-bit": {
    src: "portraits/mainland-missing/dawei-song-bit.jpg",
    alt: "宋大为肖像",
    source: { label: "北京理工大学计算机学院教师主页", url: "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/0fc03ac63f2e4a1a9f0f9fb63c83e633.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "kan-li-bit": {
    src: "portraits/mainland-missing/kan-li-bit.jpg",
    alt: "李侃肖像",
    source: { label: "北京理工大学计算机学院教师主页", url: "https://cs.bit.edu.cn/szdw/jsml2/yyznyskjsyjs2/ccd1cee89da749eaaf31fde0c96b2163.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "yanlin-wang-sysu": {
    src: "portraits/mainland-missing/yanlin-wang-sysu.jpg",
    alt: "王焱林肖像",
    source: { label: "中山大学软件工程学院教师主页", url: "https://sse.sysu.edu.cn/teacher/329", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "hai-wan-sysu": {
    src: "portraits/mainland-missing/hai-wan-sysu.jpg",
    alt: "万海肖像",
    source: { label: "万海个人主页", url: "https://sysuwanhai.github.io/", kind: "profile", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "min-peng-whu": {
    src: "portraits/mainland-missing/min-peng-whu.jpg",
    alt: "彭敏肖像",
    source: { label: "武汉大学教师主页", url: "https://jszy.whu.edu.cn/pengmin/zh_CN/zhym/166810/list/index.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "tieyun-qian-whu": {
    src: "portraits/mainland-missing/tieyun-qian-whu.jpg",
    alt: "钱铁云肖像",
    source: { label: "武汉大学教师主页", url: "https://jszy.whu.edu.cn/qiantieyun/en/index/236186/list/index.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "fei-li-whu": {
    src: "portraits/mainland-missing/fei-li-whu.jpg",
    alt: "李霏肖像",
    source: { label: "武汉大学教师主页", url: "https://jszy.whu.edu.cn/lifei10/zh_CN/index.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "jun-zhu-thu": {
    src: "portraits/mainland-missing/jun-zhu-thu.jpg",
    alt: "朱军肖像",
    source: { label: "清华大学计算机科学与技术系", url: "https://www.cs.tsinghua.edu.cn/info/1088/6442.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "junliang-xing-thu": {
    src: "portraits/mainland-missing/junliang-xing-thu.jpg",
    alt: "邢军亮肖像",
    source: { label: "清华大学精密仪器系研究组成员页", url: "https://pi.cs.tsinghua.edu.cn/lab/people/jlxing/en/", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "boxin-shi-pku": {
    src: "portraits/mainland-missing/boxin-shi-pku.jpg",
    alt: "施柏鑫肖像",
    source: { label: "北京大学计算机学院教师主页", url: "https://cs.pku.edu.cn/info/1089/1812.htm", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "tieniu-tan-cas": {
    src: "portraits/mainland-missing/tieniu-tan-cas.jpg",
    alt: "谭铁牛肖像",
    source: { label: "中国科学院自动化研究所主页", url: "https://ia.cas.cn/rcdw/jcqn/202404/t20240422_7129881.html", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "liang-wang-cas": {
    src: "portraits/mainland-missing/liang-wang-cas.jpg",
    alt: "王亮肖像",
    source: { label: "中国科学院自动化研究所主页", url: "https://ia.cas.cn/rcdw/yjy/202404/t20240422_7129880.html", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
  "zhenan-sun-cas": {
    src: "portraits/mainland-missing/zhenan-sun-cas.jpg",
    alt: "孙哲南肖像",
    source: { label: "中国科学院自动化研究所主页", url: "https://ia.cas.cn/rcdw/qch/202404/t20240422_7129879.html", kind: "official", checkedAt: "2026-08-29", supports: "Portrait and identity" },
  },
};
