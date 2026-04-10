"use client";

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, SoftShadows, ContactShadows, OrbitControls } from '@react-three/drei';
import RobotModel from './RobotModel';

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen px-4 pt-24 pb-12 overflow-hidden bg-gradient-to-b from-stone-50 to-green-50/10 lg:flex-row lg:px-24">
      
      {/* LEFT SIDE: Text and Actions */}
      <motion.div 
        className="z-10 flex flex-col lg:w-1/2 items-start mt-20 lg:mt-0"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <span className="px-3 py-1 mb-6 text-sm font-semibold tracking-wider text-emerald-800 bg-emerald-100/50 backdrop-blur rounded-full border border-emerald-200">
          KRUSHI BOT v1.0
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-stone-900 md:text-7xl lg:text-[5rem] leading-[1.1] mb-6">
          Smart Farming.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400">
            Automated.
          </span>
        </h1>
        <p className="max-w-xl mb-10 text-lg md:text-xl text-stone-600 font-medium">
          Meet KRUSHI BOT — your intelligent farming companion. Automate irrigation, manage crops, and increase yield with pinpoint precision.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
          <button className="px-8 py-4 text-lg font-semibold text-white transition-all shadow-xl bg-stone-900 rounded-full hover:bg-emerald-600 shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1">
            Get Started
          </button>
          <button className="px-8 py-4 text-lg font-semibold transition-all border-2 border-stone-200 text-stone-700 bg-white/50 backdrop-blur-sm rounded-full hover:border-emerald-200 hover:bg-emerald-50">
            Learn More
          </button>
        </div>
      </motion.div>

      {/* RIGHT SIDE: 3D Visualization */}
      <motion.div 
        className="relative flex items-center justify-center w-full h-[60vh] lg:h-screen lg:w-1/2 lg:flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[10rem] font-bold text-stone-900/5 tracking-tighter mix-blend-multiply origin-center -rotate-12 lg:-rotate-12 whitespace-nowrap">
            COMING SOON
          </h2>
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10 w-full h-[80%] my-auto lg:h-[120%] cursor-grab active:cursor-grabbing">
          <Canvas shadows camera={{ position: [5, 2, 5], fov: 40 }} dpr={[1, 2]}>
            <SoftShadows size={10} samples={16} focus={0.5} />
            <ambientLight intensity={0.5} />
            <directionalLight 
              castShadow 
              position={[5, 10, 5]} 
              intensity={2.5} 
              shadow-mapSize={[1024, 1024]} 
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            {/* Environment map for realistic reflections */}
            <Suspense fallback={null}>
              <Environment preset="city" />
              <RobotModel position={[0, -0.5, 0]} />
              
              <ContactShadows 
                position={[0, -1.8, 0]} 
                opacity={0.4} 
                scale={10} 
                blur={2.5} 
                far={4} 
              />
            </Suspense>
            {/* Auto-rotation + orbit controls */}
            <OrbitControls 
              autoRotate 
              autoRotateSpeed={0.5} 
              enableZoom={false} 
              enablePan={false} 
              maxPolarAngle={Math.PI / 2} 
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
        </div>
      </motion.div>

    </div>
  );
};

export default HeroSection;