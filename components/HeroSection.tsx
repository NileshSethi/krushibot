"use client";

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion, PanInfo, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, SoftShadows, ContactShadows, useGLTF } from '@react-three/drei';
import { Group } from 'three';
import Link from 'next/link';

// Lazy load the KRUSHI BOT model
const KrushiBotModel = (props: any) => {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/bot.glb');

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2; // Continuous slow Y-axis rotation
      // Subtle floating motion
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={[2.5, 2.5, 2.5]} position={[0, -1, 0]} />
    </group>
  );
};

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1000);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const SWIPE_THRESHOLD = 50;

  const handleBuyNow = () => {
    setShowSmoke(true);
    setTimeout(() => setIsCheckoutOpen(true), 250);
    setTimeout(() => setShowSmoke(false), 900); // 900ms fade transition
  };

  const handleCancelBuy = () => {
    setShowSmoke(true);
    setTimeout(() => setIsCheckoutOpen(false), 250);
    setTimeout(() => setShowSmoke(false), 900);
  };
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD && activeIndex === 0) {
      setActiveIndex(1); // Swipe Left
    } else if (info.offset.x > SWIPE_THRESHOLD && activeIndex === 1) {
      setActiveIndex(0); // Swipe Right
    }
  };

  return (
    <div className="relative w-[100vw] h-screen bg-black overflow-hidden font-sans text-neutral-50 touch-none">

      {/* Cinematic Smoke / Swish Transition Overlay */}
      <AnimatePresence>
        {showSmoke && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] pointer-events-none bg-gradient-to-t from-white/10 via-white/30 to-black/5 backdrop-blur-[20px]"
          />
        )}
      </AnimatePresence>

      {/* Primary Vertical Page Wrapper */}
      <motion.div
        animate={{ y: isCheckoutOpen ? "-100vh" : "0vh" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="flex flex-col w-full h-[200vh]"
      >
        
        {/* =======================================================
            SECTION 1: HERO 
            ======================================================= */}
        <div className="relative w-[100vw] h-screen bg-transparent overflow-hidden shrink-0">

          {/* Subtle Brightness Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-white/[0.04]"></div>

          {/* Top Navbar */}
          <motion.nav 
            animate={{ opacity: isCheckoutOpen ? 0 : 1, y: isCheckoutOpen ? -20 : 0 }}
            className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md py-4 flex items-center justify-between overflow-hidden"
          >
            <div className="flex-1 marquee-container max-w-full">
              <div className="marquee-track text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm font-bold tracking-tighter uppercase">
                {[...Array(16)].map((_, i) => (
                  <span key={i} className="shrink-0 flex items-center">PURCHASES COMING SOON</span>
                ))}
              </div>
            </div>

            <div className="flex items-center shrink-0 pl-10 pr-10 z-10 absolute right-0 bg-transparent">
              <Link href="/dashboard">
                <button className="px-8 py-2.5 bg-white text-black rounded-full hover:bg-neutral-200 transition-all font-bold uppercase tracking-wider text-xs shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  DASHBOARD
                </button>
              </Link>
            </div>
          </motion.nav>

          {/* Main Swipeable Container */}
          <motion.div 
            className="flex w-[200vw] h-full"
            drag={isCheckoutOpen ? false : "x"} // Disable swipe during checkout
            dragConstraints={{ left: -windowWidth, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{ 
              x: activeIndex === 0 ? "0vw" : "-100vw",
              scale: isCheckoutOpen ? 0.9 : 1,  // Deep cinematic zoom-out back
              opacity: isCheckoutOpen ? 0 : 1
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
        
        {/* PANEL 1: 3D Showcase */}
        <div className="w-[100vw] h-full relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing">
          
          <div className="absolute top-32 text-center z-20 pointer-events-none w-full">
            {/* Blue Tint Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[300px] bg-blue-600/20 blur-[100px] rounded-[100%] -z-10 mix-blend-screen"></div>

            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: [0.6, 1, 0.6], 
                y: [0, -15, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              KRUSHI BOT
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.6, 1, 0.6],
                y: [0, -15, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="text-white mt-4 tracking-[0.3em] uppercase text-sm md:text-base font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              Semi Autonomous Farming
            </motion.p>
          </div>

          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <Canvas shadows camera={{ position: [0, 2, 10], fov: 40 }} dpr={[1, 2]}>
              <SoftShadows size={15} samples={16} focus={0.5} />
              
              <ambientLight intensity={0.8} color="#ffffff" />
              <directionalLight 
                castShadow 
                position={[5, 10, 5]} 
                intensity={2.5} 
                color="#ffffff"
                shadow-mapSize={[2048, 2048]} 
                shadow-bias={-0.0001}
              />
              <directionalLight position={[-5, 5, -5]} intensity={1} color="#ffffff" />
              
              <Suspense fallback={null}>
                <KrushiBotModel />
                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={15} blur={2.5} far={5} color="#000000"/>
              </Suspense>
            </Canvas>
          </div>

          <div className="absolute bottom-16 flex flex-col items-center z-30 pointer-events-auto">
            <button 
              onClick={handleBuyNow}
              className="px-10 py-4 bg-white/10 border border-white/50 text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/20 hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-300 backdrop-blur-md"
            >
              Buy Now
            </button>
          </div>

          {/* Right-side Swipe Indicator */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none">
            <motion.div 
              animate={{ x: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 tracking-[0.3em] text-sm md:text-base uppercase font-bold border border-white/30 bg-black/50 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-md"
            >
              <span className="text-white pl-2">SWIPE</span>

              <div className="flex -space-x-3">
                <svg className="w-6 h-6 text-white opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                <svg className="w-6 h-6 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                <svg className="w-6 h-6 text-white opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* PANEL 2: Coming Soon */}
        <div className="w-[100vw] h-full relative flex items-center justify-center bg-transparent border-l border-white/10 z-20">
           <motion.div
             initial={{ opacity: 0, filter: "blur(10px)" }}
             whileInView={{ opacity: 1, filter: "blur(0px)" }}
             viewport={{ once: false }}
             transition={{ duration: 0.8, type: 'spring' }}
             className="text-center"
           >
              <motion.h2 
                animate={{ 
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              >
                Coming Soon
              </motion.h2>
           </motion.div>
        </div>

          </motion.div>
        </div>

        {/* =======================================================
            SECTION 2: CHECKOUT (Cinematic Hidden Panel)
            ======================================================= */}
        <div className="w-[100vw] h-screen bg-black relative flex items-center justify-center shrink-0">
          
          <div className="absolute inset-0 z-0 bg-white/[0.02]" />

          <button 
            onClick={handleCancelBuy}
            className="absolute top-10 left-10 text-white/50 hover:text-white uppercase tracking-widest text-sm font-bold flex items-center gap-2 transition-all hover:-translate-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Showcase
          </button>

          <div className="z-10 text-center flex flex-col items-center gap-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              Acquire Krushi Bot
            </h2>
            <p className="text-white/60 tracking-wider max-w-md">
              Proceed to secure the future of agronetics. Your autonomous farming journey begins here.
            </p>

            {/* Simulated Checkout Box */}
            <div className="w-full max-w-sm p-8 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-xl shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <span className="text-sm uppercase tracking-wider text-white/70">Starter Edition</span>
                <span className="text-xl font-bold text-white">Rs. 30,000</span>
              </div>
              <button className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-neutral-300 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                COMING SOON
              </button>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

// Preload the model
useGLTF.preload('/bot.glb');

export default HeroSection;
