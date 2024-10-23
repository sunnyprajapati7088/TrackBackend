const Bus = require("../models/Bus");

// Add a new bus
const addBus = async (req, res) => {
  const { busNumber, route, conductorId } = req.body;

  const newBus = new Bus({
    busNumber,
    route,
    conductorId,
    currentLocation: { type: "Point", coordinates: [0, 0] }, // Default location
  });

  try {
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all buses for a specific conductor
const getBusesByConductor = async (req, res) => {
  const { conductorId } = req.params;

  try {
    const buses = await Bus.find({ conductorId });
    res.json(buses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBusLocation = async (req, res) => {
  const { busId, coordinates } = req.body;

  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      busId,
      {
        currentLocation: { type: "Point", coordinates },
        lastUpdated: Date.now(),
      },
      { new: true }
    );

    // Emit the updated location to all clients
    io.emit("busLocationUpdated", updatedBus);
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addBus, getBusesByConductor, updateBusLocation };
