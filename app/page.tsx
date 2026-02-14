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
      <div className='fixed inset-0 z-0 pointer-events-none opacity-40'>
        <StarBackground />
      </div>
      
      {/* Navigation */}
      <nav className='fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md px-6 py-4 flex items-center justify-between'>
        <div className='text-xl font-bold tracking-tighter'>KRUSHIBOT</div>
        <div className='flex gap-4'>
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
        
        <h1 className='text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent animate-fade-in'>
          FUTURE OF<br />AGRO-NETICS
        </h1>
        
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in delay-100'>
          Autonomous robotics control interface designed for precision agriculture and next-gen surveillance.
        </p>

        <div className='flex flex-col md:flex-row gap-4 animate-fade-in delay-200'>
          <Link href='/dashboard'>
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

        <div className='absolute bottom-10 animate-bounce'>
          <ChevronDown className='w-6 h-6 text-muted-foreground' />
        </div>
      </section>

      {/* 3D Model Showcase */}
      <section className='relative py-32 px-4 z-10 bg-gradient-to-b from-transparent to-black'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center'>
          <div className='space-y-8'>
            <h2 className='text-4xl font-bold tracking-tight'>Precision Engineering</h2>
            <p className='text-muted-foreground text-lg'>
              Experience full 3D manipulation with our real-time WebGL viewer. Inspect every detail of your autonomous unit before deployment.
            </p>
            
            <div className='grid gap-4'>
              <div className='flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10'>
                <ShieldCheck className='w-6 h-6 text-emerald-400' />
                <div>
                  <h3 className='font-semibold'>Military Grade Durability</h3>
                  <p className='text-sm text-muted-foreground'>Built to withstand extreme environments.</p>
                </div>
              </div>
              <div className='flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10'>
                <Zap className='w-6 h-6 text-yellow-400' />
                <div>
                  <h3 className='font-semibold'>Light Speed Response</h3>
                  <p className='text-sm text-muted-foreground'>Sub-10ms latency control signals.</p>
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
      <section id='features' className='relative py-32 px-4 z-10 bg-white/5'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-4'>Intelligent Control Systems</h2>
            <p className='text-muted-foreground'>Everything you need to manage your fleet.</p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              { title: 'Real-time Telemetry', desc: 'Monitor battery, signal strength, and motor status instantly.' },
              { title: 'Global Positioning', desc: 'Track your units anywhere on the globe with sub-meter accuracy.' },
              { title: 'Neural Navigation', desc: 'AI-driven pathfinding avoids obstacles automatically.' },
            ].map((feature, i) => (
              <Card key={i} className='p-8 glass-card border-white/10 hover:bg-white/10 transition-colors'>
                <Globe className='w-8 h-8 mb-4 text-blue-400' />
                <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
                <p className='text-muted-foreground'>{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className='relative py-40 px-4 z-10 text-center'>
        <div className='max-w-3xl mx-auto space-y-8'>
          <h2 className='text-4xl md:text-6xl font-bold tracking-tighter'>Ready to Deploy?</h2>
          <p className='text-muted-foreground text-lg'>
            Join the automated revolution today. Access the console and take control.
          </p>
          <Link href='/dashboard'>
            <Button className='h-16 px-12 text-lg rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-none transition-all'>
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <footer className='border-t border-white/10 py-12 text-center text-sm text-muted-foreground z-10 relative bg-black'>
        <p>&copy; 2026 KrushiBot Dynamics Inc. All systems normal.</p>
      </footer>
    </div>
  )
}
