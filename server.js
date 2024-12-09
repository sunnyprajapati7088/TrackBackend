
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from any origin
  },
});

let buses = {}; // Store all bus locations

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Register a bus
  socket.on("registerBus", (busId) => {
    if (busId && busId.trim()) {
      if (!buses[busId]) {
        buses[busId] = { lat: 0, lng: 0 }; // Initialize bus location
      }
      console.log(`Bus ${busId} registered with socket ID ${socket.id}`);
    } else {
      console.error("Invalid bus ID registration attempt.");
    }
  });

  // Handle location updates
  socket.on("updateLocation", (data) => {
    const { busId, location } = data;

    if (!busId || !location || !location.lat || !location.lng) {
      console.error("Invalid location update received:", data);
      return;
    }

    // Update the bus's location
    buses[busId] = location;

    // Simulate all other buses moving by adjusting lat/lng
    Object.keys(buses).forEach((id) => {
      if (id !== busId) {
        buses[id].lat += 0.0001; // Slightly adjust latitude
        buses[id].lng += 0.0001; // Slightly adjust longitude
      }
    });

    // Broadcast updated locations to all connected clients
    io.emit("busLocations", buses);
    console.log(`Updated location for Bus ${busId}:`, location);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
