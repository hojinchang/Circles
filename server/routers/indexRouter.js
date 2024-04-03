const express = require("express")
const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.get('/', (req, res, next) => {
    return res.status(200).json({ success: true });
});

module.exports = router;
