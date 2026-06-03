import { Link } from 'react-router-dom';
import useNotes from '../hooks/useNotes';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import Spinner from '../components/Spinner';

export default function NotesListPage() {
  const {
    notes,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleDelete,
    handleTogglePin,
  } = useNotes();

  const pinnedNotes = notes.filter((n) => n.pinned);
  const regularNotes = notes.filter((n) => !n.pinned);

  return (
    <div className="page-container animate-fade-in">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-100 mb-1">
          Your Notes<span className="text-amber-400">.</span>
        </h1>
        <p className="text-stone-500 font-body text-sm">
          {loading ? 'Loading…' : `${notes.length} note${notes.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title or content…"
        />
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-red-400 text-sm mb-6">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-24">
          <Spinner size="lg" label="Loading notes" />
        </div>
      )}

      {/* Empty state */}
      {!loading && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-slide-up">
          <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-stone-600"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <h2 className="font-display text-2xl text-stone-300 mb-2">
            {searchQuery ? 'No results found' : 'No notes yet'}
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            {searchQuery
              ? `Nothing matched "${searchQuery}". Try a different search.`
              : 'Create your first note to get started.'}
          </p>
          {!searchQuery && (
            <Link to="/create" className="btn-primary text-sm">
              Create your first note
            </Link>
          )}
        </div>
      )}

      {/* Pinned notes section */}
      {!loading && pinnedNotes.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
              className="text-amber-400"
            >
              <path d="M12 2l2.4 6.4L21 9.3l-5 4.7 1.2 6.6L12 17.3l-5.2 3.3L8 14 3 9.3l6.6-.9L12 2z" />
            </svg>
            <span className="text-xs uppercase tracking-widest text-stone-500 font-body font-semibold">
              Pinned
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinnedNotes.map((note, i) => (
              <div
                key={note._id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-slide-up opacity-0 [animation-fill-mode:forwards]"
              >
                <NoteCard
                  note={note}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All / regular notes */}
      {!loading && regularNotes.length > 0 && (
        <section>
          {pinnedNotes.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs uppercase tracking-widest text-stone-500 font-body font-semibold">
                All Notes
              </span>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regularNotes.map((note, i) => (
              <div
                key={note._id}
                style={{ animationDelay: `${i * 60}ms` }}
                className="animate-slide-up opacity-0 [animation-fill-mode:forwards]"
              >
                <NoteCard
                  note={note}
                  onDelete={handleDelete}
                  onTogglePin={handleTogglePin}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}