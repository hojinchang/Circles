const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require('sanitize-html');

// Get all posts
exports.posts_get = asyncHandler(async(req, res, next) => {
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
        .withMessage("Post cannot exceed 400 characters"),
    
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const sanitizedPost = sanitizeHtml(req.body.post);

        const post = new Post({
            user: req.user,
            post: sanitizedPost,
        });

        await post.save();
        return res.status(201).json({ success: true });
    })
];

exports.post_get = asyncHandler(async(req, res, next) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    res.status(200).json({ success: true, post: post });
});

// Update a post
exports.post_update = [
    body("post")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Post content is required")
        .isLength({ max: 400 })
        .withMessage("Post cannot exceed 400 characters"),
    
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const sanitizedPost = sanitizeHtml(req.body.post);
        
        const postId = req.params.id;
        await Post.findByIdAndUpdate(postId, { post: sanitizedPost });

        res.status(200).json({ success: true });
    })
]

// Like a post
exports.post_like = asyncHandler(async(req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    // If the user has already likes the post
    if (post.likes.includes(userId)) {
        // Find the index of the user in the likes array
        const idx = post.likes.findIndex(idx => idx === userId);
        // Delete the user from the likes array
        post.likes.splice(idx, 1);
    } else {
        post.likes.push(userId);
    }

    await post.save();
    return res.status(200).json({ success: true });
});

// Delete post
exports.post_delete =  asyncHandler(async(req, res, next) => {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ success: true });
});