"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useMemo, useRef } from "react";

type Direction = "up" | "left" | "right";

interface RevealBlockProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  intro?: boolean;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function RevealBlock({
  children,
  delay = 0,
  direction = "up",
  distance = 60,
  className,
  intro = true,
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const hidden = useMemo(() => {
    if (direction === "left") return { opacity: 0, x: -distance };
    if (direction === "right") return { opacity: 0, x: distance };
    return { opacity: 0, y: distance };
  }, [direction, distance]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {intro && (
        <motion.div
          initial={{ y: "-120%", opacity: 0 }}
          animate={isInView ? { y: "120%", opacity: [0, 0.2, 0] } : { y: "-120%", opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay }}
          className="pointer-events-none absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-[#00FFAA]/30 to-transparent z-20"
        />
      )}

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden,
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
              duration: 0.8,
              ease: EASE,
              delay: intro ? delay + 0.28 : delay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
