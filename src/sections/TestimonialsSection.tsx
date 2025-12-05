import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

type TestimonialSlide = {
  id: string;
  company: string;
  person: string;
  role: string;
  quote: string;
  initials: string;
  accent: string;
  tagline: string;
};

const testimonialSlides: TestimonialSlide[] = [
  {
    id: "airconnect",
    company: "AirConnect Lounges",
    person: "Sia Bradfield",
    role: "COO",
    quote:
      "We reply to every guest in minutes now. Elara keeps tone, facts, and offers on-brand even when the airport gets chaotic.",
    initials: "AC",
    accent: "from-[#fddff3] via-[#fef3ff] to-[#fdf9ff]",
    tagline: "Lounges",
  },
  {
    id: "cedar",
    company: "Cedar & Stone Retreat",
    person: "Rohan Desai",
    role: "Founder",
    quote:
      "TripAdvisor, Google, Instagram – it’s finally one conversation. We can see emotion-to-spend moves in real time.",
    initials: "CS",
    accent: "from-[#dff7ff] via-[#f0fbff] to-[#ffffff]",
    tagline: "Wellness",
  },
  {
    id: "flare",
    company: "Flare Hospitality Group",
    person: "Marta Velasquez",
    role: "VP Guest Experience",
    quote:
      "Nurture fights churn. Regional GMs have one playbook, but the AI still sounds human to every diner or guest.",
    initials: "FH",
    accent: "from-[#e4ebff] via-[#f3f6ff] to-[#ffffff]",
    tagline: "Hotels",
  },
  {
    id: "gilded",
    company: "Gilded Market Hall",
    person: "Leo Wilkins",
    role: "Head of Retail",
    quote:
      "Vendors get alerts when sentiment dips near their stalls. That proximity signal alone grew basket size 18%.",
    initials: "GM",
    accent: "from-[#fff4de] via-[#fff7ea] to-[#ffffff]",
    tagline: "Retail",
  },
  {
    id: "openharbor",
    company: "OpenHarbor Cruises",
    person: "Nitsa Alvarez",
    role: "Chief Experience Officer",
    quote:
      "Each port has nuance; Elara catches it. Our crew sees suggested responses before guests even reach their deck.",
    initials: "OH",
    accent: "from-[#e3ffe5] via-[#f0fff2] to-[#ffffff]",
    tagline: "Cruise",
  },
];

const trustedByLogos = [
  "Skyport Suites",
  "Atlas Collective",
  "Verve Dining",
  "Hearthstone Spas",
  "OpenHarbor Cruises",
  "District Markets",
  "Aurora Aviation",
  "Harborline Hotels",
  "NEON Galleries",
  "Civic Commons",
  "Lumen Resorts",
  "Atelier Cafes",
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = testimonialSlides.length;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (nextIndex: number) => {
    setActiveIndex((nextIndex + totalSlides) % totalSlides);
  };

  const getSlideByOffset = (offset: number) => {
    const index = (activeIndex + offset + totalSlides) % totalSlides;
    return { slide: testimonialSlides[index], index };
  };

  const displayOffsets = [-1, 0, 1];

  return (
    <section className="relative bg-[#f9fbff] py-16 sm:py-24" id="testimonials">
      <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-72 max-w-6xl rounded-full bg-gradient-to-r from-[#fee6fb]/70 via-white to-[#dff1ff]/60 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Testimonials
            </p>
            <h2 className="text-3xl font-display font-semibold text-ink sm:text-[2.5rem]">
              Operators swipe through proof in seconds
            </h2>
            <p className="max-w-2xl text-base text-neutral-600">
              Each logo opens its own play-by-play so teams can skim sentiment data, voice, and impact
              without digging into dashboards.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white text-neutral-700 transition hover:border-black/30 hover:text-ink"
              onClick={() => goToSlide(activeIndex - 1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white text-neutral-700 transition hover:border-black/30 hover:text-ink"
              onClick={() => goToSlide(activeIndex + 1)}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {displayOffsets.map((offset) => {
            const { slide, index } = getSlideByOffset(offset);
            const isActive = offset === 0;
            return (
              <article
                key={`${slide.id}-${index}`}
                className={cn("transition-all duration-500 ease-out", isActive ? "scale-100" : "scale-95 opacity-80")}
                role="group"
                aria-roledescription="testimonial"
                aria-label={`${slide.company} testimonial`}
              >
                <div
                  className={cn(
                    "h-full rounded-[2.5rem] border border-black/5 bg-white p-6",
                    "shadow-[0_18px_48px_rgba(15,23,42,0.08)]",
                    isActive ? "ring-2 ring-[#6b5dff]/30" : "bg-white/80",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 text-lg font-semibold text-[#1e1e1e]",
                        "bg-gradient-to-br",
                        slide.accent,
                      )}
                    >
                      {slide.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                        {slide.tagline}
                      </p>
                      <p className="text-lg font-display text-ink">{slide.company}</p>
                    </div>
                  </div>
                  {isActive && (
                    <>
                      <p className="mt-6 text-base leading-relaxed text-neutral-700">“{slide.quote}”</p>
                      <div className="mt-6 space-y-1 text-sm">
                        <p className="font-semibold text-ink">{slide.person}</p>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{slide.role}</p>
                      </div>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 rounded-[2.5rem] border border-black/5 bg-white/80 p-8 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Trusted by 100% of businesses we power
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-neutral-600 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {trustedByLogos.map((logo) => (
                <div
                  key={logo}
                  className="rounded-2xl border border-transparent bg-neutral-50 px-4 py-3 text-center text-neutral-700 transition hover:border-black/10 hover:bg-white"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
