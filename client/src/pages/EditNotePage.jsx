import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import Spinner from '../components/Spinner';
import { getNoteById, updateNote } from '../api/notesApi';
import useAutoSave from '../hooks/useAutoSave';

export default function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load existing note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await getNoteById(id);
        const n = res.data;
        setNote(n);
        setFormData({
          title: n.title,
          content: n.content,
          tags: n.tags?.join(', ') || '',
          pinned: n.pinned || false,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Auto-save function — stable reference via useCallback
  const autoSaveFn = useCallback(
    async (data) => {
      const tagsArray = data.tags
        ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
      await updateNote(id, { ...data, tags: tagsArray });
    },
    [id]
  );

  // Auto-save every 5 seconds
  const autoSaveStatus = useAutoSave(formData || {}, autoSaveFn, 5000, !!formData);

  const handleSubmit = async (data) => {
    await updateNote(id, data);
    navigate(`/note/${id}`);
  };

  if (loading) {
    return (
      <div className="page-container flex justify-center py-24">
        <Spinner size="lg" label="Loading note" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container max-w-2xl">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-red-400 text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container max-w-2xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-100">
          Edit Note<span className="text-amber-400">.</span>
        </h1>
        <p className="text-stone-500 text-sm mt-1 truncate max-w-xs">
          {note?.title}
        </p>
      </div>

      {formData && (
        <NoteForm
          initialValues={formData}
          onSubmit={handleSubmit}
          isEdit
          autoSaveStatus={autoSaveStatus}
        />
      )}
    </div>
  );
}