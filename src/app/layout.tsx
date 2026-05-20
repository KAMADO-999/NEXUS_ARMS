import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/CartSidebar";
import CustomCursor from "@/components/CustomCursor";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-rajdhani" });
const techMono = Share_Tech_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-share-tech-mono" });

export const metadata: Metadata = {
  title: "NEXUS ARMS | Void Protocol",
  description: "Official black market weapon store for Void Protocol. Acquire the NX-7 Phantom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${orbitron.variable} ${rajdhani.variable} ${techMono.variable} font-rajdhani antialiased bg-[#050505] text-[#E8E8E8]`}>
        <CustomCursor />
        <Navbar />
        <CartSidebar />
        {children}
      </body>
    </html>
  );
}
