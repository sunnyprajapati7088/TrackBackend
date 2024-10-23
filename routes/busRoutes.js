const express = require("express");
const { addBus, getBusesByConductor } = require("../controllers/busController");
// const authenticateConductor = require("../middleware/authenticateConductor");

const router = express.Router();

router.post("/", addBus); // Add a new bus
router.get("/:conductorId", getBusesByConductor); // Get buses by conductor

module.exports = router;
