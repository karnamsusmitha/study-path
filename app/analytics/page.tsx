'use client';

import { useState, useEffect } from 'react';
import { Target, TrendingUp, Award, Flame } from 'lucide-react';

export default function Analytics() {
  const [statValues, setStatValues] = useState({ hours: '0', streak: '0 Days', modules: '0', certs: '0' });
  const [activityData, setActivityData] = useState([
    { day: 'Mon', hours: 0 },
    { day: 'Tue', hours: 0 },
    { day: 'Wed', hours: 0 },
    { day: 'Thu', hours: 0 },
    { day: 'Fri', hours: 0 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    let userEmail = '';
    if (savedUser) {
      try {
        userEmail = JSON.parse(savedUser).email;
      } catch (e) {}
    }

    const roadmapKey = userEmail ? `generatedRoadmap_${userEmail}` : 'generatedRoadmap';
    const savedRoadmap = localStorage.getItem(roadmapKey);
    
    if (savedRoadmap) {
      try {
        const parsed = JSON.parse(savedRoadmap);
        if (parsed.target_career) {
          let completedCount = 0;
          let totalHours = 0;

          const savedTasksStr = localStorage.getItem(`completedTasks_${userEmail || 'anonymous'}`);
          let completedMap: Record<string, boolean> = {};
          if (savedTasksStr) {
             try { completedMap = JSON.parse(savedTasksStr); } catch(e){}
          }

          const roadmapWeeks = parsed.weekly_roadmap || [];
          roadmapWeeks.forEach((week: any, wIdx: number) => {
             const tasks = week.daily_tasks || [];
             tasks.forEach((task: any, tIdx: number) => {
                if (completedMap[`${wIdx}-${tIdx}`]) {
                   completedCount++;
                   totalHours += (task.estimated_hours || 2);
                }
             });
          });

          setStatValues({ 
            hours: `${totalHours}`, 
            streak: completedCount > 0 ? '1 Days' : '0 Days', 
            modules: `${completedCount}`, 
            certs: completedCount > 10 ? '1' : '0' 
          });

          setActivityData([
            { day: 'Mon', hours: 0 },
            { day: 'Tue', hours: 0 },
            { day: 'Wed', hours: 0 },
            { day: 'Thu', hours: 0 },
            { day: 'Fri', hours: 0 },
            { day: 'Sat', hours: 0 },
            { day: 'Sun', hours: totalHours },
          ]);
        }
      } catch (e) {}
    }
  }, []);

  const stats = [
    { label: 'Total Hours', value: statValues.hours, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/20' },
    { label: 'Current Streak', value: statValues.streak, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/20' },
    { label: 'Modules Completed', value: statValues.modules, icon: Target, color: 'text-green-500', bg: 'bg-green-500/20' },
    { label: 'Certificates Earned', value: statValues.certs, icon: Award, color: 'text-purple-500', bg: 'bg-purple-500/20' },
  ];
  const maxHours = Math.max(...activityData.map(d => d.hours));

  return (
    <div className="max-w-5xl mx-auto w-full pb-20">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Progress Analytics</h1>
          <p className="text-slate-400">Track your learning habits and achievements.</p>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card p-6 flex flex-col justify-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-6">Learning Activity</h2>
        <div className="h-64 flex items-end justify-between gap-2 pt-4 border-b border-white/10 pb-2">
          {activityData.map((data, i) => {
            const height = (data.hours / maxHours) * 100;
            return (
              <div key={i} className="w-full max-w-[40px] flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative w-full h-full flex flex-col justify-end">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded transition-opacity">
                    {data.hours}h
                  </div>
                  {/* Bar */}
                  <div 
                    className={`w-full rounded-t-md transition-all duration-500 ${data.hours > 0 ? 'bg-blue-500 group-hover:bg-blue-400' : 'bg-white/5'}`}
                    style={{ height: `${Math.max(height, 5)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-slate-500">{data.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
