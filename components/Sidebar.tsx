'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map, 
  MessageSquare, 
  BrainCircuit, 
  LineChart, 
  User,
  LogOut
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  
  // Do not show sidebar on landing page or login page
  if (pathname === '/' || pathname === '/login') return null;
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Roadmap', href: '/generate', icon: Map },
    { name: 'AI Mentor', href: '/chat', icon: MessageSquare },
    { name: 'Quizzes', href: '/quiz', icon: BrainCircuit },
    { name: 'Analytics', href: '/analytics', icon: LineChart },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 glass border-r hidden md:flex flex-col justify-between h-full">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white">
            AI
          </div>
          <span className="text-xl font-bold text-gradient">LearnPath</span>
        </Link>
        
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-blue-500/20 text-blue-400 font-medium' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-6 border-t border-white/10">
        <Link href="/login" className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
          <LogOut size={20} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
