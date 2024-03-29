const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
    // res.redirect('/login');
    
    console.log(req.cookies.jwt);

    // console.log(req)
});

module.exports = router;
