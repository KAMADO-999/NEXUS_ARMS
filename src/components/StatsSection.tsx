"use client";

import React from "react";
import { motion } from "framer-motion";
import RevealBlock from "@/components/RevealBlock";
import { useCountUp } from "@/hooks/useCountUp";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function StatCount({ end, suffix }: { end: number; suffix: string }) {
  const decimals = Number.isInteger(end) ? 0 : 1;
  const value = useCountUp({ end, duration: 1.5, enabled: true, decimals });
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    { label: "FIRE RATE", value: 600, suffix: " RPM", progress: 85 },
    { label: "DAMAGE", value: 94, suffix: " / 100", progress: 94 },
    { label: "RANGE", value: 850, suffix: "M", progress: 70 },
    { label: "RELOAD TIME", value: 1.8, suffix: "s", progress: 90 },
  ];

  return (
    <section id="arsenal" className="w-full py-24 bg-[#050505] relative z-10">
      <RevealBlock>
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="font-orbitron text-nexus-green text-3xl md:text-4xl font-bold mb-3 tracking-wider w-fit"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            WEAPON SPECIFICATIONS
          </motion.h2>
          <motion.div
            className="h-[2px] bg-[#00FFAA] mb-12 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 60, borderColor: "rgba(0,255,170,0.2)" }}
                whileInView={{ opacity: 1, y: 0, borderColor: ["#00FFAA", "rgba(0,255,170,0.2)"] }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  opacity: { duration: 0.8, delay: i * 0.12, ease: EASE },
                  y: { duration: 0.8, delay: i * 0.12, ease: EASE },
                  borderColor: { duration: 0.3, delay: i * 0.12 },
                }}
                className="border bg-white/[0.03] p-6 rounded-sm relative overflow-hidden"
              >
                <div className="font-techmono text-nexus-muted text-sm tracking-widest mb-4">{stat.label}</div>
                <motion.div
                  className="font-orbitron text-white text-3xl md:text-4xl font-bold mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.12 + 0.15 }}
                >
                  <StatCount end={stat.value} suffix={stat.suffix} />
                </motion.div>

                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-nexus-green shadow-[0_0_10px_#00FFAA]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.progress}%` }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 20,
                      mass: 0.6,
                      duration: 1.2,
                      delay: i * 0.12 + 0.2,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealBlock>
    </section>
  );
}
