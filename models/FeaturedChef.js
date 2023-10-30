const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeaturedChefSchema = new mongoose.Schema({
    chef: {
        type: Schema.Types.ObjectId,
        ref: "chef",
        required: true,
    },
});

module.exports = FeaturedChef = mongoose.model("featuredChef", FeaturedChefSchema);
