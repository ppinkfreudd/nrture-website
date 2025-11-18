import { motion } from "motion/react";

const reviews = [
  {
    quote:
      "Worst airport restaurant I’ve ever seen. Service was slow and indifferent, my food was cold.",
    response:
      "Thanks for sharing. We’re mapping a rapid-recovery playbook for Chili’s gate-side — mind rating your first impression in a 30 sec poll?",
    location: "Airport F&B Shopper",
  },
  {
    quote:
      "Constantly over-capacity, filthy common areas, no place to sit, blinds are broken so it’s blindingly hot …",
    response:
      "Flagged for rapid service recovery. We’re prioritising seating + cooling fix, and looping you in once the comfort upgrades go live.",
    location: "Lounge Guest",
  },
  {
    quote:
      "The whole setup looked tired and grimy, nothing like the pictures on the board outside.",
    response:
      "Appreciate the honesty. Lighting refresh scheduled this week — drop us a photo on visualcare@nrture.ai so we can share progress.",
    location: "F&B Reviewer",
  },
  {
    quote:
      "Unfriendly, condescending wait staff.",
    response:
      "We’ve initiated a same-day huddle with the floor team and shared your feedback. Expect a follow up note once the refresher training wraps.",
    location: "Dining Guest",
  },
  {
    quote:
      "Terrible – not worth your time or money … The lounge is a racket.",
    response:
      "Documented against our benchmark board. We’re inviting you into a amenities re-design panel — 2 mins to rank what matters most.",
    location: "Frequent Flyer",
  },
  {
    quote:
      "Bad experience. The service was horrible and the portion sizes were beyond small.",
    response:
      "Elara drafted an apology and portion audit. Chef’s already tweaking the recipe — want to co-create the next traveller special?",
    location: "Traveller Review",
  },
];

function ReviewCard({
  quote,
  response,
  location,
}: (typeof reviews)[number]) {
  return (
    <div className="flex w-72 flex-col gap-4 rounded-3xl border border-white/30 bg-white/80 p-5 shadow-lg shadow-brand-100 backdrop-blur">
      <div className="text-xs uppercase tracking-widest text-brand-500">Live Review</div>
      <p className="text-sm font-medium text-neutral-800">“{quote}”</p>
      <div className="rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-700">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          Elara Drafts
        </div>
        <p>{response}</p>
      </div>
      <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {location}
      </div>
    </div>
  );
}

export function ReviewShowcase() {
  const column1 = reviews.slice(0, 3);
  const column2 = reviews.slice(3);

  return (
    <div className="relative flex h-[28rem] w-full items-center justify-center gap-6 overflow-hidden">
      {[column1, column2].map((column, index) => (
        <motion.div
          key={index}
          className="flex h-full flex-col gap-6"
          animate={{ translateY: ["0%", "-50%", "0%"] }}
          transition={{ duration: 22 + index * 4, ease: "linear", repeat: Infinity }}
        >
          {[...column, ...column].map((review, idx) => (
            <ReviewCard key={`${index}-${idx}`} {...review} />
          ))}
        </motion.div>
      ))}

      <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/40 bg-gradient-to-br from-white/40 via-white/0 to-white/30 shadow-glow" />
    </div>
  );
}
