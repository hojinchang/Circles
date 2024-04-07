const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const sanitizeHtml = require('sanitize-html');

// Get all posts
exports.posts_get = asyncHandler(async(req, res, next) => {
    const posts = await Post.find()
                            .populate("user")
                            .populate("comments.user")
                            .sort({ timeStamp: -1 })
                            .exec();
    
    (posts)
        ? res.status(200).json(posts)
        : res.status(404).json({ message: "Posts not found" });

    return;
});

// Create a post post request
exports.post_create = [
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
            user: req.user.id,
            post: sanitizedPost,
        });

        await post.save();
        return res.status(201).json({ success: true });
    })
];

// Get the specified post
exports.post_get = asyncHandler(async(req, res, next) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
                            .populate("user")
                            .populate("comments.user")
                            .exec();

    (post)
        ? res.status(200).json({ success: true, post: post })
        : res.status(404).json({ message: 'Post not found' })

    return;
});

// Like a post
exports.post_like = asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const post = req.post;

    // If the user has already likes the post
    if (post.likes.map(String).includes(userId)) {   // Convert likes ObjectId to strings
        // Find the index of the user in the likes array
        const idx = post.likes.map(String).findIndex(idx => idx === userId);
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
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ success: true });
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
        
        const postId = req.params.postId;
        await Post.findByIdAndUpdate(postId, { post: sanitizedPost });

        res.status(200).json({ success: true });
    })
]

// Create a comment
exports.comment_create = [
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

        const sanitizedComment = sanitizeHtml(req.body.post);
        const userId = req.user.id;
        const post = req.post;

        // Create a new comment object
        const comment = {
            user: userId,
            post: sanitizedComment
        }

        // Push comment object to comments array in post schema
        post.comments.push(comment);
        await post.save();

        res.status(201).json({ success: true });
    })
]

// Get a specific comment from a specific post
exports.comment_get = asyncHandler(async(req, res, next) => {
    const post = req.post;
    const comment = req.comment;

    (comment)
        ? res.status(200).json({ success:true, post: post })
        : res.status(404).json({ message: "Comment not found" });
    
        return;
});

// Like a comment
exports.comment_like = asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const post = req.post;
    const comment = req.comment;

    // If the user has already likes the post
    if (comment.likes.map(String).includes(userId)) {   // Convert likes ObjectId to strings
        // Find the index of the user in the likes array
        const idx = comment.likes.map(String).findIndex(idx => idx === userId);
        // Delete the user from the likes array
        comment.likes.splice(idx, 1);
    } else {
        comment.likes.push(userId);
    }

    // Save the post
    await post.save();

    res.status(200).json({ success: true });
});

// Delete a comment
exports.comment_delete = asyncHandler(async(req, res, next) =>  {
    const commentId = req.params.commentId;
    const post = req.post;

    // Find the index of the specific comment and delete it from the comments array
    const commentIdx = post.comments.findIndex(comment => comment.id === commentId);
    post.comments.splice(commentIdx, 1);

    await post.save();

    res.status(200).json({ sucess: true });
});

// Update a post
exports.comment_update = [
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
        
        const post = req.post;
        const comment = req.comment;

        comment.post = sanitizedPost;
        await post.save();

        res.status(200).json({ success: true });
    })
]
