import { Fragment, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type PhaseId = "feed-scroll" | "editing" | "insights";

const TIMELINE: Array<{ id: PhaseId; duration: number }> = [
  { id: "feed-scroll", duration: 3600 },
  { id: "editing", duration: 4400 },
  { id: "insights", duration: 5600 },
];

const REVIEW_FEED = [
  {
    id: "gate18",
    platform: "Tripadvisor",
    author: "@WeekendNomad",
    timestamp: "12 min ago",
    snippet: "Shower suites spotless, but check-in queue crawled.",
    tone: "mixed",
  },
  {
    id: "gate7",
    platform: "Google Reviews",
    author: "@LoungeNerd",
    timestamp: "9 min ago",
    snippet: "Barista remembered my order. Need more vegan bites though.",
    tone: "positive",
  },
  {
    id: "gate32",
    platform: "Google Reviews",
    author: "@Gate32Traveler",
    timestamp: "3 min ago",
    snippet: "Ordered the breakfast tacos. Cold eggs, no one checked on our table.",
    tone: "negative",
  },
  {
    id: "gate4",
    platform: "Twitter",
    author: "@CarryOnCam",
    timestamp: "Just now",
    snippet: "Wi-Fi strong, but the espresso machine is still down at Gate 4.",
    tone: "mixed",
  },
  {
    id: "gate22",
    platform: "Survey Pulse",
    author: "Loyalty Platinum",
    timestamp: "Just now",
    snippet: "Crew helped me rebook in 5 minutes. ❤️",
    tone: "positive",
  },
];

const PHASE_NOTES: Partial<Record<PhaseId, string>> = {
  editing: "Need to tweak the draft wording? Jump in, adjust, and send.",
  insights: "Quarterly CX pulse keeps benchmarks and blind spots at your fingertips.",
};

const DROPDOWN_OPTIONS = ["Skyline Bar", "Terminal E Coffee", "Boardwalk Bites"];

const DASHBOARD_STATES = [
  {
    comparatorIndex: 0,
    emotionScore: "74",
    emotionDelta: "+4.3 vs Q1",
    emotionBadgeTone: "neutral",
    barSeries: [42, 58, 68],
    periodLabels: ["Q1", "Q2", "Q3"],
    tableRows: [
      { metric: "Reply SLA", ours: "18m", theirs: "24m" },
      { metric: "Hits", ours: "▲ 2", theirs: "▲ 1" },
      { metric: "NPS delta", ours: "+6.4", theirs: "+2.1" },
    ],
    radarValues: [0.62, 0.58, 0.7, 0.54, 0.6, 0.52, 0.64, 0.48],
  },
  {
    comparatorIndex: 1,
    emotionScore: "78",
    emotionDelta: "+5.1 vs Skyline",
    emotionBadgeTone: "positive",
    barSeries: [45, 63, 84],
    periodLabels: ["Q1", "Q2", "Q3"],
    tableRows: [
      { metric: "Reply SLA", ours: "17m", theirs: "21m" },
      { metric: "Hits", ours: "▲ 3", theirs: "▲ 1" },
      { metric: "NPS delta", ours: "+6.2", theirs: "+3.8" },
    ],
    radarValues: [0.72, 0.64, 0.82, 0.6, 0.68, 0.56, 0.7, 0.58],
  },
];

const RADAR_COLORS = ["#38bdf8", "#34d399", "#f97316", "#818cf8", "#fbbf24", "#14b8a6", "#f43f5e", "#c084fc"];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 10.5 8.2 15 16 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadarOctagon({ values }: { values: number[] }) {
  const cx = 48;
  const cy = 48;
  const baseId = useId();
  const step = (Math.PI * 2) / values.length;
  const minRadius = 22;
  const maxRadius = 44;
  const originRadius = 6;
  const ringRadii = [26, 34, 42];

  const pointAt = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  const buildPath = (radius: number, startAngle: number, endAngle: number) => {
    const start = pointAt(startAngle, radius);
    const end = pointAt(endAngle, radius);
    return `M ${cx} ${cy} L ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)} Z`;
  };

  const segments = values.map((value, idx) => {
    const startAngle = -Math.PI / 2 + idx * step;
    const endAngle = startAngle + step;
    const targetRadius = minRadius + value * (maxRadius - minRadius);
    return {
      finalPath: buildPath(targetRadius, startAngle, endAngle),
      originPath: buildPath(originRadius, startAngle, endAngle),
      color: RADAR_COLORS[idx % RADAR_COLORS.length],
      gradientId: `${baseId}-segment-${idx}`,
    };
  });

  const outerPoints = Array.from({ length: values.length }, (_, idx) => {
    const angle = -Math.PI / 2 + idx * step;
    return {
      x: cx + (maxRadius + 4) * Math.cos(angle),
      y: cy + (maxRadius + 4) * Math.sin(angle),
    };
  });

  const outerPath = outerPoints
    .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ") + " Z";

  return (
    <motion.svg
      viewBox="0 0 96 96"
      className="h-32 w-32"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <defs>
        <filter id={`${baseId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        </filter>
        {segments.map((segment) => (
          <radialGradient
            key={segment.gradientId}
            id={segment.gradientId}
            cx={cx}
            cy={cy}
            r={maxRadius}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="12%" stopColor={segment.color} stopOpacity={0.72} />
            <stop offset="65%" stopColor={segment.color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={segment.color} stopOpacity={0.12} />
          </radialGradient>
        ))}
      </defs>
      <motion.path
        d={outerPath}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={2}
        strokeDasharray="6 8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      {ringRadii.map((radius, idx) => (
        <motion.circle
          key={radius}
          cx={cx}
          cy={cy}
          r={radius}
          stroke="#dbeafe"
          strokeWidth={0.7}
          strokeOpacity={0.35}
          strokeDasharray="2 6"
          fill="none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + idx * 0.05, ease: "easeOut" }}
        />
      ))}
      <motion.circle
        cx={cx}
        cy={cy}
        r={14}
        fill="none"
        stroke="#38bdf8"
        strokeWidth={1.2}
        strokeOpacity={0.6}
        initial={{ r: 12, opacity: 0.6 }}
        animate={{ r: [12, 18, 24], opacity: [0.6, 0.3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
      {segments.map((segment, idx) => (
        <g key={segment.gradientId}>
          <motion.path
            d={segment.finalPath}
            fill={`url(#${segment.gradientId})`}
            stroke={segment.color}
            strokeOpacity={0.9}
            strokeWidth={1.1}
            style={{ transformBox: "fill-box", transformOrigin: "48px 48px" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.05, 1] }}
            transition={{ duration: 0.65, delay: 0.25 + idx * 0.06, ease: "easeOut" }}
          />
          <motion.path
            d={segment.finalPath}
            fill="none"
            stroke={segment.color}
            strokeOpacity={0.45}
            strokeWidth={1.7}
            filter={`url(#${baseId}-glow)`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.35, 0], scale: [0.9, 1.05, 1] }}
            transition={{ duration: 1.4, delay: 0.25 + idx * 0.06, ease: "easeOut" }}
          />
        </g>
      ))}
      <motion.circle
        cx={cx}
        cy={cy}
        r={7}
        fill="#0f172a"
        stroke="#38bdf8"
        strokeWidth={1.1}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.95 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

export function HeroWorkflowDemo() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = TIMELINE[phaseIndex].id;
  const [sent, setSent] = useState(false);
  const [dashboardStep, setDashboardStep] = useState(0);
  const typedSuffix = "tes.";
  const [typedCount, setTypedCount] = useState(typedSuffix.length);
  const typedText = typedSuffix.slice(0, typedCount);
  const showCaret = phase === "editing";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % TIMELINE.length);
    }, TIMELINE[phaseIndex].duration);

    return () => clearTimeout(timeout);
  }, [phaseIndex]);

  useEffect(() => {
    let sendTimer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "editing") {
      setSent(false);
      sendTimer = setTimeout(() => setSent(true), 2600);
    } else {
      setSent(false);
    }

    return () => {
      if (sendTimer) clearTimeout(sendTimer);
    };
  }, [phase]);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    if (phase === "editing") {
      setTypedCount(0);
      const step = 260;
      for (let i = 1; i <= typedSuffix.length; i++) {
        timers.push(
          setTimeout(() => {
            setTypedCount(i);
          }, i * step),
        );
      }
    } else {
      setTypedCount(typedSuffix.length);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase, typedSuffix]);

  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let applyTimer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "insights") {
      setDashboardStep(0);
      openTimer = setTimeout(() => setDashboardStep(1), 1400);
      applyTimer = setTimeout(() => setDashboardStep(2), 2800);
    } else {
      setDashboardStep(0);
    }

    return () => {
      if (openTimer) clearTimeout(openTimer);
      if (applyTimer) clearTimeout(applyTimer);
    };
  }, [phase]);

  return (
    <div className="relative flex w-full max-w-3xl flex-col justify-center overflow-visible md:h-[32rem]">
    <div className="relative flex flex-1 flex-col gap-6 px-3 py-6 sm:px-4 md:px-6">
      <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 32, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -28, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-1 flex-col gap-5 rounded-[2rem] border border-neutral-100 bg-white p-6"
            style={{ minHeight: "26rem" }}
            >
            {phase === "feed-scroll" && (
              <>
                <div className="relative mt-1 h-[21rem] overflow-hidden rounded-[1.75rem] border border-neutral-100/70 bg-white p-3">
                  <motion.div
                    className="flex flex-col gap-3"
                    initial={{ y: 0 }}
                    animate={{ y: ["0%", "-22%", "-46%"] }}
                    transition={{ duration: 3.4, ease: "easeInOut", times: [0, 0.45, 1] }}
                  >
                    {REVIEW_FEED.map((review) => (
                      <motion.div
                        key={review.id}
                        className="rounded-2xl border border-neutral-200 bg-white p-4"
                        animate={
                          review.id === "gate32"
                            ? {
                                borderColor: ["#e5e7eb", "#22c55e", "#e5e7eb"],
                              }
                            : {}
                        }
                        transition={
                          review.id === "gate32"
                            ? { duration: 3.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.2 }
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                          <span>{review.platform}</span>
                          <span>{review.timestamp}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                          <span>{review.author}</span>
                          <span
                            className={`rounded-full px-2 py-1 text-[10px] ${
                              review.tone === "negative"
                                ? "bg-red-100 text-red-600"
                                : review.tone === "positive"
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {review.tone === "negative" ? "Flagged" : review.tone === "positive" ? "Delight" : "Mixed"}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-700">{review.snippet}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </>
            )}

            {phase === "editing" && (
              <>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-neutral-400">
                  <span>reply window</span>
                  <span>Agent assist + you</span>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">Elora’s draft</p>
                    <p className="mt-2 leading-relaxed">
                      Hi there, thanks for sharing this before your flight. We’ve re-made the dish &amp; set aside a warm
                      breakfast if you’re still at the gate.
                    </p>
                  </div>
                  <div className="relative rounded-2xl border border-brand-200 bg-white p-4 text-sm leading-relaxed text-neutral-800">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-brand-700">
                      <span>Your edits</span>
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-semibold text-brand-700">
                        Live
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-800">
                      Hi there, appreciate you flagging this{" "}
                      <span className="bg-emerald-100 px-1 font-semibold text-emerald-700">before you board.</span>{" "}
                      We just rebuilt the breakfast and{" "}
                      <span className="bg-amber-100 px-1 font-semibold text-amber-700">have it waiting at Gate 32.</span>{" "}
                      A manager will check on your table in the next 5 minu
                      <span className="whitespace-pre">{typedText}</span>
                      {showCaret && (
                        <motion.span
                          className="ml-[1px] inline-block h-[18px] w-[2px] translate-y-[2px] rounded-full bg-brand-600 align-middle"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity }}
                        />
                      )}
                    </p>
                    <motion.span
                      className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 text-[11px] font-semibold text-emerald-700"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      <CheckIcon />
                      Saved
                    </motion.span>
                  </div>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <motion.button
                    type="button"
                    className={`inline-flex w-full items-center justify-between rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.35em] transition ${
                      sent ? "bg-emerald-500 text-white" : "bg-ink text-white"
                    }`}
                    animate={sent ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1.4, repeat: sent ? Infinity : 0, repeatDelay: 1.4 }}
                  >
                    <span>{sent ? "Sent" : "Send reply"}</span>
                    <span className="inline-flex items-center gap-2 text-[11px]">
                      {sent ? (
                        <>
                          <CheckIcon />
                          Delivered
                        </>
                      ) : (
                        <>
                          <span className="h-2 w-2 rounded-full bg-emerald-300" />
                          Ready
                        </>
                      )}
                    </span>
                  </motion.button>
                  <p className="text-xs text-neutral-500">
                    Draft locks to history the moment you send — edits stay attributed to you.
                  </p>
                </div>
              </>
            )}

            {phase === "insights" && (
              <>
                {(() => {
                  const currentState = dashboardStep >= 2 ? DASHBOARD_STATES[1] : DASHBOARD_STATES[0];
                  const selectedIndex = currentState.comparatorIndex;
                  const hoverIndex = dashboardStep === 1 ? 1 : -1;
                  const selectedLabel = DROPDOWN_OPTIONS[selectedIndex];
                  return (
                    <>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-neutral-400">
                  <span>quarter report</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-700">
                    snapshot
                  </span>
                </div>
                <div className="rounded-[1.5rem] border border-neutral-200 bg-white p-4">
                  <div className="flex flex-col gap-3">
                    <div className="relative space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">
                        <span>Compare outlets</span>
                        <span className="text-neutral-500">Gate 32 vs {selectedLabel}</span>
                      </div>
                      <motion.button
                        type="button"
                        className="flex w-full items-center justify-between rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink"
                        animate={dashboardStep === 1 ? { scale: [1, 1.04, 1] } : {}}
                        transition={{ duration: 0.9, repeat: dashboardStep === 1 ? Infinity : 0, repeatDelay: 0.6 }}
                      >
                        Gate 32 Lounge
                        <span className="text-xs">▾</span>
                      </motion.button>
                      <AnimatePresence>
                        {dashboardStep === 1 && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="absolute left-0 top-[calc(100%+0.35rem)] w-full rounded-2xl border border-neutral-200 bg-white text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-600"
                            style={{ zIndex: 20 }}
                          >
                            {DROPDOWN_OPTIONS.map((option, idx) => (
                              <div
                                key={option}
                                className={`flex items-center justify-between px-4 py-3 ${
                                  idx === selectedIndex
                                    ? "bg-brand-50 text-brand-700"
                                    : idx === hoverIndex
                                    ? "bg-neutral-50 text-neutral-700"
                                    : "hover:bg-neutral-50"
                                }`}
                              >
                                <span>{option}</span>
                                {dashboardStep >= 2 && idx === selectedIndex && (
                                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                                    Selected
                                  </span>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <motion.div
                        className="rounded-2xl border border-neutral-200 bg-white p-4 text-xs text-neutral-700"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                          <span>Service pulse</span>
                          <motion.span
                            key={selectedIndex}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700"
                          >
                            {selectedLabel}
                          </motion.span>
                        </div>
                        <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                          <table className="w-full table-fixed border-separate border-spacing-y-2 text-[7px] uppercase tracking-[0.18em] text-neutral-400">
                            <thead className="text-[7px] text-neutral-300">
                              <tr>
                                <th className="px-4 text-left">Metric</th>
                                <th className="px-4 text-left">Gate 32</th>
                                <th className="px-4 text-left">{selectedLabel}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentState.tableRows.map((row) => (
                                <tr key={row.metric}>
                                  <td className="px-4 font-semibold text-neutral-500">{row.metric}</td>
                                  <td className="px-4 font-mono text-[9px] tracking-normal text-neutral-800">
                                    <motion.span
                                      key={`${row.metric}-ours-${selectedIndex}`}
                                      initial={{ opacity: 0, y: 4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                    >
                                      {row.ours}
                                    </motion.span>
                                  </td>
                                  <td className="px-4 font-mono text-[9px] tracking-normal text-brand-700">
                                    <motion.span
                                      key={`${row.metric}-theirs-${selectedIndex}`}
                                      initial={{ opacity: 0, y: 4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                    >
                                      {row.theirs}
                                    </motion.span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                      <motion.div
                        className="rounded-2xl border border-neutral-200 bg-white p-4 text-xs text-neutral-700"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                      >
                        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">CX radar</p>
                        <div className="mt-2 flex min-h-[9rem] items-center justify-center">
                          <RadarOctagon key={selectedIndex} values={currentState.radarValues} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between text-xs text-neutral-500">
                  <span>Benchmarks refresh nightly.</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Auto-sync on
                  </span>
                </div>
                    </>
                  );
                })()}
              </>
            )}

            {PHASE_NOTES[phase] && <p className="text-xs text-neutral-500">{PHASE_NOTES[phase]}</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
