const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DishSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "restaurant",
    },
});

DishSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

DishSchema.set("toJSON", {
    virtuals: true,
});

module.exports = Dish = mongoose.model("dish", DishSchema);
