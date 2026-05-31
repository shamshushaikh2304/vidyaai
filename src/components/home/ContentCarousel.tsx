import type { ReactElement, UIEvent } from "react";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { Episode, Show } from "../../types/home";
import EpisodeCard from "./EpisodeCard";
import ShowCard    from "./ShowCard";

// ─── Types ────────────────────────────────────────────────────────────────────
//
// CarouselItem is a union of the two content types defined in home.ts.
// The `type` discriminant ("episode" | "show") is used to narrow safely
// without any invented interfaces.

type CarouselItem = Episode | Show;

interface ContentCarouselProps {
  /** Row label shown above the horizontal scroll track (e.g. "Today's Lineup"). */
  label: string;
  /** Either Episode[] or Show[] — or a mixed array. Typed as CarouselItem[]. */
  items: CarouselItem[];
  /**
   * Optional variant forwarded to ShowCard when the item is a Show.
   * Defaults to "poster". Pass "wide" for the Subjects row.
   */
  showVariant?: "poster" | "wide";
  /** Called when the user clicks any card. Receives the typed item. */
  onItemClick?: (item: CarouselItem) => void;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LABEL_VARIANTS = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;

const CHEVRON_HOVER = { scale: 1.1 } as const;
const CHEVRON_TAP   = { scale: 0.92 } as const;
const CHEVRON_TRANS = { duration: 0.15, ease: "easeOut" } as const;

/** How many pixels to scroll per chevron click. */
const SCROLL_STEP_PX = 320;

// ─── Type guards ──────────────────────────────────────────────────────────────

function isEpisode(item: CarouselItem): item is Episode {
  return item.type === "episode";
}

function isShow(item: CarouselItem): item is Show {
  return item.type === "show";
}

// ─── ChevronButton ────────────────────────────────────────────────────────────

interface ChevronButtonProps {
  direction: "left" | "right";
  visible:   boolean;
  onClick:   () => void;
}

function ChevronButton({
  direction,
  visible,
  onClick,
}: ChevronButtonProps): ReactElement {
  const isLeft  = direction === "left";
  const label   = isLeft ? "Scroll left" : "Scroll right";

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={CHEVRON_HOVER}
      whileTap={CHEVRON_TAP}
      transition={CHEVRON_TRANS}
      className={[
        "absolute top-1/2 -translate-y-1/2 z-10",
        isLeft ? "-left-4" : "-right-4",
        "w-9 h-9 rounded-full flex items-center justify-center",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]",
        "transition-opacity duration-200",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        // Hidden on mobile — touch-scroll handles it there
        "hidden sm:flex",
      ].join(" ")}
      style={{
        background: "rgba(14,14,16,0.88)",
        border:     "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
        boxShadow:  "0 2px 12px rgba(0,0,0,0.55)",
      }}
    >
      <svg
        aria-hidden="true"
        className="w-4 h-4 text-[rgba(240,237,232,0.75)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        {isLeft ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        )}
      </svg>
    </motion.button>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState(): ReactElement {
  return (
    <div className="flex items-center justify-center h-[100px] w-full">
      <p className="text-[12px] text-[rgba(240,237,232,0.22)] italic">
        Nothing here yet
      </p>
    </div>
  );
}

// ─── ContentCarousel ──────────────────────────────────────────────────────────

export default function ContentCarousel({
  label,
  items,
  showVariant   = "poster",
  onItemClick,
  className = "",
}: ContentCarouselProps): ReactElement {
  const trackRef = useRef<HTMLDivElement>(null);

  // Track scroll position to show/hide chevrons
  const [canScrollLeft,  setCanScrollLeft]  = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Recalculate chevron visibility on every scroll event
  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const el    = e.currentTarget;
    const atStart = el.scrollLeft <= 8;
    const atEnd   = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  }, []);

  const scrollBy = useCallback((dir: "left" | "right") => {
    trackRef.current?.scrollBy({
      left:     dir === "left" ? -SCROLL_STEP_PX : SCROLL_STEP_PX,
      behavior: "smooth",
    });
  }, []);

  if (items.length === 0) {
    return (
      <section
        aria-label={label}
        className={["w-full", className].join(" ")}
      >
        <RowLabel label={label} />
        <EmptyState />
      </section>
    );
  }

  return (
    <section
      aria-label={label}
      className={["w-full", className].join(" ")}
    >
      {/* ── Row label ─────────────────────────────────────────────── */}
      <RowLabel label={label} />

      {/* ── Scroll track + chevron overlay ───────────────────────── */}
      <div className="relative">
        {/* Left chevron */}
        <ChevronButton
          direction="left"
          visible={canScrollLeft}
          onClick={() => scrollBy("left")}
        />

        {/* Horizontal scroll container */}
        <div
          ref={trackRef}
          role="list"
          onScroll={handleScroll}
          className={[
            "flex gap-3 overflow-x-auto overflow-y-visible",
            "scroll-smooth snap-x snap-mandatory",
            // Remove native scrollbar — keep JS scroll via chevrons on desktop
            "scrollbar-none",
            // Enough vertical padding so card hover scale isn't clipped
            "py-2",
          ].join(" ")}
          style={{
            // Hide scrollbar cross-browser
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item) => {
            const key = item.id;

            // ── Episode branch ─────────────────────────────────────
            if (isEpisode(item)) {
              return (
                <div key={key} role="listitem" className="snap-start flex-shrink-0">
                  <EpisodeCard
                    episode={item}
                    onClick={() => onItemClick?.(item)}
                  />
                </div>
              );
            }

            // ── Show branch ────────────────────────────────────────
            if (isShow(item)) {
              return (
                <div key={key} role="listitem" className="snap-start flex-shrink-0">
                  <ShowCard
                    show={item}
                    variant={showVariant}
                    onClick={() => onItemClick?.(item)}
                  />
                </div>
              );
            }

            // TypeScript exhaustiveness: item.type is "show" | "episode"
            // so this branch is unreachable at runtime, but satisfies TS.
            return null;
          })}
        </div>

        {/* Right chevron */}
        <ChevronButton
          direction="right"
          visible={canScrollRight}
          onClick={() => scrollBy("right")}
        />
      </div>
    </section>
  );
}

// ─── RowLabel ─────────────────────────────────────────────────────────────────
// Extracted so the empty-state branch can reuse it.

interface RowLabelProps {
  label: string;
}

function RowLabel({ label }: RowLabelProps): ReactElement {
  return (
    <motion.h2
      className={[
        "text-[11px] font-bold tracking-[0.1em] uppercase mb-3 px-0.5",
        "text-[rgba(240,237,232,0.50)]",
      ].join(" ")}
      variants={LABEL_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {label}
    </motion.h2>
  );
}
