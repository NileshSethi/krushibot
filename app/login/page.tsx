'use client'

import React, { useState, useEffect } from 'react'
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
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    operator_id: '',
    password: ''
  })

  // Check if user came from signup (email verified)
  useEffect(() => {
    const email = sessionStorage.getItem('verified_email')
    if (email) {
      setVerifiedEmail(email)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Email must have been verified first via signup page
    if (!verifiedEmail) {
      setError('You must verify your email first. Go to the signup page.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operator_id: formData.operator_id,
          password: formData.password,
          email: verifiedEmail // Pass the email that was verified in step 1
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // All 3 matched — session is created (JWT in HTTP-only cookie)
      sessionStorage.setItem('krushibot_user', JSON.stringify(formData.operator_id))
      sessionStorage.removeItem('verified_email') // Clean up

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
          {verifiedEmail && (
            <p className='text-emerald-400 mt-2 text-xs'>
              Email verified: {verifiedEmail}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {!verifiedEmail && (
          <div className="bg-amber-500/10 border border-amber-500/50 text-amber-400 p-3 rounded mb-4 text-sm text-center">
            You must verify your email first.{' '}
            <Link href="/signup" className="underline font-medium">Go to signup</Link>
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
            disabled={loading || !verifiedEmail}
          >
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
