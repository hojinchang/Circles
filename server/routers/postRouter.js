const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const retrievePost = require("../middleware/retrievePost");
const retrieveComment = require("../middleware/retrieveComment");

// Get every post
router.get("/", postController.posts_get);

// Create a post
router.post("/create", postController.post_create);

// Get a specific post
router.get("/:postId", postController.post_get);

// Like a specific post
router.put("/:postId/like", retrievePost, postController.post_like);

// Delete a specific post
router.delete("/:postId", postController.post_delete);

// Update a specific post
router.put("/:postId", postController.post_update);

// Create a comment
router.post("/:postId/comment", retrievePost, postController.comment_create);

// Get a specific comment
router.get("/:postId/comment/:commentId", retrievePost, retrieveComment, postController.comment_get);

// Like a specific comment
router.put("/:postId/comment/:commentId/like", retrievePost, retrieveComment, postController.comment_like);

// Delete a specific comment
router.delete("/:postId/comment/:commentId", retrievePost, postController.comment_delete);

// Update a specific comment
router.put("/:postId/comment/:commentId", retrievePost, retrieveComment, postController.comment_update);

module.exports = router;