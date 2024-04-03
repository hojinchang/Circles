const express = require("express");
const router = express.Router();

const isAuth = require("../middleware/isAuth");
const postController = require("../controllers/postController");

// router.get("/create", isAuth, postController.create_get);
router.post("/create", isAuth, postController.create_post);

module.exports = router;