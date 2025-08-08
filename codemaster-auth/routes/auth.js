const express = require("express");
const router = express.Router();
const cors = require("cors");
const corsOptions = require("../../backend/config/corsOptions");
const authController = require("../controllers/authController");

// Preflight (OPTIONS) handlers
router.options("/register", cors(corsOptions));
router.options("/login", cors(corsOptions));

// Auth routes
router.post("/register", cors(corsOptions), authController.register);
router.post("/login", cors(corsOptions), authController.login);

module.exports = router;
