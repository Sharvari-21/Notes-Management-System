const Note = require('../models/Note');

/**
 * @desc    Create a new note
 * @route   POST /api/notes
 * @access  Private
 */
const createNote = async (req, res, next) => {
  try {
    const { title, content, tags, pinned } = req.body;

    // Scope note to the logged-in user
    const note = await Note.create({ title, content, tags, pinned, user: req.user._id });

    res.status(201).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all notes for the logged-in user — pinned first, then updatedAt desc
 * @route   GET /api/notes
 * @access  Private
 */
const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id })
      .sort({ pinned: -1, updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single note by ID (must belong to logged-in user)
 * @route   GET /api/notes/:id
 * @access  Private
 */
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a note by ID (must belong to logged-in user)
 * @route   PUT /api/notes/:id
 * @access  Private
 */
const updateNote = async (req, res, next) => {
  try {
    const { title, content, tags, pinned } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content, tags, pinned },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a note by ID (must belong to logged-in user)
 * @route   DELETE /api/notes/:id
 * @access  Private
 */
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search notes by title or content (scoped to logged-in user)
 * @route   GET /api/notes/search?query=meeting
 * @access  Private
 */
const searchNotes = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const notes = await Note.find({
      user: req.user._id,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).sort({ pinned: -1, updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle pinned status (must belong to logged-in user)
 * @route   PATCH /api/notes/:id/pin
 * @access  Private
 */
const togglePin = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found',
      });
    }

    note.pinned = !note.pinned;
    await note.save();

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
  togglePin,
};