"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 100;

export default function WeaponScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Track scroll progress within the component's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Load all images on mount
  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    const loadImages = async () => {
      let loaded = 0;
      const loadedImages: HTMLImageElement[] = [];

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const paddedNum = String(i).padStart(3, "0");
        img.src = `/frames/ezgif-frame-${paddedNum}.jpg`;

        await new Promise((resolve) => {
          img.onload = () => {
            loaded++;
            setImagesLoaded(loaded);
            loadedImages.push(img);
            resolve(null);
          };
          img.onerror = () => {
            loaded++;
            setImagesLoaded(loaded);
            loadedImages.push(img);
            resolve(null);
          };
        });
      }
      
      imagesRef.current = loadedImages;
      setIsReady(true);
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    };

    loadImages();
  }, []);

  // Draw frame to canvas based on scroll progress
  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const renderFrame = () => {
      const progress = scrollYProgress.get();
      // Map progress 0-1 to frame index 0-99
      let frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
      frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

      const img = imagesRef.current[frameIndex];
      
      if (img && img.complete) {
        const { width, height } = canvas;
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        // Implement "cover" logic for the canvas drawing to fill the screen
        // Wait, instructions say "cover-fit on canvas" but we must ensure we don't stretch weirdly.
        if (canvasRatio > imgRatio) {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetX = 0;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
          offsetY = 0;
        }

        // Use #050505 to blend perfectly
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const unsubscribe = scrollYProgress.onChange(() => {
      animationFrameId = requestAnimationFrame(renderFrame);
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame();
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, scrollYProgress]);

  // Cinematic scroll milestones for text
  // 0–15%: HERO
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

  // 20–40%: FEATURE 1
  const feat1Opacity = useTransform(scrollYProgress, [0.18, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const feat1Y = useTransform(scrollYProgress, [0.18, 0.2, 0.4], [20, 0, -20]);

  // 45–65%: FEATURE 2
  const feat2Opacity = useTransform(scrollYProgress, [0.43, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const feat2Y = useTransform(scrollYProgress, [0.43, 0.45, 0.65], [20, 0, -20]);

  // 70–85%: FEATURE 3
  const feat3Opacity = useTransform(scrollYProgress, [0.68, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const feat3Y = useTransform(scrollYProgress, [0.68, 0.7, 0.85], [20, 0, -20]);

  // 88–100%: CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.88, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.88], [20, 0]);

  return (
    <>
      <AnimatePresence>
        {!isReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-[#E8E8E8]"
          >
            <div className="font-orbitron text-nexus-green font-bold text-3xl tracking-widest mb-8">
              NEXUS ARMS
            </div>
            <div className="font-techmono tracking-[0.2em] mb-4 text-sm md:text-base">
              LOADING WEAPON DATA...
            </div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-nexus-green shadow-[0_0_15px_#00FFAA]"
                initial={{ width: 0 }}
                animate={{ width: `${(imagesLoaded / TOTAL_FRAMES) * 100}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <div className="font-techmono text-nexus-green/80 text-xs">
              {imagesLoaded} / {TOTAL_FRAMES} FRAMES LOADED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="relative h-[500vh] bg-[#050505] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Overlays Container */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-24 font-rajdhani">
            
            {/* 0-15%: HERO */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center"
            >
              <h1 className="font-orbitron text-5xl md:text-8xl font-bold tracking-tighter text-white/90 mb-4 drop-shadow-lg">
                NX-7 PHANTOM
              </h1>
              <p className="text-lg md:text-2xl text-white/50 font-techmono tracking-widest uppercase max-w-xl">
                Standard issue. Void Protocol Season 4.
              </p>
            </motion.div>

            {/* 20-40%: FEATURE 1 */}
            <motion.div
              style={{ opacity: feat1Opacity, y: feat1Y }}
              className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 flex flex-col items-start text-left max-w-md"
            >
              <div className="font-techmono text-nexus-green text-sm tracking-[0.2em] mb-2">
                01 / PLASMA CORE
              </div>
              <h2 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tight text-[#E8E8E8] mb-4">
                600 ROUNDS PER MINUTE
              </h2>
              <p className="text-base md:text-xl text-nexus-muted font-rajdhani leading-relaxed">
                Zero recoil. Maximum devastation.
              </p>
            </motion.div>

            {/* 45-65%: FEATURE 2 */}
            <motion.div
              style={{ opacity: feat2Opacity, y: feat2Y }}
              className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 flex flex-col items-end text-right max-w-md"
            >
              <div className="font-techmono text-nexus-green text-sm tracking-[0.2em] mb-2">
                02 / MODULAR BUILD
              </div>
              <h2 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tight text-[#E8E8E8] mb-4">
                SWAP MID-MISSION
              </h2>
              <p className="text-base md:text-xl text-nexus-muted font-rajdhani leading-relaxed">
                Barrel. Scope. Grip. Adapt or die.
              </p>
            </motion.div>

            {/* 70-85%: FEATURE 3 */}
            <motion.div
              style={{ opacity: feat3Opacity, y: feat3Y }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center max-w-2xl mx-auto"
            >
              <div className="font-techmono text-nexus-green text-sm tracking-[0.2em] mb-2">
                03 / VOID TECH
              </div>
              <h2 className="font-orbitron text-3xl md:text-5xl font-bold tracking-tight text-[#E8E8E8] mb-4">
                ENGINEERED IN DARKNESS
              </h2>
              <p className="text-base md:text-xl text-nexus-muted font-rajdhani leading-relaxed">
                Every component forged in Sector 9.
              </p>
            </motion.div>

            {/* 88-100%: CTA */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center text-center pointer-events-auto"
            >
              <h2 className="font-orbitron text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-4">
                ACQUIRE YOUR WEAPON
              </h2>
              <p className="text-base md:text-xl text-nexus-muted font-techmono uppercase mb-10 max-w-xl">
                Limited stock. In-game currency accepted.
              </p>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('weapons');
                  if(element) element.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,170,0.4)" }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                className="button-micro group relative px-8 py-4 bg-transparent text-nexus-green font-techmono tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-nexus-green/10"
              >
                <span className="relative z-10">BROWSE ARSENAL</span>
                <div className="absolute inset-0 border border-nexus-green/50 group-hover:border-nexus-green shadow-[inset_0_0_20px_rgba(0,255,170,0.1)] group-hover:shadow-[inset_0_0_20px_rgba(0,255,170,0.4)] transition-all duration-300" />
                <div className="absolute left-0 top-0 w-2 h-2 border-t border-l border-nexus-green group-hover:w-4 group-hover:h-4 transition-all duration-300" />
                <div className="absolute right-0 bottom-0 w-2 h-2 border-b border-r border-nexus-green group-hover:w-4 group-hover:h-4 transition-all duration-300" />
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}
