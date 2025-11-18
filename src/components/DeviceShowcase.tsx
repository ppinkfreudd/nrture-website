import clsx from "clsx";
import { Iphone15Pro } from "./Iphone15Pro";
import { Ipad } from "./ui/ipad";

interface DeviceShowcaseProps {
  phoneSrc: string;
  tabletSrc?: string;
  phase: "cards" | "phone";
  className?: string;
}

export function DeviceShowcase({ phoneSrc, tabletSrc, phase, className }: DeviceShowcaseProps) {
  return (
    <div
      className={clsx(
        "pointer-events-none relative flex min-h-[360px] w-full items-center justify-center sm:min-h-[460px] lg:min-h-[560px]",
        className,
      )}
    >
      <div className="relative flex w-full max-w-[2200px] items-center justify-center overflow-visible">
        <div className="relative mx-auto w-full max-w-[360px] translate-x-[var(--device-shift)] [--device-shift:25%] sm:max-w-[480px] sm:translate-y-[30%] sm:[--device-shift:32%] md:max-w-[560px] md:translate-y-[32%] md:[--device-shift:24%] md:ml-auto md:mr-0 lg:max-w-[820px] lg:translate-y-[38%] lg:[--device-shift:60%] xl:max-w-[960px] xl:translate-y-[42%] xl:[--device-shift:80%] 2xl:max-w-[1080px] 2xl:translate-y-[45%] 2xl:[--device-shift:105%]">
          <div className="relative aspect-[4/3] w-full overflow-visible">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full origin-center scale-[1.45] sm:scale-[1.6] md:scale-[1.8] lg:scale-[2.7] xl:scale-[3.05] 2xl:scale-[3.3]">
                <Ipad
                  width={1100}
                  height={760}
                  src={tabletSrc}
                  className="h-auto w-full text-neutral-100"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-[12%] right-[42%] z-10 md:bottom-[18%] md:right-[28%] lg:bottom-[30%] lg:right-[40%] xl:bottom-[32%] xl:right-[50%]">
              <div className="relative w-[105px] sm:w-[120px] md:w-[135px] lg:w-[95px] xl:w-[110px]">
                <Iphone15Pro
                  src={phoneSrc}
                  className={clsx(
                    "h-auto w-full transition-all duration-500 ease-out",
                    phase === "phone" ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95",
                  )}
                  aria-hidden={phase !== "phone"}
                />
                <div className="pointer-events-none absolute inset-x-1 bottom-6 sm:inset-x-2 sm:bottom-9 lg:inset-x-3 lg:bottom-7 xl:bottom-8">
                  <div className="mx-auto w-full rounded-[12px] border border-white/60 bg-white/95 px-2 py-1 text-left text-[0.55rem] font-semibold text-neutral-900 backdrop-blur sm:px-3 sm:py-1 sm:text-[0.65rem] lg:rounded-[14px] lg:px-3 lg:py-[6px] lg:text-[0.52rem] xl:px-4 xl:py-[6px] xl:text-[0.54rem]">
                    <p className="leading-tight text-neutral-900">Hi, I’m Elara!</p>
                    <p className="text-[0.48rem] font-normal text-neutral-500 sm:text-[0.56rem] lg:text-[0.46rem] xl:text-[0.48rem]">You got 7 reviews today.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
