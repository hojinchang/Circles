const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");

// API to check for JWT authentication
router.get("/", isAuth, (req, res, next) => {
    console.log(req.user.id)
    res.status(200).json({ success: true, user: req.user.id });
});

module.exports = router;