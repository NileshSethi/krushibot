'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import StarBackground from '@/components/StarBackground'
import ModelViewer from '@/components/ModelViewer'
import DashboardNav from '@/components/DashboardNav'
import { Droplets, Navigation, BatteryCharging, Leaf, Target, Map, Bot, Server, CheckCircle2, Factory } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className='relative min-h-screen w-full bg-transparent overflow-x-hidden'>
      <DashboardNav />

      <main className='relative z-10 container mx-auto px-4 py-24 space-y-24'>  

        {/* Intro / Status Section */}
        <section className='space-y-10'>
            <div className='text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700'>
                <h1 className='text-4xl md:text-7xl font-black tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 uppercase'>
                    Product Overview
                </h1>
                <p className='text-muted-foreground max-w-2xl mx-auto'>KRUSHI BOT is an autonomous farming assistant designed to optimize agricultural efficiency.</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto justify-items-center'>
                <Card className='glass-card p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-blue-500/20 hover:border-blue-500/40 transition-colors group'>
                    <div className='p-4 rounded-full bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform'>
                    <Droplets className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Smart Irrigation</h3>      
                    <p className='text-muted-foreground text-sm mt-1 mb-0'>Precision water delivery</p>
                    </div>
                </Card>

                <Card className='glass-card p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-purple-500/20 hover:border-purple-500/40 transition-colors group'>
                    <div className='p-4 rounded-full bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform'>
                    <Target className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Soil Monitoring</h3>        
                    <p className='text-muted-foreground text-sm mt-1 mb-0'>Real-time terrain analysis</p>
                    </div>
                </Card>
                <Card className='glass-card p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-amber-500/25 hover:border-amber-500/50 transition-colors group'>
                    <div className='p-4 rounded-full bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform'>
                    <Navigation className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Autonomous Nav</h3>   
                    <p className='text-muted-foreground text-sm mt-1 mb-0'>Obstacle-avoidant driving</p>
                    </div>
                </Card>
                <Card className='glass-card p-6 w-full flex flex-col items-center justify-center gap-4 text-center border-emerald-500/25 hover:border-emerald-500/50 transition-colors group'>
                    <div className='p-4 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform'>
                    <BatteryCharging className='w-8 h-8' />
                    </div>
                    <div>
                    <h3 className='font-semibold text-lg'>Energy Efficient</h3>   
                    <p className='text-muted-foreground text-sm mt-1 mb-0'>Low footprint operation</p>
                    </div>
                </Card>
            </div>
        </section>

        {/* 3D Visualization Section */}
        <section id='model-section' className='scroll-mt-24'>
             <div className='border-l-2 border-emerald-500 pl-6 mb-8'>
                <h2 className='text-3xl font-bold tracking-tight'>Digital Twin</h2>
                <p className='text-muted-foreground'>Interactive 3D model of the KRUSHI BOT core platform.</p>
             </div>

             <Card className='glass-card border-white/10 overflow-hidden h-[500px] relative bg-gradient-to-b from-white/5 to-transparent'>
                <ModelViewer interactive />
             </Card>
        </section>

        {/* Benefits & Use Cases Section */}
        <section id='use-cases' className='grid md:grid-cols-2 gap-12 items-start scroll-mt-24'>
            <div className='space-y-6'>
                 <div className='border-l-2 border-amber-500 pl-6'>
                    <h2 className='text-3xl font-bold tracking-tight'>Use Cases</h2>
                    <p className='text-muted-foreground'>Designed to scale across various agricultural operations.</p>
                 </div>

                 <div className='space-y-4'>
                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <Leaf className='w-6 h-6 text-amber-500 shrink-0' />
                            <div className='space-y-2'>
                                <h3 className='font-semibold'>Small Farms</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Optimized for personal and small-scale operations needing affordable entry-level automation for daily chores.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <Factory className='w-6 h-6 text-red-500 shrink-0' />
                            <div className='space-y-2'>
                                <h3 className='font-semibold'>Large-scale Agriculture</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Swarm deployment capabilities allow for managing expansive fields while keeping operating costs low.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className='p-6 glass-card border-white/5 hover:bg-white/5 transition-colors'>
                        <div className='flex items-start gap-4'>
                            <Bot className='w-6 h-6 text-emerald-500 shrink-0' />
                            <div className='space-y-2'>
                                <h3 className='font-semibold'>Research & Automation</h3>
                                <p className='text-sm text-muted-foreground leading-relaxed'>
                                    Ideal base station platform for universities and agronetic scientists deploying experimental sensor modules.
                                </p>
                            </div>
                        </div>
                    </Card>
                 </div>
            </div>

            <div className='space-y-6'>
                 <div className='border-l-2 border-emerald-500 pl-6'>
                    <h2 className='text-3xl font-bold tracking-tight'>Benefits</h2>
                    <p className='text-muted-foreground'>How KRUSHI BOT accelerates yield returns.</p>
                 </div>

                 <Card className='p-8 glass-card border-emerald-500/20 bg-emerald-950/10 space-y-6'>
                    <div className='flex gap-4'>
                        <CheckCircle2 className='w-6 h-6 text-emerald-500 shrink-0' />
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Saves Time</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>    
                                Reclaims hours spent on manual farming duties, allowing focus on management.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <CheckCircle2 className='w-6 h-6 text-emerald-500 shrink-0' />
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Reduces Manual Labor</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>    
                                Offloads exhaustive physical tasks, lowering injury rates and physical strain.
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <CheckCircle2 className='w-6 h-6 text-emerald-500 shrink-0' />
                        <div>
                            <h4 className='font-semibold text-emerald-100'>Improves Crop Yield</h4>
                            <p className='text-sm text-emerald-400/70 mt-1'>    
                                Consistent delivery of nutrients ensures uniform growth across large terrains.
                            </p>
                        </div>
                    </div>
                 </Card>
                 
                 <div className='border-l-2 border-blue-500 pl-6 mt-12'>
                    <h2 className='text-2xl font-bold tracking-tight mb-4'>Why KRUSHI BOT?</h2>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      We built Krushi Bot to solve real-world problems natively, prioritizing robust precision over speculative hype. 
                    </p>
                    <ul className='mt-4 space-y-2 text-sm text-white/80 list-disc pl-4'>
                        <li>Cost-effective automated workforce</li>
                        <li>Durable, all-terrain custom chassis</li>
                        <li>Open for integration with modern farms</li>
                    </ul>
                 </div>
            </div>
        </section>

        {/* How It Works & Tech Highlights Section */}
        <section className='grid md:grid-cols-2 gap-12 items-start'>
            <div className='space-y-6'>
                 <div className='border-l-2 border-purple-500 pl-6'>
                    <h2 className='text-3xl font-bold tracking-tight'>How It Works</h2>
                    <p className='text-muted-foreground'>Simplified process from unboxing to automated farming.</p>
                 </div>
                 
                 <div className='relative ml-4 mt-8 space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent'>
                    <div className='relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active'>
                        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2'>
                             <span className='font-bold text-slate-300'>1</span>
                        </div>
                        <div className='w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-800 bg-slate-900/50 shadow'>
                            <h4 className='font-semibold text-slate-100 mb-1'>Deploy the bot</h4>
                            <p className='text-sm text-slate-400'>Place the robot unit onto your active field paths.</p>
                        </div>
                    </div>
                    
                    <div className='relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active'>
                        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2'>
                             <span className='font-bold text-slate-300'>2</span>
                        </div>
                        <div className='w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-800 bg-slate-900/50 shadow'>
                            <h4 className='font-semibold text-slate-100 mb-1'>Monitor Conditions</h4>
                            <p className='text-sm text-slate-400'>Let the onboard sensors detect soil moisture instantly.</p>
                        </div>
                    </div>
                    
                    <div className='relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active'>
                        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2'>
                             <span className='font-bold text-slate-300'>3</span>
                        </div>
                        <div className='w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-800 bg-slate-900/50 shadow'>
                            <h4 className='font-semibold text-slate-100 mb-1'>Automate Tasks</h4>
                            <p className='text-sm text-slate-400'>Set irrigation and routing schedules remotely.</p>
                        </div>
                    </div>
                    
                    <div className='relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active'>
                        <div className='flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-slate-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2'>
                             <span className='font-bold text-slate-300'>4</span>
                        </div>
                        <div className='w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-800 bg-slate-900/50 shadow'>
                            <h4 className='font-semibold text-slate-100 mb-1'>Improve Productivity</h4>
                            <p className='text-sm text-slate-400'>Analyze yield data to make future optimizations.</p>
                        </div>
                    </div>
                 </div>
            </div>

            <div className='space-y-12'>
                 <div className='space-y-6'>
                     <div className='border-l-2 border-red-500 pl-6'>
                        <h2 className='text-3xl font-bold tracking-tight'>Tech Highlights</h2>
                        <p className='text-muted-foreground'>Under the hood of agronetic innovation.</p>
                     </div>
                     <div className='grid grid-cols-2 gap-4'>
                          <Card className='p-4 glass-card border-white/5 hover:bg-white/5 transition-colors flex items-center gap-3 text-sm'>
                               <Server className='text-white border border-white/20 p-1 w-8 h-8 rounded-md' />
                               ESP-Based Embedded Sys
                          </Card>
                          <Card className='p-4 glass-card border-white/5 hover:bg-white/5 transition-colors flex items-center gap-3 text-sm'>
                               <Map className='text-white border border-white/20 p-1 w-8 h-8 rounded-md' />
                               Precision Sensors
                          </Card>
                          <Card className='p-4 glass-card border-white/5 hover:bg-white/5 transition-colors flex items-center gap-3 text-sm'>
                               <Bot className='text-white border border-white/20 p-1 w-8 h-8 rounded-md' />
                               Custom Motors
                          </Card>
                          <Card className='p-4 glass-card border-white/5 hover:bg-white/5 transition-colors flex items-center gap-3 text-sm'>
                               <Target className='text-white border border-white/20 p-1 w-8 h-8 rounded-md' />
                               Targeted Farming
                          </Card>
                     </div>
                 </div>
                 
                 <div className='space-y-6'>
                     <div className='border-l-2 border-blue-400 pl-6'>
                        <h2 className='text-3xl font-bold tracking-tight'>Future Vision</h2>
                        <p className='text-muted-foreground'>What lies ahead.</p>
                     </div>
                     <Card className='p-6 glass-card border-white/5 bg-blue-950/20'>
                        <p className='text-sm text-blue-200/80 mb-4'>Our roadmap targets scaling autonomy with connected ecosystems.</p>
                        <ul className='space-y-3 text-sm text-white/80'>
                            <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-blue-400' /> Swarm behavior via AI Integration</li>
                            <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-blue-400' /> Full remote telemetry monitoring</li>
                            <li className='flex items-center gap-2'><CheckCircle2 className='w-4 h-4 text-blue-400' /> Machine-learning crop prediction</li>
                        </ul>
                     </Card>
                 </div>
            </div>
        </section>

      </main>
      
      <div className='fixed inset-0 z-0 pointer-events-none blur-[2px]'>
        <StarBackground />
      </div>
    </div>
  )
}
