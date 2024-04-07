// Retrieve a specific comment given its id
const retrieveComment = async(req, res, next) => {
    const commentId = req.params.commentId;
    const post = req.post;

    // Find the specified comment of the post
    const comment = post.comments.id(commentId);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    req.comment = comment;
    next();
}

module.exports = retrieveComment;