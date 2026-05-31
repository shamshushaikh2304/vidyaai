import type { ReactElement } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Show } from "../../types/home";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShowCardProps {
  show: Show;
  onClick?: () => void;
  /** "poster" = tall 2:3 card (recommended row). "wide" = 16:9 card (subjects row). */
  variant?: "poster" | "wide";
  className?: string;
}

interface SubjectMeta {
  gradient: [string, string]; // [from, to]
  accent:   string;
  text:     string;           // lighter text shade
  emoji:    string;
}

// ─── Subject theming ──────────────────────────────────────────────────────────

const SUBJECT_META: Record<string, SubjectMeta> = {
  Mathematics: {
    gradient: ["#100528", "#060214"],
    accent:   "#7c5cfc",
    text:     "#a78bfa",
    emoji:    "📐",
  },
  Science: {
    gradient: ["#001c19", "#000e0d"],
    accent:   "#1aadaa",
    text:     "#5eead4",
    emoji:    "🔬",
  },
  English: {
    gradient: ["#200800", "#0f0400"],
    accent:   "#e8601c",
    text:     "#fb923c",
    emoji:    "📖",
  },
  History: {
    gradient: ["#1a1000", "#0d0800"],
    accent:   "#c8a96e",
    text:     "#d4a853",
    emoji:    "🏛",
  },
  Physics: {
    gradient: ["#001020", "#000810"],
    accent:   "#3b82f6",
    text:     "#60a5fa",
    emoji:    "⚛️",
  },
  Chemistry: {
    gradient: ["#001510", "#000d08"],
    accent:   "#10b981",
    text:     "#34d399",
    emoji:    "🧪",
  },
  Geography: {
    gradient: ["#001015", "#00080d"],
    accent:   "#06b6d4",
    text:     "#67e8f9",
    emoji:    "🌍",
  },
} as const;

const DEFAULT_META: SubjectMeta = {
  gradient: ["#141416", "#0e0e10"],
  accent:   "#c8a96e",
  text:     "#e8d5a8",
  emoji:    "📚",
};

function getSubjectMeta(subject: string): SubjectMeta {
  return SUBJECT_META[subject] ?? DEFAULT_META;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const CARD_VARIANTS = {
  rest:  { scale: 1,    y: 0    },
  hover: { scale: 1.05, y: -5   },
} as const;

const OVERLAY_VARIANTS = {
  rest:  { opacity: 0 },
  hover: { opacity: 1 },
} as const;

const INFO_VARIANTS = {
  rest:  { opacity: 0, y: 8  },
  hover: { opacity: 1, y: 0  },
} as const;

const TRANSITION_CARD    = { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] } as const;
const TRANSITION_OVERLAY = { duration: 0.18, ease: "easeOut" }                 as const;
const TRANSITION_INFO    = { duration: 0.2,  ease: "easeOut", delay: 0.03 }    as const;

// ─── Poster fallback ──────────────────────────────────────────────────────────

interface PosterFallbackProps {
  meta:    SubjectMeta;
  title:   string;
  variant: "poster" | "wide";
}

function PosterFallback({ meta, title, variant }: PosterFallbackProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        background: `linear-gradient(150deg, ${meta.gradient[0]} 0%, ${meta.gradient[1]} 100%)`,
      }}
    >
      {/* Accent ring behind emoji */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width:     variant === "poster" ? 56 : 48,
          height:    variant === "poster" ? 56 : 48,
          background: `${meta.accent}18`,
          boxShadow: `0 0 32px ${meta.accent}28`,
        }}
      >
        <span
          className="select-none"
          style={{ fontSize: variant === "poster" ? 28 : 22 }}
        >
          {meta.emoji}
        </span>
      </div>

      {/* Title in fallback */}
      <span
        className="text-center px-3 leading-tight line-clamp-2 font-bold"
        style={{
          fontSize: variant === "poster" ? 13 : 12,
          color:    meta.text,
          opacity:  0.8,
        }}
      >
        {title}
      </span>
    </div>
  );
}

// ─── Metadata pills ───────────────────────────────────────────────────────────

interface MetaPillProps {
  label: string;
  accent: string;
}

function MetaPill({ label, accent }: MetaPillProps): React.ReactElement {
  return (
    <span
      className="text-[10px] font-bold tracking-wider uppercase px-2 py-[3px] rounded leading-none whitespace-nowrap"
      style={{
        background: `${accent}1a`,
        color:       accent,
        border:     `1px solid ${accent}35`,
      }}
    >
      {label}
    </span>
  );
}

// ─── ShowCard ─────────────────────────────────────────────────────────────────

export default function ShowCard({
  show,
  onClick,
  variant   = "poster",
  className = "",
}: ShowCardProps): React.ReactElement {
  const [imgError, setImgError] = useState<boolean>(false);

  const meta        = getSubjectMeta(show.subject);
  const isPoster    = variant === "poster";
  const aspectClass = isPoster ? "aspect-[2/3]" : "aspect-video";
  const widthClass  = isPoster
    ? "w-[140px] sm:w-[160px] md:w-[180px]"
    : "w-[200px] sm:w-[240px] md:w-[280px]";

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${show.title} – ${show.subject} · ${show.board} ${show.className}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={[
        "group relative flex-shrink-0",
        widthClass,
        "cursor-pointer select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#c8a96e] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#060608] rounded-xl",
        className,
      ].join(" ")}
      variants={CARD_VARIANTS}
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={TRANSITION_CARD}
      style={{ willChange: "transform" }}
    >
      {/* ── Poster / art area ─────────────────────────────────────────────── */}
      <div
        className={[
          "relative w-full overflow-hidden rounded-xl bg-[#141416]",
          aspectClass,
        ].join(" ")}
        style={{
          boxShadow: `0 2px 16px rgba(0,0,0,0.55)`,
          backfaceVisibility: "hidden",
        }}
      >
        {/* Poster image */}
        {!imgError ? (
          <img
            src={show.posterUrl}
            alt={show.title}
            draggable={false}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <PosterFallback meta={meta} title={show.title} variant={variant} />
        )}

        {/* Permanent gradient overlay – bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: isPoster
              ? "linear-gradient(to top, rgba(6,6,8,0.90) 0%, rgba(6,6,8,0.20) 45%, transparent 100%)"
              : "linear-gradient(to top, rgba(6,6,8,0.85) 0%, transparent 50%)",
          }}
        />

        {/* Accent glow in top-right corner */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width:    "60%",
            height:   "40%",
            background: `radial-gradient(ellipse at top right, ${meta.accent}16 0%, transparent 70%)`,
          }}
        />

        {/* Hover overlay */}
        <motion.div
          aria-hidden="true"
          variants={OVERLAY_VARIANTS}
          transition={TRANSITION_OVERLAY}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: "rgba(0,0,0,0.28)" }}
        />

        {/* Subject tag – always visible bottom-left of poster */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
          <MetaPill label={show.subject} accent={meta.accent} />
        </div>

        {/* Hover: slide-up info panel */}
        {isPoster && (
          <motion.div
            variants={INFO_VARIANTS}
            transition={TRANSITION_INFO}
            className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none"
          >
            {/* Board + class row */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-semibold text-[rgba(240,237,232,0.5)] tracking-wide">
                {show.board}
              </span>
              <span
                aria-hidden="true"
                className="text-[rgba(240,237,232,0.2)] text-[10px]"
              >
                ·
              </span>
              <span className="text-[10px] font-semibold text-[rgba(240,237,232,0.5)] tracking-wide">
                {show.className}
              </span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-[rgba(240,237,232,0.45)] leading-relaxed line-clamp-2">
              {show.description}
            </p>
          </motion.div>
        )}

        {/* Wide variant: hover info overlay */}
        {!isPoster && (
          <motion.div
            variants={INFO_VARIANTS}
            transition={TRANSITION_INFO}
            className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none"
          >
            <p className="text-[11px] text-[rgba(240,237,232,0.5)] line-clamp-1 leading-snug">
              {show.board} · {show.className}
            </p>
          </motion.div>
        )}
      </div>

      {/* ── Info below poster (only for wide variant) ─────────────────────── */}
      {!isPoster && (
        <div className="mt-2 px-0.5">
          <h3 className="text-[13px] font-semibold text-[#f0ede8] line-clamp-1 leading-snug group-hover:text-[#c8a96e] transition-colors duration-200">
            {show.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[11px] font-semibold" style={{ color: meta.text }}>
              {show.subject}
            </span>
            <span
              aria-hidden="true"
              className="text-[rgba(240,237,232,0.2)] text-[10px]"
            >
              ·
            </span>
            <span className="text-[11px] text-[rgba(240,237,232,0.4)]">
              {show.className}
            </span>
          </div>
        </div>
      )}

      {/* ── Poster title (below the poster card) ──────────────────────────── */}
      {isPoster && (
        <div className="mt-2 px-0.5">
          <h3 className="text-[12px] font-semibold text-[#f0ede8] line-clamp-2 leading-snug group-hover:text-[#c8a96e] transition-colors duration-200">
            {show.title}
          </h3>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[10px]" style={{ color: meta.text, opacity: 0.8 }}>
              {show.board}
            </span>
            <span
              aria-hidden="true"
              className="text-[rgba(240,237,232,0.2)] text-[10px]"
            >
              ·
            </span>
            <span className="text-[10px] text-[rgba(240,237,232,0.4)]">
              {show.className}
            </span>
          </div>
        </div>
      )}
    </motion.article>
  );
}
