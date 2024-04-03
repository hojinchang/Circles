const Post = require("../models/post");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
] 