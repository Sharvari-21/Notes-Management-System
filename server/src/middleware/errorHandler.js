/**
 * Global Error Handler Middleware
 * Catches all errors passed via next(err) and returns a consistent JSON response.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Note not found — invalid ID format';
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Combine all validation messages into one string
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Handle duplicate key errors (MongoDB code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Stack trace only in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;