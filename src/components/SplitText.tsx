"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SplitText({ text, className, stagger = 0.04, delay = 0 }: SplitTextProps) {
  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split("").map((char, index) => (
        <span key={`${char}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              visible: {
                y: "0%",
                transition: {
                  duration: 0.8,
                  ease: EASE,
                },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
