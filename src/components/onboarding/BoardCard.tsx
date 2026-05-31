// ─────────────────────────────────────────────────────────────────────────────
// BoardCard.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import type { Board } from "../../data/curriculum";

interface BoardCardProps {
  board: Board;
  isSelected: boolean;
  onSelect: (id: Board["id"]) => void;
  index: number;
}

export default function BoardCard({
  board,
  isSelected,
  onSelect,
  index,
}: BoardCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(board.id)}
      className={`
        relative w-full text-left rounded-2xl p-5 cursor-pointer
        border transition-all duration-300 outline-none group
        bg-gradient-to-br
        ${board.accent}
        ${
          isSelected
            ? `${board.border} shadow-lg shadow-black/40 ring-2 ring-[#FF6B35]/60`
            : "border-white/10 hover:border-white/25"
        }
        backdrop-blur-md bg-white/[0.03]
      `}
    >
      {/* Selected glow */}
      {isSelected && (
        <motion.div
          layoutId="board-glow"
          className="absolute inset-0 rounded-2xl bg-[#FF6B35]/10 pointer-events-none"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}

      {/* Check badge */}
      <div
        className={`
          absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${isSelected ? "bg-[#FF6B35] border-[#FF6B35]" : "border-white/20 bg-transparent"}
        `}
      >
        {isSelected && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </div>

      {/* Flag */}
      <div className="text-3xl mb-3 leading-none">{board.flag}</div>

      {/* Name */}
      <h3 className="font-bold text-white text-lg leading-tight mb-1">
        {board.name}
      </h3>

      {/* Full name */}
      <p className="text-white/50 text-xs mb-3 leading-snug line-clamp-1">
        {board.fullName}
      </p>

      {/* Description */}
      <p className="text-white/40 text-xs leading-relaxed">
        {board.description}
      </p>

      {/* Hover shine */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />
    </motion.button>
  );
}
