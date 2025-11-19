import React from "react";

type PricingPlan = {
  key: string;
  name: string;
  description: string;
  price?: string;
  secondaryPrice?: string;
  highlight?: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  variant: "lite" | "litePlus" | "pro" | "enterprise";
};

const plans: PricingPlan[] = [
  {
    key: "lite",
    name: "Lite",
    description: "For businesses starting to automate replies and track guest sentiment.",
    price: "$59",
    secondaryPrice: "/ month",
    benefits: [
      "Elara — AI Social Reputation Manager",
      "Emotion-to-Spend Intelligence Report",
    ],
    ctaLabel: "Start Lite",
    ctaHref: "https://nrture.ai/choose-plan/",
    variant: "lite",
  },
  {
    key: "litePlus",
    name: "Lite+",
    description: "For teams that need real-time peer benchmarking and cross‑brand insights.",
    price: "$99",
    secondaryPrice: "/ month",
    benefits: [
      "Everything in Lite",
      "Peer Benchmarking Report",
    ],
    ctaLabel: "Upgrade to Lite+",
    ctaHref: "https://nrture.ai/choose-plan/",
    variant: "litePlus",
  },
  {
    key: "pro",
    name: "Pro",
    description: "For operators unlocking dashboards, conversational analytics, and deeper intelligence.",
    price: "$249",
    secondaryPrice: "/ month",
    benefits: [
      "Everything in Lite+",
      "Social Reputation Dashboard & Conversational AI — Ask Elara Anything",
    ],
    ctaLabel: "Choose Pro",
    ctaHref: "https://nrture.ai/choose-plan/",
    variant: "pro",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description: "For airports, groups, and large portfolios needing command‑level intelligence.",
    price: "Curated",
    secondaryPrice: "",
    benefits: [
      "Everything in Advanced",
      "Strategic + Enterprise Intelligence",
    ],
    ctaLabel: "Request Enterprise",
    ctaHref: "https://nrture.ai/choose-plan/",
    variant: "enterprise",
  },
];

const variantStyles: Record<
  PricingPlan["variant"],
  {
    accent: string;
    badgeBg: string;
    badgeText: string;
    titleBg: string;
    titleText: string;
    titleHex: { background: string; color: string };
    ctaBgClass: string;
    ctaTextClass: string;
  }
> = {
  lite: {
    accent: "from-[#fde2f7] to-white",
    badgeBg: "bg-[#fde2f7]",
    badgeText: "text-[#701a4a]",
    titleBg: "bg-[#fde2f7]",
    titleText: "text-[#701a4a]",
    titleHex: { background: "#fde2f7", color: "#5b133d" },
    ctaBgClass: "bg-[#fde2f7]",
    ctaTextClass: "text-[#5b133d]",
  },
  litePlus: {
    accent: "from-[#fbd7f3] to-white",
    badgeBg: "bg-[#fbd7f3]",
    badgeText: "text-[#6b1b6f]",
    titleBg: "bg-[#fbd7f3]",
    titleText: "text-[#6b1b6f]",
    titleHex: { background: "#fbd7f3", color: "#5b0e5f" },
    ctaBgClass: "bg-[#fbd7f3]",
    ctaTextClass: "text-[#5b0e5f]",
  },
  pro: {
    accent: "from-[#f2d4ff] to-white",
    badgeBg: "bg-[#f2d4ff]",
    badgeText: "text-[#5a189a]",
    titleBg: "bg-[#f2d4ff]",
    titleText: "text-[#5a189a]",
    titleHex: { background: "#f2d4ff", color: "#4a148c" },
    ctaBgClass: "bg-[#f2d4ff]",
    ctaTextClass: "text-[#4a148c]",
  },
  enterprise: {
    accent: "from-[#daeafe] to-white",
    badgeBg: "bg-[#daeafe]",
    badgeText: "text-[#0c4a6e]",
    titleBg: "bg-[#daeafe]",
    titleText: "text-[#0c4a6e]",
    titleHex: { background: "#daeafe", color: "#0c4a6e" },
    ctaBgClass: "bg-[#daeafe]",
    ctaTextClass: "text-[#0c4a6e]",
  },
};
export function PricingSection() {
  const maxBenefits = Math.max(...plans.map((plan) => plan.benefits.length));
  return (
    <section className="bg-white pt-16 pb-10 scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        <header className="max-w-3xl space-y-5 pb-10 text-left">
          <h2 className="text-3xl font-display font-semibold text-ink sm:text-[2.75rem]">
            Find the plan that grows with you
          </h2>
        </header>
      </div>

      <div className="mx-auto mt-14 max-w-6xl px-3">
        <div className="space-y-6 sm:hidden">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.09)]"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div>
                  <p className="text-2xl font-display font-semibold text-ink">{plan.name}</p>
                  <p className="mt-2 text-sm text-neutral-600">{plan.description}</p>
                </div>
                {plan.highlight && (
                  <span
                    className={`rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.32em] ${variantStyles[plan.variant].badgeBg} ${variantStyles[plan.variant].badgeText}`}
                  >
                    {plan.highlight}
                  </span>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-baseline gap-2">
                <p className="text-3xl font-display font-semibold text-ink">{plan.price}</p>
                {plan.secondaryPrice && <p className="text-base text-neutral-600">{plan.secondaryPrice}</p>}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {plan.benefits.map((benefit, index) => (
                  <li key={`${plan.key}-mobile-benefit-${index}`} className="flex items-start gap-2">
                    <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-neutral-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${variantStyles[plan.variant].ctaBgClass} ${variantStyles[plan.variant].ctaTextClass} hover:bg-black hover:text-white`}
                style={{ fontFamily: "var(--font-sans, inherit)" }}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>

        <div className="hidden sm:block">
          <div className="pb-2">
            <div className="flex justify-center">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-0 rounded-[4.75rem] bg-white shadow-[0_22px_80px_rgba(15,23,42,0.08)]" />
                <div
                  className="relative overflow-hidden bg-white"
                  style={{
                    borderRadius: "4.5rem",
                  }}
                >
                  <div
                    className="grid w-full"
                    style={{
                      gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))`,
                      gridTemplateRows: `auto auto repeat(${maxBenefits}, auto) auto`,
                    }}
                  >
                    {plans.map((plan, columnIndex) => {
                      const column = columnIndex + 1;
                      const isFirst = columnIndex === 0;
                      const isLast = columnIndex === plans.length - 1;
                      const columnBorder = isFirst ? "" : "border-l border-black/10";

                      return (
                        <React.Fragment key={plan.key}>
                          <div
                            className={`flex h-full flex-col gap-1 px-5 py-6 ${columnBorder}`}
                            style={{
                              gridColumn: column,
                              gridRow: 1,
                              background: variantStyles[plan.variant].titleHex.background,
                              color: variantStyles[plan.variant].titleHex.color,
                              borderTopLeftRadius: isFirst ? "4.5rem" : undefined,
                              borderTopRightRadius: isLast ? "4.5rem" : undefined,
                            }}
                          >
                            <div className="flex flex-col items-center gap-2 text-center">
                              <p className="text-xl font-display font-semibold sm:text-2xl">{plan.name}</p>
                              {plan.highlight && (
                                <span
                                  className={`rounded-full px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.32em] sm:text-[0.6rem] ${variantStyles[plan.variant].badgeBg} ${variantStyles[plan.variant].badgeText}`}
                                >
                                  {plan.highlight}
                                </span>
                              )}
                            </div>
                            <p className="flex-1 text-center text-[0.6rem] leading-relaxed opacity-80 sm:text-[0.67rem]">
                              {plan.description}
                            </p>
                          </div>

                          <div
                            className={`flex items-center border-t border-black/12 px-5 py-3 text-[0.68rem] sm:text-xs ${columnBorder}`}
                            style={{
                              gridColumn: column,
                              gridRow: 2,
                            }}
                          >
                            <p className="font-display font-semibold text-ink text-[0.85rem] sm:text-sm">
                              {plan.price} {plan.secondaryPrice}
                            </p>
                          </div>

                          {Array.from({ length: maxBenefits }).map((_, rowIndex) => {
                            const benefit = plan.benefits[rowIndex];
                            return (
                              <div
                                key={`${plan.key}-benefit-${rowIndex}`}
                                className={`flex items-start gap-2 border-t border-black/12 px-5 py-1 text-[0.68rem] leading-relaxed text-neutral-700 sm:text-xs ${columnBorder}`}
                                style={{
                                  gridColumn: column,
                                  gridRow: rowIndex + 3,
                                }}
                              >
                                {benefit && <span>{benefit}</span>}
                              </div>
                            );
                          })}

                          <div
                            className={`group flex items-center justify-center border-t border-black/12 px-5 py-4 text-[0.68rem] sm:text-xs ${columnBorder} ${variantStyles[plan.variant].ctaBgClass} transition-colors duration-150 group-hover:bg-black`}
                            style={{
                              gridColumn: column,
                              gridRow: maxBenefits + 3,
                              borderBottomLeftRadius: isFirst ? "4.5rem" : "0",
                              borderBottomRightRadius: isLast ? "4.5rem" : "0",
                            }}
                          >
                            <a
                              href={plan.ctaHref}
                              className={`text-[0.68rem] transition-colors duration-150 sm:text-xs ${variantStyles[plan.variant].ctaTextClass} group-hover:text-white`}
                              style={{ fontFamily: "var(--font-sans, inherit)" }}
                            >
                              Choose {plan.name}
                            </a>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
