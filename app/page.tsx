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
    <div className='relative w-full bg-black text-white selection:bg-white/20 overflow-x-hidden'>
      {/* Background Layer */}
      <div className='fixed inset-0 z-0 pointer-events-none opacity-30'>
        <StarBackground />
      </div>
      
      {/* Navigation */}
      <nav className='fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md px-6 py-4 flex items-center justify-between overflow-hidden'>
        <div className='flex-1 overflow-hidden mask-image-linear-gradient mr-8'>
          {/* Marquee Container */}
          <div className='flex whitespace-nowrap overflow-hidden w-full'>
            <div className='animate-marquee-slow flex items-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm font-bold tracking-tighter uppercase min-w-full justify-around'>
               {[1,2,3,4].map((i) => (
                  <span key={i} className='mx-8'>The Future of Agronetics</span>
               ))}
            </div>
             <div className='animate-marquee-slow flex items-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm font-bold tracking-tighter uppercase min-w-full justify-around' aria-hidden='true'>
               {[1,2,3,4].map((i) => (
                  <span key={`duplicate-${i}`} className='mx-8'>The Future of Agronetics</span>
               ))}
            </div>
          </div>
        </div>

        <div className='flex gap-4 shrink-0 bg-black/50 pl-4 rounded-l-xl border-l border-white/5 z-10'>
          <Link href='/login'>
            <Button className='text-xs uppercase tracking-widest bg-transparent hover:bg-white/10'>Login</Button>
          </Link>
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
        
        <h4 className='text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent animate-fade-in'>
          FUTURE OF<br />AGRO-NETICS
        </h4>
        <br>
        </br>
        <h1 className='text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent animate-fade-in'>
          KRUSHI BOT
        </h1>
        <br>
        </br>
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in delay-100'>
          Autonomous robotics control interface designed for precision agriculture and next gen surveillance.
        </p>

        <div className='flex flex-col md:flex-row gap-4 animate-fade-in delay-200'>
          <Link href='/signup'>
            <Button className='h-12 px-8 rounded-full bg-white text-black hover:bg-gray-200 font-semibold tracking-wide'>
              Launch Console <ArrowRight className='ml-2 w-4 h-4' />
            </Button>
          </Link>
          <Link href='#features'>
            <Button className='h-12 px-8 rounded-full border border-white/20 hover:bg-white/10'>
              Learn More
            </Button>
          </Link>
        </div>
        
        <div className='absolute bottom-10 flex flex-col items-center -space-y-4 opacity-100'>
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
                  <h3 className='font-semibold group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all'>Military Grade Durability</h3>
                  <p className='text-sm text-muted-foreground'>Built to withstand extreme environments.</p>
                </div>
              </div>
              <div className='flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all group'>
                <Zap className='w-6 h-6 text-yellow-400 group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] transition-all' />
                <div>
                  <h3 className='font-semibold group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all'>Light Speed Response</h3>
                  <p className='text-sm text-muted-foreground'>Low latency control signals.</p>
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
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>Intelligent Control Systems</h2>
            <p className='text-muted-foreground'>Everything you need to manage your fleet.</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              { title: 'Real time Telemetry', desc: 'Control speed, signal strength, and motor status instantly.' },
              { title: 'Remote Command & Control', desc: 'Control and monitor your system remotely with real time command execution and instant feedback.' },
              { title: 'Sensor Integration System', desc: 'Seamlessly integrates multiple sensors to provide real time environmental data and responsive system behavior. ' },
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
            Join the automated revolution today. Access the console and take control.
          </p>
          <p>

          </p>
          
          <Link href='/signup'>
            <Button className='h-16 px-12 text-lg rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-none transition-all'>
              Get Started <ArrowRight className='ml-2 w-5 h-5' />
            </Button>
          </Link>
        </div>
      </div>

      <footer className='border-t border-white/10 py-4 text-center text-sm text-muted-foreground z-10 relative bg-black overflow-hidden'>
        <div className='w-full overflow-hidden flex whitespace-nowrap'>
             <div className='animate-marquee-slow inline-flex items-center min-w-full justify-around'>
                  {[1,2,3,4].map((i) => (
                    <span key={i} className='mx-12 opacity-50'>&copy; 2026 KrushiBot Dynamics Inc.</span>
                 ))}
             </div>
             <div className='animate-marquee-slow inline-flex items-center min-w-full justify-around' aria-hidden='true'>
                  {[1,2,3,4].map((i) => (
                    <span key={`dup-${i}`} className='mx-12 opacity-50'>&copy; 2026 KrushiBot Dynamics Inc.</span>
                 ))}
             </div>
        </div>
      </footer>
    </div>
  )
}
