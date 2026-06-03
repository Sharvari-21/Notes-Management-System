import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { user, token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform duration-200" />

            <span className="font-display text-xl text-stone-100 tracking-tight">
              Noted<span className="text-amber-400">.</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-3">

            {/* Authenticated */}
            {token ? (
              <>
                {pathname !== '/' && (
                  <Link
                    to="/"
                    className="text-stone-400 hover:text-stone-200 text-sm font-body font-medium transition-colors duration-150"
                  >
                    All Notes
                  </Link>
                )}

                <Link
                  to="/create"
                  className="btn-primary text-sm flex items-center gap-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  New Note
                </Link>

                {/* User Name */}
                <span className="hidden sm:block text-sm text-stone-400">
                  {user?.name}
                </span>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm text-stone-400 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-stone-400 hover:text-stone-200 text-sm font-medium transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Register
                </Link>
              </>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
}
