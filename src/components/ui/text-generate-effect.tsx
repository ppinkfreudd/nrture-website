"use client";
import { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  textClassName = "text-2xl leading-snug tracking-wide",
  wrapperClassName = "mt-4",
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  textClassName?: string;
  wrapperClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  let wordsArray = words.split(" ");
  useEffect(() => {
    if (hasAnimated) return undefined;
    const element = containerRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate(
              "span",
              {
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
              },
              {
                duration: duration ? duration : 1,
                delay: stagger(0.2),
              },
            );
            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animate, duration, filter, hasAnimated]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)} ref={containerRef}>
      <div className={wrapperClassName}>
        <div className={cn("text-black", textClassName)}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
