const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Get all posts
exports.post_get = asyncHandler(async(req, res, next) => {
    const posts = await Post.find()
                            .populate("user")
                            .sort({ timeStamp: -1 })
                            .exec();
    
    (posts)
        ? res.status(200).json(posts)
        : res.status(404).json({ message: "Posts not found" });
});

// Create a post post request
exports.create_post = [
    body("post")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Post content is required")
        .isLength({ max: 400 })
        .withMessage("Post cannot exceed 400 characters")
        .escape(),
    
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = new Post({
            user: req.user,
            post: req.body.post,
        });

        await post.save();
        return res.status(201).json({ success: true });
    })
];

// Delete post
exports.post_delete =  asyncHandler(async(req, res, next) => {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully." });
});