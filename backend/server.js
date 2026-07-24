const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const translateRoutes = require('./routes/translateRoutes');

const app = express();

// Core middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Scriptorium translator API is running.' });
});

// API routes
app.use('/api', translateRoutes);

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Scriptorium backend listening on http://localhost:${config.port}`);
});
