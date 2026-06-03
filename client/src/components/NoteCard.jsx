import { useState } from 'react';
import { Link } from 'react-router-dom';
import TagBadge from './TagBadge';
import Modal from './Modal';

/**
 * NoteCard — shows a note preview in the list.
 *
 * @param {object} note - The note data
 * @param {function} onDelete - Called with note._id after confirmation
 * @param {function} onTogglePin - Called with note._id to toggle pin
 */
export default function NoteCard({ note, onDelete, onTogglePin }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(note._id);
    setDeleting(false);
    setShowModal(false);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const preview = note.content?.length > 100
    ? note.content.slice(0, 100) + '…'
    : note.content;

  return (
    <>
      <article className="card p-5 flex flex-col gap-3 group animate-slide-up">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/note/${note._id}`}
            className="font-display text-lg text-stone-100 hover:text-amber-300 transition-colors duration-150 line-clamp-2 leading-snug"
          >
            {note.title}
          </Link>

          {/* Pin button */}
          <button
            onClick={() => onTogglePin(note._id)}
            title={note.pinned ? 'Unpin note' : 'Pin note'}
            className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md transition-all duration-150
              ${note.pinned
                ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
                : 'text-stone-600 hover:text-stone-400 hover:bg-ink-700'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill={note.pinned ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l2.4 6.4L21 9.3l-5 4.7 1.2 6.6L12 17.3l-5.2 3.3L8 14 3 9.3l6.6-.9L12 2z" />
            </svg>
          </button>
        </div>

        {/* Content preview */}
        <p className="text-stone-400 text-sm font-body leading-relaxed">{preview}</p>

        {/* Tags */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Footer — dates + actions */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-ink-700">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-stone-600">
              Created {formatDate(note.createdAt)}
            </span>
            <span className="text-xs text-stone-600">
              Updated {formatDate(note.updatedAt)}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            {/* View */}
            <Link
              to={`/note/${note._id}`}
              className="w-8 h-8 flex items-center justify-center rounded-md text-stone-500 hover:text-stone-200 hover:bg-ink-700 transition-all"
              title="View note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </Link>

            {/* Edit */}
            <Link
              to={`/edit/${note._id}`}
              className="w-8 h-8 flex items-center justify-center rounded-md text-stone-500 hover:text-amber-400 hover:bg-amber-400/10 transition-all"
              title="Edit note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Link>

            {/* Delete */}
            <button
              onClick={() => setShowModal(true)}
              className="w-8 h-8 flex items-center justify-center rounded-md text-stone-500 hover:text-danger hover:bg-red-500/10 transition-all"
              title="Delete note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </button>
          </div>
        </div>
      </article>

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