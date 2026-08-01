import Link from 'next/link';

export default function ModulePage({ params }: { params: { id: string } }) {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Dashboard
      </Link>
      
      <div className="card glass">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">Module {params.id}: React Hooks</h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Learn how to use state and other React features without writing a class.
        </p>
        
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Study Resources</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          <li style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Official React Docs: Hooks at a Glance</a>
          </li>
          <li style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Video: 10 React Hooks Explained</a>
          </li>
        </ul>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
          <button style={{ padding: '1rem 2rem', background: 'var(--primary)', color: 'white', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', flex: 1 }}>
            Take Quiz
          </button>
          <button style={{ padding: '1rem 2rem', background: 'transparent', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', flex: 1 }}>
            Ask AI Mentor
          </button>
        </div>
      </div>
    </main>
  );
}
