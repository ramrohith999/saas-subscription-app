import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <dl className="mt-4 grid gap-2 text-sm">
        <div><dt className="text-slate-400">Name</dt><dd>{user?.name}</dd></div>
        <div><dt className="text-slate-400">Email</dt><dd>{user?.email}</dd></div>
        <div><dt className="text-slate-400">Subscription plan</dt><dd className="capitalize">{user?.subscriptionPlan}</dd></div>
        <div><dt className="text-slate-400">Subscription status</dt><dd className="capitalize">{user?.subscriptionStatus}</dd></div>
      </dl>
    </main>
  );
}
