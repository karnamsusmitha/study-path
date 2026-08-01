'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, Video, Book, Briefcase, FileCode, Check } from 'lucide-react';
import { mockRoadmapData } from '@/lib/mockData';

export default function RoadmapDisplay() {
  const [data, setData] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (weekIdx: number, taskIdx: number) => {
    const key = `${weekIdx}-${taskIdx}`;
    setCompletedTasks(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const savedUser = localStorage.getItem('user');
      let userEmail = 'anonymous';
      if (savedUser) { try { userEmail = JSON.parse(savedUser).email; } catch(e){} }
      localStorage.setItem(`completedTasks_${userEmail}`, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    // Read from localStorage if available, otherwise use mock
    const savedUser = localStorage.getItem('user');
    let userEmail = '';
    if (savedUser) {
      try {
        userEmail = JSON.parse(savedUser).email;
      } catch(e){}
    }
    const roadmapKey = userEmail ? `generatedRoadmap_${userEmail}` : 'generatedRoadmap';
    const saved = localStorage.getItem(roadmapKey);
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        setData(mockRoadmapData);
      }
    } else {
      setData(mockRoadmapData);
    }

    const savedTasks = localStorage.getItem(`completedTasks_${userEmail || 'anonymous'}`);
    if (savedTasks) {
      try {
        setCompletedTasks(JSON.parse(savedTasks));
      } catch(e) {}
    }
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full pb-20 pt-4 animate-fade-in-up">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Your Path to <span className="text-gradient">{data.target_career}</span></h1>
        <p className="text-lg text-slate-400 max-w-3xl">{data.overview}</p>
      </header>

      <div className="flex flex-col gap-12">
        {data.weekly_roadmap?.map((week: any, index: number) => {
          const weekTasks = week.daily_tasks || [];
          const completedInWeek = weekTasks.filter((_: any, tIdx: number) => completedTasks[`${index}-${tIdx}`]).length;
          const weekProgress = weekTasks.length > 0 ? Math.round((completedInWeek / weekTasks.length) * 100) : 0;

          return (
          <div key={index} className="relative">
            
            {/* Visual Timeline Connector */}
            {index !== data.weekly_roadmap.length - 1 && (
              <div className="hidden md:block absolute left-8 top-24 bottom-[-48px] w-1 bg-gradient-to-b from-stone-500/50 via-stone-700/20 to-transparent z-0"></div>
            )}

            <div className="card relative z-10 p-0 overflow-hidden border-white/10 group/card">
              
              {/* Week Header */}
              <div className="bg-stone-900/40 p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-700 to-zinc-900 flex flex-col items-center justify-center font-bold text-stone-200 shadow-lg shadow-stone-500/20 group-hover/card:scale-105 transition-transform duration-300">
                    <span className="text-xs text-stone-400">WEEK</span>
                    <span className="text-xl">{week.week_number}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{week.theme}</h2>
                    <p className="text-blue-300 font-medium">{week.focus}</p>
                  </div>
                </div>
                
                {/* Progress Bar (Visual Only) */}
                <div className="w-full md:w-64">
                  <div className="flex justify-between text-sm mb-1 text-slate-400">
                    <span>Progress</span>
                    <span>{weekProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-stone-400 to-stone-600 shadow-[0_0_10px_rgba(168,162,158,0.3)] transition-all duration-500" style={{ width: `${weekProgress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Week Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Daily Tasks */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target size={18} className="text-blue-400" /> Daily Action Plan
                  </h3>
                  <div className="space-y-3">
                    {week.daily_tasks?.map((task: any, tIdx: number) => {
                      const isCompleted = completedTasks[`${index}-${tIdx}`];
                      return (
                      <div 
                        key={tIdx} 
                        onClick={() => toggleTask(index, tIdx)}
                        className={`p-4 bg-black/20 border border-white/5 rounded-xl transition-all cursor-pointer group ${isCompleted ? 'opacity-60' : 'hover:bg-white/5'}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded-full border mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                            isCompleted ? 'bg-stone-300 border-stone-300 shadow-[0_0_10px_rgba(168,162,158,0.4)]' : 'border-stone-700 group-hover:border-stone-400'
                          }`}>
                            {isCompleted && <Check size={14} className="text-black" />}
                          </div>
                          <div>
                            <h4 className={`font-semibold transition-colors ${isCompleted ? 'text-stone-500 line-through' : 'text-stone-200 group-hover:text-stone-300'}`}>
                              Day {task.day}: {task.task_title}
                            </h4>
                            <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                            <span className="inline-block mt-2 text-xs font-medium px-2 py-1 bg-white/5 text-slate-300 rounded-md">
                              ~{task.estimated_hours} hours
                            </span>
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                </div>

                {/* Sidebar: Resources & Practice */}
                <div className="flex flex-col gap-6">
                  
                  {/* Resources */}
                  {week.resources && week.resources.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Book size={18} className="text-purple-400" /> Curated Resources
                      </h3>
                      <div className="flex flex-col gap-2">
                        {week.resources.map((res: any, rIdx: number) => (
                          <a key={rIdx} href={res.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                            {res.type === 'video' ? <Video size={16} className="text-pink-400" /> : <Book size={16} className="text-blue-400" />}
                            <span className="truncate">{res.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practice & Projects */}
                  {week.mini_project && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Briefcase size={18} className="text-orange-400" /> Mini Project
                      </h3>
                      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                        <h4 className="font-semibold text-orange-200 mb-1">{week.mini_project.title}</h4>
                        <p className="text-sm text-orange-200/70">{week.mini_project.description}</p>
                      </div>
                    </div>
                  )}

                  {week.practice_problems && week.practice_problems.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileCode size={18} className="text-green-400" /> Practice
                      </h3>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 ml-1">
                        {week.practice_problems.map((prob: string, pIdx: number) => (
                          <li key={pIdx}>{prob}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
          );
        })}
      </div>
      
      {/* Revision Schedule */}
      {data.revision_schedule && data.revision_schedule.length > 0 && (
        <div className="mt-12 card bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/20 p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-purple-400" /> Spaced Repetition Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.revision_schedule.map((rev: any, rIdx: number) => (
              <div key={rIdx} className="p-4 bg-black/20 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-purple-400 mb-2 block">{rev.milestone}</span>
                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
                  {rev.revision_tasks.map((task: string, tIdx: number) => (
                    <li key={tIdx}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 text-center flex justify-center">
        <Link href="/dashboard" className="btn-primary">
          Save Roadmap & Go to Dashboard
        </Link>
      </div>

    </div>
  );
}
