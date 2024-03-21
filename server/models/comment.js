const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, required: true, minLength: 1, maxLength: 280 },
    postTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);