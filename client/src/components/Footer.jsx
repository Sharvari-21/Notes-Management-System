export default function Footer() {
  return (
    <footer className="border-t border-ink-800 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-display text-stone-600 text-sm">
          Noted<span className="text-amber-600">.</span>
        </span>
        <p className="text-stone-600 text-xs font-body">
          Your thoughts, organised.
        </p>
      </div>
    </footer>
  );
}