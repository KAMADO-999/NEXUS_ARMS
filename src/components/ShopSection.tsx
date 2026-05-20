"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, Weapon } from "@/store/cartStore";
import RevealBlock from "@/components/RevealBlock";
import SplitText from "@/components/SplitText";

const WEAPONS: Weapon[] = [
  { id: "w1", name: "NX-7 PHANTOM", type: "PLASMA RIFLE", category: "rifles", price: 4200, priceString: "4,200 VC", stats: { dmg: 94, spd: 88, rng: 91 }, badge: "FEATURED", inStock: true, image: "/weapons/NX-7 PHANTOM.jpeg" },
  { id: "w2", name: "WRAITH-9", type: "GHOST PISTOL", category: "pistols", price: 1800, priceString: "1,800 VC", stats: { dmg: 72, spd: 96, rng: 65 }, badge: "NEW", inStock: true, image: "/weapons/WRAITH-9.jpeg" },
  { id: "w3", name: "DUSKBRINGER", type: "VOID SNIPER", category: "snipers", price: 6500, priceString: "6,500 VC", stats: { dmg: 99, spd: 42, rng: 100 }, badge: "LIMITED · 3 LEFT", inStock: true, stockCount: 3, image: "/weapons/DUSKBRINGER.jpeg" },
  { id: "w4", name: "HELLGATE MK2", type: "PLASMA SHOTGUN", category: "shotguns", price: 3100, priceString: "3,100 VC", stats: { dmg: 88, spd: 70, rng: 40 }, inStock: true, image: "/weapons/HELLGATE MK2.jpeg" },
  { id: "w5", name: "ZERO-K", type: "CRYO RIFLE", category: "rifles", price: 5400, priceString: "5,400 VC", stats: { dmg: 85, spd: 80, rng: 88 }, badge: "HOT", inStock: true, image: "/weapons/ZERO-K.jpeg" },
  { id: "w6", name: "VENOM-X", type: "TOXIC PISTOL", category: "pistols", price: 2200, priceString: "2,200 VC", stats: { dmg: 78, spd: 92, rng: 60 }, inStock: true, image: "/weapons/VENOM-X.jpeg" },
];

const CATEGORIES = ["ALL", "RIFLES", "PISTOLS", "SNIPERS", "SHOTGUNS"];
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const { addItem } = useCartStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredWeapons = activeCategory === "ALL" 
    ? WEAPONS 
    : WEAPONS.filter(w => w.category.toUpperCase() === activeCategory);

  const handleAddToCart = (weapon: Weapon) => {
    if (!weapon.inStock) return;
    addItem(weapon);
    setToastMessage(`[ SYSTEM ] ${weapon.name} ADDED TO LOADOUT`);
    
    // Auto-dismiss toast
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <section id="weapons" className="w-full py-24 bg-[#050505] relative z-10">
      <RevealBlock>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <SplitText text="ARSENAL" className="font-orbitron text-white text-4xl md:text-5xl font-bold tracking-widest mb-2" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="font-techmono text-nexus-green tracking-[0.2em]"
            >
              SELECT YOUR WEAPON
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
              className="h-px w-52 bg-gradient-to-r from-transparent via-[#00FFAA] to-transparent mt-3 origin-center"
            />
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 font-techmono"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.36 + index * 0.06, ease: EASE }}
                whileHover={{ y: -2 }}
                className={`relative px-4 py-2 text-sm tracking-widest transition-all duration-300 ${
                  activeCategory === category ? "text-nexus-green" : "text-white/60 hover:text-white"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-nexus-green"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredWeapons.map((weapon, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 80, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
                  whileHover={{ y: -6 }}
                  key={weapon.id}
                  className="weapon-card group flex flex-col bg-[#050505] border border-nexus-green/20 relative overflow-hidden"
                >
                  <motion.div
                    animate={{ opacity: [0.08, 0.2, 0.08] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.08 }}
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,255,170,0.18),transparent_50%)]"
                  />
                  <motion.div
                    initial={{ clipPath: "inset(0 100% 100% 0)" }}
                    animate={{ clipPath: "inset(0 0% 0% 0)" }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                    className="pointer-events-none absolute inset-0 border border-[#00FFAA] z-30"
                  />
                {/* Glowing Orbs on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-nexus-green/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-nexus-green/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Badge */}
                  {weapon.badge && (
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="absolute top-4 right-4 z-10 px-3 py-1 bg-nexus-green text-black font-techmono text-xs font-bold tracking-widest shadow-[0_0_10px_rgba(0,255,170,0.5)]"
                    >
                      {weapon.badge}
                    </motion.div>
                  )}

                  <div className="h-48 bg-[#0a0a0a] border-b border-nexus-green/20 flex items-center justify-center relative overflow-hidden">
                  {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,170,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,170,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
                    <motion.div
                      initial={{ y: "-100%" }}
                      animate={{ y: "100%" }}
                      transition={{ duration: 0.9, delay: index * 0.1 + 0.2, ease: "linear" }}
                      className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#00FFAA]/20 to-transparent z-20"
                    />
                    <motion.div
                      initial={{ x: "-120%" }}
                      animate={{ x: "120%" }}
                      transition={{ duration: 1.2, delay: index * 0.1 + 0.45, ease: EASE }}
                      className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                    />
                  
                    {weapon.image ? (
                      <img
                        src={weapon.image}
                        alt={weapon.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-10"
                      />
                    ) : (
                    /* Text Logo */
                      <motion.div className="font-orbitron text-white/10 text-4xl font-bold tracking-tighter opacity-50 group-hover:scale-110 group-hover:text-nexus-green/20 transition-all duration-700 z-10">
                        {weapon.name}
                      </motion.div>
                    )}
                  
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 z-20" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative z-20">
                    <div className="flex justify-between items-start mb-2">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.22 + index * 0.08 }}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      >
                        <h3 className="font-orbitron text-xl font-bold text-[#E8E8E8] group-hover:text-white transition-colors">{weapon.name}</h3>
                        <div className="font-techmono text-nexus-muted text-xs tracking-widest uppercase group-hover:text-nexus-green/70 transition-colors">{weapon.type}</div>
                      </motion.div>
                      <div className="font-orbitron text-nexus-green font-bold text-lg group-hover:scale-110 transition-transform duration-300 transform origin-right">{weapon.priceString}</div>
                    </div>
                    
                    <div className="flex gap-4 my-6 font-techmono text-xs text-nexus-muted border-t border-white/5 pt-4">
                      <span className="group-hover:text-white/80 transition-colors duration-300 delay-75">DMG <span className="text-white group-hover:text-nexus-green transition-colors">{weapon.stats.dmg}</span></span>
                      <span className="text-white/10 group-hover:text-nexus-green/50">|</span>
                      <span className="group-hover:text-white/80 transition-colors duration-300 delay-100">SPD <span className="text-white group-hover:text-nexus-green transition-colors">{weapon.stats.spd}</span></span>
                      <span className="text-white/10 group-hover:text-nexus-green/50">|</span>
                      <span className="group-hover:text-white/80 transition-colors duration-300 delay-150">RNG <span className="text-white group-hover:text-nexus-green transition-colors">{weapon.stats.rng}</span></span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,170,0.4)" }}
                      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                      onClick={() => handleAddToCart(weapon)}
                      disabled={!weapon.inStock}
                      className={`button-micro mt-auto w-full py-3 font-techmono tracking-widest text-sm border transition-all duration-300 relative overflow-hidden ${
                        weapon.inStock
                          ? "border-nexus-green/50 text-nexus-green hover:bg-nexus-green hover:text-black hover:border-nexus-green group-hover:shadow-[0_0_15px_rgba(0,255,170,0.3)]"
                          : "border-nexus-danger/30 text-nexus-danger opacity-50 cursor-not-allowed bg-nexus-danger/5"
                      }`}
                    >
                      <span className="relative z-10">{weapon.inStock ? "ADD TO LOADOUT" : "DEPLETED"}</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </RevealBlock>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0a0a0a] border border-nexus-green px-6 py-4 shadow-[0_0_20px_rgba(0,255,170,0.2)]"
          >
            <div className="font-techmono text-nexus-green text-sm tracking-widest flex items-center gap-3">
              <span className="w-2 h-2 bg-nexus-green rounded-full animate-pulse" />
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
