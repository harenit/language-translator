const translateService = require('../services/translatorService');
const TranslationStore = require('../models/Translation');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// POST /api/translate
const translateText = asyncHandler(async (req, res) => {
  const { text, source, target } = req.body;

  if (!text || !text.trim()) {
    throw new ApiError(400, 'Field "text" is required.');
  }
  if (!source || !target) {
    throw new ApiError(400, 'Both "source" and "target" language codes are required.');
  }

  const translatedText = await translateService.translateText(text, source, target);

  const entry = TranslationStore.add({
    sourceText: text,
    translatedText,
    sourceLang: source,
    targetLang: target
  });

  res.status(200).json({ success: true, data: entry });
});

// GET /api/history
const getHistory = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: TranslationStore.getAll() });
});

// DELETE /api/history
const clearHistory = asyncHandler(async (req, res) => {
  TranslationStore.clear();
  res.status(200).json({ success: true, message: 'Translation history cleared.' });
});

module.exports = { translateText, getHistory, clearHistory };
