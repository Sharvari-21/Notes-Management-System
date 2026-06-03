import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Modal from '../components/Modal';
import TagBadge from '../components/TagBadge';
import { getNoteById, deleteNote, togglePin } from '../api/notesApi';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await getNoteById(id);
        setNote(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteNote(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
      setShowModal(false);
    }
  };

  const handleTogglePin = async () => {
    try {
      const res = await togglePin(id);
      setNote(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

  if (loading) {
    return (
      <div className="page-container flex justify-center py-24">
        <Spinner size="lg" label="Loading note" />
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="page-container max-w-2xl">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-red-400 text-sm">
          {error || 'Note not found.'}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-container max-w-2xl animate-fade-in">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-600 mb-6 font-body">
          <Link to="/" className="hover:text-stone-400 transition-colors">Notes</Link>
          <span>/</span>
          <span className="text-stone-500 truncate max-w-xs">{note.title}</span>
        </nav>

        {/* Title + actions row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="font-display text-3xl sm:text-4xl text-stone-100 leading-tight">
            {note.title}
          </h1>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 mt-1">
            {/* Pin */}
            <button
              onClick={handleTogglePin}
              title={note.pinned ? 'Unpin' : 'Pin'}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-150
                ${note.pinned
                  ? 'text-amber-400 bg-amber-400/10 border-amber-400/30 hover:bg-amber-400/20'
                  : 'text-stone-500 border-ink-600 hover:border-stone-500 hover:text-stone-300 bg-ink-800'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill={note.pinned ? 'currentColor' : 'none'}
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 6.4L21 9.3l-5 4.7 1.2 6.6L12 17.3l-5.2 3.3L8 14 3 9.3l6.6-.9L12 2z" />
              </svg>
            </button>

            {/* Edit */}
            <Link
              to={`/edit/${id}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-600 bg-ink-800
                         text-stone-500 hover:text-amber-400 hover:border-amber-400/30 hover:bg-amber-400/10 transition-all"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Link>

            {/* Delete */}
            <button
              onClick={() => setShowModal(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-ink-600 bg-ink-800
                         text-stone-500 hover:text-danger hover:border-red-500/30 hover:bg-red-500/10 transition-all"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Meta — dates */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-stone-600 font-body border-b border-ink-800 pb-5">
          <div>
            <span className="text-stone-500 uppercase tracking-wider">Created</span>
            <p className="text-stone-400 mt-0.5">{formatDate(note.createdAt)} at {formatTime(note.createdAt)}</p>
          </div>
          <div>
            <span className="text-stone-500 uppercase tracking-wider">Updated</span>
            <p className="text-stone-400 mt-0.5">{formatDate(note.updatedAt)} at {formatTime(note.updatedAt)}</p>
          </div>
        </div>

        {/* Tags */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {note.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-sm max-w-none">
          <p className="text-stone-300 font-body text-base leading-relaxed whitespace-pre-wrap">
            {note.content}
          </p>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="Delete note?"
        message={`"${note.title}" will be permanently deleted.`}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
        loading={deleting}
      />
    </>
  );
}