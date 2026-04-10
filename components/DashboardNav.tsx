'use client'

import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';
import { Button } from './ui/button';
import { User, LogOut, Menu, X, LayoutDashboard, Database, Box, Settings, ShoppingCart } from 'lucide-react';

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className='fixed top-6 right-6 z-50 flex items-center gap-4'>
        {user && (
          <div className='hidden md:flex items-center gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500'>
            <div className='w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'>
              <User className='w-4 h-4 text-emerald-400' />
            </div>
            <span className='text-sm font-medium text-emerald-50'>Welcome, {user}</span>
          </div>
        )}

        <Button 
          variant='ghost' 
          size='icon' 
          className='rounded-full h-12 w-12 border border-white/10 bg-black/60 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all shadow-lg'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
        </Button>
      </nav>

      {isOpen && (
        <div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200' onClick={() => setIsOpen(false)}>
           <div 
             className='absolute right-6 top-24 w-72 bg-black/90 border border-white/10 rounded-2xl p-2 shadow-2xl animate-in zoom-in-95 slide-in-from-top-4 duration-300'
             onClick={(e) => e.stopPropagation()}
           >
            <div className='space-y-1'>
              <div className='px-4 py-3 border-b border-white/5 mb-2'>
                <h3 className='text-sm font-semibold text-white'>Menu</h3>
                <p className='text-xs text-muted-foreground uppercase tracking-wider mt-1'>Information</p>
              </div>

              <Link href='/' onClick={() => setIsOpen(false)}>
                <Button variant='ghost' className='w-full justify-start h-12 text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl'>
                  <LayoutDashboard className='w-4 h-4 mr-3' /> Home
                </Button>
              </Link>

              <a
                href='/dashboard#use-cases'
                onClick={(e) => {
                  setIsOpen(false);
                  const element = document.getElementById('use-cases');
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Button variant='ghost' className='w-full justify-start h-12 text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl'>
                  <Box className='w-4 h-4 mr-3' /> Product Info
                </Button>
              </a>

              <a href='/dashboard/premium' onClick={() => setIsOpen(false)}>    
                <Button variant='ghost' className='w-full justify-start h-12 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/10 rounded-xl mt-2'>  
                  <ShoppingCart className='w-4 h-4 mr-3' /> Order KRUSHI BOT   
                </Button>
              </a>
              
              <div className='border-t border-white/5 my-2 pt-2'>
                {user ? (
                  <Button 
                    variant='ghost' 
                    className='w-full justify-start h-12 text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded-xl'
                    onClick={handleLogout}
                  >
                    <LogOut className='w-4 h-4 mr-3' /> Logout
                  </Button>
                ) : (
                  <Link href='/login'>
                    <Button variant='ghost' className='w-full justify-start h-12 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/10 rounded-xl'>   
                      <User className='w-4 h-4 mr-3' /> Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
