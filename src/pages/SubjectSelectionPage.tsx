// ─────────────────────────────────────────────────────────────────────────────
// SubjectSelectionPage.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSubjectsForBoardAndClass, getBoardById } from "../data/curriculum";
import SubjectCard from "../components/onboarding/SubjectCard";
import { useOnboardingStore } from "../store/onboardingStore";

export default function SubjectSelectionPage() {
  const {
    selectedBoard,
    selectedClass,
    selectedSubjects,
    toggleSubject,
    setSelectedSubjects,
    goBack,
    goNext,
    userRole,
  } = useOnboardingStore();

  const board = selectedBoard ? getBoardById(selectedBoard) : null;

  const subjects = useMemo(
    () =>
      selectedBoard && selectedClass
        ? getSubjectsForBoardAndClass(selectedBoard, selectedClass)
        : [],
    [selectedBoard, selectedClass]
  );

  const coreSubjects = subjects.filter((s) => s.isCore);
  const optionalSubjects = subjects.filter((s) => !s.isCore);

  const selectAll = () => setSelectedSubjects(subjects.map((s) => s.id));
  const selectCore = () => setSelectedSubjects(coreSubjects.map((s) => s.id));
  const clearAll = () => setSelectedSubjects([]);

  const selectedCount = selectedSubjects.length;
  const canProceed = selectedCount > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00C9A7 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-5 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          {/* Back + Logo */}
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

          {/* Breadcrumb */}
          {board && selectedClass && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-4 flex-wrap"
            >
              <span className="text-base">{board.flag}</span>
              <span className="text-white/50 text-xs">{board.name}</span>
              <svg className="w-3 h-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-white/50 text-xs">Class {selectedClass}</span>
              <svg className="w-3 h-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              <span className="text-[#FF6B35] text-xs font-semibold">Subjects</span>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Pick your <span className="text-[#FF6B35]">Subjects</span>
              </h1>
              <p className="text-white/45 mt-2 text-sm sm:text-base">
                {userRole === "parent"
                  ? "Select all subjects your child studies"
                  : "Select all subjects you want to learn"}
              </p>
            </div>

            {/* Quick-select buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={selectCore}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#FF6B35]/30 text-[#FF6B35]/80 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-all outline-none"
              >
                Core only
              </button>
              <button
                onClick={selectAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 text-white/50 hover:bg-white/[0.06] hover:text-white transition-all outline-none"
              >
                Select all
              </button>
              {selectedCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearAll}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 text-white/30 hover:text-white/60 transition-all outline-none"
                >
                  Clear
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Subjects */}
        <div className="flex-1 overflow-y-auto space-y-8">

          {/* Core subjects */}
          {coreSubjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-white/70 uppercase tracking-wider">
                  Core Subjects
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] font-semibold">
                  {coreSubjects.filter((s) => selectedSubjects.includes(s.id)).length}/{coreSubjects.length}
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {coreSubjects.map((subject, i) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    isSelected={selectedSubjects.includes(subject.id)}
                    onToggle={toggleSubject}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Optional subjects */}
          {optionalSubjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-white/70 uppercase tracking-wider">
                  Optional Subjects
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50 font-semibold">
                  {optionalSubjects.filter((s) => selectedSubjects.includes(s.id)).length}/{optionalSubjects.length}
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {optionalSubjects.map((subject, i) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    isSelected={selectedSubjects.includes(subject.id)}
                    onToggle={toggleSubject}
                    index={coreSubjects.length + i}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 pt-4 border-t border-white/[0.06]"
        >
          {/* Selected chips */}
          <AnimatePresence>
            {selectedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mb-4 overflow-hidden"
              >
                {selectedSubjects.map((id) => {
                  const subject = subjects.find((s) => s.id === id);
                  if (!subject) return null;
                  return (
                    <motion.span
                      key={id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `${subject.color}18`,
                        color: subject.color,
                        border: `1px solid ${subject.color}35`,
                      }}
                    >
                      {subject.icon} {subject.name}
                      <button
                        onClick={() => toggleSubject(id)}
                        className="opacity-60 hover:opacity-100 transition-opacity ml-0.5"
                      >
                        ×
                      </button>
                    </motion.span>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <p className="text-white/30 text-sm">
              {selectedCount === 0 ? (
                "Select at least one subject"
              ) : (
                <span className="text-[#FF6B35]">
                  ✓ {selectedCount} subject{selectedCount > 1 ? "s" : ""} selected
                </span>
              )}
            </p>

            <motion.button
              whileHover={canProceed ? { scale: 1.03, y: -1 } : {}}
              whileTap={canProceed ? { scale: 0.97 } : {}}
              disabled={!canProceed}
              onClick={goNext}
              className={`
                flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm
                transition-all duration-200 outline-none
                ${canProceed
                  ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30 cursor-pointer"
                  : "bg-white/5 text-white/25 cursor-not-allowed"
                }
              `}
            >
              Start Learning
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
