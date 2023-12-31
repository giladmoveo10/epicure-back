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
    popular: {
        type: Boolean,
        default: false,
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
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

RestaurantSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

RestaurantSchema.set("toJSON", {
    virtuals: true,
});

module.exports = Restaurant = mongoose.model("restaurant", RestaurantSchema);
