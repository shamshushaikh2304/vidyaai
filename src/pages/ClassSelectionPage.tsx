// ─────────────────────────────────────────────────────────────────────────────
// ClassSelectionPage.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { CLASS_GROUPS, getBoardById } from "../data/curriculum";
import ClassCard from "../components/onboarding/ClassCard";
import { useOnboardingStore } from "../store/onboardingStore";

const GROUP_ICONS: Record<string, string> = {
  Primary:            "🌱",
  Middle:             "📚",
  Secondary:          "🎯",
  "Senior Secondary": "🚀",
};

const GROUP_COLORS: Record<string, string> = {
  Primary:            "text-emerald-400",
  Middle:             "text-blue-400",
  Secondary:          "text-purple-400",
  "Senior Secondary": "text-[#FF6B35]",
};

export default function ClassSelectionPage() {
  const {
    selectedClass,
    setSelectedClass,
    selectedBoard,
    goBack,
    userRole,
  } = useOnboardingStore();

  const board = selectedBoard ? getBoardById(selectedBoard) : null;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #845EC2 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00C9A7 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-3xl mx-auto w-full px-5 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Back + Logo row */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors outline-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                <span className="text-white font-black text-xs">V</span>
              </div>
              <span className="font-black text-base">VidyaAI</span>
            </div>
          </div>

          {/* Board breadcrumb */}
          {board && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-4"
            >
              <span className="text-base">{board.flag}</span>
              <span className="text-white/60 text-xs font-medium">{board.name}</span>
              <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#FF6B35] text-xs font-semibold">Class</span>
            </motion.div>
          )}

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Which <span className="text-[#FF6B35]">Class</span>?
          </h1>
          <p className="text-white/45 mt-2 text-sm sm:text-base">
            {userRole === "parent"
              ? "Select your child's current class"
              : "Select your current class"}
          </p>
        </motion.div>

        {/* Class groups */}
        <div className="flex-1 space-y-8 overflow-y-auto">
          {CLASS_GROUPS.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.08, duration: 0.4 }}
            >
              {/* Group header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{GROUP_ICONS[group.group]}</span>
                <h2 className={`font-bold text-sm tracking-wider uppercase ${GROUP_COLORS[group.group]}`}>
                  {group.group}
                </h2>
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-white/20 text-xs">
                  Class {group.classes[0].number}
                  {group.classes.length > 1 && `–${group.classes[group.classes.length - 1].number}`}
                </span>
              </div>

              {/* Class grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                {group.classes.map((cls, i) => (
                  <ClassCard
                    key={cls.number}
                    classInfo={cls}
                    isSelected={selectedClass === cls.number}
                    onSelect={setSelectedClass}
                    index={gi * 5 + i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-between pt-4 border-t border-white/[0.06]"
        >
          <p className="text-white/30 text-sm">
            {selectedClass ? (
              <span className="text-[#FF6B35]">✓ Class {selectedClass} selected</span>
            ) : (
              "Tap a class to select"
            )}
          </p>

          <motion.button
            whileHover={selectedClass ? { scale: 1.03, y: -1 } : {}}
            whileTap={selectedClass ? { scale: 0.97 } : {}}
            disabled={!selectedClass}
            className={`
              flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm
              transition-all duration-200 outline-none
              ${selectedClass
                ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30 cursor-pointer"
                : "bg-white/5 text-white/25 cursor-not-allowed"
              }
            `}
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
