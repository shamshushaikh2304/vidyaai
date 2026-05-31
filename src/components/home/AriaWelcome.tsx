import type { ReactElement } from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import type { User } from "../../types/home";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AriaWelcomeProps {
  /** Typed exactly as home.ts: User { id, name, avatar?, streak, completedEpisodes } */
  user: User;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden:  { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const STAT_VARIANTS = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay:    0.2 + i * 0.07,
      duration: 0.38,
      ease:     [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    },
  }),
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns "Good morning / afternoon / evening" based on client hour. */
function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Derives initials from a name for the avatar fallback.
 * "Arjun Sharma" → "AS", "Arjun" → "A"
 */
function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// ─── AvatarCircle ─────────────────────────────────────────────────────────────

interface AvatarCircleProps {
  user: User;
}

function AvatarCircle({ user }: AvatarCircleProps): ReactElement {
  // user.avatar is optional — show image when present, initials fallback otherwise
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        draggable={false}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        style={{
          border:     "1.5px solid rgba(200,169,110,0.35)",
          boxShadow:  "0 0 12px rgba(200,169,110,0.18)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold select-none"
      style={{
        background: "linear-gradient(145deg, #1f1500, #120d00)",
        border:     "1.5px solid rgba(200,169,110,0.30)",
        color:      "#c8a96e",
        boxShadow:  "0 0 10px rgba(200,169,110,0.14)",
      }}
    >
      {initials(user.name)}
    </div>
  );
}

// ─── StatChip ─────────────────────────────────────────────────────────────────

interface StatChipProps {
  icon:    string;
  value:   string | number;
  label:   string;
  accent:  string;
  index:   number;
}

function StatChip({ icon, value, label, accent, index }: StatChipProps): ReactElement {
  return (
    <motion.div
      aria-label={`${label}: ${value}`}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
      style={{
        background: `${accent}12`,
        border:     `1px solid ${accent}28`,
      }}
      custom={index}
      variants={STAT_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <span aria-hidden="true" className="text-[14px] leading-none select-none">
        {icon}
      </span>
      <span
        className="text-[12px] font-bold leading-none"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="text-[11px] font-medium text-[rgba(240,237,232,0.38)] leading-none">
        {label}
      </span>
    </motion.div>
  );
}

// ─── AriaWelcome ─────────────────────────────────────────────────────────────

export default function AriaWelcome({
  user,
  className = "",
}: AriaWelcomeProps): ReactElement {
  // Memoised so greeting() doesn't re-compute on every render
  const greetingText = useMemo(() => greeting(), []);

  return (
    <motion.div
      aria-label={`Welcome section for ${user.name}`}
      className={[
        "flex items-center justify-between gap-4 flex-wrap",
        className,
      ].join(" ")}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {/* ── Left: avatar + greeting ──────────────────────────────── */}
      <div className="flex items-center gap-3 min-w-0">
        <AvatarCircle user={user} />

        <div className="min-w-0">
          {/* Greeting line */}
          <p className="text-[11px] font-medium text-[rgba(240,237,232,0.4)] leading-none mb-0.5 tracking-wide">
            {greetingText}
          </p>

          {/* Name */}
          <h2
            className="text-[17px] font-black text-[#f0ede8] leading-tight truncate"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {user.name}
          </h2>
        </div>
      </div>

      {/* ── Right: stat chips ────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Streak — uses user.streak (number, always present) */}
        <StatChip
          icon="🔥"
          value={user.streak}
          label={user.streak === 1 ? "day streak" : "day streak"}
          accent="#e8601c"
          index={0}
        />

        {/* Completed episodes — uses user.completedEpisodes (number, always present) */}
        <StatChip
          icon="⭐"
          value={user.completedEpisodes}
          label={user.completedEpisodes === 1 ? "episode" : "episodes"}
          accent="#c8a96e"
          index={1}
        />
      </div>
    </motion.div>
  );
}
