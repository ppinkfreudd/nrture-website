import screenshotWebsite from "../assets/screenshot-website.png";
import benchmarkScreenshot from "../assets/benchmark.png";
import reportsScreenshot from "../assets/reports.png";

const intelligencePillars = [
  {
    id: "01",
    title: "Intelligent Replies",
    description:
      "Reads every visitor's voice, replies in your tone, and protects your reputation without stealing your time.",
    accent: "text-[#7d66ff]",
    gradient: "from-[#dfe9ff] via-[#f4e5ff] to-[#e0f9ff]",
    image: screenshotWebsite,
    imageAlt: "Elara intelligent replies interface",
    imageFitClass: "object-cover",
  },
  {
    id: "02",
    title: "Intelligent Benchmarking",
    description:
      "See how you stand against your peers with honest and neutral benchmarking that shows where you shine and where to lift.",
    accent: "text-[#ff5ebc]",
    gradient: "from-[#ffe9f6] via-[#f0f3ff] to-[#ecfbff]",
    image: benchmarkScreenshot,
    imageAlt: "Intelligent benchmarking interface",
    imageFitClass: "object-fill",
  },
  {
    id: "03",
    title: "Intelligent Reporting and Conversational Querying",
    description:
      "Understands every signal and reveals what matters through dashboards, intelligent reports and a conversational AI you can ask anytime.",
    accent: "text-[#14a1ff]",
    gradient: "from-[#e3fff8] via-[#e7f2ff] to-[#fef0ff]",
    image: reportsScreenshot,
    imageAlt: "Intelligent reporting and conversational querying dashboards",
    imageFitClass: "object-fill",
  },
];

export function MeetElaraSection() {
  return (
    <section
      id="product"
      className="bg-gradient-to-b from-[#ecf4ff] via-[#f4edff] to-[#e6fbff] -mt-12 pt-0 pb-16 sm:-mt-16 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center pt-6 sm:pt-10">
          <h2 className="bg-gradient-to-r from-[#6b5dff] via-[#8f68ff] to-[#38b6ff] bg-clip-text text-[clamp(2rem,4vw,3.1rem)] font-display font-semibold leading-tight text-transparent">
            Explore the next era of Visitor Experience Intelligence
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            nrtureAI reveals the true signals beneath every interaction. From emotion to intent to spend, it turns
            complexity into confident action.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {intelligencePillars.map((pillar) => (
            <div
              key={pillar.id}
              className="grid gap-8 border-b border-white/50 pb-10 sm:gap-10 lg:grid-cols-[minmax(0,480px)_1fr]"
            >
              <div className="space-y-4">
                <h3
                  className={`text-[clamp(1.8rem,3.4vw,2.8rem)] font-display font-semibold leading-tight ${pillar.accent}`}
                >
                  {pillar.title}
                </h3>
                <p className="text-xl leading-relaxed text-slate-700">{pillar.description}</p>
              </div>
              <div className="flex w-full justify-center lg:justify-start">
                <div
                  className={`relative min-h-[220px] w-full max-w-[520px] overflow-hidden rounded-[30px] shadow-inner sm:min-h-[260px] xl:min-h-[300px] lg:max-w-none ${
                    pillar.image ? "p-0" : "p-8 lg:p-10"
                  }`}
                >
                  <div className={`absolute inset-0 rounded-[30px] bg-gradient-to-br ${pillar.gradient}`} aria-hidden="true" />
                  {!pillar.image && (
                    <div className="absolute inset-x-16 bottom-10 h-8 rounded-full bg-white/60 blur-2xl" aria-hidden="true" />
                  )}
                  {pillar.image && (
                    <img
                      src={pillar.image}
                      alt={pillar.imageAlt || pillar.title}
                      className={`absolute inset-0 h-full w-full rounded-[30px] ${pillar.imageFitClass || "object-cover"}`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
