'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ModelViewer from '@/components/ModelViewer'
import StarBackground from '@/components/StarBackground'
import {
  ChevronDown, ArrowRight, ShieldCheck,
  Zap, Globe, Activity, Sprout
} from 'lucide-react'

// ── Shooting-star parallax shapes ─────────────────────────────────────────────
// Shapes move UPWARD on scroll (negative Y).
// Gradient: white/bright at TOP (leading edge) → transparent at BOTTOM (tail).
// This mimics a shooting star flying upward through the frame.
// Larger shapes + white glow = more dramatic star-like streaks.
const SHAPES = [
  // ── Left column ────────────────────────────────────────────────────────────
  { id:  0, top:  2,  left:  4,  w: 32,  h: 160, speed: 1.8,  glow: 'rgba(255,255,255,0.55)', rotate: -10 },
  { id:  1, top: 14,  left:  1,  w: 18,  h:  90, speed: 0.85, glow: 'rgba(200,220,255,0.35)', rotate:   5 },
  { id:  2, top: 26,  left:  8,  w: 40,  h: 200, speed: 2.5,  glow: 'rgba(255,255,255,0.60)', rotate:  -6 },
  { id:  3, top: 42,  left:  2,  w: 22,  h: 110, speed: 1.3,  glow: 'rgba(180,200,255,0.40)', rotate:   8 },
  { id:  4, top: 57,  left: 11,  w: 28,  h: 140, speed: 2.1,  glow: 'rgba(255,255,255,0.50)', rotate:  -5 },
  { id:  5, top: 72,  left:  5,  w: 16,  h:  80, speed: 1.0,  glow: 'rgba(220,230,255,0.35)', rotate:   4 },
  { id:  6, top: 84,  left:  9,  w: 36,  h: 180, speed: 2.9,  glow: 'rgba(255,255,255,0.55)', rotate:  -8 },

  // ── Right column ───────────────────────────────────────────────────────────
  { id:  7, top:  5,  left: 87,  w: 36,  h: 175, speed: 1.6,  glow: 'rgba(255,255,255,0.60)', rotate:  10 },
  { id:  8, top: 18,  left: 93,  w: 20,  h: 100, speed: 2.7,  glow: 'rgba(200,215,255,0.40)', rotate:  -4 },
  { id:  9, top: 32,  left: 84,  w: 30,  h: 150, speed: 1.2,  glow: 'rgba(255,255,255,0.50)', rotate:   6 },
  { id: 10, top: 48,  left: 91,  w: 16,  h:  78, speed: 2.3,  glow: 'rgba(210,225,255,0.35)', rotate:  -6 },
  { id: 11, top: 63,  left: 86,  w: 38,  h: 190, speed: 1.7,  glow: 'rgba(255,255,255,0.65)', rotate:   9 },
  { id: 12, top: 78,  left: 94,  w: 22,  h: 108, speed: 2.0,  glow: 'rgba(190,210,255,0.40)', rotate:  -5 },
  { id: 13, top: 90,  left: 88,  w: 14,  h:  65, speed: 1.4,  glow: 'rgba(255,255,255,0.45)', rotate:   3 },

  // ── Scattered inner ────────────────────────────────────────────────────────
  { id: 14, top: 20,  left: 20,  w: 14,  h:  60, speed: 3.1,  glow: 'rgba(255,255,255,0.30)', rotate:   0 },
  { id: 15, top: 35,  left: 75,  w: 12,  h:  55, speed: 2.0,  glow: 'rgba(220,235,255,0.30)', rotate:  -3 },
  { id: 16, top: 55,  left: 25,  w: 18,  h:  80, speed: 2.6,  glow: 'rgba(255,255,255,0.35)', rotate:   5 },
  { id: 17, top: 67,  left: 70,  w: 10,  h:  45, speed: 1.5,  glow: 'rgba(200,215,255,0.28)', rotate:  -2 },
  { id: 18, top: 80,  left: 30,  w: 24,  h: 115, speed: 2.2,  glow: 'rgba(255,255,255,0.45)', rotate:   6 },
  { id: 19, top: 88,  left: 65,  w: 16,  h:  70, speed: 1.9,  glow: 'rgba(210,225,255,0.32)', rotate:  -4 },
]

export default function LandingPage() {
  const shapeRefs   = useRef<(HTMLDivElement | null)[]>([])
  const heroTxtRef  = useRef<HTMLDivElement>(null)
  const heroStatRef = useRef<HTMLDivElement>(null)
  const modelRef    = useRef<HTMLElement>(null)
  const modelLRef   = useRef<HTMLDivElement>(null)
  const modelRRef   = useRef<HTMLDivElement>(null)
  const featRef     = useRef<HTMLElement>(null)
  const featHdRef   = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let dead = false

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (dead) return
        gsap.registerPlugin(ScrollTrigger)

        const totalScroll = document.body.scrollHeight - window.innerHeight

        // ── Parallax: each shape drifts upward at its own speed ──────────
        shapeRefs.current.forEach((el, i) => {
          if (!el) return
          const speed = SHAPES[i]?.speed ?? 1
          gsap.to(el, {
            y: -(speed * totalScroll * 0.13),
            ease: 'none',
            scrollTrigger: {
              trigger: document.body,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1.4,   // higher = more lag = dreamier float
            },
          })
        })

        // ── Hero entrance ────────────────────────────────────────────────
        if (heroTxtRef.current) {
          gsap.fromTo(
            [...heroTxtRef.current.children],
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 1.1, ease: 'power3.out', delay: 0.1 }
          )
        }
        if (heroStatRef.current) {
          gsap.fromTo(heroStatRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.85 }
          )
        }

        // ── Model section ────────────────────────────────────────────────
        if (modelLRef.current) {
          gsap.fromTo(modelLRef.current,
            { opacity: 0, x: -70 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
              scrollTrigger: { trigger: modelRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
          )
        }
        if (modelRRef.current) {
          gsap.fromTo(modelRRef.current,
            { opacity: 0, x: 70 },
            { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', delay: 0.12,
              scrollTrigger: { trigger: modelRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
          )
        }

        // ── Features ─────────────────────────────────────────────────────
        if (featHdRef.current) {
          gsap.fromTo(featHdRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: featRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
          )
        }
        const cards = featRef.current?.querySelectorAll('.feat-card')
        if (cards?.length) {
          gsap.fromTo(cards,
            { opacity: 0, y: 50, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.75, ease: 'power2.out',
              scrollTrigger: { trigger: featRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } }
          )
        }

        // ── CTA ──────────────────────────────────────────────────────────
        if (ctaRef.current) {
          gsap.fromTo(
            [...ctaRef.current.children],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
          )
        }
      })
    })

    return () => {
      dead = true
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(t => t.kill())
      })
    }
  }, [])

  return (
    <div className='relative w-full bg-transparent text-white overflow-x-hidden'>

      {/* Fixed star field */}
      <div className='fixed inset-0 z-0 pointer-events-none blur-[2px]'>
        <StarBackground />
      </div>

      {/* ── Parallax shooting-star pills ─────────────────────────────────────
          Each pill: bright white glow at TOP (leading edge, direction of travel)
          fading to transparent at BOTTOM (the tail).
          Built with two layered divs:
            1. Outer: the body gradient (dim white → transparent)
            2. Inner: a tight bright cap at the top for the "head" glow
      ─────────────────────────────────────────────────────────────────────── */}
      {SHAPES.map((s, i) => (
        <div
          key={s.id}
          ref={el => { shapeRefs.current[i] = el }}
          className='absolute pointer-events-none z-[1]'
          style={{
            top:       `${s.top}%`,
            left:      `${s.left}%`,
            width:     `${s.w}px`,
            height:    `${s.h}px`,
            transform: `rotate(${s.rotate}deg)`,
          }}
        >
          {/* Body: soft glow trail fading downward */}
          <div
            className='absolute inset-0 rounded-full'
            style={{
              background: `linear-gradient(to bottom, ${s.glow}, rgba(255,255,255,0.08) 40%, transparent 100%)`,
              filter: 'blur(1.5px)',
            }}
          />
          {/* Head: bright concentrated tip at the top */}
          <div
            className='absolute rounded-full'
            style={{
              top: 0,
              left: '15%',
              width: '70%',
              height: `${Math.min(s.h * 0.22, 36)}px`,
              background: `radial-gradient(ellipse at 50% 0%, ${s.glow.replace(/[\d.]+\)$/, '1)')}, transparent 80%)`,
              filter: 'blur(0.5px)',
            }}
          />
        </div>
      ))}

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <nav className='fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md py-4 flex items-center justify-between'>
        <div className='flex-1 marquee-container max-w-full'>
          <div className='marquee-track text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-sm font-bold tracking-tighter uppercase'>
            {[...Array(16)].map((_, i) => (
              <span key={i} className='shrink-0 flex items-center'>THE FUTURE OF AGRONETICS</span>
            ))}
          </div>
        </div>
        <div className='flex gap-4 shrink-0 bg-black/50 pl-4 py-2 pr-6 rounded-l-xl border-l border-white/5 z-10 absolute right-0'>
          <Link href='/login'>
            <Button className='text-xs uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-all'>
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className='relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 z-10'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 blur-[140px] rounded-full pointer-events-none' />

        <div ref={heroTxtRef} className='flex flex-col items-center'>
          <img 
            src="/symbinobackground.png" 
            alt="Symbiosis" 
            className="w-auto h-24 md:h-32 mb-6 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
            style={{ opacity: 0 }} 
          />
          <h4
            className='text-5xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'
            style={{ opacity: 0 }}
          >
            FUTURE OF<br />AGRO-NETICS
          </h4>
          <h1
            className='text-5xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'
            style={{ opacity: 0 }}
          >
            KRUSHI-BOT
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mb-8' style={{ opacity: 0 }}>
            Autonomous farming assistant designed to optimize agricultural efficiency and precision.
          </p>
          <div className='flex flex-col md:flex-row gap-4 mb-12' style={{ opacity: 0 }}>
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
        </div>
        <div className='absolute bottom-10 flex flex-col items-center -space-y-4'>
          <ChevronDown className='w-10 h-10 text-white animate-bounce drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' />
          <ChevronDown className='w-10 h-10 text-white/70 animate-bounce delay-75 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' />
          <ChevronDown className='w-10 h-10 text-white/40 animate-bounce delay-150 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' />
        </div>
      </section>

      {/* ── Precision Engineering ─────────────────────────────────────────── */}
      <section ref={modelRef} className='relative py-20 px-4 z-10'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center'>
          <div ref={modelLRef} className='space-y-8' style={{ opacity: 0 }}>
            <h2 className='text-4xl font-bold tracking-tight'>Precision Engineering</h2>
            <p className='text-muted-foreground text-lg'>
              Experience full 3D manipulation with our real-time WebGL viewer.
              Inspect every detail of your autonomous unit before deployment.
            </p>
            <div className='grid gap-4'>
              <div className='flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all group'>
                <ShieldCheck className='w-6 h-6 text-emerald-400' />
                <div>
                  <h3 className='font-semibold group-hover:text-emerald-400 transition-all'>Terrain Durability</h3>
                  <p className='text-sm text-muted-foreground'>Built to withstand extreme agricultural environments.</p>
                </div>
              </div>
              <div className='flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all group'>
                <Zap className='w-6 h-6 text-yellow-400' />
                <div>
                  <h3 className='font-semibold group-hover:text-yellow-400 transition-all'>Energy Efficient</h3>
                  <p className='text-sm text-muted-foreground'>Optimized for low-footprint daily operation.</p>
                </div>
              </div>
            </div>
          </div>
          <div ref={modelRRef} className='h-[400px] md:h-[600px] w-full relative' style={{ opacity: 0 }}>
            <ModelViewer />
          </div>
        </div>
      </section>

      {/* ── Smart Farming Features ────────────────────────────────────────── */}
      <section ref={featRef} id='features' className='relative py-20 px-4 z-10'>
        <div className='max-w-7xl mx-auto'>
          <div ref={featHdRef} className='text-center mb-12' style={{ opacity: 0 }}>
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]'>
              Smart Farming Systems
            </h2>
            <p className='text-muted-foreground'>Everything you need to manage your yield.</p>
          </div>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              { title: 'Real-time Analytics',       desc: 'Monitor crop status and field health instantly from your device.'     },
              { title: 'Semi-Autonomous Navigation', desc: 'Pathfinding mapped directly to your farm layout to save time.'       },
              { title: 'Sensor Integration',         desc: 'Seamlessly integrates multiple sensors to provide precise soil data.' },
            ].map((f, i) => (
              <Card key={i} className='feat-card p-8 bg-black/40 backdrop-blur-sm border-white/10 hover:border-white/30 transition-all group hover:-translate-y-1' style={{ opacity: 0 }}>
                <Globe className='w-8 h-8 mb-4 text-blue-400 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all' />
                <h3 className='text-xl font-bold mb-2 group-hover:text-blue-400 transition-all'>{f.title}</h3>
                <p className='text-muted-foreground group-hover:text-white/80 transition-all'>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className='relative py-24 px-4 z-10 text-center'>
        <div ref={ctaRef} className='max-w-3xl mx-auto space-y-6'>
          <h2 className='text-4xl md:text-6xl font-bold tracking-tighter' style={{ opacity: 0 }}>
            Ready to Deploy?
          </h2>
          <p className='text-muted-foreground text-lg' style={{ opacity: 0 }}>
            Join the automated revolution today. Experience seamless precision farming.
          </p>
          <div style={{ opacity: 0 }}>
            <Link href='/signup'>
              <Button className='mt-4 h-14 px-12 rounded-full bg-white text-black hover:bg-gray-200 font-bold tracking-wide text-lg'>
                Get Krushi Bot <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}