const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "admin",
    },
});

UserSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

UserSchema.set("toJSON", {
    virtuals: true,
});

module.exports = User = mongoose.model("user", UserSchema);
