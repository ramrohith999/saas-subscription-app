import { Link, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 p-4 md:grid-cols-[220px_1fr]">
      <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h2 className="text-sm font-semibold uppercase text-slate-400">Workspace</h2>
        <div className="mt-3 grid gap-2 text-sm">
          <Link to="/dashboard" className="rounded bg-slate-800 px-3 py-2">Tasks</Link>
          <Link to="/dashboard/profile" className="rounded bg-slate-800 px-3 py-2">Profile</Link>
          <Link to="/pricing" className="rounded bg-indigo-600 px-3 py-2">Upgrade</Link>
        </div>
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
