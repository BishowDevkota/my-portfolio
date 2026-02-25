"use client";

import { motion } from "framer-motion";

type AnimationDirection = "up" | "down" | "left" | "right" | "fade";

const directionVariants = {
  up: { opacity: 0, y: 50 },
  down: { opacity: 0, y: -50 },
  left: { opacity: 0, x: 30 },
  right: { opacity: 0, x: -30 },
  fade: { opacity: 0 },
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
}) {
  return (
    <motion.section
      className={className}
      initial={directionVariants[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.215, 0.610, 0.355, 1.000],
      }}
    >
      {children}
    </motion.section>
  );
}
