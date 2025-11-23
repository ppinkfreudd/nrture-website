import { useEffect, useState } from "react";
import { Iphone15Pro } from "../components/Iphone15Pro";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { Ipad } from "../components/ui/ipad";

const elaraGif = new URL("../../elara.jpeg", import.meta.url).href;
const ipadScreenshot = new URL("../../screenshot-website.png", import.meta.url).href;

const STORY_STEPS = [
  {
    id: "reply-fast",
    eyebrow: "Signal hits the feed",
    summary: "Reply to every traveller within minutes, not days.",
    detail: "Tripadvisor pings Elara, a context-rich draft heads back to your CX pod in under three minutes.",
    review: {
      platform: "Tripadvisor",
      timestamp: "12 min ago",
      author: "@WeekendNomad",
      tone: "Mixed",
      snippet: "Shower suites spotless, but check-in queue crawled.",
    },
  },
  {
    id: "surface-blind-spots",
    eyebrow: "Escalate what matters",
    summary: "Surface blind spots before they escalate on social.",
    detail: "Flagged intent routes straight to floor managers with screenshots, sentiment, and a recovery play.",
    review: {
      platform: "Google Reviews",
      timestamp: "3 min ago",
      author: "@Gate32Traveler",
      tone: "Flagged",
      snippet: "Ordered the breakfast tacos. Cold eggs, no one checked on our table.",
    },
  },
  {
    id: "convert-intelligence",
    eyebrow: "Lift the signal",
    summary: "Convert reviews into board-ready CX intelligence.",
    detail: "Moments of delight graduate into your Emotion-to-Spend briefing without anyone updating a deck.",
    review: {
      platform: "Google Reviews",
      timestamp: "9 min ago",
      author: "@LoungeNerd",
      tone: "Delight",
      snippet: "Barista remembered my order. Need more vegan bites though.",
    },
  },
  {
    id: "benchmark",
    eyebrow: "Benchmark in real time",
    summary: "Benchmark peer outlets & airports with precision.",
    detail: "Every mention syncs against your peer board so ops see if Gate 4’s espresso downtime is an outlier.",
    review: {
      platform: "Twitter",
      timestamp: "Just now",
      author: "@CarryOnCam",
      tone: "Mixed",
      snippet: "Wi-Fi strong, but the espresso machine is still down at Gate 4.",
    },
  },
] as const;

const TONE_BADGE_STYLES: Record<string, string> = {
  Delight: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Mixed: "bg-amber-100 text-amber-800 border-amber-200",
  Flagged: "bg-rose-100 text-rose-700 border-rose-200",
};

type FeatureSlide = {
  id: string;
  title: string;
  description: string;
  eyebrow: string;
  footnote: string;
  hideAnnotation?: boolean;
};

const FEATURE_SCROLL_STEPS: FeatureSlide[] = [
  {
    id: "unified-intelligence",
    title:
      "It brings together auto review replies, Peer Intelligence and commercial insights so you always know what matters.",
    description: "",
    eyebrow: "Unified signals",
    footnote: "",
  },
  {
    id: "actionable-guidance",
    title:
      "It turns reviews, emotions and performance signals into clear guidance that strengthens trust, spend and repeat visits.",
    description: "",
    eyebrow: "Actionable guidance",
    footnote: "",
  },
] as const;

export function HeroSection() {
  const [gifCycle, setGifCycle] = useState(0);
  const [viewportSize, setViewportSize] = useState<{
    height: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const updateViewportSize = () => {
      setViewportSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    updateViewportSize();
    window.addEventListener("resize", updateViewportSize);
    return () => window.removeEventListener("resize", updateViewportSize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const interval = window.setInterval(() => {
      setGifCycle((current) => current + 1);
    }, 2500);

    return () => window.clearInterval(interval);
  }, []);

  const heroHeightStyle =
    viewportSize !== null && (viewportSize.width < 640 || viewportSize.width >= 1280)
      ? {
          minHeight: `${viewportSize.height}px`,
        }
      : undefined;

  const loopingGifSrc = `${elaraGif}?cycle=${gifCycle}`;
  const stickyFeatureContent = FEATURE_SCROLL_STEPS.map((feature) => ({
    title: feature.title,
    description: feature.description,
  }));

  return (
    <>
      <section
        className="relative mt-0 box-border flex h-full flex-col justify-center overflow-visible pb-10 pt-24 text-ink min-h-[100vh] sm:pb-4 sm:pt-24 md:pb-6 md:pt-32 md:justify-between md:overflow-visible xl:pb-16 xl:pt-40"
        id="solution"
        style={heroHeightStyle}
      >
        <div className="mx-auto flex w-full max-w-[min(1440px,100%)] flex-col gap-8 px-4 pt-4 pb-4 sm:px-6 sm:gap-10 sm:pt-12 sm:pb-6 lg:h-full lg:flex-row lg:items-center lg:gap-8 lg:pb-0 lg:pt-12">
          <div className="mt-0 flex flex-1 flex-col items-start justify-between gap-10 pb-6 sm:gap-8 sm:justify-center md:gap-8 md:justify-center md:pb-0 md:w-full md:max-w-[1100px] md:pr-12 lg:w-[80%] lg:max-w-none xl:pr-16 h-full">
            <div className="space-y-10 text-center sm:text-left sm:space-y-6 md:space-y-5 translate-y-[15%] sm:translate-y-0 md:translate-y-0 lg:-translate-y-[10%] w-full max-w-[min(1100px,100%)] pl-2 lg:max-w-none lg:w-auto lg:pl-6 xl:pl-10">
              <h1 className="text-[clamp(1.52rem,5.8vw,2.6rem)] font-display font-semibold leading-[1.1] whitespace-nowrap overflow-visible bg-gradient-to-r from-[#D46BFF] via-[#F9B4F1] to-[#4B8BFF] bg-clip-text text-transparent sm:text-[clamp(1.25rem,4.6vw,3.2rem)]">
                Your social reputation matters
              </h1>
              <p className="text-[clamp(0.85rem,2.6vw,1.15rem)] font-semibold leading-snug text-ink sm:text-[clamp(0.9rem,2.1vw,1.35rem)]">
                Meet Elara, your AI Social Reputation Manager for the visitor economy.
              </p>
              <p className="mt-0 sm:mt-1 text-[clamp(0.75rem,2.2vw,0.98rem)] font-normal leading-relaxed text-ink sm:text-[clamp(0.8rem,1.9vw,1.1rem)]">
                She reads every review, replies instantly, understands visitor emotions and supports your business every
                day.
              </p>
              <div className="mt-10 sm:mt-8 md:mt-6 w-full lg:mt-10 md:max-w-none lg:max-w-none mx-auto">
                <div className="space-y-2 text-center sm:text-left text-[clamp(0.75rem,2.2vw,0.98rem)] leading-relaxed text-ink sm:text-[clamp(0.8rem,1.9vw,1.1rem)]">
                  <p className="m-0 font-semibold">Powered by nrtureAI™ Platform.</p>
                </div>
                <div className="mt-12 flex flex-col items-center gap-2">
                  <a
                    href="https://elara.nrture.ai/book-a-demo/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-black px-7 py-3 text-base font-semibold text-white transition hover:bg-neutral-900 sm:w-auto"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x={3} y={5} width={18} height={16} rx={2} />
                      <path d="M16 3v4M8 3v4M3 11h18M8 15h2m4 0h2M8 19h2m4 0h2" />
                    </svg>
                    <span>Request a demo</span>
                  </a>
                  <p className="mt-0 text-center text-sm text-neutral-600 sm:text-base">
                    Live in Australia today. Join the waitlist for other regions.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-3 w-full pl-2 lg:pl-6 xl:pl-10 text-center sm:text-left text-[clamp(0.7rem,1.8vw,0.9rem)] font-semibold text-neutral-600 sm:text-[clamp(0.75rem,1.6vw,1rem)]">
              Made for cafes, restaurants, attractions, tours, hotels, venues, precincts, councils and airports.
            </div>
          </div>
          <div className="mt-4 sm:mt-2 flex flex-1 items-center justify-center lg:mt-0 lg:w-[20%]">
            <div className="relative w-full max-w-[156px] sm:max-w-[180px] md:max-w-[204px] lg:max-w-[216px] lg:-translate-x-[15%]">
              <Iphone15Pro src={loopingGifSrc} className="h-auto w-full" />
              <div className="pointer-events-none absolute inset-x-1 bottom-4 sm:inset-x-2 sm:bottom-5 lg:inset-x-1 lg:bottom-4">
                <div className="mx-auto w-[80%] sm:w-[75%] rounded-[12px] border border-white/60 bg-white/95 px-2 py-1 text-left text-[0.55rem] font-semibold text-neutral-900 backdrop-blur sm:px-3 sm:py-1 sm:text-[0.65rem] lg:rounded-[14px] lg:px-3 lg:py-[6px] lg:text-[0.52rem]">
                  <p className="leading-tight text-neutral-900">Hi, I’m Elara!</p>
                  <p className="text-[0.48rem] font-normal text-neutral-500 sm:text-[0.56rem]">
                    You got 7 reviews today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-white mt-4 pt-10 pb-0 text-ink sm:mt-10 sm:pt-6 sm:pb-0 md:translate-y-0 md:mt-8 md:pt-8 md:pb-1 lg:mt-0 lg:pt-8 lg:pb-1 xl:pt-10 xl:pb-2"
        id="elara"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="space-y-4 text-center">
            <div className="inline-flex w-full flex-wrap items-baseline justify-center gap-2 -mx-4 sm:mx-0">
              <span className="text-[clamp(1.55rem,5.7vw,2.5rem)] font-display font-semibold leading-tight tracking-tight text-ink sm:text-[clamp(1.6rem,4.4vw,2.6rem)] lg:text-[3.2rem]">
                The <span className="text-sky-600">nrtureAI platform,</span>
              </span>
              <TextGenerateEffect
                words="your space for simple, real time visitor intelligence"
                className="font-display font-semibold text-ink"
                textClassName="text-[clamp(1.55rem,5.7vw,2.5rem)] sm:text-[clamp(1.6rem,4.4vw,2.6rem)] lg:text-[2.6rem] leading-tight tracking-tight lg:whitespace-nowrap"
                wrapperClassName="mt-0"
                duration={0.4}
              />
            </div>
          </div>
          <div className="mt-6 md:mt-6 lg:mt-8">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <div className="w-full lg:w-[38%] xl:w-[40%] flex justify-center pl-0 sm:pl-0 lg:pl-14 xl:pl-20">
                <div className="relative flex h-auto w-full max-w-[min(640px,100%)] items-center justify-center overflow-visible mx-auto px-4 sm:px-6 lg:px-0 lg:h-[480px] xl:h-[520px]">
                  <Ipad
                    width={1182}
                    height={816}
                    src={ipadScreenshot}
                    className="w-full max-w-[520px] h-auto text-neutral-100 origin-center scale-[1.1] sm:scale-100 sm:max-w-none sm:w-full lg:scale-[1.25] lg:h-auto lg:w-auto lg:max-w-none xl:scale-[1.25] xl:-translate-x-4 xl:-translate-y-[10%] 2xl:scale-[1.45] 2xl:-translate-x-6 2xl:-translate-y-[10%]"
                  />
                </div>
              </div>
              <div className="w-full lg:w-[60%] flex justify-center lg:justify-start lg:pl-10">
                <StickyScroll
                  content={stickyFeatureContent}
                  className="md:py-4 lg:py-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
