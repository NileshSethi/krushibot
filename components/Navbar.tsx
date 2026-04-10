"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/50 backdrop-blur-md border-b border-white/20"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tighter text-emerald-900">KRUSHI<span className="text-emerald-500">BOT</span></span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-800">
        <a href="/" className="hover:text-emerald-500 transition-colors">Home</a>
        <a 
          href="/dashboard#use-cases" 
          className="hover:text-emerald-500 transition-colors"
          onClick={(e) => {
            const element = document.getElementById('use-cases');
            if (element) {
              e.preventDefault();
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Product Info
        </a>
        <a href="/dashboard/premium" className="hover:text-emerald-500 transition-colors">Purchase</a>
      </div>

      <div>
        <a href="/dashboard">
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5">
            Dashboard
          </button>
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
