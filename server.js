// const adminRoutes = require("./routes/adminRoutes");
// const conductorRoutes = require("./routes/conductorRoutes");
// console.log(conductorRoutes)
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();

// // Connect to the database
// connectDB();

// // CORS configuration
// const corsOptions = {
//   origin: "http://localhost:5173", // Specify the origin you want to allow
//   methods: ["GET", "POST"],
//   credentials: true, // Allow credentials if needed
// };

// app.use(cors(corsOptions)); // Use the custom CORS options
// app.use(express.json());

// // Other imports

// app.use("/api/conductor", conductorRoutes);
// app.use("/api/admin", adminRoutes); // Add this line for admin routes

// // Create the HTTP server and Socket.IO instance
// const server = http.createServer(app);
// const io = socketIo(server);

// // Socket.IO connection
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const socketIo = require("socket.io");

const adminRoutes = require("./routes/adminRoutes");
const conductorRoutes = require("./routes/conductorRoutes");

const app = express();

// Connect to the database
connectDB();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Specify the origin you want to allow
  methods: ["GET", "POST"],
  credentials: true, // Allow credentials if needed
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies

// Define your routes
app.use("/api/conductor", conductorRoutes);
app.use("/api/admin", adminRoutes); // Add admin routes

// Create the HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle conductor location updates
  socket.on("conductorLocation", (data) => {
    console.log("Conductor Location:", data);
    // Broadcast location to all connected clients
    socket.broadcast.emit("busLocationUpdated", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
