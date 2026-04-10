import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StarBackground from '@/components/StarBackground';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KrushiBot v2.0',
  description: 'Autonomous Robotic Control Interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className={`${inter.className} min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden`}>
        <div className='fixed inset-0 z-0 pointer-events-none opacity-30'>
          <StarBackground />
        </div>
        <AuthProvider>
          <div className='relative z-10 w-full h-full'>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
