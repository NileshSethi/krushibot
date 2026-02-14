'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StarBackground from '@/components/StarBackground'
import ModelViewer from '@/components/ModelViewer'
import DashboardNav from '@/components/DashboardNav'
import { Activity, Zap, Cpu, AlertTriangle, Target, CheckCircle2, ListTodo } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className='relative min-h-screen w-full bg-black selection:bg-emerald-500/30 overflow-x-hidden'>
      <div className='fixed inset-0 z-0 pointer-events-none opacity-30'>
        <StarBackground />
      </div>
      
      <DashboardNav />

      <main className='relative z-10 container mx-auto px-4 py-24 space-y-24'>
        
        {/* Intro / Status Section */}
        <section className='space-y-10'>
            <div className='text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700'>
                <h1 className='text-4xl md:text-7xl font-black tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50'>
                    MISSION CONTROL
                </h1>
                <div className='flex items-center justify-center gap-3 text-emerald-400'>
                    <span className='relative flex h-3 w-3'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-emerald-500'></span>
                    </span>
                    <p className='text-sm uppercase tracking-[0.3em] font-medium'>System Online</p>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
                <Card className='glass-card p-6 flex flex-col items-center justify-center gap-4 text-center border-emerald-500/20 hover:border-emerald-500/40 transition-colors group'>
                    <div className='p-4 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform'>
                    <Activity className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Link Status</h3>
                    <p className='text-emerald-400 text-sm font-mono'>CONNECTED - 5G</p>
                    </div>
                </Card>

                <Card className='glass-card p-6 flex flex-col items-center justify-center gap-4 text-center border-blue-500/20 hover:border-blue-500/40 transition-colors group'>
                    <div className='p-4 rounded-full bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform'>
                    <Zap className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Power Cell</h3>
                    <p className='text-blue-400 text-sm font-mono'>87% CHARGED</p>
                    </div>
                </Card>
                
                <Card className='glass-card p-6 flex flex-col items-center justify-center gap-4 text-center border-purple-500/20 hover:border-purple-500/40 transition-colors group'>
                    <div className='p-4 rounded-full bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform'>
                    <Cpu className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Processor</h3>
                    <p className='text-purple-400 text-sm font-mono'>OPTIMAL - 42C</p>
                    </div>
                </Card>
            </div>
        </section>

        {/* 3D Visualization Section */}
        <section id='model-section' className='scroll-mt-24'>
             <div className='border-l-2 border-emerald-500 pl-6 mb-8'>
                <h2 className='text-3xl font-bold tracking-tight'>Digital Twin</h2>
                <p className='text-muted-foreground'>Real-time telemetry rendering of the breakdown unit.</p>
             </div>
             
             <Card className='glass-card border-white/10 overflow-hidden h-[500px] relative bg-gradient-to-b from-white/5 to-transparent'>
                <div className='absolute top-4 right-4 z-10 flex gap-2'>
                    <span className='px-2 py-1 rounded bg-black/50 text-[10px] text-emerald-400 border border-emerald-500/30 font-mono'>
                        LIDAR: ACTIVE
                    </span>
                     <span className='px-2 py-1 rounded bg-black/50 text-[10px] text-blue-400 border border-blue-500/30 font-mono'>
                        GYRO: STABLE
                    </span>
                </div>
                <ModelViewer />
             </Card>
        </section>

        {/* Problem Statement Section */}
        <section className='grid md:grid-cols-2 gap-12 items-start'>
            <div className='space-y-6'>
                 <div className='border-l-2 border-amber-500 pl-6'>
                    <h2 className='text-3xl font-bold tracking-tight'>Mission Objectives</h2>
                    <p className='text-muted-foreground'>Current operational challenges and targets.</p>
                 </div>

                 <div className='space-y-4'>
                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <AlertTriangle className='w-6 h-6 text-amber-500 shrink-0' />
                            <div>
                                <h3 className='font-semibold mb-2'>Agricultural Efficiency</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Traditional farming methods lack the precision required for modern crop management, leading to resource wastage and lower yields. Manual monitoring is labor-intensive and error-prone.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                         <div className='flex items-start gap-4'>
                            <Target className='w-6 h-6 text-red-500 shrink-0' />
                            <div>
                                <h3 className='font-semibold mb-2'>Surveillance Gaps</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Large scale perimeters require 24/7 monitoring capabilities that static cameras cannot provide. Blind spots and terrain challenges compromise security integrity.
                                </p>
                            </div>
                        </div>
                    </Card>
                 </div>
            </div>

            <div className='space-y-6'>
                 <div className='border-l-2 border-emerald-500 pl-6'>
                    <h2 className='text-3xl font-bold tracking-tight'>System Solutions</h2>
                    <p className='text-muted-foreground'>Automated response protocols.</p>
                 </div>

                 <Card className='p-8 glass-card border-emerald-500/20 bg-emerald-950/10'>
                    <ul className='space-y-6'>
                        <li className='flex gap-4'>
                            <CheckCircle2 className='w-6 h-6 text-emerald-500 shrink-0' />
                            <div>
                                <h4 className='font-semibold text-emerald-100'>Autonomous Pathfinding</h4>
                                <p className='text-sm text-emerald-400/70 mt-1'>
                                    Utilizing A* algorithms and computer vision to navigate complex terrain without human intervention.
                                </p>
                            </div>
                        </li>
                         <li className='flex gap-4'>
                            <div className='p-1 rounded-full bg-emerald-500/20'>
                                <ListTodo className='w-4 h-4 text-emerald-500' />
                            </div>
                            <div>
                                <h4 className='font-semibold text-emerald-100'>Precision Application</h4>
                                <p className='text-sm text-emerald-400/70 mt-1'>
                                    Targeted pesticide and fertilizer distribution controlled by sensor array feedback loops.
                                </p>
                            </div>
                        </li>
                    </ul>

                    <div className='mt-8 pt-8 border-t border-emerald-500/20'>
                        <p className='text-xs uppercase tracking-widest text-emerald-500/50 text-center'>
                            Protocol v2.4.1 Active
                        </p>
                    </div>
                 </Card>
            </div>
        </section>

      </main>
    </div>
  )
}
