const mongoose = require('mongoose');

/**
 * Note Schema
 * - user: ref to User who owns this note (required)
 * - title: required, trimmed string
 * - content: required string
 * - pinned: bonus feature — pinned notes float to the top
 * - tags: bonus feature — array of tag strings
 * - timestamps: auto-manages createdAt and updatedAt
 */
const noteSchema = new mongoose.Schema(
  {
    // Reference to the owning user — every note belongs to exactly one user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster text search on title and content
noteSchema.index({ title: 'text', content: 'text' });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;