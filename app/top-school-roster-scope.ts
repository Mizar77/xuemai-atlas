import type { Region } from "./data";

export type TopSchoolUnit = {
  name: string;
  url: string;
};

export type TopSchoolRosterScope = {
  region: Region;
  rank: number;
  institution: string;
  kind: "university" | "research_unit";
  units: TopSchoolUnit[];
  selectionNote?: string;
};

const unit = (name: string, url: string): TopSchoolUnit => ({ name, url });
const school = (
  region: Region,
  rank: number,
  institution: string,
  units: TopSchoolUnit[],
  selectionNote?: string,
): TopSchoolRosterScope => ({ region, rank, institution, kind: "university", units, selectionNote });

/**
 * Institution-first roster scope, reviewed 2026-09-02.
 *
 * The ordering is an audit priority rather than a claim that one universal league
 * table can rank every AI/CS department.  The US, Mainland China and Europe lists
 * start from 2023–2026 CSRankings AI-area publication output and are cross-checked
 * against the QS 2026 Computer Science subject table.  Hong Kong uses the same
 * publication lens for its six research-active CS departments, then covers four
 * additional universities.  Singapore has fewer than ten research universities;
 * the last four entries are therefore labelled research units, not universities.
 */
export const topSchoolRosterScope: TopSchoolRosterScope[] = [
  school("United States", 1, "Carnegie Mellon University", [unit("School of Computer Science", "https://www.cs.cmu.edu/directory/all")]),
  school("United States", 2, "University of Illinois Urbana-Champaign", [unit("Siebel School of Computing and Data Science", "https://siebelschool.illinois.edu/about/people/all-faculty"), unit("Electrical and Computer Engineering", "https://ece.illinois.edu/about/directory/faculty")]),
  school("United States", 3, "Stanford University", [unit("Computer Science", "https://www.cs.stanford.edu/people/faculty"), unit("Electrical Engineering", "https://ee.stanford.edu/people/faculty"), unit("Stanford AI Lab", "https://ai.stanford.edu/faculty/")]),
  school("United States", 4, "Massachusetts Institute of Technology", [unit("EECS / CSAIL", "https://www.csail.mit.edu/people?roleFacets=Principal%20Investigators%2CCore%2FDual%2CAssociates%2CEmeritus")]),
  school("United States", 5, "University of California, Berkeley", [unit("EECS", "https://www2.eecs.berkeley.edu/Faculty/Lists/CS/faculty.html"), unit("Berkeley AI Research", "https://bair.berkeley.edu/people/faculty.html")]),
  school("United States", 6, "University of Maryland, College Park", [unit("Computer Science", "https://www.cs.umd.edu/people/faculty"), unit("UMIACS", "https://www.umiacs.umd.edu/our-experts/faculty")]),
  school("United States", 7, "University of California, San Diego", [unit("Computer Science and Engineering", "https://cse.ucsd.edu/people/faculty-profiles"), unit("Electrical and Computer Engineering", "https://ece.ucsd.edu/people/faculty")]),
  school("United States", 8, "Georgia Institute of Technology", [unit("College of Computing", "https://www.cc.gatech.edu/people/faculty"), unit("School of Interactive Computing", "https://ic.gatech.edu/people/faculty")]),
  school("United States", 9, "Johns Hopkins University", [unit("Computer Science", "https://www.cs.jhu.edu/faculty/"), unit("Center for Language and Speech Processing", "https://www.clsp.jhu.edu/faculty/")]),
  school("United States", 10, "University of Pennsylvania", [unit("Computer and Information Science", "https://www.cis.upenn.edu/faculty/"), unit("GRASP Laboratory", "https://www.grasp.upenn.edu/role/faculty/")]),
  school("United States", 11, "University of Wisconsin–Madison", [unit("Computer Sciences", "https://www.cs.wisc.edu/people/faculty-2/")]),
  school("United States", 12, "University of Texas at Austin", [unit("Computer Science", "https://www.cs.utexas.edu/people"), unit("Electrical and Computer Engineering", "https://www.ece.utexas.edu/people/faculty")]),
  school("United States", 13, "Cornell University", [unit("Computer Science", "https://www.cs.cornell.edu/directory?department=15"), unit("Cornell Tech faculty", "https://tech.cornell.edu/people/faculty/")]),
  school("United States", 14, "University of California, Los Angeles", [unit("Computer Science", "https://samueli.ucla.edu/search-faculty/#cs"), unit("Electrical and Computer Engineering", "https://samueli.ucla.edu/search-faculty/#ece")]),
  school("United States", 15, "New York University", [unit("Computer Science", "https://cs.nyu.edu/dynamic/people/faculty/"), unit("Center for Data Science", "https://cds.nyu.edu/people/faculty/")]),
  school("United States", 16, "Purdue University", [unit("Computer Science", "https://www.cs.purdue.edu/people/faculty/index.html")]),
  school("United States", 17, "University of Washington", [unit("Paul G. Allen School", "https://www.cs.washington.edu/people/faculty-members/"), unit("Electrical and Computer Engineering", "https://www.ece.uw.edu/faculty/")]),
  school("United States", 18, "University of Michigan", [unit("Computer Science and Engineering", "https://cse.engin.umich.edu/people/faculty/"), unit("Robotics", "https://robotics.umich.edu/people/faculty/")]),
  school("United States", 19, "University of Southern California", [unit("Thomas Lord Department of Computer Science", "https://www.cs.usc.edu/faculty/"), unit("Information Sciences Institute", "https://www.isi.edu/affiliated-faculty-scientists/")]),
  school("United States", 20, "University of Virginia", [unit("Computer Science", "https://engineering.virginia.edu/department/computer-science/people")]),

  school("Mainland China", 1, "清华大学", [unit("计算机科学与技术系", "https://www.cs.tsinghua.edu.cn/csen/Faculty/Full_time_Faculty.htm"), unit("自动化系", "https://www.au.tsinghua.edu.cn/szdw/jsdw1/ayjscz.htm"), unit("智能产业研究院", "https://air.tsinghua.edu.cn/airtd/yjtd.htm")]),
  school("Mainland China", 2, "北京大学", [unit("计算机学院", "https://cs.pku.edu.cn/szdw/jyxl/amz/ALL.htm"), unit("智能学院", "https://www.cis.pku.edu.cn/szdw/zzjs.htm")]),
  school("Mainland China", 3, "上海交通大学", [unit("计算机学院", "https://www.cs.sjtu.edu.cn/jiaoshiml.html"), unit("人工智能学院", "https://sai.sjtu.edu.cn/cn/faculty/zzjs")], "同时核对计算机、人工智能与电子信息相关导师"),
  school("Mainland China", 4, "浙江大学", [unit("计算机科学与技术学院", "http://www.cs.zju.edu.cn/csen/27003/list.htm"), unit("控制科学与工程学院", "http://www.cse.zju.edu.cn/39568/list.htm")]),
  school("Mainland China", 5, "南京大学", [unit("计算机学院", "https://cs.nju.edu.cn/1651/list.htm"), unit("人工智能学院", "https://ai.nju.edu.cn/people/list.htm")]),
  school("Mainland China", 6, "中国科学技术大学", [unit("计算机科学与技术学院", "https://cs.ustc.edu.cn/zgj_23225/list.htm"), unit("人工智能与数据科学学院", "https://saids.ustc.edu.cn/szdw/list.htm")]),
  school("Mainland China", 7, "哈尔滨工业大学", [unit("计算学部", "https://computing.hit.edu.cn/jsml/list.htm"), unit("人工智能研究院", "https://ai.hit.edu.cn/12789/list.htm")]),
  school("Mainland China", 8, "中国科学院大学 / 中国科学院", [unit("计算技术研究所", "https://ict.cas.cn/yjdw/"), unit("自动化研究所", "https://ia.cas.cn/rcdw/")], "研究机构联合培养与国科大导师体系"),
  school("Mainland China", 9, "中国人民大学", [unit("信息学院", "https://info.ruc.edu.cn/jsky/szdw/ajxjgcx/bx/bx1/index.htm"), unit("高瓴人工智能学院", "https://ai.ruc.edu.cn/academicfaculty/szdwn/index.htm")]),
  school("Mainland China", 10, "复旦大学", [unit("计算与智能创新学院教师名录", "https://cs.fudan.edu.cn/50021/list.htm"), unit("人工智能创新与产业研究院人才队伍", "https://ai3.fudan.edu.cn/rcdw/qzkyry.htm")]),
  school("Mainland China", 11, "武汉大学", [unit("计算机学院", "https://cs.whu.edu.cn/szdw/zrjs.htm"), unit("人工智能学院", "https://sai.whu.edu.cn/teacher/zzjs/jxx.htm")]),
  school("Mainland China", 12, "电子科技大学", [unit("计算机科学与工程学院（网络空间安全学院）", "https://faculty.uestc.edu.cn/xylb.jsp?id=2031&lang=zh_CN&st=0&urltype=tsites.CollegeTeacherList&wbtreeid=1035")]),
  school("Mainland China", 13, "东南大学", [unit("计算机科学与工程学院 / 软件学院 / 人工智能学院", "https://cse.seu.edu.cn/szdw_48203/list.htm")]),
  school("Mainland China", 14, "中山大学", [unit("计算机学院", "https://cse.sysu.edu.cn/teacher"), unit("人工智能学院", "https://sai.sysu.edu.cn/teachers")]),
  school("Mainland China", 15, "北京航空航天大学", [unit("计算机学院", "https://scse.buaa.edu.cn/szdw/qtjs.htm"), unit("人工智能学院", "https://iai.buaa.edu.cn/szdw.htm")]),
  school("Mainland China", 16, "香港中文大学（深圳）", [unit("数据科学学院", "https://sds.cuhk.edu.cn/teacher-search")]),
  school("Mainland China", 17, "北京邮电大学", [unit("计算机学院", "https://scs.bupt.edu.cn/szdw/jsml.htm"), unit("人工智能学院", "https://ai.bupt.edu.cn/szdw.htm")]),
  school("Mainland China", 18, "深圳大学", [unit("计算机与软件学院", "https://csse.szu.edu.cn/pages/user/index"), unit("人工智能学院完整师资", "https://ai.szu.edu.cn/szdw/js.htm")]),
  school("Mainland China", 19, "华中科技大学", [unit("计算机科学与技术学院", "https://cs.hust.edu.cn/szdw/js.htm"), unit("人工智能与自动化学院", "https://aia.hust.edu.cn/szdw.htm"), unit("软件学院", "https://sse.hust.edu.cn/szdw.htm")]),
  school("Mainland China", 20, "南开大学", [unit("计算机学院 / 网络空间安全学院", "https://cc.nankai.edu.cn/szdw/list.htm"), unit("人工智能学院", "https://ai.nankai.edu.cn/szdw/list.htm")]),

  school("Europe", 1, "Technical University of Munich", [unit("School of Computation, Information and Technology", "https://www.cit.tum.de/en/cit/school/people/professors/")]),
  school("Europe", 2, "EPFL", [unit("School of Computer and Communication Sciences", "https://www.epfl.ch/schools/ic/about/faculty-members/")]),
  school("Europe", 3, "ETH Zurich", [unit("Department of Computer Science", "https://inf.ethz.ch/people/faculty.html")]),
  school("Europe", 4, "University of Edinburgh", [unit("School of Informatics", "https://informatics.ed.ac.uk/people/academic-staff")]),
  school("Europe", 5, "University of Cambridge", [unit("Department of Computer Science and Technology", "https://www.cst.cam.ac.uk/people/directory/faculty?lang=en")]),
  school("Europe", 6, "Imperial College London", [unit("Department of Computing", "https://www.imperial.ac.uk/computing/people/academic-staff/")]),
  school("Europe", 7, "University of Oxford", [unit("Department of Computer Science", "https://www.cs.ox.ac.uk/people/faculty.html")]),
  school("Europe", 8, "University of Amsterdam", [unit("Informatics Institute", "https://ivi.uva.nl/people/academic-staff/academic-staff.html")]),
  school("Europe", 9, "University of Tübingen", [unit("Department of Computer Science / Tübingen AI Center", "https://uni-tuebingen.de/en/157455")]),
  school("Europe", 10, "TU Darmstadt", [unit("Department of Computer Science", "https://www.informatik.tu-darmstadt.de/fachbereich/organisation/index.en.jsp")]),
  school("Europe", 11, "University of Surrey", [unit("School of Computer Science and Electronic Engineering", "https://www.surrey.ac.uk/school-computer-science-electronic-engineering/people"), unit("Centre for Vision, Speech and Signal Processing", "https://www.surrey.ac.uk/centre-vision-speech-signal-processing/people"), unit("Institute for People-Centred AI", "https://www.surrey.ac.uk/artificial-intelligence/people")]),
  school("Europe", 12, "University of Copenhagen", [unit("Department of Computer Science", "https://di.ku.dk/english/staff/?pure=en/persons")]),
  school("Europe", 13, "University College London", [unit("Department of Computer Science", "https://www.ucl.ac.uk/computer-science/people/academic-and-research-staff")]),
  school("Europe", 14, "LMU Munich", [unit("Institute for Informatics / Center for Information and Language Processing", "https://www.ifi.lmu.de/institut/index.html")]),
  school("Europe", 15, "TU Wien", [unit("Faculty of Informatics", "https://informatics.tuwien.ac.at/people/professors")]),
  school("Europe", 16, "TU Delft", [unit("Faculty of Electrical Engineering, Mathematics and Computer Science", "https://www.tudelft.nl/en/eemcs/the-faculty/departments")]),
  school("Europe", 17, "Sapienza University of Rome", [unit("Department of Computer, Control and Management Engineering", "https://www.diag.uniroma1.it/en/people/faculty")]),
  school("Europe", 18, "Karlsruhe Institute of Technology", [unit("Department of Informatics", "https://www.informatik.kit.edu/english/people.php"), unit("Computer Vision for Human-Computer Interaction", "https://cvhci.iar.kit.edu/people.php")]),
  school("Europe", 19, "University of Manchester", [unit("Department of Computer Science", "https://www.cs.manchester.ac.uk/about/people/academic-and-research-staff/"), unit("National Centre for Text Mining", "https://www.nactem.ac.uk/staff/")]),
  school("Europe", 20, "Aalto University", [unit("Department of Computer Science", "https://www.aalto.fi/en/department-of-computer-science/people"), unit("Machine Learning, Data Science and Artificial Intelligence", "https://www.aalto.fi/en/department-of-computer-science/machine-learning-data-science-and-artificial-intelligence")]),

  school("Hong Kong", 1, "香港科技大学", [unit("Computer Science and Engineering", "https://cse.hkust.edu.hk/admin/people/faculty")]),
  school("Hong Kong", 2, "香港中文大学", [unit("Computer Science and Engineering", "https://www.cse.cuhk.edu.hk/people/faculty/"), unit("Electronic Engineering", "https://www.ee.cuhk.edu.hk/en-gb/people/academic-staff")]),
  school("Hong Kong", 3, "香港大学", [unit("School of Computing and Data Science", "https://www.cs.hku.hk/people/academic-staff"), unit("Electrical and Computer Engineering", "https://ece.hku.hk/people/")]),
  school("Hong Kong", 4, "香港城市大学", [unit("Department of Computer Science", "https://www.cs.cityu.edu.hk/people/academic-staff")]),
  school("Hong Kong", 5, "香港理工大学", [unit("Department of Computing", "https://www.polyu.edu.hk/comp/people/academic-staff/")]),
  school("Hong Kong", 6, "香港浸会大学", [unit("Department of Computer Science", "https://www.comp.hkbu.edu.hk/v1/?page=faculty")]),
  school("Hong Kong", 7, "香港教育大学", [unit("Department of Mathematics and Information Technology", "https://www.eduhk.hk/mit/en/people.php")], "交叉型 AI、学习科学与信息技术"),
  school("Hong Kong", 8, "岭南大学", [unit("School of Data Science", "https://scholars.ln.edu.hk/en/organisations/school-of-data-science/persons/"), unit("Division of Artificial Intelligence", "https://scholars.ln.edu.hk/en/organisations/division-of-artificial-intelligence/persons/")]),
  school("Hong Kong", 9, "香港都会大学", [unit("School of Science and Technology Key Staff", "https://www.hkmu.edu.hk/st/people/key-staff/")]),
  school("Hong Kong", 10, "香港恒生大学", [unit("Department of Computer Science", "https://www.hsu.edu.hk/en/schools-departments/school-of-decision-sciences/departments-2/computing/academic-staff/")]),

  school("Singapore", 1, "National University of Singapore", [unit("School of Computing Faculty", "https://www.comp.nus.edu.sg/about/faculty/")]),
  school("Singapore", 2, "Nanyang Technological University", [unit("College of Computing and Data Science Faculty Directory", "https://www.ntu.edu.sg/computing/our-faculty/faculty-at-ccds")]),
  school("Singapore", 3, "Singapore Management University", [unit("College of Integrative Studies / School of Computing and Information Systems", "https://computing.smu.edu.sg/faculty")]),
  school("Singapore", 4, "Singapore University of Technology and Design", [unit("Information Systems Technology and Design", "https://www.sutd.edu.sg/istd/people/faculty"), unit("Artificial and Augmented Intelligence", "https://www.sutd.edu.sg/istd/research/artificial-and-augmented-intelligence/")]),
  school("Singapore", 5, "Singapore Institute of Technology", [unit("Infocomm Technology", "https://www.singaporetech.edu.sg/directory/faculty")], "应用型 AI 与软件系统"),
  school("Singapore", 6, "Singapore University of Social Sciences", [unit("School of Science and Technology Faculty", "https://www.suss.edu.sg/academics/schools-college/faculty-listing?schools=school-of-science-and-technology")], "应用型计算与数据科学"),
  { region: "Singapore", rank: 7, institution: "A*STAR Institute for Infocomm Research", kind: "research_unit", units: [unit("I²R Research Divisions", "https://www.a-star.edu.sg/i2r/research-capabilities")], selectionNote: "国家研究机构；非大学" },
  { region: "Singapore", rank: 8, institution: "A*STAR Institute of High Performance Computing", kind: "research_unit", units: [unit("Computing and Intelligence", "https://www.a-star.edu.sg/ihpc/research-capabilities")], selectionNote: "国家研究机构；非大学" },
  { region: "Singapore", rank: 9, institution: "A*STAR Centre for Frontier AI Research", kind: "research_unit", units: [unit("CFAR Management and Our Team", "https://www.a-star.edu.sg/cfar/about-cfar/our-team")], selectionNote: "国家 AI 研究中心；非大学" },
  { region: "Singapore", rank: 10, institution: "Duke-NUS Medical School", kind: "research_unit", units: [unit("DAISI Primary and Affiliated Faculty", "https://www.duke-nus.edu.sg/daisi/people/faculty")], selectionNote: "医学 AI 交叉单位" },
];

export const topSchoolSelectionSources = [
  {
    label: "CSRankings",
    url: "https://csrankings.org/",
    note: "以可复核的顶级会议论文记录形成院系审计优先级；本轮使用 2023–2026 AI 相关领域窗口。",
  },
  {
    label: "QS World University Rankings by Subject 2026: Computer Science & Information Systems",
    url: "https://www.topuniversities.com/university-subject-rankings/computer-science-information-systems",
    note: "用于交叉检查学校层级与地区覆盖，不把综合排名直接当作导师质量。",
  },
];

/** Short labels already used by the graph; kept separate from the public school name. */
export const topSchoolAtlasAliases: Record<string, string[]> = {
  "Carnegie Mellon University": ["CMU"],
  "University of Illinois Urbana-Champaign": ["UIUC"],
  "Stanford University": ["Stanford"],
  "Massachusetts Institute of Technology": ["MIT"],
  "University of California, Berkeley": ["Berkeley"],
  "University of Maryland, College Park": ["UMD"],
  "University of California, San Diego": ["UCSD"],
  "Georgia Institute of Technology": ["Georgia Tech"],
  "Johns Hopkins University": ["JHU"],
  "University of Pennsylvania": ["Penn"],
  "University of Wisconsin–Madison": ["Wisconsin", "UW–Madison", "UW-Madison"],
  "University of Texas at Austin": ["UT Austin"],
  "Cornell University": ["Cornell"],
  "University of California, Los Angeles": ["UCLA"],
  "New York University": ["NYU"],
  "Purdue University": ["Purdue"],
  "University of Washington": ["UW"],
  "University of Michigan": ["UMich"],
  "University of Southern California": ["USC"],
  "University of Virginia": ["UVA"],
  清华大学: ["THU"], 北京大学: ["PKU"], 上海交通大学: ["SJTU"], 浙江大学: ["ZJU"], 南京大学: ["NJU"],
  中国科学技术大学: ["USTC"], 电子科技大学: ["UESTC"], 哈尔滨工业大学: ["HIT"], "中国科学院大学 / 中国科学院": ["CAS-IA", "CAS"],
  中国人民大学: ["RUC"], 复旦大学: ["FDU"], 武汉大学: ["WHU"], 中山大学: ["SYSU"], 北京航空航天大学: ["BUAA"],
  "香港中文大学（深圳）": ["CUHK-Shenzhen"], 北京邮电大学: ["BUPT"], 深圳大学: ["SZU"], 东南大学: ["SEU"], 华中科技大学: ["HUST"], 南开大学: ["Nankai"],
  "Technical University of Munich": ["TUM"], EPFL: ["EPFL"], "ETH Zurich": ["ETH Zurich"],
  "University of Edinburgh": ["Edinburgh"], "University of Cambridge": ["Cambridge"], "University College London": ["UCL"],
  "University of Oxford": ["Oxford"], "University of Amsterdam": ["UvA"], "University of Tübingen": ["Tübingen/MPI"],
  "TU Darmstadt": ["TU Darmstadt"], "Sapienza University of Rome": ["Sapienza"], "Imperial College London": ["Imperial"],
  "TU Wien": ["TU Wien"], "TU Delft": ["TU Delft"],
  "University of Copenhagen": ["Copenhagen"], "LMU Munich": ["LMU"], "King's College London": ["KCL"], "Aalto University": ["Aalto"],
  "University of Surrey": ["Surrey"], "Karlsruhe Institute of Technology": ["KIT"], "University of Manchester": ["Manchester"],
  香港科技大学: ["HKUST"], 香港中文大学: ["CUHK"], 香港大学: ["HKU"], 香港城市大学: ["CityU"], 香港理工大学: ["PolyU"], 香港浸会大学: ["HKBU"], 香港教育大学: ["EdUHK"], 岭南大学: ["Lingnan"], 香港都会大学: ["HKMU"], 香港恒生大学: ["HSUHK"],
  "National University of Singapore": ["NUS"], "Nanyang Technological University": ["NTU"],
  "Singapore Management University": ["SMU"], "Singapore University of Technology and Design": ["SUTD"], "Singapore Institute of Technology": ["SIT"],
  "Singapore University of Social Sciences": ["SUSS"], "Duke-NUS Medical School": ["Duke-NUS"],
  "A*STAR Institute for Infocomm Research": ["A*STAR"], "A*STAR Institute of High Performance Computing": ["A*STAR"],
  "A*STAR Centre for Frontier AI Research": ["A*STAR"],
};
