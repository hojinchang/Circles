const express = require("express");
const router = express.Router();
require("dotenv").config();

const isAuth = require("../middleware/isAuth");
const userController = require("../controllers/userController");

// multer middleware is used for handling "multipart/form-data" which is primarily used for uploading files
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get the current user
router.get("/", isAuth, userController.get_user);

// Get all users
router.get("/all", userController.get_users);

// Sign up user
router.post("/sign-up", upload.single("profilePicture"), userController.sign_up_post);

// Login the user using local strategy
router.post("/login", userController.login_post);

// Login the user using the demo
router.post("/login-demo", userController.demo_login_post);

// Logout the user
router.get("/logout", userController.logout);

// Get a specfic user given their id
router.get("/:userId", isAuth, userController.get_specific_user);

// Get posts from specific user
router.get("/:userId/posts", isAuth, userController.get_user_posts);

module.exports = router;