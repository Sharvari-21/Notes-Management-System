/**
 * Spinner — used during loading states.
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} label - Accessible screen reader label
 */
export default function Spinner({ size = 'md', label = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-[3px]',
  };

  return (
    <div role="status" aria-label={label} className="flex items-center justify-center">
      <div
        className={`${sizes[size]} rounded-full border-ink-600 border-t-amber-400 animate-spin-slow`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}