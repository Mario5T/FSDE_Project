import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/apiClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { checkUserLoggedIn(); }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updatePreferences = async (prefs) => {
    const { data } = await api.put('/users/preferences', prefs);
    setUser(prev => ({ ...prev, preferences: data }));
    return data;
  };

  const updateSubscription = async (sub) => {
    const { data } = await api.put('/users/subscription', sub);
    setUser(prev => ({ ...prev, subscription: data }));
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updatePreferences, updateSubscription, api }}>
      {children}
    </AuthContext.Provider>
  );
};
