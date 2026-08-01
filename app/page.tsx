import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10"></div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300 mb-8">
        <Sparkles size={16} />
        <span>V2.0 is now live</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl">
        Master Any Skill with <br className="hidden md:block"/>
        <span className="text-gradient">AI-Powered Roadmaps</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10">
        Generate personalized learning paths, interactive quizzes, and get mentored by AI to reach your goals faster than ever before.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <Link href="/login" className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition-all">
          Start Learning Free <ArrowRight size={20} />
        </Link>
        <Link href="#features" className="flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-semibold transition-all">
          View Demo
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {[
          { icon: BookOpen, title: 'Tailored Roadmaps', desc: 'AI generates a step-by-step curriculum based on your exact skill level.' },
          { icon: BrainCircuit, title: 'Dynamic Quizzes', desc: 'Test your knowledge instantly with auto-generated contextual quizzes.' },
          { icon: Sparkles, title: '24/7 AI Mentor', desc: 'Stuck on a topic? Chat with your AI mentor tuned to your learning path.' }
        ].map((feature, i) => (
          <div key={i} className="card flex flex-col items-start text-left">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 mb-4">
              <feature.icon size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
