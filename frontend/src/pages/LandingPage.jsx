import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-10 text-center">
        <p className="text-sm uppercase tracking-wider text-indigo-400">TaskFlow SaaS</p>
        <h1 className="mt-3 text-4xl font-black">Organize projects. Ship faster.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">TaskFlow helps teams manage tasks and projects with modern workflows. Upgrade to Pro for unlimited tasks and analytics.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/signup" className="rounded bg-indigo-600 px-5 py-2.5 font-semibold">Start Free</Link>
          <Link to="/pricing" className="rounded border border-slate-700 px-5 py-2.5 font-semibold">View Pricing</Link>
        </div>
      </section>
    </main>
  );
}
