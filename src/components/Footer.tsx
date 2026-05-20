"use client";

import React from "react";
import { motion } from "framer-motion";
import { Crosshair, ArrowRight } from "lucide-react";
import RevealBlock from "@/components/RevealBlock";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#050505] border-t border-nexus-green/15 pt-20 relative z-10">
      <RevealBlock>
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <motion.div
            className="h-px bg-[#00FFAA] origin-left mb-10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE }}
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
              }}
              className="md:col-span-4 flex flex-col items-start"
            >
              <div
                className="flex items-center gap-3 text-nexus-green font-orbitron font-bold text-2xl tracking-widest cursor-pointer mb-4"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Crosshair className="w-8 h-8" />
                <span>NEXUS ARMS</span>
              </div>
              <p className="font-techmono text-nexus-muted tracking-widest text-sm uppercase">Armed for the void.</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
              }}
              className="md:col-span-4 flex flex-col"
            >
              <h4 className="font-orbitron text-white text-lg font-bold tracking-widest mb-6">NAVIGATION</h4>
              <div className="flex flex-col gap-4 font-rajdhani font-semibold text-nexus-muted tracking-widest">
                <a href="#weapons" onClick={(e) => handleScrollTo(e, "weapons")} className="nav-link w-fit">WEAPONS</a>
                <a href="#arsenal" onClick={(e) => handleScrollTo(e, "arsenal")} className="nav-link w-fit">ARSENAL</a>
                <a href="#lore" onClick={(e) => handleScrollTo(e, "lore")} className="nav-link w-fit">LORE</a>
                <a href="#" className="nav-link w-fit">SUPPORT</a>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
              }}
              className="md:col-span-4 flex flex-col"
            >
              <h4 className="font-orbitron text-white text-lg font-bold tracking-widest mb-6">JOIN THE RESISTANCE</h4>
              <p className="font-rajdhani text-nexus-muted mb-6 leading-relaxed">
                Subscribe to the secure channel for classified weapon drops and black market restocks.
              </p>
              <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="SECURE_COMM@LINK.NET"
                  className="footer-input flex-1 bg-white/[0.03] border border-r-0 border-white/20 px-4 py-3 font-techmono text-white text-sm focus:outline-none transition-all"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,170,0.4)" }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                  className="button-micro bg-white/10 border border-white/20 hover:bg-nexus-green hover:border-nexus-green hover:text-black px-4 py-3 flex items-center justify-center transition-all duration-300 group"
                >
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </RevealBlock>

      <div className="w-full border-t border-white/5 py-6 flex items-center justify-center">
        <p className="font-techmono text-nexus-muted text-xs tracking-widest text-center px-4">
          NEXUS ARMS &copy; 2077 &mdash; VOID PROTOCOL UNIVERSE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
