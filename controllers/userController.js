const User = require("../models/User");

// Admin creates a new conductor
const createConductor = async (req, res) => {
  const { name, mobileNo, drivingLicense, email, password, state, district } =
    req.body;
console.log("nn")
  try {
    // Create a new conductor
    const newConductor = new User({
      name,
      mobileNo,
      drivingLicense,
      email,
      password,
      state,
      district,
      role: "conductor", // Ensure the role is set to conductor
    });
      console.log("vhhh");
    // Save the conductor
    await newConductor.save();
    res.status(201).json(newConductor);
  } catch (error) {
      
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createConductor };
