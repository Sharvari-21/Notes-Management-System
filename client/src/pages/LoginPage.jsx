import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, loading, error, clearError, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect immediately
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (token) navigate(from, { replace: true });
  }, [token, navigate, from]);

  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  // Clear server error when user starts typing
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) setFieldErrors((p) => ({ ...p, [field]: '' }));
    if (error) clearError();
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }

    const result = await login(form);
    if (result.success) navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
          </div>
          <h1 className="font-display text-4xl text-stone-100 mb-1">
            Welcome back<span className="text-amber-400">.</span>
          </h1>
          <p className="text-stone-500 text-sm">Sign in to your notes</p>
        </div>

        {/* Card */}
        <div className="card p-7 animate-slide-up">

          {/* Server error banner */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-stone-400 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={`input-base ${fieldErrors.email ? 'border-danger focus:border-danger' : ''}`}
              />
              {fieldErrors.email && <p className="text-xs text-danger">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm text-stone-400 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange('password')}
                placeholder="••••••••"
                className={`input-base ${fieldErrors.password ? 'border-danger focus:border-danger' : ''}`}
              />
              {fieldErrors.password && <p className="text-xs text-danger">{fieldErrors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-ink-700/40 border-t-ink-700 animate-spin-slow" />
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-stone-500 text-sm mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}