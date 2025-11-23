const elaraPortrait = new URL("../../elara.jpg", import.meta.url).href;

export function MeetElaraSection() {
  return (
    <section className="bg-white pt-4 pb-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:text-[0.7rem]">
            Meet Elara
          </p>
          <h2 className="mt-3 text-[clamp(1.6rem,4.2vw,2.6rem)] font-display font-semibold leading-tight text-ink">
            I am Elara, your AI Social Reputation Manager.
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-[32px]">
          <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center">
            <div className="w-full px-5 text-left text-[1.05rem] leading-relaxed text-neutral-900 sm:px-0 sm:text-[1.15rem] md:w-1/2 md:text-[1.25rem]">
              <div className="space-y-4 max-w-xl">
                <p className="text-neutral-900">
                  “I read your reviews the moment they appear, prepare thoughtful replies, monitor your peer signals and
                  highlight insights that support stronger visitor experiences and commercial results.
                </p>
                <p className="text-neutral-900">
                  I stay active every day so you can focus on your business.”
                </p>
                <p className="m-0 text-[clamp(0.9rem,2.1vw,1.1rem)] font-semibold text-ink sm:text-[clamp(0.95rem,2vw,1.2rem)]">
                  Powered by nrtureAI™ Platform.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={elaraPortrait}
                  alt="Elara, your AI Social Reputation Manager"
                  className="h-64 w-full object-cover object-center sm:h-72 md:h-80"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 text-left">
            <div className="space-y-3 text-[2.5rem] leading-tight sm:text-[2.8rem] md:text-[3.1rem]">
              <p className="font-medium bg-gradient-to-r from-[#D46BFF] via-[#F9B4F1] to-[#4B8BFF] bg-clip-text text-transparent">
                Your marketing efforts help visitors find you.
              </p>
              <p className="font-semibold bg-gradient-to-r from-[#D46BFF] via-[#F9B4F1] to-[#4B8BFF] bg-clip-text text-transparent">
                nrtureAI™ helps visitors choose you.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href="https://elara.nrture.ai/book-a-demo/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-900 bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black hover:text-white sm:px-8 sm:text-base"
              >
                Request a demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
