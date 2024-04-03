const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.post_get);

router.post("/create", postController.create_post);

module.exports = router;