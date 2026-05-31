// ─────────────────────────────────────────────────────────────────────────────
// SubjectCard.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import type { Subject } from "../../data/curriculum";

interface SubjectCardProps {
  subject: Subject;
  isSelected: boolean;
  onToggle: (id: string) => void;
  index: number;
}

export default function SubjectCard({
  subject,
  isSelected,
  onToggle,
  index,
}: SubjectCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.38, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onToggle(subject.id)}
      className={`
        relative w-full text-left rounded-2xl p-4 cursor-pointer
        border transition-all duration-250 outline-none group
        backdrop-blur-md bg-white/[0.03]
      `}
      style={{
        borderColor: isSelected ? subject.color + "66" : "rgba(255,255,255,0.08)",
        boxShadow: isSelected ? `0 0 20px ${subject.color}25` : "none",
        background: isSelected ? `${subject.color}12` : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Selected glow */}
      {isSelected && (
        <motion.div
          layoutId={`subj-glow-${subject.id}`}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `${subject.color}0e` }}
          transition={{ type: "spring", bounce: 0.15 }}
        />
      )}

      {/* Check badge */}
      <motion.div
        animate={{ scale: isSelected ? 1 : 0.7, opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ background: subject.color }}
      >
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
        style={{ background: `${subject.color}20` }}
      >
        {subject.icon}
      </div>

      {/* Name */}
      <h4
        className="font-semibold text-sm leading-tight mb-1 transition-colors duration-200"
        style={{ color: isSelected ? subject.color : "rgba(255,255,255,0.9)" }}
      >
        {subject.name}
      </h4>

      {/* Description */}
      <p className="text-white/35 text-xs leading-relaxed line-clamp-2">
        {subject.description}
      </p>

      {/* Core badge */}
      {subject.isCore && (
        <div className="mt-2 inline-flex items-center gap-1">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${subject.color}20`, color: subject.color }}
          >
            Core
          </span>
        </div>
      )}

      {/* Hover shine */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />
    </motion.button>
  );
}
