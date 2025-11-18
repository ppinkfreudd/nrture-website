import { useEffect, useState } from "react";
import { GoogleReviewPile } from "../components/GoogleReviewPile";
import { DeviceShowcase } from "../components/DeviceShowcase";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
import { ColourfulText } from "../components/ui/colourful-text";
import { AuroraBackground } from "../components/ui/aurora-background";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

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
    id: "instant-replies",
    title: "Replies instantly, on tone, always",
    description:
      "Elara trains on your outlet's brand voice, compliance guardrails and languages so every response feels human. We've built emotion into the engine.",
    eyebrow: "Tone-safe autopilot",
    footnote: "Drafts return in under three minutes with full audit trails.",
  },
  {
    id: "flag-issues",
    title: "Flags urgent issues before they escalate",
    description:
      "High-intent and negative reviews are escalated with a recommended recovery play.",
    eyebrow: "Live risk radar",
    footnote: "Send context packs to ops leads while the guest is still on-site.",
    hideAnnotation: true,
  },
  {
    id: "survey-orchestration",
    title: "Automatically plans additional surveys for deeper clarity",
    description:
      "Elara suggeests surveys targeted to the review to gather more context and feedback for your business.",
    eyebrow: "Adaptive research",
    footnote: "Survey cadence respects fatigue caps and plugs straight into your CRM.",
  },
  {
    id: "peer-benchmarking",
    title: "Delivers real time peer benchmarking",
    description:
      "Compare your reputation across outlets and hubs.",
    eyebrow: "Live peer board",
    footnote: "Benchmarks refresh hourly across airports, lounges and precincts.",
  },
] as const;

export function HeroSection() {
  const [gifCycle, setGifCycle] = useState(0);
  const [phase, setPhase] = useState<"cards" | "phone">("cards");
  const [phaseLocked, setPhaseLocked] = useState(false);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const updateViewportSize = () => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
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

  useEffect(() => {
    if (typeof window === "undefined" || phaseLocked) return undefined;
    const CARD_WINDOW_DURATION = 2100 * 3 + 600;
    const PHONE_STAY_DURATION = 3200;
    const delay = phase === "cards" ? CARD_WINDOW_DURATION : PHONE_STAY_DURATION;
    const timeout = window.setTimeout(() => {
      if (phase === "cards") {
        setPhase("phone");
      } else {
        setPhaseLocked(true);
      }
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [phase, phaseLocked]);

  const loopingGifSrc = `${elaraGif}?cycle=${gifCycle}`;
  const stickyFeatureContent = FEATURE_SCROLL_STEPS.map((feature) => ({
    title: feature.title,
    description: feature.description,
    content: (
      <FeatureDevicePanel
        key={feature.id}
        phase={phase}
        phoneSrc={loopingGifSrc}
        tabletSrc={ipadScreenshot}
      />
    ),
  }));

  const mobileViewportOffset = viewportWidth && viewportWidth < 768 ? 96 : 0;
  const heroHeightBoost =
    viewportWidth && viewportWidth >= 1280
      ? 120
      : viewportWidth && viewportWidth >= 1024
        ? 90
        : viewportWidth && viewportWidth >= 768
          ? 90
          : 90;
  const effectiveViewportHeight = viewportHeight ? Math.min(viewportHeight, 1200) : null;
  const heroMinHeight = effectiveViewportHeight
    ? `${Math.max(effectiveViewportHeight - mobileViewportOffset, 520) + heroHeightBoost}px`
    : viewportWidth && viewportWidth < 768
      ? `calc(100vh - ${Math.max(mobileViewportOffset - heroHeightBoost * 0.4, 0)}px + ${Math.round(heroHeightBoost * 0.35)}px)`
      : `calc(100vh + ${heroHeightBoost}px)`;
  const shouldClampHeroHeight = viewportWidth !== null && viewportWidth >= 1024 && !!effectiveViewportHeight;
  const heroHeightStyle = shouldClampHeroHeight
    ? { minHeight: heroMinHeight, maxHeight: heroMinHeight }
    : { minHeight: heroMinHeight };

  return (
    <>
      <AuroraBackground
        fitContent
        fullBleed
        className="-mt-24 items-stretch justify-start bg-transparent pb-0 pt-18 [--aurora-offset:-4rem] sm:-mt-28 sm:pt-20 sm:[--aurora-offset:-4.25rem] md:-mt-12 md:pb-10 md:pt-32 md:[--aurora-offset:-2.5rem] xl:-mt-10 xl:pb-16 xl:pt-40 xl:[--aurora-offset:-2rem]"
        style={heroHeightStyle}
      >
        <section className="relative flex h-full flex-col justify-start overflow-hidden pb-3 text-ink sm:pb-4 md:pb-6 md:justify-between md:overflow-visible" id="solution">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-8 pb-4 sm:px-6 sm:gap-10 sm:pt-12 sm:pb-6 md:h-full md:flex-row md:items-center md:gap-12 md:pb-0 md:pt-12">
            <div className="mt-[30vh] flex flex-1 flex-col gap-6 pb-0 md:mt-0 md:w-[68%] md:max-w-[880px] md:pb-0 md:pr-12 lg:w-[70%] lg:max-w-[940px] xl:w-[72%] xl:max-w-[980px]">
              <div className="space-y-4 sm:space-y-5 md:translate-y-0 xl:-translate-y-[20%]">
                <h1 className="space-y-2 text-3xl font-display font-semibold leading-tight text-ink sm:text-[2.35rem] md:text-[2.7rem] lg:text-[3rem] xl:text-[3.1rem]">
                  <span className="block">What visitors feel becomes your</span>
                  <span className="block">
                    {" "}
                    <ColourfulText
                      text="reputation."
                      className="inline-block"
                      variant="solid"
                      animated={false}
                    />
                  </span>
                  <span className="block">
                    What they experience becomes your
                  </span>
                  <ColourfulText
                      text="revenue."
                      className="inline-block"
                      variant="solid"
                      animated={false}
                    />
                </h1>
                <div className="space-y-2 text-[0.92rem] leading-relaxed text-white sm:text-[1rem]">
                  <p className="flex gap-2">
                    <span className="text-white">•</span>
                    <span>
                      nrtureAI blends reviews, emotions and behaviour to reveal the real drivers of spend, satisfaction
                      and loyalty.
                    </span>
                  </p>
                  <p className="flex gap-2">
                    <span className="text-white">•</span>
                    <span>
                      Purpose-built for the Visitor Economy — across airports, zoos, museums, cruises, markets, parks and
                      retail precincts.
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:hidden">
                <GoogleReviewPile className="pointer-events-auto mx-auto mt-3 block w-full max-w-[260px] sm:mt-4 sm:max-w-[340px]" />
              </div>
              <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap sm:gap-3 sm:pt-4 md:mt-4 md:gap-4 xl:-translate-y-[170%]">
                <a
                  href="https://apps.apple.com"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900 sm:w-auto"
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
                  <span>Book demo</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:w-[32%] lg:w-[30%]">
              <div className="hidden w-full justify-center md:flex">
                <GoogleReviewPile />
              </div>
            </div>
          </div>
        </section>
      </AuroraBackground>
      <section className="bg-white mt-24 pt-4 pb-12 text-ink sm:mt-28 sm:pt-6 md:mt-32 md:pt-8 md:pb-16" id="elara">
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4 text-center">
            <div className="inline-flex flex-wrap items-baseline justify-center gap-2">
              <span className="text-[clamp(1.2rem,5vw,1.9rem)] font-display font-semibold leading-tight tracking-tight text-ink sm:text-[clamp(1.4rem,4.2vw,2.3rem)] lg:text-[2.8rem]">
                Introducing <span className="text-sky-600">Elara,</span>
              </span>
              <TextGenerateEffect
                words="your AI social reputation manager"
                className="font-display font-semibold text-ink"
                textClassName="text-[clamp(1.2rem,5vw,1.9rem)] sm:text-[clamp(1.4rem,4.2vw,2.3rem)] lg:text-[2.8rem] leading-tight tracking-tight"
                wrapperClassName="mt-0"
                duration={0.4}
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <StickyScroll
              content={stickyFeatureContent}
              contentClassName="mx-auto flex w-full min-h-[420px] items-center justify-center overflow-visible bg-transparent p-0 shadow-none sm:min-h-[500px] md:max-w-[420px] md:min-h-[520px] lg:max-w-[540px] lg:min-h-[560px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureDevicePanel({
  phoneSrc,
  tabletSrc,
  phase,
}: {
  phoneSrc: string;
  tabletSrc?: string;
  phase: "cards" | "phone";
}) {
  return (
    <div className="relative flex w-full min-h-[420px] items-center justify-center overflow-visible sm:min-h-[500px] lg:min-h-[560px]">
      <div className="flex w-full justify-center lg:justify-end">
        <div className="w-full max-w-[720px] sm:max-w-[860px] md:max-w-[1000px] lg:max-w-[1120px] xl:max-w-[1280px]">
          <DeviceShowcase phoneSrc={phoneSrc} tabletSrc={tabletSrc} phase={phase} />
        </div>
      </div>
    </div>
  );
}
