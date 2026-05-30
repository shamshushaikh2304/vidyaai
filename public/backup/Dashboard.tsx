import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BookOpen,
  BarChart2,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Send,
  Sparkles,
  Trophy,
  Flame,
  Brain,
  Orbit,
  LayoutDashboard,
  GraduationCap,
  Globe2,
  TrendingUp,
  Target,
  Clock3,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Syllabus ───────────────────────────────────────────────────────────────
const SYLLABUS: Record<string, Record<string, { icon: string; color: string; bg: string; chapters: string[] }>> = {
  Mathematics: {
    icon: "🔢", color: "#2563EB", bg: "#EFF6FF",
    chapters: ["The Fish Tale","Shapes and Angles","How Many Squares?","Parts and Wholes","Does it Look the Same?","Be My Multiple, Be My Factor","Can You See the Pattern?","Mapping Your Way","Boxes and Sketches","Tenths and Hundredths","Area and its Boundary","Smart Charts","Ways to Multiply and Divide","How Big? How Heavy?"],
  } as any,
  English: {
    icon: "📖", color: "#059669", bg: "#ECFDF5",
    chapters: ["Wonderful Waste!","Teamwork","Flying Together","My Elder Brother","Robinson Crusoe","Rip Van Winkle","The Talkative Barber","Gullu's Box of Happiness","Princess September","The Story of Mulan","Gulliver's Travels","The Little Bully","Nobody's Friend","Going to Buy a Book","Who Will be Ningthou?"],
  } as any,
  EVS: {
    icon: "🌿", color: "#0891B2", bg: "#ECFEFF",
    chapters: ["Super Senses","A Snake Charmer's Story","From Tasting to Digesting","Mangoes Round the Year","Seeds and Seeds","Every Drop Counts","Experiments with Water","A Treat for Mosquitoes","Up You Go!","Walls Tell Stories","Sunita in Space","What if it Finishes?","A Shelter so High!","When the Earth Shook!","Blow Hot, Blow Cold","Who Will Do This Work?","Across the Wall","No Place for Us?","A Seed Tells a Farmer's Story","Whose Forests?"],
  } as any,
  Hindi: {
    icon: "🔠", color: "#D97706", bg: "#FFFBEB",
    chapters: ["राख की रस्सी","फसलों के त्योहार","खिलौनेवाला","नन्हा फनकार","जहाँ चाह वहाँ राह","चिट्ठी का सफ़र","डाकिए की कहानी","वे दिन भी क्या दिन थे","एक माँ की बेबसी","एक दिन की बादशाहत","चावल की रोटियाँ","गुरु और चेला","स्वामी की दादी","बाघ आया उस रात","पानी रे पानी"],
  } as any,
};

type SubjectKey = keyof typeof SYLLABUS;

const QUICK_PROMPTS = [
  { icon: "🍕", text: "Explain with an Indian example" },
  { icon: "🎯", text: "Give me a quiz question" },
  { icon: "😕", text: "I'm confused, start over" },
  { icon: "📝", text: "Important exam points" },
  { icon: "🔁", text: "Explain differently" },
  { icon: "✅", text: "How to remember this?" },
];

const LANG_OPTIONS = [
  { code: "English", label: "EN" }, { code: "Hindi", label: "हि" },
  { code: "Marathi", label: "मर" }, { code: "Tamil", label: "த" },
  { code: "Telugu", label: "తె" },
];

type Message = { role: "user" | "assistant"; content: string };
type SubjectMeta = {
  icon: LucideIcon;
  accent: string;
  glow: string;
};

const SUBJECT_META: Record<SubjectKey, SubjectMeta> = {
  Mathematics: { icon: BarChart2, accent: "#60A5FA", glow: "rgba(96,165,250,.35)" },
  English: { icon: BookOpen, accent: "#34D399", glow: "rgba(52,211,153,.35)" },
  EVS: { icon: Globe2, accent: "#22D3EE", glow: "rgba(34,211,238,.35)" },
  Hindi: { icon: GraduationCap, accent: "#F59E0B", glow: "rgba(245,158,11,.35)" },
};

const BOARD_OPTIONS = ["CBSE", "ICSE", "IGCSE", "State"] as const;
const CLASS_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;
type BoardOption = (typeof BOARD_OPTIONS)[number];
type ClassOption = (typeof CLASS_OPTIONS)[number];

function SelectorChips<T extends string>({
  label,
  options,
  value,
  onChange,
  format = (v) => v,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 lg:inline">
        {label}
      </span>
      <div className="flex min-w-0 gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <motion.button
              key={opt}
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(opt)}
              className={`shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-medium transition sm:px-3 sm:py-1.5 sm:text-xs ${
                active
                  ? "border-cyan-300/35 bg-cyan-500/20 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,.15)]"
                  : "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-slate-200"
              }`}
            >
              {format(opt)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── AI call ────────────────────────────────────────────────────────────────
async function callTutor(
  subject: string, chapter: string, board: string, cls: string,
  language: string, history: Message[], userMessage: string
): Promise<string> {
  const system = `You are VidyaAI, a warm and encouraging AI tutor for Indian school students.
You are helping a Class ${cls} student studying ${subject} under the ${board} curriculum.
Current topic: "${chapter}"

Rules:
- Respond ONLY in ${language}
- Use relatable Indian examples: roti, cricket, chai, Diwali, local animals, Bollywood
- For younger classes: very simple words, emojis, short sentences
- For high school: proper terminology, exam-focused
- Teach ONE concept at a time — never dump the whole chapter
- For Math: always show step-by-step working
- Quiz mode: one question at a time, celebrate correct answers 🎉
- Keep responses to 4-6 lines unless step-by-step working is needed
- ALWAYS end with a follow-up question or invitation to ask more`;

  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: userMessage },
  ];

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      system,
      messages,
    }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map((b: any) => b.text || "").join("");
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [board, setBoard] = useState<BoardOption>("CBSE");
  const [cls, setCls] = useState<ClassOption>("5");

  const [tab, setTab] = useState<"subjects" | "progress" | "chat">("subjects");
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [listening, setListening] = useState(false);
  const [progress, setProgress] = useState<Record<string, string[]>>({});
  const [pointer, setPointer] = useState({ x: 50, y: 30 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Progress helpers
  const isDone = (subj: string, ch: string) => (progress[subj] || []).includes(ch);
  const markDone = (subj: string, ch: string) =>
    setProgress((p) => ({ ...p, [subj]: Array.from(new Set([...(p[subj] || []), ch])) }));
  const doneCount = (subj: string) => (progress[subj] || []).length;
  const totalDone = Object.keys(SYLLABUS).reduce((s, k) => s + doneCount(k), 0);
  const totalAll = Object.values(SYLLABUS).reduce((s, v) => s + (v as any).chapters.length, 0);

  // Open chapter
  const openChapter = async (subj: SubjectKey, ch: string) => {
    setSelectedSubject(subj);
    setActiveChapter(ch);
    setMessages([]);
    setTab("chat");
    setLoading(true);
    try {
      const reply = await callTutor(
        subj, ch, board, cls, language, [],
        `Greet me warmly and introduce yourself as VidyaAI. Give a friendly 2-3 sentence intro to "${ch}". Start with one relatable example from Indian daily life. End with a question.`
      );
      setMessages([{ role: "assistant", content: reply }]);
      if (autoSpeak) speakText(reply);
    } catch {
      setMessages([{ role: "assistant", content: "Namaste! 🙏 I'm VidyaAI. Let's learn together! What would you like to know?" }]);
    }
    setLoading(false);
  };

  // Send message
  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading || !activeChapter || !selectedSubject) return;
    setInput("");
    const updated: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(updated);
    setLoading(true);
    try {
      const reply = await callTutor(selectedSubject, activeChapter, board, cls, language, messages, msg);
      setMessages([...updated, { role: "assistant", content: reply }]);
      if (autoSpeak) speakText(reply);
      if (updated.length >= 3) markDone(selectedSubject, activeChapter);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Oops! Please try again 😊" }]);
    }
    setLoading(false);
  };

  // Text-to-speech
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[*#_`]/g, "").slice(0, 400));
    const langMap: Record<string, string> = {
      English: "en-IN", Hindi: "hi-IN", Marathi: "mr-IN", Tamil: "ta-IN", Telugu: "te-IN",
    };
    u.lang = langMap[language] || "en-IN";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  // Voice input
  const toggleVoice = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    if (listening) { recognitionRef.current?.stop(); return; }
    const r = new SR();
    r.lang = "en-IN";
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      setInput(t);
      setTimeout(() => sendMessage(t), 100);
    };
    recognitionRef.current = r;
    r.start();
  }, [listening, sendMessage]);

  // ── Sidebar subjects list
  const subjectKeys = Object.keys(SYLLABUS) as SubjectKey[];
  const completionPct = Math.round((totalDone / totalAll) * 100);

  return (
    <div
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#05070c] text-slate-100"
      style={{ fontFamily: "var(--app-font-sans)" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPointer({ x, y });
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-44 right-8 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <motion.div
          animate={{ left: `calc(${pointer.x}% - 180px)`, top: `calc(${pointer.y}% - 180px)` }}
          transition={{ type: "spring", stiffness: 70, damping: 20, mass: 0.6 }}
          className="absolute h-[360px] w-[360px] rounded-full bg-cyan-300/10 blur-3xl"
        />
      </div>

      <header className="sticky top-0 z-50 shrink-0 border-b border-white/10 bg-slate-950/45 backdrop-blur-2xl">
        <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <a href="/" className="group flex min-w-0 shrink-0 items-center gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-2 shadow-[0_0_30px_rgba(56,189,248,.2)]">
                <Orbit size={18} className="text-cyan-300" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Learning OS</div>
                <div className="truncate font-display text-lg font-semibold text-white">VidyaAI Studio</div>
              </div>
            </a>

            <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-orange-400/30 bg-orange-500/10 px-2.5 py-1.5 text-[11px] font-medium text-orange-200 sm:px-3 sm:text-xs">
              <Flame size={13} />
              <span className="hidden sm:inline">12 day streak</span>
              <span className="sm:hidden">12d</span>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
            <SelectorChips
              label="Board"
              options={BOARD_OPTIONS}
              value={board}
              onChange={setBoard}
            />
            <div className="hidden h-5 w-px bg-white/10 sm:block" />
            <SelectorChips
              label="Class"
              options={CLASS_OPTIONS}
              value={cls}
              onChange={setCls}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 gap-4 overflow-hidden px-4 py-4 sm:px-6">
        <motion.aside
          animate={{ y: (pointer.y - 50) * -0.06 }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
          className="hidden w-72 shrink-0 overflow-y-auto rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:block"
        >
          <div className="mb-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI Momentum</p>
              <TrendingUp size={14} className="text-emerald-300" />
            </div>
            <div className="text-3xl font-semibold text-white">{completionPct}%</div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">{totalDone}/{totalAll} concepts mastered</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: "subjects", icon: LayoutDashboard, label: "Subjects Hub" },
              { id: "progress", icon: BarChart2, label: "Learning Analytics" },
            ].map(({ id, icon: Icon, label }) => (
              <motion.button
                whileHover={{ x: 2 }}
                key={id}
                onClick={() => setTab(id as any)}
                className={`flex w-full items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm transition ${
                  tab === id
                    ? "border border-cyan-300/30 bg-cyan-500/15 text-cyan-100"
                    : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </motion.button>
            ))}
          </nav>

          <div className="mt-5 space-y-2">
            <p className="px-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">Subjects</p>
            {subjectKeys.map((subj) => {
              const done = doneCount(subj);
              const total = (SYLLABUS[subj] as any).chapters.length;
              const MetaIcon = SUBJECT_META[subj].icon;
              return (
                <motion.button
                  whileHover={{ y: -1 }}
                  key={subj}
                  onClick={() => { setSelectedSubject(subj); setTab("subjects"); }}
                  className={`w-full rounded-2xl border p-3 text-left transition ${
                    selectedSubject === subj && tab === "subjects"
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-slate-950/50 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                      <MetaIcon size={15} style={{ color: SUBJECT_META[subj].accent }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-slate-100">{subj}</div>
                      <div className="text-xs text-slate-400">{done}/{total} completed</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.aside>

        <motion.main
          animate={{ y: (pointer.y - 50) * -0.03 }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
          className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
        >
          <div className="grid grid-cols-2 gap-3 border-b border-white/10 p-3 lg:hidden">
            {[
              { id: "subjects", icon: LayoutDashboard, label: "Subjects" },
              { id: "progress", icon: BarChart2, label: "Progress" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTab(id as any)}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm ${
                  tab === id ? "bg-cyan-500/20 text-cyan-100" : "bg-slate-900/70 text-slate-300"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "subjects" && (
              <motion.section
                key="subjects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 overflow-y-auto p-5 sm:p-7"
              >
                {!selectedSubject ? (
                  <>
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">AI Learning Command Center</h1>
                        <p className="mt-1 text-sm text-slate-400">Choose a subject and launch an adaptive tutor session.</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                        <Sparkles size={14} className="text-cyan-300" />
                        Neural tutor ready
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {subjectKeys.map((subj, idx) => {
                        const done = doneCount(subj);
                        const total = (SYLLABUS[subj] as any).chapters.length;
                        const pct = Math.round((done / total) * 100);
                        const MetaIcon = SUBJECT_META[subj].icon;
                        return (
                          <motion.button
                            key={subj}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            whileHover={{ y: -3, scale: 1.01 }}
                            onClick={() => setSelectedSubject(subj)}
                            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 p-5 text-left transition hover:border-white/20"
                          >
                            <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full blur-3xl" style={{ background: SUBJECT_META[subj].glow }} />
                            <div className="relative">
                              <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-2.5">
                                <MetaIcon size={18} style={{ color: SUBJECT_META[subj].accent }} />
                              </div>
                              <div className="text-lg font-medium text-white">{subj}</div>
                              <div className="mt-1 text-sm text-slate-400">{done}/{total} chapters · {pct}% complete</div>
                              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 0.7, delay: 0.1 + idx * 0.03 }}
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                                />
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedSubject(null)}
                      className="mb-6 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
                    >
                      <ChevronLeft size={15} /> Back to all subjects
                    </button>
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          {(() => {
                            const MetaIcon = SUBJECT_META[selectedSubject].icon;
                            return <MetaIcon size={20} style={{ color: SUBJECT_META[selectedSubject].accent }} />;
                          })()}
                        </div>
                        <div>
                          <h2 className="font-display text-2xl font-semibold text-white">{selectedSubject}</h2>
                          <p className="text-sm text-slate-400">{doneCount(selectedSubject)}/{(SYLLABUS[selectedSubject] as any).chapters.length} chapters completed</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {(SYLLABUS[selectedSubject] as any).chapters.map((ch: string, i: number) => {
                        const done = isDone(selectedSubject, ch);
                        return (
                          <motion.button
                            whileHover={{ x: 2 }}
                            key={ch}
                            onClick={() => openChapter(selectedSubject, ch)}
                            className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-left transition hover:border-white/20 hover:bg-slate-900/70"
                          >
                            <div className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-semibold ${done ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-slate-200"}`}>
                              {done ? "✓" : i + 1}
                            </div>
                            <span className={`min-w-0 flex-1 truncate text-sm ${done ? "text-slate-500 line-through" : "text-slate-100"}`}>{ch}</span>
                            <ChevronRight size={15} className="text-slate-500 transition group-hover:text-slate-300" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </>
                )}
              </motion.section>
            )}

            {tab === "progress" && (
              <motion.section
                key="progress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 overflow-y-auto p-5 sm:p-7"
              >
                <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Learning Analytics</h1>
                <p className="mt-1 text-sm text-slate-400">High-signal insights from your tutor interactions and chapter velocity.</p>

                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  {[
                    { label: "Overall Completion", value: `${completionPct}%`, icon: Target, detail: `${totalDone}/${totalAll} topics`, tint: "from-cyan-500/25 to-blue-500/10" },
                    { label: "Consistency Streak", value: "12 Days", icon: Flame, detail: "No drop in momentum", tint: "from-orange-500/25 to-amber-500/10" },
                    { label: "Study Cadence", value: "41 min", icon: Clock3, detail: "Avg daily focus time", tint: "from-violet-500/25 to-fuchsia-500/10" },
                  ].map((c) => (
                    <motion.div
                      whileHover={{ y: -2 }}
                      key={c.label}
                      className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
                    >
                      <div className={`mb-4 inline-flex rounded-2xl border border-white/10 bg-gradient-to-br ${c.tint} p-2.5`}>
                        <c.icon size={16} className="text-slate-100" />
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{c.label}</div>
                      <div className="mt-1 text-2xl font-semibold text-white">{c.value}</div>
                      <div className="mt-1 text-sm text-slate-400">{c.detail}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {subjectKeys.map((subj) => {
                    const done = doneCount(subj);
                    const total = (SYLLABUS[subj] as any).chapters.length;
                    const pct = Math.round((done / total) * 100);
                    const MetaIcon = SUBJECT_META[subj].icon;
                    return (
                      <motion.div
                        whileHover={{ y: -1 }}
                        key={subj}
                        className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                              <MetaIcon size={14} style={{ color: SUBJECT_META[subj].accent }} />
                            </div>
                            <span className="text-sm font-medium text-slate-100">{subj}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-200">{pct}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6 }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                          <span>{done} done · {total - done} remaining</span>
                          <button onClick={() => { setSelectedSubject(subj); setTab("subjects"); }} className="text-cyan-300 hover:text-cyan-200">Continue</button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {tab === "chat" && activeChapter && selectedSubject && (
              <motion.section
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex h-full flex-1 min-h-0 flex-col"
              >
                <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-slate-950/45 px-4 py-3">
                  <button
                    onClick={() => setTab("subjects")}
                    className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 hover:bg-white/10"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-cyan-200">
                    <Brain size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-slate-100">{activeChapter}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{selectedSubject} · {board} · Class {cls}</span>
                      <span className="inline-flex items-center gap-1 text-emerald-300">
                        <motion.span
                          animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                          className="h-1.5 w-1.5 rounded-full bg-emerald-300"
                        />
                        AI live
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {LANG_OPTIONS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => setLanguage(l.code)}
                        className={`rounded-lg border px-2 py-1 text-xs transition ${
                          language === l.code
                            ? "border-cyan-300/30 bg-cyan-500/20 text-cyan-100"
                            : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setAutoSpeak((a) => !a)}
                    className={`rounded-lg border p-2 ${autoSpeak ? "border-cyan-300/40 bg-cyan-500/20 text-cyan-100" : "border-white/10 bg-white/5 text-slate-400"}`}
                  >
                    {autoSpeak ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  </button>
                  {!isDone(selectedSubject, activeChapter) ? (
                    <button
                      onClick={() => markDone(selectedSubject, activeChapter)}
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1.5 text-xs font-medium text-emerald-200"
                    >
                      <CheckCircle2 size={12} />
                      Mark done
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1.5 text-xs font-medium text-emerald-200">
                      <CheckCircle2 size={12} />
                      Completed
                    </span>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {m.role === "assistant" && (
                          <div className="grid h-8 w-8 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10 text-cyan-200">
                            <Sparkles size={14} />
                          </div>
                        )}
                        <div
                          className={`max-w-[82%] whitespace-pre-wrap rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                            m.role === "user"
                              ? "border-violet-300/20 bg-violet-500/20 text-violet-50"
                              : "border-white/10 bg-white/[0.06] text-slate-100"
                          }`}
                        >
                          {m.content}
                        </div>
                        {m.role === "assistant" && (
                          <button onClick={() => speakText(m.content)} className="p-1 text-slate-500 hover:text-cyan-300">
                            <Volume2 size={14} />
                          </button>
                        )}
                      </motion.div>
                    ))}

                    {loading && (
                      <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-500/10 text-cyan-200">
                          <Sparkles size={14} />
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2">
                          <div className="flex gap-1.5">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                                className="h-2 w-2 rounded-full bg-cyan-300"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {!messages.length && !loading && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="mb-2 text-xs uppercase tracking-[0.16em] text-slate-500">Tutor Warmup</div>
                        <div className="space-y-2">
                          {[0, 1, 2].map((idx) => (
                            <motion.div
                              key={idx}
                              animate={{ opacity: [0.35, 0.85, 0.35] }}
                              transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.2 }}
                              className="h-3 rounded-full bg-slate-700/80"
                              style={{ width: idx === 2 ? "60%" : "100%" }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-white/10 bg-slate-950/45 px-4 py-3">
                  <div className="mx-auto mb-2 flex w-full max-w-4xl gap-2 overflow-x-auto pb-1">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q.text}
                        onClick={() => sendMessage(q.text)}
                        className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-white/20 hover:bg-white/10"
                      >
                        {q.icon} {q.text}
                      </button>
                    ))}
                  </div>

                  <div className="mx-auto flex w-full max-w-4xl items-end gap-3">
                    <button
                      onMouseDown={toggleVoice}
                      onMouseUp={toggleVoice}
                      onTouchStart={toggleVoice}
                      onTouchEnd={toggleVoice}
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition ${
                        listening
                          ? "border-rose-300/40 bg-rose-500/20 text-rose-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                      title="Hold to speak"
                    >
                      {listening ? <MicOff size={16} /> : <Mic size={16} />}
                    </button>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Ask your AI tutor anything..."
                      rows={1}
                      className="max-h-28 flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/40 focus:outline-none"
                    />
                    <motion.button
                      whileHover={loading || !input.trim() ? {} : { y: -1 }}
                      onClick={() => sendMessage()}
                      disabled={loading || !input.trim()}
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                        loading || !input.trim()
                          ? "bg-slate-800 text-slate-500"
                          : "bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-[0_10px_30px_rgba(45,212,191,.35)]"
                      }`}
                    >
                      <Send size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </motion.main>

        <motion.aside
          animate={{ y: (pointer.y - 50) * -0.08 }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
          className="hidden w-80 shrink-0 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl xl:block"
        >
          <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-slate-400">AI Tutor Capsule</h3>
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Brain size={15} className="text-cyan-300" />
                <span className="text-sm font-medium text-slate-100">Adaptive Intelligence</span>
              </div>
              <p className="text-sm text-slate-400">Tutor response adapts to your board, class level, and language preference in real time.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Target size={15} className="text-violet-300" />
                <span className="text-sm font-medium text-slate-100">Next Action</span>
              </div>
              <p className="text-sm text-slate-400">{activeChapter ? `Continue: ${activeChapter}` : "Pick a chapter to unlock AI-guided practice."}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  animate={{ x: ["-30%", "110%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Trophy size={15} className="text-amber-300" />
                <span className="text-sm font-medium text-slate-100">Performance Signal</span>
              </div>
              <p className="text-sm text-slate-400">Your consistency score is rising. Keep the streak to boost retention.</p>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
