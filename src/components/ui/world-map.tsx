import { useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { TextHoverEffect } from "./text-hover-effect";

type Route = {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  label?: string;
};

type WorldMapProps = {
  dots: Route[];
  lineColor?: string;
  className?: string;
};

const WIDTH = 800;
const HEIGHT = 400;

function projectPoint(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return { x, y };
}

function buildArc(start: Route["start"], end: Route["end"]) {
  const a = projectPoint(start.lat, start.lng);
  const b = projectPoint(end.lat, end.lng);
  const midX = (a.x + b.x) / 2;
  const midY = Math.min(a.y, b.y) - 60;
  const c = { x: midX, y: midY };
  return { a, b, c, d: `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}` };
}

function sampleQuadraticBezier(
  start: { x: number; y: number },
  control: { x: number; y: number },
  end: { x: number; y: number },
  steps = 60,
) {
  const positions = [];
  const angles = [];
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const oneMinusT = 1 - t;

    const x =
      oneMinusT * oneMinusT * start.x + 2 * oneMinusT * t * control.x + t * t * end.x;
    const y =
      oneMinusT * oneMinusT * start.y + 2 * oneMinusT * t * control.y + t * t * end.y;

    const dx =
      2 * oneMinusT * (control.x - start.x) + 2 * t * (end.x - control.x);
    const dy =
      2 * oneMinusT * (control.y - start.y) + 2 * t * (end.y - control.y);

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    positions.push({ x, y });
    angles.push(angle);
  }

  const times = positions.map((_, idx) => idx / (positions.length - 1));

  return {
    x: positions.map((pos) => pos.x),
    y: positions.map((pos) => pos.y),
    rotate: angles,
    times,
  };
}

export default function WorldMap({ dots, lineColor = "#0ea5e9", className }: WorldMapProps) {
  const dotted = useMemo(() => new DottedMap({ height: 120, grid: "diagonal" }), []);
  const svgMap = useMemo(
    () =>
      dotted.getSVG({
        radius: 0.27,
        color: "#475569",
        backgroundColor: "transparent",
        shape: "circle",
      }),
    [dotted],
  );

  const rootClassName = ["relative aspect-[2/1] w-full", className].filter(Boolean).join(" ");

  return (
    <div className={rootClassName}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="Flight routes world map"
        className="pointer-events-none h-full w-full select-none opacity-80 [mask-image:linear-gradient(to_bottom,transparent,rgba(255,255,255,0.08)_15%,white_55%,white_90%,transparent)]"
        style={{ filter: "brightness(1.35) blur(1.6px)" }}
        draggable={false}
        height={HEIGHT}
        width={WIDTH}
      />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
        <div className="pointer-events-auto flex max-w-4xl flex-col items-center gap-8 text-ink">
          <div className="h-28 w-full md:h-32">
            <TextHoverEffect text="Reviews travel faster than passengers." className="text-4xl md:text-6xl" baseColor="#38bdf8" />
          </div>
          <div className="flex items-center justify-center">
            <a
              href="/talktous"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:border-black hover:bg-black"
            >
              <span>Try NrtureAI</span>
              <span aria-hidden="true" className="text-lg leading-none">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="absolute inset-0 z-10 h-full w-full select-none" style={{ filter: "blur(2px)" }}>
        <defs>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="8%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="92%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((route, index) => {
          const { a, b, c, d } = buildArc(route.start, route.end);
          const keyframes = sampleQuadraticBezier(a, c, b, 72);
          const duration = 6 + index * 1.4;
          const delay = index * 0.45;

          return (
            <g key={`${route.start.lat}-${route.start.lng}-${index}`}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#route-gradient)"
                strokeWidth={1.6}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.85, 0.4] }}
                transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.g
                initial={{ x: keyframes.x[0], y: keyframes.y[0], rotate: keyframes.rotate[0] }}
                animate={{
                  x: keyframes.x,
                  y: keyframes.y,
                  rotate: keyframes.rotate,
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: "linear",
                  times: keyframes.times,
                }}
                style={{ transformOrigin: "center" }}
              >
                <text fontSize={22} fill="#000000" opacity={0.92} textAnchor="middle" dominantBaseline="central" style={{ filter: "blur(0.6px)" }}>
                  ✈︎
                </text>
              </motion.g>

              {[a, b].map((point, idx) => (
                <g key={`${index}-${idx}`}>
                  <circle cx={point.x} cy={point.y} r={3} fill={lineColor} style={{ filter: "blur(0.6px)" }} />
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={3}
                    fill={lineColor}
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: [1, 3], opacity: [0.4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay, ease: "easeOut" }}
                    style={{ filter: "blur(0.6px)", originX: "50%", originY: "50%" }}
                  />
                  {idx === 1 && (
                    <motion.circle
                      cx={point.x}
                      cy={point.y}
                      r={4}
                      stroke="#22c55e"
                      strokeWidth={1}
                      fill="transparent"
                      initial={{ scale: 0.6, opacity: 0.7 }}
                      animate={{ scale: [0.6, 2.4], opacity: [0.7, 0] }}
                      transition={{ duration: duration / 3, delay, repeat: Infinity, ease: "easeOut" }}
                      style={{ filter: "blur(0.4px)" }}
                    />
                  )}
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
