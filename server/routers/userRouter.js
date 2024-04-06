const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const userController = require("../controllers/userController");

// Get the current user
router.get("/", isAuth, userController.get_user);

// Sign up user
router.post("/sign-up", userController.sign_up_post);

// Login the user using local strategy
router.post("/login", userController.login_post);

// Login the user using the demo
router.post("/login-demo", userController.demo_login_post);

// Logout the user
router.get("/logout", userController.logout);

module.exports = router;