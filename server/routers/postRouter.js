const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// Get every post
router.get("/", postController.posts_get);

// Create a post
router.post("/create", postController.create_post);

// Get a specific post
router.get("/:id", postController.post_get);

// Update the content of a specific post
router.put("/:id", postController.post_update);

// Like the specific post
router.put("/like/:id", postController.post_like);

// Delete a specific post
router.delete("/:id", postController.post_delete);

module.exports = router;