const express = require("express");
const Dish = require("../models/Dish");
const router = express.Router();

// CREATE a dish
router.post("/", async (req, res) => {
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    const dish = new Dish({
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        tags: req.body.tags,
        restaurant: req.body.restaurant,
    });

    try {
        const newDish = await dish.save();
        res.status(201).json(newDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all dishes
router.get("/", async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// READ a single dish by ID
router.get("/:id", getDish, (req, res) => {
    res.json(res.dish);
});

// UPDATE a chef by ID
router.patch("/:id", getDish, async (req, res) => {
    if (req.body.name != null) {
        res.dish.name = req.body.name;
    }
    if (req.body.price != null) {
        res.dish.price = req.body.price;
    }
    if (req.body.ingredients != null) {
        res.dish.ingredients = req.body.ingredients;
    }
    // if (req.body.tags != null) {
    //     res.dish.tags = req.body.tags;
    // }
    // ? how to update restaurants?

    try {
        const updatedDish = await res.dish.save();
        res.json(updatedDish);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a chef by ID
router.delete("/:id", getDish, async (req, res) => {
    try {
        await res.dish.remove();
        res.json({ message: "Deleted Dish" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single dish by ID
async function getDish(req, res, next) {
    let dish;
    try {
        dish = await Dish.findById(req.params.id);
        if (dish == null) {
            return res.status(404).json({ message: "Cannot find dish" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.dish = dish;
    next();
}

module.exports = router;
