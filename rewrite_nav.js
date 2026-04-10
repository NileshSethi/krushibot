const fs = require('fs');
let content = fs.readFileSync('components/DashboardNav.tsx', 'utf-8');

content = content.replace(
  "import React, { useState, useEffect } from 'react';", 
  "import React, { useState } from 'react';\nimport { useAuth } from '@/components/AuthProvider';"
);

// We can simply find the whole block to replace.
const oldBlock = `  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Only access sessionStorage on client mount
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('krushibot_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      }
    }

    // End session when tab/window is closed
    const handleBeforeUnload = () => {
      // Use sendBeacon to reliably call logout even during page close
      navigator.sendBeacon('/api/auth/logout');
      sessionStorage.removeItem('krushibot_user');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout failed', e);
    }
    sessionStorage.removeItem('krushibot_user');
    sessionStorage.removeItem('verified_email');
    window.location.href = '/login';
  };`;

const newBlock = `  const { user, logout } = useAuth();`;

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
} else {
  console.error("Could not find the block to replace.");
}

fs.writeFileSync('components/DashboardNav.tsx', content);