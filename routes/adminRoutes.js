const express = require("express");
const { createConductor } = require("../controllers/userController");
const router = express.Router();

// Admin route to create a conductor
router.post("/conductor", createConductor);

module.exports = router;
