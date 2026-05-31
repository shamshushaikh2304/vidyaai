import type { ReactElement } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Episode } from "../../types/home";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EpisodeCardProps {
  episode: Episode;
  onClick?: () => void;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SHOW_GRADIENTS: Record<string, { from: string; to: string }> = {
  "Pizza Planet":   { from: "#2d0a00", to: "#1a0500" },
  "Number Kingdom": { from: "#0d0528", to: "#06021a" },
  default:          { from: "#141416", to: "#0e0e10" },
};

const CARD_VARIANTS = {
  rest:  { scale: 1,    y: 0 },
  hover: { scale: 1.04, y: -4 },
} as const;

const OVERLAY_VARIANTS = {
  rest:  { opacity: 0 },
  hover: { opacity: 1 },
} as const;

const TITLE_VARIANTS = {
  rest:  { opacity: 0, y: 4 },
  hover: { opacity: 1, y: 0 },
} as const;

const TRANSITION_CARD   = { duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] } as const;
const TRANSITION_FAST   = { duration: 0.15, ease: "easeOut" } as const;
const TRANSITION_TITLE  = { duration: 0.18, ease: "easeOut" } as const;

// ─── Helper: clamp percentage ─────────────────────────────────────────────────

function clampPct(pct: number): number {
  return Math.min(Math.max(Math.round(pct), 0), 100);
}

// ─── PlayIcon ─────────────────────────────────────────────────────────────────

function PlayIcon(): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="w-[22px] h-[22px] text-[#060608] ml-0.5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// ─── LockIcon ─────────────────────────────────────────────────────────────────

function LockIcon(): ReactElement {
  return (
    <svg
      aria-hidden="true"
      className="w-3.5 h-3.5 text-white/60"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

// ─── ThumbnailFallback ────────────────────────────────────────────────────────

interface ThumbnailFallbackProps {
  showTitle: string;
}

function ThumbnailFallback({ showTitle }: ThumbnailFallbackProps): React.ReactElement {
  const gradient = SHOW_GRADIENTS[showTitle] ?? SHOW_GRADIENTS.default;

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
      }}
    >
      <span
        aria-hidden="true"
        className="text-5xl opacity-20 select-none"
      >
        🎬
      </span>
    </div>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  percentage: number;
}

function ProgressBar({ percentage }: ProgressBarProps) {
  if (percentage <= 0) return null;

  const isComplete = percentage >= 100;
  const fillColor  = isComplete ? "#2dce89" : "#c8a96e";

  return (
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.08]"
    >
      <div
        className="h-full rounded-r-sm"
        style={{
          width:      `${percentage}%`,
          background: fillColor,
          transition: "none",
        }}
      />
    </div>
  );
}

// ─── EpisodeCard ─────────────────────────────────────────────────────────────

export default function EpisodeCard({
  episode,
  onClick,
  className = "",
}: EpisodeCardProps): React.ReactElement {
  const [imgError, setImgError] = useState<boolean>(false);

  const pct        = clampPct(episode.progressPercentage);
  const inProgress = pct > 0 && pct < 100;
  const isLocked   = pct === 0 && episode.episodeNumber > 1;

  // Episode label e.g. "S1 E3"
  const epLabel = `S${episode.seasonNumber} E${episode.episodeNumber}`;

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${episode.title} – ${episode.showTitle}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={[
        "group relative flex-shrink-0 w-[220px] sm:w-[260px] md:w-[300px]",
        "cursor-pointer select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#c8a96e] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#060608] rounded-lg",
        className,
      ].join(" ")}
      variants={CARD_VARIANTS}
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={TRANSITION_CARD}
      style={{ willChange: "transform" }}
    >
      {/* ── Thumbnail ─────────────────────────────────────────────────────── */}
      <div
        className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1a1c]"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Image */}
        {!imgError ? (
          <img
            src={episode.thumbnailUrl}
            alt={episode.title}
            draggable={false}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <ThumbnailFallback showTitle={episode.showTitle} />
        )}

        {/* Permanent bottom vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%, rgba(0,0,0,0.12) 100%)",
          }}
        />

        {/* Hover dark overlay + play button */}
        <motion.div
          aria-hidden="true"
          variants={OVERLAY_VARIANTS}
          transition={TRANSITION_FAST}
          className="absolute inset-0 bg-black/25 flex items-center justify-center pointer-events-none"
        >
          <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-[0_0_24px_rgba(0,0,0,0.6)]">
            <PlayIcon />
          </div>
        </motion.div>

        {/* Top-left: season/episode badge */}
        <div
          aria-label={epLabel}
          className="absolute top-2 left-2 pointer-events-none"
        >
          <span
            className={[
              "text-[10px] font-bold tracking-widest uppercase leading-none",
              "px-2 py-[3px] rounded",
              "bg-black/60 backdrop-blur-[4px]",
              isLocked ? "text-white/40" : "text-white/65",
            ].join(" ")}
          >
            {epLabel}
          </span>
        </div>

        {/* Top-right: lock icon for locked episodes */}
        {isLocked && (
          <div className="absolute top-2 right-2 pointer-events-none">
            <div className="w-6 h-6 rounded bg-black/60 backdrop-blur-[4px] flex items-center justify-center">
              <LockIcon />
            </div>
          </div>
        )}

        {/* Bottom-right: duration */}
        <div className="absolute bottom-1.5 right-2 pointer-events-none">
          <span className="text-[10px] font-semibold bg-black/55 backdrop-blur-[4px] text-white/60 px-1.5 py-0.5 rounded">
            {episode.duration}
          </span>
        </div>

        {/* Bottom: progress bar (3px gold stripe) */}
        <ProgressBar percentage={pct} />
      </div>

      {/* ── Info row below thumbnail ──────────────────────────────────────── */}
      <div className="mt-2 px-0.5">
        {/* Episode title — highlights gold on hover via group */}
        <h3 className="text-[13px] font-semibold leading-snug line-clamp-1 text-[#f0ede8] group-hover:text-[#c8a96e] transition-colors duration-200">
          {episode.title}
        </h3>

        {/* Show title + progress hint */}
        <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
          <span className="text-[11px] text-[rgba(240,237,232,0.42)] line-clamp-1 leading-snug truncate">
            {episode.showTitle}
          </span>

          {inProgress && (
            <>
              <span
                aria-hidden="true"
                className="text-[rgba(240,237,232,0.2)] text-[10px] flex-shrink-0"
              >
                ·
              </span>
              <span className="text-[11px] text-[#c8a96e] font-semibold whitespace-nowrap flex-shrink-0">
                {pct}%
              </span>
            </>
          )}

          {pct >= 100 && (
            <>
              <span
                aria-hidden="true"
                className="text-[rgba(240,237,232,0.2)] text-[10px] flex-shrink-0"
              >
                ·
              </span>
              <span className="text-[11px] text-[#2dce89] font-semibold whitespace-nowrap flex-shrink-0">
                Done
              </span>
            </>
          )}
        </div>

        {/* Hover: episode description (slides up) */}
        <motion.p
          variants={TITLE_VARIANTS}
          transition={TRANSITION_TITLE}
          className="text-[11px] text-[rgba(240,237,232,0.35)] leading-snug line-clamp-1 mt-0.5"
        >
          {episode.description}
        </motion.p>
      </div>
    </motion.article>
  );
}
