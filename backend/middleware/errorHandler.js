// 404 handler - reached when no route matched.
function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
}

// Central error handler - catches errors thrown/forwarded from anywhere in the app.
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  console.error(`[Error] ${err.message}`);
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error.'
  });
}

module.exports = { notFound, errorHandler };
