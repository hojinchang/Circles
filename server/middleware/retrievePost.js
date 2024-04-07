const Post = require("../models/post");

// Retrieve a specific post given its id
const retrievePost = async(req, res, next) => {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    req.post = post;
    next();
}

module.exports = retrievePost;