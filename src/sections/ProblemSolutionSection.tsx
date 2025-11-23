export function ProblemSolutionSection() {
  return (
    <section className="bg-white mt-6 pt-0 pb-10 sm:-mt-1 sm:pt-0 sm:pb-12 md:-mt-1 md:pt-0 md:pb-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-7 text-center sm:mb-8 md:mb-10">
          <p className="text-[clamp(1.52rem,5.8vw,2.6rem)] font-display font-semibold leading-tight tracking-tight text-ink sm:text-[clamp(1.6rem,4.4vw,2.6rem)] lg:text-[3.2rem]">
            Save time. Elevate every visitor moment.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-3 md:gap-6 lg:gap-8 items-stretch">
          {/* Problem card */}
          <div className="flex h-full flex-col rounded-3xl border border-rose-100 bg-white px-5 py-6 text-left shadow-[0_18px_45px_rgba(244,63,94,0.12)] sm:px-6 sm:py-7">
            <h3 className="text-sm font-semibold text-rose-600 sm:text-base">Problem</h3>
            <p className="mt-1 text-[0.8rem] text-neutral-500 sm:text-[0.85rem]">
              → The awareness gap
            </p>
            <div className="mt-4 space-y-2 text-[0.9rem] leading-relaxed text-neutral-900 sm:text-[0.98rem]">
              <p className="font-semibold">93% of visitors decide by reading reviews.</p>
              <p className="font-semibold">80% of businesses do not read their own reviews.</p>
              <p>This gap quietly erodes trust, spend and repeat visits.</p>
            </div>
          </div>

          {/* Solution card */}
          <div className="flex h-full flex-col rounded-3xl border border-emerald-100 bg-white px-5 py-6 text-left shadow-[0_18px_45px_rgba(16,185,129,0.14)] sm:px-6 sm:py-7">
            <h3 className="text-sm font-semibold text-emerald-700 sm:text-base">Solution</h3>
            <p className="mt-1 text-[0.8rem] text-neutral-500 sm:text-[0.85rem]">
              → Instant intelligence
            </p>
            <div className="mt-4 space-y-3 text-[0.9rem] leading-relaxed text-neutral-900 sm:text-[0.98rem]">
              <p>The nrtureAI Platform brings instant clarity.</p>
              <p>
                Elara reads your reviews, autowrites drafts, understands emotions and shows you the peer
                context that shapes visitor experience and commercial outcomes.
              </p>
            </div>
          </div>

          {/* Key benefits card */}
          <div className="flex h-full flex-col rounded-3xl border border-sky-100 bg-white px-5 py-6 text-left shadow-[0_18px_45px_rgba(59,130,246,0.12)] sm:px-6 sm:py-7">
            <h3 className="text-sm font-semibold text-sky-700 sm:text-base">Key benefits</h3>
            <p className="mt-1 text-[0.8rem] text-neutral-500 sm:text-[0.85rem]">
              → Confidence to act
            </p>
            <p className="mt-3 text-[0.9rem] font-medium text-neutral-900 sm:text-[0.98rem]">
              With Elara and the nrtureAI Platform you can:
            </p>
            <ul className="mt-4 space-y-2 text-[0.9rem] leading-relaxed text-neutral-900 sm:text-[0.98rem]">
              <li>• reply to every review instantly</li>
              <li>• understand visitor emotions</li>
              <li>• see how you compare with peers</li>
              <li>• uncover spend signals</li>
              <li>• reduce manual work</li>
              <li>• act with clarity and confidence</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 space-y-2">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-neutral-600 sm:text-[0.8rem]">
            Who we support
          </p>
          <div className="rounded-[999px] bg-gradient-to-r from-[#D46BFF] via-[#F9B4F1] to-[#4B8BFF] p-[1px] shadow-[0_18px_55px_rgba(15,23,42,0.18)]">
            <div className="flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-[999px] bg-white/90 px-4 py-3 text-[0.8rem] font-medium text-neutral-900 sm:px-6 sm:py-3 sm:text-sm">
              <span>Cafes</span>
              <span>Restaurants</span>
              <span>Attractions</span>
              <span>Tours</span>
              <span>Hotels</span>
              <span>Venues</span>
              <span>Precincts</span>
              <span>Cities</span>
              <span>Councils</span>
              <span>Airports</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
