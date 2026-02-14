'use client'

import React from 'react'
import Link from 'next/link'
import DashboardControls from '@/components/DashboardControls'
import StarBackground from '@/components/StarBackground'
import { ArrowLeft } from 'lucide-react'

export default function ControlsPage() {
  return (
    <div className='relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-black overflow-hidden'>
      {/* Background Layer */}
      <div className='fixed inset-0 z-0 pointer-events-none opacity-40'>
        <StarBackground />
      </div>

      <header className='absolute top-6 left-6 z-20'>
        <Link href='/dashboard' className='flex items-center gap-2 text-muted-foreground hover:text-white transition-colors group'>
          <div className='p-2 rounded-full glass-card group-hover:bg-white/10 transition-colors'>
            <ArrowLeft className='w-4 h-4' />
          </div>
          <span className='text-xs uppercase tracking-widest hidden md:inline-block'>Dashboard</span>
        </Link>
      </header>
      
      <div className='z-10 w-full max-w-6xl animate-in fade-in zoom-in-95 duration-500'>
        <DashboardControls />
      </div>
    </div>
  )
}
