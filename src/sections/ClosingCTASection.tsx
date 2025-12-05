export function ClosingCTASection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-[clamp(2rem,4vw,3.15rem)] max-[657px]:text-[min(3.75vw,1.55rem)] font-display font-semibold leading-tight text-transparent whitespace-nowrap">
          Your marketing efforts help visitors find you.
        </p>
        <p className="mt-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-[clamp(2rem,4vw,3.15rem)] max-[657px]:text-[min(4.25vw,2rem)] font-display font-semibold leading-tight text-transparent">
          nrtureAI™ helps visitors choose you.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href="https://elara.nrture.ai/book-a-demo/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-8 py-3 text-base font-semibold text-white transition hover:opacity-90"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
