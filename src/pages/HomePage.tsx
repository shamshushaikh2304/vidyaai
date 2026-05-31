import type { ReactElement, CSSProperties } from "react";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Store ────────────────────────────────────────────────────────────────────
import { useHomeStore } from "../store/homeStore";

// ─── Types (imported only where used in this file's own interfaces) ───────────
import type { Achievement, Episode, Show } from "../types/home";

// ─── Components ───────────────────────────────────────────────────────────────
import AriaWelcome              from "../components/home/AriaWelcome";
import ContinueLearningHeroCard from "../components/home/ContinueLearningHeroCard";
import ContentCarousel          from "../components/home/ContentCarousel";
import AchievementBadge         from "../components/home/AchievementBadge";

// ═════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═════════════════════════════════════════════════════════════════════════════

/** Fixed nav height in px — used for paddingTop to clear nav. */
const NAV_H = 56;

/**
 * Horizontal gutter applied to every content row.
 * Full bleed on mobile, wider gutters as viewport grows.
 */
const GUTTER = "px-4 sm:px-8 md:px-12 lg:px-16";

// ═════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═════════════════════════════════════════════════════════════════════════════

/** Main content area stagger container. */
const PAGE_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration:        0.35,
      ease:            "easeOut",
      staggerChildren: 0.09,
      delayChildren:   0.05,
    },
  },
} as const;

/** Each section inside the page slides up on entrance. */
const SECTION_VARIANTS = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
} as const;

/** Fade-only variant — used for skeleton / error transitions. */
const FADE_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// LOADING SKELETON
// ═════════════════════════════════════════════════════════════════════════════

/** Single shimmer placeholder box. */
function Shimmer({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}): ReactElement {
  return (
    <div
      className={["rounded-lg bg-[#141416] relative overflow-hidden flex-shrink-0", className].join(" ")}
      style={style}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function LoadingSkeleton(): ReactElement {
  return (
    <div
      className="min-h-screen bg-[#060608]"
      style={{ paddingTop: NAV_H }}
      aria-hidden="true"
    >
      {/* Welcome row skeleton */}
      <div className={`${GUTTER} py-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Shimmer className="w-9 h-9 rounded-full" />
          <div className="space-y-2">
            <Shimmer className="w-20 h-2.5" />
            <Shimmer className="w-28 h-4" />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Shimmer className="w-24 h-7 rounded-full" />
          <Shimmer className="w-28 h-7 rounded-full" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="sm:px-4 mb-10">
        <Shimmer
          className="w-full rounded-none sm:rounded-2xl"
          style={{ aspectRatio: "21 / 9", minHeight: 200 }}
        />
      </div>

      {/* Three row skeletons */}
      {([0, 1, 2] as const).map((i) => (
        <div key={i} className={`${GUTTER} mb-10`}>
          <Shimmer className="w-36 h-3 mb-4" />
          <div className="flex gap-3 overflow-hidden">
            {([0, 1, 2, 3] as const).map((j) => (
              <Shimmer
                key={j}
                className="rounded-lg"
                style={{ width: 220, aspectRatio: "16 / 9" }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ERROR STATE
// ═════════════════════════════════════════════════════════════════════════════

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps): ReactElement {
  return (
    <div
      className="min-h-screen bg-[#060608] flex flex-col items-center justify-center px-6 text-center"
      style={{ paddingTop: NAV_H }}
    >
      <span aria-hidden="true" className="text-5xl mb-5 select-none">
        ⚠️
      </span>
      <h2 className="text-[16px] font-bold text-[#f0ede8] mb-2">
        Something went wrong
      </h2>
      <p className="text-[13px] text-[rgba(240,237,232,0.45)] max-w-xs leading-relaxed mb-7">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-7 py-2.5 rounded-lg font-bold text-[13px] text-[#060608] outline-none hover:opacity-90 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#c8a96e]"
        style={{ background: "#c8a96e" }}
      >
        Try again
      </button>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HOME NAV
// ═════════════════════════════════════════════════════════════════════════════

interface HomeNavProps {
  scrolled: boolean;
}

function HomeNav({ scrolled }: HomeNavProps): ReactElement {
  return (
    <motion.header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "flex items-center justify-between",
        GUTTER,
        "transition-colors duration-300",
      ].join(" ")}
      style={{
        height:         NAV_H,
        background:     scrolled
          ? "rgba(6,6,8,0.94)"
          : "linear-gradient(to bottom, rgba(6,6,8,0.70) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom:   scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y:   0  }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 select-none">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#060608] font-black text-[13px] flex-shrink-0"
          style={{ background: "#c8a96e" }}
          aria-hidden="true"
        >
          A
        </div>
        <span
          className="font-black text-[16px] text-[#f0ede8] tracking-[0.08em]"
          style={{ fontFamily: "'Bebas Neue', 'DM Sans', sans-serif" }}
        >
          ARYALEARN
        </span>
      </div>

      {/* Search icon */}
      <button
        type="button"
        aria-label="Search content"
        className="w-9 h-9 rounded-full flex items-center justify-center text-[rgba(240,237,232,0.5)] hover:text-[#f0ede8] hover:bg-white/[0.07] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]"
      >
        <svg
          aria-hidden="true"
          className="w-[18px] h-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx={11} cy={11} r={7} />
          <path strokeLinecap="round" d="M21 21l-3.5-3.5" />
        </svg>
      </button>
    </motion.header>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ACHIEVEMENTS SECTION
// ═════════════════════════════════════════════════════════════════════════════

interface AchievementsSectionProps {
  /** Achievement[] from home.ts — passed straight from store. */
  achievements: Achievement[];
}

function AchievementsSection({ achievements }: AchievementsSectionProps): ReactElement {
  return (
    <section aria-label="Your achievements">
      {/* Row label — matches ContentCarousel's RowLabel style exactly */}
      <h2 className="text-[11px] font-bold tracking-[0.1em] uppercase mb-4 px-0.5 text-[rgba(240,237,232,0.50)]">
        Your Achievements
      </h2>

      {/* Badge grid — wraps on mobile, space out on wider screens */}
      <div className="flex flex-wrap gap-3 sm:gap-5">
        {achievements.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            variant="default"
          />
        ))}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═════════════════════════════════════════════════════════════════════════════

export default function HomePage(): ReactElement {
  // ── Store selectors ──────────────────────────────────────────────────────
  const loading          = useHomeStore((s) => s.loading);
  const error            = useHomeStore((s) => s.error);
  const user             = useHomeStore((s) => s.user);
  const continueLearning = useHomeStore((s) => s.continueLearning);
  const todaysLineup     = useHomeStore((s) => s.todaysLineup);
  const recommended      = useHomeStore((s) => s.recommended);
  const subjects         = useHomeStore((s) => s.subjects);
  const achievements     = useHomeStore((s) => s.achievements);
  const loadHomeData     = useHomeStore((s) => s.loadHomeData);

  // ── Nav scroll state ──────────────────────────────────────────────────────
  const [scrolled, setScrolled] = useState<boolean>(false);

  // ── Effects ───────────────────────────────────────────────────────────────

  /** Load all home data once on mount. */
  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  /** Track scroll to transition nav from transparent → opaque. */
  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Stable callbacks ──────────────────────────────────────────────────────

  /** Resume the hero episode. */
  const handlePlay = useCallback((): void => {
    if (!continueLearning) return;
    // Navigate to episode — replace with router.push in full app
    console.log("Resume episode:", continueLearning.id);
  }, [continueLearning]);

  /** Open series detail for the hero episode. */
  const handleMoreInfo = useCallback((): void => {
    if (!continueLearning) return;
    // Navigate to series — replace with router.push in full app
    console.log("More info for show:", continueLearning.showId);
  }, [continueLearning]);

  /**
   * Handle carousel card click.
   * item.type discriminant narrows Episode | Show without casting.
   */
  const handleItemClick = useCallback((item: Episode | Show): void => {
    if (item.type === "episode") {
      console.log("Navigate to episode:", item.id, "show:", item.showId);
    } else {
      console.log("Navigate to show:", item.id, "subject:", item.subject);
    }
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#060608] text-[#f0ede8]">

      {/* ── Fixed nav — always present above content ─────────────────── */}
      <HomeNav scrolled={scrolled} />

      {/* ── State-driven body ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">

        {/* Loading skeleton */}
        {loading && (
          <motion.div
            key="loading"
            variants={FADE_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <LoadingSkeleton />
          </motion.div>
        )}

        {/* Error state */}
        {!loading && error && (
          <motion.div
            key="error"
            variants={FADE_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ErrorState message={error} onRetry={loadHomeData} />
          </motion.div>
        )}

        {/* Main content */}
        {!loading && !error && (
          <motion.main
            key="content"
            aria-label="AryaLearn home"
            variants={PAGE_VARIANTS}
            initial="hidden"
            animate="visible"
            style={{ paddingTop: NAV_H }}
          >

            {/* ── 1. AriaWelcome ──────────────────────────────────────── */}
            {user && (
              <motion.div
                variants={SECTION_VARIANTS}
                className={`${GUTTER} pt-5 pb-4`}
              >
                <AriaWelcome user={user} />
              </motion.div>
            )}

            {/* ── 2. ContinueLearningHeroCard ─────────────────────────── */}
            {/*
             *  Full-bleed on mobile (no horizontal padding, square corners).
             *  Slightly inset on sm+ with rounded corners for premium feel.
             */}
            {continueLearning && (
              <motion.div
                variants={SECTION_VARIANTS}
                className="sm:px-4 md:px-6 mb-10"
              >
                <div className="sm:rounded-2xl overflow-hidden">
                  <ContinueLearningHeroCard
                    episode={continueLearning}
                    onPlay={handlePlay}
                    onMoreInfo={handleMoreInfo}
                  />
                </div>
              </motion.div>
            )}

            {/* ── Rows + Achievements ─────────────────────────────────── */}
            <div className={`${GUTTER} space-y-11 pb-20`}>

              {/* ── 3. Today's Lineup (episodes) ──────────────────────── */}
              {todaysLineup.length > 0 && (
                <motion.div variants={SECTION_VARIANTS}>
                  <ContentCarousel
                    label="Today's Lineup"
                    items={todaysLineup}
                    onItemClick={handleItemClick}
                  />
                </motion.div>
              )}

              {/* ── 4. Recommended For You (shows — poster variant) ───── */}
              {recommended.length > 0 && (
                <motion.div variants={SECTION_VARIANTS}>
                  <ContentCarousel
                    label="Recommended For You"
                    items={recommended}
                    showVariant="poster"
                    onItemClick={handleItemClick}
                  />
                </motion.div>
              )}

              {/* ── 5. Browse Subjects (shows — wide variant) ─────────── */}
              {subjects.length > 0 && (
                <motion.div variants={SECTION_VARIANTS}>
                  <ContentCarousel
                    label="Browse Subjects"
                    items={subjects}
                    showVariant="wide"
                    onItemClick={handleItemClick}
                  />
                </motion.div>
              )}

              {/* ── 6. Achievements ───────────────────────────────────── */}
              {achievements.length > 0 && (
                <motion.div variants={SECTION_VARIANTS}>
                  <AchievementsSection achievements={achievements} />
                </motion.div>
              )}

            </div>

          </motion.main>
        )}

      </AnimatePresence>
    </div>
  );
}
