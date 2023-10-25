const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");

router.get("/", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const { name, image } = req.body;

    try {
        const newTag = new Tag({
            name,
            image,
        });

        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
