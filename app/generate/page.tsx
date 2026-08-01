'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { Sparkles, Target, Briefcase, Code, Clock, Calendar, BookOpen } from 'lucide-react';

export default function GenerateRoadmap() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    studentName: '',
    targetCareer: '',
    currentSkills: '',
    hoursPerDay: '',
    duration: '',
    learningStyle: ''
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then(res => res.json());
      
      const data = result.data;
      // Store in localStorage for the hackathon demo to pass to the next page
      const savedUser = localStorage.getItem('user');
      let userEmail = '';
      if (savedUser) {
        try {
          userEmail = JSON.parse(savedUser).email;
        } catch(e){}
      }
      const roadmapKey = userEmail ? `generatedRoadmap_${userEmail}` : 'generatedRoadmap';
      localStorage.setItem(roadmapKey, JSON.stringify(data));
      router.push('/roadmap');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto w-full min-h-[80vh] flex flex-col justify-center pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Design Your Path</h1>
        <p className="text-slate-400">Provide some details so our AI can craft the perfect curriculum for you.</p>
      </div>

      <div className="card overflow-hidden p-0">
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5">
          <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Sparkles className="text-blue-500 animate-pulse w-16 h-16 mb-6" />
              <h2 className="text-2xl font-bold mb-2">Architecting your future...</h2>
              <p className="text-slate-400 text-center max-w-sm">Generating custom modules, finding the best resources, and preparing your AI mentor. This might take a few seconds.</p>
            </div>
          ) : (
            <form onSubmit={step === 3 ? handleGenerate : (e) => { e.preventDefault(); setStep(s => s + 1); }} className="space-y-6">
              
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-lg font-medium mb-3 text-white">
                      <Target className="text-blue-500" size={20} /> Your Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alex Learner"
                      value={formData.studentName}
                      onChange={(e) => updateData('studentName', e.target.value)}
                      className="w-full px-5 py-4 text-lg bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required 
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-lg font-medium mb-3 text-white">
                      <Briefcase className="text-purple-500" size={20} /> Target Career / Goal
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Full Stack React Developer"
                      value={formData.targetCareer}
                      onChange={(e) => updateData('targetCareer', e.target.value)}
                      className="w-full px-5 py-4 text-lg bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required 
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-lg font-medium mb-3 text-white">
                      <Code className="text-green-500" size={20} /> Current Skills
                    </label>
                    <textarea 
                      placeholder="e.g. Basic HTML/CSS, some Python. Total beginner to JS."
                      value={formData.currentSkills}
                      onChange={(e) => updateData('currentSkills', e.target.value)}
                      rows={3}
                      className="w-full px-5 py-4 text-lg bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      required 
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-lg font-medium mb-3 text-white">
                      <BookOpen className="text-orange-500" size={20} /> Preferred Learning Style
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {['Visual (Videos)', 'Reading (Docs)', 'Project-Based'].map(style => (
                        <label key={style} className="cursor-pointer">
                          <input 
                            type="radio" 
                            name="style" 
                            checked={formData.learningStyle === style}
                            onChange={() => updateData('learningStyle', style)}
                            className="peer sr-only" 
                            required 
                          />
                          <div className="p-4 text-center rounded-xl border border-white/10 bg-black/20 peer-checked:bg-blue-500/20 peer-checked:border-blue-500 peer-checked:text-blue-400 transition-all hover:bg-white/5">
                            {style}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-lg font-medium mb-3 text-white">
                      <Clock className="text-pink-500" size={20} /> Hours Per Day
                    </label>
                    <input 
                      type="number" 
                      min="1"
                      max="12"
                      placeholder="e.g. 2"
                      value={formData.hoursPerDay}
                      onChange={(e) => updateData('hoursPerDay', e.target.value)}
                      className="w-full px-5 py-4 text-lg bg-black/20 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required 
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-lg font-medium mb-3 text-white">
                      <Calendar className="text-yellow-500" size={20} /> Expected Duration
                    </label>
                    <select 
                      value={formData.duration}
                      onChange={(e) => updateData('duration', e.target.value)}
                      className="w-full px-5 py-4 text-lg bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required
                    >
                      <option value="" disabled>Select a timeline</option>
                      <option value="4 weeks">4 Weeks (Crash Course)</option>
                      <option value="12 weeks">12 Weeks (Bootcamp)</option>
                      <option value="6 months">6 Months (Deep Dive)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                {step > 1 ? (
                  <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-3 text-slate-400 hover:text-white transition-colors">
                    Back
                  </button>
                ) : <div></div>}
                <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                  {step === 3 ? 'Generate Roadmap' : 'Continue'} 
                  {step === 3 ? <Sparkles size={18} /> : null}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
