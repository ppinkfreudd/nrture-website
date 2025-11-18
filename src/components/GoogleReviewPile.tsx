import { useEffect, useMemo, useState, type CSSProperties } from "react";
import clsx from "clsx";

const reviews = [
  {
    author: "Rae Monroe",
    credential: "2 reviews · 1 photo",
    title: "Midtown Social Kitchen",
    rating: 2,
    ago: "12 min ago",
    category: "Dine in",
    price: "$35–55",
    snippet:
      "Visited last night and left pretty disappointed. The place looked great from the outside, but once we sat down the service just dragged — it took almost 25 minutes before anyone took our order. The drinks were watery and the food arrived lukewarm, like it had been sitting out for a while. The vibe could be good, but the staff seemed overwhelmed and the whole experience felt sloppy.",
    tone: "Flagged",
  },
  {
    author: "Luis Ortega",
    credential: "5 reviews · 3 photos",
    title: "Museum Market & Co.",
    rating: 2,
    ago: "5 min ago",
    category: "Bar · Crowd",
    price: "High rush",
    snippet:
      "The exhibits upstairs were fantastic, but the gift shop felt like an afterthought. Half the shelves were either empty or stocked with the same three items, all overpriced. I tried asking the staff about a book I saw in the gallery and they just shrugged. It’s a small thing, but it really took away from the end of an otherwise great visit.",
    tone: "Flagged",
  },
  {
    author: "Tara Bishop",
    credential: "12 reviews · 8 photos",
    title: "Harmony Rituals Spa",
    rating: 5,
    ago: "Just now",
    category: "Dine in",
    price: "$25–40",
    snippet:
      "Absolutely loved my session here. The atmosphere was calm the moment I walked in, and the staff genuinely cared about making sure everything felt personalized. My massage therapist checked in about pressure levels and actually listened — I walked out feeling lighter and way more relaxed. Clean space, warm lighting, and zero rush. Definitely coming back.",
    tone: "Delight",
  },
];

const CARD_LAYOUT = [
  { top: 4, left: 6, rotation: -4, offsetY: 0 },
  { top: 14, left: 4, rotation: -8, offsetY: 6 },
  { top: 24, left: 12, rotation: 4, offsetY: 16 },
];

const SNIPPET_STYLE: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  hyphens: "auto",
  wordBreak: "break-word",
};

interface GoogleReviewPileProps {
  className?: string;
}

export function GoogleReviewPile({ className }: GoogleReviewPileProps) {
  const [activeReview, setActiveReview] = useState(0);
  const [exitingReview, setExitingReview] = useState<number | null>(null);
  const stars = useMemo(
    () => Array.from({ length: 5 }, (_, index) => index + 1),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    let exitTimeout: number | undefined;
    let interval: number | undefined;

    setActiveReview(0);
    setExitingReview(null);

    interval = window.setInterval(() => {
      setActiveReview((prev) => {
        setExitingReview(prev);
        if (exitTimeout) {
          window.clearTimeout(exitTimeout);
        }
        exitTimeout = window.setTimeout(() => setExitingReview(null), 750);
        const next = (prev + 1) % reviews.length;
        return next;
      });
    }, 2100);

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
      if (exitTimeout) {
        window.clearTimeout(exitTimeout);
      }
    };
  }, []);

  return (
    <div
      className={clsx(
        "pointer-events-none relative h-[320px] w-full max-w-[260px] sm:h-[420px] sm:max-w-[340px] md:h-[460px] md:max-w-[380px]",
        className,
      )}
    >
      {reviews.map((review, index) => {
        if (index < activeReview && index !== exitingReview) {
          return null;
        }

        const layoutIndex = Math.max(0, Math.min(index - activeReview, CARD_LAYOUT.length - 1));
        const layout = CARD_LAYOUT[layoutIndex];
        const isActive = index === activeReview;
        const isExiting = index === exitingReview;
        const floatX = isActive ? 24 : 0;
        const floatY = isActive ? -18 : 0;
        const floatRotation = isActive ? 9 : 0;
        const throwX = isExiting ? 220 : floatX;
        const throwY = isExiting ? -40 : floatY;
        const throwRotation = isExiting ? 28 : layout.rotation + floatRotation;
        const scale = isExiting ? 0.9 : isActive ? 1.02 : 0.96;
        const opacity = isExiting ? 0 : 1;

        const style: CSSProperties = {
          top: `${layout.top}%`,
          left: `${layout.left}%`,
          transform: `translate(${throwX}px, ${layout.offsetY + throwY}px) rotate(${throwRotation}deg) scale(${scale})`,
          transition: "transform 0.75s ease, opacity 0.6s ease",
          zIndex: isActive || isExiting ? 20 : 10,
          opacity,
          willChange: "transform, opacity",
        };

        return (
          <div
            key={`${review.author}-${index}`}
            style={style}
            className="absolute h-[170px] w-full max-w-[220px] rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_18px_35px_rgba(15,23,42,0.15)] sm:h-[220px] sm:max-w-[300px] sm:p-4 md:h-[240px] md:max-w-[340px] md:p-5"
          >
            <div className="flex h-full flex-col">
              <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold uppercase text-white sm:h-8 sm:w-8 sm:text-[11px] md:h-10 md:w-10 md:text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-neutral-800 sm:text-[11px] md:text-sm">{review.author}</p>
                        <p className="text-[8px] text-neutral-500 sm:text-[9px] md:text-[11px]">{review.credential}</p>
                      </div>
                    </div>
                    <div className="text-[8px] font-semibold text-neutral-400 sm:text-[10px] md:text-[12px]">
                      ⋮⋮⋮
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[0.95rem] font-semibold text-neutral-800 sm:text-lg md:text-xl">
                      {review.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-[10px] font-semibold sm:text-xs md:text-sm">
                        {stars.map((value) => (
                          <span
                            key={value}
                          className={value <= review.rating ? "text-amber-500" : "text-neutral-200"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-neutral-400 sm:text-[9px] md:text-xs">
                      {review.ago}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-[7px] uppercase tracking-[0.3em] text-neutral-400 sm:text-[9px] md:text-[10px]">
                    <span>{review.category}</span>
                    <span>{review.price}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex-1 overflow-hidden">
                <p className="text-[0.7rem] leading-snug text-neutral-600 sm:text-[0.82rem]" style={SNIPPET_STYLE}>
                  {review.snippet}
                </p>
              </div>
              <div className="mt-2 h-3 sm:mt-3 sm:h-4" aria-hidden="true" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
