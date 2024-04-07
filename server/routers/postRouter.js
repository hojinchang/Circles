const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// Get every post
router.get("/", postController.posts_get);

// Create a post
router.post("/create", postController.post_create);

// Get a specific post
router.get("/:postId", postController.post_get);

// Update the content of a specific post
router.put("/:postId", postController.post_update);

// Like a specific post
router.put("/:postId/like", postController.post_like);

// Delete a specific post
router.delete("/:postId", postController.post_delete);

// Create a comment
router.post("/:postId/comment", postController.comment_create);

// Like a specific comment
router.put("/:postId/comment/:commentId/like", postController.comment_like);

module.exports = router;