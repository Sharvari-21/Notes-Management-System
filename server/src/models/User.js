const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * - name: required display name
 * - email: required, unique, lowercased
 * - password: required, min 6 chars, never returned in queries (select: false)
 * - timestamps: auto createdAt / updatedAt
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned in queries unless explicitly asked
    },
  },
  { timestamps: true }
);

// ─── Pre-save hook — hash password before saving ────────────────────────────
userSchema.pre('save', async function (next) {
  // Only hash if password field was modified (or is new)
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ─── Instance method — compare plain password with hashed ──────────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;