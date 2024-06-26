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
    post: { type: String, minLength: 1, maxLength: 280, required: true },
    timeStamp: { type: Date, default: Date.now },
    likes:  [{ type: Schema.Types.ObjectId, ref: "User" }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

CommentSchema.virtual("timeStampFormatted").get(function() {
    return this.timeStamp.toLocaleDateString('en-US', timeFormatSettings);
});

// Posts schema
const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, minLength: 1, maxLength: 280, required: true },
    timeStamp: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

PostSchema.virtual("timeStampFormatted").get(function() {
    return this.timeStamp.toLocaleDateString('en-US', timeFormatSettings);
});

module.exports = mongoose.model("Post", PostSchema);