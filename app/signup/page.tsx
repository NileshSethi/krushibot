'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus, User, Lock, Mail } from 'lucide-react'
import StarBackground from '@/components/StarBackground'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      // For demo, just redirect to login or dashboard
      router.push('/login')
    }, 1000)
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

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Input placeholder='First Name' className='bg-black/50 border-white/10' required />
            </div>
            <div className='space-y-2'>
              <Input placeholder='Last Name' className='bg-black/50 border-white/10' required />
            </div>
          </div>
          
          <div className='space-y-2 relative'>
            <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input type='email' placeholder='Email Address' className='pl-9 bg-black/50 border-white/10' required />
          </div>

          <div className='space-y-2 relative'>
            <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input type='password' placeholder='Create Password' className='pl-9 bg-black/50 border-white/10' required />
          </div>
          
          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-500 text-white' disabled={loading}>
            {loading ? 'Processing...' : 'Submit Credentials'}
          </Button>
        </form>

        <div className='mt-6 text-center text-xs text-muted-foreground'>
          Already have clearance? <Link href='/login' className='text-blue-400 hover:underline'>Login here</Link>
        </div>
      </Card>
    </div>
  )
}
