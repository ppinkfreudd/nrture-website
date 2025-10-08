export function TorontoTeaserSection() {
  return (
    <section className="bg-white py-24" id="toronto">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
            Conference: ACI-NA • Booth 212
          </span>
          <h2 className="section-heading">Turning Social Reviews into CX Delightors</h2>
          <p className="text-sm text-neutral-600">
            We’re packing our bags for Toronto! Meet the tRetail Labs crew at the 2025 ACI-NA &amp; ACI World Annual
            General Assembly, Conference &amp; Exhibition, Oct 24–28. Swing by Booth 212 to see how Elara’s AI + human
            coalition replies to every traveller, escalates service blind spots, and turns CX moments into ROI.
          </p>
        </div>
        <div className="flex-1">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[3rem] border border-neutral-200 bg-gradient-to-br from-brand-200 via-white to-brand-50 shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(13,110,253,0.12),transparent),radial-gradient(circle_at_80%_80%,rgba(255,143,143,0.15),transparent)]" />
            <div className="relative flex h-full w-full flex-col justify-between p-10 text-neutral-800">
              <div className="flex items-center justify-between text-sm font-medium uppercase tracking-widest text-neutral-600">
                <span>Video Placeholder</span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-neutral-400">00:50</span>
              </div>
              <div>
                <p className="text-2xl font-display font-semibold text-ink">
                  “Millions of Social Reviews. Zero Replies?”
                </p>
                <p className="mt-4 max-w-md text-sm text-neutral-600">
                  Toronto reel teaser highlighting the Elara workflow: dashboards pulsing with alerts, agent avatars
                  surfacing insights, and travellers experiencing fast recovery moments.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full bg-ink px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-sm">
                  Play concept
                </button>
                <span className="text-xs uppercase tracking-wider text-neutral-500">
                  Meet us in Toronto • Human voiceover optional • ROI graph animates up
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
