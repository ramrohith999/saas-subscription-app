import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('taskflow_token');
    if (!token) return setLoading(false);

    api
      .get('/api/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('taskflow_token'))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async login(payload) {
        const res = await api.post('/api/auth/login', payload);
        localStorage.setItem('taskflow_token', res.data.token);
        setUser(res.data.user);
      },
      async signup(payload) {
        const res = await api.post('/api/auth/register', payload);
        localStorage.setItem('taskflow_token', res.data.token);
        setUser(res.data.user);
      },
      logout() {
        localStorage.removeItem('taskflow_token');
        setUser(null);
      },
      refreshUser: async () => {
        const res = await api.get('/api/auth/me');
        setUser(res.data);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
