'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '', password: '', student_name: '', current_skill_level: 'Beginner', learning_style: 'Visual', weekly_hours_available: 10
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiClient('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        const genericRoadmap = localStorage.getItem('generatedRoadmap');
        if (genericRoadmap) {
          localStorage.setItem(`generatedRoadmap_${data.user.email}`, genericRoadmap);
          localStorage.removeItem('generatedRoadmap');
        }
      }
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-10 pb-20">
      <div className="card w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Sparkles className="text-blue-500 w-6 h-6" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-slate-400 text-center mb-8 text-sm">Start your personalized learning path today.</p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name</label>
            <input type="text" required value={formData.student_name} onChange={e => setFormData({...formData, student_name: e.target.value})} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="Alex" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="••••••••" />
          </div>
          
          <button type="submit" disabled={loading} className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
            {loading ? 'Creating Account...' : <>Sign Up <ArrowRight size={18}/></>}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account? <Link href="/login" className="text-blue-400 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
