"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  amount = 0.15,
  once = true,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: distance,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.75,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}