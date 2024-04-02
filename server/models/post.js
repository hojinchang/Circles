const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timeFormatSettings = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};

// Comments schema
const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, required: true, minLength: 1, maxLength: 280 },
    timeStamp: { type: Date, default: Date.now },
});

CommentSchema.virtual("timeStampFormatted").get(function() {
    return this.timeStamp.toLocaleDateString('en-US', timeFormatSettings);
});

// Posts schema
const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, required: true, minLength: 1, maxLength: 280 },
    timeStamp: { type: Date, default: Date.now, required: true },
    comments: [CommentSchema],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

PostSchema.virtual("timeStampFormatted").get(function() {
    return this.timeStamp.toLocaleDateString('en-US', timeFormatSettings);
});

module.exports = mongoose.model("Post", PostSchema);