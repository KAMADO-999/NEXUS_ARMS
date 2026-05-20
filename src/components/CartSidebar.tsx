"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCountUp } from "@/hooks/useCountUp";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CartSidebar() {
  const { isOpen, items, toggleCart, removeItem, getTotalPrice } = useCartStore();

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const total = getTotalPrice();
  const animatedTotal = useCountUp({ end: total, duration: 1, enabled: isOpen });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-[#0a0a0a] border-l border-nexus-green z-[70] shadow-[-10px_0_30px_rgba(0,255,170,0.1)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-orbitron text-white text-xl tracking-widest font-bold">YOUR LOADOUT</h2>
              <button 
                onClick={toggleCart}
                className="text-white/50 hover:text-nexus-green transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <div className="font-techmono tracking-widest text-sm mb-4">YOUR LOADOUT IS EMPTY</div>
                  <button 
                    onClick={toggleCart}
                    className="font-rajdhani text-nexus-green underline underline-offset-4"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.2 + index * 0.08 }}
                    key={item.id} 
                    className="flex justify-between items-center p-4 border border-white/10 bg-white/[0.02]"
                  >
                    <div>
                      <div className="font-orbitron text-sm font-bold text-white mb-1">{item.name}</div>
                      <div className="font-techmono text-nexus-muted text-xs">
                        QTY: {item.quantity} × {item.priceString}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-orbitron text-nexus-green text-sm">
                        {(item.price * item.quantity).toLocaleString()} VC
                      </div>
                      <motion.button 
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-nexus-danger transition-colors"
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-[#050505]">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-techmono text-nexus-muted tracking-widest">TOTAL</span>
                  <motion.span
                    key={total}
                    initial={{ color: "#00FFAA" }}
                    animate={{ color: ["#00FFAA", "#E8E8E8", "#00FFAA"] }}
                    transition={{ duration: 0.5 }}
                    className="font-orbitron text-2xl text-nexus-green font-bold"
                  >
                    {Math.round(animatedTotal).toLocaleString()} VC
                  </motion.span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,170,0.4)" }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                  className="button-micro w-full py-4 bg-nexus-green text-black font-orbitron font-bold tracking-widest hover:bg-white transition-colors duration-300"
                >
                  SECURE CHECKOUT
                </motion.button>
                <motion.button
                  onClick={toggleCart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                  className="button-micro w-full mt-4 py-2 font-techmono text-xs text-white/50 hover:text-white tracking-widest transition-colors"
                >
                  CONTINUE SHOPPING
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
