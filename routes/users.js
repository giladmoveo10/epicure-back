const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middlewares/authToken");
// const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing username or password" });
    }

    const user = await User.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    hash = bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        const newUser = new User({
            username: username,
            password: hash,
            role: role,
        });

        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        // ! wont get here since we have a frontend validation
        return res.status(400).json({ message: "Missing username or password" });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: "Error during password comparison" });
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials / Incorrect password" });

        const payload = {
            id: user.id,
            username: user.username,
            password: user.password, // ? do i need to send this?
            role: user.role,
        };

        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
            if (err) {
                console.log("err", err);
                throw err;
            }
            res.json(token);
        });
    });
});

module.exports = router;
