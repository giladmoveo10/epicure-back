const express = require("express");
const Chef = require("../models/Chef");
const router = express.Router();

// CREATE a chef
router.post("/", async (req, res) => {
    try {
        const chef = new Chef(req.body);
        const savedChef = await chef.save();
        res.status(201).json(savedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ all chefs
router.get("/", async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.json(chefs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ a single chef by ID
router.get("/:id", getChef, (req, res) => {
    res.json(res.chef);
});

// UPDATE a chef by ID
router.patch("/:id", getChef, async (req, res) => {
    if (req.body.name !== undefined) {
        res.chef.name = req.body.name;
    }
    if (req.body.image !== undefined) {
        res.chef.image = req.body.image;
    }
    if (req.body.description !== undefined) {
        res.chef.description = req.body.description;
    }
    // ? how to update restaurants?
    // restaurant is other scheme, do i need to create a restaurant scheme and then update it here?
    try {
        const updatedChef = await res.chef.save();
        res.json(updatedChef);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a chef by ID
router.delete("/:id", getChef, async (req, res) => {
    try {
        await res.chef.remove();
        res.json({ message: "Chef Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getChef(req, res, next) {
    let chef;
    try {
        chef = await Chef.findById(req.params.id);
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
