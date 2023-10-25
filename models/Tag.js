const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});


tagSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

tagSchema.set("toJSON", {
    virtuals: true,
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
