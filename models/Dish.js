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
    tags: {
        type: [String],
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "restaurant",
    },
});

module.exports = Dish = mongoose.model("dish", DishSchema);
