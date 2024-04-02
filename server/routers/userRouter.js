const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const userController = require("../controllers/userController");

router.post("/sign-up", userController.sign_up_post);

router.post("/login", userController.login_post);
router.post("/login-demo", userController.demo_login_post);

router.get("/logout", userController.logout);

router.get("/get-user", isAuth, userController.get_user);

module.exports = router;