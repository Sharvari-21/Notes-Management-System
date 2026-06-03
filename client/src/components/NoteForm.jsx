import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * NoteForm — shared form used by both CreateNotePage and EditNotePage.
 *
 * @param {object} initialValues - { title, content, tags, pinned }
 * @param {function} onSubmit - async function that receives form data
 * @param {boolean} isEdit - changes button label and heading
 * @param {object} autoSaveStatus - { lastSaved, isSaving } from useAutoSave
 */
export default function NoteForm({
  initialValues = { title: '', content: '', tags: '', pinned: false },
  onSubmit,
  isEdit = false,
  autoSaveStatus = null,
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.content.trim()) e.content = 'Content is required';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      // Convert comma-separated tags string to array
      const tagsArray = form.tags
        ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      await onSubmit({ ...form, tags: tagsArray });
    } finally {
      setSubmitting(false);
    }
  };

  const formatLastSaved = (date) => {
    if (!date) return '';
    return `Saved at ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Auto-save status */}
      {autoSaveStatus && (
        <div className="flex items-center gap-2 text-xs text-stone-600 font-body h-4">
          {autoSaveStatus.isSaving ? (
            <>
              <span className="w-2.5 h-2.5 rounded-full border border-stone-600 border-t-amber-500 animate-spin-slow" />
              Auto-saving…
            </>
          ) : autoSaveStatus.lastSaved ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              {formatLastSaved(autoSaveStatus.lastSaved)}
            </>
          ) : null}
        </div>
      )}

      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm text-stone-400 font-body font-medium">
          Title <span className="text-danger">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={handleChange('title')}
          placeholder="Note title…"
          className={`input-base ${errors.title ? 'border-danger focus:border-danger focus:ring-danger/30' : ''}`}
        />
        {errors.title && (
          <p className="text-xs text-danger">{errors.title}</p>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm text-stone-400 font-body font-medium">
          Content <span className="text-danger">*</span>
        </label>
        <textarea
          id="content"
          rows={10}
          value={form.content}
          onChange={handleChange('content')}
          placeholder="Write your note here…"
          className={`input-base resize-none leading-relaxed ${errors.content ? 'border-danger focus:border-danger focus:ring-danger/30' : ''}`}
        />
        {errors.content && (
          <p className="text-xs text-danger">{errors.content}</p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="tags" className="text-sm text-stone-400 font-body font-medium">
          Tags
          <span className="text-stone-600 font-normal ml-1">(comma-separated)</span>
        </label>
        <input
          id="tags"
          type="text"
          value={form.tags}
          onChange={handleChange('tags')}
          placeholder="work, ideas, urgent…"
          className="input-base"
        />
      </div>

      {/* Pin toggle */}
      <label className="flex items-center gap-3 cursor-pointer group w-fit">
        <div
          onClick={() => setForm((prev) => ({ ...prev, pinned: !prev.pinned }))}
          className={`relative w-9 h-5 rounded-full border transition-all duration-200 cursor-pointer
            ${form.pinned
              ? 'bg-amber-500 border-amber-500'
              : 'bg-ink-700 border-ink-600 group-hover:border-stone-500'
            }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
              ${form.pinned ? 'translate-x-4' : 'translate-x-0'}`}
          />
        </div>
        <span className="text-sm text-stone-400 font-body font-medium select-none">
          Pin this note
        </span>
      </label>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary flex items-center gap-2"
        >
          {submitting ? (
            <>
              <span className="w-3.5 h-3.5 rounded-full border-2 border-ink-700/40 border-t-ink-700 animate-spin-slow" />
              {isEdit ? 'Saving…' : 'Creating…'}
            </>
          ) : (
            isEdit ? 'Save Changes' : 'Save Note'
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-ghost"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}