const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ─── Core Middleware ───────────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is up and running 🚀' });
});

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);   // public  — register / login / me
app.use('/api/notes', noteRoutes);  // private — all routes protected by JWT

// ─── 404 — Unknown Routes ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;