const mongoose = require("mongoose");

const ConductorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    drivingLicense: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hash this before saving
    state: { type: String, required: true },
    district: { type: String, required: true },
    busNumber: { type: String, required: true },
    route: { type: String, required: true }, // Could also be an array for route stops
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conductor", ConductorSchema);
