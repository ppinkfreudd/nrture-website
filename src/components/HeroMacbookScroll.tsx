"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { MotionValue } from "motion/react";

interface HeroMacbookScrollProps {
  className?: string;
  progress?: MotionValue<number>;
}

export function HeroMacbookScroll({ className, progress }: HeroMacbookScrollProps) {
  return (
    <div className={`pointer-events-none hidden w-full justify-center md:flex ${className ?? ""}`}>
      <div className="relative mx-auto h-[520px] w-full max-w-[760px] overflow-visible md:h-[640px] md:max-w-[920px] lg:h-[760px] lg:max-w-[1100px]">
        <div
          className="absolute inset-0"
          style={{
            transform: "scale(0.36) translate(60px,14px)",
            transformOrigin: "right top",
          }}
        >
          <MacbookScroll
            title={<span className="sr-only">Macbook demo</span>}
            showGradient={false}
            badge={null}
            progress={progress}
          />
        </div>
      </div>
    </div>
  );
}
