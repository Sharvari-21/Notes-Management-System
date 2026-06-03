import { useState, useEffect, useCallback } from 'react';
import {
  getAllNotes,
  searchNotes,
  deleteNote,
  togglePin,
} from '../api/notesApi';
import useDebounce from './useDebounce';

/**
 * Custom hook that manages the notes list, search, delete, and pin actions.
 * Used by NotesListPage so the page component stays clean.
 */
export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery, 400);

  // ─── Fetch notes (all or searched) ─────────────────────────────────────────
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = debouncedQuery.trim()
        ? await searchNotes(debouncedQuery.trim())
        : await getAllNotes();
      setNotes(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ─── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // ─── Toggle Pin ─────────────────────────────────────────────────────────────
  const handleTogglePin = async (id) => {
    try {
      const res = await togglePin(id);
      // Re-sort: pinned first, then by updatedAt desc
      setNotes((prev) => {
        const updated = prev.map((n) => (n._id === id ? res.data : n));
        return updated.sort((a, b) => {
          if (a.pinned !== b.pinned) return b.pinned - a.pinned;
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    notes,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    handleDelete,
    handleTogglePin,
    refetch: fetchNotes,
  };
}