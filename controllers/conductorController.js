const Conductor = require("../models/Conductor");

// Create a new conductor
exports.createConductor = async (req, res) => {
  const {
    name,
    mobileNumber,
    drivingLicense,
    email,
    password,
    state,
    district,
    busNumber,
    route,
    } = req.body;
    console.log(req.body);

  try {
    const newConductor = new Conductor({
      name,
      mobileNumber,
      drivingLicense,
      email,
      password, // Remember to hash the password before saving
      state,
      district,
      busNumber,
      route,
    });

    await newConductor.save();
    res
      .status(201)
      .json({ success: true, message: "Conductor created successfully!" });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
      console.log(error)
  }
};

// Login conductor
exports.loginConductor = async (req, res) => {
  const { email, password } = req.body;

  const conductor = await Conductor.findOne({ email });
  if (!conductor)
    return res
      .status(404)
      .json({ success: false, message: "Conductor not found" });

  // Check password (you should use bcrypt to compare hashed passwords)
  if (conductor.password !== password)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  // Send response with conductor details (without password)
  res.json({
    success: true,
    conductor: {
      id: conductor._id,
      name: conductor.name,
      busNumber: conductor.busNumber,
      route: conductor.route,
    },
  });
};
