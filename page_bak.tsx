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
    <div className='relative min-h-screen w-full bg-transparent overflow-x-hidden'>
      <DashboardNav />
      <main className='relative z-10 container mx-auto px-4 py-24 space-y-24'>
        
        {/* Intro / Status Section */}
        <section className='space-y-10'>
            <div className='text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700'>
                <h1 className='text-4xl md:text-7xl font-black tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50'>
                    MISSION CONTROL
                </h1>
                <div className='flex items-center justify-center gap-3 text-red-400'>
                    <span className='relative flex h-3 w-3'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
                    </span>
                    <p className='text-sm uppercase tracking-[0.3em] font-medium'>System Offline</p>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center'>
                <Card className='glass-card p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-emerald-500/20 hover:border-emerald-500/40 transition-colors group'>
                    <div className='p-4 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform'>
                    <Activity className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Link Status</h3>
                    <p className='text-red-400 text-sm font-mono'>NOT CONNECTED</p>
                    </div>
                </Card>
                
                <Card className='glass-card p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-purple-500/20 hover:border-purple-500/40 transition-colors group'>
                    <div className='p-4 rounded-full bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform'>
                    <Cpu className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Processor</h3>
                    <p className='text-purple-400 text-sm font-mono'>RASPBERY PI 4</p>
                    </div>
                </Card>
                <Card className='glass-card p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-amber-500/25 hover:border-amber-500/50 transition-colors group'>
                    <div className='p-4 rounded-full bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform'>
                    <Zap className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Battery Status</h3>
                    <p className='text-amber-300 text-sm font-mono'>NOT CONNECTED</p>
                    </div>
                </Card>
            </div>
        </section>

        {/* 3D Visualization Section */}
        <section id='model-section' className='scroll-mt-24'>
             <div className='border-l-2 border-emerald-500 pl-6 mb-8'>
                <h2 className='text-3xl font-bold tracking-tight'>Digital Twin</h2>
                <p className='text-muted-foreground'>Real time telemetry rendering of the breakdown unit.</p>
             </div>
             
             <Card className='glass-card border-white/10 overflow-hidden h-[500px] relative bg-gradient-to-b from-white/5 to-transparent'>
                <div className='absolute top-4 right-4 z-10 flex gap-2'>
                    <span className='px-2 py-1 rounded bg-black/50 text-[10px] text-red-400 border border-red-500/30 font-mono'>
                        RC: OFFLINE
                    </span>
                     <span className='px-2 py-1 rounded bg-black/50 text-[10px] text-blue-400 border border-blue-500/30 font-mono'>
                        GYRO: STABLE
                    </span>
                </div>
                     <ModelViewer interactive />
             </Card>
        </section>

        {/* Problem Statement Section */}
        <section className='grid md:grid-cols-2 gap-12 items-start'>
            <div className='space-y-6'>
                 <div className='border-l-2 border-amber-500 pl-6'>
                    <h2 className='text-3xl font-bold tracking-tight'>Mission Objectives</h2>
                    <p className='text-muted-foreground'>Operational drivers and constraints.</p>
                 </div>

                 <div className='space-y-4'>
                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <AlertTriangle className='w-6 h-6 text-amber-500 shrink-0' />
                            <div className='space-y-2'>
                                <h3 className='font-semibold'>Agricultural Efficiency</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Precision farming struggles with uneven nutrient delivery, over-watering, and fertilizer drift. Automated sensing and metered application reduce waste and stabilize yields.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <Target className='w-6 h-6 text-red-500 shrink-0' />
                            <div className='space-y-2'>
                                <h3 className='font-semibold'>Surveillance & Monitoring</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Wide fields create blind spots for manual patrols. Continuous sensor sweeps and camera coverage close gaps and surface anomalies before they impact crops.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <ListTodo className='w-6 h-6 text-emerald-500 shrink-0' />
                            <div className='space-y-2'>
                                <h3 className='font-semibold'>Labor Optimization</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Manual scouting is inconsistent and costly. Task automation stabilizes schedule adherence, reduces fatigue-driven errors, and frees operators for higher-value decisions.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <CheckCircle2 className='w-6 h-6 text-blue-400 shrink-0' />
                            <div className='space-y-2'>
                                <h3 className='font-semibold'>Sustainability Goals</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Controlled irrigation and precise pesticide dosing conserve water, limit runoff, and lower chemical loads, keeping the environmental footprint within target bounds.
                                </p>
                            </div>
                        </div>
                    </Card>
                 </div>
            </div>

            <div className='space-y-6'>
                 <div className='border-l-2 border-emerald-500 pl-6'>
                    <h2 className='text-3xl font-bold tracking-tight'>System Solutions</h2>
                    <p className='text-muted-foreground'>Architecture aligned to field operations.</p>
                 </div>

                 <Card className='p-8 glass-card border-emerald-500/20 bg-emerald-950/10 space-y-6'>
                    <div className='flex gap-4'>
                        <CheckCircle2 className='w-6 h-6 text-emerald-500 shrink-0' />
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Autonomous Pathfinding</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>
                                Sensor-led routing using ultrasonic range checks and rule-based turns to avoid obstacles while holding row alignment—no speculative AI claims.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='p-1 rounded-full bg-emerald-500/20'>
                            <ListTodo className='w-4 h-4 text-emerald-500' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Precision Application</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>
                                Metered irrigation and seeding triggered by soil moisture and prescription maps to deliver only what each zone needs.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='p-1 rounded-full bg-emerald-500/20'>
                            <Activity className='w-4 h-4 text-emerald-500' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Real-Time Telemetry</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>
                                Continuous feedback loop streams location, power, and implement state to the dashboard for operator oversight.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='p-1 rounded-full bg-emerald-500/20'>
                            <Cpu className='w-4 h-4 text-emerald-500' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Remote Control System</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>
                                Low-latency commands travel from the dashboard to the rover via secure API/WebSocket channels, keeping manual overrides responsive.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className='p-1 rounded-full bg-emerald-500/20'>
                            <Zap className='w-4 h-4 text-emerald-500' />
                        </div>
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Hardware Integration Layer</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>
                                Raspberry Pi orchestration ties sensors, motor drivers, and relays into modular services so implements can be swapped without rewriting control code.
                            </p>
                        </div>
                    </div>
                 </Card>
            </div>
        </section>

      </main>
    </div>
  )
}

