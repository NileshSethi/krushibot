"use client";

import React from "react";
import StarBackground from "@/components/StarBackground";
import ModelViewer from "@/components/ModelViewer";
import DashboardControls from "@/components/DashboardControls";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-hidden">

      {/* ===== BACKGROUND ===== */}
      <StarBackground />

      {/* Subtle radial glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(40,60,120,0.15)_0%,rgba(0,0,0,1)_70%)]" />

      {/* ===== HEADER ===== */}
      <header className="relative z-10 w-full pt-16 pb-10 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white neon-text">
          KrushiBot v2.0
        </h1>

        <p className="mt-3 text-muted-foreground text-xs md:text-sm tracking-[0.35em] uppercase opacity-70">
          Autonomous Robotic Control Interface
        </p>
      </header>

      {/* ===== 3D MODEL SECTION ===== */}
      <section className="relative z-10 w-full flex-1 flex items-center justify-center px-4 animate-fade-in [animation-delay:200ms]">
        <div className="w-full max-w-5xl h-[420px] md:h-[560px] relative">
          <ModelViewer />
        </div>
      </section>

      {/* ===== CONTROLS ===== */}
      <section className="relative z-20 w-full max-w-5xl pb-16 px-4 animate-fade-in [animation-delay:400ms]">
        <DashboardControls />
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 w-full py-6 text-center text-[10px] text-muted-foreground uppercase tracking-widest opacity-40">
        © 2026 KrushiBot Dynamics — Secured Link Confirmed
      </footer>

    </main>
  );
}
