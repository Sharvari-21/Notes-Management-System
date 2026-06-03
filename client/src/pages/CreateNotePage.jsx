import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { createNote } from '../api/notesApi';

export default function CreateNotePage() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    await createNote(formData);
    navigate('/');
  };

  return (
    <div className="page-container max-w-2xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-100">
          New Note<span className="text-amber-400">.</span>
        </h1>
        <p className="text-stone-500 text-sm mt-1">Capture your thoughts.</p>
      </div>

      <NoteForm onSubmit={handleSubmit} />
    </div>
  );
}