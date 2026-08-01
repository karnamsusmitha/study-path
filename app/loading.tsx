import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full h-full min-h-[80vh] flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Pulsing background glow */}
        <div className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
        {/* Core Icon */}
        <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-2xl relative z-10 animate-bounce">
          <Sparkles className="text-blue-400 w-8 h-8" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
        Initializing AI Engine...
      </h2>
      <p className="text-slate-400 max-w-sm text-center">Loading your personalized experience.</p>
    </div>
  );
}
