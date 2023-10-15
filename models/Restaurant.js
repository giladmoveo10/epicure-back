const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: "chef",
    },
    dishes: [
        {
            type: Schema.Types.ObjectId,
            ref: "dish",
        },
    ],
});

module.exports = Restaurant = mongoose.model("restaurant", RestaurantSchema);
