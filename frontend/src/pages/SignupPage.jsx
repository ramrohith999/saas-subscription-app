import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      await signup(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <form onSubmit={submit} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <div className="mt-4 space-y-3">
          <input required placeholder="Name" className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" required placeholder="Email" className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" required placeholder="Password" className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
        <button className="mt-4 w-full rounded bg-indigo-600 py-2 font-semibold">Sign up</button>
      </form>
    </main>
  );
}
