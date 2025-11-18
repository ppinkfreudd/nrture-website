"use client";
import { cn } from "@/lib/utils";
import type { CSSProperties, HTMLProps, ReactNode } from "react";

interface AuroraBackgroundProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  showRadialGradient?: boolean;
  fitContent?: boolean;
  fullBleed?: boolean;
  auroraOffset?: string | number;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  fitContent = false,
  fullBleed = false,
  auroraOffset = "var(--aurora-offset, 0px)",
  ...props
}: AuroraBackgroundProps) => {
  const minHeightClasses = fitContent
    ? "min-h-0 sm:min-h-0"
    : "min-h-[70vh] sm:min-h-[80vh]";
  const backgroundWrapperClasses = fullBleed
    ? "pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-hidden"
    : "pointer-events-none absolute inset-0 overflow-hidden";
  const maskClasses = showRadialGradient
    ? "[mask-image:none] 2xl:[mask-image:radial-gradient(ellipse_at_100%_0%,black_12%,var(--transparent)_70%)]"
    : "[mask-image:none]";
  const auroraBackgroundStyle: CSSProperties = {
    "--aurora":
      "repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)",
    "--dark-gradient":
      "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
    "--white-gradient":
      "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
    "--blue-300": "#93c5fd",
    "--blue-400": "#60a5fa",
    "--blue-500": "#3b82f6",
    "--indigo-300": "#a5b4fc",
    "--violet-200": "#ddd6fe",
    "--black": "#000",
    "--white": "#fff",
    "--transparent": "transparent",
    top: auroraOffset,
    bottom: 0,
  };

  if (fullBleed) {
    auroraBackgroundStyle.width = "min(1400px, calc(100vw + 12rem))";
    auroraBackgroundStyle.top = `calc(${auroraOffset} - 2rem)`;
    auroraBackgroundStyle.bottom = "-2rem";
  }

  return (
    <div
      className={cn(
        "transition-bg relative flex w-full flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
        minHeightClasses,
        className,
      )}
      {...props}
    >
      <div className={backgroundWrapperClasses} style={auroraBackgroundStyle}>
        <div
          //   I'm sorry but this is what peak developer performance looks like // trigger warning
          className={cn(
            `animate-aurora after:animate-aurora absolute -inset-[16px] [background-image:var(--white-gradient),var(--aurora)] [background-size:340%,_220%] lg:[background-size:280%,_190%] xl:[background-size:240%,_170%] 2xl:[background-size:210%,_150%] [background-position:50%_50%,50%_50%] opacity-75 blur-[18px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_130%] lg:after:[background-size:180%,_120%] xl:after:[background-size:160%,_110%] 2xl:after:[background-size:140%,_100%] after:[background-position:50%_50%,50%_50%] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            maskClasses,
          )}
        ></div>
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
