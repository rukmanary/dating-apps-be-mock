const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const profilesRoute = require("./routes/profiles");

const app = express();

// Security headers
app.use(helmet());

// CORS – allow your frontend domain
app.use(
  cors({
    origin: ["https://mock-dating-apps.rukmana-dev.my.id", "http://localhost:3000"],
    credentials: true,
  })
);

// Rate limit: 100 requests per 15 menit per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // limit 100 requests
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use(limiter);

// Strict JSON body parser
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/api/profiles", profilesRoute);

// Global error handler
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ error: "Internal Server Error" });
});

module.exports = app;