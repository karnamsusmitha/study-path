'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to AI
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card glass" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Let&apos;s Build Your Path</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>What do you want to learn?</label>
            <input 
              type="text" 
              placeholder="e.g. React.js, Machine Learning, Piano"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#cbd5e1' }}>Current Skill Level</label>
            <select 
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '1rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Generating AI Path...' : 'Generate Learning Path'}
          </button>
        </form>
      </div>
    </main>
  );
}
