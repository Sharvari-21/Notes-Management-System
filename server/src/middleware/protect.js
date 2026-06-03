const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * protect — middleware that verifies the JWT from the Authorization header.
 *
 * Expects:  Authorization: Bearer <token>
 *
 * On success: attaches req.user (without password) and calls next().
 * On failure: returns 401 Unauthorized.
 */
const protect = async (req, res, next) => {
  let token;

  // Extract token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorised — no token provided',
    });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user document to the request (password excluded via select:false)
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorised — user no longer exists',
      });
    }

    next();
  } catch (err) {
    // Handles TokenExpiredError, JsonWebTokenError, etc.
    return res.status(401).json({
      success: false,
      message: 'Not authorised — invalid or expired token',
    });
  }
};

module.exports = protect;