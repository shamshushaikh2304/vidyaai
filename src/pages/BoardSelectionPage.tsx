// ─────────────────────────────────────────────────────────────────────────────
// BoardSelectionPage.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { BOARDS } from "../data/curriculum";
import BoardCard from "../components/onboarding/BoardCard";
import { useOnboardingStore } from "../store/onboardingStore";

export default function BoardSelectionPage() {
  const { selectedBoard, setSelectedBoard, userRole, userName } = useOnboardingStore();

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #845EC2 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-5 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B35] flex items-center justify-center">
              <span className="text-white font-black text-sm">V</span>
            </div>
            <span className="font-black text-lg">VidyaAI</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <p className="text-white/40 text-sm mb-1">
              Welcome, <span className="text-[#FF6B35] font-semibold">{userName || "there"}</span> 👋
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Choose your{" "}
              <span className="text-[#FF6B35]">Board</span>
            </h1>
            <p className="text-white/45 mt-2 text-sm sm:text-base">
              {userRole === "parent"
                ? "Select the board your child is studying under"
                : "Select the board you're studying under"}
            </p>
          </motion.div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {BOARDS.map((board, i) => (
            <BoardCard
              key={board.id}
              board={board}
              isSelected={selectedBoard === board.id}
              onSelect={setSelectedBoard}
              index={i}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-8 flex items-center justify-between"
        >
          <p className="text-white/30 text-sm">
            {selectedBoard ? (
              <span className="text-[#FF6B35]">✓ Board selected</span>
            ) : (
              "Tap a board to select"
            )}
          </p>

          <motion.button
            whileHover={selectedBoard ? { scale: 1.03, y: -1 } : {}}
            whileTap={selectedBoard ? { scale: 0.97 } : {}}
            disabled={!selectedBoard}
            className={`
              flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm
              transition-all duration-200 outline-none
              ${selectedBoard
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
