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
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    operator_id: '',
    password: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          operator_id: formData.operator_id,
          password: formData.password
        })
      })

      const data = await res.json()

      if (res.status === 404 && data.message === 'USER_NOT_FOUND') {
        router.push('/signup')
        return
      } else if (res.status === 401 && data.message === 'INVALID_PASSWORD') {
        throw new Error('Invalid password.')
      } else if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      sessionStorage.setItem('krushibot_user', JSON.stringify(formData.operator_id))
      // Force immediate redirect to dashboard
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

      <Card className='glass-card w-full max-w-md p-8 relative z-10 border-white/10 bg-black/50 backdrop-blur-md'>
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4 ring-1 ring-emerald-500/30'>
            <ShieldCheck className='w-8 h-8 text-emerald-400' />
          </div>
          <h1 className='text-2xl font-bold tracking-tight text-white'>Access Control</h1>
          <p className='text-muted-foreground mt-2 text-sm text-gray-400'>
            Authenticate to access control systems
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className='space-y-4'>
          <div className='space-y-2'>
            <div className='relative'>
              <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Operator ID'
                className='pl-9 bg-black/50 border-white/10 h-10 text-white placeholder:text-gray-500'
                value={formData.operator_id}
                onChange={(e) => setFormData({ ...formData, operator_id: e.target.value })}
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
                className='pl-9 bg-black/50 border-white/10 h-10 text-white placeholder:text-gray-500'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <Button
            type='submit'
            className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Initialize Session'}
          </Button>
        </form>

        <div className='mt-6 border-t border-white/5 pt-4 text-center'>
          <p className='text-xs text-muted-foreground mb-3'>Protected by military-grade encryption protocols</p>
          <p className='text-xs text-muted-foreground mb-3'>New operator?</p>
          <Link href='/signup' className='block w-full'>
            <Button variant="outline" className='w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'>
              Go to Signup Page
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
