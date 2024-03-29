const express = require("express")
const jwt = require("jsonwebtoken");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");

router.get('/', requireAuth, function(req, res, next) {
    // res.redirect('/login');
    
    // res.clearCookie("jwt");
    // console.log(req.cookies.jwt);


    
    return res.status(200).json({ success: true });
});

module.exports = router;
