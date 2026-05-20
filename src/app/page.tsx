import React from "react";
import WeaponScroll from "@/components/WeaponScroll";
import StatsSection from "@/components/StatsSection";
import ShopSection from "@/components/ShopSection";
import LoreSection from "@/components/LoreSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#E8E8E8] selection:bg-[#00FFAA] selection:text-black flex flex-col">
      <WeaponScroll />
      <StatsSection />
      <ShopSection />
      <LoreSection />
      <Footer />
    </main>
  );
}
