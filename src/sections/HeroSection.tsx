import { HeroWorkflowDemo } from "../components/HeroWorkflowDemo";

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

export function HeroSection() {
  return (
    <>
      <section className="relative bg-white pb-14" id="solution">
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 pt-14 md:flex-row md:items-center">
          <div className="flex-1 space-y-8 pb-6 md:pb-0 md:pr-12">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                Turning social reviews into CX intelligence
              </p>
              <h1 className="text-3xl font-display font-semibold leading-[1.08] text-ink md:text-5xl">
                AI for Social Reputation — Every Review, Every Reply
              </h1>
              <p className="text-base text-neutral-600 md:text-lg">
                From posts to photos to surveys, nrture handles them all: drafting responses, surfacing blind spots, and
                protecting reputation while driving ROI.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#talk-to-us"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-neutral-400 hover:bg-neutral-50"
              >
                <span>Try NrtureAI</span>
                <span aria-hidden="true" className="text-lg leading-none">
                  →
                </span>
              </a>
              <a
                href="https://apps.apple.com"
                className="inline-flex items-center gap-2 rounded-xl border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                  <path d="M19.69 16.67c-.46 1.06-.68 1.53-1.27 2.47-.83 1.3-2.01 2.93-3.46 2.95-1.29.01-1.62-.86-3.38-.86-1.76 0-2.13.84-3.41.87-1.37.03-2.42-1.48-3.26-2.77C3.24 17.42 1.97 13.3 3.76 10.3c.9-1.5 2.51-2.45 4.26-2.48 1.33-.03 2.58.92 3.38.92.79 0 2.33-1.14 3.93-.97.67.03 2.55.27 3.76 2.07-.1.06-2.24 1.31-2.21 3.94.02 3.13 2.7 4.17 2.72 4.17zM15.7 5.78c.72-.89 1.22-2.14 1.08-3.38-1.05.04-2.3.7-3.05 1.59-.67.77-1.26 2.04-1.11 3.25 1.18.09 2.35-.6 3.08-1.46z" />
                </svg>
                <span>Install iOS App</span>
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-end mt-8 md:mt-0">
            <HeroWorkflowDemo />
          </div>
        </div>
      </section>
      <section className="bg-white pt-2 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-5 max-w-3xl space-y-3 md:text-left">
            <h2 className="text-2xl font-display font-semibold text-ink md:text-4xl">
              Elara instantly routes reviews and critical signals to the right airport team
            </h2>
            <p className="text-sm text-neutral-600 md:text-base">
              Track outlets and lounges from any location, and let AI trigger fast, brand-true responses.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              {STORY_STEPS.map((step, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                const toneBadgeClass =
                  TONE_BADGE_STYLES[step.review.tone] ?? "bg-neutral-100 text-neutral-600 border-neutral-200";
                return (
                  <div key={step.id} className="relative flex-1">
                    {index < STORY_STEPS.length - 1 && (
                      <span className="pointer-events-none absolute right-[-18px] top-10 hidden h-px w-12 bg-gradient-to-r from-brand-200 via-brand-100 to-transparent lg:block" />
                    )}
                    <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:gap-5">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-600">
                            {stepNumber}
                          </span>
                          <span className="text-neutral-600">{step.eyebrow}</span>
                        </div>
                        <p className="mt-3 text-sm text-neutral-700">{step.summary}</p>
                        <p className="mt-2 text-xs text-neutral-500">{step.detail}</p>
                      </div>
                      <div className="rounded-2xl border border-dashed border-brand-100 bg-gradient-to-br from-brand-50/60 via-white to-white p-4">
                        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                          <span>{step.review.platform}</span>
                          <span>{step.review.timestamp}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${toneBadgeClass}`}
                          >
                            {step.review.tone}
                          </span>
                          <span className="text-[11px] font-medium text-neutral-500">{step.review.author}</span>
                        </div>
                        <p className="mt-3 text-sm text-neutral-800">&ldquo;{step.review.snippet}&rdquo;</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
