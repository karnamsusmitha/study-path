import './globals.css';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'LearnPath AI - Personalized Learning',
  description: 'AI Personalized Learning Path Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden bg-background text-foreground selection:bg-blue-500/30">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0">
          {/* Animated Background Orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-900/10 blur-[120px] animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-stone-700/20 blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-orange-950/20 blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
