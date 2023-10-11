const express = require("express");
const Chef = require("../models/Chef");
const router = express.Router();

// CREATE a chef
router.post("/", async (req, res) => {
    try {
        const chef = new Chef({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            restaurants: req.body.restaurants,
        });
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

    // ? how to update restaurants? by id or as an object?

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

// router.post("/insert", async (req, res) => {
//     const chef1 = new Chef({
//         name: "Yossi Shitrit",
//         image: "https://s3-alpha-sig.figma.com/img/ecf7/ed9d/73aeb3d11f70c9712f15e582329944ca?Expires=1698019200&Signature=nsjJVnjTlNj8aAK6AyZChdmBCIaVzNe5-Azxy46auj01YDtGFbf9h1m2CjialkqhVl30c~~SRO15Qha3LZXb-D57xePiQ9mHqj5zZF4F9Ghhrr1kIP2fo096tmxwIp~ZJHepgpVndxeCrL6rhtxRxS8jo4w-Cy5qrnUrb46g6N6YtuEAF-9NaR~EW5n7GjSrqQliEjmMmHYSunT1Let8bc2z-dgNXXqUlcJs6x1uBsrKGdoDFCcZKn58~D2aicG5PNpfG3EVyNOCuX34BjrQUZ0CK~h-65jcoWHk9Qfghc42IY4z2VY2riUA4PrJx~Sw34lhe96ALSKy43GJ1zAppg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
//         description:
//             "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit's creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.",
//         restaurants: [],
//     });

//     try {
//         const savedChef = await chef1.save();
//         res.status(201).json(savedChef);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// middleware to get a single chef by ID
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
