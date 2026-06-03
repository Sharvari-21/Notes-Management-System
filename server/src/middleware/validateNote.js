/**
 * Validation middleware for Create and Update note routes.
 * Checks that title and content are present and not empty.
 */
const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required',
    });
  }

  if (!content || content.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Content is required',
    });
  }

  next();
};

module.exports = validateNote;