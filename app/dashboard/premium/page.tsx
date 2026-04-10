import React from 'react';
import HeroSection from '@/components/HeroSection';
import StarBackground from '@/components/StarBackground';

export default function PremiumDashboardLanding() {
  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden text-stone-100">
      <HeroSection />
      <div className='fixed inset-0 z-0 pointer-events-none blur-[2px]'>
        <StarBackground />
      </div>
    </div>
  );
}