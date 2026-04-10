'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken, removeToken } from '@/lib/authUtils';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check sessionStorage
    let token = getToken();

    if (token) {
      setUser(token);
      if (pathname === '/login' || pathname === '/signup') {
        router.push('/dashboard');
      }
    } else {
      // If no token and trying to access protected route (dashboard)
      if (pathname.startsWith('/dashboard')) {
        router.push('/login');
      }
    }
  }, [pathname, router]);

  const login = (newUser: string) => {
    saveToken(newUser);
    setUser(newUser);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router.replace('/login');
    // Fire and forget logout API if needed, but DO NOT block redirect
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
