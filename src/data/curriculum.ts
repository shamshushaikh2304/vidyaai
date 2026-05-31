// ─────────────────────────────────────────────────────────────────────────────
// curriculum.ts  –  VidyaAI complete curriculum data
// ─────────────────────────────────────────────────────────────────────────────

export type BoardId =
  | "cbse"
  | "icse"
  | "maharashtra"
  | "karnataka"
  | "tamil_nadu"
  | "up_board";

export interface Board {
  id: BoardId;
  name: string;
  fullName: string;
  flag: string;
  accent: string;   // tailwind bg class
  border: string;   // tailwind border class
  description: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;   // hex
  description: string;
  isCore: boolean;
}

export interface ClassInfo {
  number: number;
  label: string;
  group: "Primary" | "Middle" | "Secondary" | "Senior Secondary";
}

// ─── BOARDS ──────────────────────────────────────────────────────────────────

export const BOARDS: Board[] = [
  {
    id: "cbse",
    name: "CBSE",
    fullName: "Central Board of Secondary Education",
    flag: "🏛️",
    accent: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/30",
    description: "National curriculum · Pan-India recognition · NCERT textbooks",
  },
  {
    id: "icse",
    name: "ICSE / ISC",
    fullName: "Council for the Indian School Certificate Examinations",
    flag: "📘",
    accent: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
    description: "English-focused · Detailed syllabus · Strong foundation",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    fullName: "Maharashtra State Board (SSC / HSC)",
    flag: "🟠",
    accent: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30",
    description: "State board · Marathi medium option · SSC & HSC exams",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    fullName: "Karnataka Secondary Education Examination Board",
    flag: "🔴",
    accent: "from-red-500/20 to-red-600/10",
    border: "border-red-500/30",
    description: "State board · Kannada medium · SSLC & PUC",
  },
  {
    id: "tamil_nadu",
    name: "Tamil Nadu",
    fullName: "Tamil Nadu State Board (TN Board)",
    flag: "🔵",
    accent: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30",
    description: "State board · Tamil medium option · Samacheer Kalvi",
  },
  {
    id: "up_board",
    name: "UP Board",
    fullName: "Uttar Pradesh Madhyamik Shiksha Parishad",
    flag: "🟢",
    accent: "from-green-500/20 to-green-600/10",
    border: "border-green-500/30",
    description: "State board · Hindi medium · Largest board in India",
  },
];

// ─── CLASSES ─────────────────────────────────────────────────────────────────

export const CLASSES: ClassInfo[] = [
  { number: 1,  label: "Class 1",  group: "Primary" },
  { number: 2,  label: "Class 2",  group: "Primary" },
  { number: 3,  label: "Class 3",  group: "Primary" },
  { number: 4,  label: "Class 4",  group: "Primary" },
  { number: 5,  label: "Class 5",  group: "Primary" },
  { number: 6,  label: "Class 6",  group: "Middle" },
  { number: 7,  label: "Class 7",  group: "Middle" },
  { number: 8,  label: "Class 8",  group: "Middle" },
  { number: 9,  label: "Class 9",  group: "Secondary" },
  { number: 10, label: "Class 10", group: "Secondary" },
  { number: 11, label: "Class 11", group: "Senior Secondary" },
  { number: 12, label: "Class 12", group: "Senior Secondary" },
];

// ─── SUBJECTS ────────────────────────────────────────────────────────────────

const SUBJECT_POOLS: Record<string, Subject> = {
  english:      { id:"english",      name:"English",          icon:"📖", color:"#FF6B35", description:"Language, literature & grammar",           isCore:true  },
  hindi:        { id:"hindi",        name:"Hindi",            icon:"🗣️", color:"#00C9A7", description:"भाषा, साहित्य और व्याकरण",                isCore:true  },
  maths:        { id:"maths",        name:"Mathematics",      icon:"🔢", color:"#845EC2", description:"Algebra, geometry & calculus",            isCore:true  },
  science:      { id:"science",      name:"Science",          icon:"🔬", color:"#2196F3", description:"Physics, chemistry & biology",            isCore:true  },
  evs:          { id:"evs",          name:"EVS",              icon:"🌿", color:"#4CAF50", description:"Environmental studies",                   isCore:true  },
  social:       { id:"social",       name:"Social Science",   icon:"🌍", color:"#FF9671", description:"History, civics & geography",             isCore:true  },
  sanskrit:     { id:"sanskrit",     name:"Sanskrit",         icon:"📜", color:"#9C27B0", description:"Classical language & literature",         isCore:false },
  french:       { id:"french",       name:"French",           icon:"🥐", color:"#3F51B5", description:"Language & communication",                isCore:false },
  computer:     { id:"computer",     name:"Computer Science", icon:"💻", color:"#607D8B", description:"Programming, logic & technology",         isCore:false },
  it:           { id:"it",           name:"Info. Technology", icon:"🖥️", color:"#00BCD4", description:"Digital skills & applications",          isCore:false },
  physics:      { id:"physics",      name:"Physics",          icon:"⚛️", color:"#2196F3", description:"Mechanics, optics, waves & more",        isCore:true  },
  chemistry:    { id:"chemistry",    name:"Chemistry",        icon:"🧪", color:"#00C9A7", description:"Organic, inorganic & physical chem",      isCore:true  },
  biology:      { id:"biology",      name:"Biology",          icon:"🌱", color:"#4CAF50", description:"Life sciences, anatomy & genetics",       isCore:true  },
  maths_adv:    { id:"maths_adv",    name:"Mathematics",      icon:"🔢", color:"#845EC2", description:"Calculus, vectors & probability",         isCore:true  },
  accounts:     { id:"accounts",     name:"Accountancy",      icon:"📊", color:"#FF6B35", description:"Financial accounting & GST",              isCore:true  },
  business:     { id:"business",     name:"Business Studies", icon:"🏢", color:"#00C9A7", description:"Management, marketing & finance",         isCore:true  },
  economics:    { id:"economics",    name:"Economics",        icon:"📈", color:"#845EC2", description:"Micro & macroeconomics",                  isCore:true  },
  history:      { id:"history",      name:"History",          icon:"🏺", color:"#FF6B35", description:"Ancient, medieval & modern India",        isCore:true  },
  polsci:       { id:"polsci",       name:"Political Science",icon:"🏛️", color:"#00C9A7", description:"Democracy, constitution & governance",   isCore:true  },
  geography:    { id:"geography",    name:"Geography",        icon:"🗺️", color:"#845EC2", description:"Physical & human geography",             isCore:true  },
  psychology:   { id:"psychology",   name:"Psychology",       icon:"🧠", color:"#4CAF50", description:"Behaviour, cognition & mental health",    isCore:false },
  sociology:    { id:"sociology",    name:"Sociology",        icon:"👥", color:"#FF9671", description:"Society, culture & social processes",     isCore:false },
  phys_ed:      { id:"phys_ed",      name:"Physical Education",icon:"🏃",color:"#FF5722", description:"Sports, fitness & health",               isCore:false },
  marathi:      { id:"marathi",      name:"Marathi",          icon:"📖", color:"#FF9671", description:"मराठी भाषा आणि साहित्य",                  isCore:true  },
  kannada:      { id:"kannada",      name:"Kannada",          icon:"📖", color:"#FF7043", description:"ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯ",              isCore:true  },
  tamil:        { id:"tamil",        name:"Tamil",            icon:"📖", color:"#26C6DA", description:"தமிழ் மொழி மற்றும் இலக்கியம்",           isCore:true  },
  urdu:         { id:"urdu",         name:"Urdu",             icon:"📖", color:"#AB47BC", description:"اردو زبان و ادب",                          isCore:false },
  entrepreneurship: { id:"entrepreneurship", name:"Entrepreneurship", icon:"💡", color:"#FFC107", description:"Business ideas & startup mindset", isCore:false },
};

// ─── SUBJECT MAP BY BOARD + CLASS ────────────────────────────────────────────

type SubjectMap = Record<BoardId, Record<number, string[]>>;

// Helper: shorthand subject arrays
const PRIMARY_FULL    = ["english","hindi","maths","evs","computer"];
const MIDDLE_CORE     = ["english","hindi","maths","science","social","sanskrit","computer"];
const SECONDARY_CORE  = ["english","hindi","maths","science","social","sanskrit","computer","it"];
const SCIENCE_STREAM  = ["physics","chemistry","maths_adv","biology","english","computer","phys_ed"];
const COMMERCE_STREAM = ["accounts","business","economics","maths_adv","english","entrepreneurship"];
const ARTS_STREAM     = ["history","polsci","geography","economics","english","psychology","sociology"];

const SUBJECT_MAP: SubjectMap = {
  cbse: {
    1: ["english","hindi","maths","evs"],
    2: ["english","hindi","maths","evs"],
    3: ["english","hindi","maths","evs"],
    4: ["english","hindi","maths","evs"],
    5: PRIMARY_FULL,
    6: MIDDLE_CORE,
    7: MIDDLE_CORE,
    8: MIDDLE_CORE,
    9: SECONDARY_CORE,
    10: SECONDARY_CORE,
    11: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM].filter((v,i,a)=>a.indexOf(v)===i),
    12: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM].filter((v,i,a)=>a.indexOf(v)===i),
  },
  icse: {
    1: ["english","hindi","maths","evs"],
    2: ["english","hindi","maths","evs"],
    3: ["english","hindi","maths","evs"],
    4: ["english","hindi","maths","evs","computer"],
    5: ["english","hindi","maths","evs","computer"],
    6: ["english","hindi","maths","science","history","geography","computer"],
    7: ["english","hindi","maths","science","history","geography","computer"],
    8: ["english","hindi","maths","science","history","geography","computer"],
    9: ["english","hindi","maths","physics","chemistry","biology","history","geography","computer"],
    10: ["english","hindi","maths","physics","chemistry","biology","history","geography","computer"],
    11: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM].filter((v,i,a)=>a.indexOf(v)===i),
    12: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM].filter((v,i,a)=>a.indexOf(v)===i),
  },
  maharashtra: {
    1: ["english","marathi","maths","evs"],
    2: ["english","marathi","maths","evs"],
    3: ["english","marathi","hindi","maths","evs"],
    4: ["english","marathi","hindi","maths","evs"],
    5: ["english","marathi","hindi","maths","evs","computer"],
    6: ["english","marathi","hindi","maths","science","social","computer"],
    7: ["english","marathi","hindi","maths","science","social","computer"],
    8: ["english","marathi","hindi","maths","science","social","computer"],
    9: ["english","marathi","hindi","maths","science","social","it"],
    10: ["english","marathi","hindi","maths","science","social","it"],
    11: [...SCIENCE_STREAM.map(s=>s==="english"?["english","marathi"]:s).flat(), ...COMMERCE_STREAM, ...ARTS_STREAM].filter((v,i,a)=>a.indexOf(v)===i),
    12: [...SCIENCE_STREAM.map(s=>s==="english"?["english","marathi"]:s).flat(), ...COMMERCE_STREAM, ...ARTS_STREAM].filter((v,i,a)=>a.indexOf(v)===i),
  },
  karnataka: {
    1: ["english","kannada","maths","evs"],
    2: ["english","kannada","maths","evs"],
    3: ["english","kannada","hindi","maths","evs"],
    4: ["english","kannada","hindi","maths","evs"],
    5: ["english","kannada","hindi","maths","evs","computer"],
    6: ["english","kannada","hindi","maths","science","social","computer"],
    7: ["english","kannada","hindi","maths","science","social","computer"],
    8: ["english","kannada","hindi","maths","science","social","computer"],
    9: ["english","kannada","hindi","maths","science","social","it"],
    10: ["english","kannada","hindi","maths","science","social","it"],
    11: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM,"kannada"].filter((v,i,a)=>a.indexOf(v)===i),
    12: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM,"kannada"].filter((v,i,a)=>a.indexOf(v)===i),
  },
  tamil_nadu: {
    1: ["english","tamil","maths","evs"],
    2: ["english","tamil","maths","evs"],
    3: ["english","tamil","hindi","maths","evs"],
    4: ["english","tamil","hindi","maths","evs"],
    5: ["english","tamil","hindi","maths","evs","computer"],
    6: ["english","tamil","hindi","maths","science","social","computer"],
    7: ["english","tamil","hindi","maths","science","social","computer"],
    8: ["english","tamil","hindi","maths","science","social","computer"],
    9: ["english","tamil","hindi","maths","science","social","it"],
    10: ["english","tamil","hindi","maths","science","social","it"],
    11: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM,"tamil"].filter((v,i,a)=>a.indexOf(v)===i),
    12: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM,"tamil"].filter((v,i,a)=>a.indexOf(v)===i),
  },
  up_board: {
    1: ["english","hindi","maths","evs"],
    2: ["english","hindi","maths","evs"],
    3: ["english","hindi","maths","evs"],
    4: ["english","hindi","maths","evs","computer"],
    5: ["english","hindi","maths","evs","computer"],
    6: ["english","hindi","maths","science","social","sanskrit","computer"],
    7: ["english","hindi","maths","science","social","sanskrit","computer"],
    8: ["english","hindi","maths","science","social","sanskrit","computer"],
    9: ["english","hindi","maths","science","social","sanskrit","it","urdu"],
    10: ["english","hindi","maths","science","social","sanskrit","it","urdu"],
    11: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM,"urdu"].filter((v,i,a)=>a.indexOf(v)===i),
    12: [...SCIENCE_STREAM, ...COMMERCE_STREAM, ...ARTS_STREAM,"urdu"].filter((v,i,a)=>a.indexOf(v)===i),
  },
};

// ─── PUBLIC API ──────────────────────────────────────────────────────────────

export function getSubjectsForBoardAndClass(
  boardId: BoardId,
  classNum: number
): Subject[] {
  const ids = SUBJECT_MAP[boardId]?.[classNum] ?? [];
  return ids
    .map((id) => SUBJECT_POOLS[id])
    .filter((s): s is Subject => Boolean(s));
}

export function getBoardById(id: BoardId): Board | undefined {
  return BOARDS.find((b) => b.id === id);
}

export function getClassInfo(num: number): ClassInfo | undefined {
  return CLASSES.find((c) => c.number === num);
}

export const CLASS_GROUPS: Array<{
  group: ClassInfo["group"];
  classes: ClassInfo[];
}> = [
  { group: "Primary",          classes: CLASSES.filter((c) => c.group === "Primary") },
  { group: "Middle",           classes: CLASSES.filter((c) => c.group === "Middle") },
  { group: "Secondary",        classes: CLASSES.filter((c) => c.group === "Secondary") },
  { group: "Senior Secondary", classes: CLASSES.filter((c) => c.group === "Senior Secondary") },
];
