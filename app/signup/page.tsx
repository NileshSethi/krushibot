'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus, Mail, User, Lock } from 'lucide-react'
import StarBackground from '@/components/StarBackground'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    operator_id: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.status === 409 && data.message === 'USER_EXISTS') {
        router.push('/login')
        return
      }

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      // Auto-login the user and go straight to the dashboard
      sessionStorage.setItem('krushibot_user', JSON.stringify(formData.operator_id))
      router.push('/dashboard')

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative min-h-screen w-full flex items-center justify-center p-4 bg-black overflow-hidden'>
      <div className='absolute inset-0 z-0 pointer-events-none opacity-40'>
        <StarBackground />
      </div>

      <Card className='glass-card w-full max-w-md p-8 relative z-10 border-white/10'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4 ring-1 ring-blue-500/30'>
            <UserPlus className='w-8 h-8 text-blue-400' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>New Operator</h1>
          <p className='text-muted-foreground mt-2 text-sm'>Request access to KrushiBot network</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2 relative'>
            <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input 
              type='text' 
              placeholder='Operator ID' 
              className='pl-9 bg-black/50 border-white/10' 
              value={formData.operator_id}
              onChange={(e) => setFormData({...formData, operator_id: e.target.value})}
              required 
            />
          </div>

          <div className='space-y-2 relative'>
            <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input 
              type='email' 
              placeholder='Email Address' 
              className='pl-9 bg-black/50 border-white/10' 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>

          <div className='space-y-2 relative'>
            <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input 
              type='password' 
              placeholder='Password' 
              className='pl-9 bg-black/50 border-white/10' 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-500 text-white' disabled={loading}>
            {loading ? 'Registering...' : 'Submit Credentials'}
          </Button>
        </form>

        <div className='mt-6 border-t border-white/5 pt-4 text-center'>
          <p className='text-xs text-muted-foreground mb-3'>Already have clearance?</p>
          <Link href='/login' className='block w-full'>
            <Button variant="outline" className='w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300'>
              Go to Login Page
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}