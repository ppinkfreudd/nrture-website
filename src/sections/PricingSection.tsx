const operatorTiers = [
  { range: "1–20 outlets", price: "$69", unit: "per outlet / month", original: "$138" },
  { range: "21–200 outlets", price: "$49", unit: "per outlet / month", original: "$98" },
  { range: "200+ outlets", price: "Custom", unit: "tailored program" },
];

const airportTiers = [
  { range: "< 20 locations", price: "$1000", unit: "per airport / month", original: "$2000" },
  { range: "20+ locations", price: "$500", unit: "per airport / month", original: "$1000" },
];

export function PricingSection() {
  return (
    <section className="bg-white pt-12 pb-24" id="pricing">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6">
        <div className="space-y-4">
          <h2 className="section-heading text-left">Play for free. Pay as you grow.</h2>
          <p className="section-subtitle text-left">
            Every plan includes unlimited branded surveys, Elara’s AI replies, CX dashboards, Social Reputation Score,
            and quarterly Emotion-to-Spend intelligence reports. Scale from a single outlet to multi-airport networks
            without losing empathy or control.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-neutral-600 sm:gap-3 sm:text-sm md:justify-start">
            <li className="rounded-full border border-neutral-200 px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap">Unlimited surveys</li>
            <li className="rounded-full border border-neutral-200 px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap">AI-crafted brand-safe replies</li>
            <li className="rounded-full border border-neutral-200 px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap">CX dashboards &amp; alerts</li>
            <li className="rounded-full border border-neutral-200 px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap">Social Reputation Score</li>
            <li className="rounded-full border border-neutral-200 px-3 py-1.5 sm:px-4 sm:py-2 whitespace-nowrap">Quarterly ROI intelligence</li>
          </ul>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-[3rem] border border-neutral-200 bg-neutral-50 p-8 shadow-lg">
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-semibold text-ink">F&amp;B &amp; Lounge Operators</h3>
              <p className="text-sm text-neutral-500">
                Ideal for concessionaires balancing multiple concepts across terminals. From $49/outlet per month.
              </p>
            </div>
            <div className="space-y-4">
              {operatorTiers.map((tier) => (
                <div
                  key={tier.range}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 transition hover:border-brand-200 hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold uppercase tracking-widest text-neutral-500">{tier.range}</span>
                    <div className="text-right">
                      <div className="text-3xl font-display font-semibold text-brand-600">{tier.price}</div>
                      <div className="text-xs uppercase tracking-widest text-neutral-400">{tier.unit}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-sm text-neutral-600">
              All operators receive every feature, 3-year price lock, and optional add-ons like Digital Human Assistant,
              historical back-fill, and competitor benchmarking.
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-[3rem] border border-neutral-900/10 bg-ink p-8 text-white shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-semibold">Airports</h3>
              <p className="text-sm text-neutral-300">
                Consolidate every outlet, lounge, and partner into a single social reputation command centre. From
                $500/airport per month.
              </p>
            </div>
            <div className="space-y-4">
              {airportTiers.map((tier) => (
                <div
                  key={tier.range}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-200/60 hover:bg-white/10"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold uppercase tracking-widest text-neutral-200">{tier.range}</span>
                    <div className="text-right">
                      <div className="text-3xl font-display font-semibold text-brand-100">{tier.price}</div>
                      <div className="text-xs uppercase tracking-widest text-neutral-400">{tier.unit}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-neutral-200">
                    Normally {tier.original}. Founding partners save 50% for 36 months.
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm text-neutral-100">
              All airport programs include peer benchmarking, optional Digital Human Assistant, and the upcoming “Curb to
              Gate” module (mid-2026 roadmap).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
