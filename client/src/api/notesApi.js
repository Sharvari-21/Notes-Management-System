import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';
const TOKEN_KEY = 'noted_token';

/**
 * Dedicated Axios instance for Notes API requests.
 *
 * - Automatically attaches JWT from localStorage
 * - Unwraps response.data
 * - Returns clean error messages
 */
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Attach Authorization header on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ────────────────────────────────────────────────────
// Return response.data directly or throw a clean Error
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    return Promise.reject(new Error(message));
  }
);

// ─── Notes API ───────────────────────────────────────────────────────────────

/**
 * Fetch all notes
 */
export const getAllNotes = () => api.get('/notes');

/**
 * Fetch a single note by ID
 */
export const getNoteById = (id) => api.get(`/notes/${id}`);

/**
 * Create a new note
 */
export const createNote = (payload) => api.post('/notes', payload);

/**
 * Update an existing note
 */
export const updateNote = (id, payload) =>
  api.put(`/notes/${id}`, payload);

/**
 * Delete a note
 */
export const deleteNote = (id) => api.delete(`/notes/${id}`);

/**
 * Search notes
 */
export const searchNotes = (query) =>
  api.get('/notes/search', {
    params: { query },
  });

/**
 * Toggle pin status
 */
export const togglePin = (id) =>
  api.patch(`/notes/${id}/pin`);

export default api;