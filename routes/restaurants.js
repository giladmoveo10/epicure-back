const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const authenticateToken = require("../middlewares/authToken");

// Get all restaurants
router.get("/", async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate("chef dishes");
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get popular restaurants
router.get("/popular", async (req, res) => {
    try {
        const popularRestaurants = await Restaurant.find({ popular: true }).populate("chef dishes");
        res.json(popularRestaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one restaurant
router.get("/:id", getRestaurant, (req, res) => {
    res.json(res.restaurant);
});

// Create one restaurant
router.post("/", authenticateToken, async (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        image: req.body.image,
        popular: req.body.popular || false,
        stars: req.body.stars || 0,
        chef: req.body.chefId,
        dishes: req.body.dishIds,
    });

    try {
        const newRestaurant = await restaurant.save();
        console.log(`new restaurant: ${newRestaurant} saved`);
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one restaurant
router.patch("/:id", getRestaurant, authenticateToken, async (req, res) => {
    if (req.body.name != null) {
        res.restaurant.name = req.body.name;
    }
    if (req.body.image != null) {
        res.restaurant.image = req.body.image;
    }
    if (req.body.popular != null) {
        res.restaurant.popular = req.body.popular;
    }
    if (req.body.stars != null) {
        res.restaurant.stars = req.body.stars;
    }
    if (req.body.chefId) {
        res.restaurant.chef = req.body.chefId;
    }
    if (req.body.dishIds) {
        res.restaurant.dishes = req.body.dishIds;
    }

    try {
        const updatedRestaurant = await res.restaurant.save();
        res.json(updatedRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one restaurant
router.delete("/:id", getRestaurant, authenticateToken, async (req, res) => {
    try {
        await Restaurant.deleteOne({ _id: req.params.id });
        res.json({ message: "Deleted Restaurant" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single restaurant by ID
async function getRestaurant(req, res, next) {
    let restaurant;
    try {
        restaurant = await Restaurant.findById(req.params.id).populate("chef dishes");
        if (restaurant == null) {
            return res.status(404).json({ message: "Cannot find restaurant" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.restaurant = restaurant;
    next();
}

module.exports = router;
