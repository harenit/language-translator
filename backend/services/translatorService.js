const axios = require('axios');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

/**
 * Calls the MyMemory translation API (free, no key required) and returns the translated text.
 * @param {string} text - text to translate
 * @param {string} source - source language code (e.g. 'en')
 * @param {string} target - target language code (e.g. 'ta')
 */
async function translateText(text, source, target) {
  try {
    const response = await axios.get(config.myMemory.apiUrl, {
      params: {
        q: text,
        langpair: `${source}|${target}`,
        de: config.myMemory.email || undefined
      },
      timeout: 10000
    });

    const data = response.data;

    if (!data || !data.responseData) {
      throw new ApiError(502, 'Translation provider returned an unexpected response.');
    }

    if (data.responseStatus && Number(data.responseStatus) >= 400) {
      throw new ApiError(502, data.responseDetails || 'Translation provider rejected the request.');
    }

    return data.responseData.translatedText;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err.response) {
      throw new ApiError(502, 'Translation provider error: ' + err.response.status);
    }
    if (err.code === 'ECONNABORTED') {
      throw new ApiError(504, 'Translation provider timed out. Please try again.');
    }
    throw new ApiError(500, 'Unable to reach the translation provider.');
  }
}

module.exports = { translateText };
