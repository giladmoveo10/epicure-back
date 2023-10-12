const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChefSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    restaurants: [
        {
            type: Schema.Types.ObjectId,
            ref: "restaurant",
        },
    ],
});

module.exports = Chef = mongoose.model("chef", ChefSchema);
