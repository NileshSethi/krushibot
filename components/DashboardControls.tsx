'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Power, CircleStop, TriangleAlert, Cpu, Activity,
  Wifi, WifiOff, Gamepad2, Battery, BatteryLow,
  BatteryFull, Sprout, Droplets, Loader2,
} from 'lucide-react'

type SystemStatus = 'disconnected' | 'connected' | 'running' | 'stopped' | 'emergency'
type CommandKey =
  | 'start' | 'stop' | 'emergency_stop'
  | 'seeding_on'   | 'seeding_off'
  | 'ploughing_on' | 'ploughing_off'
  | 'irrigation_on'| 'irrigation_off'
  | 'joystick'

interface Esp32Health {
  online: boolean
  emergency?: boolean
  speed?: number
  battery_mv?: number
}

const DEADZONE      = 15
const MAX_R         = 76
const JOY_INTERVAL  = 50
const POLL_INTERVAL = 3000

async function sendCommand(command: CommandKey, extra?: { speed?: number; dir?: string }): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch('/api/robot/command', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify({ command, ...extra }),
    })
    const data = await res.json()
    return { ok: res.ok, message: data.message ?? 'unknown' }
  } catch (err: any) {
    return { ok: false, message: err.message ?? 'Network error' }
  }
}

async function fetchHealth(): Promise<Esp32Health> {
  try {
    const res = await fetch('/api/robot/status', { credentials: 'include' })
    if (!res.ok) return { online: false }
    return await res.json()
  } catch { return { online: false } }
}

function batteryPercent(mv: number | undefined): number | null {
  if (mv === undefined) return null
  return Math.max(0, Math.min(100, Math.round(((mv - 10500) / 2100) * 100)))
}

const DashboardControls: React.FC = () => {
  const [status,      setStatus]      = useState<SystemStatus>('disconnected')
  const [health,      setHealth]      = useState<Esp32Health>({ online: false })
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 })
  const joystickRef = useRef<HTMLDivElement>(null)
  const isDragging  = useRef(false)

  const [seedingOn,    setSeedingOn]    = useState(false)
  const [ploughingOn,  setPloughingOn]  = useState(false)
  const [irrigationOn, setIrrigationOn] = useState(false)

  const [loading,  setLoading]  = useState<Record<string, boolean>>({})
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null)

  const joystickInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastJoyPayload   = useRef<{ speed: number; dir: string } | null>(null)
  const emergencyRef     = useRef(false)
  const tabVisibleRef    = useRef(true)

  // FIX 1+5 - health polling
  useEffect(() => {
    const poll = async () => {
      const h = await fetchHealth()
      setHealth(h)
      if (h.emergency) {
        emergencyRef.current = true
        setStatus('emergency')
        setSeedingOn(false); setPloughingOn(false); setIrrigationOn(false)
      }
      if (!h.online) setStatus(s => s === 'running' || s === 'connected' ? 'disconnected' : s)
      else setStatus(s => s === 'disconnected' ? 'connected' : s)
    }
    poll()
    const id = setInterval(poll, POLL_INTERVAL)
    return () => clearInterval(id)
  }, [])

  // FIX 2 - stop joystick when tab hidden
  useEffect(() => {
    const onVis = () => {
      tabVisibleRef.current = document.visibilityState === 'visible'
      if (!tabVisibleRef.current) {
        stopJoystickLoop()
        if (!emergencyRef.current) sendCommand('joystick', { speed: 0, dir: 'stop' })
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const withLoading = useCallback(async (key: string, fn: () => Promise<void>) => {
    setLoading(prev => ({ ...prev, [key]: true }))
    setFeedback(null)
    try { await fn() } finally { setLoading(prev => ({ ...prev, [key]: false })) }
  }, [])

  const showFeedback = (msg: string, ok: boolean) => {
    setFeedback({ msg, ok })
    setTimeout(() => setFeedback(null), 3000)
  }

  const handleStart = () => withLoading('start', async () => {
    if (!health.online) { showFeedback('ESP32 is offline — cannot start', false); return }
    const { ok, message } = await sendCommand('start')
    if (ok) { setStatus('running'); emergencyRef.current = false }
    showFeedback(ok ? 'System started — motors enabled' : message, ok)
  })

  const handleStop = () => withLoading('stop', async () => {
    stopJoystickLoop()
    const { ok, message } = await sendCommand('stop')
    if (ok) setStatus('stopped')
    showFeedback(ok ? 'Halted — task paused' : message, ok)
  })

  const handleEmergency = () => withLoading('emergency', async () => {
    stopJoystickLoop()
    emergencyRef.current = true
    sendCommand('emergency_stop')
    setStatus('emergency')
    setSeedingOn(false); setPloughingOn(false); setIrrigationOn(false)
    showFeedback('EMERGENCY STOP — all GPIO cut to LOW', true)
  })

  const toggleSeeding = () => withLoading('seeding', async () => {
    if (!health.online) { showFeedback('ESP32 offline', false); return }
    const next = !seedingOn
    const { ok, message } = await sendCommand(next ? 'seeding_on' : 'seeding_off')
    if (ok) setSeedingOn(next)
    showFeedback(ok ? `Seeding servo ${next ? 'open (2000µs)' : 'neutral (1500µs)'}` : message, ok)
  })

  const togglePloughing = () => withLoading('ploughing', async () => {
    if (!health.online) { showFeedback('ESP32 offline', false); return }
    const next = !ploughingOn
    const { ok, message } = await sendCommand(next ? 'ploughing_on' : 'ploughing_off')
    if (ok) setPloughingOn(next)
    showFeedback(ok ? `Plough relay ${next ? 'ON' : 'OFF'}` : message, ok)
  })

  const toggleIrrigation = () => withLoading('irrigation', async () => {
    if (!health.online) { showFeedback('ESP32 offline', false); return }
    const next = !irrigationOn
    const { ok, message } = await sendCommand(next ? 'irrigation_on' : 'irrigation_off')
    if (ok) setIrrigationOn(next)
    showFeedback(ok ? `Pump relay ${next ? 'ON' : 'OFF'}` : message, ok)
  })

  const startJoystickLoop = useCallback(() => {
    if (joystickInterval.current) return
    joystickInterval.current = setInterval(async () => {
      if (emergencyRef.current || !tabVisibleRef.current) return
      const payload = lastJoyPayload.current
      if (!payload) return
      await sendCommand('joystick', payload)
    }, JOY_INTERVAL)
  }, [])

  const stopJoystickLoop = useCallback(() => {
    if (joystickInterval.current) { clearInterval(joystickInterval.current); joystickInterval.current = null }
    lastJoyPayload.current = null
  }, [])

  useEffect(() => {
    const { y } = joystickPos
    const absY  = Math.abs(y)
    if (absY < DEADZONE) { lastJoyPayload.current = { speed: 0, dir: 'stop' }; return }
    const speed = Math.min(255, Math.max(0, Math.round(((absY - DEADZONE) / (MAX_R - DEADZONE)) * 255)))
    lastJoyPayload.current = { speed, dir: y < 0 ? 'forward' : 'backward' }
  }, [joystickPos])

  const updateJoystick = (cx: number, cy: number) => {
    if (!joystickRef.current) return
    const rect  = joystickRef.current.getBoundingClientRect()
    const dx    = cx - (rect.left + rect.width  / 2)
    const dy    = cy - (rect.top  + rect.height / 2)
    const dist  = Math.sqrt(dx * dx + dy * dy)
    const scale = dist > MAX_R ? MAX_R / dist : 1
    setJoystickPos({ x: dx * scale, y: dy * scale })
  }

  const isBlocked = !health.online || status === 'emergency'

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isBlocked) return
    isDragging.current = true
    updateJoystick(e.clientX, e.clientY)
    e.currentTarget.setPointerCapture(e.pointerId)
    startJoystickLoop()
  }
  const handlePointerMove = (e: React.PointerEvent) => { if (isDragging.current) updateJoystick(e.clientX, e.clientY) }
  const handlePointerUp   = (e: React.PointerEvent) => {
    isDragging.current = false
    setJoystickPos({ x: 0, y: 0 })
    e.currentTarget.releasePointerCapture(e.pointerId)
    stopJoystickLoop()
    if (!emergencyRef.current) sendCommand('joystick', { speed: 0, dir: 'stop' })
  }
  useEffect(() => () => { stopJoystickLoop() }, [stopJoystickLoop])

  const { x, y } = joystickPos
  const isMoving  = isDragging.current && Math.abs(y) >= DEADZONE
  const joyLabel  = isMoving ? (y < 0 ? 'Forward' : 'Backward') : 'Idle'
  const joySpeed  = isMoving ? Math.round(((Math.abs(y) - DEADZONE) / (MAX_R - DEADZONE)) * 100) : 0
  const battPct   = batteryPercent(health.battery_mv)
  const battLabel = battPct !== null ? `${battPct}%` : '--'
  const BattIcon  = battPct !== null && battPct < 20 ? BatteryLow : battPct !== null && battPct > 80 ? BatteryFull : Battery

  const statusBadge: Record<SystemStatus, React.ReactNode> = {
    running:     <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Running</Badge>,
    emergency:   <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Emergency Stop</Badge>,
    stopped:     <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">Stopped</Badge>,
    connected:   <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Connected</Badge>,
    disconnected:<Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-400" />Offline</Badge>,
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {feedback && (
        <div className={`text-center text-sm py-2 px-4 rounded border transition-all ${feedback.ok ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
          {feedback.ok ? '✓' : '✗'} {feedback.msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-4 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${health.online ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
            {health.online ? <Wifi className="w-5 h-5 text-emerald-400"/> : <WifiOff className="w-5 h-5 text-red-400"/>}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">ESP32</p>
            {health.online
              ? <span className="text-emerald-400 text-sm font-mono">Online · {health.speed ?? 0} PWM</span>
              : <span className="text-red-400 text-sm">Offline — check WiFi</span>}
          </div>
        </Card>

        <Card className="glass-card p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><Activity className="w-5 h-5 text-purple-400"/></div>
          <div><p className="text-xs text-muted-foreground uppercase">Status</p><div className="mt-1">{statusBadge[status]}</div></div>
        </Card>

        <Card className="glass-card p-4 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${battPct !== null && battPct < 20 ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
            <BattIcon className={`w-5 h-5 ${battPct !== null && battPct < 20 ? 'text-red-400' : 'text-amber-400'}`}/>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Battery</p>
            <p className={`text-lg font-bold ${battPct !== null && battPct < 20 ? 'text-red-400' : 'text-white'}`}>
              {battLabel}{battPct !== null && battPct < 20 && <span className="text-xs ml-2">LOW</span>}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-card p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            <Cpu className="w-4 h-4 text-emerald-400"/>
            <h2 className="text-sm font-medium uppercase tracking-wider text-white">Command Center</h2>
            <span className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded ${health.online ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
              {health.online ? 'ESP32 ONLINE' : 'ESP32 OFFLINE'}
            </span>
          </div>

          {!health.online && (
            <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 text-sm text-red-400">
              ESP32 is not reachable — all controls disabled. Check power and WiFi.
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">Power Operations</h3>
            <Button onClick={handleStart} disabled={loading.start || isBlocked}
              className={`w-full justify-start h-12 border border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all ${status === 'running' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : ''}`}>
              {loading.start ? <Loader2 className="w-4 h-4 mr-3 animate-spin"/> : <Power className="w-4 h-4 mr-3"/>}
              Start System <span className="ml-auto text-xs opacity-40 font-mono">ENA→HIGH</span>
            </Button>
            <Button onClick={handleStop} disabled={loading.stop || status === 'emergency'}
              className={`w-full justify-start h-12 border border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400 transition-all ${status === 'stopped' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : ''}`}>
              {loading.stop ? <Loader2 className="w-4 h-4 mr-3 animate-spin"/> : <CircleStop className="w-4 h-4 mr-3"/>}
              Halt Operations <span className="ml-auto text-xs opacity-40 font-mono">PWM→0</span>
            </Button>
            <Button onClick={handleEmergency} disabled={loading.emergency}
              className="w-full justify-start h-12 bg-red-600/80 hover:bg-red-600 text-white border-none mt-2">
              {loading.emergency ? <Loader2 className="w-4 h-4 mr-3 animate-spin"/> : <TriangleAlert className="w-4 h-4 mr-3"/>}
              EMERGENCY STOP <span className="ml-auto text-xs opacity-70 font-mono">all GPIO→LOW</span>
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs text-muted-foreground uppercase tracking-widest">Implements</h3>
            <div className="flex flex-wrap gap-8">
              {[
                { key: 'seeding',    on: seedingOn,    toggle: toggleSeeding,    icon: <Sprout className={`w-7 h-7 mx-auto ${seedingOn ? 'text-white' : 'text-emerald-300'}`}/>,    label: 'Seeding',    pin: 'GPIO 18 · servo',   activeClass: 'bg-emerald-500/80 border-emerald-300', idleClass: 'border-emerald-500/30' },
                { key: 'ploughing',  on: ploughingOn,  toggle: togglePloughing,  icon: <svg viewBox="0 0 24 24" fill="none" className={`w-7 h-7 mx-auto ${ploughingOn ? 'text-white' : 'text-yellow-300'}`} stroke="currentColor" strokeWidth="2"><path d="M3 20h18M6 20V12l3-8h6l3 8v8M10 20v-5h4v5"/></svg>, label: 'Ploughing',  pin: 'GPIO 26 · relay',   activeClass: 'bg-yellow-500/80 border-yellow-300',  idleClass: 'border-yellow-500/30' },
                { key: 'irrigation', on: irrigationOn, toggle: toggleIrrigation, icon: <Droplets className={`w-7 h-7 mx-auto ${irrigationOn ? 'text-white' : 'text-blue-300'}`}/>,   label: 'Irrigation', pin: 'GPIO 27 · pump',    activeClass: 'bg-blue-500/80 border-blue-200',      idleClass: 'border-blue-500/30'   },
              ].map(({ key, on, toggle, icon, label, pin, activeClass, idleClass }) => (
                <div key={key} className="flex flex-col items-center gap-2">
                  <button type="button" onClick={toggle} disabled={(loading as any)[key] || isBlocked}
                    className={`w-16 h-16 rounded-full border transition-all duration-200 shadow-lg disabled:opacity-40 ${on ? activeClass : `bg-black/40 ${idleClass} hover:opacity-80`}`}>
                    {(loading as any)[key] ? <Loader2 className="w-7 h-7 mx-auto animate-spin text-white/60"/> : icon}
                  </button>
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-[10px] text-muted-foreground/50 font-mono">{pin}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-2 mb-1 w-full">
            <Gamepad2 className="w-4 h-4 text-emerald-400"/>
            <h2 className="text-sm font-medium uppercase tracking-wider text-white">Joystick</h2>
          </div>
          <p className="text-[10px] text-muted-foreground/50 mb-4 w-full font-mono">Y-axis → L298N · {JOY_INTERVAL}ms · tab-aware</p>

          <div ref={joystickRef}
            className={`relative w-48 h-48 rounded-full border-2 flex items-center justify-center touch-none select-none ${isBlocked ? 'border-red-500/20 cursor-not-allowed opacity-40' : 'border-emerald-500/20 bg-black/40 shadow-inner cursor-crosshair'}`}
            onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
              <div className="w-full h-[1px] bg-emerald-500"/><div className="h-full w-[1px] bg-emerald-500 absolute"/>
            </div>
            <span className="absolute top-3 text-[9px] text-emerald-400/60 uppercase tracking-widest pointer-events-none">Fwd</span>
            <span className="absolute bottom-3 text-[9px] text-orange-400/60 uppercase tracking-widest pointer-events-none">Back</span>
            <div className={`absolute w-16 h-16 rounded-full border border-white/20 transition-transform duration-75 ease-out ${joyLabel === 'Forward' ? 'bg-gradient-to-br from-emerald-400 to-emerald-700' : joyLabel === 'Backward' ? 'bg-gradient-to-br from-orange-400 to-orange-700' : 'bg-gradient-to-br from-emerald-500 to-emerald-700'}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}>
              <div className="absolute inset-2 rounded-full border border-white/30"/>
            </div>
          </div>

          <div className="mt-4 w-full text-center space-y-1">
            <p className={`text-sm font-mono font-medium ${joyLabel === 'Forward' ? 'text-emerald-400' : joyLabel === 'Backward' ? 'text-orange-400' : 'text-muted-foreground'}`}>
              {joyLabel}{isMoving ? ` · ${joySpeed}%` : ''}
            </p>
            <p className="text-[10px] text-muted-foreground/50">
              {isBlocked ? (status === 'emergency' ? 'emergency active' : 'ESP32 offline') : 'drag to drive · release stops motor'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardControls
