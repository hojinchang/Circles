const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.posts_get);

router.post("/create", postController.create_post);

router.get("/:id", postController.post_get);
router.put("/:id", postController.post_update);

router.delete("/:id", postController.post_delete);

module.exports = router;