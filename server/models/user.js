const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true, minLength: 1, maxLength: 20 },
    lastName: { type: String, required: true, minLength: 1, maxLength: 20 },
    email: { type: String, required: true, minLength: 1, maxLength: 100 },
    password: { type: String, required: true, minLength: 1 },
    joinDate: { type: Date, default: Date.now }
});

UserSchema.virtual("fullName").get(function() {
    let fullName = "";
    if (this.firstName && this.lastName) {
        fullName = `${this.firstName} ${this.lastName}`;
    }

    return fullName;
});

UserSchema.virtual("joinDateFormatted").get(function() {
    return this.joinDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    })
});

module.exports = mongoose.model("User", UserSchema);