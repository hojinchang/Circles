const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/sign-up", userController.sign_up_post);

router.post("/login", userController.login_post);

// router.get("/logout", userController.logout);

module.exports = router;