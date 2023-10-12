const express = require("express");
const Dish = require("../models/Dish");
const util = require("util");
const router = express.Router();

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

// CREATE a dish
router.post("/", async (req, res) => {
    // console.log(`req.body: ${JSON.stringify(req.body)}`);
    const dish = new Dish({
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        image: req.body.image,
        tags: req.body.tags,
        restaurant: req.body.restaurant,
    });

    try {
        const newDish = await dish.save();
        console.log(`new dish: ${newDish} saved`);
        res.status(201).json(newDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE a chef by ID
router.patch("/:id", validateRestaurantId, getDish, async (req, res) => {
    if (req.body.name) {
        res.dish.name = req.body.name;
    }
    if (req.body.price) {
        res.dish.price = req.body.price;
    }
    if (req.body.ingredients) {
        res.dish.ingredients = req.body.ingredients;
    }
    if (req.body.tags) {
        res.dish.tags = req.body.tags;
    }
    if (req.body.restaurant) {
        res.dish.restaurant = req.body.restaurant;
    }

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

async function validateRestaurantId(req, res, next) {
    try {
        if (req.body.restaurant) {
            // Verify if the restaurant's ObjectID exists
            const restaurant = await Restaurant.findById(req.body.restaurant);
            if (!restaurant) {
                return res.status(400).json({ message: "Restaurant not found." });
            }
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    next();
}

module.exports = router;
