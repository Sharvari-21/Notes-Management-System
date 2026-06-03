import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, loading, error, clearError, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/', { replace: true });
  }, [token, navigate]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }

    if (error) clearError();
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = 'Name is required';
    }

    if (!form.email.trim()) {
      e.email = 'Email is required';
    }

    if (!form.password) {
      e.password = 'Password is required';
    } else if (form.password.length < 6) {
      e.password = 'Password must be at least 6 characters';
    }

    if (!form.confirmPassword) {
      e.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (result.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </div>

          <h1 className="font-display text-4xl text-stone-100 mb-1">
            Create account<span className="text-amber-400">.</span>
          </h1>

          <p className="text-stone-500 text-sm">
            Start organizing your notes today
          </p>
        </div>

        {/* Card */}
        <div className="card p-7 animate-slide-up">

          {/* Server Error */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>

              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm text-stone-400 font-medium"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="John Doe"
                className={`input-base ${
                  fieldErrors.name
                    ? 'border-danger focus:border-danger'
                    : ''
                }`}
              />

              {fieldErrors.name && (
                <p className="text-xs text-danger">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm text-stone-400 font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="you@example.com"
                className={`input-base ${
                  fieldErrors.email
                    ? 'border-danger focus:border-danger'
                    : ''
                }`}
              />

              {fieldErrors.email && (
                <p className="text-xs text-danger">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm text-stone-400 font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange('password')}
                placeholder="••••••••"
                className={`input-base ${
                  fieldErrors.password
                    ? 'border-danger focus:border-danger'
                    : ''
                }`}
              />

              {fieldErrors.password && (
                <p className="text-xs text-danger">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-stone-400 font-medium"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                placeholder="••••••••"
                className={`input-base ${
                  fieldErrors.confirmPassword
                    ? 'border-danger focus:border-danger'
                    : ''
                }`}
              />

              {fieldErrors.confirmPassword && (
                <p className="text-xs text-danger">
                  {fieldErrors.confirmPassword}
                </p>
              )}
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
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-stone-500 text-sm mt-5">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}