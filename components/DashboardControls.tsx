'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Power, CircleStop, TriangleAlert, Cpu, Activity,
  Wifi, Gamepad2, Battery, Sprout, Droplets, Loader2,
} from 'lucide-react'

// ─── types ────────────────────────────────────────────────────────────────────

type SystemStatus = 'disconnected' | 'connected' | 'running' | 'stopped' | 'emergency'
type CommandKey =
  | 'start' | 'stop' | 'emergency_stop'
  | 'seeding_on' | 'seeding_off'
  | 'ploughing_on' | 'ploughing_off'
  | 'irrigation_on' | 'irrigation_off'

// ─── helpers ──────────────────────────────────────────────────────────────────

async function sendCommand(command: CommandKey, value?: number): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch('/api/robot/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ command, value }),
    })
    const data = await res.json()
    return { ok: res.ok, message: data.message ?? 'Unknown response' }
  } catch (err: any) {
    return { ok: false, message: err.message ?? 'Network error' }
  }
}

// ─── component ────────────────────────────────────────────────────────────────

const DashboardControls: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>('disconnected')
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  // implement state — true means the physical output is currently ON
  const [seedingOn, setSeedingOn] = useState(false)
  const [ploughingOn, setPloughingOn] = useState(false)
  const [irrigationOn, setIrrigationOn] = useState(false)

  // per-button loading and feedback
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [feedback, setFeedback] = useState<string | null>(null)

  const withLoading = useCallback(
    async (key: string, fn: () => Promise<void>) => {
      setLoading(prev => ({ ...prev, [key]: true }))
      setFeedback(null)
      try {
        await fn()
      } finally {
        setLoading(prev => ({ ...prev, [key]: false }))
      }
    },
    [],
  )

  const showFeedback = (msg: string, ok: boolean) => {
    setFeedback(ok ? `✓ ${msg}` : `✗ ${msg}`)
    setTimeout(() => setFeedback(null), 3000)
  }

  // ── START ────────────────────────────────────────────────────────────────────
  // Sends power-on command → Pi enables motor driver enable pins
  // and resumes the last task stored in the Pi's task queue
  const handleStart = () =>
    withLoading('start', async () => {
      const { ok, message } = await sendCommand('start')
      if (ok) setStatus('running')
      showFeedback(ok ? 'System started' : message, ok)
    })

  // ── STOP ─────────────────────────────────────────────────────────────────────
  // Sends stop command → Pi disables motor PWM signals, pauses task
  // (task state is preserved so start can resume it)
  const handleStop = () =>
    withLoading('stop', async () => {
      const { ok, message } = await sendCommand('stop')
      if (ok) setStatus('stopped')
      showFeedback(ok ? 'System halted' : message, ok)
    })

  // ── EMERGENCY STOP ───────────────────────────────────────────────────────────
  // Kills all GPIO outputs immediately — motors, servo, pump all cut to 0
  // Pi sets a hard-stop flag that blocks any new commands until cleared
  const handleEmergency = () =>
    withLoading('emergency', async () => {
      // Fire-and-forget is intentional — don't wait for Pi to confirm
      sendCommand('emergency_stop')
      setStatus('emergency')
      setSeedingOn(false)
      setPloughingOn(false)
      setIrrigationOn(false)
      showFeedback('EMERGENCY STOP triggered', true)
    })

  // ── SEEDING / SERVO ──────────────────────────────────────────────────────────
  // Toggles the servo connected to GPIO 17 (BCM) on the Pi
  // Pi duty-cycle: 7.5% = neutral position, 12% = open dispenser
  const toggleSeeding = () =>
    withLoading('seeding', async () => {
      const next = !seedingOn
      const cmd: CommandKey = next ? 'seeding_on' : 'seeding_off'
      const { ok, message } = await sendCommand(cmd)
      if (ok) setSeedingOn(next)
      showFeedback(ok ? `Seeding ${next ? 'ON' : 'OFF'}` : message, ok)
    })

  // ── PLOUGHING ────────────────────────────────────────────────────────────────
  // Engages the plough motor relay on GPIO 27 (BCM)
  // The Pi's plough handler runs a duty-cycle ramp to avoid current spike
  const togglePloughing = () =>
    withLoading('ploughing', async () => {
      const next = !ploughingOn
      const cmd: CommandKey = next ? 'ploughing_on' : 'ploughing_off'
      const { ok, message } = await sendCommand(cmd)
      if (ok) setPloughingOn(next)
      showFeedback(ok ? `Ploughing ${next ? 'ON' : 'OFF'}` : message, ok)
    })

  // ── IRRIGATION / PUMP ────────────────────────────────────────────────────────
  // Triggers the pump relay on GPIO 22 (BCM)
  const toggleIrrigation = () =>
    withLoading('irrigation', async () => {
      const next = !irrigationOn
      const cmd: CommandKey = next ? 'irrigation_on' : 'irrigation_off'
      const { ok, message } = await sendCommand(cmd)
      if (ok) setIrrigationOn(next)
      showFeedback(ok ? `Irrigation ${next ? 'ON' : 'OFF'}` : message, ok)
    })

  // ── JOYSTICK ──────────────────────────────────────────────────────────────────
  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return
    const rect = joystickRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = clientX - cx
    const dy = clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const maxR = rect.width / 2 - 20
    const scale = dist > maxR ? maxR / dist : 1
    setJoystickPos({ x: dx * scale, y: dy * scale })
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    updateJoystick(e.clientX, e.clientY)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) updateJoystick(e.clientX, e.clientY)
  }
  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false
    setJoystickPos({ x: 0, y: 0 })
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  // ── STATUS BADGE ─────────────────────────────────────────────────────────────
  const statusBadge = {
    running:     <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Running</Badge>,
    emergency:   <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Emergency Stop</Badge>,
    stopped:     <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">Stopped</Badge>,
    connected:   <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Connected</Badge>,
    disconnected: (
      <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
        Not Connected
      </Badge>
    ),
  }[status]

  // ── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">

      {/* Feedback toast */}
      {feedback && (
        <div className={`text-center text-sm py-2 px-4 rounded border ${
          feedback.startsWith('✓')
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {feedback}
        </div>
      )}

      {/* Status overview row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 shadow-[0_0_12px_rgba(248,113,113,0.35)]">
            <Activity className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Status</p>
            <div className="mt-1">{statusBadge}</div>
          </div>
        </Card>

        <Card className="glass-card p-4 flex items-center gap-3 opacity-60">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Wifi className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Signal</p>
            <p className="text-lg font-bold text-muted-foreground">--</p>
          </div>
        </Card>

        <Card className="glass-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <Battery className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Battery</p>
            <p className="text-lg font-bold text-white">--%</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main control panel */}
        <Card className="lg:col-span-2 glass-card p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-white">Command Center</h2>
          </div>

          {/* Power operations */}
          <div className="space-y-3">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">Power Operations</h3>

            {/* START — resumes task, enables motor driver */}
            <Button
              onClick={handleStart}
              disabled={loading.start || status === 'emergency'}
              className={`w-full justify-start h-12 border border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all ${
                status === 'running' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : ''
              }`}
            >
              {loading.start
                ? <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                : <Power className="w-4 h-4 mr-3" />
              }
              Start System
              <span className="ml-auto text-xs opacity-50">GPIO EN pin → HIGH</span>
            </Button>

            {/* STOP — pauses task, PWM → 0 */}
            <Button
              onClick={handleStop}
              disabled={loading.stop || status === 'emergency'}
              className={`w-full justify-start h-12 border border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400 transition-all ${
                status === 'stopped' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : ''
              }`}
            >
              {loading.stop
                ? <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                : <CircleStop className="w-4 h-4 mr-3" />
              }
              Halt Operations
              <span className="ml-auto text-xs opacity-50">PWM → 0, task paused</span>
            </Button>

            {/* EMERGENCY STOP — all GPIO cut immediately */}
            <Button
              onClick={handleEmergency}
              disabled={loading.emergency}
              className="w-full justify-start h-12 bg-red-600/80 hover:bg-red-600 text-white border-none mt-2"
            >
              {loading.emergency
                ? <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                : <TriangleAlert className="w-4 h-4 mr-3" />
              }
              EMERGENCY STOP
              <span className="ml-auto text-xs opacity-70">All GPIO → LOW</span>
            </Button>
          </div>

          {/* Implements */}
          <div className="space-y-3">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">Implements</h3>
            <div className="flex flex-wrap gap-8">

              {/* SEEDING — servo on GPIO 17 */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSeeding}
                  disabled={loading.seeding || status === 'emergency'}
                  className={`w-16 h-16 rounded-full border transition-all duration-200 shadow-lg disabled:opacity-40 ${
                    seedingOn
                      ? 'bg-emerald-500/80 border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.7)]'
                      : 'bg-black/40 border-emerald-500/30 hover:shadow-[0_0_18px_rgba(16,185,129,0.55)]'
                  }`}
                >
                  {loading.seeding
                    ? <Loader2 className="w-7 h-7 mx-auto animate-spin text-emerald-300" />
                    : <Sprout className={`w-7 h-7 mx-auto ${seedingOn ? 'text-white' : 'text-emerald-300'}`} />
                  }
                </button>
                <span className="text-xs text-muted-foreground text-center">Seeding</span>
                <span className="text-[10px] text-muted-foreground/60">GPIO 17 · Servo</span>
              </div>

              {/* PLOUGHING — relay on GPIO 27 */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={togglePloughing}
                  disabled={loading.ploughing || status === 'emergency'}
                  className={`w-16 h-16 rounded-full border transition-all duration-200 shadow-lg disabled:opacity-40 ${
                    ploughingOn
                      ? 'bg-yellow-500/80 border-yellow-300 shadow-[0_0_25px_rgba(234,179,8,0.7)]'
                      : 'bg-black/40 border-yellow-500/30 hover:shadow-[0_0_18px_rgba(234,179,8,0.55)]'
                  }`}
                >
                  {loading.ploughing
                    ? <Loader2 className="w-7 h-7 mx-auto animate-spin text-yellow-300" />
                    : (
                      <svg viewBox="0 0 24 24" fill="none" className={`w-7 h-7 mx-auto ${ploughingOn ? 'text-white' : 'text-yellow-300'}`} stroke="currentColor" strokeWidth="2">
                        <path d="M3 20h18M5 20V10l4-6h6l4 6v10M9 20v-5h6v5"/>
                      </svg>
                    )
                  }
                </button>
                <span className="text-xs text-muted-foreground text-center">Ploughing</span>
                <span className="text-[10px] text-muted-foreground/60">GPIO 27 · Relay</span>
              </div>

              {/* IRRIGATION / PUMP — relay on GPIO 22 */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={toggleIrrigation}
                  disabled={loading.irrigation || status === 'emergency'}
                  className={`w-16 h-16 rounded-full border transition-all duration-200 shadow-lg disabled:opacity-40 ${
                    irrigationOn
                      ? 'bg-blue-500/80 border-blue-200 shadow-[0_0_25px_rgba(59,130,246,0.65)]'
                      : 'bg-black/40 border-blue-500/30 hover:shadow-[0_0_18px_rgba(59,130,246,0.55)]'
                  }`}
                >
                  {loading.irrigation
                    ? <Loader2 className="w-7 h-7 mx-auto animate-spin text-blue-300" />
                    : <Droplets className={`w-7 h-7 mx-auto ${irrigationOn ? 'text-white' : 'text-blue-300'}`} />
                  }
                </button>
                <span className="text-xs text-muted-foreground text-center">Irrigation</span>
                <span className="text-[10px] text-muted-foreground/60">GPIO 22 · Pump relay</span>
              </div>

            </div>
          </div>
        </Card>

        {/* Joystick */}
        <Card className="glass-card p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 mb-6 w-full">
            <Gamepad2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-white">Manual Override</h2>
          </div>

          <div
            ref={joystickRef}
            className="relative w-48 h-48 rounded-full border-2 border-emerald-500/20 bg-black/40 shadow-inner flex items-center justify-center touch-none cursor-crosshair"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-full h-[1px] bg-emerald-500" />
              <div className="h-full w-[1px] bg-emerald-500 absolute" />
            </div>
            <div
              className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-transform duration-75 ease-out cursor-grab active:cursor-grabbing border border-white/20"
              style={{ transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)` }}
            >
              <div className="absolute inset-2 rounded-full border border-white/30" />
            </div>
          </div>

          <p className="mt-6 text-[10px] text-muted-foreground uppercase tracking-widest">
            {isDragging.current ? 'Engaged' : 'Idle'}
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground/50 text-center">
            WebSocket joystick relay — coming soon
          </p>
        </Card>
      </div>
    </div>
  )
}

export default DashboardControls
