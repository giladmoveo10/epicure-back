const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB using mongoose");
        // _db = client.db();
    } catch (err) {
        console.error("DB connection error:", err);
    } finally {
        // ? should i disconnect somehow ?
    }
}

module.exports = { connect };
