"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Power, CircleStop, TriangleAlert, Cpu, Activity, Wifi } from "lucide-react";

const DashboardControls: React.FC = () => {
  const [speed, setSpeed] = useState([50]);
  const [status, setStatus] = useState<"connected" | "running" | "stopped" | "emergency">("connected");
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleStart = () => setStatus("running");
  const handleStop = () => setStatus("stopped");
  const handleEmergency = () => setStatus("emergency");

  const updateJoystick = (clientX: number, clientY: number) => {
    if (!joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = rect.width / 2 - 20;

    let targetX = dx;
    let targetY = dy;

    if (distance > maxRadius) {
      const angle = Math.atan2(dy, dx);
      targetX = Math.cos(angle) * maxRadius;
      targetY = Math.sin(angle) * maxRadius;
    }

    setJoystickPos({ x: targetX, y: targetY });
    
    // Normalized values
    const nx = (targetX / maxRadius).toFixed(2);
    const ny = (targetY / maxRadius).toFixed(2);
    // console.log(`Joystick: X: ${nx}, Y: ${ny}`);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updateJoystick(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (isDragging.current) {
      updateJoystick(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    setJoystickPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const getStatusBadge = () => {
    switch (status) {
      case "running":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Running</Badge>;
      case "emergency":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Emergency Stop</Badge>;
      case "stopped":
        return <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/20">Stopped</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Connected</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-4 z-10 relative">
      {/* Robot Status Card */}
      <Card className="glass-card p-6 flex flex-col gap-4 animate-fade-in [animation-delay:200ms]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> System Status
          </h2>
          {getStatusBadge()}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Battery</span>
            <span className="text-xl font-semibold">84%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Uptime</span>
            <span className="text-xl font-semibold">12h 45m</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <Wifi className="w-3 h-3 text-emerald-400" />
          Latency: 12ms
        </div>
      </Card>

      {/* Control Panel Card */}
      <Card className="glass-card p-6 flex flex-col gap-6 animate-fade-in [animation-delay:400ms]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-white" />
          <h2 className="text-sm font-medium uppercase tracking-wider">Control Panel</h2>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground uppercase">Speed Override</span>
              <span>{speed}%</span>
            </div>
            <Slider 
              value={speed} 
              onValueChange={setSpeed} 
              max={100} 
              step={1}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <Button 
              variant="outline" 
              className={`border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all ${status === 'running' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : ''}`}
              onClick={handleStart}
            >
              <Power className="w-4 h-4 mr-2" /> Start
            </Button>
            <Button 
              variant="outline" 
              className={`border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-400 transition-all ${status === 'stopped' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : ''}`}
              onClick={handleStop}
            >
              <CircleStop className="w-4 h-4 mr-2" /> Stop
            </Button>
            <Button 
              variant="destructive" 
              className="col-span-2 bg-red-600/80 hover:bg-red-600 text-white border-none"
              onClick={handleEmergency}
            >
              <TriangleAlert className="w-4 h-4 mr-2" /> EMERGENCY STOP
            </Button>
          </div>
        </div>
      </Card>

      {/* Movement Control Card */}
      <Card className="glass-card p-6 flex flex-col gap-4 items-center justify-center animate-fade-in [animation-delay:600ms]">
        <h2 className="text-sm font-medium uppercase tracking-wider self-start">Movement</h2>
        <div 
          ref={joystickRef}
          className="relative w-48 h-48 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
        >
          {/* Grid lines for joystick */}
          <div className="absolute w-full h-[1px] bg-white/5" />
          <div className="absolute h-full w-[1px] bg-white/5" />
          
          <div 
            className="absolute w-16 h-16 rounded-full bg-white/10 border border-white/20 shadow-xl flex items-center justify-center transition-transform duration-75"
            style={{ 
              transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white/20" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardControls;
