const express = require("express");
const router = express.Router();
const FeaturedChef = require("../models/FeaturedChef");

router.get("/", async (req, res) => {
    try {
        const featuredChef = await FeaturedChef.findOne().populate({
            path: "chef",
            populate: { path: "restaurants" },
        });
        res.json(featuredChef.chef);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        // Remove the current chef of the week
        await FeaturedChef.deleteMany({});

        // Set the new chef of the week
        const newFeaturedChef = new FeaturedChef({
            chef: req.body.chefId,
        });
        const savedChef = await newFeaturedChef.save();
        console.log(`new featured chef: ${savedChef} saved`);
        res.status(201).json(savedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
