import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-indigo-400">TaskFlow</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/pricing" className="text-slate-300 hover:text-white">Pricing</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="rounded bg-indigo-600 px-3 py-1.5 font-medium">Dashboard</Link>
              <button onClick={logout} className="text-slate-300 hover:text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white">Login</Link>
              <Link to="/signup" className="rounded bg-indigo-600 px-3 py-1.5 font-medium">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
