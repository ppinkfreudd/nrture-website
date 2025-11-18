"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  className,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  className?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const cardLength = content.length;
  const AUTO_ADVANCE_MS = 6000;

  const containerClasses = cn(
    "relative flex w-full flex-col gap-8 rounded-[32px] bg-transparent px-6 py-10 text-slate-900 sm:gap-10 sm:px-8 sm:py-12 lg:flex-row lg:items-stretch lg:justify-between lg:gap-10 xl:gap-14",
    className,
  );

  if (cardLength === 0) {
    return null;
  }

  const safeActiveCard = Math.min(activeCard, cardLength - 1);

  React.useEffect(() => {
    if (typeof window === "undefined" || cardLength <= 1) return undefined;
    const interval = window.setInterval(() => {
      setActiveCard((current) => (current + 1) % cardLength);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(interval);
  }, [cardLength]);

  const handleSelectCard = (index: number) => {
    setActiveCard(index);
  };

  return (
    <div className={containerClasses}>
      <div
        className={cn(
          "w-full max-w-xl rounded-3xl bg-white p-4 shadow-lg sm:max-w-2xl lg:w-[40%] lg:max-w-lg lg:self-stretch lg:translate-y-4 xl:w-[38%] xl:translate-y-5",
          contentClassName,
        )}
      >
        {content[safeActiveCard].content ?? null}
      </div>
      <div className="relative w-full text-slate-900 lg:ml-8 xl:ml-12 lg:w-[56%] lg:max-w-4xl xl:w-[60%] 2xl:w-[62%]">
        <div
          className={cn(
            "relative mx-auto flex w-[calc(100%+24px)] max-w-[480px] flex-col rounded-[28px] px-4 py-5 shadow-[0_25px_65px_rgba(15,23,42,0.12)] backdrop-blur sm:w-full sm:max-w-full sm:px-6 sm:py-6 lg:translate-x-4 lg:translate-y-10 lg:px-8 lg:py-8 xl:translate-x-8 xl:translate-y-12 xl:px-10 xl:py-9",
            [
              "bg-gradient-to-br from-emerald-100/90 via-white to-white shadow-[0_25px_80px_rgba(16,185,129,0.25)]",
              "bg-gradient-to-br from-rose-100/90 via-white to-white shadow-[0_25px_80px_rgba(244,114,182,0.25)]",
              "bg-gradient-to-br from-sky-100/90 via-white to-white shadow-[0_25px_80px_rgba(14,165,233,0.25)]",
              "bg-gradient-to-br from-pink-100/90 via-white to-white shadow-[0_25px_80px_rgba(236,72,153,0.25)]",
            ][safeActiveCard % 4],
          )}
        >
          <div className="min-h-[220px] max-h-[220px] sm:min-h-[210px] sm:max-h-[210px] md:min-h-[225px] md:max-h-[225px] lg:min-h-[240px] lg:max-h-[240px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={content[safeActiveCard]?.title ?? safeActiveCard}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex h-full flex-col gap-4 overflow-y-auto pr-1"
              >
                <div className="space-y-3">
                  <div className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                    Feature {safeActiveCard + 1} of {cardLength}
                  </div>
                  <h2 className="text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
                    {content[safeActiveCard].title}
                  </h2>
                </div>
                <p className="text-base text-slate-600 md:text-lg">
                  {content[safeActiveCard].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {content.map((_, index) => {
              const isActive = index === safeActiveCard;
              return (
                <button
                  type="button"
                  key={index}
                  className={cn(
                    "h-3 w-3 rounded-full border border-transparent transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                    isActive
                      ? "bg-slate-900 scale-100"
                      : "bg-slate-300 hover:scale-110",
                  )}
                  onClick={() => handleSelectCard(index)}
                  aria-pressed={isActive}
                  aria-label={`Go to feature ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
