const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// API to check for JWT authentication
router.get("/", (req, res, next) => {

    // res.clearCookie("jwt", { httpOnly: true });
    // return res.status(401).json({ message: "Access Denied: No token provided." });

    const token = req.cookies.jwt;

    // If token doesnt exist
    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided." });
    }

    try {
        // Token exists and is verified
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        res.status(200).json({ message: "Authentication successful." });

    } catch(err) {
        // if token is invalid or expired
        return res.status(401).json({ message: "Invalid token." });
    }
});


module.exports = router;