import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';
const TOKEN_KEY = 'noted_token';
const USER_KEY = 'noted_user';

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app and exposes auth state + actions.
 *
 * Persists token + user to localStorage so the session survives page refreshes.
 * Attaches/removes the Authorization header on the shared Axios instance
 * whenever the token changes.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Keep Axios Authorization header in sync with token ──────────────────
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [token]);

  // ─── Persist user to localStorage ────────────────────────────────────────
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }, [user]);

  const clearError = () => setError(null);

  // ─── Register ─────────────────────────────────────────────────────────────
  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, register, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth — convenience hook to access auth context.
 * Throws if used outside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}