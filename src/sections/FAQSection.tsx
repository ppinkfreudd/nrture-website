import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is Visitor Experience Intelligence?",
    answer:
      "Visitor Experience Intelligence is the ability to interpret what visitors feel, why they respond the way they do, and how their emotions, intent and spend behaviours influence satisfaction and revenue across every touchpoint.",
  },
  {
    question: "What makes this different from traditional social reputation tools?",
    answer:
      "Traditional platforms show reviews and scores. nrtureAI shows the emotion behind the words, compares you fairly against your peers and guides you on what actually improves experiences and outcomes today.",
  },
  {
    question: "How long does onboarding take?",
    answer:
      "Onboarding is simple and guided. Our team helps shape Elara to match your tone of voice, brand principles and service culture, so replies feel natural and true to your identity from day one.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing is annual with the choice to pay monthly or yearly. You can begin with a one week free trial to understand how the platform works before committing.",
  },
  {
    question: "Can I upgrade between plans as I grow?",
    answer:
      "Yes. You can move between Lite, Lite Plus, Pro and Enterprise as your footprint expands and as you need richer benchmarking, dashboards or conversational insights.",
  },
  {
    question: "What kind of support is offered?",
    answer:
      "You are supported by our onboarding specialists who align Elara to your voice, and ongoing assistance ensures the platform continues to reflect your service quality and hospitality vision.",
  },
  {
    question: "What is the real time survey framework?",
    answer:
      "The real time survey framework is available in Pro and Enterprise. It allows Elara to gently ask a few contextual questions after a review or interaction when it feels helpful. This unlocks far richer insight without sending separate surveys, running costly research or asking visitors to repeat themselves.",
  },
  {
    question: "Do visitors know when Elara replies?",
    answer:
      "Elara replies in your tone and identity so it feels like your brand, not automation. The experience remains warm, human and aligned with hospitality standards.",
  },
  {
    question: "Does nrtureAI replace my team’s understanding of guests?",
    answer:
      "No. It enhances your intuition and lifts your capacity. nrtureAI interprets emotion patterns and intent signals so you can focus on service, creativity and meaningful visitor moments.",
  },
  {
    question: "Do I need any special technical setup?",
    answer:
      "No. The platform connects with your existing review channels and begins working almost immediately. There is no complex integration required and no specialised hardware.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative bg-[#f7f8fb] py-20 sm:py-24">
      <div className="absolute inset-x-0 top-8 mx-auto h-64 w-[min(960px,90vw)] rounded-full bg-gradient-to-r from-sky-200/40 via-indigo-200/40 to-fuchsia-200/40 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-[clamp(2rem,4vw,3.4rem)] font-display font-semibold text-transparent">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-3xl border border-white/60 bg-white/90 shadow-[0_15px_40px_rgba(15,23,42,0.08)] backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left sm:px-8 sm:py-5"
                >
                  <span className="text-base font-semibold text-neutral-900 sm:text-lg">
                    {index + 1}. {faq.question}
                  </span>
                  <span
                    className={`text-2xl font-semibold transition ${
                      isOpen ? "text-sky-600" : "text-neutral-400"
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden px-6 transition-[grid-template-rows] duration-300 ease-out sm:px-8 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="pb-6 text-sm leading-relaxed text-neutral-600 sm:text-base">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
