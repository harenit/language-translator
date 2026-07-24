const languages = require('../utils/languages');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/languages
const getLanguages = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: languages });
});

module.exports = { getLanguages };
