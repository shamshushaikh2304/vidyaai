import type { ReactElement } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Achievement } from "../../types/home";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AchievementBadgeProps {
  achievement: Achievement;
  /** "default" = vertical badge. "compact" = small horizontal inline badge. */
  variant?: "default" | "compact";
  onClick?: () => void;
  className?: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────

/** Unlocked ring pulses gently and continuously. */
const RING_PULSE_VARIANTS = {
  idle:   { scale: 1,    opacity: 0.55 },
  pulse:  { scale: 1.18, opacity: 0    },
} as const;

/** Badge entrance — scales in from slightly below. */
const BADGE_ENTRANCE_VARIANTS = {
  hidden:  { opacity: 0, scale: 0.82, y: 6  },
  visible: { opacity: 1, scale: 1,    y: 0  },
} as const;

/** Hover: lift + grow slightly. */
const HOVER_VARIANTS = {
  rest:  { scale: 1,    y: 0   },
  hover: { scale: 1.06, y: -3  },
} as const;

const TRANSITION_ENTRANCE = {
  duration: 0.45,
  ease:     [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

const TRANSITION_HOVER = {
  duration: 0.2,
  ease:     "easeOut",
} as const;

// ─── LockOverlay ─────────────────────────────────────────────────────────────

function LockOverlay(): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full flex items-center justify-center"
      style={{ background: "rgba(6,6,8,0.62)" }}
    >
      <svg
        className="w-5 h-5 text-white/35"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    </div>
  );
}

// ─── UnlockedRing ─────────────────────────────────────────────────────────────
/** Animated pulsing gold ring shown only for unlocked achievements. */

function UnlockedRing(): React.ReactElement {
  return (
    <>
      {/* Static ring */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "0 0 0 2px rgba(200,169,110,0.5)",
        }}
      />
      {/* Animated pulse ring */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "0 0 0 2px rgba(200,169,110,0.55)",
        }}
        variants={RING_PULSE_VARIANTS}
        initial="idle"
        animate="pulse"
        transition={{
          duration:   1.8,
          repeat:     Infinity,
          ease:       "easeOut",
          repeatType: "loop",
        }}
      />
      {/* Gold outer glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset:        -8,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(200,169,110,0.18) 0%, transparent 70%)",
          zIndex:       -1,
        }}
      />
    </>
  );
}

// ─── IconCircle ───────────────────────────────────────────────────────────────

interface IconCircleProps {
  achievement: Achievement;
  size:        number;        // px diameter of the outer circle
  compact:     boolean;
}

function IconCircle({ achievement, size, compact }: IconCircleProps): React.ReactElement {
  const { unlocked, icon } = achievement;
  const fontSize = compact ? 18 : size * 0.38;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Background circle */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: unlocked
            ? "linear-gradient(145deg, #1f1500 0%, #120d00 100%)"
            : "linear-gradient(145deg, #141416 0%, #0e0e10 100%)",
          border:  unlocked
            ? "1px solid rgba(200,169,110,0.15)"
            : "1px solid rgba(255,255,255,0.06)",
        }}
      />

      {/* Subtle radial glow for unlocked */}
      {unlocked && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(200,169,110,0.18) 0%, transparent 65%)",
          }}
        />
      )}

      {/* Emoji icon */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{ filter: unlocked ? "none" : "grayscale(1) brightness(0.45)" }}
      >
        <span
          aria-hidden="true"
          className="select-none leading-none"
          style={{ fontSize }}
          role="img"
        >
          {icon}
        </span>
      </div>

      {/* Unlocked animated ring */}
      {unlocked && <UnlockedRing />}

      {/* Locked overlay */}
      {!unlocked && <LockOverlay />}
    </div>
  );
}

// ─── GoldShimmer ─────────────────────────────────────────────────────────────
/** A subtle shimmer sweep that plays once on mount for unlocked badges. */

function GoldShimmer(): React.ReactElement {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.4, duration: 0.4 }}
    >
      <motion.div
        className="absolute inset-y-0 w-[40%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(200,169,110,0.22) 50%, transparent 100%)",
          transform: "skewX(-12deg)",
        }}
        initial={{ left: "-40%" }}
        animate={{ left: "140%" }}
        transition={{ delay: 0.55, duration: 0.65, ease: "easeIn" }}
      />
    </motion.div>
  );
}

// ─── AchievementBadge ─────────────────────────────────────────────────────────

export default function AchievementBadge({
  achievement,
  variant   = "default",
  onClick,
  className = "",
}: AchievementBadgeProps): React.ReactElement {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const compact = variant === "compact";

  const circleSize = compact ? 44 : 64;

  const isInteractive = typeof onClick === "function";

  return (
    <motion.div
      ref={ref}
      role={isInteractive ? "button" : "article"}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={`${achievement.title}${achievement.unlocked ? " – Unlocked" : " – Locked"}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={[
        "group relative",
        compact ? "flex items-center gap-3" : "flex flex-col items-center gap-2.5",
        isInteractive ? "cursor-pointer outline-none" : "",
        isInteractive
          ? "focus-visible:ring-2 focus-visible:ring-[#c8a96e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060608]"
          : "",
        compact ? "rounded-lg" : "rounded-xl",
        compact ? "w-full px-3.5 py-2.5" : `w-[${circleSize + 32}px]`,
        compact
          ? achievement.unlocked
            ? "bg-[#0e0c06] border border-[rgba(200,169,110,0.12)]"
            : "bg-[#111113] border border-[rgba(255,255,255,0.05)]"
          : "",
        className,
      ].join(" ")}
      variants={HOVER_VARIANTS}
      initial={isInteractive ? "rest" : undefined}
      whileHover={isInteractive ? "hover" : undefined}
      animate={isInteractive ? "rest" : undefined}
      transition={TRANSITION_HOVER}
    >
      {/* ── Entrance animation wrapper ──────────────────────────────────── */}
      <motion.div
        className={[
          "relative",
          compact ? "flex items-center gap-3 w-full" : "flex flex-col items-center gap-2.5",
        ].join(" ")}
        variants={BADGE_ENTRANCE_VARIANTS}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={TRANSITION_ENTRANCE}
      >
        {/* Icon circle */}
        <div className="relative flex-shrink-0" style={{ width: circleSize, height: circleSize }}>
          <IconCircle
            achievement={achievement}
            size={circleSize}
            compact={compact}
          />
          {/* One-time gold shimmer on mount for unlocked */}
          {achievement.unlocked && <GoldShimmer />}
        </div>

        {/* Text block */}
        <div
          className={[
            compact ? "flex-1 min-w-0" : "text-center",
          ].join(" ")}
        >
          {/* Unlocked / Locked label */}
          {!compact && (
            <div className="mb-0.5">
              {achievement.unlocked ? (
                <span
                  className="text-[9px] font-bold tracking-[0.14em] uppercase"
                  style={{ color: "#c8a96e" }}
                >
                  Unlocked
                </span>
              ) : (
                <span className="text-[9px] font-bold tracking-[0.14em] uppercase text-[rgba(240,237,232,0.2)]">
                  Locked
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h4
            className={[
              "font-bold leading-snug",
              compact ? "text-[13px] truncate" : "text-[12px] line-clamp-2",
              achievement.unlocked
                ? "text-[#f0ede8]"
                : "text-[rgba(240,237,232,0.3)]",
            ].join(" ")}
          >
            {achievement.title}
          </h4>

          {/* Description */}
          <p
            className={[
              "mt-0.5 leading-snug",
              compact ? "text-[11px] truncate" : "text-[11px] line-clamp-2",
              achievement.unlocked
                ? "text-[rgba(240,237,232,0.42)]"
                : "text-[rgba(240,237,232,0.18)]",
            ].join(" ")}
          >
            {achievement.description}
          </p>

          {/* Compact: unlocked/locked inline */}
          {compact && (
            <div className="mt-1">
              {achievement.unlocked ? (
                <span
                  className="text-[10px] font-bold tracking-wider uppercase"
                  style={{ color: "#c8a96e" }}
                >
                  ✦ Unlocked
                </span>
              ) : (
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[rgba(240,237,232,0.22)]">
                  Locked
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Hover glow for unlocked interactive badges ───────────────────── */}
      {achievement.unlocked && isInteractive && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(200,169,110,0.06) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
}
