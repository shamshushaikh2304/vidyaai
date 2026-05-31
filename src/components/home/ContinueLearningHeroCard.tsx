import type { ReactElement } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ContinueLearningEpisode } from "../../types/home";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContinueLearningHeroCardProps {
  /** Typed exactly as home.ts: ContinueLearningEpisode extends Episode { heroImage }  */
  episode: ContinueLearningEpisode;
  onPlay?: () => void;
  onMoreInfo?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/** Fallback gradient when heroImage (and thumbnailUrl) both 404. */
const FALLBACK_GRADIENT =
  "linear-gradient(135deg, #2d0a00 0%, #0d0520 50%, #060608 100%)";

const HERO_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const CONTENT_VARIANTS = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 },
  },
} as const;

const BUTTON_HOVER = { scale: 1.04, y: -1 } as const;
const BUTTON_TAP   = { scale: 0.97 }        as const;
const BUTTON_TRANS = { duration: 0.18, ease: "easeOut" } as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function clampPct(n: number): number {
  return Math.min(Math.max(Math.round(n), 0), 100);
}

/** "S1 E3" */
function epLabel(episode: ContinueLearningEpisode): string {
  return `S${episode.seasonNumber} · E${episode.episodeNumber}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlayIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="w-[18px] h-[18px] text-[#060608] ml-[2px]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function InfoIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="w-[16px] h-[16px] text-[#f0ede8]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

// ─── HeroBackground ───────────────────────────────────────────────────────────
// Attempts heroImage first (the field unique to ContinueLearningEpisode),
// falls back to thumbnailUrl (inherited from Episode), then to gradient.

interface HeroBackgroundProps {
  episode: ContinueLearningEpisode;
}

function HeroBackground({ episode }: HeroBackgroundProps): ReactElement {
  // Two-stage fallback: heroImage → thumbnailUrl → CSS gradient
  const [heroBroken,  setHeroBroken]  = useState<boolean>(false);
  const [thumbBroken, setThumbBroken] = useState<boolean>(false);

  if (!heroBroken) {
    return (
      <img
        src={episode.heroImage}
        alt=""
        aria-hidden="true"
        draggable={false}
        onError={() => setHeroBroken(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  if (!thumbBroken) {
    return (
      <img
        src={episode.thumbnailUrl}
        alt=""
        aria-hidden="true"
        draggable={false}
        onError={() => setThumbBroken(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: FALLBACK_GRADIENT }}
    />
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  percentage: number;
}

function HeroProgressBar({ percentage }: ProgressBarProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.1]"
    >
      <div
        className="h-full"
        style={{
          width:      `${percentage}%`,
          background: "#c8a96e",
          transition: "none",
        }}
      />
    </div>
  );
}

// ─── ContinueLearningHeroCard ─────────────────────────────────────────────────

export default function ContinueLearningHeroCard({
  episode,
  onPlay,
  onMoreInfo,
}: ContinueLearningHeroCardProps): ReactElement {
  const pct = clampPct(episode.progressPercentage);

  // Minutes remaining: only available if duration is a "N min" string
  const minutesRemaining = (() => {
    const match = episode.duration.match(/^(\d+)/);
    if (!match) return null;
    const total   = parseInt(match[1], 10);
    const elapsed = Math.round((pct / 100) * total);
    const left    = total - elapsed;
    return left > 0 ? `${left} min left` : null;
  })();

  return (
    <motion.section
      aria-label={`Continue learning: ${episode.title}`}
      className="relative w-full overflow-hidden bg-[#060608]"
      style={{
        // 21:9 on desktop, 16:9 on mobile — clamp the height
        aspectRatio: "21 / 9",
        minHeight: "280px",
        maxHeight: "520px",
      }}
      variants={HERO_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {/* ── Background image (heroImage → thumbnailUrl → gradient) ──── */}
      <HeroBackground episode={episode} />

      {/* ── Vignettes ──────────────────────────────────────────────── */}
      {/* Left-to-right: content lives on the left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.55) 35%, rgba(6,6,8,0.1) 65%, transparent 100%)",
        }}
      />
      {/* Bottom-to-top: ground the text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,6,8,0.85) 0%, rgba(6,6,8,0.3) 30%, transparent 60%)",
        }}
      />
      {/* Top fade: nav bleed */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(6,6,8,0.5) 0%, transparent 100%)",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 md:px-14 pb-8 sm:pb-10"
        variants={CONTENT_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        {/* Ep label + show title */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[rgba(240,237,232,0.55)] bg-black/40 backdrop-blur-[4px] px-2 py-[3px] rounded">
            {epLabel(episode)}
          </span>
          <span
            aria-hidden="true"
            className="text-[rgba(240,237,232,0.2)] text-xs"
          >
            ·
          </span>
          <span className="text-[11px] font-semibold text-[rgba(240,237,232,0.55)] tracking-wide">
            {episode.showTitle}
          </span>
        </div>

        {/* Episode title — cinematic display type */}
        <h1
          className="font-black text-[#f0ede8] leading-[1.05] tracking-tight mb-2"
          style={{
            fontFamily: "'Bebas Neue', 'DM Sans', sans-serif",
            fontSize:   "clamp(28px, 5vw, 52px)",
          }}
        >
          {episode.title}
        </h1>

        {/* Description */}
        <p className="text-[13px] sm:text-[14px] text-[rgba(240,237,232,0.55)] leading-relaxed line-clamp-2 max-w-[420px] mb-1">
          {episode.description}
        </p>

        {/* Duration + progress hint */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] text-[rgba(240,237,232,0.38)] font-medium">
            {episode.duration}
          </span>
          {minutesRemaining && (
            <>
              <span
                aria-hidden="true"
                className="text-[rgba(240,237,232,0.2)] text-[10px]"
              >
                ·
              </span>
              <span className="text-[11px] text-[#c8a96e] font-semibold">
                {minutesRemaining}
              </span>
            </>
          )}
          {pct > 0 && !minutesRemaining && (
            <>
              <span
                aria-hidden="true"
                className="text-[rgba(240,237,232,0.2)] text-[10px]"
              >
                ·
              </span>
              <span className="text-[11px] text-[#c8a96e] font-semibold">
                {pct}% complete
              </span>
            </>
          )}
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            aria-label={`Resume ${episode.title}`}
            onClick={onPlay}
            whileHover={BUTTON_HOVER}
            whileTap={BUTTON_TAP}
            transition={BUTTON_TRANS}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[13px] tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]"
            style={{
              background: "#c8a96e",
              color:      "#060608",
              boxShadow:  "0 4px 20px rgba(200,169,110,0.35)",
            }}
          >
            <PlayIcon />
            Resume
          </motion.button>

          <motion.button
            type="button"
            aria-label={`More info about ${episode.title}`}
            onClick={onMoreInfo}
            whileHover={BUTTON_HOVER}
            whileTap={BUTTON_TAP}
            transition={BUTTON_TRANS}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[13px] tracking-wide text-[#f0ede8] outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            style={{
              background: "rgba(240,237,232,0.12)",
              border:     "1px solid rgba(240,237,232,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <InfoIcon />
            More Info
          </motion.button>
        </div>
      </motion.div>

      {/* ── Progress bar — 3px gold stripe at the very bottom ─────────── */}
      {pct > 0 && <HeroProgressBar percentage={pct} />}
    </motion.section>
  );
}
