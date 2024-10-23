const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
  },
  route: {
    type: String,
    required: true,
  },
  conductorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the conductor
    required: true,
  },
  currentLocation: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" }, // For storing GPS coordinates
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bus", busSchema);
