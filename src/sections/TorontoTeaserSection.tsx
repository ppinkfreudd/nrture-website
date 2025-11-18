import { useEffect, useRef, useState } from "react";

type ResearchSlide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  cardEyebrow?: string;
  cardTimer?: string;
  cardHeadline?: string;
  cardBody?: string;
  cardFootnote: string;
  cardStats?: {
    text: string;
    source: string;
    href: string;
  }[];
};

const researchSlides: ResearchSlide[] = [
  {
    id: "sample",
    badge: "Research",
    title: "Why your reviews matter",
    description:
      "“One bad review can wipe out as many as 30 prospective customers.”",
    cardHeadline: "",
    cardFootnote: "Sources: Podium, BrightLocal, GWI, ReviewTracker & more",
    cardStats: [
      {
        text: "81% of consumers use Google to vet local businesses.",
        source: "BrightLocal",
        href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
      },
      {
        text: "Nearly half of internet users post a review every month.",
        source: "GlobalWebIndex",
        href: "https://www.gwi.com/hubfs/Downloads/Brand_Discovery-2019.pdf",
      },
      {
        text: "Only 2% of people have never read an online review.",
        source: "BrightLocal",
        href: "https://www.brightlocal.com/research/local-consumer-review-survey/",
      },
      {
        text: "Reviews motivate purchases 1.5× more than discount offers.",
        source: "Bizrate Insights",
        href: "https://bizrateinsights.com/the-impact-of-customer-reviews-on-purchase-decisions/",
      },
      {
        text: "68% of travellers skip attractions that feel like tourist traps.",
        source: "Breaking Travel News",
        href: "https://www.breakingtravelnews.com/news/article/tourist-traps-among-biggest-travel-nightmares-for-consumers/",
      },
      {
        text: "17 in 20 shoppers hesitate if a brand has negative reviews.",
        source: "Invesp",
        href: "https://www.invespcro.com/blog/the-importance-of-online-customer-reviews-infographic/",
      },
      {
        text: "One bad review can wipe out as many as 30 prospective customers.",
        source: "Online Reputation Management",
        href: "https://www.onlinereputationmanagement.us/angry-customers-likely-post-bad-review-happy-customers-good-one/",
      },
      {
        text: "53% of consumers expect a fast reply when they leave a negative review.",
        source: "ReviewTrackers",
        href: "https://www.reviewtrackers.com/reports/online-reviews-survey/",
      },
      {
        text: "75% of businesses still ignore negative reviews.",
        source: "Keeping",
        href: "https://www.keeping.com/content/how-to-respond-to-negative-reviews/",
      },
    ],
  },
];

export function TorontoTeaserSection() {
  const currentSlide = researchSlides[0];
  const researchVideo = new URL("../../video.mp4", import.meta.url).href;
  const researchVideoPoster = new URL("../../screenshot-website.png", import.meta.url).href;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [capturedPoster, setCapturedPoster] = useState<string | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return undefined;
    let isCancelled = false;

    const captureFrame = () => {
      if (!videoEl || !videoEl.videoWidth || !videoEl.videoHeight) return;
      const canvas = document.createElement("canvas");
      canvas.width = videoEl.videoWidth;
      canvas.height = videoEl.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      if (!isCancelled) {
        setCapturedPoster(dataUrl);
      }
      videoEl.currentTime = 0;
      videoEl.pause();
    };

    const handleSeeked = () => {
      captureFrame();
      videoEl?.removeEventListener("seeked", handleSeeked);
    };

    const handleLoadedMetadata = () => {
      if (!videoEl) return;
      const targetTime = Math.min(2, videoEl.duration || 2);
      videoEl.addEventListener("seeked", handleSeeked);
      videoEl.currentTime = targetTime;
    };

    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      isCancelled = true;
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoEl.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <section className="bg-white pt-6 pb-20 mt-3 scroll-mt-24 sm:mt-2 sm:scroll-mt-28 md:mt-0 md:pt-12 md:pb-24 md:scroll-mt-32 lg:-mt-16 xl:-mt-24" id="toronto">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex-1 space-y-4 text-sm sm:space-y-5 sm:px-2 lg:pr-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-neutral-600 sm:text-xs">
            {currentSlide.badge}
          </span>
          <h2 className="text-2xl font-display font-semibold text-ink sm:text-[2.25rem]">{currentSlide.title}</h2>
          <p className="text-[0.9rem] text-neutral-600 whitespace-pre-line sm:text-[0.98rem]">
            {currentSlide.description}
            {"\n"}
            <a
              href="https://www.onlinereputationmanagement.us/angry-customers-likely-post-bad-review-happy-customers-good-one/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 underline-offset-2 hover:underline"
            >
              Online Reputation Management<span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
        <div className="flex-1 lg:-mr-4">
          <div className="relative w-full overflow-visible">
            <div className="mx-auto w-full overflow-hidden rounded-[3rem] border border-neutral-200 bg-gradient-to-br from-brand-200 via-white to-brand-50 shadow-[0_35px_90px_rgba(15,23,42,0.25)] sm:w-[105%] sm:translate-x-[-2.5%] lg:w-[110%] lg:translate-x-[-5%]">
              <div className="relative w-full overflow-hidden rounded-[3rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(13,110,253,0.16),transparent),radial-gradient(circle_at_80%_80%,rgba(255,143,143,0.18),transparent)]" />
                <div className="relative flex aspect-[16/9] w-full items-center justify-center p-0 sm:p-1 lg:p-2">
                  <video
                    ref={videoRef}
                    src={researchVideo}
                    controls
                    preload="metadata"
                    className="h-full w-full rounded-[2.6rem] object-cover shadow-[0_20px_65px_rgba(15,23,42,0.3)]"
                    poster={capturedPoster ?? researchVideoPoster}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
