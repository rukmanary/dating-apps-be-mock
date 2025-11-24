const express = require("express");
const profilesRoute = require("./routes/profiles");

const app = express();

app.use(express.json());

app.use("/api/profiles", profilesRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: "Internal Server Error" });
});

module.exports = app;