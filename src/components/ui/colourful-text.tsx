import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type ColourfulTextProps = {
  text: string;
  className?: string;
  animated?: boolean;
  variant?: "gradient" | "solid";
};

const gradientBackground =
  "linear-gradient(120deg, #FF1EBE 0%, #FF2FD4 16%, #FF4DE0 32%, #FF73EC 48%, #FF9AEF 64%, #D082FF 80%, #3D7DFF 100%)";

export function ColourfulText({
  text,
  className,
  animated = true,
  variant = "gradient",
}: ColourfulTextProps) {
  if (variant === "solid") {
    return <span className={cn("inline-flex text-white", className)}>{text}</span>;
  }

  const animationConfig = animated
    ? {
        initial: { backgroundPosition: "0% 50%" },
        animate: { backgroundPosition: "100% 50%" },
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut" as const,
        },
      }
    : {
        initial: undefined,
        animate: undefined,
        transition: undefined,
      };

  return (
    <span className="relative inline-flex">
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
        initial={{ opacity: 0.45, scale: 0.75 }}
        animate={animated ? { opacity: 0.85, scale: 1 } : undefined}
        transition={
          animated
            ? {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut" as const,
              }
            : undefined
        }
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255, 63, 209, 0.65), transparent 60%), radial-gradient(circle at 65% 65%, rgba(59, 125, 255, 0.6), transparent 65%)",
        }}
      />
      <motion.span
        className={cn("bg-clip-text text-transparent", className)}
        style={{
          backgroundImage: gradientBackground,
          backgroundSize: "200% 200%",
          backgroundPosition: animated ? undefined : "50% 50%",
        }}
        {...animationConfig}
      >
        {text}
      </motion.span>
    </span>
  );
}
