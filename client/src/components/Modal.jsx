import { useEffect } from 'react';

/**
 * Modal — confirmation dialog (e.g. delete confirmation).
 *
 * @param {boolean} isOpen
 * @param {string} title
 * @param {string} message
 * @param {function} onConfirm
 * @param {function} onCancel
 * @param {boolean} loading - disables buttons while an async action is running
 */
export default function Modal({
  isOpen,
  title = 'Are you sure?',
  message,
  onConfirm,
  onCancel,
  loading = false,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onCancel}
    >
      {/* Panel */}
      <div
        className="card w-full max-w-sm p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-500/10 border border-red-500/20 mb-4 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </div>

        <h2 className="font-display text-xl text-stone-100 text-center mb-2">{title}</h2>
        {message && (
          <p className="text-stone-400 text-sm text-center mb-6">{message}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="btn-ghost flex-1 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger flex-1 text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin-slow" />
                Deleting…
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}