const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const isAuth = require("../middleware/isAuth");

// API to check for JWT authentication
router.get("/", isAuth, (req, res, next) => {
    res.status(200).json({ message: "Authentication successful." });
});

module.exports = router;