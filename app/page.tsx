'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ModelViewer from '@/components/ModelViewer'
import StarBackground from '@/components/StarBackground'
import { ChevronDown, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react' 

export default function LandingPage() {
  return (
    <div className='relative w-full bg-transparent text-white overflow-x-hidden'>
      {/* Navigation */}
      <nav className='fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md py-4 flex items-center justify-between'>
        <div className='flex-1 marquee-container max-w-full'>
          <div className='marquee-track text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm font-bold tracking-tighter uppercase'>
            {[...Array(16)].map((_, i) => (
              <span key={i} className='shrink-0 flex items-center'>THE FUTURE OF AGRONETICS</span>
            ))}
          </div>
        </div>

        <div className='flex gap-4 shrink-0 bg-black/50 pl-4 py-2 pr-6 rounded-l-xl border-l border-white/5 z-10 absolute right-0'>
          <Link href='/signup'>
            <Button className='text-xs uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-all'>
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 z-10'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none' />

        <h4 className='text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent animate-fade-in drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>
          FUTURE OF<br />AGRO-NETICS
        </h4>
        <br>
        </br>
        <h1 className='text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent animate-fade-in drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>
          KRUSHI-BOT
        </h1>
        <br>
        </br>
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in delay-100'>
          Autonomous farming assistant designed to optimize agricultural efficiency and precision.
        </p>

        <div className='flex flex-col md:flex-row gap-4 animate-fade-in delay-200'>
          <Link href='/signup'>
            <Button className='h-12 px-8 rounded-full bg-white text-black hover:bg-gray-200 font-semibold tracking-wide'>
              Get Started <ArrowRight className='ml-2 w-4 h-4' />
            </Button>
          </Link>
          <Link href='#features'>
            <Button className='h-12 px-8 rounded-full border border-white/20 hover:bg-white/10'>
              Learn More
            </Button>
          </Link>
        </div>

        <div className='absolute bottom-10 flex flex-col items-center -space-y-4 opacity-100 animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>
          <ChevronDown className='w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-bounce' />
          <ChevronDown className='w-10 h-10 text-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] animate-bounce delay-75 duration-1000' />
          <ChevronDown className='w-10 h-10 text-white/50 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] animate-bounce delay-150 duration-1000' />
        </div>
      </section>

      {/* 3D Model Showcase */}
      <section className='relative py-32 px-4 z-10'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center'>
          <div className='space-y-8'>
            <h2 className='text-4xl font-bold tracking-tight'>Precision Engineering</h2>
            <p className='text-muted-foreground text-lg'>
              Experience full 3D manipulation with our real time WebGL viewer. Inspect every detail of your autonomous unit before deployment.
            </p>

            <div className='grid gap-4'>
              <div className='flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all group'>
                <ShieldCheck className='w-6 h-6 text-emerald-400 group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-all' />
                <div>
                  <h3 className='font-semibold group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all'>Terrain Durability</h3>
                  <p className='text-sm text-muted-foreground'>Built to withstand extreme agricultural environments.</p>
                </div>
              </div>
              <div className='flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all group'>
                <Zap className='w-6 h-6 text-yellow-400 group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] transition-all' />
                <div>
                  <h3 className='font-semibold group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all'>Energy Efficient</h3>
                  <p className='text-sm text-muted-foreground'>Optimized for low footprint daily operation.</p>
                </div>
              </div>
            </div>
          </div>

          <div className='h-[400px] md:h-[600px] w-full relative'>
            <ModelViewer />
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id='features' className='relative py-32 px-4 z-10'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>Smart Farming Systems</h2>    
            <p className='text-muted-foreground'>Everything you need to manage your yield.</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              { title: 'Real-time Analytics', desc: 'Monitor crop status and field health instantly from your device.' },
              { title: 'Autonomous Navigation', desc: 'Pathfinding mapped directly to your farm layout to save time.' },   
              { title: 'Sensor Integration', desc: 'Seamlessly integrates multiple sensors to provide precise soil data.' },
            ].map((feature, i) => (
              <Card key={i} className='p-8 bg-transparent border-white/10 hover:border-white/30 transition-all group hover:-translate-y-1 hover:shadow-none'>   
                <Globe className='w-8 h-8 mb-4 text-blue-400 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all' />
                <h3 className='text-xl font-bold mb-2 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all'>{feature.title}</h3>
                <p className='text-muted-foreground group-hover:text-white/80 transition-all'>{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <div className='relative py-40 px-4 z-10 text-center'>
        <div className='max-w-3xl mx-auto space-y-8'>
          <h2 className='text-4xl md:text-6xl font-bold tracking-tighter'>Ready to Deploy?</h2>
          <p className='text-muted-foreground text-lg'>
            Join the automated revolution today. Experience seamless precision framing.
          </p>

          <Link href='/signup'>
              <Button className='mt-8 h-14 px-12 rounded-full bg-white text-black hover:bg-gray-200 font-bold tracking-wide text-lg'>
                  Get Krushi Bot <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
          </Link>
        </div>
      </div>

      <div className='fixed inset-0 z-0 pointer-events-none blur-[2px]'>
        <StarBackground />
      </div>
    </div>
  )
}
