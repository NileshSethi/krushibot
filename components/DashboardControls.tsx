'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Power, CircleStop, TriangleAlert, Cpu, Activity, Wifi, Gamepad2, Gauge } from 'lucide-react'

const DashboardControls: React.FC = () => {
  const [speed, setSpeed] = useState([50])
  const [status, setStatus] = useState<'connected' | 'running' | 'stopped' | 'emergency'>('connected')
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleStart = () => setStatus('running')
  const handleStop = () => setStatus('stopped')
  const handleEmergency = () => setStatus('emergency')

  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = clientX - centerX
    const dy = clientY - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxRadius = rect.width / 2 - 20

    let targetX = dx
    let targetY = dy

    if (distance > maxRadius) {
      const angle = Math.atan2(dy, dx)
      targetX = Math.cos(angle) * maxRadius
      targetY = Math.sin(angle) * maxRadius
    }

    setJoystickPos({ x: targetX, y: targetY })
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    updateJoystick(e.clientX, e.clientY)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      updateJoystick(e.clientX, e.clientY)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    setJoystickPos({ x: 0, y: 0 })
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const getStatusBadge = () => {
    switch (status) {
      case 'running':
        return <Badge variant='outline' className='bg-emerald-500/10 text-emerald-400 border-emerald-500/20'>Running</Badge>
      case 'emergency':
        return <Badge variant='outline' className='bg-red-500/10 text-red-500 border-red-500/20'>Emergency Stop</Badge>
      case 'stopped':
        return <Badge variant='outline' className='bg-orange-500/10 text-orange-400 border-orange-500/20'>Stopped</Badge>
      default:
        return <Badge variant='outline' className='bg-blue-500/10 text-blue-400 border-blue-500/20'>Connected</Badge>
    }
  }

  return (
    <div className='flex flex-col gap-6 w-full animate-fade-in'>
      
      {/* 1. Status Overview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card className='glass-card p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-emerald-500/10'>
              <Activity className='w-5 h-5 text-emerald-400' />
            </div>
            <div>
              <p className='text-xs text-muted-foreground uppercase'>Status</p>
              <div className='mt-1'>{getStatusBadge()}</div>
            </div>
          </div>
        </Card>

        <Card className='glass-card p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-purple-500/10'>
              <Wifi className='w-5 h-5 text-purple-400' />
            </div>
            <div>
              <p className='text-xs text-muted-foreground uppercase'>Signal</p>
              <p className='text-lg font-bold text-white'>12ms</p>
            </div>
          </div>
        </Card>

        <Card className='glass-card p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-amber-500/10'>
              <Gauge className='w-5 h-5 text-amber-400' />
            </div>
            <div>
              <p className='text-xs text-muted-foreground uppercase'>Speed</p>
              <p className='text-lg font-bold text-white'>{speed}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* 2. Main Control Panel */}
        <Card className='lg:col-span-2 glass-card p-6 flex flex-col gap-6'>
          <div className='flex items-center gap-2 border-b border-white/5 pb-4'>
            <Cpu className='w-4 h-4 text-emerald-400' />
            <h2 className='text-sm font-medium uppercase tracking-wider text-white'>Command Center</h2>
          </div>
          
          <div className='grid md:grid-cols-1 gap-8'>
             {/* Power Controls */}
            <div className='space-y-4'>
              <h3 className='text-xs text-muted-foreground uppercase tracking-widest mb-2'>Power Operations</h3>
              <div className='flex flex-col gap-3'>
                <Button 
                  className={`w-full justify-start h-12 border border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all ${status === 'running' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : ''}`}
                  onClick={handleStart}
                >
                  <Power className='w-4 h-4 mr-3' /> Start System
                </Button>
                <Button 
                  className={`w-full justify-start h-12 border border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400 transition-all ${status === 'stopped' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : ''}`}
                  onClick={handleStop}
                >
                  <CircleStop className='w-4 h-4 mr-3' /> Halt Operations
                </Button>
                <Button 
                  className='w-full justify-start h-12 bg-red-600/80 hover:bg-red-600 text-white border-none mt-2'
                  onClick={handleEmergency}
                >
                  <TriangleAlert className='w-4 h-4 mr-3' /> EMERGENCY STOP
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* 3. Joystick */}
        <Card className='glass-card p-6 flex flex-col items-center justify-center min-h-[300px]'>
          <div className='flex items-center gap-2 mb-6 w-full'>
            <Gamepad2 className='w-4 h-4 text-emerald-400' />
            <h2 className='text-sm font-medium uppercase tracking-wider text-white'>Manual Override</h2>
          </div>
          
          <div 
            ref={joystickRef}
            className='relative w-48 h-48 rounded-full border-2 border-emerald-500/20 bg-black/40 shadow-inner flex items-center justify-center touch-none cursor-crosshair'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Crosshairs */}
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none opacity-20'>
              <div className='w-full h-[1px] bg-emerald-500' />
              <div className='h-full w-[1px] bg-emerald-500 absolute' />
            </div>

            {/* Stick */}
            <div 
              className='absolute w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-transform duration-75 ease-out cursor-grab active:cursor-grabbing border border-white/20'
              style={{
                transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
                boxShadow: isDragging.current ? '0 0 30px rgba(16,185,129,0.8)' : '0 0 15px rgba(16,185,129,0.3)'
              }}
            >
              <div className='absolute inset-2 rounded-full border border-white/30' />
            </div>
          </div>
          
          <p className='mt-6 text-[10px] text-muted-foreground uppercase tracking-widest'>
            {isDragging.current ? 'Engaged' : 'Idle'}
          </p>
        </Card>
      </div>
    </div>
  )
}

export default DashboardControls
