// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const connectDB = require("./db/db");
const { setupWebsocket } = require("./ws");
const ordersRouter = require("./routes/orders");

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5173", // your React frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
  );
  app.use(bodyParser.json());

  app.use("/api/orders", ordersRouter);

  app.get("/health", (req, res) => res.json({ ok: true }));

  const server = http.createServer(app);

  setupWebsocket(server, { path: process.env.WS_PATH || "/ws" });

  server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ WebSocket path: ${process.env.WS_PATH || "/ws"}`);
  });
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
