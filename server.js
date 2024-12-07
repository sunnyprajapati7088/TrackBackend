// // const adminRoutes = require("./routes/adminRoutes");
// // const conductorRoutes = require("./routes/conductorRoutes");
// // console.log(conductorRoutes)
// // const express = require("express");
// // const cors = require("cors");
// // const connectDB = require("./config/db");
// // const http = require("http");
// // const socketIo = require("socket.io");

// // const app = express();

// // // Connect to the database
// // connectDB();

// // // CORS configuration
// // const corsOptions = {
// //   origin: "http://localhost:5173", // Specify the origin you want to allow
// //   methods: ["GET", "POST"],
// //   credentials: true, // Allow credentials if needed
// // };

// // app.use(cors(corsOptions)); // Use the custom CORS options
// // app.use(express.json());

// // // Other imports

// // app.use("/api/conductor", conductorRoutes);
// // app.use("/api/admin", adminRoutes); // Add this line for admin routes

// // // Create the HTTP server and Socket.IO instance
// // const server = http.createServer(app);
// // const io = socketIo(server);

// // // Socket.IO connection
// // io.on("connection", (socket) => {
// //   console.log("New client connected");

// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //   });
// // });

// // // Start the server
// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });


// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const http = require("http");
// const socketIo = require("socket.io");

// const adminRoutes = require("./routes/adminRoutes");
// const conductorRoutes = require("./routes/conductorRoutes");

// const app = express();

// // Connect to the database
// connectDB();

// // CORS configuration
// const corsOptions = {
//   origin: "http://localhost:5173", // Specify the origin you want to allow
//   methods: ["GET", "POST"],
//   credentials: true, // Allow credentials if needed
// };

// // Use CORS middleware
// app.use(cors(corsOptions));
// app.use(express.json()); // Middleware to parse JSON bodies

// // Define your routes
// app.use("/api/conductor", conductorRoutes);
// app.use("/api/admin", adminRoutes); // Add admin routes

// // Create the HTTP server and Socket.IO instance
// const server = http.createServer(app);
// const io = socketIo(server);

// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   // Handle conductor location updates
//   socket.on("conductorLocation", (data) => {
//     console.log("Conductor Location:", data);
//     // Broadcast location to all connected clients
//     socket.broadcast.emit("busLocationUpdated", data);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });







//secoond
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// let buses = {};

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("updateLocation", (data) => {
//     buses[data.busId] = data.location;
//     io.emit("busLocations", buses);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

// app.get("/", (req, res) => {
//   res.send("Bus Tracking Server Running...");
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// let buses = {}; // Store bus locations
// let connectedClients = {}; // Track connected sockets

// // Handle new client connections
// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   // Register the bus when connected
//   socket.on("registerBus", (busId) => {
//     connectedClients[socket.id] = busId;
//     console.log(`Bus ${busId} registered with socket ID ${socket.id}`);
//   });

//   // Handle location updates
//   socket.on("updateLocation", (data) => {
//     const { busId, location } = data;
//     buses[busId] = location;

//     // Broadcast updated locations to all clients
//     io.emit("busLocations", buses);
//     console.log(`Updated location for Bus ${busId}:`, location);
//   });

//   // Handle disconnections
//   socket.on("disconnect", () => {
//     const busId = connectedClients[socket.id];
//     console.log(`Client disconnected: ${socket.id} (Bus ${busId})`);

//     // Remove the bus from tracking if its socket disconnects
//     if (busId) {
//       delete buses[busId];
//       delete connectedClients[socket.id];
//       io.emit("busLocations", buses); // Update other clients
//     }
//   });
// });

// app.get("/", (req, res) => {
//   res.send("Bus Tracking Server is running...");
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });


// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Allow frontend from any origin
//   },
// });

// let buses = {}; // Store bus locations

// // Socket.IO Connection
// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   // Handle bus registration
//   socket.on("registerBus", (busId) => {
//     console.log(`Bus ${busId} registered with socket ID ${socket.id}`);
//   });

//   // Handle location updates
//   socket.on("updateLocation", (data) => {
//     const { busId, location } = data;
//     buses[busId] = location;

//     // Broadcast updated locations to all clients
//     io.emit("busLocations", buses);
//     console.log(`Updated location for Bus ${busId}:`, location);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });

// // Run the server
// app.get("/", (req, res) => {
//   res.send("Bus Tracking Server is running...");
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Allow frontend from any origin
//   },
// });

// let buses = {};

// // Handle socket connections
// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   // Register a bus
//   socket.on("registerBus", (busId) => {
//     if (busId && busId.trim()) {
//       console.log(`Bus ${busId} registered with socket ID ${socket.id}`);
//     } else {
//       console.error("Invalid bus ID registration attempt.");
//     }
//   });

//   // Handle location updates
//   socket.on("updateLocation", (data) => {
//     const { busId, location } = data;

//     if (!busId || !location || !location.lat || !location.lng) {
//       console.error("Invalid location update received.");
//       return;
//     }

//     // Update the bus's location
//     buses[busId] = location;
//     io.emit("busLocations", buses); // Broadcast updated locations
//     console.log(`Updated location for Bus ${busId}:`, location);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Allow requests from anywhere
//   },
// });

// let buses = {}; // Store bus locations

// // Handle socket connections
// io.on("connection", (socket) => {
//   console.log(`Client connected: ${socket.id}`);

//   // Register a bus
//   socket.on("registerBus", (busId) => {
//     if (busId && busId.trim()) {
//       console.log(`Bus ${busId} registered with socket ID ${socket.id}`);
//     } else {
//       console.error("Invalid bus ID registration attempt.");
//     }
//   });

//   // Handle location updates
//   socket.on("updateLocation", (data) => {
//     const { busId, location } = data;

//     if (!busId || !location || !location.lat || !location.lng) {
//       console.error("Invalid location update received:", data);
//       return;
//     }

//     // Update the bus's location
//     buses[busId] = location;

//     // Broadcast updated locations to all connected clients
//     io.emit("busLocations", buses);
//     console.log(`Updated location for Bus ${busId}:`, location);
//   });

//   // Handle client disconnection
//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });


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
