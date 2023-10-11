const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");


// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let _db;

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB using mongoose");
        // _db = client.db();
    } catch (err) {
        console.error("DB connection error:", err);
    } finally {
        // ? close the client?
        // await client.close();
    }
}

// const getDb = () => {
//     if (_db) return _db;
//     throw "no DB Found!";
// };
// create a connection using mongoose

module.exports = { connect };
