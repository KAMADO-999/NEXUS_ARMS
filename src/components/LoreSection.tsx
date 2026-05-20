"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Crosshair, Lock } from "lucide-react";
import RevealBlock from "@/components/RevealBlock";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LoreSection() {
  const quoteLines = [
    "In the ruins of Sector 9, only the armed survive.",
    "NEXUS ARMS supplies the bold,",
    "the desperate, and the dangerous.",
  ];
  const features = [
    {
      title: "VOID PROTOCOL CERTIFIED",
      text: "Guaranteed compatibility with all current neural implants.",
      icon: ShieldCheck,
    },
    {
      title: "SEASON 4 READY",
      text: "Pre-calibrated for the latest environmental hazards.",
      icon: Crosshair,
    },
    {
      title: "256-BIT ENCRYPTED",
      text: "Untraceable transactions. No logs. No questions.",
      icon: Lock,
    },
  ];

  return (
    <section id="lore" className="w-full bg-[#0a0a0a] relative border-y border-white/5 overflow-hidden">
      <RevealBlock>
        <div className="absolute inset-0 bg-scanline opacity-30" />
        <motion.div
          initial={{ y: "-100%" }}
          whileInView={{ y: "100%" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "linear" }}
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-20 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div
            className="lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="font-orbitron text-[#00FFAA] text-5xl leading-none mb-2"
            >
              &quot;
            </motion.div>
            <blockquote className="font-rajdhani text-3xl md:text-5xl font-light italic leading-tight text-white/90">
              {quoteLines.map((line) => (
                <motion.div
                  key={line}
                  variants={{
                    hidden: { opacity: 0, x: -80 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </blockquote>
          </motion.div>

          <motion.div
            className="hidden lg:block w-[1px] h-48 bg-gradient-to-b from-transparent via-nexus-green/50 to-transparent origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } } }}
            className="lg:w-5/12 flex flex-col gap-6 w-full"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: { opacity: 0, x: 80 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      boxShadow: ["0 0 0 rgba(0,255,170,0)", "0 0 24px rgba(0,255,170,0.24)", "0 0 0 rgba(0,255,170,0)"],
                      transition: { duration: 0.8, ease: EASE },
                    },
                  }}
                  className="flex items-center gap-4 p-6 bg-[#050505] border border-nexus-green/20 group hover:border-nexus-green hover:shadow-[0_0_20px_rgba(0,255,170,0.1)] transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-nexus-green flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-orbitron font-bold text-white tracking-widest text-lg">{feature.title}</div>
                    <div className="font-rajdhani text-nexus-muted text-sm mt-1">{feature.text}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </RevealBlock>
    </section>
  );
}
