'use client'

import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-black text-emerald-500'>
      <div className='text-center space-y-4'>
        <Loader2 className='w-12 h-12 animate-spin mx-auto' />
        <p className='text-sm uppercase tracking-[0.2em] animate-pulse'>System Initializing...</p>
      </div>
    </div>
  )
}
