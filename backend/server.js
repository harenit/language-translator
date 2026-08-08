require("dotenv").config();

const express = require("express");
const cors = require("cors");

const config = require("./config/config");
const requestLogger = require("./middleware/requestLogger");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const translateRoutes = require("./routes/translateRoutes");

const app = express();

// Core middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(requestLogger);

// Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Scriptorium translator API is running."
    });
});

// API routes
app.use("/api", translateRoutes);

// 404 + error handling
app.use(notFound);
app.use(errorHandler);

// Only start the server when this file is run directly.
// This allows Jest/Supertest to import the app without starting a server.
if (require.main === module) {
    app.listen(config.port, () => {
        console.log(
            `Scriptorium backend listening on http://localhost:${config.port}`
        );
    });
}

// Export the Express app for testing
module.exports = app;