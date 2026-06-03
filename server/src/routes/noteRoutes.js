const express = require('express');
const router = express.Router();

const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
  togglePin,
} = require('../controllers/noteController');

const validateNote = require('../middleware/validateNote');
const protect = require('../middleware/protect');

// All note routes require a valid JWT
router.use(protect);

/**
 * IMPORTANT: /search must be defined BEFORE /:id
 * Otherwise Express will treat "search" as an :id param.
 */

// GET /api/notes/search?query=meeting
router.get('/search', searchNotes);

// GET /api/notes  |  POST /api/notes
router
  .route('/')
  .get(getAllNotes)
  .post(validateNote, createNote);

// GET /api/notes/:id  |  PUT /api/notes/:id  |  DELETE /api/notes/:id
router
  .route('/:id')
  .get(getNoteById)
  .put(validateNote, updateNote)
  .delete(deleteNote);

// PATCH /api/notes/:id/pin
router.patch('/:id/pin', togglePin);

module.exports = router;