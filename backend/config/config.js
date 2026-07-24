// Centralized configuration, sourced from environment variables.
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  myMemory: {
    apiUrl: process.env.MYMEMORY_API_URL || 'https://api.mymemory.translated.net/get',
    email: process.env.MYMEMORY_EMAIL || ''
  },
  historyLimit: parseInt(process.env.HISTORY_LIMIT, 10) || 50
};
