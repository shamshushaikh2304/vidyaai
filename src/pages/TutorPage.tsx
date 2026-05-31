// ─────────────────────────────────────────────────────────────────────────────
// TutorPage.tsx  –  ChatGPT-style AI Tutor
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useOnboardingStore,
  type ChatMessage,
} from "../store/onboardingStore";
import {
  getSubjectsForBoardAndClass,
  getBoardById,
  type Subject,
} from "../data/curriculum";

// ─── Fake AI responses ────────────────────────────────────────────────────────
const AI_RESPONSES: Record<string, string[]> = {
  default: [
    "Great question! Let me explain this step by step.\n\n**Step 1:** First, let's understand the core concept.\n\nThis is one of the most important topics in your syllabus. The key idea here is that every problem can be broken down into smaller, manageable parts.\n\n**Step 2:** Apply the formula or rule.\n\nIn this case, we use the standard approach that you've seen in your textbook.\n\n**Step 3:** Verify your answer.\n\nAlways check your answer by substituting back.\n\n💡 **Quick tip:** Practice 3 similar problems tonight for this concept to stick!",
    "Excellent! This is a very common doubt that many students have. Let me clear it up for you.\n\nThe key distinction here is:\n- **Concept A** applies when the condition X is true\n- **Concept B** applies when condition Y is true\n\nA helpful way to remember this: *'When in doubt, check the given conditions first.'*\n\nDoes that make sense? Try solving the next example in your textbook using this approach! 📚",
    "I love this question! It tests your deep understanding.\n\nHere's the answer in simple terms:\n\nThink of it like this — imagine you're at a cricket match. The batsman (your variable) can only score runs (values) within certain boundaries (constraints).\n\nUsing that analogy:\n1. Identify your boundaries\n2. Apply the rule within those boundaries\n3. State your final answer clearly\n\n✅ You're on the right track! Keep going.",
  ],
  maths: [
    "Let's solve this step by step! 🔢\n\n**Given:** The problem as stated\n\n**Step 1 — Identify what's asked:**\nWe need to find the value that satisfies the equation.\n\n**Step 2 — Apply the formula:**\n```\nax² + bx + c = 0\nx = (-b ± √(b²-4ac)) / 2a\n```\n\n**Step 3 — Substitute values:**\nPlug in a=1, b=-5, c=6\n\nx = (5 ± √(25-24)) / 2 = (5 ± 1) / 2\n\n**Answer: x = 3 or x = 2** ✓\n\n💡 Always verify: 3×2=6 ✓ and 3+2=5 ✓",
    "Great maths problem! Here's how we approach it:\n\n**Key Formula to Remember:**\n> The sum of interior angles of any polygon = (n-2) × 180°\n\nFor a triangle: (3-2) × 180° = **180°** ✓\nFor a quadrilateral: (4-2) × 180° = **360°** ✓\n\nSo for your problem, just substitute n = number of sides.\n\n🎯 **Practice:** What's the sum for a hexagon? Try it yourself!",
  ],
  science: [
    "Let me explain this science concept clearly! 🔬\n\n**What is Photosynthesis?**\n\nPhotosynthesis is the process by which plants make their own food using:\n- 🌞 Sunlight (energy source)\n- 💧 Water (from roots)\n- 🌬️ Carbon dioxide (from air)\n\n**The Chemical Equation:**\n```\n6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n```\n\n**Simple way to remember:** *Plants eat sunlight for breakfast!*\n\n📝 **Exam tip:** The equation above is frequently asked in CBSE board exams. Learn it by heart!",
    "Excellent science question! ⚛️\n\n**Newton's Three Laws of Motion:**\n\n1. **Law of Inertia** — An object at rest stays at rest unless acted upon by a force\n   *Example: You lurch forward when a bus brakes suddenly*\n\n2. **F = ma** — Force equals mass times acceleration\n   *Example: It's harder to push a heavy truck than a bicycle*\n\n3. **Action-Reaction** — Every action has an equal and opposite reaction\n   *Example: A rocket launching upward by pushing gases downward*\n\n🏏 **Indian context:** When a cricket ball hits a bat, both experience equal and opposite forces!",
  ],
  english: [
    "Let's analyse this English question together! 📖\n\n**The Road Not Taken — Key Themes:**\n\n1. **Choice and Consequence** — The poem explores how the decisions we make shape our lives\n2. **Regret vs. Acceptance** — The speaker wonders about the path not chosen\n3. **Individuality** — Taking the less-traveled path symbolises non-conformity\n\n**Important Lines for Exams:**\n> *'Two roads diverged in a wood, and I— I took the one less traveled by'*\n\n**Literary Devices Used:**\n- Metaphor: Roads = Life choices\n- Symbolism: Fork in road = Decision point\n- Irony: Both paths are actually equal\n\n✍️ **For your board exam:** Always support your analysis with quotes!",
  ],
  social: [
    "Great Social Science question! 🌍\n\n**The Nationalist Movement in India — Key Events:**\n\n| Year | Event | Leader |\n|------|-------|--------|\n| 1885 | Indian National Congress founded | A.O. Hume |\n| 1905 | Partition of Bengal | Lord Curzon |\n| 1919 | Jallianwala Bagh Massacre | Reginald Dyer |\n| 1920 | Non-Cooperation Movement | Mahatma Gandhi |\n| 1942 | Quit India Movement | Mahatma Gandhi |\n\n**For CBSE Boards:** Focus on causes, methods, and outcomes of each movement.\n\n📌 **Memory trick:** Use the acronym **PNNCQ** — Partition, Non-coop, Non-coop (again), Civil Disobedience, Quit India",
  ],
};

function getFakeResponse(subjectId: string): string {
  const pool =
    AI_RESPONSES[subjectId] ??
    AI_RESPONSES.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─── Markdown-lite renderer ───────────────────────────────────────────────────
function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
          return (
            <p key={i} className="font-bold text-white">
              {line.slice(2, -2)}
            </p>
          );
        }
        if (line.startsWith("```")) return null;
        if (line.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-[#FF6B35]/60 pl-3 text-white/60 italic"
            >
              {line.slice(2)}
            </blockquote>
          );
        }
        if (line.startsWith("- ") || line.startsWith("• ")) {
          const text = line.slice(2);
          const parts = text.split(/\*\*(.*?)\*\*/g);
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#FF6B35] mt-0.5 flex-shrink-0">•</span>
              <span className="text-white/80">
                {parts.map((p, j) =>
                  j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p
                )}
              </span>
            </div>
          );
        }
        if (/^\d+\./.test(line)) {
          const text = line.replace(/^\d+\.\s*/, "");
          const parts = text.split(/\*\*(.*?)\*\*/g);
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#FF6B35]/70 flex-shrink-0 font-semibold text-xs w-4 mt-0.5">
                {line.match(/^\d+/)?.[0]}.
              </span>
              <span className="text-white/80">
                {parts.map((p, j) =>
                  j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p
                )}
              </span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;

        const parts = line.split(/\*\*(.*?)\*\*/g);
        if (parts.length > 1) {
          return (
            <p key={i} className="text-white/80">
              {parts.map((p, j) =>
                j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{p}</strong> : p
              )}
            </p>
          );
        }
        return (
          <p key={i} className="text-white/80">
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[#FF6B35]/70"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ─── Suggestion chips ─────────────────────────────────────────────────────────
const SUGGESTIONS: Record<string, string[]> = {
  maths:   ["Solve a quadratic equation", "Explain Pythagoras theorem", "What is differentiation?", "HCF and LCM methods"],
  science: ["Explain photosynthesis", "Newton's laws of motion", "What is Ohm's law?", "Explain the water cycle"],
  english: ["Analyse 'The Road Not Taken'", "Write a formal letter", "Explain figure of speech", "Summary of a chapter"],
  social:  ["Key events of 1857 revolt", "What is democracy?", "Explain globalisation", "French Revolution causes"],
  default: ["Explain this concept", "Give me a practice question", "How to remember this?", "What's asked in board exams?"],
};

function getSuggestions(subjectId: string): string[] {
  return SUGGESTIONS[subjectId] ?? SUGGESTIONS.default;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function TutorPage() {
  const {
    selectedBoard,
    selectedClass,
    selectedSubjects,
    activeSubjectId,
    setActiveSubject,
    chatHistory,
    addMessage,
    isAiTyping,
    setAiTyping,
    clearChat,
    logout,
    userName,
    userRole,
    goBack,
  } = useOnboardingStore();

  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const board = selectedBoard ? getBoardById(selectedBoard) : null;
  const allSubjects =
    selectedBoard && selectedClass
      ? getSubjectsForBoardAndClass(selectedBoard, selectedClass)
      : [];
  const activeSubjects = allSubjects.filter((s) =>
    selectedSubjects.includes(s.id)
  );
  const activeSubject = activeSubjects.find((s) => s.id === activeSubjectId);
  const messages: ChatMessage[] = activeSubjectId
    ? chatHistory[activeSubjectId] ?? []
    : [];

  // Auto-select first subject
  useEffect(() => {
    if (!activeSubjectId && activeSubjects.length > 0) {
      setActiveSubject(activeSubjects[0].id);
    }
  }, [activeSubjectId, activeSubjects, setActiveSubject]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isAiTyping || !activeSubjectId) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    addMessage(activeSubjectId, {
      role: "user",
      content: text,
      timestamp: Date.now(),
      subject: activeSubjectId,
    });

    setAiTyping(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 1000));
    setAiTyping(false);

    addMessage(activeSubjectId, {
      role: "assistant",
      content: getFakeResponse(activeSubjectId),
      timestamp: Date.now(),
      subject: activeSubjectId,
    });
  }, [input, isAiTyping, activeSubjectId, addMessage, setAiTyping]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  return (
    <div className="h-screen bg-[#0A0A0F] text-white flex overflow-hidden">

      {/* ── SIDEBAR (desktop) ─────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="hidden md:flex flex-col border-r border-white/[0.06] bg-[#0D0D14] overflow-hidden flex-shrink-0"
          >
            <SidebarContent
              board={board ?? undefined}
              selectedClass={selectedClass}
              activeSubjects={activeSubjects}
              activeSubjectId={activeSubjectId}
              setActiveSubject={(id) => {
                setActiveSubject(id);
                setMobileSidebarOpen(false);
              }}
              messages={chatHistory}
              onClearChat={clearChat}
              onLogout={logout}
              onBack={goBack}
              userName={userName}
              userRole={userRole}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MOBILE SIDEBAR ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] z-50 flex flex-col bg-[#0D0D14] border-r border-white/[0.06] md:hidden"
            >
              <SidebarContent
                board={board ?? undefined}
                selectedClass={selectedClass}
                activeSubjects={activeSubjects}
                activeSubjectId={activeSubjectId}
                setActiveSubject={(id) => {
                  setActiveSubject(id);
                  setMobileSidebarOpen(false);
                }}
                messages={chatHistory}
                onClearChat={clearChat}
                onLogout={logout}
                onBack={goBack}
                userName={userName}
                userRole={userRole}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN AREA ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
          {/* Sidebar toggle (desktop) */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all outline-none"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex md:hidden items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all outline-none"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Subject info */}
          {activeSubject ? (
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                style={{ background: `${activeSubject.color}20` }}
              >
                {activeSubject.icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-white font-semibold text-sm truncate">
                  {activeSubject.name}
                </h2>
                <p className="text-white/30 text-xs truncate">
                  {board?.name} · Class {selectedClass}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                <span className="text-white font-black text-xs">V</span>
              </div>
              <span className="font-black text-base">VidyaAI</span>
            </div>
          )}

          <div className="flex-1" />

          {/* Message count */}
          {messages.length > 0 && activeSubjectId && (
            <button
              onClick={() => clearChat(activeSubjectId)}
              className="text-white/25 hover:text-white/60 text-xs transition-colors outline-none hidden sm:block"
            >
              Clear chat
            </button>
          )}

          {/* Subject pill (desktop) */}
          {activeSubject && (
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
              style={{
                background: `${activeSubject.color}18`,
                color: activeSubject.color,
                border: `1px solid ${activeSubject.color}30`,
              }}
            >
              <span>{activeSubject.icon}</span>
              {activeSubject.name}
            </div>
          )}
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <WelcomeScreen
                key="welcome"
                subject={activeSubject}
                userName={userName}
                onSuggestion={handleSuggestion}
              />
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-3xl mx-auto px-4 py-6 space-y-6"
              >
                {messages.map((msg, i) => (
                  <MessageBubble key={msg.id} message={msg} index={i} />
                ))}

                {isAiTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FF6B35]/30">
                      <span className="text-white text-xs font-black">V</span>
                    </div>
                    <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl rounded-tl-md px-4 py-3">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="flex-shrink-0 border-t border-white/[0.06] px-4 py-4">
          <div className="max-w-3xl mx-auto">
            {/* Suggestion chips (only when no messages) */}
            {messages.length === 0 && activeSubject && (
              <div className="flex gap-2 flex-wrap mb-3">
                {getSuggestions(activeSubject.id).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:border-white/25 transition-all outline-none"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input box */}
            <div className="flex items-end gap-3 bg-white/[0.04] border border-white/[0.1] rounded-2xl px-4 py-3 focus-within:border-[#FF6B35]/40 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  activeSubject
                    ? `Ask anything about ${activeSubject.name}…`
                    : "Select a subject from the sidebar…"
                }
                disabled={!activeSubjectId || isAiTyping}
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-white/25 text-sm resize-none outline-none leading-relaxed min-h-[24px] max-h-[160px] disabled:opacity-40"
              />
              <motion.button
                whileHover={input.trim() ? { scale: 1.08 } : {}}
                whileTap={input.trim() ? { scale: 0.93 } : {}}
                onClick={sendMessage}
                disabled={!input.trim() || isAiTyping || !activeSubjectId}
                className={`
                  w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                  transition-all duration-200 outline-none
                  ${input.trim() && !isAiTyping && activeSubjectId
                    ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30 cursor-pointer"
                    : "bg-white/[0.06] text-white/20 cursor-not-allowed"
                  }
                `}
              >
                <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </motion.button>
            </div>

            <p className="text-white/15 text-xs text-center mt-2">
              Press Enter to send · Shift+Enter for new line · AI responses are for learning purposes only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({
  message,
  index,
}: {
  message: ChatMessage;
  index: number;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
          ${isUser
            ? "bg-white/10 text-white/70"
            : "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/25"
          }`}
      >
        {isUser ? "👤" : "V"}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[82%] rounded-2xl px-4 py-3
          ${isUser
            ? "bg-[#FF6B35]/15 border border-[#FF6B35]/20 rounded-tr-md text-white/90"
            : "bg-white/[0.05] border border-white/[0.08] rounded-tl-md"
          }
        `}
      >
        {isUser ? (
          <p className="text-sm text-white/90 leading-relaxed">{message.content}</p>
        ) : (
          <MessageContent content={message.content} />
        )}
        <p className="text-white/20 text-[10px] mt-2">
          {new Date(message.timestamp).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Welcome screen ───────────────────────────────────────────────────────────
function WelcomeScreen({
  subject,
  userName,
  onSuggestion,
}: {
  subject: Subject | undefined;
  userName: string;
  onSuggestion: (s: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full min-h-[400px] px-6 py-12 text-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-16 h-16 rounded-2xl bg-[#FF6B35] flex items-center justify-center shadow-2xl shadow-[#FF6B35]/40 mb-6"
      >
        <span className="text-white font-black text-2xl">V</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-black text-white mb-2"
      >
        Namaste, {userName || "there"}! 🙏
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-white/45 text-sm max-w-sm leading-relaxed mb-2"
      >
        {subject ? (
          <>
            I'm your AI tutor for{" "}
            <span style={{ color: subject.color }} className="font-semibold">
              {subject.name}
            </span>
            . Ask me anything — doubts, concepts, exam prep, or practice questions.
          </>
        ) : (
          "Select a subject from the sidebar to get started."
        )}
      </motion.p>

      {subject && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/25 text-xs mb-10"
        >
          I explain in Hindi or English — just ask!
        </motion.p>
      )}

      {/* Suggestion grid */}
      {subject && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md"
        >
          {getSuggestions(subject.id).map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSuggestion(s)}
              className="text-left px-4 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all outline-none group"
            >
              <p className="text-white/70 text-sm group-hover:text-white transition-colors leading-snug">
                {s}
              </p>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Sidebar content ──────────────────────────────────────────────────────────
interface SidebarContentProps {
  board: ReturnType<typeof getBoardById>;
  selectedClass: number | null;
  activeSubjects: Subject[];
  activeSubjectId: string | null;
  setActiveSubject: (id: string) => void;
  messages: Record<string, ChatMessage[]>;
  onClearChat: (id: string) => void;
  onLogout: () => void;
  onBack: () => void;
  userName: string;
  userRole: "student" | "parent" | null;
}

function SidebarContent({
  board,
  selectedClass,
  activeSubjects,
  activeSubjectId,
  setActiveSubject,
  messages,
  onLogout,
  onBack,
  userName,
  userRole,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm">V</span>
          </div>
          <span className="font-black text-base text-white">VidyaAI</span>
        </div>
      </div>

      {/* User + Board info */}
      <div className="px-4 py-4 border-b border-white/[0.06] space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
            {userRole === "parent" ? "👨‍👩‍👧" : "🎓"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{userName || "Student"}</p>
            <p className="text-white/35 text-[10px] capitalize">{userRole}</p>
          </div>
        </div>

        {board && selectedClass && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
            <span className="text-sm">{board.flag}</span>
            <span className="text-white/50 text-[11px] font-medium truncate">
              {board.name} · Class {selectedClass}
            </span>
          </div>
        )}
      </div>

      {/* Subjects */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-white/25 text-[10px] font-semibold uppercase tracking-wider px-1 mb-3">
          Subjects
        </p>

        <div className="space-y-1">
          {activeSubjects.map((subject, i) => {
            const isActive = activeSubjectId === subject.id;
            const msgCount = messages[subject.id]?.length ?? 0;

            return (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 2 }}
                onClick={() => setActiveSubject(subject.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-left transition-all duration-150 outline-none group
                  ${isActive
                    ? "bg-white/[0.08] border border-white/[0.1]"
                    : "hover:bg-white/[0.04] border border-transparent"
                  }
                `}
              >
                {/* Color bar */}
                <div
                  className="w-1 h-5 rounded-full flex-shrink-0 transition-opacity"
                  style={{
                    background: subject.color,
                    opacity: isActive ? 1 : 0.3,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: `${subject.color}${isActive ? "25" : "15"}` }}
                >
                  {subject.icon}
                </div>

                {/* Name */}
                <span
                  className={`flex-1 text-xs font-medium truncate transition-colors
                    ${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"}`}
                >
                  {subject.name}
                </span>

                {/* Message count */}
                {msgCount > 0 && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: `${subject.color}20`,
                      color: subject.color,
                    }}
                  >
                    {msgCount}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-3 pb-4 pt-3 border-t border-white/[0.06] space-y-1">
        <button
          onClick={onBack}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/35 hover:text-white hover:bg-white/[0.04] transition-all text-xs outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Change subjects
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/25 hover:text-red-400 hover:bg-red-500/[0.06] transition-all text-xs outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}
