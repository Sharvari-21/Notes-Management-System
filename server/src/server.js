require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

/**
 * Start sequence:
 * 1. Connect to MongoDB
 * 2. Start Express server only after DB is ready
 */
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  });
};

startServer();