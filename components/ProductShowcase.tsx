"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Droplets, 
  Wind, 
  Camera, 
  ThermometerSun, 
  PlusCircle, 
  Leaf, 
  WifiHigh, 
  BatteryFull
} from 'lucide-react';

const ProductShowcase = () => {
  const devices = [
    { icon: <ThermometerSun className="w-8 h-8"/>, name: "Soil Sensor", status: "Active" },
    { icon: <Droplets className="w-8 h-8"/>, name: "Water Pump", status: "Standby" },
    { icon: <Camera className="w-8 h-8"/>, name: "Smart Camera", status: "Active" },
    { icon: <Wind className="w-8 h-8"/>, name: "Weather Mod", status: "Calibrating" },
  ];

  const zones = [
    { name: "Field A", type: "Wheat", moisture: "45%" },
    { name: "Field B", type: "Corn", moisture: "62%" },
    { name: "Greenhouse #1", type: "Tomatoes", moisture: "80%" },
    { name: "Irrigation Hub", type: "Main", moisture: "100%" },
  ];

  return (
    <section className="min-h-screen py-24 bg-green-50 px-4 lg:px-24 flex items-center justify-center font-sans relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-emerald-200/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-lime-200/50 rounded-full blur-[80px]" />
      
      {/* Central Glassmorphism Container Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl overflow-hidden shadow-2xl bg-white/60 backdrop-blur-2xl rounded-[3rem] border border-white flex flex-col z-10"
      >
        
        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 p-12 lg:p-16 gap-12 items-center">
          <div className="flex flex-col items-start space-y-6">
            <span className="flex items-center gap-2 px-3 py-1 text-sm font-semibold tracking-wide text-emerald-800 uppercase bg-white rounded-full shadow-sm">
              <Sprout className="w-4 h-4 text-emerald-600" />
              Smart Management
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Control Your Farm,<br /> Effortlessly.
            </h2>
            <p className="max-w-md text-lg text-gray-600">
              Automate irrigation, monitor soil, and manage crops with precision using intelligent edge AI right from the dashboard.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-transform rounded-full bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20">
              <PlusCircle className="w-5 h-5" />
              Connect Device
            </button>
          </div>

          <div className="relative w-full h-[300px] lg:h-[400px] bg-emerald-50 rounded-[2rem] border border-emerald-100/50 shadow-inner flex items-center justify-center overflow-hidden">
             {/* Virtual Dashboard Screen Placeholder */}
             <div className="absolute inset-0 z-0 bg-gradient-to-tr from-emerald-100 to-white opacity-50"></div>
             
             <div className="relative z-10 w-3/4 h-3/4 bg-white/80 rounded-2xl shadow-xl shadow-emerald-200/50 border border-white backdrop-blur-md p-6 flex flex-col justify-between transform transition-transform hover:scale-105 duration-500">
                <div className="flex justify-between items-center w-full">
                  <div className="h-4 w-1/3 bg-gray-200 rounded-full"></div>
                  <div className="flex gap-2 text-emerald-500">
                    <WifiHigh className="w-5 h-5" />
                    <BatteryFull className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="flex w-full h-1/2 gap-4">
                   <div className="w-full h-full bg-emerald-50 rounded-xl flex items-center justify-center flex-col gap-2">
                      <div className="text-2xl font-bold text-emerald-700">72%</div>
                      <div className="text-xs font-semibold text-emerald-600">Soil Moisture</div>
                   </div>
                   <div className="w-full h-full bg-blue-50 rounded-xl flex items-center justify-center flex-col gap-2">
                      <div className="text-2xl font-bold text-blue-700">On</div>
                      <div className="text-xs font-semibold text-blue-600">Pumps</div>
                   </div>
                </div>
                
                <div className="h-6 w-1/2 bg-gray-100 rounded-full mt-4"></div>
             </div>
          </div>
        </div>

        {/* MIDDLE SECTION - Horizontal Devices */}
        <div className="px-12 pb-8 bg-black/5 rounded-t-3xl pt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Add your devices</h3>
            <span className="text-sm font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer">View All</span>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar">
            {devices.map((device, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="snap-start shrink-0 w-48 p-6 transition-all bg-white border border-gray-100 cursor-pointer rounded-2xl shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 group flex flex-col gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                  {device.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{device.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{device.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION - Zones */}
        <div className="p-12 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Select Zones</h3>
            <span className="text-sm font-medium text-gray-500">Swipe to view more</span>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar">
            {zones.map((zone, i) => (
              <motion.div 
               key={i}
               whileHover={{ scale: 1.02 }}
               className="snap-start shrink-0 w-[280px] h-[160px] cursor-pointer rounded-2xl overflow-hidden relative shadow-md group"
              >
                {/* Abstract Background for Zone */}
                <div className={`absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30 ${i%2===0?'bg-green-600' : 'bg-emerald-500'}`}>
                  {/* Decorative noise/texture could go here */}
                </div>
                <div className={`absolute inset-0 z-0 ${i%2===0?'bg-emerald-950' : 'bg-green-900'}`}></div>
                
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{zone.name}</h4>
                      <div className="flex items-center gap-1 text-emerald-300/80 text-sm font-medium">
                        <Leaf className="w-3 h-3" />
                        {zone.type}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{zone.moisture}</div>
                      <div className="text-xs text-stone-300 uppercase tracking-wider">Moist.</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </motion.div>
      
      {/* Scrollbar hide CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default ProductShowcase;