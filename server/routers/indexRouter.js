const express = require("express")
const router = express.Router();

router.get('/', (req, res, next) => {
    // res.redirect('/login');
    
    // res.clearCookie("jwt");
    // console.log(req.cookies.jwt);


    
    return res.status(200).json({ success: true });
});

module.exports = router;
