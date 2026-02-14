'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShieldCheck, User, Lock } from 'lucide-react'
import StarBackground from '@/components/StarBackground'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Store mock user
      localStorage.setItem('krushibot_user', JSON.stringify(formData.username))
      setLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center p-4 bg-black overflow-hidden'>
      <div className='absolute inset-0 z-0 pointer-events-none opacity-40'>
        <StarBackground />
      </div>

      <Card className='glass-card w-full max-w-md p-8 relative z-10 border-white/10'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4 ring-1 ring-emerald-500/30'>
            <ShieldCheck className='w-8 h-8 text-emerald-400' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>Access Control</h1>
          <p className='text-muted-foreground mt-2 text-sm'>Authenticate to access control systems</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <div className='relative'>
              <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input 
                placeholder='Operator ID' 
                className='pl-9 bg-black/50 border-white/10 h-10'
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
          </div>
          <div className='space-y-2'>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input 
                type='password' 
                placeholder='Passcode' 
                className='pl-9 bg-black/50 border-white/10 h-10'
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>
          
          <Button type='submit' className='w-full bg-white text-black hover:bg-gray-200' disabled={loading}>
            {loading ? 'Authenticating...' : 'Initialize Session'}
          </Button>
        </form>

        <div className='mt-6 text-center text-xs text-muted-foreground'>
          Protected by military-grade encryption protocols
        </div>
      </Card>
    </div>
  )
}
