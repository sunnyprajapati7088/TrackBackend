const express = require("express");
const router = express.Router();
const {
  createConductor,
  loginConductor,
} = require("../controllers/conductorController");

// Routes for conductor operations
router.post("/create", createConductor); // Admin creates a conductor
router.post("/login", loginConductor); // Conductor login

module.exports = router;
