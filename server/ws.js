// ws.js
const Order = require("./models/Order");

function setupWebsocket(server, options = {}) {
  const { Server } = require("ws");
  const wss = new Server({ server, ...options });

  wss.on("connection", (ws) => {
    console.log("✅ Client connected");
  });

  // MongoDB change stream
  const changeStream = Order.watch();

  changeStream.on("change", (change) => {
    console.log("🔔 Change detected:", change);

    const payload = {
      operationType: change.operationType,
      documentKey: change.documentKey,
      fullDocument: change.fullDocument || null,
      updateDescription: change.updateDescription || null,
      clusterTime: change.clusterTime,
    };

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ type: "ORDER_CHANGE", payload }));
      }
    });
  });
}

module.exports = { setupWebsocket };
