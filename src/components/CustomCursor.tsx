"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 420, damping: 34, mass: 0.45 });
  const ringY = useSpring(dotY, { stiffness: 420, damping: 34, mass: 0.45 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const onMedia = () => setIsDesktop(media.matches);
    onMedia();
    media.addEventListener("change", onMedia);

    const onMove = (event: MouseEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("button, a, input, textarea, select, [role='button']");
      setIsHoveringInteractive(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      media.removeEventListener("change", onMedia);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [dotX, dotY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[120] h-2 w-2 rounded-full bg-[#00FFAA] mix-blend-screen"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed z-[119] h-10 w-10 rounded-full border border-[#00FFAA]/80"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHoveringInteractive ? 1.5 : 1 }}
        transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
