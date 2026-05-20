"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("weapons");
  const { items, toggleCart } = useCartStore();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)", backdropFilter: "blur(0px)" }}
      animate={{
        backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0)",
        backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between border-b transition-colors duration-300 ${
        isScrolled ? "border-nexus-green/15" : "border-transparent"
      }`}
    >
      {/* LEFT: LOGO */}
      <div 
        className="font-orbitron text-nexus-green font-bold text-xl tracking-widest cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        NEXUS ARMS
      </div>
      
      {/* CENTER: NAV LINKS */}
      <div className="hidden md:flex items-center gap-8 font-rajdhani font-semibold text-sm tracking-widest text-white/50">
        <a href="#weapons" onClick={(e) => handleScrollTo(e, "weapons")} className={`nav-link ${activeSection === "weapons" ? "nav-link-active text-nexus-green" : ""}`}>WEAPONS</a>
        <a href="#arsenal" onClick={(e) => handleScrollTo(e, "arsenal")} className={`nav-link ${activeSection === "arsenal" ? "nav-link-active text-nexus-green" : ""}`}>ARSENAL</a>
        <a href="#lore" onClick={(e) => handleScrollTo(e, "lore")} className={`nav-link ${activeSection === "lore" ? "nav-link-active text-nexus-green" : ""}`}>LORE</a>
        <a href="#contact" onClick={(e) => handleScrollTo(e, "contact")} className={`nav-link ${activeSection === "contact" ? "nav-link-active text-nexus-green" : ""}`}>CONTACT</a>
      </div>
      
      {/* RIGHT: CART & BUTTON */}
      <div className="flex items-center gap-6">
        <motion.button
          onClick={toggleCart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          className="button-micro relative text-white/80 hover:text-nexus-green transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-nexus-green text-black font-techmono text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,170,0.4)" }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          className="button-micro hidden sm:block px-6 py-2 border border-nexus-green/50 text-nexus-green font-techmono text-sm tracking-widest hover:bg-nexus-green hover:text-black hover:border-nexus-green transition-all duration-300 shadow-[0_0_15px_rgba(0,255,170,0.1)] hover:shadow-[0_0_20px_rgba(0,255,170,0.5)]"
        >
          ENTER GAME
        </motion.button>
      </div>
    </motion.nav>
  );
}
