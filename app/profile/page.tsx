'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Shield, Bell, LogOut } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState({
    firstName: 'Alex',
    lastName: 'Learner',
    email: 'alex@example.com',
    initials: 'AL'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        const nameString = parsed.name || (parsed.email && parsed.email.split('@')[0]) || 'Student';
        const nameParts = nameString.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase() || 'S';
        
        setUser({
          firstName,
          lastName,
          email: parsed.email || '',
          initials
        });
      } catch (e) {}
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Profile</h1>
        <p className="text-slate-400">Manage your personal information and preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="card text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold text-white mb-4">
              {user.initials}
            </div>
            <h2 className="text-xl font-bold text-white">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-slate-400 mb-6">{user.email}</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
              Edit Photo
            </button>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Personal Information</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">First Name</label>
                  <input type="text" value={user.firstName} onChange={e => setUser({...user, firstName: e.target.value})} className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Last Name</label>
                  <input type="text" value={user.lastName} onChange={e => setUser({...user, lastName: e.target.value})} className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1 flex items-center gap-2"><Mail size={14} /> Email Address</label>
                <input type="email" value={user.email} className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-slate-400" disabled />
              </div>
              <div className="pt-2">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg"><Bell size={18} className="text-blue-400" /></div>
                  <div>
                    <h4 className="font-medium text-white">Email Notifications</h4>
                    <p className="text-sm text-slate-400">Receive weekly progress reports.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg"><Shield size={18} className="text-purple-400" /></div>
                  <div>
                    <h4 className="font-medium text-white">Public Profile</h4>
                    <p className="text-sm text-slate-400">Allow others to see your roadmap.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
