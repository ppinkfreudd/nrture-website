import { useEffect, useState } from "react";
import { DeviceShowcase } from "../components/DeviceShowcase";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";
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
    viewportSize !== null && viewportSize.width >= 1280
      ? {
          minHeight: `${viewportSize.height}px`,
          height: `${viewportSize.height}px`,
        }
      : undefined;

  const loopingGifSrc = `${elaraGif}?cycle=${gifCycle}`;
  const stickyFeatureContent = FEATURE_SCROLL_STEPS.map((feature) => ({
    title: feature.title,
    description: feature.description,
    content: (
      <FeatureDevicePanel
        key={feature.id}
        phase="phone"
        phoneSrc={loopingGifSrc}
        tabletSrc={ipadScreenshot}
      />
    ),
  }));

  return (
    <>
      <section
        className="relative -mt-24 box-border flex h-full flex-col justify-center overflow-hidden pb-12 pt-18 text-ink min-h-[100vh] sm:-mt-28 sm:pb-4 sm:pt-20 md:-mt-12 md:pb-6 md:pt-32 md:justify-between md:overflow-visible xl:-mt-10 xl:pb-16 xl:pt-40"
        id="solution"
        style={heroHeightStyle}
      >
        <div className="mx-auto flex w-full max-w-[min(1440px,100%)] flex-col gap-8 px-4 pt-6 pb-4 sm:px-6 sm:gap-10 sm:pt-12 sm:pb-6 lg:h-full lg:flex-row lg:items-center lg:gap-12 lg:pb-0 lg:pt-12">
          <div className="mt-0 flex flex-1 flex-col items-center justify-center gap-10 pb-10 sm:gap-8 md:gap-8 md:pb-0 md:w-full md:max-w-[1100px] md:pr-12 lg:max-w-[1300px] xl:max-w-[1400px] xl:pr-16 h-full">
            <div className="space-y-8 text-center sm:space-y-6 md:space-y-5 md:translate-y-0 w-full max-w-[min(640px,100%)] mx-auto lg:max-w-none lg:w-auto lg:mx-0">
              <h1 className="text-[clamp(0.98rem,5.3vw,4.1rem)] font-display font-semibold leading-[1.1] text-center whitespace-nowrap overflow-visible bg-gradient-to-r from-[#D46BFF] via-[#F9B4F1] to-[#4B8BFF] bg-clip-text text-transparent px-2 sm:text-[clamp(1.1rem,6vw,4.6rem)] sm:whitespace-normal">
                Your social reputation matters
              </h1>
              <p className="text-center text-[clamp(1.05rem,4.2vw,2.205rem)] font-semibold leading-snug text-ink sm:text-[clamp(1.2rem,3.4vw,2.3rem)]">
                Stop losing customers to unanswered reviews.
                <span className="block">Turn every review into revenue.</span>
              </p>
              <div className="mt-12 sm:mt-8 md:mt-6 w-full lg:mt-10 md:max-w-[65%] lg:max-w-[55%] md:mx-auto lg:mx-auto">
                <div className="space-y-6 text-center text-[clamp(0.89rem,2.63vw,1.21rem)] leading-relaxed text-ink sm:space-y-3 md:space-y-4 sm:text-[clamp(0.95rem,2.1vw,1.3rem)]">
                  <p className="m-0">
                  nrtureAI turns every review into actionable intelligence by automating replies, decoding emotions, benchmarking peers, and revealing the drivers of spend and satisfaction
                  </p>
                  <p className="m-0">
                    Your guests are talking.
                    <span className="pb-0.5"> Make every response count.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 pt-0 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:pt-4 md:mt-4 md:gap-4">
              <div className="flex w-full justify-center">
                <div className="flex w-full max-w-[min(640px,100%)] justify-center">
                  <a
                    href="https://elara.nrture.ai/book-a-demo/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900 sm:w-auto"
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
            </div>
          </div>
        </div>
      </section>
      <section
        className="bg-white mt-12 pt-12 pb-12 text-ink sm:mt-10 sm:pt-6 md:translate-y-0 md:mt-8 md:pt-8 md:pb-16 lg:mt-0 lg:pt-8 lg:pb-16 xl:pt-10 xl:pb-16"
        id="elara"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="space-y-4 text-center transform -translate-y-[15vh] sm:transform-none">
            <div className="inline-flex flex-wrap items-baseline justify-center gap-2">
              <span className="text-[clamp(1.4rem,5.2vw,2.3rem)] font-display font-semibold leading-tight tracking-tight text-ink sm:text-[clamp(1.6rem,4.4vw,2.6rem)] lg:text-[3.2rem]">
                Introducing <span className="text-sky-600">Elara,</span>
              </span>
              <TextGenerateEffect
                words="your AI social reputation manager"
                className="font-display font-semibold text-ink"
                textClassName="text-[clamp(1.4rem,5.2vw,2.3rem)] sm:text-[clamp(1.6rem,4.4vw,2.6rem)] lg:text-[3.2rem] leading-tight tracking-tight"
                wrapperClassName="mt-0"
                duration={0.4}
              />
            </div>
          </div>
          <div className="mt-3 sm:mt-8 transform -translate-y-[20%] sm:transform-none">
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
