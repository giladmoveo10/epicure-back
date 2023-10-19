const express = require("express");
const Chef = require("../models/Chef");
const router = express.Router();

// READ all chefs
router.get("/", async (req, res) => {
    try {
        const chefs = await Chef.find().populate("restaurants");
        res.json(chefs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single chef by ID
router.get("/:id", getChef, (req, res) => {
    res.json(res.chef);
});

// CREATE a chef
router.post("/", async (req, res) => {
    try {
        const chef = new Chef({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            restaurants: req.body.restaurantIds,
        });
        const savedChef = await chef.save();
        res.status(201).json(savedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE a chef by ID
router.patch("/:id", getChef, async (req, res) => {
    if (req.body.name) {
        res.chef.name = req.body.name;
    }
    if (req.body.image) {
        res.chef.image = req.body.image;
    }
    if (req.body.description) {
        res.chef.description = req.body.description;
    }
    if (req.body.restaurantIds) {
        res.chef.restaurants = req.body.restaurantIds;
    }

    try {
        const updatedChef = await res.chef.save();
        console.log("updatedChef", updatedChef);
        res.json(updatedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a chef by ID
router.delete("/:id", getChef, async (req, res) => {
    try {
        await Chef.deleteOne({ _id: req.params.id });
        res.json({ message: "Chef Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("error delete", error);
    }
});

// middleware to get a single chef by ID
async function getChef(req, res, next) {
    let chef;
    try {
        chef = await Chef.findById(req.params.id).populate("restaurants");
        if (chef == null) {
            return res.status(404).json({ message: "Cannot find chef" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.chef = chef;
    next();
}

module.exports = router;
