const express = require('express');
const router = express.Router();

const translateController = require('../controllers/translateController');
const languageController = require('../controllers/languageController');

// Languages
router.get('/languages', languageController.getLanguages);

// Translation
router.post('/translate', translateController.translateText);

// History
router.get('/history', translateController.getHistory);
router.delete('/history', translateController.clearHistory);

module.exports = router;
