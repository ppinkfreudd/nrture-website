"use client";

import { motion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

type TextHoverEffectProps = {
  text: string;
  className?: string;
  duration?: number;
  baseColor?: string;
  shineColors?: string[];
};

export function TextHoverEffect({
  text,
  className,
  duration = 2.4,
  baseColor = "#38bdf8",
  shineColors,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState<{ cx: string; cy: string }>({ cx: "50%", cy: "50%" });
  const [animationDone, setAnimationDone] = useState(false);
  const [initialSweepTriggered, setInitialSweepTriggered] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);
  const hasTriggeredOnView = useRef(false);
  const gradientBaseId = useId();
  const baseGradientId = `${gradientBaseId}-base`;
  const sweepGradientId = `${gradientBaseId}-sweep`;
  const maskGradientId = `${gradientBaseId}-mask`;
  const revealMaskId = `${gradientBaseId}-reveal`;

  const palette = useMemo(
    () =>
      shineColors && shineColors.length
        ? [...shineColors, shineColors[0]]
        : ["#ffffff", "#dbeafe", "#93c5fd", "#38bdf8", "#ffffff"],
    [shineColors],
  );

  const viewBox = useMemo(() => {
    const width = Math.max(900, text.length * 28);
    const height = 200;
    return { width, height };
  }, [text]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const handleMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * 100;
      const cy = ((e.clientY - rect.top) / rect.height) * 100;
      setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
    };
    const handleLeave = () => setHovered(false);
    const handleEnter = () => {
      setHovered(true);
      setSweepKey((prev) => prev + 1);
    };
    svg.addEventListener("mousemove", handleMove);
    svg.addEventListener("mouseleave", handleLeave);
    svg.addEventListener("mouseenter", handleEnter);
    return () => {
      svg.removeEventListener("mousemove", handleMove);
      svg.removeEventListener("mouseleave", handleLeave);
      svg.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredOnView.current) {
          hasTriggeredOnView.current = true;
          setInitialSweepTriggered(true);
          setSweepKey((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!initialSweepTriggered) return;
    setAnimationDone(false);
    const timer = window.setTimeout(() => setAnimationDone(true), duration * 1000);
    return () => window.clearTimeout(timer);
  }, [initialSweepTriggered, sweepKey, duration]);

  const combinedClass = ["font-display font-semibold tracking-tight", className].filter(Boolean).join(" ");

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <defs>
        <linearGradient id={baseGradientId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={baseColor} />
          <stop offset="100%" stopColor={baseColor} />
        </linearGradient>

        <motion.linearGradient
          key={sweepKey}
          id={sweepGradientId}
          gradientUnits="userSpaceOnUse"
          x1="-30%"
          y1="0%"
          x2="0%"
          y2="0%"
          initial={{ x1: "-30%", x2: "0%" }}
          animate={{ x1: "130%", x2: "160%" }}
          transition={{ duration, ease: "linear" }}
        >
          {palette.map((color, idx) => (
            <stop key={`${sweepGradientId}-stop-${idx}`} offset={`${(idx / (palette.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </motion.linearGradient>

        <motion.radialGradient
          id={maskGradientId}
          gradientUnits="userSpaceOnUse"
          r="40%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id={revealMaskId}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${maskGradientId})`} />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={`url(#${baseGradientId})`}
        className={combinedClass}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="transparent"
        stroke={animationDone ? baseColor : `url(#${sweepGradientId})`}
        strokeWidth={3}
        className={combinedClass}
        style={{ mixBlendMode: "screen", opacity: hovered ? 0.72 : 0.5 }}
        initial={{ strokeDashoffset: 600, strokeDasharray: 600 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: duration + 0.6, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={`url(#${sweepGradientId})`}
        className={combinedClass}
        style={{ mixBlendMode: "screen" }}
        animate={{ opacity: !animationDone || hovered ? 0.85 : 0 }}
        transition={{ duration: 0.3 }}
        mask={`url(#${revealMaskId})`}
      >
        {text}
      </motion.text>
    </svg>
  );
}
