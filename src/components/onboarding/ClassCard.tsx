// ─────────────────────────────────────────────────────────────────────────────
// ClassCard.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import type { ClassInfo } from "../../data/curriculum";

interface ClassCardProps {
  classInfo: ClassInfo;
  isSelected: boolean;
  onSelect: (num: number) => void;
  index: number;
}

const GROUP_COLORS: Record<ClassInfo["group"], string> = {
  Primary:          "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
  Middle:           "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  Secondary:        "from-purple-500/20 to-purple-600/5 border-purple-500/30",
  "Senior Secondary": "from-orange-500/20 to-orange-600/5 border-orange-500/30",
};

const GROUP_ACCENT: Record<ClassInfo["group"], string> = {
  Primary:          "#10b981",
  Middle:           "#3b82f6",
  Secondary:        "#a855f7",
  "Senior Secondary": "#FF6B35",
};

export default function ClassCard({
  classInfo,
  isSelected,
  onSelect,
  index,
}: ClassCardProps) {
  const accentColor = GROUP_ACCENT[classInfo.group];
  const gradientClasses = GROUP_COLORS[classInfo.group];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => onSelect(classInfo.number)}
      className={`
        relative flex flex-col items-center justify-center
        aspect-square rounded-2xl cursor-pointer outline-none
        border bg-gradient-to-br bg-white/[0.03] backdrop-blur-md
        transition-all duration-200 group
        ${gradientClasses}
        ${isSelected
          ? "ring-2 shadow-lg shadow-black/50"
          : "border-white/10 hover:border-white/25"
        }
      `}
      style={
        isSelected
          ? { boxShadow: `0 0 24px ${accentColor}33` }
          : {}
      }
    >
      {/* Selected glow overlay */}
      {isSelected && (
        <motion.div
          layoutId={`class-selected-${classInfo.number}`}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `${accentColor}18` }}
          transition={{ type: "spring", bounce: 0.15 }}
        />
      )}

      {/* Class number */}
      <span
        className="text-3xl font-black leading-none transition-all duration-200"
        style={{ color: isSelected ? accentColor : "rgba(255,255,255,0.85)" }}
      >
        {classInfo.number}
      </span>

      {/* "Class" label */}
      <span className="text-[10px] text-white/40 font-medium mt-1 tracking-wider uppercase">
        Class
      </span>

      {/* Selected check */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ background: accentColor }}
        >
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Hover shine */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-white/[0.05] to-transparent" />
    </motion.button>
  );
}
