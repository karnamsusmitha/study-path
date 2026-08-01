'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Clock, Target, BookOpen, CheckCircle2, MessageSquare, Calendar as CalendarIcon, ArrowRight, CircleDashed } from 'lucide-react';

export default function Dashboard() {
  const [userName, setUserName] = useState('Student');
  const [currentGoal, setCurrentGoal] = useState('Create a roadmap to see your goal!');
  const [progress, setProgress] = useState(0);

  const [statValues, setStatValues] = useState({ streak: '0 Days', hours: '0h', quiz: '0%', topics: '0' });
  const [todaysTasks, setTodaysTasks] = useState<{title: string, time: string, done: boolean}[]>([]);
  const [learningActivity, setLearningActivity] = useState<number[]>(Array(14).fill(0));
  const [upNext, setUpNext] = useState<{day: string, title: string, type: string}[]>([]);
  const [mentorChats, setMentorChats] = useState<{title: string, time: string}[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    let userEmail = '';
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserName(parsed.name || (parsed.email && parsed.email.split('@')[0]) || 'Student');
        userEmail = parsed.email;
      } catch (e) {}
    }

    const roadmapKey = userEmail ? `generatedRoadmap_${userEmail}` : 'generatedRoadmap';
    const savedRoadmap = localStorage.getItem(roadmapKey);
    if (savedRoadmap) {
      try {
        const parsed = JSON.parse(savedRoadmap);
        if (parsed.target_career) {
          setCurrentGoal(parsed.target_career);
          
          let completedCount = 0;
          let totalTasks = 0;
          let totalHours = 0;

          const savedTasksStr = localStorage.getItem(`completedTasks_${userEmail || 'anonymous'}`);
          let completedMap: Record<string, boolean> = {};
          if (savedTasksStr) {
             try { completedMap = JSON.parse(savedTasksStr); } catch(e){}
          }

          const roadmapWeeks = parsed.weekly_roadmap || [];
          roadmapWeeks.forEach((week: any, wIdx: number) => {
             const tasks = week.daily_tasks || [];
             totalTasks += tasks.length;
             tasks.forEach((task: any, tIdx: number) => {
                if (completedMap[`${wIdx}-${tIdx}`]) {
                   completedCount++;
                   totalHours += (task.estimated_hours || 2);
                }
             });
          });

          const actualProgress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
          setProgress(actualProgress);

          setStatValues({ 
            streak: completedCount > 0 ? '1 Days' : '0 Days', 
            hours: `${totalHours}h`, 
            quiz: completedCount > 0 ? '85%' : '0%', 
            topics: `${completedCount}` 
          });

          const newActivity = Array(14).fill(0);
          if (totalHours > 0) newActivity[13] = totalHours;
          setLearningActivity(newActivity);
          setUpNext([
            { day: 'Tomorrow', title: 'React Context API', type: 'Module' },
            { day: 'Thursday', title: 'State Management Quiz', type: 'Quiz' },
            { day: 'Friday', title: 'Todo App Refactor', type: 'Project' },
          ]);
          setMentorChats([
            { title: 'Why use useEffect cleanup?', time: '2h ago' },
            { title: 'Difference between state and props', time: 'Yesterday' },
            { title: 'Project idea for React hooks', time: '3 days ago' },
          ]);
        }
      } catch (e) {}
    }
  }, []);
  
  // SVG Circular Progress Component
  const ProgressRing = ({ radius, stroke, progress, colorClass }: { radius: number, stroke: number, progress: number, colorClass: string }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress / 100 * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="-rotate-90">
          <circle
            stroke="rgba(255,255,255,0.1)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={`transition-all duration-1000 ease-out ${colorClass}`}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-white">{progress}%</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Complete</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-20 pt-4 animate-fade-in-up">
      
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome back, {userName}</h1>
          <p className="text-slate-400">Here's your learning overview for today.</p>
        </div>
        <Link href="/generate" className="btn-primary">
          Update Roadmap <ArrowRight size={16} />
        </Link>
      </header>

      {/* TOP ROW: 4 METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Study Streak', value: statValues.streak, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/20' },
          { label: 'Hours Studied', value: statValues.hours, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/20' },
          { label: 'Avg Quiz Score', value: statValues.quiz, icon: Target, color: 'text-green-500', bg: 'bg-green-500/20' },
          { label: 'Completed Topics', value: statValues.topics, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/20' }
        ].map((stat, i) => (
          <div key={i} className="card p-5 flex items-center gap-4 border-white/5 hover:bg-white/5 transition-colors">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT/CENTER COLUMN (spans 2) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* CURRENT GOAL & ROADMAP PROGRESS */}
          <div className="card p-8 bg-gradient-to-br from-stone-900/40 to-black border-stone-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-500/20 text-stone-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                <Target size={14} /> Current Goal
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{currentGoal}</h2>
              <p className="text-slate-400 max-w-md mb-6">
                {progress > 0 ? "You are currently on Week 3: Advanced Patterns. Keep up the great pace!" : "You haven't generated a personalized learning roadmap yet. Generate one now to start tracking your progress!"}
              </p>
              <Link href={progress > 0 ? "/roadmap" : "/generate"} className="btn-primary w-fit">
                {progress > 0 ? "View Full Roadmap" : "Generate Roadmap"}
              </Link>
            </div>
            <div className="flex-shrink-0 drop-shadow-[0_0_15px_rgba(168,162,158,0.2)]">
              <ProgressRing radius={70} stroke={12} progress={progress} colorClass="text-stone-400" />
            </div>
          </div>

          {/* TODAY'S TASKS */}
          <div className="card p-0 overflow-hidden border-white/5">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="text-green-400" size={20}/> Today's Tasks</h2>
              <span className="text-sm font-medium text-slate-400">
                {todaysTasks.length > 0 ? `${todaysTasks.filter(t=>t.done).length} of ${todaysTasks.length} completed` : '0 tasks'}
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {todaysTasks.length > 0 ? todaysTasks.map((task, i) => (
                <label key={i} className={`flex items-center gap-4 p-5 cursor-pointer hover:bg-white/5 transition-colors ${task.done ? 'opacity-60' : ''}`}>
                  <input type="checkbox" checked={task.done} readOnly className="w-5 h-5 rounded border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900 bg-black/50" />
                  <div className="flex-1">
                    <h4 className={`font-semibold ${task.done ? 'line-through text-slate-400' : 'text-white'}`}>{task.title}</h4>
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{task.time}</div>
                </label>
              )) : (
                <div className="p-6 text-center text-slate-400 text-sm">No tasks assigned for today.</div>
              )}
            </div>
          </div>

          {/* LEARNING CALENDAR (Heatmap) */}
          <div className="card p-6 border-white/5">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><CalendarIcon className="text-purple-400" size={20}/> Learning Activity</h2>
            <div className="flex justify-between items-end h-32 gap-2">
              {learningActivity.map((val, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full h-full flex flex-col justify-end bg-black/20 rounded-t-md overflow-hidden">
                    <div 
                      className={`w-full transition-all duration-500 rounded-t-md ${val === 0 ? 'bg-white/5' : 'bg-purple-500 hover:bg-purple-400'}`}
                      style={{ height: `${Math.max((val / 12) * 100, val === 0 ? 0 : 15)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-3 font-medium uppercase tracking-wider">
              <span>Two Weeks Ago</span>
              <span>Today</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <div className="flex flex-col gap-8">
          
          {/* UPCOMING TASKS */}
          <div className="card p-6 border-white/5 h-fit">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><CircleDashed className="text-orange-400" size={20}/> Up Next</h2>
            <div className="space-y-6">
              {upNext.length > 0 ? upNext.map((task, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute w-3 h-3 bg-slate-900 border-2 border-orange-500 rounded-full -left-[7px] top-1"></div>
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">{task.day}</span>
                  <h4 className="text-white font-medium mt-1">{task.title}</h4>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-white/5 text-slate-400 text-xs rounded">{task.type}</span>
                </div>
              )) : (
                <div className="text-slate-400 text-sm">Generate a roadmap to see upcoming modules!</div>
              )}
            </div>
          </div>

          {/* RECENT AI CONVERSATIONS */}
          <div className="card p-6 border-white/5 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2"><MessageSquare className="text-blue-400" size={20}/> Mentor Chats</h2>
              <Link href="/chat" className="text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest">View All</Link>
            </div>
            <div className="space-y-4">
              {mentorChats.length > 0 ? mentorChats.map((chat, i) => (
                <Link href="/chat" key={i} className="block p-4 rounded-xl bg-black/20 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                  <h4 className="text-slate-200 text-sm font-medium group-hover:text-blue-300 line-clamp-1">{chat.title}</h4>
                  <span className="text-xs text-slate-500 mt-2 block">{chat.time}</span>
                </Link>
              )) : (
                <div className="text-slate-400 text-sm">No recent mentor chats.</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
